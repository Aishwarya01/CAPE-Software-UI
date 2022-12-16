import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationBuyMeter } from '../model/registration-buy-meter';
import { Router } from '@angular/router';
import { RegistrationBuyMeterService } from '../services/registration-buy-meter.service';
@Component({
  selector: 'app-profie-buy-meter',
  templateUrl: './profie-buy-meter.component.html',
  styleUrls: ['./profie-buy-meter.component.css']
})
export class ProfieBuyMeterComponent implements OnInit {

  submitted:boolean = false;
  registerBuyMeter = new RegistrationBuyMeter();
  profileForm!: FormGroup;
  viewEmployee:boolean = false;
  userName: any; 

  constructor(private route:Router,private registerBuyMeterService : RegistrationBuyMeterService,private fb : FormBuilder ) { }

  ngOnInit(): void {
   this.profileForm = new FormGroup({
      firstName: new FormControl('',Validators.required),
      contactNumber: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
      lastName: new FormControl('',Validators.required),
      companyName: new FormControl('',Validators.required),
      address: new FormControl('',Validators.required),
      country: new FormControl('',Validators.required),
      state: new FormControl('',Validators.required),
      city: new FormControl('',Validators.required),
      pincode: new FormControl('',Validators.required)
  
    })
    if (!this.viewEmployee) {
      this.userName = JSON.parse(sessionStorage.authenticatedUserForMeter).username
    }
    this.registerBuyMeterService.getUserDetails(this.userName).subscribe(
      data => {
        this.registerBuyMeter = JSON.parse(data);
        this.viewEmployee = false;
        this.profileDetails(this.registerBuyMeter);
      })
    console.log(this.profileDetails);
  }

   profileDetails(value:any){
    return this.fb.group({
      firstName: new FormControl(value.firstName),
      lastName: new FormControl(value.lastName),
      contactNumber: new FormControl(value.contactNumber),
      email: new FormControl(value.email),
      companyName: new FormControl(value.companyName),
      address: new FormControl('',value.address),
      country: new FormControl('',value.country),
      state: new FormControl('',value.state),
      city: new FormControl('',value.city),
      pincode: new FormControl('',value.pincode)
    })
   }



  otp(){

  }

  get f() : any{
    return this.profileForm.controls
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


}
