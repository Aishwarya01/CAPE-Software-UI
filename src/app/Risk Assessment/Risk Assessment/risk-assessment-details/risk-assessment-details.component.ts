import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { arrow90DegDown } from 'ngx-bootstrap-icons';
import { RiskAssessmentDetails } from '../../Risk Assesment Model/risk-assessment-details';
import { RiskAssessmentDetailsServiceService } from '../../Risk Assessment Services/risk-assessment-details-service.service';
import { RiskglobalserviceService } from '../../riskglobalservice.service';

@Component({
  selector: 'app-risk-assessment-details',
  templateUrl: './risk-assessment-details.component.html',
  styleUrls: ['./risk-assessment-details.component.css']
})
export class RiskAssessmentDetailsComponent implements OnInit {
  step2Form!: FormGroup;
  riskAssessmentDetails = new RiskAssessmentDetails;
  panelOpenState = false;
  loading = false;
  submitted = false;
  validationError = false;
  validationErrorMsg = '';
  locationList: any= [];
  step2List: any = [];
  showFlashDensity: boolean= true;
  errorMsg: string='';
  successMsg: string='';
  proceedFlag: boolean = true;
  Error: boolean=false;
  success: boolean=false;
  flag: boolean = false;
  // FormArray Name List
  structureAttributes!: FormArray;
  losses!: FormArray;
  structureCharacters!: FormArray;
  heightnear:any=[];
  popup1: boolean=false;
  popup: boolean=false;
  success1: boolean=false;
  errorArr: any=[];
  @Output() proceedNext = new EventEmitter<any>();
  riskList: any=[];
  isEditable: any;
  disable: boolean=false;
  popArray: any = [];
  riskId: Number=0;
  locationRtr: String = "";
  getLocation: String='';

  // brick: String='1';
  // rccwithBrick: String='0.5';
  // pebwithsheet: String='0.2';
  // rccbuilding: String='0.2';
  // pebbuilding: String='0.001';

  constructor(private router: ActivatedRoute,
              private formBuilder: FormBuilder,
              private modalService: NgbModal,
              private riskAssessmentService: RiskAssessmentDetailsServiceService,
              public riskGlobal: RiskglobalserviceService,
  ) { }

  ngOnInit(): void {
    // Fetching location list 
    this.locationList = [];
    this.riskAssessmentService.fetchLocation().subscribe(
      data=> {
        this.locationList = JSON.parse(data);
      })

    this.step2Form = this.formBuilder.group({
      structureCharacters: this.formBuilder.array([this.structureCharactersForm()])
    });
  }

  structureCharactersForm() {
    return this.formBuilder.group({
      location: new FormControl('',[Validators.required]),
      otherLocation: [''],
      groundFlashDensity: [''],
      typeOfBuilding: new FormControl('',[Validators.required]),
      structureScreeningEffectiveness: new FormControl('',[Validators.required]),
      internalScreeningEffectiveness: new FormControl('',[Validators.required]),
      protrusionLenght: new FormControl('',[Validators.required]),
      protrusionWidth: new FormControl('',[Validators.required]),
      protrusionHeight: new FormControl('',[Validators.required]),
      heighestRoofProtrusion: new FormControl('',[Validators.required]),
      collectionAreaOfStructure: new FormControl('',[Validators.required]),
      collAreaOfStrucWithProtrusion: new FormControl('',[Validators.required]),
      collAreaOfNearStructure: new FormControl('',[Validators.required]),
      heightNearByStructure: new FormControl('',[Validators.required]),
      telephoneServiceLine: new FormControl('',[Validators.required]),
      environment: new FormControl('',[Validators.required]),
      noOfDangerousEventOnStructure: new FormControl('',[Validators.required]),
      noOfDangerousEventNearStructure: new FormControl('',[Validators.required]),
      protectionPartOFBuilding: new FormControl('',[Validators.required]),
      protectionLenght: new FormControl('',[Validators.required]),
      protectionWidth: new FormControl('',[Validators.required]),
      protectionHeight: new FormControl('',[Validators.required]),
      protectionCollectionArea: new FormControl('',[Validators.required]),
      adjacentBuilding: new FormControl('',[Validators.required]),
      adjacentLength: new FormControl('',[Validators.required]),
      adjacentWidth: new FormControl('',[Validators.required]),
      adjacentHeight: new FormControl('',[Validators.required]),
      collAreaOfAdjacentStruc: new FormControl('',[Validators.required]),
      noOfDangEventOnAdjacentStruc: new FormControl('',[Validators.required]),
      noOfPeopleInBuilding: new FormControl('',[Validators.required]),
      noOfPeopleInZone: new FormControl('',[Validators.required]),
      dayPeoplePresentBuilding: new FormControl('',[Validators.required]),
      yearPeoplePresentBuilding: new FormControl('',[Validators.required]),
      explosion: new FormControl(''),
      explosion1: new FormControl(''),
      fire: new FormControl(''),
      none: new FormControl(''),

      structureAttributes: this.formBuilder.array([this.createStructureAttributesForm()]),
      losses: this.formBuilder.array([this.createLossesForm()]),
    })
  }

    private createStructureAttributesForm(): FormGroup {
      return new FormGroup({
        stTypeOfFloorSurface: new FormControl('',[Validators.required]),
        stAdditionalProtection: new FormControl('',[Validators.required]),
        stRiskOfFire: new FormControl('',[Validators.required]),
        stFireProtectionMeasure: new FormControl('',[Validators.required]),
        stTypeOfInternalWiring: new FormControl('',[Validators.required]),
        totalNoOfLines: new FormControl('',[Validators.required]),
        noOfPowerLines: new FormControl('',[Validators.required]),
        typeOfPowerLines: new FormControl('',[Validators.required]),
        lengthOfPowerLines: new FormControl('',[Validators.required]),
        shieldingGroundingIsolation: new FormControl('',[Validators.required]),
        collAreaOfPowerLines: new FormControl('',[Validators.required]),
        collAreaOfNearLines: new FormControl('',[Validators.required]),
        eventNearThePowerLines: new FormControl('',[Validators.required]),
        eventOnThePowerLines: new FormControl('',[Validators.required]),
        noOfTelecomLines: new FormControl('',[Validators.required]),
        typeOfTelecomLines: new FormControl('',[Validators.required]),
        lengthOfTelecomLines: new FormControl('',[Validators.required]),
        shieldingGroundingIsolationL1: new FormControl('',[Validators.required]),
        collAreaOfTelecomLines: new FormControl('',[Validators.required]),
        collNearOfTelecomLines: new FormControl('',[Validators.required]),
        eventNearTheTelecomeLines: new FormControl('',[Validators.required]),
        eventOnTheTelecomLines: new FormControl('',[Validators.required]),
      })
    }

