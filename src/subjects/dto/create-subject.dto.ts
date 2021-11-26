import {
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateSubjectDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  nameTeacher: string;

  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  workload: number;

  @IsDefined()
  @IsArray()
  @IsNotEmpty()
  @ArrayNotEmpty()
  timeInTheWeek: string[];
}
