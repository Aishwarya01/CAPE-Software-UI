import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GlobalsService } from 'src/app/globals.service';
import { MCCB } from 'src/app/SLD/SLD Models/mccb';
import { MCCBServicesService } from 'src/app/SLD/SLD Services/mccb-services.service';

@Component({
  selector: 'app-mccb',
  templateUrl: './mccb.component.html',
  styleUrls: ['./mccb.component.css']
})
export class MCCBComponent implements OnInit {
  //MCCB
  mccbForm!: FormGroup;
  mccb = new MCCB();
  submittedMccb: boolean = false;
  mccbFlag: boolean = false;
  mccbData: any;
  mccbGeneralTestingArray: any = [];
  mccbSafetyTestingArray: any = [];
  validationError: boolean= false;
  validationErrorMsg: string="";
  success: boolean = false;
  successMsg: String = '';
  error: boolean = false;
  errorMsg: String = ''
  errorData: any;
  popup: boolean = false;
  finalSpinner: boolean = false;
  Error: boolean = false;
  errorArr: any = [];

  @Input()
  fileName: any;
  @Input()
  nodeId: any;
  @Input()
  email: any;

  constructor(private formBuilder: FormBuilder,
              private mccbService: MCCBServicesService,
              private dialog: MatDialog,
              private service: GlobalsService) { }

  ngOnInit(): void {
    this.mccbForm = this.formBuilder.group({
      referenceName: [''],
      manufacturerName: [''],
      rating: ['', Validators.required],
      voltage: ['', Validators.required],
      noOfPoles: ['', Validators.required],
      // relayManufacturer: ['', Validators.required],
      model: [''],
      overcurrent: ['', Validators.required],
      setTimes: ['', Validators.required],
      earthFault: ['', Validators.required],
      setTime: ['', Validators.required],
      // outgoingSizePhase: ['', Validators.required],
      // outgoingSizeNeutral: ['', Validators.required],
      // outgoingSizeProtective: ['', Validators.required],
      generalTestingMCCB: this.formBuilder.array([this.createGeneralTestingMCCB()]),
      safetyTestingMCCB: this.formBuilder.array([this.createSafetyTestingMCCB()]),
    });

    this.mccb.fileName = this.fileName;
    this.mccb.nodeId = this.nodeId;

    this.mccbService.retriveMCCB(this.fileName,this.nodeId).subscribe(
          data => {
            this.mccbData = JSON.parse(data);
            if(this.mccbData.length != 0) {
              this.retrieveMccbNode(this.mccbData);
            }
          }
        )


  }

  //MCCB

