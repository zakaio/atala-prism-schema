let path = require('path');
let exec = require('child_process').exec;

test('Code should be 0', async () => {
  let result = await  cli(['prism-to-json-schema', '"../../examples/schemas/PersonName.json"'], '.');
  console.log(result)
  expect(result.code).toBe(0);
})

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
