import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debug } from 'console';
import { RegistrationBuyMeter } from '../model/registration-buy-meter';
import { RegistrationBuyMeterService } from '../services/registration-buy-meter.service';
import { SiteService } from '../services/site.service';

@Component({
  selector: 'app-registration-buy-meter',
  templateUrl: './registration-buy-meter.component.html',
  styleUrls: ['./registration-buy-meter.component.css']
})
export class RegistrationBuyMeterComponent implements OnInit {
  countryCode: String = '';
  submitted:boolean = false;
  failureMsg:boolean = false;
  registrationBuyMeter = new RegistrationBuyMeter;
  RegistrationForm!: FormGroup;
  successMsg:boolean = false;
  failuremsg:string ='';
  user:any;
  stateList: any= [];
  countryList: any=[];
  pinCodeErrorMsg: String = '';
  passwordMsg: boolean = false;
  

  constructor(private registrationBuyMeterService:RegistrationBuyMeterService,
        private route: Router, private siteService : SiteService) { }

  ngOnInit(): void {
    this.countryCode = '91';
    this.RegistrationForm = new FormGroup({
      firstName:new FormControl('',Validators.required),
      lastName:new FormControl('',Validators.required),
      contactNumber:new FormControl('',[Validators.required, Validators.min(1000000000), Validators.max(9999999999)]),
      email:new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password:new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]),
      companyName:new FormControl('',Validators.required),
      confirmpassword:new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]),
      address: new FormControl('',Validators.required),
      country: new FormControl('',Validators.required),
      state: new FormControl('',Validators.required),
      city: new FormControl('',Validators.required),
      pincode: new FormControl('',[Validators.required,Validators.pattern('^[1-9][0-9]{5}$')])
     })

     this.siteService.retrieveCountry().subscribe(
      data => {
        this.countryList = JSON.parse(data);
      }
    )
  }

  // Navigation
  navigateAddtoCart(){
    this.route.navigate(['/addtocart']);
  }


// Add Registration
  submit(){
    debugger
    this.submitted = true;
    if (this.RegistrationForm.invalid) {
      return
    }
    if (this.RegistrationForm.value.password != this.RegistrationForm.value.confirmpassword) {
      this. passwordMsg = true;
      setTimeout(() => {
        this.passwordMsg = false;
      }, 3000);
    }
    this.registrationBuyMeterService.addRegistration(this.registrationBuyMeter).subscribe(
      data=>{
      this.successMsg = true;
      setTimeout(() => {
        this.successMsg = false;
        this.navigateToSignIn();
      }, 2000);
    }, error=>{
      this.failuremsg = "Username already exist!"
      this.failureMsg = true;
      setTimeout(() => {
        this.failureMsg = false;
        this.navigateToSignIn();
      }, 3000);
     })
  }



get f():any{
  return this.RegistrationForm.controls;
}

countryChange(country: any) {
    this.countryCode = country.dialCode;
  }

// Sign in Navigation
  navigateToSignIn(){
    this.route.navigate(['/signIn-buyMeter']);
  }

  selectCountry(e: any) {
    let changedValue = e.target.value;
    this.stateList = [];
      for(let arr of this.countryList) {
        if( arr.name == changedValue) {
          this.siteService.retrieveState(arr.code).subscribe(
            data => {
              this.stateList = JSON.parse(data)
            }
          )};
      }
      // if(changedValue == "IND") {
      //   this.siteService.retrieveStateV2(changedValue).subscribe(
      //     data => {
      //       this.stateList = JSON.parse(data)
      //     }
      //   );
      // }
      if(changedValue == 'INDIA') {
        this.f['pincode'].setValidators([Validators.required,Validators.pattern('^[1-9][0-9]{5}$')]);
        this.f['pincode'].updateValueAndValidity();
        this.pinCodeErrorMsg = 'Please enter 6 digit pincode';
      }
      else if(changedValue == 'NEPAL') {
        this.f['pincode'].setValidators([Validators.required,Validators.pattern('^[1-9][0-9]{4}$')]);
        this.f['pincode'].updateValueAndValidity();
        this.pinCodeErrorMsg = 'Please enter 5 digit pincode';
      }
      else {
        this.f['pincode'].setValidators([Validators.required]);
        this.f['pincode'].updateValueAndValidity();
        //this.pinCodeErrorMsg = 'Please enter pincode';
      }
       
  }

}
