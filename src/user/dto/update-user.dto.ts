import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'
import { IsEmail, IsString, Matches, MinLength } from 'class-validator'

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    name: string

    @IsEmail()
    email: string

    @IsString()
    @MinLength(5)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak'
    })
    password: string
}
