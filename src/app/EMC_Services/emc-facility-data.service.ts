import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmcFacilityData } from '../EMC_Model/emc-facility-data';

@Injectable({
  providedIn: 'root'
})
export class EmcFacilityDataService {

  apiUrl_EMC = environment.apiUrl_EMC;
  constructor(private http: HttpClient) { }

  public addFacilityData(emcFacilityData: EmcFacilityData): Observable<any> {
    return this.http.post<any>(this.apiUrl_EMC + '/saveFacilityData', emcFacilityData, { responseType: 'text' as 'json' })
  }
  public retrieveFacilityData(userName:any, emcId:any): Observable<any> {
    return this.http.get<any>(this.apiUrl_EMC + '/retrieveFacilityData'+'/'+userName+ '/' +emcId, { responseType: 'text' as 'json' })
  }
  public upDateFacilityData(emcFacilityData: EmcFacilityData): Observable<any> {
    return this.http.put<any>(this.apiUrl_EMC + '/updateFacilityData', emcFacilityData, { responseType: 'text' as 'json' })
  }


}
