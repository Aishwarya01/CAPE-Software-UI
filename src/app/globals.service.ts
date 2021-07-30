import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'

})

export class GlobalsService {
   
    private data = {};  
    siteCount: number = 0; 
   iterationList: any=[];

    constructor() {}

   
}