import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EarthingLpsDescription } from 'src/app/LPS_model/earthing';
import { LpsEarthing } from 'src/app/LPS_services/lps-earthing';

@Component({
  selector: 'app-lps-earthing',
  templateUrl: './lps-earthing.component.html',
  styleUrls: ['./lps-earthing.component.css']
})
export class LpsEarthingComponent implements OnInit {

  earthingForm: FormGroup;
  earthingLpsDescription = new EarthingLpsDescription;
  submitted=false;
  lpsEarthingService;
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
  @Output() proceedNext = new EventEmitter<any>();
  
  constructor(
    private formBuilder: FormBuilder, private lpsEarthings: LpsEarthing,private modalService: NgbModal, private router: ActivatedRoute
  ) {
    this.lpsEarthingService = lpsEarthings;
  }

  ngOnInit(): void {
    this.earthingForm = this.formBuilder.group({

      // earthingId!: number;
      //userName!:  new FormControl('', Validators.required),
      //basicLpsId!:  new FormControl('', Validators.required),
      earthingTypeInOb: new FormControl('', Validators.required),
      earthingTypeInRem: new FormControl(''),
      bimetallicIssueInOb: new FormControl('', Validators.required),
      bimetallicIssueInRem: new FormControl(''),
      brazingConnectInOb: new FormControl('', Validators.required),
      brazingConnectInRem: new FormControl(''),
      locationNumber: new FormControl('', Validators.required),
      locationName: new FormControl('', Validators.required),

      descriptionArr: this.formBuilder.array([this.earthingDescription()]),
      ClampsArr: this.formBuilder.array([this.earthingClamps()]),
      chamberArr: this.formBuilder.array([this.earthElectrodeChamber()]),
      earthingArr: this.formBuilder.array([this.earthingSystem()])
    });
  }

  earthingDescriptionarr(): AbstractControl[] {
    return (<FormArray>this.earthingForm.get('descriptionArr')).controls;
  }

  earthingClampsarr(): AbstractControl[] {
    return (<FormArray>this.earthingForm.get('ClampsArr')).controls;
  }

  earthElectrodeChambearr(): AbstractControl[] {
    return (<FormArray>this.earthingForm.get('chamberArr')).controls;
  }

  earthingSystemarr(): AbstractControl[] {
    return (<FormArray>this.earthingForm.get('earthingArr')).controls;
  }


