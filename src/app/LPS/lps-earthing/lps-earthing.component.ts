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
  applicableChambers: boolean=false;
  applicableClamps: boolean=false;
  applicableChambersNote: boolean=true;
  applicableClampsNote: boolean=true;
  TypeAEarthingArr: any = [];

  typeAearthingsystem: boolean=false;
  clamps: boolean=false;
  earthelectrodechambers: boolean=false;
  typeBearthingsystem: boolean=false;
  testingofearthelectrodes: boolean=false;
  earthingType: String='';
  airterminationData: any=[];

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
     
  }

  earthingLpsDescriptionForm(buildingNumber:any,buildingName:any,buildingCount:any) {
    return this.formBuilder.group({
      buildingNumber:new FormControl(buildingNumber, Validators.required),
      buildingName: new FormControl(buildingName, Validators.required),
      buildingCount: new FormControl(buildingCount, Validators.required),
      earthingTypeInOb: new FormControl('', Validators.required),
      earthingTypeInRem: new FormControl(''),
      bimetallicIssueInOb: new FormControl('', Validators.required),
      bimetallicIssueInRem: new FormControl(''),
      brazingConnectInOb: new FormControl('', Validators.required),
      brazingConnectInRem: new FormControl(''),
      flag: new FormControl('A'),  

      earthingDescription: this.formBuilder.array([this.earthingDescriptionArray()]),
      earthingClamps: this.formBuilder.array([this.earthingClampsArray()]),
      earthingElectrodeChamber: this.formBuilder.array([this.earthingElectrodeChamberArray()]),
      earthingSystem: this.formBuilder.array([this.earthingSystemArray()]),
      earthElectrodeTesting: this.formBuilder.array([this.earthElectrodeTestingArray()])
    });
  }
  

  earthingDescriptionArray():FormGroup {
    return new FormGroup({
    
      flag: new FormControl('A'),
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
      flag: new FormControl(''),
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
      // locationNumber: new FormControl('', Validators.required), 
      // locationName: new FormControl('', Validators.required), 
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
       serialNo: new FormControl(null),
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

  retrieveDetailsfromSavedReports(basicLpsId: any,data: any){
      // this.service.lvClick=1;

      this.step4List = data.earthingReport;
      this.earthingReport.basicLpsId = basicLpsId;
      this.earthingReport.earthingReportId = this.step4List.earthingReportId;
      this.earthingReport.createdBy = this.step4List.createdBy;
      this.earthingReport.createdDate = this.step4List.createdDate;
      this.earthingReport.userName = this.step4List.userName;
      this.flag=true; //for update call
      this.populateData(data.earthingReport);
      
      setTimeout(() => {
        this.createEarthingForm(data.airTermination);
      }, 300);
    }

    populateData(data:any) {
      for (let item of data.earthingLpsDescription) {
        this.onKey(item.earthingTypeInOb,null);     
         this.arr1.push(this.createGroup(item));
      }
      this.earthingForm.setControl('earthing', this.formBuilder.array(this.arr1 || []));
      this.arr1 = [];
    }

    retrieveDetailsfromSavedReports1(userName: any,basicLpsId: any,clientName: any,data: any){
      // this.service.lvClick=1;

      this.step4List = JSON.parse(data);
      this.earthingReport.basicLpsId = basicLpsId;
      this.earthingReport.createdBy = this.step4List[0].createdBy;
      this.earthingReport.createdDate = this.step4List[0].createdDate;
      this.earthingReport.userName = this.step4List[0].userName;
     // this.populateData1();
      this.flag=true;
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
        locationNumber: new FormControl({disabled: false, value: item.locationNumber}),
        locationName: new FormControl({disabled: false, value: item.locationName}),
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
        earthingDescriptionList: this.formBuilder.array(this.populateEarthingDescriptionList(item))
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
        inspectionFailedInRem: new FormControl({disabled: false, value: item.inspectionFailedInRem})
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
        earthOb: new FormControl({disabled: false, value: item.earthOb}, Validators.required),
        earthRem: new FormControl({disabled: false, value: item.earthRem}),
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
      for (let value of item.earthElectrodeTesting) {
        earthElectrodeTesting.push(this.earthElectrodeTestingFormGroup(value));   
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
    this.earthingReport.userName = this.router.snapshot.paramMap.get('email') || '{}';;
    this.earthingReport.basicLpsId = this.basicLpsId;

   
    this.descriptionPushArr = [];
    this.ClampsPushArr = [];
    this.chamberPushArr = [];
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

 // earthingDescriptionList: this.formBuilder.array([this.earthingDescriptionArray()]),
  removeItemTypeAEarthing(a: any,x:any) {
    this.earthingForm.markAsTouched();
    this.earthElectrodeTestingArr = a.controls.earthElectrodeTesting as FormArray;
    this.earthElectrodeTestingArr.removeAt(x);
    this.earthingForm.markAsDirty();
  }

  ElectrodeTesting(a: any,x:any) {
    this.earthingForm.markAsTouched();
    this.earthingDescriptionListArr = a.controls.earthingDescriptionList as FormArray;
    this.earthingDescriptionListArr.removeAt(x);
    this.earthingForm.markAsDirty();
  }
  
  createTypeAEarthingIteration()  : FormGroup {
    return this.formBuilder.group({
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
      flag: new FormControl('true'),
    });
  }
  getTypeAEarthingControls(form:any) {
    return form.controls.getTypeAEarthingControls?.controls;
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
        if(y.indexOf("Rem") == -1 || y == "flag" ){
          console.log(y);
          a.controls[y].setValidators([Validators.required]);
          a.controls[y].updateValueAndValidity();
          }
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
        if(y.indexOf("Rem") == -1 || y == "flag"){
        console.log(y);
        a.controls[y].setValidators([Validators.required]);
        a.controls[y].updateValueAndValidity();
        }
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
          this.retrieveDetailsfromSavedReports1(this.earthingReport.userName,this.basicLpsId,this.ClientName,data);
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

    onKey(e: any,formarray:any){
      
      let accordion:any;
      if(formarray ==null){
        accordion=e
        
      }
      else{
        accordion=e.target.value
        this.createFromArray(formarray);
      }
       setTimeout(() => {
        if(accordion==""){
          this.typeAearthingsystem=false; 
          this.clamps=false;              
          this.earthelectrodechambers=false; 
          this.typeBearthingsystem=false; 
          this.testingofearthelectrodes=false; 
          }
          else if(accordion=="Type A"){
          this.typeAearthingsystem=true; 
          this.clamps=true;              
          this.earthelectrodechambers=true; 
          this.typeBearthingsystem=false; 
          this.testingofearthelectrodes=true;
          if(formarray!=null){
            (formarray.controls.earthingSystem as FormArray).removeAt(formarray.controls.earthingSystem-1);
          }
        }
        else if(accordion=="Type-B (ring)"){
          this.typeAearthingsystem=false; 
          this.clamps=false;              
          this.earthelectrodechambers=false; 
          this.typeBearthingsystem=true; 
          this.testingofearthelectrodes=true; 

        if(formarray!=null){
         (formarray.controls.earthingDescription as FormArray).removeAt(formarray.controls.earthingDescription-1); 
         (formarray.controls.earthingClamps as FormArray).removeAt(formarray.controls.earthingClamps-1); 
         (formarray.controls.earthingElectrodeChamber as FormArray).removeAt(formarray.controls.earthingElectrodeChamber-1); 
         }
        }
        else if(accordion=="Type A & Type B combined"){
          this.typeAearthingsystem=true; 
          this.clamps=true;              
          this.earthelectrodechambers=true; 
          this.typeBearthingsystem=true; 
          this.testingofearthelectrodes=true; 
          
        }
        else if(accordion=="Foundation"){
          this.typeAearthingsystem=false; 
          this.clamps=false;              
          this.earthelectrodechambers=false; 
          this.typeBearthingsystem=false; 
          this.testingofearthelectrodes=true;

        if(formarray!=null){
         (formarray.controls.earthingDescription as FormArray).removeAt(formarray.controls.earthingDescription-1); 
         (formarray.controls.earthingClamps as FormArray).removeAt(formarray.controls.earthingClamps-1);
         (formarray.controls.earthingElectrodeChamber as FormArray).removeAt(formarray.controls.earthingElectrodeChamber-1);
         (formarray.controls.earthingSystem as FormArray).removeAt(formarray.controls.earthingSystem-1);
          }
        
        }
      }, 30);
    }

  createFromArray(formarray:any) {

    if(formarray.controls.earthingDescription == undefined || formarray.controls.earthingDescription.controls.length ==0){
      this.earthingDescription = formarray.controls.earthingDescription?.controls;
      this.earthingDescription.push(this.earthingDescriptionArray());

    }
    if(formarray.controls.earthingClamps == undefined || formarray.controls.earthingClamps.controls.length ==0){
      this.earthingClamps = formarray.controls.earthingClamps?.controls;
      this.earthingClamps.push(this.earthingClampsArray());

    }
    if(formarray.controls.earthingElectrodeChamber == undefined ||formarray.controls.earthingElectrodeChamber.controls.length ==0){
      this.earthingElectrodeChamber = formarray.controls.earthingElectrodeChamber?.controls;
      this.earthingElectrodeChamber.push(this.earthingElectrodeChamberArray());

    }
    if(formarray.controls.earthingSystem == undefined || formarray.controls.earthingSystem.controls.length ==0){
      this.earthingSystem = formarray.controls.earthingSystem?.controls;
      this.earthingSystem.push(this.earthingSystemArray());

    }
    if(formarray.controls.earthElectrodeTesting == undefined || formarray.controls.earthElectrodeTesting.controls.length ==0){
      this.earthElectrodeTesting = formarray.controls.earthElectrodeTesting?.controls;
      this.earthElectrodeTesting.push(this.earthElectrodeTestingArray());
       
    }
  }

  getAirterminationData(userName:any,basicLpsId:any){
    this.airterminationServices.retriveAirTerminationDetails(userName,basicLpsId).subscribe(
      data => {
        this.airterminationData  = JSON.parse(data);
      }       
    ); 
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
  
}
 
 

