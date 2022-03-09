import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { exclamationSquareFill } from 'ngx-bootstrap-icons';
import { ConfirmationBoxComponent } from 'src/app/confirmation-box/confirmation-box.component';
import { GlobalsService } from 'src/app/globals.service';
import { earthingReport } from 'src/app/LPS_model/earthingReport';
import { AirterminationService } from 'src/app/LPS_services/airtermination.service';
import { LpsEarthing } from 'src/app/LPS_services/lps-earthing';
import { LpsMatstepperComponent } from '../lps-matstepper/lps-matstepper.component';

@Component({
  selector: 'app-lps-earthing',
  templateUrl: './lps-earthing.component.html',
  styleUrls: ['./lps-earthing.component.css']
})
export class LpsEarthingComponent implements OnInit {

  earthingForm!: FormGroup;
  earthingReport = new earthingReport;
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

  mandatory1: boolean = true;

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
  deletedLpstestingofearthelectrodes: any = [];
  earthingDescriptionListDeleted: any = [];
  clampsDeleted: any = [];
  earthingElectrodeChamberDeleted: any = [];
  flag: boolean = false;

  descriptionArr!: FormArray;
  ClampsArr!: FormArray;
  chamberArr!: FormArray;
  earthingArr!: FormArray;
  earthing!: FormArray;
  earthingDescriptionList!: FormArray;
  earthingLpsDescription!: FormArray;
  earthingDescription!: FormArray;
  earthElectrodeTesting!: FormArray;
  earthElectrodeTestingArr!: FormArray;
  earthingClamps!: FormArray;
  earthingElectrodeChamber!: FormArray;
  earthingSystem!: FormArray;

  earthingDescriptionListArr: any = [];
  descriptionPushArr: any = [];
  ClampsPushArr: any = [];
  chamberPushArr: any = [];
  isEditable!:boolean
  applicableChambers: any = [];
  applicableClamps:  any = [];
  applicableChambersNote: any = [];;
  applicableClampsNote: any = [];
  TypeAEarthingArr: any = [];

  typeAearthingsystem: any=[];
  clamps: any=[];
  earthelectrodechambers: any=[];
  typeBearthingsystem: any=[];
  testingofearthelectrodes: any=[];
  earthingType: String='';
  airterminationData: any=[];
  isAirterminationUpdated:boolean=false;
  availabilityOfPreviousReport: String="";
  earthelectMaxiDistEditable:boolean=false;
  validationErrorTab: boolean = false;
  validationErrorMsgTab: string="";
  tabError: boolean=false;
  tabErrorMsg: string="";

  constructor(
    private formBuilder: FormBuilder,private dialog: MatDialog,
    private lpsEarthings: LpsEarthing,
    private modalService: NgbModal, 
    private router: ActivatedRoute,
    public service: GlobalsService,
    public airterminationServices: AirterminationService,

  ) {
    this.lpsEarthingService = lpsEarthings;
  }

  ngOnInit(): void {
    this.earthingForm = this.formBuilder.group({
      earthing: this.formBuilder.array([this.earthingLpsDescriptionForm('','','')])
    });
    if(this.isAirterminationUpdated){
    this.retriveEarthingDetails();
    this.isAirterminationUpdated=false;
    }
    
  }

  earthingLpsDescriptionForm(buildingNumber:any,buildingName:any,buildingCount:any) {
    return this.formBuilder.group({
      buildingNumber:new FormControl(buildingNumber),
      buildingName: new FormControl(buildingName),
      buildingCount: new FormControl(buildingCount),
      earthingTypeInOb: new FormControl('', Validators.required),
      earthingTypeInRem: new FormControl(''),
      bimetallicIssueInOb: new FormControl('', Validators.required),
      bimetallicIssueInRem: new FormControl(''),
      brazingConnectInOb: new FormControl('', Validators.required),
      brazingConnectInRem: new FormControl(''),
      flag: new FormControl('A'), 
     // earthingDescriptionAvailabilityOb: new FormControl(''),
     // earthingDescriptionAvailabilityRem: new FormControl(''),
      earthingClampsAvailabilityOb: new FormControl(''),
      earthingClampsAvailabilityRem: new FormControl(''),
      earthingElectrodeChamberAvailabilityOb: new FormControl(''),
      earthingElectrodeChamberAvailabilityRem:  new FormControl(''),
     // earthingSystemAvailabilityOb: new FormControl(''),
     // earthingSystemAvailabilityRem:  new FormControl(''),
     // earthingElectrodeTestingAvailabilityOb: new FormControl(''),
     // earthingElectrodeTestingAvailabilityRem:  new FormControl(''),                              
     earthingElectrodeTestingAvailabilityOb:  new FormControl(''),                          

      earthingDescription: this.formBuilder.array([this.earthingDescriptionArray()]),
      earthingClamps: this.formBuilder.array([]),
      earthingElectrodeChamber: this.formBuilder.array([]),
      earthingSystem: this.formBuilder.array([this.earthingSystemArray()]),
      earthElectrodeTesting: this.formBuilder.array([])
    });
  }
  
  dropDown(event: any,a:any){
    let changedValue;
    if(event.target != undefined) {
      changedValue = event.target.value;
    }
    else{
      changedValue = event;
    }
      if(changedValue == "YES"){
        this.mandatory1=true;
        a.controls.bimetallicIssueInRem.setValidators(Validators.required);
        a.controls.bimetallicIssueInRem.updateValueAndValidity();
      }
      if(changedValue != "YES" ){
        this.mandatory1=true;
        a.controls.bimetallicIssueInRem.clearValidators();
        a.controls.bimetallicIssueInRem.updateValueAndValidity();
      }
  }

  earthingDescriptionArray():FormGroup {
    return new FormGroup({
    
      flag: new FormControl('A'),
      soilResistivityInOb: new FormControl('', Validators.required),
      soilResistivityInRem: new FormControl(''),
      earthElectrodeLesthanDownConductorInOb: new FormControl('', Validators.required),
      earthElectrodeLesthanDownConductorInRem: new FormControl(''),
      connectedEarthTerminalInOb: new FormControl('', Validators.required),
      connectedEarthTerminalInRem: new FormControl(''),
      testJointEarthElectrodeInOb: new FormControl('', Validators.required),
      testJointEarthElectrodeInRem: new FormControl(''),
      grountLevelComponentFilledInOb: new FormControl('', Validators.required),
      grountLevelComponentFilledInRem: new FormControl(''),
      
      earthingDescriptionList: this.formBuilder.array([this.earthingDescriptionListForm()]),
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
    });
  }

