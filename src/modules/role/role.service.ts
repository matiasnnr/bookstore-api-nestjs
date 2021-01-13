import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleRepository)
        private readonly _roleRepository: RoleRepository,
    ) { }

    async get(id: number): Promise<Role> {
        if (!id) {
            throw new BadRequestException('id must be sent');
        }

        const role: Role = await this._roleRepository.findOne(id, { where: { status: 'ACTIVE' } });

        if (!role) {
            throw new NotFoundException();
        }

        return role;
    }

    async getAll(): Promise<Role[]> {

        const roles: Role[] = await this._roleRepository.find({ where: { status: 'ACTIVE' } });

        if (!roles) {
            throw new NotFoundException();
        }

        return roles;
    }

    async create(role: Role): Promise<Role> {

        const savedRole: Role = await this._roleRepository.save(role);

        return savedRole;
    }

    async update(id: number, role: Role): Promise<String> {
        await this._roleRepository.update(id, role);
        return `Se ha actualizado el rol con id ${id}`;
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
