
import React, { useState } from 'react';
import { Search, Eye, ArrowLeft, FileText, MapPin, AlignLeft } from 'lucide-react';

interface MappingEntry {
  category: string;
  variableKey: string;
  source: string; // "Shared (Protocol)", "Report State", "Experimental Data", "Report Manual Input", "Derived"
  inputLocation: string; 
  description: string; 
  uiLabel: string; 
  location: string; 
  context: string; 
  example: string;
  formula?: string; // Optional formula for derived fields
}

const REPORT_MAPPINGS: MappingEntry[] = [
  // ==================================================================================
  // 0. HEADER & COVER
  // ==================================================================================
  { category: 'Header Info', variableKey: 'productId', source: 'Shared (Protocol)', inputLocation: 'Protocol Cover', description: 'Product Catalog Number', uiLabel: '标题/内容', location: 'Report Header', context: 'Report for Validation of [productId]...', example: 'HY130225' },
  { category: 'Header Info', variableKey: 'protocolCode', source: 'Shared (Protocol)', inputLocation: 'Protocol Cover', description: 'Protocol Code', uiLabel: '报告编号 (Code)', location: 'Report Header', context: 'AVR-[protocolCode]-...', example: 'A316' },
  { category: 'Header Info', variableKey: 'protocolVersion', source: 'Shared (Protocol)', inputLocation: 'Protocol Cover', description: 'Protocol Version', uiLabel: '报告编号 (Ver)', location: 'Report Header', context: '...-[protocolVersion]....', example: '02' },
  { category: 'Header Info', variableKey: 'projectNumber', source: 'Shared (Protocol)', inputLocation: 'Config', description: 'Project Number', uiLabel: '报告编号 (Proj)', location: 'Report Header', context: '... .[projectNumber]', example: '00' },
  { category: 'Header Info', variableKey: 'displayId', source: 'Shared (Protocol)', inputLocation: 'Protocol Cover', description: 'Display Product ID', uiLabel: '封面适用范围', location: 'Report Cover', context: '[displayId]含量和鉴别测定', example: 'HY130225' },
  
  // Signatures
  { category: 'Signatures', variableKey: 'preparer.name', source: 'Report State', inputLocation: 'Report Cover', description: 'Preparer Name', uiLabel: '报告起草人姓名', location: 'Cover Table', context: 'Prepared By: [name]', example: '龙慧' },
  { category: 'Signatures', variableKey: 'preparer.dept', source: 'Report State', inputLocation: 'Report Cover', description: 'Preparer Dept', uiLabel: '报告起草人部门', location: 'Cover Table', context: 'Dept: [dept]', example: 'QC' },
  { category: 'Signatures', variableKey: 'preparer.pos', source: 'Report State', inputLocation: 'Report Cover', description: 'Preparer Position', uiLabel: '报告起草人职位', location: 'Cover Table', context: 'Position: [pos]', example: 'QC Engineer' },
  
  { category: 'Signatures', variableKey: 'reviewers[i].name', source: 'Report State', inputLocation: 'Report Cover', description: 'Reviewer Name', uiLabel: '报告审核人姓名', location: 'Cover Table', context: 'Reviewed By: [name]', example: '李利娜' },
  { category: 'Signatures', variableKey: 'reviewers[i].dept', source: 'Report State', inputLocation: 'Report Cover', description: 'Reviewer Dept', uiLabel: '报告审核人部门', location: 'Cover Table', context: 'Dept: [dept]', example: 'QC' },
  { category: 'Signatures', variableKey: 'reviewers[i].pos', source: 'Report State', inputLocation: 'Report Cover', description: 'Reviewer Position', uiLabel: '报告审核人职位', location: 'Cover Table', context: 'Position: [pos]', example: 'Group Leader' },
  
  { category: 'Signatures', variableKey: 'approver.name', source: 'Report State', inputLocation: 'Report Cover', description: 'Approver Name', uiLabel: '报告批准人姓名', location: 'Cover Table', context: 'Approved By: [name]', example: '刘钟华' },
  { category: 'Signatures', variableKey: 'approver.dept', source: 'Report State', inputLocation: 'Report Cover', description: 'Approver Dept', uiLabel: '报告批准人部门', location: 'Cover Table', context: 'Dept: [dept]', example: 'QA' },
  { category: 'Signatures', variableKey: 'approver.pos', source: 'Report State', inputLocation: 'Report Cover', description: 'Approver Position', uiLabel: '报告批准人职位', location: 'Cover Table', context: 'Position: [pos]', example: 'QA Manager' },

  // ==================================================================================
  // 1 & 2. OBJECTIVE & SCOPE
  // ==================================================================================
  { category: 'Objective', variableKey: 'protocolCode/Version/Project', source: 'Shared (Protocol)', inputLocation: 'Protocol Cover', description: 'Protocol Reference', uiLabel: '方案引用号', location: '1. Objective', context: '验证方案（AVP-[...]）', example: 'AVP-A316-02.00' },
  { category: 'Objective', variableKey: 'validationOptions', source: 'Shared (Protocol)', inputLocation: 'Protocol - Objective', description: 'Validation Items List', uiLabel: '验证项目文本 (动态生成)', location: '1. Objective', context: '包括[系统适用性、专属性...]。', example: 'System Suitability, Specificity...' },
  { category: 'Scope', variableKey: 'displayId', source: 'Shared (Protocol)', inputLocation: 'Protocol Cover', description: 'Product ID in Scope', uiLabel: '范围文本', location: '2. Scope', context: '适用于 [displayId] 含量...', example: 'HY130225' },

  // ==================================================================================
  // 3. RESULTS SUMMARY (Ordered by Table Rows)
  // ==================================================================================
  
  // Row: System Suitability
  { category: 'Results Summary', variableKey: 'experimentalData.systemSuitability.blankInterference', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Blank Summary', uiLabel: '空白干扰摘要', location: '3. Results Table', context: 'Read-only: [blankInterference]', example: 'no interference' },
  { category: 'Results Summary', variableKey: 'valStatus.systemSuitability', source: 'Report State', inputLocation: 'Report - Sec 3', description: 'Sys Suit Status', uiLabel: '系统适用性判定', location: '3. Results Table', context: 'Dropdown: Pass/Fail', example: 'Pass' },
  { category: 'Results Summary', variableKey: 'sysSuitability.plateNumber', source: 'Shared (Protocol)', inputLocation: 'Protocol - 4.5', description: 'Limit: Plates', uiLabel: '理论板数限度', location: '3. Results Table', context: 'should be not less than [plateNumber]', example: '5000' },
  { category: 'Results Summary', variableKey: 'experimentalData.systemSuitability.theoreticalPlates', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Plates Summary', uiLabel: '理论板数摘要', location: '3. Results Table', context: 'Read-only: [theoreticalPlates]', example: '169997' },
  { category: 'Results Summary', variableKey: 'sysSuitability.tailingFactor', source: 'Shared (Protocol)', inputLocation: 'Protocol - 4.5', description: 'Limit: Tailing', uiLabel: '拖尾因子限度', location: '3. Results Table', context: 'should not be more than [tailingFactor]', example: '2.5' },
  { category: 'Results Summary', variableKey: 'experimentalData.systemSuitability.tailingFactor', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Tailing Summary', uiLabel: '拖尾因子摘要', location: '3. Results Table', context: 'Read-only: [tailingFactor]', example: '0.9' },
  { category: 'Results Summary', variableKey: 'sysSuitability.injectionCount', source: 'Shared (Protocol)', inputLocation: 'Protocol - 4.5', description: 'Limit: Injections', uiLabel: 'RSD进样针数', location: '3. Results Table', context: 'For [injectionCount] consecutive...', example: '5' },
  { category: 'Results Summary', variableKey: 'sysSuitability.areaRSD', source: 'Shared (Protocol)', inputLocation: 'Protocol - 4.5', description: 'Limit: Area RSD', uiLabel: '面积RSD限度', location: '3. Results Table', context: 'Area RSD should be NMT [areaRSD]%', example: '2.0' },
  { category: 'Results Summary', variableKey: 'sysSuitability.retentionRSD', source: 'Shared (Protocol)', inputLocation: 'Protocol - 4.5', description: 'Limit: RT RSD', uiLabel: 'RT RSD限度', location: '3. Results Table', context: 'RT RSD should be NMT [retentionRSD]%', example: '1.0' },
  { category: 'Results Summary', variableKey: 'sysSuitability.recoveryRange', source: 'Shared (Protocol)', inputLocation: 'Protocol - 4.5', description: 'Limit: Recovery', uiLabel: '回收率范围', location: '3. Results Table', context: 'between [recoveryRange]', example: '98.0%~102.0%' },
  { category: 'Results Summary', variableKey: 'experimentalData.systemSuitability.std1AreaRSD', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Area RSD Summary', uiLabel: '峰面积RSD摘要', location: '3. Results Table', context: 'Read-only: [std1AreaRSD]', example: '0.06' },
  { category: 'Results Summary', variableKey: 'experimentalData.systemSuitability.std1RtRSD', source: 'Experimental Data', inputLocation: 'Data Document', description: 'RT RSD Summary', uiLabel: '保留时间RSD摘要', location: '3. Results Table', context: 'Read-only: [std1RtRSD]', example: '0.04' },
  { category: 'Results Summary', variableKey: 'experimentalData.systemSuitability.std2Recovery', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Recovery Summary', uiLabel: '回收率摘要', location: '3. Results Table', context: 'Read-only: [std2Recovery]', example: '99.5' },
  { category: 'Results Summary', variableKey: 'sysSuitability.controlInjectionCount', source: 'Shared (Protocol)', inputLocation: 'Protocol - 4.5', description: 'Limit: Control Injections', uiLabel: '对照针数', location: '3. Results Table', context: 'check solution and [controlInjectionCount] consecutive...', example: '5' },
  { category: 'Results Summary', variableKey: 'sysSuitability.controlAreaRSD', source: 'Shared (Protocol)', inputLocation: 'Protocol - 4.5', description: 'Limit: Control RSD', uiLabel: '对照RSD限度', location: '3. Results Table', context: 'should be NMT [controlAreaRSD]%', example: '2.0' },
  { 
    category: 'Results Summary', 
    variableKey: 'getControlRSDRange()', 
    source: 'Derived (Client)', 
    inputLocation: 'Calculated', 
    description: 'Control RSD Range', 
    uiLabel: '对照RSD范围', 
    location: '3. Results Table', 
    context: 'Derived from controls[].rsd', 
    example: '0.07%~0.13%',
    formula: 'Range[Min, Max] of (systemSuitability.controls[].rsd)' 
  },

  // Row: Specificity
  { category: 'Results Summary', variableKey: 'specificityState.retentionDevLimit', source: 'Shared (Protocol)', inputLocation: 'Protocol - 6.x', description: 'Limit: Spec Deviation', uiLabel: '专属性偏差限度', location: '3. Results Table', context: 'not more than [retentionDevLimit]%', example: '5.0' },
  { category: 'Results Summary', variableKey: 'experimentalData.specificity.rtDeviation', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Spec Deviation', uiLabel: '专属性偏差摘要', location: '3. Results Table', context: 'Read-only: [rtDeviation]', example: '0.02' },
  { category: 'Results Summary', variableKey: 'experimentalData.specificity.peakPurity', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Spec Purity', uiLabel: '峰纯度摘要', location: '3. Results Table', context: 'Read-only: [peakPurity]', example: '1000' },
  { category: 'Results Summary', variableKey: 'valStatus.specificity', source: 'Report State', inputLocation: 'Report - Sec 3', description: 'Specificity Status', uiLabel: '专属性判定', location: '3. Results Table', context: 'Dropdown: Pass/Fail', example: 'Pass' },

  // Row: Linearity
  { category: 'Results Summary', variableKey: 'experimentalData.linearity.statsR', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Linearity r', uiLabel: '相关系数摘要', location: '3. Results Table', context: 'Read-only: [statsR]', example: '1.000' },
  { category: 'Results Summary', variableKey: 'experimentalData.linearity.statsPercentIntercept', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Linearity Intercept Ratio', uiLabel: '截距比摘要', location: '3. Results Table', context: 'Read-only: [statsPercentIntercept]', example: '0.33' },
  { category: 'Results Summary', variableKey: 'experimentalData.linearity.equation', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Linearity Equation', uiLabel: '线性方程摘要', location: '3. Results Table', context: 'Read-only: [equation]', example: 'y=...' },
  { category: 'Results Summary', variableKey: 'experimentalData.linearity.statsRSS', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Linearity RSS', uiLabel: 'RSS摘要', location: '3. Results Table', context: 'Read-only: [statsRSS]', example: '1430.2' },
  { 
    category: 'Results Summary', 
    variableKey: 'getLinearityRange(conc)', 
    source: 'Derived (Client)', 
    inputLocation: 'Calculated', 
    description: 'Linearity Conc Range', 
    uiLabel: '浓度范围摘要', 
    location: '3. Results Table', 
    context: 'Derived from rows[].conc', 
    example: '163~257',
    formula: 'Range[Min, Max] of (linearity.rows[].conc)' 
  },
  { 
    category: 'Results Summary', 
    variableKey: 'getLinearityRange(actualLevel)', 
    source: 'Derived (Client)', 
    inputLocation: 'Calculated', 
    description: 'Linearity Level Range', 
    uiLabel: '水平范围摘要', 
    location: '3. Results Table', 
    context: 'Derived from rows[].actualLevel', 
    example: '81~128',
    formula: 'Range[Min, Max] of (linearity.rows[].actualLevel)' 
  },
  { category: 'Results Summary', variableKey: 'valStatus.linearity', source: 'Report State', inputLocation: 'Report - Sec 3', description: 'Linearity Status', uiLabel: '线性判定', location: '3. Results Table', context: 'Dropdown: Pass/Fail', example: 'Pass' },

  // Row: Precision
  { category: 'Results Summary', variableKey: 'precisionState.precisionLimit', source: 'Shared (Protocol)', inputLocation: 'Protocol - 6.x', description: 'Limit: Precision', uiLabel: '精密度限度', location: '3. Results Table', context: 'RSD: [precisionLimit]', example: 'NMT 2.0%' },
  { category: 'Results Summary', variableKey: 'experimentalData.precision.rsd', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Precision RSD', uiLabel: '精密度RSD摘要', location: '3. Results Table', context: 'Read-only: [rsd]', example: '0.84' },
  { category: 'Results Summary', variableKey: 'valStatus.repeatability', source: 'Report State', inputLocation: 'Report - Sec 3', description: 'Precision Status', uiLabel: '重复性判定', location: '3. Results Table', context: 'Dropdown: Pass/Fail', example: 'Pass' },

  // Row: Accuracy
  { category: 'Results Summary', variableKey: 'accuracyState.recoveryRange', source: 'Shared (Protocol)', inputLocation: 'Protocol - 6.x', description: 'Limit: Accuracy Rec', uiLabel: '准确度回收率限度', location: '3. Results Table', context: 'range of [recoveryRange]', example: '98.0%-102.0%' },
  { category: 'Results Summary', variableKey: 'accuracyState.rsdLimit', source: 'Shared (Protocol)', inputLocation: 'Protocol - 6.x', description: 'Limit: Accuracy RSD', uiLabel: '准确度RSD限度', location: '3. Results Table', context: 'RSD≤[rsdLimit]%', example: '2.0' },
  { 
    category: 'Results Summary', 
    variableKey: 'getAccuracyRecRange()', 
    source: 'Derived (Client)', 
    inputLocation: 'Calculated', 
    description: 'Accuracy Recovery Range', 
    uiLabel: '准确度回收率范围', 
    location: '3. Results Table', 
    context: 'Derived from rows[].rec', 
    example: '99.6%~101.7%',
    formula: 'Range[Min, Max] of (accuracy.rows[].rec)'
  },
  { category: 'Results Summary', variableKey: 'experimentalData.accuracy.rsd', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Accuracy RSD', uiLabel: '准确度RSD摘要', location: '3. Results Table', context: 'Read-only: [rsd]', example: '0.84' },
  { category: 'Results Summary', variableKey: 'valStatus.accuracy', source: 'Report State', inputLocation: 'Report - Sec 3', description: 'Accuracy Status', uiLabel: '准确度判定', location: '3. Results Table', context: 'Dropdown: Pass/Fail', example: 'Pass' },

  // Row: Stability
  { category: 'Results Summary', variableKey: 'stabilityState.sampleTemp', source: 'Shared (Protocol)', inputLocation: 'Protocol - 6.x', description: 'Stability Sample Temp', uiLabel: '稳定性供试品温度', location: '3. Results Table', context: 'Sample ... [sampleTemp] ℃', example: '5±3' },
  { category: 'Results Summary', variableKey: 'stabilityState.sampleRecovery', source: 'Shared (Protocol)', inputLocation: 'Protocol - 6.x', description: 'Limit: Stability Rec', uiLabel: '稳定性回收率限度', location: '3. Results Table', context: 'recovery ... should be [sampleRecovery]', example: '98.0%~102.0%' },
  { category: 'Results Summary', variableKey: 'experimentalData.stability.splPoints[-1].recovery', source: 'Experimental Data (Derived)', inputLocation: 'Data Document', description: 'Stability Spl', uiLabel: '供试品稳定性摘要', location: '3. Results Table', context: 'Final Point Recovery', example: '99.5' },
  { category: 'Results Summary', variableKey: 'stabilityState.standardTemp', source: 'Shared (Protocol)', inputLocation: 'Protocol - 6.x', description: 'Stability Std Temp', uiLabel: '稳定性对照品温度', location: '3. Results Table', context: 'Standard ... [standardTemp] ℃', example: '5±3' },
  { category: 'Results Summary', variableKey: 'stabilityState.standardRecovery', source: 'Shared (Protocol)', inputLocation: 'Protocol - 6.x', description: 'Limit: Stability Std Rec', uiLabel: '稳定性对照品回收率限度', location: '3. Results Table', context: 'recovery ... should be [standardRecovery]', example: '98.0%~102.0%' },
  { category: 'Results Summary', variableKey: 'experimentalData.stability.stdPoints[-1].recovery', source: 'Experimental Data (Derived)', inputLocation: 'Data Document', description: 'Stability Std', uiLabel: '对照稳定性摘要', location: '3. Results Table', context: 'Final Point Recovery', example: '100.1' },
  { category: 'Results Summary', variableKey: 'valStatus.stability', source: 'Report State', inputLocation: 'Report - Sec 3', description: 'Stability Status', uiLabel: '稳定性判定', location: '3. Results Table', context: 'Dropdown: Pass/Fail', example: 'Pass' },

  // ==================================================================================
  // 4. METHOD DESCRIPTION (Referencing TestMethodSection)
  // ==================================================================================
  { category: 'Method', variableKey: 'chemicalFormula', source: 'Shared (Protocol)', inputLocation: 'Protocol - 4.1', description: 'Product Formula', uiLabel: '化学式', location: '4.1 Product', context: 'Formula: [chemicalFormula]', example: 'C8H10N4O2' },
  { category: 'Method', variableKey: 'testingConditions', source: 'Shared (Protocol)', inputLocation: 'Protocol - 4.2', description: 'Instrument Conditions', uiLabel: '检测条件列表', location: '4.2 Instruments', context: 'Rendered Table', example: 'Column, Flow rate...' },
  { category: 'Method', variableKey: 'gradientData', source: 'Shared (Protocol)', inputLocation: 'Protocol - 4.2', description: 'Gradient Table', uiLabel: '梯度表', location: '4.2 Instruments', context: 'Rendered Table', example: 'Time / Phase A / Phase B' },
  { category: 'Method', variableKey: 'solutionPreps', source: 'Shared (Protocol)', inputLocation: 'Protocol - 4.3', description: 'Solution Preparation', uiLabel: '溶液配制详情', location: '4.3 Solutions', context: 'Phase A/B, Diluent details', example: 'Weigh...' },
  { category: 'Method', variableKey: 'solDetail', source: 'Shared (Protocol)', inputLocation: 'Protocol - 4.3', description: 'Solution Weights', uiLabel: '配制量', location: '4.3 Solutions', context: 'Weights & Volumes', example: '20mg / 100ml' },
  { category: 'Method', variableKey: 'sysSuitability', source: 'Shared (Protocol)', inputLocation: 'Protocol - 4.5', description: 'Sys Suit Criteria', uiLabel: '系统适用性标准', location: '4.5 Sys Suit', context: 'Plates, Tailing, RSD limits', example: 'NLT 5000' },
  { category: 'Method', variableKey: 'calculationState', source: 'Shared (Protocol)', inputLocation: 'Protocol - 4.7', description: 'Calculation Factors', uiLabel: '计算校正因子', location: '4.7 Calculation', context: 'KF/LOD checkboxes', example: 'true/false' },
  { category: 'Method', variableKey: 'acceptanceCriteria', source: 'Shared (Protocol)', inputLocation: 'Protocol - 4.8', description: 'General Criteria', uiLabel: '通用接受标准', location: '4.8 Criteria', context: 'Assay/ID limits', example: 'NLT 95%' },
  
  // ==================================================================================
  // 5.1 TRAINING CONFIRMATION
  // ==================================================================================
  { category: 'Resources', variableKey: 'trainingDate', source: 'Report Manual Input', inputLocation: 'Report - Sec 5.1', description: 'Training Date', uiLabel: '培训日期', location: '5.1 Training', context: 'Date: [trainingDate]', example: '2024-09-01' },

  // ==================================================================================
  // 5.2 EQUIPMENT & REAGENTS
  // ==================================================================================
  { category: 'Resources', variableKey: 'reportEquipment[i].supplier', source: 'Report Manual Input', inputLocation: 'Report - Sec 5.2', description: 'Equipment Supplier', uiLabel: '仪器厂家', location: '5.2.1 Equipment', context: 'Supplier: [supplier]', example: 'Thermo' },
  { category: 'Resources', variableKey: 'reportEquipment[i].equipmentNumber', source: 'Report Manual Input', inputLocation: 'Report - Sec 5.2', description: 'Equipment ID', uiLabel: '设备位号', location: '5.2.1 Equipment', context: 'ID: [equipmentNumber]', example: 'LC312' },
  { category: 'Resources', variableKey: 'reportEquipment[i].retestDate', source: 'Report Manual Input', inputLocation: 'Report - Sec 5.2', description: 'Equipment Retest Date', uiLabel: '仪器有效期', location: '5.2.1 Equipment', context: 'Retest: [retestDate]', example: '2025-05-24' },
  
  { category: 'Resources', variableKey: 'prerequisiteState.columnSuppliers', source: 'Shared (Protocol)', inputLocation: 'Protocol - Pre 2', description: 'Column Supplier (Mapped)', uiLabel: '色谱柱厂家 (Read-only)', location: '5.2.2 Column', context: 'Supplier: [value]', example: 'Waters' },
  { category: 'Resources', variableKey: 'reportColumnSerials[id]', source: 'Report Manual Input', inputLocation: 'Report - Sec 5.2', description: 'Column Serial Number', uiLabel: '色谱柱编号', location: '5.2.2 Column', context: 'Serial: [value]', example: 'SN123456' },
  
  { category: 'Resources', variableKey: 'reportReagentValues[id].batch', source: 'Report Manual Input', inputLocation: 'Report - Sec 5.2', description: 'Reagent Batch', uiLabel: '试剂批号', location: '5.2.3 Reagents', context: 'Batch: [batch]', example: 'C14175044' },
  { category: 'Resources', variableKey: 'reportReagentValues[id].supplier', source: 'Report Manual Input', inputLocation: 'Report - Sec 5.2', description: 'Reagent Supplier', uiLabel: '试剂厂家', location: '5.2.3 Reagents', context: 'Supplier: [supplier]', example: 'Macklin' },
  { category: 'Resources', variableKey: 'reportReagentValues[id].expiryDate', source: 'Report Manual Input', inputLocation: 'Report - Sec 5.2', description: 'Reagent Expiry', uiLabel: '试剂有效期', location: '5.2.3 Reagents', context: 'Expiry: [expiryDate]', example: '2026-09-04' },
  
  { category: 'Resources', variableKey: 'reportSampleRS.rs.batch', source: 'Report Manual Input', inputLocation: 'Report - Sec 5.2', description: 'RS Batch', uiLabel: '对照品批号', location: '5.2.4 Sample/RS', context: 'RS Batch: [batch]', example: 'RS324110' },
  { category: 'Resources', variableKey: 'reportSampleRS.rs.retestDate', source: 'Report Manual Input', inputLocation: 'Report - Sec 5.2', description: 'RS Retest Date', uiLabel: '对照品复验期', location: '5.2.4 Sample/RS', context: 'Retest: [retestDate]', example: '2025-07-07' },
  { category: 'Resources', variableKey: 'reportSampleRS.rs.assay', source: 'Report Manual Input', inputLocation: 'Report - Sec 5.2', description: 'RS Assay', uiLabel: '对照品含量', location: '5.2.4 Sample/RS', context: 'RS Assay: [assay]', example: '99.8%' },
  { category: 'Resources', variableKey: 'reportSampleRS.rs.source', source: 'Report Manual Input', inputLocation: 'Report - Sec 5.2', description: 'RS Source', uiLabel: '对照品来源', location: '5.2.4 Sample/RS', context: 'Source: [source]', example: 'ChemExpress' },
  
  { category: 'Resources', variableKey: 'reportSampleRS.sample.batch', source: 'Report Manual Input', inputLocation: 'Report - Sec 5.2', description: 'Sample Batch', uiLabel: '供试品批号', location: '5.2.4 Sample/RS', context: 'Sample Batch: [batch]', example: 'HY-1302...' },
  { category: 'Resources', variableKey: 'reportSampleRS.sample.retestDate', source: 'Report Manual Input', inputLocation: 'Report - Sec 5.2', description: 'Sample Retest Date', uiLabel: '供试品复验期', location: '5.2.4 Sample/RS', context: 'Retest: [retestDate]', example: '' },
  { category: 'Resources', variableKey: 'reportSampleRS.sample.assay', source: 'Report Manual Input', inputLocation: 'Report - Sec 5.2', description: 'Sample Assay', uiLabel: '供试品含量', location: '5.2.4 Sample/RS', context: 'Assay: [assay]', example: '-' },
  { category: 'Resources', variableKey: 'reportSampleRS.sample.source', source: 'Report Manual Input', inputLocation: 'Report - Sec 5.2', description: 'Sample Source', uiLabel: '供试品来源', location: '5.2.4 Sample/RS', context: 'Source: [source]', example: 'ChemExpress' },

  // ==================================================================================
  // 5.3 SYSTEM SUITABILITY (Detailed Experimental Data)
  // ==================================================================================
  { category: 'Exp Data', variableKey: 'attachmentRef', source: 'Report Manual Input', inputLocation: 'Report - Sec 5.3', description: 'Attachment Ref', uiLabel: '系统适用性附图编号', location: '5.3 Sys Suit', context: '典型附图见 [attachmentRef]', example: '1-2' },
  { category: 'Exp Data', variableKey: 'experimentalData.systemSuitability.sequenceId', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Sequence ID', uiLabel: '序列号', location: '5.3 Sys Suit Table', context: '序列号：[sequenceId]', example: '20240909' },
  { category: 'Exp Data', variableKey: 'experimentalData.systemSuitability.blankInterference', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Blank Interference', uiLabel: '空白干扰结果', location: '5.3 Sys Suit Table', context: '[blankInterference]', example: '无干扰' },
  { category: 'Exp Data', variableKey: 'experimentalData.systemSuitability.theoreticalPlates', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Theoretical Plates', uiLabel: '理论塔板数', location: '5.3 Sys Suit Table', context: '[theoreticalPlates]', example: '169997' },
  { category: 'Exp Data', variableKey: 'experimentalData.systemSuitability.tailingFactor', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Tailing Factor', uiLabel: '拖尾因子', location: '5.3 Sys Suit Table', context: '[tailingFactor]', example: '0.9' },
  
  { category: 'Exp Data', variableKey: 'experimentalData.systemSuitability.std1Injections[i].peakArea', source: 'Experimental Data', inputLocation: 'Data Document', description: 'STD1 Injection Peak Area', uiLabel: 'STD1 峰面积', location: '5.3 Sys Suit Table', context: 'Row Data: [peakArea]', example: '5212.52' },
  { category: 'Exp Data', variableKey: 'experimentalData.systemSuitability.std1Injections[i].rt', source: 'Experimental Data', inputLocation: 'Data Document', description: 'STD1 Injection RT', uiLabel: 'STD1 保留时间', location: '5.3 Sys Suit Table', context: 'Row Data: [rt]', example: '18.933' },
  
  { category: 'Exp Data', variableKey: 'experimentalData.systemSuitability.std1Weight', source: 'Experimental Data', inputLocation: 'Data Document', description: 'STD1 Weight', uiLabel: 'STD1 称样量', location: '5.3 Sys Suit Table', context: '[std1Weight] mg', example: '20.48' },
  { category: 'Exp Data', variableKey: 'experimentalData.systemSuitability.std1AvgArea', source: 'Experimental Data', inputLocation: 'Data Document', description: 'STD1 Avg Area', uiLabel: 'STD1 平均峰面积', location: '5.3 Sys Suit Table', context: '[std1AvgArea]', example: '5209.385' },
  { category: 'Exp Data', variableKey: 'experimentalData.systemSuitability.std1AreaRSD', source: 'Experimental Data', inputLocation: 'Data Document', description: 'STD1 Area RSD', uiLabel: 'STD1 面积 RSD', location: '5.3 Sys Suit Table', context: '[std1AreaRSD]%', example: '0.06' },
  { category: 'Exp Data', variableKey: 'experimentalData.systemSuitability.std1RtRSD', source: 'Experimental Data', inputLocation: 'Data Document', description: 'STD1 RT RSD', uiLabel: 'STD1 保留时间 RSD', location: '5.3 Sys Suit Table', context: '[std1RtRSD]%', example: '0.04' },
  
  { category: 'Exp Data', variableKey: 'experimentalData.systemSuitability.std2Weight', source: 'Experimental Data', inputLocation: 'Data Document', description: 'STD2 Weight', uiLabel: 'STD2 称样量', location: '5.3 Sys Suit Table', context: '[std2Weight] mg', example: '20.98' },
  { category: 'Exp Data', variableKey: 'experimentalData.systemSuitability.std2PeakArea', source: 'Experimental Data', inputLocation: 'Data Document', description: 'STD2 Peak Area', uiLabel: 'STD2 峰面积', location: '5.3 Sys Suit Table', context: '[std2PeakArea]', example: '5310.797' },
  { category: 'Exp Data', variableKey: 'experimentalData.systemSuitability.std2Recovery', source: 'Experimental Data', inputLocation: 'Data Document', description: 'STD2 Recovery', uiLabel: 'STD2 回收率', location: '5.3 Sys Suit Table', context: '[std2Recovery]%', example: '99.5' },
  { category: 'Exp Data', variableKey: 'experimentalData.systemSuitability.std2Rt', source: 'Experimental Data', inputLocation: 'Data Document', description: 'STD2 RT', uiLabel: 'STD2 保留时间', location: '5.3 Sys Suit Table', context: 'Reserved but not displayed explicitly in default layout', example: '18.953' },
  
  { category: 'Exp Data', variableKey: 'experimentalData.systemSuitability.controls[i].name', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Control Name', uiLabel: '随行对照名称', location: '5.3 Sys Suit Table', context: '[name]', example: 'STD1-6' },
  { category: 'Exp Data', variableKey: 'experimentalData.systemSuitability.controls[i].peakArea', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Control Peak Area', uiLabel: '随行对照峰面积', location: '5.3 Sys Suit Table', context: '[peakArea]', example: '5223.806' },
  { category: 'Exp Data', variableKey: 'experimentalData.systemSuitability.controls[i].rsd', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Control RSD', uiLabel: '随行对照 RSD', location: '5.3 Sys Suit Table', context: '[rsd]%', example: '0.13' },
  
  // Criteria Variables in 5.3
  { category: 'Criteria', variableKey: 'sysSuitability.plateNumber', source: 'Shared (Protocol)', inputLocation: 'Protocol - 4.5', description: 'Criteria: Plates', uiLabel: '5.3标准: 理论板数', location: '5.3 Sys Suit Table', context: 'not less than [plateNumber]', example: '5000' },
  { category: 'Criteria', variableKey: 'sysSuitability.tailingFactor', source: 'Shared (Protocol)', inputLocation: 'Protocol - 4.5', description: 'Criteria: Tailing', uiLabel: '5.3标准: 拖尾因子', location: '5.3 Sys Suit Table', context: 'not more than [tailingFactor]', example: '2.5' },
  { category: 'Criteria', variableKey: 'sysSuitability.injectionCount', source: 'Shared (Protocol)', inputLocation: 'Protocol - 4.5', description: 'Criteria: Inj Count', uiLabel: '5.3标准: 进样针数', location: '5.3 Sys Suit Table', context: 'For [injectionCount] consecutive', example: '5' },
  { category: 'Criteria', variableKey: 'sysSuitability.areaRSD', source: 'Shared (Protocol)', inputLocation: 'Protocol - 4.5', description: 'Criteria: Area RSD', uiLabel: '5.3标准: 面积RSD', location: '5.3 Sys Suit Table', context: 'NMT [areaRSD]%', example: '2.0' },
  { category: 'Criteria', variableKey: 'sysSuitability.retentionRSD', source: 'Shared (Protocol)', inputLocation: 'Protocol - 4.5', description: 'Criteria: RT RSD', uiLabel: '5.3标准: RT RSD', location: '5.3 Sys Suit Table', context: 'NMT [retentionRSD]%', example: '1.0' },
  { category: 'Criteria', variableKey: 'sysSuitability.recoveryRange', source: 'Shared (Protocol)', inputLocation: 'Protocol - 4.5', description: 'Criteria: Rec Range', uiLabel: '5.3标准: 回收率范围', location: '5.3 Sys Suit Table', context: 'between [recoveryRange]', example: '98~102' },
  { category: 'Criteria', variableKey: 'sysSuitability.controlInjectionCount', source: 'Shared (Protocol)', inputLocation: 'Protocol - 4.5', description: 'Criteria: Ctrl Inj Count', uiLabel: '5.3标准: 对照针数', location: '5.3 Sys Suit Table', context: '[controlInjectionCount] consecutive', example: '5' },
  { category: 'Criteria', variableKey: 'sysSuitability.controlAreaRSD', source: 'Shared (Protocol)', inputLocation: 'Protocol - 4.5', description: 'Criteria: Ctrl RSD', uiLabel: '5.3标准: 对照RSD', location: '5.3 Sys Suit Table', context: 'NMT [controlAreaRSD]%', example: '2.0' },

  { category: 'Conclusion', variableKey: 'valStatus.systemSuitability', source: 'Report State', inputLocation: 'Report - Sec 3', description: 'Conclusion Status', uiLabel: '5.3 结论', location: '5.3 Sys Suit Table', context: 'Conclusion: [valStatus]', example: 'Pass' },

  // ==================================================================================
  // 5.4 SPECIFICITY
  // ==================================================================================
  { category: 'Exp Data', variableKey: 'specificityAttachmentRef', source: 'Report Manual Input', inputLocation: 'Report - Sec 5.4', description: 'Attachment Ref', uiLabel: '专属性附图编号', location: '5.4 Specificity', context: '典型附图见 [val]', example: '2-4' },
  { category: 'Exp Data', variableKey: 'experimentalData.specificity.sequenceId', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Sequence ID', uiLabel: '序列号', location: '5.4 Specificity Table', context: '序列号：[sequenceId]', example: '20240909' },
  { category: 'Exp Data', variableKey: 'experimentalData.specificity.stdRt', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Standard RT', uiLabel: '对照品保留时间', location: '5.4 Specificity Table', context: '[stdRt]', example: '18.953' },
  { category: 'Exp Data', variableKey: 'experimentalData.specificity.sampleRt', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Sample RT', uiLabel: '供试品保留时间', location: '5.4 Specificity Table', context: '[sampleRt]', example: '18.957' },
  { category: 'Exp Data', variableKey: 'experimentalData.specificity.rtDeviation', source: 'Experimental Data', inputLocation: 'Data Document', description: 'RT Deviation', uiLabel: '相对偏差', location: '5.4 Specificity Table', context: '[rtDeviation]%', example: '0.02' },
  { category: 'Exp Data', variableKey: 'experimentalData.specificity.peakPurity', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Peak Purity', uiLabel: '峰纯度因子', location: '5.4 Specificity Table', context: '[peakPurity]', example: '1000' },
  
  { category: 'Criteria', variableKey: 'specificityState.retentionDevLimit', source: 'Shared (Protocol)', inputLocation: 'Protocol - 6.x', description: 'Criteria: RT Dev', uiLabel: '5.4标准: 偏差限度', location: '5.4 Specificity Table', context: 'not more than [retentionDevLimit]%', example: '5.0' },
  
  { category: 'Conclusion', variableKey: 'valStatus.specificity', source: 'Report State', inputLocation: 'Report - Sec 3', description: 'Conclusion Status', uiLabel: '5.4 结论', location: '5.4 Specificity Table', context: 'Conclusion: [valStatus]', example: 'Pass' },

  // ==================================================================================
  // 5.5 LINEARITY
  // ==================================================================================
  { category: 'Exp Data', variableKey: 'linearityAttachmentRef', source: 'Report Manual Input', inputLocation: 'Report - Sec 5.5', description: 'Attachment Ref', uiLabel: '线性附图编号', location: '5.5 Linearity', context: '典型附图见 [val]', example: '5.5.1' },
  { category: 'Exp Data', variableKey: 'experimentalData.linearity.sequenceId', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Sequence ID', uiLabel: '序列号', location: '5.5 Linearity', context: '序列号：[sequenceId]', example: '20240909' },
  { category: 'Exp Data', variableKey: 'experimentalData.linearity.rows[i].id', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Solution Name', uiLabel: '溶液名称', location: '5.5 Linearity Table', context: '[id]', example: 'L1' },
  { category: 'Exp Data', variableKey: 'experimentalData.linearity.rows[i].level', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Concentration Level', uiLabel: '浓度水平', location: '5.5 Linearity Table', context: '[level]', example: '0.8' },
  { category: 'Exp Data', variableKey: 'experimentalData.linearity.rows[i].weight', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Weight', uiLabel: '称样量 (mg)', location: '5.5 Linearity Table', context: '[weight]', example: '16.4' },
  { category: 'Exp Data', variableKey: 'experimentalData.linearity.dilutionX1', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Dilution Factor 1', uiLabel: '稀释倍数1', location: '5.5 Linearity Table', context: '[dilutionX1]', example: '100' },
  { category: 'Exp Data', variableKey: 'experimentalData.linearity.dilutionX2', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Dilution Factor 2', uiLabel: '稀释倍数2', location: '5.5 Linearity Table', context: '[dilutionX2]', example: '50' },
  { category: 'Exp Data', variableKey: 'experimentalData.linearity.assayValue', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Assay Value', uiLabel: '含量', location: '5.5 Linearity Table', context: '[assayValue]', example: '0.998' },
  { category: 'Exp Data', variableKey: 'experimentalData.linearity.rows[i].conc', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Linearity Conc', uiLabel: '浓度 (x)', location: '5.5 Linearity Table', context: '[conc]', example: '163.67' },
  { category: 'Exp Data', variableKey: 'experimentalData.linearity.rows[i].area', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Linearity Area', uiLabel: '峰面积 (y)', location: '5.5 Linearity Table', context: '[area]', example: '4144.62' },
  { category: 'Exp Data', variableKey: 'experimentalData.linearity.rows[i].actualLevel', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Actual Level', uiLabel: '实际水平 %', location: '5.5 Linearity Table', context: '[actualLevel]', example: '81.84' },
  
  { category: 'Exp Data', variableKey: 'experimentalData.linearity.statsN', source: 'Experimental Data', inputLocation: 'Data Document', description: 'n points', uiLabel: '点数 n', location: '5.5 Linearity Table', context: 'n = [statsN]', example: '5' },
  { category: 'Exp Data', variableKey: 'experimentalData.linearity.statsR', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Correlation r', uiLabel: '相关系数 r', location: '5.5 Linearity Table', context: 'r: [statsR]', example: '0.9998' },
  { category: 'Exp Data', variableKey: 'experimentalData.linearity.equation', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Equation', uiLabel: '线性方程', location: '5.5 Linearity Table', context: '[equation]', example: 'y=ax+b' },
  { category: 'Exp Data', variableKey: 'experimentalData.linearity.statsSlope', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Slope', uiLabel: '斜率', location: '5.5 Linearity Table', context: '[statsSlope]', example: '25.4869' },
  { category: 'Exp Data', variableKey: 'experimentalData.linearity.statsIntercept', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Intercept', uiLabel: '截距', location: '5.5 Linearity Table', context: '[statsIntercept]', example: '-17.1752' },
  { category: 'Exp Data', variableKey: 'experimentalData.linearity.statsPercentIntercept', source: 'Experimental Data', inputLocation: 'Data Document', description: '% Intercept', uiLabel: '截距比例', location: '5.5 Linearity Table', context: '[statsPercentIntercept]', example: '0.33' },
  { category: 'Exp Data', variableKey: 'experimentalData.linearity.statsRSS', source: 'Experimental Data', inputLocation: 'Data Document', description: 'RSS', uiLabel: '残差平方和', location: '5.5 Linearity Table', context: '[statsRSS]', example: '1430.23' },
  
  { category: 'Conclusion', variableKey: 'valStatus.linearity', source: 'Report State', inputLocation: 'Report - Sec 3', description: 'Conclusion Status', uiLabel: '5.5 结论', location: '5.5 Linearity Table', context: 'Conclusion: [valStatus]', example: 'Pass' },

  // ==================================================================================
  // 5.6 PRECISION
  // ==================================================================================
  { category: 'Exp Data', variableKey: 'precisionAttachmentRef', source: 'Report Manual Input', inputLocation: 'Report - Sec 5.6', description: 'Attachment Ref', uiLabel: '精密度附图编号', location: '5.6 Precision', context: '典型附图见 [val]', example: '5.6.1' },
  { category: 'Exp Data', variableKey: 'experimentalData.precision.sequenceId', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Sequence ID', uiLabel: '序列号', location: '5.6 Precision', context: '序列号：[sequenceId]', example: '20240909' },
  { category: 'Exp Data', variableKey: 'experimentalData.precision.stdWeight', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Std Weight', uiLabel: '对照品称样量', location: '5.6 Precision Table', context: '[stdWeight]', example: '20.48' },
  { category: 'Exp Data', variableKey: 'experimentalData.precision.stdAssay', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Std Assay', uiLabel: '对照品含量', location: '5.6 Precision Table', context: '[stdAssay]', example: '0.998' },
  { category: 'Exp Data', variableKey: 'experimentalData.precision.stdVolume', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Std Volume', uiLabel: '对照品体积', location: '5.6 Precision Table', context: '[stdVolume]', example: '100' },
  { category: 'Exp Data', variableKey: 'experimentalData.precision.stdAvgArea', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Std Avg Area', uiLabel: '对照品平均面积', location: '5.6 Precision Table', context: '[stdAvgArea]', example: '5209.38' },
  { category: 'Exp Data', variableKey: 'experimentalData.precision.splVolume', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Spl Volume', uiLabel: '供试品体积', location: '5.6 Precision Table', context: '[splVolume]', example: '50' },
  
  { category: 'Exp Data', variableKey: 'experimentalData.precision.rows[i].name', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Sample Name', uiLabel: '样品名称', location: '5.6 Precision Table', context: '[name]', example: 'Precision-1' },
  { category: 'Exp Data', variableKey: 'experimentalData.precision.rows[i].weight', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Sample Weight', uiLabel: '样品称样量', location: '5.6 Precision Table', context: '[weight]', example: '10.46' },
  { category: 'Exp Data', variableKey: 'experimentalData.precision.rows[i].area', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Sample Area', uiLabel: '样品峰面积', location: '5.6 Precision Table', context: '[area]', example: '5354.9' },
  { category: 'Exp Data', variableKey: 'experimentalData.precision.rows[i].assay', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Sample Assay', uiLabel: '样品含量', location: '5.6 Precision Table', context: '[assay]%', example: '100.43' },
  
  { category: 'Exp Data', variableKey: 'experimentalData.precision.avgAssay', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Average Assay', uiLabel: '平均含量', location: '5.6 Precision Table', context: '[avgAssay]%', example: '99.79' },
  { category: 'Exp Data', variableKey: 'experimentalData.precision.rsd', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Precision RSD', uiLabel: '重复性 RSD', location: '5.6 Precision Table', context: '[rsd]%', example: '0.84' },
  
  { category: 'Criteria', variableKey: 'precisionState.precisionLimit', source: 'Shared (Protocol)', inputLocation: 'Protocol - 6.x', description: 'Criteria: Precision', uiLabel: '5.6标准: 精密度限度', location: '5.6 Precision Table', context: 'RSD: [precisionLimit]', example: 'NMT 2.0%' },
  { category: 'Conclusion', variableKey: 'valStatus.repeatability', source: 'Report State', inputLocation: 'Report - Sec 3', description: 'Conclusion Status', uiLabel: '5.6 结论', location: '5.6 Precision Table', context: 'Conclusion: [valStatus]', example: 'Pass' },

  // ==================================================================================
  // 5.7 ACCURACY
  // ==================================================================================
  { category: 'Exp Data', variableKey: 'accuracyAttachmentRef', source: 'Report Manual Input', inputLocation: 'Report - Sec 5.7', description: 'Attachment Ref', uiLabel: '准确度附图编号', location: '5.7 Accuracy', context: '典型附图见 [val]', example: '5.7.1' },
  { category: 'Exp Data', variableKey: 'experimentalData.accuracy.sequenceId', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Sequence ID', uiLabel: '序列号', location: '5.7 Accuracy', context: '序列号：[sequenceId]', example: '20240909' },
  { category: 'Exp Data', variableKey: 'experimentalData.accuracy.slope', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Slope', uiLabel: '斜率 a', location: '5.7 Accuracy Table', context: '[slope]', example: '25.4869' },
  { category: 'Exp Data', variableKey: 'experimentalData.accuracy.intercept', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Intercept', uiLabel: '截距 b', location: '5.7 Accuracy Table', context: '[intercept]', example: '-17.1752' },
  { category: 'Exp Data', variableKey: 'experimentalData.accuracy.precAvgAssay', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Avg Assay', uiLabel: '平均含量(Ref)', location: '5.7 Accuracy Table', context: '[precAvgAssay]%', example: '99.79' },
  { category: 'Exp Data', variableKey: 'experimentalData.accuracy.splVolume', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Spl Volume', uiLabel: '供试品体积', location: '5.7 Accuracy Table', context: '[splVolume]', example: '50' },

  { category: 'Exp Data', variableKey: 'experimentalData.accuracy.rows[i].name', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Sample Name', uiLabel: '样品名称', location: '5.7 Accuracy Table', context: '[name]', example: 'Precision-1' },
  { category: 'Exp Data', variableKey: 'experimentalData.accuracy.rows[i].weight', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Sample Weight', uiLabel: '样品称样量', location: '5.7 Accuracy Table', context: '[weight]', example: '10.46' },
  { category: 'Exp Data', variableKey: 'experimentalData.accuracy.rows[i].area', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Sample Area', uiLabel: '样品峰面积', location: '5.7 Accuracy Table', context: '[area]', example: '5354.984' },
  { category: 'Exp Data', variableKey: 'experimentalData.accuracy.rows[i].detConc', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Detected Conc', uiLabel: '测定浓度', location: '5.7 Accuracy Table', context: '[detConc]', example: '210.78' },
  { category: 'Exp Data', variableKey: 'experimentalData.accuracy.rows[i].detQty', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Detected Qty', uiLabel: '测定量', location: '5.7 Accuracy Table', context: '[detQty]', example: '10539.05' },
  { category: 'Exp Data', variableKey: 'experimentalData.accuracy.rows[i].theoQty', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Theoretical Qty', uiLabel: '理论量', location: '5.7 Accuracy Table', context: '[theoQty]', example: '10437.63' },
  { category: 'Exp Data', variableKey: 'experimentalData.accuracy.rows[i].rec', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Recovery', uiLabel: '回收率', location: '5.7 Accuracy Table', context: '[rec]%', example: '100.97' },
  
  { category: 'Exp Data', variableKey: 'experimentalData.accuracy.rsd', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Accuracy RSD', uiLabel: '准确度 RSD', location: '5.7 Accuracy Table', context: '[rsd]%', example: '0.84' },
  
  { category: 'Criteria', variableKey: 'accuracyState.recoveryRange', source: 'Shared (Protocol)', inputLocation: 'Protocol - 6.x', description: 'Criteria: Acc Rec', uiLabel: '5.7标准: 回收率范围', location: '5.7 Accuracy Table', context: 'in range of [recoveryRange]', example: '98-102%' },
  { category: 'Criteria', variableKey: 'accuracyState.rsdLimit', source: 'Shared (Protocol)', inputLocation: 'Protocol - 6.x', description: 'Criteria: Acc RSD', uiLabel: '5.7标准: RSD限度', location: '5.7 Accuracy Table', context: 'RSD≤[rsdLimit]%', example: '2.0' },
  
  { category: 'Conclusion', variableKey: 'valStatus.accuracy', source: 'Report State', inputLocation: 'Report - Sec 3', description: 'Conclusion Status', uiLabel: '5.7 结论', location: '5.7 Accuracy Table', context: 'Conclusion: [valStatus]', example: 'Pass' },

  // ==================================================================================
  // 5.8 STABILITY
  // ==================================================================================
  { category: 'Exp Data', variableKey: 'stabilityAttachmentRef', source: 'Report Manual Input', inputLocation: 'Report - Sec 5.8', description: 'Attachment Ref', uiLabel: '稳定性附图编号', location: '5.8 Stability', context: '典型附图见 [val]', example: '5.8.1' },
  
  { category: 'Exp Data', variableKey: 'experimentalData.stability.stdPoints[i].time', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Std Time Point', uiLabel: '对照品时间点', location: '5.8 Stability (Std)', context: '[time] h', example: '4' },
  { category: 'Exp Data', variableKey: 'experimentalData.stability.stdPoints[i].area', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Std Area', uiLabel: '对照品峰面积', location: '5.8 Stability (Std)', context: '[area]', example: '5223.8' },
  { category: 'Exp Data', variableKey: 'experimentalData.stability.stdPoints[i].recovery', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Std Recovery', uiLabel: '对照品回收率', location: '5.8 Stability (Std)', context: '[recovery]%', example: '100.2' },
  { category: 'Exp Data', variableKey: 'experimentalData.stability.stdAcceptanceCriteria', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Std Criteria Text', uiLabel: '对照品标准文本', location: '5.8 Stability (Std)', context: '[stdAcceptanceCriteria]', example: '...' },
  { category: 'Exp Data', variableKey: 'experimentalData.stability.stdConclusion', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Std Conclusion Text', uiLabel: '对照品结论文本', location: '5.8 Stability (Std)', context: '[stdConclusion]', example: '...stable for 16h' },
  
  { category: 'Exp Data', variableKey: 'experimentalData.stability.splPoints[i].time', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Spl Time Point', uiLabel: '供试品时间点', location: '5.8 Stability (Spl)', context: '[time] h', example: '6' },
  { category: 'Exp Data', variableKey: 'experimentalData.stability.splPoints[i].area', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Spl Area', uiLabel: '供试品峰面积', location: '5.8 Stability (Spl)', context: '[area]', example: '5173.4' },
  { category: 'Exp Data', variableKey: 'experimentalData.stability.splPoints[i].recovery', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Spl Recovery', uiLabel: '供试品回收率', location: '5.8 Stability (Spl)', context: '[recovery]%', example: '99.5' },
  { category: 'Exp Data', variableKey: 'experimentalData.stability.splAcceptanceCriteria', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Spl Criteria Text', uiLabel: '供试品标准文本', location: '5.8 Stability (Spl)', context: '[splAcceptanceCriteria]', example: '...' },
  { category: 'Exp Data', variableKey: 'experimentalData.stability.conclusion', source: 'Experimental Data', inputLocation: 'Data Document', description: 'Spl Conclusion Text', uiLabel: '供试品结论文本', location: '5.8 Stability (Spl)', context: '[conclusion]', example: '...stable for 12h' },
  
  { category: 'Conclusion', variableKey: 'valStatus.stability', source: 'Report State', inputLocation: 'Report - Sec 3', description: 'Conclusion Status', uiLabel: '5.8 结论', location: '5.8 Stability Table', context: 'Conclusion: [valStatus]', example: 'Pass' },

  // ==================================================================================
  // 6, 7, 8 FOOTER
  // ==================================================================================
  { category: 'Deviations', variableKey: 'deviationSummary', source: 'Report Manual Input', inputLocation: 'Report - Sec 6', description: 'Deviation Text', uiLabel: '偏差摘要', location: '6. Deviations', context: '[deviationSummary]', example: 'No deviation...' },
  { category: 'Conclusion', variableKey: 'displayId', source: 'Shared (Protocol)', inputLocation: 'Protocol Cover', description: 'Product ID in Conclusion', uiLabel: '结论中的产品ID', location: '7. Conclusion', context: '用于 [displayId] 含量...', example: 'HY130225' },
  { category: 'History', variableKey: 'reportHistoryDate', source: 'Report Manual Input', inputLocation: 'Report - Sec 8', description: 'Effective Date', uiLabel: '生效日期', location: '8. History', context: 'Effective Date: [reportHistoryDate]', example: '2024-09-20' },
];

export const ReportDataMappingDictionary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVariable, setSelectedVariable] = useState<string | null>(null);

  const filteredMappings = REPORT_MAPPINGS.filter(item => 
    item.variableKey.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.uiLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderDetailView = () => {
    if (!selectedVariable) return null;
    const variableDetails = REPORT_MAPPINGS.filter(m => m.variableKey === selectedVariable);
    if (variableDetails.length === 0) return <div>Variable details not found.</div>;
    const primaryInfo = variableDetails[0];

    return (
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-gray-200 bg-white flex items-center gap-4">
          <button onClick={() => setSelectedVariable(null)} className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span className="font-mono text-blue-600">{primaryInfo.variableKey}</span>
              <span className="text-xs font-normal text-gray-500 border border-gray-200 rounded px-2 py-0.5 bg-gray-50">Variable Details</span>
            </h2>
            <p className="text-gray-600 mt-1">{primaryInfo.description}</p>
          </div>
        </div>
        <div className="p-6 bg-gray-50 border-b border-gray-200">
           <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-center gap-8">
              <div>
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Category</span>
                <span className="text-lg font-medium text-gray-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{primaryInfo.category}</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Source System</span>
                <span className="text-lg font-medium text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">{primaryInfo.source}</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Input Location</span>
                <span className="text-lg font-medium text-gray-800 bg-yellow-50 px-2 py-0.5 rounded border border-yellow-200">{primaryInfo.inputLocation}</span>
              </div>
           </div>
           
           {primaryInfo.formula && (
             <div className="mt-4 bg-white p-4 rounded-lg border border-indigo-200 shadow-sm">
                <span className="block text-xs font-bold text-indigo-500 uppercase tracking-wider mb-1">Calculation Formula</span>
                <code className="text-sm font-mono text-indigo-800 block bg-indigo-50 p-2 rounded border border-indigo-100">
                  {primaryInfo.formula}
                </code>
             </div>
           )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider border-b border-gray-200">
                <th className="p-4 font-semibold w-1/4">报告字段名 UI Label</th>
                <th className="p-4 font-semibold w-1/6">报告位置 Location</th>
                <th className="p-4 font-semibold w-1/2">上下文 Context Snippet</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {variableDetails.map((detail, index) => (
                <tr key={index} className="hover:bg-blue-50 transition-colors text-sm">
                  <td className="p-4 font-medium text-gray-900 bg-yellow-50/30 border-r border-gray-100 align-top">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-gray-400 shrink-0" />
                      {detail.uiLabel}
                    </div>
                  </td>
                  <td className="p-4 text-gray-600 align-top">
                    <div className="flex items-start gap-2">
                      <MapPin size={16} className="text-gray-400 shrink-0 mt-0.5" />
                      {detail.location}
                    </div>
                  </td>
                  <td className="p-4 text-gray-700 bg-gray-50 border-l border-gray-100 align-top">
                    <div className="flex items-start gap-2 font-mono text-xs leading-relaxed">
                      <AlignLeft size={16} className="text-gray-400 shrink-0 mt-0.5" />
                      {detail.context}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  if (selectedVariable) {
    return <div className="p-8 bg-gray-50 min-h-full">{renderDetailView()}</div>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        <div className="p-6 border-b border-gray-200 bg-white flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">报告数据映射字典</h2>
            <p className="text-sm text-gray-500 mt-1">Report Data Source Mapping & Variable Tracking</p>
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="搜索变量、名称或类别..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-72"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider border-b border-gray-200">
                <th className="p-4 font-semibold w-[12%]">类别 Category</th>
                <th className="p-4 font-semibold w-[12%]">数据来源 Source</th>
                <th className="p-4 font-semibold w-[12%]">变量名称 Variable Key</th>
                <th className="p-4 font-semibold w-[12%]">输入位置 Input Location</th>
                <th className="p-4 font-semibold w-[12%]">映射字段名 UI Label</th>
                <th className="p-4 font-semibold w-[20%]">运算公式 Formula</th>
                <th className="p-4 font-semibold w-[8%] text-center">操作</th>
                <th className="p-4 font-semibold w-[12%]">示例 Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredMappings.map((row, index) => (
                <tr key={index} className="hover:bg-blue-50 transition-colors text-sm group">
                  <td className="p-4 font-medium text-gray-900 bg-gray-50/50">{row.category}</td>
                  <td className="p-4 text-purple-700 font-medium bg-purple-50/30">{row.source}</td>
                  <td className="p-4 font-mono text-blue-700 break-all">{row.variableKey}</td>
                  <td className="p-4 text-gray-700 font-medium bg-orange-50/30 border-l border-r border-gray-100">{row.inputLocation}</td>
                  <td className="p-4 text-gray-800 font-medium"><span className="bg-yellow-100 border-b border-black px-1">{row.uiLabel}</span></td>
                  <td className="p-4 text-gray-500 font-mono text-xs italic bg-indigo-50/20">{row.formula || '-'}</td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => setSelectedVariable(row.variableKey)}
                      className="text-gray-400 hover:text-blue-600 hover:bg-blue-100 p-2 rounded-full transition-all"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                  <td className="p-4 text-gray-500 font-mono text-xs overflow-hidden max-w-[12rem] whitespace-nowrap text-ellipsis" title={row.example}>
                    {row.example}
                  </td>
                </tr>
              ))}
              {filteredMappings.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-gray-500">
                    No mapping fields found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 text-right">
          Total Report Mappings: {REPORT_MAPPINGS.length}
        </div>
      </div>
    </div>
  );
};
