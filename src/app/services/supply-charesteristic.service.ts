import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import{SupplyCharesteristic} from '../model/supplycharesteristic';


@Injectable({
  providedIn: 'root'
})

export class SupplyCharesteristicService {

  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public addSupplyCharesteristic(SupplyCharesteristic: SupplyCharesteristic): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/addSupplyCharesteristic', SupplyCharesteristic, { responseType: 'text' as 'json' })
  }

}
