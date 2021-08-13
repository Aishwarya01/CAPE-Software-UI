import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InspectionDetails } from '../model/inspection-details';
import { Reportdetails } from '../model/reportdetails';
import { Supplycharacteristics } from '../model/supplycharacteristics';
import { TestingDetails } from '../model/testing-details';
@Injectable({
  providedIn: 'root'
})
export class InspectionVerificationService {

  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public updateBasic(reportDetails: Reportdetails): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/updateInstalReport', reportDetails, { responseType: 'text' as 'json' })
  }
  public updateSupply(supply: Supplycharacteristics): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/updateCharacteristics', supply, { responseType: 'text' as 'json' })
  }
  public updateIncoming(incoming: InspectionDetails): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/updateInspectionDetails', incoming, { responseType: 'text' as 'json' })
  }
  public updateTesting(testing: TestingDetails): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/updatePeriodicTesting', testing, { responseType: 'text' as 'json' })
  }

}
