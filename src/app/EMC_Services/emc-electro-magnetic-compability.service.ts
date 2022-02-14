import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmcElectromagneticCompatibility } from '../EMC_Model/emc-electromagnetic-compatibility';

@Injectable({
  providedIn: 'root'
})
export class EmcElectroMagneticCompabilityService {

  apiUrl_EMC = environment.apiUrl_EMC;
  constructor(private http: HttpClient) { }

  public addElectromagneticCompatability(emcElectromagneticCompatibility: EmcElectromagneticCompatibility): Observable<any> {
    return this.http.post<any>(this.apiUrl_EMC + '/saveElectromagneticCompatability', emcElectromagneticCompatibility, { responseType: 'text' as 'json' })
  }
  public retrieveElectromagneticCompatability(userName:any, emcId:any): Observable<any> {
    return this.http.get<any>(this.apiUrl_EMC + '/retrieveElectromagneticCompatability'+'/'+userName+ '/' +emcId, { responseType: 'text' as 'json' })
  }

  public updateElectromagneticCompatability(emcElectromagneticCompatibility: EmcElectromagneticCompatibility): Observable<any> {
    return this.http.put<any>(this.apiUrl_EMC + '/updateElectromagneticCompatability', emcElectromagneticCompatibility, { responseType: 'text' as 'json' })
  }
}
