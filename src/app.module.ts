import { Module } from '@nestjs/common';
import { StudentsModule } from './students/students.module';
import { DatabaseModule } from './config/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, StudentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
