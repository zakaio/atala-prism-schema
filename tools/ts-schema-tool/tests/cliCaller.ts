import { exec, ExecException } from 'child_process'
import * as path from 'path'

export interface CliResult {
    code: number,
    error: ExecException | null,
    stdout: string | Buffer,
    stderr: string | Buffer
}


export function callCli(args: Array<string>, cwd: string): Promise<CliResult> {
    return new Promise(resolve => { 
        exec(`node ${path.resolve('./dist/src/cli')} ${args.join(' ')}`,
        { cwd }, 
        (error, stdout, stderr) => { resolve({
        code: error && error.code ? error.code : 0,
        error,
        stdout,
        stderr })
    })
})}


