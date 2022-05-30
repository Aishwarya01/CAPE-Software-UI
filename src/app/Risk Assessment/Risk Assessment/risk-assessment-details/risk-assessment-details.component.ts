import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { arrow90DegDown } from 'ngx-bootstrap-icons';
import { RiskAssessmentDetails } from '../../Risk Assesment Model/risk-assessment-details';
import { RiskAssessmentDetailsServiceService } from '../../Risk Assessment Services/risk-assessment-details-service.service';

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
  showFlashDensity: boolean= true;
  errorMsg: string='';
  successMsg: string='';
  Error: boolean=false;
  success: boolean=false;
  // FormArray Name List
  structureAttributes!: FormArray;
  losses!: FormArray;
  structureCharacters!: FormArray;
  heightnear:any=[];
  popup1: boolean=false;
  // brick: String='1';
  // rccwithBrick: String='0.5';
  // pebwithsheet: String='0.2';
  // rccbuilding: String='0.2';
  // pebbuilding: String='0.001';

  constructor(private router: ActivatedRoute,
              private formBuilder: FormBuilder,
              private modalService: NgbModal,
              private riskAssessmentService: RiskAssessmentDetailsServiceService
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
    SerToPubPhysicalDamage: new FormControl('',[Validators.required]),
    serToPubfailureOfInternalSystem: new FormControl('',[Validators.required]),
    SerToPubPhysicalDamageL1: new FormControl('',[Validators.required]),
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

    protectionPEB:new FormControl(''),
    protectionPMS:new FormControl(''),
    protectionPM:new FormControl(''),
    protectionPA:new FormControl(''),
    protectionPC:new FormControl(''),
    protectionPU:new FormControl(''),
    protectionPV:new FormControl(''),
    protectionPW:new FormControl(''),
    protectionPZ:new FormControl(''),
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
    }
    else{
      form.controls.adjacentLength.setValue('');
      form.controls.adjacentWidth.setValue('');
      form.controls.adjacentHeight.setValue('');
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

      form.controls.losses.controls[0].controls.SerToPubPhysicalDamageL1.setValue(a);
    }
    else{
      form.controls.losses.controls[0].controls.SerToPubPhysicalDamageL1.setValue('');
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

  gotoNextModal(contents: any) {
    if (this.step2Form.invalid) {
      this.validationError = true;
      this.validationErrorMsg = 'Please check all the fields';
      setTimeout(() => {
        this.validationError = false;
      }, 3000);
      return;
    }
    
    //  Update and Success msg will be showing
    // if(this.step2Form.dirty && this.step2Form.touched){
    //   this.modalService.open(content, { centered: true,backdrop: 'static' });
    // }
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


  onSubmit() {
    this.submitted=true;
    if (this.step2Form.invalid) {
      return;
    }
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
  }

}
