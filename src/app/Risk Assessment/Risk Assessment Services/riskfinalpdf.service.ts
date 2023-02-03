import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
declare var require: any

@Injectable({
  providedIn: 'root'
})
export class RiskfinalpdfService {
  apiUrl = environment.apiUrl_RISK;
  apiUrl1 = environment.apiUrl_LPS_RISK;
  
  constructor(private http: HttpClient) { }

  public downloadPDF(riskId: any,userName: any,projectName: any) {
    return this.http.get(this.apiUrl1 + '/risk/printFinalPDF'+'/'+userName+ '/' +riskId+ '/' +projectName, { responseType: 'blob' });
    }

    public printPDF(riskId: any,userName: any, projectName: any) {
     return this.http.get(this.apiUrl1 + '/risk/printFinalPDF'+'/'+userName+ '/' +riskId+ '/' +projectName, { responseType: 'blob' })
    }

    public mailPDF(riskId: any,userName: any, projectName: any): Observable<any> {
      
      return this.http.get(this.apiUrl1 + '/risk/sendPDFinMail'+'/'+userName+ '/' +riskId+ '/' +projectName, { responseType: 'text' as 'json' })
    }
}