  earthingDescriptionListForm():FormGroup {
    return new FormGroup({
      flag: new FormControl('A'),
      earthingConductorMaterialInOb: new FormControl('', Validators.required),
      earthingConductorMaterialInRem: new FormControl(''),
      earthElectrodeMaterialInOb: new FormControl('', Validators.required),
      earthElectrodeMaterialInRem: new FormControl(''),
      earthElectrodeTypeInOb: new FormControl('', Validators.required),
      earthElectrodeTypeInRem: new FormControl(''),
      earthElectrodeSizeInOb: new FormControl('', Validators.required),
      earthElectrodeSizeInRem: new FormControl(''),
      earthElectrodeLengthingOb: new FormControl('', Validators.required),
      earthElectrodeLengthingRem: new FormControl(''),
    });
  }


  earthingClampsArray():FormGroup {
    return new FormGroup({
      flag: new FormControl('A'), 
      
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

    });
  }

  earthingElectrodeChamberArray():FormGroup {
    return new FormGroup({
    flag: new FormControl('A'),
    physicalInspeOb: new FormControl('', Validators.required),
    physicalInspeRem: new FormControl(''),
    chamberTypeOb: new FormControl('', Validators.required),
    chamberTypeRem: new FormControl(''),
    chamberSizeOb: new FormControl('', Validators.required),
    chamberSizeRem: new FormControl(''),
    maximumWithStandLoadOb: new FormControl('', Validators.required),
    maximumWithStandLoadRem: new FormControl(''),
    chamberLocationOb: new FormControl('', Validators.required),
    chamberLocationRem: new FormControl(''),
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
       
    });
  }

  earthingSystemArray():FormGroup {
    return new FormGroup({
      
      flag: new FormControl('A'),
      eastOb: new FormControl(null, Validators.required),
      eastRem: new FormControl(''),
      westOb: new FormControl(null, Validators.required),
      westRem: new FormControl(''),
      northOb: new FormControl(null, Validators.required),
      northRem: new FormControl(''),
      southOb: new FormControl(null, Validators.required),
      southRem: new FormControl(''),
      ringWallEarthEastOb: new FormControl(null, Validators.required),
      ringWallEarthEastRem: new FormControl(''),
      ringWallEarthWestOb: new FormControl(null, Validators.required),
      ringWallEarthWestRem: new FormControl(''),
      ringWallEarthNorthOb: new FormControl(null, Validators.required),
      ringWallEarthNorthRem: new FormControl(''),
      ringWallEarthSouthOb: new FormControl(null, Validators.required),
      ringWallEarthSouthRem: new FormControl(''),
      connectedEarthElectrodeOb: new FormControl('', Validators.required),
      connectedEarthElectrodeRem: new FormControl(''),
      jointsMadeBrazingOb: new FormControl('', Validators.required),
      jointsMadeBrazingRem: new FormControl(''),
      materialOfEartElectrodeOb: new FormControl('', Validators.required),
      materialOfEartElectrodeRem: new FormControl(''),
      typeOfEarthElectrodeOb: new FormControl('', Validators.required),
      typeOfEarthElectrodeRem: new FormControl(''),
      sizeOfEarthElectrodeOb: new FormControl('', Validators.required),
      sizeOfEarthElectrodeRem: new FormControl(''),
      maximumDistanceEartElectrodeWalOb: new FormControl(null, Validators.required),
      maximumDistanceEartElectrodeWalRem: new FormControl(''),
      manimumDistanceEartElectrodeWalOb: new FormControl(null, Validators.required),
      manimumDistanceEartElectrodeWalRem: new FormControl(''),

    });
  }
  earthElectrodeTestingArray():FormGroup {
    return new FormGroup({
       serialNo: new FormControl('', Validators.required),
      flag: new FormControl('A'),
      earthingElectrodeType: new FormControl('', Validators.required),
      earthingElectrodeMaterial: new FormControl('', Validators.required),
      earthingElectrodeSize: new FormControl(null, Validators.required),
      earthingElectrodeDepth: new FormControl(null, Validators.required),
      earthingElectrodeResistance: new FormControl(null, Validators.required),
      earthingElectrodeRemarks!: new FormControl(''),

    });
  }
  

  // Only Accept numbers
  keyPressNumbers(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9 with dot
    if (charCode != 46 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
        return true;
    }
  }

  
  checkEarthelectMaxiDistWallInOb(event: any, form: any, fromcontrolName: any) {
    let number =event.target.value.replace(/^"|"$/g, '');
    if (fromcontrolName == "earthelectMaxiDistWallInRem" || fromcontrolName == "earthelectManimumDistanceWallInRem"
      || fromcontrolName == "ringWallEarthSouthRem" || fromcontrolName == "ringWallEarthNorthRem"
      || fromcontrolName == "ringWallEarthWestRem" || fromcontrolName == "ringWallEarthEastRem"
    ) {
      if (number < 1) {
        form.controls[fromcontrolName].setValue('To avoid step potential and touch potential distance should be more than 1 meter');
      }
      else {
        form.controls[fromcontrolName].setValue('');
      }
    }
    else if (fromcontrolName == "eastRem" || fromcontrolName == "westRem"
      || fromcontrolName == "northRem" || fromcontrolName == "southRem"
    ) {
      if (number < 0.5) {
        form.controls[fromcontrolName].setValue('As per latest standard IS/IEC 62305, depth should be 0.5 meter or more');
      }
      else {
        form.controls[fromcontrolName].setValue('');
      }
    }
  }


  reset(){
    this.earthingForm.reset();
  }

  retrieveDetailsfromSavedReports(basicLpsId: any,data: any){
      // this.service.lvClick=1;
      if(data.basicLpsId != undefined && data.basicLpsId != 0){
        this.step4List = data;
        this.populateData(data);
      }
      else{
        this.step4List = data.earthingReport;
        setTimeout(() => {
          this.createEarthingForm(data.airTermination);
        }, 500);
        this.populateData(data.earthingReport);
      }
      this.earthingReport.basicLpsId = basicLpsId;
      this.earthingReport.earthingReportId = this.step4List.earthingReportId;
      this.earthingReport.createdBy = this.step4List.createdBy;
      this.earthingReport.createdDate = this.step4List.createdDate;
      this.earthingReport.userName = this.step4List.userName;
      this.flag=true; 
      
    }