  private createGeneralTestingMCCB(): FormGroup {
    return new FormGroup({
      rN: new FormControl(''),
      rNVoltage: new FormControl('', Validators.required),
      rNResistance: new FormControl('', Validators.required),

      yN: new FormControl(''),
      yNVoltage: new FormControl('', Validators.required),
      yNResistance: new FormControl('', Validators.required),

      bN: new FormControl(''),
      bNVoltage: new FormControl('', Validators.required),
      bNResistance: new FormControl('', Validators.required),

      rE: new FormControl(''),
      rEVoltage: new FormControl('', Validators.required),
      rEResistance: new FormControl('', Validators.required),

      yE: new FormControl(''),
      yEVoltage: new FormControl('', Validators.required),
      yEResistance: new FormControl('', Validators.required),

      bE: new FormControl(''),
      bEVoltage: new FormControl('', Validators.required),
      bEResistance: new FormControl('', Validators.required),

      rY: new FormControl(''),
      rYVoltage: new FormControl('', Validators.required),
      rYResistance: new FormControl('', Validators.required),

      yB: new FormControl(''),
      yBVoltage: new FormControl('', Validators.required),
      yBResistance: new FormControl('', Validators.required),

      bR: new FormControl(''),
      bRVoltage: new FormControl('', Validators.required),
      bRResistance: new FormControl('', Validators.required),

      nE: new FormControl(''),
      nEVoltage: new FormControl('', Validators.required),
      nEResistance: new FormControl('', Validators.required),

      iRCurrent: new FormControl('', Validators.required),
      iYCurrent: new FormControl('', Validators.required),
      iBCurrent: new FormControl('', Validators.required),
      iNCurrent: new FormControl('', Validators.required),
      iPECurrent: new FormControl('', Validators.required),

      powerFactor: new FormControl('', Validators.required),
      frequency: new FormControl('', Validators.required),
    });
  }
  private createSafetyTestingMCCB(): FormGroup {
    return new FormGroup({
      rN: new FormControl(''),
      rNImpedence: new FormControl('', Validators.required),
      rNCurrent: new FormControl('', Validators.required),
      rNTime: new FormControl('', Validators.required),
      rNRemarks: new FormControl('', Validators.required),

      yN: new FormControl(''),
      yNImpedence: new FormControl('', Validators.required),
      yNCurrent: new FormControl('', Validators.required),
      yNTime: new FormControl('', Validators.required),
      yNRemarks: new FormControl('', Validators.required),


      bN: new FormControl(''),
      bNImpedence: new FormControl('', Validators.required),
      bNCurrent: new FormControl('', Validators.required),
      bNTime: new FormControl('', Validators.required),
      bNRemarks: new FormControl('', Validators.required),


      rE: new FormControl(''),
      rEImpedence: new FormControl('', Validators.required),
      rECurrent: new FormControl('', Validators.required),
      rETime: new FormControl('', Validators.required),
      rERemarks: new FormControl('', Validators.required),


      yE: new FormControl(''),
      yEImpedence: new FormControl('', Validators.required),
      yECurrent: new FormControl('', Validators.required),
      yETime: new FormControl('', Validators.required),
      yERemarks: new FormControl('', Validators.required),


      bE: new FormControl(''),
      bEImpedence: new FormControl('', Validators.required),
      bECurrent: new FormControl('', Validators.required),
      bETime: new FormControl('', Validators.required),
      bERemarks: new FormControl('', Validators.required),


      rY: new FormControl(''),
      rYImpedence: new FormControl('', Validators.required),
      rYCurrent: new FormControl('', Validators.required),
      rYTime: new FormControl('', Validators.required),
      rYRemarks: new FormControl('', Validators.required),


      yB: new FormControl(''),
      yBImpedence: new FormControl('', Validators.required),
      yBCurrent: new FormControl('', Validators.required),
      yBTime: new FormControl('', Validators.required),
      yBRemarks: new FormControl('', Validators.required),


      bR: new FormControl(''),
      bRImpedence: new FormControl('', Validators.required),
      bRCurrent: new FormControl('', Validators.required),
      bRTime: new FormControl('', Validators.required),
      bRRemarks: new FormControl('', Validators.required),


      // shockVoltage: new FormControl('', Validators.required),
      // floorResistance: new FormControl('', Validators.required),
      // wallResistance: new FormControl('', Validators.required),
    });
  }

  getGeneralTestingMCCBControls() : AbstractControl[] {
    return (<FormArray>this.mccbForm.get('generalTestingMCCB')).controls;
  }

  getSafetyTestingMCCBControls() : AbstractControl[] {
    return (<FormArray>this.mccbForm.get('safetyTestingMCCB')).controls;
  }

  addMCCBTesting() {
    let generalTestingMCCBArr: any = [];
    let safetyTestingMCCBArr: any = [];

    generalTestingMCCBArr = this.mccbForm.get('generalTestingMCCB') as FormArray;
    safetyTestingMCCBArr = this.mccbForm.get('safetyTestingMCCB') as FormArray;

    generalTestingMCCBArr.push(this.createGeneralTestingMCCB());
    safetyTestingMCCBArr.push(this.createSafetyTestingMCCB());

  }

