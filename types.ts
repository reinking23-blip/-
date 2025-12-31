
import { ReactNode } from 'react';

export interface Section {
  id: string;
  title: string;
  subtitle?: string;
  content: ReactNode;
  level?: number; // 1 for main section, 2 for sub-section
}

export interface NavItem {
  id: string;
  label: string;
  children?: NavItem[];
  isSubItem?: boolean;
}

export interface Personnel {
  name: string;
  dept: string;
  pos: string;
}

export interface ValidationOptions {
  systemSuitability: boolean;
  specificity: boolean;
  linearity: boolean;
  precision: boolean;
  accuracy: boolean;
  stability: boolean;
}

export interface GradientRow {
  time: string;
  phaseA: string;
}

export interface TestingCondition {
  id: string;
  labelZh: string;
  labelEn: string;
  value: string;
  isOptional?: boolean;
  isCustom?: boolean;
}

export interface SolutionPrep {
  descZh: string;
  descEn: string;
  detail: string;
}

export interface SolutionPrepsState {
  phaseA: SolutionPrep;
  phaseB: SolutionPrep;
  needleWash: SolutionPrep;
  diluent: SolutionPrep;
  standard: SolutionPrep;
  sample: SolutionPrep;
}

export interface SolutionDetailState {
  stdWeight: string;
  stdVolume: string;
  stdMethodZh: string;
  stdMethodEn: string;
  stdCount: string;
  splWeight: string;
  splVolume: string;
  splMethodZh: string;
  splMethodEn: string;
  splCount: string;
}

export interface SequenceState {
  std1Count: string;
  std2Count: string;
  spl1Count: string;
  spl2Count: string;
  controlCount: string;
}

export interface ValProcSysSuitState {
  std1Count: string;
  std2Count: string;
  controlCount: string;
}

export interface ValProcPrecisionState {
  precisionStd1Count: string;
  precisionStd2Count: string;
}

export interface SystemSuitabilityState {
  plateNumber: string;
  tailingFactor: string;
  injectionCount: string;
  areaRSD: string;
  retentionRSD: string;
  recoveryRange: string;
  controlInjectionCount: string;
  controlAreaRSD: string;
}

export interface CalculationState {
  kf: boolean;
  lod: boolean;
  sr: boolean;
  tga: boolean;
}

export interface AcceptanceCriterion {
  id: string;
  name: string;
  criteria: string;
}

export interface SpecificityState {
  retentionDevLimit: string;
}

export interface LinearitySolution {
  id: string;
  conc: string;
  weight: string;
  volume: string;
}

export interface LinearityState {
  solutions: LinearitySolution[];
}

export interface PrecisionState {
  precisionLimit: string;
}

export interface AccuracyState {
  recoveryRange: string;
  rsdLimit: string;
}

export interface StabilityState {
  sampleTemp: string;
  sampleRecovery: string;
  standardTemp: string;
  standardRecovery: string;
}

export interface ReagentConfirmationRow {
  id: string;
  name: string;
  grade: string;
}

export interface PrerequisiteState {
  columnSuppliers: Record<string, string>;
  reagentRows: ReagentConfirmationRow[];
}

export interface EquipmentConfirmationRow {
  id: string;
  name: string;
  supplier: string;
  equipmentNumber: string;
  model: string;
  retestDate: string;
}

export interface ReportReagentValues {
  batch: string;
  supplier: string;
  expiryDate: string;
}

export interface SampleRSData {
  batch: string;
  retestDate: string;
  assay: string;
  source: string;
}

export interface ReportSampleRSState {
  rs: SampleRSData;
  sample: SampleRSData;
}

export interface ProductDetails {
  chemicalFormula: string;
  setChemicalFormula: (val: string) => void;
  chemicalName: string;
  setChemicalName: (val: string) => void;
}

// --- Experimental Data Types for DocumentPage ---

export interface SystemSuitabilityData {
  sequenceId: string;
  blankInterference: string;
  theoreticalPlates: string;
  tailingFactor: string;
  std1Weight: string;
  std1AvgArea: string;
  std1AreaRSD: string;
  std1RtRSD: string;
  std1Injections: { peakArea: string; rt: string }[];
  std2Weight: string;
  std2PeakArea: string;
  std2Rt: string;
  std2Recovery: string;
  controls: { name: string; peakArea: string; rsd: string }[];
  conclusion: string;
}

export interface SpecificityData {
  sequenceId: string;
  stdRt: string;
  sampleRt: string;
  rtDeviation: string;
  peakPurity: string;
  conclusion: string;
}

export interface LinearityDataRow {
  id: string;
  level: string;
  weight: string;
  conc: string;
  area: string;
  actualLevel: string;
}

export interface LinearityData {
  sequenceId: string;
  dilutionX1: string;
  dilutionX2: string;
  assayValue: string;
  rows: LinearityDataRow[];
  statsN: string;
  statsR: string;
  statsSlope: string;
  statsIntercept: string;
  statsPercentIntercept: string;
  statsRSS: string;
  equation: string;
  conclusion: string;
}

export interface PrecisionDataRow {
  id: string;
  name: string;
  weight: string;
  area: string;
  assay: string;
}

export interface PrecisionData {
  sequenceId: string;
  stdWeight: string;
  stdAssay: string;
  stdVolume: string;
  stdAvgArea: string;
  splVolume: string;
  rows: PrecisionDataRow[];
  avgAssay: string;
  rsd: string;
  conclusion: string;
}

export interface AccuracyDataRow {
  id: string;
  name: string;
  weight: string;
  area: string;
  detConc: string;
  detQty: string;
  theoQty: string;
  rec: string;
}

export interface AccuracyData {
  sequenceId: string;
  slope: string;
  intercept: string;
  precAvgAssay: string;
  splVolume: string;
  rows: AccuracyDataRow[];
  rsd: string;
  conclusion: string;
}

export interface StabilityPoint {
  time: string;
  area: string;
  recovery: string;
}

export interface StabilityData {
  stdSequenceId: string;
  splSequenceId: string;
  stdCondition: string;
  splCondition: string;
  stdPoints: StabilityPoint[];
  splPoints: StabilityPoint[];
  stdAcceptanceCriteria: string;
  stdConclusion: string;
  splAcceptanceCriteria: string;
  conclusion: string; // Kept for potential compatibility or table 7 conclusion mapping
}

export interface ExperimentalDataState {
  systemSuitability: SystemSuitabilityData;
  specificity: SpecificityData;
  linearity: LinearityData;
  precision: PrecisionData;
  accuracy: AccuracyData;
  stability: StabilityData;
}
