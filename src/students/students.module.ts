import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { DatabaseModule } from '../database/database.module';
import { studentProviders } from './students.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [StudentsController],
  providers: [...studentProviders, StudentsService],
})
export class StudentsModule {}
