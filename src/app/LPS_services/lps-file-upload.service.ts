
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
export class LpsFileUploadService {
   apiUrl_LPS = environment.apiUrl_LPS;
 // apiUrl_LPS:any =  'http://localhost:5001/api/lps/v2';
   
  constructor(private http: HttpClient) { }

  public uploadFile(formData: FormData,lpsId: number,componentName:any,index:number): Observable<HttpEvent<any>> {
    return this.http.post<any>(this.apiUrl_LPS + '/upload'+ '/'+lpsId+'/'+componentName+'/'+index,formData, {
      headers: new HttpHeaders(
        {
          'Content-Type': 'multipart/form-data'
        }
      ),responseType: 'text' as 'json' 
    })
  }

  public updateFile(formData: FormData,componentName:any,fileId:number,index:number): Observable<HttpEvent<any>> {
    return this.http.put<any>(this.apiUrl_LPS + '/updateFile'+ '/'+componentName+'/'+fileId+'/'+index,formData,{
      headers: new HttpHeaders( 
        {
          'Content-Type': 'multipart/form-data'
        }
      ),responseType: 'text' as 'json' 
    })
  }

  public retriveFile(lpsId:any) {
    return this.http.get<any>(this.apiUrl_LPS + '/retrieveFileName'+'/'+lpsId, { responseType:'text' as 'json'})
  }


  public downloadFile(fileId:any,componentName:any,fileName:any) {
    return this.http.get(this.apiUrl_LPS + '/downloadFile'+'/'+fileId+'/'+componentName+'/'+fileName, { responseType:'blob'}).subscribe(
      data =>{
        const fileName = data.type;
        FileSaver.saveAs(data,fileName);
      }, 
      ()=>{})
    }
    public deleteFile(fileId:number): Observable<any> {
      return this.http.delete(this.apiUrl_LPS + '/removeFile'+'/'+fileId, { responseType: 'text' as 'json'})
    }

  public updateIndex(basicLpsId: any, list: any): Observable<any> {
    return this.http.put<any>(this.apiUrl_LPS + '/updateAllFileId' + '/' + basicLpsId, list, { responseType: 'text' as 'json' })
  }

  public removeUnusedFiles(basicLpsId: any): Observable<any> {
    return this.http.delete<any>(this.apiUrl_LPS + '/removeFile' + '/' + basicLpsId, { responseType: 'text' as 'json' })
  }
  
}