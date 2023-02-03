import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomerDetails } from '../Risk Assesment Model/customer-details';

@Injectable({
  providedIn: 'root'
})
export class CustomerDetailsServiceService {

  apiUrl = environment.apiUrl_RISK;
  apiUrl1 = environment.apiUrl_LPS_RISK;
  constructor(private http: HttpClient) { }

  public addCustomerDetails(customerDetails:CustomerDetails): Observable<any> {
    return this.http.post<CustomerDetails>(this.apiUrl1 + '/risk/saveCustomerDetails', customerDetails, { responseType: 'text' as 'json' })
  }

  public updateCustomerDetails(customerDetails: CustomerDetails): Observable<any> {
    return this.http.put<any>(this.apiUrl1 + '/risk/updateCustomerDetails', customerDetails, { responseType: 'text' as 'json' })
  }

  public retriveCustomerDetails(userName: String,riskId:any): Observable<any>{
    return this.http.get<any>(this.apiUrl1 + '/risk/retrieveCustomerDetails' + '/' +userName + '/' +riskId, { responseType: 'text' as 'json' })
  }

  public retriveAllCustomerDetails(): Observable<any>{
    return this.http.get<any>(this.apiUrl1 + '/risk/retrieveAllCustomers', { responseType: 'text' as 'json' })
  }

  public retriveCustomerDetails1(userName: String,riskId:any): Observable<any>{
    return this.http.get<any>(this.apiUrl1 + '/risk/retrieveCustomerDetails' + '/' +userName + '/' +riskId, { responseType: 'text' as 'json' })
  }

  public retrieveFinalRisk(userName: String,riskId:any): Observable<any>{
    return this.http.get<any>(this.apiUrl1 + '/risk/retrieveRiskReport' + '/' +userName + '/' +riskId, { responseType: 'text' as 'json' })
  }

  public retrieveCustomerDetailsBasedOnUserName(userName:any): Observable<any>{
    return this.http.get<any>(this.apiUrl1 + '/risk/retrieveListOfCustomerDetails' + '/' + userName, { responseType: 'text' as 'json' })
  }
  // For allstepscompleted
  public updateAllStepsCompleted(riskId:any,userName: String): Observable<any> {
    return this.http.put<any>(this.apiUrl1 + '/risk/updateAllStepsCompleted' + '/' +riskId + '/' +userName, { responseType: 'text' as 'json' })
  }
  public deleteCustomerDetails(customerDetails: CustomerDetails): Observable<any> {
    return this.http.put<any>(this.apiUrl1 + '/risk/updateRiskAssessmentCustomerDetailsStatus', customerDetails, { responseType: 'text' as 'json' })
  }

  // Project Name Validation
  public findByProjectName(userName: String,projectName:any): Observable<any>{
    return this.http.get<any>(this.apiUrl1 + '/risk/findProjectAndUserName' + '/' +userName + '/' +projectName, { responseType: 'text' as 'json' })
  }
}