import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalsService } from 'src/app/globals.service';
import { DownConductorDescription } from 'src/app/LPS_model/down-conductor';
import { LpsDownconductorService } from 'src/app/LPS_services/lps-downconductor.service';
import { LpsMatstepperComponent } from '../lps-matstepper/lps-matstepper.component';

@Component({
  selector: 'app-lps-down-conductors',
  templateUrl: './lps-down-conductors.component.html',
  styleUrls: ['./lps-down-conductors.component.css']
})
export class LpsDownConductorsComponent implements OnInit {

  downConductorForm!: FormGroup;

  downConductor!: FormArray;
  bridgingDescription!: FormArray;
  holder!: FormArray;
  connectors!: FormArray;
  lightningCounter!: FormArray;
  testingJoint!: FormArray;
  lpsDownconductorService;
  submitted = false;
  downConductorDescription = new DownConductorDescription();
  disable: boolean = false;

  basicLpsId: number = 0;
  ClientName: String = '';
  projectName: String = '';
  industryType: String = '';
  buildingType: String = '';
  buildingLength: String = '';
  buildingWidth: String = '';
  buildingHeight: String = '';
  levelOfProtection: String = '';
  soilResistivity: String = '';

  success: boolean = false;
  // success1: boolean = false;
  // successMsg1: string="";
  successMsg: string = "";
  Error: boolean = false;
  errorArr: any = [];
  errorMsg: string = "";
  validationError: boolean = false;
  validationErrorMsg: String = '';
  @Output() proceedNext = new EventEmitter<any>();
  step3List: any = [];
  flag: boolean = false;
  arr1: any = [];
  arr2: any = [];
  arr3: any = [];
  arr4: any = [];
  arr5: any = [];
  arr6: any = [];

  downPushArr: any = [];
  bridgingPushArr: any = [];
  holderPushArr: any = [];
  connectorPushArr: any = [];
  lightPushArr: any = [];
  testjointsPushArr: any = [];
  isEditable!:boolean

 

  stepBack:any;
  
  constructor(
    private formBuilder: FormBuilder, lpsDownconductorService: LpsDownconductorService,
    private modalService: NgbModal, private router: ActivatedRoute,
    public service: GlobalsService,
    private matstepper: LpsMatstepperComponent) {
    this.lpsDownconductorService = lpsDownconductorService
  }

  ngOnInit(): void {
    this.downConductorForm = this.formBuilder.group({
      downConductorDescription: this.formBuilder.array([this.allLPSDownConductor('','')])
    });
  }

  allLPSDownConductor(buildingNumber:any,buildingName:any):FormGroup {
    debugger
    return new FormGroup({
      buildingNumber : new FormControl(buildingNumber,Validators.required),
      buildingName: new FormControl(buildingName, Validators.required),
      biMetallicIssueOb: new FormControl('', Validators.required),
      biMetallicIssueRem: new FormControl(''),
      warningNoticeGroundLevelOb: new FormControl('', Validators.required),
      warningNoticeGroundLevelRem: new FormControl(''),
      noPowerDownConductorOb: new FormControl('', Validators.required),
      noPowerDownConductorRem: new FormControl(''),
      connectMadeBrazingOb: new FormControl('', Validators.required),
      connectMadeBrazingRem: new FormControl(''),
      chemicalSprinklerOb: new FormControl('', Validators.required),
      chemicalSprinklerRem: new FormControl(''),
      cobustMaterialWallOB: new FormControl('', Validators.required),
      cobustMaterialWallRem: new FormControl(''),

      downConductor: this.formBuilder.array([this.createDownArrForm()]),
      bridgingDescription: this.formBuilder.array([this.createBridgeArrForm()]),
      holder: this.formBuilder.array([this.createHolderArrForm()]),
      connectors: this.formBuilder.array([this.createConnectorArrForm()]),
      lightningCounter: this.formBuilder.array([this.createLightArrForm()]),
      testingJoint: this.formBuilder.array([this.createTestJointsArrForm()]),
    });
  }
  
  //creating form array based on airtermination building
  createDwonconductorForm(noOfBuildingNumber:any){
    debugger
    let popArray=this.downConductorForm.value
     if(noOfBuildingNumber !=null && noOfBuildingNumber !='' && noOfBuildingNumber !=undefined){

      for (let i = 0; i < noOfBuildingNumber.length; i++) {
        let buildingNumber=null;
        let buildingName=null;
        let isBuildingRequired=false;
        for (let j of popArray.downConductorDescription) { 

          const myArray = noOfBuildingNumber[i].split(",");
           buildingNumber=parseInt(myArray[0])
           buildingName=myArray[1]
             if(popArray.downConductorDescription.length == 1 && j.buildingNumber==null){
              popArray=[];
             }
             else{
               if(myArray !=null && j.buildingNumber !=null
                  && j.buildingName !=null && buildingNumber==j.buildingNumber && buildingName==j.buildingName){
                  isBuildingRequired=true;
                }
                
             }
                
        }
        if(!isBuildingRequired){
          popArray.push(this.allLPSDownConductor(buildingNumber,buildingName));
           buildingNumber=null;
           buildingName=null;
           isBuildingRequired=false;
        }
      }

     }
     else{

     }
    this.downConductorForm.setControl('downConductorDescription', this.formBuilder.array(popArray || []));
     
    
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
    this.downConductorForm.reset();
  }

