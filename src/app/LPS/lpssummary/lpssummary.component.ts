import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { flag } from 'ngx-bootstrap-icons';
import { SummaryServiceService } from 'src/app/LPS_services/summary-service.service';

@Component({
  selector: 'app-lpssummary',
  templateUrl: './lpssummary.component.html',
  styleUrls: ['./lpssummary.component.css']
})
export class LpssummaryComponent implements OnInit {
    panelOpenState = false;
    summaryForm!: FormGroup;
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
    //air termination
    airBasicName: string[] = [
      'approvedByRemarks',
      'architectNameRemarks',
      'bondingEquipotentialRe',
      'combustablePartRe',
      'companyNameRemarks',
      'connectionMadeBraRe',
      'consultantNameRemarks',
      'dateOfApprovalRem',
      'designDateRemarks',
      'deviationInstallationRemarks',
      'deviationRemarks',
      'drawingRemarks',
      'electricalEquipPlacedRe',
      'revisionNoRemarks',
      'terminationMeshConductorRe',
    ];
    airVerticalName: string[] = [
      'inspFaileddNoRe',
      'inspNoRe',
      'inspPassedNoRe',
      'lpsVerticalAirTerminationId',
      'physicalInspectionRe',
      'totalNumberRe',
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
      'clampTypRe',
      'interConnectionOfClampsRe',
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
      'totalNoConnectorRe',
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
      'maximumDistanceYRe',
      'minimumDistanceXRe',
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
      'testJointTypeRem',
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
      'earthingDescriptionAvailabilityRem',
      'earthingClampsAvailabilityRem',
      'earthingElectrodeChamberAvailabilityRem',
      'earthingSystemAvailabilityRem',
      'earthingElectrodeTestingAvailabilityRem',
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
      'earthStudVisibilityRem',
      'earthStudBendRem',
      'properBondingRailRem',
      'physicalDamageStudRem',
      'continutyExistaEarthRem',
    ];       
  
  constructor(private summaryService:SummaryServiceService,private formBuilder: FormBuilder) { }

