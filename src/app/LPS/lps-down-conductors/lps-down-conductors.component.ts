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
  bridgingArr!: FormArray;
  holderArr!: FormArray;
  connectorArr!: FormArray;
  lightArr!: FormArray;

  constructor(
    private formBuilder : FormBuilder,
  ) { }

  ngOnInit(): void {
    this.downConductorForm = this.formBuilder.group({
    downArr: this.formBuilder.array([this.createDownArrForm()]),
    bridgingArr: this.formBuilder.array([this.createBridgeArrForm()]),
    holderArr: this.formBuilder.array([this.createHolderArrForm()]),
    connectorArr: this.formBuilder.array([this.createConnectorArrForm()]),
    lightArr: this.formBuilder.array([this.createLightArrForm()])
  });
  }

  downConductorControls(): AbstractControl[] {
    return (<FormArray> this.downConductorForm.get('downArr')).controls
  }

  bridgingCablesControls(): AbstractControl[] {
    return (<FormArray> this.downConductorForm.get('bridgingArr')).controls
  }

  holdersControls(): AbstractControl[] {
    return (<FormArray> this.downConductorForm.get('holderArr')).controls
  }

  connectorsControls(): AbstractControl[] {
    return (<FormArray> this.downConductorForm.get('connectorArr')).controls
  }

  lightControls(): AbstractControl[] {
    return (<FormArray> this.downConductorForm.get('lightArr')).controls
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

  private createBridgeArrForm(): FormGroup {
    
    return new FormGroup({
      obs1: new FormControl(''),
      rem1: new FormControl(''),
      obs2: new FormControl(''),
      rem2: new FormControl(''),
      obs3: new FormControl(''),
      rem3: new FormControl(''),
      obs4: new FormControl(''),
      rem4: new FormControl(''),
      obs5: new FormControl(''),
      rem5: new FormControl(''),
      obs6: new FormControl(''),
      rem6: new FormControl(''),
      obs7: new FormControl(''),
      rem7: new FormControl('')
    })
  }

  private createHolderArrForm(): FormGroup {
    
    return new FormGroup({
      holderObs1: new FormControl(''),
      holderRem1: new FormControl(''),
      holderObs2: new FormControl(''),
      holderRem2: new FormControl(''),
      holderObs3: new FormControl(''),
      holderRem3: new FormControl(''),
      holderObs4: new FormControl(''),
      holderRem4: new FormControl(''),
      holderObs5: new FormControl(''),
      holderRem5: new FormControl(''),
      holderObs6: new FormControl(''),
      holderRem6: new FormControl(''),
      holderObs7: new FormControl(''),
      holderRem7: new FormControl(''),
      holderObs8: new FormControl(''),
      holderRem8: new FormControl('')
    })
  }

  private createConnectorArrForm(): FormGroup {
    
    return new FormGroup({
      cobs1: new FormControl(''),
      crem1: new FormControl(''),
      cobs2: new FormControl(''),
      crem2: new FormControl(''),
      cobs3: new FormControl(''),
      crem3: new FormControl(''),
      cobs4: new FormControl(''),
      crem4: new FormControl(''),
      cobs5: new FormControl(''),
      crem5: new FormControl(''),
      cobs6: new FormControl(''),
      crem6: new FormControl(''),
      cobs7: new FormControl(''),
      crem7: new FormControl(''),
      cobs8: new FormControl(''),
      crem8: new FormControl('')
    })
  }

  private createLightArrForm(): FormGroup {
    return new FormGroup({
      lobs1: new FormControl(''),
      lrem1: new FormControl(''),
      lobs2: new FormControl(''),
      lrem2: new FormControl(''),
      lobs3: new FormControl(''),
      lrem3: new FormControl(''),
      lobs4: new FormControl(''),
      lrem4: new FormControl(''),
      lobs5: new FormControl(''),
      lrem5: new FormControl(''),
      lobs6: new FormControl(''),
      lrem6: new FormControl(''),
      lobs7: new FormControl(''),
      lrem7: new FormControl(''),
      lobs8: new FormControl(''),
      lrem8: new FormControl(''),
      lobs9: new FormControl(''),
      lrem9: new FormControl(''),
      lobs10: new FormControl(''),
      lrem10: new FormControl(''),
      lobs11: new FormControl(''),
      lrem11: new FormControl('')
    })
  }

  submit(){
      this.downArr = this.downConductorForm.get('downArr') as FormArray;
      this.downArr.push(this.createDownArrForm());
      console.log(this.downConductorForm)
    }
  submit1(){
      this.downArr = this.downConductorForm.get('bridgingArr') as FormArray;
      this.downArr.push(this.createBridgeArrForm());
      console.log(this.downConductorForm)
    }
  submit2(){
      this.holderArr = this.downConductorForm.get('holderArr') as FormArray;
      this.holderArr.push(this.createHolderArrForm());
      console.log(this.downConductorForm)
  }
  submit3(){
      this.connectorArr = this.downConductorForm.get('connectorArr') as FormArray;
      this.connectorArr.push(this.createConnectorArrForm());
      console.log(this.downConductorForm)
  }
  submit4(){
    this.lightArr = this.downConductorForm.get('lightArr') as FormArray;
    this.lightArr.push(this.createLightArrForm());
    console.log(this.downConductorForm)
}
}

