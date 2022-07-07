import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CableConnectorServicesService {

  apiUrl5 = environment.apiUrl_Diagram;

  constructor(private http: HttpClient) { }

  //CableConnector

  public addCableConnector(CableConnector: any): Observable<any> {
    return this.http.post<any>(this.apiUrl5 + '/saveCableConnector', CableConnector, { responseType: 'text' as 'json' })
  }

  public retrieveCableConnector(fileName: any,nodeId: any): Observable<any> {
    return this.http.get<any>(this.apiUrl5 + '/retrieveCableConnector'+'/'+fileName+'/'+nodeId, { responseType: 'text' as 'json' })
  }

  public updateCableConnector(CableConnector: any): Observable<any> {
    return this.http.put<any>(this.apiUrl5 + '/updateCableConnector', CableConnector, { responseType: 'text' as 'json' })
  }
}
