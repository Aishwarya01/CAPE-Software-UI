import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Cables } from 'src/app/SLD/SLD Models/cables';
import { CablesServicesService } from 'src/app/SLD/SLD Services/cables-services.service';

@Component({
  selector: 'app-cables',
  templateUrl: './cables.component.html',
  styleUrls: ['./cables.component.css']
})
export class CablesComponent implements OnInit {
  cablesForm!: FormGroup;
  cablesData: any;
  cables = new Cables();
  cablesFlag: boolean = false;
  cablesGeneralTestingArray: any = [];
  cablesSafetyTestingArray: any = [];
  submittedCables: boolean = false;
  submitted: boolean = false;
  success: boolean = false;
  successMsg: String = '';
  error: boolean = false;
  errorMsg: String = ''
  errorData: any;
  generalTestingCablesArr: any = [];
  generalTestingCablesArrValue: any = [];
 deletedArr: any = [];
 deletedArrFlag: any;

  @Input()
  fileName: any;
  @Input()
  nodeId: any;

  @Input()
  email: any;
  validationError: boolean = false;
  validationErrorMsg: string = "";
  testingTable: boolean = false;
  generalTestingCables!: FormArray;

  constructor(private formBuilder: FormBuilder,
    private cablesService: CablesServicesService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.cablesForm = this.formBuilder.group({
      manufacturerName: [''],
      conductorType: ['', Validators.required],
      voltage: ['', Validators.required],
      busDuctType: ['', Validators.required],
      installation: ['', Validators.required],
      busDuctPhaseM: [''],
      busDuctNeutralM: [''],
      busDuctProtectiveM: [''],
      busDuctLength: [''],
      potentialTestReport: [''],
      generalTestingCables: this.formBuilder.array([this.createGeneralTestingCables()]),
    });

    this.cables.fileName = this.fileName;
    this.cables.nodeId = this.nodeId;

    this.cablesService.retrieveCables(this.fileName, this.nodeId).subscribe(
      data => {
        this.cablesData = JSON.parse(data);
        if (this.cablesData.length != 0) {
          this.retrieveCablesNode(this.cablesData);
        }
      }
    )
  }

  private createGeneralTestingCables(): FormGroup {
    return new FormGroup({
      potentialReport: new FormControl(''),
      phN: new FormControl('', Validators.required),
      phNIResistance: new FormControl('', Validators.required),
      phNCResistance: new FormControl('', Validators.required),
      flag: new FormControl('A')
    });
  }

  getGeneralTestingCablesControls(): AbstractControl[] {
    return (<FormArray>this.cablesForm.get('generalTestingCables')).controls;
  }

  retrieveCablesNode(data: any) {
    this.cablesFlag = true;
    for (let i of data) {
      this.cables.manufacturerName = i.manufacturerName;
      this.cables.conductorType = i.conductorType;
      this.cables.voltage = i.voltage;
      this.cables.busDuctType = i.busDuctType;
      this.cables.installation = i.installation;
      this.cables.busDuctPhaseM = i.busDuctPhaseM;
      this.cables.busDuctNeutralM = i.busDuctNeutralM;
      this.cables.busDuctProtectiveM = i.busDuctProtectiveM;
      this.cables.busDuctLength = i.busDuctLength;

      this.cables.potentialTestReport = i.potentialTestReport;
      this.showPotential(i.potentialTestReport);

      this.cables.createdBy = i.createdBy;
      this.cables.createdDate = i.createdDate;
      this.cables.updatedBy = i.updatedBy;
      this.cables.updatedDate = i.updatedDate;
      this.cables.nodeId = i.nodeId;
      this.cables.fileName = i.fileName;
      this.cables.userName = i.userName;
      this.cables.cableId = i.cableId;

      this.populateCablesForm(i);
    }
  }
  addCablesTesting() {
    let generalTestingCablesArr: any = [];

    generalTestingCablesArr = this.cablesForm.get('generalTestingCables') as FormArray;

    generalTestingCablesArr.push(this.createGeneralTestingCables());
  }
 
  populateCablesForm(i: any) {
    let generalTestingCablesArr: any = []

    for (let j of i.generalTestingCables) {
      generalTestingCablesArr.push(this.populateGeneralTestingCablesForm(j));
    }

    this.cablesForm.setControl('generalTestingCables', this.formBuilder.array(generalTestingCablesArr || []));
  }

  populateGeneralTestingCablesForm(j: any): FormGroup {
    return new FormGroup({
      generalTestingCableId: new FormControl(j.generalTestingCableId),
      potentialReport: new FormControl(j.potentialReport),
      phN: new FormControl(j.phN, Validators.required),
      phNIResistance: new FormControl(j.phNIResistance, Validators.required),
      phNCResistance: new FormControl(j.phNCResistance, Validators.required),
      flag: new FormControl(j.flag, Validators.required),
    });
  }

