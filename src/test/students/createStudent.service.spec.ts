import { Test, TestingModule } from '@nestjs/testing';
import { Student } from '../../students/typeorm/student.entity';
import { StudentsService } from '../../students/students.service';
import { STUDENT_REPOSITORY } from '../../students/typeorm/repository.provider';
import StudentUtil from '../mocks/StudentUtil';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('SERVICE - Create students', () => {
  let studentsService: StudentsService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        {
          provide: STUDENT_REPOSITORY,
          useFactory: () => mockRepository,
          inject: [],
        },
      ],
    }).compile();

    studentsService = module.get<StudentsService>(StudentsService);
  });

  beforeEach(() => {
    mockRepository.find.mockReset();
    mockRepository.findOne.mockReset();
    mockRepository.create.mockReset();
    mockRepository.save.mockReset();
    mockRepository.update.mockReset();
    mockRepository.delete.mockReset();
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
