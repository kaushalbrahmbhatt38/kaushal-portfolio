import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, from, lastValueFrom } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { HttpService } from '../services/http/http.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private httpService: HttpService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Skip authentication for the token endpoint
    if (request.url.includes('oauth2/token')) {
      return next.handle(request);
    }

    // Skip authentication for non-Salesforce endpoints
    if (!request.url.includes('salesforce.com')) {
      return next.handle(request);
    }

    // Convert the Promise to Observable and use switchMap to handle the auth flow
    return from(this.httpService.getCurrentAuthData()).pipe(
      switchMap(authData => {
        if (authData && authData.access_token) {
          // Clone the request and add the authorization header
          const authReq = request.clone({
            url: `${authData.instance_url}${request.url}`,
            headers: request.headers.set('Authorization', `${authData.token_type} ${authData.access_token}`)
          });

          // Handle the modified request
          return next.handle(authReq).pipe(
            catchError((error: HttpErrorResponse) => {
              // Handle 401 Unauthorized errors
              if (error.status === 401) {
                // Token might be expired, clear the auth data
                this.httpService.logout();
              }
              return throwError(() => error);
            })
          );
        } else {
          // No auth data available, proceed with the original request
          return next.handle(request);
        }
      })
    );
  }
} 