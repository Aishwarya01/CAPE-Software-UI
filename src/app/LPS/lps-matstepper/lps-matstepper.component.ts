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
import { MatTabGroup } from '@angular/material/tabs';

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
  //ChangeDetectorRef: any;
  //Completed8: boolean=this.earthStud.success;

  constructor(
    private _formBuilder: FormBuilder,
    private basicLpsService: LPSBasicDetailsService,
    private router: ActivatedRoute,
    private ChangeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    // this.firstFormGroup = this._formBuilder.group({
    //   firstCtrl: ['', Validators.required],
    // });
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required],
    // });
    this.refresh();
  }
  public doSomething1(next: any): void {

    // AirTermination
    this.airTermination.basicLpsId=this.basic.basicDetails.basicLpsId;
    this.airTermination.ClientName=this.basic.basicDetails.clientName;
    this.airTermination.projectName=this.basic.basicDetails.projectName;
    this.airTermination.industryType=this.basic.basicDetails.industryType;
    this.airTermination.buildingType=this.basic.basicDetails.buildingType;
    // DownConductor
    this.downConductors.basicLpsId=this.basic.basicDetails.basicLpsId;
    this.downConductors.ClientName=this.basic.basicDetails.clientName;
    this.downConductors.projectName=this.basic.basicDetails.projectName;
    this.downConductors.industryType=this.basic.basicDetails.industryType;
    this.downConductors.buildingType=this.basic.basicDetails.buildingType;
    // Earthing
    this.earthing.basicLpsId=this.basic.basicDetails.basicLpsId;
    this.earthing.ClientName=this.basic.basicDetails.clientName;
    this.earthing.projectName=this.basic.basicDetails.projectName;
    this.earthing.industryType=this.basic.basicDetails.industryType;
    this.earthing.buildingType=this.basic.basicDetails.buildingType;
    // SPD
    this.spd.basicLpsId=this.basic.basicDetails.basicLpsId;
    this.spd.ClientName=this.basic.basicDetails.clientName;
    this.spd.projectName=this.basic.basicDetails.projectName;
    this.spd.industryType=this.basic.basicDetails.industryType;
    this.spd.buildingType=this.basic.basicDetails.buildingType;
    // Seperation Distance
    this.seperationDistance.basicLpsId=this.basic.basicDetails.basicLpsId;
    this.seperationDistance.ClientName=this.basic.basicDetails.clientName;
    this.seperationDistance.projectName=this.basic.basicDetails.projectName;
    this.seperationDistance.industryType=this.basic.basicDetails.industryType;
    this.seperationDistance.buildingType=this.basic.basicDetails.buildingType;
    // EarthStud
    this.earthStud.basicLpsId=this.basic.basicDetails.basicLpsId;
    this.earthStud.ClientName=this.basic.basicDetails.clientName;
    this.earthStud.projectName=this.basic.basicDetails.projectName;
    this.earthStud.industryType=this.basic.basicDetails.industryType;
    this.earthStud.buildingType=this.basic.basicDetails.buildingType;

    this.Completed1 = this.basic.success;
    this.saved.ngOnInit();
  }
  public doSomething2(next: any): void {
    this.Completed2 = this.airTermination.success;
  }

  public doSomething3(next: any): void {
    this.Completed3 = this.downConductors.success;
  }

  public doSomething4(next: any): void {
    this.Completed4 = this.earthing.success;
  }

  public doSomething5(next: any): void {
    this.Completed5 = this.spd.success;
  }
  public doSomething6(next: any): void {
    this.Completed6 = this.seperationDistance.success;
  }
  public doSomething7(next: any): void {
    this.Completed7 = this.earthStud.success;
    this.final.ngOnInit();
  }

  public changeTabLpsSavedReport(index: number, basicLpsId: any, userName: any, clientName: any) {
    
    this.selectedIndex = 1;
    this.basicLpsService.retrieveFinalLps(userName,basicLpsId).subscribe(
      (data) => {
        this.dataJSON = JSON.parse(data);
        if(this.dataJSON.basicLps != null) {
          
          this.selectedIndex = index;            
          this.basic.retrieveDetailsfromSavedReports(userName,basicLpsId,clientName,this.dataJSON);
          this.doSomething1(false);
          this.Completed1 = true;
          if(this.dataJSON.lpsAirDiscription != null) {
            
            this.airTermination.retrieveDetailsfromSavedReports(userName,basicLpsId,clientName,this.dataJSON);
            this.doSomething2(false);
            this.Completed2 = true;
            if(this.dataJSON.downConductorDesc != null) {
              
              this.downConductors.retrieveDetailsfromSavedReports(userName,basicLpsId,clientName,this.dataJSON);
              this.doSomething3(false);
              this.Completed3 = true;
              if(this.dataJSON.earthingLpsDescription != null) {
                
                this.earthing.retrieveDetailsfromSavedReports(userName,basicLpsId,clientName,this.dataJSON);
                this.doSomething4(false);
                this.Completed4 = true;
                if(this.dataJSON.spddesc != null) {
                  
                  this.spd.retrieveDetailsfromSavedReports(userName,basicLpsId,clientName,this.dataJSON);
                  this.doSomething5(false);
                  this.Completed5 = true;
                  if(this.dataJSON.seperationDistanceDesc != null) {
                    
                    this.seperationDistance.retrieveDetailsfromSavedReports(userName,basicLpsId,clientName,this.dataJSON);
                    this.doSomething6(false);
                    this.Completed6 = true;
                    if(this.dataJSON.earthStudDescription != null) {
                      
                      this.earthStud.retrieveDetailsfromSavedReports(userName,basicLpsId,clientName,this.dataJSON);
                      this.doSomething7(false);
                      this.Completed7 = true;
                      
                    }
                  }
                }
              }
            }
          }
        }
      },
      (error) => {

      }
    )
  }

  // Final Report 
  changeTab1(index: number): void {
    this.ngOnInit();
    let userName=this.router.snapshot.paramMap.get('email') || '{}';
    this.changeTabLpsSavedReport(index,this.earthStud.basicLpsId,userName,this.earthStud.ClientName);
    this.selectedIndex = index;
    debugger
  }
  refresh() {
    debugger
    this.ChangeDetectorRef.detectChanges();
  }
}
