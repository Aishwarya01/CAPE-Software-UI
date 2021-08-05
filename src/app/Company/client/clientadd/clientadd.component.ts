import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from '../../../services/client.service';
import { Company } from '../../../model/company';
import { ActivatedRoute } from '@angular/router';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';




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
  loading = false;
  submitted = false;
  showErrorMessage=false;
  msg: any;


  @Input()
  email: String = '';
  constructor(public dialog: MatDialog,
              public clientService: ClientService,
              private formBuilder: FormBuilder,
               ) {
              }

  ngOnInit(): void {
    this.addClientForm = this.formBuilder.group({
      clientName: ['', Validators.required],
      isActive: ['', Validators.required]
      });
  }


  cancel() {
    this.dialog.closeAll();
  }

  get f() {
    return this.addClientForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    //Breaks if form is invalid
    if(this.addClientForm.invalid) {
      return;
    }
    this.loading = true;

    this.company.userName=this.email
    this.clientService.addClient(this.company).subscribe(
      data => {
        debugger
        this.msg=data;
        setTimeout(()=>{
          this.dialog.closeAll();
        },3000)
      },
      error => {
        debugger
        console.log(error);
        this.showErrorMessage=error.error.message;
        setTimeout(()=>{
          this.addClientForm.reset();
        },3000);
        this.loading=false;
      }
      )
  }

}
