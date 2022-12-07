import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdatepasswordService {

  apiUrl = environment.apiUrl_EMC_LV;

  constructor(private http: HttpClient) {

  }

  public updatePassword(email: String, password: String): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/updatePassword', { email, password }, { responseType: 'text' as 'json' })
  }
}
