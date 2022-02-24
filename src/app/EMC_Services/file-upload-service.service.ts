import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadServiceService {

  apiUrl_EMC = environment.apiUrl_EMC;
  constructor(private http: HttpClient) { }

  public uploadFile(file: any,emcId: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file',file);
 const a=new HttpRequest('POST',this.apiUrl_EMC + '/upload'+ '/'+emcId,formData,{
    reportProgress: true,
    responseType: 'json'})
    return this.http.request(a);
    //post<any>(this.apiUrl_EMC + '/upload'+ '/'+emcId,formData, { responseType: 'blob' as 'json' })
  }
  public retrieveFile(emcId:any): Observable<any> {
    return this.http.get<any>(this.apiUrl_EMC + '/retrieveFacilityData'+'/'+emcId, { responseType: 'text' as 'json' })
  }
}
