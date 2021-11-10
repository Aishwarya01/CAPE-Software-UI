import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BasicDetails, BasicLpsDescription } from 'src/app/LPS_model/basic-details';
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
  submitted=false;

  constructor(private formBuilder: FormBuilder, lPSBasicDetailsService: LPSBasicDetailsService) {
    this.lPSBasicDetailsService = lPSBasicDetailsService;
  }

  
  ngOnInit(): void {
    
    this.LPSBasicForm = this.formBuilder.group({
      clientName: ['', Validators.required],
      userName: ['', Validators.required],
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
 
  onSubmit() {
    this.submitted=true;
    // if (this.LPSBasicForm.invalid) {
    //   return;
    // }
    this.basicDetails.basicLpsDescription = this.LPSBasicForm.value.basicLpsDescription;
    this.lPSBasicDetailsService.saveLPSBasicDetails(this.basicDetails).subscribe(
    
      data => {
         
      
      },
      error => {
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
