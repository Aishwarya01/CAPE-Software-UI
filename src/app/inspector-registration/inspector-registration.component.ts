import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SiteService } from '../services/site.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ApplicationTypeService } from '../services/application.service';
import { Register } from '../model/register';
import { InspectorregisterService } from '../services/inspectorregister.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-inspector-registration',
  templateUrl: './inspector-registration.component.html',
  styleUrls: ['./inspector-registration.component.css']
})
export class InspectorRegistrationComponent implements OnInit {
  dropdownList:any = [];
  selectedItems:any = [];
  //dropdownSettings:any = {};
  dropdownSettings!:IDropdownSettings;

  InspectorRegisterForm = new FormGroup({
    name: new FormControl(''),
    companyName: new FormControl(''),
    email: new FormControl(''),
    contactNumber: new FormControl(''),
    applicationType: new FormControl(''),
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
  modalReference: any;


  constructor(private formBuilder: FormBuilder, private modalService: NgbModal,
              private siteService: SiteService,
              private applicationService: ApplicationTypeService,
              private inspectorRegisterService: InspectorregisterService,
              private router: Router,
              ) { }

  ngOnInit(): void {
    this.countryCode = '91';

    this.InspectorRegisterForm = this.formBuilder.group({
      name: ['', [Validators.required,]],
      companyName: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      contactNumber: ['', [Validators.required,Validators.maxLength(10)]],
      applicationType: ['', Validators.required],
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

    this.siteService.retrieveCountry().subscribe(
      data => {
        this.countryList = JSON.parse(data);
      }
    )
    // this.dropdownList = [
    //   { item_id: 1, item_text: 'Mumbai' },
    //   { item_id: 2, item_text: 'Bangaluru' },
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' },
    //   { item_id: 5, item_text: 'New Delhi' }
    // ];

    this.applicationService.retrieveApplicationTypesV2().subscribe(
      data => {
        this.dropdownList = data;
      }
    );

    // this.selectedItems = [
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' }
    // ];
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
  
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  get f() {
    return this.InspectorRegisterForm.controls;
  }
  termsCondition(termsContent:any){
    this.modalReference = this.modalService.open(termsContent,{size: 'xl'})
  }
  onCancel() {
    this.modalReference.close();
  }
  selectCountry(e: any) {
    let changedValue = e.target.value;
    this.stateList = [];
      for(let arr of this.countryList) {
        if( arr.name == changedValue) {
          this.siteService.retrieveState(arr.code).subscribe(
            data => {
              this.stateList = JSON.parse(data)
            }
          )};
      }
      // if(changedValue == "IND") {
      //   this.siteService.retrieveStateV2(changedValue).subscribe(
      //     data => {
      //       this.stateList = JSON.parse(data)
      //     }
      //   );
      // }
       
  }

  countryChange(country: any) {
    this.countryCode = country.dialCode;
  }

  onSelect(e: any) {
    let selectedValue = e.target.value;
    if(selectedValue == "Viewer") {
      this.isEnabled = false;
      this.InspectorRegisterForm.value.applicationType = [];
      this.InspectorRegisterForm.controls['applicationType'].clearValidators();
      this.InspectorRegisterForm.controls['applicationType'].updateValueAndValidity();
     }
     else{
       this.isEnabled = true;
       this.InspectorRegisterForm.controls['applicationType'].setValidators(Validators.required);
       this.InspectorRegisterForm.controls['applicationType'].updateValueAndValidity();
     }
  }

  showSubmit() {
    if(this.isChecked) {
      this.loading = false;
    }
    else{
      this.loading = true;
    }
  }

onSubmit() {
  this.submitted = true;
  console.log(this.InspectorRegisterForm.value.applicationType)

  //Breaks if form is invalid
  if(this.InspectorRegisterForm.invalid) {
    return;
  }
  this.loading = true;
  this.contactNumber = "";
  this.contactNumber = "+"+this.countryCode+"-"+this.InspectorRegisterForm.value.contactNumber

  this.register.contactNumber = this.contactNumber;

  this.applicationTypeData = "";

  if(this.InspectorRegisterForm.value.applicationType != undefined) {
    for(let i of this.InspectorRegisterForm.value.applicationType) {
      if(i.code != "") {
        this.applicationTypeData += i.code+",";
      }
    }
    this.applicationTypeData = this.applicationTypeData.replace(/,\s*$/, "");
    this.register.applicationType = this.applicationTypeData;
  }

  if(this.register.role == 'Viewer') {
    this.register.permission = 'Yes';
  }
  
  this.inspectorRegisterService.registerInspector(this.register).subscribe(
    data=> {
      this.successMsgOTP=true;
      if(this.register.role == 'Inspector') {
        this.successMsg="Your application is successfully submitted. You will get mail once when it is approved. Check your e mail. It takes up to "
      +environment.hoursOfGettingApproved+ "hours for approval."
      setTimeout(()=>{
        this.successMsgOTP=false;
        this.successMsg = '';
      }, 3000);
      setTimeout(()=>{
        this.router.navigate(['/SignIn'])
      }, 5000);
      }    
      else {
        this.successMsg="Your application is successfully registered."
        setTimeout(()=>{
          this.successMsgOTP=false;
          this.successMsg = '';
        }, 3000);
        setTimeout(()=>{
          this.router.navigate(['/generateOtp', {email: this.register.username}])
        }, 5000);
      }
    },
    error => {
      this.loading= false;
      this.errorMsgflag=true;
      this.errorMsg=error.error.message;
      setTimeout(()=>{
        this.errorMsgflag=false;
        this.errorMsg=" ";
      }, 3000);
    }
  )

}


}
