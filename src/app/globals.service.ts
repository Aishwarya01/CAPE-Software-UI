import { Injectable,ViewChild } from '@angular/core';
import { VerificationlvComponent } from './verificationlv/verificationlv.component';

@Injectable({
  providedIn: 'root'

})

export class GlobalsService {
   
    private data = {};  
    siteCount: number = 0; 
   iterationList: any=[];
  //  @ViewChild(VerificationlvComponent)
  //  verification!: VerificationlvComponent;
 
    constructor() {}

      // callMethod(index: any,siteId: any,userName: any,clientName: any,departmentName: any,site: any) {
      //   this.verification.changeTab(index,siteId,userName,clientName,departmentName,site);
      // }
}