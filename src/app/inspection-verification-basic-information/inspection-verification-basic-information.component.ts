import { SignatorDetails } from './../model/reportdetails';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup,Validators,ValidatorFn } from '@angular/forms';
import {​​​ NgbModal }​​​ from'@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../model/company';
import { Department } from '../model/department';
import { Reportdetails } from '../model/reportdetails';
import { Site } from '../model/site';
import { ClientService } from '../services/client.service';
import { DepartmentService } from '../services/department.service';
import { ReportDetailsService } from '../services/report-details.service';
import { SiteService } from '../services/site.service';
import { GlobalsService } from '../globals.service';
import { iif } from 'rxjs';
import { InspectionVerificationService } from '../services/inspection-verification.service';
import { CommentsSection } from '../model/comments-section';
import { DatePipe } from '@angular/common';
import { InspectorregisterService } from '../services/inspectorregister.service';
import { ignoreElements } from 'rxjs/operators';
import { MainNavComponent } from '../main-nav/main-nav.component'; 
import { VerificationlvComponent } from '../verificationlv/verificationlv.component';
import { ReturnTypeTransform } from '@angular/compiler-cli/src/ngtsc/transform';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ConfirmationBoxComponent } from '../confirmation-box/confirmation-box.component';
import { SignatureComponent } from '../signature/signature.component';

@Component({
  selector: 'app-inspection-verification-basic-information',
  templateUrl: './inspection-verification-basic-information.component.html',
  styleUrls: ['./inspection-verification-basic-information.component.css']
})
export class InspectionVerificationBasicInformationComponent implements OnInit,OnDestroy {
 
//e-siganture in progress

  step1Form!: FormGroup;
  public data: string = "";
  model: any = {};
  clientList: any = [];
  inActiveData: any =[];
  departmentList: any = [];
  departmentListInspec: any = [];
  siteListInspec: any = [];
  clientArray : any = [];
  countryList: any = [];
  stateList1: any = [];
  stateList2: any = [];
  stateList3: any = [];
  stateList4: any = [];
  company =new Company;
  department = new Department;
  site = new Site;
  email: String = '';
  clientName: String = '';
  
  departmentName: String = '';
  reportDetails =new Reportdetails;
  showField1: boolean= true;
  showField2: boolean= true;
  showDesigner2: boolean= false;
  showAddButton: boolean= true;
  loading = false;
  submitted = false;
  inspectorArr!: FormArray;
  demoarr: any =[]
  mobilearr: any=[];
  mobilearr1: any=[];
  mobilearr2: any=[];
  mobilearr3: any=[];
  flag: boolean=false;
  checkLoginNumber:String='';
  designer2Arr!: FormArray;
  @Output() proceedNext = new EventEmitter<any>();
  designer1Role: String ='designer1';
  designer2Role: String ='designer2';
  contractorRole: String ='contractor';
  inspectorRole: String ='inspector';
  validationError: boolean =false;
  validationErrorMsg: String ="";
  disable: boolean = false;
  retrieveSave: boolean = false; 
  step1List: any = [];
  siteDetails: boolean = true;
  siteDetails1: boolean = false;
  state1: String = "";
  state2: String = "";
  state3: String = "";
  state4: String = "";
  retrivedSiteId!: number;
 
  // Second Tab dependencies
  panelOpenState = false;
  installationList: String[]= ['New Installation','First Verification Of An Existing Installation','Addition Of An Existing Installation','Alteration In An Existing Installation','Periodic Verification'];
  premiseList: String[]= ['Domestic(Individual)','Domestic(Apartment)','Commercial','IT/Office','Data Center','Industrial(Non Ex Environment)','Industrial(Ex Environment)'];
  evidenceList: String[]= ['Yes', 'No', 'Not Apparent'];
  previousRecordList: String[]= ['Yes', 'No'];
  formBuilder: any;
  countryCode: any;
  number: any;
  countryCode1: any;
  countryCode7: any;
  countryCode6: any;
  countryCode5: any;
  countryCode4: any;
  countryCode3: any;
  countryCode2: any;
  errorArr: any=[];
  setReadOnly: boolean = false;
  setReadOnly1: boolean = false;

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
//From assign viewer
companyNameSite: String = '';
departmentNameSite: String = '';
siteValue: String = '';
ShowNext: boolean = true;
  modalReference: any;
  tabError: boolean=false;
  tabErrorMsg: string="";
  lastInspectionDate: boolean=false;
  showPersonNameMsg: boolean = false;
  declarationPersonName: string="";
  values: any;
  designer2PersonName: string="";
  designer2PersonNameMsg: boolean = false;
  validationErrorTab: boolean = false;
  validationErrorMsgTab: string="";
  ContractorPersonNameMsg: boolean = false;
  ContractorPersonName: string="";
  deletedArr: any = [];
  finalSpinner: boolean = true;
  popup: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private clientService: ClientService,
    private departmentService: DepartmentService,
    private reportDetailsService: ReportDetailsService,
    private siteService: SiteService,
    private UpateBasicService: InspectionVerificationService,
    public service: GlobalsService,
    private modalService: NgbModal,private dialog: MatDialog,
    private basic: MainNavComponent,private verification: VerificationlvComponent,
    private registerService: InspectorregisterService,
    private ChangeDetectorRef: ChangeDetectorRef,public datepipe: DatePipe) {
     
    this.email = this.router.snapshot.paramMap.get('url') || '{}';
    setInterval(() => {
      this.today = new Date();
    }, 1);
    
  }
  ngOnDestroy(): void {
    this.service.viewerData = [];
    this.service.inspectorData = [];
    this.service.msgForStep1Flag=false;
    this.service.isCompleted= true;
    this.service.isLinear=false;
    this.service.editable=true;
    this.service.lvClick=0;
    this.service.logoutClick=0;
    this.service.windowTabClick=0;
    this.service.signatureImg1="";
    this.service.signatureImg2="";
    this.service.signatureImg3="";
    this.service.signatureImg4="";
    this.service.sigInput=0;
  }

  ngOnInit(): void {
    if(this.service.msgForStep1Flag){
      this.service.msgForStep1=true;
      setTimeout(() => {
       this.service.msgForStep1 = false;
     }, 5000);
    }
    this.currentUser=sessionStorage.getItem('authenticatedUser');
    this.currentUser1 = [];
    this.currentUser1=JSON.parse(this.currentUser);
    this.countryCode= '91';
    this.countryCode1= '91';
    this.countryCode2= '91';
    this.countryCode3= '91';
    this.countryCode4= '91';
    this.countryCode5= '91';
    this.countryCode6= '91';
    this.countryCode7= '91';
    // viewer
    this.reportDetails.clientDetails = this.service.viewerData.name + "-" +this.service.viewerData.address;
    this.reportDetails.designation = this.service.viewerData.designation;
    this.reportDetails.company = this.service.viewerData.companyName;

    // inspector
    this.reportDetails.verifiedEngineer = this.service.inspectorData.name;
    this.reportDetails.inspectorDesignation = this.service.inspectorData.designation;
    this.reportDetails.inspectorCompanyName = this.service.inspectorData.companyName;

    this.companyNameSite = this.service.viewerData.companyName;
    this.departmentNameSite = this.service.viewerData.department;
    this.siteValue = this.service.viewerData.siteName;
    this.step1Form = this._formBuilder.group({
      clientName: [''],
      departmentName: [''],
      siteName: [''],
      clientName1: [''],
      departmentName1: [''],
      site1: [''],
      descriptionOfReport: ['', Validators.required],
      reasonOfReport: ['', Validators.required],
      installationType: ['', Validators.required],
      descPremise: ['', Validators.required],
      showField1: ['', Validators.required],
      evidenceAlterations: ['', Validators.required],
      showField2: ['', Validators.required],
      previousRecord: [''],
      inspectionLast: ['', Validators.required],
      extentInstallation: ['', Validators.required],
      detailsOfClient: ['', Validators.required],
      detailsOfInstallation: ['', Validators.required],
      startingDateVerification: ['', Validators.required],
      engineerName: [this.reportDetails.verifiedEngineer, Validators.required],
      designation: ['', Validators.required],
      companyName: [this.reportDetails.company, Validators.required],
      inspectorDesignation: [this.reportDetails.inspectorDesignation, Validators.required],
      inspectorCompanyName: [this.reportDetails.inspectorCompanyName, Validators.required],
      limitations: ['', Validators.required],
      nextInspection: ['', Validators.required],
      designer1AcknowledgeArr: this._formBuilder.array([this.createDesigner1AcknowledgeForm()]),
      designer2AcknowledgeArr: this._formBuilder.array([this.createDesigner2AcknowledgeForm()]),
      contractorAcknowledgeArr: this._formBuilder.array([this.createContractorAcknowledgeForm()]),
      inspectorAcknowledgeArr: this._formBuilder.array([this.createInspectorAcknowledgeForm(this.service.inspectorData)]),
      designer1Arr: this._formBuilder.array([this.createDesigner1Form()]),
      designer2Arr: this._formBuilder.array([this.createDesigner2Form()]),
      contractorArr: this._formBuilder.array([this.createContractorForm()]),
      inspectorArr: this._formBuilder.array([this.createInspectorForm(this.service.inspectorData)]),
      viewerCommentArr: this._formBuilder.array([this.addCommentViewer()]),
      completedCommentArr1: this._formBuilder.array([]),
      //inspectorCommentArr: this._formBuilder.array([this.addCommentInspector()])
    });
   
    this.siteService.retrieveCountry().subscribe(
      data => {
        this.countryList = JSON.parse(data);
      }
    )
    this.refresh();
    this.retrieveSiteDetails(this.service.viewerData.companyName,this.service.viewerData.department,this.service.viewerData.siteName);
    this.inspectorArr = this.step1Form.get('inspectorArr') as FormArray;
    this.expandedIndex = -1 ;
    //this.service.siteCount = this.reportDetails.siteId;
  }

