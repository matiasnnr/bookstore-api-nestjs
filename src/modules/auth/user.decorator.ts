import { createParamDecorator } from "@nestjs/common";
import { UserDTO } from "../user/dto/user.dto";

export const GetUser = createParamDecorator((key, req) => key ? req.user[key] : req.user)