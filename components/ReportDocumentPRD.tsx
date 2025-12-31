
import React from 'react';
import { FileText, Layers, Code, Database, AlertCircle, Cpu } from 'lucide-react';

export const ReportDocumentPRD: React.FC = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-full">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-8 text-white">
          <div className="flex items-center gap-3 mb-2 opacity-80">
            <span className="px-2 py-0.5 border border-white/30 rounded text-xs uppercase tracking-wider">Technical Spec</span>
            <span className="text-xs">Ver 2.0</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">检验方法验证报告 (Report Document) - 技术功能说明书</h1>
          <p className="text-slate-300">面向开发的技术规格与逻辑定义 (Technical Functional Specification)</p>
        </div>

        <div className="p-8 space-y-12 text-gray-800">

          {/* 1. UI Structure */}
          <section>
            <div className="flex items-center gap-2 mb-6 border-b border-gray-200 pb-2">
              <Layers className="text-blue-600" />
              <h2 className="text-xl font-bold">1. 页面/组件结构 (UI Structure)</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
                  <tr>
                    <th className="p-3 w-1/5">组件名称</th>
                    <th className="p-3 w-1/6">层级</th>
                    <th className="p-3">描述</th>
                    <th className="p-3 w-1/4">对应文件</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="p-3 font-mono text-blue-600 font-bold">ReportDocument</td>
                    <td className="p-3"><span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs">Container</span></td>
                    <td className="p-3">报告生成主视图，接收所有业务数据 Props，负责布局编排。</td>
                    <td className="p-3 font-mono text-xs text-gray-500">components/ReportDocument.tsx</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-purple-600 font-bold pl-6">├── StatusSelect</td>
                    <td className="p-3"><span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded text-xs">Atom</span></td>
                    <td className="p-3">结果判定下拉组件 (Pass/Fail)，受控组件。</td>
                    <td className="p-3 font-mono text-xs text-gray-500">Internal</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-purple-600 font-bold pl-6">├── BorderedInput</td>
                    <td className="p-3"><span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded text-xs">Atom</span></td>
                    <td className="p-3">带边框的表单输入组件，用于日期、批号录入。</td>
                    <td className="p-3 font-mono text-xs text-gray-500">Internal</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-purple-600 font-bold pl-6">├── InlineInput</td>
                    <td className="p-3"><span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded text-xs">Atom</span></td>
                    <td className="p-3">无边框/透明背景输入组件，用于表格内数据修正或展示。</td>
                    <td className="p-3 font-mono text-xs text-gray-500">Internal</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-green-600 font-bold pl-6">├── TestMethodSection</td>
                    <td className="p-3"><span className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs">Component</span></td>
                    <td className="p-3">复用方案模块，强制 <code className="bg-gray-100 px-1 rounded">readOnly=true</code> 模式渲染方法描述。</td>
                    <td className="p-3 font-mono text-xs text-gray-500">components/TestMethodSection.tsx</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-green-600 font-bold pl-6">└── LinearityChart</td>
                    <td className="p-3"><span className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs">Component</span></td>
                    <td className="p-3">基于 SVG 的线性回归曲线可视化组件。</td>
                    <td className="p-3 font-mono text-xs text-gray-500">components/DocumentPage.tsx</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 2. Functional Details */}
          <section>
            <div className="flex items-center gap-2 mb-6 border-b border-gray-200 pb-2">
              <Code className="text-blue-600" />
              <h2 className="text-xl font-bold">2. 功能逻辑细化 (Functional Details)</h2>
            </div>

            <div className="space-y-8">
              {/* 2.1 */}
              <div>
                <h3 className="font-bold text-gray-800 mb-3 pl-2 border-l-4 border-blue-500">2.1 页眉与签名区 (Header & Signatures)</h3>
                <div className="mb-2 text-xs text-gray-500 font-mono bg-gray-50 p-2 rounded inline-block">
                  数据来源: props.protocolCode, props.preparer, props.reviewers, props.approver
                </div>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
                      <tr>
                        <th className="p-3 w-1/5">功能点</th>
                        <th className="p-3 w-1/5">触发条件</th>
                        <th className="p-3 w-1/3">前端逻辑 (Frontend Logic)</th>
                        <th className="p-3 w-1/4">后端/数据交互</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="p-3 font-medium">人员信息录入</td>
                        <td className="p-3 text-gray-600">用户在 Name/Dept/Position 单元格输入文本</td>
                        <td className="p-3">
                          <ul className="list-disc list-inside space-y-1 text-gray-600 text-xs">
                            <li><strong>State Change:</strong> 更新父组件 <code className="bg-gray-100 px-1 rounded">App.tsx</code> 中的 <code className="bg-gray-100 px-1 rounded">reportPreparer</code> 等对象。</li>
                            <li><strong>Component:</strong> 使用 <code className="bg-gray-100 px-1 rounded">renderEditableCell</code> 渲染 <code className="bg-gray-100 px-1 rounded">textarea</code>。</li>
                          </ul>
                        </td>
                        <td className="p-3 text-gray-600 text-xs font-mono">
                          Input: &#123; field: 'name' | 'dept' | 'pos', value: string &#125;<br/>
                          Sync: 实时更新 Lifted State
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">日期签署</td>
                        <td className="p-3 text-gray-600">用户选择/点击日期输入框</td>
                        <td className="p-3">
                          <ul className="list-disc list-inside space-y-1 text-gray-600 text-xs">
                            <li><strong>Validation:</strong> 仅允许 YYYY-MM-DD 格式 (HTML5 date input)。</li>
                          </ul>
                        </td>
                        <td className="p-3 text-gray-600 text-xs font-mono">Input: Date String ISO 8601</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 2.2 */}
              <div>
                <h3 className="font-bold text-gray-800 mb-3 pl-2 border-l-4 border-blue-500">2.2 Section 1 & 2: 目的与范围 (Objective & Scope)</h3>
                <div className="mb-2 text-xs text-gray-500 font-mono bg-gray-50 p-2 rounded inline-block">
                  数据来源: props.validationOptions, props.productId
                </div>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
                      <tr>
                        <th className="p-3 w-1/5">功能点</th>
                        <th className="p-3 w-1/5">触发条件</th>
                        <th className="p-3 w-1/3">前端逻辑 (Frontend Logic)</th>
                        <th className="p-3 w-1/4">后端/数据交互</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="p-3 font-medium">动态验证项生成</td>
                        <td className="p-3 text-gray-600">页面加载</td>
                        <td className="p-3">
                          <ul className="list-disc list-inside space-y-1 text-gray-600 text-xs">
                            <li><strong>Logic:</strong> 遍历 <code className="bg-gray-100 px-1 rounded">validationOptions</code>，提取为 <code className="bg-gray-100 px-1 rounded">true</code> 的项，拼接中英文文本 (e.g., "系统适用性 System suitability...") 插入 DOM。</li>
                          </ul>
                        </td>
                        <td className="p-3 text-gray-600 text-xs font-mono">N/A (Pure Rendering)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 2.3 */}
              <div>
                <h3 className="font-bold text-gray-800 mb-3 pl-2 border-l-4 border-blue-500">2.3 Section 3: 验证结果综述 (Results Summary)</h3>
                <div className="mb-2 text-xs text-gray-500 font-mono bg-gray-50 p-2 rounded inline-block">
                  数据来源: props.experimentalData (Read-only), valStatus (Local State)
                </div>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
                      <tr>
                        <th className="p-3 w-1/5">功能点</th>
                        <th className="p-3 w-1/5">触发条件</th>
                        <th className="p-3 w-1/3">前端逻辑 (Frontend Logic)</th>
                        <th className="p-3 w-1/4">后端/数据交互</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="p-3 font-medium">结果数据展示</td>
                        <td className="p-3 text-gray-600">页面加载</td>
                        <td className="p-3">
                          <ul className="list-disc list-inside space-y-1 text-gray-600 text-xs">
                            <li><strong>Rendering:</strong> 从 <code className="bg-gray-100 px-1 rounded">experimentalData</code> 深层对象中提取关键指标 (RSD, Recovery) 填充表格，使用 <code className="bg-gray-100 px-1 rounded">InlineInput</code> 展示。</li>
                          </ul>
                        </td>
                        <td className="p-3 text-gray-600 text-xs font-mono">Read-only Props</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">合规性判定</td>
                        <td className="p-3 text-gray-600">用户切换下拉框 (Pass/Fail)</td>
                        <td className="p-3">
                          <ul className="list-disc list-inside space-y-1 text-gray-600 text-xs">
                            <li><strong>State Change:</strong> 更新组件内部状态 <code className="bg-gray-100 px-1 rounded">valStatus</code> 对象 (e.g., &#123; systemSuitability: 'Pass' &#125;)。</li>
                            <li><strong>Effect:</strong> 该状态联动影响 Section 5 各子章节末尾的结论显示。</li>
                          </ul>
                        </td>
                        <td className="p-3 text-gray-600 text-xs font-mono">Input: &#123; key: string, status: 'Pass' | 'Fail' &#125;</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 2.4 */}
              <div>
                <h3 className="font-bold text-gray-800 mb-3 pl-2 border-l-4 border-blue-500">2.4 Section 4: 检验方法描述 (Test Method Description)</h3>
                <div className="mb-2 text-xs text-gray-500 font-mono bg-gray-50 p-2 rounded inline-block">
                  数据来源: 全量 Protocol State (solutionPreps, testingConditions 等)
                </div>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
                      <tr>
                        <th className="p-3 w-1/5">功能点</th>
                        <th className="p-3 w-1/5">触发条件</th>
                        <th className="p-3 w-1/3">前端逻辑 (Frontend Logic)</th>
                        <th className="p-3 w-1/4">后端/数据交互</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="p-3 font-medium">只读模式渲染</td>
                        <td className="p-3 text-gray-600">页面加载</td>
                        <td className="p-3">
                          <ul className="list-disc list-inside space-y-1 text-gray-600 text-xs">
                            <li><strong>Props Drilling:</strong> 将所有方案数据透传给 <code className="bg-gray-100 px-1 rounded">TestMethodSection</code> 组件，并强制设置 <code className="bg-gray-100 px-1 rounded">readOnly=true</code>。</li>
                            <li><strong>UI:</strong> 所有输入框替换为 <code className="bg-gray-100 px-1 rounded">&lt;span&gt;</code> 文本，移除编辑样式 (黄色背景)。</li>
                          </ul>
                        </td>
                        <td className="p-3 text-gray-600 text-xs font-mono">Read-only Props</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 2.5 */}
              <div>
                <h3 className="font-bold text-gray-800 mb-3 pl-2 border-l-4 border-blue-500">2.5 Section 5.1 & 5.2: 资源确认 (Training & Resources)</h3>
                <div className="mb-2 text-xs text-gray-500 font-mono bg-gray-50 p-2 rounded inline-block">
                  数据来源: props.reportEquipment, props.reportReagentValues, props.reportSampleRS
                </div>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
                      <tr>
                        <th className="p-3 w-1/5">功能点</th>
                        <th className="p-3 w-1/5">触发条件</th>
                        <th className="p-3 w-1/3">前端逻辑 (Frontend Logic)</th>
                        <th className="p-3 w-1/4">后端/数据交互</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="p-3 font-medium">培训日期录入</td>
                        <td className="p-3 text-gray-600">选择日期</td>
                        <td className="p-3">
                          <ul className="list-disc list-inside space-y-1 text-gray-600 text-xs">
                            <li><strong>State Change:</strong> 更新 <code className="bg-gray-100 px-1 rounded">props.trainingDate</code>。</li>
                          </ul>
                        </td>
                        <td className="p-3 text-gray-600 text-xs font-mono">Input: Date String</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">仪器/试剂信息补录</td>
                        <td className="p-3 text-gray-600">用户输入批号、有效期、设备编号</td>
                        <td className="p-3">
                          <ul className="list-disc list-inside space-y-1 text-gray-600 text-xs">
                            <li><strong>State Change:</strong> 更新 <code className="bg-gray-100 px-1 rounded">App.tsx</code> 中的数组或对象状态。</li>
                            <li><strong>UI:</strong> 使用 <code className="bg-gray-100 px-1 rounded">BorderedInput</code> 组件。</li>
                          </ul>
                        </td>
                        <td className="p-3 text-gray-600 text-xs font-mono">Input: &#123; id, field, value &#125;</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">色谱柱序列号录入</td>
                        <td className="p-3 text-gray-600">用户输入序列号</td>
                        <td className="p-3">
                          <ul className="list-disc list-inside space-y-1 text-gray-600 text-xs">
                            <li><strong>State Change:</strong> 更新 <code className="bg-gray-100 px-1 rounded">props.reportColumnSerials</code> Map。</li>
                          </ul>
                        </td>
                        <td className="p-3 text-gray-600 text-xs font-mono">Input: &#123; columnId, serial &#125;</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 2.6 */}
              <div>
                <h3 className="font-bold text-gray-800 mb-3 pl-2 border-l-4 border-blue-500">2.6 Section 5.3 - 5.8: 详细实验内容 (Experimental Details)</h3>
                <div className="mb-2 text-xs text-gray-500 font-mono bg-gray-50 p-2 rounded inline-block">
                  数据来源: props.experimentalData
                </div>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
                      <tr>
                        <th className="p-3 w-1/5">功能点</th>
                        <th className="p-3 w-1/5">触发条件</th>
                        <th className="p-3 w-1/3">前端逻辑 (Frontend Logic)</th>
                        <th className="p-3 w-1/4">后端/数据交互</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="p-3 font-medium">附件索引录入</td>
                        <td className="p-3 text-gray-600">用户输入 "典型附图见..."</td>
                        <td className="p-3">
                          <ul className="list-disc list-inside space-y-1 text-gray-600 text-xs">
                            <li><strong>State Change:</strong> 更新组件内部状态 <code className="bg-gray-100 px-1 rounded">attachmentRef</code> 等 (Local State)。</li>
                          </ul>
                        </td>
                        <td className="p-3 text-gray-600 text-xs font-mono">Client-side only currently</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">实验数据渲染</td>
                        <td className="p-3 text-gray-600">页面加载</td>
                        <td className="p-3">
                          <ul className="list-disc list-inside space-y-1 text-gray-600 text-xs">
                            <li><strong>Logic:</strong> 映射 <code className="bg-gray-100 px-1 rounded">experimentalData</code> 中的数组 (rows, injections) 到 HTML 表格。</li>
                            <li><strong>Chart:</strong> Section 5.5 调用 <code className="bg-gray-100 px-1 rounded">LinearityChart</code>，传入 rows 计算 SVG 路径。</li>
                          </ul>
                        </td>
                        <td className="p-3 text-gray-600 text-xs font-mono">Read-only Props</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">结论联动</td>
                        <td className="p-3 text-gray-600">valStatus 变更 (Sec 3)</td>
                        <td className="p-3">
                          <ul className="list-disc list-inside space-y-1 text-gray-600 text-xs">
                            <li><strong>Logic:</strong> 引用 Section 3 中设定的 Pass/Fail 状态文本。</li>
                          </ul>
                        </td>
                        <td className="p-3 text-gray-600 text-xs font-mono">Dependent on Local State</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 2.7 & 2.8 */}
              <div>
                <h3 className="font-bold text-gray-800 mb-3 pl-2 border-l-4 border-blue-500">2.7 - 2.8 偏差与历史 (Deviations & History)</h3>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
                      <tr>
                        <th className="p-3 w-1/5">功能点</th>
                        <th className="p-3 w-1/5">触发条件</th>
                        <th className="p-3 w-1/3">前端逻辑</th>
                        <th className="p-3 w-1/4">交互</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="p-3 font-medium">偏差描述</td>
                        <td className="p-3 text-gray-600">用户输入文本域</td>
                        <td className="p-3 text-xs text-gray-600">
                          State Change: 更新 <code className="bg-gray-100 px-1 rounded">deviationSummary</code>。
                          <br/>Default: 默认为 "无偏差/No deviation"。
                        </td>
                        <td className="p-3 text-xs font-mono text-gray-600">Input: Multiline String</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">生效日期录入</td>
                        <td className="p-3 text-gray-600">选择日期</td>
                        <td className="p-3 text-xs text-gray-600">
                          State Change: 更新 <code className="bg-gray-100 px-1 rounded">reportHistoryDate</code>。
                        </td>
                        <td className="p-3 text-xs font-mono text-gray-600">Input: Date String</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </section>

          {/* 3. Edge Cases */}
          <section>
            <div className="flex items-center gap-2 mb-6 border-b border-gray-200 pb-2">
              <AlertCircle className="text-blue-600" />
              <h2 className="text-xl font-bold">3. 交互细节与边界情况 (Edge Cases)</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
                  <tr>
                    <th className="p-3 w-1/4">场景</th>
                    <th className="p-3 w-3/4">UI 表现 / 逻辑处理</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="p-3 font-medium text-gray-800">Loading 状态</td>
                    <td className="p-3 text-gray-600">
                      若 <code className="bg-gray-100 px-1 rounded">props.experimentalData</code> 为 undefined，组件应返回 <code className="bg-gray-100 px-1 rounded">&lt;div&gt;Loading Report Data...&lt;/div&gt;</code> 或骨架屏，避免白屏崩溃。
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-gray-800">空数据展示</td>
                    <td className="p-3 text-gray-600">
                      <ul className="list-disc list-inside space-y-1">
                        <li><strong>数值:</strong> 若后端返回 <code className="bg-gray-100 px-1 rounded">null</code> 或空串，表格单元格渲染为空白或 <code className="bg-gray-100 px-1 rounded">-</code>。</li>
                        <li><strong>图表:</strong> 若线性数据点 &lt; 2 个，图表区域显示 "Insufficient data for chart"。</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-gray-800">文本溢出</td>
                    <td className="p-3 text-gray-600">
                      表格内的 <code className="bg-gray-100 px-1 rounded">textarea</code> 设置 <code className="bg-gray-100 px-1 rounded">rows</code> 属性自适应高度，禁用 <code className="bg-gray-100 px-1 rounded">resize</code>，防止破坏打印版式。
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-gray-800">打印样式</td>
                    <td className="p-3 text-gray-600">
                      CSS <code className="bg-gray-100 px-1 rounded">@media print</code>: 隐藏 Sidebar、Header 导航、操作按钮 (Add/Delete)；确保 <code className="bg-gray-100 px-1 rounded">break-after: page</code> 在主要章节 (如 Section 4 后) 生效。
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-gray-800">数据同步延迟</td>
                    <td className="p-3 text-gray-600">
                      由于采用 Lifted State，<code className="bg-gray-100 px-1 rounded">App.tsx</code> 更新可能导致全页重绘。需使用 <code className="bg-gray-100 px-1 rounded">React.memo</code> 优化子组件以防输入卡顿。
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

        </div>
        
        <div className="bg-gray-100 p-4 text-center text-xs text-gray-500 border-t border-gray-200">
          Generated by Technical PM • Internal Use Only
        </div>
      </div>
    </div>
  );
};
