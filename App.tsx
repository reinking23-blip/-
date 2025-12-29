
import React, { useState, useEffect, useMemo } from 'react';
import { getSections } from './data/protocolData';
import { Sidebar } from './components/Sidebar';
import { ProtocolHeader } from './components/ProtocolHeader';
import { DataMappingDictionary } from './components/DataMappingDictionary';
import { Menu } from 'lucide-react';
import { NavItem } from './types';

export interface GradientRow {
  time: string;
  phaseA: string;
}

export interface TestingCondition {
  id: string;
  labelZh: string;
  labelEn: string;
  value: string;
  isOptional?: boolean;
  isCustom?: boolean;
}

export interface SolutionPrep {
  descZh: string;
  descEn: string;
  detail: string;
}

export interface SolutionPrepsState {
  phaseA: SolutionPrep;
  phaseB: SolutionPrep;
  needleWash: SolutionPrep;
  diluent: SolutionPrep;
  standard: SolutionPrep;
  sample: SolutionPrep;
}

export interface SolutionDetailState {
  stdWeight: string;
  stdVolume: string;
  stdMethodZh: string;
  stdMethodEn: string;
  stdCount: string;
  splWeight: string;
  splVolume: string;
  splMethodZh: string;
  splMethodEn: string;
  splCount: string;
}

export interface SequenceState {
  std1Count: string;
  std2Count: string;
  spl1Count: string;
  spl2Count: string;
  controlCount: string;
}

export interface ValProcSysSuitState {
  std1Count: string;
  std2Count: string;
  controlCount: string;
}

export interface ValProcPrecisionState {
  precisionStd1Count: string;
  precisionStd2Count: string;
}

export interface SystemSuitabilityState {
  plateNumber: string;
  tailingFactor: string;
  injectionCount: string;
  areaRSD: string;
  retentionRSD: string;
  recoveryRange: string;
  controlInjectionCount: string;
  controlAreaRSD: string;
}

export interface CalculationState {
  kf: boolean;
  lod: boolean;
  sr: boolean;
  tga: boolean;
}

export interface AcceptanceCriterion {
  id: string;
  name: string;
  criteria: string;
}

export interface SpecificityState {
  retentionDevLimit: string;
}

export interface LinearitySolution {
  id: string;
  conc: string;
  weight: string;
  volume: string;
}

export interface LinearityState {
  solutions: LinearitySolution[];
}

export interface PrecisionState {
  precisionLimit: string;
}

export interface AccuracyState {
  recoveryRange: string;
  rsdLimit: string;
}

export interface StabilityState {
  sampleTemp: string;
  sampleRecovery: string;
  standardTemp: string;
  standardRecovery: string;
}

export interface ReagentConfirmationRow {
  id: string;
  name: string;
  grade: string;
}

export interface PrerequisiteState {
  columnSuppliers: Record<string, string>;
  reagentRows: ReagentConfirmationRow[];
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'protocol' | 'dictionary'>('protocol');
  const [activeSectionId, setActiveSectionId] = useState<string>('cover');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [productId, setProductId] = useState<string>("HY130225");
  const [protocolCode, setProtocolCode] = useState<string>("A316");
  const [protocolVersion, setProtocolVersion] = useState<string>("02");
  const [projectNumber, setProjectNumber] = useState<string>("00");
  
  // Product Details State
  const [chemicalFormula, setChemicalFormula] = useState<string>("");
  const [chemicalName, setChemicalName] = useState<string>("");

