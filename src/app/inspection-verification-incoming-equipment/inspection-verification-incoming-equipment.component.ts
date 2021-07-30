import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {​​​ NgbModal }​​​ from'@ng-bootstrap/ng-bootstrap';
import { InspectiondetailsService } from '../services/inspectiondetails.service';
import { InspectionDetails } from '../model/inspection-details';
import { GlobalsService } from '../globals.service';
import { of } from 'rxjs';
import { InspectionVerificationTestingComponent } from '../inspection-verification-testing/inspection-verification-testing.component';

@Component({
  selector: 'app-inspection-verification-incoming-equipment',
  templateUrl: './inspection-verification-incoming-equipment.component.html',
  styleUrls: ['./inspection-verification-incoming-equipment.component.css']
})
export class InspectionVerificationIncomingEquipmentComponent implements OnInit {

  submitted = false;
  locationList: any = [];

  @Output() proceedNext = new EventEmitter<any>(); 
  @Output() callTesting = new EventEmitter<any>();
  
  addstep3!: FormGroup;

  i:any;
  j:any;
  loclength: any;

  inActiveData: any =[];
  email: String = '';
  showField1: boolean= true;
  showField2: boolean= false;

  inspectionDetails =new InspectionDetails;
  validationError: boolean =false;
  validationErrorMsg: String ="";
  disable: boolean = false;

  // Second Tab dependencies
  panelOpenState = false;
  InspectionList: String[]=['Yes', 'No', 'Not Applicable'];

  successMsg: string="";	
  errorMsg: string="";
  success: boolean=false;	
  Error: boolean=false;
  incomingArr!: FormArray;

  formBuilder: any;
  validate: boolean=false;
  testingForm: any;

  @Output() testing = new EventEmitter<any>();

   constructor(private _formBuilder: FormBuilder,
    private router: ActivatedRoute, private modalService: NgbModal,
    private inspectionDetailsService: InspectiondetailsService,public service: GlobalsService,
    private ChangeDetectorRef: ChangeDetectorRef,) {
    this.email = this.router.snapshot.paramMap.get('email') || '{}'
  }

  ngOnInit(): void {
    this.addstep3 = this._formBuilder.group({
      incomingArr: this._formBuilder.array([this.createItem()])
      });
      
    this.refresh();
  }
  
  getearthingControls(form:any) { 
    return form.controls.consumerUnit.controls
  } 
  private createEarthingForm(): FormGroup {
    return new FormGroup({
      accessWorking:  new FormControl('',[Validators.required]),
      securityFixing:  new FormControl('',[Validators.required]),
      livePartsDamage:  new FormControl('',[Validators.required]),
      securityBarriers:  new FormControl('',[Validators.required]),
      suitabilityEnclosure:  new FormControl('',[Validators.required]),
      enclosureDamaged:  new FormControl('',[Validators.required]),
      presenceObstacles:  new FormControl('',[Validators.required]),
      placingOutReach:  new FormControl('',[Validators.required]),
      presenceMainSwitches:  new FormControl('',[Validators.required]),
      operationMainSwitches:  new FormControl('',[Validators.required]),
      manualCircuitBreakers:  new FormControl('',[Validators.required]),
      switchCausesRcd:  new FormControl('',[Validators.required]),
      rcdFaultProtection:  new FormControl('',[Validators.required]),
      rcdAdditionalProtection:  new FormControl('',[Validators.required]),
      overVoltageProtection:  new FormControl('',[Validators.required]),
      indicationOfSpd:  new FormControl('',[Validators.required]),
      rcdQuarterlyTest:  new FormControl('',[Validators.required]),
      diagramsCharts:  new FormControl('',[Validators.required]),
      nonstandardCableColour:  new FormControl('',[Validators.required]),
      alSupplyOfOrign:  new FormControl('',[Validators.required]),
      alSupplyOfMeter:  new FormControl('',[Validators.required]),
      alSupplyDistribution:  new FormControl('',[Validators.required]),
      allPointsIsolation:  new FormControl('',[Validators.required]),
      nextInspection:  new FormControl('',[Validators.required]),
      otherRequiredLabelling:  new FormControl('',[Validators.required]),
      basesCorrectType:  new FormControl('',[Validators.required]),
      singlePole:  new FormControl('',[Validators.required]),
      mechanicalDamage:  new FormControl('',[Validators.required]),
      electromagnetic:  new FormControl('',[Validators.required]),
      allConductorCon:  new FormControl('',[Validators.required])
    })
  }
  getcircuitControls(form:any) { 
    return form.controls.circuit.controls
  } 
  private createcircuitForm(): FormGroup {
    return new FormGroup({
      identificationConductors:  new FormControl('',[Validators.required]),
      cableInstallation:  new FormControl('',[Validators.required]),
      examinationCables:  new FormControl('',[Validators.required]),
      examinationInsulation:  new FormControl('',[Validators.required]),
      nonSheathedCables:  new FormControl('',[Validators.required]),
      containmentSystems:  new FormControl('',[Validators.required]),
      temperatureRating:  new FormControl('',[Validators.required]),
      cablesTerminated:  new FormControl('',[Validators.required]),
      currentCarryCapacity:  new FormControl('',[Validators.required]),
      adequacyProtectDevices:  new FormControl('',[Validators.required]),
      presenceProtectConductors:  new FormControl('',[Validators.required]),
      coOrdination:  new FormControl('',[Validators.required]),
      wiringSystems:  new FormControl('',[Validators.required]),
      cablesConcealUnderFloors:  new FormControl('',[Validators.required]),
      provisionFireBarriers:  new FormControl('',[Validators.required]),
      sectionsRegardlessDepth:  new FormControl('',[Validators.required]),
      cablesConcDepth:  new FormControl('',[Validators.required]),
      operatingCurrentSocket:  new FormControl('',[Validators.required]),
      operatingCurrentCircuits:  new FormControl('',[Validators.required]),
      separationBand:  new FormControl('',[Validators.required]),
      separationElectrical:  new FormControl('',[Validators.required]),
      conditionCircuitAccessories:  new FormControl('',[Validators.required]),
      conductorCorrectTerminated:  new FormControl('',[Validators.required]),
      conductorVisibleOutside:  new FormControl('',[Validators.required]),
      connLiveConductors:  new FormControl('',[Validators.required]),
      adequatelyConnectedEnclosure:  new FormControl('',[Validators.required]),
      suitabilityCircuitAccessories:  new FormControl('',[Validators.required]),
      conditionAccessories:  new FormControl('',[Validators.required]),
      singlePoleDevices:  new FormControl('',[Validators.required]),
      adequacyConnections:  new FormControl('',[Validators.required]),
      isolationSwitching:  new FormControl('',[Validators.required])
    })
  }

