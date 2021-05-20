import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { User } from '../model/user';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    userType: new FormControl(''),
    active: new FormControl('')
  });
  loading = false;
  submitted = false;
  usertypelist: any = ['User', 'Viewer', 'Admin'];
  user = new User();
  msg = "";
  email: String = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private route: Router,
    private profileService: ProfileService
    ) { 
      this.user.email=this.router.snapshot.paramMap.get('email') || '{}'
      this.profileService.getUser(this.user.email).subscribe(
        data =>{ this.user= JSON.parse(data)}
      )
    }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      firstname: [this.user.firstname, Validators.required],
      lastname: [this.user.lastname, Validators.required],
      email: [this.user.email, [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      usertype: [this.user.usertype, Validators.required],
      isActive: [this.user.active, Validators.required]
    });
  }

  get f() {
    return this.profileForm.controls;
  }

  

  onSubmit() {
    this.submitted = true;

    //Breaks if form is invalid
    if(this.profileForm.invalid) {
      return;
    }

    this.loading = true;
    // this.user.username = this.profileForm.value.email;
    this.user.role = this.profileForm.value.usertype;
    this.profileService.updateProfile(this.user).subscribe(
      data => {
        this.msg = "Profile Updated Successfully";
        this.route.navigate(['/home', {email: data}]);
      },
      error => console.log("Failed")
    )
  }

  cancel(){
    this.route.navigate(['/home', {email: this.user.email}]);
  }
}