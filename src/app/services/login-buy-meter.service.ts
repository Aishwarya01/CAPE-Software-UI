import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginBuyMeterService {

  apiurl=environment.apiUrl;
  public token: string = '';
  public refToken: string = '';
  public userName: string = '';
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUserForMeter';


  constructor(private http: HttpClient) { }


  Signout(){
    let refreshToken = this.refToken;
    let username = this.userName;
    this.http.post<any>(this.apiurl + '/logout', { refreshToken,username },{ responseType: 'text' as 'json' })
    .subscribe(data => {
      console.log(data);
    }, error => {
      throwError(error);
    })
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.token = '';
    // localStorage.removeItem('rememberMe');
    localStorage.removeItem('username');
    sessionStorage.removeItem('tokenforMeter');
    sessionStorage.removeItem('refreshTokenforMeter');
    // sessionStorage.removeItem('expiresAt');
  }

}
