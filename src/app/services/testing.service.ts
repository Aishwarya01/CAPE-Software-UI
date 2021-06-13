import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Testing } from '../model/testing';

@Injectable({
  providedIn: 'root'
})
export class TestingService {
  
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public addSIte(testing: Testing): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/addTestInfo', testing, { responseType: 'text' as 'json' })
  }
}