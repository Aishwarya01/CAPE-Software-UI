import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Register } from '../model/register';

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
    return this.http.put<any>(this.apiUrl+'/updatePermission', register)
  }
}
