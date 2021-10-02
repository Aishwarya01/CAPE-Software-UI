import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Supplycharacteristics } from '../model/supplycharacteristics';
import { CommentsSection } from '../model/comments-section';

@Injectable({
  providedIn: 'root'
})
export class SupplyCharacteristicsService {

  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public addSupplyCharacteristics(supplycharacteristics: Supplycharacteristics): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/addCharacteristics', supplycharacteristics, { responseType: 'text' as 'json' })
  }
  public sendComments(comment: CommentsSection,siteId: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/sendCharacteristicsComments'+'/'+comment.userName+ '/' +siteId, comment, { responseType: 'text' as 'json' })
  }
  public replyComments(comment: CommentsSection,siteId: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/replyCharacteristicsComments'+'/'+comment.userName+ '/' +siteId, comment, { responseType: 'text' as 'json' })
  }
  public approveRejectComments(comment: CommentsSection,siteId: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/approveCharacteristicsComments'+'/'+comment.userName+ '/' +siteId, comment, { responseType: 'text' as 'json' })
  }
}