  retrieveDetailsfromSavedReports(userName: any,basicLpsId: any,clientName: any,data: any){
      //this.service.lvClick=1;

      this.step3List = data.downConductorDesc;
      this.downConductorDescription.basicLpsId = basicLpsId;
      this.downConductorDescription.downConduDescId = this.step3List.downConduDescId;
      this.downConductorDescription.biMetallicIssueOb = this.step3List.biMetallicIssueOb;
      this.downConductorDescription.biMetallicIssueRem = this.step3List.biMetallicIssueRem;
      this.downConductorDescription.warningNoticeGroundLevelOb = this.step3List.warningNoticeGroundLevelOb;
      this.downConductorDescription.warningNoticeGroundLevelRem = this.step3List.warningNoticeGroundLevelRem;
      this.downConductorDescription.noPowerDownConductorOb = this.step3List.noPowerDownConductorOb;
      this.downConductorDescription.noPowerDownConductorRem = this.step3List.noPowerDownConductorRem;
      this.downConductorDescription.connectMadeBrazingOb = this.step3List.connectMadeBrazingOb;
      this.downConductorDescription.connectMadeBrazingRem = this.step3List.connectMadeBrazingRem;
      this.downConductorDescription.chemicalSprinklerOb = this.step3List.chemicalSprinklerOb;
      this.downConductorDescription.chemicalSprinklerRem = this.step3List.chemicalSprinklerRem;
      this.downConductorDescription.cobustMaterialWallOB = this.step3List.cobustMaterialWallOB;
      this.downConductorDescription.cobustMaterialWallRem = this.step3List.cobustMaterialWallRem;
      this.downConductorDescription.createdBy = this.step3List.createdBy;
      this.downConductorDescription.createdDate = this.step3List.createdDate;
      
      this.downConductorDescription.userName = this.step3List.userName;

      this.populateData();
      this.flag=true;
    }

    populateData() {
      for (let item of this.step3List.downConductor) {     
        if(item.flag) {this.arr1.push(this.createGroup(item));}
      }
      for (let item of this.step3List.bridgingDescription) {     
        if(item.flag)  {this.arr2.push(this.createGroup1(item));}
      }
      for (let item of this.step3List.holder) {     
        if(item.flag)  {this.arr3.push(this.createGroup2(item));}
      }
      for (let item of this.step3List.connectors) { 
        if(item.flag) {this.arr4.push(this.createGroup3(item));}
      }
      for (let item of this.step3List.lightningCounter) { 
        if(item.flag)  {this.arr5.push(this.createGroup4(item));}
      }
      for (let item of this.step3List.testingJoint) {     
        this.arr6.push(this.createGroup5(item));
      }
      this.downConductorForm.setControl('downConductor', this.formBuilder.array(this.arr1 || []))
      this.downConductorForm.setControl('bridgingDescription', this.formBuilder.array(this.arr2 || []))
      this.downConductorForm.setControl('holder', this.formBuilder.array(this.arr3 || []))
      this.downConductorForm.setControl('connectors', this.formBuilder.array(this.arr4 || []))
      this.downConductorForm.setControl('lightningCounter', this.formBuilder.array(this.arr5 || []))
      this.downConductorForm.setControl('testingJoint', this.formBuilder.array(this.arr6 || []))

      this.arr1 = [];
      this.arr2 = [];
      this.arr3 = [];
      this.arr4 = [];
      this.arr5 = [];
      this.arr6 = [];
    }

    retrieveDetailsfromSavedReports1(userName: any,basicLpsId: any,clientName: any,data: any){
      //this.service.lvClick=1;

      this.step3List = JSON.parse(data);
      this.downConductorDescription.basicLpsId = basicLpsId;
      this.downConductorDescription.downConduDescId = this.step3List[0].downConduDescId;
      this.downConductorDescription.biMetallicIssueOb = this.step3List[0].biMetallicIssueOb;
      this.downConductorDescription.biMetallicIssueRem = this.step3List[0].biMetallicIssueRem;
      this.downConductorDescription.warningNoticeGroundLevelOb = this.step3List[0].warningNoticeGroundLevelOb;
      this.downConductorDescription.warningNoticeGroundLevelRem = this.step3List[0].warningNoticeGroundLevelRem;
      this.downConductorDescription.noPowerDownConductorOb = this.step3List[0].noPowerDownConductorOb;
      this.downConductorDescription.noPowerDownConductorRem = this.step3List[0].noPowerDownConductorRem;
      this.downConductorDescription.connectMadeBrazingOb = this.step3List[0].connectMadeBrazingOb;
      this.downConductorDescription.connectMadeBrazingRem = this.step3List[0].connectMadeBrazingRem;
      this.downConductorDescription.chemicalSprinklerOb = this.step3List[0].chemicalSprinklerOb;
      this.downConductorDescription.chemicalSprinklerRem = this.step3List[0].chemicalSprinklerRem;
      this.downConductorDescription.cobustMaterialWallOB = this.step3List[0].cobustMaterialWallOB;
      this.downConductorDescription.cobustMaterialWallRem = this.step3List[0].cobustMaterialWallRem;
      this.downConductorDescription.createdBy = this.step3List[0].createdBy;
      this.downConductorDescription.createdDate = this.step3List[0].createdDate;
      this.downConductorDescription.userName = this.step3List[0].userName;

      this.populateData1();
      this.flag=true;
    }

