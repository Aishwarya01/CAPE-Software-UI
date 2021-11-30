import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Airtermination } from '../LPS_model/airtermination';

@Injectable({
  providedIn: 'root'
})
export class AirterminationService {

  apiUrl = environment.apiUrl_LPS;
  constructor(private http: HttpClient) { }

  public saveAirtermination(airtermination:Airtermination): Observable<any> {
    return this.http.post<Airtermination>(this.apiUrl + '/addAirTerminationLps', airtermination, { responseType: 'text' as 'json' })
  }

  public updateAirtermination(airTermination: Airtermination): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/updateAirTerminationLps', airTermination, { responseType: 'text' as 'json' })
  }

  public retriveLpsbasicDetails(userName: String,basicLpsId: any): Observable<any>{
    return this.http.get<any>(this.apiUrl + '/retrieveAirTerminationLps' + '/' +userName+ '/' +basicLpsId, { responseType: 'text' as 'json' })
  }
  
}
