import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from '../model/admin';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  loading = false;
  submitted = false;
  admin =  new Admin;
  showErrorMessage=false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    
  ) { }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@capeindia.net")]],
      password: ['', Validators.required]
  });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted=true;

    //Breaks if form is invalid
    if(this.loginForm.invalid) {
      return;
    }

    this.loading=true;

    // this.loginservice.login(this.user.email, this.user.password).subscribe(
    //   data=> {
    //     this.router.navigate(['/home', {email: data.users.email}])
    //   },
    //   error => {
    //     this.showErrorMessage=true;
    //     //this.loginForm.reset();
    //     this.loading=false;
    //   }
    // )
  }
}
