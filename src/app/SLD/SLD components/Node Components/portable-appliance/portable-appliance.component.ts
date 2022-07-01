import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PortableAppliance } from 'src/app/SLD/SLD Models/portable-appliance';
import { PortableApplianceServicesService } from 'src/app/SLD/SLD Services/portable-appliance-services.service';

@Component({
  selector: 'app-portable-appliance',
  templateUrl: './portable-appliance.component.html',
  styleUrls: ['./portable-appliance.component.css']
})
export class PortableApplianceComponent implements OnInit {
 //Light
 patForm!: FormGroup;
 patData: any;
 pat = new PortableAppliance();
 patFlag: boolean = false;
 submittedPat: boolean = false;
 submitted: boolean = false;

success: boolean = false;
successMsg: String = '';
error: boolean = false;
errorMsg: String = ''
errorData: any;
@Input()
fileName: any;
@Input()
nodeId: any;
@Input()
email: any;
validationError: boolean= false;
validationErrorMsg: string="";
generalTestingClass1Arr: any = [];
generalTestingClass1ArrValue: any = [];
deletedArr: any = [];
  deletedArrFlag: any;

constructor(private formBuilder: FormBuilder,
            private patService: PortableApplianceServicesService,
            private dialog: MatDialog) { }

ngOnInit(): void {
  this.patForm = this.formBuilder.group({
    referenceName: [''],
    portableApplianceName: ['', Validators.required],
    manufacturerName: [''],
    rating: ['', Validators.required],
    voltage: ['', Validators.required],
    insulationClass: ['', Validators.required],
    // outGoingSizePhase: ['', Validators.required],
    // outGoingSizeNeutral: ['', Validators.required],
    // outGoingSizeProtective: ['', Validators.required],
    generalTestingClass1: this.formBuilder.array([this.createGeneralTestingClass1()]),
  });

  this.pat.fileName = this.fileName;
  this.pat.nodeId = this.nodeId;

  this.patService.retrivePAT(this.fileName,this.nodeId).subscribe(
        data => {
          this.patData = JSON.parse(data);
          if(this.patData.length != 0) {
            this.retrievePATNode(this.patData);
          }
        }
      )
}

private createGeneralTestingClass1(): FormGroup {
  return new FormGroup({
    classType: new FormControl(''),
    reference: new FormControl(''),
    voltage: new FormControl('', Validators.required),
    continuityResistance: new FormControl(''),
    insulationResistance: new FormControl('', Validators.required),
    leakageCurrent: new FormControl('', Validators.required),
    flag: new FormControl('A')
  });
}


getGeneralTestingClass1Controls() : AbstractControl[] {
  return (<FormArray>this.patForm.get('generalTestingClass1')).controls;
}


retrievePATNode(data: any) {
  this.patFlag = true;
  for(let i of data) {
    this.pat.referenceName = i.referenceName;
    this.pat.portableApplianceName = i.portableApplianceName;
    this.pat.manufacturerName = i.manufacturerName;
    this.pat.rating = i.rating;
    this.pat.voltage = i.voltage;
    this.pat.insulationClass = i.insulationClass;
    // this.pat.outGoingSizePhase = i.outGoingSizePhase;
    // this.pat.outGoingSizeNeutral = i.outGoingSizeNeutral;
    // this.pat.outGoingSizeProtective = i.outGoingSizeProtective;
    this.pat.createdBy = i.createdBy;
    this.pat.createdDate = i.createdDate;
    this.pat.updatedBy = i.updatedBy;
    this.pat.updatedDate = i.updatedDate;
    this.pat.nodeId = i.nodeId;
    this.pat.fileName = i.fileName;
    this.pat.userName = i.userName;
    this.pat.portableApplianceId = i.portableApplianceId;


    this.populatePATForm(i);
  }
}

populatePATForm(i: any) {
  let generalTestingPATArr : any = []

  for(let j of i.generalTestingPAT) {
    generalTestingPATArr.push(this.populateGeneralTestingPATForm(j));
  }
  
  this.patForm.setControl('generalTestingClass1', this.formBuilder.array(generalTestingPATArr || []));
}

populateGeneralTestingPATForm(j: any): FormGroup {
  return new FormGroup({
    generalTestingPATId: new FormControl(j.generalTestingPATId),
    classType: new FormControl(j.classType),
    reference: new FormControl(j.reference),
    voltage: new FormControl(j.voltage, Validators.required),
    continuityResistance: new FormControl(j.continuityResistance),
    insulationResistance: new FormControl(j.insulationResistance, Validators.required),
    leakageCurrent: new FormControl(j.leakageCurrent, Validators.required),
    flag: new FormControl(j.flag, Validators.required),
  });
}

addRow(a: any,i: any) {
  let generalTestingClass1Arr: any = [];

  generalTestingClass1Arr = this.patForm.get('generalTestingClass1') as FormArray;

  generalTestingClass1Arr.push(this.createGeneralTestingClass1());
}

removeRow(i: any) {
  this.patForm.markAsTouched();
    this.generalTestingClass1ArrValue = this.patForm.get('generalTestingClass1') as FormArray;
    if(this.patFlag && this.generalTestingClass1ArrValue.value[i].generalTestingPATId!=null && this.generalTestingClass1ArrValue.value[i].generalTestingPATId!='' && this.generalTestingClass1ArrValue.value[i].generalTestingPATId!=undefined){
      this.generalTestingClass1ArrValue.value[i].flag='R';
      this.deletedArr.push(this.generalTestingClass1ArrValue.value[i]);
    }
    this.generalTestingClass1ArrValue.removeAt(i);
    this.patForm.markAsDirty();
}

get f(){
  return this.patForm.controls; 
}

showClass(e: any) {
  let selectedValue : any = '';
  selectedValue = e.target.value;
  this.generalTestingClass1Arr = this.patForm.get('generalTestingClass1') as FormArray;
  if(this.patFlag) {
    let lengthValue = this.generalTestingClass1Arr.length;
    for(let i=0; i<lengthValue; i++) {
      let value =  this.generalTestingClass1Arr.value[this.generalTestingClass1Arr.length-1];
      if(value.generalTestingPATId !=0 && value.generalTestingPATId !=undefined && value.generalTestingPATId != ''){
        value.flag = 'R';
        this.deletedArr.push(value);
      }
      this.generalTestingClass1Arr.removeAt(this.generalTestingClass1Arr.length-1);
    }
    this.generalTestingClass1Arr.push(this.createGeneralTestingClass1());
  }
}

onChangeForm(event:any){
  if(!this.patForm.invalid){
    if(this.patForm.dirty){
      this.validationError=false;
    }
    else{
      this.validationError=false;
    }
   }
}
onKeyForm(event: KeyboardEvent) { 
  if(!this.patForm.invalid){
    if(this.patForm.dirty){
      this.validationError=false;
    }
    else{
      this.validationError=false;
    }
   }
} 

//submit MCB
savePAT(patFlag: any) {
  this.submittedPat = true;
  if(this.patForm.invalid) {
    this.validationError=true;
    this.validationErrorMsg="Please check all the fields";
    return;
  }

  this.pat.generalTestingPAT = this.patForm.value.generalTestingClass1
  for(let i of this.pat.generalTestingPAT) {
    if(this.pat.insulationClass == 'Class-1') {
    i.classType = 'Class-1';
    }
    else if(this.pat.insulationClass == 'Class-2') {
      i.classType = 'Class-2';
    }
  }

  this.pat.userName = this.email;


  if(this.patFlag) {
    if(this.deletedArr.length != 0) {
      for(let i of this.deletedArr) {
        this.pat.generalTestingPAT.push(i);
      }
    }
    
    this.patService.updatePAT(this.pat).subscribe(
      data => {
        this.patService.retrivePAT(this.pat.fileName,this.pat.nodeId).subscribe(
          data => {
            this.patData = JSON.parse(data);
            if(this.patData.length != 0) {
              this.retrievePATNode(this.patData);
            }
          }
        )
        this.success = true;
        this.successMsg = data;
        setTimeout(()=>{
          this.success = false;
        this.successMsg = ""
        }, 3000);
      },
      error => {
        this.error = true;
        this.errorData = JSON.parse(error.error);
        this.errorMsg = this.errorData.message;
        setTimeout(()=>{
          this.error = false;
          this.errorMsg = ""
        }, 3000);
      }
    )
  }
  else {
    this.patService.addPAT(this.pat).subscribe(
      data => {
        this.patService.retrivePAT(this.pat.fileName,this.pat.nodeId).subscribe(
          data => {
            this.patData = JSON.parse(data);
            if(this.patData.length != 0) {
              this.retrievePATNode(this.patData);
            }
          }
        )
        this.success = true;
        this.successMsg = data;
        setTimeout(()=>{
          this.success = false;
        this.successMsg = ""
        }, 3000);
      },
      error => {
        this.error = true;
        this.errorData = JSON.parse(error.error);
        this.errorMsg = this.errorData.message;
        setTimeout(()=>{
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
