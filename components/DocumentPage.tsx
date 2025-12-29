
import React, { useState } from 'react';
import { FileSpreadsheet, ChevronRight, Copy } from 'lucide-react';

// Enhanced Table Components
const TableHeader = ({ 
  children, 
  className = "", 
  colSpan, 
  rowSpan 
}: { 
  children?: React.ReactNode, 
  className?: string,
  colSpan?: number,
  rowSpan?: number
}) => (
  <th 
    className={`border border-gray-400 bg-gray-100 p-2 text-center font-bold text-xs ${className}`}
    colSpan={colSpan}
    rowSpan={rowSpan}
  >
    {children}
  </th>
);

const TableCell = ({ 
  children, 
  className = "", 
  align = "center", 
  colSpan, 
  rowSpan 
}: { 
  children?: React.ReactNode, 
  className?: string, 
  align?: "left" | "center" | "right",
  colSpan?: number,
  rowSpan?: number
}) => (
  <td 
    className={`border border-gray-400 p-2 text-xs text-${align} ${className}`}
    colSpan={colSpan}
    rowSpan={rowSpan}
  >
    {children}
  </td>
);

// Data Field Component with Copy Logic
const DataField = ({ value, name }: { value: string | number; name: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(name);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <span
      onClick={handleCopy}
      className={`relative inline-block cursor-pointer group px-1 rounded transition-all select-none ${
        copied ? 'bg-green-200 text-green-800' : 'hover:bg-blue-100 text-blue-900 border-b border-dotted border-blue-400'
      }`}
      title={`点击复制字段名: ${name}`}
    >
      {value}
      {copied && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap z-50 animate-in fade-in slide-in-from-bottom-1">
          已复制: {name}
        </span>
      )}
    </span>
  );
};

// SVG Linearity Chart Component
const LinearityChart = () => {
  // Data Points from the table
  const data = [
    { x: 163.67, y: 4144.62 },
    { x: 189.82, y: 4851.21 },
    { x: 203.89, y: 5165.33 },
    { x: 226.95, y: 5753.92 },
    { x: 257.48, y: 6551.63 }
  ];

  // Chart Dimensions
  const width = 600;
  const height = 300;
  const padding = 50;

  // Scales
  const minX = 140;
  const maxX = 280;
  const minY = 3500;
  const maxY = 7000;

  const xScale = (val: number) => ((val - minX) / (maxX - minX)) * (width - 2 * padding) + padding;
  const yScale = (val: number) => height - padding - ((val - minY) / (maxY - minY)) * (height - 2 * padding);

  // Linear Regression Line Points (y = 25.4869x - 17.1752)
  const lineStart = { x: 160, y: 25.4869 * 160 - 17.1752 };
  const lineEnd = { x: 260, y: 25.4869 * 260 - 17.1752 };

  // State for interactivity
  const [equationCopied, setEquationCopied] = useState(false);
  const equationText = "y = 25.4869x - 17.1752";
  const equationFieldName = "lin.stats.equation";

  const handleEquationCopy = () => {
    navigator.clipboard.writeText(equationFieldName);
    setEquationCopied(true);
    setTimeout(() => setEquationCopied(false), 2000);
  };

  return (
    <div className="w-full flex justify-center py-4 bg-white">
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="max-w-2xl overflow-visible">
        {/* Title */}
        <text x={width / 2} y={25} textAnchor="middle" fontSize="16" fontWeight="bold" fill="black">
          Linearity of HY130225
        </text>

        {/* Axes */}
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="black" strokeWidth="1" />
        <line x1={padding} y1={height - padding} x2={padding} y2={padding} stroke="black" strokeWidth="1" />

        {/* X Axis Labels */}
        {[160, 180, 200, 220, 240, 260, 280].map((tick) => (
          <g key={tick}>
            <line x1={xScale(tick)} y1={height - padding} x2={xScale(tick)} y2={height - padding + 5} stroke="black" />
            <text x={xScale(tick)} y={height - padding + 18} textAnchor="middle" fontSize="10">{tick.toFixed(3)}</text>
          </g>
        ))}
        
        {/* Y Axis Labels */}
        {[4000, 4500, 5000, 5500, 6000, 6500, 7000].map((tick) => (
          <g key={tick}>
            <line x1={padding} y1={yScale(tick)} x2={padding - 5} y2={yScale(tick)} stroke="black" />
            <text x={padding - 8} y={yScale(tick) + 3} textAnchor="end" fontSize="10">{tick.toFixed(3)}</text>
          </g>
        ))}

        {/* Axis Titles */}
        <text x={width - padding} y={height - 10} textAnchor="end" fontSize="12" fontWeight="bold">concentration (µg/ml)</text>
        <text x={15} y={height / 2} textAnchor="middle" transform={`rotate(-90, 15, ${height / 2})`} fontSize="12" fontWeight="bold">peak area(mAU*s)</text>

        {/* Regression Line */}
        <line 
          x1={xScale(lineStart.x)} 
          y1={yScale(lineStart.y)} 
          x2={xScale(lineEnd.x)} 
          y2={yScale(lineEnd.y)} 
          stroke="black" 
          strokeWidth="1" 
        />

        {/* Data Points */}
        {data.map((d, i) => (
          <g key={i}>
            {/* Diamond Shape */}
            <path 
              d={`M ${xScale(d.x)} ${yScale(d.y) - 4} L ${xScale(d.x) + 4} ${yScale(d.y)} L ${xScale(d.x)} ${yScale(d.y) + 4} L ${xScale(d.x) - 4} ${yScale(d.y)} Z`} 
              fill="#4A90E2" 
              stroke="#2C5282"
              strokeWidth="1"
            />
          </g>
        ))}

        {/* Equation and R2 */}
        <g 
          onClick={handleEquationCopy} 
          className="cursor-pointer"
          style={{ pointerEvents: 'all' }}
        >
          <text 
            x={width / 2} 
            y={60} 
            textAnchor="middle" 
            fontSize="11" 
            fill={equationCopied ? "#166534" : "#1e3a8a"}
            fontWeight="bold"
            style={{ textDecoration: 'underline', textDecorationStyle: 'dotted' }}
          >
            {equationText}
          </text>
          {equationCopied && (
            <text x={width / 2} y={45} textAnchor="middle" fontSize="10" fill="#166534">
              已复制: {equationFieldName}
            </text>
          )}
          <title>点击复制字段名: {equationFieldName}</title>
        </g>
        
        <text x={width / 2} y={75} textAnchor="middle" fontSize="11" fill="black">R² = 0.9996</text>
      </svg>
    </div>
  );
};

