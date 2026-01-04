
import React, { useState } from 'react';
import { FileSpreadsheet, ChevronRight, Copy } from 'lucide-react';
import { ExperimentalDataState, LinearityDataRow, PrecisionDataRow, AccuracyDataRow, StabilityPoint } from '../types';

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

// Editable Data Field Component
const EditableDataField = ({ 
  value, 
  onChange, 
  name, 
  className = "" 
}: { 
  value: string; 
  onChange: (val: string) => void; 
  name: string;
  className?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(name).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error("Copy failed", err);
    });
  };

  return (
    <div className="relative inline-block w-full group">
       <input 
         type="text"
         value={value}
         onChange={(e) => onChange(e.target.value)}
         onClick={handleClick}
         className={`w-full bg-transparent border-b border-dotted border-blue-300 outline-none focus:border-blue-600 text-blue-900 transition-all text-center hover:bg-blue-50 hover:border-blue-500 cursor-pointer ${className}`}
         title={`Click to copy variable: ${name}`}
       />
      {copied && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap z-50 animate-in fade-in slide-in-from-bottom-1 pointer-events-none">
          已复制: {name}
        </span>
      )}
    </div>
  );
};

// Editable Data TextArea Component
const EditableDataTextArea = ({ 
  value, 
  onChange, 
  name, 
  className = "",
  minHeight = "4rem"
}: { 
  value: string; 
  onChange: (val: string) => void; 
  name: string;
  className?: string;
  minHeight?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(name).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error("Copy failed", err);
    });
  };

  return (
    <div className="relative block w-full h-full group">
       <textarea 
         value={value}
         onChange={(e) => onChange(e.target.value)}
         onClick={handleClick}
         className={`w-full h-full bg-transparent border border-dotted border-blue-300 rounded outline-none focus:border-blue-600 text-blue-900 transition-all text-left p-2 hover:bg-blue-50 hover:border-blue-500 cursor-pointer resize-none font-medium text-sm ${className}`}
         style={{ minHeight }}
         title={`Click to copy variable: ${name}`}
       />
      {copied && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap z-50 animate-in fade-in slide-in-from-bottom-1 pointer-events-none">
          已复制: {name}
        </span>
      )}
    </div>
  );
};

