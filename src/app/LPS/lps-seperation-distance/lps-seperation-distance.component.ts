import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Separatedistance } from 'src/app/LPS_model/separatedistance';
import { SeparatedistanceService } from 'src/app/LPS_services/separatedistance.service';


@Component({
  selector: 'app-lps-seperation-distance',
  templateUrl: './lps-seperation-distance.component.html',
  styleUrls: ['./lps-seperation-distance.component.css']
})
export class LpsSeperationDistanceComponent implements OnInit {

  i: any;
  separatedistance = new Separatedistance();
  separeteDistanceForm!: FormGroup;
  // separeteDistanceForm = new FormGroup({
  // });

  separateDistanceDescriptionArr!: FormArray;
  submitted!: boolean;
  email: any;
  router: any;
  constructor(

    private formBuilder: FormBuilder,
    private separatedistanceService: SeparatedistanceService,
  ) {


  }

  ngOnInit(): void {

    this.separeteDistanceForm = this.formBuilder.group({
      separateDistanceDescriptionArr: this.formBuilder.array([this.separateDistanceArrForm()])
    });
  }
  private separateDistanceArrForm(): FormGroup {
    return new FormGroup({
      seperationDistanceDesc: new FormControl(''),
      seperationDistanceOb: new FormControl(''),
      seperationDistanceRem: new FormControl(''),

    })
  }
  getseparateDistanceDescriptionControls(): AbstractControl[] {
    return (<FormArray>this.separeteDistanceForm.get('separateDistanceDescriptionArr')).controls
  }
  add() {
    this.separateDistanceDescriptionArr = this.separeteDistanceForm.get('separateDistanceDescriptionArr') as FormArray;
    this.separateDistanceDescriptionArr.push(this.separateDistanceArrForm());

  }

  onSubmit() {


    this.separatedistance.userName = "Sivaraju@capeindia.net";

    this.separatedistance.basicLpsId = 44;
    this.submitted = true;
    if (this.separeteDistanceForm.invalid) {
      return;
    }

    this.separatedistance.separateDistanceDescription = this.separeteDistanceForm.value.separateDistanceDescriptionArr;
    console.log(this.separeteDistanceForm.value)
    this.separatedistanceService.saveSeparateDistance(this.separatedistance).subscribe(
      data => {

      },
      error => {

      }
    );
    console.log(this.separatedistance);

  }
}
