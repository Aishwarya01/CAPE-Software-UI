import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EarthingLpsDescription } from 'src/app/LPS_model/earthing';
import { LpsEarthing } from 'src/app/LPS_services/lps-earthing';

@Component({
  selector: 'app-lps-earthing',
  templateUrl: './lps-earthing.component.html',
  styleUrls: ['./lps-earthing.component.css']
})
export class LpsEarthingComponent implements OnInit {

  earthingForm!: FormGroup;
  earthingLpsDescription = new EarthingLpsDescription;
  submitted=false;
  lpsEarthingService;
  disable: boolean=false;

  basicLpsId: number = 0;
  ClientName: String='';
  projectName: String='';
  industryType: String='';
  buildingType: String='';
  buildingLength: String='';
  buildingWidth: String='';
  buildingHeight: String='';
  levelOfProtection: String='';
  soilResistivity: String='';

  success: boolean=false;
  successMsg: string="";
  Error: boolean=false;
  errorArr: any=[];
  errorMsg: string="";
  validationError: boolean = false;
  validationErrorMsg: String = '';
  @Output() proceedNext = new EventEmitter<any>();
  arr1: any = [];
  arr2: any = [];
  arr3: any = [];
  arr4: any = [];
  step4List: any = [];
  flag: boolean = false;

  descriptionArr!: FormArray;
  ClampsArr!: FormArray;
  chamberArr!: FormArray;
  earthingArr!: FormArray;
  
  descriptionPushArr: any = [];
  ClampsPushArr: any = [];
  chamberPushArr: any = [];
  isEditable!:boolean
  constructor(
    private formBuilder: FormBuilder, private lpsEarthings: LpsEarthing,private modalService: NgbModal, private router: ActivatedRoute
  ) {
    this.lpsEarthingService = lpsEarthings;
  }

  ngOnInit(): void {
    this.earthingForm = this.formBuilder.group({

      // earthingId!: number;
      //userName!:  new FormControl('', Validators.required),
      //basicLpsId!:  new FormControl('', Validators.required),
      earthingTypeInOb: new FormControl('', Validators.required),
      earthingTypeInRem: new FormControl(''),
      bimetallicIssueInOb: new FormControl('', Validators.required),
      bimetallicIssueInRem: new FormControl(''),
      brazingConnectInOb: new FormControl('', Validators.required),
      brazingConnectInRem: new FormControl(''),
      // locationNumber: new FormControl('', Validators.required),
      // locationName: new FormControl('', Validators.required),

      descriptionArr: this.formBuilder.array([this.earthingDescription()]),
      ClampsArr: this.formBuilder.array([this.earthingClamps()]),
      chamberArr: this.formBuilder.array([this.earthElectrodeChamber()]),
      earthingArr: this.formBuilder.array([this.earthingSystem()])
    });
  }

  retrieveDetailsfromSavedReports(userName: any,basicLpsId: any,clientName: any,data: any){
      this.step4List = data.earthingLpsDescription;
      this.earthingLpsDescription.basicLpsId = basicLpsId;
      this.earthingLpsDescription.earthingId = this.step4List.earthingId;
      this.earthingLpsDescription.earthingTypeInOb = this.step4List.earthingTypeInOb;
      this.earthingLpsDescription.earthingTypeInRem = this.step4List.earthingTypeInRem;
      this.earthingLpsDescription.bimetallicIssueInOb = this.step4List.bimetallicIssueInOb;
      this.earthingLpsDescription.bimetallicIssueInRem = this.step4List.bimetallicIssueInRem;
      this.earthingLpsDescription.brazingConnectInOb = this.step4List.brazingConnectInOb;
      this.earthingLpsDescription.brazingConnectInRem = this.step4List.brazingConnectInRem;
      //this.earthingLpsDescription.locationNumber = this.step4List.locationNumber;
     // this.earthingLpsDescription.locationName = this.step4List.locationName;
      this.earthingLpsDescription.createdBy = this.step4List.createdBy;
      this.earthingLpsDescription.createdDate = this.step4List.createdDate;
      this.earthingLpsDescription.userName = this.step4List.userName;
 
      this.populateData();
      this.flag=true;
    }

