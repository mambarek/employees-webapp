import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // request is immutable so clone it
    const cloneRequest = request.clone({headers: request.headers.append('Authorization', 'Bearer ' + 1234567890)});

    // you can intercept the response too. you can use map to manipulate response
    return next.handle(cloneRequest);
  }
}
