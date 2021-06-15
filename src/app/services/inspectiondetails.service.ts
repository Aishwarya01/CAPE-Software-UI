import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InspectionDetails } from '../model/inspection-details';

@Injectable({
  providedIn: 'root'
})
export class InspectiondetailsService {

  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public addInspectionDetails(inspectionDetails: InspectionDetails): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/addInspectionDetails', inspectionDetails, { responseType: 'text' as 'json' })
  }
}




