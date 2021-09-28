import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Register } from '../model/register';
import { User } from '../model/user';
import { ApplicationTypeService } from '../services/application.service';
import { ProfileService } from '../services/profile.service';
import { SiteService } from '../services/site.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    contactNumber: new FormControl(''),
    userType: new FormControl(''),
    companyName: new FormControl(''),
    department: new FormControl(''),
    designation: new FormControl(''),
    country: new FormControl(''),
    state: new FormControl(''),
    district: new FormControl(''),
    address: new FormControl(''),
    applicationType: new FormControl(''),
    pinCode: new FormControl(''),
  });
  loading = false;
  submitted = false;
  register = new Register();
  msg = "";
  email: String = '';
  ErrorMsg: any;
  errorArr: any=[];
  alert: any;
  countryList: any = [];
  stateList: any= [];
  selected: any;
  applicationTypeData: any="";
  successMsgOTP: boolean=false;
  errorMsg: any;
  errorMsgflag: boolean=false;
  successMsg: string="";
  isEnabled: boolean = false;
  isChecked: boolean = false;
  countryCode: String = '';
  contactNumber: string = '';
  disableValue: boolean = true;

  dropdownList:any = [];
  selectedItems:any = [];
  //dropdownSettings:any = {};
  dropdownSettings!:IDropdownSettings;
  mobileArr: any = [];


  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private route: Router,
    private profileService: ProfileService,
    private siteService: SiteService,
    private applicationService: ApplicationTypeService,
    ) {
      this.register.username=this.router.snapshot.paramMap.get('email') || '{}'
           
    }

  ngOnInit() {
    debugger
    this.countryCode = '91';
    this.mobileArr = [];
    this.profileService.getUser(this.register.username).subscribe(
      data =>{ this.register= JSON.parse(data);
      if(this.register.applicationType != null) {
        this.selectedItems = this.register.applicationType.split(',');
      }
      this.mobileArr= this.register.contactNumber.split('-');
      }
    )
    this.applicationService.retrieveApplicationTypesV2().subscribe(
      data => {
        this.dropdownList = data;
      }
    );
    
    setTimeout(()=>{
      this.profileForm = this.formBuilder.group({
        name: [this.register.name, Validators.required],
        email: [this.register.username],
        contactNumber: [this.mobileArr[1], Validators.required],
        userType: [this.register.role],
        companyName: [this.register.companyName],
        department: [this.register.department],
        designation: [this.register.designation],
        country: [this.register.country, Validators.required],
        state: [this.register.state, Validators.required],
        district: [this.register.district],
        address: [this.register.address, Validators.required],
        applicationType: [this.selectedItems],
        pinCode: [this.register.pinCode, Validators.required],
      });
    }, 3000);    

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'code',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    

  }

  onItemSelect(e: any) {

  }
  

  selectCountry(e: any) {
    let changedValue = e.target.value;
    this.stateList = [];
      // for(let arr of this.countryList) {
      //   if( arr.name == changedValue) {
      //     this.siteService.retrieveState(arr.code).subscribe(
      //       data => {
      //         this.stateList = JSON.parse(data)
      //       }
      //     )};
      // }
      if(changedValue == "IND") {
        this.siteService.retrieveStateV2(changedValue).subscribe(
          data => {
            this.stateList = JSON.parse(data)
          }
        );
      }
       
  }

  countryChange(country: any) {
    this.countryCode = country.dialCode;
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
    this.contactNumber = "";
    this.contactNumber = "+"+this.countryCode+"-"+this.profileForm.value.contactNumber

    this.register.contactNumber = this.contactNumber;

    this.profileService.updateRegister(this.register).subscribe(
      data=> {
        this.successMsgOTP=true;
        this.successMsg="You have successfully updated profile"
        setTimeout(()=>{
          this.successMsgOTP=false;
          this.successMsg="";
        }, 3000);
        // setTimeout(()=>{
        //   this.router.navigate(['/createPassword', {email: this.register.username}])
        // }, 5000);
      },
      error => {
        this.loading= false;
        this.errorMsgflag=true;
        this.errorArr = JSON.parse(error.error)
        this.errorMsg=this.errorArr.message;
        setTimeout(()=>{
          this.errorMsgflag=false;
          this.errorMsg=" ";
        }, 3000);
      }
    )
  
  }
  
  
  cancel(){
    setTimeout(() => {
      this.route.navigate(['/home', {email: this.register.username}]);
    }, 3000);
  }
}
