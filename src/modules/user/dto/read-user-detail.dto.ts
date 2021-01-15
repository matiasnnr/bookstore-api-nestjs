import { IsString, IsNumber } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ReadUserDetailDTO {
  @Expose()
  @IsNumber()
  readonly name: number;

  @Expose()
  @IsString()
  readonly lastname: string;
}