  populateData(data: any) {
    let index = 0;
    for (let item of data.earthingLpsDescription) {
      this.arr1.push(this.createGroup(item));
      this.onKey(item.earthingTypeInOb, null, index);
      this.onEarthElectrodes(item.earthingElectrodeTestingAvailabilityOb,null,index);
      this.onChangeClamps(item.earthingClampsAvailabilityOb,null,index);
      this.onChangeChambers(item.earthingElectrodeChamberAvailabilityOb,null,index);
      index = index + 1;
    }
    this.earthingForm.setControl('earthing', this.formBuilder.array(this.arr1 || []));
    this.arr1 = [];
  }

    retrieveDetailsfromSavedReports1(basicLpsId: any,data: any){
      this.step4List = data.earthingReport;
      this.earthingReport.basicLpsId = basicLpsId;
      this.earthingReport.earthingReportId = this.step4List.earthingReportId;
      this.earthingReport.createdBy = this.step4List.createdBy;
      this.earthingReport.createdDate = this.step4List.createdDate;
      this.earthingReport.userName = this.step4List.userName;
      this.flag=true; 
      this.populateData(data.earthingReport);
      
      setTimeout(() => {
        this.createEarthingForm(data.airTermination);
      }, 300);
    }

    createGroup(item: any): FormGroup {
      return this.formBuilder.group({
      //description arr
      flag: new FormControl({disabled: false, value: item.flag}),
      earthingId: new FormControl({disabled: false, value: item.earthingId}),
      earthingTypeInOb: new FormControl({disabled: false, value: item.earthingTypeInOb}, Validators.required),
      earthingTypeInRem: new FormControl({disabled: false, value: item.earthingTypeInRem}),
      bimetallicIssueInOb: new FormControl({disabled: false, value: item.bimetallicIssueInOb}, Validators.required),
      bimetallicIssueInRem: new FormControl({disabled: false, value: item.bimetallicIssueInRem}),
      brazingConnectInOb: new FormControl({disabled: false, value: item.brazingConnectInOb}, Validators.required),
      brazingConnectInRem: new FormControl({disabled: false, value: item.brazingConnectInRem}),
      buildingNumber: new FormControl({disabled: false, value: item.buildingNumber}, Validators.required),
      buildingName: new FormControl({disabled: false, value: item.buildingName}, Validators.required),
      buildingCount: new FormControl({disabled: false, value: item.buildingCount}, Validators.required),
      earthingClampsAvailabilityOb: new FormControl({disabled: false, value: item.earthingClampsAvailabilityOb}),
      earthingClampsAvailabilityRem: new FormControl({disabled: false, value: item.earthingClampsAvailabilityRem}),
      earthingElectrodeChamberAvailabilityOb: new FormControl({disabled: false, value: item.earthingElectrodeChamberAvailabilityOb}),
      earthingElectrodeChamberAvailabilityRem:  new FormControl({disabled: false, value: item.earthingElectrodeChamberAvailabilityRem}),
      earthingElectrodeTestingAvailabilityOb:  new FormControl({disabled: false, value: item.earthingElectrodeTestingAvailabilityOb}, Validators.required),

      earthingDescription: this.formBuilder.array(this.populateEarthingDescription(item)),
      earthingClamps: this.formBuilder.array(this.populateEarthingClamps(item)),
      earthingElectrodeChamber: this.formBuilder.array(this.populateEarthingElectrodeChamber(item)),
      earthingSystem: this.formBuilder.array(this.populateEarthingSystem(item)),
      earthElectrodeTesting: this.formBuilder.array(this.populateEarthElectrodeTesting(item)),


      });
    }

    populateEarthingDescription(item:any){
      let earthingDescription:any=[];
      for (let value of item.earthingDescription) {
        earthingDescription.push(this.populateEarthingDescriptionFormGroup(value));   
      } 
      return earthingDescription;
    }
    populateEarthingDescriptionFormGroup(item:any): FormGroup {
      return this.formBuilder.group({
        earthDescriptionId: new FormControl({disabled: false, value: item.earthDescriptionId}, Validators.required),
        flag : new FormControl({disabled: false, value: item.flag}),
       // locationNumber: new FormControl({disabled: false, value: item.locationNumber}),
       // locationName: new FormControl({disabled: false, value: item.locationName}),
        soilResistivityInOb: new FormControl({disabled: false, value: item.soilResistivityInOb}, Validators.required),
        soilResistivityInRem: new FormControl({disabled: false, value: item.soilResistivityInRem}),
       // earthPitDigOb: new FormControl({disabled: false, value: item.earthPitDigOb}, Validators.required),
       // earthPitDigRem: new FormControl({disabled: false, value: item.earthPitDigRem}),
        earthElectrodeLesthanDownConductorInOb: new FormControl({disabled: false, value: item.earthElectrodeLesthanDownConductorInOb}, Validators.required),
        earthElectrodeLesthanDownConductorInRem: new FormControl({disabled: false, value: item.earthElectrodeLesthanDownConductorInRem}),
        connectedEarthTerminalInOb: new FormControl({disabled: false, value: item.connectedEarthTerminalInOb}, Validators.required),
        connectedEarthTerminalInRem: new FormControl({disabled: false, value: item.connectedEarthTerminalInRem}),
        testJointEarthElectrodeInOb: new FormControl({disabled: false, value: item.testJointEarthElectrodeInOb}, Validators.required),
        testJointEarthElectrodeInRem: new FormControl({disabled: false, value: item.testJointEarthElectrodeInRem}),
        grountLevelComponentFilledInOb: new FormControl({disabled: false, value: item.grountLevelComponentFilledInOb}, Validators.required),
        grountLevelComponentFilledInRem: new FormControl({disabled: false, value: item.grountLevelComponentFilledInRem}),
       // earthElectrodeLocationInOb: new FormControl({disabled: false, value: item.earthElectrodeLocationInOb}, Validators.required),
       // earthElectrodeLocationInRem: new FormControl({disabled: false, value: item.earthElectrodeLocationInRem}),
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
        earthingDescriptionList: this.formBuilder.array(this.populateEarthingDescriptionList(item)),
     
        
      })
    }

    populateEarthingDescriptionList(item:any){
      let earthingDescriptionList:any=[];
      for (let value of item.earthingDescriptionList) {
        earthingDescriptionList.push(this.earthingDescriptionListFormGroup(value));   
      } 
      return earthingDescriptionList;
    }
 
