import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { BasicDetails} from 'src/app/LPS_model/basic-details';
import { LPSBasicDetailsService } from 'src/app/LPS_services/lpsbasic-details.service';

@Component({
  selector: 'app-lps-basic-page',
  templateUrl: './lps-basic-page.component.html',
  styleUrls: ['./lps-basic-page.component.css']
})
export class LpsBasicPageComponent implements OnInit {
  
  basicDetails = new BasicDetails;
  LPSBasicForm!: FormGroup;
  lPSBasicDetailsService;
  submitted!: boolean;
  success: boolean=false;
  successMsg: string="";
  disable: boolean=false;
  Error: boolean=false;
  errorArr: any=[];
  errorMsg: string="";
  validationError: boolean = false;
  validationErrorMsg: String = '';
  @Output() proceedNext = new EventEmitter<any>();
  

  constructor(private formBuilder: FormBuilder, lPSBasicDetailsService: LPSBasicDetailsService,
    private modalService: NgbModal,private router: ActivatedRoute) {
    this.lPSBasicDetailsService = lPSBasicDetailsService;
  }

  
  ngOnInit(): void {
    
    this.LPSBasicForm = this.formBuilder.group({
    
      clientName: ['', Validators.required],
      projectName: ['', Validators.required],
      pmcName: ['', Validators.required],
      consultantName: ['', Validators.required],
      contractorName: ['', Validators.required],
      address: ['', Validators.required],
      location: ['', Validators.required],
      installationContractor: ['', Validators.required],
      industryType: ['', Validators.required],
      buildingType: ['', Validators.required],
      buildingLength: ['', Validators.required],
      buildingHeight: ['', Validators.required],
      levelOfProtection: ['', Validators.required],
      soilResistivity: ['', Validators.required],
      dealerContractorName: ['', Validators.required],
      buildingWidth: ['', Validators.required],
      basicLpsDescription: this.formBuilder.array([this.createLpsDescriptionarr()])
    });

  }


  private createLpsDescriptionarr() {
    return this.formBuilder.group({
      approvedDrawingObserv: ['', Validators.required],
      approvedDrawingRemarks: [''],
      architectNameObserv: ['', Validators.required],
      architectNameRemarks: [''],
      designDateObserv: ['', Validators.required],
      designDateRemarks: [''],
      approvedByObserv: ['', Validators.required],
      approvedByRemarks: [''],
      dateOfApprovalOb: ['', Validators.required],
      dateOfApprovalRem: [''],
      drawingObserv: ['', Validators.required],
      drawingRemarks: [''],
      revisionNoObserv: ['', Validators.required],
      revisionNoRemarks: [''],
      deviationObserv: ['', Validators.required],
      deviationRemarks: [''],
      installationQualityObserv: ['', Validators.required],
      installationQualityRemarks: ['']
    });
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
     if (this.LPSBasicForm.invalid) {
       this.validationError = true;
      
       this.validationErrorMsg = 'Please check all the fields';
       setTimeout(() => {
        this.validationError = false;
       }, 3000);
       return;
     }
    this.modalService.open(content, { centered: true });
  }
 
  onSubmit() {
    
    this.submitted=true;
     if (this.LPSBasicForm.invalid) {
       return;
     }
     

    this.basicDetails.userName=this.router.snapshot.paramMap.get('email') || '{}';
    this.basicDetails.basicLpsDescription = this.LPSBasicForm.value.basicLpsDescription;
    this.lPSBasicDetailsService.saveLPSBasicDetails(this.basicDetails).subscribe(
    
      (data) => {
        let basicDetailsItr=JSON.parse(data);
             
        debugger
        this.basicDetails.basicLpsId=basicDetailsItr.basicLpsId;
        this.success = true;
        this.successMsg = "Sucessfully saved";
        this.disable = true;
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
    console.log(this.basicDetails);
  }


  getDescriptionControl(): AbstractControl[] {
    return (<FormArray>this.LPSBasicForm.get('basicLpsDescription')).controls;
  }
  get f() {
    return this.LPSBasicForm.controls;
  }
  
}
