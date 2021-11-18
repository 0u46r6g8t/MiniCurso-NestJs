import { Subject } from './../../subjects/typeorm/subject.entity';
import {} from 'uuid';
export default class SubjectUtil {
  static giveAMeAValidSubject({
    name,
    workload,
    nameTeacher,
    timeInTheWeek,
  }: Partial<Subject>): Subject {
    const subject = new Subject();
    subject.name = name || 'Valid Subject';
    subject.workload = workload || 45;
    subject.nameTeacher = nameTeacher || 'Suzan Kely';
    subject.timeInTheWeek = timeInTheWeek || ['5M1', '5M2', '5M3'];
    return subject;
  }
}
