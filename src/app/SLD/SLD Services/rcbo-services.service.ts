import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RCBOServicesService {
  apiUrl5 = environment.apiUrl_Diagram;

  constructor(private http: HttpClient) { }

  //RCBO or MCB with RCD

  public addRCBO(RCBO: any): Observable<any> {
    return this.http.post<any>(this.apiUrl5 + '/saveRCBO', RCBO, { responseType: 'text' as 'json' })
  }

  public retriveRCBO(fileName: any,nodeId: any): Observable<any> {
    return this.http.get<any>(this.apiUrl5 + '/retrieveRCBO'+'/'+fileName+'/'+nodeId, { responseType: 'text' as 'json' })
  }

  public updateRCBO(RCBO: any): Observable<any> {
    return this.http.put<any>(this.apiUrl5 + '/updateRCBO', RCBO, { responseType: 'text' as 'json' })
  }
}
