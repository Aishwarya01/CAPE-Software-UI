import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Summary } from '../model/summary';

@Injectable({
  providedIn: 'root'
})
export class SummarydetailsService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public addSummary(summary: Summary): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/addSummary', summary, { responseType: 'text' as 'json' })
  }
}



