import { Component, EventEmitter, OnInit, Output, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { LpsBasicPageComponent } from '../lps-basic-page/lps-basic-page.component';
import { LpsAirTerminationComponent } from '../lps-air-termination/lps-air-termination.component';
import { LpsDownConductorsComponent } from '../lps-down-conductors/lps-down-conductors.component';
import { LpsEarthingComponent } from '../lps-earthing/lps-earthing.component';
import { LpsEarthStudComponent } from '../lps-earth-stud/lps-earth-stud.component';
import { LpsSeperationDistanceComponent } from '../lps-seperation-distance/lps-seperation-distance.component';

import { LpsSpdComponent } from '../lps-spd/lps-spd.component';
import { LPSBasicDetailsService } from 'src/app/LPS_services/lpsbasic-details.service';
import { LpsSavedReportComponent } from '../lps-saved-report/lps-saved-report.component';
import { LpsFinalReportComponent } from '../lps-final-report/lps-final-report.component';
import { AirterminationService } from 'src/app/LPS_services/airtermination.service';
import { SeparatedistanceService } from 'src/app/LPS_services/separatedistance.service';
import { MatTabGroup, MatTabHeader, MatTab } from '@angular/material/tabs';
import { GlobalsService } from 'src/app/globals.service';
import { ConfirmationBoxComponent } from 'src/app/confirmation-box/confirmation-box.component';
import { tree } from 'ngx-bootstrap-icons';
import { LpssummaryComponent } from '../lpssummary/lpssummary.component';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-lps-matstepper',
  templateUrl: './lps-matstepper.component.html',
  styleUrls: ['./lps-matstepper.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class LpsMatstepperComponent implements OnInit {

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
  @ViewChild('stepper', { static: false }) stepper!: MatStepper;

  selectedIndex: any;
  // Completed1: boolean=true;
  //Completed2: boolean=true;
  Completed3: boolean=true;
  Completed4: boolean=true;
  Completed5: boolean=true;
  Completed6: boolean=true;
  Completed7: boolean=true;
  Completed8: boolean=true;

  // Completed8: boolean=true;


  basicDetails: boolean = true;
  airTermValue: boolean = true;
  downValue: boolean = true;
  earthingValue: boolean = true;
  spdValue: boolean = true;
  seperationValue: boolean = true;
  equipotentialBond: boolean = true;
  summary: boolean = true;

  @ViewChild(LpsBasicPageComponent)
  basic!: LpsBasicPageComponent;
  @ViewChild(LpsAirTerminationComponent)
  airTermination!: LpsAirTerminationComponent;
  @ViewChild(LpsDownConductorsComponent)
  downConductors!: LpsDownConductorsComponent;
  @ViewChild(LpsEarthingComponent)
  earthing!: LpsEarthingComponent;
  @ViewChild(LpsSpdComponent)
  spd!: LpsSpdComponent;
  @ViewChild(LpsSeperationDistanceComponent)
  seperationDistance!: LpsSeperationDistanceComponent;
  @ViewChild(LpsEarthStudComponent)
  earthStud!: LpsEarthStudComponent;
  @ViewChild(LpssummaryComponent)
  lpsSummary!: LpssummaryComponent;
 
  dataJSON: any = [];
  @ViewChild(LpsSavedReportComponent)saved!: LpsSavedReportComponent;
  @ViewChild(LpsFinalReportComponent)final!: LpsFinalReportComponent;
  @ViewChild('tabs') tabs!: MatTabGroup;

  isEditable:boolean=false;

  constructor(
    private _formBuilder: FormBuilder,private dialog: MatDialog,
    private basicLpsService: LPSBasicDetailsService,
    private router: ActivatedRoute, public service: GlobalsService,
    private ChangeDetectorRef: ChangeDetectorRef,
    private airterminationServices: AirterminationService,
 
    ) { 
    }

  ngOnInit(): void {
    this.refresh();
    this.tabs._handleClick = this.interceptTabChange.bind(this);
  }
  public doSomething1(next: any): void {
    this.service.isLinear=false;
    this.service.isCompleted = next;

    if (this.basic.isBasicFormUpdated) {
      this.initializeLpsId();
      this.earthing.isAirterminationUpdated = true;
      this.earthing.ngOnInit();
      this.downConductors.updateMethod();
      this.basic.isBasicFormUpdated=false;
    }

    this.saved.ngOnInit();
    this.refresh();
  }
  public doSomething2(next: any): void {
    this.service.isLinear = false;
    this.service.isCompleted2 = next;
    if (this.airTermination.isAirterminationUpdated) {
      //this.summary = false;
      this.earthing.isAirterminationUpdated = true;
      this.spd.isAirterminationUpdated = true;
      this.seperationDistance.isAirterminationUpdated = true;
      this.earthStud.isAirterminationUpdated = true;
      this.downConductors.updateMethod();
      this.earthing.ngOnInit();
      this.spd.ngOnInit();
      this.seperationDistance.ngOnInit();
      this.earthStud.ngOnInit();
      //this.summary = true;
     // setTimeout(() => {
      this.lpsSummary.flag1=false;
        this.lpsSummary.ngOnInit();
     // }, 1000);
      this.initializeLpsId();
      this.airTermination.isAirterminationUpdated = false;
      setTimeout(() => {
        this.getAirterminationData(this.basic.basicDetails.basicLpsId);
      }, 3000);
    }
    else {
      this.downConductors.updateMethod();
    }
  }

  public doSomething3(next: any): void {
    this.service.isLinear=false;
    this.service.isCompleted3 = next;
    if(next){
      this.lpsSummary.flag1=false;
      this.lpsSummary.ngOnInit();
    }
  }

  public doSomething4(next: any): void {
    this.service.isLinear=false;
    this.service.isCompleted4 = next;
    if(next){
      this.lpsSummary.flag1=false;
      this.lpsSummary.ngOnInit();
    }
    this.refresh();
  }

  public doSomething5(next: any): void {
    this.service.isLinear=false;
    this.service.isCompleted5 = next;
    if(next){
      this.lpsSummary.flag1=false;
      this.lpsSummary.ngOnInit();
    }
  }
  public doSomething6(next: any): void {
    this.service.isLinear=false;
    this.service.isCompleted6 = next;
    if(next){
      this.lpsSummary.flag1=false;
      this.lpsSummary.ngOnInit();
    }
  }
  public doSomething7(next: any): void {
    this.service.isLinear=false;
    this.service.isCompleted7 = next;
    if(next){
      this.lpsSummary.flag1=false;
      this.lpsSummary.ngOnInit();
    }
  }
  public doSomething8(next: any): void {
    this.service.isLinear=false;
    this.service.isCompleted8 = next;
    this.saved.ngOnInit();
    this.final.ngOnInit();
  }

  public onCallSavedMethod(e: any) {
    this.continue(e);
  }

  public onCallFinalMethod(e: any) {
    this.preview(e);
  }

  public changeTabLpsSavedReport(index: number, basicLpsId: any, userName: any) {
   // this.selectedIndex = 1;
    this.basicDetails = false;
    this.airTermValue = false;
    this.downValue = false;
    this.earthingValue = false;
    this.spdValue = false;
    this.seperationValue = false;
    this.equipotentialBond = false;
    this.summary=false;
    setTimeout(() => {
      this.basicDetails = true;
      this.airTermValue = true;
      this.downValue = true;
      this.earthingValue = true;
      this.spdValue = true;
      this.seperationValue = true;
      this.equipotentialBond = true;
      this.summary = true;
    }, 50);

    setTimeout(() => {
      this.basicLpsService.retrieveFinalLps(userName, basicLpsId).subscribe(
        (data) => {
          this.final.finalReportSpinner = false;
          this.final.finalReportBody = true;
          this.dataJSON = JSON.parse(data);
          
          if (this.dataJSON.basicLps != null
            && this.dataJSON.airTermination != null
            && this.dataJSON.downConductorDesc != null
            && this.dataJSON.earthingReport != null && this.dataJSON.spdReport != null
            && this.dataJSON.seperationDistanceReport != null && this.dataJSON.earthStudReport != null
            && this.dataJSON.summaryLps != null) {
            this.service.allFieldsDisable = true;
            this.service.disableSubmitSummary = true;
          }
          //basic
          if (this.dataJSON.basicLps != null) {
            this.selectedIndex = index;
            this.basic.retrieveDetailsfromSavedReports(basicLpsId, this.dataJSON);
            this.airTermination.appendBasicLpsId(basicLpsId);  
            this.initializeLpsId();
             
          }

          //airTermination
          if (this.dataJSON.airTermination != null) {
            this.airTermination.retrieveDetailsfromSavedReports(userName, basicLpsId, this.dataJSON);

            //downConductor
            this.downConductors.retrieveDetailsfromSavedReports(userName, basicLpsId, this.dataJSON);

            //earthing
            if (this.dataJSON.earthingReport != null) {
              this.earthing.retrieveDetailsfromSavedReports(basicLpsId, this.dataJSON);
              this.Completed4 = true;
            }
            else {
              this.earthing.createEarthingForm(this.dataJSON.airTermination);
            }

            //spdReport
            if (this.dataJSON.spdReport != null) {
              this.spd.retrieveDetailsfromSavedReports(this.dataJSON);
              this.Completed5 = true;
            }
            else {
              this.spd.createSpdForm(this.dataJSON.airTermination);
            }

            //seperationDistance
            if (this.dataJSON.seperationDistanceReport != null) {
              this.seperationDistance.retrieveDetailsfromSavedReports(this.dataJSON);
              this.Completed6 = true;
            }
            else {
              this.seperationDistance.createSeperationForm(this.dataJSON.airTermination);
            }

            //Equipotential Bonding
            if (this.dataJSON.earthStudReport != null) {
              this.earthStud.retrieveDetailsfromSavedReports(this.dataJSON);
              this.Completed7 = true;
            }
            else {
              this.earthStud.createearthStudForm(this.dataJSON.airTermination);
            }
             //summary
            // this.lpsSummary.spinner = true;
            // this.lpsSummary.spinnerValue = "Please wait, the details are loading!";
            if (this.dataJSON.summaryLps == null) {
              setTimeout(() => {
                this.lpsSummary.ngOnInit();
              }, 1000);
            }
            else {
              setTimeout(() => {
                this.lpsSummary.retrieveDetailsfromSavedReports(userName, basicLpsId, this.dataJSON);
                setTimeout(() => {
                  this.lpsSummary.spinner = false;
                  this.lpsSummary.spinnerValue = "";
                }, 7000);
              }, 5000);
            }
          }  
       },
        (error) => {

        }
      )
    }, 3000);

  }

  // Final Report 
  changeTab1(index: number): void {
    this.ngOnInit();
    let userName=this.router.snapshot.paramMap.get('email') || '{}';
   // this.doSomething1(false);
    this.changeTabLpsSavedReport(index,this.earthStud.basicLpsId,userName);
    this.selectedIndex = index;
    
  }
  refresh() {
    
    this.ChangeDetectorRef.detectChanges();
  }

  interceptTabChange(tab: MatTab, tabHeader: MatTabHeader) {
    if (this.airTermination.airTerminationForm.dirty && this.airTermination.airTerminationForm.touched) {
      let flag=false;
      this.airTermination.updateFileIdIndex(flag);
    }
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
        dialogRef.componentInstance.summaryModal = false;
    
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
      //   if(confirm("Are you sure you want to proceed without saving?\r\n\r\nNote: To update the details, kindly click on next button!")){
      //     this.selectedIndex=1; 
      //     this.service.windowTabClick=0;
      //     this.service.logoutClick=0; 
      //     this.service.lvClick=0; 
      // }
      // else{
      //   return;
      // }
        }
        else if((this.service.lvClick==0) || (this.service.allStepsCompleted==false)){
        this.service.windowTabClick=0;
        this.service.logoutClick=0;
        this.service.lvClick=0; 
        const tabs = tab.textLabel;
        if((tabs==="Lightning Protection System"))  {
             this.selectedIndex=0; 
              // this.basic.reset();
              // this.airTermination.reset();
              // this.downConductors.reset();
              // this.earthing.reset();
              // this.spd.reset();
              // this.seperationDistance.reset();
              // this.earthStud.reset();
              // this.changeTab1(0);
          }
          else if((tabs==="Saved Reports")){
            this.selectedIndex=1;
            if(this.basic.basicDetails.basicLpsId != undefined){
              // this.changeTabLpsSavedReport(1,this.basic.basicDetails.basicLpsId,this.router.snapshot.paramMap.get('email') || '{}');
              this.saved.retrieveLpsDetails();
              this.saved.disablepage=true;
              // setTimeout(() => {
              //   this.saved.spinner=true;
              // }, 3000);
            }
          }    
          else{
            this.selectedIndex=2; 
          }        
        }
  }

  preview(basicLpsId: any): void {
    this.ngOnInit();
    this.isEditable=true;
    this.changeTabLpsSavedReport(0,basicLpsId,this.router.snapshot.paramMap.get('email') || '{}');
  //  this.doSomething1(false);
  }

  continue(basicLpsId: any): void {
    this.refresh();
    this.ngOnInit();
    this.isEditable=false;
   // this.doSomething1(false);
    this.changeTabLpsSavedReport(0,basicLpsId,this.router.snapshot.paramMap.get('email') || '{}');

    setTimeout(() => {
      this.saved.spinner=false;
      setTimeout(() => {
      this.saved.disablepage=true;
         }, 1000);
    }, 3000);
  }

  getAirterminationData(basicLpsId: any) {
    this.airterminationServices.retriveAirTerminationDetails(this.router.snapshot.paramMap.get('email') || '{}', basicLpsId).subscribe(
      data => {
        this.createFormForAirterminationBuilding(JSON.parse(data)[0]);
      }
    );
  }

  createFormForAirterminationBuilding(airtermination: any) {
    this.earthing.createEarthingForm(airtermination);
    this.spd.createSpdForm(airtermination);
    this.seperationDistance.createSeperationForm(airtermination);
    this.earthStud.createearthStudForm(airtermination);
  }

  navigateStep(index: any) {
    this.selectedIndex = index;
  }

  navigateStepMethod(e: any) {
    this.navigateStep(e);
  }

  initializeLpsId(){
    this.downConductors.availabilityOfPreviousReport = this.basic.availableReportNo;
    this.earthing.availabilityOfPreviousReport = this.basic.availableReportNo;
    
    setTimeout(() => {
      if(this.basic.availableReportNo == 'No'){
        this.downConductors.validationTesting();
        this.earthing.validationTesting1();
      }
    }, 3000);

    this.basic.isEditable=this.isEditable;
    // AirTermination
    this.airTermination.appendBasicLpsId(this.basic.basicDetails.basicLpsId);   
    this.airTermination.basicLpsId=this.basic.basicDetails.basicLpsId;   
    this.airTermination.isEditable=this.isEditable;
    // DownConductor
    this.downConductors.basicLpsId=this.basic.basicDetails.basicLpsId;
    this.downConductors.isEditable=this.isEditable;
    // Earthing
    this.earthing.basicLpsId=this.basic.basicDetails.basicLpsId;
    this.earthing.isEditable=this.isEditable;
    // SPD
    this.spd.basicLpsId=this.basic.basicDetails.basicLpsId;
    this.spd.isEditable=this.isEditable;
    // Seperation Distance
    this.seperationDistance.basicLpsId=this.basic.basicDetails.basicLpsId;
    this.seperationDistance.isEditable=this.isEditable;
    // EarthStud
    this.earthStud.basicLpsId=this.basic.basicDetails.basicLpsId;
    this.earthStud.isEditable=this.isEditable;
    // Summary
    this.lpsSummary.basicLpsId=this.basic.basicDetails.basicLpsId;
    this.lpsSummary.isEditable=this.isEditable;
  }

  triggerClickTab(){
    this.basic.gotoNextTab();
    this.airTermination.gotoNextTab();
     this.downConductors.gotoNextTab();
     this.earthing.gotoNextTab();
     this.spd.gotoNextTab();
     this.seperationDistance.gotoNextTab();
     this.earthStud.gotoNextTab(); 
     this.lpsSummary.gotoNextTab(); 
  }

  goBack2(stepper: MatStepper) {
    if(this.airTermination.reloadFromBack()){
      stepper.previous();
    }
  }
  goBack3(stepper: MatStepper) {
    if(this.downConductors.reloadFromBack()){
      stepper.previous();
    }
  }
  goBack4(stepper: MatStepper) {
    if(this.earthing.reloadFromBack()){
      stepper.previous();
    }
  }
  goBack5(stepper: MatStepper) {
    if(this.spd.reloadFromBack()){
      stepper.previous();
    }
  }
  goBack6(stepper: MatStepper) {
    if(this.seperationDistance.reloadFromBack()){
      stepper.previous();
    }
  }
  goBack7(stepper: MatStepper) {
    if(this.earthStud.reloadFromBack()){
      stepper.previous();
    }
  }
  goBack8(stepper: MatStepper) {
    if(this.lpsSummary.reloadFromBack()){
      stepper.previous();
    }
  }
}
