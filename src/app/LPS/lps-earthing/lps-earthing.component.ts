import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EarthingLpsDescription } from 'src/app/LPS_model/earthing';
import { LpsEarthing } from 'src/app/LPS_services/lps-earthing';

@Component({
  selector: 'app-lps-earthing',
  templateUrl: './lps-earthing.component.html',
  styleUrls: ['./lps-earthing.component.css']
})
export class LpsEarthingComponent implements OnInit {

  earthingForm:FormGroup;
  earthingLpsDescription = new EarthingLpsDescription;

  lpsEarthing;

  constructor(
    private formBuilder: FormBuilder,private lpsEarthings:LpsEarthing
  ) { 
    this.lpsEarthing=lpsEarthings;
  }

  ngOnInit(): void {
    this.earthingForm = this.formBuilder.group({
     
     // earthingId!: number;
    //userName!: ['', Validators.required],
    //basicLpsId!: ['', Validators.required],
    earthingTypeInOb : ['', Validators.required],
    earthingTypeInRem : [''],
    bimetallicIssueInOb : ['', Validators.required],
    bimetallicIssueInRem : [''],
    brazingConnectInOb : ['', Validators.required],
    brazingConnectInRem : [''],
    locationNumber :['', Validators.required],
    locationName : ['', Validators.required],
    soilResistivityInOb : ['', Validators.required],
    soilResistivityInRem : String,
    earthPitDigOb : ['', Validators.required],
    earthPitDigRem : [''],
    earthElectrodeLesthanDownConductorInOb : ['', Validators.required],
    earthElectrodeLesthanDownConductorInRem : [''],
    connectedEarthTerminalInOb : ['', Validators.required],
    connectedEarthTerminalInRem : [''],
    testJointEarthElectrodeInOb : ['', Validators.required],
    testJointEarthElectrodeInRem : [''],
    grountLevelComponentFilledInOb : ['', Validators.required],
    grountLevelComponentFilledInRem : [''],
    earthElectrodeLocationInOb : ['', Validators.required],
    earthElectrodeLocationInRem : [''],
    earthElectrodeMaterialInOb : ['', Validators.required],
    earthElectrodeMaterialInRem : [''],
    earthElectrodeSizeInOb : ['', Validators.required],
    earthElectrodeSizeInRem : [''],
    earthElectrodeLengthingOb : ['', Validators.required],
    earthElectrodeLengthingRem : [''],
    earthelectMaxiDistWallInOb: new FormControl('', Validators.required),
    earthelectMaxiDistWallInRem: [''],
    earthelectManimumDistanceWallInOb: new FormControl('', Validators.required),
    earthelectManimumDistanceWallInRem: new FormControl(''),
    earthelectMaxiDistOb: new FormControl('', Validators.required),
    earthelectMaxiDistRem: new FormControl(''),
    earthelectManiDistOb: new FormControl('', Validators.required),
    earthelectManiDistRem: new FormControl(''),
    totalNumberOfElectrodeOb: new FormControl('', Validators.required),
    totalNumberOfElectrodeRem: new FormControl(''),
    inspectedNoOb: new FormControl('', Validators.required),
    inspectedNoRem: new FormControl(''),
    inspectedPassedNoOb: new FormControl('', Validators.required),
    inspectedPassedNoRem: new FormControl(''),
    inspectedFailedNoOb: new FormControl('', Validators.required),
    inspectedFailedNoRem: new FormControl(''),
    
    earthingDescription :this.formBuilder.array([this.earthingDescriptionArr()]),
    earthingClamps :this.formBuilder.array([this.earthingClamps()]),
    earthElectrodeChamber :this.formBuilder.array([this.earthElectrodeChamber()]),
    earthingSystem :this.formBuilder.array([this.earthingSystem()])
    });
  }

  earthingDescriptionarr(): AbstractControl[] {
    return (<FormArray>this.earthingForm.get('descriptionArr')).controls;
  }

  earthingClampsarr(): AbstractControl[] {
    return (<FormArray>this.earthingForm.get('ClampsArr')).controls;
  }

  earthElectrodeChambearr(): AbstractControl[] {
    return (<FormArray>this.earthingForm.get('chamberArr')).controls;
  }

