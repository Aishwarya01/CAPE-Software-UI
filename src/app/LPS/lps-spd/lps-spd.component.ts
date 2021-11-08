import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Spd } from 'src/app/LPS_model/spd';
import { LpsSpd_Service } from 'src/app/LPS_services/lps-spd.service';

@Component({
  selector: 'app-lps-spd',
  templateUrl: './lps-spd.component.html',
  styleUrls: ['./lps-spd.component.css']
})
export class LpsSpdComponent implements OnInit {
  spd=new Spd();
  lpsSpd_Service;
  j: any;
  constructor(private formBuilder: FormBuilder, lpsSpd_Services: LpsSpd_Service) {
    this.lpsSpd_Service = lpsSpd_Services;
  }

  spdForm: FormGroup;

  ngOnInit(): void {
    this.spdForm = this.formBuilder.group({
      //spdId!: number;
      //basicLpsId!: number;
      //userName!: String;
      mainsIncomingOb:new FormControl('', Validators.required),
      mainsIncomingRem: new FormControl(''),
      totalMainsIncomingOb:new FormControl('', Validators.required),
      totalMainsIncomingRem: new FormControl(''),
      noPannelSupplittingOb:new FormControl('', Validators.required),
      noPannelSupplittingRem: new FormControl(''),
      totalNoOutDoorRequipmentOb:new FormControl('', Validators.required),
      totalNoOutDoorRequipmentRem: new FormControl(''),

      spdarr: this.formBuilder.array([this.spdarrfun()]),
      panelarr: this.formBuilder.array([this.panelarrfun()]),
      powerarr: this.formBuilder.array([this.powerarrfun()]),

    });
  }
  private spdarrfun(): FormGroup{
    return new FormGroup({
      spdDescriptionRole:new FormControl('Mains_SPD'),
      spdTypeOb:new FormControl('', Validators.required),
      spdTypeRe: new FormControl(''),
      spdApplicationOb:new FormControl('', Validators.required),
      spdApplicationRem: new FormControl(''),
      panelNameOb:new FormControl('', Validators.required),
      panelNameRem: new FormControl(''),
      incomingRatingOb:new FormControl('', Validators.required),
      incomingRatingRem: new FormControl(''),
      backupFuseCheckOb:new FormControl('', Validators.required),
      backupFuseCheckRem: new FormControl(''),
      connectingWireLengthOb:new FormControl('', Validators.required),
      connectingWireLengthRem: new FormControl(''),
      connectingWireSizeOb:new FormControl('', Validators.required),
      connectingWireSizeRem: new FormControl('')

    });
  }

  private panelarrfun(): FormGroup{
    return new FormGroup({
      spdDescriptionRole:new FormControl('Street_SPD'),
      spdTypeOb:new FormControl('', Validators.required),
      spdTypeRe: new FormControl(''),
      spdApplicationOb:new FormControl('', Validators.required),
      spdApplicationRem: new FormControl(''),
      panelNameOb:new FormControl('', Validators.required),
      panelNameRem: new FormControl(''),
      incomingRatingOb:new FormControl('', Validators.required),
      incomingRatingRem: new FormControl(''),
      backupFuseCheckOb:new FormControl('', Validators.required),
      backupFuseCheckRem: new FormControl(''),
      connectingWireLengthOb:new FormControl('', Validators.required),
      connectingWireLengthRem: new FormControl(''),
      connectingWireSizeOb:new FormControl('', Validators.required),
      connectingWireSizeRem: new FormControl('')

    });
  }

  private powerarrfun(): FormGroup{
    return new FormGroup({
      spdDescriptionRole:new FormControl('Other_SPD'),
      spdTypeOb:new FormControl('', Validators.required),
      spdTypeRe: new FormControl(''),
      spdApplicationOb:new FormControl('', Validators.required),
      spdApplicationRem: new FormControl(''),
      panelNameOb:new FormControl('', Validators.required),
      panelNameRem: new FormControl(''),
      incomingRatingOb:new FormControl('', Validators.required),
      incomingRatingRem: new FormControl(''),
      backupFuseCheckOb:new FormControl('', Validators.required),
      backupFuseCheckRem: new FormControl(''),
      connectingWireLengthOb:new FormControl('', Validators.required),
      connectingWireLengthRem: new FormControl(''),
      connectingWireSizeOb:new FormControl('', Validators.required),
      connectingWireSizeRem: new FormControl('')

    });
  }

  spdarrControls(): AbstractControl[] {
 
    return (<FormArray>this.spdForm.get('spdarr')).controls;
  }

  panelarrControls(): AbstractControl[] {
    return (<FormArray>this.spdForm.get('panelarr')).controls;
  }

  powerarrControls(): AbstractControl[] {
    return (<FormArray>this.spdForm.get('powerarr')).controls;
  }

  onSubmit(){
          
        this.spd.mainsIncomingOb = this.spdForm.value.mainsIncomingOb;
        this.spd.mainsIncomingRem = this.spdForm.value.mainsIncomingRem;
        this.spd.totalMainsIncomingOb = this.spdForm.value.totalMainsIncomingOb;
        this.spd.totalMainsIncomingRem = this.spdForm.value.totalMainsIncomingRem;
        this.spd.noPannelSupplittingOb = this.spdForm.value.noPannelSupplittingOb;
        this.spd.noPannelSupplittingRem = this.spdForm.value.noPannelSupplittingRem;
        this.spd.totalNoOutDoorRequipmentOb = this.spdForm.value.totalNoOutDoorRequipmentOb;
        this.spd.totalNoOutDoorRequipmentRem = this.spdForm.value.totalNoOutDoorRequipmentRem;
        this.spd.spdDescription = this.spdForm.getRawValue().spdarr;
        this.spd.spdDescription=this.spd.spdDescription.concat(this.spdForm.getRawValue().panelarr);
        this.spd.spdDescription=this.spd.spdDescription.concat(this.spdForm.getRawValue().powerarr);
        this.lpsSpd_Service.saveSPDDetails(this.spd).subscribe(

          data => {
             
          
          },
          error => {
          }
        )
      };
    
}