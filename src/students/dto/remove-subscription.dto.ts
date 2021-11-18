import { IsDefined, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class RemoveSubscriptionDto {
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
