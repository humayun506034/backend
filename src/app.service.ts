import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Preorder Manager API is running. Visit /docs for Swagger documentation.';
  }
}
