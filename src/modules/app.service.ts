import { Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('health')
@Injectable()
export class AppService {
  getHello(): string {
    return 'Server is up and running';
  }
}
