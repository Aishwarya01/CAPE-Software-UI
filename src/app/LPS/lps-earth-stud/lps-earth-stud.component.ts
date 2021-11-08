import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EarthStud } from 'src/app/LPS_model/earth-stud';

@Component({
  selector: 'app-lps-earth-stud',
  templateUrl: './lps-earth-stud.component.html',
  styleUrls: ['./lps-earth-stud.component.css']
})
export class LpsEarthStudComponent implements OnInit {

  EarthStudForm: FormGroup;
  submitted=false;
  earthStud = new EarthStud;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.EarthStudForm = this.formBuilder.group({

      userName: ['', Validators.required],
      earthStudVisibilityOb: ['', Validators.required],
      earthStudVisibilityRem: [''],
      earthStudBendOb: ['', Validators.required],
      earthStudBendRem: [''],
      properBondingRailOb: ['', Validators.required],
      properBondingRailRem: [''],
      physicalDamageStudOb: ['', Validators.required],
      physicalDamageStudRem: [''],
      continutyExistaEarthOb: ['', Validators.required],
      continutyExistaEarthRem: ['']
    });
  }

  onSubmit(){
    this.submitted=true;
    console.log(this.EarthStudForm.value);
  }
  get f() {
    return this.EarthStudForm.controls;
  }
}
