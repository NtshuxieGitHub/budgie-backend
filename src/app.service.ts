import { Injectable } from '@nestjs/common';
import ENV from 'src/config/config';

@Injectable()
export class AppService {
  getHello(): string {
    console.log(`Budgie Server is up and running on port:${ENV.port}`);
    return 'Hello Budgie!!!';
  }
}
