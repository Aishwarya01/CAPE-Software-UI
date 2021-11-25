import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  ChangeDetectorRef,
  VERSION,
  ElementRef
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
import { MatDialog } from '@angular/material/dialog';
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

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  selectedValue: any;
  overallAssessmentInstallation: boolean = false;
  installations: string[] = ['Satisfactory', 'Unsatisfactory'];

  addsummary = new FormGroup({
    limitationsInspection:  new FormControl(''),
    extentInstallation: new FormControl(''),
    agreedLimitations: new FormControl(''),
    agreedWith: new FormControl(''),
    operationalLimitations: new FormControl(''),
    recommendationsDate: new FormControl(''),
    inspectionTestingDetailed: new FormControl(''),
    generalConditionInstallation: new FormControl(''),
    overallAssessmentInstallation: new FormControl(''),
  });

  selectedIndex = 0;

  ObservationsArr!: FormArray;
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
  observationList: String[] = ['No remedial action required', 'The following observations are made'];
  // @ViewChild (FinalreportsComponent) final!: FinalreportsComponent;
  //@ViewChild (VerificationlvComponent) final!: VerificationlvComponent;

  @Output() proceedNext = new EventEmitter<any>();
  fcname: string[] = [
    'comment',
    'furtherActions',
    'observations',
    'referanceNumberReport',
  ];
  errorArr: any=[];

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

  constructor(
    private _formBuilder: FormBuilder,
    private modalService: NgbModal,
    private dialog: MatDialog,
    private router: ActivatedRoute,
    private summarydetailsService: SummarydetailsService,
    public service: GlobalsService,
    public siteService: SiteService,
    private ChangeDetectorRef: ChangeDetectorRef,
    private final: VerificationlvComponent,
    private UpateInspectionService: InspectionVerificationService,
    private basic: MainNavComponent,
  ) {
    this.email = this.router.snapshot.paramMap.get('email') || '{}';
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
      limitationsInspection: ['', Validators.required],
      extentInstallation: ['', Validators.required],
      agreedLimitations: ['', Validators.required],
      agreedWith: ['', Validators.required],
      operationalLimitations: ['', Validators.required],
      recommendationsDate: ['', Validators.required],
      inspectionTestingDetailed: ['', Validators.required],
      generalConditionInstallation: ['', Validators.required],
      overallAssessmentInstallation: ['', Validators.required],
      Declaration1Arr: this._formBuilder.array([this.Declaration1Form()]),
      Declaration2Arr: this._formBuilder.array([this.Declaration2Form()]),
      ObservationsArr: this._formBuilder.array([this.ObservationsForm()]),
      viewerCommentArr: this._formBuilder.array([this.addCommentViewer()]),
      completedCommentArr1: this._formBuilder.array([]),
    });
    this.refresh();
    this.expandedIndex = -1 ;
    // this.Declaration2Arr = this.addsummary.get('Declaration2Arr') as FormArray;
  }
  // ngAfterViewInit(){
  //   this.picker.nativeElement.open()
  // }
  refresh() {
    this.ChangeDetectorRef.detectChanges();
  }
  reloadFromBack(){
    this.addsummary.markAsPristine();
   }
  retrieveDetailsfromSavedReports(userName: any,siteId: any,clientName: any,departmentName: any,site: any,data: any){
    // if(this.service.disableFields==true){
    //   this.addsummary.disable();
    //   //this.service.allStepsCompleted=true;
    //  }
       this.summaryList = JSON.parse(data);
       this.summary.siteId = siteId;
       this.summary.summaryId = this.summaryList.summary.summaryId;
       this.summary.createdBy = this.summaryList.summary.createdBy;
       this.summary.createdDate = this.summaryList.summary.createdDate;

       this.summary.limitationsInspection = this.summaryList.summary.limitationsInspection;
       this.limitationsValue = this.summaryList.summary.limitationsInspection;
       this.onChange(this.limitationsValue);
       for(let i of this.summaryList.summary.summaryDeclaration) {
         if(i.declarationRole == "Inspector") {
          this.addsummary.patchValue({
            Declaration1Arr: [i]
          })
         }

         else{
          this.addsummary.patchValue({
            Declaration2Arr: [i]
          })
         }
       }

       this.populateData();
       this.populateDataComments();
       this.flag = true;

       this.addsummary.patchValue({
        extentInstallation: this.summaryList.summary.extentInstallation,
        agreedLimitations: this.summaryList.summary.agreedLimitations,
        agreedWith: this.summaryList.summary.agreedWith,
        operationalLimitations: this.summaryList.summary.operationalLimitations,
        recommendationsDate: this.summaryList.summary.recommendationsDate,
        inspectionTestingDetailed: this.summaryList.summary.inspectionTestingDetailed,
        generalConditionInstallation: this.summaryList.summary.generalConditionInstallation,
        overallAssessmentInstallation: this.summaryList.summary.overallAssessmentInstallation,
    })
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
  //console.log(x);
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
    this.siteService.retrieveFinal(this.savedUserName,this.summary.siteId).subscribe(
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

     populateData() {
      // if(this.service.disableFields==true){
      //   this.disable=true;
      //   //this.service.allStepsCompleted=true;
      //   }
       this.arr = [];
      for (let item of this.summaryList.summary.summaryObervation) {
        this.arr.push(this.createGroup(item));
        
      }
      this.addsummary.setControl('ObservationsArr', this._formBuilder.array(this.arr || []))
    }

    createGroup(item: any): FormGroup {
      return this._formBuilder.group({
        observationsId: new FormControl({disabled: false,value: item.observationsId}),
        observations: new FormControl({disabled: false,value: item.observations}),
        furtherActions: new FormControl({disabled: false,value: item.furtherActions}),
        referanceNumberReport: new FormControl({disabled: false,value: item.referanceNumberReport}),
        comment: new FormControl({disabled: false,value: item.comment}),
      });
    }
  

  private Declaration1Form(): FormGroup {
    return new FormGroup({
      declarationId: new FormControl(''),
      name: new FormControl('', Validators.required),
      signature: new FormControl(''),
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
      signature: new FormControl(''),
      company: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      declarationRole: new FormControl('Authorizer'),
    });
  }
  private ObservationsForm(): FormGroup {
    return new FormGroup({
      observations: new FormControl('', Validators.required),
      furtherActions: new FormControl('', Validators.required),
      referanceNumberReport: new FormControl('', Validators.required),
      comment: new FormControl('', Validators.required),
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
  get f(): any {
    return this.addsummary.controls;
  }

  onChange(event: any) {
    // this.selectedType = event.target.value;
    let changedValue;

    if(event.target != undefined) {
      changedValue = event.target.value;
    }
    else{
      changedValue = event;
    }
    if (changedValue == 'The following observations are made') {
      this.selectedType = true;
    }
    else{
      this.selectedType = false;
      this.disableValidators();
    }
  }
  disableValidators() {
    this.ObservationsArr = this.addsummary.get('ObservationsArr') as FormArray;
    this.loclength = this.ObservationsArr.length;
    for (this.i = 0; this.i < this.loclength; this.i++) {
      for (this.j = 0; this.j < this.fcname.length; this.j++) {
        this.f.ObservationsArr.controls[this.i].controls[
          this.fcname[this.j]
        ].clearValidators();
        this.f.ObservationsArr.controls[this.i].controls[
          this.fcname[this.j]
        ].updateValueAndValidity();
      }
    }
  }

  addObservations() {
    this.ObservationsArr = this.addsummary.get('ObservationsArr') as FormArray;
    this.ObservationsArr.push(this.ObservationsForm());
  }

  removeObservations(index: any) {
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
  
  gotoNextModal() {
    if (this.addsummary.invalid) {
      this.validationError = true;
      this.validationErrorMsg = 'Please check all the fields';
      setTimeout(() => {
        this.validationError = false;
      }, 3000);
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
      this.modalService.open(content5, { centered: true});
     }
  }
  openModalDialog(content2: any){
    this.modalService.open(content2, {
      centered: true, 
      size: 'md'
     })
   //this.checkForAllSteps();
  }
  closeModalDialog() {
    if (this.errorMsg != '') {
      this.Error = false;
      this.service.isCompleted5= false;
      this.service.isLinear=true;
      this.modalService.dismissAll((this.errorMsg = ''));
    } 
    else {
      this.success = false;
      this.service.isCompleted5= true;
      this.service.isLinear=false;
      this.modalService.dismissAll((this.successMsg = ''));
      //this.disable = false;
     // this.disableSubmit=false;
    }

    // if(this.finalFlag) {
    //   this.final.changeTab1(2);
    //   this.finalFlag = false;

    // }
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
      setTimeout(() => {
        this.validationError = false;
      }, 3000);
      return;
    }
    if(!confirm("Are you sure you want to procced? Note: Once saved, details can't be edited!")){
     return;
    }
  else{
    //if((this.addsummary.dirty && this.addsummary.touched)){
      this.modalService.open(content5, { centered: true});
    // }
     this.service.disableSubmitSummary=true;
  }
    this.summary.summaryObervation = this.addsummary.value.ObservationsArr;
    this.summary.summaryDeclaration = this.addsummary.value.Declaration1Arr;
    this.summary.summaryDeclaration = this.summary.summaryDeclaration.concat(
      this.addsummary.value.Declaration2Arr
    );

    if(flag) {
      if(this.addsummary.dirty){
      this.UpateInspectionService.updateSummary(this.summary).subscribe(
        data=> {
          this.success = true;
          this.successMsg = 'Summary Information Successfully Updated';
          this.finalFlag = true;
          this.addsummary.markAsPristine();
         },
         (error) => {
          this.Error = true;
          this.errorMsg = 'Something went wrong, kindly check all the fields';
         });
        }
    }

    else {
      this.summarydetailsService.addSummary(this.summary).subscribe(
        (data) => {
          this.proceedNext.emit(true);
          this.ConfirmSuccess=true;
          this.success = true;
          this.successMsg = 'Summary Information Successfully Submitted';
          this.service.allFieldsDisable = true;
          this.finalFlag = true;
        },
        (error) => {
          this.Error = true;
          this.errorArr = [];
          this.errorArr = JSON.parse(error.error);
          this.errorMsg = this.errorArr.message;
          this.proceedNext.emit(false);
          //this.addsummary.markAsPristine();
        });
    }
  }

  } 