    populateData1() {
      for (let item of this.step3List[0].downConductor) {     
        if(item.flag) {this.arr1.push(this.createGroup(item));}
      }
      for (let item of this.step3List[0].bridgingDescription) {     
        if(item.flag)  {this.arr2.push(this.createGroup1(item));}
      }
      for (let item of this.step3List[0].holder) {     
        if(item.flag)  {this.arr3.push(this.createGroup2(item));}
      }
      for (let item of this.step3List[0].connectors) { 
        if(item.flag) {this.arr4.push(this.createGroup3(item));}
      }
      for (let item of this.step3List[0].lightningCounter) { 
        if(item.flag)  {this.arr5.push(this.createGroup4(item));}
      }
      for (let item of this.step3List[0].testingJoint) {     
        this.arr6.push(this.createGroup5(item));
      }
      this.downConductorForm.setControl('downConductor', this.formBuilder.array(this.arr1 || []))
      this.downConductorForm.setControl('bridgingDescription', this.formBuilder.array(this.arr2 || []))
      this.downConductorForm.setControl('holder', this.formBuilder.array(this.arr3 || []))
      this.downConductorForm.setControl('connectors', this.formBuilder.array(this.arr4 || []))
      this.downConductorForm.setControl('lightningCounter', this.formBuilder.array(this.arr5 || []))
      this.downConductorForm.setControl('testingJoint', this.formBuilder.array(this.arr6 || []))

      this.arr1 = [];
      this.arr2 = [];
      this.arr3 = [];
      this.arr4 = [];
      this.arr5 = [];
      this.arr6 = [];
      this.step3List=[];
      this.downConductorForm.markAsPristine();
    }

    createGroup(item: any): FormGroup {
      return this.formBuilder.group({
        downConductorId: new FormControl({disabled: false, value: item.downConductorId}),
        flag: new FormControl({disabled: false, value: item.flag}),
        locationNumber: new FormControl({disabled: false, value: item.locationNumber}, Validators.required),
        locationName: new FormControl({disabled: false, value: item.locationName}, Validators.required),
        physicalInspectionOb: new FormControl({disabled: false, value: item.physicalInspectionOb}, Validators.required),
        physicalInspectionRem: new FormControl({disabled: false, value: item.physicalInspectionRem}),
        conductMaterialOb: new FormControl({disabled: false, value: item.conductMaterialOb}, Validators.required),
        conductMaterialRem: new FormControl({disabled: false, value: item.conductMaterialRem}),
        conductSizeOb: new FormControl({disabled: false, value: item.conductSizeOb}, Validators.required),
        conductSizeRem: new FormControl({disabled: false, value: item.conductSizeRem}),
        downConductExposedOb: new FormControl({disabled: false, value: item.downConductExposedOb}, Validators.required),
        downConductExposedRem: new FormControl({disabled: false, value: item.downConductExposedRem}),
        downConductLocationdOb: new FormControl({disabled: false, value: item.downConductLocationdOb}, Validators.required),
        downConductLocationdRem: new FormControl({disabled: false, value: item.downConductLocationdRem}),
        downConductGutterOb: new FormControl({disabled: false, value: item.downConductGutterOb}, Validators.required),
        downConductGutterRem: new FormControl({disabled: false, value: item.downConductGutterRem}),
        ensureDownCnoductOb: new FormControl({disabled: false, value: item.ensureDownCnoductOb}, Validators.required),
        ensureDownCnoductRem: new FormControl({disabled: false, value: item.ensureDownCnoductRem}),
        installationDownConductOb: new FormControl({disabled: false, value: item.installationDownConductOb}, Validators.required),
        installationDownConductRem: new FormControl({disabled: false, value: item.installationDownConductRem}),
        maximumDownConductOb: new FormControl({disabled: false, value: item.maximumDownConductOb}, Validators.required),
        maximumDownConductRem: new FormControl({disabled: false, value: item.maximumDownConductRem}),
        manimumDownConductOb: new FormControl({disabled: false, value: item.manimumDownConductOb}, Validators.required),
        manimumDownConductRem: new FormControl({disabled: false, value: item.manimumDownConductRem}),
        totalNoDownConductOb: new FormControl({disabled: false, value: item.totalNoDownConductOb}, Validators.required),
        totalNoDownConductRem: new FormControl({disabled: false, value: item.totalNoDownConductRem}),
        inspectedNoOb: new FormControl({disabled: false, value: item.inspectedNoOb}, Validators.required),
        inspectedNoRem: new FormControl({disabled: false, value: item.inspectedNoRem}),
        inspectionPassedNoOb: new FormControl({disabled: false, value: item.inspectionPassedNoOb}, Validators.required),
        inspectionPassedNoRem: new FormControl({disabled: false, value: item.inspectionPassedNoRem}),
        inspectionFailedNoOb: new FormControl({disabled: false, value: item.inspectionFailedNoOb}, Validators.required),
        inspectionFailedNoRem: new FormControl({disabled: false, value: item.inspectionFailedNoRem})
      });
    }

