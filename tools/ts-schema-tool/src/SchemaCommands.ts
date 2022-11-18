import Ajv, { DefinedError, JSONSchemaType } from 'ajv';
import { RequiredMembers } from 'ajv/dist/types/json-schema';
import * as fs from 'fs';
import * as jsonld from 'jsonld';
import * as path from 'path';

import { ContextType, JSONLdDocOptionsType, VcDataModelType } from '../types/JsonLdDocument';
import { JsonMap } from '../types/JsonSchema';
import {
  ObjectPrismSchemaField, PrismSchema, PrismSchemaField, PrismSchemaProperties
} from '../types/PrismSchema';
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

  public convertToKebabCase = str => str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .join('-')
    .toLowerCase();

  public validateCredDef(credDef: JsonMap): boolean {
    const validateSchema = this.ajv.compile(this.metaSchema)
    if (validateSchema(credDef)) {
      console.log("ok")
      return true;
    } else {
      this.printErrors(validateSchema.errors as DefinedError[])
      return false;
    }
  }

  public validateCredential(credDef: JsonMap, credValue: JsonMap): boolean {
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

  private generateObjectLikeJsonSchema(properties: PrismSchemaProperties = {}, path: string, prismSchema: PrismSchema): JSONSchemaType<any> {
    const prismSchemaProperties = Object.entries(properties);
    const jsonProperties = prismSchemaProperties.map(([k, v]) => {
      // FIXME: make sure, we have changed path to single key
      return [k, this.fieldToSchema(k, v, prismSchema)]
    });
    const required: Array<string> = prismSchemaProperties.filter(([k, v]) => !(v.optional)).map(([k, v]) => k)

    // FIXME: additionalProperties based on properties length looks like a dirty solution
    const retval: JSONSchemaType<any> = jsonProperties.length > 0 ? {
      "type": "object",
      "additionalProperties": false,
      properties: Object.fromEntries(jsonProperties)
    } : {
      "type": "object",
      "additionalProperties": true
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

  /* Generate JSON LD Document
  ============================================================================= */
  public generateJsonLdDocument(prismSchema: PrismSchema, credValue: JsonMap, options: JSONLdDocOptionsType): VcDataModelType {
    const jsonLdContext = this.generateJsonLDContext(prismSchema, options)

    // Validate JSON-LD schema. Throw exception if method arguments are invalid. Ignoring external context
    if (typeof jsonLdContext === 'object') {
      this.validateJsonLdDoc(credValue, jsonLdContext)
    }

    // Output returns an object represented in the vc-data-model (https://www.w3.org/TR/vc-data-model/#example-usage-of-the-type-property)
    const retval: VcDataModelType = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        jsonLdContext
      ],
      "type": ["VerifiableCredential", prismSchema.name],
      "credentialSubject": credValue
    }

    return retval;
  }

  private generateJsonLDContext(prismSchema: PrismSchema, options: JSONLdDocOptionsType): (ContextType | string) {
    const fileName = `${this.convertToKebabCase(options.output ?? prismSchema.name)}.json`;
    const pathName = '/credentials-json-ld';
    const fullPath = `${pathName}/${fileName}`
    const dirName = path.join(__dirname, '..', pathName);
    const fullDirName = path.join(dirName, fileName);

    const output: ContextType = {
      "@context": {
        [prismSchema.name]: prismSchema.id,

        // FIXME: trick: use originSchema for external buffer
        ...this.generateObjectLikeJsonLDContext(prismSchema.properties, '', {}, prismSchema)
      }
    }

    if (options.baseContextUri) {
      fs.mkdirSync(dirName, { recursive: true });

      fs.writeFileSync(fullDirName, JSON.stringify(output, null, 2))
      return options.baseContextUri + fullPath;
    }

    return output;
  }

  private generateObjectLikeJsonLDContext(properties: PrismSchemaProperties = {}, path: string, objectBuffer: JsonMap, prismSchema: PrismSchema): JsonMap {
    const prismSchemaProperties = Object.entries(properties);

    prismSchemaProperties.map(([k, v]) => {
      const nextFieldNode = this.fieldToContext(k, v, objectBuffer, prismSchema);

      if (k === 'binary') {
        // Handle base64 binary fields
        prismSchema[k] = {
          "@container": "@set",
          "@id": "https://schema.org/MediaObject"
        }
      } else if ((v as ObjectPrismSchemaField).additionalProperties) {
        objectBuffer[k] = '@null'
      } else if (v.type === 'object') {
        // Handle nested nodes
        objectBuffer[k] = '@nest'
      } else {
        objectBuffer[k] = nextFieldNode
      }

      return objectBuffer
    });

    return objectBuffer
  }

  public async validateJsonLdDoc(doc: JsonMap, context: ContextType) {
    const compacted = await jsonld.compact(doc, context);

    return JSON.stringify(compacted, null, 2)
  }

  /**
   * Helper function to generate json-ld context from schema definition field
   * @param p Field key name 
   * @param v Field properties object
   * @param objectBuffer Recursive context buffer
   * @param originSchema Credential definition (schema)
   */
  private fieldToContext(p: string, v: PrismSchemaField, objectBuffer: JsonMap, originSchema: PrismSchema): JsonMap {
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
        return this.generateObjectLikeJsonLDContext(v.properties, p, objectBuffer, originSchema)
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
          ...this.fieldToContext(p, v.items, objectBuffer, originSchema)
        }
      default:
        // other is subset of verify, can return as is.
        throw new PrismSchemaError(originSchema.id, "Invalid type:" + vType)
    }
  }
}