export const DocumentPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-full text-blue-600">
            <FileSpreadsheet size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">实验数据文档</h1>
            <p className="text-gray-500 italic text-sm">Experimental Data Document - Validation Data Records</p>
          </div>
        </div>
        <div className="text-right text-[10px] text-gray-400 flex items-center gap-2">
          <Copy size={12} />
          <span>点击单元格内数据可复制对应的系统字段名称</span>
        </div>
      </div>

      {/* 1. 系统适用性 System Suitability */}
      <section className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center gap-2 mb-6 border-b pb-2">
          <ChevronRight className="text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">系统适用性 System Suitability</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-400 text-sm">
            <tbody>
              <tr>
                <TableCell className="bg-gray-50 font-bold" colSpan={7}>系统适用性</TableCell>
              </tr>
              <tr>
                <TableCell className="bg-gray-50 font-bold" colSpan={7}>
                  序列号：<DataField value="20240909" name="ss.sequence_id" />
                </TableCell>
              </tr>
              <tr>
                <TableCell className="w-1/3" colSpan={2}>空白是否有干扰</TableCell>
                <TableCell colSpan={5} className="whitespace-pre-wrap">
                  <DataField value={"空白溶液无干扰\nThere was no interference in blank solution"} name="ss.blank_interference" />
                </TableCell>
              </tr>
              <tr>
                <TableCell colSpan={2}>对照品溶液（第一针）理论板数</TableCell>
                <TableCell colSpan={5}>
                  <DataField value="169997" name="ss.std1_1.theoretical_plates" />
                </TableCell>
              </tr>
              <tr>
                <TableCell colSpan={2}>对照品溶液（第一针）拖尾因子</TableCell>
                <TableCell colSpan={5}>
                  <DataField value="0.9" name="ss.std1_1.tailing_factor" />
                </TableCell>
              </tr>
              <tr className="bg-gray-100">
                <TableHeader colSpan={2}>溶液名称</TableHeader>
                <TableHeader>称样量 (mg)</TableHeader>
                <TableHeader>峰面积 (mAU*s)</TableHeader>
                <TableHeader>保留时间 (min)</TableHeader>
                <TableHeader>平均峰面积 (mAU*s)</TableHeader>
                <TableHeader>峰面积 RSD (%)</TableHeader>
              </tr>
              <tr>
                <TableCell rowSpan={5}>STD1</TableCell>
                <TableCell>STD1-1</TableCell>
                <TableCell rowSpan={5}>
                  <DataField value="20.48" name="ss.std1.weight" />
                </TableCell>
                <TableCell>
                  <DataField value="5212.52" name="ss.std1_1.peak_area" />
                </TableCell>
                <TableCell>
                  <DataField value="18.933" name="ss.std1_1.rt" />
                </TableCell>
                <TableCell rowSpan={5}>
                  <DataField value="5209.385" name="ss.std1.avg_peak_area" />
                </TableCell>
                <TableCell rowSpan={2}>
                  <DataField value="0.06" name="ss.std1.area_rsd" />
                </TableCell>
              </tr>
              <tr>
                <TableCell>STD1-2</TableCell>
                <TableCell>
                  <DataField value="5209.067" name="ss.std1_2.peak_area" />
                </TableCell>
                <TableCell>
                  <DataField value="18.943" name="ss.std1_2.rt" />
                </TableCell>
              </tr>
              <tr>
                <TableCell>STD1-3</TableCell>
                <TableCell>
                  <DataField value="5206.288" name="ss.std1_3.peak_area" />
                </TableCell>
                <TableCell>
                  <DataField value="18.937" name="ss.std1_3.rt" />
                </TableCell>
                <TableCell className="bg-gray-50 font-bold text-[10px]">保留时间RSD (%)</TableCell>
              </tr>
              <tr>
                <TableCell>STD1-4</TableCell>
                <TableCell>
                  <DataField value="5207.091" name="ss.std1_4.peak_area" />
                </TableCell>
                <TableCell>
                  <DataField value="18.943" name="ss.std1_4.rt" />
                </TableCell>
                <TableCell rowSpan={2}>
                  <DataField value="0.04" name="ss.std1.rt_rsd" />
                </TableCell>
              </tr>
              <tr>
                <TableCell>STD1-5</TableCell>
                <TableCell>
                  <DataField value="5211.958" name="ss.std1_5.peak_area" />
                </TableCell>
                <TableCell>
                  <DataField value="18.953" name="ss.std1_5.rt" />
                </TableCell>
              </tr>
              <tr>
                <TableCell colSpan={2} className="bg-gray-50 font-bold">STD2</TableCell>
                <TableCell>
                  <DataField value="20.98" name="ss.std2.weight" />
                </TableCell>
                <TableCell>
                  <DataField value="5310.797" name="ss.std2.peak_area" />
                </TableCell>
                <TableCell>
                  <DataField value="18.953" name="ss.std2.rt" />
                </TableCell>
                <TableCell className="bg-gray-50 font-bold">回收率 (%)</TableCell>
                <TableCell>
                  <DataField value="99.5" name="ss.std2.recovery_rate" />
                </TableCell>
              </tr>
              <tr>
                <TableCell colSpan={2} className="bg-gray-100 font-bold">随行对照</TableCell>
                <TableCell className="bg-gray-50 text-center">-</TableCell>
                <TableHeader colSpan={2}>峰面积 (mAU*s)</TableHeader>
                <TableHeader colSpan={2}>RSD (%)</TableHeader>
              </tr>
              <tr>
                <TableCell colSpan={2}>STD1-6 (4h)</TableCell>
                <TableCell rowSpan={3} className="bg-gray-50 text-center">-</TableCell>
                <TableCell colSpan={2}>
                  <DataField value="5223.806" name="ss.control_4h.peak_area" />
                </TableCell>
                <TableCell colSpan={2}>
                  <DataField value="0.13" name="ss.control_4h.rsd" />
                </TableCell>
              </tr>
              <tr>
                <TableCell colSpan={2}>STD1-7 (10h)</TableCell>
                <TableCell colSpan={2}>
                  <DataField value="5204.029" name="ss.control_10h.peak_area" />
                </TableCell>
                <TableCell colSpan={2}>
                  <DataField value="0.07" name="ss.control_10h.rsd" />
                </TableCell>
              </tr>
              <tr>
                <TableCell colSpan={2}>STD1-8 (16h)</TableCell>
                <TableCell colSpan={2}>
                  <DataField value="5219.927" name="ss.control_16h.peak_area" />
                </TableCell>
                <TableCell colSpan={2}>
                  <DataField value="0.10" name="ss.control_16h.rsd" />
                </TableCell>
              </tr>
              <tr>
                <TableCell className="bg-gray-50 font-bold" colSpan={2}>可接受标准</TableCell>
                <TableCell colSpan={5} align="left" className="whitespace-pre-wrap">
                  空白在主峰保留时间处应无干扰；{"\n"}
                  对照品溶液1第一针主峰的理论板数应≥ 5000，主峰拖尾因子应不大于2.5；{"\n"}
                  对照品溶液1连续进样5针，主峰峰面积的RSD应≤ 2.0%，保留时间的RSD应≤ 1.0%；{"\n"}
                  对照品溶液2与对照品溶液1的回收率在98.0%~102.0%之间；{"\n"}
                  若有随行对照，取随行对照1针和对照品溶液1连续5针的主峰峰面积的RSD应≤ 2.0%。
                </TableCell>
              </tr>
              <tr>
                <TableCell className="bg-gray-100 font-bold" colSpan={2}>结论</TableCell>
                <TableCell colSpan={5} className="text-green-700 font-bold">
                  <DataField value="符合规定" name="ss.conclusion" />
                </TableCell>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. 专属性 Specificity */}
      <section className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center gap-2 mb-6 border-b pb-2">
          <ChevronRight className="text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">专属性 Specificity</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-400 text-sm">
            <tbody>
              <tr>
                <TableCell className="bg-gray-50 font-bold" colSpan={4}>专属性</TableCell>
              </tr>
              <tr>
                <TableCell className="bg-gray-50 font-bold" colSpan={4}>
                  序列号：<DataField value="20240909" name="spec.sequence_id" />
                </TableCell>
              </tr>
              <tr className="bg-gray-100">
                <TableHeader>名称</TableHeader>
                <TableHeader>保留时间 (min)</TableHeader>
                <TableHeader>保留时间相对偏差 (%)</TableHeader>
                <TableHeader>峰纯度</TableHeader>
              </tr>
              <tr>
                <TableCell>对照品溶液</TableCell>
                <TableCell>
                  <DataField value="18.953" name="spec.std.rt" />
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
              </tr>
              <tr>
                <TableCell>供试品溶液</TableCell>
                <TableCell>
                  <DataField value="18.957" name="spec.sample.rt" />
                </TableCell>
                <TableCell>
                  <DataField value="0.02" name="spec.sample.rt_deviation" />
                </TableCell>
                <TableCell>
                  <DataField value="1000" name="spec.sample.peak_purity" />
                </TableCell>
              </tr>
              <tr>
                <TableCell className="bg-gray-50 font-bold">可接受标准</TableCell>
                <TableCell colSpan={3} align="left" className="whitespace-pre-wrap">
                  供试品溶液中主峰的保留时间应与对照品溶液中主峰的保留时间一致，保留时间相对偏差应不大于5.0%；{"\n"}
                  供试品溶液中主峰的峰纯度因子应≥ 990或纯度角小于纯度阈值。
                </TableCell>
              </tr>
              <tr>
                <TableCell className="bg-gray-100 font-bold">结论</TableCell>
                <TableCell colSpan={3} className="text-green-700 font-bold">
                  <DataField value="符合规定" name="spec.conclusion" />
                </TableCell>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. 线性 Linearity */}
      <section className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center gap-2 mb-6 border-b pb-2">
          <ChevronRight className="text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">线性 Linearity</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-400 text-sm">
            <tbody>
              <tr>
                <TableCell className="bg-gray-50 font-bold" colSpan={8}>线性</TableCell>
              </tr>
              <tr>
                <TableCell className="bg-gray-50 font-bold" colSpan={8}>
                  序列号：<DataField value="20240909" name="lin.sequence_id" />
                </TableCell>
              </tr>
              <tr className="bg-gray-100">
                <TableHeader>线性</TableHeader>
                <TableHeader>浓度水平</TableHeader>
                <TableHeader>称样量 (mg)</TableHeader>
                <TableHeader>稀释倍数</TableHeader>
                <TableHeader>含量</TableHeader>
                <TableHeader>浓度 (µg/ml)</TableHeader>
                <TableHeader>峰面积 (mAU*s)</TableHeader>
                <TableHeader>实际浓度水平 (%)</TableHeader>
              </tr>
              <tr>
                <TableCell>L1</TableCell>
                <TableCell><DataField value="0.8" name="lin.L1.level" /></TableCell>
                <TableCell><DataField value="16.4" name="lin.L1.weight" /></TableCell>
                <TableCell rowSpan={4}><DataField value="100" name="lin.dilution_x1" /></TableCell>
                <TableCell rowSpan={5}><DataField value="0.998" name="lin.assay_value" /></TableCell>
                <TableCell><DataField value="163.67" name="lin.L1.conc" /></TableCell>
                <TableCell><DataField value="4144.62" name="lin.L1.area" /></TableCell>
                <TableCell><DataField value="81.84" name="lin.L1.actual_level" /></TableCell>
              </tr>
              <tr>
                <TableCell>L2</TableCell>
                <TableCell><DataField value="0.9" name="lin.L2.level" /></TableCell>
                <TableCell><DataField value="19.02" name="lin.L2.weight" /></TableCell>
                <TableCell><DataField value="189.82" name="lin.L2.conc" /></TableCell>
                <TableCell><DataField value="4851.21" name="lin.L2.area" /></TableCell>
                <TableCell><DataField value="94.91" name="lin.L2.actual_level" /></TableCell>
              </tr>
              <tr>
                <TableCell>L3</TableCell>
                <TableCell><DataField value="1.0" name="lin.L3.level" /></TableCell>
                <TableCell><DataField value="20.43" name="lin.L3.weight" /></TableCell>
                <TableCell><DataField value="203.89" name="lin.L3.conc" /></TableCell>
                <TableCell><DataField value="5165.33" name="lin.L3.area" /></TableCell>
                <TableCell><DataField value="101.95" name="lin.L3.actual_level" /></TableCell>
              </tr>
              <tr>
                <TableCell>L4</TableCell>
                <TableCell><DataField value="1.1" name="lin.L4.level" /></TableCell>
                <TableCell><DataField value="22.74" name="lin.L4.weight" /></TableCell>
                <TableCell><DataField value="226.95" name="lin.L4.conc" /></TableCell>
                <TableCell><DataField value="5753.92" name="lin.L4.area" /></TableCell>
                <TableCell><DataField value="113.47" name="lin.L4.actual_level" /></TableCell>
              </tr>
              <tr>
                <TableCell>L5</TableCell>
                <TableCell><DataField value="1.2" name="lin.L5.level" /></TableCell>
                <TableCell><DataField value="12.90" name="lin.L5.weight" /></TableCell>
                <TableCell><DataField value="50" name="lin.dilution_x2" /></TableCell>
                <TableCell><DataField value="257.48" name="lin.L5.conc" /></TableCell>
                <TableCell><DataField value="6551.63" name="lin.L5.area" /></TableCell>
                <TableCell><DataField value="128.74" name="lin.L5.actual_level" /></TableCell>
              </tr>
              {/* Regression Summary */}
              <tr>
                <TableCell colSpan={5} className="bg-gray-50 text-right font-bold italic">n =</TableCell>
                <TableCell colSpan={3}><DataField value="5" name="lin.stats.n" /></TableCell>
              </tr>
              <tr>
                <TableCell colSpan={5} className="bg-gray-50 text-right font-bold italic">correlation coefficient (r)</TableCell>
                <TableCell colSpan={3}><DataField value="0.999785" name="lin.stats.correlation_r" /></TableCell>
              </tr>
              <tr>
                <TableCell colSpan={5} className="bg-gray-50 text-right font-bold italic">slope (a)</TableCell>
                <TableCell colSpan={3}><DataField value="25.4869" name="lin.stats.slope_a" /></TableCell>
              </tr>
              <tr>
                <TableCell colSpan={5} className="bg-gray-50 text-right font-bold italic">y-intercept (b)</TableCell>
                <TableCell colSpan={3}><DataField value="-17.1752" name="lin.stats.intercept_b" /></TableCell>
              </tr>
              <tr>
                <TableCell colSpan={5} className="bg-gray-50 text-right font-bold italic">% y-intercept</TableCell>
                <TableCell colSpan={3}><DataField value="0.33%" name="lin.stats.percent_intercept" /></TableCell>
              </tr>
              <tr>
                <TableCell colSpan={5} className="bg-gray-50 text-right font-bold italic">RSS (Residual sum of square)</TableCell>
                <TableCell colSpan={3}><DataField value="1430.23" name="lin.stats.rss" /></TableCell>
              </tr>
              
              {/* Inserted Chart Row */}
              <tr>
                <TableCell colSpan={8} className="p-0 border border-gray-400">
                  <LinearityChart />
                </TableCell>
              </tr>

              <tr>
                <TableCell className="bg-gray-50 font-bold">可接受标准</TableCell>
                <TableCell colSpan={7} align="left" className="whitespace-pre-wrap">
                  浓度与面积应成线性，X轴代表浓度，Y轴代表峰面积，线性相关系数r≥ 0.998，Y轴截距的绝对值与100%线性溶液峰面积的比≤ 2%；{"\n"}
                  报告主成分相关系数、相对截距、线性方程、残差平方和、浓度及相对供试品溶液浓度的比例。
                </TableCell>
              </tr>
              <tr>
                <TableCell className="bg-gray-100 font-bold">结论</TableCell>
                <TableCell colSpan={7} className="text-green-700 font-bold">
                  <DataField value="符合规定" name="lin.conclusion" />
                </TableCell>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. 重复性 Repeatability */}
      <section className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center gap-2 mb-6 border-b pb-2">
          <ChevronRight className="text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">重复性 Repeatability</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-400 text-sm">
            <tbody>
              <tr>
                <TableCell className="bg-gray-50 font-bold" colSpan={5}>重复性</TableCell>
              </tr>
              <tr>
                <TableCell className="bg-gray-50 font-bold" colSpan={5}>
                  序列号：<DataField value="20240909" name="prec.sequence_id" />
                </TableCell>
              </tr>
              <tr className="bg-gray-100">
                <TableHeader>对照品称样量 (mg)</TableHeader>
                <TableHeader>含量</TableHeader>
                <TableHeader>稀释体积 (ml)</TableHeader>
                <TableHeader colSpan={2}>对照品溶液平均峰面积 (mAU*s)</TableHeader>
              </tr>
              <tr>
                <TableCell><DataField value="20.48" name="prec.std.weight" /></TableCell>
                <TableCell><DataField value="0.998" name="prec.std.assay" /></TableCell>
                <TableCell><DataField value="100" name="prec.std.volume" /></TableCell>
                <TableCell colSpan={2}><DataField value="5209.3848" name="prec.std.avg_area" /></TableCell>
              </tr>
              <tr className="bg-gray-100">
                <TableHeader>样品名</TableHeader>
                <TableHeader>称样量 (mg)</TableHeader>
                <TableHeader>稀释体积 (ml)</TableHeader>
                <TableHeader>峰面积 (mAU*s)</TableHeader>
                <TableHeader>含量 (%)</TableHeader>
              </tr>
              {[
                { name: "Precision-1", weight: "10.46", area: "5354.984", assay: "100.43", id: "p1" },
                { name: "Precision-2", weight: "10.41", area: "5368.216", assay: "101.16", id: "p2" },
                { name: "Precision-3", weight: "10.98", area: "5576.019", assay: "99.62", id: "p3" },
                { name: "Precision-4", weight: "10.72", area: "5419.397", assay: "99.17", id: "p4" },
                { name: "Precision-5", weight: "10.32", area: "5211.439", assay: "99.07", id: "p5" },
                { name: "Precision-6", weight: "10.66", area: "5393.563", assay: "99.26", id: "p6" },
              ].map((row, idx) => (
                <tr key={idx}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell><DataField value={row.weight} name={`prec.${row.id}.weight`} /></TableCell>
                  {idx === 0 && <TableCell rowSpan={6}><DataField value="50" name="prec.spl.volume" /></TableCell>}
                  <TableCell><DataField value={row.area} name={`prec.${row.id}.area`} /></TableCell>
                  <TableCell><DataField value={row.assay} name={`prec.${row.id}.assay`} /></TableCell>
                </tr>
              ))}
              <tr>
                <TableCell colSpan={4} className="bg-gray-50 text-right font-bold">平均值 (%)</TableCell>
                <TableCell className="font-bold">
                  <DataField value="99.79" name="prec.avg_assay" />
                </TableCell>
              </tr>
              <tr>
                <TableCell colSpan={4} className="bg-gray-50 text-right font-bold">RSD% (n=6)</TableCell>
                <TableCell className="font-bold">
                  <DataField value="0.84" name="prec.rsd" />
                </TableCell>
              </tr>
              <tr>
                <TableCell className="bg-gray-50 font-bold">可接受标准</TableCell>
                <TableCell colSpan={4} align="left">6份精密度溶液主成分含量RSD≤ 2.0%</TableCell>
              </tr>
              <tr>
                <TableCell className="bg-gray-100 font-bold">结论</TableCell>
                <TableCell colSpan={4} className="text-green-700 font-bold">
                  <DataField value="符合规定" name="prec.conclusion" />
                </TableCell>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. 准确度 Accuracy */}
      <section className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center gap-2 mb-6 border-b pb-2">
          <ChevronRight className="text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">准确度 Accuracy</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-400 text-sm">
            <tbody>
              <tr>
                <TableCell className="bg-gray-50 font-bold" colSpan={9}>准确度</TableCell>
              </tr>
              <tr>
                <TableCell className="bg-gray-50 font-bold" colSpan={9}>
                  序列号：<DataField value="20240909" name="acc.sequence_id" />
                </TableCell>
              </tr>
              <tr>
                <TableCell className="bg-gray-50 font-bold" colSpan={2}>线性方程</TableCell>
                <TableCell>斜率 (a)</TableCell>
                <TableCell><DataField value="25.4869" name="acc.slope_a" /></TableCell>
                <TableCell>截距 (b)</TableCell>
                <TableCell><DataField value="-17.1752" name="acc.intercept_b" /></TableCell>
                <TableCell className="bg-gray-50 font-bold" colSpan={2}>精密度项下平均含量 (%)</TableCell>
                <TableCell><DataField value="99.79" name="acc.prec_avg_assay" /></TableCell>
              </tr>
              <tr className="bg-gray-100">
                <TableHeader>样品名</TableHeader>
                <TableHeader>称样量 (mg)</TableHeader>
                <TableHeader>稀释体积 (ml)</TableHeader>
                <TableHeader>峰面积 (mAU*s)</TableHeader>
                <TableHeader>测定浓度 (μg/ml)</TableHeader>
                <TableHeader>测定量 (μg)</TableHeader>
                <TableHeader>理论量 (μg)</TableHeader>
                <TableHeader>回收率 (%)</TableHeader>
                <TableHeader>RSD (%)</TableHeader>
              </tr>
              {[
                { name: "Precision-1", weight: "10.46", area: "5354.984", detConc: "210.78", detQty: "10539.05", theoQty: "10437.63", rec: "100.97", id: "p1" },
                { name: "Precision-2", weight: "10.41", area: "5368.216", detConc: "211.30", detQty: "10565.01", theoQty: "10387.74", rec: "101.71", id: "p2" },
                { name: "Precision-3", weight: "10.98", area: "5576.019", detConc: "219.45", detQty: "10972.68", theoQty: "10956.52", rec: "100.15", id: "p3" },
                { name: "Precision-4", weight: "10.72", area: "5419.397", detConc: "213.31", detQty: "10665.42", theoQty: "10697.07", rec: "99.70", id: "p4" },
                { name: "Precision-5", weight: "10.32", area: "5211.439", detConc: "205.15", detQty: "10257.45", theoQty: "10297.93", rec: "99.61", id: "p5" },
                { name: "Precision-6", weight: "10.66", area: "5393.563", detConc: "212.29", detQty: "10614.74", theoQty: "10637.20", rec: "99.79", id: "p6" },
              ].map((row, idx) => (
                <tr key={idx}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell><DataField value={row.weight} name={`acc.${row.id}.weight`} /></TableCell>
                  {idx === 0 && <TableCell rowSpan={6}><DataField value="50" name="acc.spl.volume" /></TableCell>}
                  <TableCell><DataField value={row.area} name={`acc.${row.id}.area`} /></TableCell>
                  <TableCell><DataField value={row.detConc} name={`acc.${row.id}.det_conc`} /></TableCell>
                  <TableCell><DataField value={row.detQty} name={`acc.${row.id}.det_qty`} /></TableCell>
                  <TableCell><DataField value={row.theoQty} name={`acc.${row.id}.theo_qty`} /></TableCell>
                  <TableCell><DataField value={row.rec} name={`acc.${row.id}.recovery`} /></TableCell>
                  {idx === 0 && <TableCell rowSpan={6}><DataField value="0.84" name="acc.rsd" /></TableCell>}
                </tr>
              ))}
              <tr>
                <TableCell className="bg-gray-50 font-bold">可接受标准</TableCell>
                <TableCell colSpan={8} align="left">主成分回收率均应在98.0%-102.0%范围内，RSD≤ 2.0%。</TableCell>
              </tr>
              <tr>
                <TableCell className="bg-gray-100 font-bold">结论</TableCell>
                <TableCell colSpan={8} className="text-green-700 font-bold">
                  <DataField value="符合规定" name="acc.conclusion" />
                </TableCell>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. 溶液稳定性 Solution Stability */}
      <section className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center gap-2 mb-6 border-b pb-2">
          <ChevronRight className="text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">溶液稳定性 Solution Stability</h2>
        </div>
        <div className="space-y-8">
          {/* Standard Solution Stability */}
          <div>
            <h3 className="text-xs font-bold bg-blue-50 p-2 border-l-4 border-blue-500 mb-2 flex items-center justify-between">
              <span>对照品溶液 (5℃±3℃)</span>
              <span className="text-[10px] text-gray-400 font-normal italic">Sequence ID: <DataField value="20240909" name="stab.std.sequence_id" /></span>
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-400 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <TableHeader>考察时间 (h)</TableHeader>
                    <TableHeader>峰面积 (mAU*s)</TableHeader>
                    <TableHeader>回收率 (%)</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <TableCell><DataField value="0" name="stab.std.h0.time" /></TableCell>
                    <TableCell><DataField value="5212.52" name="stab.std.h0.area" /></TableCell>
                    <TableCell>-</TableCell>
                  </tr>
                  <tr>
                    <TableCell><DataField value="4" name="stab.std.h4.time" /></TableCell>
                    <TableCell><DataField value="5223.806" name="stab.std.h4.area" /></TableCell>
                    <TableCell><DataField value="100.22" name="stab.std.h4.recovery" /></TableCell>
                  </tr>
                  <tr>
                    <TableCell><DataField value="10" name="stab.std.h10.time" /></TableCell>
                    <TableCell><DataField value="5204.029" name="stab.std.h10.area" /></TableCell>
                    <TableCell><DataField value="99.84" name="stab.std.h10.recovery" /></TableCell>
                  </tr>
                  <tr>
                    <TableCell><DataField value="16" name="stab.std.h16.time" /></TableCell>
                    <TableCell><DataField value="5219.927" name="stab.std.h16.area" /></TableCell>
                    <TableCell><DataField value="100.14" name="stab.std.h16.recovery" /></TableCell>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Sample Solution Stability */}
          <div>
            <h3 className="text-xs font-bold bg-blue-50 p-2 border-l-4 border-blue-500 mb-2 flex items-center justify-between">
              <span>供试品溶液 (5℃±3℃)</span>
              <span className="text-[10px] text-gray-400 font-normal italic">Sequence ID: <DataField value="20240909" name="stab.spl.sequence_id" /></span>
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-400 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <TableHeader>考察时间 (h)</TableHeader>
                    <TableHeader>峰面积 (mAU*s)</TableHeader>
                    <TableHeader>回收率 (%)</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <TableCell><DataField value="0" name="stab.spl.h0.time" /></TableCell>
                    <TableCell><DataField value="5201.603" name="stab.spl.h0.area" /></TableCell>
                    <TableCell>-</TableCell>
                  </tr>
                  <tr>
                    <TableCell><DataField value="6" name="stab.spl.h6.time" /></TableCell>
                    <TableCell><DataField value="5173.402" name="stab.spl.h6.area" /></TableCell>
                    <TableCell><DataField value="99.46" name="stab.spl.h6.recovery" /></TableCell>
                  </tr>
                  <tr>
                    <TableCell><DataField value="12" name="stab.spl.h12.time" /></TableCell>
                    <TableCell><DataField value="5174.082" name="stab.spl.h12.area" /></TableCell>
                    <TableCell><DataField value="99.47" name="stab.spl.h12.recovery" /></TableCell>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <table className="w-full border-collapse border border-gray-400 text-sm">
            <tbody>
              <tr>
                <TableCell className="bg-gray-50 font-bold w-32">可接受标准</TableCell>
                <TableCell align="left" className="whitespace-pre-wrap" colSpan={2}>
                  供试品溶液在5±3℃条件下，密闭保存，分别于0h、12h、24h、36h进样，考察HY130225的峰面积，与0h相比，HY130225峰面积的回收率应在98.0%~102.0%之间。{"\n"}
                  对照品溶液在5±3℃条件下，密闭保存，分别于0h、12h、24h、36h进样，考察HY130225的峰面积，与0h相比，HY130225峰面积的回收率应在98.0%~102.0%之间。
                </TableCell>
              </tr>
              <tr>
                <TableCell className="bg-gray-100 font-bold" colSpan={1}>结论</TableCell>
                <TableCell align="left" className="text-green-700 font-bold" colSpan={2}>
                  <DataField value="供试品溶液在5±3℃条件下，密闭保存12h稳定；对照品溶液在5±3℃条件下，密闭保存16h稳定。" name="stab.conclusion" />
                </TableCell>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