/*e-siganture starts in progress*/ 
SignatureDesigner1(){
    this.dialog.open(SignatureComponent, {
      maxHeight: '90vh',
      disableClose: true,
    });
  }
  focusSigDesigner1(a: any){
  // if(this.service.sigInput==1){
     return a.controls.declarationSignature.markAsDirty();
    //}
  }
  SignatureDesigner2(){
    this.dialog.open(SignatureComponent, {
      maxHeight: '90vh',
      disableClose: true,
    });
  }
  focusSigDesigner2(a: any){
  // if(this.service.sigInput==1){
     return a.controls.declarationSignature.markAsDirty();
    //}
  }
  SignatureContractor(){
    this.dialog.open(SignatureComponent, {
      maxHeight: '90vh',
      disableClose: true,
    });
  }
  focusSigContractor(a: any){
  // if(this.service.sigInput==1){
     return a.controls.declarationSignature.markAsDirty();
    //}
  }
  SignatureInspector(){
    this.dialog.open(SignatureComponent, {
      maxHeight: '90vh',
      disableClose: true,
    });
  }
  focusSigInspector(a: any){
  // if(this.service.sigInput==1){
     return a.controls.declarationSignature.markAsDirty();
    //}
  }
  /*e-siganture ends*/
  focusPersonFunction(){
    if(this.declarationPersonName==''){
      this.showPersonNameMsg=true;
    }
    else{
      this.showPersonNameMsg=false;
    }
  } 
  designer2PersonFunction(){
    if(this.designer2PersonName==''){
      this.designer2PersonNameMsg=true;
    }
    else{
      this.designer2PersonNameMsg=false;
    }
  }
  ContractorPersonFunction(){
    if(this.ContractorPersonName==''){
      this.ContractorPersonNameMsg=true;
    }
    else{
      this.ContractorPersonNameMsg=false;
    }
  }
  onKeyPersonName(event: KeyboardEvent) { 
    this.values = (<HTMLInputElement>event.target).value;
   if(this.values==''){
    this.showPersonNameMsg=true;
   }
   else{
    this.showPersonNameMsg=false;
  }
  }
  onKeyDesigner2PersonName(event: KeyboardEvent){
    this.values = (<HTMLInputElement>event.target).value;
    if(this.values==''){
     this.designer2PersonNameMsg=true;
     this.removeDesigner();
     this.step1Form.markAsDirty();
    }
    else{
     this.designer2PersonNameMsg=false;
   }
  }
  onKeyContractorPersonName(event: KeyboardEvent){
    this.values = (<HTMLInputElement>event.target).value;
    if(this.values==''){
     this.ContractorPersonNameMsg=true;
    }
    else{
     this.ContractorPersonNameMsg=false;
   }
  }
//for company site detail continue
  changeTab(index: number, sitedId: any, userName: any, clientName: any, departmentName: any, site: any): void {
    this.siteDetails1 = true;
    this.siteDetails = false;
    this.clearSiteValidator();
    this.step1Form.patchValue({
      clientName1: clientName,
      departmentName1: departmentName,
      site1: site,
    });
    this.reportDetails.siteId = sitedId;
  }
 
  // saved report
  retrieveDetailsfromSavedReports(userName: any,siteId: any,clientName: any,departmentName: any,site: any,data: any){
    // if(this.step1Form.dirty){
    //   this.service.lvClick=1;
    // }
       this.service.siteCount = siteId;
       this.savedUserName = userName;
       this.deletedArr = [];
       this.siteDetails1 = true;
       this.siteDetails = false;
       this.clearSiteValidator();
       this.step1List = JSON.parse(data);
       this.reportDetails.siteId = siteId;
       this.reportDetails.reportId = this.step1List.reportDetails.reportId;
       this.reportDetails.installationType=this.step1List.reportDetails.installationType;
       this.showWiringAge(this.step1List.reportDetails.installationType);
       this.reportDetails.descriptionPremise=this.step1List.reportDetails.descriptionPremise;
       this.reportDetails.evidanceAddition=this.step1List.reportDetails.evidanceAddition;
       this.showEstimatedAge(this.step1List.reportDetails.evidanceAddition);
       this.reportDetails.previousRecords=this.step1List.reportDetails.previousRecords;
       this.previousRecord(this.step1List.reportDetails.previousRecords);
       this.reportDetails.lastInspection=this.step1List.reportDetails.lastInspection;
       this.step1List.evidenceAlterations=this.step1List.reportDetails.evidenceAlterations;
       this.reportDetails.limitations= this.step1List.reportDetails.limitations;
       this.reportDetails.createdBy = this.step1List.reportDetails.createdBy;
       this.reportDetails.createdDate = this.step1List.reportDetails.createdDate;
       this.reportDetails.estimatedWireAge = this.step1List.reportDetails.estimatedWireAge;
       //this.showField2= this.step1List.reportDetails.evidanceWireAge,
       this.step1List.state=this.step1List.reportDetails.state;
       this.setReadOnly = true;
       this.populateData(this.step1List.reportDetails.signatorDetails);
       this.populateDataComments();
       //this.notification();

      for( let i of this.step1List.reportDetails.signatorDetails) {
        if(i.signatorRole == "designer1"){
          this.step1Form.patchValue({
            designer1AcknowledgeArr: [i]
          })
          this.designer1changeCountry(i.country);
        this.state1 = i.state;
        }
          else if(i.signatorRole == "designer2"){
          this.step1Form.patchValue({
            designer2AcknowledgeArr: [i]
          })
          this.showDesigner2 = true;
          this.state2 = i.state;
          this.designer2changeCountry(i.country);
         }
       else if(i.signatorRole == "contractor"){
        this.step1Form.patchValue({
          contractorAcknowledgeArr: [i]
         })
        this.state3 = i.state;
        this.contractorchangeCountry(i.country);
       }
       else if(i.signatorRole == "inspector"){
          this.step1Form.patchValue({
            inspectorAcknowledgeArr: [i]
          })
          this.state4 = i.state;
          this.inspectorchangeCountry(i.country);
        }
      }
       this.step1Form.patchValue({
        clientName1: clientName,
        departmentName1: departmentName,
        site1: site,
        descriptionOfReport: this.step1List.reportDetails.descriptionReport,
        reasonOfReport: this.step1List.reportDetails.reasonOfReport,
        showField1: this.step1List.reportDetails.estimatedWireAge,
       // evidenceAlterations: [this.step1List.reportDetails.evidenceAlterations],
        showField2: this.step1List.reportDetails.evidanceWireAge,
        inspectionLast: this.step1List.reportDetails.lastInspection,
        nextInspection: this.step1List.reportDetails.nextInspection,
        extentInstallation: this.step1List.reportDetails.extentInstallation,
        detailsOfClient:this.step1List.reportDetails.clientDetails,
        detailsOfInstallation: this.step1List.reportDetails.installationDetails,
        startingDateVerification: this.step1List.reportDetails.verificationDate,
        engineerName: this.step1List.reportDetails.verifiedEngineer,
        designation: this.step1List.reportDetails.designation,
        companyName: this.step1List.reportDetails.company,
        inspectorDesignation: this.step1List.reportDetails.inspectorDesignation,
        inspectorCompanyName: this.step1List.reportDetails.inspectorCompanyName,
        limitations: this.step1List.reportDetails.limitations
    })
    this.flag=true;
   
    }

