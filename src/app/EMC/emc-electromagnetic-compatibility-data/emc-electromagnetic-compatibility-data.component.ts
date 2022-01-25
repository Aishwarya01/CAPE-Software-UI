import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmcElectromagneticCompatibility } from 'src/app/EMC_Model/emc-electromagnetic-compatibility';
import { EmcElectroMagneticCompabilityService } from 'src/app/EMC_Services/emc-electro-magnetic-compability.service';

@Component({
  selector: 'app-emc-electromagnetic-compatibility-data',
  templateUrl: './emc-electromagnetic-compatibility-data.component.html',
  styleUrls: ['./emc-electromagnetic-compatibility-data.component.css']
})
export class EmcElectromagneticCompatibilityDataComponent implements OnInit {

  selectionValue: String[] = ['Yes', 'No', ];

  EMCElectroMagneticFormm!: FormGroup;
  emcElectromagneticCompatibility = new EmcElectromagneticCompatibility();
  externalCompatibilityArr!: FormArray;
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
    private emcElectroMagneticCompabilityService: EmcElectroMagneticCompabilityService
    ){ }

  ngOnInit(): void {
    this.EMCElectroMagneticFormm = this.formBuilder.group({

      seSinglePoint: ['', Validators.required],
      seMeshedArrangment: ['', Validators.required],
      seDescription: ['', Validators.required],
      equiptentialBonding: ['', Validators.required],
      resistanceCabinet: ['', Validators.required],
      resistanceCabinetDesc: ['', Validators.required],
      roomShield: ['', Validators.required],
      roomShieldDesc: ['', Validators.required],
      shieldingOtherDesc: ['', Validators.required],
      equipmentHighFrequency: ['', Validators.required],
      equipmentHighFrequencyDesc: ['', Validators.required],
      approximateDistance: ['', Validators.required],
      equipmentMaintence: ['', Validators.required],
      equipmentMaintenceDesc: ['', Validators.required],
      operationFrequency: ['', Validators.required],
      radiatedPower: ['', Validators.required],

      externalCompatibilityArr: this.formBuilder.array([this.createExternalCompatibilityArr()])
    });
  }

  createExternalCompatibilityArr(): any {
     return this.formBuilder.group({
      
      communication: ['', Validators.required],
      visibilityOfAntennas: ['', Validators.required],
      typeOfTransmission: ['', Validators.required],
      transmissionDesc: ['', Validators.required],
      antennaDistance: ['', Validators.required],
      noOfWalls: ['', Validators.required],
      losDesc: ['', Validators.required],
      electronicSystemDistance: ['', Validators.required],
      transmitterPower: ['', Validators.required],
      frequency: ['', Validators.required],
      orientationAntinna: ['', Validators.required],
      systemSite: ['', Validators.required],
      systemSiteDesc: ['', Validators.required],
      controlledLoads: ['', Validators.required],
      controlledLoadsDesc: ['', Validators.required],
      electricRailway: ['', Validators.required],
      electricRailwayDesc: ['', Validators.required],
      hvTransmission: ['', Validators.required],
      hvTransmissionDesc: ['', Validators.required],
      hpAcMangets: ['', Validators.required],
      hpAcMangetsDesc: ['', Validators.required],
      approximateDistance: ['', Validators.required],
      rfiSurvey: ['', Validators.required],
      newRfiSurvey: ['', Validators.required],
      newRfiSurveyDesc: ['', Validators.required],
    });
  }

  getExternalCompatibilityControl(): AbstractControl[] {
    return (<FormArray>this.EMCElectroMagneticFormm.get('externalCompatibilityArr')).controls
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
  saveElectroMagneticData(){
    console.log(this.EMCElectroMagneticFormm);
  
    this.emcElectromagneticCompatibility.userName='siva';
    this.emcElectromagneticCompatibility.emcId=110;
    
      this.externalCompatibilityArr = this.EMCElectroMagneticFormm.get('externalCompatibilityArr') as FormArray;
      this.emcElectromagneticCompatibility.externalCompatibility = this.EMCElectroMagneticFormm.value.externalCompatibilityArr;
  
      this.emcElectroMagneticCompabilityService
      .addElectromagneticCompatability(this.emcElectromagneticCompatibility)
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