  private createLossesForm(): FormGroup {
    return new FormGroup({
    hazardClassification: new FormControl('',[Validators.required]),
    humanLossOfphysicalDamage: new FormControl('',[Validators.required]),
    humanLossOffailureOfInternalSystem: new FormControl('',[Validators.required]),
    humanLossOfInjuryOfElectricShock: new FormControl('',[Validators.required]),
    humanLossOfPhysicalDamageL1: new FormControl('',[Validators.required]),
    humanLossOffailureOfInternalSystemL1: new FormControl('',[Validators.required]),
    serToPubPhysicalDamage: new FormControl('',[Validators.required]),
    serToPubfailureOfInternalSystem: new FormControl('',[Validators.required]),
    serToPubPhysicalDamageL1: new FormControl('',[Validators.required]),
    serToPubfailureOfInternalSystemL1: new FormControl('',[Validators.required]),
    culHerOfPhysicalDamage: new FormControl('',[Validators.required]),
    culHerOfPhysicalDamageL1: new FormControl('',[Validators.required]),
    ecoLossOfPhysicalDamage: new FormControl('',[Validators.required]),
    ecoLossOfFailureOfInternalSystem: new FormControl('',[Validators.required]),
    ecoLossOfInjuryOfElectricShock: new FormControl('',[Validators.required]),
    ecoLossOfPhysicalDamageL1: new FormControl('',[Validators.required]),
    ecoLossOfFailureOfInternalSystemL1: new FormControl('',[Validators.required]),
    classOfLPS: new FormControl('',[Validators.required]),
    classOfSPD: new FormControl('',[Validators.required]),

    // protectionPEB:new FormControl(''),
    // protectionPMS:new FormControl(''),
    // protectionPM:new FormControl(''),
    // protectionPA:new FormControl(''),
    // protectionPC:new FormControl(''),
    // protectionPU:new FormControl(''),
    // protectionPV:new FormControl(''),
    // protectionPW:new FormControl(''),
    // protectionPZ:new FormControl(''),
    })
  }

  
  structureCharactersFormRtr(item: any, form:any): FormGroup {
    this.getLocation=item.location;
    return this.formBuilder.group({
      structureCharacteristicsId: new FormControl({ disabled: false, value: item.structureCharacteristicsId }),
      location: new FormControl({ disabled: false, value: item.location }, Validators.required),
      otherLocation: new FormControl({ disabled: false, value: item.otherLocation }),
      groundFlashDensity: new FormControl({ disabled: false, value: item.groundFlashDensity }, Validators.required),
      typeOfBuilding: new FormControl({ disabled: false, value: item.typeOfBuilding }, Validators.required),
      structureScreeningEffectiveness: new FormControl({ disabled: false, value: item.structureScreeningEffectiveness }, Validators.required),
      internalScreeningEffectiveness: new FormControl({ disabled: false, value: item.internalScreeningEffectiveness }, Validators.required),
      protrusionLenght: new FormControl({ disabled: false, value: item.protrusionLenght }, Validators.required),
      protrusionWidth: new FormControl({ disabled: false, value: item.protrusionWidth }, Validators.required),
      protrusionHeight: new FormControl({ disabled: false, value: item.protrusionHeight }, Validators.required),
      heighestRoofProtrusion: new FormControl({ disabled: false, value: item.heighestRoofProtrusion }, Validators.required),
      collectionAreaOfStructure: new FormControl({ disabled: false, value: item.collectionAreaOfStructure }, Validators.required),
      collAreaOfStrucWithProtrusion: new FormControl({ disabled: false, value: item.collAreaOfStrucWithProtrusion }, Validators.required),
      collAreaOfNearStructure: new FormControl({ disabled: false, value: item.collAreaOfNearStructure }, Validators.required),
      heightNearByStructure: new FormControl({ disabled: false, value: item.heightNearByStructure }, Validators.required),
      telephoneServiceLine: new FormControl({ disabled: false, value: item.telephoneServiceLine }, Validators.required),
      environment: new FormControl({ disabled: false, value: item.environment }, Validators.required),
      noOfDangerousEventOnStructure: new FormControl({ disabled: false, value: item.noOfDangerousEventOnStructure }, Validators.required),
      noOfDangerousEventNearStructure: new FormControl({ disabled: false, value: item.noOfDangerousEventNearStructure }, Validators.required),
      protectionPartOFBuilding: new FormControl({ disabled: false, value: item.protectionPartOFBuilding }, Validators.required),
      protectionLenght: new FormControl({ disabled: false, value: item.protectionLenght }, Validators.required),
      protectionWidth: new FormControl({ disabled: false, value: item.protectionWidth }, Validators.required),
      protectionHeight: new FormControl({ disabled: false, value: item.protectionHeight }, Validators.required),
      protectionCollectionArea: new FormControl({ disabled: false, value: item.protectionCollectionArea }, Validators.required),
      adjacentBuilding: new FormControl({ disabled: false, value: item.adjacentBuilding }, Validators.required),
      adjacentLength: new FormControl({ disabled: false, value: item.adjacentLength }, Validators.required),
      adjacentWidth: new FormControl({ disabled: false, value: item.adjacentWidth }, Validators.required),
      adjacentHeight: new FormControl({ disabled: false, value: item.adjacentHeight }, Validators.required),
      collAreaOfAdjacentStruc: new FormControl({ disabled: false, value: item.collAreaOfAdjacentStruc }, Validators.required),
      noOfDangEventOnAdjacentStruc: new FormControl({ disabled: false, value: item.noOfDangEventOnAdjacentStruc }, Validators.required),
      noOfPeopleInBuilding: new FormControl({ disabled: false, value: item.noOfPeopleInBuilding }, Validators.required),
      noOfPeopleInZone: new FormControl({ disabled: false, value: item.noOfPeopleInZone }, Validators.required),
      dayPeoplePresentBuilding: new FormControl({ disabled: false, value: item.dayPeoplePresentBuilding }, Validators.required),
      yearPeoplePresentBuilding: new FormControl({ disabled: false, value: item.yearPeoplePresentBuilding }, Validators.required),

      structureAttributes: this.formBuilder.array([this.createStructureAttributesFormRtr(item.structureAttributes[0])]),
      losses: this.formBuilder.array([this.createLossesFormRtr(item.losses[0])]),
    })
  }

