import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { downConductorReport } from '../LPS_model/downConductorReport';

@Injectable({
    providedIn: 'root'
})

export class LpsDownconductorService {

    apiUrl = environment.apiUrl_LPS_RISK;
    constructor(private http: HttpClient) { }


    public saveDownConductors(downConductorDescription: downConductorReport): Observable<any> {
        return this.http.post<downConductorReport>(this.apiUrl + '/lps/addDownConductor', downConductorDescription, { responseType: 'text' as 'json' })
    }

    public retrieveDownConductor(userName: String, basicLpsId: number): Observable<any> {
        return this.http.get<downConductorReport>(this.apiUrl + '/lps/retrieveDownConductor' + '/' + userName + '/' + basicLpsId, { responseType: 'text' as 'json' })
    }

    public updateDownConductor(downConductorDescription: downConductorReport): Observable<any> {
        return this.http.put<downConductorReport>(this.apiUrl + '/lps/updateDownConductor', downConductorDescription, { responseType: 'text' as 'json' })
    }

}
