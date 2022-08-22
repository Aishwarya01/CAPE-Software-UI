import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProtectiveEarthConductor } from 'src/app/SLD/SLD Models/protective-earth-conductor';
import { ProtectiveEarthConductorServicesService } from 'src/app/SLD/SLD Services/protective-earth-conductor-service.service';

@Component({
  selector: 'app-protective-earth-conductor',
  templateUrl: './protective-earth-conductor.component.html',
  styleUrls: ['./protective-earth-conductor.component.css']
})
export class ProtectiveEarthConductorComponent implements OnInit {
  equipBondConnForm!: FormGroup;
  equipBondConn = new ProtectiveEarthConductor();
  submittedEquipBondConn: boolean = false;
  equipBondConnFlag: boolean = false;
  equipBondConnData: any;
  equipBondConnSafetyTestingArray: any = [];
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
              private equipBondConnService: ProtectiveEarthConductorServicesService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.equipBondConnForm = this.formBuilder.group({
      safetyTestingEquipBondConn: this.formBuilder.array([this.createSafetyTestingEquipBondConn()]),
    });

    this.equipBondConn.fileName = this.fileName;
    this.equipBondConn.nodeId = this.nodeId;

    this.equipBondConnService.retrieveEquipBondConn(this.fileName,this.nodeId).subscribe(
          data => {
            this.equipBondConnData = JSON.parse(data);
            if(this.equipBondConnData.length != 0) {
              this.retrieveEquipBondConnNode(this.equipBondConnData);
            }
          }
        )
  }

  
  private createSafetyTestingEquipBondConn(): FormGroup {
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

    });
  }

  getSafetyTestingEquipBondConnControls() : AbstractControl[] {
    return (<FormArray>this.equipBondConnForm.get('safetyTestingEquipBondConn')).controls;
  }

  // get h(){
  //   return this.equipBondConnForm.controls;
  // }
 
  retrieveEquipBondConnNode(data: any) {
    this.equipBondConnFlag = true;
    for(let i of data) {
      this.equipBondConn.updatedBy= i.updatedBy;
      this.equipBondConn.createdDate= i.createdDate;
      this.equipBondConn.createdBy= i.createdBy;
      this.equipBondConn.updatedDate= i.updatedDate;
      this.equipBondConn.equipBondConnID= i.equipBondConnID;
      this.equipBondConn.nodeId= i.nodeId;
      this.equipBondConn.fileName= i.fileName;
      this.equipBondConn.userName= i.userName;
     this.populateequipBondConnForm(i);
    }
  }

  populateequipBondConnForm(i: any) {
    let safetyTestingEquipBondConnArr : any = []
   
    for(let w of i.safetyTestingEquipBondConn) {
      safetyTestingEquipBondConnArr.push(this.populateSafetyTestingequipBondConnForm(w));
    }

   this.equipBondConnForm.setControl('safetyTestingEquipBondConn', this.formBuilder.array(safetyTestingEquipBondConnArr || []));
  }

 
  populateSafetyTestingequipBondConnForm(w: any): FormGroup {
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
      safetyTestingEquipotential_BondingId: new FormControl(w.safetyTestingEquipotential_BondingId),
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

    });
  }

  onChangeForm(event:any){
    if(!this.equipBondConnForm.invalid){
      if(this.equipBondConnForm.dirty){
        this.validationError=false;
      }
      else{
        this.validationError=false;
      }
     }
  }
  onKeyForm(event: KeyboardEvent) { 
    if(!this.equipBondConnForm.invalid){
      if(this.equipBondConnForm.dirty){
        this.validationError=false;
      }
      else{
        this.validationError=false;
      }
     }
  } 

  saveEquipBondConn(equipBondConnFlag:any) {
    this.submittedEquipBondConn = true;
    if(this.equipBondConnForm.invalid) {
      this.validationError=true;
      this.validationErrorMsg="Please check all the fields";
        return;
    }

    this.equipBondConnSafetyTestingArray = this.equipBondConnForm.get('safetyTestingEquipBondConn') as FormArray;

  
    for(let i of this.equipBondConnSafetyTestingArray.controls) {
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

    this.equipBondConn.safetyTestingEquipotential_Bonding = this.equipBondConnForm.value.safetyTestingEquipBondConn;
    this.equipBondConn.userName = this.email;

  if(equipBondConnFlag) {
    this.equipBondConnService.updateEquipBondConn(this.equipBondConn).subscribe(
      data => {
        this.equipBondConnService.retrieveEquipBondConn(this.equipBondConn.fileName,this.equipBondConn.nodeId).subscribe(
          data => {
            this.equipBondConnData = JSON.parse(data);
            if(this.equipBondConnData.length != 0) {
              this.retrieveEquipBondConnNode(this.equipBondConnData);
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
  else{
    this.equipBondConnService.addEquipBondConn(this.equipBondConn).subscribe(
      data => {
        this.equipBondConnService.retrieveEquipBondConn(this.equipBondConn.fileName,this.equipBondConn.nodeId).subscribe(
          data => {
            this.equipBondConnData = JSON.parse(data);
            if(this.equipBondConnData.length != 0) {
              this.retrieveEquipBondConnNode(this.equipBondConnData);
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