    createGroup1(item: any): FormGroup {
      return this.formBuilder.group({
      bridgingDescriptionId: new FormControl({disabled: false, value: item.bridgingDescriptionId}),
      flag: new FormControl({disabled: false, value: item.flag}),
      locationNumber: new FormControl({disabled: false, value: item.locationNumber}, Validators.required),
      locationName: new FormControl({disabled: false, value: item.locationName}, Validators.required),
      ensureBridgingCableOb: new FormControl({disabled: false, value: item.ensureBridgingCableOb}, Validators.required),
      ensureBridgingCableRem: new FormControl({disabled: false, value: item.ensureBridgingCableRem}),
      aluminiumConductorSideWallOb: new FormControl({disabled: false, value: item.aluminiumConductorSideWallOb}, Validators.required),
      aluminiumConductorSideWallRem: new FormControl({disabled: false, value: item.aluminiumConductorSideWallRem}),
      bridgingCableConnectionOb: new FormControl({disabled: false, value: item.bridgingCableConnectionOb}, Validators.required),
      bridgingCableConnectionRem: new FormControl({disabled: false, value: item.bridgingCableConnectionRem}),
      totalNoBridgingCableOb: new FormControl({disabled: false, value: item.totalNoBridgingCableOb}, Validators.required),
      totalNoBridgingCableRem: new FormControl({disabled: false, value: item.totalNoBridgingCableRem}),
      inspectedNoOb: new FormControl({disabled: false, value: item.inspectedNoOb}, Validators.required),
      inspectedNoRem: new FormControl({disabled: false, value: item.inspectedNoRem}),
      inspectionPassedNoOb: new FormControl({disabled: false, value: item.inspectionPassedNoOb}, Validators.required),
      inspectionPassedNoRem: new FormControl({disabled: false, value: item.inspectionPassedNoRem}),
      inspectionFailedNoOb: new FormControl({disabled: false, value: item.inspectionFailedNoOb}, Validators.required),
      inspectionFailedNoRem: new FormControl({disabled: false, value: item.inspectionFailedNoRem})
      });
    }

    createGroup2(item: any): FormGroup {
      return this.formBuilder.group({
      holderId: new FormControl({disabled: false, value: item.holderId}),
      flag: new FormControl({disabled: false, value: item.flag}),
      locationNumber: new FormControl({disabled: false, value: item.locationNumber}, Validators.required),
      locationName: new FormControl({disabled: false, value: item.locationName}, Validators.required),
      physicalInspectionOb: new FormControl({disabled: false, value: item.physicalInspectionOb}, Validators.required),
      physicalInspectionRem: new FormControl({disabled: false, value: item.physicalInspectionRem}),
      conductHolderFlatSurfaceOb: new FormControl({disabled: false, value: item.conductHolderFlatSurfaceOb}, Validators.required),
      conductHolderFlatSurfaceRem: new FormControl({disabled: false, value: item.conductHolderFlatSurfaceRem}),
      conductorHoldedOb: new FormControl({disabled: false, value: item.conductorHoldedOb}, Validators.required),
      conductorHoldedRem: new FormControl({disabled: false, value: item.conductorHoldedRem}),
      materialHolderOb: new FormControl({disabled: false, value: item.materialHolderOb}, Validators.required),
      materialHolderRem: new FormControl({disabled: false, value: item.materialHolderRem}),
      totalNoHolderOb: new FormControl({disabled: false, value: item.totalNoHolderOb}, Validators.required),
      totalNoHolderRem: new FormControl({disabled: false, value: item.totalNoHolderRem}),
      inspectedNoOb: new FormControl({disabled: false, value: item.inspectedNoOb}, Validators.required),
      inspectedNoRem: new FormControl({disabled: false, value: item.inspectedNoRem}),
      inspectionPassedNoOb: new FormControl({disabled: false, value: item.inspectionPassedNoOb}, Validators.required),
      inspectionPassedNoRem: new FormControl({disabled: false, value: item.inspectionPassedNoRem}),
      inspectionFailedNoOb: new FormControl({disabled: false, value: item.inspectionFailedNoOb}, Validators.required),
      inspectionFailedNoRem: new FormControl({disabled: false, value: item.inspectionFailedNoRem})
      });
    }


