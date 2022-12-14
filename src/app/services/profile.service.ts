import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Register } from '../model/register';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  apiUrl = environment.apiUrl_EMC_LV;
  constructor ( private http: HttpClient) { }
  
  public  updateRegister (register: Register): Observable<any> {
    return this.http.put<any>(this.apiUrl+'/updateRegistration' +'/'+ false, register, { responseType: 'text' as 'json' })
  }

  public getUser (email: String): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/retrieveRegistration'+'/'+email,  { responseType: 'text' as 'json' })
  }
}
