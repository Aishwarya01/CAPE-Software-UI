import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ThumbsConstraints } from '@syncfusion/ej2-angular-diagrams';
import { ConfirmationBoxComponent } from 'src/app/confirmation-box/confirmation-box.component';
import { GlobalsService } from 'src/app/globals.service';
import { SuperAdminDev } from 'src/environments/environment.dev';
import { SuperAdminProd } from 'src/environments/environment.prod';
import { CustomerDetails } from '../../Risk Assesment Model/customer-details';
import { RiskAssessmentDetails } from '../../Risk Assesment Model/risk-assessment-details';
import { CustomerDetailsServiceService } from '../../Risk Assessment Services/customer-details-service.service';
import { RiskAssessmentDetailsServiceService } from '../../Risk Assessment Services/risk-assessment-details-service.service';
import { RiskfinalpdfService } from '../../Risk Assessment Services/riskfinalpdf.service';
import { RiskglobalserviceService } from '../../riskglobalservice.service';
import { RiskParentComponentComponent } from '../risk-parent-component/risk-parent-component.component';
import { RiskAssessmentConstants } from '../risk_assessment_constants/risk-assessment-constants';

@Component({
  selector: 'app-risk-assessment-details',
  templateUrl: './risk-assessment-details.component.html',
  styleUrls: ['./risk-assessment-details.component.css'],
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
  @Output() navigateStepSummary: EventEmitter<any> = new EventEmitter();
  riskList: any=[];
  disable: boolean=false;
  popArray: any = [];
  riskId: Number=0;
  locationRtr: String = "";
  getLocation: String='';
  groundFlashDensityGet: any;
  tabError: boolean = false;
  tabErrorMsg: string = "";
  tabError1: boolean = false;
  tabErrorMsg1: string = "";
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

  validationErrorTab1: boolean=false;
  validationErrorMsgTab1: string='';

  updateButton: boolean=false;
  saveButton: boolean=true;
  riskInputValue: any;
  enableSubmit: boolean = false;
  projectName: any = '';
  organisationName: any='';
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

  // Risk assessment constants
  riskAssessmentConstants = new RiskAssessmentConstants(); 
  gfdValueArr: any=[];
  valueGFD: any;
  // dirtyCheck: boolean=false;
  // dirtyMsg: String="";
  gfdDirtyCheckSts: boolean=false;
  step2DirtyCheck: boolean=false;
  ste2present: boolean=false;
  selectedIndex: number=0;
  // Super Admin
  email: String = '';
  riskConstDev = new SuperAdminDev();
  riskConstProd = new SuperAdminProd();
  submittedButton: boolean = true;

  // From final report
  isEditable: boolean=false;
  buttonType: boolean=false;
  customerDetailsModel = new CustomerDetails;
  dataArr: any;
  buttonName: string="";
  fileFlag:boolean=false;
  finalSpinner: boolean=false;
  finalSubmit: boolean=false;
  successMsgArr: any;

  constructor(private router: ActivatedRoute,
              private formBuilder: FormBuilder,
              private modalService: NgbModal,
              private dialog: MatDialog,
              private riskAssessmentService: RiskAssessmentDetailsServiceService,
              public riskGlobal: RiskglobalserviceService, 
              public service: GlobalsService,
              private riskfinalpdfService: RiskfinalpdfService,
              private parentComponent: RiskParentComponentComponent,
              private customerDetailsService :CustomerDetailsServiceService
  ) { 
    this.email = this.router.snapshot.paramMap.get('email') || '{}'
    for( let i=0; i<this.riskConstDev.riskAdminEmail.length; i++){
      if(this.riskConstDev.riskAdminEmail[i] == this.email)
      {
        this.submittedButton = false;
      }
    }
    for( let i=0; i<this.riskConstProd.riskAdminEmail.length; i++){
      if(this.riskConstProd.riskAdminEmail[i] == this.email)
      {
        this.submittedButton = false;
      }
    }
   }

  ngOnInit(): void {
                // Fetching location list 
                // this.locationList = this.riskAssessmentConstants.locationName;
                // this.riskAssessmentService.fetchLocation().subscribe(
                //   data=> {
                //     this.originalData = JSON.parse(data);
                //     this.locationList = [];

      // Fecting location names from constant class
      this.locationList = [];
      for(let i of this.riskAssessmentConstants.locationName){
        if(i.location == 'Others') {
          this.locationList.push(i);
        }
      }
      for(let j of this.riskAssessmentConstants.locationName) {
        if(j.location != 'Others') {
          this.locationList.push(j);
        }
      }
      this.locationList.sort((a: any, b: any) => (a.location > b.location) ? 1 : -1);

      this.step2Form = this.formBuilder.group({
        structureCharacters: this.formBuilder.array([this.structureCharactersForm()])
      });
                    // setTimeout(() => {
                    //   this.migratedData('',this.step2Form);
                    // }, 3000);
  }

  gdValueEvent(item:any,form:any){
    this.gfdValueArr = this.riskAssessmentConstants.locationName;
    for(let arr of this.gfdValueArr){

      if(arr.location == this.getLocation && arr.gfdValue!=parseFloat(this.groundFlashDensityGet)){
        this.riskGlobal.dirtyCheck=true;
        this.riskGlobal.dirtyMsg="Your 'Ground flash density value' has been updated as per standards, Please click update button";
        form.controls.structureCharacters.controls[0].controls.groundFlashDensity.setValue(arr.gfdValue);
        this.gfdDirtyCheckSts=true;
        this.gfdDirtyCheck(form);

        setTimeout(() => {
          this.riskGlobal.dirtyCheck=false;
          this.riskGlobal.dirtyMsg="";
        }, 10000);
        }
    }
  } 

  gfdDirtyCheck(form:any){
    if(this.gfdDirtyCheckSts && this.step2DirtyCheck){
      this.step2DirtyCheck=false;
      this.gfdDirtyCheckSts=false;
      this.step2Form.markAsDirty();
      this.step2Form.markAllAsTouched();
    }
    else if(this.ste2present && this.riskGlobal.presentedStep==1){
      this.ste2present=false;
      this.gfdDirtyCheckSts=false;
      this.step2DirtyCheck=false;
      this.step2Form.markAsDirty();
      this.step2Form.markAllAsTouched();
    }
    else if(this.parentComponent.nextButtonClicked==true){
      this.ste2present=false;
      this.gfdDirtyCheckSts=false;
      this.step2DirtyCheck=false;
      this.step2Form.markAsDirty();
      this.step2Form.markAllAsTouched();
    }
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
      protectionPEB: new FormControl(''),
      protectionPMS: new FormControl('', Validators.required),
      protectionPM: new FormControl('', Validators.required),
      protectionPA: new FormControl('', Validators.required),
      protectionPC: new FormControl('', Validators.required),
      protectionPU: new FormControl('', Validators.required),
      protectionPV: new FormControl('', Validators.required),
      protectionPW: new FormControl('', Validators.required),
      protectionPZ: new FormControl('', Validators.required),

      // RISK OF LOSS OF HUMAN BEINGS (R1)	
      riskProtectionRA1: new FormControl('', Validators.required),
      riskProtectionRB1: new FormControl('', Validators.required),
      riskProtectionRC1: new FormControl('', Validators.required),
      riskProtectionRM1: new FormControl('', Validators.required),
      riskProtectionRU1: new FormControl('', Validators.required),
      riskProtectionRV1: new FormControl('', Validators.required),
      riskProtectionRW1: new FormControl('', Validators.required),
      riskProtectionRZ1: new FormControl('', Validators.required),
    
      // RB2
      riskProtectionRB2: new FormControl('', Validators.required),

      // RISK OF LOSS OF CULTURAL HERITAGE (R3)
      culturalRB: new FormControl('', Validators.required),
      culturalRV: new FormControl('', Validators.required),

    })
  }

  private riskProtectionForm(): FormGroup {
    return new FormGroup({
      // riskProtectionId: new FormControl(''),
      riskProtectionRC2: new FormControl('', Validators.required),
      riskProtectionRM2: new FormControl('', Validators.required),
      riskProtectionRV2: new FormControl('', Validators.required),
      riskProtectionRW2: new FormControl('', Validators.required),
      riskProtectionRZ2: new FormControl('', Validators.required),

      // RISK OF LOSS OF ECONOMIC VALUE (R4), 
      // Insteed of the RA4 we gave econamicValueRA to econamicValueRZ upto RZ4
      
      econamicValueRA: new FormControl('', Validators.required),
      econamicValueRB: new FormControl('', Validators.required),
      econamicValueRC: new FormControl('', Validators.required),
      econamicValueRM: new FormControl('', Validators.required),
      econamicValueRU: new FormControl('', Validators.required),
      econamicValueRV: new FormControl('', Validators.required),
      econamicValueRW: new FormControl('', Validators.required),
      econamicValueRZ: new FormControl('', Validators.required),
    })
  }

  private calculatedRiskForm(): FormGroup {
    return new FormGroup({
      lossOfHumanLifeRT1: new FormControl('1.00E-05'),
      lossOfPublicSerivceRT2: new FormControl('1.00E-03'),
      lossOfCulturalHeritageRT3: new FormControl('1.00E-04'),
      economicLossRT4: new FormControl('1.00E-03'),

      riskProtectionR1: new FormControl('',Validators.required),
      riskProtectionR2: new FormControl('',Validators.required),
      riskProtectionR3: new FormControl('',Validators.required),
      riskProtectionR4: new FormControl('',Validators.required),

      riskProtectionRD1: new FormControl('',Validators.required),
      riskProtectionRD2: new FormControl('',Validators.required),
      riskProtectionRD3: new FormControl('',Validators.required),
      riskProtectionRD4: new FormControl('',Validators.required),

      riskProtectionRI1: new FormControl('',Validators.required),
      riskProtectionRI2: new FormControl('',Validators.required),
      riskProtectionRI3: new FormControl(0,Validators.required),
      riskProtectionRI4: new FormControl('',Validators.required),
    })
  }

  // Retrieve purpose
  structureCharactersFormRtr(item: any, form:any): FormGroup {
    this.getLocation=item.location;
    this.groundFlashDensityGet=item.groundFlashDensity;
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
      protectionId: new FormControl({ disabled: false, value: item.protectionId }, Validators.required),
      protectionPEB: new FormControl({ disabled: false, value: item.protectionPEB }),
      protectionPMS: new FormControl({ disabled: false, value: item.protectionPMS }, Validators.required),
      protectionPM: new FormControl({ disabled: false, value: item.protectionPM }, Validators.required),
      protectionPA: new FormControl({ disabled: false, value: item.protectionPA }, Validators.required),
      protectionPC: new FormControl({ disabled: false, value: item.protectionPC }, Validators.required),
      protectionPU: new FormControl({ disabled: false, value: item.protectionPU }, Validators.required),
      protectionPV: new FormControl({ disabled: false, value: item.protectionPV }, Validators.required),
      protectionPW: new FormControl({ disabled: false, value: item.protectionPW }, Validators.required),
      protectionPZ: new FormControl({ disabled: false, value: item.protectionPZ }, Validators.required),
      // RISK OF LOSS OF HUMAN BEINGS (R1)	
      riskProtectionRA1: new FormControl({ disabled: false, value: item.riskProtectionRA1 }, Validators.required),
      riskProtectionRB1: new FormControl({ disabled: false, value: item.riskProtectionRB1 }, Validators.required),
      riskProtectionRC1: new FormControl({ disabled: false, value: item.riskProtectionRC1 }, Validators.required),
      riskProtectionRM1: new FormControl({ disabled: false, value: item.riskProtectionRM1 }, Validators.required),
      riskProtectionRU1: new FormControl({ disabled: false, value: item.riskProtectionRU1 }, Validators.required),
      riskProtectionRV1: new FormControl({ disabled: false, value: item.riskProtectionRV1 }, Validators.required),
      riskProtectionRW1: new FormControl({ disabled: false, value: item.riskProtectionRW1 }, Validators.required),
      riskProtectionRZ1: new FormControl({ disabled: false, value: item.riskProtectionRZ1 }, Validators.required),
      riskProtectionRB2: new FormControl({ disabled: false, value: item.riskProtectionRB2 }, Validators.required),

      culturalRB: new FormControl({ disabled: false, value: item.culturalRB }, Validators.required),
      culturalRV: new FormControl({ disabled: false, value: item.culturalRV }, Validators.required),
    })
  }

  riskProtectionRtr(item: any): FormGroup{
    return this.formBuilder.group({
      riskProtectionId: new FormControl({ disabled: false, value: item.riskProtectionId }),

      riskProtectionRC2: new FormControl({ disabled: false, value: item.riskProtectionRC2 }, Validators.required),
      riskProtectionRM2: new FormControl({ disabled: false, value: item.riskProtectionRM2 }, Validators.required),
      riskProtectionRV2: new FormControl({ disabled: false, value: item.riskProtectionRV2 }, Validators.required),
      riskProtectionRW2: new FormControl({ disabled: false, value: item.riskProtectionRW2 }, Validators.required),
      riskProtectionRZ2: new FormControl({ disabled: false, value: item.riskProtectionRZ2 }, Validators.required),

      econamicValueRA: new FormControl({ disabled: false, value: item.econamicValueRA }, Validators.required),
      econamicValueRB: new FormControl({ disabled: false, value: item.econamicValueRB }, Validators.required),
      econamicValueRC: new FormControl({ disabled: false, value: item.econamicValueRC }, Validators.required),
      econamicValueRM: new FormControl({ disabled: false, value: item.econamicValueRM }, Validators.required),
      econamicValueRU: new FormControl({ disabled: false, value: item.econamicValueRU }, Validators.required),
      econamicValueRV: new FormControl({ disabled: false, value: item.econamicValueRV }, Validators.required),
      econamicValueRW: new FormControl({ disabled: false, value: item.econamicValueRW }, Validators.required),
      econamicValueRZ: new FormControl({ disabled: false, value: item.econamicValueRZ }, Validators.required),
    })
  }

  calculatedRiskRtr(item: any): FormGroup{
    return this.formBuilder.group({
      calculatedRiskId: new FormControl({ disabled: false, value: item.calculatedRiskId }),

      lossOfHumanLifeRT1: new FormControl({ disabled: false, value: item.lossOfHumanLifeRT1 }),
      lossOfPublicSerivceRT2: new FormControl({ disabled: false, value: item.lossOfPublicSerivceRT2 }),
      lossOfCulturalHeritageRT3: new FormControl({ disabled: false, value: item.lossOfCulturalHeritageRT3 }),
      economicLossRT4: new FormControl({ disabled: false, value: item.economicLossRT4 }),

      riskProtectionRD1: new FormControl({ disabled: false, value: item.riskProtectionRD1 }, Validators.required),
      riskProtectionRD2: new FormControl({ disabled: false, value: item.riskProtectionRD2 }, Validators.required),
      riskProtectionRD3: new FormControl({ disabled: false, value: item.riskProtectionRD3 }, Validators.required),
      riskProtectionRD4: new FormControl({ disabled: false, value: item.riskProtectionRD4 }, Validators.required),

      riskProtectionRI1: new FormControl({ disabled: false, value: item.riskProtectionRI1 }, Validators.required),
      riskProtectionRI2: new FormControl({ disabled: false, value: item.riskProtectionRI2 }, Validators.required),
      riskProtectionRI3: new FormControl({ disabled: false, value: item.riskProtectionRI3 }, Validators.required),
      riskProtectionRI4: new FormControl({ disabled: false, value: item.riskProtectionRI4 }, Validators.required),

      riskProtectionR1: new FormControl({ disabled: false, value: item.riskProtectionR1 }, Validators.required),
      riskProtectionR2: new FormControl({ disabled: false, value: item.riskProtectionR2 }, Validators.required),
      riskProtectionR3: new FormControl({ disabled: false, value: item.riskProtectionR3 }, Validators.required),
      riskProtectionR4: new FormControl({ disabled: false, value: item.riskProtectionR4 }, Validators.required),
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

  // Only Accept numbers
  keyPressNumbers(event:any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if (charCode==101 || charCode==69 || charCode==43 || charCode==45) {
      event.preventDefault();
      return false;
    }
    else {
      return true;
    }
  }

  changeLocation(e: any, form:any) {
    this.locationDrop=true;
    let selectedValue = e.target.value;
    this.getLocation='';
    this.spinner=true;
    this.blurMode=true;
    this.blurMsg="Please wait Loading...";
    setTimeout(()=>{
      for(let i of this.riskAssessmentConstants.locationName ) {
        if(i.location == selectedValue) {
          form.controls.groundFlashDensity.setValue(i.gfdValue);
          this.showFlashDensity = true;
          this.locationDrop=false;
        }
        if(selectedValue == 'Others') {
          form.controls.groundFlashDensity.setValue();
          this.showFlashDensity = false;
        }
      }
      this.spinner=false;
      this.blurMode=false;
      this.blurMsg="";
    },3000);
  }

  // Changing number into String for Pdf

  // Height of Nearby Structure
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

  // Electrical / Telephone Service Line
  telephoneServiceLineD(event:any,form:any){
    if(form.controls.telephoneServiceLine.value == 'LV power, telecommunication or data line'){
      form.controls.telephoneServiceLineDrop.setValue("1");
    }
    else if(form.controls.telephoneServiceLine.value == 'HV power (with HV/LV transformer)'){
      form.controls.telephoneServiceLineDrop.setValue("0.2");
    }
  }

  // Environment Drop Down list changes
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

  // Under Structure's Attributes Form Array  
  // Type of Floor Surface
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

  // Additional Protection
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
    else if(form.controls.structureAttributes.controls[0].controls.stAdditionalProtection.value == 'Effective Soil equipotentialisation'){
      form.controls.structureAttributes.controls[0].controls.stAdditionalProtectionDrop.setValue("0.01");
    }
    else if(form.controls.structureAttributes.controls[0].controls.stAdditionalProtection.value == 'Physical restriction'){
      form.controls.structureAttributes.controls[0].controls.stAdditionalProtectionDrop.setValue("0");
    }
  }

  // Fire Protection Measures
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

  // Type of Internal Wiring
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

  // Type of Power Lines
  typeOfPowerLinesD(event:any,form:any){
      if(form.controls.structureAttributes.controls[0].controls.typeOfPowerLines.value == 'Overhead'){
        form.controls.structureAttributes.controls[0].controls.typeOfPowerLinesDrop.setValue("1");
      }
      else if(form.controls.structureAttributes.controls[0].controls.typeOfPowerLines.value == 'U.G cable from Electricity supplier'){
        form.controls.structureAttributes.controls[0].controls.typeOfPowerLinesDrop.setValue("0.5");
      }
      else if(form.controls.structureAttributes.controls[0].controls.typeOfPowerLines.value == 'U.G cable from own transformer'){
        form.controls.structureAttributes.controls[0].controls.typeOfPowerLinesDrop.setValue("0.01");
      }
  }

  // Shielding, grounding, isolation
  shieldingGroundingIsolationD(event:any,form:any){
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
  }

  // Type of Telecom Lines
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

  // Shielding, grounding, isolation
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
  }

  // Losses
  // Hazard Classification
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

  // Loss Due To Physical Damage
  humanLossOfphysicalDamageD(event:any,form:any){
    if(form.controls.losses.controls[0].controls.humanLossOfphysicalDamage.value == 'Risk of explosion'){
      form.controls.losses.controls[0].controls.humanLossOfphysicalDamageDrop.setValue("0.1");
    }
    else if(form.controls.losses.controls[0].controls.humanLossOfphysicalDamage.value == 'Hospitals, hotel,school,civic building'){
      form.controls.losses.controls[0].controls.humanLossOfphysicalDamageDrop.setValue("0.1");
    }
    else if(form.controls.losses.controls[0].controls.humanLossOfphysicalDamage.value == 'Public entertainment,church,museum'){
      form.controls.losses.controls[0].controls.humanLossOfphysicalDamageDrop.setValue("0.05");
    }
    else if(form.controls.losses.controls[0].controls.humanLossOfphysicalDamage.value == 'Industrial, commercial'){
      form.controls.losses.controls[0].controls.humanLossOfphysicalDamageDrop.setValue("0.02");
    }
    else if(form.controls.losses.controls[0].controls.humanLossOfphysicalDamage.value == 'Others'){
      form.controls.losses.controls[0].controls.humanLossOfphysicalDamageDrop.setValue("0.01");
    }
  }

  // Loss Due To Failure Of Internal Systems
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

  // Loss Due To Physical Damage
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

  // Loss Due To Failure Of Internal System
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

  // Loss Due To Physical Damage
  culHerOfPhysicalDamageD(event:any,form:any){
    if(form.controls.losses.controls[0].controls.culHerOfPhysicalDamage.value == 'Museums,galleries'){
      form.controls.losses.controls[0].controls.culHerOfPhysicalDamageDrop.setValue("0.1");
    }
    else if(form.controls.losses.controls[0].controls.culHerOfPhysicalDamage.value == 'No Cultural Heritage'){
      form.controls.losses.controls[0].controls.culHerOfPhysicalDamageDrop.setValue("0");
    }
  }

  // Loss Due To Physical Damage
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

  // Loss Due To Failure Of Internal System
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

  // Class of LPS
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

  // Class of SPD
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
    // Formula = L×W+6H×(L+W)+9∏H2
    if(form.controls.protrusionLenght.value!='' && form.controls.protrusionWidth.value!='' && form.controls.protrusionHeight.value!='' && form.controls.protrusionLenght.value!=null && form.controls.protrusionWidth.value!=null && form.controls.protrusionHeight.value!=null && form.controls.protrusionLenght.value!=undefined && form.controls.protrusionWidth.value!=undefined && form.controls.protrusionHeight.value!=undefined){

      var a=(+form.controls.protrusionLenght.value*form.controls.protrusionWidth.value+ +6*(form.controls.protrusionHeight.value)*(+form.controls.protrusionLenght.value+ +form.controls.protrusionWidth.value)+ +9*(3.14)*(form.controls.protrusionHeight.value*form.controls.protrusionHeight.value));
      
      form.controls.collectionAreaOfStructure.setValue(a.toFixed(2));
    }
    else{
      form.controls.collectionAreaOfStructure.setValue('');
    }

    // Formula = 2×500(L+W)+∏5002
    if(form.controls.protrusionWidth.value!='' && form.controls.protrusionLenght.value!='' && form.controls.protrusionWidth.value!='' && form.controls.protrusionLenght.value!=null && form.controls.protrusionWidth.value!=null && form.controls.protrusionLenght.value!=undefined){
      var b=2*500*(+form.controls.protrusionLenght.value+ +form.controls.protrusionWidth.value)+3.14*(250000);
      form.controls.collAreaOfNearStructure.setValue(b.toFixed(2));
    }
    else{
      form.controls.collAreaOfNearStructure.setValue('');
    }
  }

  // Math for Collection area of structure with protrusion
  // Formula = 9∏HP2
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
    // Formula = NG×AD×CD×10-6
    if(form.controls.heightNearByStructure!='' && form.controls.collectionAreaOfStructure!='' && form.controls.groundFlashDensity!='' && form.controls.heightNearByStructure!=null && form.controls.collectionAreaOfStructure!=null && form.controls.groundFlashDensity!=null && form.controls.heightNearByStructure!=undefined && form.controls.collectionAreaOfStructure!=undefined && form.controls.groundFlashDensity!=undefined){

      var a = form.controls.groundFlashDensity.value*form.controls.collectionAreaOfStructure.value*form.controls.heightNearByStructureDrop.value*0.000001;
      form.controls.noOfDangerousEventOnStructure.setValue(a.toFixed(12));
    }
    else{
      form.controls.noOfDangerousEventOnStructure.setValue('');
    }
    this.lossOfHumanCalc(event,form);
    this.lossOfServiceCalc(event,form);
    this.lossCulturalCalc(event,form);
    this.lossEconomicCalc(event,form);
  }

  // Math for No of dangerous event near the structure
  noOfDangerus(event:any, form:any){
    this.heightNearByStructureD(event,form);
    this.telephoneServiceLineD(event,form);
    // Formula = NG×AM×10-6
    if(form.controls.groundFlashDensity!='' && form.controls.collAreaOfNearStructure!='' && form.controls.groundFlashDensity!=null && form.controls.collAreaOfNearStructure!=null && form.controls.groundFlashDensity!=undefined && form.controls.collAreaOfNearStructure!=undefined){

      var a = form.controls.groundFlashDensity.value*form.controls.collAreaOfNearStructure.value*0.000001;

      form.controls.noOfDangerousEventNearStructure.setValue(a.toFixed(10));
    }
    else{
      form.controls.noOfDangerousEventNearStructure.setValue('');
    }

    // Formula = NG×ADJ×CDJ×CT×10-6
    if(form.controls.groundFlashDensity!='' && form.controls.collAreaOfAdjacentStruc!='' && form.controls.telephoneServiceLine!='' && form.controls.heightNearByStructure!='' && form.controls.groundFlashDensity!=null && form.controls.collAreaOfAdjacentStruc!=null && form.controls.telephoneServiceLine!=null && form.controls.heightNearByStructure!=null && form.controls.groundFlashDensity!=undefined && form.controls.collAreaOfAdjacentStruc!=undefined && form.controls.telephoneServiceLine!=undefined && form.controls.heightNearByStructure!=undefined){

      var b=form.controls.groundFlashDensity.value*form.controls.collAreaOfAdjacentStruc.value*form.controls.heightNearByStructureDrop.value*form.controls.telephoneServiceLineDrop.value*0.000001;
      form.controls.noOfDangEventOnAdjacentStruc.setValue(b.toFixed(12));
    }
    else{
      form.controls.noOfDangEventOnAdjacentStruc.setValue('');
    }

    this.lossOfServiceCalc(event,form);
    this.lossEconomicCalc(event,form);
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
    // Formula = LJ ×WJ+6HJ×(LJ+WJ)+9∏HJ2
    if(form.controls.adjacentLength!='' && form.controls.adjacentWidth!='' && form.controls.adjacentHeight!='' && form.controls.adjacentLength!=null && form.controls.adjacentWidth!=null && form.controls.adjacentHeight!=null && form.controls.adjacentLength!=undefined && form.controls.adjacentWidth!=undefined && form.controls.adjacentHeight!=undefined){
      var a = form.controls.adjacentLength.value*form.controls.adjacentWidth.value+6*form.controls.adjacentHeight.value*(form.controls.adjacentLength.value+form.controls.adjacentWidth.value)+9*3.14*(form.controls.adjacentHeight.value*form.controls.adjacentHeight.value)
      form.controls.collAreaOfAdjacentStruc.setValue(a.toFixed(2));
    }
    else{
      form.controls.collAreaOfAdjacentStruc.setValue('');
    }
  }

  // Math for Number of hours/year people are present in the building
  // Formula = 365*td
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
    this.environmentD(event,form);
    this.telephoneServiceLineD(event,form);
    this.typeOfPowerLinesD(event,form);
    // Collection area of the lines && Collection Area Near The Lines
    let arr = form.controls.structureAttributes.controls[0].controls.lengthOfPowerLines.value;
    if(form.controls.structureAttributes.controls[0].controls.lengthOfPowerLines!='' && form.controls.structureAttributes.controls[0].controls.lengthOfPowerLines!=null && form.controls.structureAttributes.controls[0].controls.lengthOfPowerLines!=undefined){
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
    // Formula = NG×AI/P×CI/P×CE×CT×10-6
    if(form.controls.groundFlashDensity!='' && form.controls.structureAttributes.controls[0].controls.collAreaOfNearLines!='' && form.controls.structureAttributes.controls[0].controls.typeOfPowerLines!='' && form.controls.environment!='' && form.controls.telephoneServiceLine!='' && form.controls.groundFlashDensity!=null && form.controls.structureAttributes.controls[0].controls.collAreaOfNearLines!=null && form.controls.structureAttributes.controls[0].controls.typeOfPowerLines!=null && form.controls.environment!=null && form.controls.telephoneServiceLine!=null && form.controls.groundFlashDensity!=undefined && form.controls.structureAttributes.controls[0].controls.collAreaOfNearLines!=undefined && form.controls.structureAttributes.controls[0].controls.typeOfPowerLines!=undefined && form.controls.environment!=undefined && form.controls.telephoneServiceLine!=undefined){

      var c = form.controls.groundFlashDensity.value*form.controls.structureAttributes.controls[0].controls.collAreaOfNearLines.value*form.controls.structureAttributes.controls[0].controls.typeOfPowerLinesDrop.value*form.controls.environmentDrop.value*form.controls.telephoneServiceLineDrop.value*0.000001;

      form.controls.structureAttributes.controls[0].controls.eventNearThePowerLines.setValue(c.toFixed(8));
    }
    else{
      form.controls.structureAttributes.controls[0].controls.eventNearThePowerLines.setValue('');
    }

    // No. fo dangerous event on the lines
    //  Formula = NG×AL/P×CI/P×CE×CT×10-6
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
    this.environmentD(event,form);
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
    // Formula = NG×AI/T×CI/T×CE×CT×10-6
    if(form.controls.groundFlashDensity!='' && form.controls.structureAttributes.controls[0].controls.collNearOfTelecomLines!='' && form.controls.structureAttributes.controls[0].controls.typeOfTelecomLines!='' && form.controls.environment!='' && form.controls.telephoneServiceLine!='' && form.controls.groundFlashDensity!=null && form.controls.structureAttributes.controls[0].controls.collNearOfTelecomLines!=null && form.controls.structureAttributes.controls[0].controls.typeOfTelecomLines!=null && form.controls.environment!=null && form.controls.telephoneServiceLine!=null && form.controls.groundFlashDensity!=undefined && form.controls.structureAttributes.controls[0].controls.collNearOfTelecomLines!=undefined && form.controls.structureAttributes.controls[0].controls.typeOfTelecomLines!=undefined && form.controls.environment!=undefined && form.controls.telephoneServiceLine!=undefined){
      
      var c = form.controls.groundFlashDensity.value*form.controls.structureAttributes.controls[0].controls.collNearOfTelecomLines.value*form.controls.structureAttributes.controls[0].controls.typeOfTelecomLinesDrop.value*form.controls.environmentDrop.value*form.controls.telephoneServiceLineDrop.value*0.000001;
      form.controls.structureAttributes.controls[0].controls.eventNearTheTelecomeLines.setValue(c.toFixed(8));
    }
    else{
      form.controls.structureAttributes.controls[0].controls.eventNearTheTelecomeLines.setValue('');
    }
    // No of Dangerous Event On The Telecom Lines
    //  Formula = NG×AL/T×CI/T×CE×CT×10-6
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
    this.houseYearBuilding(event,form);
    this.stFireProtectionMeasureD(event,form);
    this.hazardClassificationD(event,form);
    this.humanLossOffailureOfInternalSystemD(event,form);
    this.humanLossOfphysicalDamageD(event,form);
    // Loss due to injury to living beings by electric shock, 
    // Fromula = rt × LT × nz/nt × tz/8760
    if(form.controls.structureAttributes.controls[0].controls.stTypeOfFloorSurface!='' && form.controls.noOfPeopleInZone!='' && form.controls.noOfPeopleInBuilding!='' && form.controls.yearPeoplePresentBuilding!='' && form.controls.structureAttributes.controls[0].controls.stTypeOfFloorSurface!=null && form.controls.noOfPeopleInZone!=null && form.controls.noOfPeopleInBuilding!=null && form.controls.yearPeoplePresentBuilding!=null && form.controls.structureAttributes.controls[0].controls.stTypeOfFloorSurface!=undefined && form.controls.noOfPeopleInZone!=undefined && form.controls.noOfPeopleInBuilding!=undefined && form.controls.yearPeoplePresentBuilding!=undefined){

      var a =(form.controls.structureAttributes.controls[0].controls.stTypeOfFloorSurfaceDrop.value*0.01)*(form.controls.noOfPeopleInZone.value/form.controls.noOfPeopleInBuilding.value)*(form.controls.yearPeoplePresentBuilding.value/8760);

      form.controls.losses.controls[0].controls.humanLossOfInjuryOfElectricShock.setValue(a.toFixed(17));
    }
    else{
      form.controls.losses.controls[0].controls.humanLossOfInjuryOfElectricShock.setValue('');
    }

    // Loss due to physical damage (L1), 
    // Formula = rp × rf × hZ × LF × nz/nt × tz/8760
    if(form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasure!='' && form.controls.structureAttributes.controls[0].controls.stRiskOfFire!='' && form.controls.losses.controls[0].controls.hazardClassification!='' && form.controls.losses.controls[0].controls.humanLossOfphysicalDamage!='' && form.controls.noOfPeopleInZone!='' && form.controls.noOfPeopleInBuilding!='' && form.controls.yearPeoplePresentBuilding!='' && form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasure!=null && form.controls.structureAttributes.controls[0].controls.stRiskOfFire!=null && form.controls.losses.controls[0].controls.hazardClassification!=null && form.controls.losses.controls[0].controls.humanLossOfphysicalDamage!=null && form.controls.noOfPeopleInZone!=null && form.controls.noOfPeopleInBuilding!=null && form.controls.yearPeoplePresentBuilding!=null && form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasure!=undefined && form.controls.structureAttributes.controls[0].controls.stRiskOfFire!=undefined && form.controls.losses.controls[0].controls.hazardClassification!=undefined && form.controls.losses.controls[0].controls.humanLossOfphysicalDamage!=undefined && form.controls.noOfPeopleInZone!=undefined && form.controls.noOfPeopleInBuilding!=undefined && form.controls.yearPeoplePresentBuilding!=undefined){

      var b = (form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasureDrop.value*form.controls.riskOfFireData.value*form.controls.losses.controls[0].controls.hazardClassificationDrop.value*form.controls.losses.controls[0].controls.humanLossOfphysicalDamageDrop.value)*(form.controls.noOfPeopleInZone.value/form.controls.noOfPeopleInBuilding.value)*(form.controls.yearPeoplePresentBuilding.value/8760);

      form.controls.losses.controls[0].controls.humanLossOfPhysicalDamageL1.setValue(b.toFixed(17));
    }
    else{
      form.controls.losses.controls[0].controls.humanLossOfPhysicalDamageL1.setValue('');
    }
    // Loss due to failure of internal systems, 
    // Formula = LO × nz/nt × tz/8760
    if(form.controls.losses.controls[0].controls.humanLossOffailureOfInternalSystem!='' && form.controls.noOfPeopleInZone!='' && form.controls.noOfPeopleInBuilding!='' && form.controls.yearPeoplePresentBuilding!='' && form.controls.losses.controls[0].controls.humanLossOffailureOfInternalSystem!=null && form.controls.noOfPeopleInZone!=null && form.controls.noOfPeopleInBuilding!=null && form.controls.yearPeoplePresentBuilding!=null && form.controls.losses.controls[0].controls.humanLossOffailureOfInternalSystem!=undefined && form.controls.noOfPeopleInZone!=undefined && form.controls.noOfPeopleInBuilding!=undefined && form.controls.yearPeoplePresentBuilding!=undefined){

      var c =(form.controls.losses.controls[0].controls.humanLossOffailureOfInternalSystemDrop.value)*(form.controls.noOfPeopleInZone.value/form.controls.noOfPeopleInBuilding.value)*(form.controls.yearPeoplePresentBuilding.value/8760);
      
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
    this.culHerOfPhysicalDamageD(event,form);
    this.serToPubfailureOfInternalSystemD(event,form);
    // Loss due to physical damage, 
    // Formula = rp × rf × LF × nz/nt 
    if(form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasure!='' && form.controls.structureAttributes.controls[0].controls.stRiskOfFire!='' && form.controls.losses.controls[0].controls.serToPubPhysicalDamage!='' && form.controls.noOfPeopleInZone!='' && form.controls.noOfPeopleInBuilding!='' && form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasure!=null && form.controls.structureAttributes.controls[0].controls.stRiskOfFire!=null && form.controls.losses.controls[0].controls.serToPubPhysicalDamage!=null && form.controls.noOfPeopleInZone!=null && form.controls.noOfPeopleInBuilding!=null && form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasure!=undefined && form.controls.structureAttributes.controls[0].controls.stRiskOfFire!=undefined && form.controls.losses.controls[0].controls.serToPubPhysicalDamage!=undefined && form.controls.noOfPeopleInZone!=undefined && form.controls.noOfPeopleInBuilding!=undefined){
      
      var a = (form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasureDrop.value*form.controls.riskOfFireData.value*form.controls.losses.controls[0].controls.serToPubPhysicalDamageDrop.value*form.controls.noOfPeopleInZone.value)/(form.controls.noOfPeopleInBuilding.value);

      form.controls.losses.controls[0].controls.serToPubPhysicalDamageL1.setValue(a.toFixed(5));
    }
    else{
      form.controls.losses.controls[0].controls.serToPubPhysicalDamageL1.setValue('');
    }
    // Loss due to failure of internal systems, 
    // Formula = LO × nz/nt 
    if(form.controls.losses.controls[0].controls.serToPubfailureOfInternalSystem!='' && form.controls.noOfPeopleInZone!='' && form.controls.noOfPeopleInBuilding!='' && form.controls.losses.controls[0].controls.serToPubfailureOfInternalSystem!=null && form.controls.noOfPeopleInZone!=null && form.controls.noOfPeopleInBuilding!=null && form.controls.losses.controls[0].controls.serToPubfailureOfInternalSystem!=undefined && form.controls.noOfPeopleInZone!=undefined && form.controls.noOfPeopleInBuilding!=undefined){

      var b = (form.controls.losses.controls[0].controls.serToPubfailureOfInternalSystemDrop.value*form.controls.noOfPeopleInZone.value)/(form.controls.noOfPeopleInBuilding.value);

      form.controls.losses.controls[0].controls.serToPubfailureOfInternalSystemL1.setValue(b.toFixed(4));
    }
    else{
      form.controls.losses.controls[0].controls.serToPubfailureOfInternalSystemL1.setValue('');
    }

    // Math for LOSS OF CULTURAL HERITAGE (L3), 
    // Formula =  rp × rf × LF × cz/ct 
    if(form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasure!='' && form.controls.structureAttributes.controls[0].controls.stRiskOfFire!='' && form.controls.losses.controls[0].controls.culHerOfPhysicalDamage!='' && form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasure!=null && form.controls.structureAttributes.controls[0].controls.stRiskOfFire!=null && form.controls.losses.controls[0].controls.culHerOfPhysicalDamage!=null && form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasure!=undefined && form.controls.structureAttributes.controls[0].controls.stRiskOfFire!=undefined && form.controls.losses.controls[0].controls.culHerOfPhysicalDamage!=undefined){

      var c = form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasureDrop.value*form.controls.riskOfFireData.value*form.controls.losses.controls[0].controls.culHerOfPhysicalDamageDrop.value*1;

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
    this.stFireProtectionMeasureD(event,form);
    this.ecoLossOfPhysicalDamageD(event,form);
    this.ecoLossOfFailureOfInternalSystemD(event,form);
    this.ecoLossOfPhysicalDamageD(event,form);
    // Loss due to injury to living beings by electric shock, 
    // Formula = rt × LT × ca/ct  
    if(form.controls.structureAttributes.controls[0].controls.stTypeOfFloorSurface!='' && form.controls.structureAttributes.controls[0].controls.stTypeOfFloorSurface!=null && form.controls.structureAttributes.controls[0].controls.stTypeOfFloorSurface!=undefined){

      var a = form.controls.structureAttributes.controls[0].controls.stTypeOfFloorSurfaceDrop.value*0.01*1;
      form.controls.losses.controls[0].controls.ecoLossOfInjuryOfElectricShock.setValue(a.toFixed(7));
    }
    else{
      form.controls.losses.controls[0].controls.ecoLossOfInjuryOfElectricShock.setValue("");
    }

    // Loss due to physical damage, 
    // Formula = rp × rf × LF × (ca + cb + cc + cs)/ct 
    if(form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasure!='' && form.controls.structureAttributes.controls[0].controls.stRiskOfFire!='' && form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamage!='' && form.controls.telephoneServiceLine!='' && form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasure!=null && form.controls.structureAttributes.controls[0].controls.stRiskOfFire!=null && form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamage!=null && form.controls.telephoneServiceLine!=null && form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasure!=undefined && form.controls.structureAttributes.controls[0].controls.stRiskOfFire!=undefined && form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamage!=undefined && form.controls.telephoneServiceLine!=undefined){

      var b = form.controls.structureAttributes.controls[0].controls.stFireProtectionMeasureDrop.value*form.controls.riskOfFireData.value*form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageDrop.value*1;

      form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageL1.setValue(b);
    }
    else{
      form.controls.losses.controls[0].controls.ecoLossOfPhysicalDamageL1.setValue("");
    }

    // Loss due to failure of internal systems, 
    // Formula = LO × cs/ct 
    if(form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystem!='' && form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystem!=null && form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystem!=undefined){

      var c = form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemDrop.value*1;

      form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1.setValue(c.toFixed(4));
    } 
    else{
      form.controls.losses.controls[0].controls.ecoLossOfFailureOfInternalSystemL1.setValue("");
    }

    this.lossEconomicCalc(event,form);
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
  shielding(event:any,form:any){
    this.classOfLPSD(event,form);
    this.classOfSpdD(event,form);
    this.shieldingGroundingIsolationD(event,form);
    this.shieldingGroundingIsolationL1D(event,form);
    let a:any = [];
    let b:any = [];
    a = (form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationDrop.value).split(',');
    b = (form.controls.structureAttributes.controls[0].controls.shieldingGroundingIsolationL1Drop.value).split(',');
  // Finding Pc = protectionPC, 
  // Formula = PSPD × (CLD/T + CLD/P) for Pc
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
  }

  // PROTECTION CALCULATION 
    // (Ks1 × Ks2 × Ks3 × Ks4)2 for Pms structureScreeningEffectiveness, internalScreeningEffectiveness, stTypeOfInternalWiring
      protectionPms(event:any,form:any){
        this.stTypeOfInternalWiringD(event,form);
        this.buildingValue1(event,form);
        this.buildingValue2(event,form);

        if(form.controls.structureScreeningEffectiveness!='' && form.controls.internalScreeningEffectiveness!='' && form.controls.structureAttributes.controls[0].controls.stTypeOfInternalWiring!='' && form.controls.structureScreeningEffectiveness!=null && form.controls.internalScreeningEffectiveness!=null && form.controls.structureAttributes.controls[0].controls.stTypeOfInternalWiring!=null && form.controls.structureScreeningEffectiveness!=undefined && form.controls.internalScreeningEffectiveness!=undefined && form.controls.structureAttributes.controls[0].controls.stTypeOfInternalWiring!=undefined){

          var c = (form.controls.typeOFbuildingdrop.value*form.controls.typeOFbuildingdrop1.value*form.controls.structureAttributes.controls[0].controls.stTypeOfInternalWiringDrop.value*1)*(form.controls.typeOFbuildingdrop.value*form.controls.typeOFbuildingdrop1.value*form.controls.structureAttributes.controls[0].controls.stTypeOfInternalWiringDrop.value*1);

          form.controls.protection.controls[0].controls.protectionPMS.setValue(c.toFixed(28));
        }
        else{
          form.controls.protection.controls[0].controls.protectionPMS.setValue('');
        }
      }
    
    // PSPD × PMS for Pm
      protectionPm(event:any,form:any){
        this.classOfSpdD(event,form);
        this.protectionPms(event,form);
        if(form.controls.losses.controls[0].controls.classOfSPD!='' && form.controls.protection.controls[0].controls.protectionPMS!='' && form.controls.losses.controls[0].controls.classOfSPD!=null && form.controls.protection.controls[0].controls.protectionPMS!=null && form.controls.losses.controls[0].controls.classOfSPD!=undefined && form.controls.protection.controls[0].controls.protectionPMS!=undefined){

          var a = form.controls.losses.controls[0].controls.classOfSPDDrop.value*form.controls.protection.controls[0].controls.protectionPMS.value;
          form.controls.protection.controls[0].controls.protectionPM.setValue(a.toFixed(28));
        }
        else{
          form.controls.protection.controls[0].controls.protectionPM.setValue('');
        }
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
      }

  // Calcualted Risk Table calculation are given below 
  // Loss of human life or permanent injuries - First Row
    lossOfHumanCalc(event:any,form:any){
      this.protectionPA(event,form);
      this.classOfLPSD(event,form);
      this.protectionPm(event,form);
      this.shielding(event,form);
      // RA1 La = humanLossOfInjuryOfElectricShock, PA = protectionPA, Nd = noOfDangerousEventOnStructure, Ra1 = riskProtectionRA1
      if(form.controls.noOfDangerousEventOnStructure!='' && form.controls.protection.controls[0].controls.protectionPA!='' && form.controls.losses.controls[0].controls.humanLossOfInjuryOfElectricShock!='' && form.controls.noOfDangerousEventOnStructure!=null && form.controls.protection.controls[0].controls.protectionPA!=null && form.controls.losses.controls[0].controls.humanLossOfInjuryOfElectricShock!=null && form.controls.noOfDangerousEventOnStructure!=undefined && form.controls.protection.controls[0].controls.protectionPA!=undefined && form.controls.losses.controls[0].controls.humanLossOfInjuryOfElectricShock!=undefined){

        var a=form.controls.noOfDangerousEventOnStructure.value*form.controls.protection.controls[0].controls.protectionPA.value*form.controls.losses.controls[0].controls.humanLossOfInjuryOfElectricShock.value;

        form.controls.protection.controls[0].controls.riskProtectionRA1.setValue(a.toFixed(28));
      }else{
        form.controls.protection.controls[0].controls.riskProtectionRA1.setValue('');
      }

      // RB1 = riskProtectionRB1, ND × PB × LB, Pb = classOfLPS, LB = humanLossOfPhysicalDamageL1
      if(form.controls.noOfDangerousEventOnStructure!='' && form.controls.losses.controls[0].controls.classOfLPS!='' && form.controls.losses.controls[0].controls.humanLossOfPhysicalDamageL1!='' && form.controls.noOfDangerousEventOnStructure!=null && form.controls.losses.controls[0].controls.classOfLPS!=null && form.controls.losses.controls[0].controls.humanLossOfPhysicalDamageL1!=null && form.controls.noOfDangerousEventOnStructure!=undefined && form.controls.losses.controls[0].controls.classOfLPS!=undefined && form.controls.losses.controls[0].controls.humanLossOfPhysicalDamageL1!=undefined){

        var b=form.controls.noOfDangerousEventOnStructure.value*form.controls.losses.controls[0].controls.classOfLPSDrop.value*form.controls.losses.controls[0].controls.humanLossOfPhysicalDamageL1.value;
        form.controls.protection.controls[0].controls.riskProtectionRB1.setValue(b.toFixed(27));
      }else{
        form.controls.protection.controls[0].controls.riskProtectionRB1.setValue('');
      }

      // RC1 = riskProtectionRC1, formula = ND × PC × LC, Pc = protectionPC, LC=LM=LW=LZ = humanLossOffailureOfInternalSystemL1
      if(form.controls.noOfDangerousEventOnStructure!='' && form.controls.protection.controls[0].controls.protectionPC!='' && form.controls.losses.controls[0].controls.humanLossOffailureOfInternalSystemL1!='' && form.controls.noOfDangerousEventOnStructure!=null && form.controls.protection.controls[0].controls.protectionPC!=null && form.controls.losses.controls[0].controls.humanLossOffailureOfInternalSystemL1!=null && form.controls.noOfDangerousEventOnStructure!=undefined && form.controls.protection.controls[0].controls.protectionPC!=undefined && form.controls.losses.controls[0].controls.humanLossOffailureOfInternalSystemL1!=undefined){
        var c=form.controls.noOfDangerousEventOnStructure.value*form.controls.protection.controls[0].controls.protectionPC.value*form.controls.losses.controls[0].controls.humanLossOffailureOfInternalSystemL1.value;
        form.controls.protection.controls[0].controls.riskProtectionRC1.setValue(c.toFixed(28));
      }else{
        form.controls.protection.controls[0].controls.riskProtectionRC1.setValue('');
      }

      // RM1 = riskProtectionRM1, formula = NM × PM × LM, Nm = noOfDangerousEventNearStructure, Pm =protectionPM , Lm = humanLossOffailureOfInternalSystemL1
      if(form.controls.noOfDangerousEventNearStructure!='' && form.controls.protection.controls[0].controls.protectionPM!='' && form.controls.losses.controls[0].controls.humanLossOffailureOfInternalSystemL1!='' && form.controls.noOfDangerousEventNearStructure!=null && form.controls.protection.controls[0].controls.protectionPM!=null && form.controls.losses.controls[0].controls.humanLossOffailureOfInternalSystemL1!=null && form.controls.noOfDangerousEventNearStructure!=undefined && form.controls.protection.controls[0].controls.protectionPM!=undefined && form.controls.losses.controls[0].controls.humanLossOffailureOfInternalSystemL1!=undefined){
        var d=form.controls.noOfDangerousEventNearStructure.value*form.controls.protection.controls[0].controls.protectionPM.value*form.controls.losses.controls[0].controls.humanLossOffailureOfInternalSystemL1.value;
        form.controls.protection.controls[0].controls.riskProtectionRM1.setValue(d.toFixed(28));
      }else{
        form.controls.protection.controls[0].controls.riskProtectionRM1.setValue('');
      }

      // RU1 = riskProtectionRU1, formular = (NL/P + NL/T + NDJ ) × PU × LU, LU = humanLossOfInjuryOfElectricShock, PU = protectionPU, NDJ=noOfDangEventOnAdjacentStruc, NL/P = eventOnThePowerLines, NL/T = eventOnTheTelecomLines
      if(form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!='' && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!='' && form.controls.noOfDangEventOnAdjacentStruc!='' && form.controls.protection.controls[0].controls.protectionPU!='' && form.controls.losses.controls[0].controls.humanLossOfInjuryOfElectricShock!='' && form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!=null && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!=null && form.controls.noOfDangEventOnAdjacentStruc!=null && form.controls.protection.controls[0].controls.protectionPU!=null && form.controls.losses.controls[0].controls.humanLossOfInjuryOfElectricShock!=null && form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!=undefined && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!=undefined && form.controls.noOfDangEventOnAdjacentStruc!=undefined && form.controls.protection.controls[0].controls.protectionPU!=undefined && form.controls.losses.controls[0].controls.humanLossOfInjuryOfElectricShock!=undefined){

        var e=(+form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines.value+ +form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines.value+ +form.controls.noOfDangEventOnAdjacentStruc.value)*form.controls.protection.controls[0].controls.protectionPU.value*form.controls.losses.controls[0].controls.humanLossOfInjuryOfElectricShock.value;

        form.controls.protection.controls[0].controls.riskProtectionRU1.setValue(e.toFixed(30));
      }
      else{
        form.controls.protection.controls[0].controls.riskProtectionRU1.setValue('');
      }

      // RV1 = riskProtectionRV1, formula = (NL/P + NL/T + NDJ ) × PV × LV, LV = humanLossOfPhysicalDamageL1
      if(form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!='' && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!='' && form.controls.noOfDangEventOnAdjacentStruc!='' && form.controls.protection.controls[0].controls.protectionPV!='' && form.controls.losses.controls[0].controls.humanLossOfPhysicalDamageL1!='' && form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!=null && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!=null && form.controls.noOfDangEventOnAdjacentStruc!=null && form.controls.protection.controls[0].controls.protectionPV!=null && form.controls.losses.controls[0].controls.humanLossOfPhysicalDamageL1!=null && form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!=undefined && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!=undefined && form.controls.noOfDangEventOnAdjacentStruc!=undefined && form.controls.protection.controls[0].controls.protectionPV!=undefined && form.controls.losses.controls[0].controls.humanLossOfPhysicalDamageL1!=undefined){

        var f=(+form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines.value+ +form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines.value+ +form.controls.noOfDangEventOnAdjacentStruc.value)*form.controls.protection.controls[0].controls.protectionPV.value*form.controls.losses.controls[0].controls.humanLossOfPhysicalDamageL1.value;

        form.controls.protection.controls[0].controls.riskProtectionRV1.setValue(f.toFixed(30));
      }
      else{
        form.controls.protection.controls[0].controls.riskProtectionRV1.setValue('');
      }

      // RW1 = riskProtectionRW1, formula = (NL/P + NL/T + NDJ ) × PW × LW, LW = humanLossOffailureOfInternalSystemL1,
      if(form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!='' && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!='' && form.controls.noOfDangEventOnAdjacentStruc!='' && form.controls.protection.controls[0].controls.protectionPW!='' && form.controls.losses.controls[0].controls.humanLossOffailureOfInternalSystemL1!=''){
        
        var g=(+form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines.value+ +form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines.value+ +form.controls.noOfDangEventOnAdjacentStruc.value)*form.controls.protection.controls[0].controls.protectionPW.value*form.controls.losses.controls[0].controls.humanLossOffailureOfInternalSystemL1.value;
        form.controls.protection.controls[0].controls.riskProtectionRW1.setValue(g.toFixed(28));
      }
      else{
        form.controls.protection.controls[0].controls.riskProtectionRW1.setValue('');
      }

      // RZ1 = riskProtectionRZ1, formula = (NI/P + NI/T) × PZ × LZ, NI/P = eventNearThePowerLines, NI/T = eventNearTheTelecomeLines, PZ = protectionPZ, LZ = humanLossOffailureOfInternalSystemL1
      if(form.controls.structureAttributes.controls[0].controls.eventNearThePowerLines!='' &&  form.controls.structureAttributes.controls[0].controls.eventNearTheTelecomeLines!='' && form.controls.protection.controls[0].controls.protectionPZ!='' && form.controls.losses.controls[0].controls.humanLossOffailureOfInternalSystemL1!='' && form.controls.structureAttributes.controls[0].controls.eventNearThePowerLines!=null &&  form.controls.structureAttributes.controls[0].controls.eventNearTheTelecomeLines!=null && form.controls.protection.controls[0].controls.protectionPZ!=null && form.controls.losses.controls[0].controls.humanLossOffailureOfInternalSystemL1!=null && form.controls.structureAttributes.controls[0].controls.eventNearThePowerLines!=undefined && form.controls.structureAttributes.controls[0].controls.eventNearTheTelecomeLines!=undefined && form.controls.protection.controls[0].controls.protectionPZ!=undefined && form.controls.losses.controls[0].controls.humanLossOffailureOfInternalSystemL1!=undefined){
        var h=(+form.controls.structureAttributes.controls[0].controls.eventNearThePowerLines.value+ +form.controls.structureAttributes.controls[0].controls.eventNearTheTelecomeLines.value)*form.controls.protection.controls[0].controls.protectionPZ.value*form.controls.losses.controls[0].controls.humanLossOffailureOfInternalSystemL1.value;
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
        form.controls.calculatedRisk.controls[0].controls.riskProtectionR1.setValue(a.toExponential(2));
      }else{
        form.controls.calculatedRisk.controls[0].controls.riskProtectionR1.setValue('');
      }
    }

  // Loss of service to public - Second Row
    lossOfServiceCalc(event:any,form:any){
      this.protectionPA(event,form);
      this.classOfLPSD(event,form);
      this.protectionPm(event,form);
      this.shielding(event,form);
      // RB2 = riskProtectionRB2, formula = ND × PB × LB, ND = noOfDangerousEventOnStructure, PB = classOfLPS, LB = serToPubPhysicalDamageL1
      if(form.controls.noOfDangerousEventOnStructure!='' && form.controls.losses.controls[0].controls.classOfLPS!='' && form.controls.losses.controls[0].controls.serToPubPhysicalDamageL1!='' && form.controls.noOfDangerousEventOnStructure!=null && form.controls.losses.controls[0].controls.classOfLPS!=null && form.controls.losses.controls[0].controls.serToPubPhysicalDamageL1!=null && form.controls.noOfDangerousEventOnStructure!=undefined && form.controls.losses.controls[0].controls.classOfLPS!=undefined && form.controls.losses.controls[0].controls.serToPubPhysicalDamageL1!=undefined){

        var a=form.controls.noOfDangerousEventOnStructure.value*form.controls.losses.controls[0].controls.classOfLPSDrop.value*form.controls.losses.controls[0].controls.serToPubPhysicalDamageL1.value;
        form.controls.protection.controls[0].controls.riskProtectionRB2.setValue(a.toFixed(28));
      }else{
        form.controls.protection.controls[0].controls.riskProtectionRB2.setValue('');
      }

      // RC2 = riskProtectionRC2, formula = ND × PC × LC, LC = serToPubfailureOfInternalSystemL1
      if(form.controls.noOfDangerousEventOnStructure!='' && form.controls.protection.controls[0].controls.protectionPC!='' && form.controls.losses.controls[0].controls.serToPubfailureOfInternalSystemL1!='' && form.controls.noOfDangerousEventOnStructure!=null && form.controls.protection.controls[0].controls.protectionPC!=null && form.controls.losses.controls[0].controls.serToPubfailureOfInternalSystemL1!=null && form.controls.noOfDangerousEventOnStructure!=undefined && form.controls.protection.controls[0].controls.protectionPC!=undefined && form.controls.losses.controls[0].controls.serToPubfailureOfInternalSystemL1!=undefined){
        var b=form.controls.noOfDangerousEventOnStructure.value*form.controls.protection.controls[0].controls.protectionPC.value*form.controls.losses.controls[0].controls.serToPubfailureOfInternalSystemL1.value;
        form.controls.riskProtection.controls[0].controls.riskProtectionRC2.setValue(b.toFixed(28));
      }else{
        form.controls.riskProtection.controls[0].controls.riskProtectionRC2.setValue('');
      }

      // RM2 = riskProtectionRM2, formula = NM × PM × LM. 
      if(form.controls.noOfDangerousEventNearStructure!='' && form.controls.protection.controls[0].controls.protectionPM!='' && form.controls.losses.controls[0].controls.serToPubfailureOfInternalSystemL1!='' && form.controls.noOfDangerousEventNearStructure!=null && form.controls.protection.controls[0].controls.protectionPM!=null && form.controls.losses.controls[0].controls.serToPubfailureOfInternalSystemL1!=null && form.controls.noOfDangerousEventNearStructure!=undefined && form.controls.protection.controls[0].controls.protectionPM!=undefined && form.controls.losses.controls[0].controls.serToPubfailureOfInternalSystemL1!=undefined){
        var c=form.controls.noOfDangerousEventNearStructure.value*form.controls.protection.controls[0].controls.protectionPM.value*form.controls.losses.controls[0].controls.serToPubfailureOfInternalSystemL1.value;
        form.controls.riskProtection.controls[0].controls.riskProtectionRM2.setValue(c.toFixed(28));
      }else{
        form.controls.riskProtection.controls[0].controls.riskProtectionRM2.setValue('');
      }

      // RV2 = riskProtectionRV2,formula = (NL/P + NL/T + NDJ ) × PV × LV, 
      if(form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!='' && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!='' && form.controls.noOfDangEventOnAdjacentStruc!='' && form.controls.protection.controls[0].controls.protectionPV!='' && form.controls.losses.controls[0].controls.serToPubPhysicalDamageL1!='' && form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!=null && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!=null && form.controls.noOfDangEventOnAdjacentStruc!=null && form.controls.protection.controls[0].controls.protectionPV!=null && form.controls.losses.controls[0].controls.serToPubPhysicalDamageL1!=null && form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!=undefined && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!=undefined && form.controls.noOfDangEventOnAdjacentStruc!=undefined && form.controls.protection.controls[0].controls.protectionPV!=undefined && form.controls.losses.controls[0].controls.serToPubPhysicalDamageL1!=undefined){

        var d=(+form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines.value+ +form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines.value+ +form.controls.noOfDangEventOnAdjacentStruc.value)*form.controls.protection.controls[0].controls.protectionPV.value*form.controls.losses.controls[0].controls.serToPubPhysicalDamageL1.value;

        form.controls.riskProtection.controls[0].controls.riskProtectionRV2.setValue(d.toFixed(28));
      }else{
        form.controls.riskProtection.controls[0].controls.riskProtectionRV2.setValue('');
      }

      // RW2 = riskProtectionRW2, formula = (NL/P + NL/T + NDJ ) × PW × LW,
      if(form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!='' && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!='' && form.controls.noOfDangEventOnAdjacentStruc!='' && form.controls.protection.controls[0].controls.protectionPW!='' && form.controls.losses.controls[0].controls.serToPubfailureOfInternalSystemL1!='' && form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!=null && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!=null && form.controls.noOfDangEventOnAdjacentStruc!=null && form.controls.protection.controls[0].controls.protectionPW!=null && form.controls.losses.controls[0].controls.serToPubfailureOfInternalSystemL1!=null && form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!='' && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!='' && form.controls.noOfDangEventOnAdjacentStruc!='' && form.controls.protection.controls[0].controls.protectionPW!='' && form.controls.losses.controls[0].controls.serToPubfailureOfInternalSystemL1!=undefined){
        var e=(+form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines.value+ +form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines.value+ +form.controls.noOfDangEventOnAdjacentStruc.value)*form.controls.protection.controls[0].controls.protectionPW.value*form.controls.losses.controls[0].controls.serToPubfailureOfInternalSystemL1.value;
        form.controls.riskProtection.controls[0].controls.riskProtectionRW2.setValue(e.toFixed(28));
      }
      else{
        form.controls.riskProtection.controls[0].controls.riskProtectionRW2.setValue('');
      }

      // RZ2 = riskProtectionRZ2, formula =	(NI/P + NI/T) × PZ × LZ
      if(form.controls.structureAttributes.controls[0].controls.eventNearThePowerLines!='' &&  form.controls.structureAttributes.controls[0].controls.eventNearTheTelecomeLines!='' && form.controls.protection.controls[0].controls.protectionPZ!='' && form.controls.losses.controls[0].controls.serToPubfailureOfInternalSystemL1!='' && form.controls.structureAttributes.controls[0].controls.eventNearThePowerLines!=null &&  form.controls.structureAttributes.controls[0].controls.eventNearTheTelecomeLines!=null && form.controls.protection.controls[0].controls.protectionPZ!=null && form.controls.losses.controls[0].controls.serToPubfailureOfInternalSystemL1!=null && form.controls.structureAttributes.controls[0].controls.eventNearThePowerLines!=undefined &&  form.controls.structureAttributes.controls[0].controls.eventNearTheTelecomeLines!=undefined && form.controls.protection.controls[0].controls.protectionPZ!=undefined && form.controls.losses.controls[0].controls.serToPubfailureOfInternalSystemL1!=undefined){
        var f=(+form.controls.structureAttributes.controls[0].controls.eventNearThePowerLines.value+ +form.controls.structureAttributes.controls[0].controls.eventNearTheTelecomeLines.value)*form.controls.protection.controls[0].controls.protectionPZ.value*form.controls.losses.controls[0].controls.serToPubfailureOfInternalSystemL1.value;
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
        form.controls.calculatedRisk.controls[0].controls.riskProtectionR2.setValue(a.toExponential(2));
      }else{
        form.controls.calculatedRisk.controls[0].controls.riskProtectionR2.setValue('');
      }
    }

  // Loss of cultural heritage - Third Row
    lossCulturalCalc(event:any,form:any){
      this.protectionPA(event,form);
      this.classOfLPSD(event,form);
      this.protectionPm(event,form);
      this.shielding(event,form);
      // RB = culturalRB, formula = ND × PB × LB, ND = noOfDangerousEventOnStructure, PB = classOfLPS, LB = ecoLossOfPhysicalDamageL1
      if(form.controls.noOfDangerousEventOnStructure!='' && form.controls.losses.controls[0].controls.classOfLPS!='' && form.controls.losses.controls[0].controls.culHerOfPhysicalDamageL1!='' && form.controls.noOfDangerousEventOnStructure!=null && form.controls.losses.controls[0].controls.classOfLPS!=null && form.controls.losses.controls[0].controls.culHerOfPhysicalDamageL1!=null && form.controls.noOfDangerousEventOnStructure!=undefined && form.controls.losses.controls[0].controls.classOfLPS!=undefined && form.controls.losses.controls[0].controls.culHerOfPhysicalDamageL1!=undefined){
        var a=form.controls.noOfDangerousEventOnStructure.value*form.controls.losses.controls[0].controls.classOfLPSDrop.value*form.controls.losses.controls[0].controls.culHerOfPhysicalDamageL1.value;
        form.controls.protection.controls[0].controls.culturalRB.setValue(a.toFixed(23));
      }else{
        form.controls.protection.controls[0].controls.culturalRB.setValue('');
      }

      // RV = culturalRV, formula = (NL/P + NL/T + NDJ ) × PV × LV, 
      if(form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!='' && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!='' && form.controls.noOfDangEventOnAdjacentStruc!='' && form.controls.protection.controls[0].controls.protectionPV!='' && form.controls.losses.controls[0].controls.culHerOfPhysicalDamageL1!='' && form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!=null && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!=null && form.controls.noOfDangEventOnAdjacentStruc!=null && form.controls.protection.controls[0].controls.protectionPV!=null && form.controls.losses.controls[0].controls.culHerOfPhysicalDamageL1!=null && form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines!=undefined && form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines!=undefined && form.controls.noOfDangEventOnAdjacentStruc!=undefined && form.controls.protection.controls[0].controls.protectionPV!=undefined && form.controls.losses.controls[0].controls.culHerOfPhysicalDamageL1!=undefined){
        var b=(+form.controls.structureAttributes.controls[0].controls.eventOnThePowerLines.value+ +form.controls.structureAttributes.controls[0].controls.eventOnTheTelecomLines.value+ +form.controls.noOfDangEventOnAdjacentStruc.value)*form.controls.protection.controls[0].controls.protectionPV.value*form.controls.losses.controls[0].controls.culHerOfPhysicalDamageL1.value;
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
        form.controls.calculatedRisk.controls[0].controls.riskProtectionR3.setValue(a.toExponential(2));
      }else{
        form.controls.calculatedRisk.controls[0].controls.riskProtectionRD3.setValue('');
        form.controls.calculatedRisk.controls[0].controls.riskProtectionR3.setValue('');
      }
    }

  
  // Loss of economic value - Fourth row
    lossEconomicCalc(event:any,form:any){
      this.protectionPA(event,form);
      this.classOfLPSD(event,form);
      this.protectionPm(event,form);
      this.shielding(event,form);
      // RA = econamicValueRA, formula = ND × PA × LA, LA = ecoLossOfInjuryOfElectricShock
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
        form.controls.calculatedRisk.controls[0].controls.riskProtectionR4.setValue(a.toExponential(2));
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
    } 
    else {
      this.popup1 = false;
      this.success = false;
      this.modalService.dismissAll((this.successMsg = ''));
      if(this.buttonName=='update'){
        this.parentComponent.saved.ngOnInit();
        this.navigateToStep(1);
      }
      else if(this.buttonName=='submit'){
        this.parentComponent.final.ngOnInit();
        this.parentComponent.saved.ngOnInit();
        this.navigateToStep(2);
      }
      else{
        this.parentComponent.saved.ngOnInit();
        this.navigateToStep(1);
      }
    }
  }

  closeModalDialogSub(flag:any,content:any){
    this.finalSubmit=true;
    this.modalService.dismissAll();
    this.successMsgArr=content;
    this.onSubmit(flag);
  }

  submitPopup(){
    this.modalService.open(this.successMsgArr, { centered: true,backdrop: 'static' });
  }

  closeModalDialog1(){
    this.modalService.dismissAll();
  }

  navigateToStep(index: any) {
    this.navigateStepSummary.emit(index);
  }

  gotoNextModal(contents: any,contentSub:any,content:any,content4:any,button:any) {
    
    this.buttonName=button;

    if(this.riskGlobal.isCustomerDetailsValid){
      this.modalService.open(content4, { centered: true,backdrop: 'static' });
      this.validationError = true;
      this.validationErrorMsg = 'Customer Details Form is Required, Please fill for further proceed';
      return;
    }
    
    //  Update and Success msg will be showing 
    else if((this.buttonName=='save') || (this.step2Form.dirty && this.step2Form.touched && this.buttonName=='update')){
      this.modalService.open(content, { centered: true,backdrop: 'static' });
    }

    else if(!this.step2Form.dirty && !this.step2Form.touched && this.buttonName=='submit'){
      this.modalService.open(contentSub, { centered: true,backdrop: 'static' });  
    }

    else if(!this.step2Form.dirty && this.buttonName=='update'){  
      this.validationError = true;
      this.validationErrorMsg = 'Please change any details for Update the Risk Assessment Details';
      setTimeout(() => {
        this.validationError = false;
        this.buttonName="";
      }, 3000);
      // return 
    }
    // else if(!this.step2Form.dirty && this.buttonName=='save'){  
    //   this.validationError = true;
    //   this.validationErrorMsg = 'Please change any details for save the Risk Assessment Details';
    //   setTimeout(() => {
    //     this.validationError = false;
    //     this.buttonName="";
    //   }, 3000);
    //   // return 
    // }
    // //  For Dirty popup
    // else{
    //   this.modalService.open(contents, { centered: true,backdrop: 'static' });
    //   this.buttonName="";
    // }   
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
    this.proceedFlag = false;
    this.riskAssessmentService.retriveRiskAssessmentDetails(this.router.snapshot.paramMap.get('email') || '{}',this.riskAssessmentDetails.riskId).subscribe(
      data => {
        if (JSON.parse(data)[0] != undefined && JSON.parse(data)[0].riskId != null) {
          this.updateRiskDetails(this.riskAssessmentDetails.userName,this.riskId,JSON.parse(data)[0]);
          if(!this.step2Form.invalid) {
            this.enableSubmit =true;
            this.step2Form.markAsPristine();
          }
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
      if(!this.step2Form.invalid) {
        this.enableSubmit = true;
      }
      else {
        this.enableSubmit = false;
      }
    this.flag = true;
  }

  // This is for migration data purpose, this will be deleted in future
  migratedData(event:any,form:any){
    this.riskGlobal.migDataCheck();
    if(this.riskGlobal.migData=="Migrated Data" && this.riskGlobal.migDataFlag==true){
      this.calculatedProtection(event,form);
    }
  }
  
  // This is for migration data purpose, Here we are triggering all below function for calculation purpose. this will be deleted in future
  calculatedProtection(event:any,form:any){
    this.shieldingGroundingIsolationD(event,form.controls.structureCharacters.controls[0]);
    this.shieldingGroundingIsolationL1D(event,form.controls.structureCharacters.controls[0]);
    this.protectionPA(event,form.controls.structureCharacters.controls[0]);
    this.protectionPm(event,form.controls.structureCharacters.controls[0]);
    this.protectionPms(event,form.controls.structureCharacters.controls[0]);

    this.lossOfHumanCalc(event,form.controls.structureCharacters.controls[0]);
    this.lossOfServiceCalc(event,form.controls.structureCharacters.controls[0]);
    this.lossCulturalCalc(event,form.controls.structureCharacters.controls[0]);
    this.lossEconomicCalc(event,form.controls.structureCharacters.controls[0]);

  }

  riskAssessmentRetrieve(item:any){
    this.popArray.push(this.structureCharactersFormRtr(item,this.step2Form));
    this.step2Form.setControl('structureCharacters', this.formBuilder.array(this.popArray || []));
    this.popArray = [];
    this.gfdDirtyCheckSts=false;
    this.ste2present=false;
    if(this.getLocation != 'Others'){
      this.ste2present=true;
      this.gdValueEvent(item,this.step2Form);
    }
    
  }

  reloadFromBack(){
    if(this.step2Form.invalid){
      this.service.isCompleted2= false;
      this.service.isLinear=true;
      this.validationErrorTab1 = true;
      this.validationErrorMsgTab1 = 'Please check all the fields in Risk Assessment Details';
      setTimeout(() => {
        this.validationErrorTab1 = false;
      }, 3000);
      return false;
     }
    else if(this.step2Form.dirty && this.step2Form.touched){
      this.service.isCompleted2= false;
      this.service.isLinear=true;
      this.tabError1 = true;
      this.tabErrorMsg1 = 'Kindly click on Save or Update button to update the changes!';
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
  appendRiskId(riskId: any,projectName: any, organisationName:any) {
    this.riskAssessmentDetails.riskId = riskId;
    this.projectName = projectName;
    this.riskId = riskId;
    this.organisationName= organisationName;
  }

  // Submitting to DB
  onSubmit(flag:any) {
    //this.submitted=true;
      // if (this.step2Form.invalid) {
      //   return;
      // }
    //  this.spinner = true;
    if(!this.finalSubmit && this.buttonName=='submit'){
      return
    }

    if(this.buttonName=='submit' && this.finalSubmit){
      this.blurMode=true;
      this.blurMsg="Submission in Progress!";
    }
    this.popup=false;
    this.riskAssessmentDetails = this.step2Form.value.structureCharacters[0];
    this.riskAssessmentDetails.riskId = this.riskGlobal.riskId;
    this.riskAssessmentDetails.userName = this.router.snapshot.paramMap.get('email') || '{}';
    this.riskAssessmentDetails.updatedDate = this.riskList.updatedDate;
    this.riskAssessmentDetails.updatedBy = this.riskList.updatedBy;

      if(flag) {
        if((this.step2Form.dirty && this.step2Form.touched) || (this.buttonName=='submit')){ 
            this.riskAssessmentService.updateRiskAssessmentDetails(this.riskAssessmentDetails,this.buttonName).subscribe(
            data => {
              // Submit spinner
              this.blurMode=false;
              this.blurMsg="";
              this.finalSubmit=false
              // update success msg
              this.popup=true;
              this.success1 = false;
              this.success=true;
              this.successMsg=data;
              if(this.buttonName=='submit'){
                this.submitPopup();
              }
              this.riskGlobal.dirtyCheck=false;
              this.riskGlobal.dirtyMsg="";
              this.parentComponent.nextButtonClicked=false;      
              this.retriveRiskDetails();
              this.step2Form.markAsPristine();  
              // this.proceedNext.emit(true);
              // this.parentComponent.step2FormClick=false;
            },
              // update failed msg
            error => {
              this.popup=true;
              this.blurMode=false;
              this.blurMsg="";
              this.finalSubmit=false
              this.success1 = false;
              this.Error = true;
              // this.errorArr = [];
              // this.errorArr = JSON.parse(error.error);
              this.errorMsg = this.service.globalErrorMsg;
              this.proceedNext.emit(false);
            }
          )}
          else{
            this.popup=true;
            this.blurMode=false;
            this.blurMsg="";
            this.finalSubmit=false
            if(this.isEditable){
               this.success = true;
               this.proceedNext.emit(true);
            }
  
            else{
               this.popup=true;
               this.blurMode=false;
               this.blurMsg="";
               this.finalSubmit=false
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
            this.successMsg=data;
            this.retriveRiskDetails();
            this.disable = true;
            this.step2Form.markAsPristine();
          },
          error => {
             this.popup=true;
            this.Error = true;
            this.errorMsg = this.service.globalErrorMsg;
            this.proceedNext.emit(false); 
          })
        }
    //  }
  }

  gotoNextTab(form:any) {
    if ((this.step2Form.dirty && this.step2Form.invalid) || this.service.isCompleted == false) {
      // this.parentComponent.step2FormClick=false;
      this.service.isCompleted = false;
      this.service.isLinear = true;
      this.service.editable = false;
      this.validationErrorTab = true;
      this.validationErrorMsgTab = 'Please check all the fields in Risk Assessement Details';
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
      this.tabErrorMsg = 'Kindly click on Update/Save button to reflect the latest changes!';
      setTimeout(() => {
        this.tabError = false;
      }, 3000);
      return;
    }
    else {
      this.riskGlobal.presentedStep=0;
      this.service.isCompleted2 = true;
      this.service.isLinear = false;
      this.service.editable = true;
    }
    this.gfdDirtyCheck(form);
  }
}