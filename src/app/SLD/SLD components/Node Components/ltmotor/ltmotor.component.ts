import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LTMotor } from '../../../SLD Models/LTMotor';
import { LTMotorServicesService } from '../../../../SLD/SLD Services/LTMotor-services.service';

@Component({
  selector: 'app-ltmotor',
  templateUrl: './ltmotor.component.html',
  styleUrls: ['./ltmotor.component.css']
})
export class LTMotorComponent implements OnInit {

  //LT Motor
  ltMotorForm!: FormGroup;
  ltMotor = new LTMotor();
  submittedltMotor: boolean = false;
  ltMotorFlag: boolean = false;
  ltMotorData: any;
  ltMotorGeneralTestingArray: any = [];
  ltMotorSafetyTestingArray: any = [];
  validationError: boolean = false;
  validationErrorMsg: string = "";
  popup: boolean = false;
  finalSpinner: boolean = false;
  success: boolean = false;
  successMsg: String = '';
  Error: boolean = false;
  errorArr: any = [];
  errorMsg: String = '';
  email: any;
  error: boolean = false;
  errorData: any;

  @Input()
  nodeId: any;
  @Input()
  fileName: any;
  constructor(private LTMotorService: LTMotorServicesService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.ltMotorForm = this.formBuilder.group({
      referenceName: [''],
      manufacturerName: [''],
      windingConnection: ['', Validators.required],
      powerCapacity: ['', Validators.required],
      currentRating: ['', Validators.required],
      voltage: ['', Validators.required],
      noOfPhase: [''],
      model: ['', Validators.required],
      incomingSizePhase: ['', Validators.required],
      incomingSizeNeutral: ['', Validators.required],
      incomingSizeProtective: ['', Validators.required],
      incomingLengthPhase: ['', Validators.required],
      incomingLengthNeutral: ['', Validators.required],
      incomingLengthProtective: ['', Validators.required],
      generalTestingLTMotor: this.formBuilder.array([this.createGeneralTestingLTMotor()]),
      safetyTestingLTMotor: this.formBuilder.array([this.createSafetyTestingLTMotor()]),
    });
    this.ltMotor.fileName = this.fileName;
    this.ltMotor.nodeId = this.nodeId;

    this.LTMotorService.retriveLTMotor(this.fileName, this.nodeId).subscribe(
      data => {
        this.ltMotorData = JSON.parse(data);
        if (this.ltMotorData.length != 0) {
          this.retrieveLTMotorNode(this.ltMotorData);
        }
      }
    )
  }

