import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { flag, save } from 'ngx-bootstrap-icons';
import { ConfirmationBoxComponent } from 'src/app/confirmation-box/confirmation-box.component';
import { GlobalsService } from 'src/app/globals.service';
// import { LpsSummaryConst } from 'src/app/LPS_constants/lps-summary-const';
import { LpsSummary, SummaryLpsObservation } from 'src/app/LPS_model/lps-summary';
import { AirterminationService } from 'src/app/LPS_services/airtermination.service';
import { FinalPdfServiceService } from 'src/app/LPS_services/final-pdf-service.service';
import { SummaryServiceService } from 'src/app/LPS_services/summary-service.service';

import { SuperAdminDev } from 'src/environments/environment.dev';
import { SuperAdminProd } from 'src/environments/environment.prod';
import { SignatureComponent } from 'src/app/signature/signature.component';
import { MatDialogRef} from '@angular/material/dialog';
import { LpsGlobalserviceService } from '../lps-globalservice.service';

@Component({
  selector: 'app-lpssummary',
  templateUrl: './lpssummary.component.html',
  styleUrls: ['./lpssummary.component.css']
})
export class LpssummaryComponent implements OnInit {
    panelOpenState = false;
    summaryForm!: FormGroup;
    summaryLpsBuildings!: FormArray;
    submitted=false;
    summaryArr: any=[];
    lpsSummary=new LpsSummary();
    lpsSummaryPDF: String="LpsSummary";
    email: String = '';
    flag: boolean=true;
    flag1: boolean = false;
    basicLpsId!: number;
    airTerminationValues: any=[];
    airTerminationDesc: any=[];
    summaryLpsBuildingsArr: any=[];
    Declaration1FormArr: any=[];
    Declaration2FormArr: any=[];
    //air termination
    airTerminationData: any=[];
    airTerminationArr: any=[];
    airClampsArr: any=[];
    airVerticalArr: any=[];
    airMeshArr: any=[];
    airHolderArr: any=[];
    airExpansionArr: any=[];
    airConnectorsArr: any=[];
    airVerticalListArr: any=[];
    airHolderListArr: any=[];
    //down conductors
    downConductorData: any=[];
    downConductorsArr: any=[];
    downConductorsBasicArr: any=[];
    bridgingDescArr: any=[];
    downHoldersArr: any=[];
    downConnectorsArr: any=[];
    testingJointArr: any=[];
    lightingCounterArr: any=[];
    downConductorTestingArr: any=[];
    //earthing
    earthingData: any=[];
    earthingReportArr: any=[];
    earthingDescArr: any=[];
    earthingDescriptionListArr: any=[];
    earthingClampsArr: any;
    earthingElectrodeChamberArr: any=[];
    earthingSystemArr: any=[];
    earthElectrodeTestingArr: any=[];
    //spd
    spdReportData: any=[];
    spdReportArr: any=[];
    spdListArr: any=[];
    //separation dist
    separationDistanceArr: any=[];
    separationDistanceData: any=[];
    separateDistanceArr: any=[];
    separationDistanceDownArr: any=[];
    //equipotential bonding
    equiBondingData: any=[];
    equiBondingArr:  any=[];
    jsonData: any=[];
    arr: any=[];
    arr1: any=[];
    arr2: any=[];
    numberOfBuildingCount: any=[];
    validationError: boolean = false;
    validationErrorMsg: String = '';
    errorArr: any=[];
    successMsg: string="";
    errorMsg: string="";
    success: boolean=false;
    Error: boolean=false;
    @Output() proceedNext = new EventEmitter<any>();
    @Output() navigateStepSummary: EventEmitter<any> = new EventEmitter();

    isEditable!:boolean;
    submittedButton: boolean = true;
    saveButton: boolean = false;
    buttonType:  string="";
    //For super admin purpose
    //lpsSummaryConstLocal = new SuperAdminLocal();
    lpsSummaryConst = new SuperAdminDev();
    lpsSummaryConstProd = new SuperAdminProd();
    //air termination
    earthingReportCount:number=0;
    earthingDescriptionCount:number=0;
    earthingClampsCount:number=0;
    earthingDescriptionListCount:number=0;
    earthingElectrodeChamberCount:number=0;
    earthingSystemCount:number=0;
    earthElectrodeTestingCount:number=0;
    spdReportCount:number=0;
    spdDescriptionCount:number=0;
    separationDistanceCount:number=0;
    separateDistanceCount:number=0;
    separationDistanceDownCount:number=0;
    earthStudDescriptionCount:number=0;


    airBasicName: string[] = [
      'consultantNameRemarks',
      'architectNameRemarks',
      'designDateRemarks',
      'approvedByRemarks',
      'dateOfApprovalRem',
      'drawingRemarks',
      'revisionNoRemarks',
      'deviationRemarks',
      'deviationInstallationRemarks',
      'companyNameRemarks',
      'connectionMadeBraRe',
      'electricalEquipPlacedRe',
      'combustablePartRe',
      'terminationMeshConductorRe',
      'bondingEquipotentialRe',
    ];
    airVerticalName: string[] = [
      'physicalInspectionRe',
      'totalNumberRe',
      'inspNoRe',
      'inspPassedNoRe',
      'inspFaileddNoRe',

    ];
    airVerticalListName: string[] = [
      'materialOfTerminalRe',
      'sizeOfTerminalRe',
      'heightOfTerminalRe',
      'angleProtectionHeightRe',
      'installationTerminationsystemRem',
      'supportFlatSurfaceRe',
      'heightFlatSurfaceRe',
    ];
    airClampsName: string[] = [
      'physicalInspectionRe',
      'conductorClampsFlatSurafaceRe',
      'interConnectionOfClampsRe',
      'clampTypRe',
      'materialOfWallClampsRe',
      'materialOfFoldingClampsRe',
      'totalClampsNoRe',
      'inspectionNoRe',
      'inspectionPassedRe',
      'inspectionFailedReRe'
    ];
    airConnectorsName: string[] = [
      'physicalInspectionRe',
      'checkConnectionConnectorsRe',
      'materialOfConnectorRe',
      'strightConnectorRe',
      'tConnectorRe',
      'lConnectorRe',
      'totalNoConnectorRe',
      'inspectionNoRe',
      'inspectionPassedNoRe',
      'inspectionFailedRe'
    ];
    airExpansionName: string[] = [
      'physicalInspectionRe',
      'strightConnectorPiecRe',
      'materialOfConnectorRe',
      'materialOfExpansionRe',
      'intervalBwExpansionRe',
      'totalNoExpansionRe',
      'inspectionNoRe',
      'inspectionPassedNoRe',
      'inspectionFailedNoRe'
    ];
    airHolderName: string[] = [
      'physicalInspectionRe',
      'conductorHolderFlatSurfaceRe',
      'conductorHolderRe',    
      'materailOfParpetHolderRem',
      'totalParpetHolderNoRe',
      'parpetInspectionNoRe',
      'parpetInspectionPassedNoRe',
      'parpetInspectionFailedNoRe',
    ];
    airHolderListName: string[] = [
      'holderTypeRe',
      'materailOfHolderRem',
      'totalHolderNoRe',
      'holderInspNoRe',
      'holderInspPassedNoRe',
      'holderInspFailedNoRe',
    ];
    airMeshName: string[] = [
      'physicalInspectionRe',
      'materailOfConductorRem',
      'sizeOfConductorRe',
      'meshSizeRe',
      'maximumDistanceXRe',
      'minimumDistanceXRe',
      'maximumDistanceYRe',
      'minimumDistanceYRe',
      'heightOfConductorFlatSurfaceRe',
    ];
    //down conductors
    downBasicName: string[] = [
      'biMetallicIssueRem',
      'warningNoticeGroundLevelRem',
      'insulationPresenceRem',
      'noPowerDownConductorRem',
      'connectMadeBrazingRem',
      'chemicalSprinklerRem',
      'cobustMaterialWallRem',
    ];
    downConductorName: string[] = [
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
      'naturalDownCondDimensionRem'
    ];
    bridgingName: string[] = [
      'ensureBridgingCableRem',
      'aluminiumConductorSideWallRem',
      'bridgingCableConnectionRem',
      'bridgingCableMaterialRem',
      'bridgingCableSizeRem',
      'totalNoBridgingCableRem',
      'inspectedNoRem',
      'inspectionPassedNoRem',
      'inspectionFailedNoRem',
    ];
    downHolderName: string[] = [
      'physicalInspectionRem',
      'conductHolderFlatSurfaceRem',
      'conductorHoldedRem',
      'successiveDistanceRem',
      'materialHolderRem',
      'totalNoHolderRem',
      'inspectedNoRem',
      'inspectionPassedNoRem',
      'inspectionFailedNoRem',
    ];
    connectorsName: string[] = [
      'physicalInspectionRem',
      'strightConnectCheckRem',
      'materialConnectorRem',
      'maxConnectorsDownConductorRem',
      'totalNoConnectorsRem',
      'inspectedNoRem',
      'inspectionPassedNoRem',
      'inspectionFailedNoRem',
    ];
    lightingCounterName: string[] = [
      'threadHoldCurrentRem',
      'maximumWithStandCurrentRem',
      'countsRem',
      'batteryLifeTimeRem',
      'properConnectionLightingCounterRem',
      'lightingCounterPlacedRem',
      'conditionOfLightingCounterRem',
      'totalNoLightingCounterRem',
      'inspectedNoRem',
      'inspectionPassedNoRem',
      'inspectionFailedNoRem'
    ];
    testingJointName: string[] = [
      'materialTestJointRem',
      'accessibilityOfTestJointRem',
      'nonMetalicProtectionRem',
      'testJointPlacedGroungLevelRem',
      'bimetallicIssueCheckRem',
      'touchingConductorsRem',
      'totalNoOfTestJointRem',
      'inspectedNoRem',
      'inspectionPassedNoRem',
      'inspectionFailedNoRem'
    ];
    downConductorTestingName: string[] = [
      'remarks',
    ];
    //earthing
    earthingReportName: string[] = [
      'earthingTypeInRem',
      'bimetallicIssueInRem',
      'brazingConnectInRem',
    ];
    earthingDescriptionName: string[] = [
      'soilResistivityInRem',
      'earthElectrodeLesthanDownConductorInRem',
      'connectedEarthTerminalInRem',
      'testJointEarthElectrodeInRem',
      'grountLevelComponentFilledInRem',
      'earthelectMaxiDistWallInRem',
      'earthelectManimumDistanceWallInRem',
      'earthelectMaxiDistRem',
      'earthelectManiDistRem',
      'totalNumberOfElectrodeRem',
      'inspectedNoRem',
      'inspectedPassedNoRem',
      'inspectedFailedNoRem',
    ];
    earthingDescriptionListName: string[] = [
      'earthingConductorMaterialInRem',
      'earthElectrodeMaterialInRem',
      'earthElectrodeTypeInRem',
      'earthElectrodeSizeInRem',
      'earthElectrodeLengthingRem',
    ];
    earthingClampsName: string[] = [
      'psysicalInspectionInRem',
      'clampsFirmlyRem',
      'interConnectOfEarthClampInRem',
      'typeOfClampsInRem',
      'materialOfClampsInRem',
      'totalNoClampsInRem',
      'inspectedClampsInRem',
      'inspectionPassedInRem',
      'inspectionFailedInRem',
    ];
    earthingElectrodeChamberName: string[] = [
      'physicalInspeRem',
      'chamberTypeRem',
      'chamberSizeRem',
      'maximumWithStandLoadRem',
      'chamberLocationRem',
      'maximumPlacedSoilRem',
      'totalChamberNoRem',
      'inspectedChamberInRem',
      'inspectionPassedInRem',
      'inspectionFailedInRem'
    ];
    earthingSystemName: string[] = [
      'eastRem',
      'westRem',
      'northRem',
      'southRem',
      'ringWallEarthEastRem',
      'ringWallEarthWestRem',
      'ringWallEarthNorthRem',
      'ringWallEarthSouthRem',
      'connectedEarthElectrodeRem',
      'jointsMadeBrazingRem',
      'materialOfEartElectrodeRem',
      'typeOfEarthElectrodeRem',
      'sizeOfEarthElectrodeRem',
      'maximumDistanceEartElectrodeWalRem',
      'manimumDistanceEartElectrodeWalRem'
    ];
    earthElectrodeTestingName: string[] = [
      'earthingElectrodeRemarks',
    ];
    //spd
    spdReportName: string[] = [
      'mainsIncomingRem',
      'totalMainsIncomingRem',
      'noPannelSupplittingRem',
      'totalNoOutDoorRequipmentRem',
    ];
    spdReportListName: string[] = [
      'spdMakeRem',
      'spdModelRem',
      'spdClassTypeRem',
      'spdApplicationRem',
      'spdMainApplicationRem',
      'properConnectionRem',
      'incomerRatingRem',
      'fuseBackUpRem',
      'lengthOfConnectingWirePhaseRem',
      'lengthOfConnectingWireProtectiveRem',
      'sizeOfConnectingWirePhaseRem',
      'sizeOfConnectingWireProtectiveRem'
    ];
    //separationDistance
    separationDistanceName: string[] = [
      'calculatedSeperationDistanceRem',
    ]; 
    separateDistanceName: string[] = [
      'seperationDistanceRem',
    ]; 
    separateDistanceDownName: string[] = [
      'seperationDistanceRem',
    ]; 
    //equipotential bonding
    earthStudDescName: string[] = [
      'availableEquipotentialBondingRem',
      'numberOfEquipotentialBondingRem',
      'sizeOfEarthingConductorRem',
      'conceptOfEquipotentialBondingRem',
      'mainProtectiveEquipotentialBondingRem',
      'sizeOfMainProtectiveRem',
      'supplimentaryMainProtectiveRem',
      'sizeOfSupplimentaryProtectiveRem',
      'earthStudVisibilityRem',
      'earthStudBendRem',
      'properBondingRailRem',
      'physicalDamageStudRem',
      'continutyExistaEarthRem',
    ];
  validationErrorTab: boolean = false;
  validationErrorMsgTab: string="";
  tabError: boolean=false;
  tabErrorMsg: string="";
  // For Spinner
  spinner: boolean=false;
  spinner1: boolean=false;
  finalSpinner: boolean=false;
  spinnerValue: String = '';
  mode: any = 'indeterminate';
  nextButton: boolean = true;
  popup: boolean = false;
  popup1: boolean = false;



  //airtermination headerNames
  airterminationBasicHeaderName:any=[];
  airterminatioVerticalHeaderName:any=[];
  airterminatioVerticalListHeaderName:any=[];
  
  airterminationMeshConductorHeaderName:any=[];
  airterminationHolderHeaderName:any=[];
  airterminationHolderListHeaderName:any=[];

  airterminationClampsHeaderName:any=[];
  airterminationExpansionHeaderName:any=[];
  airterminationConnectorHeaderName:any=[];

  //airterminationList
  verticalAirterminationListData:any=[];

  //downConductors headersNames
   downConducotorsBasicHeaderName:any=[]
   downConducotorsDownConductorHeaderName:any=[]
   downConducotorsBridgingHeaderName:any=[]
   downConducotorsHolderHeaderName:any=[]
   downConducotorsConnectorsHeaderName:any=[]
   downConducotorsLightningHeaderName:any=[]
   downConducotorsTestJointHeaderName:any=[]
   downConducotorsTestingDownHeaderName:any=[]

   //earthing headersNames
   earthingBasicHeaderName:any=[];
   earthingTypeAHeaderName:any=[];
   earthingClampsHeaderName:any=[];
   earthingEarthElectrodeHeaderName:any=[];
   earthingTypeBHeaderName:any=[];
   testingOfEarthHeaderName:any=[];

   //airtermination
   airTermination: any=[];
   airTermination1: any=[];
   airTermination2: any=[];
   airTermination3: any=[];
   airTermination4: any=[];
   airTermination5: any=[];
   airTermination6: any=[];
   airTerminationList: any=[];
   airTerminationHolderList: any=[];
 //down conductor
   downConductor1: any=[];
   downConductor2: any=[];
   downConductor3: any=[];
   downConductor4: any=[];
   downConductor5: any=[];
   downConductor6: any=[];
   downConductor7: any=[];
   downConductor8: any=[];
      //summaryObservationObjects
  earthing1:any=[]; //earthingLpsDescription
  earthing2:any=[]; //earthingDescriptionMain
  earthing3:any=[]; //earthingClamps
  earthing4:any=[];  //earthingElectrodeChamber
  earthing5:any=[];  //earthingSystem
  earthing6:any=[];  //earthElectrodeTesting
  earthingList:any=[];  //earthingDescriptionList

  //spd
  spd1:any=[];
  spd2:any=[];

  //seperationdistance
  separation1:any=[];
  separation2:any=[];
  separation3:any=[];

  //earthstud
  equipotential1:any=[];

  dwonconductorRemarks: boolean = false;
  addingRemarksCompleted:boolean = true;

  airtermiantionFlag:any=[]
  downConductorFlag:any=[]
  earthingFlag:any=[]
  spdFlag:any=[]
  seperationFlag:any=[]
  earthStudFlag:any=[]
  deleteSummaryLpsObservationArr: any=[];
  lpsSummaryList: any = [];
  signarr: any;
  signarr1: any;

  constructor(private summaryService:SummaryServiceService,private formBuilder: FormBuilder,
    private airterminationServices: AirterminationService, private router: ActivatedRoute,
    private dialog: MatDialog,private modalService: NgbModal,public service: GlobalsService,
    private summaryPdf: FinalPdfServiceService,
    private lpsGlobalservice:LpsGlobalserviceService
    ) { 
      this.email = this.router.snapshot.paramMap.get('email') || '{}'

      for( let i=0; i<this.lpsSummaryConst.adminEmail.length; i++){
        if(this.lpsSummaryConst.adminEmail[i] == this.email)
        {
          this.submittedButton = false;
        }
      }

      for( let i=0; i<this.lpsSummaryConstProd.adminEmail.length; i++){
        if(this.lpsSummaryConstProd.adminEmail[i] == this.email)
        {
          this.submittedButton = false;
        }
      }

      // for( let i=0; i<this.lpsSummaryConstLocal.adminEmail.length; i++){
      //   if(this.lpsSummaryConstLocal.adminEmail[i] == this.email)
      //   {
      //     this.submittedButton = false;
      //   }
      // }
  }

  ngOnDestroy(): void {
    this.service.signatureImg7="";
    this.service.signatureImg8="";
    this.service.bytestring7="";
    this.service.bytestring8="";
  }

    ngOnInit(): void {
      this.airtermiantionFlag[0] = false;
      this.downConductorFlag[0] = false;
      this.earthingFlag[0] = false;
      this.spdFlag[0] = false;
      this.seperationFlag[0] = false;
      this.earthStudFlag[0] = false;
       this.addingRemarksCompleted = true;
      this.summaryForm = this.formBuilder.group({
        summaryLpsBuildings: this.formBuilder.array([this.summaryLPSArr()]),
        Declaration1Arr: this.formBuilder.array([this.Declaration1Form()]),
        Declaration2Arr: this.formBuilder.array([this.Declaration2Form()]),
        declarationDate: new FormControl('',Validators.required),
        recommendYears: new FormControl('',Validators.required),
      });
      this.numberOfBuildingCount=[]
      if( this.lpsGlobalservice.basiclpsId !=0 ){
        this.retrieveFromAirTermination();
        setTimeout(() => {
          this.retriveSummaryWhileUpdateSave();
        }, 3000);
      }
 
    }

    /*e-siganture starts in progress*/ 
SignatureDesigner1(){
  const dialogRef =this.dialog.open(SignatureComponent, {
      maxHeight: '90vh',
      disableClose: true,
    });
    this.summaryForm.markAllAsTouched();
    this.summaryForm.markAsDirty();
    dialogRef.componentInstance.sigImg1 = false;
    dialogRef.componentInstance.sigImg2 = false;
    dialogRef.componentInstance.sigImg3 = false;
    dialogRef.componentInstance.sigImg4 = false;
    dialogRef.componentInstance.sigImg5 = false;
    dialogRef.componentInstance.sigImg6 = false;
    dialogRef.componentInstance.sigImg7 = true;
    dialogRef.componentInstance.sigImg8 = false;
  }
  focusSigDesigner1(a: any){
   if(a.controls.signature.value!=""){
     return a.controls.signature.markAsDirty();
    }
  }
  
  SignatureDesigner2(){
    const dialogRef =this.dialog.open(SignatureComponent, {
      maxHeight: '90vh',
      disableClose: true,
    });
    this.summaryForm.markAllAsTouched();
    this.summaryForm.markAsDirty();
    dialogRef.componentInstance.sigImg1 = false;
    dialogRef.componentInstance.sigImg2 = false;
    dialogRef.componentInstance.sigImg3 = false;
    dialogRef.componentInstance.sigImg4 = false;
    dialogRef.componentInstance.sigImg5 = false;
    dialogRef.componentInstance.sigImg6 = false;
    dialogRef.componentInstance.sigImg7 = false;
    dialogRef.componentInstance.sigImg8 = true;
  }
  focusSigDesigner2(a: any){
    if(a.controls.signature.value!=""){
      return a.controls.signature.markAsDirty();
     }
  }
/*e-siganture ends*/

    summaryLPSArr(){
      return this.formBuilder.group({
        buildingNumber: new FormControl(''),
        buildingName: new FormControl(''),
        buildingCount: new FormControl(''),
        summaryLpsObservation: this.formBuilder.array([]),
       //air termination
       airTermination: this.formBuilder.array([]),
       airVertical: this.formBuilder.array([]),
       airVerticalList: this.formBuilder.array([]),
       airMesh: this.formBuilder.array([]),
       airHolder: this.formBuilder.array([]),
       airHolderList: this.formBuilder.array([]),
       airClamps: this.formBuilder.array([]),
       airConnectors: this.formBuilder.array([]),
       airExpansion: this.formBuilder.array([]),
       //down conductors
       downConductorReport: this.formBuilder.array([]),
       downConductor: this.formBuilder.array([]),
       bridgingDesc: this.formBuilder.array([]),
       downHolders: this.formBuilder.array([]),
       downConnectors: this.formBuilder.array([]),
       testingJoint: this.formBuilder.array([]),
       lightingCounter: this.formBuilder.array([]),
       downConductorTesting: this.formBuilder.array([]),
       //earthing
       earthingReport: this.formBuilder.array([]),
       earthingDescription: this.formBuilder.array([]),
       earthingDescriptionList: this.formBuilder.array([]),
       earthingClamps: this.formBuilder.array([]),
       earthingElectrodeChamber: this.formBuilder.array([]),
       earthingSystem: this.formBuilder.array([]),
       earthElectrodeTesting: this.formBuilder.array([]),
        //spd
        spdReport: this.formBuilder.array([]),
        spdReportList: this.formBuilder.array([]),
       //separation distance
       separationDistance: this.formBuilder.array([]),
       separateDistance: this.formBuilder.array([]),
       separationDistanceDown: this.formBuilder.array([]),
       //equipotential bonding
       earthStudDesc: this.formBuilder.array([]),
       flag: new FormControl('A'),
      });
     
    }

