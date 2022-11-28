import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MCBServicesService {
  apiUrl5 = environment.apiUrl_Diagram;


  constructor(private http: HttpClient) { }

  //MCB
  public addMCB(MCB: any): Observable<any> {
    return this.http.post<any>(this.apiUrl5 + '/saveMCB', MCB, { responseType: 'text' as 'json' })
  }

  public retriveMCB(fileName: any,nodeId: any): Observable<any> {
    return this.http.get<any>(this.apiUrl5 + '/retrieveMCB'+'/'+fileName+'/'+nodeId, { responseType: 'text' as 'json' })
  }

  public updateMCB(MCB: any): Observable<any> {
    return this.http.put<any>(this.apiUrl5 + '/updateMCB', MCB, { responseType: 'text' as 'json' })
  }
}