// SVG Linearity Chart Component
export const LinearityChart = ({ rows, equation, statsR, productId }: { rows: LinearityDataRow[], equation: string, statsR?: string, productId?: string }) => {
  // Extract Data Points
  const data = rows.map(r => ({
    x: parseFloat(r.conc) || 0,
    y: parseFloat(r.area) || 0
  })).filter(p => p.x > 0 && p.y > 0);

  if (data.length < 2) return <div className="text-center p-4 text-gray-500">Insufficient data for chart</div>;

  // Chart Dimensions
  const width = 600;
  const height = 350;
  const padding = 60;

  // Calculate Scales dynamically
  const xValues = data.map(d => d.x);
  const yValues = data.map(d => d.y);
  
  const xMinVal = Math.min(...xValues);
  const xMaxVal = Math.max(...xValues);
  const yMinVal = Math.min(...yValues);
  const yMaxVal = Math.max(...yValues);

  // Helper to calculate nice ticks for axes
  const calculateTicks = (min: number, max: number) => {
    const range = max - min;
    const roughStep = range / 5;
    const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
    const normalizedStep = roughStep / magnitude;
    
    let step;
    if (normalizedStep < 1.5) step = 1 * magnitude;
    else if (normalizedStep < 3) step = 2 * magnitude;
    else if (normalizedStep < 7) step = 5 * magnitude;
    else step = 10 * magnitude;

    // Expand range to encompass nice ticks
    const niceMin = Math.floor(min / step) * step;
    const niceMax = Math.ceil(max / step) * step;
    
    // Generate ticks
    const ticks = [];
    for (let t = niceMin; t <= niceMax + step * 0.1; t += step) {
        ticks.push(t);
    }
    
    return { min: niceMin, max: niceMax < max ? niceMax + step : niceMax, ticks };
  };

  const xInfo = calculateTicks(xMinVal * 0.95, xMaxVal * 1.05);
  const yInfo = calculateTicks(yMinVal * 0.95, yMaxVal * 1.05);

  const xScale = (val: number) => ((val - xInfo.min) / (xInfo.max - xInfo.min)) * (width - 2 * padding) + padding;
  const yScale = (val: number) => height - padding - ((val - yInfo.min) / (yInfo.max - yInfo.min)) * (height - 2 * padding);

  // Parse Slope and Intercept from equation string
  let slope = 0;
  let intercept = 0;
  try {
     const cleanEq = equation.replace(/\s/g, '').toLowerCase();
     const parts = cleanEq.split('x');
     if(parts.length === 2) {
       slope = parseFloat(parts[0].replace('y=', ''));
       intercept = parseFloat(parts[1]);
     }
  } catch (e) { }

  // Linear Regression Line Points
  const lineStart = { x: xInfo.min, y: slope * xInfo.min + intercept };
  const lineEnd = { x: xInfo.max, y: slope * xInfo.max + intercept };

  // Calculate R squared
  const rVal = parseFloat(statsR || "0");
  const r2 = (rVal * rVal).toFixed(4);

  return (
    <div className="w-full flex justify-center py-4 bg-white">
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="max-w-2xl overflow-visible font-sans">
        {/* Title */}
        <text x={width / 2} y={30} textAnchor="middle" fontSize="18" fontWeight="bold" fill="black">
          Linearity of {productId || "Product"}
        </text>

        {/* Y Axis Grid & Labels */}
        {yInfo.ticks.map(tick => (
            <g key={`y-${tick}`}>
                <line x1={padding} y1={yScale(tick)} x2={padding - 5} y2={yScale(tick)} stroke="black" strokeWidth="1" />
                <text x={padding - 8} y={yScale(tick)} dy="0.32em" textAnchor="end" fontSize="12" fill="#555">
                    {tick.toFixed(3)}
                </text>
            </g>
        ))}

        {/* X Axis Grid & Labels */}
        {xInfo.ticks.map(tick => (
            <g key={`x-${tick}`}>
                <line x1={xScale(tick)} y1={height - padding} x2={xScale(tick)} y2={height - padding + 5} stroke="black" strokeWidth="1" />
                <text x={xScale(tick)} y={height - padding + 20} textAnchor="middle" fontSize="12" fill="#555">
                    {tick.toFixed(3)}
                </text>
            </g>
        ))}

        {/* Axes Lines */}
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="black" strokeWidth="1" />
        <line x1={padding} y1={height - padding} x2={padding} y2={padding} stroke="black" strokeWidth="1" />

        {/* Axis Titles */}
        <text x={width - padding} y={height - 10} textAnchor="end" fontSize="12" fontWeight="bold">concentration (µg/ml)</text>
        <text x={15} y={height / 2} textAnchor="middle" transform={`rotate(-90, 15, ${height / 2})`} fontSize="12" fontWeight="bold">peak area(mAU*s)</text>

        {/* Regression Line */}
        {slope !== 0 && (
          <line 
            x1={xScale(lineStart.x)} 
            y1={yScale(lineStart.y)} 
            x2={xScale(lineEnd.x)} 
            y2={yScale(lineEnd.y)} 
            stroke="#4b5563" 
            strokeWidth="1.5" 
          />
        )}

        {/* Data Points */}
        {data.map((d, i) => (
          <g key={i}>
             <polygon 
                points={`${xScale(d.x)},${yScale(d.y)-4} ${xScale(d.x)+4},${yScale(d.y)} ${xScale(d.x)},${yScale(d.y)+4} ${xScale(d.x)-4},${yScale(d.y)}`} 
                fill="#3b82f6" 
                stroke="#1d4ed8"
                strokeWidth="1"
             />
          </g>
        ))}

        {/* Equation & R2 */}
        <text x={width * 0.65} y={padding + 30} textAnchor="middle" fontSize="12" fill="black" fontWeight="normal">
          {equation}
        </text>
        <text x={width * 0.65} y={padding + 46} textAnchor="middle" fontSize="12" fill="black" fontWeight="normal">
          R² = {r2}
        </text>
      </svg>
    </div>
  );
};

interface DocumentPageProps {
  data: ExperimentalDataState;
  setData: React.Dispatch<React.SetStateAction<ExperimentalDataState>>;
  productId?: string;
}

