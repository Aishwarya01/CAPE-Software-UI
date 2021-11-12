import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DownConductorDescription } from 'src/app/LPS_model/down-conductor';
import { LpsDownconductorService } from 'src/app/LPS_services/lps-downconductor.service';

@Component({
  selector: 'app-lps-down-conductors',
  templateUrl: './lps-down-conductors.component.html',
  styleUrls: ['./lps-down-conductors.component.css']
})
export class LpsDownConductorsComponent implements OnInit {

  downConductorForm: FormGroup;

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
  successMsg: string = "";
  Error: boolean = false;
  errorArr: any = [];
  errorMsg: string = "";
  validationError: boolean = false;
  validationErrorMsg: String = '';

  constructor(
    private formBuilder: FormBuilder, lpsDownconductorService: LpsDownconductorService,
    private modalService: NgbModal, private router: ActivatedRoute) {
    this.lpsDownconductorService = lpsDownconductorService,
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
      lacationNo: new FormControl('', Validators.required),
      lacationName: new FormControl('', Validators.required),
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
      inspectionFailedNoRem: new FormControl('')
    })
  }

  private createBridgeArrForm(): FormGroup {

    return new FormGroup({
      lacationNo: new FormControl('', Validators.required),
      lacationName: new FormControl('', Validators.required),
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
      inspectionFailedNoRem: new FormControl('')
    })
  }

  private createHolderArrForm(): FormGroup {

    return new FormGroup({
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
      inspectionFailedNoRem: new FormControl('')
    })
  }

  private createConnectorArrForm(): FormGroup {

    return new FormGroup({
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
      inspectionFailedNoRem: new FormControl('')
    })
  }

  private createLightArrForm(): FormGroup {

    return new FormGroup({
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
      inspectionFailedNoRem: new FormControl('')
    })
  }

  private createTestJointsArrForm(): FormGroup {

    return new FormGroup({
      lacationNo: new FormControl('', Validators.required),
      lacationName: new FormControl('', Validators.required),
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

  removeItem(index: any) {
    (this.downConductorForm.get('downArr') as FormArray).removeAt(index);
  }
  removeItem1(index: any) {
    (this.downConductorForm.get('bridgingArr') as FormArray).removeAt(index);
  }
  removeItem2(index: any) {
    (this.downConductorForm.get('holderArr') as FormArray).removeAt(index);
  }
  removeItem3(index: any) {
    (this.downConductorForm.get('connectorArr') as FormArray).removeAt(index);
  }
  removeItem4(index: any) {
    (this.downConductorForm.get('lightArr') as FormArray).removeAt(index);
  }

  get f() {
    return this.downConductorForm.controls;
  }


  onSubmit() {
    this.submitted = true;
    this.downConductorDescription.userName = "inspector2@gmail.com";
    this.downConductorDescription.basicLpsId = 22;
    if (this.downConductorForm.invalid) {

      return;

    }
    this.downConductorDescription.userName = this.router.snapshot.paramMap.get('email') || '{}';;
    this.downConductorDescription.basicLpsId = this.basicLpsId;
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
    if (this.downConductorForm.invalid) {
      this.validationError = true;

      this.validationErrorMsg = 'Please check all the fields';
      setTimeout(() => {
        this.validationError = false;
      }, 3000);
      return;
    }
    this.modalService.open(content, { centered: true });
  }

}

