import { User } from '../entities/user.entity'
import { IsEmail, IsString, Matches, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto extends User {
    @ApiProperty({
        example: 'John Doe'
    })
    @IsString()
    name: string

    @ApiProperty({
        example: 'email@email.com'
    })
    @IsEmail()
    email: string

    @ApiProperty({
        example: 'pass@Word'
    })
    @IsString()
    @MinLength(5)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak'
    })
    password: string
}
