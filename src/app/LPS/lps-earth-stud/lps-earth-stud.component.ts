import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalsService } from 'src/app/globals.service';
import { EarthStud } from 'src/app/LPS_model/earth-stud';
import { EarthStudService } from 'src/app/LPS_services/earth-stud.service';
import { LPSBasicDetailsService } from 'src/app/LPS_services/lpsbasic-details.service';
import { LpsFinalReportComponent } from '../lps-final-report/lps-final-report.component';
import { LpsMatstepperComponent } from '../lps-matstepper/lps-matstepper.component';
import { LpsWelcomePageComponent } from '../lps-welcome-page/lps-welcome-page.component';

@Component({
  selector: 'app-lps-earth-stud',
  templateUrl: './lps-earth-stud.component.html',
  styleUrls: ['./lps-earth-stud.component.css'],
})
export class LpsEarthStudComponent implements OnInit {

  EarthStudForm!: FormGroup;
  submitted=false;
  earthStud = new EarthStud;
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
  flag: boolean = false;
  step7List: any = [];
  selectedIndex = 0;
  isEditable!:boolean
  constructor(
    private formBuilder: FormBuilder,
    private earthStudService: EarthStudService,
    private modalService: NgbModal, 
    private router: ActivatedRoute,
    private lpsMatstepper: LpsMatstepperComponent,
    private welcome: LpsWelcomePageComponent,
    public service: GlobalsService,

    ) { }

  ngOnInit(): void {
    this.EarthStudForm = this.formBuilder.group({
      earthStudVisibilityOb: ['', Validators.required],
      earthStudVisibilityRem: [''],
      earthStudBendOb: ['', Validators.required],
      earthStudBendRem: [''],
      properBondingRailOb: ['', Validators.required],
      properBondingRailRem: [''],
      physicalDamageStudOb: ['', Validators.required],
      physicalDamageStudRem: [''],
      continutyExistaEarthOb: ['', Validators.required],
      continutyExistaEarthRem: ['']
    });
  }

  retrieveDetailsfromSavedReports(userName: any,basicLpsId: any,clientName: any,data: any){
      this.step7List = data.earthStudDescription;
      this.earthStud.basicLpsId = basicLpsId;
      this.earthStud.earthStudDescId = this.step7List.earthStudDescId;
      this.earthStud.earthStudVisibilityOb  = this.step7List.earthStudVisibilityOb;
      this.earthStud.earthStudVisibilityRem  = this.step7List.earthStudVisibilityRem;
      this.earthStud.earthStudBendOb  = this.step7List.earthStudBendOb;
      this.earthStud.earthStudBendRem  = this.step7List.earthStudBendRem
      this.earthStud.properBondingRailOb  = this.step7List.properBondingRailOb;
      this.earthStud.properBondingRailRem  = this.step7List.properBondingRailRem;
      this.earthStud.physicalDamageStudOb  = this.step7List.physicalDamageStudOb;
      this.earthStud.physicalDamageStudRem  = this.step7List.physicalDamageStudRem;
      this.earthStud.continutyExistaEarthOb  = this.step7List.continutyExistaEarthOb;
      this.earthStud.continutyExistaEarthRem  = this.step7List.continutyExistaEarthRem
      this.earthStud.userName = this.step7List.userName;
      this.earthStud.createdBy = this.step7List.createdBy;
      this.earthStud.createdDate = this.step7List.createdDate;
 
      this.flag=true;
    }

  onSubmit(flag: any){
    this.submitted=true;
    if(this.EarthStudForm.invalid){return}
    this.earthStud.userName = this.router.snapshot.paramMap.get('email') || '{}';;
    this.earthStud.basicLpsId = this.basicLpsId;
    if (!this.validationError) {
      if(flag) {
        if(this.EarthStudForm.dirty && this.EarthStudForm.touched){ 
        this.earthStudService.updateEarthStud(this.earthStud).subscribe(
          (data) => {
            this.success = true;
            this.successMsg = data;
            this.EarthStudForm.markAsPristine();
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
          this.proceedNext.emit(true);
        }
      }
      }
      else {
        this.earthStudService.saveEarthStud(this.earthStud).subscribe(
          (data) => {
            
            this.success = true;
            this.successMsg = data;
            this.disable = true;
            this.proceedNext.emit(true);
            setTimeout(() => {
              this.lpsMatstepper.changeTab1(2);
             }, 3000);
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
  
  get f() {
    return this.EarthStudForm.controls;
  }
  onChangeForm(event:any){
    if(!this.EarthStudForm.invalid){
      this.validationError=false;
      this.service.lvClick=0;
   }
   else {
    this.service.lvClick=1;
   }
  }
  onKeyForm(event: KeyboardEvent) { 
    if(!this.EarthStudForm.invalid){
     this.validationError=false;
     this.service.lvClick=0;
   }
   else {
    this.service.lvClick=1;
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
     if (this.EarthStudForm.invalid) {
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
      //  Update and Success msg will be showing
      if(this.EarthStudForm.dirty && this.EarthStudForm.touched){
        this.modalService.open(content, { centered: true });
     }
    //  For Dirty popup
     else{
      this.modalService.open(contents, { centered: true });
     }
  }
}
