import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { arrow90DegDown } from 'ngx-bootstrap-icons';
import { RiskAssessmentDetailsServiceService } from '../../Risk Assessment Services/risk-assessment-details-service.service';

@Component({
  selector: 'app-risk-assessment-details',
  templateUrl: './risk-assessment-details.component.html',
  styleUrls: ['./risk-assessment-details.component.css']
})
export class RiskAssessmentDetailsComponent implements OnInit {
  step2Form!: FormGroup;
  panelOpenState = false;
  loading = false;
  submitted = false;
  validationError = false;
  validationErrorMsg = '';
  locationList: any= [];
  showFlashDensity: boolean= true;
  constructor(private router: ActivatedRoute,
              private formBuilder: FormBuilder,
              private riskAssessmentService: RiskAssessmentDetailsServiceService
  ) { }

  ngOnInit(): void {
    this.step2Form = this.formBuilder.group({
      location: [''],
      otherLocation: [''],
      groundFlashDensity: [''],
      typeOfBuilding: [''],
      structureScreeningEffectiveness: ['', Validators.required],
      internalScreeningEffectiveness: ['', Validators.required],
      protrusionLenght: ['', Validators.required],
      protrusionWidth: ['', Validators.required],
      protrusionHeight: ['', Validators.required],
      heighestRoofProtrusion: ['', Validators.required],
      collectionAreaOfStructure: ['', Validators.required],
      collAreaOfStrucWithProtrusion: ['', Validators.required],
      collAreaOfNearStructure: ['', Validators.required],
      heightNearByStructure: ['', Validators.required],
      telephoneServiceLine: ['', Validators.required],
      environment: ['', Validators.required],
      noOfDangerousEventOnStructure: ['', Validators.required],
      noOfDangerousEventNearStructure: ['', Validators.required],
      protectionPartOFBuilding: ['', Validators.required],
      protectionLenght: ['', Validators.required],
      protectionWidth: ['', Validators.required],
      protectionHeight: ['', Validators.required],
      protectionCollectionArea: ['', Validators.required],
      adjacentBuilding: ['', Validators.required],
      adjacentLength: ['', Validators.required],
      adjacentWidth: ['', Validators.required],
      adjacentHeight: ['', Validators.required],
      collAreaOfAdjacentStruc: ['', Validators.required],
      noOfDangEventOnAdjacentStruc: ['', Validators.required],
      noOfPeopleInBuilding: ['', Validators.required],
      noOfPeopleInZone: ['', Validators.required],
      dayPeoplePresentBuilding: ['', Validators.required],
      yearPeoplePresentBuilding: ['', Validators.required],
      structureAttributes:  this.formBuilder.array([this.createStructureAttributesForm()]),
      losses: this.formBuilder.array([this.createLossesForm()]),

    });

    this.locationList = [];
    this.riskAssessmentService.fetchLocation().subscribe(
      data=> {
        this.locationList = JSON.parse(data);
      }
    )
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

  getStructureAttributesControls(): AbstractControl[] {
    return (<FormArray> this.step2Form.get('structureAttributes')).controls
  }
  getLossesControls(): AbstractControl[] {
    return (<FormArray> this.step2Form.get('losses')).controls
  }

  changeLocation(e: any) {
    let selectedValue = e.target.value;
    for(let i of this.locationList) {
      if(i.location == selectedValue) {
        this.f.groundFlashDensity.setValue(i.gfdValue);
        this.showFlashDensity = true;
      }
      if(selectedValue == 'Others') {
        this.f.groundFlashDensity.setValue('');
        this.showFlashDensity = false;
      }
    }
  }

  onKeyForm(e: any) {

  }

  onChangeForm(e: any) {

  }

  get f():any {
    return this.step2Form.controls;
  }

  submit() {

  }

}
