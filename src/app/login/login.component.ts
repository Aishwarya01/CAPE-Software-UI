import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
    rememberMe: new FormControl(''),
  });

  loading = false;
  submitted = false;
  user = new User();
  showErrorMessage=false;
  isLoggedIn =  false;
  isLoginFaled =  false;
  rememberMe: boolean = false
  arr: any=[];


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginservice: LoginserviceService
  ) {
    // if(localStorage.getItem('rememberMe')!== undefined) {
    //   if(localStorage.getItem('rememberMe') === 'Yes') {
    //     this.user.email != localStorage.getItem('email');
    //     this.user.password != localStorage.getItem('password');
    //     this.rememberMe = true;
    //   }
    // }
   }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required],
      rememberMe: ['']
  });

  // if(this.loginservice.getToken()) {
  //   this.isLoggedIn = true;
  //   this.isLoginFaled =  false
  // }

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

    this.loginservice.login(this.user.email, this.user.password).subscribe(
      data=> {
        this.loginservice.saveToken(data.token);
        if(this.rememberMe) {
          localStorage.setItem('rememberMe', 'Yes');
          // localStorage.setItem('email', JSON.stringify(this.user.email));
          // localStorage.setItem('email', JSON.stringify(this.user.password));


        }
        this.isLoggedIn = true;
        this.isLoginFaled =  false
        this.router.navigate(['/home', {email: data.users.email}])
      },
      error => {
        this.showErrorMessage=true;
        //this.loginForm.reset();
        this.loading=false;
      }
    )
  }
}