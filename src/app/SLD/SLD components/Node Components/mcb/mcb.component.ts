import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MCB } from '../../../SLD Models/mcb';
import { MCBServicesService } from '../../../SLD Services/mcb-services.service';

@Component({
  selector: 'app-mcb',
  templateUrl: './mcb.component.html',
  styleUrls: ['./mcb.component.css']
})
export class MCBComponent implements OnInit {
  mcbForm!: FormGroup;
  mcb = new MCB();
  mcbGeneralTestingArray: any = [];
  mcbSafetyTestingArray: any = [];
  submitted: boolean = false;
  mcbFlag: boolean = false;
  mcbData: any;
  success: boolean = false;
  successMsg: String = '';
  error: boolean = false;
  errorMsg: String = ''
  errorData: any;
  @Input()
  nodeId: any;
  @Input()
  fileName: any;
  @Input()
  email: any;
  validationError: boolean= false;
  validationErrorMsg: string="";
  constructor(private mcbService: MCBServicesService,
              private formBuilder: FormBuilder,
              private dialog: MatDialog,
            ) { }

  ngOnInit(): void {
    this.mcbForm = this.formBuilder.group({
      referenceName: [''],
      manufacturerName: [''],
      rating: ['', Validators.required],
      voltage: [''],
      noOfPoles: ['', Validators.required],
      currentCurve: ['', Validators.required],
      outgoingSizePhase: ['', Validators.required],
      outgoingSizeNeutral: ['', Validators.required],
      outgoingSizeProtective: ['', Validators.required],
      generalTestingMCB: this.formBuilder.array([this.createGeneralTestingMCB()]),
      safetyTestingMCB: this.formBuilder.array([this.createSafetyTestingMCB()]),
    });

    this.mcb.fileName = this.fileName;
    this.mcb.nodeId = this.nodeId;

    this.mcbService.retriveMCB(this.fileName,this.nodeId).subscribe(
      data => {
        this.mcbData = JSON.parse(data);
        if(this.mcbData.length != 0) {
          this.retrieveMcbNode(this.mcbData);
        }
      }
    )
  }

