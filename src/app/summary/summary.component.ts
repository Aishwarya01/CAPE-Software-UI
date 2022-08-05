import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  ChangeDetectorRef,
  VERSION,
  ElementRef,
  ViewContainerRef,
  OnDestroy
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from '../model/user';
import { MatRadioChange } from '@angular/material/radio';
import { Summary } from '../model/summary';
import { SummarydetailsService } from '../services/summarydetails.service';
import { GlobalsService } from '../globals.service';
import { VerificationlvComponent } from '../verificationlv/verificationlv.component';
import { SiteService } from '../services/site.service';
import { InspectionVerificationService } from '../services/inspection-verification.service';
import { MainNavComponent } from '../main-nav/main-nav.component';
import { CommentsSection } from '../model/comments-section';
import { FinalreportsComponent } from '../finalreports/finalreports.component';
import { ComponentFactoryResolver } from '@angular/core';
import { LvInspectionDetailsComponent } from '../lv-inspection-details/lv-inspection-details.component';
import { LicenselistComponent } from '../licenselist/licenselist.component';
import { ObservationService } from '../services/observation.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { ConfirmationBoxComponent } from '../confirmation-box/confirmation-box.component';
import { SignatureComponent } from '../signature/signature.component';
import { SuperAdminProd } from 'src/environments/environment.prod';
import { SuperAdminDev } from 'src/environments/environment.dev';
import { SuperAdminLocal } from 'src/environments/environment';
import { element } from 'protractor';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit,OnDestroy {
  selectedValue: any;
  overallAssessmentInstallation: boolean = false;
  installations: string[] = ['Satisfactory', 'Unsatisfactory'];

  addsummary = new FormGroup({
   // limitationsInspection:  new FormControl(''),
    extentInstallation: new FormControl(''),
    agreedLimitations: new FormControl(''),
    agreedWith: new FormControl(''),
    operationalLimitations: new FormControl(''),
    //furtherActions: new FormControl(''),
    //referanceNumberReport: new FormControl(''),
    recommendationsDate: new FormControl(''),
    //comment: new FormControl(''),
    //recommendationsDate: new FormControl(''),
    //inspectionTestingDetailed: new FormControl(''),
    generalConditionInstallation: new FormControl(''),
    overallAssessmentInstallation: new FormControl(''),
  });
 
  selectedIndex = 0;

  ObservationsArr: any=[];
  dataSource: any = [];
  // newDivs: addDivisions[] = [];
  email: String = '';
  inActive: boolean = false;
  user = new User();
  isChecked: boolean = false;
  show: boolean = false;
  isVisible = -1;
  selectedField!: string;
  loclength: any;
  i: any;
  j: any;
  summary = new Summary();
  validationError: boolean = false;
  validationErrorMsg: String = '';
  // Second Tab dependencies
  panelOpenState = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  // ThirdFormGroup: FormGroup;
  // fourthFormGroup: FormGroup;
  disable: boolean = false;
  flag: boolean = false;
  // @Output("changeTab1") changeTab1: EventEmitter<any> = new EventEmitter();
  dataJSON: any = [];

  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  formBuilder: any;
  arrDesigner!: FormArray;
  //summarydetailsService:any;
  selectedType: any;
  addDivisions: any;
  filter: any;
  canViewDiv: any;
  radioButtonChange: any;
  submitted = false;
  summaryList: any = [];
  arr: any = [];
  limitationsValue!: String;
  //observationList: String[] = ['No remedial action required', 'The following observations are made'];
  // @ViewChild (FinalreportsComponent) final!: FinalreportsComponent;
  //@ViewChild (VerificationlvComponent) verification!: VerificationlvComponent;
  // @ViewChild('verify')
  // verification: any; 
  finalSpinner: boolean = true;
  popup: boolean = false;

  @Output() proceedNext = new EventEmitter<any>();
  fcname: string[] = [
    'obervationStatus',
    'observationsInspection',
    'observationsSupply',
    'observationsTesting',
    //'observations',
  ];
  errorArr: any=[];
  value: boolean= false;

  //comments starts
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
  completedCommentArr3: any = [];
  hideShowComment: boolean=false;
  //comments end
  validationErrorTab: boolean = false;
  validationErrorMsgTab: string="";
  finalFlag: boolean = false;
  confirmMsg: string="";
  SubmitDisable: boolean = false;
  StepError: boolean = false;
  StepErrorMsg: string="";
  showSubmit: boolean = false;
  AllFilled: boolean = false;
  disableSubmit: boolean = false;
  modalReference: any;
  tabError: boolean = false;
  tabErrorMsg: string="";
  ConfirmSuccess: boolean= false;

  //@ViewChild('picker',{static:false}) picker!: ElementRef;
  @ViewChild('ref', { read: ViewContainerRef })
  viewContainerRef!: ViewContainerRef;
  deletedArr: any = [];
  ObservationsSumaryArr: any=[];
  observationsMade: boolean= false;
  NoRemedial: boolean= false;
  inspectionArr: any = [];
  testingArr: any = [];
  summaryObervation: any = [];
  alternateArr: any= [];
  yesObserveSupply: boolean= false;
  noObserveSupply: boolean= true;

  yesObserveInspection: boolean= false;
  noObserveInspection: boolean= true;

  yesObserveTesting: boolean= false;
  noObserveTesting: boolean= true;
  signarr: any;
  signarr1: any;

  //superAdmin 
  prodAdmin = new SuperAdminProd();
  devAdmin = new SuperAdminDev();
  localAdmin = new SuperAdminLocal();
  submitButton: boolean = false;
  constructor(
    private _formBuilder: FormBuilder,
    private modalService: NgbModal,
    private dialog: MatDialog,
    private router: ActivatedRoute,
    private summarydetailsService: SummarydetailsService,
    public service: GlobalsService,
    public siteService: SiteService,
    private ChangeDetectorRef: ChangeDetectorRef,
    private observationService: ObservationService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private final: VerificationlvComponent,
    private UpateInspectionService: InspectionVerificationService,
    private basic: MainNavComponent,
  ) {
    this.email = this.router.snapshot.paramMap.get('email') || '{}';

    for( let i=0; i<this.devAdmin.adminEmail.length; i++){
      if(this.devAdmin.adminEmail[i] == this.email)
      {
        this.submitButton = true;
      }
    }

    for( let i=0; i<this.prodAdmin.adminEmail.length; i++){
      if(this.prodAdmin.adminEmail[i] == this.email)
      {
        this.submitButton = true;
      }
    }

    // for( let i=0; i<this.localAdmin.adminEmail.length; i++){
    //   if(this.localAdmin.adminEmail[i] == this.email)
    //   {
    //     this.submitButton = true;
    //   }
    // }
  }
  ngOnDestroy(): void {
    this.service.allFieldsDisable = false; 
    this.service.disableSubmitSummary=false;
    this.service.isCompleted5= true;
    this.service.isLinear=false;
    this.service.editable=true;
    this.service.lvClick=0;
    this.service.logoutClick=0;
    this.service.windowTabClick=0;
    this.service.signatureImg5="";
    this.service.signatureImg6="";
  }

  ngOnInit(): void {
    this.currentUser=sessionStorage.getItem('authenticatedUser');
    this.currentUser1 = [];
    this.currentUser1=JSON.parse(this.currentUser);
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      retrieveIsActive: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
      clientname: ['', Validators.required],
    });

    this.addsummary = this._formBuilder.group({
      //limitationsInspection: ['', Validators.required],
      extentInstallation: ['', Validators.required],
      agreedLimitations: ['', Validators.required],
      agreedWith: ['', Validators.required],
      operationalLimitations: ['', Validators.required],
      //recommendationsDate: ['', Validators.required],
     // inspectionTestingDetailed: ['', Validators.required],
      generalConditionInstallation: ['', Validators.required],
      overallAssessmentInstallation: ['', Validators.required],
     // furtherActions: ['', Validators.required],
     // referanceNumberReport: [''],
      recommendationsDate: ['', Validators.required],
      //comment: ['', Validators.required],
      Declaration1Arr: this._formBuilder.array([this.Declaration1Form()]),
      Declaration2Arr: this._formBuilder.array([this.Declaration2Form()]),
      ObservationsArr: this._formBuilder.array([this.ObservationsForm()]),
      summaryObervation: this._formBuilder.array([]),
      viewerCommentArr: this._formBuilder.array([this.addCommentViewer()]),
      completedCommentArr1: this._formBuilder.array([]),
    });
    this.summaryObervation=this.addsummary.get('summaryObervation') as FormArray;
    for(let i=0; i<4; i++){
      this.summaryObervation.push(this.summaryObservationsForm());
    }
    this.summaryObervation.controls[0].controls.observationComponentDetails.setValue('mainsObservations');
    this.summaryObervation.controls[1].controls.observationComponentDetails.setValue('earthElectrodeObservations');
    this.summaryObervation.controls[2].controls.observationComponentDetails.setValue('boundingObservations');
    this.summaryObervation.controls[3].controls.observationComponentDetails.setValue('earthingObservations');

    this.refresh();
    this.expandedIndex = -1 ;
    this.retreiveFromObservation();
    // this.Declaration2Arr = this.addsummary.get('Declaration2Arr') as FormArray;
  }
  // ngAfterViewInit(){
  //   this.picker.nativeElement.open()
  // }
  refresh() {
    this.ChangeDetectorRef.detectChanges();
  }
 
  reset(){
    this.addsummary.reset();
    }

