import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalsService } from 'src/app/globals.service';
import { downConductorReport } from 'src/app/LPS_model/downConductorReport';
import { AirterminationService } from 'src/app/LPS_services/airtermination.service';
import { LpsDownconductorService } from 'src/app/LPS_services/lps-downconductor.service';
import { LpsFileUploadService } from 'src/app/LPS_services/lps-file-upload.service';
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
  downConductorDescription: any = [];
  testingJoint!: FormArray;
  lpsDownconductorService;
  submitted = false;
  downConductorReport = new downConductorReport();
  disable: boolean = false;
  file!: any;
  uploadDisable: boolean = true;
  uploadDisable1: boolean = true;
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
  downConductorNames: any[] = [
      'physicalInspectionOb',
      'conductMaterialOb',
      'downConductExposedOb',
      'downConductLocationdOb',
      'downConductGutterOb',
      'installedShaftDownConductorOb',
      'ensureDownCnoductOb',
      'installationDownConductOb',
      'maximumDownConductOb',
      'manimumDownConductOb',
      'totalNoDownConductOb',
      'inspectedNoOb',
      'inspectionPassedNoOb',
      'inspectionFailedNoOb',
      'averageBendsOb',
      // 'naturalDownCondutTypeOb',
      // 'naturalDownCondDimensionOb',
  ]
  downConductorNamesRem: any[] = [
      'physicalInspectionRem',
      'conductMaterialRem',
      'conductSizeRem',
      'downConductExposedRem',
      'downConductLocationdRem',
      'downConductGutterRem',
      'installedShaftDownConductorRem',
      'ensureDownCnoductRem',
      'installationDownConductRem',
      'maximumDownConductRem',
      'manimumDownConductRem',
      'totalNoDownConductRem',
      'inspectedNoRem',
      'inspectionPassedNoRem',
      'inspectionFailedNoRem',
      'averageBendsRem',
      'naturalDownCondutTypeRem',
      'naturalDownCondDimensionRem',
  ] 
  success: boolean = false;
  // success1: boolean = false;
  // successMsg1: string="";
  successMsg: string = "";
  mode: any = 'indeterminate';
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
  arr7: any = [];


  downPushArr: any = [];
  bridgingPushArr: any = [];
  holderPushArr: any = [];
  connectorPushArr: any = [];
  lightPushArr: any = [];
  testjointsPushArr: any = [];
  isEditable!:boolean

  stepBack:any;
  NotapplicableJoints: boolean=false;
  NotapplicableCounters: boolean=false;
  applicableJoints: boolean=false;
  applicableCounters: boolean=false;
  applicableConnectors: boolean=false;
  applicableHolders: boolean=false;
  applicableCables: boolean=false;
  applicableDown: boolean=false;
  applicableJointsNote: boolean=true;
  applicableCountersNote: boolean=true;
  applicableConnectorsNote: boolean=true;
  applicableHoldersNote: boolean=true;
  applicableCablesNote: boolean=true;
  applicableDownNote: boolean=true;
  email: string ='';
  airTerminationValues: any = [];
  airTerminationDesc: any= [];
  deletedDownCoductors: any= [];
  deletedBridgingDesc: any= [];
  deletedHolders: any= [];
  deletedConnectors: any= [];
  deletedLightningCounter: any= [];
  deletedTestingJoint: any= [];
  deletedDownConductorTesting: any= [];
  tempArray: any = [];
  step3List1: any = [];
  availabilityOfPreviousReport: String="";
  validationErrorTab: boolean = false;
  validationErrorMsgTab: string="";
  tabError: boolean=false;
  tabErrorMsg: string="";
  componentName: string = "downConductor";
  componentName1: string = "downConductor-1";
  JSONdata: any = [];
  finalSpinner: boolean = true;
  popup: boolean = false; 
  filesuccess: boolean = false;
  filesuccessMsg: string = "";
  fileName1: string = "";
  fileName: string = "";
  uploadFlag:boolean = true;
  uploadFlag1:boolean = true;
  fileId: number = 0;
  fileId1: number = 0;
  finalSpinnerDelete: boolean = true;
  popupDelete: boolean = false;
  fileDeleteSuccess: boolean = false;
  fileDeletesuccessMsg: any;
  

  constructor(
    private formBuilder: FormBuilder, lpsDownconductorService: LpsDownconductorService,
    private modalService: NgbModal, private router: ActivatedRoute,
    public service: GlobalsService,
    private matstepper: LpsMatstepperComponent,
    private fileUploadServiceService: LpsFileUploadService,
    private airterminationServices:AirterminationService) {
    this.lpsDownconductorService = lpsDownconductorService;
    this.email = this.router.snapshot.paramMap.get('email') || '{}';

  }

  ngOnInit(): void {
    this.downConductorForm = this.formBuilder.group({
      downConductorDescription: this.formBuilder.array([this.allLPSDownConductor()])
    });
    this.retrieveFromAirTermination();
  }

  retrieveFromAirTermination() {
    if(this.basicLpsId != 0 && this.basicLpsId != undefined) {
      this.airterminationServices.retriveAirTerminationDetails(this.email,this.basicLpsId).subscribe(
        (data) => {
          this.airTerminationValues = JSON.parse(data);
          if(this.airTerminationValues != undefined && this.airTerminationValues[0] != undefined && this.airTerminationValues !=null  ){
          this.downConductorForm = this.formBuilder.group({
            downConductorDescription: this.formBuilder.array([])
          });
          this.airTerminationDesc = this.airTerminationValues[0].lpsAirDescription;
          if(this.airTerminationDesc != '' && this.airTerminationDesc != undefined && this.airTerminationDesc.length != 0) {
            for(let i=0; i<this.airTerminationDesc.length; i++) {
              this.addDownConductor();
            }
          }
          this.downConductorDescription = this.downConductorForm.get('downConductorDescription') as FormArray
          for(let j=0; j<this.downConductorDescription.controls.length; j++) {
            this.downConductorDescription.controls[j].controls.buildingName.setValue(this.airTerminationDesc[j].buildingName);
            this.downConductorDescription.controls[j].controls.buildingNumber.setValue(this.airTerminationDesc[j].buildingNumber);
            this.downConductorDescription.controls[j].controls.buildingCount.setValue(this.airTerminationDesc[j].buildingCount);
          }
        }
        },
        (error) => {

        }
      )
    }
  }

  updateMethod(){
    this.ngOnInit();
    this.lpsDownconductorService.retrieveDownConductor(this.email,this.basicLpsId).subscribe(
      data=>{
      if(JSON.parse(data)[0] != undefined && JSON.parse(data)[0].basicLpsId !=null){
       this.retrieveDetailsfromSavedReports1(this.email,this.basicLpsId,'clientName',data); 
         
       setTimeout(() => {
        this.downConductorDescription = this.downConductorForm.get(
          'downConductorDescription'
        ) as FormArray;
        if(this.airTerminationValues[0].lpsAirDescription.length != this.step3List1[0].downConductorDescription.length) {
          this.tempArray = [];
          for(let i=0;  i<this.step3List1[0].downConductorDescription.length; i++) {
            for(let j=0;  j<this.airTerminationValues[0].lpsAirDescription.length; j++) {
              if(this.airTerminationValues[0].lpsAirDescription[j].buildingCount != this.step3List1[0].downConductorDescription[i].buildingCount) {
              this.tempArray.push(this.airTerminationValues[0].lpsAirDescription[j]);
              } 
              else {
              this.tempArray = [];
              }
            }
          }

          if(this.tempArray.length != 0) {
            for(let k=0; k<this.tempArray.length; k++) {
              this.addDownConductor();
            }

            for(let r = this.step3List1[0].downConductorDescription.length; r < this.downConductorDescription.controls.length; r++){
                this.downConductorDescription.controls[r].controls.buildingNumber.setValue(this.airTerminationValues[0].lpsAirDescription[r].buildingNumber);
                this.downConductorDescription.controls[r].controls.buildingName.setValue(this.airTerminationValues[0].lpsAirDescription[r].buildingName);
                this.downConductorDescription.controls[r].controls.buildingCount.setValue(this.airTerminationValues[0].lpsAirDescription[r].buildingCount);
              }
          } 
        }
      }, 3000);	
      } 
    }
    )
  }

  allLPSDownConductor() {
    return this.formBuilder.group({
      downConduDescId: new FormControl(''),
      buildingNumber : new FormControl(''),
      buildingName: new FormControl(''),
      buildingCount: new FormControl(''),
      flag: new FormControl('A'),
      biMetallicIssueOb: new FormControl('', Validators.required),
      biMetallicIssueRem: new FormControl(''),
      warningNoticeGroundLevelOb: new FormControl('', Validators.required),
      warningNoticeGroundLevelRem: new FormControl(''),
      insulationPresenceOb: new FormControl('', Validators.required),
      insulationPresenceRem: new FormControl(''),
      noPowerDownConductorOb: new FormControl('', Validators.required),
      noPowerDownConductorRem: new FormControl(''),
      connectMadeBrazingOb: new FormControl('', Validators.required),
      connectMadeBrazingRem: new FormControl(''),
      chemicalSprinklerOb: new FormControl('', Validators.required),
      chemicalSprinklerRem: new FormControl(''),
      cobustMaterialWallOB: new FormControl('', Validators.required),
      cobustMaterialWallRem: new FormControl(''),
      bridgingDescriptionAvailabilityOb: new FormControl('', Validators.required),
      bridgingDescriptionAvailabilityRem: new FormControl(''),
      holderAvailabilityOb: new FormControl('', Validators.required),
      holderAvailabilityRem: new FormControl(''),
      connectorsAvailabilityOb: new FormControl('', Validators.required),
      connectorsAvailabilityRem: new FormControl(''),
      lightningCounterAvailabilityOb: new FormControl('', Validators.required),
      lightningCounterAvailabilityRem: new FormControl(''),
      testingJointAvailabilityOb: new FormControl('', Validators.required),
      testingJointAvailabilityRem: new FormControl(''),
      downConductorAvailabilityOb: new FormControl('', Validators.required),
      downConductorAvailabilityRem: new FormControl(''),
      downConductorTestingAvailabilityOb: new FormControl(''),
      downConductorTestingAvailabilityRem: new FormControl(''),

      downConductor: this.formBuilder.array([this.createDownArrForm()]),
      bridgingDescription: this.formBuilder.array([this.createBridgeArrForm()]),
      holder: this.formBuilder.array([this.createHolderArrForm()]),
      connectors: this.formBuilder.array([this.createConnectorArrForm()]),
      lightningCounter: this.formBuilder.array([this.createLightArrForm()]),
      testingJoint: this.formBuilder.array([this.createTestJointsArrForm()]),
      downConductorTesting: this.formBuilder.array([]),
    });
  }

  private createDownArrForm(): FormGroup {
    return new FormGroup({
      downConductorId: new FormControl(''),
      flag: new FormControl('A'),
      physicalInspectionOb: new FormControl('', Validators.required),
      physicalInspectionRem: new FormControl(''),
      conductMaterialOb: new FormControl('', Validators.required),
      conductMaterialRem: new FormControl(''),
      conductSizeOb: new FormControl(''),
      conductSizeRem: new FormControl(''),
      downConductExposedOb: new FormControl('', Validators.required),
      downConductExposedRem: new FormControl(''),
      downConductLocationdOb: new FormControl('', Validators.required),
      downConductLocationdRem: new FormControl(''),
      downConductGutterOb: new FormControl('', Validators.required),
      downConductGutterRem: new FormControl(''),
      installedShaftDownConductorOb: new FormControl('', Validators.required),
      installedShaftDownConductorRem: new FormControl(''),
      ensureDownCnoductOb: new FormControl('', Validators.required),
      ensureDownCnoductRem:  new FormControl(''),
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
      averageBendsOb: new FormControl('', Validators.required),
      averageBendsRem: new FormControl(''),
      naturalDownCondutTypeOb: new FormControl(''),
      naturalDownCondutTypeRem: new FormControl(''),
      naturalDownCondDimensionOb: new FormControl('', Validators.required),
      naturalDownCondDimensionRem: new FormControl('')
    })
  }

  private createBridgeArrForm(): FormGroup {
    return new FormGroup({
      bridgingDescriptionId: new FormControl(''),
      flag: new FormControl('A'),
      ensureBridgingCableOb: new FormControl('', Validators.required), 
      ensureBridgingCableRem:  new FormControl(''),
      aluminiumConductorSideWallOb: new FormControl('', Validators.required), 
      aluminiumConductorSideWallRem: new FormControl(''),
      bridgingCableConnectionOb: new FormControl('', Validators.required), 
      bridgingCableConnectionRem: new FormControl(''),
      bridgingCableMaterialOb: new FormControl('', Validators.required),
      bridgingCableMaterialRem: new FormControl(''),
      bridgingCableSizeOb: new FormControl('', Validators.required),
      bridgingCableSizeRem: new FormControl(''),
      totalNoBridgingCableOb: new FormControl('', Validators.required),
      totalNoBridgingCableRem: new FormControl(''),
      inspectedNoOb: new FormControl('', Validators.required),
      inspectedNoRem: new FormControl(''),
      inspectionPassedNoOb: new FormControl('', Validators.required),
      inspectionPassedNoRem: new FormControl(''),
      inspectionFailedNoOb: new FormControl('', Validators.required),
      inspectionFailedNoRem:  new FormControl('')
    })
  }

  private createHolderArrForm(): FormGroup {
    return new FormGroup({
      holderId: new FormControl(''),
      flag: new FormControl('A'),
      physicalInspectionOb: new FormControl('', Validators.required),
      physicalInspectionRem:  new FormControl(''),
      conductHolderFlatSurfaceOb: new FormControl('', Validators.required),
      conductHolderFlatSurfaceRem:  new FormControl(''),
      conductorHoldedOb: new FormControl('', Validators.required),
      conductorHoldedRem: new FormControl(''),
      successiveDistanceOb: new FormControl('', Validators.required),
      successiveDistanceRem: new FormControl(''),
      materialHolderOb: new FormControl('', Validators.required),
      materialHolderRem: new FormControl(''),
      totalNoHolderOb: new FormControl('', Validators.required),
      totalNoHolderRem: new FormControl(''),
      inspectedNoOb: new FormControl('', Validators.required),
      inspectedNoRem: new FormControl(''),
      inspectionPassedNoOb: new FormControl('', Validators.required),
      inspectionPassedNoRem: new FormControl(''),
      inspectionFailedNoOb: new FormControl('', Validators.required),
      inspectionFailedNoRem:  new FormControl('')
    })
  }

  private createConnectorArrForm(): FormGroup {
    return new FormGroup({
      connectorId: new FormControl(''),
      flag: new FormControl('A'),
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
      lightingCountersId: new FormControl(''),
      flag: new FormControl('A'),
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
      totalNoLightingCounterRem:  new FormControl(''),
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
      testJointId: new FormControl(''),
      flag: new FormControl('A'),
      // testJointTypeOb: new FormControl('', Validators.required),
      // testJointTypeRem:  new FormControl(''),
      materialTestJointOb: new FormControl('', Validators.required),
      materialTestJointRem:  new FormControl(''),
      accessibilityOfTestJointOb: new FormControl('', Validators.required),
      accessibilityOfTestJointRem: new FormControl(''),
      nonMetalicProtectionOb: new FormControl('', Validators.required),
      nonMetalicProtectionRem: new FormControl(''),
      testJointPlacedGroungLevelOb: new FormControl('', Validators.required),
      testJointPlacedGroungLevelRem: new FormControl(''),
      bimetallicIssueCheckOb: new FormControl('', Validators.required),
      bimetallicIssueCheckRem: new FormControl(''),
      touchingConductorsOb: new FormControl('', Validators.required),
      touchingConductorsRem: new FormControl(''),
      totalNoOfTestJointOB: new FormControl('', Validators.required),
      totalNoOfTestJointRem: new FormControl(''),
      inspectedNoOb: new FormControl('', Validators.required),
      inspectedNoRem:  new FormControl(''),
      inspectionPassedNoOb: new FormControl('', Validators.required),
      inspectionPassedNoRem: new FormControl(''),
      inspectionFailedNoOb: new FormControl('', Validators.required),
      inspectionFailedNoRem: new FormControl('') 
    })
  }

  private createDownConductorTestingForm(): FormGroup {
    return new FormGroup({
      downConductorTestingId: new FormControl(''),
      flag: new FormControl('A'),
      serialNo: new FormControl(''),
      reference: new FormControl(''),
      length: new FormControl(''),
      resistance: new FormControl(''),
      remarks: new FormControl('') 
    })
  }

  addDownConductor() {
    let lpsAirDescArr = this.downConductorForm.get('downConductorDescription') as FormArray;
    lpsAirDescArr.push(this.allLPSDownConductor());
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

  
  
  //creating form array based on airtermination building
  // createDwonconductorForm(noOfBuildingNumber:any){
     
  //   this.downConductorDescription = this.downConductorForm.get('downConductorDescription') as FormArray;
  //   let sizeOfDwonconductor=this.downConductorForm.value.downConductorDescription.length;
  //    if(noOfBuildingNumber !=null && noOfBuildingNumber !='' && noOfBuildingNumber !=undefined){
      
  //     for (let i = 0; i < noOfBuildingNumber.length; i++) {
  //       let buildingNumber=null;
  //       let buildingName=null;
  //       let isBuildingRequired=false;
        
  //       //spliting locationNum and locationName from airtermination
  //       const myArray = noOfBuildingNumber[i].split(",");
  //       buildingNumber=parseInt(myArray[0])
  //       buildingName=myArray[1]
  //           for (let j = 0; !isBuildingRequired && j < sizeOfDwonconductor; j++) { 
  //             //if form dont have any data
  //             if((this.downConductorForm.value.downConductorDescription[j].buildingNumber==null || this.downConductorForm.value.downConductorDescription[j].buildingNumber=='') && (this.downConductorForm.value.downConductorDescription[j].downConduDescId == null ||this.downConductorForm.value.downConductorDescription[j].downConduDescId == '')){
  //               //first removing empty form
  //              (this.downConductorForm.get('downConductorDescription') as FormArray).removeAt(j);
  //              this.downConductorDescription.push(this.allLPSDownConductor(buildingNumber,buildingName));
  //               isBuildingRequired=true;
  //             }
  //             else{
  //               //verifying form have coressponding buildingName,buildingNumber
  //               if(myArray !=null && this.downConductorForm.value.downConductorDescription[j].buildingNumber !=null
  //                 && this.downConductorForm.value.downConductorDescription[j].buildingName !=null 
  //                 && buildingNumber==this.downConductorForm.value.downConductorDescription[j].buildingNumber && buildingName==this.downConductorForm.value.downConductorDescription[j].buildingName){
  //                 isBuildingRequired=true;
  //               }
                
  //             }
  //           }
  //       //adding new dwonconductor
  //       if(!isBuildingRequired){
  //       this.downConductorDescription.push(this.allLPSDownConductor(buildingNumber,buildingName));
  //          buildingName=null;
  //          isBuildingRequired=false;
  //       }
  //     }
  //    }    
  // }

  reset(){
    this.downConductorForm.reset();
  }

  retrieveDetailsfromSavedReports(userName: any,basicLpsId: any,data: any){
      //this.service.lvClick=1;
      this.step3List = data.downConductorReport;
      this.downConductorReport.basicLpsId = basicLpsId;      
      this.basicLpsId = basicLpsId;
      this.retrieveFromAirTermination();
      this.deletedBridgingDesc = [];
      this.deletedConnectors = [];
      this.deletedDownCoductors = [];
      this.deletedDownConductorTesting = [];
      this.deletedHolders = [];
      this.deletedLightningCounter = [];
      this.deletedTestingJoint = [];
      if(this.step3List != null) {
        this.downConductorReport.downConductorReportId = this.step3List.downConductorReportId;
      this.downConductorReport.createdDate = this.step3List.createdDate;  
      this.downConductorReport.createdBy = this.step3List.createdBy;
      this.downConductorReport.userName = this.step3List.userName;
      setTimeout(() => {
        this.populateData(this.step3List.downConductorDescription);
      }, 1000);
      if(this.step3List != null) {
        this.updateMethod();
      }
      this.flag=true;
      }
    //  this.retriveFIleName()
    }

    retrieveDetailsfromSavedReports1(userName: any,basicLpsId: any,clientName: any,data: any){
      //this.service.lvClick=1;
      this.step3List1 = JSON.parse(data);
      this.downConductorReport.basicLpsId = basicLpsId;
      this.deletedBridgingDesc = [];
      this.deletedConnectors = [];
      this.deletedDownCoductors = [];
      this.deletedDownConductorTesting = [];
      this.deletedHolders = [];
      this.deletedLightningCounter = [];
      this.deletedTestingJoint = [];
      this.retrieveFromAirTermination();
      if(this.step3List1 != null) { 
      this.downConductorReport.downConductorReportId = this.step3List1[0].downConductorReportId;
      this.downConductorReport.createdBy = this.step3List1[0].createdBy;
      this.downConductorReport.createdDate = this.step3List1[0].createdDate;
      this.downConductorReport.userName = this.step3List1[0].userName;
      setTimeout(() => {
        this.populateData(this.step3List1[0].downConductorDescription);
      }, 1000);
      this.flag=true;
      }
    }

    populateData(value: any) {
      for (let item of value) {
        this.arr1.push(this.populateDownConductorMain(item));
      }
      this.downConductorForm.setControl('downConductorDescription', this.formBuilder.array(this.arr1 || []));
      this.arr1 = [];
    }

    populateDownConductorMain(item: any) {
      return this.formBuilder.group({
        downConduDescId : new FormControl({disabled: false, value: item.downConduDescId}),
        buildingNumber : new FormControl({disabled: false, value: item.buildingNumber}),
        buildingName: new FormControl({disabled: false, value: item.buildingName}),
        buildingCount: new FormControl({disabled: false, value: item.buildingCount}),
        flag: new FormControl({disabled: false, value: item.flag}),
        biMetallicIssueOb: new FormControl({disabled: false, value: item.biMetallicIssueOb}, Validators.required),
        biMetallicIssueRem: new FormControl({disabled: false, value: item.biMetallicIssueRem}),
        warningNoticeGroundLevelOb: new FormControl({disabled: false, value: item.warningNoticeGroundLevelOb}, Validators.required),
        warningNoticeGroundLevelRem: new FormControl({disabled: false, value: item.warningNoticeGroundLevelRem}),
        insulationPresenceOb: new FormControl({disabled: false, value: item.insulationPresenceOb}, Validators.required),
        insulationPresenceRem: new FormControl({disabled: false, value: item.insulationPresenceRem}),
        noPowerDownConductorOb: new FormControl({disabled: false, value: item.noPowerDownConductorOb}, Validators.required),
        noPowerDownConductorRem: new FormControl({disabled: false, value: item.noPowerDownConductorRem}),
        connectMadeBrazingOb: new FormControl({disabled: false, value: item.connectMadeBrazingOb}, Validators.required),
        connectMadeBrazingRem: new FormControl({disabled: false, value: item.connectMadeBrazingRem}),
        chemicalSprinklerOb: new FormControl({disabled: false, value: item.chemicalSprinklerOb}, Validators.required),
        chemicalSprinklerRem: new FormControl({disabled: false, value: item.chemicalSprinklerRem}),
        cobustMaterialWallOB: new FormControl({disabled: false, value: item.cobustMaterialWallOB}, Validators.required),
        cobustMaterialWallRem: new FormControl({disabled: false, value: item.cobustMaterialWallRem}),
        bridgingDescriptionAvailabilityOb: new FormControl({disabled: false, value: item.bridgingDescriptionAvailabilityOb}, Validators.required),
        bridgingDescriptionAvailabilityRem: new FormControl({disabled: false, value: item.bridgingDescriptionAvailabilityRem}),
        holderAvailabilityOb: new FormControl({disabled: false, value: item.holderAvailabilityOb}, Validators.required),
        holderAvailabilityRem: new FormControl({disabled: false, value: item.holderAvailabilityRem}),
        connectorsAvailabilityOb: new FormControl({disabled: false, value: item.connectorsAvailabilityOb}, Validators.required),
        connectorsAvailabilityRem: new FormControl({disabled: false, value: item.connectorsAvailabilityRem}),
        lightningCounterAvailabilityOb: new FormControl({disabled: false, value: item.lightningCounterAvailabilityOb}, Validators.required),
        lightningCounterAvailabilityRem: new FormControl({disabled: false, value: item.lightningCounterAvailabilityRem}),
        testingJointAvailabilityOb: new FormControl({disabled: false, value: item.testingJointAvailabilityOb}, Validators.required),
        testingJointAvailabilityRem: new FormControl({disabled: false, value: item.testingJointAvailabilityRem}),
        downConductorAvailabilityOb: new FormControl({disabled: false, value: item.downConductorAvailabilityOb}, Validators.required),
        downConductorAvailabilityRem: new FormControl({disabled: false, value: item.downConductorAvailabilityRem}),
        downConductorTestingAvailabilityOb: new FormControl({disabled: false, value: item.downConductorTestingAvailabilityOb}),
        downConductorTestingAvailabilityRem: new FormControl({disabled: false, value: item.downConductorTestingAvailabilityRem}),
  
        downConductor: this.formBuilder.array(this.retrieveDownArrForm(item)),
        bridgingDescription: this.formBuilder.array(this.retrieveBridgeArrForm(item)),
        holder: this.formBuilder.array(this.retrieveHolderArrForm(item)),
        connectors: this.formBuilder.array(this.retrieveConnectorArrForm(item)),
        lightningCounter: this.formBuilder.array(this.retrieveLightArrForm(item)),
        testingJoint: this.formBuilder.array(this.retrieveTestJointsArrForm(item)),
        downConductorTesting: this.formBuilder.array(this.retrieveDownConductorTestingForm(item)),
      });
    }

    retrieveDownArrForm(item:any){
      let retrieveDownArrFormDataArr:any=[];
      if(item.downConductorAvailabilityOb == 'Applicable') {
        for (let value of item.downConductor) {
          retrieveDownArrFormDataArr.push(this.createGroup(value,item.downConduDescId));   
        } 
      }
      else {
        for (let value of item.downConductor) {
          retrieveDownArrFormDataArr.push(this.createGroupNotApplicable(value,item.downConduDescId));   
        } 
      }
      
      return retrieveDownArrFormDataArr;
    }

    createGroup(item: any,downConduDescId: any): FormGroup {
      return this.formBuilder.group({
        downConductorId: new FormControl({disabled: false, value: item.downConductorId}),
        downConduDescId: new FormControl({disabled: false, value: downConduDescId}),
        physicalInspectionOb: new FormControl({disabled: false, value: item.physicalInspectionOb}, Validators.required),
        physicalInspectionRem: new FormControl({disabled: false, value: item.physicalInspectionRem}),
        conductMaterialOb: new FormControl({disabled: false, value: item.conductMaterialOb}, Validators.required),
        conductMaterialRem: new FormControl({disabled: false, value: item.conductMaterialRem}),
        conductSizeOb: new FormControl({disabled: false, value: item.conductSizeOb}),
        conductSizeRem: new FormControl({disabled: false, value: item.conductSizeRem}),
        downConductExposedOb: new FormControl({disabled: false, value: item.downConductExposedOb}, Validators.required),
        downConductExposedRem: new FormControl({disabled: false, value: item.downConductExposedRem}),
        downConductLocationdOb: new FormControl({disabled: false, value: item.downConductLocationdOb}, Validators.required),
        downConductLocationdRem: new FormControl({disabled: false, value: item.downConductLocationdRem}),
        downConductGutterOb: new FormControl({disabled: false, value: item.downConductGutterOb}, Validators.required),
        downConductGutterRem: new FormControl({disabled: false, value: item.downConductGutterRem}),
        installedShaftDownConductorOb: new FormControl({disabled: false, value: item.installedShaftDownConductorOb}, Validators.required),
        installedShaftDownConductorRem: new FormControl({disabled: false, value: item.installedShaftDownConductorRem}),
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
        inspectionFailedNoRem: new FormControl({disabled: false, value: item.inspectionFailedNoRem}),
        averageBendsOb: new FormControl({disabled: false, value: item.averageBendsOb}, Validators.required),
        averageBendsRem: new FormControl({disabled: false, value: item.averageBendsRem}),
        naturalDownCondutTypeOb: new FormControl({disabled: false, value: item.naturalDownCondutTypeOb}),
        naturalDownCondutTypeRem: new FormControl({disabled: false, value: item.naturalDownCondutTypeRem}),
        naturalDownCondDimensionOb: new FormControl({disabled: false, value: item.naturalDownCondDimensionOb}),
        naturalDownCondDimensionRem: new FormControl({disabled: false, value: item.naturalDownCondDimensionRem}),
        flag: new FormControl({disabled: false, value: item.flag}),
      });
    }

    createGroupNotApplicable(item: any,downConduDescId: any): FormGroup {
      return this.formBuilder.group({
        downConductorId: new FormControl({disabled: false, value: item.downConductorId}),
        downConduDescId: new FormControl({disabled: false, value: downConduDescId}),
        physicalInspectionOb: new FormControl({disabled: false, value: item.physicalInspectionOb}),
        physicalInspectionRem: new FormControl({disabled: false, value: item.physicalInspectionRem}),
        conductMaterialOb: new FormControl({disabled: false, value: item.conductMaterialOb}),
        conductMaterialRem: new FormControl({disabled: false, value: item.conductMaterialRem}),
        conductSizeOb: new FormControl({disabled: false, value: item.conductSizeOb}),
        conductSizeRem: new FormControl({disabled: false, value: item.conductSizeRem}),
        downConductExposedOb: new FormControl({disabled: false, value: item.downConductExposedOb}),
        downConductExposedRem: new FormControl({disabled: false, value: item.downConductExposedRem}),
        downConductLocationdOb: new FormControl({disabled: false, value: item.downConductLocationdOb}),
        downConductLocationdRem: new FormControl({disabled: false, value: item.downConductLocationdRem}),
        downConductGutterOb: new FormControl({disabled: false, value: item.downConductGutterOb}),
        downConductGutterRem: new FormControl({disabled: false, value: item.downConductGutterRem}),
        installedShaftDownConductorOb: new FormControl({disabled: false, value: item.installedShaftDownConductorOb}),
        installedShaftDownConductorRem: new FormControl({disabled: false, value: item.installedShaftDownConductorRem}),
        ensureDownCnoductOb: new FormControl({disabled: false, value: item.ensureDownCnoductOb}),
        ensureDownCnoductRem: new FormControl({disabled: false, value: item.ensureDownCnoductRem}),
        installationDownConductOb: new FormControl({disabled: false, value: item.installationDownConductOb}),
        installationDownConductRem: new FormControl({disabled: false, value: item.installationDownConductRem}),
        maximumDownConductOb: new FormControl({disabled: false, value: item.maximumDownConductOb}),
        maximumDownConductRem: new FormControl({disabled: false, value: item.maximumDownConductRem}),
        manimumDownConductOb: new FormControl({disabled: false, value: item.manimumDownConductOb}),
        manimumDownConductRem: new FormControl({disabled: false, value: item.manimumDownConductRem}),
        totalNoDownConductOb: new FormControl({disabled: false, value: item.totalNoDownConductOb}),
        totalNoDownConductRem: new FormControl({disabled: false, value: item.totalNoDownConductRem}),
        inspectedNoOb: new FormControl({disabled: false, value: item.inspectedNoOb}),
        inspectedNoRem: new FormControl({disabled: false, value: item.inspectedNoRem}),
        inspectionPassedNoOb: new FormControl({disabled: false, value: item.inspectionPassedNoOb}),
        inspectionPassedNoRem: new FormControl({disabled: false, value: item.inspectionPassedNoRem}),
        inspectionFailedNoOb: new FormControl({disabled: false, value: item.inspectionFailedNoOb}),
        inspectionFailedNoRem: new FormControl({disabled: false, value: item.inspectionFailedNoRem}),
        averageBendsOb: new FormControl({disabled: false, value: item.averageBendsOb}),
        averageBendsRem: new FormControl({disabled: false, value: item.averageBendsRem}),
        naturalDownCondutTypeOb: new FormControl({disabled: false, value: item.naturalDownCondutTypeOb}),
        naturalDownCondutTypeRem: new FormControl({disabled: false, value: item.naturalDownCondutTypeRem}),
        naturalDownCondDimensionOb: new FormControl({disabled: false, value: item.naturalDownCondDimensionOb}, Validators.required),
        naturalDownCondDimensionRem: new FormControl({disabled: false, value: item.naturalDownCondDimensionRem}),
        flag: new FormControl({disabled: false, value: item.flag}),
      });
    }

    retrieveBridgeArrForm(item:any){
      let retrieveBridgeArrFormDataArr:any=[];
      for (let value of item.bridgingDescription) {
        retrieveBridgeArrFormDataArr.push(this.createGroup1(value,item.downConduDescId));   
      } 
      return retrieveBridgeArrFormDataArr;
    }

    createGroup1(item: any,downConduDescId: any): FormGroup {
      return this.formBuilder.group({
      bridgingDescriptionId: new FormControl({disabled: false, value: item.bridgingDescriptionId}),
      downConduDescId: new FormControl({disabled: false, value: downConduDescId}),
      ensureBridgingCableOb: new FormControl({disabled: false, value: item.ensureBridgingCableOb}, Validators.required),
      ensureBridgingCableRem: new FormControl({disabled: false, value: item.ensureBridgingCableRem}),
      aluminiumConductorSideWallOb: new FormControl({disabled: false, value: item.aluminiumConductorSideWallOb}, Validators.required),
      aluminiumConductorSideWallRem: new FormControl({disabled: false, value: item.aluminiumConductorSideWallRem}),
      bridgingCableConnectionOb: new FormControl({disabled: false, value: item.bridgingCableConnectionOb}, Validators.required),
      bridgingCableConnectionRem: new FormControl({disabled: false, value: item.bridgingCableConnectionRem}),
      bridgingCableMaterialOb: new FormControl({disabled: false, value: item.bridgingCableMaterialOb}, Validators.required),
      bridgingCableMaterialRem: new FormControl({disabled: false, value: item.bridgingCableMaterialRem}),
      bridgingCableSizeOb: new FormControl({disabled: false, value: item.bridgingCableSizeOb}, Validators.required),
      bridgingCableSizeRem: new FormControl({disabled: false, value: item.bridgingCableSizeRem}),
      totalNoBridgingCableOb: new FormControl({disabled: false, value: item.totalNoBridgingCableOb}, Validators.required),
      totalNoBridgingCableRem: new FormControl({disabled: false, value: item.totalNoBridgingCableRem}),
      inspectedNoOb: new FormControl({disabled: false, value: item.inspectedNoOb}, Validators.required),
      inspectedNoRem: new FormControl({disabled: false, value: item.inspectedNoRem}),
      inspectionPassedNoOb: new FormControl({disabled: false, value: item.inspectionPassedNoOb}, Validators.required),
      inspectionPassedNoRem: new FormControl({disabled: false, value: item.inspectionPassedNoRem}),
      inspectionFailedNoOb: new FormControl({disabled: false, value: item.inspectionFailedNoOb}, Validators.required),
      inspectionFailedNoRem: new FormControl({disabled: false, value: item.inspectionFailedNoRem}),
      flag: new FormControl({disabled: false, value: item.flag}),
      });
    }

    retrieveHolderArrForm(item:any){
      let retrieveHolderArrFormDataArr:any=[];
      for (let value of item.holder) {
        retrieveHolderArrFormDataArr.push(this.createGroup2(value,item.downConduDescId));   
      } 
      return retrieveHolderArrFormDataArr;
    }

    createGroup2(item: any,downConduDescId: any): FormGroup {
      return this.formBuilder.group({
      holderId: new FormControl({disabled: false, value: item.holderId}),
      downConduDescId: new FormControl({disabled: false, value: downConduDescId}),
      physicalInspectionOb: new FormControl({disabled: false, value: item.physicalInspectionOb}, Validators.required),
      physicalInspectionRem: new FormControl({disabled: false, value: item.physicalInspectionRem}),
      conductHolderFlatSurfaceOb: new FormControl({disabled: false, value: item.conductHolderFlatSurfaceOb}, Validators.required),
      conductHolderFlatSurfaceRem: new FormControl({disabled: false, value: item.conductHolderFlatSurfaceRem}),
      conductorHoldedOb: new FormControl({disabled: false, value: item.conductorHoldedOb}, Validators.required),
      conductorHoldedRem: new FormControl({disabled: false, value: item.conductorHoldedRem}),
      successiveDistanceOb: new FormControl({disabled: false, value: item.successiveDistanceOb}, Validators.required),
      successiveDistanceRem: new FormControl({disabled: false, value: item.successiveDistanceRem}),
      materialHolderOb: new FormControl({disabled: false, value: item.materialHolderOb}, Validators.required),
      materialHolderRem: new FormControl({disabled: false, value: item.materialHolderRem}),
      totalNoHolderOb: new FormControl({disabled: false, value: item.totalNoHolderOb}, Validators.required),
      totalNoHolderRem: new FormControl({disabled: false, value: item.totalNoHolderRem}),
      inspectedNoOb: new FormControl({disabled: false, value: item.inspectedNoOb}, Validators.required),
      inspectedNoRem: new FormControl({disabled: false, value: item.inspectedNoRem}),
      inspectionPassedNoOb: new FormControl({disabled: false, value: item.inspectionPassedNoOb}, Validators.required),
      inspectionPassedNoRem: new FormControl({disabled: false, value: item.inspectionPassedNoRem}),
      inspectionFailedNoOb: new FormControl({disabled: false, value: item.inspectionFailedNoOb}, Validators.required),
      inspectionFailedNoRem: new FormControl({disabled: false, value: item.inspectionFailedNoRem}),
      flag: new FormControl({disabled: false, value: item.flag}),
      });
    }

    retrieveConnectorArrForm(item:any){
      let retrieveConnectorFormDataArr:any=[];
      for (let value of item.connectors) {
        retrieveConnectorFormDataArr.push(this.createGroup3(value,item.downConduDescId));   
      } 
      return retrieveConnectorFormDataArr;
    }

    createGroup3(item: any,downConduDescId: any): FormGroup {
      return this.formBuilder.group({
      connectorId: new FormControl({disabled: false, value: item.connectorId}),
      downConduDescId: new FormControl({disabled: false, value: downConduDescId}),
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
      inspectionFailedNoRem: new FormControl({disabled: false, value: item.inspectionFailedNoRem}),
      flag: new FormControl({disabled: false, value: item.flag}),
      });
    }

    retrieveLightArrForm(item:any){
      let retrieveLightArrFormDataArr:any=[];
      for (let value of item.lightningCounter) {
        retrieveLightArrFormDataArr.push(this.createGroup4(value,item.downConduDescId));   
      } 
      return retrieveLightArrFormDataArr;
    }

    createGroup4(item: any,downConduDescId: any): FormGroup {
      return this.formBuilder.group({
      lightingCountersId: new FormControl({disabled: false, value: item.lightingCountersId}),
      downConduDescId: new FormControl({disabled: false, value: downConduDescId}),
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
      inspectionFailedNoRem: new FormControl({disabled: false, value: item.inspectionFailedNoRem}),
      flag: new FormControl({disabled: false, value: item.flag}),
      });
    }

    retrieveTestJointsArrForm(item:any){
      let retrieveTestJointsFormDataArr:any=[];
      for (let value of item.testingJoint) {
        retrieveTestJointsFormDataArr.push(this.createGroup5(value,item.downConduDescId));   
      } 
      return retrieveTestJointsFormDataArr;
    }

    createGroup5(item: any,downConduDescId: any): FormGroup {
      return this.formBuilder.group({
      testJointId: new FormControl({disabled: false, value: item.testJointId}),
      downConduDescId: new FormControl({disabled: false, value: downConduDescId}),
      //testJointTypeOb: new FormControl({disabled: false, value: item.testJointTypeOb}, Validators.required),
      //testJointTypeRem: new FormControl({disabled: false, value: item.testJointTypeRem}),
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
      touchingConductorsOb: new FormControl({disabled: false, value: item.touchingConductorsOb}, Validators.required),
      touchingConductorsRem: new FormControl({disabled: false, value: item.touchingConductorsRem}),
      totalNoOfTestJointOB: new FormControl({disabled: false, value: item.totalNoOfTestJointOB}, Validators.required),
      totalNoOfTestJointRem: new FormControl({disabled: false, value: item.totalNoOfTestJointRem}),
      inspectedNoOb: new FormControl({disabled: false, value: item.inspectedNoOb}, Validators.required),
      inspectedNoRem: new FormControl({disabled: false, value: item.inspectedNoRem}),
      inspectionPassedNoOb: new FormControl({disabled: false, value: item.inspectionPassedNoOb}, Validators.required),
      inspectionPassedNoRem: new FormControl({disabled: false, value: item.inspectionPassedNoRem}),
      inspectionFailedNoOb: new FormControl({disabled: false, value: item.inspectionFailedNoOb}, Validators.required),
      inspectionFailedNoRem: new FormControl({disabled: false, value: item.inspectionFailedNoRem}),
      flag: new FormControl({disabled: false, value: item.flag}),   
      });
    }

    retrieveDownConductorTestingForm(item:any){
      
      let retrieveDownConductorTestingFormDataArr:any=[];
      if(this.availabilityOfPreviousReport =="No"){
        for (let value of item.downConductorTesting) {
          retrieveDownConductorTestingFormDataArr.push(this.createGroup6(value,item.downConduDescId));   
        } 
      }
      return retrieveDownConductorTestingFormDataArr;
    }

    createGroup6(item: any,downConduDescId: any): FormGroup {
      return this.formBuilder.group({
        downConductorTestingId: new FormControl({disabled: false, value: item.downConductorTestingId}),
        downConduDescId: new FormControl({disabled: false, value: downConduDescId}),
        serialNo: new FormControl({disabled: false, value: item.serialNo}, Validators.required),
        reference: new FormControl({disabled: false, value: item.reference}, Validators.required),
        length: new FormControl({disabled: false, value: item.length}, Validators.required),
        resistance: new FormControl({disabled: false, value: item.resistance}, Validators.required),
        remarks: new FormControl({disabled: false, value: item.remarks}, Validators.required),
        flag: new FormControl({disabled: false, value: item.flag}),
      });
    }

    addDownTesting(a: any) {
      let downConductorTestingArr = a.controls.downConductorTesting as FormArray;
      downConductorTestingArr.push(this.createDownConductorTestingForm());
    }

    removeDownTesting(a: any,i: any) {
      let downConductorTestingArr = a.controls.downConductorTesting as FormArray;
      if(this.flag && downConductorTestingArr.value[i].downConductorTestingId !=null && downConductorTestingArr.value[i].downConductorTestingId !='' && downConductorTestingArr.value[i].downConductorTestingId !=undefined){
        downConductorTestingArr.value[i].flag ='R';
        this.deletedDownConductorTesting.push(downConductorTestingArr.value[i]);
      }
      downConductorTestingArr.removeAt(i);
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
      return form.controls.testingJoint?.controls;
    }

    downConductorTestingControls(form:any){
      return form.controls.downConductorTesting?.controls;
    }

    get f() {
      return this.downConductorForm.controls;
    }

    onChangeDownCon(event: any,a:any) {
      this.downConductorForm.markAsTouched();
      let changedValue;
      if(event.target != undefined) {
        changedValue = event.target.value;
      }
      else{
        changedValue = event;
      }
      let downConductorArray: any = [];
      downConductorArray =  a.controls.downConductor as FormArray;

      if(changedValue == 'Applicable') {
        for(let i=0;i<this.downConductorNames.length;i++) {
          downConductorArray.controls[0].controls[this.downConductorNames[i]].setValidators([Validators.required]);
          downConductorArray.controls[0].controls[this.downConductorNames[i]].updateValueAndValidity();
        }
        downConductorArray.controls[0].controls.naturalDownCondutTypeOb.setValue('');
        downConductorArray.controls[0].controls.naturalDownCondutTypeRem.setValue('');

        downConductorArray.controls[0].controls.naturalDownCondDimensionOb.clearValidators();
        downConductorArray.controls[0].controls.naturalDownCondDimensionOb.updateValueAndValidity();
        downConductorArray.controls[0].controls.naturalDownCondDimensionOb.setValue('');
        downConductorArray.controls[0].controls.naturalDownCondDimensionRem.setValue('');
      }
      else if(changedValue == 'Not applicable in case of natural down conductors') {
        downConductorArray.controls[0].controls.naturalDownCondDimensionOb.setValidators([Validators.required]);
        downConductorArray.controls[0].controls.naturalDownCondDimensionOb.updateValueAndValidity('');

        for(let i=0;i<this.downConductorNames.length;i++) {
          downConductorArray.controls[0].controls[this.downConductorNames[i]].clearValidators();
          downConductorArray.controls[0].controls[this.downConductorNames[i]].updateValueAndValidity();
          downConductorArray.controls[0].controls[this.downConductorNames[i]].setValue('');
        }
        for(let j=0;j<this.downConductorNamesRem.length;j++) {
          downConductorArray.controls[0].controls[this.downConductorNamesRem[j]].setValue('');
        }
        downConductorArray.controls[0].controls.conductSizeOb.setValue('');
        downConductorArray.controls[0].controls.conductSizeRem.setValue('');
      }
      this.downConductorForm.markAsDirty();
    }

    onChangeCables(event: any,a:any) {
      this.downConductorForm.markAsTouched();
      let changedValue;
      if(event.target != undefined) {
        changedValue = event.target.value;
      }
      else{
        changedValue = event;
      }
      let cablesArray: any = [];
      cablesArray =  a.controls.bridgingDescription as FormArray;
      if (changedValue == 'Not applicable') {
        if(cablesArray.length>0) {
          if(this.flag && cablesArray.value[0].bridgingDescriptionId !=null && cablesArray.value[0].bridgingDescriptionId !='' && cablesArray.value[0].bridgingDescriptionId !=undefined){
            cablesArray.value[0].flag ='R';
            this.deletedBridgingDesc.push(cablesArray.value[0]);
          }
          cablesArray.removeAt(cablesArray.length-1)    
        }
      }
      else if(changedValue == 'Applicable'){
        if(cablesArray.length == 0) {
          cablesArray.push(this.createBridgeArrForm());
        }
      }

      this.downConductorForm.markAsDirty();
    }
    onChangeHolders(event: any,a:any) {
      this.downConductorForm.markAsTouched();
      let changedValue;
      if(event.target != undefined) {
        changedValue = event.target.value;
      }
      else{
        changedValue = event;
      }
      let holdersArray: any = [];
      holdersArray =  a.controls.holder as FormArray;
      if (changedValue == 'Not applicable') {
        if(holdersArray.length>0) {
          if(this.flag && holdersArray.value[0].holderId !=null && holdersArray.value[0].holderId !='' && holdersArray.value[0].holderId !=undefined){
            holdersArray.value[0].flag ='R';
            this.deletedHolders.push(holdersArray.value[0]);
          }
          holdersArray.removeAt(holdersArray.length-1)    
        }
      }
      else if(changedValue == 'Applicable'){
        if(holdersArray.length == 0) {
          holdersArray.push(this.createHolderArrForm());
        }
      }

      this.downConductorForm.markAsDirty();  
    }
    onChangeConnectors(event: any,a:any) {
      this.downConductorForm.markAsTouched();
      let changedValue;
      if(event.target != undefined) {
        changedValue = event.target.value;
      }
      else{
        changedValue = event;
      }
      let connectorsArray: any = [];
      connectorsArray =  a.controls.connectors as FormArray;
      if (changedValue == 'Not applicable') {
        if(connectorsArray.length>0) {
          if(this.flag && connectorsArray.value[0].connectorId !=null && connectorsArray.value[0].connectorId !='' && connectorsArray.value[0].connectorId !=undefined){
            connectorsArray.value[0].flag ='R';
            this.deletedConnectors.push(connectorsArray.value[0]);
          }
          connectorsArray.removeAt(connectorsArray.length-1)    
        }
      }
      else if(changedValue == 'Applicable'){
        if(connectorsArray.length == 0) {
          connectorsArray.push(this.createHolderArrForm());
        }
      }

      this.downConductorForm.markAsDirty();
    }
    onChangeCounters(event: any,a:any) {
      this.downConductorForm.markAsTouched();
      let changedValue;
      if(event.target != undefined) {
        changedValue = event.target.value;
      }
      else{
        changedValue = event;
      }
      let lightningCounterArray: any = [];
      lightningCounterArray =  a.controls.lightningCounter as FormArray;
      if (changedValue == 'Not applicable') {
        if(lightningCounterArray.length>0) {
          if(this.flag && lightningCounterArray.value[0].lightingCountersId !=null && lightningCounterArray.value[0].lightingCountersId !='' && lightningCounterArray.value[0].lightingCountersId !=undefined){
            lightningCounterArray.value[0].flag ='R';
            this.deletedLightningCounter.push(lightningCounterArray.value[0]);
          }
          lightningCounterArray.removeAt(lightningCounterArray.length-1)    
        }
        a.controls.lightningCounterAvailabilityRem.setValue('As per latest standard IS/IEC 62305,installation of single lightning counter for whole building is mandatory');
      }
      else if(changedValue == 'Applicable'){
        if(lightningCounterArray.length == 0) {
          lightningCounterArray.push(this.createLightArrForm());
        }
        a.controls.lightningCounterAvailabilityRem.setValue('');
      }

      this.downConductorForm.markAsDirty();
    }
    onChangeJoints(event: any,a:any) {
      this.downConductorForm.markAsTouched();
      let changedValue;
      if(event.target != undefined) {
        changedValue = event.target.value;
      }
      else{
        changedValue = event;
      }
      let testingJointArray: any = [];
      testingJointArray =  a.controls.testingJoint as FormArray;
      if (changedValue == 'Not available') {
        if(testingJointArray.length>0) {
          if(this.flag && testingJointArray.value[0].testJointId !=null && testingJointArray.value[0].testJointId !='' && testingJointArray.value[0].testJointId !=undefined){
            testingJointArray.value[0].flag ='R';
            this.deletedTestingJoint.push(testingJointArray.value[0]);
          }
          testingJointArray.removeAt(testingJointArray.length-1)    
        }
        a.controls.testingJointAvailabilityRem.setValue('As per latest standard IS/IEC62305, installation of test joint at each down conductor is mandatory for the purpose of testing of down conductors and earth electrode as well');
      }
      else if(changedValue == 'Available'){
        if(testingJointArray.length == 0) {
          testingJointArray.push(this.createTestJointsArrForm());
        }
        a.controls.testingJointAvailabilityRem.setValue('');
      }

      this.downConductorForm.markAsDirty();
    }

  onChangeDownConductorTesting(event: any, a: any) {
    this.downConductorForm.markAsTouched();
    let changedValue;
    if (event.target != undefined) {
      changedValue = event.target.value;
    }
    else {
      changedValue = event;
    }
    let downConductorTestingArray: any = [];
    downConductorTestingArray = a.controls.downConductorTesting as FormArray;
    if (changedValue == 'Not in Scope') {

      a.controls.downConductorTestingAvailabilityOb.clearValidators();
      a.controls.downConductorTestingAvailabilityOb.updateValueAndValidity();

      if (downConductorTestingArray.length > 0) {
        let length = downConductorTestingArray.length
        for (let i = 0; i < length; i++) {
          let z = downConductorTestingArray.length - 1
          if (this.flag && downConductorTestingArray.value[z].downConductorTestingId != null && downConductorTestingArray.value[z].downConductorTestingId != '' && downConductorTestingArray.value[z].downConductorTestingId != undefined) {
            downConductorTestingArray.value[z].flag = 'R';
            this.deletedDownConductorTesting.push(downConductorTestingArray.value[z]);
          }
          downConductorTestingArray.removeAt(z);
        }
      }
    }
    else if (changedValue == 'In Scope') {

      a.controls.downConductorTestingAvailabilityOb.setValidators(Validators.required);
      a.controls.downConductorTestingAvailabilityOb.updateValueAndValidity();

      if (downConductorTestingArray.length == 0) {
        downConductorTestingArray.push(this.createDownConductorTestingForm());
      }
    }

    else if (changedValue == '') {
      a.controls.downConductorTestingAvailabilityOb.setValidators(Validators.required);
      a.controls.downConductorTestingAvailabilityOb.updateValueAndValidity();
    }

    this.downConductorForm.markAsDirty();
  }

  validationTesting(){
    
    this.downConductorForm.markAsTouched();
    let arr: any = [];
    arr = this.downConductorForm.get('downConductorDescription') as FormArray;
    if(this.availabilityOfPreviousReport == 'No'){
      for(let j=0; j<this.downConductorForm.controls.downConductorDescription.value.length; j++){
        arr.controls[0].controls.downConductorTestingAvailabilityOb.setValidators(Validators.required);
        arr.controls[0].controls.downConductorTestingAvailabilityOb.updateValueAndValidity();
      }
    }
  }
  onChange1(event: any) {
    this.file = event.target.files;
    if (this.file != null) {
      this.uploadDisable1 = false;
    }
  }

  onChange(event: any) {
    this.file = event.target.files;
    if (this.file != null) {
      this.uploadDisable = false;
    }
  }

    validationChangeBasicDown(event: any,q: any,formControl: any) {

      if(event.target.value == 'Distance<1m') {
        q.controls[formControl].setValidators([Validators.required]);
        q.controls[formControl].updateValueAndValidity();
      }
      else if(event.target.value == 'Yes') {
        q.controls[formControl].setValidators([Validators.required]);
        q.controls[formControl].updateValueAndValidity();
      }
      else {
        q.controls[formControl].clearValidators();
        q.controls[formControl].updateValueAndValidity();
      }
    }

    validationChangeDownConductor(event: any,q: any,formControl: any) {
      let arr: any = [];
      arr = q.controls.downConductor as FormArray;
      if(event.target.value == 'Not good') {
        arr.controls[0].controls[formControl].setValidators([Validators.required]);
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
      else if(event.target.value == 'Not achieved') {
        arr.controls[0].controls[formControl].setValidators([Validators.required]);
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
      else if(event.target.value == 'Yes') {
        arr.controls[0].controls[formControl].setValidators([Validators.required]);
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
      else {
        arr.controls[0].controls[formControl].clearValidators();
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
    }

    validationChangeDownConductorNo(event: any,q: any,formControl: any) {  
      let arr: any = [];
      arr = q.controls.downConductor as FormArray;
      if(event.target.value == 'No') {
        arr.controls[0].controls[formControl].setValidators([Validators.required]);
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
      else {
        arr.controls[0].controls[formControl].clearValidators();
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
    }

    validationChangeDownConductorKey(event: any,q: any,formControl: any) {  
      let arr: any = [];
        arr = q.controls.downConductor as FormArray;
        if(event.target.value != '' && event.target.value != 0) {
          arr.controls[0].controls[formControl].setValidators([Validators.required]);
          arr.controls[0].controls[formControl].updateValueAndValidity();
        }
        else {
          arr.controls[0].controls[formControl].clearValidators();
          arr.controls[0].controls[formControl].updateValueAndValidity();
        }
    }

    validationChangeDownBridgeNo(event: any,q: any,formControl: any) {  
      let arr: any = [];
      arr = q.controls.bridgingDescription as FormArray;
      if(event.target.value == 'No') {
        arr.controls[0].controls[formControl].setValidators([Validators.required]);
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
      else {
        arr.controls[0].controls[formControl].clearValidators();
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
    }

    validationChangeDownBridge(event: any,q: any,formControl: any) {
      let arr: any = [];
      arr = q.controls.bridgingDescription as FormArray;
      if(event.target.value == 'Not good') {
        arr.controls[0].controls[formControl].setValidators([Validators.required]);
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
      else if(event.target.value == 'Yes') {
        arr.controls[0].controls[formControl].setValidators([Validators.required]);
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
      else {
        arr.controls[0].controls[formControl].clearValidators();
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
    }
    
    validationChangeDownBridgeKey(event: any,q: any,formControl: any) {  
      let arr: any = [];
        arr = q.controls.bridgingDescription as FormArray;
        if(event.target.value != '' && event.target.value != 0) {
          arr.controls[0].controls[formControl].setValidators([Validators.required]);
          arr.controls[0].controls[formControl].updateValueAndValidity();
        }
        else {
          arr.controls[0].controls[formControl].clearValidators();
          arr.controls[0].controls[formControl].updateValueAndValidity();
        }
    }


    validationChangeDownHolders(event: any,q: any,formControl: any) {
      let arr: any = [];
      arr = q.controls.holder as FormArray;
      if(event.target.value == 'Not good') {
        arr.controls[0].controls[formControl].setValidators([Validators.required]);
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
      else if(event.target.value == 'No') {
        arr.controls[0].controls[formControl].setValidators([Validators.required]);
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
      else {
        arr.controls[0].controls[formControl].clearValidators();
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
    }
    
    validationChangeDownHoldersKey(event: any,q: any,formControl: any) {  
      let arr: any = [];
        arr = q.controls.holder as FormArray;
        if(event.target.value != '' && event.target.value != 0) {
          arr.controls[0].controls[formControl].setValidators([Validators.required]);
          arr.controls[0].controls[formControl].updateValueAndValidity();
        }
        else {
          arr.controls[0].controls[formControl].clearValidators();
          arr.controls[0].controls[formControl].updateValueAndValidity();
        }
    }

    validationChangeDownConnectors(event: any,q: any,formControl: any) {
      let arr: any = [];
      arr = q.controls.connectors as FormArray;
      if(event.target.value == 'Not good') {
        arr.controls[0].controls[formControl].setValidators([Validators.required]);
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
      else {
        arr.controls[0].controls[formControl].clearValidators();
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
    }
    
    validationChangeDownConnectorsKey(event: any,q: any,formControl: any) {  
      let arr: any = [];
        arr = q.controls.connectors as FormArray;
        if(event.target.value != '' && event.target.value != 0) {
          arr.controls[0].controls[formControl].setValidators([Validators.required]);
          arr.controls[0].controls[formControl].updateValueAndValidity();
        }
        else {
          arr.controls[0].controls[formControl].clearValidators();
          arr.controls[0].controls[formControl].updateValueAndValidity();
        }
    }

    validationChangeDownLightning(event: any,q: any,formControl: any) {
      let arr: any = [];
      arr = q.controls.lightningCounter as FormArray;
      if(event.target.value == 'Not good') {
        arr.controls[0].controls[formControl].setValidators([Validators.required]);
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
      else if(event.target.value == 'No') {
        arr.controls[0].controls[formControl].setValidators([Validators.required]);
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
      else {
        arr.controls[0].controls[formControl].clearValidators();
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
    }
    
    validationChangeDownLightningKey(event: any,q: any,formControl: any) {  
      let arr: any = [];
        arr = q.controls.lightningCounter as FormArray;
        if(event.target.value != '' && event.target.value != 0) {
          arr.controls[0].controls[formControl].setValidators([Validators.required]);
          arr.controls[0].controls[formControl].updateValueAndValidity();
        }
        else {
          arr.controls[0].controls[formControl].clearValidators();
          arr.controls[0].controls[formControl].updateValueAndValidity();
        }
    }

    validationChangeDownTestJoint(event: any,q: any,formControl: any) {
      let arr: any = [];
      arr = q.controls.testingJoint as FormArray;
      if(event.target.value == 'No') {
        arr.controls[0].controls[formControl].setValidators([Validators.required]);
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
      else {
        arr.controls[0].controls[formControl].clearValidators();
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
    }
    validationChangeDownTestJointKey(event: any,q: any,formControl: any) {  
      let arr: any = [];
        arr = q.controls.testingJoint as FormArray;
        if(event.target.value != '' && event.target.value != 0) {
          arr.controls[0].controls[formControl].setValidators([Validators.required]);
          arr.controls[0].controls[formControl].updateValueAndValidity();
        }
        else {
          arr.controls[0].controls[formControl].clearValidators();
          arr.controls[0].controls[formControl].updateValueAndValidity();
        }
    }

    populateValueForTestRemarks(e: any,a: any) {
      if(e.target.value == 'Not touched') {
        a.controls.touchingConductorsRem.setValue('To avoid bimetallic corrosion 2 disssimilar metals should not touch each other');
      }
      else {
        a.controls.touchingConductorsRem.setValue('');  
      }
    }

    populateDownConductorTesting(e: any,a: any) {
      if(e.target.value > 0.2) {
        a.controls.remarks.setValue('As per latest standard IS/IEC 62305 the value should be less than 0.2Ω');
      }
      else {
        a.controls.remarks.setValue('');  
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

      else if (this.basicLpsId == 0) {
        this.validationError = true;
        this.validationErrorMsg = 'Basics Form is Required, Please fill';
        setTimeout(() => {
          this.validationError = false;
        }, 3000);
        return;
      }

      else if(this.downConductorForm.value.downConductorDescription[0].buildingNumber == undefined || this.downConductorForm.value.downConductorDescription[0].buildingNumber == ''){
        this.validationError = true;
        this.validationErrorMsg = 'Air Termination Form is Required, Please fill';
        setTimeout(() => {
          this.validationError = false;
        }, 3000);
        return;
      }
        //  Update and Success msg will be showing
      else if(this.downConductorForm.dirty && this.downConductorForm.touched){
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
          let dwonconductor=JSON.parse(data)[0];
          if(dwonconductor!=undefined && dwonconductor.basicLpsId !=null){
          this.retrieveDetailsfromSavedReports1(this.downConductorReport.userName,this.basicLpsId,this.ClientName,data);
          }
        },
        error=>{
        }
      );  
    }

    // dosomethingRetriveDownConductor(userName:any,basicLpsId:any){
    //   this.lpsDownconductorService.retrieveDownConductor(userName,basicLpsId).subscribe(
    //     data => {
    //       this.retrieveDetailsfromSavedReports1(userName,basicLpsId,'',data);
    //     },
    //     error=>{
    //       this.ngOnInit();
    //     }
    //   );  
    // }

  onSubmit(flag: any) {
    this.submitted = true;
    if (this.downConductorForm.invalid && (this.downConductorForm.value.downConductorDescription[0].buildingNumber != undefined || this.downConductorForm.value.downConductorDescription[0].buildingNumber != '')) {
      return;
    }
    
    this.downConductorReport.userName = this.router.snapshot.paramMap.get('email') || '{}';
    this.downConductorReport.basicLpsId = this.basicLpsId;
    this.downConductorReport.downConductorDescription = this.downConductorForm.value.downConductorDescription;
    
    
    if (!this.validationError) {
      if(flag) {
        if(this.downConductorForm.dirty && this.downConductorForm.touched){ 
        
        //Bridging Desc
        for(let i of this.deletedBridgingDesc) {
          for(let j of this.downConductorReport.downConductorDescription) {
            if(i.downConduDescId == j.downConduDescId) {
              j.bridgingDescription.push(i);
            }
          }
        }
        
        //Connectors
        for(let i of this.deletedConnectors) {
          for(let j of this.downConductorReport.downConductorDescription) {
            if(i.downConduDescId == j.downConduDescId) {
              j.connectors.push(i);
            }
          }
        }

        //Holders
        for(let i of this.deletedHolders) {
          for(let j of this.downConductorReport.downConductorDescription) {
            if(i.downConduDescId == j.downConduDescId) {
              j.holder.push(i);
            }
          }
        }

        //Lightning Counter
        for(let i of this.deletedLightningCounter) {
          for(let j of this.downConductorReport.downConductorDescription) {
            if(i.downConduDescId == j.downConduDescId) {
              j.lightningCounter.push(i);
            }
          }
        }

        //Testing Joint
        for(let i of this.deletedTestingJoint) {
          for(let j of this.downConductorReport.downConductorDescription) {
            if(i.downConduDescId == j.downConduDescId) {
              j.testingJoint.push(i);
            }
          }
        }

        //Down Conductors
        for(let i of this.deletedDownCoductors) {
          for(let j of this.downConductorReport.downConductorDescription) {
            if(i.downConduDescId == j.downConduDescId) {
              j.downConductor.push(i);
            }
          }
        }

        //Down Conductor Testing
        for(let i of this.deletedDownConductorTesting) {
          for(let j of this.downConductorReport.downConductorDescription) {
            if(i.downConduDescId == j.downConduDescId) {
              j.downConductorTesting.push(i);
            }
          }
        }

        this.lpsDownconductorService.updateDownConductor(this.downConductorReport).subscribe(
          (data) => {
            
            this.success = true;
            this.successMsg = data;
            this.downConductorForm.markAsPristine();
            this.service.lvClick=0;
            this.service.logoutClick=0;
            this.service.windowTabClick=0;
            this.retriveDownConductor();
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
        this.lpsDownconductorService.saveDownConductors(this.downConductorReport).subscribe(
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

  gotoNextTab() {
    if ((this.downConductorForm.dirty && this.downConductorForm.invalid) || this.service.isCompleted2 == false) {
      this.service.isCompleted3 = false;
      this.service.isLinear = true;
      this.service.editable = false;
      this.validationErrorTab = true;
      this.validationErrorMsgTab = 'Please check all the fields in DownConductorForm';
      setTimeout(() => {
        this.validationErrorTab = false;
      }, 3000);
      return;
    }
    else if (this.downConductorForm.dirty && this.downConductorForm.touched) {
      this.service.isCompleted3 = false;
      this.service.isLinear = true;
      this.service.editable = false;
      this.tabError = true;
      this.tabErrorMsg = 'Kindly click on next button to update the changes!';
      setTimeout(() => {
        this.tabError = false;
      }, 3000);
    }
    else {
      this.service.isCompleted3 = true;
      this.service.isLinear = false;
      this.service.editable = true;
    }
  }

  reloadFromBack(){
    if(this.downConductorForm.invalid){
     this.service.isCompleted3= false;
     this.service.isLinear=true;
     this.service.editable=false;
     this.validationErrorTab = true;
     this.validationErrorMsgTab= 'Please check all the fields in DownConductorForm';
     setTimeout(() => {
       this.validationErrorTab = false;
     }, 3000);
     return false;
    }
    else if(this.downConductorForm.dirty && this.downConductorForm.touched){
      this.service.isCompleted3= false;
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
      this.service.isCompleted3= true;
      this.service.isLinear=false;
      this.service.editable=true;
      this.downConductorForm.markAsPristine();
   return true;
    }
  }

  closeModalDialogFile() {
    this.modalService.dismissAll();
  }

}

