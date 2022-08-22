import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProtectiveEarthConductorServicesService {

  apiUrl5 = environment.apiUrl_Diagram;

  constructor(private http: HttpClient) { }

  public addEquipBondConn(EquipBondConn: any): Observable<any> {
    return this.http.post<any>(this.apiUrl5 + '/saveEquipBondConn', EquipBondConn, { responseType: 'text' as 'json' })
  }

  public retrieveEquipBondConn(fileName: any,nodeId: any): Observable<any> {
    return this.http.get<any>(this.apiUrl5 + '/retrieveEquipBondConn'+'/'+fileName+'/'+nodeId, { responseType: 'text' as 'json' })
  }

  public updateEquipBondConn(EquipBondConn: any): Observable<any> {
    return this.http.put<any>(this.apiUrl5 + '/updateEquipBondConn', EquipBondConn, { responseType: 'text' as 'json' })
  }
}
