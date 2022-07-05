import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CableConnector } from 'src/app/SLD/SLD Models/cableConnector';
import { CableConnectorServicesService } from 'src/app/SLD/SLD Services/cableConnector-service.service';

@Component({
  selector: 'app-cable-connector',
  templateUrl: './cable-connector.component.html',
  styleUrls: ['./cable-connector.component.css']
})
export class CableConnectorComponent implements OnInit {
  cableConnectorForm!: FormGroup;
  cableConnectorData: any;
  cableConnector = new CableConnector();
  cableConnectorFlag: boolean = false;
  cableConnectorGeneralTestingArray: any = [];
  cableConnectorSafetyTestingArray: any = [];
  submittedCableConnector: boolean = false;
  submitted: boolean = false;
  success: boolean = false;
  successMsg: String = '';
  error: boolean = false;
  errorMsg: String = ''
  errorData: any;
  generalTestingCableConnectorArr: any = [];
  generalTestingCableConnectorArrValue: any = [];
 deletedArr: any = [];
 deletedArrFlag: any;

  @Input()
  fileName: any;
  @Input()
  cableConnectorId: any;

  @Input()
  email: any;
  validationError: boolean = false;
  validationErrorMsg: string = "";
  testingTable: boolean = false;
  generalTestingCableConnector!: FormArray;

