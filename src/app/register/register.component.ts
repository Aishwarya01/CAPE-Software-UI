import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from  '@angular/forms';
import { Route, Router } from '@angular/router';
import { RegisterserviceService } from '../services/registerservice.service';
import { User } from '../model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    registertype: new FormControl(''),
    password: new FormControl(''),
    confirmpassword: new FormControl(''),
  });
  loading = false;
  submitted = false;
  registertypelist: any= ['User','Viewer','Admin'];
  user = new User();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private registerservice :RegisterserviceService)
     {}

  ngOnInit() {
    this.registerForm  =  this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      registertype: ['',Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['',Validators.required],
      remember: ['', Validators.required]
  });
  }

  get f(){
    return this.registerForm.controls;
  }

  onSubmit(){
  console.log("Success");
  this.submitted=true;

  if(this.registerForm.invalid) {
    return;
  }

  this.loading=true;
  this.registerservice.register(this.user).subscribe(
    data=> { 
      console.log("Success");
      this.router.navigate(['/login'])
    },
    error => console.log("Failed")
  )
  }
}
