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

  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public addReportDetails(reportDetails: Reportdetails): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/addInstalReport', reportDetails, { responseType: 'text' as 'json' })
  }
  public sendComments(comment: CommentsSection,siteId: any): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/sendBasicInfoComments'+'/'+comment.userName+ '/' +siteId+ '/' +comment.viewerComments, { responseType: 'text' as 'json' })
  }
  public replyComments(comment: CommentsSection,siteId: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/replyBasicInfoComments'+'/'+comment.userName+ '/' +siteId, comment, { responseType: 'text' as 'json' })
  }
}
