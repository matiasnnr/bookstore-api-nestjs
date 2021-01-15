import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBookDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsNotEmpty()
  readonly authors: number[];
}
