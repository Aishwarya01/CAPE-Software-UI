import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { flag, save } from 'ngx-bootstrap-icons';
import { ConfirmationBoxComponent } from 'src/app/confirmation-box/confirmation-box.component';
import { GlobalsService } from 'src/app/globals.service';
// import { LpsSummaryConst } from 'src/app/LPS_constants/lps-summary-const';
import { LpsSummary } from 'src/app/LPS_model/lps-summary';
import { AirterminationService } from 'src/app/LPS_services/airtermination.service';
import { SummaryServiceService } from 'src/app/LPS_services/summary-service.service';
import { SuperAdminDev } from 'src/environments/environment.dev';
import { SuperAdminProd } from 'src/environments/environment.prod';
import { LpsMatstepperComponent } from '../lps-matstepper/lps-matstepper.component';

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
    isEditable:boolean=false;
    submittedButton: boolean = true;
    saveButton: boolean = false;
    buttonType:  string="";
    //For super admin purpose
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
  finalSpinner: boolean=false;
  spinnerValue: String = '';
  mode: any = 'indeterminate';
  nextButton: boolean = true;
  popup: boolean = false;
  popup1: boolean = false;

  constructor(private summaryService:SummaryServiceService,private formBuilder: FormBuilder,
    private airterminationServices: AirterminationService, private router: ActivatedRoute,
    private dialog: MatDialog,private modalService: NgbModal,public service: GlobalsService,
    private matStepper: LpsMatstepperComponent
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
  }

    ngOnInit(): void {
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
        this.retrieveObservationLpsSummaryOnload();
      }, 3000);
        
    }
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
        signature: new FormControl(''),
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
        signature: new FormControl(''),
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
        summaryLpsInnerObservation: this.formBuilder.array([]),
      });
    }
    createSeparateDistance(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
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
        observationComponentDetails: new FormControl(''),
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
            if (this.airTerminationDesc != '' && this.airTerminationDesc != undefined && this.airTerminationDesc.length != 0) {
              if(numberOfBuildingCountlength == 0 ){
                for (let i = 0; i < airterminationlength; i++) {
                  this.addSummaryLPS();
                }
              }
              else{
                for (let i = 0; numberOfBuildingCountlength > airterminationlength; i++) {
                  this.addSummaryLPS();
                  airterminationlength = airterminationlength+1;
                }
              } 
           }
            this.summaryLpsBuildingsArr=[]
            this.summaryLpsBuildingsArr = this.summaryForm.get('summaryLpsBuildings') as FormArray
           
            if(this.airTerminationDesc.length < numberOfBuildingCountlength || numberOfBuildingCountlength == 0 ){

              for (let j = 0;  j < this.airTerminationDesc.length; j++) {
        
                let summaryDataAlreadythere = 'No';
                for (let i = 0; summaryDataAlreadythere == "No"&& this.numberOfBuildingCount.length !=0 && i < this.airTerminationDesc.length; i++) {
                  if (this.jsonData.summaryLpsBuildings[i].buildingCount != this.airTerminationDesc[j].buildingCount) {
                    summaryDataAlreadythere = "yes";
                  }
                }
                if (summaryDataAlreadythere != "yes") {
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

       this.summaryForm.controls.recommendYears.setValue(data.inspectedYear);
       this.summaryForm.controls.declarationDate.setValue(data.summaryDate);
      //  this.summaryForm.controls.declarationDate.setValue(data.summaryDate);
       this.summaryForm.setControl('summaryLpsBuildings', this.formBuilder.array(this.arr || []));
       this.summaryForm.setControl('Declaration1Arr', this.formBuilder.array(this.arr1 || []));
       this.summaryForm.setControl('Declaration2Arr', this.formBuilder.array(this.arr2 || []));
      
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
         let earthing1: any=[];
         let earthing2: any=[];
         let earthing3: any=[];
         let earthing4: any=[];
         let earthing5: any=[];
         let earthing6: any=[];
         let earthingList: any=[];
         //spd
         let spd1: any=[];
         let spd2: any=[];
        //separation distance
        let separation1: any=[];
        let separation2: any=[];
        let separation3: any=[];
        //equipotential
        let equipotential1: any=[];

        for(let i of item.summaryLpsObservation){
          if(i.observationComponentDetails.includes('airBasicDescription')){
            airTermination.push(i);
          }
          if(i.observationComponentDetails.includes('lpsVerticalAirTermination')){
            airTermination1.push(i);
            // if(i.observationComponentDetails.includes('lpsVerticalAirTermination0')){
            //   if(i.summaryLpsInnerObservation.length!=0){
            //     airTerminationList=i.summaryLpsInnerObservation;
            //   }
            // }
          }
          if(i.observationComponentDetails.includes('verticalAirTerminationList')) {
            airTerminationList.push(i);
          }
          if(i.observationComponentDetails.includes('airMeshDescription')){
            airTermination2.push(i);
          }
          if(i.observationComponentDetails.includes('airHolderDescription')){
            airTermination3.push(i);
            // if(i.observationComponentDetails.includes('airHolderDescription0')){
            //   if(i.summaryLpsInnerObservation.length!=0){
            //     airTerminationHolderList=i.summaryLpsInnerObservation;
            //   }
            // }
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
            earthing1.push(i);
          }
          if(i.observationComponentDetails.includes('earthingDescriptionMain')){
            earthing2.push(i);
            // if(i.observationComponentDetails.includes('earthingDescription0')){
            //   if(i.summaryLpsInnerObservation.length!=0){
            //     earthingList=i.summaryLpsInnerObservation;
            //   }
            // }
          }
          if(i.observationComponentDetails.includes('earthingDescriptionList')){
            earthingList.push(i);
          }
          if(i.observationComponentDetails.includes('earthingClamps')){
            earthing3.push(i);
          }
          if(i.observationComponentDetails.includes('earthingElectrodeChamber')){
            earthing4.push(i);
          }
          if(i.observationComponentDetails.includes('earthingSystem')){
            earthing5.push(i);
          }
          if(i.observationComponentDetails.includes('earthElectrodeTesting')){
            earthing6.push(i);
          }
           //spd
           if(i.observationComponentDetails.includes('spdReport')){
              spd1.push(i);
              // if(i.observationComponentDetails.includes('spdReport0')){
              //   if(i.summaryLpsInnerObservation.length!=0){
              //     spd2=i.summaryLpsInnerObservation;
              //   }
              // }
            }

            if(i.observationComponentDetails.includes('spdDescription')){
              spd2.push(i);
            }
           //separation distance
           if(i.observationComponentDetails.includes('seperationDistanceDescription')){
            separation1.push(i);
            // if(i.summaryLpsInnerObservation.length!=0){
            //   for(let value of i.summaryLpsInnerObservation){
            //     if(value.observationComponentDetails.includes('separateDistanceDesc')){
            //       separation2.push(value);
            //     }
            //     if(value.observationComponentDetails.includes('separateDistanceDownConductors')){
            //       separation3.push(value);
            //     }
            //   }
            // }
          }

          if(i.observationComponentDetails.includes('separateDistanceDesc')){
            separation2.push(i);
          }

          if(i.observationComponentDetails.includes('separateDistanceDownConductors')){
            separation3.push(i);
          }
          //equipotential
          if(i.observationComponentDetails.includes('earthStudDescription')){
            equipotential1.push(i);
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
        earthingReport: this.formBuilder.array(this.populateArray(earthing1)),
        earthingDescription: this.formBuilder.array(this.populateArray(earthing2)),
        earthingDescriptionList: this.formBuilder.array(this.populateArray(earthingList)),
        earthingClamps: this.formBuilder.array(this.populateArray(earthing3)),
        earthingElectrodeChamber: this.formBuilder.array(this.populateArray(earthing4)),
        earthingSystem: this.formBuilder.array(this.populateArray(earthing5)),
        earthElectrodeTesting: this.formBuilder.array(this.populateArray(earthing6)),
        //spd
        spdReport: this.formBuilder.array(this.populateArray(spd1)),
        spdReportList: this.formBuilder.array(this.populateArray(spd2)),
        //separation distance
        separationDistance: this.formBuilder.array(this.populateArray(separation1)),
        separateDistance: this.formBuilder.array(this.populateArray(separation2)),
        separationDistanceDown: this.formBuilder.array(this.populateArray(separation3)),
        //equipotential bonding
        earthStudDesc: this.formBuilder.array(this.populateArray(equipotential1)),
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
    
    retrieveObservationLpsSummary(basicLpsId: any){
     if (this.basicLpsId != undefined) {
      this.summaryService.retrieveObservationSummaryLps(basicLpsId).subscribe(
      data=>{
        this.retrieveFromAirTermination();
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
          this.airTerminationArr=this.summaryArr.controls[w].controls.airTermination as FormArray;
          let index =0;
          //let value=this.airTerminationData.airTermination[0].lpsAirDiscription[0];
          for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[w].airBasicDescription){
              for(let j = 0; j < this.airBasicName.length; j++){
                if(i[this.airBasicName[j]]!="" && i[this.airBasicName[j]]!=null){
                  this.airTerminationArr.push(this.createAirTermination());
                  this.airTerminationArr.controls[0].controls.heading.setValue('AT_Basic Details Observation');
                  this.airTerminationArr.controls[index].controls.observationComponentDetails.setValue('airBasicDescription' + index);
                  this.airTerminationArr.controls[index].controls.serialNo.setValue(index+1);
                  this.airTerminationArr.controls[index].controls.observation.setValue(i[this.airBasicName[j]]);
                  index++;
                }
              }
          }
          //vertical
          this.airVerticalArr=this.summaryArr.controls[w].controls.airVertical as FormArray;
          let index1 =0;
          for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[w].lpsVerticalAirTermination){
            for(let j = 0; j < this.airVerticalName.length; j++){
              if(i[this.airVerticalName[j]]!="" && i[this.airVerticalName[j]]!= null){
                this.airVerticalArr.push(this.createAirVertical());
                this.airVerticalArr.controls[0].controls.heading.setValue('AT_Vertical Observation');
                this.airVerticalArr.controls[index1].controls.observationComponentDetails.setValue('lpsVerticalAirTermination' + index1);
                this.airVerticalArr.controls[index1].controls.serialNo.setValue(index1 + 1);
                this.airVerticalArr.controls[index1].controls.observation.setValue(i[this.airVerticalName[j]]);
                index1++;
              }
            }
      }
        //vertical list
        this.airVerticalListArr=this.summaryArr.controls[w].controls.airVerticalList as FormArray;
        let index0 =0;
        let vatListIndex=1;
        let indexVertical=0;
        if(this.airTerminationData.airTermination[0].lpsAirDiscription[w].lpsVerticalAirTermination.length!=0){
          for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[w].lpsVerticalAirTermination[0].verticalAirTerminationList)
          {
            for(let j = 0; j < this.airVerticalListName.length; j++){
              if(i[this.airVerticalListName[j]]!=""  && i[this.airVerticalListName[j]]!= null){
                this.airVerticalListArr.push(this.createAirVerticalList());
                if(indexVertical == 0){
                  this.airVerticalListArr.controls[index0].controls.heading.setValue('AT_Vertical List-' + vatListIndex);
                }
                this.airVerticalListArr.controls[index0].controls.observationComponentDetails.setValue('verticalAirTerminationList' + index0);
                this.airVerticalListArr.controls[index0].controls.serialNo.setValue(indexVertical + 1);
                this.airVerticalListArr.controls[index0].controls.observation.setValue(i[this.airVerticalListName[j]]);
                index0++;
                indexVertical++;
              }
            }
            indexVertical=0;
            vatListIndex++;
          }
        }
       
    //mesh
    this.airMeshArr=this.summaryArr.controls[w].controls.airMesh as FormArray;
    let index2 =0;
    for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[w].airMeshDescription){
      for(let j = 0; j < this.airMeshName.length; j++){
        if(i[this.airMeshName[j]]!="" && i[this.airMeshName[j]]!= null){
        this.airMeshArr.push(this.createAirMesh());
        this.airMeshArr.controls[0].controls.heading.setValue('AT_Mesh Observation');
        this.airMeshArr.controls[index2].controls.observationComponentDetails.setValue('airMeshDescription' + index2);
        this.airMeshArr.controls[index2].controls.serialNo.setValue(index2+1);
        this.airMeshArr.controls[index2].controls.observation.setValue(i[this.airMeshName[j]]);
        index2++;
        }
      }
  }
    //holder
    this.airHolderArr=this.summaryArr.controls[w].controls.airHolder as FormArray;
    let index3 =0;
    for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[w].airHolderDescription){
      for(let j = 0; j < this.airHolderName.length; j++){
        if(i[this.airHolderName[j]]!="" && i[this.airHolderName[j]]!= null){
          this.airHolderArr.push(this.createAirHolder());
          this.airHolderArr.controls[0].controls.heading.setValue('AT_Holder Observation');
          this.airHolderArr.controls[index3].controls.observationComponentDetails.setValue('airHolderDescription' + index3);
          this.airHolderArr.controls[index3].controls.serialNo.setValue(index3+1);
          this.airHolderArr.controls[index3].controls.observation.setValue(i[this.airHolderName[j]]);
          index3++;        
        }
    
      }
    }
    //holder list
    this.airHolderListArr=this.summaryArr.controls[w].controls.airHolderList as FormArray;
    let index01 =0;
    let holderListIndex=1;
    let indexHolder=0;
    if(this.airTerminationData.airTermination[0].lpsAirDiscription[w].airHolderDescription.length!=0){
      for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[w].airHolderDescription[0].airHolderList)
      {
        for(let j = 0; j < this.airHolderListName.length; j++){
          if(i[this.airHolderListName[j]]!="" && i[this.airHolderListName[j]]!= null){
            this.airHolderListArr.push(this.createAirHolderList());
            if(indexHolder == 0){
            this.airHolderListArr.controls[index01].controls.heading.setValue('AT_Holder List-' + holderListIndex);
            }
            this.airHolderListArr.controls[index01].controls.observationComponentDetails.setValue('airHolderList' + index01);
            this.airHolderListArr.controls[index01].controls.serialNo.setValue(indexHolder+1);
            this.airHolderListArr.controls[index01].controls.observation.setValue(i[this.airHolderListName[j]]);
            index01++;
            indexHolder++;
          }
        }
        indexHolder=0;
        holderListIndex++;
      }
    }
   
    //clamps
    this.airClampsArr=this.summaryArr.controls[w].controls.airClamps as FormArray;
    let index4 =0;
    for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[w].airClamps){
      for(let j = 0; j < this.airClampsName.length; j++){
        if(i[this.airClampsName[j]]!="" && i[this.airClampsName[j]]!= null){
          this.airClampsArr.push(this.createAirClamps());
          this.airClampsArr.controls[0].controls.heading.setValue('AT_Clamps Observation');
          this.airClampsArr.controls[index4].controls.observationComponentDetails.setValue('airClamps' + index4);
          this.airClampsArr.controls[index4].controls.serialNo.setValue(index4+1);
          this.airClampsArr.controls[index4].controls.observation.setValue(i[this.airClampsName[j]]);
          index4++;        
        }
      }
    }
    //expansion
    this.airExpansionArr=this.summaryArr.controls[w].controls.airExpansion as FormArray;
    let index5 =0;
    for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[w].airExpansion){
      for(let j = 0; j < this.airExpansionName.length; j++){
        if(i[this.airExpansionName[j]]!="" && i[this.airExpansionName[j]]!= null){
          this.airExpansionArr.push(this.createAirExpansion());
          this.airExpansionArr.controls[0].controls.heading.setValue('AT_Expansion Observation');
          this.airExpansionArr.controls[index5].controls.observationComponentDetails.setValue('airExpansion' + index5);
          this.airExpansionArr.controls[index5].controls.serialNo.setValue(index5+1);
          this.airExpansionArr.controls[index5].controls.observation.setValue(i[this.airExpansionName[j]]);
          index5++;        
        }
      }
    }
    //connectors
    this.airConnectorsArr=this.summaryArr.controls[w].controls.airConnectors as FormArray;
    let index6 =0;
    for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[w].airConnectors){
      for(let j = 0; j < this.airConnectorsName.length; j++){
        if(i[this.airConnectorsName[j]]!="" && i[this.airConnectorsName[j]]!= null){
          this.airConnectorsArr.push(this.createAirConnectors());
          this.airConnectorsArr.controls[0].controls.heading.setValue('AT_Connectors Observation');
          this.airConnectorsArr.controls[index6].controls.observationComponentDetails.setValue('airConnectors' + index6);
          this.airConnectorsArr.controls[index6].controls.serialNo.setValue(index6+1);
          this.airConnectorsArr.controls[index6].controls.observation.setValue(i[this.airConnectorsName[j]]);
          index6++;        
        }
      }
    }
      } 
      //down conductors
      if(this.downConductorData.downConductorReport!=null){
        this.downConductorsBasicArr=this.summaryArr.controls[w].controls.downConductorReport as FormArray;
        let index =0; 
        // for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[w]){
            for(let j = 0; j < this.downBasicName.length; j++){
              if(this.downConductorData.downConductorReport[0].downConductorDescription[w][this.downBasicName[j]]!="" 
                 && this.downConductorData.downConductorReport[0].downConductorDescription[w][this.downBasicName[j]] != null){
                this.downConductorsBasicArr.push(this.createDownConductorsBasic());
                this.downConductorsBasicArr.controls[0].controls.heading.setValue('DC_Basic Details Observation');
                this.downConductorsBasicArr.controls[index].controls.observationComponentDetails.setValue('downConductorBasicDescription' + index);
                this.downConductorsBasicArr.controls[index].controls.serialNo.setValue(index+1);
                this.downConductorsBasicArr.controls[index].controls.observation.setValue(this.downConductorData.downConductorReport[0].downConductorDescription[w][this.downBasicName[j]]);
                index++;              
              }
            }
        //}
        //downConductor
        this.downConductorsArr=this.summaryArr.controls[w].controls.downConductor as FormArray;
        let index1 =0;
        for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[w].downConductor){
          for(let j = 0; j < this.downConductorName.length; j++){
            if(i[this.downConductorName[j]]!="" && i[this.downConductorName[j]]!= null){
              this.downConductorsArr.push(this.createDownConductors());
              this.downConductorsArr.controls[0].controls.heading.setValue('DC_Downconductors Observation');
              this.downConductorsArr.controls[index1].controls.observationComponentDetails.setValue('downConductorDescription' + index1);
              this.downConductorsArr.controls[index1].controls.serialNo.setValue(index1+1);
              this.downConductorsArr.controls[index1].controls.observation.setValue(i[this.downConductorName[j]]);
              index1++;            
            }
          }
    }
      
    //Bridging
    this.bridgingDescArr=this.summaryArr.controls[w].controls.bridgingDesc as FormArray;
    let index2 =0;
    for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[w].bridgingDescription){
      for(let j = 0; j < this.bridgingName.length; j++){
        if(i[this.bridgingName[j]]!="" && i[this.bridgingName[j]]!= null){
          this.bridgingDescArr.push(this.createBridgingDesc());
          this.bridgingDescArr.controls[0].controls.heading.setValue('DC_Bridging Observation');
          this.bridgingDescArr.controls[index2].controls.observationComponentDetails.setValue('bridgingDescription' + index2);
          this.bridgingDescArr.controls[index2].controls.serialNo.setValue(index2+1);
          this.bridgingDescArr.controls[index2].controls.observation.setValue(i[this.bridgingName[j]]);
          index2++;        
        }
      }
  }
  //holder
  this.downHoldersArr=this.summaryArr.controls[w].controls.downHolders as FormArray;
  let index3 =0;
  for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[w].holder){
    for(let j = 0; j < this.downHolderName.length; j++){
      if(i[this.downHolderName[j]]!="" && i[this.downHolderName[j]]!= null){
        this.downHoldersArr.push(this.createDownHolders());
        this.downHoldersArr.controls[0].controls.heading.setValue('DC_Holder Observation');
        this.downHoldersArr.controls[index3].controls.observationComponentDetails.setValue('holder' + index3);
        this.downHoldersArr.controls[index3].controls.serialNo.setValue(index3+1);
        this.downHoldersArr.controls[index3].controls.observation.setValue(i[this.downHolderName[j]]);
        index3++;      
      }
    }
}

    //connectors
    this.downConnectorsArr=this.summaryArr.controls[w].controls.downConnectors as FormArray;
    let index4 =0;
    for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[w].connectors){
    for(let j = 0; j < this.connectorsName.length; j++){
      if(i[this.connectorsName[j]]!="" && i[this.connectorsName[j]]!= null){
        this.downConnectorsArr.push(this.createDownConnectors());
        this.downConnectorsArr.controls[0].controls.heading.setValue('DC_Connectors Observation');
        this.downConnectorsArr.controls[index4].controls.observationComponentDetails.setValue('connectors' + index4);
        this.downConnectorsArr.controls[index4].controls.serialNo.setValue(index4+1);
        this.downConnectorsArr.controls[index4].controls.observation.setValue(i[this.connectorsName[j]]);
        index4++;      
      }
    }
    }
    //testingJoint
    this.testingJointArr=this.summaryArr.controls[w].controls.testingJoint as FormArray;
    let index5 =0;
    for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[w].testingJoint){
    for(let j = 0; j < this.testingJointName.length; j++){
      if(i[this.testingJointName[j]]!="" && i[this.testingJointName[j]]!= null){
        this.testingJointArr.push(this.createTestingJoints());
        this.testingJointArr.controls[0].controls.heading.setValue('DC_TestingJoint Observation');
        this.testingJointArr.controls[index5].controls.observationComponentDetails.setValue('testingJoint' + index5);
        this.testingJointArr.controls[index5].controls.serialNo.setValue(index5+1);
        this.testingJointArr.controls[index5].controls.observation.setValue(i[this.testingJointName[j]]);
        index5++;      
      }
    }
    }
    //lightingCounter
    this.lightingCounterArr=this.summaryArr.controls[w].controls.lightingCounter as FormArray;
    let index6 =0;
    for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[w].lightningCounter){
    for(let j = 0; j < this.lightingCounterName.length; j++){
      if(i[this.lightingCounterName[j]]!="" && i[this.lightingCounterName[j]]!= null){
        this.lightingCounterArr.push(this.createLightingCounter());
        this.lightingCounterArr.controls[0].controls.heading.setValue('DC_LightningCounter Observation');
        this.lightingCounterArr.controls[index6].controls.observationComponentDetails.setValue('lightningCounter' + index6);
        this.lightingCounterArr.controls[index6].controls.serialNo.setValue(index6+1);
        this.lightingCounterArr.controls[index6].controls.observation.setValue(i[this.lightingCounterName[j]]);
        index6++;      
      }
    }
    }

  //downConductorTesting
  this.downConductorTestingArr=this.summaryArr.controls[w].controls.downConductorTesting as FormArray;
  let index8 =0;
  for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[w].downConductorTesting){
  for(let j = 0; j < this.downConductorTestingName.length; j++){
    if(i[this.downConductorTestingName[j]]!="" && i[this.downConductorTestingName[j]]!= null){
      this.downConductorTestingArr.push(this.createDownConductorsTesting());
      this.downConductorTestingArr.controls[0].controls.heading.setValue('DC_DownConductorTesting Observation');
      this.downConductorTestingArr.controls[index8].controls.observationComponentDetails.setValue('downConductorTesting' + index8);
      this.downConductorTestingArr.controls[index8].controls.serialNo.setValue(index8+1);
      this.downConductorTestingArr.controls[index8].controls.observation.setValue(i[this.downConductorTestingName[j]]);
      index8++;    
    }
  }
  }
      }
      //earthing
      if(this.earthingData.earthingReport!=null){
        this.earthingReportArr=this.summaryArr.controls[w].controls.earthingReport as FormArray;
        let index =0; 
      // for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[w]){
            for(let j = 0; j < this.earthingReportName.length; j++){
              if(this.earthingData.earthingReport[0].earthingLpsDescription[w][this.earthingReportName[j]]!="" && this.earthingData.earthingReport[0].earthingLpsDescription[w][this.earthingReportName[j]]!= null){
                this.earthingReportArr.push(this.createEarthingReport());
                this.earthingReportArr.controls[0].controls.heading.setValue('ET_Basic Details Observation');
                this.earthingReportArr.controls[index].controls.observationComponentDetails.setValue('earthingLpsDescription' + index);
                this.earthingReportArr.controls[index].controls.serialNo.setValue(index+1);
                this.earthingReportArr.controls[index].controls.observation.setValue(this.earthingData.earthingReport[0].earthingLpsDescription[w][this.earthingReportName[j]]);
                index++;             
              }
            }
        //}
        //earthingDescription
        this.earthingDescArr=this.summaryArr.controls[w].controls.earthingDescription as FormArray;
        let index1 =0;
        for(let i of this.earthingData.earthingReport[0].earthingLpsDescription[w].earthingDescription){
          for(let j = 0; j < this.earthingDescriptionName.length; j++){
            if(i[this.earthingDescriptionName[j]]!="" && i[this.earthingDescriptionName[j]]!= null){
              this.earthingDescArr.push(this.createEarthingDescription());
              this.earthingDescArr.controls[0].controls.heading.setValue('EarthingDescription Observation');
              this.earthingDescArr.controls[index1].controls.observationComponentDetails.setValue('earthingDescriptionMain' + index1);
              this.earthingDescArr.controls[index1].controls.serialNo.setValue(index1+1);
              this.earthingDescArr.controls[index1].controls.observation.setValue(i[this.earthingDescriptionName[j]]);
              index1++;            
            }
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
        for(let j = 0; j < this.earthingDescriptionListName.length; j++){
          if(i[this.earthingDescriptionListName[j]]!="" && i[this.earthingDescriptionListName[j]]!= null){
            this.earthingDescriptionListArr.push(this.createEarthingDescriptionList());
            if(indexVertical == 0){
              this.earthingDescriptionListArr.controls[index0].controls.heading.setValue('EarthingDescription List-' + vatListIndex);
            }
            this.earthingDescriptionListArr.controls[index0].controls.observationComponentDetails.setValue('earthingDescriptionList' + index0);
            this.earthingDescriptionListArr.controls[index0].controls.serialNo.setValue(indexVertical+1);
            this.earthingDescriptionListArr.controls[index0].controls.observation.setValue(i[this.earthingDescriptionListName[j]]);
            index0++;
            indexVertical++;        
          }
        }
        indexVertical=0;
        vatListIndex++;
  }
    }
   
    //earthingClamps
    this.earthingClampsArr=this.summaryArr.controls[w].controls.earthingClamps as FormArray;
    let index2 =0;
    for(let i of this.earthingData.earthingReport[0].earthingLpsDescription[w].earthingClamps){
      for(let j = 0; j < this.earthingClampsName.length; j++){
        if(i[this.earthingClampsName[j]]!="" && i[this.earthingClampsName[j]]!= null){
          this.earthingClampsArr.push(this.createEarthingClamps());
          this.earthingClampsArr.controls[0].controls.heading.setValue('EarthingClamps Observation');
          this.earthingClampsArr.controls[index2].controls.observationComponentDetails.setValue('earthingClamps' + index2);
          this.earthingClampsArr.controls[index2].controls.serialNo.setValue(index2+1);
          this.earthingClampsArr.controls[index2].controls.observation.setValue(i[this.earthingClampsName[j]]);
          index2++;        
        }
      }
  }
  //earthingElectrodeChamber
  this.earthingElectrodeChamberArr=this.summaryArr.controls[w].controls.earthingElectrodeChamber as FormArray;
  let index3 =0;
  for(let i of this.earthingData.earthingReport[0].earthingLpsDescription[w].earthingElectrodeChamber){
    for(let j = 0; j < this.earthingElectrodeChamberName.length; j++){
      if(i[this.earthingElectrodeChamberName[j]]!="" && i[this.earthingElectrodeChamberName[j]]!= null){
        this.earthingElectrodeChamberArr.push(this.createEarthingElectrodeChamber());
        this.earthingElectrodeChamberArr.controls[0].controls.heading.setValue('EarthingElectrodeChamber Observation');
        this.earthingElectrodeChamberArr.controls[index3].controls.observationComponentDetails.setValue('earthingElectrodeChamber' + index3);
        this.earthingElectrodeChamberArr.controls[index3].controls.serialNo.setValue(index3+1);
        this.earthingElectrodeChamberArr.controls[index3].controls.observation.setValue(i[this.earthingElectrodeChamberName[j]]);
        index3++;      
      }
    }
  }

    //earthingSystem
    this.earthingSystemArr=this.summaryArr.controls[w].controls.earthingSystem as FormArray;
    let index4 =0;
    for(let i of this.earthingData.earthingReport[0].earthingLpsDescription[w].earthingSystem){
    for(let j = 0; j < this.earthingSystemName.length; j++){
      if(i[this.earthingSystemName[j]]!="" && i[this.earthingSystemName[j]]!= null){
        this.earthingSystemArr.push(this.createEarthingSystem());
        this.earthingSystemArr.controls[0].controls.heading.setValue('EarthingSystem Observation');
        this.earthingSystemArr.controls[index4].controls.observationComponentDetails.setValue('earthingSystem' + index4);
        this.earthingSystemArr.controls[index4].controls.serialNo.setValue(index4+1);
        this.earthingSystemArr.controls[index4].controls.observation.setValue(i[this.earthingSystemName[j]]);
        index4++;      
      }
    }
    }
    //earthElectrodeTesting
    this.earthElectrodeTestingArr=this.summaryArr.controls[w].controls.earthElectrodeTesting as FormArray;
    let index5 =0;
    for(let i of this.earthingData.earthingReport[0].earthingLpsDescription[w].earthElectrodeTesting){
    for(let j = 0; j < this.earthElectrodeTestingName.length; j++){
      if(i[this.earthElectrodeTestingName[j]]!="" && i[this.earthElectrodeTestingName[j]]!= null){
        this.earthElectrodeTestingArr.push(this.createEarthElectrodeTesting());
        this.earthElectrodeTestingArr.controls[0].controls.heading.setValue('EarthElectrodeTesting Observation');
        this.earthElectrodeTestingArr.controls[index5].controls.observationComponentDetails.setValue('earthElectrodeTesting' + index5);
        this.earthElectrodeTestingArr.controls[index5].controls.serialNo.setValue(index5+1);
        this.earthElectrodeTestingArr.controls[index5].controls.observation.setValue(i[this.earthElectrodeTestingName[j]]);
        index5++;      
      }
    }
    }
      }
    //spd
    if(this.spdReportData.spdReport!=null){
      //spd report
        this.spdReportArr=this.summaryArr.controls[w].controls.spdReport as FormArray;
        let index =0;
        //for(let i of this.spdReportData.spdReport[0].spd){
            for(let j = 0; j < this.spdReportName.length; j++){
              if(this.spdReportData.spdReport[0].spd[w][this.spdReportName[j]]!="" && this.spdReportData.spdReport[0].spd[w][this.spdReportName[j]]!= null){
                this.spdReportArr.push(this.createSpdReport());
                this.spdReportArr.controls[0].controls.heading.setValue('SPD Details Observation');
                this.spdReportArr.controls[index].controls.observationComponentDetails.setValue('spdReport' + index);
                this.spdReportArr.controls[index].controls.serialNo.setValue(index+1);
                this.spdReportArr.controls[index].controls.observation.setValue(this.spdReportData.spdReport[0].spd[w][this.spdReportName[j]]);
                index++;              
              }
            }
        //}
      //spd list
      this.spdListArr=this.summaryArr.controls[w].controls.spdReportList as FormArray;
      let index07 =0;
      let vatListIndex=1;
      let indexVertical=0;
      for(let i of this.spdReportData.spdReport[0].spd[w].spdDescription)
      {
        for(let j = 0; j < this.spdReportListName.length; j++){
          if(i[this.spdReportListName[j]]!="" && i[this.spdReportListName[j]]!= null){
            this.spdListArr.push(this.createSpdReportList());
            if(indexVertical==0){
              this.spdListArr.controls[index07].controls.heading.setValue('SPD List-' + vatListIndex);
            }
          // this.spdListArr.controls[0].controls.heading.setValue('SPD List Observation');
            this.spdListArr.controls[index07].controls.observationComponentDetails.setValue('spdDescription' + index07);
            this.spdListArr.controls[index07].controls.serialNo.setValue(indexVertical+1);
            this.spdListArr.controls[index07].controls.observation.setValue(i[this.spdReportListName[j]]);
            index07++;
            indexVertical++;          
          }
        }
        indexVertical=0;
        vatListIndex++;
  }
    }
    //separationDistance
    if(this.separationDistanceData.seperationDistanceReport!=null){
      //separationDistance report
        this.separationDistanceArr=this.summaryArr.controls[w].controls.separationDistance as FormArray;
        let index =0;
        //for(let i of this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription){
            for(let j = 0; j < this.separationDistanceName.length; j++){
              if(this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription[w][this.separationDistanceName[j]]!="" && this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription[w][this.separationDistanceName[j]]!= null){
                this.separationDistanceArr.push(this.createSeparationDistance());
                this.separationDistanceArr.controls[0].controls.heading.setValue('SeparationDistance Observation');
                this.separationDistanceArr.controls[index].controls.observationComponentDetails.setValue('seperationDistanceDescription' + index);
                this.separationDistanceArr.controls[index].controls.serialNo.setValue(index+1);
                this.separationDistanceArr.controls[index].controls.observation.setValue(this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription[w][this.separationDistanceName[j]]);
                index++;              
              }
            }
      // }
        this.separateDistanceArr=this.summaryArr.controls[w].controls.separateDistance as FormArray;
        let indexS =0;
        for(let i of this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription[w].separateDistance){
          for(let j = 0; j < this.separateDistanceName.length; j++){
            if(i[this.separateDistanceName[j]]!="" && i[this.separateDistanceName[j]]!= null){
              this.separateDistanceArr.push(this.createSeparateDistance());
              this.separateDistanceArr.controls[0].controls.heading.setValue('SeparateDistance Observation');
              this.separateDistanceArr.controls[indexS].controls.observationComponentDetails.setValue('separateDistanceDesc' + indexS);
              this.separateDistanceArr.controls[indexS].controls.serialNo.setValue(indexS+1);
              this.separateDistanceArr.controls[indexS].controls.observation.setValue(i[this.separateDistanceName[j]]);
              indexS++;            
            }
          }
      }
      this.separationDistanceDownArr=this.summaryArr.controls[w].controls.separationDistanceDown as FormArray;
      let indexSD =0;
      for(let i of this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription[w].separateDistanceDownConductors){
        for(let j = 0; j < this.separateDistanceDownName.length; j++){
          if(i[this.separateDistanceDownName[j]]!="" && i[this.separateDistanceDownName[j]]!= null){
            this.separationDistanceDownArr.push(this.createSeparationDownDistance());
            this.separationDistanceDownArr.controls[0].controls.heading.setValue('SeparationDistanceDown Observation');
            this.separationDistanceDownArr.controls[indexSD].controls.observationComponentDetails.setValue('separateDistanceDownConductors' + indexSD);
            this.separationDistanceDownArr.controls[indexSD].controls.serialNo.setValue(indexSD+1);
            this.separationDistanceDownArr.controls[indexSD].controls.observation.setValue(i[this.separateDistanceDownName[j]]);
            indexSD++;          
          }
        }
    }
    }
    //equipotential bonding
    if(this.equiBondingData.earthStudReport!=null){
        this.equiBondingArr=this.summaryArr.controls[w].controls.earthStudDesc as FormArray;
        let index =0;
        //for(let i of this.equiBondingData.earthStudReport[0].earthStudDescription){
            for(let j = 0; j < this.earthStudDescName.length; j++){
              if(this.equiBondingData.earthStudReport[0].earthStudDescription[w][this.earthStudDescName[j]]!="" && this.equiBondingData.earthStudReport[0].earthStudDescription[w][this.earthStudDescName[j]]!= null){
                this.equiBondingArr.push(this.createEarthStudDesc());
                this.equiBondingArr.controls[0].controls.heading.setValue('EarthStud Observation');
                this.equiBondingArr.controls[index].controls.observationComponentDetails.setValue('earthStudDescription' + index);
                this.equiBondingArr.controls[index].controls.serialNo.setValue(index+1);
                this.equiBondingArr.controls[index].controls.observation.setValue(this.equiBondingData.earthStudReport[0].earthStudDescription[w][this.earthStudDescName[j]]);
                index++;              
              }
            }
      // }
    }
    }
        } 
      )
     }
    }

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
            for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[w].airBasicDescription){
                for(let j = 0; j < this.airBasicName.length; j++){
                  if(i[this.airBasicName[j]]!="" && i[this.airBasicName[j]]!=null){
                    this.airTerminationArr.push(this.createAirTermination());
                    this.airTerminationArr.controls[0].controls.heading.setValue('AT_Basic Details Observation');
                    this.airTerminationArr.controls[index].controls.observationComponentDetails.setValue('airBasicDescription' + index);
                    this.airTerminationArr.controls[index].controls.serialNo.setValue(index+1);
                    this.airTerminationArr.controls[index].controls.observation.setValue(i[this.airBasicName[j]]);
                    index++;
                  }
                }
            }
            //vertical
            this.airVerticalArr
            this.airVerticalArr=this.summaryArr.controls[w].controls.airVertical as FormArray;
            let index1 =0;
            for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[w].lpsVerticalAirTermination){
              for(let j = 0; j < this.airVerticalName.length; j++){
                if(i[this.airVerticalName[j]]!="" && i[this.airVerticalName[j]]!= null){
                  this.airVerticalArr.push(this.createAirVertical());
                  this.airVerticalArr.controls[0].controls.heading.setValue('AT_Vertical Observation');
                  this.airVerticalArr.controls[index1].controls.observationComponentDetails.setValue('lpsVerticalAirTermination' + index1);
                  this.airVerticalArr.controls[index1].controls.serialNo.setValue(index1 + 1);
                  this.airVerticalArr.controls[index1].controls.observation.setValue(i[this.airVerticalName[j]]);
                  index1++;
                }
              }
        }
          //vertical list
          this.airVerticalListArr=this.summaryArr.controls[w].controls.airVerticalList as FormArray;
          let index0 =0;
          let vatListIndex=1;
          let indexVertical=0;
          if(this.airTerminationData.airTermination[0].lpsAirDiscription[w].lpsVerticalAirTermination.length!=0){
            for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[w].lpsVerticalAirTermination[0].verticalAirTerminationList)
            {
              for(let j = 0; j < this.airVerticalListName.length; j++){
                if(i[this.airVerticalListName[j]]!=""  && i[this.airVerticalListName[j]]!= null){
                  this.airVerticalListArr.push(this.createAirVerticalList());
                  if(indexVertical==0){
                    this.airVerticalListArr.controls[index0].controls.heading.setValue('AT_Vertical List-' + vatListIndex);
                  }
                  this.airVerticalListArr.controls[index0].controls.observationComponentDetails.setValue('verticalAirTerminationList' + index0);
                  this.airVerticalListArr.controls[index0].controls.serialNo.setValue(indexVertical + 1);
                  this.airVerticalListArr.controls[index0].controls.observation.setValue(i[this.airVerticalListName[j]]);
                  index0++;
                  indexVertical++;
                }
              }
              indexVertical=0;
              vatListIndex++;
            }
          }
         
      //mesh
      this.airMeshArr=this.summaryArr.controls[w].controls.airMesh as FormArray;
      let index2 =0;
      for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[w].airMeshDescription){
        for(let j = 0; j < this.airMeshName.length; j++){
          if(i[this.airMeshName[j]]!="" && i[this.airMeshName[j]]!= null){
          this.airMeshArr.push(this.createAirMesh());
          this.airMeshArr.controls[0].controls.heading.setValue('AT_Mesh Observation');
          this.airMeshArr.controls[index2].controls.observationComponentDetails.setValue('airMeshDescription' + index2);
          this.airMeshArr.controls[index2].controls.serialNo.setValue(index2+1);
          this.airMeshArr.controls[index2].controls.observation.setValue(i[this.airMeshName[j]]);
          index2++;
          }
        }
    }
      //holder
      this.airHolderArr=this.summaryArr.controls[w].controls.airHolder as FormArray;
      let index3 =0;
      for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[w].airHolderDescription){
        for(let j = 0; j < this.airHolderName.length; j++){
          if(i[this.airHolderName[j]]!="" && i[this.airHolderName[j]]!= null){
            this.airHolderArr.push(this.createAirHolder());
            this.airHolderArr.controls[0].controls.heading.setValue('AT_Holder Observation');
            this.airHolderArr.controls[index3].controls.observationComponentDetails.setValue('airHolderDescription' + index3);
            this.airHolderArr.controls[index3].controls.serialNo.setValue(index3+1);
            this.airHolderArr.controls[index3].controls.observation.setValue(i[this.airHolderName[j]]);
            index3++;        
          }
      
        }
      }
      //holder list
      this.airHolderListArr=this.summaryArr.controls[w].controls.airHolderList as FormArray;
      let index01 =0;
      let holderListIndex=1;
      let indexHolder=0;
      if(this.airTerminationData.airTermination[0].lpsAirDiscription[w].airHolderDescription.length!=0){
        for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[w].airHolderDescription[0].airHolderList)
        {
          for(let j = 0; j < this.airHolderListName.length; j++){
            if(i[this.airHolderListName[j]]!="" && i[this.airHolderListName[j]]!= null){
              this.airHolderListArr.push(this.createAirHolderList());
              if(indexHolder == 0){
              this.airHolderListArr.controls[index01].controls.heading.setValue('AT_Holder List-' + holderListIndex);
              }
              this.airHolderListArr.controls[index01].controls.observationComponentDetails.setValue('airHolderList' + index01);
              this.airHolderListArr.controls[index01].controls.serialNo.setValue(indexHolder+1);
              this.airHolderListArr.controls[index01].controls.observation.setValue(i[this.airHolderListName[j]]);
              index01++;
              indexHolder++;
            }
          }
          indexHolder=0;
          holderListIndex++;
        }
      }
     
      //clamps
      this.airClampsArr=this.summaryArr.controls[w].controls.airClamps as FormArray;
      let index4 =0;
      for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[w].airClamps){
        for(let j = 0; j < this.airClampsName.length; j++){
          if(i[this.airClampsName[j]]!="" && i[this.airClampsName[j]]!= null){
            this.airClampsArr.push(this.createAirClamps());
            this.airClampsArr.controls[0].controls.heading.setValue('AT_Clamps Observation');
            this.airClampsArr.controls[index4].controls.observationComponentDetails.setValue('airClamps' + index4);
            this.airClampsArr.controls[index4].controls.serialNo.setValue(index4+1);
            this.airClampsArr.controls[index4].controls.observation.setValue(i[this.airClampsName[j]]);
            index4++;        
          }
        }
      }
      //expansion
      this.airExpansionArr=this.summaryArr.controls[w].controls.airExpansion as FormArray;
      let index5 =0;
      for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[w].airExpansion){
        for(let j = 0; j < this.airExpansionName.length; j++){
          if(i[this.airExpansionName[j]]!="" && i[this.airExpansionName[j]]!= null){
            this.airExpansionArr.push(this.createAirExpansion());
            this.airExpansionArr.controls[0].controls.heading.setValue('AT_Expansion Observation');
            this.airExpansionArr.controls[index5].controls.observationComponentDetails.setValue('airExpansion' + index5);
            this.airExpansionArr.controls[index5].controls.serialNo.setValue(index5+1);
            this.airExpansionArr.controls[index5].controls.observation.setValue(i[this.airExpansionName[j]]);
            index5++;        
          }
        }
      }
      //connectors
      this.airConnectorsArr=this.summaryArr.controls[w].controls.airConnectors as FormArray;
      let index6 =0;
      for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[w].airConnectors){
        for(let j = 0; j < this.airConnectorsName.length; j++){
          if(i[this.airConnectorsName[j]]!="" && i[this.airConnectorsName[j]]!= null){
            this.airConnectorsArr.push(this.createAirConnectors());
            this.airConnectorsArr.controls[0].controls.heading.setValue('AT_Connectors Observation');
            this.airConnectorsArr.controls[index6].controls.observationComponentDetails.setValue('airConnectors' + index6);
            this.airConnectorsArr.controls[index6].controls.serialNo.setValue(index6+1);
            this.airConnectorsArr.controls[index6].controls.observation.setValue(i[this.airConnectorsName[j]]);
            index6++;        
          }
        }
      }
        } 
        //down conductors
        if(this.downConductorData.downConductorReport!=null){
          this.downConductorsBasicArr=this.summaryArr.controls[w].controls.downConductorReport as FormArray;
          let index =0; 
          // for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[w]){
              for(let j = 0; j < this.downBasicName.length; j++){
                if(this.downConductorData.downConductorReport[0].downConductorDescription[w][this.downBasicName[j]]!="" 
                   && this.downConductorData.downConductorReport[0].downConductorDescription[w][this.downBasicName[j]] != null){
                  this.downConductorsBasicArr.push(this.createDownConductorsBasic());
                  this.downConductorsBasicArr.controls[0].controls.heading.setValue('DC_Basic Details Observation');
                  this.downConductorsBasicArr.controls[index].controls.observationComponentDetails.setValue('downConductorBasicDescription' + index);
                  this.downConductorsBasicArr.controls[index].controls.serialNo.setValue(index+1);
                  this.downConductorsBasicArr.controls[index].controls.observation.setValue(this.downConductorData.downConductorReport[0].downConductorDescription[w][this.downBasicName[j]]);
                  index++;              
                }
              }
          //}
          //downConductor
          this.downConductorsArr=this.summaryArr.controls[w].controls.downConductor as FormArray;
          let index1 =0;
          for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[w].downConductor){
            for(let j = 0; j < this.downConductorName.length; j++){
              if(i[this.downConductorName[j]]!="" && i[this.downConductorName[j]]!= null){
                this.downConductorsArr.push(this.createDownConductors());
                this.downConductorsArr.controls[0].controls.heading.setValue('DC_Downconductors Observation');
                this.downConductorsArr.controls[index1].controls.observationComponentDetails.setValue('downConductorDescription' + index1);
                this.downConductorsArr.controls[index1].controls.serialNo.setValue(index1+1);
                this.downConductorsArr.controls[index1].controls.observation.setValue(i[this.downConductorName[j]]);
                index1++;            
              }
            }
      }
        
      //Bridging
      this.bridgingDescArr=this.summaryArr.controls[w].controls.bridgingDesc as FormArray;
      let index2 =0;
      for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[w].bridgingDescription){
        for(let j = 0; j < this.bridgingName.length; j++){
          if(i[this.bridgingName[j]]!="" && i[this.bridgingName[j]]!= null){
            this.bridgingDescArr.push(this.createBridgingDesc());
            this.bridgingDescArr.controls[0].controls.heading.setValue('DC_Bridging Observation');
            this.bridgingDescArr.controls[index2].controls.observationComponentDetails.setValue('bridgingDescription' + index2);
            this.bridgingDescArr.controls[index2].controls.serialNo.setValue(index2+1);
            this.bridgingDescArr.controls[index2].controls.observation.setValue(i[this.bridgingName[j]]);
            index2++;        
          }
        }
    }
    //holder
    this.downHoldersArr=this.summaryArr.controls[w].controls.downHolders as FormArray;
    let index3 =0;
    for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[w].holder){
      for(let j = 0; j < this.downHolderName.length; j++){
        if(i[this.downHolderName[j]]!="" && i[this.downHolderName[j]]!= null){
          this.downHoldersArr.push(this.createDownHolders());
          this.downHoldersArr.controls[0].controls.heading.setValue('DC_Holder Observation');
          this.downHoldersArr.controls[index3].controls.observationComponentDetails.setValue('holder' + index3);
          this.downHoldersArr.controls[index3].controls.serialNo.setValue(index3+1);
          this.downHoldersArr.controls[index3].controls.observation.setValue(i[this.downHolderName[j]]);
          index3++;      
        }
      }
  }
  
      //connectors
      this.downConnectorsArr=this.summaryArr.controls[w].controls.downConnectors as FormArray;
      let index4 =0;
      for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[w].connectors){
      for(let j = 0; j < this.connectorsName.length; j++){
        if(i[this.connectorsName[j]]!="" && i[this.connectorsName[j]]!= null){
          this.downConnectorsArr.push(this.createDownConnectors());
          this.downConnectorsArr.controls[0].controls.heading.setValue('DC_Connectors Observation');
          this.downConnectorsArr.controls[index4].controls.observationComponentDetails.setValue('connectors' + index4);
          this.downConnectorsArr.controls[index4].controls.serialNo.setValue(index4+1);
          this.downConnectorsArr.controls[index4].controls.observation.setValue(i[this.connectorsName[j]]);
          index4++;      
        }
      }
      }
      //testingJoint
      this.testingJointArr=this.summaryArr.controls[w].controls.testingJoint as FormArray;
      let index5 =0;
      for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[w].testingJoint){
      for(let j = 0; j < this.testingJointName.length; j++){
        if(i[this.testingJointName[j]]!="" && i[this.testingJointName[j]]!= null){
          this.testingJointArr.push(this.createTestingJoints());
          this.testingJointArr.controls[0].controls.heading.setValue('DC_TestingJoint Observation');
          this.testingJointArr.controls[index5].controls.observationComponentDetails.setValue('testingJoint' + index5);
          this.testingJointArr.controls[index5].controls.serialNo.setValue(index5+1);
          this.testingJointArr.controls[index5].controls.observation.setValue(i[this.testingJointName[j]]);
          index5++;      
        }
      }
      }
      //lightingCounter
      this.lightingCounterArr=this.summaryArr.controls[w].controls.lightingCounter as FormArray;
      let index6 =0;
      for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[w].lightningCounter){
      for(let j = 0; j < this.lightingCounterName.length; j++){
        if(i[this.lightingCounterName[j]]!="" && i[this.lightingCounterName[j]]!= null){
          this.lightingCounterArr.push(this.createLightingCounter());
          this.lightingCounterArr.controls[0].controls.heading.setValue('DC_LightningCounter Observation');
          this.lightingCounterArr.controls[index6].controls.observationComponentDetails.setValue('lightningCounter' + index6);
          this.lightingCounterArr.controls[index6].controls.serialNo.setValue(index6+1);
          this.lightingCounterArr.controls[index6].controls.observation.setValue(i[this.lightingCounterName[j]]);
          index6++;      
        }
      }
      }
  
    //downConductorTesting
    this.downConductorTestingArr=this.summaryArr.controls[w].controls.downConductorTesting as FormArray;
    let index8 =0;
    for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[w].downConductorTesting){
    for(let j = 0; j < this.downConductorTestingName.length; j++){
      if(i[this.downConductorTestingName[j]]!="" && i[this.downConductorTestingName[j]]!= null){
        this.downConductorTestingArr.push(this.createDownConductorsTesting());
        this.downConductorTestingArr.controls[0].controls.heading.setValue('DC_DownConductorTesting Observation');
        this.downConductorTestingArr.controls[index8].controls.observationComponentDetails.setValue('downConductorTesting' + index8);
        this.downConductorTestingArr.controls[index8].controls.serialNo.setValue(index8+1);
        this.downConductorTestingArr.controls[index8].controls.observation.setValue(i[this.downConductorTestingName[j]]);
        index8++;    
      }
    }
    }
        }
        //earthing
        if(this.earthingData.earthingReport!=null){
          this.earthingReportArr=this.summaryArr.controls[w].controls.earthingReport as FormArray;
          let index =0; 
        // for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[w]){
              for(let j = 0; j < this.earthingReportName.length; j++){
                if(this.earthingData.earthingReport[0].earthingLpsDescription[w][this.earthingReportName[j]]!="" && this.earthingData.earthingReport[0].earthingLpsDescription[w][this.earthingReportName[j]]!= null){
                  this.earthingReportArr.push(this.createEarthingReport());
                  this.earthingReportArr.controls[0].controls.heading.setValue('ET_Basic Details Observation');
                  this.earthingReportArr.controls[index].controls.observationComponentDetails.setValue('earthingLpsDescription' + index);
                  this.earthingReportArr.controls[index].controls.serialNo.setValue(index+1);
                  this.earthingReportArr.controls[index].controls.observation.setValue(this.earthingData.earthingReport[0].earthingLpsDescription[w][this.earthingReportName[j]]);
                  index++;             
                }
              }
          //}
          //earthingDescription
          this.earthingDescArr=this.summaryArr.controls[w].controls.earthingDescription as FormArray;
          let index1 =0;
          for(let i of this.earthingData.earthingReport[0].earthingLpsDescription[w].earthingDescription){
            for(let j = 0; j < this.earthingDescriptionName.length; j++){
              if(i[this.earthingDescriptionName[j]]!="" && i[this.earthingDescriptionName[j]]!= null){
                this.earthingDescArr.push(this.createEarthingDescription());
                this.earthingDescArr.controls[0].controls.heading.setValue('EarthingDescription Observation');
                this.earthingDescArr.controls[index1].controls.observationComponentDetails.setValue('earthingDescriptionMain' + index1);
                this.earthingDescArr.controls[index1].controls.serialNo.setValue(index1+1);
                this.earthingDescArr.controls[index1].controls.observation.setValue(i[this.earthingDescriptionName[j]]);
                index1++;            
              }
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
          for(let j = 0; j < this.earthingDescriptionListName.length; j++){
            if(i[this.earthingDescriptionListName[j]]!="" && i[this.earthingDescriptionListName[j]]!= null){
              this.earthingDescriptionListArr.push(this.createEarthingDescriptionList());
              if(indexVertical==0){
                this.earthingDescriptionListArr.controls[index0].controls.heading.setValue('EarthingDescription List-' + vatListIndex);
              }
              this.earthingDescriptionListArr.controls[index0].controls.observationComponentDetails.setValue('earthingDescriptionList' + index0);
              this.earthingDescriptionListArr.controls[index0].controls.serialNo.setValue(indexVertical+1);
              this.earthingDescriptionListArr.controls[index0].controls.observation.setValue(i[this.earthingDescriptionListName[j]]);
              index0++;
              indexVertical++;        
            }
          }
          indexVertical=0;
          vatListIndex++;
    }
      }
     
      //earthingClamps
      this.earthingClampsArr=this.summaryArr.controls[w].controls.earthingClamps as FormArray;
      let index2 =0;
      for(let i of this.earthingData.earthingReport[0].earthingLpsDescription[w].earthingClamps){
        for(let j = 0; j < this.earthingClampsName.length; j++){
          if(i[this.earthingClampsName[j]]!="" && i[this.earthingClampsName[j]]!= null){
            this.earthingClampsArr.push(this.createEarthingClamps());
            this.earthingClampsArr.controls[0].controls.heading.setValue('EarthingClamps Observation');
            this.earthingClampsArr.controls[index2].controls.observationComponentDetails.setValue('earthingClamps' + index2);
            this.earthingClampsArr.controls[index2].controls.serialNo.setValue(index2+1);
            this.earthingClampsArr.controls[index2].controls.observation.setValue(i[this.earthingClampsName[j]]);
            index2++;        
          }
        }
    }
    //earthingElectrodeChamber
    this.earthingElectrodeChamberArr=this.summaryArr.controls[w].controls.earthingElectrodeChamber as FormArray;
    let index3 =0;
    for(let i of this.earthingData.earthingReport[0].earthingLpsDescription[w].earthingElectrodeChamber){
      for(let j = 0; j < this.earthingElectrodeChamberName.length; j++){
        if(i[this.earthingElectrodeChamberName[j]]!="" && i[this.earthingElectrodeChamberName[j]]!= null){
          this.earthingElectrodeChamberArr.push(this.createEarthingElectrodeChamber());
          this.earthingElectrodeChamberArr.controls[0].controls.heading.setValue('EarthingElectrodeChamber Observation');
          this.earthingElectrodeChamberArr.controls[index3].controls.observationComponentDetails.setValue('earthingElectrodeChamber' + index3);
          this.earthingElectrodeChamberArr.controls[index3].controls.serialNo.setValue(index3+1);
          this.earthingElectrodeChamberArr.controls[index3].controls.observation.setValue(i[this.earthingElectrodeChamberName[j]]);
          index3++;      
        }
      }
    }
  
      //earthingSystem
      this.earthingSystemArr=this.summaryArr.controls[w].controls.earthingSystem as FormArray;
      let index4 =0;
      for(let i of this.earthingData.earthingReport[0].earthingLpsDescription[w].earthingSystem){
      for(let j = 0; j < this.earthingSystemName.length; j++){
        if(i[this.earthingSystemName[j]]!="" && i[this.earthingSystemName[j]]!= null){
          this.earthingSystemArr.push(this.createEarthingSystem());
          this.earthingSystemArr.controls[0].controls.heading.setValue('EarthingSystem Observation');
          this.earthingSystemArr.controls[index4].controls.observationComponentDetails.setValue('earthingSystem' + index4);
          this.earthingSystemArr.controls[index4].controls.serialNo.setValue(index4+1);
          this.earthingSystemArr.controls[index4].controls.observation.setValue(i[this.earthingSystemName[j]]);
          index4++;      
        }
      }
      }
      //earthElectrodeTesting
      this.earthElectrodeTestingArr=this.summaryArr.controls[w].controls.earthElectrodeTesting as FormArray;
      let index5 =0;
      for(let i of this.earthingData.earthingReport[0].earthingLpsDescription[w].earthElectrodeTesting){
      for(let j = 0; j < this.earthElectrodeTestingName.length; j++){
        if(i[this.earthElectrodeTestingName[j]]!="" && i[this.earthElectrodeTestingName[j]]!= null){
          this.earthElectrodeTestingArr.push(this.createEarthElectrodeTesting());
          this.earthElectrodeTestingArr.controls[0].controls.heading.setValue('EarthElectrodeTesting Observation');
          this.earthElectrodeTestingArr.controls[index5].controls.observationComponentDetails.setValue('earthElectrodeTesting' + index5);
          this.earthElectrodeTestingArr.controls[index5].controls.serialNo.setValue(index5+1);
          this.earthElectrodeTestingArr.controls[index5].controls.observation.setValue(i[this.earthElectrodeTestingName[j]]);
          index5++;      
        }
      }
      }
        }
      //spd
      if(this.spdReportData.spdReport!=null){
        //spd report
          this.spdReportArr=this.summaryArr.controls[w].controls.spdReport as FormArray;
          let index =0;
          //for(let i of this.spdReportData.spdReport[0].spd){
              for(let j = 0; j < this.spdReportName.length; j++){
                if(this.spdReportData.spdReport[0].spd[w][this.spdReportName[j]]!="" && this.spdReportData.spdReport[0].spd[w][this.spdReportName[j]]!= null){
                  this.spdReportArr.push(this.createSpdReport());
                  this.spdReportArr.controls[0].controls.heading.setValue('SPD Details Observation');
                  this.spdReportArr.controls[index].controls.observationComponentDetails.setValue('spdReport' + index);
                  this.spdReportArr.controls[index].controls.serialNo.setValue(index+1);
                  this.spdReportArr.controls[index].controls.observation.setValue(this.spdReportData.spdReport[0].spd[w][this.spdReportName[j]]);
                  index++;              
                }
              }
          //}
        //spd list
        this.spdListArr=this.summaryArr.controls[w].controls.spdReportList as FormArray;
        let index07 =0;
        let vatListIndex=1;
        let indexVertical=0;
        for(let i of this.spdReportData.spdReport[0].spd[w].spdDescription)
        {
          for(let j = 0; j < this.spdReportListName.length; j++){
            if(i[this.spdReportListName[j]]!="" && i[this.spdReportListName[j]]!= null){
              this.spdListArr.push(this.createSpdReportList());
              if(indexVertical==0){
                this.spdListArr.controls[index07].controls.heading.setValue('SPD List-' + vatListIndex);
              }
            // this.spdListArr.controls[0].controls.heading.setValue('SPD List Observation');
              this.spdListArr.controls[index07].controls.observationComponentDetails.setValue('spdDescription' + index07);
              this.spdListArr.controls[index07].controls.serialNo.setValue(indexVertical+1);
              this.spdListArr.controls[index07].controls.observation.setValue(i[this.spdReportListName[j]]);
              index07++;
              indexVertical++;          
            }
          }
          indexVertical=0;
          vatListIndex++;
    }
      }
      //separationDistance
      if(this.separationDistanceData.seperationDistanceReport!=null){
        //separationDistance report
          this.separationDistanceArr=this.summaryArr.controls[w].controls.separationDistance as FormArray;
          let index =0;
          //for(let i of this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription){
              for(let j = 0; j < this.separationDistanceName.length; j++){
                if(this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription[w][this.separationDistanceName[j]]!="" && this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription[w][this.separationDistanceName[j]]!= null){
                  this.separationDistanceArr.push(this.createSeparationDistance());
                  this.separationDistanceArr.controls[0].controls.heading.setValue('SeparationDistance Observation');
                  this.separationDistanceArr.controls[index].controls.observationComponentDetails.setValue('seperationDistanceDescription' + index);
                  this.separationDistanceArr.controls[index].controls.serialNo.setValue(index+1);
                  this.separationDistanceArr.controls[index].controls.observation.setValue(this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription[w][this.separationDistanceName[j]]);
                  index++;              
                }
              }
        // }
          this.separateDistanceArr=this.summaryArr.controls[w].controls.separateDistance as FormArray;
          let indexS =0;
          for(let i of this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription[w].separateDistance){
            for(let j = 0; j < this.separateDistanceName.length; j++){
              if(i[this.separateDistanceName[j]]!="" && i[this.separateDistanceName[j]]!= null){
                this.separateDistanceArr.push(this.createSeparateDistance());
                this.separateDistanceArr.controls[0].controls.heading.setValue('SeparateDistance Observation');
                this.separateDistanceArr.controls[indexS].controls.observationComponentDetails.setValue('separateDistanceDesc' + indexS);
                this.separateDistanceArr.controls[indexS].controls.serialNo.setValue(indexS+1);
                this.separateDistanceArr.controls[indexS].controls.observation.setValue(i[this.separateDistanceName[j]]);
                indexS++;            
              }
            }
        }
        this.separationDistanceDownArr=this.summaryArr.controls[w].controls.separationDistanceDown as FormArray;
        let indexSD =0;
        for(let i of this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription[w].separateDistanceDownConductors){
          for(let j = 0; j < this.separateDistanceDownName.length; j++){
            if(i[this.separateDistanceDownName[j]]!="" && i[this.separateDistanceDownName[j]]!= null){
              this.separationDistanceDownArr.push(this.createSeparationDownDistance());
              this.separationDistanceDownArr.controls[0].controls.heading.setValue('SeparationDistanceDown Observation');
              this.separationDistanceDownArr.controls[indexSD].controls.observationComponentDetails.setValue('separateDistanceDownConductors' + indexSD);
              this.separationDistanceDownArr.controls[indexSD].controls.serialNo.setValue(indexSD+1);
              this.separationDistanceDownArr.controls[indexSD].controls.observation.setValue(i[this.separateDistanceDownName[j]]);
              indexSD++;          
            }
          }
      }
      }
      //equipotential bonding
      if(this.equiBondingData.earthStudReport!=null){
          this.equiBondingArr=this.summaryArr.controls[w].controls.earthStudDesc as FormArray;
          let index =0;
          //for(let i of this.equiBondingData.earthStudReport[0].earthStudDescription){
              for(let j = 0; j < this.earthStudDescName.length; j++){
                if(this.equiBondingData.earthStudReport[0].earthStudDescription[w][this.earthStudDescName[j]]!="" && this.equiBondingData.earthStudReport[0].earthStudDescription[w][this.earthStudDescName[j]]!= null){
                  this.equiBondingArr.push(this.createEarthStudDesc());
                  this.equiBondingArr.controls[0].controls.heading.setValue('EarthStud Observation');
                  this.equiBondingArr.controls[index].controls.observationComponentDetails.setValue('earthStudDescription' + index);
                  this.equiBondingArr.controls[index].controls.serialNo.setValue(index+1);
                  this.equiBondingArr.controls[index].controls.observation.setValue(this.equiBondingData.earthStudReport[0].earthStudDescription[w][this.earthStudDescName[j]]);
                  index++;              
                }
              }
        // }
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
      this.matStepper.navigateStep(index);
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
      this.popup=false;
      this.popup1 = false
      
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
          this.popup=true;
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
      
      this.summaryService.retrieveWhileSaveUpdate(this.email, this.basicLpsId).subscribe(
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
    else{
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
  }
