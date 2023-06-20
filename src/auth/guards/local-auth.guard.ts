import {
    Injectable,
    ExecutionContext,
    UnauthorizedException
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context)
    }

    handleRequest(err, user): any {
        if (err || !user) {
            throw new UnauthorizedException(err?.message)
        }

        const { password, ...userWithoutPassword } = user

        return userWithoutPassword
    }
}
