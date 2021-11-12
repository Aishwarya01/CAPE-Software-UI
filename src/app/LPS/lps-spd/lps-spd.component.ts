import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  submitted=false;
  disable: boolean=false;
  basicLpsId: number = 0;
  ClientName: String='';
  projectName: String='';
  industryType: String='';
  buildingType: String='';
  buildingLength: String='';
  buildingWidth: String='';
  buildingHeight: String='';
  levelOfProtection: String='';
  soilResistivity: String='';

  success: boolean=false;
  successMsg: string="";
  Error: boolean=false;
  errorArr: any=[];
  errorMsg: string="";
  validationError: boolean = false;
  validationErrorMsg: String = '';

  constructor(private formBuilder: FormBuilder, lpsSpd_Services: LpsSpd_Service
    ,private modalService: NgbModal, private router: ActivatedRoute) {
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

  get f() {
    return this.spdForm.controls;
  }

  onSubmit(){
        
        this.submitted=true;
      
        this.spd.userName = this.router.snapshot.paramMap.get('email') || '{}';;
        this.spd.basicLpsId = this.basicLpsId;

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
      closeModalDialog() {
        if (this.errorMsg != '') {
          this.Error = false;
          this.modalService.dismissAll((this.errorMsg = ''));
        } else {
          this.success = false;
          this.modalService.dismissAll((this.successMsg = ''));
        }
      }
    
      gotoNextModal(content: any) {
         if (this.spdForm.invalid) {
           this.validationError = true;
          
           this.validationErrorMsg = 'Please check all the fields';
           setTimeout(() => {
            this.validationError = false;
           }, 3000);
           return;
         }
        this.modalService.open(content, { centered: true });
      }
    
}