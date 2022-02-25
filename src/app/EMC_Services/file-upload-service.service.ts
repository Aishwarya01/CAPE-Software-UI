import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const httpHeaders = new HttpHeaders;

httpHeaders.set( 'Content-Type', 'multipart/form-data' );
@Injectable({
  providedIn: 'root'
})
export class FileUploadServiceService {
   apiUrl_EMC = environment.apiUrl_EMC;
   
  constructor(private http: HttpClient) { }

  public uploadFile(formData: FormData,emcId: number): Observable<HttpEvent<any>> {
    return this.http.post<any>(this.apiUrl_EMC + '/upload'+ '/'+emcId,formData, {
      headers: new HttpHeaders(
        {
          'Content-Type': 'multipart/form-data'
        }
      )
    })
  }
  public retrieveFile(emcId:any): Observable<any> {
    return this.http.get<any>(this.apiUrl_EMC + '/retrieveFacilityData'+'/'+emcId, { responseType: 'text' as 'json' })
  }
}
