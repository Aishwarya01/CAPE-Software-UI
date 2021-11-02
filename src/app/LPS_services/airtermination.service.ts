import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Airtermination } from '../LPS_model/airtermination';

@Injectable({
  providedIn: 'root'
})
export class AirterminationService {

  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public saveAirtermination(airtermination:Airtermination): Observable<any> {
    debugger
    return this.http.post<Airtermination>(this.apiUrl + '/addAirTerminationLps', airtermination, { responseType: 'text' as 'json' })
  }
}
