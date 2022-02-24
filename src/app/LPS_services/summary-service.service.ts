import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SummaryServiceService {
  apiUrl = environment.apiUrl_LPS;
  constructor(private http: HttpClient) { }

  public retrieveObservationSummaryLps(basicLpsId:any): Observable<any> { 
    return this.http.get<any>(this.apiUrl + '/retrieveObservationsInSummary' + '/' + basicLpsId,{ responseType: 'text' as 'json' })
  }

}
