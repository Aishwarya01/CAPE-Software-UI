import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateLicenceService {
 //  apiUrl = 'http://localhost:8001/razorpayapp/createPayment';
 apiUrl = 'http://localhost:5000/api/v2';

 constructor(private http: HttpClient) { }

 public createPayment(customer:any): Observable<any> {
   return this.http.post<any>(this.apiUrl+'/createPayment', customer, { responseType: 'text' as 'json' })
 }

  public updatePaymentDetails(paymentDetails:any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/verifyPayment' ,paymentDetails, { responseType: 'text' as 'json' })
  }
}