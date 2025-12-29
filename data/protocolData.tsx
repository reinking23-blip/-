import React from 'react';
import { Section } from '../types';
import { Plus, Trash2 } from 'lucide-react';
import { GradientRow, TestingCondition, SolutionPrepsState, SolutionDetailState, SequenceState, ValProcSysSuitState, ValProcPrecisionState, SystemSuitabilityState, CalculationState, AcceptanceCriterion, SpecificityState, LinearityState, LinearitySolution, PrecisionState, AccuracyState, StabilityState, PrerequisiteState } from '../types';

interface PersonnelData {
  preparer: { name: string; dept: string; pos: string };
  setPreparer: { setName: (v: string) => void; setDept: (v: string) => void; setPos: (v: string) => void };
  rev1: { name: string; dept: string; pos: string };
  setRev1: { setName: (v: string) => void; setDept: (v: string) => void; setPos: (v: string) => void };
  rev2: { name: string; dept: string; pos: string };
  setRev2: { setName: (v: string) => void; setDept: (v: string) => void; setPos: (v: string) => void };
  rev3: { name: string; dept: string; pos: string };
  setRev3: { setName: (v: string) => void; setDept: (v: string) => void; setPos: (v: string) => void };
  approver: { name: string; dept: string; pos: string };
  setApprover: { setName: (v: string) => void; setDept: (v: string) => void; setPos: (v: string) => void };
}

interface ValidationOptions {
  systemSuitability: boolean;
  specificity: boolean;
  linearity: boolean;
  precision: boolean;
  accuracy: boolean;
  stability: boolean;
}

interface ProductDetails {
  chemicalFormula: string;
  setChemicalFormula: (val: string) => void;
  chemicalName: string;
  setChemicalName: (val: string) => void;
}

interface GradientState {
  gradientData: GradientRow[];
  setGradientData: React.Dispatch<React.SetStateAction<GradientRow[]>>;
}

interface TestingConditionsState {
  testingConditions: TestingCondition[];
  setTestingConditions: React.Dispatch<React.SetStateAction<TestingCondition[]>>;
}

interface SolutionPrepsStateHandle {
  solutionPreps: SolutionPrepsState;
  setSolutionPreps: React.Dispatch<React.SetStateAction<SolutionPrepsState>>;
}

interface SolutionDetailHandle {
  solDetail: SolutionDetailState;
  setSolDetail: React.Dispatch<React.SetStateAction<SolutionDetailState>>;
}

interface SequenceStateHandle {
  sequenceState: SequenceState;
  setSequenceState: React.Dispatch<React.SetStateAction<SequenceState>>;
}

interface ValProcSysSuitStateHandle {
  valProcSysSuitState: ValProcSysSuitState;
  setValProcSysSuitState: React.Dispatch<React.SetStateAction<ValProcSysSuitState>>;
}

interface ValProcPrecisionStateHandle {
  valProcPrecisionState: ValProcPrecisionState;
  setValProcPrecisionState: React.Dispatch<React.SetStateAction<ValProcPrecisionState>>;
}

interface SystemSuitabilityStateHandle {
  sysSuitability: SystemSuitabilityState;
  setSysSuitability: React.Dispatch<React.SetStateAction<SystemSuitabilityState>>;
}

interface CalculationStateHandle {
  calculationState: CalculationState;
  setCalculationState: React.Dispatch<React.SetStateAction<CalculationState>>;
}

interface AcceptanceCriteriaHandle {
  acceptanceCriteria: AcceptanceCriterion[];
  setAcceptanceCriteria: React.Dispatch<React.SetStateAction<AcceptanceCriterion[]>>;
}

interface SpecificityStateHandle {
  specificityState: SpecificityState;
  setSpecificityState: React.Dispatch<React.SetStateAction<SpecificityState>>;
}

interface LinearityStateHandle {
  linearityState: LinearityState;
  setLinearityState: React.Dispatch<React.SetStateAction<LinearityState>>;
}

interface PrecisionStateHandle {
  precisionState: PrecisionState;
  setPrecisionState: React.Dispatch<React.SetStateAction<PrecisionState>>;
}

interface AccuracyStateHandle {
  accuracyState: AccuracyState;
  setAccuracyState: React.Dispatch<React.SetStateAction<AccuracyState>>;
}

interface StabilityStateHandle {
  stabilityState: StabilityState;
  setStabilityState: React.Dispatch<React.SetStateAction<StabilityState>>;
}

interface PrerequisiteStateHandle {
  prerequisiteState: PrerequisiteState;
  setPrerequisiteState: React.Dispatch<React.SetStateAction<PrerequisiteState>>;
}

