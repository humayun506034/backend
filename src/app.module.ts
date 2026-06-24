import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PreorderModule } from './modules/preorder/preorder.module';

@Module({
  imports: [PrismaModule, PreorderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
