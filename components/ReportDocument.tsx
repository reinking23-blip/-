
import React, { useState } from 'react';
import { 
  Personnel, 
  ValidationOptions,
  TestingCondition,
  GradientRow,
  SolutionPrepsState,
  SolutionDetailState,
  SequenceState,
  SystemSuitabilityState,
  CalculationState,
  AcceptanceCriterion,
  EquipmentConfirmationRow,
  PrerequisiteState,
  ReportReagentValues,
  ReportSampleRSState,
  ExperimentalDataState,
  SpecificityState,
  PrecisionState,
  AccuracyState,
  StabilityState
} from '../types';
import { TestMethodSection } from './TestMethodSection';
import { LinearityChart } from './DocumentPage';

interface ReportDocumentProps {
  productId: string;
  protocolCode: string;
  protocolVersion: string;
  projectNumber: string;
  preparer: Personnel;
  setPreparer: (p: Personnel) => void;
  reviewers: Personnel[];
  setReviewers: (r: Personnel[]) => void;
  approver: Personnel;
  setApprover: (a: Personnel) => void;
  validationOptions: ValidationOptions;

  // Training Date State
  trainingDate: string;
  setTrainingDate: (date: string) => void;

  // Equipment Confirmation State
  reportEquipment: EquipmentConfirmationRow[];
  setReportEquipment: React.Dispatch<React.SetStateAction<EquipmentConfirmationRow[]>>;

  // Column Serial Numbers
  reportColumnSerials: Record<string, string>;
  setReportColumnSerials: React.Dispatch<React.SetStateAction<Record<string, string>>>;

  // Reagent Confirmation Values
  reportReagentValues: Record<string, ReportReagentValues>;
  setReportReagentValues: React.Dispatch<React.SetStateAction<Record<string, ReportReagentValues>>>;

  // Sample & RS Confirmation Values
  reportSampleRS: ReportSampleRSState;
  setReportSampleRS: React.Dispatch<React.SetStateAction<ReportSampleRSState>>;

  // Prerequisites for referencing columns
  prerequisiteState: PrerequisiteState;

  // New props for Method Description
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

  // Data from Experimental Data Document
  experimentalData: ExperimentalDataState;
  
  // Specificity State for Acceptance Criteria
  specificityState: SpecificityState;
  
  // Precision State
  precisionState: PrecisionState;

  // Accuracy State
  accuracyState: AccuracyState;

  // Stability State
  stabilityState: StabilityState;

  // Report History State
  reportHistoryDate: string;
  setReportHistoryDate: (date: string) => void;
}

