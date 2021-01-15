import { IsString, IsNumber } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { ReadUserDTO } from 'src/modules/user/dto';

@Exclude()
export class ReadBookDTO {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsString()
  readonly name: string;

  @Expose()
  @IsString()
  readonly description: string;

  @Expose()
  @Type(type => ReadUserDTO)
  readonly authors: ReadUserDTO[];
}
