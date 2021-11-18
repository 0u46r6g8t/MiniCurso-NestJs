import { databaseProvider } from '../../config/database.providers';
import { Connection } from 'typeorm';
import { Student } from './student.entity';

export const STUDENT_REPOSITORY = 'STUDENT_REPOSITORY';

export const studentRepositoryProvider = {
  provide: STUDENT_REPOSITORY,
  useFactory: (connection: Connection) => connection.getRepository(Student),
  inject: [databaseProvider],
};
