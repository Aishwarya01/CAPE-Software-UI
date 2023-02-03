import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterserviceService } from '../services/registerservice.service';
import { User } from '../model/user';
import { ProfileService } from '../services/profile.service';

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
  success: boolean=false;
  successMsg: any;
  loading = false;
  submitted = false;
  usertypelist: any = ['User', 'Viewer', 'Admin'];
  user = new User();
  msg: any;
  alert: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private registerservice: RegisterserviceService,
    private profileService: ProfileService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', [Validators.required,]],
      lastname: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        Validators.nullValidator]],
      usertype: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]],
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

    if(this.registerForm.value.email.includes("@capeindia.net")) {
      this.user.authorisedUser = "YES";
    }
    else{
      this.user.authorisedUser = "NO";
    }

    this.user.role = this.registerForm.value.usertype;
    this.registerservice.register(this.user).subscribe(
      data => {
        this.success=true;
        this.successMsg =data;
        setTimeout(() => {
        this.router.navigate(['/login']);
        }, 3000);
      },
      error => {
        this.alert=error.error.message;
      }
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
