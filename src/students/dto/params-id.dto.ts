import { IsString, IsUUID } from 'class-validator';

export class ParamsIdDto {
  @IsString()
  @IsUUID()
  id: string;
}
