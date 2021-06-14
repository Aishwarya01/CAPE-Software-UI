import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Supplycharacteristics } from '../model/supplycharacteristics';
import { SupplyCharacteristicsService } from '../services/supply-characteristics.service';


@Component({
  selector: 'app-inspection-verification-supply-characteristics',
  templateUrl: './inspection-verification-supply-characteristics.component.html',
  styleUrls: ['./inspection-verification-supply-characteristics.component.css']
})
export class InspectionVerificationSupplyCharacteristicsComponent implements OnInit {

  supplycharesteristic = new Supplycharacteristics;
  enableAC: boolean = false;
  enableDC: boolean = false;
  tableAC: boolean = false;
  enable2AC: boolean = false;
  enable2DC: boolean = false;
  table2AC: boolean = false;
  location1Arr!: FormArray;
  location2Arr!: FormArray;
  location3Arr!: FormArray;




  panelOpenState = false;
  systemEarthingList: String[]= ['TN-C','TN-C-S','TN-S','IT','TT'];
  liveConductorACList:String[]=['1-phase, 2-wire (LN)','1-phase, 3-wire (LLM)','2-phase, 3-wire (LLN)','3-phase, 3-wire (LLL)','3-phase, 4-wire (LLLN)'];
  liveConductorDCList:String[]=['2-pole','3-pole','Others'];
  ProtectiveDevicelist:string[]=['Fuse','MCB','MCCB','ACB'];
  AlternatesupplyList:string[]=['yes','No'];
  MeansofEarthingList:string[]=['Suppliers facility',' Installation earth electrode'];
  electrodeTypeList:string[]=['Vertical','Horizontal','Combined vertical + horizontal'];
  electrodeMaterialList:string[]=['Copper','Coppebondedr  steel','Galvanised steel','Combination','Others'];
  conductorVerifyList:string[]=['yes','No'];
  bondingConductorVerifyList:string[]=['yes','No'];
  earthingConductorVerifyList:string[]=['yes','No'];

  supplycharesteristicForm = new FormGroup({
    // systemEarthing: new FormControl(''),
    // liveConductor: new FormControl(''),
    // AcConductor: new FormControl(''),
    // DcConductor: new FormControl(''),
    // briefNote: new FormControl(''),

  })

  constructor(private supplyCharacteristicsService: SupplyCharacteristicsService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.supplycharesteristicForm = this.formBuilder.group({
      location1Arr: this.formBuilder.array([this.createLocation1Form()]),
      location2Arr: this.formBuilder.array([this.createLocation2Form()]),
      location3Arr: this.formBuilder.array([this.createLocation3Form()]),

    });
    }


    private createLocation1Form(): FormGroup {
      return new FormGroup({
        locationNumber: new FormControl(''),
        locationName: new FormControl(''),
        electrodeResistanceToEarth: new FormControl(''),
        electrodeResistanceToGrid: new FormControl(''),
      })
    }

    private createLocation2Form(): FormGroup {
      return new FormGroup({
        location: new FormControl(''),
        jointNo: new FormControl(''),
        jointResistance: new FormControl('')
      })
    }

    private createLocation3Form(): FormGroup {
      return new FormGroup({
        location: new FormControl(''),
        jointNo: new FormControl(''),
        jointResistance: new FormControl('')
      })
    }

    addLocation1() {
      this.location1Arr = this.supplycharesteristicForm.get('location1Arr') as FormArray;
      this.location1Arr.push(this.createLocation1Form());
    }

    addLocation2() {
      this.location2Arr = this.supplycharesteristicForm.get('location2Arr') as FormArray;
      this.location2Arr.push(this.createLocation2Form());
    }

    addLocation3() {
      this.location3Arr = this.supplycharesteristicForm.get('location3Arr') as FormArray;
      this.location3Arr.push(this.createLocation3Form());
    }

  getLocation1Controls(): AbstractControl[] {
    return (<FormArray> this.supplycharesteristicForm.get('location1Arr')).controls
  }

  getLocation2Controls(): AbstractControl[] {
    return (<FormArray> this.supplycharesteristicForm.get('location2Arr')).controls
  }

  getLocation3Controls(): AbstractControl[] {
    return (<FormArray> this.supplycharesteristicForm.get('location3Arr')).controls
  }

  changeCurrent(e: any) {
    let changedValue = e.target.value;
    debugger
    if(changedValue == "AC") {
      this.enableAC = true;
      this.enableDC = false;
      this.tableAC = true;
    }
    else {
      this.enableDC = true;
      this.enableAC = false;
      this.tableAC = false;

    }
  }

  changeCurrent2(e: any) {
    let changedValue = e.target.value;
    if(changedValue == "AC") {
      this.enable2AC = true;
      this.enable2DC = false;
      this.table2AC = true;
    }
    else {
      this.enable2DC = true;
      this.enable2AC = false;
      this.table2AC = false;

    }
  }

}
