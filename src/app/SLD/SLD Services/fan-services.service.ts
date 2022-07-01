import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FanServicesService {

  apiUrl5 = environment.apiUrl_Diagram;

  constructor(private http: HttpClient) { }

  //Fan

  public addFan(Fan: any): Observable<any> {
    return this.http.post<any>(this.apiUrl5 + '/saveFan', Fan, { responseType: 'text' as 'json' })
  }

  public retriveFan(fileName: any,nodeId: any): Observable<any> {
    return this.http.get<any>(this.apiUrl5 + '/retrieveFan'+'/'+fileName+'/'+nodeId, { responseType: 'text' as 'json' })
  }

  public updateFan(Fan: any): Observable<any> {
    return this.http.put<any>(this.apiUrl5 + '/updateFan', Fan, { responseType: 'text' as 'json' })
  }
}
