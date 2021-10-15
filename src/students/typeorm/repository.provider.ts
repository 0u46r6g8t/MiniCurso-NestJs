import { databaseProvider } from 'src/database/database.providers';
import { Connection } from 'typeorm';
import { Student } from './student.entity';

export const studentRepositoryProvider = 'STUDENT_REPOSITORY';

export const repositoryProvider = {
  provide: studentRepositoryProvider,
  useFactory: (connection: Connection) => connection.getRepository(Student),
  inject: [databaseProvider],
};