  // Section 4.2 Testing Conditions State
  const [testingConditions, setTestingConditions] = useState<TestingCondition[]>([
    { id: 'method', labelZh: '方法名称', labelEn: 'Method name', value: "TM-A316-LC-02.00" },
    { id: 'instrument', labelZh: '仪器', labelEn: 'Instrument', value: "高效液相色谱仪 HPLC" },
    { id: 'column', labelZh: '色谱柱', labelEn: 'Column', value: "Waters_Xbridge Shield RP18_150mm×4.6mm_3.5μm 或等效色谱柱" },
    { id: 'ghostBuster', labelZh: '捕集小柱', labelEn: 'Ghost-Buster column', value: "Welch Ghost Buster_50mm×4.6mm 或等效色谱柱" },
    { id: 'detector', labelZh: '检测器', labelEn: 'Detection', value: "DAD" },
    { id: 'colTemp', labelZh: '柱温', labelEn: 'Column temperature', value: "40℃" },
    { id: 'samplerTemp', labelZh: '样品盘温度', labelEn: 'Sampler temperature', value: "5℃" },
    { id: 'flowRate', labelZh: '流速', labelEn: 'Flow rate', value: "1.2ml/min" },
    { id: 'wavelength', labelZh: '波长', labelEn: 'Wavelength', value: "210nm" },
    { id: 'injectionVol', labelZh: '进样量', labelEn: 'Injection volume', value: "10μl" },
    { id: 'runTime', labelZh: '运行时间', labelEn: 'Run time', value: "40min" },
    { id: 'phaseA', labelZh: '流动相 A', labelEn: 'Mobile phase A', value: "10mmol/L 磷酸氢二钾溶液+1mmol/L 氢氧化钾溶液" },
    { id: 'phaseB', labelZh: '流动相 B', labelEn: 'Mobile phase B', value: "乙腈 Acetonitrile" },
    { id: 'needleWash', labelZh: '洗针液', labelEn: 'Needle wash solution', value: "甲醇：水=100:900 Methanol: Water =100:900", isOptional: true },
  ]);

  // Section 4.2 Gradient Table State
  const [gradientData, setGradientData] = useState<GradientRow[]>([
    { time: "0.0", phaseA: "80" },
    { time: "3.0", phaseA: "80" },
    { time: "15.0", phaseA: "40" },
    { time: "25.0", phaseA: "35" },
    { time: "30.0", phaseA: "20" },
    { time: "33.0", phaseA: "20" },
    { time: "33.1", phaseA: "80" },
    { time: "40.0", phaseA: "80" }
  ]);

  // Section 4.3 Solution Preparation State
  const [solutionPreps, setSolutionPreps] = useState<SolutionPrepsState>({
    phaseA: { 
      descZh: "10mmol/L 磷酸氢二钾溶液+1mmol/L 氢氧化钾溶液", 
      descEn: "10mmol/L dipotassium phosphate solution +1mmol/L potassium hydroxide solution",
      detail: "称取无水磷酸氢二钾 1.74g 和氢氧化钾 56mg，加水 1000ml 使溶解，混合均匀，过滤，超声脱气，即得。\nWeigh 1.74g anhydrous dipotassium hydrogen phosphate and 56mg potassium hydroxide, add 1000ml water to dissolve, mix evenly, filter, ultrasonic to dissolve, and get it." 
    },
    phaseB: { 
      descZh: "乙腈", 
      descEn: "Acetonitrile",
      detail: "取乙腈适量，超声脱气. Measure appropriate Acetonitrile, and sonicate." 
    },
    needleWash: { 
      descZh: "甲醇：水=100:900", 
      descEn: "Methanol: Water =100:900",
      detail: "量取甲醇 100ml，加入 900ml 水，摇匀，超声脱气. Measure 100 ml of methanol and 900 ml of water, mix well, and sonicate." 
    },
    diluent: { 
      descZh: "乙腈", 
      descEn: "Acetonitrile",
      detail: "" 
    },
    standard: {
      descZh: "对照品溶液",
      descEn: "Reference Standard Solution",
      detail: `取 ${productId} 对照品约 20mg，精密称定，置 100ml量瓶中，加入稀释剂振摇溶解并稀释至刻度，摇匀，平行配制 2 份。（${productId}:0.2mg/ml）\nAccurately weigh about 20mg of ${productId} reference standard into a 100ml volumetric flask, shake to dissolve and dilute to volume with diluent, mix well. Prepare 2 solutions in parallel. (${productId}:0.2mg/ml)`
    },
    sample: {
      descZh: "供试品溶液",
      descEn: "Sample Solution",
      detail: "取供试品约 20mg，精密称定，置 100ml 量瓶中，加入稀释剂振摇溶解并稀释至刻度，摇匀，平行配制 2 份。（0.2mg/ml）\nAccurately weigh about 20mg of Sample into a 100ml volumetric flask, shake to dissolve and dilute to volume with diluent, mix well. Prepare 2 solutions in parallel. (0.2mg/ml)"
    }
  });

