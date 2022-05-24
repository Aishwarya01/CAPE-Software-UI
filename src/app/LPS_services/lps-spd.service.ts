import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { spdReport } from '../LPS_model/spdReport';

@Injectable({
    providedIn: 'root'
})

export class LpsSpd_Service {

    apiUrl = environment.apiUrl_LPS;
    constructor(private http: HttpClient) { }


    public saveSPDDetails(spdReport: spdReport): Observable<any> {
        return this.http.post<spdReport>(this.apiUrl + '/addSPDDetails', spdReport, { responseType: 'text' as 'json' })
    }

    public retrieveSPDDetails(userName: String, basicLpsId: number): Observable<any> {
        return this.http.get<spdReport>(this.apiUrl + '/retrieveSPD' + '/' + userName + '/' + basicLpsId, { responseType: 'text' as 'json' })
    }

    public updateSpdDetails(spdReport: spdReport): Observable<any> {
        return this.http.put<spdReport>(this.apiUrl + '/updateSpdDetails', spdReport, { responseType: 'text' as 'json' })
    }


}
