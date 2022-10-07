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

  public downloadPDF(basicLpsId: any,userName: any,projectName: any) {
    
    return   this.http.get(this.apiUrl + '/printFinalPDF'+'/'+userName+ '/' +basicLpsId+ '/' +projectName, { responseType: 'blob' }).subscribe(
         data =>{
           
           const fileName = projectName+'.pdf';
           FileSaver.saveAs(data, fileName);
         }, 
         error=>{
          
         }
       )
    }

  public printPDF(basicLpsId: any,userName: any, projectName: any) {
      return   this.http.get(this.apiUrl + '/printFinalPDF'+'/'+userName+ '/' +basicLpsId+ '/' +projectName, { responseType: 'blob' }).subscribe(
           data =>{
             var fileURL: any = URL.createObjectURL(data);
             var a = document.createElement("a");
             a.href = fileURL;
             a.target = '_blank';
             a.click();
           },
           err=>{
            
           }
         )
    }

    public mailPDF(basicLpsId: any,userName: any, projectName: any): Observable<any> {
      
      return this.http.get(this.apiUrl + '/sendPDFinMail'+'/'+userName+ '/' +basicLpsId+ '/' +projectName, { responseType: 'text' as 'json' })
    }
}
