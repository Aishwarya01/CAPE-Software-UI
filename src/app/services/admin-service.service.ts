import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Admin } from '../model/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  apiUrl = environment.apiUrl_EMC_LV;

  constructor(private http: HttpClient) {

  }

  public addAdmin(admin: Admin): Observable<any>{
    return this.http.post<any>(this.apiUrl + '/registerAdmin', admin )
  }

  public updateAdmin(admin: Admin): Observable<any>{
    return this.http.put<any>(this.apiUrl + '/updateAdminDetails', admin, { responseType: 'text' as 'json' })
  }

  public retrieveAdmin(): Observable<any>{
    return this.http.get<Admin>(this.apiUrl+'/retrieveAdminInformation/{email}')
  }

  public deleteAdmin(id: number): Observable<any>{
    return this.http.delete(this.apiUrl+ '/deleteAdmin/{adminId}')
  }

  public retrieveAllInspector(): Observable<any>{
    return this.http.get<Admin>(this.apiUrl+'/retrieveAllRegistration')
  }
}