export const getSections = (
  productId: string, 
  setProductId: (val: string) => void,
  protocolCode: string,
  setProtocolCode: (val: string) => void,
  protocolVersion: string,
  setProtocolVersion: (val: string) => void,
  projectNumber: string,
  personnel: PersonnelData,
  validationOptions: ValidationOptions,
  setValidationOptions: (options: ValidationOptions) => void,
  productDetails: ProductDetails,
  gradientState: GradientState,
  tcState: TestingConditionsState,
  spState: SolutionPrepsStateHandle,
  sdState: SolutionDetailHandle,
  seqState: SequenceStateHandle,
  vpssState: ValProcSysSuitStateHandle,
  vppState: ValProcPrecisionStateHandle,
  sysSuitState: SystemSuitabilityStateHandle,
  calcState: CalculationStateHandle,
  accCriteriaState: AcceptanceCriteriaHandle,
  specState: SpecificityStateHandle,
  linState: LinearityStateHandle,
  precState: PrecisionStateHandle,
  accState: AccuracyStateHandle,
  stabState: StabilityStateHandle,
  preState: PrerequisiteStateHandle
): Section[] => {
  const displayId = productId ? productId : <span className="text-red-500">货号N/A</span>;

  const handleUpdateSolDetail = (key: keyof SolutionDetailState, value: string) => {
    sdState.setSolDetail(prev => ({ ...prev, [key]: value }));
  };

  const handleUpdateSysSuit = (key: keyof SystemSuitabilityState, val: string) => {
    sysSuitState.setSysSuitability(prev => ({ ...prev, [key]: val }));
  };

  const handleAddLinearitySolution = () => {
    linState.setLinearityState(prev => ({
      ...prev,
      solutions: [...prev.solutions, { id: Date.now().toString(), conc: "", weight: "", volume: "100" }]
    }));
  };

  const handleRemoveLinearitySolution = (index: number) => {
    linState.setLinearityState(prev => ({
      ...prev,
      solutions: prev.solutions.filter((_, i) => i !== index)
    }));
  };

  const handleUpdateLinearitySolution = (index: number, field: keyof LinearitySolution, value: string) => {
    linState.setLinearityState(prev => {
        const newSolutions = [...prev.solutions];
        newSolutions[index] = { ...newSolutions[index], [field]: value };
        return { ...prev, solutions: newSolutions };
    });
  };

  const renderEditableCell = (value: string, onChange: (v: string) => void, placeholder: string = "请输入") => {
    const lines = value ? value.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < value.split('\n').length - 1 && <br />}
      </React.Fragment>
    )) : <span className="text-red-500">N/A</span>;

    return (
      <td className="border border-gray-400 p-2 relative group">
        <div className={`min-h-[2.5rem] flex items-center justify-center p-1 text-center whitespace-pre-wrap ${!value ? 'bg-red-50' : 'bg-yellow-50/30'}`}>
          {lines}
        </div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 focus:opacity-100 bg-yellow-300 border-none outline-none text-center resize-none p-2 transition-opacity z-10"
          placeholder={placeholder}
        />
        <div className="absolute top-0 right-0 p-0.5 text-[8px] text-gray-400 opacity-0 group-hover:opacity-100 pointer-events-none">编辑 Edit</div>
      </td>
    );
  };

  // 亮黄背景黑下划线输入组件
  const YellowInput = ({ value, onChange, placeholder, width = "w-16", type = "text" }: { value: string, onChange: (v: string) => void, placeholder?: string, width?: string, type?: string }) => (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${width} bg-yellow-300 border-b border-black outline-none px-1 text-center font-bold mx-1 inline-block`}
      placeholder={placeholder}
    />
  );

  // 亮黄背景长文本/短文本输入组件
  const YellowTextareaInline = ({ value, onChange, placeholder, className = "" }: { value: string, onChange: (v: string) => void, placeholder?: string, className?: string }) => (
    <div className={`inline-block ${className}`}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-yellow-300 border-b border-black outline-none px-1 py-0.5 text-black resize-none min-h-[1.5rem] font-bold align-middle"
        placeholder={placeholder}
        rows={1}
      />
    </div>
  );

  const handleAddReagentRow = () => {
    preState.setPrerequisiteState(prev => ({
      ...prev,
      reagentRows: [
        ...prev.reagentRows,
        { id: Date.now().toString(), name: '', grade: 'HPLC或以上级别 HPLC and above level' }
      ]
    }));
  };

  const handleRemoveReagentRow = (index: number) => {
    preState.setPrerequisiteState(prev => ({
      ...prev,
      reagentRows: prev.reagentRows.filter((_, i) => i !== index)
    }));
  };

  const handleUpdateReagentRow = (index: number, field: 'name' | 'grade', value: string) => {
    preState.setPrerequisiteState(prev => {
      const newRows = [...prev.reagentRows];
      newRows[index] = { ...newRows[index], [field]: value };
      return { ...prev, reagentRows: newRows };
    });
  };

  // Reuse System Suitability content
  const renderSysSuitRequirementsContent = () => (
    <div className="bg-green-50 p-4 border border-green-200 space-y-3">
       <p>1) 空白在主峰出峰处应无干扰；<br/>The blank should have no interference at the main peak;</p>
       <p>
         2) 对照品溶液1第一针中，主峰理论板数应不低于 
         <YellowInput value={sysSuitState.sysSuitability.plateNumber} onChange={(v) => handleUpdateSysSuit('plateNumber', v)} width="w-16" />
         ，拖尾因子应不大于 
         <YellowInput value={sysSuitState.sysSuitability.tailingFactor} onChange={(v) => handleUpdateSysSuit('tailingFactor', v)} width="w-12" />
         ；<br/>
         The theoretical plate number of the principal peak in the first injection of STD1 should be not less than 
         <YellowInput value={sysSuitState.sysSuitability.plateNumber} onChange={(v) => handleUpdateSysSuit('plateNumber', v)} width="w-16" />
         , the trailing factor should not be more than 
         <YellowInput value={sysSuitState.sysSuitability.tailingFactor} onChange={(v) => handleUpdateSysSuit('tailingFactor', v)} width="w-12" />
         ；
       </p>
       <p>
         3) 对照品溶液1连续进样 
         <YellowInput value={sysSuitState.sysSuitability.injectionCount} onChange={(v) => handleUpdateSysSuit('injectionCount', v)} width="w-10" />
         针，主峰峰面积的RSD应≤ 
         <YellowInput value={sysSuitState.sysSuitability.areaRSD} onChange={(v) => handleUpdateSysSuit('areaRSD', v)} width="w-12" />
         %，保留时间的RSD应≤ 
         <YellowInput value={sysSuitState.sysSuitability.retentionRSD} onChange={(v) => handleUpdateSysSuit('retentionRSD', v)} width="w-12" />
         %；<br/>
         For 
         <YellowInput value={sysSuitState.sysSuitability.injectionCount} onChange={(v) => handleUpdateSysSuit('injectionCount', v)} width="w-10" />
         consecutive standard solution1, the RSD of the main peak area should be NMT 
         <YellowInput value={sysSuitState.sysSuitability.areaRSD} onChange={(v) => handleUpdateSysSuit('areaRSD', v)} width="w-12" />
         %, the RSD of the retention time should be NMT 
         <YellowInput value={sysSuitState.sysSuitability.retentionRSD} onChange={(v) => handleUpdateSysSuit('retentionRSD', v)} width="w-12" />
         %;
       </p>
       <p>
         4) 对照品溶液2与对照品溶液1的回收率在 
         <YellowInput value={sysSuitState.sysSuitability.recoveryRange} onChange={(v) => handleUpdateSysSuit('recoveryRange', v)} width="w-32" />
         之间；<br/>
         The recovery of reference solution 2 to reference solution 1 was between 
         <YellowInput value={sysSuitState.sysSuitability.recoveryRange} onChange={(v) => handleUpdateSysSuit('recoveryRange', v)} width="w-32" />
         ；
       </p>
       <p>
         5) 若有随行对照，取随行对照1针和对照品溶液1连续 
         <YellowInput value={sysSuitState.sysSuitability.controlInjectionCount} onChange={(v) => handleUpdateSysSuit('controlInjectionCount', v)} width="w-10" />
         针的主峰峰面积的RSD应≤ 
         <YellowInput value={sysSuitState.sysSuitability.controlAreaRSD} onChange={(v) => handleUpdateSysSuit('controlAreaRSD', v)} width="w-12" />
         %。<br/>
         If have contrast check solution. GRSD(Global %RSD)of the peak area of check solution and 
         <YellowInput value={sysSuitState.sysSuitability.controlInjectionCount} onChange={(v) => handleUpdateSysSuit('controlInjectionCount', v)} width="w-10" />
         consecutive standard solution 1 should be NMT
         <YellowInput value={sysSuitState.sysSuitability.controlAreaRSD} onChange={(v) => handleUpdateSysSuit('controlAreaRSD', v)} width="w-12" />
         %.
       </p>
    </div>
  );

  const calculateConc = (w: string, v: string) => {
    const weight = parseFloat(w);
    const volume = parseFloat(v);
    if (isNaN(weight) || isNaN(volume) || volume === 0) return "N/A";
    return (weight / volume).toFixed(2);
  };

  const stdConc = calculateConc(sdState.solDetail.stdWeight, sdState.solDetail.stdVolume);
  const splConc = calculateConc(sdState.solDetail.splWeight, sdState.solDetail.splVolume);

  const handleUpdateSolutionPrep = (key: keyof SolutionPrepsState, field: keyof typeof spState.solutionPreps.phaseA, value: string) => {
    spState.setSolutionPreps(prev => ({
      ...prev,
      [key]: { ...prev[key], [field]: value }
    }));
  };

  const renderSolutionItem = (
    key: keyof SolutionPrepsState,
    titleZh: string,
    titleEn: string
  ) => (
    <div className="bg-green-50 p-3 rounded shadow-sm border border-green-100 mb-4">
      <div className="flex items-start gap-1 mb-2">
        <span className="shrink-0 font-bold text-green-800 pt-1">➤ {titleZh}：</span>
        <div className="flex-1">
          <textarea
            value={spState.solutionPreps[key].descZh}
            onChange={(e) => handleUpdateSolutionPrep(key, 'descZh', e.target.value)}
            className="w-full bg-yellow-300 border-b border-black outline-none px-2 py-1 text-black resize-none min-h-[1.5rem] font-medium"
            rows={1}
          />
        </div>
      </div>
      <div className="flex items-start gap-1 mb-3">
        <span className="shrink-0 font-bold text-green-800 pt-1 ml-4">{titleEn}：</span>
        <div className="flex-1">
          <textarea
            value={spState.solutionPreps[key].descEn}
            onChange={(e) => handleUpdateSolutionPrep(key, 'descEn', e.target.value)}
            className="w-full bg-yellow-300 border-b border-black outline-none px-2 py-1 text-black resize-none min-h-[1.5rem] font-medium italic"
            rows={1}
          />
        </div>
      </div>
      <div className="bg-green-100 p-2 rounded">
        <textarea
          value={spState.solutionPreps[key].detail}
          onChange={(e) => handleUpdateSolutionPrep(key, 'detail', e.target.value)}
          className="w-full bg-yellow-300 border-b border-black outline-none px-2 py-1 text-black resize-none min-h-[1.5rem] font-medium"
          rows={1}
        />
      </div>
    </div>
  );

  const handleAddGradientRow = () => { gradientState.setGradientData([...gradientState.gradientData, { time: "", phaseA: "" }]); };
  const handleRemoveGradientRow = (index: number) => { gradientState.setGradientData(gradientState.gradientData.filter((_, i) => i !== index)); };
  const handleUpdateGradientRow = (index: number, field: keyof GradientRow, value: string) => {
    const newData = [...gradientState.gradientData];
    newData[index] = { ...newData[index], [field]: value };
    gradientState.setGradientData(newData);
  };
  const handleAddTestingConditionRow = () => { tcState.setTestingConditions([...tcState.testingConditions, { id: Date.now().toString(), labelZh: "", labelEn: "", value: "", isCustom: true }]); };
  const handleRemoveTestingConditionRow = (index: number) => { tcState.setTestingConditions(tcState.testingConditions.filter((_, i) => i !== index)); };
  const handleUpdateTestingCondition = (index: number, field: keyof TestingCondition, value: string) => {
    const newData = [...tcState.testingConditions];
    newData[index] = { ...newData[index], [field]: value };
    tcState.setTestingConditions(newData);
  };
  const handleAddColumnRow = (index: number) => {
    const newConditions = [...tcState.testingConditions];
    newConditions.splice(index + 1, 0, {
      id: `column_${Date.now()}`,
      labelZh: '色谱柱',
      labelEn: 'Column',
      value: "",
      isCustom: false
    });
    tcState.setTestingConditions(newConditions);
  };

  const getSelectedItemsText = () => {
    const items = [
      { id: 'systemSuitability', zh: '系统适用性', en: 'System suitability' },
      { id: 'specificity', zh: '专属性', en: 'Specificity' },
      { id: 'linearity', zh: '线性和范围', en: 'Linearity and Range' },
      { id: 'accuracy', zh: '准确度', en: 'Accuracy' },
      { id: 'precision', zh: '精密度（重复性）', en: 'Precision(Repeatability)' },
      { id: 'stability', zh: '溶液稳定性', en: 'Solution stability' }
    ];
    const selectedZh = items.filter(i => validationOptions[i.id as keyof ValidationOptions]).map(i => i.zh);
    const selectedEn = items.filter(i => validationOptions[i.id as keyof ValidationOptions]).map(i => i.en);
    return { zh: selectedZh.join('、'), en: selectedEn.join(', ') };
  };

  const dynamicItems = getSelectedItemsText();

  // Helper for 4.7 Calculation Formula Terms
  const correctionFactors = [];
  if (calcState.calculationState.kf) correctionFactors.push("KF");
  if (calcState.calculationState.lod) correctionFactors.push("LOD");
  if (calcState.calculationState.sr) correctionFactors.push("SR");
  if (calcState.calculationState.tga) correctionFactors.push("TGA");
  
  // If no options are selected, correctionTerm is empty (and thus hidden).
  // If options are selected, it includes the multiplication sign and the term.
  const correctionTerm = correctionFactors.length > 0 ? ` × (1 - ${correctionFactors.join(" - ")})` : "";

  // Shared content render function for Assay Calculation
  const renderAssayCalculationContent = () => (
    <div className="bg-green-50 p-4 border border-green-200">
      <p className="mb-2">按外标法以峰面积计算，取两份平均值作为最终报告，保留一位小数。<br/>Calculated assay through the peak area by external standard method, regard the average value of two results as report result, the results should keep on decimal place.</p>
      <div className="overflow-x-auto bg-white p-3 border border-gray-300 rounded mb-3">
       <div className="flex items-center justify-center font-mono whitespace-nowrap mb-4 overflow-x-auto">
          <span className="mr-2">含量 Assay % = </span>
          <div className="flex flex-col items-center">
            <div className="border-b border-black px-2 pb-1 mb-1">A<sub>SPL</sub> × W<sub>STD1</sub> × P<sub>STD</sub> × V<sub>SPL</sub></div>
            <div className="px-2">A<sub>STD1</sub> × V<sub>STD1</sub> × W<sub>SPL</sub>{correctionTerm}</div>
          </div>
          <span className="ml-2">× 100%</span>
       </div>
     </div>
     <div className="space-y-1 text-gray-700 text-xs">
        <p className="font-semibold">式中 In formula：</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <p><span className="font-bold">A<sub>SPL</sub>：</span>供试品溶液中主峰的峰面积；<br/>The peak area of main peak in sample solution;</p>
          <p><span className="font-bold">A<sub>STD1</sub>：</span>对照品溶液1中连续进样5针的平均峰面积平均峰面积；<br/>The average peak area of RS for 5 consecutive standard solution 1；</p>
          <p><span className="font-bold">W<sub>STD1</sub>：</span>对照品溶液1中对照品的称样量，mg；<br/>The weight of RS in standard solution 1,mg；</p>
          <p><span className="font-bold">W<sub>SPL</sub>：</span>供试品的称样量，mg；<br/>The weight of sample;mg；</p>
          <p><span className="font-bold">V<sub>STD1</sub>：</span>对照品溶液1的稀释体积，ml；<br/>The dilution volume of in standard solution 1 ,ml；</p>
          <p><span className="font-bold">V<sub>SPL</sub>：</span>供试品的稀释体积，ml；<br/>The dilution volume of sample solution ;ml；</p>
          <p><span className="font-bold">P<sub>STD</sub>：</span>对照品的含量（%）；<br/>The assay of RS（%）;</p>

          <div className="col-span-1 md:col-span-2 mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
            <span className="text-xs font-bold text-gray-500 mb-1 block">水分/溶剂校正选项 Correction Factors (Multi-select):</span>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-1 cursor-pointer select-none">
                <input type="checkbox" checked={calcState.calculationState.kf} onChange={(e) => calcState.setCalculationState({...calcState.calculationState, kf: e.target.checked})} className="rounded text-blue-600 focus:ring-blue-500" />
                <span className="text-sm">KF</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer select-none">
                <input type="checkbox" checked={calcState.calculationState.lod} onChange={(e) => calcState.setCalculationState({...calcState.calculationState, lod: e.target.checked})} className="rounded text-blue-600 focus:ring-blue-500" />
                <span className="text-sm">LOD</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer select-none">
                <input type="checkbox" checked={calcState.calculationState.sr} onChange={(e) => calcState.setCalculationState({...calcState.calculationState, sr: e.target.checked})} className="rounded text-blue-600 focus:ring-blue-500" />
                <span className="text-sm">SR</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer select-none">
                <input type="checkbox" checked={calcState.calculationState.tga} onChange={(e) => calcState.setCalculationState({...calcState.calculationState, tga: e.target.checked})} className="rounded text-blue-600 focus:ring-blue-500" />
                <span className="text-sm">TGA</span>
              </label>
            </div>
          </div>

          {calcState.calculationState.kf && (
            <p><span className="font-bold">KF：</span>供试品水分；<br/>KF:Water of sample;</p>
          )}
          {calcState.calculationState.lod && (
            <p><span className="font-bold">LOD：</span>干燥失重<br/>LOD:loss in weight on drying</p>
          )}
          {calcState.calculationState.sr && (
            <p><span className="font-bold">SR：</span>溶剂残留<br/>SR:Solvent residues</p>
          )}
          {calcState.calculationState.tga && (
            <p><span className="font-bold">TGA：</span>TGA<br/>TGA</p>
          )}
        </div>
      </div>
    </div>
  );

  // Validation Content Map (Moved inside to access state)
  const validationMap = [
    { 
      option: 'systemSuitability', 
      sections: [
        {
          id: 'val-sys-suit',
          title: '6.1 系统适用性 System Suitability',
          level: 2,
          content: (
             <div className="space-y-4 text-sm leading-relaxed">
               {renderSysSuitRequirementsContent()}
             </div>
          )
        },
        {
          id: 'val-proc-sys',
          title: '(一) 系统适用性 System Suitability',
          level: 2,
          content: (
            <div className="space-y-6 text-sm">
               <div>
                  <h3 className="font-bold border-b border-gray-200 pb-1 mb-2">1. 目的 Objective</h3>
                  <p>通过系统适用性测试确认系统的稳定性。<br/>The stability of the system is confirmed by system applicability test.</p>
               </div>
               <div>
                  <h3 className="font-bold border-b border-gray-200 pb-1 mb-2">2. 操作 Operation</h3>
                  <div className="space-y-4">
                     <div>
                        <h4 className="font-bold mb-1">2.1 色谱条件 Chromatographic conditions</h4>
                        <p>同检验方法描述里“4.2仪器及检测条件”<br/>Same as "4.2 Instruments and Testing Conditions" in the Test Method Description .</p>
                     </div>
                     <div>
                        <h4 className="font-bold mb-1">2.2 溶液配制 Solution Preparation</h4>
                        <div className="pl-2 space-y-2">
                             <p>
                                <span className="font-semibold"> 稀释剂（空白）：</span>{spState.solutionPreps.diluent.descZh}<br/>
                                <span className="font-semibold">Diluent(Blank): </span>{spState.solutionPreps.diluent.descEn}
                             </p>
                             <p>
                                <span className="font-semibold"> 对照品溶液 Reference Standard Solution</span>
                             </p>
                             <div className="pl-4 border-l-2 border-gray-200">
                                <p className="mb-1">
                                  取 {productId} 对照品约 {sdState.solDetail.stdWeight} mg，精密称定，置 {sdState.solDetail.stdVolume} ml 量瓶中，{sdState.solDetail.stdMethodZh}，摇匀，平行配制 {sdState.solDetail.stdCount} 份。（{stdConc} mg/ml）
                                </p>
                                <p className="italic text-gray-600">
                                  Accurately weigh about {sdState.solDetail.stdWeight} mg of {productId} reference standard into a {sdState.solDetail.stdVolume} ml volumetric flask, {sdState.solDetail.stdMethodEn}, mix well. Prepare {sdState.solDetail.stdCount} solutions in parallel. ({stdConc} mg/ml)
                                </p>
                             </div>
                             <p className="text-gray-600 italic">
                                注：对照品的称样量及量瓶体积可根据实际情况放大或缩小，但需浓度保持不变。<br/>
                                Note : The weight of reference and the volume of volumetric flask can be enlarged or reduced according to the actual situation, but the concentration must remain unchanged.
                             </p>
                        </div>
                     </div>
                     <div>
                        <h4 className="font-bold mb-1">2.3 测定步骤 Procedure</h4>
                        <p className="mb-2">待系统平衡后，按下述顺序进样，记录色谱图<br/>After the system was equilibrated, inject solutions according to the sequence and record chromatogram</p>
                        <table className="w-full border border-gray-300 text-center text-xs">
                             <thead>
                               <tr className="bg-gray-100">
                                 <th className="border p-2">序号 No.</th>
                                 <th className="border p-2">溶液名称 Solution name</th>
                                 <th className="border p-2">进样针数 Count of injection</th>
                               </tr>
                             </thead>
                             <tbody>
                                <tr>
                                    <td className="border p-2">1</td>
                                    <td className="border p-2">空白溶液<br/>Blank solution</td>
                                    <td className="border p-2">≥ 1</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">2</td>
                                    <td className="border p-2">STD1</td>
                                    <td className="border p-2">
                                        <textarea
                                            value={vpssState.valProcSysSuitState.std1Count}
                                            onChange={(e) => vpssState.setValProcSysSuitState({...vpssState.valProcSysSuitState, std1Count: e.target.value})}
                                            className="w-full bg-yellow-300 border-b border-black outline-none px-1 py-0.5 text-center resize-none min-h-[1.5rem]"
                                            rows={1}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border p-2">3</td>
                                    <td className="border p-2">STD2</td>
                                    <td className="border p-2">
                                        <textarea
                                            value={vpssState.valProcSysSuitState.std2Count}
                                            onChange={(e) => vpssState.setValProcSysSuitState({...vpssState.valProcSysSuitState, std2Count: e.target.value})}
                                            className="w-full bg-yellow-300 border-b border-black outline-none px-1 py-0.5 text-center resize-none min-h-[1.5rem]"
                                            rows={1}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border p-2">4</td>
                                    <td className="border p-2">……</td>
                                    <td className="border p-2">……</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">5</td>
                                    <td className="border p-2 text-left">随行对照，不超过12针回进一次，并且序列结束回进一次<br/>Accompanying control, no more than 12 needles back once, and at the end of the sequence back once</td>
                                    <td className="border p-2">
                                        <textarea
                                            value={vpssState.valProcSysSuitState.controlCount}
                                            onChange={(e) => vpssState.setValProcSysSuitState({...vpssState.valProcSysSuitState, controlCount: e.target.value})}
                                            className="w-full bg-yellow-300 border-b border-black outline-none px-1 py-0.5 text-center resize-none min-h-[1.5rem]"
                                            rows={1}
                                        />
                                    </td>
                                </tr>
                             </tbody>
                        </table>
                        
                        <h4 className="font-bold mb-1 mt-4">2.4 可接受标准 Acceptance Criteria</h4>
                        <p>同方案“4.5 系统适用性”章节要求的标准。<br/>Same as the criteria required in section "4.5 System Suitability" of the protocol.</p>
                     </div>
                  </div>
               </div>
            </div>
          )
        }
      ]
    },
    { 
      option: 'specificity', 
      sections: [
        {
          id: 'val-spec',
          title: '6.x 专属性 Specificity',
          level: 2,
          content: (
             <div className="space-y-4 text-sm leading-relaxed">
               <p>
                 供试品溶液中主峰的保留时间应与对照品溶液中主峰的保留时间一致，保留时间相对偏差应不大于
                 <YellowInput value={specState.specificityState.retentionDevLimit} onChange={(v) => specState.setSpecificityState({...specState.specificityState, retentionDevLimit: v})} width="w-12" />
                 %；<br/>
                 The retention time of the main peak in the sample solution should be consistent with that of the standard solution, and the relative deviation of the retention time should be not more than 
                 <YellowInput value={specState.specificityState.retentionDevLimit} onChange={(v) => specState.setSpecificityState({...specState.specificityState, retentionDevLimit: v})} width="w-12" />
                 %;
               </p>
               <p>
                 供试品溶液中主峰的峰纯度因子应≥990或纯度角小于纯度阈值。<br/>
                 The Peak purity factor of major component should be NLT 990 in sample solution，or the purity angle is less than the purity threshold
               </p>
             </div>
          )
        },
        {
          id: 'val-proc-spec',
          title: '(二) 专属性 Specificity',
          level: 2,
          content: (
            <div className="space-y-6 text-sm">
               <div>
                  <h3 className="font-bold border-b border-gray-200 pb-1 mb-2">1. 目的 Objective</h3>
                  <p>确定在该检验方法条件下，采用的分析方法能正确测定出被测物的能力。<br/>It is determined that under the conditions of this method, the analytical method used has the ability to accurately measure the substance being measured.</p>
               </div>
               <div>
                  <h3 className="font-bold border-b border-gray-200 pb-1 mb-2">2. 操作 Operation</h3>
                  <div className="space-y-4">
                     <div>
                        <h4 className="font-bold mb-1">2.1 色谱条件 Chromatographic conditions</h4>
                        <p>同“检验方法描述”里“4.2仪器及检测条件”<br/>Same as "4.2 Instruments and Testing Conditions" in the test method description .</p>
                     </div>
                     <div>
                        <h4 className="font-bold mb-1">2.2 溶液配制 Solution Preparation</h4>
                        <div className="pl-2 space-y-2">
                             <p>
                                <span className="font-semibold"> 稀释剂（空白）：</span>{spState.solutionPreps.diluent.descZh}<br/>
                                <span className="font-semibold">Diluent(Blank): </span>{spState.solutionPreps.diluent.descEn}
                             </p>
                             <p>
                                <span className="font-semibold"> 对照品溶液：</span>配制同“系统适用性”项下对照品溶液<br/>
                                <span className="font-semibold">Standard solution: </span>Prepare the same Standard Solution as under "System Suitability"
                             </p>
                             <p>
                                <span className="font-semibold"> 供试品溶液 Sample solution</span>
                             </p>
                             <div className="pl-4 border-l-2 border-gray-200">
                                <p className="mb-1">
                                  称取供试品约 {sdState.solDetail.splWeight} mg，精密称定，置 {sdState.solDetail.splVolume} ml 量瓶中，{sdState.solDetail.splMethodZh}，摇匀。（{splConc} mg/ml）
                                </p>
                                <p className="italic text-gray-600">
                                  Accurately weigh about {sdState.solDetail.splWeight} mg of Sample into a {sdState.solDetail.splVolume} ml volumetric flask, {sdState.solDetail.splMethodEn}, mix well.（{splConc} mg/ml）
                                </p>
                             </div>
                             <p className="text-gray-600 italic">
                                注：对照品溶液、供试品的称样量及量瓶体积可根据实际情况放大或缩小，但需浓度保持不变。<br/>
                                Note : The weight of reference and sample and the volume of volumetric flask can be enlarged or reduced according to the actual situation, but the concentration must remain unchanged.
                             </p>
                        </div>
                     </div>
                     <div>
                        <h4 className="font-bold mb-1">2.3 测定步骤 Procedure</h4>
                        <p className="mb-2">在仪器系统适用性通过后，按下述顺序进样，记录色谱图：<br/>After the suitability of the instrument system is approved, inject solutions according to the sequence and record chromatogram</p>
                        <table className="w-full border border-gray-300 text-center text-xs">
                             <thead>
                               <tr className="bg-gray-100">
                                 <th className="border p-2">序号 No.</th>
                                 <th className="border p-2">溶液名称 Solution name</th>
                                 <th className="border p-2">进样针数 Count of injection</th>
                               </tr>
                             </thead>
                             <tbody>
                                <tr>
                                    <td className="border p-2">1</td>
                                    <td className="border p-2">空白溶液<br/>Blank solution</td>
                                    <td className="border p-2">≥ 1</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">2</td>
                                    <td className="border p-2">对照品溶液<br/>Standard solution</td>
                                    <td className="border p-2">1</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">3</td>
                                    <td className="border p-2">供试品溶液<br/>Sample solution</td>
                                    <td className="border p-2">1</td>
                                </tr>
                             </tbody>
                        </table>
                        <p className="mt-2 text-gray-600 italic">
                            注：进样序列可根据实际情况进行调整。<br/>
                            Note: Sequence can be adjusted according to the actual situation.
                        </p>
                     </div>
                  </div>
               </div>
               <div>
                  <h3 className="font-bold border-b border-gray-200 pb-1 mb-2">3. 可接受标准 Acceptance Criteria</h3>
                  <div className="space-y-3">
                    <p>
                        1) 供试品溶液中主峰的保留时间应与对照品溶液中主峰的保留时间一致，保留时间相对偏差应不大于 
                        <YellowInput value={specState.specificityState.retentionDevLimit} onChange={(v) => specState.setSpecificityState({...specState.specificityState, retentionDevLimit: v})} width="w-12" />
                        %；<br/>
                        The retention time of the main peak in the sample solution should be consistent with that of the standard solution, and the relative deviation of the retention time should be not more than 
                        <YellowInput value={specState.specificityState.retentionDevLimit} onChange={(v) => specState.setSpecificityState({...specState.specificityState, retentionDevLimit: v})} width="w-12" />
                        %.
                    </p>
                    <p>
                        2) 供试品溶液中主峰的峰纯度因子应≥990或纯度角小于纯度阈值。<br/>
                        The Peak purity factor of major component should be NLT 990 in sample solution,or the purity angle is less than the purity threshold.
                    </p>
                  </div>
               </div>
               <div>
                  <h3 className="font-bold border-b border-gray-200 pb-1 mb-2">4. 计算 Calculation</h3>
                  <div className="bg-green-50 p-4 border border-green-200">
                     <div className="flex items-center justify-center font-mono whitespace-nowrap mb-4">
                        <span className="mr-2">RD（%） = </span>
                        <div className="flex flex-col items-center">
                          <div className="border-b border-black px-2 pb-1 mb-1">RT<sub>SPL</sub> - RT<sub>STD</sub></div>
                          <div className="px-2">RT<sub>STD</sub></div>
                        </div>
                        <span className="ml-2">× 100%</span>
                     </div>
                     <div className="space-y-2 text-sm">
                        <p><span className="font-bold">RT<sub>SPL</sub>：</span>供试品溶液中主峰保留时间；<br/>RT<sub>SPL</sub> ：The retention time of the main peak in the sample solution；</p>
                        <p><span className="font-bold">RT<sub>STD</sub>：</span>对照品溶液中主峰保留时间；<br/>RT<sub>STD</sub>：The retention time of the main peak in the standard solution；</p>
                     </div>
                  </div>
               </div>
            </div>
          )
        }
      ]
    },
    { 
      option: 'linearity', 
      sections: [
        {
          id: 'val-lin',
          title: '6.x 线性和范围 Linearity and Range',
          level: 2,
          content: (
            <div className="space-y-4 text-sm leading-relaxed">
               <p>取本品对照品，精密称定，配制成
                {linState.linearityState.solutions.map((sol, idx) => (
                  <React.Fragment key={sol.id}>
                    <span className="relative inline-block group mx-1 align-baseline">
                      <YellowInput 
                        value={sol.conc} 
                        onChange={(v) => handleUpdateLinearitySolution(idx, 'conc', v)} 
                        width="w-16" 
                      />
                      {linState.linearityState.solutions.length > 1 && (
                          <button 
                              onClick={() => handleRemoveLinearitySolution(idx)}
                              className="absolute -top-2 -right-2 text-red-500 bg-white rounded-full shadow hover:bg-red-50 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                              <Trash2 size={10} />
                          </button>
                      )}
                    </span>
                    {idx < linState.linearityState.solutions.length - 1 && "、"}
                  </React.Fragment>
                ))}
                <button 
                  onClick={handleAddLinearitySolution}
                  className="inline-flex items-center justify-center p-0.5 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 mx-1 align-middle"
                  title="Add"
                >
                  <Plus size={12} />
                </button>
                <span className="font-bold underline mx-1">{linState.linearityState.solutions.length}</span>
               个浓度水平的线性溶液，计算浓度与峰面积的线性关系，X轴代表浓度，Y轴代表峰面积，线性相关系数r≥0.998，Y轴截距的绝对值与100%线性溶液峰面积的比≤2%。报告主成分相关系数、相对截距、线性方程、残差平方和、浓度及相对供试品溶液浓度的比例。<br/>
               Weigh RS, accurately weighed, and prepared into {linState.linearityState.solutions.map((sol, idx) => (
                    <React.Fragment key={sol.id}>
                      <span className="font-bold border-b border-black px-1 mx-0.5 bg-yellow-300">{sol.conc}</span>
                      {idx < linState.linearityState.solutions.length - 1 ? ", " : ""}
                    </React.Fragment>
               ))} of <span className="font-bold underline mx-1">{linState.linearityState.solutions.length}</span> concentration levels of linear solution,The linear relationship between concentration and peak area was calculated, with the X-axis representing the concentraion and the Y-axis representing the peak area, and the linear correlation coefficient r≥0.998. The ratio of the absolute value of the Y-axis intercept to the peak area of 100% linear solution is less than 2%. Report principal component correlation coefficient, relative intercept, linear equation, residual sum of squares, concentration, and ratio to concentration of sample solution</p>
            </div>
          )
        },
        {
          id: 'val-proc-lin',
          title: '(三) 线性和范围 Linearity and Range',
          level: 2,
          content: (
            <div className="space-y-6 text-sm">
               <div>
                  <h3 className="font-bold border-b border-gray-200 pb-1 mb-2">1. 目的 Objective</h3>
                  <p>为验证在设计的范围内，主成分的测试响应值与浓度之间成线性比例的关系。<br/>To conform the linear proportional relationship between the testing response values of the principal components and the concentration within the designed range.</p>
               </div>
               <div>
                  <h3 className="font-bold border-b border-gray-200 pb-1 mb-2">2. 操作 Operation</h3>
                  <div className="space-y-4">
                     <div>
                        <h4 className="font-bold mb-1">2.1 色谱条件 Chromatographic conditions</h4>
                        <p>同检验方法描述里“4.2仪器及检测条件”<br/>Same as "4.2 Instruments and Testing Conditions" in the test method description .</p>
                     </div>
                     <div>
                        <h4 className="font-bold mb-1">2.2 溶液配制 Solution Preparation</h4>
                        <div className="pl-2 space-y-4">
                             <p>
                                <span className="font-semibold"> 稀释剂（空白）：</span>{spState.solutionPreps.diluent.descZh}<br/>
                                <span className="font-semibold">Diluent(Blank): </span>{spState.solutionPreps.diluent.descEn}
                             </p>
                             
                             {linState.linearityState.solutions.map((sol, idx) => {
                               const solIndex = idx + 1;
                               // Safe calculation for display
                               const w = parseFloat(sol.weight);
                               const v = parseFloat(sol.volume);
                               // Updated to show calculated concentration instead of fraction
                               const calculatedConc = (isNaN(w) || isNaN(v) || v === 0) ? "N/A" : parseFloat((w / v).toFixed(4)).toString();
                               
                               return (
                               <div key={sol.id} className="bg-gray-50 p-2 rounded border border-gray-200">
                                  <p className="font-semibold text-blue-800 mb-1">
                                     {sol.conc}线性溶液L{solIndex}/{sol.conc} linear solution L{solIndex}
                                  </p>
                                  <p className="mb-1 leading-relaxed">
                                    取 {productId} 对照品约 <YellowInput value={sol.weight} onChange={(v) => handleUpdateLinearitySolution(idx, 'weight', v)} />mg，精密称定，置 <YellowInput value={sol.volume} onChange={(v) => handleUpdateLinearitySolution(idx, 'volume', v)} />ml 量瓶中，加入稀释剂振摇溶解并稀释至刻度，摇匀。（{calculatedConc} mg/ml）
                                  </p>
                                  <p className="italic text-gray-600 leading-relaxed">
                                    Accurately weigh about <span className="font-bold border-b border-black px-1 mx-1 bg-yellow-300">{sol.weight}</span>mg of {productId} reference standard into a <span className="font-bold border-b border-black px-1 mx-1 bg-yellow-300">{sol.volume}</span>ml volumetric flask, shake to dissolve and dilute to volume with diluent, mix well.（{calculatedConc} mg/ml）
                                  </p>
                               </div>
                               );
                             })}
                        </div>
                     </div>
                     <div>
                        <h4 className="font-bold mb-1">2.3 测定步骤 Procedure</h4>
                        <p className="mb-2">取各线性溶液直接进样，记录色谱图：<br/>Directly inject each linear solution and record chromatogram</p>
                        <table className="w-full border border-gray-300 text-center text-xs">
                             <thead>
                               <tr className="bg-gray-100">
                                 <th className="border p-2">溶液名称 Solution name</th>
                                 <th className="border p-2">进样针数 Count of injection</th>
                               </tr>
                             </thead>
                             <tbody>
                                <tr>
                                    <td className="border p-2">空白溶液 Blank solution</td>
                                    <td className="border p-2">≥ 1</td>
                                </tr>
                                {linState.linearityState.solutions.map((sol, idx) => (
                                    <tr key={sol.id}>
                                        <td className="border p-2">L{idx + 1}</td>
                                        <td className="border p-2">1</td>
                                    </tr>
                                ))}
                             </tbody>
                        </table>
                        <p className="mt-2 text-gray-600 italic">
                            注：进样序列可根据实际情况进行调整。<br/>
                            Note: Sequence can be adjusted according to the actual situation.
                        </p>
                     </div>
                     <div>
                        <h4 className="font-bold mb-1">2.4 计算 Calculation</h4>
                        <div className="bg-green-50 p-3 border border-green-200 space-y-4">
                           {/* Chinese Formula */}
                           <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm font-bold text-gray-900">
                              <span className="mr-1">Y轴截距的绝对值与100%线性溶液峰面积的比</span>
                              <span>=</span>
                              <div className="inline-flex items-center align-middle">
                                <div className="flex flex-col items-center text-center leading-tight">
                                  <div className="border-b border-black px-1 pb-0.5 mb-0.5">Y轴截距的绝对值</div>
                                  <div>Area<sub>L3</sub></div>
                                </div>
                                <span className="ml-2">× 100%</span>
                              </div>
                           </div>
                           
                           {/* English Formula */}
                           <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-xs italic text-gray-700">
                              <span className="mr-1">The ratio of the absolute value of the Y-axis intercept to the peak area of 100% linear solution</span>
                              <span>=</span>
                              <div className="inline-flex items-center align-middle">
                                <div className="flex flex-col items-center text-center leading-tight">
                                  <div className="border-b border-gray-700 px-1 pb-0.5 mb-0.5">the absolute value of the Y-axis intercept</div>
                                  <div>Area of L3</div>
                                </div>
                                <span className="ml-2">× 100%</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div>
                  <h3 className="font-bold border-b border-gray-200 pb-1 mb-2">3. 可接受标准 Acceptance criteria</h3>
                  <div className="space-y-3">
                    <p>
                        浓度与面积应成线性，X轴代表浓度，Y轴代表峰面积，线性相关系数r≥0.998，Y轴截距的绝对值与100%线性溶液峰面积的比≤2%。<br/>
                        The concentration and area should be linear, the X-axis represents the concentration, the Y-axis represents the peak area, the linear correlation coefficient r≥0.998, and the ratio of the absolute value of the Y-axis intercept to the peak area of 100% linear solution is less than 2%.
                    </p>
                    <p>
                        报告主成分相关系数、相对截距、线性方程、残差平方和、浓度及相对供试品溶液浓度的比例。<br/>
                        Report principal component correlation coefficient, relative intercept, linear equation, residual sum of squares, concentration, and ratio to concentration of sample solution.
                    </p>
                  </div>
               </div>
            </div>
          )
        }
      ]
    },
    { 
      option: 'precision', 
      sections: [
        {
          id: 'val-prec',
          title: '6.x 精密度 Precision',
          level: 2,
          content: (
             <div className="space-y-4 text-sm leading-relaxed">
               <p>
                 取本品，配制6份供试品溶液，进样测定，计算6份供试品溶液含量的RSD，RSD应
                 <YellowInput value={precState.precisionState.precisionLimit} onChange={(v) => precState.setPrecisionState({...precState.precisionState, precisionLimit: v})} width="w-24" />
                 。<br/>
                 Prepare 6 sample solutions, inject and determine, calculate the RSD of the assay of 6 sample solutions, RSD should be 
                 <YellowInput value={precState.precisionState.precisionLimit} onChange={(v) => precState.setPrecisionState({...precState.precisionState, precisionLimit: v})} width="w-24" />
                 .
               </p>
             </div>
          )
        },
        {
          id: 'val-proc-prec',
          title: '(四) 精密度 Precision',
          level: 2,
          content: (
            <div className="space-y-6 text-sm">
               <div>
                  <h3 className="font-bold border-b border-gray-200 pb-1 mb-2">1. 目的 Objective</h3>
                  <p>验证该方法测定结果的重现性。<br/>To validate the repeatability of the results measured by this method.</p>
               </div>
               <div>
                  <h3 className="font-bold border-b border-gray-200 pb-1 mb-2">2. 操作 Operation</h3>
                  <div className="space-y-4">
                     <div>
                        <h4 className="font-bold mb-1">2.1 色谱条件 Chromatographic conditions</h4>
                        <p>同检验方法描述里“4.2仪器及检测条件”<br/>Same as "4.2 Instruments and Testing Conditions" in the Test Method Description .</p>
                     </div>
                     <div>
                        <h4 className="font-bold mb-1">2.2 溶液配制 Solution Preparation</h4>
                        <div className="pl-2 space-y-2">
                             <p>
                                <span className="font-semibold"> 稀释剂（空白）：</span>{spState.solutionPreps.diluent.descZh}<br/>
                                <span className="font-semibold">Diluent(Blank): </span>{spState.solutionPreps.diluent.descEn}
                             </p>
                             <p>
                                <span className="font-semibold"> 对照品溶液：</span>配制同“系统适用性”项下对照品溶液<br/>
                                <span className="font-semibold">Standard solution: </span>Prepare the same Standard Solution as under "System Suitability"
                             </p>
                             <p>
                                <span className="font-semibold"> 供试品溶液 Sample solution</span>
                             </p>
                             <div className="pl-4 border-l-2 border-gray-200">
                                <p className="mb-1">
                                  称取供试品约 {sdState.solDetail.splWeight} mg，精密称定，置 {sdState.solDetail.splVolume} ml 量瓶中，{sdState.solDetail.splMethodZh}，摇匀。平行配制 6 份。（{splConc} mg/ml）
                                </p>
                                <p className="italic text-gray-600">
                                  Accurately weigh about {sdState.solDetail.splWeight} mg of Sample into a {sdState.solDetail.splVolume} ml volumetric flask, {sdState.solDetail.splMethodEn}, mix well. Prepare 6 solutions in parallel.（{splConc} mg/ml）
                                </p>
                             </div>
                        </div>
                     </div>
                     <div>
                        <h4 className="font-bold mb-1">2.3 测定步骤 Procedure</h4>
                        <p className="mb-2">在仪器系统适用性通过后，按下述顺序进样，记录色谱图：<br/>After the suitability of the instrument system is approved, inject solutions according to the sequence and record chromatogram</p>
                        <table className="w-full border border-gray-300 text-center text-xs">
                             <thead>
                               <tr className="bg-gray-100">
                                 <th className="border p-2">序号 No.</th>
                                 <th className="border p-2">溶液名称 Solution name</th>
                                 <th className="border p-2">进样针数 Count of injection</th>
                               </tr>
                             </thead>
                             <tbody>
                                <tr>
                                    <td className="border p-2">1</td>
                                    <td className="border p-2">空白溶液<br/>Blank solution</td>
                                    <td className="border p-2">≥ 1</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">2</td>
                                    <td className="border p-2">STD1</td>
                                    <td className="border p-2">
                                        <textarea
                                            value={vppState.valProcPrecisionState.precisionStd1Count}
                                            onChange={(e) => vppState.setValProcPrecisionState({...vppState.valProcPrecisionState, precisionStd1Count: e.target.value})}
                                            className="w-full bg-yellow-300 border-b border-black outline-none px-1 py-0.5 text-center resize-none min-h-[1.5rem]"
                                            rows={1}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border p-2">3</td>
                                    <td className="border p-2">STD2</td>
                                    <td className="border p-2">
                                        <textarea
                                            value={vppState.valProcPrecisionState.precisionStd2Count}
                                            onChange={(e) => vppState.setValProcPrecisionState({...vppState.valProcPrecisionState, precisionStd2Count: e.target.value})}
                                            className="w-full bg-yellow-300 border-b border-black outline-none px-1 py-0.5 text-center resize-none min-h-[1.5rem]"
                                            rows={1}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border p-2">4</td>
                                    <td className="border p-2">6份供试品溶液<br/>6 Sample solutions</td>
                                    <td className="border p-2">1</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">5</td>
                                    <td className="border p-2 text-left">随行对照，不超过12针回进一次，并且序列结束回进一次<br/>Accompanying control, no more than 12 needles back once, and at the end of the sequence back once</td>
                                    <td className="border p-2">1</td>
                                </tr>
                             </tbody>
                        </table>
                     </div>
                  </div>
               </div>
               <div>
                  <h3 className="font-bold border-b border-gray-200 pb-1 mb-2">3. 可接受标准 Acceptance Criteria</h3>
                  <div className="space-y-3">
                    <p>
                        计算6份供试品溶液含量的RSD，RSD应
                        <YellowInput value={precState.precisionState.precisionLimit} onChange={(v) => precState.setPrecisionState({...precState.precisionState, precisionLimit: v})} width="w-24" />
                        。<br/>
                        Calculate the RSD of the assay of 6 sample solutions, RSD should be
                        <YellowInput value={precState.precisionState.precisionLimit} onChange={(v) => precState.setPrecisionState({...precState.precisionState, precisionLimit: v})} width="w-24" />
                        .
                    </p>
                  </div>
               </div>
            </div>
          )
        }
      ]
    },
    { 
      option: 'accuracy', 
      sections: [
        {
          id: 'val-acc',
          title: '6.x 准确度 Accuracy',
          level: 2,
          content: (
             <div className="space-y-4 text-sm leading-relaxed">
               <p>
                 取本品对照品，按80%、100%、120%三个浓度水平，每个浓度水平配制3份，共9份溶液，进样测定，计算回收率，回收率均应在
                 <YellowInput value={accState.accuracyState.recoveryRange} onChange={(v) => accState.setAccuracyState({...accState.accuracyState, recoveryRange: v})} width="w-24" />
                 范围内，9份样品回收率的RSD≤
                 <YellowInput value={accState.accuracyState.rsdLimit} onChange={(v) => accState.setAccuracyState({...accState.accuracyState, rsdLimit: v})} width="w-12" />
                 。<br/>
                 Weigh RS, prepare 3 solutions for each concentration level at 80%, 100% and 120%, a total of 9 solutions. Inject and determine, calculate the recovery, the recovery of each solution should be in the range of
                 <YellowInput value={accState.accuracyState.recoveryRange} onChange={(v) => accState.setAccuracyState({...accState.accuracyState, recoveryRange: v})} width="w-24" />
                 , and the RSD of the 9 recovery should be ≤
                 <YellowInput value={accState.accuracyState.rsdLimit} onChange={(v) => accState.setAccuracyState({...accState.accuracyState, rsdLimit: v})} width="w-12" />
                 .
               </p>
             </div>
          )
        },
        {
          id: 'val-proc-acc',
          title: '(五) 准确度 Accuracy',
          level: 2,
          content: (
            <div className="space-y-6 text-sm">
               <div>
                  <h3 className="font-bold border-b border-gray-200 pb-1 mb-2">1. 目的 Objective</h3>
                  <p>验证该方法测定结果的准确性。<br/>Verify the accuracy of the results measured by this method.</p>
               </div>
               <div>
                  <h3 className="font-bold border-b border-gray-200 pb-1 mb-2">2. 操作 Operation</h3>
                  <div className="space-y-4">
                     <div>
                        <h4 className="font-bold mb-1">2.1 色谱条件 Chromatographic conditions</h4>
                        <p>同检验方法描述里“4.2仪器及检测条件”<br/>Same as "4.2 Instruments and Testing Conditions" in the Test Method Description .</p>
                     </div>
                     <div>
                        <h4 className="font-bold mb-1">2.2 溶液配制 Solution Preparation</h4>
                        <div className="pl-2 space-y-2">
                             <p>
                                <span className="font-semibold"> 稀释剂（空白）：</span>{spState.solutionPreps.diluent.descZh}<br/>
                                <span className="font-semibold">Diluent(Blank): </span>{spState.solutionPreps.diluent.descEn}
                             </p>
                             <p>
                                <span className="font-semibold"> 准确度溶液 Accuracy solutions</span>
                             </p>
                             <div className="pl-4 border-l-2 border-gray-200">
                                <p className="mb-1">
                                  取 {productId} 对照品适量，精密称定，分别按预计浓度的80%、100%、120%三个水平制备供试液，每个水平制备3份，共9份。<br/>
                                  Take appropriate amount of {productId} reference standard, accurately weighed, prepare sample solutions at 80%, 100%, and 120% of the expected concentration, 3 preparations for each level, total 9 preparations.
                                </p>
                             </div>
                        </div>
                     </div>
                     <div>
                        <h4 className="font-bold mb-1">2.3 测定步骤 Procedure</h4>
                        <p className="mb-2">在仪器系统适用性通过后，按下述顺序进样，记录色谱图：<br/>After the suitability of the instrument system is approved, inject solutions according to the sequence and record chromatogram</p>
                        <table className="w-full border border-gray-300 text-center text-xs">
                             <thead>
                               <tr className="bg-gray-100">
                                 <th className="border p-2">序号 No.</th>
                                 <th className="border p-2">溶液名称 Solution name</th>
                                 <th className="border p-2">进样针数 Count of injection</th>
                               </tr>
                             </thead>
                             <tbody>
                                <tr>
                                    <td className="border p-2">1</td>
                                    <td className="border p-2">空白溶液<br/>Blank solution</td>
                                    <td className="border p-2">≥ 1</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">2</td>
                                    <td className="border p-2">对照品溶液<br/>Standard solution</td>
                                    <td className="border p-2">1</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">3</td>
                                    <td className="border p-2">9份准确度溶液<br/>9 Accuracy solutions</td>
                                    <td className="border p-2">1</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">4</td>
                                    <td className="border p-2 text-left">随行对照，不超过12针回进一次，并且序列结束回进一次<br/>Accompanying control, no more than 12 needles back once, and at the end of the sequence back once</td>
                                    <td className="border p-2">1</td>
                                </tr>
                             </tbody>
                        </table>
                     </div>
                  </div>
               </div>
               <div>
                  <h3 className="font-bold border-b border-gray-200 pb-1 mb-2">3. 可接受标准 Acceptance Criteria</h3>
                  <div className="space-y-3">
                    <p>
                        回收率均应在 <YellowInput value={accState.accuracyState.recoveryRange} onChange={(v) => accState.setAccuracyState({...accState.accuracyState, recoveryRange: v})} width="w-24" /> 范围内，
                        9份样品回收率的RSD≤ <YellowInput value={accState.accuracyState.rsdLimit} onChange={(v) => accState.setAccuracyState({...accState.accuracyState, rsdLimit: v})} width="w-12" />。<br/>
                        The recovery of each solution should be in the range of <YellowInput value={accState.accuracyState.recoveryRange} onChange={(v) => accState.setAccuracyState({...accState.accuracyState, recoveryRange: v})} width="w-24" />
                        , and the RSD of the 9 recovery should be ≤ <YellowInput value={accState.accuracyState.rsdLimit} onChange={(v) => accState.setAccuracyState({...accState.accuracyState, rsdLimit: v})} width="w-12" />.
                    </p>
                  </div>
               </div>
            </div>
          )
        }
      ]
    },
    { 
      option: 'stability', 
      sections: [
        {
          id: 'val-stab',
          title: '6.x 溶液稳定性 Solution stability',
          level: 2,
          content: (
             <div className="space-y-4 text-sm leading-relaxed">
               <p>
                 取对照品溶液和供试品溶液，
                 <YellowInput value={stabState.stabilityState.sampleTemp} onChange={(v) => stabState.setStabilityState({...stabState.stabilityState, sampleTemp: v})} width="w-16" />
                 ℃条件下放置，分别在0h, Xh, Xh...进样，考察 {productId} 的峰面积，与0h相比，{productId} 峰面积的回收率应在
                 <YellowInput value={stabState.stabilityState.sampleRecovery} onChange={(v) => stabState.setStabilityState({...stabState.stabilityState, sampleRecovery: v})} width="w-24" />
                 之间。<br/>
                 Take the standard solution and sample solution, stored under at 
                 <YellowInput value={stabState.stabilityState.sampleTemp} onChange={(v) => stabState.setStabilityState({...stabState.stabilityState, sampleTemp: v})} width="w-16" />
                 ℃, injected at 0h, Xh, Xh..., respectively, the peak area of {productId} should be evaluated. Compared with 0h, the recovery for peak area of {productId} at each point should be 
                 <YellowInput value={stabState.stabilityState.sampleRecovery} onChange={(v) => stabState.setStabilityState({...stabState.stabilityState, sampleRecovery: v})} width="w-24" />
                 .
               </p>
             </div>
          )
        },
        {
          id: 'val-proc-stab',
          title: '(六) 稳定性 Stability',
          level: 2,
          content: (
            <div className="space-y-6 text-sm">
               <div>
                  <h3 className="font-bold border-b border-gray-200 pb-1 mb-2">1. 目的 Objective</h3>
                  <p>
                    考察对照品溶液和供试品溶液在 <YellowInput value={stabState.stabilityState.sampleTemp} onChange={(v) => stabState.setStabilityState({...stabState.stabilityState, sampleTemp: v})} width="w-16" /> ℃条件下的稳定性。<br/>
                    To investigate the stability of the standard solution and sample solution stored under at <YellowInput value={stabState.stabilityState.sampleTemp} onChange={(v) => stabState.setStabilityState({...stabState.stabilityState, sampleTemp: v})} width="w-16" /> ℃.
                  </p>
               </div>
               <div>
                  <h3 className="font-bold border-b border-gray-200 pb-1 mb-2">2. 操作 Operation</h3>
                  <div className="space-y-4">
                     <div>
                        <h4 className="font-bold mb-1">2.1 色谱条件 Chromatographic conditions</h4>
                        <p>同检验方法描述里“4.2仪器及检测条件”<br/>Same as "4.2 Instruments and Testing Conditions" in the Test Method Description .</p>
                     </div>
                     <div>
                        <h4 className="font-bold mb-1">2.2 溶液配制 Solution Preparation</h4>
                        <div className="pl-2 space-y-2">
                             <p>
                                <span className="font-semibold"> 空白/稀释剂：</span>{spState.solutionPreps.diluent.descZh}<br/>
                                <span className="font-semibold">Blank/diluent: </span>{spState.solutionPreps.diluent.descEn}
                             </p>
                             <p>
                                <span className="font-semibold"> 对照品溶液：</span>配制同“系统适用性”项下对照品溶液<br/>
                                <span className="font-semibold">Standard solution: </span>Prepare the same Standard Solution as under "System Suitability"
                             </p>
                             <p>
                                <span className="font-semibold"> 供试品溶液：</span>配制同“系统适用性”项下供试品溶液<br/>
                                <span className="font-semibold">Sample solution: </span>Prepare the same Sample Solution as under "System Suitability"
                             </p>
                        </div>
                     </div>
                     <div>
                        <h4 className="font-bold mb-1">2.3 测定步骤 Procedure</h4>
                        <p className="mb-2">取对照品溶液和供试品溶液，在 <YellowInput value={stabState.stabilityState.sampleTemp} onChange={(v) => stabState.setStabilityState({...stabState.stabilityState, sampleTemp: v})} width="w-16" /> ℃条件下放置，分别在0h, Xh, Xh...进样。<br/>Take the standard solution and sample solution, stored under at <YellowInput value={stabState.stabilityState.sampleTemp} onChange={(v) => stabState.setStabilityState({...stabState.stabilityState, sampleTemp: v})} width="w-16" /> ℃, injected at 0h, Xh, Xh..., respectively.</p>
                     </div>
                  </div>
               </div>
               <div>
                  <h3 className="font-bold border-b border-gray-200 pb-1 mb-2">3. 可接受标准 Acceptance Criteria</h3>
                  <div className="space-y-3">
                    <p>
                        与0h相比，{productId} 峰面积的回收率应在 <YellowInput value={stabState.stabilityState.sampleRecovery} onChange={(v) => stabState.setStabilityState({...stabState.stabilityState, sampleRecovery: v})} width="w-24" /> 之间。<br/>
                        Compared with 0h, the recovery for peak area of {productId} at each point should be <YellowInput value={stabState.stabilityState.sampleRecovery} onChange={(v) => stabState.setStabilityState({...stabState.stabilityState, sampleRecovery: v})} width="w-24" />.
                    </p>
                  </div>
               </div>
            </div>
          )
        }
      ]
    }
  ];

  const staticSectionsBefore: Section[] = [
    {
      id: 'cover',
      title: '封面 Cover',
      level: 1,
      content: (
        <div className="space-y-8">
          <table className="w-full border-collapse border border-gray-400">
            <tbody>
              <tr>
                <td className="border border-gray-400 p-2 bg-gray-50 font-bold w-1/4">题目 <br/> Title</td>
                <td className="border border-gray-400 p-2">
                  <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} className="bg-yellow-300 border-b border-black outline-none w-24 text-center font-bold px-1" placeholder="请输入货号" /> 含量和鉴别检验方法验证方案 <br/>
                  Protocol for Validation of {displayId} Assay and Identification Determination
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 bg-gray-50 font-bold">方案号 <br/> Protocol #</td>
                <td className="border border-gray-400 p-2 font-mono">
                  AVP-<YellowInput value={protocolCode} onChange={setProtocolCode} />-<YellowInput value={protocolVersion} onChange={setProtocolVersion} width="w-10" />.{projectNumber}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 bg-gray-50 font-bold">适用范围 <br/> Scope</td>
                <td className="border border-gray-400 p-2">
                  {displayId} 含量和鉴别测定 <br/>
                  Assay and Identification Determination of {displayId}
                </td>
              </tr>
            </tbody>
          </table>

          <div>
            <h3 className="font-bold mb-2">方案起草 Prepared By</h3>
            <table className="w-full border-collapse border border-gray-400 text-center">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-400 p-2">姓名 Name</th>
                  <th className="border border-gray-400 p-2">部门 Dept.</th>
                  <th className="border border-gray-400 p-2">职位 Position</th>
                  <th className="border border-gray-400 p-2">签名 Signature</th>
                  <th className="border border-gray-400 p-2">日期 Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {renderEditableCell(personnel.preparer.name, personnel.setPreparer.setName, "起草人姓名")}
                  {renderEditableCell(personnel.preparer.dept, personnel.setPreparer.setDept, "起草部门")}
                  {renderEditableCell(personnel.preparer.pos, personnel.setPreparer.setPos, "起草职位")}
                  <td className="border border-gray-400 p-2"></td>
                  <td className="border border-gray-400 p-2"></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="font-bold mb-2">方案审核 Reviewed By</h3>
            <table className="w-full border-collapse border border-gray-400 text-center">
               <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-400 p-2">姓名 Name</th>
                  <th className="border border-gray-400 p-2">部门 Dept.</th>
                  <th className="border border-gray-400 p-2">职位 Position</th>
                  <th className="border border-gray-400 p-2">签名 Signature</th>
                  <th className="border border-gray-400 p-2">日期 Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {renderEditableCell(personnel.rev1.name, personnel.setRev1.setName, "审核人姓名")}
                  {renderEditableCell(personnel.rev1.dept, personnel.setRev1.setDept, "审核部门")}
                  {renderEditableCell(personnel.rev1.pos, personnel.setRev1.setPos, "审核职位")}
                  <td className="border border-gray-400 p-2"></td>
                  <td className="border border-gray-400 p-2"></td>
                </tr>
                <tr>
                  {renderEditableCell(personnel.rev2.name, personnel.setRev2.setName, "审核人姓名")}
                  {renderEditableCell(personnel.rev2.dept, personnel.setRev2.setDept, "审核部门")}
                  {renderEditableCell(personnel.rev2.pos, personnel.setRev2.setPos, "审核职位")}
                  <td className="border border-gray-400 p-2"></td>
                  <td className="border border-gray-400 p-2"></td>
                </tr>
                <tr>
                  {renderEditableCell(personnel.rev3.name, personnel.setRev3.setName, "审核人姓名")}
                  {renderEditableCell(personnel.rev3.dept, personnel.setRev3.setDept, "审核部门")}
                  {renderEditableCell(personnel.rev3.pos, personnel.setRev3.setPos, "审核职位")}
                  <td className="border border-gray-400 p-2"></td>
                  <td className="border border-gray-400 p-2"></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="font-bold mb-2">方案批准 Approved By</h3>
            <table className="w-full border-collapse border border-gray-400 text-center">
               <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-400 p-2">姓名 Name</th>
                  <th className="border border-gray-400 p-2">部门 Dept.</th>
                  <th className="border border-gray-400 p-2">职位 Position</th>
                  <th className="border border-gray-400 p-2">签名 Signature</th>
                  <th className="border border-gray-400 p-2">日期 Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {renderEditableCell(personnel.approver.name, personnel.setApprover.setName, "批准人姓名")}
                  {renderEditableCell(personnel.approver.dept, personnel.setApprover.setDept, "批准人部门")}
                  {renderEditableCell(personnel.approver.pos, personnel.setApprover.setPos, "批准人职位")}
                  <td className="border border-gray-400 p-2"></td>
                  <td className="border border-gray-400 p-2"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    },
    {
      id: 'objective',
      title: '1. 目的 Objective',
      level: 1,
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 border border-blue-200 rounded-lg shadow-sm">
             <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
               <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
               验证项选择 Validation Items Selection
             </h4>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                {[
                  { id: 'systemSuitability', zh: '系统适用性', en: 'System Suitability', mandatory: true },
                  { id: 'specificity', zh: '专属性', en: 'Specificity' },
                  { id: 'linearity', zh: '线性和范围', en: 'Linearity and Range' },
                  { id: 'precision', zh: '精密度（重复性）', en: 'Precision (Repeatability)' },
                  { id: 'accuracy', zh: '准确度', en: 'Accuracy' },
                  { id: 'stability', zh: '溶液稳定性试验', en: 'Solution stability test' }
                ].map(item => (
                  <label key={item.id} className={`flex items-center gap-3 p-2 rounded border cursor-pointer transition-colors ${validationOptions[item.id as keyof ValidationOptions] ? 'bg-white border-blue-400 shadow-sm' : 'bg-gray-100 border-gray-300 opacity-60'}`}>
                    <input 
                      type="checkbox" 
                      disabled={item.mandatory}
                      checked={validationOptions[item.id as keyof ValidationOptions]}
                      onChange={() => setValidationOptions({
                        ...validationOptions,
                        [item.id]: !validationOptions[item.id as keyof ValidationOptions]
                      })}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 disabled:opacity-50"
                    />
                    <div>
                      <div className={`font-medium ${item.mandatory ? 'text-gray-900' : 'text-gray-700'}`}>{item.zh}</div>
                      <div className="text-[10px] text-gray-500 italic leading-tight">{item.en}</div>
                    </div>
                    {item.mandatory && <span className="ml-auto text-[10px] bg-gray-200 px-1.5 py-0.5 rounded text-gray-600">必选</span>}
                  </label>
                ))}
             </div>
          </div>

          <div className="bg-green-100 p-4 border-l-4 border-green-500 text-sm">
            <p className="mb-2">由于 {displayId} 含量测定和鉴别检验方法为自行开发的 HPLC 方法，根据分析方法验证/确认（SOP SH-QA-6004）中的相关检验方法验证的规定，对该检验方法进行验证，包括<span className="font-bold text-green-800">{dynamicItems.zh}</span>。</p>
            <p>According to related analysis validation guideline in the Analytical Methods Validation/Verification (SOP SH-QA-6004), Analysis method of {displayId} Assay and Identification Determination need to be validated because the method was self-developed HPLC method, the method was validated for <span className="font-bold text-green-800 italic">{dynamicItems.en}</span>.</p>
          </div>
        </div>
      )
    },
    {
      id: 'scope',
      title: '2. 范围 Scope',
      level: 1,
      content: (
        <div className="text-sm">
          <p className="mb-2">本方案适用于 {displayId} 含量测定和鉴别检验方法的验证。</p>
          <p>This protocol is applicable to the validation of {displayId} Assay and Identification Determination.</p>
        </div>
      )
    },
    {
      id: 'responsibilities',
      title: '3. 职责 Responsibilities',
      level: 1,
      content: (
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-bold">3.1 QC</h4>
            <ul className="list-disc ml-5">
              <li>负责检验方法验证方案的起草、审核 and 实施。</li>
              <li className="text-gray-600 mb-2">Responsible for drafting, reviewing and implementing of the validation protocol.</li>
              <li>负责检验方法验证报告的起草、审核。</li>
              <li className="text-gray-600">Responsible for drafting, reviewing of the validation report.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold">3.2 QA</h4>
            <ul className="list-disc ml-5">
              <li>负责检验方法验证方案的审核 and 批准。</li>
              <li className="text-gray-600 mb-2">Responsible for reviewing and approving of the validation protocol.</li>
               <li>负责检验方法验证报告的审核 and 批准。</li>
              <li className="text-gray-600">Responsible for reviewing and approving of the validation report.</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'method-desc',
      title: '4. 检验方法描述 Test Method Description',
      level: 1,
      content: (
        <div className="space-y-6 text-sm">
          <div>
            <h4 className="font-bold mb-2">4.1 产品描述 Description of Product</h4>
            <div className="grid grid-cols-1 gap-3 bg-green-50 p-3 border border-green-200 rounded">
              <div className="flex items-center gap-2">
                <span className="font-semibold shrink-0">产品代码 Product ID:</span> 
                <span>{displayId}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold shrink-0">化学式 Formula:</span> 
                <div className="relative flex-1 group min-h-[1.5rem] flex items-center">
                  <span className={`px-2 py-0.5 border-b border-black text-black font-medium transition-colors bg-yellow-300 w-full`}>
                    {productDetails.chemicalFormula || "N/A"}
                  </span>
                  <input 
                    type="text" 
                    value={productDetails.chemicalFormula}
                    onChange={(e) => productDetails.setChemicalFormula(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 focus:opacity-100 bg-yellow-300 border-b border-black outline-none px-2 py-0.5 transition-opacity z-10"
                    placeholder="请输入化学式"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold shrink-0">化学名称 Chemical name:</span> 
                <div className="relative flex-1 group min-h-[1.5rem] flex items-center">
                  <span className={`px-2 py-0.5 border-b border-black text-black font-medium transition-colors bg-yellow-300 w-full`}>
                    {productDetails.chemicalName || "N/A"}
                  </span>
                  <input 
                    type="text" 
                    value={productDetails.chemicalName}
                    onChange={(e) => productDetails.setChemicalName(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 focus:opacity-100 bg-yellow-300 border-b border-black outline-none px-2 py-0.5 transition-opacity z-10"
                    placeholder="请输入化学名称"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold bg-green-200 inline-block px-1">4.2 仪器及检测条件 Instruments and testing conditions</h4>
              <button 
                onClick={handleAddTestingConditionRow}
                className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700 transition-colors shadow-sm"
              >
                <Plus size={14} /> 新增行 Add Condition
              </button>
            </div>
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <tbody>
                {tcState.testingConditions.map((condition, idx) => {
                  const isEmpty = condition.value.trim() === "";
                  const isNeedleWash = condition.id === 'needleWash' || condition.labelZh.includes('洗针液');
                  const isMethodRow = condition.id === 'method';
                  const showStrikethrough = isNeedleWash && isEmpty;
                  const showMandatoryError = !isNeedleWash && isEmpty && !isMethodRow;
                  
                  const isMainColumn = condition.id === 'column';
                  const isExtraColumn = condition.id.startsWith('column_');
                  const canDelete = condition.isCustom || isExtraColumn;

                  return (
                    <tr key={condition.id} className={showStrikethrough ? "line-through text-gray-400 opacity-60" : ""}>
                      <td className="border border-gray-300 p-2 bg-gray-50 w-1/3 relative group">
                        {condition.isCustom ? (
                          <div className="flex flex-col gap-1">
                            <input 
                              type="text"
                              value={condition.labelZh}
                              onChange={(e) => handleUpdateTestingCondition(idx, 'labelZh', e.target.value)}
                              className="w-full bg-yellow-300 border-b border-black outline-none px-1 py-0.5 text-black"
                              placeholder="中文标签"
                            />
                            <input 
                              type="text"
                              value={condition.labelEn}
                              onChange={(e) => handleUpdateTestingCondition(idx, 'labelEn', e.target.value)}
                              className="w-full bg-yellow-300 border-b border-black outline-none px-1 py-0.5 italic text-black"
                              placeholder="English label"
                            />
                          </div>
                        ) : (
                          <div className="text-left font-medium flex justify-between items-center">
                            <div>
                                {condition.labelZh}<br/>
                                <span className="text-[10px] text-gray-500 italic leading-tight">{condition.labelEn}</span>
                            </div>
                            {isMainColumn && (
                                <button 
                                    onClick={() => handleAddColumnRow(idx)}
                                    className="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 p-1 rounded transition-colors ml-2 shadow-sm border border-blue-200"
                                    title="新增色谱柱 Add Column"
                                >
                                    <Plus size={14} />
                                </button>
                            )}
                          </div>
                        )}
                        {canDelete && (
                          <button 
                            onClick={() => handleRemoveTestingConditionRow(idx)}
                            className="absolute -left-6 top-1/2 -translate-y-1/2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="删除行"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </td>
                      <td className={`border border-gray-300 p-0 relative ${isMethodRow ? '' : 'bg-yellow-300'}`}>
                        {isMethodRow ? (
                          <div className="min-h-[2.5rem] flex items-center px-3 text-black font-semibold">
                            TM-{protocolCode}-LC-{protocolVersion}.{projectNumber}
                          </div>
                        ) : (
                          <>
                            <div className="min-h-[2.5rem] flex items-center px-3 text-black font-semibold border-b border-black">
                              {showMandatoryError ? (
                                <span className="text-red-600 animate-pulse">请输入</span>
                              ) : (
                                condition.value
                              )}
                            </div>
                            <input 
                              type="text"
                              value={condition.value}
                              onChange={(e) => handleUpdateTestingCondition(idx, 'value', e.target.value)}
                              className="absolute inset-0 w-full h-full opacity-0 focus:opacity-100 bg-yellow-300 outline-none px-3 font-semibold border-b border-black transition-opacity z-10 text-black"
                              placeholder={isNeedleWash ? "可选 (Optional)" : "请输入"}
                            />
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            
            <div className="flex justify-between items-end mt-4 mb-2">
              <h5 className="font-bold bg-green-200 inline-block px-1">流动相梯度表 Gradient Table</h5>
              <button 
                onClick={handleAddGradientRow}
                className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700 transition-colors shadow-sm"
              >
                <Plus size={14} /> 新增行 Add Row
              </button>
            </div>
            <table className="w-full border-collapse border border-gray-300 text-center text-sm">
               <thead>
                 <tr className="bg-gray-100">
                   <th className="border border-gray-300 p-2 bg-green-100 w-1/4">时间 (min) <br/> Time</th>
                   <th className="border border-gray-300 p-2 bg-green-100 w-1/4">流动相 A (%) <br/> Mobile phase A</th>
                   <th className="border border-gray-300 p-2 bg-green-100 w-1/4">流动相 B (%) <br/> Mobile phase B (B=100-A)</th>
                   <th className="border border-gray-300 p-2 bg-green-100 w-20">操作 <br/> Action</th>
                 </tr>
               </thead>
               <tbody>
                  {gradientState.gradientData.map((row, i) => {
                    const phaseAVal = parseFloat(row.phaseA);
                    const isPhaseAEmpty = row.phaseA.trim() === "";
                    const phaseB = isPhaseAEmpty 
                      ? <span className="text-red-500 font-bold">N/A</span> 
                      : (isNaN(phaseAVal) ? <span className="text-red-400 font-bold">Error</span> : (100 - phaseAVal).toFixed(1));

                    return (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="border border-gray-300 p-0 relative bg-yellow-300">
                          <input 
                            type="number" 
                            step="0.1"
                            value={row.time}
                            onChange={(e) => handleUpdateGradientRow(i, 'time', e.target.value)}
                            className="w-full h-10 text-center bg-transparent outline-none border-b border-black font-medium px-2"
                            placeholder="时间"
                          />
                        </td>
                        <td className="border border-gray-300 p-0 relative bg-yellow-300">
                          <input 
                            type="number" 
                            step="1"
                            value={row.phaseA}
                            onChange={(e) => handleUpdateGradientRow(i, 'phaseA', e.target.value)}
                            className="w-full h-10 text-center bg-transparent outline-none border-b border-black font-medium px-2"
                            placeholder="A %"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 bg-green-50 font-semibold">
                          {phaseB}
                        </td>
                        <td className="border border-gray-300 p-2">
                          <button 
                            onClick={() => handleRemoveGradientRow(i)}
                            className="text-red-400 hover:text-red-600 transition-colors p-1"
                            title="删除行"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
               </tbody>
            </table>
          </div>

          <div>
            <h4 className="font-bold mb-2 bg-green-200 inline-block px-1">4.3 溶液配制 Solution Preparation</h4>
            <div className="space-y-4">
               {renderSolutionItem('phaseA', '流动相 A', 'Mobile phase A')}
               {renderSolutionItem('phaseB', '流动相 B', 'Mobile phase B')}
               {renderSolutionItem('needleWash', '洗针液', 'Needle wash solution')}
               {renderSolutionItem('diluent', '稀释剂（空白）', 'Diluent(Blank)')}

               <div className="bg-green-200 p-2 font-bold rounded shadow-sm">
                  注：以上溶液配制均可等比例缩放。<br/>
                  Note: The above solution can be scaled up or down in equal proportion.
               </div>

               {/* 对照品溶液 Reference Standard Solution */}
               <div className="bg-green-50 p-4 rounded shadow-sm border border-green-100">
                  <p className="font-bold text-green-800 mb-2">➤ 对照品溶液 Reference Standard Solution</p>
                  <div className="bg-white p-3 border border-green-200 rounded leading-relaxed">
                    <p className="mb-2">
                      取 {productId} 对照品约 
                      <YellowInput value={sdState.solDetail.stdWeight} onChange={(v) => handleUpdateSolDetail('stdWeight', v)} /> 
                      mg，精密称定，置 
                      <YellowInput value={sdState.solDetail.stdVolume} onChange={(v) => handleUpdateSolDetail('stdVolume', v)} /> 
                      ml 量瓶中，
                      <YellowTextareaInline value={sdState.solDetail.stdMethodZh} onChange={(v) => handleUpdateSolDetail('stdMethodZh', v)} className="w-64" />
                      ，摇匀，平行配制 
                      <YellowInput value={sdState.solDetail.stdCount} onChange={(v) => handleUpdateSolDetail('stdCount', v)} width="w-10" /> 
                      份。（{stdConc} mg/ml）
                    </p>
                    <p className="italic text-gray-600">
                      Accurately weigh about 
                      <span className="font-bold text-black border-b border-black px-1 mx-1 bg-yellow-300">{sdState.solDetail.stdWeight}</span>
                      mg of {productId} reference standard into a 
                      <span className="font-bold text-black border-b border-black px-1 mx-1 bg-yellow-300">{sdState.solDetail.stdVolume}</span>
                      ml volumetric flask, 
                      <YellowTextareaInline value={sdState.solDetail.stdMethodEn} onChange={(v) => handleUpdateSolDetail('stdMethodEn', v)} className="w-64" />
                      , mix well. Prepare 
                      <span className="font-bold text-black border-b border-black px-1 mx-1 bg-yellow-300">{sdState.solDetail.stdCount}</span>
                      solutions in parallel. ({stdConc} mg/ml)
                    </p>
                  </div>
               </div>

               {/* 供试品溶液 Sample Solution */}
               <div className="bg-green-50 p-4 rounded shadow-sm border border-green-100">
                  <p className="font-bold text-green-800 mb-2">➤ 供试品溶液 Sample Solution</p>
                  <div className="bg-white p-3 border border-green-200 rounded leading-relaxed">
                    <p className="mb-2">
                      取供试品约 
                      <YellowInput value={sdState.solDetail.splWeight} onChange={(v) => handleUpdateSolDetail('splWeight', v)} />
                      mg，精密称定，置 
                      <YellowInput value={sdState.solDetail.splVolume} onChange={(v) => handleUpdateSolDetail('splVolume', v)} />
                      ml 量瓶中，
                      <YellowTextareaInline value={sdState.solDetail.splMethodZh} onChange={(v) => handleUpdateSolDetail('splMethodZh', v)} className="w-64" />
                      ，摇匀，平行配制 
                      <YellowInput value={sdState.solDetail.splCount} onChange={(v) => handleUpdateSolDetail('splCount', v)} width="w-10" />
                      份。（{splConc} mg/ml）
                    </p>
                    <p className="italic text-gray-600">
                      Accurately weigh about 
                      <span className="font-bold text-black border-b border-black px-1 mx-1 bg-yellow-300">{sdState.solDetail.splWeight}</span>
                      mg of Sample into a 
                      <span className="font-bold text-black border-b border-black px-1 mx-1 bg-yellow-300">{sdState.solDetail.splVolume}</span>
                      ml volumetric flask, 
                      <YellowTextareaInline value={sdState.solDetail.splMethodEn} onChange={(v) => handleUpdateSolDetail('splMethodEn', v)} className="w-64" />
                      , mix well. Prepare 
                      <span className="font-bold text-black border-b border-black px-1 mx-1 bg-yellow-300">{sdState.solDetail.splCount}</span>
                      solutions in parallel. ({splConc} mg/ml)
                    </p>
                  </div>
                  <p className="bg-green-200 p-2 font-bold mt-2 rounded">
                    注：对照品溶液、供试品的称样量及量瓶体积可根据实际情况放大或缩小，但需浓度保持不变。<br/>
                    Note: The weight of RS and Sample solution and the volume of volumetric flask can be scaled up or down according to actual, keep concentration unchanged.
                  </p>
               </div>
            </div>
          </div>

          <div>
             <h4 className="font-bold mb-2 bg-green-200 inline-block px-1">4.4 序列设置 Sequence</h4>
             <table className="w-full border-collapse border border-gray-300 text-center text-sm">
               <thead>
                 <tr>
                   <th className="border border-gray-300 p-2 bg-green-200">序号 No.</th>
                   <th className="border border-gray-300 p-2 bg-green-200">溶液名称 Injected Solution</th>
                   <th className="border border-gray-300 p-2 bg-green-200">进样针数 Number of injections</th>
                 </tr>
               </thead>
               <tbody>
                 {[
                   { id: '1', name: '空白溶液 Blank solution', val: '≥1（至无干扰 no interference）', isInput: false },
                   { id: '2', name: '对照品溶液 1 Reference Standard Solution 1', field: 'std1Count', isInput: true },
                   { id: '3', name: '对照品溶液 2 Reference Standard Solution 2', field: 'std2Count', isInput: true },
                   { id: '4', name: '供试品溶液 1 Sample Solution 1', field: 'spl1Count', isInput: true },
                   { id: '5', name: '供试品溶液 2 Sample Solution 2', field: 'spl2Count', isInput: true },
                   { id: '6', name: '......', val: '......', isInput: false },
                   { id: '7', name: '随行对照，不超过 12 针回进一次，并且序列结束回进一次\nAccompanying control, no more than 12 needles back once, and at the end of the sequence back once', field: 'controlCount', isInput: true }
                 ].map((row, i) => (
                   <tr key={i}>
                     <td className="border border-gray-300 p-2 bg-green-100">{row.id}</td>
                     <td className="border border-gray-300 p-2 bg-green-100 whitespace-pre-wrap">{row.name}</td>
                     <td className={`border border-gray-300 p-0 relative ${row.isInput ? 'bg-orange-300' : 'bg-yellow-100'}`}>
                        {row.isInput ? (
                          <>
                            <input 
                              type="text" 
                              value={seqState.sequenceState[row.field as keyof SequenceState]}
                              onChange={(e) => seqState.setSequenceState({...seqState.sequenceState, [row.field as keyof SequenceState]: e.target.value})}
                              className="w-full h-full text-center bg-transparent outline-none p-2"
                            />
                            {(!seqState.sequenceState[row.field as keyof SequenceState] || seqState.sequenceState[row.field as keyof SequenceState].trim() === "") && (
                               <span className="absolute inset-0 flex items-center justify-center text-red-500 pointer-events-none">请输入</span>
                            )}
                          </>
                        ) : (
                          <div className="p-2">{row.val}</div>
                        )}
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
           <div>
             <h4 className="font-bold mb-2 bg-green-200 inline-block px-1">4.5 系统适用性要求 System Suitability Requirements</h4>
             {/* Use shared helper for content */}
             {renderSysSuitRequirementsContent()}
           </div>
          <div>
             <h4 className="font-bold mb-2 bg-green-200 inline-block px-1">4.6 积分方式 Integration Method</h4>
             <div className="bg-green-50 p-2 border border-green-200">
               <p>只积主峰。<br/>Only the main peaks are integrated</p>
             </div>
          </div>
          <div>
             <h4 className="font-bold mb-2 bg-green-200 inline-block px-1">4.7 计算 Calculation</h4>
             {renderAssayCalculationContent()}
          </div>
          <div>
             <h4 className="font-bold mb-2 bg-green-200 inline-block px-1">4.8 可接受标准 Acceptance Criteria</h4>
             <div className="bg-green-50 p-2 border border-green-200 space-y-4">
               {accCriteriaState.acceptanceCriteria.map((ac, idx) => (
                 <div key={ac.id} className="grid grid-cols-1 md:grid-cols-3 gap-2 border-b border-gray-300 pb-2 last:border-0 last:pb-0">
                    <div className="font-bold md:col-span-1 whitespace-pre-wrap">{ac.name}</div>
                    <div className="md:col-span-2">
                       <textarea
                         value={ac.criteria}
                         onChange={(e) => {
                            const newArr = [...accCriteriaState.acceptanceCriteria];
                            newArr[idx] = { ...newArr[idx], criteria: e.target.value };
                            accCriteriaState.setAcceptanceCriteria(newArr);
                         }}
                         className="w-full bg-yellow-300 border-b border-black outline-none px-2 py-1 text-black resize-none min-h-[3rem]"
                       />
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      )
    },
    {
      id: 'references-5',
      title: '5. 参考文件 Reference',
      level: 1,
      content: (
        <ul className="list-disc ml-6 space-y-2 text-sm">
           <li>{productId} 质量标准<br/>{productId} Specification</li>
           <li>分析方法验证/确认（SOP SH-QA-6004）<br/>Analytical Methods Validation/Verification (SOP SH-QA-6004)</li>
           <li>药品质量标准分析方法验证指导原则<br/>Guidance for Validation of Analysis Methods for Pharmaceutical Quality Standards</li>
           <li>ICH Q2 (R1): Validation of Analytical Procedures: Text and Methodology</li>
        </ul>
      )
    },
    {
      id: 'validation-content',
      title: '6. 验证内容 Validation Content',
      level: 1,
      content: (
        <div className="text-sm">
          <p>
            将验证以下参数（如适用）：{dynamicItems.zh}。<br/>
            The following parameters will be validated (where applicable): {dynamicItems.en}.
          </p>
        </div>
      )
    },
  ];

  const staticSectionsAfter: Section[] = [
    {
      id: 'summary-deviations',
      title: '7. 偏差摘要 Summary of Deviations',
      level: 1,
      content: (
        <div className="space-y-4 text-sm">
           <p>验证过程中发生的偏差及调查结果总结如下：<br/>Deviations during validation and investigation results are summarized as follows:</p>
           <table className="w-full border-collapse border border-gray-400 text-center">
             <thead>
               <tr className="bg-gray-100">
                 <th className="border border-gray-400 p-2">偏差编号 Deviation No.</th>
                 <th className="border border-gray-400 p-2">偏差描述 Description</th>
                 <th className="border border-gray-400 p-2">调查结果 Investigation Result</th>
                 <th className="border border-gray-400 p-2">对验证结果的影响 Impact</th>
               </tr>
             </thead>
             <tbody>
               <tr>
                 <td className="border border-gray-400 p-4" colSpan={4}>N/A</td>
               </tr>
             </tbody>
           </table>
        </div>
      )
    },
    {
      id: 'support-documents',
      title: '8. 支持性文件 Support Documents',
      level: 1,
      content: (
        <ul className="list-disc ml-6 space-y-2 text-sm">
           <li>色谱图 Chromatograms</li>
           <li>称量记录 Weighing Records</li>
           <li>计算表格 Calculation Sheets</li>
        </ul>
      )
    },
    {
      id: 'acceptance-criteria-9',
      title: '9. 验证可接受标准 Acceptance Criteria of Validation',
      level: 1,
      content: (
        <div className="text-sm">
           <p>所有验证项目均应符合可接受标准。如有偏差，需进行评估并确认不影响方法的有效性。<br/>All validation items should meet the acceptance criteria. Any deviations should be evaluated to confirm no impact on method validity.</p>
        </div>
      )
    },
    {
      id: 'validation-report',
      title: '10. 验证报告 Validation Report',
      level: 1,
      content: (
        <div className="text-sm">
           <p>验证结束后，将起草验证报告，总结验证数据和结果，并由相关人员审核批准。<br/>After validation, a validation report will be drafted to summarize validation data and results, reviewed and approved by relevant personnel.</p>
        </div>
      )
    },
    {
      id: 'history',
      title: '11. 变更历史 Change History',
      level: 1,
      content: (
        <table className="w-full border-collapse border border-gray-400 text-center text-sm">
           <thead>
             <tr className="bg-gray-100">
               <th className="border border-gray-400 p-2">版本 Version</th>
               <th className="border border-gray-400 p-2">日期 Date</th>
               <th className="border border-gray-400 p-2">变更原因 Reason for Change</th>
               <th className="border border-gray-400 p-2">变更内容 Description of Change</th>
             </tr>
           </thead>
           <tbody>
             <tr>
               <td className="border border-gray-400 p-2">00</td>
               <td className="border border-gray-400 p-2">New</td>
               <td className="border border-gray-400 p-2">首次生效 First Effective</td>
               <td className="border border-gray-400 p-2">N/A</td>
             </tr>
           </tbody>
        </table>
      )
    },
    {
      id: 'validation-procedure-title',
      title: '验证步骤 Validation Procedure',
      level: 1,
      content: (
        <div className="p-4 bg-yellow-50 border border-yellow-200 text-sm">
           <p className="font-bold mb-2">以下为详细的验证操作步骤。<br/>The following are detailed validation operation procedures.</p>
        </div>
      )
    },
    {
      id: 'val-pre-1',
      title: '先决条件 1: 培训 Prerequisite 1: Training',
      level: 2,
      content: (
        <div className="space-y-2 text-sm">
           <p>参与本次验证的人员已经过相关SOP和本方案的培训。<br/>Personnel involved in this validation have been trained on relevant SOPs and this protocol.</p>
           <div className="bg-gray-50 p-3 border border-gray-200">
             <div className="font-bold mb-1">培训记录 Training Record:</div>
             <div><span className="font-semibold">题目 Title:</span> {productId} 含量和鉴别检验方法验证方案</div>
             <div><span className="font-semibold">Title (EN):</span> Protocol for Validation of {productId} Assay and Identification Determination</div>
           </div>
        </div>
      )
    },
    {
      id: 'val-pre-2',
      title: '先决条件 2: 仪器 Prerequisite 2: Instruments',
      level: 2,
      content: (
        <div className="space-y-4 text-sm">
           <p>确认所使用的仪器均已校验并在有效期内。<br/>Confirm that instruments used are calibrated and within validity period.</p>
           <table className="w-full border-collapse border border-gray-300 text-xs">
             <thead>
               <tr className="bg-gray-100">
                 <th className="border border-gray-300 p-2">仪器名称 Instrument</th>
                 <th className="border border-gray-300 p-2">型号 Model</th>
                 <th className="border border-gray-300 p-2">编号 ID</th>
                 <th className="border border-gray-300 p-2">校验有效期 Cal. Due Date</th>
               </tr>
             </thead>
             <tbody>
               <tr>
                 <td className="border border-gray-300 p-2">HPLC</td>
                 <td className="border border-gray-300 p-2">Agilent 1260</td>
                 <td className="border border-gray-300 p-2"><input className="w-full bg-yellow-100" /></td>
                 <td className="border border-gray-300 p-2"><input className="w-full bg-yellow-100" /></td>
               </tr>
               <tr>
                 <td className="border border-gray-300 p-2">电子天平 Balance</td>
                 <td className="border border-gray-300 p-2">Mettler Toledo</td>
                 <td className="border border-gray-300 p-2"><input className="w-full bg-yellow-100" /></td>
                 <td className="border border-gray-300 p-2"><input className="w-full bg-yellow-100" /></td>
               </tr>
             </tbody>
           </table>
           
           <h4 className="font-bold mt-4 mb-2">试剂和色谱柱 Reagents and Column</h4>
           <div className="mb-2">
             <div className="flex justify-between items-center mb-1">
               <span className="font-semibold">试剂清单 Reagent List</span>
               <button 
                  onClick={handleAddReagentRow}
                  className="flex items-center gap-1 bg-green-600 text-white px-2 py-0.5 rounded text-xs hover:bg-green-700 transition-colors"
                >
                  <Plus size={12} /> Add
                </button>
             </div>
             <table className="w-full border-collapse border border-gray-300 text-xs">
               <thead>
                 <tr className="bg-gray-100">
                   <th className="border border-gray-300 p-2">名称 Name</th>
                   <th className="border border-gray-300 p-2">级别 Grade</th>
                   <th className="border border-gray-300 p-2 w-10">Op</th>
                 </tr>
               </thead>
               <tbody>
                 {preState.prerequisiteState.reagentRows.map((row, idx) => (
                    <tr key={row.id}>
                      <td className="border border-gray-300 p-1">
                        <input 
                          value={row.name} 
                          onChange={(e) => handleUpdateReagentRow(idx, 'name', e.target.value)}
                          className="w-full bg-yellow-300 px-1 py-0.5 outline-none"
                        />
                      </td>
                      <td className="border border-gray-300 p-1">
                        <input 
                          value={row.grade} 
                          onChange={(e) => handleUpdateReagentRow(idx, 'grade', e.target.value)}
                          className="w-full bg-yellow-300 px-1 py-0.5 outline-none"
                        />
                      </td>
                       <td className="border border-gray-300 p-1 text-center">
                          <button onClick={() => handleRemoveReagentRow(idx)} className="text-red-500 hover:text-red-700"><Trash2 size={12}/></button>
                       </td>
                    </tr>
                 ))}
               </tbody>
             </table>
           </div>

           <div>
             <span className="font-semibold block mb-1">色谱柱 Column</span>
             <div className="grid grid-cols-1 gap-2">
               <div className="flex items-center gap-2 border border-gray-300 p-2 bg-gray-50">
                 <span className="text-gray-600 w-24 shrink-0">Column:</span>
                 <span className="flex-1 font-medium">{tcState.testingConditions.find(t => t.id === 'column')?.value || 'N/A'}</span>
                 <span className="text-gray-500 text-xs mx-2">Supplier:</span>
                 <input 
                    value={preState.prerequisiteState.columnSuppliers['column'] || ''}
                    onChange={(e) => preState.setPrerequisiteState(prev => ({...prev, columnSuppliers: {...prev.columnSuppliers, 'column': e.target.value}}))}
                    className="w-24 bg-yellow-300 px-1 py-0.5 outline-none text-xs border-b border-black"
                    placeholder="e.g. Waters"
                 />
               </div>
               {/* Ghost buster */}
               <div className="flex items-center gap-2 border border-gray-300 p-2 bg-gray-50">
                 <span className="text-gray-600 w-24 shrink-0">Ghost-Buster:</span>
                 <span className="flex-1 font-medium">{tcState.testingConditions.find(t => t.id === 'ghostBuster')?.value || 'N/A'}</span>
                 <span className="text-gray-500 text-xs mx-2">Supplier:</span>
                 <input 
                    value={preState.prerequisiteState.columnSuppliers['ghostBuster'] || ''}
                    onChange={(e) => preState.setPrerequisiteState(prev => ({...prev, columnSuppliers: {...prev.columnSuppliers, 'ghostBuster': e.target.value}}))}
                    className="w-24 bg-yellow-300 px-1 py-0.5 outline-none text-xs border-b border-black"
                    placeholder="e.g. Welch"
                 />
               </div>
             </div>
           </div>
        </div>
      )
    },
  ];

  const validationResults: Section[] = [];
  const validationProcedures: Section[] = [];

  validationMap.forEach(item => {
    if (validationOptions[item.option as keyof ValidationOptions]) {
      item.sections.forEach(section => {
        if (section.id.startsWith('val-proc-')) {
          validationProcedures.push(section);
        } else {
          validationResults.push(section);
        }
      });
    }
  });

  return [
    ...staticSectionsBefore,
    ...validationResults,
    ...staticSectionsAfter,
    ...validationProcedures
  ];
};
