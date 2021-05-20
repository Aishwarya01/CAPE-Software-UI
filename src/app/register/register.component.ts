import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { RegisterserviceService } from '../services/registerservice.service';
import { User } from '../model/user';
import { Role } from '../model/roles';

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
    userType: new FormControl(''),
    password: new FormControl(''),
    confirmpassword: new FormControl(''),
    active: new FormControl('')
  });
  loading = false;
  submitted = false;
  usertypelist: any = ['User', 'Viewer', 'Admin'];
  user = new User();
  msg = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private registerservice: RegisterserviceService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      usertype: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
      isActive: ['', Validators.required]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    //Breaks if form is invalid
    if(this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.user.username = this.registerForm.value.email;
    this.user.role = this.registerForm.value.usertype;
    this.registerservice.register(this.user).subscribe(
      data => {
        this.msg = "Register Success";
        this.router.navigate(['/login']);
      },
      error => console.log("Failed")
    )
  }

  loadUserTypeBasedOnEmail(email: String){
    if(!email.includes("@capeindia.net")){
      this.usertypelist = ['User', 'Viewer']
    } else{
      this.usertypelist = ['User', 'Manager', 'Admin']
    }
    
  }
}
