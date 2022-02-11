import { Injectable } from '@angular/core';
//import { LpsMatstepperComponent } from './lps-matstepper/lps-matstepper.component';

@Injectable({
  providedIn: 'root'
})
export class LpsGlobalserviceService {

  //stepper:any;
  lvClick: number=0;  

  constructor(
    //public matstepper: LpsMatstepperComponent,
  ) { 
   // this.stepper = matstepper;
  }
  
  // public retriveDownConductor(userName: any, basicLpsId: any, clientName: any){
  //   this.matstepper.retriveDownConductor(userName,basicLpsId,clientName)
  // }
}