    earthingDescriptionListFormGroup(item: any): FormGroup {
      return this.formBuilder.group({
      flag:  new FormControl({disabled: false, value: item.flag}),
      earthDescriptionListId:  new FormControl({disabled: false, value: item.earthDescriptionListId}),
      earthingConductorMaterialInOb:  new FormControl({disabled: false, value: item.earthingConductorMaterialInOb}, Validators.required),
      earthingConductorMaterialInRem:  new FormControl({disabled: false, value: item.earthingConductorMaterialInRem}),
      earthElectrodeMaterialInOb:  new FormControl({disabled: false, value: item.earthElectrodeMaterialInOb}, Validators.required),
      earthElectrodeMaterialInRem:  new FormControl({disabled: false, value: item.earthElectrodeMaterialInRem}),
      earthElectrodeTypeInOb:  new FormControl({disabled: false, value: item.earthElectrodeTypeInOb}, Validators.required),
      earthElectrodeTypeInRem:  new FormControl({disabled: false, value: item.earthElectrodeTypeInRem}),
      earthElectrodeSizeInOb:  new FormControl({disabled: false, value: item.earthElectrodeSizeInOb}, Validators.required),
      earthElectrodeSizeInRem:  new FormControl({disabled: false, value: item.earthElectrodeSizeInRem}),
      earthElectrodeLengthingOb:  new FormControl({disabled: false, value: item.earthElectrodeLengthingOb}, Validators.required),
      earthElectrodeLengthingRem:  new FormControl({disabled: false, value: item.earthElectrodeLengthingRem}),
      buildingCount:  new FormControl('')
       })}

    populateEarthingClamps(item:any){
      let earthingClamps:any=[]; 
      for (let value of item.earthingClamps) { 
        earthingClamps.push(this.populateEarthingClampsFormGroup(value));  
      } 
      return earthingClamps;   
    }   
     

      populateEarthingClampsFormGroup(item: any): FormGroup {
      return this.formBuilder.group({
        // clamps
        flag: new FormControl({disabled: false, value: item.flag}),
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
        inspectionFailedInRem: new FormControl({disabled: false, value: item.inspectionFailedInRem}),
        buildingCount:  new FormControl('')
      });
    }

    populateEarthingElectrodeChamber(item:any){
      let earthingElectrodeChamber:any=[];
      for (let value of item.earthingElectrodeChamber) {
        earthingElectrodeChamber.push(this.populateearthingElectrodeChamberFormGroup(value));  
      } 
      return earthingElectrodeChamber;   
    }  

    populateearthingElectrodeChamberFormGroup(item: any): FormGroup {
      return this.formBuilder.group({
        //chamber
        flag: new FormControl({disabled: false, value: item.flag}),
        chamberLocationOb: new FormControl({disabled: false, value: item.chamberLocationOb}, Validators.required),
        chamberLocationRem: new FormControl({disabled: false, value: item.chamberLocationRem}),
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
        inspectionFailedInRem: new FormControl({disabled: false, value: item.inspectionFailedInRem}),
        buildingCount:  new FormControl('')
      });
    }

