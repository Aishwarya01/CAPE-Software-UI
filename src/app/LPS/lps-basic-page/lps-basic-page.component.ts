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
  basicLpsDescription = new BasicLpsDescription;
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
      approvedDrawingRemarks: ['', Validators.required],
      architectNameObserv: ['', Validators.required],
      architectNameRemarks: ['', Validators.required],
      designDateObserv: ['', Validators.required],
      designDateRemarks: ['', Validators.required],
      approvedByObserv: ['', Validators.required],
      approvedByRemarks: ['', Validators.required],
      dateOfApprovalOb: ['', Validators.required],
      dateOfApprovalRem: ['', Validators.required],
      drawingObserv: ['', Validators.required],
      drawingRemarks: ['', Validators.required],
      revisionNoObserv: ['', Validators.required],
      revisionNoRemarks: ['', Validators.required],
      deviationObserv: ['', Validators.required],
      deviationRemarks: ['', Validators.required],
      installationQualityObserv: ['', Validators.required],
      installationQualityRemarks: ['', Validators.required]
    });
  }
 
  onSubmit() {
    this.submitted=true;
    this.lPSBasicDetailsService.saveLPSBasicDetails(this.LPSBasicForm.value).subscribe(

      data => {
         
      
      },
      error => {
      }
    )
  }

  getDescriptionControl(): AbstractControl[] {
    return (<FormArray>this.LPSBasicForm.get('basicLpsDescription')).controls;
  }
  get f() {
    return this.LPSBasicForm.controls;
  }
  
}
