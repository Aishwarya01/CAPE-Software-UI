import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InspectiondetailsService } from '../services/inspectiondetails.service';
import { InspectionDetails } from '../model/inspection-details';
import { GlobalsService } from '../globals.service';
import { of } from 'rxjs';
import { SiteService } from '../services/site.service';
import { InspectionVerificationService } from '../services/inspection-verification.service';

@Component({
  selector: 'app-inspection-verification-incoming-equipment',
  templateUrl: './inspection-verification-incoming-equipment.component.html',
  styleUrls: ['./inspection-verification-incoming-equipment.component.css'],
})
export class InspectionVerificationIncomingEquipmentComponent
  implements OnInit
{
  submitted = false;
  locationList: any = [];

  @Output() proceedNext = new EventEmitter<any>();
  @Output() callTesting = new EventEmitter<any>();

  addstep3!: FormGroup;

  i: any;
  j: any;
  loclength: any;

  inActiveData: any = [];
  email: String = '';
  showField1: boolean = true;
  showField2: boolean = false;

  inspectionDetails = new InspectionDetails();
  validationError: boolean = false;
  validationErrorMsg: String = '';
  disable: boolean = false;

  // Second Tab dependencies
  panelOpenState = false;
  InspectionList: String[] = ['Yes', 'No', 'Not Applicable'];

  successMsg: string = '';
  errorMsg: string = '';
  success: boolean = false;
  Error: boolean = false;
  incomingArr!: FormArray;
  arr: any = [];

  formBuilder: any;
  validate: boolean = false;
  testingForm: any;
  step3List: any = [];
  flag: boolean=false;


  @Output() testing = new EventEmitter<any>();

  constructor(
    private _formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private modalService: NgbModal,
    private inspectionDetailsService: InspectiondetailsService,
    public service: GlobalsService,
    private ChangeDetectorRef: ChangeDetectorRef,
    private siteService: SiteService,
    private UpateInspectionService: InspectionVerificationService,

  ) {
    this.email = this.router.snapshot.paramMap.get('email') || '{}';
  }

  ngOnInit(): void {
    this.addstep3 = this._formBuilder.group({
      incomingArr: this._formBuilder.array([this.createItem()]),
    });

    this.refresh();
  }

  retrieveDetailsfromSavedReports(userName: any,siteId: any,clientName: any,departmentName: any,site: any){ 
    this.siteService.retrieveFinal(userName,siteId).subscribe(
      data=> {
        this.step3List = JSON.parse(data);
        this.inspectionDetails.siteId = siteId;
        this.inspectionDetails.periodicInspectionId = this.step3List.periodicInspection.periodicInspectionId;
        this.inspectionDetails.createdBy = this.step3List.periodicInspection.createdBy;
        this.inspectionDetails.createdDate  = this.step3List.periodicInspection.createdDate;

        this.flag = true;
        this.populateData();
      },
      error => {
      });
  }

  populateData() {
    for (let item of this.step3List.periodicInspection.ipaoInspection) {
      this.arr.push(this.createGroup(item));
      
    }
    this.addstep3.setControl('incomingArr', this._formBuilder.array(this.arr || []))
  }

  createGroup(item: any): FormGroup {
    return this._formBuilder.group({
      ipaoInspectionId: new FormControl({disabled: false,value: item.ipaoInspectionId}),
      locationName: new FormControl({disabled: false,value: item.locationName}),
      locationNumber: new FormControl({disabled: false,value: item.locationNumber}),
      serviceCable: new FormControl({disabled: false,value: item.serviceCable}),
      serviceFuse: new FormControl({disabled: false,value: item.serviceFuse}),
      meterDistributor: new FormControl({disabled: false,value: item.meterDistributor}),
      meterConsumer: new FormControl({disabled: false,value: item.meterConsumer}),
      meterEqu: new FormControl({disabled: false,value: item.meterEqu}),
      isolator: new FormControl({disabled: false,value: item.isolator}),

      earthingArrangement: new FormControl({disabled: false,value: item.earthingArrangement}),
      adequateArrangement: new FormControl({disabled: false,value: item.adequateArrangement}),
      connectionGenerator: new FormControl({disabled: false,value: item.connectionGenerator}),
      compatibilityCharacteristics: new FormControl({disabled: false,value: item.compatibilityCharacteristics}),
      automaticDisconnectGenerator: new FormControl({disabled: false,value: item.automaticDisconnectGenerator}),
      preventConnectGenerator: new FormControl({disabled: false,value: item.preventConnectGenerator}),
      isolateGenerator: new FormControl({disabled: false,value: item.isolateGenerator}),

      mainEarting: new FormControl({disabled: false,value: item.mainEarting}),
      earthElectordeArrangement: new FormControl({disabled: false,value: item.earthElectordeArrangement}),
      earthConductorConnection: new FormControl({disabled: false,value: item.earthConductorConnection}),
      accessibility: new FormControl({disabled: false,value: item.accessibility}),
      aainProtectBonding: new FormControl({disabled: false,value: item.aainProtectBonding}),
      allProtectBonding: new FormControl({disabled: false,value: item.allProtectBonding}),
      allAppropriateLocation: new FormControl({disabled: false,value: item.allAppropriateLocation}),
      felvRequirement: new FormControl({disabled: false,value: item.felvRequirement}),

      selvSystem: new FormControl({disabled: false,value: item.selvSystem}),
      pelvSystem: new FormControl({disabled: false,value: item.pelvSystem}),
      doubleInsulation: new FormControl({disabled: false,value: item.doubleInsulation}),
      reinforcedInsulation: new FormControl({disabled: false,value: item.reinforcedInsulation}),
      basicElectricalSepartion: new FormControl({disabled: false,value: item.basicElectricalSepartion}),
      insulationLiveParts: new FormControl({disabled: false,value: item.insulationLiveParts}),
      barriersEnclosers: new FormControl({disabled: false,value: item.barriersEnclosers}),
      obstacles: new FormControl({disabled: false,value: item.obstacles}),
      placingOutReach: new FormControl({disabled: false,value: item.placingOutReach}),
      nonConductLocation: new FormControl({disabled: false,value: item.nonConductLocation}),
      faultElectricalSepartion: new FormControl({disabled: false,value: item.faultElectricalSepartion}),
     // faultNonConductLocation: new FormControl({disabled: false,value: item.faultNonConductLocation}),
      operatingCurrent: new FormControl({disabled: false,value: item.operatingCurrent}),
      supplementaryBonding: new FormControl({disabled: false,value: item.supplementaryBonding}),
      consumerUnit: this._formBuilder.array([this.populateEarthingForm(item.consumerUnit)]),
      circuit: this._formBuilder.array([this.populateCircuitForm(item.circuit)]),
      isolationCurrent: this._formBuilder.array([
        this.populateIsolationCurrentForm(item.isolationCurrent),
      ]),
    });
  }

  private populateEarthingForm(itemvalue: any): FormGroup {
    return new FormGroup({
      consumerId: new FormControl({disabled: false,value: itemvalue[0]['consumerId']}),
      accessWorking: new FormControl({disabled: false,value: itemvalue[0]['accessWorking']}),
      securityFixing: new FormControl({disabled: false,value: itemvalue[0]['securityFixing']}),
      livePartsDamage: new FormControl({disabled: false,value: itemvalue[0]['livePartsDamage']}),
      securityBarriers: new FormControl({disabled: false,value: itemvalue[0]['securityBarriers']}),
      suitabilityEnclosure: new FormControl({disabled: false,value: itemvalue[0]['suitabilityEnclosure']}),
      enclosureDamaged: new FormControl({disabled: false,value: itemvalue[0]['enclosureDamaged']}),
      presenceObstacles: new FormControl({disabled: false,value: itemvalue[0]['presenceObstacles']}),
      placingOutOfConsumer: new FormControl({disabled: false,value: itemvalue[0]['placingOutOfConsumer']}),
      presenceMainSwitches: new FormControl({disabled: false,value: itemvalue[0]['presenceMainSwitches']}),
      operationMainSwitches: new FormControl({disabled: false,value: itemvalue[0]['operationMainSwitches']}),
      manualCircuitBreakers: new FormControl({disabled: false,value: itemvalue[0]['manualCircuitBreakers']}),
      switchCausesRcd: new FormControl({disabled: false,value: itemvalue[0]['switchCausesRcd']}),
      rcdFaultProtection: new FormControl({disabled: false,value: itemvalue[0]['rcdFaultProtection']}),
      rcdAdditionalProtection: new FormControl({disabled: false,value: itemvalue[0]['rcdAdditionalProtection']}),
      overVoltageProtection: new FormControl({disabled: false,value: itemvalue[0]['overVoltageProtection']}),
      indicationOfSpd: new FormControl({disabled: false,value: itemvalue[0]['indicationOfSpd']}),
      rcdQuarterlyTest: new FormControl({disabled: false,value: itemvalue[0]['rcdQuarterlyTest']}),
      diagramsCharts: new FormControl({disabled: false,value: itemvalue[0]['diagramsCharts']}),
      nonstandardCableColour: new FormControl({disabled: false,value: itemvalue[0]['nonstandardCableColour']}),
      alSupplyOfOrign: new FormControl({disabled: false,value: itemvalue[0]['alSupplyOfOrign']}),
      alSupplyOfMeter: new FormControl({disabled: false,value: itemvalue[0]['alSupplyOfMeter']}),
      alSupplyDistribution: new FormControl({disabled: false,value: itemvalue[0]['alSupplyDistribution']}),
      allPointsIsolation: new FormControl({disabled: false,value: itemvalue[0]['allPointsIsolation']}),
      nextInspection: new FormControl({disabled: false,value: itemvalue[0]['nextInspection']}),
      otherRequiredLabelling: new FormControl({disabled: false,value: itemvalue[0]['otherRequiredLabelling']}),
      basesCorrectType: new FormControl({disabled: false,value: itemvalue[0]['basesCorrectType']}),
      singlePole: new FormControl({disabled: false,value: itemvalue[0]['singlePole']}),
      mechanicalDamage: new FormControl({disabled: false,value: itemvalue[0]['mechanicalDamage']}),
      electromagnetic: new FormControl({disabled: false,value: itemvalue[0]['electromagnetic']}),
      allConductorCon: new FormControl({disabled: false,value: itemvalue[0]['allConductorCon']}),
    });
  }

  private populateCircuitForm(itemvalue: any): FormGroup {
    return new FormGroup({
      circuitId: new FormControl({disabled: false,value: itemvalue[0]['circuitId']}),
      identificationConductors: new FormControl({disabled: false,value: itemvalue[0]['identificationConductors']}),
      cableInstallation: new FormControl({disabled: false,value: itemvalue[0]['cableInstallation']}),
      examinationCables: new FormControl({disabled: false,value: itemvalue[0]['examinationCables']}),
      examinationInsulation: new FormControl({disabled: false,value: itemvalue[0]['examinationInsulation']}),
      nonSheathedCables: new FormControl({disabled: false,value: itemvalue[0]['nonSheathedCables']}),
      containmentSystems: new FormControl({disabled: false,value: itemvalue[0]['containmentSystems']}),
      temperatureRating: new FormControl({disabled: false,value: itemvalue[0]['temperatureRating']}),
      cablesTerminated: new FormControl({disabled: false,value: itemvalue[0]['cablesTerminated']}),
      currentCarryCapacity: new FormControl({disabled: false,value: itemvalue[0]['currentCarryCapacity']}),
      adequacyProtectDevices: new FormControl({disabled: false,value: itemvalue[0]['adequacyProtectDevices']}),
      presenceProtectConductors: new FormControl({disabled: false,value: itemvalue[0]['presenceProtectConductors']}),
      coOrdination: new FormControl({disabled: false,value: itemvalue[0]['coOrdination']}),
      wiringSystems: new FormControl({disabled: false,value: itemvalue[0]['wiringSystems']}),
      cablesConcealUnderFloors: new FormControl({disabled: false,value: itemvalue[0]['cablesConcealUnderFloors']}),
      provisionFireBarriers: new FormControl({disabled: false,value: itemvalue[0]['provisionFireBarriers']}),
      sectionsRegardlessDepth: new FormControl({disabled: false,value: itemvalue[0]['sectionsRegardlessDepth']}),
      cablesConcDepth: new FormControl({disabled: false,value: itemvalue[0]['cablesConcDepth']}),
      operatingCurrentSocket: new FormControl({disabled: false,value: itemvalue[0]['operatingCurrentSocket']}),
      operatingCurrentCircuits: new FormControl({disabled: false,value: itemvalue[0]['operatingCurrentCircuits']}),
      separationBand: new FormControl({disabled: false,value: itemvalue[0]['separationBand']}),
      separationElectrical: new FormControl({disabled: false,value: itemvalue[0]['separationElectrical']}),
      conditionCircuitAccessories: new FormControl({disabled: false,value: itemvalue[0]['conditionCircuitAccessories']}),
      conductorCorrectTerminated: new FormControl({disabled: false,value: itemvalue[0]['conductorCorrectTerminated']}),
      conductorVisibleOutside: new FormControl({disabled: false,value: itemvalue[0]['conductorVisibleOutside']}),
      connLiveConductors: new FormControl({disabled: false,value: itemvalue[0]['connLiveConductors']}),
      adequatelyConnectedEnclosure: new FormControl({disabled: false,value: itemvalue[0]['adequatelyConnectedEnclosure']}),
      suitabilityCircuitAccessories: new FormControl({disabled: false,value: itemvalue[0]['suitabilityCircuitAccessories']}),
      conditionAccessories: new FormControl({disabled: false,value: itemvalue[0]['conditionAccessories']}),
      singlePoleDevices: new FormControl({disabled: false,value: itemvalue[0]['singlePoleDevices']}),
      adequacyConnections: new FormControl({disabled: false,value: itemvalue[0]['adequacyConnections']}),
      isolationSwitching: new FormControl({disabled: false,value: itemvalue[0]['isolationSwitching']}),
    });
  }

  private populateIsolationCurrentForm(itemvalue: any): FormGroup {
    return new FormGroup({
      isolationCurrentId: new FormControl({disabled: false,value: itemvalue[0]['isolationCurrentId']}),
      presenceDevices: new FormControl({disabled: false,value: itemvalue[0]['presenceDevices']}),
      conditionDevices: new FormControl({disabled: false,value: itemvalue[0]['conditionDevices']}),
      locationDevices: new FormControl({disabled: false,value: itemvalue[0]['locationDevices']}),
      capableSecured: new FormControl({disabled: false,value: itemvalue[0]['capableSecured']}),
      operationVerify: new FormControl({disabled: false,value: itemvalue[0]['operationVerify']}),
      installCircuit: new FormControl({disabled: false,value: itemvalue[0]['installCircuit']}),
      warningLabel: new FormControl({disabled: false,value: itemvalue[0]['warningLabel']}),
      swPresenceDevices: new FormControl({disabled: false,value: itemvalue[0]['swPresenceDevices']}),
      swConditionDevices: new FormControl({disabled: false,value: itemvalue[0]['swConditionDevices']}),
      swAcceptableLocation: new FormControl({disabled: false,value: itemvalue[0]['swAcceptableLocation']}),
      swCapableOffPosition: new FormControl({disabled: false,value: itemvalue[0]['swCapableOffPosition']}),
      swCorrectOperation: new FormControl({disabled: false,value: itemvalue[0]['swCorrectOperation']}),
      swCircuit: new FormControl({disabled: false,value: itemvalue[0]['swCircuit']}),
      swWarningLabel: new FormControl({disabled: false,value: itemvalue[0]['swWarningLabel']}),
      emSwitPresenceDevices: new FormControl({disabled: false,value: itemvalue[0]['emSwitPresenceDevices']}),
      emSwitConditionDevices: new FormControl({disabled: false,value: itemvalue[0]['emSwitConditionDevices']}),
      emSwitLocationDevices: new FormControl({disabled: false,value: itemvalue[0]['emSwitLocationDevices']}),
      emSwitOperationVerify: new FormControl({disabled: false,value: itemvalue[0]['emSwitOperationVerify']}),
      emSwitInstallCircuit: new FormControl({disabled: false,value: itemvalue[0]['emSwitInstallCircuit']}),
      fuSwitPresenceDevices: new FormControl({disabled: false,value: itemvalue[0]['fuSwitPresenceDevices']}),
      fuSwitLocationDevices: new FormControl({disabled: false,value: itemvalue[0]['fuSwitLocationDevices']}),
      fuSwitOperationVerify: new FormControl({disabled: false,value: itemvalue[0]['fuSwitOperationVerify']}),

      suitabilityEquipment: new FormControl({disabled: false,value: itemvalue[0]['suitabilityEquipment']}),
      enclosureNotDamaged: new FormControl({disabled: false,value: itemvalue[0]['enclosureNotDamaged']}),
      suitabilityEnvironment: new FormControl({disabled: false,value: itemvalue[0]['suitabilityEnvironment']}),
      securityFixing: new FormControl({disabled: false,value: itemvalue[0]['securityFixing']}),
      cableEntryHoles: new FormControl({disabled: false,value: itemvalue[0]['cableEntryHoles']}),
      provisionVoltage: new FormControl({disabled: false,value: itemvalue[0]['provisionVoltage']}),
      provisionOverload: new FormControl({disabled: false,value: itemvalue[0]['provisionOverload']}),
      correctTypeLamps: new FormControl({disabled: false,value: itemvalue[0]['correctTypeLamps']}),
      insulaDisplacementBox: new FormControl({disabled: false,value: itemvalue[0]['insulaDisplacementBox']}),
      overheatSurrounding: new FormControl({disabled: false,value: itemvalue[0]['overheatSurrounding']}),
      overheatConductors: new FormControl({disabled: false,value: itemvalue[0]['overheatConductors']}),
    });
  }


  getearthingControls(form: any) {
    return form.controls.consumerUnit.controls;
  }
  private createEarthingForm(): FormGroup {
    return new FormGroup({
      accessWorking: new FormControl('', [Validators.required]),
      securityFixing: new FormControl('', [Validators.required]),
      livePartsDamage: new FormControl('', [Validators.required]),
      securityBarriers: new FormControl('', [Validators.required]),
      suitabilityEnclosure: new FormControl('', [Validators.required]),
      enclosureDamaged: new FormControl('', [Validators.required]),
      presenceObstacles: new FormControl('', [Validators.required]),
      placingOutOfConsumer: new FormControl('', [Validators.required]),
      presenceMainSwitches: new FormControl('', [Validators.required]),
      operationMainSwitches: new FormControl('', [Validators.required]),
      manualCircuitBreakers: new FormControl('', [Validators.required]),
      switchCausesRcd: new FormControl('', [Validators.required]),
      rcdFaultProtection: new FormControl('', [Validators.required]),
      rcdAdditionalProtection: new FormControl('', [Validators.required]),
      overVoltageProtection: new FormControl('', [Validators.required]),
      indicationOfSpd: new FormControl('', [Validators.required]),
      rcdQuarterlyTest: new FormControl('', [Validators.required]),
      diagramsCharts: new FormControl('', [Validators.required]),
      nonstandardCableColour: new FormControl('', [Validators.required]),
      alSupplyOfOrign: new FormControl('', [Validators.required]),
      alSupplyOfMeter: new FormControl('', [Validators.required]),
      alSupplyDistribution: new FormControl('', [Validators.required]),
      allPointsIsolation: new FormControl('', [Validators.required]),
      nextInspection: new FormControl('', [Validators.required]),
      otherRequiredLabelling: new FormControl('', [Validators.required]),
      basesCorrectType: new FormControl('', [Validators.required]),
      singlePole: new FormControl('', [Validators.required]),
      mechanicalDamage: new FormControl('', [Validators.required]),
      electromagnetic: new FormControl('', [Validators.required]),
      allConductorCon: new FormControl('', [Validators.required]),
    });
  }
  getcircuitControls(form: any) {
    return form.controls.circuit.controls;
  }
  private createcircuitForm(): FormGroup {
    return new FormGroup({
      identificationConductors: new FormControl('', [Validators.required]),
      cableInstallation: new FormControl('', [Validators.required]),
      examinationCables: new FormControl('', [Validators.required]),
      examinationInsulation: new FormControl('', [Validators.required]),
      nonSheathedCables: new FormControl('', [Validators.required]),
      containmentSystems: new FormControl('', [Validators.required]),
      temperatureRating: new FormControl('', [Validators.required]),
      cablesTerminated: new FormControl('', [Validators.required]),
      currentCarryCapacity: new FormControl('', [Validators.required]),
      adequacyProtectDevices: new FormControl('', [Validators.required]),
      presenceProtectConductors: new FormControl('', [Validators.required]),
      coOrdination: new FormControl('', [Validators.required]),
      wiringSystems: new FormControl('', [Validators.required]),
      cablesConcealUnderFloors: new FormControl('', [Validators.required]),
      provisionFireBarriers: new FormControl('', [Validators.required]),
      sectionsRegardlessDepth: new FormControl('', [Validators.required]),
      cablesConcDepth: new FormControl('', [Validators.required]),
      operatingCurrentSocket: new FormControl('', [Validators.required]),
      operatingCurrentCircuits: new FormControl('', [Validators.required]),
      separationBand: new FormControl('', [Validators.required]),
      separationElectrical: new FormControl('', [Validators.required]),
      conditionCircuitAccessories: new FormControl('', [Validators.required]),
      conductorCorrectTerminated: new FormControl('', [Validators.required]),
      conductorVisibleOutside: new FormControl('', [Validators.required]),
      connLiveConductors: new FormControl('', [Validators.required]),
      adequatelyConnectedEnclosure: new FormControl('', [Validators.required]),
      suitabilityCircuitAccessories: new FormControl('', [Validators.required]),
      conditionAccessories: new FormControl('', [Validators.required]),
      singlePoleDevices: new FormControl('', [Validators.required]),
      adequacyConnections: new FormControl('', [Validators.required]),
      isolationSwitching: new FormControl('', [Validators.required]),
    });
  }

  getisolationCurrentControls(form: any) {
    return form.controls.isolationCurrent.controls;
  }
  private createisolationCurrentForm(): FormGroup {
    return new FormGroup({
      presenceDevices: new FormControl('', [Validators.required]),
      conditionDevices: new FormControl('', [Validators.required]),
      locationDevices: new FormControl('', [Validators.required]),
      capableSecured: new FormControl('', [Validators.required]),
      operationVerify: new FormControl('', [Validators.required]),
      installCircuit: new FormControl('', [Validators.required]),
      warningLabel: new FormControl('', [Validators.required]),
      swPresenceDevices: new FormControl('', [Validators.required]),
      swConditionDevices: new FormControl('', [Validators.required]),
      swAcceptableLocation: new FormControl('', [Validators.required]),
      swCapableOffPosition: new FormControl('', [Validators.required]),
      swCorrectOperation: new FormControl('', [Validators.required]),
      swCircuit: new FormControl('', [Validators.required]),
      swWarningLabel: new FormControl('', [Validators.required]),
      emSwitPresenceDevices: new FormControl('', [Validators.required]),
      emSwitConditionDevices: new FormControl('', [Validators.required]),
      emSwitLocationDevices: new FormControl('', [Validators.required]),
      emSwitOperationVerify: new FormControl('', [Validators.required]),
      emSwitInstallCircuit: new FormControl('', [Validators.required]),
      fuSwitPresenceDevices: new FormControl('', [Validators.required]),
      fuSwitLocationDevices: new FormControl('', [Validators.required]),
      fuSwitOperationVerify: new FormControl('', [Validators.required]),

      suitabilityEquipment: new FormControl('', [Validators.required]),
      enclosureNotDamaged: new FormControl('', [Validators.required]),
      suitabilityEnvironment: new FormControl('', [Validators.required]),
      securityFixing: new FormControl('', [Validators.required]),
      cableEntryHoles: new FormControl('', [Validators.required]),
      provisionVoltage: new FormControl('', [Validators.required]),
      provisionOverload: new FormControl('', [Validators.required]),
      correctTypeLamps: new FormControl('', [Validators.required]),
      insulaDisplacementBox: new FormControl('', [Validators.required]),
      overheatSurrounding: new FormControl('', [Validators.required]),
      overheatConductors: new FormControl('', [Validators.required]),
    });
  }
  get f() {
    return this.addstep3.controls;
  }
  addItem() {
    this.incomingArr = this.addstep3.get('incomingArr') as FormArray;
    this.incomingArr.push(this.createItem());
  }

  getIncomingControls(): AbstractControl[] {
    return (<FormArray>this.addstep3.get('incomingArr')).controls;
  }

  // populateData() {
  //   for (let item of this.sitePersons) {
  //     this.arr.push(this.createGroup(item));
  //   }
  //   this.updateSiteForm.setControl('arr', this.formBuilder.array(this.arr || []))
  // }

  // createGroup(item: any): FormGroup {
  //   return this.formBuilder.group({
  //     personIncharge: new FormControl({disabled: true ,value: item.personIncharge}),
  //     designation: new FormControl({disabled: true, value: item.designation}),
  //     contactNo: new FormControl({disabled: true ,value: item.contactNo}),
  //     personInchargeEmail: new FormControl({disabled: true,value: item.personInchargeEmail}),
  //     personId: new FormControl({disabled: true ,value: item.personId}),
  //     inActive: new FormControl({disabled: true, value:item.inActive}),
  //     // countryCode: new FormControl(''),

  //   });
  // }

  createItem() {
    return this._formBuilder.group({
      locationName: new FormControl('', [Validators.required]),
      locationNumber: new FormControl('', [Validators.required]),
      serviceCable: new FormControl('', [Validators.required]),
      serviceFuse: new FormControl('', [Validators.required]),
      meterDistributor: new FormControl('', [Validators.required]),
      meterConsumer: new FormControl('', [Validators.required]),
      meterEqu: new FormControl('', [Validators.required]),
      isolator: new FormControl('', [Validators.required]),

      earthingArrangement: new FormControl('', [Validators.required]),
      adequateArrangement: new FormControl('', [Validators.required]),
      connectionGenerator: new FormControl('', [Validators.required]),
      compatibilityCharacteristics: new FormControl('', [Validators.required]),
      automaticDisconnectGenerator: new FormControl('', [Validators.required]),
      preventConnectGenerator: new FormControl('', [Validators.required]),
      isolateGenerator: new FormControl('', [Validators.required]),

      mainEarting: new FormControl('', [Validators.required]),
      earthElectordeArrangement: new FormControl('', [Validators.required]),
      earthConductorConnection: new FormControl('', [Validators.required]),
      accessibility: new FormControl('', [Validators.required]),
      aainProtectBonding: new FormControl('', [Validators.required]),
      allProtectBonding: new FormControl('', [Validators.required]),
      allAppropriateLocation: new FormControl('', [Validators.required]),
      felvRequirement: new FormControl('', [Validators.required]),

      selvSystem: new FormControl('', [Validators.required]),
      pelvSystem: new FormControl('', [Validators.required]),
      doubleInsulation: new FormControl('', [Validators.required]),
      reinforcedInsulation: new FormControl('', [Validators.required]),
      basicElectricalSepartion: new FormControl('', [Validators.required]),
      insulationLiveParts: new FormControl('', [Validators.required]),
      barriersEnclosers: new FormControl('', [Validators.required]),
      obstacles: new FormControl('', [Validators.required]),
      placingOutReach: new FormControl('', [Validators.required]),
      nonConductLocation: new FormControl('', [Validators.required]),
      faultElectricalSepartion: new FormControl('', [Validators.required]),
      //faultNonConductLocation: new FormControl('', [Validators.required]),
      operatingCurrent: new FormControl('', [Validators.required]),
      supplementaryBonding: new FormControl('', [Validators.required]),

      consumerUnit: this._formBuilder.array([this.createEarthingForm()]),
      circuit: this._formBuilder.array([this.createcircuitForm()]),
      isolationCurrent: this._formBuilder.array([
        this.createisolationCurrentForm(),
      ]),
    });
  }

  refresh() {
    this.ChangeDetectorRef.detectChanges();
  }
  removeItem(index: any) {
    (this.addstep3.get('incomingArr') as FormArray).removeAt(index);
  }
  gotoNextModal(content3: any) {
    if (this.addstep3.invalid) {
      this.validationError = true;
      this.validationErrorMsg = 'Please check all the fields';
      setTimeout(() => {
        this.validationError = false;
      }, 3000);
      return;
    }
    this.modalService.open(content3, { centered: true });
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
  nextTab3(flag: any) {
    if(!flag) {
      this.inspectionDetails.siteId = this.service.siteCount;
    }
    this.incomingArr = this.addstep3.get('incomingArr') as FormArray;
    this.inspectionDetails.userName = this.email;
    this.submitted = true;
    if (this.addstep3.invalid) {
      return;
    }
    this.service.iterationList = this.incomingArr.value;
    this.inspectionDetails.ipaoInspection = this.addstep3.value.incomingArr;

    if(flag) {
      this.UpateInspectionService.updateIncoming(this.inspectionDetails).subscribe(
        (data) => {
          console.log("success");
        },
        (error) => {
          console.log("error");
        });
    }
    else {
      this.inspectionDetailsService
      .addInspectionDetails(this.inspectionDetails)
      .subscribe(
        (data: any) => {
          this.proceedNext.emit(true);
          this.success = true;
          this.successMsg = 'Incoming Equipment Successfully Saved';

          this.disable = true;
        },
        (error: any) => {
          this.proceedNext.emit(false);
          this.Error = true;
          this.errorMsg = 'Something went wrong, kindly check all the fields';
        });
    }
  }
}