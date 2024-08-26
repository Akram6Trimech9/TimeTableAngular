import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthStoreService } from '../services/authStore.service';
 
@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private authService: AuthStoreService) {}  

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
     const token = this.authService.getAccessToken();   
     let modifiedRequest = request;
    if (token) {
      modifiedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
         },
      });
    }

    return next.handle(modifiedRequest);
  }
}
