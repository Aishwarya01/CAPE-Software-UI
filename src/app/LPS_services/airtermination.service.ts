import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Airtermination } from '../LPS_model/airtermination';


const httpHeaders = new HttpHeaders;

httpHeaders.set( 'Content-Type', 'multipart/form-data' );
declare var require: any;

@Injectable({
  providedIn: 'root'
})

export class AirterminationService {

  apiUrl = environment.apiUrl_LPS;
  constructor(private http: HttpClient) { }

  public saveAirtermination(airtermination:Airtermination): Observable<any> {
    return this.http.post<Airtermination>(this.apiUrl + '/addAirTerminationLps', airtermination,{ responseType: 'text' as 'json' })
  }

  public updateAirtermination(airTermination: Airtermination): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/updateAirTerminationLps', airTermination,{ responseType: 'text' as 'json' });
  }

  public retriveAirTerminationDetails(basicLpsId: any): Observable<any>{
    return this.http.get<any>(this.apiUrl + '/retrieveAirTerminationLps' + '/' +basicLpsId, { responseType: 'text' as 'json' })
  }

  // public updateFileIdAirTerminationDetails(basicLpsId: any,index: any): Observable<any>{
  //   return this.http.put<any>('http://localhost:5001/api/lps/v2' + '/updateFileId' + '/' +basicLpsId+ '/' +index, { responseType: 'text' as 'json' })
  // }
  
  // public updateIndex(basicLpsId: any,list: any): Observable<any>{
  //   return this.http.put<any>('http://localhost:5001/api/lps/v2' + '/updateAllFileId' + '/' +basicLpsId,list, { responseType: 'text' as 'json' })
  // }
  
}
