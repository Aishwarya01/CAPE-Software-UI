import {Component,EventEmitter,OnInit,Output,ElementRef,ViewChild, OnDestroy} from '@angular/core';
import {AbstractControl,FormArray,FormBuilder,FormControl,FormGroup,Validators,} from '@angular/forms';
import {Supplycharacteristics,Supplyparameters,} from '../model/supplycharacteristics';
import { SupplyCharacteristicsService } from '../services/supply-characteristics.service';
import { GlobalsService } from '../globals.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SiteService } from '../services/site.service';
import { InspectionVerificationService } from '../services/inspection-verification.service';
import { MainNavComponent } from '../main-nav/main-nav.component';
import { CommentsSection } from '../model/comments-section';
import { InspectionVerificationBasicInformationComponent } from '../inspection-verification-basic-information/inspection-verification-basic-information.component';
import { MatDialog } from '@angular/material/dialog';
import { ObservationService } from '../services/observation.service';
import { SummarydetailsService } from '../services/summarydetails.service';
import { TestingService } from '../services/testing.service';
// import { ObservationSupply } from '../model/observation-supply';

@Component({
  selector: 'app-inspection-verification-supply-characteristics',
  templateUrl:
    './inspection-verification-supply-characteristics.component.html',
  styleUrls: ['./inspection-verification-supply-characteristics.component.css'],
})
export class InspectionVerificationSupplyCharacteristicsComponent
  implements OnInit,OnDestroy
{

  a: any;
  supplyparameters = new Supplyparameters();
  //observation= new ObservationSupply;
  supplycharesteristic = new Supplycharacteristics();
  enableAC: boolean = false;
  enableDC: boolean = false;
  tableAC: boolean = false;
  enable2AC: boolean = false;
  enable2DC: boolean = false;
  table2AC: boolean = false;
  showAlternate: boolean = false;
  location1Arr!: FormArray;
  locationArr: any = [];
  boundingArr: any = [];
  earthingArr: any = [];
  location2Arr!: FormArray;
  arr1: any = [];
  arr2: any = [];
  arr3: any = [];
  alArr: any = [];
  circuitB:any=[];
  location3Arr!: FormArray;
  alternateArr!: FormArray;
  circuitArr!: FormArray;
  conPusharr: any = [];
  alternateArr1: any = [];
  circuitArr1: any = [];
  i: any;
  j: any;
  k: any;
  delarr: any;
  delarr1: any;
  values: any;
  value: any;
  loclength: any;
  loc1length: any;
  email: String = '';
  loading = false;
  submitted = false;
  flag: boolean=false;

  @Output() proceedNext = new EventEmitter<any>();

  @Output() summaryNext = new EventEmitter<{siteId: any,summaryData: any,flag: boolean}>();

  mainArr1: any = [];
  mainArr2: any = [];
  mainArr3: any = [];
  mainArr4: any = [];
  mainArr5: any = [];

  isSupplyCompleted: boolean = false;
  validationError: boolean = false;
  validationErrorMsg: String = '';
  disable: boolean = false;
  alternativeSupplyNo: boolean =false;

  NV1: any;
  NV2: any;
  NV3: any;
  NV4: any;
  NV5: any;
  NV6: any;
  NV7: any;
  NV8: any;
  NV9: any;

  NF1: any;
  // NF2: any;
  // NF3: any;
  // NF4: any;
  // NF5: any;
  // NF6: any;
  // NF7: any;
  // NF8: any;
  // NF9: any;

  PF1: any;
  PF2: any;
  PF3: any;
  PF4: any;
  PF5: any;
  PF6: any;
  PF7: any;
  PF8: any;
  PF9: any;

  EL1: any;
  EL2: any;
  EL3: any;
  EL4: any;
  EL5: any;
  EL6: any;
  EL7: any;
  EL8: any;
  EL9: any;

  AL1: any;
  AL2: any;
  AL3: any;
  AL4: any;
 

  nominalVoltageArr: any = [];
  nominalVoltage: String = '';

  nominalFrequencyArr: any = [];
  nominalFrequency: String = '';

  nominalCurrentArr: any = [];
  nominalCurrent: String = '';

  loopImpedenceArr: any = [];
  loopImpedence: String = '';

  actualLoadArr: any = [];
  actualLoad: String = '';

  // Alternate table array
  nominalVoltageArr1: any = [];
  locationElectrodeArr: any = [];

  panelOpenState = false;
  systemEarthingList: String[] = ['TN-C', 'TN-C-S', 'TN-S', 'IT', 'TT', 'Others'];
  liveConductorACList: String[] = [
    '1-phase, 2-wire (LN)',
    '1-phase, 3-wire (LLM)',
    '2-phase, 3-wire (LLN)',
    '3-phase, 3-wire (LLL)',
    '3-phase, 4-wire (LLLN)'
  ];
  liveConductorDCList: String[] = ['2-pole', '3-pole', 'Others'];
  AcConductorList: String[] = ['1-phase, 2-wire (LN)',
  '1-phase, 3-wire (LLM)',
  '2-phase, 3-wire (LLN)',
  '3-phase, 3-wire (LLL)',
  '3-phase, 4-wire (LLLN)'];
  ProtectiveDevicelist: string[] = ['Fuse', 'MCB', 'MCCB', 'ACB'];
  AlternatesupplyList: string[] = ['Yes', 'No'];
  MeansofEarthingList: string[] = [
    'Supplier facility', 'Installation earth electrode', 'Supplier facility and installation earth electrode','Others' 
  ];
  electrodeTypeList: string[] = [
    'Vertical',
    'Horizontal',
    'Vertical and Horizontal',
    'Ring', 'Foundation', 'TNS-PME'
  ];
  electrodeMaterialList: string[] = [
    'Copper',
    'Copperbonded  steel',
    'Galvanised Steel',
    'Combination',
    'Others',
  ];
  conductorVerifyList: string[] = ['Yes', 'No'];
  bondingConductorVerifyList: string[] = ['Yes', 'No'];
  earthingConductorVerifyList: string[] = ['Yes', 'No'];
  fcname: string[] = [
    'aLLiveConductorAC',
    'nominalFrequency',
    'aLLiveConductorBNote',
    'aLLiveConductorDC',
    'aLLiveConductorType',
    'aLSupplyNo',
    'aLSupplyShortName',
    'aLSystemEarthing',
    'aLSystemEarthingBNote',
    'actualLoad',
    'currentDissconnection',
    'faultCurrent',
    'installedCapacity',
    'loopImpedance',
    'nominalFrequency',
    'nominalVoltage',
    'nominalVoltageArr1',
    'protectiveDevice',
    'ratedCurrent',
  ];
 
  circuitName: string[] = [
    'location',
    'type',
    'noPoles',
    'current',
    'voltage',
    'fuse',
    'residualCurrent',
    'sourceName',
    'make',
    'currentCurve',
    'typeOfResidualCurrent',
    'residualTime',
  ];

  supplycharesteristicForm = new FormGroup({
    live: new FormControl(''),
  });

  myValue: any;
  sources: boolean = false;
  breaker: boolean = false;
 
  step2List: any = [];
  errorArr: any=[];
  retrieveMainNominalVoltage: any =[];
  alArr2: any=[];
  DcValue: string="";
  AcValue: string="";

   //comments starts
   completedCommentArr3: any = [];
   successMsg: string="";
   commentSuccess: boolean=false;
   commentApprove: boolean=false;
   commentReject: boolean=false;
   errorMsg: string="";
   success: boolean=false;
   Error: boolean=false;
   viewerComments: String='';
   commentDataArr: any = [];
   replyClicked: boolean=false;
   inspectorCommentArr!: FormArray;
   viewerCommentArr!: FormArray;
   completedCommentArr!: FormArray;
   comments = new CommentsSection;
   completedComments: boolean=false;
   date!: Date;
   toggleHideShow:boolean=false;
   public today: Date = new Date();
   isCollapsed = false;
   registerData: any = [];
   mode: any= 'indeterminate';
   cardBodyComments: boolean=true;
   spinner: boolean=false;
   replyCommentBox: boolean=false;
   hideMatIcons:boolean[] = [];
   hideAsViewerLogin: boolean=false;
   hideAsInspLogin: boolean=true;
   hideCommentSection: boolean=false;
   currentUser: any = [];
   currentUser1: any = [];
   reportViewerCommentArr:any = [];
   reportInspectorCommentArr:any = [];
   commentId: any;
   hideAdd: boolean=false;
   hideInspText: boolean=false;
   SendReply: boolean=false;
   showSend: boolean=false;
   sendComment: boolean=false;
   hideapproveIcon: boolean=false;
   hideapprove: boolean=false;
   hideRejectIcon: boolean=false;
   hideReject: boolean=false;
   showSubmenu: boolean = true;
   showText: boolean = true;
   isExpanded: boolean = false;
   isShowing = false;
   enabled: boolean = false;
   enabledViewer: boolean = false;
   savedUserName: String = '';
   completedCommentArrValue: any = [];
   afterApprove: boolean= false;
   hideRefresh:  boolean= false;
   hideDelete: boolean= false;
   showReplyBox: boolean= false;
   enabledRequest: boolean= false;
   disableSend: boolean= false;
   disableReply: boolean= false;
   addReject: boolean= false;
   count: number = 0;
   color = 'red';
   completedCommentArr4: any =[];
   completedCommentArr5: any =[];
   completedCommentArr1!: FormArray;
   expandedIndex!: number;
   isClicked:boolean[] = []; 
   arrViewer: any = [];
   @ViewChild('target') private myScrollContainer!: ElementRef;
   expandedIndexx!: number;
   inspectorName: String = '';	
   hideShowComment: boolean=false;
  mainNominalArr: any=[];
  mainNominalVoltageArr1: any=[];
  mainNominalVoltageArr2: any=[];
  mainNominalVoltageArr3: any=[];
  mainNominalVoltageArr4: any=[];
  mainNominalVoltageArr5: any=[];
  modalReference: any;
  observationModalReference: any;

  validationErrorTab: boolean = false;
  validationErrorMsgTab: string="";
   //comments end
   @ViewChild(InspectionVerificationBasicInformationComponent)
   step1!: InspectionVerificationBasicInformationComponent;
   tabErrorMsg: string="";
  tabError: boolean = false;
 
  JointLocationTable: boolean = false;
  key1LocationTable: boolean = false;
  key3LocationTable: boolean = false;
  keyJOintLocationTable: boolean= false;
  showRemarks: boolean= false;
  showBrief: boolean= false;
  shortName: string="";
  circuitSourceArr: any=[];
  circuitSourceArr1: any=[];
  observationUpdateFlag: boolean= false;

  // ObservationsForm = new FormGroup({
  //   observations: new FormControl(''),
  // });
  storeDelData: any=[];
  observationFlag: boolean= false;
  errorArrObservation: any=[];
  observationValues: any="";
  disableObservation: boolean=true;
  observationArr: any=[];
  earthElectrodeObservation: String= '';
  bondingConductorObservation: String= '';
  earthingConductorObservation: String= '';
  observArr: any = [];
  observeMainArr: any = [];
  deletedObservation: any = [];
  observationAlternateArr: any= [];
  finalSpinner: boolean = true;
  popup: boolean = false;

  constructor(
    private supplyCharacteristicsService: SupplyCharacteristicsService,
    public service: GlobalsService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private basic: MainNavComponent,
    private dialog: MatDialog,
    private observationService: ObservationService,
    //private step1: InspectionVerificationBasicInformationComponent,
    private modalService: NgbModal,private siteService: SiteService,
    private UpateInspectionService: InspectionVerificationService,
    private summaryService: SummarydetailsService,
    private testingService: TestingService
  ) {
    this.email = this.router.snapshot.paramMap.get('email') || '{}';
  }
  ngOnDestroy(): void {
    this.service.mainNominalVoltage = [];
    this.service.mainNominalCurrent = [];
    this.service.supplyList= '';
    this.service.retrieveMainNominalVoltage=[];
    this.service.retrieveMainNominalVoltage=[];
    this.service.nominalVoltageArr2=[];
    this.service.isCompleted2= true;
    this.service.isLinear=false;
    this.service.editable=true;
    this.service.lvClick=0;
    this.service.logoutClick=0;
    this.service.windowTabClick=0;
  }

  ngOnInit(): void {
    this.shortName = "";
    this.currentUser=sessionStorage.getItem('authenticatedUser');
    this.currentUser1 = [];
    this.currentUser1=JSON.parse(this.currentUser);

    // this.ObservationsForm = this.formBuilder.group({
    //   observations: [''],
    //  })
    this.supplycharesteristicForm = this.formBuilder.group({
      shortName: ['', Validators.required],
      systemEarthing: ['', Validators.required],
      liveConductor: ['', Validators.required],
      mainNominalFrequency: ['', Validators.required],
      AcConductor: ['', Validators.required],
      DcConductor: ['', Validators.required],
      briefNote: [''],
      liveConductorBNote: ['', Validators.required],
      mainNominalProtectiveDevice: ['', Validators.required],
      mainRatedCurrent: ['', Validators.required],
      mainCurrentDisconnection: ['', Validators.required],
      alternativeSupply: ['', Validators.required],
      supplyNumber: ['', [Validators.required,Validators.min(1)]],
      maximumDemand: ['', Validators.required],
      maximumLoad: ['', Validators.required],
      meansEarthing: ['', Validators.required],
      meansEarthingRemark:[''],
      electrodeType: ['', Validators.required],
      electrodeMaterial: [''],
      earthElectrodeObservation: ['',Validators.required],
      noOfLocation: ['', [Validators.required, Validators.min(0)]],
      conductorSize: ['', Validators.required],
      conductormaterial: ['', Validators.required],
      conductorVerify: ['', Validators.required],
      bondingConductorSize: ['', Validators.required],
      bondingConductorMaterial: ['', Validators.required],
      bondingConductorVerify: ['', Validators.required],
      bondingJointsType: ['', Validators.required],
      bondingNoOfJoints: ['', [Validators.required, Validators.min(0)]],
      bondingConductorObservation: ['',Validators.required],
      earthingConductorSize: ['', Validators.required],
      earthingConductorMaterial: ['', Validators.required],
      earthingConductorVerify: ['', Validators.required],
      earthingJointsType: ['', Validators.required],
      earthingNoOfJoints: ['', [Validators.required, Validators.min(0)]],
      earthingConductorObservation: ['',Validators.required],
      NV1: '',
      NV2: '',
      NV3: '',
      NV4: '',
      NV5: '',
      NV6: '',
      NV7: '',
      NV8: '',
      NV9: '',

      NF1: '',
      // NF2: '',
      // NF3: '',
      // NF4: '',
      // NF5: '',
      // NF6: '',
      // NF7: '',
      // NF8: '',
      // NF9: '',

      PF1: '',
      PF2: '',
      PF3: '',
      PF4: '',
      PF5: '',
      PF6: '',
      PF7: '',
      PF8: '',
      PF9: '',

      EL1: '',
      EL2: '',
      EL3: '',
      EL4: '',
      EL5: '',
      EL6: '',
      EL7: '',
      EL8: '',
      EL9: '',

      AL1: '',
      AL2: '',
      AL3: '',
      AL4: '',
     

      location1Arr: this.formBuilder.array([this.createLocation1Form()]),
      location2Arr: this.formBuilder.array([this.createLocation2Form()]),
      location3Arr: this.formBuilder.array([this.createLocation3Form()]),
      alternateArr: this.formBuilder.array([]),
      circuitArr: this.formBuilder.array([this.createCircuitForm()]),
      viewerCommentArr: this.formBuilder.array([this.addCommentViewer()]),
      completedCommentArr1: this.formBuilder.array([]),
      observationArr: this.formBuilder.array([])
    });
   this.expandedIndex = -1 ;
   this.observationArr = this.supplycharesteristicForm.get(
    'observationArr'
  ) as FormArray;
   for(let i=0; i<5; i++){
    this.observationArr.push(this.generateForm());
    // for(let j=0;j<this.alternateArr.length;j++){
    //   this.observationArr.controls[i].controls.alternativeInnerObservation.push(this.generateAlternativeForm());
    // }
  }
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

    private generateForm(): FormGroup {
      return new FormGroup({
        supplyOuterObservationId: new FormControl(''),
        observationComponentDetails: new FormControl(''),
        observationDescription: new FormControl(''),
        supplyOuterObservationStatus: new FormControl('A'),
        alternativeInnerObservation: this.formBuilder.array([]),
      });
    }

    private generateAlternativeForm(): FormGroup {
      return new FormGroup({
        supplyInnerObervationsId: new FormControl(''),
        observationComponentDetails: new FormControl(''),
        observationDescription: new FormControl(''),
        alternativeInnerObservationStatus: new FormControl('A'),
      });
    }
  onKeyMainShortName(e: any){
    let values = e.target.value;
    // this.alternateArr = this.supplycharesteristicForm.get(
    //   'alternateArr'
    // ) as FormArray;
    this.circuitSourceArr = this.supplycharesteristicForm.get(
      'circuitArr'
    ) as FormArray;
    this.circuitSourceArr.controls[0].controls.sourceName.setValue(values)
    
  }

  onKeyAlternateShortName(e: any, i: any){
    let values = e.target.value;
    // this.alternateArr = this.supplycharesteristicForm.get(
    //   'alternateArr'
    // ) as FormArray;
    this.circuitSourceArr1 = this.supplycharesteristicForm.get(
      'circuitArr'
    ) as FormArray;
    this.circuitSourceArr1.controls[i+1].controls.sourceName.setValue(values)
  }

  retrieveDetailsfromSavedReports(userName: any,siteId: any,clientName: any,departmentName: any,site: any,data: any){
    // if(this.service.disableFields==true){
    //   this.supplycharesteristicForm.disable();
    //  }
    //this.service.lvClick=1;

       this.step2List = JSON.parse(data);
       this.supplycharesteristic.siteId = siteId;
       this.deletedObservation = [];
       this.supplycharesteristic.supplyCharacteristicsId = this.step2List.supplyCharacteristics.supplyCharacteristicsId;
       this.supplycharesteristic.createdBy = this.step2List.supplyCharacteristics.createdBy;
       this.supplycharesteristic.createdDate = this.step2List.supplyCharacteristics.createdDate;
       this.supplycharesteristic.alternativeSupply=this.step2List.supplyCharacteristics.alternativeSupply;
       this.showAlternateField(this.step2List.supplyCharacteristics.alternativeSupply);
       this.changeSystem(this.step2List.supplyCharacteristics.mainSystemEarthing);
       this.onKey(this.step2List.supplyCharacteristics.bondingNoOfJoints);
       this.onKey3(this.step2List.supplyCharacteristics.earthingNoOfJoints);

       this.supplycharesteristic.systemEarthingBNote=this.step2List.supplyCharacteristics.systemEarthingBNote;  
       this.supplycharesteristic.liveConductorBNote=this.step2List.supplyCharacteristics.liveConductorBNote;       
     
       this.supplycharesteristic.electrodeMaterial=this.step2List.supplyCharacteristics.electrodeMaterial;
       this.supplycharesteristic.meansEarthing=this.step2List.supplyCharacteristics.meansEarthing;
       this.supplycharesteristic.meansEarthingRemark=this.step2List.supplyCharacteristics.meansEarthingRemark;
       this.supplycharesteristic.electrodeType=this.step2List.supplyCharacteristics.electrodeType;
      if(this.step2List.supplyCharacteristics.noOfLocation!=0){
        this.key1LocationTable=true;
      }
      else{
        this.key1LocationTable=false;
      }
      if(this.step2List.supplyCharacteristics.bondingNoOfJoints!=0){
        this.JointLocationTable=true;
        this.supplycharesteristicForm.controls['bondingJointsType'].setValidators(Validators.required);
        this.supplycharesteristicForm.controls['bondingJointsType'].updateValueAndValidity();
      }
      else{
        this.JointLocationTable=false;
        this.supplycharesteristicForm.controls['bondingJointsType'].clearValidators();
        this.supplycharesteristicForm.controls[
          'bondingJointsType'
        ].updateValueAndValidity();
      }
      if(this.step2List.supplyCharacteristics.earthingNoOfJoints!=0){
        this.keyJOintLocationTable=true;
        this.supplycharesteristicForm.controls['earthingJointsType'].setValidators(Validators.required);
        this.supplycharesteristicForm.controls['earthingJointsType'].updateValueAndValidity();
      }
      else{
        this.keyJOintLocationTable=false;
        this.supplycharesteristicForm.controls['earthingJointsType'].clearValidators();
        this.supplycharesteristicForm.controls[
          'earthingJointsType'
        ].updateValueAndValidity();
      }
      this.supplycharesteristic.bondingJointsType=this.step2List.supplyCharacteristics.bondingJointsType;
      this.supplycharesteristic.earthingJointsType=this.step2List.supplyCharacteristics.earthingJointsType;
       this.supplycharesteristic.conductorVerify= this.step2List.supplyCharacteristics.conductorVerify;
       this.step2List.type= this.step2List.supplyCharacteristics.type;
       this.supplycharesteristic.mainNominalFrequency= this.step2List.supplyCharacteristics.mainNominalFrequency;
       this.supplycharesteristic.liveConductorAC= this.step2List.supplyCharacteristics.liveConductorAC;
       this.supplycharesteristic.liveConductorDC=this.step2List.supplyCharacteristics.liveConductorDC,
       this.AcValue = this.step2List.supplyCharacteristics.liveConductorAC;
       this.DcValue = this.step2List.supplyCharacteristics.liveConductorDC;
       this.step2List.liveConductor= this.step2List.supplyCharacteristics.liveConductor;
       this.supplycharesteristic.supplyNumber = this.step2List.supplyCharacteristics.supplyNumber;
       this.supplycharesteristic.supplyOuterObservation = this.step2List.supplyCharacteristics.supplyOuterObservation;
       this.flag = true;
      
       this.populateData(this.step2List.supplyCharacteristics);
       this.populateDataComments(this.step2List.supplyCharacteristics.supplyCharacteristicComment);
       this.supplycharesteristicForm.patchValue({
        clientName1: clientName,
        departmentName1:departmentName,
        site1:site,
        shortName:this.step2List.supplyCharacteristics.shortName,
        systemEarthing:this.step2List.supplyCharacteristics.mainSystemEarthing,
        liveConductor:this.step2List.supplyCharacteristics.liveConductorType,
      
        briefNote:this.step2List.supplyCharacteristics.systemEarthingBNote,
        mainNominalProtectiveDevice:this.step2List.supplyCharacteristics.mainNominalProtectiveDevice,
        mainRatedCurrent:this.step2List.supplyCharacteristics.mainRatedCurrent,
        mainCurrentDisconnection:this.step2List.supplyCharacteristics.mainCurrentDisconnection,
        liveConductorBNote:this.step2List.supplyCharacteristics.liveConductorBNote,
        supplyNumber:this.step2List.supplyCharacteristics.supplyNumber,
        maximumDemand:this.step2List.supplyCharacteristics.maximumDemand,
        maximumLoad:this.step2List.supplyCharacteristics.maximumLoad,

        noOfLocation:this.step2List.supplyCharacteristics.noOfLocation,
        conductorSize:this.step2List.supplyCharacteristics.conductorSize,
        conductormaterial:this.step2List.supplyCharacteristics.conductormaterial,
        bondingConductorSize:this.step2List.supplyCharacteristics.bondingConductorSize,

        bondingConductorMaterial:this.step2List.supplyCharacteristics.bondingConductorMaterial,
        bondingConductorVerify:this.step2List.supplyCharacteristics.bondingConductorVerify,
        bondingJointsType:this.step2List.supplyCharacteristics.bondingJointsType,
        bondingNoOfJoints:this.step2List.supplyCharacteristics.bondingNoOfJoints,
        earthingConductorSize:this.step2List.supplyCharacteristics.earthingConductorSize,

        earthingConductorMaterial:this.step2List.supplyCharacteristics.earthingConductorMaterial,
        earthingConductorVerify:this.step2List.supplyCharacteristics.earthingConductorVerify,
        earthingJointsType:this.step2List.supplyCharacteristics.earthingJointsType,
        earthingNoOfJoints:this.step2List.supplyCharacteristics.earthingNoOfJoints,
        residualTime:this.step2List.supplyCharacteristics.residualTime,

        residualCurrent:this.step2List.supplyCharacteristics.residualCurrent,
        fuse:this.step2List.supplyCharacteristics.fuse,
        voltage:this.step2List.supplyCharacteristics.voltage,
        current:this.step2List.supplyCharacteristics.current,
        noPoles:this.step2List.supplyCharacteristics.noPoles,
        location:this.step2List.supplyCharacteristics.location,
    })

    this.changeCurrent(this.step2List.supplyCharacteristics.liveConductorType);

      if(this.step2List.supplyCharacteristics.liveConductorType == "AC") {
        this.enableAC=true;
        this.tableAC =  true;

        this.mainArr1 = [];
        this.mainArr2 = [];
        this.mainArr3 = [];
        this.mainArr4 = [];
        this.mainArr5 = [];

        this.mainArr1 = this.step2List.supplyCharacteristics.mainNominalVoltage.split(",");
        this.mainArr2 = this.step2List.supplyCharacteristics.mainNominalCapacity;
        this.mainArr3 = this.step2List.supplyCharacteristics.mainNominalCurrent.split(",");
        this.mainArr4 = this.step2List.supplyCharacteristics.mainLoopImpedance.split(",");
        this.mainArr5 = this.step2List.supplyCharacteristics.mainActualLoad.split(",");

        this.retrieveMainNominalVoltage = [];
        this.retrieveMainNominalVoltage.push(this.mainArr1,this.mainArr2,this.mainArr3,this.mainArr4,this.mainArr5);
        

          this.NV1 = this.retrieveMainNominalVoltage[0][0];
          this.NV2 = this.retrieveMainNominalVoltage[0][1];
          this.NV3 = this.retrieveMainNominalVoltage[0][2];
          this.NV4 = this.retrieveMainNominalVoltage[0][3];
          this.NV5 = this.retrieveMainNominalVoltage[0][4];
          this.NV6 = this.retrieveMainNominalVoltage[0][5];
          this.NV7 = this.retrieveMainNominalVoltage[0][6];
          this.NV8 = this.retrieveMainNominalVoltage[0][7];
          this.NV9 = this.retrieveMainNominalVoltage[0][8];

          this.NF1 = this.retrieveMainNominalVoltage[1];
          //this.NF1 = this.retrieveMainNominalVoltage[1][0];
          // this.NF2 = this.retrieveMainNominalVoltage[1][1];
          // this.NF3 = this.retrieveMainNominalVoltage[1][2];
          // this.NF4 = this.retrieveMainNominalVoltage[1][3];
          // this.NF5 = this.retrieveMainNominalVoltage[1][4];
          // this.NF6 = this.retrieveMainNominalVoltage[1][5];
          // this.NF7 = this.retrieveMainNominalVoltage[1][6];
          // this.NF8 = this.retrieveMainNominalVoltage[1][7];
          // this.NF9 = this.retrieveMainNominalVoltage[1][8];

          this.PF1 = this.retrieveMainNominalVoltage[2][0];
          this.PF2 = this.retrieveMainNominalVoltage[2][1];
          this.PF3 = this.retrieveMainNominalVoltage[2][2];
          this.PF4 = this.retrieveMainNominalVoltage[2][3];
          this.PF5 = this.retrieveMainNominalVoltage[2][4];
          this.PF6 = this.retrieveMainNominalVoltage[2][5];
          this.PF7 = this.retrieveMainNominalVoltage[2][6];
          this.PF8 = this.retrieveMainNominalVoltage[2][7];
          this.PF9 = this.retrieveMainNominalVoltage[2][8];

          this.EL1 = this.retrieveMainNominalVoltage[3][0];
          this.EL2 = this.retrieveMainNominalVoltage[3][1];
          this.EL3 = this.retrieveMainNominalVoltage[3][2];
          this.EL4 = this.retrieveMainNominalVoltage[3][3];
          this.EL5 = this.retrieveMainNominalVoltage[3][4];
          this.EL6 = this.retrieveMainNominalVoltage[3][5];
          this.EL7 = this.retrieveMainNominalVoltage[3][6];
          this.EL8 = this.retrieveMainNominalVoltage[3][7];
          this.EL9 = this.retrieveMainNominalVoltage[3][8];
          
          this.AL1 = this.retrieveMainNominalVoltage[4][0];
          this.AL2 = this.retrieveMainNominalVoltage[4][1];
          this.AL3 = this.retrieveMainNominalVoltage[4][2];
          this.AL4 = this.retrieveMainNominalVoltage[4][3];
      }
     }
  
  retrieveAllDetailsforSupply(userName: any,siteId: any,data: any){
    // if(this.service.disableFields==true){
    //     this.supplycharesteristicForm.disable();
    // }
         this.step2List = JSON.parse(data);
         this.supplycharesteristic.siteId = siteId;
         this.deletedObservation = [];
         this.supplycharesteristic.supplyCharacteristicsId = this.step2List.supplyCharacteristicsId;
         this.supplycharesteristic.createdBy = this.step2List.createdBy;
         this.supplycharesteristic.createdDate = this.step2List.createdDate;
         this.supplycharesteristic.alternativeSupply=this.step2List.alternativeSupply;
         this.showAlternateField(this.step2List.alternativeSupply);
         this.changeSystem(this.step2List.mainSystemEarthing);
         this.onKey(this.step2List.bondingNoOfJoints);
         this.onKey3(this.step2List.earthingNoOfJoints);
         this.supplycharesteristic.systemEarthingBNote=this.step2List.systemEarthingBNote;       
         this.supplycharesteristic.electrodeMaterial=this.step2List.electrodeMaterial;
         this.supplycharesteristic.meansEarthing=this.step2List.meansEarthing;
         this.supplycharesteristic.meansEarthingRemark=this.step2List.meansEarthingRemark;
         this.supplycharesteristic.electrodeType=this.step2List.electrodeType;
        if(this.step2List.noOfLocation!=0){
          this.key1LocationTable=true;
        }
        else{
          this.key1LocationTable=false;
        }
        if(this.step2List.bondingNoOfJoints!=0){
          this.JointLocationTable=true;
          this.supplycharesteristicForm.controls['bondingJointsType'].setValidators(Validators.required);
          this.supplycharesteristicForm.controls['bondingJointsType'].updateValueAndValidity();
        }
        else{
          this.JointLocationTable=false;
          this.supplycharesteristicForm.controls['bondingJointsType'].clearValidators();
          this.supplycharesteristicForm.controls[
            'bondingJointsType'
          ].updateValueAndValidity();
        }
        if(this.step2List.earthingNoOfJoints!=0){
          this.keyJOintLocationTable=true;
          this.supplycharesteristicForm.controls['earthingJointsType'].setValidators(Validators.required);
        this.supplycharesteristicForm.controls['earthingJointsType'].updateValueAndValidity();
        }
        else{
          this.keyJOintLocationTable=false;
          this.supplycharesteristicForm.controls['earthingJointsType'].clearValidators();
          this.supplycharesteristicForm.controls[
            'earthingJointsType'
          ].updateValueAndValidity();
        }
        this.supplycharesteristic.bondingJointsType=this.step2List.bondingJointsType;
        this.supplycharesteristic.earthingJointsType=this.step2List.earthingJointsType;
         this.supplycharesteristic.conductorVerify= this.step2List.conductorVerify;
         this.step2List.type= this.step2List.type;
         this.supplycharesteristic.mainNominalFrequency= this.step2List.mainNominalFrequency;
         this.supplycharesteristic.liveConductorAC= this.step2List.liveConductorAC;
         this.supplycharesteristic.liveConductorDC=this.step2List.liveConductorDC,
         this.AcValue = this.step2List.liveConductorAC;
         this.DcValue = this.step2List.liveConductorDC;
         this.step2List.liveConductor= this.step2List.liveConductor;
         this.supplycharesteristic.supplyOuterObservation = this.step2List.supplyOuterObservation;

         this.flag = true;
         this.populateData(this.step2List);
         this.populateDataComments(this.step2List.supplyCharacteristicComment);
         this.supplycharesteristicForm.patchValue({
          shortName:this.step2List.shortName,
          systemEarthing:this.step2List.mainSystemEarthing,
          liveConductor:this.step2List.liveConductorType,
        
          briefNote:this.step2List.systemEarthingBNote,
          mainNominalProtectiveDevice:this.step2List.mainNominalProtectiveDevice,
          mainRatedCurrent:this.step2List.mainRatedCurrent,
          mainCurrentDisconnection:this.step2List.mainCurrentDisconnection,
          liveConductorBNote:this.step2List.liveConductorBNote,
          supplyNumber:this.step2List.supplyNumber,
          maximumDemand:this.step2List.maximumDemand,
          maximumLoad:this.step2List.maximumLoad,
  
          noOfLocation:this.step2List.noOfLocation,
          conductorSize:this.step2List.conductorSize,
          conductormaterial:this.step2List.conductormaterial,
          bondingConductorSize:this.step2List.bondingConductorSize,
  
          bondingConductorMaterial:this.step2List.bondingConductorMaterial,
          bondingConductorVerify:this.step2List.bondingConductorVerify,
          bondingJointsType:this.step2List.bondingJointsType,
          bondingNoOfJoints:this.step2List.bondingNoOfJoints,
          earthingConductorSize:this.step2List.earthingConductorSize,
  
          earthingConductorMaterial:this.step2List.earthingConductorMaterial,
          earthingConductorVerify:this.step2List.earthingConductorVerify,
          earthingJointsType:this.step2List.earthingJointsType,
          earthingNoOfJoints:this.step2List.earthingNoOfJoints,
          residualTime:this.step2List.residualTime,
  
          residualCurrent:this.step2List.residualCurrent,
          fuse:this.step2List.fuse,
          voltage:this.step2List.voltage,
          current:this.step2List.current,
          noPoles:this.step2List.noPoles,
          location:this.step2List.location,
      })
  
      this.changeCurrent(this.step2List.liveConductorType);
  
        if(this.step2List.liveConductorType == "AC") {
          this.enableAC=true;
          this.tableAC =  true;
  
          this.mainArr1 = [];
          this.mainArr2 = [];
          this.mainArr3 = [];
          this.mainArr4 = [];
          this.mainArr5 = [];

          this.mainArr1 = this.step2List.mainNominalVoltage.split(",");
          this.mainArr2 = this.step2List.mainNominalCapacity;
          this.mainArr3 = this.step2List.mainNominalCurrent.split(",");
          this.mainArr4 = this.step2List.mainLoopImpedance.split(",");
          this.mainArr5 = this.step2List.mainActualLoad.split(",");

          this.retrieveMainNominalVoltage = [];
          this.retrieveMainNominalVoltage.push(this.mainArr1,this.mainArr2,this.mainArr3,this.mainArr4,this.mainArr5);
          
  
            this.NV1 = this.retrieveMainNominalVoltage[0][0];
            this.NV2 = this.retrieveMainNominalVoltage[0][1];
            this.NV3 = this.retrieveMainNominalVoltage[0][2];
            this.NV4 = this.retrieveMainNominalVoltage[0][3];
            this.NV5 = this.retrieveMainNominalVoltage[0][4];
            this.NV6 = this.retrieveMainNominalVoltage[0][5];
            this.NV7 = this.retrieveMainNominalVoltage[0][6];
            this.NV8 = this.retrieveMainNominalVoltage[0][7];
            this.NV9 = this.retrieveMainNominalVoltage[0][8];
  
            this.NF1 = this.retrieveMainNominalVoltage[1];
            //this.NF1 = this.retrieveMainNominalVoltage[1][0];
            // this.NF2 = this.retrieveMainNominalVoltage[1][1];
            // this.NF3 = this.retrieveMainNominalVoltage[1][2];
            // this.NF4 = this.retrieveMainNominalVoltage[1][3];
            // this.NF5 = this.retrieveMainNominalVoltage[1][4];
            // this.NF6 = this.retrieveMainNominalVoltage[1][5];
            // this.NF7 = this.retrieveMainNominalVoltage[1][6];
            // this.NF8 = this.retrieveMainNominalVoltage[1][7];
            // this.NF9 = this.retrieveMainNominalVoltage[1][8];
  
            this.PF1 = this.retrieveMainNominalVoltage[2][0];
            this.PF2 = this.retrieveMainNominalVoltage[2][1];
            this.PF3 = this.retrieveMainNominalVoltage[2][2];
            this.PF4 = this.retrieveMainNominalVoltage[2][3];
            this.PF5 = this.retrieveMainNominalVoltage[2][4];
            this.PF6 = this.retrieveMainNominalVoltage[2][5];
            this.PF7 = this.retrieveMainNominalVoltage[2][6];
            this.PF8 = this.retrieveMainNominalVoltage[2][7];
            this.PF9 = this.retrieveMainNominalVoltage[2][8];
  
            this.EL1 = this.retrieveMainNominalVoltage[3][0];
            this.EL2 = this.retrieveMainNominalVoltage[3][1];
            this.EL3 = this.retrieveMainNominalVoltage[3][2];
            this.EL4 = this.retrieveMainNominalVoltage[3][3];
            this.EL5 = this.retrieveMainNominalVoltage[3][4];
            this.EL6 = this.retrieveMainNominalVoltage[3][5];
            this.EL7 = this.retrieveMainNominalVoltage[3][6];
            this.EL8 = this.retrieveMainNominalVoltage[3][7];
            this.EL9 = this.retrieveMainNominalVoltage[3][8];
            
            this.AL1 = this.retrieveMainNominalVoltage[4][0];
            this.AL2 = this.retrieveMainNominalVoltage[4][1];
            this.AL3 = this.retrieveMainNominalVoltage[4][2];
            this.AL4 = this.retrieveMainNominalVoltage[4][3];
           
        }
       }

   
       onKeyVoltage(event:KeyboardEvent){
        if(this.NV1!='' && this.EL1!='' && this.EL1!=undefined && this.NV1!=undefined && this.NV1!='NA' && this.EL1!='NA'){
         var PF1=(this.NV1/this.EL1)/1000;
        this.PF1=PF1.toFixed(3);
       }
       else if((this.NV1=='NA' && this.EL1=='NA') || (this.NV1=='NA' || this.EL1=='NA')){
         this.PF1='NA';
        }
       else{
         this.PF1='';
       }
       if(this.NV2!='' && this.EL2!='' && this.EL2!=undefined && this.NV2!=undefined && this.NV2!='NA' && this.EL2!='NA'){
         var PF2= (this.NV2/this.EL2)/1000;
         this.PF2=PF2.toFixed(3);
        }
        else if((this.NV2=='NA' && this.EL2=='NA') || (this.NV2=='NA' || this.EL2=='NA')){
         this.PF2='NA';
        }
        else{
          this.PF2='';
        }
        if(this.NV3!='' && this.EL3!='' && this.EL3!=undefined && this.NV3!=undefined && this.NV3!='NA' && this.EL3!='NA'){
         var PF3= (this.NV3/this.EL3)/1000;
         this.PF3=PF3.toFixed(3);
        }
        else if((this.NV3=='NA' && this.EL3=='NA') || (this.NV3=='NA' || this.EL3=='NA')){
         this.PF3='NA';
        }
        else{
          this.PF3='';
        }
        if(this.NV4!='' && this.EL4!='' && this.EL4!=undefined && this.NV4!=undefined && this.NV4!='NA' && this.EL4!='NA'){
         var PF4= (this.NV4/this.EL4)/1000;
         this.PF4=PF4.toFixed(3);
        }
        else if((this.NV4=='NA' && this.EL4=='NA') || (this.NV4=='NA' || this.EL4=='NA')){
         this.PF4='NA';
        }
        else{
          this.PF4='';
        }
        if(this.NV5!='' && this.EL5!='' && this.EL5!=undefined && this.NV5!=undefined && this.NV5!='NA' && this.EL5!='NA'){
         var PF5= (this.NV5/this.EL5)/1000;
         this.PF5=PF5.toFixed(3);
        }
        else if((this.NV5=='NA' && this.EL5=='NA') || (this.NV5=='NA' || this.EL5=='NA')){
         this.PF5='NA';
        }
        else{
          this.PF5='';
        }
        if(this.NV6!='' && this.EL6!='' && this.EL6!=undefined && this.NV6!=undefined && this.NV6!='NA' && this.EL6!='NA'){
         var PF6= (this.NV6/this.EL6)/1000;
         this.PF6=PF6.toFixed(3);
        }
        else if((this.NV6=='NA' && this.EL6=='NA') || (this.NV6=='NA' || this.EL6=='NA')){
         this.PF6='NA';
        }
        else{
          this.PF6='';
        }
        if(this.NV7!='' && this.EL7!='' && this.EL7!=undefined && this.NV7!=undefined && this.NV7!='NA' && this.EL7!='NA'){
         var PF7= (this.NV7/this.EL7)/1000;
         this.PF7=PF7.toFixed(3);
        }
        else if((this.NV7=='NA' && this.EL7=='NA') || (this.NV7=='NA' || this.EL7=='NA')){
         this.PF7='NA';
        }
        else{
          this.PF7='';
        }
        if(this.NV8!='' && this.EL8!='' && this.NV8!=undefined && this.EL8!=undefined && this.NV8!='NA' && this.EL8!='NA'){
         var PF8= (this.NV8/this.EL8)/1000;
         this.PF8=PF8.toFixed(3);
        }
        else if((this.NV8=='NA' && this.EL8=='NA') || (this.NV8=='NA' || this.EL8=='NA')){
         this.PF8='NA';
        }
        else{
          this.PF8='';
        }
        if(this.NV9!='' && this.EL9!='' && this.EL9!=undefined && this.NV9!=undefined && this.NV9!='NA' && this.EL9!='NA'){
         var PF9= (this.NV9/this.EL9)/1000;
         this.PF9=PF9.toFixed(3);
        }
        else if((this.NV9=='NA' && this.EL9=='NA') || (this.NV9=='NA' || this.EL9=='NA')){
         this.PF9='NA';
        }
        else{
          this.PF9='';
        }
        }
        onKeyImpedance(event:KeyboardEvent){
         if(this.NV1!='' && this.EL1!='' && this.EL1!=undefined && this.NV1!=undefined && this.NV1!='NA' && this.EL1!='NA'){
           var PF1= (this.NV1/this.EL1)/1000; 
             this.PF1=PF1.toFixed(3);
          }
          else if((this.NV1=='NA' && this.EL1=='NA') || (this.NV1=='NA' || this.EL1=='NA')){
            this.PF1='NA';
           }
          else{
            this.PF1='';
          }
          if(this.NV2!='' && this.EL2!='' && this.EL2!=undefined && this.NV2!=undefined && this.NV2!='NA' && this.EL2!='NA'){
           var PF2= (this.NV2/this.EL2)/1000;
           this.PF2=PF2.toFixed(3);
           }
           else if((this.NV2=='NA' && this.EL2=='NA') || (this.NV2=='NA' || this.EL2=='NA')){
            this.PF2='NA';
           }
           else{
             this.PF2='';
           }
           if(this.NV3!='' && this.EL3!='' && this.EL3!=undefined && this.NV3!=undefined && this.NV3!='NA' && this.EL3!='NA'){
            var PF3= (this.NV3/this.EL3)/1000;
            this.PF3=PF3.toFixed(3);
           }
           else if((this.NV3=='NA' && this.EL3=='NA') || (this.NV3=='NA' || this.EL3=='NA')){
            this.PF3='NA';
           }
           else{
             this.PF3='';
           }
           if(this.NV4!='' && this.EL4!='' && this.EL4!=undefined && this.NV4!=undefined && this.NV4!='NA' && this.EL4!='NA'){
            var PF4= (this.NV4/this.EL4)/1000;
            this.PF4=PF4.toFixed(3);
           }
           else if((this.NV4=='NA' && this.EL4=='NA') || (this.NV4=='NA' || this.EL4=='NA')){
            this.PF4='NA';
           }
           else{
             this.PF4='';
           }
           if(this.NV5!='' && this.EL5!='' && this.EL5!=undefined && this.NV5!=undefined && this.NV5!='NA' && this.EL5!='NA'){
             var PF5= (this.NV5/this.EL5)/1000;
             this.PF5=PF5.toFixed(3);
           }
           else if((this.NV5=='NA' && this.EL5=='NA') || (this.NV5=='NA' || this.EL5=='NA')){
            this.PF5='NA';
           }
           else{
             this.PF5='';
           }
           if(this.NV6!='' && this.EL6!='' && this.EL6!=undefined && this.NV6!=undefined && this.NV6!='NA' && this.EL6!='NA'){
             var PF6= (this.NV6/this.EL6)/1000;
             this.PF6=PF6.toFixed(3);
           }
           else if((this.NV6=='NA' && this.EL6=='NA') || (this.NV6=='NA' || this.EL6=='NA')){
            this.PF6='NA';
           }
           else{
             this.PF6='';
           }
           if(this.NV7!='' && this.EL7!='' && this.EL7!=undefined && this.NV7!=undefined && this.NV7!='NA' && this.EL7!='NA'){
             var PF7= (this.NV7/this.EL7)/1000;
            this.PF7=PF7.toFixed(3);
           }
           else if((this.NV7=='NA' && this.EL7=='NA') || (this.NV7=='NA' || this.EL7=='NA')){
            this.PF7='NA';
           }
           else{
             this.PF7='';
           }
           if(this.NV8!='' && this.EL8!='' && this.NV8!=undefined && this.EL8!=undefined && this.NV8!='NA' && this.EL8!='NA'){
             var PF8= (this.NV8/this.EL8)/1000;
           this.PF8=PF8.toFixed(3);
           }
           else if((this.NV8=='NA' && this.EL8=='NA') || (this.NV8=='NA' || this.EL8=='NA')){
            this.PF8='NA';
           }
           else{
             this.PF8='';
           }
           if(this.NV9!='' && this.EL9!='' && this.EL9!=undefined && this.NV9!=undefined && this.NV9!='NA' && this.EL9!='NA'){
             var PF9= (this.NV9/this.EL9)/1000;
             this.PF9=PF9.toFixed(3);
           }
           else if((this.NV9=='NA' && this.EL9=='NA') || (this.NV9=='NA' || this.EL9=='NA')){
            this.PF9='NA';
           }
           else{
             this.PF9='';
           }
        }
     	
        onKeyVoltage1(event:KeyboardEvent,row:any){	
          if(row.controls.nominalVoltage1.value!='' && row.controls.impedence1.value!='' && row.controls.impedence1.value!=undefined && row.controls.nominalVoltage1.value!=undefined 	
          && row.controls.nominalVoltage1.value!='NA' && row.controls.impedence1.value!='NA'){	
            var current1= (row.controls.nominalVoltage1.value/row.controls.impedence1.value)/1000;	
            row.controls.current1.value=current1.toFixed(3);	
           }	
           else if((row.controls.nominalVoltage1.value=='NA' && row.controls.impedence1.value=='NA') || (row.controls.nominalVoltage1.value=='NA' || row.controls.impedence1.value=='NA')){	
            row.controls.current1.value='NA';	
           }	
           else{	
            row.controls.current1.value='';	
           }	
           if(row.controls.nominalVoltage2.value!='' && row.controls.impedence2.value!='' && row.controls.impedence2.value!=undefined && row.controls.nominalVoltage2.value!=undefined 	
           && row.controls.nominalVoltage2.value!='NA' && row.controls.impedence2.value!='NA'){	
            var current2= (row.controls.nominalVoltage2.value/row.controls.impedence2.value)/1000;	
             row.controls.current2.value=current2.toFixed(3);	
            }	
            else if((row.controls.nominalVoltage2.value=='NA' && row.controls.impedence2.value=='NA') || (row.controls.nominalVoltage2.value=='NA' || row.controls.impedence2.value=='NA')){	
             row.controls.current2.value='NA';	
            }	
            else{	
             row.controls.current2.value='';	
            }	
            if(row.controls.nominalVoltage3.value!='' && row.controls.impedence3.value!='' && row.controls.impedence3.value!=undefined && row.controls.nominalVoltage3.value!=undefined 	
            && row.controls.nominalVoltage3.value!='NA' && row.controls.impedence3.value!='NA'){	
              var current3= (row.controls.nominalVoltage3.value/row.controls.impedence3.value)/1000;	
              row.controls.current3.value=current3.toFixed(3);	
             }	
             else if((row.controls.nominalVoltage3.value=='NA' && row.controls.impedence3.value=='NA') || (row.controls.nominalVoltage3.value=='NA' || row.controls.impedence3.value=='NA')){	
              row.controls.current3.value='NA';	
             }	
             else{	
              row.controls.current3.value='';	
             }	
             if(row.controls.nominalVoltage4.value!='' && row.controls.impedence4.value!='' && row.controls.impedence4.value!=undefined && row.controls.nominalVoltage4.value!=undefined 	
             && row.controls.nominalVoltage4.value!='NA' && row.controls.impedence4.value!='NA'){	
              var current4= (row.controls.nominalVoltage4.value/row.controls.impedence4.value)/1000;	
               row.controls.current4.value=current4.toFixed(3);	
              }	
              else if((row.controls.nominalVoltage4.value=='NA' && row.controls.impedence4.value=='NA') || (row.controls.nominalVoltage4.value=='NA' || row.controls.impedence4.value=='NA')){	
               row.controls.current4.value='NA';	
              }	
              else{	
               row.controls.current4.value='';	
              }	
              if(row.controls.nominalVoltage5.value!='' && row.controls.impedence5.value!='' && row.controls.impedence5.value!=undefined && row.controls.nominalVoltage5.value!=undefined 	
              && row.controls.nominalVoltage5.value!='NA' && row.controls.impedence5.value!='NA'){	
                var current5= (row.controls.nominalVoltage5.value/row.controls.impedence5.value)/1000;	
                row.controls.current5.value=current5.toFixed(3);	
               }	
               else if((row.controls.nominalVoltage5.value=='NA' && row.controls.impedence5.value=='NA') || (row.controls.nominalVoltage5.value=='NA' || row.controls.impedence5.value=='NA')){	
                row.controls.current5.value='NA';	
               }	
               else{	
                row.controls.current5.value='';	
               }	
               if(row.controls.nominalVoltage6.value!='' && row.controls.impedence6.value!='' && row.controls.impedence6.value!=undefined && row.controls.nominalVoltage6.value!=undefined 	
               && row.controls.nominalVoltage6.value!='NA' && row.controls.impedence6.value!='NA'){	
                var current6= (row.controls.nominalVoltage6.value/row.controls.impedence6.value)/1000;	
                 row.controls.current6.value=current6.toFixed(3);	
                }	
                else if((row.controls.nominalVoltage6.value=='NA' && row.controls.impedence6.value=='NA') || (row.controls.nominalVoltage6.value=='NA' || row.controls.impedence6.value=='NA')){	
                 row.controls.current6.value='NA';	
                }	
                else{	
                 row.controls.current6.value='';	
                }	
                if(row.controls.nominalVoltage7.value!='' && row.controls.impedence7.value!='' && row.controls.impedence7.value!=undefined && row.controls.nominalVoltage7.value!=undefined 	
                && row.controls.nominalVoltage7.value!='NA' && row.controls.impedence7.value!='NA'){	
                  var current7= (row.controls.nominalVoltage7.value/row.controls.impedence7.value)/1000;	
                  row.controls.current7.value=current7.toFixed(3);	
                 }	
                 else if((row.controls.nominalVoltage7.value=='NA' && row.controls.impedence7.value=='NA') || (row.controls.nominalVoltage7.value=='NA' || row.controls.impedence7.value=='NA')){	
                  row.controls.current7.value='NA';	
                 }	
                 else{	
                  row.controls.current7.value='';	
                 }	
                 if(row.controls.nominalVoltage8.value!='' && row.controls.impedence8.value!='' && row.controls.impedence8.value!=undefined && row.controls.nominalVoltage8.value!=undefined 	
                 && row.controls.nominalVoltage8.value!='NA' && row.controls.impedence8.value!='NA'){	
                  var current8= (row.controls.nominalVoltage8.value/row.controls.impedence8.value)/1000;	
                   row.controls.current8.value=current8.toFixed(3);	
                  }	
                  else if((row.controls.nominalVoltage8.value=='NA' && row.controls.impedence8.value=='NA') || (row.controls.nominalVoltage8.value=='NA' || row.controls.impedence8.value=='NA')){	
                   row.controls.current8.value='NA';	
                  }	
                  else{	
                   row.controls.current8.value='';	
                  }	
                  if(row.controls.nominalVoltage9.value!='' && row.controls.impedence9.value!='' && row.controls.impedence9.value!=undefined && row.controls.nominalVoltage9.value!=undefined 	
                  && row.controls.nominalVoltage9.value!='NA' && row.controls.impedence9.value!='NA'){	
                    var current9= (row.controls.nominalVoltage9.value/row.controls.impedence9.value)/1000;	
                    row.controls.current9.value=current9.toFixed(3);	
                   }	
                   else if((row.controls.nominalVoltage9.value=='NA' && row.controls.impedence9.value=='NA') || (row.controls.nominalVoltage9.value=='NA' || row.controls.impedence9.value=='NA')){	
                    row.controls.current9.value='NA';	
                   }	
                   else{	
                    row.controls.current9.value='';	
                   }	
         }

     onKeyImpedance1(event:KeyboardEvent,row:any){	
      if(row.controls.nominalVoltage1.value!='' && row.controls.impedence1.value!='' && row.controls.impedence1.value!=undefined && row.controls.nominalVoltage1.value!=undefined 	
      && row.controls.nominalVoltage1.value!='NA' && row.controls.impedence1.value!='NA'){	
        var current1= (row.controls.nominalVoltage1.value/row.controls.impedence1.value)/1000;	
        row.controls.current1.value=current1.toFixed(3);	
       }	
       else if((row.controls.nominalVoltage1.value=='NA' && row.controls.impedence1.value=='NA') || (row.controls.nominalVoltage1.value=='NA' || row.controls.impedence1.value=='NA')){	
        row.controls.current1.value='NA';	
       }	
       else{	
        row.controls.current1.value='';	
       }	
       if(row.controls.nominalVoltage2.value!='' && row.controls.impedence2.value!='' && row.controls.impedence2.value!=undefined && row.controls.nominalVoltage2.value!=undefined 	
       && row.controls.nominalVoltage2.value!='NA' && row.controls.impedence2.value!='NA'){	
         var current2= (row.controls.nominalVoltage2.value/row.controls.impedence2.value)/1000;	
         row.controls.current2.value=current2.toFixed(3);	
        }	
        else if((row.controls.nominalVoltage2.value=='NA' && row.controls.impedence2.value=='NA') || (row.controls.nominalVoltage2.value=='NA' || row.controls.impedence2.value=='NA')){	
         row.controls.current2.value='NA';	
        }	
        else{	
         row.controls.current2.value='';	
        }	
        if(row.controls.nominalVoltage3.value!='' && row.controls.impedence3.value!='' && row.controls.impedence3.value!=undefined && row.controls.nominalVoltage3.value!=undefined 	
        && row.controls.nominalVoltage3.value!='NA' && row.controls.impedence3.value!='NA'){	
          var current3= (row.controls.nominalVoltage3.value/row.controls.impedence3.value)/1000;	
          row.controls.current3.value=current3.toFixed(3);	
         }	
         else if((row.controls.nominalVoltage3.value=='NA' && row.controls.impedence3.value=='NA') || (row.controls.nominalVoltage3.value=='NA' || row.controls.impedence3.value=='NA')){	
          row.controls.current3.value='NA';	
         }	
         else{	
          row.controls.current3.value='';	
         }	
         if(row.controls.nominalVoltage4.value!='' && row.controls.impedence4.value!='' && row.controls.impedence4.value!=undefined && row.controls.nominalVoltage4.value!=undefined 	
         && row.controls.nominalVoltage4.value!='NA' && row.controls.impedence4.value!='NA'){	
          var current4= (row.controls.nominalVoltage4.value/row.controls.impedence4.value)/1000;	
          row.controls.current4.value=current4.toFixed(3);	
          }	
          else if((row.controls.nominalVoltage4.value=='NA' && row.controls.impedence4.value=='NA') || (row.controls.nominalVoltage4.value=='NA' || row.controls.impedence4.value=='NA')){	
           row.controls.current4.value='NA';	
          }	
          else{	
           row.controls.current4.value='';	
          }	
          if(row.controls.nominalVoltage5.value!='' && row.controls.impedence5.value!='' && row.controls.impedence5.value!=undefined && row.controls.nominalVoltage5.value!=undefined 	
          && row.controls.nominalVoltage5.value!='NA' && row.controls.impedence5.value!='NA'){	
            var current5= (row.controls.nominalVoltage5.value/row.controls.impedence5.value)/1000;	
            row.controls.current5.value=current5.toFixed(3);	
           }	
           else if((row.controls.nominalVoltage5.value=='NA' && row.controls.impedence5.value=='NA') || (row.controls.nominalVoltage5.value=='NA' || row.controls.impedence5.value=='NA')){	
            row.controls.current5.value='NA';	
           }	
           else{	
            row.controls.current5.value='';	
           }	
           if(row.controls.nominalVoltage6.value!='' && row.controls.impedence6.value!='' && row.controls.impedence6.value!=undefined && row.controls.nominalVoltage6.value!=undefined 	
           && row.controls.nominalVoltage6.value!='NA' && row.controls.impedence6.value!='NA'){	
            var current6= (row.controls.nominalVoltage6.value/row.controls.impedence6.value)/1000;	
            row.controls.current6.value=current6.toFixed(3);	
            }	
            else if((row.controls.nominalVoltage6.value=='NA' && row.controls.impedence6.value=='NA') || (row.controls.nominalVoltage6.value=='NA' || row.controls.impedence6.value=='NA')){	
             row.controls.current6.value='NA';	
            }	
            else{	
             row.controls.current6.value='';	
            }	
            if(row.controls.nominalVoltage7.value!='' && row.controls.impedence7.value!='' && row.controls.impedence7.value!=undefined && row.controls.nominalVoltage7.value!=undefined 	
            && row.controls.nominalVoltage7.value!='NA' && row.controls.impedence7.value!='NA'){	
              var current7= (row.controls.nominalVoltage7.value/row.controls.impedence7.value)/1000;	
              row.controls.current7.value=current7.toFixed(3);	
             }	
             else if((row.controls.nominalVoltage7.value=='NA' && row.controls.impedence7.value=='NA') || (row.controls.nominalVoltage7.value=='NA' || row.controls.impedence7.value=='NA')){	
              row.controls.current7.value='NA';	
             }	
             else{	
              row.controls.current7.value='';	
             }	
             if(row.controls.nominalVoltage8.value!='' && row.controls.impedence8.value!='' && row.controls.impedence8.value!=undefined && row.controls.nominalVoltage8.value!=undefined 	
             && row.controls.nominalVoltage8.value!='NA' && row.controls.impedence8.value!='NA'){	
               var current8= (row.controls.nominalVoltage8.value/row.controls.impedence8.value)/1000;	
               row.controls.current8.value=current8.toFixed(3);	
              }	
              else if((row.controls.nominalVoltage8.value=='NA' && row.controls.impedence8.value=='NA') || (row.controls.nominalVoltage8.value=='NA' || row.controls.impedence8.value=='NA')){	
               row.controls.current8.value='NA';	
              }	
              else{	
               row.controls.current8.value='';	
              }	
              if(row.controls.nominalVoltage9.value!='' && row.controls.impedence9.value!='' && row.controls.impedence9.value!=undefined && row.controls.nominalVoltage9.value!=undefined 	
              && row.controls.nominalVoltage9.value!='NA' && row.controls.impedence9.value!='NA'){	
                var current9= (row.controls.nominalVoltage9.value/row.controls.impedence9.value)/1000;	
                row.controls.current9.value=current9.toFixed(3);	
               }	
               else if((row.controls.nominalVoltage9.value=='NA' && row.controls.impedence9.value=='NA') || (row.controls.nominalVoltage9.value=='NA' || row.controls.impedence9.value=='NA')){	
                row.controls.current9.value='NA';	
               }	
               else{	
                row.controls.current9.value='';	
               }	
    }

//comments section starts
populateDataComments(retrievedCommentsData: any) {
  this.hideShowComment=true;
  this.reportViewerCommentArr = [];
  this.completedCommentArr3 = [];
  this.completedCommentArr4 = [];
  this.arrViewer = [];
  this.completedCommentArr1 = this.supplycharesteristicForm.get('completedCommentArr1') as FormArray;
 for(let value of retrievedCommentsData){
  this.arrViewer = [];
   if(this.currentUser1.role == 'Inspector' ) { //Inspector
    if(value.approveOrReject == 'APPROVED') {
      this.completedComments = true;
      this.enabledViewer=true;
      for(let j of retrievedCommentsData) {
        if(value.noOfComment == j.noOfComment) {
          this.completedCommentArr3.push(j);
        }
      }
       this.completedCommentArr4.push(this.addItem1(this.completedCommentArr3));               
      this.completedCommentArr3 = [];
    }
    for(let j of retrievedCommentsData) {
         if((j.approveOrReject == 'REJECT' || j.approveOrReject == '' || j.approveOrReject == null) && j.viewerFlag==1) {
          this.arrViewer.push(this.createCommentGroup(j));
         }
         else if(j.approveOrReject == 'APPROVED'){
          this.arrViewer = [];
        }        
      }
    this.enabledRequest=false;
    this.SendReply=false; 
       if(value.viewerFlag=='1'){
         if(value.inspectorFlag=='0')
        {
          this.basic.notification(1,value.viewerUserName,value.inspectorUserName,value.viewerDate,value.inspectorDate);
        }
        else{
          this.basic.notification(0,value.viewerUserName,value.inspectorUserName,value.viewerDate,value.inspectorDate);
        }
         this.hideCommentSection= false;
         this.SendReply=false; 
         this.replyCommentBox=true;
        // this.showReplyBox=true;
        if(value.inspectorFlag=='1'){
         this.enabled=true;
         this.hideAsViewerLogin=false;
         this.enabledViewer=true;
        }
        else{
         this.enabled=false;
         this.hideAsViewerLogin=true;
         this.enabledViewer=true;
        }
        }
        this.hideAdd=false;
        this.hideapprove=false;
        this.hideReject=false;
        // this.reportViewerCommentArr.push(this.createCommentGroup(value));
        // this.supplycharesteristicForm.setControl('viewerCommentArr', this.formBuilder.array(this.reportViewerCommentArr || []))
         }

         //Viewer starts
         else { 
           if(value.inspectorFlag=='1'){
             if(value.approveOrReject == 'APPROVED') {
              if(value.viewerFlag=='1' && value.inspectorFlag=='1')
              {
                this.basic.notification(0,value.viewerUserName,value.inspectorUserName,value.viewerDate,value.inspectorDate);
              }
               this.completedComments = true;
               this.enabledViewer=true;
               for(let j of retrievedCommentsData) {
                 if(value.noOfComment == j.noOfComment) {
                   this.completedCommentArr3.push(j);
                 }
               }
                this.completedCommentArr4.push(this.addItem1(this.completedCommentArr3));               
               this.completedCommentArr3 = [];
             }

             else{ //reject & null
               this.enabledViewer=true;
               if(value.viewerFlag=='1' && value.inspectorFlag=='1')
               {
                 if(value.approveOrReject == '') {
                
                 this.basic.notification(1,value.viewerUserName,value.inspectorUserName,value.viewerDate,value.inspectorDate);
                 }
               }
               if(retrievedCommentsData.length < 1) {
                 this.reportViewerCommentArr.push(this.addCommentViewer());
                 this.supplycharesteristicForm.setControl('viewerCommentArr', this.formBuilder.array(this.reportViewerCommentArr || []));
               }
               else {
                if(value.viewerFlag=='1' && value.inspectorFlag=='1')
                {
                  if(value.approveOrReject == '') {
                 
                  this.basic.notification(1,value.viewerUserName,value.inspectorUserName,value.viewerDate,value.inspectorDate);
                  }
                }
                  this.enabled=true;
                  this.enabledRequest=false;
                  this.hideAdd=false;
                  this.addReject=true;
                  this.hideapprove=true;
                  this.hideReject=true;
                 // this.hideDelete=true;
                  this.reportViewerCommentArr.push(this.createCommentGroup(value));
                  this.supplycharesteristicForm.setControl('viewerCommentArr', this.formBuilder.array(this.reportViewerCommentArr || []))
               }
               this.hideCommentSection= true;
               this.hideAsViewerLogin=false;
               this.replyCommentBox=true;
               // this.hideAdd=false;
               // this.hideapprove=false;
               // this.hideReject=false;
               this.SendReply=false;
               this.sendComment=true;
               //this.hideDelete=true;
             }   
             this.hideCommentSection= true;
             this.sendComment=true;
             this.hideRefresh=false;
             this.replyCommentBox=true;
             this.hideAdd=false;
            }
            else {
              //need to change
              if(value.viewerFlag=='1'){
               this.enabledViewer=true;
               this.sendComment=false;
               this.replyCommentBox=true;
               this.disableSend=true;
              }
              else{
               this.enabledViewer=false;
               this.sendComment=true;
               this.replyCommentBox=true;
              }
             this.reportViewerCommentArr.push(this.createCommentGroup(value));
             this.supplycharesteristicForm.setControl('viewerCommentArr', this.formBuilder.array(this.reportViewerCommentArr || []))
             this.reportViewerCommentArr = [];
             this.hideCommentSection= true;
            // this.sendComment=true;
             this.hideRefresh=false;
             
             //this.replyCommentBox=true;
             this.hideAdd=false;
             this.hideapprove=false;
             this.hideReject=false;
             //this.showReplyBox=true;
             this.enabledViewer=true;
            }
            for(let j of retrievedCommentsData) {
                 if(j.approveOrReject == 'REJECT' || j.approveOrReject == '' || j.approveOrReject == null) {
                  this.arrViewer.push(this.createCommentGroup(j));
                 }
                 else if(j.approveOrReject == 'APPROVED'){
                  this.arrViewer = [];
                }        
              }
         }       
       }
       if(this.currentUser1.role == 'Inspector' ) {
        if(this.arrViewer.length == 0) {
          this.hideCommentSection=false;
        }
      }
      else{
        if(this.arrViewer.length == 0) {
         this.arrViewer.push(this.addCommentViewer());
        }
      }
       this.supplycharesteristicForm.setControl('viewerCommentArr', this.formBuilder.array(this.arrViewer || []))
       this.supplycharesteristicForm.setControl('completedCommentArr1', this.formBuilder.array(this.completedCommentArr4 || []));
       //this.supplycharesteristicForm.markAsPristine();
}
getViewerFirstMessage(x: any) {
  return x.controls.completedCommentArr.controls[0].controls.viewerComments.value;
}
showHideAccordion(index: number) {  
  this.expandedIndexx = index === this.expandedIndexx ? -1 : index;  
  this.isClicked[index] = !this.isClicked[index];
  }
  createCommentGroup(value: any) : FormGroup {
    return this.formBuilder.group({
    viewerDateTime: new FormControl({disabled: false ,value: value.viewerDate}),
    inspectorUserName: new FormControl({disabled: false ,value: value.inspectorUserName}),
    viewerUserName: new FormControl({disabled: false ,value: value.viewerUserName}),
    inspectorDateTime: new FormControl({disabled: false ,value: value.inspectorDate}),
    approveOrReject: new FormControl({ disabled: this.enabledRequest, value: value.approveOrReject}),
    commentId: new FormControl({disabled: false ,value: value.commentsId}),
    viewerComments: new FormControl({disabled: value.viewerFlag != 0 ,value: value.viewerComment}),
    inspectorComments: new FormControl({disabled: value.inspectorFlag != 0 ,value: value.inspectorComment}),
  });
  }
  toggle(index:any) {
  this.replyCommentBox=false;
  this.isShowing = false;
  this.isExpanded = false;
  }
  replyToViewerComment(a: any){
  this.commentId = a.value.commentId;
  this.replyCommentBox=true;
  this.hideAsViewerLogin=false;
  this.hideapproveIcon=false;
  this.hideRejectIcon=false;
  this.SendReply=true;
  this.showReplyBox=true;
  this.toggleHideShow=true;
  }
  sendViewerComment(a: any){
      this.comments.userName = this.email;
      // this.comments.commentsId = this.step1Form.controls.viewerCommentArr.value[0].commentId;
      this.comments.commentsId =a.value.commentId;
      this.comments.viewerComment = a.value.viewerComments;
      this.comments.approveOrReject = '';
      this.supplyCharacteristicsService.sendComments(this.comments,this.supplycharesteristic.siteId).subscribe(
        (data) =>{
          this.commentSuccess=true;
          setTimeout(()=>{
            this.commentSuccess=false;
       }, 3000);
       this.disableSend=true;
       this.hideDelete=false;
        },
        (error) => {
        }
      )  
  }
  inspectorComment(a: any){
      this.comments.userName = this.email;
      this.comments.commentsId=a.value.commentId;
      this.comments.inspectorComment=a.value.inspectorComments;
      this.supplyCharacteristicsService.replyComments(this.comments,this.supplycharesteristic.siteId).subscribe(
        (data) =>{
          this.commentSuccess=true;
          setTimeout(()=>{
            this.commentSuccess=false;
       }, 3000);
       this.disableReply=true;
       this.basic.newNotify();
      // this.basic.notification(0,'viewerUserName','inspectorUserName','viewerDate','inspectorDate');
        },
        (error) => {
        }
      )  
  }
  approveComment(a: any){
      a.value.approveOrReject = 'APPROVED';
      this.enabledRequest=true;
      this.comments.userName = this.email;
      this.comments.commentsId = a.value.commentId;
      this.comments.approveOrReject = 'APPROVED';
      this.supplyCharacteristicsService.approveRejectComments(this.comments,this.supplycharesteristic.siteId).subscribe(
        (data) =>{
          this.commentApprove=true;
          setTimeout(()=>{
            this.commentApprove=false;
            this.refreshCommentSection();
            this.toggleHideShow=false;
       }, 3000);
       this.hideReject=false;
       this.hideRejectIcon=false;
       this.hideAdd=false;
       this.hideRefresh=true;
       this.basic.newNotify();
       //this.basic.notification(0,'viewerUserName','inspectorUserName','viewerDate','inspectorDate');
        },
        (error) => {
        }
      )  
    //  this.refreshComment('success');
  }
  rejectComment(a: any){
    a.value.approveOrReject = 'REJECT';
    this.addReject=true;
    this.hideAdd=true;
    this.enabledRequest=true;
    // this.completedComments=false;
    this.comments.userName = this.email;
    this.comments.commentsId = a.value.commentId;
    this.comments.approveOrReject = 'REJECT';
    this.supplyCharacteristicsService.approveRejectComments(this.comments,this.supplycharesteristic.siteId).subscribe(
      (data) =>{
        this.commentReject=true;
        setTimeout(()=>{
          this.commentReject=false;
     }, 3000);
     this.hideapprove=false;
     this.hideapproveIcon=false;
     this.basic.newNotify();
     //this.basic.notification(0,'viewerUserName','inspectorUserName','viewerDate','inspectorDate');
      },
      (error) => {
      }
    )  
}
  addAnotherviewerComment() {
      this.hideAdd=false;
      this.addReject=false;
      this.SendReply=false;
      this.sendComment=true;
      this.toggleHideShow=true;
      this.showSend=false;
      this.hideapprove=false;
      this.hideReject=true;
      this.hideInspText=false;
      this.viewerCommentArr = this.supplycharesteristicForm.get('viewerCommentArr') as FormArray;
      this.viewerCommentArr.push(this.addCommentViewer());
      this.hideDelete=true;
  }
  addCommentViewer() {
      return this.formBuilder.group({
      viewerComments: [''],
      inspectorComments: [''],
      approveFlag:[false]
      });
  }
  addCommentViewerApprove() {
    return this.formBuilder.group({
    viewerComments: [''],
    inspectorComments: [''],
    approveFlag:[true]
    });
}
  ViewerRemoveComment(index: any) {
      this.hideAdd=true;
     // this.toggleHideShow=false;
      this.showSend=true;
      this.hideapprove=false;
      this.hideReject=true;
      this.sendComment=false;
    
      (this.supplycharesteristicForm.get('viewerCommentArr') as FormArray).removeAt(index);
  }
  
  getViewerCommentControls(): AbstractControl[] {
      return (<FormArray>this.supplycharesteristicForm.get('viewerCommentArr')).controls;
  }
  getCompletedCommentControls1(): AbstractControl[] {
    return (<FormArray>this.supplycharesteristicForm.get('completedCommentArr1')).controls;
  }
  getCompletedCommentControls(form: any){
    return form.controls.completedCommentArr?.controls;
  }
  refreshCommentSection() {
    this.spinner=true;
    this.cardBodyComments=false;
    this.siteService.retrieveFinal(this.supplycharesteristic.siteId).subscribe(
      (data) => {
         this.commentDataArr = JSON.parse(data);
         this.step2List.supplyCharacteristics.supplyCharacteristicComment = this.commentDataArr.supplyCharacteristics.supplyCharacteristicComment;
         this.populateDataComments(this.step2List.supplyCharacteristics.supplyCharacteristicComment);
         setTimeout(()=>{
          this.spinner=false;
         this.cardBodyComments=true;
     }, 2000);
         this.showReplyBox=false;
         this.disableReply = false;
         this.disableSend = false;
      },
      (error) => {
   
      })
    }
  //  retrieveFromObservationSupply(data:any){
  //   this.observation=JSON.parse(data);
  //   this.observationValues=this.observation.observations;
  //   this.observationUpdateFlag=true;
  //   this.ObservationsForm.markAsPristine();
  //   }
    

  //   addObservationSupply(observationIter:any){
  //     if(this.supplycharesteristicForm.touched || this.supplycharesteristicForm.untouched){
  //       this.observationModalReference = this.modalService.open(observationIter, {
  //          centered: true, 
  //          size: 'md'
  //         })
  //      }
  //   }

  addItem1(item: any) : FormGroup {
    return this.formBuilder.group({
      completedCommentArr: this.formBuilder.array(this.completedComm(item)),
    });
  } 
  completedComm(item: any){
    this.completedCommentArr5 = [];
    for(let l of item) {
      this.completedCommentArr5.push(this.createCompletedCommentGroup(l));
    }
    return this.completedCommentArr5;
  }
  createCompletedCommentGroup(value: any)  : FormGroup {
    return this.formBuilder.group({
      viewerDateTime: new FormControl({disabled: false ,value: value.viewerDate}),
      inspectorDateTime: new FormControl({disabled: false ,value: value.inspectorDate}),
      inspectorUserName: new FormControl({disabled: false ,value: value.inspectorUserName}),
      viewerUserName: new FormControl({disabled: false ,value: value.viewerUserName}),
      commentId: new FormControl({disabled: false ,value: value.commentsId}),
      viewerComments: new FormControl({disabled: true ,value: value.viewerComment}),
      inspectorComments: new FormControl({disabled: true ,value: value.inspectorComment}),
    });
  }
//comments section ends


     populateData(value:any) {
      // if(this.service.disableFields==true){
      //   this.disable=true;
      //   }
      this.observeMainArr = []
      
      for (let item of value.boundingLocationReport) {     
        this.arr2.push(this.createGroup(item));
      }
      for (let item of value.instalLocationReport) {     
        this.arr1.push(this.createGroup1(item));
      }
      for (let item of value.earthingLocationReport) {     
        this.arr3.push(this.createGroup(item));
      }
      for (let item of value.supplyParameters) { 
        this.sources=true;    
        this.breaker=true;
        this.alArr.push(this.createGroupAl(item));
      }
      for (let item of value.supplyParameters) { 
        this.tableAC=true;    
        this.alArr2.push(this.createGroupAl2(item));
      }

      for (let item of value.circuitBreaker) {     
        this.circuitB.push(this.createGroupCircuitB(item));
      }

      for(let item of value.supplyOuterObservation) {
        if(item.observationComponentDetails == 'mains') {
          this.observeMainArr.push(this.createMainObserveForm(item))
          this.supplycharesteristic.liveConductorBNote = item.observationDescription;
        }
        else if(item.observationComponentDetails == 'instalLocationReportOb') {
          this.observeMainArr.push(this.createMainObserveForm(item))
          this.earthElectrodeObservation = item.observationDescription;
        }
        else if(item.observationComponentDetails == 'bondingNoOfJointsOb') {
          this.observeMainArr.push(this.createMainObserveForm(item))
          this.bondingConductorObservation = item.observationDescription;
        }
        else if(item.observationComponentDetails == 'earthingNoOfJointsOb') {
          this.observeMainArr.push(this.createMainObserveForm(item))
          this.earthingConductorObservation = item.observationDescription;
        }
        else if(item.observationComponentDetails == 'alternate') {
          this.observeMainArr.push(this.createMainObserveForm(item))
          if(item.alternativeInnerObservation.length != 0) {
          for(let i=0;i<this.alArr.length; i++){
            this.alArr[i].controls.supplyInnerObervationsId.setValue(item.alternativeInnerObservation[i].supplyInnerObervationsId) ;
            this.alArr[i].controls.aLLiveConductorBNote.setValue(item.alternativeInnerObservation[i].observationDescription);
          }
          }
        }
        if(item.observationDescription!=null && item.observationDescription!=undefined && item.observationDescription!=''){
          this.service.observationGlowSupply=true;
          }
      }
      this.supplycharesteristicForm.setControl('location2Arr', this.formBuilder.array(this.arr2 || []))
      this.supplycharesteristicForm.setControl('location1Arr', this.formBuilder.array(this.arr1 || []))
      this.supplycharesteristicForm.setControl('location3Arr', this.formBuilder.array(this.arr3 || []))
      this.supplycharesteristicForm.setControl('alternateArr', this.formBuilder.array(this.alArr || []))
      this.supplycharesteristicForm.setControl('circuitArr', this.formBuilder.array(this.circuitB || []))
      this.supplycharesteristicForm.setControl('observationArr', this.formBuilder.array(this.observeMainArr || []))


      this.arr1 = [];
      this.arr2 = [];
      this.arr3 = [];
      this.alArr = [];
      this.circuitB = [];
      this.observeMainArr = [];
    }

    private createMainObserveForm(item: any): FormGroup {
      return new FormGroup({
        supplyOuterObservationId: new FormControl({disabled: false, value: item.supplyOuterObservationId}),
        observationComponentDetails: new FormControl({disabled: false, value: item.observationComponentDetails}),
        observationDescription: new FormControl({disabled: false, value: item.observationDescription}),
        supplyOuterObservationStatus: new FormControl(item.supplyOuterObservationStatus),
        alternativeInnerObservation: this.formBuilder.array(this.createObserveArr(item.alternativeInnerObservation)),
      });
    }

    private createObserveArr(item: any){
      this.observArr = [];
      for(let i of item) {
        this.observArr.push(this.createObserveArr1(i));
      }
      return this.observArr
    }
    private createObserveArr1(item: any): FormGroup {
      return new FormGroup({
        supplyInnerObervationsId: new FormControl({disabled: false, value: item.supplyInnerObervationsId}),
        observationComponentDetails: new FormControl({disabled: false, value: item.observationComponentDetails}),
        observationDescription: new FormControl({disabled: false, value: item.observationDescription}),
        alternativeInnerObservationStatus: new FormControl({disabled: false, value: item.alternativeInnerObservationStatus}),
      });
    }

    createGroup(item: any): FormGroup {
      return this.formBuilder.group({
        locationReportId: new FormControl({disabled: false, value: item.locationReportId}),
        location: new FormControl({disabled: false ,value: item.location}, [Validators.required]),
        jointNo: new FormControl({disabled: false, value: item.jointNo}, [Validators.required]),
        jointReference: new FormControl({disabled: false ,value: item.jointReference}, [Validators.required]),
        jointResistance: new FormControl({disabled: false ,value: item.jointResistance}, [Validators.required]),
        instalLocationReportStatus: new FormControl({disabled: false,value: item.instalLocationReportStatus}),
        
      });
    }
    createGroup1(item: any): FormGroup {
      return this.formBuilder.group({
        locationReportId: new FormControl({disabled: false, value: item.locationReportId}),
        locationNo: new FormControl({disabled: false ,value: item.locationNo}, [Validators.required]),
        locationName: new FormControl({disabled: false, value: item.locationName}, [Validators.required]),
        electrodeEarthType: new FormControl({disabled: false, value: item.electrodeEarthType}, [Validators.required]),
        electrodeEarthMaterial: new FormControl({disabled: false, value: item.electrodeEarthMaterial}, [Validators.required]),
        electrodeEarthSize: new FormControl({disabled: false, value: item.electrodeEarthSize}, [Validators.required]),
        electrodeEarthDepth: new FormControl({disabled: false, value: item.electrodeEarthDepth}, [Validators.required]),
        electrodeResistanceEarth: new FormControl({disabled: false ,value: item.electrodeResistanceEarth}, [Validators.required]),
        electrodeResistanceGird: new FormControl({disabled: false ,value: item.electrodeResistanceGird}),
        instalLocationReportStatus: new FormControl({disabled: false ,value: item.instalLocationReportStatus})
      });
    }
    createGroupAl(item: any): FormGroup {
      return this.formBuilder.group({
        supplyparametersId: new FormControl({disabled: false, value: item.supplyparametersId}),
        supplyInnerObervationsId: new FormControl(''),
        aLSupplyNo: new FormControl({disabled: false ,value: item.aLSupplyNo}, [Validators.required]),
        aLSupplyShortName: new FormControl({disabled: false, value: item.aLSupplyShortName}, [Validators.required]),
        aLSystemEarthing: new FormControl({disabled: false ,value: item.aLSystemEarthing}, [Validators.required]),
        aLLiveConductorType: new FormControl({disabled: false ,value: item.aLLiveConductorType}, [Validators.required]),
        aLLiveConductorAC: new FormControl({disabled: false ,value: item.aLLiveConductorAC}, [Validators.required]),
        nominalFrequency: new FormControl({disabled: false ,value: item.nominalFrequency}, [Validators.required]),
        aLLiveConductorDC: new FormControl({disabled: false ,value: item.aLLiveConductorDC}),
        aLSystemEarthingBNote: new FormControl({disabled: false ,value: item.aLSystemEarthingBNote}, [Validators.required]),
        aLLiveConductorBNote: new FormControl({disabled: false ,value: item.aLLiveConductorBNote}, [Validators.required]),
        currentDissconnection: new FormControl({disabled: false ,value: item.currentDissconnection}, [Validators.required]),
        protectiveDevice: new FormControl({disabled: false ,value: item.protectiveDevice}, [Validators.required]),
        ratedCurrent: new FormControl({disabled: false ,value: item.ratedCurrent}, [Validators.required]),
        supplyParameterStatus: new FormControl({disabled: false, value: item.supplyParameterStatus}),
        nominalVoltageArr1: this.formBuilder.array([this.createNominalForm(item.nominalVoltage,item.nominalFrequency,item.faultCurrent,item.loopImpedance,item.installedCapacity,item.actualLoad)]),
      });
    }
    createGroupAl2(item: any): FormGroup {
      return this.formBuilder.group({
           NV1 : new FormControl({disabled: false ,value: item.NV1}),
            NV2 : new FormControl({disabled: false ,value: item.NV2}),
           NV3 : new FormControl({disabled: false ,value: item.NV3}),
           NV4 : new FormControl({disabled: false ,value: item.NV4}),
           NV5 : new FormControl({disabled: false ,value: item.NV5}),
          NV6 : new FormControl({disabled: false ,value: item.NV6}),
           NV7 : new FormControl({disabled: false ,value: item.NV7}),
           NV8 : new FormControl({disabled: false ,value: item.NV8}),
           NV9 : new FormControl({disabled: false ,value: item.NV9}),
      });
    }
    createGroupCircuitB(item: any): FormGroup {
      return this.formBuilder.group({
        circuitBreakerId: new FormControl({disabled: false, value: item.circuitBreakerId}),
        location: new FormControl({disabled: false ,value: item.location}, [Validators.required]),
        type: new FormControl({disabled: false ,value: item.type}, [Validators.required]),
        noPoles: new FormControl({disabled: false ,value: item.noPoles}, [Validators.required]),
        current: new FormControl({disabled: false ,value: item.current}, [Validators.required]),
        voltage: new FormControl({disabled: false ,value: item.voltage}, [Validators.required]),
        fuse: new FormControl({disabled: false ,value: item.fuse}, [Validators.required]),
        sourceName: new FormControl({disabled: false ,value: item.sourceName}, [Validators.required]),
        make: new FormControl({disabled: false ,value: item.make}, [Validators.required]),
        currentCurve: new FormControl({disabled: false ,value: item.currentCurve}, [Validators.required]),
        typeOfResidualCurrent: new FormControl({disabled: false ,value: item.typeOfResidualCurrent}, [Validators.required]),
        residualCurrent: new FormControl({disabled: false ,value: item.residualCurrent}, [Validators.required]),
  
        residualTime: new FormControl({disabled: false ,value: item.residualTime}, [Validators.required]),
      circuitStatus: new FormControl({disabled: false ,value: item.circuitStatus})
      });
    }
    createNominalForm(nominalVoltage: any, nominalFrequency: any, faultCurrent: any,loopImpedance: any,installedCapacity: any,actualLoad: any): FormGroup {
      let nominalVoltageAL= [];
      let nominalFrequencyAL = [];
      let faultCurrentAL= [];
      let  loopImpedanceAL= [];
      let  installedCapacityAL= [];
      let  actualLoadAL= [];
      
      nominalVoltageAL= nominalVoltage.split(",");
      nominalFrequencyAL=   nominalFrequency;
      faultCurrentAL=   faultCurrent.split(",");
      loopImpedanceAL=  loopImpedance.split(",");
      installedCapacityAL=  installedCapacity.split(",");
      actualLoadAL=   actualLoad.split(",");

      let item = [];
      item.push(nominalVoltageAL,nominalFrequencyAL,faultCurrentAL,loopImpedanceAL,installedCapacityAL,actualLoadAL);
      return new FormGroup({
        nominalVoltage1: new FormControl({disabled: false ,value: item[0][0]}),
        nominalVoltage2: new FormControl({disabled: false ,value: item[0][1]}),
        nominalVoltage3: new FormControl({disabled: false ,value: item[0][2]}),
        nominalVoltage4: new FormControl({disabled: false ,value: item[0][3]}),
        nominalVoltage5: new FormControl({disabled: false ,value: item[0][4]}),
        nominalVoltage6: new FormControl({disabled: false ,value: item[0][5]}),
        nominalVoltage7: new FormControl({disabled: false ,value: item[0][6]}),
        nominalVoltage8: new FormControl({disabled: false ,value: item[0][7]}),
        nominalVoltage9: new FormControl({disabled: false ,value: item[0][8]}),
  
        //nominalFrequency1: new FormControl({disabled: false ,value: item[1]}),
        // nominalFrequency2: new FormControl({disabled: false ,value: item[1][1]}),
        // nominalFrequency3: new FormControl({disabled: false ,value: item[1][2]}),
        // nominalFrequency4: new FormControl({disabled: false ,value: item[1][3]}),
        // nominalFrequency5: new FormControl({disabled: false ,value: item[1][4]}),
        // nominalFrequency6: new FormControl({disabled: false ,value: item[1][5]}),
        // nominalFrequency7: new FormControl({disabled: false ,value: item[1][6]}),
        // nominalFrequency8: new FormControl({disabled: false ,value: item[1][7]}),
        // nominalFrequency9: new FormControl({disabled: false ,value: item[1][8]}),
  
        current1: new FormControl({disabled: false ,value: item[2][0]}),
        current2: new FormControl({disabled: false ,value: item[2][1]}),
        current3: new FormControl({disabled: false ,value: item[2][2]}),
        current4: new FormControl({disabled: false ,value: item[2][3]}),
        current5: new FormControl({disabled: false ,value: item[2][4]}),
        current6: new FormControl({disabled: false ,value: item[2][5]}),
        current7: new FormControl({disabled: false ,value: item[2][6]}),
        current8: new FormControl({disabled: false ,value: item[2][7]}),
        current9: new FormControl({disabled: false ,value: item[2][8]}),
  
        impedence1: new FormControl({disabled: false ,value: item[3][0]}),
        impedence2: new FormControl({disabled: false ,value: item[3][1]}),
        impedence3: new FormControl({disabled: false ,value: item[3][2]}),
        impedence4: new FormControl({disabled: false ,value: item[3][3]}),
        impedence5: new FormControl({disabled: false ,value: item[3][4]}),
        impedence6: new FormControl({disabled: false ,value: item[3][5]}),
        impedence7: new FormControl({disabled: false ,value: item[3][6]}),
        impedence8: new FormControl({disabled: false ,value: item[3][7]}),
        impedence9: new FormControl({disabled: false ,value: item[3][8]}),
  
        capacity: new FormControl({disabled: false ,value: item[4][0]}),
  
        loadCurrent1: new FormControl({disabled: false ,value: item[5][0]}),
        loadCurrent2: new FormControl({disabled: false ,value: item[5][1]}),
        loadCurrent3: new FormControl({disabled: false ,value: item[5][2]}),
        loadCurrent4: new FormControl({disabled: false ,value: item[5][3]}),
      });
    }
    private createLocation2Form(): FormGroup {
      return new FormGroup({
        locationReportId: new FormControl(''),
        location: new FormControl('', [Validators.required]),
        jointNo: new FormControl('', [Validators.required]),
        jointReference: new FormControl('', [Validators.required]),
        jointResistance: new FormControl('', [Validators.required]),
        instalLocationReportStatus: new FormControl('A')
      });
    }

  private createLocation1Form(): FormGroup {
    return new FormGroup({
      locationReportId: new FormControl(''),
      locationNo: new FormControl('', [Validators.required]),
      locationName: new FormControl('', [Validators.required]),
      electrodeEarthType: new FormControl('', [Validators.required]),
      electrodeEarthMaterial: new FormControl('', [Validators.required]),
      electrodeEarthSize: new FormControl('', [Validators.required]),
      electrodeEarthDepth: new FormControl('', [Validators.required]),
      electrodeResistanceEarth: new FormControl('', [Validators.required]),
      electrodeResistanceGird: new FormControl(''),
      instalLocationReportStatus: new FormControl('A')
    });
  }

  private createLocation3Form(): FormGroup {
    return new FormGroup({
      locationReportId: new FormControl(''),
      location: new FormControl('', [Validators.required]),
      jointNo: new FormControl('', [Validators.required]),
      jointReference: new FormControl('', [Validators.required]),
      jointResistance: new FormControl('', [Validators.required]),
      instalLocationReportStatus: new FormControl('A')
    });
  }

  private SupplyparametersForm(): FormGroup {
    return new FormGroup({
      aLSupplyNo: new FormControl('', [Validators.required]),
      aLSupplyShortName: new FormControl('', [Validators.required]),
      aLSystemEarthing: new FormControl('', [Validators.required]),
      aLLiveConductorType: new FormControl('', [Validators.required]),
      aLLiveConductorAC: new FormControl(''),
      nominalFrequency: new FormControl(''),
      aLLiveConductorDC: new FormControl(''),
      aLSystemEarthingBNote: new FormControl(''),
      aLLiveConductorBNote: new FormControl('', [Validators.required]),
      nominalVoltage: new FormControl(''),
      //nominalFrequency: new FormControl(''),
      faultCurrent: new FormControl(''),
      loopImpedance: new FormControl(''),
      installedCapacity: new FormControl(''),
      actualLoad: new FormControl(''),
      nominalVoltageArr1: this.formBuilder.array([this.nominalVoltageForm()]),
      protectiveDevice: new FormControl('', [Validators.required]),
      ratedCurrent: new FormControl('', [Validators.required]),
      currentDissconnection: new FormControl('', [Validators.required]),
      alternateArrFormValue: new FormControl(''),
      supplyParameterStatus: new FormControl('A')
    });
  } 

  nominalVoltageForm(): FormGroup {
    return new FormGroup({
      nominalVoltage1: new FormControl(''),
      nominalVoltage2: new FormControl(''),
      nominalVoltage3: new FormControl(''),
      nominalVoltage4: new FormControl(''),
      nominalVoltage5: new FormControl(''),
      nominalVoltage6: new FormControl(''),
      nominalVoltage7: new FormControl(''),
      nominalVoltage8: new FormControl(''),
      nominalVoltage9: new FormControl(''),

      //nominalFrequency1: new FormControl(''),
      // nominalFrequency2: new FormControl(''),
      // nominalFrequency3: new FormControl(''),
      // nominalFrequency4: new FormControl(''),
      // nominalFrequency5: new FormControl(''),
      // nominalFrequency6: new FormControl(''),
      // nominalFrequency7: new FormControl(''),
      // nominalFrequency8: new FormControl(''),
      // nominalFrequency9: new FormControl(''),

      current1: new FormControl(''),
      current2: new FormControl(''),
      current3: new FormControl(''),
      current4: new FormControl(''),
      current5: new FormControl(''),
      current6: new FormControl(''),
      current7: new FormControl(''),
      current8: new FormControl(''),
      current9: new FormControl(''),

      impedence1: new FormControl(''),
      impedence2: new FormControl(''),
      impedence3: new FormControl(''),
      impedence4: new FormControl(''),
      impedence5: new FormControl(''),
      impedence6: new FormControl(''),
      impedence7: new FormControl(''),
      impedence8: new FormControl(''),
      impedence9: new FormControl(''),

      capacity: new FormControl(''),

      loadCurrent1: new FormControl(''),
      loadCurrent2: new FormControl(''),
      loadCurrent3: new FormControl(''),
      loadCurrent4: new FormControl(''),
    });
  }

  private createCircuitForm(): FormGroup {
    return new FormGroup({
      
      location: new FormControl('', [Validators.required]),
      sourceName: new FormControl('',Validators.required),
      make: new FormControl('', Validators.required),
      currentCurve: new FormControl('', Validators.required),
      type: new FormControl('', [Validators.required]),
      noPoles: new FormControl('', [Validators.required]),
      current: new FormControl('', [Validators.required]),
      voltage: new FormControl('', [Validators.required]),
      fuse: new FormControl('', [Validators.required]),
      typeOfResidualCurrent: new FormControl('', Validators.required),
      residualCurrent: new FormControl('', [Validators.required]),
      residualTime: new FormControl('', [Validators.required]),
      circuitStatus: new FormControl('A')
    });
  }
  
  // LocationsRecord(e: any, a: any) {
  //   let changedValue 
  //   if(e.target != undefined) {
  //     changedValue = e.target.value;
  //   }
  //   else{
  //     changedValue = e;
  //   }
  //   if (changedValue == 0) {
  //     this.key1LocationTable = false;
  //     this.f.location1Arr.controls[a].controls['locationNo'].clearValidators();
  //     this.f.location1Arr.controls[a].controls[
  //       'locationNo'
  //     ].updateValueAndValidity();

  //     this.f.location1Arr.controls[a].controls['locationName'].clearValidators();
  //     this.f.location1Arr.controls[a].controls[
  //       'locationName'
  //     ].updateValueAndValidity();

  //     this.f.location1Arr.controls[a].controls['electrodeEarthType'].clearValidators();
  //     this.f.location1Arr.controls[a].controls[
  //       'electrodeEarthType'
  //     ].updateValueAndValidity();

  //     this.f.location1Arr.controls[a].controls['electrodeEarthMaterial'].clearValidators();
  //     this.f.location1Arr.controls[a].controls[
  //       'electrodeEarthMaterial'
  //     ].updateValueAndValidity();

  //     this.f.location1Arr.controls[a].controls['electrodeEarthSize'].clearValidators();
  //     this.f.location1Arr.controls[a].controls[
  //       'electrodeEarthSize'
  //     ].updateValueAndValidity();

  //     this.f.location1Arr.controls[a].controls['electrodeEarthDepth'].clearValidators();
  //     this.f.location1Arr.controls[a].controls[
  //       'electrodeEarthDepth'
  //     ].updateValueAndValidity();

  //     this.f.location1Arr.controls[a].controls['electrodeResistanceEarth'].clearValidators();
  //     this.f.location1Arr.controls[a].controls[
  //       'electrodeResistanceEarth'
  //     ].updateValueAndValidity();
     
  //     }
  //    else {
  //     this.key1LocationTable=true;
  //     this.f.location1Arr.controls[a].controls['locationNo'].setValidators(
  //       Validators.required
  //     );
  //     this.f.location1Arr.controls[a].controls['locationNo'].updateValueAndValidity();
  //     this.f.location1Arr.controls[a].controls['locationName'].setValidators(
  //       Validators.required
  //     );
  //     this.f.location1Arr.controls[a].controls[
  //       'locationName'
  //     ].updateValueAndValidity();
  //     this.f.location1Arr.controls[a].controls['electrodeEarthType'].setValidators(
  //       Validators.required
  //     );
  //     this.f.location1Arr.controls[a].controls[
  //       'electrodeEarthType'
  //     ].updateValueAndValidity();

  //     this.f.location1Arr.controls[a].controls['electrodeEarthMaterial'].setValidators(
  //       Validators.required
  //     );
  //     this.f.location1Arr.controls[a].controls[
  //       'electrodeEarthMaterial'
  //     ].updateValueAndValidity();

  //     this.f.location1Arr.controls[a].controls['electrodeEarthSize'].setValidators(
  //       Validators.required
  //     );
  //     this.f.location1Arr.controls[a].controls[
  //       'electrodeEarthSize'
  //     ].updateValueAndValidity();

  //     this.f.location1Arr.controls[a].controls['electrodeEarthDepth'].setValidators(
  //       Validators.required
  //     );
  //     this.f.location1Arr.controls[a].controls[
  //       'electrodeEarthDepth'
  //     ].updateValueAndValidity();

  //     this.f.location1Arr.controls[a].controls['electrodeResistanceEarth'].setValidators(
  //       Validators.required
  //     );
  //     this.f.location1Arr.controls[a].controls[
  //       'electrodeResistanceEarth'
  //     ].updateValueAndValidity();
    
  //   }
  // }

  onKey1(event: KeyboardEvent) {
    
    this.values = (<HTMLInputElement>event.target).value;
    this.value = this.values;
    this.location1Arr = this.supplycharesteristicForm.get(
      'location1Arr'
    ) as FormArray;
    if(this.value!=0){
     
      this.key1LocationTable=true;
    if (this.location1Arr.length == 0) {
     
      if (this.value != '') {
       
        for (this.i = 0; this.i < this.value; this.i++) {
          this.location1Arr = this.supplycharesteristicForm.get(
            'location1Arr'
          ) as FormArray;
          this.location1Arr.push(this.createLocation1Form());
        }
      }
    } 
    else if (this.value == '') {
     
      this.loclength = this.location1Arr.length;
      for (this.i = 1; this.i < this.loclength; this.i++) {
        this.location1Arr.removeAt(this.location1Arr.length - 1);
      }
    } 
    else if (this.location1Arr.length < this.value) {
     
      if (this.value != '') {
       
        this.delarr = this.value - this.location1Arr.length;
        for (this.i = 0; this.i < this.delarr; this.i++) {
          this.location1Arr = this.supplycharesteristicForm.get(
            'location1Arr'
          ) as FormArray;
          this.location1Arr.push(this.createLocation1Form());
        }
      }
    } 
    else if (this.location1Arr.length > this.value && this.value != 0) {
     
      if (this.value != '') {
       
        this.delarr = this.location1Arr.length - this.value;
        for (this.i = 0; this.i < this.delarr; this.i++) {

          let a = this.location1Arr.value[this.location1Arr.length-1];
          if(a.locationReportId != 0 && a.locationReportId != undefined && a.locationReportId != ''){
            a.instalLocationReportStatus = 'R';
            this.locationArr = this.locationArr.concat(a);
          }
          

          this.location1Arr = this.supplycharesteristicForm.get(
            'location1Arr'
          ) as FormArray;
          this.location1Arr.removeAt(this.location1Arr.length - 1);
        }
      }
    }
    }
    else if(this.value == 0 && this.value != '') {
      this.key1LocationTable=false;
      this.delarr = this.location1Arr.length - this.value;
        for (this.i = 0; this.i < this.delarr; this.i++) {
          let a = this.location1Arr.value[this.location1Arr.length - 1];
          if(a.locationReportId != 0 && a.locationReportId != undefined && a.locationReportId != ''){
            a.instalLocationReportStatus = 'R';
            this.locationArr = this.locationArr.concat(a);
          }       
          this.location1Arr = this.supplycharesteristicForm.get(
            'location1Arr'
          ) as FormArray;
          this.location1Arr.removeAt(this.location1Arr.length - 1);
        }

    }
}

    // this.f.location1Arr.controls[i].controls['locationNo'].clearValidators();
    //   this.f.location1Arr.controls[i].controls[
    //     'locationNo'
    //   ].updateValueAndValidity();
    //   this.f.location1Arr.controls[i].controls['locationName'].clearValidators();
    //   this.f.location1Arr.controls[i].controls[
    //     'locationName'
    //   ].updateValueAndValidity();
    //   this.f.location1Arr.controls[i].controls['electrodeResistanceEarth'].clearValidators();
    //   this.f.location1Arr.controls[i].controls[
    //     'electrodeResistanceEarth'
    //   ].updateValueAndValidity();
    

  // jointSafetyRecord(e: any, a: any) {
  //   let changedValue
  //   if(e.target != undefined) {
  //     changedValue = e.target.value;
  //   }
  //   else{
  //     changedValue = e;
  //   }
  //   if (changedValue == 0) {
  //     this.key1LocationTable = false;
  //     this.supplycharesteristicForm.controls['bondingJointsType'].clearValidators();
  //     this.supplycharesteristicForm.controls[
  //       'bondingJointsType'
  //     ].updateValueAndValidity();
  //     this.f.location2Arr.controls[a].controls['location'].clearValidators();
  //     this.f.location2Arr.controls[a].controls[
  //       'location'
  //     ].updateValueAndValidity();
  //     this.f.location2Arr.controls[a].controls['jointNo'].clearValidators();
  //     this.f.location2Arr.controls[a].controls[
  //       'jointNo'
  //     ].updateValueAndValidity();
  //     this.f.location2Arr.controls[a].controls['jointReference'].clearValidators();
  //     this.f.location2Arr.controls[a].controls[
  //       'jointReference'
  //     ].updateValueAndValidity();
  //     this.f.location2Arr.controls[a].controls['jointResistance'].clearValidators();
  //     this.f.location2Arr.controls[a].controls[
  //       'jointResistance'
  //     ].updateValueAndValidity();
  //     }
  //    else {
  //     this.key1LocationTable=true;
  //     this.supplycharesteristicForm.controls['bondingJointsType'].setValidators(
  //       Validators.required
  //     );
  //     this.supplycharesteristicForm.controls['bondingJointsType'].updateValueAndValidity();
  //     this.f.location2Arr.controls[a].controls['location'].setValidators(
  //       Validators.required
  //     );
  //     this.f.location2Arr.controls[a].controls['location'].updateValueAndValidity();
  //     this.f.location2Arr.controls[a].controls['jointNo'].setValidators(
  //       Validators.required
  //     );
  //     this.f.location2Arr.controls[a].controls[
  //       'jointNo'
  //     ].updateValueAndValidity();
  //     this.f.location2Arr.controls[a].controls['jointReference'].setValidators(
  //       Validators.required
  //     );
  //     this.f.location2Arr.controls[a].controls[
  //       'jointReference'
  //     ].updateValueAndValidity();
  //     this.f.location2Arr.controls[a].controls['jointResistance'].setValidators(
  //       Validators.required
  //     );
  //     this.f.location2Arr.controls[a].controls[
  //       'jointResistance'
  //     ].updateValueAndValidity();
  //   }
  // }

  // savingArr(){
  //   this.location2Arr.push(this.createLocation1Form());
  // }

  onKey(event: KeyboardEvent) {
    
    this.values='';
    if(event.target != undefined) {
      this.values = (<HTMLInputElement>event.target).value;    
    }
    else{
      this.values =event;
    }
    // this.values = (<HTMLInputElement>event.target).value;
    this.value = this.values;
    this.location2Arr = this.supplycharesteristicForm.get(
      'location2Arr'
    ) as FormArray;
    if(this.value!=0){
      this.JointLocationTable=true;
      this.supplycharesteristicForm.controls['bondingJointsType'].setValidators(Validators.required);
      this.supplycharesteristicForm.controls['bondingJointsType'].updateValueAndValidity();
      if (this.location2Arr.length == 0) {
      
        if (this.value != '') {
        
          for (this.i = 0; this.i < this.value; this.i++) {
            this.location2Arr = this.supplycharesteristicForm.get(
              'location2Arr'
            ) as FormArray;
            this.location2Arr.push(this.createLocation2Form());
          }
        }
      } 
      else if (this.value == '') {
      
        this.loclength = this.location2Arr.length;
        for (this.i = 1; this.i < this.loclength; this.i++) {
          this.location2Arr.removeAt(this.location2Arr.length - 1);
          
        }
      } 
      else if (this.location2Arr.length < this.value) {
      
        if (this.value != '') {
        
          this.delarr = this.value - this.location2Arr.length;
          for (this.i = 0; this.i < this.delarr; this.i++) {
            this.location2Arr = this.supplycharesteristicForm.get(
              'location2Arr'
            ) as FormArray;
            this.location2Arr.push(this.createLocation2Form());
          }
        }
      } 
      else if (this.location2Arr.length > this.value && this.value != 0) {
      
        if (this.value != '') {
        
          this.delarr = this.location2Arr.length - this.value;
          for (this.i = 0; this.i < this.delarr; this.i++) {

            let a = this.location2Arr.value[this.location2Arr.length-1];
            if(a.locationReportId != 0 && a.locationReportId != undefined && a.locationReportId != ''){
            a.instalLocationReportStatus = 'R';
            this.boundingArr = this.boundingArr.concat(a);
            }
            this.location2Arr = this.supplycharesteristicForm.get(
              'location2Arr'
            ) as FormArray;
            this.location2Arr.removeAt(this.location2Arr.length - 1);
          }
        }
      }
    }

    else if(this.value == 0 && this.value != '') {
      this.JointLocationTable=false;
      this.delarr = this.location2Arr.length - this.value;
        for (this.i = 0; this.i < this.delarr; this.i++) {
          let a = this.location2Arr.value[this.location2Arr.length - 1];
          if(a.locationReportId != 0 && a.locationReportId != undefined && a.locationReportId != ''){
            a.instalLocationReportStatus = 'R';
            this.boundingArr = this.boundingArr.concat(a);
          }       
          this.location2Arr = this.supplycharesteristicForm.get(
            'location2Arr'
          ) as FormArray;
          this.location2Arr.removeAt(this.location2Arr.length - 1);
        }
        this.supplycharesteristicForm.controls['bondingJointsType'].setValue('');
        this.supplycharesteristicForm.controls['bondingJointsType'].clearValidators();
            this.supplycharesteristicForm.controls[
              'bondingJointsType'
            ].updateValueAndValidity();
    }
  // else{
  //   this.JointLocationTable=false;
  // }
  }
  // keyTypeJoint(event: KeyboardEvent){ //Type of Joints
  //   this.values = (<HTMLInputElement>event.target).value;
  //   this.service.jointType = this.values;
  //     if (this.location3Arr.length == 0) {
  //       if (this.service.jointType != '') {
  //         for (this.i = 1; this.i < this.service.jointType; this.i++) {
  //           this.location3Arr = this.supplycharesteristicForm.get(
  //             'location3Arr'
  //           ) as FormArray;
  //           this.location3Arr.push(this.createLocation3Form());
  //         }
  //       }
  //     } 
  //      if (this.service.jointType == '') {
  //       this.loclength = this.location3Arr.length;
  //       for (this.i = 1; this.i < this.loclength; this.i++) {
  //         this.location3Arr.removeAt(this.location3Arr.length - 1);
  //       }
  //     } 
  //     else if (this.location3Arr.length < this.service.jointType) {
  //       if (this.service.jointType != '') {
  //         this.delarr = this.service.jointType - this.location3Arr.length;
  //         for (this.i = 0; this.i < this.delarr; this.i++) {
  //           this.location3Arr = this.supplycharesteristicForm.get(
  //             'location3Arr'
  //           ) as FormArray;
  //           this.location3Arr.push(this.createLocation3Form());
  //         }
  //       }
  //     } 
  //     else if (this.location3Arr.length > this.service.jointType || this.service.jointType != 0) {
  //       if (this.service.jointType != '') {
  //         this.delarr = this.location3Arr.length - this.service.jointType;
  //         for (this.i = 0; this.i < this.delarr; this.i++) {
  //           this.location3Arr = this.supplycharesteristicForm.get(
  //             'location3Arr'
  //           ) as FormArray;
  //           this.location3Arr.removeAt(this.location3Arr.length - 1);
  //         }
  //       }
  //     }
  //   //   else if((this.service.jointType==0 && this.service.noOfjoint==1) || (this.service.jointType==0 && this.service.noOfjoint==''))
  //   //     {
  //   //       this.keyJOintLocationTable=true;
  //   //   }
  //   // else if(this.service.jointType==0 && this.service.noOfjoint==0){ 
  //   //   this.keyJOintLocationTable=false;
  //   // }
  // }
  // jointRecord(e: any, a: any) {
  //   let changedValue
  //   if(e.target != undefined) {
  //     changedValue = e.target.value;
  //   }
  //   else{
  //     changedValue = e;
  //   }
  //   if (changedValue == 0) {
  //     this.key1LocationTable = false;
  //     this.supplycharesteristicForm.controls['earthingJointsType'].clearValidators();
  //     this.supplycharesteristicForm.controls[
  //       'earthingJointsType'
  //     ].updateValueAndValidity();
  //     this.f.location3Arr.controls[a].controls['location'].clearValidators();
  //     this.f.location3Arr.controls[a].controls[
  //       'location'
  //     ].updateValueAndValidity();
  //     this.f.location3Arr.controls[a].controls['jointNo'].clearValidators();
  //     this.f.location3Arr.controls[a].controls[
  //       'jointNo'
  //     ].updateValueAndValidity();
  //     this.f.location3Arr.controls[a].controls['jointResistance'].clearValidators();
  //     this.f.location3Arr.controls[a].controls[
  //       'jointResistance'
  //     ].updateValueAndValidity();
  //     this.f.location3Arr.controls[a].controls['jointResistance'].clearValidators();
  //     this.f.location3Arr.controls[a].controls[
  //       'jointResistance'
  //     ].updateValueAndValidity();
  //     }
  //    else {
  //     this.key1LocationTable=true;
  //     this.supplycharesteristicForm.controls['earthingJointsType'].setValidators(
  //       Validators.required
  //     );
  //     this.supplycharesteristicForm.controls['earthingJointsType'].updateValueAndValidity();
  //     this.f.location3Arr.controls[a].controls['location'].setValidators(
  //       Validators.required
  //     );
  //     this.f.location3Arr.controls[a].controls['location'].updateValueAndValidity();
  //     this.f.location3Arr.controls[a].controls['jointNo'].setValidators(
  //       Validators.required
  //     );
  //     this.f.location3Arr.controls[a].controls[
  //       'jointNo'
  //     ].updateValueAndValidity();
  //     this.f.location3Arr.controls[a].controls['jointResistance'].setValidators(
  //       Validators.required
  //     );
  //     this.f.location3Arr.controls[a].controls[
  //       'jointResistance'
  //     ].updateValueAndValidity();
  //   }
  // }
  onKey3(event: KeyboardEvent) { //No Of Joints
    
    this.values='';
    if(event.target != undefined) {
      this.values = (<HTMLInputElement>event.target).value;    
    }
    else{
      this.values =event;
    }

    // this.values = (<HTMLInputElement>event.target).value;
    this.service.noOfjoint = this.values;
    this.value= this.values;
    this.location3Arr = this.supplycharesteristicForm.get(
      'location3Arr'
    ) as FormArray;
    if(this.value!=0){
      this.keyJOintLocationTable=true;
      this.supplycharesteristicForm.controls['earthingJointsType'].setValidators(Validators.required);
      this.supplycharesteristicForm.controls['earthingJointsType'].updateValueAndValidity();
      if (this.location3Arr.length == 0) {
      
        if (this.value != '') {
        
          for (this.i = 0; this.i < this.value; this.i++) {
            this.location3Arr = this.supplycharesteristicForm.get(
              'location3Arr'
            ) as FormArray;
            this.location3Arr.push(this.createLocation3Form());
          }
        }
      } 
      else if (this.value == '') {
      
        this.loclength = this.location3Arr.length;
        for (this.i = 1; this.i < this.loclength; this.i++) {
          this.location3Arr.removeAt(this.location3Arr.length - 1);
        }
      } 
      else if (this.location3Arr.length < this.value) {
      
        if (this.value != '') {
        
          this.delarr = this.value - this.location3Arr.length;
          for (this.i = 0; this.i < this.delarr; this.i++) {
            this.location3Arr = this.supplycharesteristicForm.get(
              'location3Arr'
            ) as FormArray;
            this.location3Arr.push(this.createLocation3Form());
          }
        }
      } 
      else if (this.location3Arr.length > this.value && this.value != 0) {
      
        if (this.value != '') {
        
          this.delarr = this.location3Arr.length - this.value;
          for (this.i = 0; this.i < this.delarr; this.i++) {
            let a = this.location3Arr.value[this.location3Arr.length-1];
            a.instalLocationReportStatus = 'R';
            this.earthingArr = this.earthingArr.concat(a);
            this.location3Arr = this.supplycharesteristicForm.get(
              'location3Arr'
            ) as FormArray;
            this.location3Arr.removeAt(this.location3Arr.length - 1);
          }
        }
      }
    }
    else if(this.value == 0 && this.value != '') {
      this.keyJOintLocationTable=false;
      this.delarr = this.location3Arr.length - this.value;
        for (this.i = 0; this.i < this.delarr; this.i++) {
          let a = this.location3Arr.value[this.location3Arr.length - 1];
          if(a.locationReportId != 0 && a.locationReportId != undefined && a.locationReportId != ''){
            a.instalLocationReportStatus = 'R';
            this.earthingArr = this.earthingArr.concat(a);
          }       
          this.location3Arr = this.supplycharesteristicForm.get(
            'location3Arr'
          ) as FormArray;
          this.location3Arr.removeAt(this.location3Arr.length - 1);
        }
      this.supplycharesteristicForm.controls['earthingJointsType'].setValue('');
      this.supplycharesteristicForm.controls['earthingJointsType'].clearValidators();
      this.supplycharesteristicForm.controls[
        'earthingJointsType'
      ].updateValueAndValidity();
    }
//     else if((this.service.jointType==1 && this.service.noOfjoint==0) || (this.service.jointType=='' && this.service.noOfjoint==0))
//     {
//       this.keyJOintLocationTable=true;
//   }
//  else if(this.service.jointType==0 && this.service.noOfjoint==0){ 
//   this.keyJOintLocationTable=false;
//  }
  }
 
  getLocation1Controls(): AbstractControl[] {
    return (<FormArray>this.supplycharesteristicForm.get('location1Arr'))
      .controls;
  }

  getLocation2Controls(): AbstractControl[] {
    return (<FormArray>this.supplycharesteristicForm.get('location2Arr'))
      .controls;
  }

  getLocation3Controls(): AbstractControl[] {
    return (<FormArray>this.supplycharesteristicForm.get('location3Arr'))
      .controls;
  }
  getLocation4Controls(): AbstractControl[] {
    return (<FormArray>this.supplycharesteristicForm.get('alternateArr'))
      .controls;
  }

  getCircuitControls(): AbstractControl[] {
    return (<FormArray>this.supplycharesteristicForm.get('circuitArr'))
      .controls;
  }
  getTableArray(form: any) {
    return form.controls.nominalVoltageArr1.controls;
  }

  enableBriefNote(e: any, a: any) {
   
    let changedValue
    if(e.target != undefined) {
      changedValue = e.target.value;
    }
    else{
      changedValue = e;
    }
    if(changedValue == 'Others') {
      a.controls.aLSystemEarthingBNote.setValidators(Validators.required);
      a.controls.aLSystemEarthingBNote.updateValueAndValidity();
    }
    else {
      a.controls.aLSystemEarthingBNote.clearValidators();
      a.controls.aLSystemEarthingBNote.updateValueAndValidity();
    }
  }

  showValue(e: any, a: any) {
    let changedValue = e.target.value;
    if (changedValue == 'AC') {
      this.f.alternateArr.controls[a].controls[
        'aLLiveConductorDC'
      ].clearValidators();
      this.f.alternateArr.controls[a].controls[
        'aLLiveConductorDC'
      ].updateValueAndValidity();

      this.f.alternateArr.controls[a].controls[
        'aLLiveConductorAC'
      ].setValidators(Validators.required);
      this.f.alternateArr.controls[a].controls[
        'aLLiveConductorAC'
      ].updateValueAndValidity();

      this.f.alternateArr.controls[a].controls[
        'nominalFrequency'
      ].setValidators(Validators.required);
      this.f.alternateArr.controls[a].controls[
        'nominalFrequency'
      ].updateValueAndValidity();

    } else {
      this.f.alternateArr.controls[a].controls[
        'aLLiveConductorAC'
      ].clearValidators();
      this.f.alternateArr.controls[a].controls[
        'aLLiveConductorAC'
      ].updateValueAndValidity();
      this.f.alternateArr.controls[a].controls[
        'nominalFrequency'
      ].clearValidators();
      this.f.alternateArr.controls[a].controls[
        'nominalFrequency'
      ].updateValueAndValidity();

      this.f.alternateArr.controls[a].controls[
        'aLLiveConductorDC'
      ].setValidators(Validators.required);
      this.f.alternateArr.controls[a].controls[
        'aLLiveConductorDC'
      ].updateValueAndValidity();
    }
  }
  changeSystem(e: any) {
    let changedValue;
    if(e.target != undefined) {
      changedValue = e.target.value;
    }
    else{
      changedValue = e;
    }
    if (changedValue == 'Others') {
      this.showRemarks = true;
      this.showBrief=false;
      this.supplycharesteristicForm.controls['briefNote'].setValidators([Validators.required]);
      this.supplycharesteristicForm.controls[
        'briefNote'
      ].updateValueAndValidity();
    } else {
      this.showRemarks = false;
      this.showBrief=true;
      this.supplycharesteristicForm.controls['briefNote'].clearValidators();
      this.supplycharesteristicForm.controls[
        'briefNote'
      ].updateValueAndValidity();
    }
  }
  changeCurrent(e: any) {
    let changedValue;
    if(e.target != undefined) {
      changedValue = e.target.value;
    }
    else{
      changedValue = e;
    }
    if (changedValue == 'AC') {
      this.enableAC = true;
      this.enableDC = false;
      this.tableAC = true;
      this.supplycharesteristicForm.controls['DcConductor'].clearValidators();
      this.supplycharesteristicForm.controls[
        'DcConductor'
      ].updateValueAndValidity();
      this.supplycharesteristicForm.controls['AcConductor'].setValidators([
        Validators.required,
      ]);
      this.supplycharesteristicForm.controls[
        'AcConductor'
      ].updateValueAndValidity();
    } else {
      this.enableDC = true;
      this.enableAC = false;
      this.tableAC = false;
      this.supplycharesteristicForm.controls['AcConductor'].clearValidators();
      this.supplycharesteristicForm.controls[
        'AcConductor'
      ].updateValueAndValidity();
      this.supplycharesteristicForm.controls['DcConductor'].setValidators([
        Validators.required,
      ]);
      this.supplycharesteristicForm.controls[
        'DcConductor'
      ].updateValueAndValidity();
    }
  }

  changeCurrent2(e: any) {
    let changedValue = e.target.value;
    if (changedValue == 'AC') {
      this.enable2AC = true;
      this.enable2DC = false;
      this.table2AC = true;
    } else {
      this.enable2DC = true;
      this.enable2AC = false;
      this.table2AC = false;
    }
  }

  showAlternateField(event: any) {
    
    const items = (<FormArray>this.supplycharesteristicForm.get('circuitArr'));
          let g = items.length;
    this.alternateArr = this.supplycharesteristicForm.get(
      'alternateArr'
    ) as FormArray;

    let changedValue;
    if(event.target != undefined) {
      changedValue = event.target.value;
    }
    else{ 
      changedValue = event;
    }

    if (changedValue == 'No') {
      this.sources = false;
      this.breaker = false;
      this.alternativeSupplyNo=false;
      this.observationArr = this.supplycharesteristicForm.get('observationArr') as FormArray;
      //if (this.alternateArr.length == 1 || this.alternateArr.length < this.value) {
      this.observationAlternateArr = this.observationArr.controls[4].controls.alternativeInnerObservation as FormArray;
      if (this.alternateArr.length != 0) {
        let b = parseInt(this.supplycharesteristicForm.value.supplyNumber);
        for (this.i = 0; this.i < b; this.i++) {
          let d = this.alternateArr.value[this.alternateArr.length-1];
          let x= this.observationAlternateArr.value[this.alternateArr.length-1]

          if(d!=undefined){

            if(d.supplyparametersId !=0 && d.supplyparametersId !=undefined && d.supplyparametersId != ''){
              d.supplyParameterStatus = 'R';
              this.alternateArr1 = this.alternateArr1.concat(d);
            }
            if(x.supplyInnerObervationsId !=0 && x.supplyInnerObervationsId !=undefined && x.supplyInnerObervationsId != '') {
              x.alternativeInnerObservationStatus= 'R';
              this.deletedObservation.push(x);
            }
            this.alternateArr = this.supplycharesteristicForm.get(
              'alternateArr'
            ) as FormArray;


              //new code
              let e = items.value[(this.alternateArr.length-1)+1];

                if(e.circuitBreakerId != 0 && e.circuitBreakerId !=undefined && e.circuitBreakerId != ''){
                  e.circuitStatus = 'R';
                  this.circuitArr1 = this.circuitArr1.concat(e);
                }
                
                this.circuitArr = this.supplycharesteristicForm.get(
                  'circuitArr'
                ) as FormArray;
                this.circuitArr.removeAt((this.alternateArr.length-1)+1);
                this.observationAlternateArr.removeAt(this.alternateArr.length-1);
                this.alternateArr.removeAt(this.alternateArr.length-1);


          // elango old code
          //   for (let i = 0; i <= g; i++) {
          //     let e = items.value[i];
          //     console.log(e); 
          //     if(d.aLSupplyShortName == e.sourceName){

          //       if(e.circuitBreakerId != 0 && e.circuitBreakerId !=undefined && e.circuitBreakerId != ''){
          //         e.circuitStatus = 'R';
          //         this.circuitArr1 = this.circuitArr1.concat(e);
          //       }
                
          //       this.circuitArr = this.supplycharesteristicForm.get(
          //         'circuitArr'
          //       ) as FormArray;
          //       this.circuitArr.removeAt(i);
          //       this.alternateArr.removeAt(0);
          //       this.observationAlternateArr.removeAt(0);

          //       break 
          //       }

          //  }
        }
    }
    this.supplycharesteristic.alternativeSupply= 'No';
    this.supplycharesteristicForm.markAsPristine();
    //elango code
    // this.supplycharesteristic.supplyNumber = '0';
  }
      this.disableValidators();
    }
     else {
      this.alternativeSupplyNo=true;
      this.supplycharesteristicForm.controls['supplyNumber'].setValidators([
        Validators.required,Validators.min(1)]);
      this.supplycharesteristicForm.controls[
        'supplyNumber'
      ].updateValueAndValidity();
    }
    
  }

  onKeyAlernate(event: KeyboardEvent) {
    
    this.values = (<HTMLInputElement>event.target).value;
    this.value = this.values;
    this.alternateArr = this.supplycharesteristicForm.get(
      'alternateArr'
    ) as FormArray;
    this.circuitArr = this.supplycharesteristicForm.get(
      'circuitArr'
    ) as FormArray;

    if (this.value != '' && this.value != 0) {
      this.alternateArr = this.supplycharesteristicForm.get(
        'alternateArr'
      ) as FormArray;
      this.circuitArr = this.supplycharesteristicForm.get(
        'circuitArr'
      ) as FormArray;
      this.observationArr = this.supplycharesteristicForm.get('observationArr') as FormArray;
      //if (this.alternateArr.length == 1 || this.alternateArr.length < this.value) {
        this.observationAlternateArr = this.observationArr.controls[4].controls.alternativeInnerObservation as FormArray;
        let c = 0;
        if(this.alternateArr.length < this.value){
          if(this.alternateArr.length != 0){
            c =this.alternateArr.length;
          }
        for (this.i = c; this.i < this.value; this.i++) {

          this.alternateArr.push(this.SupplyparametersForm());
          this.circuitArr.push(this.createCircuitForm());
          this.observationAlternateArr.push(this.generateAlternativeForm());
        }
        this.sources = true;
        this.breaker = true;
      } 
      else if ((this.alternateArr.length < this.value) && this.alternateArr.length!=0)  {
        if (this.value != '') {
          this.delarr = this.value - this.alternateArr.length;
          this.delarr1 = this.delarr;
          for (this.i = 0; this.i < this.delarr; this.i++) {
            this.alternateArr = this.supplycharesteristicForm.get(
              'alternateArr'
            ) as FormArray;
            this.alternateArr.push(this.SupplyparametersForm());
            this.observationAlternateArr.push(this.generateAlternativeForm());
          }
  
          for (this.i = 0; this.i < this.delarr1; this.i++) {
            this.circuitArr = this.supplycharesteristicForm.get(
              'circuitArr'
            ) as FormArray;
            this.circuitArr.push(this.createCircuitForm());
          }
        }
      } 
      else if((this.alternateArr.length > this.value))
      {
        
        if (this.value != '') {
          
          this.delarr = this.alternateArr.length - this.value;
          this.delarr1 = this.delarr;
          this.observationAlternateArr = this.observationArr.controls[4].controls.alternativeInnerObservation as FormArray;

          for (this.i = 0; this.i < this.delarr; this.i++) {

            let z = this.alternateArr.length -1;
            let d = this.alternateArr.value[z];
            d.supplyParameterStatus = 'R';
            let f = this.observationAlternateArr.value[z];
            f.alternativeInnerObservationStatus = 'R';
            this.deletedObservation.push(f);

            if(d.supplyparametersId != undefined && d.supplyparametersId!=0){
              
              this.alternateArr1 = this.alternateArr1.concat(d);
            }
            
            this.alternateArr = this.supplycharesteristicForm.get(
              'alternateArr'
            ) as FormArray;
            this.observationAlternateArr.removeAt(this.observationAlternateArr.length - 1);
            this.alternateArr.removeAt(this.alternateArr.length - 1);

            // for (this.j = 0; this.j < this.circuitArr.length; this.j++) {
            //   
            //   let e = this.circuitArr.value[this.j];
            //   if(d.aLSupplyShortName == e.sourceName){
            //     e.circuitStatus = 'R';
            //     this.circuitArr1 = this.circuitArr1.concat(e);
            //     this.circuitArr = this.supplycharesteristicForm.get(
            //       'circuitArr'
            //     ) as FormArray;
            //     this.circuitArr.removeAt(this.j);
            //   }
              
            //   //(this.supplycharesteristicForm.get('circuitArr') as FormArray).removeAt(index+1);
            // }

              let e = this.circuitArr.value[z+1];
              e.circuitStatus = 'R';
              
              if(e.circuitBreakerId != undefined && e.circuitBreakerId!=0){
                
                this.circuitArr1 = this.circuitArr1.concat(e);
              }
                this.circuitArr = this.supplycharesteristicForm.get(
                  'circuitArr'
                ) as FormArray;
                this.circuitArr.removeAt(z+1);
               
              //(this.supplycharesteristicForm.get('circuitArr') as FormArray).removeAt(index+1);
          }
          
        }
      }
      else {
        if(!this.alternateArr.length == this.value){ //removed from elango's yesterday commit by Aish
        for (this.i = 0; this.i < this.value; this.i++) {
          this.alternateArr.push(this.SupplyparametersForm());
          this.circuitArr.push(this.createCircuitForm());
          this.observationAlternateArr.push(this.generateAlternativeForm());
        }
        this.sources = true;
        this.breaker = true;
       }
    }
    } 
    // else if (this.value == '') {
    //   this.loclength = this.alternateArr.length;
    //   this.loc1length = this.circuitArr.length-1;

    //   for (this.i = 0; this.i < this.loclength; this.i++) {
    //     this.alternateArr.removeAt(this.alternateArr.length - 1);
    //   }
    //   for (this.i = 0; this.i < this.loc1length; this.i++) {
    //     this.circuitArr.removeAt(this.circuitArr.length - 1);
    //   }
    //   this.breaker = false;
    // } 
    // else if (this.alternateArr.length < this.value) {
    //   if (this.value != '') {
    //     this.delarr = this.value - this.alternateArr.length;
    //     this.delarr1 = this.value - this.circuitArr.length;
    //     for (this.i = 0; this.i < this.delarr; this.i++) {
    //       this.alternateArr = this.supplycharesteristicForm.get(
    //         'alternateArr'
    //       ) as FormArray;
    //       this.alternateArr.push(this.SupplyparametersForm());
    //     }

    //     for (this.i = 0; this.i < this.delarr1; this.i++) {
    //       this.circuitArr = this.supplycharesteristicForm.get(
    //         'circuitArr'
    //       ) as FormArray;
    //       this.circuitArr.push(this.createCircuitForm());
    //     }
    //   }
    // } 
    // else
    // {
    //   if (this.value != '') {
    //     this.delarr = this.alternateArr.length - this.value;
    //     this.delarr1 = this.delarr;

    //     for (this.i = 0; this.i < this.delarr; this.i++) {
    //       this.alternateArr = this.supplycharesteristicForm.get(
    //         'alternateArr'
    //       ) as FormArray;
    //       this.alternateArr.removeAt(this.alternateArr.length - 1);
    //     }
    //     for (this.i = 0; this.i < this.delarr1; this.i++) {
    //       this.circuitArr = this.supplycharesteristicForm.get(
    //         'circuitArr'
    //       ) as FormArray;
    //       this.circuitArr.removeAt(this.circuitArr.length - 1);
    //     }
    //   }
    // }
  }
 
  disableValidators() {
    // this.alternateArr = this.supplycharesteristicForm.get(
    //   'alternateArr'
    // ) as FormArray;
    // this.loclength = this.alternateArr.length;
    this.supplycharesteristicForm.controls['supplyNumber'].setValue('');
    this.supplycharesteristicForm.controls['supplyNumber'].clearValidators();
    this.supplycharesteristicForm.controls[
      'supplyNumber'
    ].updateValueAndValidity();

    // for (this.i = 0; this.i < this.loclength; this.i++) {
    //   for (this.j = 0; this.j < this.fcname.length; this.j++) {
    //     this.f.alternateArr.controls[this.i].controls[
    //       this.fcname[this.j]
    //     ].clearValidators();
    //     this.f.alternateArr.controls[this.i].controls[
    //       this.fcname[this.j]
    //     ].updateValueAndValidity();
    //   }

    //   for (this.k=0; this.k < this.circuitName.length; this.k++) {
    //     this.f.circuitArr.controls[this.i].controls[
    //       this.circuitName[this.k]
    //     ].clearValidators();
    //     this.f.circuitArr.controls[this.i].controls[
    //       this.circuitName[this.k]
    //     ].updateValueAndValidity();
    //   }
    // }
  }

  get f(): any {
    return this.supplycharesteristicForm.controls;
  }

  // setTrue() {
  //  this.submitted = true;
  //   if(this.supplycharesteristicForm.invalid) {
  //     return;
  //   }
  //   this.proceedNext.emit(true);
  // }

  // Commented by Aishwarya
  // gotoNext(){
  //   //this.service.onFirstComponentButtonClick();
  //   if(this.supplycharesteristicForm.invalid) {
  //     alert("Something went wrong, kindly check all the fields");
  //     return;
  //   }
  //   else{
  //   alert("Step2 successfully saved");
  //   }
  // }
  // clickAcc(){
  //   this.gotoNextTab();
  // }
  reloadFromBack(){
    if(this.supplycharesteristicForm.invalid){
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
    else if(this.supplycharesteristicForm.dirty && this.supplycharesteristicForm.touched){
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
   this.supplycharesteristicForm.markAsPristine();
   return true;
    }
  }
  gotoNextTab() {
    if ((this.supplycharesteristicForm.dirty && this.supplycharesteristicForm.invalid) || this.service.isCompleted==false){
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
    else if(this.supplycharesteristicForm.dirty && this.supplycharesteristicForm.touched){
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
  onChangeForm(event:any){
    if(!this.supplycharesteristicForm.invalid){
      if(this.supplycharesteristicForm.dirty){
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
   if(!this.supplycharesteristicForm.invalid){ 
    if(this.supplycharesteristicForm.dirty){
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

  reset(){
    this.supplycharesteristicForm.reset();
    }
     
  gotoNextModal(content1: any,content2:any) {
    if (this.supplycharesteristicForm.invalid) {
      this.validationError = true;
      this.validationErrorMsg = 'Please check all the fields';
      // setTimeout(() => {
      //   this.validationError = false;
      // }, 3000);
      return;
    }
    if(this.supplycharesteristicForm.touched || this.supplycharesteristicForm.untouched){
      this.modalReference = this.modalService.open(content2, {
         centered: true, 
         size: 'md',
         backdrop: 'static'
        })
     }
     if(this.supplycharesteristicForm.dirty && this.supplycharesteristicForm.touched){ //update
      this.modalService.open(content1, { centered: true,backdrop: 'static'});
      this.modalReference.close();
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
  // onKeyObservation(event:any){
  //   if(this.ObservationsForm.dirty){
  //     this.disableObservation=false;
  //   }
  //   else{
  //     this.disableObservation=true;
  //   }
  // }
  // submit(observeFlag:any){
  //   if(this.ObservationsForm.invalid) {
  //     return;
  //   }
  //   this.observation.siteId = this.service.siteCount;
  //   this.observation.userName = this.router.snapshot.paramMap.get('email') || '{}';
  //   this.observation.observationComponent ="Supply-Component";
  //   this.observation.observations =this.ObservationsForm.value.observations;
  //   this.submitted = true;
  //   if(!observeFlag) {
  //     this.observationService.addObservation(this.observation).subscribe(
  //       (data) => {
  //         this.success = true;
  //         this.successMsg = "Observation Information sucessfully Saved";
  //         this.proceedNext.emit(true);
  //         this.disableObservation=true;
  //         this.observationFlag=true;
  //         this.observationService.retrieveObservation(this.observation.siteId,this.observation.observationComponent,this.observation.userName).subscribe(
  //           (data) => {
  //           this.retrieveFromObservationSupply(data);
  //           },
  //           (error) => {
  //             this.errorArr = [];
  //             this.errorArr = JSON.parse(error.error);
  //             console.log(this.errorArr.message);
  //           }
  //         )
  //         setTimeout(() => {
  //           this.success = false;
  //           this.observationModalReference.close();
  //         }, 3000);
  //     },
  //       (error) => {
  //         this.errorArrObservation = [];
  //         this.Error = true;
  //         this.errorArrObservation = JSON.parse(error.error);
  //         this.errorMsg = this.errorArrObservation.message;
  //         this.observationFlag=false;
  //       }
  //     )
  //   }
  //   else {
  //     this.observationService.updateObservation(this.observation).subscribe(
  //       (data) => {
  //         this.success = true;
  //         this.successMsg = "Observation Information sucessfully updated";
  //         this.proceedNext.emit(false);
  //         this.disableObservation=true;
  //         setTimeout(() => {
  //           this.success = false;
  //           this.observationModalReference.close();
  //         }, 3000);
  //     },
  //       (error) => {
  //         this.errorArrObservation = [];
  //         this.Error = true;
  //         this.errorArrObservation = JSON.parse(error.error);
  //         this.errorMsg = this.errorArrObservation.message;
  //       }
  //     )
  //   }   
  //   }

  nextTab2(flag: any) {
    if(!flag) {
      this.supplycharesteristic.siteId = this.service.siteCount;
    }
   
    this.supplycharesteristic.userName = this.email;
    this.submitted = true;
    if (this.supplycharesteristicForm.invalid) {
      return;
    }
    this.nominalVoltageArr = [];
    this.nominalFrequencyArr = [];
    this.nominalCurrentArr = [];
    this.loopImpedenceArr = [];
    this.actualLoadArr = [];
    //this.locationArr = [];

    this.nominalVoltage = '';
    this.nominalFrequency = '';
    this.nominalCurrent  = '';
    this.loopImpedence = '';
    this.actualLoad = '';

    //this.service.supplyList= this.supplycharesteristicForm.value.alternateArr[0].aLLiveConductorType;
    this.nominalVoltageArr.push(
      this.NV1,
      this.NV2,
      this.NV3,
      this.NV4,
      this.NV5,
      this.NV6,
      this.NV7,
      this.NV8,
      this.NV9
    );
    this.nominalFrequencyArr.push(
      this.NF1
      // this.NF2,
      // this.NF3,
      // this.NF4,
      // this.NF5,
      // this.NF6,
      // this.NF7,
      // this.NF8,
      // this.NF9
    );
    this.nominalCurrentArr.push(
      this.PF1,
      this.PF2,
      this.PF3,
      this.PF4,
      this.PF5,
      this.PF6,
      this.PF7,
      this.PF8,
      this.PF9
    );
    this.loopImpedenceArr.push(
      this.EL1,
      this.EL2,
      this.EL3,
      this.EL4,
      this.EL5,
      this.EL6,
      this.EL7,
      this.EL8,
      this.EL9
    );
    this.actualLoadArr.push(
      this.AL1,
      this.AL2,
      this.AL3,
      this.AL4,
    );
    // this.arr1.push(
    //   this.electrodeResistanceGird
    // );
    
    // alternate
    this.alternateArr = this.supplycharesteristicForm.get(
      'alternateArr'
    ) as FormArray;
    // Circuit
    this.circuitArr = this.supplycharesteristicForm.get(
      'circuitArr'
    ) as FormArray;

    // first table

    // Main table Nominal Voltage
    for (let i of this.nominalVoltageArr) {
      if (i != undefined && i!='') {
        this.nominalVoltage += i + ',';
      } else {
        this.nominalVoltage += 'NA,';
      }
    }
    this.nominalVoltage = this.nominalVoltage.replace(/,\s*$/, '');
    // Main table Nominal Frequency
    for (let j of this.nominalFrequencyArr) {
      if(j == undefined || j=='') {
        this.nominalFrequency= 'NA';
      }
      else{
        this.nominalFrequency=j;
      }
    }
    
    this.nominalFrequency = this.nominalFrequency.replace(/,\s*$/, '');

    // Main table Nominal Current
    for (let k of this.nominalCurrentArr) {
      if (k != undefined && k!='') {
        this.nominalCurrent += k + ',';
      } else {
        this.nominalCurrent += 'NA,';
      }
    }
    this.nominalCurrent = this.nominalCurrent.replace(/,\s*$/, '');

    // Main table Loop Impedence
    for (let l of this.loopImpedenceArr) {
      if (l != undefined && l!='') {
        this.loopImpedence += l + ',';
      } else {
        this.loopImpedence += 'NA,';
      }
    }
    this.loopImpedence = this.loopImpedence.replace(/,\s*$/, '');

    for (let m of this.actualLoadArr) {
      if (m != undefined && m!='') {
        this.actualLoad += m + ',';
      } else {
        this.actualLoad += 'NA,';
      }
    }
    this.actualLoad = this.actualLoad.replace(/,\s*$/, '');

    this.mainNominalVoltageArr1 = [];
    this.mainNominalVoltageArr2 = [];
    this.mainNominalVoltageArr3 = [];
    this.mainNominalVoltageArr4 = [];
    this.mainNominalVoltageArr5 = [];

    this.mainNominalVoltageArr1 = this.nominalVoltage.split(",");
    this.mainNominalVoltageArr2 = this.nominalFrequency.split(",");
    this.mainNominalVoltageArr3 = this.nominalCurrent.split(",");
    this.mainNominalVoltageArr4 = this.loopImpedence.split(",");
    this.mainNominalVoltageArr5 = this.actualLoad.split(",");

    this.mainNominalArr = [];
    this.mainNominalArr.push(this.mainNominalVoltageArr1,this.mainNominalVoltageArr2,this.mainNominalVoltageArr3,this.mainNominalVoltageArr4,this.mainNominalVoltageArr5);


    // Supply Parameters Table
    if (this.alternateArr.length != 0) {
      for (let i of this.alternateArr.value) {
        let arr: any = [];
        //let arr1: any = [];
        let arr2: any = [];
        let arr3: any = [];
        let arr4: any = [];
        let arr5: any = [];
        for (let j of i.nominalVoltageArr1) {
          arr.push(
            j.nominalVoltage1,
            j.nominalVoltage2,
            j.nominalVoltage3,
            j.nominalVoltage4,
            j.nominalVoltage5,
            j.nominalVoltage6,
            j.nominalVoltage7,
            j.nominalVoltage8,
            j.nominalVoltage9
          );
          // arr1.push(
          //   j.nominalFrequency1,
          //   // j.nominalFrequency2,
          //   // j.nominalFrequency3,
          //   // j.nominalFrequency4,
          //   // j.nominalFrequency5,
          //   // j.nominalFrequency6,
          //   // j.nominalFrequency7,
          //   // j.nominalFrequency8,
          //   // j.nominalFrequency9
          // );
          arr2.push(
            j.current1,
            j.current2,
            j.current3,
            j.current4,
            j.current5,
            j.current6,
            j.current7,
            j.current8,
            j.current9
          );
          arr3.push(
            j.impedence1,
            j.impedence2,
            j.impedence3,
            j.impedence4,
            j.impedence5,
            j.impedence6,
            j.impedence7,
            j.impedence8,
            j.impedence9
          );
          arr4.push(j.capacity);
          arr5.push(
            j.loadCurrent1,
            j.loadCurrent2,
            j.loadCurrent3,
            j.loadCurrent4
          );
        }

        let nominalVoltage: String = '';
        //let nominalFrequency: String = '';
        let faultCurrent: String = '';
        let impedance: String = '';
        let capacity: String = '';
        let loadCurrent: String = '';

        if (i.aLLiveConductorType == 'AC') {
          for (let a of arr) {
            if (a != '') {
              nominalVoltage += a + ',';
            } else {
              nominalVoltage += 'NA,';
            }
          }
          nominalVoltage = nominalVoltage.replace(/,\s*$/, '');
          i.nominalVoltage = nominalVoltage;

        //   for (let b of arr1) {
        //     // if (b != '') {
        //     //   nominalFrequency += b + ',';
        //     // } 
        //     if(b == '') {
        //       nominalFrequency= 'NA';
        //     }
        //       else{
        //         nominalFrequency=b;
        //       }
        //   }
      
        //  // nominalFrequency = nominalFrequency.replace(/,\s*$/, '');
        //   i.nominalFrequency = nominalFrequency;

          for (let c of arr2) {
            if (c != '') {
              faultCurrent += c + ',';
            } else {
              faultCurrent += 'NA,';
            }
          }
          faultCurrent = faultCurrent.replace(/,\s*$/, '');
          i.faultCurrent = faultCurrent;

          for (let d of arr3) {
            if (d != '') {
              impedance += d + ',';
            } else {
              impedance += 'NA,';
            }
          }
          impedance = impedance.replace(/,\s*$/, '');
          i.loopImpedance = impedance;

          for (let e of arr4) {
            if (e != '') {
              capacity = e;
            }
            else {
              capacity += 'NA';
            }
          }
          // capacity = capacity.replace(/,\s*$/, "");
          i.installedCapacity = capacity;

          for (let f of arr5) {
            if (f != '') {
              loadCurrent += f + ',';
            } else {
              loadCurrent += 'NA,';
            }
          }
          loadCurrent = loadCurrent.replace(/,\s*$/, '');
          i.actualLoad = loadCurrent;
        }
      }

      // for (let i of this.alternateArr.controls) {
      //   delete i.value.nominalVoltageArr1;
      // }

      if (
        this.alternateArr.value[0].aLSupplyNo != null && this.alternateArr.length != 0
      ) {
        this.supplycharesteristic.supplyParameters =this.supplycharesteristicForm.value.alternateArr;
      }
    
    }
    this.supplycharesteristic.circuitBreaker = this.supplycharesteristicForm.value.circuitArr;
    
    if (this.supplycharesteristic.liveConductorType != 'DC') {
      this.supplycharesteristic.mainNominalVoltage = this.nominalVoltage;
      this.supplycharesteristic.mainNominalCapacity = this.nominalFrequency;
      this.supplycharesteristic.mainNominalCurrent = this.nominalCurrent;
      this.supplycharesteristic.mainLoopImpedance = this.loopImpedence;
      this.supplycharesteristic.mainActualLoad = this.actualLoad;

      this.service.mainNominalVoltage = this.nominalVoltage;
      //this.service.mainNominalFrequency = this.nominalFrequency;
      this.service.mainNominalCurrent = this.nominalCurrent;
      
    }

 //Electrode Resistance to Grid (Ω)
  for (let x of this.supplycharesteristicForm.value.location1Arr) {
    if(x.electrodeResistanceGird == undefined || x.electrodeResistanceGird==null || x.electrodeResistanceGird=="") {
      x.electrodeResistanceGird= 'NA';
    }
  }
 
    this.supplycharesteristic.instalLocationReport =this.supplycharesteristicForm.value.location1Arr;
    this.supplycharesteristic.instalLocationReport = this.supplycharesteristic.instalLocationReport.concat(this.locationArr);
    
    this.supplycharesteristic.boundingLocationReport =this.supplycharesteristicForm.value.location2Arr;
    this.supplycharesteristic.boundingLocationReport = this.supplycharesteristic.boundingLocationReport.concat(this.boundingArr);

    this.supplycharesteristic.earthingLocationReport =this.supplycharesteristicForm.value.location3Arr;
    this.supplycharesteristic.earthingLocationReport = this.supplycharesteristic.earthingLocationReport.concat(this.earthingArr);

    // Alternate Form
    this.supplycharesteristic.supplyParameters =this.supplycharesteristicForm.value.alternateArr;
   
    if(this.alternateArr1 != null){
      this.supplycharesteristic.supplyParameters = this.supplycharesteristic.supplyParameters.concat(this.alternateArr1);
    }
   
    for(let i of this.supplycharesteristicForm.value.circuitArr){
      if (i.residualCurrent != '') {
        i.residualCurrent=i.residualCurrent;
      } 
      else {
        i.residualCurrent = 'NA';
      }
      if (i.residualTime != '') {
        i.residualCurrent=i.residualCurrent;
      } 
      else {
        i.residualTime = 'NA';
      }
    }
    this.supplycharesteristic.circuitBreaker =this.supplycharesteristicForm.value.circuitArr;
    if(this.circuitArr1 != null){
      this.supplycharesteristic.circuitBreaker = this.supplycharesteristic.circuitBreaker.concat(this.circuitArr1);
    }

    this.locationArr = [];
    this.boundingArr = [];  
    this.earthingArr = [];

    this.alternateArr1 = [];
    this.circuitArr1 = [];

    this.observationArr = this.supplycharesteristicForm.get(
      'observationArr'
    ) as FormArray;
    
    
    if(!flag) {
    this.supplycharesteristic.supplyOuterObservation = this.supplycharesteristicForm.value.observationArr

    this.supplycharesteristic.supplyOuterObservation[0].observationComponentDetails='mains';
    this.supplycharesteristic.supplyOuterObservation[1].observationComponentDetails='earthingNoOfJointsOb';
    this.supplycharesteristic.supplyOuterObservation[2].observationComponentDetails='bondingNoOfJointsOb';
    this.supplycharesteristic.supplyOuterObservation[3].observationComponentDetails='instalLocationReportOb';
    this.supplycharesteristic.supplyOuterObservation[4].observationComponentDetails='alternate';


    for(let i of this.supplycharesteristic.supplyOuterObservation) {
      if(i.observationComponentDetails == 'mains') {
        i.observationDescription=this.supplycharesteristicForm.value.liveConductorBNote;
        i.supplyOuterObservationStatus = 'A';
        i.alternativeInnerObservation = [];
      }
      if(i.observationComponentDetails == 'earthingNoOfJointsOb') {
        i.observationDescription=this.supplycharesteristicForm.value.earthingConductorObservation;
        i.supplyOuterObservationStatus = 'A';
        i.alternativeInnerObservation = [];

      }
      if(i.observationComponentDetails == 'bondingNoOfJointsOb') {
        i.observationDescription=this.supplycharesteristicForm.value.bondingConductorObservation;
        i.supplyOuterObservationStatus = 'A';
        i.alternativeInnerObservation = [];

      }
      if(i.observationComponentDetails == 'instalLocationReportOb') {
        i.observationDescription=this.supplycharesteristicForm.value.earthElectrodeObservation;
        i.supplyOuterObservationStatus = 'A';
        i.alternativeInnerObservation = [];

      }
      if(i.observationComponentDetails == 'alternate') {
        this.alternateArr = this.supplycharesteristicForm.get(
          'alternateArr'
        ) as FormArray;

        for(let j=0; j<this.alternateArr.length; j++) {
          i.alternativeInnerObservation[j].observationDescription = this.alternateArr.value[j].aLLiveConductorBNote;
          i.alternativeInnerObservation[j].observationComponentDetails = 'alternate '+j;
          i.alternativeInnerObservation[j].alternativeInnerObservationStatus = 'A';
        }
        i.supplyOuterObservationStatus = 'N';
      }
    }
    }
    

    if(flag) { 
     
      if(this.supplycharesteristicForm.dirty){
        for(let i of this.supplycharesteristic.supplyOuterObservation){
          if(i.observationComponentDetails == 'mains') {
            i.observationDescription=this.supplycharesteristicForm.value.liveConductorBNote;
            i.alternativeInnerObservation = [];
          }
          else if(i.observationComponentDetails == 'earthingNoOfJointsOb') {
            i.observationDescription=this.supplycharesteristicForm.value.earthingConductorObservation;
            i.alternativeInnerObservation = [];
    
          }
          else if(i.observationComponentDetails == 'bondingNoOfJointsOb') {
            i.observationDescription=this.supplycharesteristicForm.value.bondingConductorObservation;
            i.alternativeInnerObservation = [];
    
          }
          else if(i.observationComponentDetails == 'instalLocationReportOb') {
            i.observationDescription=this.supplycharesteristicForm.value.earthElectrodeObservation;
            i.alternativeInnerObservation = [];
    
          }
          else if(i.observationComponentDetails == 'alternate') {
            this.alternateArr = this.supplycharesteristicForm.get(
              'alternateArr'
            ) as FormArray;
            i.alternativeInnerObservation = [];
            
            //updated observation
            this.observationAlternateArr = this.observationArr.controls[4].controls.alternativeInnerObservation as FormArray;
            for(let item of this.observationAlternateArr.controls) {
              i.alternativeInnerObservation.push(item.value)
            }

            //new observation
            for(let j=0; j<this.alternateArr.length; j++) {
                  i.alternativeInnerObservation[j].observationDescription = this.alternateArr.value[j].aLLiveConductorBNote;
                  i.alternativeInnerObservation[j].observationComponentDetails = 'alternate '+j;
                  i.alternativeInnerObservation[j].alternativeInnerObservationStatus = 'A';
            }
            i.supplyOuterObservationStatus = 'N';

            //deleted observation
            for(let value of this.deletedObservation) {
              i.alternativeInnerObservation.push(value);
            }
          }
        }

      this.UpateInspectionService.updateSupply(this.supplycharesteristic).subscribe(
        (data)=> {
          this.testingService.retrieveTesting(this.supplycharesteristic.siteId).subscribe(
            (data) => {
              this.proceedNext.emit(false);
            },
            (error) => {
              this.proceedNext.emit(true);
            }
          )
          this.popup=true;
          this.finalSpinner=false;
          this.success = true;
          this.service.isCompleted2= true;
          this.service.isLinear=false;
          this.successMsg = data;
          this.service.supplyList= this.supplycharesteristic.supplyNumber;
          this.service.retrieveMainNominalVoltage=this.mainNominalArr;
          this.service.retrieveMainNominalVoltage=this.retrieveMainNominalVoltage;
          this.service.nominalVoltageArr2=this.supplycharesteristic.supplyParameters;
          this.supplyCharacteristicsService.retrieveSupplyCharacteristics(this.supplycharesteristic.siteId).subscribe(
            data=>{
             this.retrieveAllDetailsforSupply(this.supplycharesteristic.userName,this.supplycharesteristic.siteId,data);
            }
          )
          this.supplycharesteristicForm.markAsPristine();
          this.service.windowTabClick=0;
          this.service.logoutClick=0; 
          this.service.lvClick=0; 
          //this.proceedNext.emit(true);
          this.summaryService.retrieveSummary(this.supplycharesteristic.siteId).subscribe(
            (data) => {
              // let summaryData: any= [];
              // summaryData = JSON.parse(data);
              this.summaryNext.emit({siteId: this.supplycharesteristic.siteId,summaryData: data,flag: true});
            },
            (error) => {
              this.summaryNext.emit({siteId: this.supplycharesteristic.siteId,summaryData: null,flag: false});
            }
          )
         },
         (error) => {
          this.popup=true;
          this.finalSpinner=false;
          this.Error = true;
          this.service.isCompleted2= false;
        this.service.isLinear=true;
          this.errorArr = [];
          this.errorArr = JSON.parse(error.error);
          if(this.errorArr.message =='multiple points'){
            this.errorMsg = 'Please fill valid values for AC Table'
          } else{
            this.errorMsg = this.errorArr.message;
          }
        });
        }
    }
else{
    this.supplyCharacteristicsService.addSupplyCharacteristics(this.supplycharesteristic).subscribe(
        (data) => {
          this.proceedNext.emit(true);
          this.popup=true;
          this.finalSpinner=false;
          this.success = true;
          this.successMsg = data;
          //this.disable = true;
          //this.service.allFieldsDisable = true;
          this.service.isCompleted2= true;
          this.service.isLinear=false;
          this.supplycharesteristicForm.markAsPristine();
          this.service.windowTabClick=0;
       this.service.logoutClick=0; 
       this.service.lvClick=0; 
          this.service.supplyList= this.supplycharesteristic.supplyNumber;
          this.service.retrieveMainNominalVoltage=this.mainNominalArr;
          this.service.retrieveMainNominalVoltage=this.retrieveMainNominalVoltage;
          this.service.nominalVoltageArr2=this.supplycharesteristic.supplyParameters;
          this.supplyCharacteristicsService.retrieveSupplyCharacteristics(this.supplycharesteristic.siteId).subscribe(
            data=>{
             this.retrieveAllDetailsforSupply(this.supplycharesteristic.userName,this.supplycharesteristic.siteId,data);
            }
          )

          this.summaryService.retrieveSummary(this.supplycharesteristic.siteId).subscribe(
            (data) => {
              // let summaryData: any= [];
              // summaryData = JSON.parse(data);
              this.summaryNext.emit({siteId: this.supplycharesteristic.siteId,summaryData: data,flag: true});
            },
            (error) => {
              this.summaryNext.emit({siteId: this.supplycharesteristic.siteId,summaryData: null,flag: false});
            }
          )

          // if(!this.observationFlag){
          //   this.observation.siteId = this.service.siteCount;
          //   this.observation.userName = this.router.snapshot.paramMap.get('email') || '{}';
          //   this.observation.observationComponent ="Supply-Component";
          //   this.observation.observations="No observation recorded"
          //   this.observationService.addObservation(this.observation).subscribe(
          //     (data) => {
          //       this.proceedNext.emit(true);
          //       this.observationService.retrieveObservation(this.observation.siteId,this.observation.observationComponent,this.observation.userName).subscribe(
          //         (data) => {
          //         this.retrieveFromObservationSupply(data);
          //         },
          //         (error) => {
          //           this.errorArr = [];
          //           this.errorArr = JSON.parse(error.error);
          //         console.log(this.errorArr.message);
          //         }
          //       )
          //   },
          //     (error:any) => {
          //       this.errorArrObservation = [];
          //       this.errorArrObservation = JSON.parse(error.error);
          //       console.log(this.errorArrObservation.message);
          //     }
          //   )
          // }
        },
        (error) => {
          this.popup=true;
          this.finalSpinner=false;
          this.Error = true;
          this.proceedNext.emit(false);
          this.errorArr = [];
          this.errorArr = JSON.parse(error.error);
          if(this.errorArr.message =='multiple points'){
            this.errorMsg = 'Please fill valid values for AC Table'
          } else{
            this.errorMsg = this.errorArr.message;
          }
          this.service.isCompleted2= false;
          this.service.isLinear=true;
        }
      );
  }
  }
  
  removeItem(a:any,index: any) {
    this.supplycharesteristicForm.markAsTouched();
    if(this.supplycharesteristic.noOfLocation != 0){
      if(a.value.locationReportId !=0 && a.value.locationReportId !=undefined)
      {
        this.supplycharesteristic.noOfLocation = this.supplycharesteristicForm.value.noOfLocation -1;
        (this.supplycharesteristicForm.get('location1Arr') as FormArray).removeAt(index);
        a.value.instalLocationReportStatus='R';
        this.locationArr= this.locationArr.concat(a.value);
        this.supplycharesteristicForm.markAsDirty();
        if(this.supplycharesteristic.noOfLocation == 0){
          this.key1LocationTable = false;
        }
      }
      else
      {
        this.supplycharesteristicForm.markAsTouched();
        this.supplycharesteristic.noOfLocation = this.supplycharesteristicForm.value.noOfLocation -1;
        (this.supplycharesteristicForm.get('location1Arr') as FormArray).removeAt(index);
        this.supplycharesteristicForm.markAsDirty();
        if(this.supplycharesteristic.noOfLocation == 0){
          this.key1LocationTable = false;
        }
      }
    }
   }
   
   removeItem1(a:any,index: any) {
   
    this.supplycharesteristicForm.markAsTouched();
    if(this.supplycharesteristic.bondingNoOfJoints != 0){
      if(a.value.locationReportId !=0 && a.value.locationReportId !=undefined)
      {
        this.supplycharesteristic.bondingNoOfJoints = this.supplycharesteristicForm.value.bondingNoOfJoints -1;
        (this.supplycharesteristicForm.get('location2Arr') as FormArray).removeAt(index);
        a.value.instalLocationReportStatus='R';
        this.boundingArr= this.boundingArr.concat(a.value);
        this.supplycharesteristicForm.markAsDirty();
        if(this.supplycharesteristic.bondingNoOfJoints == 0){
          this.JointLocationTable = false;
        }
      }
      else
      {
        this.supplycharesteristicForm.markAsTouched();
       
        this.supplycharesteristic.bondingNoOfJoints = this.supplycharesteristicForm.value.bondingNoOfJoints -1;
        (this.supplycharesteristicForm.get('location2Arr') as FormArray).removeAt(index);
        this.supplycharesteristicForm.markAsDirty();
        if(this.supplycharesteristic.bondingNoOfJoints == 0){
          this.JointLocationTable = false;
        }
      }
    }
   }

   removeItem2(a:any,index: any) {
   
    this.supplycharesteristicForm.markAsTouched();
    if(this.supplycharesteristic.earthingNoOfJoints != 0){
      if(a.value.locationReportId !=0 && a.value.locationReportId !=undefined)
    {
      this.supplycharesteristic.earthingNoOfJoints = this.supplycharesteristicForm.value.earthingNoOfJoints -1;
      (this.supplycharesteristicForm.get('location3Arr') as FormArray).removeAt(index);
      a.value.instalLocationReportStatus='R';
      this.earthingArr= this.earthingArr.concat(a.value);
      this.supplycharesteristicForm.markAsDirty();
      if(this.supplycharesteristic.earthingNoOfJoints == 0){
        this.keyJOintLocationTable = false;
      }
    }
    else
    {
      this.supplycharesteristicForm.markAsTouched();
      this.supplycharesteristic.earthingNoOfJoints = this.supplycharesteristicForm.value.earthingNoOfJoints -1;
      (this.supplycharesteristicForm.get('location3Arr') as FormArray).removeAt(index);
      this.supplycharesteristicForm.markAsDirty();
      if(this.supplycharesteristic.earthingNoOfJoints == 0){
        this.keyJOintLocationTable = false;
      }
    }
    }
   }
    //  Allternative power supply
    removeItem3(a:any,index: any) {
      this.supplycharesteristicForm.markAsTouched();
      if(a.value.supplyparametersId !=0 && a.value.supplyparametersId !=undefined)
      {
       
        let b = parseInt(this.supplycharesteristicForm.value.supplyNumber) -1;
        this.supplycharesteristic.supplyNumber = b.toString();
        (this.supplycharesteristicForm.get('alternateArr') as FormArray).removeAt(index);
        

        a.value.supplyParameterStatus='R';

        // code added by Arun for observation
        this.observationArr = this.supplycharesteristicForm.get('observationArr') as FormArray;
        for(let j of this.observationArr.controls[4].controls.alternativeInnerObservation.controls) {         
              if(a.value.supplyInnerObervationsId == j.controls.supplyInnerObervationsId.value) {
                j.controls.alternativeInnerObservationStatus.setValue('R');
                this.deletedObservation.push(j.value);
                this.observationArr.controls[4].controls.alternativeInnerObservation.removeAt(index);
              }               
        }

        this.alternateArr1 = this.alternateArr1.concat(a.value)
  
        const items = (<FormArray>this.supplycharesteristicForm.get('circuitArr'));
          
          for (let i = 0; i < items.length; i++) {
              
            let d = items.value[i];
            if(a.value.aLSupplyShortName == d.sourceName){
              d.circuitStatus ='R';
              this.circuitArr1 = this.circuitArr1.concat(d);
              (this.supplycharesteristicForm.get('circuitArr') as FormArray).removeAt(i);
            }
          }
        
        this.supplycharesteristicForm.markAsDirty();
      }
      else
      {
       
        this.supplycharesteristicForm.markAsTouched();
        let b = parseInt(this.supplycharesteristicForm.value.supplyNumber) -1;
        this.supplycharesteristic.supplyNumber = b.toString();
        (this.supplycharesteristicForm.get('circuitArr') as FormArray).removeAt(index+1);
        (this.supplycharesteristicForm.get('alternateArr') as FormArray).removeAt(index);
        this.supplycharesteristicForm.markAsDirty();
      }
     }  
}