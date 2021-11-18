import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { SubscriptionController } from './subscription.controller';
import { DatabaseModule } from '../config/database.module';
import { studentProviders } from './student.provider';
import { SubjectsModule } from '../subjects/subjects.module';

@Module({
  imports: [DatabaseModule, SubjectsModule],
  controllers: [SubscriptionController, StudentsController],
  providers: [...studentProviders, StudentsService],
})
export class StudentsModule {}
