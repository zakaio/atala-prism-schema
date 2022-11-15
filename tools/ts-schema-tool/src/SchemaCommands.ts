import Ajv, { DefinedError, JSONSchemaType } from 'ajv';
import { RequiredMembers } from 'ajv/dist/types/json-schema';
import * as fs from 'fs';

import { ObjectPrismSchemaField, PrismSchema, PrismSchemaField } from './PrismSchema';
import { PrismSchemaError } from './PrismSchemaError';
import { EmptySchemaResolver, SchemaResolver } from './SchemaResolver';

export class SchemaCommands {
  private ajv: Ajv;
  private schemaResolver: SchemaResolver;
  private metaSchema: JSONSchemaType<PrismSchema>;

  public constructor(ajv: Ajv, metaSchema: JSONSchemaType<PrismSchema>, schemaResolver: SchemaResolver) {
    this.ajv = ajv;
    this.schemaResolver = schemaResolver;
    this.metaSchema = metaSchema;
  }

  public static create(ajv: Ajv, options: { [key: string]: string }): SchemaCommands {
    const metaSchema = JSON.parse(fs.readFileSync(options['metaschema']).toString('utf8'));
    const schemaResolver = new EmptySchemaResolver();
    const schemaCommands = new SchemaCommands(ajv, metaSchema, schemaResolver)
    return schemaCommands;
  }

  public validateCredDef(credDef: any): boolean {
    const validateSchema = this.ajv.compile(this.metaSchema)
    if (validateSchema(credDef)) {
      console.log("ok")
      return true;
    } else {
      this.printErrors(validateSchema.errors as DefinedError[])
      return false;
    }
  }

  public validateCredential(credDef: any, credValue: any): boolean {
    const validateSchema = this.ajv.compile(this.metaSchema)
    if (!validateSchema(credDef)) {
      console.log("Can't validate schema");
      this.printErrors(validateSchema.errors as DefinedError[])
      return false;
    }
    const credJsonSchema = this.generateJsonSchema(credDef)
    const validateCred = this.ajv.compile(credJsonSchema)
    if (!validateCred(credValue)) {
      console.log("Can't validate credential value");
      this.printErrors(validateCred.errors as DefinedError[]);
      return false;
    }
    console.log("ok");
    return true;
  }

  public generateJsonSchema(prismSchema: PrismSchema): JSONSchemaType<any> {
    const retval = this.generateObjectLikeJsonSchema(prismSchema.properties, "", prismSchema)
    retval['$schema'] = "https://json-schema.org/draft/2020-12/schema";
    return retval;
  }

  public generateJsonLdContext(prismSchema: PrismSchema) {
    throw new Error("generating json-ld context is not implemented yet.")
  }

  private fieldToSchema(p: string, v: PrismSchemaField, originSchema: PrismSchema): JSONSchemaType<any> {
    if (v.type === undefined) {
      const vo = v as ObjectPrismSchemaField;
      if (vo.schema !== undefined) {
        vo.type = 'object';
      } else {
        throw new PrismSchemaError(originSchema.id, `type for path ${p} is not set`)
      }
    }

    const vType = v.type;
    switch (vType) {
      case 'object':
        if (v.schema !== undefined) {
          const schema = this.schemaResolver.resolveSchema(v.schema);
          if (schema === undefined) {
            throw new PrismSchemaError(originSchema.id, `type for path ${p} is set to schea which is not defined`)
          }
          return this.generateJsonSchema(schema)
        } else {
          const vo = v as ObjectPrismSchemaField;
          return this.generateObjectLikeJsonSchema(vo.properties, p, originSchema)
        }
      case 'string':
      case 'boolean':
        return v;
      case 'number':
        const numberRetval: JSONSchemaType<number> = {
          type: 'number',
          minimum: v.minimum,
          maximum: v.maximum
        }
        return numberRetval;
      case 'integer':
        return {
          type: 'integer',
          minimum: v.minimum,
          maximum: v.maximum
        }
      case 'decimal':
      case 'float':
        return {
          type: 'number',
          minimum: v.minimum,
          maximum: v.maximum
        }
      case 'date':
        return {
          type: 'string',
          pattern: "^\\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$"
        }
      case 'timestamp':
        return {
          type: 'string',
          pattern: "^\\d{4}-\\d{2}-\\d{2}T\\d{2}%3A\\d{2}%3A\\d{2}(?:%2E\\d+)?[A-Z]?(?:[+.-](?:08%3A\\d{2}|\\d{2}[A-Z]))?$"
        }
      case 'array':
        return {
          type: 'array',
          items: this.fieldToSchema(`${p}[]`, v.items, originSchema)
        }
      case 'enum':
        return {
          type: 'string',
          enum: v.values
        }
      default:
        // other is subset of verify, can return as is.
        throw new PrismSchemaError(originSchema.id, "Invald type:" + vType)

    }
  }

  private generateObjectLikeJsonSchema(properties: { [key: string]: PrismSchemaField }, path: string, prismSchema: PrismSchema): JSONSchemaType<any> {
    const prismSchemaProperties = Object.entries(prismSchema.properties);
    const jsonProperties = prismSchemaProperties.map(([k, v]) => {
      const p = (path.length == 0) ? k : `${path}.${k}`
      return [p, this.fieldToSchema(p, v, prismSchema)]
    });
    const required: Array<string> = prismSchemaProperties.filter(([k, v]) => !(v.optional)).map(([k, v]) => k)
    const retval: JSONSchemaType<any> = {
      "type": "object",
      "additionalProperties": false,
      properties: Object.fromEntries(jsonProperties)
    }
    if (required.length > 0) {
      retval.required = required as RequiredMembers<any>;
    }

    return retval;
  }

  private printErrors(errors: Array<DefinedError>) {
    for (const err of errors) {
      console.log("error:" + JSON.stringify(err));
      if (err.propertyName !== undefined) {
        console.log(`property: ${err.propertyName}`)
      }
    }
  }
}