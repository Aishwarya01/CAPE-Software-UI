import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmcClientDetails } from '../EMC_Model/emc-client-details';

@Injectable({
  providedIn: 'root'
})
export class EmcSavedReportService {
  
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public retrieveListOfClientDetails(userName: any): Observable<any> { 
    return this.http.get<EmcClientDetails>(this.apiUrl + '/retrieveListOfClientDetails' + '/' + userName , { responseType: 'text' as 'json' })
  }

  public retrieveFinalEmcReport(userName: String,emcId: any): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/retrieveEmcReport' + '/' +userName+ '/' +emcId, { responseType: 'text' as 'json' })
  } 
}