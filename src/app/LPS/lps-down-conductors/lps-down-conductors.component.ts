import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DownConductorDescription } from 'src/app/LPS_model/down-conductor';
import { LpsDownconductorService } from 'src/app/LPS_services/lps-downconductor.service';

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
  downConductorDescription= new DownConductorDescription();

  constructor(
    private formBuilder: FormBuilder, lpsDownconductorService: LpsDownconductorService) {
    this.lpsDownconductorService = lpsDownconductorService
  }

  ngOnInit(): void {
    this.downConductorForm = this.formBuilder.group({

      biMetallicIssueOb: new FormControl(''),
      biMetallicIssueRem: new FormControl(''),
      warningNoticeGroundLevelOb: new FormControl(''),
      warningNoticeGroundLevelRem: new FormControl(''),
      noPowerDownConductorOb: new FormControl(''),
      noPowerDownConductorRem: new FormControl(''),
      connectMadeBrazingOb: new FormControl(''),
      connectMadeBrazingRem: new FormControl(''),
      chemicalSprinklerOb: new FormControl(''),
      chemicalSprinklerRem: new FormControl(''),
      cobustMaterialWallOB: new FormControl(''),
      cobustMaterialWallRem: new FormControl(''),

      downArr: this.formBuilder.array([this.createDownArrForm()]),
      bridgingArr: this.formBuilder.array([this.createBridgeArrForm()]),
      holderArr: this.formBuilder.array([this.createHolderArrForm()]),
      connectorArr: this.formBuilder.array([this.createConnectorArrForm()]),
      lightArr: this.formBuilder.array([this.createLightArrForm()]),
      testjointsArr: this.formBuilder.array([this.createTestJointsArrForm()])
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
      lacationNo: new FormControl(''),
      lacationName: new FormControl(''),
      physicalInspectionOb: new FormControl(''),
      physicalInspectionRem: new FormControl(''),
      conductMaterialOb: new FormControl(''),
      conductMaterialRem: new FormControl(''),
      conductSizeOb: new FormControl(''),
      conductSizeRem: new FormControl(''),
      downConductExposedOb: new FormControl(''),
      downConductExposedRem: new FormControl(''),
      downConductLocationdOb: new FormControl(''),
      downConductLocationdRem: new FormControl(''),
      downConductGutterOb: new FormControl(''),
      downConductGutterRem: new FormControl(''),
      ensureDownCnoductOb: new FormControl(''),
      ensureDownCnoductRem: new FormControl(''),
      installationDownConductOb: new FormControl(''),
      installationDownConductRem: new FormControl(''),
      maximumDownConductOb: new FormControl(''),
      maximumDownConductRem: new FormControl(''),
      manimumDownConductOb: new FormControl(''),
      manimumDownConductRem: new FormControl(''),
      totalNoDownConductOb: new FormControl(''),
      totalNoDownConductRem: new FormControl(''),
      inspectedNoOb: new FormControl(''),
      inspectedNoRem: new FormControl(''),
      inspectionPassedNoOb: new FormControl(''),
      inspectionPassedNoRem: new FormControl(''),
      inspectionFailedNoOb: new FormControl(''),
      inspectionFailedNoRem: new FormControl('')
    })
  }

  private createBridgeArrForm(): FormGroup {

    return new FormGroup({
      lacationNo: new FormControl(''),
      lacationName: new FormControl(''),
      ensureBridgingCableOb: new FormControl(''),
      ensureBridgingCableRem: new FormControl(''),
      aluminiumConductorSideWallOb: new FormControl(''),
      aluminiumConductorSideWallRem: new FormControl(''),
      bridgingCableConnectionOb: new FormControl(''),
      bridgingCableConnectionRem: new FormControl(''),
      totalNoBridgingCableOb: new FormControl(''),
      totalNoBridgingCableRem: new FormControl(''),
      inspectedNoOb: new FormControl(''),
      inspectedNoRem: new FormControl(''),
      inspectionPassedNoOb: new FormControl(''),
      inspectionPassedNoRem: new FormControl(''),
      inspectionFailedNoOb: new FormControl(''),
      inspectionFailedNoRem: new FormControl('')
    })
  }

  private createHolderArrForm(): FormGroup {

    return new FormGroup({
      physicalInspectionOb: new FormControl(''),
      physicalInspectionRem: new FormControl(''),
      conductHolderFlatSurfaceOb: new FormControl(''),
      conductHolderFlatSurfaceRem: new FormControl(''),
      conductorHoldedOb: new FormControl(''),
      conductorHoldedRem: new FormControl(''),
      materialHolderOb: new FormControl(''),
      materialHolderRem: new FormControl(''),
      totalNoHolderOb: new FormControl(''),
      totalNoHolderRem: new FormControl(''),
      inspectedNoOb: new FormControl(''),
      inspectedNoRem: new FormControl(''),
      inspectionPassedNoOb: new FormControl(''),
      inspectionPassedNoRem: new FormControl(''),
      inspectionFailedNoOb: new FormControl(''),
      inspectionFailedNoRem: new FormControl('')
    })
  }

  private createConnectorArrForm(): FormGroup {

    return new FormGroup({
      physicalInspectionOb: new FormControl(''),
      physicalInspectionRem: new FormControl(''),
      strightConnectCheckOb: new FormControl(''),
      strightConnectCheckRem: new FormControl(''),
      materialConnectorOb: new FormControl(''),
      materialConnectorRem: new FormControl(''),
      maxConnectorsDownConductorOb: new FormControl(''),
      maxConnectorsDownConductorRem: new FormControl(''),
      totalNoConnectorsOb: new FormControl(''),
      totalNoConnectorsRem: new FormControl(''),
      inspectedNoOb: new FormControl(''),
      inspectedNoRem: new FormControl(''),
      inspectionPassedNoOb: new FormControl(''),
      inspectionPassedNoRem: new FormControl(''),
      inspectionFailedNoOb: new FormControl(''),
      inspectionFailedNoRem: new FormControl('')
    })
  }

  private createLightArrForm(): FormGroup {
   
    return new FormGroup({
      threadHoldCurrentOb: new FormControl(''),
      threadHoldCurrentRem: new FormControl(''),
      maximumWithStandCurrentOb: new FormControl(''),
      maximumWithStandCurrentRem: new FormControl(''),
      countsOb: new FormControl(''),
      countsRem: new FormControl(''),
      batteryLifeTimeOb: new FormControl(''),
      batteryLifeTimeRem: new FormControl(''),
      properConnectionLightingCounterOb: new FormControl(''),
      properConnectionLightingCounterRem: new FormControl(''),
      lightingCounterPlacedOb: new FormControl(''),
      lightingCounterPlacedRem: new FormControl(''),
      conditionOfLightingCounterOb: new FormControl(''),
      conditionOfLightingCounterRem: new FormControl(''),
      totalNoLightingCounterOb: new FormControl(''),
      totalNoLightingCounterRem: new FormControl(''),
      inspectedNoOb: new FormControl(''),
      inspectedNoRem: new FormControl(''),
      inspectionPassedNoOb: new FormControl(''),
      inspectionPassedNoRem: new FormControl(''),
      inspectionFailedNoOb: new FormControl(''),
      inspectionFailedNoRem: new FormControl('')
    })
  }

  private createTestJointsArrForm(): FormGroup {
  
    return new FormGroup({
      lacationNo: new FormControl(''),
      lacationName: new FormControl(''),
      testJointTypeOb: new FormControl(''),
      testJointTypeRem: new FormControl(''),
      materialTestJointOb: new FormControl(''),
      materialTestJointRem: new FormControl(''),
      accessibilityOfTestJointOb: new FormControl(''),
      accessibilityOfTestJointRem: new FormControl(''),
      nonMetalicProtectionOb: new FormControl(''),
      nonMetalicProtectionRem: new FormControl(''),
      testJointPlacedGroungLevelOb: new FormControl(''),
      testJointPlacedGroungLevelRem: new FormControl(''),
      bimetallicIssueCheckOb: new FormControl(''),
      bimetallicIssueCheckRem: new FormControl(''),
      totalNoOfTestJointOB: new FormControl(''),
      totalNoOfTestJointRem: new FormControl(''),
      inspectedNoOb: new FormControl(''),
      inspectedNoRem: new FormControl(''),
      inspectionPassedNoOb: new FormControl(''),
      inspectionPassedNoRem: new FormControl(''),
      inspectionFailedNoOb: new FormControl(''),
      inspectionFailedNoRem: new FormControl('')
    })
  }

  submit() {
    this.downArr = this.downConductorForm.get('downArr') as FormArray;
    this.downArr.push(this.createDownArrForm());
    console.log(this.downConductorForm)
  }
  submit1() {
    this.downArr = this.downConductorForm.get('bridgingArr') as FormArray;
    this.downArr.push(this.createBridgeArrForm());
    console.log(this.downConductorForm)
  }
  submit2() {
    this.holderArr = this.downConductorForm.get('holderArr') as FormArray;
    this.holderArr.push(this.createHolderArrForm());
    console.log(this.downConductorForm)
  }
  submit3() {
    this.connectorArr = this.downConductorForm.get('connectorArr') as FormArray;
    this.connectorArr.push(this.createConnectorArrForm());
    console.log(this.downConductorForm)
  }
  submit4() {
    this.lightArr = this.downConductorForm.get('lightArr') as FormArray;
    this.lightArr.push(this.createLightArrForm());
    console.log(this.downConductorForm)
  }

   onSubmit() {
    this.submitted=true;
this.downConductorDescription.userName="inspector2@gmail.com";
this.downConductorDescription.basicLpsId=22;
if (this.downConductorForm.invalid) {

  return;

}
this.downConductorDescription.downConductor = this.downConductorForm.value.downArr;
this.downConductorDescription.bridgingDescription = this.downConductorForm.value.bridgingArr;
this.downConductorDescription.holder = this.downConductorForm.value.holderArr;
this.downConductorDescription.connectors = this.downConductorForm.value.connectorArr;
this.downConductorDescription.lightningCounter = this.downConductorForm.value.lightArr;
this.downConductorDescription.testingJoint = this.downConductorForm.value.testjointsArr;


    this.lpsDownconductorService.saveDownConductors(this.downConductorDescription).subscribe(

      () => {

         
      
      },
      () => {
      }
    )
    console.log(this.downConductorDescription)
  }

  get f() {
    return this.downConductorForm.controls;
  }
}

