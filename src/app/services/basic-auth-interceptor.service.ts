import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { LoginserviceService } from './loginservice.service';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, debounce, debounceTime, filter, switchMap, take } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { LoginResponse } from './LoginResponse';
import { GlobalsService } from '../globals.service';

@Injectable({
  providedIn: 'root'
})

export class BasicAuthHtppInterceptorService implements HttpInterceptor {

  constructor(private loginService: LoginserviceService,private globalService:GlobalsService) { }

  isTokenRefreshing = false;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.loginService.isUserLoggedIn() && req.url.indexOf('authentication') === -1
        && req.url.indexOf('refreshToken') === -1) {
            const jwtToken = this.loginService.token;

            if(jwtToken){
                return next.handle(this.addToken(req, jwtToken)).pipe(catchError(error => {
                    if(error instanceof HttpErrorResponse && error.status===401){
                        return this.handleAuthErrors(req, next);
                    } else{
                        const errorMessage=this.globalErrorHandler(error);
                        console.log(errorMessage);
                        this.globalService.globalErrorMsg=errorMessage;
                        return throwError(error.errorMessage);
                    }
                }));
            }
            return next.handle(req).pipe(
                catchError((error:HttpErrorResponse)=>
                {
                    const errorMessage=this.globalErrorHandler(error);
                    this.globalService.globalErrorMsg=errorMessage;
                    return throwError(()=>new Error (error.error));
                }
            ));
            } 
            else {
                return next.handle(req).pipe(
                    catchError((error:HttpErrorResponse)=>
                    {
                        const errorMessage=this.globalErrorHandler(error);
                        this.globalService.globalErrorMsg=errorMessage;
                        return throwError(()=>new Error (error.error));
                    }
                ));
        }
    }

    private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler){
        if (!this.isTokenRefreshing) {
            this.isTokenRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.loginService.refreshTokenF().pipe(
                switchMap((refreshTokenResponse: LoginResponse) => {
                    this.isTokenRefreshing = false;
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
                switchMap((jwtToken) => {
                    return next.handle(this.addToken(req,
                        jwtToken))
                })
            );
        }
    }

    addToken(req: HttpRequest<any>, jwtToken: any) {
        return req.clone({
            headers: new HttpHeaders({
                'Authorization': `Bearer ${jwtToken}`
            })
        });
    }

    // Global Error handling
    globalErrorHandler(error:HttpErrorResponse):string{
        let errorMessage="";
    
        if(error.error instanceof ErrorEvent){
        // client side error
            errorMessage=error.error.message;
        }
        else if(error.status==404){
            errorMessage="Something went wrong, Please try again later";
        }
        else if(error.status==500){
            errorMessage="Internal Server Error, Please try again later";
        }
        else if(error.status==401){
            errorMessage="Unauthorized";
        }
        else if(error.status==406){
            errorMessage=JSON.parse(error.error).message;
        }
        else{
        // server side error
            if(error.status!=0){
                errorMessage=JSON.parse(error.error).message;
            }
        }
        return errorMessage; 
    }
 
}
