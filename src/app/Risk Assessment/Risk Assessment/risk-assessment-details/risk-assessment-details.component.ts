import { UpperCasePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { arrow90DegDown } from 'ngx-bootstrap-icons';
import { from, Observable } from 'rxjs';
import { GlobalsService } from 'src/app/globals.service';
import { RiskAssessmentDetails } from '../../Risk Assesment Model/risk-assessment-details';
import { RiskAssessmentDetailsServiceService } from '../../Risk Assessment Services/risk-assessment-details-service.service';
import { RiskfinalpdfService } from '../../Risk Assessment Services/riskfinalpdf.service';
import { RiskglobalserviceService } from '../../riskglobalservice.service';
import { RiskParentComponentComponent } from '../risk-parent-component/risk-parent-component.component';

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
  tabError: boolean = false;
  tabErrorMsg: string = "";
  isRiskFormUpdated: boolean =false;

  spinner: boolean=false;
  spinnerValue: String = '';
  disablepage: boolean=true;
  mode: any= 'indeterminate';

  blurMode: boolean=false;
  blurMsg: string="";
  locationDrop: boolean=false;

  validationErrorTab: boolean=false;
  validationErrorMsgTab: string='';

  updateButton: boolean=false;
  saveButton: boolean=true;
  riskInputValue: any;
  enablePrint: boolean = false;
  projectName: any = '';
  originalData: any = [];
  printDirtyMsg: string="";
  printMsg: boolean=false;
  printMsg1: any;

  printSuccessMsg: String="";
  printErrorMsg: String="";
  printPopup: boolean=false;

  // Print Pdf purpose
  successPdf: boolean=false;
  errorPdf: boolean=false;

  @Output() migrationData = new EventEmitter<any>();

  constructor(private router: ActivatedRoute,
              private formBuilder: FormBuilder,
              private modalService: NgbModal,
              private riskAssessmentService: RiskAssessmentDetailsServiceService,
              public riskGlobal: RiskglobalserviceService, 
              public service: GlobalsService,
              private riskfinalpdfService: RiskfinalpdfService
  ) { }

  ngOnInit(): void {

    // Fetching location list 
    this.locationList = [];
    this.riskAssessmentService.fetchLocation().subscribe(
      data=> {
        this.originalData = JSON.parse(data);
        this.locationList = [];
        for(let i of this.originalData){
          if(i.location == 'Others') {
            this.locationList.push(i);
          }
        }

        for(let j of this.originalData) {
          if(j.location != 'Others') {
            this.locationList.push(j);
          }
        }
        
       // this.locationList = JSON.parse(data);
      })

    this.step2Form = this.formBuilder.group({
      structureCharacters: this.formBuilder.array([this.structureCharactersForm()])
    });

    setTimeout(() => {
      debugger
      this.migratedData('',this.step2Form);
    }, 4000);
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
      riskOfFireData: new FormControl(''),
      typeOFbuildingdrop: new FormControl(''),
      typeOFbuildingdrop1: new FormControl(''),

      // This below formcontrols for dropdown purpose, we will send string inteed of numbers
      heightNearByStructureDrop: new FormControl(''),
      telephoneServiceLineDrop: new FormControl(''),
      environmentDrop: new FormControl(''),

      structureAttributes: this.formBuilder.array([this.createStructureAttributesForm()]),
      losses: this.formBuilder.array([this.createLossesForm()]),
      protection: this.formBuilder.array([this.protectionForm()]),
      riskProtection: this.formBuilder.array([this.riskProtectionForm()]),
      calculatedRisk: this.formBuilder.array([this.calculatedRiskForm()])
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
        
        // This below formcontrols for dropdown purpose, we will send string inteed of numbers
        stTypeOfFloorSurfaceDrop: new FormControl(''),
        stAdditionalProtectionDrop: new FormControl(''),
        stFireProtectionMeasureDrop: new FormControl(''),
        stTypeOfInternalWiringDrop: new FormControl(''),
        typeOfPowerLinesDrop: new FormControl(''),
        shieldingGroundingIsolationDrop: new FormControl(''),
        typeOfTelecomLinesDrop: new FormControl(''),
        shieldingGroundingIsolationL1Drop: new FormControl(''),
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
    
    // This below formcontrols for dropdown purpose, we will send string inteed of numbers
    hazardClassificationDrop: new FormControl(''),
    humanLossOfphysicalDamageDrop: new FormControl(''),
    humanLossOffailureOfInternalSystemDrop: new FormControl(''),
    serToPubPhysicalDamageDrop: new FormControl(''),
    serToPubfailureOfInternalSystemDrop: new FormControl(''),
    culHerOfPhysicalDamageDrop: new FormControl(''),
    ecoLossOfPhysicalDamageDrop: new FormControl(''),
    ecoLossOfFailureOfInternalSystemDrop: new FormControl(''),
    classOfLPSDrop: new FormControl(''),
    classOfSPDDrop:new FormControl('')
    })
  }

  private protectionForm(): FormGroup {
    return new FormGroup({
      // Loss of Human Life
      // protectionId: new FormControl(''),
      protectionPEB: new FormControl(''),
      protectionPMS: new FormControl(''),
      protectionPM: new FormControl(''),
      protectionPA: new FormControl(''),
      protectionPC: new FormControl(''),
      protectionPU: new FormControl(''),
      protectionPV: new FormControl(''),
      protectionPW: new FormControl(''),
      protectionPZ: new FormControl(''),

      // RISK OF LOSS OF HUMAN BEINGS (R1)	
      riskProtectionRA1: new FormControl(''),
      riskProtectionRB1: new FormControl(''),
      riskProtectionRC1: new FormControl(''),
      riskProtectionRM1: new FormControl(''),
      riskProtectionRU1: new FormControl(''),
      riskProtectionRV1: new FormControl(''),
      riskProtectionRW1: new FormControl(''),
      riskProtectionRZ1: new FormControl(''),
    
      // RB2
      riskProtectionRB2: new FormControl(''),

      // RISK OF LOSS OF CULTURAL HERITAGE (R3)
      culturalRB: new FormControl(''),
      culturalRV: new FormControl(''),

    })
  }

  private riskProtectionForm(): FormGroup {
    return new FormGroup({
      // riskProtectionId: new FormControl(''),
      riskProtectionRC2: new FormControl(''),
      riskProtectionRM2: new FormControl(''),
      riskProtectionRV2: new FormControl(''),
      riskProtectionRW2: new FormControl(''),
      riskProtectionRZ2: new FormControl(''),

      // RISK OF LOSS OF ECONOMIC VALUE (R4), 
      // Insteed of the RA4 we gave econamicValueRA to econamicValueRZ upto RZ4
      
      econamicValueRA: new FormControl(''),
      econamicValueRB: new FormControl(''),
      econamicValueRC: new FormControl(''),
      econamicValueRM: new FormControl(''),
      econamicValueRU: new FormControl(''),
      econamicValueRV: new FormControl(''),
      econamicValueRW: new FormControl(''),
      econamicValueRZ: new FormControl(''),
    })
  }

  private calculatedRiskForm(): FormGroup {
    return new FormGroup({
      lossOfHumanLifeRT1: new FormControl('1.00E-05'),
      lossOfPublicSerivceRT2: new FormControl('1.00E-03'),
      lossOfCulturalHeritageRT3: new FormControl('1.00E-04'),
      economicLossRT4: new FormControl('1.00E-03'),

      riskProtectionR1: new FormControl(''),
      riskProtectionR2: new FormControl(''),
      riskProtectionR3: new FormControl(''),
      riskProtectionR4: new FormControl(''),

      riskProtectionRD1: new FormControl(''),
      riskProtectionRD2: new FormControl(''),
      riskProtectionRD3: new FormControl(''),
      riskProtectionRD4: new FormControl(''),

      riskProtectionRI1: new FormControl(''),
      riskProtectionRI2: new FormControl(''),
      riskProtectionRI3: new FormControl(0),
      riskProtectionRI4: new FormControl(''),
    })
  }

  // Retrieve purpose
  structureCharactersFormRtr(item: any, form:any): FormGroup {
    this.getLocation=item.location;
    return this.formBuilder.group({
      structureCharacteristicsId: new FormControl({ disabled: false, value: item.structureCharacteristicsId }),
      projectName: new FormControl({ disabled: false, value: item.projectName }),
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
      
      explosion: new FormControl(''),
      explosion1: new FormControl(''),
      fire: new FormControl(''),
      none: new FormControl(''),
      riskOfFireData: new FormControl(''),
      typeOFbuildingdrop: new FormControl(''),
      typeOFbuildingdrop1: new FormControl(''),
      heightNearByStructureDrop: new FormControl(''),
      telephoneServiceLineDrop: new FormControl(''),
      environmentDrop: new FormControl(''),

      structureAttributes: this.formBuilder.array(this.structureAttributesID(item)),
      losses: this.formBuilder.array(this.lossesID(item)),
      protection: this.formBuilder.array(this.protectionID(item)),
      riskProtection: this.formBuilder.array(this.riskProtectionID(item)),
      calculatedRisk: this.formBuilder.array(this.calculatedRiskID(item)),
    });
  }

  structureAttributesID(item:any){
    let structureAttributes=[];
    for(let value of item.structureAttributes){
     structureAttributes.push(this.createStructureAttributesFormRtr(value));
    
    }
   if(structureAttributes.length == 0){
    structureAttributes.push(this.createStructureAttributesForm());
   }
    return structureAttributes;
  }

  lossesID(item:any):any[]{
    let losses=[];
    for(let value of item.losses){
      losses.push(this.createLossesFormRtr(value));
    }
    if(losses.length == 0){
      losses.push(this.createLossesForm());
     }
    return losses;
  }

  protectionID(item:any):any[]{
    let protection=[];
    for(let value of item.protection){
      protection.push(this.protectionRtr(value));
    }
    if(protection.length == 0){
      protection.push(this.protectionForm());
     }
    return protection;
  }

  riskProtectionID(item:any):any[]{
    let riskProtection=[];
    for(let value of item.riskProtection){
      riskProtection.push(this.riskProtectionRtr(value));
    }
    if(riskProtection.length == 0){
      riskProtection.push(this.riskProtectionForm());
     }
    return riskProtection;
  }

  calculatedRiskID(item:any):any[]{
    let calculatedRisk=[];
    for(let value of item.calculatedRisk){
      calculatedRisk.push(this.calculatedRiskRtr(value));
    }
    if(calculatedRisk.length == 0){
      calculatedRisk.push(this.createLossesForm());
     }
    return calculatedRisk;
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

        stTypeOfFloorSurfaceDrop: new FormControl(''),
        stAdditionalProtectionDrop: new FormControl(''),
        stFireProtectionMeasureDrop: new FormControl(''),
        stTypeOfInternalWiringDrop: new FormControl(''),
        typeOfPowerLinesDrop: new FormControl(''),
        shieldingGroundingIsolationDrop: new FormControl(''),
        typeOfTelecomLinesDrop: new FormControl(''),
        shieldingGroundingIsolationL1Drop: new FormControl(''),
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

      hazardClassificationDrop: new FormControl(''),
      humanLossOfphysicalDamageDrop: new FormControl(''),
      humanLossOffailureOfInternalSystemDrop: new FormControl(''),
      serToPubPhysicalDamageDrop: new FormControl(''),
      serToPubfailureOfInternalSystemDrop: new FormControl(''),
      culHerOfPhysicalDamageDrop: new FormControl(''),
      ecoLossOfPhysicalDamageDrop: new FormControl(''),
      ecoLossOfFailureOfInternalSystemDrop: new FormControl(''),
      classOfLPSDrop: new FormControl(''),
      classOfSPDDrop:new FormControl('')
    })
  }

  protectionRtr(item: any): FormGroup{
    return this.formBuilder.group({
      protectionId: new FormControl({ disabled: false, value: item.protectionId }),
      protectionPEB: new FormControl({ disabled: false, value: item.protectionPEB }),
      protectionPMS: new FormControl({ disabled: false, value: item.protectionPMS }),
      protectionPM: new FormControl({ disabled: false, value: item.protectionPM }),
      protectionPA: new FormControl({ disabled: false, value: item.protectionPA }),
      protectionPC: new FormControl({ disabled: false, value: item.protectionPC }),
      protectionPU: new FormControl({ disabled: false, value: item.protectionPU }),
      protectionPV: new FormControl({ disabled: false, value: item.protectionPV }),
      protectionPW: new FormControl({ disabled: false, value: item.protectionPW }),
      protectionPZ: new FormControl({ disabled: false, value: item.protectionPZ }),
      // RISK OF LOSS OF HUMAN BEINGS (R1)	
      riskProtectionRA1: new FormControl({ disabled: false, value: item.riskProtectionRA1 }),
      riskProtectionRB1: new FormControl({ disabled: false, value: item.riskProtectionRB1 }),
      riskProtectionRC1: new FormControl({ disabled: false, value: item.riskProtectionRC1 }),
      riskProtectionRM1: new FormControl({ disabled: false, value: item.riskProtectionRM1 }),
      riskProtectionRU1: new FormControl({ disabled: false, value: item.riskProtectionRU1 }),
      riskProtectionRV1: new FormControl({ disabled: false, value: item.riskProtectionRV1 }),
      riskProtectionRW1: new FormControl({ disabled: false, value: item.riskProtectionRW1 }),
      riskProtectionRZ1: new FormControl({ disabled: false, value: item.riskProtectionRZ1 }),
      riskProtectionRB2: new FormControl({ disabled: false, value: item.riskProtectionRB2 }),

      culturalRB: new FormControl({ disabled: false, value: item.culturalRB }),
      culturalRV: new FormControl({ disabled: false, value: item.culturalRV }),
    })
  }

  riskProtectionRtr(item: any): FormGroup{
    return this.formBuilder.group({
      riskProtectionId: new FormControl({ disabled: false, value: item.riskProtectionId }),

      riskProtectionRC2: new FormControl({ disabled: false, value: item.riskProtectionRC2 }),
      riskProtectionRM2: new FormControl({ disabled: false, value: item.riskProtectionRM2 }),
      riskProtectionRV2: new FormControl({ disabled: false, value: item.riskProtectionRV2 }),
      riskProtectionRW2: new FormControl({ disabled: false, value: item.riskProtectionRW2 }),
      riskProtectionRZ2: new FormControl({ disabled: false, value: item.riskProtectionRZ2 }),

      econamicValueRA: new FormControl({ disabled: false, value: item.econamicValueRA }),
      econamicValueRB: new FormControl({ disabled: false, value: item.econamicValueRB }),
      econamicValueRC: new FormControl({ disabled: false, value: item.econamicValueRC }),
      econamicValueRM: new FormControl({ disabled: false, value: item.econamicValueRM }),
      econamicValueRU: new FormControl({ disabled: false, value: item.econamicValueRU }),
      econamicValueRV: new FormControl({ disabled: false, value: item.econamicValueRV }),
      econamicValueRW: new FormControl({ disabled: false, value: item.econamicValueRW }),
      econamicValueRZ: new FormControl({ disabled: false, value: item.econamicValueRZ }),
    })
  }

  calculatedRiskRtr(item: any): FormGroup{
    return this.formBuilder.group({
      calculatedRiskId: new FormControl({ disabled: false, value: item.calculatedRiskId }),

      lossOfHumanLifeRT1: new FormControl({ disabled: false, value: item.lossOfHumanLifeRT1 }),
      lossOfPublicSerivceRT2: new FormControl({ disabled: false, value: item.lossOfPublicSerivceRT2 }),
      lossOfCulturalHeritageRT3: new FormControl({ disabled: false, value: item.lossOfCulturalHeritageRT3 }),
      economicLossRT4: new FormControl({ disabled: false, value: item.economicLossRT4 }),

      riskProtectionRD1: new FormControl({ disabled: false, value: item.riskProtectionRD1 }),
      riskProtectionRD2: new FormControl({ disabled: false, value: item.riskProtectionRD2 }),
      riskProtectionRD3: new FormControl({ disabled: false, value: item.riskProtectionRD3 }),
      riskProtectionRD4: new FormControl({ disabled: false, value: item.riskProtectionRD4 }),

      riskProtectionRI1: new FormControl({ disabled: false, value: item.riskProtectionRI1 }),
      riskProtectionRI2: new FormControl({ disabled: false, value: item.riskProtectionRI2 }),
      riskProtectionRI3: new FormControl({ disabled: false, value: item.riskProtectionRI3 }),
      riskProtectionRI4: new FormControl({ disabled: false, value: item.riskProtectionRI4 }),

      riskProtectionR1: new FormControl({ disabled: false, value: item.riskProtectionR1 }),
      riskProtectionR2: new FormControl({ disabled: false, value: item.riskProtectionR2 }),
      riskProtectionR3: new FormControl({ disabled: false, value: item.riskProtectionR3 }),
      riskProtectionR4: new FormControl({ disabled: false, value: item.riskProtectionR4 }),
    })
  }

  // Parent Array Controls:
  overAllControls(): AbstractControl[] {
    return (<FormArray>this.step2Form.get('structureCharacters')).controls;
  }
  getStructureAttributesControls(form: any) {
    return form.controls.structureAttributes?.controls;
  }
  getLossesControls(form:any) {
    return form.controls.losses?.controls;
  }
  getCalRiskControls(form:any) {
    return form.controls.calculatedRisk?.controls;
  }

  get f():any {
    return this.step2Form.controls;
  }

  changeLocation(e: any, form:any) {
    this.locationDrop=true;
    let selectedValue = e.target.value;
    this.getLocation='';
    this.spinner=true;
    this.blurMode=true;
    this.blurMsg="Please wait Loading...";
    setTimeout(()=>{
      for(let i of this.locationList) {
        if(i.location == selectedValue) {
          form.controls.groundFlashDensity.setValue(i.gfdValue);
          this.showFlashDensity = true;
          this.locationDrop=false;
          this.spinner=false;
          this.blurMode=false;
          this.blurMsg="";
        }
        if(selectedValue == 'Others') {
          form.controls.groundFlashDensity.setValue('');
          this.showFlashDensity = false;
        }
      }
    },3000);
  }

  // Height of Nearby Structure
  // Changing number into String for Pdf

  heightNearByStructureD(event:any,form:any){
      if(form.controls.heightNearByStructure.value == 'Lower than surrounding buildings'){
        form.controls.heightNearByStructureDrop.setValue("0.25");
      }
      else if(form.controls.heightNearByStructure.value == 'Similar in height'){
        form.controls.heightNearByStructureDrop.setValue("0.5");
      }
      else if(form.controls.heightNearByStructure.value == 'Tall/Isolated structure'){
        form.controls.heightNearByStructureDrop.setValue("1");
      }
  }

  telephoneServiceLineD(event:any,form:any){
    if(form.controls.telephoneServiceLine.value == 'LV power, telecommunication or data line'){
      form.controls.telephoneServiceLineDrop.setValue("1");
    }
    else if(form.controls.telephoneServiceLine.value == 'HV power (with HV/LV transformer)'){
      form.controls.telephoneServiceLineDrop.setValue("0.2");
    }
  }

  environmentD(event:any,form:any){
    if(form.controls.environment.value == 'Rural'){
      form.controls.environmentDrop.setValue("1");
    }
    else if(form.controls.environment.value == 'Suburban'){
      form.controls.environmentDrop.setValue("0.5");
    }
    else if(form.controls.environment.value == 'Urban'){
      form.controls.environmentDrop.setValue("0.1");
    }
    else if(form.controls.environment.value == 'Urban with tall buildings'){
      form.controls.environmentDrop.setValue("0.01");
    }
    else if(form.controls.environment.value == 'Exposed hilltop'){
      form.controls.environmentDrop.setValue("2");
    }
  }

  stTypeOfFloorSurfaceD(event:any,form:any){
    if(form.controls.structureAttributes.controls[0].controls.stTypeOfFloorSurface.value == 'Agricultural, concrete'){
      form.controls.structureAttributes.controls[0].controls.stTypeOfFloorSurfaceDrop.setValue("0.01");
    }
    else if(form.controls.structureAttributes.controls[0].controls.stTypeOfFloorSurface.value == 'Marble, Ceramic'){
      form.controls.structureAttributes.controls[0].controls.stTypeOfFloorSurfaceDrop.setValue("0.001");
    }
    else if(form.controls.structureAttributes.controls[0].controls.stTypeOfFloorSurface.value == 'Gravel, moquette, carpets'){
      form.controls.structureAttributes.controls[0].controls.stTypeOfFloorSurfaceDrop.setValue("0.0001");
    }
    else if(form.controls.structureAttributes.controls[0].controls.stTypeOfFloorSurface.value == 'Asphalt, linoleum, wood'){
      form.controls.structureAttributes.controls[0].controls.stTypeOfFloorSurfaceDrop.setValue("0.00001");
    }
  }

  stAdditionalProtectionD(event:any,form:any){
    if(form.controls.structureAttributes.controls[0].controls.stAdditionalProtection.value == 'No protection measures'){
      form.controls.structureAttributes.controls[0].controls.stAdditionalProtectionDrop.setValue("1");
    }
    else if(form.controls.structureAttributes.controls[0].controls.stAdditionalProtection.value == 'Warning notices'){
      form.controls.structureAttributes.controls[0].controls.stAdditionalProtectionDrop.setValue("0.1");
    }
    else if(form.controls.structureAttributes.controls[0].controls.stAdditionalProtection.value == 'Electrical Insulation'){
      form.controls.structureAttributes.controls[0].controls.stAdditionalProtectionDrop.setValue("0.01");
    }
    else if(form.controls.structureAttributes.controls[0].controls.stAdditionalProtection.value == 'Effective Soil eqiupotentialisation'){
      form.controls.structureAttributes.controls[0].controls.stAdditionalProtectionDrop.setValue("0.01");
    }
    else if(form.controls.structureAttributes.controls[0].controls.stAdditionalProtection.value == 'Physical restriction'){
      form.controls.structureAttributes.controls[0].controls.stAdditionalProtectionDrop.setValue("0");
    }
  }

  stFireProtectionMeasureD(event:any,form:any){
    if(form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasure.value == 'No provision'){
      form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasureDrop.setValue("1");
    }
    else if(form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasure.value == 'Manual'){
      form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasureDrop.setValue("0.5");
    }
    else if(form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasure.value == 'Automated system'){
      form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasureDrop.setValue("0.2");
    }
  }

  stTypeOfInternalWiringD(event:any,form:any){
    if(form.controls.structureAttributes.controls[0].controls.stTypeOfInternalWiring.value == 'Unshielded, improper routing'){
      form.controls.structureAttributes.controls[0].controls.stTypeOfInternalWiringDrop.setValue("1");
    }
    else if(form.controls.structureAttributes.controls[0].controls.stTypeOfInternalWiring.value == 'Unshielded, proper routing to avoid large loops'){
      form.controls.structureAttributes.controls[0].controls.stTypeOfInternalWiringDrop.setValue("0.2");
    }
    else if(form.controls.structureAttributes.controls[0].controls.stTypeOfInternalWiring.value == 'Unshielded, proper routing to avoid loops'){
      form.controls.structureAttributes.controls[0].controls.stTypeOfInternalWiringDrop.setValue("0.01");
    }
    else if(form.controls.structureAttributes.controls[0].controls.stTypeOfInternalWiring.value == 'Shielded cables running in metal conduits'){
      form.controls.structureAttributes.controls[0].controls.stTypeOfInternalWiringDrop.setValue("0.0001");
    }
  }

  typeOfPowerLinesD(event:any,form:any){
    if(form.controls.structureAttributes.controls[0].controls.typeOfPowerLines.value == 'Overhead'){
      form.controls.structureAttributes.controls[0].controls.typeOfPowerLinesDrop.setValue("1");
    }
    else if(form.controls.structureAttributes.controls[0].controls.typeOfPowerLines.value == '"U.G cable from Electricity supplier'){
      form.controls.structureAttributes.controls[0].controls.typeOfPowerLinesDrop.setValue("0.5");
    }
    else if(form.controls.structureAttributes.controls[0].controls.typeOfPowerLines.value == 'U.G cable from own transformer'){
      form.controls.structureAttributes.controls[0].controls.typeOfPowerLinesDrop.setValue("0.01");
    }
  }

  shieldingGroundingIsolationD(form:any){
    if(form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolation.value == 'TN-C-S system with PME'){
      form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationDrop.setValue("1,0.2");
    }
    else if(form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolation.value == 'Burried, shield not equipotentially bonded'){
      form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationDrop.setValue("1,0.3");
    }
    else if(form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolation.value == 'Overhead, shield not equipotentially bonded'){
      form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationDrop.setValue("1,0.1");
    }
    else if(form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolation.value == 'Burried, shield equipotentially bonded'){
      form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationDrop.setValue("1,0");
    }
    else if(form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolation.value == 'Overhead, shield equipotentially bonded'){
      form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationDrop.setValue("1,0");
    }
    else if(form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolation.value == 'Overhead, unknown bonding at line entrance'){
      form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationDrop.setValue("1,1");
    }
    else if(form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolation.value == 'No external line'){
      form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationDrop.setValue("0,0");
    }
    else if(form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolation.value == 'Designed by CAPE(large building with transformer and DG)'){
      form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationDrop.setValue("0,0");
    }
    this.shielding(event,form);
  }

  typeOfTelecomLinesD(event:any,form:any){
    if(form.controls.structureAttributes.controls[0].controls.typeOfTelecomLines.value == 'Overhead'){
      form.controls.structureAttributes.controls[0].controls.typeOfTelecomLinesDrop.setValue("1");
    }
    else if(form.controls.structureAttributes.controls[0].controls.typeOfTelecomLines.value == 'U.G cable from Telecom supplier'){
      form.controls.structureAttributes.controls[0].controls.typeOfTelecomLinesDrop.setValue("0.5");
    }
    else if(form.controls.structureAttributes.controls[0].controls.typeOfTelecomLines.value == 'U.G cable from own tower'){
      form.controls.structureAttributes.controls[0].controls.typeOfTelecomLinesDrop.setValue("0.01");
    }
  }

  shieldingGroundingIsolationL1D(event:any,form:any){
    if(form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationL1.value == 'TN-C-S system with PME'){
      form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationL1Drop.setValue("1,0.2");
    }
    else if(form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationL1.value == 'Burried, shield not equipotentially bonded'){
      form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationL1Drop.setValue("1,0.3");
    }
    else if(form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationL1.value == 'Overhead, shield not equipotentially bonded'){
      form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationL1Drop.setValue("1,0.1");
    }
    else if(form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationL1.value == 'Burried, shield equipotentially bonded'){
      form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationL1Drop.setValue("1,0");
    }
    else if(form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationL1.value == 'Overhead, shield equipotentially bonded'){
      form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationL1Drop.setValue("1,0");
    }
    else if(form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationL1.value == 'Overhead, unknown bonding at line entrance'){
      form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationL1Drop.setValue("1,1");
    }
    else if(form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationL1.value == 'No external line'){
      form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationL1Drop.setValue("0,0");
    }
    else if(form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationL1.value == 'Designed by CAPE(large building with transformer and DG)'){
      form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationL1Drop.setValue("0,0");
    }
    this.shielding(event,form);
  }

  hazardClassificationD(event:any,form:any){ 
    if(form.controls.losses.controls[0].controls.hazardClassification.value == 'Concrete houses'){
      form.controls.losses.controls[0].controls.hazardClassificationDrop.setValue("1");
    }
    else if(form.controls.losses.controls[0].controls.hazardClassification.value == 'Two floor buildings with less than 100 people'){
      form.controls.losses.controls[0].controls.hazardClassificationDrop.setValue("2");
    }
    else if(form.controls.losses.controls[0].controls.hazardClassification.value == 'Culturals/sports - 100 to 1000 people'){
      form.controls.losses.controls[0].controls.hazardClassificationDrop.setValue("5");
    }
    else if(form.controls.losses.controls[0].controls.hazardClassification.value == 'Hospitals,Multi-Storey Buildings'){
      form.controls.losses.controls[0].controls.hazardClassificationDrop.setValue("5");
    }
    else if(form.controls.losses.controls[0].controls.hazardClassification.value == 'Culturals/sports - more than 1000 people'){
      form.controls.losses.controls[0].controls.hazardClassificationDrop.setValue("10");
    }
    else if(form.controls.losses.controls[0].controls.hazardClassification.value == 'multistoried buildings / hotels / industrial / commercial'){
      form.controls.losses.controls[0].controls.hazardClassificationDrop.setValue("5");
    }
    else if(form.controls.losses.controls[0].controls.hazardClassification.value == 'Risk of explosion'){
      form.controls.losses.controls[0].controls.hazardClassificationDrop.setValue("5");
    }
  }

  humanLossOfphysicalDamageD(event:any,form:any){
    if(form.controls.losses.controls[0].controls.humanLossOfphysicalDamage.value == 'Risk of explosion'){
      form.controls.losses.controls[0].controls.humanLossOfphysicalDamageDrop.setValue("0.1");
    }
    else if(form.controls.losses.controls[0].controls.humanLossOfphysicalDamage.value == 'Hospitals, hotel,school,civic building'){
      form.controls.losses.controls[0].controls.humanLossOfphysicalDamageDrop.setValue("0.1");
    }
    else if(form.controls.losses.controls[0].controls.humanLossOfphysicalDamage.value == 'Public entertainment,church,museume'){
      form.controls.losses.controls[0].controls.humanLossOfphysicalDamageDrop.setValue("0.05");
    }
    else if(form.controls.losses.controls[0].controls.humanLossOfphysicalDamage.value == 'Industrial, commercial'){
      form.controls.losses.controls[0].controls.humanLossOfphysicalDamageDrop.setValue("0.02");
    }
    else if(form.controls.losses.controls[0].controls.humanLossOfphysicalDamage.value == 'Others'){
      form.controls.losses.controls[0].controls.humanLossOfphysicalDamageDrop.setValue("0.01");
    }
  }

  humanLossOffailureOfInternalSystemD(event:any,form:any){
    if(form.controls.losses.controls[0].controls.humanLossOffailureOfInternalSystem.value == 'Risk of explosion'){
      form.controls.losses.controls[0].controls.humanLossOffailureOfInternalSystemDrop.setValue("0.1");
    }
    else if(form.controls.losses.controls[0].controls.humanLossOffailureOfInternalSystem.value == 'Intensive care unit & Operation block of hospital'){
      form.controls.losses.controls[0].controls.humanLossOffailureOfInternalSystemDrop.setValue("0.01");
    }
    else if(form.controls.losses.controls[0].controls.humanLossOffailureOfInternalSystem.value == 'Other part of Building'){
      form.controls.losses.controls[0].controls.humanLossOffailureOfInternalSystemDrop.setValue("0.001");
    }
  }

  serToPubPhysicalDamageD(event:any,form:any){
    if(form.controls.losses.controls[0].controls.serToPubPhysicalDamage.value == 'Gas,water,power supply'){
      form.controls.losses.controls[0].controls.serToPubPhysicalDamageDrop.setValue("0.1");
    }
    else if(form.controls.losses.controls[0].controls.serToPubPhysicalDamage.value == 'TV, telecommunication lines'){
      form.controls.losses.controls[0].controls.serToPubPhysicalDamageDrop.setValue("0.01");
    }
    else if(form.controls.losses.controls[0].controls.serToPubPhysicalDamage.value == 'No Service'){
      form.controls.losses.controls[0].controls.serToPubPhysicalDamageDrop.setValue("0");
    }
  }

  serToPubfailureOfInternalSystemD(event:any,form:any){
    if(form.controls.losses.controls[0].controls.serToPubfailureOfInternalSystem.value == 'Gas,water,power supply'){
      form.controls.losses.controls[0].controls.serToPubfailureOfInternalSystemDrop.setValue("0.01");
    }
    else if(form.controls.losses.controls[0].controls.serToPubfailureOfInternalSystem.value == 'TV, telecommunication lines'){
      form.controls.losses.controls[0].controls.serToPubfailureOfInternalSystemDrop.setValue("0.001");
    }
    else if(form.controls.losses.controls[0].controls.serToPubfailureOfInternalSystem.value == 'No Service'){
      form.controls.losses.controls[0].controls.serToPubfailureOfInternalSystemDrop.setValue("0");
    }
  }

  culHerOfPhysicalDamageD(event:any,form:any){
    if(form.controls.losses.controls[0].controls.culHerOfPhysicalDamage.value == 'Museums,galleries'){
      form.controls.losses.controls[0].controls.culHerOfPhysicalDamageDrop.setValue("0.1");
    }
    else if(form.controls.losses.controls[0].controls.culHerOfPhysicalDamage.value == 'No Cultural Heritage'){
      form.controls.losses.controls[0].controls.culHerOfPhysicalDamageDrop.setValue("0");
    }
  }

  ecoLossOfPhysicalDamageD(event:any,form:any){
    if(form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamage.value == 'Risk of explosion'){
      form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageDrop.setValue("1");
    }
    else if(form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamage.value == 'Hospitals, industrial, museum, agricultural'){
      form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageDrop.setValue("0.5");
    }
    else if(form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamage.value == 'Hotel,school, office, public entertainment, church, commercial'){
      form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageDrop.setValue("0.2");
    }
    else if(form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamage.value == 'Others'){
      form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageDrop.setValue("0.1");
    }
  }

  ecoLossOfFailureOfInternalSystemD(event:any,form:any){
    if(form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystem.value == 'Risk of explosion'){
      form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemDrop.setValue("0.1");
    }
    else if(form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystem.value == 'Hospitals, industrial, hotel, office, commercial'){
      form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemDrop.setValue("0.01");
    }
    else if(form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystem.value == 'Museum, agricultural, school, office, public entertainment, church'){
      form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemDrop.setValue("0.001");
    }
    else if(form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystem.value == 'Others'){
      form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemDrop.setValue("0.0001");
    }
  }

  classOfLPSD(event:any,form:any){
    if(form.controls.losses.controls[0].controls.classOfLPS.value == 'No External LPS'){
      form.controls.losses.controls[0].controls.classOfLPSDrop.setValue("1");
    }
    else if(form.controls.losses.controls[0].controls.classOfLPS.value == 'Class IV LPS'){
      form.controls.losses.controls[0].controls.classOfLPSDrop.setValue("0.2");
    }
    else if(form.controls.losses.controls[0].controls.classOfLPS.value == 'Class III LPS'){
      form.controls.losses.controls[0].controls.classOfLPSDrop.setValue("0.1");
    }
    else if(form.controls.losses.controls[0].controls.classOfLPS.value == 'Class II LPS'){
      form.controls.losses.controls[0].controls.classOfLPSDrop.setValue("0.05");
    }
    else if(form.controls.losses.controls[0].controls.classOfLPS.value == 'Class I LPS'){
      form.controls.losses.controls[0].controls.classOfLPSDrop.setValue("0.02");
    }
  }

  classOfSpdD(event:any,form:any){
    if(form.controls.losses.controls[0].controls.classOfSPD.value == 'No SPD'){
      form.controls.losses.controls[0].controls.classOfSPDDrop.setValue("1");
    }
    else if(form.controls.losses.controls[0].controls.classOfSPD.value == 'Protec T1H 300 3+1 R'){
      form.controls.losses.controls[0].controls.classOfSPDDrop.setValue("0.5");
    }
    else if(form.controls.losses.controls[0].controls.classOfSPD.value == 'Protec T1HS 300 3+1 R'){
      form.controls.losses.controls[0].controls.classOfSPDDrop.setValue("0.01");
    }
    else if(form.controls.losses.controls[0].controls.classOfSPD.value == 'Protec T1HS 300 3 + 1 R & Protec T2H 300 3 + 1'){
      form.controls.losses.controls[0].controls.classOfSPDDrop.setValue("0.005");
    }
    this.shielding(event,form);
  }

  buildingValue(event: any, form: any){
    if(form.controls.typeOfBuilding.value == 'Brick'){
      form.controls.structureScreeningEffectiveness.setValue('Poor');
      form.controls.internalScreeningEffectiveness.setValue('Poor');
    }
    else if(form.controls.typeOfBuilding.value == 'RCC with Brick'){
      form.controls.structureScreeningEffectiveness.setValue('Average');
      form.controls.internalScreeningEffectiveness.setValue('Average');
    }
    else if(form.controls.typeOfBuilding.value == 'PEB with sheet'){
      form.controls.structureScreeningEffectiveness.setValue('Good');
      form.controls.internalScreeningEffectiveness.setValue('Good');
    }
    else if(form.controls.typeOfBuilding.value == 'System designed by CAPE RCC building'){
      form.controls.structureScreeningEffectiveness.setValue('Good');
      form.controls.internalScreeningEffectiveness.setValue('Good');
    }
    else if(form.controls.typeOfBuilding.value == 'System designed by CAPE PEB building'){
      form.controls.structureScreeningEffectiveness.setValue('Very Good');
      form.controls.internalScreeningEffectiveness.setValue('Very Good');
    }
  }

  // For changing string into Number
  buildingValue1(event:any,form:any){
    // Getting BuildingType value from StructureScreeningEffectiveness
    if(form.controls.structureScreeningEffectiveness.value == "Poor"){
      form.controls.typeOFbuildingdrop.setValue('1')
    }
    else if(form.controls.structureScreeningEffectiveness.value == "Average"){
      form.controls.typeOFbuildingdrop.setValue('0.5')
    }
    else if(form.controls.structureScreeningEffectiveness.value == "Good" && form.controls.typeOfBuilding.value == "PEB with sheet"){
      form.controls.typeOFbuildingdrop.setValue('0.2')
    }
    else if(form.controls.structureScreeningEffectiveness.value == "Good" && form.controls.typeOfBuilding.value == "System designed by CAPE RCC building"){
      form.controls.typeOFbuildingdrop.setValue('0.20')
    }
    else if(form.controls.structureScreeningEffectiveness.value == "Very Good"){
      form.controls.typeOFbuildingdrop.setValue('0.001')
    }
  }

  // For changing string into Number
  buildingValue2(event:any,form:any){
    // Getting BuildingType value from internalScreeningEffectivenessValue
    if(form.controls.internalScreeningEffectiveness.value == "Poor"){
      form.controls.typeOFbuildingdrop1.setValue('1')
    }
    else if(form.controls.internalScreeningEffectiveness.value == "Average"){
      form.controls.typeOFbuildingdrop1.setValue('0.5')
    }
    else if(form.controls.internalScreeningEffectiveness.value == "Good" && form.controls.typeOfBuilding.value == "PEB with sheet"){
      form.controls.typeOFbuildingdrop1.setValue('0.2')
    }
    else if(form.controls.internalScreeningEffectiveness.value == "Good" && form.controls.typeOfBuilding.value == "System designed by CAPE RCC building"){
      form.controls.typeOFbuildingdrop1.setValue('0.20')
    }
    else if(form.controls.internalScreeningEffectiveness.value == "Very Good"){
      form.controls.typeOFbuildingdrop1.setValue('0.001')
    }
  }

  // Math for Collection Area of Structure
  collectionAreaLength(event:any, form:any){

    if(form.controls.protrusionWidth.value!='' && form.controls.protrusionHeight.value!='' && form.controls.protrusionWidth.value!='' && form.controls.protrusionHeight.value!=null && form.controls.protrusionWidth.value!='' && form.controls.protrusionHeight.value!=undefined){
      var a=form.controls.protrusionLenght.value*form.controls.protrusionWidth.value+6*form.controls.protrusionLenght.value*
      (form.controls.protrusionLenght.value+form.controls.protrusionWidth.value)+9*3.14*(form.controls.protrusionHeight.value*form.controls.protrusionHeight.value);
      form.controls.collectionAreaOfStructure.setValue(a.toFixed(2));
    }
    else{
      form.controls.collectionAreaOfStructure.setValue('');
    }

    if(form.controls.protrusionWidth.value!='' && form.controls.protrusionLenght.value!='' && form.controls.protrusionWidth.value!='' && form.controls.protrusionLenght.value!=null && form.controls.protrusionWidth.value!=null && form.controls.protrusionLenght.value!=undefined){
      var b=2*500*(form.controls.protrusionLenght.value+form.controls.protrusionWidth.value)+3.14*(250000);
      form.controls.collAreaOfNearStructure.setValue(b.toFixed(2));
    }
    else{
      form.controls.collAreaOfNearStructure.setValue('');
    }
  }
  collectionAreaWidth(event:any, form:any){
    if(form.controls.protrusionLenght.value!='' && form.controls.protrusionHeight.value!='' && form.controls.protrusionLenght.value!=null && form.controls.protrusionHeight.value!=null && form.controls.protrusionLenght.value!=undefined && form.controls.protrusionHeight.value!=undefined){
      var a=form.controls.protrusionLenght.value*form.controls.protrusionWidth.value+6*form.controls.protrusionLenght.value*
      (form.controls.protrusionLenght.value+form.controls.protrusionWidth.value)+9*3.14*(form.controls.protrusionHeight.value*form.controls.protrusionHeight.value);
      form.controls.collectionAreaOfStructure.setValue(a.toFixed(2));
    }
    else{
      form.controls.collectionAreaOfStructure.setValue('');
    }
    if(form.controls.protrusionWidth.value!='' && form.controls.protrusionLenght.value!='' && form.controls.protrusionWidth.value!=null && form.controls.protrusionLenght.value!=null && form.controls.protrusionWidth.value!=undefined && form.controls.protrusionLenght.value!=undefined){
      var b=2*500*(form.controls.protrusionLenght.value+form.controls.protrusionWidth.value)+3.14*(250000);
      form.controls.collAreaOfNearStructure.setValue(b.toFixed(2));
    }
    else{
      form.controls.collAreaOfNearStructure.setValue('');
    }
  }
  collectionAreaHeight(event:any, form:any){
    if(form.controls.protrusionWidth.value!='' && form.controls.protrusionLenght.value!='' && form.controls.protrusionWidth.value!=null && form.controls.protrusionLenght.value!=null && form.controls.protrusionWidth.value!=undefined && form.controls.protrusionLenght.value!=undefined){
      var a=form.controls.protrusionLenght.value*form.controls.protrusionWidth.value+6*form.controls.protrusionLenght.value*
      (form.controls.protrusionLenght.value+form.controls.protrusionWidth.value)+9*3.14*(form.controls.protrusionHeight.value*form.controls.protrusionHeight.value)
      form.controls.collectionAreaOfStructure.setValue(a.toFixed(2));
    }
    else{
      form.controls.collectionAreaOfStructure.setValue('');
    }
  }

  // Math for Collection area of structure with protrusion
  collectionAreaProtrusion(event:any, form:any){
    if(form.controls.heighestRoofProtrusion.value!='' && form.controls.heighestRoofProtrusion.value!=null && form.controls.heighestRoofProtrusion.value!=undefined){
      var a=9*3.14*(form.controls.heighestRoofProtrusion.value*form.controls.heighestRoofProtrusion.value);
      form.controls.collAreaOfStrucWithProtrusion.setValue(a.toFixed(2));
    }
    else{
      form.controls.collAreaOfStrucWithProtrusion.setValue('');
    }
  }

  // Math for No of dangerous event on structure
  heightNearStruct(event:any, form:any){
    this.heightNearByStructureD(event,form);
    if(form.controls.heightNearByStructure!='' && form.controls.collectionAreaOfStructure!='' && form.controls.groundFlashDensity!='' && form.controls.heightNearByStructure!=null && form.controls.collectionAreaOfStructure!=null && form.controls.groundFlashDensity!=null && form.controls.heightNearByStructure!=undefined && form.controls.collectionAreaOfStructure!=undefined && form.controls.groundFlashDensity!=undefined){

      var a = form.controls.groundFlashDensity.value*form.controls.collectionAreaOfStructure.value*form.controls.heightNearByStructureDrop.value*0.000001;
      form.controls.noOfDangerousEventOnStructure.setValue(a.toFixed(12));
    }
    else{
      form.controls.noOfDangerousEventOnStructure.setValue('');
    }
  }
  // Math for No of dangerous event near the structure
  noOfDangerus(event:any, form:any){
    this.heightNearByStructureD(event,form);
    this.telephoneServiceLineD(event,form);
    if(form.controls.groundFlashDensity!='' && form.controls.collAreaOfNearStructure!='' && form.controls.groundFlashDensity!=null && form.controls.collAreaOfNearStructure!=null && form.controls.groundFlashDensity!=undefined && form.controls.collAreaOfNearStructure!=undefined){
      var a = form.controls.groundFlashDensity.value*form.controls.collAreaOfNearStructure.value*0.000001
      form.controls.noOfDangerousEventNearStructure.setValue(a.toFixed(10));
    }
    else{
      form.controls.noOfDangerousEventNearStructure.setValue('');
    }
    if(form.controls.groundFlashDensity!='' && form.controls.collAreaOfAdjacentStruc!='' && form.controls.telephoneServiceLine!='' && form.controls.heightNearByStructure!='' && form.controls.groundFlashDensity!=null && form.controls.collAreaOfAdjacentStruc!=null && form.controls.telephoneServiceLine!=null && form.controls.heightNearByStructure!=null && form.controls.groundFlashDensity!=undefined && form.controls.collAreaOfAdjacentStruc!=undefined && form.controls.telephoneServiceLine!=undefined && form.controls.heightNearByStructure!=undefined){
      var b=form.controls.groundFlashDensity.value*form.controls.collAreaOfAdjacentStruc.value*form.controls.heightNearByStructureDrop.value*form.controls.telephoneServiceLineDrop.value*0.000001;
      form.controls.noOfDangEventOnAdjacentStruc.setValue(b.toFixed(12));
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
    if(form.controls.protectionLenght!='' && form.controls.protectionWidth!='' && form.controls.protectionHeight!='' && form.controls.protectionLenght!=null && form.controls.protectionWidth!=null && form.controls.protectionHeight!=null && form.controls.protectionLenght!=undefined && form.controls.protectionWidth!=undefined && form.controls.protectionHeight!=undefined){
      var a=form.controls.protectionLenght.value*form.controls.protectionWidth.value+6*form.controls.protectionHeight.value*(form.controls.protectionLenght.value+form.controls.protectionWidth.value)+9*3.14*(form.controls.protectionHeight.value*form.controls.protectionHeight.value);
      form.controls.protectionCollectionArea.setValue(a.toFixed(2));
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
      form.controls.collAreaOfAdjacentStruc.setValue('0.00')
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
    if(form.controls.adjacentLength!='' && form.controls.adjacentWidth!='' && form.controls.adjacentHeight!='' && form.controls.adjacentLength!=null && form.controls.adjacentWidth!=null && form.controls.adjacentHeight!=null && form.controls.adjacentLength!=undefined && form.controls.adjacentWidth!=undefined && form.controls.adjacentHeight!=undefined){
      var a = form.controls.adjacentLength.value*form.controls.adjacentWidth.value+6*form.controls.adjacentHeight.value*(form.controls.adjacentLength.value+form.controls.adjacentWidth.value)+9*3.14*(form.controls.adjacentHeight.value*form.controls.adjacentHeight.value)
      form.controls.collAreaOfAdjacentStruc.setValue(a.toFixed(2));
    }
    else{
      form.controls.collAreaOfAdjacentStruc.setValue('');
    }
  }
  // Math for Number of hours/year people are present in the building
  houseYearBuilding(event:any,form:any){
    if(form.controls.dayPeoplePresentBuilding!='' && form.controls.dayPeoplePresentBuilding!=null && form.controls.dayPeoplePresentBuilding!=undefined){
      var a = 365*form.controls.dayPeoplePresentBuilding.value;
      form.controls.yearPeoplePresentBuilding.setValue(a);
    }
    else{
      form.controls.yearPeoplePresentBuilding.setValue('');
    }
  }

  // Math for Length of Power line
  lengthPowerline(event:any, form:any){
    this.telephoneServiceLineD(event,form);
    this.environmentD(event,form);
    this.typeOfPowerLinesD(event,form);
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
    if(form.controls.groundFlashDensity!='' && form.controls.structureAttributes.controls[0].controls.collAreaOfNearLines!='' && form.controls.structureAttributes.controls[0].controls.typeOfPowerLines!='' && form.controls.environment!='' && form.controls.telephoneServiceLine!='' && form.controls.groundFlashDensity!=null && form.controls.structureAttributes.controls[0].controls.collAreaOfNearLines!=null && form.controls.structureAttributes.controls[0].controls.typeOfPowerLines!=null && form.controls.environment!=null && form.controls.telephoneServiceLine!=null && form.controls.groundFlashDensity!=undefined && form.controls.structureAttributes.controls[0].controls.collAreaOfNearLines!=undefined && form.controls.structureAttributes.controls[0].controls.typeOfPowerLines!=undefined && form.controls.environment!=undefined && form.controls.telephoneServiceLine!=undefined){

      var c = form.controls.groundFlashDensity.value*form.controls.structureAttributes.controls[0].controls.collAreaOfNearLines.value*form.controls.structureAttributes.controls[0].controls.typeOfPowerLinesDrop.value*form.controls.environmentDrop.value*form.controls.telephoneServiceLineDrop.value*0.000001;
      form.controls.structureAttributes.controls[0].controls.eventNearThePowerLines.setValue(c.toFixed(8));
    }
    else{
      form.controls.structureAttributes.controls[0].controls.eventNearThePowerLines.setValue('');
    }
    // No. fo dangerous event on the lines
    if(form.controls.groundFlashDensity!='' && form.controls.structureAttributes.controls[0].controls.collAreaOfPowerLines!='' && form.controls.structureAttributes.controls[0].controls.typeOfPowerLines!='' && form.controls.environment!='' && form.controls.telephoneServiceLine!='' && form.controls.groundFlashDensity!=null && form.controls.structureAttributes.controls[0].controls.collAreaOfPowerLines!=null && form.controls.structureAttributes.controls[0].controls.typeOfPowerLines!=null && form.controls.environment!=null && form.controls.telephoneServiceLine!=null && form.controls.groundFlashDensity!=undefined && form.controls.structureAttributes.controls[0].controls.collAreaOfPowerLines!=undefined && form.controls.structureAttributes.controls[0].controls.typeOfPowerLines!=undefined && form.controls.environment!=undefined && form.controls.telephoneServiceLine!=undefined){

      var d = form.controls.groundFlashDensity.value*form.controls.structureAttributes.controls[0].controls.collAreaOfPowerLines.value*form.controls.structureAttributes.controls[0].controls.typeOfPowerLinesDrop.value*form.controls.environmentDrop.value*form.controls.telephoneServiceLineDrop.value*0.000001;
      form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines.setValue(d.toFixed(8));
    }
    else{
      form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines.setValue('');
    }
  }
  // Math for Length Of Telecom Lines 
  lengthOfTelecomLines(event:any, form:any){
    this.telephoneServiceLineD(event,form);
    this.typeOfTelecomLinesD(event,form);
    // Collection Area Of The Telecom Lines && Collection Area Near The Telecom Lines
    let arr = form.controls.structureAttributes.controls[0].controls.lengthOfTelecomLines.value;
    if(form.controls.structureAttributes.controls[0].controls.lengthOfTelecomLines!='' && form.controls.structureAttributes.controls[0].controls. lengthOfTelecomLines!=null && form.controls.structureAttributes.controls[0].controls.lengthOfTelecomLines!=undefined){
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
    if(form.controls.groundFlashDensity!='' && form.controls.structureAttributes.controls[0].controls.collNearOfTelecomLines!='' && form.controls.structureAttributes.controls[0].controls.typeOfTelecomLines!='' && form.controls.environment!='' && form.controls.telephoneServiceLine!='' && form.controls.groundFlashDensity!=null && form.controls.structureAttributes.controls[0].controls.collNearOfTelecomLines!=null && form.controls.structureAttributes.controls[0].controls.typeOfTelecomLines!=null && form.controls.environment!=null && form.controls.telephoneServiceLine!=null && form.controls.groundFlashDensity!=undefined && form.controls.structureAttributes.controls[0].controls.collNearOfTelecomLines!=undefined && form.controls.structureAttributes.controls[0].controls.typeOfTelecomLines!=undefined && form.controls.environment!=undefined && form.controls.telephoneServiceLine!=undefined){
      
      var c = form.controls.groundFlashDensity.value*form.controls.structureAttributes.controls[0].controls.collNearOfTelecomLines.value*form.controls.structureAttributes.controls[0].controls.typeOfTelecomLinesDrop.value*form.controls.environmentDrop.value*form.controls.telephoneServiceLineDrop.value*0.000001;
      form.controls.structureAttributes.controls[0].controls.eventNearTheTelecomeLines.setValue(c.toFixed(8));
    }
    else{
      form.controls.structureAttributes.controls[0].controls.eventNearTheTelecomeLines.setValue('');
    }
    // No of Dangerous Event On The Telecom Lines
    if(form.controls.groundFlashDensity!='' && form.controls.structureAttributes.controls[0].controls.collAreaOfTelecomLines!='' && form.controls.structureAttributes.controls[0].controls.typeOfTelecomLines!='' && form.controls.environment!='' && form.controls.telephoneServiceLine!='' && form.controls.groundFlashDensity!=null && form.controls.structureAttributes.controls[0].controls.collAreaOfTelecomLines!=null && form.controls.structureAttributes.controls[0].controls.typeOfTelecomLines!=null && form.controls.environment!=null && form.controls.telephoneServiceLine!=null && form.controls.groundFlashDensity!=undefined && form.controls.structureAttributes.controls[0].controls.collAreaOfTelecomLines!=undefined && form.controls.structureAttributes.controls[0].controls.typeOfTelecomLines!=undefined && form.controls.environment!=undefined && form.controls.telephoneServiceLine!=undefined){

      var d = form.controls.groundFlashDensity.value*form.controls.structureAttributes.controls[0].controls.collAreaOfTelecomLines.value*form.controls.structureAttributes.controls[0].controls.typeOfTelecomLinesDrop.value*form.controls.environmentDrop.value*form.controls.telephoneServiceLineDrop.value*0.000001;
      form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines.setValue(d.toFixed(8));
    }
    else{
      form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines.setValue('');
    }
  }

  // Risk Of Fire Drop Down values changing
  riskOfFireDropDown(event:any,form:any){

    if(form.controls.structureAttributes.controls[0].controls.stRiskOfFire.value == "Zones 0, 20 and solid explosive"){
      form.controls.riskOfFireData.setValue('1');
    }
    else if(form.controls.structureAttributes.controls[0].controls.stRiskOfFire.value == "Zones 1, 21"){
      form.controls.riskOfFireData.setValue('0.1');
    }
    else if(form.controls.structureAttributes.controls[0].controls.stRiskOfFire.value == "Zones 2, 22"){
      form.controls.riskOfFireData.setValue('0.001');
    }
    else if(form.controls.structureAttributes.controls[0].controls.stRiskOfFire.value == "High"){
      form.controls.riskOfFireData.setValue('0.1');
    }
    else if(form.controls.structureAttributes.controls[0].controls.stRiskOfFire.value == "Ordinary"){
      form.controls.riskOfFireData.setValue('0.01');
    }
    else if(form.controls.structureAttributes.controls[0].controls.stRiskOfFire.value == "Low"){
      form.controls.riskOfFireData.setValue('0.001');
    }
    else if(form.controls.structureAttributes.controls[0].controls.stRiskOfFire.value == "None"){
      form.controls.riskOfFireData.setValue('0');
    }
  }

  // Math for LOSS OF HUMAN LIFE (L1)
  lossHumanLifeL1(event:any, form:any){
    this.riskOfFireDropDown(event,form);
    this.stTypeOfFloorSurfaceD(event,form);
    this.stFireProtectionMeasureD(event,form);
    this.hazardClassificationD(event,form);
    this.humanLossOfphysicalDamageD(event,form);
    this.humanLossOffailureOfInternalSystemD(event,form);
    // Loss due to injury to living beings by electric shock, fromula = rt × LT × nz/nt × tz/8760
    if(form.controls.structureAttributes.controls[0].controls.stTypeOfFloorSurface!='' && form.controls.noOfPeopleInZone!='' && form.controls.noOfPeopleInBuilding!='' && form.controls.yearPeoplePresentBuilding!='' && form.controls.structureAttributes.controls[0].controls.stTypeOfFloorSurface!=null && form.controls.noOfPeopleInZone!=null && form.controls.noOfPeopleInBuilding!=null && form.controls.yearPeoplePresentBuilding!=null && form.controls.structureAttributes.controls[0].controls.stTypeOfFloorSurface!=undefined && form.controls.noOfPeopleInZone!=undefined && form.controls.noOfPeopleInBuilding!=undefined && form.controls.yearPeoplePresentBuilding!=undefined){

      var a =form.controls.structureAttributes.controls[0].controls.stTypeOfFloorSurfaceDrop.value*0.01*form.controls.noOfPeopleInZone.value/form.controls.noOfPeopleInBuilding.value*form.controls.yearPeoplePresentBuilding.value/8760;
      form.controls.losses.controls[0].controls.humanLossOfInjuryOfElectricShock.setValue(a.toFixed(17));
    }
    else{
      form.controls.losses.controls[0].controls.humanLossOfInjuryOfElectricShock.setValue('');
    }
    // Loss due to physical damage (L1), formula = rp × rf × hZ × LF × nz/nt × tz/8760
    if(form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasure!='' && form.controls.structureAttributes.controls[0].controls.stRiskOfFire!='' && form.controls.losses.controls[0].controls.hazardClassification!='' && form.controls.losses.controls[0].controls.humanLossOfphysicalDamage!='' && form.controls.noOfPeopleInZone!='' && form.controls.noOfPeopleInBuilding!='' && form.controls.yearPeoplePresentBuilding!='' && form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasure!=null && form.controls.structureAttributes.controls[0].controls.stRiskOfFire!=null && form.controls.losses.controls[0].controls.hazardClassification!=null && form.controls.losses.controls[0].controls.humanLossOfphysicalDamage!=null && form.controls.noOfPeopleInZone!=null && form.controls.noOfPeopleInBuilding!=null && form.controls.yearPeoplePresentBuilding!=null && form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasure!=undefined && form.controls.structureAttributes.controls[0].controls.stRiskOfFire!=undefined && form.controls.losses.controls[0].controls.hazardClassification!=undefined && form.controls.losses.controls[0].controls.humanLossOfphysicalDamage!=undefined && form.controls.noOfPeopleInZone!=undefined && form.controls.noOfPeopleInBuilding!=undefined && form.controls.yearPeoplePresentBuilding!=undefined){

      var b = form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasureDrop.value*form.controls.riskOfFireData.value*form.controls.losses.controls[0].controls.hazardClassificationDrop.value*form.controls.losses.controls[0].controls.humanLossOfphysicalDamageDrop.value*form.controls.noOfPeopleInZone.value/form.controls.noOfPeopleInBuilding.value*form.controls.yearPeoplePresentBuilding.value/8760;

      form.controls.losses.controls[0].controls.humanLossOfPhysicalDamageL1.setValue(b.toFixed(17));
    }
    else{
      form.controls.losses.controls[0].controls.humanLossOfPhysicalDamageL1.setValue('');
    }
    // Loss due to failure of internal systems, formula = LO × nz/nt × tz/8760
    if(form.controls.losses.controls[0].controls.humanLossOffailureOfInternalSystem!='' && form.controls.noOfPeopleInZone!='' && form.controls.noOfPeopleInBuilding!='' && form.controls.yearPeoplePresentBuilding!='' && form.controls.losses.controls[0].controls.humanLossOffailureOfInternalSystem!=null && form.controls.noOfPeopleInZone!=null && form.controls.noOfPeopleInBuilding!=null && form.controls.yearPeoplePresentBuilding!=null && form.controls.losses.controls[0].controls.humanLossOffailureOfInternalSystem!=undefined && form.controls.noOfPeopleInZone!=undefined && form.controls.noOfPeopleInBuilding!=undefined && form.controls.yearPeoplePresentBuilding!=undefined){
      var c = form.controls.losses.controls[0].controls.humanLossOffailureOfInternalSystemDrop.value*form.controls.noOfPeopleInZone.value/form.controls.noOfPeopleInBuilding.value*form.controls.yearPeoplePresentBuilding.value/8760;
      
      form.controls.losses.controls[0].controls.humanLossOffailureOfInternalSystemL1.setValue(c.toFixed(17));
    }
    else{
      form.controls.losses.controls[0].controls.humanLossOffailureOfInternalSystemL1.setValue('');
    }
  }

  // Math for LOSS OF SERVICE TO PUBLIC (L2)
  lossServiceToPublicL2(event:any, form:any){
    this.riskOfFireDropDown(event,form);
    this.stFireProtectionMeasureD(event,form);
    this.serToPubPhysicalDamageD(event,form);
    this.serToPubfailureOfInternalSystemD(event,form);
    this.culHerOfPhysicalDamageD(event,form);
    // Loss due to physical damage, formula = rp × rf × LF × nz/nt 
    if(form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasure!='' && form.controls.structureAttributes.controls[0].controls.stRiskOfFire!='' && form.controls.losses.controls[0].controls.serToPubPhysicalDamage!='' && form.controls.noOfPeopleInZone!='' && form.controls.noOfPeopleInBuilding!='' && form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasure!=null && form.controls.structureAttributes.controls[0].controls.stRiskOfFire!=null && form.controls.losses.controls[0].controls.serToPubPhysicalDamage!=null && form.controls.noOfPeopleInZone!=null && form.controls.noOfPeopleInBuilding!=null && form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasure!=undefined && form.controls.structureAttributes.controls[0].controls.stRiskOfFire!=undefined && form.controls.losses.controls[0].controls.serToPubPhysicalDamage!=undefined && form.controls.noOfPeopleInZone!=undefined && form.controls.noOfPeopleInBuilding!=undefined){
      
      var a = form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasureDrop.value*form.controls.riskOfFireData.value*form.controls.losses.controls[0].controls.serToPubPhysicalDamageDrop.value*form.controls.noOfPeopleInZone.value/form.controls.noOfPeopleInBuilding.value;

      form.controls.losses.controls[0].controls.serToPubPhysicalDamageL1.setValue(a.toFixed(4));
    }
    else{
      form.controls.losses.controls[0].controls.serToPubPhysicalDamageL1.setValue('');
    }
    // Loss due to failure of internal systems, formula = LO × nz/nt 
    if(form.controls.losses.controls[0].controls.serToPubfailureOfInternalSystem!='' && form.controls.noOfPeopleInZone!='' && form.controls.noOfPeopleInBuilding!='' && form.controls.losses.controls[0].controls.serToPubfailureOfInternalSystem!=null && form.controls.noOfPeopleInZone!=null && form.controls.noOfPeopleInBuilding!=null && form.controls.losses.controls[0].controls.serToPubfailureOfInternalSystem!=undefined && form.controls.noOfPeopleInZone!=undefined && form.controls.noOfPeopleInBuilding!=undefined){

      var b = form.controls.losses.controls[0].controls.serToPubfailureOfInternalSystemDrop.value*form.controls.noOfPeopleInZone.value/form.controls.noOfPeopleInBuilding.value;

      form.controls.losses.controls[0].controls.serToPubfailureOfInternalSystemL1.setValue(b.toFixed(2));
    }
    else{
      form.controls.losses.controls[0].controls.serToPubfailureOfInternalSystemL1.setValue('');
    }

    // Math for LOSS OF CULTURAL HERITAGE (L3), formula =  rp × rf × LF × cz/ct 
    if(form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasure!='' && form.controls.structureAttributes.controls[0].controls.stRiskOfFire!='' && form.controls.losses.controls[0].controls.culHerOfPhysicalDamage!='' && form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasure!=null && form.controls.structureAttributes.controls[0].controls.stRiskOfFire!=null && form.controls.losses.controls[0].controls.culHerOfPhysicalDamage!=null && form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasure!=undefined && form.controls.structureAttributes.controls[0].controls.stRiskOfFire!=undefined && form.controls.losses.controls[0].controls.culHerOfPhysicalDamage!=undefined){

      var c = form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasureDrop.value*form.controls.riskOfFireData.value*form.controls.losses.controls[0].controls.culHerOfPhysicalDamageDrop.value*1/1;

      form.controls.losses.controls[0].controls.culHerOfPhysicalDamageL1.setValue(c.toFixed(4));
    }
    else{
      form.controls.losses.controls[0].controls.culHerOfPhysicalDamageL1.setValue('');
    }
  }

  // Math for ECONOMIC LOSS (L4)
  economicLossL4(event:any, form:any){
    this.riskOfFireDropDown(event,form);
    this.telephoneServiceLineD(event,form);
    this.stTypeOfFloorSurfaceD(event,form);
    this.ecoLossOfPhysicalDamageD(event,form);
    this.ecoLossOfFailureOfInternalSystemD(event,form);
    this.stFireProtectionMeasureD(event,form);
    // Loss due to injury to living beings by electric shock, formula = rt × LT × ca/ct  
    if(form.controls.structureAttributes.controls[0].controls.stTypeOfFloorSurface!='' && form.controls.structureAttributes.controls[0].controls.stTypeOfFloorSurface!=null && form.controls.structureAttributes.controls[0].controls.stTypeOfFloorSurface!=undefined){

      var a = form.controls.structureAttributes.controls[0].controls.stTypeOfFloorSurfaceDrop.value*0.01*1/1;
      form.controls.losses.controls[0].controls.ecoLossOfInjuryOfElectricShock.setValue(a.toFixed(8));
    }
    else{
      form.controls.losses.controls[0].controls.ecoLossOfInjuryOfElectricShock.setValue("");
    }

    // Loss due to physical damage, formula = rp × rf × LF × (ca + cb + cc + cs)/ct 
    if(form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasure!='' && form.controls.structureAttributes.controls[0].controls.stRiskOfFire!='' && form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamage!='' && form.controls.telephoneServiceLine!='' && form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasure!=null && form.controls.structureAttributes.controls[0].controls.stRiskOfFire!=null && form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamage!=null && form.controls.telephoneServiceLine!=null && form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasure!=undefined && form.controls.structureAttributes.controls[0].controls.stRiskOfFire!=undefined && form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamage!=undefined && form.controls.telephoneServiceLine!=undefined){

      var b = (form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasureDrop.value*form.controls.riskOfFireData.value*form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageDrop.value*form.controls.telephoneServiceLineDrop.value)*4/1;

      form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageL1.setValue(Math.ceil(b));
    }
    else{
      form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageL1.setValue("");
    }

    // Loss due to failure of internal systems, formula = LO × cs/ct 
    if(form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystem!='' && form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystem!=null && form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystem!=undefined){
      var c = form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemDrop.value*1/1;

      form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1.setValue(c.toFixed(4));
    } 
    else{
      form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1.setValue("");
    }
  }

  fireRiskDropDown(event:any,form:any){
    // Explosion
    if(event.target.value == "1"){
      form.controls.structureAttributes.controls[0].controls.stRiskOfFire.setValue('Zones 0, 20 and solid explosive');
    } 
    else if(event.target.value == "0.1"){
      form.controls.structureAttributes.controls[0].controls.stRiskOfFire.setValue('Zones 1, 21');
    }
    else if(event.target.value == "0.001"){
      form.controls.structureAttributes.controls[0].controls.stRiskOfFire.setValue('Zones 2, 22');
    }
    this.modalService.dismissAll();
  }

  fireRiskDropDown1(event:any,form:any){
    // Fire
    if(event.target.value == "0.1"){
      form.controls.structureAttributes.controls[0].controls.stRiskOfFire.setValue('High');
    } 
    else if(event.target.value == "0.01"){
      form.controls.structureAttributes.controls[0].controls.stRiskOfFire.setValue('Ordinary');
    }
    else if(event.target.value == "0.001"){
      form.controls.structureAttributes.controls[0].controls.stRiskOfFire.setValue('Low');
    }
    this.modalService.dismissAll();
  }

  fireRiskDropDown2(event:any,form:any){
    // None
    if(event.target.value == "0"){
      form.controls.structureAttributes.controls[0].controls.stRiskOfFire.setValue('None');
    }
    else{}
    this.modalService.dismissAll();
  }

// PROTECTION calculation's are below
// shieldingGroundingIsolation and shieldingGroundingIsolationL1
  // some of the shielding values are goes for Protection form
  shielding(event:any, form:any){
    let a:any = [];
    let b:any = [];
    a = (form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationDrop.value).split(',');
    b = (form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationL1Drop.value).split(',');

  // Finding Pc = protectionPC, PSPD × (CLD/T + CLD/P) for Pc
    if(form.controls.losses.controls[0].controls.classOfSPD!='' && form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolation!='' && form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationL1!='' && form.controls.losses.controls[0].controls.classOfSPD!=null && form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolation!=null && form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationL1!=null && form.controls.losses.controls[0].controls.classOfSPD!=undefined && form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolation!=undefined && form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationL1!=undefined){

      var c = form.controls.losses.controls[0].controls.classOfSPDDrop.value*(parseFloat(b[0])+parseFloat(a[0]));
      form.controls.protection.controls[0].controls.protectionPC.setValue(c);
    }
    else{
      form.controls.protection.controls[0].controls.protectionPC.setValue('');
    }

  // Here PEB=Pspd, It means class of SPD 
  // Finding Pu = protectionPU, PTU  × PEB × PLD × (CLD/T + CLD/P) for protectionPU Pu, PTU = 1.
    if(form.controls.losses.controls[0].controls.classOfSPD!='' && form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolation!='' && form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationL1!='' && form.controls.losses.controls[0].controls.classOfSPD!=null && form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolation!=null && form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationL1!=null && form.controls.losses.controls[0].controls.classOfSPD!='' && form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolation!=undefined && form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationL1!=undefined){
      var d = 1*form.controls.losses.controls[0].controls.classOfSPDDrop.value*(parseFloat(b[0])+parseFloat(a[0]));
      form.controls.protection.controls[0].controls.protectionPU.setValue(d);
    }else{
      form.controls.protection.controls[0].controls.protectionPU.setValue('');
    }

  // Finding Pv = protectionPV,  PEB × PLD × (CLD/T + CLD/P), PLD = 1
    if(form.controls.losses.controls[0].controls.classOfSPD!='' && form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolation!='' && form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationL1!='' && form.controls.losses.controls[0].controls.classOfSPD!=null && form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolation!=null && form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationL1!=null && form.controls.losses.controls[0].controls.classOfSPD!=undefined && form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolation!=undefined && form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationL1!=undefined){
      var e = form.controls.losses.controls[0].controls.classOfSPDDrop.value*1*(parseFloat(b[0])+parseFloat(a[0]));
      form.controls.protection.controls[0].controls.protectionPV.setValue(e);
    }else{
      form.controls.protection.controls[0].controls.protectionPV.setValue('');
    }

  // Finding Pw = protectionPW,  PSPD × PLD × (CLD/T + CLD/P), PLD = 1
    if(form.controls.losses.controls[0].controls.classOfSPD!='' && form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolation!='' && form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationL1!='' && form.controls.losses.controls[0].controls.classOfSPD!=null && form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolation!=null && form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationL1!=null && form.controls.losses.controls[0].controls.classOfSPD!=undefined && form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolation!=undefined && form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationL1!=undefined){
      var f = form.controls.losses.controls[0].controls.classOfSPDDrop.value*1*(parseFloat(b[0])+parseFloat(a[0]));
      form.controls.protection.controls[0].controls.protectionPW.setValue(f);
    }else{
      form.controls.protection.controls[0].controls.protectionPW.setValue('');
    }

  // Finding Pz =  PSPD × PLI × (CLI/T + CLI/P), PLI = 1
    if(form.controls.losses.controls[0].controls.classOfSPD!='' && form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolation!='' && form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationL1!='' && form.controls.losses.controls[0].controls.classOfSPD!=null && form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolation!=null && form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationL1!=null && form.controls.losses.controls[0].controls.classOfSPD!=undefined && form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolation!=undefined && form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationL1!=undefined){

      var g = form.controls.losses.controls[0].controls.classOfSPDDrop.value*1*(parseFloat(b[1])+parseFloat(a[1]));
      form.controls.protection.controls[0].controls.protectionPZ.setValue(g);
    }else{
      form.controls.protection.controls[0].controls.protectionPZ.setValue('');
    }
    // Sending values to below function
        this.lossOfHumanCalc(event,form);
        this.lossOfServiceCalc(event,form);
        this.lossCulturalCalc(event,form);
        this.lossEconomicCalc(event,form);
  }

  // PROTECTION CALCULATION 
    // (Ks1 × Ks2 × Ks3 × Ks4)2 for Pms
      protectionPms(event:any,form:any){
        this.stTypeOfInternalWiringD(event,form);
        // var a = form.controls.typeOFbuildingdrop.value;
        // var b = form.controls.typeOFbuildingdrop.value1;
        if(form.controls.structureScreeningEffectiveness!='' && form.controls.internalScreeningEffectiveness!='' && form.controls.structureAttributes.controls[0].controls.stTypeOfInternalWiring!='' && form.controls.structureScreeningEffectiveness!=null && form.controls.internalScreeningEffectiveness!=null && form.controls.structureAttributes.controls[0].controls.stTypeOfInternalWiring!=null && form.controls.structureScreeningEffectiveness!=undefined && form.controls.internalScreeningEffectiveness!=undefined && form.controls.structureAttributes.controls[0].controls.stTypeOfInternalWiring!=undefined){

          var c = (form.controls.typeOFbuildingdrop.value*form.controls.typeOFbuildingdrop1.value*form.controls.structureAttributes.controls[0].controls.stTypeOfInternalWiringDrop.value*1)*(form.controls.typeOFbuildingdrop.value*form.controls.typeOFbuildingdrop1.value*form.controls.structureAttributes.controls[0].controls.stTypeOfInternalWiringDrop.value*1);
          form.controls.protection.controls[0].controls.protectionPMS.setValue(Math.ceil(c));
        }
        else{
          form.controls.protection.controls[0].controls.protectionPMS.setValue('');
        }
      }
    
    // PSPD × PMS for Pm
      protectionPm(event:any,form:any){
        this.classOfSpdD(event,form);
        if(form.controls.losses.controls[0].controls.classOfSPD!='' && form.controls.protection.controls[0].controls.protectionPMS!='' && form.controls.losses.controls[0].controls.classOfSPD!=null && form.controls.protection.controls[0].controls.protectionPMS!=null && form.controls.losses.controls[0].controls.classOfSPD!=undefined && form.controls.protection.controls[0].controls.protectionPMS!=undefined){
          var a = form.controls.losses.controls[0].controls.classOfSPDDrop.value*form.controls.protection.controls[0].controls.protectionPMS.value;
          form.controls.protection.controls[0].controls.protectionPM.setValue(Math.ceil(a));
        }
        else{
          form.controls.protection.controls[0].controls.protectionPM.setValue('');
        }
        this.lossOfHumanCalc(event,form);
        this.lossOfServiceCalc(event,form);
        this.lossCulturalCalc(event,form);
        this.lossEconomicCalc(event,form);
      }

    // PTA  × PB for Pa 
      protectionPA(event:any,form:any){
        this.stAdditionalProtectionD(event,form);
        this.classOfLPSD(event,form);
        if(form.controls.structureAttributes.controls[0].controls.stAdditionalProtection!='' && form.controls.losses.controls[0].controls.classOfLPS!='' && form.controls.structureAttributes.controls[0].controls.stAdditionalProtection!=null && form.controls.losses.controls[0].controls.classOfLPS!=null && form.controls.structureAttributes.controls[0].controls.stAdditionalProtection!=undefined && form.controls.losses.controls[0].controls.classOfLPS!=undefined){
          
          var a = form.controls.structureAttributes.controls[0].controls.stAdditionalProtectionDrop.value*form.controls.losses.controls[0].controls.classOfLPSDrop.value;
          form.controls.protection.controls[0].controls.protectionPA.setValue(a);
        }
        else{
          form.controls.protection.controls[0].controls.protectionPA.setValue('');
        }
        this.lossOfHumanCalc(event,form);
        this.lossOfServiceCalc(event,form);
        this.lossCulturalCalc(event,form);
        this.lossEconomicCalc(event,form);
      }

  // Calcualted Risk Table calculation are given below 
  // Loss of human life or permanent injuries - First Row
    lossOfHumanCalc(event:any,form:any){ 
      this.classOfLPSD(event,form);
      // RA1 La = ecoLossOfInjuryOfElectricShock, PA = protectionPA, Nd = noOfDangerousEventOnStructure, Ra1 = riskProtectionRA1
      if(form.controls.noOfDangerousEventOnStructure!='' && form.controls.protection.controls[0].controls.protectionPA!='' && form.controls.losses.controls[0].controls.ecoLossOfInjuryOfElectricShock!='' && form.controls.noOfDangerousEventOnStructure!=null && form.controls.protection.controls[0].controls.protectionPA!=null && form.controls.losses.controls[0].controls.ecoLossOfInjuryOfElectricShock!=null && form.controls.noOfDangerousEventOnStructure!=undefined && form.controls.protection.controls[0].controls.protectionPA!=undefined && form.controls.losses.controls[0].controls.ecoLossOfInjuryOfElectricShock!=undefined){

        var a=form.controls.noOfDangerousEventOnStructure.value*form.controls.protection.controls[0].controls.protectionPA.value*form.controls.losses.controls[0].controls.ecoLossOfInjuryOfElectricShock.value;

        form.controls.protection.controls[0].controls.riskProtectionRA1.setValue(a.toFixed(28));
      }else{
        form.controls.protection.controls[0].controls.riskProtectionRA1.setValue('');
      }

      // RB1 = riskProtectionRB1, ND × PB × LB, Pb = classOfLPS, LB = ecoLossOfPhysicalDamageL1
      if(form.controls.noOfDangerousEventOnStructure!='' && form.controls.losses.controls[0].controls.classOfLPS!='' && form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageL1!='' && form.controls.noOfDangerousEventOnStructure!=null && form.controls.losses.controls[0].controls.classOfLPS!=null && form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageL1!=null && form.controls.noOfDangerousEventOnStructure!=undefined && form.controls.losses.controls[0].controls.classOfLPS!=undefined && form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageL1!=undefined){

        var b=form.controls.noOfDangerousEventOnStructure.value*form.controls.losses.controls[0].controls.classOfLPSDrop.value*form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageL1.value;
        form.controls.protection.controls[0].controls.riskProtectionRB1.setValue(b.toFixed(27));
      }else{
        form.controls.protection.controls[0].controls.riskProtectionRB1.setValue('');
      }

      // RC1 = riskProtectionRC1, formula = ND × PC × LC, Pc = protectionPC, LC=LM=LW=LZ = ecoLossOfFailureOfInternalSystemL1
      if(form.controls.noOfDangerousEventOnStructure!='' && form.controls.protection.controls[0].controls.protectionPC!='' && form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1!='' && form.controls.noOfDangerousEventOnStructure!=null && form.controls.protection.controls[0].controls.protectionPC!=null && form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1!=null && form.controls.noOfDangerousEventOnStructure!=undefined && form.controls.protection.controls[0].controls.protectionPC!=undefined && form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1!=undefined){
        var c=form.controls.noOfDangerousEventOnStructure.value*form.controls.protection.controls[0].controls.protectionPC.value*form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1.value;
        form.controls.protection.controls[0].controls.riskProtectionRC1.setValue(c.toFixed(28));
      }else{
        form.controls.protection.controls[0].controls.riskProtectionRC1.setValue('');
      }

      // RM1 = riskProtectionRM1, formula = NM × PM × LM, Nm = noOfDangerousEventNearStructure, Pm =protectionPM , Lm = ecoLossOfFailureOfInternalSystemL1
      if(form.controls.noOfDangerousEventNearStructure!='' && form.controls.protection.controls[0].controls.protectionPM!='' && form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1!='' && form.controls.noOfDangerousEventNearStructure!=null && form.controls.protection.controls[0].controls.protectionPM!=null && form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1!=null && form.controls.noOfDangerousEventNearStructure!=undefined && form.controls.protection.controls[0].controls.protectionPM!=undefined && form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1!=undefined){
        var d=form.controls.noOfDangerousEventNearStructure.value*form.controls.protection.controls[0].controls.protectionPM.value*form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1.value;
        form.controls.protection.controls[0].controls.riskProtectionRM1.setValue(d.toFixed(28));
      }else{
        form.controls.protection.controls[0].controls.riskProtectionRM1.setValue('');
      }

      // RU1 = riskProtectionRU1, formular = (NL/P + NL/T + NDJ ) × PU × LU, LU = ecoLossOfInjuryOfElectricShock, PU = protectionPU, NDJ=noOfDangEventOnAdjacentStruc, NL/P = eventOnThePowerLines, NL/T = eventOnTheTelecomLines
      if(form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!='' && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!='' && form.controls.noOfDangEventOnAdjacentStruc!='' && form.controls.protection.controls[0].controls.protectionPU!='' && form.controls.losses.controls[0].controls.ecoLossOfInjuryOfElectricShock!='' && form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!=null && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!=null && form.controls.noOfDangEventOnAdjacentStruc!=null && form.controls.protection.controls[0].controls.protectionPU!=null && form.controls.losses.controls[0].controls.ecoLossOfInjuryOfElectricShock!=null && form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!=undefined && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!=undefined && form.controls.noOfDangEventOnAdjacentStruc!=undefined && form.controls.protection.controls[0].controls.protectionPU!=undefined && form.controls.losses.controls[0].controls.ecoLossOfInjuryOfElectricShock!=undefined){

        var e=(+form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines.value+ +form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines.value+ +form.controls.noOfDangEventOnAdjacentStruc.value)*form.controls.protection.controls[0].controls.protectionPU.value*form.controls.losses.controls[0].controls.ecoLossOfInjuryOfElectricShock.value;

        form.controls.protection.controls[0].controls.riskProtectionRU1.setValue(e.toFixed(30));
      }
      else{
        form.controls.protection.controls[0].controls.riskProtectionRU1.setValue('');
      }

      // RV1 = riskProtectionRV1, formula = (NL/P + NL/T + NDJ ) × PV × LV, LV = ecoLossOfPhysicalDamageL1
      if(form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!='' && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!='' && form.controls.noOfDangEventOnAdjacentStruc!='' && form.controls.protection.controls[0].controls.protectionPV!='' && form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageL1!='' && form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!=null && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!=null && form.controls.noOfDangEventOnAdjacentStruc!=null && form.controls.protection.controls[0].controls.protectionPV!=null && form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageL1!=null && form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!=undefined && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!=undefined && form.controls.noOfDangEventOnAdjacentStruc!=undefined && form.controls.protection.controls[0].controls.protectionPV!=undefined && form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageL1!=undefined){

        var f=(+form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines.value+ +form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines.value+ +form.controls.noOfDangEventOnAdjacentStruc.value)*form.controls.protection.controls[0].controls.protectionPV.value*form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageL1.value;

        form.controls.protection.controls[0].controls.riskProtectionRV1.setValue(f.toFixed(30));
      }
      else{
        form.controls.protection.controls[0].controls.riskProtectionRV1.setValue('');
      }

      // RW1 = riskProtectionRW1, formula = (NL/P + NL/T + NDJ ) × PW × LW, LW = ecoLossOfFailureOfInternalSystemL1,
      if(form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!='' && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!='' && form.controls.noOfDangEventOnAdjacentStruc!='' && form.controls.protection.controls[0].controls.protectionPW!='' && form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1!=''){
        
        var g=(+form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines.value+ +form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines.value+ +form.controls.noOfDangEventOnAdjacentStruc.value)*form.controls.protection.controls[0].controls.protectionPW.value*form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1.value;
        form.controls.protection.controls[0].controls.riskProtectionRW1.setValue(g.toFixed(28));
      }
      else{
        form.controls.protection.controls[0].controls.riskProtectionRW1.setValue('');
      }

      // RZ1 = riskProtectionRZ1, formula = (NI/P + NI/T) × PZ × LZ, NI/P = eventNearThePowerLines, NI/T = eventNearTheTelecomeLines, PZ = protectionPZ, LZ = ecoLossOfFailureOfInternalSystemL1
      if(form.controls.structureAttributes.controls[0].controls.eventNearThePowerLines!='' &&  form.controls.structureAttributes.controls[0].controls.eventNearTheTelecomeLines!='' && form.controls.protection.controls[0].controls.protectionPZ!='' && form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1!='' && form.controls.structureAttributes.controls[0].controls.eventNearThePowerLines!=null &&  form.controls.structureAttributes.controls[0].controls.eventNearTheTelecomeLines!=null && form.controls.protection.controls[0].controls.protectionPZ!=null && form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1!=null && form.controls.structureAttributes.controls[0].controls.eventNearThePowerLines!=undefined && form.controls.structureAttributes.controls[0].controls.eventNearTheTelecomeLines!=undefined && form.controls.protection.controls[0].controls.protectionPZ!=undefined && form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1!=undefined){
        var h=(+form.controls.structureAttributes.controls[0].controls.eventNearThePowerLines.value+ +form.controls.structureAttributes.controls[0].controls.eventNearTheTelecomeLines.value)*form.controls.protection.controls[0].controls.protectionPZ.value*form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1.value;
        form.controls.protection.controls[0].controls.riskProtectionRZ1.setValue(h.toFixed(28));
      }
      else{
        form.controls.protection.controls[0].controls.riskProtectionRZ1.setValue('');
      }
      this.lossHumanRD1(event,form);
      this.lossHumanRI1(event,form);
    }

    // RD1 value goes to calculated risk table, formula = RA1 + RB1 + RC1 + RU1 + RV1 + RW1   
    lossHumanRD1(event:any,form:any){
      if(form.controls.protection.controls[0].controls.riskProtectionRA1!='' && form.controls.protection.controls[0].controls.riskProtectionRB1!='' && form.controls.protection.controls[0].controls.riskProtectionRC1!='' && form.controls.protection.controls[0].controls.riskProtectionRU1!='' && form.controls.protection.controls[0].controls.riskProtectionRV1!='' && form.controls.protection.controls[0].controls.riskProtectionRW1!='' && form.controls.protection.controls[0].controls.riskProtectionRA1!=null && form.controls.protection.controls[0].controls.riskProtectionRB1!=null && form.controls.protection.controls[0].controls.riskProtectionRC1!=null && form.controls.protection.controls[0].controls.riskProtectionRU1!=null && form.controls.protection.controls[0].controls.riskProtectionRV1!=null && form.controls.protection.controls[0].controls.riskProtectionRW1!=null && form.controls.protection.controls[0].controls.riskProtectionRA1!=undefined && form.controls.protection.controls[0].controls.riskProtectionRB1!=undefined && form.controls.protection.controls[0].controls.riskProtectionRC1!=undefined && form.controls.protection.controls[0].controls.riskProtectionRU1!=undefined && form.controls.protection.controls[0].controls.riskProtectionRV1!=undefined && form.controls.protection.controls[0].controls.riskProtectionRW1!=undefined){

        var a=(+form.controls.protection.controls[0].controls.riskProtectionRA1.value+ +form.controls.protection.controls[0].controls.riskProtectionRB1.value+ +form.controls.protection.controls[0].controls.riskProtectionRC1.value+ +form.controls.protection.controls[0].controls.riskProtectionRU1.value+ +form.controls.protection.controls[0].controls.riskProtectionRV1.value+ +form.controls.protection.controls[0].controls.riskProtectionRW1.value)

        form.controls.calculatedRisk.controls[0].controls.riskProtectionRD1.setValue(a.toExponential(1));
      }
      else{
        form.controls.calculatedRisk.controls[0].controls.riskProtectionRD1.setValue('');
      }
      this.lossHumanR1(event,form);
    }

    // RI1 value goes to calculated risk table, formula = RM1 + RZ1
    lossHumanRI1(event:any,form:any){
      if(form.controls.protection.controls[0].controls.riskProtectionRM1!='' && form.controls.protection.controls[0].controls.riskProtectionRZ1!='' && form.controls.protection.controls[0].controls.riskProtectionRM1!=null && form.controls.protection.controls[0].controls.riskProtectionRZ1!=null && form.controls.protection.controls[0].controls.riskProtectionRM1!=undefined && form.controls.protection.controls[0].controls.riskProtectionRZ1!=undefined){
        var a=(+form.controls.protection.controls[0].controls.riskProtectionRM1.value+ +form.controls.protection.controls[0].controls.riskProtectionRZ1.value)
        form.controls.calculatedRisk.controls[0].controls.riskProtectionRI1.setValue(a.toExponential(1));
      }else{
        form.controls.calculatedRisk.controls[0].controls.riskProtectionRI1.setValue('');
      }
      this.lossHumanR1(event,form);
    }

    // R1 value goes to calculated risk table, formula = Rd1 + Ri1
    lossHumanR1(event:any,form:any){
      if(form.controls.calculatedRisk.controls[0].controls.riskProtectionRD1!='' && form.controls.calculatedRisk.controls[0].controls.riskProtectionRI1!='' && form.controls.calculatedRisk.controls[0].controls.riskProtectionRD1!=null && form.controls.calculatedRisk.controls[0].controls.riskProtectionRI1!=null && form.controls.calculatedRisk.controls[0].controls.riskProtectionRD1!=undefined && form.controls.calculatedRisk.controls[0].controls.riskProtectionRI1!=undefined){
        var a=(+form.controls.calculatedRisk.controls[0].controls.riskProtectionRD1.value+ +form.controls.calculatedRisk.controls[0].controls.riskProtectionRI1.value)
        form.controls.calculatedRisk.controls[0].controls.riskProtectionR1.setValue(a.toExponential(1));
      }else{
        form.controls.calculatedRisk.controls[0].controls.riskProtectionR1.setValue('');
      }
    }

  // Loss of service to public - Second Row
    lossOfServiceCalc(event:any,form:any){
      this.classOfLPSD(event,form);
      // RB2 = riskProtectionRB2, formula = ND × PB × LB, ND = noOfDangerousEventOnStructure, PB = classOfLPS, LB = ecoLossOfPhysicalDamageL1
      if(form.controls.noOfDangerousEventOnStructure!='' && form.controls.losses.controls[0].controls.classOfLPS!='' && form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageL1!='' && form.controls.noOfDangerousEventOnStructure!=null && form.controls.losses.controls[0].controls.classOfLPS!=null && form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageL1!=null && form.controls.noOfDangerousEventOnStructure!=undefined && form.controls.losses.controls[0].controls.classOfLPS!=undefined && form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageL1!=undefined){

        var a=form.controls.noOfDangerousEventOnStructure.value*form.controls.losses.controls[0].controls.classOfLPSDrop.value*form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageL1.value;
        form.controls.protection.controls[0].controls.riskProtectionRB2.setValue(a.toFixed(28));
      }else{
        form.controls.protection.controls[0].controls.riskProtectionRB2.setValue('');
      }

      // RC2 = riskProtectionRC2, formula = ND × PC × LC, LC = ecoLossOfFailureOfInternalSystemL1
      if(form.controls.noOfDangerousEventOnStructure!='' && form.controls.protection.controls[0].controls.protectionPC!='' && form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1!='' && form.controls.noOfDangerousEventOnStructure!=null && form.controls.protection.controls[0].controls.protectionPC!=null && form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1!=null && form.controls.noOfDangerousEventOnStructure!=undefined && form.controls.protection.controls[0].controls.protectionPC!=undefined && form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1!=undefined){
        var b=form.controls.noOfDangerousEventOnStructure.value*form.controls.protection.controls[0].controls.protectionPC.value*form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1.value;
        form.controls.riskProtection.controls[0].controls.riskProtectionRC2.setValue(b.toFixed(28));
      }else{
        form.controls.riskProtection.controls[0].controls.riskProtectionRC2.setValue('');
      }

      // RM2 = riskProtectionRM2, formula = NM × PM × LM. 
      if(form.controls.noOfDangerousEventNearStructure!='' && form.controls.protection.controls[0].controls.protectionPM!='' && form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1!='' && form.controls.noOfDangerousEventNearStructure!=null && form.controls.protection.controls[0].controls.protectionPM!=null && form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1!=null && form.controls.noOfDangerousEventNearStructure!=undefined && form.controls.protection.controls[0].controls.protectionPM!=undefined && form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1!=undefined){
        var c=form.controls.noOfDangerousEventNearStructure.value*form.controls.protection.controls[0].controls.protectionPM.value*form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1.value;
        form.controls.riskProtection.controls[0].controls.riskProtectionRM2.setValue(c.toFixed(28));
      }else{
        form.controls.riskProtection.controls[0].controls.riskProtectionRM2.setValue('');
      }

      // RV2 = riskProtectionRV2,formula = (NL/P + NL/T + NDJ ) × PV × LV, 
      if(form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!='' && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!='' && form.controls.noOfDangEventOnAdjacentStruc!='' && form.controls.protection.controls[0].controls.protectionPV!='' && form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageL1!='' && form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!=null && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!=null && form.controls.noOfDangEventOnAdjacentStruc!=null && form.controls.protection.controls[0].controls.protectionPV!=null && form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageL1!=null && form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!=undefined && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!=undefined && form.controls.noOfDangEventOnAdjacentStruc!=undefined && form.controls.protection.controls[0].controls.protectionPV!=undefined && form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageL1!=undefined){

        var d=(+form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines.value+ +form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines.value+ +form.controls.noOfDangEventOnAdjacentStruc.value)*form.controls.protection.controls[0].controls.protectionPV.value*form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageL1.value;

        form.controls.riskProtection.controls[0].controls.riskProtectionRV2.setValue(d.toFixed(28));
      }else{
        form.controls.riskProtection.controls[0].controls.riskProtectionRV2.setValue('');
      }

      // RW2 = riskProtectionRW2, formula = (NL/P + NL/T + NDJ ) × PW × LW,
      if(form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!='' && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!='' && form.controls.noOfDangEventOnAdjacentStruc!='' && form.controls.protection.controls[0].controls.protectionPW!='' && form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1!='' && form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!=null && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!=null && form.controls.noOfDangEventOnAdjacentStruc!=null && form.controls.protection.controls[0].controls.protectionPW!=null && form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1!=null && form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!='' && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!='' && form.controls.noOfDangEventOnAdjacentStruc!='' && form.controls.protection.controls[0].controls.protectionPW!='' && form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1!=undefined){
        var e=(+form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines.value+ +form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines.value+ +form.controls.noOfDangEventOnAdjacentStruc.value)*form.controls.protection.controls[0].controls.protectionPW.value*form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1.value;
        form.controls.riskProtection.controls[0].controls.riskProtectionRW2.setValue(e.toFixed(28));
      }
      else{
        form.controls.riskProtection.controls[0].controls.riskProtectionRW2.setValue('');
      }

      // RZ2 = riskProtectionRZ2, formula =	(NI/P + NI/T) × PZ × LZ
      if(form.controls.structureAttributes.controls[0].controls.eventNearThePowerLines!='' &&  form.controls.structureAttributes.controls[0].controls.eventNearTheTelecomeLines!='' && form.controls.protection.controls[0].controls.protectionPZ!='' && form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1!='' && form.controls.structureAttributes.controls[0].controls.eventNearThePowerLines!=null &&  form.controls.structureAttributes.controls[0].controls.eventNearTheTelecomeLines!=null && form.controls.protection.controls[0].controls.protectionPZ!=null && form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1!=null && form.controls.structureAttributes.controls[0].controls.eventNearThePowerLines!=undefined &&  form.controls.structureAttributes.controls[0].controls.eventNearTheTelecomeLines!=undefined && form.controls.protection.controls[0].controls.protectionPZ!=undefined && form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1!=undefined){
        var f=(+form.controls.structureAttributes.controls[0].controls.eventNearThePowerLines.value+ +form.controls.structureAttributes.controls[0].controls.eventNearTheTelecomeLines.value)*form.controls.protection.controls[0].controls.protectionPZ.value*form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1.value;
        form.controls.riskProtection.controls[0].controls.riskProtectionRZ2.setValue(f.toFixed(28));
      }
      else{
        form.controls.riskProtection.controls[0].controls.riskProtectionRZ2.setValue('');
      }
      this.lossServiceRD2(event,form);
      this.lossServiceRI2(event,form);
    }

    // RD2 value, formula =  RB2 + RC2 +  RV2 + RW2
    lossServiceRD2(event:any,form:any){
      if(form.controls.protection.controls[0].controls.riskProtectionRB2!='' && form.controls.riskProtection.controls[0].controls.riskProtectionRC2!='' && form.controls.riskProtection.controls[0].controls.riskProtectionRV2!='' && form.controls.riskProtection.controls[0].controls.riskProtectionRW2!='' && form.controls.protection.controls[0].controls.riskProtectionRB2!=null && form.controls.riskProtection.controls[0].controls.riskProtectionRC2!=null && form.controls.riskProtection.controls[0].controls.riskProtectionRV2!=null && form.controls.riskProtection.controls[0].controls.riskProtectionRW2!=null && form.controls.protection.controls[0].controls.riskProtectionRB2!=undefined && form.controls.riskProtection.controls[0].controls.riskProtectionRC2!=undefined && form.controls.riskProtection.controls[0].controls.riskProtectionRV2!=undefined && form.controls.riskProtection.controls[0].controls.riskProtectionRW2!=undefined){

        var a=(+form.controls.protection.controls[0].controls.riskProtectionRB2.value+ +form.controls.riskProtection.controls[0].controls.riskProtectionRC2.value+ +form.controls.riskProtection.controls[0].controls.riskProtectionRV2.value+ +form.controls.riskProtection.controls[0].controls.riskProtectionRW2.value)
        form.controls.calculatedRisk.controls[0].controls.riskProtectionRD2.setValue(a.toExponential(1));
      }else{
        form.controls.calculatedRisk.controls[0].controls.riskProtectionRD2.setValue('');
      }
      this.lossServiceR2(event,form);
    }

    // RI2 value, formula = RM2 + RZ2
    lossServiceRI2(event:any,form:any){
      if(form.controls.riskProtection.controls[0].controls.riskProtectionRM2!='' && form.controls.riskProtection.controls[0].controls.riskProtectionRZ2!='' && form.controls.riskProtection.controls[0].controls.riskProtectionRM2!=null && form.controls.riskProtection.controls[0].controls.riskProtectionRZ2!=null && form.controls.riskProtection.controls[0].controls.riskProtectionRM2!=undefined && form.controls.riskProtection.controls[0].controls.riskProtectionRZ2!=undefined){
        var a=(+form.controls.riskProtection.controls[0].controls.riskProtectionRM2.value+ +form.controls.riskProtection.controls[0].controls.riskProtectionRZ2.value)
        form.controls.calculatedRisk.controls[0].controls.riskProtectionRI2.setValue(a.toExponential(1));
      }else{
        form.controls.calculatedRisk.controls[0].controls.riskProtectionRI2.setValue('');
      }
      this.lossServiceR2(event,form);
    }

    // R2 value, formula = RD2 + RI2
    lossServiceR2(event:any,form:any){
      if(form.controls.calculatedRisk.controls[0].controls.riskProtectionRD2!='' && form.controls.calculatedRisk.controls[0].controls.riskProtectionRI2!='' && form.controls.calculatedRisk.controls[0].controls.riskProtectionRD2!=null && form.controls.calculatedRisk.controls[0].controls.riskProtectionRI2!=null && form.controls.calculatedRisk.controls[0].controls.riskProtectionRD2!=undefined && form.controls.calculatedRisk.controls[0].controls.riskProtectionRI2!=undefined){
        var a=(+form.controls.calculatedRisk.controls[0].controls.riskProtectionRD2.value+ +form.controls.calculatedRisk.controls[0].controls.riskProtectionRI2.value);
        form.controls.calculatedRisk.controls[0].controls.riskProtectionR2.setValue(a.toExponential(1));
      }else{
        form.controls.calculatedRisk.controls[0].controls.riskProtectionR2.setValue('');
      }
    }

  // Loss of cultural heritage - Third Row
    lossCulturalCalc(event:any,form:any){
      this.classOfLPSD(event,form);
      // RB = culturalRB, formula = ND × PB × LB, ND = noOfDangerousEventOnStructure, PB = classOfLPS, LB = ecoLossOfPhysicalDamageL1
      if(form.controls.noOfDangerousEventOnStructure!='' && form.controls.losses.controls[0].controls.classOfLPS!='' && form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageL1!='' && form.controls.noOfDangerousEventOnStructure!=null && form.controls.losses.controls[0].controls.classOfLPS!=null && form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageL1!=null && form.controls.noOfDangerousEventOnStructure!=undefined && form.controls.losses.controls[0].controls.classOfLPS!=undefined && form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageL1!=undefined){
        var a=form.controls.noOfDangerousEventOnStructure.value*form.controls.losses.controls[0].controls.classOfLPSDrop.value*form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageL1.value;
        form.controls.protection.controls[0].controls.culturalRB.setValue(a.toFixed(23));
      }else{
        form.controls.protection.controls[0].controls.culturalRB.setValue('');
      }

      // RV = culturalRV, formula = (NL/P + NL/T + NDJ ) × PV × LV, 
      if(form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!='' && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!='' && form.controls.noOfDangEventOnAdjacentStruc!='' && form.controls.protection.controls[0].controls.protectionPV!='' && form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageL1!='' && form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!=null && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!=null && form.controls.noOfDangEventOnAdjacentStruc!=null && form.controls.protection.controls[0].controls.protectionPV!=null && form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageL1!=null && form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!=undefined && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!=undefined && form.controls.noOfDangEventOnAdjacentStruc!=undefined && form.controls.protection.controls[0].controls.protectionPV!=undefined && form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageL1!=undefined){
        var b=(+form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines.value+ +form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines.value+ +form.controls.noOfDangEventOnAdjacentStruc.value)*form.controls.protection.controls[0].controls.protectionPV.value*form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageL1.value;
        form.controls.protection.controls[0].controls.culturalRV.setValue(b.toFixed(23));
      }
      else{
        form.controls.protection.controls[0].controls.culturalRV.setValue('');
      }
      this.lossCulturalRD(event,form);
    } 

    // RD3 = riskProtectionRD3, formula =  RB3 + RV3, Here RB=Rb3 & RV=RV3
    lossCulturalRD(event:any,form:any){
      if(form.controls.protection.controls[0].controls.culturalRB!='' && form.controls.protection.controls[0].controls.culturalRV!='' && form.controls.protection.controls[0].controls.culturalRB!=null && form.controls.protection.controls[0].controls.culturalRV!=null && form.controls.protection.controls[0].controls.culturalRB!=undefined && form.controls.protection.controls[0].controls.culturalRV!=undefined){
        var a=(+form.controls.protection.controls[0].controls.culturalRB.value+ +form.controls.protection.controls[0].controls.culturalRV.value)
        form.controls.calculatedRisk.controls[0].controls.riskProtectionRD3.setValue(a.toExponential(1));
        form.controls.calculatedRisk.controls[0].controls.riskProtectionR3.setValue(a.toExponential(1));
      }else{
        form.controls.calculatedRisk.controls[0].controls.riskProtectionRD3.setValue('');
        form.controls.calculatedRisk.controls[0].controls.riskProtectionR3.setValue('');
      }
    }

  
  // Loss of economic value - Fourth row
    lossEconomicCalc(event:any,form:any){
      this.classOfLPSD(event,form);
      // RA = econamicValueRA, formula = ND × PA × LA, 
      if(form.controls.noOfDangerousEventOnStructure!='' && form.controls.protection.controls[0].controls.protectionPA!='' && form.controls.losses.controls[0].controls.ecoLossOfInjuryOfElectricShock!='' && form.controls.noOfDangerousEventOnStructure!=null && form.controls.protection.controls[0].controls.protectionPA!=null && form.controls.losses.controls[0].controls.ecoLossOfInjuryOfElectricShock!=null && form.controls.noOfDangerousEventOnStructure!=undefined && form.controls.protection.controls[0].controls.protectionPA!=undefined && form.controls.losses.controls[0].controls.ecoLossOfInjuryOfElectricShock!=undefined){
        var a=form.controls.noOfDangerousEventOnStructure.value*form.controls.protection.controls[0].controls.protectionPA.value*form.controls.losses.controls[0].controls.ecoLossOfInjuryOfElectricShock.value;
        form.controls.riskProtection.controls[0].controls.econamicValueRA.setValue(a.toFixed(23));
      }else{
        form.controls.riskProtection.controls[0].controls.econamicValueRA.setValue('');
      }

      // RB = econamicValueRB, ND × PB × LB, Pb = classOfLPS, LB = ecoLossOfPhysicalDamageL1
      if(form.controls.noOfDangerousEventOnStructure!='' && form.controls.losses.controls[0].controls.classOfLPS!='' && form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageL1!='' && form.controls.noOfDangerousEventOnStructure!=null && form.controls.losses.controls[0].controls.classOfLPS!=null && form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageL1!=null && form.controls.noOfDangerousEventOnStructure!=undefined && form.controls.losses.controls[0].controls.classOfLPS!=undefined && form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageL1!=undefined){
        var b=form.controls.noOfDangerousEventOnStructure.value*form.controls.losses.controls[0].controls.classOfLPSDrop.value*form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageL1.value;
        form.controls.riskProtection.controls[0].controls.econamicValueRB.setValue(b.toFixed(23));
      }else{
        form.controls.riskProtection.controls[0].controls.econamicValueRB.setValue('');
      }

      // RC = econamicValueRC, formula = ND × PC × LC, Pc = protectionPC, LC=LM=LW=LZ = ecoLossOfFailureOfInternalSystemL1
      if(form.controls.noOfDangerousEventOnStructure!='' && form.controls.protection.controls[0].controls.protectionPC!='' && form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1!='' && form.controls.noOfDangerousEventOnStructure!=null && form.controls.protection.controls[0].controls.protectionPC!=null && form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1!=null && form.controls.noOfDangerousEventOnStructure!=undefined && form.controls.protection.controls[0].controls.protectionPC!=undefined && form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1!=undefined){
        var c=form.controls.noOfDangerousEventOnStructure.value*form.controls.protection.controls[0].controls.protectionPC.value*form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1.value;
        form.controls.riskProtection.controls[0].controls.econamicValueRC.setValue(c.toFixed(23));
      }else{
        form.controls.riskProtection.controls[0].controls.econamicValueRC.setValue('');
      }

      // RM = econamicValueRM, formula = NM × PM × LM, Nm = noOfDangerousEventNearStructure, Pm =protectionPM , Lm = ecoLossOfFailureOfInternalSystemL1
      if(form.controls.noOfDangerousEventNearStructure!='' && form.controls.protection.controls[0].controls.protectionPM!='' && form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1!='' || form.controls.noOfDangerousEventNearStructure!=null && form.controls.protection.controls[0].controls.protectionPM!=null && form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1!=null && form.controls.noOfDangerousEventNearStructure!=undefined && form.controls.protection.controls[0].controls.protectionPM!=undefined && form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1!=undefined){
        var d=form.controls.noOfDangerousEventNearStructure.value*form.controls.protection.controls[0].controls.protectionPM.value*form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1.value;
        form.controls.riskProtection.controls[0].controls.econamicValueRM.setValue(d.toFixed(23));
      }else{
        form.controls.riskProtection.controls[0].controls.econamicValueRM.setValue('');
      }

      // RU = econamicValueRU, formular = (NL/P + NL/T + NDJ ) × PU × LU, LU = ecoLossOfInjuryOfElectricShock, PU = protectionPU, NDJ=noOfDangEventOnAdjacentStruc, NL/P = eventOnThePowerLines, NL/T = eventOnTheTelecomLines
      if(form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!='' && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!='' && form.controls.noOfDangEventOnAdjacentStruc!='' && form.controls.protection.controls[0].controls.protectionPU!='' && form.controls.losses.controls[0].controls.ecoLossOfInjuryOfElectricShock!='' && form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!=null && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!=null && form.controls.noOfDangEventOnAdjacentStruc!=null && form.controls.protection.controls[0].controls.protectionPU!=null && form.controls.losses.controls[0].controls.ecoLossOfInjuryOfElectricShock!=null && form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!=undefined && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!=undefined && form.controls.noOfDangEventOnAdjacentStruc!=undefined && form.controls.protection.controls[0].controls.protectionPU!=undefined && form.controls.losses.controls[0].controls.ecoLossOfInjuryOfElectricShock!=undefined){
        var e=(+form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines.value+ +form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines.value+ +form.controls.noOfDangEventOnAdjacentStruc.value)*form.controls.protection.controls[0].controls.protectionPU.value*form.controls.losses.controls[0].controls.ecoLossOfInjuryOfElectricShock.value;
        form.controls.riskProtection.controls[0].controls.econamicValueRU.setValue(e.toFixed(23));
      }
      else{
        form.controls.riskProtection.controls[0].controls.econamicValueRU.setValue('');
      }

      // RV = econamicValueRV, formula = (NL/P + NL/T + NDJ ) × PV × LV, LV = ecoLossOfPhysicalDamageL1
      if(form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!='' && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!='' && form.controls.noOfDangEventOnAdjacentStruc!='' && form.controls.protection.controls[0].controls.protectionPV!='' && form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageL1!='' && form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!=null && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!=null && form.controls.noOfDangEventOnAdjacentStruc!=null && form.controls.protection.controls[0].controls.protectionPV!=null && form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageL1!=null && form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!=undefined && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!=undefined && form.controls.noOfDangEventOnAdjacentStruc!=undefined && form.controls.protection.controls[0].controls.protectionPV!=undefined && form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageL1!=undefined){
        var f=(+form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines.value+ +form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines.value+ +form.controls.noOfDangEventOnAdjacentStruc.value)*form.controls.protection.controls[0].controls.protectionPV.value*form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageL1.value;
        form.controls.riskProtection.controls[0].controls.econamicValueRV.setValue(f.toFixed(23));
      }
      else{
        form.controls.riskProtection.controls[0].controls.econamicValueRV.setValue('');
      }

      // RW = econamicValueRW, formula = (NL/P + NL/T + NDJ ) × PW × LW, LW = ecoLossOfFailureOfInternalSystemL1,
      if(form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!='' && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!='' && form.controls.noOfDangEventOnAdjacentStruc!='' && form.controls.protection.controls[0].controls.protectionPW!='' && form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1!='' && form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!=null && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!=null && form.controls.noOfDangEventOnAdjacentStruc!=null && form.controls.protection.controls[0].controls.protectionPW!=null && form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1!=null && form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!=undefined && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!=undefined && form.controls.noOfDangEventOnAdjacentStruc!=undefined && form.controls.protection.controls[0].controls.protectionPW!=undefined && form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1!=undefined){
        var g=(+form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines.value+ +form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines.value+ +form.controls.noOfDangEventOnAdjacentStruc.value)*form.controls.protection.controls[0].controls.protectionPW.value*form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1.value;
        form.controls.riskProtection.controls[0].controls.econamicValueRW.setValue(g.toFixed(23));
      }
      else{
        form.controls.riskProtection.controls[0].controls.econamicValueRW.setValue('');
      }

      // RZ = econamicValueRZ, formula = (NI/P + NI/T) × PZ × LZ, NI/P = eventNearThePowerLines, NI/T = eventNearTheTelecomeLines, PZ = protectionPZ, LZ = ecoLossOfFailureOfInternalSystemL1
      if(form.controls.structureAttributes.controls[0].controls.eventNearThePowerLines!='' &&  form.controls.structureAttributes.controls[0].controls.eventNearTheTelecomeLines!='' && form.controls.protection.controls[0].controls.protectionPZ!='' && form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1!='' && form.controls.structureAttributes.controls[0].controls.eventNearThePowerLines!=null &&  form.controls.structureAttributes.controls[0].controls.eventNearTheTelecomeLines!=null && form.controls.protection.controls[0].controls.protectionPZ!=null && form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1!=null && form.controls.structureAttributes.controls[0].controls.eventNearThePowerLines!=undefined  && form.controls.structureAttributes.controls[0].controls.eventNearTheTelecomeLines!=undefined && form.controls.protection.controls[0].controls.protectionPZ!=undefined && form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1!=undefined){
        var h=(+form.controls.structureAttributes.controls[0].controls.eventNearThePowerLines.value+ +form.controls.structureAttributes.controls[0].controls.eventNearTheTelecomeLines.value)*form.controls.protection.controls[0].controls.protectionPZ.value*form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1.value;
        form.controls.riskProtection.controls[0].controls.econamicValueRZ.setValue(h.toFixed(23));
      }
      else{
        form.controls.riskProtection.controls[0].controls.econamicValueRZ.setValue('');
      }
      this.lossCulturalRD4(event,form);
      this.lossCulturalRI4(event,form);
      
    }

    // RD4 = riskProtectionRD4, formula = RA4 + RB4 + RC4+ RU4 + RV4 + RW4  
    lossCulturalRD4(event:any,form:any){
      if(form.controls.riskProtection.controls[0].controls.econamicValueRA!='' && form.controls.riskProtection.controls[0].controls.econamicValueRB!='' && form.controls.riskProtection.controls[0].controls.econamicValueRC!='' && form.controls.riskProtection.controls[0].controls.econamicValueRU!='' && form.controls.riskProtection.controls[0].controls.econamicValueRV!='' && form.controls.riskProtection.controls[0].controls.econamicValueRW!='' && form.controls.riskProtection.controls[0].controls.econamicValueRA!=null && form.controls.riskProtection.controls[0].controls.econamicValueRB!=null && form.controls.riskProtection.controls[0].controls.econamicValueRC!=null && form.controls.riskProtection.controls[0].controls.econamicValueRU!=null && form.controls.riskProtection.controls[0].controls.econamicValueRV!=null && form.controls.riskProtection.controls[0].controls.econamicValueRW!=null && form.controls.riskProtection.controls[0].controls.econamicValueRA!=undefined && form.controls.riskProtection.controls[0].controls.econamicValueRB!=undefined && form.controls.riskProtection.controls[0].controls.econamicValueRC!=undefined && form.controls.riskProtection.controls[0].controls.econamicValueRU!=undefined && form.controls.riskProtection.controls[0].controls.econamicValueRV!=undefined && form.controls.riskProtection.controls[0].controls.econamicValueRW!=undefined){

        var a=(+form.controls.riskProtection.controls[0].controls.econamicValueRA.value+ +form.controls.riskProtection.controls[0].controls.econamicValueRB.value+ +form.controls.riskProtection.controls[0].controls.econamicValueRC.value+ +form.controls.riskProtection.controls[0].controls.econamicValueRU.value+ +form.controls.riskProtection.controls[0].controls.econamicValueRV.value+ +form.controls.riskProtection.controls[0].controls.econamicValueRW.value)

        form.controls.calculatedRisk.controls[0].controls.riskProtectionRD4.setValue(a.toExponential(1));
      }else{
        form.controls.calculatedRisk.controls[0].controls.riskProtectionRD4.setValue('');
      }
      this.lossCulturalR4(event,form);
    }

    // RI4 = riskProtectionRI4, formula = RM4 + RZ4
    lossCulturalRI4(event:any,form:any){
      if(form.controls.riskProtection.controls[0].controls.econamicValueRM!='' && form.controls.riskProtection.controls[0].controls.econamicValueRZ!='' && form.controls.riskProtection.controls[0].controls.econamicValueRM!=null && form.controls.riskProtection.controls[0].controls.econamicValueRZ!=null && form.controls.riskProtection.controls[0].controls.econamicValueRM!=undefined && form.controls.riskProtection.controls[0].controls.econamicValueRZ!=undefined){
        var a=(+form.controls.riskProtection.controls[0].controls.econamicValueRM.value+ +form.controls.riskProtection.controls[0].controls.econamicValueRZ.value)
        form.controls.calculatedRisk.controls[0].controls.riskProtectionRI4.setValue(a.toExponential(1));
      }else{
        form.controls.calculatedRisk.controls[0].controls.riskProtectionRI4.setValue('');
      }
      this.lossCulturalR4(event,form);
    }
    // R4 = riskProtectionR4, formula = Rd4 + Ri4
    lossCulturalR4(event:any,form:any){
      if(form.controls.calculatedRisk.controls[0].controls.riskProtectionRD4!='' && form.controls.calculatedRisk.controls[0].controls.riskProtectionRI4!='' && form.controls.calculatedRisk.controls[0].controls.riskProtectionRD4!=null && form.controls.calculatedRisk.controls[0].controls.riskProtectionRI4!=null && form.controls.calculatedRisk.controls[0].controls.riskProtectionRD4!=undefined && form.controls.calculatedRisk.controls[0].controls.riskProtectionRI4!=undefined){
        var a=(+form.controls.calculatedRisk.controls[0].controls.riskProtectionRD4.value+ +form.controls.calculatedRisk.controls[0].controls.riskProtectionRI4.value)
        form.controls.calculatedRisk.controls[0].controls.riskProtectionR4.setValue(a.toExponential(1));
      }else{
        form.controls.calculatedRisk.controls[0].controls.riskProtectionR4.setValue('');
      }
    }

  onChangeForm(event:any){
    if(!this.step2Form.invalid){
      if(this.step2Form.dirty){
        this.validationError=false;
        this.service.lvClick=1;
        this.service.logoutClick=1;
         this.service.windowTabClick=1;
      }
      else{
        this.validationError=false;
        this.service.lvClick=0;
        this.service.logoutClick=0;
        this.service.windowTabClick=0;
      }
     }
     else {
      this.service.lvClick=1;
      this.service.logoutClick=1;
      this.service.windowTabClick=1;
     }
  }
  onKeyForm(event: KeyboardEvent) { 
   if(!this.step2Form.invalid){ 
    if(this.step2Form.dirty){
      this.validationError=false;
      this.service.lvClick=1;
      this.service.logoutClick=1;
      this.service.windowTabClick=1;
    }
    else{
      this.validationError=false;
      this.service.lvClick=0;
      this.service.logoutClick=0;
      this.service.windowTabClick=0;
    }
   }
   else {
    this.service.lvClick=1;
    this.service.logoutClick=1;
    this.service.windowTabClick=1;
   }
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
    // if (this.step2Form.invalid) {
    //   this.validationError = true;
    //   this.validationErrorMsg = 'Please check all the fields';
    //   setTimeout(() => {
    //     this.validationError = false;
    //   }, 3000);
    //   return;
    // }
    
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

  retriveRiskDetails(){
    debugger
    this.proceedFlag = false;
    this.riskAssessmentService.retriveRiskAssessmentDetails(this.router.snapshot.paramMap.get('email') || '{}',this.riskAssessmentDetails.riskId).subscribe(
      data => {
        if (JSON.parse(data)[0] != undefined && JSON.parse(data)[0].riskId != null) {
          this.updateRiskDetails(this.riskAssessmentDetails.userName,this.riskId,JSON.parse(data)[0]);
          setTimeout(() => {
            if(!this.step2Form.invalid) {
              this.enablePrint =true;
            }
          }, 3000);
        }
      },
      error => {
      }
    );  
  }

  updateRiskDetails(userName: any, riskId: any, data:any,){
    this.proceedFlag = false;
    this.updateButton = true;
    this.saveButton = false;
    if(data.structureCharacteristics == undefined ){
      this.riskList = data;
     }
     else{
      this.riskList = data.structureCharacteristics;
     }
      this.riskGlobal.riskId=riskId;
      this.riskAssessmentDetails.riskId = riskId;
      this.riskAssessmentDetails.createdBy = this.riskList.createdBy;
      this.riskAssessmentDetails.createdDate = this.riskList.createdDate;
      this.riskAssessmentDetails.userName = this.riskList.userName;
      this.riskAssessmentDetails.projectName = this.riskList.projectName;
      this.projectName = this.riskList.projectName;
      this.riskAssessmentDetails.updatedDate = this.riskList.updatedDate;
      this.riskAssessmentDetails.updatedBy = this.riskList.updatedBy;
      this.riskAssessmentRetrieve(this.riskList);
      setTimeout(() => {
        if(!this.step2Form.invalid) {
          this.enablePrint = true;
        }
        else {
          this.enablePrint = false;
        }
      }, 3000);
    this.flag = true;
  }

  migratedData(event:any,form:any){
    debugger
    this.riskGlobal.migDataCheck();
    this.migrationData.emit(true);
    if(this.riskGlobal.migData=="Migrated Data" && this.riskGlobal.migDataFlag==true){
      this.calculatedProtection(event,form);
    }
  }
  
  calculatedProtection(event:any,form:any){
    this.shieldingGroundingIsolationD(form.controls.structureCharacters.controls[0]);
    this.shieldingGroundingIsolationL1D(event,form.controls.structureCharacters.controls[0]);
    this.protectionPA(event,form.controls.structureCharacters.controls[0]);
    this.protectionPm(event,form.controls.structureCharacters.controls[0]);
    this.protectionPms(event,form.controls.structureCharacters.controls[0]);
  }

  riskAssessmentRetrieve(item:any){
    this.popArray.push(this.structureCharactersFormRtr(item,this.step2Form));
    this.step2Form.setControl('structureCharacters', this.formBuilder.array(this.popArray || []));
    this.popArray = [];
  }

  reloadFromBack(){
    if(this.step2Form.invalid){
      this.service.isCompleted2= false;
      this.service.isLinear=true;
      this.validationErrorTab = true;
      this.validationErrorMsgTab= 'Please check all the fields in Risk Assessment Details';
      setTimeout(() => {
        this.validationErrorTab = false;
      }, 3000);
      return false;
     }
    else if(this.step2Form.dirty && this.step2Form.touched){
      this.service.isCompleted2= false;
      this.service.isLinear=true;
      this.tabError = true;
      this.tabErrorMsg = 'Kindly click on Save or Update button to update the changes!';
      setTimeout(() => {
        this.tabError = false;
      }, 3000);
      return false;
    }
    else{
      this.service.isCompleted2= true;
      this.service.isLinear=false;
      this.step2Form.markAsPristine();
    return true;
    }
  }

  //To get the value of RiskId form MAT STEPPER
  appendRiskId(riskId: any,projectName: any) {
    this.riskAssessmentDetails.riskId = riskId;
    this.projectName = projectName;
    this.riskId = riskId;
  }

  printPdf(content1:any,content2:any) {
    if(this.step2Form.dirty && this.step2Form.touched){
      this.modalService.open(content1, { centered: true,backdrop: 'static' });
      this.printMsg=true;
      this.printDirtyMsg="Please click the update button, To reflect the modified data in PDF..!";
    }
    else{
      this.blurMode=true;
      this.blurMsg="Your PDF will be generating, Please wait a while";
      this.riskfinalpdfService.printPDF(this.riskAssessmentDetails.riskId,this.riskAssessmentDetails.userName,this.projectName).subscribe(
        data =>{
          // Popup msg
            this.blurMode=false;
            this.blurMsg="";
            this.printPopup=false;
            this.successPdf=false;
            this.printSuccessMsg="";
            var fileURL: any = URL.createObjectURL(data);
            var a = document.createElement("a");
            a.href = fileURL;
            a.target = '_blank';
            a.click();
            this.modalService.dismissAll();
        },
        error=>{
          this.printPopup=true;
          this.successPdf=false;
          this.printSuccessMsg="";
          setTimeout(()=>{
            this.blurMode=false;
            this.blurMsg="";
            this.modalService.open(content2, { centered: true,backdrop: 'static' });
            this.errorPdf=true;
            this.printErrorMsg="Something went wrong, Please try again later";
          },2000);
        })
    }
  }

  // Submitting to DB
  onSubmit(flag:any) {
    debugger
    //this.submitted=true;
      // if (this.step2Form.invalid) {
      //   return;
      // }
    //  this.spinner = true;
     this.popup=false;
    this.riskAssessmentDetails = this.step2Form.value.structureCharacters[0];
    this.riskAssessmentDetails.riskId = this.riskGlobal.riskId;
    this.riskAssessmentDetails.userName = this.router.snapshot.paramMap.get('email') || '{}';
    this.riskAssessmentDetails.updatedDate = this.riskList.updatedDate;
    this.riskAssessmentDetails.updatedBy = this.riskList.updatedBy;

    //if (!this.validationError) {
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
        this.riskAssessmentDetails.projectName = this.riskGlobal.projectName;

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
    //  }
  }

  gotoNextTab() {
    if (this.step2Form.dirty && this.step2Form.invalid) {
      this.service.isCompleted = false;
      this.service.isLinear = true;
      this.service.editable = false;
      //this.validationError = false;
      this.validationErrorTab = true;
      this.validationErrorMsgTab = 'Please check all the fields in basic information';
      setTimeout(() => {
        this.validationErrorTab = false;
      }, 3000);
      return;
    }
    else if (this.step2Form.dirty && this.step2Form.touched) {
      this.service.isCompleted = false;
      this.service.isLinear = true;
      this.service.editable = false;
      this.tabError = true;
      this.tabErrorMsg = 'Kindly click on next button to update the changes!';
      setTimeout(() => {
        this.tabError = false;
      }, 3000);
      return;
    }
    else {
      this.service.isCompleted = true;
      this.service.isLinear = false;
      this.service.editable = true;
    }
  }

}
