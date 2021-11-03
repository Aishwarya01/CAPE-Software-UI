import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Spd } from '../LPS_model/spd';

@Injectable({
    providedIn: 'root'
})

export class LpsSpd_Service {

    apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }


    public saveSPDDetails(spd: Spd): Observable<any> {
        return this.http.post<Spd>(this.apiUrl + '/addSPDDetails', spd, { responseType: 'text' as 'json' })
    }

    public retrieveSPDDetails(userName: String, basicLpsId: number): Observable<any> {
        return this.http.get<Spd>(this.apiUrl + '/retrieveSPD' + '/' + userName + '/' + basicLpsId, { responseType: 'text' as 'json' })
    }

    public updateSpdDetails(spd: Spd): Observable<any> {
        return this.http.put<Spd>(this.apiUrl + '/updateSpdDetails', spd, { responseType: 'text' as 'json' })
    }


}