    populateEarthingSystem(item:any){
      let earthingSystem:any=[];
      for (let value of item.earthingSystem) {
        earthingSystem.push(this.populateEarthingSystemFormGroup(value));   
      } 
      return earthingSystem;   
    } 
    populateEarthingSystemFormGroup(item: any): FormGroup {
      return this.formBuilder.group({
        //earthing
        
        earthingSystemId: new FormControl({disabled: false, value: item.earthingSystemId}),
        eastOb: new FormControl({disabled: false, value: item.eastOb}, Validators.required),
        eastRem: new FormControl({disabled: false, value: item.eastRem}),
        westOb: new FormControl({disabled: false, value: item.westOb}, Validators.required),
        westRem: new FormControl({disabled: false, value: item.westRem}),
        northOb: new FormControl({disabled: false, value: item.northOb}, Validators.required),
        northRem: new FormControl({disabled: false, value: item.northRem}),
        southOb: new FormControl({disabled: false, value: item.southOb}, Validators.required),
        southRem: new FormControl({disabled: false, value: item.southRem}),
        ringWallEarthEastOb: new FormControl({disabled: false, value: item.ringWallEarthEastOb}, Validators.required),
        ringWallEarthEastRem: new FormControl({disabled: false, value: item.ringWallEarthEastRem}),
        ringWallEarthWestOb: new FormControl({disabled: false, value: item.ringWallEarthWestOb}, Validators.required),
        ringWallEarthWestRem: new FormControl({disabled: false, value: item.ringWallEarthWestRem}),
        ringWallEarthNorthOb: new FormControl({disabled: false, value: item.ringWallEarthNorthOb}, Validators.required),
        ringWallEarthNorthRem: new FormControl({disabled: false, value: item.ringWallEarthNorthRem}),
        ringWallEarthSouthOb: new FormControl({disabled: false, value: item.ringWallEarthSouthOb}, Validators.required),
        ringWallEarthSouthRem: new FormControl({disabled: false, value: item.ringWallEarthSouthRem}),
        connectedEarthElectrodeOb: new FormControl({disabled: false, value: item.connectedEarthElectrodeOb}, Validators.required),
        connectedEarthElectrodeRem: new FormControl({disabled: false, value: item.connectedEarthElectrodeRem}),
        typeOfEarthElectrodeOb: new FormControl({disabled: false, value: item.typeOfEarthElectrodeOb}, Validators.required),
        typeOfEarthElectrodeRem: new FormControl({disabled: false, value: item.typeOfEarthElectrodeRem}),
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

    populateEarthElectrodeTesting(item:any){
      let earthElectrodeTesting:any=[];
      if(this.availabilityOfPreviousReport =="NO"){
        for (let value of item.earthElectrodeTesting) {
          earthElectrodeTesting.push(this.earthElectrodeTestingFormGroup(value)); 
        } 
      }
      
      return earthElectrodeTesting;   
    } 

    earthElectrodeTestingFormGroup(item: any): FormGroup {
      return this.formBuilder.group({
        //chamber
        flag: new FormControl({disabled: false, value: item.flag}),
        earthingElectrodeTestingId: new FormControl({disabled: false, value: item.earthingElectrodeTestingId}, Validators.required),
        serialNo: new FormControl({disabled: false, value: item.serialNo}, Validators.required),
        earthingElectrodeType: new FormControl({disabled: false, value: item.earthingElectrodeType}, Validators.required),
        earthingElectrodeMaterial: new FormControl({disabled: false, value: item.earthingElectrodeMaterial}, Validators.required),
        earthingElectrodeSize: new FormControl({disabled: false, value: item.earthingElectrodeSize}, Validators.required),
        earthingElectrodeDepth: new FormControl({disabled: false, value: item.earthingElectrodeDepth}, Validators.required),
        earthingElectrodeResistance: new FormControl({disabled: false, value: item.earthingElectrodeResistance}, Validators.required),
        earthingElectrodeRemarks: new FormControl({disabled: false, value: item.earthingElectrodeRemarks}, Validators.required),
        buildingCount: new FormControl(''),
      });
    }

  overAllEarthingControl(): AbstractControl[] {
    return(<FormArray>this.earthingForm.get('earthing')).controls;
  }

  earthingDescriptionarr(form:any){
    return form.controls.earthingDescription?.controls;
  }

  earthingDescriptionListControls(form:any){
    return form.controls.earthingDescriptionList?.controls;
  }

  earthingClampsarr(form:any){
    return form.controls.earthingClamps?.controls;
  }

  earthElectrodeChambearr(form:any){
    return form.controls.earthingElectrodeChamber?.controls;
  }

  earthingSystemarr(form:any){
    return form.controls.earthingSystem?.controls;
  }

  earthElectrodeTestingarr(form:any){
    return form.controls.earthElectrodeTesting?.controls;
  }
   
  
 
  onSubmit(flag: any) {
    this.submitted=true;
    
    if(this.earthingForm.invalid){return}
    this.earthingReport.earthingLpsDescription=this.earthingForm.value.earthing
    this.earthingReport.userName = this.router.snapshot.paramMap.get('email') || '{}';
    this.earthingReport.basicLpsId = this.basicLpsId;
    
    //deleted Data
    for (let index = 0; index < this.earthingReport.earthingLpsDescription.length; index++) {
      //deleted earthingDescriptionList
      for(let i = 0; i < this.earthingDescriptionListDeleted.length; i++){
        if(this.earthingReport.earthingLpsDescription[index].buildingCount == this.earthingDescriptionListDeleted[i].buildingCount){
          this.earthingReport.earthingLpsDescription[index].earthingDescription[this.earthingReport.earthingLpsDescription[index].earthingDescription.length -1].earthingDescriptionList.push(this.earthingDescriptionListDeleted[i]);
        }
      }
       //deleted earthElectrodeTesting
      for(let i = 0; i < this.deletedLpstestingofearthelectrodes.length; i++){
        if(this.earthingReport.earthingLpsDescription[index].buildingCount == this.deletedLpstestingofearthelectrodes[i].buildingCount){
          this.earthingReport.earthingLpsDescription[index].earthElectrodeTesting.push(this.deletedLpstestingofearthelectrodes[i]);
        }
      }
       //deleted earthingClamps
      if(this.clampsDeleted !=[] && this.clampsDeleted.length > index && this.earthingReport.earthingLpsDescription[index].buildingCount == this.clampsDeleted[index].buildingCount){
        this.earthingReport.earthingLpsDescription[index].earthingClamps.push(this.clampsDeleted[index]);
      }
       //deleted chamber
      if(this.earthingElectrodeChamberDeleted !=[] && this.earthingElectrodeChamberDeleted.length > index && this.earthingElectrodeChamberDeleted.length > index && this.earthingReport.earthingLpsDescription[index].buildingCount == this.earthingElectrodeChamberDeleted[index].buildingCount){
        this.earthingReport.earthingLpsDescription[index].earthingElectrodeChamber.push(this.earthingElectrodeChamberDeleted[index]);
      }
    }

    this.earthingDescriptionListDeleted = [];
    this.deletedLpstestingofearthelectrodes = []  
    this.clampsDeleted = []  
    this.earthingElectrodeChamberDeleted = []  
   
    // this.descriptionPushArr = [];
    // this.ClampsPushArr = [];
    // this.chamberPushArr = [];
    if (!this.validationError) {
      if(flag) {
        if(this.earthingForm.dirty && this.earthingForm.touched){ 
        this.lpsEarthingService.updateEarthingLps(this.earthingReport).subscribe(
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
        this.lpsEarthingService.saveEarthingDetails(this.earthingReport).subscribe(
          (data) => {
            this.success = true;
            this.successMsg = data;
            this.disable = true;
            this.retriveEarthingDetails();
            this.getAirterminationData();
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
        this.earthingDescriptionList = a.controls.earthingDescriptionList as FormArray;
        this.earthingDescriptionList.push(this.earthingDescriptionListForm());
      }
      else{
        return;
      }
    })
  }

  addElectrodeTesting(a:any){
    this.earthElectrodeTesting = a.controls.earthElectrodeTesting as FormArray;
        this.earthElectrodeTesting.push(this.earthElectrodeTestingArray());
  }

  removeItemTypeAEarthing(a: any, x: any, earthingFormArray: any) {
    this.earthingForm.markAsTouched();

    if (a.controls.earthingDescriptionList.controls[x].controls.earthDescriptionListId != undefined &&
      a.controls.earthingDescriptionList.controls[x].controls.earthDescriptionListId.value != 0 &&
      a.controls.earthingDescriptionList.controls[x].controls.earthDescriptionListId.value != undefined &&
      a.controls.earthingDescriptionList.controls[x].controls.earthDescriptionListId.value != '') {

      a.controls.earthingDescriptionList.controls[x].controls.flag.setValue('R');
      a.controls.earthingDescriptionList.controls[x].controls.buildingCount.setValue(earthingFormArray.controls.buildingCount.value);
      a.controls.earthingDescriptionList.controls[x].controls.flag.updateValueAndValidity();
      this.earthingDescriptionListDeleted.push(a.controls.earthingDescriptionList.value[x]);
    }
    (a.controls.earthingDescriptionList as FormArray).removeAt(x);
    this.earthingForm.markAsDirty();
  }

  removeElectrodeTesting(a: any, x: any, earthingFormArray: any) {
    this.earthingForm.markAsTouched();

    if (a.controls.earthingElectrodeTestingId != undefined &&
      a.controls.earthingElectrodeTestingId.value != undefined &&
      a.controls.earthingElectrodeTestingId.value != 0 &&
      a.controls.earthingElectrodeTestingId.value != '') {

      a.controls.flag.setValue('R');
      a.controls.buildingCount.setValue(earthingFormArray.controls.buildingCount.value);
      this.deletedLpstestingofearthelectrodes.push(a.value);
    }
    (earthingFormArray.controls.earthElectrodeTesting as FormArray).removeAt(x);
    this.earthingForm.markAsDirty();
  }
  
  createTypeAEarthingIteration()  : FormGroup {
    return this.formBuilder.group({
      grountLevelComponentFilledInOb: new FormControl('', Validators.required),
      grountLevelComponentFilledInRem: new FormControl(''),
      earthElectrodeMaterialInOb: new FormControl('', Validators.required),
      earthElectrodeMaterialInRem: new FormControl(''),
      earthElectrodeSizeInOb: new FormControl('', Validators.required),
      earthElectrodeSizeInRem: new FormControl(''),
      earthElectrodeLengthingOb: new FormControl('', Validators.required),
      earthElectrodeLengthingRem: new FormControl(''),
      flag: new FormControl('A'),
    });
  }
  getTypeAEarthingControls(form:any) {
    return form.controls.getTypeAEarthingControls?.controls;
  }
  onChangeClamps(event: any, a: any, index: any) {
    let changedValue;
    if (a != null) {
      changedValue = event.target.value;
      this.earthingForm.markAsTouched();
      this.earthingForm.markAsDirty();
    }
    else {
      changedValue = event;
    }
    if (changedValue == 'Applicable') {

      this.applicableClamps[index] = true;
      this.applicableClampsNote[index] = false;
      if (a != null && (a.controls.earthingClamps == undefined ||
        a.controls.earthingClamps.controls.length == 0)) {
        this.earthingClamps = (a.controls.earthingClamps as FormArray);
        this.earthingClamps.push(this.earthingClampsArray());
      }
    }
    else if (changedValue == 'Not applicable') {
      this.applicableClamps[index] = false;
      this.applicableClampsNote[index] = true;

      if (a != null) {//this restriction for form action 
        if (a.controls.earthingClamps.controls[0].controls.earthingClampsId != undefined
          && a.controls.earthingClamps.controls[0].controls.earthingClampsId != null) {
          a.controls.earthingClamps.controls[0].controls.flag.setValue('R');
          a.controls.earthingClamps.controls[0].controls.buildingCount.setValue(a.controls.buildingCount.value);
          this.clampsDeleted.push(a.controls.earthingClamps.controls[0].value);
        }
        (a.controls.earthingClamps as FormArray)
          .removeAt(a.controls.earthingClamps.controls.length - 1);
      }

    }
    else if (changedValue == '') {
      this.applicableClamps[index] = false;
      this.applicableClampsNote[index] = true;
    }
    
  }
  onChangeChambers(event: any, a: any, index: any) {

    let changedValue;
    if (a != null) {
      changedValue = event.target.value;
      this.earthingForm.markAsTouched();
      this.earthingForm.markAsDirty();
    }
    else {
      changedValue = event;
    }
    if (changedValue == 'Applicable') {
      this.applicableChambers[index] = true;
      this.applicableChambersNote[index] = false;
      if (a != null && (a.controls.earthingElectrodeChamber == undefined || a.controls.earthingElectrodeChamber.controls.length == 0)) {
        this.earthingElectrodeChamber = a.controls.earthingElectrodeChamber as FormArray;
        this.earthingElectrodeChamber.push(this.earthingElectrodeChamberArray());
      }

    }
    else if (changedValue == 'Not applicable') {
      this.applicableChambers[index] = false;
      this.applicableChambersNote[index] = true;
      //this restriction for form action 
      if (a != null) {
        if (a.controls.earthingElectrodeChamber.controls[0].controls.earthingElectrodeChamberId != undefined
          && a.controls.earthingElectrodeChamber.controls[0].controls.earthingElectrodeChamberId != null) {
          a.controls.earthingElectrodeChamber.controls[0].controls.flag.setValue('R');
          a.controls.earthingElectrodeChamber.controls[0].controls.buildingCount.setValue(a.controls.buildingCount.value);
          this.earthingElectrodeChamberDeleted.push(a.controls.earthingElectrodeChamber.controls[0].value);
        }
        (a.controls.earthingElectrodeChamber as FormArray)
          .removeAt(a.controls.earthingElectrodeChamber.controls.length - 1);
      }
    }
    else if (changedValue == '') {
      this.applicableChambers[index] = false;
      this.applicableChambersNote[index] = true;
    }
   
  }
  onEarthElectrodes(event: any, a: any, index: any) {

    let changedValue;
    let lengthOfearthElectrodeTesting;
    if (a != null) {
    this.earthingForm.markAsTouched();
    this.earthingForm.markAsDirty();
      changedValue = event.target.value;
      lengthOfearthElectrodeTesting= a.controls.earthElectrodeTesting.controls.length;
    }
    else {
      changedValue = event;
    }
    if (changedValue == 'In scope') {
      this.testingofearthelectrodes[index] = true;
      if (a != null && (a.controls.earthElectrodeTesting == undefined || a.controls.earthElectrodeTesting.controls.length == 0)) {
        this.earthElectrodeTesting = a.get('earthElectrodeTesting') as FormArray;
        this.earthElectrodeTesting.push(this.earthElectrodeTestingArray());
      }
    }
    else if(changedValue == 'Not in scope'){
      this.testingofearthelectrodes[index] = false;

      for (let k = 0; a != null && k < lengthOfearthElectrodeTesting; k++) {
        if (a.value.earthElectrodeTesting[a.controls.earthElectrodeTesting.controls.length-1].earthingElectrodeTestingId != undefined &&
          a.value.earthElectrodeTesting[a.controls.earthElectrodeTesting.controls.length-1].earthingElectrodeTestingId != 0 &&
          a.value.earthElectrodeTesting[a.controls.earthElectrodeTesting.controls.length-1].earthingElectrodeTestingId != '') {
          a.controls.earthElectrodeTesting.controls[a.controls.earthElectrodeTesting.controls.length-1].controls.flag.setValue('R');
          a.controls.earthElectrodeTesting.controls[a.controls.earthElectrodeTesting.controls.length-1].controls.buildingCount.setValue(a.controls.buildingCount.value);
          this.deletedLpstestingofearthelectrodes.push(a.value.earthElectrodeTesting[a.controls.earthElectrodeTesting.controls.length-1]);
        }
        (a.get('earthElectrodeTesting') as FormArray).removeAt(a.controls.earthElectrodeTesting.controls.length-1);
      }
    }
    else if(changedValue == ''){
      this.testingofearthelectrodes[index] = false;
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


    onKey(e: any,formarray:any,index:any){
      
      let accordion:any;
      if(formarray ==null){
        accordion=e
        
      }
      else{
        accordion=e.target.value
        this.createFromArray(formarray);
      }
       setTimeout(() => {
         if (accordion == "") {
           this.typeAearthingsystem[index] = false;
           this.clamps[index] = false;
           this.earthelectrodechambers[index] = false;
           this.typeBearthingsystem[index] = false;
           //this.testingofearthelectrodes[index]=false; 
         }
         else if (accordion == "Type A") {
           this.typeAearthingsystem[index] = true;
           this.clamps[index] = true;
           this.earthelectrodechambers[index] = true;
           this.typeBearthingsystem[index] = false;
           //this.testingofearthelectrodes[index]=true;
           if (formarray != null) {
            if(this.availabilityOfPreviousReport =="NO"){
              formarray.controls.earthingElectrodeTestingAvailabilityOb.setValidators(Validators.required);
              formarray.controls.earthingElectrodeTestingAvailabilityOb.updateValueAndValidity();
             }
             formarray.controls.earthingElectrodeChamberAvailabilityOb.setValidators(Validators.required);
             formarray.controls.earthingElectrodeChamberAvailabilityOb.updateValueAndValidity();
             formarray.controls.earthingClampsAvailabilityOb.setValidators(Validators.required);
             formarray.controls.earthingClampsAvailabilityOb.updateValueAndValidity();
             (formarray.controls.earthingSystem as FormArray).removeAt(formarray.controls.earthingSystem - 1);
           }
         }
        else if(accordion=="Type-B (ring)"){
          this.typeAearthingsystem[index]=false; 
          this.clamps[index]=false;              
          this.earthelectrodechambers[index]=false; 
          this.typeBearthingsystem[index]=true; 
          //this.testingofearthelectrodes[index]=true;  

          if (formarray != null) {
            if(this.availabilityOfPreviousReport =="NO"){
              formarray.controls.earthingElectrodeTestingAvailabilityOb.setValidators(Validators.required);
              formarray.controls.earthingElectrodeTestingAvailabilityOb.updateValueAndValidity();
             }
            formarray.controls.earthingElectrodeChamberAvailabilityOb.clearValidators();
            formarray.controls.earthingElectrodeChamberAvailabilityOb.updateValueAndValidity();
            formarray.controls.earthingClampsAvailabilityOb.clearValidators();
            formarray.controls.earthingClampsAvailabilityOb.updateValueAndValidity();

            (formarray.controls.earthingDescription as FormArray).removeAt(formarray.controls.earthingDescription - 1);
            (formarray.controls.earthingClamps as FormArray).removeAt(formarray.controls.earthingClamps - 1);
            (formarray.controls.earthingElectrodeChamber as FormArray).removeAt(formarray.controls.earthingElectrodeChamber - 1);
          }
        }
        else if (accordion == "Type A & Type B combined") {
          this.typeAearthingsystem[index] = true;
          this.clamps[index] = true;
          this.earthelectrodechambers[index] = true;
          this.typeBearthingsystem[index] = true;
          // this.testingofearthelectrodes[index]=true; 
          if (formarray != null) {
            if(this.availabilityOfPreviousReport =="NO"){
              formarray.controls.earthingElectrodeTestingAvailabilityOb.setValidators(Validators.required);
              formarray.controls.earthingElectrodeTestingAvailabilityOb.updateValueAndValidity();
             }
            formarray.controls.earthingElectrodeChamberAvailabilityOb.setValidators(Validators.required);
            formarray.controls.earthingElectrodeChamberAvailabilityOb.updateValueAndValidity();
            formarray.controls.earthingClampsAvailabilityOb.setValidators(Validators.required);
            formarray.controls.earthingClampsAvailabilityOb.updateValueAndValidity();
          }
        }
        else if(accordion=="Foundation"){
          this.typeAearthingsystem[index]=false; 
          this.clamps[index]=false;              
          this.earthelectrodechambers[index]=false; 
          this.typeBearthingsystem[index]=false; 
         // this.testingofearthelectrodes[index]=true;

          if (formarray != null) {
            if(this.availabilityOfPreviousReport =="NO"){
              formarray.controls.earthingElectrodeTestingAvailabilityOb.setValidators(Validators.required);
              formarray.controls.earthingElectrodeTestingAvailabilityOb.updateValueAndValidity();
             }
            formarray.controls.earthingElectrodeChamberAvailabilityOb.clearValidators();
            formarray.controls.earthingElectrodeChamberAvailabilityOb.updateValueAndValidity();
            formarray.controls.earthingClampsAvailabilityOb.clearValidators();
            formarray.controls.earthingClampsAvailabilityOb.updateValueAndValidity();

            (formarray.controls.earthingDescription as FormArray).removeAt(formarray.controls.earthingDescription - 1);
            (formarray.controls.earthingClamps as FormArray).removeAt(formarray.controls.earthingClamps - 1);
            (formarray.controls.earthingElectrodeChamber as FormArray).removeAt(formarray.controls.earthingElectrodeChamber - 1);
            (formarray.controls.earthingSystem as FormArray).removeAt(formarray.controls.earthingSystem - 1);
          }
        
        }
      }, 30);
    }

  createFromArray(formarray:any) {

    if(formarray.controls.earthingDescription == undefined || formarray.controls.earthingDescription.controls.length ==0){
      this.earthingDescription =  formarray.get('earthingDescription') as FormArray;
      this.earthingDescription.push(this.earthingDescriptionArray());

    }
    if(formarray.controls.earthingClamps == undefined || formarray.controls.earthingClamps.controls.length ==0){
      this.earthingClamps =  formarray.get('earthingClamps') as FormArray;
      this.earthingClamps.push(this.earthingClampsArray());

    }
    if(formarray.controls.earthingElectrodeChamber == undefined ||formarray.controls.earthingElectrodeChamber.controls.length ==0){
      this.earthingElectrodeChamber =  formarray.get('earthingElectrodeChamber') as FormArray;
      this.earthingElectrodeChamber.push(this.earthingElectrodeChamberArray());

    }
    if(formarray.controls.earthingSystem == undefined || formarray.controls.earthingSystem.controls.length ==0){
      this.earthingSystem =  formarray.get('earthingSystem') as FormArray;
      this.earthingSystem.push((this.earthingSystemArray()));

    }
    if((formarray.controls.earthElectrodeTesting == undefined || formarray.controls.earthElectrodeTesting.controls.length ==0) && this.availabilityOfPreviousReport =="NO"){
      this.earthElectrodeTesting =  formarray.get('earthElectrodeTesting') as FormArray;
      this.earthElectrodeTesting.push(this.earthElectrodeTestingArray());
       
    }
  }
  
  //creating form array based on airtermination building
  createEarthingForm(data: any) {
    
    this.earthing = this.earthingForm.get('earthing') as FormArray;

    for (let i = 0; i < data.lpsAirDescription.length; i++) {
      let buildingNumber = data.lpsAirDescription[i].buildingNumber
      let buildingName = data.lpsAirDescription[i].buildingName
      let buildingCount = data.lpsAirDescription[i].buildingCount
      let isBuildingRequired = false;

      //existing form having given building number avilable or not  
      let isFormAvailable = '';
      for (let k = 0; !isBuildingRequired && k < this.earthing.length; k++) {
        //form having correct building number & name
        if (this.earthing.value[k].buildingNumber == buildingNumber &&
          this.earthing.value[k].buildingName == buildingName &&
          this.earthing.value[k].buildingCount == buildingCount) {
          isBuildingRequired = true;
          isFormAvailable = "available"
        }
        //if form empty 
        else if (this.earthing.value[k].buildingNumber == '' ||
          this.earthing.value[k].buildingNumber == undefined ||
          this.earthing.value[k].buildingNumber == null) {
          if (this.earthing.length == 1) {
            (this.earthingForm.get('earthing') as FormArray).removeAt(k);
          }
          this.earthing.push(this.earthingLpsDescriptionForm(buildingNumber, buildingName, buildingCount));
          isBuildingRequired = true;
          isFormAvailable = "available"
        }

      }
      //not having form for given airtermination buildingnumber 
      if (isFormAvailable != "available") {
        this.earthing.push(this.earthingLpsDescriptionForm(buildingNumber, buildingName, buildingCount));
      }
    }
  }

  
  retriveEarthingDetails(){
    this.lpsEarthings.retrieveEarthingLps(this.router.snapshot.paramMap.get('email') || '{}',this.basicLpsId).subscribe(
      data => {
        this.retrieveDetailsfromSavedReports(this.basicLpsId,JSON.parse(data)[0]);
      },
      error=>{
      }
    );  
  }

  getAirterminationData(){
    this.airterminationServices.retriveAirTerminationDetails(this.router.snapshot.paramMap.get('email') || '{}',this.basicLpsId).subscribe(
      data => {
        this.createEarthingForm(JSON.parse(data)[0]);
      }       
    ); 
  }

  typeAEarthingValidationChangeB(event: any,farray: any) {
      
    if(event.target.value == "Not Ok" && event.target.value != '') {
      farray.controls.earthElectrodeLesthanDownConductorInRem.setValidators(Validators.required);
      farray.controls.earthElectrodeLesthanDownConductorInRem.updateValueAndValidity();
    }
    else if(event.target.value == "Ok" && event.target.value != '') {
      farray.controls.earthElectrodeLesthanDownConductorInRem.clearValidators();
      farray.controls.earthElectrodeLesthanDownConductorInRem.updateValueAndValidity();
    }
    
  }
  typeAEarthingValidationChangeC(event: any,farray: any) {
      
    if(event.target.value == "Not Ok" && event.target.value != '') {
      farray.controls.connectedEarthTerminalInRem.setValidators(Validators.required);
      farray.controls.connectedEarthTerminalInRem.updateValueAndValidity();
    }
    else if(event.target.value == "Ok" && event.target.value != '') {
      farray.controls.connectedEarthTerminalInRem.clearValidators();
      farray.controls.connectedEarthTerminalInRem.updateValueAndValidity();
    }
    
  }

  typeAEarthingValidationChangeR(event: any,farray: any) {
      
    if(event.target.value != "0" && event.target.value != '') {
      farray.controls.inspectedFailedNoRem.setValidators(Validators.required);
      farray.controls.inspectedFailedNoRem.updateValueAndValidity();
    }
    else if(event.target.value == "0" && event.target.value != '') {
      farray.controls.inspectedFailedNoRem.clearValidators();
      farray.controls.inspectedFailedNoRem.updateValueAndValidity();
    }
  
}

  clampsValidationChange(event: any, farray: any, controlName: any) {
    let value = event.target.value;
    let isValidatorsRequired = '';
    if (value != '') {
      if (value == "Not good") {
        isValidatorsRequired = "Add"
      }
      else if (value == "Physically good") {
        isValidatorsRequired = "Remove"
      }
      else if (value != "0") {
        isValidatorsRequired = "Add"
      }
      else if (value == "0") {
        isValidatorsRequired = "Remove"
      }
    }
    if (isValidatorsRequired == "Add") {
      farray.controls[controlName].setValidators(Validators.required);
      farray.controls[controlName].updateValueAndValidity();
    }
    else if (isValidatorsRequired == "Remove") {
      farray.controls[controlName].clearValidators();
      farray.controls[controlName].updateValueAndValidity();
    }


  }

  remarksChange(event: any, farray: any, controlName: any) {
    if (event.target.value > 10) {
      farray.controls[controlName].setValue("As per latest standard IS/IEC 62305 the value should be less than 10Ω");
    }
    else if (event.target.value < 10) {
      farray.controls[controlName].setValue(" ");
    }
  }

  gotoNextTab() {
    if ((this.earthingForm.dirty && this.earthingForm.invalid) || this.service.isCompleted3 == false) {
      this.service.isCompleted4 = false;
      this.service.isLinear = true;
      this.service.editable = false;
      this.validationErrorTab = true;
      this.validationErrorMsgTab = 'Please check all the fields in EarthingForm';
      setTimeout(() => {
        this.validationErrorTab = false;
      }, 3000);
      return;
    }
    else if (this.earthingForm.dirty && this.earthingForm.touched) {
      this.service.isCompleted4 = false;
      this.service.isLinear = true;
      this.service.editable = false;
      this.tabError = true;
      this.tabErrorMsg = 'Kindly click on next button to update the changes!';
      setTimeout(() => {
        this.tabError = false;
      }, 3000);
    }
    else {
      this.service.isCompleted4 = true;
      this.service.isLinear = false;
      this.service.editable = true;
    }
  }

  reloadFromBack(){
    if(this.earthingForm.invalid){
     this.service.isCompleted4= false;
     this.service.isLinear=true;
     this.service.editable=false;
     this.validationErrorTab = true;
     this.validationErrorMsgTab= 'Please check all the fields in EarthingForm';
     setTimeout(() => {
       this.validationErrorTab = false;
     }, 3000);
     return false;
    }
    else if(this.earthingForm.dirty && this.earthingForm.touched){
      this.service.isCompleted4= false;
      this.service.isLinear=true;
      this.service.editable=false;
      this.tabError = true;
      this.tabErrorMsg = 'Kindly click on next button to update the changes!';
      setTimeout(() => {
        this.tabError = false;
      }, 3000);
      return false;
    } 
    else{
      this.service.isCompleted4= true;
      this.service.isLinear=false;
      this.service.editable=true;
      this.earthingForm.markAsPristine();
   return true;
    }
  }

}
 