    createGroup3(item: any): FormGroup {
      return this.formBuilder.group({
      connectorId: new FormControl({disabled: false, value: item.connectorId}),
      flag: new FormControl({disabled: false, value: item.flag}),
      locationNumber: new FormControl({disabled: false, value: item.locationNumber}, Validators.required),
      locationName: new FormControl({disabled: false, value: item.locationName}, Validators.required),
      physicalInspectionOb: new FormControl({disabled: false, value: item.physicalInspectionOb}, Validators.required),
      physicalInspectionRem: new FormControl({disabled: false, value: item.physicalInspectionRem}),
      strightConnectCheckOb: new FormControl({disabled: false, value: item.strightConnectCheckOb}, Validators.required),
      strightConnectCheckRem: new FormControl({disabled: false, value: item.strightConnectCheckRem}),
      materialConnectorOb: new FormControl({disabled: false, value: item.materialConnectorOb}, Validators.required),
      materialConnectorRem: new FormControl({disabled: false, value: item.materialConnectorRem}),
      maxConnectorsDownConductorOb: new FormControl({disabled: false, value: item.maxConnectorsDownConductorOb}, Validators.required),
      maxConnectorsDownConductorRem: new FormControl({disabled: false, value: item.maxConnectorsDownConductorRem}),
      totalNoConnectorsOb: new FormControl({disabled: false, value: item.totalNoConnectorsOb}, Validators.required),
      totalNoConnectorsRem: new FormControl({disabled: false, value: item.totalNoConnectorsRem}),
      inspectedNoOb: new FormControl({disabled: false, value: item.inspectedNoOb}, Validators.required),
      inspectedNoRem: new FormControl({disabled: false, value: item.inspectedNoRem}),
      inspectionPassedNoOb: new FormControl({disabled: false, value: item.inspectionPassedNoOb}, Validators.required),
      inspectionPassedNoRem: new FormControl({disabled: false, value: item.inspectionPassedNoRem}),
      inspectionFailedNoOb: new FormControl({disabled: false, value: item.inspectionFailedNoOb}, Validators.required),
      inspectionFailedNoRem: new FormControl({disabled: false, value: item.inspectionFailedNoRem})
      });
    }


    createGroup4(item: any): FormGroup {
      return this.formBuilder.group({
      lightingCountersId: new FormControl({disabled: false, value: item.lightingCountersId}),
      flag: new FormControl({disabled: false, value: item.flag}),
      locationNumber: new FormControl({disabled: false, value: item.locationNumber}, Validators.required),
      locationName: new FormControl({disabled: false, value: item.locationName}, Validators.required),
      threadHoldCurrentOb: new FormControl({disabled: false, value: item.threadHoldCurrentOb}, Validators.required),
      threadHoldCurrentRem: new FormControl({disabled: false, value: item.threadHoldCurrentRem}),
      maximumWithStandCurrentOb: new FormControl({disabled: false, value: item.maximumWithStandCurrentOb}, Validators.required),
      maximumWithStandCurrentRem: new FormControl({disabled: false, value: item.maximumWithStandCurrentRem}),
      countsOb: new FormControl({disabled: false, value: item.countsOb}, Validators.required),
      countsRem: new FormControl({disabled: false, value: item.countsRem}),
      batteryLifeTimeOb: new FormControl({disabled: false, value: item.batteryLifeTimeOb}, Validators.required),
      batteryLifeTimeRem: new FormControl({disabled: false, value: item.batteryLifeTimeRem}),
      properConnectionLightingCounterOb: new FormControl({disabled: false, value: item.properConnectionLightingCounterOb}, Validators.required),
      properConnectionLightingCounterRem: new FormControl({disabled: false, value: item.properConnectionLightingCounterRem}),
      lightingCounterPlacedOb: new FormControl({disabled: false, value: item.lightingCounterPlacedOb}, Validators.required),
      lightingCounterPlacedRem: new FormControl({disabled: false, value: item.lightingCounterPlacedRem}),
      conditionOfLightingCounterOb: new FormControl({disabled: false, value: item.conditionOfLightingCounterOb}, Validators.required),
      conditionOfLightingCounterRem: new FormControl({disabled: false, value: item.conditionOfLightingCounterRem}),
      totalNoLightingCounterOb: new FormControl({disabled: false, value: item.totalNoLightingCounterOb}, Validators.required),
      totalNoLightingCounterRem: new FormControl({disabled: false, value: item.totalNoLightingCounterRem}),
      inspectedNoOb: new FormControl({disabled: false, value: item.inspectedNoOb}, Validators.required),
      inspectedNoRem: new FormControl({disabled: false, value: item.inspectedNoRem}),
      inspectionPassedNoOb: new FormControl({disabled: false, value: item.inspectionPassedNoOb}, Validators.required),
      inspectionPassedNoRem: new FormControl({disabled: false, value: item.inspectionPassedNoRem}),
      inspectionFailedNoOb: new FormControl({disabled: false, value: item.inspectionFailedNoOb}, Validators.required),
      inspectionFailedNoRem: new FormControl({disabled: false, value: item.inspectionFailedNoRem})
      });
    }


