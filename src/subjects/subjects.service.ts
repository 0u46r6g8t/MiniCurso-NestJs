import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './typeorm/subject.entity';
import { SUBJECT_REPOSITORY } from './typeorm/repository.provider';

@Injectable()
export class SubjectsService {
  constructor(
    @Inject(SUBJECT_REPOSITORY)
    private subjectRepository: Repository<Subject>,
  ) {}

  async create(createSubjectDto: CreateSubjectDto) {
    const subject = this.subjectRepository.create(createSubjectDto);

    return await this.subjectRepository.save(subject);
  }

  async findAll() {
    return await this.subjectRepository.find();
  }

  async findOne(id: string) {
    return await this.subjectRepository.findOne(id);
  }

  async update(id: string, updateSubjectDto: UpdateSubjectDto) {
    const subject = this.findOne(id);

    if (!subject) throw new NotFoundException(`Subject not registered`);

    return await this.subjectRepository.update(id, updateSubjectDto);
  }

  async remove(id: string) {
    const subject = this.findOne(id);

    if (!subject) throw new NotFoundException('Subject not registered');

    return await this.subjectRepository.delete(id);
  }
}
