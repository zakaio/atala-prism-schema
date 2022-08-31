let path = require('path');
let exec = require('child_process').exec;

test('Code should be 0', async () => {
  let result = await  cli(['check-schema-definition', '"../../examples/schemas/PersonName.json"'], '.');
  expect(result.code).toBe(0);
  expect(result.stdout).toBe('ok\n');
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