    populateData() {
      for (let item of this.step4List.earthingDescription) {     
        if(item.flag) {this.arr1.push(this.createGroup(item));}
      }
      for (let item of this.step4List.earthingClamps) {     
        if(item.flag) { this.arr2.push(this.createGroup1(item));}
      }
      for (let item of this.step4List.earthingElectrodeChamber) {     
        if(item.flag)  {this.arr3.push(this.createGroup2(item));}
      }
      for (let item of this.step4List.earthingSystem) { 
        this.arr4.push(this.createGroup3(item));
      }
      
      this.earthingForm.setControl('descriptionArr', this.formBuilder.array(this.arr1 || []))
      this.earthingForm.setControl('ClampsArr', this.formBuilder.array(this.arr2 || []))
      this.earthingForm.setControl('chamberArr', this.formBuilder.array(this.arr3 || []))
      this.earthingForm.setControl('earthingArr', this.formBuilder.array(this.arr4 || []))
      

      this.arr1 = [];
      this.arr2 = [];
      this.arr3 = [];
      this.arr4 = [];
      
    }

    createGroup(item: any): FormGroup {
      return this.formBuilder.group({
        //description arr
      flag: new FormControl({disabled: false, value: item.flag}),
      locationNumber: new FormControl({disabled: false, value: item.locationNumber}, Validators.required),
      locationName: new FormControl({disabled: false, value: item.locationName}),
      earthDescriptionId: new FormControl({disabled: false, value: item.earthDescriptionId}),
      soilResistivityInOb: new FormControl({disabled: false, value: item.soilResistivityInOb}, Validators.required),
      soilResistivityInRem: new FormControl({disabled: false, value: item.soilResistivityInRem}),
      earthPitDigOb: new FormControl({disabled: false, value: item.earthPitDigOb}, Validators.required),
      earthPitDigRem: new FormControl({disabled: false, value: item.earthPitDigRem}),
      earthElectrodeLesthanDownConductorInOb: new FormControl({disabled: false, value: item.earthElectrodeLesthanDownConductorInOb}, Validators.required),
      earthElectrodeLesthanDownConductorInRem: new FormControl({disabled: false, value: item.earthElectrodeLesthanDownConductorInRem}),
      connectedEarthTerminalInOb: new FormControl({disabled: false, value: item.connectedEarthTerminalInOb}, Validators.required),
      connectedEarthTerminalInRem: new FormControl({disabled: false, value: item.connectedEarthTerminalInRem}),
      testJointEarthElectrodeInOb: new FormControl({disabled: false, value: item.testJointEarthElectrodeInOb}, Validators.required),
      testJointEarthElectrodeInRem: new FormControl({disabled: false, value: item.testJointEarthElectrodeInRem}),
      grountLevelComponentFilledInOb: new FormControl({disabled: false, value: item.grountLevelComponentFilledInOb}, Validators.required),
      grountLevelComponentFilledInRem: new FormControl({disabled: false, value: item.grountLevelComponentFilledInRem}),
      earthElectrodeLocationInOb: new FormControl({disabled: false, value: item.earthElectrodeLocationInOb}, Validators.required),
      earthElectrodeLocationInRem: new FormControl({disabled: false, value: item.earthElectrodeLocationInRem}),
      earthElectrodeMaterialInOb: new FormControl({disabled: false, value: item.earthElectrodeMaterialInOb}, Validators.required),
      earthElectrodeMaterialInRem: new FormControl({disabled: false, value: item.earthElectrodeMaterialInRem}),
      earthElectrodeSizeInOb: new FormControl({disabled: false, value: item.earthElectrodeSizeInOb}, Validators.required),
      earthElectrodeSizeInRem: new FormControl({disabled: false, value: item.earthElectrodeSizeInRem}),
      earthElectrodeLengthingOb: new FormControl({disabled: false, value: item.earthElectrodeLengthingOb}, Validators.required),
      earthElectrodeLengthingRem: new FormControl({disabled: false, value: item.earthElectrodeLengthingRem}),
      earthelectMaxiDistWallInOb: new FormControl({disabled: false, value: item.earthelectMaxiDistWallInOb}, Validators.required),
      earthelectMaxiDistWallInRem: new FormControl({disabled: false, value: item.earthelectMaxiDistWallInRem}),
      earthelectManimumDistanceWallInOb: new FormControl({disabled: false, value: item.earthelectManimumDistanceWallInOb}, Validators.required),
      earthelectManimumDistanceWallInRem: new FormControl({disabled: false, value: item.earthelectManimumDistanceWallInRem}),
      earthelectMaxiDistOb: new FormControl({disabled: false, value: item.earthelectMaxiDistOb}, Validators.required),
      earthelectMaxiDistRem: new FormControl({disabled: false, value: item.earthelectMaxiDistRem}),
      earthelectManiDistOb: new FormControl({disabled: false, value: item.earthelectManiDistOb}, Validators.required),
      earthelectManiDistRem: new FormControl({disabled: false, value: item.earthelectManiDistRem}),
      totalNumberOfElectrodeOb: new FormControl({disabled: false, value: item.totalNumberOfElectrodeOb}, Validators.required),
      totalNumberOfElectrodeRem: new FormControl({disabled: false, value: item.totalNumberOfElectrodeRem}),
      inspectedNoOb: new FormControl({disabled: false, value: item.inspectedNoOb}, Validators.required),
      inspectedNoRem: new FormControl({disabled: false, value: item.inspectedNoRem}),
      inspectedPassedNoOb: new FormControl({disabled: false, value: item.inspectedPassedNoOb}, Validators.required),
      inspectedPassedNoRem: new FormControl({disabled: false, value: item.inspectedPassedNoRem}),
      inspectedFailedNoOb: new FormControl({disabled: false, value: item.inspectedFailedNoOb}, Validators.required),
      inspectedFailedNoRem: new FormControl({disabled: false, value: item.inspectedFailedNoRem}),
      });
    }

