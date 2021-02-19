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
    usertype: new FormControl(''),
    password: new FormControl(''),
    confirmpassword: new FormControl(''),
    isActive: new FormControl('')
  });
  loading = false;
  submitted = false;
  usertypelist: any= ['User','Viewer','Admin'];
  user = new User();
  msg="";

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
      usertype: ['',Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['',Validators.required],
      isActive: ['', Validators.required]
  });
  }

  get f(){
    return this.registerForm.controls;
  }
  
 

  onSubmit(){
  console.log("Success");
  this.submitted=true;

  // if(this.registerForm.invalid) {
  //   return;
  // }


  this.loading=true;
  this.user.userName= this.registerForm.value.email;
  if(this.user.active == undefined) {
    this.user.active=false;
  }
  console.log(this.user);
  this.registerservice.register(this.user).subscribe(
    data=> { 
      console.log("REgister Success");
      this.msg="Register Success";
      this.router.navigate(['']);
    },
    error => console.log("Failed")
  )
  }
}
