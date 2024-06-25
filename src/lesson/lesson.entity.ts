import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Lesson {
  @ObjectIdColumn()
  _id: string;
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  code: number;
  @Column()
  startDate: string;
  @Column()
  endDate: string;
  @Column()
  students: string[];
}