  //LT Motor
  private createGeneralTestingLTMotor(): FormGroup {
    return new FormGroup({
      rE: new FormControl(''),
      rEVoltage: new FormControl('', Validators.required),
      rEResistance: new FormControl('', Validators.required),
      rECResistance: new FormControl('', Validators.required),
      rEWResistance: new FormControl('', Validators.required),

      yE: new FormControl(''),
      yEVoltage: new FormControl('', Validators.required),
      yEResistance: new FormControl('', Validators.required),
      yECResistance: new FormControl('', Validators.required),
      yEWResistance: new FormControl('', Validators.required),


      bE: new FormControl(''),
      bEVoltage: new FormControl('', Validators.required),
      bEResistance: new FormControl('', Validators.required),
      bECResistance: new FormControl('', Validators.required),
      bEWResistance: new FormControl('', Validators.required),

      rY: new FormControl(''),
      rYVoltage: new FormControl('', Validators.required),
      rYResistance: new FormControl('', Validators.required),
      rYCResistance: new FormControl('', Validators.required),
      rYWResistance: new FormControl('', Validators.required),

      yB: new FormControl(''),
      yBVoltage: new FormControl('', Validators.required),
      yBResistance: new FormControl('', Validators.required),
      yBCResistance: new FormControl('', Validators.required),
      yBRWesistance: new FormControl('', Validators.required),

      bR: new FormControl(''),
      bRVoltage: new FormControl('', Validators.required),
      bRResistance: new FormControl('', Validators.required),
      bRCResistance: new FormControl('', Validators.required),
      bRWResistance: new FormControl('', Validators.required),

      iRCurrent: new FormControl('', Validators.required),
      iYCurrent: new FormControl('', Validators.required),
      iBCurrent: new FormControl('', Validators.required),
      iPECurrent: new FormControl('', Validators.required),

      polarityR: new FormControl('', Validators.required),
      polarityY: new FormControl('', Validators.required),
      polarityB: new FormControl('', Validators.required),

      powerFactor: new FormControl('', Validators.required),
      frequency: new FormControl('', Validators.required),
    });
  }
  private createSafetyTestingLTMotor(): FormGroup {
    return new FormGroup({
      rN: new FormControl(''),
      rNImpedance: new FormControl('', Validators.required),
      rNCurrent: new FormControl('', Validators.required),
      rNTime: new FormControl('', Validators.required),
      rNRemarks: new FormControl('', Validators.required),

      yN: new FormControl(''),
      yNImpedance: new FormControl('', Validators.required),
      yNCurrent: new FormControl('', Validators.required),
      yNTime: new FormControl('', Validators.required),
      yNRemarks: new FormControl('', Validators.required),


      bN: new FormControl(''),
      bNImpedance: new FormControl('', Validators.required),
      bNCurrent: new FormControl('', Validators.required),
      bNTime: new FormControl('', Validators.required),
      bNRemarks: new FormControl('', Validators.required),


      rE: new FormControl(''),
      rEImpedance: new FormControl('', Validators.required),
      rECurrent: new FormControl('', Validators.required),
      rETime: new FormControl('', Validators.required),
      rERemarks: new FormControl('', Validators.required),


      yE: new FormControl(''),
      yEImpedance: new FormControl('', Validators.required),
      yECurrent: new FormControl('', Validators.required),
      yETime: new FormControl('', Validators.required),
      yERemarks: new FormControl('', Validators.required),


      bE: new FormControl(''),
      bEImpedance: new FormControl('', Validators.required),
      bECurrent: new FormControl('', Validators.required),
      bETime: new FormControl('', Validators.required),
      bERemarks: new FormControl('', Validators.required),


      rY: new FormControl(''),
      rYImpedance: new FormControl('', Validators.required),
      rYCurrent: new FormControl('', Validators.required),
      rYTime: new FormControl('', Validators.required),
      rYRemarks: new FormControl('', Validators.required),


      yB: new FormControl(''),
      yBImpedance: new FormControl('', Validators.required),
      yBCurrent: new FormControl('', Validators.required),
      yBTime: new FormControl('', Validators.required),
      yBRemarks: new FormControl('', Validators.required),


      bR: new FormControl(''),
      bRImpedance: new FormControl('', Validators.required),
      bRCurrent: new FormControl('', Validators.required),
      bRTime: new FormControl('', Validators.required),
      bRRemarks: new FormControl('', Validators.required),


      shockVoltage: new FormControl('', Validators.required),
      floorResistance: new FormControl('', Validators.required),
      wallResistance: new FormControl('', Validators.required),
    });
  }

  getGeneralTestingLTMotorControls(): AbstractControl[] {
    return (<FormArray>this.ltMotorForm.get('generalTestingLTMotor')).controls;
  }

  getSafetyTestingLTMotorControls(): AbstractControl[] {
    return (<FormArray>this.ltMotorForm.get('safetyTestingLTMotor')).controls;
  }

  addLTMotorTesting() {
    let generalTestingLtMotorArr: any = [];
    let safetyTestingLtMotorArr: any = [];

    generalTestingLtMotorArr = this.ltMotorForm.get('generalTestingLTMotor') as FormArray;
    safetyTestingLtMotorArr = this.ltMotorForm.get('safetyTestingLTMotor') as FormArray;

    generalTestingLtMotorArr.push(this.createGeneralTestingLTMotor());
    safetyTestingLtMotorArr.push(this.createSafetyTestingLTMotor());

  }

