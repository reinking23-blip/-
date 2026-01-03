
import React from 'react';
import { LayoutTemplate, Settings, Sliders, FlaskConical, Calculator, Table2, GitMerge, Sidebar, FileText } from 'lucide-react';

export const ProtocolDocumentPRD: React.FC = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        
        {/* Header */}
        <div className="bg-slate-900 p-8 text-white border-b-4 border-emerald-500">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2 opacity-80">
                <span className="px-2 py-0.5 bg-emerald-600 rounded text-xs font-bold uppercase tracking-wider">FSD v3.0</span>
                <span className="text-xs">Protocol Generation Module</span>
              </div>
              <h1 className="text-3xl font-bold mb-2">方案文档 - 详细功能需求说明书 (FSD)</h1>
              <p className="text-slate-300">Validation Protocol - Functional Specification Document</p>
            </div>
            <div className="text-right text-xs text-slate-400 max-w-md">
              本文档采用模块化垂直拆解法 (Modular Vertical Decomposition)，定义方案生成模块的交互逻辑、数据流转与边界规则。
            </div>
          </div>
        </div>

        <div className="p-8 space-y-12 text-gray-800">

          {/* Module 1: Sidebar Navigation */}
          <section>
            <div className="flex items-center gap-2 mb-4 border-b border-gray-200 pb-2">
              <div className="bg-gray-100 p-1 rounded"><Sidebar className="text-gray-700" size={20} /></div>
              <h2 className="text-xl font-bold">1. 全局导航栏 (Global Navigation Sidebar)</h2>
            </div>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 font-semibold text-sm text-gray-700">模块定义</div>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold text-sm mb-2 text-blue-900">模块结构 (Structure)</h4>
                    <ul className="list-disc pl-4 text-xs text-gray-600 space-y-1">
                      <li><strong>视图切换区：</strong> 包含“方案文档”、“方案PRD”、“报告文档”、“数据字典”等一级导航按钮。</li>
                      <li><strong>目录树 (TOC)：</strong> 动态渲染的方案章节列表（如：封面、1. 目的、4. 方法描述...）。</li>
                      <li><strong>子目录项：</strong> 缩进显示的二级标题（如：6.1 系统适用性）。</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-2 text-blue-900">功能点 (Features)</h4>
                    <ul className="list-disc pl-4 text-xs text-gray-600 space-y-1">
                      <li><strong>动态目录生成：</strong> TOC 列表必须根据“2. 验证项选择器”的勾选状态实时增删章节节点。</li>
                      <li><strong>锚点联动：</strong> 滚动主内容区域时，Sidebar 对应条目需自动高亮；点击条目平滑滚动至对应锚点。</li>
                    </ul>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                  <div>
                    <h4 className="font-bold text-sm mb-2 text-blue-900">数据来源 (Data Source)</h4>
                    <p className="text-xs text-gray-600 font-mono">Local State: navItems (Computed from validationOptions)</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-2 text-blue-900">交互方式 (Interaction)</h4>
                    <p className="text-xs text-gray-600">点击切换视图时触发全页渲染；点击目录项触发 `scrollIntoView` 行为。</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Module 2: Cover & Header */}
          <section>
            <div className="flex items-center gap-2 mb-4 border-b border-gray-200 pb-2">
              <div className="bg-slate-100 p-1 rounded"><FileText className="text-slate-700" size={20} /></div>
              <h2 className="text-xl font-bold">2. 协议头与封面模块 (Protocol Header & Cover)</h2>
            </div>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 font-semibold text-sm text-gray-700">模块定义</div>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold text-sm mb-2 text-blue-900">模块结构 (Structure)</h4>
                    <ul className="list-disc pl-4 text-xs text-gray-600 space-y-1">
                      <li><strong>页眉区：</strong> 包含 Logo、中英文标题、动态方案号组合显示。</li>
                      <li><strong>封面表单：</strong> 
                        <ul className="list-circle pl-4 mt-1">
                          <li>输入框：产品货号 (Product ID)</li>
                          <li>输入框组：方案号段 (Code, Version, Project#)</li>
                          <li>表格：签署人员信息 (起草人、审核人x3、批准人)</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-2 text-blue-900">功能点 (Features)</h4>
                    <ul className="list-disc pl-4 text-xs text-gray-600 space-y-1">
                      <li><strong>全局变量绑定：</strong> 输入的 ProductID 和方案号需作为全局 Context，实时同步至正文所有引用处（如：页眉、4.1章节、6.x章节）。</li>
                      <li><strong>缺省状态处理：</strong> 当 ProductID 为空时，所有引用位置应显示红色 “货号N/A” 占位符。</li>
                      <li><strong>人员信息持久化：</strong> 每一行人员信息（姓名/部门/职位）均需独立状态管理，支持实时编辑。</li>
                    </ul>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                  <div>
                    <h4 className="font-bold text-sm mb-2 text-blue-900">数据来源 (Data Source)</h4>
                    <p className="text-xs text-gray-600 font-mono">Local State: productId, protocolCode, protocolVersion, projectNumber, personnel{}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-2 text-blue-900">交互方式 (Interaction)</h4>
                    <p className="text-xs text-gray-600">输入框采用 `onChange` 实时回显模式（Controlled Component）；输入框背景色为亮黄色以提示可编辑属性。</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Module 3: Validation Options */}
          <section>
            <div className="flex items-center gap-2 mb-4 border-b border-gray-200 pb-2">
              <div className="bg-blue-100 p-1 rounded"><Settings className="text-blue-700" size={20} /></div>
              <h2 className="text-xl font-bold">3. 验证项选择与目的模块 (Validation Options & Objective)</h2>
            </div>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 font-semibold text-sm text-gray-700">模块定义</div>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold text-sm mb-2 text-blue-900">模块结构 (Structure)</h4>
                    <ul className="list-disc pl-4 text-xs text-gray-600 space-y-1">
                      <li><strong>复选框组 (Checkbox Group)：</strong> 包含6个标准验证项（系统适用性、专属性、线性、精密度、准确度、稳定性）。</li>
                      <li><strong>文本展示区：</strong> 动态生成的目的描述段落。</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-2 text-blue-900">功能点 (Features)</h4>
                    <ul className="list-disc pl-4 text-xs text-gray-600 space-y-1">
                      <li><strong>DOM 动态挂载：</strong> 此模块为文档结构的“总控开关”。勾选某个验证项，必须触发后续“6.x 验证内容”及“附录：验证步骤”对应章节的 Mount/Unmount。</li>
                      <li><strong>互斥逻辑：</strong> “系统适用性”为强制必选项 (Disabled & Checked)，不可取消。</li>
                      <li><strong>文本拼接算法：</strong> 根据勾选集合，自动生成中英文目的描述文本（例如：“包括系统适用性、专属性...”）。</li>
                    </ul>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                  <div>
                    <h4 className="font-bold text-sm mb-2 text-blue-900">数据来源 (Data Source)</h4>
                    <p className="text-xs text-gray-600 font-mono">Local State: validationOptions (Boolean Map)</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-2 text-blue-900">交互方式 (Interaction)</h4>
                    <p className="text-xs text-gray-600">点击 Checkbox 立即触发全文档重绘 (Layout Shift)；选中项卡片高亮显示。</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Module 4: Method - Instruments */}
          <section>
            <div className="flex items-center gap-2 mb-4 border-b border-gray-200 pb-2">
              <div className="bg-purple-100 p-1 rounded"><Sliders className="text-purple-700" size={20} /></div>
              <h2 className="text-xl font-bold">4. 检验方法-产品与仪器模块 (Method - Product & Instruments)</h2>
            </div>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 font-semibold text-sm text-gray-700">模块定义</div>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold text-sm mb-2 text-blue-900">模块结构 (Structure)</h4>
                    <ul className="list-disc pl-4 text-xs text-gray-600 space-y-1">
                      <li><strong>产品描述区：</strong> 化学式、化学名称输入框。</li>
                      <li><strong>检测条件列表：</strong> 动态 Key-Value 列表（支持新增行）。</li>
                      <li><strong>梯度表 (Gradient Table)：</strong> 时间、流动相A、流动相B（列）。</li>
                      <li><strong>操作按钮：</strong> “新增色谱柱”、“新增条件行”、“新增梯度行”。</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-2 text-blue-900">功能点 (Features)</h4>
                    <ul className="list-disc pl-4 text-xs text-gray-600 space-y-1">
                      <li><strong>梯度自动计算：</strong> 用户仅输入 Phase A 数值，Phase B 自动计算为 `100 - A`。若 A 为空，B 显示 N/A。</li>
                      <li><strong>色谱柱多例化：</strong> 支持添加多根色谱柱（如验证柱），数据需同步流转至“11. 验证步骤”的先决条件检查表中。</li>
                      <li><strong>自定义字段：</strong> 用户可添加非标准检测条件，需同时输入中英文 Label 和 Value。</li>
                    </ul>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                  <div>
                    <h4 className="font-bold text-sm mb-2 text-blue-900">数据来源 (Data Source)</h4>
                    <p className="text-xs text-gray-600 font-mono">Local State: chemicalFormula, testingConditions[], gradientData[]</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-2 text-blue-900">交互方式 (Interaction)</h4>
                    <p className="text-xs text-gray-600">删除按钮仅在鼠标 Hover 行时显示；梯度表输入数字时自动限制步长。</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Module 5: Method - Solutions */}
          <section>
            <div className="flex items-center gap-2 mb-4 border-b border-gray-200 pb-2">
              <div className="bg-teal-100 p-1 rounded"><FlaskConical className="text-teal-700" size={20} /></div>
              <h2 className="text-xl font-bold">5. 检验方法-溶液配制模块 (Method - Solution Prep)</h2>
            </div>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 font-semibold text-sm text-gray-700">模块定义</div>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold text-sm mb-2 text-blue-900">模块结构 (Structure)</h4>
                    <ul className="list-disc pl-4 text-xs text-gray-600 space-y-1">
                      <li><strong>文本域组：</strong> 流动相A/B、洗针液、稀释剂的详细描述。</li>
                      <li><strong>配制参数输入：</strong> 称样量 (Weight)、定容体积 (Volume)、配制份数 (Count)。</li>
                      <li><strong>方法描述输入：</strong> 中英文配制方法文本域。</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-2 text-blue-900">功能点 (Features)</h4>
                    <ul className="list-disc pl-4 text-xs text-gray-600 space-y-1">
                      <li><strong>浓度自动计算：</strong> 系统根据输入的 `称样量 / 定容体积` 实时计算并展示浓度值 (mg/ml)，保留2位小数。</li>
                      <li><strong>文本模板插值：</strong> 描述文本中自动插入 {'{ProductID}'} 变量。</li>
                      <li><strong>数据复用：</strong> 此处定义的参数（如 Standard Weight）将被后续“线性”、“重复性”等章节直接引用为理论基准值。</li>
                    </ul>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                  <div>
                    <h4 className="font-bold text-sm mb-2 text-blue-900">数据来源 (Data Source)</h4>
                    <p className="text-xs text-gray-600 font-mono">Local State: solutionPreps object, solDetail object</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-2 text-blue-900">交互方式 (Interaction)</h4>
                    <p className="text-xs text-gray-600">文本域支持自适应高度（Auto-grow）；计算结果为只读展示。</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Module 6: Sys Suit & Calculation */}
          <section>
            <div className="flex items-center gap-2 mb-4 border-b border-gray-200 pb-2">
              <div className="bg-orange-100 p-1 rounded"><Calculator className="text-orange-700" size={20} /></div>
              <h2 className="text-xl font-bold">6. 检验方法-系统适用性与计算模块 (Sys Suit & Calculation)</h2>
            </div>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 font-semibold text-sm text-gray-700">模块定义</div>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold text-sm mb-2 text-blue-900">模块结构 (Structure)</h4>
                    <ul className="list-disc pl-4 text-xs text-gray-600 space-y-1">
                      <li><strong>限度输入组：</strong> 理论板数、拖尾因子、RSD限度、回收率范围。</li>
                      <li><strong>序列设置表：</strong> 各溶液的进样针数输入框。</li>
                      <li><strong>校正因子复选框：</strong> KF (水分)、LOD (干燥失重)、SR (溶剂残留)、TGA。</li>
                      <li><strong>公式展示区：</strong> 动态渲染的数学公式组件。</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-2 text-blue-900">功能点 (Features)</h4>
                    <ul className="list-disc pl-4 text-xs text-gray-600 space-y-1">
                      <li><strong>限度同步逻辑：</strong> 此处设定的 "RSD ≤ 2.0%" 将作为 Single Source of Truth，自动同步至“6.1 系统适用性”及后续“验证步骤”的接受标准中。</li>
                      <li><strong>公式动态渲染：</strong> 勾选 "KF" 或 "LOD" 后，含量计算公式UI自动追加 `× (1 - KF - LOD...)` 项，并显示对应缩写图例。</li>
                    </ul>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                  <div>
                    <h4 className="font-bold text-sm mb-2 text-blue-900">数据来源 (Data Source)</h4>
                    <p className="text-xs text-gray-600 font-mono">Local State: sysSuitability, calculationState, sequenceState</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-2 text-blue-900">交互方式 (Interaction)</h4>
                    <p className="text-xs text-gray-600">复选框切换触发布局重排；输入框失去焦点后更新全局引用。</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Module 7: Validation Sub-modules */}
          <section>
            <div className="flex items-center gap-2 mb-4 border-b border-gray-200 pb-2">
              <div className="bg-indigo-100 p-1 rounded"><Table2 className="text-indigo-700" size={20} /></div>
              <h2 className="text-xl font-bold">7. 验证内容子模块 (Validation Content Sub-modules)</h2>
            </div>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 font-semibold text-sm text-gray-700">模块定义</div>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold text-sm mb-2 text-blue-900">模块结构 (Structure)</h4>
                    <ul className="list-disc pl-4 text-xs text-gray-600 space-y-1">
                      <li><strong>线性 (Linearity)：</strong> 浓度列表（支持增删）、称样量/体积输入框。</li>
                      <li><strong>准确度 (Accuracy)：</strong> 回收率限度、RSD限度输入。</li>
                      <li><strong>稳定性 (Stability)：</strong> 温度条件输入、时间点输入、回收率限度输入。</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-2 text-blue-900">功能点 (Features)</h4>
                    <ul className="list-disc pl-4 text-xs text-gray-600 space-y-1">
                      <li><strong>线性描述生成：</strong> 根据输入的浓度点（如 80%, 100%, 120%），自动生成文本：“配制成 80%, 100%, 120% ... 共 N 个浓度水平”。</li>
                      <li><strong>双向同步：</strong> 稳定性模块中，供试品和对照品的接受标准（Acceptance Criteria）共享同一套温度和回收率变量。修改一处，两处文本同时更新。</li>
                    </ul>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                  <div>
                    <h4 className="font-bold text-sm mb-2 text-blue-900">数据来源 (Data Source)</h4>
                    <p className="text-xs text-gray-600 font-mono">Local State: linearityState, accuracyState, stabilityState</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-2 text-blue-900">交互方式 (Interaction)</h4>
                    <p className="text-xs text-gray-600">点击“新增浓度”按钮动态插入列表行；支持行内删除。</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Module 8: Validation Procedure */}
          <section>
            <div className="flex items-center gap-2 mb-4 border-b border-gray-200 pb-2">
              <div className="bg-rose-100 p-1 rounded"><GitMerge className="text-rose-700" size={20} /></div>
              <h2 className="text-xl font-bold">8. 验证步骤与先决条件模块 (Validation Procedure & Prerequisites)</h2>
            </div>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 font-semibold text-sm text-gray-700">模块定义</div>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold text-sm mb-2 text-blue-900">模块结构 (Structure)</h4>
                    <ul className="list-disc pl-4 text-xs text-gray-600 space-y-1">
                      <li><strong>先决条件表：</strong> 仪器列表、色谱柱确认表、试剂确认表（动态行）。</li>
                      <li><strong>步骤详情：</strong> 各验证项的详细操作步骤（包含进样序列表格）。</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-2 text-blue-900">功能点 (Features)</h4>
                    <ul className="list-disc pl-4 text-xs text-gray-600 space-y-1">
                      <li><strong>色谱柱自动映射：</strong> 自动列出“4.2 仪器”中定义的所有色谱柱（包含新增的），要求用户输入供应商信息。</li>
                      <li><strong>试剂动态管理：</strong> 提供默认试剂列表（水、乙腈等），支持用户增删改，定义级别（如 HPLC 级）。</li>
                      <li><strong>序列覆写：</strong> 针对每一项验证（如重复性），自动生成标准进样序列，但允许用户在此处局部覆盖默认进样针数（Override）。</li>
                    </ul>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                  <div>
                    <h4 className="font-bold text-sm mb-2 text-blue-900">数据来源 (Data Source)</h4>
                    <p className="text-xs text-gray-600 font-mono">Local State: prerequisiteState, Independent procedure states (valProc*)</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-2 text-blue-900">交互方式 (Interaction)</h4>
                    <p className="text-xs text-gray-600">表格支持行内编辑；删除按钮需二次确认（防止误删默认项）。</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
        
        <div className="bg-slate-50 p-4 text-center text-xs text-slate-400 border-t border-gray-200">
          Product Requirement Document • Confidential • Internal Use Only
        </div>
      </div>
    </div>
  );
};
