import { PrismSchema } from "./PrismSchema";

export interface SchemaResolver {

    /**
     * 
     * @param id id of schema to resolve.
     * @return resolved schema or undefined.
     */
    resolveSchema(id: string):PrismSchema|undefined

}


export class DirectorySchemaResolver {

    private data: Map<string, PrismSchema> = new Map();
 
    public constructor(dirname: string) {
        throw new Error("Not impleented")
    }

    public resolveSchema(id: string):PrismSchema|undefined {
        return this.data.get(id);
    }

   
}

export class EmptySchemaResolver {

    public resolveSchema(id: string):PrismSchema|undefined {
        return undefined;
    }

}