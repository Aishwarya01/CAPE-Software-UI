import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-emc-facility-data',
  templateUrl: './emc-facility-data.component.html',
  styleUrls: ['./emc-facility-data.component.css']
})
export class EmcFacilityDataComponent implements OnInit {

  buildingType: String[]= ['Industrial','Rural','Residential','Commercial','Small Town','Urban','Others'];
  buildingConstruction: String[]= ['Wood','Brick','Brick with RCC Columns And Slabs ','Steel (PEB)'];
  dedicatedRoomForSafety: String[]= ['Non Dedicated Room','Others'];
  floorMaterisl: String[]= ['Sealed','Coated','Covered'];
  utilisation: String[]= ['Supply Plenum','Exhause Plenum','Dead Space'];
  external: String[]= ['Single Pane', 'Double Pane', 'Tripple Pane', 'Reflective Anodised'];
  windowCovering: String[]= ['Drapes', 'Curtains', 'Shades', 'Blinds'];

  EMCFacilityForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.EMCFacilityForm = this.formBuilder.group({});
  }

  


}
