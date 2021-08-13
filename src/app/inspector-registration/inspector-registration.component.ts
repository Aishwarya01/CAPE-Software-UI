import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SiteService } from '../services/site.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ApplicationTypeService } from '../services/application.service';
import { Register } from '../model/register';
import { InspectorregisterService } from '../services/inspectorregister.service';
import { Router } from '@angular/router';


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
    interestedArea: new FormControl(''),
    
  });

  loading = false;
  submitted = false;
  msg: any;
  alert: any;
  countryList: any = [];
  stateList: any= [];
  selected: any;
  applicationTypeData: any="";
  register = new Register;


  constructor(private formBuilder: FormBuilder,
              private siteService: SiteService,
              private applicationService: ApplicationTypeService,
              private inspectorRegisterService: InspectorregisterService,
              private router: Router,
              ) { }

  ngOnInit(): void {

    this.InspectorRegisterForm = this.formBuilder.group({
      name: ['', [Validators.required,]],
      companyName: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      contactNumber: ['', Validators.required],
      applicationType: ['', Validators.required],
      department: ['', Validators.required],
      designation: ['', Validators.required],
      address: ['', Validators.required],
      district: [''],
      country: ['', Validators.required],
      state: ['', Validators.required],
      pinCode: ['', Validators.required],
      interestedArea: ['', Validators.required],
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


  selectCountry(e: any) {
    debugger
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

onSubmit() {
  this.submitted = true;
  console.log(this.InspectorRegisterForm.value.applicationType)

  //Breaks if form is invalid
  if(this.InspectorRegisterForm.invalid) {
    return;
  }
  this.loading = true;

  this.applicationTypeData = "";

  for(let i of this.InspectorRegisterForm.value.applicationType) {
    if(i.code != "") {
      this.applicationTypeData += i.code+",";
    }
  }
  this.applicationTypeData = this.applicationTypeData.replace(/,\s*$/, "");
  this.register.applicationType = this.applicationTypeData;

    
  this.inspectorRegisterService.registerInspector(this.register).subscribe(
    data=> {
      this.router.navigate(['/login']);
    },
    error => {
      this.loading= false;
      console.log("error")
    }
  )

}


}
