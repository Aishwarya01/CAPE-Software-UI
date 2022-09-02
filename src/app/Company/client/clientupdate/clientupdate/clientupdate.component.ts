import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Company } from 'src/app/model/company';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-clientupdate',
  templateUrl: './clientupdate.component.html',
  styleUrls: ['./clientupdate.component.css']
})
export class ClientupdateComponent implements OnInit {


  addClientForm = new FormGroup({
    clientName: new FormControl(''),
    isActive: new FormControl('')
  });
  company = new Company();
  SuccessMsg: any;
  ErrorMsg: any;

  @Input()
  companyId: number;
  @Input()
  clientName: String = '';
  @Input()
  inActive: boolean = false;
  @Input()
  email: String = '';
  @Input()
  createdBy: String = '';
  @Input()
  createdDate= new Date;

  @Input()
  companyCd: String = '';

  constructor(public dialog: MatDialog,
              public clientService: ClientService ) {
              }

  ngOnInit(): void {
    this.company.companyId=this.companyId;
    this.company.clientName=this.clientName;
    this.company.inActive=this.inActive;
    this.company.createdBy=this.createdBy;
    this.company.createdDate=this.createdDate;
    this.company.companyCd = this.companyCd;
  }

  cancel() {
    this.dialog.closeAll();
  }

  onSubmit() {
    this.company.userName=this.email
    this.clientService.updateClient(this.company).subscribe(
      data=>{
        this.SuccessMsg=data;
        setTimeout(()=>{
          this.dialog.closeAll();
        },3000);
      },error=>{
        //console.log(error);
        this.ErrorMsg=error;
      })
  }
}
