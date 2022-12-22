import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GlobalsService } from 'src/app/globals.service';
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

  error1: boolean=false;
  error1Msg: string="";

  constructor(private formBuilder: FormBuilder,
              private equipBondService: Equipotential_BondingServicesService,
              private dialog: MatDialog,
              private service: GlobalsService) { }

  ngOnInit(): void {
    this.equipotentialBondingForm = this.formBuilder.group({
      referenceName: [''],
      rating: ['', Validators.required],
      size: [''],
    });

    this.equipBond.fileName = this.fileName;
    this.equipBond.nodeId = this.nodeId;

    this.equipBondService.retrieveEquipotential_Bonding(this.fileName,this.nodeId).subscribe(
          data => {
            this.equipBondData = JSON.parse(data);
            if(this.equipBondData.length != 0) {
              this.retrieveEquipotential_BondingNode(this.equipBondData);
            }
          },
          error=>{
            this.error1=true;
            this.error1Msg=this.service.globalErrorMsg;
            setTimeout(() => {
              this.error1=false;
              this.error1Msg="";
            }, 4000);
          }
        )
  }

  get h(){
    return this.equipotentialBondingForm.controls;
  }
 
  retrieveEquipotential_BondingNode(data: any) {
    this.equipBondFlag = true;
    for(let i of data) {
      this.equipBond.referenceName = i.referenceName;
      this.equipBond.size= i.size;
      this.equipBond.rating= i.rating;
      this.equipBond.updatedBy= i.updatedBy;
      this.equipBond.createdDate= i.createdDate;
      this.equipBond.createdBy= i.createdBy;
      this.equipBond.updatedDate= i.updatedDate;
      this.equipBond.equipBondID= i.equipBondID;
      this.equipBond.nodeId= i.nodeId;
      this.equipBond.fileName= i.fileName;
      this.equipBond.userName= i.userName;
    }
  }


  onChangeForm(event:any){
    if(!this.equipotentialBondingForm.invalid){
      if(this.equipotentialBondingForm.dirty){
        this.validationError=false;
      }
      else{
        this.validationError=false;
      }
     }
  }
  onKeyForm(event: KeyboardEvent) { 
    if(!this.equipotentialBondingForm.invalid){
      if(this.equipotentialBondingForm.dirty){
        this.validationError=false;
      }
      else{
        this.validationError=false;
      }
     }
  } 

  saveEquipBond(equipBondFlag:any) {
    this.submittedEquipBond = true;
    if(this.equipotentialBondingForm.invalid) {
      this.validationError=true;
      this.validationErrorMsg="Please check all the fields";
        return;
    }

    this.equipBond.userName = this.email;

  if(equipBondFlag) {
    this.equipBondService.updateEquipotential_Bonding(this.equipBond).subscribe(
      data => {
        this.equipBondService.retrieveEquipotential_Bonding(this.equipBond.fileName,this.equipBond.nodeId).subscribe(
          data => {
            this.equipBondData = JSON.parse(data);
            if(this.equipBondData.length != 0) {
              this.retrieveEquipotential_BondingNode(this.equipBondData);
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
    this.equipBondService.addEquipotential_Bonding(this.equipBond).subscribe(
      data => {
        this.equipBondService.retrieveEquipotential_Bonding(this.equipBond.fileName,this.equipBond.nodeId).subscribe(
          data => {
            this.equipBondData = JSON.parse(data);
            if(this.equipBondData.length != 0) {
              this.retrieveEquipotential_BondingNode(this.equipBondData);
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
