import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LightServicesService {

  apiUrl5 = environment.apiUrl_EMC_LV;

  constructor(private http: HttpClient) { }

  //Light

  public addLight(Light: any): Observable<any> {
    return this.http.post<any>(this.apiUrl5 + '/diagram/saveLight', Light, { responseType: 'text' as 'json' })
  }

  public retriveLight(fileName: any,nodeId: any): Observable<any> {
    return this.http.get<any>(this.apiUrl5 + '/diagram/retrieveLight'+'/'+fileName+'/'+nodeId, { responseType: 'text' as 'json' })
  }

  public updateLight(Light: any): Observable<any> {
    return this.http.put<any>(this.apiUrl5 + '/diagram/updateLight', Light, { responseType: 'text' as 'json' })
  }
}
