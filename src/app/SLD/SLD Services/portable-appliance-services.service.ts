import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PortableApplianceServicesService {
  apiUrl5 = environment.apiUrl_Diagram;


  constructor(private http: HttpClient) { }

  //MCB
  public addPAT(PortableAppliance: any): Observable<any> {
    return this.http.post<any>(this.apiUrl5 + '/savePAT', PortableAppliance, { responseType: 'text' as 'json' })
  }

  public retrivePAT(fileName: any,nodeId: any): Observable<any> {
    return this.http.get<any>(this.apiUrl5 + '/retrievePAT'+'/'+fileName+'/'+nodeId, { responseType: 'text' as 'json' })
  }

  public updatePAT(PortableAppliance: any): Observable<any> {
    return this.http.put<any>(this.apiUrl5 + '/updatePAT', PortableAppliance, { responseType: 'text' as 'json' })
  }
}
