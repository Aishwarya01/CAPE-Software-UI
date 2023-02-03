import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';


const httpoption ={
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class RegisterserviceService {
  apiUrl = environment.apiUrl_EMC_LV;
  constructor ( private http: HttpClient) { }
  
  public  register (user :User): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/registerUser', user)
  }
}
