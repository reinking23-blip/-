
import React, { useState } from 'react';
import { Search, Database, Table, ArrowLeft, AlignLeft, Hash } from 'lucide-react';

interface FieldEntry {
  section: string;
  path: string;
  description: string;
  type: string;
  example: string;
}

const DOCUMENT_FIELDS: FieldEntry[] = [
  // System Suitability
  { section: 'System Suitability', path: 'systemSuitability.sequenceId', description: '序列号', type: 'string', example: '20240909' },
  { section: 'System Suitability', path: 'systemSuitability.blankInterference', description: '空白干扰结果', type: 'string', example: '空白溶液无干扰...' },
  { section: 'System Suitability', path: 'systemSuitability.theoreticalPlates', description: '理论塔板数', type: 'string', example: '169997' },
  { section: 'System Suitability', path: 'systemSuitability.tailingFactor', description: '拖尾因子', type: 'string', example: '0.9' },
  { section: 'System Suitability', path: 'systemSuitability.std1Weight', description: '对照品1称样量 (mg)', type: 'string', example: '20.48' },
  { section: 'System Suitability', path: 'systemSuitability.std1AvgArea', description: '对照品1平均峰面积', type: 'string', example: '5209.385' },
  { section: 'System Suitability', path: 'systemSuitability.std1AreaRSD', description: '对照品1峰面积RSD (%)', type: 'string', example: '0.06' },
  { section: 'System Suitability', path: 'systemSuitability.std1RtRSD', description: '对照品1保留时间RSD (%)', type: 'string', example: '0.04' },
  { section: 'System Suitability', path: 'systemSuitability.std1Injections[i].peakArea', description: '对照品1单针峰面积', type: 'string (Array)', example: '5212.52' },
  { section: 'System Suitability', path: 'systemSuitability.std1Injections[i].rt', description: '对照品1单针保留时间', type: 'string (Array)', example: '18.933' },
  { section: 'System Suitability', path: 'systemSuitability.std2Weight', description: '对照品2称样量 (mg)', type: 'string', example: '20.98' },
  { section: 'System Suitability', path: 'systemSuitability.std2PeakArea', description: '对照品2峰面积', type: 'string', example: '5310.797' },
  { section: 'System Suitability', path: 'systemSuitability.std2Rt', description: '对照品2保留时间', type: 'string', example: '18.953' },
  { section: 'System Suitability', path: 'systemSuitability.std2Recovery', description: '对照品2回收率 (%)', type: 'string', example: '99.5' },
  { section: 'System Suitability', path: 'systemSuitability.controls[i].name', description: '随行对照名称', type: 'string (Array)', example: 'STD1-6 (4h)' },
  { section: 'System Suitability', path: 'systemSuitability.controls[i].peakArea', description: '随行对照峰面积', type: 'string (Array)', example: '5223.806' },
  { section: 'System Suitability', path: 'systemSuitability.controls[i].rsd', description: '随行对照RSD (%)', type: 'string (Array)', example: '0.13' },
  { section: 'System Suitability', path: 'systemSuitability.conclusion', description: '结论', type: 'string', example: '符合规定' },

  // Specificity
  { section: 'Specificity', path: 'specificity.sequenceId', description: '序列号', type: 'string', example: '20240909' },
  { section: 'Specificity', path: 'specificity.stdRt', description: '对照品保留时间', type: 'string', example: '18.953' },
  { section: 'Specificity', path: 'specificity.sampleRt', description: '供试品保留时间', type: 'string', example: '18.957' },
  { section: 'Specificity', path: 'specificity.rtDeviation', description: '保留时间相对偏差 (%)', type: 'string', example: '0.02' },
  { section: 'Specificity', path: 'specificity.peakPurity', description: '峰纯度', type: 'string', example: '1000' },
  { section: 'Specificity', path: 'specificity.conclusion', description: '结论', type: 'string', example: '符合规定' },

  // Linearity
  { section: 'Linearity', path: 'linearity.sequenceId', description: '序列号', type: 'string', example: '20240909' },
  { section: 'Linearity', path: 'linearity.dilutionX1', description: '稀释倍数1', type: 'string', example: '100' },
  { section: 'Linearity', path: 'linearity.dilutionX2', description: '稀释倍数2', type: 'string', example: '50' },
  { section: 'Linearity', path: 'linearity.assayValue', description: '对照品含量', type: 'string', example: '0.998' },
  { section: 'Linearity', path: 'linearity.rows[i].id', description: '溶液ID', type: 'string (Array)', example: 'L1' },
  { section: 'Linearity', path: 'linearity.rows[i].level', description: '浓度水平标签', type: 'string (Array)', example: '0.8' },
  { section: 'Linearity', path: 'linearity.rows[i].weight', description: '称样量 (mg)', type: 'string (Array)', example: '16.4' },
  { section: 'Linearity', path: 'linearity.rows[i].conc', description: '浓度 (µg/ml)', type: 'string (Array)', example: '163.67' },
  { section: 'Linearity', path: 'linearity.rows[i].area', description: '峰面积', type: 'string (Array)', example: '4144.62' },
  { section: 'Linearity', path: 'linearity.rows[i].actualLevel', description: '实际浓度水平 (%)', type: 'string (Array)', example: '81.84' },
  { section: 'Linearity', path: 'linearity.statsN', description: '点数 n', type: 'string', example: '5' },
  { section: 'Linearity', path: 'linearity.statsR', description: '相关系数 r', type: 'string', example: '0.999785' },
  { section: 'Linearity', path: 'linearity.statsSlope', description: '斜率 a', type: 'string', example: '25.4869' },
  { section: 'Linearity', path: 'linearity.statsIntercept', description: '截距 b', type: 'string', example: '-17.1752' },
  { section: 'Linearity', path: 'linearity.statsPercentIntercept', description: '截距比例 (%)', type: 'string', example: '0.33' },
  { section: 'Linearity', path: 'linearity.statsRSS', description: '残差平方和 RSS', type: 'string', example: '1430.23' },
  { section: 'Linearity', path: 'linearity.equation', description: '线性方程', type: 'string', example: 'y=25.4869x-17.1752' },
  { section: 'Linearity', path: 'linearity.conclusion', description: '结论', type: 'string', example: '符合规定' },

  // Precision
  { section: 'Precision', path: 'precision.sequenceId', description: '序列号', type: 'string', example: '20240909' },
  { section: 'Precision', path: 'precision.stdWeight', description: '对照品称样量 (mg)', type: 'string', example: '20.48' },
  { section: 'Precision', path: 'precision.stdAssay', description: '对照品含量', type: 'string', example: '0.998' },
  { section: 'Precision', path: 'precision.stdVolume', description: '对照品稀释体积 (ml)', type: 'string', example: '100' },
  { section: 'Precision', path: 'precision.stdAvgArea', description: '对照品平均峰面积', type: 'string', example: '5209.3848' },
  { section: 'Precision', path: 'precision.splVolume', description: '供试品稀释体积 (ml)', type: 'string', example: '50' },
  { section: 'Precision', path: 'precision.rows[i].name', description: '样品名称', type: 'string (Array)', example: 'Precision-1' },
  { section: 'Precision', path: 'precision.rows[i].weight', description: '样品称样量 (mg)', type: 'string (Array)', example: '10.46' },
  { section: 'Precision', path: 'precision.rows[i].area', description: '样品峰面积', type: 'string (Array)', example: '5354.984' },
  { section: 'Precision', path: 'precision.rows[i].assay', description: '样品含量 (%)', type: 'string (Array)', example: '100.43' },
  { section: 'Precision', path: 'precision.avgAssay', description: '平均含量 (%)', type: 'string', example: '99.79' },
  { section: 'Precision', path: 'precision.rsd', description: 'RSD (%)', type: 'string', example: '0.84' },
  { section: 'Precision', path: 'precision.conclusion', description: '结论', type: 'string', example: '符合规定' },

  // Accuracy
  { section: 'Accuracy', path: 'accuracy.sequenceId', description: '序列号', type: 'string', example: '20240909' },
  { section: 'Accuracy', path: 'accuracy.slope', description: '线性斜率 (引用)', type: 'string', example: '25.4869' },
  { section: 'Accuracy', path: 'accuracy.intercept', description: '线性截距 (引用)', type: 'string', example: '-17.1752' },
  { section: 'Accuracy', path: 'accuracy.precAvgAssay', description: '精密度平均含量 (引用)', type: 'string', example: '99.79' },
  { section: 'Accuracy', path: 'accuracy.splVolume', description: '供试品稀释体积 (ml)', type: 'string', example: '50' },
  { section: 'Accuracy', path: 'accuracy.rows[i].name', description: '样品名称', type: 'string (Array)', example: 'Precision-1' },
  { section: 'Accuracy', path: 'accuracy.rows[i].weight', description: '样品称样量 (mg)', type: 'string (Array)', example: '10.46' },
  { section: 'Accuracy', path: 'accuracy.rows[i].area', description: '样品峰面积', type: 'string (Array)', example: '5354.984' },
  { section: 'Accuracy', path: 'accuracy.rows[i].detConc', description: '测定浓度 (µg/ml)', type: 'string (Array)', example: '210.78' },
  { section: 'Accuracy', path: 'accuracy.rows[i].detQty', description: '测定量 (µg)', type: 'string (Array)', example: '10539.05' },
  { section: 'Accuracy', path: 'accuracy.rows[i].theoQty', description: '理论量 (µg)', type: 'string (Array)', example: '10437.63' },
  { section: 'Accuracy', path: 'accuracy.rows[i].rec', description: '回收率 (%)', type: 'string (Array)', example: '100.97' },
  { section: 'Accuracy', path: 'accuracy.rsd', description: 'RSD (%)', type: 'string', example: '0.84' },
  { section: 'Accuracy', path: 'accuracy.conclusion', description: '结论', type: 'string', example: '符合规定' },

  // Stability
  { section: 'Stability', path: 'stability.stdSequenceId', description: '对照品序列号', type: 'string', example: '20240909' },
  { section: 'Stability', path: 'stability.splSequenceId', description: '供试品序列号', type: 'string', example: '20240909' },
  { section: 'Stability', path: 'stability.stdCondition', description: '对照品保存条件', type: 'string', example: '对照品溶液 (5℃±3℃)' },
  { section: 'Stability', path: 'stability.splCondition', description: '供试品保存条件', type: 'string', example: '供试品溶液 (5℃±3℃)' },
  { section: 'Stability', path: 'stability.stdPoints[i].time', description: '对照品时间点 (h)', type: 'string (Array)', example: '4' },
  { section: 'Stability', path: 'stability.stdPoints[i].area', description: '对照品峰面积', type: 'string (Array)', example: '5223.806' },
  { section: 'Stability', path: 'stability.stdPoints[i].recovery', description: '对照品回收率 (%)', type: 'string (Array)', example: '100.2' },
  { section: 'Stability', path: 'stability.splPoints[i].time', description: '供试品时间点 (h)', type: 'string (Array)', example: '6' },
  { section: 'Stability', path: 'stability.splPoints[i].area', description: '供试品峰面积', type: 'string (Array)', example: '5173.402' },
  { section: 'Stability', path: 'stability.splPoints[i].recovery', description: '供试品回收率 (%)', type: 'string (Array)', example: '99.5' },
  { section: 'Stability', path: 'stability.stdAcceptanceCriteria', description: '对照品接受标准', type: 'string', example: '...' },
  { section: 'Stability', path: 'stability.stdConclusion', description: '对照品结论', type: 'string', example: '...stable for 16h' },
  { section: 'Stability', path: 'stability.splAcceptanceCriteria', description: '供试品接受标准', type: 'string', example: '...' },
  { section: 'Stability', path: 'stability.conclusion', description: '供试品结论 (或总体结论)', type: 'string', example: '...stable for 12h' },
];

