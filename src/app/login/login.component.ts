import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from  '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { User } from '../model/user';
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
  user = new User();
  

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginservice: LoginserviceService
    ) {}
  

  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required],
      remember: ['', Validators.required]
  });
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

    this.loginservice.login(this.user).subscribe(
      data=> { 
        console.log("HIHDHDS");
        this.router.navigate(['/loginsuccess'])
      },
      error => console.log("dhfkjdhf")
    )
    
    }
  }