    createGroup5(item: any): FormGroup {
      return this.formBuilder.group({
      testJointId: new FormControl({disabled: false, value: item.testJointId}),
      flag: new FormControl({disabled: false, value: item.flag}),
      locationNumber: new FormControl({disabled: false, value: item.locationNumber}, Validators.required),
      locationName: new FormControl({disabled: false, value: item.locationName}, Validators.required),
      testJointTypeOb: new FormControl({disabled: false, value: item.testJointTypeOb}, Validators.required),
      testJointTypeRem: new FormControl({disabled: false, value: item.testJointTypeRem}),
      materialTestJointOb: new FormControl({disabled: false, value: item.materialTestJointOb}, Validators.required),
      materialTestJointRem: new FormControl({disabled: false, value: item.materialTestJointRem}),
      accessibilityOfTestJointOb: new FormControl({disabled: false, value: item.accessibilityOfTestJointOb}, Validators.required),
      accessibilityOfTestJointRem: new FormControl({disabled: false, value: item.accessibilityOfTestJointRem}),
      nonMetalicProtectionOb: new FormControl({disabled: false, value: item.nonMetalicProtectionOb}, Validators.required),
      nonMetalicProtectionRem: new FormControl({disabled: false, value: item.nonMetalicProtectionRem}),
      testJointPlacedGroungLevelOb: new FormControl({disabled: false, value: item.testJointPlacedGroungLevelOb}, Validators.required),
      testJointPlacedGroungLevelRem: new FormControl({disabled: false, value: item.testJointPlacedGroungLevelRem}),
      bimetallicIssueCheckOb: new FormControl({disabled: false, value: item.bimetallicIssueCheckOb}, Validators.required),
      bimetallicIssueCheckRem: new FormControl({disabled: false, value: item.bimetallicIssueCheckRem}),
      totalNoOfTestJointOB: new FormControl({disabled: false, value: item.totalNoOfTestJointOB}, Validators.required),
      totalNoOfTestJointRem: new FormControl({disabled: false, value: item.totalNoOfTestJointRem}),
      inspectedNoOb: new FormControl({disabled: false, value: item.inspectedNoOb}, Validators.required),
      inspectedNoRem: new FormControl({disabled: false, value: item.inspectedNoRem}),
      inspectionPassedNoOb: new FormControl({disabled: false, value: item.inspectionPassedNoOb}, Validators.required),
      inspectionPassedNoRem: new FormControl({disabled: false, value: item.inspectionPassedNoRem}),
      inspectionFailedNoOb: new FormControl({disabled: false, value: item.inspectionFailedNoOb}, Validators.required),
      inspectionFailedNoRem: new FormControl({disabled: false, value: item.inspectionFailedNoRem})      
      });
    }

  overAllDownControl(): AbstractControl[] {
    return(<FormArray>this.downConductorForm.get('downConductorDescription')).controls;
  }

  downConductorControls(form:any){
    return form.controls.downConductor?.controls;
  }

  bridgingCablesControls(form:any){
    return form.controls.bridgingDescription?.controls;
  }

  holdersControls(form:any){
    return form.controls.holder?.controls;
  }

  connectorsControls(form:any){
    return form.controls.connectors?.controls;
  }

  lightControls(form:any){
    return form.controls.lightningCounter?.controls;
  }

  jointControls(form:any){
    // return (<FormArray>this.downConductorForm.get('testingJoint')).controls
    return form.controls.testingJoint?.controls;
  }

  private createDownArrForm(): FormGroup {

    return new FormGroup({
      locationNumber: new FormControl('', Validators.required),
      locationName: new FormControl('', Validators.required),
      physicalInspectionOb: new FormControl('', Validators.required),
      physicalInspectionRem: new FormControl(''),
      conductMaterialOb: new FormControl('', Validators.required),
      conductMaterialRem: new FormControl(''),
      conductSizeOb: new FormControl('', Validators.required),
      conductSizeRem: new FormControl(''),
      downConductExposedOb: new FormControl('', Validators.required),
      downConductExposedRem: new FormControl(''),
      downConductLocationdOb: new FormControl('', Validators.required),
      downConductLocationdRem: new FormControl(''),
      downConductGutterOb: new FormControl('', Validators.required),
      downConductGutterRem: new FormControl(''),
      ensureDownCnoductOb: new FormControl('', Validators.required),
      ensureDownCnoductRem: new FormControl(''),
      installationDownConductOb: new FormControl('', Validators.required),
      installationDownConductRem: new FormControl(''),
      maximumDownConductOb: new FormControl('', Validators.required),
      maximumDownConductRem: new FormControl(''),
      manimumDownConductOb: new FormControl('', Validators.required),
      manimumDownConductRem: new FormControl(''),
      totalNoDownConductOb: new FormControl('', Validators.required),
      totalNoDownConductRem: new FormControl(''),
      inspectedNoOb: new FormControl('', Validators.required),
      inspectedNoRem: new FormControl(''),
      inspectionPassedNoOb: new FormControl('', Validators.required),
      inspectionPassedNoRem: new FormControl(''),
      inspectionFailedNoOb: new FormControl('', Validators.required),
      inspectionFailedNoRem: new FormControl(''),
      flag: new FormControl('true'),
    })
  }