  // Section 4.3 Detailed Solution State
  const [solDetail, setSolDetail] = useState<SolutionDetailState>({
    stdWeight: "20",
    stdVolume: "100",
    stdMethodZh: "加入稀释剂振摇溶解并稀释至刻度",
    stdMethodEn: "shake to dissolve and dilute to volume with diluent",
    stdCount: "2",
    splWeight: "20",
    splVolume: "100",
    splMethodZh: "加入稀释剂振摇溶解并稀释至刻度",
    splMethodEn: "shake to dissolve and dilute to volume with diluent",
    splCount: "2",
  });

  // Section 4.4 Sequence State
  const [sequenceState, setSequenceState] = useState<SequenceState>({
    std1Count: "5",
    std2Count: "1",
    spl1Count: "1",
    spl2Count: "1",
    controlCount: "1"
  });

  // Independent state for Validation Procedure -> System Suitability -> 2.3 Procedure
  const [valProcSysSuitState, setValProcSysSuitState] = useState<ValProcSysSuitState>({
    std1Count: "5",
    std2Count: "1",
    controlCount: "1"
  });

  // Independent state for Validation Procedure -> Precision -> 2.3 Procedure
  const [valProcPrecisionState, setValProcPrecisionState] = useState<ValProcPrecisionState>({
    precisionStd1Count: "5",
    precisionStd2Count: "1"
  });

  // Section 4.5 System Suitability State
  const [sysSuitability, setSysSuitability] = useState<SystemSuitabilityState>({
    plateNumber: "5000",
    tailingFactor: "2.5",
    injectionCount: "5",
    areaRSD: "2.0",
    retentionRSD: "1.0",
    recoveryRange: "98.0%~102.0%",
    controlInjectionCount: "5",
    controlAreaRSD: "2.0"
  });

  // Section 4.7 Calculation State
  const [calculationState, setCalculationState] = useState<CalculationState>({
    kf: true,
    lod: false,
    sr: false,
    tga: false
  });

  // Section 4.8 Acceptance Criteria State
  const [acceptanceCriteria, setAcceptanceCriteria] = useState<AcceptanceCriterion[]>([
    { 
      id: '1', 
      name: "含量（按无水物计）\nAssay(on anhydrous basis)", 
      criteria: "NLT 95.0%" 
    },
    { 
      id: '2', 
      name: "鉴别\nIdentification", 
      criteria: "供试品溶液中主峰保留时间应与对照品溶液中主峰的保留时间一致。\nThe retention time of the main peak of sample solution corresponds to that in the standard solution." 
    }
  ]);

  // Specificity State for 6.x
  const [specificityState, setSpecificityState] = useState<SpecificityState>({
    retentionDevLimit: "5.0"
  });

  // Linearity State for 6.x
  const [linearityState, setLinearityState] = useState<LinearityState>({
    solutions: [
      { id: '1', conc: "80%", weight: "16", volume: "100" },
      { id: '2', conc: "90%", weight: "18", volume: "100" },
      { id: '3', conc: "100%", weight: "20", volume: "100" },
      { id: '4', conc: "110%", weight: "22", volume: "100" },
      { id: '5', conc: "120%", weight: "24", volume: "100" },
    ]
  });

  // Precision State for 6.x
  const [precisionState, setPrecisionState] = useState<PrecisionState>({
    precisionLimit: "NMT 2.0%"
  });

