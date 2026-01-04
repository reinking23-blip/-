
import React from 'react';
import { 
  LayoutTemplate, 
  Settings, 
  Sliders, 
  FlaskConical, 
  Calculator, 
  Table2, 
  GitMerge, 
  Sidebar, 
  FileText,
  MousePointerClick,
  RefreshCw,
  AlertCircle,
  ArrowRightLeft,
  Network,
  Link
} from 'lucide-react';

export const ProtocolDocumentPRD: React.FC = () => {
  
  const SectionBadge = ({ label }: { label: string }) => (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-bold uppercase tracking-wide border border-indigo-100 mb-4">
      <Link size={12} />
      <span>对应方案章节: {label}</span>
    </div>
  );

  return (
    <div className="p-8 bg-slate-50 min-h-full font-sans text-slate-800">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-slate-900 p-8 text-white border-b-4 border-emerald-500">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2 opacity-80">
                <span className="px-2 py-0.5 bg-emerald-600 rounded text-xs font-bold uppercase tracking-wider">FSD v3.4</span>
                <span className="text-xs font-mono">Module: Validation Protocol Generator</span>
              </div>
              <h1 className="text-3xl font-bold mb-2">方案文档 - 详细功能需求说明书 (FSD)</h1>
              <p className="text-slate-300 text-sm">Validation Protocol - Functional Specifications</p>
            </div>
            <div className="text-right text-xs text-slate-400 max-w-md leading-relaxed">
              <strong>文档密级：</strong> 内部绝密 (Confidential)<br/>
              <strong>适用对象：</strong> Frontend Dev, QA<br/>
              <strong>核心目标：</strong> 定义方案生成过程中的动态表单逻辑、数据流转规则及 DOM 挂载策略。
            </div>
          </div>
        </div>

        <div className="p-8 space-y-12">

          {/* Module 1: Global Sidebar */}
          <section>
            <div className="flex items-center gap-2 mb-4 border-b border-slate-200 pb-2">
              <div className="bg-slate-100 p-1.5 rounded"><Sidebar className="text-slate-700" size={20} /></div>
              <h2 className="text-xl font-bold">1. 全局导航与视图控制模块 (Global Navigation & View Control)</h2>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
              <SectionBadge label="Global Sidebar Component (Left Panel)" />
              
              <h3 className="font-bold text-sm text-slate-900 mb-4 border-l-4 border-emerald-500 pl-3">规格定义 Specifications</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">模块结构 (Structure)</h4>
                  <ul className="list-disc pl-4 text-xs text-slate-600 space-y-2">
                    <li><strong>目录树 (TOC)：</strong> 垂直列表，包含一级标题（如“1. 目的”）和二级缩进标题（如“6.1 系统适用性”）。</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">功能点 (Features)</h4>
                  <ul className="list-disc pl-4 text-xs text-slate-600 space-y-2">
                    <li><strong>动态目录生成：</strong> TOC 节点必须与“3. 验证项选择器”的状态实时绑定。若用户取消勾选“稳定性”，Sidebar 中对应的“6.x 溶液稳定性”节点应即时移除 (Unmount)。</li>
                    <li><strong>双向锚点联动：</strong> 
                      <ul className="list-circle pl-4 mt-1 text-slate-500">
                        <li>点击目录项 -> 主视图平滑滚动至对应 Section。</li>
                        <li>主视图滚动 -> `IntersectionObserver` 监听可视区域，反向高亮 Sidebar 对应项。</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">数据来源 (Data Source)</h4>
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-mono">Computed: visibleSections[]</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">交互方式 (Interaction)</h4>
                  <p className="text-xs text-slate-600">点击切换视图时触发全页 Re-render；滚动时防抖 (Debounce) 处理高亮更新。</p>
                </div>
              </div>
            </div>
          </section>

          {/* Module 2: Header & Cover */}
          <section>
            <div className="flex items-center gap-2 mb-4 border-b border-slate-200 pb-2">
              <div className="bg-slate-100 p-1.5 rounded"><FileText className="text-slate-700" size={20} /></div>
              <h2 className="text-xl font-bold">2. 协议头与封面表单模块 (Protocol Header & Cover Form)</h2>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
              <SectionBadge label="页眉 (ProtocolHeader) & 封面 (Cover Section)" />

              <h3 className="font-bold text-sm text-slate-900 mb-4 border-l-4 border-emerald-500 pl-3">规格定义 Specifications</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">模块结构 (Structure)</h4>
                  <ul className="list-disc pl-4 text-xs text-slate-600 space-y-2">
                    <li><strong>页眉区：</strong> Logo、双语公司名、文档编号组合显示。</li>
                    <li><strong>封面元数据输入：</strong> 
                      <ul className="list-circle pl-4 mt-1">
                        <li>产品货号 (Product ID) - 核心字段</li>
                        <li>方案编号三元组 (Code, Version, Project#)</li>
                      </ul>
                    </li>
                    <li><strong>签署人员矩阵：</strong> 5行3列网格 (起草人, 审核人x3, 批准人)，含姓名/部门/职位。</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">功能点 (Features)</h4>
                  <ul className="list-disc pl-4 text-xs text-slate-600 space-y-2">
                    <li><strong>全局上下文注入 (Context Injection)：</strong> 此处输入的 `Product ID` 为全局 SSOT (Single Source of Truth)，必须实时同步至正文所有插值位置（如 4.1, 4.3, 6.x）。</li>
                    <li><strong>编号拼接规则：</strong> 显示逻辑为 `AVP-&#123;Code&#125;-&#123;Version&#125;.&#123;Project#&#125;`。任一字段变更需触发 Header 重绘。</li>
                    <li><strong>缺省状态处理：</strong> 当 ID 为空时，下游引用处需显示红色警示文本 "货号N/A"。</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">数据来源 (Data Source)</h4>
                  <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs font-mono">Global State: productId, personnel{}, protocolCode...</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">交互方式 (Interaction)</h4>
                  <p className="text-xs text-slate-600">所有可编辑字段背景色强制为 <span className="bg-yellow-300 px-1 border-b border-black text-black">亮黄色</span> 以区分静态文本。</p>
                </div>
              </div>
            </div>
          </section>

          {/* Module 3: Validation Selector */}
          <section>
            <div className="flex items-center gap-2 mb-4 border-b border-slate-200 pb-2">
              <div className="bg-blue-100 p-1.5 rounded"><Settings className="text-blue-700" size={20} /></div>
              <h2 className="text-xl font-bold">3. 验证范围选择器模块 (Validation Scope Selector)</h2>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
              <SectionBadge label="1. 目的 (Objective) - 验证项选择区" />

              <h3 className="font-bold text-sm text-slate-900 mb-4 border-l-4 border-emerald-500 pl-3">规格定义 Specifications</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">模块结构 (Structure)</h4>
                  <ul className="list-disc pl-4 text-xs text-slate-600 space-y-2">
                    <li><strong>复选框网格：</strong> 6个核心验证项 (System Suitability, Specificity, Linearity, Precision, Accuracy, Stability)。</li>
                    <li><strong>动态文本段落：</strong> "1. 目的" 章节下的描述文本。</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">功能点 (Features)</h4>
                  <ul className="list-disc pl-4 text-xs text-slate-600 space-y-2">
                    <li><strong>DOM 挂载控制 (Mount Control)：</strong> 此模块是文档结构的“总控开关”。</li>
                    <li><strong>强制约束：</strong> "系统适用性" 为必选项 (Disabled & Checked)，防止用户误操作。</li>
                    <li><strong>文本拼接算法：</strong> 根据勾选集合，自动生成中英文枚举文本（e.g., "包括系统适用性、专属性..."）。</li>
                  </ul>
                </div>
              </div>

              {/* Dynamic Logic Matrix - New Addition */}
              <div className="mt-6 border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 font-bold text-xs text-slate-700 flex items-center gap-2">
                  <ArrowRightLeft size={14} /> 模块动态映射矩阵 (Dynamic Mounting Matrix)
                </div>
                <table className="w-full text-xs text-left">
                  <thead className="bg-white text-slate-500">
                    <tr>
                      <th className="p-2 border-b w-[20%]">控制项 (Trigger)</th>
                      <th className="p-2 border-b w-[30%]">正文挂载章节 (Body Sections)</th>
                      <th className="p-2 border-b w-[30%]">步骤挂载章节 (Procedure Sections)</th>
                      <th className="p-2 border-b w-[20%]">逻辑行为 (Behavior)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-2 font-mono text-blue-600">systemSuitability</td>
                      <td className="p-2">6.1 系统适用性 (System Suitability)</td>
                      <td className="p-2">(一) 系统适用性 (Procedure I)</td>
                      <td className="p-2 text-red-500 font-bold">始终挂载 (强制)</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-mono text-blue-600">specificity</td>
                      <td className="p-2">6.x 专属性 (Specificity)</td>
                      <td className="p-2">(二) 专属性 (Procedure II)</td>
                      <td className="p-2">条件渲染 (Conditional)</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-mono text-blue-600">linearity</td>
                      <td className="p-2">6.x 线性和范围 (Linearity)</td>
                      <td className="p-2">(三) 线性和范围 (Procedure III)</td>
                      <td className="p-2">条件渲染 (Conditional)</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-mono text-blue-600">precision</td>
                      <td className="p-2">6.x 精密度 (Precision)</td>
                      <td className="p-2">(四) 精密度 (Procedure IV)</td>
                      <td className="p-2">条件渲染 (Conditional)</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-mono text-blue-600">accuracy</td>
                      <td className="p-2">6.x 准确度 (Accuracy)</td>
                      <td className="p-2">(五) 准确度 (Procedure V)</td>
                      <td className="p-2">条件渲染 (Conditional)</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-mono text-blue-600">stability</td>
                      <td className="p-2">6.x 溶液稳定性 (Stability)</td>
                      <td className="p-2">(六) 溶液稳定性 (Procedure VI)</td>
                      <td className="p-2">条件渲染 (Conditional)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">数据来源 (Data Source)</h4>
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-mono">Local State: validationOptions (Boolean Map)</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">交互方式 (Interaction)</h4>
                  <p className="text-xs text-slate-600">点击 Checkbox 立即触发文档重排 (Layout Shift)；被选中项卡片显示高亮边框。</p>
                </div>
              </div>
            </div>
          </section>

          {/* Module 4: Method - Instruments */}
          <section>
            <div className="flex items-center gap-2 mb-4 border-b border-slate-200 pb-2">
              <div className="bg-purple-100 p-1.5 rounded"><Sliders className="text-purple-700" size={20} /></div>
              <h2 className="text-xl font-bold">4. 检验方法-仪器与条件模块 (Product & Instruments)</h2>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
              <SectionBadge label="4.1 产品描述 & 4.2 仪器及检测条件" />

              <h3 className="font-bold text-sm text-slate-900 mb-4 border-l-4 border-emerald-500 pl-3">规格定义 Specifications</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">模块结构 (Structure)</h4>
                  <ul className="list-disc pl-4 text-xs text-slate-600 space-y-2">
                    <li><strong>产品属性：</strong> 化学式、化学名称输入框。</li>
                    <li><strong>条件动态表：</strong> 键值对列表 (Key-Value List)，支持新增/删除行。</li>
                    <li><strong>梯度表 (Gradient)：</strong> Time, Phase A, Phase B 三列结构。</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">功能点 (Features)</h4>
                  <ul className="list-disc pl-4 text-xs text-slate-600 space-y-2">
                    <li><strong>梯度自动计算 (Auto-Calc)：</strong> 用户仅输入 Phase A，Phase B 自动计算为 <code>100 - A</code>。若 A 为空，B 显示占位符。</li>
                    <li><strong>多实例支持：</strong> 支持添加多根色谱柱（如主柱、验证柱）。所有 ID 为 'column' 或 'column_*' 的行，将自动汇聚至后续“11. 验证步骤”的先决条件检查表中。</li>
                    <li><strong>自定义扩展：</strong> 用户新增行时，需同时指定中文 Label 和英文 Label。</li>
                  </ul>
                </div>
              </div>

              {/* Data Propagation Matrix - New Addition */}
              <div className="mt-6 bg-purple-50 border border-purple-100 rounded-lg p-4">
                <h4 className="text-xs font-bold text-purple-800 flex items-center gap-2 mb-2">
                  <Network size={14}/> 仪器数据流转 (Instrument Data Propagation)
                </h4>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="bg-white p-2 rounded border border-purple-100">
                    <span className="font-bold text-gray-700 block mb-1">源头 (Source: Module 4)</span>
                    <ul className="list-disc pl-4 space-y-1 text-gray-600">
                      <li><code>testingConditions</code> 数组</li>
                      <li>ID 为 <code>column</code> 的项 (主柱)</li>
                      <li>ID 为 <code>ghostBuster</code> 的项 (捕集柱)</li>
                      <li>动态添加项 <code>column_*</code></li>
                    </ul>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <span className="text-purple-400 mb-1">映射至 (Mapped To) →</span>
                  </div>
                  <div className="bg-white p-2 rounded border border-purple-100 col-start-2 row-start-1">
                    <span className="font-bold text-gray-700 block mb-1">目标 (Target: Module 8)</span>
                    <p className="text-gray-600 mb-1">先决条件 2: 色谱柱确认表</p>
                    <ul className="list-disc pl-4 space-y-1 text-gray-600">
                      <li>针对每个源条目自动生成对应行。</li>
                      <li>"规格 Model" 列为只读状态 (数据同步)。</li>
                      <li>"厂家 Supplier" 列为可编辑输入框。</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">数据来源 (Data Source)</h4>
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-mono">State: testingConditions[], gradientData[]</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">交互方式 (Interaction)</h4>
                  <p className="text-xs text-slate-600">删除按钮仅在鼠标 Hover 行时显示 (渐隐渐现)；梯度输入框限制为数字类型。</p>
                </div>
              </div>
            </div>
          </section>

          {/* Module 5: Method - Solutions */}
          <section>
            <div className="flex items-center gap-2 mb-4 border-b border-slate-200 pb-2">
              <div className="bg-teal-100 p-1.5 rounded"><FlaskConical className="text-teal-700" size={20} /></div>
              <h2 className="text-xl font-bold">5. 检验方法-溶液配制模块 (Solution Preparation)</h2>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
              <SectionBadge label="4.3 溶液配制" />

              <h3 className="font-bold text-sm text-slate-900 mb-4 border-l-4 border-emerald-500 pl-3">规格定义 Specifications</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">模块结构 (Structure)</h4>
                  <ul className="list-disc pl-4 text-xs text-slate-600 space-y-2">
                    <li><strong>溶液卡片组：</strong> 流动相A/B、稀释剂、洗针液、对照品、供试品。</li>
                    <li><strong>配制参数输入：</strong> 称样量 (Weight)、定容体积 (Volume)、配制份数 (Count)。</li>
                    <li><strong>方法描述域：</strong> 中英文双语富文本域 (Smart Textarea)。</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">功能点 (Features)</h4>
                  <ul className="list-disc pl-4 text-xs text-slate-600 space-y-2">
                    <li><strong>浓度实时计算：</strong> 系统根据 <code>Weight / Volume</code> 实时计算浓度值 (mg/ml)，强制保留2位小数。若分母为0，显示 "N/A"。</li>
                    <li><strong>智能模板插值：</strong> 描述文本中自动插入 <code>Product ID</code> 变量，减少重复录入。</li>
                    <li><strong>引用源定义：</strong> 此处定义的参数（如 Std Weight）将作为基准值，被后续“线性”、“重复性”等章节的表格直接引用。</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">数据来源 (Data Source)</h4>
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-mono">State: solutionPreps{}, solDetail{}</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">交互方式 (Interaction)</h4>
                  <p className="text-xs text-slate-600">文本域高度自适应 (Auto-grow)；计算结果字段为只读，不可手动修改。</p>
                </div>
              </div>
            </div>
          </section>

          {/* Module 6: Sys Suit & Calc */}
          <section>
            <div className="flex items-center gap-2 mb-4 border-b border-slate-200 pb-2">
              <div className="bg-orange-100 p-1.5 rounded"><Calculator className="text-orange-700" size={20} /></div>
              <h2 className="text-xl font-bold">6. 系统适用性与计算公式模块 (Sys Suit & Calculation)</h2>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
              <SectionBadge label="4.5 系统适用性要求 & 4.7 计算" />

              <h3 className="font-bold text-sm text-slate-900 mb-4 border-l-4 border-emerald-500 pl-3">规格定义 Specifications</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">模块结构 (Structure)</h4>
                  <ul className="list-disc pl-4 text-xs text-slate-600 space-y-2">
                    <li><strong>限度输入组：</strong> 理论板数、拖尾因子、RSD限度、回收率范围。</li>
                    <li><strong>序列设置表：</strong> 各溶液的进样针数输入框。</li>
                    <li><strong>校正因子开关：</strong> KF, LOD, SR, TGA 复选框。</li>
                    <li><strong>公式预览区：</strong> MathJax 或 HTML 渲染的公式块。</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">功能点 (Features)</h4>
                  <ul className="list-disc pl-4 text-xs text-slate-600 space-y-2">
                    <li><strong>限度同步机制 (Sync Mechanism)：</strong> 此处设定的 "RSD ≤ 2.0%" 为 SSOT，自动同步至“6.1 系统适用性”正文及后续“验证步骤”的表格中，确保前后一致。</li>
                    <li><strong>公式动态渲染：</strong> 勾选 "KF" 后，含量计算公式 UI 自动追加 <code>× (1 - KF)</code> 项，并同步显示 "KF: 供试品水分" 的图例解释。</li>
                  </ul>
                </div>
              </div>

              {/* Data Sync Description - New Addition */}
              <div className="mt-6 bg-orange-50 border border-orange-100 rounded-lg p-4">
                <h4 className="text-xs font-bold text-orange-800 flex items-center gap-2 mb-2">
                  <RefreshCw size={14}/> 单一数据源同步 (SSOT Synchronization)
                </h4>
                <p className="text-xs text-gray-600 mb-2">
                  用户在 Module 6 输入的限度值 (Acceptance Criteria) 会同时广播到以下两个位置，确保文档一致性：
                </p>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="border-l-2 border-orange-300 pl-3">
                    <strong className="block text-gray-800">位置 1：正文 6.1</strong>
                    <span className="text-gray-500">方法描述章节 (Method Description)</span>
                    <p className="mt-1">"主峰峰面积的RSD应≤ <code>[areaRSD]</code>%..."</p>
                  </div>
                  <div className="border-l-2 border-orange-300 pl-3">
                    <strong className="block text-gray-800">位置 2：验证步骤 (一)</strong>
                    <span className="text-gray-500">验证步骤章节 (Validation Procedure)</span>
                    <p className="mt-1">"3. 可接受标准: ...RSD应≤ <code>[areaRSD]</code>%..."</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">数据来源 (Data Source)</h4>
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-mono">State: sysSuitability, calculationState</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">交互方式 (Interaction)</h4>
                  <p className="text-xs text-slate-600">复选框切换触发公式区域的局部重绘 (Partial Re-render)。</p>
                </div>
              </div>
            </div>
          </section>

          {/* Module 7: Detail Sub-modules */}
          <section>
            <div className="flex items-center gap-2 mb-4 border-b border-slate-200 pb-2">
              <div className="bg-indigo-100 p-1.5 rounded"><Table2 className="text-indigo-700" size={20} /></div>
              <h2 className="text-xl font-bold">7. 验证详情子模块 (Detail Sub-modules)</h2>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
              <SectionBadge label="6.x 验证内容 (正文子章节)" />

              <h3 className="font-bold text-sm text-slate-900 mb-4 border-l-4 border-emerald-500 pl-3">规格定义 Specifications</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">模块结构 (Structure)</h4>
                  <ul className="list-disc pl-4 text-xs text-slate-600 space-y-2">
                    <li><strong>线性 (Linearity)：</strong> 浓度列表 (List)、称样量/体积输入。</li>
                    <li><strong>准确度 (Accuracy)：</strong> 回收率限度、RSD限度输入。</li>
                    <li><strong>稳定性 (Stability)：</strong> 温度条件、回收率范围输入。</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">功能点 (Features)</h4>
                  <ul className="list-disc pl-4 text-xs text-slate-600 space-y-2">
                    <li><strong>线性描述自动生成：</strong> 根据输入的浓度点数组 (e.g., 80%, 100%)，自动拼接文本：“配制成 80%, 100% ... 共 N 个浓度水平”。</li>
                    <li><strong>变量双向绑定：</strong> 稳定性模块中，“供试品”和“对照品”的验收标准共享同一套温度 (`sampleTemp`) 和回收率 (`sampleRecovery`) 变量。修改一处，两段文本同时更新。</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">数据来源 (Data Source)</h4>
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-mono">State: linearityState, accuracyState, stabilityState</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">交互方式 (Interaction)</h4>
                  <p className="text-xs text-slate-600">支持列表项的动态增删 (Add/Remove Item)；输入校验防止非法字符。</p>
                </div>
              </div>
            </div>
          </section>

          {/* Module 8: Procedures & Prerequisites */}
          <section>
            <div className="flex items-center gap-2 mb-4 border-b border-slate-200 pb-2">
              <div className="bg-rose-100 p-1.5 rounded"><GitMerge className="text-rose-700" size={20} /></div>
              <h2 className="text-xl font-bold">8. 验证步骤与先决条件模块 (Procedures & Prerequisites)</h2>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
              <SectionBadge label="验证步骤 (Validation Procedure) - 全部子章节" />

              <h3 className="font-bold text-sm text-slate-900 mb-4 border-l-4 border-emerald-500 pl-3">规格定义 Specifications</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">模块结构 (Structure)</h4>
                  <ul className="list-disc pl-4 text-xs text-slate-600 space-y-2">
                    <li><strong>动态检查表：</strong> 仪器确认表、色谱柱确认表、试剂确认表。</li>
                    <li><strong>步骤详情卡：</strong> 按验证项分组的详细操作步骤 (Sys Suit, Precision...)。</li>
                    <li><strong>序列表格：</strong> 包含 <code>序号 | 溶液名称 | 进样针数</code> 的标准表格。</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">功能点 (Features)</h4>
                  <ul className="list-disc pl-4 text-xs text-slate-600 space-y-2">
                    <li><strong>色谱柱自动映射 (Auto-Mapping)：</strong> 自动扫描 Module 4 中定义的所有色谱柱 (包括新增行)，在此处生成只读的“型号”列，强制用户补充“厂家”信息。</li>
                    <li><strong>试剂动态管理：</strong> 提供默认试剂列表 (水, 乙腈, 甲醇)，支持用户新增自定义试剂。</li>
                    <li><strong>序列覆写 (Sequence Override)：</strong> 每一项验证步骤自动生成标准序列，但允许用户在此处局部修改进样针数 (e.g., 重复性中 STD1 改为 2 针)，不影响全局设定。</li>
                  </ul>
                </div>
              </div>

              {/* Procedure Data Dependency - New Addition */}
              <div className="mt-6 border border-rose-200 bg-rose-50 rounded-lg p-4">
                <h4 className="text-xs font-bold text-rose-800 flex items-center gap-2 mb-2">
                  <AlertCircle size={14}/> 步骤模块数据依赖 (Procedure Data Dependencies)
                </h4>
                <div className="grid grid-cols-1 gap-2 text-xs text-gray-700">
                  <div className="flex gap-2 items-start">
                    <span className="bg-white border border-gray-200 px-1 rounded font-mono shrink-0">Module 4</span>
                    <span>→ Instruments & Columns: 填充 2.1 色谱条件引用 & Prerequisite 2 检查表。</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="bg-white border border-gray-200 px-1 rounded font-mono shrink-0">Module 5</span>
                    <span>→ Solutions: 填充各步骤 2.2 溶液配制中的描述文本与称量参数。</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="bg-white border border-gray-200 px-1 rounded font-mono shrink-0">Module 6</span>
                    <span>→ Limits: 填充各步骤 3. 可接受标准中的具体数值 (如 RSD 2.0%)。</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">数据来源 (Data Source)</h4>
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-mono">State: prerequisiteState, valProc*State</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">交互方式 (Interaction)</h4>
                  <p className="text-xs text-slate-600">删除试剂行时需弹出二次确认；表格支持行内编辑 (Inline Edit)。</p>
                </div>
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
