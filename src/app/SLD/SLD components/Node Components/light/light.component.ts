import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Light } from 'src/app/SLD/SLD Models/light';
import { LightServicesService } from 'src/app/SLD/SLD Services/light-services.service';


@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.css']
})
export class LightComponent implements OnInit {
   //Light
   lightForm!: FormGroup;
   lightData: any;
   light = new Light();
   lightFlag: boolean = false;
   lightGeneralTestingArray: any = [];
   lightSafetyTestingArray: any = [];
   submittedLight: boolean = false;
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
              private lightService: LightServicesService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.lightForm = this.formBuilder.group({
      referenceName: [''],
      manufacturerName: [''],
      powerCapacity: ['', Validators.required],
      rating: ['', Validators.required],
      voltage: [''],
      model: ['', Validators.required],
      // incomingSizePhase: ['', Validators.required],
      // incomingSizeNeutral: ['', Validators.required],
      // incomingSizeProtective: ['', Validators.required],
      // incomingLengthPhase: ['', Validators.required],
      // incomingLengthNeutral: ['', Validators.required],
      // incomingLengthProtective: ['', Validators.required],
      generalTestingLight: this.formBuilder.array([this.createGeneralTestingLight()]),
      safetyTestingLight: this.formBuilder.array([this.createSafetyTestingLight()]),
    });

    this.light.fileName = this.fileName;
    this.light.nodeId = this.nodeId;