  // Accuracy State for 6.x
  const [accuracyState, setAccuracyState] = useState<AccuracyState>({
    recoveryRange: "98.0%-102.0%",
    rsdLimit: "2.0%"
  });

  // Stability State for 6.x
  const [stabilityState, setStabilityState] = useState<StabilityState>({
    sampleTemp: "5±3",
    sampleRecovery: "98.0%~102.0%",
    standardTemp: "5±3",
    standardRecovery: "98.0%~102.0%"
  });

  // Prerequisite State for 11.x
  const [prerequisiteState, setPrerequisiteState] = useState<PrerequisiteState>({
    columnSuppliers: {
      'column': 'Waters',
      'ghostBuster': 'Welch'
    },
    reagentRows: [
      { id: '1', name: '磷酸二氢钾 Potassium dihydrogen phosphate', grade: 'HPLC或以上级别 HPLC and above level' },
      { id: '2', name: '氢氧化钾 Potassium hydroxide', grade: 'HPLC或以上级别 HPLC and above level' },
      { id: '3', name: '水 Water', grade: '超纯水 Ultrapure water' },
      { id: '4', name: '乙腈 Acetonitrile', grade: 'HPLC或以上级别 HPLC and above level' },
      { id: '5', name: '甲醇 Methanol', grade: 'HPLC或以上级别 HPLC and above level' }
    ]
  });

  // Update productId in nested states when it changes
  useEffect(() => {
    setSolutionPreps(prev => ({
      ...prev,
      standard: {
        ...prev.standard,
        detail: `取 ${productId} 对照品约 20mg，精密称定，置 100ml量瓶中，加入稀释剂振摇溶解并稀释至刻度，摇匀，平行配制 2 份。（${productId}:0.2mg/ml）\nAccurately weigh about 20mg of ${productId} reference standard into a 100ml volumetric flask, shake to dissolve and dilute to volume with diluent, mix well. Prepare 2 solutions in parallel. (${productId}:0.2mg/ml)`
      }
    }));
  }, [productId]);

  // Validation Items State
  const [validationOptions, setValidationOptions] = useState({
    systemSuitability: true, // mandatory
    specificity: true,
    linearity: true,
    precision: true,
    accuracy: true,
    stability: true
  });

  // Personnel State
  const [preparerName, setPreparerName] = useState<string>("龙慧\nHui Long");
  const [preparerDept, setPreparerDept] = useState<string>("QC");
  const [preparerPosition, setPreparerPosition] = useState<string>("QC 工程师\nQC Engineer");
  const [rev1Name, setRev1Name] = useState<string>("李利娜\nLina Li");
  const [rev1Dept, setRev1Dept] = useState<string>("QC");
  const [rev1Pos, setRev1Pos] = useState<string>("QC 组长\nQC Group");
  const [rev2Name, setRev2Name] = useState<string>("叶文\nWen Ye");
  const [rev2Dept, setRev2Dept] = useState<string>("QA");
  const [rev2Pos, setRev2Pos] = useState<string>("QA 工程师\nQA Engineer");
  const [rev3Name, setRev3Name] = useState<string>("顾玉豪\nYuhao Gu");
  const [rev3Dept, setRev3Dept] = useState<string>("QC");
  const [rev3Pos, setRev3Pos] = useState<string>("QC 经理\nQC Manager");
  const [approverName, setApproverName] = useState<string>("刘钟华\nZhonghua Liu");
  const [approverDept, setApproverDept] = useState<string>("QA");
  const [approverPos, setApproverPos] = useState<string>("QA 经理\nQA Manager");

  const protocolNumber = (
    <span>
      AVP-{protocolCode || <span className="text-red-500">N/A</span>}-{protocolVersion || <span className="text-red-500">N/A</span>}.{projectNumber}
    </span>
  );

