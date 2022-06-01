import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmcClientDetails } from '../EMC_Model/emc-client-details';



declare var require: any
const FileSaver = require('file-saver');
@Injectable({
  providedIn: 'root'
})

export class EmcClientDetailsService {

  
  
  apiUrl_EMC = environment.apiUrl_EMC;
  constructor(private http: HttpClient) { }


  public addClientDetailsData(emcClientDetails: EmcClientDetails): Observable<any> {
    return this.http.post<any>(this.apiUrl_EMC + '/saveClientDetails', emcClientDetails, { responseType: 'text' as 'json' })
  }
  public retrieveClientDetailsData(userName:any, emcId:any): Observable<any> {
    return this.http.get<any>(this.apiUrl_EMC + '/retrieveClientDetails'+'/'+userName+ '/' +emcId, { responseType: 'text' as 'json' })
  }
  public upDateClientDetailsData(emcClientDetails: EmcClientDetails): Observable<any> {
    return this.http.put<any>(this.apiUrl_EMC + '/updateClientDetails', emcClientDetails, { responseType: 'text' as 'json' })
  }

  public retrieveCountry(): Observable<any> {
    return this.http.get<any>(this.apiUrl_EMC + '/fetchCountries', { responseType: 'text' as 'json' })
  }

  public retrieveState(countryName: String): Observable<any> {
    return this.http.get<any>(this.apiUrl_EMC + '/fetchStatesByCountryCode' + '/' +countryName, { responseType: 'text' as 'json' })
  }

  // public retrieveStateV2(countryName: String): Observable<any> {
  //   return this.http.get<any>(this.apiUrl_EMC + '/fetchStatesByCountryCode' + '/' +countryName, { responseType: 'text' as 'json' })
  // }

  public downloadPDF(emcId: any,userName: any, clientName: any) {
    return   this.http.get(this.apiUrl_EMC + '/printFinalPDF'+'/'+userName+ '/' +emcId +'/' +clientName, { responseType: 'blob' }).subscribe(
         data =>{
           const fileName = "EMC_"+clientName+'.pdf';
           FileSaver.saveAs(data, fileName);
         },
         err=>{
          
         }
       )
    }
  public printPDF(emcId: any,userName: any, clientName: any) {
    return   this.http.get(this.apiUrl_EMC + '/printFinalPDF'+'/'+userName+ '/' +emcId +'/' +clientName, { responseType: 'blob' }).subscribe(
         data =>{
           //const fileName = 'finalreport.pdf';
           var fileURL: any = URL.createObjectURL(data);
           var a = document.createElement("a");
           a.href = fileURL;
           a.target = '_blank';
           // Don't set download attribute
           // a.download = "finalreport.pdf";
           a.click();
         },
         err=>{
          
         }
       )
    }
    public mailPDF(emcId: any,userName: any, clientName: any): Observable<any> {
      return this.http.get(this.apiUrl_EMC + '/sendPDFinMail'+'/'+userName+ '/' +emcId+ '/'+clientName , { responseType: 'text' as 'json' })
      }

}
