
import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { 
  GradientRow, 
  TestingCondition, 
  SolutionPrepsState, 
  SolutionDetailState, 
  SequenceState, 
  SystemSuitabilityState, 
  CalculationState, 
  AcceptanceCriterion 
} from '../types';

interface TestMethodSectionProps {
  readOnly: boolean;
  productId: string;
  protocolCode: string;
  protocolVersion: string;
  projectNumber: string;
  chemicalFormula: string;
  setChemicalFormula: (val: string) => void;
  chemicalName: string;
  setChemicalName: (val: string) => void;
  testingConditions: TestingCondition[];
  setTestingConditions: React.Dispatch<React.SetStateAction<TestingCondition[]>>;
  gradientData: GradientRow[];
  setGradientData: React.Dispatch<React.SetStateAction<GradientRow[]>>;
  solutionPreps: SolutionPrepsState;
  setSolutionPreps: React.Dispatch<React.SetStateAction<SolutionPrepsState>>;
  solDetail: SolutionDetailState;
  setSolDetail: React.Dispatch<React.SetStateAction<SolutionDetailState>>;
  sequenceState: SequenceState;
  setSequenceState: React.Dispatch<React.SetStateAction<SequenceState>>;
  sysSuitability: SystemSuitabilityState;
  setSysSuitability: React.Dispatch<React.SetStateAction<SystemSuitabilityState>>;
  calculationState: CalculationState;
  setCalculationState: React.Dispatch<React.SetStateAction<CalculationState>>;
  acceptanceCriteria: AcceptanceCriterion[];
  setAcceptanceCriteria: React.Dispatch<React.SetStateAction<AcceptanceCriterion[]>>;
}

// --- Helper Components defined OUTSIDE the main component to prevent remounting/focus loss ---