  const sections = useMemo(() => getSections(
    productId, 
    setProductId, 
    protocolCode, 
    setProtocolCode, 
    protocolVersion, 
    setProtocolVersion,
    projectNumber,
    {
      preparer: { name: preparerName, dept: preparerDept, pos: preparerPosition },
      setPreparer: { setName: setPreparerName, setDept: setPreparerDept, setPos: setPreparerPosition },
      rev1: { name: rev1Name, dept: rev1Dept, pos: rev1Pos },
      setRev1: { setName: setRev1Name, setDept: setRev1Dept, setPos: setRev1Pos },
      rev2: { name: rev2Name, dept: rev2Dept, pos: rev2Pos },
      setRev2: { setName: setRev2Name, setDept: setRev2Dept, setPos: setRev2Pos },
      rev3: { name: rev3Name, dept: rev3Dept, pos: rev3Pos },
      setRev3: { setName: setRev3Name, setDept: setRev3Dept, setPos: setRev3Pos },
      approver: { name: approverName, dept: approverDept, pos: approverPos },
      setApprover: { setName: setApproverName, setDept: setApproverDept, setPos: setApproverPos },
    },
    validationOptions,
    setValidationOptions,
    {
      chemicalFormula,
      setChemicalFormula,
      chemicalName,
      setChemicalName
    },
    {
      gradientData,
      setGradientData
    },
    {
      testingConditions,
      setTestingConditions
    },
    {
      solutionPreps,
      setSolutionPreps
    },
    {
      solDetail,
      setSolDetail
    },
    {
      sequenceState,
      setSequenceState
    },
    {
      valProcSysSuitState,
      setValProcSysSuitState
    },
    {
      valProcPrecisionState,
      setValProcPrecisionState
    },
    {
      sysSuitability,
      setSysSuitability
    },
    {
      calculationState,
      setCalculationState
    },
    {
      acceptanceCriteria,
      setAcceptanceCriteria
    },
    {
      specificityState,
      setSpecificityState
    },
    {
      linearityState,
      setLinearityState
    },
    {
      precisionState,
      setPrecisionState
    },
    {
      accuracyState,
      setAccuracyState
    },
    {
      stabilityState,
      setStabilityState
    },
    {
      prerequisiteState,
      setPrerequisiteState
    }
  ), [productId, protocolCode, protocolVersion, projectNumber, preparerName, preparerDept, preparerPosition, rev1Name, rev1Dept, rev1Pos, rev2Name, rev2Dept, rev2Pos, rev3Name, rev3Dept, rev3Pos, approverName, approverDept, approverPos, validationOptions, chemicalFormula, chemicalName, gradientData, testingConditions, solutionPreps, solDetail, sequenceState, valProcSysSuitState, valProcPrecisionState, sysSuitability, calculationState, acceptanceCriteria, specificityState, linearityState, precisionState, accuracyState, stabilityState, prerequisiteState]);

