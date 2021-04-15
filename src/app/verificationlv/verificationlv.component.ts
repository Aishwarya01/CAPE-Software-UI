import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DepartmentaddComponent } from '../Company/departmentadd/departmentadd.component';
import { SiteaddComponent } from '../Company/siteadd/siteadd.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientaddComponent } from '../Company/clientadd/clientadd.component';
import { MatDialog } from '@angular/material/dialog';

export interface PeriodicElement {
  clientName: string;
  inActive: boolean;
  createdDate: Date;
  createdBy: string;
  updatedDate: Date;
  updatedBy: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {clientName: 'WIPRO', inActive: true, createdDate: new Date("26/03/2021"), createdBy: 'Arun', updatedDate: new Date("27/03/2021"), updatedBy: 'Arunkumar'},
  {clientName: 'HCL', inActive: true, createdDate: new Date("26/03/2021"), createdBy: 'AK', updatedDate: new Date("27/03/2021"), updatedBy: 'Arunkumar'},
  {clientName: 'TCS', inActive: true, createdDate: new Date("26/03/2021"), createdBy: 'KUMAR', updatedDate: new Date("27/03/2021"), updatedBy: 'Arunkumar'},
  {clientName: 'CAPE', inActive: true, createdDate: new Date("26/03/2021"), createdBy: 'Arun Kumar', updatedDate: new Date("27/03/2021"), updatedBy: 'Arunkumar'},
  {clientName: 'WIPRO', inActive: true, createdDate: new Date("26/03/2021"), createdBy: 'Arun', updatedDate: new Date("27/03/2021"), updatedBy: 'Arunkumar'},
  {clientName: 'HCL', inActive: true, createdDate: new Date("26/03/2021"), createdBy: 'AK', updatedDate: new Date("27/03/2021"), updatedBy: 'Arunkumar'},
  {clientName: 'TCS', inActive: true, createdDate: new Date("26/03/2021"), createdBy: 'KUMAR', updatedDate: new Date("27/03/2021"), updatedBy: 'Arunkumar'},
  {clientName: 'CAPE', inActive: true, createdDate: new Date("26/03/2021"), createdBy: 'Arun Kumar', updatedDate: new Date("27/03/2021"), updatedBy: 'Arunkumar'},
  {clientName: 'WIPRO', inActive: true, createdDate: new Date("26/03/2021"), createdBy: 'Arun', updatedDate: new Date("27/03/2021"), updatedBy: 'Arunkumar'},
  {clientName: 'HCL', inActive: true, createdDate: new Date("26/03/2021"), createdBy: 'AK', updatedDate: new Date("27/03/2021"), updatedBy: 'Arunkumar'},
  {clientName: 'TCS', inActive: true, createdDate: new Date("26/03/2021"), createdBy: 'KUMAR', updatedDate: new Date("27/03/2021"), updatedBy: 'Arunkumar'},
  {clientName: 'CAPE', inActive: true, createdDate: new Date("26/03/2021"), createdBy: 'Arun Kumar', updatedDate: new Date("27/03/2021"), updatedBy: 'Arunkumar'},
  {clientName: 'WIPRO', inActive: true, createdDate: new Date("26/03/2021"), createdBy: 'Arun', updatedDate: new Date("27/03/2021"), updatedBy: 'Arunkumar'},
  {clientName: 'HCL', inActive: true, createdDate: new Date("26/03/2021"), createdBy: 'AK', updatedDate: new Date("27/03/2021"), updatedBy: 'Arunkumar'},
  {clientName: 'TCS', inActive: true, createdDate: new Date("26/03/2021"), createdBy: 'KUMAR', updatedDate: new Date("27/03/2021"), updatedBy: 'Arunkumar'},
  {clientName: 'CAPE', inActive: true, createdDate: new Date("26/03/2021"), createdBy: 'Arun Kumar', updatedDate: new Date("27/03/2021"), updatedBy: 'Arunkumar'}
];

@Component({
  selector: 'app-verificationlv',
  templateUrl: './verificationlv.component.html',
  styleUrls: ['./verificationlv.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class VerificationlvComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['action','clientName', 'inActive', 'createdDate', 'createdBy', 'updatedDate', 'updatedBy'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  clientList: any = ['User', 'Viewer', 'Admin'];


  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  // ThirdFormGroup: FormGroup;
  // fourthFormGroup: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  constructor(private _formBuilder: FormBuilder,
              private modalService: NgbModal,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  delete() {
    console.log("ARUN");
  }

  addClient() {
    const dialogRef = this.dialog.open(ClientaddComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
  
    });
  }

  addDepartment() {
    const modalRef = this.modalService.open(DepartmentaddComponent);
    // modalRef.componentInstance.email = this.email;
    // modalRef.componentInstance.id = id;
    // modalRef.componentInstance.type = type;
    // modalRef.result.then((result) => {
    //   if (result) {
    //     this.retrieveApplicationTypes();
    //    }
    // });
  }

  addSite() {
    const modalRef = this.modalService.open(SiteaddComponent);
    // modalRef.componentInstance.email = this.email;
    // modalRef.componentInstance.id = id;
    // modalRef.componentInstance.type = type;
    // modalRef.result.then((result) => {
    //   if (result) {
    //     this.retrieveApplicationTypes();
    //    }
    // });
  }

}