  createStructureAttributesFormRtr(item: any): FormGroup {
    return this.formBuilder.group({
      structureAttributesId: new FormControl({ disabled: false, value: item.structureAttributesId }),
      stTypeOfFloorSurface: new FormControl({ disabled: false, value: item.stTypeOfFloorSurface }, Validators.required),
      stAdditionalProtection: new FormControl({ disabled: false, value: item.stAdditionalProtection }, Validators.required),
      stRiskOfFire: new FormControl({ disabled: false, value: item.stRiskOfFire }, Validators.required),
      stFireProtectionMeasure: new FormControl({ disabled: false, value: item.stFireProtectionMeasure }, Validators.required),
      stTypeOfInternalWiring: new FormControl({ disabled: false, value: item.stTypeOfInternalWiring }, Validators.required),
      totalNoOfLines: new FormControl({ disabled: false, value: item.totalNoOfLines }, Validators.required),
      noOfPowerLines: new FormControl({ disabled: false, value: item.noOfPowerLines }, Validators.required),
      typeOfPowerLines: new FormControl({ disabled: false, value: item.typeOfPowerLines }, Validators.required),
      lengthOfPowerLines: new FormControl({ disabled: false, value: item.lengthOfPowerLines }, Validators.required),
      shieldingGroundingIsolation: new FormControl({ disabled: false, value: item.shieldingGroundingIsolation }, Validators.required),
      collAreaOfPowerLines: new FormControl({ disabled: false, value: item.collAreaOfPowerLines }, Validators.required),
      collAreaOfNearLines: new FormControl({ disabled: false, value: item.collAreaOfNearLines }, Validators.required),
      eventNearThePowerLines: new FormControl({ disabled: false, value: item.eventNearThePowerLines }, Validators.required),
      eventOnThePowerLines: new FormControl({ disabled: false, value: item.eventOnThePowerLines }, Validators.required),
      noOfTelecomLines: new FormControl({ disabled: false, value: item.noOfTelecomLines }, Validators.required),
      typeOfTelecomLines: new FormControl({ disabled: false, value: item.typeOfTelecomLines }, Validators.required),
      lengthOfTelecomLines: new FormControl({ disabled: false, value: item.lengthOfTelecomLines }, Validators.required),
      shieldingGroundingIsolationL1: new FormControl({ disabled: false, value: item.shieldingGroundingIsolationL1 }, Validators.required),
      collAreaOfTelecomLines: new FormControl({ disabled: false, value: item.collAreaOfTelecomLines }, Validators.required),
      collNearOfTelecomLines: new FormControl({ disabled: false, value: item.collNearOfTelecomLines }, Validators.required),
      eventNearTheTelecomeLines: new FormControl({ disabled: false, value: item.eventNearTheTelecomeLines }, Validators.required),
      eventOnTheTelecomLines: new FormControl({ disabled: false, value: item.eventOnTheTelecomLines }, Validators.required),
    })
  }

  createLossesFormRtr(item: any): FormGroup {
    return this.formBuilder.group({
      lossesId: new FormControl({ disabled: false, value: item.lossesId }, Validators.required),
      hazardClassification: new FormControl({ disabled: false, value: item.hazardClassification }, Validators.required),
      humanLossOfphysicalDamage: new FormControl({ disabled: false, value: item.humanLossOfphysicalDamage }, Validators.required),
      humanLossOffailureOfInternalSystem: new FormControl({ disabled: false, value: item.humanLossOffailureOfInternalSystem }, Validators.required),
      humanLossOfInjuryOfElectricShock: new FormControl({ disabled: false, value: item.humanLossOfInjuryOfElectricShock }, Validators.required),
      humanLossOfPhysicalDamageL1: new FormControl({ disabled: false, value: item.humanLossOfPhysicalDamageL1 }, Validators.required),
      humanLossOffailureOfInternalSystemL1: new FormControl({ disabled: false, value: item.humanLossOffailureOfInternalSystemL1 }, Validators.required),
      serToPubPhysicalDamage: new FormControl({ disabled: false, value: item.serToPubPhysicalDamage }, Validators.required),
      serToPubfailureOfInternalSystem: new FormControl({ disabled: false, value: item.serToPubfailureOfInternalSystem }, Validators.required),
      serToPubPhysicalDamageL1: new FormControl({ disabled: false, value: item.serToPubPhysicalDamageL1 }, Validators.required),
      serToPubfailureOfInternalSystemL1: new FormControl({ disabled: false, value: item.serToPubfailureOfInternalSystemL1 }, Validators.required),
      culHerOfPhysicalDamage: new FormControl({ disabled: false, value: item.culHerOfPhysicalDamage }, Validators.required),
      culHerOfPhysicalDamageL1: new FormControl({ disabled: false, value: item.culHerOfPhysicalDamageL1 }, Validators.required),
      ecoLossOfPhysicalDamage: new FormControl({ disabled: false, value: item.ecoLossOfPhysicalDamage }, Validators.required),
      ecoLossOfFailureOfInternalSystem: new FormControl({ disabled: false, value: item.ecoLossOfFailureOfInternalSystem }, Validators.required),
      ecoLossOfInjuryOfElectricShock: new FormControl({ disabled: false, value: item.ecoLossOfInjuryOfElectricShock }, Validators.required),
      ecoLossOfPhysicalDamageL1: new FormControl({ disabled: false, value: item.ecoLossOfPhysicalDamageL1 }, Validators.required),
      ecoLossOfFailureOfInternalSystemL1: new FormControl({ disabled: false, value: item.ecoLossOfFailureOfInternalSystemL1 }, Validators.required),
      classOfLPS: new FormControl({ disabled: false, value: item.classOfLPS }, Validators.required),
      classOfSPD: new FormControl({ disabled: false, value: item.classOfSPD }, Validators.required),
    })
  }