/*e-siganture starts in progress*/ 
SignatureDesigner1(){
  const dialogRef =this.dialog.open(SignatureComponent, {
      maxHeight: '90vh',
      disableClose: true,
    });
    dialogRef.componentInstance.sigImg1 = false;
    dialogRef.componentInstance.sigImg2 = false;
    dialogRef.componentInstance.sigImg3 = false;
    dialogRef.componentInstance.sigImg4 = false;
    dialogRef.componentInstance.sigImg5 = true;
    dialogRef.componentInstance.sigImg6 = false;
  }
  focusSigDesigner1(a: any){
   if(a.controls.signature.value!=""){
     return a.controls.signature.markAsDirty();
    }
  }
  
  SignatureDesigner2(){
    const dialogRef =this.dialog.open(SignatureComponent, {
      maxHeight: '90vh',
      disableClose: true,
    });
    dialogRef.componentInstance.sigImg1 = false;
    dialogRef.componentInstance.sigImg2 = false;
    dialogRef.componentInstance.sigImg3 = false;
    dialogRef.componentInstance.sigImg4 = false;
    dialogRef.componentInstance.sigImg5 = false;
    dialogRef.componentInstance.sigImg6 = true;
  }
  focusSigDesigner2(a: any){
    if(a.controls.signature.value!=""){
      return a.controls.signature.markAsDirty();
     }
  }
