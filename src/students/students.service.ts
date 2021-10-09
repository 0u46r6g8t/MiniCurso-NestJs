import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
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

    console.log(student);

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
}
