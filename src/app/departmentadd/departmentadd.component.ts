import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-departmentadd',
  templateUrl: './departmentadd.component.html',
  styleUrls: ['./departmentadd.component.css']
})
export class DepartmentaddComponent implements OnInit {

  clientList: any = ['User', 'Viewer', 'Admin'];

  constructor() { }

  ngOnInit(): void {
  }

}
