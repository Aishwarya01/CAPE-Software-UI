import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company } from '../model/company';
import { pipe } from 'rxjs';
import { Map } from 'typescript';

const httpoption ={
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  apiUrl = environment.apiUrl;
  handleError: any;

  constructor(private http: HttpClient,
              ) { }

  public addClient(company: Company): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.post<any>(this.apiUrl + '/addCompany', company,  {headers, responseType: 'text' as 'json' })
  }

  public updateClient(company: Company): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/updateCompany', company, { responseType: 'text' as 'json' })
  }

  public deleteClient(email: String, clientname: String): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/deleteCompany' + '/' + email + '/' + clientname, { responseType: 'text' as 'json' })
  }

  public retrieveClient(email: String): Observable<any> {
    return this.http.get<Company>(this.apiUrl + '/retriveCompany' + '/' + email, { responseType: 'text' as 'json' })
  }
}
