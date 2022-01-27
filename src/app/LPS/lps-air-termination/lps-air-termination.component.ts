import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalsService } from 'src/app/globals.service';
import { Airtermination } from 'src/app/LPS_model/airtermination';
import { AirterminationService } from 'src/app/LPS_services/airtermination.service';
import { LpsBasicPageComponent } from '../lps-basic-page/lps-basic-page.component';
import { LpsMatstepperComponent } from '../lps-matstepper/lps-matstepper.component';

@Component({
  selector: 'app-lps-air-termination',
  templateUrl: './lps-air-termination.component.html',
  styleUrls: ['./lps-air-termination.component.css']
})
export class LpsAirTerminationComponent implements OnInit {

  airtermination=new Airtermination;
  
  airTerminationForm!: FormGroup;
  vatArr!: FormArray;
  meshArr!: FormArray;
  holderArr!: FormArray;
  clampArr!: FormArray;
  expArr!: FormArray;
  conArr!: FormArray;
  airTerminationBasicArr!: FormArray;
  submitted=false;
  validationError: boolean = false;
  validationErrorMsg: String = '';
  successMsg: string="";
  errorMsg: string="";
  success: boolean=false;
  Error: boolean=false;
  errorArr: any=[];
  disable: boolean = false;
  i: any;
  j: any;
  success1 = false;
  // successMsg1: String="";

  @Output() proceedNext = new EventEmitter<any>();
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
  
  airterminationService;
  step2List: any = [];
  arr1: any = [];
  arr2: any = [];
  arr3: any = [];
  arr4: any = [];
  arr5: any = [];
  arr6: any = [];
  flag: boolean = false;

  vatPusharr: any = [];
  meshPusharr: any = [];
  holderPusharr: any = [];
  clampPusharr: any = [];
  exPusharr: any = [];
  conPusharr: any = [];
  isEditable:boolean=false;
  stepBack:any;
  lpsBasic: any;
   
  constructor(
    private formBuilder: FormBuilder,
    private airterminationServices:AirterminationService,
    private modalService: NgbModal,private router: ActivatedRoute,
    private matstepper: LpsMatstepperComponent,
    public service: GlobalsService,

  ) { 
    this.airterminationService=airterminationServices;
  }

  ngOnInit(): void {
    this.airTerminationForm = this.formBuilder.group({
      lpsAirDescription: this.formBuilder.array([this.allLPSAirterminationArr()])
    });
  }

  allLPSAirterminationArr():FormGroup {
    return new FormGroup({

      buildingnumber: new FormControl('', Validators.required),
      buildingname: new FormControl('', Validators.required),
      buildingType: new FormControl('', Validators.required),
      buildingLength: new FormControl('', Validators.required),
      buildingHeight: new FormControl('', Validators.required),
      buildingWidth: new FormControl('', Validators.required),
      levelOfProtection: new FormControl('', Validators.required),

      vatArr: this.formBuilder.array([this.createVatArrForm()]),
      meshArr: this.formBuilder.array([this.createMeshArrForm()]),
      holderArr: this.formBuilder.array([this.createHolderArrForm()]),
      clampArr: this.formBuilder.array([this.createClampArrForm()]),
      expArr: this.formBuilder.array([this.createExpansioArrForm()]),
      conArr: this.formBuilder.array([this.createConArrForm()]),
      airTerminationBasicArr: this.formBuilder.array([this.createLpsDescriptionarr()]),
    })
  }
  