    this.lightService.retriveLight(this.fileName,this.nodeId).subscribe(
          data => {
            this.lightData = JSON.parse(data);
            if(this.lightData.length != 0) {
              this.retrieveLightNode(this.lightData);
            }
          }
        )
  }

  private createGeneralTestingLight(): FormGroup {
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

  private createSafetyTestingLight(): FormGroup {
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

      // shockVoltage: new FormControl('', Validators.required),
      // floorResistance: new FormControl('', Validators.required),
      // wallResistance: new FormControl('', Validators.required),
    });
  }

  getGeneralTestingLightControls() : AbstractControl[] {
    return (<FormArray>this.lightForm.get('generalTestingLight')).controls;
  }

  getSafetyTestingLightControls() : AbstractControl[] {
    return (<FormArray>this.lightForm.get('safetyTestingLight')).controls;
  }

  retrieveLightNode(data: any) {
    this.lightFlag = true;
    for(let i of data) {
      this.light.referenceName = i.referenceName;
      this.light.manufacturerName = i.manufacturerName;
      this.light.powerCapacity = i.powerCapacity;
      this.light.currentRating = i.currentRating;
      this.light.voltage = i.voltage;
      this.light.model = i.model;
      // this.light.incomingSizePhase = i.incomingSizePhase;
      // this.light.incomingSizeNeutral = i.incomingSizeNeutral;
      // this.light.incomingSizeProtective = i.incomingSizeProtective;
      // this.light.incomingLengthPhase = i.incomingLengthPhase;
      // this.light.incomingLengthNeutral = i.incomingLengthNeutral;
      // this.light.incomingLengthProtective =i.incomingLengthProtective;
      this.light.createdBy = i.createdBy;
      this.light.createdDate = i.createdDate;
      this.light.updatedBy = i.updatedBy;
      this.light.updatedDate = i.updatedDate;
      this.light.nodeId = i.nodeId;
      this.light.fileName = i.fileName;
      this.light.userName = i.userName;
      this.light.lightId = i.lightId;


      this.populateLightForm(i);
    }
  }

  populateLightForm(i: any) {
    let generalTestingLightArr : any = []
    let safetyTestingLightArr : any = []

    for(let j of i.generalTestingLight) {
      generalTestingLightArr.push(this.populateGeneralTestingLightForm(j));
    }

    for(let k of i.safetyTestingLight) {
      safetyTestingLightArr.push(this.populateSafetyTestingLightForm(k));
    }

    this.lightForm.setControl('generalTestingLight', this.formBuilder.array(generalTestingLightArr || []));
    this.lightForm.setControl('safetyTestingLight', this.formBuilder.array(safetyTestingLightArr || []));
  }

  populateGeneralTestingLightForm(j: any): FormGroup {
    let phN = [];
    let phE = [];	
    let nE = [];
    
    phN = j.phN.split(",");
    phE = j.phE.split(",");
    nE = j.nE.split(",");

    return new FormGroup({
      generalTestingLightId: new FormControl(j.generalTestingLightId),
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

  populateSafetyTestingLightForm(k: any): FormGroup {
    let phN = [];
    let phE = [];	
    let nE = [];
    
    phN = k.phN.split(",");
    phE = k.phE.split(",");
    nE = k.nE.split(",");
    
    return new FormGroup({
      safetyTestingLightId: new FormControl(k.safetyTestingLightId),
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

      // shockVoltage: new FormControl(k.shockVoltage, Validators.required),
      // floorResistance: new FormControl(k.floorResistance, Validators.required),
      // wallResistance: new FormControl(k.wallResistance, Validators.required),
    });
  }

  addLightTesting() {
    let generalTestingLightArr: any = [];
    let safetyTestingLightArr: any = [];

    generalTestingLightArr = this.lightForm.get('generalTestingLight') as FormArray;
    safetyTestingLightArr = this.lightForm.get('safetyTestingLight') as FormArray;

    generalTestingLightArr.push(this.createGeneralTestingLight());
    safetyTestingLightArr.push(this.createSafetyTestingLight());
  }

  removeLighttesting(a: any, i: any) {
    (this.lightForm.get('generalTestingLight') as FormArray).removeAt(i);
    (this.lightForm.get('safetyTestingLight') as FormArray).removeAt(i)
  }

  get f(){
    return this.lightForm.controls;
  }

  onChangeForm(event:any){
    if(!this.lightForm.invalid){
      if(this.lightForm.dirty){
        this.validationError=false;
      }
      else{
        this.validationError=false;
      }
     }
  }
  onKeyForm(event: KeyboardEvent) { 
    if(!this.lightForm.invalid){
      if(this.lightForm.dirty){
        this.validationError=false;
      }
      else{
        this.validationError=false;
      }
     }
  } 

  //submit MCB
  saveLight(lightFlag: any) {
    this.submitted = true;
    if(this.lightForm.invalid) {
      this.validationError=true;
      this.validationErrorMsg="Please check all the fields";
      return;
    }

    this.lightGeneralTestingArray = this.lightForm.get('generalTestingLight') as FormArray;
    this.lightSafetyTestingArray = this.lightForm.get('safetyTestingLight') as FormArray;

    for(let i of this.lightGeneralTestingArray.controls) {
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

    for(let i of this.lightSafetyTestingArray.controls) {
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

    this.light.generalTestingLight = this.lightForm.value.generalTestingLight;
    this.light.safetyTestingLight = this.lightForm.value.safetyTestingLight;
    this.light.userName = this.email;


    if(this.lightFlag) {
      this.lightService.updateLight(this.light).subscribe(
        data => {
          this.lightService.retriveLight(this.light.fileName,this.light.nodeId).subscribe(
            data => {
              this.lightData = JSON.parse(data);
              if(this.lightData.length != 0) {
                this.retrieveLightNode(this.lightData);
              }
            }
          )
          this.success = true;
          this.successMsg = data;
          setTimeout(()=>{
            this.success = false;
          this.successMsg = "";
          this.dialog.closeAll();
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
      this.lightService.addLight(this.light).subscribe(
        data => {
          this.lightService.retriveLight(this.light.fileName,this.light.nodeId).subscribe(
            data => {
              this.lightData = JSON.parse(data);
              if(this.lightData.length != 0) {
                this.retrieveLightNode(this.lightData);
              }
            }
          )
          this.success = true;
          this.successMsg = data;
          setTimeout(()=>{
            this.success = false;
          this.successMsg = "";
          this.dialog.closeAll();
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