  // Parent Array Controls:
  overAllControls(): AbstractControl[] {
    return (<FormArray>this.step2Form.get('structureCharacters')).controls;
  }
  getStructureAttributesControls(form: any) {
    // return (<FormArray> this.step2Form.get('structureAttributes')).controls
    return form.controls.structureAttributes?.controls;
  }
  getLossesControls(form:any) {
    // return (<FormArray> this.step2Form.get('losses')).controls
    return form.controls.losses?.controls;
  }

  get f():any {
    return this.step2Form.controls;
  }

  changeLocation(e: any, form:any) {
    let selectedValue = e.target.value;
    this.getLocation='';
    for(let i of this.locationList) {
      if(i.gfdValue == selectedValue) {
        form.controls.groundFlashDensity.setValue(i.location);
        this.showFlashDensity = true;
      }
      if(selectedValue == 'Others') {
        form.controls.groundFlashDensity.setValue('');
        this.showFlashDensity = false;
      }
    }
  }

  buildingValue(event: any, form: any){
    if(event.target.value == '1'){
      // form.controls.typeOfBuilding.setValue(this.brick);
      form.controls.structureScreeningEffectiveness.setValue('Poor');
      form.controls.internalScreeningEffectiveness.setValue('Poor');
    }
    else if(event.target.value == '0.5'){
      // form.controls.typeOfBuilding.setValue(this.rccwithBrick);
      form.controls.structureScreeningEffectiveness.setValue('Average');
      form.controls.internalScreeningEffectiveness.setValue('Average');
    }
    else if(event.target.value == '0.2'){
      // form.controls.typeOfBuilding.setValue(this.pebwithsheet);
      form.controls.structureScreeningEffectiveness.setValue('Good');
      form.controls.internalScreeningEffectiveness.setValue('Good');
    }
    else if(event.target.value == '0.20'){
      // form.controls.typeOfBuilding.setValue(this.rccbuilding);
      form.controls.structureScreeningEffectiveness.setValue('Good');
      form.controls.internalScreeningEffectiveness.setValue('Good');
    }
    else if(event.target.value == '0.001'){
      // form.controls.typeOfBuilding.setValue(this.pebbuilding);
      form.controls.structureScreeningEffectiveness.setValue('Very Good');
      form.controls.internalScreeningEffectiveness.setValue('Very Good');
    }
  }

  // Math for Collection Area of Structure
  collectionAreaLength(event:any, form:any){
    let selectedValue=event.target.value;
    if(form.controls.protrusionWidth.value!='' && form.controls.protrusionHeight.value!=''){
      form.controls.collectionAreaOfStructure.setValue(form.controls.protrusionLenght.value*form.controls.protrusionWidth.value+6*form.controls.protrusionLenght.value*
        (form.controls.protrusionLenght.value+form.controls.protrusionWidth.value)+9*3.14*(form.controls.protrusionHeight.value*form.controls.protrusionHeight.value));
    }
    else{
      form.controls.collectionAreaOfStructure.setValue('');
    }

    if(form.controls.protrusionWidth.value!='' && form.controls.protrusionLenght.value!=''){
      form.controls.collAreaOfNearStructure.setValue(2*500*(form.controls.protrusionLenght.value+form.controls.protrusionWidth.value)+3.14*(250000));
    }
    else{
      form.controls.collAreaOfNearStructure.setValue('');
    }
  }
  collectionAreaWidth(event:any, form:any){
    let selectedValue=event.target.value;
    if(form.controls.protrusionLenght.value!='' && form.controls.protrusionHeight.value!=''){
      form.controls.collectionAreaOfStructure.setValue(form.controls.protrusionLenght.value*form.controls.protrusionWidth.value+6*form.controls.protrusionLenght.value*
        (form.controls.protrusionLenght.value+form.controls.protrusionWidth.value)+9*3.14*(form.controls.protrusionHeight.value*form.controls.protrusionHeight.value));
    }
    else{
      form.controls.collectionAreaOfStructure.setValue('');
    }
    if(form.controls.protrusionWidth.value!='' && form.controls.protrusionLenght.value!=''){
      form.controls.collAreaOfNearStructure.setValue(2*500*(form.controls.protrusionLenght.value+form.controls.protrusionWidth.value)+3.14*(250000));
    }
    else{
      form.controls.collAreaOfNearStructure.setValue('');
    }
  }
  collectionAreaHeight(event:any, form:any){
    let selectedValue=event.target.value;
    if(form.controls.protrusionWidth.value!='' && form.controls.protrusionLenght.value!=''){
      form.controls.collectionAreaOfStructure.setValue(form.controls.protrusionLenght.value*form.controls.protrusionWidth.value+6*form.controls.protrusionLenght.value*
        (form.controls.protrusionLenght.value+form.controls.protrusionWidth.value)+9*3.14*(form.controls.protrusionHeight.value*form.controls.protrusionHeight.value));
    }
    else{
      form.controls.collectionAreaOfStructure.setValue('');
    }
  }

  // Math for Collection area of structure with protrusion
  collectionAreaProtrusion(event:any, form:any){
    let selectedValue=event.target.value;
    if(form.controls.heighestRoofProtrusion.value!=''){
      form.controls.collAreaOfStrucWithProtrusion.setValue(9*3.14*(form.controls.heighestRoofProtrusion.value*form.controls.heighestRoofProtrusion.value));
    }
    else{
      form.controls.collAreaOfStrucWithProtrusion.setValue('');
    }
  }

