import { Component,Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-departmentadd',
  templateUrl: './departmentadd.component.html',
  styleUrls: ['./departmentadd.component.css']
})
export class DepartmentaddComponent implements OnInit {

  clientList: any = ['User', 'Viewer', 'Admin'];
  
  
  constructor(public dialog:MatDialog) { 

  }

  ngOnInit(): void {

  }

  cancel(){

    this.dialog.closeAll();

  }
  
  onSubmit() {
    
  }
  

}
