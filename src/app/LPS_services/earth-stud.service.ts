import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { earthStudReport } from '../LPS_model/earthStudReport';


@Injectable({
  providedIn: 'root'
})
export class EarthStudService {

  apiUrl = environment.apiUrl_LPS;
  constructor(private http: HttpClient) { }

  public saveEarthStud(earthStud:earthStudReport): Observable<any> {
    return this.http.post<earthStudReport>(this.apiUrl + '/addEarthStud', earthStud, { responseType: 'text' as 'json' })
  }

  public updateEarthStud(earthStud: earthStudReport): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/updateEarthStud', earthStud, { responseType: 'text' as 'json' })
  }

  public retrieveEarthStud(userName: String, basicLpsId: number): Observable<any> {
    return this.http.get<earthStudReport>(this.apiUrl + '/retrieveEarthStud' + '/' + userName + '/' + basicLpsId, { responseType: 'text' as 'json' })
  }
}
