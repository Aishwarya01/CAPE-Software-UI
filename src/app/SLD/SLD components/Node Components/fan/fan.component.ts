import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Fan } from 'src/app/SLD/SLD Models/fan';
import { FanServicesService } from 'src/app/SLD/SLD Services/fan-services.service';


@Component({
  selector: 'app-fan',
  templateUrl: './fan.component.html',
  styleUrls: ['./fan.component.css']
})
export class FanComponent implements OnInit {
  fanForm!: FormGroup;
  fanData: any;
  fan = new Fan();
  fanFlag: boolean = false;
  fanGeneralTestingArray: any = [];
  fanSafetyTestingArray: any = [];
  submittedFan: boolean = false;
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
 constructor(private formBuilder: FormBuilder,
             private fanService: FanServicesService,
             private dialog: MatDialog) { }

 ngOnInit(): void {
   this.fanForm = this.formBuilder.group({
     referenceName: [''],
     manufacturerName: [''],
     powerCapacity: ['', Validators.required],
     rating: ['', Validators.required],
     voltage: [''],
     model: ['', Validators.required],
     incomingSizePhase: ['', Validators.required],
     incomingSizeNeutral: ['', Validators.required],
     incomingSizeProtective: ['', Validators.required],
     incomingLengthPhase: ['', Validators.required],
     incomingLengthNeutral: ['', Validators.required],
     incomingLengthProtective: ['', Validators.required],
     generalTestingFan: this.formBuilder.array([this.createGeneralTestingFan()]),
     safetyTestingFan: this.formBuilder.array([this.createSafetyTestingFan()]),
   });

   this.fan.fileName = this.fileName;
   this.fan.nodeId = this.nodeId;

   this.fanService.retriveFan(this.fileName,this.nodeId).subscribe(
         data => {
           this.fanData = JSON.parse(data);
           if(this.fanData.length != 0) {
             this.retrieveFanNode(this.fanData);
           }
         }
       )
 }

 private createGeneralTestingFan(): FormGroup {
   return new FormGroup({
     phN: new FormControl(''),
     phNVoltage: new FormControl('', Validators.required),
     phNIResistance: new FormControl('', Validators.required),
     phNCResistance: new FormControl('', Validators.required),

     phE: new FormControl(''),
     phEVoltage: new FormControl('', Validators.required),
     phEIResistance: new FormControl('', Validators.required),
     phECResistance: new FormControl('', Validators.required),

     nE: new FormControl(''),
     nEVoltage: new FormControl('', Validators.required),
     nEIResistance: new FormControl('', Validators.required),
     nECResistance: new FormControl('', Validators.required),

     iRCurrent: new FormControl('', Validators.required),
     iNCurrent: new FormControl('', Validators.required),
     iPECurrent: new FormControl('', Validators.required),

     powerFactor: new FormControl('', Validators.required),
     frequency: new FormControl('', Validators.required),
   });
 }

 private createSafetyTestingFan(): FormGroup {
   return new FormGroup({
     phN: new FormControl(''),
     phNImpedence: new FormControl('', Validators.required),
     phNCurrent: new FormControl('', Validators.required),
     phNTime: new FormControl('', Validators.required),
     phNRemarks: new FormControl('', Validators.required),

     phE: new FormControl(''),
     phEImpedence: new FormControl('', Validators.required),
     phECurrent: new FormControl('', Validators.required),
     phETime: new FormControl('', Validators.required),
     phERemarks: new FormControl('', Validators.required),


     nE: new FormControl(''),
     nEImpedence: new FormControl('', Validators.required),
     nECurrent: new FormControl('', Validators.required),
     nETime: new FormControl('', Validators.required),
     nERemarks: new FormControl('', Validators.required),

     shockVoltage: new FormControl('', Validators.required),
     floorResistance: new FormControl('', Validators.required),
     wallResistance: new FormControl('', Validators.required),
   });
 }

 getGeneralTestingFanControls() : AbstractControl[] {
   return (<FormArray>this.fanForm.get('generalTestingFan')).controls;
 }

 getSafetyTestingFanControls() : AbstractControl[] {
   return (<FormArray>this.fanForm.get('safetyTestingFan')).controls; 
 }

 retrieveFanNode(data: any) {
   this.fanFlag = true;
   for(let i of data) {
     this.fan.referenceName = i.referenceName;
     this.fan.manufacturerName = i.manufacturerName;
     this.fan.powerCapacity = i.powerCapacity;
     this.fan.currentRating = i.currentRating;
     this.fan.voltage = i.voltage;
     this.fan.model = i.model;
     this.fan.incomingSizePhase = i.incomingSizePhase;
     this.fan.incomingSizeNeutral = i.incomingSizeNeutral;
     this.fan.incomingSizeProtective = i.incomingSizeProtective;
     this.fan.incomingLengthPhase = i.incomingLengthPhase;
     this.fan.incomingLengthNeutral = i.incomingLengthNeutral;
     this.fan.incomingLengthProtective =i.incomingLengthProtective;
     this.fan.createdBy = i.createdBy;
     this.fan.createdDate = i.createdDate;
     this.fan.updatedBy = i.updatedBy;
     this.fan.updatedDate = i.updatedDate;
     this.fan.nodeId = i.nodeId;
     this.fan.fileName = i.fileName;
     this.fan.userName = i.userName;
     this.fan.fanId = i.fanId;


     this.populateFanForm(i);
   }
 }

