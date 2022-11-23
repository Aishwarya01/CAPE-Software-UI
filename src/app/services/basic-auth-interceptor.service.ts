import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { LoginserviceService } from './loginservice.service';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, debounce, debounceTime, filter, switchMap, take } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { LoginResponse } from './LoginResponse';

@Injectable({
  providedIn: 'root'
})

export class BasicAuthHtppInterceptorService implements HttpInterceptor {

  constructor(private loginService: LoginserviceService) { }

  isTokenRefreshing = false;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    if (this.loginService.isUserLoggedIn() && req.url.indexOf('authentication') === -1
      && req.url.indexOf('refreshToken') === -1) {
        const jwtToken = this.loginService.token;

        if(jwtToken){
            return next.handle(this.addToken(req, jwtToken)).pipe(catchError(error => {
                if(error instanceof HttpErrorResponse && error.status===401){
                    return this.handleAuthErrors(req, next);
                } else{
                    return throwError(error);
                }
            }));
        }
        
        return next.handle(req);
    } else {
        return next.handle(req);
    }

}

private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>{
    if (!this.isTokenRefreshing) {
        this.isTokenRefreshing = true;
        this.refreshTokenSubject.next(null);

        return this.loginService.refreshTokenF().pipe(
            debounceTime(500),
            switchMap((refreshTokenResponse: LoginResponse) => {
                this.isTokenRefreshing = false;
                this.loginService.token = refreshTokenResponse.token;
                this.refreshTokenSubject
                    .next(refreshTokenResponse.token);
                return next.handle(this.addToken(req,
                    refreshTokenResponse.token));
            })
        )
    } else {
        return this.refreshTokenSubject.pipe(
            filter(result => result !== null),
            take(1),
            switchMap((res) => {
                return next.handle(this.addToken(req,
                    this.loginService.token))
            })
        );
    }
 }

  addToken(req: HttpRequest<any>, jwtToken: any) {
    return req.clone({
        headers: req.headers.set('Authorization',
            'Bearer ' + jwtToken)
    });
}

 
}
