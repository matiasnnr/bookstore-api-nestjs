import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Status } from 'src/shared/entity-status.enum';
import { CreateRoleDTO, ReadRoleDTO, UpdateRoleDTO } from './dtos';
import { Role } from './role.entity';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleRepository)
        private readonly _roleRepository: RoleRepository,
    ) { }

    async get(id: number): Promise<ReadRoleDTO> {
        if (!id) {
            throw new BadRequestException('id must be sent');
        }

        const role: Role = await this._roleRepository.findOne(id, { where: { status: 'ACTIVE' } });

        if (!role) {
            throw new NotFoundException();
        }

        return plainToClass(ReadRoleDTO, role);
    }

    async getAll(): Promise<ReadRoleDTO[]> {

        const roles: Role[] = await this._roleRepository.find({ where: { status: 'ACTIVE' } });

        if (!roles) {
            throw new NotFoundException();
        }

        return roles.map((role: Role) => plainToClass(ReadRoleDTO, role));
    }

    async create(role: Partial<CreateRoleDTO>): Promise<ReadRoleDTO> {

        const savedRole: Role = await this._roleRepository.save(role);

        return plainToClass(ReadRoleDTO, savedRole);
    }

    async update(roleId: number, role: Partial<UpdateRoleDTO>): Promise<ReadRoleDTO> {

        const foundRole = await this._roleRepository.findOne(roleId,
            { where: { status: Status.ACTIVE } });

        if (!foundRole) {
            throw new NotFoundException('This role does not exist');
        }

        foundRole.name = role.name;
        foundRole.description = role.description;

        const updatedRole = await this._roleRepository.save(foundRole);

        return plainToClass(ReadRoleDTO, updatedRole);
    }

    async delete(id: number): Promise<String> {
        const roleExists = await this._roleRepository.findOne(id, { where: { status: 'ACTIVE' } });

        if (!roleExists) {
            throw new NotFoundException();
        }

        await this._roleRepository.update(id, { status: 'INACTIVE' });

        return `Se ha eliminado el rol con id ${id}`;
    }
}
