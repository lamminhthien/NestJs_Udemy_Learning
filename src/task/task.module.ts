import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsController } from './task.controller';
import { ReportsService } from './task.service';
import { Task } from './task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