  removeMCCBtesting(a: any, i: any) {
    (this.mccbForm.get('generalTestingMCCB') as FormArray).removeAt(i);
    (this.mccbForm.get('safetyTestingMCCB') as FormArray).removeAt(i)
  }

  get h(){
    return this.mccbForm.controls;
  }
 
  retrieveMccbNode(data: any) {
    this.mccbFlag = true;
    for(let i of data) {
      this.mccb.referenceName = i.referenceName;
      this.mccb.manufacturerName = i.manufacturerName;
      this.mccb.rating = i.rating;
      this.mccb.voltage = i.voltage;
      // this.mccb.relayManufacturer= i.relayManufacturer;
      this.mccb.noOfPoles = i.noOfPoles;
      this.mccb.model = i.model;
      this.mccb.overcurrent = i.overcurrent;
      this.mccb.setTimes = i.setTimes;
      this.mccb.earthFault = i.earthFault;
      this.mccb.setTime = i.setTime;
      // this.mccb.outgoingSizePhase = i.outgoingSizePhase;
      // this.mccb.outgoingSizeNeutral = i.outgoingSizeNeutral;
      // this.mccb.outgoingSizeProtective =i.outgoingSizeProtective;
      this.mccb.createdBy = i.createdBy;
      this.mccb.createdDate = i.createdDate;
      this.mccb.updatedBy = i.updatedBy;
      this.mccb.updatedDate = i.updatedDate;
      this.mccb.nodeId = i.nodeId;
      this.mccb.fileName = i.fileName;
      this.mccb.mccbID = i.mccbID;

      this.populateMccbForm(i);
    }
  }

  populateMccbForm(i: any) {
    let generalTestingMCCBArr : any = []
    let safetyTestingMCCBArr : any = []

    for(let q of i.generalTestingMCCB) {
      generalTestingMCCBArr.push(this.populateGeneralTestingMCCBForm(q));
    }

    for(let w of i.safetyTestingMCCB) {
      safetyTestingMCCBArr.push(this.populateSafetyTestingMCCBForm(w));
    }

    this.mccbForm.setControl('generalTestingMCCB', this.formBuilder.array(generalTestingMCCBArr || []));
    this.mccbForm.setControl('safetyTestingMCCB', this.formBuilder.array(safetyTestingMCCBArr || []));
  }

  populateGeneralTestingMCCBForm(q: any): FormGroup {
    let rN = [];
    let yN = [];	
    let bN = [];
    let rE = [];
    let yE = [];	
    let bE = [];
    let rY = [];
    let yB = [];	
    let bR = [];
    let nE = [];
    
    rN = q.rN.split(",");
    yN = q.yN.split(",");
    bN = q.bN.split(",");
    rE = q.rE.split(",");
    yE = q.yE.split(",");
    bE = q.bE.split(",");
    rY = q.rY.split(",");
    yB = q.yB.split(",");
    bR = q.bR.split(",");
    nE = q.nE.split(",");

    return new FormGroup({
      generalTestingMCCBId: new FormControl(q.generalTestingMCCBId),
      rN: new FormControl(''),
      rNVoltage: new FormControl(rN[0], Validators.required),
      rNResistance: new FormControl(rN[1], Validators.required),

      yN: new FormControl(''),
      yNVoltage: new FormControl(yN[0], Validators.required),
      yNResistance: new FormControl(yN[1], Validators.required),

      bN: new FormControl(''),
      bNVoltage: new FormControl(bN[0], Validators.required),
      bNResistance: new FormControl(bN[1], Validators.required),

      rE: new FormControl(''),
      rEVoltage: new FormControl(rE[0], Validators.required),
      rEResistance: new FormControl(rE[1], Validators.required),

      yE: new FormControl(''),
      yEVoltage: new FormControl(yE[0], Validators.required),
      yEResistance: new FormControl(yE[1], Validators.required),

      bE: new FormControl(''),
      bEVoltage: new FormControl(bE[0], Validators.required),
      bEResistance: new FormControl(bE[1], Validators.required),

      rY: new FormControl(''),
      rYVoltage: new FormControl(rY[0], Validators.required),
      rYResistance: new FormControl(rY[1], Validators.required),

      yB: new FormControl(''),
      yBVoltage: new FormControl(yB[0], Validators.required),
      yBResistance: new FormControl(yB[1], Validators.required),

      bR: new FormControl(''),
      bRVoltage: new FormControl(bR[0], Validators.required),
      bRResistance: new FormControl(bR[1], Validators.required),

      nE: new FormControl(''),
      nEVoltage: new FormControl(nE[0], Validators.required),
      nEResistance: new FormControl(nE[1], Validators.required),

      iRCurrent: new FormControl(q.iRCurrent, Validators.required),
      iYCurrent: new FormControl(q.iYCurrent, Validators.required),
      iBCurrent: new FormControl(q.iBCurrent, Validators.required),
      iNCurrent: new FormControl(q.iNCurrent, Validators.required),
      iPECurrent: new FormControl(q.iPECurrent, Validators.required),

      powerFactor: new FormControl(q.powerFactor, Validators.required),
      frequency: new FormControl(q.frequency, Validators.required),
    });
  }

