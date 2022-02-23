import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadServiceService {

  apiUrl_EMC = environment.apiUrl_EMC;
  constructor(private http: HttpClient) { }

  public uploadFile(file: File,emcId: number): Observable<any> {

    return this.http.post<any>(this.apiUrl_EMC + '/upload'+ '/'+emcId,file, { responseType: 'blob' as 'json' })
  }
  public retrieveFile(emcId:any): Observable<any> {
    return this.http.get<any>(this.apiUrl_EMC + '/retrieveFacilityData'+'/'+emcId, { responseType: 'text' as 'json' })
  }
}
