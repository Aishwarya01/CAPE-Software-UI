import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmcSavedReportService {
  
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public retrieveListOfEmc(userName:any, emcId:any): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/retrieveEmcReport'+'/'+userName+ '/' +emcId, { responseType: 'text' as 'json' })
  }
}