  removeLTMotortesting(a: any, i: any) {
    (this.ltMotorForm.get('generalTestingLTMotor') as FormArray).removeAt(i);
    (this.ltMotorForm.get('safetyTestingLTMotor') as FormArray).removeAt(i);
  }

  retrieveLTMotorNode(data: any) {
    this.ltMotorFlag = true;
    for (let i of data) {
      this.ltMotor.referenceName = i.referenceName;
      this.ltMotor.manufacturerName = i.manufacturerName;
      this.ltMotor.windingConnection = i.windingConnection;
      this.ltMotor.powerCapacity = i.powerCapacity;
      this.ltMotor.currentRating = i.currentRating;
      this.ltMotor.voltage = i.voltage;
      this.ltMotor.noOfPhase = i.noOfPhase;
      this.ltMotor.model = i.model;
      this.ltMotor.incomingSizePhase = i.incomingSizePhase;
      this.ltMotor.incomingSizeNeutral = i.incomingSizeNeutral;
      this.ltMotor.incomingSizeProtective = i.incomingSizeProtective;
      this.ltMotor.incomingLengthPhase = i.incomingLengthPhase;
      this.ltMotor.incomingLengthNeutral = i.incomingLengthNeutral;
      this.ltMotor.incomingLengthProtective = i.incomingLengthProtective;
      this.ltMotor.createdBy = i.createdBy;
      this.ltMotor.createdDate = i.createdDate;
      this.ltMotor.updatedBy = i.updatedBy;
      this.ltMotor.updatedDate = i.updatedDate;
      this.ltMotor.nodeId = i.nodeId;
      this.ltMotor.fileName = i.fileName;
      this.ltMotor.motorId=i.motorId;
      
      this.populateLtMotorForm(i);
    }
  }

  populateLtMotorForm(i: any) {
    let generalTestingLtMotorArr: any = []
    let safetyTestingLtMotorArr: any = []

    for (let q of i.generalTestingLTMotor) {
      generalTestingLtMotorArr.push(this.populateGeneralTestingLtMotorForm(q));
    }

    for (let w of i.safetyTestingLTMotor) {
      safetyTestingLtMotorArr.push(this.populateSafetyTestingLtMotorForm(w));
    }

    this.ltMotorForm.setControl('generalTestingLTMotor', this.formBuilder.array(generalTestingLtMotorArr || []));
    this.ltMotorForm.setControl('safetyTestingLTMotor', this.formBuilder.array(safetyTestingLtMotorArr || []));
  }

