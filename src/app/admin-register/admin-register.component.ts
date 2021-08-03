import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from '../model/admin';
import { AdminServiceService } from '../services/admin-service.service';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {

  adminRegisterForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    userType: new FormControl(''),
    password: new FormControl(''),
    confirmpassword: new FormControl(''),
  });
  loading = false;
  submitted = false;
  usertypelist: any = ['Manager', 'Admin']
  admin = new Admin;
  msg: any;
  alert: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private adminService: AdminServiceService) { }

  ngOnInit() {
    this.adminRegisterForm = this.formBuilder.group({
      firstname: ['', [Validators.required,]],
      lastname: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@capeindia.net"),
        Validators.nullValidator]],
      usertype: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
    });
  }

  get f() {
    return this.adminRegisterForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    //Breaks if form is invalid
    if(this.adminRegisterForm.invalid) {
      return;
    }

    this.loading = true;
    this.admin.username = this.adminRegisterForm.value.email;
    this.adminService.addAdmin(this.admin).subscribe(
      data => {
        this.msg ="Admin Register Success";
        this.router.navigate(['/admin/login']);
        console.log(this.msg);
      },
      error => {
        console.log(this.msg);
        console.log(this.alert);
        this.loading= false;
      }
    )


    // if(this.registerForm.value.email.includes("@capeindia.net")) {
    //   this.admin.authorisedUser = "YES";
    // }
    // else{
    //   this.user.authorisedUser = "NO";
    // }

    
  }

  // For append usertype list for cape users only
  loadUserTypeBasedOnEmail(email: String){
  //   if(!email.includes("@capeindia.net")){
  //     this.usertypelist = ['User', 'Viewer']
  //   } else{
  //     this.usertypelist = ['User', 'Manager', 'Admin']
  //   }
  }
}
