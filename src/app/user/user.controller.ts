import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UserService } from './user.service'
import { IsPublic } from '../auth/decorators/is-public.decorator'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller()
export class UserController {
	constructor(private readonly userService: UserService) {}

	@IsPublic()
	@Post('user')
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.createUser(createUserDto)
	}

	@Get('users')
	findAll() {
		return this.userService.findAllUsers()
	}

	@Get('user/:id')
	findOne(@Param('id') id: string) {
		return this.userService.findUserById(id)
	}

	// @Put('user/:id')
	// update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
	// 	return this.userService.updateUser(id, updateUserDto)
	// }

	@Delete('user/:id')
	delete(@Param('id') id: string) {
		return this.userService.deleteUser(id)
	}
}
