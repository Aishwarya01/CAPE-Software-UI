import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../model/user';
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
  msg="";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
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

    this.forgotpasswordservice.forgotPassword(this.user.email).subscribe(
      data=> { 
        this.router.navigate(['/updatepassword', {email: data}])
      },
      error => {
        console.log("Exception occured");
        this.msg = "Email is not registered with us";
        this.loading=false;
      }
    )
  }
}
