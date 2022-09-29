import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { MatTab, MatTabGroup, MatTabHeader } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
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
  

  constructor(
          private customerDetailsService: CustomerDetailsServiceService,
          public service: GlobalsService, private router: ActivatedRoute,
          private dialog: MatDialog,private ChangeDetectorRef: ChangeDetectorRef,
          private riskGlobal: RiskglobalserviceService,
    ) { }

  ngOnInit(): void {
    this.riskGlobal.riskId=0;
    this.refresh();
    // this.tabs._handleClick = this.interceptTabChange.bind(this);
  }

  public doSomething1(next: any): void {
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
  }

  public doSomething2(next: any): void {
    this.service.isLinear=false;
    this.service.isCompleted2 = next;
    this.saved.ngOnInit();
  }

  navigateStep(index: any) {
    this.selectedIndex = index;
  }

  navigateStepMethod(e: any) {
    this.navigateStep(e);
  }

  continue(riskId: any): void {
    this.refresh();
    this.ngOnInit();
    this.riskStep2.updateButton=true;
    this.riskStep2.saveButton=false;
    this.selectedIndex=1;
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
          // this.final.finalReportSpinner = false;
          // this.final.finalReportBody = true;
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
            this.riskStep2.enablePrint = false;
          }
        },
        (error) => {

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
  }

  triggerClickTab(){
    this.customerDetails.gotoNextTab();
    this.riskStep2.gotoNextTab();
  }

  goBack(stepper: MatStepper) {
    if(this.riskStep2.reloadFromBack()){
      stepper.previous();
    }
  }
}


