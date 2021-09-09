import { SignatorDetails } from './../model/reportdetails';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
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

//import { ErrorHandlerService } from './../../shared/services/error-handler.service';
@Component({
  selector: 'app-inspection-verification-basic-information',
  templateUrl: './inspection-verification-basic-information.component.html',
  styleUrls: ['./inspection-verification-basic-information.component.css']
})
export class InspectionVerificationBasicInformationComponent implements OnInit {

 	
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
  successMsg: string="";
  commentSuccess: boolean=false;

  errorMsg: string="";
  success: boolean=false;
  Error: boolean=false;
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
  installationList: String[]= ['New Installation','First Verification Of An Existing','Addition Of An Existing Installation','Alteration In An Existing Installation','Periodic Verification'];
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
  viewerComments: String='';
  //inspectorComments: String='';
  comments = new CommentsSection;

  replyClicked: boolean=false;
  inspectorCommentArr!: FormArray;
  viewerCommentArr!: FormArray;

  completedComments: boolean=false;
  date!: Date;
  //dateTimeComment!: string | null;
  myVar!: string | null;
  //today= new Date();
  toggleHideShow:boolean=false;
  public today: Date = new Date();
  isCollapsed = false;
  registerData: any = [];

  public hideRuleContent:boolean[] = [];
  public buttonName:any = 'Expand';
  replyCommentBox: boolean=false;
  hideMatIcons:boolean[] = [];
  hideAsViewerLogin: boolean=false;
  hideAsInspLogin: boolean=true;
  hideapprove: boolean=false;
  hideCommentSection: boolean=false;
  currentUser: any = [];
  currentUser1: any = [];
  reportViewerCommentArr:any = [];
  reportInspectorCommentArr:any = [];
  commentId: any;
  hideAdd: boolean=false;
  hideInspText: boolean=false;

  constructor(
    private _formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private clientService: ClientService,
    private departmentService: DepartmentService,
    private reportDetailsService: ReportDetailsService,
    private siteService: SiteService,
    private UpateBasicService: InspectionVerificationService,
    public service: GlobalsService,
    private modalService: NgbModal,
    private ChangeDetectorRef: ChangeDetectorRef,public datepipe: DatePipe) {
    this.email = this.router.snapshot.paramMap.get('email') || '{}'
    setInterval(() => {
      this.today = new Date();
    }, 1);
    
  }

