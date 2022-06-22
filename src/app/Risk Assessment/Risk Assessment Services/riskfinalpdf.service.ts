import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
declare var require: any
const FileSaver = require('file-saver');
@Injectable({
  providedIn: 'root'
})
export class RiskfinalpdfService {
  apiUrl = environment.apiUrl_RISK;
  apiUrl1 = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public downloadPDF(riskId: any,userName: any,projectName: any) {
    
    return   this.http.get(this.apiUrl + '/printFinalPDF'+'/'+userName+ '/' +riskId+ '/' +projectName, { responseType: 'blob' }).subscribe(
         data =>{
           
           const fileName = projectName+'.pdf';
           FileSaver.saveAs(data, fileName);
         }, 
         error=>{
          
         }
       )
    }

    // public downloadSummaryPDF(basicLpsId: any,userName: any,projectName: any) {
    
    //   return   this.http.get(this.apiUrl + '/printLpsSummary'+'/'+userName+ '/' +basicLpsId+ '/' +projectName, { responseType: 'blob' }).subscribe(
    //        data =>{
    //          if(data != null && data.size != 0){
    //           const fileName = projectName+'.pdf';
    //           FileSaver.saveAs(data, fileName);
    //           // this.service.enableDownload=true;
    //          }
    //          else{
    //           this.service.pdfError="Not able to fetch SummaryPDF from DataBase";
    //           // this.service.enableDownload=false;
    //           setTimeout(() =>{
    //             this.service.pdfError="";
    //           }, 3000);
    //          }
    //        }, 
    //        error=>{
    //         this.service.pdfError="Not able to fetch SummaryPDF from DataBase";
    //          setTimeout(() =>{
    //           this.service.pdfError="";
    //          }, 3000);
    //        }
    //      )
    //   }

  public printPDF(riskId: any,userName: any, projectName: any) {
      return   this.http.get(this.apiUrl + '/printFinalPDF'+'/'+userName+ '/' +riskId+ '/' +projectName, { responseType: 'blob' }).subscribe(
           data =>{
             var fileURL: any = URL.createObjectURL(data);
             var a = document.createElement("a");
             a.href = fileURL;
             a.target = '_blank';
             a.click();
           },
           err=>{})
    }

    public mailPDF(riskId: any,userName: any, projectName: any): Observable<any> {
      
      return this.http.get(this.apiUrl + '/sendPDFinMail'+'/'+userName+ '/' +riskId+ '/' +projectName, { responseType: 'text' as 'json' })
    }
}
