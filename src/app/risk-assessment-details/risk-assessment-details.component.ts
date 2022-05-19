import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-risk-assessment-details',
  templateUrl: './risk-assessment-details.component.html',
  styleUrls: ['./risk-assessment-details.component.css']
})
export class RiskAssessmentDetailsComponent implements OnInit {
  step2Form!: FormGroup;
  panelOpenState = false;
  loading = false;
  submitted = false;
  validationError = false;
  validationErrorMsg = '';
  constructor(private router: ActivatedRoute,
              private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.step2Form = this.formBuilder.group({
      location: [''],
      otherLocation: [''],
      groundFlashDensity: [''],
      typeOfBuilding: [''],
      designation: [''],
    });
  }

  onKeyForm(e: any) {

  }

  onChangeForm(e: any) {

  }

  get f():any {
    return this.step2Form.controls;
  }

  submit() {

  }

}
