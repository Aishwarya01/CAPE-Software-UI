import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationBuyMeter } from '../model/registration-buy-meter';
import { RegistrationBuyMeterService } from '../services/registration-buy-meter.service';

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

  constructor(private registrationBuyMeterService:RegistrationBuyMeterService,
        private route: Router) { }

  ngOnInit(): void {
    this.countryCode = '91';
    this.RegistrationForm = new FormGroup({
      firstName:new FormControl('',Validators.required),
      contactNumber:new FormControl('',Validators.required),
      email:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required),
      companyName:new FormControl('',Validators.required),
      confirmpassword:new FormControl('',Validators.required),
      address: new FormControl('',Validators.required),
      shippingAddress: new FormControl('',Validators.required),
      country: new FormControl('',Validators.required),
      state: new FormControl('',Validators.required),
      city: new FormControl('',Validators.required)

     })

  }

  // Navigation
  navigateAddtoCart(){
    this.route.navigate(['/addtocart']);
  }


// Add Registration
  submit(){
    this.submitted = true;
    if (this.RegistrationForm.invalid) {
      return
    }
    this.registrationBuyMeterService.addRegistration(this.registrationBuyMeter).subscribe(
      data=>{
      this.successMsg = true;
      setTimeout(() => {
        this.successMsg = false;
        this.navigateAddtoCart();
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

}
