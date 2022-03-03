import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalsService } from 'src/app/globals.service';

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
  countryCode: String = '';
  stepBack:any;
  basicLpsIdRetrive:number=0;
  isBasicFormUpdated: boolean =false;

  constructor(private formBuilder: FormBuilder, 
    private lPSBasicDetailsService: LPSBasicDetailsService,
    private modalService: NgbModal,
    private router: ActivatedRoute,
    public service: GlobalsService,

    ) {
    // this.lPSBasicDetailsService = lPSBasicDetailsService;
  }

  
  ngOnInit(): void {
    
    this.LPSBasicForm = this.formBuilder.group({
     
      clientName: ['', Validators.required],
      projectName: ['', Validators.required],
      pmcName: ['', Validators.required],
      consultantName: ['', Validators.required],
      contractorName: ['', Validators.required],
      dealerContractorName: ['', Validators.required],
      address: ['', Validators.required],
      location: ['', Validators.required],
      industryType: ['', Validators.required],
      soilResistivity: [''],
      name: ['', Validators.required],
      company: ['', Validators.required],
      designation: ['', Validators.required],
      contactNumber: ['',[Validators.required ,Validators.maxLength(10),Validators.minLength(10)]],
      mailId: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      availabilityOfPreviousReport: ['', Validators.required],
    });

  }

    // Only Accept numbers
    keyPressNumbers(event:any) {
      var charCode = (event.which) ? event.which : event.keyCode;
      // Only Numbers 0-9
      if ((charCode < 48 || charCode > 57)) {
        event.preventDefault();
        return false;
      } else {
        return true;
      }
    }

  retrieveDetailsfromSavedReports(basicLpsId: any,data: any){
    //this.service.lvClick=1;
  
     this.step1List = data.basicLps;
    //  if(this.step1List.clientName != null){
      this.success = true;
      this.basicLpsIdRetrive = basicLpsId;
      this.basicDetails.basicLpsId = basicLpsId;
      this.basicDetails.clientName = this.step1List.clientName;
      this.basicDetails.projectName = this.step1List.projectName;
      this.basicDetails.pmcName = this.step1List.pmcName;
      this.basicDetails.address = this.step1List.address;
      this.basicDetails.consultantName = this.step1List.consultantName;
      this.basicDetails.contractorName = this.step1List.contractorName;
      this.basicDetails.createdBy = this.step1List.createdBy;
      this.basicDetails.createdDate = this.step1List.createdDate;
      this.basicDetails.dealerContractorName = this.step1List.dealerContractorName;
      this.basicDetails.industryType = this.step1List.industryType;
      this.basicDetails.location = this.step1List.location;
      this.basicDetails.soilResistivity = this.step1List.soilResistivity;
      this.basicDetails.userName = this.step1List.userName;
      this.basicDetails.allStepsCompleted = this.step1List.allStepsCompleted;
      this.basicDetails.name = this.step1List.name;
      this.basicDetails.company = this.step1List.company;
      this.basicDetails.designation = this.step1List.designation;
      this.basicDetails.contactNumber = this.step1List.contactNumber;
      this.basicDetails.mailId = this.step1List.mailId;
      this.basicDetails.availabilityOfPreviousReport = this.step1List.availabilityOfPreviousReport;
      this.basicDetails.updatedBy = this.step1List.updatedBy;
      this.basicDetails.updatedDate = this.step1List.updatedDate;
      this.flag=true
    }

    reset(){
      this.LPSBasicForm.reset();
    }

    retrieveDetailsfromSavedReports1(userName: any,basicLpsId: any,clientName: any,data: any){
      //this.service.lvClick=1;

      this.stepBack=JSON.parse(data);
      this.basicLpsIdRetrive = basicLpsId;
      this.basicDetails.clientName = this.stepBack[0].clientName;
      this.basicDetails.projectName = this.stepBack[0].projectName;
      this.basicDetails.pmcName = this.stepBack[0].pmcName;
      this.basicDetails.address = this.stepBack[0].address;
      this.basicDetails.consultantName = this.stepBack[0].consultantName;
      this.basicDetails.contractorName = this.stepBack[0].contractorName;
      this.basicDetails.createdBy = this.stepBack[0].createdBy;
      this.basicDetails.createdDate = this.stepBack[0].createdDate;
      this.basicDetails.dealerContractorName = this.stepBack[0].dealerContractorName;
      this.basicDetails.industryType = this.stepBack[0].industryType;
      this.basicDetails.location = this.stepBack[0].location;
      this.basicDetails.soilResistivity = this.stepBack[0].soilResistivity;
      this.basicDetails.userName = this.stepBack[0].userName;
      this.basicDetails.allStepsCompleted = this.stepBack[0].allStepsCompleted;
      this.basicDetails.name = this.stepBack[0].name;
      this.basicDetails.company = this.stepBack[0].company;
      this.basicDetails.designation = this.stepBack[0].designation;
      this.basicDetails.contactNumber = this.stepBack[0].contactNumber;
      this.basicDetails.mailId = this.stepBack[0].mailId;
      this.basicDetails.availabilityOfPreviousReport = this.stepBack[0].availabilityOfPreviousReport;
      this.basicDetails.updatedBy = this.stepBack[0].updatedBy;
      this.basicDetails.updatedDate = this.stepBack[0].updatedDate;
      this.flag=true
     this.LPSBasicForm.markAsPristine();
     }
  
  
  onChangeForm(event:any){
    if(!this.LPSBasicForm.invalid){
      if(this.LPSBasicForm.dirty){
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
   if(!this.LPSBasicForm.invalid){ 
    if(this.LPSBasicForm.dirty){
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
  doBeforeUnload() {
    if(this.service.allStepsCompleted==true){
      if(this.service.logoutClick==1 && this.service.windowTabClick==0) {
        return true;
       }
       else if(this.service.logoutClick==0 && this.service.windowTabClick==0){
        return true;
       }
       else{
        window.location.reload(); 
        // Alert the user window is closing 
        return false;
       }
      }
      else{
        return true;
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

  gotoNextModal(content: any,contents: any) {
    
     if (this.LPSBasicForm.invalid) {
       this.validationError = true;
      
       this.validationErrorMsg = 'Please check all the fields';
       setTimeout(() => {
        this.validationError = false;
       }, 3000);
       return;
     }
     
    //  Update and Success msg will be showing
     if(this.LPSBasicForm.dirty && this.LPSBasicForm.touched){
        this.modalService.open(content, { centered: true,backdrop: 'static' });
     }
    //  For Dirty popup
     else{
      this.modalService.open(contents, { centered: true,backdrop: 'static' });
     }
     
  }
 
  onSubmit(flag: any) {
    this.submitted=true;
     if (this.LPSBasicForm.invalid) {
       return;
     }
     
    if (!this.validationError) {
    if(flag) {
        
      if(this.LPSBasicForm.dirty && this.LPSBasicForm.touched){ 
      this.lPSBasicDetailsService.updateLpsBasicDetails(this.getBasicDetailsObject()).subscribe(
        data => {
          // update success msg
          this.success1 = false;
          this.success = true;
          this.successMsg = data;
          this.retriveBasicDetails();
          this.LPSBasicForm.markAsPristine();
          this.proceedNext.emit(true);
          this.service.lvClick=0;
          this.service.logoutClick=0;
          this.service.windowTabClick=0;
          this.basicLpsIdRetrive=0;
          this.isBasicFormUpdated=true;
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
        
        // Preview fields
        if(this.isEditable){
          this.success = true;
          this.proceedNext.emit(true);
        }

        else{
          // Dirty checking here
          this.success = true;
          this.proceedNext.emit(true);
        }
      }
      
    }
    else {
      this.lPSBasicDetailsService.saveLPSBasicDetails(this.getBasicDetailsObject()).subscribe(
    
        data => {
          let basicDetailsItr=JSON.parse(data);              
          
          this.basicDetails.basicLpsId=basicDetailsItr.basicLpsId;
          this.success = true;
          this.successMsg = "Basic Information sucessfully Saved";
          //this.disable = true;
          this.retriveBasicDetails();
          this.LPSBasicForm.markAsPristine();
          this.proceedNext.emit(true);
          this.service.lvClick=0;
          this.service.logoutClick=0;
          this.service.windowTabClick=0;
          this.isBasicFormUpdated=true;
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
  }
    //(this.basicDetails);
  }

  getBasicDetailsObject(){
    if(this.basicLpsIdRetrive !=0){
      this.basicDetails.basicLpsId=this.basicLpsIdRetrive;
    }
    this.basicDetails.clientName = this.LPSBasicForm.value.clientName;
    this.basicDetails.projectName = this.LPSBasicForm.value.projectName;
    this.basicDetails.pmcName = this.LPSBasicForm.value.pmcName;
    this.basicDetails.consultantName = this.LPSBasicForm.value.consultantName;
    this.basicDetails.contractorName = this.LPSBasicForm.value.contractorName;
    this.basicDetails.dealerContractorName = this.LPSBasicForm.value.dealerContractorName;
    this.basicDetails.address = this.LPSBasicForm.value.address;
    this.basicDetails.location = this.LPSBasicForm.value.location;
    this.basicDetails.industryType = this.LPSBasicForm.value.industryType;
    this.basicDetails.soilResistivity = this.LPSBasicForm.value.soilResistivity;
    this.basicDetails.name = this.LPSBasicForm.value.name;
    this.basicDetails.company = this.LPSBasicForm.value.company;
    this.basicDetails.designation = this.LPSBasicForm.value.designation;
    this.basicDetails.contactNumber = this.LPSBasicForm.value.contactNumber;
    this.basicDetails.mailId = this.LPSBasicForm.value.mailId;
    this.basicDetails.availabilityOfPreviousReport = this.LPSBasicForm.value.availabilityOfPreviousReport;
    this.basicDetails.userName=this.router.snapshot.paramMap.get('email') || '{}';

    return this.basicDetails;
  }


  // getDescriptionControl(): AbstractControl[] {
  //   return (<FormArray>this.LPSBasicForm.get('basicLpsDescription')).controls;
  // }
  
  get f() {
    return this.LPSBasicForm.controls;
  }

  retriveBasicDetails(){
    this.lPSBasicDetailsService.retriveLpsbasicDetails(this.router.snapshot.paramMap.get('email') || '{}',this.basicDetails.basicLpsId).subscribe(
      data => {
        this.retrieveDetailsfromSavedReports1(this.basicDetails.userName,this.basicDetails.basicLpsId,this.basicDetails.clientName,data);
      },
      error=>{
      }
    );  
  }

// Only Integer
 NumberskeyPressNumbers(event:any)
  {var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {event.preventDefault();return false;} else {return true;}} 

countryChange(country: any) {this.countryCode = country.dialCode;}


  
}
