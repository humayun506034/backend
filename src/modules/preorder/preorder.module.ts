import { Module } from '@nestjs/common';
import { PreorderService } from './preorder.service';
import { PreorderController } from './preorder.controller';

@Module({
  controllers: [PreorderController],
  providers: [PreorderService],
})
export class PreorderModule {}
