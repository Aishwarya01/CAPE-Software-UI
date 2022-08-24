import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpHeaders = new HttpHeaders;

httpHeaders.set( 'Content-Type', 'multipart/form-data' );
declare var require: any
const FileSaver = require('file-saver');

@Injectable({
  providedIn: 'root'
})
export class TransformerFileUploadServiceService {
  apiUrl5 = environment.apiUrl_Diagram;

  constructor(private http: HttpClient) { }
  public uploadFile(formData: FormData,nodeId: number,fileSize:any): Observable<HttpEvent<any>> {
    return this.http.post<any>(this.apiUrl5 + '/uploadNodeFile'+ '/'+nodeId + '/'+fileSize,formData, {
      headers: new HttpHeaders(
        {
          'Content-Type': 'multipart/form-data'
        }
      ),responseType: 'text' as 'json' 
    })
  }

  public updateFile(formData: FormData,fileId: number, fileSize:any): Observable<HttpEvent<any>> {
    return this.http.put<any>(this.apiUrl5 + '/updateNodeFile'+ '/'+fileId + '/'+fileSize,formData, {
      headers: new HttpHeaders(
        {
          'Content-Type': 'multipart/form-data'
        }
      ),responseType: 'text' as 'json' 
    })
  }

  public retriveFile(nodeId:any) {
    return this.http.get<any>(this.apiUrl5 + '/retrieveNodeFileName'+'/Transformer'+'/'+nodeId, { responseType:'text' as 'json'})
  }


  public downloadFile(nodeId:any) {
    return this.http.get(this.apiUrl5 + '/downloadNodeFile'+'/Transformer'+'/'+nodeId, { responseType:'blob'}).subscribe(
      data =>{
        const fileName = data.type;
        FileSaver.saveAs(data,fileName);
      }, 
      ()=>{
       
      }
    )

    }
    public deleteFile(nodeId:any): Observable<any> {
      return this.http.delete(this.apiUrl5 + '/removeNodeFile'+'/Transformer'+'/'+nodeId, { responseType: 'text' as 'json'})
    }
}
