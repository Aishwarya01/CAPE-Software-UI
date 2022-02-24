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
  
    // let formData = new FormData();
    // formData.append('user',JSON.stringify(emcId));
    // formData.append('file',file);
    // console.log(file)
    // const options = new RequestOptions({ headers: headers });

    // const headers = new Headers({ 'Content-Type': 'multipart/form-data' });
    // const options = new RequestOptions({ headers: headers });

//  const a=new HttpRequest('POST',this.apiUrl_EMC + '/upload'+ '/'+emcId,formData,{
//     reportProgress: true,
//     responseType: 'json'})
//     return this.http.request(a);
console.log(file)
    return this.http.post<any>(this.apiUrl_EMC + '/upload'+ '/'+emcId,file,{
      reportProgress: true,
      observe: 'events'})
  }
  public retrieveFile(emcId:any): Observable<any> {
    return this.http.get<any>(this.apiUrl_EMC + '/retrieveFacilityData'+'/'+emcId, { responseType: 'text' as 'json' })
  }
}