    createGroup1(item: any): FormGroup {
      return this.formBuilder.group({
        // clamps
        flag: new FormControl({disabled: false, value: item.flag}),
        locationNumber: new FormControl({disabled: false, value: item.locationNumber}, Validators.required),
        locationName: new FormControl({disabled: false, value: item.locationName}),
        earthingClampsId: new FormControl({disabled: false, value: item.earthingClampsId}),
        physicalInspectionInOb: new FormControl({disabled: false, value: item.physicalInspectionInOb}, Validators.required),
        psysicalInspectionInRem: new FormControl({disabled: false, value: item.psysicalInspectionInRem}),
        clampsFirmlyOb: new FormControl({disabled: false, value: item.clampsFirmlyOb}, Validators.required),
        clampsFirmlyRem: new FormControl({disabled: false, value: item.clampsFirmlyRem}),
        interConnectOfEarthClampInOb: new FormControl({disabled: false, value: item.interConnectOfEarthClampInOb}, Validators.required),
        interConnectOfEarthClampInRem: new FormControl({disabled: false, value: item.interConnectOfEarthClampInRem}),
        typeOfClampsInOb: new FormControl({disabled: false, value: item.typeOfClampsInOb}, Validators.required),
        typeOfClampsInRem: new FormControl({disabled: false, value: item.typeOfClampsInRem}),
        materialOfClampsInOb: new FormControl({disabled: false, value: item.materialOfClampsInOb}, Validators.required),
        materialOfClampsInRem: new FormControl({disabled: false, value: item.materialOfClampsInRem}),
        totalNoClampsInOb: new FormControl({disabled: false, value: item.totalNoClampsInOb}, Validators.required),
        totalNoClampsInRem: new FormControl({disabled: false, value: item.totalNoClampsInRem}),
        inspectedClampsInOb: new FormControl({disabled: false, value: item.inspectedClampsInOb}, Validators.required),
        inspectedClampsInRem: new FormControl({disabled: false, value: item.inspectedClampsInRem}),
        inspectionPassedInOb: new FormControl({disabled: false, value: item.inspectionPassedInOb}, Validators.required),
        inspectionPassedInRem: new FormControl({disabled: false, value: item.inspectionPassedInRem}),
        inspectionFailedInOb: new FormControl({disabled: false, value: item.inspectionFailedInOb}, Validators.required),
        inspectionFailedInRem: new FormControl({disabled: false, value: item.inspectionFailedInRem})
      });
    }

