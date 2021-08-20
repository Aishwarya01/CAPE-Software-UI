import{Component,OnInit }from'@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../model/user';
import { SessionStorageService, SessionStorage } from 'angular-web-storage';
@Component({
  selector: 'app-inspector-update-password',
  templateUrl: './inspector-update-password.component.html',
  styleUrls: ['./inspector-update-password.component.css']
})
export class InspectorUpdatePasswordComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  loading = false;
  submitted = false;
  user = new User();
  showErrorMessage=false;
  otp: string="";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public sessionStorage: SessionStorageService
  ) { }
    KEY = 'InspectorUpdatePassword';
    value: any = null;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required]
  });
  }

  config = {
    allowNumbersOnly: false,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '40px'
    }
  };

  onOtpChange(otp:any) {
    this.otp = otp;
  }
  submit() {
    this.value=this.user.email;
    this.sessionStorage.set(this.KEY, { email: this.user.email,newPassword:this.user.password});
}

cancel() {
    this.sessionStorage.remove(this.KEY);
}

get() {
    this.value = this.sessionStorage.get(this.KEY);
}

clear() {
    this.sessionStorage.clear();
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

    //this.loading=true;
 
  }

}
