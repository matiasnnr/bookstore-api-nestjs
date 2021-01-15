import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoggedInDTO, SigninDTO, SignupDTO } from './dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly _authService: AuthService
    ) { }

    @Post('/signup')
    @UsePipes(ValidationPipe) // permite que las validaciones que tiene nuestro DTO se cumplan
    signup(@Body() signupDTO: SignupDTO): Promise<void> {
        return this._authService.signup(signupDTO);
    }

    @Post('/signin')
    @UsePipes(ValidationPipe) // permite que las validaciones que tiene nuestro DTO se cumplan
    signin(@Body() signinDTO: SigninDTO): Promise<LoggedInDTO> {
        return this._authService.signin(signinDTO);
    }
}
