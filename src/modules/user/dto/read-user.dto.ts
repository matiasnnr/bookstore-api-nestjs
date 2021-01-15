import { IsString, IsNumber } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { ReadUserDetailDTO } from '.';
import { ReadRoleDTO } from 'src/modules/role/dtos';

@Exclude()
export class ReadUserDTO {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsString()
  readonly username: string;

  @Expose()
  @IsString()
  readonly email: string;

  @Expose()
  @Type(type => ReadUserDetailDTO)
  readonly details: ReadUserDetailDTO;

  @Expose()
  @Type(type => ReadRoleDTO)
  readonly roles: ReadRoleDTO[];
}
