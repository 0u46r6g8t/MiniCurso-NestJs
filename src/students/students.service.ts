import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { STUDENT_REPOSITORY } from './typeorm/repository.provider';
import { Student } from './typeorm/student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @Inject(STUDENT_REPOSITORY)
    private photoRepository: Repository<Student>,
  ) {}

  create(createStudentDto: CreateStudentDto) {
    return 'This action adds a new student';
  }

  findAll() {
    return `This action returns all students`;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
