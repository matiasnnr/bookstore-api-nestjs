import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from '../role/role.repository';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { Status } from '../../shared/entity-status.enum';
import { ReadUserDTO, UpdateUserDTO } from './dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly _userRepository: UserRepository,
        @InjectRepository(RoleRepository)
        private readonly _roleRepository: RoleRepository,
    ) { }

    async get(userId: number): Promise<ReadUserDTO> {
        if (!userId) {
            throw new BadRequestException('userId must be sent');
        }

        const user: User = await this._userRepository.findOne(userId, { where: { status: Status.ACTIVE } });

        if (!user) {
            throw new NotFoundException();
        }

        return plainToClass(ReadUserDTO, user);
    }

    async getAll(): Promise<ReadUserDTO[]> {

        const users: User[] = await this._userRepository.find({ where: { status: Status.ACTIVE } });

        if (!users) {
            throw new NotFoundException();
        }

        return users.map((user: User) => plainToClass(ReadUserDTO, user));
    }

    async update(userId: number, user: UpdateUserDTO): Promise<ReadUserDTO> {

        const foundUser = await this._userRepository.findOne(userId, { where: { status: Status.ACTIVE } })

        if (!foundUser) {
            throw new NotFoundException('User does not exists');
        }

        foundUser.username = user.username;

        const updatedUser = await this._userRepository.save(foundUser);

        return plainToClass(ReadUserDTO, updatedUser);
    }

    async delete(userId: number): Promise<void> {
        const userExist = await this._userRepository.findOne(userId, { where: { status: Status.ACTIVE } });

        if (!userExist) {
            throw new NotFoundException();
        }

        await this._userRepository.update(userId, { status: Status.INACTIVE });
    }

    async setRoleToUser(userId: number, roleId: number): Promise<boolean> {
        const userExist = await this._userRepository.findOne(userId, { where: { status: Status.ACTIVE } });

        if (!userExist) {
            throw new NotFoundException();
        }

        const roleExist = await this._roleRepository.findOne(roleId, { where: { status: Status.ACTIVE } });

        if (!roleExist) {
            throw new NotFoundException("role does not exist");
        }

        userExist.roles.push(roleExist);

        await this._userRepository.save(userExist);

        return true;
    }

}
