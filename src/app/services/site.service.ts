import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Site } from '../model/site';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  apiUrl = environment.apiUrl_v2;
  apiUrlV2 = environment.apiUrl_v2;
  constructor(private http: HttpClient) { }

  public addSIte(site: Site): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/addSite', site, { responseType: 'text' as 'json' })
  }

  public updateSite(site: Site): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/updateSite', site, { responseType: 'text' as 'json' })
  }

  public updateSiteStatus(siteId: number): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/updateSite' + '/' + siteId, { responseType: 'text' as 'json' })
  }

  public deleteSite(siteId: number ): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/deleteSite' +  '/' + siteId, { responseType: 'text' as 'json' })
  }

  public retrieveSite(userName: any): Observable<any> {
    return this.http.get<Site>(this.apiUrl + '/retriveSite' + '/' + userName, { responseType: 'text' as 'json' })
  }

  public retrieveAllSite(userName: any): Observable<any> {
    return this.http.get<Site>(this.apiUrl + '/retrieveAllSites', { responseType: 'text' as 'json' })
  }

  public retrieveListOfSite(userName: any): Observable<any> { 
    return this.http.get<Site>(this.apiUrl + '/retrieveListOfSite' + '/' + userName , { responseType: 'text' as 'json' })
  }

  public retrieveSiteInfo(clientName: String, departmentName: String): Observable<any> {
    return this.http.get<Site>(this.apiUrl + '/retriveSite' + '/' + clientName+ '/' +departmentName, { responseType: 'text' as 'json' })
  }

  public retrieveSiteForInspection(companyName: String, departmentName: String, siteName: String): Observable<any> {
    return this.http.get<Site>(this.apiUrl + '/retrieveSiteByName' + '/' + companyName+ '/' +departmentName + '/' +siteName, { responseType: 'text' as 'json' })
  }

  public retrieveCountry(): Observable<any> {
    return this.http.get<any>(this.apiUrlV2 + '/fetchCountries', { responseType: 'text' as 'json' })
  }

  public retrieveState(countryName: String): Observable<any> {
    return this.http.get<any>(this.apiUrlV2 + '/fetchStatesByCountryCode' + '/' +countryName, { responseType: 'text' as 'json' })
  }

  public retrieveFinal(userName: String,siteId: any): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/retrieveReport' + '/' +userName+ '/' +siteId, { responseType: 'text' as 'json' })
  }
  public retrieveStateV2(countryName: String): Observable<any> {
    return this.http.get<any>(this.apiUrlV2 + '/fetchStatesByCountryCode' + '/' +countryName, { responseType: 'text' as 'json' })
  }

  public retrieveSiteName(companyName: String,departmentName: String,siteName: String): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/retrieveSiteName' + '/' +companyName+ '/' +departmentName+ '/'+siteName, { responseType: 'text' as 'json' })
  }
}
