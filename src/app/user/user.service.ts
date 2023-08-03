import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { Prisma } from '@prisma/client'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { PrismaService } from '../../db/prisma/prisma.service'
import { User } from './entities/user.entity'
import { NotUserFoundError } from './errors/not-user-found-error'

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async createUser(createUserDto: CreateUserDto): Promise<User> {
		const data: Prisma.UserCreateInput = {
			...createUserDto,
			password: await bcrypt.hash(createUserDto.password, 10),
		}

		const user = await this.prisma.user.create({ data })

		return {
			...user,
			password: undefined,
		}
	}

	async findUserByEmail(email: string) {
		const data: Prisma.UserWhereUniqueInput = {
			email,
		}

		const user = await this.prisma.user.findUnique({ where: data })

		return user
	}

	async findUserById(id: string) {
		const data: Prisma.UserWhereUniqueInput = {
			id,
		}

		const user = await this.prisma.user.findUnique({ where: data })

		return user
	}

	async findAllUsers() {
		const users = await this.prisma.user.findMany()

		return users.map((user) => ({
			...user,
			password: undefined,
		}))
	}

	// async updateUser(id: string, UpdateUserDto: UpdateUserDto) {
	// 	const data = {
	// 		...UpdateUserDto,
	// 	}

	// 	if (!id) throw new Error('id is required')

	// 	if (!this.findUserById(id)) throw new NotUserFoundError('User not found')

	// 	if (data.password) data.password = await bcrypt.hash(data.password, 10)

	// 	const user = await this.prisma.user.update({ where: { id }, data })

	// 	return {
	// 		...user,
	// 		password: undefined,
	// 	}
	// }

	async deleteUser(id: string) {
		const data: Prisma.UserWhereUniqueInput = {
			id,
		}

		if (!id) throw new Error('id is required')

		if (!this.findUserById(id)) throw new NotUserFoundError('User not found')

		const user = await this.prisma.user.delete({ where: data })

		return {
			...user,
			password: undefined,
		}
	}
}
