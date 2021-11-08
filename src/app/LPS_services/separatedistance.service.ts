import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Separatedistance } from '../LPS_model/separatedistance';

@Injectable({
  providedIn: 'root'
})
export class SeparatedistanceService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public saveSeparateDistance(separatedistance: Separatedistance): Observable<any> {
    return this.http.post<Separatedistance>(this.apiUrl + '/addSeperationDistance', separatedistance, { responseType: 'text' as 'json' })
  }
}
