import { Injectable,Directive } from '@angular/core';
// import { Http, Response } from '@angular/http';
// import { Headers, RequestOptions } from '@angular/http';
// import { Observable, interval } from 'rxjs';
// import { Observer } from 'rxjs';
// import { HttpModule } from '@angular/http'
// import { Config } from './app.config'
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { RouterModule, Routes, Router } from '@angular/router';
@Injectable()
export class GlobalsService {
    private siteId: string="";
    //public data: string="";
    private data = {};  

    constructor() {}

    setData(value: string){
        this.data = value;
      }
    
      getData(){
        // let temp = this.data;
        // return temp;
        return this.data;  
      }
     
   
   //private http: Http, public configs: Config, private modalService: NgbModal, private router: Router


    


   
   



}