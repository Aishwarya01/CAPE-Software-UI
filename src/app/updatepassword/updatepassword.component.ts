import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../model/user';
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
    confirmpassword: new FormControl('') 
  });

  loading = false;
  submitted = false;
  user = new User();
  showErrorMessage= false;

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private route: Router,
    private updatepasswordservice: UpdatepasswordService
    ) {
      this.user.email=this.router.snapshot.paramMap.get('email') || '{}'
    }

  ngOnInit(): void {
    this.updatepassform = this.formBuilder.group({
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
      });

      
  }
  
  get f() {
    return this.updatepassform.controls;
  }

  onSubmit(){
    this.submitted=true;
    
    //Breaks if form is invalid
    if(this.updatepassform.invalid) {
      return;
    }

    this.loading=true;

    this.updatepasswordservice.updatePassword(this.user.email, this.user.password).subscribe(
      data=> { 
        this.route.navigate(['/login']);
      },
      error => {
        this.showErrorMessage=true;
        this.updatepassform.reset();
        this.loading=false;
      }
    )
  }

}
