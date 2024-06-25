import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
  ) {}

  async createLesson(createLessonInput: CreateLessonInput) {
    const { name, code, startDate, endDate, students } = createLessonInput;

    const lesson = this.lessonRepository.create({
      id: uuid(),
      name,
      code,
      startDate,
      endDate,
      students,
    });

    return this.lessonRepository.save(lesson);
  }

  async getLesson(id: string): Promise<Lesson> {
    return this.lessonRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async getLessons(): Promise<Lesson[]> {
    return this.lessonRepository.find();
  }

  async assignStudentsToLesson(lessonId: string, studentIds: string[]) {
    const lesson = await this.lessonRepository.findOne({
      where: {
        id: lessonId,
      },
    });

    const combined = [...(lesson.students ?? []), ...studentIds];

    lesson.students = [...new Set(combined)] as string[];

    return this.lessonRepository.save(lesson);
  }
}
