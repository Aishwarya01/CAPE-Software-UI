import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company } from '../model/company';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  apiUrl = environment.apiUrl;
  constructor ( private http: HttpClient) { }
  
  public  addClient (company :Company): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/addCompany', company)
  }
}
