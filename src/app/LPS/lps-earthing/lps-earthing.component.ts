import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationBoxComponent } from 'src/app/confirmation-box/confirmation-box.component';
import { GlobalsService } from 'src/app/globals.service';
import { EarthingLpsDescription } from 'src/app/LPS_model/earthing';
import { LpsEarthing } from 'src/app/LPS_services/lps-earthing';
import { LpsMatstepperComponent } from '../lps-matstepper/lps-matstepper.component';

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
  applicableChambers: boolean=false;
  applicableClamps: boolean=false;
  applicableChambersNote: boolean=true;
  applicableClampsNote: boolean=true;
  TypeAEarthingArr: any = [];
  constructor(
    private formBuilder: FormBuilder,private dialog: MatDialog,
    private lpsEarthings: LpsEarthing,
    private modalService: NgbModal, 
    private router: ActivatedRoute,
    public service: GlobalsService,

  ) {
    this.lpsEarthingService = lpsEarthings;
  }

  ngOnInit(): void {
    this.earthingForm = this.formBuilder.group({
      earthingLpsDescription: this.formBuilder.array([this.allEarthing()])
    });
  }

  allEarthing():FormGroup {
    return new FormGroup({
      earthingTypeInOb: new FormControl('', Validators.required),
      earthingTypeInRem: new FormControl(''),
      bimetallicIssueInOb: new FormControl('', Validators.required),
      bimetallicIssueInRem: new FormControl(''),
      brazingConnectInOb: new FormControl('', Validators.required),
      brazingConnectInRem: new FormControl(''),

      descriptionArr: this.formBuilder.array([this.earthingDescription()]),
      ClampsArr: this.formBuilder.array([this.earthingClamps()]),
      chamberArr: this.formBuilder.array([this.earthElectrodeChamber()]),
      earthingArr: this.formBuilder.array([this.earthingSystem()])
    });
  }

  // Only Accept numbers
  keyPressNumbers(event:any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  reset(){
    this.earthingForm.reset();
  }

  retrieveDetailsfromSavedReports(userName: any,basicLpsId: any,clientName: any,data: any){
      // this.service.lvClick=1;

      this.step4List = data.earthingLpsDescription;
      this.earthingLpsDescription.basicLpsId = basicLpsId;
      this.earthingLpsDescription.earthingId = this.step4List.earthingId;
      this.earthingLpsDescription.earthingTypeInOb = this.step4List.earthingTypeInOb;
      this.earthingLpsDescription.earthingTypeInRem = this.step4List.earthingTypeInRem;
      this.earthingLpsDescription.bimetallicIssueInOb = this.step4List.bimetallicIssueInOb;
      this.earthingLpsDescription.bimetallicIssueInRem = this.step4List.bimetallicIssueInRem;
      this.earthingLpsDescription.brazingConnectInOb = this.step4List.brazingConnectInOb;
      this.earthingLpsDescription.brazingConnectInRem = this.step4List.brazingConnectInRem;
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

    retrieveDetailsfromSavedReports1(userName: any,basicLpsId: any,clientName: any,data: any){
      // this.service.lvClick=1;

      this.step4List = JSON.parse(data);
      this.earthingLpsDescription.basicLpsId = basicLpsId;
      this.earthingLpsDescription.earthingId = this.step4List[0].earthingId;
      this.earthingLpsDescription.earthingTypeInOb = this.step4List[0].earthingTypeInOb;
      this.earthingLpsDescription.earthingTypeInRem = this.step4List[0].earthingTypeInRem;
      this.earthingLpsDescription.bimetallicIssueInOb = this.step4List[0].bimetallicIssueInOb;
      this.earthingLpsDescription.bimetallicIssueInRem = this.step4List[0].bimetallicIssueInRem;
      this.earthingLpsDescription.brazingConnectInOb = this.step4List[0].brazingConnectInOb;
      this.earthingLpsDescription.brazingConnectInRem = this.step4List[0].brazingConnectInRem;
      this.earthingLpsDescription.createdBy = this.step4List[0].createdBy;
      this.earthingLpsDescription.createdDate = this.step4List[0].createdDate;
      this.earthingLpsDescription.userName = this.step4List[0].userName;
      this.populateData1();
      this.flag=true;
    }

    populateData1() {
      for (let item of this.step4List[0].earthingDescription) {     
        if(item.flag) {this.arr1.push(this.createGroup(item));}
      }
      for (let item of this.step4List[0].earthingClamps) {     
        if(item.flag) { this.arr2.push(this.createGroup1(item));}
      }
      for (let item of this.step4List[0].earthingElectrodeChamber) {     
        if(item.flag)  {this.arr3.push(this.createGroup2(item));}
      }
      for (let item of this.step4List[0].earthingSystem) { 
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
      this.step4List=[];
      this.earthingForm.markAsPristine();
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

  overAllEarthingControl(): AbstractControl[] {
    return(<FormArray>this.earthingForm.get('earthingLpsDescription')).controls;
  }

  earthingDescriptionarr(form:any){
    return form.controls.descriptionArr?.controls;
  }

  earthingClampsarr(form:any){
    return form.controls.ClampsArr?.controls;
  }

  earthElectrodeChambearr(form:any){
    return form.controls.chamberArr?.controls;
  }

  earthingSystemarr(form:any){
    return form.controls.earthingArr?.controls;
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
      flag: new FormControl('true'),
      TypeAEarthing: this.formBuilder.array([this.createTypeAEarthingIteration()]),
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
    if (!this.validationError) {
      if(flag) {
        if(this.earthingForm.dirty && this.earthingForm.touched){ 
        this.lpsEarthingService.updateEarthingLps(this.earthingLpsDescription).subscribe(
          (data) => {
            this.success = true;
            this.successMsg = data;
            this.earthingForm.markAsPristine();
            this.service.lvClick=0;
            this.service.logoutClick=0;
            this.service.windowTabClick=0;
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
        if(this.isEditable){
          this.success = true;
          this.proceedNext.emit(true);
        }else{
          this.success = true;
          this.proceedNext.emit(true);
        }
      }
      }
      else {
        this.lpsEarthingService.saveEarthingDetails(this.earthingLpsDescription).subscribe(
          (data) => {
            this.success = true;
            this.successMsg = data;
            this.disable = true;
            this.retriveEarthingDetails();
            this.proceedNext.emit(true);
            this.service.lvClick=0;
            this.service.logoutClick=0;
            this.service.windowTabClick=0;
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
  }

  get f() {
    return this.earthingForm.controls;
  }

  addItemTypeAEarthing(a:any) {
    const dialogRef = this.dialog.open(ConfirmationBoxComponent, {
      width: '420px',
      maxHeight: '90vh',
      disableClose: true,
    });
    dialogRef.componentInstance.lpsAirTModal = false;
    dialogRef.componentInstance.lpsAirHModal = false;
    dialogRef.componentInstance.lpsTypeEModal = true;
    
    dialogRef.componentInstance.confirmBox.subscribe(data=>{
      if(data) {
        this.TypeAEarthingArr = a.controls.TypeAEarthing as FormArray;
        this.TypeAEarthingArr.push(this.createTypeAEarthingIteration());
      }
      else{
        return;
      }
    })
  }
  
  removeItemTypeAEarthing(a: any,x:any) {
    this.earthingForm.markAsTouched();
    this.TypeAEarthingArr = a.controls.TypeAEarthing as FormArray;
    this.TypeAEarthingArr.removeAt(x);
    this.earthingForm.markAsDirty();
  }
  
  createTypeAEarthingIteration()  : FormGroup {
    return this.formBuilder.group({
      grountLevelComponentFilledInOb: new FormControl('', Validators.required),
      grountLevelComponentFilledInRem: new FormControl(''),
      earthElectrodeLocationInOb: new FormControl('', Validators.required),
      earthElectrodeLocationInRem: new FormControl('', Validators.required),
      earthElectrodeMaterialInOb: new FormControl('', Validators.required),
      earthElectrodeMaterialInRem: new FormControl(''),
      earthElectrodeSizeInOb: new FormControl('', Validators.required),
      earthElectrodeSizeInRem: new FormControl(''),
      earthElectrodeLengthingOb: new FormControl('', Validators.required),
      earthElectrodeLengthingRem: new FormControl(''),

      // holderTypeOb: new FormControl('', Validators.required),
      // holderTypeRe: new FormControl('', Validators.required),
      // materailOfHolderOb: new FormControl('', Validators.required),
      // materailOfHolderRem: new FormControl('', Validators.required),
      // totalHolderNoOb: new FormControl('', Validators.required),
      // totalHolderNoRe: new FormControl('', Validators.required),
      // holderInspNoOb: new FormControl('', Validators.required),
      // holderInspNoRe: new FormControl('', Validators.required),
      // holderInspPassedNoOb: new FormControl('', Validators.required),
      // holderInspPassedNoRe: new FormControl('', Validators.required),
      // holderInspFailedNoOb: new FormControl('', Validators.required),
      // holderInspFailedNoRe: new FormControl('', Validators.required),
      flag: new FormControl('true'),
    });
  }
  getTypeAEarthingControls(form:any) {
    return form.controls.TypeAEarthing?.controls;
  }
  onChangeClamps(event: any,a:any) {
    let changedValue;
    if(event.target != undefined) {
      changedValue = event.target.value;
    }
    else{
      changedValue = event;
    }
    if (changedValue == 'Not applicable') {
      this.applicableClamps=false;
      this.applicableClampsNote=true;
      for(let y in a.controls){
        console.log(y);
        a.controls[y].clearValidators();
        a.controls[y].updateValueAndValidity();
      }
     // a.controls['physicalInspectionOb'].clearValidators();
     // a.controls['physicalInspectionOb'].updateValueAndValidity();

    }
    else{
      this.applicableClamps=true;
      this.applicableClampsNote=false;
      for(let y in a.controls){
        console.log(y);
        a.controls[y].setValidators([Validators.required]);
        a.controls[y].updateValueAndValidity();
      }
     // a.controls['physicalInspectionOb'].setValidators([Validators.required]);
      //a.controls['physicalInspectionOb'].updateValueAndValidity();
   
    }
  }
  onChangeChambers(event: any,a:any) {
    let changedValue;
    if(event.target != undefined) {
      changedValue = event.target.value;
    }
    else{
      changedValue = event;
    }
    if (changedValue == 'Not applicable') {
      this.applicableChambers=false;
      this.applicableChambersNote=true;
      for(let y in a.controls){
        console.log(y);
        a.controls[y].clearValidators();
        a.controls[y].updateValueAndValidity();
      }
     // a.controls['physicalInspectionOb'].clearValidators();
     // a.controls['physicalInspectionOb'].updateValueAndValidity();

    }
    else{
      this.applicableChambers=true;
      this.applicableChambersNote=false;
      for(let y in a.controls){
        console.log(y);
        a.controls[y].setValidators([Validators.required]);
        a.controls[y].updateValueAndValidity();
      }
     // a.controls['physicalInspectionOb'].setValidators([Validators.required]);
      //a.controls['physicalInspectionOb'].updateValueAndValidity();
   
    }
  }
 onChangeForm(event:any){
    if(!this.earthingForm.invalid){
      if(this.earthingForm.dirty){
        this.validationError=false;
        this.service.lvClick=1;
        this.service.logoutClick=1;
        this.service.windowTabClick=1;
      }
      else{
        this.validationError=false;
        this.service.lvClick=0;
        this.service.logoutClick=0;
        this.service.windowTabClick=0;
      }
     }
     else {
      this.service.lvClick=1;
      this.service.logoutClick=1;
      this.service.windowTabClick=1;
     }
  }
  onKeyForm(event: KeyboardEvent) { 
   if(!this.earthingForm.invalid){ 
    if(this.earthingForm.dirty){
      this.validationError=false;
      this.service.lvClick=1;
      this.service.logoutClick=1;
      this.service.windowTabClick=1;
    }
    else{
      this.validationError=false;
      this.service.lvClick=0;
      this.service.logoutClick=0;
      this.service.windowTabClick=0;
    }
   }
   else {
    this.service.lvClick=1;
    this.service.logoutClick=1;
    this.service.windowTabClick=1;
   }
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
  
    gotoNextModal(content: any,contents:any) {
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
      //  Update and Success msg will be showing
      if(this.earthingForm.dirty && this.earthingForm.touched){
        this.modalService.open(content, { centered: true,backdrop: 'static' });
     }
    //  For Dirty popup
     else{
      this.modalService.open(contents, { centered: true,backdrop: 'static' });
     }
    }

    retriveEarthingDetails(){
      this.lpsEarthings.retrieveEarthingLps(this.router.snapshot.paramMap.get('email') || '{}',this.basicLpsId).subscribe(
        data => {
          this.retrieveDetailsfromSavedReports1(this.earthingLpsDescription.userName,this.basicLpsId,this.ClientName,data);
        },
        error=>{
        }
      );  
    }

   dosomethingRetriveEarthingDetails(userName:any,basicLpsId:any){
      this.lpsEarthings.retrieveEarthingLps(userName,basicLpsId).subscribe(
        data => {
          this.retrieveDetailsfromSavedReports1(userName,basicLpsId,'',data);
        },
        error=>{
          this.ngOnInit();
        }
      );  
    }
}
