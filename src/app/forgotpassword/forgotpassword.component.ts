import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../model/user';
//import { EncrDecrServiceService } from '../services/encr-decr-service.service';
import { ForgotpasswordService } from '../services/forgotpassword.service'

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  forgotpassform = new FormGroup({
    email: new FormControl('')
  });

  loading = false;
  submitted = false;
  user = new User();
  showErrorMessage=false;
  SuccessMsg: any;
  errorArr: any=[];
  ErrorMsg: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private route: Router,
    private forgotpasswordservice: ForgotpasswordService,
  ) { }

  ngOnInit(): void {
    this.forgotpassform = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
  });
  }

  get f() {
    return this.forgotpassform.controls;
  }

  onSubmit(){
    this.submitted=true;

    //Breaks if form is invalid
    if(this.forgotpassform.invalid) {
      return;
    }

    this.loading=true;

     //password encryption
    //  var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', this.user.password);
    //  var decrypted = this.EncrDecr.get('123456$#@$^@1ERF', encrypted);
     
    //  console.log('Encrypted :' + encrypted);
    //  console.log('Decrypted :' + decrypted);

    this.forgotpasswordservice.forgotPassword(this.user.email).subscribe(
      data=> {
        this.route.navigate(['/updatepassword', {email: data}])
        this.SuccessMsg = data;
      },
      error => {
        this.errorArr = [];
        this.errorArr = JSON.parse(error.error);
        this.showErrorMessage = this.errorArr.message;
        this.forgotpassform.reset();
        this.loading=false;
      }
    )
  }
}
