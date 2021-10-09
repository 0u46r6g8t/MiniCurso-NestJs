import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { STUDENT_REPOSITORY } from './typeorm/repository.provider';
import { Student } from './typeorm/student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @Inject(STUDENT_REPOSITORY)
    private studentRepository: Repository<Student>,
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
    return `This action returns all students`;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  async findByEmail(email: string) {
    return this.studentRepository.findOne({ email });
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