    ngOnInit(): void {
      this.summaryForm = this.formBuilder.group({
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
      });
    }
    //air termination
    createAirTermination(){
      return this.formBuilder.group({
        airTerminationHeading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
      });
    }
    createAirVertical(){
      return this.formBuilder.group({
        airVerticalHeading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
      });
    }
    createAirVerticalList(){
      return this.formBuilder.group({
        airVerticalListHeading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
      });
    }
    createAirMesh(){
      return this.formBuilder.group({
        airMeshHeading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
      });
    }
    createAirHolder(){
      return this.formBuilder.group({
        airHolderHeading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
      });
    }
    createAirHolderList(){
      return this.formBuilder.group({
        airHolderListHeading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
      });
    }
    createAirClamps(){
      return this.formBuilder.group({
        airClampsHeading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
      });
    }
    createAirConnectors(){
      return this.formBuilder.group({
        airConnectorsHeading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
      });
    }
    createAirExpansion(){
      return this.formBuilder.group({
        airExpansionHeading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
      });
    }
    //down conductors
    createDownConductorsBasic(){
      return this.formBuilder.group({
        basicDetailsHeading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
      });
    }
    createDownConductors(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
      });
    }
    createBridgingDesc(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
      });
    }
    createDownHolders(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
      });
    }
    createDownConnectors(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
      });
    }
    createTestingJoints(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
      });
    }
    createLightingCounter(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
      });
    }
    createDownConductorsTesting(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
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
      });
    }
    createEarthingDescription(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
      });
    }
    createEarthingDescriptionList(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
      });
    }
    createEarthingClamps(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
      });
    }
    createEarthingElectrodeChamber(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
      });
    }
    createEarthingSystem(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
      });
    }
    createEarthElectrodeTesting(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
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
      });
    }
    createSpdReportList(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
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
      });
    }
    createSeparateDistance(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
      });
    }
    createSeparationDownDistance(){
      return this.formBuilder.group({
        heading: new FormControl(''),
        serialNo: new FormControl(''),
        observation: new FormControl(''),
        recommendation: new FormControl(''),
        observationComponentDetails: new FormControl(''),
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
      });
    }
    //air termination
    airTerminationControl(): AbstractControl[] {
      return(<FormArray>this.summaryForm.get('airTermination')).controls;
    }
    airVerticalControl(): AbstractControl[] {
      return(<FormArray>this.summaryForm.get('airVertical')).controls;
    }
    airVerticalListControl(): AbstractControl[] {
      return(<FormArray>this.summaryForm.get('airVerticalList')).controls;
    }
    airClampsControl(): AbstractControl[] {
      return(<FormArray>this.summaryForm.get('airClamps')).controls;
    }
    airConnectorsControl(): AbstractControl[] {
      return(<FormArray>this.summaryForm.get('airConnectors')).controls;
    }
    airExpansionControl(): AbstractControl[] {
      return(<FormArray>this.summaryForm.get('airExpansion')).controls;
    }
    airHolderControl(): AbstractControl[] {
      return(<FormArray>this.summaryForm.get('airHolder')).controls;
    }
    airHolderListControl(): AbstractControl[] {
      return(<FormArray>this.summaryForm.get('airHolderList')).controls;
    }
    airMeshControl(): AbstractControl[] {
      return(<FormArray>this.summaryForm.get('airMesh')).controls;
    }
  //down conductors
    downConductorBasicControl(): AbstractControl[] {
      return(<FormArray>this.summaryForm.get('downConductorReport')).controls;
    }
    downConductorControl(): AbstractControl[] {
      return(<FormArray>this.summaryForm.get('downConductor')).controls;
    } 
    bridgingDescControl(): AbstractControl[] {
      return(<FormArray>this.summaryForm.get('bridgingDesc')).controls;
    }
    downHoldersControl(): AbstractControl[] {
      return(<FormArray>this.summaryForm.get('downHolders')).controls;
    }
    downConnectorsControl(): AbstractControl[] {
      return(<FormArray>this.summaryForm.get('downConnectors')).controls;
    } 
    testingJointsControl(): AbstractControl[] {
      return(<FormArray>this.summaryForm.get('testingJoint')).controls;
    } 
    lightningCountersControl(): AbstractControl[] {
      return(<FormArray>this.summaryForm.get('lightingCounter')).controls;
    } 
    downConductorTestingControl(): AbstractControl[] {
      return(<FormArray>this.summaryForm.get('downConductorTesting')).controls;
    } 
  //earthing
    earthingReportControl(): AbstractControl[] {
      return(<FormArray>this.summaryForm.get('earthingReport')).controls;
    }
    earthingDescriptionControl(): AbstractControl[] {
      return(<FormArray>this.summaryForm.get('earthingDescription')).controls;
    } 
    earthingDescriptionListControl(): AbstractControl[] {
      return(<FormArray>this.summaryForm.get('earthingDescriptionList')).controls;
    } 
    earthingClampsControl(): AbstractControl[] {
      return(<FormArray>this.summaryForm.get('earthingClamps')).controls;
    }
    earthingElectrodeChamberControl(): AbstractControl[] {
      return(<FormArray>this.summaryForm.get('earthingElectrodeChamber')).controls;
    }
    earthingSystemControl(): AbstractControl[] {
      return(<FormArray>this.summaryForm.get('earthingSystem')).controls;
    } 
    earthElectrodeTestingControl(): AbstractControl[] {
      return(<FormArray>this.summaryForm.get('earthElectrodeTesting')).controls;
    } 
    //spd
    spdReportControl(): AbstractControl[] {
      return(<FormArray>this.summaryForm.get('spdReport')).controls;
    } 
    spdReportListControl(): AbstractControl[] {
      return(<FormArray>this.summaryForm.get('spdReportList')).controls;
    } 
    //separationDistance
    separationDistanceControl(): AbstractControl[] {
      return(<FormArray>this.summaryForm.get('separationDistance')).controls;
    }   
    separateDistanceControl(): AbstractControl[] {
      return(<FormArray>this.summaryForm.get('separateDistance')).controls;
    }  
    separationDistanceDownControl(): AbstractControl[] {
      return(<FormArray>this.summaryForm.get('separationDistanceDown')).controls;
    }
    //equipotential bonding
    earthStudDescControl(): AbstractControl[] {
      return(<FormArray>this.summaryForm.get('earthStudDesc')).controls;
    }
    retrieveObservationLpsSummary(basicLpsId: any){
      this.summaryService.retrieveObservationSummaryLps(basicLpsId).subscribe(
        data=>{
          this.airTerminationData=JSON.parse(data);
          this.downConductorData=JSON.parse(data);
          this.earthingData=JSON.parse(data);
          this.spdReportData=JSON.parse(data);
          this.separationDistanceData=JSON.parse(data);
          //air termination
              if(this.airTerminationData.airTermination!=null){
                //basic
                  this.airTerminationArr=this.summaryForm.get('airTermination') as FormArray;
                  let index =0;
                  for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[0].airBasicDescription){
                      for(let j = 0; j < this.airBasicName.length; j++){
                        this.airTerminationArr.push(this.createAirTermination());
                        this.airTerminationArr.controls[0].controls.airTerminationHeading.setValue('Basic Details Observation');
                        this.airTerminationArr.controls[0].controls.observationComponentDetails.setValue('airBasicDescription' + index);
                        this.airTerminationArr.controls[index].controls.serialNo.setValue(index+1);
                        if(i[this.airBasicName[j]]==""){
                          this.airTerminationArr.controls[index].controls.observation.setValue('No Remarks Provided');
                        }
                        else{
                          this.airTerminationArr.controls[index].controls.observation.setValue(i[this.airBasicName[j]]);
                        }
                        index++;
                      }
                  }
                  //vertical
                  this.airVerticalArr=this.summaryForm.get('airVertical') as FormArray;
                  let index1 =0;
                  for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[0].lpsVerticalAirTermination){
                    for(let j = 0; j < this.airVerticalName.length; j++){
                    this.airVerticalArr.push(this.createAirVertical());
                    this.airVerticalArr.controls[0].controls.airVerticalHeading.setValue('Vertical Observation');
                    this.airTerminationArr.controls[0].controls.observationComponentDetails.setValue('lpsVerticalAirTermination' + index);
                    this.airVerticalArr.controls[index1].controls.serialNo.setValue(index1+1);
                    if(i[this.airVerticalName[j]]==""){
                      this.airVerticalArr.controls[index1].controls.observation.setValue('No Remarks Provided');
                    }
                    else{
                      this.airVerticalArr.controls[index1].controls.observation.setValue(i[this.airVerticalName[j]]);
                    }
                    index1++;
                    }
              }
                //vertical list
                this.airVerticalListArr=this.summaryForm.get('airVerticalList') as FormArray;
                let index0 =0;
                let vatListIndex=1;
                let indexVertical=0;
                for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[0].lpsVerticalAirTermination[0].verticalAirTerminationList)
                {
                  for(let j = 0; j < this.airVerticalListName.length; j++){
                  this.airVerticalListArr.push(this.createAirVerticalList());
                  if(this.airVerticalListName[j]=='materialOfTerminalRe'){
                    this.airVerticalListArr.controls[index0].controls.airVerticalListHeading.setValue('Vertical List-' + vatListIndex);
                  }
                  this.airVerticalListArr.controls[0].controls.observationComponentDetails.setValue('verticalAirTerminationList' + index0);
                  this.airVerticalListArr.controls[index0].controls.serialNo.setValue(indexVertical+1);
                  if(i[this.airVerticalListName[j]]==""){
                    this.airVerticalListArr.controls[index0].controls.observation.setValue('No Remarks Provided');
                  }
                  else{
                    this.airVerticalListArr.controls[index0].controls.observation.setValue(i[this.airVerticalListName[j]]);
                  }
                  index0++;
                  indexVertical++;
                  }
                  indexVertical=0;
                  vatListIndex++;
            }
              //mesh
              this.airMeshArr=this.summaryForm.get('airMesh') as FormArray;
              let index2 =0;
              for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[0].airMeshDescription){
                for(let j = 0; j < this.airMeshName.length; j++){
                  this.airMeshArr.push(this.createAirMesh());
                  this.airMeshArr.controls[0].controls.airMeshHeading.setValue('Mesh Observation');
                  this.airTerminationArr.controls[0].controls.observationComponentDetails.setValue('airMeshDescription');

                  this.airMeshArr.controls[index2].controls.serialNo.setValue(index2+1);
                  if(i[this.airMeshName[j]]==""){
                    this.airMeshArr.controls[index2].controls.observation.setValue('No Remarks Provided');
                  }
                  else{
                    this.airMeshArr.controls[index2].controls.observation.setValue(i[this.airMeshName[j]]);
                  }
                  index2++;
                }
            }
            //holder
            this.airHolderArr=this.summaryForm.get('airHolder') as FormArray;
            let index3 =0;
            for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[0].airHolderDescription){
              for(let j = 0; j < this.airHolderName.length; j++){
              this.airHolderArr.push(this.createAirHolder());
              this.airHolderArr.controls[0].controls.airHolderHeading.setValue('Holder Observation');
              this.airTerminationArr.controls[0].controls.observationComponentDetails.setValue('airHolderDescription');
              this.airHolderArr.controls[index3].controls.serialNo.setValue(index3+1);
              if(i[this.airHolderName[j]]==""){
                this.airHolderArr.controls[index3].controls.observation.setValue('No Remarks Provided');
              }
              else{
                this.airHolderArr.controls[index3].controls.observation.setValue(i[this.airHolderName[j]]);
              }
              index3++;
              }
        }
        //holder list
        this.airHolderListArr=this.summaryForm.get('airHolderList') as FormArray;
        let index01 =0;
        let holderListIndex=1;
        let indexHolder=0;
        for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[0].airHolderDescription[0].airHolderList)
        {
          for(let j = 0; j < this.airHolderListName.length; j++){
            this.airHolderListArr.push(this.createAirHolderList());
            if(this.airHolderListName[j]=='holderTypeRe'){
            this.airHolderListArr.controls[index01].controls.airHolderListHeading.setValue('Holder List-' + holderListIndex);
            }
            this.airHolderListArr.controls[0].controls.observationComponentDetails.setValue('airHolderList' + index01);
            this.airHolderListArr.controls[index01].controls.serialNo.setValue(indexHolder+1);
            if(i[this.airHolderListName[j]]==""){
              this.airHolderListArr.controls[index01].controls.observation.setValue('No Remarks Provided');
            }
            else{
              this.airHolderListArr.controls[index01].controls.observation.setValue(i[this.airHolderListName[j]]);
            }
            index01++;
            indexHolder++;
          }
          indexHolder=0;
          holderListIndex++;
        }
        //clamps
        this.airClampsArr=this.summaryForm.get('airClamps') as FormArray;
        let index4 =0;
        for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[0].airClamps){
          for(let j = 0; j < this.airClampsName.length; j++){
            this.airClampsArr.push(this.createAirClamps());
            this.airClampsArr.controls[0].controls.airClampsHeading.setValue('Clamps Observation');
            this.airClampsArr.controls[index4].controls.serialNo.setValue(index4+1);
            if(i[this.airClampsName[j]]==""){
              this.airClampsArr.controls[index4].controls.observation.setValue('No Remarks Provided');
            }
            else{
              this.airClampsArr.controls[index4].controls.observation.setValue(i[this.airClampsName[j]]);
            }
            index4++;
          }
        }
        //expansion
        this.airExpansionArr=this.summaryForm.get('airExpansion') as FormArray;
        let index5 =0;
        for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[0].airExpansion){
          for(let j = 0; j < this.airExpansionName.length; j++){
          this.airExpansionArr.push(this.createAirExpansion());
          this.airExpansionArr.controls[0].controls.airExpansionHeading.setValue('Expansion Observation');
          this.airExpansionArr.controls[index5].controls.serialNo.setValue(index5+1);
          if(i[this.airClampsName[j]]==""){
            this.airExpansionArr.controls[index5].controls.observation.setValue('No Remarks Provided');
          }
          else{
            this.airExpansionArr.controls[index5].controls.observation.setValue(i[this.airExpansionName[j]]);
          }
          index5++;
          }
        }
        //connectors
        this.airConnectorsArr=this.summaryForm.get('airConnectors') as FormArray;
        let index6 =0;
        for(let i of this.airTerminationData.airTermination[0].lpsAirDiscription[0].airConnectors){
          for(let j = 0; j < this.airConnectorsName.length; j++){
          this.airConnectorsArr.push(this.createAirConnectors());
          this.airConnectorsArr.controls[0].controls.airConnectorsHeading.setValue('Connectors Observation');
          this.airConnectorsArr.controls[index6].controls.serialNo.setValue(index6+1);
          if(i[this.airConnectorsName[j]]==""){
            this.airConnectorsArr.controls[index6].controls.observation.setValue('No Remarks Provided');
          }
          else{
            this.airConnectorsArr.controls[index6].controls.observation.setValue(i[this.airConnectorsName[j]]);
          }
          index6++;
          }
        }
              }
          //down conductors
              if(this.downConductorData.downConductorReport!=null){
                this.downConductorsBasicArr=this.summaryForm.get('downConductorReport') as FormArray;
                let index =0; 
               // for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[0]){
                    for(let j = 0; j < this.downBasicName.length; j++){
                      this.downConductorsBasicArr.push(this.createDownConductorsBasic());
                      this.downConductorsBasicArr.controls[0].controls.basicDetailsHeading.setValue('Basic Details Observation');
                      this.downConductorsBasicArr.controls[0].controls.observationComponentDetails.setValue('downConductorDescription' + index);
                      this.downConductorsBasicArr.controls[index].controls.serialNo.setValue(index+1);
                      if(this.downConductorData.downConductorReport[0].downConductorDescription[0][this.downBasicName[j]]==""){
                        this.downConductorsBasicArr.controls[index].controls.observation.setValue('No Remarks Provided');
                      }
                      else{
                        this.downConductorsBasicArr.controls[index].controls.observation.setValue(this.downConductorData.downConductorReport[0].downConductorDescription[0][this.downBasicName[j]]);
                      }
                      index++;
                    }
                //}
                //downConductor
                this.downConductorsArr=this.summaryForm.get('downConductor') as FormArray;
                let index1 =0;
                for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[0].downConductor){
                  for(let j = 0; j < this.downConductorName.length; j++){
                  this.downConductorsArr.push(this.createDownConductors());
                  this.downConductorsArr.controls[0].controls.heading.setValue('Downconductors Observation');
                  this.downConductorsArr.controls[0].controls.observationComponentDetails.setValue('downConductor' + index);
                  this.downConductorsArr.controls[index1].controls.serialNo.setValue(index1+1);
                  if(i[this.downConductorName[j]]==""){
                    this.downConductorsArr.controls[index1].controls.observation.setValue('No Remarks Provided');
                  }
                  else{
                    this.downConductorsArr.controls[index1].controls.observation.setValue(i[this.downConductorName[j]]);
                  }
                  index1++;
                  }
            }
             
            //Bridging
            this.bridgingDescArr=this.summaryForm.get('bridgingDesc') as FormArray;
            let index2 =0;
            for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[0].bridgingDescription){
              for(let j = 0; j < this.bridgingName.length; j++){
                this.bridgingDescArr.push(this.createBridgingDesc());
                this.bridgingDescArr.controls[0].controls.heading.setValue('Bridging Observation');
                this.bridgingDescArr.controls[0].controls.observationComponentDetails.setValue('bridgingDescription');

                this.bridgingDescArr.controls[index2].controls.serialNo.setValue(index2+1);
                if(i[this.bridgingName[j]]==""){
                  this.bridgingDescArr.controls[index2].controls.observation.setValue('No Remarks Provided');
                }
                else{
                  this.bridgingDescArr.controls[index2].controls.observation.setValue(i[this.bridgingName[j]]);
                }
                index2++;
              }
          }
          //holder
          this.downHoldersArr=this.summaryForm.get('downHolders') as FormArray;
          let index3 =0;
          for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[0].holder){
            for(let j = 0; j < this.downHolderName.length; j++){
            this.downHoldersArr.push(this.createDownHolders());
            this.downHoldersArr.controls[0].controls.heading.setValue('Holder Observation');
            this.downHoldersArr.controls[0].controls.observationComponentDetails.setValue('holder');
            this.downHoldersArr.controls[index3].controls.serialNo.setValue(index3+1);
            if(i[this.downHolderName[j]]==""){
              this.downHoldersArr.controls[index3].controls.observation.setValue('No Remarks Provided');
            }
            else{
              this.downHoldersArr.controls[index3].controls.observation.setValue(i[this.downHolderName[j]]);
            }
            index3++;
            }
        }
        
        //connectors
        this.downConnectorsArr=this.summaryForm.get('downConnectors') as FormArray;
        let index4 =0;
        for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[0].connectors){
        for(let j = 0; j < this.connectorsName.length; j++){
          this.downConnectorsArr.push(this.createDownConnectors());
          this.downConnectorsArr.controls[0].controls.heading.setValue('Connectors Observation');
          this.downConnectorsArr.controls[index4].controls.serialNo.setValue(index4+1);
          if(i[this.connectorsName[j]]==""){
            this.downConnectorsArr.controls[index4].controls.observation.setValue('No Remarks Provided');
          }
          else{
            this.downConnectorsArr.controls[index4].controls.observation.setValue(i[this.connectorsName[j]]);
          }
          index4++;
        }
        }
        //testingJoint
        this.testingJointArr=this.summaryForm.get('testingJoint') as FormArray;
        let index5 =0;
        for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[0].testingJoint){
        for(let j = 0; j < this.testingJointName.length; j++){
        this.testingJointArr.push(this.createTestingJoints());
        this.testingJointArr.controls[0].controls.heading.setValue('TestingJoint Observation');
        this.testingJointArr.controls[index5].controls.serialNo.setValue(index5+1);
        if(i[this.testingJointName[j]]==""){
          this.testingJointArr.controls[index5].controls.observation.setValue('No Remarks Provided');
        }
        else{
          this.testingJointArr.controls[index5].controls.observation.setValue(i[this.testingJointName[j]]);
        }
        index5++;
        }
        }
        //lightingCounter
        this.lightingCounterArr=this.summaryForm.get('lightingCounter') as FormArray;
        let index6 =0;
        for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[0].lightningCounter){
        for(let j = 0; j < this.lightingCounterName.length; j++){
        this.lightingCounterArr.push(this.createLightingCounter());
        this.lightingCounterArr.controls[0].controls.heading.setValue('LightningCounter Observation');
        this.lightingCounterArr.controls[index6].controls.serialNo.setValue(index6+1);
        if(i[this.lightingCounterName[j]]==""){
          this.lightingCounterArr.controls[index6].controls.observation.setValue('No Remarks Provided');
        }
        else{
          this.lightingCounterArr.controls[index6].controls.observation.setValue(i[this.lightingCounterName[j]]);
        }
        index6++;
        }
        }

         //downConductorTesting
         this.downConductorTestingArr=this.summaryForm.get('downConductorTesting') as FormArray;
         let index8 =0;
         for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[0].downConductorTesting){
         for(let j = 0; j < this.downConductorTestingName.length; j++){
         this.downConductorTestingArr.push(this.createDownConductorsTesting());
         this.downConductorTestingArr.controls[0].controls.heading.setValue('DownConductorTesting Observation');
         this.downConductorTestingArr.controls[index8].controls.serialNo.setValue(index8+1);
         if(i[this.downConductorTestingName[j]]==""){
           this.downConductorTestingArr.controls[index8].controls.observation.setValue('No Remarks Provided');
         }
         else{
           this.downConductorTestingArr.controls[index8].controls.observation.setValue(i[this.downConductorTestingName[j]]);
         }
         index8++;
         }
         }
            }
          //earthing
          if(this.earthingData.earthingReport!=null){
            this.earthingReportArr=this.summaryForm.get('earthingReport') as FormArray;
            let index =0; 
           // for(let i of this.downConductorData.downConductorReport[0].downConductorDescription[0]){
                for(let j = 0; j < this.earthingReportName.length; j++){
                  this.earthingReportArr.push(this.createEarthingReport());
                  this.earthingReportArr.controls[0].controls.heading.setValue('Basic Details Observation');
                  this.earthingReportArr.controls[0].controls.observationComponentDetails.setValue('earthingLpsDescription' + index);
                  this.earthingReportArr.controls[index].controls.serialNo.setValue(index+1);
                  if(this.earthingData.earthingReport[0].earthingLpsDescription[0][this.earthingReportName[j]]==""){
                    this.earthingReportArr.controls[index].controls.observation.setValue('No Remarks Provided');
                  }
                  else{
                    this.earthingReportArr.controls[index].controls.observation.setValue(this.earthingData.earthingReport[0].earthingLpsDescription[0][this.earthingReportName[j]]);
                  }
                  index++;
                }
            //}
            //earthingDescription
            this.earthingDescArr=this.summaryForm.get('earthingDescription') as FormArray;
            let index1 =0;
            for(let i of this.earthingData.earthingReport[0].earthingLpsDescription[0].earthingDescription){
              for(let j = 0; j < this.earthingDescriptionName.length; j++){
              this.earthingDescArr.push(this.createEarthingDescription());
              this.earthingDescArr.controls[0].controls.heading.setValue('EarthingDescription Observation');
              this.earthingDescArr.controls[0].controls.observationComponentDetails.setValue('earthingDescription' + index);
              this.earthingDescArr.controls[index1].controls.serialNo.setValue(index1+1);
              if(i[this.earthingDescriptionName[j]]==""){
                this.earthingDescArr.controls[index1].controls.observation.setValue('No Remarks Provided');
              }
              else{
                this.earthingDescArr.controls[index1].controls.observation.setValue(i[this.earthingDescriptionName[j]]);
              }
              index1++;
              }
        }
         //earthingDescription list
         this.earthingDescriptionListArr=this.summaryForm.get('earthingDescriptionList') as FormArray;
         let index0 =0;
         let vatListIndex=1;
         let indexVertical=0;
         for(let i of this.earthingData.earthingReport[0].earthingLpsDescription[0].earthingDescription[0].earthingDescriptionList)
         {
           for(let j = 0; j < this.earthingDescriptionListName.length; j++){
           this.earthingDescriptionListArr.push(this.createEarthingDescriptionList());
           if(this.earthingDescriptionListName[j]=='earthingConductorMaterialInRem'){
             this.earthingDescriptionListArr.controls[index0].controls.heading.setValue('EarthingDescription List-' + vatListIndex);
           }
           this.earthingDescriptionListArr.controls[0].controls.observationComponentDetails.setValue('earthingDescriptionList' + index0);
           this.earthingDescriptionListArr.controls[index0].controls.serialNo.setValue(indexVertical+1);
           if(i[this.earthingDescriptionListName[j]]==""){
             this.earthingDescriptionListArr.controls[index0].controls.observation.setValue('No Remarks Provided');
           }
           else{
             this.earthingDescriptionListArr.controls[index0].controls.observation.setValue(i[this.earthingDescriptionListName[j]]);
           }
           index0++;
           indexVertical++;
           }
           indexVertical=0;
           vatListIndex++;
     }
        //earthingClamps
        this.earthingClampsArr=this.summaryForm.get('earthingClamps') as FormArray;
        let index2 =0;
        for(let i of this.earthingData.earthingReport[0].earthingLpsDescription[0].earthingClamps){
          for(let j = 0; j < this.earthingClampsName.length; j++){
            this.earthingClampsArr.push(this.createEarthingClamps());
            this.earthingClampsArr.controls[0].controls.heading.setValue('EarthingClamps Observation');
            this.earthingClampsArr.controls[0].controls.observationComponentDetails.setValue('earthingClamps');

            this.earthingClampsArr.controls[index2].controls.serialNo.setValue(index2+1);
            if(i[this.earthingClampsName[j]]==""){
              this.earthingClampsArr.controls[index2].controls.observation.setValue('No Remarks Provided');
            }
            else{
              this.earthingClampsArr.controls[index2].controls.observation.setValue(i[this.earthingClampsName[j]]);
            }
            index2++;
          }
      }
      //earthingElectrodeChamber
      this.earthingElectrodeChamberArr=this.summaryForm.get('earthingElectrodeChamber') as FormArray;
      let index3 =0;
      for(let i of this.earthingData.earthingReport[0].earthingLpsDescription[0].earthingElectrodeChamber){
        for(let j = 0; j < this.earthingElectrodeChamberName.length; j++){
        this.earthingElectrodeChamberArr.push(this.createEarthingElectrodeChamber());
        this.earthingElectrodeChamberArr.controls[0].controls.heading.setValue('EarthingElectrodeChamber Observation');
        this.earthingElectrodeChamberArr.controls[0].controls.observationComponentDetails.setValue('earthingElectrodeChamber');
        this.earthingElectrodeChamberArr.controls[index3].controls.serialNo.setValue(index3+1);
        if(i[this.earthingElectrodeChamberName[j]]==""){
          this.earthingElectrodeChamberArr.controls[index3].controls.observation.setValue('No Remarks Provided');
        }
        else{
          this.earthingElectrodeChamberArr.controls[index3].controls.observation.setValue(i[this.earthingElectrodeChamberName[j]]);
        }
        index3++;
        }
    }
    
    //earthingSystem
    this.earthingSystemArr=this.summaryForm.get('earthingSystem') as FormArray;
    let index4 =0;
    for(let i of this.earthingData.earthingReport[0].earthingLpsDescription[0].earthingSystem){
    for(let j = 0; j < this.earthingSystemName.length; j++){
      this.earthingSystemArr.push(this.createEarthingSystem());
      this.earthingSystemArr.controls[0].controls.heading.setValue('EarthingSystem Observation');
      this.earthingSystemArr.controls[index4].controls.serialNo.setValue(index4+1);
      if(i[this.earthingSystemName[j]]==""){
        this.earthingSystemArr.controls[index4].controls.observation.setValue('No Remarks Provided');
      }
      else{
        this.earthingSystemArr.controls[index4].controls.observation.setValue(i[this.earthingSystemName[j]]);
      }
      index4++;
    }
    }
    //earthElectrodeTesting
    this.earthElectrodeTestingArr=this.summaryForm.get('earthElectrodeTesting') as FormArray;
    let index5 =0;
    for(let i of this.earthingData.earthingReport[0].earthingLpsDescription[0].earthElectrodeTesting){
    for(let j = 0; j < this.earthElectrodeTestingName.length; j++){
    this.earthElectrodeTestingArr.push(this.createEarthElectrodeTesting());
    this.earthElectrodeTestingArr.controls[0].controls.heading.setValue('EarthElectrodeTesting Observation');
    this.earthElectrodeTestingArr.controls[index5].controls.serialNo.setValue(index5+1);
    if(i[this.earthElectrodeTestingName[j]]==""){
      this.earthElectrodeTestingArr.controls[index5].controls.observation.setValue('No Remarks Provided');
    }
    else{
      this.earthElectrodeTestingArr.controls[index5].controls.observation.setValue(i[this.earthElectrodeTestingName[j]]);
    }
    index5++;
    }
    }
        }
         //spd
         if(this.spdReportData.spdReport!=null){
          //spd report
            this.spdReportArr=this.summaryForm.get('spdReport') as FormArray;
            let index =0;
            for(let i of this.spdReportData.spdReport[0].spd){
                for(let j = 0; j < this.spdReportName.length; j++){
                  this.spdReportArr.push(this.createSpdReport());
                  this.spdReportArr.controls[0].controls.heading.setValue('SPD Details Observation');
                  this.spdReportArr.controls[0].controls.observationComponentDetails.setValue('spdReport' + index);
                  this.spdReportArr.controls[index].controls.serialNo.setValue(index+1);
                  if(i[this.spdReportName[j]]==""){
                    this.spdReportArr.controls[index].controls.observation.setValue('No Remarks Provided');
                  }
                  else{
                    this.spdReportArr.controls[index].controls.observation.setValue(i[this.spdReportName[j]]);
                  }
                  index++;
                }
            }
          //spd list
          this.spdListArr=this.summaryForm.get('spdReportList') as FormArray;
          let index07 =0;
          let vatListIndex=1;
          let indexVertical=0;
          for(let i of this.spdReportData.spdReport[0].spd[0].spdDescription)
          {
            for(let j = 0; j < this.spdReportListName.length; j++){
              this.spdListArr.push(this.createSpdReportList());
              if(this.spdReportListName[j]=='spdMakeRem'){
                this.spdListArr.controls[index07].controls.heading.setValue('SPD List-' + vatListIndex);
              }
             // this.spdListArr.controls[0].controls.heading.setValue('SPD List Observation');
              this.spdListArr.controls[0].controls.observationComponentDetails.setValue('spdDescription' + index07);
              this.spdListArr.controls[index07].controls.serialNo.setValue(indexVertical+1);
              if(i[this.spdReportListName[j]]==""){
                this.spdListArr.controls[index07].controls.observation.setValue('No Remarks Provided');
              }
              else{
                this.spdListArr.controls[index07].controls.observation.setValue(i[this.spdReportListName[j]]);
              }
              index07++;
              indexVertical++;
            }
            indexVertical=0;
            vatListIndex++;
      }
        }
        //separationDistance
        if(this.separationDistanceData.seperationDistanceReport!=null){
          //separationDistance report
            this.separationDistanceArr=this.summaryForm.get('separationDistance') as FormArray;
            let index =0;
            for(let i of this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription){
                for(let j = 0; j < this.separationDistanceName.length; j++){
                  this.separationDistanceArr.push(this.createSeparationDistance());
                  this.separationDistanceArr.controls[0].controls.heading.setValue('SeparationDistance Observation');
                  this.separationDistanceArr.controls[0].controls.observationComponentDetails.setValue('seperationDistanceDescription' + index);
                  this.separationDistanceArr.controls[index].controls.serialNo.setValue(index+1);
                  if(i[this.separationDistanceName[j]]==""){
                    this.separationDistanceArr.controls[index].controls.observation.setValue('No Remarks Provided');
                  }
                  else{
                    this.separationDistanceArr.controls[index].controls.observation.setValue(i[this.separationDistanceName[j]]);
                  }
                  index++;
                }
            }
            this.separateDistanceArr=this.summaryForm.get('separateDistance') as FormArray;
            let indexS =0;
            for(let i of this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription[0].separateDistance){
              for(let j = 0; j < this.separateDistanceName.length; j++){
                this.separateDistanceArr.push(this.createSeparateDistance());
                this.separateDistanceArr.controls[0].controls.heading.setValue('SeparateDistance Observation');
                this.separateDistanceArr.controls[0].controls.observationComponentDetails.setValue('separateDistance' + indexS);
                this.separateDistanceArr.controls[indexS].controls.serialNo.setValue(indexS+1);
                if(i[this.separateDistanceName[j]]==""){
                  this.separateDistanceArr.controls[indexS].controls.observation.setValue('No Remarks Provided');
                }
                else{
                  this.separateDistanceArr.controls[indexS].controls.observation.setValue(i[this.separateDistanceName[j]]);
                }
                indexS++;
              }
          }
          this.separationDistanceDownArr=this.summaryForm.get('separationDistanceDown') as FormArray;
          let indexSD =0;
          for(let i of this.separationDistanceData.seperationDistanceReport[0].seperationDistanceDescription[0].separateDistanceDownConductors){
            for(let j = 0; j < this.separateDistanceDownName.length; j++){
              this.separationDistanceDownArr.push(this.createSeparationDownDistance());
              this.separationDistanceDownArr.controls[0].controls.heading.setValue('SeparationDistanceDown Observation');
              this.separationDistanceDownArr.controls[0].controls.observationComponentDetails.setValue('separateDistanceDownConductors' + indexSD);
              this.separationDistanceDownArr.controls[indexSD].controls.serialNo.setValue(indexSD+1);
              if(i[this.separateDistanceDownName[j]]==""){
                this.separationDistanceDownArr.controls[indexSD].controls.observation.setValue('No Remarks Provided');
              }
              else{
                this.separationDistanceDownArr.controls[indexSD].controls.observation.setValue(i[this.separateDistanceDownName[j]]);
              }
              indexSD++;
            }
        }
        }
         //equipotential bonding
         if(this.equiBondingData.earthStudDescription!=null){
            this.equiBondingArr=this.summaryForm.get('earthStudDesc') as FormArray;
            let index =0;
            for(let i of this.equiBondingData.earthStudDescription[0]){
                for(let j = 0; j < this.earthStudDescName.length; j++){
                  this.equiBondingArr.push(this.createEarthStudDesc());
                  this.equiBondingArr.controls[0].controls.heading.setValue('SeparationDistance Observation');
                  this.equiBondingArr.controls[0].controls.observationComponentDetails.setValue('earthStudDescription' + index);
                  this.equiBondingArr.controls[index].controls.serialNo.setValue(index+1);
                  if(i[this.earthStudDescName[j]]==""){
                    this.equiBondingArr.controls[index].controls.observation.setValue('No Remarks Provided');
                  }
                  else{
                    this.equiBondingArr.controls[index].controls.observation.setValue(i[this.earthStudDescName[j]]);
                  }
                  index++;
                }
            }
        }
            } 
          )
        }
        }
