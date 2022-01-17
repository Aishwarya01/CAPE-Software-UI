import {
  Component, 
  EventEmitter,
  Input,
  OnInit,
  AfterViewInit,
  Output,
  ViewChild,
  OnDestroy,
  ElementRef,
  OnChanges,
  AfterViewChecked,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TestingDetails } from '../model/testing-details';
import { TestingService } from '../services/testing.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InspectiondetailsService } from '../services/inspectiondetails.service';
//import { InspectionVerificationIncomingEquipmentComponent } from '../inspection-verification-incoming-equipment/inspection-verification-incoming-equipment.component';
import { GlobalsService } from '../globals.service';
import { Location } from '../model/location';
import { SiteService } from '../services/site.service';
import { InspectionVerificationService } from '../services/inspection-verification.service';
import { CommentsSection } from '../model/comments-section';
import { MainNavComponent } from '../main-nav/main-nav.component';
//import { convertTypeAcquisitionFromJson } from 'typescript';
import { SupplyCharacteristicsService } from '../services/supply-characteristics.service';
import { concat } from 'rxjs';
import { DatePipe } from '@angular/common'
import { ValueTransformer } from '@angular/compiler/src/util';
import { MatDialog } from '@angular/material/dialog';
import { ObservationService } from '../services/observation.service';
// import { ObservationTesting } from '../model/observation-testing';

@Component({
  selector: 'app-inspection-verification-testing',
  templateUrl: './inspection-verification-testing.component.html',
  styleUrls: ['./inspection-verification-testing.component.css'],
})
export class InspectionVerificationTestingComponent implements OnInit, OnDestroy {
  j: any;
  i: any;
  delarr: any;
  values: any;
  value: any;
  loclength: any;
  loc1length: any;
  testingForm!: FormGroup;
  submitted = false;
  testaccordianArr : any  = [];
  panelOpenState = false;
  // email: String = '';
  isHidden=true;
  @Output() proceedNext = new EventEmitter<any>();
  testingDetails = new TestingDetails();
  incomingVoltage: String = '';
  incomingLoopImpedance: String = '';
  incomingFaultCurrent: String = '';
  incomingActualLoad: String = '';
  rateArr: any = [];
  //@Input()
  userName: String = '';
  //@Input()
  siteId!: number;
  rateValueArr: any = [];
  testingRecordTableArr: any = [];

  distributionIncomingValueArr: any = [];
  distributionIncomingValueArr2: any = [];
  testDistRecords: any=[];
  testingRecords: any = [];
  testingAlternateRecords: any = [];
  ratingAmps1: any;
  testDistribution!: FormArray;
  testingDistribution!: FormArray;
  o: any;
  // successMsg: string = '';
  // success: boolean = false;
  // Error: boolean = false;
  // errorMsg: string = '';
 // email: string;
  validationError: boolean = false;
  validationErrorMsg: String = '';
  location = new Location();
  supply = new Location();
  // demoArr: any=[];
  disable: boolean = false;
  flag: boolean = false;
  fcname: any[] = [
    'circuitNo',
    'circuitDesc',
    'circuitMake',
    'circuitStandardNo',
    'circuitType',
    'numberOfPoles',
    'circuitCurrentCurve',
    'circuitRating',
    'circuitBreakingCapacity',
    'shortCircuitSetting',
    'eFSetting',
    'conductorInstallation',
    'conductorPhase',
    'conductorNeutral',
    'conductorPecpc',
    'continutiyApproximateLength',
    'continutiyRR',
    'continutiyR',
    'continutiyPolarity',

    'rcdType',
    'rcdCurrent',
    'rcdOperatingCurrent',
    'rcdOperatingFiveCurrent',
    'rcdTestButtonOperation',
    'rcdRemarks',
  ];
  errorArr: any = [];
  testList: any = [];
  arr: any = [];
  Ratearr1: any = [];
  testingRetrieve: boolean = true;
  inspectionRetrieve: boolean = false;
  SourceList: any = [];
  //observation= new ObservationTesting();
  //disableSource:boolean=true;
  //comments starts
  completedCommentArr3: any = [];
  successMsg: string = "";
  commentSuccess: boolean = false;
  commentApprove: boolean = false;
  commentReject: boolean = false;
  errorMsg: string = "";
  success: boolean = false;
  Error: boolean = false;
  viewerComments: String = '';
  commentDataArr: any = [];
  replyClicked: boolean = false;
  inspectorCommentArr!: FormArray;
  viewerCommentArr!: FormArray;
  completedCommentArr!: FormArray;
  comments = new CommentsSection;
  completedComments: boolean = false;
  date!: Date;
  toggleHideShow: boolean = false;
  public today: Date = new Date();
  isCollapsed = false;
  registerData: any = [];
  mode: any = 'indeterminate';
  cardBodyComments: boolean = true;
  spinner: boolean = false;
  replyCommentBox: boolean = false;
  hideMatIcons: boolean[] = [];
  hideAsViewerLogin: boolean = false;
  hideAsInspLogin: boolean = true;
  hideCommentSection: boolean = false;
  currentUser: any = [];
  currentUser1: any = [];
  reportViewerCommentArr: any = [];
  reportInspectorCommentArr: any = [];
  commentId: any;
  hideAdd: boolean = false;
  hideInspText: boolean = false;
  SendReply: boolean = false;
  showSend: boolean = false;
  sendComment: boolean = false;
  hideapproveIcon: boolean = false;
  hideapprove: boolean = false;
  hideRejectIcon: boolean = false;
  hideReject: boolean = false;
  showSubmenu: boolean = true;
  showText: boolean = true;
  isExpanded: boolean = false;
  isShowing = false;
  enabled: boolean = false;
  enabledViewer: boolean = false;
  savedUserName: String = '';
  completedCommentArrValue: any = [];
  afterApprove: boolean = false;
  hideRefresh: boolean = false;
  hideDelete: boolean = false;
  showReplyBox: boolean = false;
  enabledRequest: boolean = false;
  disableSend: boolean = false;
  disableReply: boolean = false;
  addReject: boolean = false;
  count: number = 0;
  color = 'red';
  completedCommentArr4: any = [];
  completedCommentArr5: any = [];
  completedCommentArr1!: FormArray;
  expandedIndex!: number;
  isClicked: boolean[] = [];
  arrViewer: any = [];
  @ViewChild('target') private myScrollContainer!: ElementRef;
 

  expandedIndexx!: number;
  inspectorName: String = '';
  hideShowComment: boolean = false;
  //comments end
  updateUserInfo: any;
   changedValue: String="";
   currentIndex:number=0;
  supplyValues: any = [];
  jsonArray: any = [];
  pushJsonArray: any = [];
  mainNominalVoltageArr1: any = [];
  mainNominalVoltageArr2: any = [];
  mainNominalVoltageArr3: any = [];
  mainNominalVoltageArr4: any = [];
  mainNominalArr: any = [];
  nominalVoltageArr1:any = [];
  nominalVoltageArr3: any = [];
  nominalVoltageArr4: any = [];
  nominalVoltageArr2: any = [];
  alternateNominalArr: any = [];
  changedIndex:number=0;
  formList!: FormArray;
  formList1!: FormArray;
  tempArr: any = [];
  incomingValues: any;
  modalReference: any;
  tabErrorMsg: string="";
  tabError: boolean = false;
  testingEquipment: any=[];
  showAdd: boolean = true;
  validationErrorTab: boolean = false;
  validationErrorMsgTab: string="";
  testingCalculation: any=[];
  testingRecordTableArr1: any=[];
  testingAlternateRecords1: any = [];
  testList1: any = [];
  deletedTestingRecord: any = [];
  deletedTestingEquipment: any= [];
  deleteDataFlag: boolean = false;
  deleteRecordDataFlag: boolean = false;
  observationUpdateFlag: boolean= false;
  alArr: any = [];

  // ObservationsForm = new FormGroup({
  //   observations: new FormControl(''),
  // });
  observationFlag: boolean= false;
  errorArrObservation: any=[];
  observationValues: any="";
  disableObservation: boolean=true;
  observationArr: any=[];
 
  observArr: any = [];
  deletedObservation: any = [];
  observationCircuitArr: any= [];

  email: string;
  observationValuesT: any="";
  observationModalReference: any;
  tempArray: any = [];
  observeMainArr: any = [];
  deletedObservationArr: any = [];
  testDistRecords1: any = [];
  deleteObRecordDataFlag: boolean=false;
  finalSpinner: boolean = true;
  popup: boolean = false;
  tempConsumerArr: any = [];
  dataRefresher: any;
  
  constructor(
    private testingService: TestingService,
    private supplyCharacteristicsService: SupplyCharacteristicsService,
    private formBuilder: FormBuilder,
    public service: GlobalsService,
    private dialog: MatDialog,
    private modalService: NgbModal,
    private router: ActivatedRoute,
    private observationService: ObservationService,
    private inspectionDetailsService: InspectiondetailsService,
    private siteService: SiteService,
    private basic: MainNavComponent,public datepipe: DatePipe,
    private UpateInspectionService: InspectionVerificationService,
  ) {
    this.email = this.router.snapshot.paramMap.get('email') || '{}';
  }
  ngOnDestroy(): void {
    this.service.siteCount=0;
  this.location=new Location();
  this.supply=new Location();
  this.service.iterationList=[];
  this.service.nominalVoltageArr2=[];
  this.service.retrieveMainNominalVoltage=[];	
  this.service.mainNominalVoltageValue="";	
  this.service.mainLoopImpedanceValue="";	
  this.service.mainNominalCurrentValue="";
  this.service.mainActualLoadValue="";
  this.service.testingTable2=[];	
  this.service.observationGlowTesting=false;
  this.service.testingTable=[];	
  this.service.supplyList=[];			
  }
 
  ngOnInit(): void {
    this.currentUser = sessionStorage.getItem('authenticatedUser');
    this.currentUser1 = [];
    this.currentUser1 = JSON.parse(this.currentUser);
    
    this.testingForm = this.formBuilder.group({
       testIncomingDistribution: this.formBuilder.array([
        this.IncomingValue(),
      ]),
      testaccordianArr: this.formBuilder.array([this.createItem()]),
      viewerCommentArr: this.formBuilder.array([this.addCommentViewer()]),
      completedCommentArr1: this.formBuilder.array([]),
    });
    this.retrieveDetailsFromIncoming();
    this.expandedIndex = -1;
    this.retrieveDetailsFromSupply();
    // this.ObservationsForm = this.formBuilder.group({
    //   observations: [''],
    //  })
  } 

