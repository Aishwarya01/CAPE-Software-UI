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

  createItem() {
    return this.formBuilder.group({
      personIncharge: ['', Validators.required],
      designation: ['', Validators.required],
      contactNo: ['', Validators.required],
      personInchargeEmail: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      personId: [''],
      inActive: ['']
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
      inActive: new FormControl({disabled: true, value:item.inActive})
    });
  }

  onSubmit() {
    this.submitted = true;

    //Breaks if form is invalid
    if(this.updateSiteForm.invalid) {
      return;
    }

    this.loading = true;
    for(let i of this.updateSiteForm.value.arr) {
      if(i.inActive == "") {
        i.inActive = true;
      }
    }
    debugger
    this.site.sitePersons=this.updateSiteForm.value.arr.getRawValue();
      
    for( let j of this.deletedArray) {
      this.site.sitePersons.push(j);
    }
    console.log(this.site)
    this.siteService.updateSite(this.site).subscribe(
      data=> {
        this.dialog.closeAll();
      },
      error => {
        this.showErrorMessage=true;
        this.loading=false;
      }
      )
  }

  }
