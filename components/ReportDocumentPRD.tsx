
import React from 'react';
import { 
  FileText, 
  Edit3, 
  Activity, 
  ArrowRightLeft, 
  Lock, 
  CheckSquare, 
  Layers, 
  AlertTriangle, 
  Link,
  Server,
  ShieldCheck,
  MousePointer2,
  GitCommit,
  PieChart,
  Cpu
} from 'lucide-react';

export const ReportDocumentPRD: React.FC = () => {

  const SectionBadge = ({ label }: { label: string }) => (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-bold uppercase tracking-wide border border-indigo-100 mb-4">
      <Link size={12} />
      <span>对应报告章节: {label}</span>
    </div>
  );

  return (
    <div className="p-8 bg-slate-50 min-h-full font-sans text-slate-800">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden border border-slate-200">
        
        {/* Document Header */}
        <div className="bg-slate-900 p-8 text-white border-b-4 border-indigo-500">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2 opacity-80">
                <span className="px-2 py-0.5 bg-indigo-600 rounded text-xs font-bold uppercase tracking-wider">FSD v5.2</span>
                <span className="text-xs font-mono">Module: Validation Report Generator</span>
              </div>
              <h1 className="text-3xl font-bold mb-2">检验方法验证报告 - 详细功能需求说明书 (FSD)</h1>
              <p className="text-slate-300 text-sm">Test Method Validation Report - Detailed Functional Specifications</p>
            </div>
            <div className="text-right text-xs text-slate-400 max-w-md leading-relaxed">
              <strong>文档密级：</strong> 内部绝密 (Confidential)<br/>
              <strong>适用对象：</strong> FE (Frontend), BE (Backend), QA<br/>
              <strong>核心目标：</strong> 实验数据自动化聚合、判定逻辑状态流转、报告标准化输出。
            </div>
          </div>
        </div>

        <div className="p-8 space-y-12">

          {/* Module 1: Report Metadata & Header */}
          <section>
            <div className="flex items-center gap-2 mb-4 border-b border-slate-200 pb-2">
              <div className="bg-slate-100 p-1.5 rounded"><FileText className="text-slate-700" size={20} /></div>
              <h2 className="text-xl font-bold">1. 报告元数据与表头模块 (Report Metadata & Header)</h2>
            </div>
            
            <div className="border border-slate-200 rounded-lg p-5 hover:shadow-md transition-shadow bg-white">
              <SectionBadge label="封面 (Cover) - 题目/编号/范围 & 页眉 (Header)" />

              <h3 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-indigo-600 rounded-full"></span>
                表头信息矩阵 (Header Matrix)
              </h3>
              <ul className="space-y-3 text-xs text-slate-600">
                <li>
                  <strong>模块结构 (Structure)：</strong> 
                  <br/>固定布局的 Key-Value 表格，包含题目、报告编号、适用范围。
                </li>
                <li>
                  <strong>功能点 (Features)：</strong>
                  <ul className="pl-4 mt-1 border-l-2 border-slate-100 space-y-1">
                    <li><strong>报告编号生成规则：</strong> 自动拼接 `AVR-&#123;ProtocolCode&#125;-&#123;Version&#125;.&#123;Project#&#125;`。注意前缀为 "AVR" (Report) 而非 "AVP" (Protocol)。</li>
                    <li><strong>适用范围动态插值：</strong> 模板文本中需自动嵌入当前的 `Product ID`。</li>
                  </ul>
                </li>
                <li>
                  <strong>数据来源 (Data Source)：</strong> 
                  <span className="ml-1 px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded font-mono">Inherited Context</span>
                  <br/>直接继承自方案配置 (Protocol Config)，本页面不可编辑，确保源头唯一性 (SSOT)。
                </li>
                <li>
                  <strong>交互方式 (Interaction)：</strong> 
                  <br/>全只读展示。若需修改基础信息，需通过全局导航跳转回“方案封面”模块。
                </li>
              </ul>
            </div>
          </section>

          {/* Module 2: Workflow Signatures */}
          <section>
            <div className="flex items-center gap-2 mb-4 border-b border-slate-200 pb-2">
              <div className="bg-slate-100 p-1.5 rounded"><Edit3 className="text-slate-700" size={20} /></div>
              <h2 className="text-xl font-bold">2. 审批流签署模块 (Workflow Signatures)</h2>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <SectionBadge label="封面 (Cover) - 签署表格 (Signatures)" />

              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-4 w-1/4">子组件</th>
                    <th className="p-4 w-1/4">功能逻辑 (Logic)</th>
                    <th className="p-4 w-1/4">数据来源 (Data Source)</th>
                    <th className="p-4 w-1/4">交互细节 (Interaction)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-4 font-medium">人员信息网格<br/>(Personnel Grid)</td>
                    <td className="p-4 text-xs text-slate-600">
                      包含起草人(1)、审核人(N)、批准人(1)。<br/>
                      需支持审核人列表的动态渲染（当前版本固定为3人）。
                    </td>
                    <td className="p-4 text-xs font-mono text-blue-600">
                      Local State: ReportPersonnel[]
                    </td>
                    <td className="p-4 text-xs text-slate-600">
                      输入框支持自动高度伸缩 (Auto-grow Textarea)，以适应长职位名称。
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">签署日期控件<br/>(Date Picker)</td>
                    <td className="p-4 text-xs text-slate-600">
                      独立于方案日期的报告签署日期。<br/>
                      格式强制：`YYYY-MM-DD`。
                    </td>
                    <td className="p-4 text-xs font-mono text-blue-600">
                      Local State: DateString
                    </td>
                    <td className="p-4 text-xs text-slate-600">
                      使用原生日期选择器。建议增加“今天”快捷按钮（Feature Request）。
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Module 3: Results Matrix (The Dashboard) */}
          <section>
            <div className="flex items-center gap-2 mb-4 border-b border-slate-200 pb-2">
              <div className="bg-emerald-100 p-1.5 rounded"><Activity className="text-emerald-700" size={20} /></div>
              <h2 className="text-xl font-bold">3. 验证结果综述仪表盘 (Results Executive Summary)</h2>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="border border-slate-200 rounded-lg p-5 bg-emerald-50/30">
                  <SectionBadge label="3. 验证结果综述 (Results For Validation)" />

                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-sm text-slate-900">核心逻辑：数据聚合与判定 (Aggregation & Decision)</h3>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded uppercase">Core Logic</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Logic 1 */}
                    <div className="bg-white p-4 rounded border border-slate-200 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full -mr-8 -mt-8"></div>
                      <div className="flex items-center gap-2 mb-2 relative z-10">
                        <Server size={16} className="text-blue-500"/>
                        <span className="font-bold text-xs">数据源穿透 (Data Penetration)</span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-relaxed relative z-10">
                        本模块不存储原始数据，而是作为<strong>视图层 (View Layer)</strong>，实时从 `Experimental Data Document` 中抓取关键指标（如 RSD%、回收率范围）。
                        <br/><strong>规则：</strong> 若原始数据变更，此处必须即时重绘，严禁数据不同步。
                      </p>
                    </div>

                    {/* Logic 2 */}
                    <div className="bg-white p-4 rounded border border-slate-200 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-orange-50 rounded-bl-full -mr-8 -mt-8"></div>
                      <div className="flex items-center gap-2 mb-2 relative z-10">
                        <ShieldCheck size={16} className="text-orange-500"/>
                        <span className="font-bold text-xs">限度对齐 (Criteria Alignment)</span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-relaxed relative z-10">
                        “可接受标准”列的内容必须与 Protocol 中的定义完全一致。
                        <br/><strong>数据流：</strong> Protocol State &rArr; Report View。
                        <br/><strong>异常流：</strong> 若标准未定义，显示缺省占位符。
                      </p>
                    </div>

                    {/* Logic 3 */}
                    <div className="bg-white p-4 rounded border border-slate-200 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-purple-50 rounded-bl-full -mr-8 -mt-8"></div>
                      <div className="flex items-center gap-2 mb-2 relative z-10">
                        <MousePointer2 size={16} className="text-purple-500"/>
                        <span className="font-bold text-xs">人工判定 (Human Decision)</span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-relaxed relative z-10">
                        系统不进行自动 Pass/Fail 判定，而是提供下拉选单由 QA 人工确认。
                        <br/><strong>状态流转：</strong> 此处的判定结果将作为 Payload 同步至第5章各子项的“结论”段落。
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Module Mapping & Dynamic Logic */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
                  <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                    <ArrowRightLeft size={16} className="text-slate-600"/>
                    模块对应关系与动态展示逻辑 (Module Mapping & Dynamic Logic)
                  </h3>
                </div>
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3 w-[25%]">报告模块 (Report Module)</th>
                      <th className="p-3 w-[25%]">方案对应源头 (Protocol Source)</th>
                      <th className="p-3 w-[50%]">动态展示逻辑 (Dynamic Display Logic)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-medium">System Suitability 行</td>
                      <td className="p-3 text-slate-500">Protocol 1. Objective (Checkbox) <br/>& Protocol 6.1 (Criteria)</td>
                      <td className="p-3"><code className="bg-red-50 text-red-600 px-1 rounded">Always Visible</code> 系统适用性为强制项，此行永远显示。</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-medium">Specificity 行</td>
                      <td className="p-3 text-slate-500">Protocol 1. Objective (Checkbox) <br/>& Protocol 6.x Specificity</td>
                      <td className="p-3">仅当方案中 <code className="bg-blue-50 text-blue-600 px-1 rounded">validationOptions.specificity === true</code> 时渲染。否则整行 Unmount。</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-medium">Linearity 行</td>
                      <td className="p-3 text-slate-500">Protocol 1. Objective (Checkbox) <br/>& Protocol 6.x Linearity</td>
                      <td className="p-3">仅当方案中 <code className="bg-blue-50 text-blue-600 px-1 rounded">validationOptions.linearity === true</code> 时渲染。否则整行 Unmount。</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-medium">Repeatability 行</td>
                      <td className="p-3 text-slate-500">Protocol 1. Objective (Checkbox) <br/>& Protocol 6.x Precision</td>
                      <td className="p-3">仅当方案中 <code className="bg-blue-50 text-blue-600 px-1 rounded">validationOptions.precision === true</code> 时渲染。否则整行 Unmount。</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-medium">Accuracy 行</td>
                      <td className="p-3 text-slate-500">Protocol 1. Objective (Checkbox) <br/>& Protocol 6.x Accuracy</td>
                      <td className="p-3">仅当方案中 <code className="bg-blue-50 text-blue-600 px-1 rounded">validationOptions.accuracy === true</code> 时渲染。否则整行 Unmount。</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-medium">Stability 行</td>
                      <td className="p-3 text-slate-500">Protocol 1. Objective (Checkbox) <br/>& Protocol 6.x Stability</td>
                      <td className="p-3">仅当方案中 <code className="bg-blue-50 text-blue-600 px-1 rounded">validationOptions.stability === true</code> 时渲染。否则整行 Unmount。</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Common Patterns */}
              <div className="bg-slate-50 border border-slate-200 rounded p-4">
                <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider mb-2">通用渲染模式 (Common Rendering Pattern for 5.3 - 5.8)</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700">
                  <div className="border-l-2 border-indigo-400 pl-3">
                    <strong>附图索引注入：</strong>
                    <p className="mt-1 text-slate-500">每个子章节顶部包含“典型附图见 [Input]”输入框，支持用户填写图谱编号（如 5.3-1）。</p>
                  </div>
                  <div className="border-l-2 border-indigo-400 pl-3">
                    <strong>数据单向绑定：</strong>
                    <p className="mt-1 text-slate-500">所有表格数据严格单向绑定至 <code className="font-mono">experimentalData</code>。报告页为<strong>纯展示模式</strong>，不支持修改数据。</p>
                  </div>
                  <div className="border-l-2 border-indigo-400 pl-3">
                    <strong>结论联动映射：</strong>
                    <p className="mt-1 text-slate-500">章节末尾的“结论”字段，自动读取 Module 3 中的 Pass/Fail 状态，并映射为中文描述（Pass &rArr; 符合规定）。</p>
                  </div>
                </div>
              </div>

              {/* Specific Sub-modules */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Linearity */}
                <div className="border border-slate-200 rounded-lg p-4 hover:border-rose-200 transition-colors">
                  <h4 className="font-bold text-sm text-slate-900 mb-2 flex items-center gap-2">
                    <PieChart size={14} className="text-rose-500"/>
                    5.5 线性和范围 - 可视化需求
                  </h4>
                  <ul className="list-disc pl-4 text-xs text-slate-600 space-y-1">
                    <li><strong>SVG 线性回归图表：</strong> 必须在客户端实时渲染。</li>
                    <li><strong>坐标系：</strong> X轴为浓度，Y轴为峰面积。</li>
                    <li><strong>数据驱动：</strong> 监听 <code className="font-mono">experimentalData.linearity.rows</code> 变化触发重绘。</li>
                    <li><strong>元数据展示：</strong> 图表内需包含 R² 值和回归方程文本。</li>
                  </ul>
                </div>

                {/* Stability */}
                <div className="border border-slate-200 rounded-lg p-4 hover:border-rose-200 transition-colors">
                  <h4 className="font-bold text-sm text-slate-900 mb-2 flex items-center gap-2">
                    <Cpu size={14} className="text-rose-500"/>
                    5.8 稳定性 - 动态列渲染
                  </h4>
                  <ul className="list-disc pl-4 text-xs text-slate-600 space-y-1">
                    <li><strong>时间点自适应：</strong> 表格列数需根据实验数据中的时间点 (Time Points) 动态生成 (0h, 6h, 12h...)。</li>
                    <li><strong>双表结构：</strong> 需分别渲染“对照品溶液”和“供试品溶液”两张独立表格。</li>
                    <li><strong>缺省值处理：</strong> 若某时间点无数据，单元格应显示 "-" 或 "N/A"。</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Module 7: Footer Attributes */}
          <section>
            <div className="flex items-center gap-2 mb-4 border-b border-slate-200 pb-2">
              <div className="bg-orange-100 p-1.5 rounded"><AlertTriangle className="text-orange-700" size={20} /></div>
              <h2 className="text-xl font-bold">7. 尾部属性模块 (Footer Attributes)</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Deviations */}
              <div className="border border-slate-200 rounded-lg p-4 bg-white hover:shadow-sm transition-shadow">
                <SectionBadge label="6. 偏差 (Deviations)" />
                <h4 className="font-bold text-sm text-slate-900 mb-2">6. 偏差摘要 (Deviations)</h4>
                <p className="text-xs text-slate-600 mb-2">
                  <strong>UI组件：</strong> 多行文本域 (Textarea)。<br/>
                  <strong>缺省文案：</strong> "在验证过程中未发生偏差。No deviation occurred..."<br/>
                  <strong>交互：</strong> 支持用户手动输入偏差编号。
                </p>
              </div>

              {/* Conclusion */}
              <div className="border border-slate-200 rounded-lg p-4 bg-white hover:shadow-sm transition-shadow">
                <SectionBadge label="7. 结论 (Conclusion)" />
                <h4 className="font-bold text-sm text-slate-900 mb-2">7. 结论 (Conclusion)</h4>
                <p className="text-xs text-slate-600 mb-2">
                  <strong>逻辑：</strong> 静态模板插值。<br/>
                  <strong>插值变量：</strong> <code className="bg-slate-100 px-1 rounded">DisplayID</code><br/>
                  <strong>风险控制：</strong> 若 Module 3 中存在 "Fail" 项，建议此处增加 UI 警示样式（如红色边框）。
                </p>
              </div>

              {/* History */}
              <div className="border border-slate-200 rounded-lg p-4 bg-white hover:shadow-sm transition-shadow">
                <SectionBadge label="8. 变更历史 (History)" />
                <h4 className="font-bold text-sm text-slate-900 mb-2">8. 变更历史 (History)</h4>
                <p className="text-xs text-slate-600 mb-2">
                  <strong>结构：</strong> 固定表格 (版本号, 变更原因, 生效日期)。<br/>
                  <strong>日期控件：</strong> 生效日期使用 Date Input，独立于签署日期。<br/>
                  <strong>初始化：</strong> 默认为 "首版文件 / New"。
                </p>
              </div>
            </div>
          </section>

        </div>
        
        <div className="bg-slate-50 p-4 text-center text-xs text-slate-400 border-t border-slate-200 font-mono">
          End of Specification • Generated by Senior PM Agent
        </div>
      </div>
    </div>
  );
};
