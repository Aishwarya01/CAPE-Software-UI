import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EarthStud } from 'src/app/LPS_model/earth-stud';
import { EarthStudService } from 'src/app/LPS_services/earth-stud.service';

@Component({
  selector: 'app-lps-earth-stud',
  templateUrl: './lps-earth-stud.component.html',
  styleUrls: ['./lps-earth-stud.component.css']
})
export class LpsEarthStudComponent implements OnInit {

  EarthStudForm!: FormGroup;
  submitted=false;
  earthStud = new EarthStud;

  constructor(
    private formBuilder: FormBuilder,
    private earthStudService: EarthStudService
    ) { }

  ngOnInit(): void {
    this.EarthStudForm = this.formBuilder.group({

      // userName: ['', Validators.required],
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
    this.earthStud.userName="";
    this.earthStud.basicLpsId=99;
    this.earthStudService.saveEarthStud(this.earthStud).subscribe(

      data => {
      },
      error => {
      })
   
  
  };
  
  get f() {
    return this.EarthStudForm.controls;
  }
}
