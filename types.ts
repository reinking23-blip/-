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