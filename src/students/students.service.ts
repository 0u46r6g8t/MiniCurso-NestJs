import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SubjectsService } from 'src/subjects/subjects.service';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { RemoveSubscriptionDto } from './dto/remove-subscription.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { STUDENT_REPOSITORY } from './typeorm/repository.provider';
import { Student } from './typeorm/student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @Inject(STUDENT_REPOSITORY)
    private studentRepository: Repository<Student>,
    private readonly subjectsService: SubjectsService,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const emailExists = await this.findByEmail(createStudentDto.email);

    if (emailExists) {
      throw new ConflictException('Email already exists');
    }

    const student = this.studentRepository.create(createStudentDto);

    this.studentRepository.save(student);

    return student;
  }

  findAll() {
    return this.studentRepository.find();
  }

  async findOne(id: string) {
    const student = await this.studentRepository.findOne(id);

    if (!student) {
      throw new NotFoundException(`Student with id "${id}" not found`);
    }

    return student;
  }

  async findByEmail(email: string) {
    return this.studentRepository.findOne({ email });
  }

  async update(
    id: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    await this.findOne(id);

    if (updateStudentDto.email) {
      const emailExists = await this.findByEmail(updateStudentDto.email);

      if (emailExists && emailExists.id !== id) {
        throw new ConflictException('Email already exists');
      }
    }

    await this.studentRepository.update(id, updateStudentDto);

    return this.findOne(id);
  }

  async remove(id: string) {
    await this.studentRepository.delete(id);
  }

  async createSubscription({ subjectId, studentId }: CreateSubscriptionDto) {
    const student = await this.findOne(studentId);
    const suject = await this.subjectsService.findOne(subjectId);

    console.log(student, suject);
    student.subjects.push(suject);

    console.log(student, suject);
    await this.studentRepository.save(student);

    return this.findOne(studentId);
  }

  async removeSubscription({ subjectId, studentId }: RemoveSubscriptionDto) {
    const student = await this.findOne(studentId);
    const suject = await this.subjectsService.findOne(subjectId);

    student.subjects = student.subjects.filter(
      (SubjectStudent) => SubjectStudent.id !== suject.id,
    );

    await this.studentRepository.save(student);
  }
}