export const DocumentPage: React.FC<DocumentPageProps> = ({ data, setData, productId }) => {

  // Generic updater for nested objects
  const updateNested = (section: keyof ExperimentalDataState, key: string, value: string) => {
    setData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  // Updater for nested arrays (e.g., injections)
  const updateArrayItem = (section: keyof ExperimentalDataState, arrayName: string, index: number, field: string, value: string) => {
    setData(prev => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newArray = [...(prev[section] as any)[arrayName]];
        newArray[index] = { ...newArray[index], [field]: value };
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [arrayName]: newArray
          }
        };
    });
  };

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
                  序列号：<EditableDataField value={data.systemSuitability.sequenceId} onChange={(v) => updateNested('systemSuitability', 'sequenceId', v)} name="ss.sequence_id" className="w-32 inline-block" />
                </TableCell>
              </tr>
              <tr>
                <TableCell className="w-1/3" colSpan={2}>空白是否有干扰</TableCell>
                <TableCell colSpan={5} className="whitespace-pre-wrap">
                  <EditableDataField value={data.systemSuitability.blankInterference} onChange={(v) => updateNested('systemSuitability', 'blankInterference', v)} name="ss.blank_interference" className="text-left" />
                </TableCell>
              </tr>
              <tr>
                <TableCell colSpan={2}>
                  对照品溶液（第一针）理论板数
                </TableCell>
                <TableCell colSpan={5}>
                  <EditableDataField value={data.systemSuitability.theoreticalPlates} onChange={(v) => updateNested('systemSuitability', 'theoreticalPlates', v)} name="ss.std1_1.theoretical_plates" />
                </TableCell>
              </tr>
              <tr>
                <TableCell colSpan={2}>
                  对照品溶液（第一针）拖尾因子
                </TableCell>
                <TableCell colSpan={5}>
                  <EditableDataField value={data.systemSuitability.tailingFactor} onChange={(v) => updateNested('systemSuitability', 'tailingFactor', v)} name="ss.std1_1.tailing_factor" />
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
              {data.systemSuitability.std1Injections.map((inj, idx) => (
                <tr key={idx}>
                  {idx === 0 && <TableCell rowSpan={5}>STD1</TableCell>}
                  <TableCell>STD1-{idx + 1}</TableCell>
                  {idx === 0 && <TableCell rowSpan={5}><EditableDataField value={data.systemSuitability.std1Weight} onChange={(v) => updateNested('systemSuitability', 'std1Weight', v)} name="ss.std1.weight" /></TableCell>}
                  <TableCell>
                    <EditableDataField value={inj.peakArea} onChange={(v) => updateArrayItem('systemSuitability', 'std1Injections', idx, 'peakArea', v)} name={`ss.std1_${idx+1}.peak_area`} />
                  </TableCell>
                  <TableCell>
                    <EditableDataField value={inj.rt} onChange={(v) => updateArrayItem('systemSuitability', 'std1Injections', idx, 'rt', v)} name={`ss.std1_${idx+1}.rt`} />
                  </TableCell>
                  {idx === 0 && <TableCell rowSpan={5}><EditableDataField value={data.systemSuitability.std1AvgArea} onChange={(v) => updateNested('systemSuitability', 'std1AvgArea', v)} name="ss.std1.avg_peak_area" /></TableCell>}
                  {idx === 0 && <TableCell rowSpan={2}><EditableDataField value={data.systemSuitability.std1AreaRSD} onChange={(v) => updateNested('systemSuitability', 'std1AreaRSD', v)} name="ss.std1.area_rsd" /></TableCell>}
                  {idx === 2 && <TableCell className="bg-gray-50 font-bold text-[10px]">保留时间RSD (%)</TableCell>}
                  {idx === 3 && <TableCell rowSpan={2}><EditableDataField value={data.systemSuitability.std1RtRSD} onChange={(v) => updateNested('systemSuitability', 'std1RtRSD', v)} name="ss.std1.rt_rsd" /></TableCell>}
                </tr>
              ))}
              <tr>
                <TableCell colSpan={2} className="bg-gray-50 font-bold">STD2</TableCell>
                <TableCell>
                  <EditableDataField value={data.systemSuitability.std2Weight} onChange={(v) => updateNested('systemSuitability', 'std2Weight', v)} name="ss.std2.weight" />
                </TableCell>
                <TableCell>
                  <EditableDataField value={data.systemSuitability.std2PeakArea} onChange={(v) => updateNested('systemSuitability', 'std2PeakArea', v)} name="ss.std2.peak_area" />
                </TableCell>
                <TableCell>
                  <EditableDataField value={data.systemSuitability.std2Rt} onChange={(v) => updateNested('systemSuitability', 'std2Rt', v)} name="ss.std2.rt" />
                </TableCell>
                <TableCell className="bg-gray-50 font-bold">回收率 (%)</TableCell>
                <TableCell>
                  <EditableDataField value={data.systemSuitability.std2Recovery} onChange={(v) => updateNested('systemSuitability', 'std2Recovery', v)} name="ss.std2.recovery_rate" />
                </TableCell>
              </tr>
              <tr>
                <TableCell colSpan={2} className="bg-gray-100 font-bold">随行对照</TableCell>
                <TableCell className="bg-gray-50 text-center">-</TableCell>
                <TableHeader colSpan={2}>峰面积 (mAU*s)</TableHeader>
                <TableHeader colSpan={2}>RSD (%)</TableHeader>
              </tr>
              {data.systemSuitability.controls.map((ctrl, idx) => (
                <tr key={idx}>
                  <TableCell colSpan={2}>
                    <EditableDataField value={ctrl.name} onChange={(v) => updateArrayItem('systemSuitability', 'controls', idx, 'name', v)} name={`ss.control_${idx}.name`} />
                  </TableCell>
                  {idx === 0 && <TableCell rowSpan={3} className="bg-gray-50 text-center">-</TableCell>}
                  <TableCell colSpan={2}>
                    <EditableDataField value={ctrl.peakArea} onChange={(v) => updateArrayItem('systemSuitability', 'controls', idx, 'peakArea', v)} name={`ss.control_${idx}.peak_area`} />
                  </TableCell>
                  <TableCell colSpan={2}>
                    <EditableDataField value={ctrl.rsd} onChange={(v) => updateArrayItem('systemSuitability', 'controls', idx, 'rsd', v)} name={`ss.control_${idx}.rsd`} />
                  </TableCell>
                </tr>
              ))}
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
                  <EditableDataField value={data.systemSuitability.conclusion} onChange={(v) => updateNested('systemSuitability', 'conclusion', v)} name="ss.conclusion" />
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
                  序列号：<EditableDataField value={data.specificity.sequenceId} onChange={(v) => updateNested('specificity', 'sequenceId', v)} name="spec.sequence_id" className="w-32 inline-block" />
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
                  <EditableDataField value={data.specificity.stdRt} onChange={(v) => updateNested('specificity', 'stdRt', v)} name="spec.std.rt" />
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
              </tr>
              <tr>
                <TableCell>供试品溶液</TableCell>
                <TableCell>
                  <EditableDataField value={data.specificity.sampleRt} onChange={(v) => updateNested('specificity', 'sampleRt', v)} name="spec.sample.rt" />
                </TableCell>
                <TableCell>
                  <EditableDataField value={data.specificity.rtDeviation} onChange={(v) => updateNested('specificity', 'rtDeviation', v)} name="spec.sample.rt_deviation" />
                </TableCell>
                <TableCell>
                  <EditableDataField value={data.specificity.peakPurity} onChange={(v) => updateNested('specificity', 'peakPurity', v)} name="spec.sample.peak_purity" />
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
                  <EditableDataField value={data.specificity.conclusion} onChange={(v) => updateNested('specificity', 'conclusion', v)} name="spec.conclusion" />
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
                  序列号：<EditableDataField value={data.linearity.sequenceId} onChange={(v) => updateNested('linearity', 'sequenceId', v)} name="lin.sequence_id" className="w-32 inline-block" />
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
              {data.linearity.rows.map((row, idx) => (
                <tr key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell><EditableDataField value={row.level} onChange={(v) => updateArrayItem('linearity', 'rows', idx, 'level', v)} name={`lin.${row.id}.level`} /></TableCell>
                  <TableCell><EditableDataField value={row.weight} onChange={(v) => updateArrayItem('linearity', 'rows', idx, 'weight', v)} name={`lin.${row.id}.weight`} /></TableCell>
                  {idx === 0 && <TableCell rowSpan={4}><EditableDataField value={data.linearity.dilutionX1} onChange={(v) => updateNested('linearity', 'dilutionX1', v)} name="lin.dilution_x1" /></TableCell>}
                  {idx === 4 && <TableCell><EditableDataField value={data.linearity.dilutionX2} onChange={(v) => updateNested('linearity', 'dilutionX2', v)} name="lin.dilution_x2" /></TableCell>}
                  {idx === 0 && <TableCell rowSpan={5}><EditableDataField value={data.linearity.assayValue} onChange={(v) => updateNested('linearity', 'assayValue', v)} name="lin.assay_value" /></TableCell>}
                  <TableCell><EditableDataField value={row.conc} onChange={(v) => updateArrayItem('linearity', 'rows', idx, 'conc', v)} name={`lin.${row.id}.conc`} /></TableCell>
                  <TableCell><EditableDataField value={row.area} onChange={(v) => updateArrayItem('linearity', 'rows', idx, 'area', v)} name={`lin.${row.id}.area`} /></TableCell>
                  <TableCell><EditableDataField value={row.actualLevel} onChange={(v) => updateArrayItem('linearity', 'rows', idx, 'actualLevel', v)} name={`lin.${row.id}.actual_level`} /></TableCell>
                </tr>
              ))}
              {/* Regression Summary */}
              <tr>
                <TableCell colSpan={5} className="bg-gray-50 text-right font-bold italic">n =</TableCell>
                <TableCell colSpan={3}><EditableDataField value={data.linearity.statsN} onChange={(v) => updateNested('linearity', 'statsN', v)} name="lin.stats.n" /></TableCell>
              </tr>
              <tr>
                <TableCell colSpan={5} className="bg-gray-50 text-right font-bold italic">correlation coefficient (r)</TableCell>
                <TableCell colSpan={3}><EditableDataField value={data.linearity.statsR} onChange={(v) => updateNested('linearity', 'statsR', v)} name="lin.stats.correlation_r" /></TableCell>
              </tr>
              <tr>
                <TableCell colSpan={5} className="bg-gray-50 text-right font-bold italic">slope (a)</TableCell>
                <TableCell colSpan={3}><EditableDataField value={data.linearity.statsSlope} onChange={(v) => updateNested('linearity', 'statsSlope', v)} name="lin.stats.slope_a" /></TableCell>
              </tr>
              <tr>
                <TableCell colSpan={5} className="bg-gray-50 text-right font-bold italic">y-intercept (b)</TableCell>
                <TableCell colSpan={3}><EditableDataField value={data.linearity.statsIntercept} onChange={(v) => updateNested('linearity', 'statsIntercept', v)} name="lin.stats.intercept_b" /></TableCell>
              </tr>
              <tr>
                <TableCell colSpan={5} className="bg-gray-50 text-right font-bold italic">% y-intercept</TableCell>
                <TableCell colSpan={3}><EditableDataField value={data.linearity.statsPercentIntercept} onChange={(v) => updateNested('linearity', 'statsPercentIntercept', v)} name="lin.stats.percent_intercept" /></TableCell>
              </tr>
              <tr>
                <TableCell colSpan={5} className="bg-gray-50 text-right font-bold italic">RSS (Residual sum of square)</TableCell>
                <TableCell colSpan={3}><EditableDataField value={data.linearity.statsRSS} onChange={(v) => updateNested('linearity', 'statsRSS', v)} name="lin.stats.rss" /></TableCell>
              </tr>
              <tr>
                <TableCell colSpan={5} className="bg-gray-50 text-right font-bold italic">Equation</TableCell>
                <TableCell colSpan={3}><EditableDataField value={data.linearity.equation} onChange={(v) => updateNested('linearity', 'equation', v)} name="lin.equation" /></TableCell>
              </tr>
              
              {/* Inserted Chart Row */}
              <tr>
                <TableCell colSpan={8} className="p-0 border border-gray-400">
                  <LinearityChart 
                    rows={data.linearity.rows} 
                    equation={data.linearity.equation} 
                    statsR={data.linearity.statsR}
                    productId={productId}
                  />
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
                  <EditableDataField value={data.linearity.conclusion} onChange={(v) => updateNested('linearity', 'conclusion', v)} name="lin.conclusion" />
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
                  序列号：<EditableDataField value={data.precision.sequenceId} onChange={(v) => updateNested('precision', 'sequenceId', v)} name="prec.sequence_id" className="w-32 inline-block" />
                </TableCell>
              </tr>
              <tr className="bg-gray-100">
                <TableHeader>对照品称样量 (mg)</TableHeader>
                <TableHeader>含量</TableHeader>
                <TableHeader>稀释体积 (ml)</TableHeader>
                <TableHeader colSpan={2}>对照品溶液平均峰面积 (mAU*s)</TableHeader>
              </tr>
              <tr>
                <TableCell><EditableDataField value={data.precision.stdWeight} onChange={(v) => updateNested('precision', 'stdWeight', v)} name="prec.std.weight" /></TableCell>
                <TableCell><EditableDataField value={data.precision.stdAssay} onChange={(v) => updateNested('precision', 'stdAssay', v)} name="prec.std.assay" /></TableCell>
                <TableCell><EditableDataField value={data.precision.stdVolume} onChange={(v) => updateNested('precision', 'stdVolume', v)} name="prec.std.volume" /></TableCell>
                <TableCell colSpan={2}><EditableDataField value={data.precision.stdAvgArea} onChange={(v) => updateNested('precision', 'stdAvgArea', v)} name="prec.std.avg_area" /></TableCell>
              </tr>
              <tr className="bg-gray-100">
                <TableHeader>样品名</TableHeader>
                <TableHeader>称样量 (mg)</TableHeader>
                <TableHeader>稀释体积 (ml)</TableHeader>
                <TableHeader>峰面积 (mAU*s)</TableHeader>
                <TableHeader>含量 (%)</TableHeader>
              </tr>
              {data.precision.rows.map((row, idx) => (
                <tr key={idx}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell><EditableDataField value={row.weight} onChange={(v) => updateArrayItem('precision', 'rows', idx, 'weight', v)} name={`prec.${row.id}.weight`} /></TableCell>
                  {idx === 0 && <TableCell rowSpan={6}><EditableDataField value={data.precision.splVolume} onChange={(v) => updateNested('precision', 'splVolume', v)} name="prec.spl.volume" /></TableCell>}
                  <TableCell><EditableDataField value={row.area} onChange={(v) => updateArrayItem('precision', 'rows', idx, 'area', v)} name={`prec.${row.id}.area`} /></TableCell>
                  <TableCell><EditableDataField value={row.assay} onChange={(v) => updateArrayItem('precision', 'rows', idx, 'assay', v)} name={`prec.${row.id}.assay`} /></TableCell>
                </tr>
              ))}
              <tr>
                <TableCell colSpan={4} className="bg-gray-50 text-right font-bold">平均值 (%)</TableCell>
                <TableCell className="font-bold">
                  <EditableDataField value={data.precision.avgAssay} onChange={(v) => updateNested('precision', 'avgAssay', v)} name="prec.avg_assay" />
                </TableCell>
              </tr>
              <tr>
                <TableCell colSpan={4} className="bg-gray-50 text-right font-bold">RSD% (n=6)</TableCell>
                <TableCell className="font-bold">
                  <EditableDataField value={data.precision.rsd} onChange={(v) => updateNested('precision', 'rsd', v)} name="prec.rsd" />
                </TableCell>
              </tr>
              <tr>
                <TableCell className="bg-gray-50 font-bold">可接受标准</TableCell>
                <TableCell colSpan={4} align="left">6份精密度溶液主成分含量RSD≤ 2.0%</TableCell>
              </tr>
              <tr>
                <TableCell className="bg-gray-100 font-bold">结论</TableCell>
                <TableCell colSpan={4} className="text-green-700 font-bold">
                  <EditableDataField value={data.precision.conclusion} onChange={(v) => updateNested('precision', 'conclusion', v)} name="prec.conclusion" />
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
                  序列号：<EditableDataField value={data.accuracy.sequenceId} onChange={(v) => updateNested('accuracy', 'sequenceId', v)} name="acc.sequence_id" className="w-32 inline-block" />
                </TableCell>
              </tr>
              <tr>
                <TableCell className="bg-gray-50 font-bold" colSpan={2}>线性方程</TableCell>
                <TableCell>斜率 (a)</TableCell>
                <TableCell><EditableDataField value={data.accuracy.slope} onChange={(v) => updateNested('accuracy', 'slope', v)} name="acc.slope_a" /></TableCell>
                <TableCell>截距 (b)</TableCell>
                <TableCell><EditableDataField value={data.accuracy.intercept} onChange={(v) => updateNested('accuracy', 'intercept', v)} name="acc.intercept_b" /></TableCell>
                <TableCell className="bg-gray-50 font-bold" colSpan={2}>精密度项下平均含量 (%)</TableCell>
                <TableCell><EditableDataField value={data.accuracy.precAvgAssay} onChange={(v) => updateNested('accuracy', 'precAvgAssay', v)} name="acc.prec_avg_assay" /></TableCell>
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
              {data.accuracy.rows.map((row, idx) => (
                <tr key={idx}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell><EditableDataField value={row.weight} onChange={(v) => updateArrayItem('accuracy', 'rows', idx, 'weight', v)} name={`acc.${row.id}.weight`} /></TableCell>
                  {idx === 0 && <TableCell rowSpan={6}><EditableDataField value={data.accuracy.splVolume} onChange={(v) => updateNested('accuracy', 'splVolume', v)} name="acc.spl.volume" /></TableCell>}
                  <TableCell><EditableDataField value={row.area} onChange={(v) => updateArrayItem('accuracy', 'rows', idx, 'area', v)} name={`acc.${row.id}.area`} /></TableCell>
                  <TableCell><EditableDataField value={row.detConc} onChange={(v) => updateArrayItem('accuracy', 'rows', idx, 'detConc', v)} name={`acc.${row.id}.det_conc`} /></TableCell>
                  <TableCell><EditableDataField value={row.detQty} onChange={(v) => updateArrayItem('accuracy', 'rows', idx, 'detQty', v)} name={`acc.${row.id}.det_qty`} /></TableCell>
                  <TableCell><EditableDataField value={row.theoQty} onChange={(v) => updateArrayItem('accuracy', 'rows', idx, 'theoQty', v)} name={`acc.${row.id}.theo_qty`} /></TableCell>
                  <TableCell><EditableDataField value={row.rec} onChange={(v) => updateArrayItem('accuracy', 'rows', idx, 'rec', v)} name={`acc.${row.id}.recovery`} /></TableCell>
                  {idx === 0 && <TableCell rowSpan={6}><EditableDataField value={data.accuracy.rsd} onChange={(v) => updateNested('accuracy', 'rsd', v)} name="acc.rsd" /></TableCell>}
                </tr>
              ))}
              <tr>
                <TableCell className="bg-gray-50 font-bold">可接受标准</TableCell>
                <TableCell colSpan={8} align="left">主成分回收率均应在98.0%-102.0%范围内，RSD≤ 2.0%。</TableCell>
              </tr>
              <tr>
                <TableCell className="bg-gray-100 font-bold">结论</TableCell>
                <TableCell colSpan={8} className="text-green-700 font-bold">
                  <EditableDataField value={data.accuracy.conclusion} onChange={(v) => updateNested('accuracy', 'conclusion', v)} name="acc.conclusion" />
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
          
          {/* Table 6: Standard Solution Stability */}
          <div>
            <div className="mb-2">
                <div className="font-bold text-sm bg-gray-50 p-1 border-t border-l border-r border-gray-400">
                    溶液稳定性
                </div>
                <div className="font-bold text-sm bg-gray-50 p-1 border border-gray-400">
                    表 6 对照品溶液稳定性结果<br/>
                    <span className="font-normal text-xs">Table 6 Stability Results of Standard Solution</span>
                </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-400 text-sm text-center">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-400 p-2">时间（h）<br/><span className="text-xs font-normal">Time（h）</span></th>
                    <th className="border border-gray-400 p-2">峰面积（mAU *s）<br/><span className="text-xs font-normal">Area（mAU *s）</span></th>
                    <th className="border border-gray-400 p-2">回收率（%）<br/><span className="text-xs font-normal">Recovery（%）</span></th>
                  </tr>
                </thead>
                <tbody>
                  {data.stability.stdPoints.map((pt, idx) => (
                    <tr key={idx}>
                      <TableCell><EditableDataField value={pt.time} onChange={(v) => updateArrayItem('stability', 'stdPoints', idx, 'time', v)} name={`stab.std.h${pt.time}.time`} /></TableCell>
                      <TableCell><EditableDataField value={pt.area} onChange={(v) => updateArrayItem('stability', 'stdPoints', idx, 'area', v)} name={`stab.std.h${pt.time}.area`} /></TableCell>
                      <TableCell><EditableDataField value={pt.recovery} onChange={(v) => updateArrayItem('stability', 'stdPoints', idx, 'recovery', v)} name={`stab.std.h${pt.time}.recovery`} /></TableCell>
                    </tr>
                  ))}
                  {/* Acceptance Criteria for Table 6 */}
                  <tr>
                    <td className="border border-gray-400 p-2 bg-gray-50 font-bold align-top text-left w-32">
                        可接受标准<br/><span className="text-xs font-normal">Acceptance criteria</span>
                    </td>
                    <td className="border border-gray-400 p-2 text-left whitespace-pre-wrap leading-relaxed" colSpan={2}>
                        <EditableDataTextArea 
                            value={data.stability.stdAcceptanceCriteria}
                            onChange={(v) => updateNested('stability', 'stdAcceptanceCriteria', v)}
                            name="stab.std.acceptance_criteria"
                            minHeight="8rem"
                        />
                    </td>
                  </tr>
                  {/* Conclusion for Table 6 */}
                  <tr>
                    <td className="border border-gray-400 p-2 bg-gray-50 font-bold align-top text-left">
                        结论 Conclusion
                    </td>
                    <td className="border border-gray-400 p-2 text-left font-bold text-green-700 whitespace-pre-wrap leading-relaxed" colSpan={2}>
                        <EditableDataTextArea 
                            value={data.stability.stdConclusion}
                            onChange={(v) => updateNested('stability', 'stdConclusion', v)}
                            name="stab.std.conclusion"
                            className="text-green-700 font-bold"
                            minHeight="4rem"
                        />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Table 7: Sample Solution Stability */}
          <div>
            <div className="mb-2">
                <div className="font-bold text-sm bg-gray-50 p-1 border border-gray-400">
                    表 7 供试品溶液稳定性结果<br/>
                    <span className="font-normal text-xs">Table 7 Stability Results of Sample Solution</span>
                </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-400 text-sm text-center">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-400 p-2">时间（h）<br/><span className="text-xs font-normal">Time（h）</span></th>
                    <th className="border border-gray-400 p-2">峰面积（mAU *s）<br/><span className="text-xs font-normal">Area（mAU *s）</span></th>
                    <th className="border border-gray-400 p-2">回收率（%）<br/><span className="text-xs font-normal">Recovery（%）</span></th>
                  </tr>
                </thead>
                <tbody>
                  {data.stability.splPoints.map((pt, idx) => (
                    <tr key={idx}>
                      <TableCell><EditableDataField value={pt.time} onChange={(v) => updateArrayItem('stability', 'splPoints', idx, 'time', v)} name={`stab.spl.h${pt.time}.time`} /></TableCell>
                      <TableCell><EditableDataField value={pt.area} onChange={(v) => updateArrayItem('stability', 'splPoints', idx, 'area', v)} name={`stab.spl.h${pt.time}.area`} /></TableCell>
                      <TableCell><EditableDataField value={pt.recovery} onChange={(v) => updateArrayItem('stability', 'splPoints', idx, 'recovery', v)} name={`stab.spl.h${pt.time}.recovery`} /></TableCell>
                    </tr>
                  ))}
                  {/* Acceptance Criteria for Table 7 */}
                  <tr>
                    <td className="border border-gray-400 p-2 bg-gray-50 font-bold align-top text-left w-32">
                        可接受标准<br/><span className="text-xs font-normal">Acceptance criteria</span>
                    </td>
                    <td className="border border-gray-400 p-2 text-left whitespace-pre-wrap leading-relaxed" colSpan={2}>
                        <EditableDataTextArea 
                            value={data.stability.splAcceptanceCriteria}
                            onChange={(v) => updateNested('stability', 'splAcceptanceCriteria', v)}
                            name="stab.spl.acceptance_criteria"
                            minHeight="8rem"
                        />
                    </td>
                  </tr>
                  {/* Conclusion for Table 7 (Using global conclusion field as primary) */}
                  <tr>
                    <td className="border border-gray-400 p-2 bg-gray-50 font-bold align-top text-left">
                        结论 Conclusion
                    </td>
                    <td className="border border-gray-400 p-2 text-left font-bold text-green-700 whitespace-pre-wrap leading-relaxed" colSpan={2}>
                        <EditableDataTextArea 
                            value={data.stability.conclusion}
                            onChange={(v) => updateNested('stability', 'conclusion', v)}
                            name="stab.spl.conclusion"
                            className="text-green-700 font-bold"
                            minHeight="4rem"
                        />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
