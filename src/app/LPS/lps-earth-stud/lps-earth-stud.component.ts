import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalsService } from 'src/app/globals.service';
import { earthStudReport } from 'src/app/LPS_model/earthStudReport';
import { AirterminationService } from 'src/app/LPS_services/airtermination.service';
import { EarthStudService } from 'src/app/LPS_services/earth-stud.service';
import { LpsWelcomePageComponent } from '../lps-welcome-page/lps-welcome-page.component';

@Component({
  selector: 'app-lps-earth-stud',
  templateUrl: './lps-earth-stud.component.html',
  styleUrls: ['./lps-earth-stud.component.css'],
})
export class LpsEarthStudComponent implements OnInit {

  EarthStudForm!: FormGroup;
  submitted=false;
  earthStudReport = new earthStudReport;
  disable: boolean=false;
  summaryPopup: boolean = false;
  basicLpsId: number = 0;
  ClientName: String='';
  projectName: String='';
  industryType: String='';
  buildingType: String='';
  buildingLength: String='';
  buildingWidth: String='';
  buildingHeight: String='';
  levelOfProtection: String='';
  soilResistivity: String='';

  success: boolean=false;
  successMsg: string="";
  Error: boolean=false;
  errorArr: any=[];
  errorMsg: string="";
  validationError: boolean = false;
  validationErrorMsg: String = '';
  @Output() proceedNext = new EventEmitter<any>();
  flag: boolean = false;
  step7List: any = [];
  selectedIndex = 0;
  isEditable!:boolean
  earthStud: any = [];

  equipotentialBondings: any=[]; 
  interconnectingLPS: any=[];              
  faultProtection: any=[]; 
  typeBearthingsystem: any=[]; 
  mainProtective: any=[]; 
  sizeOfMainProtective: any=[]; 
  supplimentaryProtective: any=[];
  isAirterminationUpdated:boolean=false;
  modalReference: any;
  validationErrorTab: boolean = false;
  validationErrorMsgTab: string="";
  tabError: boolean=false;
  tabErrorMsg: string="";

