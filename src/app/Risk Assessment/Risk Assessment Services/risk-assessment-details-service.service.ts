import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RiskAssessmentDetailsServiceService {
  apiUrl = environment.apiUrl_RISK;

  constructor(private http: HttpClient) { }

  public fetchLocation(): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/fetchGroundLocations', { responseType: 'text' as 'json' })
  }
}
