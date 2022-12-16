import { Component, EventEmitter, OnInit, Output, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { GlobalsService } from '../globals.service';
import { RegistrationBuyMeter } from '../model/registration-buy-meter';
import { RegistrationBuyMeterService } from '../services/registration-buy-meter.service';

@Component({
  selector: 'app-sign-in-buy-meter',
  templateUrl: './sign-in-buy-meter.component.html',
  styleUrls: ['./sign-in-buy-meter.component.css']
})
export class SignInBuyMeterComponent implements OnInit {
  signInContent :string = environment.signInContent;
  submitted:boolean = false;
  showPassword:boolean = false;
  showOtp:boolean = false;
  showBtn:boolean = true;
  hideRegister:boolean = true;
  registerBuyMeterModel = new RegistrationBuyMeter();
  formInput = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6'];
  @ViewChildren('formRow') rows: any;
  OTPerrorMsgflag: boolean=false;
  SubmitSuccessMsg: boolean=false;
  showErrorMsg: boolean = false;
  showErrMsg:string='';
  showOtpValidation: boolean=false;
  showOtpMsg:boolean = false;
  OTPerrorMsg: any;
  showErrorMsg1:boolean = false;
  showErrMsg1:string='';
  wrongPassword:boolean = false;
  userName:any;

  OtpSession:any;
   SignIn  = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
   })
  otp: string = '';
  dataArr: any;
  sessionKeyArr: any;


  constructor(private router: Router,  private formBuilder: FormBuilder,
    public service: GlobalsService,private regiterationBuymeterService: RegistrationBuyMeterService
    ) {this.SignIn = this.toFormGroup(this.formInput); }

  ngOnInit(): void {

    this.SignIn = this.formBuilder.group({
      username: new FormControl(''),
      password: new FormControl(''),
      input1:[''],
      input2:[''],
      input3:[''],
      input4:[''],
      input5:[''],
      input6:['']
    })

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
 
  get f():any{
    return this.SignIn.controls;
  }

  toFormGroup(elements:any) {
    const group: any = {};

    elements.forEach((key:any) => {
      group[key] = new FormControl('', Validators.required);
    });
    return new FormGroup(group);
  }

  onOtpChange(otp:any) {
    this.otp = otp;
  }

  // User name validation
  continue(){
   this.userName = this.SignIn.controls.username.value;
   if(this.userName==null){
    this.showErrMsg1 ="Please Enter Username";
    this.showErrorMsg1 = true;
    this.showErrorMsg = false;
    setTimeout(() => {
      this.showErrorMsg1 = false;
      this.showErrorMsg = false;
    }, 3000);
   }
   else{

   
    this.regiterationBuymeterService.retriveRegistration(this.userName).subscribe(data=>{
      this.showPassword = true;
      this.hideRegister = false;
     
    },error=>{
   
      console.log("Username not exits!");
      this.showErrMsg ="Username not exits!";
      this.showErrorMsg = true;
      setTimeout(() => {
        this.showErrorMsg = false;
      }, 3000);
    })
  }
  }

  // Account Validation
  submit(){
    this.regiterationBuymeterService.authenticate(this.registerBuyMeterModel).subscribe(
      data=>{
      localStorage.setItem('password', this.registerBuyMeterModel.password );
      localStorage.setItem('username',this.registerBuyMeterModel.username);
      sessionStorage.setItem('token', data['token']);
      
      this.router.navigate(['/addtocart']);
    },error=>{
      this.wrongPassword = true;
      setTimeout(() => {
        this.wrongPassword = false;
      }, 3000);
    })
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

  // Send OTP
  sendOtp(){
    this.showOtp = true;
    this.showPassword = false;
    this.showBtn = false;
    this.userName = this.SignIn.controls.username.value;

    this.regiterationBuymeterService.sendOtp(this.userName).subscribe((data:string)=>{
       
       this.showOtpMsg = true;
       setTimeout(() => {
         this.showOtpMsg = false;
       }, 3000);
       this.OtpSession = data;
     },
    error =>{
       console.log(JSON.parse(error.error));
    })
    this.sessionKeyArr=this.dataArr;
    console.log(this.dataArr);
    

  }

  // OTP Validation
  onSubmit() {
    this.submitted=true;
    if((this.SignIn.value.input1 == "") || (this.SignIn.value.input2 == "") || (this.SignIn.value.input3 == "") ||
     (this.SignIn.value.input4 == "") || (this.SignIn.value.input5 == "") || (this.SignIn.value.input6 == "")) {
      this.showOtpValidation=true;
      setTimeout(()=>{
        this.showOtpValidation=false;
      }, 3000);
      return;
    }
    this.otp= this.SignIn.value.input1+this.SignIn.value.input2+this.SignIn.value.input3+this.SignIn.value.input4
    +this.SignIn.value.input5+this.SignIn.value.input6;
    this.registerBuyMeterModel.otp= this.otp;
    this.registerBuyMeterModel.otpSession=this.OtpSession;
    
    this.regiterationBuymeterService.verifyOtp(this.registerBuyMeterModel).subscribe(data=>{
      this.router.navigate(['/addtocart']);
     let registrationBuyMeter = new  RegistrationBuyMeter();
     registrationBuyMeter.mobileNumber = this.registerBuyMeterModel.username; //Here  username is contactNumber
      this.regiterationBuymeterService.authenticate(registrationBuyMeter).subscribe(data=>{

      })
      
    })
    

  }

  // Resend OTP
  resendOTP(){
    this.userName = this.SignIn.controls.username.value;
    this.regiterationBuymeterService.sendOtp(this.userName).subscribe(data=>{
      this.showOtpMsg = true;
      setTimeout(() => {
        this.showOtpMsg = false;
      }, 3000);
      this.registerBuyMeterModel.otpSession = data;
    })

  }

}