  constructor(private formBuilder: FormBuilder,
    private cableConnectorService: CableConnectorServicesService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.cableConnectorForm = this.formBuilder.group({
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
      generalTestingCableConnector: this.formBuilder.array([this.createGeneralTestingCableConnector()]),
    });

    this.cableConnector.fileName = this.fileName;
  this.cableConnector.cableConnectorId = this.cableConnectorId;

  this.cableConnectorService.retrieveCableConnector(this.fileName,this.cableConnectorId).subscribe(
        data => {
          this.cableConnectorData = JSON.parse(data);
          if(this.cableConnectorData.length != 0) {
            this.retrieveCableConnectorNode(this.cableConnectorData);
          }
        }
      )
}

private createGeneralTestingCableConnector(): FormGroup {
  return new FormGroup({
    phN: new FormControl('', Validators.required),
    phNIResistance: new FormControl('', Validators.required),
    phNCResistance: new FormControl('', Validators.required),
    flag: new FormControl('A')
  });
}


getGeneralTestingCableConnectorControls() : AbstractControl[] {
  return (<FormArray>this.cableConnectorForm.get('generalTestingCableConnector')).controls;
}


retrieveCableConnectorNode(data: any) {
  this.cableConnectorFlag = true;
  for(let i of data) {
    this.cableConnector.manufacturerName = i.manufacturerName;
    this.cableConnector.conductorType = i.conductorType;
    this.cableConnector.voltage = i.voltage;
    this.cableConnector.busDuctType = i.busDuctType;
    this.cableConnector.installation = i.installation;
    this.cableConnector.busDuctPhaseM = i.busDuctPhaseM;
    this.cableConnector.busDuctNeutralM = i.busDuctNeutralM;
    this.cableConnector.busDuctProtectiveM = i.busDuctProtectiveM;
    this.cableConnector.busDuctLength = i.busDuctLength;
    this.cableConnector.potentialTestReport = i.potentialTestReport;
    this.showPotential(i.potentialTestReport);

    this.cableConnector.createdBy = i.createdBy;
    this.cableConnector.createdDate = i.createdDate;
    this.cableConnector.updatedBy = i.updatedBy;
    this.cableConnector.updatedDate = i.updatedDate;
    this.cableConnector.cableConnectorId = i.cableConnectorId;
    this.cableConnector.fileName = i.fileName;
    this.cableConnector.userName = i.userName;
    this.cableConnector.cableId = i.cableId;

    this.populateCableConnectorForm(i);
  }
}

populateCableConnectorForm(i: any) {
  let generalTestingCableConnectorArr: any = []

  for(let j of i.generalTestingCableConnector) {
    generalTestingCableConnectorArr.push(this.populateGeneralTestingCableConnectorForm(j));
  }
  
  this.cableConnectorForm.setControl('generalTestingCableConnector', this.formBuilder.array(generalTestingCableConnectorArr || []));
}

populateGeneralTestingCableConnectorForm(j: any): FormGroup {
  return new FormGroup({
    generalTestingCableConnectorId: new FormControl(j.generalTestingCableConnectorId),
    phN: new FormControl(j.phN[0], Validators.required),
    phNIResistance: new FormControl(j.phN[1], Validators.required),
    phNCResistance: new FormControl(j.phN[2], Validators.required),
    flag: new FormControl(j.flag, Validators.required),
    });
}

addCableConnectorTesting() {
  let generalTestingCableConnectorArr: any = [];
  generalTestingCableConnectorArr = this.cableConnectorForm.get('generalTestingCableConnector') as FormArray;
  generalTestingCableConnectorArr.push(this.createGeneralTestingCableConnector());
}

removeCableConnectortesting(i: any) {
  this.cableConnectorForm.markAsTouched();
    this.generalTestingCableConnectorArrValue = this.cableConnectorForm.get('generalTestingCableConnector') as FormArray;
    if(this.cableConnectorFlag && this.generalTestingCableConnectorArrValue.value[i].generalTestingCableConnectorId!=null && this.generalTestingCableConnectorArrValue.value[i].generalTestingCableConnectorId!='' && this.generalTestingCableConnectorArrValue.value[i].generalTestingCableConnectorId!=undefined){
      this.generalTestingCableConnectorArrValue.value[i].flag='R';
      this.deletedArr.push(this.generalTestingCableConnectorArrValue.value[i]);
    }
    this.generalTestingCableConnectorArrValue.removeAt(i);
    this.cableConnectorForm.markAsDirty();
}

get f(){
  return this.cableConnectorForm.controls; 
}

showPotential(event: any) {
  let changedValue;
  if (event.target != undefined) {
    changedValue = event.target.value;
  }
  else {
    changedValue = event;
  }
  this.generalTestingCableConnectorArr = this.cableConnectorForm.get('generalTestingCableConnector') as FormArray;
  if(this.cableConnectorFlag) {
    let lengthValue = this.generalTestingCableConnectorArr.length;
    for(let i=0; i<lengthValue; i++) {
      let value =  this.generalTestingCableConnectorArr.value[this.generalTestingCableConnectorArr.length-1];
      if(value.generalTestingCableConnectorId !=0 && value.generalTestingCableConnectorId !=undefined && value.generalTestingCableConnectorId!= ''){
        value.flag = 'R';
        this.deletedArr.push(value);
      }
      this.generalTestingCableConnectorArr.removeAt(this.generalTestingCableConnectorArr.length-1);
    }
    this.generalTestingCableConnectorArr.push(this.createGeneralTestingCableConnector());
  }
}

onChangeForm(event:any){
  if(!this.cableConnectorForm.invalid){
    if(this.cableConnectorForm.dirty){
      this.validationError=false;
    }
    else{
      this.validationError=false;
    }
   }
}
onKeyForm(event: KeyboardEvent) { 
  if(!this.cableConnectorForm.invalid){
    if(this.cableConnectorForm.dirty){
      this.validationError=false;
    }
    else{
      this.validationError=false;
    }
   }
} 

//submit MCB
saveCableConnector(cableConnectorFlag: any) {
  this.submittedCableConnector = true;
  if(this.cableConnectorForm.invalid) {
    this.validationError=true;
    this.validationErrorMsg="Please check all the fields";
    return;
  }
 this.cableConnectorGeneralTestingArray = this.cableConnectorForm.get('generalTestingCableConnector') as FormArray;

    for (let i of this.cableConnectorGeneralTestingArray.controls) {
      let arr1: any = [];
      arr1.push(i.controls.phN.value, i.controls.phNIResistance.value, i.controls.phNCResistance.value);
      let phN: String = '';
      for (let a of arr1) {
        if (a != '' && a != null && a != undefined) {
          phN += a ;
        }
        else {
          phN += '';
        }
      }
      phN = phN.replace(/,\s*$/, '');
      i.controls.phN.setValue(phN);
    }

    this.cableConnector.generalTestingCableConnector = this.cableConnectorForm.value.generalTestingCableConnector;
    this.cableConnector.userName = this.email;

  
    if (this.cableConnectorFlag) {
      if(this.deletedArr.length != 0) {
        for(let i of this.deletedArr) {
          this.cableConnector.generalTestingCableConnector.push(i);
        }
      }
      this.cableConnectorService.updateCableConnector(this.cableConnector).subscribe(
        data => {
          this.cableConnectorService.retrieveCableConnector(this.cableConnector.fileName, this.cableConnector.cableConnectorId).subscribe(
            data => {
              this.cableConnectorData = JSON.parse(data);
              if (this.cableConnectorData.length != 0) {
                this.retrieveCableConnectorNode(this.cableConnectorData);
              }
            }
          )
          this.success = true;
          this.successMsg = data;
          setTimeout(() => {
            this.success = false;
            this.successMsg = ""
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
    else {
      this.cableConnectorService.addCableConnector(this.cableConnector).subscribe(
        data => {
          this.cableConnectorService.retrieveCableConnector(this.cableConnector.fileName, this.cableConnector.cableConnectorId).subscribe(
            data => {
              this.cableConnectorData = JSON.parse(data);
              if (this.cableConnectorData.length != 0) {
                this.retrieveCableConnectorNode(this.cableConnectorData);
              }
            }
          )
          this.success = true;
          this.successMsg = data;
          setTimeout(() => {
            this.success = false;
            this.successMsg = ""
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

  }

  close() {
    this.dialog.closeAll();
  }

}

