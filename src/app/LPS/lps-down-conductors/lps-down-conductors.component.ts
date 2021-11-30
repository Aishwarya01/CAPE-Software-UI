import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  downArr!: FormArray;
  bridgingArr!: FormArray;
  holderArr!: FormArray;
  connectorArr!: FormArray;
  lightArr!: FormArray;
  testjointsArr!: FormArray;
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
    private matstepper: LpsMatstepperComponent) {
    this.lpsDownconductorService = lpsDownconductorService
  }

  ngOnInit(): void {
    this.downConductorForm = this.formBuilder.group({

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

      downArr: this.formBuilder.array([this.createDownArrForm()]),
      bridgingArr: this.formBuilder.array([this.createBridgeArrForm()]),
      holderArr: this.formBuilder.array([this.createHolderArrForm()]),
      connectorArr: this.formBuilder.array([this.createConnectorArrForm()]),
      lightArr: this.formBuilder.array([this.createLightArrForm()]),
      testjointsArr: this.formBuilder.array([this.createTestJointsArrForm()])
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

  retrieveDetailsfromSavedReports(userName: any,basicLpsId: any,clientName: any,data: any){
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
      this.downConductorForm.setControl('downArr', this.formBuilder.array(this.arr1 || []))
      this.downConductorForm.setControl('bridgingArr', this.formBuilder.array(this.arr2 || []))
      this.downConductorForm.setControl('holderArr', this.formBuilder.array(this.arr3 || []))
      this.downConductorForm.setControl('connectorArr', this.formBuilder.array(this.arr4 || []))
      this.downConductorForm.setControl('lightArr', this.formBuilder.array(this.arr5 || []))
      this.downConductorForm.setControl('testjointsArr', this.formBuilder.array(this.arr6 || []))

      this.arr1 = [];
      this.arr2 = [];
      this.arr3 = [];
      this.arr4 = [];
      this.arr5 = [];
      this.arr6 = [];
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

  downConductorControls(): AbstractControl[] {
    return (<FormArray>this.downConductorForm.get('downArr')).controls
  }

  bridgingCablesControls(): AbstractControl[] {
    return (<FormArray>this.downConductorForm.get('bridgingArr')).controls
  }

  holdersControls(): AbstractControl[] {
    return (<FormArray>this.downConductorForm.get('holderArr')).controls
  }

  connectorsControls(): AbstractControl[] {
    return (<FormArray>this.downConductorForm.get('connectorArr')).controls
  }

  lightControls(): AbstractControl[] {
    return (<FormArray>this.downConductorForm.get('lightArr')).controls
  }

  jointControls(): AbstractControl[] {
    return (<FormArray>this.downConductorForm.get('testjointsArr')).controls
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

  submit() {
    this.downArr = this.downConductorForm.get('downArr') as FormArray;
    this.downArr.push(this.createDownArrForm());
  }
  submit1() {
    this.downArr = this.downConductorForm.get('bridgingArr') as FormArray;
    this.downArr.push(this.createBridgeArrForm());
  }
  submit2() {
    this.holderArr = this.downConductorForm.get('holderArr') as FormArray;
    this.holderArr.push(this.createHolderArrForm());
  }
  submit3() {
    this.connectorArr = this.downConductorForm.get('connectorArr') as FormArray;
    this.connectorArr.push(this.createConnectorArrForm());
  }
  submit4() {
    this.lightArr = this.downConductorForm.get('lightArr') as FormArray;
    this.lightArr.push(this.createLightArrForm());
  }

  submit5() {
    this.lightArr = this.downConductorForm.get('testjointsArr') as FormArray;
    this.lightArr.push(this.createTestJointsArrForm());
  }
         
  removeItem(a:any,index: any) {
    if(a.value.downConductorId !=0 && a.value.downConductorId !=undefined){
      a.value.flag=false;
    (this.downConductorForm.get('downArr') as FormArray).removeAt(index);
    this.downPushArr= this.downPushArr.concat(a.value);
   
   }
   else {(this.downConductorForm.get('downArr') as FormArray).removeAt(index);}
  }
  removeItem1(a:any,index: any) {
    if(a.value.bridgingDescriptionId !=0 && a.value.bridgingDescriptionId !=undefined){
      a.value.flag=false;
    (this.downConductorForm.get('bridgingArr') as FormArray).removeAt(index);
    this.bridgingPushArr= this.bridgingPushArr.concat(a.value);
   
   }
   else {(this.downConductorForm.get('bridgingArr') as FormArray).removeAt(index);}
  }
  removeItem2(a:any,index: any) {
    if(a.value.holderId !=0 && a.value.holderId !=undefined){
      a.value.flag=false;
    (this.downConductorForm.get('holderArr') as FormArray).removeAt(index);
    this.holderPushArr= this.holderPushArr.concat(a.value);
   
   }
   else {(this.downConductorForm.get('holderArr') as FormArray).removeAt(index);}
  }
  removeItem3(a:any,index: any) {
    if(a.value.connectorId !=0 && a.value.connectorId !=undefined){
      a.value.flag=false;
    (this.downConductorForm.get('connectorArr') as FormArray).removeAt(index);
    this.connectorPushArr= this.connectorPushArr.concat(a.value);
   
   }
   else {(this.downConductorForm.get('connectorArr') as FormArray).removeAt(index);}
  }
  removeItem4(a:any,index: any) {
    if(a.value.lightingCountersId !=0 && a.value.lightingCountersId !=undefined){
      a.value.flag=false;
    (this.downConductorForm.get('lightArr') as FormArray).removeAt(index);
    this.lightPushArr= this.lightPushArr.concat(a.value);
   
   }
  else  {(this.downConductorForm.get('lightArr') as FormArray).removeAt(index);}
  }
  removeItem5(a:any,index: any) {
    if(a.value.testJointId !=0 && a.value.testJointId !=undefined){
      a.value.flag=false;
    (this.downConductorForm.get('testjointsArr') as FormArray).removeAt(index);
    this.testjointsPushArr= this.testjointsPushArr.concat(a.value);
   
   }
   else {(this.downConductorForm.get('testjointsArr') as FormArray).removeAt(index);}
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
    this.downConductorDescription.downConductor = this.downConductorForm.value.downArr;
    this.downConductorDescription.bridgingDescription = this.downConductorForm.value.bridgingArr;
    this.downConductorDescription.holder = this.downConductorForm.value.holderArr;
    this.downConductorDescription.connectors = this.downConductorForm.value.connectorArr;
    this.downConductorDescription.lightningCounter = this.downConductorForm.value.lightArr;
    this.downConductorDescription.testingJoint = this.downConductorForm.value.testjointsArr; 
    
    this.downConductorDescription.downConductor = this.downConductorDescription.downConductor.concat(this.downPushArr);
    this.downConductorDescription.bridgingDescription = this.downConductorDescription.bridgingDescription.concat(this.bridgingPushArr);
    this.downConductorDescription.holder = this.downConductorDescription.holder.concat(this.holderPushArr);
    this.downConductorDescription.connectors = this.downConductorDescription.connectors.concat(this.connectorPushArr);
    this.downConductorDescription.lightningCounter = this.downConductorDescription.lightningCounter.concat(this.lightPushArr);
    this.downConductorDescription.testingJoint = this.downConductorDescription.testingJoint.concat(this.testjointsPushArr);
    
    this.downPushArr= [];
    this.bridgingPushArr = [];
    this.holderPushArr= [];
    this.connectorPushArr = [];
    this.lightPushArr = [];
    this.testjointsPushArr = [];

      if(flag) {
        if(this.downConductorForm.dirty && this.downConductorForm.touched){ 
        this.lpsDownconductorService.updateDownConductor(this.downConductorDescription).subscribe(
          (data) => {
            this.success = true;
            this.successMsg = data;
            this.downConductorForm.markAsPristine();
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
        this.modalService.open(content, { centered: true });
     }
    //  For Dirty popup
     else{
      this.modalService.open(contents, { centered: true });
     }
  }

  retriveAirTermination(){
    this.matstepper.retriveAirTermination(this.router.snapshot.paramMap.get('email') || '{}', this.basicLpsId, this.ClientName);
  }

}

