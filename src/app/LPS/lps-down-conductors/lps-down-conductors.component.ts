import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-lps-down-conductors',
  templateUrl: './lps-down-conductors.component.html',
  styleUrls: ['./lps-down-conductors.component.css']
})
export class LpsDownConductorsComponent implements OnInit {

  downConductorForm! : FormGroup;
  downArr! : FormArray;

  constructor(
    private formBuilder : FormBuilder,
  ) { }

  ngOnInit(): void {
    this.downConductorForm = this.formBuilder.group({
    downArr: this.formBuilder.array([this.createDownArrForm()])
  });
  }

  downConductorControls(): AbstractControl[] {
    return (<FormArray> this.downConductorForm.get('downArr')).controls
  }

  private createDownArrForm(): FormGroup {

    return new FormGroup({
      description: new FormControl(''),
      remarks: new FormControl(''),
      materialDes: new FormControl(''),
      materialRemarks: new FormControl(''),
      sideDes: new FormControl(''),
      sideRemarks: new FormControl(''),
      insulatedDes: new FormControl(''),
      insulatedRemarks: new FormControl(''),
      downDes: new FormControl(''),
      downRemarks: new FormControl(''),
      gutterDes: new FormControl(''),
      gutterRemarks: new FormControl(''),
      ensureDes: new FormControl(''),
      ensureRemarks: new FormControl(''),
      equipDes: new FormControl(''),
      equipRemarks: new FormControl(''),
      perimeterDes: new FormControl(''),
      perimeterRemarks: new FormControl(''),
      maxDes: new FormControl(''),
      maxRemarks: new FormControl(''),
      miniDes: new FormControl(''),
      miniRemarks: new FormControl(''),
      totalDes: new FormControl(''),
      totalRemarks: new FormControl(''),
      numberDes: new FormControl(''),
      numberRemarks: new FormControl(''),
      passedDes: new FormControl(''),
      passedRemarks: new FormControl(''),
      failedDes: new FormControl(''),
      failedRemarks: new FormControl('')
    })
  }

  submit(){
      this.downArr = this.downConductorForm.get('downArr') as FormArray;
      this.downArr.push(this.createDownArrForm());
      console.log(this.downConductorForm)
    }
  }

