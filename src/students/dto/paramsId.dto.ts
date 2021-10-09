import { IsUUID, IsNotEmpty, IsString } from 'class-validator';

export class IParamsIdDTO {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
