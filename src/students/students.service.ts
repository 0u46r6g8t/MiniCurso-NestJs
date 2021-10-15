import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor() {}

  async create(createStudentDto: CreateStudentDto) {}

  findAll() {}

  async findOne(id: string) {}

  async findByEmail(email: string) {}

  async update(id: string, updateStudentDto: UpdateStudentDto) {}

  async remove(id: string) {}
}
