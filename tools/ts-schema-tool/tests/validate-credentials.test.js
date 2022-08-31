let path = require('path');
let exec = require('child_process').exec;
const fs = require('fs');

test('Code should be 0', async () => {
  fs.readdirSync('../../examples/schemas').forEach(file => {
    console.log(file);
  });
  let result = await  cli(['validate-credential', '"../../examples/schemas/PersonName.json"', '"../../credentials/IvanIvanov.json"'], '.');
  // console.log(result)
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
