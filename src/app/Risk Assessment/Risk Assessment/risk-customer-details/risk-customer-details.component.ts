import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalsService } from 'src/app/globals.service';
import { CustomerDetails } from '../../Risk Assesment Model/customer-details';
import { CustomerDetailsServiceService } from '../../Risk Assessment Services/customer-details-service.service';
import { RiskglobalserviceService } from '../../riskglobalservice.service';

@Component({
  selector: 'app-risk-customer-details',
  templateUrl: './risk-customer-details.component.html',
  styleUrls: ['./risk-customer-details.component.css']
})
export class RiskCustomerDetailsComponent implements OnInit {
  
  CustomerDetailsForm!: FormGroup;
  customerDetailsModel = new CustomerDetails;
  submitted!: boolean;
  flag: boolean = false;
  validationError: boolean = false;
  success: boolean=false;
  successMsg: string="";
  disable: boolean=false;
  Error: boolean=false;
  errorArr: any=[];
  errorMsg: string="";
  isEditable!:boolean
  success1: boolean =false;
  successMsg1: string="";
  proceedFlag: boolean = true;
  @Output() proceedNext = new EventEmitter<any>();
  validationErrorMsg: string='';
  popup: boolean = false;
  customerList: any=[];
  countryCode: any;
  isRiskFormUpdated: boolean=false;
  isCustomerForm: boolean=false;
  validationErrorTab: boolean = false;
  validationErrorMsgTab: string="";
  tabError: boolean=false;
  tabErrorMsg: string="";
  isCustomerFormUpdated: boolean =false;

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private modalService: NgbModal,
    private customerDetailsService :CustomerDetailsServiceService,
    public service: GlobalsService,
    public riskGlobal: RiskglobalserviceService
  ) {}

  ngOnInit(): void {
    this.countryCode = '91';
    this.CustomerDetailsForm = this.formBuilder.group({
      riskCustomerDetails: this.formBuilder.array([this.customerDetails()])
    });
  }

  customerDetails(): FormGroup{
    return new FormGroup({
      organisationName: new FormControl('', Validators.required),
      address:new FormControl('', Validators.required),
      projectName:new FormControl('', Validators.required),
      projectDescription:new FormControl('', Validators.required),
      contactPersonName:new FormControl('', Validators.required),
      contactNumber:new FormControl('', [Validators.maxLength(10), Validators.minLength(10)]),
      email:new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      preparedBy:new FormControl('', Validators.required),
      verifiedBy:new FormControl('', Validators.required),
    });
  }

  createCustomerDetails(item: any): FormGroup {
    return this.formBuilder.group({
      organisationName: new FormControl({disabled: false, value: item.organisationName}, Validators.required),
      address:new FormControl({disabled: false, value: item.address}, Validators.required),
      projectName:new FormControl({disabled: false, value: item.projectName}, Validators.required),
      projectDescription:new FormControl({disabled: false, value: item.projectDescription}, Validators.required),
      contactPersonName:new FormControl({disabled: false, value: item.contactPersonName}, Validators.required),
      contactNumber:new FormControl({disabled: false, value: item.contactNumber}),
      email:new FormControl({disabled: false, value: item.email},[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      preparedBy:new FormControl({disabled: false, value: item.preparedBy}, Validators.required),
      verifiedBy:new FormControl({disabled: false, value: item.verifiedBy}, Validators.required),
    });
  }

  retriveCustomerDetails(){
    this.proceedFlag = false;
    this.customerDetailsService.retriveCustomerDetails1(this.router.snapshot.paramMap.get('email') || '{}',this.customerDetailsModel.riskId).subscribe(
      data => {
        let customerdetails=JSON.parse(data)[0];
        if(customerdetails !=undefined && customerdetails.riskId !=null && customerdetails.riskId != undefined){
        this.updateCustomerDetails(customerdetails);
        }
      },
      error=>{
      }
    );  
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

  updateCustomerDetails(data:any){
    this.proceedFlag = false;  
    
     if(data.customerDetails == undefined ){
      this.customerList = data;
     }
     else{
      this.customerList = data.customerDetails;
     }
      // this.success = true;
      this.riskGlobal.riskId=this.customerList.riskId;
      this.riskGlobal.projectName = this.customerList.projectName;
      this.customerDetailsModel.riskId = this.customerList.riskId;
      this.customerDetailsModel.updatedBy = this.customerList.updatedBy;
      this.customerDetailsModel.updatedDate = this.customerList.updatedDate;
      this.customerDetailsModel.createdBy = this.customerList.createdBy;
      this.customerDetailsModel.createdDate = this.customerList.createdDate;
      this.flag=true;
      this.CustomerDetailsForm = this.formBuilder.group({
        riskCustomerDetails: this.formBuilder.array([this.createCustomerDetails(this.customerList)])
      });
  }

   //  country code
  countryChange(country: any) {
    this.countryCode = country.dialCode;
  }

  onChangeForm(event:any){
    if(!this.CustomerDetailsForm.invalid){
      if(this.CustomerDetailsForm.dirty){
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
   if(!this.CustomerDetailsForm.invalid){ 
    if(this.CustomerDetailsForm.dirty){
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

  overAllControl(): AbstractControl[] {
    return(<FormArray>this.CustomerDetailsForm.get('riskCustomerDetails')).controls;
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
    if (this.CustomerDetailsForm.invalid) {
      this.validationError = true;
      this.validationErrorMsg = 'Please check all the fields';
      setTimeout(() => {
        this.validationError = false;
      }, 3000);
      return;
    }
    
    //  Update and Success msg will be showing
    if(this.CustomerDetailsForm.dirty && this.CustomerDetailsForm.touched){
      this.modalService.open(content, { centered: true,backdrop: 'static' });
    }
    //  For Dirty popup
    else{
      this.modalService.open(contents, { centered: true,backdrop: 'static' });
    }   
  }

  onSubmit(flag:any) {
    this.submitted=true;
      if (this.CustomerDetailsForm.invalid) {
        return;
      }
    //  this.spinner = true;
     this.popup=false;
     this.customerDetailsModel.userName = this.router.snapshot.paramMap.get('email') || '{}'; 
     this.customerDetailsModel.organisationName=this.CustomerDetailsForm.value.riskCustomerDetails[0].organisationName;
     this.customerDetailsModel.address=this.CustomerDetailsForm.value.riskCustomerDetails[0].address;
     this.customerDetailsModel.projectName=this.CustomerDetailsForm.value.riskCustomerDetails[0].projectName;
     this.customerDetailsModel.projectDescription=this.CustomerDetailsForm.value.riskCustomerDetails[0].projectDescription;
     this.customerDetailsModel.contactPersonName=this.CustomerDetailsForm.value.riskCustomerDetails[0].contactPersonName;
     this.customerDetailsModel.contactNumber=this.CustomerDetailsForm.value.riskCustomerDetails[0].contactNumber ? this.CustomerDetailsForm.value.riskCustomerDetails[0].contactNumber: "";
     this.customerDetailsModel.email=this.CustomerDetailsForm.value.riskCustomerDetails[0].email;
     this.customerDetailsModel.preparedBy=this.CustomerDetailsForm.value.riskCustomerDetails[0].preparedBy;
     this.customerDetailsModel.verifiedBy=this.CustomerDetailsForm.value.riskCustomerDetails[0].verifiedBy;
    if (!this.validationError) {
    if(flag) {
        
      if(this.CustomerDetailsForm.dirty && this.CustomerDetailsForm.touched){ 
          this.customerDetailsService.updateCustomerDetails(this.customerDetailsModel).subscribe(
          data => {
            // update success msg
            this.popup=true;
            this.success1 = false;
            this.isCustomerFormUpdated=true;
            this.success=true;
            this.successMsg=data;
            this.retriveCustomerDetails();
            this.CustomerDetailsForm.markAsPristine();
            this.proceedNext.emit(true);
            
          },
            // update failed msg
          error => {
             this.popup=true;
            //  this.spinner=false;
            this.success1 = false;
            this.Error = true;
            this.errorArr = [];
            this.errorArr = JSON.parse(error.error);
            this.errorMsg = this.errorArr.message;
            this.proceedNext.emit(false);
          }
        )}
        else{
           this.popup=true;
          //  this.spinner=false;
          // Preview fields
          if(this.isEditable){
             this.success = true;
             this.proceedNext.emit(true);
          }

          else{
             this.popup=true;
            //  this.spinner=false;
            // Dirty checking here
             this.success = true;
             this.proceedNext.emit(true);
          }
        }
    }
    else {
      this.customerDetailsService.addCustomerDetails(this.customerDetailsModel).subscribe(
        data => {
          this.popup=true;
          let customerRiskItr=JSON.parse(data);              
          this.proceedFlag = false;
          this.customerDetailsModel.riskId=customerRiskItr.riskId;
          this.success=true;
          // this.updateCustomerDetails(JSON.parse(data),this.customerDetailsModel.riskId);
          this.successMsg = "Customer Details Successfully Saved";
          this.retriveCustomerDetails();
          this.isCustomerFormUpdated=true;
          this.disable = true;
          this.CustomerDetailsForm.markAsPristine();
          this.proceedNext.emit(true);
          this.riskGlobal.riskId=JSON.parse(data).riskId;
          this.riskGlobal.projectName=JSON.parse(data).projectName;

        },
        error => {
           this.popup=true;
          //  this.spinner=false;
          this.Error = true;
          this.errorArr = [];
          this.proceedFlag = true;
          this.errorArr = JSON.parse(error.error);
          this.errorMsg = this.errorArr.message;
          this.proceedNext.emit(false); 
        })
      }
    }
  }
  
  gotoNextTab() {
    if (this.CustomerDetailsForm.dirty && this.CustomerDetailsForm.invalid) {
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
    else if (this.CustomerDetailsForm.dirty && this.CustomerDetailsForm.touched) {
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
