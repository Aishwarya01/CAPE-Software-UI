import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalsService } from 'src/app/globals.service';
import { Spd } from 'src/app/LPS_model/spd';
import { LpsSpd_Service } from 'src/app/LPS_services/lps-spd.service';
import { LpsMatstepperComponent } from '../lps-matstepper/lps-matstepper.component';

@Component({
  selector: 'app-lps-spd',
  templateUrl: './lps-spd.component.html',
  styleUrls: ['./lps-spd.component.css']
})
export class LpsSpdComponent implements OnInit {
  spd=new Spd();
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

  success: boolean=false;
  successMsg: string="";
  Error: boolean=false;
  errorArr: any=[];
  errorMsg: string="";
  validationError: boolean = false;
  validationErrorMsg: String = '';
  @Output() proceedNext = new EventEmitter<any>();
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
      //spdId!: number;
      //basicLpsId!: number;
      //userName!: String;
      mainsIncomingOb:new FormControl('', Validators.required),
      mainsIncomingRem: new FormControl(''),
      totalMainsIncomingOb:new FormControl('', Validators.required),
      totalMainsIncomingRem: new FormControl(''),
      noPannelSupplittingOb:new FormControl('', Validators.required),
      noPannelSupplittingRem: new FormControl(''),
      totalNoOutDoorRequipmentOb:new FormControl('', Validators.required),
      totalNoOutDoorRequipmentRem: new FormControl(''),

