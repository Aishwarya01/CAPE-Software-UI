import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdateLicenceService {
  //  apiUrl = 'http://localhost:8001/razorpayapp/createPayment';
  //  apiUrl = 'http://localhost:5000/api/v2';
  apiUrl =  environment.apiUrl_EMC_LV;

  constructor(private http: HttpClient) { }

  public createPayment(customer: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/applicationPayment', customer, { responseType: 'text' as 'json' })
  }

  public updatePaymentStatus(paymentMessage: any, orderId: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/updateAppPayStatus' + '/' + paymentMessage + '/' + orderId , { responseType: 'text' as 'json' })
  }
}