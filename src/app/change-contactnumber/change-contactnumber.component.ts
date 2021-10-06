import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';
import { GlobalsService } from '../globals.service';
import { ChangeContact } from '../model/change-contact';
import { Register } from '../model/register';
import { UpdatePasswordInspector } from '../model/update-password-inspector';
import { User } from '../model/user';
import { InspectorregisterService } from '../services/inspectorregister.service';

@Component({
  selector: 'app-change-contactnumber',
  templateUrl: './change-contactnumber.component.html',
  styleUrls: ['./change-contactnumber.component.css']
})
export class ChangeContactnumberComponent implements OnInit {
  changeContactNumberForm = new FormGroup({
    emailId: new FormControl(''),
    mobileNumber: new FormControl(''),
    // confirmpassword: new FormControl(''),
    otpValue: new FormControl('')
  });
  loading = false;
  submitted = false;
  user = new User();
  showErrorMessage: boolean=false;
  showOTPValidation: boolean=false;
  otp: string="";
  updatePassInspector=new UpdatePasswordInspector;
  changeContact = new ChangeContact;
  inspector = new Register;
  email: String = "";
  showOTPMessage: boolean=false;
  formInput = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6'];
  @ViewChildren('formRow') rows: any;
  OTPerrorMsg: any;
  OTPerrorMsgflag: boolean=false;
  SubmitSuccessMsg: boolean=false;
  sessionKey!: any;
  contactNo!: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private router: ActivatedRoute,
    public sessionStorage: SessionStorageService,
    public updateInspectorService: InspectorregisterService,
    private globalService: GlobalsService,

  ) {
    this.changeContactNumberForm = this.toFormGroup(this.formInput);
    this.email = this.router.snapshot.paramMap.get('email') || '{}'
   }
    KEY = 'InspectorUpdatePassword';
    value: any = null;

  ngOnInit() {
    // this.sessionKey=sessionStorage.getItem('changeNumberSession');
    // this.contactNo=sessionStorage.getItem('changeNumber');

    this.changeContact.otpSession = this.globalService.changeNumberSession;
    this.changeContact.mobileNumber = this.globalService.changeNumber;
    this.changeContactNumberForm = this.formBuilder.group({
      emailId: [this.email, [
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
    debugger
    if (pos > -1 && pos < this.formInput.length ) {
      this.rows._results[pos].nativeElement.focus();
    }

  }
  onOtpChange(otp:any) {
    this.otp = otp;
  }
  submit() {
    this.value=this.updatePassInspector.email;
    this.sessionStorage.set(this.KEY, { email: this.updatePassInspector.email,newPassword:this.updatePassInspector.password});
}

cancel() {
    this.sessionStorage.remove(this.KEY);
}

get() {
    this.value = this.sessionStorage.get(this.KEY);
}

clear() {
    this.sessionStorage.clear();
}

  get f() {
    return this.changeContactNumberForm.controls;
  }
  resendOTP(){
    this.updateInspectorService.resendOTPInspector(this.changeContact.mobileNumber).subscribe(
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
  onSubmit() {
    this.submitted=true;
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
    

    this.updateInspectorService.createContactNo(this.changeContact).subscribe(
      data=> {
        this.SubmitSuccessMsg=true;
        setTimeout(()=>{
          this.SubmitSuccessMsg=false;
          this.route.navigate(['/login'])
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
}