  removeCablestesting(i: any) {
    this.cablesForm.markAsTouched();
      this.generalTestingCablesArrValue = this.cablesForm.get('generalTestingCables') as FormArray;
      if(this.cablesFlag && this.generalTestingCablesArrValue.value[i].generalTestingCableId!=null && this.generalTestingCablesArrValue.value[i].generalTestingCableId!='' && this.generalTestingCablesArrValue.value[i].generalTestingCableId!=undefined){
        this.generalTestingCablesArrValue.value[i].flag='R';
        this.deletedArr.push(this.generalTestingCablesArrValue.value[i]);
      }
      this.generalTestingCablesArrValue.removeAt(i);
      this.cablesForm.markAsDirty();
  }
 
  showPotential(event: any) {
    let changedValue;
    if (event.target != undefined) {
      changedValue = event.target.value;
    }
    else {
      changedValue = event;
    }
    this.generalTestingCablesArr = this.cablesForm.get('generalTestingCables') as FormArray;

    if(changedValue == 'Available') {
      this.f.generalTestingCables.controls[0].controls['phN'].setValidators([Validators.required]);
      this.f.generalTestingCables.controls[0].controls['phN'].updateValueAndValidity();
      this.f.generalTestingCables.controls[0].controls['phNIResistance'].setValidators([Validators.required]);
      this.f.generalTestingCables.controls[0].controls['phNIResistance'].updateValueAndValidity();
      this.f.generalTestingCables.controls[0].controls['phNCResistance'].setValidators([Validators.required]);
      this.f.generalTestingCables.controls[0].controls['phNCResistance'].updateValueAndValidity();

    if(this.cablesFlag) {
      let lengthValue = this.generalTestingCablesArr.length;
      for(let i=0; i<lengthValue; i++) {
        let value =  this.generalTestingCablesArr.value[this.generalTestingCablesArr.length-1];
        if(value.generalTestingCableId !=0 && value.generalTestingCableId !=undefined && value.generalTestingCableId!= ''){
          value.flag = 'R';
          this.deletedArr.push(value);
        }
        this.generalTestingCablesArr.removeAt(this.generalTestingCablesArr.length-1);
      }
      this.generalTestingCablesArr.push(this.createGeneralTestingCables());
    }
  }
  else if(changedValue == 'Not available' || changedValue == 'Not applicable'){
        this.disableValidators();
  }
  }

  // showPotential(event: any) {
  //   let changedValue;
  //   if (event.target != undefined) {
  //     changedValue = event.target.value;
  //   }
  //   else {
  //     changedValue = event;
  //   }

  //   if (changedValue == 'Not available' || changedValue == 'Not applicable') {
  //    // this.testingTable = false;
  //     this.disableValidators();
  //   }
  //   else {
  //    // this.testingTable = true;
  //     this.f.generalTestingCables.controls[0].controls['phN'].setValidators([Validators.required]);
  //     this.f.generalTestingCables.controls[0].controls['phN'].updateValueAndValidity();
  //     this.f.generalTestingCables.controls[0].controls['phNIResistance'].setValidators([Validators.required]);
  //     this.f.generalTestingCables.controls[0].controls['phNIResistance'].updateValueAndValidity();
  //     this.f.generalTestingCables.controls[0].controls['phNCResistance'].setValidators([Validators.required]);
  //     this.f.generalTestingCables.controls[0].controls['phNCResistance'].updateValueAndValidity();

  //     // this.f.generalTestingCables.controls[0].controls['phE'].setValidators([Validators.required]);
  //     // this.f.generalTestingCables.controls[0].controls['phE'].updateValueAndValidity();
  //     // this.f.generalTestingCables.controls[0].controls['phEIResistance'].setValidators([Validators.required]);
  //     // this.f.generalTestingCables.controls[0].controls['phEIResistance'].updateValueAndValidity();
  //     // this.f.generalTestingCables.controls[0].controls['phECResistance'].setValidators([Validators.required]);
  //     // this.f.generalTestingCables.controls[0].controls['phECResistance'].updateValueAndValidity();

  //     // this.f.generalTestingCables.controls[0].controls['nE'].setValidators([Validators.required]);
  //     // this.f.generalTestingCables.controls[0].controls['nE'].updateValueAndValidity();
  //     // this.f.generalTestingCables.controls[0].controls['nEIResistance'].setValidators([Validators.required]);
  //     // this.f.generalTestingCables.controls[0].controls['nEIResistance'].updateValueAndValidity();
  //     // this.f.generalTestingCables.controls[0].controls['nECResistance'].setValidators([Validators.required]);
  //     // this.f.generalTestingCables.controls[0].controls['nECResistance'].updateValueAndValidity();
  //   }

