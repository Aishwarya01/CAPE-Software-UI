import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EarthingLpsDescription } from '../LPS_model/earthing';

@Injectable({
    providedIn: 'root'
  })

export class LpsEarthing {

    apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    public saveEarthingDetails(earthingLpsDescription: EarthingLpsDescription): Observable<any> {
        return this.http.post<EarthingLpsDescription>(this.apiUrl + '/addEarthingLps', earthingLpsDescription, { responseType: 'text' as 'json' })
    }

    public retrieveEarthingLps(userName: String, basicLpsId: number): Observable<any> {
        return this.http.get<EarthingLpsDescription>(this.apiUrl + '/retrieveEarthingLps' + '/' + userName + '/' + basicLpsId, { responseType: 'text' as 'json' })  
    }

    public updateEarthingLps(earthingLpsDescription: EarthingLpsDescription): Observable<any> {
        return this.http.put<EarthingLpsDescription>(this.apiUrl + '/updateEarthingLps', earthingLpsDescription, { responseType: 'text' as 'json' })  
    }
    
    
    
}
