import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../model/user';
import { ForgotpasswordService } from '../services/forgotpassword.service';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.css']
})
export class UpdatepasswordComponent implements OnInit {

  
  updatepassform = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    confirmpassword: new FormControl('') 
  });

  loading = false;
  submitted = false;
  user = new User();
  msg="";

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private route: Router,
    private forgotpasswordsevice: ForgotpasswordService
    ) {
    this.user.email=JSON.stringify(this.router.snapshot.paramMap.get('email'))
    }

  ngOnInit(): void {
    this.updatepassform = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
      });

      
  }
  
  get f() {
    return this.updatepassform.controls;
  }

  onSubmit(){
    this.submitted=true;
    
    //Breaks if form is invalid
    if(this.updatepassform.invalid) {
      return;
    }

    this.loading=true;

    this.forgotpasswordsevice.updatePassword(this.user.email, this.user.password).subscribe(
      data=> { 
        this.route.navigate(['/login']);
      },
      error => {
        console.log("Exception occured");
        this.msg = "Something went wrong";
        this.loading=false;
      }
    )
  }

}
