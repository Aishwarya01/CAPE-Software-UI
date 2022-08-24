import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Register } from '../model/register';
import { ApplicationTypeService } from '../services/application.service';
import { InspectorregisterService } from '../services/inspectorregister.service';
import { SiteService } from '../services/site.service';

@Component({
  selector: 'app-viewer-register',
  templateUrl: './viewer-register.component.html',
  styleUrls: ['./viewer-register.component.css']
})
export class ViewerRegisterComponent implements OnInit {

  viewerRegisterForm = new FormGroup({
    name: new FormControl(''),
    companyName: new FormControl(''),
    email: new FormControl(''),
    contactNumber: new FormControl(''),
    department: new FormControl(''),
    designation: new FormControl(''),
    address: new FormControl(''),
    district: new FormControl(''),
    country: new FormControl(''),
    state: new FormControl(''),
    pinCode: new FormControl(''),
    userType: new FormControl(''),
    terms: new FormControl('')
  });

  loading = true;
  submitted = false;
  msg: any;
  alert: any;
  countryList: any = [];
  stateList: any= [];
  selected: any;
  applicationTypeData: any="";
  register = new Register;
  successMsgOTP: boolean=false;
  errorMsg: any;
  errorMsgflag: boolean=false;
  successMsg: string="";
  isEnabled: boolean = false;
  isChecked: boolean = false;
  countryCode: String = '';
  contactNumber: string = '';
  @Input()
  email: String = '';


  constructor(private formBuilder: FormBuilder,
              private siteService: SiteService,
              private applicationService: ApplicationTypeService,
              private inspectorRegisterService: InspectorregisterService,
              private router: Router,private dialog: MatDialog
              ) { }

  ngOnInit(): void {
    this.countryCode = '91';

    this.viewerRegisterForm = this.formBuilder.group({
      name: ['', [Validators.required,]],
      companyName: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      contactNumber: ['', [Validators.required,Validators.maxLength(10)]],
      department: ['', Validators.required],
      designation: ['', Validators.required],
      address: ['', Validators.required],
      district: [''],
      country: ['', Validators.required],
      state: ['', Validators.required],
      pinCode: ['', Validators.required],
      userType: ['', Validators.required],
      terms: ['', Validators.required]
    });

    // this.siteService.retrieveCountry().subscribe(
    //   data => {
    //     this.countryList = JSON.parse(data);
    //   }
    // )
    // this.dropdownList = [
    //   { item_id: 1, item_text: 'Mumbai' },
    //   { item_id: 2, item_text: 'Bangaluru' },
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' },
    //   { item_id: 5, item_text: 'New Delhi' }
    // ];

   
  }
  
  onItemSelect(item: any) {
    //console.log(item);
  }
  onSelectAll(items: any) {
   // console.log(items);
  }
  get f() {
    return this.viewerRegisterForm.controls;
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


  showSubmit() {
    if(this.isChecked) {
      this.loading = false;
    }
    else{
      this.loading = true;
    }
  }
  cancel(){
    this.dialog.closeAll();
  }
onSubmit() {
  this.submitted = true;

  //Breaks if form is invalid
  if(this.viewerRegisterForm.invalid) {
    return;
  }
  this.loading = true;
  this.contactNumber = "";
  this.contactNumber = "+"+this.countryCode+"-"+this.viewerRegisterForm.value.contactNumber

  this.register.contactNumber = this.contactNumber;
 
//   this.inspectorRegisterService.registerInspector(this.register).subscribe(
//     data=> {
//       this.successMsgOTP=true;
//       this.successMsg="Your application is successfully submitted. You will get mail once when it is approved. Check your e mail. It takes up to "
//       +environment.hoursOfGettingApproved+ "hours for approval."
//       setTimeout(()=>{
//         this.successMsgOTP=false;
//       }, 3000);
//       setTimeout(()=>{
//         this.router.navigate(['/createPassword', {email: this.register.username}])
//       }, 5000);
//     },
//     error => {
//       this.loading= false;
//       this.errorMsgflag=true;
//       this.errorMsg=error.error.message;
//       setTimeout(()=>{
//         this.errorMsgflag=false;
//         this.errorMsg=" ";
//       }, 3000);
//     }
//   )

}
}
