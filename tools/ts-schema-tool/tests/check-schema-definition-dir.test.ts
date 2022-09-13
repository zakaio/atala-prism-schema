import { callCli }  from './cliCaller'
import * as fs from 'fs'

test('for all positive schemas', async () => {
  const posDir = "../../examples/schemas/pos";
  const posSchemas = fs.readdirSync(posDir)
  for(const schemaFile of posSchemas) {
    const fname = `${posDir}/${schemaFile}`
    console.log("scheck-schema-definition "+fname)
    let result = await callCli(['check-schema-definition', '"../../examples/schemas/pos/PersonName.json"'], '.');
    expect(result.stderr).toBe("");
    expect(result.stdout).toBe('ok\n');
    expect(result.code).toBe(0);
  }
})
 


/*
function cli(args, cwd) {
    return new Promise(resolve => { 
        exec(`node ${path.resolve('./dist/cli')} ${args.join(' ')}`,
        { cwd }, 
        (error, stdout, stderr) => { resolve({
        code: error && error.code ? error.code : 0,
        error,
        stdout,
        stderr })
    })
})}
*/
