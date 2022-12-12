import { Controller, Get, StreamableFile, Res, Req, Header, Param } from '@nestjs/common';
import { AppService } from './app.service';
import type { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('json-ld-contexts/:id')
  async getJsonLDContext(
    @Param('id') id: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<StreamableFile> {
    return this.appService.getFile(id, response, process.env.JSON_LD_CONTEXTS_PATH)
  }

  @Get('proofspace-prism-schemas/:id')
  async getProofScpacePrismSchemas(
    @Param('id') id: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<StreamableFile> {
    return this.appService.getFile(id, response, process.env.JSON_PRISM_SCHEMAS_PATH)
  }

  @Get('proofspace-schemas/:id')
  async getProofSpaceSchemas(
    @Param('id') id: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<StreamableFile> {
    return this.appService.getFile(id, response, process.env.JSON_SCHEMAS_PATH)
  }
}
