import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmcPowerAndEarthingData } from 'src/app/EMC_Model/emc-power-and-earthing-data';
import { EmcPowerAndEarthingDataService } from 'src/app/EMC_Services/emc-power-and-earthing-data.service';

@Component({
  selector: 'app-power-and-earthing-data',
  templateUrl: './power-and-earthing-data.component.html',
  styleUrls: ['./power-and-earthing-data.component.css']
})
export class PowerAndEarthingDataComponent implements OnInit {

  incomingcable: String[]= ['Overhead', 'Burried', 'Combination'];
  neutral: String[]= ['Insulated', 'Uninsulated', 'Unknown'];
  selectionValue: String[] = ['Yes', 'No', ];

  EMCPowerAndEarthForm!: FormGroup;
  emcPowerAndEarthingData = new EmcPowerAndEarthingData();
  electronicSystemArr!: FormArray;
  distributionPannelArr!: FormArray;
  errorArr: any = [];
  success: boolean = false;
  flag: boolean = false;
  Error: boolean = false;
  submitted=false;
  successMsg: string = "";
  errorMsg: string = "";
  finalSpinner: boolean = true;
  validationErrorTab: boolean = false;
  validationErrorMsgTab: string="";
  validationError: boolean =false;
  validationErrorMsg: String ="";
  popup: boolean = false;
  modalReference: any;
  step1List2: any;
  arr1: any;
  arr2: any;
  
  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private emcPowerAndEarthingDataService: EmcPowerAndEarthingDataService
    ) { }

  ngOnInit(): void {
    this.EMCPowerAndEarthForm = this.formBuilder.group({

      powerElectricalUtility: ['', Validators.required],
      powerBackupSource: ['', Validators.required],
      powerDistanceHvLv: ['', Validators.required],
      powerCableHvLv: ['', Validators.required],
      powerDiscSupply: ['', Validators.required],
      powerTransformationKVA: ['', Validators.required],
      powerInputVolts: ['', Validators.required],
      powerInputPhase: ['', Validators.required],
      powerInputWires: ['', Validators.required],
      powerInputFeed: ['', Validators.required],
      powerInputDesc: ['', Validators.required],
      powerOutputVolts: ['', Validators.required],
      powerOutputPhase: ['', Validators.required],
      powerOutputWires: ['', Validators.required],
      powerOutputFeed: ['', Validators.required],
      powerIncomingAmps: ['', Validators.required],
      powerNeutral: ['', Validators.required],
      psEarthing: ['', Validators.required],
      peAttachement: [''],
      dedicatedTransfermation: ['', Validators.required],
      dedicatedTransfermationOtherBuilding: ['', Validators.required],
      typeOFIncoming: ['', Validators.required],
      descOfService: ['', Validators.required],
      descOfTestingService: ['', Validators.required],
      descOfEquipotentilaBonding: ['', Validators.required],

      electronicSystemArr: this.formBuilder.array([this.createElectronicSystemArr()]),
      distributionPannelArr: this.formBuilder.array([this.createDistributionPannelArr()])

    });
  }

  createElectronicSystemArr(): any {
    return this.formBuilder.group({
     electronicSystemId: [''],
     bDSld: ['', Validators.required],
     bDRecordData: ['', Validators.required],
     bDEarthing: ['', Validators.required],
     electronicDesc: ['', Validators.required],
     panelId: ['', Validators.required],
     namePlateData: ['', Validators.required],
     mainCircuteBraker: ['', Validators.required],
     mainCircuteBrakerRating: ['', Validators.required],
     emergencyTripRemote: ['', Validators.required],
     emergencyTripLocal: ['', Validators.required],
     otherTrip: ['', Validators.required],
     differentalProtection: ['', Validators.required],
     bouodingStell: ['', Validators.required],
     panelFeed: ['', Validators.required],
     phaseWires: ['', Validators.required],
     neutralWire: ['', Validators.required],
     peWireSize: ['', Validators.required],
     pannelConnectors: ['', Validators.required],
     neutralBus: ['', Validators.required],
     earthBus: ['', Validators.required],
     listOfNonElectronicLoad: ['', Validators.required],
     dedicatedElectronicSystem: ['', Validators.required],
     nonComputerLoads: ['', Validators.required],
   });
 }

 createDistributionPannelArr(): any {
  return this.formBuilder.group({
   distrubutionPannelId:[''],
   cbWireSize: ['', Validators.required],
   cbDesc: ['', Validators.required],
   matchesReceptable: ['', Validators.required],
   matchesReceptableDesc: ['', Validators.required],
   indivdialPwire: ['', Validators.required],
   indivdialPwireDesc: ['', Validators.required],
   indivdialNeutralwire: ['', Validators.required],
   indivdialNeutralwireDesc: ['', Validators.required],
   computerLoadCircute: ['', Validators.required],
   computerLoadCircuteDes: ['', Validators.required],
   computerLoadReceptable: ['', Validators.required],
   computerLoadReceptableDesc: ['', Validators.required],
   branchCircuteRun: ['', Validators.required],
   branchCircuteRunDesc: ['', Validators.required],
   frequencyCyclidLoads: ['', Validators.required],
   frequencyCyclidLoadsDesc: ['', Validators.required],
   conductors: ['', Validators.required],
   conductorsDesc: ['', Validators.required],
 });
}

 getElectronicSystemControl(): AbstractControl[] {
   return (<FormArray>this.EMCPowerAndEarthForm.get('electronicSystemArr')).controls
 }

 getDistributionPannelControl(): AbstractControl[] {
  return (<FormArray>this.EMCPowerAndEarthForm.get('distributionPannelArr')).controls
}

