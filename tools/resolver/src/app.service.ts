import { Injectable, StreamableFile, Header, Param, ServiceUnavailableException, NotFoundException } from '@nestjs/common';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';
import type { Response } from 'express';

@Injectable()
export class AppService {
  async getFile(    
    id: string,
    response: Response,
    path: string
  ): Promise<StreamableFile> {
    try{
      const filePath = join(process.cwd(), `assets/${path}/${id}`);
      const file = createReadStream(filePath);

      if (!existsSync(filePath)) { 
        throw new NotFoundException(null, 'FileNotFound')
      }

      response.set({
        'Content-Type': 'application/json',
      });

      return new StreamableFile(file);
    } catch (e) {
      console.error(e)
      throw new ServiceUnavailableException()
    }
  }
}
