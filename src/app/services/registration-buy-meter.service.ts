import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AddToCart } from '../model/add-to-cart';
import { RegistrationBuyMeter } from '../model/registration-buy-meter';

@Injectable({
  providedIn: 'root'
})
export class RegistrationBuyMeterService {

  apiurl = environment.apiUrl_Payment;
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
  public token: string = '';
  public refToken: string = '';
  public userName: string = '';

  constructor(private http: HttpClient) { }

  addRegistration(register: RegistrationBuyMeter): Observable<any> {
    return this.http.post<any>(this.apiurl + '/addRegistration', register, { responseType: 'text' as 'json' })
  }

  retriveRegistration(userName: any): Observable<any> {
    return this.http.get<any>(this.apiurl + '/retrieveRegistration' + '/' + userName, { responseType: 'text' as 'json' })
  }

  authenticate(registerAuthenticate: any) {
    return this.http.post<any>(this.apiurl + '/authenticate', registerAuthenticate, { responseType: 'text' as 'json' })
    .pipe(
      map(userData => {

        let userDataRetrive =JSON.parse(userData)
        sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, JSON.stringify(userDataRetrive.register));
       
        this.token = userDataRetrive.token
        this.refToken = userDataRetrive.refreshToken
        this.userName = userDataRetrive.register.username
        sessionStorage.setItem('token',this.token);
        sessionStorage.setItem('refreshToken',this.refToken);
        
        return userData;
      }));
  }
 

  sendOtp(contactNumber: string): Observable<any> {
    return this.http.get<any>(this.apiurl + '/sendSMS' + '/' + contactNumber, { responseType: 'text' as 'json' })
  }

  sendUsername(username: string): Observable<any> {
    return this.http.get<any>(this.apiurl + '/sendSMSUsername' + '/' + username, { responseType: 'text' as 'json' })
  }

  verifyOtp(register: RegistrationBuyMeter): Observable<any> {
    return this.http.put<any>(this.apiurl + '/verifyOTP', register, { responseType: 'text' as 'json' })
  }

  getUserDetails(userName:any) : Observable<any>{
    return this.http.get<any>(this.apiurl + '/retrieveRegistration' + '/' + userName, { responseType: 'text' as 'json' })

  }

  updateContactNumber(contactNumber : string) : Observable <any>{
    return this.http.get<any>(this.apiurl + '/updateMobileNumber' + '/' + contactNumber, { responseType: 'text' as 'json' })
  }

  checkout(addToCart : AddToCart) : Observable <any>{
    return this.http.put<any>(this.apiurl + '/createPayment', addToCart, { responseType: 'text' as 'json' })
  }

  updatePaymentStatus(status:string,orderId:string) : Observable <any>{
    return this.http.get<any>(this.apiurl + '/updatePaymentStatus'+'/'+status+'/'+orderId, { responseType: 'text' as 'json' })
  }

  retriveUpdatePaymentStatus(userName:string) : Observable <any>{
    return this.http.get<any>(this.apiurl + '/retrivePaymentStatus'+'/'+userName, { responseType: 'text' as 'json' })
  }

}
