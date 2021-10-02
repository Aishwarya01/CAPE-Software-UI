import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Summary } from '../model/summary';
import { CommentsSection } from '../model/comments-section';

@Injectable({
  providedIn: 'root'
})
export class SummarydetailsService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public addSummary(summary: Summary): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/addSummary', summary, { responseType: 'text' as 'json' })
  }
  public sendComments(comment: CommentsSection,siteId: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/sendSummaryComments'+'/'+comment.userName+ '/' +siteId, comment, { responseType: 'text' as 'json' })
  }
  public replyComments(comment: CommentsSection,siteId: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/replySummaryComments'+'/'+comment.userName+ '/' +siteId, comment, { responseType: 'text' as 'json' })
  }
  public approveRejectComments(comment: CommentsSection,siteId: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/approveSummaryComments'+'/'+comment.userName+ '/' +siteId, comment, { responseType: 'text' as 'json' })
  }
}



