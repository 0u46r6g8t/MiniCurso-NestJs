import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from '../../students/students.service';
import { STUDENT_REPOSITORY } from '../../students/typeorm/repository.provider';
import StudentUtil from '../mocks/StudentUtil';

describe('SERVICE - Find all students', () => {
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
    it('should return an array of students when exists some students', async () => {
      mockRepository.find.mockReturnValue([
        StudentUtil.giveAMeAValidStudent({
          name: 'Student 1',
          email: 'student1@email.com',
        }),
        StudentUtil.giveAMeAValidStudent({
          name: 'Student 2',
          email: 'student2@email.com',
        }),
      ]);

      const students = await studentsService.findAll();
      expect(students).toHaveLength(2);
      expect(students[0].name).toBe('Student 1');
      expect(students[1].name).toBe('Student 2');
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array when there are no students', async () => {
      mockRepository.find.mockReturnValue([]);

      const students = await studentsService.findAll();
      expect(students).toHaveLength(0);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  // describe('failure case', () => {});
});
