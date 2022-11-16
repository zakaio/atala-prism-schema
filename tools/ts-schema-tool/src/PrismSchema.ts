import { TrustRegistry } from "./TrustRegistry";

export interface PrismSchema {
  id: string;
  name: string;
  version: string;
  trustRegistry: TrustRegistry;
  author: string;
  properties: PrismSchemaProperties;
}

export interface CommonPrismSchemaField {
  title?: string;
  fieldName?: string;
  description?: string;
  optional?: boolean;
  disclosable?: boolean;
  comparable?: boolean;
  contextUri?: string;
}

export interface StringPrismSchemaField extends CommonPrismSchemaField {
  type: 'string';
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  // decorators
  multiLine?: boolean;
  keyboardHint?: 'numbers' | 'text' | 'email';
}
export interface NumberPrismSchemaField extends CommonPrismSchemaField {
  type: 'number' | 'integer' | 'decimal' | 'float';
  description?: string;
  optional?: boolean;
  minimum: number;
  maximum: number;
}

export interface BooleanPrismSchemaField extends CommonPrismSchemaField {
  type: 'boolean';
  description?: string;
  optional?: boolean;
}

export interface DatePrismSchemaField extends CommonPrismSchemaField {
  type: 'date';
  description?: string;
  optional?: boolean;
}

export interface TimestampPrismSchemaField extends CommonPrismSchemaField {
  type: 'timestamp';
  description?: string;
  optional?: boolean;
}

export interface ObjectPrismSchemaField extends CommonPrismSchemaField {
  type: 'object';
  schema?: string;
  properties: PrismSchemaProperties;
}

export interface ArrayPrismSchemaField extends CommonPrismSchemaField {
  type: 'array';
  items: PrismSchemaField; // TODO: without common fields. 
}

export interface EnumPrismSchemaField extends CommonPrismSchemaField {
  type: 'enum';
  values: Array<string>;
}

export type PrismSchemaField =
  | StringPrismSchemaField
  | NumberPrismSchemaField
  | BooleanPrismSchemaField
  | DatePrismSchemaField
  | TimestampPrismSchemaField
  | ObjectPrismSchemaField
  | ArrayPrismSchemaField
  | EnumPrismSchemaField;

export type PrismSchemaProperties = Record<string, PrismSchemaField>