  // Math for No of dangerous event on structure
  heightNearStruct(event:any, form:any){
    if(form.controls.heightNearByStructure!='' && form.controls.collectionAreaOfStructure!='' && form.controls.groundFlashDensity!=''){
      var noOfDangerousEventOnStructure = form.controls.groundFlashDensity.value*form.controls.collectionAreaOfStructure.value*form.controls.heightNearByStructure.value*0.000001;
      form.controls.noOfDangerousEventOnStructure.setValue(noOfDangerousEventOnStructure.toFixed(7));
    }
    else{
      form.controls.noOfDangerousEventOnStructure.setValue('');
    }
  }
  // Math for No of dangerous event near the structure
  noOfDangerus(event:any, form:any){
    if(form.controls.groundFlashDensity!='' && form.controls.collAreaOfNearStructure!=''){
      var noOfDangerousEventNearStructure = form.controls.groundFlashDensity.value*form.controls.collAreaOfNearStructure.value*0.000001
      form.controls.noOfDangerousEventNearStructure.setValue(noOfDangerousEventNearStructure.toFixed(7));
    }
    else{
      form.controls.noOfDangerousEventNearStructure.setValue('');
    }
    if(form.controls.groundFlashDensity!='' && form.controls.collAreaOfAdjacentStruc!='' && form.controls.telephoneServiceLine!='' && form.controls.heightNearByStructure!=''){
      form.controls.noOfDangEventOnAdjacentStruc.setValue(form.controls.groundFlashDensity.value*form.controls.collAreaOfAdjacentStruc.value+6*form.controls.heightNearByStructure.value*form.controls.telephoneServiceLine.value*0.000001);
    }
    else{
      form.controls.noOfDangEventOnAdjacentStruc.setValue('');
    }
  }

  // Drop Down Changes for Protection required for part of building
  protectionRqbuilding(event:any, form:any){
    if(event.target.value == 'No'){
      form.controls.protectionLenght.setValue('0.00');
      form.controls.protectionWidth.setValue('0.00');
      form.controls.protectionHeight.setValue('0.00');
      form.controls.protectionCollectionArea.setValue('0.00');
    }
    else{
      form.controls.protectionLenght.setValue('');
      form.controls.protectionWidth.setValue('');
      form.controls.protectionHeight.setValue('');
      form.controls.protectionCollectionArea.setValue('');
    }
  }
  // Math for Collection Area
  collectionArea(event:any, form:any){
    if(form.controls.protectionLenght!='' && form.controls.protectionWidth!='' && form.controls.protectionHeight!=''){
      form.controls.protectionCollectionArea.setValue(form.controls.protectionLenght.value*form.controls.protectionWidth.value+6*form.controls.protectionHeight.value*(form.controls.protectionLenght.value+form.controls.protectionWidth.value)+9*3.14*(form.controls.protectionHeight.value*form.controls.protectionHeight.value));
    }
    else{
      form.controls.protectionCollectionArea.setValue('');
    }
  }

  // Drop Down for Adjacent Building
  adjacentBuilding(event:any,form:any){
    if(event.target.value == 'No'){
      form.controls.adjacentLength.setValue('0.00');
      form.controls.adjacentWidth.setValue('0.00');
      form.controls.adjacentHeight.setValue('0.00');
      form.controls.collAreaOfAdjacentStruc.clearValidators();
      form.controls.collAreaOfAdjacentStruc.updateValueAndValidity();
    }
    else{
      form.controls.adjacentLength.setValue('');
      form.controls.adjacentWidth.setValue('');
      form.controls.adjacentHeight.setValue('');
      form.controls.collAreaOfAdjacentStruc.setValidators(Validators.required);
      form.controls.collAreaOfAdjacentStruc.updateValueAndValidity();
    }
  }
  // Math for Collection Area Of Adjacent Structure
  collectionOfAdjacent(event:any,form:any){
    if(form.controls.adjacentLength!='' && form.controls.adjacentWidth!='' && form.controls.adjacentHeight!=''){
      var a = form.controls.adjacentLength.value*form.controls.adjacentWidth.value+6*form.controls.adjacentHeight.value*(form.controls.adjacentLength.value+form.controls.adjacentWidth.value)+9*3.14*(form.controls.adjacentHeight.value*form.controls.adjacentHeight.value)
      form.controls.collAreaOfAdjacentStruc.setValue(a.toFixed(2));
    }
    else{
      form.controls.collAreaOfAdjacentStruc.setValue('');
    }
  }
  // Math for Number of hours/year people are present in the building
  houseYearBuilding(event:any,form:any){
    if(form.controls.dayPeoplePresentBuilding!=''){
      var a = 365*form.controls.dayPeoplePresentBuilding.value;
      form.controls.yearPeoplePresentBuilding.setValue(a);
    }
    else{
      form.controls.yearPeoplePresentBuilding.setValue('');
    }
  }

