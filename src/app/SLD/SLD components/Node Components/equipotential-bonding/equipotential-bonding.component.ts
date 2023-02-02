import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GlobalsService } from 'src/app/globals.service';
import { SldCalculation } from 'src/app/SLD/SLD Constants/sld-calculation';
import { Equipotential_Bonding } from 'src/app/SLD/SLD Models/equipotential_bonding';
import { Equipotential_BondingServicesService } from 'src/app/SLD/SLD Services/equipotential_bonding-service.service';

@Component({
  selector: 'app-equipotential-bonding',
  templateUrl: './equipotential-bonding.component.html',
  styleUrls: ['./equipotential-bonding.component.css']
})
export class EquipotentialBondingComponent implements OnInit {
  equipotentialBondingForm!: FormGroup;
  equipBond = new Equipotential_Bonding();
  submittedEquipBond: boolean = false;
  equipBondFlag: boolean = false;
  equipBondData: any;
  validationError: boolean = false;
  validationErrorMsg: string = "";
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

  // Risk assessment constants
  sldDatas = new SldCalculation();

  error1: boolean = false;
  error1Msg: string = "";

  valueMismatchingFlag: boolean = false;
  maxAllValue: any;
  nominalCrossSection: String = "";
  sldTempVAlues: any;
  sldValueError: boolean=false;

  constructor(private formBuilder: FormBuilder,
    private equipBondService: Equipotential_BondingServicesService,
    private dialog: MatDialog,
    private service: GlobalsService) { }

  ngOnInit(): void {
    this.equipotentialBondingForm = this.formBuilder.group({
      referenceName: [''],
      rating: ['', Validators.required],
      sizeOne: [''],
      // Table Data
      make: [''],
      typeFlatOrBase: [''],
      material: [''],
      sizeTwo: [''],
      conductorLength: ['', Validators.required],
      conductorResistance: ['', Validators.required],
      maxAllowableResistance: ['', Validators.required],
      remarks: ['']
    });

    this.equipBond.fileName = this.fileName;
    this.equipBond.nodeId = this.nodeId;

    this.equipBondService.retrieveEquipotential_Bonding(this.fileName, this.nodeId).subscribe(
      data => {
        this.equipBondData = JSON.parse(data);
        if (this.equipBondData.length != 0) {
          this.retrieveEquipotential_BondingNode(this.equipBondData);
        }
      },
      error => {
        this.error1 = true;
        this.error1Msg = this.service.globalErrorMsg;
        setTimeout(() => {
          this.error1 = false;
          this.error1Msg = "";
        }, 4000);
      }
    )
  }

  get h(): any { return this.equipotentialBondingForm.controls; }

  retrieveEquipotential_BondingNode(data: any) {
    this.equipBondFlag = true;
    for (let i of data) {
      this.equipBond.referenceName = i.referenceName;
      this.equipBond.sizeOne = i.sizeOne;
      this.equipBond.rating = i.rating;
      this.equipBond.updatedBy = i.updatedBy;
      this.equipBond.createdDate = i.createdDate;
      this.equipBond.createdBy = i.createdBy;
      this.equipBond.updatedDate = i.updatedDate;
      this.equipBond.equipBondID = i.equipBondID;
      this.equipBond.nodeId = i.nodeId;
      this.equipBond.userName = i.userName;
      this.equipBond.fileName = i.fileName;
      this.equipBond.make = i.make;
      this.equipBond.typeFlatOrBase = i.typeFlatOrBase;
      this.equipBond.material = i.material;
      this.equipBond.sizeTwo = i.sizeTwo;
      this.equipBond.conductorLength = i.conductorLength;
      this.equipBond.conductorResistance = i.conductorResistance;
      this.equipBond.maxAllowableResistance = i.maxAllowableResistance;
      this.equipBond.remarks = i.remarks;
    }
  }


  // Only Integer Numbers
  keyPressNumbers(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if (charCode == 101 || charCode == 69 || charCode == 43 || charCode == 45) {
      event.preventDefault();
      return false;
    }
    else {
      return true;
    }
  }