  earthingSystem(): FormGroup {
    return new FormGroup({
      buriedElectrodeOb: new FormControl('', Validators.required),
      buriedElectrodeRem: new FormControl(''),
      depthOfElectrodeOb: new FormControl('', Validators.required),
      depthOfElectrodeRem: new FormControl(''),
      earthOb: new FormControl('', Validators.required),
      earthRem: new FormControl(''),
      westOb: new FormControl('', Validators.required),
      westRem: new FormControl(''),
      northOb: new FormControl('', Validators.required),
      northRem: new FormControl(''),
      southOb: new FormControl('', Validators.required),
      southRem: new FormControl(''),
      ringEarthWallDistanceOb: new FormControl('', Validators.required),
      ringEarthWallDistanceRem: new FormControl(''),
      ringWallEarthEastOb: new FormControl('', Validators.required),
      ringWallEarthEastRem: new FormControl(''),
      ringWallEarthWestOb: new FormControl('', Validators.required),
      ringWallEarthWestRem: new FormControl(''),
      ringWallEarthNorthOb: new FormControl('', Validators.required),
      ringWallEarthNorthRem: new FormControl(''),
      ringWallEarthSouthOb: new FormControl('', Validators.required),
      ringWallEarthSouthRem: new FormControl(''),
      jointsMadeBrazingOb: new FormControl('', Validators.required),
      jointsMadeBrazingRem: new FormControl(''),
      materialOfEartElectrodeOb: new FormControl('', Validators.required),
      materialOfEartElectrodeRem: new FormControl(''),
      sizeOfEarthElectrodeOb: new FormControl('', Validators.required),
      sizeOfEarthElectrodeRem: new FormControl(''),
      maximumDistanceEartElectrodeWalOb: new FormControl('', Validators.required),
      maximumDistanceEartElectrodeWalRem: new FormControl(''),
      manimumDistanceEartElectrodeWalOb: new FormControl('', Validators.required),
      manimumDistanceEartElectrodeWalRem: new FormControl(''),

    })
  }
  earthElectrodeChamber(): FormGroup {
    return new FormGroup({
      physicalInspeOb: new FormControl('', Validators.required),
      physicalInspeRem: new FormControl(''),
      chamberTypeOb: new FormControl('', Validators.required),
      chamberTypeRem: new FormControl(''),
      chamberSizeOb: new FormControl('', Validators.required),
      chamberSizeRem: new FormControl(''),
      maximumWithStandLoadOb: new FormControl('', Validators.required),
      maximumWithStandLoadRem: new FormControl(''),
      maximumPlacedSoilOb: new FormControl('', Validators.required),
      maximumPlacedSoilRem: new FormControl(''),
      totalChamberNoOb: new FormControl('', Validators.required),
      totalChamberNoRem: new FormControl(''),
      inspectedChamberInOb: new FormControl('', Validators.required),
      inspectedChamberInRem: new FormControl(''),
      inspectionPassedInOb: new FormControl('', Validators.required),
      inspectionPassedInRem: new FormControl(''),
      inspectionFailedInOb: new FormControl('', Validators.required),
      inspectionFailedInRem: new FormControl('')

    })
  }
  earthingClamps(): FormGroup {
    return new FormGroup({
      physicalInspectionInOb: new FormControl('', Validators.required),
      psysicalInspectionInRem: new FormControl(''),
      clampsFirmlyOb: new FormControl('', Validators.required),
      clampsFirmlyRem: new FormControl(''),
      interConnectOfEarthClampInOb: new FormControl('', Validators.required),
      interConnectOfEarthClampInRem: new FormControl(''),
      typeOfClampsInOb: new FormControl('', Validators.required),
      typeOfClampsInRem: new FormControl(''),
      materialOfClampsInOb: new FormControl('', Validators.required),
      materialOfClampsInRem: new FormControl(''),
      totalNoClampsInOb: new FormControl('', Validators.required),
      totalNoClampsInRem: new FormControl(''),
      inspectedClampsInOb: new FormControl('', Validators.required),
      inspectedClampsInRem: new FormControl(''),
      inspectionPassedInOb: new FormControl('', Validators.required),
      inspectionPassedInRem: new FormControl(''),
      inspectionFailedInOb: new FormControl('', Validators.required),
      inspectionFailedInRem: new FormControl('')
    })
  }
  earthingDescription(): FormGroup {
    return new FormGroup({

      soilResistivityInOb: new FormControl('', Validators.required),
      soilResistivityInRem: new FormControl(''),
      earthPitDigOb: new FormControl('', Validators.required),
      earthPitDigRem: new FormControl(''),
      earthElectrodeLesthanDownConductorInOb: new FormControl('', Validators.required),
      earthElectrodeLesthanDownConductorInRem: new FormControl(''),
      connectedEarthTerminalInOb: new FormControl('', Validators.required),
      connectedEarthTerminalInRem: new FormControl(''),
      testJointEarthElectrodeInOb: new FormControl('', Validators.required),
      testJointEarthElectrodeInRem: new FormControl(''),
      grountLevelComponentFilledInOb: new FormControl('', Validators.required),
      grountLevelComponentFilledInRem: new FormControl(''),
      earthElectrodeLocationInOb: new FormControl('', Validators.required),
      earthElectrodeLocationInRem: new FormControl(''),
      earthElectrodeMaterialInOb: new FormControl('', Validators.required),
      earthElectrodeMaterialInRem: new FormControl(''),
      earthElectrodeSizeInOb: new FormControl('', Validators.required),
      earthElectrodeSizeInRem: new FormControl(''),
      earthElectrodeLengthingOb: new FormControl('', Validators.required),
      earthElectrodeLengthingRem: new FormControl(''),
      earthelectMaxiDistWallInOb: new FormControl('', Validators.required),
      earthelectMaxiDistWallInRem: new FormControl(''),
      earthelectManimumDistanceWallInOb: new FormControl('', Validators.required),
      earthelectManimumDistanceWallInRem: new FormControl(''),
      earthelectMaxiDistOb: new FormControl('', Validators.required),
      earthelectMaxiDistRem: new FormControl(''),
      earthelectManiDistOb: new FormControl('', Validators.required),
      earthelectManiDistRem: new FormControl(''),
      totalNumberOfElectrodeOb: new FormControl('', Validators.required),
      totalNumberOfElectrodeRem: new FormControl(''),
      inspectedNoOb: new FormControl('', Validators.required),
      inspectedNoRem: new FormControl(''),
      inspectedPassedNoOb: new FormControl('', Validators.required),
      inspectedPassedNoRem: new FormControl(''),
      inspectedFailedNoOb: new FormControl('', Validators.required),
      inspectedFailedNoRem: new FormControl(''),


    })
  }
  onSubmit() {
    this.submitted=true;
    if(this.earthingForm.invalid){return}
    this.earthingLpsDescription.userName = this.router.snapshot.paramMap.get('email') || '{}';;
    this.earthingLpsDescription.basicLpsId = this.basicLpsId;

    this.earthingLpsDescription.earthingClamps = this.earthingForm.value.ClampsArr;
    this.earthingLpsDescription.earthingDescription = this.earthingForm.value.descriptionArr;
    this.earthingLpsDescription.earthElectrodeChamber = this.earthingForm.value.chamberArr;
    this.earthingLpsDescription.earthingSystem = this.earthingForm.value.earthingArr;

    this.lpsEarthingService.saveEarthingDetails(this.earthingLpsDescription).subscribe(


      (data) => {
        this.success = true;
        this.successMsg = data;
        this.disable = true;
        this.proceedNext.emit(true);
      },
      (error) => {
        this.Error = true;
        this.errorArr = [];
        this.errorArr = JSON.parse(error.error);
        this.errorMsg = this.errorArr.message;
        this.proceedNext.emit(false);
      });
   
  }

  get f() {
    return this.earthingForm.controls;
  }
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
       if (this.earthingForm.invalid) {
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
