import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from  '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';

import { first } from 'rxjs/operators';
import { AlertserviceService } from '../services/alertservice.service';
import { LoginserviceService } from '../services/loginservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    remember: new FormControl('')
  });
  
  loading = false;
  submitted = false;
  returnUrl= String;
  

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginservice: LoginserviceService,
    private alertservice: AlertserviceService
    ) {}
  

  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      remember: ['', Validators.required]
  });
  // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f(){
    return this.loginForm.controls;
  }

  onSubmit() {
    console.log("Arun");
    this.submitted=true;

    if(this.loginForm.invalid) {
      return;
    }

    this.loading=true;
    this.loginservice.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          // this.router.navigate([this.returnUrl]);
          console.log("Success");
        },
        error => {
          this.alertservice.error(error);
          this.loading=false;
        });
    }
  }


