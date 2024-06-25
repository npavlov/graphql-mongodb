import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, MinLength } from 'class-validator';

@InputType()
export class CreateStudentInput {
  @MinLength(3)
  @Field()
  firstName: string;
  @MinLength(3)
  @Field()
  lastName: string;
  @IsDateString()
  @Field()
  birthday: string;
}
