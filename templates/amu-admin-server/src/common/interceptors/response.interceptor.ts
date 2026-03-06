import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { map, type Observable } from 'rxjs'

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((data) => ({
        code: 0,
        message: 'ok',
        data,
        timestamp: new Date().toISOString()
      }))
    )
  }
}
