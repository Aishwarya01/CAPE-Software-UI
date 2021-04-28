import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Site } from 'src/app/model/site';

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
  departmentList: any = [];
  countryList: any = [];
  stateList: any = [];
  site = new Site();

  @Input()
  email: String = '';
  constructor(public dialog: MatDialog,
              
               ) { 
              }

  ngOnInit(): void {
  }

  cancel() {
    this.dialog.closeAll();
  }

  onSubmit() {
    // this.clientService.addClient(this.company).subscribe(
    //   data=> {
    //     this.dialog.closeAll();
    //   }
    //   )
  }

}
