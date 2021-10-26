import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BasicDetails } from '../LPS_model/basic-details';

@Injectable({
  providedIn: 'root'
})
export class LPSBasicDetailsService {

  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public saveLPSBasicDetails(basicDetails:BasicDetails): Observable<any> {
    debugger
    return this.http.post<any>(this.apiUrl + '/addBasicLps', basicDetails, { responseType: 'text' as 'json' })
  }
 
}
