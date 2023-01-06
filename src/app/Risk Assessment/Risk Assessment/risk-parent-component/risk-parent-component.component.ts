import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { MatTab, MatTabGroup, MatTabHeader } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { debug } from 'console';
import { flag } from 'ngx-bootstrap-icons';
import { ConfirmationBoxComponent } from 'src/app/confirmation-box/confirmation-box.component';
import { GlobalsService } from 'src/app/globals.service';
import { CustomerDetailsServiceService } from '../../Risk Assessment Services/customer-details-service.service';
import { RiskglobalserviceService } from '../../riskglobalservice.service';
import { RiskAssessmentDetailsComponent } from '../risk-assessment-details/risk-assessment-details.component';
import { RiskCustomerDetailsComponent } from '../risk-customer-details/risk-customer-details.component';
import { RiskFinalReportsComponent } from '../risk-final-reports/risk-final-reports.component';
import { RiskSavedReportsComponent } from '../risk-saved-reports/risk-saved-reports.component';

@Component({
  selector: 'app-risk-parent-component',
  templateUrl: './risk-parent-component.component.html',
  styleUrls: ['./risk-parent-component.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class RiskParentComponentComponent implements OnInit {


  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
  @ViewChild('stepper', { static: false }) stepper!: MatStepper;

  step1: boolean = true;
  step2: boolean = true;
  selectedIndex: any;
  customerFlag: boolean=true;
  riskFlag: boolean=true;
  gfdDirtyCheck: boolean=false;
  step2FormClick: boolean=false;

  @ViewChild(RiskCustomerDetailsComponent)
  customerDetails!: RiskCustomerDetailsComponent;
  @ViewChild(RiskAssessmentDetailsComponent)
  riskStep2!: RiskAssessmentDetailsComponent;
  isEditable:boolean=false;

  dataJSON: any = [];
  @ViewChild(RiskSavedReportsComponent)saved!: RiskSavedReportsComponent;
  @ViewChild(RiskFinalReportsComponent)final!: RiskFinalReportsComponent;
  @ViewChild('tabs') tabs!: MatTabGroup;

  migData: String='';
  index: any;
  selectedIndexStepper: number=0;
  nextButtonClicked=false;
  step1NxtClicked: boolean=false;
  globalError: boolean=false;
  globalErrorMsg: string="";

  constructor(
          private customerDetailsService: CustomerDetailsServiceService,
          public service: GlobalsService, private router: ActivatedRoute,
          private dialog: MatDialog,private ChangeDetectorRef: ChangeDetectorRef,
          private riskGlobal: RiskglobalserviceService,
    ) { }

  ngOnInit(): void {

    this.riskGlobal.riskId=0;
    this.refresh();
    this.presentSteppr(this.stepper);
    this.tabs._handleClick = this.interceptTabChange.bind(this);
    
  }

  public doSomething1(next: any,event:any): void {
    this.service.isLinear=false;
    this.service.isCompleted = next;

    if (this.customerDetails.isCustomerFormUpdated) {
      this.initializeRiskId();
      this.riskStep2.isRiskFormUpdated = true;
      // this.riskStep2.updateMethod();
      this.customerDetails.isCustomerFormUpdated=false;
      this.isForm1Valid();
    }
    this.saved.ngOnInit();
    this.triggerClickTab(event);
  }

  public doSomething2(next: any): void {
    this.service.isLinear=false;
    this.service.isCompleted2 = next;
    this.saved.ngOnInit();
    this.final.ngOnInit();
  }

  navigateStep(index: any) {
    this.selectedIndex = index;
  }

  navigateStepMethod(e: any) {
    this.navigateStep(e);
  }

  continue(riskId: any): void {
    // this.riskGlobal.step2FormClick=false;
    this.refresh();
    this.ngOnInit();
    this.riskStep2.updateButton=true;
    this.riskStep2.saveButton=false;
    this.selectedIndex=1;
    this.isEditable=false;
    this.changeTabRiskSavedReport(0,riskId,this.router.snapshot.paramMap.get('email') || '{}','','');
    setTimeout(() => {
      this.saved.spinner=false;
      setTimeout(() => {
      this.saved.disablepage=true;
         }, 1000);
    }, 3000);
  }

  preview(riskId: any): void {
    this.ngOnInit();
    this.isEditable=true;
    this.changeTabRiskSavedReport(0,riskId,this.router.snapshot.paramMap.get('email') || '{}','','');
  }

  public onCallSavedMethod(e: any) {
    this.continue(e);
  }

  public onCallFinalMethod(e: any) {
    this.preview(e);
  }
  
  refresh() {  
    this.ChangeDetectorRef.detectChanges();
  }
  
  presentSteppr(stepper: MatStepper){
    // stepper._getFocusIndex() - refrence method
    if(stepper._getFocusIndex()==1){
      this.riskGlobal.presentedStep=1;
    }
    else{
      this.riskGlobal.presentedStep=0;
    }
  }

  public changeTabRiskSavedReport(index: number, riskId: any, userName: any,event:any,form:any) {
    this.step1 = false;
    this.step2 = false;
    setTimeout(() => {
      this.step1 = true;
      this.step2 = true;
    }, 50);

     setTimeout(() => {
       this.customerDetailsService.retrieveFinalRisk(userName, riskId).subscribe(
        (data) => {
          this.final.finalReportSpinner = false;
          this.final.finalReportBody = true;
          this.dataJSON = JSON.parse(data);
          //CustomerDetails
          if (this.dataJSON.customerDetails != null) {
            this.selectedIndex=index;
            this.customerDetails.updateCustomerDetails(this.dataJSON);
            this.riskStep2.appendRiskId(riskId,this.dataJSON.customerDetails.projectName,this.dataJSON.customerDetails.organisationName);            
            this.initializeRiskId();
            this.isForm1Valid();
          }
          //Risk Assessment Details
          if (this.dataJSON.structureCharacteristics != null) {
            this.selectedIndex=index;
            this.riskStep2.updateRiskDetails(this.dataJSON.userName,this.dataJSON.riskId,this.dataJSON);
            
            // Migrated Data purpose
            if(this.dataJSON.customerDetails.createdBy!=undefined && this.dataJSON.customerDetails.createdBy!=null && this.dataJSON.customerDetails.createdBy!="" && this.dataJSON.customerDetails.createdBy=="Migrated Data"){
              this.riskStep2.migratedData(event,this.riskStep2.step2Form);
            }
          }  
          else {
            this.riskStep2.enableSubmit = false;
          }
        },
        (error) => {
          this.globalError=true;
          this.globalErrorMsg=this.service.globalErrorMsg;
          setTimeout(() => {
            this.globalError=false;
            this.globalErrorMsg="";
          }, 10000);
        })
      }, 3000);
  }

  isForm1Valid(){
    if(this.customerDetails.CustomerDetailsForm.invalid && this.customerDetails.customerDetailsModel.contactNumber==null && this.customerDetails.customerDetailsModel.contactNumber==undefined && this.customerDetails.customerDetailsModel.contactNumber==""){
     this.riskGlobal.isCustomerDetailsValid=true;
     this.customerDetails.isStep1Valid();
    }
    else if(this.customerDetails.CustomerDetailsForm.invalid && this.customerDetails.customerDetailsModel.contactNumber!=null && this.customerDetails.customerDetailsModel.contactNumber!=undefined && this.customerDetails.customerDetailsModel.contactNumber!=""){
     this.riskGlobal.isCustomerDetailsValid=true;
     this.customerDetails.isStep1Valid();
    }
    else{
     this.riskGlobal.isCustomerDetailsValid=false;
    }
  }


  initializeRiskId(){
    // Risk Assessment Details
    this.riskStep2.riskId=this.customerDetails.customerDetailsModel.riskId;
    this.riskStep2.projectName = this.customerDetails.customerDetailsModel.projectName;
    this.riskGlobal.riskId=this.customerDetails.customerDetailsModel.riskId;
    this.riskGlobal.projectName = this.customerDetails.customerDetailsModel.projectName;
    this.riskGlobal.migData=this.customerDetails.customerDetailsModel.createdBy;
    this.riskGlobal.organisationName=this.customerDetails.customerDetailsModel.organisationName;
    // Disabling all the fields for both components 
    this.customerDetails.isEditable=this.isEditable;
    this.riskStep2.isEditable=this.isEditable;
  }

  triggerClickTab(event:any){

    this.customerDetails.gotoNextTab();
    this.riskStep2.step2DirtyCheck=true;
    
    if(this.riskGlobal.dirtyCheck==true && this.step1NxtClicked==true){
      this.nextButtonClicked=true;
    }else{
      this.nextButtonClicked=false;
    }

    this.riskStep2.gotoNextTab(event);;
  }

  goBack(stepper: MatStepper) {
    if(this.riskStep2.reloadFromBack()){
      stepper.previous();
    }
  }

  interceptTabChange(tab: MatTab, tabHeader: MatTabHeader) {

    if((this.service.lpsClick==1 && this.isEditable) || (this.customerDetails.CustomerDetailsForm.dirty || this.riskStep2.step2Form.dirty))
       {
        const dialogRef = this.dialog.open(ConfirmationBoxComponent, {
          width: '420px',
          maxHeight: '90vh',
          disableClose: true,
        });
        dialogRef.componentInstance.editModal = false;
        dialogRef.componentInstance.viewModal = false;

        if(this.customerDetails.fileFlag || this.riskStep2.fileFlag){
          dialogRef.componentInstance.triggerModal1 = true;
        }

        else {
          dialogRef.componentInstance.triggerModal = true;
        }

        dialogRef.componentInstance.linkModal = false;
        dialogRef.componentInstance.summaryModal = false;
    
        dialogRef.componentInstance.confirmBox.subscribe(data=>{
          if(data) {
            if(tab.textLabel == "Saved Reports"){
              this.selectedIndex=1; 
              this.riskGlobal.riskId = 0;

              // Making all forms as untouched or printine state
              this.customerDetails.CustomerDetailsForm.markAsPristine();
              this.riskStep2.step2Form.markAsPristine();

              // Removing form data
              this.step1 = false;
              this.step2 = false;
              setTimeout(() => {
                this.step1 = true;
                this.step2 = true;
              }, 1000);
              this.isEditable;
            }
            else if(tab.textLabel == "Final Reports"){
              this.selectedIndex=2; 
              this.riskGlobal.riskId = 0;

              // Making all forms as untouched or printine state
              this.customerDetails.CustomerDetailsForm.markAsPristine();
              this.riskStep2.step2Form.markAsPristine();
              this.isEditable;

              // Removing form data
              this.step1 = false;
              this.step2 = false;
              setTimeout(() => {
                this.step1 = true;
                this.step2 = true;
              }, 1000);
            }
            else if(tab.textLabel=="Risk Assessment"){
              this.selectedIndex=0;
              this.riskGlobal.riskId = 0;
            }
            this.service.windowTabClick=0;
            this.service.logoutClick=0; 
            this.service.lpsClick=0; 
          }
          else{
            return;
          }
        })
      }
    else if(((this.service.lpsClick==0) || (this.service.allStepsCompleted== true) && this.isEditable) || this.customerDetails){
        this.service.windowTabClick=0;
        this.service.logoutClick=0;
        this.service.lpsClick=0; 
        const tabs = tab.textLabel;
        if((tabs==="Risk Assessment"))  {
             this.selectedIndex=0; 
          }
          else if((tabs==="Saved Reports")){
            this.selectedIndex=1;
            if(this.customerDetails.customerDetailsModel.riskId != undefined){
              this.saved.retrieveCustomerDetails();
              this.saved.disablepage=true;
              this.service.triggerMsgForLicense="";
            }
          }    
          else{
            this.selectedIndex=2; 
          }        
    }
  }
}


