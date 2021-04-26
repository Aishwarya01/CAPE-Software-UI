import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company } from '../model/company';
import { Department } from '../model/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public addDepartment(department: Department): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/addDepartment', department, { responseType: 'text' as 'json' })
  }

  // public updateClient(company: Company): Observable<any> {
  //   return this.http.put<any>(this.apiUrl + '/updateCompany', company, { responseType: 'text' as 'json' })
  // }

  // public deleteClient(email: String, clientname: String): Observable<any> {
  //   return this.http.delete<any>(this.apiUrl + '/deleteCompany' + '/' + email + '/' + clientname)
  // }

  public retrieveDepartment(email: String, company: Company): Observable<any> {
    console.log(company+ "" + email);
    return this.http.get<Company>(this.apiUrl + '/retriveDepartment' + '/' + email+ '/' +company.clientName, { responseType: 'text' as 'json' })
  }}
