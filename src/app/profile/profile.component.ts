import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ChangeContact } from '../model/change-contact';
import { Register } from '../model/register';
import { User } from '../model/user';
import { ApplicationTypeService } from '../services/application.service';
import { InspectorregisterService } from '../services/inspectorregister.service';
import { ProfileService } from '../services/profile.service';
import { SiteService } from '../services/site.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    contactNumber: new FormControl(''),
    userType: new FormControl(''),
    companyName: new FormControl(''),
    department: new FormControl(''),
    designation: new FormControl(''),
    country: new FormControl(''),
    state: new FormControl(''),
    district: new FormControl(''),
    address: new FormControl(''),
    applicationType: new FormControl(''),
    pinCode: new FormControl(''),
  });

  generateContactNumberOtpForm = new FormGroup({
    mobileNumber: new FormControl(''),
  });

  changeContactNumberForm = new FormGroup({
    emailId: new FormControl(''),
    mobileNumber: new FormControl(''),
    otpValue: new FormControl('')
  });

  loading = false;
  submitted = false;
  register = new Register();
  msg = "";
  email: String = '';
  ErrorMsg: any;
  errorArr: any=[];
  alert: any;
  countryList: any = [];
  stateList: any= [];
  selected: any;
  applicationTypeData: any="";
  successMsgOTP: boolean=false;
  errorMsg: any;
  errorMsgflag: boolean=false;
  successMsg: string="";
  isEnabled: boolean = false;
  isChecked: boolean = false;
  countryCode: String = '';
  contactNumber: string = '';
  disableValue: boolean = true;

  dropdownList:any = [];
  selectedItems:any = [];
  //dropdownSettings:any = {};
  dropdownSettings!:IDropdownSettings;
  mobileArr: any = [];


  //mobile number page
  mobileLoading: boolean = false;
  mobileSubmitted: boolean = false;
  mobileShowErrorMessage: boolean = false;
  mobileErrorMsg: String ="";
  mobileCountryCode: String = '';
  contactNumber1: String = '';
  mobileSuccessMsgOTP: boolean = false;
  mobileSuccessMsg: string = '';
  changeContact = new ChangeContact;


  //otp page
  formInput = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6'];
  @ViewChildren('formRow') rows: any;
  showErrorMessage: boolean= false;
  showOTPMessage: boolean= false;
  showOTPValidation: boolean= false;
  OTPerrorMsgflag: boolean= false;
  OTPerrorMsg: String = '';
  SubmitSuccessMsg: boolean= false;
  otp: String = '';
  otpLoading = false;
  otpSubmitted = false;
  sessionKey!: any;
  contactNo!: any;


  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private route: Router,
    private profileService: ProfileService,
    private siteService: SiteService,
    private applicationService: ApplicationTypeService,
    private modalService: NgbModal,
    private inspectorRegisterService: InspectorregisterService
    ) {
      this.changeContactNumberForm = this.toFormGroup(this.formInput);
      this.register.username=this.router.snapshot.paramMap.get('email') || '{}'
      this.email = this.register.username;        
    }

  ngOnInit() {
    this.countryCode = '91';
    this.mobileArr = [];
    this.profileService.getUser(this.register.username).subscribe(
      data =>{ this.register= JSON.parse(data);
      if(this.register.applicationType != null) {
        this.selectedItems = this.register.applicationType.split(',');
      }
      this.mobileArr= this.register.contactNumber.split('-');
      setTimeout(()=>{
        this.populateForm();
      }, 3000);
      }
    )
    this.applicationService.retrieveApplicationTypesV2().subscribe(
      data => {
        this.dropdownList = data;
      }     
    );

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'code',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    
      // this.profileForm = this.formBuilder.group({
      //   name: [this.register.name, Validators.required],
      //   email: [this.register.username],
      //   contactNumber: [this.mobileArr[1], Validators.required],
      //   userType: [this.register.role],
      //   companyName: [this.register.companyName],
      //   department: [this.register.department],
      //   designation: [this.register.designation],
      //   country: [this.register.country, Validators.required],
      //   state: [this.register.state, Validators.required],
      //   district: [this.register.district],
      //   address: [this.register.address, Validators.required],
      //   applicationType: [this.selectedItems],
      //   pinCode: [this.register.pinCode, Validators.required],
      // });     

    this.generateContactNumberOtpForm = this.formBuilder.group({
      mobileNumber: ['',[Validators.maxLength(10),Validators.required]]
    });

  this.changeContactNumberForm = this.formBuilder.group({
    emailId: [this.changeContact.email, [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    mobileNumber: [this.changeContact.mobileNumber, Validators.required],
    // confirmpassword: ['', Validators.required],
    input1:[''],
    input2:[''],
    input3:[''],
    input4:[''],
    input5:[''],
    input6:['']
    });
    
  }

  config = {
    allowNumbersOnly: false,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '40px'
    }
    };

  toFormGroup(elements:any) {
    const group: any = {};

    elements.forEach((key:any) => {
      group[key] = new FormControl('', Validators.required);
    });
    return new FormGroup(group);
  }
  keyUpEvent(event:any, index:any) {
    let pos = index;
    if (event.keyCode === 8 && event.which === 8) {
      pos = index - 1 ;
    } else {
      pos = index + 1 ;
    }
    // if (pos > -1 && pos < this.formInput.length ) {
    //   this.rows._results[pos].nativeElement.focus();
    // }

  }
  onOtpChange(otp:any) {
    this.otp = otp;
  }

  onItemSelect(e: any) {

  }

  populateForm() {
    this.profileForm = this.formBuilder.group({
      name: [this.register.name, Validators.required],
      email: [this.register.username],
      contactNumber: [this.mobileArr[1], Validators.required],
      userType: [this.register.role],
      companyName: [this.register.companyName],
      department: [this.register.department],
      designation: [this.register.designation],
      country: [this.register.country, Validators.required],
      state: [this.register.state, Validators.required],
      district: [this.register.district],
      address: [this.register.address, Validators.required],
      applicationType: [this.selectedItems],
      pinCode: [this.register.pinCode, Validators.required],
    });
  }

  generateForm() {
    this.changeContactNumberForm.value.emailId = this.changeContact.email;
    this.changeContactNumberForm.value.mobileNumber = this.changeContact.mobileNumber;

    this.changeContactNumberForm = this.formBuilder.group({
      emailId: [this.changeContact.email, [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      mobileNumber: [this.changeContact.mobileNumber, Validators.required],
      // confirmpassword: ['', Validators.required],
      input1:[''],
      input2:[''],
      input3:[''],
      input4:[''],
      input5:[''],
      input6:['']
  });
  }
  

  selectCountry(e: any) {
    let changedValue = e.target.value;
    this.stateList = [];
      // for(let arr of this.countryList) {
      //   if( arr.name == changedValue) {
      //     this.siteService.retrieveState(arr.code).subscribe(
      //       data => {
      //         this.stateList = JSON.parse(data)
      //       }
      //     )};
      // }
      if(changedValue == "IND") {
        this.siteService.retrieveStateV2(changedValue).subscribe(
          data => {
            this.stateList = JSON.parse(data)
          }
        );
      }
       
  }

  openModal(contentViewer: any) {
    this.modalService.open(contentViewer,{size: 'md', backdrop: 'static' })
  }

  countryChange(country: any) {
    this.countryCode = country.dialCode;
  }

  get f() {
    return this.profileForm.controls;
  }

  get g() {
    return this.generateContactNumberOtpForm.controls;
  }

  get h() {
    return this.changeContactNumberForm.controls;
  }

  //profile
  onSubmit() {
    this.submitted = true;

    //Breaks if form is invalid
    if(this.profileForm.invalid) {
      return;
    }
    this.loading = true;
    this.contactNumber = "";
    this.contactNumber = "+"+this.countryCode+"-"+this.profileForm.value.contactNumber

    this.register.contactNumber = this.contactNumber;

    this.profileService.updateRegister(this.register).subscribe(
      data=> {
        this.successMsgOTP=true;
        this.successMsg="You have successfully updated profile"
        setTimeout(()=>{
          this.successMsgOTP=false;
          this.successMsg="";
        }, 3000);
        // setTimeout(()=>{
        //   this.router.navigate(['/createPassword', {email: this.register.username}])
        // }, 5000);
      },
      error => {
        this.loading= false;
        this.errorMsgflag=true;
        this.errorArr = JSON.parse(error.error)
        this.errorMsg=this.errorArr.message;
        setTimeout(()=>{
          this.errorMsgflag=false;
          this.errorMsg=" ";
        }, 3000);
      }
    )
  
  }
  
  cancel(contentViewer: any) {
    this.modalService.dismissAll();
  }
  cancelOTP() {
    this.modalService.dismissAll();
  }

  resendOTP(){
    this.inspectorRegisterService.resendOTPInspector(this.changeContact.mobileNumber).subscribe(
      data=> {
       this.showOTPMessage=true;
       setTimeout(()=>{
        this.showOTPMessage=false;
      }, 3000);
      this.changeContact.otpSession = data;

      },
      error => {
      
      }
      ) 
  }

  //generate OTP
  onContactSubmit(contentViewer1: any) {

    this.mobileSubmitted=true;
    
    //Breaks if form is invalid
    if(this.generateContactNumberOtpForm.invalid) {
      return;
    }

    this.mobileLoading=true;
    this.contactNumber1 = "";
    this.contactNumber1 = "+"+this.countryCode+"-"+this.generateContactNumberOtpForm.value.mobileNumber
    this.inspectorRegisterService.sendOtpContactNumber(this.email,this.contactNumber1).subscribe(
      data=> { 
        this.mobileSuccessMsgOTP=true;
        this.mobileSuccessMsg="OTP has been successfully sent to your mobile number";
        this.changeContact.mobileNumber = this.contactNumber1;
        this.changeContact.email = this.email;
        this.changeContact.otpSession = data;
        // sessionStorage.setItem('changeNumberSession', data);
        // sessionStorage.setItem('changeNumber', this.contactNumber);

        setTimeout(()=>{
          this.mobileSuccessMsgOTP=false;
          this.mobileSuccessMsg="";
          this.generateForm();
        }, 3000);
        setTimeout(()=>{
          this.modalService.open(contentViewer1,{size: 'md', backdrop: 'static' })
        }, 5000);
      },
      error => {
        let errorArr = JSON.parse(error.error);
        this.mobileLoading=false;
        this.mobileShowErrorMessage=true;
        this.mobileErrorMsg =errorArr.message;
        setTimeout(()=>{
          this.mobileShowErrorMessage=false;
          this.mobileErrorMsg = "";
        }, 3000);
      }
    )
  }

  //OTP
  onOtpSubmit() {
    this.otpSubmitted=true;
    if((this.changeContactNumberForm.value.input1 == "") || (this.changeContactNumberForm.value.input2 == "") || (this.changeContactNumberForm.value.input3 == "") ||
     (this.changeContactNumberForm.value.input4 == "") || (this.changeContactNumberForm.value.input5 == "") || (this.changeContactNumberForm.value.input6 == "")) {
      this.showOTPValidation=true;
      setTimeout(()=>{
        this.showOTPValidation=false;
      }, 3000);
      return;
    }

    //Breaks if form is invalid
    if(this.changeContactNumberForm.invalid) {  
      return;
    }
    this.otp= this.changeContactNumberForm.value.input1+this.changeContactNumberForm.value.input2+this.changeContactNumberForm.value.input3+this.changeContactNumberForm.value.input4
    +this.changeContactNumberForm.value.input5+this.changeContactNumberForm.value.input6;
    this.changeContact.otp= this.otp;
    this.changeContact.email=this.changeContactNumberForm.value.emailId;
    

    this.inspectorRegisterService.createContactNo(this.changeContact).subscribe(
      data=> {
        this.SubmitSuccessMsg=true;
        this.ngOnInit();
        setTimeout(()=>{
          this.SubmitSuccessMsg=false;
          this.modalService.dismissAll();
        }, 3000);
      },
      error => {
        let errorJSON= JSON.parse(error.error);
        this.showErrorMessage=true;
        this.OTPerrorMsg=errorJSON.message;
        this.OTPerrorMsgflag=true;
        setTimeout(()=>{
          this.showErrorMessage=false;
          this.OTPerrorMsgflag=false;
          this.OTPerrorMsg=" "; 
        }, 3000);
      }
      )
  }

  profileCancel(){
    this.route.navigate(['/home', {email: this.register.username}]);
  }
}
