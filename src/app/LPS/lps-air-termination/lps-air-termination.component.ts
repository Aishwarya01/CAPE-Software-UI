import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationBoxComponent } from 'src/app/confirmation-box/confirmation-box.component';
import { GlobalsService } from 'src/app/globals.service';
import { Airtermination } from 'src/app/LPS_model/airtermination';
import { AirterminationService } from 'src/app/LPS_services/airtermination.service';
import { LpsDownconductorService } from 'src/app/LPS_services/lps-downconductor.service';
import { LpsMatstepperComponent } from '../lps-matstepper/lps-matstepper.component';

@Component({
  selector: 'app-lps-air-termination',
  templateUrl: './lps-air-termination.component.html',
  styleUrls: ['./lps-air-termination.component.css']
})
export class LpsAirTerminationComponent implements OnInit {

  airtermination=new Airtermination;
  
  airTerminationForm!: FormGroup;
  lpsVerticalAirTermination!: FormArray;
  verticalAirTerminationList!: FormArray;
  airHolderList!: FormArray;
  airMeshDescription!: FormArray;
  airHolderDescription!: FormArray;
  airClamps!: FormArray;
  airExpansion!: FormArray;
  airConnectors!: FormArray;
  airBasicDescription!: FormArray;
  lpsAirDescription!: FormArray;
  submitted=false;
  validationError: boolean = false;
  validationErrorMsg: String = '';
  successMsg: string="";
  errorMsg: string="";
  success: boolean=false;
  Error: boolean=false;
  errorArr: any=[];
  disable: boolean = false;
  isAirterminationUpdated: boolean = false;
  i: any;
  j: any;
  success1 = false;
  proceedFlag: boolean = true;
  airTerminationPushArr: any=[];
  // successMsg1: String="";

  @Output() proceedNext = new EventEmitter<any>();
  basicLpsId: number = 0;
  ClientName: String='';
  projectName: String='';
  industryType: String='';
  buildingType: String='';
  buildingLength: number = 0;
  buildingWidth:  number = 0;
  buildingHeight:  number = 0;
  protectionLevel: String='';
  soilResistivity: String='';

  buildingNumberArr: any = [];
  buildingNameArr: any = [];
  noBuilding : number = 0;
  
  airterminationService;
  step2List: any = [];
  popArray: any = [];
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
  airterminationDataDeleted:boolean=false;
  applicableConnectors: boolean=false;
  applicableExpansion: boolean=false;
  applicableClamps: boolean=false;
  applicableHolders: boolean=false;
  applicableMesh: boolean=false;
  applicableAir: boolean=false;
  airterminationArr: any = [];
  airterminationArrHolder: any = [];
  applicableAirNote: boolean=true;
  applicableConnectorsNote: boolean=true;
  applicableMeshNote: boolean=true;
  applicableHoldersNote: boolean=true;
  applicableClampsNote: boolean=true;
  applicableExpansionNote: boolean=true;
  applicableBasicNote: boolean = true;
  applicableBasic: boolean = false;
  deletedLpsDescArr: any = [];
  deletedAirBasicArr: any = [];
  deletedAirTerminationArr: any = [];
  deletedAirTerminationListArr: any = [];
  deletedAirMeshArr: any = [];
  deletedHoldersArr: any = [];
  deletedHoldersListArr: any = [];
  deletedAirClampsArr: any = [];
  deletedExpansionArr: any = [];
  deletedAirConnectorsArr: any = [];
  airTerminationBasicArr:any=[];


