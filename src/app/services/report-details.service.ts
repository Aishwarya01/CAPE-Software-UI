import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reportdetails } from '../model/reportdetails';

@Injectable({
  providedIn: 'root'
})
export class ReportDetailsService {

  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public addReportDetails(reportDetails: Reportdetails): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/reportDetailsService', reportDetails, { responseType: 'text' as 'json' })
  }

}
