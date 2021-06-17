import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Testingdetails } from '../model/testing';

@Injectable({
  providedIn: 'root'
})
export class TestingService {
  
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public addTest(testing: Testingdetails): Observable<any> {
  return this.http.post<any>(this.apiUrl + '/addTestInfo', testing, { responseType: 'text' as 'json' })
  }
}