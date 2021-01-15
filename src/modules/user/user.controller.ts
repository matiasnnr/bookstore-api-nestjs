import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../role/decorator/role.decorator';
import { RoleGuard } from '../role/guards/role.guard';
import { RoleType } from '../role/roletype.enum';
import { ReadUserDTO } from './dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly _userService: UserService) { }

    @Get(':userId')
    // @Roles(RoleType.ADMIN, RoleType.AUTHOR) // solo podrán acceder a este endpoint las personas que tengan estos roles en su perfil
    // @UseGuards(AuthGuard(), RoleGuard) // AuthGuard se encarga de proteger el endpoint, lo muestra solo cuando se cumple la authentication. El RoleGuard se usa para valuserIdar los roles junto al @ de arriba
    getUser(@Param('userId', ParseIntPipe) userId: number): Promise<ReadUserDTO> {
        return this._userService.get(userId);
    }

    // @UseGuards(AuthGuard()) // se encarga de proteger el endpoint, lo muestra solo cuando se cumple la authentication
    @Get()
    getUsers(): Promise<ReadUserDTO[]> {
        return this._userService.getAll();
    }

    @Patch(':userId')
    updateUser(@Param('userId', ParseIntPipe) userId: number, @Body() user: User): Promise<ReadUserDTO> {
        return this._userService.update(userId, user);
    }

    @Delete(':userId')
    deleteUser(@Param('userId', ParseIntPipe) userId: number): Promise<void> {
        return this._userService.delete(userId);
    }

    @Post('/setrole/:userId/:roleId')
    setRoleToUser(
        @Param('userId', ParseIntPipe) userId: number,
        @Param('roleId', ParseIntPipe) roleId: number
    ): Promise<boolean> {
        return this._userService.setRoleToUser(userId, roleId);
    }

}
