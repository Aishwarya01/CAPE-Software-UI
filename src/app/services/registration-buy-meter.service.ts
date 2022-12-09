import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegistrationBuyMeter } from '../model/registration-buy-meter';

@Injectable({
  providedIn: 'root'
})
export class RegistrationBuyMeterService {

  apiurl=environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  addRegistration(register:RegistrationBuyMeter):Observable<any>{
    return this.http.post<any>(this.apiurl+'/addRegistration',register,{responseType: 'text' as 'json'})
  }

  retriveRegistration(username:any):Observable<any>{
    return this.http.get<any>(this.apiurl+'/retrieveRegistration'+'/'+username,{responseType: 'text' as 'json'}) 
  }

  authenticate(register:RegistrationBuyMeter){
    return this.http.post<any>(this.apiurl+'/authenticate',register,{responseType: 'text' as 'json'}) 
     }
  
     sendOtp(contactNumber:string):Observable<any>{
      return this.http.get<any>(this.apiurl+'/sendSMS'+'/'+contactNumber,{ responseType:'text' as 'json'})
    }

  verifyOtp(register:RegistrationBuyMeter):Observable<any>{
   return this.http.put<any>(this.apiurl+'/verifyOTP' ,register, { responseType: 'text' as 'json' })
  }  


}