  // Only Accept numbers
  keyPressNumbers(event:any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  reset(){
    this.airTerminationForm.reset();
  }

  retrieveDetailsfromSavedReports(userName: any,basicLpsId: any,clientName: any,data: any){
      // this.service.lvClick=1;

      this.step2List = data.lpsAirDiscription;
      this.airtermination.basicLpsId = basicLpsId;
      this.airtermination.lpsAirDescId = this.step2List.lpsAirDescId;
      // this.airtermination.connectionMadeBraOb = this.step2List.connectionMadeBraOb;
      // this.airtermination.connectionMadeBraRe = this.step2List.connectionMadeBraRe;
      // this.airtermination.electricalEquipPlacedOb = this.step2List.electricalEquipPlacedOb;
      // this.airtermination.electricalEquipPlacedRe = this.step2List.electricalEquipPlacedRe;
      // this.airtermination.combustablePartOb = this.step2List.combustablePartOb;
      // this.airtermination.combustablePartRe = this.step2List.combustablePartRe;
      // this.airtermination.terminationMeshConductorOb = this.step2List.terminationMeshConductorOb;
      // this.airtermination.terminationMeshConductorRe = this.step2List.terminationMeshConductorRe;
      // this.airtermination.bondingEquipotentialOb = this.step2List.bondingEquipotentialOb;
      // this.airtermination.bondingEquipotentialRe = this.step2List.bondingEquipotentialRe;
      
      this.airtermination.createdBy = this.step2List.createdBy;
      this.airtermination.createdDate = this.step2List.createdDate;     
      this.airtermination.userName = this.step2List.userName;
 
      this.populateData();
      this.flag=true;
    }

    retrieveDetailsfromSavedReports1(userName: any,basicLpsId: any,clientName: any,data: any){
      //this.service.lvClick=1;

        this.step2List=JSON.parse(data);
        this.airtermination.basicLpsId = basicLpsId;
        this.airtermination.lpsAirDescId = this.step2List[0].lpsAirDescId;
        // this.airtermination.connectionMadeBraOb = this.step2List[0].connectionMadeBraOb;
        // this.airtermination.connectionMadeBraRe = this.step2List[0].connectionMadeBraRe;
        // this.airtermination.electricalEquipPlacedOb = this.step2List[0].electricalEquipPlacedOb;
        // this.airtermination.electricalEquipPlacedRe = this.step2List[0].electricalEquipPlacedRe;
        // this.airtermination.combustablePartOb = this.step2List[0].combustablePartOb;
        // this.airtermination.combustablePartRe = this.step2List[0].combustablePartRe;
        // this.airtermination.terminationMeshConductorOb = this.step2List[0].terminationMeshConductorOb;
        // this.airtermination.terminationMeshConductorRe = this.step2List[0].terminationMeshConductorRe;
        // this.airtermination.bondingEquipotentialOb = this.step2List[0].bondingEquipotentialOb;
        // this.airtermination.bondingEquipotentialRe = this.step2List[0].bondingEquipotentialRe;
        this.airtermination.createdBy = this.step2List[0].createdBy;
        this.airtermination.createdDate = this.step2List[0].createdDate;     
        this.airtermination.userName = this.step2List[0].userName;
        this.populateData1();
        this.flag=true;
      }

      
    populateData() {
      for (let item of this.step2List.lpsVerticalAirTermination) {
        if(item.flag) {this.arr1.push(this.createGroup(item));}    
        
      }
      for (let item of this.step2List.airMeshDescription) {     
        if(item.flag) {this.arr2.push(this.createGroup1(item));}
      }
      for (let item of this.step2List.airHolderDescription) {     
        if(item.flag) {this.arr3.push(this.createGroup2(item));}
      }
      for (let item of this.step2List.airClamps) { 
        if(item.flag) {this.arr4.push(this.createGroup3(item));}
      }
      for (let item of this.step2List.airExpansion) { 
        if(item.flag) {this.arr5.push(this.createGroup4(item));}
      }
      for (let item of this.step2List.airConnectors) {     
        if(item.flag) {this.arr6.push(this.createGroup5(item));}
      }
      this.airTerminationForm.setControl('vatArr', this.formBuilder.array(this.arr1 || []))
      this.airTerminationForm.setControl('meshArr', this.formBuilder.array(this.arr2 || []))
      this.airTerminationForm.setControl('holderArr', this.formBuilder.array(this.arr3 || []))
      this.airTerminationForm.setControl('clampArr', this.formBuilder.array(this.arr4 || []))
      this.airTerminationForm.setControl('expArr', this.formBuilder.array(this.arr5 || []))
      this.airTerminationForm.setControl('conArr', this.formBuilder.array(this.arr6 || []))

      this.arr1 = [];
      this.arr2 = [];
      this.arr3 = [];
      this.arr4 = [];
      this.arr5 = [];
      this.arr6 = [];
    }

    populateData1() {
      for (let item of this.step2List[0].lpsVerticalAirTermination) {
        if(item.flag) {this.arr1.push(this.createGroup(item));}    
      }
      for (let item of this.step2List[0].airMeshDescription) {     
        if(item.flag) {this.arr2.push(this.createGroup1(item));}
      }
      for (let item of this.step2List[0].airHolderDescription) {     
        if(item.flag) {this.arr3.push(this.createGroup2(item));}
      }
      for (let item of this.step2List[0].airClamps) { 
        if(item.flag) {this.arr4.push(this.createGroup3(item));}
      }
      for (let item of this.step2List[0].airExpansion) { 
        if(item.flag) {this.arr5.push(this.createGroup4(item));}
      }
      for (let item of this.step2List[0].airConnectors) {     
        if(item.flag) {this.arr6.push(this.createGroup5(item));}
      }
      this.airTerminationForm.setControl('vatArr', this.formBuilder.array(this.arr1 || []))
      this.airTerminationForm.setControl('meshArr', this.formBuilder.array(this.arr2 || []))
      this.airTerminationForm.setControl('holderArr', this.formBuilder.array(this.arr3 || []))
      this.airTerminationForm.setControl('clampArr', this.formBuilder.array(this.arr4 || []))
      this.airTerminationForm.setControl('expArr', this.formBuilder.array(this.arr5 || []))
      this.airTerminationForm.setControl('conArr', this.formBuilder.array(this.arr6 || []))

      this.arr1 = [];
      this.arr2 = [];
      this.arr3 = [];
      this.arr4 = [];
      this.arr5 = [];
      this.arr6 = [];
      this.airTerminationForm.markAsPristine();
    }

    private createLpsDescriptionarr(): FormGroup{
    return new FormGroup({
       //new changes
      approvedDrawingObserv:  new FormControl('', Validators.required),
      approvedDrawingRemarks: new FormControl(''),
      architectNameObserv:  new FormControl('', Validators.required),
      architectNameRemarks: new FormControl(''),
      designDateObserv:  new FormControl('', Validators.required),
      designDateRemarks: new FormControl(''),
      approvedByObserv:  new FormControl('', Validators.required),
      approvedByRemarks: new FormControl(''),
      dateOfApprovalOb:  new FormControl('', Validators.required),
      dateOfApprovalRem: new FormControl(''),
      drawingObserv:  new FormControl('', Validators.required),
      drawingRemarks: new FormControl(''),
      revisionNoObserv:  new FormControl('', Validators.required),
      revisionNoRemarks: new FormControl(''),
      deviationObserv:  new FormControl('', Validators.required),
      deviationRemarks: new FormControl(''),
      installationQualityObserv:  new FormControl('', Validators.required),
      installationQualityRemarks: new FormControl(''),

      connectionMadeBraOb:  new FormControl('', Validators.required),
      connectionMadeBraRe: new FormControl(''),
      electricalEquipPlacedOb:  new FormControl('', Validators.required),
      electricalEquipPlacedRe: new FormControl(''),
      combustablePartOb:  new FormControl('', Validators.required),
      combustablePartRe: new FormControl(''),
      terminationMeshConductorOb:  new FormControl('', Validators.required),
      terminationMeshConductorRe: new FormControl(''),
      bondingEquipotentialOb:  new FormControl('', Validators.required),
      bondingEquipotentialRe: new FormControl(''),
      });
    }

    createGroup(item: any): FormGroup {
      return this.formBuilder.group({

      lpsVerticalAirTerminationId: new FormControl({disabled: false, value: item.lpsVerticalAirTerminationId}),
      // flag: new FormControl({disabled: false, value: item.flag}),
      // locationNumber: new FormControl({disabled: false, value: item.locationNumber}, Validators.required),
      // locationName: new FormControl({disabled: false, value: item.locationName}),
      physicalInspectionOb: new FormControl({disabled: false, value: item.physicalInspectionOb}, Validators.required),
      physicalInspectionRe: new FormControl({disabled: false, value: item.physicalInspectionRe}),
      installationTerminationsystemOb: new FormControl({disabled: false, value: item.installationTerminationsystemOb}, Validators.required),
      installationTerminationsystemRem: new FormControl({disabled: false, value: item.installationTerminationsystemRem}),
      sizeOfTerminalOb: new FormControl({disabled: false, value: item.sizeOfTerminalOb}, Validators.required),
      sizeOfTerminalRe: new FormControl({disabled: false, value: item.sizeOfTerminalRe}),
      heightOfTerminalOb: new FormControl({disabled: false, value: item.heightOfTerminalOb}, Validators.required),
      heightOfTerminalRe: new FormControl({disabled: false, value: item.heightOfTerminalRe}),
      angleProtectionHeightOb: new FormControl({disabled: false, value: item.angleProtectionHeightOb}, Validators.required),
      angleProtectionHeightRe: new FormControl({disabled: false, value: item.angleProtectionHeightRe}),
      materialOfTerminalOb: new FormControl({disabled: false, value: item.materialOfTerminalOb}, Validators.required),
      materialOfTerminalRe: new FormControl({disabled: false, value: item.materialOfTerminalRe}),
      supportFlatSurfaceOb: new FormControl({disabled: false, value: item.supportFlatSurfaceOb}, Validators.required),
      supportFlatSurfaceRe: new FormControl({disabled: false, value: item.supportFlatSurfaceRe}),
      heightFlatSurfaceOb: new FormControl({disabled: false, value: item.heightFlatSurfaceOb}, Validators.required),
      heightFlatSurfaceRe: new FormControl({disabled: false, value: item.heightFlatSurfaceRe}),
      vatToRoofConductorOB: new FormControl({disabled: false, value: item.vatToRoofConductorOB}, Validators.required),
      vatToRoofConductorRe: new FormControl({disabled: false, value: item.vatToRoofConductorRe}),
      totalNumberOb: new FormControl({disabled: false, value: item.totalNumberOb}, Validators.required),
      totalNumberRe: new FormControl({disabled: false, value: item.totalNumberRe}),
      inspNoOb: new FormControl({disabled: false, value: item.inspNoOb}, Validators.required),
      inspNoRe: new FormControl({disabled: false, value: item.inspNoRe}),
      inspPassedNoOb: new FormControl({disabled: false, value: item.inspPassedNoOb}, Validators.required),
      inspPassedNoRe: new FormControl({disabled: false, value: item.inspPassedNoRe}),
      inspFaileddNoOb: new FormControl({disabled: false, value: item.inspFaileddNoOb}, Validators.required),
      inspFaileddNoRe: new FormControl({disabled: false, value: item.inspFaileddNoRe})
      });
    }

    createGroup1(item: any): FormGroup {
      return this.formBuilder.group({

        meshDescriptionId: new FormControl({disabled: false, value: item.meshDescriptionId}),
        // flag: new FormControl({disabled: false, value: item.flag}),
        // locationNumber: new FormControl({disabled: false, value: item.locationNumber}, Validators.required),
        // locationName: new FormControl({disabled: false, value: item.locationName}),
        physicalInspectionOb: new FormControl({disabled: false, value: item.physicalInspectionOb}, Validators.required),
        physicalInspectionRe: new FormControl({disabled: false, value: item.physicalInspectionRe}),
        materailOfConductorOb: new FormControl({disabled: false, value: item.materailOfConductorOb}, Validators.required),
        materailOfConductorRem: new FormControl({disabled: false, value: item.materailOfConductorRem}),
        sizeOfConductorOb: new FormControl({disabled: false, value: item.sizeOfConductorOb}, Validators.required),
        sizeOfConductorRe: new FormControl({disabled: false, value: item.sizeOfConductorRe}),
        meshSizeOb: new FormControl({disabled: false, value: item.meshSizeOb}, Validators.required),
        meshSizeRe: new FormControl({disabled: false, value: item.meshSizeRe}),
        maximumDistanceOb: new FormControl({disabled: false, value: item.maximumDistanceOb}, Validators.required),
        maximumDistanceRe: new FormControl({disabled: false, value: item.maximumDistanceRe}),
        minimumDistanceOb: new FormControl({disabled: false, value: item.minimumDistanceOb}, Validators.required),
        minimumDistanceRe: new FormControl({disabled: false, value: item.minimumDistanceRe}),
        heightOfConductorFlatSurfaceOb: new FormControl({disabled: false, value: item.heightOfConductorFlatSurfaceOb}, Validators.required),
        heightOfConductorFlatSurfaceRe: new FormControl({disabled: false, value: item.heightOfConductorFlatSurfaceRe})
      });
    }

    createGroup2(item: any): FormGroup {
      return this.formBuilder.group({

        holderDescriptionId: new FormControl({disabled: false, value: item.holderDescriptionId}),
        // flag: new FormControl({disabled: false, value: item.flag}),
        // locationNumber: new FormControl({disabled: false, value: item.locationNumber}, Validators.required),
        // locationName: new FormControl({disabled: false, value: item.locationName}),
        physicalInspectionOb: new FormControl({disabled: false, value: item.physicalInspectionOb}, Validators.required),
        physicalInspectionRe: new FormControl({disabled: false, value: item.physicalInspectionRe}), 
        conductorHolderFlatSurfaceOb: new FormControl({disabled: false, value: item.conductorHolderFlatSurfaceOb}, Validators.required),
        conductorHolderFlatSurfaceRe: new FormControl({disabled: false, value: item.conductorHolderFlatSurfaceRe}), 
        conductorHolderOb: new FormControl({disabled: false, value: item.conductorHolderOb}, Validators.required),
        conductorHolderRe: new FormControl({disabled: false, value: item.conductorHolderRe}), 
        holderTypeOb: new FormControl({disabled: false, value: item.holderTypeOb}, Validators.required),
        holderTypeRe: new FormControl({disabled: false, value: item.holderTypeRe}), 
        materailOfHolderOb: new FormControl({disabled: false, value: item.materailOfHolderOb}, Validators.required),
        materailOfHolderRem: new FormControl({disabled: false, value: item.materailOfHolderRem}), 
        totalHolderNoOb: new FormControl({disabled: false, value: item.totalHolderNoOb}, Validators.required),
        totalHolderNoRe: new FormControl({disabled: false, value: item.totalHolderNoRe}), 
        holderInspNoOb: new FormControl({disabled: false, value: item.holderInspNoOb}, Validators.required),
        holderInspNoRe: new FormControl({disabled: false, value: item.holderInspNoRe}), 
        holderInspPassedNoOb: new FormControl({disabled: false, value: item.holderInspPassedNoOb}, Validators.required),
        holderInspPassedNoRe: new FormControl({disabled: false, value: item.holderInspPassedNoRe}), 
        holderInspFailedNoOb: new FormControl({disabled: false, value: item.holderInspFailedNoOb}, Validators.required),
        holderInspFailedNoRe: new FormControl({disabled: false, value: item.holderInspFailedNoRe}), 
        totalParpetHolderNoOb: new FormControl({disabled: false, value: item.totalParpetHolderNoOb}, Validators.required),
        totalParpetHolderNoRe: new FormControl({disabled: false, value: item.totalParpetHolderNoRe}), 
        materailOfParpetHolderOb: new FormControl({disabled: false, value: item.materailOfParpetHolderOb}, Validators.required),
        materailOfParpetHolderRem: new FormControl({disabled: false, value: item.materailOfParpetHolderRem}),      
        parpetInspectionNoOb: new FormControl({disabled: false, value: item.parpetInspectionNoOb}, Validators.required),
        parpetInspectionNoRe: new FormControl({disabled: false, value: item.parpetInspectionNoRe}), 
        parpetInspectionPassedNoOb: new FormControl({disabled: false, value: item.parpetInspectionPassedNoOb}, Validators.required),
        parpetInspectionPassedNoRe: new FormControl({disabled: false, value: item.parpetInspectionPassedNoRe}),        
        parpetInspectionFailedNoOb: new FormControl({disabled: false, value: item.parpetInspectionFailedNoOb}, Validators.required),
        parpetInspectionFailedNoRe: new FormControl({disabled: false, value: item.parpetInspectionFailedNoRe})
  
      });
    }


    createGroup3(item: any): FormGroup {
      return this.formBuilder.group({

        clampsId: new FormControl({disabled: false, value: item.clampsId}),
        // flag: new FormControl({disabled: false, value: item.flag}),
        // locationNumber: new FormControl({disabled: false, value: item.locationNumber}, Validators.required),
        // locationName: new FormControl({disabled: false, value: item.locationName}),
        physicalInspectionOb: new FormControl({disabled: false, value: item.physicalInspectionOb}, Validators.required),
        physicalInspectionRe: new FormControl({disabled: false, value: item.physicalInspectionRe}),
        conductorClampsFlatSurafaceOb: new FormControl({disabled: false, value: item.conductorClampsFlatSurafaceOb}, Validators.required),
        conductorClampsFlatSurafaceRe: new FormControl({disabled: false, value: item.conductorClampsFlatSurafaceRe}),
        interConnectionOfClampsOb: new FormControl({disabled: false, value: item.interConnectionOfClampsOb}, Validators.required),
        interConnectionOfClampsRe: new FormControl({disabled: false, value: item.interConnectionOfClampsRe}),
        clampTypeOb: new FormControl({disabled: false, value: item.clampTypeOb}, Validators.required),
        clampTypRe: new FormControl({disabled: false, value: item.clampTypRe}),
        materialOfClampsOb: new FormControl({disabled: false, value: item.materialOfClampsOb}, Validators.required),
        materialOfClampsRe: new FormControl({disabled: false, value: item.materialOfClampsRe}),
        totalClampsNoOb: new FormControl({disabled: false, value: item.totalClampsNoOb}, Validators.required),
        totalClampsNoRe: new FormControl({disabled: false, value: item.totalClampsNoRe}),
        inspectionNoOb: new FormControl({disabled: false, value: item.inspectionNoOb}, Validators.required),
        inspectionNoRe: new FormControl({disabled: false, value: item.inspectionNoRe}),
        inspectionPassedOb: new FormControl({disabled: false, value: item.inspectionPassedOb}, Validators.required),
        inspectionPassedRe: new FormControl({disabled: false, value: item.inspectionPassedRe}),
        inspectionFailedReOb: new FormControl({disabled: false, value: item.inspectionFailedReOb}, Validators.required),
        inspectionFailedReRe: new FormControl({disabled: false, value: item.inspectionFailedReRe})
        //clampobs9: new FormControl({disabled: false, value: item.clampobs9}, Validators.required),
       // clamprem9: new FormControl({disabled: false, value: item.clamprem9})
      });
    }


    createGroup4(item: any): FormGroup {
      return this.formBuilder.group({

        expansionId: new FormControl({disabled: false, value: item.expansionId}),
        // flag: new FormControl({disabled: false, value: item.flag}),
        // locationNumber: new FormControl({disabled: false, value: item.locationNumber}, Validators.required),
        // locationName: new FormControl({disabled: false, value: item.locationName}),
        physicalInspectionOb: new FormControl({disabled: false, value: item.physicalInspectionOb}, Validators.required),
        physicalInspectionRe: new FormControl({disabled: false, value: item.physicalInspectionRe}),
        strightConnectorPiecOb: new FormControl({disabled: false, value: item.strightConnectorPiecOb}, Validators.required),
        strightConnectorPiecRe: new FormControl({disabled: false, value: item.strightConnectorPiecRe}),
        materialOfExpansionOb: new FormControl({disabled: false, value: item.materialOfExpansionOb}, Validators.required),
        materialOfExpansionRe: new FormControl({disabled: false, value: item.materialOfExpansionRe}),
        totalNoExpansionOb: new FormControl({disabled: false, value: item.totalNoExpansionOb}, Validators.required),
        totalNoExpansionRe: new FormControl({disabled: false, value: item.totalNoExpansionRe}),
        inspectionNoOb: new FormControl({disabled: false, value: item.inspectionNoOb}, Validators.required),
        inspectionNoRe: new FormControl({disabled: false, value: item.inspectionNoRe}),
        inspectionPassedNoOb: new FormControl({disabled: false, value: item.inspectionPassedNoOb}, Validators.required),
        inspectionPassedNoRe: new FormControl({disabled: false, value: item.inspectionPassedNoRe}),
        inspectionFailedNoOb: new FormControl({disabled: false, value: item.inspectionFailedNoOb}, Validators.required),
        inspectionFailedNoRe: new FormControl({disabled: false, value: item.inspectionFailedNoRe})
      });
    }


    createGroup5(item: any): FormGroup {
      return this.formBuilder.group({
        connectorId: new FormControl({disabled: false, value: item.connectorId}),
        flag: new FormControl({disabled: false, value: item.flag}),
        // locationNumber: new FormControl({disabled: false, value: item.locationNumber}, Validators.required),
        // locationName: new FormControl({disabled: false, value: item.locationName}),
        physicalInspectionOb: new FormControl({disabled: false, value: item.physicalInspectionOb}, Validators.required),
        physicalInspectionRe: new FormControl({disabled: false, value: item.physicalInspectionRe}),
        checkConnectionConnectorsOb: new FormControl({disabled: false, value: item.checkConnectionConnectorsOb}, Validators.required),
        checkConnectionConnectorsRe: new FormControl({disabled: false, value: item.checkConnectionConnectorsRe}),
        materialOfConnectorOb: new FormControl({disabled: false, value: item.materialOfConnectorOb}, Validators.required),
        materialOfConnectorRe: new FormControl({disabled: false, value: item.materialOfConnectorRe}),
        strightConnectorOb: new FormControl({disabled: false, value: item.strightConnectorOb}, Validators.required),
        strightConnectorRe: new FormControl({disabled: false, value: item.strightConnectorRe}),
        tConnectorOb: new FormControl({disabled: false, value: item.tConnectorOb}, Validators.required),
        tConnectorRe: new FormControl({disabled: false, value: item.tConnectorRe}),
        lConnectorOb: new FormControl({disabled: false, value: item.lConnectorOb}, Validators.required),
        lConnectorRe: new FormControl({disabled: false, value: item.lConnectorRe}),
        totalNoConnectorOb: new FormControl({disabled: false, value: item.totalNoConnectorOb}, Validators.required),
        totalNoConnectorRe: new FormControl({disabled: false, value: item.totalNoConnectorRe}),
        inspectionNoOb: new FormControl({disabled: false, value: item.inspectionNoOb}, Validators.required),
        inspectionNoRe: new FormControl({disabled: false, value: item.inspectionNoRe}),
        inspectionPassedNoOb: new FormControl({disabled: false, value: item.inspectionPassedNoOb}, Validators.required),
        inspectionPassedNoRe: new FormControl({disabled: false, value: item.inspectionPassedNoRe}),
        inspectionFailedOb: new FormControl({disabled: false, value: item.inspectionFailedOb}, Validators.required),
        inspectionFailedRe: new FormControl({disabled: false, value: item.inspectionFailedRe})      
      });
    }
    onChangeForm(event:any){
      if(!this.airTerminationForm.invalid){
        if(this.airTerminationForm.dirty){
          this.validationError=false;
          this.service.lvClick=1;
          this.service.logoutClick=1;
          this.service.windowTabClick=1;
        }
        else{
          this.validationError=false;
          this.service.lvClick=0;
          this.service.logoutClick=0;
        }
       }
      else {
       this.service.lvClick=1;
       this.service.logoutClick=1;
      }  
    }
    onKeyForm(event: KeyboardEvent) { 
     if(!this.airTerminationForm.invalid){ 
      if(this.airTerminationForm.dirty){
        this.validationError=false;
        this.service.lvClick=1;
        this.service.logoutClick=1;
        this.service.windowTabClick=1;
      }
      else{
        this.validationError=false;
        this.service.lvClick=0;
        this.service.logoutClick=0;
      }
     }
     else {
      this.service.lvClick=1;
      this.service.logoutClick=1;
     }
    } 

  gotoNextModal(content: any,contents:any) {
    
     if (this.airTerminationForm.invalid) {
       this.validationError = true;
       this.validationErrorMsg = 'Please check all the fields';
       setTimeout(() => {
         this.validationError = false;
       }, 3000);
       return;
     }
     
     if (this.basicLpsId == 0) {
      this.validationError = true;
      this.validationErrorMsg = 'Basics Form is Required, Please fill';
      setTimeout(() => {
        this.validationError = false;
      }, 3000);
      return;
    }
    //  Update and Success msg will be showing
    if(this.airTerminationForm.dirty && this.airTerminationForm.touched){
      this.modalService.open(content, { centered: true,backdrop: 'static' });
   }
  //  For Dirty popup
   else{
    this.modalService.open(contents, { centered: true,backdrop: 'static' });
   }
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
  
  onSubmit(flag: any){
       this.submitted=true;
          if(this.airTerminationForm.invalid){
            return
          }
      this.airtermination.userName=this.router.snapshot.paramMap.get('email') || '{}';
      this.airtermination.basicLpsId=this.basicLpsId; 
     
        this.airtermination.airClamps=this.airTerminationForm.value.clampArr;
        this.airtermination.airConnectors=this.airTerminationForm.value.conArr;
        this.airtermination.airMeshDescription=this.airTerminationForm.value.meshArr;
        this.airtermination.lpsVerticalAirTermination=this.airTerminationForm.value.vatArr;
        this.airtermination.airExpansion=this.airTerminationForm.value.expArr;
        this.airtermination.airHolderDescription=this.airTerminationForm.value.holderArr;
       
        this.airtermination.lpsVerticalAirTermination=this.airtermination.lpsVerticalAirTermination.concat(this.vatPusharr);
        this.airtermination.airClamps= this.airtermination.airClamps.concat(this.clampPusharr);
        this.airtermination.airConnectors=this.airtermination.airConnectors.concat(this.conPusharr);
        this.airtermination.airMeshDescription= this.airtermination.airMeshDescription.concat(this.meshPusharr);
        this.airtermination.airExpansion=this.airtermination.airExpansion.concat(this.exPusharr);
        this.airtermination.airHolderDescription=this.airtermination.airHolderDescription.concat(this.holderPusharr);
       
        this.vatPusharr=[];
        this.meshPusharr= [];
        this.holderPusharr= [];
        this.clampPusharr= [];
        this.exPusharr= [];
        this.conPusharr=[];
        if (!this.validationError) {
          if(flag) {
            if(this.airTerminationForm.dirty && this.airTerminationForm.touched){ 
            this.airterminationService.updateAirtermination(this.airtermination).subscribe(
              (data) => {
                this.success1 = false;
                this.success = true;
                this.successMsg = data;
                this.airTerminationForm.markAsPristine();
                this.service.lvClick=0;
                this.service.logoutClick=0;
                this.service.windowTabClick=0;
                this.proceedNext.emit(true);
              },
              (error) => {
                this.success1 = false;
                this.Error = true;
                this.errorArr = [];
                this.errorArr = JSON.parse(error.error);
                this.errorMsg = this.errorArr.message;
                this.proceedNext.emit(false);
              });}
              else{
                if(this.isEditable){
                  this.success = true;
                  this.proceedNext.emit(true);
                }
                // Dirty checking here
                else{
                  
                  this.success = true;
                  this.proceedNext.emit(true);
                }
              }
          }
          else {
              this.airterminationService.saveAirtermination(this.airtermination).subscribe(
                (data) => {
                  this.success = true;
                  this.successMsg = data;
                  this.disable = true;
                  this.retriveAirTermination();
                  this.proceedNext.emit(true);
                  this.service.lvClick=0;
                  this.service.logoutClick=0;
                  this.service.windowTabClick=0;
                },
                (error) => {
                  this.Error = true;
                  this.errorArr = [];
                  this.errorArr = JSON.parse(error.error);
                  this.errorMsg = this.errorArr.message;
                  this.proceedNext.emit(false);
                });
          }
        }
    }

// Parent Array Controls:

  overAllControl(): AbstractControl[] {
      return(<FormArray>this.airTerminationForm.get('lpsAirDescription')).controls;
  }

  getDescriptionControl(form:any) {
      //return (<FormArray>this.airTerminationForm.get('airTerminationBasicArr')).controls;
      return form.controls.airTerminationBasicArr?.controls;
  }

  vatControls(form:any) {
    return form.controls.vatArr?.controls;
  }

  meshControls(form:any) {
    return form.controls.meshArr?.controls;
  }

 holdersContols(form:any) {
    return form.controls.holderArr?.controls;
  }

  clampsControls(form:any) {
    return form.controls.clampArr?.controls;
  }

  expansionControls(form:any) {
    return form.controls.expArr?.controls;
  }

  connectorsControls(form:any) {
    return form.controls.conArr?.controls;
  }

  private createVatArrForm(): FormGroup{
    return new FormGroup({
       
      locationNumber: new FormControl('', Validators.required),
      locationName: new FormControl('', Validators.required),
      physicalInspectionOb: new FormControl('', Validators.required),
      physicalInspectionRe: new FormControl(''),
      installationTerminationsystemOb: new FormControl('', Validators.required),
      installationTerminationsystemRem: new FormControl(''),
      sizeOfTerminalOb: new FormControl('', Validators.required),
      sizeOfTerminalRe: new FormControl(''),
      heightOfTerminalOb: new FormControl('', Validators.required),
      heightOfTerminalRe: new FormControl(''),
      angleProtectionHeightOb: new FormControl('', Validators.required),
      angleProtectionHeightRe: new FormControl(''),
      materialOfTerminalOb: new FormControl('', Validators.required),
      materialOfTerminalRe: new FormControl(''),
      supportFlatSurfaceOb: new FormControl('', Validators.required),
      supportFlatSurfaceRe: new FormControl(''),
      heightFlatSurfaceOb: new FormControl('', Validators.required),
      heightFlatSurfaceRe: new FormControl(''),
      vatToRoofConductorOB: new FormControl('', Validators.required),
      vatToRoofConductorRe: new FormControl(''),
      totalNumberOb: new FormControl('', Validators.required),
      totalNumberRe: new FormControl(''),
      inspNoOb: new FormControl('', Validators.required),
      inspNoRe: new FormControl(''),
      inspPassedNoOb: new FormControl('', Validators.required),
      inspPassedNoRe: new FormControl(''),
      inspFaileddNoOb: new FormControl('', Validators.required),
      inspFaileddNoRe: new FormControl(''),
      flag: new FormControl('true'),
    })
  }

  private createMeshArrForm(): FormGroup{
    return new FormGroup({
      locationNumber: new FormControl('', Validators.required),
      locationName: new FormControl('', Validators.required),
      physicalInspectionOb: new FormControl('', Validators.required),
      physicalInspectionRe: new FormControl(''),
      materailOfConductorOb: new FormControl('', Validators.required),
      materailOfConductorRem: new FormControl(''),
      sizeOfConductorOb: new FormControl('', Validators.required),
      sizeOfConductorRe: new FormControl(''),
      meshSizeOb: new FormControl('', Validators.required),
      meshSizeRe: new FormControl(''),
      maximumDistanceOb: new FormControl('', Validators.required),
      maximumDistanceRe: new FormControl(''),
      minimumDistanceOb: new FormControl('', Validators.required),
      minimumDistanceRe: new FormControl(''),
      heightOfConductorFlatSurfaceOb: new FormControl('', Validators.required),
      heightOfConductorFlatSurfaceRe: new FormControl(''),
      flag: new FormControl('true')
    })
  }

  private createHolderArrForm(): FormGroup{
    return new FormGroup({
      locationNumber: new FormControl('', Validators.required),
      locationName: new FormControl('', Validators.required),

      physicalInspectionOb: new FormControl('', Validators.required),
      physicalInspectionRe: new FormControl(''),

      conductorHolderFlatSurfaceOb: new FormControl('', Validators.required),
      conductorHolderFlatSurfaceRe: new FormControl(''),

      conductorHolderOb: new FormControl('', Validators.required),
      conductorHolderRe: new FormControl(''),

      holderTypeOb: new FormControl('', Validators.required),
      holderTypeRe: new FormControl(''),

      materailOfHolderOb: new FormControl('', Validators.required),
      materailOfHolderRem: new FormControl(''),

      totalHolderNoOb: new FormControl('', Validators.required),
      totalHolderNoRe: new FormControl(''),

      holderInspNoOb: new FormControl('', Validators.required),
      holderInspNoRe: new FormControl(''),

      holderInspPassedNoOb: new FormControl('', Validators.required),
      holderInspPassedNoRe: new FormControl(''),

      holderInspFailedNoOb: new FormControl('', Validators.required),
      holderInspFailedNoRe: new FormControl(''),

      totalParpetHolderNoOb: new FormControl('', Validators.required),
      totalParpetHolderNoRe: new FormControl(''),

      materailOfParpetHolderOb: new FormControl('', Validators.required),
      materailOfParpetHolderRem: new FormControl(''),
      
      parpetInspectionNoOb: new FormControl('', Validators.required),
      parpetInspectionNoRe: new FormControl(''),

      parpetInspectionPassedNoOb: new FormControl('', Validators.required),
      parpetInspectionPassedNoRe: new FormControl(''),
      
      parpetInspectionFailedNoOb: new FormControl('', Validators.required),
      parpetInspectionFailedNoRe: new FormControl(''),
     flag: new FormControl('true')
    
    }) 
  }

  private createClampArrForm(): FormGroup{
    return new FormGroup({
      locationNumber: new FormControl('', Validators.required),
      locationName: new FormControl('', Validators.required),
      physicalInspectionOb: new FormControl('', Validators.required),
      physicalInspectionRe: new FormControl(''),
      conductorClampsFlatSurafaceOb: new FormControl('', Validators.required),
      conductorClampsFlatSurafaceRe: new FormControl(''),
      interConnectionOfClampsOb: new FormControl('', Validators.required),
      interConnectionOfClampsRe: new FormControl(''),
      clampTypeOb: new FormControl('', Validators.required),
      clampTypRe: new FormControl(''),

      materialOfClampsOb: new FormControl('', Validators.required),
      materialOfClampsRe: new FormControl(''),
      totalClampsNoOb: new FormControl('', Validators.required),
      totalClampsNoRe: new FormControl(''),
      inspectionNoOb: new FormControl('', Validators.required),
      inspectionNoRe: new FormControl(''),
      inspectionPassedOb: new FormControl('', Validators.required),
      inspectionPassedRe: new FormControl(''),
      inspectionFailedReOb: new FormControl('', Validators.required),
      inspectionFailedReRe: new FormControl(''),
      flag: new FormControl('true')
    })
  }

  private createExpansioArrForm(): FormGroup{
    return new FormGroup({
      locationNumber: new FormControl('', Validators.required),
      locationName: new FormControl('', Validators.required),
      physicalInspectionOb: new FormControl('', Validators.required),
      physicalInspectionRe: new FormControl(''),
      strightConnectorPiecOb: new FormControl('', Validators.required),
      strightConnectorPiecRe: new FormControl(''),
      materialOfExpansionOb: new FormControl('', Validators.required),
      materialOfExpansionRe: new FormControl(''),
      totalNoExpansionOb: new FormControl('', Validators.required),
      totalNoExpansionRe: new FormControl(''),
      inspectionNoOb: new FormControl('', Validators.required),
      inspectionNoRe: new FormControl(''),
      inspectionPassedNoOb: new FormControl('', Validators.required),
      inspectionPassedNoRe: new FormControl(''),
      inspectionFailedNoOb: new FormControl('', Validators.required),
      inspectionFailedNoRe: new FormControl(''),
      flag: new FormControl('true')
    })
  }
  
  private createConArrForm(): FormGroup{
    return new FormGroup({
      locationNumber: new FormControl('', Validators.required),
      locationName: new FormControl('', Validators.required),
      physicalInspectionOb: new FormControl('', Validators.required),
      physicalInspectionRe: new FormControl(''),
      checkConnectionConnectorsOb: new FormControl('', Validators.required),
      checkConnectionConnectorsRe: new FormControl(''),
      materialOfConnectorOb: new FormControl('', Validators.required),
      materialOfConnectorRe: new FormControl(''),
      strightConnectorOb: new FormControl('', Validators.required),
      strightConnectorRe: new FormControl(''),
      tConnectorOb: new FormControl('', Validators.required),
      tConnectorRe: new FormControl(''),
      lConnectorOb: new FormControl('', Validators.required),
      lConnectorRe: new FormControl(''),
      totalNoConnectorOb: new FormControl('', Validators.required),
      totalNoConnectorRe: new FormControl(''),
      inspectionNoOb: new FormControl('', Validators.required),
      inspectionNoRe: new FormControl(''),
      inspectionPassedNoOb: new FormControl('', Validators.required),
      inspectionPassedNoRe: new FormControl(''),
      inspectionFailedOb: new FormControl('', Validators.required),
      inspectionFailedRe: new FormControl(''),
      flag: new FormControl('true')
    })
  }

  submit(){
    this.vatArr = this.airTerminationForm.get('vatArr') as FormArray;
    this.vatArr.push(this.createVatArrForm());
  }

  submit1(){
    this.meshArr = this.airTerminationForm.get('meshArr') as FormArray;
    this.meshArr.push(this.createMeshArrForm());
  }

  submit2(){
    this.holderArr = this.airTerminationForm.get('holderArr') as FormArray;
    this.holderArr.push(this.createHolderArrForm());
  }

  submit3(){
    this.clampArr = this.airTerminationForm.get('clampArr') as FormArray;
    this.clampArr.push(this.createClampArrForm());
  }

  submit4(){
    this.expArr = this.airTerminationForm.get('expArr') as FormArray;
    this.expArr.push(this.createExpansioArrForm());
  }

  submit5(){
    this.conArr = this.airTerminationForm.get('conArr') as FormArray;
    this.conArr.push(this.createConArrForm());
  }
  
//   getDescriptionControl(): AbstractControl[] {
//     return (<FormArray>this.airTerminationForm.get('airTerminationBasicArr')).controls;
// }
  get f() {
    return this.airTerminationForm.controls;
  }

  removeItem(a:any,index: any) {
    if(a.value.lpsVerticalAirTerminationId !=0 && a.value.lpsVerticalAirTerminationId !=undefined){
       a.value.flag=false;
     (this.airTerminationForm.get('vatArr') as FormArray).removeAt(index);
     this.vatPusharr= this.vatPusharr.concat(a.value);
    
    }
    else{
      (this.airTerminationForm.get('vatArr') as FormArray).removeAt(index);
    }
    
    }
  removeItem1(a:any,index: any) {
    if(a.value.meshDescriptionId !=0 && a.value.meshDescriptionId !=undefined){
      a.value.flag=false;
    (this.airTerminationForm.get('meshArr') as FormArray).removeAt(index);
    this.meshPusharr= this.meshPusharr.concat(a.value);
    
   
   }
    else{
    (this.airTerminationForm.get('meshArr') as FormArray).removeAt(index);     
    }
    }
  removeItem2(a:any,index: any) {
    if(a.value.holderDescriptionId !=0 && a.value.holderDescriptionId !=undefined){
      a.value.flag=false;
    (this.airTerminationForm.get('holderArr') as FormArray).removeAt(index);
   
    this.holderPusharr= this.holderPusharr.concat(a.value);
   }
   else{
    (this.airTerminationForm.get('holderArr') as FormArray).removeAt(index);
    }}
  removeItem3(a:any,index: any) {
    if(a.value.clampsId !=0 && a.value.clampsId !=undefined){
      a.value.flag=false;
    (this.airTerminationForm.get('clampArr') as FormArray).removeAt(index);
    this.clampPusharr= this.clampPusharr.concat(a.value);
   }
    else
    {(this.airTerminationForm.get('clampArr') as FormArray).removeAt(index);}
    }
  removeItem4(a:any,index: any) {
    if(a.value.expansionId !=0 && a.value.expansionId !=undefined){
      a.value.flag=false;
    (this.airTerminationForm.get('expArr') as FormArray).removeAt(index);
    this.exPusharr= this.exPusharr.concat(a.value);
   }else
{(this.airTerminationForm.get('expArr') as FormArray).removeAt(index); }}
  removeItem5(a:any,index: any) {
    if(a.value.connectorId !=0 && a.value.connectorId !=undefined){
      a.value.flag=false;
    (this.airTerminationForm.get('conArr') as FormArray).removeAt(index);
    this.conPusharr= this.conPusharr.concat(a.value);
   }else
    {(this.airTerminationForm.get('conArr') as FormArray).removeAt(index);}
    }

  retriveAirTermination(){
    this.airterminationServices.retriveAirTerminationDetails(this.router.snapshot.paramMap.get('email') || '{}',this.basicLpsId).subscribe(
      data => {
        this.retrieveDetailsfromSavedReports1(this.airtermination.userName,this.basicLpsId,this.ClientName,data);
      },
      error=>{
      }
    );  
  }

}
