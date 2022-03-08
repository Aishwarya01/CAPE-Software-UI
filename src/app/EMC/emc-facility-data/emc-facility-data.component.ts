import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmcFacilityData } from 'src/app/EMC_Model/emc-facility-data';
import { EmcFacilityDataService } from 'src/app/EMC_Services/emc-facility-data.service';
import { GlobalsService } from 'src/app/globals.service';

@Component({
  selector: 'app-emc-facility-data',
  templateUrl: './emc-facility-data.component.html',
  styleUrls: ['./emc-facility-data.component.css']
})
export class EmcFacilityDataComponent implements OnInit {

  buildingType: String[] = ['Industrial', 'Rural', 'Residential', 'Commercial', 'Small Town', 'Urban', 'Others'];
  buildingConstruction: String[] = ['Wood', 'Brick', 'Brick with RCC Columns And Slabs ', 'Steel (PEB)'];
  dedicatedRoomForSafety: String[] = ['Non Dedicated Room', 'Others'];
  floorMaterisl: String[] = ['Sealed', 'Coated', 'Covered'];
  utilisation: String[] = ['Supply Plenum', 'Exhause Plenum', 'Dead Space'];
  external: String[] = ['Single Pane', 'Double Pane', 'Tripple Pane', 'Reflective Anodised'];
  windowCovering: String[] = ['Drapes', 'Curtains', 'Shades', 'Blinds'];

  EMCFacilityForm!: FormGroup;
  panelOpenState = false;

  emcFacilityData = new EmcFacilityData;
  @Output() proceedNext = new EventEmitter<any>();
  flag: boolean = false;
  floorCoveringArr!: FormArray;
  errorArr: any = [];
  success: boolean = false;
  Error: boolean = false;
  submitted = false;
  successMsg: string = "";
  errorMsg: string = "";
  validationErrorTab: boolean = false;
  validationErrorMsgTab: string = "";
  tabError: boolean = false;
  tabErrorMsg: string = "";
  validationError: boolean = false;
  validationErrorMsg: String = "";
  email: String;
  step1List: any;
  arr2: any;
  finalSpinner: boolean = true;
  popup: boolean = false;
  modalReference: any;

