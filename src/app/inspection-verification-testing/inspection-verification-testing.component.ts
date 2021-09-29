import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  OnDestroy,
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
import { TestingDetails } from '../model/testing-details';
import { TestingService } from '../services/testing.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InspectiondetailsService } from '../services/inspectiondetails.service';
import { InspectionVerificationIncomingEquipmentComponent } from '../inspection-verification-incoming-equipment/inspection-verification-incoming-equipment.component';
import { GlobalsService } from '../globals.service';
import { Location } from '../model/location';
import { SiteService } from '../services/site.service';
import { InspectionVerificationService } from '../services/inspection-verification.service';
import { CommentsSection } from '../model/comments-section';
import { MainNavComponent } from '../main-nav/main-nav.component';

@Component({
  selector: 'app-inspection-verification-testing',
  templateUrl: './inspection-verification-testing.component.html',
  styleUrls: ['./inspection-verification-testing.component.css'],
})
export class InspectionVerificationTestingComponent implements OnInit {
  j: any;
  i: any;
  delarr: any;
  values: any;
  value: any;
  loclength: any;
  loc1length: any;
  testingForm!: FormGroup;
  submitted = false;
  testaccordianArr!: FormArray;
  panelOpenState = false;
  // email: String = '';

  @Output() proceedNext = new EventEmitter<any>();
  testingDetails = new TestingDetails();
  incomingVoltage: String = '';
  incomingLoopImpedance: String = '';
  incomingFaultCurrent: String = '';
  rateArr: any = [];
  locationNumberList: any = [];
  //@Input()
  userName: String = '';
  //@Input()
  siteId!: number;
  rateValueArr: any=[];
  testingRecordTableArr: any = [];

  locationNameList: any = [];
  distributionIncomingValueArr: any = [];
  testingRecords: any = [];

  ratingAmps1: any;
  testDistribution!: FormArray;
  testingDistribution!: FormArray;
  o: any;
  // successMsg: string = '';
  // success: boolean = false;
  // Error: boolean = false;
  // errorMsg: string = '';
  email: string;
  validationError: boolean = false;
  validationErrorMsg: String = '';
  location = new Location();
  // demoArr: any=[];
  disable: boolean = false;
  flag:boolean=false;
  fcname: any[] = [
    'circuitNo',
    'circuitDesc',
    'circuitStandardNo',
    'circuitType',
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

    'rcdCurrent',
    'rcdOperatingCurrent',
    'rcdOperatingFiveCurrent',
    'rcdTestButtonOperation',
    'rcdRemarks',
  ];
  errorArr: any=[];
  testList: any=[];
  arr:any=[];
  Ratearr1:any=[];
  testingRetrieve: boolean=false;
  inspectionRetrieve: boolean=false;

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
  //comments end

  constructor(
    private testingService: TestingService,
    private formBuilder: FormBuilder,
    public service: GlobalsService,
    private modalService: NgbModal,
    private router: ActivatedRoute,
    private inspectionDetailsService: InspectiondetailsService,
    private siteService: SiteService,
    private basic: MainNavComponent,
    private UpateInspectionService: InspectionVerificationService,
  ) {
    this.email = this.router.snapshot.paramMap.get('email') || '{}';
  }

  ngOnInit(): void {
    this.testingForm = this.formBuilder.group({
      testaccordianArr: this.formBuilder.array([]),
      viewerCommentArr: this.formBuilder.array([this.addCommentViewer()]),
      completedCommentArr1: this.formBuilder.array([]),
    });
    if (
      this.service.iterationList != '' &&
      this.service.iterationList != undefined
    ) {
      this.testingRetrieve=false;
      this.inspectionRetrieve=true;
      let a = this.service.iterationList.length;
      for (let i = 0; i < a; i++) {
        this.addItem();
      }
      for (let j = 0; j < this.testaccordianArr.controls.length; j++) {
        this.testaccordianArr.value[j].locationNumber =
          this.service.iterationList[j].locationNumber;
        this.testaccordianArr.value[j].locationName =
          this.service.iterationList[j].locationName;
      }
      this.location.locationArr = this.service.iterationList;
      this.service.iterationList = [];
    }
    this.expandedIndex = -1 ;
  }

  retrieveDetailsfromSavedReports(userName: any,siteId: any,clientName: any,departmentName: any,site: any,data: any){
      this.testingRetrieve=true;
      this.inspectionRetrieve=false;
      this.testList = JSON.parse(data);
      this.testingDetails.siteId = siteId;
      this.testingDetails.testingReportId = this.testList.testingReport.testingReportId;
      this.testingDetails.createdBy = this.testList.testingReport.createdBy;
      this.testingDetails.createdDate = this.testList.testingReport.createdDate;
      this.populateData();
      this.populateDataComments();
      this.flag=true;
     }

