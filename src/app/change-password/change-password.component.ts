import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalsService } from '../globals.service';
import { ChangePassword } from '../model/changepassword';
import { ChangePasswordService } from '../services/change-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm = new FormGroup({
    email: new FormControl(''),
    oldpassword: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });

  loading = false;
  submitted = false;
  changePassword = new ChangePassword();
  showErrorMessage:boolean= false;
  SuccessMsg: any;
  errorArr: any=[];
  showErrorMessage1: any;
  Error: boolean=false;

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private route: Router,
    private changepasswordservice: ChangePasswordService,
    private service: GlobalsService
    ) {
      this.changePassword.email=this.router.snapshot.paramMap.get('email') || '{}'
    }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      oldpassword: ['', Validators.required],
      password: ['', [Validators.required,Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]],
      confirmpassword: ['', Validators.required],
      });


  }

  get f() {
    return this.changePasswordForm.controls;
  }

  onSubmit(){
    this.submitted=true;

    //Breaks if form is invalid
    if(this.changePasswordForm.invalid) {
      return;
    }

    this.loading=true;

    this.changepasswordservice.changePassword(this.changePassword.email, this.changePassword.oldpassword, this.changePassword.password).subscribe(
      data=> {
        this.SuccessMsg = data;
        setTimeout(() => {
          this.route.navigate(['/login']);
        }, 3000);
        },error => {
          this.showErrorMessage1 = true;
          // this.errorArr = [];
          // this.errorArr = JSON.parse(error.error);
          this.showErrorMessage1 = this.service.globalErrorMsg;
          setTimeout(() => {
           this.showErrorMessage1 = false;
          }, 3000);
          this.changePasswordForm.reset();
          this.loading=false;
      }
    )
  }
  cancel(){
    this.route.navigate(['/home', {email: this.changePassword.email}]);
  }

}
