export type BaserowFieldType = 
  | 'text'
  | 'long_text'
  | 'url'
  | 'email'
  | 'number'
  | 'date'
  | 'boolean'
  | 'single_select'
  | 'multiple_select'
  | 'link_row'
  | 'file'
  | 'json';

export interface BaserowField {
  name: string;
  type: BaserowFieldType;
  primary?: boolean;
  required?: boolean;
  unique?: boolean;
  options?: string[];
  default_value?: any;
  min?: number;
  max?: number;
  link_table?: string;
}

export interface BaserowTable {
  id: string;
  name: string;
  fields: BaserowField[];
}