import { callCli }  from './cliCaller'
import * as fs from 'fs'

test('check schema definitions: pos', async () => {
  const posDir = "../../examples/schemas/pos";
  const posSchemas = fs.readdirSync(posDir)
  for(const schemaFile of posSchemas) {
    const fname = `${posDir}/${schemaFile}`
    console.log("scheck-schema-definition " + fname)
    const result = await callCli(['check-schema-definition', fname], '.');
    expect(result.stderr).toBe("");
    expect(result.stdout).toBe('ok\n');
    expect(result.code).toBe(0);
  }
})

