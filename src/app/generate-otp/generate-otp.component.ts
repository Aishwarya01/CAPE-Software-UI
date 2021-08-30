import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InspectorregisterService } from '../services/inspectorregister.service';

@Component({
  selector: 'app-generate-otp',
  templateUrl: './generate-otp.component.html',
  styleUrls: ['./generate-otp.component.css']
})
export class GenerateOtpComponent implements OnInit {
  generateOtpForm = new FormGroup({
    mobileNumber: new FormControl(''),
  });

  loading: boolean = false;
  submitted: boolean = false;
  showErrorMessage: boolean = false;
  errorMsg: String ="";
  countryCode: String = '';
  contactNumber: String = '';
  email: String = '';
  successMsgOTP: boolean = false;
  successMsg: string = '';


  constructor(private formBuilder: FormBuilder,
              private router: ActivatedRoute,
              private route: Router,
              private inspectorRegisterService: InspectorregisterService) {  
  this.email=this.router.snapshot.paramMap.get('email') || '{}'
  }

  ngOnInit(): void {
    this.countryCode = '91';
    this.generateOtpForm = this.formBuilder.group({
      mobileNumber: ['',[Validators.maxLength(10),Validators.required]]
  });
  }

  countryChange(country: any) {
    this.countryCode = country.dialCode;
  }

  get f():any {
    return this.generateOtpForm.controls;
  }

  onSubmit() {
    this.submitted=true;
    debugger
    //Breaks if form is invalid
    if(this.generateOtpForm.invalid) {
      return;
    }

    this.loading=true;
    this.contactNumber = "";
    this.contactNumber = "+"+this.countryCode+"-"+this.generateOtpForm.value.mobileNumber
    this.inspectorRegisterService.sendOTPInspector(this.email,this.contactNumber).subscribe(
      data=> { 
        this.successMsgOTP=true;
        this.successMsg="OTP has been successfully sent to your mobile number"
        setTimeout(()=>{
          this.successMsgOTP=false;
          this.successMsg="";
        }, 3000);
        setTimeout(()=>{
          this.route.navigate(['/createPassword', {email: this.email}])
        }, 5000);
      },
      error => {
        console.log(error);
        let errorArr = JSON.parse(error.error);
        this.loading=false;
        this.showErrorMessage=true;
        this.errorMsg =errorArr.message;
        setTimeout(()=>{
          this.showErrorMessage=false;
          this.errorMsg = "";
        }, 3000);
      }
    )
  }

}
