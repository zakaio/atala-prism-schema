import Ajv, { DefinedError, JSONSchemaType } from 'ajv';
import { RequiredMembers } from 'ajv/dist/types/json-schema';
import * as fs from 'fs';
import * as jsonld from 'jsonld';

import { AnyJson } from './JsonSchema';
import { ObjectPrismSchemaField, PrismSchema, PrismSchemaField, PrismSchemaProperties } from './PrismSchema';
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

  public async validateJsonLdDoc(doc: any, context: any) {
    const compacted = await jsonld.compact(doc, context);

    return JSON.stringify(compacted, null, 2)
  }

  public generateJsonLdDocument(prismSchema: PrismSchema, credValue: any, options: {
    baseURI?: string;
    context: 'inline' | 'external'
  }) {
    const jsonLdContext = this.generateJsonLDContext(prismSchema, options)

    // Validate JSON-LD schema. Throw error if invalid
    this.validateJsonLdDoc(credValue, jsonLdContext)

    // Output returns an object represented in the vc-data-model (https://www.w3.org/TR/vc-data-model/)
    const retval = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        jsonLdContext
      ],
      "type": ["VerifiableCredential", prismSchema.name],
      "credentialSubject": credValue
    }

    return retval;
  }

  private generateJsonLDContext(prismSchema: PrismSchema, options: any) {
    const output = {
      "@context": {
        [prismSchema.name]: prismSchema.id,

        // FIXME: trick: use originSchema for external buffer
        ...this.generateObjectLikeJsonLDContext(prismSchema.properties, '', {} as PrismSchema)
      }
    }

    if (options.external) {
      fs.writeFileSync(options.baseContextUri, JSON.stringify(output, null, 2))
      return options.baseContextUri;
    }

    return output;
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
          const schema = this.schemaResolver.resolveSchema(v.schema); // TODO: check this method whether it relevant
          if (schema === undefined) {
            throw new PrismSchemaError(originSchema.id, `type for path ${p} is set to schema which is not defined`)
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
        throw new PrismSchemaError(originSchema.id, "Invalid type:" + vType)

    }
  }

  /* 
   * @p - key property (path)
   * @v - field value
   * @originSchema - full schema definition
  */
  private fieldToContext(p: string, v: PrismSchemaField, originSchema: PrismSchema): any {
    // If credential schema has @contextUri property, returns it backwards
    if (v.contextUri) {
      return {
        "@id": v.contextUri
      }
    }

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
        return this.generateObjectLikeJsonLDContext(v.properties, p, originSchema)
      case 'enum':
      case 'string':
      case 'date':
        return {
          "@id": 'https://schema.org/Text'
        }
      case 'boolean':
        return {
          "@id": 'https://schema.org/Boolean'
        }
      case 'integer':
        return {
          "@id": 'https://schema.org/Integer'
        }
      case 'decimal':
      case 'float':
        return {
          "@id": 'https://schema.org/Float'
        }
      case 'number':
        return {
          "@id": 'https://schema.org/Number'
        }
      case 'timestamp':
        return {
          "@id": 'https://schema.org/DateTime'
        }
      case 'array':
        return {
          "@container": "@set",
          ...this.fieldToContext(p, v.items, originSchema)
        }
      default:
        // other is subset of verify, can return as is.
        throw new PrismSchemaError(originSchema.id, "Invalid type:" + vType)
    }
  }

  private generateObjectLikeJsonLDContext(properties: PrismSchemaProperties, path: string, prismSchema: PrismSchema) {
    const prismSchemaProperties = Object.entries(properties);

    prismSchemaProperties.map(([k, v]) => {
      const nextFieldNode = this.fieldToContext(k, v, prismSchema);
      if (v.type === 'object') {
        prismSchema[k] = '@nest'
      } else {
        prismSchema[k] = nextFieldNode
      }

      return prismSchema
    });


    return prismSchema
  }

  private generateObjectLikeJsonSchema(properties: PrismSchemaProperties, path: string, prismSchema: PrismSchema): JSONSchemaType<any> {
    const prismSchemaProperties = Object.entries(properties);
    const jsonProperties = prismSchemaProperties.map(([k, v]) => {
      // const p = (path.length == 0) ? k : `${path}.${k}`
      const p = k; // FIXME: make sure, we have changed path to single key
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
