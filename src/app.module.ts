import { Module } from '@nestjs/common';
import { StudentsModule } from './students/students.module';
import { ConfigModule } from '@nestjs/config';
import { SubjectsModule } from './subjects/subjects.module';

@Module({
  imports: [ConfigModule.forRoot(), StudentsModule, SubjectsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
