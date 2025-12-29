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
