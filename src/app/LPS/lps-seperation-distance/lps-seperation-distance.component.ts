import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalsService } from 'src/app/globals.service';
import { SeperationDistanceReport } from 'src/app/LPS_model/SeperationDistanceReport';
import { AirterminationService } from 'src/app/LPS_services/airtermination.service';
import { SeparatedistanceService } from 'src/app/LPS_services/separatedistance.service';


@Component({
  selector: 'app-lps-seperation-distance',
  templateUrl: './lps-seperation-distance.component.html',
  styleUrls: ['./lps-seperation-distance.component.css']
})
export class LpsSeperationDistanceComponent implements OnInit {

  i: any;
  seperationDistanceReport = new SeperationDistanceReport();
  separeteDistanceForm!: FormGroup;
  seperationDistanceDescription!: FormArray;
  separateDistance!: FormArray;
  separateDistanceDownConductors!: FormArray;
  submitted!: boolean;
  email: any;
  
  validationError: boolean = false;
  validationErrorMsg: String = '';
  successMsg: string="";
  errorMsg: string="";
  success: boolean=false;
  Error: boolean=false;
  errorArr: any=[];
  disable: boolean = false;

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
 
  @Output() proceedNext = new EventEmitter<any>();
  step6List: any = [];
  flag: boolean = false;
  arr: any  = [];
  separatedistancePushArr:any=[];
  separateDistanceDownConductorsPushArr:any=[];
  isEditable!:boolean
  isAirterminationUpdated:boolean=false;
  validationErrorTab: boolean = false;
  validationErrorMsgTab: string="";
  tabError: boolean=false;
  tabErrorMsg: string="";
  
  constructor(private formBuilder: FormBuilder,
            private separatedistanceService: SeparatedistanceService,
            private modalService: NgbModal, private router: ActivatedRoute,
            public service: GlobalsService,
            public airterminationServices: AirterminationService)     
    {
  }

  gotoNextModal(content: any,contents:any) {
    
    if (this.separeteDistanceForm.invalid) {
      this.validationError = true;
      this.validationErrorMsg = 'Please check all the fields';
      setTimeout(() => {
        this.validationError = false;
      }, 3000);
      return;
    }
    
    else if(this.basicLpsId == 0) {
      this.validationError = true;
      this.validationErrorMsg = 'Basics Form is Required, Please fill';
      setTimeout(() => {
        this.validationError = false;
      }, 3000);
      return;
    }
    else if(this.separeteDistanceForm.value.seperationDistanceDescription[0].buildingNumber != undefined || this.separeteDistanceForm.value.seperationDistanceDescription[0].buildingNumber != ''){
      this.validationError = true;
      this.validationErrorMsg = 'Air Termination Form is Required, Please fill';
      setTimeout(() => {
        this.validationError = false;
      }, 3000);
      return;
    }
    else if(this.separeteDistanceForm.dirty && this.separeteDistanceForm.touched){
      this.modalService.open(content, { centered: true,backdrop: 'static' });
   }
  //  For Dirty popup
   else{
    this.modalService.open(contents, { centered: true,backdrop: 'static' });
   }
  }

  ngOnInit(): void {

    this.separeteDistanceForm = this.formBuilder.group({
      seperationDistanceDescription: this.formBuilder.array([this.allSeparateDistance('', '', '')])
    });
    if (this.isAirterminationUpdated) {
      this.retriveSeperationDistance();
      this.isAirterminationUpdated=false;
    }
  }

  allSeparateDistance(buildingNumber:any,buildingName:any,buildingCount:any): FormGroup {
    return new FormGroup({
      seperationDistanceId: new FormControl(''),
      buildingNumber: new FormControl(buildingNumber),
      buildingCount: new FormControl(buildingCount),
      buildingName:new FormControl(buildingName),
      calculatedSeperationDistanceOb:new FormControl(''),
      calculatedSeperationDistanceRem:new FormControl(''),
      flag:new FormControl('A'),

      separateDistance: this.formBuilder.array([this.separateDistanceArrForm()]),
      separateDistanceDownConductors: this.formBuilder.array([this.separateDistanceArr2Form()]),
    });
  }

