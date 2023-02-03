import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ACBServicesService {

  apiUrl5 = environment.apiUrl_EMC_LV;

  constructor(private http: HttpClient) { }

  //ACB

  public addACB(ACB: any): Observable<any> {
    return this.http.post<any>(this.apiUrl5 + '/diagram/saveACB', ACB, { responseType: 'text' as 'json' })
  }

  public retrieveACB(fileName: any,nodeId: any): Observable<any> {
    return this.http.get<any>(this.apiUrl5 + '/diagram/retrieveACB'+'/'+fileName+'/'+nodeId, { responseType: 'text' as 'json' })
  }

  public updateACB(ACB: any): Observable<any> {
    return this.http.put<any>(this.apiUrl5 + '/diagram/updateACB', ACB, { responseType: 'text' as 'json' })
  }
}
