import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from '../../../services/client.service';
import { Company } from '../../../model/company';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


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

  @Input()
  email: String = '';
  constructor(public dialog: MatDialog,
              public clientService: ClientService,
              public activeModal: NgbActiveModal ) { 
              }

  ngOnInit(): void {
  }

  cancel() {
    this.dialog.closeAll();
    this.activeModal.close();
  }
 
  onSubmit() {
    this.company.userName=this.email
    console.log(this.company)
    this.clientService.addClient(this.company).subscribe(data=> console.log("HI"))
  }

}
