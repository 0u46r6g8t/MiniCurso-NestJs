import { IsDefined, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateSubscriptionDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsUUID()
  studentId: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsUUID()
  subjectId: string;
}
