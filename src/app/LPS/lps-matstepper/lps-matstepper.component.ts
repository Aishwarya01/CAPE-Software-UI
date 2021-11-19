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
  Completed1: boolean=false;
  Completed2: boolean=false;
  Completed3: boolean=false;
  Completed4: boolean=false;
  Completed5: boolean=false;
  Completed6: boolean=false;
  Completed7: boolean=false;
  
  

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
  //Completed8: boolean=this.earthStud.success;

  constructor(
    private _formBuilder: FormBuilder,
    private basicLpsService: LPSBasicDetailsService,
    private router: ActivatedRoute) { }

  ngOnInit(): void {
    // this.firstFormGroup = this._formBuilder.group({
    //   firstCtrl: ['', Validators.required],
    // });
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required],
    // });
  }
  public doSomething1(next: any): void {
    debugger
    this.airTermination.basicLpsId=this.basic.basicDetails.basicLpsId;
    this.airTermination.ClientName=this.basic.basicDetails.clientName;
    this.airTermination.projectName=this.basic.basicDetails.projectName;
    this.airTermination.industryType=this.basic.basicDetails.industryType;
    this.airTermination.buildingType=this.basic.basicDetails.buildingType;
    // this.airTermination.buildingLength=this.basic.basicDetails.buildingLength;
    // this.airTermination.buildingWidth=this.basic.basicDetails.buildingWidth;
    // this.airTermination.buildingHeight=this.basic.basicDetails.buildingHeight;
    // this.airTermination.levelOfProtection=this.basic.basicDetails.levelOfProtection;
    // this.airTermination.soilResistivity=this.basic.basicDetails.soilResistivity;
    // this.doSomething2(false);
    // this.doSomething3(false);
    // this.doSomething4(false);
    // this.doSomething5(false);
    // this.doSomething6(false);
    this.Completed1 = this.basic.success;
  }
  public doSomething2(next: any): void {
    debugger
    this.downConductors.basicLpsId=this.basic.basicDetails.basicLpsId;
    this.downConductors.ClientName=this.basic.basicDetails.clientName;
    this.downConductors.projectName=this.basic.basicDetails.projectName;
    this.downConductors.industryType=this.basic.basicDetails.industryType;
    this.downConductors.buildingType=this.basic.basicDetails.buildingType;
    // this.downConductors.buildingLength=this.basic.basicDetails.buildingLength;
    // this.downConductors.buildingWidth=this.basic.basicDetails.buildingWidth;
    // this.downConductors.buildingHeight=this.basic.basicDetails.buildingHeight;
    // this.downConductors.levelOfProtection=this.basic.basicDetails.levelOfProtection;
    // this.downConductors.soilResistivity=this.basic.basicDetails.soilResistivity; 
    this.Completed2 = this.airTermination.success;
  }

   
  public doSomething3(next: any): void {
    this.earthing.basicLpsId=this.basic.basicDetails.basicLpsId;
    this.earthing.ClientName=this.basic.basicDetails.clientName;
    this.earthing.projectName=this.basic.basicDetails.projectName;
    this.earthing.industryType=this.basic.basicDetails.industryType;
    this.earthing.buildingType=this.basic.basicDetails.buildingType;
    // this.earthing.buildingLength=this.basic.basicDetails.buildingLength;
    // this.earthing.buildingWidth=this.basic.basicDetails.buildingWidth;
    // this.earthing.buildingHeight=this.basic.basicDetails.buildingHeight;
    // this.earthing.levelOfProtection=this.basic.basicDetails.levelOfProtection;
    // this.earthing.soilResistivity=this.basic.basicDetails.soilResistivity; 
    this.Completed3 = this.downConductors.success;
  }

  public doSomething4(next: any): void {
    this.spd.basicLpsId=this.basic.basicDetails.basicLpsId;
    this.spd.ClientName=this.basic.basicDetails.clientName;
    this.spd.projectName=this.basic.basicDetails.projectName;
    this.spd.industryType=this.basic.basicDetails.industryType;
    this.spd.buildingType=this.basic.basicDetails.buildingType;
    // this.spd.buildingLength=this.basic.basicDetails.buildingLength;
    // this.spd.buildingWidth=this.basic.basicDetails.buildingWidth;
    // this.spd.buildingHeight=this.basic.basicDetails.buildingHeight;
    // this.spd.levelOfProtection=this.basic.basicDetails.levelOfProtection;
    // this.spd.soilResistivity=this.basic.basicDetails.soilResistivity; 
    this.Completed4 = this.earthing.success;
  }

  public doSomething5(next: any): void {
    this.seperationDistance.basicLpsId=this.basic.basicDetails.basicLpsId;
    this.seperationDistance.ClientName=this.basic.basicDetails.clientName;
    this.seperationDistance.projectName=this.basic.basicDetails.projectName;
    this.seperationDistance.industryType=this.basic.basicDetails.industryType;
    this.seperationDistance.buildingType=this.basic.basicDetails.buildingType;
    // this.seperationDistance.buildingLength=this.basic.basicDetails.buildingLength;
    // this.seperationDistance.buildingWidth=this.basic.basicDetails.buildingWidth;
    // this.seperationDistance.buildingHeight=this.basic.basicDetails.buildingHeight;
    // this.seperationDistance.levelOfProtection=this.basic.basicDetails.levelOfProtection;
    // this.seperationDistance.soilResistivity=this.basic.basicDetails.soilResistivity; 
    this.Completed5 = this.spd.success;
  }
  public doSomething6(next: any): void {
    this.earthStud.basicLpsId=this.basic.basicDetails.basicLpsId;
    this.earthStud.ClientName=this.basic.basicDetails.clientName;
    this.earthStud.projectName=this.basic.basicDetails.projectName;
    this.earthStud.industryType=this.basic.basicDetails.industryType;
    this.earthStud.buildingType=this.basic.basicDetails.buildingType;
    // this.earthStud.buildingLength=this.basic.basicDetails.buildingLength;
    // this.earthStud.buildingWidth=this.basic.basicDetails.buildingWidth;
    // this.earthStud.buildingHeight=this.basic.basicDetails.buildingHeight;
    // this.earthStud.levelOfProtection=this.basic.basicDetails.levelOfProtection;
    // this.earthStud.soilResistivity=this.basic.basicDetails.soilResistivity; 
    this.Completed6 = this.seperationDistance.success;
  }
  public doSomething7(next: any): void {
    this.Completed7 = this.earthStud.success;
  }

  public changeTabLpsSavedReport(index: number, basicLpsId: any, userName: any, clientName: any) {
    //debugger
    this.basicLpsService.retrieveFinalLps(userName,basicLpsId).subscribe(
      (data) => {
        this.dataJSON = JSON.parse(data);
        if(this.dataJSON.basicLps != null) {
          debugger
          
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
    let userName=this.router.snapshot.paramMap.get('email') || '{}';
    this.changeTabLpsSavedReport(index,this.earthStud.basicLpsId,userName,this.earthStud.ClientName);
    this.selectedIndex = index;
    
  }
  
}
