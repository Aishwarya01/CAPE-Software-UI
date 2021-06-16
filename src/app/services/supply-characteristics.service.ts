import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Supplycharacteristics } from '../model/supplycharacteristics';

@Injectable({
  providedIn: 'root'
})
export class SupplyCharacteristicsService {

  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public addSupplyCharacteristics(supplycharacteristics: Supplycharacteristics): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/addCharacteristics', supplycharacteristics, { responseType: 'text' as 'json' })
  }

}
