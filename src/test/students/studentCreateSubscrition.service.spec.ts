import { ConflictException, NotFoundException } from '@nestjs/common';
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
import SubjectUtil from '../mocks/SubjectUtil';

describe('SERVICE - students create a subscription', () => {
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
    it('should return a  student with a new subject when there are studentId and subjectId', async () => {
      const partialStudent = {
        name: 'Student 1',
        email: 'student1@email.com',
        password: 'password',
      };

      const student = StudentUtil.giveAMeAValidStudent(partialStudent);
      const subject = SubjectUtil.giveAMeAValidSubject({});

      mockRepository.findOne.mockReturnValue(student);
      subjectsServiceMock.findOne.mockReturnValue(subject);

      mockRepository.save.mockReturnValue(student);

      const studentWithSubject = await studentsService.createSubscription({
        studentId: student.id,
        subjectId: subject.id,
      });

      expect(studentWithSubject).toBeInstanceOf(Student);
      expect(studentWithSubject).toHaveProperty('id');
      expect(studentWithSubject).toHaveProperty('subjects');
      expect(studentWithSubject.name).toBe(partialStudent.name);
      expect(studentWithSubject.subjects).toHaveLength(1);
      expect(studentWithSubject.subjects[0].name).toBe(subject.name);

      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(subjectsServiceMock.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('failure case', () => {
    it('should return NOT_FOUND error when there no are studentId', async () => {
      const partialStudent = {
        name: 'Student 1',
        email: 'student1@email.com',
        password: 'password',
      };

      const student = StudentUtil.giveAMeAValidStudent(partialStudent);
      const subject = SubjectUtil.giveAMeAValidSubject({});

      mockRepository.findOne.mockReturnValue(undefined);
      subjectsServiceMock.findOne.mockReturnValue(subject);

      mockRepository.save.mockReturnValue(student);

      await expect(
        studentsService.createSubscription({
          studentId: student.id,
          subjectId: subject.id,
        }),
      ).rejects.toThrow(NotFoundException);

      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(subjectsServiceMock.findOne).toHaveBeenCalledTimes(0);
      expect(mockRepository.save).toHaveBeenCalledTimes(0);
    });
    it('should return NOT_FOUND error when there no are subjectId', async () => {
      const partialStudent = {
        name: 'Student 1',
        email: 'student1@email.com',
        password: 'password',
      };

      const student = StudentUtil.giveAMeAValidStudent(partialStudent);
      const subject = SubjectUtil.giveAMeAValidSubject({});

      mockRepository.findOne.mockReturnValue(student);
      subjectsServiceMock.findOne.mockRejectedValue(
        new NotFoundException(`Subject with id "${subject.id}" not found`),
      );

      mockRepository.save.mockReturnValue(student);

      await expect(
        studentsService.createSubscription({
          studentId: student.id,
          subjectId: subject.id,
        }),
      ).rejects.toThrow(NotFoundException);

      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(subjectsServiceMock.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.save).toHaveBeenCalledTimes(0);
    });
  });
});
