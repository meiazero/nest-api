import { Body, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { PrismaService } from '../database/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        const data = {
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, 10)
        }

        const createdUser = await this.prisma.user.create({ data })

        return {
            ...createdUser,
            password: undefined
        }
    }

    findByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } })
    }

    findById(id: string) {
        return this.prisma.user.findUnique({ where: { id } })
    }

    async updateUser(id: string, data: CreateUserDto) {
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data
        })

        return {
            ...updatedUser,
            password: undefined
        }
    }
}
