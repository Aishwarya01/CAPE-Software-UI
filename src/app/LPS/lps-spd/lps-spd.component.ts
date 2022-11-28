import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalsService } from 'src/app/globals.service';
import { spdReport } from 'src/app/LPS_model/spdReport';
import { AirterminationService } from 'src/app/LPS_services/airtermination.service';
import { LpsSpd_Service } from 'src/app/LPS_services/lps-spd.service';
import { LpsMatstepperComponent } from '../lps-matstepper/lps-matstepper.component';

@Component({
  selector: 'app-lps-spd',
  templateUrl: './lps-spd.component.html',
  styleUrls: ['./lps-spd.component.css']
})
export class LpsSpdComponent implements OnInit {
  spdReport=new spdReport();
  lpsSpd_Service;
  j: any;
  submitted=false;
  disable: boolean=false;
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
  spdDescription!: FormArray;
  success: boolean=false;
  successMsg: string="";
  Error: boolean=false;
  spdDescriptionArr: any=[];
  errorArr: any=[];
  errorMsg: string="";
  validationError: boolean = false;
  validationErrorMsg: String = '';
  @Output() proceedNext = new EventEmitter<any>();
  spdPushArr:any=[];
  step5List: any = [];
  flag: boolean = false;
  mobilearr: any = [];
  mobilearr2: any = [];
  mobilearr3: any = [];
  spd: any=[];
  isEditable!:boolean
  isAirterminationUpdated:boolean=false;
  summaryPopup: boolean = false;
  spdDescriptionDelArr: any=[];
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
    private lpsSpd_Services: LpsSpd_Service,
    private modalService: NgbModal, 
    public service: GlobalsService,
    private airterminationServices:AirterminationService,
    private router: ActivatedRoute) {
    this.lpsSpd_Service = lpsSpd_Services;
  }

  spdForm!: FormGroup;

  ngOnInit(): void {
    this.spdForm = this.formBuilder.group({
      spd: this.formBuilder.array([this.allSPD('','','')])
    });
    if(this.isAirterminationUpdated){
      this.retriveSPD();
      this.isAirterminationUpdated=false;
    }
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

  // Only Accept numbers and allow .(dot)
  keyPressNumbers1(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 46 || charCode > 46) && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  allSPD(buildingNumber:any,buildingName:any,buildingCount:any):FormGroup {
    return new FormGroup({
      spdId: new FormControl(''),
      buildingNumber: new FormControl(buildingNumber),
      buildingName: new FormControl(buildingName),
      buildingCount: new FormControl(buildingCount),
      flag: new FormControl('A'),
      
      mainsIncomingOb: new FormControl('', Validators.required),
      mainsIncomingRem: new FormControl(''),
      totalMainsIncomingOb: new FormControl('', Validators.required),
      totalMainsIncomingRem:new FormControl(''),
      noPannelSupplittingOb: new FormControl('', Validators.required),
      noPannelSupplittingRem: new FormControl(''),
      totalNoOutDoorRequipmentOb: new FormControl('', Validators.required),
      totalNoOutDoorRequipmentRem: new FormControl(''),

      spdDescription: this.formBuilder.array([this.spddescriptionForm()])
    });
  }

  reset(){
    this.spdForm.reset();
  }

   retrieveDetailsfromSavedReports1(userName: any,basicLpsId: any,clientName: any,data: any){
//     // this.service.lpsClick=1;
//     
//     this.step5List = data.earthStudReport;
//     this.spdReport.basicLpsId = this.step7List.basicLpsId;
//     this.spdReport.earthStudReportId = this.step7List.earthStudReportId;
//     this.earthStudReport.userName = this.step7List.userName;
//     this.earthStudReport.createdBy = this.step7List.createdBy;
//     this.earthStudReport.createdDate = this.step7List.createdDate;
//     for(let i of this.step7List.earthStudDescription)
//     this.EarthStudForm.patchValue({
//       earthStud: [i],  
//     });
//     this.flag=true;
 }

  retrieveDetailsfromSavedReports(data: any) {
    this.service.lpsClick = 1;

    if (data.basicLpsId != undefined && data.basicLpsId != 0) {
      this.step5List = data; 
    }
    else {
      this.step5List = data.spdReport;
      setTimeout(() => {
        this.createSpdForm(data.airTermination)
      }, 500);
    }
    this.spdReport.basicLpsId = this.step5List.basicLpsId;
    this.spdReport.spdReportId = this.step5List.spdReportId;
    this.spdReport.userName = this.step5List.userName;
    this.spdReport.createdBy = this.step5List.createdBy;
    this.spdReport.createdDate = this.step5List.createdDate;

    let spd = [];
    for (let i of this.step5List.spd) {
      spd.push(this.createGroup(i));
    }
    this.spdForm.setControl('spd', this.formBuilder.array(spd || []));
    this.flag = true;

    // this.spdForm.patchValue({
    //   spd: [i],
    // });

  }

    // populateData(spd:any){
    //   for(let item of spd){
        
    //   }
    // }

  createGroup(item: any): FormGroup {
    return this.formBuilder.group({
      buildingNumber: new FormControl({ disabled: false, value: item.buildingNumber }),
      spdId: new FormControl({ disabled: false, value: item.spdId }),
      buildingName: new FormControl({ disabled: false, value: item.buildingName }),
      buildingCount: new FormControl({ disabled: false, value: item.buildingCount }),
      flag: new FormControl({ disabled: false, value: item.flag }),
      mainsIncomingOb: new FormControl({ disabled: false, value: item.mainsIncomingOb }, Validators.required),
      mainsIncomingRem: new FormControl({ disabled: false, value: item.mainsIncomingRem }),
      totalMainsIncomingOb: new FormControl({ disabled: false, value: item.totalMainsIncomingOb }, Validators.required),
      totalMainsIncomingRem: new FormControl({ disabled: false, value: item.totalMainsIncomingRem }),
      noPannelSupplittingOb: new FormControl({ disabled: false, value: item.noPannelSupplittingOb }, Validators.required),
      noPannelSupplittingRem: new FormControl({ disabled: false, value: item.noPannelSupplittingRem }),
      totalNoOutDoorRequipmentOb: new FormControl({ disabled: false, value: item.totalNoOutDoorRequipmentOb }, Validators.required),
      totalNoOutDoorRequipmentRem: new FormControl({ disabled: false, value: item.totalNoOutDoorRequipmentRem }),
      spdDescription: this.formBuilder.array(this.populateSpdDescription(item)),
    });
  }

    populateSpdDescription(item:any){
      
      this.spdDescriptionArr= [];
      for(let item1 of item.spdDescription){
        this.spdDescriptionArr.push(this.createGroup1(item1));
      }
      return  this.spdDescriptionArr;
    }

    createGroup1(item: any): FormGroup {
      return this.formBuilder.group({
        spdDescriptionId:new FormControl({disabled: false, value: item.spdDescriptionId}),
        location:new FormControl({disabled: false, value: item.location}),
        panelName:new FormControl({disabled: false, value: item.panelName}),
        flag:new FormControl({disabled: false, value: item.flag}),
        spdMakeOb:new FormControl({disabled: false, value: item.spdMakeOb}),
        spdMakeRem:new FormControl({disabled: false, value: item.spdMakeRem}),
        spdModelOb:new FormControl({disabled: false, value: item.spdModelOb}),
        spdModelRem:new FormControl({disabled: false, value: item.spdModelRem}),
        spdClassTypeOb:new FormControl({disabled: false, value: item.spdClassTypeOb}),
        spdClassTypeRem:new FormControl({disabled: false, value: item.spdClassTypeRem}),
        spdApplicationOb:new FormControl({disabled: false, value: item.spdApplicationOb}),
        spdApplicationRem:new FormControl({disabled: false, value: item.spdApplicationRem}),
        spdMainApplicationOb:new FormControl({disabled: false, value: item.spdMainApplicationOb}),
        spdMainApplicationRem:new FormControl({disabled: false, value: item.spdMainApplicationRem}),
        properConnectionOb:new FormControl({disabled: false, value: item.properConnectionOb}),
        properConnectionRem:new FormControl({disabled: false, value: item.properConnectionRem}),
        incomerRatingOb:new FormControl({disabled: false, value: item.incomerRatingOb}),
        incomerRatingRem:new FormControl({disabled: false, value: item.incomerRatingRem}),
        fuseBackUpOb:new FormControl({disabled: false, value: item.fuseBackUpOb}),
        fuseBackUpRem:new FormControl({disabled: false, value: item.fuseBackUpRem}),
        lengthOfConnectingWirePhaseOb:new FormControl({disabled: false, value: item.lengthOfConnectingWirePhaseOb}),
        lengthOfConnectingWirePhaseRem:new FormControl({disabled: false, value: item.lengthOfConnectingWirePhaseRem}),
        lengthOfConnectingWireProtectiveOb:new FormControl({disabled: false, value: item.lengthOfConnectingWireProtectiveOb}),
        lengthOfConnectingWireProtectiveRem:new FormControl({disabled: false, value: item.lengthOfConnectingWireProtectiveRem}),
        sizeOfConnectingWirePhaseOb:new FormControl({disabled: false, value: item.sizeOfConnectingWirePhaseOb}),
        sizeOfConnectingWirePhaseRem:new FormControl({disabled: false, value: item.sizeOfConnectingWirePhaseRem}),
        sizeOfConnectingWireProtectiveOb:new FormControl({disabled: false, value: item.sizeOfConnectingWireProtectiveOb}),
        sizeOfConnectingWireProtectiveRem:new FormControl({disabled: false, value: item.sizeOfConnectingWireProtectiveRem}),
        buildingCount:new FormControl(''),

      });
    }
  
  private spddescriptionForm():FormGroup{
    return new FormGroup({
      location: new FormControl(''),
      panelName: new FormControl(''),
      flag: new FormControl('A'),
      spdMakeOb: new FormControl('', Validators.required),
      spdMakeRem: new FormControl(''),
      spdModelOb: new FormControl('', Validators.required),
      spdModelRem: new FormControl(''),
      spdClassTypeOb: new FormControl('', Validators.required),
      spdClassTypeRem: new FormControl(''),
      spdApplicationOb: new FormControl('', Validators.required),
      spdApplicationRem: new FormControl(''),
      spdMainApplicationOb: new FormControl('', Validators.required),
      spdMainApplicationRem: new FormControl(''),
      properConnectionOb: new FormControl('', Validators.required),
      properConnectionRem: new FormControl(''),
      incomerRatingOb: new FormControl('', Validators.required),
      incomerRatingRem: new FormControl(''),
      fuseBackUpOb: new FormControl('', Validators.required),
      fuseBackUpRem: new FormControl(''),
      lengthOfConnectingWirePhaseOb: new FormControl('', Validators.required),
      lengthOfConnectingWirePhaseRem: new FormControl(''),
      lengthOfConnectingWireProtectiveOb: new FormControl('', Validators.required),
      lengthOfConnectingWireProtectiveRem: new FormControl(''),
      sizeOfConnectingWirePhaseOb: new FormControl('', Validators.required),
      sizeOfConnectingWirePhaseRem: new FormControl(''),
      sizeOfConnectingWireProtectiveOb: new FormControl('', Validators.required),
      sizeOfConnectingWireProtectiveRem: new FormControl(''),
      spdDescriptionId: new FormControl(''),
    });
  }

  overAllspdControl(): AbstractControl[] {
    return(<FormArray>this.spdForm.get('spd')).controls;
  }


  spdDescriptionControl(form:any) {
    return form.controls.spdDescription?.controls;

  }

  get f() {
    return this.spdForm.controls;
  }

  // Location and Panel iteration methed 
  locationPanel(event: KeyboardEvent, a: any) {
    
    let numberOfItr = parseInt((<HTMLInputElement>event.target).value);
    // this.spdDescription = a as FormArray;

    //new form
    if (a.controls.spdDescription.controls.length < numberOfItr) {
      for (let i = a.controls.spdDescription.controls.length; i < numberOfItr; i++) {
        (a.controls.spdDescription as FormArray).push(this.spddescriptionForm())
      }
    }
    // Deleting the iteration
    else if (a.controls.spdDescription.controls.length > numberOfItr && numberOfItr != 0) {
      for (let index = a.controls.spdDescription.controls.length; numberOfItr < index; index--) {
        if (a.controls.spdDescription.controls[index - 1].value.spdDescriptionId != 0 &&
          a.controls.spdDescription.controls[index - 1].value.spdDescriptionId != undefined &&
          a.controls.spdDescription.controls[index - 1].value.spdDescriptionId != '' &&
          a.controls.spdDescription.controls[index - 1].value.spdDescriptionId != null) {

          a.controls.spdDescription.controls[index - 1].controls.flag.setValue('R');
          a.controls.spdDescription.controls[index - 1].controls.buildingCount.setValue(a.controls.buildingCount.value);
          this.spdDescriptionDelArr.push(a.value.spdDescription[index - 1]);
          (a.get('spdDescription') as FormArray).removeAt(index - 1);
        }
        else {
          (a.get('spdDescription') as FormArray).removeAt(index - 1);
        }
      }
    }
  }

  // Add and Delete Buttons
  add(form:any) {
    this.spdDescription = form.get('spdDescription') as FormArray;
    this.spdDescription.push(this.spddescriptionForm());
    form.controls.noPannelSupplittingOb.setValue(form.controls.spdDescription.controls.length);
    form.controls.noPannelSupplittingOb.updateValueAndValidity();
  }

  removeItem(form: any, a: any, index: any) {
    
    if (a.value.spdDescriptionId != 0 && a.value.spdDescriptionId != undefined) {
      a.controls.flag.setValue('R');
      a.controls.buildingCount.setValue(form.controls.buildingCount.value);
      this.spdDescriptionDelArr = this.spdDescriptionDelArr.concat(a.value);
      (form.get('spdDescription') as FormArray).removeAt(index);

    }
    else {
      (form.get('spdDescription') as FormArray).removeAt(index);
    }
    form.controls.noPannelSupplittingOb.setValue(form.controls.spdDescription.controls.length);
    form.controls.noPannelSupplittingOb.updateValueAndValidity();
    this.spdForm.markAsDirty();
    this.spdForm.markAsTouched();
  }

  onSubmit(flag: any) {

    // this.submitted = true;
    if (this.spdForm.invalid && (this.spdForm.value.spd[0].buildingNumber != undefined || this.spdForm.value.spd[0].buildingNumber != '')) 
    { return }
    this.spinner = true;
    this.popup=false;
    // this.spdReport.spd[0]=[]
    //this.spdReport=this.spdForm.value
    this.spdReport.userName = this.router.snapshot.paramMap.get('email') || '{}';
    this.spdReport.basicLpsId = this.basicLpsId;

    this.spdReport.spd = this.spdForm.value.spd;

    //deleted spdDescription record
    for (let index = 0; index < this.spdReport.spd.length; index++) {
      for (let i = 0; i < this.spdDescriptionDelArr.length; i++) {
        if (this.spdReport.spd[index].buildingCount == this.spdDescriptionDelArr[i].buildingCount) {
          this.spdReport.spd[index].spdDescription.push(this.spdDescriptionDelArr[i]);
        }
      }
    }

    this.spdDescriptionDelArr = []

    if (!this.validationError) {
      if (flag) {
        if (this.spdForm.dirty && this.spdForm.touched) {
          this.lpsSpd_Service.updateSpdDetails(this.spdReport).subscribe(
            (data) => {
              setTimeout(() =>{
                this.popup=true;
                this.spinner=false;
              }, 3000)
              this.success = true;
              this.successMsg = data;
              this.spdForm.markAsPristine();
              this.proceedNext.emit(true);
              this.service.lpsClick = 0;
              this.service.logoutClick = 0;
              this.service.windowTabClick = 0;
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
        else {
            this.popup=true;
            this.spinner=false;
          if (this.isEditable) {
            this.success = true;
            this.proceedNext.emit(true);
          } else {
            this.popup=true;
            this.spinner=false;
            this.success = true;
            this.proceedNext.emit(true);
          }
        }
      }
      else {
        this.lpsSpd_Service.saveSPDDetails(this.spdReport).subscribe(
          (data) => {
            setTimeout(() =>{
              this.popup=true;
              this.spinner=false;
            }, 3000)
            this.success = true;
            this.successMsg = data;
            this.disable = true;
            this.retriveSPD();
            setTimeout(() => {
              this.getAirterminationData();
             }, 300);
            this.proceedNext.emit(true);
            this.service.lpsClick = 0;
            this.service.logoutClick = 0;
            this.service.windowTabClick = 0;
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
  onChangeForm(event: any) {
    if (!this.spdForm.invalid) {
      if (this.spdForm.dirty) {
        this.validationError = false;
        this.service.lpsClick = 1;
        this.service.logoutClick = 1;
        this.service.windowTabClick = 1;
      }
      else {
        this.validationError = false;
        this.service.lpsClick = 0;
        this.service.logoutClick = 0;
        this.service.windowTabClick = 0;
      }
    }
    else {
      this.service.lpsClick = 1;
      this.service.logoutClick = 1;
      this.service.windowTabClick = 1;
    }
  }
  onKeyForm(event: KeyboardEvent) {
    if (!this.spdForm.invalid) {
      if (this.spdForm.dirty) {
        this.validationError = false;
        this.service.lpsClick = 1;
        this.service.logoutClick = 1;
        this.service.windowTabClick = 1;
      }
      else {
        this.validationError = false;
        this.service.lpsClick = 0;
        this.service.logoutClick = 0;
        this.service.windowTabClick = 0;
      }
    }
    else {
      this.service.lpsClick = 1;
      this.service.logoutClick = 1;
      this.service.windowTabClick = 1;
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

  gotoNextModal(content1: any, contents: any) {
    this.submitted = true;
    if (this.spdForm.invalid) {
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
    else if(this.spdForm.value.spd[0].buildingNumber == undefined && this.spdForm.value.spd[0].buildingNumber == '' && this.spdForm.value.spd[0].buildingName=='' && this.spdForm.value.spd[0].buildingName == undefined){
      this.validationError = true;
      this.validationErrorMsg = 'Air Termination Form is Required, Please fill';
      setTimeout(() => {
        this.validationError = false;
      }, 3000);
      return;
    }
    else if (this.spdForm.dirty && this.spdForm.touched) {
      this.modalService.open(content1, { centered: true, backdrop: 'static' });
      this.summaryPopup=true;
    }
    //  For Dirty popup
    else {
      this.modalService.open(contents, { centered: true, backdrop: 'static' });
    }
  }
  
  retriveSPD() {
    this.lpsSpd_Services.retrieveSPDDetails(this.router.snapshot.paramMap.get('email') || '{}', this.basicLpsId).subscribe(
      data => {
        let spd=JSON.parse(data)[0];
        if(spd !=undefined && spd.basicLpsId !=null){
          this.retrieveDetailsfromSavedReports(spd);
        }
      },
      error => {
      }
    );
  }

  getAirterminationData() {
    this.airterminationServices.retriveAirTerminationDetails(this.basicLpsId).subscribe(
      data => {
        let spd_air=JSON.parse(data)[0];
        if(spd_air !=undefined && spd_air.basicLpsId !=null){
        this.createSpdForm(spd_air);
        }
      }
    );
  }

     //creating form array based on airtermination building
  createSpdForm(data: any) {
    
    this.spd = this.spdForm.get('spd') as FormArray;

    for (let i = 0; i < data.lpsAirDescription.length; i++) {
      let buildingNumber = data.lpsAirDescription[i].buildingNumber
      let buildingName = data.lpsAirDescription[i].buildingName
      let buildingCount = data.lpsAirDescription[i].buildingCount
      let isBuildingRequired = false;
 
      //existing form having given building number avilable or not  
      let isFormAvailable = '';
      for (let k = 0; !isBuildingRequired && k < this.spd.length; k++) {
        //form having correct building number & name
        if (this.spd.value[k].buildingNumber == buildingNumber &&
          this.spd.value[k].buildingName == buildingName &&
          this.spd.value[k].buildingCount == buildingCount) {
          isBuildingRequired = true;
          isFormAvailable = "available"
        }
        //if form empty 
        else if (this.spd.value[k].buildingNumber == '' ||
          this.spd.value[k].buildingNumber == undefined ||
          this.spd.value[k].buildingNumber == null) {
          if (this.spd.length == 1) {
            (this.spdForm.get('spd') as FormArray).removeAt(k);
          }
          this.spd.push(this.allSPD(buildingNumber, buildingName, buildingCount));
          isBuildingRequired = true;
          isFormAvailable = "available"
        }
      }
      //not having form for given airtermination buildingnumber 
      if (isFormAvailable != "available") {
        this.spd.push(this.allSPD(buildingNumber, buildingName, buildingCount));
      }
    }
  }
    
  gotoNextTab() {
    if ((this.spdForm.dirty && this.spdForm.invalid) || this.service.isCompleted4 == false) {
      this.service.isCompleted5 = false;
      this.service.isLinear = true;
      this.service.editable = false;
      this.validationErrorTab = true;
      this.validationErrorMsgTab = 'Please check all the fields in SpdForm';
      setTimeout(() => {
        this.validationErrorTab = false;
      }, 3000);
      return;
    }
    else if (this.spdForm.dirty && this.spdForm.touched) {
      this.service.isCompleted5 = false;
      this.service.isLinear = true;
      this.service.editable = false;
      this.tabError = true;
      this.tabErrorMsg = 'Kindly click on next button to update the changes!';
      setTimeout(() => {
        this.tabError = false;
      }, 3000);
    }
    else {
      this.service.isCompleted5 = true;
      this.service.isLinear = false;
      this.service.editable = true;
    }
  }

  reloadFromBack(){
    if(this.spdForm.invalid){
     this.service.isCompleted5= false;
     this.service.isLinear=true;
     this.service.editable=false;
     this.validationErrorTab = true;
     this.validationErrorMsgTab= 'Please check all the fields in EarthingForm';
     setTimeout(() => {
       this.validationErrorTab = false;
     }, 3000);
     return false;
    }
    else if(this.spdForm.dirty && this.spdForm.touched){
      this.service.isCompleted5= false;
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
      this.service.isCompleted5= true;
      this.service.isLinear=false;
      this.service.editable=true;
      this.spdForm.markAsPristine();
   return true;
    }
  }

  decimalConversion(event:any,form:any){
    if(form.controls.lengthOfConnectingWirePhaseOb.value!="" && form.controls.lengthOfConnectingWirePhaseOb.value!=undefined && form.controls.lengthOfConnectingWirePhaseOb.value!=null){
      var conversionValue=form.controls.lengthOfConnectingWirePhaseOb.value;
      form.controls.lengthOfConnectingWirePhaseOb.setValue(parseFloat(parseFloat(conversionValue).toFixed(1)));
    }else{
      form.controls.lengthOfConnectingWirePhaseOb.setValue("");
    }
    if(form.controls.lengthOfConnectingWireProtectiveOb.value!="" && form.controls.lengthOfConnectingWireProtectiveOb.value!=undefined && form.controls.lengthOfConnectingWireProtectiveOb.value!=null){
      var conversionValue1=form.controls.lengthOfConnectingWireProtectiveOb.value;
      form.controls.lengthOfConnectingWireProtectiveOb.setValue(parseFloat(parseFloat(conversionValue1).toFixed(1)));
    }else{
      form.controls.lengthOfConnectingWireProtectiveOb.setValue("");
    }
    if(form.controls.sizeOfConnectingWirePhaseOb.value!="" && form.controls.sizeOfConnectingWirePhaseOb.value!=undefined && form.controls.sizeOfConnectingWirePhaseOb.value!=null){
      var conversionValue2=form.controls.sizeOfConnectingWirePhaseOb.value;
      form.controls.sizeOfConnectingWirePhaseOb.setValue(parseFloat(parseFloat(conversionValue2).toFixed(1)));
    }else{
      form.controls.sizeOfConnectingWirePhaseOb.setValue("");
    }
    if(form.controls.sizeOfConnectingWireProtectiveOb.value!="" && form.controls.sizeOfConnectingWireProtectiveOb.value!=undefined && form.controls.sizeOfConnectingWireProtectiveOb.value!=null){
      var conversionValue3=form.controls.sizeOfConnectingWireProtectiveOb.value;
      form.controls.sizeOfConnectingWireProtectiveOb.setValue(parseFloat(parseFloat(conversionValue3).toFixed(1)));
    }else{
      form.controls.sizeOfConnectingWireProtectiveOb.setValue("");
    }
  }
}