    createGroup2(item: any): FormGroup {
      return this.formBuilder.group({
        //chamber
        flag: new FormControl({disabled: false, value: item.flag}),
        locationNumber: new FormControl({disabled: false, value: item.locationNumber}, Validators.required),
        locationName: new FormControl({disabled: false, value: item.locationName}),
        earthingElectrodeChamberId: new FormControl({disabled: false, value: item.earthingElectrodeChamberId}),
        physicalInspeOb: new FormControl({disabled: false, value: item.physicalInspeOb}, Validators.required),
        physicalInspeRem: new FormControl({disabled: false, value: item.physicalInspeRem}),
        chamberTypeOb: new FormControl({disabled: false, value: item.chamberTypeOb}, Validators.required),
        chamberTypeRem: new FormControl({disabled: false, value: item.chamberTypeRem}),
        chamberSizeOb: new FormControl({disabled: false, value: item.chamberSizeOb}, Validators.required),
        chamberSizeRem: new FormControl({disabled: false, value: item.chamberSizeRem}),
        maximumWithStandLoadOb: new FormControl({disabled: false, value: item.maximumWithStandLoadOb}, Validators.required),
        maximumWithStandLoadRem: new FormControl({disabled: false, value: item.maximumWithStandLoadRem}),
        maximumPlacedSoilOb: new FormControl({disabled: false, value: item.maximumPlacedSoilOb}, Validators.required),
        maximumPlacedSoilRem: new FormControl({disabled: false, value: item.maximumPlacedSoilRem}),
        totalChamberNoOb: new FormControl({disabled: false, value: item.totalChamberNoOb}, Validators.required),
        totalChamberNoRem: new FormControl({disabled: false, value: item.totalChamberNoRem}),
        inspectedChamberInOb: new FormControl({disabled: false, value: item.inspectedChamberInOb}, Validators.required),
        inspectedChamberInRem: new FormControl({disabled: false, value: item.inspectedChamberInRem}),
        inspectionPassedInOb: new FormControl({disabled: false, value: item.inspectionPassedInOb}, Validators.required),
        inspectionPassedInRem: new FormControl({disabled: false, value: item.inspectionPassedInRem}),
        inspectionFailedInOb: new FormControl({disabled: false, value: item.inspectionFailedInOb}, Validators.required),
        inspectionFailedInRem: new FormControl({disabled: false, value: item.inspectionFailedInRem})
      });
    }


