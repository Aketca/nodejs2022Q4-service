import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
  ForbiddenException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoggingService } from './logging.service';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly loggingService: LoggingService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const request = http.getRequest();
    const response = http.getResponse();
    const { url, params, body, method } = request;
    const { statusCode } = response;
    return next.handle().pipe(
      tap((data) => {
        if (data === undefined) throw new NotFoundException();
        if (data === 403) throw new ForbiddenException();
        if (data === 422) throw new UnprocessableEntityException();
        this.loggingService.writeRequestLog({
          url,
          params,
          body,
          method,
          statusCode,
        });
      }),
    );
  }
}
