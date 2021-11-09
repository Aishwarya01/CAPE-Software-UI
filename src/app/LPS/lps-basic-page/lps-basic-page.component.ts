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

    this.basicDetails.clientName = this.LPSBasicForm.value.clientName;
    this.basicDetails.userName = this.LPSBasicForm.value.userName;
    this.basicDetails.projectName = this.LPSBasicForm.value.projectName;
    this.basicDetails.pmcName = this.LPSBasicForm.value.pmcName;
    this.basicDetails.consultantName = this.LPSBasicForm.value.consultantName;
    this.basicDetails.contractorName = this.LPSBasicForm.value.contractorName;
    this.basicDetails.address = this.LPSBasicForm.value.address;
    this.basicDetails.location = this.LPSBasicForm.value.location;
    this.basicDetails.installationContractor = this.LPSBasicForm.value.installationContractor;
    this.basicDetails.industryType = this.LPSBasicForm.value.industryType;
    this.basicDetails.buildingType = this.LPSBasicForm.value.buildingType;
    this.basicDetails.buildingLength = this.LPSBasicForm.value.buildingLength;
    this.basicDetails.buildingHeight = this.LPSBasicForm.value.buildingHeight;
    this.basicDetails.levelOfProtection = this.LPSBasicForm.value.levelOfProtection;
    this.basicDetails.soilResistivity = this.LPSBasicForm.value.soilResistivity;
    this.basicDetails.dealerContractorName = this.LPSBasicForm.value.dealerContractorName;
    this.basicDetails.buildingWidth = this.LPSBasicForm.value.buildingWidth;
    
    this.basicDetails.basicLpsDescription = this.LPSBasicForm.value.basicLpsDescription;
    console.log(this.basicDetails);
    
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
