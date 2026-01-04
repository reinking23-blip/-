
import React, { useState, useEffect, useMemo } from 'react';
import { getSections } from './data/protocolData';
import { Sidebar } from './components/Sidebar';
import { ProtocolHeader } from './components/ProtocolHeader';
import { DataMappingDictionary } from './components/DataMappingDictionary';
import { ReportDataMappingDictionary } from './components/ReportDataMappingDictionary';
import { ReportDocument } from './components/ReportDocument';
import { DocumentPage } from './components/DocumentPage';
import { ReportDocumentPRD } from './components/ReportDocumentPRD';
import { ProtocolDocumentPRD } from './components/ProtocolDocumentPRD';
import { Menu, Download } from 'lucide-react';
import { 
  NavItem, 
  Personnel, 
  ValidationOptions,
  GradientRow,
  TestingCondition,
  SolutionPrepsState,
  SolutionDetailState,
  SequenceState,
  ValProcSysSuitState,
  ValProcPrecisionState,
  SystemSuitabilityState,
  CalculationState,
  AcceptanceCriterion,
  SpecificityState,
  LinearityState,
  PrecisionState,
  AccuracyState,
  StabilityState,
  PrerequisiteState,
  EquipmentConfirmationRow,
  ReportReagentValues,
  ReportSampleRSState,
  ExperimentalDataState
} from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'protocol' | 'dictionary' | 'report' | 'document' | 'prd' | 'protocol_prd' | 'report_dictionary'>('protocol');
  const [activeSectionId, setActiveSectionId] = useState<string>('cover');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [productId, setProductId] = useState<string>("HY130225");
  const [protocolCode, setProtocolCode] = useState<string>("A316");
  const [protocolVersion, setProtocolVersion] = useState<string>("02");
  const [projectNumber, setProjectNumber] = useState<string>("00");
  
  // Training Date State for Report
  const [trainingDate, setTrainingDate] = useState<string>("");

  // Report History State
  const [reportHistoryDate, setReportHistoryDate] = useState<string>("");

  // Report Equipment Confirmation State
  const [reportEquipment, setReportEquipment] = useState<EquipmentConfirmationRow[]>([
    { id: 'balance', name: '电子天平\nElectronic Balance', supplier: 'Mettler', equipmentNumber: 'EB301', model: 'XS105DU', retestDate: '2025-02-14' },
    { id: 'hplc', name: '液相色谱仪\nHigh Performance Liquid Chromatography', supplier: 'Thermo', equipmentNumber: 'LC312', model: 'Ultimate 3000', retestDate: '2025-05-24' }
  ]);

  // Report Column Confirmation Serial Numbers State
  const [reportColumnSerials, setReportColumnSerials] = useState<Record<string, string>>({});

  // Report Reagent Confirmation State
  const [reportReagentValues, setReportReagentValues] = useState<Record<string, ReportReagentValues>>({
    '1': { batch: 'C14175044', supplier: '麦克林\nMacklin', expiryDate: '2024-09-12' },
    '2': { batch: 'P3134478', supplier: 'GENERAL-REAGENT', expiryDate: '2026-08-06' },
    '3': { batch: '20240909', supplier: '自制\nHomemade', expiryDate: '2024-09-11' },
    '4': { batch: 'I1333430412', supplier: '默克\nMerck', expiryDate: '2026-09-04' },
    '5': { batch: 'I1338907', supplier: '默克\nMerck', expiryDate: '2026-07-04' }
  });

  // Report Sample & RS Confirmation State
  const [reportSampleRS, setReportSampleRS] = useState<ReportSampleRSState>({
    rs: {
      batch: 'RS324110',
      retestDate: '2025-07-07',
      assay: '99.8%',
      source: '上海皓元医药\nShanghai ChemExpress'
    },
    sample: {
      batch: 'HY-1302_25-20240705',
      retestDate: '',
      assay: '-',
      source: '上海皓元医药\nShanghai ChemExpress'
    }
  });

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
    rsdLimit: "2.0"
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

  // Experimental Data State (DocumentPage)
  const [experimentalData, setExperimentalData] = useState<ExperimentalDataState>({
    systemSuitability: {
      sequenceId: "20240909",
      blankInterference: "空白溶液无干扰\nThere was no interference in blank solution",
      theoreticalPlates: "169997",
      tailingFactor: "0.9",
      std1Weight: "20.48",
      std1AvgArea: "5209.385",
      std1AreaRSD: "0.06",
      std1RtRSD: "0.04",
      std1Injections: [
        { peakArea: "5212.52", rt: "18.933" },
        { peakArea: "5209.067", rt: "18.943" },
        { peakArea: "5206.288", rt: "18.937" },
        { peakArea: "5207.091", rt: "18.943" },
        { peakArea: "5211.958", rt: "18.953" },
      ],
      std2Weight: "20.98",
      std2PeakArea: "5310.797",
      std2Rt: "18.953",
      std2Recovery: "99.5",
      controls: [
        { name: "STD1-6 (4h)", peakArea: "5223.806", rsd: "0.13" },
        { name: "STD1-7 (10h)", peakArea: "5204.029", rsd: "0.07" },
        { name: "STD1-8 (16h)", peakArea: "5219.927", rsd: "0.10" },
      ],
      conclusion: "符合规定"
    },
    specificity: {
      sequenceId: "20240909",
      stdRt: "18.953",
      sampleRt: "18.957",
      rtDeviation: "0.02",
      peakPurity: "1000",
      conclusion: "符合规定"
    },
    linearity: {
      sequenceId: "20240909",
      dilutionX1: "100",
      dilutionX2: "50",
      assayValue: "0.998",
      rows: [
        { id: "L1", level: "0.8", weight: "16.4", conc: "163.67", area: "4144.62", actualLevel: "81.84" },
        { id: "L2", level: "0.9", weight: "19.02", conc: "189.82", area: "4851.21", actualLevel: "94.91" },
        { id: "L3", level: "1.0", weight: "20.43", conc: "203.89", area: "5165.33", actualLevel: "101.95" },
        { id: "L4", level: "1.1", weight: "22.74", conc: "226.95", area: "5753.92", actualLevel: "113.47" },
        { id: "L5", level: "1.2", weight: "12.90", conc: "257.48", area: "6551.63", actualLevel: "128.74" },
      ],
      statsN: "5",
      statsR: "0.999785",
      statsSlope: "25.4869",
      statsIntercept: "-17.1752",
      statsPercentIntercept: "0.33",
      statsRSS: "1430.23",
      equation: "y=25.4869x-17.1752",
      conclusion: "符合规定"
    },
    precision: {
      sequenceId: "20240909",
      stdWeight: "20.48",
      stdAssay: "0.998",
      stdVolume: "100",
      stdAvgArea: "5209.3848",
      splVolume: "50",
      rows: [
        { id: "P1", name: "Precision-1", weight: "10.46", area: "5354.984", assay: "100.43" },
        { id: "P2", name: "Precision-2", weight: "10.41", area: "5368.216", assay: "101.16" },
        { id: "P3", name: "Precision-3", weight: "10.98", area: "5576.019", assay: "99.62" },
        { id: "P4", name: "Precision-4", weight: "10.72", area: "5419.397", assay: "99.17" },
        { id: "P5", name: "Precision-5", weight: "10.32", area: "5211.439", assay: "99.07" },
        { id: "P6", name: "Precision-6", weight: "10.66", area: "5393.563", assay: "99.26" },
      ],
      avgAssay: "99.79",
      rsd: "0.84",
      conclusion: "符合规定"
    },
    accuracy: {
      sequenceId: "20240909",
      slope: "25.4869",
      intercept: "-17.1752",
      precAvgAssay: "99.79",
      splVolume: "50",
      rows: [
        { id: "P1", name: "Precision-1", weight: "10.46", area: "5354.984", detConc: "210.78", detQty: "10539.05", theoQty: "10437.63", rec: "100.97" },
        { id: "P2", name: "Precision-2", weight: "10.41", area: "5368.216", detConc: "211.30", detQty: "10565.01", theoQty: "10387.74", rec: "101.71" },
        { id: "P3", name: "Precision-3", weight: "10.98", area: "5576.019", detConc: "219.45", detQty: "10972.68", theoQty: "10956.52", rec: "100.15" },
        { id: "P4", name: "Precision-4", weight: "10.72", area: "5419.397", detConc: "213.31", detQty: "10665.42", theoQty: "10697.07", rec: "99.70" },
        { id: "P5", name: "Precision-5", weight: "10.32", area: "5211.439", detConc: "205.15", detQty: "10257.45", theoQty: "10297.93", rec: "99.61" },
        { id: "P6", name: "Precision-6", weight: "10.66", area: "5393.563", detConc: "212.29", detQty: "10614.74", theoQty: "10637.20", rec: "99.79" },
      ],
      rsd: "0.84",
      conclusion: "符合规定"
    },
    stability: {
      stdSequenceId: "20240909",
      splSequenceId: "20240909",
      stdCondition: "对照品溶液 (5℃±3℃)",
      splCondition: "供试品溶液 (5℃±3℃)",
      stdPoints: [
        { time: "0", area: "5212.520", recovery: "" },
        { time: "4", area: "5223.806", recovery: "100.2" },
        { time: "10", area: "5204.029", recovery: "99.8" },
        { time: "16", area: "5219.927", recovery: "100.1" },
      ],
      splPoints: [
        { time: "0", area: "5201.603", recovery: "" },
        { time: "6", area: "5173.402", recovery: "99.5" },
        { time: "12", area: "5174.082", recovery: "99.5" },
      ],
      stdAcceptanceCriteria: `对照品溶液在5±3℃条件下，密闭保存，分别于0h、12h、24h、36h进样，考察HY130225的峰面积，与0h相比，HY130225峰面积的回收率应在98.0%~102.0%之间。\nStandard solution: Sealed and stored at 5±3℃ condition，the solution should be injected at the each point 0h、12h、24h、36h, the peak area of HY130225 should be evaluated, The recovery for peak area of HY130225 at each point should be 98.0%~102.0% compared with that of 0h.`,
      stdConclusion: `对照品溶液在5±3℃条件下，密闭保存16h稳定。\nThe standard solution was stable when sealed and stored under the 5±3℃condition for 16h.`,
      splAcceptanceCriteria: `供试品溶液在5±3℃条件下，密闭保存，分别于0h、12h、24h、36h进样，考察HY130225的峰面积，与0h相比，HY130225峰面积的回收率应在98.0%~102.0%之间。\nSample solution: Sealed and stored at 5±3℃ condition，the solution should be injected at the each point 0h、12h、24h、36h, the peak area of HY130225 should be evaluated, The recovery for peak area of HY130225 at each point should be 98.0%~102.0% compared with that of 0h.`,
      conclusion: `供试品溶液在5±3℃条件下，密闭保存12h稳定。\nThe sample solution was stable when sealed and stored under the 5±3℃ condition for 12h.`
    }
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
  const [validationOptions, setValidationOptions] = useState<ValidationOptions>({
    systemSuitability: true, // mandatory
    specificity: true,
    linearity: true,
    precision: true,
    accuracy: true,
    stability: true
  });

  // Personnel State (PROTOCOL) - These are separate from Report Personnel
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

  // Personnel State (REPORT - Independent/Decoupled)
  // Initialize with Report preset data as requested
  const [reportPreparer, setReportPreparer] = useState<Personnel>({ 
    name: '龙慧\nHui Long', 
    dept: 'QC', 
    pos: 'QC工程师\nQC Engineer' 
  });

  const [reportReviewers, setReportReviewers] = useState<Personnel[]>([
    { name: '李利娜\nLina Li', dept: 'QC', pos: 'QC组长\nQC Group Leader' },
    { name: '顾玉豪\nYuhao Gu', dept: 'QC', pos: 'QC经理\nQC Manager' },
    { name: '叶文\nWen Ye', dept: 'QA', pos: 'QA工程师\nQA Engineer' },
  ]);

  const [reportApprover, setReportApprover] = useState<Personnel>({ 
    name: '刘钟华\nZhonghua Liu', 
    dept: 'QA', 
    pos: 'QA经理\nQA Manager' 
  });

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

  const protocolNavItems = useMemo(() => {
    // ... [Original Nav Items Logic] ...
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

  const reportNavItems = useMemo(() => {
    // ... [Original Report Nav Items Logic] ...
    const items: NavItem[] = [
      { id: 'report-cover', label: '封面 Cover' },
      { id: 'report-objective', label: '1. 目的 Objective' },
      { id: 'report-scope', label: '2. 范围 Scope' },
      { id: 'report-results', label: '3. 验证结果 Results' },
      { id: 'report-method', label: '4. 方法描述 Method' },
      { id: 'report-validation-content', label: '5. 验证内容 Content' },
      { id: 'report-val-training', label: '5.1 培训确认 Training', isSubItem: true },
      { id: 'report-val-equipment', label: '5.2 仪器试剂 Equipment', isSubItem: true },
    ];

    let subIndex = 3;
    if (validationOptions.systemSuitability) items.push({ id: 'report-val-sys-suit', label: `5.${subIndex++} 系统适用性 Sys Suit`, isSubItem: true });
    if (validationOptions.specificity) items.push({ id: 'report-val-specificity', label: `5.${subIndex++} 专属性 Specificity`, isSubItem: true });
    if (validationOptions.linearity) items.push({ id: 'report-val-linearity', label: `5.${subIndex++} 线性 Linearity`, isSubItem: true });
    if (validationOptions.precision) items.push({ id: 'report-val-precision', label: `5.${subIndex++} 精密度 Precision`, isSubItem: true });
    if (validationOptions.accuracy) items.push({ id: 'report-val-accuracy', label: `5.${subIndex++} 准确度 Accuracy`, isSubItem: true });
    if (validationOptions.stability) items.push({ id: 'report-val-stability', label: `5.${subIndex++} 稳定性 Stability`, isSubItem: true });

    items.push(
      { id: 'report-deviations', label: '6. 偏差 Deviations' },
      { id: 'report-conclusion', label: '7. 结论 Conclusion' },
      { id: 'report-history', label: '8. 变更历史 History' }
    );
    return items;
  }, [validationOptions]);

  const filteredNavItems = useMemo(() => {
    if (currentView === 'report' || currentView === 'report_dictionary') return reportNavItems;
    if (currentView === 'protocol') return protocolNavItems;
    return [];
  }, [currentView, reportNavItems, protocolNavItems]);
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => setActiveSectionId(id), 100);
    }
    setSidebarOpen(false);
  };

  useEffect(() => {
    if (currentView !== 'protocol' && currentView !== 'report') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSectionId(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    filteredNavItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [filteredNavItems, currentView]);

  const currentSectionTitle = useMemo(() => {
    if (currentView === 'protocol') {
      return (sections.find(s => s.id === activeSectionId)?.title || "Protocol");
    } else if (currentView === 'report') {
      return "Report Document";
    } else if (currentView === 'dictionary') {
      return "Data Mapping Dictionary";
    } else if (currentView === 'report_dictionary') {
      return "Report Data Mapping Dictionary";
    } else if (currentView === 'prd') {
      return "Report PRD";
    } else if (currentView === 'protocol_prd') {
      return "Protocol PRD";
    } else {
      return "Experimental Data Document";
    }
  }, [currentView, sections, activeSectionId]);

  const exportToWord = () => {
    const element = document.getElementById('main-content');
    if (!element) return;

    const clone = element.cloneNode(true) as HTMLElement;

    // 1. Sync Input values to clone
    const origInputs = element.querySelectorAll('input');
    const cloneInputs = clone.querySelectorAll('input');
    origInputs.forEach((orig, i) => {
        if (cloneInputs[i]) {
            if (orig.type === 'checkbox' || orig.type === 'radio') {
                if (orig.checked) cloneInputs[i].setAttribute('checked', 'checked');
                else cloneInputs[i].removeAttribute('checked');
            } else {
                cloneInputs[i].setAttribute('value', orig.value);
            }
        }
    });
    
    // 2. Sync Textarea values
    const origTextareas = element.querySelectorAll('textarea');
    const cloneTextareas = clone.querySelectorAll('textarea');
    origTextareas.forEach((orig, i) => {
        if (cloneTextareas[i]) {
            cloneTextareas[i].textContent = orig.value;
        }
    });
    
    // 3. Sync Select values
    const origSelects = element.querySelectorAll('select');
    const cloneSelects = clone.querySelectorAll('select');
    origSelects.forEach((orig, i) => {
        if (cloneSelects[i]) {
             const idx = orig.selectedIndex;
             (cloneSelects[i] as any).selectedText = orig.options[idx]?.text;
        }
    });

    // Replace inputs with spans/divs for better Word compatibility
    clone.querySelectorAll('input[type="checkbox"]').forEach((cb: any) => {
        const span = document.createElement('span');
        span.textContent = cb.hasAttribute('checked') ? '☑' : '☐';
        span.style.fontSize = '1.2em';
        span.style.fontFamily = 'serif';
        cb.parentNode?.replaceChild(span, cb);
    });

    clone.querySelectorAll('input').forEach((input: any) => {
        if (!input.parentNode) return;
        const span = document.createElement('span');
        span.textContent = input.getAttribute('value') || '';
        
        if (input.classList.contains('bg-yellow-300')) {
             span.style.backgroundColor = '#FFFF00'; 
             span.style.borderBottom = '1px solid #000';
             span.style.fontWeight = 'bold';
             span.style.padding = '0 4px';
        } else {
             // Optional: add minimal styling for standard inputs if needed
        }
        input.parentNode?.replaceChild(span, input);
    });

    clone.querySelectorAll('textarea').forEach((textarea: any) => {
        const div = document.createElement('div');
        div.innerHTML = (textarea.textContent || '').replace(/\n/g, '<br/>');
        if (textarea.classList.contains('bg-yellow-300')) {
             div.style.backgroundColor = '#FFFF00';
             div.style.borderBottom = '1px solid #000';
             div.style.fontWeight = 'bold';
        }
        textarea.parentNode?.replaceChild(div, textarea);
    });

    clone.querySelectorAll('select').forEach((select: any) => {
        const span = document.createElement('span');
        span.textContent = (select as any).selectedText || '';
        select.parentNode?.replaceChild(span, select);
    });

    // Remove buttons and icons
    clone.querySelectorAll('button').forEach(btn => btn.remove());
    clone.querySelectorAll('svg').forEach(svg => svg.remove());

    const htmlContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
            <meta charset="utf-8">
            <title>Export</title>
            <style>
                body { font-family: 'Times New Roman', serif; font-size: 10.5pt; }
                table { border-collapse: collapse; width: 100%; margin-bottom: 12px; }
                td, th { border: 1px solid #000; padding: 4px 8px; vertical-align: top; text-align: center; }
                td.text-left { text-align: left; }
                td.text-right { text-align: right; }
                .bg-gray-100, .bg-gray-50 { background-color: #F2F2F2; }
                .font-bold { font-weight: bold; }
                .text-xs { font-size: 9pt; }
                .text-sm { font-size: 10.5pt; }
                .text-lg { font-size: 14pt; }
                .text-xl { font-size: 16pt; }
                h1, h2, h3, h4 { color: #000; margin-top: 12px; margin-bottom: 6px; }
            </style>
        </head>
        <body>
            ${clone.innerHTML}
        </body>
        </html>
    `;

    const blob = new Blob(['\ufeff', htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const timestamp = new Date().toISOString().split('T')[0];
    link.download = `Export_${currentView}_${timestamp}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <div className="md:hidden flex items-center justify-between bg-white border-b border-gray-200 p-4 shrink-0 z-10">
          <button onClick={() => setSidebarOpen(true)} className="p-1 rounded-md hover:bg-gray-100">
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <span className="font-semibold text-sm text-gray-800 truncate px-2">{currentSectionTitle}</span>
          <div className="w-6" />
        </div>

        {/* Floating Export Button */}
        <button 
            onClick={exportToWord}
            className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-colors flex items-center gap-2"
            title="Export to Word"
        >
            <Download size={24} />
            <span className="font-semibold hidden md:inline">Export Word</span>
        </button>

        <main id="main-content" className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
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
          ) : currentView === 'report' ? (
            <ReportDocument 
              productId={productId}
              protocolCode={protocolCode}
              protocolVersion={protocolVersion}
              projectNumber={projectNumber}
              preparer={reportPreparer}
              setPreparer={setReportPreparer}
              reviewers={reportReviewers}
              setReviewers={setReportReviewers}
              approver={reportApprover}
              setApprover={setReportApprover}
              validationOptions={validationOptions}
              // Pass training date state
              trainingDate={trainingDate}
              setTrainingDate={setTrainingDate}
              // Pass report equipment state
              reportEquipment={reportEquipment}
              setReportEquipment={setReportEquipment}
              // Pass column serials
              reportColumnSerials={reportColumnSerials}
              setReportColumnSerials={setReportColumnSerials}
              // Pass report reagents state
              reportReagentValues={reportReagentValues}
              setReportReagentValues={setReportReagentValues}
              // Pass report sample & RS state
              reportSampleRS={reportSampleRS}
              setReportSampleRS={setReportSampleRS}
              // Pass prerequisites for columns and reagents
              prerequisiteState={prerequisiteState}
              // Pass state required for Method Description in Report
              chemicalFormula={chemicalFormula}
              setChemicalFormula={setChemicalFormula}
              chemicalName={chemicalName}
              setChemicalName={setChemicalName}
              testingConditions={testingConditions}
              setTestingConditions={setTestingConditions}
              gradientData={gradientData}
              setGradientData={setGradientData}
              solutionPreps={solutionPreps}
              setSolutionPreps={setSolutionPreps}
              solDetail={solDetail}
              setSolDetail={setSolDetail}
              sequenceState={sequenceState}
              setSequenceState={setSequenceState}
              sysSuitability={sysSuitability}
              setSysSuitability={setSysSuitability}
              calculationState={calculationState}
              setCalculationState={setCalculationState}
              acceptanceCriteria={acceptanceCriteria}
              setAcceptanceCriteria={setAcceptanceCriteria}
              // Pass experimental data to report
              experimentalData={experimentalData}
              // Pass specificity state to report
              specificityState={specificityState}
              // Pass accuracy state
              accuracyState={accuracyState}
              // Pass stability state
              stabilityState={stabilityState}
              // Pass precision state
              precisionState={precisionState}
              // Pass report history state
              reportHistoryDate={reportHistoryDate}
              setReportHistoryDate={setReportHistoryDate}
            />
          ) : currentView === 'dictionary' ? (
            <DataMappingDictionary />
          ) : currentView === 'report_dictionary' ? (
            <ReportDataMappingDictionary />
          ) : currentView === 'prd' ? (
            <ReportDocumentPRD />
          ) : currentView === 'protocol_prd' ? (
            <ProtocolDocumentPRD />
          ) : (
            <DocumentPage 
              data={experimentalData}
              setData={setExperimentalData}
              productId={productId}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
