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
  apiUrl1 = environment.apiUrl
  constructor(private http: HttpClient) { }

  public fetchLocation(): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/fetchGroundLocations', { responseType: 'text' as 'json' })
  }

  public addCustomerDetails(riskAssessmentDetails:RiskAssessmentDetails): Observable<any> {
    return this.http.post<RiskAssessmentDetails>(this.apiUrl + '/saveRiskAssessmentDetails', riskAssessmentDetails, { responseType: 'text' as 'json' })
  }

  public updateCustomerDetails(riskAssessmentDetails: RiskAssessmentDetails): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/retrieveRiskAssessmentDetails', riskAssessmentDetails, { responseType: 'text' as 'json' })
  }

  public retriveCustomerDetails(userName: String): Observable<any>{
    return this.http.get<any>(this.apiUrl + '/updateRiskAssessmentDetails' + '/' +userName, { responseType: 'text' as 'json' })
  }
}
