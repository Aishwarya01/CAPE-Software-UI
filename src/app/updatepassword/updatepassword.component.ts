import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../model/user';
import { EncrDecrServiceService } from '../services/encr-decr-service.service';
import { UpdatepasswordService } from '../services/updatepassword.service';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.css']
})
export class UpdatepasswordComponent implements OnInit {


  updatepassform = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    confirmpassword: new FormControl('') ,
    // otp: new FormControl('')
  });

  loading = false;
  submitted = false;
  user = new User();
  showErrorMessage= false;
  successMsg: any;
  errorArr: any=[];

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private route: Router,
    private updatepasswordservice: UpdatepasswordService,private EncrDecr: EncrDecrServiceService,
    ) {
      this.user.email=this.router.snapshot.paramMap.get('email') || '{}'
    }

  ngOnInit(): void {
    this.updatepassform = this.formBuilder.group({
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
      // otp: ['', Validators.required]
      });


  }

  get f() {
    return this.updatepassform.controls;
  }

  onSubmit(){
    this.submitted=true;
    ;
    //Breaks if form is invalid
    if(this.updatepassform.invalid) {
      return;
    }

    this.loading=true;

     //password encryption
     var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', this.user.password);
     var decrypted = this.EncrDecr.get('123456$#@$^@1ERF', encrypted);
     
     console.log('Encrypted :' + encrypted);
     console.log('Decrypted :' + decrypted);

    this.updatepasswordservice.updatePassword(this.user.email, encrypted).subscribe(
      data=> {
        this.successMsg = data;
        setTimeout(() => {
          this.route.navigate(['/login']);
        }, 3000);
      },
      error => {
        this.errorArr = [];
        this.errorArr = JSON.parse(error.error)
        this.showErrorMessage=this.errorArr.message;
        this.updatepassform.reset();
        this.loading=false;
      }
    )
  }

}