  arr1: any = [];
  emcId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    public service: GlobalsService,
    private modalService: NgbModal,
    private emcFacilityDataService: EmcFacilityDataService) {

    this.email = this.router.snapshot.paramMap.get('email') || '{}';
  }

  ngOnInit(): void {
    this.EMCFacilityForm = this.formBuilder.group({

      blType: ['', Validators.required],
      blOtherDescription: ['', Validators.required],
      bcType: ['', Validators.required],
      bcNoOfFloors: ['', Validators.required],
      bcRoomFloorLocation: ['', Validators.required],
      bcBuildingPrimaryUse: ['', Validators.required],
      bcOtherUses: ['', Validators.required],
      rlInteriorRoom: ['', Validators.required],
      rlExteriorRoom: ['', Validators.required],
      rlSolidExterior: ['', Validators.required],
      rlWindowedExterior: ['', Validators.required],
      rlWindsFace: ['', Validators.required],
      ruDedicated: ['', Validators.required],
      ruOtherDesc: ['', Validators.required],
      rmHeightTrueFloor: ['', Validators.required],
      rmHeightFalseFloor: ['', Validators.required],
      rmWidth: ['', Validators.required],
      rmLength: ['', Validators.required],
      rmMaxFloor: ['', Validators.required],
      ftRaisedFloor: ['', Validators.required],
      ftAirSupply: ['', Validators.required],
      ftHeight: ['', Validators.required],
      ftAirFlowObservation: ['', Validators.required],
      ftDescription: ['', Validators.required],
      ftAirGrillDampers: ['', Validators.required],
      ftCableHole: ['', Validators.required],
      ftPedestals: ['', Validators.required],
      ftGrids: ['', Validators.required],
      ftBolted: ['', Validators.required],
      ftWelded: ['', Validators.required],
      ftEarthingDesc: ['', Validators.required],
      ftTrueFloorMaterial: ['', Validators.required],
      ftDescribe: ['', Validators.required],
      ftCleanliness: ['', Validators.required],
      ftOtherDescription: ['', Validators.required],

      floorCoveringArr: this.formBuilder.array([this.createFloorDescriptionArr()])

    });
  }
  private createFloorDescriptionArr() {

    return this.formBuilder.group({
      floorCoveringId: [''],
      fcType: ['', Validators.required],
      fcManufactor: ['', Validators.required],
      fcDescription: ['', Validators.required],
      fcWoven: ['', Validators.required],
      fcChemical: ['', Validators.required],
      fcNone: ['', Validators.required],
      fcOtherDecription: ['', Validators.required],
      wallType: ['', Validators.required],
      wallMaterial: ['', Validators.required],
      wallCoveringType: ['', Validators.required],
      wallHumidity: ['', Validators.required],
      wallSealing: ['', Validators.required],
      wallDesc: ['', Validators.required],
      ccFalseDesc: ['', Validators.required],
      ccFalseHumidity: ['', Validators.required],
      ccFalseHeight: ['', Validators.required],
      ccUtilisation: ['', Validators.required],
      ccTrueDesc: ['', Validators.required],
      ccTrueHumidity: ['', Validators.required],
      ccSurfaceDesc: ['', Validators.required],
      windowsExternal: ['', Validators.required],
      windowsDescription: ['', Validators.required],
      windowsCovering: ['', Validators.required],
      windowsOtherDesc: ['', Validators.required],
      windowsInternalDesc: ['', Validators.required],
      doorsMaterial: ['', Validators.required],
      doorsNumber: ['', Validators.required],
      doorsWidth: ['', Validators.required],
      doorsHeight: ['', Validators.required],
      doorsCloserMechanish: ['', Validators.required],
      doorsQualitySealing: ['', Validators.required],
      doorsDesc: ['', Validators.required],

    });

  }

  retrieveDetailsfromSavedReports(userName: any, emcId: any, data: any) {
    this.flag = true;
    this.step1List = data.facilityData;
    this.emcFacilityData.emcId = emcId;
    this.emcFacilityData.facilityDataId = this.step1List.facilityDataId
    this.emcFacilityData.blType = this.step1List.blType;
    this.emcFacilityData.blOtherDescription = this.step1List.blOtherDescription;
    this.emcFacilityData.bcType = this.step1List.bcType;
    this.emcFacilityData.bcNoOfFloors = this.step1List.bcNoOfFloors;
    this.emcFacilityData.bcRoomFloorLocation = this.step1List.bcRoomFloorLocation;
    this.emcFacilityData.bcBuildingPrimaryUse = this.step1List.bcBuildingPrimaryUse;
    this.emcFacilityData.bcOtherUses = this.step1List.bcOtherUses;
    this.emcFacilityData.rlInteriorRoom = this.step1List.rlInteriorRoom;
    this.emcFacilityData.rlExteriorRoom = this.step1List.rlExteriorRoom;
    this.emcFacilityData.rlSolidExterior = this.step1List.rlSolidExterior;
    this.emcFacilityData.rlWindowedExterior = this.step1List.rlWindowedExterior;
    this.emcFacilityData.rlWindsFace = this.step1List.rlWindsFace;
    this.emcFacilityData.ruDedicated = this.step1List.ruDedicated;
    this.emcFacilityData.ruOtherDesc = this.step1List.ruOtherDesc;
    this.emcFacilityData.rmHeightTrueFloor = this.step1List.rmHeightTrueFloor;
    this.emcFacilityData.rmHeightFalseFloor = this.step1List.rmHeightFalseFloor;
    this.emcFacilityData.rmWidth = this.step1List.rmWidth;
    this.emcFacilityData.rmLength = this.step1List.rmLength;
    this.emcFacilityData.rmMaxFloor = this.step1List.rmMaxFloor;
    this.emcFacilityData.ftRaisedFloor = this.step1List.ftRaisedFloor;
    this.emcFacilityData.ftAirSupply = this.step1List.ftAirSupply;
    this.emcFacilityData.ftHeight = this.step1List.ftHeight;
    this.emcFacilityData.ftAirFlowObservation = this.step1List.ftAirFlowObservation;
    this.emcFacilityData.ftDescription = this.step1List.ftDescription;
    this.emcFacilityData.ftAirGrillDampers = this.step1List.ftAirGrillDampers;
    this.emcFacilityData.ftCableHole = this.step1List.ftCableHole;
    this.emcFacilityData.ftPedestals = this.step1List.ftPedestals;
    this.emcFacilityData.ftGrids = this.step1List.ftGrids;
    this.emcFacilityData.ftBolted = this.step1List.ftBolted;
    this.emcFacilityData.ftWelded = this.step1List.ftWelded;
    this.emcFacilityData.ftEarthingDesc = this.step1List.ftEarthingDesc;
    this.emcFacilityData.ftTrueFloorMaterial = this.step1List.ftTrueFloorMaterial;
    this.emcFacilityData.ftDescribe = this.step1List.ftDescribe;
    this.emcFacilityData.ftCleanliness = this.step1List.ftCleanliness;
    this.emcFacilityData.ftOtherDescription = this.step1List.ftOtherDescription;

    this.emcFacilityData.createdDate = this.step1List.createdDate;
    this.emcFacilityData.createdBy = this.step1List.createdBy;
    this.emcFacilityData.createdDate = this.step1List.createdDate;
    this.emcFacilityData.userName = this.step1List.userName;

    // this.populateData();

    for (let i of this.step1List.floorCovering) {
      this.EMCFacilityForm.patchValue({
        floorCoveringArr: [i],
      })
    }

  }

  populateData() {
    for (let item of this.step1List.floorCovering) {
      if (item.flag) { this.arr1.push(this.createGroup(item)); }

    }
    this.EMCFacilityForm.setControl('floorCoveringArr', this.formBuilder.array(this.arr1 || []))
    this.arr1 = [];

  }

  createGroup(item: any): FormGroup {
    return this.formBuilder.group({

      floorCoveringId: new FormControl({ disabled: false, value: item.floorCoveringId }),
      flag: new FormControl({ disabled: false, value: item.flag }),
      fcType: new FormControl({ disabled: false, value: item.fcType }, Validators.required),
      fcManufactor: new FormControl({ disabled: false, value: item.fcManufactor }, Validators.required),
      fcDescription: new FormControl({ disabled: false, value: item.fcDescription }, Validators.required),
      fcWoven: new FormControl({ disabled: false, value: item.fcWoven }, Validators.required),
      fcChemical: new FormControl({ disabled: false, value: item.fcChemical }, Validators.required),
      fcNone: new FormControl({ disabled: false, value: item.fcNone }, Validators.required),
      fcOtherDecription: new FormControl({ disabled: false, value: item.fcOtherDecription }, Validators.required),
      wallType: new FormControl({ disabled: false, value: item.wallType }, Validators.required),
      wallMaterial: new FormControl({ disabled: false, value: item.wallMaterial }, Validators.required),
      wallCoveringType: new FormControl({ disabled: false, value: item.wallCoveringType }, Validators.required),
      wallHumidity: new FormControl({ disabled: false, value: item.wallHumidity }, Validators.required),
      wallSealing: new FormControl({ disabled: false, value: item.wallSealing }, Validators.required),
      wallDesc: new FormControl({ disabled: false, value: item.wallDesc }, Validators.required),
      ccFalseDesc: new FormControl({ disabled: false, value: item.ccFalseDesc }, Validators.required),
      ccFalseHumidity: new FormControl({ disabled: false, value: item.ccFalseHumidity }, Validators.required),
      ccFalseHeight: new FormControl({ disabled: false, value: item.ccFalseHeight }, Validators.required),
      ccUtilisation: new FormControl({ disabled: false, value: item.ccUtilisation }, Validators.required),
      ccTrueDesc: new FormControl({ disabled: false, value: item.ccTrueDesc }, Validators.required),
      ccTrueHumidity: new FormControl({ disabled: false, value: item.ccTrueHumidity }, Validators.required),
      ccSurfaceDesc: new FormControl({ disabled: false, value: item.ccSurfaceDesc }, Validators.required),
      windowsExternal: new FormControl({ disabled: false, value: item.windowsExternal }, Validators.required),
      windowsDescription: new FormControl({ disabled: false, value: item.windowsDescription }, Validators.required),
      windowsCovering: new FormControl({ disabled: false, value: item.windowsCovering }, Validators.required),
      windowsOtherDesc: new FormControl({ disabled: false, value: item.windowsOtherDesc }, Validators.required),
      windowsInternalDesc: new FormControl({ disabled: false, value: item.windowsInternalDesc }, Validators.required),
      doorsMaterial: new FormControl({ disabled: false, value: item.doorsMaterial }, Validators.required),
      doorsNumbe: new FormControl({ disabled: false, value: item.doorsNumber }, Validators.required),
      doorsWidth: new FormControl({ disabled: false, value: item.doorsWidth }, Validators.required),
      doorsHeight: new FormControl({ disabled: false, value: item.doorsHeight }, Validators.required),
      doorsCloserMechanish: new FormControl({ disabled: false, value: item.doorsCloserMechanish }, Validators.required),
      doorsQualitySealing: new FormControl({ disabled: false, value: item.doorsQualitySealing }, Validators.required),
      doorsDesc: new FormControl({ disabled: false, value: item.doorsDesc }, Validators.required)
    });
  }


  getfloorCoveringarrControl(): AbstractControl[] {
    return (<FormArray>this.EMCFacilityForm.get('floorCoveringArr')).controls
  }


  retriveFacilityData(userName: any, emcId: any, data: any) {
    this.flag = true;
    this.step1List = JSON.parse(data);
    this.emcFacilityData.userName = userName;
    this.emcFacilityData.emcId = emcId;
    this.emcFacilityData.facilityDataId = this.step1List[0].facilityDataId;
    this.emcFacilityData.blType = this.step1List[0].blType;
    this.emcFacilityData.blOtherDescription = this.step1List[0].blOtherDescription;
    this.emcFacilityData.bcType = this.step1List[0].bcType;
    this.emcFacilityData.bcNoOfFloors = this.step1List[0].bcNoOfFloors;
    this.emcFacilityData.bcRoomFloorLocation = this.step1List[0].bcRoomFloorLocation;
    this.emcFacilityData.bcBuildingPrimaryUse = this.step1List[0].bcBuildingPrimaryUse;
    this.emcFacilityData.bcOtherUses = this.step1List[0].bcOtherUses;
    this.emcFacilityData.rlInteriorRoom = this.step1List[0].rlInteriorRoom;
    this.emcFacilityData.rlExteriorRoom = this.step1List[0].rlExteriorRoom;
    this.emcFacilityData.rlSolidExterior = this.step1List[0].rlSolidExterior;
    this.emcFacilityData.rlWindowedExterior = this.step1List[0].rlWindowedExterior;
    this.emcFacilityData.rlWindsFace = this.step1List[0].rlWindsFace;
    this.emcFacilityData.ruDedicated = this.step1List[0].ruDedicated;
    this.emcFacilityData.ruOtherDesc = this.step1List[0].ruOtherDesc;
    this.emcFacilityData.rmHeightTrueFloor = this.step1List[0].rmHeightTrueFloor;
    this.emcFacilityData.rmHeightFalseFloor = this.step1List[0].rmHeightFalseFloor;
    this.emcFacilityData.rmWidth = this.step1List[0].rmWidth;
    this.emcFacilityData.rmLength = this.step1List[0].rmLength;
    this.emcFacilityData.rmMaxFloor = this.step1List[0].rmMaxFloor;
    this.emcFacilityData.ftRaisedFloor = this.step1List[0].ftRaisedFloor;
    this.emcFacilityData.ftAirSupply = this.step1List[0].ftAirSupply;
    this.emcFacilityData.ftHeight = this.step1List[0].ftHeight;
    this.emcFacilityData.ftAirFlowObservation = this.step1List[0].ftAirFlowObservation;
    this.emcFacilityData.ftDescription = this.step1List[0].ftDescription;
    this.emcFacilityData.ftAirGrillDampers = this.step1List[0].ftAirGrillDampers;
    this.emcFacilityData.ftCableHole = this.step1List[0].ftCableHole;
    this.emcFacilityData.ftPedestals = this.step1List[0].ftPedestals;
    this.emcFacilityData.ftGrids = this.step1List[0].ftGrids;
    this.emcFacilityData.ftBolted = this.step1List[0].ftBolted;
    this.emcFacilityData.ftWelded = this.step1List[0].ftWelded;
    this.emcFacilityData.ftEarthingDesc = this.step1List[0].ftEarthingDesc;
    this.emcFacilityData.ftTrueFloorMaterial = this.step1List[0].ftTrueFloorMaterial;
    this.emcFacilityData.ftDescribe = this.step1List[0].ftDescribe;
    this.emcFacilityData.ftCleanliness = this.step1List[0].ftCleanliness;
    this.emcFacilityData.ftOtherDescription = this.step1List[0].ftOtherDescription;
    this.emcFacilityData.createdDate = this.step1List[0].createdDate;
    this.emcFacilityData.createdBy = this.step1List[0].createdBy;
    this.emcFacilityData.updatedDate = this.step1List[0].updatedDate;
    this.emcFacilityData.updatedBy = this.step1List[0].updatedBy;

    for (let i of this.step1List[0].floorCovering) {
      this.EMCFacilityForm.patchValue({
        floorCoveringArr: [i],
      })
    }
  }
  get f(): any {
    return this.EMCFacilityForm.controls;
  }

  onChangeForm(event:any){
    if(!this.EMCFacilityForm.invalid){
      if(this.EMCFacilityForm.dirty){
        this.validationError=false;
        this.service.lvClick=1;
        this.service.logoutClick=1;
         this.service.windowTabClick=1;
      }
      else{
        this.validationError=false;
        this.service.lvClick=0;
        this.service.logoutClick=0;
        this.service.windowTabClick=0;
      }
     }
     else {
      this.service.lvClick=1;
      this.service.logoutClick=1;
      this.service.windowTabClick=1;
     }
  }
  onKeyForm(event: KeyboardEvent) { 
   if(!this.EMCFacilityForm.invalid){ 
    if(this.EMCFacilityForm.dirty){
      this.validationError=false;
      this.service.lvClick=1;
      this.service.logoutClick=1;
      this.service.windowTabClick=1;
    }
    else{
      this.validationError=false;
      this.service.lvClick=0;
      this.service.logoutClick=0;
      this.service.windowTabClick=0;
    }
   }
   else {
    this.service.lvClick=1;
    this.service.logoutClick=1;
    this.service.windowTabClick=1;
   }
  } 
  reloadFromBack(){
    if(this.EMCFacilityForm.invalid){
     this.service.isCompleted2= false;
     this.service.isLinear=true;
     this.service.editable=false;
     this.validationErrorTab = true;
     this.validationErrorMsgTab= 'Please check all the fields in supply characteristics';
     setTimeout(() => {
       this.validationErrorTab = false;
     }, 3000);
     return false;
    }
    else if(this.EMCFacilityForm.dirty && this.EMCFacilityForm.touched){
      this.service.isCompleted2= false;
      this.service.isLinear=true;
      this.service.editable=false;
      this.tabError = true;
      this.tabErrorMsg = 'Kindly click on next button to update the changes!';
      setTimeout(() => {
        this.tabError = false;
      }, 3000);
      return false;
    } 
    else{
      this.service.isCompleted2= true;
      this.service.isLinear=false;
      this.service.editable=true;
      this.EMCFacilityForm.markAsPristine();
   return true;
    }
  }
  closeModalDialog() {
    this.finalSpinner=true;
    this.popup=false;
    if (this.errorMsg != "") {
      this.Error = false;
      this.success = false;
      this.service.isCompleted2= false;
      this.service.isLinear=true;
      this.modalService.dismissAll((this.errorMsg = ""));
    } 
    else {
      this.success = false;
      this.Error = false;
      this.service.isCompleted2= true;
      this.service.isLinear=false;
      this.modalService.dismissAll((this.successMsg = ""));
    }
  }
 
  gotoNextTab() {
    if ((this.EMCFacilityForm.dirty && this.EMCFacilityForm.invalid) || this.service.isCompleted==false){
      this.service.isCompleted2= false;
      this.service.isLinear=true;
      this.service.editable=false;
      this.validationErrorTab = true;
      this.validationErrorMsgTab= 'Please check all the fields in supply characteristics';
      setTimeout(() => {
        this.validationErrorTab = false;
      }, 3000);
      return;
    }
    else if(this.EMCFacilityForm.dirty && this.EMCFacilityForm.touched){
      this.service.isCompleted2= false;
      this.service.isLinear=true;
      this.service.editable=false;
      this.tabError = true;
      this.tabErrorMsg = 'Kindly click on next button to update the changes!';
      setTimeout(() => {
        this.tabError = false;
      }, 3000);
   }
    else{
      this.service.isCompleted2= true;
      this.service.isLinear=false;
      this.service.editable=true;
    }
  }

  gotoNextModal(content1: any, content2: any) {
    if (this.EMCFacilityForm.invalid) {
      this.validationError = true;
      this.validationErrorMsg = "Please check all the fields";
      //     setTimeout(()=>{
      //       this.validationError=false;
      //  }, 3000);
      return;
    }

    if (this.EMCFacilityForm.touched || this.EMCFacilityForm.untouched) {
      this.modalReference = this.modalService.open(content2, {
        centered: true,
        size: 'md',
        backdrop: 'static'
      })
    }
    if (this.EMCFacilityForm.dirty && this.EMCFacilityForm.touched) { //update
      this.modalService.open(content1, { centered: true, backdrop: 'static' });
      this.modalReference.close();
    }
  }
  saveFacilityData(flag: any) {

    this.submitted = true;
    if (this.EMCFacilityForm.invalid) {
      return;
    }

    this.emcFacilityData.userName = this.router.snapshot.paramMap.get('email') || '{}';
    this.emcFacilityData.emcId = this.emcId;

    this.floorCoveringArr = this.EMCFacilityForm.get('floorCoveringArr') as FormArray;
    this.emcFacilityData.floorCovering = this.EMCFacilityForm.value.floorCoveringArr;
    if (flag) {
      if (this.EMCFacilityForm.dirty) {
        this.emcFacilityDataService
          .upDateFacilityData(this.emcFacilityData)
          .subscribe(
            (data: any) => {
              this.finalSpinner = false;
              this.popup = true;
              this.success = true;
              this.successMsg = data;
              this.service.isCompleted2= true;
              this.service.isLinear=false;
              this.retriveFacilityDetails();
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
      this.emcFacilityDataService.addFacilityData(this.emcFacilityData).subscribe(

        data => {
          // let emcFacilityDataItr = JSON.parse(data);
          // this.emcFacilityData.emcId = emcFacilityDataItr.emcId;
          this.finalSpinner = false;
          this.popup = true;
          this.success = true;
          this.successMsg = data;
          this.service.isCompleted2= true;
          this.service.isLinear=false;
          //this.disable = true;
          this.retriveFacilityDetails();
          this.proceedNext.emit(true);
        },
        error => {
          this.finalSpinner = false;
          this.popup = true;
          this.Error = true;
          this.errorArr = [];
          this.errorArr = JSON.parse(error.error);
          this.errorMsg = this.errorArr.message;
          this.service.isCompleted2= false;
          this.service.isLinear=true;
          this.proceedNext.emit(false);
        }
      )
    }
    (this.emcFacilityData);
  }

  retriveFacilityDetails() {
    this.emcFacilityDataService.retrieveFacilityData(this.emcFacilityData.userName, this.emcFacilityData.emcId).subscribe(
      data => {
        this.retriveFacilityData(this.emcFacilityData.userName, this.emcFacilityData.emcId, data);
      },
      error => {
      }
    );
  }
}

