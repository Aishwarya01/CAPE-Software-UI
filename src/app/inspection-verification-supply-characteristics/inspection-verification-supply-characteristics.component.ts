import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Supplycharacteristics } from '../model/supplycharacteristics';
import { SupplyCharacteristicsService } from '../services/supply-characteristics.service';


@Component({
  selector: 'app-inspection-verification-supply-characteristics',
  templateUrl: './inspection-verification-supply-characteristics.component.html',
  styleUrls: ['./inspection-verification-supply-characteristics.component.css']
})
export class InspectionVerificationSupplyCharacteristicsComponent implements OnInit {

  selectedValue:string="";
  supplycharesteristic = new Supplycharacteristics;


  panelOpenState = false;
  systemEarthingList: String[]= ['TN-C','TN-C-S','TN-S','IT','TT'];
  liveConductorACList:String[]=['1-phase, 2-wire (LN)','1-phase, 3-wire (LLM)','2-phase, 3-wire (LLN)','3-phase, 3-wire (LLL)','3-phase, 4-wire (LLLN)'];
  liveConductorDCList:String[]=['2-pole','3-pole','Others'];
  ProtectiveDevicelist:string[]=['Fuse','MCB','MCCB','ACB'];
  AlternatesupplyList:string[]=['yes','No'];
  MeansofEarthingList:string[]=['Suppliers facility',' Installation earth electrode'];
  electrodeTypeList:string[]=['Vertical','Horizontal','Combined vertical + horizontal'];
  electrodeMaterialList:string[]=['Copper','Coppebondedr  steel','Galvanised steel','Combination','Others'];
  conductorVerifyList:string[]=['yes','No'];
  bondingConductorVerifyList:string[]=['yes','No'];
  earthingConductorVerifyList:string[]=['yes','No'];

  supplycharesteristicForm = new FormGroup({
    systemEarthing: new FormControl(''),
    liveConductor: new FormControl(''),
    AcConductor: new FormControl(''),
    DcConductor: new FormControl(''),
    briefNote: new FormControl(''),
  })

  constructor(private supplyCharacteristicsService: SupplyCharacteristicsService,

  ) { }

  ngOnInit(): void {
  }

}
