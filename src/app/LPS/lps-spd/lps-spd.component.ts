import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalsService } from 'src/app/globals.service';
import { spdReport } from 'src/app/LPS_model/spdReport';
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
  constructor(
    private formBuilder: FormBuilder, 
    private lpsSpd_Services: LpsSpd_Service,
    private modalService: NgbModal, 
    public service: GlobalsService,

    private router: ActivatedRoute) {
    this.lpsSpd_Service = lpsSpd_Services;
  }

  spdForm!: FormGroup;

  ngOnInit(): void {
    this.spdForm = this.formBuilder.group({
      spd: this.formBuilder.array([this.allSPD('','')])
    });
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

  allSPD(buildingNumber:any,buildingName:any):FormGroup {
    return new FormGroup({
      spdId: new FormControl(''),
      buildingNumber: new FormControl(buildingNumber),
      buildingName: new FormControl(buildingName),
      buildingCount: new FormControl(''),
      flag: new FormControl('A'),
      
      mainsIncomingOb: new FormControl('', Validators.required),
      mainsIncomingRem: new FormControl('', Validators.required),
      totalMainsIncomingOb: new FormControl('', Validators.required),
      totalMainsIncomingRem:new FormControl('', Validators.required),
      noPannelSupplittingOb: new FormControl('', Validators.required),
      noPannelSupplittingRem: new FormControl('', Validators.required),
      totalNoOutDoorRequipmentOb: new FormControl('', Validators.required),
      totalNoOutDoorRequipmentRem: new FormControl('', Validators.required),

      spdDescription: this.formBuilder.array([this.spddescriptionForm()])
    });
  }

  reset(){
    this.spdForm.reset();
  }

   retrieveDetailsfromSavedReports(userName: any,basicLpsId: any,clientName: any,data: any){
//     // this.service.lvClick=1;
//     debugger
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

retrieveDetailsfromSavedReports(userName: any,basicLpsId: any,clientName: any,data: any){
   // this.service.lvClick=1;
   this.flag=true;
      this.step5List = JSON.parse(data);
      this.spdReport.spdReportId=this.step5List[0].spdReportId;
      this.spdReport.basicLpsId = basicLpsId;
      this.spdReport.createdBy = this.step5List[0].createdBy;
      this.spdReport.createdDate = this.step5List[0].createdDate;      
      this.spdReport.userName = this.step5List[0].userName;
      // for(let i of this.step5List[0].spd)
      // this.spdForm.patchValue({
      //   spd: [i],
      // });
     
      this.populateData(this.step5List[0].spd)
    
    }

    populateData(spd:any){
      for(let item of spd){
        console.log(item.spdId);
        this.spd.push(this.createGroup(item));
      }
    }

    createGroup(item: any): FormGroup {
      return this.formBuilder.group({
        spdReportId:new FormControl({disabled: false, value: item.spdReportId}),
        spdId:new FormControl({disabled: false, value: item.spdId}),
        location: new FormControl({disabled: false, value: item.location}),
        panelName: new FormControl({disabled: false, value: item.panelName}),
        flag: new FormControl({disabled: false, value: item.flag}),
        spdMakeOb: new FormControl({disabled: false, value: item.spdMakeOb},Validators.required),
        spdMakeRem: new FormControl({disabled: false, value: item.spdMakeRem}),
        spdModelOb: new FormControl({disabled: false, value: item.spdModelOb},Validators.required),
        spdModelRem: new FormControl({disabled: false, value: item.spdModelRem}),
        spdClassTypeOb: new FormControl({disabled: false, value: item.spdClassTypeOb},Validators.required),
        spdClassTypeRem: new FormControl({disabled: false, value: item.spdClassTypeRem}),
        spdApplicationOb: new FormControl({disabled: false, value: item.spdApplicationOb},Validators.required),
        spdApplicationRem: new FormControl({disabled: false, value: item.spdApplicationRem}),
        spdMainApplicationOb: new FormControl({disabled: false, value: item.spdMainApplicationOb},Validators.required),
        spdMainApplicationRem: new FormControl({disabled: false, value: item.spdMainApplicationRem}),
        properConnectionOb: new FormControl({disabled: false, value: item.properConnectionOb},Validators.required),
        properConnectionRem: new FormControl({disabled: false, value: item.properConnectionRem}),
        incomerRatingOb: new FormControl({disabled: false, value: item.incomerRatingOb},Validators.required),
        incomerRatingRem: new FormControl({disabled: false, value: item.incomerRatingRem}),
        fuseBackUpOb: new FormControl({disabled: false, value: item.fuseBackUpOb},Validators.required),
        fuseBackUpRem: new FormControl({disabled: false, value: item.fuseBackUpRem}),
        lengthOfConnectingWirePhaseOb: new FormControl({disabled: false, value: item.lengthOfConnectingWirePhaseOb},Validators.required),
        lengthOfConnectingWirePhaseRem: new FormControl({disabled: false, value: item.lengthOfConnectingWirePhaseRem}),
        lengthOfConnectingWireProtectiveOb: new FormControl({disabled: false, value: item.lengthOfConnectingWireProtectiveOb},Validators.required),
        lengthOfConnectingWireProtectiveRem: new FormControl({disabled: false, value: item.lengthOfConnectingWireProtectiveRem}),
        sizeOfConnectingWirePhaseOb: new FormControl({disabled: false, value: item.sizeOfConnectingWirePhaseOb},Validators.required),
        sizeOfConnectingWirePhaseRem: new FormControl({disabled: false, value: item.sizeOfConnectingWirePhaseRem}),
        sizeOfConnectingWireProtectiveOb: new FormControl({disabled: false, value: item.sizeOfConnectingWireProtectiveOb},Validators.required),
        spdDescription: this.formBuilder.array(this.populateSpdDescription(item)),
        sizeOfConnectingWireProtectiveRem: new FormControl({disabled: false, value: item.sizeOfConnectingWireProtectiveRem}),
      });
    }

    populateSpdDescription(item:any){
      
      this.spdDescriptionArr= [];
      for(let item1 of item.spdDescription){
        console.log(item.spdId)
        console.log(item.SpdDescriptionId)
        this.spdDescriptionArr.push(this.createGroup1(item1));
      }
      return  this.spdDescriptionArr;
    }

    createGroup1(item: any): FormGroup {
      return this.formBuilder.group({
        spdId:new FormControl({disabled: false, value: item.spdId}),
        SpdDescriptionId:new FormControl({disabled: false, value: item.spdDescriptionId}),

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

  // Add and Delete Buttons
  add(form:any) {
    this.spdDescription = form.get('spdDescription') as FormArray;
    this.spdDescription.push(this.spddescriptionForm());
  }

  removeItem(form:any,a:any,index:any) {
    debugger
    if(a.value.spdDescriptionId !=0 && a.value.spdDescriptionId !=undefined)
    {
      a.value.flag=false;
      (form.get('spdDescription') as FormArray).removeAt(index);
      this.spdPushArr= this.spdPushArr.concat(a.value);
    }
  else{
    (form.get('spdDescription') as FormArray).removeAt(index);}
  }

  onSubmit(flag: any){
      
      this.submitted=true;
      if(this.spdForm.invalid){return}
        
       // this.spdReport.spd[0]=[]
        //this.spdReport=this.spdForm.value
        this.spdReport.userName = this.router.snapshot.paramMap.get('email') || '{}';
        this.spdReport.basicLpsId = this.basicLpsId;

        this.spdReport.spd = this.spdForm.value.spd;
    

        if (!this.validationError) {
          if(flag) {
            if(this.spdForm.dirty && this.spdForm.touched){ 
            this.lpsSpd_Service.updateSpdDetails(this.spdReport).subscribe(
              (data) => {
                this.success = true;
                this.successMsg = data;
                this.spdForm.markAsPristine();
                this.proceedNext.emit(true);
                this.service.lvClick=0;
                this.service.logoutClick=0;
                this.service.windowTabClick=0;
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
            this.lpsSpd_Service.saveSPDDetails(this.spdReport).subscribe(      
              (data) => {
                this.success = true;
                this.successMsg = data;
                this.disable = true;
                this.retriveSPD();
                this.proceedNext.emit(true);
                this.service.lvClick=0;
                this.service.logoutClick=0;
                this.service.windowTabClick=0;
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
      onChangeForm(event:any){
        if(!this.spdForm.invalid){
          if(this.spdForm.dirty){
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
       if(!this.spdForm.invalid){ 
        if(this.spdForm.dirty){
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
    
      gotoNextModal(content: any,contents:any) {
        this.basicLpsId = 302;
         if (this.spdForm.invalid) {
           this.validationError = true;
          
           this.validationErrorMsg = 'Please check all the fields';
           setTimeout(() => {
            this.validationError = false;
           }, 3000);
           return;
         }
         if (this.basicLpsId == 0) {
          this.validationError = true;
          this.validationErrorMsg = 'Basics Form is Required, Please fill';
          setTimeout(() => {
            this.validationError = false;
          }, 3000);
          return;
        }
        if(this.spdForm.dirty && this.spdForm.touched){
          this.modalService.open(content, { centered: true,backdrop: 'static' });
       }
      //  For Dirty popup
       else{
        this.modalService.open(contents, { centered: true,backdrop: 'static' });
       }
    }
  
    retriveSPD(){
      this.lpsSpd_Services.retrieveSPDDetails(this.router.snapshot.paramMap.get('email') || '{}',this.basicLpsId).subscribe(
        data => {
          this.retrieveDetailsfromSavedReports(this.spdReport.userName,this.basicLpsId,this.ClientName,data);
        },
        error=>{
        }
      );  
    }

    dosomthingRetriveSPD(userName:any,basicLpsId:any){
      this.lpsSpd_Services.retrieveSPDDetails(userName,basicLpsId).subscribe(
        data => {
          this.retrieveDetailsfromSavedReports1(userName,basicLpsId,'',data);
        },
        error=>{
          this.ngOnInit();
        }
      );  
    }
    
}