  private createBridgeArrForm(): FormGroup {

    return new FormGroup({
      locationNumber: new FormControl('', Validators.required),
      locationName: new FormControl('', Validators.required),
      ensureBridgingCableOb: new FormControl('', Validators.required),
      ensureBridgingCableRem: new FormControl(''),
      aluminiumConductorSideWallOb: new FormControl('', Validators.required),
      aluminiumConductorSideWallRem: new FormControl(''),
      bridgingCableConnectionOb: new FormControl('', Validators.required),
      bridgingCableConnectionRem: new FormControl(''),
      totalNoBridgingCableOb: new FormControl('', Validators.required),
      totalNoBridgingCableRem: new FormControl(''),
      inspectedNoOb: new FormControl('', Validators.required),
      inspectedNoRem: new FormControl(''),
      inspectionPassedNoOb: new FormControl('', Validators.required),
      inspectionPassedNoRem: new FormControl(''),
      inspectionFailedNoOb: new FormControl('', Validators.required),
      inspectionFailedNoRem: new FormControl(''),
      flag: new FormControl('true'),
    })
  }

  private createHolderArrForm(): FormGroup {

    return new FormGroup({
      locationNumber: new FormControl('', Validators.required),
      locationName: new FormControl('', Validators.required),
      physicalInspectionOb: new FormControl('', Validators.required),
      physicalInspectionRem: new FormControl(''),
      conductHolderFlatSurfaceOb: new FormControl('', Validators.required),
      conductHolderFlatSurfaceRem: new FormControl(''),
      conductorHoldedOb: new FormControl('', Validators.required),
      conductorHoldedRem: new FormControl(''),
      materialHolderOb: new FormControl('', Validators.required),
      materialHolderRem: new FormControl(''),
      totalNoHolderOb: new FormControl('', Validators.required),
      totalNoHolderRem: new FormControl(''),
      inspectedNoOb: new FormControl('', Validators.required),
      inspectedNoRem: new FormControl(''),
      inspectionPassedNoOb: new FormControl('', Validators.required),
      inspectionPassedNoRem: new FormControl(''),
      inspectionFailedNoOb: new FormControl('', Validators.required),
      inspectionFailedNoRem: new FormControl(''),
      flag: new FormControl('true'),
    })
  }

  private createConnectorArrForm(): FormGroup {

    return new FormGroup({
      locationNumber: new FormControl('', Validators.required),
      locationName: new FormControl('', Validators.required),
      physicalInspectionOb: new FormControl('', Validators.required),
      physicalInspectionRem: new FormControl(''),
      strightConnectCheckOb: new FormControl('', Validators.required),
      strightConnectCheckRem: new FormControl(''),
      materialConnectorOb: new FormControl('', Validators.required),
      materialConnectorRem: new FormControl(''),
      maxConnectorsDownConductorOb: new FormControl('', Validators.required),
      maxConnectorsDownConductorRem: new FormControl(''),
      totalNoConnectorsOb: new FormControl('', Validators.required),
      totalNoConnectorsRem: new FormControl(''),
      inspectedNoOb: new FormControl('', Validators.required),
      inspectedNoRem: new FormControl(''),
      inspectionPassedNoOb: new FormControl('', Validators.required),
      inspectionPassedNoRem: new FormControl(''),
      inspectionFailedNoOb: new FormControl('', Validators.required),
      inspectionFailedNoRem: new FormControl(''),
      flag: new FormControl('true'),
    })
  }

