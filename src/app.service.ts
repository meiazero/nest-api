import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
    getInfos(): any {
        return {
            message:
                'To see more infos, show the repo https:github.com/meiazero/procuraqui-api'
        }
    }

    getHello(): any {
        return {
            message: 'Hello World!'
        }
    }
}
