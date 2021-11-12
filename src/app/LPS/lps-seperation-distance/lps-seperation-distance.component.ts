import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  validationError: boolean = false;
  validationErrorMsg: String = '';
  successMsg: string="";
  errorMsg: string="";
  success: boolean=false;
  Error: boolean=false;
  errorArr: any=[];
  disable: boolean = false;
 
  constructor(

    private formBuilder: FormBuilder,
    private separatedistanceService: SeparatedistanceService,
    private modalService: NgbModal,
  ) {  }


  gotoNextModal(content: any) {
    if (this.separeteDistanceForm.invalid) {
      this.validationError = true;
      
      this.validationErrorMsg = 'Please check all the fields';
      setTimeout(() => {
        this.validationError = false;
      }, 3000);
      return;
    }
    this.modalService.open(content, { centered: true });
  }

  ngOnInit(): void {

    this.separeteDistanceForm = this.formBuilder.group({
      separateDistanceDescriptionArr: this.formBuilder.array([this.separateDistanceArrForm()])
    });
  }
  private separateDistanceArrForm(): FormGroup {
    return new FormGroup({
      seperationDistanceDesc: new FormControl('',Validators.required),
      seperationDistanceOb: new FormControl('',Validators.required),
      seperationDistanceRem: new FormControl('',Validators.required),

    })
  }
  getseparateDistanceDescriptionControls(): AbstractControl[] {
    return (<FormArray>this.separeteDistanceForm.get('separateDistanceDescriptionArr')).controls
  }
  add() {
    this.separateDistanceDescriptionArr = this.separeteDistanceForm.get('separateDistanceDescriptionArr') as FormArray;
    this.separateDistanceDescriptionArr.push(this.separateDistanceArrForm());

  }


  closeModalDialog() {
    if (this.errorMsg != '') {
      this.Error = false;
      this.modalService.dismissAll((this.errorMsg = ''));
    } else {
      this.success = false;
      this.modalService.dismissAll((this.successMsg = ''));
    }
  }
  onSubmit() {


    this.separatedistance.userName = "Sivaraju@capeindia.net";
    this.separatedistance.basicLpsId =988;
    this.submitted = true;
    if (this.separeteDistanceForm.invalid) {
      return;
    }

    this.separatedistance.separateDistanceDescription = this.separeteDistanceForm.value.separateDistanceDescriptionArr;
    this.separatedistanceService.saveSeparateDistance(this.separatedistance).subscribe(
      (data) => {
        this.success = true;
        this.successMsg = data;
        this.disable = true;
      },
      (error) => {
        this.Error = true;
        this.errorArr = [];
        this.errorArr = JSON.parse(error.error);
        this.errorMsg = this.errorArr.message;
      }
    );
    console.log(this.separatedistance);

  }

  removeItem(index: any) {
    (this.separeteDistanceForm.get('separateDistanceDescriptionArr') as FormArray).removeAt(index);
    }
}
