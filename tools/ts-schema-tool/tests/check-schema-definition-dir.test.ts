import { callCli }  from './cliCaller'


test('for all positive schemas', async () => {
  let result = await callCli(['check-schema-definition', '"../../examples/schemas/pos/PersonName.json"'], '.');
  expect(result.stderr).toBe("");
  expect(result.stdout).toBe('ok\n');
  expect(result.code).toBe(0);
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
