import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { MatTab, MatTabGroup, MatTabHeader } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationBoxComponent } from 'src/app/confirmation-box/confirmation-box.component';
import { GlobalsService } from 'src/app/globals.service';
import { CustomerDetailsServiceService } from '../../Risk Assessment Services/customer-details-service.service';
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

  isCompleted: boolean = true;
  isLinear:boolean=false; 
  editable:boolean=false;
  isCompleted2: boolean=false;
  step1: boolean = true;
  step2: boolean = true;
  selectedIndex: any;
  customerFlag: boolean=true;
  riskFlag: boolean=true;

  @ViewChild(RiskCustomerDetailsComponent)
  customerDetails!: RiskCustomerDetailsComponent;
  @ViewChild(RiskAssessmentDetailsComponent)
  riskStep2!: RiskAssessmentDetailsComponent;
  isEditable:boolean=false;

  dataJSON: any = [];
  @ViewChild(RiskSavedReportsComponent)saved!: RiskSavedReportsComponent;
  @ViewChild(RiskFinalReportsComponent)final!: RiskFinalReportsComponent;
  @ViewChild('tabs') tabs!: MatTabGroup;

  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
  @ViewChild('stepper', { static: false }) stepper!: MatStepper;

  constructor(
          private customerDetailsService: CustomerDetailsServiceService,
          public service: GlobalsService, private router: ActivatedRoute,
          private dialog: MatDialog,
    ) { }

  ngOnInit(): void {
  }

  public doSomething1(next: any): void {
    this.service.isLinear=false;
    this.service.isCompleted = next;

    if (this.customerDetails.isCustomerFormUpdated) {
      this.initializeRiskId();
      this.riskStep2.isRiskFormUpdated = true;
      this.riskStep2.ngOnInit();
      // this.riskStep2.updateMethod();
      this.customerDetails.isCustomerFormUpdated=false;
    }
    this.saved.ngOnInit();
  }

  public doSomething2(next: any): void {
    this.service.isLinear=false;
    this.service.isCompleted8 = next;
    this.saved.ngOnInit();
    this.final.ngOnInit();
  }

  triggerClickTab(){
    this.customerDetails.gotoNextTab();
    this.riskStep2.gotoNextTab();
  }

  goBack(stepper: MatStepper) {
    if(this.isEditable && !this.riskStep2.reloadFromBack()){
      this.riskStep2.validationErrorTab=false;
      stepper.previous();
    }
    else if(this.riskStep2.reloadFromBack()){
      stepper.previous();
    }
  }

  navigateStep(index: any) {
    this.selectedIndex = index;
  }

  navigateStepMethod(e: any) {
    this.navigateStep(e);
  }

  continue(riskId: any): void {
    this.ngOnInit();
    this.isEditable=false;
   // this.doSomething1(false);
    this.changeTabLpsSavedReport(0,riskId,this.router.snapshot.paramMap.get('email') || '{}');

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
    this.changeTabLpsSavedReport(0,riskId,this.router.snapshot.paramMap.get('email') || '{}');
  }

  public onCallSavedMethod(e: any) {
    this.continue(e);
  }

  public onCallFinalMethod(e: any) {
    this.preview(e);
  }

  public changeTabLpsSavedReport(index: number, riskId: any, userName: any) {
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
           
           if (this.dataJSON.customerDetails != null && this.dataJSON.riskStep2 != null) {
             this.service.allFieldsDisable = true;
           }
           // Customer Details
           if (this.dataJSON.customerDetails != null) {
             this.selectedIndex = index;
             this.customerDetails.updateCustomerDetails(riskId, this.dataJSON);
             this.riskStep2.appendRiskId(riskId);  
             this.initializeRiskId(); 
           }
          // Risk Assessment Details
             if (this.dataJSON.riskStep2 == null) {
              setTimeout(() => {
                this.riskStep2.ngOnInit();
           }, 1000);
           }
           else {
            setTimeout(() => {
              this.riskStep2.updateRiskDetails(userName, riskId, this.dataJSON);
            }, 5000);
          }
        },
         (error) => {
         }
       )
     }, 3000);
   }

   interceptTabChange(tab: MatTab, tabHeader: MatTabHeader) {
    if((this.service.lvClick==1) && (this.service.allStepsCompleted==true))
       {
        const dialogRef = this.dialog.open(ConfirmationBoxComponent, {
          width: '420px',
          maxHeight: '90vh',
          disableClose: true,
        });
        dialogRef.componentInstance.editModal = false;
        dialogRef.componentInstance.viewModal = false;
        dialogRef.componentInstance.triggerModal = true;
        dialogRef.componentInstance.linkModal = false;
    
        dialogRef.componentInstance.confirmBox.subscribe(data=>{
          if(data) {
           
            if(tab.textLabel == "Saved Reports"){
              this.selectedIndex=1; 
            }
            else if(tab.textLabel == "Final Reports"){
              this.selectedIndex=2; 
            }
            this.service.windowTabClick=0;
            this.service.logoutClick=0; 
            this.service.lvClick=0; 
          }
          else{
            return;
          }
        })
        }
        else if((this.service.lvClick==0) || (this.service.allStepsCompleted==false)){
        this.service.windowTabClick=0;
        this.service.logoutClick=0;
        this.service.lvClick=0; 
        const tabs = tab.textLabel;
        if((tabs==="Lightning Protection System"))  {
             this.selectedIndex=0; 
          }
          else if((tabs==="Saved Reports")){
            this.selectedIndex=1;
            if(this.customerDetails.customerDetailsModel.riskId != undefined){
              this.saved.retrieveCustomerDetails();
              this.saved.disablepage=true;
            }
          }    
          else{
            this.selectedIndex=2; 
          }        
        }
  }

  initializeRiskId(){
    this.customerDetails.isEditable=this.isEditable;
    // Risk Assessment Details
    this.riskStep2.appendRiskId(this.riskStep2.riskAssessmentDetails.riskId);   
    this.riskStep2.riskId=this.riskStep2.riskAssessmentDetails.riskId;   
    this.riskStep2.isEditable=this.isEditable;
  }
}
