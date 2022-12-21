import {Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'

})

export class GlobalsService {
   
  private data = {};  
  backBtn:boolean=true;
  //observationGlow:any=[];
  observationGlowSupply:boolean=false;
  observationGlowInspection:boolean=false;
  observationGlowTesting:boolean=false;
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
  mainActualLoad:any=[];
  mainNominalVoltageValue:String="";
  mainLoopImpedanceValue:String="";
  mainNominalCurrentValue:String="";
  mainActualLoadValue:String="";
//viewer inspector details
  viewerName!: String;
  inspectorName!: String;
  siteName!: String;
  //viewerData: any = [];
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
 allStepsCompletedEmc:boolean=false;
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
 jointType: any;
 noOfjoint: any; 
 msgForStep1:boolean=false;
 msgForStep1Flag:boolean=false;
 lvClick: number=0;
 lpsClick: number=0;
 sldClick: number=0;  
 windowTabClick: number=0; 
 logoutClick:number=0;
 disableSubmitElectromagnetic:boolean=false;
 editableEmc: boolean = true;
 isCompletedEmc: boolean = true;
 isCompletedEmc1: boolean = true;
 isCompletedEmc2: boolean = true;
 isCompletedEmc3: boolean = true;
 isLinearEmc: boolean=false;
 isCompleted6: boolean = true;
 isCompleted7: boolean = true;
 isCompleted8: boolean = true; 
 enableDownload: boolean = false;
 pdfError: String="";
//remember me
autoLoginToken:number=0;
  sigInput: number=0;
  signatureImg1: String="";
  signatureImg2: String="";
  signatureImg3: String="";
  signatureImg4: String="";
  signatureImg5: String="";
  signatureImg6: String="";

  signatureImg7: String="";
  signatureImg8: String="";

  bytestring1: String="";
  bytestring2: String="";
  bytestring3: String="";
  bytestring4: String="";
  bytestring5: String="";
  bytestring6: String="";

  bytestring7: String="";
  bytestring8: String="";
  emailCheck: boolean=false;
   // LPS License page
  triggerMsgForLicense: String="";
  headerMsg: String="";
  basicLPSID: number=0;
  toggle: boolean=false;
  globalErrorMsg: string="";
  siteData: any;

  viewerData: any = {
    address: "",
    applicationType: "",
    assignedBy: "",
    comment: "",
    companyName: "",
    contactNumber: "",
    country: "",
    createdBy: "",
    createdDate: "",
    department: "",
    designation: "",
    district: "",
    name: "",
    noOfLicence: "",
    otpSessionKey: "",
    password: "",
    permission: "",
    permissionBy: "",
    pinCode: "",
    registerId: "",
    role: "",
    state: "",
    updatedBy: "",
    updatedDate: "",
    username: "",
    siteName: "",
    siteId: "",
  };

  cartIndex: any=[];
  
  checkGrandtotal: number=0;
  // private newUser = new BehaviorSubject<any>({
  //   firstName: 'Kevin',
  //   email: 'ksmith@fanreact.com',
  //   g: 'M'
  // });

  // private message = new BehaviorSubject<any>(this.grand);
 // sharedMessage = this.message.asObservable();
  
 constructor(private _scrollToService: ScrollToService
  ) {}

  
//Scroll Top to Bottom for notification
  public triggerScrollTo() {
      const config: ScrollToConfigOptions = {
        target: 'destination',
        offset: 200
      };
      this._scrollToService.scrollTo(config);
    }

    // Lps License page
  licensePageHeaging(){
    if(this.headerMsg=="lpsPage"){
      this.triggerMsgForLicense="lpsPage";
      
    }
    else if(this.headerMsg=="lvPage"){
      this.triggerMsgForLicense="lvPage";
    }
    else{
      this.triggerMsgForLicense="";
    }
  }
  
}

 