gotoNextModal(content2: any) {
  if(this.EMCPowerAndEarthForm.invalid) {
    this.validationError=true;
    this.validationErrorMsg="Please check all the fields";
//     setTimeout(()=>{
//       this.validationError=false;
//  }, 3000);
    return;
  }
 if(this.EMCPowerAndEarthForm.touched || this.EMCPowerAndEarthForm.untouched){
  this.modalReference = this.modalService.open(content2, {
     centered: true, 
     size: 'md',
     backdrop: 'static'
    })
 }
 if(this.EMCPowerAndEarthForm.dirty && this.EMCPowerAndEarthForm.touched){ //update
  this.modalService.open(content2, { centered: true,backdrop: 'static'});
  this.modalReference.close();
 }
}

closeModalDialog() {
  this.finalSpinner = true;
  this.popup = false;
  if (this.errorMsg != "") {
    this.Error = false;
    // this.service.isCompleted3= false;
    // this.service.isLinear=true;
    this.modalService.dismissAll((this.errorMsg = ""));
  }
  else {
    this.success = false;
    // this.service.isCompleted3= true;
    // this.service.isLinear=false;
    this.modalService.dismissAll((this.successMsg = ""));
    // this.disable = false;

  }
}

retrivePowerEarthingData(userName: any, emcId: any, data: any) {
  this.flag = true;
  this.step1List2 = JSON.parse(data);
  this.emcPowerAndEarthingData.userName = userName;
  this.emcPowerAndEarthingData.emcId = emcId;
  this.emcPowerAndEarthingData.powerEarthingDataId = this.step1List2[0].powerEarthingDataId;
  this.emcPowerAndEarthingData.powerElectricalUtility = this.step1List2[0].powerElectricalUtility;
  this.emcPowerAndEarthingData.powerBackupSource = this.step1List2[0].powerBackupSource;
  this.emcPowerAndEarthingData.powerDistanceHvLv = this.step1List2[0].powerDistanceHvLv;
  this.emcPowerAndEarthingData.powerCableHvLv = this.step1List2[0].powerCableHvLv;
  this.emcPowerAndEarthingData.powerDiscSupply = this.step1List2[0].powerDiscSupply;
  this.emcPowerAndEarthingData.powerTransformationKVA = this.step1List2[0].powerTransformationKVA;
  this.emcPowerAndEarthingData.powerInputVolts = this.step1List2[0].powerInputVolts;
  this.emcPowerAndEarthingData.powerInputPhase = this.step1List2[0].powerInputPhase;
  this.emcPowerAndEarthingData.powerInputWires = this.step1List2[0].powerInputWires;
  this.emcPowerAndEarthingData.powerInputFeed = this.step1List2[0].powerInputFeed;
  this.emcPowerAndEarthingData.powerInputDesc = this.step1List2[0].powerInputDesc;
  this.emcPowerAndEarthingData.powerOutputVolts = this.step1List2[0].powerOutputVolts;
  this.emcPowerAndEarthingData.powerOutputPhase = this.step1List2[0].powerOutputPhase;
  this.emcPowerAndEarthingData.powerOutputWires = this.step1List2[0].powerOutputWires;
  this.emcPowerAndEarthingData.powerOutputFeed = this.step1List2[0].powerOutputFeed;
  this.emcPowerAndEarthingData.powerIncomingAmps = this.step1List2[0].powerIncomingAmps;
  this.emcPowerAndEarthingData.powerNeutral = this.step1List2[0].powerNeutral;
  this.emcPowerAndEarthingData.psEarthing = this.step1List2[0].psEarthing;
  this.emcPowerAndEarthingData.peAttachement = this.step1List2[0].peAttachement;
  this.emcPowerAndEarthingData.dedicatedTransfermation = this.step1List2[0].dedicatedTransfermation;
  this.emcPowerAndEarthingData.dedicatedTransfermationOtherBuilding = this.step1List2[0].dedicatedTransfermationOtherBuilding;
  this.emcPowerAndEarthingData.typeOFIncoming = this.step1List2[0].typeOFIncoming;
  this.emcPowerAndEarthingData.descOfService = this.step1List2[0].descOfService;
  this.emcPowerAndEarthingData.descOfTestingService = this.step1List2[0].descOfTestingService;
  this.emcPowerAndEarthingData.descOfEquipotentilaBonding = this.step1List2[0].descOfEquipotentilaBonding;
  for(let i of this.step1List2[0].electronicSystem){
    this.EMCPowerAndEarthForm.patchValue ({
      electronicSystemArr: [i],
     })
  }

  for(let j of this.step1List2[0].distrubutionPannel){
    this.EMCPowerAndEarthForm.patchValue ({
      distributionPannelArr: [j],
     })
  }

  }

  onChangeForm(event:any){
    if(!this.EMCPowerAndEarthForm.invalid){
      if(this.EMCPowerAndEarthForm.dirty){
        this.validationError=false;
        // this.service.lvClick=1;
        // this.service.logoutClick=1;
        //  this.service.windowTabClick=1;
      }
      else{
        this.validationError=false;
        // this.service.lvClick=0;
        // this.service.logoutClick=0;
        // this.service.windowTabClick=0;
      }
     }
     else {
      // this.service.lvClick=1;
      // this.service.logoutClick=1;
      // this.service.windowTabClick=1;
     }
  }

  onKeyForm(event: KeyboardEvent) { 
    if(!this.EMCPowerAndEarthForm.invalid){ 
     if(this.EMCPowerAndEarthForm.dirty){
      this.validationError=false;
      //  this.service.lvClick=1;
      //  this.service.logoutClick=1;
      //  this.service.windowTabClick=1;
     }
     else{
       this.validationError=false;
      //  this.service.lvClick=0;
      //  this.service.logoutClick=0;
      //  this.service.windowTabClick=0;
     }
    }
    else {
    //  this.service.lvClick=1;
    //  this.service.logoutClick=1;
    //  this.service.windowTabClick=1;
    }
   } 

  get f():any {
    return this.EMCPowerAndEarthForm.controls;
  }

