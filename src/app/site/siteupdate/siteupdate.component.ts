import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Site } from 'src/app/model/site';
import { ClientService } from 'src/app/services/client.service';
import { DepartmentService } from 'src/app/services/department.service';
import { SiteService } from 'src/app/services/site.service';

@Component({
  selector: 'app-siteupdate',
  templateUrl: './siteupdate.component.html',
  styleUrls: ['./siteupdate.component.css']
})
export class SiteupdateComponent implements OnInit {

  updateSiteForm = new FormGroup({
    clientName: new FormControl(''),
    departmentName: new FormControl(''),
    siteName: new FormControl(''),
    arr: this.formBuilder.array([this.createItem()]),
    siteLocation: new FormControl(''),
    AddressLine1: new FormControl(''),
    AddressLine2: new FormControl(''),
    siteLandmark: new FormControl(''),
    country: new FormControl(''),
    state: new FormControl(''),
    pincode: new FormControl(''),
  });
  countryCode: any;
  clientList: any = [];
  clientArray: any = [];
  departmentList: any = [];
  countryList: any = [];
  stateList: any = [];
  site = new Site();
  arr: any = [];
  loading = false;
  submitted = false;
  showErrorMessage=false;
  jsonArray: any = [];
  deletedArray: any =[];
  personarr!: FormArray;

  success: boolean=false;
  successMsg: any;
  Error: boolean=false;;
  errorMsg:any;
  validationError: boolean = false;
  validationErrorMsg: String = "";


  @Input()
  userName: String = '';
  @Input()
  clientName: String = '';
  @Input()
  departmentName: String = '';
  @Input()
  siteName: String = '';
  @Input()
  siteId: number = 0;
  @Input()
  siteCd: String = '';
  @Input()
  country: String = '';
  @Input()
  state: String = '';
  @Input()
  city: String = '';
  @Input()
  landMark: String = '';
  @Input()
  addressLine_1: String = '';
  @Input()
  addressLine_2: String = '';
  @Input()
  sitePersons: any = [];
  @Input()
  personInchargeEmail: String = '';
  @Input()
  phoneNumber: number = 0;
  @Input()
  zipCode: number = 0;
  @Input()
  createdBy: String = '';
  @Input()
  createdDate= new Date;


  constructor(public dialog: MatDialog,
              public clientService: ClientService,
              public departmentService: DepartmentService,
              public siteService: SiteService,
              public formBuilder: FormBuilder,
              ) {
              }

  ngOnInit(): void {
    this.site.userName=this.userName;
    this.site.clientName=this.clientName;
    this.site.departmentName=this.departmentName;
    this.site.site=this.siteName;
    this.site.siteId=this.siteId;
    this.site.siteCd=this.siteCd;
    this.site.country=this.country;
    this.site.state=this.state;
    this.site.city=this.city;
    this.site.landMark=this.landMark;
    this.site.addressLine_1=this.addressLine_1;
    this.site.addressLine_2=this.addressLine_2;
    this.site.zipCode=this.zipCode;
    this.site.createdBy=this.createdBy;
    this.site.createdDate=this.createdDate;
    this.populateData();
  }

  cancel() {
    this.dialog.closeAll();
  }

   //country code
   countryChange(country: any, a: any) {
    this.countryCode = country.dialCode;
    a.controls.countryCode.value= this.countryCode;
  }
  // Only Integer Numbers
  keyPressNumbers(event:any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  // Only AlphaNumeric with Some Characters [-_ ]
  keyPressAlphaNumericWithCharacters(event:any) {

    var inp = String.fromCharCode(event.keyCode);
    // Allow numbers, space, underscore
    if (/[0-9-+ ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  createItem() {
    return this.formBuilder.group({
      personIncharge: ['', Validators.required],
      designation: ['', Validators.required],
      contactNo: ['',[Validators.maxLength(10), Validators.required]],
      personInchargeEmail: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      personId: [''],
      inActive: [''],
      countryCode: ['91']
    })
  }

  addItem() {
    this.arr = this.updateSiteForm.get('arr') as FormArray;
    this.arr.push(this.createItem());
  }

  removeItem(index: any, personIncharge: String, designation: String, contactNo: number, personInchargeEmail: String, personId: number, inActive: boolean) {
    if(personIncharge != "" ) {
       this.jsonArray = {"personIncharge": personIncharge, "designation": designation, "contactNo": contactNo, "personInchargeEmail": personInchargeEmail, "personId": personId, "inActive": false}
       this.deletedArray.push(this.jsonArray);
      }
    (this.updateSiteForm.get('arr') as FormArray).removeAt(index);
  }

  getControls(): AbstractControl[] {
    return (<FormArray> this.updateSiteForm.get('arr')).controls
  }

  populateData() {
    for (let item of this.sitePersons) {
      this.arr.push(this.createGroup(item));
    }
    this.updateSiteForm.setControl('arr', this.formBuilder.array(this.arr || []))
  }

  createGroup(item: any): FormGroup {
    return this.formBuilder.group({
      personIncharge: new FormControl({disabled: true ,value: item.personIncharge}),
      designation: new FormControl({disabled: true, value: item.designation}),
      contactNo: new FormControl({disabled: true ,value: item.contactNo}),
      personInchargeEmail: new FormControl({disabled: true,value: item.personInchargeEmail}),
      personId: new FormControl({disabled: true ,value: item.personId}),
      inActive: new FormControl({disabled: true, value:item.inActive}),
      // countryCode: new FormControl(''),

    });
  }

  onSubmit() {
    this.submitted = true;

    //Breaks if form is invalid
    if(this.updateSiteForm.invalid) {
      this.validationError = true;
      this.validationErrorMsg = "Please check all the fields";
      setTimeout(() => {
        this.validationError = false;
      }, 3000);
      return;
    }

    this.loading = true;

    this.site.sitePersons=this.updateSiteForm.getRawValue().arr;

    for(let i of this.site.sitePersons) {
      if((i.countryCode != "") && (i.countryCode != undefined))
      {
        i.contactNo = "+" +i.countryCode + "-" + i.contactNo;
        i.inActive = true
      }
    }

    for( let j of this.deletedArray) {
      if(j.personId != "") {
        this.site.sitePersons.push(j);
      }
    }
    this.siteService.updateSite(this.site).subscribe(
      data=> {
        this.success = true
        this.successMsg = "Site Updated successfully";
        setTimeout(() => {
          this.success = false;
        }, 3000);
        setTimeout(() => {
          this.dialog.closeAll();
        }, 2000);
      },
      error => {
        this.Error = true;
        this.errorMsg = "Something went wrong, kindly check all the fields";
        setTimeout(() => {
          this.Error = false;
        }, 3000);
        this.loading=false;
      }
      )
  }

}
