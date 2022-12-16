import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProtectiveEarthConductorServicesService {

  apiUrl5 = environment.apiUrl_EMC_LV;

  constructor(private http: HttpClient) { }

  public addPEC(ProtectiveEarthConductor: any): Observable<any> {
    return this.http.post<any>(this.apiUrl5 + '/diagram/savePEC', ProtectiveEarthConductor, { responseType: 'text' as 'json' })
  }

  public retrievePEC(fileName: any,nodeId: any): Observable<any> {
    return this.http.get<any>(this.apiUrl5 + '/diagram/retrievePEC'+'/'+fileName+'/'+nodeId, { responseType: 'text' as 'json' })
  }

  public updatePEC(ProtectiveEarthConductor: any): Observable<any> {
    return this.http.put<any>(this.apiUrl5 + '/diagram/updatePEC', ProtectiveEarthConductor, { responseType: 'text' as 'json' })
  }
}
