import { ConflictException } from '@nestjs/common';
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

describe('SERVICE - Create students', () => {
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
    it('should return a new student when there no are invalid data', async () => {
      const partialStudent = {
        name: 'Student 1',
        email: 'student1@email.com',
        password: 'password',
      };

      const studentToBeCreate =
        StudentUtil.giveAMeAValidStudent(partialStudent);

      mockRepository.findOne.mockReturnValue(undefined);
      mockRepository.create.mockReturnValue(studentToBeCreate);
      mockRepository.save.mockReturnValue(studentToBeCreate);

      const student = await studentsService.create(partialStudent);

      expect(student).toBeInstanceOf(Student);
      expect(student).toHaveProperty('id');
      expect(student.name).toBe(partialStudent.name);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('failure case', () => {
    it('should return CONFLICT error when there are student with the same email', async () => {
      const partialStudent = {
        name: 'Student 1',
        email: 'student1@email.com',
        password: 'password',
      };

      const studentToBeCreate =
        StudentUtil.giveAMeAValidStudent(partialStudent);

      mockRepository.findOne.mockReturnValue(studentToBeCreate);
      mockRepository.create.mockReturnValue(studentToBeCreate);
      mockRepository.save.mockReturnValue(studentToBeCreate);
      await expect(
        studentsService.create(partialStudent),
      ).rejects.toBeInstanceOf(ConflictException);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.create).toHaveBeenCalledTimes(0);
      expect(mockRepository.save).toHaveBeenCalledTimes(0);
    });
  });
});
