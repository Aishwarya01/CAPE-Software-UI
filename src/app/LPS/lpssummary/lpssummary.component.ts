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

    isEditable:boolean=false;
    submittedButton: boolean = true;
    saveButton: boolean = false;
    buttonType:  string="";
    //For super admin purpose
    //lpsSummaryConstLocal = new SuperAdminLocal();
    lpsSummaryConst = new SuperAdminDev();
    lpsSummaryConstProd = new SuperAdminProd();
    //air termination
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
  }

    ngOnInit(): void {
      this.addingRemarksCompleted = true;
      this.summaryForm = this.formBuilder.group({
        summaryLpsBuildings: this.formBuilder.array([this.summaryLPSArr()]),
        Declaration1Arr: this.formBuilder.array([this.Declaration1Form()]),
        Declaration2Arr: this.formBuilder.array([this.Declaration2Form()]),
        declarationDate: new FormControl('',Validators.required),
        recommendYears: new FormControl('',Validators.required),
      });
      this.numberOfBuildingCount=[]
      this.retrieveFromAirTermination();
      setTimeout(() => {
        this.retriveSummaryWhileUpdateSave();
      }, 3000);
        
    }

    /*e-siganture starts in progress*/ 
SignatureDesigner1(){
  const dialogRef =this.dialog.open(SignatureComponent, {
      maxHeight: '90vh',
      disableClose: true,
    });
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
      if(this.basicLpsId != 0 && this.basicLpsId != undefined) {
        this.airterminationServices.retriveAirTerminationDetails(this.email,this.basicLpsId).subscribe(
          (data) => {
            this.airTerminationValues=[]
            this.airTerminationValues = JSON.parse(data);      
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
      this.jsonData=[]
      if( data.summaryLpsBuildings!=undefined && data.summaryLpsBuildings!=null){
        this.jsonData=data;
      }
      else{
        this.jsonData=data.summaryLps;
       // if(data.summaryLpsBuildings == undefined || data.summaryLpsBuildings == null){
       //  }
      }
     
      // this.retrieveObservationLpsSummaryOnload();
      
      this.lpsSummary.basicLpsId = basicLpsId;
      this.basicLpsId = basicLpsId;
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
       

       for(let item of data.summaryLpsBuildings){
        this.numberOfBuildingCount.push(item.buildingCount);
        this.arr.push(this.createGroup(item));
       }
      
      
       this.arr1.push(this.createGroupDeclaration1( data.summaryLpsDeclaration[0]));
       this.arr2.push(this.createGroupDeclaration1( data.summaryLpsDeclaration[1]));
       
       this.service.signatureImg7=atob(data.summaryLpsDeclaration[0].signature);
       this.service.signatureImg8=atob(data.summaryLpsDeclaration[1].signature);

       this.summaryForm.controls.recommendYears.setValue(data.inspectedYear);
       this.summaryForm.controls.declarationDate.setValue(data.summaryDate);
        this.summaryForm.controls.declarationDate.setValue(data.summaryDate);
       this.summaryForm.setControl('summaryLpsBuildings', this.formBuilder.array(this.arr || []));
       this.summaryForm.setControl('Declaration1Arr', this.formBuilder.array(this.arr1 || []));
       this.summaryForm.setControl('Declaration2Arr', this.formBuilder.array(this.arr2 || []));
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
                for (let j = 0; this.downConductorData.downConductorReport !=null && j < this.downConductorData.downConductorReport[0].downConductorDescription.length; j++) { //retrived observation
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
       let airBasicDescriptionCount=0;
       let airBasicDescriptionSerialNo=1;
       let airBasicDescriptionFlag=true;
        for (let remarkName of this.airBasicName) {
          for (let summaryObservation of summaryform.airTermination.controls) {
            if (summaryObservation.value.remarksName == remarkName) {
                  if(airterminationData.airBasicDescription[0][remarkName] !='' && airterminationData.airBasicDescription[0][remarkName] !=null && airBasicDescriptionFlag){
                    this.airterminationBasicHeaderName[index]= airBasicDescriptionCount;
                    summaryObservation.controls.headingUi.setValue("AT_Basic Details Observation");
                    airBasicDescriptionFlag=false;
                  } 
                  if(airterminationData.airBasicDescription[0][remarkName] !='' && airterminationData.airBasicDescription[0][remarkName] !=null){
                    summaryObservation.controls.serialNoUi.setValue(airBasicDescriptionSerialNo);
                    airBasicDescriptionSerialNo = airBasicDescriptionSerialNo+1;
                  } 
                summaryObservation.controls.observation.setValue(airterminationData.airBasicDescription[0][remarkName]);
                airBasicDescriptionCount=airBasicDescriptionCount+1; 
            }
          }
        }

         //updating airtermination_lpsVerticalAirTermination_Remarks value to summaryAirtermination observation
         let lpsVerticalAirTerminatioCount=0;
         let lpsVerticalAirTerminatioSerialNo=1;
         let lpsVerticalAirTerminationFlag=true;
         for (let remarkName of this.airVerticalName) {
          for (let summaryObservation of summaryform.airVertical.controls) {
            if (summaryObservation.value.remarksName == remarkName) {
              if(airterminationData.lpsVerticalAirTermination[0][remarkName] !='' && airterminationData.lpsVerticalAirTermination[0][remarkName] !=null && lpsVerticalAirTerminationFlag){
                summaryObservation.controls.headingUi.setValue("AT_Vertical Observation");
                lpsVerticalAirTerminationFlag = false;
              } 
              if(airterminationData.lpsVerticalAirTermination[0][remarkName] !='' && airterminationData.lpsVerticalAirTermination[0][remarkName] !=null){
                summaryObservation.controls.serialNoUi.setValue(lpsVerticalAirTerminatioSerialNo);
                lpsVerticalAirTerminatioSerialNo = lpsVerticalAirTerminatioSerialNo+1;
              }
              summaryObservation.controls.observation.setValue(airterminationData.lpsVerticalAirTermination[0][remarkName]);
              lpsVerticalAirTerminatioCount=lpsVerticalAirTerminatioCount+1; 
           
            }
          }
        }

        //updating airtermination_verticalAirTerminationList_Remarks value to summaryAirtermination observation
        //let verticalAirterminationListLength=0;
        let verticalAirTerminationListCount=0;
         
         let verticalAirTerminationListFlag=true;
         let noOfverticalAirTerminationListCount=0;
         let verticalAirTerminationListSerialNo=1;
         for (let summaryObservation of summaryform.airVerticalList.controls) {
         if(verticalAirTerminationListSerialNo > 8){
          verticalAirTerminationListSerialNo=1;
         }
          for (let remarkName of this.airVerticalListName) { 
         
           
              if (summaryObservation.value.remarksName.split("-")[0] == remarkName) {
  
                if(airterminationData.lpsVerticalAirTermination[0].
                  verticalAirTerminationList[(summaryObservation.value.remarksName.split("-")[1])-1][remarkName] !='' && airterminationData.lpsVerticalAirTermination[0].
                  verticalAirTerminationList[(summaryObservation.value.remarksName.split("-")[1])-1][remarkName] !=null && (verticalAirTerminationListFlag || (noOfverticalAirTerminationListCount == verticalAirTerminationListCount)) ){
                   
                  summaryObservation.controls.headingUi.setValue("AT_Vertical List-"+(summaryObservation.value.remarksName.split("-")[1]));
                  verticalAirTerminationListFlag=false;
                  noOfverticalAirTerminationListCount = noOfverticalAirTerminationListCount + 7;
                } 
                else{
                 // summaryObservation.controls.headingUi.setValue("                      ");
                }
                if(airterminationData.lpsVerticalAirTermination[0].
                  verticalAirTerminationList[(summaryObservation.value.remarksName.split("-")[1])-1][remarkName] !='' && airterminationData.lpsVerticalAirTermination[0].
                  verticalAirTerminationList[(summaryObservation.value.remarksName.split("-")[1])-1][remarkName] !=null){
                  summaryObservation.controls.serialNoUi.setValue(verticalAirTerminationListSerialNo);
                  verticalAirTerminationListSerialNo = verticalAirTerminationListSerialNo+1;
                }
                summaryObservation.controls.observation.setValue(airterminationData.lpsVerticalAirTermination[0].
                  verticalAirTerminationList[(summaryObservation.value.remarksName.split("-")[1])-1][remarkName]);
                  verticalAirTerminationListCount=verticalAirTerminationListCount+1;
               // verticalAirterminationListLength=verticalAirterminationListLength+1;
           } 
         }
        }

        //adding new airterminationverticalList
              this.airVerticalListArr=this.summaryArr.controls[index].controls.airVerticalList as FormArray;
              let verticalIndex=verticalAirTerminationListCount/7;
              
              for(let i =verticalIndex; i< airterminationData.lpsVerticalAirTermination[0].verticalAirTerminationList.length;i++){
               let verticalAirTerminationListSerialNo = 0;
                let serialNo=1;
                let verticalListHeadingUiFlag=true;
                for (let remarkName of this.airVerticalListName) { 
                 let verticalListData = this.createAirVerticalList();
                  
                   if(serialNo == 1){

                   // verticalListData.controls.headingUi.setValue("AT_Vertical List-" + (i+1)); 
                    verticalListData.controls.heading.setValue("AT_Vertical List-" + (i+1));
                    
                   }    
                   if(airterminationData.lpsVerticalAirTermination[0].verticalAirTerminationList[i][remarkName] !='' && 
                   airterminationData.lpsVerticalAirTermination[0].verticalAirTerminationList[i][remarkName] !=null ){
                  //  if(verticalAirTerminationListSerialNo == 0){
                      verticalListData.controls.serialNoUi.setValue(verticalAirTerminationListSerialNo+1);
                      verticalAirTerminationListSerialNo = verticalAirTerminationListSerialNo+1;
                    //}
                    
                  }
                  if(airterminationData.lpsVerticalAirTermination[0].verticalAirTerminationList[i][remarkName] !='' && 
                  airterminationData.lpsVerticalAirTermination[0].verticalAirTerminationList[i][remarkName] !=null && verticalListHeadingUiFlag){
                    verticalListData.controls.headingUi.setValue("AT_Vertical List-" + (i+1));
                    verticalListHeadingUiFlag = false; 
                  }
                  else{
                    verticalListData.controls.headingUi.setValue("                      ");
                  }
                  verticalListData.controls.observationComponentDetails.setValue('verticalAirTerminationList' + (serialNo-1));
                  verticalListData.controls.serialNo.setValue(serialNo);
                  verticalListData.controls.observation.setValue(airterminationData.lpsVerticalAirTermination[0].verticalAirTerminationList[i][remarkName]);
                  verticalListData.controls.remarksName.setValue(remarkName +"-"+i);
                  this.airVerticalListArr.push(verticalListData);
            }
          
        }
       

        //updating airtermination_airClamps_Remarks value to summaryAirtermination observation
        let airClampsCount=0;
         let airClampsSerialNo=1;
         let airClampsFlag=true;
         for (let remarkName of this.airClampsName) {
          for (let summaryObservation of summaryform.airClamps.controls) {
            if (summaryObservation.value.remarksName == remarkName) {

              if(airterminationData.airClamps[0][remarkName] !='' && airterminationData.airClamps[0][remarkName] !=null &&  airClampsFlag){
                this.airterminationClampsHeaderName[index]= airClampsCount;
                summaryObservation.controls.headingUi.setValue("AT_Clamps Observation");
                airClampsFlag= false
              } 
              if(airterminationData.airClamps[0][remarkName] !='' && airterminationData.airClamps[0][remarkName] !=null){
                summaryObservation.controls.serialNoUi.setValue(airClampsSerialNo);
                airClampsSerialNo = airClampsSerialNo+1;
              }
              summaryObservation.controls.observation.setValue(airterminationData.airClamps[0][remarkName]);
              airClampsCount=airClampsCount+1; 

            }
          }
        }

        //updating airtermination_airConnectors_Remarks value to summaryAirtermination observation
        let airConnectorsCount=0;
        let airConnectorsSerialNo=1;
        let airConnectorsFlag=true;
         for (let remarkName of this.airConnectorsName) {
          for (let summaryObservation of summaryform.airConnectors.controls) {
            if (summaryObservation.value.remarksName == remarkName) {

              if(airterminationData.airConnectors[0][remarkName] !='' && airterminationData.airConnectors[0][remarkName] !=null && airConnectorsFlag){
                this.airterminationConnectorHeaderName[index]= airConnectorsCount;
                summaryObservation.controls.headingUi.setValue("AT_Connectors Observation");
                airConnectorsFlag=false;
              } 
              if(airterminationData.airConnectors[0][remarkName] !='' && airterminationData.airConnectors[0][remarkName] !=null){
                summaryObservation.controls.serialNoUi.setValue(airConnectorsSerialNo);
                airConnectorsSerialNo = airConnectorsSerialNo+1;
              }

              summaryObservation.controls.observation.setValue(airterminationData.airConnectors[0][remarkName]);
              airConnectorsCount=airConnectorsCount+1; 

            }
          }
        }

        //updating airtermination_airExpansion_Remarks value to summaryAirtermination observation
        let airExpansionCount=0;
        let airExpansionSerialNo=1;
        let airExpansionFlag=true;
         for (let remarkName of this.airExpansionName) {
          for (let summaryObservation of summaryform.airExpansion.controls) {
            if (summaryObservation.value.remarksName == remarkName) {

              if(airterminationData.airExpansion[0][remarkName] !='' && airterminationData.airExpansion[0][remarkName] !=null && airExpansionFlag){
                this.airterminationExpansionHeaderName[index]= airExpansionCount;
                summaryObservation.controls.headingUi.setValue("AT_Expansion Observation");

                airExpansionFlag= false;
              } 
              if(airterminationData.airExpansion[0][remarkName] !='' && airterminationData.airExpansion[0][remarkName] !=null){
                summaryObservation.controls.serialNoUi.setValue(airExpansionSerialNo);
                airExpansionSerialNo = airExpansionSerialNo+1;
              }
              summaryObservation.controls.observation.setValue(airterminationData.airExpansion[0][remarkName]);
              airExpansionCount=airExpansionCount+1; 

            }
          }
        }

        //updating airtermination_airHolderDescription_Remarks value to summaryAirtermination observation
        let airHolderDescriptionCount=0;
        let airHolderDescriptionSerialNo=1;
        let airHolderDescriptionFlag=true;
         for (let remarkName of this.airHolderName) {
          for (let summaryObservation of summaryform.airHolder.controls) {
            if (summaryObservation.value.remarksName == remarkName) {

              if(airterminationData.airHolderDescription[0][remarkName] !='' && airterminationData.airHolderDescription[0][remarkName] !=null && airHolderDescriptionFlag){
                this.airterminationHolderHeaderName[index]= airHolderDescriptionCount;
                summaryObservation.controls.headingUi.setValue("AT_Holder Observation");

                airHolderDescriptionFlag = false;
              } 
              if(airterminationData.airHolderDescription[0][remarkName] !='' && airterminationData.airHolderDescription[0][remarkName] !=null){
                summaryObservation.controls.serialNoUi.setValue(airHolderDescriptionSerialNo);
                airHolderDescriptionSerialNo = airHolderDescriptionSerialNo+1;
              }
              summaryObservation.controls.observation.setValue(airterminationData.airHolderDescription[0][remarkName]);
              airHolderDescriptionCount=airHolderDescriptionCount+1; 

            }
          }
        }

  

        //updating airtermination_airHolderList_Remarks value to summaryAirtermination observation
      //  let airholderLength=0;
        let airHolderListCount=0;
        let airHolderListSerialNo=1;
        let airHolderListFlag=true;
        for (let summaryObservation of summaryform.airHolderList.controls) {

          if(airHolderListSerialNo > 7){
            airHolderListSerialNo=1;
            airHolderListFlag=true;
           }
         for (let remarkName of this.airHolderListName) {
            if (summaryObservation.value.remarksName.split("-")[0] == remarkName) {

            let observation =  airterminationData.airHolderDescription[0].airHolderList[(summaryObservation.value.remarksName.split("-")[1])-1][remarkName];
              if(observation !='' && observation !=null && airHolderListFlag){
                //this.airterminationHolderListHeaderName[index]= airHolderListCount;
                summaryObservation.controls.headingUi.setValue('AT_Holder List-' + summaryObservation.value.remarksName.split("-")[1]);
                airHolderListFlag= false;
              } 
              if(observation !='' && observation !=null){
                summaryObservation.controls.serialNoUi.setValue(airHolderListSerialNo);
                airHolderListSerialNo = airHolderListSerialNo+1;
              }
              summaryObservation.controls.observation.setValue(observation);
              airHolderListCount=airHolderListCount+1; 

           //   airholderLength= airholderLength+1;
            }
          }
        }

        //adding new holderlist remarks
        this.airHolderListArr=this.summaryArr.controls[index].controls.airHolderList as FormArray;
        let holderIndex=(this.airHolderListArr.length)/6;
                 
        for(let i = holderIndex; i< airterminationData.airHolderDescription[0].airHolderList.length;i++){
           let airHolderListSerialNo = 0;
           let serialNo=1;
           let holderListHeadingUiFlag=true;
           for (let remarkName of this.airHolderListName) { 
            let holderListData = this.createAirHolderList();
             
              if(serialNo == 1){
              holderListData.controls.heading.setValue('AT_Holder List-' + (i+1));
              }    
              if(airterminationData.airHolderDescription[0].airHolderListt[i][remarkName] !='' && 
              airterminationData.airHolderDescription[0].airHolderList[i][remarkName] !=null ){
              holderListData.controls.serialNoUi.setValue(airHolderListSerialNo+1);
              airHolderListSerialNo = airHolderListSerialNo+1;
               
             }
             if(airterminationData.airHolderDescription[0].airHolderList[i][remarkName] !='' && 
             airterminationData.airHolderDescription[0].airHolderList[i][remarkName] !=null && holderListHeadingUiFlag){
              holderListData.controls.headingUi.setValue('AT_Holder List-' + (i+1));
              holderListHeadingUiFlag = false; 
             }
             else{
             // holderListData.controls.headingUi.setValue("                      ");
             }
             //verticalListData.controls.observationComponentDetails.setValue('verticalAirTerminationList' + (serialNo-1));
             holderListData.controls.serialNo.setValue(serialNo);
             holderListData.controls.observation.setValue(airterminationData.airHolderDescription[0].airHolderList[i][remarkName]);
             holderListData.controls.remarksName.setValue(remarkName +"-"+i);
             this.airHolderListArr.push(holderListData);
       }
     
   }
        //updating airtermination_airMeshDescription_Remarks value to summaryAirtermination observation
        let airMeshDescriptionCount=0;
        let airMeshDescriptionSerialNo=1;
        let airMeshDescriptionFlag=true;
        for (let remarkName of this.airMeshName) {
          for (let summaryObservation of summaryform.airMesh.controls) {
            if (summaryObservation.value.remarksName == remarkName) {

              if(airterminationData.airMeshDescription[0][remarkName] !='' && airterminationData.airMeshDescription[0][remarkName] !=null && airMeshDescriptionFlag){
                this.airterminationMeshConductorHeaderName[index]= airMeshDescriptionCount;
                summaryObservation.controls.headingUi.setValue("AT_Mesh Observation");
                airMeshDescriptionFlag = false;
              } 
              if(airterminationData.airMeshDescription[0][remarkName] !='' && airterminationData.airMeshDescription[0][remarkName] !=null){
                summaryObservation.controls.serialNoUi.setValue(airMeshDescriptionSerialNo);
                airMeshDescriptionSerialNo = airMeshDescriptionSerialNo+1;
              }
              summaryObservation.controls.observation.setValue(airterminationData.airMeshDescription[0][remarkName]);
              airMeshDescriptionCount=airMeshDescriptionCount+1; 

            }
          }
        } 
      }
      updateSummaryDwonConductorObervation(summaryform: any, dwonConductorData: any, index: any) {


          //updating downConductorReport_remarks value to summarydownconductor observation
          let indeXOfDownConductor = 0;
          let downConductorReportFlag = true;
          let downConductorReportCount = 0;
          let downConductorReportSerialNo = 1;

          for (let remarkName of this.downBasicName) {
            if (summaryform.downConductorReport != null && summaryform.downConductorReport != []
              && summaryform.downConductorReport.length != 0 && indeXOfDownConductor == 0) {
              for (let summaryObservation of summaryform.downConductorReport.controls) {
                if (summaryObservation.value.remarksName == remarkName) {

                  if (dwonConductorData.downConductorDescription[0][remarkName] != '' && dwonConductorData.downConductorDescription[0][remarkName] != null && downConductorReportFlag) {
                    // this.downConducotorsBasicHeaderName[index] = downConductorReportCount;
                    summaryObservation.controls.headingUi.setValue('DC_Basic Details Observation');
                    downConductorReportFlag = false;
                  }

                  //serial no
                  if (dwonConductorData.downConductorDescription[0][remarkName] != '' && dwonConductorData.downConductorDescription[0][remarkName] != null) {
                    summaryObservation.controls.serialNoUi.setValue(downConductorReportSerialNo);
                    downConductorReportSerialNo = downConductorReportSerialNo + 1;
                  }

                  summaryObservation.controls.observation.setValue(dwonConductorData.downConductorDescription[index][remarkName]);
                  downConductorReportCount = downConductorReportCount + 1;
                }
              }
            }
            else {

              // this.downConductorsBasicArr=[];

              this.downConductorsBasicArr = this.summaryArr.controls[index].controls.downConductorReport as FormArray;
              this.downConductorsBasicArr.push(this.createDownConductorsBasic());


              if (dwonConductorData.downConductorDescription[0][remarkName] != '' && dwonConductorData.downConductorDescription[0][remarkName] != null && downConductorReportFlag) {
                // this.downConducotorsBasicHeaderName[index] = downConductorReportCount;
                this.downConductorsBasicArr.controls[indeXOfDownConductor].controls.headingUi.setValue('DC_Basic Details Observation');
                downConductorReportFlag = false;
              }
              if (dwonConductorData.downConductorDescription[0][remarkName] != '' && dwonConductorData.downConductorDescription[0][remarkName] != null) {
                this.downConductorsBasicArr.controls[indeXOfDownConductor].controls.serialNoUi.setValue(downConductorReportSerialNo);
                downConductorReportSerialNo = downConductorReportSerialNo + 1;
              }

              this.downConductorsBasicArr.controls[0].controls.heading.setValue('DC_Basic Details Observation');
              this.downConductorsBasicArr.controls[indeXOfDownConductor].controls.observationComponentDetails.setValue('downConductorBasicDescription' + index);
              this.downConductorsBasicArr.controls[indeXOfDownConductor].controls.serialNo.setValue(indeXOfDownConductor + 1);
              this.downConductorsBasicArr.controls[indeXOfDownConductor].controls.observation.setValue(dwonConductorData.downConductorDescription[index][remarkName]);
              this.downConductorsBasicArr.controls[indeXOfDownConductor].controls.remarksName.setValue(remarkName);
              indeXOfDownConductor++;
              downConductorReportCount = downConductorReportCount + 1;
            }

          }

          //updating downConductor_remarks value to summarydownconductor observation
          let indeXOfConductor = 0;

          let downConductorFlag = true;
          let downConductorCount = 0;
          let downConductorSerialNo = 1;

          for (let remarkName of this.downConductorName) {
            if (summaryform.downConductor != null && summaryform.downConductor != []
              && summaryform.downConductor.length != 0 && indeXOfConductor == 0) {
              for (let summaryObservation of summaryform.downConductor.controls) {
                if (summaryObservation.value.remarksName == remarkName) {

                  if (dwonConductorData.downConductorDescription[index].downConductor[0][remarkName] != '' &&
                    dwonConductorData.downConductorDescription[index].downConductor[0][remarkName] && downConductorFlag) {
                    // this.downConducotorsDownConductorHeaderName[index] = downConductorCount;
                    summaryObservation.controls.headingUi.setValue('DC_Downconductors Observation');
                    downConductorFlag = false;
                  }

                  if (dwonConductorData.downConductorDescription[index].downConductor[0][remarkName] != '' &&
                    dwonConductorData.downConductorDescription[index].downConductor[0][remarkName] != null) {
                    summaryObservation.controls.serialNoUi.setValue(downConductorSerialNo);
                    downConductorSerialNo = downConductorSerialNo + 1;
                  }

                  summaryObservation.controls.observation.setValue(dwonConductorData.downConductorDescription[index].downConductor[0][remarkName]);
                  downConductorCount = downConductorCount + 1;
                }
              }
            }
            else {
              //this.downConductorsArr=[];
              this.downConductorsArr.push(this.createDownConductors());
              this.downConductorsArr.controls[0].controls.heading.setValue('DC_Downconductors Observation');
              if (dwonConductorData.downConductorDescription[index].downConductor[0][remarkName] != '' &&
                dwonConductorData.downConductorDescription[index].downConductor[0][remarkName] && downConductorFlag) {
                // this.downConducotorsDownConductorHeaderName[index] = downConductorCount;
                this.downConductorsArr.controls[indeXOfConductor].controls.headingUi.setValue('DC_Downconductors Observation');
                downConductorFlag = false;
              }
              if (dwonConductorData.downConductorDescription[index].downConductor[0][remarkName] != '' &&
                dwonConductorData.downConductorDescription[index].downConductor[0][remarkName] != null) {
                this.downConductorsArr.controls[indeXOfConductor].controls.serialNoUi.setValue(downConductorSerialNo);
                downConductorSerialNo = downConductorSerialNo + 1;
              }
              this.downConductorsArr.controls[indeXOfConductor].controls.observationComponentDetails.setValue('downConductorDescription' + index);
              this.downConductorsArr.controls[indeXOfConductor].controls.serialNo.setValue(indeXOfConductor + 1);
              this.downConductorsArr.controls[indeXOfConductor].controls.observation.setValue(dwonConductorData.downConductorDescription[index].downConductor[0][remarkName]);
              this.downConductorsArr.controls[indeXOfConductor].controls.remarksName.setValue(remarkName);
              indeXOfConductor++;
              downConductorCount = downConductorCount + 1;
            }
          }

          //updating bridgingDescription_remarks value to summarydownconductor observation
          let indexOfBridging = 0;
          let bridgingDescriptionFlag = true;
          let bridgingDescriptionCount = 0;
          let bridgingDescriptionSerialNo = 1;
          for (let remarkName of this.bridgingName) {
            if (summaryform.bridgingDesc != null && summaryform.bridgingDesc != []
              && summaryform.bridgingDesc.length != 0 && indexOfBridging == 0) {
              for (let summaryObservation of summaryform.bridgingDesc.controls) {
                if (summaryObservation.value.remarksName == remarkName) {

                  if (dwonConductorData.downConductorDescription[index].bridgingDescription[0][remarkName] != '' &&
                    dwonConductorData.downConductorDescription[index].bridgingDescription[0][remarkName] && bridgingDescriptionFlag) {
                    // this.downConducotorsBridgingHeaderName[index] = bridgingDescriptionCount;
                    summaryObservation.controls.headingUi.setValue('DC_Bridging Observation');
                    bridgingDescriptionFlag = false;
                  }
                  if (dwonConductorData.downConductorDescription[index].bridgingDescription[0][remarkName] != '' &&
                    dwonConductorData.downConductorDescription[index].bridgingDescription[0][remarkName] != null) {
                    summaryObservation.controls.serialNoUi.setValue(bridgingDescriptionSerialNo);
                    bridgingDescriptionSerialNo = bridgingDescriptionSerialNo + 1;
                  }

                  summaryObservation.controls.observation.setValue(dwonConductorData.downConductorDescription[index].bridgingDescription[0][remarkName]);
                  bridgingDescriptionCount = bridgingDescriptionCount + 1;
                }
              }
            }
            else {

              this.bridgingDescArr.push(this.createBridgingDesc());
              this.bridgingDescArr.controls[0].controls.heading.setValue('DC_Bridging Observation');
              if (dwonConductorData.downConductorDescription[index].bridgingDescription[0][remarkName] != '' &&
                dwonConductorData.downConductorDescription[index].bridgingDescription[0][remarkName] && bridgingDescriptionFlag) {
                // this.downConducotorsBridgingHeaderName[index] = bridgingDescriptionCount;
                this.bridgingDescArr.controls[indexOfBridging].controls.headingUi.setValue('DC_Bridging Observation');
                bridgingDescriptionFlag = false;
              }
              if (dwonConductorData.downConductorDescription[index].bridgingDescription[0][remarkName] != '' &&
                dwonConductorData.downConductorDescription[index].bridgingDescription[0][remarkName] != null) {
                this.bridgingDescArr.controls[indexOfBridging].controls.serialNoUi.setValue(bridgingDescriptionSerialNo);
                bridgingDescriptionSerialNo = bridgingDescriptionSerialNo + 1;
              }

              this.bridgingDescArr.controls[indexOfBridging].controls.observationComponentDetails.setValue('bridgingDescription' + index);
              this.bridgingDescArr.controls[indexOfBridging].controls.serialNo.setValue(indexOfBridging + 1);
              this.bridgingDescArr.controls[indexOfBridging].controls.observation.setValue(dwonConductorData.downConductorDescription[index].bridgingDescription[0][remarkName]);
              this.bridgingDescArr.controls[indexOfBridging].controls.remarksName.setValue(remarkName);
              indexOfBridging++;
              bridgingDescriptionCount = bridgingDescriptionCount + 1;
            }
          }

          //updating holder_remarks value to summarydownconductor observation
          let holderDescriptionFlag = true;
          let holderDescriptionCount = 0;
          let holderDescriptionSerialNo = 1;
          let indexOfHolder = 0;
          for (let remarkName of this.downHolderName) {
            if (summaryform.downHolders != null && summaryform.downHolders != []
              && summaryform.downHolders.length != 0 && indexOfHolder == 0) {
              for (let summaryObservation of summaryform.downHolders.controls) {
                if (summaryObservation.value.remarksName == remarkName) {

                  if (dwonConductorData.downConductorDescription[index].holder[0][remarkName] != '' &&
                    dwonConductorData.downConductorDescription[index].holder[0][remarkName] && holderDescriptionFlag) {
                    // this.downConducotorsHolderHeaderName[index] = holderDescriptionCount;
                    summaryObservation.controls.headingUi.setValue('DC_Holder Observation');
                    holderDescriptionFlag = false;
                  }
                  if (dwonConductorData.downConductorDescription[index].holder[0][remarkName] != '' &&
                    dwonConductorData.downConductorDescription[index].holder[0][remarkName] != null) {
                    summaryObservation.controls.serialNoUi.setValue(holderDescriptionSerialNo);
                    holderDescriptionSerialNo = holderDescriptionSerialNo + 1;
                  }

                  summaryObservation.controls.observation.setValue(dwonConductorData.downConductorDescription[index].holder[0][remarkName]);
                  holderDescriptionCount = holderDescriptionCount + 1;
                }
              }
            }
            else {
              this.downHoldersArr.push(this.createDownHolders());
              this.downHoldersArr.controls[0].controls.heading.setValue('DC_Holder Observation');

              if (dwonConductorData.downConductorDescription[index].holder[0][remarkName] != '' &&
                dwonConductorData.downConductorDescription[index].holder[0][remarkName] && holderDescriptionFlag) {
              //  this.downConducotorsHolderHeaderName[index] = holderDescriptionCount;
                this.downHoldersArr.controls[indexOfHolder].controls.headingUi.setValue('DC_Holder Observation');
                holderDescriptionFlag = false;
              }
              if (dwonConductorData.downConductorDescription[index].holder[0][remarkName] != '' &&
                dwonConductorData.downConductorDescription[index].holder[0][remarkName] != null) {
                this.downHoldersArr.controls[indexOfHolder].controls.serialNoUi.setValue(holderDescriptionSerialNo);
                holderDescriptionSerialNo = holderDescriptionSerialNo + 1;
              }
              this.downHoldersArr.controls[indexOfHolder].controls.observationComponentDetails.setValue('holder' + index);
              this.downHoldersArr.controls[indexOfHolder].controls.serialNo.setValue(indexOfHolder + 1);
              this.downHoldersArr.controls[indexOfHolder].controls.observation.setValue(dwonConductorData.downConductorDescription[index].holder[0][remarkName]);
              this.downHoldersArr.controls[indexOfHolder].controls.remarksName.setValue(remarkName);
              indexOfHolder++;
              holderDescriptionCount = holderDescriptionCount + 1;
            }

          }

          //updating connectors_remarks value to summarydownconductor observation
          let indexOfConnector = 0;
          let connectorsFlag = true;
          let connectorsCount = 0;
          let connectorSerialNo = 1;
          for (let remarkName of this.connectorsName) {
            if (summaryform.downConnectors != null && summaryform.downConnectors != []
              && summaryform.downConnectors.length != 0 && indexOfConnector == 0) {
              for (let summaryObservation of summaryform.downConnectors.controls) {
                if (summaryObservation.value.remarksName == remarkName) {

                  if (dwonConductorData.downConductorDescription[index].connectors[0][remarkName] != '' &&
                    dwonConductorData.downConductorDescription[index].connectors[0][remarkName] && connectorsFlag) {
                    //this.downConducotorsConnectorsHeaderName[index] = connectorsCount;
                    summaryObservation.controls.headingUi.setValue('DC_Connectors Observation');
                    connectorsFlag = false;
                  }
                  if (dwonConductorData.downConductorDescription[index].connectors[0][remarkName] != '' &&
                    dwonConductorData.downConductorDescription[index].connectors[0][remarkName] != null) {
                    summaryObservation.controls.serialNoUi.setValue(connectorSerialNo);
                    connectorSerialNo = connectorSerialNo + 1;
                  }
                  connectorsCount = connectorsCount + 1;
                  summaryObservation.controls.observation.setValue(dwonConductorData.downConductorDescription[index].connectors[0][remarkName]);
                }
              }
            }
            else {
              this.downConnectorsArr.push(this.createDownConnectors());
              this.downConnectorsArr.controls[0].controls.heading.setValue('DC_Connectors Observation');
              if (dwonConductorData.downConductorDescription[index].connectors[0][remarkName] != '' &&
                dwonConductorData.downConductorDescription[index].connectors[0][remarkName] && connectorsFlag) {
                //this.downConducotorsConnectorsHeaderName[index] = connectorsCount;
                this.downConnectorsArr.controls[indexOfConnector].controls.headingUi.setValue('DC_Connectors Observation');
                connectorsFlag = false;
              }
              if (dwonConductorData.downConductorDescription[index].connectors[0][remarkName] != '' &&
                dwonConductorData.downConductorDescription[index].connectors[0][remarkName] != null) {
                this.downConnectorsArr.controls[indexOfConnector].controls.serialNoUi.setValue(connectorSerialNo);
                connectorSerialNo = connectorSerialNo + 1;
              }
              connectorsCount = connectorsCount + 1;
              this.downConnectorsArr.controls[indexOfConnector].controls.observationComponentDetails.setValue('connectors' + index);
              this.downConnectorsArr.controls[indexOfConnector].controls.serialNo.setValue(indexOfConnector + 1);
              this.downConnectorsArr.controls[indexOfConnector].controls.observation.setValue(dwonConductorData.downConductorDescription[index].connectors[0][remarkName]);
              this.downConnectorsArr.controls[indexOfConnector].controls.remarksName.setValue(remarkName);
              indexOfConnector++;
            }
          }

          //updating lightningCounter_remarks value to summarydownconductor observation
          let lightningCounter = 0;
          let lightningCounterFlag = true;
          let lightningCounterCount = 0;
          let lightningCounterSerialNo = 1;
          for (let remarkName of this.lightingCounterName) {
            if (summaryform.lightingCounter != null && summaryform.lightingCounter != []
              && summaryform.lightingCounter.length != 0 && lightningCounter == 0) {
              for (let summaryObservation of summaryform.lightingCounter.controls) {
                if (summaryObservation.value.remarksName == remarkName) {
                  if (dwonConductorData.downConductorDescription[index].lightningCounter[0][remarkName] != '' &&
                    dwonConductorData.downConductorDescription[index].lightningCounter[0][remarkName] && lightningCounterFlag) {
                    //this.downConducotorsLightningHeaderName[index] = lightningCounterCount;
                    summaryObservation.controls.headingUi.setValue('DC_LightningCounter Observation');

                    lightningCounterFlag = false;
                  }
                  if (dwonConductorData.downConductorDescription[index].lightningCounter[0][remarkName] != '' &&
                    dwonConductorData.downConductorDescription[index].lightningCounter[0][remarkName] != null) {
                    summaryObservation.controls.serialNoUi.setValue(lightningCounterSerialNo);
                    lightningCounterSerialNo = lightningCounterSerialNo + 1;
                  }

                  summaryObservation.controls.observation.setValue(dwonConductorData.downConductorDescription[index].lightningCounter[0][remarkName]);
                  lightningCounterCount = lightningCounterCount + 1;
                }
              }
            }
            else {
              this.lightingCounterArr.push(this.createLightingCounter());
              this.lightingCounterArr.controls[0].controls.heading.setValue('DC_LightningCounter Observation');
              if (dwonConductorData.downConductorDescription[index].lightningCounter[0][remarkName] != '' &&
                dwonConductorData.downConductorDescription[index].lightningCounter[0][remarkName] != null && lightningCounterFlag) {
               // this.downConducotorsLightningHeaderName[index] = lightningCounterCount;
                this.lightingCounterArr.controls[lightningCounter].controls.headingUi.setValue('DC_LightningCounter Observation');
                lightningCounterFlag = false;
              }
              if (dwonConductorData.downConductorDescription[index].lightningCounter[0][remarkName] != '' &&
                dwonConductorData.downConductorDescription[index].lightningCounter[0][remarkName] != null) {
                this.lightingCounterArr.controls[lightningCounter].controls.serialNoUi.setValue(lightningCounterSerialNo);
                lightningCounterSerialNo = lightningCounterSerialNo + 1;
              }
              this.lightingCounterArr.controls[lightningCounter].controls.observationComponentDetails.setValue('lightningCounter' + index);
              this.lightingCounterArr.controls[lightningCounter].controls.serialNo.setValue(lightningCounter + 1);
              this.lightingCounterArr.controls[lightningCounter].controls.observation.setValue(dwonConductorData.downConductorDescription[index].lightningCounter[0][remarkName]);
              this.lightingCounterArr.controls[lightningCounter].controls.remarksName.setValue(remarkName);
              lightningCounter++;
              lightningCounterCount = lightningCounterCount + 1;
            }

          }

          //updating testingJoint_remarks value to summarydownconductor observation
          let indexOfTestingJoint = 0;
          let testingJointFlag = true;
          let testingJointCount = 0;
          let testingJointSerialNo = 1;

          for (let remarkName of this.testingJointName) {
            if (summaryform.testingJoint != null && summaryform.testingJoint != []
              && summaryform.testingJoint.length != 0 && indexOfTestingJoint == 0) {
              for (let summaryObservation of summaryform.testingJoint.controls) {
                if (summaryObservation.value.remarksName == remarkName) {

                  if (dwonConductorData.downConductorDescription[index].testingJoint[0][remarkName] != '' &&
                    dwonConductorData.downConductorDescription[index].testingJoint[0][remarkName] && testingJointFlag) {
                    //this.downConducotorsTestJointHeaderName[index] = testingJointCount;
                    summaryObservation.controls.headingUi.setValue('DC_DownConductorTesting Observation');

                    testingJointFlag = false;
                  }
                  if (dwonConductorData.downConductorDescription[index].testingJoint[0][remarkName] != '' &&
                    dwonConductorData.downConductorDescription[index].testingJoint[0][remarkName] != null) {
                    summaryObservation.controls.serialNoUi.setValue(testingJointSerialNo);
                    testingJointSerialNo = testingJointSerialNo + 1;
                  }

                  summaryObservation.controls.observation.setValue(dwonConductorData.downConductorDescription[index].testingJoint[0][remarkName]);
                  testingJointCount = testingJointCount + 1;
                }
              }
            }
            else {
              this.downConductorTestingArr.push(this.createDownConductorsTesting());
              this.downConductorTestingArr.controls[0].controls.heading.setValue('DC_DownConductorTesting Observation');
              if (dwonConductorData.downConductorDescription[index].testingJoint[0][remarkName] != '' &&
                dwonConductorData.downConductorDescription[index].testingJoint[0][remarkName] != null) {
                this.downConducotorsTestJointHeaderName[index] = testingJointCount;
                this.downConductorTestingArr.controls[indexOfTestingJoint].controls.headingUi.setValue('DC_DownConductorTesting Observation');
                testingJointFlag = false;
              }
              if (dwonConductorData.downConductorDescription[index].testingJoint[0][remarkName] != '' &&
                dwonConductorData.downConductorDescription[index].testingJoint[0][remarkName] != null) {
                this.downConductorTestingArr.controls[indexOfTestingJoint].controls.serialNoUi.setValue(testingJointSerialNo);
                testingJointSerialNo = testingJointSerialNo + 1;
              }

              this.downConductorTestingArr.controls[indexOfTestingJoint].controls.observationComponentDetails.setValue('downConductorTesting' + index);
              this.downConductorTestingArr.controls[indexOfTestingJoint].controls.serialNo.setValue(indexOfTestingJoint + 1);
              this.downConductorTestingArr.controls[indexOfTestingJoint].controls.observation.setValue(dwonConductorData.downConductorDescription[index].testingJoint[0][remarkName]);
              this.downConductorTestingArr.controls[indexOfTestingJoint].controls.remarksName.setValue(remarkName);
              indexOfTestingJoint++;
              testingJointCount = testingJointCount + 1;
            }

          }

          //updating downConductorTesting_remarks value to summarydownconductor observation
          let indexOfDownConductorTesting = 0;
          let downConductorTestingFlag = true;
          let downConductorTestingCount = 0;
          let downConductorTestingSerialNo = 1;
          for (let remarkName of this.downConductorTestingName) {
            if (summaryform.downConductorTesting != null && summaryform.downConductorTesting != []
              && summaryform.downConductorTesting.length != 0 && indexOfDownConductorTesting == 0) {
              for (let summaryObservation of summaryform.downConductorTesting.controls) {
                if (summaryObservation.value.remarksName == remarkName) {

                  if (dwonConductorData.downConductorDescription[index].downConductorTesting[0][remarkName] != '' &&
                    dwonConductorData.downConductorDescription[index].downConductorTesting[0][remarkName] && downConductorTestingFlag) {
                    //this.downConducotorsTestingDownHeaderName[index] = downConductorTestingCount;
                    summaryObservation.controls.headingUi.setValue('DC_DownConductorTesting Observation');

                    downConductorTestingFlag = false;
                  }
                  if (dwonConductorData.downConductorDescription[index].downConductorTesting[0][remarkName] != '' &&
                    dwonConductorData.downConductorDescription[index].downConductorTesting[0][remarkName] != null) {
                    summaryObservation.controls.serialNoUi.setValue(downConductorTestingSerialNo);
                    downConductorTestingSerialNo = downConductorTestingSerialNo + 1;
                  }
                  summaryObservation.controls.observation.setValue(dwonConductorData.downConductorDescription[index].downConductorTesting[0][remarkName]);
                  downConductorTestingCount = downConductorTestingCount + 1;
                }
              }
            }
            else {
              this.downConductorTestingArr.push(this.createDownConductorsTesting());
              this.downConductorTestingArr.controls[0].controls.heading.setValue('DC_DownConductorTesting Observation');

              if (dwonConductorData.downConductorDescription[index].downConductorTesting[0][remarkName] != '' &&
                dwonConductorData.downConductorDescription[index].downConductorTesting[0][remarkName] && downConductorTestingFlag) {
               // this.downConducotorsTestingDownHeaderName[index] = downConductorTestingCount;
                this.downConductorTestingArr.controls[indexOfDownConductorTesting].controls.headingUi.setValue('DC_DownConductorTesting Observation');
                downConductorTestingFlag = false;
              }
              if (dwonConductorData.downConductorDescription[index].downConductorTesting[0][remarkName] != '' &&
                dwonConductorData.downConductorDescription[index].downConductorTesting[0][remarkName] != null) {
                this.downConductorTestingArr.controls[indexOfDownConductorTesting].controls.serialNoUi.setValue(downConductorTestingSerialNo);
                downConductorTestingSerialNo = downConductorTestingSerialNo + 1;
              }
              this.downConductorTestingArr.controls[indexOfDownConductorTesting].controls.observationComponentDetails.setValue('downConductorTesting' + index);
              this.downConductorTestingArr.controls[indexOfDownConductorTesting].controls.serialNo.setValue(indexOfDownConductorTesting + 1);
              this.downConductorTestingArr.controls[indexOfDownConductorTesting].controls.observation.setValue(dwonConductorData.downConductorDescription[index].testingJoint[0][remarkName]);
              this.downConductorTestingArr.controls[indexOfDownConductorTesting].controls.remarksName.setValue(remarkName);
              indexOfDownConductorTesting++;
              downConductorTestingCount = downConductorTestingCount + 1;
            }

          }

        }

  updateSummaryEarthingObervation(summaryform: any, earthingData: any, index: any) {
    this.summaryArr = this.summaryForm.get('summaryLpsBuildings') as FormArray;
   // this.airTerminationArr = this.summaryArr.controls[index].controls.airTermination as FormArray;

    //=========================== earthingReport =================================================

    let earthingReportRerialNo = 1;
    let earthingReportSerialNoUi = 1;
    let earthingReportHeadingUiFlag = true;
    let earthingReportRemarkIndex = 1;

    for (let value of this.earthingReportName) {
      let earthingValue = earthingData.earthingLpsDescription[index][value];
      let earthingReportHeading = '';
      let earthingReportHeadingUi = '';
     let earthingReport = this.summaryArr.controls[index].controls.earthingReport as FormArray;
        
      if (value == 'earthingTypeInRem') {
        earthingReportHeading = 'ET_Basic Details Observation';
      }

      let displySerialNo = 0;
      //headingUI
      if (earthingValue != '' && earthingValue != null) {
        displySerialNo = earthingReportSerialNoUi;
        earthingReportSerialNoUi = earthingReportSerialNoUi + 1;
      }

      //serial Number
      if (earthingValue != '' && earthingValue != null && earthingReportHeadingUiFlag) {
        earthingReportHeadingUi = 'ET_Basic Details Observation';
        earthingReportHeadingUiFlag = false;

      }

     
      let summaryObservation = this.isSummaryDataAvilable(this.summaryArr, 'earthingReport', earthingValue, earthingReportRerialNo, earthingReportHeading
        , displySerialNo, earthingReportHeadingUi, (earthingReportRerialNo-1));
      summaryObservation.observationComponentDetails = 'earthingLpsDescription' + earthingReportRerialNo;
      summaryObservation.remarkName = value;
      earthingReport.push( this.populateForm(summaryObservation));
      earthingReportRerialNo = earthingReportRerialNo + 1;
    }

    //  ========================= earthingDescription ========================
    let earthingDescriptionserialNo = 1;
    let earthingDescriptionSerialNoUi = 1;
    let earthingDescriptionHeadingUiFlag = true;
    let earthingDescriptionRemarkIndex = 1;
    let earthingDescription = this.summaryArr.controls[index].controls.earthingDescription as FormArray;
    
    for (let value of this.earthingDescriptionName) {
      let earthingValue = earthingData.earthingLpsDescription[index].earthingDescription[0][value];
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

      }

      let summaryObservation = this.isSummaryDataAvilable(this.summaryArr, 'earthingDescription', earthingValue,
        earthingDescriptionserialNo, earthingDescriptionHeading
        , displySerialNo, earthingDescriptionHeadingUi, (earthingDescriptionserialNo-1));
      summaryObservation.observationComponentDetails = 'earthingDescriptionMain' + earthingDescriptionserialNo;
      summaryObservation.remarkName = value;
      earthingDescription.push( this.populateForm(summaryObservation));
      earthingDescriptionserialNo = earthingDescriptionserialNo + 1;
    }

    //  ========================= earthingDescriptionListName ========================
    let earthingDescriptionList = this.summaryArr.controls[index].controls.earthingDescriptionList as FormArray;

    for (let i = 0; i < earthingData.earthingLpsDescription[index].earthingDescription[0].earthingDescriptionList.length; i++) {
      let earthingDescriptionListserialNo = 1;
      let earthingDescriptionListSerialNoUi = 1;
      let earthingDescriptionListHeadingUiFlag = true;
      let earthingDescriptionListRemarkIndex = 1;

      for (let value of this.earthingDescriptionListName) {
        let earthingValue = earthingData.earthingLpsDescription[index].earthingDescription[0].earthingDescriptionList[i][value];
        let earthingDescriptionListHeadingUi = '';
        let earthingDescriptionListHeading = '';

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

        }

        let summaryObservation = this.isSummaryDataAvilable(this.summaryArr, 'earthingDescriptionList', earthingValue,
          earthingDescriptionListserialNo, earthingDescriptionListHeading
          , displySerialNo, earthingDescriptionListHeadingUi, (earthingDescriptionListserialNo-1));
        summaryObservation.observationComponentDetails = 'earthingDescriptionList' + earthingDescriptionListserialNo;
        summaryObservation.remarkName = value;
        earthingDescriptionList.push( this.populateForm(summaryObservation));
        earthingDescriptionListserialNo = earthingDescriptionListserialNo + 1;
      }
    }


    //  ========================= earthingClampsName ========================
    let earthingClampserialNo = 1;
    let earthingClampSerialNoUi = 1;
    let earthingClampHeadingUiFlag = true;
    let earthingClampRemarkIndex = 1;

    for (let value of this.earthingClampsName) {
    let earthingClampHeadingUi = '';
    let earthingClampHeading = '';
    let earthingClamps = this.summaryArr.controls[index].controls.earthingClamps as FormArray;

    let earthingValue = earthingData.earthingLpsDescription[index].earthingClamps[0][value];

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

      }

      let summaryObservation = this.isSummaryDataAvilable(this.summaryArr, 'earthingClamps', earthingValue,
        earthingClampserialNo, earthingClampHeading
        , displySerialNo, earthingClampHeadingUi, (earthingClampserialNo-1));
      summaryObservation.observationComponentDetails = 'earthingClamps' + earthingClampserialNo;
      summaryObservation.remarkName = value;
      earthingClamps.push( this.populateForm(summaryObservation));
      earthingClampserialNo = earthingClampserialNo + 1;
    }

    //  ========================= earthingElectrodeChamber ========================
    let earthingElectrodeChamberserialNo = 1;
    let earthingElectrodeChamberSerialNoUi = 1;
    let earthingElectrodeChamberHeadingUiFlag = true;
    let earthingElectrodeChamberRemarkIndex = 1;

    for (let value of this.earthingElectrodeChamberName) {
      let earthingValue = earthingData.earthingLpsDescription[index].earthingElectrodeChamber[0][value];
      let earthingElectrodeChamberHeading = '';
      let earthingElectrodeChamberHeadingUi = '';
      let earthingElectrodeChamber = this.summaryArr.controls[index].controls.earthingElectrodeChamber as FormArray;
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

      }

      let summaryObservation = this.isSummaryDataAvilable(this.summaryArr, 'earthingElectrodeChamber', earthingValue,
        earthingElectrodeChamberserialNo, earthingElectrodeChamberHeading
        , displySerialNo, earthingElectrodeChamberHeadingUi, (earthingElectrodeChamberserialNo-1));
      summaryObservation.observationComponentDetails = 'earthingElectrodeChamber' + earthingElectrodeChamberserialNo;
      summaryObservation.remarkName = value;
      earthingElectrodeChamber.push( this.populateForm(summaryObservation));
      earthingElectrodeChamberserialNo = earthingElectrodeChamberserialNo + 1;
      earthingElectrodeChamberHeading = ''; 
      earthingElectrodeChamberHeadingUi = '';
    }

    //  ========================= earthingSystemName ========================
    let earthingSystemserialNo = 1;
    let earthingSystemSerialNoUi = 1;
    let earthingSystemHeadingUiFlag = true;
    let earthingSystemRemarkIndex = 1;

    for (let value of this.earthingSystemName) {
      let earthingValue = earthingData.earthingLpsDescription[index].earthingSystem[0][value];
      let earthingSystem = this.summaryArr.controls[index].controls.earthingSystem as FormArray;
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

      }

      let summaryObservation = this.isSummaryDataAvilable(this.summaryArr, 'earthingSystem', earthingValue,
        earthingSystemserialNo, earthingSystemHeading
        , displySerialNo, earthingSystemHeadingUi, (earthingSystemserialNo -1));
      summaryObservation.observationComponentDetails = 'earthingSystem' + earthingSystemserialNo;
      summaryObservation.remarkName = value;
      earthingSystem.push( this.populateForm(summaryObservation));
      earthingSystemserialNo = earthingSystemserialNo + 1;
      earthingSystemHeading = ''; 
      earthingSystemHeadingUi = '';
    }

    //  ========================= earthElectrodeTestingName ========================
    let earthElectrodeTestingserialNo = 1;
    let earthElectrodeTestingSerialNoUi = 1;
    let earthElectrodeTestingHeadingUiFlag = true;
    let earthElectrodeTestingRemarkIndex = 1;
    for(let i=0;i<earthingData.earthingLpsDescription[index].earthElectrodeTesting.length; i++){
  
      for (let value of this.earthElectrodeTestingName) {
        let earthingValue = earthingData.earthingLpsDescription[index].earthElectrodeTesting[i][value];
        let earthElectrodeTesting = this.summaryArr.controls[index].controls.earthElectrodeTesting as FormArray;
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
  
        }
  
        let summaryObservation = this.isSummaryDataAvilable(this.summaryArr, 'earthElectrodeTesting', earthingValue,
          earthElectrodeTestingserialNo, earthElectrodeTestingHeading
          , displySerialNo, earthElectrodeTestingHeadingUi, (earthElectrodeTestingserialNo - 1));
        summaryObservation.observationComponentDetails = 'earthElectrodeTesting' + earthElectrodeTestingserialNo;
        summaryObservation.remarkName = value;
        earthElectrodeTesting.push( this.populateForm(summaryObservation));
        earthElectrodeTestingserialNo = earthElectrodeTestingserialNo + 1;
        
        
      }
    }
   

  }

  updateSummarySPDObervation(summaryform: any, spdData: any, index: any) {
    this.summaryArr = this.summaryForm.get('summaryLpsBuildings') as FormArray;
    this.airTerminationArr = this.summaryArr.controls[index].controls.airTermination as FormArray;

    //=========================== spd report =================================================

    let spdReportRerialNo = 1;
    let spdReportSerialNoUi = 1;
    let spdReportHeadingUiFlag = true;
    let spdReportRemarkIndex = 1;

    for (let value of this.spdReportName) {
      let spdValue = spdData.spd[index][value];
      let spdReportHeadingUi = '';
      let spdReportHeading = '';
      let spdReport = this.summaryArr.controls[index].controls.spdReport as FormArray;

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

      }

      let summaryObservation = this.isSummaryDataAvilable(this.summaryArr, 'spdReport', spdValue, spdReportRerialNo, spdReportHeading
        , displySerialNo, spdReportHeadingUi, (spdReportRerialNo -1 ));
        summaryObservation.remarksName = value;
      summaryObservation.observationComponentDetails = 'spdReport' + spdReportRerialNo;
      spdReport.push(this.populateForm(summaryObservation));
      spdReportRerialNo = spdReportRerialNo + 1;
    }

     //=========================== spd list =================================================
 for(let i=0;i<spdData.spd[index].spdDescription.length;i++){

     let spdDescriptionSerialNo = 1;
     let spdDescriptionSerialNoUi = 1;
     let spdDescriptionHeadingUiFlag = true;
     let spdDescriptionRemarkIndex = 1;
 
     for (let value of this.spdReportListName) {
      let spdReportList = this.summaryArr.controls[index].controls.spdReportList as FormArray;
       let earthingValue = spdData.spd[index].spdDescription[i][value];
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
 
       }
 
       let summaryObservation = this.isSummaryDataAvilable(this.summaryArr, 'spdDescription', earthingValue, spdDescriptionSerialNo, spdDescriptionHeading
         , displySerialNo, spdDescriptionHeadingUi, (spdDescriptionSerialNo -1));
       summaryObservation.observationComponentDetails = 'spdDescription' + spdDescriptionSerialNo;
       summaryObservation.remarksName = value;
       spdReportList.push(this.populateForm(summaryObservation));
       spdDescriptionSerialNo = spdDescriptionSerialNo + 1;
     }
   }
  }
  
  updateSeperationObservation(summaryform: any, separationDistanceData: any, index: any) {

    this.summaryArr = this.summaryForm.get('summaryLpsBuildings') as FormArray;
 
    //=========================== SeparationDistance =================================================

    let seperationDistanceSerialNo = 1;
    let seperationDistanceSerialNoUi = 1;
    let seperationDistanceHeadingUiFlag = true;
    let seperationDistanceRemarkIndex = 1;

    for (let value of this.separationDistanceName) {
      let separationDistanceValue = separationDistanceData.seperationDistanceDescription[index][value];
      let seperationDistanceHeadingUi = '';
      let seperationDistanceHeading = '';
      let separationDistance = this.summaryArr.controls[index].controls.separationDistance as FormArray;

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

      }

      let summaryObservation = this.isSummaryDataAvilable(this.summaryArr, 'separationDistance', separationDistanceValue, seperationDistanceSerialNo, seperationDistanceHeading
        , displySerialNo, seperationDistanceHeadingUi, (seperationDistanceSerialNo -1 ));
        summaryObservation.remarksName = value;
      summaryObservation.observationComponentDetails = 'seperationDistanceDescription' + seperationDistanceSerialNo;
      separationDistance.push(this.populateForm(summaryObservation));
    seperationDistanceSerialNo = seperationDistanceSerialNo + 1;
    }

     //=========================== SeparateDistance =================================================

  
 
     let SeparateDistanceSerialNo = 1;
     let SeparateDistanceSerialNoUi = 1;
     let SeparateDistanceHeadingUiFlag = true;
     let SeparateDistanceRemarkIndex = 1;
     for(let i=0;i<separationDistanceData.seperationDistanceDescription[index].separateDistance.length;i++){
     // for (let value of this.separateDistanceName) {
        let separationDistanceValue = separationDistanceData.seperationDistanceDescription[index].separateDistance[i][this.separateDistanceName[0]];
        let SeparateDistanceHeadingUi = '';
        let SeparateDistanceHeading = '';
        let separateDistance = this.summaryArr.controls[index].controls.separateDistance as FormArray;
  
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
  
        }
  
        let summaryObservation = this.isSummaryDataAvilable(this.summaryArr, 'separateDistance', separationDistanceValue, SeparateDistanceSerialNo, SeparateDistanceHeading
          , displySerialNo, SeparateDistanceHeadingUi, (SeparateDistanceSerialNo - 1));
          summaryObservation.remarksName = this.separateDistanceName[0];
        summaryObservation.observationComponentDetails = 'separateDistanceDesc' + SeparateDistanceSerialNo;
        separateDistance.push(this.populateForm(summaryObservation));
      SeparateDistanceSerialNo = SeparateDistanceSerialNo + 1;
     // }
 
     }

       //=========================== SeparationDistanceDown =================================================

       let SeparationDistanceDownSerialNo = 1;
       let SeparationDistanceDownSerialNoUi = 1;
       let SeparationDistanceDownHeadingUiFlag = true;
       let SeparationDistanceDownRemarkIndex = 1;
    for (let i = 0; i < separationDistanceData.seperationDistanceDescription[index].separateDistanceDownConductors.length; i++) {
      for (let value of this.separateDistanceDownName) {
        let separationDistanceValue = separationDistanceData.seperationDistanceDescription[index].separateDistanceDownConductors[i][value];
        let SeparationDistanceDownHeadingUi = '';
        let SeparationDistanceDownHeading = '';
        let separationDistanceDown = this.summaryArr.controls[index].controls.separationDistanceDown as FormArray;

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

        }

        let summaryObservation = this.isSummaryDataAvilable(this.summaryArr, 'separationDistanceDown', separationDistanceValue, SeparationDistanceDownSerialNo, SeparationDistanceDownHeading
          , displySerialNo, SeparationDistanceDownHeadingUi, (SeparationDistanceDownSerialNo -1));
        summaryObservation.remarksName = value;
        summaryObservation.observationComponentDetails = 'separateDistanceDownConductors' + SeparationDistanceDownSerialNo;
        separationDistanceDown.push(this.populateForm(summaryObservation));
        SeparationDistanceDownSerialNo = SeparationDistanceDownSerialNo + 1;
      }
    }

  }

   //equipotential bonding or earthStud
  updateEarthStudObservation(summaryform: any, earthStudData: any, index: any) {

    this.summaryArr = this.summaryForm.get('summaryLpsBuildings') as FormArray;
 
    //=========================== EarthStud =================================================

    let earthStudSerialNo = 1;
    let earthStudSerialNoUi = 1;
    let earthStudHeadingUiFlag = true;
    let earthStudRemarkIndex = 1;

    for (let value of this.earthStudDescName) {
      let separationDistanceValue = earthStudData.earthStudDescription[index][value];
      let earthStudHeadingUi = '';
      let earthStudHeading = '';
      let earthStudDesc = this.summaryArr.controls[index].controls.earthStudDesc as FormArray;

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

      }

      let summaryObservation = this.isSummaryDataAvilable(this.summaryArr, 'earthStudDescription', separationDistanceValue, earthStudSerialNo, earthStudHeading
        , displySerialNo, earthStudHeadingUi, (earthStudSerialNo - 1));
        summaryObservation.remarksName = value;
      summaryObservation.observationComponentDetails = 'Equipotential Bonding' + earthStudSerialNo;
      earthStudDesc.push(this.populateForm(summaryObservation));
      earthStudSerialNo = earthStudSerialNo + 1;
    }
  }

  isSummaryDataAvilable(summaryform: any, arrayName: any, observationValue: any, serialNo: any, heading: any,
    serialNoUi: any, headingUi: any, remarkIndex: any): any {

    let summaryObservation = new SummaryLpsObservation();
    summaryObservation.observation = observationValue;
    summaryObservation.serialNo = serialNo;
    summaryObservation.serialNoUi = serialNoUi;
    summaryObservation.headingUi = headingUi;
    summaryObservation.heading = heading;


    switch (arrayName) {

      case 'earthingReport':{
        if (this.earthing1.length > remarkIndex && this.earthing1 != null) {
        //  summaryObservation.heading = this.earthing1[remarkIndex].heading;
          summaryObservation.summaryLpsObservationId = this.earthing1[remarkIndex].summaryLpsObservationId;
          summaryObservation.recommendation = this.earthing1[remarkIndex].recommendation;
         // summaryObservation.observationComponentDetails = this.earthing1[remarkIndex].observationComponentDetails;
        }
        return summaryObservation;;
      }
 
      case 'earthingDescription':{
        if (this.earthing2.length > remarkIndex  && this.earthing2 != null) {
         // summaryObservation.heading = this.earthing2[remarkIndex].heading;
          summaryObservation.summaryLpsObservationId = this.earthing2[remarkIndex].summaryLpsObservationId;
          summaryObservation.recommendation = this.earthing2[remarkIndex].recommendation;
         // summaryObservation.observationComponentDetails = this.earthing2[remarkIndex].observationComponentDetails;

        }
        return summaryObservation;;
      }

      case 'earthingClamps':{
        if (this.earthing3.length > remarkIndex  && this.earthing3 != null) {
         // summaryObservation.heading = this.earthing3[remarkIndex].heading;
          summaryObservation.summaryLpsObservationId = this.earthing3[remarkIndex].summaryLpsObservationId;
          summaryObservation.recommendation = this.earthing3[remarkIndex].recommendation;
         // summaryObservation.observationComponentDetails = this.earthing3[remarkIndex].observationComponentDetails;

        }
        return summaryObservation;;
      }

      case 'earthingDescriptionList':{
        if (this.earthingList.length > remarkIndex  && this.earthingList != null) {
         // summaryObservation.heading = this.earthingList[remarkIndex].heading;
          summaryObservation.summaryLpsObservationId = this.earthingList[remarkIndex].summaryLpsObservationId;
          summaryObservation.recommendation = this.earthingList[remarkIndex].recommendation;
        //  summaryObservation.observationComponentDetails = this.earthingList[remarkIndex].observationComponentDetails;
        }
        return summaryObservation;;
      }

      case 'earthingElectrodeChamber':{
        if (this.earthing4.length > remarkIndex  && this.earthing4 != null) {
         // summaryObservation.heading = this.earthing4[remarkIndex].heading;
          summaryObservation.summaryLpsObservationId = this.earthing4[remarkIndex].summaryLpsObservationId;
          summaryObservation.recommendation = this.earthing4[remarkIndex].recommendation;
         // summaryObservation.observationComponentDetails = this.earthing4[remarkIndex].observationComponentDetails;
         
        }
        return summaryObservation;;
      }
 
      case 'earthingSystem':{
        if (this.earthing5.length > remarkIndex  && this.earthing5 != null) {
         // summaryObservation.heading = this.earthing5[remarkIndex].heading;
          summaryObservation.summaryLpsObservationId = this.earthing5[remarkIndex].summaryLpsObservationId;
          summaryObservation.recommendation = this.earthing5[remarkIndex].recommendation;
         // summaryObservation.observationComponentDetails = this.earthing5[remarkIndex].observationComponentDetails;
        }
        return summaryObservation;;
      }

      case 'earthElectrodeTesting':{
        if (this.earthing6.length > remarkIndex && this.earthing6 != null) {
         // summaryObservation.heading =  this.earthing6[remarkIndex].heading;
          summaryObservation.summaryLpsObservationId = this.earthing6[remarkIndex].summaryLpsObservationId;
          summaryObservation.recommendation = this.earthing6[remarkIndex].recommendation;
         // summaryObservation.observationComponentDetails = this.earthing6[remarkIndex].observationComponentDetails;
        }
        return summaryObservation;
      }
      case 'spdReport':{
        if (this.spd1.length > remarkIndex && this.spd1 != null) {
           summaryObservation.summaryLpsObservationId = this.spd1[remarkIndex].summaryLpsObservationId;
          summaryObservation.recommendation = this.spd1[remarkIndex].recommendation;
         }
        return summaryObservation;
      }
      case 'spdDescription':{
        if (this.spd2.length > remarkIndex && this.spd2 != null) {
           summaryObservation.summaryLpsObservationId = this.spd2[remarkIndex].summaryLpsObservationId;
          summaryObservation.recommendation = this.spd2[remarkIndex].recommendation;
         }
        return summaryObservation;
      }
      case 'separationDistance':{
        if (this.separation1.length > remarkIndex && this.separation1 != null) {
           summaryObservation.summaryLpsObservationId = this.separation1[remarkIndex].summaryLpsObservationId;
          summaryObservation.recommendation = this.separation1[remarkIndex].recommendation;
         }
        return summaryObservation;
      }
      case 'separateDistance':{
        if (this.separation2.length > remarkIndex && this.separation2 != null) {
           summaryObservation.summaryLpsObservationId = this.separation2[remarkIndex].summaryLpsObservationId;
          summaryObservation.recommendation = this.separation2[remarkIndex].recommendation;
         }
        return summaryObservation;
      }
      case 'separationDistanceDown':{
        if (this.separation3.length > remarkIndex && this.separation3 != null) {
           summaryObservation.summaryLpsObservationId = this.separation3[remarkIndex].summaryLpsObservationId;
          summaryObservation.recommendation = this.separation3[remarkIndex].recommendation;
         }
        return summaryObservation;
      }
      case 'earthStudDescription':{
        if (this.equipotential1.length > remarkIndex && this.equipotential1 != null) {
           summaryObservation.summaryLpsObservationId = this.equipotential1[remarkIndex].summaryLpsObservationId;
          summaryObservation.recommendation = this.equipotential1[remarkIndex].recommendation;
         }
        return summaryObservation;
      }
    }
  
  }


      createGroup(item: any): FormGroup {
        let airTermination: any=[];
        let airTermination1: any=[];
        let airTermination2: any=[];
        let airTermination3: any=[];
        let airTermination4: any=[];
        let airTermination5: any=[];
        let airTermination6: any=[];
        let airTerminationList: any=[];
        let airTerminationHolderList: any=[];
        //down conductor
        let downConductor1: any=[];
        let downConductor2: any=[];
        let downConductor3: any=[];
        let downConductor4: any=[];
        let downConductor5: any=[];
        let downConductor6: any=[];
        let downConductor7: any=[];
        let downConductor8: any=[];
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

        for(let i of item.summaryLpsObservation){
          if(i.observationComponentDetails.includes('airBasicDescription')){ 
             airTermination.push(i);
          }
          if(i.observationComponentDetails.includes('lpsVerticalAirTermination')){
            airTermination1.push(i); 
          }
          if(i.observationComponentDetails.includes('verticalAirTerminationList')) {
            airTerminationList.push(i);
          }
          if(i.observationComponentDetails.includes('airMeshDescription')){
            airTermination2.push(i);
          }
          if(i.observationComponentDetails.includes('airHolderDescription')){
            airTermination3.push(i); 
          }

          if(i.observationComponentDetails.includes('airHolderList')){
            airTerminationHolderList.push(i);
          }

          if(i.observationComponentDetails.includes('airClamps')){
            airTermination4.push(i);
          }
          if(i.observationComponentDetails.includes('airExpansion')){
            airTermination5.push(i);
          }
          if(i.observationComponentDetails.includes('airConnectors')){
            airTermination6.push(i);
          }
         //down conductors
          if(i.observationComponentDetails.includes('downConductorBasicDescription')){
            downConductor1.push(i);
          }
          if(i.observationComponentDetails.includes('downConductorDescription')){
            downConductor2.push(i);
          }
          if(i.observationComponentDetails.includes('bridgingDescription')){
            downConductor3.push(i);
          }
          if(i.observationComponentDetails.includes('holder')){
            downConductor4.push(i);
          }
          if(i.observationComponentDetails.includes('connectors')){
            downConductor5.push(i);
          }
          if(i.observationComponentDetails.includes('testingJoint')){
            downConductor6.push(i);
          }
          if(i.observationComponentDetails.includes('lightningCounter')){
            downConductor7.push(i);
          }
          if(i.observationComponentDetails.includes('downConductorTesting')){
            downConductor8.push(i);
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
          if(i.observationComponentDetails.includes('earthStudDescription')){
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
        airTermination: this.formBuilder.array(this.populateArray(airTermination)),
        airVertical: this.formBuilder.array(this.populateArray(airTermination1)),
        airVerticalList: this.formBuilder.array(this.populateArray(airTerminationList)),
        airMesh: this.formBuilder.array(this.populateArray(airTermination2)),
        airHolder: this.formBuilder.array(this.populateArray(airTermination3)),
        airHolderList: this.formBuilder.array(this.populateArray(airTerminationHolderList)),
        airClamps: this.formBuilder.array(this.populateArray(airTermination4)),
        airExpansion: this.formBuilder.array(this.populateArray(airTermination5)),
        airConnectors: this.formBuilder.array(this.populateArray(airTermination6)),
        //down conductors
        downConductorReport: this.formBuilder.array(this.populateArray(downConductor1)),
        downConductor: this.formBuilder.array(this.populateArray(downConductor2)),
        bridgingDesc: this.formBuilder.array(this.populateArray(downConductor3)),
        downHolders: this.formBuilder.array(this.populateArray(downConductor4)),
        downConnectors: this.formBuilder.array(this.populateArray(downConductor5)),
        testingJoint: this.formBuilder.array(this.populateArray(downConductor6)),
        lightingCounter: this.formBuilder.array(this.populateArray(downConductor7)),
        downConductorTesting: this.formBuilder.array(this.populateArray(downConductor8)),
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
        signature: new FormControl({disabled: false,value: item.signature}),
        company: new FormControl({disabled: false,value: item.company}, Validators.required),
        position: new FormControl({disabled: false,value: item.position}, Validators.required),
        address: new FormControl({disabled: false,value: item.address}, Validators.required),
        date: new FormControl({disabled: false,value: item.date}, Validators.required),
        declarationRole: new FormControl({disabled: false,value: item.declarationRole}, Validators.required),
        });
    } 
    
//     retrieveObservationLpsSummary(basicLpsId: any){
//      if (this.basicLpsId != undefined) {
//       this.summaryService.retrieveObservationSummaryLps(basicLpsId).subscribe(
//       data=>{
//         this.retrieveFromAirTermination();
//         this.airTerminationData=JSON.parse(data);
//         this.downConductorData=JSON.parse(data);
//         this.earthingData=JSON.parse(data);
//         this.spdReportData=JSON.parse(data);
//         this.separationDistanceData=JSON.parse(data);
//         this.equiBondingData=JSON.parse(data);
//         this.summaryArr=this.summaryForm.get('summaryLpsBuildings') as FormArray;
//         for(let w=0; w<this.summaryArr.controls.length; w++){
//           //air termination
//       if(this.airTerminationData.airTermination!=null){
//         //basic
//         this.airTerminationArr=[];
//           this.airTerminationArr=this.summaryArr.controls[w].controls.airTermination as FormArray;
//           let index =0;
//           //let value=this.airTerminationData.airTermination[0].lpsAirDiscription[0];
//           for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[w].airBasicDescription){
//               for(let j = 0; j < this.airBasicName.length; j++){
//                // if(i[this.airBasicName[j]]!="" && i[this.airBasicName[j]]!=null){
//                   this.airTerminationArr.push(this.createAirTermination());
//                   this.airTerminationArr.controls[0].controls.heading.setValue('AT_Basic Details Observation');
//                   this.airTerminationArr.controls[index].controls.observationComponentDetails.setValue('airBasicDescription' + index);
//                   this.airTerminationArr.controls[index].controls.serialNo.setValue(index+1);
//                   this.airTerminationArr.controls[index].controls.observation.setValue(i[this.airBasicName[j]]);
//                   this.airTerminationArr.controls[index].controls.remarksName.setValue(this.airBasicName[j]);
//                   index++;
//                // }
//               }
//           }
//           //vertical
//           this.airVerticalArr
//           this.airVerticalArr=this.summaryArr.controls[w].controls.airVertical as FormArray;
//           let index1 =0;
//           for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[w].lpsVerticalAirTermination){
//             for(let j = 0; j < this.airVerticalName.length; j++){
//             //  if(i[this.airVerticalName[j]]!="" && i[this.airVerticalName[j]]!= null){
//                 this.airVerticalArr.push(this.createAirVertical());
//                 this.airVerticalArr.controls[0].controls.heading.setValue('AT_Vertical Observation');
//                 this.airVerticalArr.controls[index1].controls.observationComponentDetails.setValue('lpsVerticalAirTermination' + index1);
//                 this.airVerticalArr.controls[index1].controls.serialNo.setValue(index1 + 1);
//                 this.airVerticalArr.controls[index1].controls.observation.setValue(i[this.airVerticalName[j]]);
//                 this.airVerticalArr.controls[index1].controls.remarksName.setValue(this.airVerticalName[j]);
//                 index1++;
//             //  }
//             }
//       }
//         //vertical list
//         this.airVerticalListArr=this.summaryArr.controls[w].controls.airVerticalList as FormArray;
//         let index0 =0;
//         let vatListIndex=1;
//         let indexVertical=0;
//         if(this.airTerminationData.airTermination[0].lpsAirDiscription[w].lpsVerticalAirTermination.length!=0){
//           for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[w].lpsVerticalAirTermination[0].verticalAirTerminationList)
//           {
//             for(let j = 0; j < this.airVerticalListName.length; j++){
//             //  if(i[this.airVerticalListName[j]]!=""  && i[this.airVerticalListName[j]]!= null){
//                 this.airVerticalListArr.push(this.createAirVerticalList());
//                 if(indexVertical==0){
//                   this.airVerticalListArr.controls[index0].controls.heading.setValue('AT_Vertical List-' + vatListIndex);
//                 }
//                 this.airVerticalListArr.controls[index0].controls.observationComponentDetails.setValue('verticalAirTerminationList' + index0);
//                 this.airVerticalListArr.controls[index0].controls.serialNo.setValue(indexVertical + 1);
//                 this.airVerticalListArr.controls[index0].controls.observation.setValue(i[this.airVerticalListName[j]]);
//                 this.airVerticalListArr.controls[index0].controls.remarksName.setValue(this.airVerticalListName[j] +"-"+vatListIndex);
//                 index0++;
//                 indexVertical++;
//              // }
//             }
//             indexVertical=0;
//             vatListIndex++;
//           }
//         }
       
//     //mesh
//     this.airMeshArr=this.summaryArr.controls[w].controls.airMesh as FormArray;
//     let index2 =0;
//     for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[w].airMeshDescription){
//       for(let j = 0; j < this.airMeshName.length; j++){
//       //  if(i[this.airMeshName[j]]!="" && i[this.airMeshName[j]]!= null){
//         this.airMeshArr.push(this.createAirMesh());
//         this.airMeshArr.controls[0].controls.heading.setValue('AT_Mesh Observation');
//         this.airMeshArr.controls[index2].controls.observationComponentDetails.setValue('airMeshDescription' + index2);
//         this.airMeshArr.controls[index2].controls.serialNo.setValue(index2+1);
//         this.airMeshArr.controls[index2].controls.observation.setValue(i[this.airMeshName[j]]);
//         this.airMeshArr.controls[index2].controls.remarksName.setValue(this.airMeshName[j]);
//         index2++;
//        // }
//       }
//   }
//     //holder
//     this.airHolderArr=this.summaryArr.controls[w].controls.airHolder as FormArray;
//     let index3 =0;
//     for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[w].airHolderDescription){
//       for(let j = 0; j < this.airHolderName.length; j++){
//       //  if(i[this.airHolderName[j]]!="" && i[this.airHolderName[j]]!= null){
//           this.airHolderArr.push(this.createAirHolder());
//           this.airHolderArr.controls[0].controls.heading.setValue('AT_Holder Observation');
//           this.airHolderArr.controls[index3].controls.observationComponentDetails.setValue('airHolderDescription' + index3);
//           this.airHolderArr.controls[index3].controls.serialNo.setValue(index3+1);
//           this.airHolderArr.controls[index3].controls.observation.setValue(i[this.airHolderName[j]]);
//           this.airHolderArr.controls[index3].controls.observation.remarksName.setValue(this.airHolderName[j]);
//           index3++;        
//        // }
    
//       }
//     }
//     //holder list
//     this.airHolderListArr=this.summaryArr.controls[w].controls.airHolderList as FormArray;
//     let index01 =0;
//     let holderListIndex=1;
//     let indexHolder=0;
//     if(this.airTerminationData.airTermination[0].lpsAirDiscription[w].airHolderDescription.length!=0){
//       for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[w].airHolderDescription[0].airHolderList)
//       {
//         for(let j = 0; j < this.airHolderListName.length; j++){
//          // if(i[this.airHolderListName[j]]!="" && i[this.airHolderListName[j]]!= null){
//             this.airHolderListArr.push(this.createAirHolderList());
//             if(indexHolder == 0){
//             this.airHolderListArr.controls[index01].controls.heading.setValue('AT_Holder List-' + holderListIndex);
//             }
//             this.airHolderListArr.controls[index01].controls.observationComponentDetails.setValue('airHolderList' + index01);
//             this.airHolderListArr.controls[index01].controls.serialNo.setValue(indexHolder+1);
//             this.airHolderListArr.controls[index01].controls.observation.setValue(i[this.airHolderListName[j]]);
//             this.airHolderListArr.controls[index01].controls.observation.remarksName.setValue(this.airHolderListName[j]+"-"+holderListIndex);
//             index01++;
//             indexHolder++;
//          // }
//         }
//         indexHolder=0;
//         holderListIndex++;
//       }
//     }
   
//     //clamps
//     this.airClampsArr=this.summaryArr.controls[w].controls.airClamps as FormArray;
//     let index4 =0;
//     for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[w].airClamps){
//       for(let j = 0; j < this.airClampsName.length; j++){
//        // if(i[this.airClampsName[j]]!="" && i[this.airClampsName[j]]!= null){
//           this.airClampsArr.push(this.createAirClamps());
//           this.airClampsArr.controls[0].controls.heading.setValue('AT_Clamps Observation');
//           this.airClampsArr.controls[index4].controls.observationComponentDetails.setValue('airClamps' + index4);
//           this.airClampsArr.controls[index4].controls.serialNo.setValue(index4+1);
//           this.airClampsArr.controls[index4].controls.observation.setValue(i[this.airClampsName[j]]);
//           this.airClampsArr.controls[index4].controls.remarksName.setValue(this.airClampsName[j]);
//           index4++;        
//        // }
//       }
//     }
//     //expansion
//     this.airExpansionArr=this.summaryArr.controls[w].controls.airExpansion as FormArray;
//     let index5 =0;
//     for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[w].airExpansion){
//       for(let j = 0; j < this.airExpansionName.length; j++){
//        // if(i[this.airExpansionName[j]]!="" && i[this.airExpansionName[j]]!= null){
//           this.airExpansionArr.push(this.createAirExpansion());
//           this.airExpansionArr.controls[0].controls.heading.setValue('AT_Expansion Observation');
//           this.airExpansionArr.controls[index5].controls.observationComponentDetails.setValue('airExpansion' + index5);
//           this.airExpansionArr.controls[index5].controls.serialNo.setValue(index5+1);
//           this.airExpansionArr.controls[index5].controls.observation.setValue(i[this.airExpansionName[j]]);
//           this.airExpansionArr.controls[index5].controls.remarksName.setValue(this.airExpansionName[j]);
//           index5++;        
//        // }
//       }
//     }
//     //connectors
//     this.airConnectorsArr=this.summaryArr.controls[w].controls.airConnectors as FormArray;
//     let index6 =0;
//     for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[w].airConnectors){
//       for(let j = 0; j < this.airConnectorsName.length; j++){
//        // if(i[this.airConnectorsName[j]]!="" && i[this.airConnectorsName[j]]!= null){
//           this.airConnectorsArr.push(this.createAirConnectors());
//           this.airConnectorsArr.controls[0].controls.heading.setValue('AT_Connectors Observation');
//           this.airConnectorsArr.controls[index6].controls.observationComponentDetails.setValue('airConnectors' + index6);
//           this.airConnectorsArr.controls[index6].controls.serialNo.setValue(index6+1);
//           this.airConnectorsArr.controls[index6].controls.observation.setValue(i[this.airConnectorsName[j]]);
//           this.airConnectorsArr.controls[index6].controls.remarksName.setValue(this.airConnectorsName[j]);
//           index6++;        
//        // }
//       }
//     }
//       } 
//       //down conductors
//       if(this.downConductorData.downConductorReport!=null && this.downConductorData.downConductorReport[0].downConductorDescription.length !=0){
//         this.downConductorsBasicArr=this.summaryArr.controls[w].controls.downConductorReport as FormArray;
//         let index =0; 
//         // for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[w]){
//             for(let j = 0; j < this.downBasicName.length; j++){
//              // if(this.downConductorData.downConductorReport[0].downConductorDescription.length !=0 && this.downConductorData.downConductorReport[0].downConductorDescription[w][this.downBasicName[j]]!="" 
//              //    && this.downConductorData.downConductorReport[0].downConductorDescription[w][this.downBasicName[j]] != null){
//                 this.downConductorsBasicArr.push(this.createDownConductorsBasic());
//                 this.downConductorsBasicArr.controls[0].controls.heading.setValue('DC_Basic Details Observation');
//                 this.downConductorsBasicArr.controls[index].controls.observationComponentDetails.setValue('downConductorBasicDescription' + index);
//                 this.downConductorsBasicArr.controls[index].controls.serialNo.setValue(index+1);
//                 this.downConductorsBasicArr.controls[index].controls.observation.setValue(this.downConductorData.downConductorReport[0].downConductorDescription[w][this.downBasicName[j]]);
//                 this.downConductorsBasicArr.controls[index].controls.remarksName.setValue(this.downBasicName[j]);
//                 index++;              
//             //  }
//             }
//         //}
//         //downConductor
//         this.downConductorsArr=this.summaryArr.controls[w].controls.downConductor as FormArray;
//         let index1 =0;
//         for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[w].downConductor){
//           for(let j = 0; j < this.downConductorName.length; j++){
//            // if(i[this.downConductorName[j]]!="" && i[this.downConductorName[j]]!= null){
//               this.downConductorsArr.push(this.createDownConductors());
//               this.downConductorsArr.controls[0].controls.heading.setValue('DC_Downconductors Observation');
//               this.downConductorsArr.controls[index1].controls.observationComponentDetails.setValue('downConductorDescription' + index1);
//               this.downConductorsArr.controls[index1].controls.serialNo.setValue(index1+1);
//               this.downConductorsArr.controls[index1].controls.observation.setValue(i[this.downConductorName[j]]);
//               this.downConductorsArr.controls[index1].controls.remarksName.setValue(this.downConductorName[j]);
//               index1++;            
//            // }
//           }
//     }
      
//     //Bridging
//     this.bridgingDescArr=this.summaryArr.controls[w].controls.bridgingDesc as FormArray;
//     let index2 =0;
//     for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[w].bridgingDescription){
//       for(let j = 0; j < this.bridgingName.length; j++){
//        // if(i[this.bridgingName[j]]!="" && i[this.bridgingName[j]]!= null){
//           this.bridgingDescArr.push(this.createBridgingDesc());
//           this.bridgingDescArr.controls[0].controls.heading.setValue('DC_Bridging Observation');
//           this.bridgingDescArr.controls[index2].controls.observationComponentDetails.setValue('bridgingDescription' + index2);
//           this.bridgingDescArr.controls[index2].controls.serialNo.setValue(index2+1);
//           this.bridgingDescArr.controls[index2].controls.observation.setValue(i[this.bridgingName[j]]);
//           this.bridgingDescArr.controls[index2].controls.remarksName.setValue(this.bridgingName[j]);
//           index2++;        
//         //}
//       }
//   }
//   //holder
//   this.downHoldersArr=this.summaryArr.controls[w].controls.downHolders as FormArray;
//   let index3 =0;
//   for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[w].holder){
//     for(let j = 0; j < this.downHolderName.length; j++){
//      // if(i[this.downHolderName[j]]!="" && i[this.downHolderName[j]]!= null){
//         this.downHoldersArr.push(this.createDownHolders());
//         this.downHoldersArr.controls[0].controls.heading.setValue('DC_Holder Observation');
//         this.downHoldersArr.controls[index3].controls.observationComponentDetails.setValue('holder' + index3);
//         this.downHoldersArr.controls[index3].controls.serialNo.setValue(index3+1);
//         this.downHoldersArr.controls[index3].controls.observation.setValue(i[this.downHolderName[j]]);
//         this.downHoldersArr.controls[index3].controls.remarksName.setValue(this.downHolderName[j]);
//         index3++;      
//      // }
//     }
// }

//     //connectors
//     this.downConnectorsArr=this.summaryArr.controls[w].controls.downConnectors as FormArray;
//     let index4 =0;
//     for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[w].connectors){
//     for(let j = 0; j < this.connectorsName.length; j++){
//     //  if(i[this.connectorsName[j]]!="" && i[this.connectorsName[j]]!= null){
//         this.downConnectorsArr.push(this.createDownConnectors());
//         this.downConnectorsArr.controls[0].controls.heading.setValue('DC_Connectors Observation');
//         this.downConnectorsArr.controls[index4].controls.observationComponentDetails.setValue('connectors' + index4);
//         this.downConnectorsArr.controls[index4].controls.serialNo.setValue(index4+1);
//         this.downConnectorsArr.controls[index4].controls.observation.setValue(i[this.connectorsName[j]]);
//         this.downConnectorsArr.controls[index4].controls.remarksName.setValue(this.connectorsName[j]);
//         index4++;      
//      // }
//     }
//     }
//     //testingJoint
//     this.testingJointArr=this.summaryArr.controls[w].controls.testingJoint as FormArray;
//     let index5 =0;
//     for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[w].testingJoint){
//     for(let j = 0; j < this.testingJointName.length; j++){
//      // if(i[this.testingJointName[j]]!="" && i[this.testingJointName[j]]!= null){
//         this.testingJointArr.push(this.createTestingJoints());
//         this.testingJointArr.controls[0].controls.heading.setValue('DC_TestingJoint Observation');
//         this.testingJointArr.controls[index5].controls.observationComponentDetails.setValue('testingJoint' + index5);
//         this.testingJointArr.controls[index5].controls.serialNo.setValue(index5+1);
//         this.testingJointArr.controls[index5].controls.observation.setValue(i[this.testingJointName[j]]);
//         this.testingJointArr.controls[index5].controls.remarksName.setValue(this.testingJointName[j]);
//         index5++;      
//      // }
//     }
//     }
//     //lightingCounter
//     this.lightingCounterArr=this.summaryArr.controls[w].controls.lightingCounter as FormArray;
//     let index6 =0;
//     for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[w].lightningCounter){
//     for(let j = 0; j < this.lightingCounterName.length; j++){
//      // if(i[this.lightingCounterName[j]]!="" && i[this.lightingCounterName[j]]!= null){
//         this.lightingCounterArr.push(this.createLightingCounter());
//         this.lightingCounterArr.controls[0].controls.heading.setValue('DC_LightningCounter Observation');
//         this.lightingCounterArr.controls[index6].controls.observationComponentDetails.setValue('lightningCounter' + index6);
//         this.lightingCounterArr.controls[index6].controls.serialNo.setValue(index6+1);
//         this.lightingCounterArr.controls[index6].controls.observation.setValue(i[this.lightingCounterName[j]]);
//         this.lightingCounterArr.controls[index6].controls.remarksName.setValue(this.lightingCounterName[j]);
//         index6++;      
//      // }
//     }
//     }

//   //downConductorTesting
//   this.downConductorTestingArr=this.summaryArr.controls[w].controls.downConductorTesting as FormArray;
//   let index8 =0;
//   for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[w].downConductorTesting){
//   for(let j = 0; j < this.downConductorTestingName.length; j++){
//    // if(i[this.downConductorTestingName[j]]!="" && i[this.downConductorTestingName[j]]!= null){
//       this.downConductorTestingArr.push(this.createDownConductorsTesting());
//       this.downConductorTestingArr.controls[0].controls.heading.setValue('DC_DownConductorTesting Observation');
//       this.downConductorTestingArr.controls[index8].controls.observationComponentDetails.setValue('downConductorTesting' + index8);
//       this.downConductorTestingArr.controls[index8].controls.serialNo.setValue(index8+1);
//       this.downConductorTestingArr.controls[index8].controls.observation.setValue(i[this.downConductorTestingName[j]]);
//       this.downConductorTestingArr.controls[index8].controls.remarksName.setValue(this.downConductorTestingName[j]);
//       index8++;    
//    // }
//   }
//   }
//       }
//       //earthing
//       if(this.earthingData.earthingReport!=null && this.earthingData.earthingReport[0].earthingLpsDescription.length !=0){
//         this.earthingReportArr=this.summaryArr.controls[w].controls.earthingReport as FormArray;
//         let index =0; 
//       // for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[w]){
//             for(let j = 0; j < this.earthingReportName.length; j++){
//              // if(this.earthingData.earthingReport[0].earthingLpsDescription[w][this.earthingReportName[j]]!="" && this.earthingData.earthingReport[0].earthingLpsDescription[w][this.earthingReportName[j]]!= null){
//                 this.earthingReportArr.push(this.createEarthingReport());
//                 this.earthingReportArr.controls[0].controls.heading.setValue('ET_Basic Details Observation');
//                 this.earthingReportArr.controls[index].controls.observationComponentDetails.setValue('earthingLpsDescription' + index);
//                 this.earthingReportArr.controls[index].controls.serialNo.setValue(index+1);
//                 this.earthingReportArr.controls[index].controls.observation.setValue(this.earthingData.earthingReport[0].earthingLpsDescription[w][this.earthingReportName[j]]);
//                 this.earthingReportArr.controls[index].controls.remarksName.setValue(this.earthingReportName[j]);
//                 index++;             
//              // }
//             }
//         //}
//         //earthingDescription
//         this.earthingDescArr=this.summaryArr.controls[w].controls.earthingDescription as FormArray;
//         let index1 =0;
//         for(let i of this.earthingData.earthingReport[0].earthingLpsDescription[w].earthingDescription){
//           for(let j = 0; j < this.earthingDescriptionName.length; j++){
//            // if(i[this.earthingDescriptionName[j]]!="" && i[this.earthingDescriptionName[j]]!= null){
//               this.earthingDescArr.push(this.createEarthingDescription());
//               this.earthingDescArr.controls[0].controls.heading.setValue('EarthingDescription Observation');
//               this.earthingDescArr.controls[index1].controls.observationComponentDetails.setValue('earthingDescriptionMain' + index1);
//               this.earthingDescArr.controls[index1].controls.serialNo.setValue(index1+1);
//               this.earthingDescArr.controls[index1].controls.observation.setValue(i[this.earthingDescriptionName[j]]);
//               this.earthingDescArr.controls[index1].controls.remarksName.setValue(this.earthingDescriptionName[j]);
//               index1++;            
//             //}
//           }
//     }
//     //earthingDescription list
//     this.earthingDescriptionListArr=this.summaryArr.controls[w].controls.earthingDescriptionList as FormArray;
//     let index0 =0;
//     let vatListIndex=1;
//     let indexVertical=0;
//     if(this.earthingData.earthingReport[0].earthingLpsDescription[w].earthingDescription.length!=0){
//       for(let i of this.earthingData.earthingReport[0].earthingLpsDescription[w].earthingDescription[0].earthingDescriptionList)
//       {
//         for(let j = 0; j < this.earthingDescriptionListName.length; j++){
//          // if(i[this.earthingDescriptionListName[j]]!="" && i[this.earthingDescriptionListName[j]]!= null){
//             this.earthingDescriptionListArr.push(this.createEarthingDescriptionList());
//             if(indexVertical==0){
//               this.earthingDescriptionListArr.controls[index0].controls.heading.setValue('EarthingDescription List-' + vatListIndex);
//             }
//             this.earthingDescriptionListArr.controls[index0].controls.observationComponentDetails.setValue('earthingDescriptionList' + index0);
//             this.earthingDescriptionListArr.controls[index0].controls.serialNo.setValue(indexVertical+1);
//             this.earthingDescriptionListArr.controls[index0].controls.observation.setValue(i[this.earthingDescriptionListName[j]]);
//             this.earthingDescriptionListArr.controls[index0].controls.remarksName.setValue(this.earthingDescriptionListName[j]);
//             index0++;
//             indexVertical++;        
//          // }
//         }
//         indexVertical=0;
//         vatListIndex++;
//   }
//     }
   
//     //earthingClamps
//     this.earthingClampsArr=this.summaryArr.controls[w].controls.earthingClamps as FormArray;
//     let index2 =0;
//     for(let i of this.earthingData.earthingReport[0].earthingLpsDescription[w].earthingClamps){
//       for(let j = 0; j < this.earthingClampsName.length; j++){
//        // if(i[this.earthingClampsName[j]]!="" && i[this.earthingClampsName[j]]!= null){
//           this.earthingClampsArr.push(this.createEarthingClamps());
//           this.earthingClampsArr.controls[0].controls.heading.setValue('EarthingClamps Observation');
//           this.earthingClampsArr.controls[index2].controls.observationComponentDetails.setValue('earthingClamps' + index2);
//           this.earthingClampsArr.controls[index2].controls.serialNo.setValue(index2+1);
//           this.earthingClampsArr.controls[index2].controls.observation.setValue(i[this.earthingClampsName[j]]);
//           this.earthingClampsArr.controls[index2].controls.remarksName.setValue(this.earthingClampsName[j]);
//           index2++;        
//        // }
//       }
//   }
//   //earthingElectrodeChamber
//   this.earthingElectrodeChamberArr=this.summaryArr.controls[w].controls.earthingElectrodeChamber as FormArray;
//   let index3 =0;
//   for(let i of this.earthingData.earthingReport[0].earthingLpsDescription[w].earthingElectrodeChamber){
//     for(let j = 0; j < this.earthingElectrodeChamberName.length; j++){
//      // if(i[this.earthingElectrodeChamberName[j]]!="" && i[this.earthingElectrodeChamberName[j]]!= null){
//         this.earthingElectrodeChamberArr.push(this.createEarthingElectrodeChamber());
//         this.earthingElectrodeChamberArr.controls[0].controls.heading.setValue('EarthingElectrodeChamber Observation');
//         this.earthingElectrodeChamberArr.controls[index3].controls.observationComponentDetails.setValue('earthingElectrodeChamber' + index3);
//         this.earthingElectrodeChamberArr.controls[index3].controls.serialNo.setValue(index3+1);
//         this.earthingElectrodeChamberArr.controls[index3].controls.observation.setValue(i[this.earthingElectrodeChamberName[j]]);
//         this.earthingElectrodeChamberArr.controls[index3].controls.remarksName.setValue(this.earthingElectrodeChamberName[j]);
//         index3++;      
//      // }
//     }
//   }

//     //earthingSystem
//     this.earthingSystemArr=this.summaryArr.controls[w].controls.earthingSystem as FormArray;
//     let index4 =0;
//     for(let i of this.earthingData.earthingReport[0].earthingLpsDescription[w].earthingSystem){
//     for(let j = 0; j < this.earthingSystemName.length; j++){
//     //  if(i[this.earthingSystemName[j]]!="" && i[this.earthingSystemName[j]]!= null){
//         this.earthingSystemArr.push(this.createEarthingSystem());
//         this.earthingSystemArr.controls[0].controls.heading.setValue('EarthingSystem Observation');
//         this.earthingSystemArr.controls[index4].controls.observationComponentDetails.setValue('earthingSystem' + index4);
//         this.earthingSystemArr.controls[index4].controls.serialNo.setValue(index4+1);
//         this.earthingSystemArr.controls[index4].controls.observation.setValue(i[this.earthingSystemName[j]]);
//         this.earthingSystemArr.controls[index4].controls.remarksName.setValue(this.earthingSystemName[j]);
//         index4++;      
//     //  }
//     }
//     }
//     //earthElectrodeTesting
//     this.earthElectrodeTestingArr=this.summaryArr.controls[w].controls.earthElectrodeTesting as FormArray;
//     let index5 =0;
//     for(let i of this.earthingData.earthingReport[0].earthingLpsDescription[w].earthElectrodeTesting){
//     for(let j = 0; j < this.earthElectrodeTestingName.length; j++){
//      // if(i[this.earthElectrodeTestingName[j]]!="" && i[this.earthElectrodeTestingName[j]]!= null){
//         this.earthElectrodeTestingArr.push(this.createEarthElectrodeTesting());
//         this.earthElectrodeTestingArr.controls[0].controls.heading.setValue('EarthElectrodeTesting Observation');
//         this.earthElectrodeTestingArr.controls[index5].controls.observationComponentDetails.setValue('earthElectrodeTesting' + index5);
//         this.earthElectrodeTestingArr.controls[index5].controls.serialNo.setValue(index5+1);
//         this.earthElectrodeTestingArr.controls[index5].controls.observation.setValue(i[this.earthElectrodeTestingName[j]]);
//         this.earthElectrodeTestingArr.controls[index5].controls.remarksName.setValue(this.earthElectrodeTestingName[j]);
//         index5++;      
//      // }
//     }
//     }
//       }
//     //spd
//     if(this.spdReportData.spdReport!=null && this.spdReportData.spdReport[0].spd.length !=0){
//       //spd report
//         this.spdReportArr=this.summaryArr.controls[w].controls.spdReport as FormArray;
//         let index =0;
//         //for(let i of this.spdReportData.spdReport[0].spd){
//             for(let j = 0; j < this.spdReportName.length; j++){
//             //  if(this.spdReportData.spdReport[0].spd[w][this.spdReportName[j]]!="" && this.spdReportData.spdReport[0].spd[w][this.spdReportName[j]]!= null){
//                 this.spdReportArr.push(this.createSpdReport());
//                 this.spdReportArr.controls[0].controls.heading.setValue('SPD Details Observation');
//                 this.spdReportArr.controls[index].controls.observationComponentDetails.setValue('spdReport' + index);
//                 this.spdReportArr.controls[index].controls.serialNo.setValue(index+1);
//                 this.spdReportArr.controls[index].controls.observation.setValue(this.spdReportData.spdReport[0].spd[w][this.spdReportName[j]]);
//                 this.spdReportArr.controls[index].controls.remarksName.setValue(this.spdReportName[j]);
//                 index++;              
//               }
//             //}
//         //}
//       //spd list
//       this.spdListArr=this.summaryArr.controls[w].controls.spdReportList as FormArray;
//       let index07 =0;
//       let vatListIndex=1;
//       let indexVertical=0;
//       for(let i of this.spdReportData.spdReport[0].spd[w].spdDescription)
//       {
//         for(let j = 0; j < this.spdReportListName.length; j++){
//         //  if(i[this.spdReportListName[j]]!="" && i[this.spdReportListName[j]]!= null){
//             this.spdListArr.push(this.createSpdReportList());
//             if(indexVertical==0){
//               this.spdListArr.controls[index07].controls.heading.setValue('SPD List-' + vatListIndex);
//             }
//           // this.spdListArr.controls[0].controls.heading.setValue('SPD List Observation');
//             this.spdListArr.controls[index07].controls.observationComponentDetails.setValue('spdDescription' + index07);
//             this.spdListArr.controls[index07].controls.serialNo.setValue(indexVertical+1);
//             this.spdListArr.controls[index07].controls.observation.setValue(i[this.spdReportListName[j]]);
//             this.spdListArr.controls[index07].controls.remarksName.setValue(this.spdReportListName[j]);
//             index07++;
//             indexVertical++;          
//          // }
//         }
//         indexVertical=0;
//         vatListIndex++;
//   }
//     }
//     //separationDistance
//     if(this.separationDistanceData.seperationDistanceReport!=null && this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription.length !=0){
//       //separationDistance report
//         this.separationDistanceArr=this.summaryArr.controls[w].controls.separationDistance as FormArray;
//         let index =0;
//         //for(let i of this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription){
//             for(let j = 0; j < this.separationDistanceName.length; j++){
//              // if(this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription[w][this.separationDistanceName[j]]!="" && this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription[w][this.separationDistanceName[j]]!= null){
//                 this.separationDistanceArr.push(this.createSeparationDistance());
//                 this.separationDistanceArr.controls[0].controls.heading.setValue('SeparationDistance Observation');
//                 this.separationDistanceArr.controls[index].controls.observationComponentDetails.setValue('seperationDistanceDescription' + index);
//                 this.separationDistanceArr.controls[index].controls.serialNo.setValue(index+1);
//                 this.separationDistanceArr.controls[index].controls.observation.setValue(this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription[w][this.separationDistanceName[j]]);
//                 this.separationDistanceArr.controls[index].controls.remarksName.setValue(this.separationDistanceName[j]);
//                 index++;              
//              // }
//             }
//       // }
//         this.separateDistanceArr=this.summaryArr.controls[w].controls.separateDistance as FormArray;
//         let indexS =0;
//         for(let i of this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription[w].separateDistance){
//           for(let j = 0; j < this.separateDistanceName.length; j++){
//           //  if(i[this.separateDistanceName[j]]!="" && i[this.separateDistanceName[j]]!= null){
//               this.separateDistanceArr.push(this.createSeparateDistance());
//               this.separateDistanceArr.controls[0].controls.heading.setValue('SeparateDistance Observation');
//               this.separateDistanceArr.controls[indexS].controls.observationComponentDetails.setValue('separateDistanceDesc' + indexS);
//               this.separateDistanceArr.controls[indexS].controls.serialNo.setValue(indexS+1);
//               this.separateDistanceArr.controls[indexS].controls.observation.setValue(i[this.separateDistanceName[j]]);
//               this.separateDistanceArr.controls[indexS].controls.remarksName.setValue(this.separateDistanceName[j]);
//               indexS++;            
//            // }
//           }
//       }
//       this.separationDistanceDownArr=this.summaryArr.controls[w].controls.separationDistanceDown as FormArray;
//       let indexSD =0;
//       for(let i of this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription[w].separateDistanceDownConductors){
//         for(let j = 0; j < this.separateDistanceDownName.length; j++){
//         //  if(i[this.separateDistanceDownName[j]]!="" && i[this.separateDistanceDownName[j]]!= null){
//             this.separationDistanceDownArr.push(this.createSeparationDownDistance());
//             this.separationDistanceDownArr.controls[0].controls.heading.setValue('SeparationDistanceDown Observation');
//             this.separationDistanceDownArr.controls[indexSD].controls.observationComponentDetails.setValue('separateDistanceDownConductors' + indexSD);
//             this.separationDistanceDownArr.controls[indexSD].controls.serialNo.setValue(indexSD+1);
//             this.separationDistanceDownArr.controls[indexSD].controls.observation.setValue(i[this.separateDistanceDownName[j]]);
//             this.separationDistanceDownArr.controls[indexSD].controls.remarksName.setValue(this.separateDistanceDownName[j]);
//             indexSD++;          
//         //  }
//         }
//     }
//     }
//     //equipotential bonding
//     if(this.equiBondingData.earthStudReport!=null && this.equiBondingData.earthStudReport[0].earthStudDescription.length !=0){
//         this.equiBondingArr=this.summaryArr.controls[w].controls.earthStudDesc as FormArray;
//         let index =0;
//         //for(let i of this.equiBondingData.earthStudReport[0].earthStudDescription){
//             for(let j = 0; j < this.earthStudDescName.length; j++){
//              // if(this.equiBondingData.earthStudReport[0].earthStudDescription[w][this.earthStudDescName[j]]!="" && this.equiBondingData.earthStudReport[0].earthStudDescription[w][this.earthStudDescName[j]]!= null){
//                 this.equiBondingArr.push(this.createEarthStudDesc());
//                 this.equiBondingArr.controls[0].controls.heading.setValue('EarthStud Observation');
//                 this.equiBondingArr.controls[index].controls.observationComponentDetails.setValue('earthStudDescription' + index);
//                 this.equiBondingArr.controls[index].controls.serialNo.setValue(index+1);
//                 this.equiBondingArr.controls[index].controls.observation.setValue(this.equiBondingData.earthStudReport[0].earthStudDescription[w][this.earthStudDescName[j]]);
//                 this.equiBondingArr.controls[index].controls.remarksName.setValue(this.earthStudDescName[j]);
//                 index++;              
//              // }
//             }
//       // }
//     }
//     }
//         } 
//       )
//      }
//     }

    retrieveObservationLpsSummaryOnload(){
    
      if (this.basicLpsId != undefined) {
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
            //let value=this.airTerminationData.airTermination[0].lpsAirDiscription[0];
           let airBasicFlag = true;
           let serialNo = 1;
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
                     }
                    this.airTerminationArr.controls[index].controls.observationComponentDetails.setValue('airBasicDescription' + index);
                    this.airTerminationArr.controls[index].controls.serialNo.setValue(index+1);
                    this.airTerminationArr.controls[index].controls.observation.setValue(i[this.airBasicName[j]]);
                    this.airTerminationArr.controls[index].controls.remarksName.setValue(this.airBasicName[j]);
                    index++;
                 // }
                }
            }
            //vertical
            this.airVerticalArr
            this.airVerticalArr=this.summaryArr.controls[w].controls.airVertical as FormArray;
            let index1 =0;
            let verticalFlag = true;
            let verticalSerialNo = 1;
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
                   }
                  this.airVerticalArr.controls[index1].controls.observationComponentDetails.setValue('lpsVerticalAirTermination' + index1);
                  this.airVerticalArr.controls[index1].controls.serialNo.setValue(index1 + 1);
                  this.airVerticalArr.controls[index1].controls.observation.setValue(i[this.airVerticalName[j]]);
                  this.airVerticalArr.controls[index1].controls.remarksName.setValue(this.airVerticalName[j]);
                  index1++;
              //  }
              }
        }
          //vertical list
          this.airVerticalListArr=this.summaryArr.controls[w].controls.airVerticalList as FormArray;
          let index0 =0;
          let vatListIndex=1;
          let indexVertical=0;
          if(this.airTerminationData.airTermination[0].lpsAirDiscription[w].lpsVerticalAirTermination.length!=0){
            
            let verticalListFlag = true;
            let verticalListSerialNo = 1;
            for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[w].lpsVerticalAirTermination[0].verticalAirTerminationList)
            {
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
                   }

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
           }

          this.airMeshArr.controls[index2].controls.observationComponentDetails.setValue('airMeshDescription' + index2);
          this.airMeshArr.controls[index2].controls.serialNo.setValue(index2+1);
          this.airMeshArr.controls[index2].controls.observation.setValue(i[this.airMeshName[j]]);
          this.airMeshArr.controls[index2].controls.remarksName.setValue(this.airMeshName[j]);
          index2++;
         // }
        }
    }
      //holder
      this.airHolderArr=this.summaryArr.controls[w].controls.airHolder as FormArray;
      let index3 =0;
      let holderFlag = true;
      let holderSerialNo = 1;
      for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[w].airHolderDescription){
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
             }
            this.airHolderArr.controls[index3].controls.observationComponentDetails.setValue('airHolderDescription' + index3);
            this.airHolderArr.controls[index3].controls.serialNo.setValue(index3+1);
            this.airHolderArr.controls[index3].controls.observation.setValue(i[this.airHolderName[j]]);
            this.airHolderArr.controls[index3].controls.remarksName.setValue(this.airHolderName[j]);
            index3++;        
         // }
      
        }
      }
      //holder list
      this.airHolderListArr=this.summaryArr.controls[w].controls.airHolderList as FormArray;
      let index01 =0;
      let holderListIndex=1;
      let indexHolder=0;
      if(this.airTerminationData.airTermination[0].lpsAirDiscription[w].airHolderDescription.length!=0){
        let holderListFlag = true;
        let holderListSerialNo = 1;
        for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[w].airHolderDescription[0].airHolderList)
        {
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
               }

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
             }

            this.airClampsArr.controls[index4].controls.observationComponentDetails.setValue('airClamps' + index4);
            this.airClampsArr.controls[index4].controls.serialNo.setValue(index4+1);
            this.airClampsArr.controls[index4].controls.observation.setValue(i[this.airClampsName[j]]);
            this.airClampsArr.controls[index4].controls.remarksName.setValue(this.airClampsName[j]);
            index4++;        
         // }
        }
      }
      //expansion
      this.airExpansionArr=this.summaryArr.controls[w].controls.airExpansion as FormArray;
      let index5 =0;
      let expansionFlag = true;
      let expansionSerialNo = 1;
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
             }

            this.airExpansionArr.controls[0].controls.heading.setValue('AT_Expansion Observation');
            this.airExpansionArr.controls[index5].controls.observationComponentDetails.setValue('airExpansion' + index5);
            this.airExpansionArr.controls[index5].controls.serialNo.setValue(index5+1);
            this.airExpansionArr.controls[index5].controls.observation.setValue(i[this.airExpansionName[j]]);
            this.airExpansionArr.controls[index5].controls.remarksName.setValue(this.airExpansionName[j]);
            index5++;        
         // }
        }
      }
      //connectors
      this.airConnectorsArr=this.summaryArr.controls[w].controls.airConnectors as FormArray;
      let index6 =0;
      let connectorsFlag = true;
      let connectorsSerialNo = 1;
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
             }
            this.airConnectorsArr.controls[0].controls.heading.setValue('AT_Connectors Observation');
            this.airConnectorsArr.controls[index6].controls.observationComponentDetails.setValue('airConnectors' + index6);
            this.airConnectorsArr.controls[index6].controls.serialNo.setValue(index6+1);
            this.airConnectorsArr.controls[index6].controls.observation.setValue(i[this.airConnectorsName[j]]);
            this.airConnectorsArr.controls[index6].controls.remarksName.setValue(this.airConnectorsName[j]);
            index6++;        
         // }
        }
      }
        } 
        //down conductors
        if(this.downConductorData.downConductorReport!=null && this.downConductorData.downConductorReport[0].downConductorDescription.length !=0){
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
                   }

                  this.downConductorsBasicArr.controls[index].controls.observationComponentDetails.setValue('downConductorBasicDescription' + index);
                  this.downConductorsBasicArr.controls[index].controls.serialNo.setValue(index+1);
                  this.downConductorsBasicArr.controls[index].controls.observation.setValue(this.downConductorData.downConductorReport[0].downConductorDescription[w][this.downBasicName[j]]);
                  this.downConductorsBasicArr.controls[index].controls.remarksName.setValue(this.downBasicName[j]);
                  index++;              
              //  }
              }
          //}
          //downConductor
          this.downConductorsArr=this.summaryArr.controls[w].controls.downConductor as FormArray;
          let index1 =0;
          let dwonconductorFlag = true;
          let downConductorSerialNo = 1;
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
                }
                this.downConductorsArr.controls[index1].controls.observationComponentDetails.setValue('downConductorDescription' + index1);
                this.downConductorsArr.controls[index1].controls.serialNo.setValue(index1+1);
                this.downConductorsArr.controls[index1].controls.observation.setValue(i[this.downConductorName[j]]);
                this.downConductorsArr.controls[index1].controls.remarksName.setValue(this.downConductorName[j]);
                index1++;            
             // }
            }
      }
        
      //Bridging
      this.bridgingDescArr=this.summaryArr.controls[w].controls.bridgingDesc as FormArray;
      let index2 =0;
      let bridgingFlag = true;
      let bridgingSerialNo = 1;
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
             }

            this.bridgingDescArr.controls[0].controls.heading.setValue('DC_Bridging Observation');
            this.bridgingDescArr.controls[index2].controls.observationComponentDetails.setValue('bridgingDescription' + index2);
            this.bridgingDescArr.controls[index2].controls.serialNo.setValue(index2+1);
            this.bridgingDescArr.controls[index2].controls.observation.setValue(i[this.bridgingName[j]]);
            this.bridgingDescArr.controls[index2].controls.remarksName.setValue(this.bridgingName[j]);
            index2++;        
          //}
        }
    }
    //holder
    this.downHoldersArr=this.summaryArr.controls[w].controls.downHolders as FormArray;
    let index3 =0;
    let holderFlag = true;
    let holderSerialNo = 1;
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
           }
          this.downHoldersArr.controls[0].controls.heading.setValue('DC_Holder Observation');
          this.downHoldersArr.controls[index3].controls.observationComponentDetails.setValue('holder' + index3);
          this.downHoldersArr.controls[index3].controls.serialNo.setValue(index3+1);
          this.downHoldersArr.controls[index3].controls.observation.setValue(i[this.downHolderName[j]]);
          this.downHoldersArr.controls[index3].controls.remarksName.setValue(this.downHolderName[j]);
          index3++;      
       // }
      }
  }
  
      //connectors
      this.downConnectorsArr=this.summaryArr.controls[w].controls.downConnectors as FormArray;
      let index4 =0;
      let connectorsFlag = true;
      let connectorsSerialNo = 1;
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
           }
          this.downConnectorsArr.controls[0].controls.heading.setValue('DC_Connectors Observation');
          this.downConnectorsArr.controls[index4].controls.observationComponentDetails.setValue('connectors' + index4);
          this.downConnectorsArr.controls[index4].controls.serialNo.setValue(index4+1);
          this.downConnectorsArr.controls[index4].controls.observation.setValue(i[this.connectorsName[j]]);
          this.downConnectorsArr.controls[index4].controls.remarksName.setValue(this.connectorsName[j]);
          index4++;      
       // }
      }
      }
      //testingJoint
      this.testingJointArr=this.summaryArr.controls[w].controls.testingJoint as FormArray;
      let index5 =0;
      let testingJointFlag = true;
      let testingJointSerialNo = 1;
      for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[w].testingJoint){
      for(let j = 0; j < this.testingJointName.length; j++){
       // if(i[this.testingJointName[j]]!="" && i[this.testingJointName[j]]!= null){
          this.testingJointArr.push(this.createTestingJoints());
          this.testingJointArr.controls[0].controls.heading.setValue('DC_TestingJoint Observation');

          if(i[this.testingJointName[j]]!="" && i[this.testingJointName[j]]!= null && testingJointFlag){
            this.lightingCounterArr.controls[index5].controls.headingUi.setValue('DC_TestingJoint Observation');
            testingJointFlag = false;
           }
           if(i[this.testingJointName[j]]!="" && i[this.testingJointName[j]]!= null){
            this.lightingCounterArr.controls[index5].controls.serialNoUi.setValue(testingJointSerialNo);
            testingJointSerialNo = testingJointSerialNo + 1;
            this.dwonconductorRemarks = true;
           }
          this.testingJointArr.controls[index5].controls.observationComponentDetails.setValue('testingJoint' + index5);
          this.testingJointArr.controls[index5].controls.serialNo.setValue(index5+1);
          this.testingJointArr.controls[index5].controls.observation.setValue(i[this.testingJointName[j]]);
          this.testingJointArr.controls[index5].controls.remarksName.setValue(this.testingJointName[j]);
          index5++;      
       // }
      }
      }
      //lightingCounter
      this.lightingCounterArr=this.summaryArr.controls[w].controls.lightingCounter as FormArray;
      let index6 =0;
      let lightingCounterFlag = true;
      let lightningCounterSerialNo = 1;
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
           }

          this.lightingCounterArr.controls[0].controls.heading.setValue('DC_LightningCounter Observation');
          this.lightingCounterArr.controls[index6].controls.observationComponentDetails.setValue('lightningCounter' + index6);
          this.lightingCounterArr.controls[index6].controls.serialNo.setValue(index6+1);
          this.lightingCounterArr.controls[index6].controls.observation.setValue(i[this.lightingCounterName[j]]);
          this.lightingCounterArr.controls[index6].controls.remarksName.setValue(this.lightingCounterName[j]);
          index6++;      
       // }
      }
      }
  
    //downConductorTesting
    this.downConductorTestingArr=this.summaryArr.controls[w].controls.downConductorTesting as FormArray;
    let index8 =0;
    let dwonconductorTestingFlag = true;
    let dwonconductorTestingSerialNo = 1;
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
         }

        this.downConductorTestingArr.controls[0].controls.heading.setValue('DC_DownConductorTesting Observation');
        this.downConductorTestingArr.controls[index8].controls.observationComponentDetails.setValue('downConductorTesting' + index8);
        this.downConductorTestingArr.controls[index8].controls.serialNo.setValue(index8+1);
        this.downConductorTestingArr.controls[index8].controls.observation.setValue(i[this.downConductorTestingName[j]]);
        this.downConductorTestingArr.controls[index8].controls.remarksName.setValue(this.downConductorTestingName[j]);
        index8++;    
     // }
    }
    }
        }
        //earthing
        let earthingFlag = true;
        let earthingSerialNo = 1;
        if(this.earthingData.earthingReport!=null && this.earthingData.earthingReport[0].earthingLpsDescription.length !=0){
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
                  }

                  this.earthingReportArr.controls[0].controls.heading.setValue('ET_Basic Details Observation');
                  this.earthingReportArr.controls[index].controls.observationComponentDetails.setValue('earthingLpsDescription' + index);
                  this.earthingReportArr.controls[index].controls.serialNo.setValue(index+1);
                  this.earthingReportArr.controls[index].controls.observation.setValue(this.earthingData.earthingReport[0].earthingLpsDescription[w][this.earthingReportName[j]]);
                  this.earthingReportArr.controls[index].controls.remarksName.setValue(this.earthingReportName[j]);
                  index++;             
               // }
              }
          //}
          //earthingDescription
          let earthingDescriptionFlag = true;
          let earthingDescriptionSerialNo = 1;

          this.earthingDescArr=this.summaryArr.controls[w].controls.earthingDescription as FormArray;
          let index1 =0;
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
                }
                this.earthingDescArr.controls[0].controls.heading.setValue('EarthingDescription Observation');
                this.earthingDescArr.controls[index1].controls.observationComponentDetails.setValue('earthingDescriptionMain' + index1);
                this.earthingDescArr.controls[index1].controls.serialNo.setValue(index1+1);
                this.earthingDescArr.controls[index1].controls.observation.setValue(i[this.earthingDescriptionName[j]]);
                this.earthingDescArr.controls[index1].controls.remarksName.setValue(this.earthingDescriptionName[j]);
                index1++;            
              //}
            }
      }
      //earthingDescription list
      this.earthingDescriptionListArr=this.summaryArr.controls[w].controls.earthingDescriptionList as FormArray;
      let index0 =0;
      let vatListIndex=1;
      let indexVertical=0;
      if(this.earthingData.earthingReport[0].earthingLpsDescription[w].earthingDescription.length!=0){

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
              }

              this.earthingDescriptionListArr.controls[index0].controls.observationComponentDetails.setValue('earthingDescriptionList' + index0);
              this.earthingDescriptionListArr.controls[index0].controls.serialNo.setValue(indexVertical+1);
              this.earthingDescriptionListArr.controls[index0].controls.observation.setValue(i[this.earthingDescriptionListName[j]]);
              this.earthingDescriptionListArr.controls[index0].controls.remarksName.setValue(this.earthingDescriptionListName[j]);
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
            }

            this.earthingClampsArr.controls[index2].controls.observationComponentDetails.setValue('earthingClamps' + index2);
            this.earthingClampsArr.controls[index2].controls.serialNo.setValue(index2+1);
            this.earthingClampsArr.controls[index2].controls.observation.setValue(i[this.earthingClampsName[j]]);
            this.earthingClampsArr.controls[index2].controls.remarksName.setValue(this.earthingClampsName[j]);
            index2++;        
         // }
        }
    }
    //earthingElectrodeChamber
    this.earthingElectrodeChamberArr=this.summaryArr.controls[w].controls.earthingElectrodeChamber as FormArray;
    let index3 =0;
    let earthingElectrodeChamberFlag = true;
    let earthingElectrodeChamberSerialNo = 1;
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
          }
          this.earthingElectrodeChamberArr.controls[0].controls.heading.setValue('EarthingElectrodeChamber Observation');
          this.earthingElectrodeChamberArr.controls[index3].controls.observationComponentDetails.setValue('earthingElectrodeChamber' + index3);
          this.earthingElectrodeChamberArr.controls[index3].controls.serialNo.setValue(index3+1);
          this.earthingElectrodeChamberArr.controls[index3].controls.observation.setValue(i[this.earthingElectrodeChamberName[j]]);
          this.earthingElectrodeChamberArr.controls[index3].controls.remarksName.setValue(this.earthingElectrodeChamberName[j]);
          index3++;      
       // }
      }
    }
  
      //earthingSystem
      this.earthingSystemArr=this.summaryArr.controls[w].controls.earthingSystem as FormArray;
      let index4 =0;
      let earthingSystemFlag = true;
      let earthingSystemserialNo = 1;
      for(let i of this.earthingData.earthingReport[0].earthingLpsDescription[w].earthingSystem){
      for(let j = 0; j < this.earthingSystemName.length; j++){
      //  if(i[this.earthingSystemName[j]]!="" && i[this.earthingSystemName[j]]!= null){
          this.earthingSystemArr.push(this.createEarthingSystem());
          this.earthingSystemArr.controls[0].controls.heading.setValue('EarthingSystem Observation');

          if(i[this.earthingSystemName[j]]!="" && i[this.earthingSystemName[j]]!= null && earthingSystemFlag){
            this.earthingSystemArr.controls[index4].controls.headingUi.setValue('EarthingSystem Observation');
            earthingSystemFlag = false;
          }
          if(i[this.earthingSystemName[j]]!="" && i[this.earthingSystemName[j]]!= null){
            this.earthingSystemArr.controls[index4].controls.serialNoUi.setValue(earthingSystemserialNo);
            earthingSystemserialNo = earthingSystemserialNo + 1;
          }
          this.earthingSystemArr.controls[index4].controls.observationComponentDetails.setValue('earthingSystem' + index4);
          this.earthingSystemArr.controls[index4].controls.serialNo.setValue(index4+1);
          this.earthingSystemArr.controls[index4].controls.observation.setValue(i[this.earthingSystemName[j]]);
          this.earthingSystemArr.controls[index4].controls.remarksName.setValue(this.earthingSystemName[j]);
          index4++;      
      //  }
      }
      }
      //earthElectrodeTesting
      this.earthElectrodeTestingArr=this.summaryArr.controls[w].controls.earthElectrodeTesting as FormArray;
      let index5 =0;
      let earthElectodeTestingFlag = true;
      let earthingelectrodeTestingSerialNo = 1;
      for(let i of this.earthingData.earthingReport[0].earthingLpsDescription[w].earthElectrodeTesting){
      for(let j = 0; j < this.earthElectrodeTestingName.length; j++){
       // if(i[this.earthElectrodeTestingName[j]]!="" && i[this.earthElectrodeTestingName[j]]!= null){
          this.earthElectrodeTestingArr.push(this.createEarthElectrodeTesting());

          if(i[this.earthElectrodeTestingName[j]]!="" && i[this.earthElectrodeTestingName[j]]!= null && earthElectodeTestingFlag){
            this.earthElectrodeTestingArr.controls[index5].controls.headingUi.setValue('EarthElectrodeTesting Observation');
            earthElectodeTestingFlag = false;
          }
          if(i[this.earthElectrodeTestingName[j]]!="" && i[this.earthElectrodeTestingName[j]]!= null){
            this.earthElectrodeTestingArr.controls[index5].controls.serialNoUi.setValue(earthingelectrodeTestingSerialNo);
            earthingelectrodeTestingSerialNo = earthingelectrodeTestingSerialNo + 1;
          }
          this.earthElectrodeTestingArr.controls[0].controls.heading.setValue('EarthElectrodeTesting Observation');
          this.earthElectrodeTestingArr.controls[index5].controls.observationComponentDetails.setValue('earthElectrodeTesting' + index5);
          this.earthElectrodeTestingArr.controls[index5].controls.serialNo.setValue(index5+1);
          this.earthElectrodeTestingArr.controls[index5].controls.observation.setValue(i[this.earthElectrodeTestingName[j]]);
          this.earthElectrodeTestingArr.controls[index5].controls.remarksName.setValue(this.earthElectrodeTestingName[j]);
          index5++;      
       // }
      }
      }
        }
      //spd
      if(this.spdReportData.spdReport!=null && this.spdReportData.spdReport[0].spd.length !=0){
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
                  }
                  this.spdReportArr.controls[index].controls.observationComponentDetails.setValue('spdReport' + index);
                  this.spdReportArr.controls[index].controls.serialNo.setValue(index+1);
                  this.spdReportArr.controls[index].controls.observation.setValue(this.spdReportData.spdReport[0].spd[w][this.spdReportName[j]]);
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
                  }

            // this.spdListArr.controls[0].controls.heading.setValue('SPD List Observation');
              this.spdListArr.controls[index07].controls.observationComponentDetails.setValue('spdDescription' + index07);
              this.spdListArr.controls[index07].controls.serialNo.setValue(indexVertical+1);
              this.spdListArr.controls[index07].controls.observation.setValue(i[this.spdReportListName[j]]);
              this.spdListArr.controls[index07].controls.remarksName.setValue(this.spdReportListName[j]);
              index07++;
              indexVertical++;          
           // }
          }
          indexVertical=0;
          vatListIndex++;
    }
      }
      //separationDistance
      if(this.separationDistanceData.seperationDistanceReport!=null && this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription.length !=0){
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
                }
                  this.separationDistanceArr.controls[index].controls.observationComponentDetails.setValue('seperationDistanceDescription' + index);
                  this.separationDistanceArr.controls[index].controls.serialNo.setValue(index+1);
                  this.separationDistanceArr.controls[index].controls.observation.setValue(this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription[w][this.separationDistanceName[j]]);
                  this.separationDistanceArr.controls[index].controls.remarksName.setValue(this.separationDistanceName[j]);
                  index++;              
               // }
              }
        // }
          this.separateDistanceArr=this.summaryArr.controls[w].controls.separateDistance as FormArray;
          let indexS =0;
          let separateDistanceFlag = true;
          let separateDistanceSerialNo = 1;
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
              }
                this.separateDistanceArr.controls[indexS].controls.observationComponentDetails.setValue('separateDistanceDesc' + indexS);
                this.separateDistanceArr.controls[indexS].controls.serialNo.setValue(indexS+1);
                this.separateDistanceArr.controls[indexS].controls.observation.setValue(i[this.separateDistanceName[j]]);
                this.separateDistanceArr.controls[indexS].controls.remarksName.setValue(this.separateDistanceName[j]);
                indexS++;            
             // }
            }
        }
        this.separationDistanceDownArr=this.summaryArr.controls[w].controls.separationDistanceDown as FormArray;
        let indexSD =0;
        let separationDistanceDownFlag = true;
        let separationDistanceDownSerialNo = 1;
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
              }
              this.separationDistanceDownArr.controls[indexSD].controls.observationComponentDetails.setValue('separateDistanceDownConductors' + indexSD);
              this.separationDistanceDownArr.controls[indexSD].controls.serialNo.setValue(indexSD+1);
              this.separationDistanceDownArr.controls[indexSD].controls.observation.setValue(i[this.separateDistanceDownName[j]]);
              this.separationDistanceDownArr.controls[indexSD].controls.remarksName.setValue(this.separateDistanceDownName[j]);
              indexSD++;          
          //  }
          }
      }
      }

      //equipotential bonding
  
      if(this.equiBondingData.earthStudReport!=null && this.equiBondingData.earthStudReport[0].earthStudDescription.length !=0){
          this.equiBondingArr=this.summaryArr.controls[w].controls.earthStudDesc as FormArray;
          let index =0;
          let earthStudFlag = true;
          let earthStudFlagSerialNo = 1;
          for(let j = 0; j < this.earthStudDescName.length; j++){

                  this.equiBondingArr.push(this.createEarthStudDesc());
                  this.equiBondingArr.controls[0].controls.heading.setValue('EarthStud Observation');

                  if (this.equiBondingData.earthStudReport[0].earthStudDescription[0][this.earthStudDescName[j]]!="" 
                  && this.equiBondingData.earthStudReport[0].earthStudDescription[0][this.earthStudDescName[j]]!= null && earthStudFlag) {
                    this.equiBondingArr.controls[index].controls.headingUi.setValue('EarthStud Observation');
                    earthStudFlag = false;
                  }
                  if (this.equiBondingData.earthStudReport[0].earthStudDescription[0][this.earthStudDescName[j]]!="" 
                  && this.equiBondingData.earthStudReport[0].earthStudDescription[0][this.earthStudDescName[j]]!= null) {
                    this.equiBondingArr.controls[index].controls.serialNoUi.setValue(earthStudFlagSerialNo);
                    earthStudFlagSerialNo = earthStudFlagSerialNo + 1;
                  }
                  this.equiBondingArr.controls[index].controls.observationComponentDetails.setValue('earthStudDescription' + index);
                  this.equiBondingArr.controls[index].controls.serialNo.setValue(index+1);
                  this.equiBondingArr.controls[index].controls.observation.setValue(this.equiBondingData.earthStudReport[0].earthStudDescription[0][this.earthStudDescName[j]]);
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
      this.downloadPdf();
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
      for(let j of i.controls.airTermination.controls){
      summaryLpsObservationArr.push(j);
      }
      for(let j of i.controls.airVertical.controls){
        //if(j.controls.observationComponentDetails.value=='lpsVerticalAirTermination0'){
          // for(let list1 of i.controls.airVerticalList.controls){
          //   j.controls.summaryLpsInnerObservation.push(list1);
          // }
        //}
        summaryLpsObservationArr.push(j);
      }

      for(let j of i.controls.airVerticalList.controls){
        summaryLpsObservationArr.push(j);
      }
      
      for(let j of i.controls.airMesh.controls){
        summaryLpsObservationArr.push(j);
      }
      for(let j of i.controls.airHolder.controls){
        // if(j.controls.observationComponentDetails.value=='airHolderDescription0'){
        //   for(let list1 of i.controls.airHolderList.controls){
        //     j.controls.summaryLpsInnerObservation.push(list1);
        //   }
        // }
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
        // if(j.controls.observationComponentDetails.value=='earthingDescription0'){
        //   for(let list1 of i.controls.earthingDescriptionList.controls){
        //     j.controls.summaryLpsInnerObservation.push(list1);
        //   }
        // }
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
        // if(j.controls.observationComponentDetails.value=='spdReport0'){
        //   for(let list1 of i.controls.spdReportList.controls){
        //     j.controls.summaryLpsInnerObservation.push(list1);
        //   }
        // }
        summaryLpsObservationArr.push(j);
      }

      for(let j of i.controls.spdReportList.controls){
        summaryLpsObservationArr.push(j);
      }

      for(let j of i.controls.separationDistance.controls){
        // if(j.controls.observationComponentDetails.value=='seperationDistanceDescription0'){
        //   for(let list1 of i.controls.separateDistance.controls){
        //     j.controls.summaryLpsInnerObservation.push(list1);
        //   }
        //   for(let list2 of i.controls.separationDistanceDown.controls){
        //     j.controls.summaryLpsInnerObservation.push(list2);
        //   }
        // }
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
      this.summaryForm.value.Declaration1Arr[0].signature=this.service.bytestring7;
      this.summaryForm.value.Declaration2Arr[0].signature=this.service.bytestring8;
      this.lpsSummary.summaryLpsBuildings= this.summaryForm.value.summaryLpsBuildings;
      this.lpsSummary.summaryLpsDeclaration= this.summaryForm.value.Declaration1Arr;
      this.lpsSummary.summaryLpsDeclaration = this.lpsSummary.summaryLpsDeclaration.concat(this.summaryForm.value.Declaration2Arr);

      if (flag1) {
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
          }
          else{
            this.popup=true;
            this.spinner=false;
            this.finalSpinner=false;
            this.popup1=true;
            this.proceedNext.emit(true);
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
        })}

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
              this.proceedNext.emit(true);
            }
          },
          (error)=> {
            this.popup=true;
            this.spinner=false;
            this.finalSpinner=false;
            this.popup1=true;
            this.Error = true;
            this.errorArr = [];
            this.errorArr = JSON.parse(error.error);
            this.errorMsg = this.errorArr.message;

          }
        )};
    }

    retriveSummaryWhileUpdateSave(){
      
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

  downloadPdf() {
    this.summaryPdf.downloadSummaryPDF(this.basicLpsId,this.email,this.lpsSummaryPDF);
  }

  }