     //comments section starts

populateDataComments() {
  this.hideShowComment=true;
  this.reportViewerCommentArr = [];
  this.completedCommentArr3 = [];
  this.completedCommentArr4 = [];
  this.arrViewer = [];
  this.completedCommentArr1 = this.testingForm.get('completedCommentArr1') as FormArray;
 for(let value of this.testList.reportDetails.reportDetailsComment){
   if(this.currentUser1.role == 'Inspector' ) { //Inspector
    if(value.approveOrReject == 'APPROVED') {
      this.completedComments = true;
      this.enabledViewer=true;
      for(let j of this.testList.reportDetails.reportDetailsComment) {
        if(value.noOfComment == j.noOfComment) {
          this.completedCommentArr3.push(j);
        }
      }
      console.log(this.completedCommentArr3)
       this.completedCommentArr4.push(this.addItem1(this.completedCommentArr3));               
      this.completedCommentArr3 = [];
    }
    for(let j of this.testList.reportDetails.reportDetailsComment) {
         if(j.approveOrReject == 'REJECT' || j.approveOrReject == '') {
          this.arrViewer.push(this.createCommentGroup(j));
         }
         else if(j.approveOrReject == 'APPROVED'){
          this.arrViewer = [];
        }        
      }
    this.enabledRequest=false;
    this.SendReply=false; 
       console.log(value.viewerDate + "   " + value.viewerComment)
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
        this.reportViewerCommentArr.push(this.createCommentGroup(value));
        this.testingForm.setControl('viewerCommentArr', this.formBuilder.array(this.reportViewerCommentArr || []))
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
               for(let j of this.testList.reportDetails.reportDetailsComment) {
                 if(value.noOfComment == j.noOfComment) {
                   this.completedCommentArr3.push(j);
                 }
               }
               console.log(this.completedCommentArr3)
                this.completedCommentArr4.push(this.addItem1(this.completedCommentArr3));               
               this.completedCommentArr3 = [];
             }

             else{ //reject & null
              debugger
               this.enabledViewer=true;
               if(value.viewerFlag=='1' && value.inspectorFlag=='1')
               {
                 if(value.approveOrReject == '') {
                
                 this.basic.notification(1,value.viewerUserName,value.inspectorUserName,value.viewerDate,value.inspectorDate);
                 }
               }
               if(this.testList.reportDetails.reportDetailsComment.length < 1) {
                 this.reportViewerCommentArr.push(this.addCommentViewer());
                 this.testingForm.setControl('viewerCommentArr', this.formBuilder.array(this.reportViewerCommentArr || []));
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
                  this.testingForm.setControl('viewerCommentArr', this.formBuilder.array(this.reportViewerCommentArr || []))
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
               this.replyCommentBox=false;
               this.disableSend=true;
              }
              else{
               this.enabledViewer=false;
               this.sendComment=true;
               this.replyCommentBox=true;
              }
             this.reportViewerCommentArr.push(this.createCommentGroup(value));
             this.testingForm.setControl('viewerCommentArr', this.formBuilder.array(this.reportViewerCommentArr || []))
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
            for(let j of this.testList.reportDetails.reportDetailsComment) {
                 if(j.approveOrReject == 'REJECT' || j.approveOrReject == '') {
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
       console.log(this.arrViewer);
       this.testingForm.setControl('viewerCommentArr', this.formBuilder.array(this.arrViewer || []))
       this.testingForm.setControl('completedCommentArr1', this.formBuilder.array(this.completedCommentArr4 || []));
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
    console.log(value.inspectorFlag);
    return this.formBuilder.group({
    viewerDateTime: new FormControl({disabled: false ,value: value.viewerDate}),
    inspectorUserName: new FormControl({disabled: false ,value: value.inspectorUserName}),
    viewerUserName: new FormControl({disabled: false ,value: value.viewerUserName}),
    inspectorDateTime: new FormControl({disabled: false ,value: value.inspectorDate}),
    approveOrReject: new FormControl({ disabled: this.enabledRequest, value: value.approveOrReject}),
    commentId: new FormControl({disabled: false ,value: value.commentsId}),
    viewerComments: new FormControl({disabled: this.enabledViewer ,value: value.viewerComment}),
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
      console.log(a);
      this.comments.userName = this.email;
      // this.comments.commentsId = this.step1Form.controls.viewerCommentArr.value[0].commentId;
      this.comments.commentsId =a.value.commentId;
      this.comments.viewerComment = a.value.viewerComments;
      this.comments.approveOrReject = '';
      this.testingService.sendComments(this.comments,this.testingDetails.siteId).subscribe(
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
      this.testingService.replyComments(this.comments,this.testingDetails.siteId).subscribe(
        (data) =>{
          this.commentSuccess=true;
          setTimeout(()=>{
            this.commentSuccess=false;
       }, 3000);
       this.disableReply=true;
       this.basic.notification(0,'viewerUserName','inspectorUserName','viewerDate','inspectorDate');
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
      this.testingService.approveRejectComments(this.comments,this.testingDetails.siteId).subscribe(
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
       this.basic.notification(0,'viewerUserName','inspectorUserName','viewerDate','inspectorDate');
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
    this.testingService.approveRejectComments(this.comments,this.testingDetails.siteId).subscribe(
      (data) =>{
        this.commentReject=true;
        setTimeout(()=>{
          this.commentReject=false;
     }, 3000);
     this.hideapprove=false;
     this.hideapproveIcon=false;
     this.basic.notification(0,'viewerUserName','inspectorUserName','viewerDate','inspectorDate');
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
      this.viewerCommentArr = this.testingForm.get('viewerCommentArr') as FormArray;
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
    
      (this.testingForm.get('viewerCommentArr') as FormArray).removeAt(index);
  }
  
  getViewerCommentControls(): AbstractControl[] {
      return (<FormArray>this.testingForm.get('viewerCommentArr')).controls;
  }
  getCompletedCommentControls1(): AbstractControl[] {
    return (<FormArray>this.testingForm.get('completedCommentArr1')).controls;
  }
  getCompletedCommentControls(form: any){
    return form.controls.completedCommentArr?.controls;
  }
  refreshCommentSection() {
    this.spinner=true;
    this.cardBodyComments=false;
    debugger
    console.log(this.testingDetails.siteId)
    this.siteService.retrieveFinal(this.savedUserName,this.testingDetails.siteId).subscribe(
      (data) => {
         this.commentDataArr = JSON.parse(data);
         this.testList.reportDetails.reportDetailsComment = this.commentDataArr.reportDetails.reportDetailsComment;
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
  populateRefreshData() {
    this.reportViewerCommentArr = [];
    this.completedCommentArrValue = [];

    for(let value of this.commentDataArr.reportDetails.reportDetailsComment){
      if(this.currentUser1.role == 'Inspector' ) { //Inspector
          console.log(value.viewerDate + "   " + value.viewerComment)
          
          this.reportViewerCommentArr = [];

          if(value.viewerFlag=='1'){
            this.hideCommentSection= true;
            this.hideAsViewerLogin=true;
            this.SendReply=false;
            this.replyCommentBox=true;
            this.hideAsViewerLogin=false;
           }
            }

            else { //Viewer
              console.log(value.inspectorDate + "   " + value.inspectorComment )
              if(value.approveOrReject == "REJECT"){
                this.reportViewerCommentArr.push(this.createCommentGroup(value));
              }
              else{
                this.completedComments = true;
                this.completedCommentArrValue.push(this.createCompletedCommentGroup(value));
                this.reportViewerCommentArr.push(this.addCommentViewerApprove());
                //this.afterApprove=true;

              }              
              this.testingForm.setControl('viewerCommentArr', this.formBuilder.array(this.reportViewerCommentArr || []))
              this.testingForm.setControl('completedCommentArr', this.formBuilder.array(this.completedCommentArrValue || []))

              this.reportViewerCommentArr = [];
              this.completedCommentArrValue = [];

              this.hideCommentSection= true;
              this.sendComment=true;
              this.hideapprove=false;
              this.hideReject=false;

              if(value.inspectorFlag=='1'){
                this.hideCommentSection= true;
                this.hideAsViewerLogin=false;
                this.replyCommentBox=true;
                this.hideAdd=true;
                this.hideapprove=true;
                this.hideReject=true;
                //this.sendComment=true;
                this.SendReply=false;
               }
             
            
            }       
          }
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
       this.arr = [];
      for (let item of this.testList.testingReport.testing) {
        this.arr.push(this.createGroup(item));
      }
      this.testingForm.setControl('testaccordianArr', this.formBuilder.array(this.arr || []))
    }
    
    createGroup(item: any): FormGroup {
      return this.formBuilder.group({
        testingId: new FormControl({disabled: false,value: item.testingId}),
        locationNumber: new FormControl({disabled: false,value: item.locationNumber}),
        locationName: new FormControl({disabled: false,value:  item.locationName}),
        testEngineerName: new FormControl({disabled: false,value:  item.testEngineerName}),
        date: new FormControl({disabled: false,value: item.date}),
        companyName: new FormControl({disabled: false,value:  item.companyName}),
        designation: new FormControl({disabled: false,value:  item.designation}),
        detailsTestInstrument: new FormControl({disabled: false,value: item.detailsTestInstrument}),
        continuity: new FormControl({disabled: false,value:  item.continuity}),
        insulationResisance: new FormControl({disabled: false,value: item.insulationResisance}),
        impedance: new FormControl({disabled: false,value:  item.impedance}),
        rcd: new FormControl({disabled: false,value: item.rcd}),
        earthElectrodeResistance: new FormControl({disabled: false,value: item.earthElectrodeResistance}),
        testDistribution: this.formBuilder.array([this.populateTestDistributionForm(item.testDistribution)]),
        testingRecords: this.formBuilder.array(this.populateTestRecordsForm(item.testingRecords)),
      });
    }

    private populateTestDistributionForm(testDistributionItem: any): FormGroup {
      return new FormGroup({
        distributionId: new FormControl({disabled: false,value: testDistributionItem[0].distributionId}),
        distributionBoardDetails: new FormControl({disabled: false,value: testDistributionItem[0].distributionBoardDetails}),
        referance: new FormControl({disabled: false,value: testDistributionItem[0].referance}),
        location: new FormControl({disabled: false,value: testDistributionItem[0].location}),
        correctSupplyPolarity: new FormControl({disabled: false,value: testDistributionItem[0].correctSupplyPolarity}),
        numOutputCircuitsUse: new FormControl({disabled: false,value: testDistributionItem[0].numOutputCircuitsUse}),
        ratingsAmps: new FormControl({disabled: false,value: testDistributionItem[0].ratingsAmps}),
        rateArr: this.formBuilder.array(this.populateRating(testDistributionItem[0].ratingsAmps)),
        numOutputCircuitsSpare: new FormControl({disabled: false,value: testDistributionItem[0].numOutputCircuitsSpare}),
        installedEquipmentVulnarable: new FormControl({disabled: false,value: testDistributionItem[0].installedEquipmentVulnarable}),
        incomingVoltage: new FormControl({disabled: false,value: testDistributionItem[0].incomingVoltage}),
        incomingLoopImpedance: new FormControl({disabled: false,value: testDistributionItem[0].incomingLoopImpedance}),
        incomingFaultCurrent: new FormControl({disabled: false,value: testDistributionItem[0].incomingFaultCurrent}),
        distributionIncomingValueArr: this.formBuilder.array([
          this.populatedistributionIncomingValue(testDistributionItem[0].incomingVoltage,testDistributionItem[0].incomingLoopImpedance,testDistributionItem[0].incomingFaultCurrent),
        ]),
      });
    }

    private populateRating(ratingAmps: any) {
      let ratingsAmpsArray= [];
      this.rateValueArr = [];
      ratingsAmpsArray= ratingAmps.split(",");
      for(let i =0; i<ratingsAmpsArray.length; i++) {
        this.rateValueArr.push(this.populateratingAmps(ratingsAmpsArray[i]));
      }
      return this.rateValueArr;
      // this.testingForm.setControl('rateArr', this.formBuilder.array(this.rateValueArr || []))
    }
    private populateratingAmps(ratingsAmps:any): FormGroup {  
      return new FormGroup({
        ratingsAmps: new FormControl({disabled: false,value: ratingsAmps}),
      });
    }
    private populatedistributionIncomingValue(incomingVoltage:any, incomingLoopImpedance:any, incomingFaultCurrent:any): FormGroup {
      let incomingVoltageArray= [];
      let incomingLoopImpedanceArray = [];
      let incomingFaultCurrentArray= [];

      incomingVoltageArray= incomingVoltage.split(",");
      incomingLoopImpedanceArray=  incomingLoopImpedance.split(",");
      incomingFaultCurrentArray=   incomingFaultCurrent.split(",");
     

      let item = [];
      item.push(incomingVoltageArray,incomingLoopImpedanceArray,incomingFaultCurrentArray);
      return new FormGroup({
        incomingVoltage1:new FormControl({disabled: false,value: item[0][0]}),
        incomingVoltage2:new FormControl({disabled: false,value:item[0][1]}),
        incomingVoltage3:new FormControl({disabled: false,value:item[0][2]}),
        incomingVoltage4:new FormControl({disabled: false,value:item[0][3]}),
        incomingVoltage5:new FormControl({disabled: false,value:item[0][4]}),
        incomingVoltage6:new FormControl({disabled: false,value:item[0][5]}),
        incomingVoltage7:new FormControl({disabled: false,value:item[0][6]}),
        incomingVoltage8:new FormControl({disabled: false,value:item[0][7]}),
        incomingVoltage9:new FormControl({disabled: false,value:item[0][8]}),
  
        incomingZs1:new FormControl({disabled: false,value:item[1][0]}),
        incomingZs2:new FormControl({disabled: false,value:item[1][1]}),
        incomingZs3:new FormControl({disabled: false,value:item[1][2]}),
        incomingZs4:new FormControl({disabled: false,value:item[1][3]}),
        incomingZs5:new FormControl({disabled: false,value:item[1][4]}),
        incomingZs6:new FormControl({disabled: false,value:item[1][5]}),
        incomingZs7:new FormControl({disabled: false,value:item[1][6]}),
        incomingZs8:new FormControl({disabled: false,value:item[1][7]}),
        incomingZs9:new FormControl({disabled: false,value:item[1][8]}),
  
        incomingIpf1:new FormControl({disabled: false,value:item[2][0]}),
        incomingIpf2:new FormControl({disabled: false,value:item[2][1]}),
        incomingIpf3:new FormControl({disabled: false,value:item[2][2]}),
        incomingIpf4:new FormControl({disabled: false,value:item[2][3]}),
        incomingIpf5:new FormControl({disabled: false,value:item[2][4]}),
        incomingIpf6:new FormControl({disabled: false,value:item[2][5]}),
        incomingIpf7:new FormControl({disabled: false,value:item[2][6]}),
        incomingIpf8:new FormControl({disabled: false,value:item[2][7]}),
        incomingIpf9:new FormControl({disabled: false,value:item[2][8]}),
      });
    }
    private populateTestRecordsForm(testRecordsItem: any){
      
      let disconnectionTimeArr = [];
      let testFaultCurrentArr  = [];
      let testLoopImpedanceArr = [];
      let testVoltageArr = [];
      let insulationResistanceArr = [];
      this.testingRecordTableArr = [];


      for(let item of testRecordsItem) {
        disconnectionTimeArr=  item.disconnectionTime.split(",");
        testFaultCurrentArr = item.testFaultCurrent.split(",");
        testLoopImpedanceArr = item.testLoopImpedance.split(",");
        testVoltageArr = item.testVoltage.split(",");
        insulationResistanceArr = item.insulationResistance.split(",");
        
        this.testingRecordTableArr.push(this.pushTestingTable(item,disconnectionTimeArr,testFaultCurrentArr,testLoopImpedanceArr,testVoltageArr,insulationResistanceArr))
      }

      // let item = [];
      // item.push(nominalVoltageAL,nominalFrequencyAL,faultCurrentAL,loopImpedanceAL,installedCapacityAL,actualLoadAL);
      return this.testingRecordTableArr
    }

    pushTestingTable(itemTestingValue: any,disconnectionTimeArr: any,testFaultCurrentArr: any,testLoopImpedanceArr: any,testVoltageArr: any,insulationResistanceArr: any) : FormGroup {
      return new FormGroup({
        testingRecordId: new FormControl({disabled: false,value: itemTestingValue.testingRecordId}),
        circuitNo: new FormControl({disabled: false,value: itemTestingValue.circuitNo}),
        circuitDesc: new FormControl({disabled: false,value: itemTestingValue.circuitDesc}),
        circuitStandardNo: new FormControl({disabled: false,value: itemTestingValue.circuitStandardNo}),
        circuitType: new FormControl({disabled: false,value: itemTestingValue.circuitType}),
        circuitRating: new FormControl({disabled: false,value: itemTestingValue.circuitRating}),
        circuitBreakingCapacity: new FormControl({disabled: false,value: itemTestingValue.circuitBreakingCapacity}),
        shortCircuitSetting: new FormControl({disabled: false,value: itemTestingValue.shortCircuitSetting}),
        eFSetting: new FormControl({disabled: false,value: itemTestingValue.eFSetting}),
        conductorInstallation: new FormControl({disabled: false,value: itemTestingValue.conductorInstallation}),
        conductorPhase: new FormControl({disabled: false,value: itemTestingValue.conductorPhase}),
        conductorNeutral: new FormControl({disabled: false,value: itemTestingValue.conductorNeutral}),
        conductorPecpc: new FormControl({disabled: false,value: itemTestingValue.conductorPecpc}),
        continutiyApproximateLength: new FormControl({disabled: false,value: itemTestingValue.continutiyApproximateLength}),
        continutiyRR: new FormControl({disabled: false,value: itemTestingValue.continutiyRR}),
        continutiyR: new FormControl({disabled: false,value: itemTestingValue.continutiyR}),
        // continutiyLL: new FormControl({disabled: false,value: itemTestingValue.continutiyLL}),
        // continutiyLE: new FormControl({disabled: false,value: itemTestingValue.continutiyLE}),
        continutiyPolarity: new FormControl({disabled: false,value: itemTestingValue.continutiyPolarity}),

        rycontinutiy: new FormControl({disabled: false,value: insulationResistanceArr[0]}),
        rbcontinutiy: new FormControl({disabled: false,value: insulationResistanceArr[1]}),
        ybcontinutiy: new FormControl({disabled: false,value: insulationResistanceArr[2]}),
        rncontinutiy: new FormControl({disabled: false,value: insulationResistanceArr[3]}),
        yncontinutiy: new FormControl({disabled: false,value: insulationResistanceArr[4]}),
        bncontinutiy: new FormControl({disabled: false,value: insulationResistanceArr[5]}),
        rpecontinutiy: new FormControl({disabled: false,value: insulationResistanceArr[6]}),
        ypecontinutiy: new FormControl({disabled: false,value: insulationResistanceArr[7]}),
        bpecontinutiy: new FormControl({disabled: false,value: insulationResistanceArr[8]}),

        ryVoltage: new FormControl({disabled: false,value: testVoltageArr[0]}),
        rbVoltage: new FormControl({disabled: false,value: testVoltageArr[1]}),
        ybVoltage: new FormControl({disabled: false,value: testVoltageArr[2]}),
        rnVoltage: new FormControl({disabled: false,value: testVoltageArr[3]}),
        ynVoltage: new FormControl({disabled: false,value: testVoltageArr[4]}),
        bnVoltage: new FormControl({disabled: false,value: testVoltageArr[5]}),
        rpeVoltage: new FormControl({disabled: false,value: testVoltageArr[6]}),
        ypeVoltage: new FormControl({disabled: false,value: testVoltageArr[7]}),
        bpeVoltage: new FormControl({disabled: false,value: testVoltageArr[8]}),

        ryLoopImpedance: new FormControl({disabled: false,value: testLoopImpedanceArr[0]}),
        rbLoopImpedance: new FormControl({disabled: false,value: testLoopImpedanceArr[1]}),
        ybLoopImpedance: new FormControl({disabled: false,value: testLoopImpedanceArr[2]}),
        rnLoopImpedance: new FormControl({disabled: false,value: testLoopImpedanceArr[3]}),
        ynLoopImpedance: new FormControl({disabled: false,value: testLoopImpedanceArr[4]}),
        bnLoopImpedance: new FormControl({disabled: false,value: testLoopImpedanceArr[5]}),
        rpeLoopImpedance: new FormControl({disabled: false,value: testLoopImpedanceArr[6]}),
        ypeLoopImpedance: new FormControl({disabled: false,value: testLoopImpedanceArr[7]}),
        bpeLoopImpedance: new FormControl({disabled: false,value: testLoopImpedanceArr[8]}),

        ryFaultCurrent: new FormControl({disabled: false,value: testFaultCurrentArr[0]}),
        rbFaultCurrent: new FormControl({disabled: false,value: testFaultCurrentArr[1]}),
        ybFaultCurrent: new FormControl({disabled: false,value: testFaultCurrentArr[2]}),
        rnFaultCurrent: new FormControl({disabled: false,value: testFaultCurrentArr[3]}),
        ynFaultCurrent: new FormControl({disabled: false,value: testFaultCurrentArr[4]}),
        bnFaultCurrent: new FormControl({disabled: false,value: testFaultCurrentArr[5]}),
        rpeFaultCurrent: new FormControl({disabled: false,value: testFaultCurrentArr[6]}),
        ypeFaultCurrent: new FormControl({disabled: false,value: testFaultCurrentArr[7]}),
        bpeFaultCurrent: new FormControl({disabled: false,value: testFaultCurrentArr[8]}),

        ryDisconnect: new FormControl({disabled: false,value: disconnectionTimeArr[0]}),
        rbDisconnect: new FormControl({disabled: false,value: disconnectionTimeArr[1]}),
        ybDisconnect: new FormControl({disabled: false,value: disconnectionTimeArr[2]}),
        rnDisconnect: new FormControl({disabled: false,value: disconnectionTimeArr[3]}),
        ynDisconnect: new FormControl({disabled: false,value: disconnectionTimeArr[4]}),
        bnDisconnect: new FormControl({disabled: false,value: disconnectionTimeArr[5]}),
        rpeDisconnect: new FormControl({disabled: false,value: disconnectionTimeArr[6]}),
        ypeDisconnect: new FormControl({disabled: false,value: disconnectionTimeArr[7]}),
        bpeDisconnect: new FormControl({disabled: false,value: disconnectionTimeArr[8]}),
        
        insulationResistance: new FormControl({disabled: false,value: itemTestingValue.insulationResistance}),
        testVoltage: new FormControl({disabled: false,value: itemTestingValue.testVoltage}),
        testLoopImpedance: new FormControl({disabled: false,value: itemTestingValue.testLoopImpedance}),
        testFaultCurrent: new FormControl({disabled: false,value: itemTestingValue.testFaultCurrent}),
        disconnectionTime: new FormControl({disabled: false,value: itemTestingValue.disconnectionTime}),
        rcdCurrent: new FormControl({disabled: false,value: itemTestingValue.rcdCurrent}),
        rcdOperatingCurrent: new FormControl({disabled: false,value: itemTestingValue.rcdOperatingCurrent}),
        rcdOperatingFiveCurrent: new FormControl({disabled: false,value: itemTestingValue.rcdOperatingFiveCurrent}),
        rcdTestButtonOperation: new FormControl({disabled: false,value: itemTestingValue.rcdTestButtonOperation}),
        rcdRemarks: new FormControl({disabled: false,value: itemTestingValue.rcdRemarks}),
      });
    }

  getdistributionIncomingValueControls(form: any) {
    return form.controls.distributionIncomingValueArr?.controls;
  }
  gettestDistributionFormControls(form: any) {
    return form.controls.testDistribution?.controls;
  }
  gettestValueControls(form: any) {
    return form.controls.testingRecords?.controls;
  }
  gettestrateFormControls(form: any) {
    return form.controls.rateArr?.controls;
  }
  getTestControls(): AbstractControl[] {
    return (<FormArray>this.testingForm.get('testaccordianArr')).controls;
  }

  private createtestDistributionForm(): FormGroup {
    return new FormGroup({
      distributionBoardDetails: new FormControl('', [Validators.required]),
      referance: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      correctSupplyPolarity: new FormControl('', [Validators.required]),
      numOutputCircuitsUse: new FormControl('', [Validators.required]),
      ratingsAmps: new FormControl(''),
      rateArr: this.formBuilder.array([this.ratingAmps()]),
      numOutputCircuitsSpare: new FormControl('', [Validators.required]),
      installedEquipmentVulnarable: new FormControl('', [Validators.required]),
      incomingVoltage: new FormControl(''),
      incomingLoopImpedance: new FormControl(''),
      incomingFaultCurrent: new FormControl(''),
      distributionIncomingValueArr: this.formBuilder.array([
        this.distributionIncomingValue(),
      ]),
    });
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
    });
  }
  ratingAmps(): FormGroup {
    return new FormGroup({
      ratingsAmps: new FormControl('', [Validators.required]),
    });
  }
  private createtestValueForm(): FormGroup {
    return new FormGroup({
      circuitNo: new FormControl(''),
      circuitDesc: new FormControl(''),
      circuitStandardNo: new FormControl(''),
      circuitType: new FormControl(''),
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
      rcdCurrent: new FormControl(''),
      rcdOperatingCurrent: new FormControl(''),
      rcdOperatingFiveCurrent: new FormControl(''),
      rcdTestButtonOperation: new FormControl(''),
      rcdRemarks: new FormControl(''),
    });
  }

  // Dynamically iterate some fields
  onKey(event: KeyboardEvent, c: any, a: any) {
    this.values = (<HTMLInputElement>event.target).value;
    this.value = this.values;
    this.testingRecords = a.controls.testingRecords as FormArray;
    this.rateArr = c.controls.rateArr as FormArray;
    if (this.testingRecords.length == 0 && this.rateArr.length == 0) {
      if (this.value != '') {
        for (this.i = 1; this.i < this.value; this.i++) {
          this.testingRecords.push(this.createtestValueForm());
          this.rateArr.push(this.ratingAmps());
        }
      }
    } else if (this.value == '') {
      this.loclength = this.testingRecords.length;
      this.loclength = this.rateArr.length;

      for (this.i = 1; this.i < this.loclength; this.i++) {
        this.testingRecords.removeAt(this.testingRecords.length - 1);
        this.rateArr.removeAt(this.rateArr.length - 1);
      }
    } else if (
      this.testingRecords.length < this.value &&
      this.rateArr.length < this.value
    ) {
      if (this.value != '') {
        this.delarr = this.value - this.testingRecords.length;
        this.delarr = this.value - this.rateArr.length;

        for (this.i = 0; this.i < this.delarr; this.i++) {
          this.testingRecords.push(this.createtestValueForm());
          this.rateArr.push(this.ratingAmps());
        }
      }
    } else
      this.testingRecords.length > this.value &&
        this.rateArr.length > this.value;
    {
      if (this.value != '') {
        this.delarr = this.testingRecords.length - this.value;
        this.delarr = this.rateArr.length - this.value;

        for (this.i = 0; this.i < this.delarr; this.i++) {
          this.testingRecords.removeAt(this.testingRecords.length - 1);
          this.rateArr.removeAt(this.rateArr.length - 1);
        }
      }
    }
  }

  createItem() {
    return this.formBuilder.group({
      locationNumber: new FormControl(),
      locationName: new FormControl(),
      testEngineerName: ['', Validators.required],
      date: ['', Validators.required],
      companyName: ['', Validators.required],
      designation: ['', Validators.required],
      detailsTestInstrument: ['', Validators.required],
      continuity: ['', Validators.required],
      insulationResisance: ['', Validators.required],
      impedance: ['', Validators.required],
      rcd: ['', Validators.required],
      earthElectrodeResistance: ['', Validators.required],

      testDistribution: this.formBuilder.array([
        this.createtestDistributionForm(),
      ]),
      testingRecords: this.formBuilder.array([this.createtestValueForm()]),
    });
  }
  createtestDistribution(): FormGroup {
    return new FormGroup({
      distributionBoardDetails: new FormControl(''),
      referance: new FormControl(''),
      location: new FormControl(''),
      correctSupplyPolarity: new FormControl(''),
      numOutputCircuitsUse: new FormControl(''),
      ratingsAmps: new FormControl(''),
      numOutputCircuitsSpare: new FormControl(''),
      installedEquipmentVulnarable: new FormControl(''),
      incomingVoltage: new FormControl(''),
      incomingLoopImpedance: new FormControl(''),
      incomingFaultCurrent: new FormControl(''),
    });
  }

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

  gotoNextModal(content4: any) {
    if (this.testingForm.invalid) {
      this.validationError = true;
      this.validationErrorMsg = 'Please check all the fields';
      setTimeout(() => {
        this.validationError = false;
      }, 3000);
      return;
    }
    this.modalService.open(content4, { centered: true });
  }

  callMethod() {
    this.ngOnInit();
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
  nextTab(flag:any) {
    if(!flag) {
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
      this.testDistribution = i.get('testDistribution') as FormArray;
      this.testingRecords = i.get('testingRecords') as FormArray;

      // coma separated value for first table
      for (let j of this.testDistribution.value) {
        let arr: any = [];
        let arr1: any = [];
        let arr2: any = [];
        let arr3: any = [];

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
        }

        let incomingVoltage: String = '';
        let incomingLoopImpedance: String = '';
        let incomingFaultCurrent: String = '';
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
        delete j.rateArr;
        delete j.distributionIncomingValueArr;
      }
      for (let x of this.testingRecords.value) {
        if (x.circuitNo == '') {
          x.circuitNo = 'NA';
        }
        if (x.continutiyRR == '') {
          x.continutiyRR = 'NA';
        }
        if (x.continutiyLL == '') {
          x.continutiyLL = 'NA';
        }
        if (x.continutiyLE == '') {
          x.continutiyLE = 'NA';
        }
        if (x.continutiyPolarity == '') {
          x.continutiyPolarity = 'NA';
        }
        if (x.conductorPecpc == '') {
          x.conductorPecpc = 'NA';
        }
        if (x.continutiyApproximateLength == '') {
          x.continutiyApproximateLength = 'NA';
        }
        if (x.continutiyR == '') {
          x.continutiyR = 'NA';
        }
        if (x.circuitStandardNo == '') {
          x.circuitStandardNo = 'NA';
        }
        if (x.conductorInstallation == '') {
          x.conductorInstallation = 'NA';
        }
        if (x.circuitType == '') {
          x.circuitType = 'NA';
        }
        if (x.circuitRating == '') {
          x.circuitRating = 'NA';
        }
        if (x.circuitBreakingCapacity == '') {
          x.circuitBreakingCapacity = 'NA';
        }
        if (x.shortCircuitSetting == '') {
          x.shortCircuitSetting = 'NA';
        }
        if (x.eFSetting == '') {
          x.eFSetting = 'NA';
        }
        if (x.conductorPhase == '') {
          x.conductorPhase = 'NA';
        }
        if (x.conductorNeutral == '') {
          x.conductorNeutral = 'NA';
        }
        if (x.circuitDesc == '') {
          x.circuitDesc = 'NA';
        }
        if (x.rcdTestButtonOperation == '') {
          x.rcdTestButtonOperation = 'NA';
        }
        if (x.rcdRemarks == '') {
          x.rcdRemarks = 'NA';
        }
        if (x.rcdCurrent == '') {
          x.rcdCurrent = 'NA';
        }

        if (x.rcdOperatingCurrent == '') {
          x.rcdOperatingCurrent = 'NA';
        }
        if (x.rcdOperatingFiveCurrent == '') {
          x.rcdOperatingFiveCurrent = 'NA';
        }
      }
      // coma saparated value for second table
      for (let n of this.testingRecords.value) {
        let arr: any = [];
        let arr1: any = [];
        let arr2: any = [];
        let arr3: any = [];
        let arr4: any = [];
        arr4.push(
          n.rycontinutiy,
          n.rbcontinutiy,
          n.ybcontinutiy,
          n.rncontinutiy,
          n.yncontinutiy,
          n.bncontinutiy,
          n.rpecontinutiy,
          n.ypecontinutiy,
          n.bpecontinutiy
        );
        arr.push(
          n.ryVoltage,
          n.rbVoltage,
          n.ybVoltage,
          n.rnVoltage,
          n.ynVoltage,
          n.bnVoltage,
          n.rpeVoltage,
          n.ypeVoltage,
          n.bpeVoltage
        );
        arr1.push(
          n.ryLoopImpedance,
          n.rbLoopImpedance,
          n.ybLoopImpedance,
          n.rnLoopImpedance,
          n.ynLoopImpedance,
          n.bnLoopImpedance,
          n.rpeLoopImpedance,
          n.ypeLoopImpedance,
          n.bpeLoopImpedance
        );
        arr2.push(
          n.ryFaultCurrent,
          n.rbFaultCurrent,
          n.ybFaultCurrent,
          n.rnFaultCurrent,
          n.ynFaultCurrent,
          n.bnFaultCurrent,
          n.rpeFaultCurrent,
          n.ypeFaultCurrent,
          n.bpeFaultCurrent
        );
        arr3.push(
          n.ryDisconnect,
          n.rbDisconnect,
          n.ybDisconnect,
          n.rnDisconnect,
          n.ynDisconnect,
          n.bnDisconnect,
          n.rpeDisconnect,
          n.ypeDisconnect,
          n.bpeDisconnect
        );
        let testVoltage: String = '';
        let testLoopImpedance: String = '';
        let testFaultCurrent: String = '';
        let disconnectionTime: String = '';
        let insulationResistance: String = '';

        for (let x of arr4) {
          if (x != '') {
            insulationResistance += x + ',';
          } else {
            insulationResistance += 'NA,';
          }
        }
        insulationResistance = insulationResistance.replace(/,\s*$/, '');
        n.insulationResistance = insulationResistance;

        for (let a of arr) {
          if (a != '') {
            testVoltage += a + ',';
          } else {
            testVoltage += 'NA,';
          }
        }
        testVoltage = testVoltage.replace(/,\s*$/, '');
        n.testVoltage = testVoltage;

        for (let b of arr1) {
          if (b != '') {
            testLoopImpedance += b + ',';
          } else {
            testLoopImpedance += 'NA,';
          }
        }
        testLoopImpedance = testLoopImpedance.replace(/,\s*$/, '');
        n.testLoopImpedance = testLoopImpedance;

        for (let c of arr2) {
          if (c != '') {
            testFaultCurrent += c + ',';
          } else {
            testFaultCurrent += 'NA,';
          }
        }

        testFaultCurrent = testFaultCurrent.replace(/,\s*$/, '');
        n.testFaultCurrent = testFaultCurrent;

        for (let d of arr3) {
          if (d != '') {
            disconnectionTime += d + ',';
          } else {
            disconnectionTime += 'NA,';
          }
        }
        disconnectionTime = disconnectionTime.replace(/,\s*$/, '');
        n.disconnectionTime = disconnectionTime;
      }
    }
    this.testingDetails.testing = this.testingForm.value.testaccordianArr;
    if(flag) {
      this.UpateInspectionService.updateTesting(this.testingDetails).subscribe(
        (data) => {
          console.log("success");
        },
        (error) => {
          console.log("error");
        });
    }
    else {
      this.testingService.savePeriodicTesting(this.testingDetails).subscribe(
        (data) => {
          this.proceedNext.emit(true);
          // show success message ofter click button
          this.success = true;
          this.successMsg = data;
          this.disable = true;
        },
        (error) => {
          this.Error = true;
          // show error button
          this.proceedNext.emit(false);
          this.errorArr = [];
          this.errorArr = JSON.parse(error.error);
          this.errorMsg = this.errorArr.message;
        }
      );
    }
  }
}