/*e-siganture ends*/

  retreiveFromObservation(){
    if(this.service.siteCount!=0 && this.service.siteCount!=undefined){
    this.observationService.retrieveObservationSummary(this.service.siteCount, this.email).subscribe(
      (data) => {
        this.ObservationsSumaryArr=JSON.parse(data);
        let ObservationsSumaryValueArr:any=[];
        ObservationsSumaryValueArr = this.addsummary.get('ObservationsArr') as FormArray;
        for(let i of ObservationsSumaryValueArr.controls){
          let alternateArr: any = [];
          alternateArr = i.controls.alternateArr as FormArray
          alternateArr.controls = [];
          alternateArr.value = [];

          this.inspectionArr = [];
          this.inspectionArr = i.controls.inspectionArr as FormArray;
          this.inspectionArr.controls = [];
          this.inspectionArr.value = [];

          this.testingArr = [];
           this.testingArr = i.controls.testingArr as FormArray;
           this.testingArr.controls = [];
          this.testingArr.value = [];

         if(this.ObservationsSumaryArr.supplyOuterObservation != null) {
          this.yesObserveSupply=true;
          this.noObserveSupply=false;
           for(let j of this.ObservationsSumaryArr.supplyOuterObservation) {
             if(j.observationComponentDetails == 'mains') {
              i.controls['mainsComment'].setValidators(Validators.required);
              i.controls['mainsComment'].updateValueAndValidity();
              i.controls['mainsFurtherActions'].setValidators(Validators.required);
              i.controls['mainsFurtherActions'].updateValueAndValidity();

              i.controls.mainsObservations.setValue(j.observationDescription);
             }
             else if(j.observationComponentDetails == 'instalLocationReportOb') {
              i.controls['electrodeComment'].setValidators(Validators.required);
              i.controls['electrodeComment'].updateValueAndValidity();
              i.controls['electrodeFurtherActions'].setValidators(Validators.required);
              i.controls['electrodeFurtherActions'].updateValueAndValidity();

               i.controls.earthElectrodeObservations.setValue(j.observationDescription);
             }
             else if(j.observationComponentDetails == 'bondingNoOfJointsOb') {
              i.controls['bondingComment'].setValidators(Validators.required);
              i.controls['bondingComment'].updateValueAndValidity();
              i.controls['bondingFurtherActions'].setValidators(Validators.required);
              i.controls['bondingFurtherActions'].updateValueAndValidity();

               i.controls.bondingConductorObservations.setValue(j.observationDescription);
             }
             else if(j.observationComponentDetails == 'earthingNoOfJointsOb') {
              i.controls['earthingComment'].setValidators(Validators.required);
              i.controls['earthingComment'].updateValueAndValidity();
              i.controls['earthingFurtherActions'].setValidators(Validators.required);
              i.controls['earthingFurtherActions'].updateValueAndValidity();

               i.controls.earthingConductorObservations.setValue(j.observationDescription);
             }
             else if(j.observationComponentDetails == 'alternate') {
               //i.controls.observationsSupply.setValue(j.observationDescription);
               if(j.alternativeInnerObservation.length != 0) {
                 let alternateArr: any = [];
                 for(let k=0;k<j.alternativeInnerObservation.length; k++) {
                   alternateArr = i.controls.alternateArr;
                   alternateArr.push(this.alternateObservationsForm());
                 }
                 for(let k=0;k<j.alternativeInnerObservation.length; k++) {
                   let alternateArr = i.controls.alternateArr;
                   alternateArr.controls[k].controls.observations.setValue(j.alternativeInnerObservation[k].observationDescription);
                   alternateArr.controls[k].controls.observationComponentDetails.setValue(j.alternativeInnerObservation[k].observationComponentDetails);
                   alternateArr.controls[k].controls.referenceId.setValue(j.alternativeInnerObservation[k].supplyInnerObervationsId);

                  }
               }
             }
           }
          }  
          else{
            this.yesObserveSupply=false;
            this.noObserveSupply=true;
          }
          if(this.ObservationsSumaryArr.inspectionOuterObservation != null) {
            this.yesObserveInspection=true;
            this.noObserveInspection=false;
           this.inspectionArr = [];
           this.inspectionArr = i.controls.inspectionArr as FormArray;
            for(let j of this.ObservationsSumaryArr.inspectionOuterObservation) {
              this.inspectionArr.push(this.inspectionOuterObservationsForm(j))
            }
          }
          else{
            this.yesObserveInspection=false;
            this.noObserveInspection=true;
          }
          if(this.ObservationsSumaryArr.testingInnerObservation != null) {
            this.yesObserveTesting=true;
            this.noObserveTesting=false;
           this.testingArr = [];
           this.testingArr = i.controls.testingArr as FormArray;
            for(let j of this.ObservationsSumaryArr.testingInnerObservation) {
              this.testingArr.push(this.testingObservationsForm(j))
            }
          }
          else{
            this.yesObserveTesting=false;
            this.noObserveTesting=true;
          }
        } 
        //old code
       //  let count=0;
       //  for(let i of this.ObservationsSumaryArr){
       //   if(i.observations=='No observation recorded'){
       //    count++;
       //   }
       //  }
       //  if(count==3){
       // this.observationsMade=true;
       // this.NoRemedial=false;
       //  }
       //  else{
       //   this.observationsMade=false;
       //   this.NoRemedial=true;
       //  }
       //  let ObservationsSumaryValueArr:any=[];
       //   ObservationsSumaryValueArr = this.addsummary.get(
       //   'ObservationsArr'
       // ) as FormArray;
       //  for(let i of ObservationsSumaryValueArr.controls){
       //   for(let j of this.ObservationsSumaryArr){
       //     if(j.observationComponent=='Supply-Component'){
       //       i.controls.observationsSupply.setValue(j.observations);
       //     }
       //     else if(j.observationComponent=='Inspection-Component'){
       //       i.controls.observationsInspection.setValue(j.observations);
       //     }
       //     else if(j.observationComponent=='Testing-Component'){
       //       i.controls.observationsTesting.setValue(j.observations);
       //     }
       //    }
       //  }
       },
      (error) => {
        this.errorArr = [];
        this.Error = true;
        this.errorArr = JSON.parse(error.error);
        this.errorMsg = this.errorArr.message;
      }
    )
  }
  }

  navigateToStep(index: any) {
    this.final.navigateStep(index);
  }

  retrieveFromOngoingForObservation(siteId:any){
    if(siteId!=0 && siteId!=undefined){
      this.observationService.retrieveObservationSummary(siteId, this.email).subscribe(
        (data) => {
         this.ObservationsSumaryArr=JSON.parse(data);
         let ObservationsSumaryValueArr:any=[];
         ObservationsSumaryValueArr = this.addsummary.get('ObservationsArr') as FormArray;
         for(let i of ObservationsSumaryValueArr.controls){
           let alternateArr: any = [];
           alternateArr = i.controls.alternateArr as FormArray
           alternateArr.controls = [];
           alternateArr.value = [];

           this.inspectionArr = [];
           this.inspectionArr = i.controls.inspectionArr as FormArray;
           this.inspectionArr.controls = [];
           this.inspectionArr.value = [];

           this.testingArr = [];
            this.testingArr = i.controls.testingArr as FormArray;
            this.testingArr.controls = [];
           this.testingArr.value = [];

          if(this.ObservationsSumaryArr.supplyOuterObservation != null) {
            this.yesObserveSupply=true;
            this.noObserveSupply=false;
            for(let j of this.ObservationsSumaryArr.supplyOuterObservation) {
              if(j.observationComponentDetails == 'mains') {
                i.controls['mainsComment'].setValidators(Validators.required);
                i.controls['mainsComment'].updateValueAndValidity();
                i.controls['mainsFurtherActions'].setValidators(Validators.required);
                i.controls['mainsFurtherActions'].updateValueAndValidity();

                i.controls.mainsObservations.setValue(j.observationDescription);
              }
              else if(j.observationComponentDetails == 'instalLocationReportOb') {
                i.controls['electrodeComment'].setValidators(Validators.required);
                i.controls['electrodeComment'].updateValueAndValidity();
                i.controls['electrodeFurtherActions'].setValidators(Validators.required);
                i.controls['electrodeFurtherActions'].updateValueAndValidity();

                i.controls.earthElectrodeObservations.setValue(j.observationDescription);
              }
              else if(j.observationComponentDetails == 'bondingNoOfJointsOb') {
                i.controls['bondingComment'].setValidators(Validators.required);
                i.controls['bondingComment'].updateValueAndValidity();
                i.controls['bondingFurtherActions'].setValidators(Validators.required);
                i.controls['bondingFurtherActions'].updateValueAndValidity();

                i.controls.bondingConductorObservations.setValue(j.observationDescription);
              }
              else if(j.observationComponentDetails == 'earthingNoOfJointsOb') {
                i.controls['earthingComment'].setValidators(Validators.required);
                i.controls['earthingComment'].updateValueAndValidity();
                i.controls['earthingFurtherActions'].setValidators(Validators.required);
                i.controls['earthingFurtherActions'].updateValueAndValidity();

                i.controls.earthingConductorObservations.setValue(j.observationDescription);
              }
              else if(j.observationComponentDetails == 'alternate') {
                //i.controls.observationsSupply.setValue(j.observationDescription);
                if(j.alternativeInnerObservation.length != 0) {
                  let alternateArr: any = [];
                  for(let k=0;k<j.alternativeInnerObservation.length; k++) {
                    alternateArr = i.controls.alternateArr;
                    alternateArr.push(this.alternateObservationsForm());
                  }
                  for(let k=0;k<j.alternativeInnerObservation.length; k++) {
                    let alternateArr = i.controls.alternateArr;
                    alternateArr.controls[k].controls.observations.setValue(j.alternativeInnerObservation[k].observationDescription);
                    alternateArr.controls[k].controls.observationComponentDetails.setValue(j.alternativeInnerObservation[k].observationComponentDetails);
                    alternateArr.controls[k].controls.referenceId.setValue(j.alternativeInnerObservation[k].supplyInnerObervationsId);

                  }
                }
              }
            }
           }  
           else{
            this.yesObserveSupply=false;
            this.noObserveSupply=true;
          }
           if(this.ObservationsSumaryArr.inspectionOuterObservation != null) {
            this.yesObserveInspection=true;
            this.noObserveInspection=false;
            this.inspectionArr = [];
            this.inspectionArr = i.controls.inspectionArr as FormArray;
             for(let j of this.ObservationsSumaryArr.inspectionOuterObservation) {
               this.inspectionArr.push(this.inspectionOuterObservationsForm(j))
             }
           }
           else{
            this.yesObserveInspection=false;
            this.noObserveInspection=true;
          }
           if(this.ObservationsSumaryArr.testingInnerObservation != null) {
            this.yesObserveTesting=true;
            this.noObserveTesting=false;
            this.testingArr = [];
            this.testingArr = i.controls.testingArr as FormArray;
             for(let j of this.ObservationsSumaryArr.testingInnerObservation) {
               this.testingArr.push(this.testingObservationsForm(j))
             }
           }
           else{
            this.yesObserveTesting=false;
            this.noObserveTesting=true;
          }
         } 
         //old code
        //  let count=0;
        //  for(let i of this.ObservationsSumaryArr){
        //   if(i.observations=='No observation recorded'){
        //    count++;
        //   }
        //  }
        //  if(count==3){
        // this.observationsMade=true;
        // this.NoRemedial=false;
        //  }
        //  else{
        //   this.observationsMade=false;
        //   this.NoRemedial=true;
        //  }
        //  let ObservationsSumaryValueArr:any=[];
        //   ObservationsSumaryValueArr = this.addsummary.get(
        //   'ObservationsArr'
        // ) as FormArray;
        //  for(let i of ObservationsSumaryValueArr.controls){
        //   for(let j of this.ObservationsSumaryArr){
        //     if(j.observationComponent=='Supply-Component'){
        //       i.controls.observationsSupply.setValue(j.observations);
        //     }
        //     else if(j.observationComponent=='Inspection-Component'){
        //       i.controls.observationsInspection.setValue(j.observations);
        //     }
        //     else if(j.observationComponent=='Testing-Component'){
        //       i.controls.observationsTesting.setValue(j.observations);
        //     }
        //    }
        //  }
        },
        (error) => {
        }
      )
    }
  }

  onservationChangedDetection() {
    if(this.service.siteCount!=0 && this.service.siteCount!=undefined){
      this.observationService.retrieveObservationSummary(this.service.siteCount, this.email).subscribe(
        data => {
          debugger
          this.ObservationsSumaryArr=JSON.parse(data);
          let ObservationsSumaryValueArr:any=[];
          ObservationsSumaryValueArr = this.addsummary.get('ObservationsArr') as FormArray;
          for(let i of ObservationsSumaryValueArr.controls){
            for(let j of this.ObservationsSumaryArr.supplyOuterObservation) {
              if(j.observationComponentDetails == 'mains') {
                i.controls.mainsObservations.setValue(j.observationDescription)
              }
              else if(j.observationComponentDetails == 'instalLocationReportOb') {
                i.controls.earthElectrodeObservations.setValue(j.observationDescription);
              }
              else if(j.observationComponentDetails == 'bondingNoOfJointsOb') {
                i.controls.bondingConductorObservations.setValue(j.observationDescription);
              }
              else if(j.observationComponentDetails == 'earthingNoOfJointsOb') {
                i.controls.earthingConductorObservations.setValue(j.observationDescription);
              } 
              else if(j.observationComponentDetails == 'alternate') {
                if(j.alternativeInnerObservation.length != 0) {
                  let alternateArr: any = [];
                  alternateArr = i.controls.alternateArr;

                  if(j.alternativeInnerObservation.length == i.controls.alternateArr.length) {
                    for(let k=0;k<alternateArr.length; k++) {
                      if(alternateArr.controls[k].controls.referenceId.value == j.alternativeInnerObservation[k].supplyInnerObervationsId) {
                        alternateArr.controls[k].controls.observations.setValue(j.alternativeInnerObservation[k].observationDescription);
                      } 
                      else {
                        alternateArr.controls[k].reset();
                        alternateArr.controls[k].controls.observations.setValue(j.alternativeInnerObservation[k].observationDescription);
                        alternateArr.controls[k].controls.observationComponentDetails.setValue(j.alternativeInnerObservation[k].observationComponentDetails);
                        alternateArr.controls[k].controls.referenceId.setValue(j.alternativeInnerObservation[k].supplyInnerObervationsId);
                      }                                      
                    }
                  }
                  else{
                    for(let k=i.controls.alternateArr.length ;k<j.alternativeInnerObservation.length; k++) {
                      alternateArr.push(this.alternateObservationsForm());
                    }

                    for(let k=0;k<alternateArr.length; k++) {
                      if(alternateArr.controls[k].controls.referenceId.value == j.alternativeInnerObservation[k].supplyInnerObervationsId) {
                        alternateArr.controls[k].controls.observations.setValue(j.alternativeInnerObservation[k].observationDescription);
                      }    
                      else {
                       let tempArr: any= [];
                       let count=0;
                       let indexValue: any;
                       j.alternativeInnerObservation.forEach((element: any,index: any) => {
                        if(alternateArr.controls[k].controls.referenceId.value == element.supplyInnerObervationsId) {
                          console.log(index);
                          count++;
                          indexValue = index;
                          // tempArr.push()
                          // for(let y=k; y<alternateArr.length; y++) {
                          //   tempArr.push(alternateArr.controls[y]);
                          //   alternateArr.removeAt(y);
                          // }
                        }
                       })
                       if(count==0) {
                        alternateArr.controls[k].reset();
                        alternateArr.controls[k].controls.observations.setValue(j.alternativeInnerObservation[k].observationDescription);
                        alternateArr.controls[k].controls.observationComponentDetails.setValue(j.alternativeInnerObservation[k].observationComponentDetails);
                        alternateArr.controls[k].controls.referenceId.setValue(j.alternativeInnerObservation[k].supplyInnerObervationsId);
                       }
                       else {
                        alternateArr.controls[k].controls.observations.setValue(j.alternativeInnerObservation[indexValue].observationDescription);
                       }


                      }    
                              
                    }
                  }
                  
                  // for(let k=0;k<j.alternativeInnerObservation.length; k++) {
                  //   alternateArr = i.controls.alternateArr;
                  //   alternateArr.push(this.alternateObservationsForm());
                  // }
                  // for(let k=0;k<j.alternativeInnerObservation.length; k++) {
                  //   let alternateArr = i.controls.alternateArr;
                  //   alternateArr.controls[k].controls.observations.setValue(j.alternativeInnerObservation[k].observationDescription);
                  //   alternateArr.controls[k].controls.observationComponentDetails.setValue(j.alternativeInnerObservation[k].observationComponentDetails);
                          
                  // }
                }
                else {

                }
              }
  
            }
          }

          
          
        },
        error => {
          
        }
      )
      }
  }

   reloadFromBack(){
    if(this.addsummary.invalid){
     this.service.isCompleted5= false;
     this.service.isLinear=true;
     this.service.editable=false;
     this.validationErrorTab = true;
     this.validationErrorMsgTab= 'Please check all the fields in summary';
     setTimeout(() => {
       this.validationErrorTab = false;
     }, 3000);
     return false;
    }
    else{
      this.service.isCompleted= true;
      this.service.isLinear=false;
      this.service.editable=true;
   this.addsummary.markAsPristine();
   return true;
    }
  }
  retrieveDetailsfromSavedReports(userName: any,siteId: any,clientName: any,departmentName: any,site: any,data: any){
       this.summaryList = JSON.parse(data);
       this.summary.siteId = siteId;
       this.summary.summaryId = this.summaryList.summary.summaryId;
       this.summary.createdBy = this.summaryList.summary.createdBy;
       this.summary.createdDate = this.summaryList.summary.createdDate;
        this.yesObserveSupply= true;
        this.noObserveSupply= false;

        this.yesObserveInspection= true;
        this.noObserveInspection= false;

        this.yesObserveTesting= true;
        this.noObserveTesting= false;
              // this.summary.limitationsInspection = this.summaryList.summary.limitationsInspection;
      // this.limitationsValue = this.summaryList.summary.limitationsInspection;
      //  this.summary.furtherActions = this.summaryList.summary.furtherActions,
      //  this.summary.referanceNumberReport = this.summaryList.summary.referanceNumberReport,
       this.summary.recommendationsDate = this.summaryList.summary.recommendationsDate;
       //this.summary.comment = this.summaryList.summary.comment,
       //this.onChange(this.limitationsValue);
       for(let i of this.summaryList.summary.summaryDeclaration) {
         if(i.declarationRole == "Inspector") {
          this.signarr=[i];
          this.signarr[0].signature=atob(i.signature);
          this.addsummary.patchValue({
            Declaration1Arr: this.signarr
            //Declaration1Arr: [i]
          })
         }
         else{
          this.signarr1=[i];
          this.signarr1[0].signature=atob(i.signature);
          this.addsummary.patchValue({
            Declaration2Arr: this.signarr1
           // Declaration2Arr: [i]
          })
         }
       }
       this.populateData(siteId);
       this.populateDataComments();
       this.flag = true;

       this.addsummary.patchValue({
        extentInstallation: this.summaryList.summary.extentInstallation,
        agreedLimitations: this.summaryList.summary.agreedLimitations,
        agreedWith: this.summaryList.summary.agreedWith,
        operationalLimitations: this.summaryList.summary.operationalLimitations,
        //furtherActions: this.summaryList.summary.furtherActions,
       // referanceNumberReport: this.summaryList.summary.referanceNumberReport,
        recommendationsDate: this.summaryList.summary.recommendationsDate,
        //comment: this.summaryList.summary.comment,
        
        //recommendationsDate: this.summaryList.summary.recommendationsDate,
        //inspectionTestingDetailed: this.summaryList.summary.inspectionTestingDetailed,
        generalConditionInstallation: this.summaryList.summary.generalConditionInstallation,
        overallAssessmentInstallation: this.summaryList.summary.overallAssessmentInstallation,
    })
      this.onservationChangedDetection();
    // this.flag=true;
     }

