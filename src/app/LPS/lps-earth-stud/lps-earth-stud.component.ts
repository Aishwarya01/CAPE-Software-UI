import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  
  constructor(
    private formBuilder: FormBuilder,
    private earthStudService: EarthStudService,private modalService: NgbModal, private router: ActivatedRoute
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

  onSubmit(){
    this.submitted=true;
    if(this.EarthStudForm.invalid){return}

    this.earthStud.userName = this.router.snapshot.paramMap.get('email') || '{}';;
    this.earthStud.basicLpsId = this.basicLpsId;
    
    this.earthStudService.saveEarthStud(this.earthStud).subscribe(

      (data) => {
        this.success = true;
        this.successMsg = data;
        this.disable = true;
        this.proceedNext.emit(true);
      },
      (error) => {
        this.Error = true;
        this.errorArr = [];
        this.errorArr = JSON.parse(error.error);
        this.errorMsg = this.errorArr.message;
        this.proceedNext.emit(false);
      });
   
  
  }
  
  get f() {
    return this.EarthStudForm.controls;
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

}