  populateGeneralTestingLtMotorForm(q: any): FormGroup {
    let rE = [];
    let yE = [];
    let bE = [];
    let rY = [];
    let yB = [];
    let bR = [];
   // let nE = [];


    rE = q.rE.split(",");
    yE = q.yE.split(",");
    bE = q.bE.split(",");
    rY = q.rY.split(",");
    yB = q.yB.split(",");
    bR = q.bR.split(",");
   // nE = q.nE.split(",");

    return new FormGroup({
      generalTestingMotorId: new FormControl(q.generalTestingMotorId),

      rE: new FormControl(''),
      rEVoltage: new FormControl(rE[0], Validators.required),
      rEResistance: new FormControl(rE[1], Validators.required),
      rECResistance: new FormControl(rE[2], Validators.required),
      rEWResistance: new FormControl(rE[3], Validators.required),

      yE: new FormControl(''),
      yEVoltage: new FormControl(yE[0], Validators.required),
      yEResistance: new FormControl(yE[1], Validators.required),
      yECResistance: new FormControl(yE[2], Validators.required),
      yEWResistance: new FormControl(yE[3], Validators.required),

      bE: new FormControl(''),
      bEVoltage: new FormControl(bE[0], Validators.required),
      bEResistance: new FormControl(bE[1], Validators.required),
      bECResistance: new FormControl(bE[2], Validators.required),
      bEWResistance:  new FormControl(bE[3], Validators.required),

      rY: new FormControl(''),
      rYVoltage: new FormControl(rY[0], Validators.required),
      rYResistance: new FormControl(rY[1], Validators.required),
      rYCResistance: new FormControl(rY[2], Validators.required),
      rYWResistance: new FormControl(rY[3], Validators.required),

      yB: new FormControl(''),
      yBVoltage: new FormControl(yB[0], Validators.required),
      yBResistance: new FormControl(yB[1], Validators.required),
      yBCResistance: new FormControl(yB[2], Validators.required),
      yBRWesistance: new FormControl(yB[3], Validators.required),

      bR: new FormControl(''),
      bRVoltage: new FormControl(bR[0], Validators.required),
      bRResistance: new FormControl(bR[1], Validators.required),
      bRCResistance: new FormControl(bR[2], Validators.required),
      bRWResistance: new FormControl(bR[3], Validators.required),

      // nE: new FormControl(''),
      // nEVoltage: new FormControl(nE[0], Validators.required),
      // nEResistance: new FormControl(nE[1], Validators.required),

      iRCurrent: new FormControl(q.iRCurrent, Validators.required),
      iYCurrent: new FormControl(q.iYCurrent, Validators.required),
      iBCurrent: new FormControl(q.iBCurrent, Validators.required),
     // iNCurrent: new FormControl(q.iNCurrent, Validators.required),
      iPECurrent: new FormControl(q.iPECurrent, Validators.required),

      polarityR: new FormControl(q.polarityR, Validators.required),
      polarityY: new FormControl(q.polarityY, Validators.required),
      polarityB: new FormControl(q.polarityB, Validators.required),

      powerFactor: new FormControl(q.powerFactor, Validators.required),
      frequency: new FormControl(q.frequency, Validators.required),
    });
  }

  populateSafetyTestingLtMotorForm(w: any): FormGroup {
    let rN = [];
    let yN = [];
    let bN = [];
    let rE = [];
    let yE = [];
    let bE = [];
    let rY = [];
    let yB = [];
    let bR = [];

    rN = w.rN.split(",");
    yN = w.yN.split(",");
    bN = w.bN.split(",");
    rE = w.rE.split(",");
    yE = w.yE.split(",");
    bE = w.bE.split(",");
    rY = w.rY.split(",");
    yB = w.yB.split(",");
    bR = w.bR.split(",");

    return new FormGroup({
      safetyTestingMotorId: new FormControl(w.safetyTestingMotorId),
      rN: new FormControl(''),
      rNImpedance: new FormControl(rN[0], Validators.required),
      rNCurrent: new FormControl(rN[1], Validators.required),
      rNTime: new FormControl(rN[2], Validators.required),
      rNRemarks: new FormControl(rN[3], Validators.required),

      yN: new FormControl(''),
      yNImpedance: new FormControl(yN[0], Validators.required),
      yNCurrent: new FormControl(yN[1], Validators.required),
      yNTime: new FormControl(yN[2], Validators.required),
      yNRemarks: new FormControl(yN[3], Validators.required),

      bN: new FormControl(''),
      bNImpedance: new FormControl(bN[0], Validators.required),
      bNCurrent: new FormControl(bN[1], Validators.required),
      bNTime: new FormControl(bN[2], Validators.required),
      bNRemarks: new FormControl(bN[3], Validators.required),

      rE: new FormControl(''),
      rEImpedance: new FormControl(rE[0], Validators.required),
      rECurrent: new FormControl(rE[1], Validators.required),
      rETime: new FormControl(rE[2], Validators.required),
      rERemarks: new FormControl(rE[3], Validators.required),

      yE: new FormControl(''),
      yEImpedance: new FormControl(yE[0], Validators.required),
      yECurrent: new FormControl(yE[1], Validators.required),
      yETime: new FormControl(yE[2], Validators.required),
      yERemarks: new FormControl(yE[3], Validators.required),

      bE: new FormControl(''),
      bEImpedance: new FormControl(bE[0], Validators.required),
      bECurrent: new FormControl(bE[1], Validators.required),
      bETime: new FormControl(bE[2], Validators.required),
      bERemarks: new FormControl(bE[3], Validators.required),

      rY: new FormControl(''),
      rYImpedance: new FormControl(rY[0], Validators.required),
      rYCurrent: new FormControl(rY[1], Validators.required),
      rYTime: new FormControl(rY[2], Validators.required),
      rYRemarks: new FormControl(rY[3], Validators.required),

      yB: new FormControl(''),
      yBImpedance: new FormControl(yB[0], Validators.required),
      yBCurrent: new FormControl(yB[1], Validators.required),
      yBTime: new FormControl(yB[2], Validators.required),
      yBRemarks: new FormControl(yB[3], Validators.required),

      bR: new FormControl(''),
      bRImpedance: new FormControl(bR[0], Validators.required),
      bRCurrent: new FormControl(bR[1], Validators.required),
      bRTime: new FormControl(bR[2], Validators.required),
      bRRemarks: new FormControl(bR[3], Validators.required),

      shockVoltage: new FormControl(w.shockVoltage, Validators.required),
      floorResistance: new FormControl(w.floorResistance, Validators.required),
      wallResistance: new FormControl(w.wallResistance, Validators.required),
    });
  }
  get j() {
    return this.ltMotorForm.controls;
  }

