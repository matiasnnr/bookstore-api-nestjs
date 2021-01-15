import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../role/decorator/role.decorator';
import { RoleGuard } from '../role/guards/role.guard';
import { RoleType } from '../role/roletype.enum';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly _userService: UserService) { }

    @Get(':id')
    // @Roles(RoleType.ADMIN, RoleType.AUTHOR) // solo podrán acceder a este endpoint las personas que tengan estos roles en su perfil
    // @UseGuards(AuthGuard(), RoleGuard) // AuthGuard se encarga de proteger el endpoint, lo muestra solo cuando se cumple la authentication. El RoleGuard se usa para validar los roles junto al @ de arriba
    async getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return await this._userService.get(id);
    }

    @UseGuards(AuthGuard()) // se encarga de proteger el endpoint, lo muestra solo cuando se cumple la authentication
    @Get()
    async getUsers(): Promise<User[]> {
        return await this._userService.getAll();
    }

    @Post('/create')
    async createUser(@Body() user: User): Promise<User> {
        return await this._userService.create(user);
    }

    @Patch(':id')
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: User): Promise<void> {
        await this._userService.update(id, user);
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this._userService.delete(id);
    }

    @Post('/setrole/:userId/:roleId')
    async setRoleToUser(
        @Param('userId', ParseIntPipe) userId: number,
        @Param('roleId', ParseIntPipe) roleId: number
    ): Promise<Boolean> {
        return this._userService.setRoleToUser(userId, roleId);
    }

}
