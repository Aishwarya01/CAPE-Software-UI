import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  showErrorMessage= false;

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private route: Router,
    private changepasswordservice: ChangePasswordService
    ) {
      this.changePassword.email=this.router.snapshot.paramMap.get('email') || '{}'
    }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      oldpassword: ['', Validators.required],
      password: ['', Validators.required],
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
        this.route.navigate(['/login']);
      },
      error => {
        this.showErrorMessage=true;
        this.changePasswordForm.reset();
        this.loading=false;
      }
    )
  }

  cancel(){
    this.route.navigate(['/home', {email: this.changePassword.email}]);
  }

}
