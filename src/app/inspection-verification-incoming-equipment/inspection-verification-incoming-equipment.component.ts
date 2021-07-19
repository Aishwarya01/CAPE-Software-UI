import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {​​​ NgbModal }​​​ from'@ng-bootstrap/ng-bootstrap';
import { InspectiondetailsService } from '../services/inspectiondetails.service';
import { InspectionDetails } from '../model/inspection-details';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-inspection-verification-incoming-equipment',
  templateUrl: './inspection-verification-incoming-equipment.component.html',
  styleUrls: ['./inspection-verification-incoming-equipment.component.css']
})
export class InspectionVerificationIncomingEquipmentComponent implements OnInit {

  submitted = false;
  
  @Output() proceedNext = new EventEmitter<any>();  

  addstep3 = new FormGroup({
    serviceCable:  new FormControl(''),
    serviceFuse:  new FormControl(''),
    meterDistributor:  new FormControl(''),
    meterConsumer:  new FormControl(''),
    meterEqu:  new FormControl(''),
    isolator:  new FormControl(''),

    earthingArrangement:  new FormControl(''),
    adequateArrangement:  new FormControl(''),
    connectionGenerator:  new FormControl(''),
    compatibilityCharacteristics:  new FormControl(''),
    automaticDisconnectGenerator:  new FormControl(''),
    preventConnectGenerator:  new FormControl(''),
    isolateGenerator:  new FormControl(''),

    mainEarting:  new FormControl(''),
    earthElectordeArrangement:  new FormControl(''),
    earthConductorConnection:  new FormControl(''),
    accessibility:  new FormControl(''),
    aainProtectBonding:  new FormControl(''),
    allProtectBonding:  new FormControl(''),
    allAppropriateLocation:  new FormControl(''),
    felvRequirement:  new FormControl(''),

    selvSystem:  new FormControl(''),
    pelvSystem:  new FormControl(''),
    doubleInsulation:  new FormControl(''),
    reinforcedInsulation:  new FormControl(''),
    basicElectricalSepartion:  new FormControl(''),
    insulationLiveParts:  new FormControl(''),
    barriersEnclosers:  new FormControl(''),
    obstacles:  new FormControl(''),
    placingOutReach:  new FormControl(''),
    nonConductLocation:  new FormControl(''),
    faultElectricalSepartion:  new FormControl(''),
    faultNonConductLocation:  new FormControl(''),
    operatingCurrent:  new FormControl(''),

    accessWorking:  new FormControl(''),
    securityFixing:  new FormControl(''),
    livePartsDamage:  new FormControl(''),
    securityBarriers:  new FormControl(''),
    suitabilityEnclosure:  new FormControl(''),
    enclosureDamaged:  new FormControl(''),
    presenceObstacles:  new FormControl(''),
   // placingOutReach:  new FormControl(''),
    presenceMainSwitches:  new FormControl(''),
    operationMainSwitches:  new FormControl(''),
    manualCircuitBreakers:  new FormControl(''),
    switchCausesRcd:  new FormControl(''),
    rcdFaultProtection:  new FormControl(''),
    rcdAdditionalProtection:  new FormControl(''),
    overVoltageProtection:  new FormControl(''),
    indicationOfSpd:  new FormControl(''),
    rcdQuarterlyTest:  new FormControl(''),
    diagramsCharts:  new FormControl(''),
    nonstandardCableColour:  new FormControl(''),
    alSupplyOfOrign:  new FormControl(''),
    alSupplyOfMeter:  new FormControl(''),
    alSupplyDistribution:  new FormControl(''),
    allPointsIsolation:  new FormControl(''),
    nextInspection:  new FormControl(''),
    otherRequiredLabelling:  new FormControl(''),
    basesCorrectType:  new FormControl(''),
    singlePole:  new FormControl(''),
    mechanicalDamage:  new FormControl(''),
    electromagnetic:  new FormControl(''),
    allConductorCon:  new FormControl(''),

    identificationConductors:  new FormControl(''),
    cableInstallation:  new FormControl(''),
    examinationCables:  new FormControl(''),
    examinationInsulation:  new FormControl(''),
    nonSheathedCables:  new FormControl(''),
    containmentSystems:  new FormControl(''),
    temperatureRating:  new FormControl(''),
    cablesTerminated:  new FormControl(''),
    currentCarryCapacity:  new FormControl(''),
   // operationMainSwitches:  new FormControl(''),
   // manualCircuitBreakers:  new FormControl(''),
   // switchCausesRcd:  new FormControl(''),
    adequacyProtectDevices:  new FormControl(''),
    //rcdAdditionalProtection:  new FormControl(''),
    presenceProtectConductors:  new FormControl(''),
    coOrdination:  new FormControl(''),
    wiringSystems:  new FormControl(''),
    cablesConcealUnderFloors:  new FormControl(''),
    provisionFireBarriers:  new FormControl(''),
    sectionsRegardlessDepth:  new FormControl(''),
    cablesConcDepth:  new FormControl(''),
    operatingCurrentSocket:  new FormControl(''),
    operatingCurrentCircuits:  new FormControl(''),
    separationBand:  new FormControl(''),
    separationElectrical:  new FormControl(''),
    conditionCircuitAccessories:  new FormControl(''),
    conductorCorrectTerminated:  new FormControl(''),
    conductorVisibleOutside:  new FormControl(''),
    connLiveConductors:  new FormControl(''),
    adequatelyConnectedEnclosure:  new FormControl(''),
    suitabilityCircuitAccessories:  new FormControl(''),
    conditionAccessories:  new FormControl(''),
    singlePoleDevices:  new FormControl(''),
    adequacyConnections:  new FormControl(''),
    isolationSwitching:  new FormControl(''),

    presenceDevices:  new FormControl(''),
    conditionDevices:  new FormControl(''),
    locationDevices:  new FormControl(''),
    capableSecured:  new FormControl(''),
    operationVerify:  new FormControl(''),
    installCircuit:  new FormControl(''),
    warningLabel:  new FormControl(''),
    swPresenceDevices:  new FormControl(''),
    swConditionDevices:  new FormControl(''),
    swAcceptableLocation:  new FormControl(''),
    swCapableOffPosition:  new FormControl(''),
    swCorrectOperation:  new FormControl(''),
    swCircuit:  new FormControl(''),
    swWarningLabel:  new FormControl(''),
    emSwitPresenceDevices:  new FormControl(''),
    emSwitConditionDevices:  new FormControl(''),
    emSwitLocationDevices:  new FormControl(''),
    emSwitOperationVerify:  new FormControl(''),
    emSwitInstallCircuit:  new FormControl(''),
    fuSwitPresenceDevices:  new FormControl(''),
    fuSwitLocationDevices:  new FormControl(''),
    fuSwitOperationVerify:  new FormControl(''),

    suitabilityEquipment:  new FormControl(''),
    enclosureNotDamaged:  new FormControl(''),
    suitabilityEnvironment:  new FormControl(''),
   // securityFixing:  new FormControl(''),
    cableEntryHoles:  new FormControl(''),
    provisionVoltage:  new FormControl(''),
    provisionOverload:  new FormControl(''),
    correctTypeLamps:  new FormControl(''),
    insulaDisplacementBox:  new FormControl(''),
    overheatSurrounding:  new FormControl(''),
    overheatConductors:  new FormControl(''),
  })
  
