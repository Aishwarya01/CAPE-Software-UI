import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalsService } from '../globals.service';
import { User } from '../model/user';
import { LoginserviceService } from '../services/loginservice.service';
import {Message} from '../globals.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    rememberMe: new FormControl('')
  });
  rememberMeChecked: boolean=false;
  loading = false;
  submitted = false;
  user = new User();
  showErrorMessage=false;
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
  public token: string = '';
  messages: Message[] = [];
 msgBot: any=[];
 valueBot: string="";
 togglecount:number = 0;
 status =false;
 greet: string="";
 isShow: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginservice: LoginserviceService,public service: GlobalsService
  ) { }

  // ngOnDestroy() {
  //   window.location.reload();
  // }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required]
    });
    const RM= localStorage.getItem('rememberMe');
    if(RM){
      this.AutoLogin();
    }
  //this.AutoLogin();
  this.service.conversation.subscribe((val) => {
    this.messages = this.messages.concat(val);
    });
    var myDate = new Date();
    var hrs = myDate.getHours();

    if (hrs < 12)
        this.greet = 'Good Morning!';
    else if (hrs >= 12 && hrs <= 17)
        this.greet = 'Good Afternoon!';
    else if (hrs >= 17 && hrs <= 24)
        this.greet = 'Good Evening!';
    this.service.getBotAnswerDefaultSignLogin(this.valueBot);
  }
//chatbot code starts
toggleStatus() {
  this.isShow = !this.isShow;
  // if(this.togglecount == 0)
  // {
  //   this.service.getBotAnswerDefaultSignLogin(this.valueBot);
  //   this.togglecount=1;
  // }
}
toggleStatusClose(){
  this.isShow = !this.isShow;
}
sendMessage() {
  this.service.getBotAnswer(this.valueBot);
  this.valueBot = '';
}
// chatbot code ends

  get f() {
    return this.loginForm.controls;
  }
  
  rememberMe(event:any) {
    if ( event.target.checked ) {
        this.rememberMeChecked = true;
   }
   else{
    this.rememberMeChecked = false;
   }
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
      localStorage.setItem('email', this.user.email);
      localStorage.setItem('password', this.user.password);
     sessionStorage.setItem('token', data['token']);
      // Save value to local storage
      if(this.rememberMeChecked==true) {
        localStorage.setItem('rememberMe', 'yes');
      }
        if(data.register.otpSessionKey != null) {
          this.router.navigate(['/home', {email: data.register.username}])
        }
        else{
          this.router.navigate(['/generateContactNumber', {email: data.register.username}])
        }
      },
      error => {
        if(error.error.error == 'Unauthorized'){
          error.error.error = 'Invalid Credentials';
          this.showErrorMessage=error.error.error;
        } else{
          this.showErrorMessage=error.error.message;
        }
        
        this.loading=false;
      }
    )
  }
 
  AutoLogin(){
  //   this.service.autoLoginToken=1;
  //   //this.loginservice.login(this.user.email, this.user.password);
  //  this.loginservice.login(localStorage.email, localStorage.password);
  //    //const accessToken = localStorage.getItem("token");
    
  //    // Retrieve rememberMe value from local storage
  //    const rememberMe = localStorage.getItem('rememberMe');
  //    //console.log(accessTokenObj);
  //   // console.log(accessToken);
  //    if (rememberMe == 'yes') {
  //      this.router.navigate(['/home', {email: localStorage.email}]);

  //    } 
  //    else {
  //      console.log("You need to login")
  //    }

  this.loginservice.login(localStorage.email, localStorage.password).subscribe(
      data=> {
      sessionStorage.setItem('token', data['token']);
      // Save value to local storage
      const rememberMe = localStorage.getItem('rememberMe');
        if(rememberMe == 'yes') {
          this.router.navigate(['/home', {email: data.register.username}])
        }
      },
      error => {
       console.log(error);
      }
    )
    }
}
