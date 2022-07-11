import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RCBO } from '../../../SLD Models/rcbo';
import { RCBOServicesService } from '../../../SLD Services/rcbo-services.service';

@Component({
  selector: 'app-rcbo',
  templateUrl: './rcbo.component.html',
  styleUrls: ['./rcbo.component.css']
})
export class RCBOComponent implements OnInit {

  //RCBO
  mcbWithRcdForm!: FormGroup;
  rcboData: any;
  rcbo = new RCBO();
  rcboFlag: boolean = false;
  rcboGeneralTestingArray: any = [];
  rcboSafetyTestingArray: any = [];
  submittedRCBO: boolean = false;
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
              private rcboService: RCBOServicesService,
              private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.mcbWithRcdForm = this.formBuilder.group({
      referenceName: [''],
      manufacturerName: [''],
      rating: ['', Validators.required],
      voltage: [''],
      noOfPoles: ['', Validators.required],
      currentCurve: ['', Validators.required],
      residualCurrentType: ['', Validators.required],
      residualCurrent: ['', Validators.required],
      outgoingSizePhase: ['', Validators.required],
      outgoingSizeNeutral: ['', Validators.required],
      outgoingSizeProtective: ['', Validators.required],
      generalTestingRCBO: this.formBuilder.array([this.createGeneralTestingRCBO()]),
      safetyTestingRCBO: this.formBuilder.array([this.createSafetyTestingRCBO()]),
    });

    this.rcbo.fileName = this.fileName;
    this.rcbo.nodeId = this.nodeId;

    this.rcboService.retriveRCBO(this.fileName,this.nodeId).subscribe(
          data => {
            this.rcboData = JSON.parse(data);
            if(this.rcboData.length != 0) {
              this.retrieveRcboNode(this.rcboData);
            }
          }
        )
  }

  get g(){
    return this.mcbWithRcdForm.controls;
  }

  //RCBO or MCB with RCD

  private createGeneralTestingRCBO(): FormGroup {
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

  private createSafetyTestingRCBO(): FormGroup {
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

  getGeneralTestingRCBOControls() : AbstractControl[] {
    return (<FormArray>this.mcbWithRcdForm.get('generalTestingRCBO')).controls;
  }

  getSafetyTestingRCBOControls() : AbstractControl[] {
    return (<FormArray>this.mcbWithRcdForm.get('safetyTestingRCBO')).controls;
  }

  retrieveRcboNode(data: any) {
    this.rcboFlag = true;
    for(let i of data) {
      this.rcbo.referenceName = i.referenceName;
      this.rcbo.manufacturerName = i.manufacturerName;
      this.rcbo.rating = i.rating;
      this.rcbo.voltage = i.voltage;
      this.rcbo.noOfPoles = i.noOfPoles;
      this.rcbo.currentCurve = i.currentCurve;
      this.rcbo.residualCurrentType = i.residualCurrentType;
      this.rcbo.residualCurrent = i.residualCurrent;
      this.rcbo.outgoingSizePhase = i.outgoingSizePhase;
      this.rcbo.outgoingSizeNeutral = i.outgoingSizeNeutral;
      this.rcbo.outgoingSizeProtective =i.outgoingSizeProtective;
      this.rcbo.createdBy = i.createdBy;
      this.rcbo.createdDate = i.createdDate;
      this.rcbo.updatedBy = i.updatedBy;
      this.rcbo.updatedDate = i.updatedDate;
      this.rcbo.nodeId = i.nodeId;
      this.rcbo.fileName = i.fileName;
      this.rcbo.userName = i.userName;
      this.rcbo.rcboId = i.rcboId;


      this.populateRcboForm(i);
    }
  }

  populateRcboForm(i: any) {
    let generalTestingRCBOArr : any = []
    let safetyTestingRCBOArr : any = []

    for(let j of i.generalTestingRCBO) {
      generalTestingRCBOArr.push(this.populateGeneralTestingRCBOForm(j));
    }

    for(let k of i.safetyTestingRCBO) {
      safetyTestingRCBOArr.push(this.populateSafetyTestingRCBOForm(k));
    }

    this.mcbWithRcdForm.setControl('generalTestingRCBO', this.formBuilder.array(generalTestingRCBOArr || []));
    this.mcbWithRcdForm.setControl('safetyTestingRCBO', this.formBuilder.array(safetyTestingRCBOArr || []));
  }

  populateGeneralTestingRCBOForm(j: any): FormGroup {
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
      generalTestingRCBOId: new FormControl(j.generalTestingRCBOId),
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

  populateSafetyTestingRCBOForm(k: any): FormGroup {
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
      safetyTestingRCBOId: new FormControl(k.safetyTestingRCBOId),
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

  addRCBOTesting() {
    let generalTestingRCBOArr: any = [];
    let safetyTestingRCBOArr: any = [];

    generalTestingRCBOArr = this.mcbWithRcdForm.get('generalTestingRCBO') as FormArray;
    safetyTestingRCBOArr = this.mcbWithRcdForm.get('safetyTestingRCBO') as FormArray;

    generalTestingRCBOArr.push(this.createGeneralTestingRCBO());
    safetyTestingRCBOArr.push(this.createSafetyTestingRCBO());
  }

  removeRCBOtesting(a: any, i: any) {
    (this.mcbWithRcdForm.get('generalTestingRCBO') as FormArray).removeAt(i);
    (this.mcbWithRcdForm.get('safetyTestingRCBO') as FormArray).removeAt(i)
  }

  onChangeForm(event:any){
    if(!this.mcbWithRcdForm.invalid){
      if(this.mcbWithRcdForm.dirty){
        this.validationError=false;
      }
      else{
        this.validationError=false;
      }
     }
  }
  onKeyForm(event: KeyboardEvent) { 
    if(!this.mcbWithRcdForm.invalid){
      if(this.mcbWithRcdForm.dirty){
        this.validationError=false;
      }
      else{
        this.validationError=false;
      }
     }
  }

  //submit MCB with RCD or RCBO
  saveRCBO(rcboFlag: any) {
    this.submittedRCBO = true;
    if(this.mcbWithRcdForm.invalid) {
      this.validationError=true;
      this.validationErrorMsg="Please check all the fields";
      return;
    }

    this.rcboGeneralTestingArray = this.mcbWithRcdForm.get('generalTestingRCBO') as FormArray;
    this.rcboSafetyTestingArray = this.mcbWithRcdForm.get('safetyTestingRCBO') as FormArray;

    for(let i of this.rcboGeneralTestingArray.controls) {
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

    for(let i of this.rcboSafetyTestingArray.controls) {
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

    this.rcbo.generalTestingRCBO = this.mcbWithRcdForm.value.generalTestingRCBO;
    this.rcbo.safetyTestingRCBO = this.mcbWithRcdForm.value.safetyTestingRCBO;
    this.rcbo.userName = this.email;

    if(this.rcboFlag) {
      this.rcboService.updateRCBO(this.rcbo).subscribe(
        data => {
          this.rcboService.retriveRCBO(this.rcbo.fileName,this.rcbo.nodeId).subscribe(
            data => {
              this.rcboData = JSON.parse(data);
              if(this.rcboData.length != 0) {
                this.retrieveRcboNode(this.rcboData);
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
      this.rcboService.addRCBO(this.rcbo).subscribe(
        data => {
          this.rcboService.retriveRCBO(this.rcbo.fileName,this.rcbo.nodeId).subscribe(
            data => {
              this.rcboData = JSON.parse(data);
              if(this.rcboData.length != 0) {
                this.retrieveRcboNode(this.rcboData);
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
