import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Observation } from '../model/observation';

@Injectable({
  providedIn: 'root'
})
export class ObservationService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public addObservation(observation: Observation): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/saveObservation', observation, { responseType: 'text' as 'json' })
  }

  public updateObservation(observation: Observation): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/updateObservation', observation, { responseType: 'text' as 'json' })
  }

  public retrieveObservation(siteId: any, userName: any): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/retrieveObservation' + '/' + userName + '/' + siteId, { responseType: 'text' as 'json' })
  }

}
