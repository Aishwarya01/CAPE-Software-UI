import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EarthCableConnectorService {
 
  apiUrl5 = environment.apiUrl_EMC_LV;

  constructor(private http: HttpClient) { }

  public addEarthConnectorData(earthCableConnectorModel: any): Observable<any> {
    return this.http.post<any>(this.apiUrl5 + '/diagram/addearthconnector', earthCableConnectorModel, { responseType: 'text' as 'json' })
  }

  public retrieveEarthConnectorData(fileName: any,earthCableConnectorId: any): Observable<any> {
    return this.http.get<any>(this.apiUrl5 + '/diagram/retrieveearthconnector'+'/'+fileName+'/'+earthCableConnectorId, { responseType: 'text' as 'json' })
  }

  public updateEarthConnectorData(earthCableConnectorModel: any): Observable<any> {
    return this.http.put<any>(this.apiUrl5 + '/diagram/updateearthconnector', earthCableConnectorModel, { responseType: 'text' as 'json' })
  }
  
}