 populateFanForm(i: any) {
   let generalTestingFanArr : any = []
   let safetyTestingFanArr : any = []

   for(let j of i.generalTestingFan) {
     generalTestingFanArr.push(this.populateGeneralTestingFanForm(j));
   }

   for(let k of i.safetyTestingFan) {
     safetyTestingFanArr.push(this.populateSafetyTestingFanForm(k));
   }

   this.fanForm.setControl('generalTestingFan', this.formBuilder.array(generalTestingFanArr || []));
   this.fanForm.setControl('safetyTestingFan', this.formBuilder.array(safetyTestingFanArr || []));
 }

 populateGeneralTestingFanForm(j: any): FormGroup {
   let phN = [];
   let phE = [];	
   let nE = [];
   
   phN = j.phN.split(",");
   phE = j.phE.split(",");
   nE = j.nE.split(",");

   return new FormGroup({
     generalTestingFanId: new FormControl(j.generalTestingFanId),
     phN: new FormControl(''),
     phNVoltage: new FormControl(phN[0], Validators.required),
     phNIResistance: new FormControl(phN[1], Validators.required),
     phNCResistance: new FormControl(phN[2], Validators.required),

     phE: new FormControl(''),
     phEVoltage: new FormControl(phE[0], Validators.required),
     phEIResistance: new FormControl(phE[1], Validators.required),
     phECResistance: new FormControl(phE[2], Validators.required),

     nE: new FormControl(''),
     nEVoltage: new FormControl(nE[0], Validators.required),
     nEIResistance: new FormControl(nE[1], Validators.required),
     nECResistance: new FormControl(nE[2], Validators.required),

     iRCurrent: new FormControl(j.iRCurrent, Validators.required),
     iNCurrent: new FormControl(j.iNCurrent, Validators.required),
     iPECurrent: new FormControl(j.iPECurrent, Validators.required),

     powerFactor: new FormControl(j.powerFactor, Validators.required),
     frequency: new FormControl(j.frequency, Validators.required),
   });
 }

 populateSafetyTestingFanForm(k: any): FormGroup {
   let phN = [];
   let phE = [];	
   let nE = [];
   
   phN = k.phN.split(",");
   phE = k.phE.split(",");
   nE = k.nE.split(",");
   
   return new FormGroup({
     safetyTestingFanId: new FormControl(k.safetyTestingFanId),
     phN: new FormControl(''),
     phNImpedence: new FormControl(phN[0], Validators.required),
     phNCurrent: new FormControl(phN[1], Validators.required),
     phNTime: new FormControl(phN[2], Validators.required),
     phNRemarks: new FormControl(phN[3], Validators.required),

     phE: new FormControl(''),
     phEImpedence: new FormControl(phE[0], Validators.required),
     phECurrent: new FormControl(phE[1], Validators.required),
     phETime: new FormControl(phE[2], Validators.required),
     phERemarks: new FormControl(phE[3], Validators.required),

     nE: new FormControl(''),
     nEImpedence: new FormControl(nE[0], Validators.required),
     nECurrent: new FormControl(nE[1], Validators.required),
     nETime: new FormControl(nE[2], Validators.required),
     nERemarks: new FormControl(nE[3], Validators.required),

     shockVoltage: new FormControl(k.shockVoltage, Validators.required),
     floorResistance: new FormControl(k.floorResistance, Validators.required),
     wallResistance: new FormControl(k.wallResistance, Validators.required),
   });
 }

//  addFanTesting() {
//    let generalTestingFanArr: any = [];
//    let safetyTestingFanArr: any = [];

//    generalTestingFanArr = this.fanForm.get('generalTestingFan') as FormArray;
//    safetyTestingFanArr = this.fanForm.get('safetyTestingFan') as FormArray;

//    generalTestingFanArr.push(this.createGeneralTestingFan());
//    safetyTestingFanArr.push(this.createSafetyTestingFan());
//  }

//  removeFantesting(a: any, i: any) {
//    (this.fanForm.get('generalTestingFan') as FormArray).removeAt(i);
//    (this.fanForm.get('safetyTestingFan') as FormArray).removeAt(i)
//  }

 get f(){
   return this.fanForm.controls;
 }

 onChangeForm(event:any){
   if(!this.fanForm.invalid){
     if(this.fanForm.dirty){
       this.validationError=false;
     }
     else{
       this.validationError=false;
     }
    }
 }
 onKeyForm(event: KeyboardEvent) { 
   if(!this.fanForm.invalid){
     if(this.fanForm.dirty){
       this.validationError=false;
     }
     else{
       this.validationError=false;
     }
    }
 } 

