import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
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
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InspectiondetailsService } from '../services/inspectiondetails.service';
import { InspectionDetails } from '../model/inspection-details';
import { GlobalsService } from '../globals.service';
import { of } from 'rxjs';
import { SiteService } from '../services/site.service';
import { InspectionVerificationService } from '../services/inspection-verification.service';
import { CommentsSection } from '../model/comments-section';
import { MainNavComponent } from '../main-nav/main-nav.component';
import { VerificationlvComponent } from '../verificationlv/verificationlv.component';
import { MatDialog } from '@angular/material/dialog';
import { ObservationInspection } from '../model/observation-inspection';
import { ObservationService } from '../services/observation.service';

@Component({
  selector: 'app-inspection-verification-incoming-equipment',
  templateUrl: './inspection-verification-incoming-equipment.component.html',
  styleUrls: ['./inspection-verification-incoming-equipment.component.css'],
})
export class InspectionVerificationIncomingEquipmentComponent
  implements OnInit
{
  submitted = false;
  locationList: any = [];

  @Output() proceedNext = new EventEmitter<any>();
  @Output() callTesting = new EventEmitter<any>();

  addstep3!: FormGroup;
  observationFlag: boolean= false;
  errorArrObservation: any=[];
  i: any;
  j: any;
  loclength: any;

  inActiveData: any = [];
  email: String = '';
  showField1: boolean = true;
  showField2: boolean = false;
  errorArr: any=[];
  observation= new ObservationInspection();

  inspectionDetails = new InspectionDetails();
  validationError: boolean = false;
  validationErrorMsg: String = '';
  disable: boolean = false;
  consumerArr: any = [];
  circuitArr: any = [];

  // Second Tab dependencies
  panelOpenState = false;
  InspectionList: String[] = ['Yes', 'No', 'Not Applicable'];
  incomingArr!: FormArray;
  arr: any = [];
  formBuilder: any;
  validate: boolean = false;
  testingForm: any;
  step3List: any = [];
  flag: boolean=false;
  @Output() testing = new EventEmitter<any>();
  validationErrorTab: boolean = false;
  validationErrorMsgTab: string="";
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
  modalReference: any;
  tabErrorMsg: string="";
  tabError: boolean = false;
  deletedArr: any = [];
  step3List1: any= [];
  deletedConsumer: any = [];
  deletedCircuit: any = [];
  deleteDataFlag: boolean = false;
  deleteDataFlag1: boolean = false;

  //comments end
  observationUpdateFlag: boolean= false;

  ObservationsForm = new FormGroup({
    observations: new FormControl(''),
  });
  observationValuesI: any="";
  observationModalReference: any;
  disableObservation: boolean=true;

  constructor(
    private _formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private modalService: NgbModal,
    private inspectionDetailsService: InspectiondetailsService,
    public service: GlobalsService,
    private dialog: MatDialog,
    private ChangeDetectorRef: ChangeDetectorRef,
    private observationService: ObservationService,
    private siteService: SiteService,
    private UpateInspectionService: InspectionVerificationService,
    private basic: MainNavComponent,
    private verification: VerificationlvComponent
  ) {
    this.email = this.router.snapshot.paramMap.get('email') || '{}';
  }

  ngOnInit(): void {
    this.currentUser=sessionStorage.getItem('authenticatedUser');
    this.currentUser1 = [];
    this.currentUser1=JSON.parse(this.currentUser);
    this.addstep3 = this._formBuilder.group({
      incomingArr: this._formBuilder.array([this.createItem()]),
      viewerCommentArr: this._formBuilder.array([this.addCommentViewer()]),
      completedCommentArr1: this._formBuilder.array([]),
    });
    this.refresh();
    this.expandedIndex = -1 ;

    this.ObservationsForm = this._formBuilder.group({
      observations: [''],
     })
  }

  retrieveDetailsfromSavedReports(userName: any,siteId: any,clientName: any,departmentName: any,site: any,data: any){ 
    // if(this.service.disableFields==true){
    //   this.addstep3.disable();
    //  }
        this.step3List = JSON.parse(data);
        this.inspectionDetails.siteId = siteId;
        this.deletedArr = [];
        this.inspectionDetails.periodicInspectionId = this.step3List.periodicInspection.periodicInspectionId;
        this.inspectionDetails.createdBy = this.step3List.periodicInspection.createdBy;
        this.inspectionDetails.createdDate  = this.step3List.periodicInspection.createdDate;
        this.flag = true;
        this.populateData(this.step3List.periodicInspection);
        this.populateDataComments();
  }

  retrieveAllDetailsforIncoming(userName: any,siteId: any,data: any){ 
    // if(this.service.disableFields==true){
    //   this.addstep3.disable();
    //  }
        this.step3List1 = JSON.parse(data);
        this.inspectionDetails.siteId = siteId;
        this.deletedArr = [];
        this.inspectionDetails.periodicInspectionId = this.step3List1.periodicInspectionId;
        this.inspectionDetails.createdBy = this.step3List1.createdBy;
        this.inspectionDetails.createdDate  = this.step3List1.createdDate;
        this.flag = true;
        this.populateData(this.step3List1);
  }

 
//comments section starts

populateDataComments() {
  this.hideShowComment=true;
  this.reportViewerCommentArr = [];
  this.completedCommentArr3 = [];
  this.completedCommentArr4 = [];
  this.arrViewer = [];
  this.completedCommentArr1 = this.addstep3.get('completedCommentArr1') as FormArray;
 for(let value of this.step3List.periodicInspection.periodicInspectorComment){
  this.arrViewer = [];
   if(this.currentUser1.role == 'Inspector' ) { //Inspector
    if(value.approveOrReject == 'APPROVED') {
      this.completedComments = true;
      this.enabledViewer=true;
      for(let j of this.step3List.periodicInspection.periodicInspectorComment) {
        if(value.noOfComment == j.noOfComment) {
          this.completedCommentArr3.push(j);
        }
      }
       this.completedCommentArr4.push(this.addItem1(this.completedCommentArr3));               
      this.completedCommentArr3 = [];
    }
    for(let j of this.step3List.periodicInspection.periodicInspectorComment) {
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
        // this.addstep3.setControl('viewerCommentArr', this._formBuilder.array(this.reportViewerCommentArr || []))
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
               for(let j of this.step3List.periodicInspection.periodicInspectorComment) {
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
               if(this.step3List.periodicInspection.periodicInspectorComment.length < 1) {
                 this.reportViewerCommentArr.push(this.addCommentViewer());
                 this.addstep3.setControl('viewerCommentArr', this._formBuilder.array(this.reportViewerCommentArr || []));
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
                  this.addstep3.setControl('viewerCommentArr', this._formBuilder.array(this.reportViewerCommentArr || []))
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
             this.addstep3.setControl('viewerCommentArr', this._formBuilder.array(this.reportViewerCommentArr || []))
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
            for(let j of this.step3List.periodicInspection.periodicInspectorComment) {
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
       this.addstep3.setControl('viewerCommentArr', this._formBuilder.array(this.arrViewer || []))
       this.addstep3.setControl('completedCommentArr1', this._formBuilder.array(this.completedCommentArr4 || []));
}
retrieveFromObservationInspection(data:any){
  this.observation=JSON.parse(data);
  this.observationValuesI=this.observation.observations;
  this.observationUpdateFlag=true;
  this.ObservationsForm.markAsPristine();
  }

  addObservation(observationIter:any){
    if(this.ObservationsForm.touched || this.ObservationsForm.untouched){
      this.observationModalReference = this.modalService.open(observationIter, {
         centered: true, 
         size: 'md'
        })
     }

 
   }



showHideAccordion(index: number) {  
  //console.log(x);
  this.expandedIndexx = index === this.expandedIndexx ? -1 : index;  
  this.isClicked[index] = !this.isClicked[index];
  }
  getViewerFirstMessage(x: any) {
    return x.controls.completedCommentArr.controls[0].controls.viewerComments.value;
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
      this.inspectionDetailsService.sendComments(this.comments,this.inspectionDetails.siteId).subscribe(
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
      this.inspectionDetailsService.replyComments(this.comments,this.inspectionDetails.siteId).subscribe(
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
      this.inspectionDetailsService.approveRejectComments(this.comments,this.inspectionDetails.siteId).subscribe(
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
    this.inspectionDetailsService.approveRejectComments(this.comments,this.inspectionDetails.siteId).subscribe(
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
      this.viewerCommentArr = this.addstep3.get('viewerCommentArr') as FormArray;
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
    
      (this.addstep3.get('viewerCommentArr') as FormArray).removeAt(index);
  }
  
  getViewerCommentControls(): AbstractControl[] {
      return (<FormArray>this.addstep3.get('viewerCommentArr')).controls;
  }
  getCompletedCommentControls1(): AbstractControl[] {
    return (<FormArray>this.addstep3.get('completedCommentArr1')).controls;
  }
  getCompletedCommentControls(form: any){
    return form.controls.completedCommentArr?.controls;
  }
  refreshCommentSection() {
    this.spinner=true;
    this.cardBodyComments=false;
    this.siteService.retrieveFinal(this.savedUserName,this.inspectionDetails.siteId).subscribe(
      (data) => {
         this.commentDataArr = JSON.parse(data);
         this.step3List.periodicInspection.periodicInspectorComment = this.commentDataArr.periodicInspection.periodicInspectorComment;
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


  populateData(value:any) {
 
    this.arr = [];
    for (let item of value.ipaoInspection) {
      this.arr.push(this.createGroup(item));
      
    }
    this.addstep3.setControl('incomingArr', this._formBuilder.array(this.arr || []))
  }

  createGroup(item: any): FormGroup {
    return this._formBuilder.group({
      ipaoInspectionId: new FormControl({disabled: false,value: item.ipaoInspectionId}),
      locationName: new FormControl({disabled: false,value: item.locationName}, [Validators.required]),
      locationNumber: new FormControl({disabled: false,value: item.locationNumber}, [Validators.required]),
      locationCount: new FormControl({disabled: false,value: item.locationCount}),
      serviceCable: new FormControl({disabled: false,value: item.serviceCable}, [Validators.required]),
      serviceFuse: new FormControl({disabled: false,value: item.serviceFuse}, [Validators.required]),
      meterDistributor: new FormControl({disabled: false,value: item.meterDistributor}, [Validators.required]),
      meterConsumer: new FormControl({disabled: false,value: item.meterConsumer}, [Validators.required]),
      meterEqu: new FormControl({disabled: false,value: item.meterEqu}, [Validators.required]),
      isolator: new FormControl({disabled: false,value: item.isolator}, [Validators.required]),

      earthingArrangement: new FormControl({disabled: false,value: item.earthingArrangement}, [Validators.required]),
      adequateArrangement: new FormControl({disabled: false,value: item.adequateArrangement}, [Validators.required]),
      connectionGenerator: new FormControl({disabled: false,value: item.connectionGenerator}, [Validators.required]),
      compatibilityCharacteristics: new FormControl({disabled: false,value: item.compatibilityCharacteristics}, [Validators.required]),
      automaticDisconnectGenerator: new FormControl({disabled: false,value: item.automaticDisconnectGenerator}, [Validators.required]),
      preventConnectGenerator: new FormControl({disabled: false,value: item.preventConnectGenerator}, [Validators.required]),
      isolateGenerator: new FormControl({disabled: false,value: item.isolateGenerator}, [Validators.required]),

      mainEarting: new FormControl({disabled: false,value: item.mainEarting}, [Validators.required]),
      earthElectordeArrangement: new FormControl({disabled: false,value: item.earthElectordeArrangement}, [Validators.required]),
      earthConductorConnection: new FormControl({disabled: false,value: item.earthConductorConnection}, [Validators.required]),
      accessibility: new FormControl({disabled: false,value: item.accessibility}, [Validators.required]),
      aainProtectBonding: new FormControl({disabled: false,value: item.aainProtectBonding}, [Validators.required]),
      allProtectBonding: new FormControl({disabled: false,value: item.allProtectBonding}, [Validators.required]),
      allAppropriateLocation: new FormControl({disabled: false,value: item.allAppropriateLocation}, [Validators.required]),
      felvRequirement: new FormControl({disabled: false,value: item.felvRequirement}, [Validators.required]),

      selvSystem: new FormControl({disabled: false,value: item.selvSystem}, [Validators.required]),
      pelvSystem: new FormControl({disabled: false,value: item.pelvSystem}, [Validators.required]),
      doubleInsulation: new FormControl({disabled: false,value: item.doubleInsulation}, [Validators.required]),
      reinforcedInsulation: new FormControl({disabled: false,value: item.reinforcedInsulation}, [Validators.required]),
      basicElectricalSepartion: new FormControl({disabled: false,value: item.basicElectricalSepartion}, [Validators.required]),
      //isolatePublicSupply: new FormControl({disabled: false,value: item.isolatePublicSupply}, [Validators.required]),
      insulationLiveParts: new FormControl({disabled: false,value: item.insulationLiveParts}, [Validators.required]),
      barriersEnclosers: new FormControl({disabled: false,value: item.barriersEnclosers}, [Validators.required]),
      obstacles: new FormControl({disabled: false,value: item.obstacles}, [Validators.required]),
      placingOutReach: new FormControl({disabled: false,value: item.placingOutReach}, [Validators.required]),
      // nonConductLocation: new FormControl({disabled: false,value: item.nonConductLocation}, [Validators.required]),
      faultElectricalSepartion: new FormControl({disabled: false,value: item.faultElectricalSepartion}, [Validators.required]),
      faultNonConductLocation: new FormControl({disabled: false,value: item.faultNonConductLocation}, [Validators.required]),
      operatingCurrent: new FormControl({disabled: false,value: item.operatingCurrent}, [Validators.required]),
      supplementaryBonding: new FormControl({disabled: false,value: item.supplementaryBonding}, [Validators.required]),
      specificInspectionRe: new FormControl({disabled: false,value: item.specificInspectionRe}),
      consumerUnit: this._formBuilder.array(this.populateEarthing(item.consumerUnit,item.ipaoInspectionId)),
      circuit: this._formBuilder.array(this.populateCircuit(item.circuit,item.ipaoInspectionId)),
      isolationCurrent: this._formBuilder.array([
        this.populateIsolationCurrentForm(item.isolationCurrent),
      ]),
      inspectionFlag: new FormControl(item.inspectionFlag),
    });
  }

  private populateEarthing(itemValue: any,ipaoInspectionId: any) {
    let earthingArr: any =  [];
    for(let i of itemValue) {
      earthingArr.push(this.populateEarthingForm(i,ipaoInspectionId));
    }
    return earthingArr;
  }

  private populateCircuit(itemValue: any,ipaoInspectionId: any) {
    let earthingArr1: any =  [];
    for(let i of itemValue) {
      earthingArr1.push(this.populateCircuitForm(i,ipaoInspectionId));
    }
    return earthingArr1;
  }

  private populateEarthingForm(itemvalue: any,ipaoInspectionId: any): FormGroup {
    return new FormGroup({
      consumerId: new FormControl({disabled: false,value: itemvalue.consumerId}),
      ipaoInspectionId: new FormControl({disabled: false,value: ipaoInspectionId}),
      locationCount: new FormControl({disabled: false,value: itemvalue.locationCount}),
      distributionBoardDetails: new FormControl({ disabled: false, value: itemvalue.distributionBoardDetails },[Validators.required]),
      referance: new FormControl({ disabled: false, value: itemvalue.referance },[Validators.required]),
      location: new FormControl({ disabled: false, value: itemvalue.location },[Validators.required]),
      accessWorking: new FormControl({disabled: false,value: itemvalue.accessWorking}, [Validators.required]),
      securityFixing: new FormControl({disabled: false,value: itemvalue.securityFixing}, [Validators.required]),
      livePartsDamage: new FormControl({disabled: false,value: itemvalue.livePartsDamage}, [Validators.required]),
      securityBarriers: new FormControl({disabled: false,value: itemvalue.securityBarriers}, [Validators.required]),
      suitabilityEnclosure: new FormControl({disabled: false,value: itemvalue.suitabilityEnclosure}, [Validators.required]),
      enclosureDamaged: new FormControl({disabled: false,value: itemvalue.enclosureDamaged}, [Validators.required]),
      presenceObstacles: new FormControl({disabled: false,value: itemvalue.presenceObstacles}, [Validators.required]),
      placingOutOfConsumer: new FormControl({disabled: false,value: itemvalue.placingOutOfConsumer}, [Validators.required]),
      presenceMainSwitches: new FormControl({disabled: false,value: itemvalue.presenceMainSwitches}, [Validators.required]),
      operationMainSwitches: new FormControl({disabled: false,value: itemvalue.operationMainSwitches}, [Validators.required]),
      manualCircuitBreakers: new FormControl({disabled: false,value: itemvalue.manualCircuitBreakers}, [Validators.required]),
      switchCausesRcd: new FormControl({disabled: false,value: itemvalue.switchCausesRcd}, [Validators.required]),
      rcdFaultProtection: new FormControl({disabled: false,value: itemvalue.rcdFaultProtection}, [Validators.required]),
      rcdAdditionalProtection: new FormControl({disabled: false,value: itemvalue.rcdAdditionalProtection}, [Validators.required]),
      overVoltageProtection: new FormControl({disabled: false,value: itemvalue.overVoltageProtection}, [Validators.required]),
      indicationOfSpd: new FormControl({disabled: false,value: itemvalue.indicationOfSpd}, [Validators.required]),
      rcdQuarterlyTest: new FormControl({disabled: false,value: itemvalue.rcdQuarterlyTest}, [Validators.required]),
      diagramsCharts: new FormControl({disabled: false,value: itemvalue.diagramsCharts}, [Validators.required]),
      nonstandardCableColour: new FormControl({disabled: false,value: itemvalue.nonstandardCableColour}, [Validators.required]),
      alSupplyOfOrign: new FormControl({disabled: false,value: itemvalue.alSupplyOfOrign}, [Validators.required]),
      alSupplyOfMeter: new FormControl({disabled: false,value: itemvalue.alSupplyOfMeter}, [Validators.required]),
      alSupplyDistribution: new FormControl({disabled: false,value: itemvalue.alSupplyDistribution}, [Validators.required]),
      allPointsIsolation: new FormControl({disabled: false,value: itemvalue.allPointsIsolation}, [Validators.required]),
      nextInspection: new FormControl({disabled: false,value: itemvalue.nextInspection}, [Validators.required]),
      otherRequiredLabelling: new FormControl({disabled: false,value: itemvalue.otherRequiredLabelling}, [Validators.required]),
      basesCorrectType: new FormControl({disabled: false,value: itemvalue.basesCorrectType}, [Validators.required]),
      singlePole: new FormControl({disabled: false,value: itemvalue.singlePole}, [Validators.required]),
      mechanicalDamage: new FormControl({disabled: false,value: itemvalue.mechanicalDamage}, [Validators.required]),
      electromagnetic: new FormControl({disabled: false,value: itemvalue.electromagnetic}, [Validators.required]),
      allConductorCon: new FormControl({disabled: false,value: itemvalue.allConductorCon}, [Validators.required]),
      consumerStatus: new FormControl(itemvalue.consumerStatus),
    });
  }

  private populateCircuitForm(itemvalue: any,ipaoInspectionId: any): FormGroup {
    return new FormGroup({
      circuitId: new FormControl({disabled: false,value: itemvalue.circuitId}),
      ipaoInspectionId: new FormControl({disabled: false,value: ipaoInspectionId}),
      identificationConductors: new FormControl({disabled: false,value: itemvalue.identificationConductors}, [Validators.required]),
      distributionBoardDetails: new FormControl({ disabled: false, value: itemvalue.distributionBoardDetails },[Validators.required]),
      referance: new FormControl({ disabled: false, value: itemvalue.referance },[Validators.required]),
      location: new FormControl({ disabled: false, value: itemvalue.location },[Validators.required]),
      cableInstallation: new FormControl({disabled: false,value: itemvalue.cableInstallation}, [Validators.required]),
      examinationCables: new FormControl({disabled: false,value: itemvalue.examinationCables}, [Validators.required]),
      examinationInsulation: new FormControl({disabled: false,value: itemvalue.examinationInsulation}, [Validators.required]),
      nonSheathedCables: new FormControl({disabled: false,value: itemvalue.nonSheathedCables}, [Validators.required]),
      containmentSystems: new FormControl({disabled: false,value: itemvalue.containmentSystems}, [Validators.required]),
      temperatureRating: new FormControl({disabled: false,value: itemvalue.temperatureRating}, [Validators.required]),
      cablesTerminated: new FormControl({disabled: false,value: itemvalue.cablesTerminated}, [Validators.required]),
      currentCarryCapacity: new FormControl({disabled: false,value: itemvalue.currentCarryCapacity}, [Validators.required]),
      adequacyProtectDevices: new FormControl({disabled: false,value: itemvalue.adequacyProtectDevices}, [Validators.required]),
      presenceProtectConductors: new FormControl({disabled: false,value: itemvalue.presenceProtectConductors}, [Validators.required]),
      coOrdination: new FormControl({disabled: false,value: itemvalue.coOrdination}, [Validators.required]),
      wiringSystems: new FormControl({disabled: false,value: itemvalue.wiringSystems}, [Validators.required]),
      cablesConcealUnderFloors: new FormControl({disabled: false,value: itemvalue.cablesConcealUnderFloors}, [Validators.required]),
      provisionFireBarriers: new FormControl({disabled: false,value: itemvalue.provisionFireBarriers}, [Validators.required]),
      sectionsRegardlessDepth: new FormControl({disabled: false,value: itemvalue.sectionsRegardlessDepth}, [Validators.required]),
      cablesConcDepth: new FormControl({disabled: false,value: itemvalue.cablesConcDepth}, [Validators.required]),
      operatingCurrentSocket: new FormControl({disabled: false,value: itemvalue.operatingCurrentSocket}, [Validators.required]),
      operatingCurrentCircuits: new FormControl({disabled: false,value: itemvalue.operatingCurrentCircuits}, [Validators.required]),
      separationBand: new FormControl({disabled: false,value: itemvalue.separationBand}, [Validators.required]),
      separationElectrical: new FormControl({disabled: false,value: itemvalue.separationElectrical}, [Validators.required]),
      conditionCircuitAccessories: new FormControl({disabled: false,value: itemvalue.conditionCircuitAccessories}, [Validators.required]),
      conductorCorrectTerminated: new FormControl({disabled: false,value: itemvalue.conductorCorrectTerminated}, [Validators.required]),
      conductorVisibleOutside: new FormControl({disabled: false,value: itemvalue.conductorVisibleOutside}, [Validators.required]),
      connLiveConductors: new FormControl({disabled: false,value: itemvalue.connLiveConductors}, [Validators.required]),
      adequatelyConnectedEnclosure: new FormControl({disabled: false,value: itemvalue.adequatelyConnectedEnclosure}, [Validators.required]),
      suitabilityCircuitAccessories: new FormControl({disabled: false,value: itemvalue.suitabilityCircuitAccessories}, [Validators.required]),
      conditionAccessories: new FormControl({disabled: false,value: itemvalue.conditionAccessories}, [Validators.required]),
      singlePoleDevices: new FormControl({disabled: false,value: itemvalue.singlePoleDevices}, [Validators.required]),
      adequacyConnections: new FormControl({disabled: false,value: itemvalue.adequacyConnections}, [Validators.required]),
      isolationSwitching: new FormControl({disabled: false,value: itemvalue.isolationSwitching}, [Validators.required]),
      circuitStatus: new FormControl(itemvalue.circuitStatus),
    });
  }

  private populateIsolationCurrentForm(itemvalue: any): FormGroup {
    return new FormGroup({
      isolationCurrentId: new FormControl({disabled: false,value: itemvalue[0]['isolationCurrentId']}),
      presenceDevices: new FormControl({disabled: false,value: itemvalue[0]['presenceDevices']}, [Validators.required]),
      conditionDevices: new FormControl({disabled: false,value: itemvalue[0]['conditionDevices']}, [Validators.required]),
      locationDevices: new FormControl({disabled: false,value: itemvalue[0]['locationDevices']}, [Validators.required]),
      capableSecured: new FormControl({disabled: false,value: itemvalue[0]['capableSecured']}, [Validators.required]),
      operationVerify: new FormControl({disabled: false,value: itemvalue[0]['operationVerify']}, [Validators.required]),
      installCircuit: new FormControl({disabled: false,value: itemvalue[0]['installCircuit']}, [Validators.required]),
      warningLabel: new FormControl({disabled: false,value: itemvalue[0]['warningLabel']}, [Validators.required]),
      swPresenceDevices: new FormControl({disabled: false,value: itemvalue[0]['swPresenceDevices']}, [Validators.required]),
      swConditionDevices: new FormControl({disabled: false,value: itemvalue[0]['swConditionDevices']}, [Validators.required]),
      swAcceptableLocation: new FormControl({disabled: false,value: itemvalue[0]['swAcceptableLocation']}, [Validators.required]),
      swCapableOffPosition: new FormControl({disabled: false,value: itemvalue[0]['swCapableOffPosition']}, [Validators.required]),
      swCorrectOperation: new FormControl({disabled: false,value: itemvalue[0]['swCorrectOperation']}, [Validators.required]),
      swCircuit: new FormControl({disabled: false,value: itemvalue[0]['swCircuit']}, [Validators.required]),
      swWarningLabel: new FormControl({disabled: false,value: itemvalue[0]['swWarningLabel']}, [Validators.required]),
      emSwitPresenceDevices: new FormControl({disabled: false,value: itemvalue[0]['emSwitPresenceDevices']}, [Validators.required]),
      emSwitConditionDevices: new FormControl({disabled: false,value: itemvalue[0]['emSwitConditionDevices']}, [Validators.required]),
      emSwitLocationDevices: new FormControl({disabled: false,value: itemvalue[0]['emSwitLocationDevices']}, [Validators.required]),
      emSwitOperationVerify: new FormControl({disabled: false,value: itemvalue[0]['emSwitOperationVerify']}, [Validators.required]),
      emSwitInstallCircuit: new FormControl({disabled: false,value: itemvalue[0]['emSwitInstallCircuit']}, [Validators.required]),
      fuSwitPresenceDevices: new FormControl({disabled: false,value: itemvalue[0]['fuSwitPresenceDevices']}, [Validators.required]),
      fuSwitLocationDevices: new FormControl({disabled: false,value: itemvalue[0]['fuSwitLocationDevices']}, [Validators.required]),
      fuSwitOperationVerify: new FormControl({disabled: false,value: itemvalue[0]['fuSwitOperationVerify']}, [Validators.required]),

      suitabilityEquipment: new FormControl({disabled: false,value: itemvalue[0]['suitabilityEquipment']}, [Validators.required]),
      enclosureNotDamaged: new FormControl({disabled: false,value: itemvalue[0]['enclosureNotDamaged']}, [Validators.required]),
      suitabilityEnvironment: new FormControl({disabled: false,value: itemvalue[0]['suitabilityEnvironment']}, [Validators.required]),
      securityFixing: new FormControl({disabled: false,value: itemvalue[0]['securityFixing']}, [Validators.required]),
      cableEntryHoles: new FormControl({disabled: false,value: itemvalue[0]['cableEntryHoles']}, [Validators.required]),
      provisionVoltage: new FormControl({disabled: false,value: itemvalue[0]['provisionVoltage']}, [Validators.required]),
      provisionOverload: new FormControl({disabled: false,value: itemvalue[0]['provisionOverload']}, [Validators.required]),
      correctTypeLamps: new FormControl({disabled: false,value: itemvalue[0]['correctTypeLamps']}, [Validators.required]),
      insulaDisplacementBox: new FormControl({disabled: false,value: itemvalue[0]['insulaDisplacementBox']}, [Validators.required]),
      overheatSurrounding: new FormControl({disabled: false,value: itemvalue[0]['overheatSurrounding']}, [Validators.required]),
      overheatConductors: new FormControl({disabled: false,value: itemvalue[0]['overheatConductors']}, [Validators.required]),
    });
  }


  getearthingControls(form: any) {
    return form.controls.consumerUnit.controls;
  }
  private createEarthingForm(): FormGroup {
    return new FormGroup({
      distributionBoardDetails:  new FormControl('', [Validators.required]),
      referance:  new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      accessWorking: new FormControl('', [Validators.required]),
      securityFixing: new FormControl('', [Validators.required]),
      livePartsDamage: new FormControl('', [Validators.required]),
      securityBarriers: new FormControl('', [Validators.required]),
      suitabilityEnclosure: new FormControl('', [Validators.required]),
      enclosureDamaged: new FormControl('', [Validators.required]),
      presenceObstacles: new FormControl('', [Validators.required]),
      placingOutOfConsumer: new FormControl('', [Validators.required]),
      presenceMainSwitches: new FormControl('', [Validators.required]),
      operationMainSwitches: new FormControl('', [Validators.required]),
      manualCircuitBreakers: new FormControl('', [Validators.required]),
      switchCausesRcd: new FormControl('', [Validators.required]),
      rcdFaultProtection: new FormControl('', [Validators.required]),
      rcdAdditionalProtection: new FormControl('', [Validators.required]),
      overVoltageProtection: new FormControl('', [Validators.required]),
      indicationOfSpd: new FormControl('', [Validators.required]),
      rcdQuarterlyTest: new FormControl('', [Validators.required]),
      diagramsCharts: new FormControl('', [Validators.required]),
      nonstandardCableColour: new FormControl('', [Validators.required]),
      alSupplyOfOrign: new FormControl('', [Validators.required]),
      alSupplyOfMeter: new FormControl('', [Validators.required]),
      alSupplyDistribution: new FormControl('', [Validators.required]),
      allPointsIsolation: new FormControl('', [Validators.required]),
      nextInspection: new FormControl('', [Validators.required]),
      otherRequiredLabelling: new FormControl('', [Validators.required]),
      basesCorrectType: new FormControl('', [Validators.required]),
      singlePole: new FormControl('', [Validators.required]),
      mechanicalDamage: new FormControl('', [Validators.required]),
      electromagnetic: new FormControl('', [Validators.required]),
      allConductorCon: new FormControl('', [Validators.required]),
      consumerStatus: new FormControl('A'),
    });
  }
  getcircuitControls(form: any) {
    return form.controls.circuit.controls;
  }
  private createcircuitForm(): FormGroup {
    return new FormGroup({
      identificationConductors: new FormControl('', [Validators.required]),
      distributionBoardDetails:  new FormControl('', [Validators.required]),
      referance:  new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      cableInstallation: new FormControl('', [Validators.required]),
      examinationCables: new FormControl('', [Validators.required]),
      examinationInsulation: new FormControl('', [Validators.required]),
      nonSheathedCables: new FormControl('', [Validators.required]),
      containmentSystems: new FormControl('', [Validators.required]),
      temperatureRating: new FormControl('', [Validators.required]),
      cablesTerminated: new FormControl('', [Validators.required]),
      currentCarryCapacity: new FormControl('', [Validators.required]),
      adequacyProtectDevices: new FormControl('', [Validators.required]),
      presenceProtectConductors: new FormControl('', [Validators.required]),
      coOrdination: new FormControl('', [Validators.required]),
      wiringSystems: new FormControl('', [Validators.required]),
      cablesConcealUnderFloors: new FormControl('', [Validators.required]),
      provisionFireBarriers: new FormControl('', [Validators.required]),
      sectionsRegardlessDepth: new FormControl('', [Validators.required]),
      cablesConcDepth: new FormControl('', [Validators.required]),
      operatingCurrentSocket: new FormControl('', [Validators.required]),
      operatingCurrentCircuits: new FormControl('', [Validators.required]),
      separationBand: new FormControl('', [Validators.required]),
      separationElectrical: new FormControl('', [Validators.required]),
      conditionCircuitAccessories: new FormControl('', [Validators.required]),
      conductorCorrectTerminated: new FormControl('', [Validators.required]),
      conductorVisibleOutside: new FormControl('', [Validators.required]),
      connLiveConductors: new FormControl('', [Validators.required]),
      adequatelyConnectedEnclosure: new FormControl('', [Validators.required]),
      suitabilityCircuitAccessories: new FormControl('', [Validators.required]),
      conditionAccessories: new FormControl('', [Validators.required]),
      singlePoleDevices: new FormControl('', [Validators.required]),
      adequacyConnections: new FormControl('', [Validators.required]),
      isolationSwitching: new FormControl('', [Validators.required]),
      circuitStatus: new FormControl('A'),
    });
  }

  getisolationCurrentControls(form: any) {
    return form.controls.isolationCurrent.controls;
  }
  private createisolationCurrentForm(): FormGroup {
    return new FormGroup({
      presenceDevices: new FormControl('', [Validators.required]),
      conditionDevices: new FormControl('', [Validators.required]),
      locationDevices: new FormControl('', [Validators.required]),
      capableSecured: new FormControl('', [Validators.required]),
      operationVerify: new FormControl('', [Validators.required]),
      installCircuit: new FormControl('', [Validators.required]),
      warningLabel: new FormControl('', [Validators.required]),
      swPresenceDevices: new FormControl('', [Validators.required]),
      swConditionDevices: new FormControl('', [Validators.required]),
      swAcceptableLocation: new FormControl('', [Validators.required]),
      swCapableOffPosition: new FormControl('', [Validators.required]),
      swCorrectOperation: new FormControl('', [Validators.required]),
      swCircuit: new FormControl('', [Validators.required]),
      swWarningLabel: new FormControl('', [Validators.required]),
      emSwitPresenceDevices: new FormControl('', [Validators.required]),
      emSwitConditionDevices: new FormControl('', [Validators.required]),
      emSwitLocationDevices: new FormControl('', [Validators.required]),
      emSwitOperationVerify: new FormControl('', [Validators.required]),
      emSwitInstallCircuit: new FormControl('', [Validators.required]),
      fuSwitPresenceDevices: new FormControl('', [Validators.required]),
      fuSwitLocationDevices: new FormControl('', [Validators.required]),
      fuSwitOperationVerify: new FormControl('', [Validators.required]),

      suitabilityEquipment: new FormControl('', [Validators.required]),
      enclosureNotDamaged: new FormControl('', [Validators.required]),
      suitabilityEnvironment: new FormControl('', [Validators.required]),
      securityFixing: new FormControl('', [Validators.required]),
      cableEntryHoles: new FormControl('', [Validators.required]),
      provisionVoltage: new FormControl('', [Validators.required]),
      provisionOverload: new FormControl('', [Validators.required]),
      correctTypeLamps: new FormControl('', [Validators.required]),
      insulaDisplacementBox: new FormControl('', [Validators.required]),
      overheatSurrounding: new FormControl('', [Validators.required]),
      overheatConductors: new FormControl('', [Validators.required]),
    });
  }
  get f() {
    return this.addstep3.controls;
  }
  addItem() {
    this.incomingArr = this.addstep3.get('incomingArr') as FormArray;
    this.incomingArr.push(this.createItem());
  }

  getIncomingControls(): AbstractControl[] {
    return (<FormArray>this.addstep3.get('incomingArr')).controls;
  }

  // populateData() {
  //   for (let item of this.sitePersons) {
  //     this.arr.push(this.createGroup(item));
  //   }
  //   this.updateSiteForm.setControl('arr', this.formBuilder.array(this.arr || []))
  // }

  // createGroup(item: any): FormGroup {
  //   return this.formBuilder.group({
  //     personIncharge: new FormControl({disabled: true ,value: item.personIncharge}),
  //     designation: new FormControl({disabled: true, value: item.designation}),
  //     contactNo: new FormControl({disabled: true ,value: item.contactNo}),
  //     personInchargeEmail: new FormControl({disabled: true,value: item.personInchargeEmail}),
  //     personId: new FormControl({disabled: true ,value: item.personId}),
  //     inActive: new FormControl({disabled: true, value:item.inActive}),
  //     // countryCode: new FormControl(''),

  //   });
  // }

  createItem() {
    return this._formBuilder.group({
      locationName: new FormControl('', [Validators.required]),
      locationNumber: new FormControl('', [Validators.required]),
      serviceCable: new FormControl('', [Validators.required]),
      serviceFuse: new FormControl('', [Validators.required]),
      meterDistributor: new FormControl('', [Validators.required]),
      meterConsumer: new FormControl('', [Validators.required]),
      meterEqu: new FormControl('', [Validators.required]),
      isolator: new FormControl('', [Validators.required]),

      earthingArrangement: new FormControl('', [Validators.required]),
      adequateArrangement: new FormControl('', [Validators.required]),
      connectionGenerator: new FormControl('', [Validators.required]),
      compatibilityCharacteristics: new FormControl('', [Validators.required]),
      automaticDisconnectGenerator: new FormControl('', [Validators.required]),
      preventConnectGenerator: new FormControl('', [Validators.required]),
      isolateGenerator: new FormControl('', [Validators.required]),

      mainEarting: new FormControl('', [Validators.required]),
      earthElectordeArrangement: new FormControl('', [Validators.required]),
      earthConductorConnection: new FormControl('', [Validators.required]),
      accessibility: new FormControl('', [Validators.required]),
      aainProtectBonding: new FormControl('', [Validators.required]),
      allProtectBonding: new FormControl('', [Validators.required]),
      allAppropriateLocation: new FormControl('', [Validators.required]),
      felvRequirement: new FormControl('', [Validators.required]),

      selvSystem: new FormControl('', [Validators.required]),
      pelvSystem: new FormControl('', [Validators.required]),
      doubleInsulation: new FormControl('', [Validators.required]),
      reinforcedInsulation: new FormControl('', [Validators.required]),
      basicElectricalSepartion: new FormControl('', [Validators.required]),
      //isolatePublicSupply: new FormControl('', [Validators.required]),
      insulationLiveParts: new FormControl('', [Validators.required]),
      barriersEnclosers: new FormControl('', [Validators.required]),
      obstacles: new FormControl('', [Validators.required]),
      placingOutReach: new FormControl('', [Validators.required]),
      // nonConductLocation: new FormControl('', [Validators.required]),
      faultElectricalSepartion: new FormControl('', [Validators.required]),
      faultNonConductLocation: new FormControl('', [Validators.required]),
      operatingCurrent: new FormControl('', [Validators.required]),
      supplementaryBonding: new FormControl('', [Validators.required]),
      specificInspectionRe: new FormControl(''),


      consumerUnit: this._formBuilder.array([this.createEarthingForm()]),
      circuit: this._formBuilder.array([this.createcircuitForm()]),
      isolationCurrent: this._formBuilder.array([
        this.createisolationCurrentForm(),
      ]),
      inspectionFlag: new FormControl('A'),
    });
  }

  addIncoming(a: any) {
    this.consumerArr = a.controls.consumerUnit as FormArray;
    this.circuitArr = a.controls.circuit as FormArray;
    
    this.consumerArr.push(this.createEarthingForm());
    this.circuitArr.push(this.createcircuitForm());
  }

  removeConsumerCircuit(a: any,j: any) {
    this.addstep3.markAsTouched();

    this.consumerArr = a.controls.consumerUnit as FormArray;
    this.circuitArr = a.controls.circuit as FormArray;

    if(this.flag && this.consumerArr.value[j].consumerId!=null && this.consumerArr.value[j].consumerId!='' && this.consumerArr.value[j].consumerId!=undefined){
      this.consumerArr.value[j].consumerStatus='R';
      this.deletedConsumer.push(this.consumerArr.value[j]);
    }

    if(this.flag && this.circuitArr.value[j].circuitId!=null && this.circuitArr.value[j].circuitId!='' && this.circuitArr.value[j].circuitId!=undefined){
      this.circuitArr.value[j].circuitStatus='R';
      this.deletedCircuit.push(this.circuitArr.value[j]);
    }

    this.consumerArr.removeAt(j);
    this.circuitArr.removeAt(j);
    this.addstep3.markAsDirty();
  }

  ChangeBoardDetails(e: any, a: any,i: any){
    let values = e.target.value;
    this.circuitArr = a.controls.circuit as FormArray;
    this.circuitArr.controls[i].controls.distributionBoardDetails.setValue(values);
  }

  ChangeBoardName(e: any,a: any, i: any){
    let values = e.target.value;
    this.circuitArr = a.controls.circuit as FormArray;
    this.circuitArr.controls[i].controls.referance.setValue(values);
  }

  ChangeLocation(e: any,a: any, i: any){
    let values = e.target.value;
    this.circuitArr = a.controls.circuit as FormArray;
    this.circuitArr.controls[i].controls.location.setValue(values);
  }

  refresh() {
    this.ChangeDetectorRef.detectChanges();
  }
  removeItem(index: any) {
    this.addstep3.markAsDirty();
    if(this.flag) {
      this.addstep3.markAsTouched();
      if(this.addstep3.value.incomingArr[index].ipaoInspectionId != 0 
        && this.addstep3.value.incomingArr[index].ipaoInspectionId != '' 
         && this.addstep3.value.incomingArr[index].ipaoInspectionId != undefined ) {
          this.addstep3.value.incomingArr[index].inspectionFlag = 'R';
          this.deletedArr.push(this.addstep3.value.incomingArr[index]);
         }
    }
    (this.addstep3.get('incomingArr') as FormArray).removeAt(index);
  }
  onChangeForm(event:any){
    if(!this.addstep3.invalid){
      this.validationError=false;
     }
  }
  onKeyForm(event: KeyboardEvent) { 
    if(!this.addstep3.invalid){
     this.validationError=false;
    }
   }
   reloadFromBack(){
    if(this.addstep3.invalid){
     this.service.isCompleted3= false;
     this.service.isLinear=true;
     this.service.editable=false;
     this.validationErrorTab = true;
     this.validationErrorMsgTab= 'Please check all the fields in inspection';
     setTimeout(() => {
       this.validationErrorTab = false;
     }, 3000);
     return false;
    }
    else if(this.addstep3.dirty && this.addstep3.touched){
      this.service.isCompleted3= false;
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
   this.service.isCompleted3= true;
   this.service.isLinear=false;
   this.service.editable=true;
   this.addstep3.markAsPristine();
   return true;
    }
  }
  gotoNextTab() {
    if ((this.addstep3.dirty && this.addstep3.invalid) || this.service.isCompleted2==false) {
      this.service.isCompleted3= false;
      this.service.isLinear=true;      
      this.service.editable=false;
      this.validationErrorTab = true;
      this.validationErrorMsgTab= 'Please check all the fields in inspection';
      setTimeout(() => {
        this.validationErrorTab = false;
      }, 3000);
      return;
    }
    else if(this.addstep3.dirty && this.addstep3.touched){
      this.service.isCompleted3= false;
      this.service.isLinear=true;
      this.service.editable=false;
      this.tabError = true;
      this.tabErrorMsg = 'Kindly click on next button to update the changes!';
      setTimeout(() => {
        this.tabError = false;
      }, 3000);
   }
    else{
      this.service.isCompleted3= true;
      this.service.isLinear=false;
      this.service.editable=true;
    }
  }
  gotoNextModal(content3: any,content2:any) {
    if (this.addstep3.invalid) {
      this.validationError = true;
      this.validationErrorMsg = 'Please check all the fields';
      // setTimeout(() => {
      //   this.validationError = false;
      // }, 3000);
      return;
    }
    if(this.addstep3.touched || this.addstep3.untouched){
      this.modalReference = this.modalService.open(content2, {
         centered: true, 
         size: 'md'
        })
     }
     if(this.addstep3.dirty && this.addstep3.touched){ //update
      this.modalService.open(content3, { centered: true});
      this.modalReference.close();
     }
   
  }
  closeModalDialog() {
    if (this.errorMsg != '') {
      this.Error = false;
      this.service.isCompleted3= false;
      this.service.isLinear=true;
      this.modalService.dismissAll((this.errorMsg = ''));
    } 
    else {
      this.success = false;
      this.service.isCompleted3= true;
      this.service.isLinear=false;
      this.modalService.dismissAll((this.successMsg = ''));
      this.disable = false;
    }
  }
  onKeyObservation(event:any){
    if(this.ObservationsForm.dirty){
      this.disableObservation=false;
    }
    else{
      this.disableObservation=true;
    }
  }
  submit(observeFlag:any){
    if (this.ObservationsForm.invalid) {
     return;
   }
   this.observation.siteId = this.service.siteCount;
   this.observation.userName = this.router.snapshot.paramMap.get('email') || '{}';
   this.observation.observationComponent ="Inspection-Component";
   this.observation.observations =this.ObservationsForm.value.observations;
   this.submitted = true;
   if(!observeFlag) {
    this.observationService.addObservation(this.observation).subscribe(
      (data) => {
        this.success = true;
        this.successMsg = "Observation Information sucessfully Saved";
        this.proceedNext.emit(true);
        this.disableObservation=true;
        this.observationFlag=true;
        this.observationService.retrieveObservation(this.observation.siteId,this.observation.observationComponent,this.observation.userName).subscribe(
          (data) => {
          this.retrieveFromObservationInspection(data);
          },
          (error) => {
            this.errorArr = [];
            this.errorArr = JSON.parse(error.error);
            console.log(this.errorArr.message);
          }
        )
        setTimeout(() => {
          this.success = false;
          this.observationModalReference.close();
        }, 3000);
    },
      (error) => {
        this.errorArrObservation = [];
        this.Error = true;
        this.errorArrObservation = JSON.parse(error.error);
        this.errorMsg = this.errorArrObservation.message;
        this.observationFlag=false;
      }
    )
  }
  else {
    this.observationService.updateObservation(this.observation).subscribe(
      (data) => {
        this.success = true;
        this.successMsg = "Observation Information sucessfully updated";
        this.proceedNext.emit(false);
        this.disableObservation=true;
        setTimeout(() => {
          this.success = false;
          this.observationModalReference.close();
        }, 3000);
    },
      (error) => {
        this.errorArrObservation = [];
        this.Error = true;
        this.errorArrObservation = JSON.parse(error.error);
        this.errorMsg = this.errorArrObservation.message;
      }
    )
  }   
     }
     
  nextTab3(flag: any) {
    if(!flag) {
      this.inspectionDetails.siteId = this.service.siteCount;
    }
    this.incomingArr = this.addstep3.get('incomingArr') as FormArray;
    this.inspectionDetails.userName = this.email;
    this.submitted = true;
    if (this.addstep3.invalid) {
      return;
    }
    this.service.iterationList = this.incomingArr.value;
    this.inspectionDetails.ipaoInspection = this.addstep3.value.incomingArr;

    if(flag) {
      if(this.addstep3.dirty){
        if(this.deletedArr.length != 0) {
          for(let i of this.deletedArr) {
            this.inspectionDetails.ipaoInspection.push(i);
          }
        }

       //Consumer
       for(let i of this.deletedConsumer) {
          for(let j of this.inspectionDetails.ipaoInspection) {
            for(let k of j.consumerUnit) {
              if(k.ipaoInspectionId == i.ipaoInspectionId) {
                if(k.consumerId != i.consumerId) {
                  this.deleteDataFlag = true;
                }
                else {
                  this.deleteDataFlag = false;
                }
              }
            }
            if(this.deleteDataFlag) {
              j.consumerUnit.push(i);
              this.deleteDataFlag = false;
            }
          }
        }

        //Circuit
       for(let i of this.deletedCircuit) {
        for(let j of this.inspectionDetails.ipaoInspection) {
          for(let k of j.circuit) {
            if(k.ipaoInspectionId == i.ipaoInspectionId) {
              if(k.circuitId != i.circuitId) {
                this.deleteDataFlag1 = true;
              }
              else {
                this.deleteDataFlag1 = false;
              }
            }
          }
          if(this.deleteDataFlag1) {
            j.circuit.push(i);
            this.deleteDataFlag1 = false;
          }
        }
      }
      this.UpateInspectionService.updateIncoming(this.inspectionDetails).subscribe(
        data=> {
          if(this.step3List.length!=undefined && this.step3List.length!=0){
            this.proceedNext.emit(false);
          }
          else if(this.step3List.testingReport != null){
            this.proceedNext.emit(false);
          }
          else{
            this.proceedNext.emit(true);
          }
          this.success = true;
          this.service.isCompleted3= true;
          this.service.isLinear=false;
          this.successMsg = 'Incoming Equipment Successfully Updated';
          this.addstep3.markAsPristine();
         },
         (error) => {
          this.Error = true;
          this.service.isCompleted3= false;
          this.service.isLinear=true;
          this.errorMsg = 'Something went wrong, kindly check all the fields';
         });
        }
    }
    else {
      this.inspectionDetailsService
      .addInspectionDetails(this.inspectionDetails)
      .subscribe(
        (data: any) => {
          this.proceedNext.emit(true);
          this.success = true;
          this.service.isCompleted3= true;
          this.service.isLinear=false;
          this.addstep3.markAsPristine();
          this.successMsg = 'Incoming Equipment Successfully Saved';
          this.inspectionDetailsService.retrieveInspectionDetails(this.inspectionDetails.userName,this.inspectionDetails.siteId).subscribe(
            data=>{
             this.retrieveAllDetailsforIncoming(this.inspectionDetails.userName,this.inspectionDetails.siteId,data);
            }
          )
          if(!this.observationFlag){
            this.observation.siteId = this.service.siteCount;
            this.observation.userName = this.router.snapshot.paramMap.get('email') || '{}';
            this.observation.observationComponent ="Inspection-Component";
            this.observation.observations="No observation recorded"
              this.observationService.addObservation(this.observation).subscribe(
                (data) => {
                  this.proceedNext.emit(true);
                        this.observationService.retrieveObservation(this.observation.siteId,this.observation.observationComponent,this.observation.userName).subscribe(
                          (data) => {
                          this.retrieveFromObservationInspection(data);
                          },
                          (error) => {
                            this.errorArr = [];
                            this.errorArr = JSON.parse(error.error);
                          console.log(this.errorArr.message);
                          }
                        )
                  
              },
                (error) => {
                  this.errorArrObservation = [];
                  this.errorArrObservation = JSON.parse(error.error);
                  console.log(this.errorArrObservation.message);
                }
              )
          }
        },
        (error) => {
          this.proceedNext.emit(false);
          this.Error = true;
          this.errorMsg = 'Something went wrong, kindly check all the fields';
          this.service.isCompleted3= false;
          this.service.isLinear=true;
        });
    }
    // this.verification.testingNgOnINit();
  }
}