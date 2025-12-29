
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