export const ReportDocument: React.FC<ReportDocumentProps> = ({
  productId,
  protocolCode,
  protocolVersion,
  projectNumber,
  preparer,
  setPreparer,
  reviewers,
  setReviewers,
  approver,
  setApprover,
  validationOptions,
  
  trainingDate,
  setTrainingDate,

  reportEquipment,
  setReportEquipment,

  reportColumnSerials,
  setReportColumnSerials,
  reportReagentValues,
  setReportReagentValues,
  reportSampleRS,
  setReportSampleRS,
  prerequisiteState,

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
  setAcceptanceCriteria,

  experimentalData,
  specificityState,
  precisionState,
  accuracyState,
  stabilityState,

  reportHistoryDate,
  setReportHistoryDate
}) => {
  const displayId = productId || "N/A";
  const [attachmentRef, setAttachmentRef] = useState("1-2");
  const [specificityAttachmentRef, setSpecificityAttachmentRef] = useState("2-4");
  const [linearityAttachmentRef, setLinearityAttachmentRef] = useState("5.5.1");
  const [precisionAttachmentRef, setPrecisionAttachmentRef] = useState("5.6.1");
  const [accuracyAttachmentRef, setAccuracyAttachmentRef] = useState("5.7.1");
  const [stabilityAttachmentRef, setStabilityAttachmentRef] = useState("5.8.1");
  const [deviationSummary, setDeviationSummary] = useState("在验证过程中未发生偏差。\nNo deviation occurred during the validation.");
  
  // State for Pass/Fail statuses in Section 3 and referenced in Conclusion
  const [valStatus, setValStatus] = useState({
    systemSuitability: 'Pass',
    specificity: 'Pass',
    linearity: 'Pass',
    repeatability: 'Pass',
    accuracy: 'Pass',
    stability: 'Pass'
  });

  const handleStatusChange = (key: keyof typeof valStatus, value: string) => {
    setValStatus(prev => ({ ...prev, [key]: value }));
  };

  const renderEditableCell = (value: string, onChange: (val: string) => void) => {
    return (
      <td className="border border-gray-400 p-2 align-middle">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded text-center outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none font-medium p-1 text-sm"
          rows={value.split('\n').length > 1 ? value.split('\n').length : 2}
        />
      </td>
    );
  };

  const renderPersonnelTable = (personnelList: Personnel[], updateList: (index: number, field: keyof Personnel, val: string) => void) => (
    <table className="w-full border-collapse border border-gray-400 text-center text-sm">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-400 p-2 w-1/5">姓名<br/><span className="text-xs font-normal">Name</span></th>
          <th className="border border-gray-400 p-2 w-1/6">部门<br/><span className="text-xs font-normal">Department</span></th>
          <th className="border border-gray-400 p-2 w-1/4">职位<br/><span className="text-xs font-normal">Position</span></th>
          <th className="border border-gray-400 p-2 w-1/5">签名<br/><span className="text-xs font-normal">Signature</span></th>
          <th className="border border-gray-400 p-2">日期<br/><span className="text-xs font-normal">Date</span></th>
        </tr>
      </thead>
      <tbody>
        {personnelList.map((p, idx) => (
          <tr key={idx}>
            {renderEditableCell(p.name, (v) => updateList(idx, 'name', v))}
            {renderEditableCell(p.dept, (v) => updateList(idx, 'dept', v))}
            {renderEditableCell(p.pos, (v) => updateList(idx, 'pos', v))}
            <td className="border border-gray-400 p-2"></td>
            <td className="border border-gray-400 p-2"></td>
          </tr>
        ))}
      </tbody>
    </table>
  );

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
  const fullProtocolNumber = `AVP-${protocolCode}-${protocolVersion}.${projectNumber}`;

  // Helper for Status Select in Report
  const StatusSelect = ({ itemKey }: { itemKey: keyof typeof valStatus }) => (
    <div className="w-full h-full flex items-center justify-center p-2">
      <div className="relative w-full">
        <select 
          value={valStatus[itemKey]}
          onChange={(e) => handleStatusChange(itemKey, e.target.value)}
          className="block w-full appearance-none bg-white border border-gray-300 hover:border-gray-400 px-3 py-1.5 pr-8 rounded leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-bold text-center text-sm cursor-pointer shadow-sm transition-colors text-gray-800"
        >
          <option value="Pass">Pass</option>
          <option value="Fail">Fail</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
  );

  // Helper for Editable Input Inline (Clean Style) for Results tables
  const InlineInput = ({ value, onChange, width="w-full", className="" }: { value: string, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void, width?: string, className?: string }) => (
    <input 
      type="text" 
      value={value} 
      onChange={onChange}
      readOnly={!onChange}
      className={`bg-transparent border-none outline-none text-center font-medium ${width} ${className}`} 
    />
  );

  // Helper for Bordered Input (Form Style) for Confirmation sections
  const BorderedInput = ({ 
    value, 
    onChange, 
    type="text" 
  }: { 
    value: string, 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, 
    type?: string 
  }) => (
    <input 
      type={type}
      value={value} 
      onChange={onChange}
      className="w-full p-1 border border-gray-300 rounded text-center outline-none focus:border-blue-500 bg-white"
    />
  );

  const handleUpdateReportEquipment = (index: number, field: keyof EquipmentConfirmationRow, value: string) => {
    const newData = [...reportEquipment];
    newData[index] = { ...newData[index], [field]: value };
    setReportEquipment(newData);
  };

  const handleUpdateColumnSerial = (id: string, value: string) => {
    setReportColumnSerials(prev => ({ ...prev, [id]: value }));
  };

  const handleUpdateReagentValue = (id: string, field: keyof ReportReagentValues, value: string) => {
    setReportReagentValues(prev => ({
      ...prev,
      [id]: {
        ...prev[id] || { batch: '', supplier: '', expiryDate: '' },
        [field]: value
      }
    }));
  };

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 p-12">
        
        {/* Header Table */}
        <table id="report-cover" className="w-full border-collapse border border-gray-400 mb-10 text-sm scroll-mt-24">
            <tbody>
              <tr>
                <td className="border border-gray-400 p-3 bg-gray-50 font-bold w-32 align-middle">
                  题 目<br/><span className="text-xs font-normal">Title</span>
                </td>
                <td className="border border-gray-400 p-3 align-middle">
                  <div className="font-bold text-lg mb-1">{displayId}含量和鉴别检验方法验证报告</div>
                  <div className="text-gray-600">Report for Validation of {displayId} Assay and Identification Determination</div>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-3 bg-gray-50 font-bold align-middle">
                  报 告 号<br/><span className="text-xs font-normal">Document #</span>
                </td>
                <td className="border border-gray-400 p-3 font-mono font-bold text-lg align-middle">
                  AVR-{protocolCode}-{protocolVersion}.{projectNumber}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-3 bg-gray-50 font-bold align-middle">
                  适用范围<br/><span className="text-xs font-normal">Scope of Application</span>
                </td>
                <td className="border border-gray-400 p-3 align-middle">
                  <div className="font-semibold mb-1">{displayId}含量和鉴别测定</div>
                  <div className="text-gray-600">Assay and Identification Determination of {displayId}</div>
                </td>
              </tr>
            </tbody>
        </table>

        {/* Prepared By */}
        <div className="mb-8">
            <h3 className="font-bold mb-2 text-gray-800">报告起草：<br/><span className="text-xs font-normal text-gray-500">Prepared By:</span></h3>
            {renderPersonnelTable([preparer], (idx, field, val) => setPreparer({...preparer, [field]: val}))}
        </div>

        {/* Reviewed By */}
        <div className="mb-8">
            <h3 className="font-bold mb-2 text-gray-800">报告审核：<br/><span className="text-xs font-normal text-gray-500">Reviewed By:</span></h3>
            {renderPersonnelTable(reviewers, (idx, field, val) => {
              const newReviewers = [...reviewers];
              newReviewers[idx] = { ...newReviewers[idx], [field]: val };
              setReviewers(newReviewers);
            })}
        </div>

        {/* Approved By */}
        <div className="mb-8">
            <h3 className="font-bold mb-2 text-gray-800">报告批准：<br/><span className="text-xs font-normal text-gray-500">Approved By:</span></h3>
            {renderPersonnelTable([approver], (idx, field, val) => setApprover({...approver, [field]: val}))}
        </div>

        {/* 1. Objective */}
        <div id="report-objective" className="mb-8 pt-8 border-t-2 border-dashed border-gray-200 scroll-mt-24">
           <h3 className="font-bold text-xl mb-4 text-gray-800 border-b pb-2">1. 目的 Objective</h3>
           <div className="bg-green-100 p-4 border-l-4 border-green-500 text-sm space-y-4">
              <p>
                由于 {displayId} 含量和鉴别检验方法为自行开发的HPLC方法，根据 {displayId} 含量和鉴别检验方法验证方案（{fullProtocolNumber}）中的相关检验方法验证的规定，对该检验方法进行验证，包括<span className="font-bold text-green-800">{dynamicItems.zh}</span>。
              </p>
              <p>
                According to related analysis method guideline in the Protocol for Validation of {displayId} Assay and Identification Determination ({fullProtocolNumber}), Analysis method of {displayId} Assay and Identification Determination need to be validated completely because the method was self-developed HPLC method, the method was validated for <span className="font-bold text-green-800 italic">{dynamicItems.en}</span>.
              </p>
           </div>
        </div>

        {/* 2. Scope */}
        <div id="report-scope" className="mb-8 scroll-mt-24">
           <h3 className="font-bold text-xl mb-4 text-gray-800 border-b pb-2">2. 范围 Scope</h3>
           <div className="text-sm space-y-4 text-gray-700">
              <p>
                本报告适用于 {displayId} 含量和鉴别检验方法的验证。
              </p>
              <p>
                The validation report is applicable to the validation of {displayId} Assay and Identification Determination.
              </p>
           </div>
        </div>

        {/* 3. Results For Validation */}
        <div id="report-results" className="mb-8 scroll-mt-24">
           <h3 className="font-bold text-xl mb-4 text-gray-800 border-b pb-2">3. 验证结果综述 Results For Validation</h3>
           <table className="w-full border-collapse border border-gray-400 text-sm table-fixed">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 p-2 text-center w-[15%]">验证项目 Item</th>
                <th className="border border-gray-400 p-2 text-center w-[25%]">可接受标准 Acceptance criteria</th>
                <th className="border border-gray-400 p-2 text-center w-[50%]">验证结果 Results</th>
                <th className="border border-gray-400 p-2 text-center w-[10%]">Pass/Fail</th>
              </tr>
            </thead>
            <tbody>
              {/* System Suitability */}
              <tr>
                <td className="border border-gray-400 p-2 text-center align-middle font-bold" rowSpan={4}>
                  系统适用性<br/>System suitability
                </td>
                <td className="border border-gray-400 p-2 text-left align-middle whitespace-pre-wrap">
                  空白在主峰出峰处应无干扰；<br/>
                  The blank should have no interference at the main peak;
                </td>
                <td className="border border-gray-400 p-0 align-middle">
                  <div className="p-2 h-full flex flex-col justify-center">
                    <div className="font-bold whitespace-nowrap text-left">空白无干扰;</div>
                    <div className="text-left w-full"><InlineInput value="There was no interference in blank solution;" className="text-left w-full" /></div>
                  </div>
                </td>
                <td className="border border-gray-400 p-0 text-center align-middle" rowSpan={4}><StatusSelect itemKey="systemSuitability" /></td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 text-left align-middle whitespace-pre-wrap">
                  对照品溶液1第一针中，主峰理论板数应不低于 5000，拖尾因子应不大于 2.5；<br/>
                  The theoretical plate number of the principal peak in the first injection of STD1 should be not less than 5000, the trailing factor should not be more than 2.5;
                </td>
                <td className="border border-gray-400 p-0 align-middle">
                  <table className="w-full border-collapse h-full">
                    <tbody>
                      <tr className="border-b border-gray-400">
                        <td className="p-2 w-1/2 border-r border-gray-400 text-left align-middle">理论塔板数<br/>theoretical plates</td>
                        <td className="p-2 w-1/2 text-center align-middle"><InlineInput value="169997" /></td>
                      </tr>
                      <tr>
                        <td className="p-2 w-1/2 border-r border-gray-400 text-left align-middle">拖尾因子<br/>Trailing factor</td>
                        <td className="p-2 w-1/2 text-center align-middle"><InlineInput value="0.9" /></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 text-left align-middle whitespace-pre-wrap">
                  对照品溶液1连续进样 5 针主峰的峰面积 RSD 应≤2.0%，保留时间 RSD 应≤1.0%，对照品溶液 2 与对照品溶液 1 的回收率在 98.0%~102.0%之间；<br/>
                  For the standard solution 1, the RSD of the main peak area should be NMT 2.0%, the RSD of the retention time should be NMT 1.0%;<br/>
                  The percent recovery of reference solution 2 to reference solution 1 was between 98.0% -102.0%.
                </td>
                <td className="border border-gray-400 p-0 align-middle">
                  <table className="w-full border-collapse h-full">
                    <tbody>
                      <tr className="border-b border-gray-400">
                        <td className="p-2 w-1/2 border-r border-gray-400 text-left align-middle">峰面积 RSD<br/>RSD of the peak area</td>
                        <td className="p-2 w-1/2 text-center align-middle"><InlineInput value="0.06%" /></td>
                      </tr>
                      <tr className="border-b border-gray-400">
                        <td className="p-2 w-1/2 border-r border-gray-400 text-left align-middle">保留时间 RSD<br/>the RSD of the retention time</td>
                        <td className="p-2 w-1/2 text-center align-middle"><InlineInput value="0.04%" /></td>
                      </tr>
                      <tr>
                        <td className="p-2 w-1/2 border-r border-gray-400 text-left align-middle">回收率<br/>recovery</td>
                        <td className="p-2 w-1/2 text-center align-middle"><InlineInput value="99.5%" /></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 text-left align-middle whitespace-pre-wrap">
                  若有随行对照，取随行对照 1 针和对照品溶液 1 连续 5 针的主峰峰面积的 RSD 应≤2.0%。<br/>
                  If have contrast check solution. GRSD(Global %RSD)of the peak area of check solution and 5 consecutive standard solution 1 should be NMT2.0%.
                </td>
                <td className="border border-gray-400 p-0 align-middle">
                  <table className="w-full border-collapse h-full">
                    <tbody>
                      <tr>
                        <td className="p-2 w-1/2 border-r border-gray-400 text-left align-middle">峰面积 RSD<br/>RSD of the peak area</td>
                        <td className="p-2 w-1/2 text-center align-middle"><InlineInput value="0.07%~0.13%" /></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>

              {/* Specificity */}
              <tr>
                <td className="border border-gray-400 p-2 text-center align-middle font-bold" rowSpan={2}>
                  专属性<br/>Specificity
                </td>
                <td className="border border-gray-400 p-2 text-left align-middle whitespace-pre-wrap">
                  供试品溶液中主峰的保留时间应与对照品溶液中主峰的保留时间一致，保留时间相对偏差应不大于 5.0%；<br/>
                  The retention time of the main peak in the sample solution should be consistent with that of the standard solution, and the relative deviation of the retention time should be not more than 5.0%.
                </td>
                <td className="border border-gray-400 p-0 align-middle">
                  <table className="w-full border-collapse h-full">
                    <tbody>
                      <tr>
                        <td className="p-2 w-1/2 border-r border-gray-400 text-left align-middle">相对偏差<br/>Relative deviation</td>
                        <td className="p-2 w-1/2 text-center align-middle"><InlineInput value="0.02%" /></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td className="border border-gray-400 p-0 text-center align-middle" rowSpan={2}><StatusSelect itemKey="specificity" /></td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 text-left align-middle whitespace-pre-wrap">
                  供试品溶液中主峰的峰纯度因子应≥990或纯度角小于纯度阈值。<br/>
                  The Peak purity factor of major component should be NLT 990 in sample solution，or the purity angle is less than the purity threshold.
                </td>
                <td className="border border-gray-400 p-0 align-middle">
                  <table className="w-full border-collapse h-full">
                    <tbody>
                      <tr>
                        <td className="p-2 w-1/2 border-r border-gray-400 text-left align-middle">峰纯度因子<br/>Peak purity factor</td>
                        <td className="p-2 w-1/2 text-center align-middle"><InlineInput value="1000" /></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>

              {/* Linearity */}
              <tr>
                <td className="border border-gray-400 p-2 text-center align-middle font-bold">
                  线性及范围<br/>Linearity and Range
                </td>
                <td className="border border-gray-400 p-2 text-left align-middle whitespace-pre-wrap">
                  浓度与面积应成线性，X轴代表浓度，Y轴代表峰面积，线性相关系数r≥0.998，Y轴截距的绝对值与100%线性溶液峰面积的比≤2%。<br/>
                  报告主成分相关系数、相对截距、线性方程、残差平方和、浓度及相对供试品溶液浓度的比例。<br/>
                  The concentration and area should be linear, the X-axis represents the concentration, the Y-axis represents the peak area, the linear correlation coefficient r≥0.998, and the ratio of the absolute value of the Y-axis intercept to the peak area of 100% linear solution is less than 2%.<br/>
                  Report principal component correlation coefficient, relative intercept, linear equation, residual sum of squares, concentration, and ratio to concentration of sample solution.
                </td>
                <td className="border border-gray-400 p-0 align-middle">
                  <table className="w-full border-collapse h-full">
                    <tbody>
                      <tr className="border-b border-gray-400">
                        <td className="p-2 w-1/2 border-r border-gray-400 text-left align-middle">相关系数<br/>Correlation coefficient r</td>
                        <td className="p-2 w-1/2 text-center align-middle"><InlineInput value="1.000" /></td>
                      </tr>
                      <tr className="border-b border-gray-400">
                        <td className="p-2 w-1/2 border-r border-gray-400 text-left align-middle">Y轴截距的绝对值与标准为100%时的峰面积的比值<br/>Ratio of Y-intercept to 100% response value</td>
                        <td className="p-2 w-1/2 text-center align-middle"><InlineInput value="0.33%" /></td>
                      </tr>
                      <tr className="border-b border-gray-400">
                        <td className="p-2 w-1/2 border-r border-gray-400 text-left align-middle">线性方程<br/>Linear equation</td>
                        <td className="p-2 w-1/2 text-center align-middle"><InlineInput value="y=25.4869x-17.1752" /></td>
                      </tr>
                      <tr className="border-b border-gray-400">
                        <td className="p-2 w-1/2 border-r border-gray-400 text-left align-middle">残差平方和<br/>Residual sum of squares</td>
                        <td className="p-2 w-1/2 text-center align-middle"><InlineInput value="1430.2" /></td>
                      </tr>
                      <tr className="border-b border-gray-400">
                        <td className="p-2 w-1/2 border-r border-gray-400 text-left align-middle">浓度(μg/ml)<br/>Concentration(μg/ml)</td>
                        <td className="p-2 w-1/2 text-center align-middle"><InlineInput value="163.672~257.484" /></td>
                      </tr>
                      <tr>
                        <td className="p-2 w-1/2 border-r border-gray-400 text-left align-middle">相对供试品溶液的浓度水平(%)<br/>Equivalent to the sample solution(%)</td>
                        <td className="p-2 w-1/2 text-center align-middle"><InlineInput value="81.8~128.7" /></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td className="border border-gray-400 p-0 text-center align-middle"><StatusSelect itemKey="linearity" /></td>
              </tr>

              {/* Repeatability */}
              <tr>
                <td className="border border-gray-400 p-2 text-center align-middle font-bold">
                  精密度（重复性）<br/>Precision（repeatability）
                </td>
                <td className="border border-gray-400 p-2 text-left align-middle whitespace-pre-wrap">
                  平行配制 6 份精密度溶液，规定条件进行测定，6 份精密度溶液检测结果应符合以下要求。<br/>
                  Repeatability: Prepare 6 sample solutions in parallel, determine the conditions, 6 samples of solution, should meet the following requirements<br/>
                  <div className="mt-2 border-t border-gray-300 pt-1 flex justify-between text-xs">
                    <span className="font-bold">名称 Name: {displayId}</span>
                    <span className="font-bold">相对标准偏差 (RSD): NMT 2.0%</span>
                  </div>
                </td>
                <td className="border border-gray-400 p-0 align-middle">
                  <table className="w-full h-full border-collapse">
                    <tbody>
                      <tr>
                         <td className="p-2 w-1/2 border-r border-gray-400 text-center font-bold align-middle">RSD</td>
                         <td className="p-2 w-1/2 text-center align-middle"><InlineInput value="0.84%" /></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td className="border border-gray-400 p-0 text-center align-middle"><StatusSelect itemKey="repeatability" /></td>
              </tr>

              {/* Accuracy */}
              <tr>
                <td className="border border-gray-400 p-2 text-center align-middle font-bold">
                  准确度<br/>Accuracy
                </td>
                <td className="border border-gray-400 p-2 text-left align-middle whitespace-pre-wrap">
                  在专属性、线性和精密度满足的情况推论而得，主成分回收率均应在 98.0%-102.0%范围内，RSD≤2.0%。<br/>
                  If specificity, linearity and precision were satisfied, the recovery of principal components should be in the range of 98.0%-102.0%, RSD≤2.0%.
                </td>
                <td className="border border-gray-400 p-0 align-middle">
                  <table className="w-full h-full border-collapse">
                    <tbody>
                      <tr className="border-b border-gray-400">
                        <td className="p-2 w-1/2 border-r border-gray-400 text-center font-bold align-middle">回收率<br/>Recovery rate</td>
                        <td className="p-2 w-1/2 text-center align-middle"><InlineInput value="99.6%~101.7%" /></td>
                      </tr>
                      <tr>
                        <td className="p-2 w-1/2 border-r border-gray-400 text-center font-bold align-middle">RSD</td>
                        <td className="p-2 w-1/2 text-center align-middle"><InlineInput value="0.84%" /></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td className="border border-gray-400 p-0 text-center align-middle"><StatusSelect itemKey="accuracy" /></td>
              </tr>

              {/* Stability */}
              <tr>
                <td className="border border-gray-400 p-2 text-center align-middle font-bold" rowSpan={2}>
                  溶液稳定性<br/>Solution Stability
                </td>
                <td className="border border-gray-400 p-2 text-left align-middle whitespace-pre-wrap">
                  供试品溶液在 5±3℃条件下，密闭保存，分别于 0h、12h、24h、36h 进样，考察 {displayId} 的峰面积，与 0h 相比，{displayId} 峰面积的回收率应在 98.0%~102.0%之间。<br/>
                  Sample solution: Sealed and stored at 5±3℃ condition, the solution should be injected at the each point 0h、12h、24h、36h, the peak area of {displayId} should be evaluated. The recovery for peak area of {displayId} at each point should be 98.0%~102.0% compared with that of 0h.
                </td>
                <td className="border border-gray-400 p-0 align-middle">
                  <div className="w-full text-center p-2 font-bold border-b border-gray-400">供试品溶液 Sample solution</div>
                  <table className="w-full border-collapse border-b border-gray-400 text-xs">
                    <thead>
                      <tr className="border-b border-gray-400">
                        <th className="p-1 border-r border-gray-400 w-[25%]">时间<br/>Time(h)</th>
                        <th className="p-1 border-r border-gray-400 w-[25%] text-center">0</th>
                        <th className="p-1 border-r border-gray-400 w-[25%] text-center">6</th>
                        <th className="p-1 w-[25%] text-center">12</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-1 border-r border-gray-400 w-[25%] text-center">回收率 (%)<br/>recovery (%)</td>
                        <td className="p-1 border-r border-gray-400 w-[25%] text-center">-</td>
                        <td className="p-1 border-r border-gray-400 w-[25%] text-center"><InlineInput value="99.5" className="text-center w-full text-xs" /></td>
                        <td className="p-1 w-[25%] text-center"><InlineInput value="99.5" className="text-center w-full text-xs" /></td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="p-2 text-left text-xs">
                    供试品溶液在5±3℃条件下，密闭保存12h稳定。<br/>
                    The sample solution was stable when sealed and stored under the 5±3℃ condition for 12h.
                  </div>
                </td>
                <td className="border border-gray-400 p-0 text-center align-middle" rowSpan={2}><StatusSelect itemKey="stability" /></td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 text-left align-middle whitespace-pre-wrap">
                  对照品溶液在 5±3℃条件下，密闭保存，分别于 0h、12h、24h、36h 进样，考察 {displayId} 的峰面积，与 0h 相比，{displayId} 峰面积的回收率应在 98.0%~102.0%之间。<br/>
                  Standard solution: Sealed and stored at 5±3℃ temperature condition, the solution should be injected at the each point 0h、12h、24h、36h, the peak area of {displayId} should be evaluated, compared with that of 0h ,the recovery for peak area of {displayId} at each point should be 98.0%~102.0%.
                </td>
                <td className="border border-gray-400 p-0 align-middle">
                  <div className="w-full text-center p-2 font-bold border-b border-gray-400">对照品溶液 Standard solution</div>
                  <table className="w-full border-collapse border-b border-gray-400 text-xs">
                    <thead>
                      <tr className="border-b border-gray-400">
                        <th className="p-1 border-r border-gray-400 w-[20%]">时间<br/>Time(h)</th>
                        <th className="p-1 border-r border-gray-400 w-[20%] text-center">0</th>
                        <th className="p-1 border-r border-gray-400 w-[20%] text-center">4</th>
                        <th className="p-1 border-r border-gray-400 w-[20%] text-center">10</th>
                        <th className="p-1 w-[20%] text-center">16</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-1 border-r border-gray-400 w-[20%] text-center">回收率 (%)<br/>recovery (%)</td>
                        <td className="p-1 border-r border-gray-400 w-[20%] text-center">-</td>
                        <td className="p-1 border-r border-gray-400 w-[20%] text-center"><InlineInput value="100.2" className="text-center w-full text-xs" /></td>
                        <td className="p-1 border-r border-gray-400 w-[20%] text-center"><InlineInput value="99.8" className="text-center w-full text-xs" /></td>
                        <td className="p-1 w-[20%] text-center"><InlineInput value="100.1" className="text-center w-full text-xs" /></td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="p-2 text-left text-xs">
                    对照品溶液在5±3℃条件下，密闭保存16h稳定。<br/>
                    The standard solution was stable when sealed and stored under the 5±3℃ condition for 16h.
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 4. Test Method Description (Dynamic Read-Only Section) */}
        <div id="report-method" className="mb-8 pt-8 border-t-2 border-dashed border-gray-200 scroll-mt-24">
          <h3 className="font-bold text-xl mb-6 text-gray-800 border-b pb-2">4. 检验方法描述 Test Method Description</h3>
          <TestMethodSection
            readOnly={true}
            productId={productId}
            protocolCode={protocolCode}
            protocolVersion={protocolVersion}
            projectNumber={projectNumber}
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
          />
        </div>

        {/* 5. Validation Content (New Section) */}
        <div id="report-validation-content" className="mb-8 pt-8 border-t-2 border-dashed border-gray-200 scroll-mt-24">
          <h3 className="font-bold text-xl mb-4 text-gray-800 border-b pb-2">5. 验证内容 Validation content</h3>
          
          {/* 5.1 Training Confirmation */}
          <div id="report-val-training" className="mb-6 scroll-mt-24">
            <h4 className="font-bold text-lg text-gray-800 mb-2">5.1 培训确认 Training Confirmation</h4>
            <div className="text-sm text-gray-700 mb-4 space-y-1">
              <p>所有相关人员均已接受培训，培训记录完整。</p>
              <p>All persons have been trained, and the record is complete.</p>
            </div>

            <table className="w-full border-collapse border border-gray-400 text-sm text-center">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-400 p-2 w-[40%]">培训内容<br/><span className="text-xs font-normal">Training content</span></th>
                  <th className="border border-gray-400 p-2 w-[20%]">培训日期<br/><span className="text-xs font-normal">Date</span></th>
                  <th className="border border-gray-400 p-2 w-[20%]">原件存放位置<br/><span className="text-xs font-normal">File storage location</span></th>
                  <th className="border border-gray-400 p-2 w-[20%]">备注<br/><span className="text-xs font-normal">Note</span></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-400 p-2 text-left align-middle">
                    <div className="space-y-1">
                      <div>{displayId}含量和鉴别检验方法验证方案</div>
                      <div className="text-xs text-gray-500">Protocol for Validation of {displayId} Assay and Identification Determination</div>
                      <div className="font-mono text-xs mt-1">AVP-{protocolCode}-{protocolVersion}.{projectNumber}</div>
                    </div>
                  </td>
                  <td className="border border-gray-400 p-2 align-middle">
                     <BorderedInput 
                       type="date" 
                       value={trainingDate}
                       onChange={(e) => setTrainingDate(e.target.value)}
                     />
                  </td>
                  <td className="border border-gray-400 p-2 align-middle">QA</td>
                  <td className="border border-gray-400 p-2 align-middle">N/A</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 5.2 Equipment and Reagent Confirmation */}
          <div id="report-val-equipment" className="mb-6 scroll-mt-24">
            <h4 className="font-bold text-lg text-gray-800 mb-2">5.2 仪器和试剂确认 Equipment and Reagent confirmation</h4>
            
            <div className="mb-4">
              <h5 className="font-bold text-md text-gray-800 mb-2 ml-2">5.2.1 仪器确认 Equipment confirmation</h5>
              <table className="w-full border-collapse border border-gray-400 text-sm text-center">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-400 p-2">仪器名称<br/><span className="text-xs font-normal">Equipment name</span></th>
                    <th className="border border-gray-400 p-2">厂家<br/><span className="text-xs font-normal">Supplier</span></th>
                    <th className="border border-gray-400 p-2">设备位号<br/><span className="text-xs font-normal">Equipment number</span></th>
                    <th className="border border-gray-400 p-2">型号<br/><span className="text-xs font-normal">Model</span></th>
                    <th className="border border-gray-400 p-2">有效期<br/><span className="text-xs font-normal">Retest Date</span></th>
                  </tr>
                </thead>
                <tbody>
                  {reportEquipment.map((row, index) => (
                    <tr key={row.id}>
                      <td className="border border-gray-400 p-2 whitespace-pre-wrap">{row.name}</td>
                      <td className="border border-gray-400 p-2">
                        <BorderedInput value={row.supplier} onChange={(e) => handleUpdateReportEquipment(index, 'supplier', e.target.value)} />
                      </td>
                      <td className="border border-gray-400 p-2">
                        <BorderedInput value={row.equipmentNumber} onChange={(e) => handleUpdateReportEquipment(index, 'equipmentNumber', e.target.value)} />
                      </td>
                      <td className="border border-gray-400 p-2">
                        <BorderedInput value={row.model} onChange={(e) => handleUpdateReportEquipment(index, 'model', e.target.value)} />
                      </td>
                      <td className="border border-gray-400 p-2">
                        <BorderedInput 
                          type="date" 
                          value={row.retestDate}
                          onChange={(e) => handleUpdateReportEquipment(index, 'retestDate', e.target.value)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mb-4">
              <h5 className="font-bold text-md text-gray-800 mb-2 ml-2">5.2.2 色谱柱确认 Column confirmation</h5>
              <table className="w-full border-collapse border border-gray-400 text-sm text-center">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-400 p-2 w-5/12">型号<br/><span className="text-xs font-normal">Model</span></th>
                    <th className="border border-gray-400 p-2 w-3/12">厂家<br/><span className="text-xs font-normal">Supplier</span></th>
                    <th className="border border-gray-400 p-2 w-4/12">编号<br/><span className="text-xs font-normal">Serial number</span></th>
                  </tr>
                </thead>
                <tbody>
                  {testingConditions
                    .filter(tc => tc.id === 'column' || tc.id === 'ghostBuster' || tc.id.startsWith('column_'))
                    .map(col => (
                      <tr key={col.id}>
                        <td className="border border-gray-400 p-2 text-left">{col.value}</td>
                        <td className="border border-gray-400 p-2 text-center">{prerequisiteState.columnSuppliers[col.id] || ''}</td>
                        <td className="border border-gray-400 p-2">
                          <BorderedInput 
                            value={reportColumnSerials[col.id] || ''} 
                            onChange={(e) => handleUpdateColumnSerial(col.id, e.target.value)} 
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="mb-4">
              <h5 className="font-bold text-md text-gray-800 mb-2 ml-2">5.2.3 试剂确认 Reagent confirmation</h5>
              <table className="w-full border-collapse border border-gray-400 text-sm text-center">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-400 p-2 w-[25%]">试剂名称<br/><span className="text-xs font-normal">Reagent name</span></th>
                    <th className="border border-gray-400 p-2 w-[15%]">批号<br/><span className="text-xs font-normal">Batch</span></th>
                    <th className="border border-gray-400 p-2 w-[20%]">厂家<br/><span className="text-xs font-normal">Supplier</span></th>
                    <th className="border border-gray-400 p-2 w-[15%]">级别<br/><span className="text-xs font-normal">Grade</span></th>
                    <th className="border border-gray-400 p-2 w-[25%]">有效期至<br/><span className="text-xs font-normal">Expiration Date</span></th>
                  </tr>
                </thead>
                <tbody>
                  {prerequisiteState.reagentRows.map((row) => (
                    <tr key={row.id}>
                      <td className="border border-gray-400 p-2 whitespace-pre-wrap align-middle">{row.name}</td>
                      <td className="border border-gray-400 p-2 align-middle">
                        <BorderedInput 
                          value={reportReagentValues[row.id]?.batch || ''} 
                          onChange={(e) => handleUpdateReagentValue(row.id, 'batch', e.target.value)} 
                        />
                      </td>
                      <td className="border border-gray-400 p-2 align-middle">
                        <BorderedInput 
                          value={reportReagentValues[row.id]?.supplier || ''} 
                          onChange={(e) => handleUpdateReagentValue(row.id, 'supplier', e.target.value)} 
                        />
                      </td>
                      <td className="border border-gray-400 p-2 align-middle">{row.grade}</td>
                      <td className="border border-gray-400 p-2 align-middle">
                        <BorderedInput 
                          type="date"
                          value={reportReagentValues[row.id]?.expiryDate || ''} 
                          onChange={(e) => handleUpdateReagentValue(row.id, 'expiryDate', e.target.value)} 
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mb-4">
              <h5 className="font-bold text-md text-gray-800 mb-2 ml-2">5.2.4 供试品及对照品确认 Sample and RS confirmation</h5>
              <table className="w-full border-collapse border border-gray-400 text-sm text-center">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-400 p-2 w-[25%]">名称<br/><span className="text-xs font-normal">Name</span></th>
                    <th className="border border-gray-400 p-2 w-[20%]">批号<br/><span className="text-xs font-normal">Batch</span></th>
                    <th className="border border-gray-400 p-2 w-[20%]">复验期<br/><span className="text-xs font-normal">Retest Date</span></th>
                    <th className="border border-gray-400 p-2 w-[15%]">含量<br/><span className="text-xs font-normal">Assay(%)</span></th>
                    <th className="border border-gray-400 p-2 w-[20%]">来源<br/><span className="text-xs font-normal">Source</span></th>
                  </tr>
                </thead>
                <tbody>
                  {/* RS Row */}
                  <tr>
                    <td className="border border-gray-400 p-2 whitespace-pre-wrap align-middle">
                      {displayId}对照品<br/>{displayId} RS
                    </td>
                    <td className="border border-gray-400 p-2 align-middle">
                      <BorderedInput 
                        value={reportSampleRS.rs.batch} 
                        onChange={(e) => setReportSampleRS({...reportSampleRS, rs: {...reportSampleRS.rs, batch: e.target.value}})} 
                      />
                    </td>
                    <td className="border border-gray-400 p-2 align-middle">
                      <BorderedInput 
                        type="date"
                        value={reportSampleRS.rs.retestDate} 
                        onChange={(e) => setReportSampleRS({...reportSampleRS, rs: {...reportSampleRS.rs, retestDate: e.target.value}})} 
                      />
                    </td>
                    <td className="border border-gray-400 p-2 align-middle">
                      <BorderedInput 
                        value={reportSampleRS.rs.assay} 
                        onChange={(e) => setReportSampleRS({...reportSampleRS, rs: {...reportSampleRS.rs, assay: e.target.value}})} 
                      />
                    </td>
                    <td className="border border-gray-400 p-2 align-middle">
                      <textarea
                        value={reportSampleRS.rs.source}
                        onChange={(e) => setReportSampleRS({...reportSampleRS, rs: {...reportSampleRS.rs, source: e.target.value}})}
                        className="w-full bg-white border border-gray-300 rounded text-center outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none p-1 text-sm"
                        rows={2}
                      />
                    </td>
                  </tr>
                  {/* Sample Row */}
                  <tr>
                    <td className="border border-gray-400 p-2 whitespace-pre-wrap align-middle">
                      {displayId}供试品<br/>{displayId} Sample
                    </td>
                    <td className="border border-gray-400 p-2 align-middle">
                      <BorderedInput 
                        value={reportSampleRS.sample.batch} 
                        onChange={(e) => setReportSampleRS({...reportSampleRS, sample: {...reportSampleRS.sample, batch: e.target.value}})} 
                      />
                    </td>
                    <td className="border border-gray-400 p-2 align-middle">
                      <BorderedInput 
                        type="date"
                        value={reportSampleRS.sample.retestDate} 
                        onChange={(e) => setReportSampleRS({...reportSampleRS, sample: {...reportSampleRS.sample, retestDate: e.target.value}})} 
                      />
                    </td>
                    <td className="border border-gray-400 p-2 align-middle">
                      <BorderedInput 
                        value={reportSampleRS.sample.assay} 
                        onChange={(e) => setReportSampleRS({...reportSampleRS, sample: {...reportSampleRS.sample, assay: e.target.value}})} 
                      />
                    </td>
                    <td className="border border-gray-400 p-2 align-middle">
                      <textarea
                        value={reportSampleRS.sample.source}
                        onChange={(e) => setReportSampleRS({...reportSampleRS, sample: {...reportSampleRS.sample, source: e.target.value}})}
                        className="w-full bg-white border border-gray-300 rounded text-center outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none p-1 text-sm"
                        rows={2}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 5.3 System Suitability */}
          <div id="report-val-sys-suit" className="mb-6 scroll-mt-24">
            <h4 className="font-bold text-lg text-gray-800 mb-2">5.3 系统适用性 System suitability</h4>
            <div className="mb-4 text-sm space-y-2 pl-2">
               <p>
                 记录：{displayId} 含量和鉴别检验方法验证记录；<br/>
                 Record：{displayId} Assay and Identification Method Validation Record;
               </p>
               <p>
                 结果谱图：CRM-AVP-{protocolCode}-{protocolVersion}.{projectNumber}；<br/>
                 Liquid chromatogram: CRM-AVP-{protocolCode}-{protocolVersion}.{projectNumber};
               </p>
               <p>
                 典型附图见 <input 
                    type="text" 
                    value={attachmentRef} 
                    onChange={(e) => setAttachmentRef(e.target.value)} 
                    className="border border-gray-300 rounded outline-none w-24 text-center mx-1 bg-white focus:border-blue-500 p-1 text-sm"
                 />。<br/>
                 Typical chromatogram : attachment <span>{attachmentRef}</span>.
               </p>
            </div>
            
            <div className="text-center font-bold text-sm mb-2">
              表 1 系统适用性结果<br/>Table 1 System Suitability Results
            </div>

            <table className="w-full border-collapse border border-gray-400 text-sm text-center">
               <tbody>
                  {/* Row 1: Blank */}
                  <tr>
                    <td className="border border-gray-400 p-2 font-bold whitespace-pre-wrap w-[15%]">
                      空白溶液：{"\n"}Blank
                    </td>
                    <td className="border border-gray-400 p-2 text-center" colSpan={6}>
                      {experimentalData.systemSuitability.blankInterference}
                    </td>
                  </tr>

                  {/* STD1 Block */}
                  {(() => {
                    const std1Rows = experimentalData.systemSuitability.std1Injections.length;
                    const std1TotalRows = 4 + std1Rows; // 2 info + 2 header + data rows
                    
                    return (
                      <>
                        {/* Row 2: Theoretical Plates */}
                        <tr>
                          <td className="border border-gray-400 p-2 font-bold whitespace-pre-wrap" rowSpan={std1TotalRows}>
                            对照品溶液 1{"\n"}Standard solution 1
                          </td>
                          <td className="border border-gray-400 p-2 text-center" colSpan={6}>
                            <span className="font-bold">理论塔板数 Theoretical plates:</span> {experimentalData.systemSuitability.theoreticalPlates}
                          </td>
                        </tr>
                        {/* Row 3: Tailing Factor */}
                        <tr>
                          <td className="border border-gray-400 p-2 text-center" colSpan={6}>
                            <span className="font-bold">拖尾因子 Tailing factor:</span> {experimentalData.systemSuitability.tailingFactor}
                          </td>
                        </tr>
                        {/* Row 4: Data Header 1 */}
                        <tr className="bg-gray-100 font-bold">
                          <td className="border border-gray-400 p-2" rowSpan={2}>
                            溶液名称{"\n"}Solution name
                          </td>
                          <td className="border border-gray-400 p-2" rowSpan={2}>
                            Amount{"\n"}(mg)
                          </td>
                          <td className="border border-gray-400 p-2" colSpan={2}>
                            峰面积 Peak area
                          </td>
                          <td className="border border-gray-400 p-2" colSpan={2}>
                            保留时间 Retention Time
                          </td>
                        </tr>
                        {/* Row 5: Data Header 2 */}
                        <tr className="bg-gray-100 font-bold">
                          <td className="border border-gray-400 p-2">Peak area{"\n"}(mAU*s)</td>
                          <td className="border border-gray-400 p-2">RSD{"\n"}(%)</td>
                          <td className="border border-gray-400 p-2">Retention Time{"\n"}(min)</td>
                          <td className="border border-gray-400 p-2">RSD{"\n"}(%)</td>
                        </tr>
                        {/* Rows 6+: Data */}
                        {experimentalData.systemSuitability.std1Injections.map((inj, idx) => (
                          <tr key={idx}>
                            <td className="border border-gray-400 p-2">STD1-{idx + 1}</td>
                            {idx === 0 && (
                              <td className="border border-gray-400 p-2 align-middle" rowSpan={std1Rows}>
                                {experimentalData.systemSuitability.std1Weight}
                              </td>
                            )}
                            <td className="border border-gray-400 p-2">{inj.peakArea}</td>
                            {idx === 0 && (
                              <td className="border border-gray-400 p-2 align-middle" rowSpan={std1Rows}>
                                {experimentalData.systemSuitability.std1AreaRSD}
                              </td>
                            )}
                            <td className="border border-gray-400 p-2">{inj.rt}</td>
                            {idx === 0 && (
                              <td className="border border-gray-400 p-2 align-middle" rowSpan={std1Rows}>
                                {experimentalData.systemSuitability.std1RtRSD}
                              </td>
                            )}
                          </tr>
                        ))}
                      </>
                    );
                  })()}

                  {/* STD2 Block */}
                  {/* Row Header */}
                  <tr>
                      <td className="border border-gray-400 p-2 font-bold whitespace-pre-wrap" rowSpan={2}>
                          对照品溶液 2{"\n"}Standard solution 2
                      </td>
                      <td className="border border-gray-400 p-2 font-bold bg-gray-100">
                          溶液名称{"\n"}Solution name
                      </td>
                      <td className="border border-gray-400 p-2 font-bold bg-gray-100">
                          Amount{"\n"}(mg)
                      </td>
                      <td className="border border-gray-400 p-2 font-bold bg-gray-100" colSpan={2}>
                          Peak area (mAU*s)
                      </td>
                      <td className="border border-gray-400 p-2 font-bold bg-gray-100" colSpan={2}>
                          回收率 (%){"\n"}Recovery (%)
                      </td>
                  </tr>
                  {/* Row Data */}
                  <tr>
                      <td className="border border-gray-400 p-2">STD2</td>
                      <td className="border border-gray-400 p-2">{experimentalData.systemSuitability.std2Weight}</td>
                      <td className="border border-gray-400 p-2" colSpan={2}>{experimentalData.systemSuitability.std2PeakArea}</td>
                      <td className="border border-gray-400 p-2" colSpan={2}>{experimentalData.systemSuitability.std2Recovery}</td>
                  </tr>

                  {/* Control Block */}
                  {(() => {
                      const controlRows = experimentalData.systemSuitability.controls.length;
                      return (
                          <>
                              {/* Header */}
                              <tr>
                                  <td className="border border-gray-400 p-2 font-bold whitespace-pre-wrap" rowSpan={controlRows + 1}>
                                      随行对照{"\n"}Contrast check solution
                                  </td>
                                  <td className="border border-gray-400 p-2 font-bold bg-gray-100">
                                      溶液名称{"\n"}Solution name
                                  </td>
                                  <td className="border border-gray-400 p-2 font-bold bg-gray-100" colSpan={3}>
                                      峰面积 (mAU*s){"\n"}Peak area (mAU*s)
                                  </td>
                                  <td className="border border-gray-400 p-2 font-bold bg-gray-100" colSpan={2}>
                                      RSD (%)
                                  </td>
                              </tr>
                              {/* Data */}
                              {experimentalData.systemSuitability.controls.map((ctrl, idx) => (
                                  <tr key={idx}>
                                      <td className="border border-gray-400 p-2">{ctrl.name}</td>
                                      <td className="border border-gray-400 p-2" colSpan={3}>{ctrl.peakArea}</td>
                                      <td className="border border-gray-400 p-2" colSpan={2}>{ctrl.rsd}</td>
                                  </tr>
                              ))}
                          </>
                      )
                  })()}

                  {/* Acceptance Criteria */}
                  <tr>
                      <td className="border border-gray-400 p-2 font-bold whitespace-pre-wrap">
                          可接受标准{"\n"}Acceptance criteria
                      </td>
                      <td className="border border-gray-400 p-2 text-left text-xs leading-relaxed" colSpan={6}>
                        <p>1) 空白在主峰出峰处应无干扰；The blank should have no interference at the main peak;</p>
                        <p>2) 对照品溶液1第一针中，主峰理论板数应不低于 {sysSuitability.plateNumber}，拖尾因子应不大于 {sysSuitability.tailingFactor}；The theoretical plate number of the principal peak in the first injection of STD1 should be not less than {sysSuitability.plateNumber}, the trailing factor should not be more than {sysSuitability.tailingFactor};</p>
                        <p>3) 对照品溶液1连续进样 {sysSuitability.injectionCount} 针，主峰峰面积的RSD应≤ {sysSuitability.areaRSD}%，保留时间的RSD应≤ {sysSuitability.retentionRSD}%；For {sysSuitability.injectionCount} consecutive standard solution1, the RSD of the main peak area should be NMT {sysSuitability.areaRSD}%, the RSD of the retention time should be NMT {sysSuitability.retentionRSD}%;</p>
                        <p>4) 对照品溶液2与对照品溶液1的回收率在 {sysSuitability.recoveryRange} 之间；The recovery of reference solution 2 to reference solution 1 was between {sysSuitability.recoveryRange};</p>
                        <p>5) 若有随行对照，取随行对照1针和对照品溶液1连续 {sysSuitability.controlInjectionCount} 针的主峰峰面积的RSD应≤ {sysSuitability.controlAreaRSD}%。If have contrast check solution. GRSD(Global %RSD)of the peak area of check solution and {sysSuitability.controlInjectionCount} consecutive standard solution 1 should be NMT {sysSuitability.controlAreaRSD}%.</p>
                      </td>
                  </tr>

                  {/* Conclusion */}
                  <tr>
                      <td className="border border-gray-400 p-2 font-bold whitespace-pre-wrap">
                          结论{"\n"}Conclusion
                      </td>
                      <td className="border border-gray-400 p-2 font-bold text-center" colSpan={6}>
                         {valStatus.systemSuitability}
                      </td>
                  </tr>

               </tbody>
            </table>
          </div>

          {/* 5.4 Specificity */}
          <div id="report-val-specificity" className="mb-6 scroll-mt-24">
            <h4 className="font-bold text-lg text-gray-800 mb-2">5.4 专属性 Specificity</h4>
            
            <div className="mb-4 text-sm pl-2">
               {/* Chinese Block */}
               <div className="space-y-1 mb-4">
                 <p>记录：{displayId} 含量和鉴别检验方法验证记录；</p>
                 <p>结果谱图：CRM-AVP-{protocolCode}-{protocolVersion}.{projectNumber}；</p>
                 <p>
                   典型附图见 
                   <input 
                      type="text" 
                      value={specificityAttachmentRef} 
                      onChange={(e) => setSpecificityAttachmentRef(e.target.value)} 
                      className="border border-gray-300 rounded outline-none w-24 text-center mx-1 bg-white focus:border-blue-500 p-1 text-sm"
                   />
                   。
                 </p>
               </div>
               
               {/* English Block */}
               <div className="space-y-1">
                 <p>Record：{displayId} Assay and Identification Method Validation Record;</p>
                 <p>Liquid chromatogram: CRM-AVP-{protocolCode}-{protocolVersion}.{projectNumber};</p>
                 <p>Typical chromatogram : attachment <span>{specificityAttachmentRef}</span>.</p>
               </div>
            </div>

            <div className="text-center font-bold text-sm mb-2">
              表 2 专属性结果<br/>Table 2 Specificity Results
            </div>
            <table className="w-full border-collapse border border-gray-400 text-sm text-center">
              <thead>
                 <tr className="bg-gray-100">
                    <th className="border border-gray-400 p-2 font-bold w-[20%]">项目 Item</th>
                    <th className="border border-gray-400 p-2 font-bold" colSpan={2}>结果 Results</th>
                 </tr>
              </thead>
              <tbody>
                 {/* Standard Solution */}
                 <tr>
                    <td className="border border-gray-400 p-2 align-middle">对照品溶液<br/>Standard solution</td>
                    <td className="border border-gray-400 p-2 align-middle text-left w-[50%]">{displayId}保留时间（min）<br/>{displayId} Retention Time（min）</td>
                    <td className="border border-gray-400 p-2 align-middle w-[30%]">{experimentalData.specificity.stdRt}</td>
                 </tr>
                 {/* Sample Solution Group */}
                 <tr>
                    <td className="border border-gray-400 p-2 align-middle" rowSpan={3}>供试品溶液<br/>Sample solution</td>
                    <td className="border border-gray-400 p-2 align-middle text-left">{displayId}保留时间（min）<br/>{displayId} Retention Time（min）</td>
                    <td className="border border-gray-400 p-2 align-middle">{experimentalData.specificity.sampleRt}</td>
                 </tr>
                 <tr>
                    <td className="border border-gray-400 p-2 align-middle text-left">{displayId}保留时间相对偏差<br/>The Relative Deviation for {displayId} peak Retention time（%）</td>
                    <td className="border border-gray-400 p-2 align-middle">{experimentalData.specificity.rtDeviation}</td>
                 </tr>
                 <tr>
                    <td className="border border-gray-400 p-2 align-middle text-left">主峰峰纯度因子<br/>Peak purity factor of Major component</td>
                    <td className="border border-gray-400 p-2 align-middle">{experimentalData.specificity.peakPurity}</td>
                 </tr>
                 {/* Acceptance Criteria */}
                 <tr>
                    <td className="border border-gray-400 p-2 font-bold bg-gray-50 text-left align-top">可接受标准<br/>Acceptance criteria</td>
                    <td className="border border-gray-400 p-2 text-left text-xs leading-relaxed" colSpan={2}>
                       <p>1) 供试品溶液中主峰的保留时间应与对照品溶液中主峰的保留时间一致，保留时间相对偏差应不大于 {specificityState.retentionDevLimit}%；The retention time of the main peak in the sample solution should be consistent with that of the standard solution, and the relative deviation of the retention time should be not more than {specificityState.retentionDevLimit}%.</p>
                       <p>2) 供试品溶液中主峰的峰纯度因子应≥990或纯度角小于纯度阈值。The Peak purity factor of major component should be NLT 990 in sample solution，or the purity angle is less than the purity threshold.</p>
                    </td>
                 </tr>
                 {/* Conclusion */}
                 <tr>
                    <td className="border border-gray-400 p-2 font-bold bg-gray-50 text-left">结论<br/>Conclusion</td>
                    <td className="border border-gray-400 p-2 font-bold text-center" colSpan={2}>
                       {valStatus.specificity}
                    </td>
                 </tr>
              </tbody>
            </table>
          </div>

          {/* 5.5 Linearity and Range (New Section) */}
          <div id="report-val-linearity" className="mb-6 scroll-mt-24">
            <h4 className="font-bold text-lg text-gray-800 mb-2">5.5 线性和范围 Linearity and Range</h4>
            <div className="mb-4 text-sm pl-2">
               {/* Chinese Block */}
               <div className="space-y-1 mb-4">
                 <p>记录：{displayId} 含量和鉴别检验方法验证记录；</p>
                 <p>结果谱图：CRM-AVP-{protocolCode}-{protocolVersion}.{projectNumber}；</p>
                 <p>
                   典型附图见 
                   <input 
                      type="text" 
                      value={linearityAttachmentRef} 
                      onChange={(e) => setLinearityAttachmentRef(e.target.value)} 
                      className="border border-gray-300 rounded outline-none w-24 text-center mx-1 bg-white focus:border-blue-500 p-1 text-sm"
                   />
                   。
                 </p>
               </div>
               
               {/* English Block */}
               <div className="space-y-1">
                 <p>Record：{displayId} Assay and Identification Method Validation Record;</p>
                 <p>Liquid chromatogram: CRM-AVP-{protocolCode}-{protocolVersion}.{projectNumber};</p>
                 <p>Typical chromatogram : attachment <span>{linearityAttachmentRef}</span>.</p>
               </div>
            </div>

            <div className="text-center font-bold text-sm mb-2">
              表 3 线性结果<br/>Table 3 Linearity Results
            </div>
            
            <table className="w-full border-collapse border border-gray-400 text-sm text-center">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-400 p-2 font-bold w-[20%]">溶液名称<br/><span className="text-xs font-normal">Solution Name</span></th>
                  <th className="border border-gray-400 p-2 font-bold w-[25%]">浓度（μg/ml）<br/><span className="text-xs font-normal">Concentration（μg/ml）</span></th>
                  <th className="border border-gray-400 p-2 font-bold w-[25%]">峰面积（mAU*s）<br/><span className="text-xs font-normal">Peak Area（mAU*s）</span></th>
                  <th className="border border-gray-400 p-2 font-bold w-[30%]">实际相当于供试品溶液的浓度水平（%）<br/><span className="text-xs font-normal">Concentration level equivalent to the test solution in practice（%）</span></th>
                </tr>
              </thead>
              <tbody>
                {experimentalData.linearity.rows.map((row) => (
                  <tr key={row.id}>
                    <td className="border border-gray-400 p-2 align-middle">{row.id}</td>
                    <td className="border border-gray-400 p-2 align-middle">{row.conc}</td>
                    <td className="border border-gray-400 p-2 align-middle">{row.area}</td>
                    <td className="border border-gray-400 p-2 align-middle">{row.actualLevel}</td>
                  </tr>
                ))}
                {/* Stats */}
                <tr>
                   <td className="border border-gray-400 p-2 text-left" colSpan={2}>
                      线性方程: {experimentalData.linearity.equation}<br/>
                      Linearity Equation: {experimentalData.linearity.equation}
                   </td>
                   <td className="border border-gray-400 p-2 text-left" colSpan={2}>
                      相关系数r ：{experimentalData.linearity.statsR}<br/>
                      Correlation coefficient r: {experimentalData.linearity.statsR}
                   </td>
                </tr>
                <tr>
                   <td className="border border-gray-400 p-2 text-left" colSpan={2}>
                      Y轴截距的绝对值: {Math.abs(parseFloat(experimentalData.linearity.statsIntercept || "0")).toFixed(4)}<br/>
                      |Intercept on Y Axis|: {Math.abs(parseFloat(experimentalData.linearity.statsIntercept || "0")).toFixed(4)}
                   </td>
                   <td className="border border-gray-400 p-2 text-left" colSpan={2}>
                      残差平方和：{experimentalData.linearity.statsRSS}<br/>
                      residual sum of squares: {experimentalData.linearity.statsRSS}
                   </td>
                </tr>
                <tr>
                   <td className="border border-gray-400 p-2 text-left" colSpan={4}>
                      Y轴截距的绝对值与标准为100%时的峰面积的比值：{experimentalData.linearity.statsPercentIntercept}<br/>
                      Ratio of Y-intercept to 100% response value: {experimentalData.linearity.statsPercentIntercept}
                   </td>
                </tr>
                {/* Inserted Chart Row */}
                <tr>
                  <td className="border border-gray-400 p-0" colSpan={4}>
                    <div className="p-4 bg-white">
                      <LinearityChart 
                        rows={experimentalData.linearity.rows}
                        equation={experimentalData.linearity.equation}
                        statsR={experimentalData.linearity.statsR}
                        productId={productId}
                      />
                    </div>
                  </td>
                </tr>
                {/* Acceptance Criteria */}
                <tr>
                    <td className="border border-gray-400 p-2 font-bold bg-gray-50 text-left align-top">可接受标准<br/>Acceptance criteria</td>
                    <td className="border border-gray-400 p-2 text-left text-xs leading-relaxed" colSpan={3}>
                       <p>浓度与面积应成线性，X轴代表浓度，Y轴代表峰面积，线性相关系数r≥ 0.998，Y轴截距的绝对值与100%线性溶液峰面积的比≤ 2%；{"\n"}
                       报告主成分相关系数、相对截距、线性方程、残差平方和、浓度及相对供试品溶液浓度的比例。</p>
                       <p>The concentration and area should be linear, the X-axis represents the concentration, the Y-axis represents the peak area, the linear correlation coefficient r≥0.998, and the ratio of the absolute value of the Y-axis intercept to the peak area of 100% linear solution is less than 2%. Report principal component correlation coefficient, relative intercept, linear equation, residual sum of squares, concentration, and ratio to concentration of sample solution.</p>
                    </td>
                </tr>
                {/* Conclusion */}
                <tr>
                    <td className="border border-gray-400 p-2 font-bold bg-gray-50 text-left">结论<br/>Conclusion</td>
                    <td className="border border-gray-400 p-2 font-bold text-center" colSpan={3}>
                       {valStatus.linearity}
                    </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 5.6 Precision (Repeatability) */}
          <div id="report-val-precision" className="mb-6 scroll-mt-24">
            <h4 className="font-bold text-lg text-gray-800 mb-2">5.6 精密度（重复性） Precision（repeatability）</h4>
            
            <div className="mb-4 text-sm pl-2">
                {/* Chinese Block */}
                <div className="space-y-1 mb-4">
                  <p>记录：{displayId} 含量和鉴别检验方法验证记录；</p>
                  <p>结果谱图：CRM-AVP-{protocolCode}-{protocolVersion}.{projectNumber}；</p>
                  <p>
                    典型附图见 
                    <input 
                      type="text" 
                      value={precisionAttachmentRef} 
                      onChange={(e) => setPrecisionAttachmentRef(e.target.value)} 
                      className="border border-gray-300 rounded outline-none w-24 text-center mx-1 bg-white focus:border-blue-500 p-1 text-sm"
                    />
                    。
                  </p>
                </div>
                
                {/* English Block */}
                <div className="space-y-1">
                  <p>Record：{displayId} Assay and Identification Method Validation Record;</p>
                  <p>Liquid chromatogram: CRM-AVP-{protocolCode}-{protocolVersion}.{projectNumber};</p>
                  <p>Typical chromatogram : attachment <span>{precisionAttachmentRef}</span>.</p>
                </div>
            </div>

            <div className="text-center font-bold text-sm mb-2">
              表 4 重复性结果<br/>Table 4 Repeatability Results
            </div>

            <table className="w-full border-collapse border border-gray-400 text-sm text-center">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-400 p-2 font-bold w-[20%]">样品名<br/><span className="text-xs font-normal">Solution Name</span></th>
                  <th className="border border-gray-400 p-2 font-bold w-[15%]">称样量 (mg)<br/><span className="text-xs font-normal">Weighed (mg)</span></th>
                  <th className="border border-gray-400 p-2 font-bold w-[35%]">{displayId} 峰面积 (mAU*s)<br/><span className="text-xs font-normal">Area<sub>{displayId}</sub> (mAU*s)</span></th>
                  <th className="border border-gray-400 p-2 font-bold w-[15%]">含量 (%)<br/><span className="text-xs font-normal">Assay (%)</span></th>
                  <th className="border border-gray-400 p-2 font-bold w-[15%]">RSD(%)</th>
                </tr>
              </thead>
              <tbody>
                {experimentalData.precision.rows.map((row, idx) => (
                  <tr key={row.id}>
                    <td className="border border-gray-400 p-2 align-middle">{row.name}</td>
                    <td className="border border-gray-400 p-2 align-middle">{row.weight}</td>
                    <td className="border border-gray-400 p-2 align-middle">{row.area}</td>
                    <td className="border border-gray-400 p-2 align-middle">{row.assay}</td>
                    {idx === 0 && (
                      <td className="border border-gray-400 p-2 align-middle" rowSpan={6}>
                        {experimentalData.precision.rsd}
                      </td>
                    )}
                  </tr>
                ))}
                {/* Acceptance Criteria */}
                <tr>
                  <td className="border border-gray-400 p-2 font-bold align-middle whitespace-pre-wrap">可接受标准<br/>Acceptance criteria</td>
                  <td className="border border-gray-400 p-2 text-left text-xs leading-relaxed" colSpan={4}>
                     <div className="mb-2">
                        平行配制 6 份精密度溶液，规定条件进行测定，6 份精密度溶液检测结果应符合以下要求。<br/>
                        Repeatability: Prepare 6 sample solutions in parallel, determine the conditions, 6 samples of solution, should meet the following requirements
                     </div>
                     <table className="w-full border-collapse border border-gray-300 text-center">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 p-1 font-bold w-1/2">名称<br/>Name</th>
                                <th className="border border-gray-300 p-1 font-bold w-1/2">相对标准偏差 (RSD)<br/>Relative standard deviation (RSD)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 p-1">{displayId}</td>
                                <td className="border border-gray-300 p-1">{precisionState.precisionLimit}</td>
                            </tr>
                        </tbody>
                     </table>
                  </td>
                </tr>
                {/* Conclusion */}
                <tr>
                  <td className="border border-gray-400 p-2 font-bold align-middle">结论 Conclusion</td>
                  <td className="border border-gray-400 p-2 font-bold text-center align-middle" colSpan={4}>
                     {valStatus.repeatability}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 5.7 Accuracy */}
          <div id="report-val-accuracy" className="mb-6 scroll-mt-24">
            <h4 className="font-bold text-lg text-gray-800 mb-2">5.7 准确度Accuracy</h4>
            
            <div className="mb-4 text-sm pl-2">
                {/* Chinese Block */}
                <div className="space-y-1 mb-4">
                  <p>记录：{displayId} 含量和鉴别检验方法验证记录；</p>
                  <p>结果谱图：CRM-AVP-{protocolCode}-{protocolVersion}.{projectNumber}；</p>
                  <p>
                    典型附图见 
                    <input 
                      type="text" 
                      value={accuracyAttachmentRef} 
                      onChange={(e) => setAccuracyAttachmentRef(e.target.value)} 
                      className="border border-gray-300 rounded outline-none w-24 text-center mx-1 bg-white focus:border-blue-500 p-1 text-sm"
                    />
                    。
                  </p>
                </div>
                
                {/* English Block */}
                <div className="space-y-1">
                  <p>Record：{displayId} Assay and Identification Method Validation Record;</p>
                  <p>Liquid chromatogram: CRM-AVP-{protocolCode}-{protocolVersion}.{projectNumber};</p>
                  <p>Typical chromatogram : attachment <span>{accuracyAttachmentRef}</span>.</p>
                </div>
            </div>

            <div className="text-center font-bold text-sm mb-2">
              表 5准确度结果<br/>Table 5 Accuracy Results
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-400 text-sm text-center">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-400 p-2 font-bold w-[12%]">溶液名称<br/><span className="text-xs font-normal">Solution name</span></th>
                    <th className="border border-gray-400 p-2 font-bold w-[10%]">称样量<br/><span className="text-xs font-normal">Weighed (mg)</span></th>
                    <th className="border border-gray-400 p-2 font-bold w-[12%]">峰面积<br/><span className="text-xs font-normal">Area (mAU*s)</span></th>
                    <th className="border border-gray-400 p-2 font-bold w-[12%]">供试品浓度x<br/><span className="text-xs font-normal">Sample concentration (μg/ml)</span></th>
                    <th className="border border-gray-400 p-2 font-bold w-[12%]">供试品测定量<br/><span className="text-xs font-normal">Sample measured quantity (μg)</span></th>
                    <th className="border border-gray-400 p-2 font-bold w-[12%]">供试品理论量<br/><span className="text-xs font-normal">Sample theoretical quantity (μg)</span></th>
                    <th className="border border-gray-400 p-2 font-bold w-[10%]">回收率 (%)<br/><span className="text-xs font-normal">Recovery (%)</span></th>
                    <th className="border border-gray-400 p-2 font-bold w-[10%]">RSD (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {experimentalData.accuracy.rows.map((row, idx) => (
                    <tr key={row.id}>
                      <td className="border border-gray-400 p-2 align-middle">{row.name}</td>
                      <td className="border border-gray-400 p-2 align-middle">{row.weight}</td>
                      <td className="border border-gray-400 p-2 align-middle">{row.area}</td>
                      <td className="border border-gray-400 p-2 align-middle">{row.detConc}</td>
                      <td className="border border-gray-400 p-2 align-middle">{row.detQty}</td>
                      <td className="border border-gray-400 p-2 align-middle">{row.theoQty}</td>
                      <td className="border border-gray-400 p-2 align-middle">{row.rec}</td>
                      {idx === 0 && (
                        <td className="border border-gray-400 p-2 align-middle" rowSpan={6}>
                          {experimentalData.accuracy.rsd}
                        </td>
                      )}
                    </tr>
                  ))}
                  {/* Acceptance Criteria */}
                  <tr>
                    <td className="border border-gray-400 p-2 font-bold align-middle whitespace-pre-wrap">可接受标准<br/>Acceptance criteria</td>
                    <td className="border border-gray-400 p-2 text-left text-xs leading-relaxed" colSpan={7}>
                       <p>主成分回收率均应在{accuracyState.recoveryRange}范围内，RSD≤{accuracyState.rsdLimit}。</p>
                       <p>The main component recovery rates should be within the range of {accuracyState.recoveryRange}, RSD≤{accuracyState.rsdLimit}.</p>
                    </td>
                  </tr>
                  {/* Conclusion */}
                  <tr>
                    <td className="border border-gray-400 p-2 font-bold align-middle">结论<br/>Conclusion</td>
                    <td className="border border-gray-400 p-2 font-bold text-center align-middle" colSpan={7}>
                       {valStatus.accuracy}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 5.8 Solution Stability */}
          <div id="report-val-stability" className="mb-6 scroll-mt-24">
            <h4 className="font-bold text-lg text-gray-800 mb-2">5.8 溶液稳定性 Solution Stability</h4>
            
            <div className="mb-4 text-sm pl-2">
                {/* Chinese Block */}
                <div className="space-y-1 mb-4">
                  <p>记录：{displayId} 含量和鉴别检验方法验证记录；</p>
                  <p>结果谱图：CRM-AVP-{protocolCode}-{protocolVersion}.{projectNumber}；</p>
                  <p>
                    典型附图见 
                    <input 
                      type="text" 
                      value={stabilityAttachmentRef} 
                      onChange={(e) => setStabilityAttachmentRef(e.target.value)} 
                      className="border border-gray-300 rounded outline-none w-24 text-center mx-1 bg-white focus:border-blue-500 p-1 text-sm"
                    />
                    。
                  </p>
                </div>
                
                {/* English Block */}
                <div className="space-y-1">
                  <p>Record：{displayId} Assay and Identification Method Validation Record;</p>
                  <p>Liquid chromatogram: CRM-AVP-{protocolCode}-{protocolVersion}.{projectNumber};</p>
                  <p>Typical chromatogram : attachment <span>{stabilityAttachmentRef}</span>.</p>
                </div>
            </div>

            <div className="text-center font-bold text-sm mb-2">
              表 6 对照品溶液稳定性结果<br/>Table 6 Stability Results of Standard Solution
            </div>

            <table className="w-full border-collapse border border-gray-400 text-sm text-center mb-6">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-400 p-2">时间（h）<br/><span className="text-xs font-normal">Time（h）</span></th>
                  <th className="border border-gray-400 p-2">峰面积（mAU *s）<br/><span className="text-xs font-normal">Area（mAU *s）</span></th>
                  <th className="border border-gray-400 p-2">回收率（%）<br/><span className="text-xs font-normal">Recovery（%）</span></th>
                </tr>
              </thead>
              <tbody>
                {experimentalData.stability.stdPoints.map((pt, idx) => (
                  <tr key={idx}>
                    <td className="border border-gray-400 p-2 align-middle">{pt.time}</td>
                    <td className="border border-gray-400 p-2 align-middle">{pt.area}</td>
                    <td className="border border-gray-400 p-2 align-middle">{pt.recovery}</td>
                  </tr>
                ))}
                <tr>
                    <td className="border border-gray-400 p-2 font-bold bg-gray-50 text-left align-top">可接受标准<br/>Acceptance criteria</td>
                    <td className="border border-gray-400 p-2 text-left text-xs leading-relaxed whitespace-pre-wrap" colSpan={2}>
                        {experimentalData.stability.stdAcceptanceCriteria}
                    </td>
                </tr>
                <tr>
                    <td className="border border-gray-400 p-2 font-bold bg-gray-50 text-left align-top">结论<br/>Conclusion</td>
                    <td className="border border-gray-400 p-2 text-left text-xs leading-relaxed font-bold whitespace-pre-wrap" colSpan={2}>
                        {experimentalData.stability.stdConclusion}
                    </td>
                </tr>
              </tbody>
            </table>

            <div className="text-center font-bold text-sm mb-2">
              表 7 供试品溶液稳定性结果<br/>Table 7 Stability Results of Sample Solution
            </div>

            <table className="w-full border-collapse border border-gray-400 text-sm text-center">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-400 p-2">时间（h）<br/><span className="text-xs font-normal">Time（h）</span></th>
                  <th className="border border-gray-400 p-2">{displayId}峰面积（mAU *s）<br/><span className="text-xs font-normal">Area{displayId}（mAU *s）</span></th>
                  <th className="border border-gray-400 p-2">{displayId}回收率（%）<br/><span className="text-xs font-normal">Recovery{displayId}（%）</span></th>
                </tr>
              </thead>
              <tbody>
                {experimentalData.stability.splPoints.map((pt, idx) => (
                  <tr key={idx}>
                    <td className="border border-gray-400 p-2 align-middle">{pt.time}</td>
                    <td className="border border-gray-400 p-2 align-middle">{pt.area}</td>
                    <td className="border border-gray-400 p-2 align-middle">{pt.recovery}</td>
                  </tr>
                ))}
                <tr>
                    <td className="border border-gray-400 p-2 font-bold bg-gray-50 text-left align-top">可接受标准<br/>Acceptance criteria</td>
                    <td className="border border-gray-400 p-2 text-left text-xs leading-relaxed whitespace-pre-wrap" colSpan={2}>
                        {experimentalData.stability.splAcceptanceCriteria}
                    </td>
                </tr>
                <tr>
                    <td className="border border-gray-400 p-2 font-bold bg-gray-50 text-left align-top">结论<br/>Conclusion</td>
                    <td className="border border-gray-400 p-2 text-left text-xs leading-relaxed font-bold whitespace-pre-wrap" colSpan={2}>
                        {experimentalData.stability.conclusion}
                    </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

        {/* 6. Summary of Deviations */}
        <div id="report-deviations" className="mb-8 pt-8 border-t-2 border-dashed border-gray-200 scroll-mt-24">
           <h3 className="font-bold text-xl mb-4 text-gray-800 border-b pb-2">6. 偏差摘要 SUMMARY OF DEVIATIONS</h3>
           <div className="w-full relative group">
              <textarea
                value={deviationSummary}
                onChange={(e) => setDeviationSummary(e.target.value)}
                className="w-full p-4 border-2 border-gray-300 rounded-lg shadow-inner bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none min-h-[8rem] text-sm resize-y transition-all duration-200 hover:border-blue-400 hover:shadow-md"
                placeholder="在此处输入偏差摘要... / Enter summary of deviations here..."
              />
              <div className="absolute top-2 right-2 text-gray-300 pointer-events-none group-hover:text-blue-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              </div>
           </div>
        </div>

        {/* 7. Conclusion */}
        <div id="report-conclusion" className="mb-8 pt-8 border-t-2 border-dashed border-gray-200 scroll-mt-24">
           <h3 className="font-bold text-xl mb-4 text-gray-800 border-b pb-2">7. 结论 CONCLUSION</h3>
           <div className="text-sm space-y-4 leading-relaxed">
             <p>
               该检验方法可以稳定可靠地用于 {displayId} 含量和鉴别的检验。
             </p>
             <p>
               It was stable and reliable that the analysis method was adopted to detect Assay and Identification Determination of {displayId}.
             </p>
           </div>
        </div>

        {/* 8. History of Change */}
        <div id="report-history" className="mb-8 pt-8 border-t-2 border-dashed border-gray-200 scroll-mt-24">
           <h3 className="font-bold text-xl mb-4 text-gray-800 border-b pb-2">8. 变更历史 History of Change</h3>
           <table className="w-full border-collapse border border-gray-400 text-sm text-center">
             <thead>
               <tr className="bg-gray-100">
                 <th className="border border-gray-400 p-2">版本文件<br/><span className="text-xs font-normal">Versions Document</span></th>
                 <th className="border border-gray-400 p-2">变更原因<br/><span className="text-xs font-normal">Reason of Change</span></th>
                 <th className="border border-gray-400 p-2">生效日期<br/><span className="text-xs font-normal">Effective Date</span></th>
               </tr>
             </thead>
             <tbody>
               <tr>
                 <td className="border border-gray-400 p-2 bg-gray-50">
                    <div className="font-bold text-gray-800">首版文件</div>
                    <div className="text-xs text-gray-500">Initial Document</div>
                 </td>
                 <td className="border border-gray-400 p-2 bg-gray-50">
                    <div className="font-bold text-gray-800">新增</div>
                    <div className="text-xs text-gray-500">New</div>
                 </td>
                 <td className="border border-gray-400 p-2 align-middle">
                    <BorderedInput 
                      type="date" 
                      value={reportHistoryDate} 
                      onChange={(e) => setReportHistoryDate(e.target.value)} 
                    />
                 </td>
               </tr>
             </tbody>
           </table>
        </div>

        <div className="text-center text-xs text-gray-400 mt-12 border-t pt-4">
          Generated via Electronic Protocol System
        </div>

      </div>
    </div>
  );
};
