import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmcPowerAndEarthingData } from 'src/app/EMC_Model/emc-power-and-earthing-data';
import { EmcPowerAndEarthingDataService } from 'src/app/EMC_Services/emc-power-and-earthing-data.service';
import { FileUploadServiceService } from 'src/app/EMC_Services/file-upload-service.service';
import { GlobalsService } from 'src/app/globals.service';
import { MatSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-power-and-earthing-data',
  templateUrl: './power-and-earthing-data.component.html',
  styleUrls: ['./power-and-earthing-data.component.css']
})
export class PowerAndEarthingDataComponent implements OnInit {

  incomingcable: String[] = ['Overhead', 'Burried', 'Combination'];
  neutral: String[] = ['Insulated', 'Uninsulated', 'Unknown'];
  selectionValue: String[] = ['Yes', 'No',];

  EMCPowerAndEarthForm!: FormGroup;
  emcPowerAndEarthingData = new EmcPowerAndEarthingData();
  @Output() proceedNext = new EventEmitter<any>();
  electronicSystemArr!: FormArray;
  distributionPannelArr!: FormArray;
  errorArr: any = [];
  success: boolean = false;
  filesuccess: boolean = false;
  filesuccessMsg: string = "";
  flag: boolean = false;
  Error: boolean = false;
  submitted = false;
  successMsg: string = "";
  errorMsg: string = "";
  finalSpinner: boolean = true;
  finalSpinnerDelete: boolean = true;
  popupDelete: boolean = false;
  fileDeleteSuccess: boolean = false;
  fileDeletesuccessMsg: string = "";
  validationErrorTab: boolean = false;
  validationErrorMsgTab: string = "";
  validationError: boolean = false;
  tabError: boolean = false;
  tabErrorMsg: string = "";
  validationErrorMsg: String = "";
  popup: boolean = false;
  modalReference: any;
  email: String;
  step1List2: any;
  arr1: any = [];
  arr2: any = [];
  emcId: number = 0;
  fileName: any = "";
  file!: any; // Variable to store file
  uploadDisable: boolean = true;
  mode: any = 'indeterminate';
  uploadFlag: boolean;
  fileId: number = 0;
  JSONdata: any = [];


  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private router: ActivatedRoute,
    public service: GlobalsService,
    private emcPowerAndEarthingDataService: EmcPowerAndEarthingDataService,
    private fileUploadServiceService: FileUploadServiceService
  ) {
    this.email = this.router.snapshot.paramMap.get('email') || '{}';
    this.uploadFlag = true;
  }

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
      distrubutionPannelId: [''],
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

  gotoNextModal(content2: any, content: any) {
    if (this.EMCPowerAndEarthForm.invalid) {
      this.validationError = true;
      this.validationErrorMsg = "Please check all the fields";
      //     setTimeout(()=>{
      //       this.validationError=false;
      //  }, 3000);
      return;
    }

    if (this.EMCPowerAndEarthForm.touched || this.EMCPowerAndEarthForm.untouched) {
      this.modalReference = this.modalService.open(content, {
        centered: true,
        size: 'md',
        backdrop: 'static'
      })
    }
    if (this.EMCPowerAndEarthForm.dirty && this.EMCPowerAndEarthForm.touched) { //update
      this.modalService.open(content2, { centered: true, backdrop: 'static' });
      this.modalReference.close();
    }
  }
  closeModalDialogFile() {
    this.modalService.dismissAll();
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

  retrieveDetailsfromSavedReports(userName: any, emcId: any, data: any) {

    this.step1List2 = data.powerEarthingData
    this.emcPowerAndEarthingData.emcId = emcId;
    this.emcPowerAndEarthingData.userName = this.step1List2.userName;
    this.emcPowerAndEarthingData.powerEarthingDataId = this.step1List2.powerEarthingDataId;
    this.emcPowerAndEarthingData.powerElectricalUtility = this.step1List2.powerElectricalUtility;
    this.emcPowerAndEarthingData.powerBackupSource = this.step1List2.powerBackupSource;
    this.emcPowerAndEarthingData.powerDistanceHvLv = this.step1List2.powerDistanceHvLv;
    this.emcPowerAndEarthingData.powerCableHvLv = this.step1List2.powerCableHvLv;
    this.emcPowerAndEarthingData.powerDiscSupply = this.step1List2.powerDiscSupply;
    this.emcPowerAndEarthingData.powerTransformationKVA = this.step1List2.powerTransformationKVA;
    this.emcPowerAndEarthingData.powerInputVolts = this.step1List2.powerInputVolts;
    this.emcPowerAndEarthingData.powerInputPhase = this.step1List2.powerInputPhase;
    this.emcPowerAndEarthingData.powerInputWires = this.step1List2.powerInputWires;
    this.emcPowerAndEarthingData.powerInputFeed = this.step1List2.powerInputFeed;
    this.emcPowerAndEarthingData.powerInputDesc = this.step1List2.powerInputDesc;
    this.emcPowerAndEarthingData.powerOutputVolts = this.step1List2.powerOutputVolts;
    this.emcPowerAndEarthingData.powerOutputPhase = this.step1List2.powerOutputPhase;
    this.emcPowerAndEarthingData.powerOutputWires = this.step1List2.powerOutputWires;
    this.emcPowerAndEarthingData.powerOutputFeed = this.step1List2.powerOutputFeed;
    this.emcPowerAndEarthingData.powerIncomingAmps = this.step1List2.powerIncomingAmps;
    this.emcPowerAndEarthingData.powerNeutral = this.step1List2.powerNeutral;
    this.emcPowerAndEarthingData.psEarthing = this.step1List2.psEarthing;
    this.emcPowerAndEarthingData.peAttachement = this.step1List2.peAttachement;
    //this.emcPowerAndEarthingData.peAttachement=this.fileName;
    this.emcPowerAndEarthingData.dedicatedTransfermation = this.step1List2.dedicatedTransfermation;
    this.emcPowerAndEarthingData.dedicatedTransfermationOtherBuilding = this.step1List2.dedicatedTransfermationOtherBuilding;
    this.emcPowerAndEarthingData.typeOFIncoming = this.step1List2.typeOFIncoming;
    this.emcPowerAndEarthingData.descOfService = this.step1List2.descOfService;
    this.emcPowerAndEarthingData.descOfTestingService = this.step1List2.descOfTestingService;
    this.emcPowerAndEarthingData.descOfEquipotentilaBonding = this.step1List2.descOfEquipotentilaBonding;

    this.emcPowerAndEarthingData.createdDate = this.step1List2.createdDate;
    this.emcPowerAndEarthingData.createdBy = this.step1List2.createdBy;
    this.emcPowerAndEarthingData.updatedDate = this.step1List2.updatedDate;
    this.emcPowerAndEarthingData.updatedBy = this.step1List2.updatedBy;

    // this.populateData();
    this.flag = true;

    for (let i of this.step1List2.electronicSystem) {
      this.EMCPowerAndEarthForm.patchValue({
        electronicSystemArr: [i],
      })
    }

    for (let i of this.step1List2.distrubutionPannel) {
      this.EMCPowerAndEarthForm.patchValue({
        distributionPannelArr: [i],
      })
    }
    this.retriveFIleName();
  }

  populateData() {
    for (let item of this.step1List2.electronicSystem) {
      if (item.flag) { this.arr1.push(this.createGroup(item)); }
    }

    for (let item of this.step1List2.distrubutionPannel) {
      if (item.flag) { this.arr1.push(this.createGroup2(item)); }
    }

    this.EMCPowerAndEarthForm.setControl('electronicSystemArr', this.formBuilder.array(this.arr1 || []))
    this.EMCPowerAndEarthForm.setControl('distributionPannelArr', this.formBuilder.array(this.arr2 || []))

    this.arr1 = [];
    this.arr2 = [];

  }

  createGroup(item: any): FormGroup {
    return this.formBuilder.group({

      electronicSystemId: new FormControl({ disabled: false, value: item.electronicSystemId }),
      bDSld: new FormControl({ disabled: false, value: item.bDSld }, Validators.required),
      bDRecordData: new FormControl({ disabled: false, value: item.bDRecordData }, Validators.required),
      bDEarthing: new FormControl({ disabled: false, value: item.bDEarthing }, Validators.required),
      electronicDesc: new FormControl({ disabled: false, value: item.electronicDesc }, Validators.required),
      panelId: new FormControl({ disabled: false, value: item.panelId }, Validators.required),
      namePlateData: new FormControl({ disabled: false, value: item.namePlateData }, Validators.required),
      mainCircuteBraker: new FormControl({ disabled: false, value: item.mainCircuteBraker }, Validators.required),
      mainCircuteBrakerRating: new FormControl({ disabled: false, value: item.mainCircuteBrakerRating }, Validators.required),
      emergencyTripRemote: new FormControl({ disabled: false, value: item.emergencyTripRemote }, Validators.required),
      emergencyTripLocal: new FormControl({ disabled: false, value: item.emergencyTripLocal }, Validators.required),
      otherTrip: new FormControl({ disabled: false, value: item.otherTrip }, Validators.required),
      differentalProtection: new FormControl({ disabled: false, value: item.differentalProtection }, Validators.required),
      bouodingStell: new FormControl({ disabled: false, value: item.bouodingStell }, Validators.required),
      panelFeed: new FormControl({ disabled: false, value: item.panelFeed }, Validators.required),
      phaseWires: new FormControl({ disabled: false, value: item.phaseWires }, Validators.required),
      neutralWire: new FormControl({ disabled: false, value: item.neutralWire }, Validators.required),
      peWireSize: new FormControl({ disabled: false, value: item.peWireSize }, Validators.required),
      pannelConnectors: new FormControl({ disabled: false, value: item.pannelConnectors }, Validators.required),
      neutralBus: new FormControl({ disabled: false, value: item.neutralBus }, Validators.required),
      earthBus: new FormControl({ disabled: false, value: item.earthBus }, Validators.required),
      listOfNonElectronicLoad: new FormControl({ disabled: false, value: item.listOfNonElectronicLoad }, Validators.required),
      dedicatedElectronicSystem: new FormControl({ disabled: false, value: item.dedicatedElectronicSystem }, Validators.required),
      nonComputerLoads: new FormControl({ disabled: false, value: item.nonComputerLoads }, Validators.required),
    });
  }

  createGroup2(item: any): FormGroup {
    return this.formBuilder.group({

      distrubutionPannelId: new FormControl({ disabled: false, value: item.distrubutionPannelId }),
      cbWireSize: new FormControl({ disabled: false, value: item.cbWireSize }, Validators.required),
      cbDesc: new FormControl({ disabled: false, value: item.cbDesc }, Validators.required),
      matchesReceptable: new FormControl({ disabled: false, value: item.matchesReceptable }, Validators.required),
      matchesReceptableDesc: new FormControl({ disabled: false, value: item.matchesReceptableDesc }, Validators.required),
      indivdialPwire: new FormControl({ disabled: false, value: item.indivdialPwire }, Validators.required),
      indivdialPwireDesc: new FormControl({ disabled: false, value: item.indivdialPwireDesc }, Validators.required),
      indivdialNeutralwire: new FormControl({ disabled: false, value: item.indivdialNeutralwire }, Validators.required),
      indivdialNeutralwireDesc: new FormControl({ disabled: false, value: item.indivdialNeutralwireDesc }, Validators.required),
      computerLoadCircute: new FormControl({ disabled: false, value: item.computerLoadCircute }, Validators.required),
      computerLoadCircuteDes: new FormControl({ disabled: false, value: item.computerLoadCircuteDes }, Validators.required),
      computerLoadReceptable: new FormControl({ disabled: false, value: item.computerLoadReceptable }, Validators.required),
      computerLoadReceptableDesc: new FormControl({ disabled: false, value: item.computerLoadReceptableDesc }, Validators.required),
      branchCircuteRun: new FormControl({ disabled: false, value: item.branchCircuteRun }, Validators.required),
      branchCircuteRunDesc: new FormControl({ disabled: false, value: item.branchCircuteRunDesc }, Validators.required),
      frequencyCyclidLoads: new FormControl({ disabled: false, value: item.frequencyCyclidLoads }, Validators.required),
      frequencyCyclidLoadsDesc: new FormControl({ disabled: false, value: item.frequencyCyclidLoadsDesc }, Validators.required),
      conductors: new FormControl({ disabled: false, value: item.conductors }, Validators.required),
      conductorsDesc: new FormControl({ disabled: false, value: item.conductorsDesc }, Validators.required),
    });
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
    for (let i of this.step1List2[0].electronicSystem) {
      this.EMCPowerAndEarthForm.patchValue({
        electronicSystemArr: [i],
      })
    }

    for (let j of this.step1List2[0].distrubutionPannel) {
      this.EMCPowerAndEarthForm.patchValue({
        distributionPannelArr: [j],
      })
    }

  }

  onChangeForm(event: any) {
    if (!this.EMCPowerAndEarthForm.invalid) {
      if (this.EMCPowerAndEarthForm.dirty) {
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

  onKeyForm(event: KeyboardEvent) {
    if (!this.EMCPowerAndEarthForm.invalid) {
      if (this.EMCPowerAndEarthForm.dirty) {
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

  get f(): any {
    return this.EMCPowerAndEarthForm.controls;
  }
  onChange(event: any) {
    this.file = event.target.files;
    if (this.file != null) {
      this.uploadDisable = false;
    }
  }

  onUpload(contentSpinner: any) {
    if (this.file != undefined) {
      this.modalService.open(contentSpinner, {
        centered: true,
        size: 'md',
        backdrop: 'static'
      });
      const formData = new FormData();
      for (let f of this.file) {
        formData.append('file', f, f.name);
      }
      setTimeout(() => {
        if (this.uploadFlag) {
          this.fileUploadServiceService.uploadFile(formData, this.emcId).subscribe(
            (data) => {
              this.uploadDisable = true;
              this.finalSpinner = false;
              this.popup = true;
              this.filesuccess = true;
              this.filesuccessMsg = "File Upload Successfully";
              this.EMCPowerAndEarthForm.controls.peAttachement.setValue('');
              //  this.EMCPowerAndEarthForm.controls['peAttachement'].setValidators(null);
              this.retriveFIleName();
            },
            (error) => {
              this.finalSpinner = false;
              this.popup = true;
              this.filesuccess = false;
              this.filesuccessMsg = "";
            },
          )
        }
        else {
          this.fileUploadServiceService.updateFile(formData, this.fileId).subscribe(
            (data) => {
              this.uploadDisable = true;
              this.finalSpinner = false;
              this.popup = true;
              this.filesuccess = true;
              this.filesuccessMsg = "File Updated Successfully";
              this.EMCPowerAndEarthForm.controls.peAttachement.setValue('');
              //  this.EMCPowerAndEarthForm.controls['peAttachement'].setValidators(null);
              this.retriveFIleName();
            },
            (error) => {
              this.finalSpinner = false;
              this.popup = true;
              this.filesuccess = false;
              this.filesuccessMsg = "";
            },
          )
        }

      }, 1000);

    }

  }

  retriveFIleName() {
    this.fileUploadServiceService.retriveFile(this.emcId).subscribe(
      data => {
        if (data != "" && data != undefined && data != null) {
          this.uploadFlag = false;
          this.JSONdata = JSON.parse(data);
          this.fileName = this.JSONdata.fileName;
          this.fileId = this.JSONdata.fileId;
          this.EMCPowerAndEarthForm.controls['peAttachement'].setValue('');
          this.EMCPowerAndEarthForm.controls['peAttachement'].clearValidators();
          this.EMCPowerAndEarthForm.controls['peAttachement'].updateValueAndValidity();
        } else {
          this.uploadFlag = true;
          this.EMCPowerAndEarthForm.controls['peAttachement'].setValidators([Validators.required]);
          this.EMCPowerAndEarthForm.controls['peAttachement'].updateValueAndValidity();
        }

      },
      error => {
        this.uploadFlag = true;
        this.fileName = '';
        this.EMCPowerAndEarthForm.controls['peAttachement'].setValidators([Validators.required]);
        this.EMCPowerAndEarthForm.controls['peAttachement'].updateValueAndValidity();
      }
    )
  }

  gotoNextTab() {
    if (this.EMCPowerAndEarthForm.dirty && this.EMCPowerAndEarthForm.invalid) {
      this.service.isCompletedEmc2 = false;
      this.service.isLinear = true;
      this.service.editable = false;
      //this.validationError=false;
      this.validationErrorTab = true;
      this.validationErrorMsgTab = 'Please check all the fields in power and Earthing details';
      setTimeout(() => {
        this.validationErrorTab = false;
      }, 3000);
      return;
    }
    else if (this.EMCPowerAndEarthForm.dirty && this.EMCPowerAndEarthForm.touched) {
      this.service.isCompletedEmc2 = false;
      this.service.isLinear = true;
      this.service.editable = false;
      this.tabError = true;
      this.tabErrorMsg = 'Kindly click on next button to update the changes!';
      setTimeout(() => {
        this.tabError = false;
      }, 3000);
      return;
    }
    else {
      this.service.isCompletedEmc2 = true;
      this.service.isLinear = false;
      this.service.editable = true;
    }
  }


  onDownload() {
    this.fileUploadServiceService.downloadFile(this.emcId)

  }
  deleteFile(contentSpinnerDelete: any) {
    this.modalService.open(contentSpinnerDelete, {
      centered: true,
      size: 'md',
      backdrop: 'static'
    });

    setTimeout(() => {
      this.fileUploadServiceService.deleteFile(this.emcId).subscribe(
        (data: any) => {
          this.finalSpinnerDelete = false;
          this.popupDelete = true;
          this.fileDeleteSuccess = true;
          this.fileDeletesuccessMsg = data;
          this.fileName = "";
          //  this.EMCPowerAndEarthForm.controls['peAttachement'].reset();

          this.retriveFIleName();

        },
        (error) => {
        },
      )
    }, 1000);

  }


  savePowerAndEarthingData(flag: any) {
    this.submitted = true;
    if (this.EMCPowerAndEarthForm.invalid) {
      return
    }

    this.emcPowerAndEarthingData.userName = this.email;
    this.emcPowerAndEarthingData.emcId = this.emcId;

    this.electronicSystemArr = this.EMCPowerAndEarthForm.get('electronicSystemArr') as FormArray;
    this.emcPowerAndEarthingData.electronicSystem = this.EMCPowerAndEarthForm.value.electronicSystemArr;

    this.distributionPannelArr = this.EMCPowerAndEarthForm.get('distributionPannelArr') as FormArray;
    this.emcPowerAndEarthingData.distrubutionPannel = this.EMCPowerAndEarthForm.value.distributionPannelArr;
    if (flag) {
      if (this.EMCPowerAndEarthForm.dirty) {
        this.emcPowerAndEarthingDataService
          .updatePowerEarthingData(this.emcPowerAndEarthingData)
          .subscribe(
            (data: any) => {
              this.finalSpinner = false;
              this.popup = true;
              this.success = true;
              this.successMsg = data;
              this.retrivePowerAndEarthingDetails();
              this.proceedNext.emit(true);


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

    else {

      this.emcPowerAndEarthingDataService.savePowerEarthingData(this.emcPowerAndEarthingData).subscribe(

        data => {
          this.finalSpinner = false;
          this.popup = true;
          this.success = true;
          this.successMsg = data;
          //this.disable = true;
          this.retrivePowerAndEarthingDetails();
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
    (this.emcPowerAndEarthingData);
  }

  retrivePowerAndEarthingDetails() {
    this.emcPowerAndEarthingDataService.retrievePowerEarthingData(this.emcPowerAndEarthingData.userName, this.emcPowerAndEarthingData.emcId).subscribe(
      data => {
        this.retrivePowerEarthingData(this.emcPowerAndEarthingData.userName, this.emcPowerAndEarthingData.emcId, data);

      },
      error => {
      }
    );
  }
}