//comments section starts

populateDataComments() {
  this.hideShowComment=true;
  this.reportViewerCommentArr = [];
  this.completedCommentArr3 = [];
  this.completedCommentArr4 = [];
  this.arrViewer = [];
  this.completedCommentArr1 = this.addsummary.get('completedCommentArr1') as FormArray;
 for(let value of this.summaryList.summary.summaryComment){
   this.arrViewer=[];
   if(this.currentUser1.role == 'Inspector' ) { //Inspector
    if(value.approveOrReject == 'APPROVED') {
      this.completedComments = true;
      this.enabledViewer=true;
      for(let j of this.summaryList.summary.summaryComment) {
        if(value.noOfComment == j.noOfComment) {
          this.completedCommentArr3.push(j);
        }
      }
       this.completedCommentArr4.push(this.addItem1(this.completedCommentArr3));               
      this.completedCommentArr3 = [];
    }
    for(let j of this.summaryList.summary.summaryComment) {
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
        // this.addsummary.setControl('viewerCommentArr', this._formBuilder.array(this.reportViewerCommentArr || []))
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
               for(let j of this.summaryList.summary.summaryComment) {
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
               if(this.summaryList.summary.summaryComment.length < 1) {
                 this.reportViewerCommentArr.push(this.addCommentViewer());
                 this.addsummary.setControl('viewerCommentArr', this._formBuilder.array(this.reportViewerCommentArr || []));
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
                  this.addsummary.setControl('viewerCommentArr', this._formBuilder.array(this.reportViewerCommentArr || []))
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
             this.addsummary.setControl('viewerCommentArr', this._formBuilder.array(this.reportViewerCommentArr || []))
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
            for(let j of this.summaryList.summary.summaryComment) {
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
       this.addsummary.setControl('viewerCommentArr', this._formBuilder.array(this.arrViewer || []))
       this.addsummary.setControl('completedCommentArr1', this._formBuilder.array(this.completedCommentArr4 || []));
}
getViewerFirstMessage(x: any) {
  return x.controls.completedCommentArr.controls[0].controls.viewerComments.value;
}
showHideAccordion(index: number) {  
  this.expandedIndexx = index === this.expandedIndexx ? -1 : index;  
  this.isClicked[index] = !this.isClicked[index];
  }
  createCommentGroup(value: any) : FormGroup {
    return this._formBuilder.group({
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
      this.summarydetailsService.sendComments(this.comments,this.summary.siteId).subscribe(
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
      this.summarydetailsService.replyComments(this.comments,this.summary.siteId).subscribe(
        (data) =>{
          this.commentSuccess=true;
          setTimeout(()=>{
            this.commentSuccess=false;
       }, 3000);
       this.disableReply=true;
       this.basic.newNotify();
       //this.basic.notification(0,'viewerUserName','inspectorUserName','viewerDate','inspectorDate');
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
      this.summarydetailsService.approveRejectComments(this.comments,this.summary.siteId).subscribe(
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
    this.summarydetailsService.approveRejectComments(this.comments,this.summary.siteId).subscribe(
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
      this.viewerCommentArr = this.addsummary.get('viewerCommentArr') as FormArray;
      this.viewerCommentArr.push(this.addCommentViewer());
      this.hideDelete=true;
  }
  addCommentViewer() {
      return this._formBuilder.group({
      viewerComments: [''],
      inspectorComments: [''],
      approveFlag:[false]
      });
  }
  addCommentViewerApprove() {
    return this._formBuilder.group({
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
    
      (this.addsummary.get('viewerCommentArr') as FormArray).removeAt(index);
  }
  
  getViewerCommentControls(): AbstractControl[] {
      return (<FormArray>this.addsummary.get('viewerCommentArr')).controls;
  }
  getCompletedCommentControls1(): AbstractControl[] {
    return (<FormArray>this.addsummary.get('completedCommentArr1')).controls;
  }
  getCompletedCommentControls(form: any){
    return form.controls.completedCommentArr?.controls;
  }
  refreshCommentSection() {
    this.spinner=true;
    this.cardBodyComments=false;
    this.siteService.retrieveFinal(this.summary.siteId).subscribe(
      (data) => {
         this.commentDataArr = JSON.parse(data);
         this.summaryList.summary.summaryComment = this.commentDataArr.summary.summaryComment;
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
    return this._formBuilder.group({
      completedCommentArr: this._formBuilder.array(this.completedComm(item)),
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
    return this._formBuilder.group({
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

     populateData(siteId: any) {
      this.arr = [];
      // for (let item of this.summaryList.summary.summaryObservation) {
      //   this.arr.push(this.createGroup(item));
      // }
      this.ObservationsArr=this.addsummary.get('ObservationsArr') as FormArray;
      this.arr.push(this.createGroup(this.summaryList.summary.summaryObservation));
      this.addsummary.setControl('ObservationsArr', this._formBuilder.array(this.arr || []))
      //this.retrieveFromOngoingForObservation(siteId);
    }

    createGroup(item: any): FormGroup {
      return this._formBuilder.group({
      //observationsId: new FormControl({disabled: false,value: item.observationsId}),
      mainsObservations: new FormControl({disabled: false,value: item[0].observations}),
      mainsFurtherActions: new FormControl({disabled: false,value:  item[0].furtherActions}),
      mainsComment: new FormControl({disabled: false,value: item[0].comment}),
      earthElectrodeObservations: new FormControl({disabled: false,value: item[1].observations}),
      electrodeFurtherActions: new FormControl({disabled: false,value: item[1].furtherActions}),
      electrodeComment: new FormControl({disabled: false,value: item[1].comment}),
      bondingConductorObservations: new FormControl({disabled: false,value: item[2].observations}),
      bondingFurtherActions: new FormControl({disabled: false,value: item[2].furtherActions}),
      bondingComment: new FormControl({disabled: false,value: item[2].comment}),
      earthingConductorObservations: new FormControl({disabled: false,value: item[3].observations}),
      earthingFurtherActions: new FormControl({disabled: false,value: item[3].furtherActions}),
      earthingComment: new FormControl({disabled: false,value: item[3].comment}),
      alternateArr: this._formBuilder.array(this.populateAlternate(item)),
      inspectionArr: this._formBuilder.array(this.populateInspection(item)),
      testingArr: this._formBuilder.array(this.populateTesting(item)),
      });
    }
   
    populateAlternate(item: any) {
      let arr:any=[];
      for(let i of item){
        if(i.observationComponentDetails.includes('alternate')){
          arr.push(this.createGroupAlternate(i))
        }
      }
      return arr;
    }
    createGroupAlternate(item: any): FormGroup {
      return this._formBuilder.group({
        observationComponentDetails: new FormControl({disabled: false,value: item.observationComponentDetails}),
        observations: new FormControl({disabled: false,value: item.observations}),
        observationsId: new FormControl({disabled: false,value: item.observationsId}),
        referenceId: new FormControl({disabled: false,value: item.referenceId}),
        furtherActions: new FormControl({disabled: false,value: item.furtherActions}),
        comment: new FormControl({disabled: false,value: item.comment}),
        obervationStatus: new FormControl(item.obervationStatus),
      });
    }
    populateInspection(item: any) {
      let arr:any=[];
      for(let i of item){
        if(i.observationComponentDetails.includes('inspectionComponent')){
          arr.push(this.createGroupInspection(i))
        }
      }
      return arr;
    }
    createGroupInspection(item: any): FormGroup {
      return this._formBuilder.group({
        observationComponentDetails: new FormControl({disabled: false,value: item.observationComponentDetails}),
        observations: new FormControl({disabled: false,value: item.observations}),
        furtherActions: new FormControl({disabled: false,value: item.furtherActions}),
        comment: new FormControl({disabled: false,value: item.comment}),
        obervationStatus: new FormControl(item.obervationStatus),
        summaryInnerObservation:this._formBuilder.array(this.populateSummaryInner(item.summaryInnerObservation)),
      });
    }
    populateSummaryInner(item:any){
        let arr:any=[];
        for(let i of item){
         arr.push(this.createGroupInnerInspection(i));
        }
        return arr;
    }
    createGroupInnerInspection(item: any): FormGroup {
      return this._formBuilder.group({
        observationComponentDetails: new FormControl({disabled: false,value: item.observationComponentDetails}),
        observations: new FormControl({disabled: false,value: item.observations}),
        furtherActions: new FormControl({disabled: false,value: item.furtherActions}),
        comment: new FormControl({disabled: false,value: item.comment}),
        obervationStatus: new FormControl(item.obervationStatus),
      });
    }
    populateTesting(item: any) {
      let arr:any=[];
      for(let i of item){
        if(i.observationComponentDetails.includes('circuit')){
          arr.push(this.createGroupTesting(i))
        }
      }
      return arr;
    }
    createGroupTesting(item: any): FormGroup {
      return this._formBuilder.group({
        observationComponentDetails: new FormControl({disabled: false,value: item.observationComponentDetails}),
        observations: new FormControl({disabled: false,value: item.observations}),
        furtherActions: new FormControl({disabled: false,value: item.furtherActions}),
        comment: new FormControl({disabled: false,value: item.comment}),
        obervationStatus: new FormControl(item.obervationStatus),
      });
    }
  private Declaration1Form(): FormGroup {
    return new FormGroup({
      declarationId: new FormControl(''),
      name: new FormControl('', Validators.required),
      signature: new FormControl('', Validators.required),
      company: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      declarationRole: new FormControl('Inspector'),
    });
  }

  private Declaration2Form(): FormGroup {
    return new FormGroup({
      declarationId: new FormControl(''),
      name: new FormControl('', Validators.required),
      signature: new FormControl('', Validators.required),
      company: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      declarationRole: new FormControl('Authorizer'),
    });
  }
  private ObservationsForm(): FormGroup {
    return new FormGroup({
      observationsSupply: new FormControl(''),
      mainsObservations: new FormControl(''),
      mainsFurtherActions: new FormControl(''),
      mainsComment: new FormControl(''),
      earthElectrodeObservations: new FormControl(''),
      electrodeFurtherActions: new FormControl(''),
      electrodeComment: new FormControl(''),
      bondingConductorObservations: new FormControl(''),
      bondingFurtherActions: new FormControl(''),
      bondingComment: new FormControl(''),
      earthingConductorObservations: new FormControl(''),
      earthingFurtherActions: new FormControl(''),
      earthingComment: new FormControl(''),
      alternateArr: this._formBuilder.array([]),
      inspectionArr: this._formBuilder.array([]),
      testingArr: this._formBuilder.array([]),
      observationsInspection: new FormControl(''),
      observationsTesting: new FormControl(''),
    });
  }
  summaryObservationsForm(): FormGroup {
    return new FormGroup({
      observations: new FormControl(''),
      observationComponentDetails: new FormControl(''),
      furtherActions: new FormControl(''),
      comment: new FormControl(''),
      obervationStatus: new FormControl('A'),
      summaryInnerObservation:this._formBuilder.array([]),
    });
  }
  private alternateObservationsForm(): FormGroup {
    return new FormGroup({
      observationComponentDetails: new FormControl(''),
      observations: new FormControl(''),
      observationsId: new FormControl(''),
      furtherActions: new FormControl('', [Validators.required]),
      comment: new FormControl('', [Validators.required]),
      obervationStatus: new FormControl('A'),
      referenceId: new FormControl(''),
      summaryInnerObservation:this._formBuilder.array([]),
    });
  }
  private testingObservationsForm(item:any): FormGroup {
    return new FormGroup({
      observationComponentDetails: new FormControl({ disabled: false, value: item.observationComponentDetails}),
      observations: new FormControl({ disabled: false, value: item.observationDescription}),
      furtherActions: new FormControl('', [Validators.required]),
      comment: new FormControl('', [Validators.required]),
      obervationStatus: new FormControl('A'),
      summaryInnerObservation:this._formBuilder.array([]),
    });
  }
  private inspectionOuterObservationsForm(item: any): FormGroup {
    return new FormGroup({
      observationComponentDetails: new FormControl({ disabled: false, value: item.observationComponentDetails}),
      observations: new FormControl({ disabled: false, value: item.observationDescription}),
      furtherActions: new FormControl('', [Validators.required]),
      comment: new FormControl('', [Validators.required]),
      obervationStatus: new FormControl('A'),
      summaryInnerObservation: this._formBuilder.array(this.populateInnerObserv(item.inspectionInnerObservations)),
    });
  }

  private populateInnerObserv(item: any) {
    let innerArr: any= []
    for(let i of item) {
      innerArr.push(this.inspectionInnerObservationsForm(i));
    }
    return innerArr;
  }

  private inspectionInnerObservationsForm(item: any): FormGroup {
    return new FormGroup({
      observations: new FormControl({ disabled: false, value: item.observationDescription}),
      observationComponentDetails: new FormControl({ disabled: false, value: item.observationComponentDetails}),
      furtherActions: new FormControl('', [Validators.required]),
      comment: new FormControl('', [Validators.required]),
      obervationStatus: new FormControl('A'),
    });
  }

  getDeclaration1Controls(): AbstractControl[] {
    return (<FormArray>this.addsummary.get('Declaration1Arr')).controls;
  }
  getDeclaration2Controls(): AbstractControl[] {
    return (<FormArray>this.addsummary.get('Declaration2Arr')).controls;
  }
  getObservationsControls(): AbstractControl[] {
    return (<FormArray>this.addsummary.get('ObservationsArr')).controls;
  }
  getAlternateControls(form: any): AbstractControl[] {
    return form.controls.alternateArr?.controls;
  }
  getInspectionControls(form: any): AbstractControl[] {
    return form.controls.inspectionArr?.controls;
  }
  getOuterObservationControls(form: any): AbstractControl[] {
    return form.controls.summaryInnerObservation?.controls;
  }
  getTestingControls(form: any): AbstractControl[] {
    return form.controls.testingArr?.controls;
  }
  get f(): any {
    return this.addsummary.controls;
  }

  onChange1(event: any,a:any) {
    let changedValue;
    if(event.target != undefined) {
      changedValue = event.target.value;
    }
    else{
      changedValue = event;
    }
    if (changedValue == 'No remedial action required') {
      a.controls['mainsComment'].clearValidators();
      a.controls['mainsComment'].updateValueAndValidity();
      a.controls['mainsComment'].setValue('');
    }
    else{
      a.controls['mainsComment'].setValidators([Validators.required]);
      a.controls['mainsComment'].updateValueAndValidity();
      //this.disableValidators();
    }
  }
  onChange2(event: any,b:any) {
    let changedValue;
    if(event.target != undefined) {
      changedValue = event.target.value;
    }
    else{
      changedValue = event;
    }
    if (changedValue == 'No remedial action required') {
      b.controls['comment'].clearValidators();
      b.controls['comment'].updateValueAndValidity();
      b.controls['comment'].setValue('');
    }
    else{
      b.controls['comment'].setValidators([Validators.required]);
      b.controls['comment'].updateValueAndValidity();
      //this.disableValidators();
    }
  }
  onChange3(event: any,a:any) {
    let changedValue;
    if(event.target != undefined) {
      changedValue = event.target.value;
    }
    else{
      changedValue = event;
    }
    if (changedValue == 'No remedial action required') {
      a.controls['electrodeComment'].clearValidators();
      a.controls['electrodeComment'].updateValueAndValidity();
      a.controls['electrodeComment'].setValue('');
    }
    else{
      a.controls['electrodeComment'].setValidators([Validators.required]);
      a.controls['electrodeComment'].updateValueAndValidity();
      //this.disableValidators();
    }
  }
  onChange4(event: any,a:any) {
    let changedValue;
    if(event.target != undefined) {
      changedValue = event.target.value;
    }
    else{
      changedValue = event;
    }
    if (changedValue == 'No remedial action required') {
      a.controls['bondingComment'].clearValidators();
      a.controls['bondingComment'].updateValueAndValidity();
      a.controls['bondingComment'].setValue('');
    }
    else{
      a.controls['bondingComment'].setValidators([Validators.required]);
      a.controls['bondingComment'].updateValueAndValidity();
      //this.disableValidators();
    }
  }
  onChange5(event: any,a:any) {
    let changedValue;
    if(event.target != undefined) {
      changedValue = event.target.value;
    }
    else{
      changedValue = event;
    }
    if (changedValue == 'No remedial action required') {
      a.controls['earthingComment'].clearValidators();
      a.controls['earthingComment'].updateValueAndValidity();
      a.controls['earthingComment'].setValue('');
    }
    else{
      a.controls['earthingComment'].setValidators([Validators.required]);
      a.controls['earthingComment'].updateValueAndValidity();
      //this.disableValidators();
    }
  }
  onChange6(event: any,c:any) {
    let changedValue;
    if(event.target != undefined) {
      changedValue = event.target.value;
    }
    else{
      changedValue = event;
    }
    if (changedValue == 'No remedial action required') {
      c.controls['comment'].clearValidators();
      c.controls['comment'].updateValueAndValidity();
      c.controls['comment'].setValue('');
    }
    else{
      c.controls['comment'].setValidators([Validators.required]);
      c.controls['comment'].updateValueAndValidity();
      //this.disableValidators();
    }
  }
  onChange7(event: any,d:any) {
    let changedValue;
    if(event.target != undefined) {
      changedValue = event.target.value;
    }
    else{
      changedValue = event;
    }
    if (changedValue == 'No remedial action required') {
      d.controls['comment'].clearValidators();
      d.controls['comment'].updateValueAndValidity();
      d.controls['comment'].setValue('');
    }
    else{
      d.controls['comment'].setValidators([Validators.required]);
      d.controls['comment'].updateValueAndValidity();
      //this.disableValidators();
    }
  }
  onChange8(event: any,c:any) {
    let changedValue;
    if(event.target != undefined) {
      changedValue = event.target.value;
    }
    else{
      changedValue = event;
    }
    if (changedValue == 'No remedial action required') {
      c.controls['comment'].clearValidators();
      c.controls['comment'].updateValueAndValidity();
      c.controls['comment'].setValue('');
    }
    else{
      c.controls['comment'].setValidators([Validators.required]);
      c.controls['comment'].updateValueAndValidity();
      //this.disableValidators();
    }
  }
  disableValidators() {
    // this.ObservationsArr = this.addsummary.get('ObservationsArr') as FormArray;
    // this.loclength = this.ObservationsArr.length;
    // for (this.i = 0; this.i < this.loclength; this.i++) {
    //   for (this.j = 0; this.j < this.fcname.length; this.j++) {
    //     this.f.ObservationsArr.controls[this.i].controls[
    //       this.fcname[this.j]
    //     ].clearValidators();
    //     this.f.ObservationsArr.controls[this.i].controls[
    //       this.fcname[this.j]
    //     ].updateValueAndValidity();
    //   }
    // }
  
    this.addsummary.controls['furtherActions'].clearValidators();
    this.addsummary.controls['furtherActions'].updateValueAndValidity();

    this.addsummary.controls['recommendationsDate'].clearValidators();
    this.addsummary.controls['recommendationsDate'].updateValueAndValidity();

    this.addsummary.controls['comment'].clearValidators();
    this.addsummary.controls['comment'].updateValueAndValidity();
  }

 
  addObservations() {
    this.ObservationsArr = this.addsummary.get('ObservationsArr') as FormArray;
    this.ObservationsArr.push(this.ObservationsForm());
  }

  removeObservations(index: any) {
    this.addsummary.markAsDirty();
    if(this.flag) {
      this.addsummary.markAsTouched();
      if(this.addsummary.value.ObservationsArr[index].observationsId!= 0 
        && this.addsummary.value.ObservationsArr[index].observationsId != '' 
         && this.addsummary.value.ObservationsArr[index].observationsId != undefined ) {
          this.addsummary.value.ObservationsArr[index].obervationStatus = 'R';
          this.deletedArr.push(this.addsummary.value.ObservationsArr[index]);
         }
  
    }
    (this.addsummary.get('ObservationsArr') as FormArray).removeAt(index);
  }

  changeComboo(event: any) {
    
    if(event.value == 'Unsatisfactory') {
      this.overallAssessmentInstallation= true;
      //this.disableValidatorsRadio();
    }
    else {

    }
  }
  changeTab1(index: number, sitedId: any, userName: any): void {
    this.selectedIndex = index;
  }
  // clickAcc(){
  //   this.gotoNextTab();
  // }
  gotoNextTab() {
    if ((this.addsummary.dirty && this.addsummary.invalid) || this.service.isCompleted4==false){
      this.service.isCompleted= false;
      this.service.isLinear=true;
      this.service.editable=false;
      this.validationError = true;
      this.validationErrorMsg = 'Please check all the fields';
      setTimeout(() => {
        this.validationError = false;
      }, 3000);
      return;
    }
    else if(this.addsummary.dirty && this.addsummary.touched){
      if(this.addsummary.valid){
        this.service.isCompleted= true;
        this.service.isLinear=false;
        this.service.editable=true;
      }
      else{
      this.service.isCompleted5= false;
      this.service.isLinear=true; 
      this.service.editable=false;
      this.tabError = true;
      this.tabErrorMsg = 'Kindly click on next button to update the changes!';
      setTimeout(() => {
        this.tabError = false;
      }, 3000);
    }
   }
    else{
      this.service.isCompleted= true;
      this.service.isLinear=false;
      this.service.editable=true;
    }
  }
  onChangeForm(event:any){
    if(!this.addsummary.invalid){
      if(this.addsummary.dirty){
        this.validationError=false;
        this.service.lvClick=1;
        this.service.logoutClick=1;
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
   if(!this.addsummary.invalid){ 
    if(this.addsummary.dirty){
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
  gotoNextModal() {
    if (this.addsummary.invalid) {
      this.validationError = true;
      this.validationErrorMsg = 'Please check all the fields';
      // setTimeout(() => {
      //   this.validationError = false;
      // }, 3000);
      return;
    }
    // if(this.addsummary.touched || this.addsummary.untouched){
    //   this.modalReference = this.modalService.open(content2, {
    //      centered: true, 
    //      size: 'md'
    //     })
    //  }
     this.disableSubmit=true;
     //this.showSubmit=true;
  }
  OkModalDialog(content5: any){
    if(this.addsummary.dirty && this.addsummary.touched){ //update msg
      this.modalService.open(content5, { centered: true,backdrop: 'static'});
     }
  
  }
  openModalDialog(content2: any){
    this.modalService.open(content2, {
      centered: true, 
      size: 'md',
      backdrop: 'static'
     })
   //this.checkForAllSteps();
  }
  closeModalDialog() {
    this.finalSpinner=true;
    this.popup=false;
    if (this.errorMsg != "") {
      this.Error = false;
      this.service.isCompleted5= false;
      this.service.isLinear=true;
      this.modalService.dismissAll((this.errorMsg = ""));
      this.proceedNext.emit(false);
    } 
    else {
      this.success = false;
      this.service.isCompleted5= true;
      this.service.isLinear=false;
      this.modalService.dismissAll((this.successMsg = ""));
      this.proceedNext.emit(true);
    }

    // if(this.finalFlag) {
    //   this.final.changeTab1(2);
    //   this.finalFlag = false;

    // }
  }
//  triggerToFinal(siteId:any){
//   //this.service.mainNavToSaved=2;
//   //this.verification.changeTab(0,siteId,userName,companyName,departmentName,site);

//  }

  adminSubmit() {
    this.UpateInspectionService.updateSummary(this.summary,true).subscribe(
      data=> {
        this.success = true;
        this.popup=true;
        this.finalSpinner=false;
        this.successMsg = data;
        this.addsummary.markAsPristine();
        this.service.windowTabClick=0;
    this.service.logoutClick=0; 
    this.service.lvClick=0; 
      },
      (error) => {
        this.Error = true;
        this.popup=true;
        this.finalSpinner=false;
        this.errorArr = [];
        this.errorArr = JSON.parse(error.error);
        this.errorMsg = this.errorArr.message;
      });
      
  }

  SubmitTab5(flag: any,content5:any) {
    if(!flag) {
      this.summary.siteId = this.service.siteCount;
    }
    this.summary.userName = this.email;
    this.submitted = true;
    if (this.addsummary.invalid) {
      this.validationError = true;
      this.validationErrorMsg = 'Please check all the fields';
      // setTimeout(() => {
      //   this.validationError = false;
      // }, 3000);
      return;
    }
    const dialogRef = this.dialog.open(ConfirmationBoxComponent, {
      width: '420px',
      maxHeight: '90vh',
      disableClose: true,
    });
    dialogRef.componentInstance.editModal = false;
    dialogRef.componentInstance.viewModal = false;
    dialogRef.componentInstance.triggerModal = false;
    dialogRef.componentInstance.linkModal = false;
    dialogRef.componentInstance.summaryModal = true;
    dialogRef.componentInstance.confirmBox.subscribe(data=>{
      if(data) {
        this.modalService.open(content5, { centered: true, backdrop: 'static'});

        this.summaryObervation=this.addsummary.get('summaryObervation') as FormArray;
        this.ObservationsArr=this.addsummary.get('ObservationsArr') as FormArray;

        for(let i of this.summaryObervation.controls){
        if(i.controls.observationComponentDetails.value == 'mainsObservations')  {
          i.controls.comment.setValue(this.ObservationsArr.controls[0].controls.mainsComment.value);
          i.controls.furtherActions.setValue(this.ObservationsArr.controls[0].controls.mainsFurtherActions.value);
          i.controls.observations.setValue(this.ObservationsArr.controls[0].controls.mainsObservations.value);
        } 
        else if(i.controls.observationComponentDetails.value == 'earthElectrodeObservations')  {
          i.controls.comment.setValue(this.ObservationsArr.controls[0].controls.electrodeComment.value);
          i.controls.furtherActions.setValue(this.ObservationsArr.controls[0].controls.electrodeFurtherActions.value);
          i.controls.observations.setValue(this.ObservationsArr.controls[0].controls.earthElectrodeObservations.value);
        } 
        else  if(i.controls.observationComponentDetails.value == 'boundingObservations')  {
          i.controls.comment.setValue(this.ObservationsArr.controls[0].controls.bondingComment.value);
          i.controls.furtherActions.setValue(this.ObservationsArr.controls[0].controls.bondingFurtherActions.value); 
          i.controls.observations.setValue(this.ObservationsArr.controls[0].controls.bondingConductorObservations.value);
        } 
        else if(i.controls.observationComponentDetails.value == 'earthingObservations')  {
          i.controls.comment.setValue(this.ObservationsArr.controls[0].controls.earthingComment.value);
          i.controls.furtherActions.setValue(this.ObservationsArr.controls[0].controls.earthingFurtherActions.value);
          i.controls.observations.setValue(this.ObservationsArr.controls[0].controls.earthingConductorObservations.value);
        }    
        }

        if(this.ObservationsArr.value[0].alternateArr.length!=0){
          this.alternateArr=this.ObservationsArr.controls[0].controls.alternateArr as FormArray;
          for(let i of this.alternateArr.value){
            this.summaryObervation.value.push(i);
          }
        }
        if(this.ObservationsArr.value[0].inspectionArr.length!=0){
          this.inspectionArr=this.ObservationsArr.controls[0].controls.inspectionArr as FormArray;
          for(let i of this.inspectionArr.value){
            this.summaryObervation.value.push(i);
            // for(let j of i.summaryInnerObservation){
            //   this.summaryObervation.value.push(j);
            // }
          }
        }
        if(this.ObservationsArr.value[0].testingArr.length!=0){
          this.testingArr=this.ObservationsArr.controls[0].controls.testingArr as FormArray;
          for(let i of this.testingArr.value){
            this.summaryObervation.value.push(i);
          }
        }
      
          //this.verification.callFinalSavedMethod();
          this.addsummary.value.Declaration1Arr[0].signature=this.service.bytestring5;
          this.addsummary.value.Declaration2Arr[0].signature=this.service.bytestring6;
          this.summary.summaryObservation = this.addsummary.value.summaryObervation;
          this.summary.summaryDeclaration = this.addsummary.value.Declaration1Arr; 
          this.summary.limitationsInspection='The following observations are made';
          this.summary.summaryDeclaration = this.summary.summaryDeclaration.concat(
            this.addsummary.value.Declaration2Arr
          );

          if(flag) {
            if(this.addsummary.dirty){
              if(this.deletedArr.length != 0) {
                for(let i of this.deletedArr) {
                  this.summary.summaryObservation.push(i);
                }
              }
            this.UpateInspectionService.updateSummary(this.summary,false).subscribe(
              data=> {
                this.success = true;
                this.popup=true;
                this.finalSpinner=false;

                this.successMsg = data;
                //this.finalFlag = true;
                this.addsummary.markAsPristine();
                this.service.windowTabClick=0;
            this.service.logoutClick=0; 
            this.service.lvClick=0; 
              },
              (error) => {
                this.Error = true;
                this.popup=true;
                this.finalSpinner=false;
                this.errorArr = [];
                this.errorArr = JSON.parse(error.error);
                this.errorMsg = this.errorArr.message;
              });
              }
          }

          else {
            this.summarydetailsService.addSummary(this.summary).subscribe(
              (data) => {
                //this.proceedNext.emit(true);
                this.ConfirmSuccess=true;
                this.popup=true;
                this.finalSpinner=false;
                this.success = true;
                this.successMsg = data;
                this.addsummary.markAsPristine();
                // this.service.allFieldsDisable = true; 
                // this.service.disableSubmitSummary=true;
                // this.finalFlag = true;
                this.service.windowTabClick=0;
                this.service.logoutClick=0; 
                this.service.lvClick=0; 
              },
              (error) => {
                this.popup=true;
                this.finalSpinner=false;
                this.Error = true;
                this.errorArr = [];
                this.errorArr = JSON.parse(error.error);
                this.errorMsg = this.errorArr.message;
                this.proceedNext.emit(false);
                this.service.disableSubmitSummary=false;
                //this.addsummary.markAsPristine();
              });
          }

      }
      else{
        return;
      }
    })
  //   if(!confirm("Are you sure you want to procced?\r\n\r\nNote: Once saved, details can't be modified!")){
  //    return;
  //   }
  // else{
  //     this.modalService.open(content5, { centered: true, backdrop: 'static'});
  // }
  
    }

  } 