  ngOnInit(): void {
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
    this.step1Form = this._formBuilder.group({
      clientName: ['', Validators.required],
      departmentName: ['', Validators.required],
      siteName: ['', Validators.required],
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
      previousRecord: ['', Validators.required],
      inspectionLast: ['', Validators.required],
      extentInstallation: ['', Validators.required],
      detailsOfClient: ['', Validators.required],
      detailsOfInstallation: ['', Validators.required],
      startingDateVerification: ['', Validators.required],
      engineerName: ['', Validators.required],
      designation: ['', Validators.required],
      companyName: ['', Validators.required],
      limitations: ['', Validators.required],
      nextInspection: ['', Validators.required],
      designer1AcknowledgeArr: this._formBuilder.array([this.createDesigner1AcknowledgeForm()]),
      designer2AcknowledgeArr: this._formBuilder.array([this.createDesigner2AcknowledgeForm()]),
      contractorAcknowledgeArr: this._formBuilder.array([this.createContractorAcknowledgeForm()]),
      inspectorAcknowledgeArr: this._formBuilder.array([this.createInspectorAcknowledgeForm()]),
      designer1Arr: this._formBuilder.array([this.createDesigner1Form()]),
      designer2Arr: this._formBuilder.array([this.createDesigner2Form()]),
      contractorArr: this._formBuilder.array([this.createContractorForm()]),
      inspectorArr: this._formBuilder.array([this.createInspectorForm()]),
      viewerCommentArr: this._formBuilder.array([this.addCommentViewer()]),
      //inspectorCommentArr: this._formBuilder.array([this.addCommentInspector()])
      //enterComments: [''],
    });
    this.siteService.retrieveCountry().subscribe(
      data => {
        this.countryList = JSON.parse(data);
      }
    )
    //comments start
    // this.inspectorRegisterService.retrieveInspector(this.email).subscribe(
    //   (data) => {
    //     this.registerData = JSON.parse(data);
    //     this.checkLoginNumber=='0';
    //     if(this.registerData.role == 'ROLE' ) { //viewer
    //       this.hideCommentSection= true;
    //        if(this.checkLoginNumber=='0'){
    //         this.hideCommentSection= true;
    //         this.hideapprove=true;
    //        }
    //      this.hideAsInspLogin=true;
    //      this.hideAsViewerLogin=false;
    //     }
    //     else { //inspector
          
           
    //           this.hideCommentSection=true;
         
          
    //       this.hideAsViewerLogin=true;
    //       this.hideAsInspLogin=false;
    //       this.hideapprove=false;
    //     }
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // )
    //comments end
    // this.date=new Date();
    // let latest_date =this.datepipe.transform(this.date, 'dd-MM-YY');
    this.refresh();
    this.retrieveClientDetails();
    this.inspectorArr = this.step1Form.get('inspectorArr') as FormArray;
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
 
  // Need to check this task
  retrieveDetailsfromSavedReports(userName: any,siteId: any,clientName: any,departmentName: any,site: any,data: any){
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
       this.step1List.evidenceAlterations=this.step1List.reportDetails.evidenceAlterations;
       this.reportDetails.limitations= this.step1List.reportDetails.limitations;
       this.reportDetails.createdBy = this.step1List.reportDetails.createdBy;
       this.reportDetails.createdDate = this.step1List.reportDetails.createdDate;
       this.reportDetails.estimatedWireAge = this.step1List.reportDetails.estimatedWireAge;
       //this.showField2= this.step1List.reportDetails.evidanceWireAge,
       this.step1List.state=this.step1List.reportDetails.state;
       this.populateData();
       this.populateDataComments();
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
        limitations: this.step1List.reportDetails.limitations
    })
    this.flag=true;
   // this.disable=true;

     }
     populateDataComments() {
      for(let value of this.step1List.reportDetails.reportDetailsComment){
        if(this.currentUser1.role == 'Inspector' ) { //Inspector
            console.log(value.viewerDate + "   " + value.viewerComment)
            this.reportViewerCommentArr.push(this.createCommentGroup(value));
            this.step1Form.setControl('viewerCommentArr', this._formBuilder.array(this.reportViewerCommentArr || []))
            this.reportViewerCommentArr = [];
            this.hideCommentSection=true;
            this.hideAsViewerLogin=true;
            this.hideAsInspLogin=false;
            this.hideapprove=false;
           
              }
              else { //Viewer
                console.log(value.inspectorDate + "   " + value.inspectorComment )
                this.reportViewerCommentArr.push(this.createCommentGroup(value));
                this.step1Form.setControl('viewerCommentArr', this._formBuilder.array(this.reportViewerCommentArr || []))
                this.reportViewerCommentArr = [];
                this.hideCommentSection= true;
                if(this.checkLoginNumber=='0'){
                 this.hideCommentSection= true;
                 this.hideapprove=true;
                 this.hideAsInspLogin=false;
                }
              this.hideAsInspLogin=true;
              this.hideAsViewerLogin=false;
              this.replyCommentBox=true;
              this.hideAdd=true;
              }       
            }
        
    }
//comments section starts

createCommentGroup(value: any) : FormGroup {
  return this._formBuilder.group({
    commentId: new FormControl({disabled: false ,value: value.commentsId}),
    viewerComments: new FormControl({disabled: false ,value: value.viewerComment}),
    inspectorComments: new FormControl({disabled: false ,value: value.inspectorComment}),
  });
}


// actionMethod1($event1: MouseEvent,$event: MouseEvent) {
//   ($event1.target as HTMLButtonElement).hidden = false;
//   ($event.target as HTMLButtonElement).hidden = true;
// }
// hideReplyonAction($event: MouseEvent){
//   ($event.target as HTMLButtonElement).hidden = true;
// }

