import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ObservationService {
  apiUrl = environment.apiUrl_EMC_LV;
  constructor(private http: HttpClient) { }

  public addObservation(observation: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/lv/saveObservation', observation, { responseType: 'text' as 'json' })
  }

  public updateObservation(observation: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/lv/updateObservation', observation, { responseType: 'text' as 'json' })
  }

  public retrieveObservationSummary(siteId: any, userName: any): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/lv/retrieveObservationsInSummary' + '/' + userName + '/' + siteId, { responseType: 'text' as 'json' })
  }
  public retrieveObservation(siteId: any, observationComponent:any, userName: any): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/lv/retrieveObservation' + '/' + userName + '/' + siteId + '/' + observationComponent, { responseType: 'text' as 'json' })
  }
}
