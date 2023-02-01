import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GlobalsService } from 'src/app/globals.service';
import { EarthingCableConnnector } from 'src/app/SLD/SLD Models/earthing-cable-connnector';
import { EarthCableConnectorService } from 'src/app/SLD/SLD Services/earth-cable-connector.service';

@Component({
  selector: 'app-earthing-cable-connnector',
  templateUrl: './earthing-cable-connnector.component.html',
  styleUrls: ['./earthing-cable-connnector.component.css']
})
export class EarthingCableConnnectorComponent implements OnInit {

  earthingConnectorForm!: FormGroup;
  earthConnectorData: any;
  earthConnectorJSON: any;
  earthCableConnectorModel = new EarthingCableConnnector();
  earthConnectorFlag: boolean = false;
  earthConnectorGeneralTestingArray: any = [];
  earthConnectorSafetyTestingArray: any = [];
  submittedEarthConnector!: boolean;
  submitted: boolean = false;
  success: boolean = false;
  successMsg: String = '';
  error: boolean = false;
  errorMsg: String = ''
  errorData: any;
  generalTestingCableConnectorArr: any = [];
  generalTestingCableConnectorArrValue: any = [];
  deletedArr: any = [];
  deletedArrFlag: any;

  @Input()
  fileName: any;
  @Input()
  earthCableConnectorId: any;

  @Input()
  email: any;
  validationError: boolean = false;
  validationErrorMsg: string = "";
  testingTable: boolean = false;

  error1: boolean=false;
  error1Msg: string="";
  measureMent:any;
  
  constructor(private formBuilder: FormBuilder,
              private dialog: MatDialog,
              private earthConnectorService: EarthCableConnectorService,
              private service: GlobalsService,) { }
              

