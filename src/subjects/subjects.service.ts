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
    const subject = await this.subjectRepository.findOne(id);

    if (!subject)
      throw new NotFoundException(`Subject with id "${id}" not found`);

    return subject;
  }

  async update(id: string, updateSubjectDto: UpdateSubjectDto) {
    await this.findOne(id);

    await this.subjectRepository.update(id, updateSubjectDto);

    return this.findOne(id);
  }

  async remove(id: string) {
    await this.subjectRepository.delete(id);
  }
}
