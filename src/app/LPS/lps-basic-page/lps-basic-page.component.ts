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
  step1List: any = [];
  flag: boolean = false;
  isEditable!:boolean

  success1: boolean =false;
  successMsg1: string="";

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
      soilResistivity: [''],
      dealerContractorName: ['', Validators.required],
      buildingWidth: ['', Validators.required],
      basicLpsDescription: this.formBuilder.array([this.createLpsDescriptionarr()])
    });

  }

  retrieveDetailsfromSavedReports(userName: any,basicLpsId: any,clientName: any,data: any){
     this.step1List = data.basicLps;
    //  if(this.step1List.clientName != null){
       debugger
      this.success = true;
      this.basicDetails.basicLpsId = basicLpsId;
      this.basicDetails.clientName = this.step1List.clientName;
      this.basicDetails.projectName = this.step1List.projectName;
      this.basicDetails.pmcName = this.step1List.pmcName;
      this.basicDetails.address = this.step1List.address;
      this.basicDetails.buildingHeight = this.step1List.buildingHeight;
      this.basicDetails.buildingLength = this.step1List.buildingLength;
      this.basicDetails.buildingType = this.step1List.buildingType;
      this.basicDetails.buildingWidth = this.step1List.buildingWidth;
      this.basicDetails.consultantName = this.step1List.consultantName;
      this.basicDetails.contractorName = this.step1List.contractorName;
      this.basicDetails.createdBy = this.step1List.createdBy;
      this.basicDetails.createdDate = this.step1List.createdDate;
      this.basicDetails.dealerContractorName = this.step1List.dealerContractorName;
      this.basicDetails.industryType = this.step1List.industryType;
      this.basicDetails.installationContractor = this.step1List.installationContractor;
      this.basicDetails.levelOfProtection = this.step1List.levelOfProtection;
      this.basicDetails.location = this.step1List.location;
      this.basicDetails.soilResistivity = this.step1List.soilResistivity;
      this.basicDetails.userName = this.step1List.userName;
      this.basicDetails.allStepsCompleted = this.step1List.allStepsCompleted;
      for(let i of this.step1List.basicLpsDescription) {
        this.LPSBasicForm.patchValue ({
         basicLpsDescription: [i],
        })
       }
    //  }
     
    this.flag=true;
    }


  private createLpsDescriptionarr() {
    return this.formBuilder.group({
      basicLpsDescriptionId: [''],
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

  gotoNextModal(content: any,contents: any) {
    
     if (this.LPSBasicForm.invalid) {
       this.validationError = true;
      
       this.validationErrorMsg = 'Please check all the fields';
       setTimeout(() => {
        this.validationError = false;
       }, 3000);
       return;
     }
     debugger
    //  Update and Success msg will be showing
     if(this.LPSBasicForm.dirty && this.LPSBasicForm.touched){
        this.modalService.open(content, { centered: true });
     }
    //  For Dirty popup
     else{
      this.modalService.open(contents, { centered: true });
     }
     
  }
 
  onSubmit(flag: any) {
    
    this.submitted=true;
     if (this.LPSBasicForm.invalid) {
       return;
     }
     

    this.basicDetails.userName=this.router.snapshot.paramMap.get('email') || '{}';
    this.basicDetails.basicLpsDescription = this.LPSBasicForm.value.basicLpsDescription;

    if(flag) {
      if(this.LPSBasicForm.dirty && this.LPSBasicForm.touched){ 
      this.lPSBasicDetailsService.updateLpsBasicDetails(this.basicDetails).subscribe(
        data => {
          // update success msg
          this.success1 = false;
          this.success = true;
          this.successMsg = data;
          this.LPSBasicForm.markAsPristine();
          this.proceedNext.emit(true);
        },
          // update failed msg
        error => {
          this.success1 = false;
          this.Error = true;
          this.errorArr = [];
          this.errorArr = JSON.parse(error.error);
          this.errorMsg = this.errorArr.message;
          this.proceedNext.emit(false);
        }
      )}
      else{
        debugger
        // Preview fields
        if(this.isEditable){
          this.success = true;
          this.proceedNext.emit(true);
        //  this.closeModalDialog();
        }

        else{
          // Dirty checking here
          this.success = true;
          this.proceedNext.emit(true);
        }
      }
      
    }
    else {
      this.lPSBasicDetailsService.saveLPSBasicDetails(this.basicDetails).subscribe(
    
        data => {
          let basicDetailsItr=JSON.parse(data);              
          
          this.basicDetails.basicLpsId=basicDetailsItr.basicLpsId;
          this.success = true;
          this.successMsg = "Basic Information sucessfully Saved";
          this.disable = true;
          this.proceedNext.emit(true);
        },
        error => {
          this.Error = true;
          this.errorArr = [];
          this.errorArr = JSON.parse(error.error);
          this.errorMsg = this.errorArr.message;
          this.proceedNext.emit(false);
        }
      )
    }
    (this.basicDetails);
  }


  getDescriptionControl(): AbstractControl[] {
    return (<FormArray>this.LPSBasicForm.get('basicLpsDescription')).controls;
  }
  get f() {
    return this.LPSBasicForm.controls;
  }
  
}
