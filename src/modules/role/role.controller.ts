import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateRoleDTO, ReadRoleDTO } from './dtos';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
    constructor(private readonly _roleService: RoleService) { }

    @Get(':roleId')
    getRole(@Param('roleId', ParseIntPipe) roleId: number): Promise<ReadRoleDTO> {
        return this._roleService.get(roleId);
    }

    @Get()
    getRoles(): Promise<ReadRoleDTO[]> {
        return this._roleService.getAll();
    }

    @Post('/create')
    createRole(@Body() role: Partial<CreateRoleDTO>): Promise<ReadRoleDTO> {
        return this._roleService.create(role);
    }

    @Patch(':roleId')
    updateRole(@Param('roleId', ParseIntPipe) roleId: number, @Body() role: Partial<CreateRoleDTO>): Promise<ReadRoleDTO> {
        return this._roleService.update(roleId, role);
    }

    @Delete(':roleId')
    deleteRole(@Param('roleId', ParseIntPipe) roleId: number): Promise<String> {
        return this._roleService.delete(roleId);
    }

}
