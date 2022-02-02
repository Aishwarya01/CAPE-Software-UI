import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePassword } from '../model/changepassword';
import { ChangePasswordService } from '../services/change-password.service';
import { EncrDecrServiceService } from '../services/encr-decr-service.service';

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
    private formBuilder: FormBuilder,private EncrDecr: EncrDecrServiceService,
    private router: ActivatedRoute,
    private route: Router,
    private changepasswordservice: ChangePasswordService
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

      //password encryption
      var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', this.changePassword.password);
      var decrypted = this.EncrDecr.get('123456$#@$^@1ERF', encrypted);
      var encrypted1 = this.EncrDecr.get('123456$#@$^@1ERF', this.changePassword.oldpassword);
      var decrypted1 = this.EncrDecr.get('123456$#@$^@1ERF', encrypted1);
      
      console.log('Encrypted :' + encrypted);
      console.log('Decrypted :' + decrypted);
      console.log('Decrypted :' + decrypted1);

    this.changepasswordservice.changePassword(this.changePassword.email, encrypted1, encrypted).subscribe(
      data=> {
        this.SuccessMsg = data;
        setTimeout(() => {
          this.route.navigate(['/login']);
        }, 3000);
        },error => {
          this.showErrorMessage1 = true;
          this.errorArr = [];
          this.errorArr = JSON.parse(error.error);
          this.showErrorMessage1 = this.errorArr.message;
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