  private createGeneralTestingMCB(): FormGroup {
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

  private createSafetyTestingMCB(): FormGroup {
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


      shockVoltage: new FormControl('', Validators.required),
      floorResistance: new FormControl('', Validators.required),
      wallResistance: new FormControl('', Validators.required),
    });
  }

  getGeneralTestingMCBControls() : AbstractControl[] {
    return (<FormArray>this.mcbForm.get('generalTestingMCB')).controls;
  }

  getSafetyTestingMCBControls() : AbstractControl[] {
    return (<FormArray>this.mcbForm.get('safetyTestingMCB')).controls;
  }

  addMCBTesting() {
    let generalTestingMCBArr: any = [];
    let safetyTestingMCBArr: any = [];

    generalTestingMCBArr = this.mcbForm.get('generalTestingMCB') as FormArray;
    safetyTestingMCBArr = this.mcbForm.get('safetyTestingMCB') as FormArray;

    generalTestingMCBArr.push(this.createGeneralTestingMCB());
    safetyTestingMCBArr.push(this.createSafetyTestingMCB());
  }

  removeMCBtesting(a: any, i: any) {
    (this.mcbForm.get('generalTestingMCB') as FormArray).removeAt(i);
    (this.mcbForm.get('safetyTestingMCB') as FormArray).removeAt(i)
  }

  get f(){
    return this.mcbForm.controls;
  }

  retrieveMcbNode(data: any) {
    this.mcbFlag = true;
    for(let i of data) {
      this.mcb.referenceName = i.referenceName;
      this.mcb.manufacturerName = i.manufacturerName;
      this.mcb.rating = i.rating;
      this.mcb.voltage = i.voltage;
      this.mcb.noOfPoles = i.noOfPoles;
      this.mcb.currentCurve = i.currentCurve;
      this.mcb.outgoingSizePhase = i.outgoingSizePhase;
      this.mcb.outgoingSizeNeutral = i.outgoingSizeNeutral;
      this.mcb.outgoingSizeProtective =i.outgoingSizeProtective;
      this.mcb.createdBy = i.createdBy;
      this.mcb.createdDate = i.createdDate;
      this.mcb.updatedBy = i.updatedBy;
      this.mcb.updatedDate = i.updatedDate;
      this.mcb.nodeId = i.nodeId;
      this.mcb.fileName = i.fileName;
      this.mcb.userName = i.userName;
      this.mcb.mcbID = i.mcbID;

      this.populateMcbForm(i);
    }
  }

  populateMcbForm(i: any) {
    let generalTestingMCBArr : any = []
    let safetyTestingMCBArr : any = []

    for(let j of i.generalTestingMCB) {
      generalTestingMCBArr.push(this.populateGeneralTestingMCBForm(j));
    }

    for(let k of i.safetyTestingMCB) {
      safetyTestingMCBArr.push(this.populateSafetyTestingMCBForm(k));
    }

    this.mcbForm.setControl('generalTestingMCB', this.formBuilder.array(generalTestingMCBArr || []));
    this.mcbForm.setControl('safetyTestingMCB', this.formBuilder.array(safetyTestingMCBArr || []));
  }

  populateGeneralTestingMCBForm(j: any): FormGroup {
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
    
    rN = j.rN.split(",");
    yN = j.yN.split(",");
    bN = j.bN.split(",");
    rE = j.rE.split(",");
    yE = j.yE.split(",");
    bE = j.bE.split(",");
    rY = j.rY.split(",");
    yB = j.yB.split(",");
    bR = j.bR.split(",");
    nE = j.nE.split(",");

    return new FormGroup({
      generalTestingMCBId: new FormControl(j.generalTestingMCBId),
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

      iRCurrent: new FormControl(j.iRCurrent, Validators.required),
      iYCurrent: new FormControl(j.iYCurrent, Validators.required),
      iBCurrent: new FormControl(j.iBCurrent, Validators.required),
      iNCurrent: new FormControl(j.iNCurrent, Validators.required),
      iPECurrent: new FormControl(j.iPECurrent, Validators.required),

      powerFactor: new FormControl(j.powerFactor, Validators.required),
      frequency: new FormControl(j.frequency, Validators.required),
    });
  }

  populateSafetyTestingMCBForm(k: any): FormGroup {
    let rN = [];
    let yN = [];	
    let bN = [];
    let rE = [];
    let yE = [];	
    let bE = [];
    let rY = [];
    let yB = [];	
    let bR = [];
    
    rN = k.rN.split(",");
    yN = k.yN.split(",");
    bN = k.bN.split(",");
    rE = k.rE.split(",");
    yE = k.yE.split(",");
    bE = k.bE.split(",");
    rY = k.rY.split(",");
    yB = k.yB.split(",");
    bR = k.bR.split(",");

    return new FormGroup({
      safetyTestingMCBId: new FormControl(k.safetyTestingMCBId),
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

      shockVoltage: new FormControl(k.shockVoltage, Validators.required),
      floorResistance: new FormControl(k.floorResistance, Validators.required),
      wallResistance: new FormControl(k.wallResistance, Validators.required),
    });
  }


  onChangeForm(event:any){
    if(!this.mcbForm.invalid){
      if(this.mcbForm.dirty){
        this.validationError=false;
      }
      else{
        this.validationError=false;
      }
     }
  }
  onKeyForm(event: KeyboardEvent) { 
    if(!this.mcbForm.invalid){
      if(this.mcbForm.dirty){
        this.validationError=false;
      }
      else{
        this.validationError=false;
      }
     }
  } 

  //submit MCB
  saveMCB(mcbFlag: any) {
    this.submitted = true;
    if(this.mcbForm.invalid) {
      this.validationError=true;
      this.validationErrorMsg="Please check all the fields";
      return;
    }

    this.mcbGeneralTestingArray = this.mcbForm.get('generalTestingMCB') as FormArray;
    this.mcbSafetyTestingArray = this.mcbForm.get('safetyTestingMCB') as FormArray;

    for(let i of this.mcbGeneralTestingArray.controls) {
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

    for(let i of this.mcbSafetyTestingArray.controls) {
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

    this.mcb.generalTestingMCB = this.mcbForm.value.generalTestingMCB;
    this.mcb.safetyTestingMCB = this.mcbForm.value.safetyTestingMCB;
    this.mcb.userName = this.email;
    if(this.mcbFlag) {
      this.mcbService.updateMCB(this.mcb).subscribe(
        data => {
          this.mcbService.retriveMCB(this.mcb.fileName,this.mcb.nodeId).subscribe(
            data => {
              this.mcbData = JSON.parse(data);
              if(this.mcbData.length != 0) {
                this.retrieveMcbNode(this.mcbData);
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
      this.mcbService.addMCB(this.mcb).subscribe(
      data => {
        this.mcbService.retriveMCB(this.mcb.fileName,this.mcb.nodeId).subscribe(
          data => {
            this.mcbData = JSON.parse(data);
            if(this.mcbData.length != 0) {
              this.retrieveMcbNode(this.mcbData);
            }
          }
        )
        this.success = true;
        this.successMsg = data;
        setTimeout(()=>{
          this.success = false;
        this.successMsg = "";
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
