import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EarthStud } from 'src/app/LPS_model/earth-stud';
import { EarthStudService } from 'src/app/LPS_services/earth-stud.service';

@Component({
  selector: 'app-lps-earth-stud',
  templateUrl: './lps-earth-stud.component.html',
  styleUrls: ['./lps-earth-stud.component.css']
})
export class LpsEarthStudComponent implements OnInit {

  EarthStudForm!: FormGroup;
  submitted=false;
  earthStud = new EarthStud;
  validationError: boolean = false;
  validationErrorMsg: String = '';
  successMsg: string="";
  errorMsg: string="";
  success: boolean=false;
  Error: boolean=false;
  errorArr: any=[];
  disable: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private earthStudService: EarthStudService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.EarthStudForm = this.formBuilder.group({

      // userName: ['', Validators.required],
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

  gotoNextModal(content: any) {
    if (this.EarthStudForm.invalid) {
      this.validationError = true;
      
      this.validationErrorMsg = 'Please check all the fields';
      setTimeout(() => {
        this.validationError = false;
      }, 3000);
      return;
    }
    this.modalService.open(content, { centered: true });
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


  onSubmit(){
    this.submitted=true;
    this.earthStud.userName="";
    this.earthStud.basicLpsId=99;
    this.earthStudService.saveEarthStud(this.earthStud).subscribe(

      (data) => {
        this.success = true;
        this.successMsg = data;
        this.disable = true;
      },
      (error) => {
        this.Error = true;
        this.errorArr = [];
        this.errorArr = JSON.parse(error.error);
        this.errorMsg = this.errorArr.message;
      })
  };
  
  get f() {
    return this.EarthStudForm.controls;
  }
}
