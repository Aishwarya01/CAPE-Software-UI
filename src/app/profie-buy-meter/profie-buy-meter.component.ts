import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationBuyMeter } from '../model/registration-buy-meter';
import { Router } from '@angular/router';
import { RegistrationBuyMeterService } from '../services/registration-buy-meter.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-profie-buy-meter',
  templateUrl: './profie-buy-meter.component.html',
  styleUrls: ['./profie-buy-meter.component.css']
})
export class ProfieBuyMeterComponent implements OnInit {

  submitted:boolean = false;
  registerBuyMeterModel = new RegistrationBuyMeter();
  showValidate:boolean = false;
  showOtpBtn:boolean = true;
  profileForm!: FormGroup;
  formInput = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6'];
  @ViewChildren('formRow') rows: any;

 // @ViewChild('formRow', { static: false })  formRow!: ElementRef;
 // @ViewChild("msgElem", { static: false }) msgElem: ElementRef;


  viewEmployee:boolean = false;
  OTPerrorMsgflag:boolean = false;
  OTPerrorMsg: any;
  showOtpValidation: boolean=false;
  showOtpMsg:boolean = false;
  SubmitSuccessMsg: boolean=false;
  userName: any; 
  modalReference: any;
  dataArr: any;
  sessionKeyArr: any;
  otp: string = '';
  OtpSession:any;
 changeNumberForm = new FormGroup({
  mobileNumber : new FormControl('',Validators.required),

 })

  constructor(private route:Router,
    private registerBuyMeterService : RegistrationBuyMeterService,
    private fb : FormBuilder,
    private regiterationBuymeterService: RegistrationBuyMeterService,
     private modalService: NgbModal) { }

  ngOnInit(): void {
   this.profileForm = new FormGroup({
      firstName: new FormControl('',Validators.required),
      contactNumber: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
      lastName: new FormControl('',Validators.required),
      companyName: new FormControl('',Validators.required),
      purchasetype: new FormControl('',Validators.required),
      customerGstNumber: new FormControl('',Validators.required),
      address: new FormControl('',Validators.required),
      country: new FormControl('',Validators.required),
      state: new FormControl('',Validators.required),
      city: new FormControl('',Validators.required),
      pincode: new FormControl('',Validators.required)
     
  
    })
    if (!this.viewEmployee) {
      this.userName = JSON.parse(sessionStorage.authenticatedUser).username
    }
    this.registerBuyMeterService.getUserDetails(this.userName).subscribe(
      data => {
        this.registerBuyMeterModel = JSON.parse(data);
        this.viewEmployee = false;
        this.profileDetails(this.registerBuyMeterModel);
      })
    console.log(this.profileDetails);

    this.changeNumberForm = this.fb.group({
      username: new FormControl(''),
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


   profileDetails(value:any){
    return this.fb.group({
      firstName: new FormControl(value.firstName),
      lastName: new FormControl(value.lastName),
      contactNumber: new FormControl(value.contactNumber),
      email: new FormControl(value.email),
      purchasetype: new FormControl(value.purchasetype),
      customerGstNumber: new FormControl(value.customerGstNumber),
      companyName: new FormControl(value.companyName),
      address: new FormControl(value.address),
      country: new FormControl(value.country),
      state: new FormControl(value.state),
      city: new FormControl(value.city),
      pincode: new FormControl(value.pincode)
    
    })
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

  sendOtp(){
    this.userName = this.changeNumberForm.controls.username.value;

    this.regiterationBuymeterService.sendOtp(this.userName).subscribe((data:string)=>{
       this.showOtpMsg = true;
       this.showValidate = true;
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


  onSubmit() {
    this.submitted=true;
    if((this.changeNumberForm.value.input1 == "") || (this.changeNumberForm.value.input2 == "") || (this.changeNumberForm.value.input3 == "") ||
     (this.changeNumberForm.value.input4 == "") || (this.changeNumberForm.value.input5 == "") || (this.changeNumberForm.value.input6 == "")) {
      this.showOtpValidation=true;
      setTimeout(()=>{
        this.showOtpValidation=false;
      }, 3000);
      return;
    }
    this.otp= this.changeNumberForm.value.input1+this.changeNumberForm.value.input2+this.changeNumberForm.value.input3+this.changeNumberForm.value.input4
    +this.changeNumberForm.value.input5+this.changeNumberForm.value.input6;
    this.registerBuyMeterModel.otp= this.otp;
    this.registerBuyMeterModel.otpSession=this.OtpSession;
    
    this.regiterationBuymeterService.verifyOtp(this.registerBuyMeterModel).subscribe(data=>{

      this.SubmitSuccessMsg = true;
      this.userName = this.changeNumberForm.controls.username.value;
      this.regiterationBuymeterService.updateContactNumber(this.userName).subscribe(data=>{
        
      })
      setTimeout(() => {
        this.SubmitSuccessMsg = false;
        this.modalReference.close();
        this.route.navigate(['/addtocart']);
      }, 2000);
     
      
    })
    

  }


  mobileNumber(changeNumberTemplate :any){
    this.modalReference = this.modalService.open( changeNumberTemplate,{ centered:true,size: 'md' })
  }

  cancelChangeNumber(){
    this.modalReference.close();
  }


  get f() : any{
    return this.profileForm.controls
  }
  get g() : any {
    return this.changeNumberForm.controls;
  }

  onkeyUpEvent(event:any, index:any) {
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

  updateProfile(){
    this.submitted = true;
    if(this.profileForm.invalid){
      return
    }

  }

  backToAddtocart(){
    this.route.navigate(['/addtocart'])
  }
 

  resendOTP(){
    this.userName = this.changeNumberForm.controls.username.value;
    this.regiterationBuymeterService.sendOtp(this.userName).subscribe(data=>{
      this.showOtpMsg = true;
      setTimeout(() => {
        this.showOtpMsg = false;
      }, 3000);
      this.registerBuyMeterModel.otpSession = data;
    })

  }

  // validate(event : any){
  //    if(){

  //    }
  // }



}