    private Declaration1Form(): FormGroup {
      return new FormGroup({
        summaryLpsDeclarationId: new FormControl(''),
        name: new FormControl('', Validators.required),
        signature: new FormControl('', Validators.required),
        company: new FormControl('', Validators.required),
        position: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required),
        date: new FormControl('', Validators.required),
        declarationRole: new FormControl('Inspector'),
      });
    }
  
    private Declaration2Form(): FormGroup {
      return new FormGroup({
        summaryLpsDeclarationId: new FormControl(''),
        name: new FormControl('', Validators.required),
        signature: new FormControl('', Validators.required),
        company: new FormControl('', Validators.required),
        position: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required),
        date: new FormControl('', Validators.required),
        declarationRole: new FormControl('Authorizer'),
      });
    }
    //air termination
    createAirTermination(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
        remarksName: new FormControl(''),
        remarksId: new FormControl(''),
        serialNoUi: new FormControl(''),
        headingUi: new FormControl(''),
        summaryLpsInnerObservation: this.formBuilder.array([]),
      });
    }
    createAirVertical(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
        remarksName: new FormControl(''),
        remarksId: new FormControl(''),
        serialNoUi: new FormControl(''),
        headingUi: new FormControl(''),
        summaryLpsInnerObservation: this.formBuilder.array([]),
      });
    }
    createAirVerticalList(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
        remarksName: new FormControl(''),
        remarksId: new FormControl(''),
      
        serialNoUi: new FormControl(''),
        headingUi: new FormControl(''),
        summaryLpsInnerObservation: this.formBuilder.array([]),
      });
    }
    createAirMesh(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
        remarksName: new FormControl(''),
        remarksId: new FormControl(''),
        serialNoUi: new FormControl(''),
        headingUi: new FormControl(''),
        summaryLpsInnerObservation: this.formBuilder.array([]),
      });
    }
    createAirHolder(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
        remarksName: new FormControl(''),
        serialNoUi: new FormControl(''),
        remarksId: new FormControl(''),
        headingUi: new FormControl(''),
        summaryLpsInnerObservation: this.formBuilder.array([]),
      });
    }
    createAirHolderList(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
        remarksName: new FormControl(''),
        serialNoUi: new FormControl(''), 
        remarksId: new FormControl(''),      
        headingUi: new FormControl(''),
        summaryLpsInnerObservation: this.formBuilder.array([]),
      });
    }
    createAirClamps(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
        remarksId: new FormControl(''),
        remarksName: new FormControl(''),
        serialNoUi: new FormControl(''),       
        headingUi: new FormControl(''),
        summaryLpsInnerObservation: this.formBuilder.array([]),
      });
    }
    createAirConnectors(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
        remarksId: new FormControl(''),
        remarksName: new FormControl(''),
        serialNoUi: new FormControl(''),       
        headingUi: new FormControl(''),
        summaryLpsInnerObservation: this.formBuilder.array([]),
      });
    }
    createAirExpansion(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
        remarksId: new FormControl(''),
        remarksName: new FormControl(''),
        serialNoUi: new FormControl(''),       
        headingUi: new FormControl(''),
        summaryLpsInnerObservation: this.formBuilder.array([]),
      });
    }
    //down conductors
    createDownConductorsBasic(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
        remarksId: new FormControl(''),
        remarksName: new FormControl(''),
        serialNoUi: new FormControl(''),       
        headingUi: new FormControl(''),
        summaryLpsInnerObservation: this.formBuilder.array([]),
      });
    }
    createDownConductors(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
        remarksId: new FormControl(''),
        remarksName: new FormControl(''),
        serialNoUi: new FormControl(''),       
        headingUi: new FormControl(''),
        summaryLpsInnerObservation: this.formBuilder.array([]),
      });
    }
    createBridgingDesc(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
        remarksId: new FormControl(''),
        remarksName: new FormControl(''),
        serialNoUi: new FormControl(''),       
        headingUi: new FormControl(''),
        summaryLpsInnerObservation: this.formBuilder.array([]),
      });
    }
    createDownHolders(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
        remarksId: new FormControl(''),
        remarksName: new FormControl(''),
        serialNoUi: new FormControl(''),       
        headingUi: new FormControl(''),
        summaryLpsInnerObservation: this.formBuilder.array([]),
      });
    }
    createDownConnectors(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
        remarksId: new FormControl(''),
        remarksName: new FormControl(''),
        serialNoUi: new FormControl(''),       
        headingUi: new FormControl(''),
        summaryLpsInnerObservation: this.formBuilder.array([]),
      });
    }
    createTestingJoints(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
        remarksId: new FormControl(''),
        remarksName: new FormControl(''),
        serialNoUi: new FormControl(''),       
        headingUi: new FormControl(''),
        summaryLpsInnerObservation: this.formBuilder.array([]),
      });
    }
    createLightingCounter(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
        remarksId: new FormControl(''),
        remarksName: new FormControl(''),
        serialNoUi: new FormControl(''),       
        headingUi: new FormControl(''),
        summaryLpsInnerObservation: this.formBuilder.array([]),
      });
    }
    createDownConductorsTesting(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
        remarksId: new FormControl(''),
        remarksName: new FormControl(''),
        serialNoUi: new FormControl(''),       
        headingUi: new FormControl(''),
        summaryLpsInnerObservation: this.formBuilder.array([]),
      });
    }
    //earthing
    createEarthingReport(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
        remarksId: new FormControl(''),
        remarksName: new FormControl(''),
        serialNoUi: new FormControl(''),       
        headingUi: new FormControl(''),
        summaryLpsInnerObservation: this.formBuilder.array([]),
      });
    }
    createEarthingDescription(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
        remarksId: new FormControl(''),
        remarksName: new FormControl(''),
        serialNoUi: new FormControl(''),       
        headingUi: new FormControl(''),
        summaryLpsInnerObservation: this.formBuilder.array([]),
      });
    }
    createEarthingDescriptionList(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
        remarksId: new FormControl(''),
        remarksName: new FormControl(''),
        serialNoUi: new FormControl(''),       
        headingUi: new FormControl(''),
        summaryLpsInnerObservation: this.formBuilder.array([]),
      });
    }
    createEarthingClamps(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
        remarksId: new FormControl(''),
        remarksName: new FormControl(''),
        serialNoUi: new FormControl(''),       
        headingUi: new FormControl(''),
        summaryLpsInnerObservation: this.formBuilder.array([]),
      });
    }
    createEarthingElectrodeChamber(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
        remarksId: new FormControl(''),
        remarksName: new FormControl(''),
        serialNoUi: new FormControl(''),       
        headingUi: new FormControl(''),
        summaryLpsInnerObservation: this.formBuilder.array([]),
      });
    }
    createEarthingSystem(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
        remarksId: new FormControl(''),
        remarksName: new FormControl(''),
        serialNoUi: new FormControl(''),       
        headingUi: new FormControl(''),
        summaryLpsInnerObservation: this.formBuilder.array([]),
      });
    }
    createEarthElectrodeTesting(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
        remarksId: new FormControl(''),
        remarksName: new FormControl(''),
        serialNoUi: new FormControl(''),       
        headingUi: new FormControl(''),
        summaryLpsInnerObservation: this.formBuilder.array([]),
      });
    }
    //spd
    createSpdReport(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
        remarksId: new FormControl(''),
        remarksName: new FormControl(''),
        serialNoUi: new FormControl(''),       
        headingUi: new FormControl(''),
        summaryLpsInnerObservation: this.formBuilder.array([]),
      });
    }
    createSpdReportList(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
        remarksId: new FormControl(''),
        remarksName: new FormControl(''),
        serialNoUi: new FormControl(''),       
        headingUi: new FormControl(''),
        summaryLpsInnerObservation: this.formBuilder.array([]),
      });
    }
    //SeparationDistance
    createSeparationDistance(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
        remarksId: new FormControl(''),
        remarksName: new FormControl(''),
        serialNoUi: new FormControl(''),       
        headingUi: new FormControl(''),
        summaryLpsInnerObservation: this.formBuilder.array([]),
      });
    }
    createSeparateDistance(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        remarksName: new FormControl(''),
        remarksId: new FormControl(''),
        serialNoUi: new FormControl(''),       
        headingUi: new FormControl(''),
        observationComponentDetails: new FormControl(''),
        summaryLpsInnerObservation: this.formBuilder.array([]),
      });
    }
    createSeparationDownDistance(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        remarksId: new FormControl(''),
        serialNoUi: new FormControl(''),       
        headingUi: new FormControl(''),
        observationComponentDetails: new FormControl(''),
        remarksName: new FormControl(''),
        summaryLpsInnerObservation: this.formBuilder.array([]),
      });
    }
    //equipotential bonding
    createEarthStudDesc(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
        remarksId: new FormControl(''),
        serialNoUi: new FormControl(''),
        headingUi: new FormControl(''),
        remarksName: new FormControl(''),
        summaryLpsInnerObservation: this.formBuilder.array([]),
      });
    }
    // Parent Array Controls:
    summaryLpsBuildingsControl(): AbstractControl[] {
      return(<FormArray>this.summaryForm.get('summaryLpsBuildings')).controls;
    }
    //air termination
    airTerminationControl(q:any): AbstractControl[] {
      return(q.get('airTermination')).controls;
    }
    airVerticalControl(q:any): AbstractControl[] {
      return(q.get('airVertical')).controls;
    }
    airVerticalListControl(q:any): AbstractControl[] {
      return(q.get('airVerticalList')).controls;
    }
    airClampsControl(q:any): AbstractControl[] {
      return(q.get('airClamps')).controls;
    }
    airConnectorsControl(q:any): AbstractControl[] {
      return(q.get('airConnectors')).controls;
    }
    airExpansionControl(q:any): AbstractControl[] {
      return(q.get('airExpansion')).controls;
    }
    airHolderControl(q:any): AbstractControl[] {
      return(q.get('airHolder')).controls;
    }
    airHolderListControl(q:any): AbstractControl[] {
      return(q.get('airHolderList')).controls;
    }
    airMeshControl(q:any): AbstractControl[] {
      return(q.get('airMesh')).controls;
    }
  //down conductors
    downConductorBasicControl(q:any): AbstractControl[] {
      return(q.get('downConductorReport')).controls;
    }
    downConductorControl(q:any): AbstractControl[] {
      return(q.get('downConductor')).controls;
    } 
    bridgingDescControl(q:any): AbstractControl[] {
      return(q.get('bridgingDesc')).controls;
    }
    downHoldersControl(q:any): AbstractControl[] {
      return(q.get('downHolders')).controls;
    }
    downConnectorsControl(q:any): AbstractControl[] {
      return(q.get('downConnectors')).controls;
    } 
    testingJointsControl(q:any): AbstractControl[] {
      return(q.get('testingJoint')).controls;
    } 
    lightningCountersControl(q:any): AbstractControl[] {
      return(q.get('lightingCounter')).controls;
    } 
    downConductorTestingControl(q:any): AbstractControl[] {
      return(q.get('downConductorTesting')).controls;
    } 
  //earthing
    earthingReportControl(q:any): AbstractControl[] {
      return(q.get('earthingReport')).controls;
    }
    earthingDescriptionControl(q:any): AbstractControl[] {
      return(q.get('earthingDescription')).controls;
    } 
    earthingDescriptionListControl(q:any): AbstractControl[] {
      return(q.get('earthingDescriptionList')).controls;
    } 
    earthingClampsControl(q:any): AbstractControl[] {
      return(q.get('earthingClamps')).controls;
    }
    earthingElectrodeChamberControl(q:any): AbstractControl[] {
      return(q.get('earthingElectrodeChamber')).controls;
    }
    earthingSystemControl(q:any): AbstractControl[] {
      return(q.get('earthingSystem')).controls;
    } 
    earthElectrodeTestingControl(q:any): AbstractControl[] {
      return(q.get('earthElectrodeTesting')).controls;
    } 
    //spd
    spdReportControl(q:any): AbstractControl[] {
      return(q.get('spdReport')).controls;
    } 
    spdReportListControl(q:any): AbstractControl[] {
      return(q.get('spdReportList')).controls;
    } 
    //separationDistance
    separationDistanceControl(q:any): AbstractControl[] {
      return(q.get('separationDistance')).controls;
    }   
    separateDistanceControl(q:any): AbstractControl[] {
      return(q.get('separateDistance')).controls;
    }  
    separationDistanceDownControl(q:any): AbstractControl[] {
      return(q.get('separationDistanceDown')).controls;
    }
    //equipotential bonding
    earthStudDescControl(q:any): AbstractControl[] {
      return(q.get('earthStudDesc')).controls;
    }
    getDeclaration1Controls(): AbstractControl[] {
      return (<FormArray>this.summaryForm.get('Declaration1Arr')).controls;
    } 
    getDeclaration2Controls(): AbstractControl[] {
      return (<FormArray>this.summaryForm.get('Declaration2Arr')).controls;
    }
    get f():any {
      return this.summaryForm.controls;
    }

    retrieveFromAirTermination() {
      if(this.basicLpsId != 0 && this.basicLpsId != undefined && this.addingRemarksCompleted) {
        this.airterminationServices.retriveAirTerminationDetails(this.basicLpsId).subscribe(
          (data) => {
            this.airTerminationValues=[]
            this.airTerminationValues = JSON.parse(data);  
            if(this.airTerminationValues !=undefined && this.airTerminationValues !=null && this.airTerminationValues.length !=0){
              this.airTerminationDesc = this.airTerminationValues[0].lpsAirDescription;
              //if no summarydatas and airterminationdata then create new summary form 
             if (this.numberOfBuildingCount.length == 0 && this.airTerminationValues[0].lpsAirDescription != undefined && this.airTerminationValues[0].lpsAirDescription != null) {
               this.summaryForm = this.formBuilder.group({
                 summaryLpsBuildings: this.formBuilder.array([]),
                 Declaration1Arr: this.formBuilder.array([this.Declaration1Form()]),
                 Declaration2Arr: this.formBuilder.array([this.Declaration2Form()]),
                 declarationDate: new FormControl('', Validators.required),
                 recommendYears: new FormControl('', Validators.required),
                 flag: new FormControl('A'),
               }); 
             }
             let numberOfBuildingCountlength = this.numberOfBuildingCount.length;
             let airterminationlength = this.airTerminationDesc.length;
  
             this.summaryLpsBuildingsArr=[]
             this.summaryLpsBuildingsArr = this.summaryForm.get('summaryLpsBuildings') as FormArray
            
             // if airterminationdata size lessthan buildingcount size
             if(this.airTerminationDesc.length > numberOfBuildingCountlength || numberOfBuildingCountlength == 0 ){
 
               for (let j = 0;  j < this.airTerminationDesc.length; j++) {
         
                 let summaryDataAlreadythere = 'No';
                 for (let i = 0; summaryDataAlreadythere == "No"&& this.numberOfBuildingCount.length !=0 && i < this.airTerminationDesc.length; i++) {
                   if (this.jsonData.summaryLpsBuildings[i] !=undefined && this.jsonData.summaryLpsBuildings[i].buildingCount == this.airTerminationDesc[j].buildingCount) {
                     summaryDataAlreadythere = "yes";
                   }
                 }
                 if (summaryDataAlreadythere != "yes") {
                   if(this.airTerminationDesc.length >  this.summaryLpsBuildingsArr.controls.length){
                     this.addSummaryLPS();
                   }
                     this.summaryLpsBuildingsArr.controls[numberOfBuildingCountlength].controls.buildingName.setValue(this.airTerminationDesc[j].buildingName);
                     this.summaryLpsBuildingsArr.controls[numberOfBuildingCountlength].controls.buildingNumber.setValue(this.airTerminationDesc[j].buildingNumber);
                     this.summaryLpsBuildingsArr.controls[numberOfBuildingCountlength].controls.buildingCount.setValue(this.airTerminationDesc[j].buildingCount);
                     numberOfBuildingCountlength=numberOfBuildingCountlength+1;
                   
                 }
   
               }
             }
            
            }    
            
          },
          (error) => {
  
          }
        )
      }
     }

    addSummaryLPS(){
      this.summaryLpsBuildingsArr = this.summaryForm.get('summaryLpsBuildings') as FormArray
      this.summaryLpsBuildingsArr.push(this.summaryLPSArr());    
    }

    retrieveDetailsfromSavedReports(userName: any,basicLpsId: any,data: any){
      this.service.lpsClick = 1;
      this.jsonData=[];
    //  this.lpsSummaryList = JSON.parse(data);
      if( data.summaryLpsBuildings!=undefined && data.summaryLpsBuildings!=null){
        this.jsonData=data;
      }
      else{
        this.jsonData=data.summaryLps;
       // if(data.summaryLpsBuildings == undefined || data.summaryLpsBuildings == null){
       //  }
      }
     
      //this.retrieveObservationLpsSummaryOnload();
      
      this.lpsSummary.basicLpsId = basicLpsId;
      this.basicLpsId = basicLpsId;
     //SIGNATURE LATEST CHANGES
      for(let i of   this.jsonData.summaryLpsDeclaration) {
        if(i.declarationRole == "Inspector") {
          this.signarr=[i];
          this.signarr[0].signature=atob(i.signature);
          this.summaryForm.patchValue({
            Declaration1Arr: this.signarr
          })
        }
        else{
          this.signarr1=[i];
          this.signarr1[0].signature=atob(i.signature);
          this.summaryForm.patchValue({
            Declaration2Arr: this.signarr1
          })
        }
      }

      if(this.jsonData!=null){
         setTimeout(() => {
          this.populateFormData(this.jsonData);
          this.lpsSummary.userName=this.jsonData.userName;
          this.lpsSummary.createdBy=this.jsonData.createdBy;
          this.lpsSummary.createdDate=this.jsonData.createdDate;
          this.lpsSummary.updatedBy=this.jsonData.updatedBy;
          this.lpsSummary.updatedDate=this.jsonData.updatedDate;
          this.lpsSummary.inspectedYear=this.jsonData.inspectedYear;
         
          this.lpsSummary.summaryDate=this.jsonData.summaryDate;
          this.lpsSummary.summaryLpsId=this.jsonData.summaryLpsId;
          this.lpsSummary.flag=this.jsonData.flag;
          this.flag1 = true;
          setTimeout(() => {
          this.retrieveFromAirTermination();
          setTimeout(() => {
            this.addNewRemarksInformations();
          
          }, 2000);
         }, 3000);
    }, 3000);
      }
      }

      populateFormData(data:any){
        this.arr=[];
       this.arr1=[];
       this.arr2=[];
       this.summaryLpsBuildingsArr=[]
       this.airTerminationDesc = []
       this.numberOfBuildingCount.length=0
       this.numberOfBuildingCount=[]
       
       this.summaryLpsBuildingsArr=this.summaryForm.get('summaryLpsBuildings') as FormArray;
       this.Declaration1FormArr=this.summaryForm.get('Declaration1Arr') as FormArray;
       this.Declaration2FormArr=this.summaryForm.get('Declaration2Arr') as FormArray;
       
      //airtermination
      this.airTermination=[];
      this.airTermination1=[];
      this.airTermination2=[];
      this.airTermination3=[];
      this.airTermination4=[];
      this.airTermination5=[];
      this.airTermination6=[];
      this.airTerminationList=[];
      this.airTerminationHolderList=[];
    //down conductor
      this.downConductor1=[];
      this.downConductor2=[];
      this.downConductor3=[];
      this.downConductor4=[];
      this.downConductor5=[];
      this.downConductor6=[];
      this.downConductor7=[];
      this.downConductor8=[];

        //earthing
        this.earthing1=[];
        this.earthing2=[];
        this.earthing3=[];
        this.earthing4=[];
        this.earthing5=[];
        this.earthing6=[];
        this.earthingList=[];
          //spd
          this.spd1=[];
          this.spd2=[];
        //separation distance
        this.separation1=[];
        this.separation2=[];
        this.separation3=[];
        //equipotential
        this.equipotential1=[];

       for(let item of data.summaryLpsBuildings){
        this.numberOfBuildingCount.push(item.buildingCount);
        this.arr.push(this.createGroup(item));
       }
       
      // if(data.summaryLpsDeclaration.length !=0){
      //  this.arr1.push(this.createGroupDeclaration1( data.summaryLpsDeclaration[0]));
       // this.arr2.push(this.createGroupDeclaration1( data.summaryLpsDeclaration[1]));
     
        this.summaryForm.controls.recommendYears.setValue(data.inspectedYear);
        this.summaryForm.controls.declarationDate.setValue(data.summaryDate);
         this.summaryForm.controls.declarationDate.setValue(data.summaryDate);
      // }
       
       this.summaryForm.setControl('summaryLpsBuildings', this.formBuilder.array(this.arr || []));
      // this.summaryForm.setControl('Declaration1Arr', this.formBuilder.array(this.ar//r1 || []));
      // this.summaryForm.setControl('Declaration2Arr', this.formBuilder.array(this.arr2 || []));
       //.retrieveFromAirTermination();
     
      }

      addNewRemarksInformations(){
        
        this.summaryService.retrieveObservationSummaryLps(this.basicLpsId).subscribe(
          data=>{
            
           // this.retrieveFromAirTermination();
           if(this.addingRemarksCompleted){
              this.addingRemarksCompleted= false;
              this.airTerminationData=JSON.parse(data);
              this.downConductorData=JSON.parse(data);
              this.earthingData=JSON.parse(data);
              this.spdReportData=JSON.parse(data); 
              this.separationDistanceData=JSON.parse(data);
              this.equiBondingData=JSON.parse(data);
          
           this.summaryArr=this.summaryForm.get('summaryLpsBuildings') as FormArray;

           for(let i=0; i<this.summaryArr.controls.length; i++){ //created formdata
              if(this.summaryArr.controls.length == this.airTerminationData.airTermination[0].lpsAirDiscription.length){

               let summarybuildingCountNotValue=false;

               if(this.summaryArr.controls[i].controls.buildingCount.value == undefined 
                 || this.summaryArr.controls[i].controls.buildingCount.value == '' ||
                      this.summaryArr.controls[i].controls.buildingCount.value == null){
                        summarybuildingCountNotValue=true;
               }
              
                //if summarybuilding size and airtermination building size is equal only updating airtermination remarks value to summary observation
                for (let j = 0;this.airTerminationData.airTermination !=null && j < this.airTerminationData.airTermination[0].lpsAirDiscription.length; j++) { //retrived observation
                  if (summarybuildingCountNotValue || this.summaryArr.controls[i].controls.buildingCount.value == this.airTerminationData.airTermination[0].lpsAirDiscription[j].buildingCount) {
                    this.updateSummaryAirterminationObervation(this.summaryArr.controls[i].controls, this.airTerminationData.airTermination[0].lpsAirDiscription[j],j);
                  }
                }

                //if summarybuilding size and dwonconductor building size is equal only updating dwonconductor remarks value to summary observation
                for (let j = 0; this.downConductorData.downConductorReport !=null && this.downConductorData.downConductorReport[0].downConductorDescription !=null
                 && this.downConductorData.downConductorReport[0].downConductorDescription !=undefined && j < this.downConductorData.downConductorReport[0].downConductorDescription.length; j++) { //retrived observation
                  if (summarybuildingCountNotValue || this.summaryArr.controls[i].controls.buildingCount.value == this.downConductorData.downConductorReport[0].downConductorDescription[j].buildingCount) {
                    this.updateSummaryDwonConductorObervation(this.summaryArr.controls[i].controls, this.downConductorData.downConductorReport[0],j);
                  }
                }

                //if summarybuilding size and earthing building size is equal only updating earthing remarks value to summary observation
                for (let j = 0; this.earthingData.earthingReport !=null && j < this.earthingData.earthingReport[0].earthingLpsDescription.length; j++) { //retrived observation
                  if (summarybuildingCountNotValue || this.summaryArr.controls[i].controls.buildingCount.value == this.earthingData.earthingReport[0].earthingLpsDescription[j].buildingCount) {
                   this.updateSummaryEarthingObervation(this.summaryArr.controls[i].controls, this.earthingData.earthingReport[0],j);
                  }
                }
                //if summarybuilding size and spd building size is equal only updating spd remarks value to summary observation
                for (let j = 0; this.spdReportData.spdReport !=null && j < this.spdReportData.spdReport[0].spd.length; j++) { //retrived observation
                  if (summarybuildingCountNotValue || this.summaryArr.controls[i].controls.buildingCount.value == this.spdReportData.spdReport[0].spd[j].buildingCount) {
                   this.updateSummarySPDObervation(this.summaryArr.controls[i].controls,  this.spdReportData.spdReport[0],j);
                  }
                }
                //if summarybuilding size and seprationDistance building size is equal only updating seprationDistance remarks value to summary observation
                for (let j = 0; this.separationDistanceData.seperationDistanceReport !=null && j < this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription.length; j++) { //retrived observation
                  if (summarybuildingCountNotValue || this.summaryArr.controls[i].controls.buildingCount.value == this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription[j].buildingCount) {
                   this.updateSeperationObservation(this.summaryArr.controls[i].controls,  this.separationDistanceData.seperationDistanceReport[0],j);
                  }
                }
                //if summarybuilding size and EarthStud building size is equal only updating earthstud remarks value to summary observation
                for (let j = 0; this.equiBondingData.earthStudReport !=null && j < this.equiBondingData.earthStudReport[0].earthStudDescription.length; j++) { //retrived observation
                  if (summarybuildingCountNotValue || this.summaryArr.controls[i].controls.buildingCount.value == this.equiBondingData.earthStudReport[0].earthStudDescription[j].buildingCount) {
                   this.updateEarthStudObservation(this.summaryArr.controls[i].controls,this.equiBondingData.earthStudReport[0],j);
                  }
                }
              }

           }
           } 
          })
          } 

      updateSummaryAirterminationObervation(summaryform:any,airterminationData:any,index:any){

      //updating airtermination_airBasicDescription_remarks value to summaryAirtermiantion observation
       let airBasicDescriptiontRerialNo = 0;
       let airBasicDescriptionSerialNoUi = 1;
       let airBasicDescriptionHeadingUiFlag = true;
       this.airtermiantionFlag[index]=false;

        if(airterminationData.airBasicDescription!=null && airterminationData.airBasicDescription!=undefined && airterminationData.airBasicDescription[0] !=undefined){
          for (let remarkName of this.airBasicName) {
            
            let value = airterminationData.airBasicDescription[0][remarkName];
            let airBasicDescriptionId = airterminationData.airBasicDescription[0].airBasicDescriptionId;
            let heading = '';
            let headingUi = '';
            let airBasicDescription = summaryform.airTermination as FormArray;
  
          if (value == 'consultantNameRemarks') { 
            heading = "AT_Basic Details Observation"; 
          }
  
          let displySerialNo = 0;
          if (value !='' && value != null) {
             displySerialNo = airBasicDescriptionSerialNoUi;
             airBasicDescriptionSerialNoUi = airBasicDescriptionSerialNoUi + 1;
             this.airtermiantionFlag[index]=true;
             if(airBasicDescriptionHeadingUiFlag){
              headingUi = 'AT_Basic Details Observation';
              airBasicDescriptionHeadingUiFlag = false;
             }
          }
   
          let summaryObservation = this.isSummaryDataAvilable('airBasicDescription' + airBasicDescriptiontRerialNo, 'airTermination', value, airBasicDescriptiontRerialNo, heading
          , displySerialNo, headingUi, (airBasicDescriptiontRerialNo-1),airBasicDescriptionId);
  
          summaryObservation.observationComponentDetails = 'airBasicDescription' + airBasicDescriptiontRerialNo;
          summaryObservation.remarkName = remarkName +"-"+index;
          summaryObservation.remarksId = airBasicDescriptionId;
          airBasicDescription.push( this.populateForm(summaryObservation));
          airBasicDescriptiontRerialNo = airBasicDescriptiontRerialNo + 1;
          }
        }
        


         //updating airtermination_lpsVerticalAirTermination_Remarks value to summaryAirtermination observation
          
         let airVerticalTerminationSerialNo = 0;
         let airVerticalTerminationSerialNoUi = 1;
         let airVerticalterminationHeadingUiFlag = true;

         if(airterminationData.lpsVerticalAirTermination!=null && airterminationData.lpsVerticalAirTermination!=undefined && airterminationData.lpsVerticalAirTermination[0] !=undefined){
          for (let remarkName of this.airVerticalName) {

            let value = airterminationData.lpsVerticalAirTermination[0][remarkName] ;
            let airTerminationId = airterminationData.lpsVerticalAirTermination[0].lpsVerticalAirTerminationId;
            let heading = '';
            let headingUi = '';
            let airTerminationForm = summaryform.airVertical as FormArray;
  
          if (value == 'consultantNameRemarks') { 
            heading = "AT_Vertical Observation"; 
          }
  
          let displySerialNo = 0;
          if (value !='' && value != null) {
             displySerialNo = airVerticalTerminationSerialNoUi;
             airVerticalTerminationSerialNoUi = airVerticalTerminationSerialNoUi + 1;
             this.airtermiantionFlag[index]=true;
             if(airVerticalterminationHeadingUiFlag){
              headingUi = 'AT_Vertical Observation';
              airVerticalterminationHeadingUiFlag = false;
             }
          }
   
          let summaryObservation = this.isSummaryDataAvilable('lpsVerticalAirTermination' + airVerticalTerminationSerialNo, 'airVertical', value, airVerticalTerminationSerialNo, heading
          , displySerialNo, headingUi, (airVerticalTerminationSerialNo-1),airTerminationId);
  
          summaryObservation.observationComponentDetails = 'lpsVerticalAirTermination' + airVerticalTerminationSerialNo;
          summaryObservation.remarkName = remarkName +"-"+index;
          summaryObservation.remarksId = airTerminationId;
          airTerminationForm.push( this.populateForm(summaryObservation));
          airVerticalTerminationSerialNo = airVerticalTerminationSerialNo + 1;
          } 
        }
         

        //updating airtermination_verticalAirTerminationList_Remarks value to summaryAirtermination observation
        //let verticalAirterminationListLength=0;
       
        if(airterminationData.lpsVerticalAirTermination!=null && airterminationData.lpsVerticalAirTermination.length !=0 &&airterminationData.lpsVerticalAirTermination!=undefined && airterminationData.lpsVerticalAirTermination[0].verticalAirTerminationList[0] !=undefined){

         for(let i=0;i<airterminationData.lpsVerticalAirTermination[0].verticalAirTerminationList.length;i++){
          let aiterminationVerticalListSerialNo = 0;
          let  airterminationVerticalFlag = true;
          let airterminationSerialNoUi = 1;

            for (let remarkName of this.airVerticalListName) { 
              let value = airterminationData.lpsVerticalAirTermination[0].verticalAirTerminationList[i][remarkName];
              let airTerminationId = airterminationData.lpsVerticalAirTermination[0].verticalAirTerminationList[i].verticalAirTerminationListId;
              let heading = '';
              let headingUi = '';
              let airTerminationForm = summaryform.airVerticalList as FormArray;
    
            if (value == 'materialOfTerminalRe') { 
              heading = 'AT_Vertical List-'+(i+1);
            }
    
            let displySerialNo = 0;
            if (value !='' && value != null) {
               displySerialNo = airterminationSerialNoUi;
               airterminationSerialNoUi = airterminationSerialNoUi + 1;
               this.airtermiantionFlag[index]=true;
               if(airterminationVerticalFlag){
                headingUi = 'AT_Vertical List-'+(i+1);
                airterminationVerticalFlag = false;
               }
            }
     
            let summaryObservation = this.isSummaryDataAvilable('verticalAirTerminationList' + aiterminationVerticalListSerialNo, 'airVerticalList', value, aiterminationVerticalListSerialNo, heading
            , displySerialNo, headingUi, (aiterminationVerticalListSerialNo-1),airTerminationId);
    
            summaryObservation.observationComponentDetails = 'verticalAirTerminationList' + aiterminationVerticalListSerialNo;
            summaryObservation.remarkName = remarkName +"-"+index+"-"+i;
            summaryObservation.remarksId = airTerminationId;
            airTerminationForm.push( this.populateForm(summaryObservation));
            aiterminationVerticalListSerialNo = aiterminationVerticalListSerialNo + 1;
            }
          }
    }
     

        //updating airtermination_airClamps_Remarks value to summaryAirtermination observation
      let airterminationClampSerialNo = 0;
       let airterminationClampsSerialNoUi = 1;
       let airterminationHeadingUiFlag = true;

       if(airterminationData.airClamps!=null && airterminationData.airClamps!=undefined && airterminationData.airClamps[0] !=undefined){
        for (let remarkName of this.airClampsName) {
          let value = airterminationData.airClamps[0][remarkName];
          let airTerminationId = airterminationData.airClamps[0].clampsId;
          let heading = '';
          let headingUi = '';
          let airTerminationForm = summaryform.airClamps as FormArray;

        if (value == 'physicalInspectionRe') { 
          heading = "AT_Clamps Observation";
        }

        let displySerialNo = 0;
        if (value !='' && value != null) {
           displySerialNo = airterminationClampsSerialNoUi;
           airterminationClampsSerialNoUi = airterminationClampsSerialNoUi + 1;
           this.airtermiantionFlag[index]=true;
           if(airterminationHeadingUiFlag){
            headingUi = "AT_Clamps Observation";
            airterminationHeadingUiFlag = false;
           }
        }
 
        let summaryObservation = this.isSummaryDataAvilable('airClamps' + airterminationClampSerialNo, 'airClamps', value, airterminationClampSerialNo, heading
        , displySerialNo, headingUi, (airterminationClampSerialNo-1),airTerminationId);

        summaryObservation.observationComponentDetails = 'airClamps' + airterminationClampSerialNo;
        summaryObservation.remarkName = remarkName +"-"+index;
        summaryObservation.remarksId = airTerminationId;
        airTerminationForm.push( this.populateForm(summaryObservation));
        airterminationClampSerialNo = airterminationClampSerialNo + 1;
 
        }
       }
         

        //updating airtermination_airConnectors_Remarks value to summaryAirtermination observation
        let airConnectorSerialNo = 0;
        let airConnectorSerialNoUi = 1;
        let airConnectorsHeadingUiFlag = true;
        
        if(airterminationData.airConnectors!=null && airterminationData.airConnectors!=undefined && airterminationData.airConnectors[0] !=undefined){
          for (let remarkName of this.airConnectorsName) {

            let value = airterminationData.airConnectors[0][remarkName];
            let airTerminationId = airterminationData.airConnectors[0].connectorId;
            let heading = '';
            let headingUi = '';
            let airTerminationForm = summaryform.airConnectors as FormArray;
  
          if (value == 'physicalInspectionRe') { 
            heading = "AT_Connectors Observation";
          }
  
          let displySerialNo = 0;
          if (value !='' && value != null) {
             displySerialNo = airConnectorSerialNoUi;
             airConnectorSerialNoUi = airConnectorSerialNoUi + 1;
             this.airtermiantionFlag[index]=true;
             if(airConnectorsHeadingUiFlag){
              headingUi = "AT_Connectors Observation";
              airConnectorsHeadingUiFlag = false;
             }
          }
   
          let summaryObservation = this.isSummaryDataAvilable('airConnectors' + airConnectorSerialNo, 'airConnectors', value, airConnectorSerialNo, heading
          , displySerialNo, headingUi, (airConnectorSerialNo-1),airTerminationId);
  
          summaryObservation.observationComponentDetails = 'airConnectors' + airConnectorSerialNo;
          summaryObservation.remarkName = remarkName +"-"+index;
          summaryObservation.remarksId = airTerminationId;
          airTerminationForm.push( this.populateForm(summaryObservation));
          airConnectorSerialNo = airConnectorSerialNo + 1;
           
          }
        }
        

        //updating airtermination_airExpansion_Remarks value to summaryAirtermination observation
        let airExpansionSerialNo = 0;
        let airExpansionSerialNoUi = 1;
        let airExpansionHeadingUiFlag = true;

        if(airterminationData.airExpansion!=null && airterminationData.airExpansion!=undefined && airterminationData.airExpansion[0] !=undefined){
          for (let remarkName of this.airExpansionName) {

            let value = airterminationData.airExpansion[0][remarkName];
            let airTerminationId = airterminationData.airExpansion[0].expansionId;
            let heading = '';
            let headingUi = '';
            let airTerminationForm = summaryform.airExpansion as FormArray;
  
          if (value == 'physicalInspectionRe') { 
            heading = "AT_Expansion Observation";
          }
  
          let displySerialNo = 0;
          if (value !='' && value != null) {
             displySerialNo = airExpansionSerialNoUi;
             airExpansionSerialNoUi = airExpansionSerialNoUi + 1;
             this.airtermiantionFlag[index]=true;
             if(airExpansionHeadingUiFlag){
              headingUi = "AT_Expansion Observation";
              airExpansionHeadingUiFlag = false;
             }
          }
   
          let summaryObservation = this.isSummaryDataAvilable('airExpansion' + airExpansionSerialNo, 'airExpansion', value, airExpansionSerialNo, heading
          , displySerialNo, headingUi, (airExpansionSerialNo-1),airTerminationId);
  
          summaryObservation.observationComponentDetails = 'airExpansion' + airExpansionSerialNo;
          summaryObservation.remarkName = remarkName +"-"+index;
          summaryObservation.remarksId = airTerminationId;
          airTerminationForm.push( this.populateForm(summaryObservation));
          airExpansionSerialNo = airExpansionSerialNo + 1;
   
           
          }
  
        }
         
        //updating airtermination_airHolderDescription_Remarks value to summaryAirtermination observation
        
        let airHolderSerialNo = 0;
        let airHolderSerialNoUi = 1;
        let airHolderHeadingUiFlag = true;

        if(airterminationData.airHolderDescription!=null && airterminationData.airHolderDescription!=undefined && airterminationData.airHolderDescription[0] !=undefined){
          for (let remarkName of this.airHolderName) {
            let value = airterminationData.airHolderDescription[0][remarkName];
            let airTerminationId = airterminationData.airHolderDescription[0].holderDescriptionId;
            let heading = '';
            let headingUi = '';
            let airTerminationForm = summaryform.airHolder as FormArray;
  
          if (value == 'physicalInspectionRe') { 
            heading = "AT_Holder Observation";
          }
  
          let displySerialNo = 0;
          if (value !='' && value != null) {
             displySerialNo = airHolderSerialNoUi;
             airHolderSerialNoUi = airHolderSerialNoUi + 1;
             this.airtermiantionFlag[index]=true;
             if(airHolderHeadingUiFlag){
              headingUi = "AT_Holder Observation";
              airHolderHeadingUiFlag = false;
             }
          }
   
        let  summaryObservation = this.isSummaryDataAvilable( 'airHolderDescription' + airHolderSerialNo, 'airHolder', value, airHolderSerialNo, heading
          , displySerialNo, headingUi, (airHolderSerialNo-1),airTerminationId);
  
          summaryObservation.observationComponentDetails = 'airHolderDescription' + airHolderSerialNo;
          summaryObservation.remarkName = remarkName +"-"+index;
          summaryObservation.remarksId = airTerminationId;
          airTerminationForm.push( this.populateForm(summaryObservation));
          airHolderSerialNo = airHolderSerialNo + 1;
           }
        }

        //updating airtermination_airHolderList_Remarks value to summaryAirtermination observation
      //  let airholderLength=0;
      if(airterminationData.airHolderDescription!=null && airterminationData.airHolderDescription!=undefined && airterminationData.airHolderDescription.length!=0 && airterminationData.airHolderDescription[0].airHolderList!=null && airterminationData.airHolderDescription[0].airHolderList!=undefined 
        && airterminationData.airHolderDescription[0].airHolderList[0] !=undefined){
      for(let i=0;i<airterminationData.airHolderDescription[0].airHolderList.length;i++){

        let airHolderListSerialNo = 0;
        let  airHolderListFlag = true;
        let airHolderListSerialNoUi = 1;

          for (let remarkName of this.airHolderListName) { 

            let value = airterminationData.airHolderDescription[0].airHolderList[i][remarkName];
            let airTerminationId = airterminationData.airHolderDescription[0].airHolderList[i].holderListId;
            let heading = '';
            let headingUi = '';
            let airTerminationForm = summaryform.airHolderList as FormArray;
  
          if (value == 'holderTypeRe') { 
            heading = 'AT_Holder List-'+(i+1);
          }
  
          let displySerialNo = 0;
          if (value !='' && value != null) {
             displySerialNo = airHolderListSerialNoUi;
             airHolderListSerialNoUi = airHolderListSerialNoUi + 1;
             this.airtermiantionFlag[index]=true;
             if(airHolderListFlag){
              headingUi = 'AT_Holder List-'+(i+1);
              airHolderListFlag = false;
             }
          }
   
          let summaryObservation = this.isSummaryDataAvilable('airHolderDescription' + airHolderListSerialNo, 'airHolderList', value, airHolderListSerialNo, heading
          , displySerialNo, headingUi, (airHolderListSerialNo-1),airTerminationId);
  
          summaryObservation.observationComponentDetails = 'airHolderDescription' + airHolderListSerialNo;
          summaryObservation.remarkName = remarkName +"-"+index+"-"+i;
          summaryObservation.remarksId = airTerminationId;
          airTerminationForm.push( this.populateForm(summaryObservation));
          airHolderListSerialNo = airHolderListSerialNo + 1;
            
          } 
        }
        
   }

        //updating airtermination_airMeshDescription_Remarks value to summaryAirtermination observation
        let airMeshSerialNo = 0;
        let airMeshSerialNoUi = 1;
        let airMeshUiFlag = true;

        if(airterminationData.airMeshDescription!=null && airterminationData.airMeshDescription!=undefined && airterminationData.airMeshDescription[0] !=undefined){
          for (let remarkName of this.airMeshName) {
          
            let value = airterminationData.airMeshDescription[0][remarkName];
            let airTerminationId = airterminationData.airMeshDescription[0].meshDescriptionId;
            let heading = '';
            let headingUi = '';
            let airTerminationForm = summaryform.airMesh as FormArray;
  
          if (value == 'physicalInspectionRe') { 
            heading = "AT_Mesh Observation";
          }
  
          let displySerialNo = 0;
          if (value !='' && value != null) {
             displySerialNo = airMeshSerialNoUi;
             airMeshSerialNoUi = airMeshSerialNoUi + 1;
             this.airtermiantionFlag[index]=true;
             if(airMeshUiFlag){
              headingUi = "AT_Mesh Observation";
              airMeshUiFlag = false;
             }
          }
   
          let summaryObservation = this.isSummaryDataAvilable('airMeshDescription' + airMeshSerialNo, 'airMesh', value, airMeshSerialNo, heading
          , displySerialNo, headingUi, (airMeshSerialNo-1),airTerminationId);
  
          summaryObservation.observationComponentDetails = 'airMeshDescription' + airMeshSerialNo;
          summaryObservation.remarkName = remarkName +"-"+index;
          summaryObservation.remarksId = airTerminationId;
          airTerminationForm.push( this.populateForm(summaryObservation));
          airMeshSerialNo = airMeshSerialNo + 1; 
  
      
           
          } 
        }
      }

      updateSummaryDwonConductorObervation(summaryform: any, dwonConductorData: any, index: any) {

        this.downConductorFlag[index]=false;
          //updating downConductorReport_remarks value to summarydownconductor observation
            
            let downConductorReportSerialNo = 0;
            let downConductorReportSerialNoUi = 1;
            let headingReportUiFlag = true;
  
            if(dwonConductorData.downConductorDescription!=null && dwonConductorData.downConductorDescription[index]!=undefined && dwonConductorData.downConductorDescription[index] !=undefined){
              for (let remarkName of this.downBasicName) {
  
                let value = dwonConductorData.downConductorDescription[index][remarkName];
                let dwonConductorId = dwonConductorData.downConductorDescription[index].downConduDescId;
                let heading = '';
                let headingUi = '';
                let downConductor = summaryform.downConductorReport as FormArray;
      
                  if (value == 'biMetallicIssueRem') { 
                    heading = "DC_Basic Details Observation";
                  }
      
                  let displySerialNo = 0;
                  if (value !='' && value != null) {
                    displySerialNo = downConductorReportSerialNoUi;
                    downConductorReportSerialNoUi = downConductorReportSerialNoUi + 1;
                    this.downConductorFlag[index]=true;
                    if(headingReportUiFlag){
                      headingUi = "DC_Basic Details Observation";
                      headingReportUiFlag = false;
                    }
                  }
          
                  let summaryObservation = this.isSummaryDataAvilable('downConductorBasicDescription' + downConductorReportSerialNo, 'downConductorReport', value, downConductorReportSerialNo, heading
                  , displySerialNo, headingUi, (downConductorReportSerialNo-1),dwonConductorId);
      
                  summaryObservation.observationComponentDetails = 'downConductorBasicDescription' + downConductorReportSerialNo;
                  summaryObservation.remarkName = remarkName +"-"+index;
                  summaryObservation.remarksId = dwonConductorId;
                  downConductor.push( this.populateForm(summaryObservation));
                  downConductorReportSerialNo = downConductorReportSerialNo + 1;
                }
            }

          //updating downConductor_remarks value to summarydownconductor observation
          
          let downConductorSerialNo = 0;
          let downConductorSerialNoUi = 1;
          let headingUiFlag = true;

          if(dwonConductorData.downConductorDescription!=null && dwonConductorData.downConductorDescription!=undefined && dwonConductorData.downConductorDescription[index].downConductor[0] !=undefined){
            for (let remarkName of this.downConductorName) {
            
              let value = dwonConductorData.downConductorDescription[index].downConductor[0][remarkName];
              let dwonConductorId = dwonConductorData.downConductorDescription[index].downConductor[0].downConductorId;
              let heading = '';
              let headingUi = '';
              let downConductorForm = summaryform.downConductor as FormArray;
    
                if (value == 'physicalInspectionRem') { 
                  heading = "DC_Downconductors Observation";
                }
    
                let displySerialNo = 0;
                if (value !='' && value != null) {
                  displySerialNo = downConductorSerialNoUi;
                  downConductorSerialNoUi = downConductorSerialNoUi + 1;
                  this.downConductorFlag[index]=true;
                  if(headingUiFlag){
                    headingUi = "DC_Downconductors Observation";
                    headingUiFlag = false;
                  }
                }
        
                let summaryObservation = this.isSummaryDataAvilable('downConductorDescription' + downConductorSerialNo, 'downConductor', value, downConductorSerialNo, heading
                , displySerialNo, headingUi, (downConductorSerialNo-1),dwonConductorId);
    
                summaryObservation.observationComponentDetails = 'downConductorDescription' + downConductorSerialNo;
                summaryObservation.remarkName = remarkName +"-"+index;
                summaryObservation.remarksId = dwonConductorId;
                downConductorForm.push( this.populateForm(summaryObservation));
                downConductorSerialNo = downConductorSerialNo + 1;
             
            }
          }

          //updating bridgingDescription_remarks value to summarydownconductor observation
          
          let bridgingDescriptionSerialNo = 0;
          let bridgingDescriptionSerialNoUi = 1;
          let bridgingDescriptionUiFlag = true;

          if(dwonConductorData.downConductorDescription!=null && dwonConductorData.downConductorDescription!=undefined && dwonConductorData.downConductorDescription[index].bridgingDescription[0] !=undefined){
            for (let remarkName of this.bridgingName) {
 
              let value = dwonConductorData.downConductorDescription[index].bridgingDescription[0][remarkName];
              let dwonConductorId = dwonConductorData.downConductorDescription[index].bridgingDescription[0].bridgingDescriptionId;
              let heading = '';
              let headingUi = '';
              let downConductorForm = summaryform.bridgingDesc as FormArray;
    
                if (value == 'ensureBridgingCableRem') { 
                  heading = "DC_Bridging Observation";
                }
    
                let displySerialNo = 0;
                if (value !='' && value != null) {
                  displySerialNo = bridgingDescriptionSerialNoUi;
                  bridgingDescriptionSerialNoUi = bridgingDescriptionSerialNoUi + 1;
                  this.downConductorFlag[index]=true;
                  if(bridgingDescriptionUiFlag){
                    headingUi = "DC_Bridging Observation";
                    bridgingDescriptionUiFlag = false;
                  }
                }
        
                let summaryObservation = this.isSummaryDataAvilable('bridgingDescription' + bridgingDescriptionSerialNo, 'bridgingDesc', value, bridgingDescriptionSerialNo, heading
                , displySerialNo, headingUi, (bridgingDescriptionSerialNo-1),dwonConductorId);
    
                summaryObservation.observationComponentDetails = 'bridgingDescription' + bridgingDescriptionSerialNo;
                summaryObservation.remarkName = remarkName +"-"+index;
                summaryObservation.remarksId = dwonConductorId;
                downConductorForm.push( this.populateForm(summaryObservation));
                bridgingDescriptionSerialNo = bridgingDescriptionSerialNo + 1;
    
            }
          }
          

          //updating holder_remarks value to summarydownconductor observation
          let holderSerialNo = 0;
          let holderSerialNoUi = 1;
          let holderUiFlag = true;

          if(dwonConductorData.downConductorDescription!=null && dwonConductorData.downConductorDescription!=undefined && dwonConductorData.downConductorDescription[index].holder[0] !=undefined){
            for (let remarkName of this.downHolderName) {

              let value = dwonConductorData.downConductorDescription[index].holder[0][remarkName];
              let dwonConductorId = dwonConductorData.downConductorDescription[index].holder[0].holderId;
              let heading = '';
              let headingUi = '';
              let downConductorForm = summaryform.downHolders as FormArray;
    
                if (value == 'physicalInspectionRem') { 
                  heading = "DC_Holder Observation";
                }
    
                let displySerialNo = 0;
                if (value !='' && value != null) {
                  displySerialNo = holderSerialNoUi;
                  holderSerialNoUi = holderSerialNoUi + 1;
                  this.downConductorFlag[index]=true;
                  if(holderUiFlag){
                    headingUi = "DC_Holder Observation";
                    holderUiFlag = false;
                  }
                }
        
                let summaryObservation = this.isSummaryDataAvilable('holder' + holderSerialNo, 'downHolders', value, holderSerialNo, heading
                , displySerialNo, headingUi, (holderSerialNo-1),dwonConductorId);
    
                summaryObservation.observationComponentDetails = 'holder' + holderSerialNo;
                summaryObservation.remarkName = remarkName +"-"+index;
                summaryObservation.remarksId = dwonConductorId;
                downConductorForm.push( this.populateForm(summaryObservation));
                holderSerialNo = holderSerialNo + 1;
            }
          }
          

          //updating connectors_remarks value to summarydownconductor observation
          let connectorsSerialNo = 0;
          let connectorsSerialNoUi = 1;
          let connectorsheadingUiFlag = true;

          if(dwonConductorData.downConductorDescription!=null && dwonConductorData.downConductorDescription!=undefined && dwonConductorData.downConductorDescription[index].connectors[0] !=undefined){
            for (let remarkName of this.connectorsName) {

              let value = dwonConductorData.downConductorDescription[index].connectors[0][remarkName];
              let dwonConductorId = dwonConductorData.downConductorDescription[index].connectors[0].connectorId;
              let heading = '';
              let headingUi = '';
              let downConductorForm = summaryform.downConnectors as FormArray;
    
                if (value == 'physicalInspectionRem') { 
                  heading = "DC_Connectors Observation";
                }
    
                let displySerialNo = 0;
                if (value !='' && value != null) {
                  displySerialNo = connectorsSerialNoUi;
                  connectorsSerialNoUi = connectorsSerialNoUi + 1;
                  this.downConductorFlag[index]=true;
                  if(connectorsheadingUiFlag){
                    headingUi = "DC_Connectors Observation";
                    connectorsheadingUiFlag = false;
                  }
                }
        
                let summaryObservation = this.isSummaryDataAvilable('connectors' + connectorsSerialNo, 'downConnectors', value, connectorsSerialNo, heading
                , displySerialNo, headingUi, (connectorsSerialNo-1),dwonConductorId);
    
                summaryObservation.observationComponentDetails = 'connectors' + connectorsSerialNo;
                summaryObservation.remarkName = remarkName +"-"+index;
                summaryObservation.remarksId = dwonConductorId;
                downConductorForm.push( this.populateForm(summaryObservation));
                connectorsSerialNo = connectorsSerialNo + 1;
            }
          }
          

          //updating lightningCounter_remarks value to summarydownconductor observation
          let lightningCounterSerialNo = 0;
          let lightningCounterSerialNoUi = 1;
          let lightningCounterUiFlag = true;

          if(dwonConductorData.downConductorDescription!=null && dwonConductorData.downConductorDescription!=undefined && dwonConductorData.downConductorDescription[index].lightningCounter[0] !=undefined){
            for (let remarkName of this.lightingCounterName) {

              let value = dwonConductorData.downConductorDescription[index].lightningCounter[0][remarkName];
              let dwonConductorId = dwonConductorData.downConductorDescription[index].lightningCounter[0].lightingCountersId;
              let heading = '';
              let headingUi = '';
              let downConductorForm = summaryform.lightingCounter as FormArray;
    
                if (value == 'threadHoldCurrentRem') { 
                  heading = "DC_LightningCounter Observation";
                }
    
                let displySerialNo = 0;
                if (value !='' && value != null) {
                  displySerialNo = lightningCounterSerialNoUi;
                  lightningCounterSerialNoUi = lightningCounterSerialNoUi + 1;
                  this.downConductorFlag[index]=true;
                  if(lightningCounterUiFlag){
                    headingUi = "DC_LightningCounter Observation";
                    lightningCounterUiFlag = false;
                  }
                }
        
                let summaryObservation = this.isSummaryDataAvilable('lightningCounter' + lightningCounterSerialNo, 'lightingCounter', value, lightningCounterSerialNo, heading
                , displySerialNo, headingUi, (lightningCounterSerialNo-1),dwonConductorId);
    
                summaryObservation.observationComponentDetails = 'lightningCounter' + lightningCounterSerialNo;
                summaryObservation.remarkName = remarkName +"-"+index;
                summaryObservation.remarksId = dwonConductorId;
                downConductorForm.push( this.populateForm(summaryObservation));
                lightningCounterSerialNo = lightningCounterSerialNo + 1;
   
  
            }
          }

          else{
            let value = dwonConductorData.downConductorDescription[index].testingJointAvailabilityRem;
            let dwonConductorId = dwonConductorData.downConductorDescription[index].lightingCountersId;
            let heading = '';
            let headingUi = '';
            let downConductorForm = summaryform.lightingCounter as FormArray;
                heading = "DC_LightningCounter Observation";
           
                let displySerialNo = 0;



               displySerialNo = lightningCounterSerialNoUi;
                lightningCounterSerialNoUi = lightningCounterSerialNoUi + 1;
                this.downConductorFlag[index]=true;
                headingUi = "DC_LightningCounter Observation";
                lightningCounterUiFlag = false;
              let summaryObservation = this.isSummaryDataAvilable('lightningCounter' + lightningCounterSerialNo, 'lightingCounter', value, lightningCounterSerialNo, heading
              , displySerialNo, headingUi, (lightningCounterSerialNo-1),dwonConductorId);
  
              summaryObservation.observationComponentDetails = 'lightningCounter' + lightningCounterSerialNo;
              summaryObservation.remarkName = 'testingJointAvailabilityRem' +"-"+index;
              summaryObservation.remarksId = dwonConductorId;
              downConductorForm.push( this.populateForm(summaryObservation));
              lightningCounterSerialNo = lightningCounterSerialNo + 1;
          }
          

          //updating testingJoint_remarks value to summarydownconductor observation
          let testingJointSerialNo = 0;
          let testingJointSerialNoUi = 1;
          let testingJointUiFlag = true;

          if(dwonConductorData.downConductorDescription!=null && dwonConductorData.downConductorDescription!=undefined && dwonConductorData.downConductorDescription[index].testingJoint[0] !=undefined){
            for (let remarkName of this.testingJointName) {

              let value = dwonConductorData.downConductorDescription[index].testingJoint[0][remarkName];
              let dwonConductorId = dwonConductorData.downConductorDescription[index].testingJoint[0].testJointId;
              let heading = '';
              let headingUi = '';
              let downConductorForm = summaryform.testingJoint as FormArray;
    
                if (value == 'materialTestJointRem') { 
                  heading = "DC_TestingJoint Observation";
                }
    
                let displySerialNo = 0;
                if (value !='' && value != null) {
                  displySerialNo = testingJointSerialNoUi;
                  testingJointSerialNoUi = testingJointSerialNoUi + 1;
                  this.downConductorFlag[index]=true;
                  if(testingJointUiFlag){
                    headingUi = "DC_TestingJoint Observation";
                    testingJointUiFlag = false;
                  }
                }
        
                let summaryObservation = this.isSummaryDataAvilable('testingJoint' + testingJointSerialNo, 'testingJoint', value, testingJointSerialNo, heading
                , displySerialNo, headingUi, (testingJointSerialNo-1),dwonConductorId);
    
                summaryObservation.observationComponentDetails = 'testingJoint' + testingJointSerialNo;
                summaryObservation.remarkName = remarkName +"-"+index;
                summaryObservation.remarksId = dwonConductorId;
                downConductorForm.push( this.populateForm(summaryObservation));
                testingJointSerialNo = testingJointSerialNo + 1;
            }
          }

          else{
            let value = dwonConductorData.downConductorDescription[index].testingJointAvailabilityRem;
            let dwonConductorId = dwonConductorData.downConductorDescription[index].downConduDescId;
            let heading = '';
            let headingUi = '';
            let downConductorForm = summaryform.testingJoint as FormArray;
  
              if (value == 'materialTestJointRem') {
                heading = "DC_TestingJoint Observation";
              }
  
              let displySerialNo = 0;
              if (value !='' && value != null) {
                displySerialNo = testingJointSerialNoUi;
                testingJointSerialNoUi = testingJointSerialNoUi + 1;
                this.downConductorFlag[index]=true;
                if(testingJointUiFlag){
                  headingUi = "DC_TestingJoint Observation";
                  testingJointUiFlag = false;
                }
              }
      
              let summaryObservation = this.isSummaryDataAvilable('testingJoint' + testingJointSerialNo, 'testingJoint', value, testingJointSerialNo, heading
              , displySerialNo, headingUi, (testingJointSerialNo-1),dwonConductorId);
  
              summaryObservation.observationComponentDetails = 'testingJoint' + testingJointSerialNo;
              summaryObservation.remarkName = 'testingJointAvailabilityRem' +"-"+index;
              summaryObservation.remarksId = dwonConductorId;
              downConductorForm.push( this.populateForm(summaryObservation));
              testingJointSerialNo = testingJointSerialNo + 1;
          }

          //updating downConductorTesting_remarks value to summarydownconductor observation
           
          let downConductorTestingSerialNo = 0;
          let downConductorTestingSerialNoUi = 1;
          let downConductorTestingUiFlag = true;

          if(dwonConductorData.downConductorDescription!=null && dwonConductorData.downConductorDescription!=undefined && dwonConductorData.downConductorDescription[index].downConductorTesting[0] !=undefined){
            for (let i = 0; i < dwonConductorData.downConductorDescription[index].downConductorTesting.length; i++) {
           
              let value = dwonConductorData.downConductorDescription[index].downConductorTesting[0][this.downConductorTestingName[0]];
              let dwonConductorId = dwonConductorData.downConductorDescription[index].downConductorTesting[0].downConductorTestingId;
              let heading = '';
              let headingUi = '';
              let downConductorForm = summaryform.downConductorTesting as FormArray;
    
                if (i == 0) { 
                  heading = "DC_DownConductorTesting Observation";
                }
    
                let displySerialNo = 0;
                if (value !='' && value != null) {
                  displySerialNo = downConductorTestingSerialNoUi;
                  downConductorTestingSerialNoUi = downConductorTestingSerialNoUi + 1;
                  this.downConductorFlag[index]=true;
                  if(downConductorTestingUiFlag){
                    headingUi = "DC_DownConductorTesting Observation";
                    downConductorTestingUiFlag = false;
                  }
                }
                
                let summaryObservation = this.isSummaryDataAvilable('downConductorTesting' + downConductorTestingSerialNo, 'downConductorTesting', value, downConductorTestingSerialNo, heading
                , displySerialNo, headingUi, (downConductorTestingSerialNo-1),dwonConductorId);
    
                summaryObservation.observationComponentDetails = 'downConductorTesting' + downConductorTestingSerialNo;
                summaryObservation.remarkName = this.downConductorTestingName[0] +"-"+index+"-"+i;
                summaryObservation.remarksId = dwonConductorId;
                downConductorForm.push( this.populateForm(summaryObservation));
                downConductorTestingSerialNo = downConductorTestingSerialNo + 1;
            }
          }
          
  }

  updateSummaryEarthingObervation(summaryform: any, earthingData: any, index: any) {
    
    this.earthingFlag[index]=false;
    //=========================== earthingReport =================================================

    let earthingReportRerialNo = 0;
    let earthingReportSerialNoUi = 1;
    let earthingReportHeadingUiFlag = true;
    let earthingReportRemarkIndex = 1;

    if(earthingData.earthingLpsDescription!=null && earthingData.earthingLpsDescription!=undefined){
      for (let value of this.earthingReportName) {
        let earthingValue = earthingData.earthingLpsDescription[index][value];
        let earthingId = earthingData.earthingLpsDescription[index].earthingId;
        let earthingReportHeading = '';
        let earthingReportHeadingUi = '';
       let earthingReport = summaryform.earthingReport as FormArray;
          
        if (value == 'earthingTypeInRem') {
          earthingReportHeading = 'ET_Basic Details Observation';
        }
   
        //serial Number
        let displySerialNo = 0;
        if (earthingValue != '' && earthingValue != null) {
          displySerialNo = earthingReportSerialNoUi;
          earthingReportSerialNoUi = earthingReportSerialNoUi + 1;
        }
  
        //headingUI 
        if (earthingValue != '' && earthingValue != null && earthingReportHeadingUiFlag) {
          earthingReportHeadingUi = 'ET_Basic Details Observation';
          earthingReportHeadingUiFlag = false;
          this.earthingFlag[index]=true;
        }
  
       
        let summaryObservation = this.isSummaryDataAvilable('earthingLpsDescription' + earthingReportRerialNo, 'earthingReport', earthingValue, earthingReportRerialNo, earthingReportHeading
          , displySerialNo, earthingReportHeadingUi, (earthingReportRerialNo-1),earthingId);
        summaryObservation.observationComponentDetails = 'earthingLpsDescription' + earthingReportRerialNo;
        summaryObservation.remarkName = value +"-"+index;
        summaryObservation.remarksId = earthingId;
        earthingReport.push( this.populateForm(summaryObservation));
        earthingReportRerialNo = earthingReportRerialNo + 1;
      }
    }
    

    //  ========================= earthingDescription ========================
    let earthingDescriptionserialNo = 0;
    let earthingDescriptionSerialNoUi = 1;
    let earthingDescriptionHeadingUiFlag = true;
    let earthingDescriptionRemarkIndex = 1;
    let earthingDescription = summaryform.earthingDescription as FormArray;
    
    if(earthingData.earthingLpsDescription!=null && earthingData.earthingLpsDescription!=undefined
      && earthingData.earthingLpsDescription[index].earthingDescription !=undefined
      && earthingData.earthingLpsDescription[index].earthingDescription.length !=0){
      for (let value of this.earthingDescriptionName) {
        let earthingValue = earthingData.earthingLpsDescription[index].earthingDescription[0][value];
        let earthDescriptionId = earthingData.earthingLpsDescription[index].earthingDescription[0].earthDescriptionId;
        let earthingDescriptionHeadingUi = '';
        let earthingDescriptionHeading = '';
  
        //
        if (value == 'soilResistivityInRem') {
          earthingDescriptionHeading = 'EarthingDescription Observation';
        }
  
        let displySerialNo = 0;
        if (earthingValue != '' && earthingValue != null) {
          displySerialNo = earthingDescriptionSerialNoUi;
          earthingDescriptionSerialNoUi = earthingDescriptionSerialNoUi + 1;
        }
  
        if (earthingValue != '' && earthingValue != null && earthingDescriptionHeadingUiFlag) {
          earthingDescriptionHeadingUi = 'EarthingDescription Observation';
          earthingDescriptionHeadingUiFlag = false;
          this.earthingFlag[index]=true;
        }
  
        let summaryObservation = this.isSummaryDataAvilable('earthingDescriptionMain' + earthingDescriptionserialNo, 'earthingDescription', earthingValue,
          earthingDescriptionserialNo, earthingDescriptionHeading
          , displySerialNo, earthingDescriptionHeadingUi, (earthingDescriptionserialNo-1),earthDescriptionId);
        summaryObservation.observationComponentDetails = 'earthingDescriptionMain' + earthingDescriptionserialNo;
        summaryObservation.remarkName = value +"-"+index;
        summaryObservation.remarksId = earthDescriptionId;
        earthingDescription.push( this.populateForm(summaryObservation));
        earthingDescriptionserialNo = earthingDescriptionserialNo + 1;
      }
    }
    

    //  ========================= earthingDescriptionListName ========================
    let earthingDescriptionList = summaryform.earthingDescriptionList as FormArray;

   if(earthingData.earthingLpsDescription!=null && earthingData.earthingLpsDescription!=undefined && earthingData.earthingLpsDescription[index].earthingDescription[index] !=undefined){

    for (let i = 0; i < earthingData.earthingLpsDescription[index].earthingDescription[0].earthingDescriptionList.length; i++) {
      let earthingDescriptionListserialNo = 0;
      let earthingDescriptionListSerialNoUi = 1;
      let earthingDescriptionListHeadingUiFlag = true;
      let earthingDescriptionListRemarkIndex = 1;

        for (let value of this.earthingDescriptionListName) {
          let earthingValue = earthingData.earthingLpsDescription[index].earthingDescription[0].earthingDescriptionList[i][value];
          let earthingDescriptionListHeadingUi = '';
          let earthingDescriptionListHeading = '';
          let earthDescriptionListId = earthingData.earthingLpsDescription[index].earthingDescription[0].earthingDescriptionList[i].earthDescriptionListId;
  
          //
          if (value == 'earthingConductorMaterialInRem') {
            earthingDescriptionListHeading = 'EarthingDescription List-' + (i+1);
          }
  
          let displySerialNo = 0;
          if (earthingValue != '' && earthingValue != null) {
            displySerialNo = earthingDescriptionListSerialNoUi;
            earthingDescriptionListSerialNoUi = earthingDescriptionListSerialNoUi + 1;
          }
  
          //serial Number
          if (earthingValue != '' && earthingValue != null && earthingDescriptionListHeadingUiFlag) {
            earthingDescriptionListHeadingUi = 'EarthingDescription List-' + (i+1);
            earthingDescriptionListHeadingUiFlag = false;
            this.earthingFlag[index]=true;
  
          }
  
          let summaryObservation = this.isSummaryDataAvilable('earthingDescriptionList' + earthingDescriptionListserialNo, 'earthingDescriptionList', earthingValue,
            earthingDescriptionListserialNo, earthingDescriptionListHeading
            , displySerialNo, earthingDescriptionListHeadingUi, (earthingDescriptionListserialNo-1),earthDescriptionListId);
          summaryObservation.observationComponentDetails = 'earthingDescriptionList' + earthingDescriptionListserialNo;
          summaryObservation.remarkName = value +"-"+index+"-"+i;
          summaryObservation.remarksId = earthDescriptionListId;
          earthingDescriptionList.push( this.populateForm(summaryObservation));
          earthingDescriptionListserialNo = earthingDescriptionListserialNo + 1;
        }
      }
      
    }


    //  ========================= earthingClampsName ========================
    let earthingClampserialNo = 0;
    let earthingClampSerialNoUi = 1;
    let earthingClampHeadingUiFlag = true;
    let earthingClampRemarkIndex = 1;

    if(earthingData.earthingLpsDescription!=null && earthingData.earthingLpsDescription!=undefined
      && earthingData.earthingLpsDescription[index].earthingClamps !=undefined
      && earthingData.earthingLpsDescription[index].earthingClamps.length !=0){
      for (let value of this.earthingClampsName) {
        let earthingClampHeadingUi = '';
        let earthingClampHeading = '';
        let earthingClamps = summaryform.earthingClamps as FormArray;
    
        let earthingValue = earthingData.earthingLpsDescription[index].earthingClamps[0][value];
        let earthingClampsId = earthingData.earthingLpsDescription[index].earthingClamps[0].earthingClampsId;
    
          //
          if (value == 'earthingConductorMaterialInRem') {
            earthingClampHeading = 'EarthingClamps Observation';
          }
    
          let displySerialNo = 0;
          if (earthingValue != '' && earthingValue != null) {
            displySerialNo = earthingClampSerialNoUi;
            earthingClampSerialNoUi = earthingClampSerialNoUi + 1;
          }
    
          if (earthingValue != '' && earthingValue != null && earthingClampHeadingUiFlag) {
            earthingClampHeadingUi = 'EarthingClamps Observation';
            earthingClampHeadingUiFlag = false;
            this.earthingFlag[index]=true;
          }
    
          let summaryObservation = this.isSummaryDataAvilable('earthingClamps' + earthingClampserialNo, 'earthingClamps', earthingValue,
            earthingClampserialNo, earthingClampHeading
            , displySerialNo, earthingClampHeadingUi, (earthingClampserialNo-1),earthingClampsId);
          summaryObservation.observationComponentDetails = 'earthingClamps' + earthingClampserialNo;
          summaryObservation.remarkName = value +"-"+index;
          summaryObservation.remarksId = earthingClampsId;
          earthingClamps.push( this.populateForm(summaryObservation));
          earthingClampserialNo = earthingClampserialNo + 1;
        }
    }
    
    //  ========================= earthingElectrodeChamber ========================
    let earthingElectrodeChamberserialNo = 0;
    let earthingElectrodeChamberSerialNoUi = 1;
    let earthingElectrodeChamberHeadingUiFlag = true;
    let earthingElectrodeChamberRemarkIndex = 1;


    if(earthingData.earthingLpsDescription!=null && earthingData.earthingLpsDescription!=undefined
      && earthingData.earthingLpsDescription[index].earthingElectrodeChamber !=undefined
      && earthingData.earthingLpsDescription[index].earthingElectrodeChamber.length !=0){
      for (let value of this.earthingElectrodeChamberName) {
        let earthingValue = earthingData.earthingLpsDescription[index].earthingElectrodeChamber[0][value];
        let earthingElectrodeChamberId = earthingData.earthingLpsDescription[index].earthingElectrodeChamber[0].earthingElectrodeChamberId;
        let earthingElectrodeChamberHeading = '';
        let earthingElectrodeChamberHeadingUi = '';
        let earthingElectrodeChamber = summaryform.earthingElectrodeChamber as FormArray;
        //
        if (value == 'physicalInspeRem') {
          earthingElectrodeChamberHeading = 'EarthingElectrodeChamber Observation';
        }
  
        let displySerialNo = 0;
        if (earthingValue != '' && earthingValue != null) {
          displySerialNo = earthingElectrodeChamberSerialNoUi;
          earthingElectrodeChamberSerialNoUi = earthingElectrodeChamberSerialNoUi + 1;
        }
  
        //serial Number
        if (earthingValue != '' && earthingValue != null && earthingElectrodeChamberHeadingUiFlag) {
          earthingElectrodeChamberHeadingUi = 'EarthingElectrodeChamber Observation';
          earthingElectrodeChamberHeadingUiFlag = false;
          this.earthingFlag[index]=true;
        }
  
        let summaryObservation = this.isSummaryDataAvilable( 'earthingElectrodeChamber' + earthingElectrodeChamberserialNo, 'earthingElectrodeChamber', earthingValue,
          earthingElectrodeChamberserialNo, earthingElectrodeChamberHeading
          , displySerialNo, earthingElectrodeChamberHeadingUi, (earthingElectrodeChamberserialNo-1),earthingElectrodeChamberId);
        summaryObservation.observationComponentDetails = 'earthingElectrodeChamber' + earthingElectrodeChamberserialNo;
        summaryObservation.remarkName = value +"-"+index;
        summaryObservation.remarksId = earthingElectrodeChamberId;
        earthingElectrodeChamber.push( this.populateForm(summaryObservation));
        earthingElectrodeChamberserialNo = earthingElectrodeChamberserialNo + 1;
        earthingElectrodeChamberHeading = ''; 
        earthingElectrodeChamberHeadingUi = '';
      }
    }
    

    //  ========================= earthingSystemName ========================
    let earthingSystemserialNo = 0;
    let earthingSystemSerialNoUi = 1;
    let earthingSystemHeadingUiFlag = true;
    let earthingSystemRemarkIndex = 1;

    if(earthingData.earthingLpsDescription!=null && earthingData.earthingLpsDescription!=undefined && earthingData.earthingLpsDescription[index].earthingSystem[0] !=undefined){
      for (let value of this.earthingSystemName) {
        let earthingValue = earthingData.earthingLpsDescription[index].earthingSystem[0][value];
        let earthingSystemId = earthingData.earthingLpsDescription[index].earthingSystem[0].earthingSystemId;
        let earthingSystem = summaryform.earthingSystem as FormArray;
        let earthingSystemHeadingUi = '';
        let earthingSystemHeading = '';
  
  
        //
        if (value == 'eastRem') {
          earthingSystemHeading = 'EarthingSystem Observation';
        }
  
        let displySerialNo = 0;
        if (earthingValue != '' && earthingValue != null) {
          displySerialNo = earthingSystemSerialNoUi;
          earthingSystemSerialNoUi = earthingSystemSerialNoUi + 1;
        }
  
        //serial Number
        if (earthingValue != '' && earthingValue != null && earthingSystemHeadingUiFlag) {
          earthingSystemHeadingUi = 'EarthingSystem Observation';
          earthingSystemHeadingUiFlag = false;
          this.earthingFlag[index]=true;
        }
  
        let summaryObservation = this.isSummaryDataAvilable('earthingSystem' + earthingSystemserialNo, 'earthingSystem', earthingValue,
          earthingSystemserialNo, earthingSystemHeading
          , displySerialNo, earthingSystemHeadingUi, (earthingSystemserialNo -1),earthingSystemId);
        summaryObservation.observationComponentDetails = 'earthingSystem' + earthingSystemserialNo;
        summaryObservation.remarkName = value +"-"+index;
        summaryObservation.remarksId = earthingSystemId;
        earthingSystem.push( this.populateForm(summaryObservation));
        earthingSystemserialNo = earthingSystemserialNo + 1;
        earthingSystemHeading = ''; 
        earthingSystemHeadingUi = '';
      }
    }
    

    //  ========================= earthElectrodeTestingName ========================
    let earthElectrodeTestingserialNo = 0;
    let earthElectrodeTestingSerialNoUi = 1;
    let earthElectrodeTestingHeadingUiFlag = true;
    let earthElectrodeTestingRemarkIndex = 1;

    if(earthingData.earthingLpsDescription!=null && earthingData.earthingLpsDescription!=undefined && earthingData.earthingLpsDescription[index].earthElectrodeTesting !=undefined &&
      earthingData.earthingLpsDescription[index].earthElectrodeTesting !=null && earthingData.earthingLpsDescription[index].earthElectrodeTesting.length !=0){
      for(let i=0;i<earthingData.earthingLpsDescription[index].earthElectrodeTesting.length; i++){
        for (let value of this.earthElectrodeTestingName) {
          if( earthingData.earthingLpsDescription[index].earthElectrodeTesting[i][value]!= null && earthingData.earthingLpsDescription[index].earthElectrodeTesting[i][value].trim().length != 0){
          let earthingValue = earthingData.earthingLpsDescription[index].earthElectrodeTesting[i][value];
          let earthElectrodeTesting = summaryform.earthElectrodeTesting as FormArray;
          let earthDescriptionListId = earthingData.earthingLpsDescription[index].earthElectrodeTesting[i].earthingElectrodeTestingId;
  
          let earthElectrodeTestingHeading = '';
          let earthElectrodeTestingHeadingUi = '';
    
    
          //
          if (value == 'earthingElectrodeRemarks') {
            earthElectrodeTestingHeading = 'EarthElectrodeTesting Observation';
          }
    
          let displySerialNo = 0;
          if (earthingValue != '' && earthingValue != null) {
            displySerialNo = earthElectrodeTestingSerialNoUi;
            earthElectrodeTestingSerialNoUi = earthElectrodeTestingSerialNoUi + 1;
          }
      
          if (earthingValue != '' && earthingValue != null && earthElectrodeTestingHeadingUiFlag) {
            earthElectrodeTestingHeadingUi = 'EarthElectrodeTesting Observation';
            earthElectrodeTestingHeadingUiFlag = false;
            this.earthingFlag[index]=true;
          }
    
          let summaryObservation = this.isSummaryDataAvilable('earthElectrodeTesting' + earthElectrodeTestingserialNo, 'earthElectrodeTesting', earthingValue,
            earthElectrodeTestingserialNo, earthElectrodeTestingHeading
            , displySerialNo, earthElectrodeTestingHeadingUi, (earthElectrodeTestingserialNo - 1),earthDescriptionListId);
          summaryObservation.observationComponentDetails = 'earthElectrodeTesting' + earthElectrodeTestingserialNo;
          summaryObservation.remarkName = value +"-"+index+"-"+i;
          summaryObservation.remarksId = earthDescriptionListId;
          earthElectrodeTesting.push( this.populateForm(summaryObservation));
          earthElectrodeTestingserialNo = earthElectrodeTestingserialNo + 1;
        } 
      }
      }
    }
  }

  updateSummarySPDObervation(summaryform: any, spdData: any, index: any) {
    this.spdFlag[index]=false;
    //=========================== spd report =================================================

    let spdReportRerialNo = 0;
    let spdReportSerialNoUi = 1;
    let spdReportHeadingUiFlag = true;
    let spdReportRemarkIndex = 1;

    if(spdData.spd!=null && spdData.spd!=undefined){
      for (let value of this.spdReportName) {
        let spdValue = spdData.spd[index][value];
        let spdReportId = spdData.spd[index].spdId;
        let spdReportHeadingUi = '';
        let spdReportHeading = '';
        let spdReport = summaryform.spdReport as FormArray;
  
        if (value == 'mainsIncomingRem') {
          spdReportHeading = 'SPD Details Observation';
        }
  
        let displySerialNo = 0;
        if (spdValue != '' && spdValue != null) {
          displySerialNo = spdReportSerialNoUi;
          spdReportSerialNoUi = spdReportSerialNoUi + 1;
        }
   
        if (spdValue != '' && spdValue != null && spdReportHeadingUiFlag) {
          spdReportHeadingUi =  'SPD Details Observation';
          spdReportHeadingUiFlag = false;
          this.spdFlag[index]=true;
        }
  
        let summaryObservation = this.isSummaryDataAvilable('spdReport' + spdReportRerialNo, 'spdReport', spdValue, spdReportRerialNo, spdReportHeading
          , displySerialNo, spdReportHeadingUi, (spdReportRerialNo -1 ),spdReportId);
          summaryObservation.remarksName = value +"-"+index;
          summaryObservation.remarksId = spdReportId;
        summaryObservation.observationComponentDetails = 'spdReport' + spdReportRerialNo;
        spdReport.push(this.populateForm(summaryObservation));
        spdReportRerialNo = spdReportRerialNo + 1;
      }
    }

     //=========================== spd list =================================================
    for(let i=0;i<spdData.spd[index].spdDescription.length;i++){

     let spdDescriptionSerialNo = 0;
     let spdDescriptionSerialNoUi = 1;
     let spdDescriptionHeadingUiFlag = true;
     let spdDescriptionRemarkIndex = 1;
 
     if(spdData.spd!=null && spdData.spd!=undefined ){
      for (let value of this.spdReportListName) {
        let spdReportList = summaryform.spdReportList as FormArray;
         let earthingValue = spdData.spd[index].spdDescription[i][value];
         let spdDescriptionId = spdData.spd[index].spdDescription[i].spdDescriptionId;
         let spdDescriptionHeading = '';
         let spdDescriptionHeadingUi = '';
   
         if (value == 'mainsIncomingRem') {
           spdDescriptionHeading = ('SPD List-' + (i+1));
         }
   
         let displySerialNo = 0;
         if (earthingValue != '' && earthingValue != null) {
           displySerialNo = spdDescriptionSerialNoUi;
           spdDescriptionSerialNoUi = spdDescriptionSerialNoUi + 1;
         }
   
        
         if (earthingValue != '' && earthingValue != null && spdDescriptionHeadingUiFlag) {
           spdDescriptionHeadingUi =   ('SPD List-' + (i+1));
           spdDescriptionHeadingUiFlag = false;
           this.spdFlag[index]=true;
         }
   
         let summaryObservation = this.isSummaryDataAvilable( 'spdDescription' + spdDescriptionSerialNo, 'spdDescription', earthingValue, spdDescriptionSerialNo, spdDescriptionHeading
           , displySerialNo, spdDescriptionHeadingUi, (spdDescriptionSerialNo -1),spdDescriptionId);
         summaryObservation.observationComponentDetails = 'spdDescription' + spdDescriptionSerialNo;
         summaryObservation.remarksName = value +"-"+index+"-"+i;
         summaryObservation.remarksId = spdDescriptionId;
         spdReportList.push(this.populateForm(summaryObservation));
         spdDescriptionSerialNo = spdDescriptionSerialNo + 1;
       }
     }
   }
  }
  
  updateSeperationObservation(summaryform: any, separationDistanceData: any, index: any) {
    this.seperationFlag[index]=false;
  //  this.summaryArr = this.summaryForm.get('summaryLpsBuildings') as FormArray;
 
    //=========================== SeparationDistance =================================================

    let seperationDistanceSerialNo = 0;
    let seperationDistanceSerialNoUi = 1;
    let seperationDistanceHeadingUiFlag = true;
    let seperationDistanceRemarkIndex = 1;

    if(separationDistanceData.seperationDistanceDescription!=null && separationDistanceData.seperationDistanceDescription!=undefined){
      for (let value of this.separationDistanceName) {
        let separationDistanceValue = separationDistanceData.seperationDistanceDescription[index][value];
        let seperationDistanceId = separationDistanceData.seperationDistanceDescription[index].seperationDistanceId;
        let seperationDistanceHeadingUi = '';
        let seperationDistanceHeading = '';
        let separationDistance = summaryform.separationDistance as FormArray;
  
        if (value == 'calculatedSeperationDistanceRem') {
          seperationDistanceHeading = 'SeparationDistance Observation';
        }
  
        let displySerialNo = 0;
        if (separationDistanceValue != '' && separationDistanceValue != null) {
          displySerialNo = seperationDistanceSerialNoUi;
          seperationDistanceSerialNoUi = seperationDistanceSerialNoUi + 1;
        }
   
        if (separationDistanceValue != '' && separationDistanceValue != null && seperationDistanceHeadingUiFlag) {
          seperationDistanceHeadingUi =  'SeparationDistance Observation';
          seperationDistanceHeadingUiFlag = false;
          this.seperationFlag[index]=true;
        }
  
        let summaryObservation = this.isSummaryDataAvilable('seperationDistanceDescription' + seperationDistanceSerialNo, 'separationDistance', separationDistanceValue, seperationDistanceSerialNo, seperationDistanceHeading
          , displySerialNo, seperationDistanceHeadingUi, (seperationDistanceSerialNo -1 ),seperationDistanceId);
          summaryObservation.remarksName = value +"-"+index;
          summaryObservation.remarksId = seperationDistanceId;
        summaryObservation.observationComponentDetails = 'seperationDistanceDescription' + seperationDistanceSerialNo;
        separationDistance.push(this.populateForm(summaryObservation));
      seperationDistanceSerialNo = seperationDistanceSerialNo + 1;
      }
    }  

     //=========================== SeparateDistance =================================================

 
     let SeparateDistanceSerialNo = 0;
     let SeparateDistanceSerialNoUi = 1;
     let SeparateDistanceHeadingUiFlag = true;
     let SeparateDistanceRemarkIndex = 1;

     if(separationDistanceData.seperationDistanceDescription!=null && separationDistanceData.seperationDistanceDescription!=undefined ){
      for(let i=0;i<separationDistanceData.seperationDistanceDescription[index].separateDistance.length;i++){
        // for (let value of this.separateDistanceName) {
           let separationDistanceValue = separationDistanceData.seperationDistanceDescription[index].separateDistance[i][this.separateDistanceName[0]];
           let seperationDistanceDescId = separationDistanceData.seperationDistanceDescription[index].separateDistance[i].seperationDistanceDescId;
           let SeparateDistanceHeadingUi = '';
           let SeparateDistanceHeading = '';
           let separateDistance = summaryform.separateDistance as FormArray;
     
           if (this.separateDistanceName[0] == 'seperationDistanceRem') {
             SeparateDistanceHeading = 'SeparateDistance Observation';
           }
     
           let displySerialNo = 0;
           if (separationDistanceValue != '' && separationDistanceValue != null) {
             displySerialNo = SeparateDistanceSerialNoUi;
             SeparateDistanceSerialNoUi = SeparateDistanceSerialNoUi + 1;
           }
      
           if (separationDistanceValue != '' && separationDistanceValue != null && SeparateDistanceHeadingUiFlag) {
             SeparateDistanceHeadingUi =  'SeparateDistance Observation';
             SeparateDistanceHeadingUiFlag = false;
             this.seperationFlag[index]=true;
           }
     
           let summaryObservation = this.isSummaryDataAvilable('separateDistanceDesc' + SeparateDistanceSerialNo, 'separateDistance', separationDistanceValue, SeparateDistanceSerialNo, SeparateDistanceHeading
             , displySerialNo, SeparateDistanceHeadingUi, (SeparateDistanceSerialNo - 1),seperationDistanceDescId);
             summaryObservation.remarksName = this.separateDistanceName[0] +"-"+index+"-"+i;
             summaryObservation.remarksId = seperationDistanceDescId;
           summaryObservation.observationComponentDetails = 'separateDistanceDesc' + SeparateDistanceSerialNo;
           separateDistance.push(this.populateForm(summaryObservation));
         SeparateDistanceSerialNo = SeparateDistanceSerialNo + 1;
        // }
        }
     }

     
       //=========================== SeparationDistanceDown =================================================

       let SeparationDistanceDownSerialNo = 0;
       let SeparationDistanceDownSerialNoUi = 1;
       let SeparationDistanceDownHeadingUiFlag = true;
       let SeparationDistanceDownRemarkIndex = 1;

       if(separationDistanceData.seperationDistanceDescription!=null && separationDistanceData.seperationDistanceDescription!=undefined ){
        for (let i = 0; i < separationDistanceData.seperationDistanceDescription[index].separateDistanceDownConductors.length; i++) {
          for (let value of this.separateDistanceDownName) {
            let separationDistanceValue = separationDistanceData.seperationDistanceDescription[index].separateDistanceDownConductors[i][value];
            let seperationDistanceDownConductorId = separationDistanceData.seperationDistanceDescription[index].separateDistanceDownConductors[i].seperationDistanceDownConductorId;
            let SeparationDistanceDownHeadingUi = '';
            let SeparationDistanceDownHeading = '';
            let separationDistanceDown = summaryform.separationDistanceDown as FormArray;
    
            if (value == 'seperationDistanceRem') {
              SeparationDistanceDownHeading = 'SeparationDistanceDown Observation';
            }
    
            let displySerialNo = 0;
            if (separationDistanceValue != '' && separationDistanceValue != null) {
              displySerialNo = SeparationDistanceDownSerialNoUi;
              SeparationDistanceDownSerialNoUi = SeparationDistanceDownSerialNoUi + 1;
            }
    
            if (separationDistanceValue != '' && separationDistanceValue != null && SeparationDistanceDownHeadingUiFlag) {
              SeparationDistanceDownHeadingUi = 'SeparationDistanceDown Observation';
              SeparationDistanceDownHeadingUiFlag = false;
              this.seperationFlag[index]=true;
            }
    
            let summaryObservation = this.isSummaryDataAvilable('separateDistanceDownConductors' + SeparationDistanceDownSerialNo, 'separationDistanceDown', separationDistanceValue, SeparationDistanceDownSerialNo, SeparationDistanceDownHeading
              , displySerialNo, SeparationDistanceDownHeadingUi, (SeparationDistanceDownSerialNo -1),seperationDistanceDownConductorId);
            summaryObservation.remarksName =value +"-"+index+"-"+i;
            summaryObservation.remarksId = seperationDistanceDownConductorId;
            summaryObservation.observationComponentDetails = 'separateDistanceDownConductors' + SeparationDistanceDownSerialNo;
            separationDistanceDown.push(this.populateForm(summaryObservation));
            SeparationDistanceDownSerialNo = SeparationDistanceDownSerialNo + 1;
          }
        }
       }
  }

   //equipotential bonding or earthStud
  updateEarthStudObservation(summaryform: any, earthStudData: any, index: any) {
    this.earthStudFlag[index]=false;
  //  this.summaryArr = this.summaryForm.get('summaryLpsBuildings') as FormArray;
 
    //=========================== EarthStud =================================================

    let earthStudSerialNo = 0;
    let earthStudSerialNoUi = 1;
    let earthStudHeadingUiFlag = true;
    let earthStudRemarkIndex = 1;

    if(earthStudData.earthStudDescription!=null && earthStudData.earthStudDescription!=undefined){
      for (let value of this.earthStudDescName) {
        let separationDistanceValue = earthStudData.earthStudDescription[index][value];
        let earthStudDescId = earthStudData.earthStudDescription[index].earthStudDescId;
        let earthStudHeadingUi = '';
        let earthStudHeading = '';
        let earthStudDesc = summaryform.earthStudDesc as FormArray;
  
        if (value == 'availableEquipotentialBondingRem') {
          earthStudHeading = 'Equipotential Bonding Observation';
        }
  
        let displySerialNo = 0;
        if (separationDistanceValue != '' && separationDistanceValue != null) {
          displySerialNo = earthStudSerialNoUi;
          earthStudSerialNoUi = earthStudSerialNoUi + 1;
        }
   
        if (separationDistanceValue != '' && separationDistanceValue != null && earthStudHeadingUiFlag) {
          earthStudHeadingUi = 'Equipotential Bonding Observation';
          earthStudHeadingUiFlag = false;
          this.earthStudFlag[index]=true;
        }
  
        let summaryObservation = this.isSummaryDataAvilable('equipotentialBonding' + earthStudSerialNo, 'earthStudDescription', separationDistanceValue, earthStudSerialNo, earthStudHeading
          , displySerialNo, earthStudHeadingUi, (earthStudSerialNo - 1),earthStudDescId);
          summaryObservation.remarksName = value +"-"+index;
          summaryObservation.remarksId = earthStudDescId;
        summaryObservation.observationComponentDetails = 'equipotentialBonding' + earthStudSerialNo;
        earthStudDesc.push(this.populateForm(summaryObservation));
        earthStudSerialNo = earthStudSerialNo + 1;
      }
    }
  }

  isSummaryDataAvilable(observationComponentDetails: any, arrayName: any, observationValue: any, serialNo: any, heading: any,
    serialNoUi: any, headingUi: any, remarkIndex: any,remarksId:any): any {

    let summaryObservation = new SummaryLpsObservation();
    summaryObservation.observation = observationValue;
    summaryObservation.serialNo = serialNo;
    summaryObservation.serialNoUi = serialNoUi;
    summaryObservation.headingUi = headingUi;
    summaryObservation.heading = heading;
    summaryObservation.remarksId = remarksId;


    switch (arrayName) {

      case 'airTermination':{
        if (this.airTermination !=null && this.airTermination.length !=0) {
          for(let value of this.airTermination){
            if(value.remarksId == remarksId && value.observationComponentDetails == observationComponentDetails){
              summaryObservation.recommendation = value.recommendation;
              summaryObservation.summaryLpsObservationId = value.summaryLpsObservationId;
            }
          }
       
        }
        return summaryObservation;;
      }
      case 'airVertical':{
        if (this.airTermination1 !=null && this.airTermination1.length !=0) {
          for(let value of this.airTermination1){
            if(value.remarksId == remarksId  && value.observationComponentDetails == observationComponentDetails){
              summaryObservation.recommendation = value.recommendation;
              summaryObservation.summaryLpsObservationId = value.summaryLpsObservationId;

            }
          }
       
        }
        return summaryObservation;;
      }
      case 'airVerticalList':{
        if (this.airTerminationList !=null && this.airTerminationList.length !=0) {
          for(let value of this.airTerminationList){
            if(value.remarksId == remarksId && value.observationComponentDetails == observationComponentDetails){
              summaryObservation.recommendation = value.recommendation;
              summaryObservation.summaryLpsObservationId = value.summaryLpsObservationId;

            }
          }
       
        }
        return summaryObservation;;
      }

      case 'airMesh':{
        if (this.airTermination2 !=null && this.airTermination2.length !=0) {
          for(let value of this.airTermination2){
            if(value.remarksId == remarksId && value.observationComponentDetails == observationComponentDetails){
              summaryObservation.recommendation = value.recommendation;
              summaryObservation.summaryLpsObservationId = value.summaryLpsObservationId;

            }
          }
       
        }
        return summaryObservation;;
      }
      case 'airHolder':{
        if (this.airTermination3 !=null && this.airTermination3.length !=0) {
          for(let value of this.airTermination3){
            if(value.remarksId == remarksId  && value.observationComponentDetails == observationComponentDetails){
              summaryObservation.recommendation = value.recommendation;
              summaryObservation.summaryLpsObservationId = value.summaryLpsObservationId;

            }
          } 
        }
        return summaryObservation;;
      }
      case 'airHolderList':{
        if (this.airTerminationHolderList !=null && this.airTerminationHolderList.length !=0) {
          for(let value of this.airTerminationHolderList){
            if(value.remarksId == remarksId  && value.observationComponentDetails == observationComponentDetails){
              summaryObservation.recommendation = value.recommendation;
              summaryObservation.summaryLpsObservationId = value.summaryLpsObservationId;

            }
          } 
        }
        return summaryObservation;;
      }
      case 'airClamps':{
        if (this.airTermination4 !=null && this.airTermination4.length !=0) {
          for(let value of this.airTermination4){
            if(value.remarksId == remarksId && value.observationComponentDetails == observationComponentDetails){
              summaryObservation.recommendation = value.recommendation;
              summaryObservation.summaryLpsObservationId = value.summaryLpsObservationId;

            }
          } 
        }
        return summaryObservation;;
      }
      case 'airExpansion':{
        if (this.airTermination5 !=null && this.airTermination5.length !=0) {
          for(let value of this.airTermination5){
            if(value.remarksId == remarksId  && value.observationComponentDetails == observationComponentDetails){
              summaryObservation.recommendation = value.recommendation;
              summaryObservation.summaryLpsObservationId = value.summaryLpsObservationId;
            }
          } 
        }
        return summaryObservation;;
      }
      case 'airConnectors':{
        if (this.airTermination6 !=null && this.airTermination6.length !=0) {
          for(let value of this.airTermination6){
            if(value.remarksId == remarksId  && value.observationComponentDetails == observationComponentDetails){
              summaryObservation.recommendation = value.recommendation;
              summaryObservation.summaryLpsObservationId = value.summaryLpsObservationId;
            }
          } 
        }
        return summaryObservation;;
      }

      // downconductor
      case 'downConductorReport':{
        if (this.downConductor1 !=null && this.downConductor1.length !=0) {
          for(let value of this.downConductor1){
            if(value.remarksId == remarksId  && value.observationComponentDetails == observationComponentDetails){
              summaryObservation.recommendation = value.recommendation;
              summaryObservation.summaryLpsObservationId = value.summaryLpsObservationId;
            }
          } 
        }
        return summaryObservation;;
      }
      case 'downConductor':{
        if (this.downConductor2 !=null && this.downConductor2.length !=0) {
          for(let value of this.downConductor2){
            if(value.remarksId == remarksId  && value.observationComponentDetails == observationComponentDetails){
              summaryObservation.recommendation = value.recommendation;
              summaryObservation.summaryLpsObservationId = value.summaryLpsObservationId;
            }
          } 
        }
        return summaryObservation;;
      }
      case 'bridgingDesc':{
        if (this.downConductor3 !=null && this.downConductor3.length !=0) {
          for(let value of this.downConductor3){
            if(value.remarksId == remarksId  && value.observationComponentDetails == observationComponentDetails){
              summaryObservation.recommendation = value.recommendation;
              summaryObservation.summaryLpsObservationId = value.summaryLpsObservationId;
            }
          } 
        }
        return summaryObservation;
      }
      case 'downHolders':{
        if (this.downConductor4 !=null && this.downConductor4.length !=0) {
          for(let value of this.downConductor4){
            if(value.remarksId == remarksId  && value.observationComponentDetails == observationComponentDetails){
              summaryObservation.recommendation = value.recommendation;
              summaryObservation.summaryLpsObservationId = value.summaryLpsObservationId;
            }
          } 
        }
        return summaryObservation;
      }
      case 'downConnectors':{
        if (this.downConductor5 !=null && this.downConductor5.length !=0) {
          for(let value of this.downConductor5){
            if(value.remarksId == remarksId  && value.observationComponentDetails == observationComponentDetails){
              summaryObservation.recommendation = value.recommendation;
              summaryObservation.summaryLpsObservationId = value.summaryLpsObservationId;
            }
          } 
        }
        return summaryObservation;
      }
      case 'testingJoint':{
        if (this.downConductor6 !=null && this.downConductor6.length !=0) {
          for(let value of this.downConductor6){
            if(value.remarksId == remarksId  && value.observationComponentDetails == observationComponentDetails){
              summaryObservation.recommendation = value.recommendation;
              summaryObservation.summaryLpsObservationId = value.summaryLpsObservationId;
            }
          } 
        }
        return summaryObservation;
      }
      case 'lightingCounter':{
        if (this.downConductor7 !=null && this.downConductor7.length !=0) {
          for(let value of this.downConductor7){
            if(value.remarksId == remarksId  && value.observationComponentDetails == observationComponentDetails){
              summaryObservation.recommendation = value.recommendation;
              summaryObservation.summaryLpsObservationId = value.summaryLpsObservationId;
            }
          } 
        }
        return summaryObservation;
      }
      case 'downConductorTesting':{
        if (this.downConductor8 !=null && this.downConductor8.length !=0) {
          for(let value of this.downConductor8){
            if(value.remarksId == remarksId  && value.observationComponentDetails == observationComponentDetails){
              summaryObservation.recommendation = value.recommendation;
              summaryObservation.summaryLpsObservationId = value.summaryLpsObservationId;
            }
          } 
        }
        return summaryObservation;
      } 
      case 'earthingReport':{
        if (this.earthing1 !=null && this.earthing1.length !=0) {
          for(let value of this.earthing1){
            if(value.remarksId == remarksId && value.observationComponentDetails == observationComponentDetails){
              summaryObservation.recommendation = value.recommendation;
              summaryObservation.summaryLpsObservationId = value.summaryLpsObservationId;
            }
          }
       
        }
        return summaryObservation;;
      }
 
      case 'earthingDescription':{
        if (this.earthing2 !=null && this.earthing2.length !=0) {
          for(let value of this.earthing2){
            if(value.remarksId == remarksId && value.observationComponentDetails == observationComponentDetails){
              summaryObservation.recommendation = value.recommendation;
              summaryObservation.summaryLpsObservationId = value.summaryLpsObservationId;
            } 
        }
      }
        return summaryObservation;;
      }

      case 'earthingClamps': {
        if (this.earthing3 != null && this.earthing3.length != 0) {
          for (let value of this.earthing3) {
            if (value.remarksId == remarksId && value.observationComponentDetails == observationComponentDetails){
              summaryObservation.recommendation = value.recommendation;
              summaryObservation.summaryLpsObservationId = value.summaryLpsObservationId;
            }
          }
        }
        return summaryObservation;;
      }

      case 'earthingDescriptionList':{
        if (this.earthingList.length !=0) {
       for(let value of this.earthingList ){
        if (value.remarksId == remarksId && value.observationComponentDetails == observationComponentDetails){
          summaryObservation.recommendation = value.recommendation;
          summaryObservation.summaryLpsObservationId = value.summaryLpsObservationId;
        }
       } 
      }
        return summaryObservation;;
      }

      case 'earthingElectrodeChamber': {
        if (this.earthing4 !=null && this.earthing4.length != 0) {
          for (let value of this.earthing4) {
            if (value.remarksId == remarksId && value.observationComponentDetails == observationComponentDetails){
              summaryObservation.recommendation = value.recommendation;
              summaryObservation.summaryLpsObservationId = value.summaryLpsObservationId;
            }
          }
        }
        return summaryObservation;;
      }
 
      case 'earthingSystem':{
        if (this.earthing5 != null && this.earthing5.length  !=0) {
          for (let value of this.earthing5) {
            if (value.remarksId == remarksId && value.observationComponentDetails == observationComponentDetails){
              summaryObservation.recommendation = value.recommendation;
              summaryObservation.summaryLpsObservationId = value.summaryLpsObservationId;
            }
          }
        }
        return summaryObservation;;
      }

      case 'earthElectrodeTesting':{
        if (this.earthing6 != null && this.earthing6.length  !=0) {
          for (let value of this.earthing6) {
            if (value.remarksId == remarksId && value.observationComponentDetails == observationComponentDetails){
              summaryObservation.recommendation = value.recommendation;
              summaryObservation.summaryLpsObservationId = value.summaryLpsObservationId;
            }
          }
        }
        return summaryObservation;
      }
      case 'spdReport':{
        if ( this.spd1 != null && this.spd1.length !=0) {
          for (let value of this.spd1) {
            if (value.remarksId == remarksId && value.observationComponentDetails == observationComponentDetails){
              summaryObservation.recommendation = value.recommendation;
              summaryObservation.summaryLpsObservationId = value.summaryLpsObservationId;
            }
          }
        }
        return summaryObservation;
      }
      case 'spdDescription':{
        if (this.spd2 != null && this.spd2.length !=0) {
          for (let value of this.spd2) {
            if (value.remarksId == remarksId && value.observationComponentDetails == observationComponentDetails){
              summaryObservation.recommendation = value.recommendation;
              summaryObservation.summaryLpsObservationId = value.summaryLpsObservationId;
            }
          }
        }
        return summaryObservation;
      }
      case 'separationDistance':{
        if (this.separation1 != null && this.separation1.length !=0) {
          for (let value of this.separation1) {
            if (value.remarksId == remarksId && value.observationComponentDetails == observationComponentDetails){
              summaryObservation.recommendation = value.recommendation;
              summaryObservation.summaryLpsObservationId = value.summaryLpsObservationId;
            }
          }
        }
        return summaryObservation;
      }
      case 'separateDistance':{
        if (this.separation2 != null && this.separation2.length !=0) {
          for (let value of this.separation2) {
            if (value.remarksId == remarksId && value.observationComponentDetails == observationComponentDetails){
              summaryObservation.recommendation = value.recommendation;
              summaryObservation.summaryLpsObservationId = value.summaryLpsObservationId;
            }
          }
        }
        return summaryObservation;
      }
      case 'separationDistanceDown':{
        if ( this.separation3 != null && this.separation3.length !=0) {
          for (let value of this.separation3) {
            if (value.remarksId == remarksId && value.observationComponentDetails == observationComponentDetails){
              summaryObservation.recommendation = value.recommendation;
              summaryObservation.summaryLpsObservationId = value.summaryLpsObservationId;
            }
          }
        }
        return summaryObservation;
      }
      case 'earthStudDescription':{
        if ( this.equipotential1 != null && this.equipotential1.length !=0) {
          for (let value of this.equipotential1) {
            if (value.remarksId == remarksId && value.observationComponentDetails == observationComponentDetails){
              summaryObservation.recommendation = value.recommendation;
              summaryObservation.summaryLpsObservationId = value.summaryLpsObservationId;
            }
          }
        }
        return summaryObservation;
      }
    }
  }


      createGroup(item: any): FormGroup { 

        for(let i of item.summaryLpsObservation){
          if(i.observationComponentDetails.includes('airBasicDescription')){ 
            this.airTermination.push(i);
          }
          if(i.observationComponentDetails.includes('lpsVerticalAirTermination')){
            this.airTermination1.push(i); 
          }
          if(i.observationComponentDetails.includes('verticalAirTerminationList')) {
            this.airTerminationList.push(i);
            this.verticalAirterminationListData.push(i);
          }
          if(i.observationComponentDetails.includes('airMeshDescription')){
            this.airTermination2.push(i);
          }
          if(i.observationComponentDetails.includes('airHolderDescription')){
            this.airTermination3.push(i); 
          }

          if(i.observationComponentDetails.includes('airHolderList')){
            this.airTerminationHolderList.push(i);
          }

          if(i.observationComponentDetails.includes('airClamps')){
            this.airTermination4.push(i);
          }
          if(i.observationComponentDetails.includes('airExpansion')){
           this.airTermination5.push(i);
          }
          if(i.observationComponentDetails.includes('airConnectors')){
           this.airTermination6.push(i);
          }
         //down conductors
          if(i.observationComponentDetails.includes('downConductorBasicDescription')){
            this.downConductor1.push(i);
          }
          if(i.observationComponentDetails.includes('downConductorDescription')){
            this.downConductor2.push(i);
          }
          if(i.observationComponentDetails.includes('bridgingDescription')){
            this.downConductor3.push(i);
          }
          if(i.observationComponentDetails.includes('holder')){
           this.downConductor4.push(i);
          }
          if(i.observationComponentDetails.includes('connectors')){
            this.downConductor5.push(i);
          }
          if(i.observationComponentDetails.includes('testingJoint')){
            this.downConductor6.push(i);
          }
          if(i.observationComponentDetails.includes('lightningCounter')){
            this.downConductor7.push(i);
          }
          if(i.observationComponentDetails.includes('downConductorTesting')){
            this.downConductor8.push(i);
          }
          //earthing
          if(i.observationComponentDetails.includes('earthingLpsDescription')){
           this.earthing1.push(i);
          }
          if(i.observationComponentDetails.includes('earthingDescriptionMain')){
           this.earthing2.push(i);  
          }
          if(i.observationComponentDetails.includes('earthingDescriptionList')){
           this.earthingList.push(i);
          }
          if(i.observationComponentDetails.includes('earthingClamps')){
            this.earthing3.push(i);
          }
          if(i.observationComponentDetails.includes('earthingElectrodeChamber')){
            this.earthing4.push(i);
          }
          if(i.observationComponentDetails.includes('earthingSystem')){
            this.earthing5.push(i);
          }
          if(i.observationComponentDetails.includes('earthElectrodeTesting')){
            this.earthing6.push(i);
          }
           //spd
           if(i.observationComponentDetails.includes('spdReport')){
            this.spd1.push(i); 
            }

            if(i.observationComponentDetails.includes('spdDescription')){
             this.spd2.push(i);
            }
           //separation distance
           if(i.observationComponentDetails.includes('seperationDistanceDescription')){
            this.separation1.push(i);  
          }

          if(i.observationComponentDetails.includes('separateDistanceDesc')){
           this.separation2.push(i);
          }

          if(i.observationComponentDetails.includes('separateDistanceDownConductors')){
           this.separation3.push(i);
          }
          //equipotential
          if(i.observationComponentDetails.includes('equipotentialBonding')){
            this.equipotential1.push(i);
          }
        }
        return this.formBuilder.group({
        summaryLpsBuildingsId: new FormControl({disabled: false,value: item.summaryLpsBuildingsId}),
        buildingNumber: new FormControl({disabled: false,value: item.buildingNumber}),
        buildingName: new FormControl({disabled: false,value: item.buildingName}),
        buildingCount: new FormControl({disabled: false,value: item.buildingCount}),
        summaryLpsObservation: this.formBuilder.array([]),
        //air termination
        airTermination: this.formBuilder.array([]),
        airVertical: this.formBuilder.array([]),
        airVerticalList: this.formBuilder.array([]),
        airMesh: this.formBuilder.array([]),
        airHolder: this.formBuilder.array([]),
        airHolderList: this.formBuilder.array([]),
        airClamps: this.formBuilder.array([]),
        airExpansion: this.formBuilder.array([]),
        airConnectors: this.formBuilder.array([]),
        //down conductors
        downConductorReport: this.formBuilder.array([]),
        downConductor: this.formBuilder.array([]),
        bridgingDesc: this.formBuilder.array([]),
        downHolders: this.formBuilder.array([]),
        downConnectors: this.formBuilder.array([]),
        testingJoint: this.formBuilder.array([]),
        lightingCounter: this.formBuilder.array([]),
        downConductorTesting: this.formBuilder.array([]),
        //earthing 
       earthingReport: this.formBuilder.array([]),
       earthingDescription: this.formBuilder.array([]),
       earthingDescriptionList: this.formBuilder.array([]),
        earthingClamps: this.formBuilder.array([]),
       earthingElectrodeChamber: this.formBuilder.array([]),
       earthingSystem: this.formBuilder.array([]),
       earthElectrodeTesting: this.formBuilder.array([]),
        //spd
        spdReport: this.formBuilder.array([]),
        spdReportList: this.formBuilder.array([]),
        //separation distance
        separationDistance: this.formBuilder.array([]),
        separateDistance: this.formBuilder.array([]),
        separationDistanceDown: this.formBuilder.array([]),
        //equipotential bonding
        earthStudDesc: this.formBuilder.array([]),
        flag: new FormControl('A'),
        });
      }
    
    populateArray(item: any){
      let arr:any=[];
      for(let w of item){
        arr.push(this.populateForm(w));
      }
      return arr;
    }

    populateForm(value:any){
      return this.formBuilder.group({
      summaryLpsObservationId: new FormControl({disabled: false,value: value.summaryLpsObservationId}),
      heading: new FormControl({disabled: false,value: value.heading}),
      serialNo: new FormControl({disabled: false,value: value.serialNo}),
      observation: new FormControl({disabled: false,value: value.observation}),
      recommendation: new FormControl({disabled: false,value: value.recommendation}),
      remarksName: new FormControl({disabled: false,value: value.remarksName}),
      remarksId: new FormControl({disabled: false,value: value.remarksId}),
      serialNoUi: new FormControl(value.serialNoUi),
      headingUi: new FormControl(value.headingUi),
      observationComponentDetails: new FormControl({disabled: false,value: value.observationComponentDetails}),
      summaryLpsInnerObservation: this.formBuilder.array([]),
    })
    }
    createGroupDeclaration1(item:any):FormGroup{
      return this.formBuilder.group({
        summaryLpsDeclarationId: new FormControl({disabled: false,value: item.summaryLpsDeclarationId}, Validators.required),
        name: new FormControl({disabled: false,value: item.name}, Validators.required),
        signature: new FormControl({disabled: false,value: item.signature}, Validators.required),
        company: new FormControl({disabled: false,value: item.company}, Validators.required),
        position: new FormControl({disabled: false,value: item.position}, Validators.required),
        address: new FormControl({disabled: false,value: item.address}, Validators.required),
        date: new FormControl({disabled: false,value: item.date}, Validators.required),
        declarationRole: new FormControl({disabled: false,value: item.declarationRole}, Validators.required),
        });
    } 
 
    retrieveObservationLpsSummaryOnload(){
    
      if (this.basicLpsId != undefined && this.addingRemarksCompleted) {
      this.summaryService.retrieveObservationSummaryLps(this.basicLpsId).subscribe(
        data=>{
           this.airTerminationData=JSON.parse(data);
          this.downConductorData=JSON.parse(data);
          this.earthingData=JSON.parse(data);
          this.spdReportData=JSON.parse(data);
          this.separationDistanceData=JSON.parse(data);
          this.equiBondingData=JSON.parse(data);
          this.summaryArr=this.summaryForm.get('summaryLpsBuildings') as FormArray;
         
          for(let w=0; w<this.summaryArr.controls.length; w++){
            //air termination
        if(this.airTerminationData.airTermination!=null){
          //basic
          this.airTerminationArr=[];
            this.airTerminationArr=this.summaryArr.controls[w].controls.airTermination as FormArray;
            let index =0;
            this.airtermiantionFlag[w] = false;
            this.downConductorFlag[w] = false;
            this.earthingFlag[w] = false;
            this.spdFlag[w] = false;
            this.seperationFlag[w] = false;
            this.earthStudFlag[w] = false;

           let airBasicFlag = true;
           let serialNo = 1;

           if(this.airTerminationData!=null && this.airTerminationData.airTermination!=null 
            && this.airTerminationData.airTermination[0]!=null 
            && this.airTerminationData.airTermination[0].lpsAirDiscription!=null 
            && this.airTerminationData.airTermination[0].lpsAirDiscription[w]!=undefined
            && this.airTerminationData.airTermination[0].lpsAirDiscription[w].length!=0 
            && this.airTerminationData.airTermination[0].lpsAirDiscription[w].airBasicDescription!=null){

            for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[w].airBasicDescription){
              for(let j = 0; j < this.airBasicName.length; j++){
               // if(i[this.airBasicName[j]]!="" && i[this.airBasicName[j]]!=null){
                  this.airTerminationArr.push(this.createAirTermination());
                  this.airTerminationArr.controls[index].controls.heading.setValue('AT_Basic Details Observation');

                   if(i[this.airBasicName[j]]!="" && i[this.airBasicName[j]]!=null && airBasicFlag){
                    this.airTerminationArr.controls[index].controls.headingUi.setValue('AT_Basic Details Observation');
                    airBasicFlag = false;
                   }
                   if(i[this.airBasicName[j]]!="" && i[this.airBasicName[j]]!=null){
                    this.airTerminationArr.controls[index].controls.serialNoUi.setValue(serialNo);
                    serialNo = serialNo + 1;
                    this.airtermiantionFlag[w] = true;
                   }
                  this.airTerminationArr.controls[index].controls.observationComponentDetails.setValue('airBasicDescription' + index);
                  this.airTerminationArr.controls[index].controls.serialNo.setValue(index+1);
                  this.airTerminationArr.controls[index].controls.observation.setValue(i[this.airBasicName[j]]);
                  this.airTerminationArr.controls[index].controls.remarksName.setValue(this.airBasicName[j]);
                  this.airTerminationArr.controls[index].controls.remarksId.setValue(i.airBasicDescriptionId);
                  index++;
               // }
              }
          }
           }

            
            //vertical
            this.airVerticalArr
            this.airVerticalArr=this.summaryArr.controls[w].controls.airVertical as FormArray;
            let index1 =0;
            let verticalFlag = true;
            let verticalSerialNo = 1;

            if(this.airTerminationData!=null && this.airTerminationData.airTermination!=null 
              && this.airTerminationData.airTermination[0]!=null 
              && this.airTerminationData.airTermination[0].lpsAirDiscription!=null 
              && this.airTerminationData.airTermination[0].lpsAirDiscription[w]!=undefined
              && this.airTerminationData.airTermination[0].lpsAirDiscription[w].length!=0 
              && this.airTerminationData.airTermination[0].lpsAirDiscription[w].lpsVerticalAirTermination!=null){

              for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[w].lpsVerticalAirTermination){
                for(let j = 0; j < this.airVerticalName.length; j++){
                //  if(i[this.airVerticalName[j]]!="" && i[this.airVerticalName[j]]!= null){
                    this.airVerticalArr.push(this.createAirVertical());
                    this.airVerticalArr.controls[0].controls.heading.setValue('AT_Vertical Observation');
  
                    if(i[this.airVerticalName[j]]!="" && i[this.airVerticalName[j]]!= null && verticalFlag){
                      this.airVerticalArr.controls[index1].controls.headingUi.setValue('AT_Vertical Observation');
                      verticalFlag = false;
                     }
                     if(i[this.airVerticalName[j]]!="" && i[this.airVerticalName[j]]!= null){
                      this.airVerticalArr.controls[index1].controls.serialNoUi.setValue(verticalSerialNo);
                      verticalSerialNo = verticalSerialNo + 1;
                      this.airtermiantionFlag[w] = true;
                     }
                    this.airVerticalArr.controls[index1].controls.observationComponentDetails.setValue('lpsVerticalAirTermination' + index1);
                    this.airVerticalArr.controls[index1].controls.serialNo.setValue(index1 + 1);
                    this.airVerticalArr.controls[index1].controls.observation.setValue(i[this.airVerticalName[j]]);
                    this.airVerticalArr.controls[index1].controls.remarksName.setValue(this.airVerticalName[j]);
                    this.airVerticalArr.controls[index1].controls.remarksId.setValue(i.lpsVerticalAirTerminationId);
                    index1++;
                //  }
                }
              }
            }
            
          //vertical list
          this.airVerticalListArr=this.summaryArr.controls[w].controls.airVerticalList as FormArray;
          let index0 =0;
          let vatListIndex=1;
        
          if(this.airTerminationData!=null 
            && this.airTerminationData.airTermination!=null 
            && this.airTerminationData.airTermination[0]!=null 
            && this.airTerminationData.airTermination[0].lpsAirDiscription!=null 
            && this.airTerminationData.airTermination[0].lpsAirDiscription[w]!=undefined
            && this.airTerminationData.airTermination[0].lpsAirDiscription[w].length!=0 
            && this.airTerminationData.airTermination[0].lpsAirDiscription[w].lpsVerticalAirTermination!=null 
            && this.airTerminationData.airTermination[0].lpsAirDiscription[w].lpsVerticalAirTermination.length!=0 
            && this.airTerminationData.airTermination[0].lpsAirDiscription[w].lpsVerticalAirTermination[0].verticalAirTerminationList!=null){
            
            for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[w].lpsVerticalAirTermination[0].verticalAirTerminationList)
            {
              let verticalListFlag = true;
              let verticalListSerialNo = 1;
              let indexVertical=0;
              for(let j = 0; j < this.airVerticalListName.length; j++){
              //  if(i[this.airVerticalListName[j]]!=""  && i[this.airVerticalListName[j]]!= null){
                  this.airVerticalListArr.push(this.createAirVerticalList());
                  if(indexVertical==0){
                    this.airVerticalListArr.controls[index0].controls.heading.setValue('AT_Vertical List-' + vatListIndex);
                  }

                  if(i[this.airVerticalListName[j]]!=""  && i[this.airVerticalListName[j]]!= null && verticalListFlag){
                    this.airVerticalListArr.controls[index0].controls.headingUi.setValue('AT_Vertical List-' + vatListIndex);
                    verticalListFlag = false;
                   }
                   if(i[this.airVerticalListName[j]]!=""  && i[this.airVerticalListName[j]]!= null){
                    this.airVerticalListArr.controls[index0].controls.serialNoUi.setValue(verticalListSerialNo);
                    verticalListSerialNo = verticalListSerialNo + 1;
                    this.airtermiantionFlag[w] = true;
                   }

                  this.airVerticalListArr.controls[index0].controls.remarksId.setValue(i.verticalAirTerminationListId);
                  this.airVerticalListArr.controls[index0].controls.observationComponentDetails.setValue('verticalAirTerminationList' + index0);
                  this.airVerticalListArr.controls[index0].controls.serialNo.setValue(indexVertical + 1);
                  this.airVerticalListArr.controls[index0].controls.observation.setValue(i[this.airVerticalListName[j]]);
                  this.airVerticalListArr.controls[index0].controls.remarksName.setValue(this.airVerticalListName[j]+"-"+vatListIndex);
                   index0++;
                  indexVertical++;
               // }
              }
              indexVertical=0;
              vatListIndex++;
            }
          }
         
      //mesh
      this.airMeshArr=this.summaryArr.controls[w].controls.airMesh as FormArray;
      let index2 =0;
      let airmeshFlag = true;
      let airmeshSerialNo = 1;

      if(this.airTerminationData!=null 
        && this.airTerminationData.airTermination!=null 
        && this.airTerminationData.airTermination[0]!=null 
        && this.airTerminationData.airTermination[0].lpsAirDiscription[w]!=null 
        && this.airTerminationData.airTermination[0].lpsAirDiscription[w]!=undefined
        && this.airTerminationData.airTermination[0].lpsAirDiscription[w].length!=0 
        && this.airTerminationData.airTermination[0].lpsAirDiscription[w].airMeshDescription!=null){
        for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[w].airMeshDescription){
          for(let j = 0; j < this.airMeshName.length; j++){
          //  if(i[this.airMeshName[j]]!="" && i[this.airMeshName[j]]!= null){
            this.airMeshArr.push(this.createAirMesh());
            this.airMeshArr.controls[0].controls.heading.setValue('AT_Mesh Observation');
  
            if(i[this.airMeshName[j]]!="" && i[this.airMeshName[j]]!= null && airmeshFlag){
              this.airMeshArr.controls[index2].controls.headingUi.setValue('AT_Mesh Observation');
              airmeshFlag = false;
             }
             if(i[this.airMeshName[j]]!="" && i[this.airMeshName[j]]!= null){
              this.airMeshArr.controls[index2].controls.serialNoUi.setValue(airmeshSerialNo);
              airmeshSerialNo = airmeshSerialNo + 1;
              this.airtermiantionFlag[w] = true;
             }
  
            this.airMeshArr.controls[index2].controls.observationComponentDetails.setValue('airMeshDescription' + index2);
            this.airMeshArr.controls[index2].controls.serialNo.setValue(index2+1);
            this.airMeshArr.controls[index2].controls.observation.setValue(i[this.airMeshName[j]]);
            this.airMeshArr.controls[index2].controls.remarksName.setValue(this.airMeshName[j]);
            this.airMeshArr.controls[index2].controls.remarksId.setValue(i.meshDescriptionId);
            index2++;
           // }
          }
      }
      }
  
      //holder
      this.airHolderArr=this.summaryArr.controls[w].controls.airHolder as FormArray;
      let index3 =0;
      let holderFlag = true;
      let holderSerialNo = 1;

      if(this.airTerminationData!=null && this.airTerminationData.airTermination!=null 
        && this.airTerminationData.airTermination[0]!=null 
        && this.airTerminationData.airTermination[0].lpsAirDiscription[w]!=null 
        && this.airTerminationData.airTermination[0].lpsAirDiscription[w]!=undefined
        && this.airTerminationData.airTermination[0].lpsAirDiscription[w].length!=0 
        && this.airTerminationData.airTermination[0].lpsAirDiscription[w].airHolderDescription!=null){
        for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[w].airHolderDescription){
       
          if(holderSerialNo > 7){
            holderSerialNo=1;
            holderFlag=true;
           }
  
          for(let j = 0; j < this.airHolderName.length; j++){
          //  if(i[this.airHolderName[j]]!="" && i[this.airHolderName[j]]!= null){
              this.airHolderArr.push(this.createAirHolder());
              this.airHolderArr.controls[0].controls.heading.setValue('AT_Holder Observation');
              if(i[this.airHolderName[j]]!="" && i[this.airHolderName[j]]!= null && holderFlag){
                this.airHolderArr.controls[index3].controls.headingUi.setValue('AT_Holder Observation');
                holderFlag = false;
               }
               if(i[this.airHolderName[j]]!="" && i[this.airHolderName[j]]!= null){
                this.airHolderArr.controls[index3].controls.serialNoUi.setValue(holderSerialNo);
                holderSerialNo = holderSerialNo + 1;
                this.airtermiantionFlag[w] = true;
               }
              this.airHolderArr.controls[index3].controls.observationComponentDetails.setValue('airHolderDescription' + index3);
              this.airHolderArr.controls[index3].controls.serialNo.setValue(index3+1);
              this.airHolderArr.controls[index3].controls.observation.setValue(i[this.airHolderName[j]]);
              this.airHolderArr.controls[index3].controls.remarksName.setValue(this.airHolderName[j]);
              this.airHolderArr.controls[index3].controls.remarksId.setValue(i.holderDescriptionId);
              index3++;        
           // }
        
          }
        }
      }

      //holder list
      this.airHolderListArr=this.summaryArr.controls[w].controls.airHolderList as FormArray;
      let index01 =0;
      let holderListIndex=1;
      let indexHolder=0;
      
      if(this.airTerminationData!=null && this.airTerminationData.airTermination!=null 
        && this.airTerminationData.airTermination[0]!=null 
        && this.airTerminationData.airTermination[0].lpsAirDiscription!=null 
        && this.airTerminationData.airTermination[0].lpsAirDiscription[w]!=undefined
        && this.airTerminationData.airTermination[0].lpsAirDiscription[w].length!=0 
        && this.airTerminationData.airTermination[0].lpsAirDiscription[w].airHolderDescription!=null 
        && this.airTerminationData.airTermination[0].lpsAirDiscription[w].airHolderDescription.length!=0 
        && this.airTerminationData.airTermination[0].lpsAirDiscription[w].airHolderDescription[0].airHolderList!=null){
   
        for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[w].airHolderDescription[0].airHolderList)
        {
         
          let holderListFlag = true;
          let holderListSerialNo = 1;
           
          for(let j = 0; j < this.airHolderListName.length; j++){
           // if(i[this.airHolderListName[j]]!="" && i[this.airHolderListName[j]]!= null){
              this.airHolderListArr.push(this.createAirHolderList());
              if(indexHolder == 0){
              this.airHolderListArr.controls[index01].controls.heading.setValue('AT_Holder List-' + holderListIndex);
              }

              if(i[this.airHolderListName[j]]!="" && i[this.airHolderListName[j]]!= null && holderListFlag){
                this.airHolderListArr.controls[index01].controls.headingUi.setValue('AT_Holder List-' + holderListIndex);
                holderListFlag = false;
               }
               if(i[this.airHolderListName[j]]!="" && i[this.airHolderListName[j]]!= null){
                this.airHolderListArr.controls[index01].controls.serialNoUi.setValue(holderListSerialNo);
                holderListSerialNo = holderListSerialNo + 1;
                this.airtermiantionFlag[w] = true;
               }
              this.airHolderListArr.controls[index01].controls.remarksId.setValue(i.holderListId);
              this.airHolderListArr.controls[index01].controls.observationComponentDetails.setValue('airHolderList' + index01);
              this.airHolderListArr.controls[index01].controls.serialNo.setValue(indexHolder+1);
              this.airHolderListArr.controls[index01].controls.observation.setValue(i[this.airHolderListName[j]]);
              this.airHolderListArr.controls[index01].controls.remarksName.setValue(this.airHolderListName[j]+"-"+holderListIndex);
               index01++;
              indexHolder++;
           // }
          }
          indexHolder=0;
          holderListIndex++;
        }
      }
     
      //clamps
      this.airClampsArr=this.summaryArr.controls[w].controls.airClamps as FormArray;
      let index4 =0;
      let clampsFlag = true;
      let clampsSerialNo = 1;

      if(this.airTerminationData!=null && this.airTerminationData.airTermination!=null 
        && this.airTerminationData.airTermination[0]!=null 
        && this.airTerminationData.airTermination[0].lpsAirDiscription[w]!=null 
        && this.airTerminationData.airTermination[0].lpsAirDiscription[w]!=undefined
        && this.airTerminationData.airTermination[0].lpsAirDiscription[w].length!=0 
        && this.airTerminationData.airTermination[0].lpsAirDiscription[w].airClamps!=null){

        for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[w].airClamps){
          for(let j = 0; j < this.airClampsName.length; j++){
           // if(i[this.airClampsName[j]]!="" && i[this.airClampsName[j]]!= null){
              this.airClampsArr.push(this.createAirClamps());
              this.airClampsArr.controls[0].controls.heading.setValue('AT_Clamps Observation');
  
              if(i[this.airClampsName[j]]!="" && i[this.airClampsName[j]]!= null && clampsFlag){
                this.airClampsArr.controls[index4].controls.headingUi.setValue('AT_Clamps Observation');
                clampsFlag = false;
               }
               if(i[this.airClampsName[j]]!="" && i[this.airClampsName[j]]!= null){
                this.airClampsArr.controls[index4].controls.serialNoUi.setValue(clampsSerialNo);
                clampsSerialNo = clampsSerialNo + 1;
                this.airtermiantionFlag[w] = true;
               }
  
              this.airClampsArr.controls[index4].controls.observationComponentDetails.setValue('airClamps' + index4);
              this.airClampsArr.controls[index4].controls.serialNo.setValue(index4+1);
              this.airClampsArr.controls[index4].controls.observation.setValue(i[this.airClampsName[j]]);
              this.airClampsArr.controls[index4].controls.remarksName.setValue(this.airClampsName[j]);
              this.airClampsArr.controls[index4].controls.remarksId.setValue(i.clampsId);
              index4++;        
           // }
          }
        }
      }


      //expansion
      this.airExpansionArr=this.summaryArr.controls[w].controls.airExpansion as FormArray;
      let index5 =0;
      let expansionFlag = true;
      let expansionSerialNo = 1;

      if(this.airTerminationData!=null 
        && this.airTerminationData.airTermination!=null 
        && this.airTerminationData.airTermination[0]!=null 
        && this.airTerminationData.airTermination[0].lpsAirDiscription!=null 
        && this.airTerminationData.airTermination[0].lpsAirDiscription[w].length!=0 
        && this.airTerminationData.airTermination[0].lpsAirDiscription[w].airExpansion!=null){
        for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[w].airExpansion){
          for(let j = 0; j < this.airExpansionName.length; j++){
           // if(i[this.airExpansionName[j]]!="" && i[this.airExpansionName[j]]!= null){
              this.airExpansionArr.push(this.createAirExpansion());
  
              if(i[this.airExpansionName[j]]!="" && i[this.airExpansionName[j]]!= null && expansionFlag){
                this.airExpansionArr.controls[index5].controls.headingUi.setValue('AT_Expansion Observation');
                expansionFlag = false;
               }
               if(i[this.airExpansionName[j]]!="" && i[this.airExpansionName[j]]!= null){
                this.airExpansionArr.controls[index5].controls.serialNoUi.setValue(expansionSerialNo);
                expansionSerialNo = expansionSerialNo + 1;
                this.airtermiantionFlag[w] = true;
               }
  
              this.airExpansionArr.controls[0].controls.heading.setValue('AT_Expansion Observation');
              this.airExpansionArr.controls[index5].controls.observationComponentDetails.setValue('airExpansion' + index5);
              this.airExpansionArr.controls[index5].controls.serialNo.setValue(index5+1);
              this.airExpansionArr.controls[index5].controls.observation.setValue(i[this.airExpansionName[j]]);
              this.airExpansionArr.controls[index5].controls.remarksName.setValue(this.airExpansionName[j]);
              this.airExpansionArr.controls[index5].controls.remarksId.setValue(i.expansionId);
              index5++;        
           // }
          }
        }
      }
      
      //connectors
      this.airConnectorsArr=this.summaryArr.controls[w].controls.airConnectors as FormArray;
      let index6 =0;
      let connectorsFlag = true;
      let connectorsSerialNo = 1;
      if(this.airTerminationData!=null 
        && this.airTerminationData.airTermination!=null 
        && this.airTerminationData.airTermination[0]!=null 
        && this.airTerminationData.airTermination[0].lpsAirDiscription!=null 
        && this.airTerminationData.airTermination[0].lpsAirDiscription[w].length!=0 
        && this.airTerminationData.airTermination[0].lpsAirDiscription[w].airExpansion!=null){
        for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[w].airConnectors){
          for(let j = 0; j < this.airConnectorsName.length; j++){
           // if(i[this.airConnectorsName[j]]!="" && i[this.airConnectorsName[j]]!= null){
              this.airConnectorsArr.push(this.createAirConnectors());
  
              if(i[this.airConnectorsName[j]]!="" && i[this.airConnectorsName[j]]!= null && connectorsFlag){
                this.airConnectorsArr.controls[index6].controls.headingUi.setValue('AT_Connectors Observation');
                connectorsFlag = false;
               }
               if(i[this.airConnectorsName[j]]!="" && i[this.airConnectorsName[j]]!= null){
                this.airConnectorsArr.controls[index6].controls.serialNoUi.setValue(connectorsSerialNo);
                connectorsSerialNo = connectorsSerialNo + 1;
                this.airtermiantionFlag[w] = true;
               }
              this.airConnectorsArr.controls[0].controls.heading.setValue('AT_Connectors Observation');
              this.airConnectorsArr.controls[index6].controls.observationComponentDetails.setValue('airConnectors' + index6);
              this.airConnectorsArr.controls[index6].controls.serialNo.setValue(index6+1);
              this.airConnectorsArr.controls[index6].controls.observation.setValue(i[this.airConnectorsName[j]]);
              this.airConnectorsArr.controls[index6].controls.remarksName.setValue(this.airConnectorsName[j]);
              this.airConnectorsArr.controls[index6].controls.remarksId.setValue(i.connectorId);
              index6++;        
           // }
          }
        }
      }
    } 
        //down conductors
        if(this.downConductorData.downConductorReport!=null 
          && this.downConductorData.downConductorReport[0].downConductorDescription.length !=0){
          this.downConductorsBasicArr=this.summaryArr.controls[w].controls.downConductorReport as FormArray;
          let index =0; 
          let dwonconductorReportFlag = true;
          let downConductorReportSerialNo= 1;
          // for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[w]){
              for(let j = 0; j < this.downBasicName.length; j++){
               // if(this.downConductorData.downConductorReport[0].downConductorDescription.length !=0 && this.downConductorData.downConductorReport[0].downConductorDescription[w][this.downBasicName[j]]!="" 
               //    && this.downConductorData.downConductorReport[0].downConductorDescription[w][this.downBasicName[j]] != null){
                  this.downConductorsBasicArr.push(this.createDownConductorsBasic());
                  this.downConductorsBasicArr.controls[0].controls.heading.setValue('DC_Basic Details Observation');

                  if(this.downConductorData.downConductorReport[0].downConductorDescription.length !=0 && this.downConductorData.downConductorReport[0].downConductorDescription[w][this.downBasicName[j]]!="" 
                   && this.downConductorData.downConductorReport[0].downConductorDescription[w][this.downBasicName[j]] != null && dwonconductorReportFlag){
                    this.downConductorsBasicArr.controls[index].controls.headingUi.setValue('DC_Basic Details Observation');
                    dwonconductorReportFlag = false;
                   }
                   if(this.downConductorData.downConductorReport[0].downConductorDescription.length !=0 && this.downConductorData.downConductorReport[0].downConductorDescription[w][this.downBasicName[j]]!="" 
                   && this.downConductorData.downConductorReport[0].downConductorDescription[w][this.downBasicName[j]] != null){
                    this.downConductorsBasicArr.controls[index].controls.serialNoUi.setValue(downConductorReportSerialNo);
                    downConductorReportSerialNo = downConductorReportSerialNo + 1;
                    this.dwonconductorRemarks = true;
                    this.downConductorFlag[w] = true;
                   }

                  this.downConductorsBasicArr.controls[index].controls.observationComponentDetails.setValue('downConductorBasicDescription' + index);
                  this.downConductorsBasicArr.controls[index].controls.serialNo.setValue(index+1);
                  this.downConductorsBasicArr.controls[index].controls.observation.setValue(this.downConductorData.downConductorReport[0].downConductorDescription[w][this.downBasicName[j]]);
                  this.downConductorsBasicArr.controls[index].controls.remarksName.setValue(this.downBasicName[j]);
                  this.downConductorsBasicArr.controls[index].controls.remarksId.setValue(this.downConductorData.downConductorReport[0].downConductorDescription[w].downConduDescId);
                  index++;              
              //  }
              }
          //}
          //downConductor
          this.downConductorsArr=this.summaryArr.controls[w].controls.downConductor as FormArray;
          let index1 =0;
          let dwonconductorFlag = true;
          let downConductorSerialNo = 1;

          if(this.downConductorData!=null 
            && this.downConductorData.downConductorReport!=null 
            && this.downConductorData.downConductorReport[0]!=null 
            && this.downConductorData.downConductorReport[0].downConductorDescription!=null 
            && this.downConductorData.downConductorReport[0].downConductorDescription[w].length!=0 
            && this.downConductorData.downConductorReport[0].downConductorDescription[w].downConductor!=null){
            for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[w].downConductor){
              for(let j = 0; j < this.downConductorName.length; j++){
               // if(i[this.downConductorName[j]]!="" && i[this.downConductorName[j]]!= null){
                  this.downConductorsArr.push(this.createDownConductors());
                  this.downConductorsArr.controls[0].controls.heading.setValue('DC_Downconductors Observation');
                  
                  if(i[this.downConductorName[j]]!="" && i[this.downConductorName[j]]!= null && dwonconductorFlag){
                    this.downConductorsArr.controls[index1].controls.headingUi.setValue('DC_Downconductors Observation');
                   dwonconductorFlag = false;
                  }
                  if(i[this.downConductorName[j]]!="" && i[this.downConductorName[j]]!= null){
                    this.downConductorsArr.controls[index1].controls.serialNoUi.setValue(downConductorSerialNo);
                   downConductorSerialNo = downConductorSerialNo + 1;
                   this.dwonconductorRemarks = true;
                   this.downConductorFlag[w] = true;
                  }
                  this.downConductorsArr.controls[index1].controls.observationComponentDetails.setValue('downConductorDescription' + index1);
                  this.downConductorsArr.controls[index1].controls.serialNo.setValue(index1+1);
                  this.downConductorsArr.controls[index1].controls.observation.setValue(i[this.downConductorName[j]]);
                  this.downConductorsArr.controls[index1].controls.remarksName.setValue(this.downConductorName[j]);
                  this.downConductorsArr.controls[index1].controls.remarksId.setValue(i.downConductorId);
                  index1++;            
               // }
              }
            }
          }
          
        
      //Bridging
      this.bridgingDescArr=this.summaryArr.controls[w].controls.bridgingDesc as FormArray;
      let index2 =0;
      let bridgingFlag = true;
      let bridgingSerialNo = 1;

      if(this.downConductorData!=null 
        && this.downConductorData.downConductorReport!=null 
        && this.downConductorData.downConductorReport[0]!=null 
        && this.downConductorData.downConductorReport[0].downConductorDescription!=null 
        && this.downConductorData.downConductorReport[0].downConductorDescription[w].length!=0 
        && this.downConductorData.downConductorReport[0].downConductorDescription[w].bridgingDescription!=null){

        for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[w].bridgingDescription){
          for(let j = 0; j < this.bridgingName.length; j++){
           // if(i[this.bridgingName[j]]!="" && i[this.bridgingName[j]]!= null){
              this.bridgingDescArr.push(this.createBridgingDesc());
  
              if(i[this.bridgingName[j]]!="" && i[this.bridgingName[j]]!= null && bridgingFlag){
                this.bridgingDescArr.controls[index2].controls.headingUi.setValue('DC_Bridging Observation');
                bridgingFlag = false;
               }
               if(i[this.bridgingName[j]]!="" && i[this.bridgingName[j]]!= null){
                this.bridgingDescArr.controls[index2].controls.serialNoUi.setValue(bridgingSerialNo);
                bridgingSerialNo = bridgingSerialNo + 1;
                this.dwonconductorRemarks = true;
                this.downConductorFlag[w] = true;
               }
  
              this.bridgingDescArr.controls[0].controls.heading.setValue('DC_Bridging Observation');
              this.bridgingDescArr.controls[index2].controls.observationComponentDetails.setValue('bridgingDescription' + index2);
              this.bridgingDescArr.controls[index2].controls.serialNo.setValue(index2+1);
              this.bridgingDescArr.controls[index2].controls.observation.setValue(i[this.bridgingName[j]]);
              this.bridgingDescArr.controls[index2].controls.remarksName.setValue(this.bridgingName[j]);
              this.bridgingDescArr.controls[index2].controls.remarksId.setValue(i.bridgingDescriptionId);
              index2++;        
            //}
          }
      }
      }

      
    //holder
    this.downHoldersArr=this.summaryArr.controls[w].controls.downHolders as FormArray;
    let index3 =0;
    let holderFlag = true;
    let holderSerialNo = 1;

    if(this.downConductorData!=null 
      && this.downConductorData.downConductorReport!=null 
      && this.downConductorData.downConductorReport[0]!=null 
      && this.downConductorData.downConductorReport[0].downConductorDescription!=null 
      && this.downConductorData.downConductorReport[0].downConductorDescription[w].length!=0 
      && this.downConductorData.downConductorReport[0].downConductorDescription[w].holder!=null){

      for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[w].holder){
        for(let j = 0; j < this.downHolderName.length; j++){
         // if(i[this.downHolderName[j]]!="" && i[this.downHolderName[j]]!= null){
            this.downHoldersArr.push(this.createDownHolders());
  
            if(i[this.downHolderName[j]]!="" && i[this.downHolderName[j]]!= null && holderFlag){
              this.downHoldersArr.controls[index3].controls.headingUi.setValue('DC_Holder Observation');
              holderFlag = false;
             }
             if(i[this.downHolderName[j]]!="" && i[this.downHolderName[j]]!= null){
              this.downHoldersArr.controls[index3].controls.serialNoUi.setValue(holderSerialNo);
              holderSerialNo = holderSerialNo + 1;
              this.dwonconductorRemarks = true;
              this.downConductorFlag[w] = true;
             }
            this.downHoldersArr.controls[0].controls.heading.setValue('DC_Holder Observation');
            this.downHoldersArr.controls[index3].controls.observationComponentDetails.setValue('holder' + index3);
            this.downHoldersArr.controls[index3].controls.serialNo.setValue(index3+1);
            this.downHoldersArr.controls[index3].controls.observation.setValue(i[this.downHolderName[j]]);
            this.downHoldersArr.controls[index3].controls.remarksName.setValue(this.downHolderName[j]);
            this.downHoldersArr.controls[index3].controls.remarksId.setValue(i.holderId);
            index3++;      
         // }
        }
     }
    }
    
  
      //connectors
      this.downConnectorsArr=this.summaryArr.controls[w].controls.downConnectors as FormArray;
      let index4 =0;
      let connectorsFlag = true;
      let connectorsSerialNo = 1;

      if(this.downConductorData!=null 
        && this.downConductorData.downConductorReport!=null 
        && this.downConductorData.downConductorReport[0]!=null 
        && this.downConductorData.downConductorReport[0].downConductorDescription!=null 
        && this.downConductorData.downConductorReport[0].downConductorDescription[w].length!=0 
        && this.downConductorData.downConductorReport[0].downConductorDescription[w].connectors!=null){

        for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[w].connectors){
          for(let j = 0; j < this.connectorsName.length; j++){
          //  if(i[this.connectorsName[j]]!="" && i[this.connectorsName[j]]!= null){
              this.downConnectorsArr.push(this.createDownConnectors());
    
              if(i[this.connectorsName[j]]!="" && i[this.connectorsName[j]]!= null && connectorsFlag){
                this.downConnectorsArr.controls[index4].controls.headingUi.setValue('DC_Connectors Observation');
                connectorsFlag = false;
               }
               if(i[this.connectorsName[j]]!="" && i[this.connectorsName[j]]!= null){
                this.downConnectorsArr.controls[index4].controls.serialNoUi.setValue(connectorsSerialNo);
                connectorsSerialNo = connectorsSerialNo + 1;
                this.dwonconductorRemarks = true;
                this.downConductorFlag[w] = true;
               }
              this.downConnectorsArr.controls[0].controls.heading.setValue('DC_Connectors Observation');
              this.downConnectorsArr.controls[index4].controls.observationComponentDetails.setValue('connectors' + index4);
              this.downConnectorsArr.controls[index4].controls.serialNo.setValue(index4+1);
              this.downConnectorsArr.controls[index4].controls.observation.setValue(i[this.connectorsName[j]]);
              this.downConnectorsArr.controls[index4].controls.remarksName.setValue(this.connectorsName[j]);
              this.downConnectorsArr.controls[index4].controls.remarksId.setValue(i.connectorId);
              index4++;      
           // }
          }
          }
      }
      
      //testingJoint
      this.testingJointArr=this.summaryArr.controls[w].controls.testingJoint as FormArray;
      let index5 =0;
      let testingJointFlag = true;
      let testingJointSerialNo = 1;

      if(this.downConductorData!=null
         && this.downConductorData.downConductorReport!=null 
         && this.downConductorData.downConductorReport[0]!=null 
         && this.downConductorData.downConductorReport[0].downConductorDescription!=null 
         && this.downConductorData.downConductorReport[0].downConductorDescription[w].length!=0 
         && this.downConductorData.downConductorReport[0].downConductorDescription[w].testingJoint!=null
         && this.downConductorData.downConductorReport[0].downConductorDescription[w].testingJoint!=0){

        for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[w].testingJoint){
          for(let j = 0; j < this.testingJointName.length; j++){
           // if(i[this.testingJointName[j]]!="" && i[this.testingJointName[j]]!= null){
              this.testingJointArr.push(this.createTestingJoints());
              this.testingJointArr.controls[0].controls.heading.setValue('DC_TestingJoint Observation');
    
              if(i[this.testingJointName[j]]!="" && i[this.testingJointName[j]]!= null && testingJointFlag){
                this.testingJointArr.controls[index5].controls.headingUi.setValue('DC_TestingJoint Observation');
                testingJointFlag = false;
               }
               if(i[this.testingJointName[j]]!="" && i[this.testingJointName[j]]!= null){
                this.testingJointArr.controls[index5].controls.serialNoUi.setValue(testingJointSerialNo);
                testingJointSerialNo = testingJointSerialNo + 1;
                this.dwonconductorRemarks = true;
                this.downConductorFlag[w] = true;
               }
              this.testingJointArr.controls[index5].controls.observationComponentDetails.setValue('testingJoint' + index5);
              this.testingJointArr.controls[index5].controls.serialNo.setValue(index5+1);
              this.testingJointArr.controls[index5].controls.observation.setValue(i[this.testingJointName[j]]);
              this.testingJointArr.controls[index5].controls.remarksName.setValue(this.testingJointName[j]);
              this.testingJointArr.controls[index5].controls.remarksId.setValue(i.testJointId);
              index5++;      
           // }
          }
        }
      }

      else{
        let value = this.downConductorData.downConductorReport[0].downConductorDescription[w].testingJointAvailabilityRem;
        let dwonConductorId = this.downConductorData.downConductorReport[0].downConductorDescription[w].downConduDescId;
        let heading = '';
        let headingUi = '';

        this.testingJointArr.push(this.createTestingJoints());
        this.testingJointArr.controls[0].controls.heading.setValue('DC_TestingJoint Observation');



          this.testingJointArr.controls[index5].controls.headingUi.setValue('DC_TestingJoint Observation');
          testingJointFlag = false;
           this.testingJointArr.controls[index5].controls.serialNoUi.setValue(testingJointSerialNo);
          testingJointSerialNo = testingJointSerialNo + 1;
          this.dwonconductorRemarks = true;
          this.downConductorFlag[w] = true;
         this.testingJointArr.controls[index5].controls.observationComponentDetails.setValue('testingJoint' + index5);
        this.testingJointArr.controls[index5].controls.serialNo.setValue(index5+1);
        this.testingJointArr.controls[index5].controls.observation.setValue(value);
       // this.testingJointArr.controls[index5].controls.remarksName.setValue(this.testingJointName[j]);
        this.testingJointArr.controls[index5].controls.remarksId.setValue(dwonConductorId);
      }
      
      //lightingCounter
      this.lightingCounterArr=this.summaryArr.controls[w].controls.lightingCounter as FormArray;
      let index6 =0;
      let lightingCounterFlag = true;
      let lightningCounterSerialNo = 1;

      if(this.downConductorData!=null 
        && this.downConductorData.downConductorReport!=null 
        && this.downConductorData.downConductorReport[0]!=null 
        && this.downConductorData.downConductorReport[0].downConductorDescription!=null 
        && this.downConductorData.downConductorReport[0].downConductorDescription[w].length!=0 
        && this.downConductorData.downConductorReport[0].downConductorDescription[w].lightningCounter!=null){
        for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[w].lightningCounter){
          for(let j = 0; j < this.lightingCounterName.length; j++){
           // if(i[this.lightingCounterName[j]]!="" && i[this.lightingCounterName[j]]!= null){
              this.lightingCounterArr.push(this.createLightingCounter());
    
              if(i[this.lightingCounterName[j]]!="" && i[this.lightingCounterName[j]]!= null && lightingCounterFlag){
                this.lightingCounterArr.controls[index6].controls.headingUi.setValue('DC_LightningCounter Observation');
                lightingCounterFlag = false;
               }
               if(i[this.lightingCounterName[j]]!="" && i[this.lightingCounterName[j]]!= null){
                this.lightingCounterArr.controls[index6].controls.serialNoUi.setValue(lightningCounterSerialNo);
                lightningCounterSerialNo = lightningCounterSerialNo + 1;
                this.dwonconductorRemarks = true;
                this.downConductorFlag[w] = true;
               }
    
              this.lightingCounterArr.controls[0].controls.heading.setValue('DC_LightningCounter Observation');
              this.lightingCounterArr.controls[index6].controls.observationComponentDetails.setValue('lightningCounter' + index6);
              this.lightingCounterArr.controls[index6].controls.serialNo.setValue(index6+1);
              this.lightingCounterArr.controls[index6].controls.observation.setValue(i[this.lightingCounterName[j]]);
              this.lightingCounterArr.controls[index6].controls.remarksName.setValue(this.lightingCounterName[j]);
              this.lightingCounterArr.controls[index6].controls.remarksId.setValue(i.lightingCountersId);
              index6++;      
           // }
          }
        }
      }
      
      else{
        this.lightingCounterArr.push(this.createLightingCounter());
    
          this.lightingCounterArr.controls[index6].controls.headingUi.setValue('DC_LightningCounter Observation');
          lightingCounterFlag = false;
         
          this.lightingCounterArr.controls[index6].controls.serialNoUi.setValue(lightningCounterSerialNo);
          this.dwonconductorRemarks = true;
          this.downConductorFlag[w] = true;
        
        this.lightingCounterArr.controls[0].controls.heading.setValue('DC_LightningCounter Observation');
        this.lightingCounterArr.controls[index6].controls.observationComponentDetails.setValue('lightningCounter' + index6);
        this.lightingCounterArr.controls[index6].controls.serialNo.setValue(index6+1);
        this.lightingCounterArr.controls[index6].controls.observation.setValue(this.downConductorData.downConductorReport[0].downConductorDescription[w].testingJointAvailabilityRem);
        this.lightingCounterArr.controls[index6].controls.remarksName.setValue('testingJointAvailabilityRem');
        this.lightingCounterArr.controls[index6].controls.remarksId.setValue(this.downConductorData.downConductorReport[0].downConductorDescription[w].lightingCountersId);
      }
  
    //downConductorTesting
    this.downConductorTestingArr=this.summaryArr.controls[w].controls.downConductorTesting as FormArray;
    let index8 =0;
    let dwonconductorTestingFlag = true;
    let dwonconductorTestingSerialNo = 1;

    if(this.downConductorData!=null 
      && this.downConductorData.downConductorReport!=null 
      && this.downConductorData.downConductorReport[0]!=null 
      && this.downConductorData.downConductorReport[0].downConductorDescription!=null 
      && this.downConductorData.downConductorReport[0].downConductorDescription[w].length!=0 
      && this.downConductorData.downConductorReport[0].downConductorDescription[w].downConductorTesting!=null){
      for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[w].downConductorTesting){
        for(let j = 0; j < this.downConductorTestingName.length; j++){
         // if(i[this.downConductorTestingName[j]]!="" && i[this.downConductorTestingName[j]]!= null){
            this.downConductorTestingArr.push(this.createDownConductorsTesting());
            
            if(i[this.downConductorTestingName[j]]!="" && i[this.downConductorTestingName[j]]!= null && dwonconductorTestingFlag){
              this.downConductorTestingArr.controls[index8].controls.headingUi.setValue('DC_DownConductorTesting Observation');
              dwonconductorTestingFlag = false;
             }
             if(i[this.downConductorTestingName[j]]!="" && i[this.downConductorTestingName[j]]!= null){
              this.downConductorTestingArr.controls[index8].controls.serialNoUi.setValue(dwonconductorTestingSerialNo);
              dwonconductorTestingSerialNo = dwonconductorTestingSerialNo + 1;
              this.dwonconductorRemarks = true;
              this.downConductorFlag[w] = true;
             }
    
            this.downConductorTestingArr.controls[0].controls.heading.setValue('DC_DownConductorTesting Observation');
            this.downConductorTestingArr.controls[index8].controls.observationComponentDetails.setValue('downConductorTesting' + index8);
            this.downConductorTestingArr.controls[index8].controls.serialNo.setValue(index8+1);
            this.downConductorTestingArr.controls[index8].controls.observation.setValue(i[this.downConductorTestingName[j]]);
            this.downConductorTestingArr.controls[index8].controls.remarksName.setValue(this.downConductorTestingName[j]);
            this.downConductorTestingArr.controls[index8].controls.remarksId.setValue(i.downConductorTestingId);
            index8++;    
         // }
        }
        }
    }
  }
        //earthing
        let earthingFlag = true;
        let earthingSerialNo = 1;
        if(this.earthingData.earthingReport!=null 
          && this.earthingData.earthingReport[0].earthingLpsDescription.length > w){
          this.earthingReportArr=this.summaryArr.controls[w].controls.earthingReport as FormArray;
          let index =0; 
        // for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[w]){
              for(let j = 0; j < this.earthingReportName.length; j++){
               // if(this.earthingData.earthingReport[0].earthingLpsDescription[w][this.earthingReportName[j]]!="" && this.earthingData.earthingReport[0].earthingLpsDescription[w][this.earthingReportName[j]]!= null){
                  this.earthingReportArr.push(this.createEarthingReport());

                  if(this.earthingData.earthingReport[0].earthingLpsDescription[w][this.earthingReportName[j]]!="" && this.earthingData.earthingReport[0].earthingLpsDescription[w][this.earthingReportName[j]]!= null && earthingFlag){
                    this.earthingReportArr.controls[index].controls.headingUi.setValue('ET_Basic Details Observation');
                    earthingFlag = false;
                  }
                  if(this.earthingData.earthingReport[0].earthingLpsDescription[w][this.earthingReportName[j]]!="" && this.earthingData.earthingReport[0].earthingLpsDescription[w][this.earthingReportName[j]]!= null){
                    this.earthingReportArr.controls[index].controls.serialNoUi.setValue(earthingSerialNo);
                    earthingSerialNo = earthingSerialNo + 1;
                    this.earthingFlag[w] = true;
                  }

                  this.earthingReportArr.controls[0].controls.heading.setValue('ET_Basic Details Observation');
                  this.earthingReportArr.controls[index].controls.observationComponentDetails.setValue('earthingLpsDescription' + (index+1));
                  this.earthingReportArr.controls[index].controls.serialNo.setValue(index+1);
                  this.earthingReportArr.controls[index].controls.observation.setValue(this.earthingData.earthingReport[0].earthingLpsDescription[w][this.earthingReportName[j]]);
                  this.earthingReportArr.controls[index].controls.remarksName.setValue(this.earthingReportName[j]);
                  this.earthingReportArr.controls[index].controls.remarksId.setValue(this.earthingData.earthingReport[0].earthingLpsDescription[w].earthingId);
                  index++;             
               // }
              }
          //}
          //earthingDescription
          let earthingDescriptionFlag = true;
          let earthingDescriptionSerialNo = 1;

          this.earthingDescArr=this.summaryArr.controls[w].controls.earthingDescription as FormArray;
          let index1 =0;

          if(this.earthingData!=null 
            && this.earthingData.earthingReport!=null 
            && this.earthingData.earthingReport[0]!=null 
            && this.earthingData.earthingReport[0].earthingLpsDescription!=null 
            && this.earthingData.earthingReport[0].earthingLpsDescription[w].length!=0 
            && this.earthingData.earthingReport[0].earthingLpsDescription[w].earthingDescription!=null){

            for(let i of this.earthingData.earthingReport[0].earthingLpsDescription[w].earthingDescription){
              for(let j = 0; j < this.earthingDescriptionName.length; j++){
               // if(i[this.earthingDescriptionName[j]]!="" && i[this.earthingDescriptionName[j]]!= null){
                  this.earthingDescArr.push(this.createEarthingDescription());
  
                  if(i[this.earthingDescriptionName[j]]!="" && i[this.earthingDescriptionName[j]]!= null && earthingDescriptionFlag){
                    this.earthingDescArr.controls[index1].controls.headingUi.setValue('EarthingDescription Observation');
                    earthingDescriptionFlag = false;
                  }
                  if(i[this.earthingDescriptionName[j]]!="" && i[this.earthingDescriptionName[j]]!= null){
                    this.earthingDescArr.controls[index1].controls.serialNoUi.setValue(earthingDescriptionSerialNo);
                    earthingDescriptionSerialNo = earthingDescriptionSerialNo + 1;
                    this.earthingFlag[w] = true;
                  }
                  this.earthingDescArr.controls[0].controls.heading.setValue('EarthingDescription Observation');
                  this.earthingDescArr.controls[index1].controls.observationComponentDetails.setValue('earthingDescriptionMain' + index1);
                  this.earthingDescArr.controls[index1].controls.serialNo.setValue(index1+1);
                  this.earthingDescArr.controls[index1].controls.observation.setValue(i[this.earthingDescriptionName[j]]);
                  this.earthingDescArr.controls[index1].controls.remarksName.setValue(this.earthingDescriptionName[j]);
                  this.earthingDescArr.controls[index1].controls.remarksId.setValue(i.earthDescriptionId);
                  index1++;            
                //}
              }
        }
          }
          
      //earthingDescription list
      this.earthingDescriptionListArr=this.summaryArr.controls[w].controls.earthingDescriptionList as FormArray;
      let index0 =0;
      let vatListIndex=1;
      let indexVertical=0;
      
      if(this.earthingData!=null 
        && this.earthingData.earthingReport!=null 
        && this.earthingData.earthingReport[0]!=null 
        && this.earthingData.earthingReport[0].earthingLpsDescription!=null 
        && this.earthingData.earthingReport[0].earthingLpsDescription[w].length!=0 
        && this.earthingData.earthingReport[0].earthingLpsDescription[w].earthingDescription!=null 
        && this.earthingData.earthingReport[0].earthingLpsDescription[w].earthingDescription.length!=0
        && this.earthingData.earthingReport[0].earthingLpsDescription[w].earthingDescription[0].earthingDescriptionList!=null){

        for(let i of this.earthingData.earthingReport[0].earthingLpsDescription[w].earthingDescription[0].earthingDescriptionList)
        {
          let earthingDescriptionListFlag = true;
          let earthingDescriptionListSerialNo = 1;
          for(let j = 0; j < this.earthingDescriptionListName.length; j++){
           // if(i[this.earthingDescriptionListName[j]]!="" && i[this.earthingDescriptionListName[j]]!= null){
              this.earthingDescriptionListArr.push(this.createEarthingDescriptionList());
              if(indexVertical==0){
                this.earthingDescriptionListArr.controls[index0].controls.heading.setValue('EarthingDescription List-' + vatListIndex);
              }

              if(i[this.earthingDescriptionListName[j]]!="" && i[this.earthingDescriptionListName[j]]!= null && earthingDescriptionListFlag){
                this.earthingDescriptionListArr.controls[index0].controls.headingUi.setValue('EarthingDescription List-' + vatListIndex);
                earthingDescriptionListFlag = false;
              }
              if(i[this.earthingDescriptionListName[j]]!="" && i[this.earthingDescriptionListName[j]]!= null){
                this.earthingDescriptionListArr.controls[index0].controls.serialNoUi.setValue(earthingDescriptionListSerialNo);
                earthingDescriptionListSerialNo = earthingDescriptionListSerialNo + 1;
                this.earthingFlag[w] = true;
              }

              this.earthingDescriptionListArr.controls[index0].controls.observationComponentDetails.setValue('earthingDescriptionList' + index0);
              this.earthingDescriptionListArr.controls[index0].controls.serialNo.setValue(indexVertical+1);
              this.earthingDescriptionListArr.controls[index0].controls.observation.setValue(i[this.earthingDescriptionListName[j]]);
              this.earthingDescriptionListArr.controls[index0].controls.remarksName.setValue(this.earthingDescriptionListName[j]);
              this.earthingDescriptionListArr.controls[index0].controls.remarksId.setValue(i.earthDescriptionListId);
              index0++;
              indexVertical++;        
           // }
          }
          indexVertical=0;
          vatListIndex++;
    }
      }
     
      //earthingClamps
      this.earthingClampsArr=this.summaryArr.controls[w].controls.earthingClamps as FormArray;
      let index2 =0;
      let earthingClampsFlag = true;
      let earthingClampsSerialNo = 1;

      if(this.earthingData!=null 
        && this.earthingData.earthingReport!=null 
        && this.earthingData.earthingReport[0]!=null 
        && this.earthingData.earthingReport[0].earthingLpsDescription!=null 
        && this.earthingData.earthingReport[0].earthingLpsDescription[w].length!=0 
        && this.earthingData.earthingReport[0].earthingLpsDescription[w].earthingClamps!=null){ 
        for(let i of this.earthingData.earthingReport[0].earthingLpsDescription[w].earthingClamps){
          for(let j = 0; j < this.earthingClampsName.length; j++){
           // if(i[this.earthingClampsName[j]]!="" && i[this.earthingClampsName[j]]!= null){
              this.earthingClampsArr.push(this.createEarthingClamps());
              this.earthingClampsArr.controls[0].controls.heading.setValue('EarthingClamps Observation');
  
              if(i[this.earthingClampsName[j]]!="" && i[this.earthingClampsName[j]]!= null && earthingClampsFlag){
                this.earthingClampsArr.controls[index2].controls.headingUi.setValue('EarthingClamps Observation');
                earthingClampsFlag = false;
              }
              if(i[this.earthingClampsName[j]]!="" && i[this.earthingClampsName[j]]!= null){
                this.earthingClampsArr.controls[index2].controls.serialNoUi.setValue(earthingClampsSerialNo);
                earthingClampsSerialNo = earthingClampsSerialNo + 1;
                this.earthingFlag[w] = true;
              }
  
              this.earthingClampsArr.controls[index2].controls.observationComponentDetails.setValue('earthingClamps' + index2);
              this.earthingClampsArr.controls[index2].controls.serialNo.setValue(index2+1);
              this.earthingClampsArr.controls[index2].controls.observation.setValue(i[this.earthingClampsName[j]]);
              this.earthingClampsArr.controls[index2].controls.remarksName.setValue(this.earthingClampsName[j]);
              this.earthingClampsArr.controls[index2].controls.remarksId.setValue(i.earthingClampsId);
              index2++;        
           // }
          }
      }
      }
      
      
    //earthingElectrodeChamber
    this.earthingElectrodeChamberArr=this.summaryArr.controls[w].controls.earthingElectrodeChamber as FormArray;
    let index3 =0;
    let earthingElectrodeChamberFlag = true;
    let earthingElectrodeChamberSerialNo = 1;

    if(this.earthingData!=null
       && this.earthingData.earthingReport!=null
        && this.earthingData.earthingReport[0]!=null
         && this.earthingData.earthingReport[0].earthingLpsDescription!=null
          && this.earthingData.earthingReport[0].earthingLpsDescription[w].length!=0 
          && this.earthingData.earthingReport[0].earthingLpsDescription[w].earthingElectrodeChamber!=null){

      for(let i of this.earthingData.earthingReport[0].earthingLpsDescription[w].earthingElectrodeChamber){
        for(let j = 0; j < this.earthingElectrodeChamberName.length; j++){
         // if(i[this.earthingElectrodeChamberName[j]]!="" && i[this.earthingElectrodeChamberName[j]]!= null){
            this.earthingElectrodeChamberArr.push(this.createEarthingElectrodeChamber());
  
            if(i[this.earthingElectrodeChamberName[j]]!="" && i[this.earthingElectrodeChamberName[j]]!= null && earthingElectrodeChamberFlag){
              this.earthingElectrodeChamberArr.controls[index3].controls.headingUi.setValue('EarthingElectrodeChamber Observation');
              earthingElectrodeChamberFlag = false;
            }
            if(i[this.earthingElectrodeChamberName[j]]!="" && i[this.earthingElectrodeChamberName[j]]!= null){
              this.earthingElectrodeChamberArr.controls[index3].controls.serialNoUi.setValue(earthingElectrodeChamberSerialNo);
              earthingElectrodeChamberSerialNo = earthingElectrodeChamberSerialNo + 1;
              this.earthingFlag[w] = true;
            }
            this.earthingElectrodeChamberArr.controls[0].controls.heading.setValue('EarthingElectrodeChamber Observation');
            this.earthingElectrodeChamberArr.controls[index3].controls.observationComponentDetails.setValue('earthingElectrodeChamber' + index3);
            this.earthingElectrodeChamberArr.controls[index3].controls.serialNo.setValue(index3+1);
            this.earthingElectrodeChamberArr.controls[index3].controls.observation.setValue(i[this.earthingElectrodeChamberName[j]]);
            this.earthingElectrodeChamberArr.controls[index3].controls.remarksName.setValue(this.earthingElectrodeChamberName[j]);
            this.earthingElectrodeChamberArr.controls[index3].controls.remarksId.setValue(i.earthingElectrodeChamberId);
            index3++;      
         // }
        }
      }
    }
      //earthingSystem
      this.earthingSystemArr=this.summaryArr.controls[w].controls.earthingSystem as FormArray;
      let index4 =0;
      let earthingSystemFlag = true;
      let earthingSystemserialNo = 1;

      if(this.earthingData!=null 
        && this.earthingData.earthingReport!=null 
        && this.earthingData.earthingReport[0]!=null 
        && this.earthingData.earthingReport[0].earthingLpsDescription!=null 
        && this.earthingData.earthingReport[0].earthingLpsDescription[w].length!=0 
        && this.earthingData.earthingReport[0].earthingLpsDescription[w].earthingSystem!=null){
        for(let i of this.earthingData.earthingReport[0].earthingLpsDescription[w].earthingSystem){
          for(let j = 0; j < this.earthingSystemName.length; j++){
            if( i[this.earthingSystemName[j]]!= null && i[this.earthingSystemName[j]].trim().length != 0){
              this.earthingSystemArr.push(this.createEarthingSystem());
              this.earthingSystemArr.controls[0].controls.heading.setValue('EarthingSystem Observation');
              
                if(i[this.earthingSystemName[j]]!="" && i[this.earthingSystemName[j]]!= null && earthingSystemFlag){
                  this.earthingSystemArr.controls[index4].controls.headingUi.setValue('EarthingSystem Observation');
                  earthingSystemFlag = false;
                }
                if(i[this.earthingSystemName[j]]!="" && i[this.earthingSystemName[j]]!= null){
                  this.earthingSystemArr.controls[index4].controls.serialNoUi.setValue(earthingSystemserialNo);
                  earthingSystemserialNo = earthingSystemserialNo + 1;
                  this.earthingFlag[w] = true;
                }
                this.earthingSystemArr.controls[index4].controls.observation.setValue(i[this.earthingSystemName[j]]);
                this.earthingSystemArr.controls[index4].controls.remarksId.setValue(i.earthingSystemId);
                this.earthingSystemArr.controls[index4].controls.observationComponentDetails.setValue('earthingSystem' + index4);
                this.earthingSystemArr.controls[index4].controls.serialNo.setValue(index4+1); 
                this.earthingSystemArr.controls[index4].controls.remarksName.setValue(this.earthingSystemName[j]);
                index4++; 
            }
          
          }
        }
      }
      
      //earthElectrodeTesting
      this.earthElectrodeTestingArr=this.summaryArr.controls[w].controls.earthElectrodeTesting as FormArray;
      let index5 =0;
      let earthElectodeTestingFlag = true;
      let earthingelectrodeTestingSerialNo = 1;

      if(this.earthingData!=null 
        && this.earthingData.earthingReport!=null 
        && this.earthingData.earthingReport[0]!=null 
        && this.earthingData.earthingReport[0].earthingLpsDescription!=null 
        && this.earthingData.earthingReport[0].earthingLpsDescription[w].length!=0 
        && this.earthingData.earthingReport[0].earthingLpsDescription[w].earthElectrodeTesting!=null){

        for(let j = 0; j < this.earthElectrodeTestingName.length; j++){ 
  
            for(let i of this.earthingData.earthingReport[0].earthingLpsDescription[w].earthElectrodeTesting){
              if( i[this.earthingSystemName[j]]!= null && i[this.earthingSystemName[j]].trim().length != 0){
                this.earthElectrodeTestingArr.push(this.createEarthElectrodeTesting());
            if(i[this.earthElectrodeTestingName[j]]!="" && i[this.earthElectrodeTestingName[j]]!= null && earthElectodeTestingFlag){
              this.earthElectrodeTestingArr.controls[index5].controls.headingUi.setValue('EarthElectrodeTesting Observation');
              earthElectodeTestingFlag = false;
            }
            if(i[this.earthElectrodeTestingName[j]]!="" && i[this.earthElectrodeTestingName[j]]!= null){
              this.earthElectrodeTestingArr.controls[index5].controls.serialNoUi.setValue(earthingelectrodeTestingSerialNo);
              earthingelectrodeTestingSerialNo = earthingelectrodeTestingSerialNo + 1;
              this.earthingFlag[w] = true;
            }
            this.earthElectrodeTestingArr.controls[index5].controls.observation.setValue(i[this.earthElectrodeTestingName[j]]);
            this.earthElectrodeTestingArr.controls[index5].controls.remarksId.setValue(i.earthingElectrodeTestingId);
          }
  
            this.earthElectrodeTestingArr.controls[0].controls.heading.setValue('EarthElectrodeTesting Observation');
            this.earthElectrodeTestingArr.controls[index5].controls.observationComponentDetails.setValue('earthElectrodeTesting' + index5);
            this.earthElectrodeTestingArr.controls[index5].controls.serialNo.setValue(index5+1); 
            this.earthElectrodeTestingArr.controls[index5].controls.remarksName.setValue(this.earthElectrodeTestingName[j]);
            index5++; 
        }     
        }
      }
      
  }
      //spd
      if(this.spdReportData.spdReport!=null  
        && this.spdReportData.spdReport[0].spd !=null
        && this.spdReportData.spdReport[0].spd[w] !=null 
        && this.spdReportData.spdReport[0].spd[w].length !=0){
        //spd report
          this.spdReportArr=this.summaryArr.controls[w].controls.spdReport as FormArray;
          let index =0;
          let spdReportFlag = true;
          let spdReportSerialNo = 1;
          //for(let i of this.spdReportData.spdReport[0].spd){
              for(let j = 0; j < this.spdReportName.length; j++){
              //  if(this.spdReportData.spdReport[0].spd[w][this.spdReportName[j]]!="" && this.spdReportData.spdReport[0].spd[w][this.spdReportName[j]]!= null){
                  this.spdReportArr.push(this.createSpdReport());
                  this.spdReportArr.controls[0].controls.heading.setValue('SPD Details Observation');

                  if(this.spdReportData.spdReport[0].spd[w][this.spdReportName[j]]!=""
                  && this.spdReportData.spdReport[0].spd[w][this.spdReportName[j]]!= null && spdReportFlag){
                    this.spdReportArr.controls[index].controls.headingUi.setValue('SPD Details Observation');
                    spdReportFlag = false;
                  }
                  if(this.spdReportData.spdReport[0].spd[w][this.spdReportName[j]]!=""
                  && this.spdReportData.spdReport[0].spd[w][this.spdReportName[j]]!= null){
                    this.spdReportArr.controls[index].controls.serialNoUi.setValue(spdReportSerialNo);
                    spdReportSerialNo = spdReportSerialNo + 1;
                    this.spdFlag[w] = true;
                  }
                  this.spdReportArr.controls[index].controls.observationComponentDetails.setValue('spdReport' + index);
                  this.spdReportArr.controls[index].controls.serialNo.setValue(index+1);
                  this.spdReportArr.controls[index].controls.observation.setValue(this.spdReportData.spdReport[0].spd[w][this.spdReportName[j]]);
                  this.spdReportArr.controls[index].controls.remarksId.setValue(this.spdReportData.spdReport[0].spd[w].spdReportId);
                  this.spdReportArr.controls[index].controls.remarksName.setValue(this.spdReportName[j]);
                  index++;              
                }
              //}
          //}
        //spd list
        this.spdListArr=this.summaryArr.controls[w].controls.spdReportList as FormArray;
        let index07 =0;
        let vatListIndex=1;
        let indexVertical=0;
        if(this.spdReportData.spdReport!=null  
          && this.spdReportData.spdReport[0].spd !=null
          && this.spdReportData.spdReport[0].spd[w].length !=0
          && this.spdReportData.spdReport[0].spd[w].spdDescription !=null){
          for(let i of this.spdReportData.spdReport[0].spd[w].spdDescription)
          {
            let spdListFlag = true;
            let spdListSerialNo = 1;
  
            for(let j = 0; j < this.spdReportListName.length; j++){
            //  if(i[this.spdReportListName[j]]!="" && i[this.spdReportListName[j]]!= null){
                this.spdListArr.push(this.createSpdReportList());
                if(indexVertical==0){
                  this.spdListArr.controls[index07].controls.heading.setValue('SPD List-' + vatListIndex);
                }
  
                if(i[this.spdReportListName[j]]!="" && i[this.spdReportListName[j]]!= null && spdListFlag){
                  this.spdListArr.controls[index07].controls.headingUi.setValue('SPD List-' + vatListIndex);
                   spdListFlag = false;
                    }
                    if(i[this.spdReportListName[j]]!="" && i[this.spdReportListName[j]]!= null){
                      this.spdListArr.controls[index07].controls.serialNoUi.setValue(spdListSerialNo);
                      spdListSerialNo = spdListSerialNo + 1;
                      this.spdFlag[w] = true;
                    }
  
              // this.spdListArr.controls[0].controls.heading.setValue('SPD List Observation');
                this.spdListArr.controls[index07].controls.observationComponentDetails.setValue('spdDescription' + index07);
                this.spdListArr.controls[index07].controls.serialNo.setValue(indexVertical+1);
                this.spdListArr.controls[index07].controls.observation.setValue(i[this.spdReportListName[j]]);
                this.spdListArr.controls[index07].controls.remarksId.setValue(i.spdDescriptionId);
                this.spdListArr.controls[index07].controls.remarksName.setValue(this.spdReportListName[j]);
                index07++;
                indexVertical++;          
             // }
            }
            indexVertical=0;
            vatListIndex++;
      }
        }
    
      }
      //separationDistance
      if(this.separationDistanceData.seperationDistanceReport!=null 
        && this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription !=null 
        && this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription[w] !=null ){
        //separationDistance report
          this.separationDistanceArr=this.summaryArr.controls[w].controls.separationDistance as FormArray;
          let index =0;
          let separationDistanceFlag = true;
          let separationDistanceSerialNo = 1;
          //for(let i of this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription){
              for(let j = 0; j < this.separationDistanceName.length; j++){
               // if(this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription[w][this.separationDistanceName[j]]!="" && this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription[w][this.separationDistanceName[j]]!= null){
                  this.separationDistanceArr.push(this.createSeparationDistance());
                  this.separationDistanceArr.controls[0].controls.heading.setValue('SeparationDistance Observation');

                if (this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription[w][this.separationDistanceName[j]] != ""
                  && this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription[w][this.separationDistanceName[j]] != null && separationDistanceFlag) {
                  this.separationDistanceArr.controls[index].controls.headingUi.setValue('SeparationDistance Observation');
                  separationDistanceFlag = false;
                }
                if (this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription[w][this.separationDistanceName[j]] != ""
                  && this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription[w][this.separationDistanceName[j]] != null) {
                  this.separationDistanceArr.controls[index].controls.serialNoUi.setValue(separationDistanceSerialNo);
                  separationDistanceSerialNo = separationDistanceSerialNo + 1;
                  this.seperationFlag[w] = true;
                }
                  this.separationDistanceArr.controls[index].controls.observationComponentDetails.setValue('seperationDistanceDescription' + index);
                  this.separationDistanceArr.controls[index].controls.serialNo.setValue(index+1);
                  this.separationDistanceArr.controls[index].controls.observation.setValue(this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription[w][this.separationDistanceName[j]]);
                  this.separationDistanceArr.controls[index].controls.remarksId.setValue(this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription[w].seperationDistanceId);
                  this.separationDistanceArr.controls[index].controls.remarksName.setValue(this.separationDistanceName[j]);
                  index++;              
               // }
              }
        // }
          this.separateDistanceArr=this.summaryArr.controls[w].controls.separateDistance as FormArray;
          let indexS =0;
          let separateDistanceFlag = true;
          let separateDistanceSerialNo = 1;

          if(this.separationDistanceData!=null 
            && this.separationDistanceData.seperationDistanceReport!=null 
            && this.separationDistanceData.airTermination[0]!=null 
            && this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription!=null 
            && this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription[w].length!=0 
            && this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription[w].separateDistance!=null){

            for(let i of this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription[w].separateDistance){
              for(let j = 0; j < this.separateDistanceName.length; j++){
              //  if(i[this.separateDistanceName[j]]!="" && i[this.separateDistanceName[j]]!= null){
                  this.separateDistanceArr.push(this.createSeparateDistance());
                  this.separateDistanceArr.controls[0].controls.heading.setValue('SeparateDistance Observation');
  
                  if (i[this.separateDistanceName[j]]!="" && i[this.separateDistanceName[j]]!= null && separateDistanceFlag) {
                    this.separateDistanceArr.controls[indexS].controls.headingUi.setValue('SeparateDistance Observation');
                  separateDistanceFlag = false;
                }
                if (i[this.separateDistanceName[j]]!="" && i[this.separateDistanceName[j]]!= null) {
                  this.separateDistanceArr.controls[indexS].controls.serialNoUi.setValue(separateDistanceSerialNo);
                  separateDistanceSerialNo = separateDistanceSerialNo + 1;
                  this.seperationFlag[w] = true;
                }
                  this.separateDistanceArr.controls[indexS].controls.observationComponentDetails.setValue('separateDistanceDesc' + indexS);
                  this.separateDistanceArr.controls[indexS].controls.serialNo.setValue(indexS+1);
                  this.separateDistanceArr.controls[indexS].controls.observation.setValue(i[this.separateDistanceName[j]]);
                  this.separateDistanceArr.controls[indexS].controls.remarksId.setValue(i.seperationDistanceDescId);
                  this.separateDistanceArr.controls[indexS].controls.remarksName.setValue(this.separateDistanceName[j]);
                  indexS++;            
               // }
              }
          }
          }
          
        this.separationDistanceDownArr=this.summaryArr.controls[w].controls.separationDistanceDown as FormArray;
        let indexSD =0;
        let separationDistanceDownFlag = true;
        let separationDistanceDownSerialNo = 1;

        if(this.separationDistanceData!=null 
          && this.separationDistanceData.seperationDistanceReport!=null 
          && this.separationDistanceData.airTermination[0]!=null 
          && this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription!=null 
          && this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription[w].length!=0 
          && this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription[w].separateDistanceDownConductors!=null){
          for(let i of this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription[w].separateDistanceDownConductors){
            for(let j = 0; j < this.separateDistanceDownName.length; j++){
            //  if(i[this.separateDistanceDownName[j]]!="" && i[this.separateDistanceDownName[j]]!= null){
                this.separationDistanceDownArr.push(this.createSeparationDownDistance());
                this.separationDistanceDownArr.controls[0].controls.heading.setValue('SeparationDistanceDown Observation');
  
                if (i[this.separateDistanceDownName[j]]!="" && i[this.separateDistanceDownName[j]]!= null && separationDistanceDownFlag) {
                  this.separationDistanceDownArr.controls[indexSD].controls.headingUi.setValue('SeparationDistanceDown Observation');
                  separationDistanceDownFlag = false;
                }
                if (i[this.separateDistanceDownName[j]]!="" && i[this.separateDistanceDownName[j]]!= null) {
                  this.separationDistanceDownArr.controls[indexSD].controls.serialNoUi.setValue(separationDistanceDownSerialNo);
                  separationDistanceDownSerialNo = separationDistanceDownSerialNo + 1;
                  this.seperationFlag[w] = true;
                }
                this.separationDistanceDownArr.controls[indexSD].controls.observationComponentDetails.setValue('separateDistanceDownConductors' + indexSD);
                this.separationDistanceDownArr.controls[indexSD].controls.serialNo.setValue(indexSD+1);
                this.separationDistanceDownArr.controls[indexSD].controls.observation.setValue(i[this.separateDistanceDownName[j]]);
                this.separationDistanceDownArr.controls[indexSD].controls.remarksId.setValue(i.seperationDistanceDownConductorId);
                this.separationDistanceDownArr.controls[indexSD].controls.remarksName.setValue(this.separateDistanceDownName[j]);
                indexSD++;          
            //  }
            }
        }
        }
       
      }

      //equipotential bonding
  
      if(this.equiBondingData.earthStudReport!=null 
        && this.equiBondingData.earthStudReport[0].earthStudDescription !=null 
        && this.equiBondingData.earthStudReport[0].earthStudDescription[w] !=null){
          this.equiBondingArr=this.summaryArr.controls[w].controls.earthStudDesc as FormArray;
          let index =0;
          let earthStudFlag = true;
          let earthStudFlagSerialNo = 1;
          for(let j = 0; j < this.earthStudDescName.length; j++){

                  this.equiBondingArr.push(this.createEarthStudDesc());
                  this.equiBondingArr.controls[0].controls.heading.setValue('EarthStud Observation');

                  if (this.equiBondingData.earthStudReport[0].earthStudDescription[w][this.earthStudDescName[j]]!="" 
                  && this.equiBondingData.earthStudReport[0].earthStudDescription[w][this.earthStudDescName[j]]!= null && earthStudFlag) {
                    this.equiBondingArr.controls[index].controls.headingUi.setValue('EarthStud Observation');
                    earthStudFlag = false;
                  }
                  if (this.equiBondingData.earthStudReport[0].earthStudDescription[w][this.earthStudDescName[j]]!="" 
                  && this.equiBondingData.earthStudReport[0].earthStudDescription[w][this.earthStudDescName[j]]!= null) {
                    this.equiBondingArr.controls[index].controls.serialNoUi.setValue(earthStudFlagSerialNo);
                    earthStudFlagSerialNo = earthStudFlagSerialNo + 1;
                    this.earthStudFlag[w] = true;
                  }
                  this.equiBondingArr.controls[index].controls.observationComponentDetails.setValue('equipotentialBonding' + index);
                  this.equiBondingArr.controls[index].controls.serialNo.setValue(index+1);
                  this.equiBondingArr.controls[index].controls.observation.setValue(this.equiBondingData.earthStudReport[0].earthStudDescription[w][this.earthStudDescName[j]]);
                  this.equiBondingArr.controls[index].controls.remarksId.setValue(this.equiBondingData.earthStudReport[0].earthStudDescription[w].earthStudDescId);
                  this.equiBondingArr.controls[index].controls.remarksName.setValue(this.earthStudDescName[j]);
                  index++;              
             } 
      }
      }
     } 
      )
      }
      this.flag = true;
     
    }

    OkModalDialog(content5: any){
      if(this.summaryForm.dirty && this.summaryForm.touched){ //update msg
        this.modalService.open(content5, { centered: true,backdrop: 'static'});
       }
    }
    closeModalDialog() {
     // this.downloadPdf();
      if (this.errorMsg != "") {
        this.Error = false;
        this.modalService.dismissAll((this.errorMsg = ""));
        this.proceedNext.emit(false);
      } 
      else {
        this.success = false;
        this.modalService.dismissAll((this.successMsg = ""));
        this.proceedNext.emit(false);
        if(this.buttonType == 'save'){
          this.navigateToStep(1);
        }
        else if(this.buttonType != 'save'){
          this.navigateToStep(2);
        }
      }
    }

    navigateToStep(index: any) {
      this.navigateStepSummary.emit(index);
      //this.matStepper.navigateStep(index);
    }

  onSubmit(flag1:any,content:any,contents:any){
    this.submitted = true;
   //SIGNATURE LATEST CHANGES
    if (this.service.bytestring7 != '' && this.service.bytestring7 != undefined) {
      this.summaryForm.value.Declaration1Arr[0].signature=this.service.bytestring7;
      }  
      else {
      this.service.bytestring7 = btoa(this.signarr[0].signature)
      this.summaryForm.value.Declaration1Arr[0].signature=this.service.bytestring7;
      }
      if (this.service.bytestring8 != '' && this.service.bytestring8 != undefined) {
        this.summaryForm.value.Declaration2Arr[0].signature=this.service.bytestring8;
        }  
        else {
        this.service.bytestring8 = btoa(this.signarr1[0].signature)
        this.summaryForm.value.Declaration2Arr[0].signature=this.service.bytestring8;
        }
  
    if (this.summaryForm.invalid && (this.summaryForm.value.summaryLpsBuildings[0].buildingNumber != undefined || this.summaryForm.value.summaryLpsBuildings[0].buildingNumber != '')) 
    {
      this.validationError = true;
      this.validationErrorMsg = 'Please check all the fields';
      setTimeout(() => {
        this.validationError = false;
      }, 3000);
      return 
    }
    else if(this.basicLpsId == 0){
      this.validationError = true;
      this.validationErrorMsg = 'Basics Form is Required, Please fill';
      setTimeout(() => {
        this.validationError = false;
      }, 3000);
      return 
    }
    else if(this.summaryForm.value.summaryLpsBuildings[0].buildingNumber == undefined || this.summaryForm.value.summaryLpsBuildings[0].buildingNumber == ''){
      this.validationError = true;
      this.validationErrorMsg = 'Air Termination Form is Required, Please fill';
      setTimeout(() => {
        this.validationError = false;
      }, 3000);
      return 
    }
    else if(!this.summaryForm.dirty && this.saveButton){  
      
        this.validationError = true;
        this.validationErrorMsg = 'Please change any details for Update the Summary';
        setTimeout(() => {
          this.validationError = false;
        }, 3000);
        return 
      
    }
    else if (this.summaryForm.dirty && this.summaryForm.touched && this.saveButton) {
      let save = true;
      this.modalService.open(content, { centered: true, backdrop: 'static' });
      this.submitAndSave(flag1,save);
      return;
    }
    else if(!this.saveButton){
      const dialogRef = this.dialog.open(ConfirmationBoxComponent, {
            width: '420px',
            maxHeight: '90vh',
            disableClose: true,
          });
          dialogRef.componentInstance.summaryModal = true;
          dialogRef.componentInstance.confirmBox.subscribe(
            (data)=>{
              if(data) {
                let submit = false;
                this.modalService.open(contents, { size: 'md', centered: true, backdrop: 'static'});
                this.submitAndSave(flag1,submit);
              }
        })     
    }
  }

  submitAndSave(flag1:any,typeOfButton:any){
      this.summaryForm.value.summaryLpsBuildings;
    
    this.lpsSummary.userName = this.router.snapshot.paramMap.get('email') || '{}';
    this.lpsSummary.basicLpsId = this.basicLpsId;  
    let a:any=[];
    a=this.summaryForm.controls.summaryLpsBuildings as FormArray;

    for(let i of a.controls){
      let summaryLpsObservationArr=i.controls.summaryLpsObservation as FormArray;
      // Here, We are removing formArry Details 
      summaryLpsObservationArr.clear();

      for(let j of i.controls.airTermination.controls){
      summaryLpsObservationArr.push(j);
      }
      for(let j of i.controls.airVertical.controls){
        summaryLpsObservationArr.push(j);
      }

      for(let j of i.controls.airVerticalList.controls){
        summaryLpsObservationArr.push(j);
      }
      
      for(let j of i.controls.airMesh.controls){
        summaryLpsObservationArr.push(j);
      }
      for(let j of i.controls.airHolder.controls){
        summaryLpsObservationArr.push(j);
      }

      for(let j of i.controls.airHolderList.controls){       
        summaryLpsObservationArr.push(j);
      }

      for(let j of i.controls.airClamps.controls){
      
        summaryLpsObservationArr.push(j);
      }
      for(let j of i.controls.airExpansion.controls){
        summaryLpsObservationArr.push(j);
      }
      for(let j of i.controls.airConnectors.controls){
        summaryLpsObservationArr.push(j);
      }

      for(let j of i.controls.downConductorReport.controls){
        summaryLpsObservationArr.push(j);
      }for(let j of i.controls.downConductor.controls){
        summaryLpsObservationArr.push(j);
      }for(let j of i.controls.bridgingDesc.controls){
        summaryLpsObservationArr.push(j);
      }for(let j of i.controls.downHolders.controls){
        summaryLpsObservationArr.push(j);
      }for(let j of i.controls.downConnectors.controls){
        summaryLpsObservationArr.push(j);
      }for(let j of i.controls.testingJoint.controls){
        summaryLpsObservationArr.push(j);
      }for(let j of i.controls.lightingCounter.controls){
        summaryLpsObservationArr.push(j);
      }for(let j of i.controls.downConductorTesting.controls){
        summaryLpsObservationArr.push(j);
      }

      for(let j of i.controls.earthingReport.controls){
        summaryLpsObservationArr.push(j);
      }
      for(let j of i.controls.earthingDescription.controls){
        summaryLpsObservationArr.push(j);
      }
      for(let j of i.controls.earthingDescriptionList.controls){
        summaryLpsObservationArr.push(j);
      }
      for(let j of i.controls.earthingClamps.controls){
        summaryLpsObservationArr.push(j);
      }for(let j of i.controls.earthingElectrodeChamber.controls){
        summaryLpsObservationArr.push(j);
      }for(let j of i.controls.earthingSystem.controls){
        summaryLpsObservationArr.push(j);
      }for(let j of i.controls.earthElectrodeTesting.controls){
        summaryLpsObservationArr.push(j);
      }

      for(let j of i.controls.spdReport.controls){
        summaryLpsObservationArr.push(j);
      }

      for(let j of i.controls.spdReportList.controls){
        summaryLpsObservationArr.push(j);
      }

      for(let j of i.controls.separationDistance.controls){
        summaryLpsObservationArr.push(j);
      }

      for(let j of i.controls.separateDistance.controls){
        summaryLpsObservationArr.push(j);
      }

      for(let j of i.controls.separationDistanceDown.controls){
        summaryLpsObservationArr.push(j);
      }
      for(let j of i.controls.earthStudDesc.controls){
        summaryLpsObservationArr.push(j);
      }
    }
   
      this.spinner = true;
      this.finalSpinner = true;
      this.popup = false;
      this.popup1 = false
      this.lpsSummary.summaryLpsBuildings=[];
      this.lpsSummary.summaryLpsDeclaration=[];
      this.summaryForm.value.Declaration1Arr[0].signature=this.service.bytestring7;
      this.summaryForm.value.Declaration2Arr[0].signature=this.service.bytestring8;
      this.lpsSummary.summaryLpsBuildings= this.summaryForm.value.summaryLpsBuildings;
      this.lpsSummary.summaryLpsDeclaration= this.summaryForm.value.Declaration1Arr;
      this.lpsSummary.summaryLpsDeclaration = this.lpsSummary.summaryLpsDeclaration.concat(this.summaryForm.value.Declaration2Arr);

    if (!this.validationError) {
      if (this.lpsSummary !=null && this.lpsSummary.summaryLpsId !=undefined && this.lpsSummary.summaryLpsId !=null) {
        this.summaryService.updateSummaryLps(this.lpsSummary,typeOfButton).subscribe(
          (data)=> {
            setTimeout(() =>{
              this.popup=true;
              this.popup1=true;
              this.spinner=false;
              this.finalSpinner=false;
            }, 3000)
            this.success = true;
            // this.summaryForm.markAsPristine();
            this.successMsg = data;
            this.service.allFieldsDisable = true;
            if(this.saveButton){
              this.retriveSummaryWhileUpdateSave();
              this.finalSpinner=false;
              this.saveButton = false;
              this.summaryForm.markAsPristine();
              this.proceedNext.emit(true);
              this.service.lpsClick = 0;
              this.service.logoutClick = 0;
              this.service.windowTabClick = 0;
            }
            else {
              this.popup=true;
              this.spinner=false;
              this.finalSpinner=false;
              this.popup1=true;
              if (this.isEditable) {
                this.success = true;
                this.proceedNext.emit(true);
              } else {
                this.popup=true;
                this.spinner=false;
                this.success = true;
                this.proceedNext.emit(true);
              }
            }
          },
          (error)=> {
            this.popup=true;
            this.spinner=false;
            this.finalSpinner=false;
            this.popup1=true;
            this.finalSpinner=false;
            this.Error = true;
            this.errorArr = [];
            this.errorArr = JSON.parse(error.error);
            this.errorMsg = this.errorArr.message;
        })
      }

      else{
        this.summaryService.addSummaryLps(this.lpsSummary,typeOfButton).subscribe(
          (data)=> {
            setTimeout(() =>{
              this.popup=true;
              this.popup1=true;
              this.spinner=false;
              this.finalSpinner=false;
            }, 3000)
            this.success = true;
            this.successMsg = data;
            if(this.saveButton){
                this.retriveSummaryWhileUpdateSave();
                this.finalSpinner=false;
               
            this.saveButton = false;
            this.summaryForm.markAsPristine();
            }
            else{
              this.popup=true;
              this.popup1=true;
              this.spinner=false;
              this.finalSpinner=false;
              this.proceedNext.emit(false);
            }
          },
          (error)=> {
            this.popup=true;
            this.spinner=false;
            this.finalSpinner=false;
            this.popup1=true;
            this.Error = true;
            // this.errorArr = [];
            // this.errorArr = JSON.parse(error.error);
            this.errorMsg = this.service.globalErrorMsg;

          }
        )};
      }
    }


    retriveSummaryWhileUpdateSave(){
      this.service.lpsClick = 1;
     
      this.summaryService.retrieveWhileSaveUpdate(this.email, this.lpsGlobalservice.basiclpsId).subscribe(
        data => {
          let summary = JSON.parse(data)[0];
          if (summary != undefined) {
             this.retrieveDetailsfromSavedReports('', this.basicLpsId, JSON.parse(data)[0]);
          }
          else {
            this.retrieveFromAirTermination();
            setTimeout(() => {
               this.retrieveObservationLpsSummaryOnload();
            }, 3000);
          }
        });
    }

  gotoNextTab() {
    if ((this.summaryForm.dirty && this.summaryForm.invalid) || this.service.isCompleted7 == false) {
      this.service.isCompleted8 = false;
      this.service.isLinear = true;
      this.service.editable = false;
      this.validationErrorTab = true;
      this.validationErrorMsgTab = 'Please check all the fields in SummaryForm';
      setTimeout(() => {
        this.validationErrorTab = false;
      }, 3000);
      return;
    }
    else if (this.summaryForm.dirty && this.summaryForm.touched) {
      this.service.isCompleted8 = false;
      this.service.isLinear = true;
      this.service.editable = false;
      this.tabError = true;
      this.tabErrorMsg = 'Kindly click on next button to update the changes!';
      setTimeout(() => {
        this.tabError = false;
      }, 3000);
    }
    else {
      this.service.isCompleted8 = true;
      this.service.isLinear = false;
      this.service.editable = true;
    }
  }

  reloadFromBack(){
    if(this.summaryForm.invalid){
     this.service.isCompleted8= false;
     this.service.isLinear=true;
     this.service.editable=false;
     this.validationErrorTab = true;
     this.validationErrorMsgTab= 'Please check all the fields in SummaryForm';
     setTimeout(() => {
      this.validationErrorTab = false;
     }, 3000);
    return false;
    }
    else if(this.summaryForm.dirty && this.summaryForm.touched){
      this.service.isCompleted8= false;
      this.service.isLinear=true;
      this.service.editable=false;
      this.tabError = true;
      this.tabErrorMsg = 'Kindly click on next button to update the changes!';
      setTimeout(() => {
        this.tabError = false;
      }, 3000);
      return false;
    } 
    else {
      this.service.isCompleted8= true;
      this.service.isLinear=false;
      this.service.editable=true;
      this.summaryForm.markAsPristine();
      return true;      
    }
  }

  typeButton(button: any) {
    this.buttonType = button;
    if (button == 'save') {
      this.saveButton = true;
    } else {
      this.saveButton = false;
    }
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

  downloadPdf() {
    this.summaryPdf.downloadSummaryPDF(this.basicLpsId,this.email,this.lpsSummaryPDF);
  }

  onChangeForm(event: any) {
    if (!this.summaryForm.invalid) {
      if (this.summaryForm.dirty) {
        this.validationError = false;
        this.service.lpsClick = 1;
        this.service.logoutClick = 1;
        this.service.windowTabClick = 1;
      }
      else {
        this.validationError = false;
        this.service.lpsClick = 0;
        this.service.logoutClick = 0;
        this.service.windowTabClick = 0;
      }
    }
    else {
      this.service.lpsClick = 1;
      this.service.logoutClick = 1;
      this.service.windowTabClick = 1;
    }
  }
  onKeyForm(event: KeyboardEvent) {
    if (!this.summaryForm.invalid) {
      if (this.summaryForm.dirty) {
        this.validationError = false;
        this.service.lpsClick = 1;
        this.service.logoutClick = 1;
        this.service.windowTabClick = 1;
      }
      else {
        this.validationError = false;
        this.service.lpsClick = 0;
        this.service.logoutClick = 0;
        this.service.windowTabClick = 0;
      }
    }
    else {
      this.service.lpsClick = 1;
      this.service.logoutClick = 1;
      this.service.windowTabClick = 1;
    }
  }

}
