import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigurationService {
  public port: number;

  constructor() {
    this.port = (process.env.PORT as unknown as number) || 3001;
  }
}
