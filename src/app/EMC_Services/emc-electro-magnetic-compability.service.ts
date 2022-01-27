import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmcElectromagneticCompatibility } from '../EMC_Model/emc-electromagnetic-compatibility';

@Injectable({
  providedIn: 'root'
})
export class EmcElectroMagneticCompabilityService {

  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public addElectromagneticCompatability(emcElectromagneticCompatibility: EmcElectromagneticCompatibility): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/saveElectromagneticCompatability', emcElectromagneticCompatibility, { responseType: 'text' as 'json' })
  }
  public retrieveElectromagneticCompatability(userName:any, emcId:any): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/retrieveElectromagneticCompatability'+'/'+userName+ '/' +emcId, { responseType: 'text' as 'json' })
  }

  public updateElectromagneticCompatability(emcElectromagneticCompatibility: EmcElectromagneticCompatibility): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/updateElectromagneticCompatability', emcElectromagneticCompatibility, { responseType: 'text' as 'json' })
  }
}