  // Math for Length of Power line
  lengthPowerline(event:any, form:any){
    // Collection area of the lines && Collection Area Near The Lines
    let arr = form.controls.structureAttributes.controls[0].controls.lengthOfPowerLines.value;
    if(form.controls.structureAttributes.controls[0].controls.lengthOfPowerLines!=''){
      var a = 40*arr;
      var b = 4000*arr;
      form.controls.structureAttributes.controls[0].controls.collAreaOfPowerLines.setValue(a);
      form.controls.structureAttributes.controls[0].controls.collAreaOfNearLines.setValue(b); 
    }
    else{
      form.controls.structureAttributes.controls[0].controls.collAreaOfPowerLines.setValue('');
      form.controls.structureAttributes.controls[0].controls.collAreaOfNearLines.setValue('');
    }
    // No. fo dangerous event near the lines
    if(form.controls.groundFlashDensity!='' && form.controls.structureAttributes.controls[0].controls.collAreaOfNearLines!='' && form.controls.structureAttributes.controls[0].controls.typeOfPowerLines!='' && form.controls.environment!='' && form.controls.telephoneServiceLine!=''){
      var c = form.controls.groundFlashDensity.value*form.controls.structureAttributes.controls[0].controls.collAreaOfNearLines.value*form.controls.structureAttributes.controls[0].controls.typeOfPowerLines.value*form.controls.environment.value*form.controls.telephoneServiceLine.value*0.000001;
      form.controls.structureAttributes.controls[0].controls.eventNearThePowerLines.setValue(c);
    }
    else{
      form.controls.structureAttributes.controls[0].controls.eventNearThePowerLines.setValue('');
    }
    // No. fo dangerous event on the lines
    if(form.controls.groundFlashDensity!='' && form.controls.structureAttributes.controls[0].controls.collAreaOfPowerLines!='' && form.controls.structureAttributes.controls[0].controls.typeOfPowerLines!='' && form.controls.environment!='' && form.controls.telephoneServiceLine!=''){
      var d = form.controls.groundFlashDensity.value*form.controls.structureAttributes.controls[0].controls.collAreaOfPowerLines.value*form.controls.structureAttributes.controls[0].controls.typeOfPowerLines.value*form.controls.environment.value*form.controls.telephoneServiceLine.value*0.000001;
      form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines.setValue(d);
    }
    else{
      form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines.setValue('');
    }
  }
  // Math for Length Of Telecom Lines 
  lengthOfTelecomLines(event:any, form:any){
    // Collection Area Of The Telecom Lines && Collection Area Near The Telecom Lines
    let arr = form.controls.structureAttributes.controls[0].controls.lengthOfTelecomLines.value;
    if(form.controls.structureAttributes.controls[0].controls.lengthOfTelecomLines!=''){
      var a = 40*arr;
      var b = 4000*arr;
      form.controls.structureAttributes.controls[0].controls.collAreaOfTelecomLines.setValue(a);
      form.controls.structureAttributes.controls[0].controls.collNearOfTelecomLines.setValue(b); 
    }
    else{
      form.controls.structureAttributes.controls[0].controls.collAreaOfTelecomLines.setValue('');
      form.controls.structureAttributes.controls[0].controls.collNearOfTelecomLines.setValue('');
    }
    // No of Dangerous Event Near The Telecom Lines
    if(form.controls.groundFlashDensity!='' && form.controls.structureAttributes.controls[0].controls.collNearOfTelecomLines!='' && form.controls.structureAttributes.controls[0].controls.typeOfTelecomLines!='' && form.controls.environment!='' && form.controls.telephoneServiceLine!=''){
      var c = form.controls.groundFlashDensity.value*form.controls.structureAttributes.controls[0].controls.collNearOfTelecomLines.value*form.controls.structureAttributes.controls[0].controls.typeOfTelecomLines.value*form.controls.environment.value*form.controls.telephoneServiceLine.value*0.000001;
      form.controls.structureAttributes.controls[0].controls.eventNearTheTelecomeLines.setValue(c);
    }
    else{
      form.controls.structureAttributes.controls[0].controls.eventNearTheTelecomeLines.setValue('');
    }
    // No of Dangerous Event On The Telecom Lines
    if(form.controls.groundFlashDensity!='' && form.controls.structureAttributes.controls[0].controls.collAreaOfTelecomLines!='' && form.controls.structureAttributes.controls[0].controls.typeOfTelecomLines!='' && form.controls.environment!='' && form.controls.telephoneServiceLine!=''){
      var d = form.controls.groundFlashDensity.value*form.controls.structureAttributes.controls[0].controls.collAreaOfTelecomLines.value*form.controls.structureAttributes.controls[0].controls.typeOfTelecomLines.value*form.controls.environment.value*form.controls.telephoneServiceLine.value*0.000001;
      form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines.setValue(d);
    }
    else{
      form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines.setValue('');
    }
  }

  // Math for LOSS OF HUMAN LIFE (L1)
  lossHumanLifeL1(event:any, form:any){
    // Loss due to injury to living beings by electric shock
    if(form.controls.structureAttributes.controls[0].controls.stTypeOfFloorSurface!='' && form.controls.noOfPeopleInZone!='' && form.controls.noOfPeopleInBuilding!='' && form.controls.yearPeoplePresentBuilding!=''){
      var a =form.controls.structureAttributes.controls[0].controls.stTypeOfFloorSurface.value*0.01*form.controls.noOfPeopleInZone.value/form.controls.noOfPeopleInBuilding.value*form.controls.yearPeoplePresentBuilding.value/8760;
      form.controls.losses.controls[0].controls.humanLossOfInjuryOfElectricShock.setValue(a);
    }
    else{
      form.controls.losses.controls[0].controls.humanLossOfInjuryOfElectricShock.setValue('');
    }
    // Loss due to physical damage 
    if(form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasure!='' && form.controls.structureAttributes.controls[0].controls.stRiskOfFire!='' && form.controls.losses.controls[0].controls.hazardClassification!='' && form.controls.losses.controls[0].controls.serToPubfailureOfInternalSystem!='' && form.controls.noOfPeopleInZone!='' && form.controls.noOfPeopleInBuilding!='' && form.controls.yearPeoplePresentBuilding!=''){
      var b = form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasure.value*form.controls.structureAttributes.controls[0].controls.stRiskOfFire.value*form.controls.losses.controls[0].controls.hazardClassification.value*form.controls.losses.controls[0].controls.serToPubfailureOfInternalSystem.value*form.controls.noOfPeopleInZone.value/form.controls.noOfPeopleInBuilding.value*form.controls.yearPeoplePresentBuilding.value/8760;

      form.controls.losses.controls[0].controls.humanLossOfPhysicalDamageL1.setValue(b);
    }
    else{
      form.controls.losses.controls[0].controls.humanLossOfPhysicalDamageL1.setValue('');
    }
    // Loss due to failure of internal systems 
    if(form.controls.losses.controls[0].controls.serToPubfailureOfInternalSystem!='' && form.controls.noOfPeopleInZone!='' && form.controls.noOfPeopleInBuilding!='' && form.controls.yearPeoplePresentBuilding!=''){
      var c = form.controls.losses.controls[0].controls.serToPubfailureOfInternalSystem.value*form.controls.noOfPeopleInZone.value/form.controls.noOfPeopleInBuilding.value*form.controls.yearPeoplePresentBuilding.value/8760;
      
      form.controls.losses.controls[0].controls.humanLossOffailureOfInternalSystemL1.setValue(c);
    }
    else{
      form.controls.losses.controls[0].controls.humanLossOffailureOfInternalSystemL1.setValue('');
    }
  }

