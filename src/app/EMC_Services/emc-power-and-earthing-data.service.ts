import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmcPowerAndEarthingData } from '../EMC_Model/emc-power-and-earthing-data';

@Injectable({
  providedIn: 'root'
})
export class EmcPowerAndEarthingDataService {

  apiUrl_EMC = environment.apiUrl_EMC;
  constructor(private http: HttpClient) { }

  public savePowerEarthingData(emcPowerAndEarthingData: EmcPowerAndEarthingData): Observable<any> {
    return this.http.post<any>(this.apiUrl_EMC + '/savePowerEarthingData', emcPowerAndEarthingData, { responseType: 'text' as 'json' })
  }
  public retrievePowerEarthingData(userName:any, emcId:any): Observable<any> {
    return this.http.get<any>(this.apiUrl_EMC + '/retrievePowerEarthingData'+'/'+userName+ '/' +emcId, { responseType: 'text' as 'json' })
  }
  public updatePowerEarthingData(emcPowerAndEarthingData: EmcPowerAndEarthingData): Observable<any> {
    return this.http.put<any>(this.apiUrl_EMC + '/updatePowerEarthingData', emcPowerAndEarthingData, { responseType: 'text' as 'json' })
  }
}