export const DocumentFieldTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFields = DOCUMENT_FIELDS.filter(item => 
    item.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.section.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded text-blue-600">
                <Database size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">实验数据文档字段表</h2>
              <p className="text-sm text-gray-500 mt-1">Experimental Data Document - Field Schema & Definitions</p>
            </div>
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="搜索字段、路径或描述..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-72 transition-all"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Statistics Bar */}
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex gap-6 text-xs text-gray-600 font-medium">
            <div className="flex items-center gap-2">
                <Hash size={14} />
                <span>Total Fields: {DOCUMENT_FIELDS.length}</span>
            </div>
            <div className="flex items-center gap-2">
                <Table size={14} />
                <span>Visible: {filteredFields.length}</span>
            </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-gray-600 text-sm uppercase tracking-wider border-b-2 border-gray-200">
                <th className="p-4 font-semibold w-1/6">所属章节 Section</th>
                <th className="p-4 font-semibold w-1/3">字段路径 Variable Path (Key)</th>
                <th className="p-4 font-semibold w-1/6">字段描述 Description</th>
                <th className="p-4 font-semibold w-1/6">类型 Type</th>
                <th className="p-4 font-semibold w-1/6">示例数据 Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredFields.map((row, index) => (
                <tr key={index} className="hover:bg-blue-50 transition-colors text-sm group">
                  <td className="p-4 font-medium text-gray-900">
                    <span className="inline-block bg-gray-100 px-2 py-1 rounded text-xs font-semibold text-gray-700">
                        {row.section}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-blue-700 font-medium break-all flex items-center gap-2">
                    {row.path}
                  </td>
                  <td className="p-4 text-gray-700">
                    <div className="flex items-start gap-2">
                        <AlignLeft size={14} className="mt-0.5 text-gray-400 shrink-0" />
                        {row.description}
                    </div>
                  </td>
                  <td className="p-4 text-gray-600 font-mono text-xs">{row.type}</td>
                  <td className="p-4 text-gray-500 italic truncate max-w-xs" title={row.example}>
                    {row.example}
                  </td>
                </tr>
              ))}
              {filteredFields.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-gray-400 flex flex-col items-center justify-center">
                    <Database size={48} className="mb-4 opacity-20" />
                    <p>No fields found matching "{searchTerm}"</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  );
};
