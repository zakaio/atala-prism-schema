import Ajv, { JSONSchemaType } from 'ajv';
import Ajv2020 from 'ajv/dist/2020';
import { operators } from 'ajv/dist/compile/codegen';
import { Command } from 'commander';
import * as fs from 'fs';

import { SchemaCommands } from './SchemaCommands';
import { EmptySchemaResolver } from './SchemaResolver';

const ajv = new Ajv2020()

const program = new Command();
program.name("schema-tool")
program.option("--metaschema <schemaFile>", 'specify a file with metadefinition for prism-schema', "../../json_schema/meta/prism-credentials.json")
program.option("--prism-schema-dir <directory>", 'specify a directory with schema ', '../../prism_schemas')

program.command("check-schema-definition")
  .description("check is schema definition is valid")
  .argument("<file>", "filename of prism schema definition to check")
  .action((file) => {
    const schemaCommands = SchemaCommands.create(ajv, program.opts());
    const credDefJson = JSON.parse(fs.readFileSync(file).toString('utf8'))
    schemaCommands.validateCredDef(credDefJson)
  });

program.command("prism-to-json-schema")
  .description("convert prism schema to json schema")
  .argument("<file>", "filename of prism schema definition to convert")
  .option("--output <fname>", 'output to the given file')
  .action((file, options) => {
    const schemaCommands = SchemaCommands.create(ajv, program.opts());
    const credDefJson = JSON.parse(fs.readFileSync(file).toString('utf8'));
    const jsonSchema = schemaCommands.generateJsonSchema(credDefJson);
    if (options['output'] === undefined) {
      console.log(JSON.stringify(jsonSchema, null, 2))
    } else {
      fs.writeFileSync(options['output'], JSON.stringify(jsonSchema, null, 2))
    }
  });

program.command("validate-credential")
  .description("validate credential json")
  .argument("<credDef>", "filename of prism schema definition")
  .argument("<credential>", "file with credential value")
  .option("--output <fname>", 'output to the given file')
  .action((credDef, credential) => {
    const schemaCommands = SchemaCommands.create(ajv, program.opts());
    const credDefJson = JSON.parse(fs.readFileSync(credDef).toString('utf8'));
    const credentialJson = JSON.parse(fs.readFileSync(credential).toString('utf8'));
    const result = schemaCommands.validateCredential(credDefJson, credentialJson);
    if (!result) {
      process.exit(1)
    }
  })

program.command("json-ld-context")
  .description("generate json-ld-context")
  .argument("<credDef>", "filename of prism schema definition")
  .argument("<credential>", "file with credential value")
  .option("--base-context-uri <uri>", 'base URI for saving context to the given file')
  .action((credDef, credential, options) => {
    const schemaCommands = SchemaCommands.create(ajv, program.opts());
    const credDefJson = JSON.parse(fs.readFileSync(credDef).toString('utf8'));
    const credentialJson = JSON.parse(fs.readFileSync(credential).toString('utf8'));

    const jsonSchema = schemaCommands.generateJsonLdDocument(credDefJson, credentialJson, options);
    if (options['output'] === undefined) {
      console.log(JSON.stringify(jsonSchema, null, 2))
    } else {
      fs.writeFileSync(options['output'], JSON.stringify(jsonSchema, null, 2))
    }
  })

program.parse();