  reset(){
    this.separeteDistanceForm.reset();
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

  retrieveDetailsfromSavedReports(data: any){
      // this.service.lvClick=1;
      if(data.basicLpsId != undefined && data.basicLpsId != 0){
        this.step6List = data;
      } 
      else{
        this.step6List = data.seperationDistanceReport;
        setTimeout(() => {
          this.createSeperationForm(data.airTermination);
        }, 300); 
      }
      this.populateData();  
      this.seperationDistanceReport.basicLpsId = this.step6List.basicLpsId;   
      this.seperationDistanceReport.seperationDistanceReportId = this.step6List.seperationDistanceReportId  
      this.seperationDistanceReport.createdBy = this.step6List.createdBy;
      this.seperationDistanceReport.createdDate = this.step6List.createdDate;   
      this.seperationDistanceReport.userName = this.step6List.userName;   
      this.flag=true;
    }

  private separateDistanceArrForm(): FormGroup {
    return new FormGroup({
      seperationDistanceDesc: new FormControl('',Validators.required),
      seperationDistanceOb: new FormControl('',Validators.required),
      seperationDistanceRem: new FormControl(''),
      flag: new FormControl('A'),

    })
  }

  private separateDistanceArr2Form(): FormGroup {
    return new FormGroup({
      seperationDistanceDesc: new FormControl('',Validators.required),
      seperationDistanceOb: new FormControl('',Validators.required),
      seperationDistanceRem: new FormControl(''),
      flag: new FormControl('A'),

    })
  }

  populateData() {
    
     let a=[]
    for (let item of this.step6List.seperationDistanceDescription) {     
     a.push(this.createGroup(item));
    }
    this.separeteDistanceForm.setControl('seperationDistanceDescription', this.formBuilder.array(a || []))
  }

  createGroup(item: any): FormGroup {
    return this.formBuilder.group({

    seperationDistanceId: new FormControl({disabled: false, value: item.seperationDistanceId}),
    buildingNumber: new FormControl({disabled: false, value: item.buildingNumber}),
    buildingCount: new FormControl({disabled: false, value: item.buildingCount}),
    buildingName: new FormControl({disabled: false, value: item.buildingName}),
    calculatedSeperationDistanceOb: new FormControl({disabled: false, value: item.calculatedSeperationDistanceOb}),
    calculatedSeperationDistanceRem: new FormControl({disabled: false, value: item.calculatedSeperationDistanceRem}),
    flag: new FormControl({disabled: false, value: item.flag}), 
 
    separateDistance: this.formBuilder.array(this.populateSeparateDistanceData(item.separateDistance)),
    separateDistanceDownConductors: this.formBuilder.array(this.populateSeparateDistanceDownConductorseData(item.separateDistanceDownConductors)),
    });
  }

  populateSeparateDistanceData(item:any) {
    let separateDistance=[];
    for (let value of item) {     
      separateDistance.push(this.separateDistanceGroup(value));
    }
    return separateDistance;
  }
  separateDistanceGroup(item:any): FormGroup {
    return this.formBuilder.group({
      seperationDistanceDescId: new FormControl({disabled: false, value: item.seperationDistanceDescId}, Validators.required),
      seperationDistanceDesc: new FormControl({disabled: false, value: item.seperationDistanceDesc}, Validators.required),
      seperationDistanceOb: new FormControl({disabled: false, value: item.seperationDistanceOb}, Validators.required),
      seperationDistanceRem: new FormControl({disabled: false, value: item.seperationDistanceRem}),
      flag: new FormControl({disabled: false, value: item.flag}),
      buildingCount: new FormControl('')
  });
  }

  populateSeparateDistanceDownConductorseData(item:any) {
    let seperationDistanceDescriptionArr=[];
    for (let value of item) {     
      seperationDistanceDescriptionArr.push(this.SeparateDistanceDownConductorGroup(value));
    }
     return seperationDistanceDescriptionArr;
  }
  SeparateDistanceDownConductorGroup(item:any): FormGroup {
    return this.formBuilder.group({
      seperationDistanceDownConductorId: new FormControl({disabled: false, value: item.seperationDistanceDownConductorId}, Validators.required),
      seperationDistanceDesc: new FormControl({disabled: false, value: item.seperationDistanceDesc}, Validators.required),
      seperationDistanceOb: new FormControl({disabled: false, value: item.seperationDistanceOb}, Validators.required),
      seperationDistanceRem: new FormControl({disabled: false, value: item.seperationDistanceRem}),
      flag: new FormControl({disabled: false, value: item.flag}),
      buildingCount: new FormControl('')

  });
  }

  overAllSeperationControl(): AbstractControl[] {
    return(<FormArray>this.separeteDistanceForm.get('seperationDistanceDescription')).controls;
  }

  getseparateDistanceDescriptionControls(form:any) {
    return form.controls.separateDistance?.controls;
  }

  getSeparateDistanceDownConductorsControls(form:any) {
    return form.controls.separateDistanceDownConductors?.controls;
  }

  get f() {
    return this.separeteDistanceForm.controls;
  }

   //SeparateDistance
  addSeparateDistance(form:any,a:any) {
    this.separateDistance = form.get('separateDistance') as FormArray;
    this.separateDistance.push(this.separateDistanceArrForm());
  }

   //separateDistanceDownConductors
  addSeparateDistanceDownConductors(form:any,a:any) {
    this.separateDistanceDownConductors = form.get('separateDistanceDownConductors') as FormArray;
    this.separateDistanceDownConductors.push(this.separateDistanceArr2Form());
  }
  
  //Removing SeparateDistance record
  removeSeparateDistance(form: any, a: any, index: any) {
    
    if (a.value.seperationDistanceDescId != 0 && a.value.seperationDistanceDescId != undefined) {
      a.controls.flag.setValue('R');
      a.controls.buildingCount.setValue(form.controls.buildingCount.value);
      this.separatedistancePushArr = this.separatedistancePushArr.concat(a.value);
    }
    (form.get('separateDistance') as FormArray).removeAt(index);
    this.separeteDistanceForm.markAsTouched();
    this.separeteDistanceForm.markAsDirty();
  }

  //Removing SeparateDistanceDownConductors records
  removeSeparateDistanceDownConductors(form: any, a: any, index: any) {
    
    if (a.value.seperationDistanceDownConductorId != 0 && a.value.seperationDistanceDownConductorId != undefined) {
      a.controls.flag.setValue('R');
      a.controls.buildingCount.setValue(form.controls.buildingCount.value);
      this.separateDistanceDownConductorsPushArr = this.separateDistanceDownConductorsPushArr.concat(a.value);
    }
    (form.get('separateDistanceDownConductors') as FormArray).removeAt(index);
    this.separeteDistanceForm.markAsTouched();
    this.separeteDistanceForm.markAsDirty();
  }

  onChangeForm(event:any){
    if(!this.separeteDistanceForm.invalid){
      if(this.separeteDistanceForm.dirty){
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
   if(!this.separeteDistanceForm.invalid){ 
    if(this.separeteDistanceForm.dirty){
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
      this.success = false;
      this.modalService.dismissAll((this.successMsg = ''));
    }
  }



  onSubmit(flag: any) {
    this.submitted = true;
    if (this.separeteDistanceForm.invalid && (this.separeteDistanceForm.value.seperationDistanceDescription[0].buildingNumber != undefined || this.separeteDistanceForm.value.seperationDistanceDescription[0].buildingNumber != '')) {
      return;
    }

    this.seperationDistanceReport.seperationDistanceDescription = this.separeteDistanceForm.value.seperationDistanceDescription;
    this.seperationDistanceReport.userName = this.router.snapshot.paramMap.get('email') || '{}';
    this.seperationDistanceReport.basicLpsId = this.basicLpsId;

    //Adding deleted Data
    for (let index = 0; index < this.seperationDistanceReport.seperationDistanceDescription.length; index++) {

      //deleted separateDistance Data
      for (let i = 0; i < this.separatedistancePushArr.length; i++) {

        if (this.seperationDistanceReport.seperationDistanceDescription[index].buildingCount == this.separatedistancePushArr[i].buildingCount) {
          this.seperationDistanceReport.seperationDistanceDescription[index].separateDistance.push(this.separatedistancePushArr[i]);
        }
      }

      //deleted separateDistanceDownConductors Data
      for (let i = 0; i < this.separateDistanceDownConductorsPushArr.length; i++) {

        if (this.seperationDistanceReport.seperationDistanceDescription[index].buildingCount == this.separateDistanceDownConductorsPushArr[i].buildingCount) {
          this.seperationDistanceReport.seperationDistanceDescription[index].separateDistanceDownConductors.push(this.separateDistanceDownConductorsPushArr[i]);
        }
      }

    }
    this.separateDistanceDownConductorsPushArr = [];
    this.separatedistancePushArr = [];

    if (!this.validationError) {
      if(flag) {
        if(this.separeteDistanceForm.dirty && this.separeteDistanceForm.touched){ 
        this.separatedistanceService.updateSeparateDistance(this.seperationDistanceReport).subscribe(
          (data) => {
            this.success = true;
            this.successMsg = data;
            this.separeteDistanceForm.markAsPristine();
            this.service.lvClick=0;
            this.service.logoutClick=0;
            this.service.windowTabClick=0;
            this.proceedNext.emit(true);
          },
          (error) => {
            this.Error = true;
            this.errorArr = [];
            this.errorArr = JSON.parse(error.error);
            this.errorMsg = this.errorArr.message;
            this.proceedNext.emit(false);
          }
        )
      }
      else{
        if(this.isEditable){
          this.success = true;
          this.proceedNext.emit(true);
        }else{
          this.success = true;
          this.proceedNext.emit(true);
        }
      }
      }
      else {
        this.separatedistanceService.saveSeparateDistance(this.seperationDistanceReport).subscribe(
          (data) => {
            this.success = true;
            this.successMsg = data;
            this.disable = true;
            this.retriveSeperationDistance();
            setTimeout(() => {
              this.getAirterminationData();
             }, 300);
            this.proceedNext.emit(true);
            this.service.lvClick=0;
            this.service.logoutClick=0;
            this.service.windowTabClick=0;
            // setTimeout(() => {
            //   this.separeteDistanceForm.markAsPristine;
            // }, 3000);
          },
          (error) => {
            this.Error = true;
            this.errorArr = [];
            this.errorArr = JSON.parse(error.error);
            this.errorMsg = this.errorArr.message;
            this.proceedNext.emit(false);
          });
      }
    }
  }

  retriveSeperationDistance(){
    this.separatedistanceService.retriveSeperationDistance(this.router.snapshot.paramMap.get('email') || '{}',this.basicLpsId).subscribe(
      data => {
        let seprationDistance=JSON.parse(data)[0];
        if(seprationDistance !=undefined && seprationDistance.basicLpsId !=null){
          this.retrieveDetailsfromSavedReports(seprationDistance);
        }
      },
      error=>{
      }
    );  
  }

  getAirterminationData(){
    this.airterminationServices.retriveAirTerminationDetails(this.router.snapshot.paramMap.get('email') || '{}',this.basicLpsId).subscribe(
      data => {
        let seprationDistance_air=JSON.parse(data)[0];
        if(seprationDistance_air !=undefined && seprationDistance_air.basicLpsId !=null){
        this.createSeperationForm(seprationDistance_air);
        }
      }       
    ); 
  }
  //creating form array based on airtermination building
  createSeperationForm(data: any) {
    
    this.seperationDistanceDescription = this.separeteDistanceForm.get('seperationDistanceDescription') as FormArray;

    for (let i = 0; i < data.lpsAirDescription.length; i++) {
      let buildingNumber = data.lpsAirDescription[i].buildingNumber;
      let buildingName = data.lpsAirDescription[i].buildingName;
      let buildingCount = data.lpsAirDescription[i].buildingCount;
      let isBuildingRequired = false;

      //existing form having given building number avilable or not  
      let isFormAvailable = '';
      for (let k = 0; !isBuildingRequired && k < this.seperationDistanceDescription.length; k++) {
        //form having correct building number & name
        if (this.seperationDistanceDescription.value[k].buildingNumber == buildingNumber &&
          this.seperationDistanceDescription.value[k].buildingName == buildingName &&
          this.seperationDistanceDescription.value[k].buildingCount == buildingCount) {
          isBuildingRequired = true;
          isFormAvailable = "available"
        }
        //if form empty 
        else if (this.seperationDistanceDescription.value[k].buildingNumber == '' ||
          this.seperationDistanceDescription.value[k].buildingNumber == undefined ||
          this.seperationDistanceDescription.value[k].buildingNumber == null) {
          if (this.seperationDistanceDescription.length == 1) {
            (this.separeteDistanceForm.get('seperationDistanceDescription') as FormArray).removeAt(k);
          }
          this.seperationDistanceDescription.push(this.allSeparateDistance(buildingNumber, buildingName, buildingCount));
          isBuildingRequired = true;
          isFormAvailable = "available"
        }
      }
      //not having form for given airtermination buildingnumber 
      if (isFormAvailable != "available") {
        this.seperationDistanceDescription.push(this.allSeparateDistance(buildingNumber, buildingName, buildingCount));
      }
    }
  }

  gotoNextTab() {
    if ((this.separeteDistanceForm.dirty && this.separeteDistanceForm.invalid) || this.service.isCompleted5 == false) {
      this.service.isCompleted6 = false;
      this.service.isLinear = true;
      this.service.editable = false;
      this.validationErrorTab = true;
      this.validationErrorMsgTab = 'Please check all the fields in SepareteDistanceForm';
      setTimeout(() => {
        this.validationErrorTab = false;
      }, 3000);
      return;
    }
    else if (this.separeteDistanceForm.dirty && this.separeteDistanceForm.touched) {
      this.service.isCompleted6 = false;
      this.service.isLinear = true;
      this.service.editable = false;
      this.tabError = true;
      this.tabErrorMsg = 'Kindly click on next button to update the changes!';
      setTimeout(() => {
        this.tabError = false;
      }, 3000);
    }
    else {
      this.service.isCompleted6 = true;
      this.service.isLinear = false;
      this.service.editable = true;
    }
  }

  reloadFromBack(){
    if(this.separeteDistanceForm.invalid){
     this.service.isCompleted6= false;
     this.service.isLinear=true;
     this.service.editable=false;
     this.validationErrorTab = true;
     this.validationErrorMsgTab= 'Please check all the fields in SepareteDistanceForm';
     setTimeout(() => {
       this.validationErrorTab = false;
     }, 3000);
     return false;
    }
    else if(this.separeteDistanceForm.dirty && this.separeteDistanceForm.touched){
      this.service.isCompleted6= false;
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
      this.service.isCompleted6= true;
      this.service.isLinear=false;
      this.service.editable=true;
      this.separeteDistanceForm.markAsPristine();
   return true;
    }
  }

}