 //submit MCB
 saveFan(fanFlag: any) {
   this.submittedFan = true;
   if(this.fanForm.invalid) {
     this.validationError=true;
     this.validationErrorMsg="Please check all the fields";
     return;
   }

   this.fanGeneralTestingArray = this.fanForm.get('generalTestingFan') as FormArray;
   this.fanSafetyTestingArray = this.fanForm.get('safetyTestingFan') as FormArray;

   for(let i of this.fanGeneralTestingArray.controls) {
     let arr1: any = [];
     let arr2: any = [];
     let arr3: any = [];

     arr1.push(i.controls.phNVoltage.value, i.controls.phNIResistance.value, i.controls.phNCResistance.value);
     arr2.push(i.controls.phEVoltage.value, i.controls.phEIResistance.value, i.controls.phECResistance.value);
     arr3.push(i.controls.nEVoltage.value, i.controls.nEIResistance.value, i.controls.nECResistance.value);
     
     let phN: String = '';
     let phE: String = '';
     let nE: String = '';
     


     if(i.controls.iRCurrent.value == '' || i.controls.iRCurrent.value == null || i.controls.iRCurrent.value == undefined) {
       i.controls.iRCurrent.setValue('NA');
     }

     if(i.controls.iNCurrent.value == '' || i.controls.iNCurrent.value == null || i.controls.iNCurrent.value == undefined) {
       i.controls.iNCurrent.setValue('NA');
     }

     if(i.controls.iPECurrent.value == '' || i.controls.iPECurrent.value == null || i.controls.iPECurrent.value == undefined) {
       i.controls.iPECurrent.setValue('NA');
     }


     for(let a of arr1) {
       if(a != '' && a != null && a != undefined) {
         phN += a + ',';
       }
       else {
         phN += 'NA,';
       }
     }
     phN = phN.replace(/,\s*$/, '');
     i.controls.phN.setValue(phN);


     for(let b of arr2) {
       if(b != '' && b != null && b != undefined) {
         phE += b + ',';
       }
       else {
         phE += 'NA,';
       }
     }
     phE = phE.replace(/,\s*$/, '');
     i.controls.phE.setValue(phE);


     for(let c of arr3) {
       if(c != '' && c != null && c != undefined) {
         nE += c + ',';
       }
       else {
         nE += 'NA,';
       }
     }
     nE = nE.replace(/,\s*$/, '');
     i.controls.nE.setValue(nE);
   }

   for(let i of this.fanSafetyTestingArray.controls) {
     let arr1: any = [];
     let arr2: any = [];
     let arr3: any = [];
     
     arr1.push(i.controls.phNImpedence.value, i.controls.phNCurrent.value, i.controls.phNTime.value, i.controls.phNRemarks.value);
     arr2.push(i.controls.phEImpedence.value, i.controls.phECurrent.value, i.controls.phETime.value, i.controls.phERemarks.value);
     arr3.push(i.controls.nEImpedence.value, i.controls.nECurrent.value, i.controls.nETime.value, i.controls.nERemarks.value);
     
     let phN: String = '';
     let phE: String = '';
     let nE: String = '';
     

     for(let a of arr1) {
       if(a != '' && a != null && a != undefined) {
         phN += a + ',';
       }
       else {
         phN += 'NA,';
       }
     }
     phN = phN.replace(/,\s*$/, '');
     i.controls.phN.setValue(phN);



     for(let b of arr2) {
       if(b != '' && b != null && b != undefined) {
         phE += b + ',';
       }
       else {
         phE += 'NA,';
       }
     }
     phE = phE.replace(/,\s*$/, '');
     i.controls.phE.setValue(phE);


     for(let c of arr3) {
       if(c != '' && c != null && c != undefined) {
         nE += c + ',';
       }
       else {
         nE += 'NA,';
       }
     }
     nE = nE.replace(/,\s*$/, '');
     i.controls.nE.setValue(nE);

   }

   this.fan.generalTestingFan = this.fanForm.value.generalTestingFan;
   this.fan.safetyTestingFan = this.fanForm.value.safetyTestingFan;
   this.fan.userName = this.email;


   if(this.fanFlag) {
     this.fanService.updateFan(this.fan).subscribe(
       data => {
         this.fanService.retriveFan(this.fan.fileName,this.fan.nodeId).subscribe(
           data => {
             this.fanData = JSON.parse(data);
             if(this.fanData.length != 0) {
               this.retrieveFanNode(this.fanData);
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
     this.fanService.addFan(this.fan).subscribe(
       data => {
         this.fanService.retriveFan(this.fan.fileName,this.fan.nodeId).subscribe(
           data => {
             this.fanData = JSON.parse(data);
             if(this.fanData.length != 0) {
               this.retrieveFanNode(this.fanData);
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
