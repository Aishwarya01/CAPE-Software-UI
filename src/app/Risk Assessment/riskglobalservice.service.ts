import { Injectable } from '@angular/core';
import { RiskCustomerDetailsComponent } from './Risk Assessment/risk-customer-details/risk-customer-details.component';

@Injectable({
  providedIn: 'root'
})
export class RiskglobalserviceService {
riskId: Number=0;
projectName: String = '';
organisationName: String='';
migData: String='';
migDataFlag: boolean=false;
isCustomerDetailsValid: boolean=false;
step1: any;  

  constructor() {}

  migDataCheck(){
    if(this.migData=="Migrated Data"){
      this.migDataFlag=true;
    }
    else{
      this.migDataFlag=false;
    }
  }
  
}
