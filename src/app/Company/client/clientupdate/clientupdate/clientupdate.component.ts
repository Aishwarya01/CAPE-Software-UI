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

  @Input()
  clientName: String = '';
  @Input()
  inActive: boolean = false;
  @Input()
  email: String = '';
  constructor(public dialog: MatDialog,
              public clientService: ClientService ) { 
              }

  ngOnInit(): void {
    this.company.clientName=this.clientName;
    this.company.inActive=this.inActive;
  }

  cancel() {
    this.dialog.closeAll();
  }
 
  onSubmit() {
    console.log(this.email);
    this.company.userName=this.email
    console.log(this.company)
    this.clientService.updateClient(this.company).subscribe(data=> {
      this.dialog.closeAll();
    })
  }

}
