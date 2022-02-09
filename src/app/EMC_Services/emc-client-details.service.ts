import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmcClientDetails } from '../EMC_Model/emc-client-details';

@Injectable({
  providedIn: 'root'
})
export class EmcClientDetailsService {
  
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }


  public addClientDetailsData(emcClientDetails: EmcClientDetails): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/saveClientDetails', emcClientDetails, { responseType: 'text' as 'json' })
  }
  public retrieveClientDetailsData(userName:any, emcId:any): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/retrieveClientDetails'+'/'+userName+ '/' +emcId, { responseType: 'text' as 'json' })
  }
  public upDateClientDetailsData(emcClientDetails: EmcClientDetails): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/updateClientDetails', emcClientDetails, { responseType: 'text' as 'json' })
  }

  public retrieveCountry(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/fetchCountries', { responseType: 'text' as 'json' })
  }

  public retrieveState(countryName: String): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/fetchStatesByCountryCode' + '/' +countryName, { responseType: 'text' as 'json' })
  }

  // public retrieveStateV2(countryName: String): Observable<any> {
  //   return this.http.get<any>(this.apiUrl + '/fetchStatesByCountryCode' + '/' +countryName, { responseType: 'text' as 'json' })
  // }

}
