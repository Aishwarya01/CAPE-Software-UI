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
import { LPSBasicDetailsService } from 'src/app/LPS_services/lpsbasic-details.service';
import { LpsSpdComponent } from '../lps-spd/lps-spd.component';

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

  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
  selectedIndex: any;
  isCompleted1: boolean=false;
  isCompleted2: boolean=false;
  isCompleted3: boolean=false;
  isCompleted4: boolean=false;
  isCompleted5: boolean=false;
  isCompleted6: boolean=false;
  isCompleted7: boolean=false;

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
   

  constructor() { }

  ngOnInit(): void {
  }
  public doSomething1(next: any): void {
    debugger
    this.airTermination.basicLpsId=this.basic.basicDetails.basicLpsId;
    this.airTermination.ClientName=this.basic.basicDetails.clientName;
    this.airTermination.projectName=this.basic.basicDetails.projectName;
    this.airTermination.industryType=this.basic.basicDetails.industryType;
    this.airTermination.buildingType=this.basic.basicDetails.buildingType;
    this.airTermination.buildingLength=this.basic.basicDetails.buildingLength;
    this.airTermination.buildingWidth=this.basic.basicDetails.buildingWidth;
    this.airTermination.buildingHeight=this.basic.basicDetails.buildingHeight;
    this.airTermination.levelOfProtection=this.basic.basicDetails.levelOfProtection;
    this.airTermination.soilResistivity=this.basic.basicDetails.soilResistivity;
    this.isCompleted1 = next;
  }
  public doSomething2(next: any): void {
    this.downConductors.basicLpsId=this.basic.basicDetails.basicLpsId;
    this.downConductors.ClientName=this.basic.basicDetails.clientName;
    this.downConductors.projectName=this.basic.basicDetails.projectName;
    this.downConductors.industryType=this.basic.basicDetails.industryType;
    this.downConductors.buildingType=this.basic.basicDetails.buildingType;
    this.downConductors.buildingLength=this.basic.basicDetails.buildingLength;
    this.downConductors.buildingWidth=this.basic.basicDetails.buildingWidth;
    this.downConductors.buildingHeight=this.basic.basicDetails.buildingHeight;
    this.downConductors.levelOfProtection=this.basic.basicDetails.levelOfProtection;
    this.downConductors.soilResistivity=this.basic.basicDetails.soilResistivity; 
    this.isCompleted2 = next;
  }

   
  public doSomething3(next: any): void {
    this.earthing.basicLpsId=this.basic.basicDetails.basicLpsId;
    this.earthing.ClientName=this.basic.basicDetails.clientName;
    this.earthing.projectName=this.basic.basicDetails.projectName;
    this.earthing.industryType=this.basic.basicDetails.industryType;
    this.earthing.buildingType=this.basic.basicDetails.buildingType;
    this.earthing.buildingLength=this.basic.basicDetails.buildingLength;
    this.earthing.buildingWidth=this.basic.basicDetails.buildingWidth;
    this.earthing.buildingHeight=this.basic.basicDetails.buildingHeight;
    this.earthing.levelOfProtection=this.basic.basicDetails.levelOfProtection;
    this.earthing.soilResistivity=this.basic.basicDetails.soilResistivity; 
    this.isCompleted3 = next;
  }

  public doSomething4(next: any): void {
    this.spd.basicLpsId=this.basic.basicDetails.basicLpsId;
    this.spd.ClientName=this.basic.basicDetails.clientName;
    this.spd.projectName=this.basic.basicDetails.projectName;
    this.spd.industryType=this.basic.basicDetails.industryType;
    this.spd.buildingType=this.basic.basicDetails.buildingType;
    this.spd.buildingLength=this.basic.basicDetails.buildingLength;
    this.spd.buildingWidth=this.basic.basicDetails.buildingWidth;
    this.spd.buildingHeight=this.basic.basicDetails.buildingHeight;
    this.spd.levelOfProtection=this.basic.basicDetails.levelOfProtection;
    this.spd.soilResistivity=this.basic.basicDetails.soilResistivity; 
    this.isCompleted4 = next;
  }

  public doSomething5(next: any): void {
    this.seperationDistance.basicLpsId=this.basic.basicDetails.basicLpsId;
    this.seperationDistance.ClientName=this.basic.basicDetails.clientName;
    this.seperationDistance.projectName=this.basic.basicDetails.projectName;
    this.seperationDistance.industryType=this.basic.basicDetails.industryType;
    this.seperationDistance.buildingType=this.basic.basicDetails.buildingType;
    this.seperationDistance.buildingLength=this.basic.basicDetails.buildingLength;
    this.seperationDistance.buildingWidth=this.basic.basicDetails.buildingWidth;
    this.seperationDistance.buildingHeight=this.basic.basicDetails.buildingHeight;
    this.seperationDistance.levelOfProtection=this.basic.basicDetails.levelOfProtection;
    this.seperationDistance.soilResistivity=this.basic.basicDetails.soilResistivity; 
    this.isCompleted5 = next;
  }
  public doSomething6(next: any): void {
    this.earthStud.basicLpsId=this.basic.basicDetails.basicLpsId;
    this.earthStud.ClientName=this.basic.basicDetails.clientName;
    this.earthStud.projectName=this.basic.basicDetails.projectName;
    this.earthStud.industryType=this.basic.basicDetails.industryType;
    this.earthStud.buildingType=this.basic.basicDetails.buildingType;
    this.earthStud.buildingLength=this.basic.basicDetails.buildingLength;
    this.earthStud.buildingWidth=this.basic.basicDetails.buildingWidth;
    this.earthStud.buildingHeight=this.basic.basicDetails.buildingHeight;
    this.earthStud.levelOfProtection=this.basic.basicDetails.levelOfProtection;
    this.earthStud.soilResistivity=this.basic.basicDetails.soilResistivity; 
    this.isCompleted6 = next;
  }
  public doSomething7(next: any): void {
    this.isCompleted7 = next;
  }
  
}
