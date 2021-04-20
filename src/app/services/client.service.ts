import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return this.http.post<any>(this.apiUrl+'/addCompany', company, { responseType: 'text' as 'json' })
  }

  public  deleteClient (email: String, clientname: String): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        clientname
      }
    }
    return this.http.delete<any>(this.apiUrl+'/deleteCompany'+'/'+email, options)
  }

  public retrieveClient(email: String): Observable<any>{
    return this.http.get<Company>(this.apiUrl+'/retriveCompany'+'/'+email, { responseType: 'text' as 'json' })
  }
}
