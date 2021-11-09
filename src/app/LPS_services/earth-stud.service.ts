import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EarthStud } from '../LPS_model/earth-stud';


@Injectable({
  providedIn: 'root'
})
export class EarthStudService {

  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public saveEarthStud(earthStud:EarthStud): Observable<any> {
    return this.http.post<EarthStud>(this.apiUrl + '/addEarthStud', earthStud, { responseType: 'text' as 'json' })
  }
}
