import * as fs from 'fs'


export class TestFsHelper {


    public static async forFilesIn(dirName: string, runner: (fullName:string, shortName:string)=>Promise<void>, options = undefined ): Promise<void>  {
        const fNames = fs.readdirSync(dirName)
        for(const fname of fNames) {
            const fullFname =  `${dirName}/${fname}`
            await runner(fullFname, fname)
        }
    }

    //public static tableForFilesIn<A>(dirName: string, varName: string, runner:  (fullName:string, shortName:string)=>A): any 

}

