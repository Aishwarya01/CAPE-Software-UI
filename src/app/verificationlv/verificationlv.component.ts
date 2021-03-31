import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

export interface PeriodicElement {
  clientName: string;
  inActive: boolean;
  createdDate: Date;
  createdBy: string;
  updatedDate: Date;
  updatedBy: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {clientName: 'WIPRO', inActive: true, createdDate: new Date("26/03/2021"), createdBy: 'Arun', updatedDate: new Date("27/03/2021"), updatedBy: 'Arunkumar'},
];

@Component({
  selector: 'app-verificationlv',
  templateUrl: './verificationlv.component.html',
  styleUrls: ['./verificationlv.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class VerificationlvComponent implements OnInit {
  displayedColumns: string[] = ['clientName', 'inActive', 'createdDate', 'createdBy', 'updatedDate', 'updatedBy'];
  dataSource = ELEMENT_DATA;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  // ThirdFormGroup: FormGroup;
  // fourthFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    // this.ThirdFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required]
    // });
    // this.fourthFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required]
    // });
  }

  delete() {
    console.log("ARUN");
  }

}