import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApplicationType } from '../model/applicationtype';

@Injectable({
  providedIn: 'root'
})
export class MainNavService {

  //apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  
  
}
