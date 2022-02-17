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
  selectedIndex: any;
  Completed1: boolean=true;
  Completed2: boolean=true;
  Completed3: boolean=true;
  Completed4: boolean=true;
  Completed5: boolean=true;
  Completed6: boolean=true;
  Completed7: boolean=true;
  // Completed8: boolean=true;

  basicDetails: boolean = true;
  airTermValue: boolean = true;
  downValue: boolean = true;
  earthingValue: boolean = true;
  spdValue: boolean = true;
  seperationValue: boolean = true;
  equipotentialBond: boolean = true;
  
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
  dataJSON: any = [];
  @ViewChild(LpsSavedReportComponent)saved!: LpsSavedReportComponent;
  @ViewChild(LpsFinalReportComponent)final!: LpsFinalReportComponent;
  @ViewChild('tabs') tabs!: MatTabGroup;

  isEditable:boolean=false;

  constructor(
    private _formBuilder: FormBuilder,private dialog: MatDialog,
    private basicLpsService: LPSBasicDetailsService,
    private router: ActivatedRoute, public service: GlobalsService,
    private ChangeDetectorRef: ChangeDetectorRef,) { 
    }

  ngOnInit(): void {
    this.refresh();
    this.tabs._handleClick = this.interceptTabChange.bind(this);
  }
  public doSomething1(next: any): void {
 
    this.basic.isEditable=this.isEditable;
    // AirTermination
    this.airTermination.basicLpsId=this.basic.basicDetails.basicLpsId;
    this.airTermination.ClientName=this.basic.basicDetails.clientName;
    this.airTermination.projectName=this.basic.basicDetails.projectName;
    this.airTermination.industryType=this.basic.basicDetails.industryType;
   // this.airTermination.buildingType=this.basic.basicDetails.buildingType;
    this.airTermination.isEditable=this.isEditable;
    // DownConductor
    this.downConductors.basicLpsId=this.basic.basicDetails.basicLpsId;
    this.downConductors.ClientName=this.basic.basicDetails.clientName;
    this.downConductors.projectName=this.basic.basicDetails.projectName;
    this.downConductors.industryType=this.basic.basicDetails.industryType;
    //this.downConductors.buildingType=this.basic.basicDetails.buildingType;
    this.downConductors.isEditable=this.isEditable;
    // Earthing
    this.earthing.basicLpsId=this.basic.basicDetails.basicLpsId;
    this.earthing.ClientName=this.basic.basicDetails.clientName;
    this.earthing.projectName=this.basic.basicDetails.projectName;
    this.earthing.industryType=this.basic.basicDetails.industryType;
   // this.earthing.buildingType=this.basic.basicDetails.buildingType;
    this.earthing.isEditable=this.isEditable;
    // SPD
    this.spd.basicLpsId=this.basic.basicDetails.basicLpsId;
    this.spd.ClientName=this.basic.basicDetails.clientName;
    this.spd.projectName=this.basic.basicDetails.projectName;
    this.spd.industryType=this.basic.basicDetails.industryType;
   // this.spd.buildingType=this.basic.basicDetails.buildingType;
    this.spd.isEditable=this.isEditable;
    // Seperation Distance
    this.seperationDistance.basicLpsId=this.basic.basicDetails.basicLpsId;
    this.seperationDistance.ClientName=this.basic.basicDetails.clientName;
    this.seperationDistance.projectName=this.basic.basicDetails.projectName;
    this.seperationDistance.industryType=this.basic.basicDetails.industryType;
    //this.seperationDistance.buildingType=this.basic.basicDetails.buildingType;
    this.seperationDistance.isEditable=this.isEditable;
    // EarthStud
    this.earthStud.basicLpsId=this.basic.basicDetails.basicLpsId;
    this.earthStud.ClientName=this.basic.basicDetails.clientName;
    this.earthStud.projectName=this.basic.basicDetails.projectName;
    this.earthStud.industryType=this.basic.basicDetails.industryType;
    //this.earthStud.buildingType=this.basic.basicDetails.buildingType;
    this.earthStud.isEditable=this.isEditable;

    this.Completed1 = this.basic.success;
    this.saved.ngOnInit();
    this.refresh();
  }
  public doSomething2(next: any): void {
    debugger
    this.Completed2 = this.airTermination.success;

   if(this.airTermination.airterminationDataDeleted) {
    this.downValue = false;
    this.earthingValue = false;
    this.spdValue = false;
    this.seperationValue = false;
    this.equipotentialBond = false;

    setTimeout(() => {
      this.downValue = true;
      this.earthingValue = true;
      this.spdValue = true;
      this.seperationValue = true;
      this.equipotentialBond = true;
    }, 500);

      setTimeout(() => {
      this.downConductors.dosomethingRetriveDownConductor(this.router.snapshot.paramMap.get('email') || '{}',this.basic.basicDetails.basicLpsId);  
      this.seperationDistance.dosomthingRetriveSeperationDistance(this.router.snapshot.paramMap.get('email') || '{}',this.basic.basicDetails.basicLpsId); 
      this.earthing.dosomethingRetriveEarthingDetails(this.router.snapshot.paramMap.get('email') || '{}',this.basic.basicDetails.basicLpsId); 
      this.spd.dosomthingRetriveSPD(this.router.snapshot.paramMap.get('email') || '{}',this.basic.basicDetails.basicLpsId); 
       // this.earthStud.retrieveDetails

      }, 500),setTimeout(() => {
        this.downConductors.createDwonconductorForm(this.airTermination.buildingNumberArr);
        this.seperationDistance.createSeperationForm(this.airTermination.buildingNumberArr)
      }, 500);;}
      else{
      this.downConductors.createDwonconductorForm(this.airTermination.buildingNumberArr);
      this.seperationDistance.createSeperationForm(this.airTermination.buildingNumberArr)
      }
      
    this.refresh();
  }

  public doSomething3(next: any): void {
    this.Completed3 = this.downConductors.success;
  }

  public doSomething4(next: any): void {
    this.Completed4 = this.earthing.success;
    this.refresh();
  }

  public doSomething5(next: any): void {
    this.Completed5 = this.spd.success;
  }
  public doSomething6(next: any): void {
    this.Completed6 = this.seperationDistance.success;
  }
  public doSomething7(next: any): void {
    this.Completed7 = this.earthStud.success;
    // this.final.ngOnInit();
  }
  // public doSomething8(next: any): void {
  //   // this.Completed8 = this.earthStud.success;
  //   // this.final.ngOnInit();
  // }

  public changeTabLpsSavedReport(index: number, basicLpsId: any, userName: any, clientName: any) {
   
    this.selectedIndex = 1;

    this.basicDetails = false;
    this.airTermValue = false;
    this.downValue = false;
    this.earthingValue = false;
    this.spdValue = false;
    this.seperationValue = false;
    this.equipotentialBond = false;

    setTimeout(() => {
      this.basicDetails = true;
      this.airTermValue = true;
      this.downValue = true;
      this.earthingValue = true;
      this.spdValue = true;
      this.seperationValue = true;
      this.equipotentialBond = true;
    }, 50);

    setTimeout(() => {
    this.basicLpsService.retrieveFinalLps(userName,basicLpsId).subscribe(
      (data) => {
        this.dataJSON = JSON.parse(data);
        if(this.dataJSON.basicLps != null) {
          this.selectedIndex = index;            
          this.basic.retrieveDetailsfromSavedReports(userName,basicLpsId,clientName,this.dataJSON);
         // setTimeout(() => {
          this.doSomething1(false);
          this.Completed1 = true;
         // }, 500);
        }
        if(this.dataJSON.airTermination != null) {
            
            this.airTermination.retrieveDetailsfromSavedReports(userName,basicLpsId,clientName,this.dataJSON);
           // this.doSomething2(false);
            this.Completed2 = true;
        }
        if(this.dataJSON.downConductorDesc != null) {
              
              this.downConductors.retrieveDetailsfromSavedReports(userName,basicLpsId,clientName,this.dataJSON);
            //  this.doSomething3(false);
              this.Completed3 = true;
        }
        if(this.dataJSON.earthingLpsDescription != null) {
                
                this.earthing.retrieveDetailsfromSavedReports(userName,basicLpsId,clientName,this.dataJSON);
             //   this.doSomething4(false);
                this.Completed4 = true;
        }
        if(this.dataJSON.spddesc != null) {
                  
                  this.spd.retrieveDetailsfromSavedReports(userName,basicLpsId,clientName,this.dataJSON);
               //   this.doSomething5(false);
                  this.Completed5 = true;
        }
        if(this.dataJSON.seperationDistanceDesc != null) {
                    
                    this.seperationDistance.retrieveDetailsfromSavedReports(userName,basicLpsId,clientName,this.dataJSON);
                 //   this.doSomething6(false);
                    this.Completed6 = true;
        }
        debugger
        if(this.dataJSON.earthStudReport != null) {
          
          this.earthStud.retrieveDetailsfromSavedReports(userName,basicLpsId,clientName,this.dataJSON);
          //this.doSomething7(false);
          this.Completed7 = true;
          // this.doSomething2(false)                                   
        }
        setTimeout(() => {
          this.downConductors.createDwonconductorForm(this.airTermination.buildingNumberArr);
          this.seperationDistance.createSeperationForm(this.airTermination.buildingNumberArr)
        }, 500);

      },
      (error) => {

      }
      )}, 3000);
  }

  // Final Report 
  changeTab1(index: number): void {
    this.ngOnInit();
    let userName=this.router.snapshot.paramMap.get('email') || '{}';
    this.changeTabLpsSavedReport(index,this.earthStud.basicLpsId,userName,this.earthStud.ClientName);
    this.selectedIndex = index;
    
  }
  refresh() {
    
    this.ChangeDetectorRef.detectChanges();
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
        dialogRef.componentInstance.summaryModal = false;
    
        dialogRef.componentInstance.confirmBox.subscribe(data=>{
          if(data) {
            this.selectedIndex=1; 
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
        if((tabs==="Lightning Protection System"))
          
           {
              // this.selectedIndex=0; 
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
          }    
          else{
            this.selectedIndex=2; 
          }        
        }
  }

  preview(basicLpsId: any,ClientName:any): void {
    this.ngOnInit();
    this.isEditable=true;
    let userName=this.router.snapshot.paramMap.get('email') || '{}';
    this.changeTabLpsSavedReport(0,basicLpsId,userName,ClientName);
  }

  continue(basicLpsId: any,ClientName:any): void {
    this.refresh();
    this.ngOnInit();
    this.isEditable=false;
    let userName=this.router.snapshot.paramMap.get('email') || '{}';
    this.changeTabLpsSavedReport(0,basicLpsId,userName,ClientName);
  }
}