  decimalConversion(event: any, data: any): any {
    switch (data) {
      case 'oneDecimal': {
        if ((event.target.value.split('.').length > 1 && event.target.value.split('.')[1].length >= 1)) {
          event.preventDefault();
          return false;
        }
        break;
      }
      case 'threeDecimal': {
        if ((event.target.value.split('.').length > 1 && event.target.value.split('.')[1].length > 2)) {
          event.preventDefault();
          return false;
        }
        break;
      }
    }
  }


  onChangeForm(event: any) {
    if (!this.equipotentialBondingForm.invalid) {
      if (this.equipotentialBondingForm.dirty) {
        this.validationError = false;
      }
      else {
        this.validationError = false;
      }
    }
  }
  onKeyForm(event: KeyboardEvent) {
    if (!this.equipotentialBondingForm.invalid) {
      if (this.equipotentialBondingForm.dirty) {
        this.validationError = false;
      }
      else {
        this.validationError = false;
      }
    }
  }

  onFocusOutNeutral(event: any, form: any) {
    let flag=true;
    this.maxAllValue = this.sldDatas.decimalValue;
    for (let arr of this.maxAllValue) {
      if (arr.nominalCrossSection == form.maxAllowableResistance.value) {
        form.maxAllowableResistance.setValue(arr.specificConductor);
        this.decimalCalculation(event,form);
        this.sldValueError=false;
        flag = false;
        this.sldValueError=false;
        break;
      }
    }
    if(flag){
        this.sldValueError=true;
    }
  }

  decimalCalculation(event:any,form:any){
    if(form.conductorLength.value!=null && form.maxAllowableResistance.value!=null && form.conductorLength.value!=undefined && form.maxAllowableResistance.value!=undefined && form.conductorLength.value!="" && form.maxAllowableResistance.value!=""){
      var a = (form.conductorLength.value * form.maxAllowableResistance.value);
      form.maxAllowableResistance.setValue(a.toFixed(3));
    }
    else{
      form.maxAllowableResistance.setValue('');
    }
  }

  saveEquipBond(equipBondFlag: any) {
    this.submittedEquipBond = true;
    if (this.equipotentialBondingForm.invalid) {
      this.validationError = true;
      this.validationErrorMsg = "Please check all the fields";
      return;
    }

    this.equipBond.userName = this.email;

    if (equipBondFlag) {
      this.equipBondService.updateEquipotential_Bonding(this.equipBond).subscribe(
        data => {
          this.equipBondService.retrieveEquipotential_Bonding(this.equipBond.fileName, this.equipBond.nodeId).subscribe(
            data => {
              this.equipBondData = JSON.parse(data);
              if (this.equipBondData.length != 0) {
                this.retrieveEquipotential_BondingNode(this.equipBondData);
              }
            }
          )
          this.success = true;
          this.successMsg = data;
          setTimeout(() => {
            this.success = false;
            this.successMsg = "";
            this.dialog.closeAll();
          }, 3000);
        },
        error => {
          this.error = true;
          // this.errorData = JSON.parse(error.error);
          this.errorMsg = this.service.globalErrorMsg;
          setTimeout(() => {
            this.error = false;
            this.errorMsg = "";
          }, 3000);
        }
      )
    }
    else {
      this.equipBondService.addEquipotential_Bonding(this.equipBond).subscribe(
        data => {
          this.equipBondService.retrieveEquipotential_Bonding(this.equipBond.fileName, this.equipBond.nodeId).subscribe(
            data => {
              this.equipBondData = JSON.parse(data);
              if (this.equipBondData.length != 0) {
                this.retrieveEquipotential_BondingNode(this.equipBondData);
              }
            }
          )
          this.success = true;
          this.successMsg = data;
          setTimeout(() => {
            this.success = false;
            this.successMsg = "";
            this.dialog.closeAll();
          }, 3000);
        },
        error => {
          this.error = true;
          // this.errorData = JSON.parse(error.error);
          this.errorMsg = this.service.globalErrorMsg;
          setTimeout(() => {
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