  constructor(
    private formBuilder: FormBuilder,private dialog: MatDialog,
    private airterminationServices: AirterminationService,
    private downConductorServices: LpsDownconductorService,
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

  allLPSAirterminationArr() {
    return this.formBuilder.group({
      buildingNumber: new FormControl('',Validators.required),
      buildingName: new FormControl('', Validators.required),
      buildingType: new FormControl('', Validators.required),
      buildingTypeOthers: new FormControl(''),
      buildingLength: new FormControl('', Validators.required),
      buildingHeight: new FormControl('', Validators.required),
      buildingWidth: new FormControl('', Validators.required),
      protrusionHeight: new FormControl('', Validators.required), 
      protectionLevel: new FormControl('', Validators.required),
      airBasicDescriptionAvailabilityOb: new FormControl('', Validators.required),
      verticalAirTerminationAvailabilityOb: new FormControl('', Validators.required),
      airClampsAvailabilityOb: new FormControl('', Validators.required),
      airConnectorsAvailabilityOb: new FormControl('', Validators.required),
      airExpansionAvailabilityOb: new FormControl('', Validators.required),
      airHolderDescriptionAvailabilityOb: new FormControl('', Validators.required),
      airMeshDescriptionAvailabilityOb: new FormControl('', Validators.required),
      airBasicDescriptionAvailabilityRem: new FormControl(''),
      verticalAirTerminationAvailabilityRem: new FormControl(''),
      airClampsAvailabilityRem: new FormControl(''),
      airConnectorsAvailabilityRem: new FormControl(''),
      airExpansionAvailabilityRem: new FormControl(''),
      airHolderDescriptionAvailabilityRem: new FormControl(''),
      airMeshDescriptionAvailabilityRem: new FormControl(''),

      lpsVerticalAirTermination: this.formBuilder.array([this.createVatArrForm()]),
      airMeshDescription: this.formBuilder.array([this.createMeshArrForm()]),
      airHolderDescription: this.formBuilder.array([this.createHolderArrForm()]),
      airClamps: this.formBuilder.array([this.createClampArrForm()]),
      airExpansion: this.formBuilder.array([this.createExpansioArrForm()]),
      airConnectors: this.formBuilder.array([this.createConArrForm()]),
      airBasicDescription: this.formBuilder.array([this.createLpsDescriptionarr()]),
      flag: new FormControl('A'),
    });
  }

  private createVatArrForm(): FormGroup{
    return new FormGroup({
      physicalInspectionOb: new FormControl('', Validators.required),
      physicalInspectionRe: new FormControl(''),
      totalNumberOb: new FormControl('', Validators.required),
      totalNumberRe: new FormControl(''),
      inspNoOb: new FormControl('', Validators.required),
      inspNoRe: new FormControl(''),
      inspPassedNoOb: new FormControl('', Validators.required),
      inspPassedNoRe: new FormControl(''),
      inspFaileddNoOb: new FormControl('', Validators.required),
      inspFaileddNoRe: new FormControl(''),
      flag: new FormControl('A'),
      verticalAirTerminationList: this.formBuilder.array([this.createAirIteration()]),
    })
  }

  createAirIteration()  : FormGroup {
    return this.formBuilder.group({
      sizeOfTerminalOb: new FormControl('', Validators.required),
      heightOfTerminalOb: new FormControl('', Validators.required),
      materialOfTerminalOb: new FormControl('', Validators.required),
      installationTerminationsystemOb: new FormControl('', Validators.required),
      angleProtectionHeightOb: new FormControl('', Validators.required),
      supportFlatSurfaceOb: new FormControl('', Validators.required),
      heightFlatSurfaceOb: new FormControl('', Validators.required),
      heightFlatSurfaceRe: new FormControl(''),
      supportFlatSurfaceRe: new FormControl(''),
      installationTerminationsystemRem: new FormControl(''),
      angleProtectionHeightRe: new FormControl(''),
      heightOfTerminalRe: new FormControl(''),
      sizeOfTerminalRe: new FormControl(''),
      materialOfTerminalRe: new FormControl(''),
      flag: new FormControl('A'),
    });
  }
  
  private createMeshArrForm(): FormGroup{
    return new FormGroup({
      physicalInspectionOb: new FormControl('', Validators.required),
      physicalInspectionRe: new FormControl(''),
      materailOfConductorOb: new FormControl('', Validators.required),
      materailOfConductorRem: new FormControl(''),
      sizeOfConductorOb: new FormControl('', Validators.required),
      sizeOfConductorRe: new FormControl(''),
      meshSizeOb: new FormControl('', Validators.required),
      meshSizeRe: new FormControl(''),
      maximumDistanceXOb: new FormControl('', Validators.required),
      maximumDistanceXRe: new FormControl(''),
      maximumDistanceYOb: new FormControl('', Validators.required),
      maximumDistanceYRe: new FormControl(''),
      minimumDistanceXOb: new FormControl('', Validators.required),
      minimumDistanceXRe: new FormControl(''),
      minimumDistanceYOb: new FormControl('', Validators.required),
      minimumDistanceYRe: new FormControl(''),
      heightOfConductorFlatSurfaceOb: new FormControl('', Validators.required),
      heightOfConductorFlatSurfaceRe: new FormControl(''),
      flag: new FormControl('A'),
    })
  }
  
  private createHolderArrForm(): FormGroup{
    return new FormGroup({
      physicalInspectionOb: new FormControl('', Validators.required),
      physicalInspectionRe: new FormControl(''),
      conductorHolderFlatSurfaceOb: new FormControl('', Validators.required),
      conductorHolderFlatSurfaceRe: new FormControl(''),
      conductorHolderOb: new FormControl('', Validators.required),
      conductorHolderRe: new FormControl(''),
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
      flag: new FormControl('A'),
      airHolderList: this.formBuilder.array([this.createAirHolderIteration()]),
    }) 
  }

  
  createAirHolderIteration()  : FormGroup {
    return this.formBuilder.group({
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
      flag: new FormControl('A'),
    });
  }
  
  private createClampArrForm(): FormGroup{
    return new FormGroup({
      physicalInspectionOb: new FormControl('', Validators.required),
      physicalInspectionRe: new FormControl(''),
      conductorClampsFlatSurafaceOb: new FormControl('', Validators.required),
      conductorClampsFlatSurafaceRe: new FormControl(''),
      interConnectionOfClampsOb: new FormControl('', Validators.required),
      interConnectionOfClampsRe: new FormControl(''),
      clampTypeOb: new FormControl('', Validators.required),
      clampTypRe: new FormControl(''),
      materialOfWallClampsOb: new FormControl('', Validators.required),
      materialOfWallClampsRe: new FormControl(''),
      materialOfFoldingClampsOb: new FormControl('', Validators.required),
      materialOfFoldingClampsRe: new FormControl(''),
      totalClampsNoOb: new FormControl('', Validators.required),
      totalClampsNoRe: new FormControl(''),
      inspectionNoOb: new FormControl('', Validators.required),
      inspectionNoRe: new FormControl(''),
      inspectionPassedOb: new FormControl('', Validators.required),
      inspectionPassedRe: new FormControl(''),
      inspectionFailedReOb: new FormControl('', Validators.required),
      inspectionFailedReRe: new FormControl(''),
      flag: new FormControl('A'),
    })
  }
  
  private createExpansioArrForm(): FormGroup{
    return new FormGroup({
      physicalInspectionOb: new FormControl('', Validators.required),
      physicalInspectionRe: new FormControl(''),
      strightConnectorPiecOb: new FormControl('', Validators.required),
      strightConnectorPiecRe: new FormControl(''),
      materialOfExpansionOb: new FormControl('', Validators.required),
      materialOfExpansionRe: new FormControl(''),
      materialOfConnectorOb: new FormControl('', Validators.required),
      materialOfConnectorRe: new FormControl(''),
      intervalBwExpansionOb: new FormControl('', Validators.required),
      intervalBwExpansionRe: new FormControl(''),
      totalNoExpansionOb: new FormControl('', Validators.required),
      totalNoExpansionRe: new FormControl(''),
      inspectionNoOb: new FormControl('', Validators.required),
      inspectionNoRe: new FormControl(''),
      inspectionPassedNoOb: new FormControl('', Validators.required),
      inspectionPassedNoRe: new FormControl(''),
      inspectionFailedNoOb: new FormControl('', Validators.required),
      inspectionFailedNoRe: new FormControl(''),
      flag: new FormControl('A'),
    })
  }
  
  private createConArrForm(): FormGroup{
    return new FormGroup({
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
      flag: new FormControl('A'),
    })
  }

  private createLpsDescriptionarr(): FormGroup{
    return new FormGroup({
      consultantNameObserv:  new FormControl('', Validators.required),
      consultantNameRemarks: new FormControl(''),
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
      deviationInstallationObserv:  new FormControl('', Validators.required),
      deviationInstallationRemarks: new FormControl(''),
      companyNameObserv:  new FormControl('', Validators.required),
      companyNameRemarks: new FormControl(''),
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
      flag: new FormControl('A'),
      });
    }

    addItem() {
      this.lpsAirDescription = this.airTerminationForm.get('lpsAirDescription') as FormArray;
      this.lpsAirDescription.push(this.allLPSAirterminationArr());
    }

    removeItem(a:any,index: any) { 
      this.airTerminationForm.markAsTouched();
        if(a.value.lpsAirDescId !=0 && a.value.lpsAirDescId !=undefined && a.value.lpsAirDescId != ''){
          a.value.flag="R";
          this.deletedLpsDescArr.push(a.value);
          (this.airTerminationForm.get('lpsAirDescription') as FormArray).removeAt(index);
          // this.airTerminationPushArr= this.airTerminationPushArr.concat(a.value);
          // this.airterminationDataDeleted=true;         
        }
        else{
          (this.airTerminationForm.get('lpsAirDescription') as FormArray).removeAt(index);      
        }
        this.airTerminationForm.markAsDirty(); 
    }


  addItemAir(a:any) {
    const dialogRef = this.dialog.open(ConfirmationBoxComponent, {
      width: '420px',
      maxHeight: '90vh',
      disableClose: true,
    });
    // dialogRef.componentInstance.editModal = false;
    // dialogRef.componentInstance.viewModal = false;
    // dialogRef.componentInstance.triggerModal = false;
    // dialogRef.componentInstance.linkModal = false;
    // dialogRef.componentInstance.summaryModal = false;
    dialogRef.componentInstance.lpsAirTModal = true;
    dialogRef.componentInstance.lpsAirHModal = false;
    dialogRef.componentInstance.lpsTypeEModal = false;

    dialogRef.componentInstance.confirmBox.subscribe(data=>{
      if(data) {
        this.airterminationArr = a.controls.verticalAirTerminationList as FormArray;
        this.airterminationArr.push(this.createAirIteration());
      }
      else{
        return;
      }
    })
  }
 
  removeItemAir(a: any,w:any) {
    this.airTerminationForm.markAsTouched();
    this.airterminationArr = a.controls.verticalAirTerminationList as FormArray;
    if(this.flag && this.airterminationArr.value[w].verticalAirTerminationListId !=null && this.airterminationArr.value[w].verticalAirTerminationListId !='' && this.airterminationArr.value[w].verticalAirTerminationListId !=undefined){
      this.airterminationArr.value[w].flag ='R';
      this.deletedAirTerminationListArr.push(this.airterminationArr.value[w]);
    }
    this.airterminationArr.removeAt(w);
    this.airTerminationForm.markAsDirty();
  }
 
  //holder
  addItemAirHolder(a:any) {
    const dialogRef = this.dialog.open(ConfirmationBoxComponent, {
      width: '420px',
      maxHeight: '90vh',
      disableClose: true,
    });
    dialogRef.componentInstance.lpsAirTModal = false;
      dialogRef.componentInstance.lpsAirHModal = true;
      dialogRef.componentInstance.lpsTypeEModal = false;
    dialogRef.componentInstance.confirmBox.subscribe(data=>{
      if(data) {
        this.airterminationArrHolder = a.controls.airHolderList as FormArray;
        this.airterminationArrHolder.push(this.createAirHolderIteration());
      }
      else{
        return;
      }
    })
  }

  removeItemAirHolder(a: any,x:any) {
    this.airTerminationForm.markAsTouched();
    this.airterminationArrHolder = a.controls.airHolderList as FormArray;
    if(this.flag && this.airterminationArrHolder.value[x].holderListId !=null && this.airterminationArrHolder.value[x].holderListId !='' && this.airterminationArrHolder.value[x].holderListId !=undefined){
      this.airterminationArrHolder.value[x].flag ='R';
      this.deletedHoldersListArr.push(this.airterminationArrHolder.value[x]);
    }
    this.airterminationArrHolder.removeAt(x);
    this.airTerminationForm.markAsDirty();
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

  //To get the value of Basic Lps Id form MAT STEPPER
  appendBasicLpsId(basicLpsId: any) {
    this.airtermination.basicLpsId = basicLpsId;
    this.basicLpsId=basicLpsId;
  }

    retrieveDetailsfromSavedReports(userName: any,basicLpsId: any,clientName: any,data: any){
      // this.service.lvClick=1;
      this.proceedFlag = false;
      this.step2List = data.airTermination;
      this.airtermination.basicLpsId = basicLpsId;
      this.airtermination.airTerminationId = this.step2List.airTerminationId;     
      this.airtermination.createdBy = this.step2List.createdBy;
      this.airtermination.createdDate = this.step2List.createdDate;     
      this.airtermination.userName = this.step2List.userName;
      this.deletedAirBasicArr = [];
      this.deletedAirTerminationArr = [];
      this.deletedAirMeshArr = [];
      this.deletedAirClampsArr = [];
      this.deletedHoldersArr = [];
      this.deletedExpansionArr = [];
      this.deletedAirConnectorsArr = [];
      this.deletedAirTerminationListArr = [];
      this.deletedHoldersListArr = [];
      this.airRetrieve();
      this.flag=true;
    }

    retrieveDetailsfromSavedReports1(userName: any,basicLpsId: any,clientName: any,data: any){
      //this.service.lvClick=1;
        this.proceedFlag = false;
        let list=JSON.parse(data);
        this.step2List = list[0];       
        this.airtermination.basicLpsId = basicLpsId;
        this.airtermination.airTerminationId = this.step2List.airTerminationId;       
        this.airtermination.createdBy = this.step2List.createdBy;
        this.airtermination.createdDate = this.step2List.createdDate;     
        this.airtermination.userName = this.step2List.userName;
        this.deletedAirBasicArr = [];
        this.deletedAirTerminationArr = [];
        this.deletedAirMeshArr = [];
        this.deletedAirClampsArr = [];
        this.deletedHoldersArr = [];
        this.deletedExpansionArr = [];
        this.deletedAirConnectorsArr = [];
        this.deletedAirTerminationListArr = [];
        this.deletedHoldersListArr = [];
        this.airRetrieve();
        this.flag=true;
      }

      airRetrieve() {
        let i=0;
        for (let item of this.step2List.lpsAirDescription) {
          this.popArray.push(this.airTerminationBasic(item));
          this.airTerminationBasicArr=item;
          this.buildingNumberArr[i]=item.buildingNumber+","+item.buildingName;
          i=i+1;
        }
        this.airTerminationForm.setControl('lpsAirDescription', this.formBuilder.array(this.popArray || []));
        this.popArray = [];
      }
      
    airTerminationBasic(item:any): FormGroup {
      return this.formBuilder.group({       
        lpsAirDescId: new FormControl({disabled: false, value: item.lpsAirDescId}),
        buildingCount: new FormControl({disabled: false, value: item.buildingCount}),
        buildingNumber: new FormControl({disabled: false, value: item.buildingNumber}, Validators.required),
        buildingName: new FormControl({disabled: false, value: item.buildingName}, Validators.required),
        buildingType: new FormControl({disabled: false, value: item.buildingType}, Validators.required),
        buildingTypeOthers: new FormControl({disabled: false, value: item.buildingTypeOthers}),
        buildingLength: new FormControl({disabled: false, value: item.buildingLength}, Validators.required),
        buildingHeight: new FormControl({disabled: false, value: item.buildingHeight}, Validators.required),
        buildingWidth: new FormControl({disabled: false, value: item.buildingWidth}, Validators.required),
        protrusionHeight: new FormControl({disabled: false, value: item.protrusionHeight}, Validators.required),
        protectionLevel: new FormControl({disabled: false, value: item.protectionLevel}, Validators.required),
        airBasicDescriptionAvailabilityOb: new FormControl({disabled: false, value: item.airBasicDescriptionAvailabilityOb}, Validators.required),
        verticalAirTerminationAvailabilityOb: new FormControl({disabled: false, value: item.verticalAirTerminationAvailabilityOb}, Validators.required),
        airClampsAvailabilityOb: new FormControl({disabled: false, value: item.airClampsAvailabilityOb}, Validators.required),
        airConnectorsAvailabilityOb: new FormControl({disabled: false, value: item.airConnectorsAvailabilityOb}, Validators.required),
        airExpansionAvailabilityOb: new FormControl({disabled: false, value: item.airExpansionAvailabilityOb}, Validators.required),
        airHolderDescriptionAvailabilityOb: new FormControl({disabled: false, value: item.airHolderDescriptionAvailabilityOb}, Validators.required),
        airMeshDescriptionAvailabilityOb: new FormControl({disabled: false, value: item.airMeshDescriptionAvailabilityOb}, Validators.required),
        airBasicDescriptionAvailabilityRem: new FormControl({disabled: false, value: item.airBasicDescriptionAvailabilityRem}),
        verticalAirTerminationAvailabilityRem: new FormControl({disabled: false, value: item.verticalAirTerminationAvailabilityRem}),
        airClampsAvailabilityRem: new FormControl({disabled: false, value: item.airClampsAvailabilityRem}),
        airConnectorsAvailabilityRem: new FormControl({disabled: false, value: item.airConnectorsAvailabilityRem}),
        airExpansionAvailabilityRem: new FormControl({disabled: false, value: item.airExpansionAvailabilityRem}),
        airHolderDescriptionAvailabilityRem: new FormControl({disabled: false, value: item.airHolderDescriptionAvailabilityRem}),
        airMeshDescriptionAvailabilityRem: new FormControl({disabled: false, value: item.airMeshDescriptionAvailabilityRem}),
        flag: new FormControl({disabled: false, value: item.flag}),
        lpsVerticalAirTermination: this.formBuilder.array(this.retriveLpsVerticalAirTerminationData(item)),
        airMeshDescription: this.formBuilder.array(this.retriveAirMeshDescription(item)),
        airHolderDescription: this.formBuilder.array(this.retriveAirHolderDesc(item)),
        airClamps: this.formBuilder.array(this.retriveAirClamps(item)),
        airExpansion: this.formBuilder.array(this.retriveAirExpansion(item)),
        airConnectors: this.formBuilder.array(this.retriveAirConnectors(item)),
        airBasicDescription: this.formBuilder.array(this.retriveAirBasicDesc(item))
      });
    }

    // For Retriveing the DB
    retriveLpsVerticalAirTerminationData(item:any){
      let retriveLpsVerticalAirTerminationDataArr:any=[];
      for (let value of item.lpsVerticalAirTermination) {
        retriveLpsVerticalAirTerminationDataArr.push(this.createGroup(value,item.lpsAirDescId));   
      } 
      return retriveLpsVerticalAirTerminationDataArr;
    }

    retriveAirMeshDescription(item:any){
      let retriveLpsAirMeshDescriptionDataArr:any=[];
      for (let value of item.airMeshDescription) {
        retriveLpsAirMeshDescriptionDataArr.push(this.createGroup1(value,item.lpsAirDescId));   
      } 
      return retriveLpsAirMeshDescriptionDataArr;
    }

    retriveAirHolderDesc(item:any){
      let retriveLpsAirHolderDescriptionDataArr:any=[];
      for (let value of item.airHolderDescription) {
        retriveLpsAirHolderDescriptionDataArr.push(this.createGroup2(value,item.lpsAirDescId));   
      } 
      return retriveLpsAirHolderDescriptionDataArr;
    }

    retriveAirClamps(item:any){
      let retriveLpsAirClampsDataArr:any=[];
      for (let value of item.airClamps) {
        retriveLpsAirClampsDataArr.push(this.createGroup3(value,item.lpsAirDescId));   
      } 
      return retriveLpsAirClampsDataArr;
    }

    retriveAirExpansion(item:any){
      let retriveLpsAirExpansionDataArr:any=[];
      for (let value of item.airExpansion) {
        retriveLpsAirExpansionDataArr.push(this.createGroup4(value,item.lpsAirDescId));   
      } 
      return retriveLpsAirExpansionDataArr;
    }

    retriveAirConnectors(item:any){
      let retriveLpsAirConnectorsDataArr:any=[];
      for (let value of item.airConnectors) {
        retriveLpsAirConnectorsDataArr.push(this.createGroup5(value,item.lpsAirDescId));   
      } 
      return retriveLpsAirConnectorsDataArr;
    }

    retriveAirBasicDesc(item:any){
      let retriveairBasicDescriptionDataArr:any=[];
      for (let value of item.airBasicDescription) {
        retriveairBasicDescriptionDataArr.push(this.basicDetailsGroup(value,item.lpsAirDescId));   
      } 
      return retriveairBasicDescriptionDataArr;
    }

    basicDetailsGroup(item:any,lpsAirDescId: any){
      return this.formBuilder.group({
        airBasicDescriptionId: new FormControl({disabled: false, value: item.airBasicDescriptionId}),  
        lpsAirDescId: new FormControl({disabled: false, value: lpsAirDescId}),  
        consultantNameObserv:  new FormControl({disabled: false, value: item.consultantNameObserv}, Validators.required),
        consultantNameRemarks: new FormControl({disabled: false, value: item.consultantNameRemarks}),
        architectNameObserv:  new FormControl({disabled: false, value: item.architectNameObserv}, Validators.required),
        architectNameRemarks: new FormControl({disabled: false, value: item.architectNameRemarks}),
        designDateObserv:  new FormControl({disabled: false, value: item.designDateObserv}, Validators.required),
        designDateRemarks: new FormControl({disabled: false, value: item.designDateRemarks}),
        approvedByObserv:  new FormControl({disabled: false, value: item.approvedByObserv}, Validators.required),
        approvedByRemarks: new FormControl({disabled: false, value: item.approvedByRemarks}),
        dateOfApprovalOb:  new FormControl({disabled: false, value: item.dateOfApprovalOb}, Validators.required),
        dateOfApprovalRem: new FormControl({disabled: false, value: item.dateOfApprovalRem}),
        drawingObserv:  new FormControl({disabled: false, value: item.drawingObserv}, Validators.required),
        drawingRemarks: new FormControl({disabled: false, value: item.drawingRemarks}),
        revisionNoObserv:  new FormControl({disabled: false, value: item.revisionNoObserv}, Validators.required),
        revisionNoRemarks: new FormControl({disabled: false, value: item.revisionNoRemarks}),
        deviationObserv:  new FormControl({disabled: false, value: item.deviationObserv}, Validators.required),
        deviationRemarks: new FormControl({disabled: false, value: item.deviationRemarks}),
        deviationInstallationObserv:  new FormControl({disabled: false, value: item.deviationInstallationObserv}, Validators.required),
        deviationInstallationRemarks: new FormControl({disabled: false, value: item.deviationInstallationRemarks}),
        companyNameObserv:  new FormControl({disabled: false, value: item.companyNameObserv}, Validators.required),
        companyNameRemarks: new FormControl({disabled: false, value: item.companyNameRemarks}),
        connectionMadeBraOb:  new FormControl({disabled: false, value: item.connectionMadeBraOb}, Validators.required),
        connectionMadeBraRe: new FormControl({disabled: false, value: item.connectionMadeBraRe}),
        electricalEquipPlacedOb:  new FormControl({disabled: false, value: item.electricalEquipPlacedOb}, Validators.required),
        electricalEquipPlacedRe: new FormControl({disabled: false, value: item.electricalEquipPlacedRe}),
        combustablePartOb:  new FormControl({disabled: false, value: item.combustablePartOb}, Validators.required),
        combustablePartRe: new FormControl({disabled: false, value: item.combustablePartRe}),
        terminationMeshConductorOb:  new FormControl({disabled: false, value: item.terminationMeshConductorOb}, Validators.required),
        terminationMeshConductorRe: new FormControl({disabled: false, value: item.terminationMeshConductorRe}),
        bondingEquipotentialOb:  new FormControl({disabled: false, value: item.bondingEquipotentialOb}, Validators.required),
        bondingEquipotentialRe: new FormControl({disabled: false, value: item.bondingEquipotentialRe}),
        flag: new FormControl({disabled: false, value: item.flag}),
      });
    }

    createGroup(item: any,lpsAirDescId: any): FormGroup {
      return this.formBuilder.group({
      lpsVerticalAirTerminationId: new FormControl({disabled: false, value: item.lpsVerticalAirTerminationId}),
      lpsAirDescId: new FormControl({disabled: false, value: lpsAirDescId}),
      physicalInspectionOb: new FormControl({disabled: false, value: item.physicalInspectionOb}, Validators.required),
      physicalInspectionRe: new FormControl({disabled: false, value: item.physicalInspectionRe}),
      totalNumberOb: new FormControl({disabled: false, value: item.totalNumberOb}, Validators.required),
      totalNumberRe: new FormControl({disabled: false, value: item.totalNumberRe}),
      inspNoOb: new FormControl({disabled: false, value: item.inspNoOb}, Validators.required),
      inspNoRe: new FormControl({disabled: false, value: item.inspNoRe}),
      inspPassedNoOb: new FormControl({disabled: false, value: item.inspPassedNoOb}, Validators.required),
      inspPassedNoRe: new FormControl({disabled: false, value: item.inspPassedNoRe}),
      inspFaileddNoOb: new FormControl({disabled: false, value: item.inspFaileddNoOb}, Validators.required),
      inspFaileddNoRe: new FormControl({disabled: false, value: item.inspFaileddNoRe}),
      flag: new FormControl({disabled: false, value: item.flag}),
      verticalAirTerminationList: this.formBuilder.array(this.populateVerticalList(item,lpsAirDescId))
      });
    }

    populateVerticalList(item:any,lpsAirDescId: any){
      let verticalAirListArr:any=[];
      for (let value of item.verticalAirTerminationList) {
        verticalAirListArr.push(this.populateVATListGroup(value,lpsAirDescId));   
      } 
      return verticalAirListArr;
    }

    populateVATListGroup(item: any,lpsAirDescId: any): FormGroup {
      return this.formBuilder.group({
      verticalAirTerminationListId: new FormControl({disabled: false, value: item.verticalAirTerminationListId}),
      lpsAirDescId: new FormControl({disabled: false, value: lpsAirDescId}),
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
      flag: new FormControl({disabled: false, value: item.flag})
      });
    }


    createGroup1(item: any,lpsAirDescId: any): FormGroup {
      return this.formBuilder.group({
        meshDescriptionId: new FormControl({disabled: false, value: item.meshDescriptionId}),
        lpsAirDescId: new FormControl({disabled: false, value: lpsAirDescId}),
        physicalInspectionOb: new FormControl({disabled: false, value: item.physicalInspectionOb}, Validators.required),
        physicalInspectionRe: new FormControl({disabled: false, value: item.physicalInspectionRe}),
        materailOfConductorOb: new FormControl({disabled: false, value: item.materailOfConductorOb}, Validators.required),
        materailOfConductorRem: new FormControl({disabled: false, value: item.materailOfConductorRem}),
        sizeOfConductorOb: new FormControl({disabled: false, value: item.sizeOfConductorOb}, Validators.required),
        sizeOfConductorRe: new FormControl({disabled: false, value: item.sizeOfConductorRe}),
        meshSizeOb: new FormControl({disabled: false, value: item.meshSizeOb}, Validators.required),
        meshSizeRe: new FormControl({disabled: false, value: item.meshSizeRe}),
        maximumDistanceXOb: new FormControl({disabled: false, value: item.maximumDistanceXOb}, Validators.required),
        maximumDistanceXRe: new FormControl({disabled: false, value: item.maximumDistanceXRe}),
        maximumDistanceYOb: new FormControl({disabled: false, value: item.maximumDistanceYOb}, Validators.required),
        maximumDistanceYRe: new FormControl({disabled: false, value: item.maximumDistanceYRe}),
        minimumDistanceXOb: new FormControl({disabled: false, value: item.minimumDistanceXOb}, Validators.required),
        minimumDistanceXRe: new FormControl({disabled: false, value: item.minimumDistanceXRe}),
        minimumDistanceYOb: new FormControl({disabled: false, value: item.minimumDistanceYOb}, Validators.required),
        minimumDistanceYRe: new FormControl({disabled: false, value: item.minimumDistanceYRe}),
        heightOfConductorFlatSurfaceOb: new FormControl({disabled: false, value: item.heightOfConductorFlatSurfaceOb}, Validators.required),
        heightOfConductorFlatSurfaceRe: new FormControl({disabled: false, value: item.heightOfConductorFlatSurfaceRe}),
        flag: new FormControl({disabled: false, value: item.flag}),
      });
    }

    createGroup2(item: any,lpsAirDescId: any): FormGroup {
      return this.formBuilder.group({
        holderDescriptionId: new FormControl({disabled: false, value: item.holderDescriptionId}),
        lpsAirDescId: new FormControl({disabled: false, value: lpsAirDescId}),
        physicalInspectionOb: new FormControl({disabled: false, value: item.physicalInspectionOb}, Validators.required),
        physicalInspectionRe: new FormControl({disabled: false, value: item.physicalInspectionRe}), 
        conductorHolderFlatSurfaceOb: new FormControl({disabled: false, value: item.conductorHolderFlatSurfaceOb}, Validators.required),
        conductorHolderFlatSurfaceRe: new FormControl({disabled: false, value: item.conductorHolderFlatSurfaceRe}), 
        conductorHolderOb: new FormControl({disabled: false, value: item.conductorHolderOb}, Validators.required),
        conductorHolderRe: new FormControl({disabled: false, value: item.conductorHolderRe}),               
        totalParpetHolderNoOb: new FormControl({disabled: false, value: item.totalParpetHolderNoOb}, Validators.required),
        totalParpetHolderNoRe: new FormControl({disabled: false, value: item.totalParpetHolderNoRe}), 
        materailOfParpetHolderOb: new FormControl({disabled: false, value: item.materailOfParpetHolderOb}, Validators.required),
        materailOfParpetHolderRem: new FormControl({disabled: false, value: item.materailOfParpetHolderRem}),      
        parpetInspectionNoOb: new FormControl({disabled: false, value: item.parpetInspectionNoOb}, Validators.required),
        parpetInspectionNoRe: new FormControl({disabled: false, value: item.parpetInspectionNoRe}), 
        parpetInspectionPassedNoOb: new FormControl({disabled: false, value: item.parpetInspectionPassedNoOb}, Validators.required),
        parpetInspectionPassedNoRe: new FormControl({disabled: false, value: item.parpetInspectionPassedNoRe}),        
        parpetInspectionFailedNoOb: new FormControl({disabled: false, value: item.parpetInspectionFailedNoOb}, Validators.required),
        parpetInspectionFailedNoRe: new FormControl({disabled: false, value: item.parpetInspectionFailedNoRe}),
        flag: new FormControl({disabled: false, value: item.flag}),
        airHolderList: this.formBuilder.array(this.popuateHolderList(item,lpsAirDescId))
      });
    }

    popuateHolderList(item:any,lpsAirDescId: any){
      let HolderListArr:any=[];
      for (let value of item.airHolderList) {
        HolderListArr.push(this.populateHolderListGroup(value,lpsAirDescId));   
      } 
      return HolderListArr;
    }

    populateHolderListGroup(item: any,lpsAirDescId: any): FormGroup {
      return this.formBuilder.group({
        holderListId: new FormControl({disabled: false, value: item.holderListId}),
        lpsAirDescId: new FormControl({disabled: false, value: lpsAirDescId}),
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
        flag: new FormControl({disabled: false, value: item.flag})
      });
    }

    createGroup3(item: any,lpsAirDescId: any): FormGroup {
      return this.formBuilder.group({
        clampsId: new FormControl({disabled: false, value: item.clampsId}),
        lpsAirDescId: new FormControl({disabled: false, value: lpsAirDescId}),
        physicalInspectionOb: new FormControl({disabled: false, value: item.physicalInspectionOb}, Validators.required),
        physicalInspectionRe: new FormControl({disabled: false, value: item.physicalInspectionRe}),
        conductorClampsFlatSurafaceOb: new FormControl({disabled: false, value: item.conductorClampsFlatSurafaceOb}, Validators.required),
        conductorClampsFlatSurafaceRe: new FormControl({disabled: false, value: item.conductorClampsFlatSurafaceRe}),
        interConnectionOfClampsOb: new FormControl({disabled: false, value: item.interConnectionOfClampsOb}, Validators.required),
        interConnectionOfClampsRe: new FormControl({disabled: false, value: item.interConnectionOfClampsRe}),
        clampTypeOb: new FormControl({disabled: false, value: item.clampTypeOb}, Validators.required),
        clampTypRe: new FormControl({disabled: false, value: item.clampTypRe}),
        materialOfWallClampsOb: new FormControl({disabled: false, value: item.materialOfWallClampsOb}, Validators.required),
        materialOfWallClampsRe: new FormControl({disabled: false, value: item.materialOfWallClampsRe}),
        materialOfFoldingClampsOb: new FormControl({disabled: false, value: item.materialOfFoldingClampsOb}, Validators.required),
        materialOfFoldingClampsRe: new FormControl({disabled: false, value: item.materialOfFoldingClampsRe}),
        totalClampsNoOb: new FormControl({disabled: false, value: item.totalClampsNoOb}, Validators.required),
        totalClampsNoRe: new FormControl({disabled: false, value: item.totalClampsNoRe}),
        inspectionNoOb: new FormControl({disabled: false, value: item.inspectionNoOb}, Validators.required),
        inspectionNoRe: new FormControl({disabled: false, value: item.inspectionNoRe}),
        inspectionPassedOb: new FormControl({disabled: false, value: item.inspectionPassedOb}, Validators.required),
        inspectionPassedRe: new FormControl({disabled: false, value: item.inspectionPassedRe}),
        inspectionFailedReOb: new FormControl({disabled: false, value: item.inspectionFailedReOb}, Validators.required),
        inspectionFailedReRe: new FormControl({disabled: false, value: item.inspectionFailedReRe}),
        flag: new FormControl({disabled: false, value: item.flag}),
      });
    }

    createGroup4(item: any,lpsAirDescId: any): FormGroup {
      return this.formBuilder.group({
        expansionId: new FormControl({disabled: false, value: item.expansionId}),
        lpsAirDescId: new FormControl({disabled: false, value: lpsAirDescId}),
        physicalInspectionOb: new FormControl({disabled: false, value: item.physicalInspectionOb}, Validators.required),
        physicalInspectionRe: new FormControl({disabled: false, value: item.physicalInspectionRe}),
        strightConnectorPiecOb: new FormControl({disabled: false, value: item.strightConnectorPiecOb}, Validators.required),
        strightConnectorPiecRe: new FormControl({disabled: false, value: item.strightConnectorPiecRe}),
        materialOfExpansionOb: new FormControl({disabled: false, value: item.materialOfExpansionOb}, Validators.required),
        materialOfExpansionRe: new FormControl({disabled: false, value: item.materialOfExpansionRe}),
        materialOfConnectorOb: new FormControl({disabled: false, value: item.materialOfConnectorOb}, Validators.required),
        materialOfConnectorRe: new FormControl({disabled: false, value: item.materialOfConnectorRe}),
        intervalBwExpansionOb: new FormControl({disabled: false, value: item.intervalBwExpansionOb}, Validators.required),
        intervalBwExpansionRe: new FormControl({disabled: false, value: item.intervalBwExpansionRe}),
        totalNoExpansionOb: new FormControl({disabled: false, value: item.totalNoExpansionOb}, Validators.required),
        totalNoExpansionRe: new FormControl({disabled: false, value: item.totalNoExpansionRe}),
        inspectionNoOb: new FormControl({disabled: false, value: item.inspectionNoOb}, Validators.required),
        inspectionNoRe: new FormControl({disabled: false, value: item.inspectionNoRe}),
        inspectionPassedNoOb: new FormControl({disabled: false, value: item.inspectionPassedNoOb}, Validators.required),
        inspectionPassedNoRe: new FormControl({disabled: false, value: item.inspectionPassedNoRe}),
        inspectionFailedNoOb: new FormControl({disabled: false, value: item.inspectionFailedNoOb}, Validators.required),
        inspectionFailedNoRe: new FormControl({disabled: false, value: item.inspectionFailedNoRe}),
        flag: new FormControl({disabled: false, value: item.flag}),
      });
    }


    createGroup5(item: any,lpsAirDescId: any): FormGroup {
      return this.formBuilder.group({
        connectorId: new FormControl({disabled: false, value: item.connectorId}),
        lpsAirDescId: new FormControl({disabled: false, value: lpsAirDescId}),
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
        inspectionFailedRe: new FormControl({disabled: false, value: item.inspectionFailedRe}),    
        flag: new FormControl({disabled: false, value: item.flag}),
      });
    }

    changeBuildingType(e: any,q: any) {
      let changedValue;
      if(e.target != undefined) {
        changedValue = e.target.value;
      }
      else{
        changedValue = e;
      }
      if(changedValue == 'Others') {
        q.controls.buildingTypeOthers.setValidators([Validators.required]);
        q.controls.buildingTypeOthers.updateValueAndValidity();
      }
      else{
        q.controls.buildingTypeOthers.clearValidators();
        q.controls.buildingTypeOthers.updateValueAndValidity();
      }
    }

    onChangeBasic(event: any,a:any) {
      this.airTerminationForm.markAsTouched();
      let changedValue;
      if(event.target != undefined) {
        changedValue = event.target.value;
      }
      else{
        changedValue = event;
      }
      let basicArray: any = [];
      basicArray =  a.controls.airBasicDescription as FormArray;
      if (changedValue == 'Not available') {    
        if(basicArray.length>0) {
          if(this.flag && basicArray.value[0].airBasicDescriptionId !=null && basicArray.value[0].airBasicDescriptionId !='' && basicArray.value[0].airBasicDescriptionId !=undefined){
            basicArray.value[0].flag ='R';
            this.deletedAirBasicArr.push(basicArray.value[0]);
          }
          basicArray.removeAt(basicArray.length-1)    
        }
      // for(let x in a.controls){
      //   console.log(x);
      //   a.controls[x].clearValidators();
      //   a.controls[x].updateValueAndValidity();
      // }
       // a.controls['physicalInspectionOb'].clearValidators();
       // a.controls['physicalInspectionOb'].updateValueAndValidity();
      }
      else if(changedValue == 'Available'){
        if(basicArray.length == 0) {
          basicArray.push(this.createLpsDescriptionarr());
        }
       // a.controls['physicalInspectionOb'].setValidators([Validators.required]);
        //a.controls['physicalInspectionOb'].updateValueAndValidity();   
      }
      this.airTerminationForm.markAsDirty();

    }

    onChangeAir(event: any,a:any) {
      this.airTerminationForm.markAsTouched();

      let changedValue;
      if(event.target != undefined) {
        changedValue = event.target.value;
      }
      else{
        changedValue = event;
      }
      let vatArray: any = [];
      vatArray =  a.controls.lpsVerticalAirTermination as FormArray;
      if (changedValue == 'Not applicable') {
        if(vatArray.length>0) {
          if(this.flag && vatArray.value[0].lpsVerticalAirTerminationId !=null && vatArray.value[0].lpsVerticalAirTerminationId !='' && vatArray.value[0].lpsVerticalAirTerminationId !=undefined){
            vatArray.value[0].flag ='R';
            this.deletedAirTerminationArr.push(vatArray.value[0]);
          }
          vatArray.removeAt(vatArray.length-1)    
        }
      }
      else if(changedValue == 'Applicable'){
        if(vatArray.length == 0) {
          vatArray.push(this.createVatArrForm());
        }
      }

      this.airTerminationForm.markAsDirty();
    }

    onChangeMesh(event: any,a:any) {
      this.airTerminationForm.markAsTouched();
      let changedValue;
      if(event.target != undefined) {
        changedValue = event.target.value;
      }
      else{
        changedValue = event;
      }
      let meshArray: any = [];
      meshArray =  a.controls.airMeshDescription as FormArray;
      if (changedValue == 'Not applicable') {
        if(meshArray.length>0) {
          if(this.flag && meshArray.value[0].meshDescriptionId !=null && meshArray.value[0].meshDescriptionId !='' && meshArray.value[0].meshDescriptionId !=undefined){
            meshArray.value[0].flag ='R';
            this.deletedAirMeshArr.push(meshArray.value[0]);
          }
          meshArray.removeAt(meshArray.length-1)    
        }
      }
      else if(changedValue == 'Applicable'){
        if(meshArray.length == 0) {
          meshArray.push(this.createMeshArrForm());
        }
      }
      this.airTerminationForm.markAsDirty();

    }

    onChangeHolders(event: any,a:any) {
      this.airTerminationForm.markAsTouched();
      let changedValue;
      if(event.target != undefined) {
        changedValue = event.target.value;
      }
      else{
        changedValue = event;
      }
      let holdersArray: any = [];
      holdersArray =  a.controls.airHolderDescription as FormArray;
      if (changedValue == 'Not applicable') {
        if(holdersArray.length>0) {
          if(this.flag && holdersArray.value[0].holderDescriptionId !=null && holdersArray.value[0].holderDescriptionId !='' && holdersArray.value[0].holderDescriptionId !=undefined){
            holdersArray.value[0].flag ='R';
            this.deletedHoldersArr.push(holdersArray.value[0]);
          }
          holdersArray.removeAt(holdersArray.length-1)    
        }
      }
      else if(changedValue == 'Applicable'){
        if(holdersArray.length == 0) {
          holdersArray.push(this.createHolderArrForm());
        }
      }
      this.airTerminationForm.markAsDirty();

    }

    onChangeClamps(event: any,a:any) {
      this.airTerminationForm.markAsTouched();
      let changedValue;
      if(event.target != undefined) {
        changedValue = event.target.value;
      }
      else{
        changedValue = event;
      }
      let clampsArray: any = [];
      clampsArray =  a.controls.airClamps as FormArray;
      if (changedValue == 'Not applicable') {
        if(clampsArray.length>0) {
          if(this.flag && clampsArray.value[0].clampsId !=null && clampsArray.value[0].clampsId !='' && clampsArray.value[0].clampsId !=undefined){
            clampsArray.value[0].flag ='R';
            this.deletedAirClampsArr.push(clampsArray.value[0]);
          }
          clampsArray.removeAt(clampsArray.length-1)    
        }
      }
      else if(changedValue == 'Applicable'){
        if(clampsArray.length == 0) {
          clampsArray.push(this.createClampArrForm());
        }
      }
      this.airTerminationForm.markAsDirty();
    }

    onChangeExpansion(event: any,a:any) {
      this.airTerminationForm.markAsTouched();
      let changedValue;
      if(event.target != undefined) {
        changedValue = event.target.value;
      }
      else{
        changedValue = event;
      }
      let expansionArray: any = [];
      expansionArray =  a.controls.airExpansion as FormArray;
      if (changedValue == 'Not applicable') {
        if(expansionArray.length>0) {
          if(this.flag && expansionArray.value[0].expansionId !=null && expansionArray.value[0].expansionId !='' && expansionArray.value[0].expansionId !=undefined){
            expansionArray.value[0].flag ='R';
            this.deletedExpansionArr.push(expansionArray.value[0]);
          }
          expansionArray.removeAt(expansionArray.length-1)    
        }
      }
      else if(changedValue == 'Applicable'){
        if(expansionArray.length == 0) {
          expansionArray.push(this.createExpansioArrForm());
        }
      }
      this.airTerminationForm.markAsDirty();
    }

    onChangeConnectors(event: any,a:any) {
      this.airTerminationForm.markAsTouched();
      let changedValue;
      if(event.target != undefined) {
        changedValue = event.target.value;
      }
      else{
        changedValue = event;
      }
      let connectorsArray: any = [];
      connectorsArray =  a.controls.airConnectors as FormArray;
      if (changedValue == 'Not applicable') {
        if(connectorsArray.length>0) {
          if(this.flag && connectorsArray.value[0].connectorId !=null && connectorsArray.value[0].connectorId !='' && connectorsArray.value[0].connectorId !=undefined){
            connectorsArray.value[0].flag ='R';
            this.deletedAirConnectorsArr.push(connectorsArray.value[0]);
          }
          connectorsArray.removeAt(connectorsArray.length-1)    
        }
      }
      else if(changedValue == 'Applicable'){
        if(connectorsArray.length == 0) {
          connectorsArray.push(this.createConArrForm());
        }
      }
      this.airTerminationForm.markAsDirty();
    }

    validationChange(event: any,q: any,formControl: any) {
      let arr: any = [];
      arr = q.controls.airBasicDescription as FormArray;
      if(event.target.value == 'Yes') {
        arr.controls[0].controls[formControl].setValidators([Validators.required]);
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
      else {
        arr.controls[0].controls[formControl].clearValidators();
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
    }

    validationChangeNo(event: any,q: any,formControl: any) {
      let arr: any = [];
      arr = q.controls.airBasicDescription as FormArray;
      if(event.target.value == 'No') {
        arr.controls[0].controls[formControl].setValidators([Validators.required]);
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
      else {
        arr.controls[0].controls[formControl].clearValidators();
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
    }


    validationChangeVat(event: any,q: any,formControl: any) {
      let arr: any = [];
      arr = q.controls.lpsVerticalAirTermination as FormArray;
      if(event.target.value == 'not good') {
        arr.controls[0].controls[formControl].setValidators([Validators.required]);
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
      else {
        arr.controls[0].controls[formControl].clearValidators();
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
    }

    validationChangeVatList(event: any,z: any,formControl: any) {
      
      if(event.target.value == 'Not protected') {
        z.controls[formControl].setValidators([Validators.required]);
        z.controls[formControl].updateValueAndValidity();
      }
      else if(event.target.value == 'No') {
        z.controls[formControl].setValidators([Validators.required]);
        z.controls[formControl].updateValueAndValidity();
      }
      else {
        z.controls[formControl].clearValidators();
        z.controls[formControl].updateValueAndValidity();
      }
    }

    loadMaterialVat(event: any,z: any,formControl: any) {
        if(event.target.value == 'ESE') {
          z.controls[formControl].setValue('ESE rod are not recommended as per latest standard IS/IEC 62305 and banned in NBC 2016');
        }
        else {
          z.controls[formControl].setValue('');  
        }
    }

    validationChangeVatFailed(event: any,q: any,formControl: any) {
      let arr: any = [];
      arr = q.controls.lpsVerticalAirTermination as FormArray;
      if(event.target.value != '' && event.target.value != 0) {
        arr.controls[0].controls[formControl].setValidators([Validators.required]);
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
      else {
        arr.controls[0].controls[formControl].clearValidators();
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
    }

    validationChangeMesh(event: any,q: any,formControl: any) {
      let arr: any = [];
      arr = q.controls.airMeshDescription as FormArray;
      if(event.target.value == 'Not good') {
        arr.controls[0].controls[formControl].setValidators([Validators.required]);
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
      else {
        arr.controls[0].controls[formControl].clearValidators();
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
    }

    validationChangeHolder(event: any,q: any,formControl: any) {
      let arr: any = [];
      arr = q.controls.airHolderDescription as FormArray;
      if(event.target.value == 'Not good') {
        arr.controls[0].controls[formControl].setValidators([Validators.required]);
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
      else if(event.target.value == 'No') {
        arr.controls[0].controls[formControl].setValidators([Validators.required]);
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
      else {
        arr.controls[0].controls[formControl].clearValidators();
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
    }

    validationChangeHolderList(event: any,h: any,formControl: any) {    
      if(event.target.value != '' && event.target.value != 0) {
        h.controls[formControl].setValidators([Validators.required]);
        h.controls[formControl].updateValueAndValidity();
      }
      else {
        h.controls[formControl].clearValidators();
        h.controls[formControl].updateValueAndValidity();
      }
    }

    ChangeParapetHolder(e: any,a: any) {
      if(e.target.value == 'Not applicable') {
        a.controls.totalParpetHolderNoOb.setValue('');
        a.controls.totalParpetHolderNoRe.setValue('');

        a.controls.parpetInspectionNoOb.setValue('');
        a.controls.parpetInspectionNoRe.setValue('');

        a.controls.parpetInspectionPassedNoOb.setValue('');
        a.controls.parpetInspectionPassedNoRe.setValue('');

        a.controls.parpetInspectionFailedNoOb.setValue('');
        a.controls.parpetInspectionFailedNoRe.setValue('');
      }
    }


    validationChangeHolderKey(event: any,q: any,formControl: any) {
      let arr: any = [];
      arr = q.controls.airHolderDescription as FormArray;
      if(event.target.value != '' && event.target.value != 0) {
        arr.controls[0].controls[formControl].setValidators([Validators.required]);
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
      else {
        arr.controls[0].controls[formControl].clearValidators();
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
    }

    validationChangeClamps(event: any,q: any,formControl: any) {
      let arr: any = [];
      arr = q.controls.airClamps as FormArray;
      if(event.target.value == 'Not good') {
        arr.controls[0].controls[formControl].setValidators([Validators.required]);
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
      else if(event.target.value == 'No') {
        arr.controls[0].controls[formControl].setValidators([Validators.required]);
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
      else {
        arr.controls[0].controls[formControl].clearValidators();
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
    }

    validationChangeClampsKey(event: any,q: any,formControl: any) {
      let arr: any = [];
      arr = q.controls.airClamps as FormArray;
      if(event.target.value != '' && event.target.value != 0) {
        arr.controls[0].controls[formControl].setValidators([Validators.required]);
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
      else {
        arr.controls[0].controls[formControl].clearValidators();
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
    }

    validationChangeExpansion(event: any,q: any,formControl: any) {
      let arr: any = [];
      arr = q.controls.airExpansion as FormArray;
      if(event.target.value == 'Not good') {
        arr.controls[0].controls[formControl].setValidators([Validators.required]);
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
      else if(event.target.value == 'No') {
        arr.controls[0].controls[formControl].setValidators([Validators.required]);
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
      else {
        arr.controls[0].controls[formControl].clearValidators();
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
    }

    validationChangeExpansionKey(event: any,q: any,formControl: any) {
      let arr: any = [];
      arr = q.controls.airExpansion as FormArray;
      if(event.target.value != '' && event.target.value != 0) {
        arr.controls[0].controls[formControl].setValidators([Validators.required]);
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
      else {
        arr.controls[0].controls[formControl].clearValidators();
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
    }

    validationChangeConnectors(event: any,q: any,formControl: any) {
      let arr: any = [];
      arr = q.controls.airConnectors as FormArray;
      if(event.target.value == 'Not good') {
        arr.controls[0].controls[formControl].setValidators([Validators.required]);
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
      else {
        arr.controls[0].controls[formControl].clearValidators();
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
    }

    validationChangeConnectorsKey(event: any,q: any,formControl: any) {
      let arr: any = [];
      arr = q.controls.airConnectors as FormArray;
      if(event.target.value != '' && event.target.value != 0) {
        arr.controls[0].controls[formControl].setValidators([Validators.required]);
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
      else {
        arr.controls[0].controls[formControl].clearValidators();
        arr.controls[0].controls[formControl].updateValueAndValidity();
      }
    }
    

    // Parent Array Controls:
    overAllControl(): AbstractControl[] {
      return(<FormArray>this.airTerminationForm.get('lpsAirDescription')).controls;
    }

    getDescriptionControl(form:any) {
        //return (<FormArray>this.airTerminationForm.get('airBasicDescription')).controls;
        return form.controls.airBasicDescription?.controls;
    }

    vatControls(form:any) {
      return form.controls.lpsVerticalAirTermination?.controls;
    }
    getAirTUnitControls(form:any) {
      return form.controls.verticalAirTerminationList?.controls;
    }
    getAirHolderControls(form:any) {
      return form.controls.airHolderList?.controls;
    }
    meshControls(form:any) {
      return form.controls.airMeshDescription?.controls;
    }

    holdersContols(form:any) {
      return form.controls.airHolderDescription?.controls;
    }

    clampsControls(form:any) {
      return form.controls.airClamps?.controls;
    }

    expansionControls(form:any) {
      return form.controls.airExpansion?.controls;
    }

    connectorsControls(form:any) {
      return form.controls.airConnectors?.controls;
    }


    get f() {
      return this.airTerminationForm.controls;
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

    retriveAirTermination(){
      this.airterminationServices.retriveAirTerminationDetails(this.router.snapshot.paramMap.get('email') || '{}',this.basicLpsId).subscribe(
        data => {
          this.retrieveDetailsfromSavedReports1(this.airtermination.userName,this.basicLpsId,this.ClientName,data);
        },
        error=>{
        }
      );  
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
        this.airtermination.lpsAirDescription = this.airTerminationForm.value.lpsAirDescription
        
          if (!this.validationError) {
            if(flag) {
              if(this.airTerminationForm.dirty && this.airTerminationForm.touched){ 
                //Main Lps Description
                if(this.deletedLpsDescArr.length != 0) {
                  for(let i of this.deletedLpsDescArr) {
                    this.airtermination.lpsAirDescription.push(i);
                  }
                }
                
                //Basic Desc
                for(let i of this.deletedAirBasicArr) {
                  for(let j of this.airtermination.lpsAirDescription) {
                    if(i.lpsAirDescId == j.lpsAirDescId) {
                      j.airBasicDescription.push(i);
                    }
                  }
                }
                
                //Air termination
                for(let i of this.deletedAirTerminationArr) {
                  for(let j of this.airtermination.lpsAirDescription) {
                    if(i.lpsAirDescId == j.lpsAirDescId) {
                      j.lpsVerticalAirTermination.push(i);
                    }
                  }
                }

                //Mesh Desc
                for(let i of this.deletedAirMeshArr) {
                  for(let j of this.airtermination.lpsAirDescription) {
                    if(i.lpsAirDescId == j.lpsAirDescId) {
                      j.airMeshDescription.push(i);
                    }
                  }
                }

                //Clamps
                for(let i of this.deletedAirClampsArr) {
                  for(let j of this.airtermination.lpsAirDescription) {
                    if(i.lpsAirDescId == j.lpsAirDescId) {
                      j.airClamps.push(i);
                    }
                  }
                }

                //Holders
                for(let i of this.deletedHoldersArr) {
                  for(let j of this.airtermination.lpsAirDescription) {
                    if(i.lpsAirDescId == j.lpsAirDescId) {
                      j.airHolderDescription.push(i);
                    }
                  }
                }

                //Expansion
                for(let i of this.deletedExpansionArr) {
                  for(let j of this.airtermination.lpsAirDescription) {
                    if(i.lpsAirDescId == j.lpsAirDescId) {
                      j.airExpansion.push(i);
                    }
                  }
                }

                //Connectors
                for(let i of this.deletedAirConnectorsArr) {
                  for(let j of this.airtermination.lpsAirDescription) {
                    if(i.lpsAirDescId == j.lpsAirDescId) {
                      j.airConnectors.push(i);
                    }
                  }
                }

                //AirTermination List
                for(let i of this.deletedAirTerminationListArr) {
                  for(let j of this.airtermination.lpsAirDescription) {
                    for(let k of j.lpsVerticalAirTermination) {
                        if(i.lpsAirDescId == k.lpsAirDescId) {
                          k.verticalAirTerminationList.push(i);
                        }
                    }
                  }
                }

                //Holders List
                for(let i of this.deletedHoldersListArr) {
                  for(let j of this.airtermination.lpsAirDescription) {
                    for(let k of j.airHolderDescription) {
                        if(i.lpsAirDescId == k.lpsAirDescId) {
                          k.airHolderList.push(i);
                        }
                    }
                  }
                }

              this.airterminationService.updateAirtermination(this.airtermination).subscribe(
                (data) => {
                  this.success1 = false;
                  this.downConductorServices.retrieveDownConductor(this.airtermination.userName,this.airtermination.basicLpsId,).subscribe(
                    (data) => {
                      this.proceedNext.emit(false);
                    },
                    (error) => {
                      this.proceedNext.emit(true);
                    }
                  )
                  this.success = true;
                  this.successMsg = data;
                  this.airTerminationForm.markAsPristine();
                  this.service.lvClick=0;
                  this.service.logoutClick=0;
                  this.service.windowTabClick=0;
                  this.retriveAirTermination();
                  this.isAirterminationUpdated=true
                  // setTimeout(() => {
                  //   this.proceedNext.emit(true);
                  // }, 4000);
                },
                (error) => {
                  this.success1 = false;
                  this.Error = true;
                  this.errorArr = [];
                  this.errorArr = JSON.parse(error.error);
                  this.errorMsg = this.errorArr.message;
                  //this.proceedNext.emit(false);
                });}
                else{
                  if(this.isEditable){
                    this.success = true;
                    //this.proceedNext.emit(true);
                  }
                  // Dirty checking here
                  else{
                    
                    this.success = true;
                    //this.proceedNext.emit(true);
                  }
                }
            }
            else {
                this.airterminationService.saveAirtermination(this.airtermination).subscribe(
                  (data) => {
                    this.success = true;
                    this.isAirterminationUpdated=true
                    this.proceedNext.emit(true);
                    this.successMsg = data;
                    this.disable = true;
                    this.proceedFlag = false;
                    this.retriveAirTermination();
                    // setTimeout(() => {
                    //   this.proceedNext.emit(true);
                    // }, 4000);
                    this.service.lvClick=0;
                    this.service.logoutClick=0;
                    this.service.windowTabClick=0;
                  },
                  (error) => {
                    this.Error = true;
                    this.errorArr = [];
                    this.errorArr = JSON.parse(error.error);
                    this.errorMsg = this.errorArr.message;
                    this.proceedFlag = true;
                    //this.proceedNext.emit(false);
                  });
            }
          }
    }
}
