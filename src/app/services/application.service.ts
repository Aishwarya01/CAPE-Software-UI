import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApplicationType } from '../model/applicationtype';

@Injectable({
  providedIn: 'root'
})
export class ApplicationTypeService {

  apiUrlV2 = environment.apiUrl_v2;

  constructor(private http: HttpClient) {

  }

  public addApplicationType(applicationTypes: ApplicationType): Observable<any>{
    return this.http.post<any>(this.apiUrlV2 + '/addApplicationTypes', applicationTypes )
  }

  public updateApplicationType(applicationType: ApplicationType): Observable<any>{
    return this.http.put<any>(this.apiUrlV2 + '/updateApplicationTypes', applicationType, { responseType: 'text' as 'json' })
  }

  public retrieveApplicationTypes(): Observable<any>{
    return this.http.get<ApplicationType>(this.apiUrlV2+'/retrieveApplicationTypes')
  }

  public retrieveApplicationTypesV2(): Observable<any>{
    return this.http.get<ApplicationType>(this.apiUrlV2+'/retrieveApplicationTypes')
  }

  public deleteApplicationType(id: number): Observable<any>{
    return this.http.delete(this.apiUrlV2+ '/deleteApplicationType'+'/'+ id)
  }
  public retrieveApplicationTypesBasedOnUser(userName: String): Observable<any>{
    return this.http.get<any>(this.apiUrlV2 + '/retrieveRegistration'+'/'+ userName)
  }
}
