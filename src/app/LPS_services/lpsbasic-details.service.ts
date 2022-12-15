import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BasicDetails } from '../LPS_model/basic-details';

@Injectable({
  providedIn: 'root'
})
export class LPSBasicDetailsService {

  apiUrl = environment.apiUrl_LPS_RISK;
  //apiUrl1 = environment.apiUrl
  constructor(private http: HttpClient) { }

  public saveLPSBasicDetails(basicDetails:BasicDetails): Observable<any> {
    return this.http.post<BasicDetails>(this.apiUrl + '/lps/addBasicLps', basicDetails, { responseType: 'text' as 'json' })
  }

  public updateLpsBasicDetails(basicDetails: BasicDetails): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/lps/updateBasicLps', basicDetails, { responseType: 'text' as 'json' })
  }

  public updateLpsBasicDetailsStatus(basicDetails: BasicDetails): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/lps/updateBasicLpsStatus', basicDetails, { responseType: 'text' as 'json' })
  }

  public retrieveListOfBasicLps(userName: any): Observable<any> { 
    return this.http.get<BasicDetails>(this.apiUrl + '/lps/retrieveListOfBasicLps' + '/' + userName , { responseType: 'text' as 'json' })
  }

  public retrieveAllBasicLps(userName:any): Observable<any> { 
    return this.http.get<BasicDetails>(this.apiUrl + '/lps/retrieveAllBasicLps' + '/' + userName , { responseType: 'text' as 'json' })
  }
  
  public retrieveFinalLps(userName: String,basicLpsId: any): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/lps/retrieveLpsReport' + '/' +userName+ '/' +basicLpsId, { responseType: 'text' as 'json' })
  } 

  public retriveLpsbasicDetails(userName: String,basicLpsId: any): Observable<any>{
    return this.http.get<any>(this.apiUrl + '/lps/retrieveBasicLps' + '/' +userName+ '/' +basicLpsId, { responseType: 'text' as 'json' })
  }

  public retriveLpsbasicIsActive(userName: String): Observable<any>{
    return this.http.get<any>(this.apiUrl + '/lps/retrieveBasicLps' + '/' +userName, { responseType: 'text' as 'json' })
  }

  public validateProjectName(clientName: String,projectName: String): Observable<any>{
    return this.http.get<any>(this.apiUrl + '/lps/retrieveProjectName' + '/' +clientName+ '/' +projectName, { responseType: 'text' as 'json' })
  }

}
