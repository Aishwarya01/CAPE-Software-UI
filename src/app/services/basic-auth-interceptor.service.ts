import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders, HttpEvent, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { LoginserviceService } from './loginservice.service';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BasicAuthHtppInterceptorService implements HttpInterceptor {

    apiUrl_v2 = environment.apiUrl_v2;
    static accessToken: String = '';
    refresh = false;
  constructor(private loginService: LoginserviceService, private http: HttpClient) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.loginService.isUserLoggedIn() && req.url.indexOf('authentication') === -1) {
        const authReq = req.clone({
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.loginService.token}`
            })
        });
        return next.handle(authReq).pipe(catchError((error: HttpErrorResponse) => {
            if(error.status===401 && !this.refresh){
                return this.http.get<any>(this.apiUrl_v2 + '/refreshToken').pipe(
                    switchMap((res: any) => {
                        BasicAuthHtppInterceptorService.accessToken = res.token;
                        return next.handle(req.clone({
                            setHeaders: {
                                'Authorization': `Bearer ${BasicAuthHtppInterceptorService.accessToken}`
                            }
                        }))
                    })
                )
            }
            this.refresh = false;
            return throwError(() => error)
        }));
    } else {
        return next.handle(req);
    }

}
}
