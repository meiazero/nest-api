import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UserService } from './user.service'
import { IsPublic } from '../auth/decorators/is-public.decorator'
import { UpdateUserDto } from './dto/update-user.dto'
import {
    ApiBearerAuth,
    ApiHeader,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger'

@ApiTags('users')
@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({ summary: 'Create a user' })
    @ApiResponse({
        status: 201,
        description: 'The user has been successfully created.'
    })
    @IsPublic()
    @Post('user')
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto)
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({
        status: 200,
        description: 'Return all users in format JSON.'
    })
    @ApiHeader({
        name: 'Authorization',
        description: 'The token we need for auth.'
    })
    @Get('users')
    findAll() {
        return this.userService.findAllUsers()
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get infos of a specific user with ID.' })
    @ApiResponse({
        status: 200,
        description: 'Return the infos of a user in format JSON.'
    })
    @ApiParam({ name: 'id', type: String })
    @ApiHeader({
        name: 'Authorization',
        description: 'The token we need for auth.'
    })
    @Get('user/:id')
    findOne(@Param('id') id: string) {
        return this.userService.findUserById(id)
    }

    // @Put('user/:id')
    // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    // 	return this.userService.updateUser(id, updateUserDto)
    // }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a specific user.' })
    @ApiResponse({
        status: 200,
        description: 'Return the message of the deletion.'
    })
    @ApiParam({ name: 'id', type: String })
    @ApiHeader({
        name: 'Authorization',
        description: 'The token we need for auth.'
    })
    @Delete('user/:id')
    delete(@Param('id') id: string) {
        return this.userService.deleteUser(id)
    }
}
