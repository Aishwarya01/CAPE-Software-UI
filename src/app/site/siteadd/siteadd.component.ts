import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
    email: new FormControl(''),
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

  @Input()
  email: String = '';
  constructor(public dialog: MatDialog,
              public clientService: ClientService,
              public departmentService: DepartmentService,
              public siteService: SiteService,
              ) { 
              }

  ngOnInit(): void {
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

  changeClient(e: any) {
    let changedValue = e.target.value;
    this.departmentList = [];
    for(let arr of this.clientArray) {
      if( arr.clientName == changedValue) {
        for(let arr1 of arr.department) {
          this.departmentList.push(arr1.departmentName)
        }
      }
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

  onSubmit() {
    this.site.userName = this.email;
    this.siteService.addSIte(this.site).subscribe(
      data=> {
        this.dialog.closeAll();
      }
      )
  }

}
