import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { RoleType } from '../role/roletype.enum';
import { User } from '../user/user.entity';
import { AuthRepository } from './auth.repository';
import { SigninDTO, SignupDTO } from './dto';
import { IJwtPayload } from './jwt-payload.interace';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthRepository)
        private readonly _authRepository: AuthRepository,
        private readonly _jwtService: JwtService
    ) { }

    async signup(signupDTO: SignupDTO): Promise<void> {
        const { username, email } = signupDTO;
        const userExists = await this._authRepository.findOne({
            where: [{ username }, { email }], // aquí valida si existe o el mismo username o el mismo email en la db
        });

        if (userExists) {
            throw new ConflictException("username or email already exists");
        }

        return this._authRepository.signup(signupDTO);
    }

    async signin(signinDTO: SigninDTO): Promise<{ token: string }> {
        const { username, password } = signinDTO;
        const user: User = await this._authRepository.findOne({
            where: { username },
        })

        if (!user) {
            throw new NotFoundException("user does not exist");
        }

        // validar contraseña encriptada que viene del cliente con la de la db
        const isMatch = await compare(password, user.password);

        if (!isMatch) {
            throw new UnauthorizedException('invalid credentials');
        }

        const payload: IJwtPayload = {
            id: user.id,
            email: user.email,
            username: user.username,
            roles: user.roles.map(r => r.name as RoleType)
        }

        // generamos el token
        const token = await this._jwtService.sign(payload);

        return { token };
    }
}
