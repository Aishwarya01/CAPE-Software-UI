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
  protectiveEarthConductorForm!: FormGroup;
  protectiveEarthConductor = new ProtectiveEarthConductor();
  submittedPEC: boolean = false;
  protectiveEarthConductorFlag: boolean = false;
  protectiveEarthConductorData: any;
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
  PECsafetyTestingArray: any = [];
  valueMismatchingFlag: boolean = false;

  @Input()
  fileName: any;
  @Input()
  cableConnectorId: any;
  @Input()
  email: any;

  nominalCrossSection: any = ['1.5','2.5','4','6','10','16','25','35','50','70','95','120','150','185'];
  specificConductor: any = ['12.575','7.566','4.739','3.149','1.881','1.185','0.752','0.546','0.404','0.281','0.204','0.163','0.134','0.109'];
  
  constructor(private formBuilder: FormBuilder,
              private protectiveEarthConductorService: ProtectiveEarthConductorServicesService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.protectiveEarthConductorForm = this.formBuilder.group({
      make: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      material: new FormControl('', Validators.required),
      size: new FormControl('', Validators.required),
      sizeFlag: new FormControl(false),
      conductorLength: new FormControl('', Validators.required),
      conductorResistance: new FormControl('', Validators.required),
      maxResistance: new FormControl('', Validators.required),
      rNRemarks: new FormControl(''),
      });

    this.protectiveEarthConductor.fileName = this.fileName;
    this.protectiveEarthConductor.cableConnectorId = this.cableConnectorId;

    this.protectiveEarthConductorService.retrievePEC(this.fileName,this.cableConnectorId).subscribe(
          data => {
            this.protectiveEarthConductorData = JSON.parse(data);
            if(this.protectiveEarthConductorData.length != 0) {
              this.retrievePECNode(this.protectiveEarthConductorData);
            }
          }
        )
  }
  
 
  get a(){
    return this.protectiveEarthConductorForm.controls;
  }
 
  retrievePECNode(data: any) {
    this.protectiveEarthConductorFlag = true;
    this.valueMismatchingFlag = false;    
    for(let i of data) {
      this.protectiveEarthConductor.make = i.make;
      this.protectiveEarthConductor.type= i.type;
      this.protectiveEarthConductor.material= i.material;
      this.protectiveEarthConductor.size= i.size;
      this.protectiveEarthConductor.conductorLength= i.conductorLength;
      this.protectiveEarthConductor.conductorResistance= i.conductorResistance;
      this.protectiveEarthConductor.maxResistance= i.maxResistance;
      this.protectiveEarthConductor.rNRemarks= i.rNRemarks;
      this.protectiveEarthConductor.safetyTestingPECId= i.safetyTestingPECId;
    
    this.protectiveEarthConductor.updatedBy= i.updatedBy;
    this.protectiveEarthConductor.createdDate= i.createdDate;
    this.protectiveEarthConductor.createdBy= i.createdBy;
    this.protectiveEarthConductor.updatedDate= i.updatedDate;
    this.protectiveEarthConductor.cableConnectorId= i.cableConnectorId;
    this.protectiveEarthConductor.fileName= i.fileName;
    this.protectiveEarthConductor.userName= i.userName;
    }
  
     
  }
  
  
    onFocusOut(e: any,a: any) {
      if(this.a.size.value!='' && this.a.conductorLength.value!='' && this.a.size.value!=undefined 
    && this.a.conductorLength.value!=undefined && this.a.conductorLength.value!='NA')
    {
        for(let i=0; i<this.nominalCrossSection.length; i++) {
          this.a.conductorLength.setValue(Number(this.a.conductorLength.value).toFixed(1));          
          if(this.nominalCrossSection[i] == this.a.size.value) {
            this.a.maxResistance.setValue(this.a.conductorLength.value*this.specificConductor[i]);
            this.a.maxResistance.setValue((this.a.maxResistance.value).toFixed(3));	
            this.a.sizeFlag.setValue(false);   
            this.valueMismatchingFlag = false;   
            break;
          }
          else {
            this.a.maxResistance.setValue('');
            this.a.sizeFlag.setValue(true);  
            this.valueMismatchingFlag = true;       
          }
        }
       }
       else {
        this.a.maxResistance.setValue('');
        this.a.sizeFlag.setValue(false);  
       }
    }

    onFocusOutResistance(e: any,a: any) {
    //  if(this.a.conductorResistance.value!='' && this.a.conductorResistance.value!=undefined && this.a.conductorResistance.value!='NA')
   // {
       this.a.conductorResistance.setValue(Number(this.a.conductorResistance.value).toFixed(3));          
      // }
    }
  onChangeForm(event:any){
    if(!this.protectiveEarthConductorForm.invalid){
      if(this.protectiveEarthConductorForm.dirty){
        this.validationError=false;
      }
      else{
        this.validationError=false;
      }
     }
  }
  onKeyForm(event: KeyboardEvent) { 
    if(!this.protectiveEarthConductorForm.invalid){
      if(this.protectiveEarthConductorForm.dirty){
        this.validationError=false;
      }
      else{
        this.validationError=false;
      }
     }
  } 

  savePEC(protectiveEarthConductorFlag:any) {
    this.submittedPEC = true;
    if(this.protectiveEarthConductorForm.invalid) {
      this.validationError=true;
      this.validationErrorMsg="Please check all the fields";
        return;
    }

   
   // this.protectiveEarthConductor=this.protectiveEarthConductorForm.value;
    this.protectiveEarthConductor.userName = this.email;
    this.protectiveEarthConductor.fileName = this.fileName;
    this.protectiveEarthConductor.cableConnectorId = this.cableConnectorId;

  if(protectiveEarthConductorFlag) {
    this.protectiveEarthConductorService.updatePEC(this.protectiveEarthConductor).subscribe(
      data => {
        this.protectiveEarthConductorService.retrievePEC(this.protectiveEarthConductor.fileName,this.protectiveEarthConductor.cableConnectorId).subscribe(
          data => {
            this.protectiveEarthConductorData = JSON.parse(data);
            if(this.protectiveEarthConductorData.length != 0) {
              this.retrievePECNode(this.protectiveEarthConductorData);
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
    this.protectiveEarthConductorService.addPEC(this.protectiveEarthConductor).subscribe(
      data => {
        this.protectiveEarthConductorService.retrievePEC(this.protectiveEarthConductor.fileName,this.protectiveEarthConductor.cableConnectorId).subscribe(
          data => {
            this.protectiveEarthConductorData = JSON.parse(data);
            if(this.protectiveEarthConductorData.length != 0) {
              this.retrievePECNode(this.protectiveEarthConductorData);
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
