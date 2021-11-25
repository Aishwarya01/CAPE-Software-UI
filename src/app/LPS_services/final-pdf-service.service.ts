import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
declare var require: any
const FileSaver = require('file-saver');

@Injectable({
  providedIn: 'root'
})
export class FinalPdfServiceService {

  apiUrl = environment.apiUrl_LPS;
  constructor(private http: HttpClient) { }

  // public saveAirtermination(:): Observable<any> {
  //   return this.http.post<>(this.apiUrl + '', , { responseType: 'text' as 'json' })
  // }

  // public updateAirtermination(: ): Observable<any> {
  //   return this.http.put<any>(this.apiUrl + '/', , { responseType: 'text' as 'json' })
  // }

  // Example

  public downloadPDF(basicLpsId: any,userName: any,) {
    debugger
    return   this.http.get(this.apiUrl + '/printFinalPDF'+'/'+userName+ '/' +basicLpsId, { responseType: 'blob' }).subscribe(
         data =>{
           debugger
           const fileName = 'Lpsfinalreport.pdf';
           FileSaver.saveAs(data, fileName);
         }, 
         err=>{
          
         }
       )
    }

  public printPDF(basicLpsId: any,userName: any) {
      return   this.http.get(this.apiUrl + '/printFinalPDF'+'/'+userName+ '/' +basicLpsId, { responseType: 'blob' }).subscribe(
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

      public mailPDF(siteId: any,userName: any): Observable<any> {
        return this.http.get(this.apiUrl + '/sendPDFinMail'+'/'+userName+ '/' +siteId, { responseType: 'text' as 'json' })
        }
}