toggle(index:any) {
  // toggle based on index
  this.hideRuleContent[index] = !this.hideRuleContent[index];
}
replyToViewerComment(a: any){
  debugger
  this.commentId = a.value.commentId;
  this.replyCommentBox=true;
  this.hideAsViewerLogin=false;
  this.hideInspText=true;
}
    sendViewerComment(){
      debugger
      this.comments.userName = this.email;
      this.comments.viewerComments = this.step1Form.controls.viewerCommentArr.value[0].viewerComments;
      this.flag=false;
      this.reportDetailsService.sendComments(this.comments,this.reportDetails.siteId).subscribe(
        (data) =>{
          this.commentSuccess=true;
          setTimeout(()=>{
            this.commentSuccess=false;
       }, 3000);
        },
        (error) => {
        }
      )  
    }
    inspectorComment(){
      this.comments.userName = this.email;
      this.comments.commentsId=this.step1Form.controls.viewerCommentArr.value[0].commentId;
      this.comments.inspectorComments=this.step1Form.controls.viewerCommentArr.value[0].inspectorComments;
      this.reportDetailsService.replyComments(this.comments,this.reportDetails.siteId).subscribe(
        (data) =>{
          this.commentSuccess=true;
          setTimeout(()=>{
            this.commentSuccess=false;
       }, 3000);
        },
        (error) => {
        }
      )  
    }
    addAnotherviewerComment($event: MouseEvent) {
      ($event.target as HTMLButtonElement).hidden = true;
      this.hideAdd=false;
      this.hideInspText=false;
      this.viewerCommentArr = this.step1Form.get('viewerCommentArr') as FormArray;
      this.viewerCommentArr.push(this.addCommentViewer());
    }
    // addAnotherInspectorComment(index:any) {
    //   if(index==0)
    //   {
    //     this.hideMatIcons[index]=true;
    //   }
    //   else{
    //     this.hideMatIcons[index]=!this.hideMatIcons[index];
    //   }
    //   this.inspectorCommentArr = this.step1Form.get('inspectorCommentArr') as FormArray;
    //   this.inspectorCommentArr.push(this.addCommentInspector());
    //   this.today= new Date();
    // }
    addCommentViewer() {
      return this._formBuilder.group({
      viewerComments: [''],
      inspectorComments: [''],
      });
    }
    // addCommentInspector() {
    //   return this._formBuilder.group({
    //   inspectorComments: [''],
    //   });
    // }
    ViewerRemoveComment(index: any) {
      if(index==0)
      {
        this.hideMatIcons[index]=true;
      }
      else{
        this.hideMatIcons[index]=!this.hideMatIcons[index];
      }
      (this.step1Form.get('viewerCommentArr') as FormArray).removeAt(index);
    }
    // InspectorRemoveComment(index: any) {
    //   if(index==0)
    //   {
    //     this.hideMatIcons[index]=true;
    //   }
    //   else{
    //     this.hideMatIcons[index]=!this.hideMatIcons[index];
    //   }
    //   (this.step1Form.get('inspectorCommentArr') as FormArray).removeAt(index);
    // }
    getViewerCommentControls(): AbstractControl[] {
      return (<FormArray>this.step1Form.get('viewerCommentArr')).controls;
    }
    // getInspectorCommentControls(): AbstractControl[] {
    //   return (<FormArray>this.step1Form.get('inspectorCommentArr')).controls;
    // }
    approveComment(){
      this.disable=true;
      this.completedComments=true;
     // this.comments.viewerComments = this.step1Form.value.viewerComments;
      //this.comments.inspectorComments=this.step1Form.value.inspectorComments;
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
  private retrieveClientDetails() {
    this.clientService.retrieveClient(this.email).subscribe(
      data => {
        this.clientList = [];
        this.clientList=JSON.parse(data);
      });
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
  private createInspectorAcknowledgeForm(): FormGroup {
      return new FormGroup({
        declarationSignature: new FormControl('',[Validators.required]),
        declarationDate: new FormControl('',[Validators.required]),
        declarationName: new FormControl('',[Validators.required])
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
  
  populateData() {
    for (let item of this.step1List.reportDetails.signatorDetails) {
      if(item.signatorRole == "designer1") {
      this.mobilearr.push(this.createGroup(item));
      this.step1Form.setControl('designer1Arr', this._formBuilder.array(this.mobilearr || []))
      this.mobilearr = [];
      }
      else if(item.signatorRole == "designer2") {
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
      personMailID: new FormControl({disabled: false, value: item.personMailID}),
      personContactNo: new FormControl({disabled : false, value: item.personContactNo}),
      managerName: new FormControl({disabled: false ,value: item.managerName}),
      managerContactNo: new FormControl({disabled: false,value: item.managerContactNo}),
      managerMailID: new FormControl({disabled: false ,value: item.managerMailID}),
      companyName: new FormControl({disabled: false, value:item.companyName}),
      addressLine1: new FormControl({disabled: false ,value: item.addressLine1}),
      addressLine2: new FormControl({disabled: false, value: item.addressLine2}),
      landMark: new FormControl({disabled: false ,value: item.landMark}),
      country: new FormControl({disabled: false,value: item.country}),
      state: new FormControl({disabled: false ,value: item.state}),
      pinCode: new FormControl({disabled: false, value:item.pinCode}),
      signatorRole: new FormControl({disabled: false ,value: item.signatorRole}),
      declarationSignature: new FormControl({disabled: false, value: item.declarationSignature}),
      declarationDate: new FormControl({disabled: false ,value: item.declarationDate}),
      declarationName: new FormControl({disabled: false,value: item.declarationName}),
    });
  }
 
// Deisgner details forms
  private createDesigner1Form(): FormGroup {
    return new FormGroup({
      personName: new FormControl('',[Validators.required]),
      personContactNo: new FormControl('',[Validators.maxLength(10),Validators.required]),
      personMailID: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      managerName: new FormControl('',[Validators.required]),
      managerContactNo: new FormControl('',[Validators.maxLength(10), Validators.required]),
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
      declarationName: new FormControl('')
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
      declarationName: new FormControl('')
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
    personContactNo: new FormControl('',[Validators.maxLength(10),Validators.required]),
    personMailID: new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    managerName: new FormControl('',[Validators.required]),
    managerContactNo: new FormControl('',[Validators.maxLength(10), Validators.required]),
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
    declarationName: new FormControl('')
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
   private createInspectorForm(): FormGroup {
    return new FormGroup({
     personName: new FormControl('',[Validators.required]),
      personContactNo: new FormControl('',[Validators.maxLength(10),Validators.required]),
      personMailID: new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      managerName: new FormControl('',[Validators.required]),
      managerContactNo: new FormControl('',[Validators.maxLength(10),Validators.required]),
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
      declarationName: new FormControl('')
    })
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
    this.f.designer2Arr.controls[0].controls['personName'].setValidators(Validators.required);
    this.f.designer2Arr.controls[0].controls['personName'].updateValueAndValidity();
    this.f.designer2Arr.controls[0].controls['personContactNo'].setValidators([Validators.required, Validators.maxLength(10)]);
    this.f.designer2Arr.controls[0].controls['personContactNo'].updateValueAndValidity();
    this.f.designer2Arr.controls[0].controls['personMailID'].setValidators([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);
    this.f.designer2Arr.controls[0].controls['personMailID'].updateValueAndValidity();
    this.f.designer2Arr.controls[0].controls['managerName'].setValidators(Validators.required);
    this.f.designer2Arr.controls[0].controls['managerName'].updateValueAndValidity();
    this.f.designer2Arr.controls[0].controls['managerContactNo'].setValidators([Validators.required, Validators.maxLength(10)]);
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
    return (<FormArray> this.step1Form.get('designer2Arr')).reset();
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
//modal popup
  gotoNextModal(content1: any) {
      if(this.step1Form.invalid) {
        this.validationError=true;
        this.validationErrorMsg="Please check all the fields";
        setTimeout(()=>{
          this.validationError=false;
     }, 3000);
        return;
      }
      this.modalService.open(content1, { centered: true})
    }
    closeModalDialog(){
      if(this.errorMsg != ""){
        this.Error = false;
        this.modalService.dismissAll(this.errorMsg = "")
      }
      else {
        this.success=false;
        this.modalService.dismissAll(this.successMsg="") 
      }
    }

//next button--final submit
	nextTab(flag: any) {
    debugger
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
      if((this.step1Form.value.designer2AcknowledgeArr[0].declarationSignature != "") && (this.step1Form.value.designer2AcknowledgeArr[0].declarationName != "") && (this.step1Form.value.designer2AcknowledgeArr[0].declarationDate != ""))
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
      this.step1Form.value.designer1Arr[0].personContactNo= "+" + this.countryCode + "-" + this.step1Form.value.designer1Arr[0].personContactNo;
      this.step1Form.value.designer1Arr[0].managerContactNo= "+" + this.countryCode1 + "-" + this.step1Form.value.designer1Arr[0].managerContactNo;
  
      this.step1Form.value.designer2Arr[0].personContactNo= "+" + this.countryCode2 + "-" + this.step1Form.value.designer2Arr[0].personContactNo;
      this.step1Form.value.designer2Arr[0].managerContactNo= "+" + this.countryCode3 + "-" + this.step1Form.value.designer2Arr[0].managerContactNo;
  
      this.step1Form.value.contractorArr[0].personContactNo = "+" + this.countryCode4 + "-" + this.step1Form.value.contractorArr[0].personContactNo;
      this.step1Form.value.contractorArr[0].managerContactNo = "+" + this.countryCode5 + "-" + this.step1Form.value.contractorArr[0].managerContactNo;
  
      this.step1Form.value.inspectorArr[0].personContactNo = "+" + this.countryCode6 + "-" + this.step1Form.value.inspectorArr[0].personContactNo;
      this.step1Form.value.inspectorArr[0].managerContactNo = "+" + this.countryCode7 + "-" + this.step1Form.value.inspectorArr[0].managerContactNo;  
      
      this.reportDetails.signatorDetails = this.step1Form.value.designer1Arr;
      if(this.step1Form.value.designer2Arr[0].personName != "" && this.step1Form.value.designer2Arr[0].personName != null) {
        this.reportDetails.signatorDetails=this.reportDetails.signatorDetails.concat(this.step1Form.value.designer2Arr);
      }
      this.reportDetails.signatorDetails=this.reportDetails.signatorDetails.concat(this.step1Form.value.contractorArr,this.step1Form.value.inspectorArr);
    }
    else {
      
      this.reportDetails.signatorDetails = this.step1Form.getRawValue().designer1Arr;
      if(this.step1Form.value.designer2Arr[0].personName != "" && this.step1Form.value.designer2Arr[0].personName != null) {
        this.reportDetails.signatorDetails=this.reportDetails.signatorDetails.concat(this.step1Form.getRawValue().designer2Arr);
      }
      this.reportDetails.signatorDetails=this.reportDetails.signatorDetails.concat(this.step1Form.getRawValue().contractorArr,this.step1Form.getRawValue().inspectorArr);
    }
    
    if(flag){
    //  this.reportDetails.siteId = this.retrivedSiteId;
     
     //this.disable=false;
   this.UpateBasicService.updateBasic(this.reportDetails).subscribe(
    data=> {
     console.log("worked");
    
    },
    (error) => {
      console.log("error");
    });
   
   }
   else{
    
   this.reportDetailsService.addReportDetails(this.reportDetails).subscribe(
     data=> {
       this.proceedNext.emit(true);
       this.success = true;
       this.successMsg = data;
       this.disable = true;
     },
     (error) => {
       this.Error = true;
       this.errorArr = [];
       this.errorArr = JSON.parse(error.error);
       this.errorMsg = this.errorArr.message;
       this.proceedNext.emit(false);
     });
     this.service.siteCount = this.reportDetails.siteId;
  }
 }
}
