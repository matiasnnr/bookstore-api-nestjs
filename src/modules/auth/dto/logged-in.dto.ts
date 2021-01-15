import { IsString } from 'class-validator';
import { ReadUserDTO } from '../../user/dto';
import { Type, Exclude, Expose } from 'class-transformer';

@Exclude()
export class LoggedInDTO {
  @Expose()
  @IsString()
  token: string;

  @Expose()
  @Type(() => ReadUserDTO)
  user: ReadUserDTO;
}
