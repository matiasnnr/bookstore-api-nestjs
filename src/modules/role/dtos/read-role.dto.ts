import { Exclude, Expose } from "class-transformer";
import { IsNumber, IsString, MaxLength } from "class-validator";

@Exclude()
export class ReadRoleDTO {

    @Expose({ name: 'identifier' }) // nombre en respuesta de la api
    @IsNumber()
    readonly id: number; // nombre a nivel de backend

    @Expose()
    @IsString()
    @MaxLength(50, { message: 'This name is not valid' })
    readonly name: string;

    @Expose()
    @IsString()
    @MaxLength(100, { message: 'This description is not valid' })
    readonly description: string;
}