    createGroup3(item: any): FormGroup {
      return this.formBuilder.group({
        //earthing
        
        earthingSystemId: new FormControl({disabled: false, value: item.earthingSystemId}),
        buriedElectrodeOb: new FormControl({disabled: false, value: item.buriedElectrodeOb}, Validators.required),
        buriedElectrodeRem: new FormControl({disabled: false, value: item.buriedElectrodeRem}),
        depthOfElectrodeOb: new FormControl({disabled: false, value: item.depthOfElectrodeOb}, Validators.required),
        depthOfElectrodeRem: new FormControl({disabled: false, value: item.depthOfElectrodeRem}),
        earthOb: new FormControl({disabled: false, value: item.earthOb}, Validators.required),
        earthRem: new FormControl({disabled: false, value: item.earthRem}),
        westOb: new FormControl({disabled: false, value: item.westOb}, Validators.required),
        westRem: new FormControl({disabled: false, value: item.westRem}),
        northOb: new FormControl({disabled: false, value: item.northOb}, Validators.required),
        northRem: new FormControl({disabled: false, value: item.northRem}),
        southOb: new FormControl({disabled: false, value: item.southOb}, Validators.required),
        southRem: new FormControl({disabled: false, value: item.southRem}),
        ringEarthWallDistanceOb: new FormControl({disabled: false, value: item.ringEarthWallDistanceOb}, Validators.required),
        ringEarthWallDistanceRem: new FormControl({disabled: false, value: item.ringEarthWallDistanceRem}),
        ringWallEarthEastOb: new FormControl({disabled: false, value: item.ringWallEarthEastOb}, Validators.required),
        ringWallEarthEastRem: new FormControl({disabled: false, value: item.ringWallEarthEastRem}),
        ringWallEarthWestOb: new FormControl({disabled: false, value: item.ringWallEarthWestOb}, Validators.required),
        ringWallEarthWestRem: new FormControl({disabled: false, value: item.ringWallEarthWestRem}),
        ringWallEarthNorthOb: new FormControl({disabled: false, value: item.ringWallEarthNorthOb}, Validators.required),
        ringWallEarthNorthRem: new FormControl({disabled: false, value: item.ringWallEarthNorthRem}),
        ringWallEarthSouthOb: new FormControl({disabled: false, value: item.ringWallEarthSouthOb}, Validators.required),
        ringWallEarthSouthRem: new FormControl({disabled: false, value: item.ringWallEarthSouthRem}),
        jointsMadeBrazingOb: new FormControl({disabled: false, value: item.jointsMadeBrazingOb}, Validators.required),
        jointsMadeBrazingRem: new FormControl({disabled: false, value: item.jointsMadeBrazingRem}),
        materialOfEartElectrodeOb: new FormControl({disabled: false, value: item.materialOfEartElectrodeOb}, Validators.required),
        materialOfEartElectrodeRem: new FormControl({disabled: false, value: item.materialOfEartElectrodeRem}),
        sizeOfEarthElectrodeOb: new FormControl({disabled: false, value: item.sizeOfEarthElectrodeOb}, Validators.required),
        sizeOfEarthElectrodeRem: new FormControl({disabled: false, value: item.sizeOfEarthElectrodeRem}),
        maximumDistanceEartElectrodeWalOb: new FormControl({disabled: false, value: item.maximumDistanceEartElectrodeWalOb}, Validators.required),
        maximumDistanceEartElectrodeWalRem: new FormControl({disabled: false, value: item.maximumDistanceEartElectrodeWalRem}),
        manimumDistanceEartElectrodeWalOb: new FormControl({disabled: false, value: item.manimumDistanceEartElectrodeWalOb}, Validators.required),
        manimumDistanceEartElectrodeWalRem: new FormControl({disabled: false, value: item.manimumDistanceEartElectrodeWalRem}),
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
    return (<FormArray>this.earthingForm.get('earthingArr')).controls;
  }
  submit1(){
    this.descriptionArr = this.earthingForm.get('descriptionArr') as FormArray;
    this.descriptionArr.push(this.earthingDescription());
  }
  submit2(){
    this.ClampsArr = this.earthingForm.get('ClampsArr') as FormArray;
    this.ClampsArr.push(this.earthingClamps());
  }
  submit3(){
    this.chamberArr = this.earthingForm.get('chamberArr') as FormArray;
    this.chamberArr.push(this.earthElectrodeChamber());
  }  
  removeItem1(a:any,index: any) {
    if(a.value.earthDescriptionId !=0 && a.value.earthDescriptionId !=undefined){
      a.value.flag=false;
    (this.earthingForm.get('descriptionArr') as FormArray).removeAt(index);
    this.descriptionPushArr= this.descriptionPushArr.concat(a.value);
   
   }
    else{(this.earthingForm.get('descriptionArr') as FormArray).removeAt(index);}
  }
  removeItem2(a:any,index: any) {
    if(a.value.earthingClampsId !=0 && a.value.earthingClampsId !=undefined){
      a.value.flag=false;
    (this.earthingForm.get('ClampsArr') as FormArray).removeAt(index);
    this.ClampsPushArr= this.ClampsPushArr.concat(a.value);
   
   }
   else {(this.earthingForm.get('ClampsArr') as FormArray).removeAt(index);}
  }
  removeItem3(a:any,index: any) {
    if(a.value.earthingElectrodeChamberId !=0 && a.value.earthingElectrodeChamberId !=undefined){
      a.value.flag=false;
    (this.earthingForm.get('chamberArr') as FormArray).removeAt(index);
    this.chamberPushArr= this.chamberPushArr.concat(a.value);
   
   }
   else {(this.earthingForm.get('chamberArr') as FormArray).removeAt(index);}
  }
  earthingSystem(): FormGroup {
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
      maximumDistanceEartElectrodeWalOb: new FormControl('', Validators.required),
      maximumDistanceEartElectrodeWalRem: new FormControl(''),
      manimumDistanceEartElectrodeWalOb: new FormControl('', Validators.required),
      manimumDistanceEartElectrodeWalRem: new FormControl(''),

    })
  }
  earthElectrodeChamber(): FormGroup {
    return new FormGroup({
      locationNumber: new FormControl('', Validators.required),
      locationName: new FormControl('', Validators.required),
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
      inspectionFailedInRem: new FormControl(''),
      flag: new FormControl('true')
    })
  }
  earthingClamps(): FormGroup {
    return new FormGroup({
      locationNumber: new FormControl('', Validators.required),
      locationName: new FormControl('', Validators.required),
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
      inspectionFailedInRem: new FormControl(''),
      flag: new FormControl('true')
    })
  }
  earthingDescription(): FormGroup {
    return new FormGroup({
      locationNumber: new FormControl('', Validators.required),
      locationName: new FormControl('', Validators.required),
      soilResistivityInOb: new FormControl('', Validators.required),
      soilResistivityInRem: new FormControl(''),
      earthPitDigOb: new FormControl('', Validators.required),
      earthPitDigRem: new FormControl(''),
      earthElectrodeLesthanDownConductorInOb: new FormControl('', Validators.required),
      earthElectrodeLesthanDownConductorInRem: new FormControl(''),
      connectedEarthTerminalInOb: new FormControl('', Validators.required),
      connectedEarthTerminalInRem: new FormControl(''),
      testJointEarthElectrodeInOb: new FormControl('', Validators.required),
      testJointEarthElectrodeInRem: new FormControl(''),
      grountLevelComponentFilledInOb: new FormControl('', Validators.required),
      grountLevelComponentFilledInRem: new FormControl(''),
      earthElectrodeLocationInOb: new FormControl('', Validators.required),
      earthElectrodeLocationInRem: new FormControl(''),
      earthElectrodeMaterialInOb: new FormControl('', Validators.required),
      earthElectrodeMaterialInRem: new FormControl(''),
      earthElectrodeSizeInOb: new FormControl('', Validators.required),
      earthElectrodeSizeInRem: new FormControl(''),
      earthElectrodeLengthingOb: new FormControl('', Validators.required),
      earthElectrodeLengthingRem: new FormControl(''),
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
      inspectedFailedNoRem: new FormControl(''),
      flag: new FormControl('true')

    })
  }
  onSubmit(flag: any) {
    this.submitted=true;
   
    
    if(this.earthingForm.invalid){return}
    this.earthingLpsDescription.userName = this.router.snapshot.paramMap.get('email') || '{}';;
    this.earthingLpsDescription.basicLpsId = this.basicLpsId;

    this.earthingLpsDescription.earthingClamps = this.earthingForm.value.ClampsArr;
    this.earthingLpsDescription.earthingDescription = this.earthingForm.value.descriptionArr;
    this.earthingLpsDescription.earthingElectrodeChamber = this.earthingForm.value.chamberArr;
    this.earthingLpsDescription.earthingSystem = this.earthingForm.value.earthingArr;
   
    this.earthingLpsDescription.earthingDescription=this.earthingLpsDescription.earthingDescription.concat(this.descriptionPushArr);
    this.earthingLpsDescription.earthingClamps=this.earthingLpsDescription.earthingClamps.concat(this.ClampsPushArr);
    this.earthingLpsDescription.earthingElectrodeChamber=this.earthingLpsDescription.earthingElectrodeChamber.concat(this.chamberPushArr);

    this.descriptionPushArr = [];
    this.ClampsPushArr = [];
    this.chamberPushArr = [];

      if(flag) {
        if(this.earthingForm.dirty && this.earthingForm.touched){ 
        this.lpsEarthingService.updateEarthingLps(this.earthingLpsDescription).subscribe(
          (data) => {
            this.success = true;
            this.successMsg = data;
            this.proceedNext.emit(true);
          },
          (error) => {
            this.Error = true;
            this.errorArr = [];
            this.errorArr = JSON.parse(error.error);
            this.errorMsg = this.errorArr.message;
            this.proceedNext.emit(false);
          }
        )
      }
      else{
                this.success = true;
                this.successMsg ="Required changes for updating process"
                this.proceedNext.emit(true);
      }
      }
      else {
        this.lpsEarthingService.saveEarthingDetails(this.earthingLpsDescription).subscribe(
          (data) => {
            this.success = true;
            this.successMsg = data;
            this.disable = true;
            this.proceedNext.emit(true);
          },
          (error) => {
            this.Error = true;
            this.errorArr = [];
            this.errorArr = JSON.parse(error.error);
            this.errorMsg = this.errorArr.message;
            this.proceedNext.emit(false);
          });
      } 
  }

  get f() {
    return this.earthingForm.controls;
  }
 closeModalDialog() {
      if (this.errorMsg != '') {
        this.Error = false;
        this.modalService.dismissAll((this.errorMsg = ''));
      } else {
        this.success = false;
        this.modalService.dismissAll((this.successMsg = ''));
      }
    }
  
    gotoNextModal(content: any) {
      (this.earthingForm.value);
       if (this.earthingForm.invalid) {
         this.validationError = true;
        
         this.validationErrorMsg = 'Please check all the fields';
         setTimeout(() => {
          this.validationError = false;
         }, 3000);
         return;
       }
       
       if (this.basicLpsId == 0) {
        this.validationError = true;
        this.validationErrorMsg = 'Basics Form is Required, Please fill';
        setTimeout(() => {
          this.validationError = false;
        }, 3000);
        return;
      }
      this.modalService.open(content, { centered: true });
    }
}