// retrieve basic report
retrieveAllDetailsforBasic(userName: any,siteId: any,site:any,data: any){
  // if(this.service.disableFields==true){
  //   this.step1Form.disable();
  //  }
    this.service.siteCount = siteId;
     this.savedUserName = userName;
     this.deletedArr = [];
     this.siteDetails1 = true;
     this.siteDetails = false;
     this.clearSiteValidator();
     this.step1List = JSON.parse(data);
     this.reportDetails.siteId = siteId;
     this.reportDetails.reportId = this.step1List.reportId;
     this.reportDetails.installationType=this.step1List.installationType;
     this.showWiringAge(this.step1List.installationType);
     this.reportDetails.descriptionPremise=this.step1List.descriptionPremise;
     this.reportDetails.evidanceAddition=this.step1List.evidanceAddition;
     this.showEstimatedAge(this.step1List.evidanceAddition);
     this.reportDetails.previousRecords=this.step1List.previousRecords;
     this.previousRecord(this.step1List.previousRecords);
     this.reportDetails.lastInspection=this.step1List.lastInspection;
     this.step1List.evidenceAlterations=this.step1List.evidenceAlterations;
     this.reportDetails.limitations= this.step1List.limitations;
     this.reportDetails.createdBy = this.step1List.createdBy;
     this.reportDetails.createdDate = this.step1List.createdDate;
     this.reportDetails.estimatedWireAge = this.step1List.estimatedWireAge;
     //this.showField2= this.step1List.evidanceWireAge,
     this.step1List.state=this.step1List.state;
     this.setReadOnly = true;
     this.populateData(this.step1List.signatorDetails);

    for( let i of this.step1List.signatorDetails) {
      if(i.signatorRole == "designer1"){
        this.step1Form.patchValue({
          designer1AcknowledgeArr: [i]
        })
        this.designer1changeCountry(i.country);
      this.state1 = i.state;
      }
        else if(i.signatorRole == "designer2"){
        this.step1Form.patchValue({
          designer2AcknowledgeArr: [i]
        })
        this.showDesigner2 = true;
        this.state2 = i.state;
        this.designer2changeCountry(i.country);
       }
     else if(i.signatorRole == "contractor"){
      this.step1Form.patchValue({
        contractorAcknowledgeArr: [i]
       })
      this.state3 = i.state;
      this.contractorchangeCountry(i.country);
     }
     else if(i.signatorRole == "inspector"){
        this.step1Form.patchValue({
          inspectorAcknowledgeArr: [i]
        })
        this.state4 = i.state;
        this.inspectorchangeCountry(i.country);
      }
    }
     this.step1Form.patchValue({
      site1: site,
      descriptionOfReport: this.step1List.descriptionReport,
      reasonOfReport: this.step1List.reasonOfReport,
      showField1: this.step1List.estimatedWireAge,
     // evidenceAlterations: [this.step1List.evidenceAlterations],
      showField2: this.step1List.evidanceWireAge,
      inspectionLast: this.step1List.lastInspection,
      nextInspection: this.step1List.nextInspection,
      extentInstallation: this.step1List.extentInstallation,
      detailsOfClient:this.step1List.clientDetails,
      detailsOfInstallation: this.step1List.installationDetails,
      startingDateVerification: this.step1List.verificationDate,
      engineerName: this.step1List.verifiedEngineer,
      designation: this.step1List.designation,
      companyName: this.step1List.company,
      inspectorDesignation: this.step1List.inspectorDesignation,
      inspectorCompanyName: this.step1List.inspectorCompanyName,
      limitations: this.step1List.limitations
  })
  this.flag=true;
 // this.disable=true;
   }


   reloadFromBack(){
    this.step1Form.markAsPristine();
  }
   
//comments section starts

