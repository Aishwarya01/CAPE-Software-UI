import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'

})

export class GlobalsService {
    //private siteId: number;
    //public data: string="";
    private data = {};  
    siteCount: number = 0; 
    //step2 = new EventEmitter();   

    constructor() {}

    // setData(value: number){
    //     this.data = value;
    //   }
      
    //   getData(){
    //     return this.data;  
    //   }
     
    // onFirstComponentButtonClick() {    
    //   this.step2.emit();    
    // } 
   

}