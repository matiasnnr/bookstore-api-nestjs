import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from './role.controller';
import { RoleRepository } from './role.repository';
import { RoleService } from './role.service';

@Module({
    imports: [TypeOrmModule.forFeature([RoleRepository])], // se importan modulos para hacer inyección de dependencias en los constructores
    providers: [RoleService],
    controllers: [RoleController]
})
export class RoleModule { }