  inActiveData: any =[];
  email: String = '';
  showField1: boolean= true;
  showField2: boolean= false;

  inspectionDetails =new InspectionDetails;


  // Second Tab dependencies
  panelOpenState = false;
  InspectionList: String[]=['Yes', 'No', 'Not Applicable'];

  successMsg: string="";	
  errorMsg: string="";
  success: boolean=false;	
  Error: boolean=false;

  formBuilder: any;
   constructor(private _formBuilder: FormBuilder,
    private router: ActivatedRoute, private modalService: NgbModal,
    private inspectionDetailsService: InspectiondetailsService,public service: GlobalsService,
    private ChangeDetectorRef: ChangeDetectorRef) {
    this.email = this.router.snapshot.paramMap.get('email') || '{}'
  }

  

  ngOnInit(): void {
  
    this.addstep3 = this._formBuilder.group({
      serviceCable:   ['', Validators.required],
      serviceFuse:  ['', Validators.required],
      meterDistributor:  ['', Validators.required],
      meterConsumer:  ['', Validators.required],
      meterEqu:  ['', Validators.required],
      isolator:  ['', Validators.required],
  
      earthingArrangement:  ['', Validators.required],
      adequateArrangement:  ['', Validators.required],
      connectionGenerator:  ['', Validators.required],
      compatibilityCharacteristics:  ['', Validators.required],
      automaticDisconnectGenerator:  ['', Validators.required],
      preventConnectGenerator:  ['', Validators.required],
      isolateGenerator:  ['', Validators.required],
  
      mainEarting:  ['', Validators.required],
      earthElectordeArrangement:  ['', Validators.required],
      earthConductorConnection:  ['', Validators.required],
      accessibility:  ['', Validators.required],
      aainProtectBonding:  ['', Validators.required],
      allProtectBonding:  ['', Validators.required],
      allAppropriateLocation:  ['', Validators.required],
      felvRequirement:  ['', Validators.required],
  
      selvSystem:  ['', Validators.required],
      pelvSystem:  ['', Validators.required],
      doubleInsulation:  ['', Validators.required],
      reinforcedInsulation:  ['', Validators.required],
      basicElectricalSepartion:  ['', Validators.required],
      insulationLiveParts:  ['', Validators.required],
      barriersEnclosers:  ['', Validators.required],
      obstacles:  ['', Validators.required],
      placingOutReach:  ['', Validators.required],
      nonConductLocation:  ['', Validators.required],
      faultElectricalSepartion:  ['', Validators.required],
      faultNonConductLocation:  ['', Validators.required],
      operatingCurrent:  ['', Validators.required],
  
      accessWorking:  ['', Validators.required],
      securityFixing:  ['', Validators.required],
      livePartsDamage:  ['', Validators.required],
      securityBarriers:  ['', Validators.required],
      suitabilityEnclosure:  ['', Validators.required],
      enclosureDamaged:  ['', Validators.required],
      presenceObstacles:  ['', Validators.required],
     // placingOutReach:  ['', Validators.required],
      presenceMainSwitches:  ['', Validators.required],
      operationMainSwitches:  ['', Validators.required],
      manualCircuitBreakers:  ['', Validators.required],
      switchCausesRcd:  ['', Validators.required],
      rcdFaultProtection:  ['', Validators.required],
      rcdAdditionalProtection:  ['', Validators.required],
      overVoltageProtection:  ['', Validators.required],
      indicationOfSpd:  ['', Validators.required],
      rcdQuarterlyTest:  ['', Validators.required],
      diagramsCharts:  ['', Validators.required],
      nonstandardCableColour:  ['', Validators.required],
      alSupplyOfOrign:  ['', Validators.required],
      alSupplyOfMeter:  ['', Validators.required],
      alSupplyDistribution:  ['', Validators.required],
      allPointsIsolation:  ['', Validators.required],
      nextInspection:  ['', Validators.required],
      otherRequiredLabelling:  ['', Validators.required],
      basesCorrectType:  ['', Validators.required],
      singlePole:  ['', Validators.required],
      mechanicalDamage:  ['', Validators.required],
      electromagnetic:  ['', Validators.required],
      allConductorCon:  ['', Validators.required],
  
      identificationConductors:  ['', Validators.required],
      cableInstallation:  ['', Validators.required],
      examinationCables:  ['', Validators.required],
      examinationInsulation:  ['', Validators.required],
      nonSheathedCables:  ['', Validators.required],
      containmentSystems:  ['', Validators.required],
      temperatureRating:  ['', Validators.required],
      cablesTerminated:  ['', Validators.required],
      currentCarryCapacity:  ['', Validators.required],
     // operationMainSwitches:  ['', Validators.required],
     // manualCircuitBreakers:  ['', Validators.required],
     // switchCausesRcd:  ['', Validators.required],
      adequacyProtectDevices:  ['', Validators.required],
      //rcdAdditionalProtection:  ['', Validators.required],
      presenceProtectConductors:  ['', Validators.required],
      coOrdination:  ['', Validators.required],
      wiringSystems:  ['', Validators.required],
      cablesConcealUnderFloors:  ['', Validators.required],
      provisionFireBarriers:  ['', Validators.required],
      sectionsRegardlessDepth:  ['', Validators.required],
      cablesConcDepth:  ['', Validators.required],
      operatingCurrentSocket:  ['', Validators.required],
      operatingCurrentCircuits:  ['', Validators.required],
      separationBand:  ['', Validators.required],
      separationElectrical:  ['', Validators.required],
      conditionCircuitAccessories:  ['', Validators.required],
      conductorCorrectTerminated:  ['', Validators.required],
      conductorVisibleOutside:  ['', Validators.required],
      connLiveConductors:  ['', Validators.required],
      adequatelyConnectedEnclosure:  ['', Validators.required],
      suitabilityCircuitAccessories:  ['', Validators.required],
      conditionAccessories:  ['', Validators.required],
      singlePoleDevices:  ['', Validators.required],
      adequacyConnections:  ['', Validators.required],
      isolationSwitching:  ['', Validators.required],
  
      presenceDevices:  ['', Validators.required],
      conditionDevices:  ['', Validators.required],
      locationDevices:  ['', Validators.required],
      capableSecured:  ['', Validators.required],
      operationVerify:  ['', Validators.required],
      installCircuit:  ['', Validators.required],
      warningLabel:  ['', Validators.required],
      swPresenceDevices:  ['', Validators.required],
      swConditionDevices:  ['', Validators.required],
      swAcceptableLocation:  ['', Validators.required],
      swCapableOffPosition:  ['', Validators.required],
      swCorrectOperation:  ['', Validators.required],
      swCircuit:  ['', Validators.required],
      swWarningLabel:  ['', Validators.required],
      emSwitPresenceDevices:  ['', Validators.required],
      emSwitConditionDevices:  ['', Validators.required],
      emSwitLocationDevices:  ['', Validators.required],
      emSwitOperationVerify:  ['', Validators.required],
      emSwitInstallCircuit:  ['', Validators.required],
      fuSwitPresenceDevices:  ['', Validators.required],
      fuSwitLocationDevices:  ['', Validators.required],
      fuSwitOperationVerify:  ['', Validators.required],
  
      suitabilityEquipment:  ['', Validators.required],
      enclosureNotDamaged:  ['', Validators.required],
      suitabilityEnvironment:  ['', Validators.required],
     // securityFixing:  ['', Validators.required],
      cableEntryHoles:  ['', Validators.required],
      provisionVoltage:  ['', Validators.required],
      provisionOverload:  ['', Validators.required],
      correctTypeLamps:  ['', Validators.required],
      insulaDisplacementBox:  ['', Validators.required],
      overheatSurrounding:  ['', Validators.required],
      overheatConductors:  ['', Validators.required]
      });
   
    this.refresh();
  }

 
  get f() {
    return this.addstep3.controls;
  }

 
  refresh() {
    this.ChangeDetectorRef.detectChanges();
  }
  
  gotoNextModal(content3: any) {
    this.modalService.open(content3, { centered: true})
  }
 
  nextTab3()
  {
    //this.f;
    this.inspectionDetails.siteId=this.service.siteCount;
    this.inspectionDetails.userName=this.email;
    this.submitted = true;
    // if(this.addstep3.invalid) {
    //     return;
    //   }
  console.log(this.inspectionDetails);
  this.inspectionDetailsService.addInspectionDetails(this.inspectionDetails).subscribe(
    (    data: any)=> {
      console.log("worked");
      this.proceedNext.emit(true); 
        this.success=true
        this.successMsg="Step2 successfully saved";
        // alert("Step2 successfully saved");
    },
    (    error: any) => {
      console.log("error");
      this.proceedNext.emit(false); 
      this.Error=true;
        // alert("Something went wrong, kindly check all the fields");  
        this.errorMsg="Something went wrong, kindly check all the fields";
    }
    )
  }
}
