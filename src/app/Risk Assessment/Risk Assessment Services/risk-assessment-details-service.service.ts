import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RiskAssessmentDetails } from '../Risk Assesment Model/risk-assessment-details';

@Injectable({
  providedIn: 'root'
})
export class RiskAssessmentDetailsServiceService {
  apiUrl = environment.apiUrl_RISK;
  apiUrl1 = environment.apiUrl_LPS_RISK;
  constructor(private http: HttpClient) { }

  public fetchLocation(): Observable<any> {
    return this.http.get<any>(this.apiUrl1+'/risk/fetchGroundLocations', { responseType: 'text' as 'json' })
  }

  public addRiskAssessmentDetails(riskAssessmentDetails:RiskAssessmentDetails): Observable<any> {
    return this.http.post<RiskAssessmentDetails>(this.apiUrl1 + '/risk/saveRiskAssessmentDetails', riskAssessmentDetails, { responseType: 'text' as 'json' })
  }

  public updateRiskAssessmentDetails(riskAssessmentDetails: RiskAssessmentDetails): Observable<any> {
    return this.http.put<any>(this.apiUrl1 + '/risk/updateRiskAssessmentDetails', riskAssessmentDetails, { responseType: 'text' as 'json' })
  }

  public retriveRiskAssessmentDetails(userName: String,riskId:any): Observable<any>{
    return this.http.get<any>(this.apiUrl1 + '/risk/retrieveRiskAssessmentDetails' + '/' +userName + '/' + riskId, { responseType: 'text' as 'json' })
  }
}