  // Math for LOSS OF SERVICE TO PUBLIC (L2)
  lossServiceToPublicL2(event:any, form:any){
    // Loss due to physical damage 
    if(form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasure!='' && form.controls.structureAttributes.controls[0].controls.stRiskOfFire!='' && form.controls.losses.controls[0].controls.culHerOfPhysicalDamage!='' && form.controls.noOfPeopleInZone!='' && form.controls.noOfPeopleInBuilding!=''){
      
      var a = form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasure.value*form.controls.structureAttributes.controls[0].controls.stRiskOfFire.value*form.controls.losses.controls[0].controls.culHerOfPhysicalDamage.value*form.controls.noOfPeopleInZone.value/form.controls.noOfPeopleInBuilding.value;

      form.controls.losses.controls[0].controls.serToPubPhysicalDamageL1.setValue(a);
    }
    else{
      form.controls.losses.controls[0].controls.serToPubPhysicalDamageL1.setValue('');
    }
    // Loss due to failure of internal systems 
    if(form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystem!='' && form.controls.noOfPeopleInZone!='' && form.controls.noOfPeopleInBuilding!=''){
      var b = form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystem.value*form.controls.noOfPeopleInZone.value/form.controls.noOfPeopleInBuilding.value;

      form.controls.losses.controls[0].controls.serToPubfailureOfInternalSystemL1.setValue(b);
    }
    else{
      form.controls.losses.controls[0].controls.serToPubfailureOfInternalSystemL1.setValue('');
    }

    // Math for LOSS OF CULTURAL HERITAGE (L3)
    if(form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasure!='' && form.controls.structureAttributes.controls[0].controls.stRiskOfFire!='' && form.controls.losses.controls[0].controls.culHerOfPhysicalDamage!=''){
      var a = form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasure.value*form.controls.structureAttributes.controls[0].controls.stRiskOfFire.value*form.controls.losses.controls[0].controls.culHerOfPhysicalDamage.value*1/1;

      form.controls.losses.controls[0].controls.culHerOfPhysicalDamageL1.setValue(a);
    }
    else{
      form.controls.losses.controls[0].controls.culHerOfPhysicalDamageL1.setValue('');
    }
  }

  // Math for ECONOMIC LOSS (L4)
  economicLossL4(event:any, form:any){
    // Loss due to injury to living beings by electric shock
    if(form.controls.structureAttributes.controls[0].controls.stTypeOfFloorSurface!=''){
      var a = form.controls.structureAttributes.controls[0].controls.stTypeOfFloorSurface.value*0.01*1/1;
      form.controls.losses.controls[0].controls.ecoLossOfInjuryOfElectricShock.setValue(a);
    }
    else{
      form.controls.losses.controls[0].controls.ecoLossOfInjuryOfElectricShock.setValue("");
    }
    // Loss due to physical damage 
    if(form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasure!='' && form.controls.structureAttributes.controls[0].controls.stRiskOfFire!='' && form.controls.losses.controls[0].controls.culHerOfPhysicalDamage!=''){
      var b = form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasure.value*form.controls.structureAttributes.controls[0].controls.stRiskOfFire.value*form.controls.losses.controls[0].controls.culHerOfPhysicalDamage.value*(1+1+1+1)/1;
      form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageL1.setValue(b);
    }
    else{
      form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageL1.setValue("");
    }
    // Loss due to failure of internal systems 
    if(form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystem!=''){
      var c = form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystem.value*1/1;
      form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1.setValue(c);
    } 
    else{
      form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1.setValue("");
    }
  }
  
  shielding(event:any, form:any){
    let a:any = [];
    a = (form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolation.value).split(',');
    console.log(a);
    
    // PROTECTION CALCULATION COMES HERE...
    // protectionPEB:new FormControl(''),
    // protectionPMS:new FormControl(''),
    // protectionPM:new FormControl(''),
    // protectionPA:new FormControl(''),
    // protectionPC:new FormControl(''),
    // protectionPU:new FormControl(''),
    // protectionPV:new FormControl(''),
    // protectionPW:new FormControl(''),
    // protectionPZ:new FormControl(''),

  }

  onKeyForm(e: any) {

  }

  onChangeForm(e: any) {

  }

  closeModalDialog() {
    if (this.errorMsg != '') {
      this.Error = false;
      this.modalService.dismissAll((this.errorMsg = ''));
    } else {
      this.popup1 = false;
      this.success = false;
      this.modalService.dismissAll((this.successMsg = ''));
    }
  }

  gotoNextModal(contents: any,content:any) {
    if (this.step2Form.invalid) {
      this.validationError = true;
      this.validationErrorMsg = 'Please check all the fields';
      setTimeout(() => {
        this.validationError = false;
      }, 3000);
      return;
    }
    
    //  Update and Success msg will be showing
    if(this.step2Form.dirty && this.step2Form.touched){
      this.modalService.open(content, { centered: true,backdrop: 'static' });
    }
    //  For Dirty popup
    else{
      this.modalService.open(contents, { centered: true,backdrop: 'static' });
    }   
  }

  goToRiskPopup(popup1:any){
    if(this.step2Form.dirty && this.step2Form.touched){
      this.modalService.open(popup1, { centered: true,backdrop: 'static' });
    }
    else{
      this.modalService.open(popup1, { centered: true,backdrop: 'static' });
    } 
  }

