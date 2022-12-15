import{Component,OnInit,ViewChildren,ElementRef  }from'@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../model/user';
import { SessionStorageService, SessionStorage } from 'angular-web-storage';
import { InspectorregisterService } from '../services/inspectorregister.service';
import { UpdatePasswordInspector } from '../model/update-password-inspector';
import { Register } from '../model/register';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-inspector-update-password',
  templateUrl: './inspector-update-password.component.html',
  styleUrls: ['./inspector-update-password.component.css']
})
export class InspectorUpdatePasswordComponent implements OnInit {
  loginForm = new FormGroup({
    emailId: new FormControl(''),
    password: new FormControl(''),
    confirmpassword: new FormControl(''),
    otpValue: new FormControl('')
  });
  loading = false;
  submitted = false;
  user = new User();
  showErrorMessage: boolean=false;
  showOTPValidation: boolean=false;
  otp: string="";
  updatePassInspector=new UpdatePasswordInspector;
  inspector = new Register;
  email: String = "";
  showOTPMessage: boolean=false;
  formInput = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6'];
  @ViewChildren('formRow') rows: any;
  OTPerrorMsg: any;
  OTPerrorMsgflag: boolean=false;
  SubmitSuccessMsg: boolean=false;
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private router: ActivatedRoute,
    public sessionStorage: SessionStorageService,
    private serviec: GlobalsService,
    public updateInspectorService: InspectorregisterService,

  ) {
    this.loginForm = this.toFormGroup(this.formInput);
    this.email = this.router.snapshot.paramMap.get('email') || '{}'
    this.updateInspectorService.retrieveInspector(this.email).subscribe(
      data =>{ 
        this.inspector = JSON.parse(data);
        this.updatePassInspector.otpSession = this.inspector.otpSessionKey;

      }
    ) 
   }
    KEY = 'InspectorUpdatePassword';
    value: any = null;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      emailId: [this.email, [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
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
    return this.loginForm.controls;
  }
  resendOTP(){
    this.updateInspectorService.resendOTPInspector(this.email,this.inspector.contactNumber).subscribe(
      data=> {
       this.showOTPMessage=true;
       setTimeout(()=>{
        this.showOTPMessage=false;
      }, 3000);
      this.updateInspectorService.retrieveInspector(this.email).subscribe(
        data =>{ 
          this.inspector = JSON.parse(data);
          this.updatePassInspector.otpSession = this.inspector.otpSessionKey; 
        }
      ) 
      //this.updatePassInspector.otpSession = data;

      },
      error => {
      
      }
      ) 
  }
  onSubmit() {
    this.submitted=true;
    if((this.loginForm.value.input1 == "") || (this.loginForm.value.input2 == "") || (this.loginForm.value.input3 == "") ||
     (this.loginForm.value.input4 == "") || (this.loginForm.value.input5 == "") || (this.loginForm.value.input6 == "")) {
      this.showOTPValidation=true;
      setTimeout(()=>{
        this.showOTPValidation=false;
      }, 3000);
      return;
    }

    //Breaks if form is invalid
    if(this.loginForm.invalid) {  
      return;
    }
    this.otp= this.loginForm.value.input1+this.loginForm.value.input2+this.loginForm.value.input3+this.loginForm.value.input4
    +this.loginForm.value.input5+this.loginForm.value.input6;
    this.updatePassInspector.otp= this.otp;
    this.updatePassInspector.email=this.loginForm.value.emailId;
    this.updateInspectorService.createPasswordInspector(this.updatePassInspector).subscribe(
      data=> {
        this.SubmitSuccessMsg=true;
        setTimeout(()=>{
          this.SubmitSuccessMsg=false;
          this.route.navigate(['/login'])
        }, 3000);
      },
      error => {
        // let errorJSON= JSON.parse(error.error);
        this.showErrorMessage=true;
        this.OTPerrorMsg=this.serviec.globalErrorMsg;
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
