import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from  '@angular/forms';
import { Route } from '@angular/router';

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

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.registerForm  =  this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
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
  }
}
