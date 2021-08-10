import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Site } from '../model/site';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public addSIte(site: Site): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/addSite', site, { responseType: 'text' as 'json' })
  }

  public updateSite(site: Site): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/updateSite', site, { responseType: 'text' as 'json' })
  }

  public deleteSite(siteId: number ): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/deleteSite' +  '/' + siteId, { responseType: 'text' as 'json' })
  }

  public retrieveSite(site: Site): Observable<any> {
    return this.http.get<Site>(this.apiUrl + '/retriveSite' + '/' + site.clientName+ '/' +site.departmentName, { responseType: 'text' as 'json' })
  }

  public retrieveListOfSite(site: Site): Observable<any> {
    return this.http.get<Site>(this.apiUrl + '/retrieveListOfSite' + '/' + site.clientName + '/' +site.departmentName, { responseType: 'text' as 'json' })
  }

  public retrieveSiteInfo(clientName: String, departmentName: String): Observable<any> {
    return this.http.get<Site>(this.apiUrl + '/retriveSite' + '/' + clientName+ '/' +departmentName, { responseType: 'text' as 'json' })
  }

  public retrieveCountry(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/fetchCountries', { responseType: 'text' as 'json' })
  }

  public retrieveState(countryName: String): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/fetchStatesByCountryCode' + '/' +countryName, { responseType: 'text' as 'json' })
  }
}
