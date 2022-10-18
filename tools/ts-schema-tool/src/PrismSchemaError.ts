
export class PrismSchemaError {
  public schemaId: string;
  public message: string;

  constructor(schemaId: string, message: string) {
    this.schemaId = schemaId;
    this.message = message;
  }

}