      spdarr: this.formBuilder.array([this.spdarrfun()]),
      panelarr: this.formBuilder.array([this.panelarrfun()]),
      powerarr: this.formBuilder.array([this.powerarrfun()]),

    });
  }

  reset(){
    this.spdForm.reset();
  }

  retrieveDetailsfromSavedReports(userName: any,basicLpsId: any,clientName: any,data: any){
    // this.service.lvClick=1;

      this.step5List = data.spddesc;
      this.spd.basicLpsId = basicLpsId;
      this.spd.spdId = this.step5List.spdId
      this.spd.mainsIncomingOb = this.step5List.mainsIncomingOb;
      this.spd.mainsIncomingRem = this.step5List.mainsIncomingRem;
      this.spd.totalMainsIncomingOb = this.step5List.totalMainsIncomingOb;
      this.spd.totalMainsIncomingRem = this.step5List.totalMainsIncomingRem;
      this.spd.noPannelSupplittingOb = this.step5List.noPannelSupplittingOb;
      this.spd.noPannelSupplittingRem = this.step5List.noPannelSupplittingRem;
      this.spd.totalNoOutDoorRequipmentOb = this.step5List.totalNoOutDoorRequipmentOb;
      this.spd.totalNoOutDoorRequipmentRem = this.step5List.totalNoOutDoorRequipmentRem;
      this.spd.createdBy = this.step5List.createdBy;
      this.spd.createdDate = this.step5List.createdDate;      
      this.spd.userName = this.step5List.userName;
 
      this.populateData();
      this.flag=true;
    }

    populateData() {
      for (let item of this.step5List.spdDescription) {
        if(item.spdDescriptionRole == "Mains_SPD") {
        this.mobilearr.push(this.createGroup(item));
        this.spdForm.setControl('spdarr', this.formBuilder.array(this.mobilearr || []))
        this.mobilearr = [];
        }
        else if(item.spdDescriptionRole == "Street_SPD") {
          this.mobilearr2.push(this.createGroup(item))
          this.spdForm.setControl('panelarr', this.formBuilder.array(this.mobilearr2 || []))  
          this.mobilearr2 = [];
        }
        else if(item.spdDescriptionRole == "Other_SPD") {
          this.mobilearr3.push(this.createGroup(item))
          this.spdForm.setControl('powerarr', this.formBuilder.array(this.mobilearr3 || []))
          this.mobilearr3 = [];
        }
      }
    }

    retrieveDetailsfromSavedReports1(userName: any,basicLpsId: any,clientName: any,data: any){
      // this.service.lvClick=1;

      this.step5List = JSON.parse(data);
      this.spd.basicLpsId = basicLpsId;
      this.spd.spdId = this.step5List[0].spdId
      this.spd.mainsIncomingOb = this.step5List[0].mainsIncomingOb;
      this.spd.mainsIncomingRem = this.step5List[0].mainsIncomingRem;
      this.spd.totalMainsIncomingOb = this.step5List[0].totalMainsIncomingOb;
      this.spd.totalMainsIncomingRem = this.step5List[0].totalMainsIncomingRem;
      this.spd.noPannelSupplittingOb = this.step5List[0].noPannelSupplittingOb;
      this.spd.noPannelSupplittingRem = this.step5List[0].noPannelSupplittingRem;
      this.spd.totalNoOutDoorRequipmentOb = this.step5List[0].totalNoOutDoorRequipmentOb;
      this.spd.totalNoOutDoorRequipmentRem = this.step5List[0].totalNoOutDoorRequipmentRem;
      this.spd.createdBy = this.step5List[0].createdBy;
      this.spd.createdDate = this.step5List[0].createdDate;      
      this.spd.userName = this.step5List[0].userName;
      this.populateData1();
      this.flag=true;
    }

    populateData1() {
      for (let item of this.step5List[0].spdDescription) {
        if(item.spdDescriptionRole == "Mains_SPD") {
        this.mobilearr.push(this.createGroup(item));
        this.spdForm.setControl('spdarr', this.formBuilder.array(this.mobilearr || []))
        this.mobilearr = [];
        }
        else if(item.spdDescriptionRole == "Street_SPD") {
          this.mobilearr2.push(this.createGroup(item))
          this.spdForm.setControl('panelarr', this.formBuilder.array(this.mobilearr2 || []))  
          this.mobilearr2 = [];
        }
        else if(item.spdDescriptionRole == "Other_SPD") {
          this.mobilearr3.push(this.createGroup(item))
          this.spdForm.setControl('powerarr', this.formBuilder.array(this.mobilearr3 || []))
          this.mobilearr3 = [];
        }
      }
      this.spdForm.markAsPristine();
    }

    createGroup(item: any): FormGroup {
      return this.formBuilder.group({
        SpdDescriptionId:new FormControl({disabled: false, value: item.SpdDescriptionId}),
        spdDescriptionRole:new FormControl({disabled: false, value: item.spdDescriptionRole}),
        spdTypeOb:new FormControl({disabled: false, value: item.spdTypeOb}, Validators.required),
        spdTypeRe: new FormControl({disabled: false, value: item.spdTypeRe}),
        spdApplicationOb:new FormControl({disabled: false, value: item.spdApplicationOb}, Validators.required),
        spdApplicationRem: new FormControl({disabled: false, value: item.spdApplicationRem}),
        panelNameOb:new FormControl({disabled: false, value: item.panelNameOb}, Validators.required),
        panelNameRem: new FormControl({disabled: false, value: item.panelNameRem}),
        incomingRatingOb:new FormControl({disabled: false, value: item.incomingRatingOb}, Validators.required),
        incomingRatingRem: new FormControl({disabled: false, value: item.incomingRatingRem}),
        backupFuseCheckOb:new FormControl({disabled: false, value: item.backupFuseCheckOb}, Validators.required),
        backupFuseCheckRem: new FormControl({disabled: false, value: item.backupFuseCheckRem}),
        connectingWireLengthOb:new FormControl({disabled: false, value: item.connectingWireLengthOb}, Validators.required),
        connectingWireLengthRem: new FormControl({disabled: false, value: item.connectingWireLengthRem}),
        connectingWireSizeOb:new FormControl({disabled: false, value: item.connectingWireSizeOb}, Validators.required),
        connectingWireSizeRem: new FormControl({disabled: false, value: item.connectingWireSizeRem})
      });
    }
  

  private spdarrfun(): FormGroup{
    return new FormGroup({
      spdDescriptionRole:new FormControl('Mains_SPD'),
      spdTypeOb:new FormControl('', Validators.required),
      spdTypeRe: new FormControl(''),
      spdApplicationOb:new FormControl('', Validators.required),
      spdApplicationRem: new FormControl(''),
      panelNameOb:new FormControl('', Validators.required),
      panelNameRem: new FormControl(''),
      incomingRatingOb:new FormControl('', Validators.required),
      incomingRatingRem: new FormControl(''),
      backupFuseCheckOb:new FormControl('', Validators.required),
      backupFuseCheckRem: new FormControl(''),
      connectingWireLengthOb:new FormControl('', Validators.required),
      connectingWireLengthRem: new FormControl(''),
      connectingWireSizeOb:new FormControl('', Validators.required),
      connectingWireSizeRem: new FormControl('')

    });
  }

  private panelarrfun(): FormGroup{
    return new FormGroup({
      spdDescriptionRole:new FormControl('Street_SPD'),
      spdTypeOb:new FormControl('', Validators.required),
      spdTypeRe: new FormControl(''),
      spdApplicationOb:new FormControl('', Validators.required),
      spdApplicationRem: new FormControl(''),
      panelNameOb:new FormControl('', Validators.required),
      panelNameRem: new FormControl(''),
      incomingRatingOb:new FormControl('', Validators.required),
      incomingRatingRem: new FormControl(''),
      backupFuseCheckOb:new FormControl('', Validators.required),
      backupFuseCheckRem: new FormControl(''),
      connectingWireLengthOb:new FormControl('', Validators.required),
      connectingWireLengthRem: new FormControl(''),
      connectingWireSizeOb:new FormControl('', Validators.required),
      connectingWireSizeRem: new FormControl('')

    });
  }

  private powerarrfun(): FormGroup{
    return new FormGroup({
      spdDescriptionRole:new FormControl('Other_SPD'),
      spdTypeOb:new FormControl('', Validators.required),
      spdTypeRe: new FormControl(''),
      spdApplicationOb:new FormControl('', Validators.required),
      spdApplicationRem: new FormControl(''),
      panelNameOb:new FormControl('', Validators.required),
      panelNameRem: new FormControl(''),
      incomingRatingOb:new FormControl('', Validators.required),
      incomingRatingRem: new FormControl(''),
      backupFuseCheckOb:new FormControl('', Validators.required),
      backupFuseCheckRem: new FormControl(''),
      connectingWireLengthOb:new FormControl('', Validators.required),
      connectingWireLengthRem: new FormControl(''),
      connectingWireSizeOb:new FormControl('', Validators.required),
      connectingWireSizeRem: new FormControl('')

    });
  }

  spdarrControls(): AbstractControl[] {
 
    return (<FormArray>this.spdForm.get('spdarr')).controls;
  }

  panelarrControls(): AbstractControl[] {
    return (<FormArray>this.spdForm.get('panelarr')).controls;
  }

  powerarrControls(): AbstractControl[] {
    return (<FormArray>this.spdForm.get('powerarr')).controls;
  }

  get f() {
    return this.spdForm.controls;
  }

  onSubmit(flag: any){
        
      this.submitted=true;
      if(this.spdForm.invalid){return}
        this.spd.userName = this.router.snapshot.paramMap.get('email') || '{}';;
        this.spd.basicLpsId = this.basicLpsId;

        this.spd.spdDescription = this.spdForm.getRawValue().spdarr;
        this.spd.spdDescription=this.spd.spdDescription.concat(this.spdForm.getRawValue().panelarr);
        this.spd.spdDescription=this.spd.spdDescription.concat(this.spdForm.getRawValue().powerarr);
      
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
    
}