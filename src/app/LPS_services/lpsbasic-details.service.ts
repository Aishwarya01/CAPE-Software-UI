import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BasicDetails } from '../LPS_model/basic-details';

@Injectable({
  providedIn: 'root'
})
export class LPSBasicDetailsService {

  apiUrl = environment.apiUrl_LPS;
  apiUrl1 = environment.apiUrl
  constructor(private http: HttpClient) { }

  public saveLPSBasicDetails(basicDetails:BasicDetails): Observable<any> {
    return this.http.post<BasicDetails>(this.apiUrl + '/addBasicLps', basicDetails, { responseType: 'text' as 'json' })
  }

  public updateLpsBasicDetails(basicDetails: BasicDetails): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/updateBasicLps', basicDetails, { responseType: 'text' as 'json' })
  }

  public updateLpsBasicDetailsStatus(basicLpsId: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/updateStatus' + '/' + basicLpsId, { responseType: 'text' as 'json' })
  }

  public retrieveListOfBasicLps(userName: any): Observable<any> { 
    return this.http.get<BasicDetails>(this.apiUrl + '/retrieveListOfBasicLps' + '/' + userName , { responseType: 'text' as 'json' })
  }

  public retrieveAllBasicLps(): Observable<any> { 
    return this.http.get<BasicDetails>(this.apiUrl + '/retrieveAllBasicLps' , { responseType: 'text' as 'json' })
  }
  
  public retrieveFinalLps(userName: String,basicLpsId: any): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/retrieveLpsReport' + '/' +userName+ '/' +basicLpsId, { responseType: 'text' as 'json' })
  } 

  public retriveLpsbasicDetails(userName: String,basicLpsId: any): Observable<any>{
    return this.http.get<any>(this.apiUrl + '/retrieveBasicLps' + '/' +userName+ '/' +basicLpsId, { responseType: 'text' as 'json' })
  }
}
