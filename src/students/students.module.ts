import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { DatabaseModule } from '../config/database.module';
import { studentProviders } from './student.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [StudentsController],
  providers: [...studentProviders, StudentsService],
})
export class StudentsModule {}
