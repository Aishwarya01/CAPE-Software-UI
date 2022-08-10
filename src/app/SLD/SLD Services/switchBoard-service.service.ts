import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SwitchBoardServicesService {
  apiUrl5 = environment.apiUrl_Diagram;

  constructor(private http: HttpClient) { }

  public addSwitchBoard(switchBoard: any): Observable<any> {
    return this.http.post<any>(this.apiUrl5 + '/saveSwitchBoard', switchBoard, { responseType: 'text' as 'json' })
  }
  public retriveSwitchBoard(fileName: any,nodeId: any): Observable<any> {
    return this.http.get<any>(this.apiUrl5 + '/retrieveSwitchBoard'+'/'+fileName+'/'+nodeId, { responseType: 'text' as 'json' })
  }
  public updateSwitchBoard(switchBoard: any): Observable<any> {
    return this.http.put<any>(this.apiUrl5 + '/updateSwitchBoard', switchBoard, { responseType: 'text' as 'json' })
  }

}