  ngOnInit(): void {
    this.earthingConnectorForm = this.formBuilder.group({
      earthconnectorid: [''],
      typeOfElectrode: [''],
      materialElectrode: [''],
      sizeElectrode: [''],
      depthElectrode: ['',Validators.required],
      fileName: [''],
      earthElectrodeResistance: ['',Validators.required],
      combinedResistance: ['',Validators.required],
    });
    this.earthCableConnectorModel.fileName = this.fileName;
    this.earthCableConnectorModel.earthCableConnectorid = this.earthCableConnectorId;

    this.earthConnectorService.retrieveEarthConnectorData(this.fileName,this.earthCableConnectorId).subscribe(
        data => {
          this.earthConnectorJSON = JSON.parse(data);
          if(this.earthConnectorJSON!= null) {
            this.retrieveEarthConnectorNode(this.earthConnectorJSON);
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

  get f():any{ return this.earthingConnectorForm.controls; }

  onChangeForm(event:any){
    if(!this.earthingConnectorForm.invalid){
      if(this.earthingConnectorForm.dirty){
        this.validationError=false;
      }
      else{
        this.validationError=false;
      }
     }
  }
  onKeyForm(event: KeyboardEvent) { 
    if(!this.earthingConnectorForm.invalid){
      if(this.earthingConnectorForm.dirty){
        this.validationError=false;
      }
      else{
        this.validationError=false;
      }
     }
  }

  closePopup() {
    this.dialog.closeAll();
  }

  retrieveEarthConnectorNode(i: any) {
    this.earthConnectorFlag = true;
      this.earthCableConnectorModel.typeOfElectrode = i.typeOfElectrode;
      this.earthCableConnectorModel.materialElectrode = i.materialElectrode;
      this.earthCableConnectorModel.sizeElectrode = i.sizeElectrode;
      this.earthCableConnectorModel.earthCableConnectorid = i.earthCableConnectorid;
      this.earthCableConnectorModel.fileName = i.fileName;
      this.earthCableConnectorModel.depthElectrode = i.depthElectrode;
      this.earthCableConnectorModel.fileName = i.fileName;
      this.earthCableConnectorModel.earthElectrodeResistance = i.earthElectrodeResistance;
      this.earthCableConnectorModel.combinedResistance = i.combinedResistance;
  
      this.earthCableConnectorModel.createdBy = i.createdBy;
      this.earthCableConnectorModel.createdDate = i.createdDate;
      this.earthCableConnectorModel.updatedBy = i.updatedBy;
      this.earthCableConnectorModel.updatedDate = i.updatedDate;
      this.earthCableConnectorModel.earthconnectorid = i.earthconnectorid;
  
      this.populateEarthConnectorForm(i);
  }

  populateEarthConnectorForm(data:any){
    this.earthingConnectorForm = this.formBuilder.group({
      typeOfElectrode: new FormControl(this.earthCableConnectorModel.typeOfElectrode),
      materialElectrode: new FormControl(this.earthCableConnectorModel.materialElectrode),
      sizeElectrode: new FormControl(this.earthCableConnectorModel.sizeElectrode),
      depthElectrode: new FormControl(this.earthCableConnectorModel.depthElectrode,Validators.required),
      earthElectrodeResistance: new FormControl(this.earthCableConnectorModel.earthElectrodeResistance,Validators.required),
      combinedResistance: new FormControl(this.earthCableConnectorModel.combinedResistance,Validators.required),
      createdDate: new FormControl(this.earthCableConnectorModel.createdDate),
      createdBy: new FormControl(this.earthCableConnectorModel.createdBy),
    });
  }

  // Only Integer Numbers
  keyPressNumbers(event:any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if (charCode==101 || charCode==69 || charCode==43 || charCode==45) {
      event.preventDefault();
      return false;
    }
    else {
      return true;
    }
  }

  decimalConversion(event:any,data:any):any{
    switch(data){
      case 'oneDecimal':{
        if((event.target.value.split('.').length>1 && event.target.value.split('.')[1].length>=1)){
          event.preventDefault();
          return false;
        }
        break;
      }
      case 'threeDecimal':{
        if((event.target.value.split('.').length>1 && event.target.value.split('.')[1].length>2)){
          event.preventDefault();
          return false;
        }
        break;
      }
    }
  }

  measureMentTypes(event:any,form:any){
    switch(form.typeOfElectrode.value){
      case 'rod':
        // form.sizeElectrode.setValue("(mm)/(sq.mm)");
        this.measureMent="(mm)/(sq.mm)";
        break;
      case 'flat':
        // form.sizeElectrode.setValue("(sq.mm)");
        this.measureMent="(sq.mm)";
        break;
      default:
        // form.sizeElectrode.setValue("(mm)");
        this.measureMent="(mm)";
        break;
    }
  }

  // Save and Update call code below
  saveEarthConnector(earthConnectorFlag: any) {
    this.submittedEarthConnector = true;

    if (this.earthingConnectorForm.invalid) {
      this.validationError = true;
      this.validationErrorMsg = "Please check all the fields";
      setTimeout(() => {
        this.validationError=false;
        this.validationErrorMsg="";
      }, 4000);
      return;
    }

    if (this.earthConnectorFlag) {
      if (this.earthingConnectorForm.dirty && this.earthingConnectorForm.touched) {
        this.earthConnectorService.updateEarthConnectorData(this.earthCableConnectorModel).subscribe(
          data => {
            this.earthConnectorService.retrieveEarthConnectorData(this.earthCableConnectorModel.fileName, this.earthCableConnectorModel.earthCableConnectorid).subscribe(
              data => {
                this.earthConnectorJSON = JSON.parse(data);
                if (this.earthConnectorJSON.length != 0) {
                  this.retrieveEarthConnectorNode(this.earthConnectorJSON);
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
              this.errorMsg = ""
            }, 3000);
          }
        )
      }
      else {
        return;
      }
    }
    else {
      this.earthConnectorService.addEarthConnectorData(this.earthCableConnectorModel).subscribe(
        data => {
          this.earthConnectorService.retrieveEarthConnectorData(this.earthCableConnectorModel.fileName, this.earthCableConnectorModel.earthCableConnectorid).subscribe(
            data => {
              this.earthConnectorJSON = JSON.parse(data);
              if (this.earthConnectorJSON !=null && this.earthConnectorJSON.length != 0) {
                this.retrieveEarthConnectorNode(this.earthConnectorJSON);
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
            this.errorMsg = ""
          }, 3000);
        }
      )
    }
    this.earthingConnectorForm.markAsPristine();
  }

}
