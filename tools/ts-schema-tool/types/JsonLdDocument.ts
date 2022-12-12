import { JsonMap } from './JsonSchema';

export type ContextType = {
  "@context": JsonMap
}

export type VcDataModelType = {
  "@context": (string | ContextType)[];
  type: string[];
  credentialSubject: JsonMap; // TODO: compare credentialSubject types /w @transmute/jsonld-schema
}

export type JSONLdDocOptionsType = {
  baseContextUri?: string;
  context?: "inline" | "external";
  output?: string;
}