  onChangeForm(event:any){
    if(!this.ltMotorForm.invalid){
      if(this.ltMotorForm.dirty){
        this.validationError=false;
      }
      else{
        this.validationError=false;
      }
     }
  }
  onKeyForm(event: KeyboardEvent) { 
    if(!this.ltMotorForm.invalid){
      if(this.ltMotorForm.dirty){
        this.validationError=false;
      }
      else{
        this.validationError=false;
      }
     }
  } 

  saveLTMotor(ltMotorFlag: any) {
    this.submittedltMotor = true;
    if (this.ltMotorForm.invalid) {
      this.validationError = true;
      this.validationErrorMsg = "Please check all the fields";
      return;
    }

    this.ltMotorGeneralTestingArray = this.ltMotorForm.get('generalTestingLTMotor') as FormArray;
    this.ltMotorSafetyTestingArray = this.ltMotorForm.get('safetyTestingLTMotor') as FormArray;

    for (let i of this.ltMotorGeneralTestingArray.controls) {
    
      let arr4: any = [];
      let arr5: any = [];
      let arr6: any = [];
      let arr7: any = [];
      let arr8: any = [];
      let arr9: any = [];
      //let arr10: any = [];

     
      arr4.push(i.controls.rEVoltage.value, i.controls.rEResistance.value, i.controls.rECResistance.value, i.controls.rEWResistance.value);
      arr5.push(i.controls.yEVoltage.value, i.controls.yEResistance.value, i.controls.yECResistance.value, i.controls.yEWResistance.value);
      arr6.push(i.controls.bEVoltage.value, i.controls.bEResistance.value, i.controls.bECResistance.value, i.controls.bEWResistance.value);
      arr7.push(i.controls.rYVoltage.value, i.controls.rYResistance.value, i.controls.rYCResistance.value, i.controls.rYWResistance.value);
      arr8.push(i.controls.yBVoltage.value, i.controls.yBResistance.value, i.controls.yBCResistance.value, i.controls.yBRWesistance.value);
      arr9.push(i.controls.bRVoltage.value, i.controls.bRResistance.value, i.controls.bRCResistance.value, i.controls.bRWResistance.value);
    //  arr10.push(i.controls.nEVoltage.value, i.controls.nEResistance.value);

     
      let rE: String = '';
      let yE: String = '';
      let bE: String = '';
      let rY: String = '';
      let yB: String = '';
      let bR: String = '';
      //let nE: String = '';


      if (i.controls.iRCurrent.value == '' || i.controls.iRCurrent.value == null || i.controls.iRCurrent.value == undefined) {
        i.controls.iRCurrent.setValue('NA');
      }

      if (i.controls.iYCurrent.value == '' || i.controls.iYCurrent.value == null || i.controls.iYCurrent.value == undefined) {
        i.controls.iYCurrent.setValue('NA');
      }

      if (i.controls.iBCurrent.value == '' || i.controls.iBCurrent.value == null || i.controls.iBCurrent.value == undefined) {
        i.controls.iBCurrent.setValue('NA');
      }

      // if (i.controls.iNCurrent.value == '' || i.controls.iNCurrent.value == null || i.controls.iNCurrent.value == undefined) {
      //   i.controls.iNCurrent.setValue('NA');
      // }

      if (i.controls.iPECurrent.value == '' || i.controls.iPECurrent.value == null || i.controls.iPECurrent.value == undefined) {
        i.controls.iPECurrent.setValue('NA');
      }
     
      for (let d of arr4) {
        if (d != '' && d != null && d != undefined) {
          rE += d + ',';
        }
        else {
          rE += 'NA,';
        }
      }
      rE = rE.replace(/,\s*$/, '');
      i.controls.rE.setValue(rE);



      for (let e of arr5) {
        if (e != '' && e != null && e != undefined) {
          yE += e + ',';
        }
        else {
          yE += 'NA,';
        }
      }
      yE = yE.replace(/,\s*$/, '');
      i.controls.yE.setValue(yE);


      for (let f of arr6) {
        if (f != '' && f != null && f != undefined) {
          bE += f + ',';
        }
        else {
          bE += 'NA,';
        }
      }
      bE = bE.replace(/,\s*$/, '');
      i.controls.bE.setValue(bE);


      for (let g of arr7) {
        if (g != '' && g != null && g != undefined) {
          rY += g + ',';
        }
        else {
          rY += 'NA,';
        }
      }
      rY = rY.replace(/,\s*$/, '');
      i.controls.rY.setValue(rY);


      for (let h of arr8) {
        if (h != '' && h != null && h != undefined) {
          yB += h + ',';
        }
        else {
          yB += 'NA,';
        }
      }
      yB = yB.replace(/,\s*$/, '');
      i.controls.yB.setValue(yB);


      for (let i of arr9) {
        if (i != '' && i != null && i != undefined) {
          bR += i + ',';
        }
        else {
          bR += 'NA,';
        }
      }
      bR = bR.replace(/,\s*$/, '');
      i.controls.bR.setValue(bR);


      // for (let j of arr10) {
      //   if (j != '' && j != null && j != undefined) {
      //     nE += j + ',';
      //   }
      //   else {
      //     nE += 'NA,';
      //   }
      // }
      // nE = nE.replace(/,\s*$/, '');
      // i.controls.nE.setValue(nE);
    }

    for (let i of this.ltMotorSafetyTestingArray.controls) {
      let arr1: any = [];
      let arr2: any = [];
      let arr3: any = [];
      let arr4: any = [];
      let arr5: any = [];
      let arr6: any = [];
      let arr7: any = [];
      let arr8: any = [];
      let arr9: any = [];

      arr1.push(i.controls.rNImpedance.value, i.controls.rNCurrent.value, i.controls.rNTime.value, i.controls.rNRemarks.value);
      arr2.push(i.controls.yNImpedance.value, i.controls.yNCurrent.value, i.controls.yNTime.value, i.controls.yNRemarks.value);
      arr3.push(i.controls.bNImpedance.value, i.controls.bNCurrent.value, i.controls.bNTime.value, i.controls.bNRemarks.value);
      arr4.push(i.controls.rEImpedance.value, i.controls.rECurrent.value, i.controls.rETime.value, i.controls.rERemarks.value);
      arr5.push(i.controls.yEImpedance.value, i.controls.yECurrent.value, i.controls.yETime.value, i.controls.yERemarks.value);
      arr6.push(i.controls.bEImpedance.value, i.controls.bECurrent.value, i.controls.bETime.value, i.controls.bERemarks.value);
      arr7.push(i.controls.rYImpedance.value, i.controls.rYCurrent.value, i.controls.rYTime.value, i.controls.rYRemarks.value);
      arr8.push(i.controls.yBImpedance.value, i.controls.yBCurrent.value, i.controls.yBTime.value, i.controls.yBRemarks.value);
      arr9.push(i.controls.bRImpedance.value, i.controls.bRCurrent.value, i.controls.bRTime.value, i.controls.bRRemarks.value);

      let rN: String = '';
      let yN: String = '';
      let bN: String = '';
      let rE: String = '';
      let yE: String = '';
      let bE: String = '';
      let rY: String = '';
      let yB: String = '';
      let bR: String = '';

      for (let a of arr1) {
        if (a != '' && a != null && a != undefined) {
          rN += a + ',';
        }
        else {
          rN += 'NA,';
        }
      }
      rN = rN.replace(/,\s*$/, '');
      i.controls.rN.setValue(rN);



      for (let b of arr2) {
        if (b != '' && b != null && b != undefined) {
          yN += b + ',';
        }
        else {
          yN += 'NA,';
        }
      }
      yN = yN.replace(/,\s*$/, '');
      i.controls.yN.setValue(yN);


      for (let c of arr3) {
        if (c != '' && c != null && c != undefined) {
          bN += c + ',';
        }
        else {
          bN += 'NA,';
        }
      }
      bN = bN.replace(/,\s*$/, '');
      i.controls.bN.setValue(bN);


      for (let d of arr4) {
        if (d != '' && d != null && d != undefined) {
          rE += d + ',';
        }
        else {
          rE += 'NA,';
        }
      }
      rE = rE.replace(/,\s*$/, '');
      i.controls.rE.setValue(rE);



      for (let e of arr5) {
        if (e != '' && e != null && e != undefined) {
          yE += e + ',';
        }
        else {
          yE += 'NA,';
        }
      }
      yE = yE.replace(/,\s*$/, '');
      i.controls.yE.setValue(yE);


      for (let f of arr6) {
        if (f != '' && f != null && f != undefined) {
          bE += f + ',';
        }
        else {
          bE += 'NA,';
        }
      }
      bE = bE.replace(/,\s*$/, '');
      i.controls.bE.setValue(bE);


      for (let g of arr7) {
        if (g != '' && g != null && g != undefined) {
          rY += g + ',';
        }
        else {
          rY += 'NA,';
        }
      }
      rY = rY.replace(/,\s*$/, '');
      i.controls.rY.setValue(rY);


      for (let h of arr8) {
        if (h != '' && h != null && h != undefined) {
          yB += h + ',';
        }
        else {
          yB += 'NA,';
        }
      }
      yB = yB.replace(/,\s*$/, '');
      i.controls.yB.setValue(yB);


      for (let i of arr9) {
        if (i != '' && i != null && i != undefined) {
          bR += i + ',';
        }
        else {
          bR += 'NA,';
        }
      }
      bR = bR.replace(/,\s*$/, '');
      i.controls.bR.setValue(bR);
    }

    this.ltMotor.generalTestingLTMotor = this.ltMotorForm.value.generalTestingLTMotor;
    this.ltMotor.safetyTestingLTMotor = this.ltMotorForm.value.safetyTestingLTMotor;
    this.ltMotor.userName = this.email;

    if (ltMotorFlag) {
      this.LTMotorService.updateLTMotor(this.ltMotor).subscribe(
        data => {
          this.LTMotorService.retriveLTMotor(this.ltMotor.fileName,this.ltMotor.nodeId).subscribe(
            data => {
              this.ltMotorData = JSON.parse(data);
              if(this.ltMotorData.length != 0) {
                this.retrieveLTMotorNode(this.ltMotorData);
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
      this.LTMotorService.addLTMotor(this.ltMotor).subscribe(
        data => {
          this.LTMotorService.retriveLTMotor(this.ltMotor.fileName,this.ltMotor.nodeId).subscribe(
            data => {
              this.ltMotorData = JSON.parse(data);
              if(this.ltMotorData.length != 0) {
                this.retrieveLTMotorNode(this.ltMotorData);
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
            this.errorMsg = "";
          }, 3000);
        }
      )
    }
  }
  close() {
    this.dialog.closeAll();
  }
}
