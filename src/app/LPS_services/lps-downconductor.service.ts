import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DownConductorDescription } from '../LPS_model/down-conductor';

@Injectable({
    providedIn: 'root'
})

export class LpsDownconductorService {

    apiUrl = environment.apiUrl_LPS;
    constructor(private http: HttpClient) { }


    public saveDownConductors(downConductorDescription: DownConductorDescription): Observable<any> {
        return this.http.post<DownConductorDescription>(this.apiUrl + '/addDownConductor', downConductorDescription, { responseType: 'text' as 'json' })
    }

    public retrieveDownConductor(userName: String, basicLpsId: number): Observable<any> {
        return this.http.get<DownConductorDescription>(this.apiUrl + '/retrieveDownConductor' + '/' + userName + '/' + basicLpsId, { responseType: 'text' as 'json' })
    }

    public updateDownConductor(downConductorDescription: DownConductorDescription): Observable<any> {
        return this.http.put<DownConductorDescription>(this.apiUrl + '/updateDownConductor', downConductorDescription, { responseType: 'text' as 'json' })
    }

}
