import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  personIncharge: String = '';
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
    // this.site.personIncharge=this.personIncharge;
    // this.site.personInchargeEmail=this.personInchargeEmail;
    // this.site.phoneNumber=this.phoneNumber;
    this.site.zipCode=this.zipCode;
    this.site.createdBy=this.createdBy;
    this.site.createdDate=this.createdDate;
  }

  cancel() {
    this.dialog.closeAll();
  }

  onSubmit() {
    this.siteService.updateSite(this.site).subscribe(
      data=> {
        this.dialog.closeAll();
      }
      )
  }
}
