import { Component, OnInit, Output ,EventEmitter } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationBoxComponent } from 'src/app/confirmation-box/confirmation-box.component';
import { EmcElectromagneticCompatibility } from 'src/app/EMC_Model/emc-electromagnetic-compatibility';
import { EmcElectroMagneticCompabilityService } from 'src/app/EMC_Services/emc-electro-magnetic-compability.service';
import { GlobalsService } from 'src/app/globals.service';

@Component({
  selector: 'app-emc-electromagnetic-compatibility-data',
  templateUrl: './emc-electromagnetic-compatibility-data.component.html',
  styleUrls: ['./emc-electromagnetic-compatibility-data.component.css']
})
export class EmcElectromagneticCompatibilityDataComponent implements OnInit {

  selectionValue: String[] = ['Yes', 'No',];

  EMCElectroMagneticFormm!: FormGroup;
  emcElectromagneticCompatibility = new EmcElectromagneticCompatibility();
  @Output() proceedNext = new EventEmitter<any>();
  externalCompatibilityArr!: FormArray;
  flag: boolean = false;
  errorArr: any = [];
  success: boolean = false;
  Error: boolean = false;
  submitted = false;
  validationErrorTab: boolean = false;
  validationErrorMsgTab: string = "";
  validationError: boolean = false;
  validationErrorMsg: String = "";
  successMsg: string = "";
  errorMsg: string = "";
  email: String;
  step1List: any;
  arr2: any;
  finalSpinner: boolean = true;
  popup: boolean = false;
  modalReference: any;
  emcId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    public service: GlobalsService,
    private modalService: NgbModal,
    private dialog: MatDialog,
    private emcElectroMagneticCompabilityService: EmcElectroMagneticCompabilityService) {

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
      externalCompatibilityId: [''],
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
  get f(): any {
    return this.EMCElectroMagneticFormm.controls;
  }

  closeModalDialog() {
    this.finalSpinner = true;
    this.popup = false;
    if (this.errorMsg != "") {
      this.Error = false;
      // this.service.isCompleted3= false;
      //  this.service.isLinear=true;
      this.modalService.dismissAll((this.errorMsg = ""));
      this.proceedNext.emit(false);
    }
    else {
      this.success = false;
      // this.service.isCompleted3= true;
      // this.service.isLinear=false;
      this.modalService.dismissAll((this.successMsg = ""));
      // this.disable = false;
      this.proceedNext.emit(true);
    

    }
  }

  retrieveDetailsfromSavedReports(userName: any, emcId: any, data: any) {

    this.flag = true;

    this.step1List = data.electromagneticCompatability;
    this.emcElectromagneticCompatibility.emcId = emcId;
    this.emcElectromagneticCompatibility.electromagneticCompatabilityId = this.step1List.electromagneticCompatabilityId;
    this.emcElectromagneticCompatibility.seSinglePoint = this.step1List.seSinglePoint;
    this.emcElectromagneticCompatibility.seMeshedArrangment = this.step1List.seMeshedArrangment;
    this.emcElectromagneticCompatibility.seDescription = this.step1List.seDescription;
    this.emcElectromagneticCompatibility.equiptentialBonding = this.step1List.equiptentialBonding;
    this.emcElectromagneticCompatibility.resistanceCabinet = this.step1List.resistanceCabinet;
    this.emcElectromagneticCompatibility.resistanceCabinetDesc = this.step1List.resistanceCabinetDesc;
    this.emcElectromagneticCompatibility.roomShield = this.step1List.roomShield;
    this.emcElectromagneticCompatibility.roomShieldDesc = this.step1List.roomShieldDesc;
    this.emcElectromagneticCompatibility.shieldingOtherDesc = this.step1List.shieldingOtherDesc;
    this.emcElectromagneticCompatibility.equipmentHighFrequency = this.step1List.equipmentHighFrequency;
    this.emcElectromagneticCompatibility.equipmentHighFrequencyDesc = this.step1List.equipmentHighFrequencyDesc;
    this.emcElectromagneticCompatibility.approximateDistance = this.step1List.approximateDistance;
    this.emcElectromagneticCompatibility.equipmentMaintence = this.step1List.equipmentMaintence;
    this.emcElectromagneticCompatibility.equipmentMaintenceDesc = this.step1List.equipmentMaintenceDesc;
    this.emcElectromagneticCompatibility.operationFrequency = this.step1List.operationFrequency;
    this.emcElectromagneticCompatibility.radiatedPower = this.step1List.radiatedPower;

    this.emcElectromagneticCompatibility.createdDate = this.step1List.createdDate;
    this.emcElectromagneticCompatibility.createdBy = this.step1List.createdBy;
    this.emcElectromagneticCompatibility.updatedDate = this.step1List.updatedDate;
    this.emcElectromagneticCompatibility.updatedBy = this.step1List.updatedBy;

    // this.populateData2();

    for (let i of this.step1List.externalCompatibility) {
      this.EMCElectroMagneticFormm.patchValue({
        externalCompatibilityArr: [i],
      })
    }
  }

  populateData2() {
    for (let item of this.step1List.externalCompatibility) {
      if (item.flag) { this.arr2.push(this.createGroup2(item)); }

    }
    this.EMCElectroMagneticFormm.setControl('externalCompatibilityArr', this.formBuilder.array(this.arr2 || []))
    this.arr2 = [];

  }

  createGroup2(item: any): FormGroup {
    return this.formBuilder.group({

      externalCompatibilityId: new FormControl({ disabled: false, value: item.externalCompatibilityId }),
      communication: new FormControl({ disabled: false, value: item.communication }, Validators.required),
      visibilityOfAntennas: new FormControl({ disabled: false, value: item.visibilityOfAntennas }, Validators.required),
      typeOfTransmission: new FormControl({ disabled: false, value: item.typeOfTransmission }, Validators.required),
      transmissionDesc: new FormControl({ disabled: false, value: item.transmissionDesc }, Validators.required),
      antennaDistance: new FormControl({ disabled: false, value: item.antennaDistance }, Validators.required),
      noOfWalls: new FormControl({ disabled: false, value: item.noOfWalls }, Validators.required),
      losDesc: new FormControl({ disabled: false, value: item.losDesc }, Validators.required),
      electronicSystemDistance: new FormControl({ disabled: false, value: item.electronicSystemDistance }, Validators.required),
      transmitterPower: new FormControl({ disabled: false, value: item.transmitterPower }, Validators.required),
      frequency: new FormControl({ disabled: false, value: item.frequency }, Validators.required),
      orientationAntinna: new FormControl({ disabled: false, value: item.orientationAntinna }, Validators.required),
      systemSite: new FormControl({ disabled: false, value: item.systemSite }, Validators.required),
      systemSiteDesc: new FormControl({ disabled: false, value: item.systemSiteDesc }, Validators.required),
      controlledLoads: new FormControl({ disabled: false, value: item.controlledLoads }, Validators.required),
      controlledLoadsDesc: new FormControl({ disabled: false, value: item.controlledLoadsDesc }, Validators.required),
      electricRailway: new FormControl({ disabled: false, value: item.electricRailway }, Validators.required),
      electricRailwayDesc: new FormControl({ disabled: false, value: item.electricRailwayDesc }, Validators.required),
      hvTransmission: new FormControl({ disabled: false, value: item.hvTransmission }, Validators.required),
      hvTransmissionDesc: new FormControl({ disabled: false, value: item.hvTransmissionDesc }, Validators.required),
      hpAcMangets: new FormControl({ disabled: false, value: item.hpAcMangets }, Validators.required),
      hpAcMangetsDesc: new FormControl({ disabled: false, value: item.hpAcMangetsDesc }, Validators.required),
      approximateDistance: new FormControl({ disabled: false, value: item.approximateDistance }, Validators.required),
      rfiSurvey: new FormControl({ disabled: false, value: item.rfiSurvey }, Validators.required),
      newRfiSurvey: new FormControl({ disabled: false, value: item.newRfiSurvey }, Validators.required),
      newRfiSurveyDesc: new FormControl({ disabled: false, value: item.newRfiSurveyDesc }, Validators.required),
    });
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
    this.emcElectromagneticCompatibility.updatedDate = this.step1List[0].updatedDate;
    this.emcElectromagneticCompatibility.updatedBy = this.step1List[0].updatedBy;
    
    // this.populateData(this.step1List[0].externalCompatibility)

    for (let i of this.step1List[0].externalCompatibility) {
      this.EMCElectroMagneticFormm.patchValue({
        externalCompatibilityArr: [i],
      })
    }
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
  gotoNextModal(content3: any) {
    if (this.EMCElectroMagneticFormm.invalid) {
      this.validationError = true;
      this.validationErrorMsg = "Please check all the fields";
      //     setTimeout(()=>{
      //       this.validationError=false;
      //  }, 3000);
      return;
    }

    // || this.EMCElectroMagneticFormm.untouched
    // if (this.EMCElectroMagneticFormm.touched ) {
    //   this.modalReference = this.modalService.open(content3, {
    //     centered: true,
    //     size: 'md',
    //     backdrop: 'static'
    //   })
    // }
    // if (this.EMCElectroMagneticFormm.dirty && this.EMCElectroMagneticFormm.touched) { //update
    //   this.modalService.open(content3, { centered: true, backdrop: 'static' });
    //   this.modalReference.close();
    // }
  }
  onKeyForm(event: KeyboardEvent) {
    if (!this.EMCElectroMagneticFormm.invalid) {
      if (this.EMCElectroMagneticFormm.dirty) {
        this.validationError = false;
        //  this.service.lvClick=1;
        //  this.service.logoutClick=1;
        //  this.service.windowTabClick=1;
      }
      else {
        this.validationError = false;
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

  onChangeForm(event: any) {
    if (!this.EMCElectroMagneticFormm.invalid) {
      if (this.EMCElectroMagneticFormm.dirty) {
        this.validationError = false;
        // this.service.lvClick=1;
        // this.service.logoutClick=1;
        //  this.service.windowTabClick=1;
      }
      else {
        this.validationError = false;
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


  gotoNextTab() {
    if (this.EMCElectroMagneticFormm.dirty && this.EMCElectroMagneticFormm.invalid) {
      this.service.isCompletedEmc3= false;
      this.service.isLinear=true;
       this.service.editable=false;
      //this.validationError=false;
      this.validationErrorTab = true;
      this.validationErrorMsgTab = 'Please check all the fields in power and Earthing details';
      setTimeout(() => {
        this.validationErrorTab = false;
      }, 3000);
      return;
    }
    else if(this.EMCElectroMagneticFormm.dirty && this.EMCElectroMagneticFormm.touched){
      this.service.isCompletedEmc3= false;
     this.service.isLinearEmc=true;
      this.service.editableEmc=false;
      // this.tabError = true;
      // this.tabErrorMsg = 'Kindly click on next button to update the changes!';
      // setTimeout(() => {
      //   this.tabError = false;
      // }, 3000);
      // return;
   }
    else{
      this.service.isCompletedEmc3= true;
     this.service.isLinearEmc=false;
     this.service.editableEmc=true;
    }
  }
  saveElectroMagneticData(flag: any,content3: any) {

    this.submitted = true;
    if (this.EMCElectroMagneticFormm.invalid) {
      return
    }
    this.emcElectromagneticCompatibility.userName = this.email;

    this.emcElectromagneticCompatibility.emcId = this.emcId;

    this.externalCompatibilityArr = this.EMCElectroMagneticFormm.get('externalCompatibilityArr') as FormArray;
    this.emcElectromagneticCompatibility.externalCompatibility = this.EMCElectroMagneticFormm.value.externalCompatibilityArr;


    const dialogRef = this.dialog.open(ConfirmationBoxComponent, {
      width: '420px',
      maxHeight: '90vh',
      disableClose: true,
    });
    
    dialogRef.componentInstance.summaryModal = true;
    dialogRef.componentInstance.confirmBox.subscribe(data=>{
      if(data) {
        this.modalReference = this.modalService.open(content3, {
          centered: true,
          size: 'md',
          backdrop: 'static'
        })
      if (flag) {
        if (this.EMCElectroMagneticFormm.dirty) {
          this.emcElectroMagneticCompabilityService
            .updateElectromagneticCompatability(this.emcElectromagneticCompatibility)
            .subscribe(
              (data: any) => {
                this.finalSpinner = false;
                this.popup = true;
                this.success = true;
                this.successMsg = data;
                this.retriveElectroMagneticCompatibilityDetails();
                this.proceedNext.emit(true);

              },
              (error: any) => {
                this.finalSpinner = false;
                this.popup = true;
                this.Error = true;
                this.errorArr = [];
                this.errorArr = JSON.parse(error.error);
                this.errorMsg = this.errorArr.message;
                this.proceedNext.emit(false);

              });
        }
      }

      else {
        this.emcElectroMagneticCompabilityService.addElectromagneticCompatability(this.emcElectromagneticCompatibility).subscribe(

          data => {
            this.finalSpinner = false;
            this.popup = true;
            this.success = true;
            this.successMsg = data;
            //this.disable = true;
            this.retriveElectroMagneticCompatibilityDetails();
           this.proceedNext.emit(true);
          },
          error => {
            this.finalSpinner = false;
            this.popup = true;
            this.Error = true;
            this.errorArr = [];
            this.errorArr = JSON.parse(error.error);
            this.errorMsg = this.errorArr.message;
           this.proceedNext.emit(false);
          }
        )
      }
    }});
  }

  retriveElectroMagneticCompatibilityDetails() {
    this.emcElectroMagneticCompabilityService.retrieveElectromagneticCompatability(this.emcElectromagneticCompatibility.userName, this.emcElectromagneticCompatibility.emcId).subscribe(
      data => {
        this.retrieveElectromagneticCompatability(this.emcElectromagneticCompatibility.userName, this.emcElectromagneticCompatibility.emcId,data);
      },
      error => {
      }
    );
  }

}
