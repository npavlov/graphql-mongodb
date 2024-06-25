import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { In, Repository } from 'typeorm';
import { CreateStudentInput } from './student.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    const { firstName, lastName, birthday } = createStudentInput;

    const student = this.studentRepository.create({
      id: uuid(),
      firstName,
      lastName,
      birthday,
    });

    return this.studentRepository.save(student);
  }

  async getStudent(id: string): Promise<Student> {
    return this.studentRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async getStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    return this.studentRepository.find({
      where: {
        id: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          $in: studentIds,
        },
      },
    });
  }
}
