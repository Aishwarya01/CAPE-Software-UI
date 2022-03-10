import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LpsSummary } from 'src/app/LPS_model/lps-summary';

@Injectable({
  providedIn: 'root'
})
export class SummaryServiceService {
  apiUrl = environment.apiUrl_LPS;
  constructor(private http: HttpClient) { }

  public addSummaryLps(lpsSummary: LpsSummary): Observable<any> {
    return this.http.post<LpsSummary>(this.apiUrl + '/addSummaryLps', lpsSummary, { responseType: 'text' as 'json' })
  }

  public retrieveObservationSummaryLps(basicLpsId:any): Observable<any> { 
    return this.http.get<any>(this.apiUrl + '/retrieveObservationsInSummary' + '/' + basicLpsId,{ responseType: 'text' as 'json' })
  }

}
