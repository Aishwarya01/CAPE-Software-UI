import {Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';

@Injectable({
  providedIn: 'root'

})

export class GlobalsService {
   
  private data = {};  
  backBtn:boolean=true;
  siteCount: number = 0; 
  iterationList: any=[]; //for location no. & name
//from supply to testing table
  supplyList: any;
  retrieveMainNominalVoltage:any=[];
  nominalVoltageArr2:any=[];
  testingTable:any=[];
  testingTable2:any=[];
  retrieveTable:boolean=false;
  mainNominalVoltage :any=[];
  mainNominalFrequency :any=[];
  mainNominalCurrent:any=[];
  mainNominalVoltageValue:String="";
  mainLoopImpedanceValue:String="";
  mainNominalCurrentValue:String="";
//viewer inspector details
  viewerName!: String;
  inspectorName!: String;
  siteName!: String;
  viewerData: any = [];
  inspectorData: any = [];
//generate otp & contact no.
  changeNumberSession!: String; 
  changeNumber!: String;
//notification
  notificationCount: number= 0; 
  commentScrollToBottom: number= 0; //Scroll Top to Bottom for notification
  mainNavToSaved:number=0; //onclick of notification navigate to saved reports
  filterSiteName!: String; //filter site name based on notification click
  highlightText:boolean=false; //highlightText row based on notification click in saved reports
//get complimentary license
  noofLicense!: number;  
  useClicked:boolean=false;
//completed-saved-final
 disableFields:boolean=false;
 allStepsCompleted:boolean=false;
 allFieldsDisable:boolean=false; //after submiting all 5 steps
 disableSubmitSummary:boolean=false; //after submiting all 5 steps
//verification component for stepper
 isLinear:boolean=false; 
 isCompleted: boolean = true;
 isCompleted2: boolean = true;
 isCompleted4: boolean = true;
 isCompleted5: boolean = true;
 isCompleted3: boolean = true;
 goBacktoprevious: boolean=false;
 editable: boolean = true;

 
 constructor(private _scrollToService: ScrollToService) {}
  
//Scroll Top to Bottom for notification
  public triggerScrollTo() {
      const config: ScrollToConfigOptions = {
        target: 'destination',
        offset: 200
      };
      this._scrollToService.scrollTo(config);
    }
  }

 
