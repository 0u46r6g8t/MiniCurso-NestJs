import { Module } from '@nestjs/common';
import { StudentsModule } from './students/students.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), StudentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
