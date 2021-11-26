import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  apiUrl = environment.apiUrl_v2;

  constructor(private http: HttpClient) {

  }

  public changePassword(email: String, oldPassword: String, password: String){
    return this.http.put<any>(this.apiUrl + '/changePassword', { email,oldPassword,password }, { responseType: 'text' as 'json' })
  }

}