populateDataComments() {
  this.hideShowComment=true;
  this.reportViewerCommentArr = [];
  this.completedCommentArr3 = [];
  this.completedCommentArr4 = [];
  this.arrViewer = [];
  this.completedCommentArr1 = this.step1Form.get('completedCommentArr1') as FormArray;
 for(let value of this.step1List.reportDetails.reportDetailsComment){
  this.arrViewer = [];
   if(this.currentUser1.role == 'Inspector' ) { //Inspector
    if(value.approveOrReject == 'APPROVED') {
      this.completedComments = true;
      this.enabledViewer=true;
      for(let j of this.step1List.reportDetails.reportDetailsComment) {
        if(value.noOfComment == j.noOfComment) {
          this.completedCommentArr3.push(j);
        }
      }
       this.completedCommentArr4.push(this.addItem(this.completedCommentArr3));               
      this.completedCommentArr3 = [];
    }
    for(let j of this.step1List.reportDetails.reportDetailsComment) {
      if((j.approveOrReject == 'REJECT' || j.approveOrReject == '' || j.approveOrReject == null) && j.viewerFlag==1)
          {
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
          this.basic.newNotify();
          //this.basic.notification(1,value.viewerUserName,value.inspectorUserName,value.viewerDate,value.inspectorDate);
        }
        else{
          this.basic.newNotify();
         // this.basic.notification(0,value.viewerUserName,value.inspectorUserName,value.viewerDate,value.inspectorDate);
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
        // this.step1Form.setControl('viewerCommentArr', this._formBuilder.array(this.reportViewerCommentArr || []))
         }

         //Viewer starts
         else { 
           if(value.inspectorFlag=='1'){
             if(value.approveOrReject == 'APPROVED') {
              if(value.viewerFlag=='1' && value.inspectorFlag=='1')
              {
                this.basic.newNotify();
                //this.basic.notification(0,value.viewerUserName,value.inspectorUserName,value.viewerDate,value.inspectorDate);
              }
            
               this.completedComments = true;
               this.enabledViewer=true;
               for(let j of this.step1List.reportDetails.reportDetailsComment) {
                 if(value.noOfComment == j.noOfComment) {
                   this.completedCommentArr3.push(j);
                 }
               }
            
                this.completedCommentArr4.push(this.addItem(this.completedCommentArr3));               
               this.completedCommentArr3 = [];
             }

             else{ //reject & null
               this.enabledViewer=true;
               if(value.viewerFlag=='1' && value.inspectorFlag=='1')
               {
                 if(value.approveOrReject == '') {
                  this.basic.newNotify();
                 //this.basic.notification(1,value.viewerUserName,value.inspectorUserName,value.viewerDate,value.inspectorDate);
                 }
               }
               if(this.step1List.reportDetails.reportDetailsComment.length < 1) {
                 this.reportViewerCommentArr.push(this.addCommentViewer());
                 this.step1Form.setControl('viewerCommentArr', this._formBuilder.array(this.reportViewerCommentArr || []));
               }
               else {  //reject & both flags 1
                if(value.viewerFlag=='1' && value.inspectorFlag=='1')
                {
                  if(value.approveOrReject == '') {
                    this.basic.newNotify();
                  //this.basic.notification(1,value.viewerUserName,value.inspectorUserName,value.viewerDate,value.inspectorDate);
                  }
                }
                  this.enabled=true;
                  this.enabledRequest=false;
                  this.hideAdd=false;
                  this.addReject=true;
                  this.hideapprove=true;
                  this.hideReject=true;
                  this.reportViewerCommentArr.push(this.createCommentGroup(value));
                  this.step1Form.setControl('viewerCommentArr', this._formBuilder.array(this.reportViewerCommentArr || []))
               }
               this.hideCommentSection= true;
               this.hideAsViewerLogin=false;
               this.replyCommentBox=true;
               this.SendReply=false;
               this.sendComment=true;
             }   
             this.hideCommentSection= true;
             this.sendComment=true;
             this.hideRefresh=false;
             this.replyCommentBox=true;
             this.hideAdd=false;
            }
            else { //inspector flag 0
              if(value.viewerFlag=='1'){
               this.enabledViewer=true;
               this.sendComment=false;
               this.replyCommentBox=true;
               this.disableSend=true;
              }
              else{ //viewer flag 0
               this.enabledViewer=false;
               this.sendComment=true;
               this.replyCommentBox=true;
              }
             this.reportViewerCommentArr.push(this.createCommentGroup(value));
             this.step1Form.setControl('viewerCommentArr', this._formBuilder.array(this.reportViewerCommentArr || []))
             this.reportViewerCommentArr = [];
             this.hideCommentSection= true;
             this.hideRefresh=false;
             this.hideAdd=false;
             this.hideapprove=false;
             this.hideReject=false;
             this.enabledViewer=true;
            }
            for(let j of this.step1List.reportDetails.reportDetailsComment) {
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
       this.step1Form.setControl('viewerCommentArr', this._formBuilder.array(this.arrViewer || []))
       this.step1Form.setControl('completedCommentArr1', this._formBuilder.array(this.completedCommentArr4 || []));
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
      this.reportDetailsService.sendComments(this.comments,this.reportDetails.siteId).subscribe(
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
      this.reportDetailsService.replyComments(this.comments,this.reportDetails.siteId).subscribe(
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
      this.reportDetailsService.approveRejectComments(this.comments,this.reportDetails.siteId).subscribe(
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
      // this.basic.notification(0,'viewerUserName','inspectorUserName','viewerDate','inspectorDate');
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
    this.reportDetailsService.approveRejectComments(this.comments,this.reportDetails.siteId).subscribe(
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
      this.viewerCommentArr = this.step1Form.get('viewerCommentArr') as FormArray;
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
    
      (this.step1Form.get('viewerCommentArr') as FormArray).removeAt(index);
  }
  
  getViewerCommentControls(): AbstractControl[] {
      return (<FormArray>this.step1Form.get('viewerCommentArr')).controls;
  }
  getCompletedCommentControls1(): AbstractControl[] {
   return (<FormArray>this.step1Form.get('completedCommentArr1')).controls;
  // return (this.step1Form.get('completedCommentArr1') as FormArray).controls;
    }
  getCompletedCommentControls(form: any){
    return form.controls.completedCommentArr?.controls;
  }
  refreshCommentSection() {
    this.spinner=true;
    this.cardBodyComments=false;
    this.siteService.retrieveFinal(this.savedUserName,this.reportDetails.siteId).subscribe(
      (data) => {
         this.commentDataArr = JSON.parse(data);
         this.step1List.reportDetails.reportDetailsComment = this.commentDataArr.reportDetails.reportDetailsComment;
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

  addItem(item: any) : FormGroup {
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

//clear validators
  clearSiteValidator() {
    this.step1Form.controls["clientName"].clearValidators();
    this.step1Form.controls["clientName"].updateValueAndValidity();
    this.step1Form.controls["departmentName"].clearValidators();
    this.step1Form.controls["departmentName"].updateValueAndValidity();
    this.step1Form.controls["siteName"].clearValidators();
    this.step1Form.controls["siteName"].updateValueAndValidity();
    }

//retrieve client details
  private retrieveSiteDetails(companyName: any,departmentName: any,siteName: any) {
    if((companyName!= undefined) && (departmentName!= undefined) && (siteName!= undefined))  {
    this.siteService.retrieveSiteForInspection(companyName,departmentName,siteName).subscribe(
      data => {
        this.clientList = [];
        this.clientList=JSON.parse(data);
        this.reportDetails.siteId = this.clientList.siteId;
        this.service.siteCount = this.reportDetails.siteId;
      });
    }
  }

// Only Integer Numbers
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
    this.step1Form.reset();
  }

  //**Important */
// Only AlphaNumeric with Some Characters [-_ ]
  keyPressAlphaNumericWithCharacters(event:any) {
    var inp = String.fromCharCode(event.keyCode);
    // Allow numbers, space, underscore
    if (/[0-9-+ ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  showWiringAge(e: any) {
    let changedValue;
    if(e.target != undefined) {
      changedValue = e.target.value;
    }
    else{
      changedValue = e;
    }
    if(changedValue == "New Installation") {
      this.showField1 = false;
      this.step1Form.controls["showField1"].clearValidators();
      this.step1Form.controls["showField1"].updateValueAndValidity();
    }
    else {
      this.showField1 = true;
      this.step1Form.controls["showField1"].setValidators([Validators.required]);
      this.step1Form.controls["showField1"].updateValueAndValidity();
    }
  }
  showEstimatedAge(e: any) {
    let changedValue;
    if(e.target != undefined) {
      changedValue = e.target.value;
    }
    else{
      changedValue = e;
    }
    if(changedValue == "Yes") {
      this.showField2 = true;
      this.step1Form.controls["showField2"].setValidators([Validators.required]);
      this.step1Form.controls["showField2"].updateValueAndValidity();
    }
    else {
      this.showField2 = false;
      this.step1Form.controls["showField2"].clearValidators();
      this.step1Form.controls["showField2"].updateValueAndValidity();
    }
  }
 	
  refresh() {
    this.ChangeDetectorRef.detectChanges();
  }

// Inspection form basic info
  changeClientName (e: any) {
    let changedValue = e.target.value;
    this.departmentListInspec = [];
      for(let arr of this.clientList) {
        if( arr.clientName == changedValue) {
          this.departmentService.retrieveDepartment(this.email,arr.clientName).subscribe(
            data => {
              this.departmentListInspec = JSON.parse(data)
            }
          )};
      }
  }
  retrieveSiteInfo (e: any) {
    let changedValue = e.target.value;
    this.siteListInspec = [];
    for(let arr of this.departmentListInspec) {
      if(arr.departmentName == changedValue) {
        this.siteService.retrieveSiteInfo(arr.clientName, arr.departmentName).subscribe(
          data => {
            this.siteListInspec = JSON.parse(data)
          });
      }
    }
  }
  retrieveSiteId(e: any) {
    let changedValue = e.target.value;
    for(let arr of this.siteListInspec) {
      if(arr.site == changedValue) {
        this.reportDetails.siteId = arr.siteId;
      }
    }
  }

// Signature part
  private createDesigner1AcknowledgeForm(): FormGroup {
      return new FormGroup({
        declarationSignature: new FormControl('',[Validators.required]),
        declarationDate: new FormControl('',[Validators.required]),
        declarationName: new FormControl('',[Validators.required])
      })
    }
  private createDesigner2AcknowledgeForm(): FormGroup {
      return new FormGroup({
        declarationSignature: new FormControl(''),
        declarationDate: new FormControl(''),
        declarationName: new FormControl('')
      })
    }
  private createContractorAcknowledgeForm(): FormGroup {
      return new FormGroup({
        declarationSignature: new FormControl('',[Validators.required]),
        declarationDate: new FormControl('',[Validators.required]),
        declarationName: new FormControl('',[Validators.required])
      })
    }
  private createInspectorAcknowledgeForm(inspectorValue:any): FormGroup {
      return new FormGroup({
        declarationSignature: new FormControl('',[Validators.required]),
        declarationDate: new FormControl('',[Validators.required]),
        declarationName: new FormControl(inspectorValue.name,[Validators.required])
      })
    }

  getDesigner1AcknowledgeControls(): AbstractControl[] {
    return (<FormArray> this.step1Form.get('designer1AcknowledgeArr')).controls
  }
  getDesigner2AcknowledgeControls(): AbstractControl[] {
    return (<FormArray> this.step1Form.get('designer2AcknowledgeArr')).controls
  }
  getContractorAcknowledgeControls(): AbstractControl[] {
    return (<FormArray> this.step1Form.get('contractorAcknowledgeArr')).controls
  }
  getInspectorAcknowledgeControls(): AbstractControl[] {
    return (<FormArray> this.step1Form.get('inspectorAcknowledgeArr')).controls
  }
  
  populateData(value:any) {
    for (let item of value) {

      // if(this.service.disableFields==true){
      //   this.disable=true;
      //   }
      if(item.signatorRole == "designer1") {
      this.mobilearr.push(this.createGroup(item));
      this.step1Form.setControl('designer1Arr', this._formBuilder.array(this.mobilearr || []))
      this.mobilearr = [];
      }
      else if(item.signatorRole == "designer2") {
        this.setReadOnly1 = false;
        this.mobilearr1.push(this.createGroup(item))
        this.step1Form.setControl('designer2Arr', this._formBuilder.array(this.mobilearr1 || []))
        this.mobilearr1 = [];
      }
      else if(item.signatorRole == "contractor") {
        this.mobilearr2.push(this.createGroup(item))
        this.step1Form.setControl('contractorArr', this._formBuilder.array(this.mobilearr2 || []))  
        this.mobilearr2 = [];
      }
      else if(item.signatorRole == "inspector") {
        this.mobilearr3.push(this.createGroup(item))
        this.step1Form.setControl('inspectorArr', this._formBuilder.array(this.mobilearr3 || []))
        this.mobilearr3 = [];
      }
    }
  }
 
  createGroup(item: any): FormGroup {
    return this._formBuilder.group({
      signatorId: new FormControl({disabled: false ,value: item.signatorId}),
      personName: new FormControl({disabled: false ,value: item.personName}),
      personMailID: new FormControl({disabled: false, value: item.personMailID},[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      personContactNo: new FormControl({disabled : false, value: item.personContactNo}),
      managerName: new FormControl({disabled: false ,value: item.managerName},[Validators.required]),
      managerContactNo: new FormControl({disabled: false,value: item.managerContactNo}),
      managerMailID: new FormControl({disabled: false ,value: item.managerMailID},[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      companyName: new FormControl({disabled: false, value:item.companyName},[Validators.required]),
      addressLine1: new FormControl({disabled: false ,value: item.addressLine1},[Validators.required]),
      addressLine2: new FormControl({disabled: false, value: item.addressLine2}),
      landMark: new FormControl({disabled: false ,value: item.landMark}),
      country: new FormControl({disabled: false,value: item.country},[Validators.required]),
      state: new FormControl({disabled: false ,value: item.state},[Validators.required]),
      pinCode: new FormControl({disabled: false, value:item.pinCode},[Validators.required]),
      signatorRole: new FormControl({disabled: false ,value: item.signatorRole}),
      declarationSignature: new FormControl({disabled: false, value: item.declarationSignature}),
      declarationDate: new FormControl({disabled: false ,value: item.declarationDate}),
      declarationName: new FormControl({disabled: false,value: item.declarationName}),
      signatorStatus: new FormControl(item.signatorStatus)
    });
  }
 
// Deisgner details forms
  private createDesigner1Form(): FormGroup {
    return new FormGroup({
      personName: new FormControl(''),
      personContactNo: new FormControl('',[Validators.maxLength(10),Validators.minLength(10),Validators.required]),
      personMailID: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      managerName: new FormControl('',[Validators.required]),
      managerContactNo: new FormControl('',[Validators.maxLength(10),Validators.minLength(10)]),
      managerMailID: new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      companyName: new FormControl('',[Validators.required]),
      addressLine1: new FormControl('',[Validators.required]),
      addressLine2: new FormControl(''),
      landMark: new FormControl(''),
      country: new FormControl('',[Validators.required]),
      state: new FormControl('',[Validators.required]), 
      pinCode: new FormControl('',[Validators.required]),
      signatorRole: new FormControl(''),
      declarationSignature: new FormControl(''),
      declarationDate: new FormControl(''),
      declarationName: new FormControl(''),
      signatorStatus: new FormControl('A')
    })
  }
  private createDesigner2Form(): FormGroup {
    return new FormGroup({
      personName: new FormControl(''),
      personContactNo: new FormControl(''),
      personMailID: new FormControl(''),
      managerName: new FormControl(''),
      managerContactNo: new FormControl(''),
      managerMailID: new FormControl(''),
      companyName: new FormControl(''),
      addressLine1: new FormControl(''),
      addressLine2: new FormControl(''),
      landMark: new FormControl(''),
      country: new FormControl(''),
      state: new FormControl(''),
      pinCode: new FormControl(''),
      signatorRole: new FormControl(''),
      declarationSignature: new FormControl(''),
      declarationDate: new FormControl(''),
      declarationName: new FormControl(''),
      signatorStatus: new FormControl('A')
    })
  }

  getDesigner1Controls(): AbstractControl[] {
    return (<FormArray> this.step1Form.get('designer1Arr')).controls
  }
  getDesigner2Controls(): AbstractControl[] {
  return (<FormArray> this.step1Form.get('designer2Arr')).controls
  }
  designer1changeCountry(e: any) {
  let changedValue;
  if(e.target != undefined) {
    changedValue = e.target.value;
  }
  else{
    changedValue = e;
  }
  this.stateList1 = [];
    for(let arr of this.countryList) {
      if( arr.name == changedValue) {
        this.siteService.retrieveState(arr.code).subscribe(
          data => {
            this.stateList1 = JSON.parse(data)
          }
        )};
    }
  }
  designer2changeCountry(e: any) {
  let changedValue;
  if(e.target != undefined) {
    changedValue = e.target.value;
  }
  else{
    changedValue = e;
  }
  this.stateList2 = [];
    for(let arr of this.countryList) {
      if( arr.name == changedValue) {
        this.siteService.retrieveState(arr.code).subscribe(
          data => {
            this.stateList2 = JSON.parse(data)
          }
        )};
    }
  }

// Contractor details forms
  private createContractorForm(): FormGroup {
  return new FormGroup({
    personName: new FormControl('',[Validators.required]),
    personContactNo: new FormControl('',[Validators.maxLength(10),Validators.minLength(10),Validators.required]),
    personMailID: new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    managerName: new FormControl('',[Validators.required]),
    managerContactNo: new FormControl('',[Validators.maxLength(10),Validators.minLength(10)]),
    managerMailID: new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    companyName: new FormControl('',[Validators.required]),
    addressLine1: new FormControl('',[Validators.required]),
    addressLine2: new FormControl(''),
    landMark: new FormControl(''),
    country: new FormControl('',[Validators.required]),
    state: new FormControl('',[Validators.required]),
    pinCode: new FormControl('',[Validators.required]),
    signatorRole: new FormControl(''),
    declarationSignature: new FormControl(''),
    declarationDate: new FormControl(''),
    declarationName: new FormControl(''),
    signatorStatus: new FormControl('A')
    })
  }

  getContractorControls(): AbstractControl[] {
    return (<FormArray> this.step1Form.get('contractorArr')).controls
  }
  contractorchangeCountry(e: any) {
    let changedValue;
    if(e.target != undefined) {
      changedValue = e.target.value;
    }
    else{
      changedValue = e;
    }
    this.stateList3 = [];
      for(let arr of this.countryList) {
        if( arr.name == changedValue) {
          this.siteService.retrieveState(arr.code).subscribe(
            data => {
              this.stateList3 = JSON.parse(data)
            }
          )};
      }
  }

// Inspector details forms
   private createInspectorForm(value: any): FormGroup {
    // let contactNumber = [];
    // contactNumber = value.contactNumber.split("-");
    return new FormGroup({
      personName: new FormControl(value.name,[Validators.required]),
      personContactNo: new FormControl(value.contactNumber,[Validators.required]),
      personMailID: new FormControl(value.username,[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      managerName: new FormControl('',[Validators.required]),
      managerContactNo: new FormControl('',[Validators.maxLength(10),Validators.minLength(10)]),
      managerMailID: new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      companyName: new FormControl(value.companyName,[Validators.required]),
      addressLine1: new FormControl(value.address,[Validators.required]),
      addressLine2: new FormControl(''),
      landMark: new FormControl(''),
      country: new FormControl(value.country,[Validators.required]),
      state: new FormControl(value.state,[Validators.required]),
      pinCode: new FormControl(value.pinCode,[Validators.required]),
      signatorRole: new FormControl(''),
      declarationSignature: new FormControl(''),
      declarationDate: new FormControl(''),
      declarationName: new FormControl(''),
      signatorStatus: new FormControl('A')
    })

    // return this._formBuilder.group({
    //   personName:[value.name,[Validators.required]],
    //   personContactNo:[value.contactNumber,[Validators.required]],
    //   personMailID:[value.username,[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    //   managerName:['',[Validators.required]],
    //   managerContactNo:['',[Validators.maxLength(10),Validators.required]],
    //   managerMailID:['',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    //   companyName:[value.companyName,[Validators.required]],
    //   addressLine1:[value.address,[Validators.required]],
    //   addressLine2:[''],
    //   landMark:[''],
    //   country:[value.country,[Validators.required]],
    //   state:[value.state,[Validators.required]],
    //   pinCode:[value.pinCode,[Validators.required]],
    //   signatorRole:[''],
    //   declarationSignature:[''],
    //   declarationDate:[''],
    //   declarationName:['']
    // })
  }

  getInspectorControls(): AbstractControl[] {
    return (<FormArray> this.step1Form.get('inspectorArr')).controls
  }
  inspectorchangeCountry(e: any) {
    let changedValue;
    if(e.target != undefined) {
      changedValue = e.target.value;
    }
    else{
      changedValue = e;
    }
    this.stateList4 = [];
      for(let arr of this.countryList) {
        if( arr.name == changedValue) {
          this.siteService.retrieveState(arr.code).subscribe(
            data => {
              this.stateList4 = JSON.parse(data)
            }
          )};
      }
  }

 //add designer
  addDesigner() {
    this.showDesigner2= true;
    this.showAddButton= false;
    if(this.designer2PersonName!=''){
      this.f.designer2Arr.controls[0].controls['personName'].setValue(this.designer2PersonName);
      this.designer2PersonNameMsg=false;
    }
    this.f.designer2Arr.controls[0].controls['personName'].setValidators(Validators.required);
    this.f.designer2Arr.controls[0].controls['personName'].updateValueAndValidity();
    this.f.designer2Arr.controls[0].controls['personContactNo'].setValidators([Validators.required, Validators.maxLength(10)]);
    this.f.designer2Arr.controls[0].controls['personContactNo'].updateValueAndValidity();
    this.f.designer2Arr.controls[0].controls['personMailID'].setValidators([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);
    this.f.designer2Arr.controls[0].controls['personMailID'].updateValueAndValidity();
    this.f.designer2Arr.controls[0].controls['managerName'].setValidators(Validators.required);
    this.f.designer2Arr.controls[0].controls['managerName'].updateValueAndValidity();
    this.f.designer2Arr.controls[0].controls['managerContactNo'].setValidators([Validators.maxLength(10)]);
    this.f.designer2Arr.controls[0].controls['managerContactNo'].updateValueAndValidity();
    this.f.designer2Arr.controls[0].controls['managerMailID'].setValidators([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);
    this.f.designer2Arr.controls[0].controls['managerMailID'].updateValueAndValidity();
    this.f.designer2Arr.controls[0].controls['companyName'].setValidators(Validators.required);
    this.f.designer2Arr.controls[0].controls['companyName'].updateValueAndValidity();
    this.f.designer2Arr.controls[0].controls['addressLine1'].setValidators(Validators.required);
    this.f.designer2Arr.controls[0].controls['addressLine1'].updateValueAndValidity();
    // this.f.designer2Arr.controls[0].controls['addressLine2'].setValidators(Validators.required);
    // this.f.designer2Arr.controls[0].controls['addressLine2'].updateValueAndValidity();
    // this.f.designer2Arr.controls[0].controls['landMark'].setValidators(Validators.required);
    // this.f.designer2Arr.controls[0].controls['landMark'].updateValueAndValidity();
    this.f.designer2Arr.controls[0].controls['country'].setValidators(Validators.required);
    this.f.designer2Arr.controls[0].controls['country'].updateValueAndValidity();
    this.f.designer2Arr.controls[0].controls['state'].setValidators(Validators.required);
    this.f.designer2Arr.controls[0].controls['state'].updateValueAndValidity();
    this.f.designer2Arr.controls[0].controls['pinCode'].setValidators(Validators.required);
    this.f.designer2Arr.controls[0].controls['pinCode'].updateValueAndValidity();
    this.f.designer2Arr.controls[0].controls['signatorStatus'].setValue('A');

  }

  removeDesigner() {
    this.showDesigner2= false;
    this.showAddButton= true;
    this.f.designer2Arr.controls[0].controls['personName'].clearValidators();
    this.f.designer2Arr.controls[0].controls['personName'].updateValueAndValidity();
    this.f.designer2Arr.controls[0].controls['personContactNo'].clearValidators();
    this.f.designer2Arr.controls[0].controls['personContactNo'].updateValueAndValidity();
    this.f.designer2Arr.controls[0].controls['personMailID'].clearValidators();
    this.f.designer2Arr.controls[0].controls['personMailID'].updateValueAndValidity();
    this.f.designer2Arr.controls[0].controls['managerName'].clearValidators();
    this.f.designer2Arr.controls[0].controls['managerName'].updateValueAndValidity();
    this.f.designer2Arr.controls[0].controls['managerContactNo'].clearValidators();
    this.f.designer2Arr.controls[0].controls['managerContactNo'].updateValueAndValidity();
    this.f.designer2Arr.controls[0].controls['managerMailID'].clearValidators();
    this.f.designer2Arr.controls[0].controls['managerMailID'].updateValueAndValidity();
    this.f.designer2Arr.controls[0].controls['companyName'].clearValidators();
    this.f.designer2Arr.controls[0].controls['companyName'].updateValueAndValidity();
    this.f.designer2Arr.controls[0].controls['addressLine1'].clearValidators();
    this.f.designer2Arr.controls[0].controls['addressLine1'].updateValueAndValidity();
    // this.f.designer2Arr.controls[0].controls['addressLine2'].clearValidators();
    // this.f.designer2Arr.controls[0].controls['addressLine2'].updateValueAndValidity();
    // this.f.designer2Arr.controls[0].controls['landMark'].clearValidators();
    // this.f.designer2Arr.controls[0].controls['landMark'].updateValueAndValidity();
    this.f.designer2Arr.controls[0].controls['country'].clearValidators();
    this.f.designer2Arr.controls[0].controls['country'].updateValueAndValidity();
    this.f.designer2Arr.controls[0].controls['state'].clearValidators();
    this.f.designer2Arr.controls[0].controls['state'].updateValueAndValidity();
    this.f.designer2Arr.controls[0].controls['pinCode'].clearValidators();
    this.f.designer2Arr.controls[0].controls['pinCode'].updateValueAndValidity();

    if(this.flag) {
      this.deletedArr = [];
      if(this.step1List.reportDetails != undefined) {
        for( let i of this.step1List.reportDetails.signatorDetails) {      
          if(i.signatorRole == "designer2"){
            i.signatorStatus = 'R'
            this.deletedArr.push(i);
          }
        }
      }
      else if(this.step1List.signatorDetails != undefined) {
        for( let i of this.step1List.signatorDetails) {      
          if(i.signatorRole == "designer2"){
            i.signatorStatus = 'R'
            this.deletedArr.push(i);
          }
        }
      }
      
    }
   (<FormArray> this.step1Form.get('designer2Arr')).reset();

   if(this.deletedArr.length != 0) {
    this.step1Form.markAsDirty();
    this.step1Form.markAsTouched();
    this.step1Form.updateValueAndValidity();
   }
  }

  get f():any {
    return this.step1Form.controls;
  }
  //country code
  countryChange(country: any) {
    this.countryCode = country.dialCode;
  }
  countryChange1(country: any) {
    this.countryCode1 = country.dialCode;
  }
  countryChange2(country: any) {
    this.countryCode2 = country.dialCode;
  }
  countryChange3(country: any) {
    this.countryCode3 = country.dialCode;
  }
  countryChange4(country: any) {
    this.countryCode4 = country.dialCode;
  }
  countryChange5(country: any) {
    this.countryCode5 = country.dialCode;
  }
  countryChange6(country: any) {
    this.countryCode6 = country.dialCode;
  }
  countryChange7(country: any) {
    this.countryCode7 = country.dialCode;
  }
  setTrue() {
   this.submitted = true;
    if(this.step1Form.invalid) {
      return;
    }
    this.proceedNext.emit(true);
  }
 
  previousRecord(event: any) {
    let changedValue;
    if(event.target != undefined) {
      changedValue = event.target.value;
    }
    else{
      changedValue = event;
    }

    if (changedValue == 'No') {
      this.lastInspectionDate = false;
      this.step1Form.controls['inspectionLast'].clearValidators();
      this.step1Form.controls[
        'inspectionLast'
      ].updateValueAndValidity();
      }
     else {
      this.lastInspectionDate=true;
      this.step1Form.controls['inspectionLast'].setValidators(
        Validators.required
      );
      this.step1Form.controls[
        'inspectionLast'
      ].updateValueAndValidity();
    }
  }

  /*disable tab starts*/
  // clickAcc(){
  //   this.gotoNextTab();
  // }
  /*disable tab ends*/

  gotoNextTab() {
    if (this.step1Form.dirty && this.step1Form.invalid) {
      this.service.isCompleted= false;
      this.service.isLinear=true;
      this.service.editable=false;
      //this.validationError=false;
      this.validationErrorTab = true;
      this.validationErrorMsgTab = 'Please check all the fields in basic information';
      setTimeout(() => {
        this.validationErrorTab = false;
      }, 3000);
      return;
    }
    else if(this.step1Form.dirty && this.step1Form.touched){
      this.service.isCompleted= false;
      this.service.isLinear=true;
      this.service.editable=false;
      this.tabError = true;
      this.tabErrorMsg = 'Kindly click on next button to update the changes!';
      setTimeout(() => {
        this.tabError = false;
      }, 3000);
      return;
   }
    else{
      this.service.isCompleted= true;
      this.service.isLinear=false;
      this.service.editable=true;
    }
  }
  onChangeForm(event:any){
    if(!this.step1Form.invalid){
      if(this.step1Form.dirty){
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
   if(!this.step1Form.invalid){ 
    if(this.step1Form.dirty){
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
  
  doBeforeUnload() {
    if(this.service.allStepsCompleted==true){
    if(this.service.logoutClick==1 && this.service.windowTabClick==0) {
      return true;
     }
     else if(this.service.logoutClick==0 && this.service.windowTabClick==0){
      return true;
     }
     else{
      window.location.reload(); 
      // Alert the user window is closing 
      return false;
     }
    }
    else{
      return true;
    }
}
onPopState(event:any) {
  if(this.service.allStepsCompleted==true){
  if(this.service.lvClick==1){
    //alert("Changes won't be saved!");
    if(confirm("Are you sure you want to proceed without saving?\r\n\r\nNote: To update the details, kindly click on next button!"))
    {
    this.service.windowTabClick=0;
    this.service.logoutClick=0; 
    this.service.lvClick=0;
     window.location.reload();
     return true;
     }
   else{
    history.pushState({page: 1}, "title 1", "?page=1");
    history.pushState({page: 2}, "title 2", "?page=2");    
    history.back();
    history.back();    
    history.go(0) // alerts "location: http://example.com/example.html, state: null"
    return false;
   }
    }
    else{
      window.location.reload();
      return;
    }
  }
  else{
    window.location.reload();
    return;
  }
}
//modal popup 
  gotoNextModal(content1: any,content2:any) {
      if(this.step1Form.invalid) {
        //this.validationErrorTab = false;
        this.validationError=true;
        this.validationErrorMsg="Please check all the fields";
    //     setTimeout(()=>{
    //       this.validationError=false;
    //  }, 3000);
        return;
      }

     if(this.step1Form.touched || this.step1Form.untouched){
       if(this.service.sigInput==1){
        this.modalService.open(content1, { centered: true});
       // this.modalReference.close();
       }
       else{
      this.modalReference = this.modalService.open(content2, {
         centered: true, 
         size: 'md',
         backdrop: 'static'
        })
      }
     }
     if(this.step1Form.dirty && this.step1Form.touched){ //update
      this.modalService.open(content1, { centered: true,backdrop: 'static'});
      this.modalReference.close();
     }
    }
   
    closeModalDialog(){
      this.finalSpinner=true;
      this.popup=false;
      if(this.errorMsg != ""){
        this.Error = false;
        this.service.isCompleted= false;
        this.service.isLinear=true;
        this.modalService.dismissAll(this.errorMsg = "");
      }
      else {
        this.success=false;
        this.service.isCompleted= true;
        this.service.isLinear=false;
        this.modalService.dismissAll(this.successMsg=""); 
      }
    }
  
//next button--final submit
	nextTab(flag: any) {
      //this.dirty=true;
     
      this.loading = true;
      this.submitted = true
      if(this.step1Form.invalid) {
        return;
      }
      this.step1Form.value.designer1Arr[0].signatorRole= this.designer1Role;
      this.step1Form.value.designer1Arr[0].declarationSignature= this.step1Form.value.designer1AcknowledgeArr[0].declarationSignature;
      this.step1Form.value.designer1Arr[0].declarationName= this.step1Form.value.designer1AcknowledgeArr[0].declarationName;
      this.step1Form.value.designer1Arr[0].declarationDate= this.step1Form.value.designer1AcknowledgeArr[0].declarationDate;
      this.step1Form.value.designer2Arr[0].signatorRole= this.designer2Role;
      if((this.step1Form.value.designer2AcknowledgeArr[0].declarationName != "") && (this.step1Form.value.designer2AcknowledgeArr[0].declarationDate != ""))
      {
      this.step1Form.value.designer2Arr[0].declarationSignature= this.step1Form.value.designer2AcknowledgeArr[0].declarationSignature;
      this.step1Form.value.designer2Arr[0].declarationName= this.step1Form.value.designer2AcknowledgeArr[0].declarationName;
      this.step1Form.value.designer2Arr[0].declarationDate= this.step1Form.value.designer2AcknowledgeArr[0].declarationDate;
      }
      this.step1Form.value.contractorArr[0].signatorRole= this.contractorRole;
      this.step1Form.value.contractorArr[0].declarationSignature= this.step1Form.value.contractorAcknowledgeArr[0].declarationSignature;
      this.step1Form.value.contractorArr[0].declarationName= this.step1Form.value.contractorAcknowledgeArr[0].declarationName;
      this.step1Form.value.contractorArr[0].declarationDate= this.step1Form.value.contractorAcknowledgeArr[0].declarationDate;
      this.step1Form.value.inspectorArr[0].signatorRole= this.inspectorRole;
      this.step1Form.value.inspectorArr[0].declarationSignature= this.step1Form.value.inspectorAcknowledgeArr[0].declarationSignature;
      this.step1Form.value.inspectorArr[0].declarationName= this.step1Form.value.inspectorAcknowledgeArr[0].declarationName;
      this.step1Form.value.inspectorArr[0].declarationDate= this.step1Form.value.inspectorAcknowledgeArr[0].declarationDate;
      this.reportDetails.userName = this.email;

    // country code update

    //   if(flag) {
    //     if((this.step1Form.value.designer1Arr[0].personContactNo).includes("+")) {
    //       let arr = [];
    //       arr = (this.step1Form.value.designer1Arr[0].personContactNo).split("-");
    //       this.step1Form.value.designer1Arr[0].personContactNo = arr[1];
    //         arr[0] = arr[0].replace('+', ''); // Remove the first one
    //       if(this.countryCode != "91" ) {
    //         this.step1Form.value.designer1Arr[0].personContactNo= "+" + this.countryCode + "-" +  this.step1Form.value.designer1Arr[0].personContactNo;
    //       }
    //       else{
    //         this.step1Form.value.designer1Arr[0].personContactNo= "+" + arr[0] + "-" +  this.step1Form.value.designer1Arr[0].personContactNo;
    //       }
    //     }
       

    //     if((this.step1Form.value.designer1Arr[0].managerContactNo).includes("+")) {
    //       let arr1 = [];
    //     arr1 = (this.step1Form.value.designer1Arr[0].managerContactNo).split("-");
    //     this.step1Form.value.designer1Arr[0].managerContactNo = arr1[1];
    //       arr1[0] = arr1[0].replace('+', ''); // Remove the first one
    //     if(this.countryCode1 != "91" ) {
    //       this.step1Form.value.designer1Arr[0].managerContactNo= "+" + this.countryCode1 + "-" +  this.step1Form.value.designer1Arr[0].managerContactNo;
    //     }
    //     else{
    //       this.step1Form.value.designer1Arr[0].managerContactNo= "+" + arr1[0]  + "-" +  this.step1Form.value.designer1Arr[0].managerContactNo;
    //     }
    //     }

    //     //designer 2
    //     if((this.step1Form.value.designer2Arr[0].personContactNo).includes("+")) {
    //       let arr2= [];
    //       arr2 = (this.step1Form.value.designer2Arr[0].personContactNo).split("-");
    //       this.step1Form.value.designer2Arr[0].personContactNo = arr2[1];
    //       arr2[0] = arr2[0].replace('+', ''); // Remove the first one
    //       if(this.countryCode2 != "91" ) {
    //         this.step1Form.value.designer2Arr[0].personContactNo= "+" + this.countryCode2 + "-" +  this.step1Form.value.designer2Arr[0].personContactNo;
    //       }
    //       else{
    //         this.step1Form.value.designer2Arr[0].personContactNo= "+" +  arr2[0] + "-" +  this.step1Form.value.designer2Arr[0].personContactNo;
    //       }
    //     }
        
    //     if((this.step1Form.value.designer2Arr[0].managerContactNo).includes("+")) {
          
    //     let arr3 = [];
    //     arr3 = (this.step1Form.value.designer2Arr[0].managerContactNo).split("-");
    //     this.step1Form.value.designer2Arr[0].managerContactNo = arr3[1];
    //     arr3[0] = arr3[0].replace('+', ''); // Remove the first one
    //     if(this.countryCode3 != "91" ) {
    //       this.step1Form.value.designer2Arr[0].managerContactNo= "+" + this.countryCode3 + "-" +  this.step1Form.value.designer2Arr[0].managerContactNo;
    //     }
    //     else{
    //       this.step1Form.value.designer2Arr[0].managerContactNo= "+" + arr3[0] + "-" +  this.step1Form.value.designer2Arr[0].managerContactNo;
    //     }
    //     }
       

    //     //contractor
    //     if((this.step1Form.value.contractorArr[0].personContactNo).includes("+")) {
    //       let arr4 = [];
    //       arr4 = (this.step1Form.value.contractorArr[0].personContactNo).split("-");
    //       this.step1Form.value.contractorArr[0].personContactNo = arr4[1];
    //       arr4[0] = arr4[0].replace('+', ''); // Remove the first one
    //       if(this.countryCode4 != "91" ) {
    //         this.step1Form.value.contractorArr[0].personContactNo= "+" + this.countryCode4 + "-" +  this.step1Form.value.contractorArr[0].personContactNo;
    //       }
    //       else{
    //         this.step1Form.value.contractorArr[0].personContactNo= "+" +  arr4[0]  + "-" +  this.step1Form.value.contractorArr[0].personContactNo;
    //       }
  
    //     }
        
        
    //     if((this.step1Form.value.contractorArr[0].managerContactNo).includes("+")) {
    //       let arr5 = [];
    //       arr5 = (this.step1Form.value.contractorArr[0].managerContactNo).split("-");
    //       this.step1Form.value.contractorArr[0].managerContactNo = arr5[1];
    //       arr5[0] = arr5[0].replace('+', ''); // Remove the first one
    //       if(this.countryCode5 != "91" ) {
    //         this.step1Form.value.contractorArr[0].managerContactNo= "+" + this.countryCode5  + "-" +  this.step1Form.value.contractorArr[0].managerContactNo;
    //       }
    //       else{
    //         this.step1Form.value.contractorArr[0].managerContactNo= "+" + arr5[0] + "-" +  this.step1Form.value.contractorArr[0].managerContactNo;
    //       }
    //     }
        

    //     //inspector
    //     if((this.step1Form.value.inspectorArr[0].personContactNo).includes("+")) {
    //       let arr6 = [];
    //       arr6 = (this.step1Form.value.inspectorArr[0].personContactNo).split("-");
    //       this.step1Form.value.inspectorArr[0].personContactNo = arr6[1];
    //       arr6[0] = arr6[0].replace('+', ''); // Remove the first one
    //       if(this.countryCode6 != "91" ) {
    //         this.step1Form.value.inspectorArr[0].personContactNo= "+" + this.countryCode6 + "-" +  this.step1Form.value.inspectorArr[0].personContactNo;
    //       }
    //       else{
    //         this.step1Form.value.inspectorArr[0].personContactNo= "+" +  arr6[0]  + "-" +  this.step1Form.value.inspectorArr[0].personContactNo;
  
    //       }
    //       }
    
        

    //     if((this.step1Form.value.inspectorArr[0].managerContactNo).includes("+")) {
    //       let arr7 = [];
    //       arr7 = (this.step1Form.value.inspectorArr[0].managerContactNo).split("-");
    //       this.step1Form.value.inspectorArr[0].managerContactNo = arr7[1];
    //       arr7[0] = arr7[0].replace('+', ''); // Remove the first one
    //       if(this.countryCode7 != "91" ) {
    //         this.step1Form.value.inspectorArr[0].managerContactNo= "+" + this.countryCode7 + "-" +  this.step1Form.value.inspectorArr[0].managerContactNo;
    //     }
    //     else{
    //       this.step1Form.value.inspectorArr[0].managerContactNo= "+" +  arr7[0] + "-" +  this.step1Form.value.inspectorArr[0].managerContactNo;
    //     }
    //   }
       
    //   }
     
  
    // else{
    // //country code
    // this.step1Form.value.designer1Arr[0].personContactNo= "+" + this.countryCode + "-" + this.step1Form.value.designer1Arr[0].personContactNo;
    // this.step1Form.value.designer1Arr[0].managerContactNo= "+" + this.countryCode1 + "-" + this.step1Form.value.designer1Arr[0].managerContactNo;

    // this.step1Form.value.designer2Arr[0].personContactNo= "+" + this.countryCode2 + "-" + this.step1Form.value.designer2Arr[0].personContactNo;
    // this.step1Form.value.designer2Arr[0].managerContactNo= "+" + this.countryCode3 + "-" + this.step1Form.value.designer2Arr[0].managerContactNo;

    // this.step1Form.value.contractorArr[0].personContactNo = "+" + this.countryCode4 + "-" + this.step1Form.value.contractorArr[0].personContactNo;
    // this.step1Form.value.contractorArr[0].managerContactNo = "+" + this.countryCode5 + "-" + this.step1Form.value.contractorArr[0].managerContactNo;

    // this.step1Form.value.inspectorArr[0].personContactNo = "+" + this.countryCode6 + "-" + this.step1Form.value.inspectorArr[0].personContactNo;
    // this.step1Form.value.inspectorArr[0].managerContactNo = "+" + this.countryCode7 + "-" + this.step1Form.value.inspectorArr[0].managerContactNo;
    // }

    //country code
  
    if(!flag) {
      //designer 1
      if((this.step1Form.value.designer1Arr[0].personContactNo).includes("+"))
      {
       let arr1=[];
       arr1= this.step1Form.value.designer1Arr[0].personContactNo.split('-');
       this.step1Form.value.designer1Arr[0].personContactNo = arr1[1];
       this.step1Form.value.designer1Arr[0].personContactNo= "+" + this.countryCode + "-" +  this.step1Form.value.designer1Arr[0].personContactNo;
      }
      else{
        this.step1Form.value.designer1Arr[0].personContactNo= "+" + this.countryCode + "-" + this.step1Form.value.designer1Arr[0].personContactNo;
      }


      if((this.step1Form.value.designer1Arr[0].managerContactNo).includes("+"))
      {
       let arr2=[];
       arr2= this.step1Form.value.designer1Arr[0].managerContactNo.split('-');
       this.step1Form.value.designer1Arr[0].managerContactNo = arr2[1];
       this.step1Form.value.designer1Arr[0].managerContactNo= "+" + this.countryCode1 + "-" + this.step1Form.value.designer1Arr[0].managerContactNo;
      }
      else{
        this.step1Form.value.designer1Arr[0].managerContactNo= "+" + this.countryCode1 + "-" + this.step1Form.value.designer1Arr[0].managerContactNo;
      }      
  

      // designer 2
      if(this.step1Form.value.designer2Arr[0].personContactNo != "" && this.step1Form.value.designer2Arr[0].personContactNo != null) {
        if((this.step1Form.value.designer2Arr[0].personContactNo).includes("+"))
        {
          let arr3=[];
          arr3= this.step1Form.value.designer2Arr[0].personContactNo.split('-');
          this.step1Form.value.designer2Arr[0].personContactNo = arr3[1];
          this.step1Form.value.designer2Arr[0].personContactNo= "+" + this.countryCode2 + "-" + this.step1Form.value.designer2Arr[0].personContactNo;
        }
          else{
            this.step1Form.value.designer2Arr[0].personContactNo= "+" + this.countryCode2 + "-" + this.step1Form.value.designer2Arr[0].personContactNo;
          }
      }      
      
      if(this.step1Form.value.designer2Arr[0].managerContactNo != "" && this.step1Form.value.designer2Arr[0].managerContactNo != null) {
        if((this.step1Form.value.designer2Arr[0].managerContactNo).includes("+"))
        {
          let arr4=[];
          arr4= this.step1Form.value.designer2Arr[0].managerContactNo.split('-');
          this.step1Form.value.designer2Arr[0].managerContactNo = arr4[1];
          this.step1Form.value.designer2Arr[0].managerContactNo= "+" + this.countryCode3 + "-" + this.step1Form.value.designer2Arr[0].managerContactNo;
        }
          else{
            this.step1Form.value.designer2Arr[0].managerContactNo= "+" + this.countryCode3 + "-" + this.step1Form.value.designer2Arr[0].managerContactNo;
          }   
      }
         
      //contractor
      if((this.step1Form.value.contractorArr[0].personContactNo).includes("+"))
      {
       let arr5=[];
       arr5= this.step1Form.value.contractorArr[0].personContactNo.split('-');
       this.step1Form.value.contractorArr[0].personContactNo = arr5[1];
       this.step1Form.value.contractorArr[0].personContactNo = "+" + this.countryCode4 + "-" + this.step1Form.value.contractorArr[0].personContactNo;
      }
      else{
        this.step1Form.value.contractorArr[0].personContactNo = "+" + this.countryCode4 + "-" + this.step1Form.value.contractorArr[0].personContactNo;
      }      


      if((this.step1Form.value.contractorArr[0].managerContactNo).includes("+"))
      {
       let arr6=[];
       arr6= this.step1Form.value.contractorArr[0].managerContactNo.split('-');
       this.step1Form.value.contractorArr[0].managerContactNo = arr6[1];
       this.step1Form.value.contractorArr[0].managerContactNo = "+" + this.countryCode5 + "-" + this.step1Form.value.contractorArr[0].managerContactNo;
      }
      else{
        this.step1Form.value.contractorArr[0].managerContactNo = "+" + this.countryCode5 + "-" + this.step1Form.value.contractorArr[0].managerContactNo;
      }      

      //inspector
      // this.step1Form.value.inspectorArr[0].personContactNo = "+" + this.countryCode6 + "-" + this.step1Form.value.inspectorArr[0].personContactNo;
      if((this.step1Form.value.inspectorArr[0].managerContactNo).includes("+"))
      {
       let arr7=[];
       arr7= this.step1Form.value.inspectorArr[0].managerContactNo.split('-');
       this.step1Form.value.inspectorArr[0].managerContactNo = arr7[1];
       this.step1Form.value.inspectorArr[0].managerContactNo = "+" + this.countryCode7 + "-" + this.step1Form.value.inspectorArr[0].managerContactNo;  
      }
      else{
        this.step1Form.value.inspectorArr[0].managerContactNo = "+" + this.countryCode7 + "-" + this.step1Form.value.inspectorArr[0].managerContactNo;  
      }      
      
      
      this.reportDetails.signatorDetails = this.step1Form.value.designer1Arr;
      if(this.step1Form.value.designer2Arr[0].personName != "" && this.step1Form.value.designer2Arr[0].personName != null) {
        this.reportDetails.signatorDetails=this.reportDetails.signatorDetails.concat(this.step1Form.value.designer2Arr);
      }
      this.reportDetails.signatorDetails=this.reportDetails.signatorDetails.concat(this.step1Form.value.contractorArr,this.step1Form.value.inspectorArr);
    }
    else {
      if(this.step1Form.value.designer2Arr[0].signatorId == null && this.step1Form.value.designer2Arr[0].personContactNo != '' && this.step1Form.value.designer2Arr[0].personContactNo != null) {
        // designer 2
        if((this.step1Form.value.designer2Arr[0].personContactNo).includes("+"))
        {
        let arr3=[];
        arr3= this.step1Form.value.designer2Arr[0].personContactNo.split('-');
        this.step1Form.value.designer2Arr[0].personContactNo = arr3[1];
        this.step1Form.value.designer2Arr[0].personContactNo= "+" + this.countryCode2 + "-" + this.step1Form.value.designer2Arr[0].personContactNo;
        }
        else{
          this.step1Form.value.designer2Arr[0].personContactNo= "+" + this.countryCode2 + "-" + this.step1Form.value.designer2Arr[0].personContactNo;
        }      

        if((this.step1Form.value.designer2Arr[0].managerContactNo).includes("+"))
        {
        let arr4=[];
        arr4= this.step1Form.value.designer2Arr[0].managerContactNo.split('-');
        this.step1Form.value.designer2Arr[0].managerContactNo = arr4[1];
        this.step1Form.value.designer2Arr[0].managerContactNo= "+" + this.countryCode3 + "-" + this.step1Form.value.designer2Arr[0].managerContactNo;
        }
        else{
          this.step1Form.value.designer2Arr[0].managerContactNo= "+" + this.countryCode3 + "-" + this.step1Form.value.designer2Arr[0].managerContactNo;
        }   
      }
      
      this.reportDetails.signatorDetails = this.step1Form.value.designer1Arr;
      if(this.step1Form.value.designer2Arr[0].personName != "" && this.step1Form.value.designer2Arr[0].personName != null) {
        if(this.step1Form.value.designer2Arr[0].signatorId != null && this.step1Form.value.designer2Arr[0].signatorId != undefined) {
          this.reportDetails.signatorDetails=this.reportDetails.signatorDetails.concat(this.step1Form.value.designer2Arr);
        }
        else {
          this.reportDetails.signatorDetails=this.reportDetails.signatorDetails.concat(this.step1Form.value.designer2Arr);
        }
      }
      this.reportDetails.signatorDetails=this.reportDetails.signatorDetails.concat(this.step1Form.value.contractorArr,this.step1Form.value.inspectorArr);
    }
  
    if(flag){
      if(this.step1Form.dirty){
        if(this.deletedArr.length != 0) {
          for(let i of this.deletedArr) {
            this.reportDetails.signatorDetails.push(i);
          }
        }
        this.UpateBasicService.updateBasic(this.reportDetails).subscribe(
          data=> {
           this.popup=true;
           this.finalSpinner=false;
           this.success = true;
           this.successMsg = data;
           this.service.isCompleted= true;
           this.service.isLinear=false;
           this.step1Form.markAsPristine();
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
          });
      }
      
    //  this.reportDetails.siteId = this.retrivedSiteId;
     //this.disable=false;
  
   }
   else{
   this.reportDetailsService.addReportDetails(this.reportDetails).subscribe(
     data=> {
       this.proceedNext.emit(true);
       this.popup=true;
       this.finalSpinner=false;
       this.success = true;
       this.successMsg = data;
       this.service.isCompleted= true;
       this.service.isLinear=false;
       this.step1Form.markAsPristine();
       this.service.windowTabClick=0;
       this.service.logoutClick=0; 
       this.service.lvClick=0; 
       this.reportDetailsService.retrieveBasic(this.reportDetails.siteId,this.reportDetails.userName).subscribe(
         data=>{
          this.retrieveAllDetailsforBasic(this.reportDetails.userName,this.reportDetails.siteId,this.siteValue,data);
         }
       )
       //this.step1Form.reset();
       //this.flag=true;
       //this.service.allFieldsDisable = true;
       //this.disable = true;
     },
     (error) => {
       this.popup=true;
       this.finalSpinner=false;
       this.Error = true;
       this.errorArr = [];
       this.errorArr = JSON.parse(error.error);
       this.errorMsg = this.errorArr.message;
       this.proceedNext.emit(false);
       this.service.isCompleted= false;
       this.service.isLinear=true;
     });
  }
  //this.service.siteCount = this.reportDetails.siteId;
 }
}
