import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Register } from '../model/register';
import { UpdatePasswordInspector } from '../model/update-password-inspector';

@Injectable({
  providedIn: 'root'
})
export class InspectorregisterService {
  apiUrl = environment.apiUrl_v2;
  constructor ( private http: HttpClient) { }
  
  public  registerInspector (register: Register): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/addRegistration', register)
  }

  public  updateInspector (register: Register): Observable<any> {
    return this.http.put<any>(this.apiUrl+'/updatePermission', register,  { responseType: 'text' as 'json' })
  }

  public  createPasswordInspector (updatePassInspector: UpdatePasswordInspector): Observable<any> {
    return this.http.put<any>(this.apiUrl+'/createPassword', updatePassInspector,  { responseType: 'text' as 'json' })
  }

  public  resendOTPInspector (mobilenumber: any): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/resendOtp'+'/'+mobilenumber,  { responseType: 'text' as 'json' })
  }

  public  retrieveInspector (userName: any): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/retrieveRegistration'+'/'+userName,  { responseType: 'text' as 'json' })
  }
}
