import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RiskglobalserviceService {
riskId: Number=0;
projectName: String = '';
migData: String='';
migDataFlag: boolean=false;
  constructor() { }

  migDataCheck(){
    if(this.migData=="Migrated Data"){
      this.migDataFlag=true;
    }
    else{
      this.migDataFlag=false;
    }
  }
  
}
