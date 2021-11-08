import {ChangeDetectorRef,Component,EventEmitter,OnInit,Output,ElementRef,ViewChild, Input} from '@angular/core';
import {AbstractControl,FormArray,FormBuilder,FormControl,FormGroup,Validators,} from '@angular/forms';
import { from } from 'rxjs';
import {Supplycharacteristics,Supplyparameters,} from '../model/supplycharacteristics';
import { SupplyCharacteristicsService } from '../services/supply-characteristics.service';
import { GlobalsService } from '../globals.service';
import { ActivatedRoute } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SiteService } from '../services/site.service';
import { InspectionVerificationService } from '../services/inspection-verification.service';
import { MainNavComponent } from '../main-nav/main-nav.component';
import { CommentsSection } from '../model/comments-section';

@Component({
  selector: 'app-inspection-verification-supply-characteristics',
  templateUrl:
    './inspection-verification-supply-characteristics.component.html',
  styleUrls: ['./inspection-verification-supply-characteristics.component.css'],
})
export class InspectionVerificationSupplyCharacteristicsComponent
  implements OnInit
{
  a: any;
  supplyparameters = new Supplyparameters();
  supplycharesteristic = new Supplycharacteristics();
  enableAC: boolean = false;
  enableDC: boolean = false;
  tableAC: boolean = false;
  enable2AC: boolean = false;
  enable2DC: boolean = false;
  table2AC: boolean = false;
  showAlternate: boolean = false;
  location1Arr!: FormArray;
  location2Arr!: FormArray;
  arr1: any = [];
  arr2: any = [];
  arr3: any = [];
  alArr: any = [];
  circuitB:any=[];
  location3Arr!: FormArray;
  alternateArr!: FormArray;
  circuitArr!: FormArray;
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

  mainArr1: any = [];
  mainArr2: any = [];
  mainArr3: any = [];
  mainArr4: any = [];

  isSupplyCompleted: boolean = false;
  validationError: boolean = false;
  validationErrorMsg: String = '';
  disable: boolean = false;
  alternativeSupplyNo: boolean =true;

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
  NF2: any;
  NF3: any;
  NF4: any;
  NF5: any;
  NF6: any;
  NF7: any;
  NF8: any;
  NF9: any;

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

  nominalVoltageArr: any = [];
  nominalVoltage: String = '';

  nominalFrequencyArr: any = [];
  nominalFrequency: String = '';

  nominalCurrentArr: any = [];
  nominalCurrent: String = '';

  loopImpedenceArr: any = [];
  loopImpedence: String = '';

  // Alternate table array
  nominalVoltageArr1: any = [];

  panelOpenState = false;
  systemEarthingList: String[] = ['TN-C', 'TN-C-S', 'TN-S', 'IT', 'TT'];
  liveConductorACList: String[] = [
    '1-phase, 2-wire (LN)',
    '1-phase, 3-wire (LLM)',
    '2-phase, 3-wire (LLN)',
    '3-phase, 3-wire (LLL)',
    '3-phase, 4-wire (LLLN)',
  ];
  liveConductorDCList: String[] = ['2-pole', '3-pole', 'Others'];
  AcConductorList: String[] = ['1-phase', '2-wire (LN)', '3-wire (LLM)','2-phase','3-wire (LLN)','3-phase','3-wire (LLL)','3-phase','4-wire (LLLN)'];
  ProtectiveDevicelist: string[] = ['Fuse', 'MCB', 'MCCB', 'ACB'];
  AlternatesupplyList: string[] = ['Yes', 'No'];
  MeansofEarthingList: string[] = [
    'Suppliers Facility',
    ' Installation Earth Electrode',
  ];
  electrodeTypeList: string[] = [
    'Vertical',
    'Horizontal',
    'Combined Vertical + Horizontal',
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

   //comments end

  constructor(
    private supplyCharacteristicsService: SupplyCharacteristicsService,
    public service: GlobalsService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private basic: MainNavComponent,
    private modalService: NgbModal,private siteService: SiteService,
    private UpateInspectionService: InspectionVerificationService,
  ) {
    this.email = this.router.snapshot.paramMap.get('email') || '{}';
  }

  ngOnInit(): void {
    this.currentUser=sessionStorage.getItem('authenticatedUser');
    this.currentUser1 = [];
    this.currentUser1=JSON.parse(this.currentUser);
    this.supplycharesteristicForm = this.formBuilder.group({
      systemEarthing: ['', Validators.required],
      liveConductor: ['', Validators.required],
      AcConductor: ['', Validators.required],
      DcConductor: ['', Validators.required],
      briefNote: ['', Validators.required],
      liveConductorBNote: ['', Validators.required],
      mainNominalProtectiveDevice: ['', Validators.required],
      mainRatedCurrent: ['', Validators.required],
      mainCurrentDisconnection: ['', Validators.required],
      alternativeSupply: ['', Validators.required],
      supplyNumber: ['', Validators.required],
      maximumDemand: ['', Validators.required],
      maximumLoad: ['', Validators.required],
      meansEarthing: ['', Validators.required],
      electrodeType: ['', Validators.required],
      electrodeMaterial: ['', Validators.required],
      noOfLocation: ['', [Validators.required, Validators.min(1)]],
      conductorSize: ['', Validators.required],
      conductormaterial: ['', Validators.required],
      conductorVerify: ['', Validators.required],
      bondingConductorSize: ['', Validators.required],
      bondingConductorMaterial: ['', Validators.required],
      bondingConductorVerify: ['', Validators.required],
      bondingJointsType: ['', Validators.required],
      bondingNoOfJoints: ['', [Validators.required, Validators.min(1)]],
      earthingConductorSize: ['', Validators.required],
      earthingConductorMaterial: ['', Validators.required],
      earthingConductorVerify: ['', Validators.required],
      earthingJointsType: ['', Validators.required],
      earthingNoOfJoints: ['', [Validators.required, Validators.min(1)]],
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
      NF2: '',
      NF3: '',
      NF4: '',
      NF5: '',
      NF6: '',
      NF7: '',
      NF8: '',
      NF9: '',

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

      location1Arr: this.formBuilder.array([this.createLocation1Form()]),
      location2Arr: this.formBuilder.array([this.createLocation2Form()]),
      location3Arr: this.formBuilder.array([this.createLocation3Form()]),
      alternateArr: this.formBuilder.array([]),
      circuitArr: this.formBuilder.array([]),
      viewerCommentArr: this.formBuilder.array([this.addCommentViewer()]),
      completedCommentArr1: this.formBuilder.array([]),
    });
    this.expandedIndex = -1 ;
  }

  retrieveDetailsfromSavedReports(userName: any,siteId: any,clientName: any,departmentName: any,site: any,data: any){
    if(this.service.disableFields==true){
      this.supplycharesteristicForm.disable();
     }
       this.step2List = JSON.parse(data);
       this.supplycharesteristic.siteId = siteId;
       this.supplycharesteristic.supplyCharacteristicsId = this.step2List.supplyCharacteristics.supplyCharacteristicsId;
       this.supplycharesteristic.createdBy = this.step2List.supplyCharacteristics.createdBy;
       this.supplycharesteristic.createdDate = this.step2List.supplyCharacteristics.createdDate;
       this.supplycharesteristic.alternativeSupply=this.step2List.supplyCharacteristics.alternativeSupply;
       this.showAlternateField(this.step2List.supplyCharacteristics.alternativeSupply);
       this.supplycharesteristic.electrodeMaterial=this.step2List.supplyCharacteristics.electrodeMaterial;
       this.supplycharesteristic.meansEarthing=this.step2List.supplyCharacteristics.meansEarthing;
       this.supplycharesteristic.electrodeType=this.step2List.supplyCharacteristics.electrodeType;
       this.supplycharesteristic.conductorVerify= this.step2List.supplyCharacteristics.conductorVerify;
       this.step2List.type= this.step2List.supplyCharacteristics.type;
       this.supplycharesteristic.liveConductorAC= this.step2List.supplyCharacteristics.liveConductorAC;
       this.supplycharesteristic.liveConductorDC=this.step2List.supplyCharacteristics.liveConductorDC,
       this.AcValue = this.step2List.supplyCharacteristics.liveConductorAC;
       this.DcValue = this.step2List.supplyCharacteristics.liveConductorDC;
       this.step2List.liveConductor= this.step2List.supplyCharacteristics.liveConductor;
       this.flag = true;
       this.populateData();
       this.populateDataComments();
       this.supplycharesteristicForm.patchValue({
        clientName1: clientName,
        departmentName1:departmentName,
        site1:site,
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

        this.mainArr1 = this.step2List.supplyCharacteristics.mainNominalVoltage.split(",");
        this.mainArr2 = this.step2List.supplyCharacteristics.mainNominalFrequency.split(",");
        this.mainArr3 = this.step2List.supplyCharacteristics.mainNominalCurrent.split(",");
        this.mainArr4 = this.step2List.supplyCharacteristics.mainLoopImpedance.split(",");

        this.retrieveMainNominalVoltage = [];
        this.retrieveMainNominalVoltage.push(this.mainArr1,this.mainArr2,this.mainArr3,this.mainArr4);
        

          this.NV1 = this.retrieveMainNominalVoltage[0][0];
          this.NV2 = this.retrieveMainNominalVoltage[0][1];
          this.NV3 = this.retrieveMainNominalVoltage[0][2];
          this.NV4 = this.retrieveMainNominalVoltage[0][3];
          this.NV5 = this.retrieveMainNominalVoltage[0][4];
          this.NV6 = this.retrieveMainNominalVoltage[0][5];
          this.NV7 = this.retrieveMainNominalVoltage[0][6];
          this.NV8 = this.retrieveMainNominalVoltage[0][7];
          this.NV9 = this.retrieveMainNominalVoltage[0][8];
      
          this.NF1 = this.retrieveMainNominalVoltage[1][0];
          this.NF2 = this.retrieveMainNominalVoltage[1][1];
          this.NF3 = this.retrieveMainNominalVoltage[1][2];
          this.NF4 = this.retrieveMainNominalVoltage[1][3];
          this.NF5 = this.retrieveMainNominalVoltage[1][4];
          this.NF6 = this.retrieveMainNominalVoltage[1][5];
          this.NF7 = this.retrieveMainNominalVoltage[1][6];
          this.NF8 = this.retrieveMainNominalVoltage[1][7];
          this.NF9 = this.retrieveMainNominalVoltage[1][8];

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
          
       
      }
     }
     reloadFromBack(){
      this.supplycharesteristicForm.markAsPristine();
     }
//comments section starts

populateDataComments() {
  this.hideShowComment=true;
  this.reportViewerCommentArr = [];
  this.completedCommentArr3 = [];
  this.completedCommentArr4 = [];
  this.arrViewer = [];
  this.completedCommentArr1 = this.supplycharesteristicForm.get('completedCommentArr1') as FormArray;
 for(let value of this.step2List.supplyCharacteristics.supplyCharacteristicComment){
  this.arrViewer = [];
   if(this.currentUser1.role == 'Inspector' ) { //Inspector
    if(value.approveOrReject == 'APPROVED') {
      this.completedComments = true;
      this.enabledViewer=true;
      for(let j of this.step2List.supplyCharacteristics.supplyCharacteristicComment) {
        if(value.noOfComment == j.noOfComment) {
          this.completedCommentArr3.push(j);
        }
      }
       this.completedCommentArr4.push(this.addItem1(this.completedCommentArr3));               
      this.completedCommentArr3 = [];
    }
    for(let j of this.step2List.supplyCharacteristics.supplyCharacteristicComment) {
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
               for(let j of this.step2List.supplyCharacteristics.supplyCharacteristicComment) {
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
               if(this.step2List.supplyCharacteristics.supplyCharacteristicComment.length < 1) {
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
            for(let j of this.step2List.supplyCharacteristics.supplyCharacteristicComment) {
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
    this.siteService.retrieveFinal(this.savedUserName,this.supplycharesteristic.siteId).subscribe(
      (data) => {
         this.commentDataArr = JSON.parse(data);
         this.step2List.supplyCharacteristics.supplyCharacteristicComment = this.commentDataArr.supplyCharacteristics.supplyCharacteristicComment;
         this.populateDataComments();
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

     populateData() {
      if(this.service.disableFields==true){
        this.disable=true;
        }
      for (let item of this.step2List.supplyCharacteristics.boundingLocationReport) {     
        this.arr2.push(this.createGroup(item));
      }
      for (let item of this.step2List.supplyCharacteristics.instalLocationReport) {     
        this.arr1.push(this.createGroup1(item));
      }
      for (let item of this.step2List.supplyCharacteristics.earthingLocationReport) {     
        this.arr3.push(this.createGroup(item));
      }
      for (let item of this.step2List.supplyCharacteristics.supplyParameters) { 
        this.sources=true;    
        this.breaker=true;
        this.alArr.push(this.createGroupAl(item));
      }
      for (let item of this.step2List.supplyCharacteristics.supplyParameters) { 
        this.tableAC=true;    
        this.alArr2.push(this.createGroupAl2(item));
      }
      for (let item of this.step2List.supplyCharacteristics.circuitBreaker) {     
        this.circuitB.push(this.createGroupCircuitB(item));
      }
      this.supplycharesteristicForm.setControl('location2Arr', this.formBuilder.array(this.arr2 || []))
      this.supplycharesteristicForm.setControl('location1Arr', this.formBuilder.array(this.arr1 || []))
      this.supplycharesteristicForm.setControl('location3Arr', this.formBuilder.array(this.arr3 || []))
      this.supplycharesteristicForm.setControl('alternateArr', this.formBuilder.array(this.alArr || []))
      this.supplycharesteristicForm.setControl('circuitArr', this.formBuilder.array(this.circuitB || []))
      this.supplycharesteristicForm.setControl('circuitArr', this.formBuilder.array(this.circuitB || []))

      this.arr1 = [];
      this.arr2 = [];
      this.arr3 = [];
      this.alArr = [];
      this.circuitB = []
    }

    createGroup(item: any): FormGroup {
      return this.formBuilder.group({
        locationReportId: new FormControl({disabled: false, value: item.locationReportId}),
        location: new FormControl({disabled: false ,value: item.location}),
        jointNo: new FormControl({disabled: false, value: item.jointNo}),
        jointResistance: new FormControl({disabled: false ,value: item.jointResistance}),
      });
    }
    createGroup1(item: any): FormGroup {
      return this.formBuilder.group({
        locationReportId: new FormControl({disabled: false, value: item.locationReportId}),
        locationNo: new FormControl({disabled: false ,value: item.locationNo}),
        locationName: new FormControl({disabled: false, value: item.locationName}),
        electrodeResistanceEarth: new FormControl({disabled: false ,value: item.electrodeResistanceEarth}),
        electrodeResistanceGird: new FormControl({disabled: false ,value: item.electrodeResistanceGird}),
      });
    }
    createGroupAl(item: any): FormGroup {
      return this.formBuilder.group({
        supplyparametersId: new FormControl({disabled: false, value: item.supplyparametersId}),
        aLSupplyNo: new FormControl({disabled: false ,value: item.aLSupplyNo}),
        aLSupplyShortName: new FormControl({disabled: false, value: item.aLSupplyShortName}),
        aLSystemEarthing: new FormControl({disabled: false ,value: item.aLSystemEarthing}),
        aLLiveConductorType: new FormControl({disabled: false ,value: item.aLLiveConductorType}),
        aLLiveConductorAC: new FormControl({disabled: false ,value: item.aLLiveConductorAC}),
        aLLiveConductorDC: new FormControl({disabled: false ,value: item.aLLiveConductorDC}),
        aLSystemEarthingBNote: new FormControl({disabled: false ,value: item.aLSystemEarthingBNote}),
        aLLiveConductorBNote: new FormControl({disabled: false ,value: item.aLSystemEarthingBNote}),
        currentDissconnection: new FormControl({disabled: false ,value: item.currentDissconnection}),
        protectiveDevice: new FormControl({disabled: false ,value: item.protectiveDevice}),
        ratedCurrent: new FormControl({disabled: false ,value: item.ratedCurrent}),
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
      location: new FormControl({disabled: false ,value: item.location}),
      type: new FormControl({disabled: false ,value: item.type}),
      noPoles: new FormControl({disabled: false ,value: item.noPoles}),
      current: new FormControl({disabled: false ,value: item.current}),
      voltage: new FormControl({disabled: false ,value: item.voltage}),
      fuse: new FormControl({disabled: false ,value: item.fuse}),
      residualCurrent: new FormControl({disabled: false ,value: item.residualCurrent}),
      residualTime: new FormControl({disabled: false ,value: item.residualTime}),
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
      nominalFrequencyAL=   nominalFrequency.split(",");
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
  
        nominalFrequency1: new FormControl({disabled: false ,value: item[1][0]}),
        nominalFrequency2: new FormControl({disabled: false ,value: item[1][1]}),
        nominalFrequency3: new FormControl({disabled: false ,value: item[1][2]}),
        nominalFrequency4: new FormControl({disabled: false ,value: item[1][3]}),
        nominalFrequency5: new FormControl({disabled: false ,value: item[1][4]}),
        nominalFrequency6: new FormControl({disabled: false ,value: item[1][5]}),
        nominalFrequency7: new FormControl({disabled: false ,value: item[1][6]}),
        nominalFrequency8: new FormControl({disabled: false ,value: item[1][7]}),
        nominalFrequency9: new FormControl({disabled: false ,value: item[1][8]}),
  
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
        location: new FormControl('', [Validators.required]),
        jointNo: new FormControl('', [Validators.required]),
        jointResistance: new FormControl('', [Validators.required]),
      });
    }

  private createLocation1Form(): FormGroup {
    return new FormGroup({
      locationNo: new FormControl('', [Validators.required]),
      locationName: new FormControl('', [Validators.required]),
      electrodeResistanceEarth: new FormControl('', [Validators.required]),
      electrodeResistanceGird: new FormControl('', [Validators.required]),
    });
  }

  private createLocation3Form(): FormGroup {
    return new FormGroup({
      location: new FormControl('', [Validators.required]),
      jointNo: new FormControl('', [Validators.required]),
      jointResistance: new FormControl('', [Validators.required]),
    });
  }

  private SupplyparametersForm(): FormGroup {
    return new FormGroup({
      aLSupplyNo: new FormControl('', [Validators.required]),
      aLSupplyShortName: new FormControl('', [Validators.required]),
      aLSystemEarthing: new FormControl('', [Validators.required]),
      aLLiveConductorType: new FormControl('', [Validators.required]),
      aLLiveConductorAC: new FormControl(''),
      aLLiveConductorDC: new FormControl(''),
      aLSystemEarthingBNote: new FormControl('', [Validators.required]),
      aLLiveConductorBNote: new FormControl('', [Validators.required]),
      nominalVoltage: new FormControl(''),
      nominalFrequency: new FormControl(''),
      faultCurrent: new FormControl(''),
      loopImpedance: new FormControl(''),
      installedCapacity: new FormControl(''),
      actualLoad: new FormControl(''),
      nominalVoltageArr1: this.formBuilder.array([this.nominalVoltageForm()]),
      protectiveDevice: new FormControl('', [Validators.required]),
      ratedCurrent: new FormControl('', [Validators.required]),
      currentDissconnection: new FormControl('', [Validators.required]),
      alternateArrFormValue: new FormControl('')
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

      nominalFrequency1: new FormControl(''),
      nominalFrequency2: new FormControl(''),
      nominalFrequency3: new FormControl(''),
      nominalFrequency4: new FormControl(''),
      nominalFrequency5: new FormControl(''),
      nominalFrequency6: new FormControl(''),
      nominalFrequency7: new FormControl(''),
      nominalFrequency8: new FormControl(''),
      nominalFrequency9: new FormControl(''),

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
      type: new FormControl('', [Validators.required]),
      noPoles: new FormControl('', [Validators.required]),
      current: new FormControl('', [Validators.required]),
      voltage: new FormControl('', [Validators.required]),
      fuse: new FormControl('', [Validators.required]),
      residualCurrent: new FormControl('', [Validators.required]),
      residualTime: new FormControl('', [Validators.required]),
    });
  }

  onKey1(event: KeyboardEvent) {
    this.values = (<HTMLInputElement>event.target).value;
    this.value = this.values;
    this.location1Arr = this.supplycharesteristicForm.get(
      'location1Arr'
    ) as FormArray;

    if (this.location1Arr.length == 0) {
      if (this.value != '') {
        for (this.i = 1; this.i < this.value; this.i++) {
          this.location1Arr = this.supplycharesteristicForm.get(
            'location1Arr'
          ) as FormArray;
          this.location1Arr.push(this.createLocation1Form());
        }
      }
    } else if (this.value == '') {
      this.loclength = this.location1Arr.length;
      for (this.i = 1; this.i < this.loclength; this.i++) {
        this.location1Arr.removeAt(this.location1Arr.length - 1);
      }
    } else if (this.location1Arr.length < this.value) {
      if (this.value != '') {
        this.delarr = this.value - this.location1Arr.length;
        for (this.i = 0; this.i < this.delarr; this.i++) {
          this.location1Arr = this.supplycharesteristicForm.get(
            'location1Arr'
          ) as FormArray;
          this.location1Arr.push(this.createLocation1Form());
        }
      }
    } else if (this.location1Arr.length > this.value && this.value != 0) {
      if (this.value != '') {
        this.delarr = this.location1Arr.length - this.value;
        for (this.i = 0; this.i < this.delarr; this.i++) {
          this.location1Arr = this.supplycharesteristicForm.get(
            'location1Arr'
          ) as FormArray;
          this.location1Arr.removeAt(this.location1Arr.length - 1);
        }
      }
    }
  }

  onKey(event: KeyboardEvent) {
    this.values = (<HTMLInputElement>event.target).value;
    this.value = this.values;
    this.location2Arr = this.supplycharesteristicForm.get(
      'location2Arr'
    ) as FormArray;
    if (this.location2Arr.length == 0) {
      if (this.value != '') {
        for (this.i = 1; this.i < this.value; this.i++) {
          this.location2Arr = this.supplycharesteristicForm.get(
            'location2Arr'
          ) as FormArray;
          this.location2Arr.push(this.createLocation2Form());
        }
      }
    } else if (this.value == '') {
      this.loclength = this.location2Arr.length;
      for (this.i = 1; this.i < this.loclength; this.i++) {
        this.location2Arr.removeAt(this.location2Arr.length - 1);
      }
    } else if (this.location2Arr.length < this.value) {
      if (this.value != '') {
        this.delarr = this.value - this.location2Arr.length;
        for (this.i = 0; this.i < this.delarr; this.i++) {
          this.location2Arr = this.supplycharesteristicForm.get(
            'location2Arr'
          ) as FormArray;
          this.location2Arr.push(this.createLocation2Form());
        }
      }
    } else if (this.location2Arr.length > this.value && this.value != 0) {
      if (this.value != '') {
        this.delarr = this.location2Arr.length - this.value;
        for (this.i = 0; this.i < this.delarr; this.i++) {
          this.location2Arr = this.supplycharesteristicForm.get(
            'location2Arr'
          ) as FormArray;
          this.location2Arr.removeAt(this.location2Arr.length - 1);
        }
      }
    }
  }

  onKey3(event: KeyboardEvent) {
    this.values = (<HTMLInputElement>event.target).value;
    this.value = this.values;
    this.location3Arr = this.supplycharesteristicForm.get(
      'location3Arr'
    ) as FormArray;
    if (this.location3Arr.length == 0) {
      if (this.value != '') {
        for (this.i = 1; this.i < this.value; this.i++) {
          this.location3Arr = this.supplycharesteristicForm.get(
            'location3Arr'
          ) as FormArray;
          this.location3Arr.push(this.createLocation3Form());
        }
      }
    } else if (this.value == '') {
      this.loclength = this.location3Arr.length;
      for (this.i = 1; this.i < this.loclength; this.i++) {
        this.location3Arr.removeAt(this.location3Arr.length - 1);
      }
    } else if (this.location3Arr.length < this.value) {
      if (this.value != '') {
        this.delarr = this.value - this.location3Arr.length;
        for (this.i = 0; this.i < this.delarr; this.i++) {
          this.location3Arr = this.supplycharesteristicForm.get(
            'location3Arr'
          ) as FormArray;
          this.location3Arr.push(this.createLocation3Form());
        }
      }
    } else if (this.location3Arr.length > this.value && this.value != 0) {
      if (this.value != '') {
        this.delarr = this.location3Arr.length - this.value;
        for (this.i = 0; this.i < this.delarr; this.i++) {
          this.location3Arr = this.supplycharesteristicForm.get(
            'location3Arr'
          ) as FormArray;
          this.location3Arr.removeAt(this.location3Arr.length - 1);
        }
      }
    }
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
    } else {
      this.f.alternateArr.controls[a].controls[
        'aLLiveConductorAC'
      ].clearValidators();
      this.f.alternateArr.controls[a].controls[
        'aLLiveConductorAC'
      ].updateValueAndValidity();

      this.f.alternateArr.controls[a].controls[
        'aLLiveConductorDC'
      ].setValidators(Validators.required);
      this.f.alternateArr.controls[a].controls[
        'aLLiveConductorDC'
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
      if (this.alternateArr.length != 0) {
        this.alternateArr.reset();
        this.circuitArr.reset();
      }

      this.disableValidators();
    }
     else {
      this.alternativeSupplyNo=true;
      this.supplycharesteristicForm.controls['supplyNumber'].setValidators(
        Validators.required
      );
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
      if (this.alternateArr.length == 1) {
        for (this.i = 1; this.i < this.value; this.i++) {
          this.alternateArr.push(this.SupplyparametersForm());
          this.circuitArr.push(this.createCircuitForm());
        }
        this.sources = true;
        this.breaker = true;
      } else {
        for (this.i = 0; this.i < this.value; this.i++) {
          this.alternateArr.push(this.SupplyparametersForm());
          this.circuitArr.push(this.createCircuitForm());
        }
        this.sources = true;
        this.breaker = true;
      }
    } else if (this.value == '') {
      this.loclength = this.alternateArr.length;
      this.loc1length = this.circuitArr.length;

      for (this.i = 0; this.i < this.loclength; this.i++) {
        this.alternateArr.removeAt(this.alternateArr.length - 1);
      }
      for (this.i = 0; this.i < this.loc1length; this.i++) {
        this.circuitArr.removeAt(this.circuitArr.length - 1);
      }
      this.breaker = false;
    } else if (this.alternateArr.length < this.value) {
      if (this.value != '') {
        this.delarr = this.value - this.alternateArr.length;
        this.delarr1 = this.value - this.circuitArr.length;
        for (this.i = 0; this.i < this.delarr; this.i++) {
          this.alternateArr = this.supplycharesteristicForm.get(
            'alternateArr'
          ) as FormArray;
          this.alternateArr.push(this.SupplyparametersForm());
        }

        for (this.i = 0; this.i < this.delarr1; this.i++) {
          this.circuitArr = this.supplycharesteristicForm.get(
            'circuitArr'
          ) as FormArray;
          this.circuitArr.push(this.createCircuitForm());
        }
      }
    } else this.alternateArr.length > this.value;
    {
      if (this.value != '') {
        this.delarr = this.alternateArr.length - this.value;
        this.delarr1 = this.circuitArr.length - this.value;

        for (this.i = 0; this.i < this.delarr; this.i++) {
          this.alternateArr = this.supplycharesteristicForm.get(
            'alternateArr'
          ) as FormArray;
          this.alternateArr.removeAt(this.alternateArr.length - 1);
        }
        for (this.i = 0; this.i < this.delarr1; this.i++) {
          this.circuitArr = this.supplycharesteristicForm.get(
            'circuitArr'
          ) as FormArray;
          this.circuitArr.removeAt(this.circuitArr.length - 1);
        }
      }
    }
  }

  disableValidators() {
    this.alternateArr = this.supplycharesteristicForm.get(
      'alternateArr'
    ) as FormArray;
    this.loclength = this.alternateArr.length;

    this.supplycharesteristicForm.controls['supplyNumber'].clearValidators();
    this.supplycharesteristicForm.controls[
      'supplyNumber'
    ].updateValueAndValidity();

    for (this.i = 0; this.i < this.loclength; this.i++) {
      for (this.j = 0; this.j < this.fcname.length; this.j++) {
        this.f.alternateArr.controls[this.i].controls[
          this.fcname[this.j]
        ].clearValidators();
        this.f.alternateArr.controls[this.i].controls[
          this.fcname[this.j]
        ].updateValueAndValidity();
      }

      for (this.k; this.k < this.circuitName.length; this.k++) {
        this.f.circuitArr.controls[this.i].controls[
          this.circuitName[this.k]
        ].clearValidators();
        this.f.circuitArr.controls[this.i].controls[
          this.circuitName[this.k]
        ].updateValueAndValidity();
      }
    }
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
  gotoNextModal(content1: any,content2:any) {
    if (this.supplycharesteristicForm.invalid) {
      this.validationError = true;
      this.validationErrorMsg = 'Please check all the fields';
      setTimeout(() => {
        this.validationError = false;
      }, 3000);
      return;
    }
    if(this.supplycharesteristicForm.dirty){
      this.modalService.open(content1, { centered: true})
     }
     if(!this.supplycharesteristicForm.dirty){
      this.modalService.open(content2, {
         centered: true, 
         size: 'md'
        })
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
  nextTab2(flag: any) {
    if(!flag) {
      this.supplycharesteristic.siteId = this.service.siteCount;
    }
   
    this.supplycharesteristic.userName = this.email;
    this.submitted = true;
    if (this.supplycharesteristicForm.invalid) {
      return;
    }
   
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
      this.NF1,
      this.NF2,
      this.NF3,
      this.NF4,
      this.NF5,
      this.NF6,
      this.NF7,
      this.NF8,
      this.NF9
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
      if (i != undefined) {
        this.nominalVoltage += i + ',';
      } else {
        this.nominalVoltage += 'NA,';
      }
    }
    this.nominalVoltage = this.nominalVoltage.replace(/,\s*$/, '');

    // Main table Nominal Frequency
    for (let j of this.nominalFrequencyArr) {
      if (j != undefined) {
        this.nominalFrequency += j + ',';
      } else {
        this.nominalFrequency += 'NA,';
      }
    }
    this.nominalFrequency = this.nominalFrequency.replace(/,\s*$/, '');

    // Main table Nominal Current
    for (let k of this.nominalCurrentArr) {
      if (k != undefined) {
        this.nominalCurrent += k + ',';
      } else {
        this.nominalCurrent += 'NA,';
      }
    }
    this.nominalCurrent = this.nominalCurrent.replace(/,\s*$/, '');

    // Main table Loop Impedence
    for (let l of this.loopImpedenceArr) {
      if (l != undefined) {
        this.loopImpedence += l + ',';
      } else {
        this.loopImpedence += 'NA,';
      }
    }
    this.loopImpedence = this.loopImpedence.replace(/,\s*$/, '');

    this.mainNominalVoltageArr1 = [];
    this.mainNominalVoltageArr2 = [];
    this.mainNominalVoltageArr3 = [];
    this.mainNominalVoltageArr4 = [];

    this.mainNominalVoltageArr1 = this.nominalVoltage.split(",");
    this.mainNominalVoltageArr2 = this.nominalFrequency.split(",");
    this.mainNominalVoltageArr3 = this.nominalCurrent.split(",");
    this.mainNominalVoltageArr4 = this.loopImpedence.split(",");

    this.mainNominalArr = [];
    this.mainNominalArr.push(this.mainNominalVoltageArr1,this.mainNominalVoltageArr2,this.mainNominalVoltageArr3,this.mainNominalVoltageArr4);


    // Supply Parameters Table
    if (this.alternateArr.length != 0) {
      for (let i of this.alternateArr.value) {
        let arr: any = [];
        let arr1: any = [];
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
          arr1.push(
            j.nominalFrequency1,
            j.nominalFrequency2,
            j.nominalFrequency3,
            j.nominalFrequency4,
            j.nominalFrequency5,
            j.nominalFrequency6,
            j.nominalFrequency7,
            j.nominalFrequency8,
            j.nominalFrequency9
          );
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
        let nominalFrequency: String = '';
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

          for (let b of arr1) {
            if (b != '') {
              nominalFrequency += b + ',';
            } else {
              nominalFrequency += 'NA,';
            }
          }
      
          nominalFrequency = nominalFrequency.replace(/,\s*$/, '');
          i.nominalFrequency = nominalFrequency;

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

      if (
        this.circuitArr.value[0].location != null &&
        this.circuitArr.length != 0
      ) {
        this.supplycharesteristic.circuitBreaker =
          this.supplycharesteristicForm.value.circuitArr;
      }

    
    }
    
    if (this.supplycharesteristic.liveConductorType != 'DC') {
      this.supplycharesteristic.mainNominalVoltage = this.nominalVoltage;
      this.supplycharesteristic.mainNominalFrequency = this.nominalFrequency;
      this.supplycharesteristic.mainNominalCurrent = this.nominalCurrent;
      this.supplycharesteristic.mainLoopImpedance = this.loopImpedence;

      this.service.mainNominalVoltage = this.nominalVoltage;
      this.service.mainNominalFrequency = this.nominalFrequency;
      this.service.mainNominalCurrent = this.nominalCurrent;
    }

    this.supplycharesteristic.instalLocationReport =this.supplycharesteristicForm.value.location1Arr;
    this.supplycharesteristic.boundingLocationReport =this.supplycharesteristicForm.value.location2Arr;
    this.supplycharesteristic.earthingLocationReport =this.supplycharesteristicForm.value.location3Arr;
  
    

    if(flag) { 
      if(this.supplycharesteristicForm.dirty){
      this.UpateInspectionService.updateSupply(this.supplycharesteristic).subscribe(
        data=> {
          this.success = true;
          this.successMsg = data;
          this.service.supplyList= this.supplycharesteristic.supplyNumber;
          this.service.retrieveMainNominalVoltage=this.mainNominalArr;
          this.service.retrieveMainNominalVoltage=this.retrieveMainNominalVoltage;
          this.service.nominalVoltageArr2=this.supplycharesteristic.supplyParameters;
         },
         (error) => {
          this.Error = true;
          this.errorArr = [];
          this.errorArr = JSON.parse(error.error);
          this.errorMsg = this.errorArr.message;
         });
        }
    }
else{
    this.supplyCharacteristicsService.addSupplyCharacteristics(this.supplycharesteristic).subscribe(
        (data) => {
          this.proceedNext.emit(true);
          this.success = true;
          this.successMsg = data;
          this.disable = true;
          this.service.supplyList= this.supplycharesteristic.supplyNumber;
          this.service.retrieveMainNominalVoltage=this.mainNominalArr;
          this.service.retrieveMainNominalVoltage=this.retrieveMainNominalVoltage;
          this.service.nominalVoltageArr2=this.supplycharesteristic.supplyParameters;
        },
        (error) => {
          this.Error = true;
          this.proceedNext.emit(false);
          this.errorArr = [];
          this.errorArr = JSON.parse(error.error);
          this.errorMsg = this.errorArr.message;
        }
      );
  }
  }
}
