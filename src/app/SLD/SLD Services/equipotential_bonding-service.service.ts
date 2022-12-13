import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Equipotential_BondingServicesService {

  apiUrl5 = environment.apiUrl_EMC_LV;

  constructor(private http: HttpClient) { }

  //Equipotential_Bonding

  public addEquipotential_Bonding(Equipotential_Bonding: any): Observable<any> {
    return this.http.post<any>(this.apiUrl5 + '/diagram/saveEquipotential_Bonding', Equipotential_Bonding, { responseType: 'text' as 'json' })
  }

  public retrieveEquipotential_Bonding(fileName: any,nodeId: any): Observable<any> {
    return this.http.get<any>(this.apiUrl5 + '/diagram/retrieveEquipotential_Bonding'+'/'+fileName+'/'+nodeId, { responseType: 'text' as 'json' })
  }

  public updateEquipotential_Bonding(Equipotential_Bonding: any): Observable<any> {
    return this.http.put<any>(this.apiUrl5 + '/diagram/updateEquipotential_Bonding', Equipotential_Bonding, { responseType: 'text' as 'json' })
  }
}