  const filteredNavItems = useMemo(() => {
    const items: NavItem[] = [
      { id: 'cover', label: '封面 Cover' },
      { id: 'objective', label: '1. 目的 Objective' },
      { id: 'scope', label: '2. 范围 Scope' },
      { id: 'responsibilities', label: '3. 职责 Responsibilities' },
      { id: 'method-desc', label: '4. 检验方法描述 Test Method' },
      { id: 'references-5', label: '5. 参考文件 References' },
      { id: 'validation-content', label: '6. 验证内容 Validation content' }
    ];

    let subIndex = 1;
    if (validationOptions.systemSuitability) items.push({ id: 'val-sys-suit', label: `6.${subIndex++} 系统适用性 Sys. Suit.`, isSubItem: true });
    if (validationOptions.specificity) items.push({ id: 'val-spec', label: `6.${subIndex++} 专属性 Specificity`, isSubItem: true });
    if (validationOptions.linearity) items.push({ id: 'val-lin', label: `6.${subIndex++} 线性和范围 Linearity`, isSubItem: true });
    if (validationOptions.precision) items.push({ id: 'val-prec', label: `6.${subIndex++} 精密度 Precision`, isSubItem: true });
    if (validationOptions.accuracy) items.push({ id: 'val-acc', label: `6.${subIndex++} 准确度 Accuracy`, isSubItem: true });
    if (validationOptions.stability) items.push({ id: 'val-stab', label: `6.${subIndex++} 溶液稳定性 Stability`, isSubItem: true });

    items.push(
      { id: 'summary-deviations', label: '7. 偏差摘要 Deviations' },
      { id: 'support-documents', label: '8. 支持性文件 Support Docs' },
      { id: 'acceptance-criteria-9', label: '9. 可接受标准 Acceptance' },
      { id: 'validation-report', label: '10. 验证报告 Report' },
      { id: 'history', label: '11. 变更历史 History' },
      { id: 'validation-procedure-title', label: '验证步骤 Validation Procedure' },
      { id: 'val-pre-1', label: '先决条件 1: Training', isSubItem: true },
      { id: 'val-pre-2', label: '先决条件 2: Instruments', isSubItem: true }
    );

    if (validationOptions.systemSuitability) items.push({ id: 'val-proc-sys', label: '(一) 系统适用性 Sys. Suit.', isSubItem: true });
    if (validationOptions.specificity) items.push({ id: 'val-proc-spec', label: '(二) 专属性 Specificity', isSubItem: true });
    if (validationOptions.linearity) items.push({ id: 'val-proc-lin', label: '(三) 线性 Linearity', isSubItem: true });
    if (validationOptions.precision) items.push({ id: 'val-proc-prec', label: '(四) 精密度 Precision', isSubItem: true });
    if (validationOptions.accuracy) items.push({ id: 'val-proc-acc', label: '(五) 准确度 Accuracy', isSubItem: true });
    if (validationOptions.stability) items.push({ id: 'val-proc-stab', label: '(六) 稳定性 Stability', isSubItem: true });

    return items;
  }, [validationOptions]);
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => setActiveSectionId(id), 100);
    }
    setSidebarOpen(false);
  };

  useEffect(() => {
    // Only set up observer if we are in protocol view
    if (currentView !== 'protocol') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSectionId(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections, currentView]);

  const currentSectionTitle = currentView === 'protocol' 
    ? (sections.find(s => s.id === activeSectionId)?.title || "Protocol")
    : "Data Mapping Dictionary";

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden text-gray-900">
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <Sidebar 
        navItems={filteredNavItems} 
        activeId={activeSectionId} 
        onSelect={scrollToSection} 
        isOpen={isSidebarOpen} 
        currentView={currentView}
        onChangeView={setCurrentView}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="md:hidden flex items-center justify-between bg-white border-b border-gray-200 p-4 shrink-0 z-10">
          <button onClick={() => setSidebarOpen(true)} className="p-1 rounded-md hover:bg-gray-100">
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <span className="font-semibold text-sm text-gray-800 truncate px-2">{currentSectionTitle}</span>
          <div className="w-6" />
        </div>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          {currentView === 'protocol' ? (
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg flex flex-col mb-8">
              <div className="p-8 md:p-12">
                <ProtocolHeader productId={productId} protocolNumber={protocolNumber} />
                
                <div className="space-y-4">
                  {sections.map((section) => {
                    const isSub = section.level === 2;
                    return (
                      <div key={section.id} id={section.id} className={`scroll-mt-8 ${!isSub ? 'border-t-2 border-dashed border-gray-200 pt-16 mt-16 first:border-t-0 first:pt-0 first:mt-0' : 'pl-6 pt-4'}`}>
                        <h2 className={`${isSub ? 'text-lg font-semibold text-blue-700 mb-4' : 'text-2xl font-bold text-gray-800 border-b pb-2 mb-6'} ${section.id === 'cover' ? 'hidden' : ''}`}>
                          {section.title}
                        </h2>
                        {section.subtitle && <h3 className="text-lg text-gray-600 mb-4">{section.subtitle}</h3>}
                        <div className={`prose prose-sm max-w-none text-gray-800 ${isSub ? 'border-l-2 border-blue-100 pl-4' : ''}`}>
                          {section.content}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <DataMappingDictionary />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
