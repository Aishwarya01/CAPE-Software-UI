import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmcFacilityData } from 'src/app/EMC_Model/emc-facility-data';
import { EmcFacilityDataService } from 'src/app/EMC_Services/emc-facility-data.service';

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

  emcFacilityData = new EmcFacilityData();

  floorCoveringArr!: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    private emcFacilityDataService: EmcFacilityDataService) { }

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

  getfloorCoveringarrControl(): AbstractControl[] {
    return (<FormArray>this.EMCFacilityForm.get('floorCoveringArr')).controls
  }

  saveFacilityData(){
  console.log(this.EMCFacilityForm);

  this.emcFacilityData.userName='Hasan';
  this.emcFacilityData.emcId=10;
  
    this.floorCoveringArr = this.EMCFacilityForm.get('floorCoveringArr') as FormArray;
    this.emcFacilityData.floorCovering = this.EMCFacilityForm.value.floorCoveringArr;

    this.emcFacilityDataService
    .addFacilityData(this.emcFacilityData)
    .subscribe(
      (data: any) => {
      
      },
      (error: any) => {
        
      });
console.log('hiiiiiiiiiiiiiiiiiiii');
  }
  



 




}