  earthingSystemarr(): AbstractControl[] {
    return (<FormArray>this.earthingForm.get('earthingSystemArr')).controls;
  }

 
  earthingSystem():FormGroup{
    return new FormGroup({
      buriedElectrodeOb: new FormControl('', Validators.required),
      buriedElectrodeRem: new FormControl(''),
      depthOfElectrodeOb: new FormControl('', Validators.required),
      depthOfElectrodeRem: new FormControl(''),
      earthOb: new FormControl('', Validators.required),
      earthRem: new FormControl(''),
      westOb: new FormControl('', Validators.required),
      westRem: new FormControl(''),
      northOb: new FormControl('', Validators.required),
      northRem: new FormControl(''),
      southOb: new FormControl('', Validators.required),
      southRem: new FormControl(''),
      ringEarthWallDistanceOb: new FormControl('', Validators.required),
      ringEarthWallDistanceRem: new FormControl(''),
      ringWallEarthEastOb: new FormControl('', Validators.required),
      ringWallEarthEastRem: new FormControl(''),
      ringWallEarthWestOb: new FormControl('', Validators.required),
      ringWallEarthWestRem: new FormControl(''),
      ringWallEarthNorthOb: new FormControl('', Validators.required),
      ringWallEarthNorthRem: new FormControl(''),
      ringWallEarthSouthOb: new FormControl('', Validators.required),
      ringWallEarthSouthRem: new FormControl(''),
      jointsMadeBrazingOb: new FormControl('', Validators.required),
      jointsMadeBrazingRem: new FormControl(''),
      materialOfEartElectrodeOb: new FormControl('', Validators.required),
      materialOfEartElectrodeRem: new FormControl(''),
      sizeOfEarthElectrodeOb: new FormControl('', Validators.required),
      sizeOfEarthElectrodeRem: new FormControl(''),
      //earthelectMaxiDistWallInOb: new FormControl('', Validators.required),
      //earthelectMaxiDistWallInRem: new FormControl(''),
      maximumDistanceEartElectrodeWalOb: new FormControl('', Validators.required),
      maximumDistanceEartElectrodeWalRem: new FormControl(''),
      manimumDistanceEartElectrodeWalOb: new FormControl('', Validators.required),
      manimumDistanceEartElectrodeWalRem: new FormControl(''),
       
    })
  }
  earthElectrodeChamber(): FormGroup{
    return new FormGroup({
      physicalInspeOb: new FormControl('', Validators.required),
    physicalInspeRem: new FormControl(''),
    chamberTypeOb: new FormControl('', Validators.required),
    chamberTypeRem: new FormControl(''),
    chamberSizeOb: new FormControl('', Validators.required),
    chamberSizeRem: new FormControl(''),
    maximumWithStandLoadOb: new FormControl('', Validators.required),
    maximumWithStandLoadRem: new FormControl(''),
    maximumPlacedSoilOb: new FormControl('', Validators.required),
    maximumPlacedSoilRem: new FormControl(''),
    totalChamberNoOb: new FormControl('', Validators.required),
    totalChamberNoRem: new FormControl(''),
    inspectedChamberInOb: new FormControl('', Validators.required),
    inspectedChamberInRem: new FormControl(''),
    inspectionPassedInOb: new FormControl('', Validators.required),
    inspectionPassedInRem: new FormControl(''),
    inspectionFailedInOb: new FormControl('', Validators.required),
    inspectionFailedInRem: new FormControl('')

    })
  }
  earthingClamps(): FormGroup{
    return new FormGroup({
      physicalInspectionInOb: new FormControl('', Validators.required),
    psysicalInspectionInRem: new FormControl(''),
    clampsFirmlyOb: new FormControl('', Validators.required),
    clampsFirmlyRem: new FormControl(''),
    interConnectOfEarthClampInOb: new FormControl('', Validators.required),
    interConnectOfEarthClampInRem: new FormControl(''),
    typeOfClampsInOb: new FormControl('', Validators.required),
    typeOfClampsInRem: new FormControl(''),
    materialOfClampsInOb: new FormControl('', Validators.required),
    materialOfClampsInRem: new FormControl(''),
    totalNoClampsInOb: new FormControl('', Validators.required),
    totalNoClampsInRem: new FormControl(''),
    inspectedClampsInOb: new FormControl('', Validators.required),
    inspectedClampsInRem: new FormControl(''),
    inspectionPassedInOb: new FormControl('', Validators.required),
    inspectionPassedInRem: new FormControl(''),
    inspectionFailedInOb: new FormControl('', Validators.required),
    inspectionFailedInRem: new FormControl('')
    })
  }
  earthingDescriptionArr():  FormGroup{
    return new FormGroup({
      earthelectMaxiDistWallInOb: new FormControl('', Validators.required),
      earthelectMaxiDistWallInRem: new FormControl(''),
      earthelectManimumDistanceWallInOb: new FormControl('', Validators.required),
      earthelectManimumDistanceWallInRem: new FormControl(''),
      earthelectMaxiDistOb: new FormControl('', Validators.required),
      earthelectMaxiDistRem: new FormControl(''),
      earthelectManiDistOb: new FormControl('', Validators.required),
      earthelectManiDistRem: new FormControl(''),
      totalNumberOfElectrodeOb: new FormControl('', Validators.required),
      totalNumberOfElectrodeRem: new FormControl(''),
      inspectedNoOb: new FormControl('', Validators.required),
      inspectedNoRem: new FormControl(''),
      inspectedPassedNoOb: new FormControl('', Validators.required),
      inspectedPassedNoRem: new FormControl(''),
      inspectedFailedNoOb: new FormControl('', Validators.required),
      inspectedFailedNoRem: new FormControl('')
    })
  }
  onSubmit(){
    console.log(this.earthingForm.value);
  }
}