  getisolationCurrentControls(form:any){ 
    return form.controls.isolationCurrent.controls
  } 
  private createisolationCurrentForm(): FormGroup {
    return new FormGroup({
      presenceDevices:  new FormControl('',[Validators.required]),
      conditionDevices:  new FormControl('',[Validators.required]),
      locationDevices:  new FormControl('',[Validators.required]),
      capableSecured:  new FormControl('',[Validators.required]),
      operationVerify:  new FormControl('',[Validators.required]),
      installCircuit:  new FormControl('',[Validators.required]),
      warningLabel:  new FormControl('',[Validators.required]),
      swPresenceDevices:  new FormControl('',[Validators.required]),
      swConditionDevices:  new FormControl('',[Validators.required]),
      swAcceptableLocation:  new FormControl('',[Validators.required]),
      swCapableOffPosition:  new FormControl('',[Validators.required]),
      swCorrectOperation:  new FormControl('',[Validators.required]),
      swCircuit:  new FormControl('',[Validators.required]),
      swWarningLabel:  new FormControl('',[Validators.required]),
      emSwitPresenceDevices:  new FormControl('',[Validators.required]),
      emSwitConditionDevices:  new FormControl('',[Validators.required]),
      emSwitLocationDevices:  new FormControl('',[Validators.required]),
      emSwitOperationVerify:  new FormControl('',[Validators.required]),
      emSwitInstallCircuit:  new FormControl('',[Validators.required]),
      fuSwitPresenceDevices:  new FormControl('',[Validators.required]),
      fuSwitLocationDevices:  new FormControl('',[Validators.required]),
      fuSwitOperationVerify:  new FormControl('',[Validators.required]),
  
      suitabilityEquipment:  new FormControl('',[Validators.required]),
      enclosureNotDamaged:  new FormControl('',[Validators.required]),
      suitabilityEnvironment:  new FormControl('',[Validators.required]),
      securityFixing:  new FormControl('',[Validators.required]),
      cableEntryHoles:  new FormControl('',[Validators.required]),
      provisionVoltage:  new FormControl('',[Validators.required]),
      provisionOverload:  new FormControl('',[Validators.required]),
      correctTypeLamps:  new FormControl('',[Validators.required]),
      insulaDisplacementBox:  new FormControl('',[Validators.required]),
      overheatSurrounding:  new FormControl('',[Validators.required]),
      overheatConductors:  new FormControl('',[Validators.required])
    })
  }
  get f() {
    return this.addstep3.controls;
  }
  addItem() {
    this.incomingArr = this.addstep3.get('incomingArr') as FormArray;
    this.incomingArr.push(this.createItem());
   
  }
 
