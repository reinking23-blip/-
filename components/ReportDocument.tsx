
import React from 'react';
import { Personnel, ValidationOptions } from '../types';

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
  validationOptions
}) => {
  const displayId = productId || "N/A";

  const renderEditableCell = (value: string, onChange: (val: string) => void) => {
    return (
      <td className="border border-gray-400 p-0 relative group align-top bg-transparent">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full bg-transparent outline-none text-center resize-none min-h-[3rem] font-medium p-2 block"
          rows={value.split('\n').length > 1 ? value.split('\n').length : 2}
        />
        <div className="absolute top-0 right-0 p-0.5 text-[8px] text-gray-400 opacity-0 group-hover:opacity-100 pointer-events-none">✎</div>
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
  const StatusSelect = () => (
    <div className="h-full flex items-center justify-center">
      <select className="bg-transparent font-bold cursor-pointer outline-none text-center w-full text-black h-full appearance-none">
        <option value="Pass">Pass</option>
        <option value="Fail">Fail</option>
      </select>
    </div>
  );

  // Helper for Editable Input Inline (Clean Style)
  const InlineInput = ({ value, width="w-full", className="" }: { value: string, width?: string, className?: string }) => (
    <input type="text" defaultValue={value} className={`bg-transparent border-none outline-none text-center font-medium ${width} ${className}`} />
  );

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 p-12">
        
        {/* Header Table */}
        <table className="w-full border-collapse border border-gray-400 mb-10 text-sm">
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
        <div className="mb-8 pt-8 border-t-2 border-dashed border-gray-200">
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
        <div className="mb-8">
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
        <div className="mb-8">
           <h3 className="font-bold text-xl mb-4 text-gray-800 border-b pb-2">3. 验证结果综述 Results For Validation</h3>
           <table className="w-full border-collapse border border-gray-400 text-sm table-fixed">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 p-2 text-center w-[15%]">验证项目 Item</th>
                <th className="border border-gray-400 p-2 text-center w-[40%]">可接受标准 Acceptance criteria</th>
                <th className="border border-gray-400 p-2 text-center w-[35%]">验证结果 Results</th>
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
                <td className="border border-gray-400 p-0 text-center align-middle"><StatusSelect /></td>
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
                <td className="border border-gray-400 p-0 text-center align-middle"><StatusSelect /></td>
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
                <td className="border border-gray-400 p-0 text-center align-middle"><StatusSelect /></td>
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
                <td className="border border-gray-400 p-0 text-center align-middle"><StatusSelect /></td>
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
                <td className="border border-gray-400 p-0 text-center align-middle"><StatusSelect /></td>
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
                <td className="border border-gray-400 p-0 text-center align-middle"><StatusSelect /></td>
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
                <td className="border border-gray-400 p-0 text-center align-middle"><StatusSelect /></td>
              </tr>

              {/* Repeatability */}
              <tr>
                <td className="border border-gray-400 p-2 text-center align-middle font-bold">
                  重复性<br/>Repeatability
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
                  <table className="w-full border-collapse h-full">
                    <tbody>
                      <tr>
                        <td className="p-2 w-1/2 border-r border-gray-400 text-center font-bold align-middle">RSD</td>
                        <td className="p-2 w-1/2 text-center align-middle"><InlineInput value="0.84%" /></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td className="border border-gray-400 p-0 text-center align-middle"><StatusSelect /></td>
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
                  <table className="w-full border-collapse h-full">
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
                <td className="border border-gray-400 p-0 text-center align-middle"><StatusSelect /></td>
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
                  <table className="w-full border-collapse border-b border-gray-400">
                    <thead>
                      <tr className="border-b border-gray-400">
                        <th className="p-1 border-r border-gray-400 w-1/3">时间<br/>Time(h)</th>
                        <th className="p-1 border-r border-gray-400 w-1/3 text-center">0</th>
                        <th className="p-1 border-r border-gray-400 w-1/3 text-center">6</th>
                        <th className="p-1 w-1/3 text-center">12</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-1 border-r border-gray-400 w-1/3 text-center">回收率 (%)<br/>recovery (%)</td>
                        <td className="p-1 border-r border-gray-400 w-1/3 text-center">-</td>
                        <td className="p-1 border-r border-gray-400 w-1/3 text-center"><InlineInput value="99.5" /></td>
                        <td className="p-1 w-1/3 text-center"><InlineInput value="99.5" /></td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="p-2 text-left text-xs">
                    供试品溶液在5±3℃条件下，密闭保存12h稳定。<br/>
                    The sample solution was stable when sealed and stored under the 5±3℃ condition for 12h.
                  </div>
                </td>
                <td className="border border-gray-400 p-0 text-center align-middle"><StatusSelect /></td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 text-left align-middle whitespace-pre-wrap">
                  对照品溶液在 5±3℃条件下，密闭保存，分别于 0h、12h、24h、36h 进样，考察 {displayId} 的峰面积，与 0h 相比，{displayId} 峰面积的回收率应在 98.0%~102.0%之间。<br/>
                  Standard solution: Sealed and stored at 5±3℃ temperature condition, the solution should be injected at the each point 0h、12h、24h、36h, the peak area of {displayId} should be evaluated, compared with that of 0h ,the recovery for peak area of {displayId} at each point should be 98.0%~102.0%.
                </td>
                <td className="border border-gray-400 p-0 align-middle">
                  <div className="w-full text-center p-2 font-bold border-b border-gray-400">对照品溶液 Standard solution</div>
                  <table className="w-full border-collapse border-b border-gray-400">
                    <thead>
                      <tr className="border-b border-gray-400">
                        <th className="p-1 border-r border-gray-400 w-1/4">时间<br/>Time(h)</th>
                        <th className="p-1 border-r border-gray-400 w-1/4 text-center">0</th>
                        <th className="p-1 border-r border-gray-400 w-1/4 text-center">4</th>
                        <th className="p-1 border-r border-gray-400 w-1/4 text-center">10</th>
                        <th className="p-1 w-1/4 text-center">16</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-1 border-r border-gray-400 w-1/4 text-center">回收率 (%)<br/>recovery (%)</td>
                        <td className="p-1 border-r border-gray-400 w-1/4 text-center">-</td>
                        <td className="p-1 border-r border-gray-400 w-1/4 text-center"><InlineInput value="100.2" /></td>
                        <td className="p-1 border-r border-gray-400 w-1/4 text-center"><InlineInput value="99.8" /></td>
                        <td className="p-1 w-1/4 text-center"><InlineInput value="100.1" /></td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="p-2 text-left text-xs">
                    对照品溶液在5±3℃条件下，密闭保存16h稳定。<br/>
                    The standard solution was stable when sealed and stored under the 5±3℃ condition for 16h.
                  </div>
                </td>
                <td className="border border-gray-400 p-0 text-center align-middle"><StatusSelect /></td>
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