  populateSafetyTestingMCCBForm(w: any): FormGroup {
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
      safetyTestingMCCBId: new FormControl(w.safetyTestingMCCBId),
      rN: new FormControl(''),
      rNImpedence: new FormControl(rN[0], Validators.required),
      rNCurrent: new FormControl(rN[1], Validators.required),
      rNTime: new FormControl(rN[2], Validators.required),
      rNRemarks: new FormControl(rN[3], Validators.required),

      yN: new FormControl(''),
      yNImpedence: new FormControl(yN[0], Validators.required),
      yNCurrent: new FormControl(yN[1], Validators.required),
      yNTime: new FormControl(yN[2], Validators.required),
      yNRemarks: new FormControl(yN[3], Validators.required),

      bN: new FormControl(''),
      bNImpedence: new FormControl(bN[0], Validators.required),
      bNCurrent: new FormControl(bN[1], Validators.required),
      bNTime: new FormControl(bN[2], Validators.required),
      bNRemarks: new FormControl(bN[3], Validators.required),

      rE: new FormControl(''),
      rEImpedence: new FormControl(rE[0], Validators.required),
      rECurrent: new FormControl(rE[1], Validators.required),
      rETime: new FormControl(rE[2], Validators.required),
      rERemarks: new FormControl(rE[3], Validators.required),

      yE: new FormControl(''),
      yEImpedence: new FormControl(yE[0], Validators.required),
      yECurrent: new FormControl(yE[1], Validators.required),
      yETime: new FormControl(yE[2], Validators.required),
      yERemarks: new FormControl(yE[3], Validators.required),

      bE: new FormControl(''),
      bEImpedence: new FormControl(bE[0], Validators.required),
      bECurrent: new FormControl(bE[1], Validators.required),
      bETime: new FormControl(bE[2], Validators.required),
      bERemarks: new FormControl(bE[3], Validators.required),

      rY: new FormControl(''),
      rYImpedence: new FormControl(rY[0], Validators.required),
      rYCurrent: new FormControl(rY[1], Validators.required),
      rYTime: new FormControl(rY[2], Validators.required),
      rYRemarks: new FormControl(rY[3], Validators.required),

      yB: new FormControl(''),
      yBImpedence: new FormControl(yB[0], Validators.required),
      yBCurrent: new FormControl(yB[1], Validators.required),
      yBTime: new FormControl(yB[2], Validators.required),
      yBRemarks: new FormControl(yB[3], Validators.required),

      bR: new FormControl(''),
      bRImpedence: new FormControl(bR[0], Validators.required),
      bRCurrent: new FormControl(bR[1], Validators.required),
      bRTime: new FormControl(bR[2], Validators.required),
      bRRemarks: new FormControl(bR[3], Validators.required),

      // shockVoltage: new FormControl(w.shockVoltage, Validators.required),
      // floorResistance: new FormControl(w.floorResistance, Validators.required),
      // wallResistance: new FormControl(w.wallResistance, Validators.required),
    });
  }

  onChangeForm(event:any){
    if(!this.mccbForm.invalid){
      if(this.mccbForm.dirty){
        this.validationError=false;
      }
      else{
        this.validationError=false;
      }
     }
  }
  onKeyForm(event: KeyboardEvent) { 
    if(!this.mccbForm.invalid){
      if(this.mccbForm.dirty){
        this.validationError=false;
      }
      else{
        this.validationError=false;
      }
     }
  } 

  saveMCCB(mccbFlag:any) {
    this.submittedMccb = true;
    if(this.mccbForm.invalid) {
      this.validationError=true;
      this.validationErrorMsg="Please check all the fields";
        return;
    }

    this.mccbGeneralTestingArray = this.mccbForm.get('generalTestingMCCB') as FormArray;
    this.mccbSafetyTestingArray = this.mccbForm.get('safetyTestingMCCB') as FormArray;

    for(let i of this.mccbGeneralTestingArray.controls) {
      let arr1: any = [];
      let arr2: any = [];
      let arr3: any = [];
      let arr4: any = [];
      let arr5: any = [];
      let arr6: any = [];
      let arr7: any = [];
      let arr8: any = [];
      let arr9: any = [];
      let arr10: any = [];

      arr1.push(i.controls.rNVoltage.value, i.controls.rNResistance.value);
      arr2.push(i.controls.yNVoltage.value, i.controls.yNResistance.value);
      arr3.push(i.controls.bNVoltage.value, i.controls.bNResistance.value);
      arr4.push(i.controls.rEVoltage.value, i.controls.rEResistance.value);
      arr5.push(i.controls.yEVoltage.value, i.controls.yEResistance.value);
      arr6.push(i.controls.bEVoltage.value, i.controls.bEResistance.value);
      arr7.push(i.controls.rYVoltage.value, i.controls.rYResistance.value);
      arr8.push(i.controls.yBVoltage.value, i.controls.yBResistance.value);
      arr9.push(i.controls.bRVoltage.value, i.controls.bRResistance.value);
      arr10.push(i.controls.nEVoltage.value, i.controls.nEResistance.value);

      let rN: String = '';
      let yN: String = '';
      let bN: String = '';
      let rE: String = '';
      let yE: String = '';
      let bE: String = '';
      let rY: String = '';
      let yB: String = '';
      let bR: String = '';
      let nE: String = '';


      if(i.controls.iRCurrent.value == '' || i.controls.iRCurrent.value == null || i.controls.iRCurrent.value == undefined) {
        i.controls.iRCurrent.setValue('NA');
      }

      if(i.controls.iYCurrent.value == '' || i.controls.iYCurrent.value == null || i.controls.iYCurrent.value == undefined) {
        i.controls.iYCurrent.setValue('NA');
      }

      if(i.controls.iBCurrent.value == '' || i.controls.iBCurrent.value == null || i.controls.iBCurrent.value == undefined) {
        i.controls.iBCurrent.setValue('NA');
      }

      if(i.controls.iNCurrent.value == '' || i.controls.iNCurrent.value == null || i.controls.iNCurrent.value == undefined) {
        i.controls.iNCurrent.setValue('NA');
      }

      if(i.controls.iPECurrent.value == '' || i.controls.iPECurrent.value == null || i.controls.iPECurrent.value == undefined) {
        i.controls.iPECurrent.setValue('NA');
      }


      for(let a of arr1) {
        if(a != '' && a != null && a != undefined) {
          rN += a + ',';
        }
        else {
          rN += 'NA,';
        }
      }
      rN = rN.replace(/,\s*$/, '');
      i.controls.rN.setValue(rN);



      for(let b of arr2) {
        if(b != '' && b != null && b != undefined) {
          yN += b + ',';
        }
        else {
          yN += 'NA,';
        }
      }
      yN = yN.replace(/,\s*$/, '');
      i.controls.yN.setValue(yN);


      for(let c of arr3) {
        if(c != '' && c != null && c != undefined) {
          bN += c + ',';
        }
        else {
          bN += 'NA,';
        }
      }
      bN = bN.replace(/,\s*$/, '');
      i.controls.bN.setValue(bN);


      for(let d of arr4) {
        if(d != '' && d != null && d != undefined) {
          rE += d + ',';
        }
        else {
          rE += 'NA,';
        }
      }
      rE = rE.replace(/,\s*$/, '');
      i.controls.rE.setValue(rE);



      for(let e of arr5) {
        if(e != '' && e != null && e != undefined) {
          yE += e + ',';
        }
        else {
          yE += 'NA,';
        }
      }
      yE = yE.replace(/,\s*$/, '');
      i.controls.yE.setValue(yE);


      for(let f of arr6) {
        if(f != '' && f != null && f != undefined) {
          bE += f + ',';
        }
        else {
          bE += 'NA,';
        }
      }
      bE = bE.replace(/,\s*$/, '');
      i.controls.bE.setValue(bE);


      for(let g of arr7) {
        if(g != '' && g != null && g != undefined) {
          rY += g + ',';
        }
        else {
          rY += 'NA,';
        }
      }
      rY = rY.replace(/,\s*$/, '');
      i.controls.rY.setValue(rY);


      for(let h of arr8) {
        if(h != '' && h != null && h != undefined) {
          yB += h + ',';
        }
        else {
          yB += 'NA,';
        }
      }
      yB = yB.replace(/,\s*$/, '');
      i.controls.yB.setValue(yB);


      for(let i of arr9) {
        if(i != '' && i != null && i != undefined) {
          bR += i + ',';
        }
        else {
          bR += 'NA,';
        }
      }
      bR = bR.replace(/,\s*$/, '');
      i.controls.bR.setValue(bR);


      for(let j of arr10) {
        if(j != '' && j != null && j != undefined) {
          nE += j + ',';
        }
        else {
          nE += 'NA,';
        }
      }
      nE = nE.replace(/,\s*$/, '');
      i.controls.nE.setValue(nE);   
    }

    for(let i of this.mccbSafetyTestingArray.controls) {
      let arr1: any = [];
      let arr2: any = [];
      let arr3: any = [];
      let arr4: any = [];
      let arr5: any = [];
      let arr6: any = [];
      let arr7: any = [];
      let arr8: any = [];
      let arr9: any = [];

      arr1.push(i.controls.rNImpedence.value, i.controls.rNCurrent.value, i.controls.rNTime.value, i.controls.rNRemarks.value);
      arr2.push(i.controls.yNImpedence.value, i.controls.yNCurrent.value, i.controls.yNTime.value, i.controls.yNRemarks.value);
      arr3.push(i.controls.bNImpedence.value, i.controls.bNCurrent.value, i.controls.bNTime.value, i.controls.bNRemarks.value);
      arr4.push(i.controls.rEImpedence.value, i.controls.rECurrent.value, i.controls.rETime.value, i.controls.rERemarks.value);
      arr5.push(i.controls.yEImpedence.value, i.controls.yECurrent.value, i.controls.yETime.value, i.controls.yERemarks.value);
      arr6.push(i.controls.bEImpedence.value, i.controls.bECurrent.value, i.controls.bETime.value, i.controls.bERemarks.value);
      arr7.push(i.controls.rYImpedence.value, i.controls.rYCurrent.value, i.controls.rYTime.value, i.controls.rYRemarks.value);
      arr8.push(i.controls.yBImpedence.value, i.controls.yBCurrent.value, i.controls.yBTime.value, i.controls.yBRemarks.value);
      arr9.push(i.controls.bRImpedence.value, i.controls.bRCurrent.value, i.controls.bRTime.value, i.controls.bRRemarks.value);

      let rN: String = '';
      let yN: String = '';
      let bN: String = '';
      let rE: String = '';
      let yE: String = '';
      let bE: String = '';
      let rY: String = '';
      let yB: String = '';
      let bR: String = '';

      for(let a of arr1) {
        if(a != '' && a != null && a != undefined) {
          rN += a + ',';
        }
        else {
          rN += 'NA,';
        }
      }
      rN = rN.replace(/,\s*$/, '');
      i.controls.rN.setValue(rN);



      for(let b of arr2) {
        if(b != '' && b != null && b != undefined) {
          yN += b + ',';
        }
        else {
          yN += 'NA,';
        }
      }
      yN = yN.replace(/,\s*$/, '');
      i.controls.yN.setValue(yN);


      for(let c of arr3) {
        if(c != '' && c != null && c != undefined) {
          bN += c + ',';
        }
        else {
          bN += 'NA,';
        }
      }
      bN = bN.replace(/,\s*$/, '');
      i.controls.bN.setValue(bN);


      for(let d of arr4) {
        if(d != '' && d != null && d != undefined) {
          rE += d + ',';
        }
        else {
          rE += 'NA,';
        }
      }
      rE = rE.replace(/,\s*$/, '');
      i.controls.rE.setValue(rE);



      for(let e of arr5) {
        if(e != '' && e != null && e != undefined) {
          yE += e + ',';
        }
        else {
          yE += 'NA,';
        }
      }
      yE = yE.replace(/,\s*$/, '');
      i.controls.yE.setValue(yE);


      for(let f of arr6) {
        if(f != '' && f != null && f != undefined) {
          bE += f + ',';
        }
        else {
          bE += 'NA,';
        }
      }
      bE = bE.replace(/,\s*$/, '');
      i.controls.bE.setValue(bE);


      for(let g of arr7) {
        if(g != '' && g != null && g != undefined) {
          rY += g + ',';
        }
        else {
          rY += 'NA,';
        }
      }
      rY = rY.replace(/,\s*$/, '');
      i.controls.rY.setValue(rY);


      for(let h of arr8) {
        if(h != '' && h != null && h != undefined) {
          yB += h + ',';
        }
        else {
          yB += 'NA,';
        }
      }
      yB = yB.replace(/,\s*$/, '');
      i.controls.yB.setValue(yB);


      for(let i of arr9) {
        if(i != '' && i != null && i != undefined) {
          bR += i + ',';
        }
        else {
          bR += 'NA,';
        }
      }
      bR = bR.replace(/,\s*$/, '');
      i.controls.bR.setValue(bR); 
    }

    this.mccb.generalTestingMCCB = this.mccbForm.value.generalTestingMCCB;
    this.mccb.safetyTestingMCCB = this.mccbForm.value.safetyTestingMCCB;
    this.mccb.userName = this.email;

  if(mccbFlag) {
    this.mccbService.updateMCCB(this.mccb).subscribe(
      data => {
        this.mccbService.retriveMCCB(this.mccb.fileName,this.mccb.nodeId).subscribe(
          data => {
            this.mccbData = JSON.parse(data);
            if(this.mccbData.length != 0) {
              this.retrieveMccbNode(this.mccbData);
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
        // this.errorData = JSON.parse(error.error);
        this.errorMsg = this.service.globalErrorMsg;
        setTimeout(()=>{
          this.error = false;
          this.errorMsg = "";
        }, 3000);
      }
    )
  }
  else{
    this.mccbService.addMCCB(this.mccb).subscribe(
      data => {
        this.mccbService.retriveMCCB(this.mccb.fileName,this.mccb.nodeId).subscribe(
          data => {
            this.mccbData = JSON.parse(data);
            if(this.mccbData.length != 0) {
              this.retrieveMccbNode(this.mccbData);
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
        // this.errorData = JSON.parse(error.error);
        this.errorMsg = this.service.globalErrorMsg;
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