  getIncomingControls(): AbstractControl[] {
    return (<FormArray> this.addstep3.get('incomingArr')).controls;
  }
 
createItem()
{
  return this._formBuilder.group({
    locationName:new FormControl('',[Validators.required]),
    locationNumber:new FormControl('',[Validators.required]),
    serviceCable:   new FormControl('',[Validators.required]),
    serviceFuse:  new FormControl('',[Validators.required]),
    meterDistributor:  new FormControl('',[Validators.required]),
    meterConsumer:  new FormControl('',[Validators.required]),
    meterEqu:  new FormControl('',[Validators.required]),
    isolator:  new FormControl('',[Validators.required]),

    earthingArrangement:  new FormControl('',[Validators.required]),
    adequateArrangement:  new FormControl('',[Validators.required]),
    connectionGenerator:  new FormControl('',[Validators.required]),
    compatibilityCharacteristics:  new FormControl('',[Validators.required]),
    automaticDisconnectGenerator:  new FormControl('',[Validators.required]),
    preventConnectGenerator:  new FormControl('',[Validators.required]),
    isolateGenerator:  new FormControl('',[Validators.required]),

    mainEarting:  new FormControl('',[Validators.required]),
    earthElectordeArrangement:  new FormControl('',[Validators.required]),
    earthConductorConnection:  new FormControl('',[Validators.required]),
    accessibility:  new FormControl('',[Validators.required]),
    aainProtectBonding:  new FormControl('',[Validators.required]),
    allProtectBonding:  new FormControl('',[Validators.required]),
    allAppropriateLocation:  new FormControl('',[Validators.required]),
    felvRequirement:  new FormControl('',[Validators.required]),

    selvSystem:  new FormControl('',[Validators.required]),
    pelvSystem:  new FormControl('',[Validators.required]),
    doubleInsulation:  new FormControl('',[Validators.required]),
    reinforcedInsulation:  new FormControl('',[Validators.required]),
    basicElectricalSepartion:  new FormControl('',[Validators.required]),
    insulationLiveParts:  new FormControl('',[Validators.required]),
    barriersEnclosers:  new FormControl('',[Validators.required]),
    placingOutReach:  new FormControl('',[Validators.required]),
    nonConductLocation:  new FormControl('',[Validators.required]),
    faultElectricalSepartion:  new FormControl('',[Validators.required]),
    faultNonConductLocation:  new FormControl('',[Validators.required]),
    operatingCurrent:  new FormControl('',[Validators.required]),
    supplementaryBonding:  new FormControl('',[Validators.required]),

    consumerUnit: this._formBuilder.array([this.createEarthingForm()]),
    circuit: this._formBuilder.array([this.createcircuitForm()]),
    isolationCurrent: this._formBuilder.array([this.createisolationCurrentForm()])
  })
}
  
  refresh() {
    this.ChangeDetectorRef.detectChanges();
  }
  removeItem(index: any) {
    (this.addstep3.get('incomingArr') as FormArray).removeAt(index);
  }
  gotoNextModal(content3: any) {
    if(this.addstep3.invalid) {
      this.validationError=true;
      this.validationErrorMsg="Please check all the fields";
      setTimeout(()=>{   
        this.validationError=false;                   
   }, 3000);  
      return;
    }  
    this.modalService.open(content3, { centered: true})
  }
  closeModalDialog(){
    if(this.errorMsg != ""){
      this.Error = false;
      this.modalService.dismissAll(this.errorMsg = "")
    }
    else {
      this.success=false;
      this.modalService.dismissAll(this.successMsg="")
    }  
  }
  nextTab3()
  {
    this.inspectionDetails.siteId= this.service.siteCount;
    this.incomingArr=this.addstep3.get('incomingArr') as FormArray
    console.log( this.incomingArr.length)
    this.inspectionDetails.userName=this.email;
    this.service.lenthCount=this.incomingArr.length; 
     this.submitted = true;
    if(this.addstep3.invalid) {
      return;
    }
    this.service.iterationList=this.incomingArr.value;
    this.inspectionDetails.ipaoInspection = this.addstep3.value.incomingArr;
  console.log(this.inspectionDetails);
  console.log(this.addstep3.value.incomingArr);

  this.inspectionDetailsService.addInspectionDetails(this.inspectionDetails).subscribe(
    (    data: any)=> {
      console.log("worked");
      this.proceedNext.emit(true); 
        this.success=true
        this.successMsg="Incoming Equipment successfully saved";
       
        this.disable= true;
    },
    (    error: any) => {
      this.proceedNext.emit(false); 
      console.log("error");
      this.Error=true;
        this.errorMsg="Something went wrong, kindly check all the fields";
    }
    )
  }
}
