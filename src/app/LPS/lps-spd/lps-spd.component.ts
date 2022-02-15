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
  spd=new spdReport();
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

  allSPD(buildingNumber:any,buildingName:any):FormGroup {
    return new FormGroup({
      spdId: new FormControl(''),
      buildingNumber: new FormControl(buildingNumber),
      buildingName: new FormControl(buildingName),
      buildingCount: new FormControl(''),
      flag: new FormControl(''),
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
    // this.service.lvClick=1;

      this.step5List = data.spddesc;
      this.spd.basicLpsId = basicLpsId;
      // this.spd.spdId = this.step5List.spdId
      // this.spd.mainsIncomingOb = this.step5List.mainsIncomingOb;
      // this.spd.mainsIncomingRem = this.step5List.mainsIncomingRem;
      // this.spd.totalMainsIncomingOb = this.step5List.totalMainsIncomingOb;
      // this.spd.totalMainsIncomingRem = this.step5List.totalMainsIncomingRem;
      // this.spd.noPannelSupplittingOb = this.step5List.noPannelSupplittingOb;
      // this.spd.noPannelSupplittingRem = this.step5List.noPannelSupplittingRem;
      // this.spd.totalNoOutDoorRequipmentOb = this.step5List.totalNoOutDoorRequipmentOb;
      // this.spd.totalNoOutDoorRequipmentRem = this.step5List.totalNoOutDoorRequipmentRem;
      this.spd.createdBy = this.step5List.createdBy;
      this.spd.createdDate = this.step5List.createdDate;      
      this.spd.userName = this.step5List.userName;
 
      //this.populateData();
      this.flag=true;
    }

    // populateData() {
    //   for (let item of this.step5List.spdDescription) {
    //     if(item.spdDescriptionRole == "Mains_SPD") {
    //     this.mobilearr.push(this.createGroup(item));
    //     this.spdForm.setControl('spdarr', this.formBuilder.array(this.mobilearr || []))
    //     this.mobilearr = [];
    //     }
    //     else if(item.spdDescriptionRole == "Street_SPD") {
    //       this.mobilearr2.push(this.createGroup(item))
    //       this.spdForm.setControl('panelarr', this.formBuilder.array(this.mobilearr2 || []))  
    //       this.mobilearr2 = [];
    //     }
    //     else if(item.spdDescriptionRole == "Other_SPD") {
    //       this.mobilearr3.push(this.createGroup(item))
    //       this.spdForm.setControl('powerarr', this.formBuilder.array(this.mobilearr3 || []))
    //       this.mobilearr3 = [];
    //     }
    //   }
    // }

    retrieveDetailsfromSavedReports1(userName: any,basicLpsId: any,clientName: any,data: any){
      // this.service.lvClick=1;

      this.step5List = JSON.parse(data);
      this.spd.basicLpsId = basicLpsId;
      // this.spd.spdId = this.step5List[0].spdId
      // this.spd.mainsIncomingOb = this.step5List[0].mainsIncomingOb;
      // this.spd.mainsIncomingRem = this.step5List[0].mainsIncomingRem;
      // this.spd.totalMainsIncomingOb = this.step5List[0].totalMainsIncomingOb;
      // this.spd.totalMainsIncomingRem = this.step5List[0].totalMainsIncomingRem;
      // this.spd.noPannelSupplittingOb = this.step5List[0].noPannelSupplittingOb;
      // this.spd.noPannelSupplittingRem = this.step5List[0].noPannelSupplittingRem;
      // this.spd.totalNoOutDoorRequipmentOb = this.step5List[0].totalNoOutDoorRequipmentOb;
      // this.spd.totalNoOutDoorRequipmentRem = this.step5List[0].totalNoOutDoorRequipmentRem;
      this.spd.createdBy = this.step5List[0].createdBy;
      this.spd.createdDate = this.step5List[0].createdDate;      
      this.spd.userName = this.step5List[0].userName;
      //this.populateData1();
      this.flag=true;
    }

    // populateData1() {
    //   for (let item of this.step5List[0].spdDescription) {
    //     if(item.spdDescriptionRole == "Mains_SPD") {
    //     this.mobilearr.push(this.createGroup(item));
    //     this.spdForm.setControl('spdarr', this.formBuilder.array(this.mobilearr || []))
    //     this.mobilearr = [];
    //     }
    //     else if(item.spdDescriptionRole == "Street_SPD") {
    //       this.mobilearr2.push(this.createGroup(item))
    //       this.spdForm.setControl('panelarr', this.formBuilder.array(this.mobilearr2 || []))  
    //       this.mobilearr2 = [];
    //     }
    //     else if(item.spdDescriptionRole == "Other_SPD") {
    //       this.mobilearr3.push(this.createGroup(item))
    //       this.spdForm.setControl('powerarr', this.formBuilder.array(this.mobilearr3 || []))
    //       this.mobilearr3 = [];
    //     }
    //   }
    //   this.spdForm.markAsPristine();
    // }

    createGroup(item: any): FormGroup {
      return this.formBuilder.group({
        SpdDescriptionId:new FormControl({disabled: false, value: item.SpdDescriptionId}),
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
        sizeOfConnectingWireProtectiveRem: new FormControl({disabled: false, value: item.sizeOfConnectingWireProtectiveRem}),
      });
    }
  
  private spddescriptionForm():FormGroup{
    return new FormGroup({
      location: new FormControl(''),
      panelName: new FormControl(''),
      flag: new FormControl(''),
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
        this.spd.userName = this.router.snapshot.paramMap.get('email') || '{}';;
        this.spd.basicLpsId = this.basicLpsId;

        if (!this.validationError) {
          if(flag) {
            if(this.spdForm.dirty && this.spdForm.touched){ 
            this.lpsSpd_Service.updateSpdDetails(this.spd).subscribe(
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
            this.lpsSpd_Service.saveSPDDetails(this.spd).subscribe(       
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
          this.retrieveDetailsfromSavedReports1(this.spd.userName,this.basicLpsId,this.ClientName,data);
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