import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Admin } from '../model/admin';
import { UserUpdateComponent } from '../user-update/user-update.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  adminColumns: string[] = ['name', 'companyName', 'departmentName','designation','applicationType','address','contactNumber', 'action' ];
  admin_dataSource!: MatTableDataSource<Admin[]>;
  @ViewChild('adminPaginator', { static: true }) adminPaginator!: MatPaginator;
  @ViewChild('adminSort', {static: true}) adminSort!: MatSort;


  admmin = new Admin;
  arr: any = [{"name": "Arun", "companyName": "CAPE", "departmentName": "IT", "designation": "Software", "applicationType": "LV", "address": "chennai", "contactNumber": "8072221229"}];
  

  constructor(private dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.admin_dataSource = this.arr

  }

  profileUpdate() {

  }

  changePassword() {

  }

  logout() {

  }

  proceed(name: any,companyName: any) {
    const dialogRef = this.dialog.open(UserUpdateComponent, {
      width: '500px',
    });
    dialogRef.componentInstance.name = name;
    dialogRef.componentInstance.companyName = companyName;

   
    dialogRef.afterClosed().subscribe(result => {
      // this.refresh();
      // this.retrieveClientDetails();
    });
  }

}
