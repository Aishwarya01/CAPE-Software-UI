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
  isCountryCodeDirty:boolean =false;
  stepBack:any;
  basicLpsIdRetrive:number=0;
  isBasicFormUpdated: boolean =false;
  proceedFlag: boolean = true;
  validationErrorTab: boolean = false;
  validationErrorMsgTab: string="";
  tabError: boolean=false;
  tabErrorMsg: string="";
  availableReportNo: string="";
  constructor(private formBuilder: FormBuilder, 
    private lPSBasicDetailsService: LPSBasicDetailsService,
    private modalService: NgbModal,
    private router: ActivatedRoute,
    public service: GlobalsService,

    ) {
    // this.lPSBasicDetailsService = lPSBasicDetailsService;
  }

  
  ngOnInit(): void {
    this.countryCode = '91';
    this.LPSBasicForm = this.formBuilder.group({
      lpsBasic: this.formBuilder.array([this.allBasicForm()])
    });
  }

  allBasicForm(): FormGroup {
    return new FormGroup({
      clientName: new FormControl('', Validators.required),
      projectName:new FormControl('', Validators.required),
      pmcName:new FormControl('', Validators.required),
      consultantName:new FormControl('', Validators.required),
      contractorName:new FormControl('', Validators.required),
      dealerContractorName:new FormControl('', Validators.required),
      address:new FormControl('', Validators.required),
      location:new FormControl('', Validators.required),
      industryType:new FormControl('', Validators.required),
      soilResistivity:new FormControl(''),
      name:new FormControl('', Validators.required),
      company:new FormControl('', Validators.required),
      designation:new FormControl('', Validators.required),
      contactNumber:new FormControl('',[Validators.required ,Validators.maxLength(10),Validators.minLength(10)]),
      mailId:new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      availabilityOfPreviousReport:new FormControl('', Validators.required),
    });
  }

  createGroup(item: any): FormGroup {
    this.countryCode =item.contactNumber.split("-")[0]
    return this.formBuilder.group({

      clientName: new FormControl({disabled: false, value: item.clientName}, Validators.required),
      projectName: new FormControl({disabled: false, value: item.projectName}, Validators.required),
      pmcName: new FormControl({disabled: false, value: item.pmcName}, Validators.required),
      consultantName: new FormControl({disabled: false, value: item.consultantName}, Validators.required),
      contractorName: new FormControl({disabled: false, value: item.contractorName}, Validators.required),
      dealerContractorName: new FormControl({disabled: false, value: item.dealerContractorName}, Validators.required),
      address: new FormControl({disabled: false, value: item.address}, Validators.required),
      location: new FormControl({disabled: false, value: item.location}, Validators.required),
      industryType: new FormControl({disabled: false, value: item.industryType}, Validators.required),
      soilResistivity: new FormControl({disabled: false, value: item.soilResistivity}),
      name: new FormControl({disabled: false, value: item.name}, Validators.required),
      company: new FormControl({disabled: false, value: item.company}, Validators.required),
      designation: new FormControl({disabled: false, value: item.designation}, Validators.required),
      contactNumber: new FormControl({disabled: false, value: item.contactNumber}),
      mailId: new FormControl({disabled: false, value: item.mailId},
         [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      availabilityOfPreviousReport: new FormControl({disabled: false, value: item.availabilityOfPreviousReport}, Validators.required),
    });
  }

  overAllControl(): AbstractControl[] {
    return(<FormArray>this.LPSBasicForm.get('lpsBasic')).controls;
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
    this.proceedFlag = false;  
     
     if(data.basicLps == undefined){
      this.step1List = data;
     }
     else{
      this.step1List = data.basicLps;
     }
      this.success = true;
      this.basicLpsIdRetrive = this.step1List.basicLpsId;
      this.basicDetails.basicLpsId = this.step1List.basicLpsId;
      this.basicDetails.updatedBy = this.step1List.updatedBy;
      this.basicDetails.updatedDate = this.step1List.updatedDate;
      this.basicDetails.createdBy = this.step1List.createdBy;
      this.basicDetails.createdDate = this.step1List.createdDate;
      this.flag=true
      this.availableReportNo = this.step1List.availabilityOfPreviousReport;
      this.LPSBasicForm = this.formBuilder.group({
        lpsBasic: this.formBuilder.array([this.createGroup(this.step1List)])
      });

    }

    reset(){
      this.LPSBasicForm.reset();
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
          this.isBasicFormUpdated=true;
          this.retriveBasicDetails();
          this.LPSBasicForm.markAsPristine();
          this.isBasicFormUpdated=true;
          this.proceedNext.emit(true);
          this.service.lvClick=0;
          this.service.logoutClick=0;
          this.service.windowTabClick=0;
          this.basicLpsIdRetrive=0;
          
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
          this.proceedFlag = false;
          this.basicDetails.basicLpsId=basicDetailsItr.basicLpsId;
          this.success = true;
          this.successMsg = "Basic Information sucessfully Saved";
          //this.disable = true;
          this.retriveBasicDetails();
          this.LPSBasicForm.markAsPristine();
          this.isBasicFormUpdated=true;
          this.proceedNext.emit(true);
          this.service.lvClick=0;
          this.service.logoutClick=0;
          this.service.windowTabClick=0;
          
        },
        error => {
          this.Error = true;
          this.errorArr = [];
          this.proceedFlag = true;
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
    let contactNum
    if(this.basicLpsIdRetrive !=0){
      this.basicDetails.basicLpsId=this.basicLpsIdRetrive;
        contactNum = "+"+this.countryCode+"-"+this.LPSBasicForm.value.lpsBasic[0].contactNumber.split("-")[1];
    }
    else{
      contactNum = "+"+this.countryCode+"-"+this.LPSBasicForm.value.lpsBasic[0].contactNumber;
    }
    this.basicDetails.clientName = this.LPSBasicForm.value.lpsBasic[0].clientName;
    this.basicDetails.projectName = this.LPSBasicForm.value.lpsBasic[0].projectName;
    this.basicDetails.pmcName = this.LPSBasicForm.value.lpsBasic[0].pmcName;
    this.basicDetails.consultantName = this.LPSBasicForm.value.lpsBasic[0].consultantName;
    this.basicDetails.contractorName = this.LPSBasicForm.value.lpsBasic[0].contractorName;
    this.basicDetails.dealerContractorName = this.LPSBasicForm.value.lpsBasic[0].dealerContractorName;
    this.basicDetails.address = this.LPSBasicForm.value.lpsBasic[0].address;
    this.basicDetails.location = this.LPSBasicForm.value.lpsBasic[0].location;
    this.basicDetails.industryType = this.LPSBasicForm.value.lpsBasic[0].industryType;
    this.basicDetails.soilResistivity = this.LPSBasicForm.value.lpsBasic[0].soilResistivity;
    this.basicDetails.name = this.LPSBasicForm.value.lpsBasic[0].name;
    this.basicDetails.company = this.LPSBasicForm.value.lpsBasic[0].company;
    this.basicDetails.designation = this.LPSBasicForm.value.lpsBasic[0].designation;
    this.basicDetails.contactNumber = contactNum;
    this.basicDetails.mailId = this.LPSBasicForm.value.lpsBasic[0].mailId;
    this.basicDetails.availabilityOfPreviousReport = this.LPSBasicForm.value.lpsBasic[0].availabilityOfPreviousReport;
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
    this.proceedFlag = false;
    this.lPSBasicDetailsService.retriveLpsbasicDetails(this.router.snapshot.paramMap.get('email') || '{}',this.basicDetails.basicLpsId).subscribe(
      data => {
        let basic=JSON.parse(data)[0];
        if(basic !=undefined && basic.basicLpsId !=null){
        this.retrieveDetailsfromSavedReports('',basic);
        }
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

  countryChange(country: any) {
    this.isCountryCodeDirty=true;
    this.countryCode = country.dialCode;
    this.LPSBasicForm.markAsDirty();
    this.LPSBasicForm.markAsTouched();
  }

  gotoNextTab() {
    if (this.LPSBasicForm.dirty && this.LPSBasicForm.invalid) {
      this.service.isCompleted = false;
      this.service.isLinear = true;
      this.service.editable = false;
      this.validationError = false;
      this.validationErrorTab = true;
      this.validationErrorMsgTab = 'Please check all the fields in basic information';
      setTimeout(() => {
        this.validationErrorTab = false;
      }, 3000);
      return;
    }
    else if (this.LPSBasicForm.dirty && this.LPSBasicForm.touched) {
      this.service.isCompleted = false;
      this.service.isLinear = true;
      this.service.editable = false;
      this.tabError = true;
      this.tabErrorMsg = 'Kindly click on next button to update the changes!';
      setTimeout(() => {
        this.tabError = false;
      }, 3000);
      return;
    }
    else {
      this.service.isCompleted = true;
      this.service.isLinear = false;
      this.service.editable = true;
    }
  }
}
