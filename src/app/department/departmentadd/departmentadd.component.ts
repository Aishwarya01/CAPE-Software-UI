import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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
  loading = false;
  submitted = false;
  showErrorMessage=false;

  @Input()
  email: String = '';
  clientList: any = [];
  SuccessMsg: any;
  errorArr: any=[];
  ErrorMsg: any;
  constructor(public dialog: MatDialog,
              public clientService: ClientService,
              public departmentService: DepartmentService,
              private formBuilder: FormBuilder
              ) {

              }

  ngOnInit(): void {
    this.addDepartmentForm = this.formBuilder.group({
      clientname: ['', Validators.required],
      departmentname: ['', Validators.required]
      });
    this.clientService.retrieveClient(this.email).subscribe(
      data => {
        this.clientList= JSON.parse(data);
      }
    )
  }

  cancel() {
    this.dialog.closeAll();
  }

  get f() {
    return this.addDepartmentForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    //Breaks if form is invalid
    if(this.addDepartmentForm.invalid) {
      return;
    }
    this.loading = true;

    this.department.userName=this.email
    this.departmentService.addDepartment(this.department).subscribe(
      data => {
        this.SuccessMsg=data;
        setTimeout(() => {
          this.dialog.closeAll();
        },3000);
      },
      error => {
        this.showErrorMessage=true;
        this.errorArr = [];
        this.errorArr = JSON.parse(error.error);
        this.ErrorMsg = this.errorArr.message;
        setTimeout(()=>{
          this.addDepartmentForm.reset();
        },3000);
        this.loading=false;
      }
      )
  }

}
