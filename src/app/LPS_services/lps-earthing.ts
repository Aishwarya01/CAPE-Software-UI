import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { earthingReport } from '../LPS_model/earthingReport';

@Injectable({
    providedIn: 'root'
  })

export class LpsEarthing {

    apiUrl = environment.apiUrl_LPS;
    constructor(private http: HttpClient) { }

    public saveEarthingDetails(earthingReport: earthingReport): Observable<any> {
        return this.http.post<earthingReport>(this.apiUrl + '/addEarthingLps', earthingReport, { responseType: 'text' as 'json' })
    }

    public retrieveEarthingLps(userName: String, basicLpsId: number): Observable<any> {
        return this.http.get<earthingReport>(this.apiUrl + '/retrieveEarthingLps' + '/' + userName + '/' + basicLpsId, { responseType: 'text' as 'json' })  
    }

    public updateEarthingLps(earthingReport: earthingReport): Observable<any> {
        return this.http.put<earthingReport>(this.apiUrl + '/updateEarthingLps', earthingReport, { responseType: 'text' as 'json' })  
    }
    
    
    
}
