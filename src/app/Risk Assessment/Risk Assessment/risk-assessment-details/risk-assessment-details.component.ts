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
  buildingType: any=[];
  // FormArray Name List
  structureAttributes!: FormArray;
  losses!: FormArray;
  structureCharacters!: FormArray;
  brick: String='1';
  rccwithBrick: String='0.5';
  pebwithsheet: String='0.2';
  rccbuilding: String='0.2';
  pebbuilding: String='0.001';

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
  // Math for Collection area near the structure


  onKeyForm(e: any) {

  }

  onChangeForm(e: any) {

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
