import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmcElectromagneticCompatibility } from 'src/app/EMC_Model/emc-electromagnetic-compatibility';
import { EmcElectroMagneticCompabilityService } from 'src/app/EMC_Services/emc-electro-magnetic-compability.service';
import { GlobalsService } from 'src/app/globals.service';

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
  flag: boolean = false;
  errorArr: any = [];
  success: boolean = false;
  Error: boolean = false;
  successMsg: string = "";
  errorMsg: string = "";
  email: String;
  step1List: any;
  arr2: any;
  finalSpinner: boolean = true;
  popup: boolean = false;
  modalReference: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    public service: GlobalsService,
    private modalService: NgbModal,
    private emcElectroMagneticCompabilityService: EmcElectroMagneticCompabilityService){ 
     
      this.email = this.router.snapshot.paramMap.get('email') || '{}';
    }

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

  retrieveElectromagneticCompatability(userName: any, emcId: any, data: any) {
    this.flag = true;
    this.step1List = JSON.parse(data);
    this.emcElectromagneticCompatibility.userName = userName;
    this.emcElectromagneticCompatibility.electromagneticCompatabilityId = this.step1List[0].electromagneticCompatabilityId;
    this.emcElectromagneticCompatibility.emcId = emcId;
    this.emcElectromagneticCompatibility.seSinglePoint = this.step1List[0].seSinglePoint;
    this.emcElectromagneticCompatibility.seMeshedArrangment = this.step1List[0].seMeshedArrangment;
    this.emcElectromagneticCompatibility.seDescription = this.step1List[0].seDescription;
    this.emcElectromagneticCompatibility.equiptentialBonding = this.step1List[0].equiptentialBonding;
    this.emcElectromagneticCompatibility.resistanceCabinet = this.step1List[0].resistanceCabinet;
    this.emcElectromagneticCompatibility.resistanceCabinetDesc = this.step1List[0].resistanceCabinetDesc;
    this.emcElectromagneticCompatibility.roomShield = this.step1List[0].roomShield;
    this.emcElectromagneticCompatibility.roomShieldDesc = this.step1List[0].roomShieldDesc;
    this.emcElectromagneticCompatibility.shieldingOtherDesc = this.step1List[0].shieldingOtherDesc;
    this.emcElectromagneticCompatibility.equipmentHighFrequency = this.step1List[0].equipmentHighFrequency;
    this.emcElectromagneticCompatibility.equipmentHighFrequencyDesc = this.step1List[0].equipmentHighFrequencyDesc;
    this.emcElectromagneticCompatibility.approximateDistance = this.step1List[0].approximateDistance;
    this.emcElectromagneticCompatibility.equipmentMaintence = this.step1List[0].equipmentMaintence;
    this.emcElectromagneticCompatibility.equipmentMaintenceDesc = this.step1List[0].equipmentMaintenceDesc;
    this.emcElectromagneticCompatibility.operationFrequency = this.step1List[0].operationFrequency;
    this.emcElectromagneticCompatibility.radiatedPower = this.step1List[0].radiatedPower;
    this.emcElectromagneticCompatibility.createdDate = this.step1List[0].createdDate;
    this.emcElectromagneticCompatibility.createdBy = this.step1List[0].createdBy;
    this.emcElectromagneticCompatibility.updatedBy = this.step1List[0].updatedBy;
    this.emcElectromagneticCompatibility.updatedDate = this.step1List[0].updatedDate;

    this.populateData(this.step1List[0].externalCompatibility)
  }

  populateData(value: any) {
    this.arr2 = [];
    for (let item of value) {
      console.log(item.exter)
      this.arr2.push(this.createGroup(item));
    }
  }

  createGroup(item: any): FormGroup {
    return this.formBuilder.group({
      externalCompatibilityId: new FormControl({ disabled: false, value: item.externalCompatibilityId }),
      communication: new FormControl({ disabled: false, value: item.communication }),
      visibilityOfAntennas: new FormControl({ disabled: false, value: item.visibilityOfAntennas }),
      typeOfTransmission: new FormControl({ disabled: false, value: item.typeOfTransmission }),
      transmissionDesc: new FormControl({ disabled: false, value: item.transmissionDesc }),
      antennaDistance: new FormControl({ disabled: false, value: item.antennaDistance }),
      noOfWalls: new FormControl({ disabled: false, value: item.noOfWalls }),
      losDesc: new FormControl({ disabled: false, value: item.losDesc }),
      electronicSystemDistance: new FormControl({ disabled: false, value: item.electronicSystemDistance }),
      transmitterPower: new FormControl({ disabled: false, value: item.transmitterPower }),
      frequency: new FormControl({ disabled: false, value: item.frequency }),
      orientationAntinna: new FormControl({ disabled: false, value: item.orientationAntinna }),
      systemSite: new FormControl({ disabled: false, value: item.systemSite }),
      systemSiteDesc: new FormControl({ disabled: false, value: item.systemSiteDesc }),
      controlledLoads: new FormControl({ disabled: false, value: item.controlledLoads }),
      controlledLoadsDesc: new FormControl({ disabled: false, value: item.controlledLoadsDesc }),
      electricRailway: new FormControl({ disabled: false, value: item.electricRailway }),
      electricRailwayDesc: new FormControl({ disabled: false, value: item.electricRailwayDesc }),
      hvTransmission: new FormControl({ disabled: false, value: item.hvTransmission }),
      hvTransmissionDesc: new FormControl({ disabled: false, value: item.hvTransmissionDesc }),
      hpAcMangets: new FormControl({ disabled: false, value: item.hpAcMangets }),
      hpAcMangetsDesc: new FormControl({ disabled: false, value: item.hpAcMangetsDesc }),
      approximateDistance: new FormControl({ disabled: false, value: item.approximateDistance }),
      rfiSurvey: new FormControl({ disabled: false, value: item.rfiSurvey }),
      newRfiSurvey: new FormControl({ disabled: false, value: item.newRfiSurvey }),
      newRfiSurveyDesc: new FormControl({ disabled: false, value: item.newRfiSurveyDesc }),
    });
  }

    saveElectroMagneticData(flag: any) {
      this.emcElectromagneticCompatibility.userName = "Hasan";
      if (!flag) {
        this.emcElectromagneticCompatibility.emcId = 10;
      }
      this.externalCompatibilityArr = this.EMCElectroMagneticFormm.get('externalCompatibilityArr') as FormArray;
      this.emcElectromagneticCompatibility.externalCompatibility = this.EMCElectroMagneticFormm.value.externalCompatibilityArr;
  
      if (flag) {
        this.emcElectroMagneticCompabilityService
          .updateElectromagneticCompatability(this.emcElectromagneticCompatibility)
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
  
      else {
        this.emcElectroMagneticCompabilityService
          .addElectromagneticCompatability(this.emcElectromagneticCompatibility)
          .subscribe(
            (data: any) => {
              this.finalSpinner = false;
              this.popup = true;
              this.success = true;
              this.successMsg = data;
              this.emcElectroMagneticCompabilityService
                .retrieveElectromagneticCompatability(this.emcElectromagneticCompatibility.userName, this.emcElectromagneticCompatibility.emcId)
                .subscribe(
                  (data: any) => {
                    this.retrieveElectromagneticCompatability(this.emcElectromagneticCompatibility.userName, this.emcElectromagneticCompatibility.emcId, data);
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
  
            })
      }
    }

}
