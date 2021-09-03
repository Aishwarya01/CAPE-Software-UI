import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddlicenseComponent } from '../addlicense/addlicense.component';
import { AssignViewerComponent } from '../assign-viewer/assign-viewer.component';
import { Site } from '../model/site';

export interface PeriodicElement {
  siteCd: string;
  site: string;
  country: string;
  city: string;
  createdDate: string;
  createdBy: string;
  updatedDate: string;
  updatedBy: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {siteCd: 'CODE', site: 'Arun', country: 'India', city: 'chennai', createdDate: '1/1/2021', createdBy: 'Arun K', updatedDate: '1/1/2021', updatedBy: 'Arun K'},
  {siteCd: 'CODE1', site: 'Arun1', country: 'India', city: 'chennai', createdDate: '2/1/2021', createdBy: 'Arun Kumar', updatedDate: '1/1/2021', updatedBy: 'Arun Kumar'},
  {siteCd: 'CODE2', site: 'Arun2', country: 'India', city: 'chennai', createdDate: '3/1/2021', createdBy: 'Arun K', updatedDate: '1/1/2021', updatedBy: 'Arun K'},
  {siteCd: 'CODE3', site: 'Arun3', country: 'India', city: 'chennai', createdDate: '4/1/2021', createdBy: 'Arun', updatedDate: '1/1/2021', updatedBy: 'Arun'},
  {siteCd: 'CODE4', site: 'Arun4', country: 'India', city: 'chennai', createdDate: '5/1/2021', createdBy: 'AK', updatedDate: '1/1/2021', updatedBy: 'AK'},
  {siteCd: 'CODE5', site: 'Arun5', country: 'India', city: 'chennai', createdDate: '6/1/2021', createdBy: 'Arun', updatedDate: '1/1/2021', updatedBy: 'Arun'},
];

@Component({
  selector: 'app-licenselist',
  templateUrl: './licenselist.component.html',
  styleUrls: ['./licenselist.component.css']
})

export class LicenselistComponent implements OnInit {

  licenseForm = new FormGroup({
    noOfAvailableLicense: new FormControl(''),
  })
  
  panelOpenState = false;
  noofLicense: number=0;
  

  ongoingSiteColumns: string[] = [
    'siteCd',
    'site',
    'country',
    'city',
    'createdDate',
    'createdBy',
    'updatedDate',
    'updatedBy',
    'action',
  ];
  // ongoingSite_dataSource!: MatTableDataSource<Site[]>;
  ongoingSite_dataSource = ELEMENT_DATA;
  @ViewChild('ongoingSitePaginator', { static: true }) ongoingSitePaginator!: MatPaginator;
  @ViewChild('ongoingSiteSort', { static: true }) ongoingSiteSort!: MatSort;

  completedLicenseColumns: string[] = [
    'siteCd',
    'site',
    'country',
    'city',
    'createdDate',
    'createdBy',
    'updatedDate',
    'updatedBy',
    'action',
  ];

  
  // completedLicense_dataSource!: MatTableDataSource<Site[]>;
  completedLicense_dataSource = ELEMENT_DATA;
  @ViewChild('completedLicensePaginator', { static: true }) completedLicensePaginator!: MatPaginator;
  @ViewChild('completedLicenseSort', { static: true }) completedLicenseSort!: MatSort;
  disableUse: boolean = false;


  constructor(private formBuilder: FormBuilder,
              private dialog: MatDialog,

              ) { }

  ngOnInit(): void {
    this.licenseForm = this.formBuilder.group({
      noOfAvailableLicense: [this.noofLicense],
    })
  }

  decreaseLicense() {
    if(this.noofLicense >0) {
      this.noofLicense--;
    }
    if(this.noofLicense == 0) {
      this.disableUse = true;
    }
    else{
      this.disableUse = false;
    }

    const dialogRef = this.dialog.open(AssignViewerComponent, {
      width: '500px',
    });
    // dialogRef.componentInstance.email = this.email;
    dialogRef.afterClosed().subscribe((result) => {
      // this.refresh();
      console.log(result);
      // this.retrieveClientDetails();
    });
  }

  purchaseLicense() {
    this.noofLicense= this.noofLicense+5;
    const dialogRef = this.dialog.open(AddlicenseComponent, {
      width: '500px',
    });
    // dialogRef.componentInstance.email = this.email;
    dialogRef.afterClosed().subscribe((result) => {
      // this.refresh();
      // this.retrieveClientDetails();
    });
  }

}
