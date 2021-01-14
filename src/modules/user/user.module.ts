import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../../shared/shared.module';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { RoleRepository } from '../role/role.repository';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository, RoleRepository]), SharedModule, AuthModule], // se importan modulos para hacer inyección de dependencias en los constructores
    providers: [UserService],
    controllers: [UserController]
})
export class UserModule { }
