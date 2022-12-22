import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalsService } from '../globals.service';
import { User } from '../model/user';
import { ForgotpasswordService } from '../services/forgotpassword.service'

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  forgotpassform = new FormGroup({
    email: new FormControl(''),
    mobileNumber: new FormControl('')
  });

  loading = false;
  submitted = false;
  user = new User();
  showErrorMessage=false;
  SuccessMsg: any;
  errorArr: any=[];
  ErrorMsg: any;
  countryCode: String = '';
  mobileNumber: String = '';
  dataToBeSent: String = '';
  showErrorMsg: string="";

  errorMsg: boolean=false;

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private route: Router,
    private forgotpasswordservice: ForgotpasswordService,
    private service: GlobalsService
  ) { }

  ngOnInit(): void {
    this.countryCode = '91';
    this.forgotpassform = this.formBuilder.group({
      email: ['', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      mobileNumber: ['',[Validators.maxLength(10),Validators.minLength(10)]]
  });
  }

  get f() {
    return this.forgotpassform.controls;
  }

  countryChange(country: any) {
    this.countryCode = country.dialCode;
  }

  onSubmit(){
    this.submitted=true;

    //Breaks if form is invalid
    if(this.forgotpassform.invalid) {
      return;
    }
    if(this.forgotpassform.value.email.length==0 && this.forgotpassform.value.mobileNumber.length==0){
      this.errorMsg=true;
      setTimeout(() => {
        this.errorMsg=false;
      }, 3000);
      return;
    }
    this.forgotpassform.value.mobileNumber = this.forgotpassform.value.mobileNumber.length > 0 ? "+"+this.countryCode+"-"+this.forgotpassform.value.mobileNumber : '';
    this.dataToBeSent = this.forgotpassform.value.email.length >0 ? this.forgotpassform.value.email: this.forgotpassform.value.mobileNumber;
    this.loading=true;
    this.forgotpasswordservice.forgotPassword(this.dataToBeSent).subscribe(
      data=> {
        this.route.navigate(['/createPassword', {email: data}])
        this.SuccessMsg = data;
      },
      error => {
        // this.errorArr = [];
        // this.errorArr = JSON.parse(error.error);
        this.showErrorMessage = true;
        this.showErrorMsg = this.service.globalErrorMsg;
        setTimeout(() => {
          this.showErrorMessage = false;
          this.showErrorMsg = "";
        }, 3000);
        this.forgotpassform.reset();
        this.loading=false;
      }
    )
  }
}
