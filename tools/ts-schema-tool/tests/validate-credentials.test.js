let {describe, expect, test, it} = require('@jest/globals');
let path = require('path');
let exec = require('child_process').exec;
const fs = require('fs');
const data = [];

let uniqueSchemasName = uniqueSchemas('../../examples/schemas')
createSchemaCredential(uniqueSchemasName, '../../examples/schemas', '../../credentials')
divideCredentialsFiles(data)

function uniqueSchemas(path) {
    const schemaPreCredentialsFolder = [];
    const schemaContent = [];
    let contentSchema = fs.readdirSync(path, {withFileTypes: true});
    contentSchema.forEach(dirent => {
        if (dirent.isFile()) {
            schemaContent.push(dirent.name)
        }
    })
    schemaContent.forEach(file => {
        let fileDash = file.split('.')
        let fileName = fileDash[0].split(' ')
        schemaPreCredentialsFolder.push(fileName[0]);
    })
    return [...new Set(schemaPreCredentialsFolder)];
}

function createSchemaCredential(names, schemaPath, credentialPath) {
    names.forEach(name => {
        let obj = {
            name: name,
            schemaPath: `${schemaPath}/${name}.json`,
            credentialPath: `${credentialPath}/${name}`,
            posFolderContentPathes: [],
            negFolderContentPathes: [],
        };
        data.push(obj);
    })
}

function divideCredentialsFiles(data) {
    data.forEach(item => {
        fs.existsSync(item.credentialPath) &&
            fs.readdirSync(item.credentialPath, {withFileTypes: true}).forEach(content => {
            if (content.isDirectory() && content.name === 'pos' || 'neg') {
                fs.readdirSync(`${item.credentialPath}/${content.name}`, {withFileTypes: true}).forEach(file => {
                if (file.isFile()) {
                    if (content.name === 'pos') {
                        item.posFolderContentPathes.push(`${item.credentialPath}/${content.name}/${file.name}`);
                    } else {
                        item.negFolderContentPathes.push(`${item.credentialPath}/${content.name}/${file.name}`)
                    }
                }
                })
            }
            })
    })
}

describe('Run credentials', () => {
    describe('Positive credentials', () => {
        test('Run', async () => {
            for(let i = 0; i<data.length; i++) {
                for(let j = 0; j < data[i]['posFolderContentPathes'].length; j++) {
                    let schemaPath = `"${data[i].schemaPath}"`;
                    let posPathString = `"${data[i]['posFolderContentPathes'][j]}"`;
                    let result = await cli(['validate-credential', schemaPath, posPathString], '.');
                    if (result.code === 1) console.error(posPathString);
                    expect(result.code).toBe(0);
                }
            }
        })
    })

    describe('Negative credentials', () => {
        test('Run', async () => {
            for(let i = 0; i<data.length; i++) {
                for(let j = 0; j < data[i]['negFolderContentPathes'].length; j++) {
                    let schemaPath = `${data[i].schemaPath}`;
                    let negPathString = `${data[i]['negFolderContentPathes'][j]}`;
                    let result = await cli(['validate-credential', schemaPath, negPathString], '.');
                    expect(result.code).toBe(0);
                }
            }
        })
    })
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
