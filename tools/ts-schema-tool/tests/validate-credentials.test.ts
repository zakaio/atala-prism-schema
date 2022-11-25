import { callCli } from './cliCaller'
import { TestFsHelper } from './TestFsHelper'

test('Validate credentials positive', async () => {
  await TestFsHelper.forFilesIn("../../examples/schemas/pos", async (schemaPath, schemaNameJson) => {
    const schemaName = schemaNameJson.split(".")[0]
    const posCredentials = `../../examples/credentials/${schemaName}/pos`

    await TestFsHelper.forFilesIn(posCredentials, async (credPath, credName) => {
      console.log(`validate ${credPath} against ${schemaPath} (pos)`)
      let result = await callCli(['validate-credential', schemaPath, credPath], '.');

      if (result.code !== 0) {
        console.log("error output:")
        console.error(result.stderr)
      }

      expect(result.code).toBe(0)
    })
  })

})

test('Validate credentials negative', async () => {
  await TestFsHelper.forFilesIn("../../examples/schemas/pos", async (schemaPath, schemaNameJson) => {
    const schemaName = schemaNameJson.split(".")[0]
    const negCredentials = `../../examples/credentials/${schemaName}/neg`

    await TestFsHelper.forFilesIn(negCredentials, async (credPath, credName) => {
      console.log(`validate ${credPath} against ${schemaPath} (neg)`)

      let result = await callCli(['validate-credential', schemaPath, credPath], '.');

      expect(result.code).not.toBe(0)
    })
  })
})


