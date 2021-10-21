import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-lps-air-termination',
  templateUrl: './lps-air-termination.component.html',
  styleUrls: ['./lps-air-termination.component.css']
})
export class LpsAirTerminationComponent implements OnInit {


  airTerminationfrom!: FormGroup;

  testaccordianArr!: FormArray;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.airTerminationfrom = this.formBuilder.group({
      testaccordianArr: this.formBuilder.array([])
      
    });
  }

  getTestControls(): AbstractControl[] {
    return (<FormArray>this.airTerminationfrom.get('testaccordianArr')).controls;
  }

}