  // }
  disableValidators() {
    this.f.generalTestingCables.controls[0].controls['phN'].setValue('');
    this.f.generalTestingCables.controls[0].controls['phN'].clearValidators();
    this.f.generalTestingCables.controls[0].controls['phN'].updateValueAndValidity();

    this.f.generalTestingCables.controls[0].controls['phNIResistance'].setValue('');
    this.f.generalTestingCables.controls[0].controls['phNIResistance'].clearValidators();
    this.f.generalTestingCables.controls[0].controls['phNIResistance'].updateValueAndValidity();

    this.f.generalTestingCables.controls[0].controls['phNCResistance'].setValue('');
    this.f.generalTestingCables.controls[0].controls['phNCResistance'].clearValidators();
    this.f.generalTestingCables.controls[0].controls['phNCResistance'].updateValueAndValidity();
  }

  get f(): any {
    return this.cablesForm.controls;
  }

  onChangeForm(event: any) {
    if (!this.cablesForm.invalid) {
      if (this.cablesForm.dirty) {
        this.validationError = false;
      }
      else {
        this.validationError = false;
      }
    }
  }
  onKeyForm(event: KeyboardEvent) {
    if (!this.cablesForm.invalid) {
      if (this.cablesForm.dirty) {
        this.validationError = false;
      }
      else {
        this.validationError = false;
      }
    }
  }

  //submit MCB
  saveCables(cablesFlag: any) {
    this.submittedCables = true;

    this.cables.generalTestingCables = this.cablesForm.value.generalTestingCables;
    for(let i of this.cables.generalTestingCables) {
      if(this.cables.potentialTestReport == 'Available') {
      i.potentialReport = 'Available';
      }
      else if(this.cables.potentialTestReport == 'Not available') {
        i.potentialReport = 'Not available';
        this.disableValidators();
      }
      else if(this.cables.potentialTestReport == 'Not applicable') {
        i.potentialReport = 'Not applicable';
        this.disableValidators();
      }
    }

    if (this.cablesForm.invalid) {
      this.validationError = true;
      this.validationErrorMsg = "Please check all the fields";
      return;
    }

   // this.cablesGeneralTestingArray = this.cablesForm.get('generalTestingCables') as FormArray;

    // for (let i of this.cablesGeneralTestingArray.controls) {
    //   let arr1: any = [];

    //   arr1.push(i.controls.phN.value, i.controls.phNIResistance.value, i.controls.phNCResistance.value);
    
    //   let phN: String = '';
      
    //   for (let a of arr1) {
    //     if (a != '' && a != null && a != undefined) {
    //       phN += a ;
    //     }
    //     else {
    //       phN += '';
    //     }
    //   }
    //   phN = phN.replace(/,\s*$/, '');
    //   i.controls.phN.setValue(phN);

    // }

  //  this.cables.generalTestingCables = this.cablesForm.value.generalTestingCables;
    this.cables.userName = this.email;


    if (this.cablesFlag) {
      if(this.cablesForm.dirty && this.cablesForm.touched){
      if(this.deletedArr.length != 0) {
        for(let i of this.deletedArr) {
          this.cables.generalTestingCables.push(i);
        }
      }
      this.cablesService.updateCables(this.cables).subscribe(
        data => {
          this.cablesService.retrieveCables(this.cables.fileName, this.cables.nodeId).subscribe(
            data => {
              this.cablesData = JSON.parse(data);
              if (this.cablesData.length != 0) {
                this.retrieveCablesNode(this.cablesData);
              }
            }
          )
          this.success = true;
          this.successMsg = data;
          setTimeout(() => {
            this.success = false;
            this.successMsg = "";
            this.dialog.closeAll();
          }, 3000);
        },
        error => {
          this.error = true;
          this.errorData = JSON.parse(error.error);
          this.errorMsg = this.errorData.message;
          setTimeout(() => {
            this.error = false;
            this.errorMsg = "";
          }, 3000);
        }
      )
    }
    else{
      return;
    }
    }
    else {
      this.cablesService.addCables(this.cables).subscribe(
        data => {
          this.cablesService.retrieveCables(this.cables.fileName, this.cables.nodeId).subscribe(
            data => {
              this.cablesData = JSON.parse(data);
              if (this.cablesData.length != 0) {
                this.retrieveCablesNode(this.cablesData);
              }
            }
          )
          this.success = true;
          this.successMsg = data;
          setTimeout(() => {
            this.success = false;
            this.successMsg = "";
            this.dialog.closeAll();
          }, 3000);
        },
        error => {
          this.error = true;
          this.errorData = JSON.parse(error.error);
          this.errorMsg = this.errorData.message;
          setTimeout(() => {
            this.error = false;
            this.errorMsg = ""
          }, 3000);
        }
      )
    }
    this.cablesForm.markAsPristine();
  }

  close() {
    this.dialog.closeAll();
  }
}
