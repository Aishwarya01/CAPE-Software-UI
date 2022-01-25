import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  Error: boolean = false;
  submitted=false;
  successMsg: string = "";
  errorMsg: string = "";
  finalSpinner: boolean = true;
  popup: boolean = false;
  modalReference: any;
  
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
      peAttachement: ['', Validators.required],
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
  this.modalReference = this.modalService.open(content2, {
    centered: true,
    size: 'md',
    backdrop: 'static'
  })

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

savePowerAndEarthingData(){
  console.log(this.EMCPowerAndEarthForm);

  this.emcPowerAndEarthingData.userName='Hasan';
  this.emcPowerAndEarthingData.emcId=10;
  
    this.electronicSystemArr = this.EMCPowerAndEarthForm.get('electronicSystemArr') as FormArray;
    this.emcPowerAndEarthingData.electronicSystem = this.EMCPowerAndEarthForm.value.electronicSystemArr;

    this.distributionPannelArr = this.EMCPowerAndEarthForm.get('distributionPannelArr') as FormArray;
    this.emcPowerAndEarthingData.distrubutionPannel = this.EMCPowerAndEarthForm.value.distributionPannelArr;



    this.emcPowerAndEarthingDataService
    .savePowerEarthingData(this.emcPowerAndEarthingData)
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
