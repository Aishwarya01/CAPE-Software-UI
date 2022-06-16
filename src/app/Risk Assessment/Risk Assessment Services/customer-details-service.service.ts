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
  apiUrl1 = environment.apiUrl
  constructor(private http: HttpClient) { }

  public addCustomerDetails(customerDetails:CustomerDetails): Observable<any> {
    return this.http.post<CustomerDetails>(this.apiUrl + '/saveCustomerDetails', customerDetails, { responseType: 'text' as 'json' })
  }

  public updateCustomerDetails(customerDetails: CustomerDetails): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/updateCustomerDetails', customerDetails, { responseType: 'text' as 'json' })
  }

  public retriveCustomerDetails(userName: String,riskId:any): Observable<any>{
    return this.http.get<any>(this.apiUrl + '/retrieveCustomerDetails' + '/' +userName + '/' +riskId, { responseType: 'text' as 'json' })
  }

  public retriveAllCustomerDetails(): Observable<any>{
    return this.http.get<any>(this.apiUrl + '/retrieveAllCustomers', { responseType: 'text' as 'json' })
  }

  public retriveCustomerDetails1(userName: String,riskId:any): Observable<any>{
    return this.http.get<any>(this.apiUrl + '/retrieveCustomerDetails' + '/' +userName + '/' +riskId, { responseType: 'text' as 'json' })
  }

  public retrieveFinalRisk(userName: String,riskId:any): Observable<any>{
    return this.http.get<any>(this.apiUrl + '/retrieveRiskReport' + '/' +userName + '/' +riskId, { responseType: 'text' as 'json' })
  }

  public retrieveCustomerDetailsBasedOnUserName(userName:any): Observable<any>{
    return this.http.get<any>(this.apiUrl + '/retrieveListOfCustomerDetails' + '/' + userName, { responseType: 'text' as 'json' })
  }
}