 retrieveDetailsFromIncoming() {
  if(this.service.siteCount !=0 && this.service.siteCount!=undefined) {
    if(this.currentUser1.role == 'Inspector') {
      this.inspectionDetailsService.retrieveInspectionDetails(this.email, this.service.siteCount).subscribe(
        data=>{
        this.incomingValues = JSON.parse(data);
        this.testingForm = this.formBuilder.group({
          testIncomingDistribution: this.formBuilder.array([
           this.IncomingValue(),
         ]),
         testaccordianArr: this.formBuilder.array([]),
         viewerCommentArr: this.formBuilder.array([this.addCommentViewer()]),
         completedCommentArr1: this.formBuilder.array([]),
       });
        //for(let i of this.incomingValues) {	
          this.service.iterationList=this.incomingValues.ipaoInspection;	
        // }
        //location iteration
        if (this.service.iterationList != '' && this.service.iterationList != undefined && this.service.iterationList.length != 0) {
          this.testingRetrieve = false;
          this.inspectionRetrieve = true;
          let a = this.service.iterationList.length;
          for (let i = 0; i < a; i++) {
            this.addItem();
          }
          // for (let j = 0; j < this.testaccordianArr.controls.length; j++) {
          //   let v= this.service.iterationList[j].consumerUnit.length;
          //   for(let k = 0; k < v; k++){
          //    this.testaccordianArr.value[j].testDistRecords.value[k].distributionBoardDetails= this.service.iterationList[j].consumerUnit[k].distributionBoardDetails;
          //    this.testaccordianArr.value[j].testDistRecords.value[k].referance= this.service.iterationList[j].consumerUnit[k].referance;
          //    this.testaccordianArr.value[j].testDistRecords.value[k].location= this.service.iterationList[j].consumerUnit[k].location;
          //   }
          // }
          for(let r = 0; r < this.testaccordianArr.controls.length; r++){
          let testDistRecords:any=[];
          testDistRecords= this.testaccordianArr.controls[r].controls.testDistRecords as FormArray;
          let d= this.service.iterationList[r].consumerUnit.length-1;
          for(let k = 0; k < d; k++){
            testDistRecords.push(this.createtestDistRecordsForm());
           }
          }
          for (let j = 0; j < this.testaccordianArr.controls.length; j++) {
            this.testaccordianArr.value[j].locationNumber = this.service.iterationList[j].locationNumber;
            this.testaccordianArr.value[j].locationName = this.service.iterationList[j].locationName;
            // this.testaccordianArr.value[j].locationCount = this.service.iterationList[j].locationCount;
            this.testaccordianArr.controls[j].controls.locationCount.setValue(this.service.iterationList[j].locationCount);
            let v= this.service.iterationList[j].consumerUnit.length;
            for(let k = 0; k < v; k++){
            this.testaccordianArr.controls[j].controls.testDistRecords.controls[k].
            controls.locationCount.setValue(this.service.iterationList[j].consumerUnit[k].locationCount);

            this.testaccordianArr.controls[j].controls.testDistRecords.controls[k].controls.testDistribution.controls[0].
            controls.distributionBoardDetails.setValue(this.service.iterationList[j].consumerUnit[k].distributionBoardDetails);
           
            this.testaccordianArr.controls[j].controls.testDistRecords.controls[k].controls.testDistribution.controls[0].
            controls.referance.setValue(this.service.iterationList[j].consumerUnit[k].referance);

            this.testaccordianArr.controls[j].controls.testDistRecords.controls[k].controls.testDistribution.controls[0].
            controls.location.setValue(this.service.iterationList[j].consumerUnit[k].location);
            }
          }
          this.location.locationArr = this.service.iterationList;
          this.service.iterationList = [];
        }
        this.testingForm.markAsPristine();
      });
    }
    else {
      this.inspectionDetailsService.retrieveInspectionDetails(this.currentUser1.assignedBy, this.service.siteCount).subscribe(
        data=>{
          this.incomingValues = JSON.parse(data);
          this.testingForm = this.formBuilder.group({
            testIncomingDistribution: this.formBuilder.array([
             this.IncomingValue(),
           ]),
           testaccordianArr: this.formBuilder.array([]),
           viewerCommentArr: this.formBuilder.array([this.addCommentViewer()]),
           completedCommentArr1: this.formBuilder.array([]),
         });
          //for(let i of this.incomingValues) {	
            this.service.iterationList=this.incomingValues.ipaoInspection;	
          // }
          //location iteration
          if (this.service.iterationList != '' && this.service.iterationList != undefined && this.service.iterationList.length != 0) {
            this.testingRetrieve = false;
            this.inspectionRetrieve = true;
            let a = this.service.iterationList.length;
            for (let i = 0; i < a; i++) {
              this.addItem();
            }
            // for (let j = 0; j < this.testaccordianArr.controls.length; j++) {
            //   let v= this.service.iterationList[j].consumerUnit.length;
            //   for(let k = 0; k < v; k++){
            //    this.testaccordianArr.value[j].testDistRecords.value[k].distributionBoardDetails= this.service.iterationList[j].consumerUnit[k].distributionBoardDetails;
            //    this.testaccordianArr.value[j].testDistRecords.value[k].referance= this.service.iterationList[j].consumerUnit[k].referance;
            //    this.testaccordianArr.value[j].testDistRecords.value[k].location= this.service.iterationList[j].consumerUnit[k].location;
            //   }
            // }
            for(let r = 0; r < this.testaccordianArr.controls.length; r++){
            let testDistRecords:any=[];
            testDistRecords= this.testaccordianArr.controls[r].controls.testDistRecords as FormArray;
            let d= this.service.iterationList[r].consumerUnit.length-1;
            for(let k = 0; k < d; k++){
              testDistRecords.push(this.createtestDistRecordsForm());
             }
            }
            for (let j = 0; j < this.testaccordianArr.controls.length; j++) {
              this.testaccordianArr.value[j].locationNumber = this.service.iterationList[j].locationNumber;
              this.testaccordianArr.value[j].locationName = this.service.iterationList[j].locationName;
              // this.testaccordianArr.value[j].locationCount = this.service.iterationList[j].locationCount;
              this.testaccordianArr.controls[j].controls.locationCount.setValue(this.service.iterationList[j].locationCount);
              let v= this.service.iterationList[j].consumerUnit.length;
              for(let k = 0; k < v; k++){
              this.testaccordianArr.controls[j].controls.testDistRecords.controls[k].
              controls.locationCount.setValue(this.service.iterationList[j].consumerUnit[k].locationCount);
  
              this.testaccordianArr.controls[j].controls.testDistRecords.controls[k].controls.testDistribution.controls[0].
              controls.distributionBoardDetails.setValue(this.service.iterationList[j].consumerUnit[k].distributionBoardDetails);
             
              this.testaccordianArr.controls[j].controls.testDistRecords.controls[k].controls.testDistribution.controls[0].
              controls.referance.setValue(this.service.iterationList[j].consumerUnit[k].referance);
  
              this.testaccordianArr.controls[j].controls.testDistRecords.controls[k].controls.testDistribution.controls[0].
              controls.location.setValue(this.service.iterationList[j].consumerUnit[k].location);
              }
            }
            this.location.locationArr = this.service.iterationList;
            this.service.iterationList = [];
          }
          this.testingForm.markAsPristine();
        });
    }
  }
}

reset(){
  //this.ngOnInit();
  //setTimeout(() => {
    this.testingForm.reset();
  //}, 1000);
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

 retrieveDetailsFromSupply(){
  this.pushJsonArray=[];
   if(this.service.siteCount !=0 && this.service.siteCount!=undefined){
     if(this.currentUser1.role == 'Inspector') {
      this.supplyCharacteristicsService.retrieveSupplyCharacteristics(this.email, this.service.siteCount).subscribe(
        data=>{
        this.supplyValues = JSON.parse(data);
       	        //for(let i of this.supplyValues) {	
                  this.service.nominalVoltageArr2=this.supplyValues.supplyParameters;	
                  this.pushJsonArray=[];
                  this.testingAlternateRecords = [];
                  let testaccordianValueArr = this.testingForm.get(
                    'testaccordianArr'
                  ) as FormArray;
                  if(this.supplyValues.liveConductorType == "AC") {	
                    this.SourceList=['Mains Incoming'];	
                    this.addValues("Mains Incoming", this.supplyValues.mainNominalVoltage,this.supplyValues.mainLoopImpedance, this.supplyValues.mainNominalCurrent, this.supplyValues.mainActualLoad);	
                    this.mainNominalVoltageArr1 = [];	
                    this.mainNominalVoltageArr2 = [];	
                    this.mainNominalVoltageArr3 = [];	
                    this.mainNominalVoltageArr4 = [];	
                    this.mainNominalVoltageArr1 = this.supplyValues.mainNominalVoltage.split(",");	
                    this.mainNominalVoltageArr2 = this.supplyValues.mainLoopImpedance.split(",");	
                    this.mainNominalVoltageArr3 = this.supplyValues.mainNominalCurrent.split(",");	
                    this.mainNominalVoltageArr4 = this.supplyValues.mainActualLoad.split(",");
                    this.mainNominalArr = [];	
                    this.mainNominalArr.push(this.mainNominalVoltageArr1,this.mainNominalVoltageArr2,this.mainNominalVoltageArr3,this.mainNominalVoltageArr4);	
                    this.service.retrieveMainNominalVoltage=this.mainNominalArr;	
                    this.service.mainNominalVoltageValue=this.supplyValues.mainNominalVoltage;	
                    this.service.mainLoopImpedanceValue=this.supplyValues.mainLoopImpedance;	
                    this.service.mainNominalCurrentValue=this.supplyValues.mainNominalCurrent;
                    this.service.mainActualLoadValue=this.supplyValues.mainActualLoad;		
                  }	
                  this.service.supplyList = this.supplyValues.supplyNumber;	
                  let count =1;	
                  for(let j of this.supplyValues.supplyParameters) {	
                   if(j.aLLiveConductorType == "AC") {	
                    this.addValues("Alternate Source of Supply-" +count, j.nominalVoltage,j.loopImpedance, j.faultCurrent, j.actualLoad);	
                    count++;	
                   }	
                  }	
                  for(let j of this.supplyValues.supplyParameters) { 
                    for(let x of testaccordianValueArr.controls) {
                      let testingDistRecordArr= x.get('testDistRecords') as FormArray;
                      for(let w of testingDistRecordArr.controls){
                        let testingRecordsArr = w.get('testingRecords') as FormArray;
                      for(let y of testingRecordsArr.controls) {
                        this.testingAlternateRecords = y.get('testingRecordsSourceSupply') as FormArray;
                        this.testingAlternateRecords.push(this.createValue(this.supplyValues.mainLoopImpedance,j.nominalVoltage,j.loopImpedance));
                      }
                      }
                    }
                  }
               // }
        //retrieve selected source dd from supply to testing
      if (this.service.supplyList != '' && this.service.supplyList != undefined) {
        this.SourceList=['Mains Incoming'];
        for (let i = 1; i <= this.service.supplyList; i++) {
          this.SourceList.push('Alternate Source of Supply-' + i);
        }
      }
        },
        error=>{
  
        }
      )
     }
     else {
      this.supplyCharacteristicsService.retrieveSupplyCharacteristics(this.currentUser1.assignedBy, this.service.siteCount).subscribe(
        data=>{
          this.supplyValues = JSON.parse(data);
                   //for(let i of this.supplyValues) {	
                    this.service.nominalVoltageArr2=this.supplyValues.supplyParameters;	
                    this.pushJsonArray=[];
                    this.testingAlternateRecords = [];
                    let testaccordianValueArr = this.testingForm.get(
                      'testaccordianArr'
                    ) as FormArray;
                    if(this.supplyValues.liveConductorType == "AC") {	
                      this.SourceList=['Mains Incoming'];	
                      this.addValues("Mains Incoming", this.supplyValues.mainNominalVoltage,this.supplyValues.mainLoopImpedance, this.supplyValues.mainNominalCurrent, this.supplyValues.mainActualLoad);	
                      this.mainNominalVoltageArr1 = [];	
                      this.mainNominalVoltageArr2 = [];	
                      this.mainNominalVoltageArr3 = [];	
                      this.mainNominalVoltageArr4 = [];	
                      this.mainNominalVoltageArr1 = this.supplyValues.mainNominalVoltage.split(",");	
                      this.mainNominalVoltageArr2 = this.supplyValues.mainLoopImpedance.split(",");	
                      this.mainNominalVoltageArr3 = this.supplyValues.mainNominalCurrent.split(",");	
                      this.mainNominalVoltageArr4 = this.supplyValues.mainActualLoad.split(",");
                      this.mainNominalArr = [];	
                      this.mainNominalArr.push(this.mainNominalVoltageArr1,this.mainNominalVoltageArr2,this.mainNominalVoltageArr3,this.mainNominalVoltageArr4);	
                      this.service.retrieveMainNominalVoltage=this.mainNominalArr;	
                      this.service.mainNominalVoltageValue=this.supplyValues.mainNominalVoltage;	
                      this.service.mainLoopImpedanceValue=this.supplyValues.mainLoopImpedance;	
                      this.service.mainNominalCurrentValue=this.supplyValues.mainNominalCurrent;
                      this.service.mainActualLoadValue=this.supplyValues.mainActualLoad;		
                    }	
                    this.service.supplyList = this.supplyValues.supplyNumber;	
                    let count =1;	
                    for(let j of this.supplyValues.supplyParameters) {	
                     if(j.aLLiveConductorType == "AC") {	
                      this.addValues("Alternate Source of Supply-" +count, j.nominalVoltage,j.loopImpedance, j.faultCurrent, j.actualLoad);	
                      count++;	
                     }	
                    }	
                    for(let j of this.supplyValues.supplyParameters) { 
                      for(let x of testaccordianValueArr.controls) {
                        let testingDistRecordArr= x.get('testDistRecords') as FormArray;
                        for(let w of testingDistRecordArr.controls){
                          let testingRecordsArr = w.get('testingRecords') as FormArray;
                        for(let y of testingRecordsArr.controls) {
                          this.testingAlternateRecords = y.get('testingRecordsSourceSupply') as FormArray;
                          this.testingAlternateRecords.push(this.createValue(this.supplyValues.mainLoopImpedance,j.nominalVoltage,j.loopImpedance));
                        }
                        }
                      }
                    }
                 // }
          //retrieve selected source dd from supply to testing
        if (this.service.supplyList != '' && this.service.supplyList != undefined) {
          this.SourceList=['Mains Incoming'];
          for (let i = 1; i <= this.service.supplyList; i++) {
            this.SourceList.push('Alternate Source of Supply-' + i);
          }
        }
          },
        error=>{
  
        }
      )
     }
    
   }
 }

 addValues(sourceFromSupply: any, incomingVoltage: String, incomingLoopImpedance: String, incomingFaultCurrent: String, incomingActualLoad: String) {
  if(sourceFromSupply != "" ) {
     this.jsonArray = {"incomingDistributionId": '',"sourceFromSupply": sourceFromSupply, "incomingVoltage": incomingVoltage, "incomingLoopImpedance": incomingLoopImpedance, "incomingFaultCurrent": incomingFaultCurrent, "incomingActualLoad":incomingActualLoad}
     this.pushJsonArray.push(this.jsonArray);
    }
}

// retrieveFromObservationTesting(data:any){
//   this.observation=JSON.parse(data);
//   this.observationValues=this.observation.observations;
//   this.observationUpdateFlag=true;
//   this.ObservationsForm.markAsPristine();
//   }

//   addObservationTesting(observationIter:any){
//     if(this.testingForm.touched || this.testingForm.untouched){
//       this.observationModalReference = this.modalService.open(observationIter, {
//          centered: true, 
//          size: 'md'
//         })
//      }
//   }


  // onKeyCirtcuit(event: KeyboardEvent) {
  //   this.values = (<HTMLInputElement>event.target).value;
  //   this.value = this.values;
    
  //   if (this.value != '' && this.value != undefined) {
  //     this.observationArr = this.testingForm.get('observationArr') as FormArray;
  //       this.observationCircuitArr = this.observationArr.controls.circuitInnerObservation as FormArray;
  //       let c = 0;
  //       if(this.testingRecordTableArr.length < this.value){
  //       for (this.i = c; this.i < this.value; this.i++) {
  //         this.observationCircuitArr.push(this.generateCircuitForm());
  //       }
  //     } 
  //     else if ((this.testingRecordTableArr.length < this.value) && this.testingRecordTableArr.length!=0)  {
  //       if (this.value != '') {
  //         this.delarr = this.value - this.testingRecordTableArr.length;
  //         this.delarr1 = this.delarr;
  //         for (this.i = 0; this.i < this.delarr; this.i++) {
  //           this.observationCircuitArr.push(this.generateCircuitForm());
  //         }
  //       }
  //     } 
  //     else if((this.testingRecordTableArr.length > this.value))
  //     {
  //       if (this.value != '') {
  //         this.delarr = this.testingRecordTableArr.length - this.value;
  //         this.delarr1 = this.delarr;
  
  //         for (this.i = 0; this.i < this.delarr; this.i++) {
  //           this.testingRecordTableArr = this.testingForm.get(
  //             'testDistRecords'
  //           ) as FormArray;
  //           this.observationCircuitArr.removeAt(this.observationCircuitArr.length - 1);
  //         }
  //       }
  //     }
  //     else {
  //       if(!this.testingRecordTableArr.length == this.value){ //removed from elango's yesterday commit by Aish
  //       for (this.i = 0; this.i < this.value; this.i++) {
  //         this.observationCircuitArr.push(this.generateCircuitForm());
  //       }
  //      }
  //   }
  //   } 
  // }

callValue(e: any) {
  console.log(e);
}

  retrieveDetailsforTesting(userName: any, siteId: any,data: any) {
    // if(this.service.disableFields==true){
    //   this.testingForm.disable();
    //  }
    this.testingRetrieve = true;
    this.inspectionRetrieve = false;
    this.testList1 = JSON.parse(data);
    this.testingDetails.siteId = siteId;
    this.deletedTestingEquipment = [];
    this.deletedTestingRecord = [];
    this.deletedObservationArr = [];

    this.retrieveDetailsFromIncoming();
    this.retrieveDetailsFromSupply();
    if(this.testList1 != null) {
    this.testingDetails.testingReportId = this.testList1.testingReportId;
    this.testingDetails.createdBy = this.testList1.createdBy;
    this.testingDetails.createdDate = this.testList1.createdDate;
    setTimeout(() => {
      this.populateData(this.testList1);
    }, 1000);
    this.flag = true;
    }    
  }
  retrieveDetailsfromSavedReports(userName: any, siteId: any, clientName: any, departmentName: any, site: any, data: any) {
    //this.service.lvClick=1;
    this.testingRetrieve = true;
    this.inspectionRetrieve = false;
    this.testList = JSON.parse(data);
    this.testingDetails.siteId = siteId;
    this.deletedTestingEquipment = [];
    this.deletedTestingRecord = [];
    this.deletedObservationArr = [];
    //this.testingDetails.testingOuterObservation = this.testList.testingReport.testingOuterObservation;
    this.retrieveDetailsFromIncoming();
    this.retrieveDetailsFromSupply();
    if(this.testList.testingReport != null) {
    this.testingDetails.testingReportId = this.testList.testingReport.testingReportId; 
    this.testingDetails.createdBy = this.testList.testingReport.createdBy;
    this.testingDetails.createdDate = this.testList.testingReport.createdDate;
    setTimeout(() => {
      this.populateData(this.testList.testingReport);      
      this.populateDataComments();
    }, 1000);
    this.flag = true;
    } 
    if(this.testList.testingReport != null) {
      this.updateMethod();   
    }
  }

  updateMethod(){
    this.ngOnInit();
    this.testingService.retrieveTesting(this.testingDetails.siteId,this.email).subscribe(
      data=>{
       this.retrieveDetailsforTesting(this.email,this.testingDetails.siteId,data);    
       
       setTimeout(() => {
        this.testaccordianArr = this.testingForm.get(
          'testaccordianArr'
        ) as FormArray;
        if(this.incomingValues.ipaoInspection.length != this.testList1.testing.length) {
          this.tempArray = [];
          for(let i=0;  i<this.testList1.testing.length; i++) {
            for(let j=0;  j<this.incomingValues.ipaoInspection.length; j++) {
              if(this.incomingValues.ipaoInspection[j].locationCount != this.testList1.testing[i].locationCount) {
              this.tempArray.push(this.incomingValues.ipaoInspection[j]);
              } 
              else {
              this.tempArray = [];
              }
            }
          }

          if(this.tempArray.length != 0) {
            for(let k=0; k<this.tempArray.length; k++) {
            this.addItem();
            }

            for(let r = this.testList1.testing.length; r < this.testaccordianArr.controls.length; r++){
              let testDistRecords:any=[];
              testDistRecords= this.testaccordianArr.controls[r].controls.testDistRecords as FormArray;
              let d= this.incomingValues.ipaoInspection[r].consumerUnit.length-1;
              for(let k = 0; k < d; k++){
                testDistRecords.push(this.createtestDistRecordsForm());              
              }

              for(let l=0;l<this.incomingValues.ipaoInspection[r].consumerUnit.length; l++) {

                this.testaccordianArr.controls[r].controls.testDistRecords.controls[l].
                controls.locationCount.setValue(this.incomingValues.ipaoInspection[r].consumerUnit[l].locationCount);
    
                this.testaccordianArr.controls[r].controls.testDistRecords.controls[l].controls.testDistribution.controls[0].
                controls.distributionBoardDetails.setValue(this.incomingValues.ipaoInspection[r].consumerUnit[l].distributionBoardDetails);
              
                this.testaccordianArr.controls[r].controls.testDistRecords.controls[l].controls.testDistribution.controls[0].
                controls.referance.setValue(this.incomingValues.ipaoInspection[r].consumerUnit[l].referance);
    
                this.testaccordianArr.controls[r].controls.testDistRecords.controls[l].controls.testDistribution.controls[0].
                controls.location.setValue(this.incomingValues.ipaoInspection[r].consumerUnit[l].location);
              }

              this.supplyCharacteristicsService.retrieveSupplyCharacteristics(this.email, this.service.siteCount).subscribe(
                data=>{
                this.supplyValues = JSON.parse(data);
                for(let j of this.supplyValues.supplyParameters) {                  
                    for(let w of testDistRecords.controls){
                      let testingRecordsArr = w.get('testingRecords') as FormArray;
                    for(let y of testingRecordsArr.controls) {
                      this.testingAlternateRecords = y.get('testingRecordsSourceSupply') as FormArray;
                      this.testingAlternateRecords.push(this.createValue(this.supplyValues.mainLoopImpedance,j.nominalVoltage,j.loopImpedance));
                    }
                    }                 
                }
                });

                this.testaccordianArr.controls[r].controls.locationNumber.setValue(this.incomingValues.ipaoInspection[r].locationNumber);
                this.testaccordianArr.controls[r].controls.locationName.setValue(this.incomingValues.ipaoInspection[r].locationName);
                this.testaccordianArr.controls[r].controls.locationCount.setValue(this.incomingValues.ipaoInspection[r].locationCount);
              }
          } 
          for(let i=0; i<this.incomingValues.ipaoInspection.length; i++) {
            if(this.testList1.testing[i] != undefined ) {
              if(this.incomingValues.ipaoInspection[i].locationCount == this.testList1.testing[i].locationCount) {
                if(this.incomingValues.ipaoInspection[i].consumerUnit.length 
                  != this.testList1.testing[i].testDistRecords.length) {
  
                  let testDistRecords:any=[];
                  testDistRecords= this.testaccordianArr.controls[i].controls.testDistRecords as FormArray;
  
                    for(let k=this.testList1.testing[i].testDistRecords.length;
                      k<this.incomingValues.ipaoInspection[i].consumerUnit.length; k++) {
                        testDistRecords.push(this.createtestDistRecordsForm());            
                    }
  
                for(let j=this.testList1.testing[i].testDistRecords.length ;
                  j<this.incomingValues.ipaoInspection[i].consumerUnit.length; j++) {
                      
                  
                  this.testaccordianArr.controls[i].controls.testDistRecords.controls[j].
                  controls.locationCount.setValue(this.incomingValues.ipaoInspection[i].consumerUnit[j].locationCount);
      
                  this.testaccordianArr.controls[i].controls.testDistRecords.controls[j].controls.testDistribution.controls[0].
                  controls.distributionBoardDetails.setValue(this.incomingValues.ipaoInspection[i].consumerUnit[j].distributionBoardDetails);
                  
                  this.testaccordianArr.controls[i].controls.testDistRecords.controls[j].controls.testDistribution.controls[0].
                  controls.referance.setValue(this.incomingValues.ipaoInspection[i].consumerUnit[j].referance);
      
                  this.testaccordianArr.controls[i].controls.testDistRecords.controls[j].controls.testDistribution.controls[0].
                  controls.location.setValue(this.incomingValues.ipaoInspection[i].consumerUnit[j].location);
  
                  this.supplyCharacteristicsService.retrieveSupplyCharacteristics(this.email, this.service.siteCount).subscribe(
                    data=>{
                    this.supplyValues = JSON.parse(data);
                    for(let k of this.supplyValues.supplyParameters) {                  
                        let testingRecordsArr = this.testaccordianArr.controls[i].controls.testDistRecords.controls[j].controls.testingRecords as FormArray;
                        for(let y of testingRecordsArr.controls) {
                          this.testingAlternateRecords = y.get('testingRecordsSourceSupply') as FormArray;
                          this.testingAlternateRecords.push(this.createValue(this.supplyValues.mainLoopImpedance,k.nominalVoltage,k.loopImpedance));
                        }
                    }
                    });
                  }
                }
              }
            }
          }
        }
        else {
          for(let i=0; i<this.incomingValues.ipaoInspection.length; i++) {
            if(this.incomingValues.ipaoInspection[i].locationCount == this.testList1.testing[i].locationCount) {
              if(this.incomingValues.ipaoInspection[i].consumerUnit.length 
                != this.testList1.testing[i].testDistRecords.length) {

                let testDistRecords:any=[];
                testDistRecords= this.testaccordianArr.controls[i].controls.testDistRecords as FormArray;

                  for(let k=this.testList1.testing[i].testDistRecords.length;
                    k<this.incomingValues.ipaoInspection[i].consumerUnit.length; k++) {
                     testDistRecords.push(this.createtestDistRecordsForm());            
                 }

              for(let j=this.testList1.testing[i].testDistRecords.length ;
                j<this.incomingValues.ipaoInspection[i].consumerUnit.length; j++) {
                   
                
                this.testaccordianArr.controls[i].controls.testDistRecords.controls[j].
                controls.locationCount.setValue(this.incomingValues.ipaoInspection[i].consumerUnit[j].locationCount);
    
                this.testaccordianArr.controls[i].controls.testDistRecords.controls[j].controls.testDistribution.controls[0].
                controls.distributionBoardDetails.setValue(this.incomingValues.ipaoInspection[i].consumerUnit[j].distributionBoardDetails);
                
                this.testaccordianArr.controls[i].controls.testDistRecords.controls[j].controls.testDistribution.controls[0].
                controls.referance.setValue(this.incomingValues.ipaoInspection[i].consumerUnit[j].referance);
    
                this.testaccordianArr.controls[i].controls.testDistRecords.controls[j].controls.testDistribution.controls[0].
                controls.location.setValue(this.incomingValues.ipaoInspection[i].consumerUnit[j].location);

                this.supplyCharacteristicsService.retrieveSupplyCharacteristics(this.email, this.service.siteCount).subscribe(
                  data=>{
                  this.supplyValues = JSON.parse(data);
                  for(let k of this.supplyValues.supplyParameters) {                  
                      let testingRecordsArr = this.testaccordianArr.controls[i].controls.testDistRecords.controls[j].controls.testingRecords as FormArray;
                      for(let y of testingRecordsArr.controls) {
                        this.testingAlternateRecords = y.get('testingRecordsSourceSupply') as FormArray;
                        this.testingAlternateRecords.push(this.createValue(this.supplyValues.mainLoopImpedance,k.nominalVoltage,k.loopImpedance));
                      }
                  }
                  });
                }
              }
            }
          }
        }
      }, 3000);	
      } 
    )
  }
  //comments section starts

  populateDataComments() {
    this.hideShowComment = true;
    this.reportViewerCommentArr = [];
    this.completedCommentArr3 = [];
    this.completedCommentArr4 = [];
    this.arrViewer = [];
    this.completedCommentArr1 = this.testingForm.get('completedCommentArr1') as FormArray;
    for (let value of this.testList.testingReport.testingComment) {
      this.arrViewer = [];
      if (this.currentUser1.role == 'Inspector') { //Inspector
        if (value.approveOrReject == 'APPROVED') {
          this.completedComments = true;
          this.enabledViewer = true;
          for (let j of this.testList.testingReport.testingComment) {
            if (value.noOfComment == j.noOfComment) {
              this.completedCommentArr3.push(j);
            }
          }
          this.completedCommentArr4.push(this.addItem1(this.completedCommentArr3));
          this.completedCommentArr3 = [];
        }
        for (let j of this.testList.testingReport.testingComment) {
          if ((j.approveOrReject == 'REJECT' || j.approveOrReject == '' || j.approveOrReject == null) && j.viewerFlag == 1) {
            this.arrViewer.push(this.createCommentGroup(j));
          }
          else if (j.approveOrReject == 'APPROVED') {
            this.arrViewer = [];
          }
        }
        this.enabledRequest = false;
        this.SendReply = false;
        if (value.viewerFlag == '1') {
          if (value.inspectorFlag == '0') {
            this.basic.notification(1, value.viewerUserName, value.inspectorUserName, value.viewerDate, value.inspectorDate);
          }
          else {
            this.basic.notification(0, value.viewerUserName, value.inspectorUserName, value.viewerDate, value.inspectorDate);
          }
          this.hideCommentSection = false;
          this.SendReply = false;
          this.replyCommentBox = true;
          // this.showReplyBox=true;
          if (value.inspectorFlag == '1') {
            this.enabled = true;
            this.hideAsViewerLogin = false;
            this.enabledViewer = true;
          }
          else {
            this.enabled = false;
            this.hideAsViewerLogin = true;
            this.enabledViewer = true;
          }
        }
        this.hideAdd = false;
        this.hideapprove = false;
        this.hideReject = false;
        // this.reportViewerCommentArr.push(this.createCommentGroup(value));
        // this.testingForm.setControl('viewerCommentArr', this.formBuilder.array(this.reportViewerCommentArr || []))
      }

      //Viewer starts
      else {
        if (value.inspectorFlag == '1') {
          if (value.approveOrReject == 'APPROVED') {
            if (value.viewerFlag == '1' && value.inspectorFlag == '1') {
              this.basic.notification(0, value.viewerUserName, value.inspectorUserName, value.viewerDate, value.inspectorDate);
            }
            this.completedComments = true;
            this.enabledViewer = true;
            for (let j of this.testList.testingReport.testingComment) {
              if (value.noOfComment == j.noOfComment) {
                this.completedCommentArr3.push(j);
              }
            }
            this.completedCommentArr4.push(this.addItem1(this.completedCommentArr3));
            this.completedCommentArr3 = [];
          }

          else { //reject & null
            this.enabledViewer = true;
            if (value.viewerFlag == '1' && value.inspectorFlag == '1') {
              if (value.approveOrReject == '') {

                this.basic.notification(1, value.viewerUserName, value.inspectorUserName, value.viewerDate, value.inspectorDate);
              }
            }
            if (this.testList.testingReport.testingComment.length < 1) {
              this.reportViewerCommentArr.push(this.addCommentViewer());
              this.testingForm.setControl('viewerCommentArr', this.formBuilder.array(this.reportViewerCommentArr || []));
            }
            else {
              if (value.viewerFlag == '1' && value.inspectorFlag == '1') {
                if (value.approveOrReject == '') {

                  this.basic.notification(1, value.viewerUserName, value.inspectorUserName, value.viewerDate, value.inspectorDate);
                }
              }
              this.enabled = true;
              this.enabledRequest = false;
              this.hideAdd = false;
              this.addReject = true;
              this.hideapprove = true;
              this.hideReject = true;
              // this.hideDelete=true;
              this.reportViewerCommentArr.push(this.createCommentGroup(value));
              this.testingForm.setControl('viewerCommentArr', this.formBuilder.array(this.reportViewerCommentArr || []))
            }
            this.hideCommentSection = true;
            this.hideAsViewerLogin = false;
            this.replyCommentBox = true;
            // this.hideAdd=false;
            // this.hideapprove=false;
            // this.hideReject=false;
            this.SendReply = false;
            this.sendComment = true;
            //this.hideDelete=true;
          }
          this.hideCommentSection = true;
          this.sendComment = true;
          this.hideRefresh = false;
          this.replyCommentBox = true;
          this.hideAdd = false;
        }
        else {
          //need to change
          if (value.viewerFlag == '1') {
            this.enabledViewer = true;
            this.sendComment = false;
            this.replyCommentBox = true;
            this.disableSend = true;
          }
          else {
            this.enabledViewer = false;
            this.sendComment = true;
            this.replyCommentBox = true;
          }
          this.reportViewerCommentArr.push(this.createCommentGroup(value));
          this.testingForm.setControl('viewerCommentArr', this.formBuilder.array(this.reportViewerCommentArr || []))
          this.reportViewerCommentArr = [];
          this.hideCommentSection = true;
          // this.sendComment=true;
          this.hideRefresh = false;

          //this.replyCommentBox=true;
          this.hideAdd = false;
          this.hideapprove = false;
          this.hideReject = false;
          //this.showReplyBox=true;
          this.enabledViewer = true;
        }
        for (let j of this.testList.testingReport.testingComment) {
          if (j.approveOrReject == 'REJECT' || j.approveOrReject == '' || j.approveOrReject == null) {
            this.arrViewer.push(this.createCommentGroup(j));
          }
          else if (j.approveOrReject == 'APPROVED') {
            this.arrViewer = [];
          }
        }
      }
    }
    if (this.currentUser1.role == 'Inspector') {
      if (this.arrViewer.length == 0) {
        this.hideCommentSection = false;
      }
    }
    else {
      if (this.arrViewer.length == 0) {
        this.arrViewer.push(this.addCommentViewer());
      }
    }
    this.testingForm.setControl('viewerCommentArr', this.formBuilder.array(this.arrViewer || []))
    this.testingForm.setControl('completedCommentArr1', this.formBuilder.array(this.completedCommentArr4 || []));
  }
  getViewerFirstMessage(x: any) {
    return x.controls.completedCommentArr.controls[0].controls.viewerComments.value;
  }
  showHideAccordion(index: number) {
    this.expandedIndexx = index === this.expandedIndexx ? -1 : index;
    this.isClicked[index] = !this.isClicked[index];
  }
  createCommentGroup(value: any): FormGroup {
    return this.formBuilder.group({
      viewerDateTime: new FormControl({ disabled: false, value: value.viewerDate }),
      inspectorUserName: new FormControl({ disabled: false, value: value.inspectorUserName }),
      viewerUserName: new FormControl({ disabled: false, value: value.viewerUserName }),
      inspectorDateTime: new FormControl({ disabled: false, value: value.inspectorDate }),
      approveOrReject: new FormControl({ disabled: this.enabledRequest, value: value.approveOrReject }),
      commentId: new FormControl({ disabled: false, value: value.commentsId }),
      viewerComments: new FormControl({ disabled: value.viewerFlag != 0, value: value.viewerComment }),
      inspectorComments: new FormControl({ disabled: value.inspectorFlag != 0, value: value.inspectorComment }),
    });
  }
  toggle(index: any) {
    this.replyCommentBox = false;
    this.isShowing = false;
    this.isExpanded = false;
  }
  replyToViewerComment(a: any) {
    this.commentId = a.value.commentId;
    this.replyCommentBox = true;
    this.hideAsViewerLogin = false;
    this.hideapproveIcon = false;
    this.hideRejectIcon = false;
    this.SendReply = true;
    this.showReplyBox = true;
    this.toggleHideShow = true;
  }
  sendViewerComment(a: any) {
    this.comments.userName = this.email;
    // this.comments.commentsId = this.step1Form.controls.viewerCommentArr.value[0].commentId;
    this.comments.commentsId = a.value.commentId;
    this.comments.viewerComment = a.value.viewerComments;
    this.comments.approveOrReject = '';
    this.testingService.sendComments(this.comments, this.testingDetails.siteId).subscribe(
      (data) => {
        this.commentSuccess = true;
        setTimeout(() => {
          this.commentSuccess = false;
        }, 3000);
        this.disableSend = true;
        this.hideDelete = false;
      },
      (error) => {
      }
    )
  }
  inspectorComment(a: any) {
    this.comments.userName = this.email;
    this.comments.commentsId = a.value.commentId;
    this.comments.inspectorComment = a.value.inspectorComments;
    this.testingService.replyComments(this.comments, this.testingDetails.siteId).subscribe(
      (data) => {
        this.commentSuccess = true;
        setTimeout(() => {
          this.commentSuccess = false;
        }, 3000);
        this.disableReply = true;
        this.basic.newNotify();
        //this.basic.notification(0,'viewerUserName','inspectorUserName','viewerDate','inspectorDate');
      },
      (error) => {
      }
    )
  }
  approveComment(a: any) {
    a.value.approveOrReject = 'APPROVED';
    this.enabledRequest = true;
    this.comments.userName = this.email;
    this.comments.commentsId = a.value.commentId;
    this.comments.approveOrReject = 'APPROVED';
    this.testingService.approveRejectComments(this.comments, this.testingDetails.siteId).subscribe(
      (data) => {
        this.commentApprove = true;
        setTimeout(() => {
          this.commentApprove = false;
          this.refreshCommentSection();
          this.toggleHideShow = false;
        }, 3000);
        this.hideReject = false;
        this.hideRejectIcon = false;
        this.hideAdd = false;
        this.hideRefresh = true;
        this.basic.newNotify();
        //this.basic.notification(0,'viewerUserName','inspectorUserName','viewerDate','inspectorDate');
      },
      (error) => {
      }
    )
    //  this.refreshComment('success');
  }
  rejectComment(a: any) {
    a.value.approveOrReject = 'REJECT';
    this.addReject = true;
    this.hideAdd = true;
    this.enabledRequest = true;
    // this.completedComments=false;
    this.comments.userName = this.email;
    this.comments.commentsId = a.value.commentId;
    this.comments.approveOrReject = 'REJECT';
    this.testingService.approveRejectComments(this.comments, this.testingDetails.siteId).subscribe(
      (data) => {
        this.commentReject = true;
        setTimeout(() => {
          this.commentReject = false;
        }, 3000);
        this.hideapprove = false;
        this.hideapproveIcon = false;
        this.basic.newNotify();
        //this.basic.notification(0,'viewerUserName','inspectorUserName','viewerDate','inspectorDate');
      },
      (error) => {
      }
    )
  }
  addAnotherviewerComment() {
    this.hideAdd = false;
    this.addReject = false;
    this.SendReply = false;
    this.sendComment = true;
    this.toggleHideShow = true;
    this.showSend = false;
    this.hideapprove = false;
    this.hideReject = true;
    this.hideInspText = false;
    this.viewerCommentArr = this.testingForm.get('viewerCommentArr') as FormArray;
    this.viewerCommentArr.push(this.addCommentViewer());
    this.hideDelete = true;
  }
  addCommentViewer() {
    return this.formBuilder.group({
      viewerComments: [''],
      inspectorComments: [''],
      approveFlag: [false]
    });
  }
  addCommentViewerApprove() {
    return this.formBuilder.group({
      viewerComments: [''],
      inspectorComments: [''],
      approveFlag: [true]
    });
  }
  ViewerRemoveComment(index: any) {
    this.hideAdd = true;
    // this.toggleHideShow=false;
    this.showSend = true;
    this.hideapprove = false;
    this.hideReject = true;
    this.sendComment = false;

    (this.testingForm.get('viewerCommentArr') as FormArray).removeAt(index);
  }

  getViewerCommentControls(): AbstractControl[] {
    return (<FormArray>this.testingForm.get('viewerCommentArr')).controls;
  }
  getCompletedCommentControls1(): AbstractControl[] {
    return (<FormArray>this.testingForm.get('completedCommentArr1')).controls;
  }
  getCompletedCommentControls(form: any) {
    return form.controls.completedCommentArr?.controls;
  }
  refreshCommentSection() {
    this.spinner = true;
    this.cardBodyComments = false;
    this.siteService.retrieveFinal(this.savedUserName, this.testingDetails.siteId).subscribe(
      (data) => {
        this.commentDataArr = JSON.parse(data);
        this.testList.testingReport.testingComment = this.commentDataArr.testingReport.testingComment;
        this.populateDataComments();
        setTimeout(() => {
          this.spinner = false;
          this.cardBodyComments = true;
        }, 2000);

        this.showReplyBox = false;
        this.disableReply = false;
        this.disableSend = false;
      },
      (error) => {

      })
  }
  addItem1(item: any): FormGroup {
    return this.formBuilder.group({
      completedCommentArr: this.formBuilder.array(this.completedComm(item)),
    });
  }
  completedComm(item: any) {
    this.completedCommentArr5 = [];
    for (let l of item) {
      this.completedCommentArr5.push(this.createCompletedCommentGroup(l));
    }
    return this.completedCommentArr5;
  }
  createCompletedCommentGroup(value: any): FormGroup {
    return this.formBuilder.group({
      viewerDateTime: new FormControl({ disabled: false, value: value.viewerDate }),
      inspectorDateTime: new FormControl({ disabled: false, value: value.inspectorDate }),
      inspectorUserName: new FormControl({ disabled: false, value: value.inspectorUserName }),
      viewerUserName: new FormControl({ disabled: false, value: value.viewerUserName }),
      commentId: new FormControl({ disabled: false, value: value.commentsId }),
      viewerComments: new FormControl({ disabled: true, value: value.viewerComment }),
      inspectorComments: new FormControl({ disabled: true, value: value.inspectorComment }),
    });
  }
  //comments section ends

   populateData(value:any) {	
    this.arr = [];	
    for (let item of value.testing) {	
      this.arr.push(this.createGroup(item));	
    }	
    this.testingForm.setControl('testaccordianArr', this.formBuilder.array(this.arr || []))
  }
 
  createGroup(item: any): FormGroup {
    return this.formBuilder.group({
      testingId: new FormControl({ disabled: false, value: item.testingId }),
      locationNumber: new FormControl({ disabled: false, value: item.locationNumber }),
      locationName: new FormControl({ disabled: false, value: item.locationName }),
      locationCount: new FormControl({ disabled: false, value: item.locationCount }),
      testEngineerName: new FormControl({ disabled: false, value: item.testEngineerName },[Validators.required]),
      date: new FormControl({ disabled: false, value: item.date },[Validators.required]),
      companyName: new FormControl({ disabled: false, value: item.companyName },[Validators.required]),
      designation: new FormControl({ disabled: false, value: item.designation },[Validators.required]),
      // detailsTestInstrument: new FormControl({ disabled: false, value: item.detailsTestInstrument }),
      // continuity: new FormControl({ disabled: false, value: item.continuity }),
      // insulationResisance: new FormControl({ disabled: false, value: item.insulationResisance }),
      // impedance: new FormControl({ disabled: false, value: item.impedance }),
      // rcd: new FormControl({ disabled: false, value: item.rcd }),
      // earthElectrodeResistance: new FormControl({ disabled: false, value: item.earthElectrodeResistance }),
      testingEquipment: this.formBuilder.array(this.populateTestInstrumentForm(item.testingEquipment,item.testingId)),
      testDistRecords: this.formBuilder.array(this.populateTestDistRecordsForm(item.testDistRecords,item.testingId)),
    
      testingStatus: new FormControl(item.testingStatus),
    });
  }
  private populateTestInstrumentForm(testEquipmentItem: any,testingId: any) {
    let testingEquipmentArr = [];
    for (let item of testEquipmentItem) {
      testingEquipmentArr.push(this.pushTestEquipmentTable(item,testingId))
    }
    return testingEquipmentArr;
  }

  private populateTestDistRecordsForm(testDistRecordsItem: any,testingId: any) {
    let testDistRecordsItemArr = [];
    for (let item of testDistRecordsItem) {
      testDistRecordsItemArr.push(this.pushTestDistRecordsTable(item,testingId))
    }
    return testDistRecordsItemArr;
  }
  
  pushTestEquipmentTable(testingEquipmentItem: any,testingId: any): FormGroup {
    let latest_date =this.datepipe.transform(testingEquipmentItem.equipmentCalibrationDueDate, 'yyyy-MM-dd');
    return new FormGroup({
      testingId: new FormControl({ disabled: false, value: testingId }),
      equipmentId: new FormControl({ disabled: false, value: testingEquipmentItem.equipmentId }),
      equipmentName: new FormControl({ disabled: false, value: testingEquipmentItem.equipmentName },[Validators.required]),
      equipmentMake: new FormControl({ disabled: false, value: testingEquipmentItem.equipmentMake },[Validators.required]),
      equipmentModel: new FormControl({ disabled: false, value: testingEquipmentItem.equipmentModel },[Validators.required]),
      equipmentSerialNo: new FormControl({ disabled: false, value: testingEquipmentItem.equipmentSerialNo },[Validators.required]),
      equipmentCalibrationDueDate: new FormControl({ disabled: false, value: latest_date },[Validators.required]),
      testingEquipmentStatus: new FormControl(testingEquipmentItem.testingEquipmentStatus),
    });
  }

  pushTestDistRecordsTable(testDistRecordsItem: any,testingId: any): FormGroup {
    return new FormGroup({
      testDistRecordId: new FormControl({disabled: false, value: testDistRecordsItem.testDistRecordId }),
      testingId: new FormControl({ disabled: false, value: testingId }),
      locationCount: new FormControl({disabled: false, value: testDistRecordsItem.locationCount }),
      testDistribution: this.formBuilder.array([this.populateTestDistributionForm(testDistRecordsItem.testDistribution)]),
      testingRecords: this.formBuilder.array(this.populateTestRecordsForm(testDistRecordsItem.testingRecords,testDistRecordsItem.testDistRecordId,testingId)),
      testingInnerObservation: this.formBuilder.array(this.pushTestObservationRecord(testDistRecordsItem.testingInnerObservation,testDistRecordsItem.testDistRecordId,testingId)),

      testDistRecordStatus: new FormControl(testDistRecordsItem.testDistRecordStatus),
    });
  }
  
pushTestObservationRecord(testInnerObservationItem: any,testDistRecordId: any,testingId: any) {
  let testingInnerObservation = [];
  for (let item of testInnerObservationItem) {
    testingInnerObservation.push(this.pushTestingInnerObservationTable(item,testDistRecordId,testingId))
  
    if(item.observationDescription!=null && item.observationDescription!=undefined && item.observationDescription!=''){
      this.service.observationGlowTesting=true;
     }
  }
  return testingInnerObservation;
}
private pushTestingInnerObservationTable(item: any,testDistRecordId: any,testingId: any): FormGroup {
  return new FormGroup({
    testDistRecordId: new FormControl({ disabled: false, value: testDistRecordId }),
    testingId: new FormControl({ disabled: false, value: testingId }),
    testingInnerObervationsId: new FormControl({disabled: false, value: item.testingInnerObervationsId}),
    observationComponentDetails: new FormControl({disabled: false, value: item.observationComponentDetails}),
    observationDescription: new FormControl({disabled: false, value: item.observationDescription}),
    testingInnerObservationStatus: new FormControl(item.testingInnerObservationStatus),
  });
}

  private populateTestDistributionForm(testDistributionItem: any): FormGroup {
    //this.changeSource(testDistributionItem[0].sourceFromSupply,c);
    for(let p of this.pushJsonArray){
      if(p.sourceFromSupply==testDistributionItem[0].sourceFromSupply){
        this.tempArr=p;
      }
    }
    return new FormGroup({
      distributionId: new FormControl({ disabled: false, value: testDistributionItem[0].distributionId }),
      distributionBoardDetails: new FormControl({ disabled: false, value: testDistributionItem[0].distributionBoardDetails }),
      referance: new FormControl({ disabled: false, value: testDistributionItem[0].referance }),
      location: new FormControl({ disabled: false, value: testDistributionItem[0].location }),
      correctSupplyPolarity: new FormControl({ disabled: false, value: testDistributionItem[0].correctSupplyPolarity },[Validators.required]),
      numOutputCircuitsUse: new FormControl({ disabled: false, value: testDistributionItem[0].numOutputCircuitsUse },[Validators.required,Validators.min(1)]),
      ratingsAmps: new FormControl({ disabled: false, value: testDistributionItem[0].ratingsAmps },[Validators.required]),
      sourceFromSupply: new FormControl({ disabled: false, value: testDistributionItem[0].sourceFromSupply },[Validators.required]),
      rateArr: this.formBuilder.array(this.populateRating(testDistributionItem[0].ratingsAmps)),
      numOutputCircuitsSpare: new FormControl({ disabled: false, value: testDistributionItem[0].numOutputCircuitsSpare },[Validators.required]),
      installedEquipmentVulnarable: new FormControl({ disabled: false, value: testDistributionItem[0].installedEquipmentVulnarable },[Validators.required]),
      incomingVoltage: new FormControl({ disabled: false, value: testDistributionItem[0].incomingVoltage }),
      incomingLoopImpedance: new FormControl({ disabled: false, value: testDistributionItem[0].incomingLoopImpedance }),
      incomingFaultCurrent: new FormControl({ disabled: false, value: testDistributionItem[0].incomingFaultCurrent }),
      incomingActualLoad: new FormControl({ disabled: false, value: testDistributionItem[0].incomingActualLoad }),
      distributionIncomingValueArr: this.formBuilder.array([
        this.populatedistributionIncomingValue(this.tempArr.incomingVoltage,this.tempArr.incomingLoopImpedance,this.tempArr.incomingFaultCurrent,this.tempArr.incomingActualLoad),
      ]),
      distributionIncomingValueArr2: this.formBuilder.array([
        this.populatedistributionIncomingValue(this.tempArr.incomingVoltage,this.tempArr.incomingLoopImpedance,this.tempArr.incomingFaultCurrent,this.tempArr.incomingActualLoad),
      ]),
      // testingAlternateRecords: this.formBuilder.array([
      //   this.populatedistributionIncomingValue(this.tempArr.incomingVoltage,this.tempArr.incomingLoopImpedance,this.tempArr.incomingFaultCurrent,this.tempArr.incomingActualLoad),
      // ]),
    });
  }

  private populateRating(ratingAmps: any) {
    let ratingsAmpsArray = [];
    this.rateValueArr = [];
    ratingsAmpsArray = ratingAmps.split(",");
    for (let i = 0; i < ratingsAmpsArray.length; i++) {
      this.rateValueArr.push(this.populateratingAmps(ratingsAmpsArray[i]));
    }
    return this.rateValueArr;
    // this.testingForm.setControl('rateArr', this.formBuilder.array(this.rateValueArr || []))
  }
  private populateratingAmps(ratingsAmps: any): FormGroup {
    return new FormGroup({
      ratingsAmps: new FormControl({ disabled: false, value: ratingsAmps },[Validators.required]),
    });
  }

  //selected source dd from supply to testing
  changeSource(event: any,c:any) {
    this.formList = c.get('distributionIncomingValueArr') as FormArray;
    this.formList1 = c.get('distributionIncomingValueArr2') as FormArray;
   // this.formList2 = f.get('testingAlternateRecords') as FormArray;
    if(event.target != undefined) {
      this.changedValue = event.target.value;
    }
    else{
      this.changedValue = event;
    }
    for(let i=0; i < this.SourceList.length; i++){
      if(this.changedValue==this.SourceList[i]){
       this.currentIndex=i;
      }
    }
    if ( this.changedValue == 'Mains Incoming') {
      this.isHidden=true;
      this.service.testingTable = this.service.retrieveMainNominalVoltage;
    if(this.service.mainNominalVoltageValue!=""){
      this.formList.clear();
      this.formList.push(this.populatedistributionIncomingValue(this.service.mainNominalVoltageValue, this.service.mainLoopImpedanceValue,this.service.mainNominalCurrentValue, this.service.mainActualLoadValue));
      }
    }
    else {
      this.isHidden=false;
      if(this.changedValue == 'Alternate Source of Supply-' + this.currentIndex){
          this.nominalVoltageArr1 = [];
          this.nominalVoltageArr2 = [];
          this.nominalVoltageArr3 = [];
          this.nominalVoltageArr4 = [];

          this.nominalVoltageArr1 = this.service.nominalVoltageArr2[this.currentIndex-1].nominalVoltage.split(",");
          this.nominalVoltageArr2 = this.service.nominalVoltageArr2[this.currentIndex-1].loopImpedance.split(",");
          this.nominalVoltageArr3 = this.service.nominalVoltageArr2[this.currentIndex-1].faultCurrent.split(",");
          this.nominalVoltageArr4 = this.service.nominalVoltageArr2[this.currentIndex-1].actualLoad.split(",");

          this.alternateNominalArr = [];
          this.alternateNominalArr.push(this.nominalVoltageArr1,this.nominalVoltageArr2,this.nominalVoltageArr3, this.nominalVoltageArr4);
          this.formList1.clear();
          this.formList1.push(this.populatedistributionIncomingValue
            (this.service.nominalVoltageArr2[this.currentIndex-1].nominalVoltage, 
              this.service.nominalVoltageArr2[this.currentIndex-1].loopImpedance,
              this.service.nominalVoltageArr2[this.currentIndex-1].faultCurrent,
              this.service.nominalVoltageArr2[this.currentIndex-1].actualLoad));
        }
      this.service.testingTable2 = this.alternateNominalArr;
    }
  }

  private populatedistributionIncomingValue(incomingVoltage: any, incomingLoopImpedance: any, incomingFaultCurrent: any, incomingActualLoad:any): FormGroup {
    let incomingVoltageArray = [];
    let incomingLoopImpedanceArray = [];
    let incomingFaultCurrentArray = [];
    let incomingActualLoadArray=[];
    incomingVoltageArray = incomingVoltage.split(",");
    incomingLoopImpedanceArray = incomingLoopImpedance.split(",");
    incomingFaultCurrentArray = incomingFaultCurrent.split(",");
    incomingActualLoadArray= incomingActualLoad.split(",");
    let item = [];
    item.push(incomingVoltageArray, incomingLoopImpedanceArray, incomingFaultCurrentArray,incomingActualLoadArray);
    return new FormGroup({
      incomingVoltage1: new FormControl({ disabled: false, value: item[0][0] }),
      incomingVoltage2: new FormControl({ disabled: false, value: item[0][1] }),
      incomingVoltage3: new FormControl({ disabled: false, value: item[0][2] }),
      incomingVoltage4: new FormControl({ disabled: false, value: item[0][3] }),
      incomingVoltage5: new FormControl({ disabled: false, value: item[0][4] }),
      incomingVoltage6: new FormControl({ disabled: false, value: item[0][5] }),
      incomingVoltage7: new FormControl({ disabled: false, value: item[0][6] }),
      incomingVoltage8: new FormControl({ disabled: false, value: item[0][7] }),
      incomingVoltage9: new FormControl({ disabled: false, value: item[0][8] }),

      incomingZs1: new FormControl({ disabled: false, value: item[1][0] }),
      incomingZs2: new FormControl({ disabled: false, value: item[1][1] }),
      incomingZs3: new FormControl({ disabled: false, value: item[1][2] }),
      incomingZs4: new FormControl({ disabled: false, value: item[1][3] }),
      incomingZs5: new FormControl({ disabled: false, value: item[1][4] }),
      incomingZs6: new FormControl({ disabled: false, value: item[1][5] }),
      incomingZs7: new FormControl({ disabled: false, value: item[1][6] }),
      incomingZs8: new FormControl({ disabled: false, value: item[1][7] }),
      incomingZs9: new FormControl({ disabled: false, value: item[1][8] }),

      incomingIpf1: new FormControl({ disabled: false, value: item[2][0] }),
      incomingIpf2: new FormControl({ disabled: false, value: item[2][1] }),
      incomingIpf3: new FormControl({ disabled: false, value: item[2][2] }),
      incomingIpf4: new FormControl({ disabled: false, value: item[2][3] }),
      incomingIpf5: new FormControl({ disabled: false, value: item[2][4] }),
      incomingIpf6: new FormControl({ disabled: false, value: item[2][5] }),
      incomingIpf7: new FormControl({ disabled: false, value: item[2][6] }),
      incomingIpf8: new FormControl({ disabled: false, value: item[2][7] }),
      incomingIpf9: new FormControl({ disabled: false, value: item[2][8] }),

      actualLoadAl1: new FormControl({ disabled: false, value: item[3][0] }),
      actualLoadAl2: new FormControl({ disabled: false, value: item[3][1] }),
      actualLoadAl3: new FormControl({ disabled: false, value: item[3][2] }),
      actualLoadAl4: new FormControl({ disabled: false, value: item[3][3] }),
     
    });
  }
  private populateTestRecordsForm(testRecordsItem: any,testDistRecordId: any,testingId: any) {
    let disconnectionTimeArr = [];
    let testFaultCurrentArr = [];
    let testLoopImpedanceArr = [];
    let testVoltageArr = [];
    let insulationResistanceArr = [];
    this.testingRecordTableArr = [];

    for (let item of testRecordsItem) {
      disconnectionTimeArr = item.disconnectionTime.split(",");
      testFaultCurrentArr = item.testFaultCurrent.split(",");
      testLoopImpedanceArr = item.testLoopImpedance.split(",");
      testVoltageArr = item.testVoltage.split(",");
      insulationResistanceArr = item.insulationResistance.split(",");

      this.testingRecordTableArr.push(this.pushTestingTable(item, disconnectionTimeArr, testFaultCurrentArr, testLoopImpedanceArr, testVoltageArr, insulationResistanceArr,testDistRecordId,testingId))
    }
    // let item = [];
    // item.push(nominalVoltageAL,nominalFrequencyAL,faultCurrentAL,loopImpedanceAL,installedCapacityAL,actualLoadAL);
    return this.testingRecordTableArr
  }

  pushTestingTable(itemTestingValue: any, disconnectionTimeArr: any, testFaultCurrentArr: any, testLoopImpedanceArr: any, testVoltageArr: any, insulationResistanceArr: any, testDistRecordId: any, testingId: any): FormGroup {
    return new FormGroup({
      testDistRecordId: new FormControl({ disabled: false, value: testDistRecordId }),
      testingId: new FormControl({ disabled: false, value: testingId }),
      testingRecordId: new FormControl({ disabled: false, value: itemTestingValue.testingRecordId }),
      circuitNo: new FormControl({ disabled: false, value: itemTestingValue.circuitNo }),
      circuitDesc: new FormControl({ disabled: false, value: itemTestingValue.circuitDesc }),
      circuitMake: new FormControl({ disabled: false, value: itemTestingValue.circuitMake }),
      circuitStandardNo: new FormControl({ disabled: false, value: itemTestingValue.circuitStandardNo }),
      circuitType: new FormControl({ disabled: false, value: itemTestingValue.circuitType }),
      numberOfPoles: new FormControl({ disabled: false, value: itemTestingValue.numberOfPoles }),
      circuitCurrentCurve: new FormControl({ disabled: false, value: itemTestingValue.circuitCurrentCurve }),
      circuitRating: new FormControl({ disabled: false, value: itemTestingValue.circuitRating }),
      circuitBreakingCapacity: new FormControl({ disabled: false, value: itemTestingValue.circuitBreakingCapacity }),
      shortCircuitSetting: new FormControl({ disabled: false, value: itemTestingValue.shortCircuitSetting }),
      eFSetting: new FormControl({ disabled: false, value: itemTestingValue.eFSetting }),
      conductorInstallation: new FormControl({ disabled: false, value: itemTestingValue.conductorInstallation }),
      conductorPhase: new FormControl({ disabled: false, value: itemTestingValue.conductorPhase }),
      conductorNeutral: new FormControl({ disabled: false, value: itemTestingValue.conductorNeutral }),
      conductorPecpc: new FormControl({ disabled: false, value: itemTestingValue.conductorPecpc }),
      continutiyApproximateLength: new FormControl({ disabled: false, value: itemTestingValue.continutiyApproximateLength }),
      continutiyRR: new FormControl({ disabled: false, value: itemTestingValue.continutiyRR }),
      continutiyR: new FormControl({ disabled: false, value: itemTestingValue.continutiyR }),
      // continutiyLL: new FormControl({disabled: false,value: itemTestingValue.continutiyLL}),
      // continutiyLE: new FormControl({disabled: false,value: itemTestingValue.continutiyLE}),
      continutiyPolarity: new FormControl({ disabled: false, value: itemTestingValue.continutiyPolarity }),

      rycontinutiy: new FormControl({ disabled: false, value: insulationResistanceArr[0] }),
      rbcontinutiy: new FormControl({ disabled: false, value: insulationResistanceArr[1] }),
      ybcontinutiy: new FormControl({ disabled: false, value: insulationResistanceArr[2] }),
      rncontinutiy: new FormControl({ disabled: false, value: insulationResistanceArr[3] }),
      yncontinutiy: new FormControl({ disabled: false, value: insulationResistanceArr[4] }),
      bncontinutiy: new FormControl({ disabled: false, value: insulationResistanceArr[5] }),
      rpecontinutiy: new FormControl({ disabled: false, value: insulationResistanceArr[6] }),
      ypecontinutiy: new FormControl({ disabled: false, value: insulationResistanceArr[7] }),
      bpecontinutiy: new FormControl({ disabled: false, value: insulationResistanceArr[8] }),

      ryVoltage: new FormControl({ disabled: false, value: testVoltageArr[0] }),
      rbVoltage: new FormControl({ disabled: false, value: testVoltageArr[1] }),
      ybVoltage: new FormControl({ disabled: false, value: testVoltageArr[2] }),
      rnVoltage: new FormControl({ disabled: false, value: testVoltageArr[3] }),
      ynVoltage: new FormControl({ disabled: false, value: testVoltageArr[4] }),
      bnVoltage: new FormControl({ disabled: false, value: testVoltageArr[5] }),
      rpeVoltage: new FormControl({ disabled: false, value: testVoltageArr[6] }),
      ypeVoltage: new FormControl({ disabled: false, value: testVoltageArr[7] }),
      bpeVoltage: new FormControl({ disabled: false, value: testVoltageArr[8] }),

      ryLoopImpedance: new FormControl({ disabled: false, value: testLoopImpedanceArr[0] }),
      rbLoopImpedance: new FormControl({ disabled: false, value: testLoopImpedanceArr[1] }),
      ybLoopImpedance: new FormControl({ disabled: false, value: testLoopImpedanceArr[2] }),
      rnLoopImpedance: new FormControl({ disabled: false, value: testLoopImpedanceArr[3] }),
      ynLoopImpedance: new FormControl({ disabled: false, value: testLoopImpedanceArr[4] }),
      bnLoopImpedance: new FormControl({ disabled: false, value: testLoopImpedanceArr[5] }),
      rpeLoopImpedance: new FormControl({ disabled: false, value: testLoopImpedanceArr[6] }),
      ypeLoopImpedance: new FormControl({ disabled: false, value: testLoopImpedanceArr[7] }),
      bpeLoopImpedance: new FormControl({ disabled: false, value: testLoopImpedanceArr[8] }),

      ryFaultCurrent: new FormControl({ disabled: false, value: testFaultCurrentArr[0] }),
      rbFaultCurrent: new FormControl({ disabled: false, value: testFaultCurrentArr[1] }),
      ybFaultCurrent: new FormControl({ disabled: false, value: testFaultCurrentArr[2] }),
      rnFaultCurrent: new FormControl({ disabled: false, value: testFaultCurrentArr[3] }),
      ynFaultCurrent: new FormControl({ disabled: false, value: testFaultCurrentArr[4] }),
      bnFaultCurrent: new FormControl({ disabled: false, value: testFaultCurrentArr[5] }),
      rpeFaultCurrent: new FormControl({ disabled: false, value: testFaultCurrentArr[6] }),
      ypeFaultCurrent: new FormControl({ disabled: false, value: testFaultCurrentArr[7] }),
      bpeFaultCurrent: new FormControl({ disabled: false, value: testFaultCurrentArr[8] }),

      ryDisconnect: new FormControl({ disabled: false, value: disconnectionTimeArr[0] }),
      rbDisconnect: new FormControl({ disabled: false, value: disconnectionTimeArr[1] }),
      ybDisconnect: new FormControl({ disabled: false, value: disconnectionTimeArr[2] }),
      rnDisconnect: new FormControl({ disabled: false, value: disconnectionTimeArr[3] }),
      ynDisconnect: new FormControl({ disabled: false, value: disconnectionTimeArr[4] }),
      bnDisconnect: new FormControl({ disabled: false, value: disconnectionTimeArr[5] }),
      rpeDisconnect: new FormControl({ disabled: false, value: disconnectionTimeArr[6] }),
      ypeDisconnect: new FormControl({ disabled: false, value: disconnectionTimeArr[7] }),
      bpeDisconnect: new FormControl({ disabled: false, value: disconnectionTimeArr[8] }),

      insulationResistance: new FormControl({ disabled: false, value: itemTestingValue.insulationResistance }),
      testVoltage: new FormControl({ disabled: false, value: itemTestingValue.testVoltage }),
      testLoopImpedance: new FormControl({ disabled: false, value: itemTestingValue.testLoopImpedance }),
      testFaultCurrent: new FormControl({ disabled: false, value: itemTestingValue.testFaultCurrent }),
      disconnectionTime: new FormControl({ disabled: false, value: itemTestingValue.disconnectionTime }),
      rcdType: new FormControl({ disabled: false, value: itemTestingValue.rcdType }),
      rcdCurrent: new FormControl({ disabled: false, value: itemTestingValue.rcdCurrent }),
      rcdOperatingCurrent: new FormControl({ disabled: false, value: itemTestingValue.rcdOperatingCurrent }),
      rcdOperatingFiveCurrent: new FormControl({ disabled: false, value: itemTestingValue.rcdOperatingFiveCurrent }),
      rcdTestButtonOperation: new FormControl({ disabled: false, value: itemTestingValue.rcdTestButtonOperation }),
      rcdRemarks: new FormControl({ disabled: false, value: itemTestingValue.rcdRemarks }),
      testingRecordsSourceSupply: this.formBuilder.array(this.populateTestSourceSupplyForm(itemTestingValue)),
      testingRecordStatus: new FormControl(itemTestingValue.testingRecordStatus),

    });
  }
  populateTestSourceSupplyForm(itemTestingValue: any) {
    let disconnectionTimeArr1 = [];
    let testFaultCurrentArr1 = [];
    let testLoopImpedanceArr1 = [];
    let testVoltageArr1 = [];
   this.testingRecordTableArr1= [];
   
    for(let w of itemTestingValue.testingRecordsSourceSupply){
      disconnectionTimeArr1 = w.disconnectionTime.split(",");
      testFaultCurrentArr1 = w.testFaultCurrent.split(",");
      testLoopImpedanceArr1 = w.testLoopImpedance.split(",");
      testVoltageArr1 = w.testVoltage.split(",");

      this.testingRecordTableArr1.push(this.pushTestingSourceSupplyTable(w, disconnectionTimeArr1, testFaultCurrentArr1, testLoopImpedanceArr1, testVoltageArr1));
    }
    return this.testingRecordTableArr1;
  }
  pushTestingSourceSupplyTable(itemTestingValue: any, disconnectionTimeArr: any, testFaultCurrentArr: any, testLoopImpedanceArr: any, testVoltageArr: any): FormGroup {
    return new FormGroup({
      sourceSupplyId: new FormControl({ disabled: false, value: itemTestingValue.sourceSupplyId }),
      ryVoltage: new FormControl({ disabled: false, value: testVoltageArr[0] }),
      rbVoltage: new FormControl({ disabled: false, value: testVoltageArr[1] }),
      ybVoltage: new FormControl({ disabled: false, value: testVoltageArr[2] }),
      rnVoltage: new FormControl({ disabled: false, value: testVoltageArr[3] }),
      ynVoltage: new FormControl({ disabled: false, value: testVoltageArr[4] }),
      bnVoltage: new FormControl({ disabled: false, value: testVoltageArr[5] }),
      rpeVoltage: new FormControl({ disabled: false, value: testVoltageArr[6] }),
      ypeVoltage: new FormControl({ disabled: false, value: testVoltageArr[7] }),
      bpeVoltage: new FormControl({ disabled: false, value: testVoltageArr[8] }),

      ryLoopImpedance: new FormControl({ disabled: false, value: testLoopImpedanceArr[0] }),
      rbLoopImpedance: new FormControl({ disabled: false, value: testLoopImpedanceArr[1] }),
      ybLoopImpedance: new FormControl({ disabled: false, value: testLoopImpedanceArr[2] }),
      rnLoopImpedance: new FormControl({ disabled: false, value: testLoopImpedanceArr[3] }),
      ynLoopImpedance: new FormControl({ disabled: false, value: testLoopImpedanceArr[4] }),
      bnLoopImpedance: new FormControl({ disabled: false, value: testLoopImpedanceArr[5] }),
      rpeLoopImpedance: new FormControl({ disabled: false, value: testLoopImpedanceArr[6] }),
      ypeLoopImpedance: new FormControl({ disabled: false, value: testLoopImpedanceArr[7] }),
      bpeLoopImpedance: new FormControl({ disabled: false, value: testLoopImpedanceArr[8] }),

      ryFaultCurrent: new FormControl({ disabled: false, value: testFaultCurrentArr[0] }),
      rbFaultCurrent: new FormControl({ disabled: false, value: testFaultCurrentArr[1] }),
      ybFaultCurrent: new FormControl({ disabled: false, value: testFaultCurrentArr[2] }),
      rnFaultCurrent: new FormControl({ disabled: false, value: testFaultCurrentArr[3] }),
      ynFaultCurrent: new FormControl({ disabled: false, value: testFaultCurrentArr[4] }),
      bnFaultCurrent: new FormControl({ disabled: false, value: testFaultCurrentArr[5] }),
      rpeFaultCurrent: new FormControl({ disabled: false, value: testFaultCurrentArr[6] }),
      ypeFaultCurrent: new FormControl({ disabled: false, value: testFaultCurrentArr[7] }),
      bpeFaultCurrent: new FormControl({ disabled: false, value: testFaultCurrentArr[8] }),

      ryDisconnect: new FormControl({ disabled: false, value: disconnectionTimeArr[0] }),
      rbDisconnect: new FormControl({ disabled: false, value: disconnectionTimeArr[1] }),
      ybDisconnect: new FormControl({ disabled: false, value: disconnectionTimeArr[2] }),
      rnDisconnect: new FormControl({ disabled: false, value: disconnectionTimeArr[3] }),
      ynDisconnect: new FormControl({ disabled: false, value: disconnectionTimeArr[4] }),
      bnDisconnect: new FormControl({ disabled: false, value: disconnectionTimeArr[5] }),
      rpeDisconnect: new FormControl({ disabled: false, value: disconnectionTimeArr[6] }),
      ypeDisconnect: new FormControl({ disabled: false, value: disconnectionTimeArr[7] }),
      bpeDisconnect: new FormControl({ disabled: false, value: disconnectionTimeArr[8] }),

      testVoltage: new FormControl({ disabled: false, value: itemTestingValue.testVoltage }),
      testLoopImpedance: new FormControl({ disabled: false, value: itemTestingValue.testLoopImpedance }),
      testFaultCurrent: new FormControl({ disabled: false, value: itemTestingValue.testFaultCurrent }),
      disconnectionTime: new FormControl({ disabled: false, value: itemTestingValue.disconnectionTime })
     });
  }
  gettestInstrumentControls(form: any) {
    return form.controls.testingEquipment?.controls;
  }
  getdistributionIncomingValueControls(form: any) {
    return form.controls.distributionIncomingValueArr?.controls;
  }
  getdistributionIncomingValueControls2(form: any) {
    return form.controls.distributionIncomingValueArr2?.controls;
  }
  gettestDistributionFormControls(form: any) {
    return form.controls.testDistribution?.controls;
  }
  gettestDistRecordsFormControls(form: any) {
    return form.controls.testDistRecords?.controls;
  }
  gettestValueControls(form: any) {
    return form.controls.testingRecords?.controls;
  }
  gettestAlternateValueControls(form: any) {
    return form.controls.testingRecordsSourceSupply?.controls;
  }
  gettestrateFormControls(form: any) {
    return form.controls.rateArr?.controls;
  }
  getTestControls(): AbstractControl[] {
    return (<FormArray>this.testingForm.get('testaccordianArr')).controls;
  }

  private createtestDistributionForm(): FormGroup {
    return new FormGroup({
      distributionBoardDetails: new FormControl(''),
      referance: new FormControl(''),
      location: new FormControl(''),
      sourceFromSupply: new FormControl('', [Validators.required]),
      correctSupplyPolarity: new FormControl('', [Validators.required]),
      numOutputCircuitsUse: new FormControl('', [Validators.required,Validators.min(1)]),
      ratingsAmps: new FormControl(''),
      rateArr: this.formBuilder.array([this.ratingAmps()]),
      numOutputCircuitsSpare: new FormControl('', [Validators.required]),
      installedEquipmentVulnarable: new FormControl('', [Validators.required]),
      incomingVoltage: new FormControl(''),
      incomingLoopImpedance: new FormControl(''),
      incomingFaultCurrent: new FormControl(''),
      incomingActualLoad:new FormControl(''),
      distributionIncomingValueArr: this.formBuilder.array([
        this.distributionIncomingValue(),
      ]),
      distributionIncomingValueArr2: this.formBuilder.array([
        this.distributionIncomingValue(),
      ]),
      // testingAlternateRecords: this.formBuilder.array([
      //   this.distributionIncomingValue(),
      // ]),

    });
  }
  private createtestDistRecordsForm(): FormGroup {
    return new FormGroup({
      locationCount: new FormControl(''),
      testingId: new FormControl(''),
      testDistRecordId: new FormControl(''),
      testDistribution: this.formBuilder.array([
        this.createtestDistributionForm(),
      ]),
      testingInnerObservation: this.formBuilder.array([this.createObservationForm()]),
      testingRecords: this.formBuilder.array([this.createtestValueForm()]),
      testDistRecordStatus: new FormControl('A'),
    });
  }

  createObservationForm(): FormGroup {
    return new FormGroup({
      testDistRecordId: new FormControl(''),
      testingInnerObervationsId: new FormControl(''),
      testingId: new FormControl(''),
      observationComponentDetails: new FormControl(''),
      observationDescription: new FormControl(''),
      testingInnerObservationStatus: new FormControl('A'),
    })
  }

  createObservationForm1(testDistRecordId: any,testingId: any): FormGroup {
    return new FormGroup({
      testDistRecordId: new FormControl({ disabled: false, value: testDistRecordId }),
      testingInnerObervationsId: new FormControl(''),
      testingId: new FormControl({ disabled: false, value: testingId }),
      observationComponentDetails: new FormControl(''),
      observationDescription: new FormControl(''),
      testingInnerObservationStatus: new FormControl('A'),
    })
  }

  IncomingValue(): FormGroup {
    return new FormGroup({
      incomingDistributionId: new FormControl('1'),
      incomingVoltage: new FormControl('240'),
      incomingLoopImpedance: new FormControl('260'),
      incomingFaultCurrent: new FormControl('100'),
      incomingActualLoad: new FormControl('100'),
      sourceFromSupply: new FormControl('mains'),
    })
  }

  distributionIncomingValue(): FormGroup {
    return new FormGroup({
      incomingVoltage1: new FormControl(''),
      incomingVoltage2: new FormControl(''),
      incomingVoltage3: new FormControl(''),
      incomingVoltage4: new FormControl(''),
      incomingVoltage5: new FormControl(''),
      incomingVoltage6: new FormControl(''),
      incomingVoltage7: new FormControl(''),
      incomingVoltage8: new FormControl(''),
      incomingVoltage9: new FormControl(''),

      incomingZs1: new FormControl(''),
      incomingZs2: new FormControl(''),
      incomingZs3: new FormControl(''),
      incomingZs4: new FormControl(''),
      incomingZs5: new FormControl(''),
      incomingZs6: new FormControl(''),
      incomingZs7: new FormControl(''),
      incomingZs8: new FormControl(''),
      incomingZs9: new FormControl(''),

      incomingIpf1: new FormControl(''),
      incomingIpf2: new FormControl(''),
      incomingIpf3: new FormControl(''),
      incomingIpf4: new FormControl(''),
      incomingIpf5: new FormControl(''),
      incomingIpf6: new FormControl(''),
      incomingIpf7: new FormControl(''),
      incomingIpf8: new FormControl(''),
      incomingIpf9: new FormControl(''),

      actualLoadAl1: new FormControl(''),
      actualLoadAl2: new FormControl(''),
      actualLoadAl3: new FormControl(''),
      actualLoadAl4: new FormControl(''),
    });
  }
  ratingAmps(): FormGroup {
    return new FormGroup({
      ratingsAmps: new FormControl('', [Validators.required]),
    });
  }
  private createtestValueForm(): FormGroup {
    return new FormGroup({
      testingId: new FormControl(''),
      testingRecordId: new FormControl(''),
      testDistRecordId: new FormControl(''),
      circuitNo: new FormControl(''),
      circuitDesc: new FormControl(''),
      circuitMake: new FormControl(''),
      circuitStandardNo: new FormControl(''),
      circuitType: new FormControl(''),
      numberOfPoles: new FormControl(''),
      circuitCurrentCurve: new FormControl(''),
      circuitRating: new FormControl(''),
      circuitBreakingCapacity: new FormControl(''),
      shortCircuitSetting: new FormControl(''),
      eFSetting: new FormControl(''),
      conductorInstallation: new FormControl(''),
      conductorPhase: new FormControl(''),
      conductorNeutral: new FormControl(''),
      conductorPecpc: new FormControl(''),
      continutiyApproximateLength: new FormControl(''),
      continutiyRR: new FormControl(''),
      continutiyR: new FormControl(''),
      // continutiyLL: new FormControl(''),
      // continutiyLE: new FormControl(''),
      continutiyPolarity: new FormControl(''),
      rycontinutiy: new FormControl(''),
      rbcontinutiy: new FormControl(''),
      ybcontinutiy: new FormControl(''),
      rncontinutiy: new FormControl(''),
      yncontinutiy: new FormControl(''),
      bncontinutiy: new FormControl(''),
      rpecontinutiy: new FormControl(''),
      ypecontinutiy: new FormControl(''),
      bpecontinutiy: new FormControl(''),
      ryVoltage: new FormControl(''),
      rbVoltage: new FormControl(''),
      ybVoltage: new FormControl(''),
      rnVoltage: new FormControl(''),
      ynVoltage: new FormControl(''),
      bnVoltage: new FormControl(''),
      rpeVoltage: new FormControl(''),
      ypeVoltage: new FormControl(''),
      bpeVoltage: new FormControl(''),
      ryLoopImpedance: new FormControl(''),
      rbLoopImpedance: new FormControl(''),
      ybLoopImpedance: new FormControl(''),
      rnLoopImpedance: new FormControl(''),
      ynLoopImpedance: new FormControl(''),
      bnLoopImpedance: new FormControl(''),
      rpeLoopImpedance: new FormControl(''),
      ypeLoopImpedance: new FormControl(''),
      bpeLoopImpedance: new FormControl(''),
      ryFaultCurrent: new FormControl(''),
      rbFaultCurrent: new FormControl(''),
      ybFaultCurrent: new FormControl(''),
      rnFaultCurrent: new FormControl(''),
      ynFaultCurrent: new FormControl(''),
      bnFaultCurrent: new FormControl(''),
      rpeFaultCurrent: new FormControl(''),
      ypeFaultCurrent: new FormControl(''),
      bpeFaultCurrent: new FormControl(''),
      ryDisconnect: new FormControl(''),
      rbDisconnect: new FormControl(''),
      ybDisconnect: new FormControl(''),
      rnDisconnect: new FormControl(''),
      ynDisconnect: new FormControl(''),
      bnDisconnect: new FormControl(''),
      rpeDisconnect: new FormControl(''),
      ypeDisconnect: new FormControl(''),
      bpeDisconnect: new FormControl(''),
      testVoltage: new FormControl(''),
      insulationResistance: new FormControl(''),
      testLoopImpedance: new FormControl(''),
      testFaultCurrent: new FormControl(''),
      disconnectionTime: new FormControl(''),
      rcdType: new FormControl(''),
      rcdCurrent: new FormControl(''),
      rcdOperatingCurrent: new FormControl(''),
      rcdOperatingFiveCurrent: new FormControl(''),
      rcdTestButtonOperation: new FormControl(''),
      rcdRemarks: new FormControl(''),
      testingRecordsSourceSupply: this.formBuilder.array([
        // this.createValue(),
      ]),
      //observationArr: this.formBuilder.array([]),
      testingRecordStatus: new FormControl('A'),
    });
  }

  private createtestValuePushForm(value: any,testDistRecordId: any,testingId: any): FormGroup {
    return new FormGroup({
      testDistRecordId: new FormControl({ disabled: false, value: testDistRecordId }),
      testingId: new FormControl({ disabled: false, value: testingId }),
      testingRecordId: new FormControl(''),
      circuitNo: new FormControl(''),
      circuitDesc: new FormControl(''),
      circuitMake: new FormControl(''),
      circuitStandardNo: new FormControl(''),
      circuitType: new FormControl(''),
      numberOfPoles: new FormControl(''),
      circuitCurrentCurve: new FormControl(''),
      circuitRating: new FormControl(''),
      circuitBreakingCapacity: new FormControl(''),
      shortCircuitSetting: new FormControl(''),
      eFSetting: new FormControl(''),
      conductorInstallation: new FormControl(''),
      conductorPhase: new FormControl(''),
      conductorNeutral: new FormControl(''),
      conductorPecpc: new FormControl(''),
      continutiyApproximateLength: new FormControl(''),
      continutiyRR: new FormControl(''),
      continutiyR: new FormControl(''),
      // continutiyLL: new FormControl(''),
      // continutiyLE: new FormControl(''),
      continutiyPolarity: new FormControl(''),
      rycontinutiy: new FormControl(''),
      rbcontinutiy: new FormControl(''),
      ybcontinutiy: new FormControl(''),
      rncontinutiy: new FormControl(''),
      yncontinutiy: new FormControl(''),
      bncontinutiy: new FormControl(''),
      rpecontinutiy: new FormControl(''),
      ypecontinutiy: new FormControl(''),
      bpecontinutiy: new FormControl(''),
      ryVoltage: new FormControl(''),
      rbVoltage: new FormControl(''),
      ybVoltage: new FormControl(''),
      rnVoltage: new FormControl(''),
      ynVoltage: new FormControl(''),
      bnVoltage: new FormControl(''),
      rpeVoltage: new FormControl(''),
      ypeVoltage: new FormControl(''),
      bpeVoltage: new FormControl(''),
      ryLoopImpedance: new FormControl(''),
      rbLoopImpedance: new FormControl(''),
      ybLoopImpedance: new FormControl(''),
      rnLoopImpedance: new FormControl(''),
      ynLoopImpedance: new FormControl(''),
      bnLoopImpedance: new FormControl(''),
      rpeLoopImpedance: new FormControl(''),
      ypeLoopImpedance: new FormControl(''),
      bpeLoopImpedance: new FormControl(''),
      ryFaultCurrent: new FormControl(''),
      rbFaultCurrent: new FormControl(''),
      ybFaultCurrent: new FormControl(''),
      rnFaultCurrent: new FormControl(''),
      ynFaultCurrent: new FormControl(''),
      bnFaultCurrent: new FormControl(''),
      rpeFaultCurrent: new FormControl(''),
      ypeFaultCurrent: new FormControl(''),
      bpeFaultCurrent: new FormControl(''),
      ryDisconnect: new FormControl(''),
      rbDisconnect: new FormControl(''),
      ybDisconnect: new FormControl(''),
      rnDisconnect: new FormControl(''),
      ynDisconnect: new FormControl(''),
      bnDisconnect: new FormControl(''),
      rpeDisconnect: new FormControl(''),
      ypeDisconnect: new FormControl(''),
      bpeDisconnect: new FormControl(''),
      testVoltage: new FormControl(''),
      insulationResistance: new FormControl(''),
      testLoopImpedance: new FormControl(''),
      testFaultCurrent: new FormControl(''),
      disconnectionTime: new FormControl(''),
      rcdType: new FormControl(''),
      rcdCurrent: new FormControl(''),
      rcdOperatingCurrent: new FormControl(''),
      rcdOperatingFiveCurrent: new FormControl(''),
      rcdTestButtonOperation: new FormControl(''),
      rcdRemarks: new FormControl(''),
      testingRecordsSourceSupply: this.formBuilder.array(this.pushData(value)),
      testingRecordStatus: new FormControl('A'),
    });
  }

  private pushData(value: any) {
    this.testingAlternateRecords1 = [];
      for(let j of this.supplyValues.supplyParameters) {	
        if(j.aLLiveConductorType == "AC") {	  
          this.testingAlternateRecords1.push(this.createValue(this.supplyValues.mainLoopImpedance,j.nominalVoltage,j.loopImpedance));
        }
      }
  
    return this.testingAlternateRecords1;
  }
  
  private createValue(mainsLoopImpedance: any,voltage: any,loopImpedance: any): FormGroup {
    let mainsLoopImpedanceArr = [];
    let nominalVoltage = [];	
    let loopImpedanceArr = [];
    
    mainsLoopImpedanceArr = mainsLoopImpedance.split(",");
    nominalVoltage = voltage.split(",");	
    loopImpedanceArr = loopImpedance.split(",")
    return new FormGroup({
      
      ryVoltage: new FormControl(nominalVoltage[0]),
      rbVoltage: new FormControl(nominalVoltage[1]),
      ybVoltage: new FormControl(nominalVoltage[2]),
      rnVoltage: new FormControl(nominalVoltage[3]),
      ynVoltage: new FormControl(nominalVoltage[4]),
      bnVoltage: new FormControl(nominalVoltage[5]),
      rpeVoltage: new FormControl(nominalVoltage[6]),
      ypeVoltage: new FormControl(nominalVoltage[7]),
      bpeVoltage: new FormControl(nominalVoltage[8]),

      ryLoopImpedanceMains: new FormControl(mainsLoopImpedanceArr[0]),
      rbLoopImpedanceMains: new FormControl(mainsLoopImpedanceArr[1]),
      ybLoopImpedanceMains: new FormControl(mainsLoopImpedanceArr[2]),
      rnLoopImpedanceMains: new FormControl(mainsLoopImpedanceArr[3]),
      ynLoopImpedanceMains: new FormControl(mainsLoopImpedanceArr[4]),
      bnLoopImpedanceMains: new FormControl(mainsLoopImpedanceArr[5]),
      rpeLoopImpedanceMains: new FormControl(mainsLoopImpedanceArr[6]),
      ypeLoopImpedanceMains: new FormControl(mainsLoopImpedanceArr[7]),
      bpeLoopImpedanceMains: new FormControl(mainsLoopImpedanceArr[8]),

      ryLoopImpedanceExternal: new FormControl(loopImpedanceArr[0]),
      rbLoopImpedanceExternal: new FormControl(loopImpedanceArr[1]),
      ybLoopImpedanceExternal: new FormControl(loopImpedanceArr[2]),
      rnLoopImpedanceExternal: new FormControl(loopImpedanceArr[3]),
      ynLoopImpedanceExternal: new FormControl(loopImpedanceArr[4]),
      bnLoopImpedanceExternal: new FormControl(loopImpedanceArr[5]),
      rpeLoopImpedanceExternal: new FormControl(loopImpedanceArr[6]),
      ypeLoopImpedanceExternal: new FormControl(loopImpedanceArr[7]),
      bpeLoopImpedanceExternal: new FormControl(loopImpedanceArr[8]),

      ryLoopImpedance: new FormControl(''),
      rbLoopImpedance: new FormControl(''),
      ybLoopImpedance: new FormControl(''),
      rnLoopImpedance: new FormControl(''),
      ynLoopImpedance: new FormControl(''),
      bnLoopImpedance: new FormControl(''),
      rpeLoopImpedance: new FormControl(''),
      ypeLoopImpedance: new FormControl(''),
      bpeLoopImpedance: new FormControl(''),

      ryFaultCurrent: new FormControl(''),
      rbFaultCurrent: new FormControl(''),
      ybFaultCurrent: new FormControl(''),
      rnFaultCurrent: new FormControl(''),
      ynFaultCurrent: new FormControl(''),
      bnFaultCurrent: new FormControl(''),
      rpeFaultCurrent: new FormControl(''),
      ypeFaultCurrent: new FormControl(''),
      bpeFaultCurrent: new FormControl(''),

      ryDisconnect: new FormControl(''),
      rbDisconnect: new FormControl(''),
      ybDisconnect: new FormControl(''),
      rnDisconnect: new FormControl(''),
      ynDisconnect: new FormControl(''),
      bnDisconnect: new FormControl(''),
      rpeDisconnect: new FormControl(''),
      ypeDisconnect: new FormControl(''),
      bpeDisconnect: new FormControl(''),

      testVoltage: new FormControl(''),
      testLoopImpedance: new FormControl(''),
      testFaultCurrent: new FormControl(''),
      disconnectionTime: new FormControl(''),
    });
  }
  onChangeForm(event:any){
    if(!this.testingForm.invalid){
      if(this.testingForm.dirty){
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
   if(!this.testingForm.invalid){ 
    if(this.testingForm.dirty){
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
  // Dynamically iterate some fields
  onKey(event: KeyboardEvent, c: any, a: any) {
    this.values = (<HTMLInputElement>event.target).value;
    this.value = this.values;
    this.testingRecords = a.controls.testingRecords as FormArray;
    this.observationArr = a.controls.testingInnerObservation as FormArray;
    this.rateArr = c.controls.rateArr as FormArray;
    if (this.testingRecords.length == 0 && this.rateArr.length == 0) {
      if (this.value != '' && this.value != 0) {
        for (this.i = 1; this.i < this.value; this.i++) {
          this.testingRecords.push(this.createtestValuePushForm(this.testingRecords,a.controls.testDistRecordId.value,a.controls.testingId.value));
          this.observationArr.push(this.createObservationForm1(a.controls.testDistRecordId.value,a.controls.testingId.value));
          this.rateArr.push(this.ratingAmps());
        }
      }
    } 
    // else if (this.value == '') {
    //   this.loclength = this.testingRecords.length;
    //   this.loclength = this.rateArr.length;

    //   for (this.i = 1; this.i < this.loclength; this.i++) {
    //     this.testingRecords.removeAt(this.testingRecords.length - 1);
    //     this.rateArr.removeAt(this.rateArr.length - 1);
    //   }
    // } 
    else if (
      this.testingRecords.length < this.value &&
      this.rateArr.length < this.value
    ) {
      if (this.value != '' && this.value != 0) {
        this.delarr = this.value - this.testingRecords.length;
        this.delarr = this.value - this.rateArr.length;

        for (this.i = 0; this.i < this.delarr; this.i++) {
          this.testingRecords.push(this.createtestValuePushForm(this.testingRecords,a.controls.testDistRecordId.value,a.controls.testingId.value));
          this.observationArr.push(this.createObservationForm1(a.controls.testDistRecordId.value,a.controls.testingId.value));
          this.rateArr.push(this.ratingAmps());
        }
      }
    } else
      this.testingRecords.length > this.value &&
        this.rateArr.length > this.value;
    {
      if (this.value != '' && this.value != 0) {
        this.delarr = this.testingRecords.length - this.value;
        this.delarr = this.rateArr.length - this.value;

        for (this.i = 0; this.i < this.delarr; this.i++) {
          if(this.flag && this.testingRecords.value[this.testingRecords.length - 1].testingRecordId != 0 
              && this.testingRecords.value[this.testingRecords.length - 1].testingRecordId != '' 
               && this.testingRecords.value[this.testingRecords.length - 1].testingRecordId != undefined) {
                 this.testingRecords.value[this.testingRecords.length - 1].testingRecordStatus = 'R';
                 this.deletedTestingRecord.push(this.testingRecords.value[this.testingRecords.length - 1]);
               }
               if(this.flag && this.observationArr.value[this.observationArr.length - 1].testingInnerObervationsId != 0 
                && this.observationArr.value[this.observationArr.length - 1].testingInnerObervationsId != '' 
                 && this.observationArr.value[this.observationArr.length - 1].testingInnerObervationsId != undefined) {
                   this.observationArr.value[this.observationArr.length - 1].testingInnerObservationStatus = 'R';
                   this.deletedObservationArr.push(this.observationArr.value[this.observationArr.length - 1]);
                 }
          this.testingRecords.removeAt(this.testingRecords.length - 1);
          this.rateArr.removeAt(this.rateArr.length - 1);
          this.observationArr.removeAt(this.testingRecords.length - 1);
        }
      }
    }
  }
  removeItemRecords(a:any,i:any,f:any) {
    this.testingForm.markAsTouched();
    if(f.value.testingRecordId !=0  
       && f.value.testingRecordId !=undefined 
        && f.value.testingRecordId !='' 
         && f.value.testingRecordId !=null)
    {
      f.value.testingRecordStatus='R';
      this.deletedTestingRecord.push( a.controls.testingRecords.value[i]);
      a.controls.testingRecords.removeAt(i);
     // a.controls.testDistribution.value[0].numOutputCircuitsUse.value=a.controls.testDistribution.value[0].numOutputCircuitsUse.value - 1;
      a.controls.testDistribution.controls[0].controls.numOutputCircuitsUse.setValue(a.controls.testDistribution.controls[0].controls.numOutputCircuitsUse.value - 1);
      a.controls.testDistribution.controls[0].controls.rateArr.removeAt(i);
      this.testingForm.markAsDirty();
    }
    
    else
    {
      this.testingForm.markAsTouched();
      a.controls.testingRecords.removeAt(i);
     // a.controls.testDistribution.value[0].numOutputCircuitsUse.value=a.controls.testDistribution.value[0].numOutputCircuitsUse.value - 1;
     a.controls.testDistribution.controls[0].controls.numOutputCircuitsUse.setValue(a.controls.testDistribution.controls[0].controls.numOutputCircuitsUse.value - 1);
     a.controls.testDistribution.controls[0].controls.rateArr.removeAt(i);
     this.testingForm.markAsDirty();
    }
//for observation
    if(a.controls.testingInnerObservation.value[i].testingInnerObervationsId !=0  
      && a.controls.testingInnerObservation.value[i].testingInnerObervationsId !=undefined 
       && a.controls.testingInnerObservation.value[i].testingInnerObervationsId !='' 
        && a.controls.testingInnerObservation.value[i].testingInnerObervationsId !=null)
   {
    a.controls.testingInnerObservation.value[i].testingInnerObservationStatus='R';
     this.deletedObservationArr.push( a.controls.testingInnerObservation.value[i]);
     a.controls.testingInnerObservation.removeAt(i);
     this.testingForm.markAsDirty();
   }
   
   else
   {
     this.testingForm.markAsTouched();
     a.controls.testingInnerObservation.removeAt(i);
    this.testingForm.markAsDirty();
   }
   }
   
  createItem() {
    return this.formBuilder.group({
      testingId: [''],
      locationNumber: ['', Validators.required],
      locationName: ['', Validators.required],
      locationCount: [''],
      testEngineerName: ['', Validators.required],
      date: ['', Validators.required],
      companyName: ['', Validators.required],
      designation: ['', Validators.required],
      // detailsTestInstrument: ['', Validators.required],
      // continuity: ['', Validators.required],
      // insulationResisance: ['', Validators.required],
      // impedance: ['', Validators.required],
      // rcd: ['', Validators.required],
      // earthElectrodeResistance: ['', Validators.required],
      testingEquipment:this.formBuilder.array([
        this.createTestInstrumentForm(),
      ]),
      testDistRecords: this.formBuilder.array([
        this.createtestDistRecordsForm(),
      ]),
      testingStatus: ['A'],
    });
  }
  addDesigner(a:any) {
    this.testingEquipment = a.controls.testingEquipment as FormArray;
    this.testingEquipment.push(this.createTestInstrumentForm1(a.controls.testingId.value));
  }
  removeItem(a: any,j:any) {
    this.testingForm.markAsTouched();
    this.testingEquipment = a.controls.testingEquipment as FormArray;
    if(this.flag && this.testingEquipment.value[j].equipmentId!=null && this.testingEquipment.value[j].equipmentId!='' && this.testingEquipment.value[j].equipmentId!=undefined){
      this.testingEquipment.value[j].testingEquipmentStatus='R';
      this.deletedTestingEquipment.push(this.testingEquipment.value[j]);
    }
    this.testingEquipment.removeAt(j);
    this.testingForm.markAsDirty();
  }

  createTestInstrumentForm(): FormGroup {
    return new FormGroup({
      testingId: new FormControl(''),
      equipmentName: new FormControl('',[Validators.required]),
      equipmentId: new FormControl(''),
      equipmentMake: new FormControl('',[Validators.required]),
      equipmentModel: new FormControl('',[Validators.required]),
      equipmentSerialNo: new FormControl('',[Validators.required]),
      equipmentCalibrationDueDate: new FormControl('',[Validators.required]),
      testingEquipmentStatus: new FormControl('A'),
    });
  }

  createTestInstrumentForm1(testingId: any): FormGroup {
    return new FormGroup({
      testingId: new FormControl({ disabled: false, value: testingId }),
      equipmentName: new FormControl('',[Validators.required]),
      equipmentId: new FormControl(''),
      equipmentMake: new FormControl('',[Validators.required]),
      equipmentModel: new FormControl('',[Validators.required]),
      equipmentSerialNo: new FormControl('',[Validators.required]),
      equipmentCalibrationDueDate: new FormControl('',[Validators.required]),
      testingEquipmentStatus: new FormControl('A'),
    });
  }

  createtestDistribution(): FormGroup {
    return new FormGroup({
      distributionBoardDetails: new FormControl(''),
      referance: new FormControl(''),
      location: new FormControl(''),
      sourceFromSupply: new FormControl(''),
      correctSupplyPolarity: new FormControl(''),
      numOutputCircuitsUse: new FormControl(''),
      ratingsAmps: new FormControl(''),
      numOutputCircuitsSpare: new FormControl(''),
      installedEquipmentVulnarable: new FormControl(''),
      incomingVoltage: new FormControl(''),
      incomingLoopImpedance: new FormControl(''),
      incomingFaultCurrent: new FormControl(''),
      incomingActualLoad: new FormControl('')
    });
  }
  
  // addObservation(observationIter:any){
  //   if(this.ObservationsForm.touched || this.ObservationsForm.untouched){
  //     this.observationModalReference = this.modalService.open(observationIter, {
  //        centered: true, 
  //        size: 'md'
  //       })
  //    }

  // }

  addItem() {
    this.testaccordianArr = this.testingForm.get(
      'testaccordianArr'
    ) as FormArray;
    this.testaccordianArr.push(this.createItem());
  }

  removeAccordian(index: any) {
    (this.testingForm.get('testaccordianArr') as FormArray).removeAt(index);
  }
  get f(): any {
    return this.testingForm.controls;
  }
  // clickAcc(){
  //   this.gotoNextTab();
  // }
  onKeyVoltage1(event:KeyboardEvent,f:any){
    if(f.controls.ryVoltage.value!='' && f.controls.ryLoopImpedance.value!='' && f.controls.ryLoopImpedance.value!=undefined && f.controls.ryVoltage.value!=undefined && f.controls.ryVoltage.value!='NA' && f.controls.ryLoopImpedance.value!='NA'){
    //f.controls.ryFaultCurrent.value= f.controls.ryVoltage.value/f.controls.ryLoopImpedance.value; 
    var ryFaultCurrent= f.controls.ryVoltage.value/f.controls.ryLoopImpedance.value;	
    f.controls.ryFaultCurrent.value=ryFaultCurrent.toFixed(3);	
   }
   else if((f.controls.ryVoltage.value=='NA' && f.controls.ryLoopImpedance.value=='NA') || (f.controls.ryVoltage.value=='NA' || f.controls.ryLoopImpedance.value=='NA')){
     f.controls.ryFaultCurrent.value='NA';
    }
   else{
     f.controls.ryFaultCurrent.value='';
   }
   if(f.controls.rbVoltage.value!='' && f.controls.rbLoopImpedance.value!='' && f.controls.rbLoopImpedance.value!=undefined && f.controls.rbVoltage.value!=undefined && f.controls.rbVoltage.value!='NA' && f.controls.rbLoopImpedance.value!='NA'){
     //f.controls.rbFaultCurrent.value= f.controls.rbVoltage.value/f.controls.rbLoopImpedance.value;
     var rbFaultCurrent= f.controls.rbVoltage.value/f.controls.rbLoopImpedance.value;	
        f.controls.rbFaultCurrent.value=rbFaultCurrent.toFixed(3);	
    }
    else if((f.controls.rbVoltage.value=='NA' && f.controls.rbLoopImpedance.value=='NA') || (f.controls.rbVoltage.value=='NA' || f.controls.rbLoopImpedance.value=='NA')){
     f.controls.rbFaultCurrent.value='NA';
    }
    else{
      f.controls.rbFaultCurrent.value='';
    }
    if(f.controls.ybVoltage.value!='' && f.controls.ybLoopImpedance.value!='' && f.controls.ybLoopImpedance.value!=undefined && f.controls.ybVoltage.value!=undefined && f.controls.ybVoltage.value!='NA' && f.controls.ybLoopImpedance.value!='NA'){
     //f.controls.ybFaultCurrent.value= f.controls.ybVoltage.value/f.controls.ybLoopImpedance.value;
     var ybFaultCurrent= f.controls.ybVoltage.value/f.controls.ybLoopImpedance.value;	
        f.controls.ybFaultCurrent.value=ybFaultCurrent.toFixed(3);	
    }
    else if((f.controls.ybVoltage.value=='NA' && f.controls.ybLoopImpedance.value=='NA') || (f.controls.ybVoltage.value=='NA' || f.controls.ybLoopImpedance.value=='NA')){
     f.controls.ybFaultCurrent.value='NA';
    }
    else{
      f.controls.ybFaultCurrent.value='';
    }
    if(f.controls.rnVoltage.value!='' && f.controls.rnLoopImpedance.value!='' && f.controls.rnLoopImpedance.value!=undefined && f.controls.rnVoltage.value!=undefined && f.controls.rnVoltage.value!='NA' && f.controls.rnLoopImpedance.value!='NA'){
     //f.controls.rnFaultCurrent.value= f.controls.rnVoltage.value/f.controls.rnLoopImpedance.value;
     var rnFaultCurrent= f.controls.rnVoltage.value/f.controls.rnLoopImpedance.value;	
        f.controls.rnFaultCurrent.value=rnFaultCurrent.toFixed(3);	
    }
    else if((f.controls.rnVoltage.value=='NA' && f.controls.rnLoopImpedance.value=='NA') || (f.controls.rnVoltage.value=='NA' || f.controls.rnLoopImpedance.value=='NA')){
     f.controls.rnFaultCurrent.value='NA';
    }
    else{
      f.controls.rnFaultCurrent.value='';
    }
    if(f.controls.ynVoltage.value!='' && f.controls.ynLoopImpedance.value!='' && f.controls.ynLoopImpedance.value!=undefined && f.controls.ynVoltage.value!=undefined && f.controls.ynVoltage.value!='NA' && f.controls.ynLoopImpedance.value!='NA'){
     //f.controls.ynFaultCurrent.value= f.controls.ynVoltage.value/f.controls.ynLoopImpedance.value;
     var ynFaultCurrent= f.controls.ynVoltage.value/f.controls.ynLoopImpedance.value;	
        f.controls.ynFaultCurrent.value=ynFaultCurrent.toFixed(3);	
    }
    else if((f.controls.ynVoltage.value=='NA' && f.controls.ynLoopImpedance.value=='NA') || (f.controls.ynVoltage.value=='NA' || f.controls.ynLoopImpedance.value=='NA')){
     f.controls.ynFaultCurrent.value='NA';
    }
    else{
      f.controls.ynFaultCurrent.value='';
    }
    if(f.controls.bnVoltage.value!='' && f.controls.bnLoopImpedance.value!='' && f.controls.bnLoopImpedance.value!=undefined && f.controls.bnVoltage.value!=undefined && f.controls.bnVoltage.value!='NA' && f.controls.bnLoopImpedance.value!='NA'){
     //f.controls.bnFaultCurrent.value= f.controls.bnVoltage.value/f.controls.bnLoopImpedance.value;
     var bnFaultCurrent= f.controls.bnVoltage.value/f.controls.bnLoopImpedance.value;	
        f.controls.bnFaultCurrent.value=bnFaultCurrent.toFixed(3);	
    }
    else if((f.controls.bnVoltage.value=='NA' && f.controls.bnLoopImpedance.value=='NA') || (f.controls.bnVoltage.value=='NA' || f.controls.bnLoopImpedance.value=='NA')){
     f.controls.bnFaultCurrent.value='NA';
    }
    else{
      f.controls.bnFaultCurrent.value='';
    }
    if(f.controls.rpeVoltage.value!='' && f.controls.rpeLoopImpedance.value!='' && f.controls.rpeLoopImpedance.value!=undefined && f.controls.rpeVoltage.value!=undefined && f.controls.rpeVoltage.value!='NA' && f.controls.rpeLoopImpedance.value!='NA'){
     //f.controls.rpeFaultCurrent.value= f.controls.rpeVoltage.value/f.controls.rpeLoopImpedance.value;
     var rpeFaultCurrent= f.controls.rpeVoltage.value/f.controls.rpeLoopImpedance.value;	
        f.controls.rpeFaultCurrent.value=rpeFaultCurrent.toFixed(3);	
    }
    else if((f.controls.rpeVoltage.value=='NA' && f.controls.rpeLoopImpedance.value=='NA') || (f.controls.rpeVoltage.value=='NA' || f.controls.rpeLoopImpedance.value=='NA')){
     f.controls.rpeFaultCurrent.value='NA';
    }
    else{
      f.controls.rpeFaultCurrent.value='';
    }
    if(f.controls.ypeVoltage.value!='' && f.controls.ypeLoopImpedance.value!='' && f.controls.ypeVoltage.value!=undefined && f.controls.ypeVoltage.value!=undefined && f.controls.ypeVoltage.value!='NA' && f.controls.ypeLoopImpedance.value!='NA'){
     //f.controls.ypeFaultCurrent.value= f.controls.ypeVoltage.value/f.controls.ypeLoopImpedance.value;
     var ypeFaultCurrent= f.controls.ypeVoltage.value/f.controls.ypeLoopImpedance.value;	
        f.controls.ypeFaultCurrent.value=ypeFaultCurrent.toFixed(3);	
    }
    else if((f.controls.ypeVoltage.value=='NA' && f.controls.ypeLoopImpedance.value=='NA') || (f.controls.ypeVoltage.value=='NA' || f.controls.ypeLoopImpedance.value=='NA')){
     f.controls.ypeFaultCurrent.value='NA';
    }
    else{
      f.controls.ypeFaultCurrent.value='';
    }
    if(f.controls.bpeVoltage.value!='' && f.controls.bpeLoopImpedance.value!='' && f.controls.bpeLoopImpedance.value!=undefined && f.controls.bpeVoltage.value!=undefined && f.controls.bpeVoltage.value!='NA' && f.controls.bpeLoopImpedance.value!='NA'){
    // f.controls.bpeFaultCurrent.value= f.controls.bpeVoltage.value/f.controls.bpeLoopImpedance.value;
    var bpeFaultCurrent= f.controls.bpeVoltage.value/f.controls.bpeLoopImpedance.value;	
        f.controls.bpeFaultCurrent.value=bpeFaultCurrent.toFixed(3);	
    }
    else if((f.controls.bpeVoltage.value=='NA' && f.controls.bpeLoopImpedance.value=='NA') || (f.controls.bpeVoltage.value=='NA' || f.controls.bpeLoopImpedance.value=='NA')){
     f.controls.bpeFaultCurrent.value='NA';
    }
    else{
      f.controls.bpeFaultCurrent.value='';
    }
    }
    onKeyImpedance1(event:KeyboardEvent,f:any){
      
        for(let i of f.controls.testingRecordsSourceSupply.controls) {
          if(f.controls.ryLoopImpedance.value!='' && f.controls.ryLoopImpedance.value!=undefined && f.controls.ryLoopImpedance.value!= 'NA'
          && i.controls.ryLoopImpedanceMains.value!='NA' && i.controls.ryLoopImpedanceExternal.value!='NA') {
          i.controls.ryLoopImpedance.value =(f.controls.ryLoopImpedance.value - i.controls.ryLoopImpedanceMains.value);
          i.controls.ryLoopImpedance.value = +i.controls.ryLoopImpedance.value + +i.controls.ryLoopImpedanceExternal.value;
          i.controls.ryLoopImpedance.setValue(i.controls.ryLoopImpedance.value.toFixed(3));
        }
        else if(f.controls.ryLoopImpedance.value=='NA' || i.controls.ryLoopImpedanceMains.value=='NA' || i.controls.ryLoopImpedanceExternal.value=='NA'){
         i.controls.ryLoopImpedance.setValue('NA');
         }
        else{
          i.controls.ryLoopImpedance.setValue('');
        }
        //fault current division for alternate
        if(i.controls.ryLoopImpedance.value!='' && i.controls.ryLoopImpedance.value!='NA' && i.controls.ryVoltage.value!= 'NA') {
          i.controls.ryFaultCurrent.value =(i.controls.ryVoltage.value/i.controls.ryLoopImpedance.value)/1000;
          i.controls.ryFaultCurrent.setValue(i.controls.ryFaultCurrent.value.toFixed(3));
        }
        else if(i.controls.ryLoopImpedance.value=='NA' || i.controls.ryVoltage.value=='NA'){
         i.controls.ryFaultCurrent.setValue('NA');
         }
        else{
          i.controls.ryFaultCurrent.setValue('');
        }
      }
      //for mains division
      if(f.controls.ryVoltage.value!='' && f.controls.ryLoopImpedance.value!='' && f.controls.ryLoopImpedance.value!=undefined && f.controls.ryVoltage.value!=undefined && f.controls.ryVoltage.value!='NA' && f.controls.ryLoopImpedance.value!='NA'){
        //f.controls.ryFaultCurrent.value= f.controls.ryVoltage.value/f.controls.ryLoopImpedance.value; 
        var ryFaultCurrent= (f.controls.ryVoltage.value/f.controls.ryLoopImpedance.value)/1000;	
        f.controls.ryFaultCurrent.setValue(ryFaultCurrent.toFixed(3));	
        
       }
       else if((f.controls.ryVoltage.value=='NA' && f.controls.ryLoopImpedance.value=='NA') || (f.controls.ryVoltage.value=='NA' || f.controls.ryLoopImpedance.value=='NA')){
         f.controls.ryFaultCurrent.setValue('NA');
        }
       else{
         f.controls.ryFaultCurrent.setValue('');
       }
    }
    onKeyImpedance2(event:KeyboardEvent,f:any){
      
        for(let i of f.controls.testingRecordsSourceSupply.controls) {
         
        if(f.controls.rbLoopImpedance.value!='' && f.controls.rbLoopImpedance.value!=undefined && f.controls.rbLoopImpedance.value!= 'NA'
        && i.controls.rbLoopImpedanceMains.value!='NA' && i.controls.rbLoopImpedanceExternal.value!='NA') {
          i.controls.rbLoopImpedance.value =(f.controls.rbLoopImpedance.value - i.controls.rbLoopImpedanceMains.value);
          i.controls.rbLoopImpedance.value = +i.controls.rbLoopImpedance.value + +i.controls.rbLoopImpedanceExternal.value;
          i.controls.rbLoopImpedance.setValue(i.controls.rbLoopImpedance.value.toFixed(3));
        }
        else if(f.controls.rbLoopImpedance.value=='NA' || i.controls.rbLoopImpedanceMains.value=='NA' || i.controls.rbLoopImpedanceExternal.value=='NA'){
         i.controls.rbLoopImpedance.setValue('NA');
         }
        else{
          i.controls.rbLoopImpedance.setValue('');
        }
          //fault current division for alternate
          if(i.controls.rbLoopImpedance.value!='' && i.controls.rbLoopImpedance.value!='NA' && i.controls.rbVoltage.value!= 'NA') {
            i.controls.rbFaultCurrent.value =(i.controls.rbVoltage.value/i.controls.rbLoopImpedance.value)/1000;
            i.controls.rbFaultCurrent.setValue(i.controls.rbFaultCurrent.value.toFixed(3));
          }
          else if(i.controls.rbLoopImpedance.value=='NA' || i.controls.rbVoltage.value=='NA'){
           i.controls.rbFaultCurrent.setValue('NA');
           }
          else{
            i.controls.rbFaultCurrent.setValue('');
          }
      }
      
       if(f.controls.rbVoltage.value!='' && f.controls.rbLoopImpedance.value!='' && f.controls.rbLoopImpedance.value!=undefined && f.controls.rbVoltage.value!=undefined && f.controls.rbVoltage.value!='NA' && f.controls.rbLoopImpedance.value!='NA'){
         //f.controls.rbFaultCurrent.value= f.controls.rbVoltage.value/f.controls.rbLoopImpedance.value;
         var rbFaultCurrent= (f.controls.rbVoltage.value/f.controls.rbLoopImpedance.value)/1000;	
            f.controls.rbFaultCurrent.setValue(rbFaultCurrent.toFixed(3));	
        }
        else if((f.controls.rbVoltage.value=='NA' && f.controls.rbLoopImpedance.value=='NA') || (f.controls.rbVoltage.value=='NA' || f.controls.rbLoopImpedance.value=='NA')){
         f.controls.rbFaultCurrent.setValue('NA');
        }
        else{
          f.controls.rbFaultCurrent.setValue('');
        }
    }
    onKeyImpedance3(event:KeyboardEvent,f:any){
      
        for(let i of f.controls.testingRecordsSourceSupply.controls) {
         
        if(f.controls.ybLoopImpedance.value!='' && f.controls.ybLoopImpedance.value!=undefined && f.controls.ybLoopImpedance.value!= 'NA'
        && i.controls.ybLoopImpedanceMains.value!='NA' && i.controls.ybLoopImpedanceExternal.value!='NA') {
          i.controls.ybLoopImpedance.value =(f.controls.ybLoopImpedance.value - i.controls.ybLoopImpedanceMains.value);
          i.controls.ybLoopImpedance.value = +i.controls.ybLoopImpedance.value + +i.controls.ybLoopImpedanceExternal.value;
          i.controls.ybLoopImpedance.setValue(i.controls.ybLoopImpedance.value.toFixed(3));
        }
        else if(f.controls.ybLoopImpedance.value=='NA' || i.controls.ybLoopImpedanceMains.value=='NA' || i.controls.ybLoopImpedanceExternal.value=='NA'){
         i.controls.ybLoopImpedance.setValue('NA');
         }
        else{
          i.controls.ybLoopImpedance.setValue('');
        }
          //fault current division for alternate
          if(i.controls.ybLoopImpedance.value!='' && i.controls.ybLoopImpedance.value!='NA' && i.controls.ybVoltage.value!= 'NA') {
            i.controls.ybFaultCurrent.value =(i.controls.ybVoltage.value/i.controls.ybLoopImpedance.value)/1000;
            i.controls.ybFaultCurrent.setValue( i.controls.ybFaultCurrent.value.toFixed(3));
          }
          else if(i.controls.ybLoopImpedance.value=='NA' || i.controls.ybVoltage.value=='NA'){
           i.controls.ybFaultCurrent.setValue('NA');
           }
          else{
            i.controls.ybFaultCurrent.setValue('');
          }
      }
     
        if(f.controls.ybVoltage.value!='' && f.controls.ybLoopImpedance.value!='' && f.controls.ybLoopImpedance.value!=undefined && f.controls.ybVoltage.value!=undefined && f.controls.ybVoltage.value!='NA' && f.controls.ybLoopImpedance.value!='NA'){
         //f.controls.ybFaultCurrent.value= f.controls.ybVoltage.value/f.controls.ybLoopImpedance.value;
         var ybFaultCurrent= (f.controls.ybVoltage.value/f.controls.ybLoopImpedance.value)/1000;	
            f.controls.ybFaultCurrent.setValue(ybFaultCurrent.toFixed(3));	
        }
        else if((f.controls.ybVoltage.value=='NA' && f.controls.ybLoopImpedance.value=='NA') || (f.controls.ybVoltage.value=='NA' || f.controls.ybLoopImpedance.value=='NA')){
         f.controls.ybFaultCurrent.setValue('NA');
        }
        else{
          f.controls.ybFaultCurrent.setValue('');
        }
       
    }
    onKeyImpedance4(event:KeyboardEvent,f:any){
      
        for(let i of f.controls.testingRecordsSourceSupply.controls) {
         
        if(f.controls.rnLoopImpedance.value!='' && f.controls.rnLoopImpedance.value!=undefined && f.controls.rnLoopImpedance.value!= 'NA'
        && i.controls.rnLoopImpedanceMains.value!='NA' && i.controls.rnLoopImpedanceExternal.value!='NA') {
          i.controls.rnLoopImpedance.value =(f.controls.rnLoopImpedance.value - i.controls.rnLoopImpedanceMains.value);
          i.controls.rnLoopImpedance.value = +i.controls.rnLoopImpedance.value + +i.controls.rnLoopImpedanceExternal.value;
          i.controls.rnLoopImpedance.setValue(i.controls.rnLoopImpedance.value.toFixed(3));
        }
        else if(f.controls.rnLoopImpedance.value=='NA' || i.controls.rnLoopImpedanceMains.value=='NA' || i.controls.rnLoopImpedanceExternal.value=='NA'){
         i.controls.rnLoopImpedance.setValue('NA');
         }
        else{
          i.controls.rnLoopImpedance.setValue('');
        }
        //fault current division for alternate
        if(i.controls.rnLoopImpedance.value!='' && i.controls.rnLoopImpedance.value!='NA' && i.controls.rnVoltage.value!= 'NA') {
          i.controls.rnFaultCurrent.value =(i.controls.rnVoltage.value/i.controls.rnLoopImpedance.value)/1000;
          i.controls.rnFaultCurrent.setValue(i.controls.rnFaultCurrent.value.toFixed(3));
        }
        else if(i.controls.rnLoopImpedance.value=='NA' || i.controls.rnVoltage.value=='NA'){
         i.controls.rnFaultCurrent.setValue('NA');
         }
        else{
          i.controls.rnFaultCurrent.setValue('');
        }
      }
      
        if(f.controls.rnVoltage.value!='' && f.controls.rnLoopImpedance.value!='' && f.controls.rnLoopImpedance.value!=undefined && f.controls.rnVoltage.value!=undefined && f.controls.rnVoltage.value!='NA' && f.controls.rnLoopImpedance.value!='NA'){
         //f.controls.rnFaultCurrent.value= f.controls.rnVoltage.value/f.controls.rnLoopImpedance.value;
         var rnFaultCurrent= (f.controls.rnVoltage.value/f.controls.rnLoopImpedance.value)/1000;	
            f.controls.rnFaultCurrent.setValue(rnFaultCurrent.toFixed(3));	
        }
        else if((f.controls.rnVoltage.value=='NA' && f.controls.rnLoopImpedance.value=='NA') || (f.controls.rnVoltage.value=='NA' || f.controls.rnLoopImpedance.value=='NA')){
         f.controls.rnFaultCurrent.setValue('NA');
        }
        else{
          f.controls.rnFaultCurrent.setValue('');
        }
    }
    onKeyImpedance5(event:KeyboardEvent,f:any){
      
        for(let i of f.controls.testingRecordsSourceSupply.controls) {
         
        if(f.controls.ynLoopImpedance.value!='' && f.controls.ynLoopImpedance.value!=undefined && f.controls.ynLoopImpedance.value!= 'NA'
        && i.controls.ynLoopImpedanceMains.value!='NA' && i.controls.ynLoopImpedanceExternal.value!='NA') {
          i.controls.ynLoopImpedance.value =(f.controls.ynLoopImpedance.value - i.controls.ynLoopImpedanceMains.value);
          i.controls.ynLoopImpedance.value = +i.controls.ynLoopImpedance.value + +i.controls.ynLoopImpedanceExternal.value;
          i.controls.ynLoopImpedance.setValue(i.controls.ynLoopImpedance.value.toFixed(3));
        }
        else if(f.controls.ynLoopImpedance.value=='NA' || i.controls.ynLoopImpedanceMains.value=='NA' || i.controls.ynLoopImpedanceExternal.value=='NA'){
         i.controls.ynLoopImpedance.setValue('NA');
         }
        else{
          i.controls.ynLoopImpedance.setValue('');
        }
          //fault current division for alternate
          if(i.controls.ynLoopImpedance.value!='' && i.controls.ynLoopImpedance.value!='NA' && i.controls.ynVoltage.value!= 'NA') {
            i.controls.ynFaultCurrent.value =(i.controls.ynVoltage.value/i.controls.ynLoopImpedance.value)/1000;
            i.controls.ynFaultCurrent.setValue(i.controls.ynFaultCurrent.value.toFixed(3));
          }
          else if(i.controls.ynLoopImpedance.value=='NA' || i.controls.ynVoltage.value=='NA'){
           i.controls.ynFaultCurrent.setValue('NA');
           }
          else{
            i.controls.ynFaultCurrent.setValue('');
          }
      }
     
        if(f.controls.ynVoltage.value!='' && f.controls.ynLoopImpedance.value!='' && f.controls.ynLoopImpedance.value!=undefined && f.controls.ynVoltage.value!=undefined && f.controls.ynVoltage.value!='NA' && f.controls.ynLoopImpedance.value!='NA'){
         //f.controls.ynFaultCurrent.value= f.controls.ynVoltage.value/f.controls.ynLoopImpedance.value;
         var ynFaultCurrent= (f.controls.ynVoltage.value/f.controls.ynLoopImpedance.value)/1000;	
            f.controls.ynFaultCurrent.setValue(ynFaultCurrent.toFixed(3));	
        }
        else if((f.controls.ynVoltage.value=='NA' && f.controls.ynLoopImpedance.value=='NA') || (f.controls.ynVoltage.value=='NA' || f.controls.ynLoopImpedance.value=='NA')){
         f.controls.ynFaultCurrent.setValue('NA');
        }
        else{
          f.controls.ynFaultCurrent.setValue('');
        }
       
    }
    onKeyImpedance6(event:KeyboardEvent,f:any){
      
        for(let i of f.controls.testingRecordsSourceSupply.controls) {
         
        if(f.controls.bnLoopImpedance.value!='' && f.controls.bnLoopImpedance.value!=undefined && f.controls.bnLoopImpedance.value!= 'NA'
        && i.controls.bnLoopImpedanceMains.value!='NA' && i.controls.bnLoopImpedanceExternal.value!='NA') {
          i.controls.bnLoopImpedance.value =(f.controls.bnLoopImpedance.value - i.controls.bnLoopImpedanceMains.value);
          i.controls.bnLoopImpedance.value = +i.controls.bnLoopImpedance.value + +i.controls.bnLoopImpedanceExternal.value;
          i.controls.bnLoopImpedance.setValue( i.controls.bnLoopImpedance.value.toFixed(3));
        }
        else if(f.controls.bnLoopImpedance.value=='NA' || i.controls.bnLoopImpedanceMains.value=='NA' || i.controls.bnLoopImpedanceExternal.value=='NA'){
         i.controls.bnLoopImpedance.setValue('NA');
         }
        else{
          i.controls.bnLoopImpedance.setValue('');
        }
         //fault current division for alternate
         if(i.controls.bnLoopImpedance.value!='' && i.controls.bnLoopImpedance.value!='NA' && i.controls.bnVoltage.value!= 'NA') {
          i.controls.bnFaultCurrent.value =(i.controls.bnVoltage.value/i.controls.bnLoopImpedance.value)/1000;
          i.controls.bnFaultCurrent.setValue(i.controls.bnFaultCurrent.value.toFixed(3));
        }
        else if(i.controls.bnLoopImpedance.value=='NA' || i.controls.bnVoltage.value=='NA'){
         i.controls.bnFaultCurrent.setValue('NA');
         }
        else{
          i.controls.bnFaultCurrent.setValue('');
        }
      }
     

      
        if(f.controls.bnVoltage.value!='' && f.controls.bnLoopImpedance.value!='' && f.controls.bnLoopImpedance.value!=undefined && f.controls.bnVoltage.value!=undefined && f.controls.bnVoltage.value!='NA' && f.controls.bnLoopImpedance.value!='NA'){
         //f.controls.bnFaultCurrent.value= f.controls.bnVoltage.value/f.controls.bnLoopImpedance.value;
         var bnFaultCurrent= (f.controls.bnVoltage.value/f.controls.bnLoopImpedance.value)/1000;	
            f.controls.bnFaultCurrent.setValue(bnFaultCurrent.toFixed(3));	
        }
        else if((f.controls.bnVoltage.value=='NA' && f.controls.bnLoopImpedance.value=='NA') || (f.controls.bnVoltage.value=='NA' || f.controls.bnLoopImpedance.value=='NA')){
         f.controls.bnFaultCurrent.setValue('NA');
        }
        else{
          f.controls.bnFaultCurrent.setValue('');
        }
      
    }
    onKeyImpedance7(event:KeyboardEvent,f:any){
      
        for(let i of f.controls.testingRecordsSourceSupply.controls) {
         
        if(f.controls.rpeLoopImpedance.value!='' && f.controls.rpeLoopImpedance.value!=undefined && f.controls.rpeLoopImpedance.value!= 'NA'
        && i.controls.rpeLoopImpedanceMains.value!='NA' && i.controls.rpeLoopImpedanceExternal.value!='NA') {
          i.controls.rpeLoopImpedance.value =(f.controls.rpeLoopImpedance.value - i.controls.rpeLoopImpedanceMains.value);
          i.controls.rpeLoopImpedance.value = +i.controls.rpeLoopImpedance.value + +i.controls.rpeLoopImpedanceExternal.value;
          i.controls.rpeLoopImpedance.setValue( i.controls.rpeLoopImpedance.value.toFixed(3));
        }
        else if(f.controls.rpeLoopImpedance.value=='NA' || i.controls.rpeLoopImpedanceMains.value=='NA' || i.controls.rpeLoopImpedanceExternal.value=='NA'){
         i.controls.rpeLoopImpedance.setValue('NA');
         }
        else{
          i.controls.rpeLoopImpedance.setValue('');
        }
         //fault current division for alternate
         if(i.controls.rpeLoopImpedance.value!='' && i.controls.rpeLoopImpedance.value!='NA' && i.controls.rpeVoltage.value!= 'NA') {
          i.controls.rpeFaultCurrent.value =(i.controls.rpeVoltage.value/i.controls.rpeLoopImpedance.value)/1000;
          i.controls.rpeFaultCurrent.setValue(i.controls.rpeFaultCurrent.value.toFixed(3));
        }
        else if(i.controls.rpeLoopImpedance.value=='NA' || i.controls.rpeVoltage.value=='NA'){
         i.controls.rpeFaultCurrent.setValue('NA');
         }
        else{
          i.controls.rpeFaultCurrent.setValue('');
        }
      }
        if(f.controls.rpeVoltage.value!='' && f.controls.rpeLoopImpedance.value!='' && f.controls.rpeLoopImpedance.value!=undefined && f.controls.rpeVoltage.value!=undefined && f.controls.rpeVoltage.value!='NA' && f.controls.rpeLoopImpedance.value!='NA'){
         //f.controls.rpeFaultCurrent.value= f.controls.rpeVoltage.value/f.controls.rpeLoopImpedance.value;
         var rpeFaultCurrent= (f.controls.rpeVoltage.value/f.controls.rpeLoopImpedance.value)/1000;	
            f.controls.rpeFaultCurrent.setValue(rpeFaultCurrent.toFixed(3));	
        }
        else if((f.controls.rpeVoltage.value=='NA' && f.controls.rpeLoopImpedance.value=='NA') || (f.controls.rpeVoltage.value=='NA' || f.controls.rpeLoopImpedance.value=='NA')){
         f.controls.rpeFaultCurrent.setValue('NA');
        }
        else{
          f.controls.rpeFaultCurrent.setValue('');
        }
        
    }
    onKeyImpedance8(event:KeyboardEvent,f:any){
        for(let i of f.controls.testingRecordsSourceSupply.controls) {
        if(f.controls.ypeLoopImpedance.value!='' && f.controls.ypeLoopImpedance.value!=undefined && f.controls.ypeLoopImpedance.value!= 'NA'
        && i.controls.ypeLoopImpedanceMains.value!='NA' && i.controls.ypeLoopImpedanceExternal.value!='NA') {
          i.controls.ypeLoopImpedance.value =(f.controls.ypeLoopImpedance.value - i.controls.ypeLoopImpedanceMains.value);
          i.controls.ypeLoopImpedance.value = +i.controls.ypeLoopImpedance.value + +i.controls.ypeLoopImpedanceExternal.value;
          i.controls.ypeLoopImpedance.setValue( i.controls.ypeLoopImpedance.value.toFixed(3));
        }
        else if(f.controls.ypeLoopImpedance.value=='NA' || i.controls.ypeLoopImpedanceMains.value=='NA' || i.controls.ypeLoopImpedanceExternal.value=='NA'){
         i.controls.ypeLoopImpedance.setValue('NA');
         }
        else{
          i.controls.ypeLoopImpedance.setValue('');
        }
         //fault current division for alternate
         if(i.controls.ypeLoopImpedance.value!='' && i.controls.ypeLoopImpedance.value!='NA' && i.controls.ypeVoltage.value!= 'NA') {
          i.controls.ypeFaultCurrent.value =(i.controls.ypeVoltage.value/i.controls.ypeLoopImpedance.value)/1000;
          i.controls.ypeFaultCurrent.setValue(i.controls.ypeFaultCurrent.value.toFixed(3));
        }
        else if(i.controls.ypeLoopImpedance.value=='NA' || i.controls.ypeVoltage.value=='NA'){
         i.controls.ypeFaultCurrent.setValue('NA');
         }
        else{
          i.controls.ypeFaultCurrent.setValue('');
        }
      }
       
        if(f.controls.ypeVoltage.value!='' && f.controls.ypeLoopImpedance.value!='' && f.controls.ypeVoltage.value!=undefined && f.controls.ypeVoltage.value!=undefined && f.controls.ypeVoltage.value!='NA' && f.controls.ypeLoopImpedance.value!='NA'){
         //f.controls.ypeFaultCurrent.value= f.controls.ypeVoltage.value/f.controls.ypeLoopImpedance.value;
         var ypeFaultCurrent= (f.controls.ypeVoltage.value/f.controls.ypeLoopImpedance.value)/1000;	
            f.controls.ypeFaultCurrent.setValue(ypeFaultCurrent.toFixed(3));	
        }
        else if((f.controls.ypeVoltage.value=='NA' && f.controls.ypeLoopImpedance.value=='NA') || (f.controls.ypeVoltage.value=='NA' || f.controls.ypeLoopImpedance.value=='NA')){
         f.controls.ypeFaultCurrent.setValue('NA');
        }
        else{
          f.controls.ypeFaultCurrent.setValue('');
        }
    }
    onKeyImpedance9(event:KeyboardEvent,f:any){
        for(let i of f.controls.testingRecordsSourceSupply.controls) {
        if(f.controls.bpeLoopImpedance.value!='' && f.controls.bpeLoopImpedance.value!=undefined && f.controls.bpeLoopImpedance.value!= 'NA'
        && i.controls.bpeLoopImpedanceMains.value!='NA' && i.controls.bpeLoopImpedanceExternal.value!='NA') {
          i.controls.bpeLoopImpedance.value =(f.controls.bpeLoopImpedance.value - i.controls.bpeLoopImpedanceMains.value);
          i.controls.bpeLoopImpedance.value = +i.controls.bpeLoopImpedance.value + +i.controls.bpeLoopImpedanceExternal.value;
          i.controls.bpeLoopImpedance.setValue(i.controls.bpeLoopImpedance.value.toFixed(3));
        }
        else if(f.controls.bpeLoopImpedance.value=='NA' || i.controls.bpeLoopImpedanceMains.value=='NA' || i.controls.bpeLoopImpedanceExternal.value=='NA'){
         i.controls.bpeLoopImpedance.setValue('NA');
         }
        else{
          i.controls.bpeLoopImpedance.setValue('');
        }
          //fault current division for alternate
          if(i.controls.bpeLoopImpedance.value!='' && i.controls.bpeLoopImpedance.value!='NA' && i.controls.bpeVoltage.value!= 'NA') {
            i.controls.bpeFaultCurrent.value =(i.controls.bpeVoltage.value/i.controls.bpeLoopImpedance.value)/1000;
            i.controls.bpeFaultCurrent.setValue(i.controls.bpeFaultCurrent.value.toFixed(3));
          }
          else if(i.controls.bpeLoopImpedance.value=='NA' || i.controls.bpeVoltage.value=='NA'){
           i.controls.bpeFaultCurrent.setValue('NA');
           }
          else{
            i.controls.bpeFaultCurrent.setValue('');
          }
      }
        if(f.controls.bpeVoltage.value!='' && f.controls.bpeLoopImpedance.value!='' && f.controls.bpeLoopImpedance.value!=undefined && f.controls.bpeVoltage.value!=undefined && f.controls.bpeVoltage.value!='NA' && f.controls.bpeLoopImpedance.value!='NA'){
        // f.controls.bpeFaultCurrent.value= f.controls.bpeVoltage.value/f.controls.bpeLoopImpedance.value;
        var bpeFaultCurrent= (f.controls.bpeVoltage.value/f.controls.bpeLoopImpedance.value)/1000;	
            f.controls.bpeFaultCurrent.setValue(bpeFaultCurrent.toFixed(3));	
        }
        else if((f.controls.bpeVoltage.value=='NA' && f.controls.bpeLoopImpedance.value=='NA') || (f.controls.bpeVoltage.value=='NA' || f.controls.bpeLoopImpedance.value=='NA')){
         f.controls.bpeFaultCurrent.setValue('NA');
        }
        else{
          f.controls.bpeFaultCurrent.setValue('');
        }
    }
    
  reloadFromBack(){
    if(this.testingForm.invalid){
     this.service.isCompleted4= false;
     this.service.isLinear=true;
     this.service.editable=false;
     this.validationErrorTab = true;
     this.validationErrorMsgTab= 'Please check all the fields in testing';
     setTimeout(() => {
       this.validationErrorTab = false;
     }, 3000);
     return false;
    }
    else if(this.testingForm.dirty && this.testingForm.touched){
      this.service.isCompleted4= false;
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
      this.service.isCompleted4= true;
      this.service.isLinear=false;
      this.service.editable=true;
   this.testingForm.markAsPristine();
   return true;
    }
  }
  gotoNextTab() {
    if ((this.testingForm.dirty && this.testingForm.invalid) || this.service.isCompleted3==false){
      this.service.isCompleted4= false;
      this.service.isLinear=true;
      this.service.editable=false;
      this.validationErrorTab = true;
      this.validationErrorMsgTab= 'Please check all the fields in testing';
      setTimeout(() => {
        this.validationErrorTab = false;
      }, 3000);
      return;
    }
    else if(this.testingForm.dirty && this.testingForm.touched){
      this.service.isCompleted4= false;
      this.service.isLinear=true;
      this.service.editable=false;
      this.tabError = true;
      this.tabErrorMsg = 'Kindly click on next button to update the changes!';
      setTimeout(() => {
        this.tabError = false;
      }, 3000);
   }
    else{
      this.service.isCompleted4= true;
      this.service.isLinear=false;
      this.service.editable=true;
    }
  }
  gotoNextModal(content4: any,content2:any) {
    if (this.testingForm.invalid) {
      this.validationError = true;
      this.validationErrorMsg = 'Please check all the fields';
      // setTimeout(() => {
      //   this.validationError = false;
      // }, 3000);
      return;
    }
    if(this.testingForm.touched || this.testingForm.untouched){
      this.modalReference = this.modalService.open(content2, {
         centered: true, 
         size: 'md',
         backdrop: 'static'
        })
     }
     if(this.testingForm.dirty && this.testingForm.touched){ //update
      this.modalService.open(content4, { centered: true,backdrop: 'static'});
      this.modalReference.close();
     }

  }

  callMethod() {
    this.ngOnInit();
  }
  closeModalDialog() {
    this.finalSpinner=true;
    this.popup=false;
    if (this.errorMsg != "") {
      this.Error = false;
      this.service.isCompleted4= false;
      this.service.isLinear=true;
      this.modalService.dismissAll((this.errorMsg = ""));
    } 
    else {
      this.success = false;
      this.service.isCompleted4= true;
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
  //   this.observation.observationComponent ="Testing-Component";
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
  //           this.retrieveFromObservationTesting(data);
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


  nextTab(flag: any) {
    if (!flag) {
      this.testingDetails.siteId = this.service.siteCount;
    }
    this.testingDetails.userName = this.email;
    this.submitted = true;
    if (this.testingForm.invalid) {
      return;
    }
    this.testaccordianArr = this.testingForm.get(
      'testaccordianArr'
    ) as FormArray;

    for (let i of this.testaccordianArr.controls) {
      this.testDistRecords = i.get('testDistRecords') as FormArray;
      for(let v of this.testDistRecords.controls){
        this.testDistribution = v.get('testDistribution') as FormArray;
        this.testingRecords = v.get('testingRecords') as FormArray;
         // coma separated value for first table
      for (let j of this.testDistribution.value) {
        let arr: any = [];
        let arr1: any = [];
        let arr2: any = [];
        let arr3: any = [];
        let arr4: any = [];
        if(j.sourceFromSupply=='Mains Incoming'){
          for (let k of j.distributionIncomingValueArr) {
            arr.push(
              k.incomingVoltage1,
              k.incomingVoltage2,
              k.incomingVoltage3,
              k.incomingVoltage4,
              k.incomingVoltage5,
              k.incomingVoltage6,
              k.incomingVoltage7,
              k.incomingVoltage8,
              k.incomingVoltage9
            );
            arr1.push(
              k.incomingZs1,
              k.incomingZs2,
              k.incomingZs3,
              k.incomingZs4,
              k.incomingZs5,
              k.incomingZs6,
              k.incomingZs7,
              k.incomingZs8,
              k.incomingZs9
            );
            arr2.push(
              k.incomingIpf1,
              k.incomingIpf2,
              k.incomingIpf3,
              k.incomingIpf4,
              k.incomingIpf5,
              k.incomingIpf6,
              k.incomingIpf7,
              k.incomingIpf8,
              k.incomingIpf9
            );
            arr4.push(
              k.actualLoadAl1,
              k.actualLoadAl2,
              k.actualLoadAl3,
              k.actualLoadAl4,
            );
          }
        }
        else{
          for (let k of j.distributionIncomingValueArr2) {
            arr.push(
              k.incomingVoltage1,
              k.incomingVoltage2,
              k.incomingVoltage3,
              k.incomingVoltage4,
              k.incomingVoltage5,
              k.incomingVoltage6,
              k.incomingVoltage7,
              k.incomingVoltage8,
              k.incomingVoltage9
            );
            arr1.push(
              k.incomingZs1,
              k.incomingZs2,
              k.incomingZs3,
              k.incomingZs4,
              k.incomingZs5,
              k.incomingZs6,
              k.incomingZs7,
              k.incomingZs8,
              k.incomingZs9
            );
            arr2.push(
              k.incomingIpf1,
              k.incomingIpf2,
              k.incomingIpf3,
              k.incomingIpf4,
              k.incomingIpf5,
              k.incomingIpf6,
              k.incomingIpf7,
              k.incomingIpf8,
              k.incomingIpf9
            );
            arr4.push(
              k.actualLoadAl1,
              k.actualLoadAl2,
              k.actualLoadAl3,
              k.actualLoadAl4,
            );
          }
        }
        let incomingVoltage: String = '';
        let incomingLoopImpedance: String = '';
        let incomingFaultCurrent: String = '';
        let incomingActualLoad: String = '';

        for (let a of arr) {
          if (a != '') {
            incomingVoltage += a + ',';
          } else {
            incomingVoltage += 'NA,';
          }
        }
        incomingVoltage = incomingVoltage.replace(/,\s*$/, '');
        j.incomingVoltage = incomingVoltage;

        for (let b of arr1) {
          if (b != '') {
            incomingLoopImpedance += b + ',';
          } else {
            incomingLoopImpedance += 'NA,';
          }
        }
        incomingLoopImpedance = incomingLoopImpedance.replace(/,\s*$/, '');
        j.incomingLoopImpedance = incomingLoopImpedance;

        for (let c of arr2) {
          if (c != '') {
            incomingFaultCurrent += c + ',';
          } else {
            incomingFaultCurrent += 'NA,';
          }
        }
        incomingFaultCurrent = incomingFaultCurrent.replace(/,\s*$/, '');
        j.incomingFaultCurrent = incomingFaultCurrent;

        for (let d of arr4) {
          if (d != '') {
            incomingActualLoad += d + ',';
          } else {
            incomingActualLoad += 'NA,';
          }
        }
        incomingActualLoad = incomingActualLoad.replace(/,\s*$/, '');
        j.incomingActualLoad = incomingActualLoad;

        // rateamps coma saparated value
        for (let k of j.rateArr) {
          arr3.push(k.ratingsAmps);
          let ratingsAmps: String = '';
          for (let a of arr3) {
            if (a != '') {
              ratingsAmps += a + ',';
            }
          }
          ratingsAmps = ratingsAmps.replace(/,\s*$/, '');
          j.ratingsAmps = ratingsAmps;
        }
        //delete j.rateArr;
        //delete j.distributionIncomingValueArr;
      }
      for(let n of this.testingRecords.controls){
        this.testingCalculation = n.get('testingRecordsSourceSupply') as FormArray;
        for(let o of this.testingCalculation.controls) {
          let arr1: any = [];
          let arr2: any = [];
          let arr3: any = [];
          let arr4: any = [];

          arr1.push(
           o.controls.ryVoltage.value,
           o.controls.rbVoltage.value,
           o.controls.ybVoltage.value,
           o.controls.rnVoltage.value,
           o.controls.ynVoltage.value,
           o.controls.bnVoltage.value,
           o.controls.rpeVoltage.value,
           o.controls.ypeVoltage.value,
           o.controls.bpeVoltage.value
          );
          arr2.push(
           o.controls.ryLoopImpedance.value,
           o.controls.rbLoopImpedance.value,
           o.controls.ybLoopImpedance.value,
           o.controls.rnLoopImpedance.value,
           o.controls.ynLoopImpedance.value,
           o.controls.bnLoopImpedance.value,
           o.controls.rpeLoopImpedance.value,
           o.controls.ypeLoopImpedance.value,
           o.controls.bpeLoopImpedance.value
          );
          arr3.push(
           o.controls.ryFaultCurrent.value,
           o.controls.rbFaultCurrent.value,
           o.controls.ybFaultCurrent.value,
           o.controls.rnFaultCurrent.value,
           o.controls.ynFaultCurrent.value,
           o.controls.bnFaultCurrent.value,
           o.controls.rpeFaultCurrent.value,
           o.controls.ypeFaultCurrent.value,
           o.controls.bpeFaultCurrent.value
          );
          arr4.push(
           o.controls.ryDisconnect.value,
           o.controls.rbDisconnect.value,
           o.controls.ybDisconnect.value,
           o.controls.rnDisconnect.value,
           o.controls.ynDisconnect.value,
           o.controls.bnDisconnect.value,
           o.controls.rpeDisconnect.value,
           o.controls.ypeDisconnect.value,
           o.controls.bpeDisconnect.value
          );

        let testVoltage1: String = '';
        let testLoopImpedance1: String = '';
        let testFaultCurrent1: String = '';
        let disconnectionTime1: String = '';
        for (let p of arr1) {
          if (p != '') {
            testVoltage1 += p + ',';
          } else {
            testVoltage1 += 'NA,';
          }
        }
        testVoltage1 = testVoltage1.replace(/,\s*$/, '');
       o.controls.testVoltage.setValue(testVoltage1);

        for (let q of arr2) {
          if (q != '') {
            testLoopImpedance1 += q + ',';
          } else {
            testLoopImpedance1 += 'NA,';
          }
        }
        testLoopImpedance1 = testLoopImpedance1.replace(/,\s*$/, '');
       o.controls.testLoopImpedance.setValue(testLoopImpedance1);

        for (let r of arr3) {
          if (r != '') {
            testFaultCurrent1 += r + ',';
          } else {
            testFaultCurrent1 += 'NA,';
          }
        }
        testFaultCurrent1 = testFaultCurrent1.replace(/,\s*$/, '');
       o.controls.testFaultCurrent.setValue(testFaultCurrent1);

        for (let s of arr4) {
          if (s != '') {
            disconnectionTime1 += s + ',';
          } else {
            disconnectionTime1 += 'NA,';
          }
        }
        disconnectionTime1 = disconnectionTime1.replace(/,\s*$/, '');
       o.controls.disconnectionTime.setValue(disconnectionTime1);
        }
      }

      for (let x of this.testingRecords.controls) {
        if (x.controls.circuitNo.value == '' || x.controls.circuitNo.value == undefined || x.controls.circuitNo.value == null) {
          x.controls.circuitNo.setValue('NA');
        }
        if (x.controls.continutiyRR.value == '' || x.controls.continutiyRR.value == undefined || x.controls.continutiyRR.value == null) {
          x.controls.continutiyRR.setValue('NA');
        }
        // if (x.controls.continutiyLL?.value == '' || x.controls.continutiyLL?.value == undefined || x.controls.continutiyLL?.value == null) {
        //   x.controls.continutiyLL.setValue('NA');
        // }
        // if (x.controls.continutiyLE.value == '' || x.controls.continutiyLE.value == undefined || x.controls.continutiyLE.value == null) {
        //   x.controls.continutiyLE.setValue('NA');
        // }
        if (x.controls.continutiyPolarity.value == '' || x.controls.continutiyPolarity.value == undefined || x.controls.continutiyPolarity.value == null) {
          x.controls.continutiyPolarity.setValue('NA');
        }
        if (x.controls.conductorPecpc.value == '' || x.controls.conductorPecpc.value == undefined || x.controls.conductorPecpc.value == null) {
          x.controls.conductorPecpc.setValue('NA');
        }
        if (x.controls.continutiyApproximateLength.value == '' || x.controls.continutiyApproximateLength.value == undefined || x.controls.continutiyApproximateLength.value == null) {
          x.controls.continutiyApproximateLength.setValue('NA');
        }
        if (x.controls.continutiyR.value == '' || x.controls.continutiyR.value == undefined || x.controls.continutiyR.value == null) {
          x.controls.continutiyR.setValue('NA');
        }
        if (x.controls.circuitMake.value == '' || x.controls.circuitMake.value == undefined || x.controls.circuitMake.value == null) {
          x.controls.circuitMake.setValue('NA');
        }
        if (x.controls.circuitStandardNo.value == '' || x.controls.circuitStandardNo.value == undefined || x.controls.circuitStandardNo.value == null) {
          x.controls.circuitStandardNo.setValue('NA');
        }
        if (x.controls.numberOfPoles.value == '' || x.controls.numberOfPoles.value == undefined || x.controls.numberOfPoles.value == null) {
          x.controls.numberOfPoles.setValue('NA');
        }
        if (x.controls.conductorInstallation.value == '' || x.controls.conductorInstallation.value == undefined || x.controls.conductorInstallation.value == null) {
          x.controls.conductorInstallation.setValue('NA');
        }
        if (x.controls.circuitType.value == '' || x.controls.circuitType.value == undefined || x.controls.circuitType.value == null) {
          x.controls.circuitType.setValue('NA');
        }
        if (x.controls.circuitCurrentCurve.value == '' || x.controls.circuitCurrentCurve.value == undefined || x.controls.circuitCurrentCurve.value == null) {
          x.controls.circuitCurrentCurve.setValue('NA');
        }
        // if (x.circuitType == '') {
        //   x.circuitType = 'NA';
        // }
        if (x.controls.circuitRating.value == '' || x.controls.circuitRating.value == undefined || x.controls.circuitRating.value == null) {
          x.controls.circuitRating.setValue('NA');
        }
        if (x.controls.circuitBreakingCapacity.value == '' || x.controls.circuitBreakingCapacity.value == undefined || x.controls.circuitBreakingCapacity.value == null) {
          x.controls.circuitBreakingCapacity.setValue('NA');
        }
        if (x.controls.shortCircuitSetting.value == '' || x.controls.shortCircuitSetting.value == undefined || x.controls.shortCircuitSetting.value == null) {
          x.controls.shortCircuitSetting.setValue('NA');
        }
        if (x.controls.eFSetting.value == '' || x.controls.eFSetting.value == undefined || x.controls.eFSetting.value == null) {
          x.controls.eFSetting.setValue('NA');
        }
        if (x.controls.conductorPhase.value == '' || x.controls.conductorPhase.value == undefined || x.controls.conductorPhase.value == null) {
          x.controls.conductorPhase.setValue('NA');
        }
        if (x.controls.conductorNeutral.value == '' || x.controls.conductorNeutral.value == undefined || x.controls.conductorNeutral.value == null) {
          x.controls.conductorNeutral.setValue('NA');
        }
        if (x.controls.circuitDesc.value == '' || x.controls.circuitDesc.value == undefined || x.controls.circuitDesc.value == null) {
          x.controls.circuitDesc.setValue('NA');
        }
        if (x.controls.rcdTestButtonOperation.value == '' || x.controls.rcdTestButtonOperation.value == undefined || x.controls.rcdTestButtonOperation.value == null) {
          x.controls.rcdTestButtonOperation.setValue('NA');
        }
        if (x.controls.rcdRemarks.value == '' || x.controls.rcdRemarks.value == undefined || x.controls.rcdRemarks.value == null) {
          x.controls.rcdRemarks.setValue('NA');
        }
        if (x.controls.rcdType.value == '' || x.controls.rcdType.value == undefined || x.controls.rcdType.value == null) {
          x.controls.rcdType.setValue('NA');
        }

        if (x.controls.rcdCurrent.value == '' || x.controls.rcdCurrent.value == undefined || x.controls.rcdCurrent.value == null) {
          x.controls.rcdCurrent.setValue('NA');
        }

        if (x.controls.rcdOperatingCurrent.value == '' || x.controls.rcdOperatingCurrent.value == undefined || x.controls.rcdOperatingCurrent.value == null) {
          x.controls.rcdOperatingCurrent.setValue('NA');
        }
        if (x.controls.rcdOperatingFiveCurrent.value == '' || x.controls.rcdOperatingFiveCurrent.value == undefined || x.controls.rcdOperatingFiveCurrent.value == null) {
          x.controls.rcdOperatingFiveCurrent.setValue('NA');
        }
      }
      // coma saparated value for second table  
      for (let n of this.testingRecords.controls) {
        let arr: any = [];
        let arr1: any = [];
        let arr2: any = [];
        let arr3: any = [];
        let arr4: any = [];
        arr4.push(
          n.controls.rycontinutiy.value,
          n.controls.rbcontinutiy.value,
          n.controls.ybcontinutiy.value,
          n.controls.rncontinutiy.value,
          n.controls.yncontinutiy.value,
          n.controls.bncontinutiy.value,
          n.controls.rpecontinutiy.value,
          n.controls.ypecontinutiy.value,
          n.controls.bpecontinutiy.value
        );
        arr.push(
          n.controls.ryVoltage.value,
          n.controls.rbVoltage.value,
          n.controls.ybVoltage.value,
          n.controls.rnVoltage.value,
          n.controls.ynVoltage.value,
          n.controls.bnVoltage.value,
          n.controls.rpeVoltage.value,
          n.controls.ypeVoltage.value,
          n.controls.bpeVoltage.value

        );
        arr1.push(
          n.controls.ryLoopImpedance.value,
          n.controls.rbLoopImpedance.value,
          n.controls.ybLoopImpedance.value,
          n.controls.rnLoopImpedance.value,
          n.controls.ynLoopImpedance.value,
          n.controls.bnLoopImpedance.value,
          n.controls.rpeLoopImpedance.value,
          n.controls.ypeLoopImpedance.value,
          n.controls.bpeLoopImpedance.value
        );
        arr2.push(
          n.controls.ryFaultCurrent.value,
          n.controls.rbFaultCurrent.value,
          n.controls.ybFaultCurrent.value,
          n.controls.rnFaultCurrent.value,
          n.controls.ynFaultCurrent.value,
          n.controls.bnFaultCurrent.value,
          n.controls.rpeFaultCurrent.value,
          n.controls.ypeFaultCurrent.value,
          n.controls.bpeFaultCurrent.value
        );
        arr3.push(
          n.controls.ryDisconnect.value,
          n.controls.rbDisconnect.value,
          n.controls.ybDisconnect.value,
          n.controls.rnDisconnect.value,
          n.controls.ynDisconnect.value,
          n.controls.bnDisconnect.value,
          n.controls.rpeDisconnect.value,
          n.controls.ypeDisconnect.value,
          n.controls.bpeDisconnect.value
        );
        let testVoltage: String = '';
        let testLoopImpedance: String = '';
        let testFaultCurrent: String = '';
        let disconnectionTime: String = '';
        let insulationResistance: String = '';

        for (let x of arr4) {
          if (x != '' && x != undefined && x != null) {
            insulationResistance += x + ',';
          } else {
            insulationResistance += 'NA,';
          }
        }
        insulationResistance = insulationResistance.replace(/,\s*$/, '');
        n.controls.insulationResistance.setValue(insulationResistance);

        for (let a of arr) {
          if (a != '' && a != undefined && a != null) {
            testVoltage += a + ',';
          } else {
            testVoltage += 'NA,';
          }
        }
        testVoltage = testVoltage.replace(/,\s*$/, '');
        n.controls.testVoltage.setValue(testVoltage);
        
        for (let b of arr1) {
          if (b != '' && b != undefined && b != null) {
            testLoopImpedance += b + ',';
          }
          else {
            testLoopImpedance += 'NA,';
          }
        }
        testLoopImpedance = testLoopImpedance.replace(/,\s*$/, '');
        n.controls.testLoopImpedance.setValue(testLoopImpedance);

        for (let c of arr2) {
          if (c != '' && c != undefined && c != null) {
            testFaultCurrent += c + ',';
          } else {
            testFaultCurrent += 'NA,';
          }
        }

        testFaultCurrent = testFaultCurrent.replace(/,\s*$/, '');
        n.controls.testFaultCurrent.setValue(testFaultCurrent);

        for (let d of arr3) {
          if (d != '' && d != undefined && d != null) {
            disconnectionTime += d + ',';
          } else {
            disconnectionTime += 'NA,';
          }
        }
        disconnectionTime = disconnectionTime.replace(/,\s*$/, '');
        n.controls.disconnectionTime.setValue(disconnectionTime);
      }
      }
    }
 //if(!flag){
    for (let i of this.testaccordianArr.controls) {
      this.testDistRecords1 = i.get('testDistRecords') as FormArray;
      for(let v of this.testDistRecords1.controls){
        this.observationArr = v.get('testingInnerObservation') as FormArray;
        this.testingRecords = v.get('testingRecords') as FormArray;
        for(let z=0; z < this.testingRecords.length; z++){
         this.observationArr.controls[z].controls.observationComponentDetails.setValue('circuit');
         if(this.testingRecords.controls[z].controls.rcdRemarks.value == '' 
         || this.testingRecords.controls[z].controls.rcdRemarks.value == undefined 
          || this.testingRecords.controls[z].controls.rcdRemarks.value == null) {
          this.testingRecords.controls[z].controls.rcdRemarks.setValue('NA');
         }
         this.observationArr.controls[z].controls.observationDescription.setValue(this.testingRecords.controls[z].controls.rcdRemarks.value);
        }
      }
    }
  //}
    //from saved report update
    for(let i of this.pushJsonArray) {
      if(this.testList.testingReport != null && this.testList.testingReport != undefined ) {
        for(let j of this.testList.testingReport.testIncomingDistribution) {
          if(j.sourceFromSupply == i.sourceFromSupply){
            i.incomingDistributionId = j.incomingDistributionId;
          }
        }
      }
    }

    //Not from saved report update
    for(let i of this.pushJsonArray) {
      if(this.testList1 != null  && this.testList1.testIncomingDistribution != undefined) {
        for(let j of this.testList1.testIncomingDistribution) {
          if(j.sourceFromSupply == i.sourceFromSupply){
            i.incomingDistributionId = j.incomingDistributionId;
          }
        }
      }
    }
    this.testingDetails.testIncomingDistribution=this.pushJsonArray;
    this.testingDetails.testing = this.testingForm.value.testaccordianArr;

    if (flag) {
      if(this.testingForm.dirty){
        //Testing Equipment 
        for(let i of this.deletedTestingEquipment) {
          for(let j of this.testingDetails.testing) {
            for(let k of j.testingEquipment) {
              if(k.testingId == i.testingId) {
                if(k.equipmentId != i.equipmentId) {
                  this.deleteDataFlag = true;
                }
                else {
                  this.deleteDataFlag = false;
                }
              }
            }
            if(this.deleteDataFlag) {
              j.testingEquipment.push(i);
              this.deleteDataFlag = false;
            }
          }
        }
        //Testing Records
        for(let i of this.deletedTestingRecord) {
          for(let j of this.testingDetails.testing) {
            for(let l of j.testDistRecords) {
              for(let k of l.testingRecords) {
                if(k.testingId == i.testingId && k.testDistRecordId == i.testDistRecordId) {
                  if(k.testingRecordId != i.testingRecordId) {
                    this.deleteRecordDataFlag = true;
                  }
                  else {
                    this.deleteRecordDataFlag = false;
                  }
                }
              }
              if(this.deleteRecordDataFlag) {
                l.testingRecords.push(i);
                this.deleteRecordDataFlag = false;
              }
            }
          }
        }
//observation
        for(let i of this.deletedObservationArr) {
          for(let j of this.testingDetails.testing) {
            for(let l of j.testDistRecords) {
              for(let k of l.testingInnerObservation) {
                if(k.testingId == i.testingId && k.testDistRecordId == i.testDistRecordId) {
                  if(k.testingInnerObervationsId != i.testingInnerObervationsId) {
                    this.deleteObRecordDataFlag = true;
                  }
                  else {
                    this.deleteObRecordDataFlag = false;
                  }
                }
              }
              if(this.deleteObRecordDataFlag) {
                l.testingInnerObservation.push(i);
                this.deleteObRecordDataFlag = false;
              }
            }
          }
        }
      this.UpateInspectionService.updateTesting(this.testingDetails).subscribe(
        data => {
          this.popup=true;
          this.finalSpinner=false;
          this.success = true;
          this.service.isCompleted4= true;
          this.service.isLinear=false;
          this.successMsg = data;
          this.testingForm.markAsPristine();
          this.service.windowTabClick=0;
       this.service.logoutClick=0; 
       this.service.lvClick=0; 
       this.testingService.retrieveTesting(this.testingDetails.siteId,this.testingDetails.userName).subscribe(
        data=>{
         this.retrieveDetailsforTesting(this.testingDetails.userName,this.testingDetails.siteId,data);
        }
      )
        },
        (error) => {
          this.popup=true;
          this.finalSpinner=false;
          this.Error = true;
          this.service.isCompleted4= false;
        this.service.isLinear=true;
          this.errorArr = [];
          this.errorArr = JSON.parse(error.error);
          this.errorMsg = this.errorArr.message;
        });
      }
    }
    else {
      this.testingService.savePeriodicTesting(this.testingDetails).subscribe(
        (data) => {
          this.proceedNext.emit(true);
          // show success message ofter click button
          this.popup=true;
          this.finalSpinner=false;
          this.success = true;
          this.successMsg = data;
          this.service.isCompleted4= true;
          this.service.isLinear=false;
          this.testingForm.markAsPristine();
          this.service.windowTabClick=0;
       this.service.logoutClick=0; 
       this.service.lvClick=0; 
          this.testingService.retrieveTesting(this.testingDetails.siteId,this.testingDetails.userName).subscribe(
            data=>{
             this.retrieveDetailsforTesting(this.testingDetails.userName,this.testingDetails.siteId,data);
            }
          )
         

          //  if(!this.observationFlag){
          //   this.observation.siteId = this.service.siteCount;
          //   this.observation.userName = this.router.snapshot.paramMap.get('email') || '{}';
          //   this.observation.observationComponent ="Testing-Component";
          //   this.observation.observations="No observation recorded"
          //   this.observationService.addObservation(this.observation).subscribe(
          //     (data) => {
          //       this.proceedNext.emit(true);
          //       this.observationService.retrieveObservation(this.observation.siteId,this.observation.observationComponent,this.observation.userName).subscribe(
          //         (data) => {
          //         this.retrieveFromObservationTesting(data);
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
          this.errorMsg = this.errorArr.message;
          this.service.isCompleted4= false;
          this.service.isLinear=true;    
        }
      );
    }
  }
}