  // For Spinner
  spinner: boolean=false;
  spinnerValue: String = '';
  mode: any = 'indeterminate';
  nextButton: boolean = true;
  popup: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private earthStudService: EarthStudService,
    private modalService: NgbModal, 
    private router: ActivatedRoute,
    private welcome: LpsWelcomePageComponent,
    public service: GlobalsService,
    public airterminationServices: AirterminationService

    ) { }

  ngOnInit(): void {
    this.EarthStudForm = this.formBuilder.group({
      earthStud: this.formBuilder.array([this.allEartStud('','','')])
    });
    if (this.isAirterminationUpdated) {
      this.retriveStud();
      this.isAirterminationUpdated=false;
    }
  }

  allEartStud(buildingNumber:any,buildingName:any,buildingCount:any):FormGroup {
    return this.formBuilder.group({
      earthStudDescId: new FormControl(''),
      buildingNumber: new FormControl(buildingNumber),
      buildingName: new FormControl(buildingName),
      buildingCount: new FormControl(buildingCount),
      flag: new FormControl('A'),
      availableEquipotentialBondingOb: new FormControl('', Validators.required),
      availableEquipotentialBondingRem: new FormControl(''),
      numberOfEquipotentialBondingOb: new FormControl('', Validators.required),
      numberOfEquipotentialBondingRem: new FormControl(''),
      sizeOfEarthingConductorOb: new FormControl('', Validators.required),
      sizeOfEarthingConductorRem: new FormControl(''),
      conceptOfEquipotentialBondingOb: new FormControl('', Validators.required),
      conceptOfEquipotentialBondingRem: new FormControl(''),
      mainProtectiveEquipotentialBondingOb: new FormControl('', Validators.required),
      mainProtectiveEquipotentialBondingRem: new FormControl(''),
      sizeOfMainProtectiveOb: new FormControl('', Validators.required),
      sizeOfMainProtectiveRem: new FormControl(''),
      supplimentaryMainProtectiveOb: new FormControl('', Validators.required),
      supplimentaryMainProtectiveRem: new FormControl(''),
      sizeOfSupplimentaryProtectiveOb: new FormControl('', Validators.required),
      sizeOfSupplimentaryProtectiveRem: new FormControl(''),
      earthStudVisibilityOb: new FormControl('', Validators.required),
      earthStudVisibilityRem: new FormControl(''),
      earthStudBendOb: new FormControl('', Validators.required),
      earthStudBendRem: new FormControl(''),
      properBondingRailOb: new FormControl('', Validators.required),
      properBondingRailRem: new FormControl(''),
      physicalDamageStudOb: new FormControl('', Validators.required),
      physicalDamageStudRem: new FormControl(''),
      continutyExistaEarthOb: new FormControl('', Validators.required),
      continutyExistaEarthRem: new FormControl('')
    });
    
  }

  createGroupForYesValue(item: any): FormGroup {
    return this.formBuilder.group({
      earthStudDescId: new FormControl({ disabled: false, value: item.earthStudDescId }),
      buildingNumber: new FormControl({ disabled: false, value: item.buildingNumber }),
      buildingName: new FormControl({ disabled: false, value: item.buildingName }),
      buildingCount: new FormControl({ disabled: false, value: item.buildingCount }),
      flag: new FormControl({ disabled: false, value: item.flag }),
      availableEquipotentialBondingOb: new FormControl({ disabled: false, value: item.availableEquipotentialBondingOb }, Validators.required),
      availableEquipotentialBondingRem: new FormControl({ disabled: false, value: item.availableEquipotentialBondingRem }),
      numberOfEquipotentialBondingOb: new FormControl({ disabled: false, value: item.numberOfEquipotentialBondingOb }, Validators.required),
      numberOfEquipotentialBondingRem: new FormControl({ disabled: false, value: item.numberOfEquipotentialBondingRem }),
      sizeOfEarthingConductorOb: new FormControl({ disabled: false, value: item.sizeOfEarthingConductorOb }, Validators.required),
      sizeOfEarthingConductorRem: new FormControl({ disabled: false, value: item.sizeOfEarthingConductorRem }),
      conceptOfEquipotentialBondingOb: new FormControl({ disabled: false, value: item.conceptOfEquipotentialBondingOb }, Validators.required),
      conceptOfEquipotentialBondingRem: new FormControl({ disabled: false, value: item.conceptOfEquipotentialBondingRem }),
      mainProtectiveEquipotentialBondingOb: new FormControl({ disabled: false, value: item.mainProtectiveEquipotentialBondingOb }, Validators.required),
      mainProtectiveEquipotentialBondingRem: new FormControl({ disabled: false, value: item.mainProtectiveEquipotentialBondingRem }),
      sizeOfMainProtectiveOb: new FormControl({ disabled: false, value: item.sizeOfMainProtectiveOb }, Validators.required),
      sizeOfMainProtectiveRem: new FormControl({ disabled: false, value: item.sizeOfMainProtectiveRem }),
      supplimentaryMainProtectiveOb: new FormControl({ disabled: false, value: item.supplimentaryMainProtectiveOb }, Validators.required),
      supplimentaryMainProtectiveRem: new FormControl({ disabled: false, value: item.supplimentaryMainProtectiveRem }),
      sizeOfSupplimentaryProtectiveOb: new FormControl({ disabled: false, value: item.sizeOfSupplimentaryProtectiveOb }, Validators.required),
      sizeOfSupplimentaryProtectiveRem: new FormControl({ disabled: false, value: item.sizeOfSupplimentaryProtectiveRem }),
      earthStudVisibilityOb: new FormControl({ disabled: false, value: item.earthStudVisibilityOb }, Validators.required),
      earthStudVisibilityRem: new FormControl({ disabled: false, value: item.earthStudVisibilityRem }),
      earthStudBendOb: new FormControl({ disabled: false, value: item.earthStudBendOb }, Validators.required),
      earthStudBendRem: new FormControl({ disabled: false, value: item.earthStudBendRem }),
      properBondingRailOb: new FormControl({ disabled: false, value: item.properBondingRailOb }, Validators.required),
      properBondingRailRem: new FormControl({ disabled: false, value: item.properBondingRailRem }),
      physicalDamageStudOb: new FormControl({ disabled: false, value: item.physicalDamageStudOb }, Validators.required),
      physicalDamageStudRem: new FormControl({ disabled: false, value: item.physicalDamageStudRem }),
      continutyExistaEarthOb: new FormControl({ disabled: false, value: item.continutyExistaEarthOb }, Validators.required),
      continutyExistaEarthRem: new FormControl({ disabled: false, value: item.continutyExistaEarthRem })
    })
  }
  createGroupForNoValue(item: any): FormGroup {
    return this.formBuilder.group({
      earthStudDescId: new FormControl({ disabled: false, value: item.earthStudDescId }),
      buildingNumber: new FormControl({ disabled: false, value: item.buildingNumber }),
      buildingName: new FormControl({ disabled: false, value: item.buildingName }),
      buildingCount: new FormControl({ disabled: false, value: item.buildingCount }),
      flag: new FormControl({ disabled: false, value: item.flag }),
      availableEquipotentialBondingOb: new FormControl({ disabled: false, value: item.availableEquipotentialBondingOb }, Validators.required),
      availableEquipotentialBondingRem: new FormControl({ disabled: false, value: item.availableEquipotentialBondingRem }),
      numberOfEquipotentialBondingOb: new FormControl({ disabled: false, value: item.numberOfEquipotentialBondingOb }),
      numberOfEquipotentialBondingRem: new FormControl({ disabled: false, value: item.numberOfEquipotentialBondingRem }),
      sizeOfEarthingConductorOb: new FormControl({ disabled: false, value: item.sizeOfEarthingConductorOb }),
      sizeOfEarthingConductorRem: new FormControl({ disabled: false, value: item.sizeOfEarthingConductorRem }),
      conceptOfEquipotentialBondingOb: new FormControl({ disabled: false, value: item.conceptOfEquipotentialBondingOb }),
      conceptOfEquipotentialBondingRem: new FormControl({ disabled: false, value: item.conceptOfEquipotentialBondingRem }),
      mainProtectiveEquipotentialBondingOb: new FormControl({ disabled: false, value: item.mainProtectiveEquipotentialBondingOb }),
      mainProtectiveEquipotentialBondingRem: new FormControl({ disabled: false, value: item.mainProtectiveEquipotentialBondingRem }),
      sizeOfMainProtectiveOb: new FormControl({ disabled: false, value: item.sizeOfMainProtectiveOb }),
      sizeOfMainProtectiveRem: new FormControl({ disabled: false, value: item.sizeOfMainProtectiveRem }),
      supplimentaryMainProtectiveOb: new FormControl({ disabled: false, value: item.supplimentaryMainProtectiveOb }),
      supplimentaryMainProtectiveRem: new FormControl({ disabled: false, value: item.supplimentaryMainProtectiveRem }),
      sizeOfSupplimentaryProtectiveOb: new FormControl({ disabled: false, value: item.sizeOfSupplimentaryProtectiveOb }, Validators.required),
      sizeOfSupplimentaryProtectiveRem: new FormControl({ disabled: false, value: item.sizeOfSupplimentaryProtectiveRem }),
      earthStudVisibilityOb: new FormControl({ disabled: false, value: item.earthStudVisibilityOb }, Validators.required),
      earthStudVisibilityRem: new FormControl({ disabled: false, value: item.earthStudVisibilityRem }),
      earthStudBendOb: new FormControl({ disabled: false, value: item.earthStudBendOb }, Validators.required),
      earthStudBendRem: new FormControl({ disabled: false, value: item.earthStudBendRem }),
      properBondingRailOb: new FormControl({ disabled: false, value: item.properBondingRailOb }, Validators.required),
      properBondingRailRem: new FormControl({ disabled: false, value: item.properBondingRailRem }),
      physicalDamageStudOb: new FormControl({ disabled: false, value: item.physicalDamageStudOb }, Validators.required),
      physicalDamageStudRem: new FormControl({ disabled: false, value: item.physicalDamageStudRem }),
      continutyExistaEarthOb: new FormControl({ disabled: false, value: item.continutyExistaEarthOb }, Validators.required),
      continutyExistaEarthRem: new FormControl({ disabled: false, value: item.continutyExistaEarthRem })
    })
  }

  overAllEartStudControl(): AbstractControl[] {
    return (<FormArray>this.EarthStudForm.get('earthStud')).controls;
  }

  reset(){
    this.EarthStudForm.reset();
  }

  retrieveDetailsfromSavedReports(data: any) {
    // this.service.lpsClick=1;
    if(data.basicLpsId != undefined && data.basicLpsId != 0){
      this.step7List = data;
    }
    else{
      this.step7List = data.earthStudReport;
      setTimeout(() => {
        this.createearthStudForm(data.airTermination);
      }, 500);
    }
    
    this.earthStudReport.basicLpsId = this.step7List.basicLpsId;
    this.earthStudReport.earthStudReportId = this.step7List.earthStudReportId;
    this.earthStudReport.userName = this.step7List.userName;
    this.earthStudReport.createdBy = this.step7List.createdBy;
    this.earthStudReport.createdDate = this.step7List.createdDate;
    let index = 0;
    let a = [];
    for (let i of this.step7List.earthStudDescription) {
      if (i.availableEquipotentialBondingOb == 'Yes') {
        a.push(this.createGroupForYesValue(i));
      } else {
        a.push(this.createGroupForNoValue(i));
      }
      this.dropDown(i.availableEquipotentialBondingOb, null, index);
      index = index + 1;
    }
    this.EarthStudForm.setControl('earthStud', this.formBuilder.array(a || []))
    this.flag = true;
  }

    // Only Accept numbers
    keyPressNumbers(event:any) {
      var charCode = (event.which) ? event.which : event.keyCode;
          // Only Numbers 0-9
      if ((charCode < 48 || charCode > 57)) {
        event.preventDefault();
        return false;
        } else {
            return true;
      }
    }

  onSubmit(flag: any){
    // this.submitted=true;
    if(this.EarthStudForm.invalid && (this.EarthStudForm.value.earthStud[0].buildingNumber != undefined || this.EarthStudForm.value.earthStud[0].buildingNumber != ''))
    {return}
    this.spinner = true;
    this.popup=false;
    
  //  this.earthStudReport=this.EarthStudForm.value
    this.earthStudReport.userName = this.router.snapshot.paramMap.get('email') || '{}';;
    this.earthStudReport.basicLpsId = this.basicLpsId; 
    this.earthStudReport.earthStudDescription = this.EarthStudForm.value.earthStud;
    
    // for(let item of this.earthStudReport.earthStudDescription){}
    // if(this.earthStudReport.earthStudDescription.availableEquipotentialBondingOb == "NO"){
    // }
    if (!this.validationError) {
      if(flag) {
        if(this.EarthStudForm.dirty && this.EarthStudForm.touched){ 
        this.earthStudService.updateEarthStud(this.earthStudReport).subscribe(
          (data) => {
            setTimeout(() =>{
              this.popup=true;
              this.spinner=false;
            }, 3000)
            this.success = true;
            this.successMsg = data;
            this.EarthStudForm.markAsPristine();
            this.service.lpsClick=0;
            this.service.logoutClick=0;
            this.service.windowTabClick=0;
            this.retriveStud();
            this.proceedNext.emit(true);
          }, 
          (error) => {
            this.popup=true;
            this.spinner=false;
            this.Error = true;
            this.errorArr = [];
            this.errorArr = JSON.parse(error.error);
            this.errorMsg = this.errorArr.message;
            this.proceedNext.emit(false);
          }
        )
      }
      else{
        this.popup=true;
        this.spinner=false;
        if(this.isEditable){
          this.success = true;
          this.proceedNext.emit(true);
        }else{
          this.popup=true;
          this.spinner=false;
          this.proceedNext.emit(true);
        }
      }
      }
      else {
        this.earthStudService.saveEarthStud(this.earthStudReport).subscribe(
          (data) => {
            setTimeout(() =>{
              this.popup=true;
              this.spinner=false;
            }, 3000)
            this.success = true;
            this.successMsg = data;
            this.disable = true;
            this.retriveStud();
            setTimeout(() => {
              this.getAirterminationData();
             }, 300);
            this.getAirterminationData();
            this.proceedNext.emit(true);
            // setTimeout(() => {
            //   this.lpsMatstepper.changeTab1(2);
            //  }, 3000);
             this.service.lpsClick=0;
            this.service.logoutClick=0;
            this.service.windowTabClick=0;
          },
          (error) => {
            this.popup=true;
            this.spinner=false;
            this.Error = true;
            this.errorArr = [];
            this.errorArr = JSON.parse(error.error);
            this.errorMsg = this.errorArr.message;
            this.proceedNext.emit(false);
          });
      }
    }
  }
  
  get f() {
    return this.EarthStudForm.controls;
  }

  onChangeForm(event:any){
    if(!this.EarthStudForm.invalid){
      if(this.EarthStudForm.dirty){
        this.validationError=false;
        this.service.lpsClick=1;
        this.service.logoutClick=1;
        this.service.windowTabClick=1;
      }
      else{
        this.validationError=false;
        this.service.lpsClick=0;
        this.service.logoutClick=0;
        this.service.windowTabClick=0;
      }
     }
     else {
      this.service.lpsClick=1;
      this.service.logoutClick=1;
      this.service.windowTabClick=1;
     }
  }
  onKeyForm(event: KeyboardEvent) { 
   if(!this.EarthStudForm.invalid){ 
    if(this.EarthStudForm.dirty){
      this.validationError=false;
      this.service.lpsClick=1;
      this.service.logoutClick=1;
      this.service.windowTabClick=1;
    }
    else{
      this.validationError=false;
      this.service.lpsClick=0;
      this.service.logoutClick=0;
      this.service.windowTabClick=0;
    }
   }
   else {
    this.service.lpsClick=1;
    this.service.logoutClick=1;
    this.service.windowTabClick=1;
   }
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

  gotoNextModal(content1: any,contents:any) {
    this.submitted=true;
     if (this.EarthStudForm.invalid) {
       this.validationError = true;
      
       this.validationErrorMsg = 'Please check all the fields';
       setTimeout(() => {
       this.validationError = false;
      }, 3000);
       return;
     }

     else if (this.basicLpsId == 0) {
      this.validationError = true;
      this.validationErrorMsg = 'Basics Form is Required, Please fill';
     setTimeout(() => {
       this.validationError = false;
     }, 3000);
      return;
    }
    else if(this.EarthStudForm.value.earthStud[0].buildingNumber == undefined && this.EarthStudForm.value.earthStud[0].buildingNumber == '' && this.EarthStudForm.value.earthStud[0].buildingName=='' && this.EarthStudForm.value.earthStud[0].buildingName == undefined){
      this.validationError = true;
      this.validationErrorMsg = 'Air Termination Form is Required, Please fill';
      setTimeout(() => {
        this.validationError = false;
      }, 3000);
      return;
    }
      //  Update and Success msg will be showing
     else if(this.EarthStudForm.dirty && this.EarthStudForm.touched){
        this.modalService.open(content1, { centered: true,backdrop: 'static' });
        this.summaryPopup=true;
     }
    //  For Dirty popup
     else{
      this.modalService.open(contents, { centered: true,backdrop: 'static' });
      // this.modalReference.close();
     }
  }

  retriveStud(){
    
    this.earthStudService.retrieveEarthStud(this.router.snapshot.paramMap.get('email') || '{}',this.basicLpsId).subscribe(
      data => {
        if(JSON.parse(data)[0] != undefined && JSON.parse(data)[0].basicLpsId !=null){
          this.retrieveDetailsfromSavedReports(JSON.parse(data)[0]);
        }
      },
      error=>{
      }
    );  
  }

  dropDown(event: any,a:any,index:any){
    let changedValue;
    if(event.target != undefined) {
      changedValue = event.target.value;
    }
    else{
      changedValue = event;
    }
      if(changedValue== 'No'){

        this.equipotentialBondings[index]=false;
        this.interconnectingLPS[index]=false;  
        this.faultProtection[index]=false; 
        this.mainProtective[index]=false; 
        this.sizeOfMainProtective[index]=false; 
        this.supplimentaryProtective[index]=false; 

        if(a != null){
          a.controls.numberOfEquipotentialBondingOb.clearValidators();
          a.controls.numberOfEquipotentialBondingOb.updateValueAndValidity();

          a.controls.sizeOfEarthingConductorOb.clearValidators();
          a.controls.sizeOfEarthingConductorOb.updateValueAndValidity();

          a.controls.conceptOfEquipotentialBondingOb.clearValidators();
          a.controls.conceptOfEquipotentialBondingOb.updateValueAndValidity();

          a.controls.mainProtectiveEquipotentialBondingOb.clearValidators();
          a.controls.mainProtectiveEquipotentialBondingOb.updateValueAndValidity();

          a.controls.sizeOfMainProtectiveOb.clearValidators();
          a.controls.sizeOfMainProtectiveOb.updateValueAndValidity();

          a.controls.supplimentaryMainProtectiveOb.clearValidators();
          a.controls.supplimentaryMainProtectiveOb.updateValueAndValidity();

          a.controls.numberOfEquipotentialBondingOb.setValue(null);
          a.controls.numberOfEquipotentialBondingRem.setValue(null);
          a.controls.sizeOfEarthingConductorOb.setValue(null);
          a.controls.sizeOfEarthingConductorRem.setValue(null);
          a.controls.conceptOfEquipotentialBondingOb.setValue(null);
          a.controls.conceptOfEquipotentialBondingRem.setValue(null);
          a.controls.mainProtectiveEquipotentialBondingOb.setValue(null);
          a.controls.mainProtectiveEquipotentialBondingRem.setValue(null);
          a.controls.sizeOfMainProtectiveOb.setValue(null);
          a.controls.sizeOfMainProtectiveRem.setValue(null);
          a.controls.supplimentaryMainProtectiveOb.setValue(null);
          a.controls.supplimentaryMainProtectiveRem.setValue(null);
  
        }

      }

        else{
          
          this.equipotentialBondings[index]=true;
          this.interconnectingLPS[index]=true;  
          this.faultProtection[index]=true; 
          this.mainProtective[index]=true; 
          this.sizeOfMainProtective[index]=true; 
          this.supplimentaryProtective[index]=true; 
  
          if(a != null){
            a.controls.numberOfEquipotentialBondingOb.setValidators(Validators.required);
            a.controls.numberOfEquipotentialBondingOb.updateValueAndValidity();
  
            a.controls.sizeOfEarthingConductorOb.setValidators(Validators.required);
            a.controls.sizeOfEarthingConductorOb.updateValueAndValidity();
  
            a.controls.conceptOfEquipotentialBondingOb.setValidators(Validators.required);
            a.controls.conceptOfEquipotentialBondingOb.updateValueAndValidity();
  
            a.controls.mainProtectiveEquipotentialBondingOb.setValidators(Validators.required);
            a.controls.mainProtectiveEquipotentialBondingOb.updateValueAndValidity();
  
            a.controls.sizeOfMainProtectiveOb.setValidators(Validators.required);
            a.controls.sizeOfMainProtectiveOb.updateValueAndValidity();
  
            a.controls.supplimentaryMainProtectiveOb.setValidators(Validators.required);
            a.controls.supplimentaryMainProtectiveOb.updateValueAndValidity();
          }
      }
  }

  //creating form array based on airtermination building
  createearthStudForm(data: any) {
    
    this.earthStud = this.EarthStudForm.get('earthStud') as FormArray;

    for (let i = 0; i < data.lpsAirDescription.length; i++) {
      let buildingNumber = data.lpsAirDescription[i].buildingNumber
      let buildingName = data.lpsAirDescription[i].buildingName
      let buildingCount = data.lpsAirDescription[i].buildingCount
      let isBuildingRequired = false;

      //existing form having given building number avilable or not  
      let isFormAvailable = '';
      for (let k = 0; !isBuildingRequired && k < this.earthStud.length; k++) {
        //form having correct building number & name
        if (this.earthStud.value[k].buildingNumber == buildingNumber &&
          this.earthStud.value[k].buildingName == buildingName &&
          this.earthStud.value[k].buildingCount == buildingCount) {
          isBuildingRequired = true;
          isFormAvailable = "available"
        }
        //if form empty 
        else if (this.earthStud.value[k].buildingNumber == '' ||
          this.earthStud.value[k].buildingNumber == undefined ||
          this.earthStud.value[k].buildingNumber == null) {
          if (this.earthStud.length == 1) {
            (this.EarthStudForm.get('earthStud') as FormArray).removeAt(k);
          }
          this.earthStud.push(this.allEartStud(buildingNumber, buildingName, buildingCount));
          isBuildingRequired = true;
          isFormAvailable = "available"
        }

      }
      //not having form for given airtermination buildingnumber 
      if (isFormAvailable != "available") {
        this.earthStud.push(this.allEartStud(buildingNumber, buildingName, buildingCount));      }
    }
  }
  getAirterminationData(){
    this.airterminationServices.retriveAirTerminationDetails(this.basicLpsId).subscribe(
      data => {
        this.createearthStudForm(JSON.parse(data)[0]);
      }       
    ); 
  }

  gotoNextTab() {
    if ((this.EarthStudForm.dirty && this.EarthStudForm.invalid) || this.service.isCompleted6 == false) {
      this.service.isCompleted7 = false;
      this.service.isLinear = true;
      this.service.editable = false;
      this.validationErrorTab = true;
      this.validationErrorMsgTab = 'Please check all the fields in EarthStudForm';
      setTimeout(() => {
        this.validationErrorTab = false;
      }, 3000);
      return;
    }
    else if (this.EarthStudForm.dirty && this.EarthStudForm.touched) {
      this.service.isCompleted7 = false;
      this.service.isLinear = true;
      this.service.editable = false;
      this.tabError = true;
      this.tabErrorMsg = 'Kindly click on next button to update the changes!';
      setTimeout(() => {
        this.tabError = false;
      }, 3000);
    }
    else {
      this.service.isCompleted7 = true;
      this.service.isLinear = false;
      this.service.editable = true;
    }
  }

  reloadFromBack(){
    if(this.EarthStudForm.invalid){
     this.service.isCompleted7= false;
     this.service.isLinear=true;
     this.service.editable=false;
     this.validationErrorTab = true;
     this.validationErrorMsgTab= 'Please check all the fields in EarthStudForm';
     setTimeout(() => {
       this.validationErrorTab = false;
     }, 3000);
     return false;
    }
    else if(this.EarthStudForm.dirty && this.EarthStudForm.touched){
      this.service.isCompleted7= false;
      this.service.isLinear=true;
      this.service.editable=false;
      this.tabError = true;
      this.tabErrorMsg = 'Kindly click on next button to update the changes!';
      setTimeout(() => {
        this.tabError = false;
      }, 3000);
      return false;
    } 
    else{
      this.service.isCompleted7= true;
      this.service.isLinear=false;
      this.service.editable=true;
      this.EarthStudForm.markAsPristine();
   return true;
    }
  }
}



