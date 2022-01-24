import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private formBuilder: FormBuilder,
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

  saveElectroMagneticData(){
    console.log(this.EMCElectroMagneticFormm);
  
    this.emcElectromagneticCompatibility.userName='Hasan';
    this.emcElectromagneticCompatibility.emcId=10;
    
      this.externalCompatibilityArr = this.EMCElectroMagneticFormm.get('externalCompatibilityArr') as FormArray;
      this.emcElectromagneticCompatibility.externalCompatibility = this.EMCElectroMagneticFormm.value.externalCompatibilityArr;
  
      this.emcElectroMagneticCompabilityService
      .addElectromagneticCompatability(this.emcElectromagneticCompatibility)
      .subscribe(
        (data: any) => {
        
        },
        (error: any) => {
          
        });
  console.log('hiiiiiiiiiiiiiiiiiiii');
    }

}
