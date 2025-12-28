import React, { useState } from 'react';
import { Search, Eye, ArrowLeft, FileText, MapPin, AlignLeft } from 'lucide-react';

interface MappingEntry {
  category: string;
  variableKey: string;
  inputLocation: string; // New field: Where the user enters this data
  description: string; // What the variable represents
  uiLabel: string; // The text label in the UI or concept
  location: string; // Section ID or Title (Usage location)
  context: string; // Surrounding text or code snippet
  example: string; // Example value
}

const MAPPINGS: MappingEntry[] = [
  // ==================================================================================
  // 1. HEADER & COVER (Product Info, Protocol Info, Personnel)
  // ==================================================================================
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '页眉标题 (CN)', location: 'ProtocolHeader', context: '[productId] 含量和鉴别检验方法验证方案', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '页眉标题 (EN)', location: 'ProtocolHeader', context: 'Protocol for Validation of [productId] Assay and Identification Determination', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '封面题目 (EN)', location: 'Cover (Title Row)', context: 'Protocol for Validation of [productId] Assay and Identification Determination', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '封面适用范围 (CN)', location: 'Cover (Scope Row)', context: '[productId] 含量和鉴别测定', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '封面适用范围 (EN)', location: 'Cover (Scope Row)', context: 'Assay and Identification Determination of [productId]', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '目的内容 (CN)', location: '1. Objective', context: '由于 [productId] 含量测定和鉴别检验方法为自行开发的 HPLC 方法...', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '目的内容 (EN)', location: '1. Objective', context: 'Analysis method of [productId] Assay and Identification Determination...', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '范围内容 (CN)', location: '2. Scope', context: '本方案适用于 [productId] 含量测定和鉴别检验方法的验证', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '范围内容 (EN)', location: '2. Scope', context: 'applicable to the validation of [productId] Assay and Identification Determination', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '产品代码值', location: '4.1 Product Description', context: '产品代码 Product ID: [productId]', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '对照品配制说明 (CN)', location: '4.3 Sol Prep (Standard)', context: '取 [productId] 对照品约 [stdWeight] mg', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '对照品配制说明 (EN)', location: '4.3 Sol Prep (Standard)', context: '...mg of [productId] reference standard...', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '公式定义 W_STD1', location: '4.7 Calculation', context: 'W_STD1：对照品溶液1中 [productId] 对照品的称样量', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '公式定义 W_STD2', location: '4.7 Calculation', context: 'W_STD2：对照品溶液2中 [productId] 对照品的称样量', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '公式定义 A_STD1', location: '4.7 Calculation', context: 'A_STD1：对照品溶液1中 [productId] 连续进样5针的平均峰面积', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '公式定义 A_STD2', location: '4.7 Calculation', context: 'A_STD2：对照品溶液2中 [productId] 的峰面积', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '精密度表格名称', location: '6.x Precision (Desc Table)', context: 'Table Row Name: [productId]', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '稳定性供试品 (CN)', location: '6.x Stability (Desc)', context: '考察 [productId] 的峰面积', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '稳定性供试品回收率 (CN)', location: '6.x Stability (Desc)', context: '与0h相比，[productId] 峰面积的回收率', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '稳定性供试品 (EN)', location: '6.x Stability (Desc)', context: 'the peak area of [productId] should be evaluated', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '稳定性供试品回收率 (EN)', location: '6.x Stability (Desc)', context: 'recovery for peak area of [productId] at each point', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '稳定性对照品 (CN)', location: '6.x Stability (Desc)', context: '考察 [productId] 的峰面积', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '稳定性对照品回收率 (CN)', location: '6.x Stability (Desc)', context: '与0h相比，[productId] 峰面积的回收率', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '稳定性对照品 (EN)', location: '6.x Stability (Desc)', context: 'the peak area of [productId] should be evaluated', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '稳定性对照品回收率 (EN)', location: '6.x Stability (Desc)', context: 'recovery for peak area of [productId] at each point', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '培训内容 (CN)', location: 'Prerequisite 1', context: '[productId] 含量和鉴别检验方法验证方案', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: 'Training Content (EN)', location: 'Prerequisite 1', context: 'Protocol for Validation of [productId] Assay and Identification Determination', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '2.2 溶液配制 (CN)', location: 'Val Proc Sys Suit', context: '2.2 溶液配制: 取 [productId] 对照品约 [weight] mg', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '2.2 溶液配制 (EN)', location: 'Val Proc Sys Suit', context: '...mg of [productId] reference standard...', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '2.2 溶液配制 L1 (CN)', location: 'Val Proc Linearity', context: '取 [productId] 对照品约 [L1] mg', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '2.2 溶液配制 L1 (EN)', location: 'Val Proc Linearity', context: 'mg of [productId] reference standard [L1]', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '2.2 溶液配制 L2 (CN)', location: 'Val Proc Linearity', context: '取 [productId] 对照品约 [L2] mg', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '2.2 溶液配制 L2 (EN)', location: 'Val Proc Linearity', context: 'mg of [productId] reference standard [L2]', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '2.2 溶液配制 L3 (CN)', location: 'Val Proc Linearity', context: '取 [productId] 对照品约 [L3] mg', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '2.2 溶液配制 L3 (EN)', location: 'Val Proc Linearity', context: 'mg of [productId] reference standard [L3]', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '2.2 溶液配制 L4 (CN)', location: 'Val Proc Linearity', context: '取 [productId] 对照品约 [L4] mg', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '2.2 溶液配制 L4 (EN)', location: 'Val Proc Linearity', context: 'mg of [productId] reference standard [L4]', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '2.2 溶液配制 L5 (CN)', location: 'Val Proc Linearity', context: '取 [productId] 对照品约 [L5] mg', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '2.2 溶液配制 L5 (EN)', location: 'Val Proc Linearity', context: 'mg of [productId] reference standard [L5]', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '精密度Proc表格名称', location: 'Val Proc Precision (Table)', context: 'Table Row Name: [productId]', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '1. 目的 (CN)', location: 'Val Proc Stability (Obj)', context: '观察 [productId] 峰的变化情况', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '1. Objective (EN)', location: 'Val Proc Stability (Obj)', context: 'The change of [productId] peak was observed', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '3. 标准 供试品 (CN)', location: 'Val Proc Stability (Acc)', context: '考察 [productId] 的峰面积', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '3. 标准 供试品回收率 (CN)', location: 'Val Proc Stability (Acc)', context: '与0h相比，[productId] 峰面积的回收率', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '3. Criteria Sample (EN)', location: 'Val Proc Stability (Acc)', context: 'the peak area of [productId] should be evaluated', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '3. Criteria Sample Rec (EN)', location: 'Val Proc Stability (Acc)', context: 'recovery for peak area of [productId]', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '3. 标准 对照品 (CN)', location: 'Val Proc Stability (Acc)', context: '考察 [productId] 的峰面积', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '3. 标准 对照品回收率 (CN)', location: 'Val Proc Stability (Acc)', context: '与0h相比，[productId] 峰面积的回收率', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '3. Criteria Standard (EN)', location: 'Val Proc Stability (Acc)', context: 'the peak area of [productId] should be evaluated', example: 'HY130225' },
  { category: 'Product Info', variableKey: 'productId', inputLocation: '封面 Cover', description: 'Product Catalog Number', uiLabel: '3. Criteria Standard Rec (EN)', location: 'Val Proc Stability (Acc)', context: 'recovery for peak area of [productId]', example: 'HY130225' },

  { category: 'Product Info', variableKey: 'protocolCode', inputLocation: '封面 Cover', description: 'Protocol Series Code', uiLabel: '方案号 (Middle)', location: 'Cover', context: 'Protocol #: AVP-[protocolCode]-[protocolVersion].00', example: 'A316' },
  { category: 'Product Info', variableKey: 'protocolCode', inputLocation: '封面 Cover', description: 'Protocol Series Code', uiLabel: '方案号 (Middle)', location: 'ProtocolHeader', context: 'Header Protocol #: AVP-[protocolCode]-...', example: 'A316' },
  { category: 'Product Info', variableKey: 'protocolVersion', inputLocation: '封面 Cover', description: 'Protocol Version', uiLabel: '方案号 (Suffix)', location: 'Cover', context: 'Protocol #: ...-[protocolVersion].00', example: '02' },
  { category: 'Product Info', variableKey: 'protocolVersion', inputLocation: '封面 Cover', description: 'Protocol Version', uiLabel: '方案号 (Suffix)', location: 'ProtocolHeader', context: 'Header Protocol #: ...-[protocolVersion].00', example: '02' },

  { category: 'Personnel', variableKey: 'preparerName', inputLocation: '封面 Cover', description: 'Preparer Name', uiLabel: '起草人姓名', location: 'Cover (Signatures)', context: 'Prepared By: Name: [preparerName]', example: '龙慧\nHui Long' },
  { category: 'Personnel', variableKey: 'preparerDept', inputLocation: '封面 Cover', description: 'Preparer Dept', uiLabel: '起草人部门', location: 'Cover (Signatures)', context: 'Prepared By: Dept: [preparerDept]', example: 'QC' },
  { category: 'Personnel', variableKey: 'preparerPos', inputLocation: '封面 Cover', description: 'Preparer Position', uiLabel: '起草人职位', location: 'Cover (Signatures)', context: 'Prepared By: Position: [preparerPos]', example: 'QC 工程师\nQC Engineer' },
  
  { category: 'Personnel', variableKey: 'rev1Name', inputLocation: '封面 Cover', description: 'Reviewer 1 Name', uiLabel: '审核人1姓名', location: 'Cover (Signatures)', context: 'Reviewed By (Row 1): Name: [rev1Name]', example: '李利娜\nLina Li' },
  { category: 'Personnel', variableKey: 'rev1Dept', inputLocation: '封面 Cover', description: 'Reviewer 1 Dept', uiLabel: '审核人1部门', location: 'Cover (Signatures)', context: 'Reviewed By (Row 1): Dept: [rev1Dept]', example: 'QC' },
  { category: 'Personnel', variableKey: 'rev1Pos', inputLocation: '封面 Cover', description: 'Reviewer 1 Position', uiLabel: '审核人1职位', location: 'Cover (Signatures)', context: 'Reviewed By (Row 1): Position: [rev1Pos]', example: 'QC 组长\nQC Group' },
  
  { category: 'Personnel', variableKey: 'rev2Name', inputLocation: '封面 Cover', description: 'Reviewer 2 Name', uiLabel: '审核人2姓名', location: 'Cover (Signatures)', context: 'Reviewed By (Row 2): Name: [rev2Name]', example: '叶文\nWen Ye' },
  { category: 'Personnel', variableKey: 'rev2Dept', inputLocation: '封面 Cover', description: 'Reviewer 2 Dept', uiLabel: '审核人2部门', location: 'Cover (Signatures)', context: 'Reviewed By (Row 2): Dept: [rev2Dept]', example: 'QA' },
  { category: 'Personnel', variableKey: 'rev2Pos', inputLocation: '封面 Cover', description: 'Reviewer 2 Position', uiLabel: '审核人2职位', location: 'Cover (Signatures)', context: 'Reviewed By (Row 2): Position: [rev2Pos]', example: 'QA 工程师\nQA Engineer' },
  
  { category: 'Personnel', variableKey: 'rev3Name', inputLocation: '封面 Cover', description: 'Reviewer 3 Name', uiLabel: '审核人3姓名', location: 'Cover (Signatures)', context: 'Reviewed By (Row 3): Name: [rev3Name]', example: '顾玉豪\nYuhao Gu' },
  { category: 'Personnel', variableKey: 'rev3Dept', inputLocation: '封面 Cover', description: 'Reviewer 3 Dept', uiLabel: '审核人3部门', location: 'Cover (Signatures)', context: 'Reviewed By (Row 3): Dept: [rev3Dept]', example: 'QC' },
  { category: 'Personnel', variableKey: 'rev3Pos', inputLocation: '封面 Cover', description: 'Reviewer 3 Position', uiLabel: '审核人3职位', location: 'Cover (Signatures)', context: 'Reviewed By (Row 3): Position: [rev3Pos]', example: 'QC 经理\nQC Manager' },

  { category: 'Personnel', variableKey: 'approverName', inputLocation: '封面 Cover', description: 'Approver Name', uiLabel: '批准人姓名', location: 'Cover (Approved)', context: 'Approved By: Name: [approverName]', example: '刘钟华\nZhonghua Liu' },
  { category: 'Personnel', variableKey: 'approverDept', inputLocation: '封面 Cover', description: 'Approver Dept', uiLabel: '批准人部门', location: 'Cover (Approved)', context: 'Approved By: Dept: [approverDept]', example: 'QA' },
  { category: 'Personnel', variableKey: 'approverPos', inputLocation: '封面 Cover', description: 'Approver Position', uiLabel: '批准人职位', location: 'Cover (Approved)', context: 'Approved By: Position: [approverPos]', example: 'QA 经理\nQA Manager' },

  // ==================================================================================
  // 4.1 PRODUCT DESCRIPTION
  // ==================================================================================
  { category: 'Product Details', variableKey: 'chemicalFormula', inputLocation: '4. 检验方法描述 - 4.1 产品描述', description: 'Chemical Formula', uiLabel: '化学式', location: '4.1 Product Description', context: '化学式 Formula: [chemicalFormula]', example: 'e.g. C8H10N4O2' },
  { category: 'Product Details', variableKey: 'chemicalName', inputLocation: '4. 检验方法描述 - 4.1 产品描述', description: 'Chemical Name', uiLabel: '化学名称', location: '4.1 Product Description', context: '化学名称 Chemical name: [chemicalName]', example: 'e.g. Caffeine' },

  // ==================================================================================
  // 4.2 INSTRUMENTS & CONDITIONS
  // ==================================================================================
  { category: 'Testing Conditions', variableKey: 'testingConditions[method].value', inputLocation: '4. 检验方法描述 - 4.2 仪器及检测条件', description: 'Method Name', uiLabel: '方法名称', location: '4.2 Instruments', context: 'Method name: [value]', example: 'TM-A316-LC-02.00' },
  { category: 'Testing Conditions', variableKey: 'testingConditions[instrument].value', inputLocation: '4. 检验方法描述 - 4.2 仪器及检测条件', description: 'Instrument', uiLabel: '仪器', location: '4.2 Instruments', context: 'Instrument: [value]', example: '高效液相色谱仪 HPLC' },
  { category: 'Testing Conditions', variableKey: 'testingConditions[column].value', inputLocation: '4. 检验方法描述 - 4.2 仪器及检测条件', description: 'Column', uiLabel: '色谱柱', location: '4.2 Instruments', context: 'Column: [value]', example: 'Waters_Xbridge Shield RP18...' },
  { category: 'Testing Conditions', variableKey: 'testingConditions[column].value', inputLocation: '4. 检验方法描述 - 4.2 仪器及检测条件', description: 'Column', uiLabel: '色谱柱 (确认表)', location: 'Prerequisite 2', context: 'Column confirmation table: [value]', example: 'Waters_Xbridge Shield RP18...' },
  { category: 'Testing Conditions', variableKey: 'testingConditions[ghostBuster].value', inputLocation: '4. 检验方法描述 - 4.2 仪器及检测条件', description: 'Ghost-Buster', uiLabel: '捕集小柱', location: '4.2 Instruments', context: 'Ghost-Buster column: [value]', example: 'Welch Ghost Buster_50mm×4.6mm' },
  { category: 'Testing Conditions', variableKey: 'testingConditions[ghostBuster].value', inputLocation: '4. 检验方法描述 - 4.2 仪器及检测条件', description: 'Ghost-Buster', uiLabel: '捕集小柱 (确认表)', location: 'Prerequisite 2', context: 'Column confirmation table: [value]', example: 'Welch Ghost Buster_50mm×4.6mm' },
  { category: 'Testing Conditions', variableKey: 'testingConditions[detector].value', inputLocation: '4. 检验方法描述 - 4.2 仪器及检测条件', description: 'Detector', uiLabel: '检测器', location: '4.2 Instruments', context: 'Detection: [value]', example: 'DAD' },
  { category: 'Testing Conditions', variableKey: 'testingConditions[colTemp].value', inputLocation: '4. 检验方法描述 - 4.2 仪器及检测条件', description: 'Column Temp', uiLabel: '柱温', location: '4.2 Instruments', context: 'Column temperature: [value]', example: '40℃' },
  { category: 'Testing Conditions', variableKey: 'testingConditions[samplerTemp].value', inputLocation: '4. 检验方法描述 - 4.2 仪器及检测条件', description: 'Sampler Temp', uiLabel: '样品盘温度', location: '4.2 Instruments', context: 'Sampler temperature: [value]', example: '5℃' },
  { category: 'Testing Conditions', variableKey: 'testingConditions[flowRate].value', inputLocation: '4. 检验方法描述 - 4.2 仪器及检测条件', description: 'Flow Rate', uiLabel: '流速', location: '4.2 Instruments', context: 'Flow rate: [value]', example: '1.2ml/min' },
  { category: 'Testing Conditions', variableKey: 'testingConditions[wavelength].value', inputLocation: '4. 检验方法描述 - 4.2 仪器及检测条件', description: 'Wavelength', uiLabel: '波长', location: '4.2 Instruments', context: 'Wavelength: [value]', example: '210nm' },
  { category: 'Testing Conditions', variableKey: 'testingConditions[injectionVol].value', inputLocation: '4. 检验方法描述 - 4.2 仪器及检测条件', description: 'Injection Volume', uiLabel: '进样量', location: '4.2 Instruments', context: 'Injection volume: [value]', example: '10μl' },
  { category: 'Testing Conditions', variableKey: 'testingConditions[runTime].value', inputLocation: '4. 检验方法描述 - 4.2 仪器及检测条件', description: 'Run Time', uiLabel: '运行时间', location: '4.2 Instruments', context: 'Run time: [value]', example: '40min' },
  { category: 'Testing Conditions', variableKey: 'testingConditions[phaseA].value', inputLocation: '4. 检验方法描述 - 4.2 仪器及检测条件', description: 'Mobile Phase A', uiLabel: '流动相 A', location: '4.2 Instruments', context: 'Mobile phase A: [value]', example: '10mmol/L 磷酸氢二钾溶液...' },
  { category: 'Testing Conditions', variableKey: 'testingConditions[phaseB].value', inputLocation: '4. 检验方法描述 - 4.2 仪器及检测条件', description: 'Mobile Phase B', uiLabel: '流动相 B', location: '4.2 Instruments', context: 'Mobile phase B: [value]', example: '乙腈 Acetonitrile' },
  { category: 'Testing Conditions', variableKey: 'testingConditions[needleWash].value', inputLocation: '4. 检验方法描述 - 4.2 仪器及检测条件', description: 'Needle Wash', uiLabel: '洗针液', location: '4.2 Instruments', context: 'Needle wash solution: [value]', example: '甲醇：水=100:900' },

  // ==================================================================================
  // 4.3 SOLUTION PREPARATION
  // ==================================================================================
  { category: 'Solution Prep', variableKey: 'solutionPreps.phaseA.descZh', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Phase A Desc (CN)', uiLabel: '流动相A描述 (中)', location: '4.3 Solution Prep', context: '➤ 流动相 A：[descZh]', example: '10mmol/L 磷酸氢二钾溶液...' },
  { category: 'Solution Prep', variableKey: 'solutionPreps.phaseA.descEn', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Phase A Desc (EN)', uiLabel: 'Phase A Desc (EN)', location: '4.3 Solution Prep', context: 'Mobile phase A: [descEn]', example: '10mmol/L dipotassium...' },
  { category: 'Solution Prep', variableKey: 'solutionPreps.phaseA.detail', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Phase A Detail', uiLabel: '流动相A配制', location: '4.3 Solution Prep', context: 'Detail block: [detail]', example: '称取无水磷酸氢二钾 1.74g...' },

  { category: 'Solution Prep', variableKey: 'solutionPreps.phaseB.descZh', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Phase B Desc (CN)', uiLabel: '流动相B描述 (中)', location: '4.3 Solution Prep', context: '➤ 流动相 B：[descZh]', example: '乙腈' },
  { category: 'Solution Prep', variableKey: 'solutionPreps.phaseB.descEn', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Phase B Desc (EN)', uiLabel: 'Phase B Desc (EN)', location: '4.3 Solution Prep', context: 'Mobile phase B: [descEn]', example: 'Acetonitrile' },
  { category: 'Solution Prep', variableKey: 'solutionPreps.phaseB.detail', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Phase B Detail', uiLabel: '流动相B配制', location: '4.3 Solution Prep', context: 'Detail block: [detail]', example: '取乙腈适量，超声脱气...' },

  { category: 'Solution Prep', variableKey: 'solutionPreps.needleWash.descZh', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Needle Wash Desc (CN)', uiLabel: '洗针液描述 (中)', location: '4.3 Solution Prep', context: '➤ 洗针液：[descZh]', example: '甲醇：水=100:900' },
  { category: 'Solution Prep', variableKey: 'solutionPreps.needleWash.descEn', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Needle Wash Desc (EN)', uiLabel: 'Needle Wash Desc (EN)', location: '4.3 Solution Prep', context: 'Needle wash solution: [descEn]', example: 'Methanol: Water =100:900' },
  { category: 'Solution Prep', variableKey: 'solutionPreps.needleWash.detail', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Needle Wash Detail', uiLabel: '洗针液配制', location: '4.3 Solution Prep', context: 'Detail block: [detail]', example: '量取甲醇 100ml，加入 900ml 水...' },

  { category: 'Solution Prep', variableKey: 'solutionPreps.diluent.descZh', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Diluent Name (CN)', uiLabel: '稀释剂 (中)', location: '4.3 Solution Prep', context: '➤ 稀释剂（空白）: [descZh]', example: '乙腈' },
  { category: 'Solution Prep', variableKey: 'solutionPreps.diluent.descZh', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Diluent Name (CN)', uiLabel: '稀释剂 (中)', location: 'Val Proc Sys Suit', context: '2.2 溶液配制: 稀释剂（空白）：[descZh]', example: '乙腈' },
  { category: 'Solution Prep', variableKey: 'solutionPreps.diluent.descZh', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Diluent Name (CN)', uiLabel: '稀释剂 (中)', location: 'Val Proc Specificity', context: '2.2 溶液配制: 稀释剂（空白）：[descZh]', example: '乙腈' },
  { category: 'Solution Prep', variableKey: 'solutionPreps.diluent.descZh', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Diluent Name (CN)', uiLabel: '稀释剂 (中)', location: 'Val Proc Linearity', context: '2.2 溶液配制: 稀释剂（空白）：[descZh]', example: '乙腈' },
  { category: 'Solution Prep', variableKey: 'solutionPreps.diluent.descZh', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Diluent Name (CN)', uiLabel: '稀释剂 (中)', location: 'Val Proc Precision', context: '2.2 溶液配制: 稀释剂（空白）：[descZh]', example: '乙腈' },
  { category: 'Solution Prep', variableKey: 'solutionPreps.diluent.descZh', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Diluent Name (CN)', uiLabel: '稀释剂 (中)', location: 'Val Proc Stability', context: '2.2 溶液配制: 空白/稀释剂：[descZh]', example: '乙腈' },
  { category: 'Solution Prep', variableKey: 'solutionPreps.diluent.descEn', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Diluent Name (EN)', uiLabel: 'Diluent Name (EN)', location: '4.3 Solution Prep', context: 'Diluent(Blank): [descEn]', example: 'Acetonitrile' },
  { category: 'Solution Prep', variableKey: 'solutionPreps.diluent.descEn', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Diluent Name (EN)', uiLabel: 'Diluent Name (EN)', location: 'Val Proc Sys Suit', context: 'Diluent(Blank): [descEn]', example: 'Acetonitrile' },
  { category: 'Solution Prep', variableKey: 'solutionPreps.diluent.descEn', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Diluent Name (EN)', uiLabel: 'Diluent Name (EN)', location: 'Val Proc Specificity', context: 'Diluent(Blank): [descEn]', example: 'Acetonitrile' },
  { category: 'Solution Prep', variableKey: 'solutionPreps.diluent.descEn', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Diluent Name (EN)', uiLabel: 'Diluent Name (EN)', location: 'Val Proc Linearity', context: 'Diluent(Blank): [descEn]', example: 'Acetonitrile' },
  { category: 'Solution Prep', variableKey: 'solutionPreps.diluent.descEn', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Diluent Name (EN)', uiLabel: 'Diluent Name (EN)', location: 'Val Proc Precision', context: 'Diluent(Blank): [descEn]', example: 'Acetonitrile' },
  { category: 'Solution Prep', variableKey: 'solutionPreps.diluent.descEn', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Diluent Name (EN)', uiLabel: 'Diluent Name (EN)', location: 'Val Proc Stability', context: 'Blank/diluent: [descEn]', example: 'Acetonitrile' },

  { category: 'Solution Detail', variableKey: 'solDetail.stdWeight', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Standard Weight', uiLabel: '对照品称样量', location: '4.3 Solution Prep', context: '取 ... 约 [stdWeight] mg', example: '20' },
  { category: 'Solution Detail', variableKey: 'solDetail.stdWeight', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Standard Weight', uiLabel: '对照品称样量', location: 'Val Proc Sys Suit', context: '取 ... 约 [stdWeight] mg', example: '20' },
  { category: 'Solution Detail', variableKey: 'solDetail.stdVolume', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Standard Volume', uiLabel: '对照品体积', location: '4.3 Solution Prep', context: '置 [stdVolume] ml 量瓶中', example: '100' },
  { category: 'Solution Detail', variableKey: 'solDetail.stdVolume', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Standard Volume', uiLabel: '对照品体积', location: 'Val Proc Sys Suit', context: '置 [stdVolume] ml 量瓶中', example: '100' },
  { category: 'Solution Detail', variableKey: 'solDetail.stdMethodZh', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Standard Method (CN)', uiLabel: '对照品方法 (中)', location: '4.3 Solution Prep', context: '量瓶中，[stdMethodZh]', example: '加入稀释剂振摇溶解并稀释至刻度' },
  { category: 'Solution Detail', variableKey: 'solDetail.stdMethodZh', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Standard Method (CN)', uiLabel: '对照品方法 (中)', location: 'Val Proc Sys Suit', context: '量瓶中，[stdMethodZh]', example: '加入稀释剂振摇溶解并稀释至刻度' },
  { category: 'Solution Detail', variableKey: 'solDetail.stdMethodEn', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Standard Method (EN)', uiLabel: 'Standard Method (EN)', location: '4.3 Solution Prep', context: 'flask, [stdMethodEn]', example: 'shake to dissolve...' },
  { category: 'Solution Detail', variableKey: 'solDetail.stdMethodEn', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Standard Method (EN)', uiLabel: 'Standard Method (EN)', location: 'Val Proc Sys Suit', context: 'flask, [stdMethodEn]', example: 'shake to dissolve...' },
  { category: 'Solution Detail', variableKey: 'solDetail.stdCount', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Standard Prep Count', uiLabel: '对照品配制份数', location: '4.3 Solution Prep', context: '平行配制 [stdCount] 份', example: '2' },
  { category: 'Solution Detail', variableKey: 'solDetail.stdCount', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Standard Prep Count', uiLabel: '对照品配制份数', location: 'Val Proc Sys Suit', context: '平行配制 [stdCount] 份', example: '2' },

  { category: 'Solution Detail', variableKey: 'solDetail.splWeight', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Sample Weight', uiLabel: '供试品称样量', location: '4.3 Solution Prep', context: '取供试品约 [splWeight] mg', example: '20' },
  { category: 'Solution Detail', variableKey: 'solDetail.splWeight', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Sample Weight', uiLabel: '供试品称样量', location: 'Val Proc Specificity', context: '称取供试品约 [splWeight] mg', example: '20' },
  { category: 'Solution Detail', variableKey: 'solDetail.splWeight', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Sample Weight', uiLabel: '供试品称样量', location: 'Val Proc Precision', context: '称取供试品约 [splWeight] mg', example: '20' },
  { category: 'Solution Detail', variableKey: 'solDetail.splVolume', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Sample Volume', uiLabel: '供试品体积', location: '4.3 Solution Prep', context: '置 [splVolume] ml 量瓶中', example: '100' },
  { category: 'Solution Detail', variableKey: 'solDetail.splVolume', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Sample Volume', uiLabel: '供试品体积', location: 'Val Proc Specificity', context: '置 [splVolume] ml 量瓶中', example: '100' },
  { category: 'Solution Detail', variableKey: 'solDetail.splVolume', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Sample Volume', uiLabel: '供试品体积', location: 'Val Proc Precision', context: '置 [splVolume] ml 量瓶中', example: '100' },
  { category: 'Solution Detail', variableKey: 'solDetail.splMethodZh', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Sample Method (CN)', uiLabel: '供试品方法 (中)', location: '4.3 Solution Prep', context: '量瓶中，[splMethodZh]', example: '加入稀释剂振摇溶解并稀释至刻度' },
  { category: 'Solution Detail', variableKey: 'solDetail.splMethodZh', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Sample Method (CN)', uiLabel: '供试品方法 (中)', location: 'Val Proc Specificity', context: '量瓶中，[splMethodZh]', example: '加入稀释剂振摇溶解并稀释至刻度' },
  { category: 'Solution Detail', variableKey: 'solDetail.splMethodZh', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Sample Method (CN)', uiLabel: '供试品方法 (中)', location: 'Val Proc Precision', context: '量瓶中，[splMethodZh]', example: '加入稀释剂振摇溶解并稀释至刻度' },
  { category: 'Solution Detail', variableKey: 'solDetail.splMethodEn', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Sample Method (EN)', uiLabel: 'Sample Method (EN)', location: '4.3 Solution Prep', context: 'flask, [splMethodEn]', example: 'shake to dissolve...' },
  { category: 'Solution Detail', variableKey: 'solDetail.splMethodEn', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Sample Method (EN)', uiLabel: 'Sample Method (EN)', location: 'Val Proc Specificity', context: 'flask, [splMethodEn]', example: 'shake to dissolve...' },
  { category: 'Solution Detail', variableKey: 'solDetail.splMethodEn', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Sample Method (EN)', uiLabel: 'Sample Method (EN)', location: 'Val Proc Precision', context: 'flask, [splMethodEn]', example: 'shake to dissolve...' },
  { category: 'Solution Detail', variableKey: 'solDetail.splCount', inputLocation: '4. 检验方法描述 - 4.3 溶液配制', description: 'Sample Prep Count', uiLabel: '供试品配制份数', location: '4.3 Solution Prep', context: '平行配制 [splCount] 份', example: '2' },

  // ==================================================================================
  // 4.4 SEQUENCE
  // ==================================================================================
  { category: 'Sequence', variableKey: 'sequenceState.std1Count', inputLocation: '4. 检验方法描述 - 4.4 序列设置', description: 'Sequence STD1', uiLabel: '序列 STD1 针数', location: '4.4 Sequence', context: 'STD1 ... [std1Count]', example: '5' },
  { category: 'Sequence', variableKey: 'sequenceState.std2Count', inputLocation: '4. 检验方法描述 - 4.4 序列设置', description: 'Sequence STD2', uiLabel: '序列 STD2 针数', location: '4.4 Sequence', context: 'STD2 ... [std2Count]', example: '1' },
  { category: 'Sequence', variableKey: 'sequenceState.spl1Count', inputLocation: '4. 检验方法描述 - 4.4 序列设置', description: 'Sequence SPL1', uiLabel: '序列 SPL1 针数', location: '4.4 Sequence', context: 'SPL1 ... [spl1Count]', example: '1' },
  { category: 'Sequence', variableKey: 'sequenceState.spl2Count', inputLocation: '4. 检验方法描述 - 4.4 序列设置', description: 'Sequence SPL2', uiLabel: '序列 SPL2 针数', location: '4.4 Sequence', context: 'SPL2 ... [spl2Count]', example: '1' },
  { category: 'Sequence', variableKey: 'sequenceState.controlCount', inputLocation: '4. 检验方法描述 - 4.4 序列设置', description: 'Sequence Control', uiLabel: '序列随行对照针数', location: '4.4 Sequence', context: 'Accompanying control ... [controlCount]', example: '1' },

  // ==================================================================================
  // 4.5 SYSTEM SUITABILITY PARAMETERS
  // ==================================================================================
  { category: 'System Suitability', variableKey: 'sysSuitability.plateNumber', inputLocation: '4. 检验方法描述 - 4.5 系统适用性要求', description: 'Plate Number', uiLabel: '理论板数', location: '4.5 Sys Suit', context: '主峰理论板数应不低于 [plateNumber]', example: '5000' },
  { category: 'System Suitability', variableKey: 'sysSuitability.plateNumber', inputLocation: '4. 检验方法描述 - 4.5 系统适用性要求', description: 'Plate Number', uiLabel: '理论板数', location: 'Val Proc Sys Suit (Req)', context: '主峰理论板数应不低于 [plateNumber]', example: '5000' },
  { category: 'System Suitability', variableKey: 'sysSuitability.tailingFactor', inputLocation: '4. 检验方法描述 - 4.5 系统适用性要求', description: 'Tailing Factor', uiLabel: '拖尾因子', location: '4.5 Sys Suit', context: '拖尾因子应不大于 [tailingFactor]', example: '2.5' },
  { category: 'System Suitability', variableKey: 'sysSuitability.tailingFactor', inputLocation: '4. 检验方法描述 - 4.5 系统适用性要求', description: 'Tailing Factor', uiLabel: '拖尾因子', location: 'Val Proc Sys Suit (Req)', context: '拖尾因子应不大于 [tailingFactor]', example: '2.5' },
  { category: 'System Suitability', variableKey: 'sysSuitability.injectionCount', inputLocation: '4. 检验方法描述 - 4.5 系统适用性要求', description: 'Injection Count (RSD)', uiLabel: 'RSD进样针数', location: '4.5 Sys Suit', context: '连续进样 [injectionCount] 针', example: '5' },
  { category: 'System Suitability', variableKey: 'sysSuitability.injectionCount', inputLocation: '4. 检验方法描述 - 4.5 系统适用性要求', description: 'Injection Count (RSD)', uiLabel: 'RSD进样针数', location: 'Val Proc Sys Suit (Req)', context: '连续进样 [injectionCount] 针', example: '5' },
  { category: 'System Suitability', variableKey: 'sysSuitability.areaRSD', inputLocation: '4. 检验方法描述 - 4.5 系统适用性要求', description: 'Area RSD Limit', uiLabel: '面积 RSD', location: '4.5 Sys Suit', context: '峰面积的RSD应≤ [areaRSD] %', example: '2.0' },
  { category: 'System Suitability', variableKey: 'sysSuitability.areaRSD', inputLocation: '4. 检验方法描述 - 4.5 系统适用性要求', description: 'Area RSD Limit', uiLabel: '面积 RSD', location: 'Val Proc Sys Suit (Req)', context: '峰面积的RSD应≤ [areaRSD] %', example: '2.0' },
  { category: 'System Suitability', variableKey: 'sysSuitability.retentionRSD', inputLocation: '4. 检验方法描述 - 4.5 系统适用性要求', description: 'Retention RSD Limit', uiLabel: '保留时间 RSD', location: '4.5 Sys Suit', context: '保留时间的RSD应≤ [retentionRSD] %', example: '1.0' },
  { category: 'System Suitability', variableKey: 'sysSuitability.retentionRSD', inputLocation: '4. 检验方法描述 - 4.5 系统适用性要求', description: 'Retention RSD Limit', uiLabel: '保留时间 RSD', location: 'Val Proc Sys Suit (Req)', context: '保留时间的RSD应≤ [retentionRSD] %', example: '1.0' },
  { category: 'System Suitability', variableKey: 'sysSuitability.recoveryRange', inputLocation: '4. 检验方法描述 - 4.5 系统适用性要求', description: 'Recovery Range', uiLabel: '回收率范围 (Sys)', location: '4.5 Sys Suit', context: '回收率在 [recoveryRange] 之间', example: '98.0%~102.0%' },
  { category: 'System Suitability', variableKey: 'sysSuitability.recoveryRange', inputLocation: '4. 检验方法描述 - 4.5 系统适用性要求', description: 'Recovery Range (Sys)', uiLabel: '回收率范围 (Sys)', location: 'Val Proc Sys Suit (Req)', context: '回收率在 [recoveryRange] 之间', example: '98.0%~102.0%' },
  { category: 'System Suitability', variableKey: 'sysSuitability.controlInjectionCount', inputLocation: '4. 检验方法描述 - 4.5 系统适用性要求', description: 'Control Injection Count', uiLabel: '对照RSD针数', location: 'Val Proc Sys Suit (Req)', context: '和对照品溶液1连续 [controlInjectionCount] 针', example: '5' },
  { category: 'System Suitability', variableKey: 'sysSuitability.controlAreaRSD', inputLocation: '4. 检验方法描述 - 4.5 系统适用性要求', description: 'Control Area RSD', uiLabel: '对照RSD限度', location: 'Val Proc Sys Suit (Req)', context: '峰面积的RSD应≤ [controlAreaRSD] %', example: '2.0' },

  // ==================================================================================
  // 6.x VALIDATION PARAMETERS
  // ==================================================================================
  { category: 'Validation Params', variableKey: 'specificityState.retentionDevLimit', inputLocation: '6. 验证内容 - 6.x 专属性', description: 'Retention Deviation', uiLabel: '保留时间偏差限度', location: '6.x Specificity (Req)', context: '保留时间相对偏差应不大于 [retentionDevLimit] %', example: '5.0' },
  { category: 'Validation Params', variableKey: 'specificityState.retentionDevLimit', inputLocation: '6. 验证内容 - 6.x 专属性', description: 'Retention Deviation', uiLabel: '保留时间偏差限度', location: 'Val Proc Specificity', context: '保留时间相对偏差应不大于 [retentionDevLimit] %', example: '5.0' },

  { category: 'Validation Params', variableKey: 'linearityState.concentrations', inputLocation: '6. 验证内容 - 6.x 线性和范围', description: 'Concentrations Array', uiLabel: '线性浓度点', location: '6.x Linearity', context: '配制成 [concentrations] ... 个浓度水平', example: '80%, 90%, 100%, 110%, 120%' },
  { category: 'Validation Params', variableKey: 'linearityState.l1.weight', inputLocation: '6. 验证内容 - 6.x 线性和范围', description: 'L1 Weight', uiLabel: '线性L1称样量', location: 'Val Proc Linearity', context: 'L1: 取 ... 约 [weight] mg', example: '16' },
  { category: 'Validation Params', variableKey: 'linearityState.l1.volume', inputLocation: '6. 验证内容 - 6.x 线性和范围', description: 'L1 Volume', uiLabel: '线性L1体积', location: 'Val Proc Linearity', context: 'L1: 置 [volume] ml 量瓶中', example: '100' },
  { category: 'Validation Params', variableKey: 'linearityState.l2.weight', inputLocation: '6. 验证内容 - 6.x 线性和范围', description: 'L2 Weight', uiLabel: '线性L2称样量', location: 'Val Proc Linearity', context: 'L2: 取 ... 约 [weight] mg', example: '18' },
  { category: 'Validation Params', variableKey: 'linearityState.l2.volume', inputLocation: '6. 验证内容 - 6.x 线性和范围', description: 'L2 Volume', uiLabel: '线性L2体积', location: 'Val Proc Linearity', context: 'L2: 置 [volume] ml 量瓶中', example: '100' },
  { category: 'Validation Params', variableKey: 'linearityState.l3.weight', inputLocation: '6. 验证内容 - 6.x 线性和范围', description: 'L3 Weight', uiLabel: '线性L3称样量', location: 'Val Proc Linearity', context: 'L3: 取 ... 约 [weight] mg', example: '20' },
  { category: 'Validation Params', variableKey: 'linearityState.l3.volume', inputLocation: '6. 验证内容 - 6.x 线性和范围', description: 'L3 Volume', uiLabel: '线性L3体积', location: 'Val Proc Linearity', context: 'L3: 置 [volume] ml 量瓶中', example: '100' },
  { category: 'Validation Params', variableKey: 'linearityState.l4.weight', inputLocation: '6. 验证内容 - 6.x 线性和范围', description: 'L4 Weight', uiLabel: '线性L4称样量', location: 'Val Proc Linearity', context: 'L4: 取 ... 约 [weight] mg', example: '22' },
  { category: 'Validation Params', variableKey: 'linearityState.l4.volume', inputLocation: '6. 验证内容 - 6.x 线性和范围', description: 'L4 Volume', uiLabel: '线性L4体积', location: 'Val Proc Linearity', context: 'L4: 置 [volume] ml 量瓶中', example: '100' },
  { category: 'Validation Params', variableKey: 'linearityState.l5.weight', inputLocation: '6. 验证内容 - 6.x 线性和范围', description: 'L5 Weight', uiLabel: '线性L5称样量', location: 'Val Proc Linearity', context: 'L5: 取 ... 约 [weight] mg', example: '24' },
  { category: 'Validation Params', variableKey: 'linearityState.l5.volume', inputLocation: '6. 验证内容 - 6.x 线性和范围', description: 'L5 Volume', uiLabel: '线性L5体积', location: 'Val Proc Linearity', context: 'L5: 置 [volume] ml 量瓶中', example: '100' },

  { category: 'Validation Params', variableKey: 'precisionState.precisionLimit', inputLocation: '6. 验证内容 - 6.x 精密度', description: 'Precision RSD Limit', uiLabel: '精密度RSD限度', location: '6.x Precision (Table)', context: 'RSD%: [precisionLimit]', example: 'NMT 2.0%' },
  { category: 'Validation Params', variableKey: 'precisionState.precisionLimit', inputLocation: '6. 验证内容 - 6.x 精密度', description: 'Precision RSD Limit', uiLabel: '精密度RSD限度', location: 'Val Proc Precision (Acc)', context: 'RSD%: [precisionLimit]', example: 'NMT 2.0%' },

  { category: 'Validation Params', variableKey: 'accuracyState.recoveryRange', inputLocation: '6. 验证内容 - 6.x 准确度', description: 'Accuracy Recovery', uiLabel: '准确度回收率范围', location: '6.x Accuracy', context: '回收率均应在 [recoveryRange] 范围内', example: '98.0%-102.0%' },
  { category: 'Validation Params', variableKey: 'accuracyState.recoveryRange', inputLocation: '6. 验证内容 - 6.x 准确度', description: 'Accuracy Recovery', uiLabel: '准确度回收率范围', location: 'Val Proc Accuracy (Acc)', context: '回收率均应在 [recoveryRange] 范围内', example: '98.0%-102.0%' },
  { category: 'Validation Params', variableKey: 'accuracyState.rsdLimit', inputLocation: '6. 验证内容 - 6.x 准确度', description: 'Accuracy RSD', uiLabel: '准确度RSD限度', location: '6.x Accuracy', context: 'RSD≤ [rsdLimit]', example: '2.0%' },
  { category: 'Validation Params', variableKey: 'accuracyState.rsdLimit', inputLocation: '6. 验证内容 - 6.x 准确度', description: 'Accuracy RSD', uiLabel: '准确度RSD限度', location: 'Val Proc Accuracy (Acc)', context: 'RSD≤ [rsdLimit]', example: '2.0%' },

  { category: 'Validation Params', variableKey: 'stabilityState.sampleTemp', inputLocation: '6. 验证内容 - 6.x 溶液稳定性', description: 'Stability Sample Temp', uiLabel: '稳定性供试品温度', location: '6.x Stability', context: '供试品溶液 [sampleTemp] ℃条件下', example: '5±3' },
  { category: 'Validation Params', variableKey: 'stabilityState.sampleTemp', inputLocation: '6. 验证内容 - 6.x 溶液稳定性', description: 'Stability Sample Temp', uiLabel: '稳定性供试品温度', location: 'Val Proc Stability (Acc)', context: '供试品溶液 [sampleTemp] ℃条件下', example: '5±3' },
  { category: 'Validation Params', variableKey: 'stabilityState.sampleRecovery', inputLocation: '6. 验证内容 - 6.x 溶液稳定性', description: 'Stability Sample Rec', uiLabel: '稳定性供试品回收率', location: '6.x Stability', context: '回收率应在 [sampleRecovery] 之间', example: '98.0%~102.0%' },
  { category: 'Validation Params', variableKey: 'stabilityState.sampleRecovery', inputLocation: '6. 验证内容 - 6.x 溶液稳定性', description: 'Stability Sample Rec', uiLabel: '稳定性供试品回收率', location: 'Val Proc Stability (Acc)', context: '回收率应在 [sampleRecovery] 之间', example: '98.0%~102.0%' },
  { category: 'Validation Params', variableKey: 'stabilityState.standardTemp', inputLocation: '6. 验证内容 - 6.x 溶液稳定性', description: 'Stability Standard Temp', uiLabel: '稳定性对照品温度', location: '6.x Stability', context: '对照品溶液在 [standardTemp] ℃条件下', example: '5±3' },
  { category: 'Validation Params', variableKey: 'stabilityState.standardTemp', inputLocation: '6. 验证内容 - 6.x 溶液稳定性', description: 'Stability Standard Temp', uiLabel: '稳定性对照品温度', location: 'Val Proc Stability (Obj)', context: '对照品溶液...在 [standardTemp] ℃条件下', example: '5±3' },
  { category: 'Validation Params', variableKey: 'stabilityState.standardTemp', inputLocation: '6. 验证内容 - 6.x 溶液稳定性', description: 'Stability Standard Temp', uiLabel: '稳定性对照品温度', location: 'Val Proc Stability (Acc)', context: '对照品溶液...在 [standardTemp] ℃条件下', example: '5±3' },
  { category: 'Validation Params', variableKey: 'stabilityState.standardRecovery', inputLocation: '6. 验证内容 - 6.x 溶液稳定性', description: 'Stability Standard Rec', uiLabel: '稳定性对照品回收率', location: '6.x Stability', context: '回收率应在 [standardRecovery] 之间', example: '98.0%~102.0%' },
  { category: 'Validation Params', variableKey: 'stabilityState.standardRecovery', inputLocation: '6. 验证内容 - 6.x 溶液稳定性', description: 'Stability Standard Rec', uiLabel: '稳定性对照品回收率', location: 'Val Proc Stability (Acc)', context: '回收率应在 [standardRecovery] 之间', example: '98.0%~102.0%' },

  // ==================================================================================
  // VALIDATION PROCEDURE (Prerequisites & Procedure Steps)
  // ==================================================================================
  { category: 'Prerequisites', variableKey: 'prerequisiteState.columnSuppliers.column', inputLocation: '验证步骤 - 先决条件 2', description: 'Column Supplier', uiLabel: '色谱柱厂家', location: 'Prerequisite 2', context: 'Column: [value] (Supplier)', example: 'Waters' },
  { category: 'Prerequisites', variableKey: 'prerequisiteState.columnSuppliers.ghostBuster', inputLocation: '验证步骤 - 先决条件 2', description: 'Ghost-Buster Supplier', uiLabel: '捕集小柱厂家', location: 'Prerequisite 2', context: 'Ghost-Buster: [value] (Supplier)', example: 'Welch' },

  { category: 'Sequence', variableKey: 'valProcSysSuitState.std1Count', inputLocation: '验证步骤 - (一) 系统适用性', description: 'Proc SysSuit STD1', uiLabel: '系统适用性Proc STD1', location: 'Val Proc Sys Suit', context: 'STD1 ... [std1Count]', example: '5' },
  { category: 'Sequence', variableKey: 'valProcSysSuitState.std2Count', inputLocation: '验证步骤 - (一) 系统适用性', description: 'Proc SysSuit STD2', uiLabel: '系统适用性Proc STD2', location: 'Val Proc Sys Suit', context: 'STD2 ... [std2Count]', example: '1' },
  { category: 'Sequence', variableKey: 'valProcSysSuitState.controlCount', inputLocation: '验证步骤 - (一) 系统适用性', description: 'Proc SysSuit Control', uiLabel: '系统适用性Proc Control', location: 'Val Proc Sys Suit', context: 'Accompanying control ... [controlCount]', example: '1' },

  { category: 'Sequence', variableKey: 'valProcPrecisionState.precisionStd1Count', inputLocation: '验证步骤 - (四) 精密度', description: 'Proc Precision STD1', uiLabel: '精密度Proc STD1', location: 'Val Proc Precision', context: 'STD1 ... [precisionStd1Count]', example: '5' },
  { category: 'Sequence', variableKey: 'valProcPrecisionState.precisionStd2Count', inputLocation: '验证步骤 - (四) 精密度', description: 'Proc Precision STD2', uiLabel: '精密度Proc STD2', location: 'Val Proc Precision', context: 'STD2 ... [precisionStd2Count]', example: '1' },
];

export const DataMappingDictionary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVariable, setSelectedVariable] = useState<string | null>(null);

  const filteredMappings = MAPPINGS.filter(item => 
    item.variableKey.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.uiLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderDetailView = () => {
    if (!selectedVariable) return null;

    // Filter to find all entries for this variable key
    const variableDetails = MAPPINGS.filter(m => m.variableKey === selectedVariable);
    
    if (variableDetails.length === 0) return <div>Variable details not found.</div>;

    const primaryInfo = variableDetails[0];

    return (
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-gray-200 bg-white flex items-center gap-4">
          <button 
            onClick={() => setSelectedVariable(null)}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors"
          >
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
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Occurrences</span>
                <span className="text-2xl font-bold text-blue-600">{variableDetails.length}</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Input Location</span>
                <span className="text-lg font-medium text-gray-800 bg-yellow-50 px-2 py-0.5 rounded border border-yellow-200">{primaryInfo.inputLocation}</span>
              </div>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider border-b border-gray-200">
                <th className="p-4 font-semibold w-1/4">映射字段名 UI Label</th>
                <th className="p-4 font-semibold w-1/6">模块位置 Location</th>
                <th className="p-4 font-semibold w-1/2">上下文片段 Context Snippet</th>
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
    return (
      <div className="p-8 bg-gray-50 min-h-full">
        {renderDetailView()}
      </div>
    );
  }

  const uniqueKeys = new Set();
  const uniqueMappings = filteredMappings.filter(item => {
    const isDuplicate = uniqueKeys.has(item.variableKey);
    uniqueKeys.add(item.variableKey);
    return !isDuplicate;
  });

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        <div className="p-6 border-b border-gray-200 bg-white flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">数据映射字典</h2>
            <p className="text-sm text-gray-500 mt-1">Data Mapping Dictionary & Variable Statistics</p>
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
                <th className="p-4 font-semibold w-1/6">类别 Category</th>
                <th className="p-4 font-semibold w-1/6">变量名称 Variable Key</th>
                <th className="p-4 font-semibold w-1/6">输入位置 Input Location</th>
                <th className="p-4 font-semibold w-1/6">变量描述 Description</th>
                <th className="p-4 font-semibold w-1/6">映射字段名称 UI Label</th>
                <th className="p-4 font-semibold w-1/12 text-center">操作</th>
                <th className="p-4 font-semibold w-1/6">变量值示例 Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {uniqueMappings.map((row, index) => {
                 const count = MAPPINGS.filter(m => m.variableKey === row.variableKey).length;
                 
                 return (
                  <tr key={index} className="hover:bg-blue-50 transition-colors text-sm group">
                    <td className="p-4 font-medium text-gray-900 bg-gray-50/50">{row.category}</td>
                    <td className="p-4 font-mono text-blue-700 break-all">
                      {row.variableKey}
                      {count > 1 && (
                        <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-full" title={`${count} occurrences`}>
                          {count}
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-gray-700 font-medium bg-orange-50/30 border-l border-r border-gray-100">{row.inputLocation}</td>
                    <td className="p-4 text-gray-600">{row.description}</td>
                    <td className="p-4 text-gray-800 font-medium">
                      <span className="bg-yellow-100 border-b border-black px-1">{row.uiLabel}</span>
                    </td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => setSelectedVariable(row.variableKey)}
                        className="text-gray-400 hover:text-blue-600 hover:bg-blue-100 p-2 rounded-full transition-all"
                        title="View Details & Locations"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                    <td className="p-4 text-gray-500 font-mono text-xs overflow-hidden max-w-[12rem] whitespace-nowrap text-ellipsis" title={row.example}>
                      {row.example.length > 30 ? row.example.substring(0, 30) + '...' : row.example}
                    </td>
                  </tr>
                );
              })}
              {uniqueMappings.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">
                    No mapping fields found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 text-right">
          Total Unique Variables: {uniqueMappings.length} | Total Mappings: {MAPPINGS.length}
        </div>
      </div>
    </div>
  );
};
