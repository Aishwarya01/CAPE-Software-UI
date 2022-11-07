import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChangeContact } from '../model/change-contact';
import { Register } from '../model/register';
import { UpdatePasswordInspector } from '../model/update-password-inspector';

@Injectable({
  providedIn: 'root'
})
export class InspectorregisterService {
  apiUrl = environment.apiUrl_v2;
  constructor ( private http: HttpClient) { }
  
  public  registerInspector (register: Register): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/addRegistration', register, { responseType: 'text' as 'json' })
  }

  public  registerViewer (register: Register): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/addViewerRegistration', register, { responseType: 'text' as 'json' })
  }
  
  public  updateRegister (register: Register): Observable<any> {
    return this.http.put<any>(this.apiUrl+'/updateRegistration' +'/'+ true, register, { responseType: 'text' as 'json' })
  }

  public  updateLicense (register: Register): Observable<any> {
    return this.http.put<any>(this.apiUrl+'/updateLicence' +'/'+ register.username +'/'+ register.noOfLicence, { responseType: 'text' as 'json' })
  }

  public  updateInspector (register: Register): Observable<any> {
    return this.http.put<any>(this.apiUrl+'/updatePermission', register,  { responseType: 'text' as 'json' })
  }

  public  createPasswordInspector (updatePassInspector: UpdatePasswordInspector): Observable<any> {
    return this.http.put<any>(this.apiUrl+'/createPassword', updatePassInspector,  { responseType: 'text' as 'json' })
  }

  public  resendOTPInspector (email:any,mobilenumber: any): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/sendOtp'+'/'+email+ '/' +mobilenumber,  { responseType: 'text' as 'json' })
  }

  public  sendOTPInspector (email: any,mobilenumber: any): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/sendOtp'+'/'+email+ '/' +mobilenumber,  { responseType: 'text' as 'json' })
  }

  public  sendOtpContactNumber (email: any,mobilenumber: any): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/newOtpGeneration'+ '/' +mobilenumber,  { responseType: 'text' as 'json' })
  }

  public  createContactNo (changeContact: ChangeContact): Observable<any> {
    return this.http.put<any>(this.apiUrl+'/saveContactNumber', changeContact,  { responseType: 'text' as 'json' })
  }

  public  retrieveInspector (userName: any): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/retrieveRegistration'+'/'+userName,  { responseType: 'text' as 'json' })
  }

  public  retrieveRegisterName (userName: any): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/retrieveUserNameFromRegister'+'/'+userName,  { responseType: 'text' as 'json' })
  }

// License viwer registration

  public  registerLicense (register: Register): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/addViewerRegistrationLicense', register, { responseType: 'text' as 'json' })
  }
}
