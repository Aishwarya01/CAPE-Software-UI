import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InspectionDetails } from '../model/inspection-details';
import { CommentsSection } from '../model/comments-section';

@Injectable({
  providedIn: 'root'
})
export class InspectiondetailsService {

  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public addInspectionDetails(inspectionDetails: InspectionDetails): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/addInspectionDetails', inspectionDetails, { responseType: 'text' as 'json' })
  }
  public retrieveInspectionDetails(userName: String,siteId:number): Observable<any> {
    return this.http.get<InspectionDetails>(this.apiUrl + '/retrieveInspectionDetails' + '/' +userName + '/' +siteId,{ responseType: 'text' as 'json' })
  }

  public addReportDetails(inspectionDetails: InspectionDetails): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/addInstalReport', inspectionDetails, { responseType: 'text' as 'json' })
  }
  public sendComments(comment: CommentsSection,siteId: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/sendInspectionComments'+'/'+comment.userName+ '/' +siteId, comment, { responseType: 'text' as 'json' })
  }
  public replyComments(comment: CommentsSection,siteId: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/replyInspectionComments'+'/'+comment.userName+ '/' +siteId, comment, { responseType: 'text' as 'json' })
  }
  public approveRejectComments(comment: CommentsSection,siteId: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/approveInspectionComments'+'/'+comment.userName+ '/' +siteId, comment, { responseType: 'text' as 'json' })
  }

  public retrieveLocationDetails(distributionDetails: String,referance:String,location: String): Observable<any> {
    return this.http.get<InspectionDetails>(this.apiUrl + '/retrieveLocationDetails' + '/' +distributionDetails + '/' +referance+ '/' +location,{ responseType: 'text' as 'json' })
  }
}