const SmartInput = ({ value, onChange, placeholder, width = "w-full", className = "", readOnly }: { value: string, onChange: (v: string) => void, placeholder?: string, width?: string, className?: string, readOnly: boolean }) => {
  if (readOnly) {
    return <span className={`font-semibold px-1 ${className}`}>{value || 'N/A'}</span>;
  }
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${width} bg-yellow-300 border-b border-black outline-none px-1 text-center font-bold mx-1 inline-block ${className}`}
      placeholder={placeholder}
    />
  );
};

const SmartTextarea = ({ value, onChange, placeholder, className = "", readOnly }: { value: string, onChange: (v: string) => void, placeholder?: string, className?: string, readOnly: boolean }) => {
  if (readOnly) {
    return <span className={`font-medium whitespace-pre-wrap ${className}`}>{value || 'N/A'}</span>;
  }
  return (
    <div className={`inline-block ${className}`}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-yellow-300 border-b border-black outline-none px-1 py-0.5 text-black resize-none min-h-[1.5rem] font-bold align-middle w-full h-full"
        placeholder={placeholder}
        rows={1}
      />
    </div>
  );
};

export const TestMethodSection: React.FC<TestMethodSectionProps> = ({
  readOnly,
  productId,
  protocolCode,
  protocolVersion,
  projectNumber,
  chemicalFormula,
  setChemicalFormula,
  chemicalName,
  setChemicalName,
  testingConditions,
  setTestingConditions,
  gradientData,
  setGradientData,
  solutionPreps,
  setSolutionPreps,
  solDetail,
  setSolDetail,
  sequenceState,
  setSequenceState,
  sysSuitability,
  setSysSuitability,
  calculationState,
  setCalculationState,
  acceptanceCriteria,
  setAcceptanceCriteria
}) => {
  const displayId = productId || "N/A";

  const calculateConc = (w: string, v: string) => {
    const weight = parseFloat(w);
    const volume = parseFloat(v);
    if (isNaN(weight) || isNaN(volume) || volume === 0) return "N/A";
    return (weight / volume).toFixed(2);
  };

  const stdConc = calculateConc(solDetail.stdWeight, solDetail.stdVolume);
  const splConc = calculateConc(solDetail.splWeight, solDetail.splVolume);

  // --- Render Functions ---

  const renderSolutionItem = (key: keyof SolutionPrepsState, titleZh: string, titleEn: string) => (
    <div className={`p-2 rounded mb-4 ${readOnly ? 'bg-transparent border-0' : 'bg-green-50 shadow-sm border border-green-100'}`}>
      
      {/* Label and Description Area */}
      <div className="mb-2">
        {/* Chinese Line */}
        <div className="flex items-baseline">
           <span className="shrink-0 w-6 font-bold text-green-800 select-none">➤</span>
           <span className="shrink-0 font-bold text-green-800 mr-2">{titleZh}：</span>
           <div className="flex-1 font-bold text-gray-900">
              <SmartTextarea 
                value={solutionPreps[key].descZh} 
                onChange={(v) => setSolutionPreps(prev => ({ ...prev, [key]: { ...prev[key], descZh: v } }))}
                className="w-full"
                readOnly={readOnly}
              />
           </div>
        </div>

        {/* English Line */}
        <div className="flex items-baseline mt-1">
           <span className="shrink-0 w-6"></span> {/* Spacer for arrow alignment */}
           <span className="shrink-0 font-bold text-green-800 mr-2 italic">{titleEn}：</span>
           <div className="flex-1 italic text-gray-700 font-bold">
              <SmartTextarea 
                value={solutionPreps[key].descEn} 
                onChange={(v) => setSolutionPreps(prev => ({ ...prev, [key]: { ...prev[key], descEn: v } }))}
                className="italic w-full"
                readOnly={readOnly}
              />
           </div>
        </div>
      </div>

      {/* Details Area */}
      <div className={`${readOnly ? 'pl-4 ml-6 border-l-4 border-gray-300 mt-2 text-gray-600' : 'bg-green-100 p-2 rounded mt-2 ml-6'}`}>
         <SmartTextarea 
            value={solutionPreps[key].detail}
            onChange={(v) => setSolutionPreps(prev => ({ ...prev, [key]: { ...prev[key], detail: v } }))}
            className="w-full"
            readOnly={readOnly}
         />
      </div>
    </div>
  );

  const renderSysSuitRequirementsContent = () => (
    <div className={`${readOnly ? '' : 'bg-green-50 p-4 border border-green-200'} space-y-3`}>
       <p>1) 空白在主峰出峰处应无干扰；<br/>The blank should have no interference at the main peak;</p>
       <p>
         2) 对照品溶液1第一针中，主峰理论板数应不低于 
         <SmartInput value={sysSuitability.plateNumber} onChange={(v) => setSysSuitability(prev => ({ ...prev, plateNumber: v }))} width="w-16" readOnly={readOnly} />
         ，拖尾因子应不大于 
         <SmartInput value={sysSuitability.tailingFactor} onChange={(v) => setSysSuitability(prev => ({ ...prev, tailingFactor: v }))} width="w-12" readOnly={readOnly} />
         ；<br/>
         The theoretical plate number of the principal peak in the first injection of STD1 should be not less than 
         <SmartInput value={sysSuitability.plateNumber} onChange={(v) => setSysSuitability(prev => ({ ...prev, plateNumber: v }))} width="w-16" readOnly={readOnly} />
         , the trailing factor should not be more than 
         <SmartInput value={sysSuitability.tailingFactor} onChange={(v) => setSysSuitability(prev => ({ ...prev, tailingFactor: v }))} width="w-12" readOnly={readOnly} />
         ；
       </p>
       <p>
         3) 对照品溶液1连续进样 
         <SmartInput value={sysSuitability.injectionCount} onChange={(v) => setSysSuitability(prev => ({ ...prev, injectionCount: v }))} width="w-10" readOnly={readOnly} />
         针，主峰峰面积的RSD应≤ 
         <SmartInput value={sysSuitability.areaRSD} onChange={(v) => setSysSuitability(prev => ({ ...prev, areaRSD: v }))} width="w-12" readOnly={readOnly} />
         %，保留时间的RSD应≤ 
         <SmartInput value={sysSuitability.retentionRSD} onChange={(v) => setSysSuitability(prev => ({ ...prev, retentionRSD: v }))} width="w-12" readOnly={readOnly} />
         %；<br/>
         For 
         <SmartInput value={sysSuitability.injectionCount} onChange={(v) => setSysSuitability(prev => ({ ...prev, injectionCount: v }))} width="w-10" readOnly={readOnly} />
         consecutive standard solution1, the RSD of the main peak area should be NMT 
         <SmartInput value={sysSuitability.areaRSD} onChange={(v) => setSysSuitability(prev => ({ ...prev, areaRSD: v }))} width="w-12" readOnly={readOnly} />
         %, the RSD of the retention time should be NMT 
         <SmartInput value={sysSuitability.retentionRSD} onChange={(v) => setSysSuitability(prev => ({ ...prev, retentionRSD: v }))} width="w-12" readOnly={readOnly} />
         %;
       </p>
       <p>
         4) 对照品溶液2与对照品溶液1的回收率在 
         <SmartInput value={sysSuitability.recoveryRange} onChange={(v) => setSysSuitability(prev => ({ ...prev, recoveryRange: v }))} width="w-32" readOnly={readOnly} />
         之间；<br/>
         The recovery of reference solution 2 to reference solution 1 was between 
         <SmartInput value={sysSuitability.recoveryRange} onChange={(v) => setSysSuitability(prev => ({ ...prev, recoveryRange: v }))} width="w-32" readOnly={readOnly} />
         ；
       </p>
       <p>
         5) 若有随行对照，取随行对照1针和对照品溶液1连续 
         <SmartInput value={sysSuitability.controlInjectionCount} onChange={(v) => setSysSuitability(prev => ({ ...prev, controlInjectionCount: v }))} width="w-10" readOnly={readOnly} />
         针的主峰峰面积的RSD应≤ 
         <SmartInput value={sysSuitability.controlAreaRSD} onChange={(v) => setSysSuitability(prev => ({ ...prev, controlAreaRSD: v }))} width="w-12" readOnly={readOnly} />
         %。<br/>
         If have contrast check solution. GRSD(Global %RSD)of the peak area of check solution and 
         <SmartInput value={sysSuitability.controlInjectionCount} onChange={(v) => setSysSuitability(prev => ({ ...prev, controlInjectionCount: v }))} width="w-10" readOnly={readOnly} />
         consecutive standard solution 1 should be NMT
         <SmartInput value={sysSuitability.controlAreaRSD} onChange={(v) => setSysSuitability(prev => ({ ...prev, controlAreaRSD: v }))} width="w-12" readOnly={readOnly} />
         %.
       </p>
    </div>
  );

  const renderAssayCalculationContent = () => {
    const correctionFactors = [];
    if (calculationState.kf) correctionFactors.push("KF");
    if (calculationState.lod) correctionFactors.push("LOD");
    if (calculationState.sr) correctionFactors.push("SR");
    if (calculationState.tga) correctionFactors.push("TGA");
    const correctionTerm = correctionFactors.length > 0 ? ` × (1 - ${correctionFactors.join(" - ")})` : "";

    return (
    <div className={`${readOnly ? '' : 'bg-green-50 p-4 border border-green-200'}`}>
      <p className="mb-2">按外标法以峰面积计算，取两份平均值作为最终报告，保留一位小数。<br/>Calculated assay through the peak area by external standard method, regard the average value of two results as report result, the results should keep on decimal place.</p>
      <div className={`overflow-x-auto p-3 border border-gray-300 rounded mb-3 ${readOnly ? 'bg-gray-50' : 'bg-white'}`}>
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

          <div className={`col-span-1 md:col-span-2 mt-2 p-2 rounded ${readOnly ? 'bg-transparent' : 'bg-yellow-50 border border-yellow-200'}`}>
            <span className="text-xs font-bold text-gray-500 mb-1 block">水分/溶剂校正选项 Correction Factors:</span>
            <div className="flex flex-wrap gap-4">
              {['kf', 'lod', 'sr', 'tga'].map((key) => (
                  <label key={key} className={`flex items-center gap-1 ${readOnly ? 'pointer-events-none' : 'cursor-pointer select-none'}`}>
                    <input 
                        type="checkbox" 
                        checked={calculationState[key as keyof CalculationState]} 
                        onChange={(e) => setCalculationState({...calculationState, [key]: e.target.checked})} 
                        className="rounded text-blue-600 focus:ring-blue-500" 
                        disabled={readOnly}
                    />
                    <span className="text-sm uppercase">{key}</span>
                  </label>
              ))}
            </div>
          </div>

          {calculationState.kf && (
            <p><span className="font-bold">KF：</span>供试品水分；<br/>KF:Water of sample;</p>
          )}
          {calculationState.lod && (
            <p><span className="font-bold">LOD：</span>干燥失重<br/>LOD:loss in weight on drying</p>
          )}
          {calculationState.sr && (
            <p><span className="font-bold">SR：</span>溶剂残留<br/>SR:Solvent residues</p>
          )}
          {calculationState.tga && (
            <p><span className="font-bold">TGA：</span>TGA<br/>TGA</p>
          )}
        </div>
      </div>
    </div>
  )};

  return (
    <div className="space-y-6 text-sm">
      {/* 4.1 Product Description */}
      <div>
        <h4 className="font-bold mb-2">4.1 产品描述 Description of Product</h4>
        <div className={`grid grid-cols-1 gap-3 p-3 rounded ${readOnly ? '' : 'bg-green-50 border border-green-200'}`}>
          <div className="flex items-center gap-2">
            <span className="font-semibold shrink-0">产品代码 Product ID:</span> 
            <span>{displayId}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold shrink-0">化学式 Formula:</span> 
            <div className="flex-1">
              <SmartInput value={chemicalFormula} onChange={setChemicalFormula} placeholder="请输入化学式" readOnly={readOnly} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold shrink-0">化学名称 Chemical name:</span> 
            <div className="flex-1">
              <SmartInput value={chemicalName} onChange={setChemicalName} placeholder="请输入化学名称" readOnly={readOnly} />
            </div>
          </div>
        </div>
      </div>

      {/* 4.2 Instruments */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h4 className={`font-bold inline-block px-1 ${readOnly ? '' : 'bg-green-200'}`}>4.2 仪器及检测条件 Instruments and testing conditions</h4>
          {!readOnly && (
              <button 
                onClick={() => setTestingConditions([...testingConditions, { id: Date.now().toString(), labelZh: "", labelEn: "", value: "", isCustom: true }])}
                className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700 transition-colors shadow-sm"
              >
                <Plus size={14} /> 新增行 Add Condition
              </button>
          )}
        </div>
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <tbody>
            {testingConditions.map((condition, idx) => {
              const isMethodRow = condition.id === 'method';
              const isMainColumn = condition.id === 'column';
              const canDelete = !readOnly && (condition.isCustom || condition.id.startsWith('column_'));

              return (
                <tr key={condition.id}>
                  <td className={`border border-gray-300 p-2 w-1/3 relative group ${readOnly ? 'bg-transparent' : 'bg-gray-50'}`}>
                    {condition.isCustom && !readOnly ? (
                      <div className="flex flex-col gap-1">
                        <input 
                          type="text"
                          value={condition.labelZh}
                          onChange={(e) => {
                              const newData = [...testingConditions];
                              newData[idx].labelZh = e.target.value;
                              setTestingConditions(newData);
                          }}
                          className="w-full bg-yellow-300 border-b border-black outline-none px-1 py-0.5 text-black"
                          placeholder="中文标签"
                        />
                        <input 
                          type="text"
                          value={condition.labelEn}
                          onChange={(e) => {
                              const newData = [...testingConditions];
                              newData[idx].labelEn = e.target.value;
                              setTestingConditions(newData);
                          }}
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
                        {isMainColumn && !readOnly && (
                            <button 
                                onClick={() => {
                                    const newConditions = [...testingConditions];
                                    newConditions.splice(idx + 1, 0, {
                                      id: `column_${Date.now()}`,
                                      labelZh: '色谱柱',
                                      labelEn: 'Column',
                                      value: "",
                                      isCustom: false
                                    });
                                    setTestingConditions(newConditions);
                                }}
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
                        onClick={() => setTestingConditions(testingConditions.filter((_, i) => i !== idx))}
                        className="absolute -left-6 top-1/2 -translate-y-1/2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="删除行"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </td>
                  <td className={`border border-gray-300 p-0 relative ${isMethodRow || readOnly ? '' : 'bg-yellow-300'}`}>
                    {isMethodRow ? (
                      <div className="min-h-[2.5rem] flex items-center px-3 text-black font-semibold">
                        TM-{protocolCode}-LC-{protocolVersion}.{projectNumber}
                      </div>
                    ) : (
                      readOnly ? (
                          <div className="min-h-[2.5rem] flex items-center px-3 font-semibold">{condition.value}</div>
                      ) : (
                          <>
                            <div className="min-h-[2.5rem] flex items-center px-3 text-black font-semibold border-b border-black">
                                {condition.value}
                            </div>
                            <input 
                              type="text"
                              value={condition.value}
                              onChange={(e) => {
                                  const newData = [...testingConditions];
                                  newData[idx].value = e.target.value;
                                  setTestingConditions(newData);
                              }}
                              className="absolute inset-0 w-full h-full opacity-0 focus:opacity-100 bg-yellow-300 outline-none px-3 font-semibold border-b border-black transition-opacity z-10 text-black"
                            />
                          </>
                      )
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Gradient Table */}
        <div className="flex justify-between items-end mt-4 mb-2">
          <h5 className={`font-bold inline-block px-1 ${readOnly ? '' : 'bg-green-200'}`}>流动相梯度表 Gradient Table</h5>
          {!readOnly && (
              <button 
                onClick={() => setGradientData([...gradientData, { time: "", phaseA: "" }])}
                className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700 transition-colors shadow-sm"
              >
                <Plus size={14} /> 新增行 Add Row
              </button>
          )}
        </div>
        <table className="w-full border-collapse border border-gray-300 text-center text-sm">
           <thead>
             <tr className="bg-gray-100">
               <th className={`border border-gray-300 p-2 w-1/4 ${readOnly ? '' : 'bg-green-100'}`}>时间 (min) <br/> Time</th>
               <th className={`border border-gray-300 p-2 w-1/4 ${readOnly ? '' : 'bg-green-100'}`}>流动相 A (%) <br/> Mobile phase A</th>
               <th className={`border border-gray-300 p-2 w-1/4 ${readOnly ? '' : 'bg-green-100'}`}>流动相 B (%) <br/> Mobile phase B (B=100-A)</th>
               {!readOnly && <th className="border border-gray-300 p-2 bg-green-100 w-20">操作 <br/> Action</th>}
             </tr>
           </thead>
           <tbody>
              {gradientData.map((row, i) => {
                const phaseAVal = parseFloat(row.phaseA);
                const isPhaseAEmpty = row.phaseA.trim() === "";
                
                // For Protocol view (readOnly=false), display integer. For Report (readOnly=true), keep original decimal format if preferred, 
                // but usually consistency is good. Given the user requirement strictly for Protocol view change, we branch here.
                const displayVal = !readOnly ? (100 - phaseAVal).toString() : (100 - phaseAVal).toFixed(1);

                const phaseB = isPhaseAEmpty 
                  ? <span className="text-red-500 font-bold">N/A</span> 
                  : (isNaN(phaseAVal) ? <span className="text-red-400 font-bold">Error</span> : displayVal);

                return (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className={`border border-gray-300 p-0 relative ${readOnly ? '' : 'bg-yellow-300'}`}>
                      {readOnly ? (
                          <div className="p-2 font-medium">{row.time}</div>
                      ) : (
                          <input 
                            type="number" 
                            step="0.1"
                            value={row.time}
                            onChange={(e) => {
                                const newData = [...gradientData];
                                newData[i].time = e.target.value;
                                setGradientData(newData);
                            }}
                            className="w-full h-10 text-center bg-transparent outline-none border-b border-black font-medium px-2"
                            placeholder="时间"
                          />
                      )}
                    </td>
                    <td className={`border border-gray-300 p-0 relative ${readOnly ? '' : 'bg-yellow-300'}`}>
                      {readOnly ? (
                          <div className="p-2 font-medium">{row.phaseA}</div>
                      ) : (
                          <input 
                            type="number" 
                            step="1"
                            value={row.phaseA}
                            onChange={(e) => {
                                const newData = [...gradientData];
                                newData[i].phaseA = e.target.value;
                                setGradientData(newData);
                            }}
                            className="w-full h-10 text-center bg-transparent outline-none border-b border-black font-medium px-2"
                            placeholder="A %"
                          />
                      )}
                    </td>
                    <td className={`border border-gray-300 p-2 font-semibold ${readOnly ? '' : 'bg-green-50'}`}>
                      {phaseB}
                    </td>
                    {!readOnly && (
                        <td className="border border-gray-300 p-2">
                          <button 
                            onClick={() => setGradientData(gradientData.filter((_, idx) => idx !== i))}
                            className="text-red-400 hover:text-red-600 transition-colors p-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                    )}
                  </tr>
                );
              })}
           </tbody>
        </table>
      </div>

      {/* 4.3 Solution Preparation */}
      <div>
        <h4 className={`font-bold mb-2 inline-block px-1 ${readOnly ? '' : 'bg-green-200'}`}>4.3 溶液配制 Solution Preparation</h4>
        <div className="space-y-4">
           {renderSolutionItem('phaseA', '流动相 A', 'Mobile phase A')}
           {renderSolutionItem('phaseB', '流动相 B', 'Mobile phase B')}
           {renderSolutionItem('needleWash', '洗针液', 'Needle wash solution')}
           {renderSolutionItem('diluent', '稀释剂（空白）', 'Diluent(Blank)')}

           <div className={`p-2 font-bold rounded shadow-sm ${readOnly ? 'bg-gray-100' : 'bg-green-200'}`}>
              注：以上溶液配制均可等比例缩放。<br/>
              Note: The above solution can be scaled up or down in equal proportion.
           </div>

           {/* 对照品溶液 */}
           <div className={`p-4 rounded shadow-sm border ${readOnly ? 'border-gray-200' : 'bg-green-50 border-green-100'}`}>
              <p className="font-bold text-green-800 mb-2">➤ 对照品溶液 Reference Standard Solution</p>
              <div className={`p-3 border border-green-200 rounded leading-relaxed ${readOnly ? 'bg-white' : 'bg-white'}`}>
                <p className="mb-2">
                  取 {productId} 对照品约 
                  <SmartInput value={solDetail.stdWeight} onChange={(v) => setSolDetail(prev => ({...prev, stdWeight: v}))} width="w-24" readOnly={readOnly} /> 
                  mg，精密称定，置 
                  <SmartInput value={solDetail.stdVolume} onChange={(v) => setSolDetail(prev => ({...prev, stdVolume: v}))} width="w-24" readOnly={readOnly} /> 
                  ml 量瓶中，
                  <SmartTextarea value={solDetail.stdMethodZh} onChange={(v) => setSolDetail(prev => ({...prev, stdMethodZh: v}))} className="w-64" readOnly={readOnly} />
                  ，摇匀，平行配制 
                  <SmartInput value={solDetail.stdCount} onChange={(v) => setSolDetail(prev => ({...prev, stdCount: v}))} width="w-10" readOnly={readOnly} /> 
                  份。（{stdConc} mg/ml）
                </p>
                <p className="italic text-gray-600">
                  Accurately weigh about 
                  <SmartInput value={solDetail.stdWeight} onChange={(v) => setSolDetail(prev => ({...prev, stdWeight: v}))} width="w-24" className={readOnly ? "" : "text-black border-b border-black px-1 mx-1 bg-yellow-300 font-bold"} readOnly={readOnly} />
                  mg of {productId} reference standard into a 
                  <SmartInput value={solDetail.stdVolume} onChange={(v) => setSolDetail(prev => ({...prev, stdVolume: v}))} width="w-24" className={readOnly ? "" : "text-black border-b border-black px-1 mx-1 bg-yellow-300 font-bold"} readOnly={readOnly} />
                  ml volumetric flask, 
                  <SmartTextarea value={solDetail.stdMethodEn} onChange={(v) => setSolDetail(prev => ({...prev, stdMethodEn: v}))} className="w-64 italic" readOnly={readOnly} />
                  , mix well. Prepare 
                  <SmartInput value={solDetail.stdCount} onChange={(v) => setSolDetail(prev => ({...prev, stdCount: v}))} width="w-10" className={readOnly ? "" : "text-black border-b border-black px-1 mx-1 bg-yellow-300 font-bold"} readOnly={readOnly} />
                  solutions in parallel. ({stdConc} mg/ml)
                </p>
              </div>
           </div>

           {/* 供试品溶液 */}
           <div className={`p-4 rounded shadow-sm border ${readOnly ? 'border-gray-200' : 'bg-green-50 border-green-100'}`}>
              <p className="font-bold text-green-800 mb-2">➤ 供试品溶液 Sample Solution</p>
              <div className={`p-3 border border-green-200 rounded leading-relaxed ${readOnly ? 'bg-white' : 'bg-white'}`}>
                <p className="mb-2">
                  取供试品约 
                  <SmartInput value={solDetail.splWeight} onChange={(v) => setSolDetail(prev => ({...prev, splWeight: v}))} width="w-24" readOnly={readOnly} />
                  mg，精密称定，置 
                  <SmartInput value={solDetail.splVolume} onChange={(v) => setSolDetail(prev => ({...prev, splVolume: v}))} width="w-24" readOnly={readOnly} />
                  ml 量瓶中，
                  <SmartTextarea value={solDetail.splMethodZh} onChange={(v) => setSolDetail(prev => ({...prev, splMethodZh: v}))} className="w-64" readOnly={readOnly} />
                  ，摇匀，平行配制 
                  <SmartInput value={solDetail.splCount} onChange={(v) => setSolDetail(prev => ({...prev, splCount: v}))} width="w-10" readOnly={readOnly} />
                  份。（{splConc} mg/ml）
                </p>
                <p className="italic text-gray-600">
                  Accurately weigh about 
                  <SmartInput value={solDetail.splWeight} onChange={(v) => setSolDetail(prev => ({...prev, splWeight: v}))} width="w-24" className={readOnly ? "" : "text-black border-b border-black px-1 mx-1 bg-yellow-300 font-bold"} readOnly={readOnly} />
                  mg of Sample into a 
                  <SmartInput value={solDetail.splVolume} onChange={(v) => setSolDetail(prev => ({...prev, splVolume: v}))} width="w-24" className={readOnly ? "" : "text-black border-b border-black px-1 mx-1 bg-yellow-300 font-bold"} readOnly={readOnly} />
                  ml volumetric flask, 
                  <SmartTextarea value={solDetail.splMethodEn} onChange={(v) => setSolDetail(prev => ({...prev, splMethodEn: v}))} className="w-64 italic" readOnly={readOnly} />
                  , mix well. Prepare 
                  <SmartInput value={solDetail.splCount} onChange={(v) => setSolDetail(prev => ({...prev, splCount: v}))} width="w-10" className={readOnly ? "" : "text-black border-b border-black px-1 mx-1 bg-yellow-300 font-bold"} readOnly={readOnly} />
                  solutions in parallel. ({splConc} mg/ml)
                </p>
              </div>
              <p className={`p-2 font-bold mt-2 rounded ${readOnly ? 'bg-gray-100' : 'bg-green-200'}`}>
                注：对照品溶液、供试品的称样量及量瓶体积可根据实际情况放大或缩小，但需浓度保持不变。<br/>
                Note: The weight of RS and Sample solution and the volume of volumetric flask can be scaled up or down according to actual, keep concentration unchanged.
              </p>
           </div>
        </div>
      </div>

      {/* 4.4 Sequence */}
      <div>
         <h4 className={`font-bold mb-2 inline-block px-1 ${readOnly ? '' : 'bg-green-200'}`}>4.4 序列设置 Sequence</h4>
         <table className="w-full border-collapse border border-gray-300 text-center text-sm">
           <thead>
             <tr>
               <th className={`border border-gray-300 p-2 ${readOnly ? '' : 'bg-green-200'}`}>序号 No.</th>
               <th className={`border border-gray-300 p-2 ${readOnly ? '' : 'bg-green-200'}`}>溶液名称 Injected Solution</th>
               <th className={`border border-gray-300 p-2 ${readOnly ? '' : 'bg-green-200'}`}>进样针数 Number of injections</th>
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
                 <td className={`border border-gray-300 p-2 ${readOnly ? '' : 'bg-green-100'}`}>{row.id}</td>
                 <td className={`border border-gray-300 p-2 whitespace-pre-wrap ${readOnly ? '' : 'bg-green-100'}`}>{row.name}</td>
                 <td className={`border border-gray-300 p-0 relative ${readOnly ? '' : (row.isInput ? 'bg-orange-300' : 'bg-yellow-100')}`}>
                    {row.isInput ? (
                        readOnly ? (
                            <div className="p-2 font-bold">{sequenceState[row.field as keyof SequenceState]}</div>
                        ) : (
                          <>
                            <input 
                              type="text" 
                              value={sequenceState[row.field as keyof SequenceState]}
                              onChange={(e) => setSequenceState({...sequenceState, [row.field as keyof SequenceState]: e.target.value})}
                              className="w-full h-full text-center bg-transparent outline-none p-2"
                            />
                            {(!sequenceState[row.field as keyof SequenceState] || sequenceState[row.field as keyof SequenceState].trim() === "") && (
                               <span className="absolute inset-0 flex items-center justify-center text-red-500 pointer-events-none">请输入</span>
                            )}
                          </>
                        )
                    ) : (
                      <div className="p-2">{row.val}</div>
                    )}
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
      </div>

      {/* 4.5 System Suitability */}
      <div>
         <h4 className={`font-bold mb-2 inline-block px-1 ${readOnly ? '' : 'bg-green-200'}`}>4.5 系统适用性要求 System Suitability Requirements</h4>
         {renderSysSuitRequirementsContent()}
      </div>

      {/* 4.6 Integration */}
      <div>
         <h4 className={`font-bold mb-2 inline-block px-1 ${readOnly ? '' : 'bg-green-200'}`}>4.6 积分方式 Integration Method</h4>
         <div className={`${readOnly ? 'bg-transparent border-0' : 'bg-green-50 p-2 border border-green-200'}`}>
           <p>只积主峰。<br/>Only the main peaks are integrated</p>
         </div>
      </div>

      {/* 4.7 Calculation */}
      <div>
         <h4 className={`font-bold mb-2 inline-block px-1 ${readOnly ? '' : 'bg-green-200'}`}>4.7 计算 Calculation</h4>
         <div className={`${readOnly ? '' : 'bg-green-50 p-4 border border-green-200'} space-y-6 text-sm`}>
           <div>
             <p className="font-bold mb-2">（1）回收率计算 Percent Recovery Calculation</p>
             <div className={`overflow-x-auto p-3 border border-gray-300 rounded mb-3 ${readOnly ? 'bg-gray-50' : 'bg-white'}`}>
               <div className="flex items-center justify-center font-mono whitespace-nowrap">
                  <span className="mr-2">回收率 Percent Recovery (%) = </span>
                  <div className="flex flex-col items-center">
                    <div className="border-b border-black px-2 pb-1 mb-1">W<sub>STD1</sub> × A<sub>STD2</sub></div>
                    <div className="px-2">W<sub>STD2</sub> × A<sub>STD1</sub></div>
                  </div>
                  <span className="ml-2">× 100%</span>
               </div>
             </div>
             <div className="space-y-1 text-gray-700">
               <p className="font-semibold">式中 In formula：</p>
               <ul className="list-none space-y-2 pl-2">
                 <li><span className="font-bold">W<sub>STD1</sub>：</span>对照品溶液1中{displayId}对照品的称样量，mg；</li>
                 <li><span className="font-bold">W<sub>STD2</sub>：</span>对照品溶液2中{displayId}对照品的称样量，mg；</li>
                 <li><span className="font-bold">A<sub>STD1</sub>：</span>对照品溶液1中{displayId}连续进样5针的平均峰面积平均峰面积；</li>
                 <li><span className="font-bold">A<sub>STD2</sub>：</span>对照品溶液2中{displayId}的峰面积。</li>
               </ul>
             </div>
           </div>
           <div>
              <p className="font-bold mb-2">（2）含量计算 Assay Calculation</p>
              {renderAssayCalculationContent()}
           </div>
         </div>
      </div>

      {/* 4.8 Acceptance Criteria */}
      <div>
         <div className="flex justify-between items-center mb-2">
            <h4 className={`font-bold inline-block px-1 ${readOnly ? '' : 'bg-green-200'}`}>4.8 可接受标准 Acceptance criteria</h4>
            {!readOnly && (
                <button 
                  onClick={() => setAcceptanceCriteria([...acceptanceCriteria, { id: Date.now().toString(), name: "", criteria: "" }])}
                  className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700 transition-colors shadow-sm"
                >
                  <Plus size={14} /> 新增行 Add Row
                </button>
            )}
         </div>
         <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-100 text-center">
                <th className="border border-gray-300 p-2 w-1/3">名称 Name</th>
                <th className="border border-gray-300 p-2">接受标准 Acceptance criteria</th>
                {!readOnly && <th className="border border-gray-300 p-2 w-16">操作</th>}
              </tr>
            </thead>
            <tbody>
              {acceptanceCriteria.map((row, index) => (
                <tr key={row.id}>
                  <td className="border border-gray-300 p-1 bg-white align-top">
                    <SmartTextarea 
                      value={row.name}
                      onChange={(v) => {
                          const newRows = [...acceptanceCriteria];
                          newRows[index].name = v;
                          setAcceptanceCriteria(newRows);
                      }}
                      className="w-full min-h-[5rem]"
                      readOnly={readOnly}
                    />
                  </td>
                  <td className="border border-gray-300 p-1 bg-white align-top">
                    <SmartTextarea 
                      value={row.criteria}
                      onChange={(v) => {
                          const newRows = [...acceptanceCriteria];
                          newRows[index].criteria = v;
                          setAcceptanceCriteria(newRows);
                      }}
                      className="w-full min-h-[5rem]"
                      readOnly={readOnly}
                    />
                  </td>
                  {!readOnly && (
                      <td className="border border-gray-300 p-2 text-center align-middle">
                        <button 
                          onClick={() => setAcceptanceCriteria(acceptanceCriteria.filter((_, i) => i !== index))}
                          className="text-red-400 hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                  )}
                </tr>
              ))}
            </tbody>
         </table>
      </div>
    </div>
  );
};
