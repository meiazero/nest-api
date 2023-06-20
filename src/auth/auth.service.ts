import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { User } from '../user/entities/user.entity'
import { UserService } from '../user/user.service'
import { UnauthorizedError } from './erros/unauthorized.error'
import { UserPayload } from './models/UserPayload'
import { UserToken } from './models/UserToken'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    login(user: User): UserToken {
        const payload: UserPayload = {
            sub: user.id,
            email: user.email,
            name: user.name
        }

        const jwtToken = this.jwtService.sign(payload)

        return {
            access_token: jwtToken
        }
    }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email)
        if (user) {
            const IsPasswordValid = await bcrypt.compare(
                password,
                user.password
            )
            if (IsPasswordValid) {
                return {
                    ...user,
                    password: undefined
                }
            }
        }

        throw new UnauthorizedError('Email address or password is incorrect.')
    }
}
