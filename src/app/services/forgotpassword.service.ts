import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

const httpoption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json', 
  })
};

@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordService {
  apiUrl = environment.apiUrl;
 
  constructor ( private http: HttpClient) {

  } 

  public forgotPassword(email: String): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/forgotPassword'+'/'+email, { responseType: 'text' as 'json' })
  }

  public updatePassword(email: String, password: String): Observable<any> {
    return this.http.put<any>(this.apiUrl+'/updatePassword',  { email, password }, httpoption)
  }
}
