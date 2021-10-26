import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-lps-air-termination',
  templateUrl: './lps-air-termination.component.html',
  styleUrls: ['./lps-air-termination.component.css']
})
export class LpsAirTerminationComponent implements OnInit {


  airTerminationForm!: FormGroup;
  vatArr!: FormArray;
  meshArr!: FormArray;
  holderArr!: FormArray;
  clampArr!: FormArray;
  expArr!: FormArray;
  conArr!: FormArray;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.airTerminationForm = this.formBuilder.group({
      vatArr: this.formBuilder.array([this.createVatArrForm()]),
      meshArr: this.formBuilder.array([this.createMeshArrForm()]),
      holderArr: this.formBuilder.array([this.createHolderArrForm()]),

      clampArr: this.formBuilder.array([this.createClampArrForm()]),
      expArr: this.formBuilder.array([this.createExpansioArrForm()]),
      conArr: this.formBuilder.array([this.createConArrForm()])
    });
  }

  vatControls(): AbstractControl[] {
    return (<FormArray>this.airTerminationForm.get('vatArr')).controls;
  }

  meshControls(): AbstractControl[] {
    return (<FormArray>this.airTerminationForm.get('meshArr')).controls;
  }

  holdersContols(): AbstractControl[] {
    return (<FormArray>this.airTerminationForm.get('holderArr')).controls;
  }

  clampsControls(): AbstractControl[] {
    return (<FormArray>this.airTerminationForm.get('clampArr')).controls;
  }

  expansionControls(): AbstractControl[] {
    return (<FormArray>this.airTerminationForm.get('expArr')).controls;
  }

  connectorsControls(): AbstractControl[] {
    return (<FormArray>this.airTerminationForm.get('conArr')).controls;
  }

  private createVatArrForm(): FormGroup{
    return new FormGroup({
      vatobs1: new FormControl(''),
      vatrem1: new FormControl(''),
      vatobs2: new FormControl(''),
      vatrem2: new FormControl(''),
      vatobs3: new FormControl(''),
      vatrem3: new FormControl(''),
      vatobs4: new FormControl(''),
      vatrem4: new FormControl(''),
      vatobs5: new FormControl(''),
      vatrem5: new FormControl(''),
      vatobs6: new FormControl(''),
      vatrem6: new FormControl(''),
      vatobs7: new FormControl(''),
      vatrem7: new FormControl(''),
      vatobs8: new FormControl(''),
      vatrem8: new FormControl(''),
      vatobs9: new FormControl(''),
      vatrem9: new FormControl(''),
      vatobs10: new FormControl(''),
      vatrem10: new FormControl(''),
      vatobs11: new FormControl(''),
      vatrem11: new FormControl(''),
      vatobs12: new FormControl(''),
      vatrem12: new FormControl(''),
      vatobs13: new FormControl(''),
      vatrem13: new FormControl(''),
    })
  }

  private createMeshArrForm(): FormGroup{
    return new FormGroup({
      meshobs1: new FormControl(''),
      meshrem1: new FormControl(''),
      meshobs2: new FormControl(''),
      meshrem2: new FormControl(''),
      meshobs3: new FormControl(''),
      meshrem3: new FormControl(''),
      meshobs4: new FormControl(''),
      meshrem4: new FormControl(''),
      meshobs5: new FormControl(''),
      meshrem5: new FormControl(''),
      meshobs6: new FormControl(''),
      meshrem6: new FormControl(''),
      meshobs7: new FormControl(''),
      meshrem7: new FormControl(''),
    })
  }

  private createHolderArrForm(): FormGroup{
    return new FormGroup({
      holdersobs1: new FormControl(''),
      holdersrem1: new FormControl(''),
      holdersobs2: new FormControl(''),
      holdersrem2: new FormControl(''),
      holdersobs3: new FormControl(''),
      holdersrem3: new FormControl(''),
      holdersobs4: new FormControl(''),
      holdersrem4: new FormControl(''),
      holdersobs5: new FormControl(''),
      holdersrem5: new FormControl(''),
      holdersobs6: new FormControl(''),
      holdersrem6: new FormControl(''),
      holdersobs7: new FormControl(''),
      holdersrem7: new FormControl(''),
      holdersobs8: new FormControl(''),
      holdersrem8: new FormControl(''),
      holdersobs9: new FormControl(''),
      holdersrem9: new FormControl(''),
      holdersobs10: new FormControl(''),
      holdersrem10: new FormControl(''),
      holdersobs11: new FormControl(''),
      holdersrem11: new FormControl(''),
      holdersobs12: new FormControl(''),
      holdersrem12: new FormControl(''),
      holdersobs13: new FormControl(''),
      holdersrem13: new FormControl(''),
      holdersobs14: new FormControl(''),
      holdersrem14: new FormControl(''),
      holdersobs15: new FormControl(''),
      holdersrem15: new FormControl('')
    }) 
  }

  private createClampArrForm(): FormGroup{
    return new FormGroup({
      clampobs1: new FormControl(''),
      clamprem1: new FormControl(''),
      clampobs2: new FormControl(''),
      clamprem2: new FormControl(''),
      clampobs3: new FormControl(''),
      clamprem3: new FormControl(''),
      clampobs4: new FormControl(''),
      clamprem4: new FormControl(''),
      clampobs5: new FormControl(''),
      clamprem5: new FormControl(''),
      clampobs6: new FormControl(''),
      clamprem6: new FormControl(''),
      clampobs7: new FormControl(''),
      clamprem7: new FormControl(''),
      clampobs8: new FormControl(''),
      clamprem8: new FormControl(''),
      clampobs9: new FormControl(''),
      clamprem9: new FormControl('')
    })
  }

  private createExpansioArrForm(): FormGroup{
    return new FormGroup({
      expobs1: new FormControl(''),
      exprem1: new FormControl(''),
      expobs2: new FormControl(''),
      exprem2: new FormControl(''),
      expobs3: new FormControl(''),
      exprem3: new FormControl(''),
      expobs4: new FormControl(''),
      exprem4: new FormControl(''),
      expobs5: new FormControl(''),
      exprem5: new FormControl(''),
      expobs6: new FormControl(''),
      exprem6: new FormControl(''),
      expobs7: new FormControl(''),
      exprem7: new FormControl('')
    })
  }
  
  private createConArrForm(): FormGroup{
    return new FormGroup({
      conobs1: new FormControl(''),
      conrem1: new FormControl(''),
      conobs2: new FormControl(''),
      conrem2: new FormControl(''),
      conobs3: new FormControl(''),
      conrem3: new FormControl(''),
      conobs4: new FormControl(''),
      conrem4: new FormControl(''),
      conobs5: new FormControl(''),
      conrem5: new FormControl(''),
      conobs6: new FormControl(''),
      conrem6: new FormControl(''),
      conobs7: new FormControl(''),
      conrem7: new FormControl(''),
      conobs8: new FormControl(''),
      conrem8: new FormControl(''),
      conobs9: new FormControl(''),
      conrem9: new FormControl(''),
      conobs10: new FormControl(''),
      conrem10: new FormControl(''),
      conobs11: new FormControl(''),
      conrem11: new FormControl('')
    })
  }

  submit(){
    this.vatArr = this.airTerminationForm.get('vatArr') as FormArray;
    this.vatArr.push(this.createVatArrForm());
    console.log(this.airTerminationForm)
  }

  submit1(){
    this.meshArr = this.airTerminationForm.get('meshArr') as FormArray;
    this.meshArr.push(this.createMeshArrForm());
    console.log(this.airTerminationForm)
  }

  submit2(){
    this.holderArr = this.airTerminationForm.get('holderArr') as FormArray;
    this.holderArr.push(this.createHolderArrForm());
    console.log(this.airTerminationForm)
  }

  submit3(){
    this.clampArr = this.airTerminationForm.get('clampArr') as FormArray;
    this.clampArr.push(this.createClampArrForm());
    console.log(this.airTerminationForm)
  }

  submit4(){
    this.expArr = this.airTerminationForm.get('expArr') as FormArray;
    this.expArr.push(this.createExpansioArrForm());
    console.log(this.airTerminationForm)
  }

  submit5(){
    this.conArr = this.airTerminationForm.get('conArr') as FormArray;
    this.conArr.push(this.createConArrForm());
    console.log(this.airTerminationForm)
  }

}
