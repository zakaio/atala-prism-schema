import { callCli }  from './cliCaller'



test('prism-to-json-schema', async () => {
  let result = await  callCli(['prism-to-json-schema', '"../../examples/schemas/pos/PersonName.json"'], '.');
  console.log(result)
  expect(result.code).toBe(0);
})


