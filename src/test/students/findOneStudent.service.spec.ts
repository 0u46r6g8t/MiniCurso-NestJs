import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from '../../students/students.service';
import { STUDENT_REPOSITORY } from '../../students/typeorm/repository.provider';
import { Student } from '../../students/typeorm/student.entity';
import { SubjectsService } from '../../subjects/subjects.service';
import {
  mockRepository,
  resetMocks,
  subjectsServiceMock,
} from '../mocks/mockClasses';
import StudentUtil from '../mocks/StudentUtil';

describe('SERVICE - Find one students', () => {
  let studentsService: StudentsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        {
          provide: STUDENT_REPOSITORY,
          useFactory: () => mockRepository,
          inject: [],
        },
        {
          provide: SubjectsService,
          useFactory: () => subjectsServiceMock,
        },
      ],
    }).compile();

    studentsService = module.get<StudentsService>(StudentsService);
  });

  beforeEach(() => {
    resetMocks(mockRepository);
    resetMocks(subjectsServiceMock);
  });

  it('should be defined', () => {
    expect(studentsService).toBeDefined();
  });

  describe('success case', () => {
    it('should return a student when there are student with the same id', async () => {
      const studentToBeFetched = StudentUtil.giveAMeAValidStudent({
        name: 'Student 1',
        email: 'student1@email.com',
      });

      mockRepository.findOne.mockReturnValue(studentToBeFetched);

      const student = await studentsService.findOne(studentToBeFetched.id);
      expect(student).toBeInstanceOf(Student);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('failure case', () => {
    it('should return NOT_FOUND error when there are no student with the same id', async () => {
      const studentToBeFetched = StudentUtil.giveAMeAValidStudent({});

      mockRepository.findOne.mockReturnValue(undefined);

      await expect(
        studentsService.findOne(studentToBeFetched.id),
      ).rejects.toBeInstanceOf(NotFoundException);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });
});
