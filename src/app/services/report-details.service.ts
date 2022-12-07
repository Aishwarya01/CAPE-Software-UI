import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommentsSection } from '../model/comments-section';
import { Reportdetails } from '../model/reportdetails';

@Injectable({
  providedIn: 'root'
})
export class ReportDetailsService {

  apiUrl = environment.apiUrl_EMC_LV;
  constructor(private http: HttpClient) { }

  public addReportDetails(reportDetails: Reportdetails): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/lv/addInstalReport', reportDetails, { responseType: 'text' as 'json' })
  }
  public sendComments(comment: CommentsSection,siteId: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/lv/sendBasicInfoComments'+'/'+comment.userName+ '/' +siteId, comment, { responseType: 'text' as 'json' })
  }
  public replyComments(comment: CommentsSection,siteId: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/lv/replyBasicInfoComments'+'/'+comment.userName+ '/' +siteId, comment, { responseType: 'text' as 'json' })
  }
  public approveRejectComments(comment: CommentsSection,siteId: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/lv/approveBasicInfoComments'+'/'+comment.userName+ '/' +siteId, comment, { responseType: 'text' as 'json' })
  }
  public retrieveBasic(siteId: any): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/lv/retrieveInstalReport'+ '/' +siteId, { responseType: 'text' as 'json' })
  }
}
