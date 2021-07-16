import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Site } from 'src/app/model/site';
import { ClientService } from 'src/app/services/client.service';
import { DepartmentService } from 'src/app/services/department.service';
import { SiteService } from 'src/app/services/site.service';

@Component({
  selector: 'app-siteadd',
  templateUrl: './siteadd.component.html',
  styleUrls: ['./siteadd.component.css']
})
export class SiteaddComponent implements OnInit {

  addSiteForm = new FormGroup({
    clientName: new FormControl(''),
    departmentName: new FormControl(''),
    siteName: new FormControl(''),
    personIncharge: new FormControl(''),
    contactNo: new FormControl(''),
    personInchargeEmail: new FormControl(''),
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
  loading = false;
  submitted = false;
  showErrorMessage=false;
  arr!: FormArray;


  @Input()
  email: String = '';
  constructor(public dialog: MatDialog,
              public clientService: ClientService,
              public departmentService: DepartmentService,
              public siteService: SiteService,
              public formBuilder: FormBuilder
              ) {
              }

  ngOnInit(): void {
    this.addSiteForm = this.formBuilder.group({
      clientName: ['', Validators.required],
      departmentName: ['', Validators.required],
      siteName: ['', Validators.required],
      arr: this.formBuilder.array([this.createItem()]),
      siteLocation: ['', Validators.required],
      AddressLine1: ['', Validators.required],
      AddressLine2: ['', Validators.required],
      siteLandmark: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required],
      });
    this.clientService.retrieveClient(this.email).subscribe(
      data => {
        this.clientArray = [];
        this.clientList = JSON.parse(data);
        for(let arr of JSON.parse(data)) {
          this.clientArray.push(arr);
        }
      }
    )

    this.siteService.retrieveCountry().subscribe(
      data => {
        this.countryList = JSON.parse(data);
      }
    )
  }

    //**Important */
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

  changeClient(e: any) {
    let changedValue = e.target.value;
    this.departmentList = [];
      for(let arr of this.clientList) {
        if( arr.clientName == changedValue) {
          this.departmentService.retrieveDepartment(this.email,arr.clientName).subscribe(
            data => {
              this.departmentList = JSON.parse(data)
            }
          )};
      }
  }

  changeCountry(e: any) {
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
  }

  cancel() {
    this.dialog.closeAll();
  }

  get f() {
    return this.addSiteForm.controls;
  }

  createItem() {
    return this.formBuilder.group({
      personIncharge: ['', Validators.required],
      designation: ['', Validators.required],
      contactNo: ['', Validators.required],
      personInchargeEmail: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    })
  }

  addItem() {
    this.arr = this.addSiteForm.get('arr') as FormArray;
    this.arr.push(this.createItem());
  }

  removeItem(index: any) {
    (this.addSiteForm.get('arr') as FormArray).removeAt(index);
  }

  getControls(): AbstractControl[] {
    return (<FormArray> this.addSiteForm.get('arr')).controls
  }


  onSubmit() {
    this.submitted = true;

    //Breaks if form is invalid
    if(this.addSiteForm.invalid) {
      return;
    }
    this.loading = true;
    console.log(this.addSiteForm.value.arr);

    this.site.sitePersons=this.addSiteForm.value.arr;
    for(let i of this.site.sitePersons) {
      i.inActive=true;
    }
    console.log(this.site)
    this.site.userName = this.email;
    this.siteService.addSIte(this.site).subscribe(
      data=> {
        this.dialog.closeAll();
      },
      error => {
        this.showErrorMessage=true;
        this.addSiteForm.reset();
        this.loading=false;
      }
      )
  }

}
