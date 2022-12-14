import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpHeaders = new HttpHeaders;

httpHeaders.set( 'Content-Type', 'multipart/form-data' );
declare var require: any
const FileSaver = require('file-saver');
@Injectable({
  providedIn: 'root'
})
export class FileUploadServiceService {
   apiUrl_EMC = environment.apiUrl_EMC_LV;
   
  constructor(private http: HttpClient) { }

  public uploadFile(formData: FormData,emcId: number,fileSize:any): Observable<HttpEvent<any>> {
    return this.http.post<any>(this.apiUrl_EMC + '/emc/upload'+ '/'+emcId + '/'+fileSize,formData, {
      headers: new HttpHeaders(
        {
          'Content-Type': 'multipart/form-data'
        }
      ),responseType: 'text' as 'json' 
    })
  }

  public updateFile(formData: FormData,fileId: number, fileSize:any): Observable<HttpEvent<any>> {
    return this.http.put<any>(this.apiUrl_EMC + '/emc/updateFile'+ '/'+fileId + '/'+fileSize,formData, {
      headers: new HttpHeaders(
        {
          'Content-Type': 'multipart/form-data'
        }
      ),responseType: 'text' as 'json' 
    })
  }

  public retriveFile(emcId:any) {
    return this.http.get<any>(this.apiUrl_EMC + '/emc/retrieveFileName'+'/'+emcId, { responseType:'text' as 'json'})
  }


  public downloadFile(emcId:any) {
    return this.http.get(this.apiUrl_EMC + '/emc/downloadFile'+'/'+emcId, { responseType:'blob'}).subscribe(
      data =>{
        const fileName = data.type;
        FileSaver.saveAs(data,fileName);
      }, 
      ()=>{
       
      }
    )

    }
    public deleteFile(emcId:any): Observable<any> {
      return this.http.delete(this.apiUrl_EMC + '/removeFile'+'/'+emcId, { responseType: 'text' as 'json'})
    }
  
}
