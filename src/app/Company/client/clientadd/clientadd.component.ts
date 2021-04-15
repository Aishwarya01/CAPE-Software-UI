import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from '../../../services/client.service';
import { Company } from '../../../model/company';


@Component({
  selector: 'app-clientadd',
  templateUrl: './clientadd.component.html',
  styleUrls: ['./clientadd.component.css']
})
export class ClientaddComponent implements OnInit {

  addClientForm = new FormGroup({
    clientName: new FormControl(''),
    isActive: new FormControl('')
  }); 
  company = new Company();
  constructor(public dialog: MatDialog,
              public clientService: ClientService) { }

  ngOnInit(): void {
  }

  cancel() {
    this.dialog.closeAll();
  }
 
  onSubmit() {
    this.clientService.addClient(this.company).subscribe();
  }

}
