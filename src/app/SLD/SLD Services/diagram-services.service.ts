import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiagramServicesService {
  apiUrl5 = environment.apiUrl_Diagram;

  constructor(private http: HttpClient) { }

  public addDiagram(diagramComponent: any): Observable<any> {
    return this.http.post<any>(this.apiUrl5 + '/saveDiagram', diagramComponent, { responseType: 'text' as 'json' })
  }

  public updateDiagram(diagramComponent: any): Observable<any> {
    return this.http.put<any>(this.apiUrl5 + '/updateDiagram', diagramComponent, { responseType: 'text' as 'json' })
  }

  public retriveDiagram(userName: any, fileName: any): Observable<any> {
    return this.http.get<any>(this.apiUrl5 + '/retrieveDiagram'+'/'+userName+'/'+fileName, { responseType: 'text' as 'json' })
  }

  public retriveFileName(userName: any, fileName: any): Observable<any> {
    return this.http.get<any>(this.apiUrl5 + '/retrievefileName'+'/'+userName+'/'+fileName, { responseType: 'text' as 'json' })
  }

  public retriveAllDiagram(userName: any): Observable<any> {
    return this.http.get<any>(this.apiUrl5 + '/retrieveDiagramList'+'/'+userName, { responseType: 'text' as 'json' })
  }
  
  public fetchAllDiagramSymbols(): Observable<any> {
    return this.http.get<any>(this.apiUrl5 + '/symbolList', { responseType: 'text' as 'json' })
  }
}
