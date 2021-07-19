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
  locationList: any = [];

  @Output() proceedNext = new EventEmitter<any>();  
  addstep3!: FormGroup;

  // addstep3 = new FormGroup({
  //   serviceCable:  new FormControl(''),
  //   serviceFuse:  new FormControl(''),
  //   meterDistributor:  new FormControl(''),
  //   meterConsumer:  new FormControl(''),
  //   meterEqu:  new FormControl(''),
  //   isolator:  new FormControl(''),

  //   earthingArrangement:  new FormControl(''),
  //   adequateArrangement:  new FormControl(''),
  //   connectionGenerator:  new FormControl(''),
  //   compatibilityCharacteristics:  new FormControl(''),
  //   automaticDisconnectGenerator:  new FormControl(''),
  //   preventConnectGenerator:  new FormControl(''),
  //   isolateGenerator:  new FormControl(''),

  //   mainEarting:  new FormControl(''),
  //   earthElectordeArrangement:  new FormControl(''),
  //   earthConductorConnection:  new FormControl(''),
  //   accessibility:  new FormControl(''),
  //   aainProtectBonding:  new FormControl(''),
  //   allProtectBonding:  new FormControl(''),
  //   allAppropriateLocation:  new FormControl(''),
  //   felvRequirement:  new FormControl(''),

  //   selvSystem:  new FormControl(''),
  //   pelvSystem:  new FormControl(''),
  //   doubleInsulation:  new FormControl(''),
  //   reinforcedInsulation:  new FormControl(''),
  //   basicElectricalSepartion:  new FormControl(''),
  //   insulationLiveParts:  new FormControl(''),
  //   barriersEnclosers:  new FormControl(''),
  //   obstacles:  new FormControl(''),
  //   placingOutReach:  new FormControl(''),
  //   nonConductLocation:  new FormControl(''),
  //   faultElectricalSepartion:  new FormControl(''),
  //   faultNonConductLocation:  new FormControl(''),
  //   operatingCurrent:  new FormControl(''),

  //   accessWorking:  new FormControl(''),
  //   securityFixing:  new FormControl(''),
  //   livePartsDamage:  new FormControl(''),
  //   securityBarriers:  new FormControl(''),
  //   suitabilityEnclosure:  new FormControl(''),
  //   enclosureDamaged:  new FormControl(''),
  //   presenceObstacles:  new FormControl(''),
  //  // placingOutReach:  new FormControl(''),
  //   presenceMainSwitches:  new FormControl(''),
  //   operationMainSwitches:  new FormControl(''),
  //   manualCircuitBreakers:  new FormControl(''),
  //   switchCausesRcd:  new FormControl(''),
  //   rcdFaultProtection:  new FormControl(''),
  //   rcdAdditionalProtection:  new FormControl(''),
  //   overVoltageProtection:  new FormControl(''),
  //   indicationOfSpd:  new FormControl(''),
  //   rcdQuarterlyTest:  new FormControl(''),
  //   diagramsCharts:  new FormControl(''),
  //   nonstandardCableColour:  new FormControl(''),
  //   alSupplyOfOrign:  new FormControl(''),
  //   alSupplyOfMeter:  new FormControl(''),
  //   alSupplyDistribution:  new FormControl(''),
  //   allPointsIsolation:  new FormControl(''),
  //   nextInspection:  new FormControl(''),
  //   otherRequiredLabelling:  new FormControl(''),
  //   basesCorrectType:  new FormControl(''),
  //   singlePole:  new FormControl(''),
  //   mechanicalDamage:  new FormControl(''),
  //   electromagnetic:  new FormControl(''),
  //   allConductorCon:  new FormControl(''),

  //   identificationConductors:  new FormControl(''),
  //   cableInstallation:  new FormControl(''),
  //   examinationCables:  new FormControl(''),
  //   examinationInsulation:  new FormControl(''),
  //   nonSheathedCables:  new FormControl(''),
  //   containmentSystems:  new FormControl(''),
  //   temperatureRating:  new FormControl(''),
  //   cablesTerminated:  new FormControl(''),
  //   currentCarryCapacity:  new FormControl(''),
  //  // operationMainSwitches:  new FormControl(''),
  //  // manualCircuitBreakers:  new FormControl(''),
  //  // switchCausesRcd:  new FormControl(''),
  //   adequacyProtectDevices:  new FormControl(''),
  //   //rcdAdditionalProtection:  new FormControl(''),
  //   presenceProtectConductors:  new FormControl(''),
  //   coOrdination:  new FormControl(''),
  //   wiringSystems:  new FormControl(''),
  //   cablesConcealUnderFloors:  new FormControl(''),
  //   provisionFireBarriers:  new FormControl(''),
  //   sectionsRegardlessDepth:  new FormControl(''),
  //   cablesConcDepth:  new FormControl(''),
  //   operatingCurrentSocket:  new FormControl(''),
  //   operatingCurrentCircuits:  new FormControl(''),
  //   separationBand:  new FormControl(''),
  //   separationElectrical:  new FormControl(''),
  //   conditionCircuitAccessories:  new FormControl(''),
  //   conductorCorrectTerminated:  new FormControl(''),
  //   conductorVisibleOutside:  new FormControl(''),
  //   connLiveConductors:  new FormControl(''),
  //   adequatelyConnectedEnclosure:  new FormControl(''),
  //   suitabilityCircuitAccessories:  new FormControl(''),
  //   conditionAccessories:  new FormControl(''),
  //   singlePoleDevices:  new FormControl(''),
  //   adequacyConnections:  new FormControl(''),
  //   isolationSwitching:  new FormControl(''),

  //   presenceDevices:  new FormControl(''),
  //   conditionDevices:  new FormControl(''),
  //   locationDevices:  new FormControl(''),
  //   capableSecured:  new FormControl(''),
  //   operationVerify:  new FormControl(''),
  //   installCircuit:  new FormControl(''),
  //   warningLabel:  new FormControl(''),
  //   swPresenceDevices:  new FormControl(''),
  //   swConditionDevices:  new FormControl(''),
  //   swAcceptableLocation:  new FormControl(''),
  //   swCapableOffPosition:  new FormControl(''),
  //   swCorrectOperation:  new FormControl(''),
  //   swCircuit:  new FormControl(''),
  //   swWarningLabel:  new FormControl(''),
  //   emSwitPresenceDevices:  new FormControl(''),
  //   emSwitConditionDevices:  new FormControl(''),
  //   emSwitLocationDevices:  new FormControl(''),
  //   emSwitOperationVerify:  new FormControl(''),
  //   emSwitInstallCircuit:  new FormControl(''),
  //   fuSwitPresenceDevices:  new FormControl(''),
  //   fuSwitLocationDevices:  new FormControl(''),
  //   fuSwitOperationVerify:  new FormControl(''),

  //   suitabilityEquipment:  new FormControl(''),
  //   enclosureNotDamaged:  new FormControl(''),
  //   suitabilityEnvironment:  new FormControl(''),
  //  // securityFixing:  new FormControl(''),
  //   cableEntryHoles:  new FormControl(''),
  //   provisionVoltage:  new FormControl(''),
  //   provisionOverload:  new FormControl(''),
  //   correctTypeLamps:  new FormControl(''),
  //   insulaDisplacementBox:  new FormControl(''),
  //   overheatSurrounding:  new FormControl(''),
  //   overheatConductors:  new FormControl(''),
  // })
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
   constructor(private _formBuilder: FormBuilder,
    private router: ActivatedRoute, private modalService: NgbModal,
    private inspectionDetailsService: InspectiondetailsService,public service: GlobalsService,
    private ChangeDetectorRef: ChangeDetectorRef) {
    this.email = this.router.snapshot.paramMap.get('email') || '{}'
  }

  

  ngOnInit(): void {
    this.addstep3 = this._formBuilder.group({
      incomingArr: this._formBuilder.array([this.createItem()])
      });

   
    this.refresh();
  }

  
  getearthingControls(form:any) { 
    return form.controls.earthingArr.controls

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
    return form.controls.circuitArr.controls

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
      operationMainSwitches:  new FormControl('',[Validators.required]),
      manualCircuitBreakers:  new FormControl('',[Validators.required]),
      switchCausesRcd:  new FormControl('',[Validators.required]),
      adequacyProtectDevices:  new FormControl('',[Validators.required]),
      rcdAdditionalProtection:  new FormControl('',[Validators.required]),
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
    return form.controls.isolationCurrentArr.controls

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
    // this.validate=false
    this.incomingArr = this.addstep3.get('incomingArr') as FormArray;
    debugger 
    this.incomingArr.push(this.createItem());
    // this.incomingArr.controls[0].clearValidators();
    console.log(this.submitted);
    //this.addstep3 = this._formBuilder.group({
      // this.incomingArr.clearValidators();

     // incomingArr: this._formBuilder.array([this.createItem()]).updateValueAndValidity()


     // });
    

    // for( this.i=0; this.i<this.loclength; this.i++)
    // {
    //   for( this.j=0 ; this.j<this.incomingArr.length ; this.j++)
    //   {
    //    this.f.incomingArr.controls[this.i].controls[this.earthingArr[this.j]].clearValidators();
    //    this.f.incomingArr.controls[this.i].controls[this.earthingArr[this.j]].updateValueAndValidity();      
    //   }
    // }
  //   for (const key in this.addstep3) {
  //     this.incomingArr.get(this.createItem()).clearValidators();
  //     this.createItem.get(key).updateValueAndValidity();
  // }
  }
 
  getIncomingControls(): AbstractControl[] {
    return (<FormArray> this.addstep3.get('incomingArr')).controls;
  }
  createItem1() {
 // if(this.validate==false){
    return this._formBuilder.group({
      locationName:new FormControl(''),
      locationNumber:new FormControl(''),
      serviceCable:   new FormControl(''),
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
      supplementaryBonding:  new FormControl(''),
      // equipmentArr: this._formBuilder.array([this.createEquipmentForm()]),
      earthingArr: this._formBuilder.array([this.createEarthingForm()]),
      circuitArr: this._formBuilder.array([this.createcircuitForm()]),
      isolationCurrentArr: this._formBuilder.array([this.createisolationCurrentForm()])
    });
  //}
    // else
    // {
    //   return this._formBuilder.group({
    //     locationName:new FormControl('',[Validators.required])
    //   });
    // }
    
  
}
createItem()
{
  this.submitted=false;
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
    obstacles:  new FormControl('',[Validators.required]),
    placingOutReach:  new FormControl('',[Validators.required]),
    nonConductLocation:  new FormControl('',[Validators.required]),
    faultElectricalSepartion:  new FormControl('',[Validators.required]),
    faultNonConductLocation:  new FormControl('',[Validators.required]),
    operatingCurrent:  new FormControl('',[Validators.required]),
    supplementaryBonding:  new FormControl('',[Validators.required]),
    // equipmentArr: this._formBuilder.array([this.createEquipmentForm()]),
    earthingArr: this._formBuilder.array([this.createEarthingForm()]),
    circuitArr: this._formBuilder.array([this.createcircuitForm()]),
    isolationCurrentArr: this._formBuilder.array([this.createisolationCurrentForm()])
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
      this.validationErrorMsg="Something went wrong, kindly check all the fields";
      setTimeout(()=>{   
        this.validationError=false;                   
   }, 3000);  
  //this.validate=true;
      return;
    }  
    this.modalService.open(content3, { centered: true})
  }
  nextTab3()
  {
    debugger
    //this.validate=true;

        // this.inspectionDetails.siteId=this.service.siteCount;
    this.inspectionDetails.siteId= 501;
    this.inspectionDetails.userName=this.email;
    this.submitted = true;
    // if(this.addstep3.invalid) {
    //   //this.createItem();
    //   return;
    // }
    this.inspectionDetails.ipaoInspection = this.addstep3.value.incomingArr;
  console.log(this.inspectionDetails);
  console.log(this.addstep3.value.incomingArr);

  this.inspectionDetailsService.addInspectionDetails(this.inspectionDetails).subscribe(
    (    data: any)=> {
      console.log("worked");
      this.proceedNext.emit(true); 
        this.success=true
        this.successMsg="Step2 successfully saved";
        this.disable= true;
        // alert("Step2 successfully saved");
    },
    (    error: any) => {
      console.log("error");
      this.Error=true;
        // alert("Something went wrong, kindly check all the fields");  
        this.proceedNext.emit(false); 
        this.errorMsg="Something went wrong, kindly check all the fields";

    }
    )
  }
}
