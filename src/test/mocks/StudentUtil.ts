import { Student } from './../../students/typeorm/student.entity';
import {} from 'uuid';
export default class StudentUtil {
  static giveAMeAValidStudent({
    email,
    name,
    password,
    subjects,
  }: Partial<Student>): Student {
    const student = new Student();
    student.email = email || 'valid@student.com';
    student.name = name || 'valid Jonh Doe';
    student.password = password || 'myP@ssword123';
    student.subjects = [...(subjects || [])];
    return student;
  }
}
