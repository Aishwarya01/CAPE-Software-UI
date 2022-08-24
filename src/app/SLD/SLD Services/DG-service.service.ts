import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DGServicesService {

  apiUrl5 = environment.apiUrl_Diagram;

  constructor(private http: HttpClient) { }

  //DG

  public addDieselGenerator(DieselGenerator: any): Observable<any> {
    return this.http.post<any>(this.apiUrl5 + '/saveDieselGenerator', DieselGenerator, { responseType: 'text' as 'json' })
  }

  public retrieveDieselGenerator(fileName: any,nodeId: any): Observable<any> {
    return this.http.get<any>(this.apiUrl5 + '/retrieveDieselGenerator'+'/'+fileName+'/'+nodeId, { responseType: 'text' as 'json' })
  }

  public updateDieselGenerator(DieselGenerator: any): Observable<any> {
    return this.http.put<any>(this.apiUrl5 + '/updateDieselGenerator', DieselGenerator, { responseType: 'text' as 'json' })
  }
}
