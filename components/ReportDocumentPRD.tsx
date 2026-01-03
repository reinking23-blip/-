
import React from 'react';
import { FileText, Database, CheckSquare, Edit3, Lock, PieChart, AlertTriangle, Calendar, ChevronRight } from 'lucide-react';

export const ReportDocumentPRD: React.FC = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        
        {/* Header */}
        <div className="bg-slate-900 p-8 text-white border-b-4 border-blue-600">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2 opacity-80">
                <span className="px-2 py-0.5 bg-blue-600 rounded text-xs font-bold uppercase tracking-wider">Detailed Spec</span>
                <span className="text-xs">Ver 3.0 (Granular)</span>
              </div>
              <h1 className="text-3xl font-bold mb-2">检验方法验证报告 - 详细功能规格说明书</h1>
              <p className="text-slate-300">Test Method Validation Report - Detailed Functional Specifications</p>
            </div>
            <div className="text-right text-xs text-slate-400 max-w-md">
              本文档详细定义了报告模块中每个章节的数据来源、编辑权限、交互逻辑及校验规则，供开发人员逐项实现。
            </div>
          </div>
        </div>

        <div className="p-8 space-y-12 text-gray-800">

          {/* 0. 页眉与签署 (Header & Signatures) */}
          <section>
            <div className="flex items-center gap-2 mb-4 border-b border-gray-200 pb-2">
              <div className="bg-slate-100 p-1 rounded"><FileText className="text-slate-700" size={20} /></div>
              <h2 className="text-xl font-bold">0. 页眉、封面与签署 (Header & Signatures)</h2>
            </div>
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-700 font-semibold">
                  <tr>
                    <th className="p-3 border-r w-1/4">功能模块</th>
                    <th className="p-3 border-r w-1/4">数据字段/输入项</th>
                    <th className="p-3 border-r w-1/4">逻辑与交互 (Logic & Interaction)</th>
                    <th className="p-3">数据来源 (Source)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="p-3 font-medium">页眉 (Global Header)</td>
                    <td className="p-3 text-xs">
                      Product ID (Logo Area)<br/>
                      Protocol Number (Combined)<br/>
                      Page Number
                    </td>
                    <td className="p-3 text-xs">
                      <ul className="list-disc pl-4 space-y-1">
                        <li><strong>自动拼接:</strong> 方案号格式为 <code className="bg-gray-100 px-1">AVP-{'{Code}'}-{'{Ver}'}.{'{Proj}'}</code>。</li>
                        <li><strong>只读:</strong> 页眉内容不可在报告页直接修改，需从方案页同步。</li>
                      </ul>
                    </td>
                    <td className="p-3 text-xs font-mono text-gray-500">props.protocolCode<br/>props.productId</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">封面签署区 (Signatures)</td>
                    <td className="p-3 text-xs">
                      人员信息表格:<br/>
                      - Name, Dept, Position (Text)<br/>
                      - Date (Date Picker)
                    </td>
                    <td className="p-3 text-xs">
                      <ul className="list-disc pl-4 space-y-1">
                        <li><strong>角色分离:</strong> 报告的签署人与方案的签署人数据结构分离（因为起草/审核人可能变更）。</li>
                        <li><strong>动态渲染:</strong> 支持 <code className="bg-gray-100 px-1">textarea</code> 自适应高度，支持换行。</li>
                        <li><strong>日期限制:</strong> 日期选择器格式为 YYYY-MM-DD。</li>
                      </ul>
                    </td>
                    <td className="p-3 text-xs font-mono text-gray-500">Local State (preparer, reviewers, approver)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 1 & 2. 目的与范围 */}
          <section>
            <div className="flex items-center gap-2 mb-4 border-b border-gray-200 pb-2">
              <div className="bg-blue-100 p-1 rounded"><CheckSquare className="text-blue-700" size={20} /></div>
              <h2 className="text-xl font-bold">1 & 2. 目的与范围 (Objective & Scope)</h2>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
              <h3 className="font-bold text-blue-900 mb-2">文本自动生成逻辑 (Dynamic Text Generation)</h3>
              <p className="mb-2">第1章内容必须根据用户在“方案”阶段勾选的验证项目（Validation Options）动态生成字符串。</p>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div className="bg-white p-3 rounded border border-blue-100">
                  <span className="block text-xs font-bold text-gray-500 mb-1">输入 (Options)</span>
                  <code className="text-xs text-blue-700 block">
                    systemSuitability: true<br/>
                    specificity: true<br/>
                    linearity: true<br/>
                    accuracy: true
                  </code>
                </div>
                <div className="bg-white p-3 rounded border border-blue-100">
                  <span className="block text-xs font-bold text-gray-500 mb-1">输出 (Rendered Text)</span>
                  <p className="text-xs text-gray-700">
                    "...对该检验方法进行验证，包括<strong className="text-black">系统适用性、专属性、线性和范围、准确度</strong>。"
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 3. 验证结果综述 */}
          <section>
            <div className="flex items-center gap-2 mb-4 border-b border-gray-200 pb-2">
              <div className="bg-purple-100 p-1 rounded"><Database className="text-purple-700" size={20} /></div>
              <h2 className="text-xl font-bold">3. 验证结果综述 (Results Summary Dashboard)</h2>
            </div>
            <p className="text-sm text-gray-600 mb-3">此表格是报告的核心摘要，汇集关键数据并提供最终判定入口。</p>
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-700 font-semibold">
                  <tr>
                    <th className="p-3 border-r w-1/5">验证项 (Row)</th>
                    <th className="p-3 border-r w-1/3">关键数据提取 (Data Binding)</th>
                    <th className="p-3 border-r">交互功能 (Interaction)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="p-3 font-medium">系统适用性<br/>(System Suitability)</td>
                    <td className="p-3 text-xs">
                      自动读取实验数据：<br/>
                      - 理论板数 (Theoretical Plates)<br/>
                      - 拖尾因子 (Tailing Factor)<br/>
                      - 峰面积/保留时间 RSD<br/>
                      - 回收率 (Recovery)
                    </td>
                    <td className="p-3 text-xs border-l border-purple-100 bg-purple-50" rowSpan={6}>
                      <div className="font-bold text-purple-800 mb-1">Pass/Fail 判定下拉框</div>
                      <ul className="list-disc pl-4 space-y-1">
                        <li><strong>组件:</strong> <code className="bg-white px-1 border rounded">StatusSelect</code></li>
                        <li><strong>行为:</strong> 用户手动选择 Pass 或 Fail。</li>
                        <li><strong>联动:</strong> 此处的状态将<strong>直接决定</strong>第5章各子章节末尾的“结论”文字。</li>
                        <li><strong>默认值:</strong> Pass</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">专属性<br/>(Specificity)</td>
                    <td className="p-3 text-xs">
                      - 相对保留时间偏差 (RT Deviation)<br/>
                      - 峰纯度因子 (Peak Purity)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">线性<br/>(Linearity)</td>
                    <td className="p-3 text-xs">
                      - 相关系数 (r)<br/>
                      - 截距比例 (% y-intercept)<br/>
                      - 线性方程 (Equation)<br/>
                      - 残差平方和 (RSS)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">精密度<br/>(Precision)</td>
                    <td className="p-3 text-xs">
                      - 6针样品的 RSD%
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">准确度<br/>(Accuracy)</td>
                    <td className="p-3 text-xs">
                      - 平均回收率范围 (Recovery Range)<br/>
                      - RSD%
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">稳定性<br/>(Stability)</td>
                    <td className="p-3 text-xs">
                      - 各时间点回收率 (Timepoint Recovery)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 4. 方法描述 */}
          <section>
            <div className="flex items-center gap-2 mb-4 border-b border-gray-200 pb-2">
              <div className="bg-gray-100 p-1 rounded"><Lock className="text-gray-700" size={20} /></div>
              <h2 className="text-xl font-bold">4. 检验方法描述 (Test Method - Read Only)</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-bold text-sm mb-2">组件复用逻辑</h4>
                <p className="text-xs text-gray-600 mb-2">
                  直接复用方案模块的 <code className="bg-gray-100 px-1 rounded">TestMethodSection</code> 组件，但传入 <code className="bg-gray-100 px-1 rounded">readOnly=true</code> 属性。
                </p>
                <div className="bg-gray-50 p-2 rounded text-xs border border-gray-200">
                  <strong>表现差异:</strong><br/>
                  1. 所有 <code className="text-yellow-600">bg-yellow-300</code> 输入框背景移除，变为透明。<br/>
                  2. 输入框替换为纯文本 (<code className="text-blue-600">&lt;span&gt;</code>) 展示。<br/>
                  3. 隐藏“新增行”、“删除行”等操作按钮。<br/>
                  4. 数据实时同步自 App 全局状态（即方案中修改，报告中自动更新）。
                </div>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-bold text-sm mb-2">包含的数据子项</h4>
                <ul className="text-xs text-gray-600 space-y-1 list-disc pl-4">
                  <li>4.1 产品描述 (化学式、名称)</li>
                  <li>4.2 仪器及条件 (色谱柱、流速、波长、梯度表)</li>
                  <li>4.3 溶液配制 (详细文本描述、称样量)</li>
                  <li>4.4 进样序列 (系统适用性针数定义)</li>
                  <li>4.5 系统适用性标准 (理论板数、RSD限度)</li>
                  <li>4.7 计算公式 (校正因子选项)</li>
                  <li>4.8 接受标准 (总限度)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 5. 验证内容详情 */}
          <section>
            <div className="flex items-center gap-2 mb-4 border-b border-gray-200 pb-2">
              <div className="bg-green-100 p-1 rounded"><Edit3 className="text-green-700" size={20} /></div>
              <h2 className="text-xl font-bold">5. 验证内容详情 (Validation Content - Editable)</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">此部分混合了只读的实验数据引用和需要用户补录的现场记录。</p>

            {/* 5.1 & 5.2 Resources */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-2 border-l-4 border-green-500 pl-2">5.1 - 5.2 资源确认 (Resources)</h3>
              <table className="w-full text-sm text-left border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-2 border-r">子章节</th>
                    <th className="p-2 border-r">需补录字段 (User Input)</th>
                    <th className="p-2">校验规则</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="p-2 text-xs font-medium">5.1 培训确认</td>
                    <td className="p-2 text-xs">培训日期 (Training Date)</td>
                    <td className="p-2 text-xs text-gray-500">日期格式</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-xs font-medium">5.2.1 仪器确认</td>
                    <td className="p-2 text-xs">厂家 (Supplier), 设备编号 (ID), 型号 (Model), 有效期 (Retest Date)</td>
                    <td className="p-2 text-xs text-gray-500">有效期不得早于当前日期（逻辑校验非强制）</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-xs font-medium">5.2.2 色谱柱</td>
                    <td className="p-2 text-xs">色谱柱序列号 (Serial Number)</td>
                    <td className="p-2 text-xs text-gray-500">必填，关联具体仪器</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-xs font-medium">5.2.3 试剂</td>
                    <td className="p-2 text-xs">批号 (Batch), 厂家 (Supplier), 有效期 (Expiry)</td>
                    <td className="p-2 text-xs text-gray-500">支持多行试剂录入</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 5.3+ Experiments */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-2 border-l-4 border-blue-500 pl-2">5.3 - 5.8 实验数据展示 (Experimental Data)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Visuals */}
                <div className="border p-3 rounded bg-white shadow-sm">
                  <div className="flex items-center gap-2 mb-2 text-blue-600 font-bold text-sm">
                    <PieChart size={16} /> 可视化图表
                  </div>
                  <p className="text-xs text-gray-600 mb-2">在 <strong>5.5 线性和范围</strong> 章节：</p>
                  <ul className="list-disc pl-4 text-xs text-gray-600 space-y-1">
                    <li>调用 <code className="bg-gray-100">LinearityChart</code> 组件。</li>
                    <li><strong>X轴:</strong> 浓度 (Concentration)。</li>
                    <li><strong>Y轴:</strong> 峰面积 (Area)。</li>
                    <li><strong>数据源:</strong> <code className="bg-gray-100">experimentalData.linearity.rows</code>。</li>
                    <li><strong>渲染:</strong> SVG 实时绘制回归线和 R² 值。</li>
                  </ul>
                </div>

                {/* Attachments */}
                <div className="border p-3 rounded bg-white shadow-sm">
                  <div className="flex items-center gap-2 mb-2 text-orange-600 font-bold text-sm">
                    <FileText size={16} /> 附件索引 (Inputs)
                  </div>
                  <p className="text-xs text-gray-600 mb-2">每个实验子章节头部需包含：</p>
                  <ul className="list-disc pl-4 text-xs text-gray-600 space-y-1">
                    <li>"典型附图见附件 [输入框]"</li>
                    <li><strong>功能:</strong> 允许用户输入图谱编号（如 "5.5-1"）。</li>
                    <li><strong>状态:</strong> 独立 Local State 管理。</li>
                  </ul>
                </div>

                {/* Conclusion Logic */}
                <div className="border p-3 rounded bg-white shadow-sm">
                  <div className="flex items-center gap-2 mb-2 text-green-600 font-bold text-sm">
                    <CheckSquare size={16} /> 结论联动
                  </div>
                  <p className="text-xs text-gray-600 mb-2">子章节末尾的“结论”行：</p>
                  <ul className="list-disc pl-4 text-xs text-gray-600 space-y-1">
                    <li><strong>只读展示:</strong> 用户不可直接编辑。</li>
                    <li><strong>内容来源:</strong> 引用第3章 (Results Summary) 中用户选择的 Pass/Fail 状态。</li>
                    <li>Pass → "符合规定 / Pass"</li>
                    <li>Fail → "不符合规定 / Fail"</li>
                  </ul>
                </div>

              </div>
            </div>
          </section>

          {/* 6, 7, 8 Footer Sections */}
          <section>
            <div className="flex items-center gap-2 mb-4 border-b border-gray-200 pb-2">
              <div className="bg-orange-100 p-1 rounded"><AlertTriangle className="text-orange-700" size={20} /></div>
              <h2 className="text-xl font-bold">6, 7, 8. 偏差、结论与历史 (Footer Sections)</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              
              <div className="flex gap-4 items-start p-3 border-b border-gray-100">
                <div className="w-32 font-bold text-sm shrink-0">6. 偏差摘要<br/>(Deviations)</div>
                <div className="text-xs text-gray-600">
                  <p className="mb-1"><strong>交互:</strong> 多行文本域 (Textarea)。</p>
                  <p className="mb-1"><strong>默认值:</strong> "在验证过程中未发生偏差。\nNo deviation occurred during the validation."</p>
                  <p><strong>样式:</strong> 灰色背景，Focus时变白，支持拖拽调整高度。</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-3 border-b border-gray-100">
                <div className="w-32 font-bold text-sm shrink-0">7. 结论<br/>(Conclusion)</div>
                <div className="text-xs text-gray-600">
                  <p className="mb-1"><strong>内容:</strong> 固定话术。</p>
                  <p>"该检验方法可以稳定可靠地用于 [ProductID] 含量和鉴别的检验..."</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-3">
                <div className="w-32 font-bold text-sm shrink-0">8. 变更历史<br/>(History)</div>
                <div className="text-xs text-gray-600">
                  <p className="mb-1"><strong>交互:</strong> "生效日期" (Effective Date) 为日期选择器输入。</p>
                  <p><strong>表格内容:</strong> 版本号(00), 变更原因(New) 为固定首版内容。</p>
                </div>
              </div>

            </div>
          </section>

        </div>
        
        <div className="bg-slate-50 p-4 text-center text-xs text-slate-400 border-t border-gray-200">
          Internal Document • Engineering Department • Confidential
        </div>
      </div>
    </div>
  );
};