  fireRiskDropDown(event:any,form:any){
    // Explosion
    if(event.target.value == "Zones 0, 20 and solid explosive"){
      form.controls.structureAttributes.controls[0].controls.stRiskOfFire.setValue('1');
    } 
    else if(event.target.value == "Zones 1, 21"){
      form.controls.structureAttributes.controls[0].controls.stRiskOfFire.setValue('0.1');
    }
    else if(event.target.value == "Zones 2, 22"){
      form.controls.structureAttributes.controls[0].controls.stRiskOfFire.setValue('0.001');
    }
    // Fire
    else if(event.target.value == "High"){
      form.controls.structureAttributes.controls[0].controls.stRiskOfFire.setValue('1');
    } 
    else if(event.target.value == "Ordinary"){
      form.controls.structureAttributes.controls[0].controls.stRiskOfFire.setValue('0.1');
    }
    else if(event.target.value == "Low"){
      form.controls.structureAttributes.controls[0].controls.stRiskOfFire.setValue('0.001');
    }
    // None
    else if(event.target.value == "None"){
      form.controls.structureAttributes.controls[0].controls.stRiskOfFire.setValue('0');
    }
    this.modalService.dismissAll();
  }

  retriveRiskDetails(){
    this.proceedFlag = false;
    this.riskAssessmentService.retriveRiskAssessmentDetails(this.router.snapshot.paramMap.get('email') || '{}',this.riskAssessmentDetails.riskId).subscribe(
      data => {
        if (JSON.parse(data)[0] != undefined && JSON.parse(data)[0].riskId != null) {
          this.updateRiskDetails(this.riskAssessmentDetails.userName,this.riskId,data);
        }
      },
      error => {
      }
    );  
  }

  updateRiskDetails(userName: any, riskId: any, data:any){
    this.proceedFlag = false;
    let list = JSON.parse(data);
    this.step2List = list[0];
      this.riskAssessmentDetails.riskId = riskId;
      this.riskAssessmentDetails.createdBy = this.step2List.createdBy;
      this.riskAssessmentDetails.createdDate = this.step2List.createdDate;
      this.riskAssessmentDetails.userName = this.step2List.userName;
      this.riskAssessmentDetails.userName = this.step2List.updatedDate;
      this.riskAssessmentDetails.userName = this.step2List.updatedBy;
      this.riskAssessmentRetrieve(this.step2List);
      this.flag = true;
  }

  riskAssessmentRetrieve(item:any){
    this.popArray.push(this.structureCharactersFormRtr(item,this.step2Form));
    this.step2Form.setControl('structureCharacters', this.formBuilder.array(this.popArray || []));
    this.popArray = [];
  }

  onSubmit(flag:any) {
    this.submitted=true;
      if (this.step2Form.invalid) {
        return;
      }
    //  this.spinner = true;
     this.popup=false;
    // this.riskAssessmentDetails = this.step2Form.value;
    // if(this.riskAssessmentDetails.structureCharacteristics[0].typeOfBuilding == 'Brick'){
    //   this.riskAssessmentDetails.structureCharacteristics[0].typeOfBuilding=this.brick;
    // }
    // else if(this.riskAssessmentDetails.structureCharacteristics[0].typeOfBuilding == 'RCC with Brick'){
    //   this.riskAssessmentDetails.structureCharacteristics[0].typeOfBuilding=this.rccwithBrick;
    // }
    // else if(this.riskAssessmentDetails.structureCharacteristics[0].typeOfBuilding == 'PEB with sheet'){
    //   this.riskAssessmentDetails.structureCharacteristics[0].typeOfBuilding=this.pebwithsheet;
    // }
    // else if(this.riskAssessmentDetails.structureCharacteristics[0].typeOfBuilding == 'System designed by CAPE RCC building'){
    //   this.riskAssessmentDetails.structureCharacteristics[0].typeOfBuilding=this.rccbuilding;
    // }
    // else if(this.riskAssessmentDetails.structureCharacteristics[0].typeOfBuilding == 'System designed by CAPE PEB building'){
    //   this.riskAssessmentDetails.structureCharacteristics[0].typeOfBuilding=this.pebbuilding;
    // }
    
    this.riskAssessmentDetails = this.step2Form.value.structureCharacters[0];
    this.riskAssessmentDetails.riskId = this.riskGlobal.riskId;
    this.riskAssessmentDetails.userName = this.router.snapshot.paramMap.get('email') || '{}';

    if (!this.validationError) {
      if(flag) {
        if(this.step2Form.dirty && this.step2Form.touched){ 
            this.riskAssessmentService.updateRiskAssessmentDetails(this.riskAssessmentDetails).subscribe(
            data => {
              // update success msg
              this.popup=true;
              this.success1 = false;
              this.success=true;
              this.successMsg=data;
              this.step2Form.markAsPristine();
              this.retriveRiskDetails();
              this.proceedNext.emit(true);
              
            },
              // update failed msg
            error => {
               this.popup=true;
              //  this.spinner=false;
              this.success1 = false;
              this.Error = true;
              this.errorArr = [];
              this.errorArr = JSON.parse(error.error);
              this.errorMsg = this.errorArr.message;
              this.proceedNext.emit(false);
            }
          )}
          else{
             this.popup=true;
            //  this.spinner=false;
            // Preview fields
            if(this.isEditable){
               this.success = true;
               this.proceedNext.emit(true);
            }
  
            else{
               this.popup=true;
              //  this.spinner=false;
              // Dirty checking here
               this.success = true;
               this.proceedNext.emit(true);
            }
          }
      }
      else {
        this.riskAssessmentService.addRiskAssessmentDetails(this.riskAssessmentDetails).subscribe(
          data => {
            this.popup=true;
            this.proceedFlag=false;
            this.success=true;
            // this.successMsg = "Risk Assessment Details Successfully Saved";
            this.successMsg=data;
            // this.updateRiskDetails(JSON.parse(data));
            this.retriveRiskDetails();
            this.disable = true;
            this.step2Form.markAsPristine();
          },
          error => {
             this.popup=true;
            //  this.spinner=false;
            this.Error = true;
            this.errorArr = [];
            this.proceedFlag = true;
            this.errorArr = JSON.parse(error.error);
            this.errorMsg = this.errorArr.message;
            this.proceedNext.emit(false); 
          })
        }
      }
  }

}
