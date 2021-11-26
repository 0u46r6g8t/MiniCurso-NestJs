import { databaseProvider } from '../../config/database.providers';
import { Connection } from 'typeorm';
import { Subject } from './subject.entity';

export const SUBJECT_REPOSITORY = 'SUBJECT_REPOSITORY';

export const subjectRepositoryProvider = {
  provide: SUBJECT_REPOSITORY,
  useFactory: (connection: Connection) => connection.getRepository(Subject),
  inject: [databaseProvider],
};
