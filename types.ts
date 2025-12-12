export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export enum AgentType {
  AMA = 'AMA', // Account Management
  TPA = 'TPA', // Transaction Processing
  CSA = 'CSA', // Customer Support
  FRA = 'FRA', // Financial Reporting
  DISPATCHER = 'DISPATCHER',
  UNKNOWN = 'UNKNOWN'
}

export interface QuickAction {
  label: string;
  text: string;
}