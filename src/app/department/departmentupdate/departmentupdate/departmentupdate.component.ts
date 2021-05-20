import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Department } from 'src/app/model/department';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-departmentupdate',
  templateUrl: './departmentupdate.component.html',
  styleUrls: ['./departmentupdate.component.css']
})
export class DepartmentupdateComponent implements OnInit {

  updateDepartmentForm = new FormGroup({
    clientName: new FormControl(''),
    departmentName: new FormControl(''),
  }); 
department = new Department;
  @Input()
  departmentId: number = 0;
  @Input()
  clientName: String = '';
  @Input()
  departmentName: String = '';
  @Input()
  email: String = '';
  @Input()
  createdBy: String = '';
  @Input()
  createdDate= new Date;

  @Input()
  departmentCd: String = '';

  constructor(public dialog: MatDialog,
              public departmentService: DepartmentService ) { 
              }

  ngOnInit(): void {
    this.department.userName=this.email
    this.department.departmentId=this.departmentId;
    this.department.clientName=this.clientName;
    this.department.departmentName=this.departmentName;
    this.department.createdBy=this.createdBy;
    this.department.createdDate=this.createdDate;
    this.department.departmentCd = this.departmentCd;
  }

  cancel() {
    this.dialog.closeAll();
  }
 
  onSubmit() {
    this.departmentService.updateDepartment(this.department).subscribe(data=> 
      {
        this.dialog.closeAll();
      })
  }
}
