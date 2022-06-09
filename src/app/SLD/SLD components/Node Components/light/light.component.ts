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
  @Input()
  fileName: any;
  @Input()
  nodeId: any;

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
      type: ['', Validators.required],
      incomingSizePhase: ['', Validators.required],
      incomingSizeNeutral: ['', Validators.required],
      incomingSizeProtective: ['', Validators.required],
      incomingLengthPhase: ['', Validators.required],
      incomingLengthNeutral: ['', Validators.required],
      incomingLengthProtective: ['', Validators.required],
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

      shockVoltage: new FormControl('', Validators.required),
      floorResistance: new FormControl('', Validators.required),
      wallResistance: new FormControl('', Validators.required),
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
      this.light.rating = i.rating;
      this.light.voltage = i.voltage;
      this.light.type = i.type;
      this.light.incomingSizePhase = i.incomingSizePhase;
      this.light.incomingSizeNeutral = i.incomingSizeNeutral;
      this.light.incomingSizeProtective = i.incomingSizeProtective;
      this.light.incomingLengthPhase = i.incomingLengthPhase;
      this.light.incomingLengthNeutral = i.incomingLengthNeutral;
      this.light.incomingLengthProtective =i.incomingLengthProtective;
      this.light.createdBy = i.createdBy;
      this.light.createdDate = i.createdDate;
      this.light.updatedBy = i.updatedBy;
      this.light.updatedDate = i.updatedDate;
      this.light.nodeId = i.nodeId;
      this.light.fileName = i.fileName;
      this.light.userName = i.userName;

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

      shockVoltage: new FormControl(k.shockVoltage, Validators.required),
      floorResistance: new FormControl(k.floorResistance, Validators.required),
      wallResistance: new FormControl(k.wallResistance, Validators.required),
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

  //submit MCB
  saveLight() {
    this.submitted = true;
    if(this.lightForm.invalid) {
      return;
    }

    this.lightGeneralTestingArray = this.lightForm.get('generalTestingLight') as FormArray;
    this.lightSafetyTestingArray = this.lightForm.get('safetyTestingLight') as FormArray;

    for(let i of this.lightGeneralTestingArray.controls) {
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

    for(let i of this.lightSafetyTestingArray.controls) {
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

    this.light.generalTestingLight = this.lightForm.value.generalTestingLight;
    this.light.safetyTestingLight = this.lightForm.value.safetyTestingLight;

    this.lightService.addLight(this.light).subscribe(
      data => {

      },
      error => {
        
      }
    )
  }

  close() {
    this.dialog.closeAll();
  }

}
