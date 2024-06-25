import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDateString, MinLength, IsInt, IsUUID } from 'class-validator';

@InputType()
export class CreateLessonInput {
  @MinLength(2)
  @Field()
  name: string;
  @IsInt()
  @Field()
  code: number;
  @IsDateString()
  @Field()
  startDate: string;
  @IsDateString()
  @Field()
  endDate: string;
  @IsUUID('4', { each: true })
  @Field(() => [ID], { defaultValue: [] })
  students: string[];
}