savePowerAndEarthingData(flag:any){
  this.submitted=true;
  if(this.EMCPowerAndEarthForm.invalid){
    return
  }
  console.log(this.EMCPowerAndEarthForm);

  this.emcPowerAndEarthingData.userName='Hasan';
  this.emcPowerAndEarthingData.emcId=10;
  
    this.electronicSystemArr = this.EMCPowerAndEarthForm.get('electronicSystemArr') as FormArray;
    this.emcPowerAndEarthingData.electronicSystem = this.EMCPowerAndEarthForm.value.electronicSystemArr;

    this.distributionPannelArr = this.EMCPowerAndEarthForm.get('distributionPannelArr') as FormArray;
    this.emcPowerAndEarthingData.distrubutionPannel = this.EMCPowerAndEarthForm.value.distributionPannelArr;
if(flag){
  if(this.EMCPowerAndEarthForm.dirty){
   this.emcPowerAndEarthingDataService
  .updatePowerEarthingData(this.emcPowerAndEarthingData)
  .subscribe(
    (data: any) => {
      this.finalSpinner = false;
      this.popup = true;
      this.success = true;
      this.successMsg = data;

    },
    (error: any) => {
      this.finalSpinner = false;
      this.popup = true;
      this.Error = true;
      this.errorArr = [];
      this.errorArr = JSON.parse(error.error);
      this.errorMsg = this.errorArr.message;

    });
  
}
}

else{
    this.emcPowerAndEarthingDataService
    .savePowerEarthingData(this.emcPowerAndEarthingData)
    .subscribe(
      (data: any) => {
        this.finalSpinner = false;
        this.popup = true;
        this.success = true;
        this.successMsg = data;
        this.emcPowerAndEarthingDataService
        .retrievePowerEarthingData(this.emcPowerAndEarthingData.userName, this.emcPowerAndEarthingData.emcId)
        .subscribe(
          (data: any) => {
            this.retrivePowerEarthingData(this.emcPowerAndEarthingData.userName, this.emcPowerAndEarthingData.emcId, data);
          },
          (error: any) => {

          });
      
      },
      (error: any) => {
        this.finalSpinner = false;
        this.popup = true;
        this.Error = true;
        this.errorArr = [];
        this.errorArr = JSON.parse(error.error);
        this.errorMsg = this.errorArr.message;
        
      });
  }

}
}
