import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Company } from 'src/app/model/company';
import { Department } from 'src/app/model/department';
import { ClientService } from 'src/app/services/client.service';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-departmentadd',
  templateUrl: './departmentadd.component.html',
  styleUrls: ['./departmentadd.component.css']
})
export class DepartmentaddComponent implements OnInit {

  addDepartmentForm = new FormGroup({
    clientname: new FormControl(''),
    departmentname: new FormControl('')
  }); 
  department = new Department();

  @Input()
  email: String = '';
  clientList: any = [];
  constructor(public dialog: MatDialog,
              public clientService: ClientService,
              public departmentService: DepartmentService) { 
                
              }

  ngOnInit(): void {
    console.log(this.email)
    this.clientService.retrieveClient(this.email).subscribe(
      data => {       
        this.clientList= JSON.parse(data);
      }
    )
  }

  cancel() {
    this.dialog.closeAll();
  }

  onSubmit() {
    this.department.userName=this.email
    console.log(this.department)
    this.departmentService.addDepartment(this.department).subscribe(
      data=> {
        this.dialog.closeAll();
      }
      )
  }

}
