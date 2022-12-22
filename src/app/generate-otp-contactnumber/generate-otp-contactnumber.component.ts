import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalsService } from '../globals.service';
import { InspectorregisterService } from '../services/inspectorregister.service';

@Component({
  selector: 'app-generate-otp-contactnumber',
  templateUrl: './generate-otp-contactnumber.component.html',
  styleUrls: ['./generate-otp-contactnumber.component.css']
})
export class GenerateOtpContactnumberComponent implements OnInit {
  generateContactNumberOtpForm = new FormGroup({
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
              private globalService: GlobalsService,
              private inspectorRegisterService: InspectorregisterService) {  
  this.email=this.router.snapshot.paramMap.get('email') || '{}'
  }

  ngOnInit(): void {
    this.countryCode = '91';
    this.generateContactNumberOtpForm = this.formBuilder.group({
      mobileNumber: ['',[Validators.minLength(10),Validators.maxLength(10),Validators.required]]
  });
  }

  countryChange(country: any) {
    this.countryCode = country.dialCode;
  }

  get f():any {
    return this.generateContactNumberOtpForm.controls;
  }

  onSubmit() {
    this.submitted=true;
    
    //Breaks if form is invalid
    if(this.generateContactNumberOtpForm.invalid) {
      return;
    }

    this.loading=true;
    this.contactNumber = "";
    this.contactNumber = "+"+this.countryCode+"-"+this.generateContactNumberOtpForm.value.mobileNumber
    this.inspectorRegisterService.sendOtpContactNumber(this.email,this.contactNumber).subscribe(
      data=> { 
        this.successMsgOTP=true;
        this.successMsg=data;
        this.globalService.changeNumberSession = data;
        this.globalService.changeNumber = this.contactNumber;

        // sessionStorage.setItem('changeNumberSession', data);
        // sessionStorage.setItem('changeNumber', this.contactNumber);

        setTimeout(()=>{
          this.successMsgOTP=false;
          this.successMsg="";
        }, 3000);
        setTimeout(()=>{
          this.route.navigate(['/createContactNumber', {email: this.email}])
        }, 5000);
      },
      error => {
        // let errorArr = JSON.parse(error.error);
        this.loading=false;
        this.showErrorMessage=true;
        this.errorMsg =this.globalService.globalErrorMsg;
        setTimeout(()=>{
          this.showErrorMessage=false;
          this.errorMsg = "";
        }, 3000);
      }
    )
  }

}
