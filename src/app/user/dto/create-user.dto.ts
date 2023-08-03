import { ApiProperty } from '@nestjs/swagger'
import { User } from '../entities/user.entity'
import { IsEmail, IsString, Matches, MinLength } from 'class-validator'

export class CreateUserDto extends User {
    /**
     * Use the email to connect to your account.
     * @example john@doe.com
     */
    @IsEmail()
    email: string

    /**
     * Use the password to protect your account.
     * @example Pas$w0rd
     */
    @IsString()
    @MinLength(5)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak'
    })
    password: string

    /**
     * The name will be used for anything (Profile, Home Page, etc) that needs to display information
     * of the connected person.
     * @example John Doe
     */
    @IsString()
    name: string
}
