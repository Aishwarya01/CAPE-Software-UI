import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TestingDetails} from '../model/testing-details';

@Injectable({
  providedIn: 'root'
})
export class TestingService {
  
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public savePeriodicTesting(testing: TestingDetails): Observable<any> {
   return this.http.post<any>(this.apiUrl + '/savePeriodicTesting', testing, { responseType: 'text' as 'json' })
  }
}