  private createLightArrForm(): FormGroup {

    return new FormGroup({
      locationNumber: new FormControl('', Validators.required),
      locationName: new FormControl('', Validators.required),
      threadHoldCurrentOb: new FormControl('', Validators.required),
      threadHoldCurrentRem: new FormControl(''),
      maximumWithStandCurrentOb: new FormControl('', Validators.required),
      maximumWithStandCurrentRem: new FormControl(''),
      countsOb: new FormControl('', Validators.required),
      countsRem: new FormControl(''),
      batteryLifeTimeOb: new FormControl('', Validators.required),
      batteryLifeTimeRem: new FormControl(''),
      properConnectionLightingCounterOb: new FormControl('', Validators.required),
      properConnectionLightingCounterRem: new FormControl(''),
      lightingCounterPlacedOb: new FormControl('', Validators.required),
      lightingCounterPlacedRem: new FormControl(''),
      conditionOfLightingCounterOb: new FormControl('', Validators.required),
      conditionOfLightingCounterRem: new FormControl(''),
      totalNoLightingCounterOb: new FormControl('', Validators.required),
      totalNoLightingCounterRem: new FormControl(''),
      inspectedNoOb: new FormControl('', Validators.required),
      inspectedNoRem: new FormControl(''),
      inspectionPassedNoOb: new FormControl('', Validators.required),
      inspectionPassedNoRem: new FormControl(''),
      inspectionFailedNoOb: new FormControl('', Validators.required),
      inspectionFailedNoRem: new FormControl(''),
      flag: new FormControl('true'),
    })
  }

  private createTestJointsArrForm(): FormGroup {

    return new FormGroup({
      locationNumber: new FormControl('', Validators.required),
      locationName: new FormControl('', Validators.required),
      testJointTypeOb: new FormControl('', Validators.required),
      testJointTypeRem: new FormControl(''),
      materialTestJointOb: new FormControl('', Validators.required),
      materialTestJointRem: new FormControl(''),
      accessibilityOfTestJointOb: new FormControl('', Validators.required),
      accessibilityOfTestJointRem: new FormControl(''),
      nonMetalicProtectionOb: new FormControl('', Validators.required),
      nonMetalicProtectionRem: new FormControl(''),
      testJointPlacedGroungLevelOb: new FormControl('', Validators.required),
      testJointPlacedGroungLevelRem: new FormControl(''),
      bimetallicIssueCheckOb: new FormControl('', Validators.required),
      bimetallicIssueCheckRem: new FormControl(''),
      totalNoOfTestJointOB: new FormControl('', Validators.required),
      totalNoOfTestJointRem: new FormControl(''),
      inspectedNoOb: new FormControl('', Validators.required),
      inspectedNoRem: new FormControl(''),
      inspectionPassedNoOb: new FormControl('', Validators.required),
      inspectionPassedNoRem: new FormControl(''),
      inspectionFailedNoOb: new FormControl('', Validators.required),
      inspectionFailedNoRem: new FormControl(''),
      flag: new FormControl('true'),
    })
  }

  get f() {
    return this.downConductorForm.controls;
  }


  onSubmit(flag: any) {
    this.submitted = true;
    this.downConductorDescription.userName = "inspector2@gmail.com";
    this.downConductorDescription.basicLpsId = 22;
    if (this.downConductorForm.invalid) {

      return;

    }
    else{
    this.downConductorDescription.userName = this.router.snapshot.paramMap.get('email') || '{}';;
    this.downConductorDescription.basicLpsId = this.basicLpsId;
    this.downConductorDescription.downConductor = this.downConductorForm.value.downConductor;
    this.downConductorDescription.bridgingDescription = this.downConductorForm.value.bridgingDescription;
    this.downConductorDescription.holder = this.downConductorForm.value.holder;
    this.downConductorDescription.connectors = this.downConductorForm.value.connectors;
    this.downConductorDescription.lightningCounter = this.downConductorForm.value.lightningCounter;
    this.downConductorDescription.testingJoint = this.downConductorForm.value.testingJoint; 
    
    if (!this.validationError) {
      if(flag) {
        if(this.downConductorForm.dirty && this.downConductorForm.touched){ 
        this.lpsDownconductorService.updateDownConductor(this.downConductorDescription).subscribe(
          (data) => {
            
            this.success = true;
            this.successMsg = data;
            this.downConductorForm.markAsPristine();
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
        }
      else{
          this.success = true;
          this.proceedNext.emit(true);
        }
      }
      }
      else {
        this.lpsDownconductorService.saveDownConductors(this.downConductorDescription).subscribe(
          (data) => {
            this.success = true;
            this.successMsg = data;
            this.disable = true;
            this.retriveDownConductor();
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
  }
 onChangeForm(event:any){
    if(!this.downConductorForm.invalid){
      if(this.downConductorForm.dirty){
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
   if(!this.downConductorForm.invalid){ 
    if(this.downConductorForm.dirty){
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
    if (this.downConductorForm.invalid) {
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
       if(this.downConductorForm.dirty && this.downConductorForm.touched){
        this.modalService.open(content, { centered: true,backdrop: 'static' });
     }
    //  For Dirty popup
     else{
      this.modalService.open(contents, { centered: true,backdrop: 'static' });
     }
  }

  retriveDownConductor(){
    this.lpsDownconductorService.retrieveDownConductor(this.router.snapshot.paramMap.get('email') || '{}',this.basicLpsId).subscribe(
      data => {
        this.retrieveDetailsfromSavedReports1(this.downConductorDescription.userName,this.basicLpsId,this.ClientName,data);
      },
      error=>{
      }
    );  
  }
}

