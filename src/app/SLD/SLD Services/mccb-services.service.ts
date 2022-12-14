import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MCCBServicesService {

  apiUrl5 = environment.apiUrl_EMC_LV;


  constructor(private http: HttpClient) { }

  //MCCB
  public addMCCB(MCCB: any): Observable<any> {
    return this.http.post<any>(this.apiUrl5 + '/diagram/saveMCCB', MCCB, { responseType: 'text' as 'json' })
  }
  public retriveMCCB(fileName: any,nodeId: any): Observable<any> {
    return this.http.get<any>(this.apiUrl5 + '/diagram/retrieveMCCB'+'/'+fileName+'/'+nodeId, { responseType: 'text' as 'json' })
  }
  public updateMCCB(MCCB: any): Observable<any> {
    return this.http.put<any>(this.apiUrl5 + '/diagram/updateMCCB', MCCB, { responseType: 'text' as 'json' })
  }}
