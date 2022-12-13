import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  ChangeDetectorRef,
  VERSION,
  Input,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, FormArray, FormControl } from '@angular/forms';
import { StepperSelectionEvent, STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DepartmentaddComponent } from '../department/departmentadd/departmentadd.component';
import { SiteaddComponent } from '../site/siteadd/siteadd.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientaddComponent } from '../Company/client/clientadd/clientadd.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../model/company';
import { ClientupdateComponent } from '../Company/client/clientupdate/clientupdate/clientupdate.component';
import { User } from '../model/user';
import { GlobalsService } from '../globals.service';
import { ClientService } from '../services/client.service';
import { DepartmentService } from '../services/department.service';
import { Department } from '../model/department';
import { DepartmentupdateComponent } from '../department/departmentupdate/departmentupdate/departmentupdate.component';
import { SiteService } from '../services/site.service';
import { Site } from '../model/site';
import { SiteupdateComponent } from '../site/siteupdate/siteupdate.component';
import { ReportDetailsService } from '../services/report-details.service';
import { Reportdetails } from '../model/reportdetails';
import { MatStepper } from '@angular/material/stepper';
import { InspectionVerificationBasicInformationComponent } from '../inspection-verification-basic-information/inspection-verification-basic-information.component';
import { InspectionVerificationTestingComponent } from '../inspection-verification-testing/inspection-verification-testing.component';
import { InspectionVerificationIncomingEquipmentComponent } from '../inspection-verification-incoming-equipment/inspection-verification-incoming-equipment.component';
import { SummaryComponent } from '../summary/summary.component';
import { InspectionVerificationSupplyCharacteristicsComponent } from '../inspection-verification-supply-characteristics/inspection-verification-supply-characteristics.component';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { SavedreportsComponent } from '../savedreports/savedreports.component';
import { InspectorregisterService } from '../services/inspectorregister.service';
import { map } from 'rxjs/operators';
import { readJsonConfigFile } from 'typescript';
import { FinalreportsComponent } from '../finalreports/finalreports.component';
import { ObservationService } from '../services/observation.service';
import {Pipe, PipeTransform } from '@angular/core';
import { MatTabGroup, MatTabHeader, MatTab } from '@angular/material/tabs';
//import { NGXLogger } from 'ngx-logger';
import { ConfirmationBoxComponent } from '../confirmation-box/confirmation-box.component';

@Component({
  selector: 'app-verificationlv',
  templateUrl: './verificationlv.component.html',
  styleUrls: ['./verificationlv.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class VerificationlvComponent implements OnInit {
  companyColumns: string[] = [
    'action',
    'companyCd',
    'clientName',
    'inActive',
    'createdDate',
    'createdBy',
    'updatedDate',
    'updatedBy',
  ];
  company_dataSource!: MatTableDataSource<Company[]>;
  @ViewChild('companyPaginator', { static: true })
  companyPaginator!: MatPaginator;
  @ViewChild('companySort', { static: true }) companySort!: MatSort;
  @Pipe({
    name: 'truncate'
})
@ViewChild('tabs') tabs!: MatTabGroup; //later implementation for clearing data from saved reports
  departmentColumns: string[] = [
    'action',
    'departmentCd',
    'departmentName',
    'createdDate',
    'createdBy',
    'updatedDate',
    'updatedBy',
  ];
  department_dataSource!: MatTableDataSource<Company[]>;
  @ViewChild('departmentPaginator', { static: true })
  departmentPaginator!: MatPaginator;
  @ViewChild('departmentSort', { static: true }) departmentSort!: MatSort;
  siteN:any="";
  siteColumns: string[] = [
    'action',
    'siteCd',
    'siteName',
    'country',
    'city',
    'createdDate',
    'createdBy',
    'updatedDate',
    'updatedBy',
  ];
  site_dataSource!: MatTableDataSource<Company[]>;
  @ViewChild('sitePaginator', { static: true }) sitePaginator!: MatPaginator;
  @ViewChild('siteSort', { static: true }) siteSort!: MatSort;
  @ViewChild('stepper', { static: false }) stepper!: MatStepper;


  selectedTabIndex: any;
  selectedIndex = 0;

  // selectedIndex : any;
  clientList: any = [];
  inActiveData: any = [];
  departmentList: any = [];
  clientArray: any = [];
  countryList: any = [];
  stateList: any = [];
  company = new Company();

  department = new Department();
  site = new Site();
  email: String = '';
  clientName: String = '';
  departmentName: String = '';
  inActive: boolean = false;
  user = new User();
  companyId: number = 0;
  departmentId: number = 0;
  createdBy: String = '';
  createdDate = new Date();
  companyCd: String = '';
  departmentCd: String = '';
  successMsg: string = '';

  isChecked: boolean = false;
  designer1Arr!: FormArray;
  designerRole: String = 'designer';
  contractorRole: String = 'contractor';
  inspectorRole: String = 'inspector';
  reportDetails = new Reportdetails();
  // @ViewChild(InspectionVerificationSupplyCharacteristicsComponent, {
  //   static: false,
  // })
  @ViewChild(InspectionVerificationBasicInformationComponent)
  basic!: InspectionVerificationBasicInformationComponent;
  @ViewChild(InspectionVerificationIncomingEquipmentComponent)
  incoming!: InspectionVerificationIncomingEquipmentComponent;
  @ViewChild(InspectionVerificationTestingComponent)
  testing!: InspectionVerificationTestingComponent;
  @ViewChild(SummaryComponent)
  summary!: SummaryComponent;
  @ViewChild(InspectionVerificationSupplyCharacteristicsComponent)
  supply!: InspectionVerificationSupplyCharacteristicsComponent;

  @ViewChild(SavedreportsComponent)
  saved!: SavedreportsComponent;
  @ViewChild(FinalreportsComponent)
  final!: FinalreportsComponent;
  @Input()
  siteId: any;
  
  // Second Tab dependencies
  panelOpenState = false;
  installationList: String[] = [
    'New installation',
    'First verification of an existing',
    'Addition of an existing installation',
    'Alteration in an existing installation',
    'Periodic verification',
  ];
  premiseList: String[] = [
    'Domestic(Individual)',
    'Domestic(Apartment)',
    'Commercial',
    'IT/Office',
    'Data center',
    'Industrial(Non Ex environment)',
    'Industrial(Ex environment)',
  ];
  evidenceList: String[] = ['Yes', 'No', 'Not Apparent'];
  previousRecordList: String[] = ['Yes', 'No'];

  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;

  // isCompleted: boolean = true;
  // isCompleted2: boolean = true;
  // isCompleted4: boolean = true;
  // isCompleted5: boolean = true;
  // isCompleted3: boolean = true;
  //isLinear: boolean = false;

  checkArray: any = [];

  disable: boolean = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  formBuilder: any;
  arrDesigner!: FormArray;
  deleteMsg: any;
  deleteMsg1: any;

  errorArr: any=[];
  errorArr1: any=[];
  errorArr2: any=[];

  Error: boolean=false;
  Error2: boolean=false;
  errorMsg: any;
  errorMsg1: any;
  success: boolean=false;
  success2: boolean=false
  deleteMsg2: any;
  errorMsg2: any;
  dataJSON: any = [];
  conFlag: boolean=false;
  noDetails: boolean=false;
  instance: any;
  siteData: any=[];
  inspectorData: any = [];
  validationError: boolean=false;
  validationErrorMsg: string="";
  disableTab: boolean=false;
  noDetailsFlag: any = false;
  siteData1: any = [];
  currentUser: any = [];
  currentUser1: any = [];
  basicValue: boolean = true;
  supplyValue: boolean = true;
  incomingValue: boolean = true;
  testingValue: boolean = true;
  summaryValue: boolean = true;
  selectedIndexStepper!: number;
  //counter: number=0;
//private logger: NGXLogger,
  constructor(
    private _formBuilder: FormBuilder,
    private modalService: NgbModal,
    private observationService: ObservationService,
    private dialog: MatDialog,
    private router: ActivatedRoute,
    private clientService: ClientService,
    private departmentService: DepartmentService,
    private reportDetailsService: ReportDetailsService,
    private siteService: SiteService,
    private ChangeDetectorRef: ChangeDetectorRef,
    public service: GlobalsService,
    private inspectorRegisterService: InspectorregisterService
  
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
    this.testing;
    this.siteService.retrieveCountry().subscribe((data) => {
      this.countryList = JSON.parse(data);
    });
   if(this.service.mainNavToSaved==1){
   this.selectedIndex=1;
   }

  if(this.service.viewerData.siteName!='' && this.service.viewerData.siteName!=undefined){
    this.siteN=this.service.viewerData.siteName;
  }
  else{
    this.siteN="";
  }
    this.refresh();
    // this.retrieveClientDetails();
    // this.retrieveSiteDetails();
    this.tabs._handleClick = this.interceptTabChange.bind(this); //later implementation for clearing data from saved reports
  }
  // callMethodFinal(){
  //   this.ngOnInit();
  // }
  retrieveIsActiveData() {
    this.retrieveClientDetails();
  }

  private retrieveClientDetails() {
    this.clientService.retrieveClient(this.email).subscribe((data) => {
      if (this.isChecked) {
        this.inActiveData = [];
        for (let arr of JSON.parse(data)) {
          if (arr.inActive) {
            this.inActiveData.push(arr);
          }
        }
      } else {
        this.inActiveData = [];
        this.inActiveData = JSON.parse(data);
        this.clientList = JSON.parse(data);
        this.clientArray = [];
        for (let arr of JSON.parse(data)) {
          this.clientArray.push(arr);
        }
      }

      this.company_dataSource = new MatTableDataSource(this.inActiveData);
      this.company_dataSource.paginator = this.companyPaginator;
      this.company_dataSource.sort = this.companySort;
    });
  }

  retrieveDepartmentDetails() {
    this.departmentService
      .retrieveDepartment(this.email, this.company.clientName)
      .subscribe((data) => {
        this.department_dataSource = new MatTableDataSource(JSON.parse(data));
        this.department_dataSource.paginator = this.departmentPaginator;
        this.department_dataSource.sort = this.departmentSort;
      });
  }

  retrieveSiteDetails() {
    this.siteService.retrieveSite(this.email).subscribe((data) => {
      this.site_dataSource = new MatTableDataSource(JSON.parse(data));
      this.site_dataSource.paginator = this.sitePaginator;
      this.site_dataSource.sort = this.siteSort;
      this.checkArray = JSON.parse(data);
      if (this.checkArray.length > 0) {
        this.disable = false;
      } else {
        this.disable = true;
      }
    });
  }

  closeModalDialog() {
    if (this.errorMsg != "") {
      this.Error = false;
      this.modalService.dismissAll((this.errorMsg = ""));
    } else {
      this.success = false;
      this.modalService.dismissAll((this.successMsg = ""));
    }
  }

  siteNameMethod(contentSiteName:any){
    if(this.siteN.length > 15){
      this.modalService.open(contentSiteName, { size: 'sm', centered: true,backdrop: 'static'});
      //alert("Full Site Name:\r\n" + this.siteN);
    }
  }

  deleteClient(clientname: String,clientdelete: any) {
    this.modalService.open(clientdelete, { centered: true,backdrop: 'static'});
    this.clientService
      .deleteClient(this.email, clientname).subscribe((
        data) => {
        this.success = true;
        this.successMsg = data;
        this.retrieveClientDetails();
      },error=>{
        this.Error = true;
        this.errorArr2 = [];
        this.errorArr2 = JSON.parse(error.error);
        this.errorMsg = this.errorArr2.message;
      });
    this.refresh();
  }

  addClient() {
    const dialogRef = this.dialog.open(ClientaddComponent, {
      width: '500px',
    });
    dialogRef.componentInstance.email = this.email;
    dialogRef.afterClosed().subscribe((result) => {
      this.refresh();
      this.retrieveClientDetails();
    });
  }

  updateClient(
    companyId: number,
    companyCd: String,
    clientName: String,
    inActive: boolean,
    createdDate: Date,
    createdBy: String
  ) {
    const dialogRef = this.dialog.open(ClientupdateComponent, {
      width: '500px',
    });
    dialogRef.componentInstance.clientName = clientName;
    dialogRef.componentInstance.inActive = inActive;
    dialogRef.componentInstance.companyId = companyId;
    dialogRef.componentInstance.createdBy = createdBy;
    dialogRef.componentInstance.createdDate = createdDate;
    dialogRef.componentInstance.email = this.email;
    dialogRef.componentInstance.companyCd = companyCd;
    dialogRef.afterClosed().subscribe((result) => {
      this.refresh();
      this.retrieveClientDetails();
    });
  }

  addDepartment() {
    const dialogRef = this.dialog.open(DepartmentaddComponent, {
      width: '500px',
    });
    dialogRef.componentInstance.email = this.email;
    dialogRef.afterClosed().subscribe((result) => {
      this.refresh();
      this.retrieveDepartmentDetails();
    });
  }

  updateDepartment(
    departmentId: number,
    departmentName: String,
    departmentCd: String,
    clientName: String,
    createdDate: Date,
    createdBy: String
  ) {
    const dialogRef = this.dialog.open(DepartmentupdateComponent, {
      width: '500px',
    });
    dialogRef.componentInstance.clientName = clientName;
    dialogRef.componentInstance.departmentName = departmentName;
    dialogRef.componentInstance.departmentId = departmentId;
    dialogRef.componentInstance.createdBy = createdBy;
    dialogRef.componentInstance.createdDate = createdDate;
    dialogRef.componentInstance.email = this.email;
    dialogRef.componentInstance.departmentCd = departmentCd;
    dialogRef.afterClosed().subscribe((result) => {
      this.refresh();
      this.retrieveDepartmentDetails();
    });
  }
 
  deleteDepartment(departmentId: number,deptdelete: any) {
    this.modalService.open(deptdelete, { centered: true,backdrop: 'static' });
    this.departmentService
      .deleteDepartment(this.email, departmentId)
      .subscribe((
        data) => {
        this.success = true;
        this.successMsg=data;
        this.retrieveDepartmentDetails();
      },error=>{
        this.Error = true;
        this.errorArr1 = [];
        this.errorArr1 = JSON.parse(error.error);
        this.errorMsg = this.errorArr1.message;
      });
    this.refresh();
  }

  addSite() {
    const dialogRef = this.dialog.open(SiteaddComponent, {
      width: '1000px',
      maxHeight: '90vh',
    });
    // dialogRef.componentInstance.email = this.email;
    dialogRef.afterClosed().subscribe((result) => {
      this.refresh();
      this.retrieveClientDetails();
    });
  }

  updateSite(
    userName: String,
    clientName: String,
    departmentName: String,
    site: String,
    siteId: number,
    siteCd: String,
    country: String,
    state: String,
    city: String,
    landMark: String,
    sitePersons: any[],
    addressLine_1: String,
    addressLine_2: String,
    zipCode: String,
    createdDate: Date,
    createdBy: String
  ) {
    const dialogRef = this.dialog.open(SiteupdateComponent, {
      width: '1000px',
      maxHeight: '90vh',
    });
    dialogRef.componentInstance.userName = userName;
    dialogRef.componentInstance.clientName = clientName;
    dialogRef.componentInstance.departmentName = departmentName;
    dialogRef.componentInstance.siteName = site;
    dialogRef.componentInstance.siteId = siteId;
    dialogRef.componentInstance.siteCd = siteCd;
    dialogRef.componentInstance.country = country;
    dialogRef.componentInstance.state = state;
    dialogRef.componentInstance.city = city;
    dialogRef.componentInstance.landMark = landMark;
    dialogRef.componentInstance.addressLine_1 = addressLine_1;
    dialogRef.componentInstance.addressLine_2 = addressLine_2;
    dialogRef.componentInstance.sitePersons = sitePersons;
    dialogRef.componentInstance.zipCode = zipCode;
    dialogRef.componentInstance.createdBy = createdBy;
    dialogRef.componentInstance.createdDate = createdDate;

    dialogRef.afterClosed().subscribe((result) => {
      this.refresh();
      this.retrieveSiteDetails();
    });
  }
  
  interceptTabChange(tab: MatTab, tabHeader: MatTabHeader) {
    if((this.service.lvClick==1) && (this.service.allStepsCompleted==true))
       {
        const dialogRef = this.dialog.open(ConfirmationBoxComponent, {
          width: '420px',
          maxHeight: '90vh',
          disableClose: true,
        });
        dialogRef.componentInstance.editModal = false;
        dialogRef.componentInstance.viewModal = false;
        dialogRef.componentInstance.triggerModal = true;
        dialogRef.componentInstance.linkModal = false;
        dialogRef.componentInstance.summaryModal = false;

        dialogRef.componentInstance.confirmBox.subscribe(data=>{
          if(data) {
            this.selectedIndex=1; 
            this.service.windowTabClick=0;
            this.service.logoutClick=0; 
            this.service.lvClick=0; 
          }
          else{
            return;
          }
        })
      //   if(confirm("Are you sure you want to proceed without saving?\r\n\r\nNote: To update the details, kindly click on next button!")){
      //     this.selectedIndex=1; 
      //     this.service.windowTabClick=0;
      //     this.service.logoutClick=0; 
      //     this.service.lvClick=0; 
      // }
      // else{
      //   return;
      // }
        }
        else if((this.service.lvClick==0) || (this.service.allStepsCompleted==false)){
        this.service.windowTabClick=0;
        this.service.logoutClick=0;
        this.service.lvClick=0; 
        const tabs = tab.textLabel;
        if((tabs==="Inspection Verification & Testing of Installation"))
           {
            this.selectedIndex=0; 
            //--need to fix later--
              if(this.currentUser1.role == 'Inspector'){
                this.siteService.retrieveListOfSite(this.email).subscribe(
                  data => {
                    this.siteData1 = JSON.parse(data);
                    for(let i of this.siteData1){
                      if(i.siteId == this.service.siteCount){
                        //this.counter++;
                        this.basic.reset();
                        this.supply.reset();
                        this.incoming.reset();
                        this.testing.reset();
                        // this.summary.reset();
                        this.changeTab(0, i.siteId, this.email, i.companyName, i.departmentName, i.site);
                        //this.changeTab(0, 2491, 'aishwarya547541@gmail.com', 'dvd', 'vdv', 'confimation box');
                      }
                    }
                  }
                )
              }
              else {
                if(this.currentUser1.assignedBy != null){
                  this.siteService.retrieveListOfSite(this.currentUser1.assignedBy).subscribe(
                    data => {
                      this.siteData1 = JSON.parse(data);
                      for(let i of this.siteData1){ 
                        if(i.siteId == this.service.siteCount){
                          this.basic.reset();
                          this.supply.reset();
                          this.incoming.reset();
                          this.testing.reset();
                          this.summary.reset();
                          this.changeTab(0, i.siteId, this.currentUser1.assignedBy, i.companyName, i.departmentName, i.site);
                        }
                      }
                    }
                  )
                }
              }
          }
          else if((tabs==="Saved Reports")){
            this.selectedIndex=1; 
          }    
          else{
            if(this.service.allStepsCompleted==false){
              this.selectedIndex=2;
            } 
          }        
        }
      
  }

  deleteSite(siteId: number,sitedelete : any) {
    this.modalService.open(sitedelete, { centered: true,backdrop: 'static' });
    this.siteService.deleteSite(siteId).subscribe((
      data) => {
        this.success = true;
        this.successMsg = data;
        setTimeout(() => {
          this.success = false;
        }, 3000);
        this.retrieveSiteDetails();
    },error=>{
        this.Error = true;
        this.errorArr = [];
        this.errorArr = JSON.parse(error.error);
        this.errorMsg =this.errorArr.message;
        setTimeout(() => {
          this.Error = false;
        }, 3000);
    });
    setTimeout(()=>{
      this.refresh();
    },1000);
  }

  changeClient(e: any) {
    let changedValue = e.target.value;
    this.departmentList = [];
    for (let arr of this.clientList) {
      if (arr.clientName == changedValue) {
        this.departmentService
          .retrieveDepartment(this.email, arr.clientName)
          .subscribe((data) => {
            this.departmentList = JSON.parse(data);
          });
      }
    } 
  }

  refresh() {
    this.ChangeDetectorRef.detectChanges();
  }

  // stepChanged(event: StepperSelectionEvent) { //1>2
  //   if (event.previouslySelectedIndex > event.selectedIndex) {
  //    event.previouslySelectedStep.interacted = false;
  //   }
  // }

  triggerClickTab(){
    this.basic.gotoNextTab();
    this.supply.gotoNextTab();
    this.incoming.gotoNextTab();
    this.testing.gotoNextTab();
    // this.summary.gotoNextTab();
  }

  triggerClickTab1() {
    this.basic.gotoNextTab();
    
  }

  triggerClickTab2() {
    this.supply.gotoNextTab();
  }

  triggerClickTab3() {
    this.incoming.gotoNextTab();
  }

  triggerClickTab4() {
    this.testing.gotoNextTab();
  }

  triggerClickTab5() {
    //this.summary.gotoNextTab();
  }
    // if(!this.service.step1Form.pristine || !this.service.supplycharesteristicForm.pristine || !this.service.addstep3.pristine 
    //   || !this.service.testingForm.pristine || !this.service.addsummary.pristine)
    //   { 
    //   this.isLinear=true;
    //   this.basic.gotoNextTab();
    //   this.supply.gotoNextTab();
    //   this.incoming.gotoNextTab();
    //   this.testing.gotoNextTab();
    // }
    // if(this.service.goBacktoprevious==true){
    //   this.basic.reloadFromBack();
    // }
    // else{
    //   this.isLinear=false;
    // }
   
  public NextStep1(next: any): void {
    this.service.isLinear=false;
    //this.service.step1Form = next;
    //this.basic.gotoNextTab();
    this.service.isCompleted= next;
  }

  public summaryFunctionCall2(value: any) {
    if(value.flag) {
      setTimeout(() => {
        this.summary.retrieveDetailsfromSummary(value.siteId,value.summaryData)
      }, 1000);
    }
  }

  public summaryFunctionCall3(value: any) {
    if(value.flag) {
      setTimeout(() => {
        this.summary.retrieveDetailsfromSummary(value.siteId,value.summaryData)
      }, 1000);
    }
  }

  public summaryFunctionCall4(value: any) {
    if(value.flag) {
      this.summary.retrieveDetailsfromSummary(value.siteId,value.summaryData)
    }
  }
  public NextStep2(next: any): void {
    this.service.isLinear=false;
    //this.service.supplycharesteristicForm = next;
    this.service.isCompleted2= next;

    if(next) {
      this.callTestingNgOnInit();      
    }
    else {
      this.testing.updateMethod();
    }
    this.summary.ngOnInit();
  }

  callTestingNgOnInit() {
    this.testing.callMethod();
  }
  callSummaryNgOnInit() {
    this.summary.ngOnInit();
  }

  public NextStep3(next: any): void {
    if(next){
      this.callTestingNgOnInit();
    }
    else{
      // need to uncoment for testing update issue
      this.testing.updateMethod();
    }
    //this.service.addstep3 = next;
    this.summary.ngOnInit();
    this.service.isLinear=false;
    this.service.isCompleted3= next;

  }
  public NextStep4(next: any): void {
    this.service.isLinear=false;
    //this.service.testingForm = next;
    this.service.isCompleted4= next;
    this.summary.ngOnInit();

  }
  public NextStep5(next: any): void {
    this.saved.ngOnInit();
    this.final.ngOnInit();
    this.service.isLinear=false;
    //this.service.addsummary = next;
    this.service.isCompleted5 = next;
    if(next.nextFlag){
    this.service.allStepsCompleted=false;
      if(!next.adminFlag) {       
        this.selectedIndex=1;
      }   
    }
    else {
      this.service.allStepsCompleted=true;
      this.selectedIndex=2;
    }
  }
  navigateStep(index: any) {
    this.stepper.selectedIndex = index;
  }
  
 
  // retreiveFromObservationSupply(siteId:any,observationComponent:any,userName:any){
  //   this.observationService.retrieveObservation(siteId,observationComponent,userName).subscribe(
  //     (data) => {
  //     let observationArr=JSON.parse(data);
  //     this.supply.retrieveFromObservationSupply(data);
  //     },
  //     (error) => {
  //       this.errorArr = [];
  //       this.Error = true;
  //       this.errorArr = JSON.parse(error.error);
  //       this.errorMsg = this.errorArr.message;
  //     }
  //   )
  // }
  // retreiveFromObservationInspection(siteId:any,observationComponent:any,userName:any){
  //   this.observationService.retrieveObservation(siteId,observationComponent,userName).subscribe(
  //     (data) => {
  //     let observationArr=JSON.parse(data);
  //     this.incoming.retrieveFromObservationInspection(data);
  //     },
  //     (error) => {
  //       this.errorArr = [];
  //       this.Error = true;
  //       this.errorArr = JSON.parse(error.error);
  //       this.errorMsg = this.errorArr.message;
  //     }
  //   )
  // }
  // retreiveFromObservationTesting(siteId:any,observationComponent:any,userName:any){
  //   this.observationService.retrieveObservation(siteId,observationComponent,userName).subscribe(
  //     (data) => {
  //     let observationArr=JSON.parse(data);
  //     this.testing.retrieveFromObservationTesting(data);
  //     },
  //     (error) => {
  //       this.errorArr = [];
  //       this.Error = true;
  //       this.errorArr = JSON.parse(error.error);
  //       this.errorMsg = this.errorArr.message;
  //     }
  //   )
  // }

//for ongoing & completed

changeTab(index: number, sitedId: any, userName: any, companyName: any, departmentName: any, site: any): void {
  // this.selectedIndex=1;
 // this.logger.error('changeTab started');
  this.siteService.retrieveFinal(sitedId).subscribe(
    data=> {
    
            //this.logger.debug('data fetched');
      //this.selectedIndex = index;
      this.dataJSON = JSON.parse(data);
      if(this.dataJSON.reportDetails != null) {
        this.siteN=site;
        this.noDetailsFlag = true;
        if(this.dataJSON.allStepsCompleted == "Step1 completed"){
          this.selectedIndexStepper = 0;
        }
        
        // this.retreiveFromObservationSupply(sitedId,'Supply-Component',userName);
        // this.retreiveFromObservationInspection(sitedId,'Inspection-Component',userName);
        // this.retreiveFromObservationTesting(sitedId,'Testing-Component',userName);
        this.service.siteCount = sitedId;
        this.service.msgForStep1Flag=false;
        this.basic.retrieveDetailsfromSavedReports(userName,sitedId,companyName,departmentName,site,data);
      }
      else{
        if(this.dataJSON.allStepsCompleted == null){
          this.selectedIndexStepper = 0;
        }
        this.siteN=site;
        this.service.msgForStep1Flag=true;
        this.retrieveSite(companyName,departmentName,site);
        setTimeout(() => {
          //this.selectedIndex=0;
        }, 3000);
      }
      if(this.dataJSON.supplyCharacteristics != null) {
        this.noDetailsFlag = true;
        this.selectedIndex = index;
        this.service.siteCount = sitedId;
        if(this.dataJSON.allStepsCompleted == "Step2 completed"){
         this.selectedIndexStepper=1;
        }        
        this.supply.retrieveDetailsfromSavedReports(userName,sitedId,companyName,departmentName,site,data);
        if(this.dataJSON.summary == null) {
          this.summary.retrieveFromOngoingForObservation(sitedId);
        }
        //commented by Arun on 04/12/2021
        //this.testing.retrieveDetailsfromSavedReports(userName,sitedId,companyName,departmentName,site,data);
      }

      if(this.dataJSON.periodicInspection != null) {
        this.noDetailsFlag = true;
        this.selectedIndex = index;
        this.service.siteCount = sitedId;
        if(this.dataJSON.allStepsCompleted == "Step3 completed"){
          this.selectedIndexStepper=2;
         }
         else if(this.dataJSON.allStepsCompleted == "Step4 completed"){
          this.selectedIndexStepper=3;
         }
        this.incoming.retrieveDetailsfromSavedReports(userName,sitedId,companyName,departmentName,site,data);
        if(this.dataJSON.summary == null) {
          this.summary.retrieveFromOngoingForObservation(sitedId);
        }        
        this.testing.retrieveDetailsfromSavedReports(userName,sitedId,companyName,departmentName,site,data);
        //multiple conditions
        // if(this.dataJSON.summary == null) {
        //   this.summary.retrieveFromOngoingForObservation(sitedId);
        // }      
        //  if(this.dataJSON.testingReport != null) {
      //    this.testing.retrieveDetailsfromSavedReports(userName,sitedId,companyName,departmentName,site,data);
          if(this.dataJSON.summary != null) {
            this.noDetailsFlag = true;
            if(this.dataJSON.allStepsCompleted == "Step5 completed"){
              this.selectedIndexStepper=4;
             }
             else if(this.dataJSON.allStepsCompleted == "AllStepCompleted") {
              this.selectedIndexStepper=0;
             }
            this.summary.retrieveDetailsfromSavedReports(userName,sitedId,companyName,departmentName,site,data);
          }
      }
    
      if(this.service.commentScrollToBottom==1){
      this.service.triggerScrollTo();
      }
      this.service.commentScrollToBottom=0;
        
        
      if(this.noDetailsFlag) {
        this.siteN=site;
      }  
      else{
        this.siteN=site;
        this.noDetails=true;
        this.service.msgForStep1Flag=true;
        //this.retrieveSite(companyName,departmentName,site);
        setTimeout(() => {
          this.noDetails=false;
          this.selectedIndex=0;
        }, 3000);
      }   
    },
    error=> {

    }
  )
  //this.logger.debug('finished');
}
//for continue button in saved reports
changeTabSavedReport(index: number, sitedId: any, userName: any, clientName: any, departmentName: any, site: any,flag:any) {
  this.noDetailsFlag= false;
  if(flag){
    this.selectedIndex = 1;
  } else{
    this.selectedIndex = 2;
  }
  

    this.basicValue = false;
    this.supplyValue = false;
    this.incomingValue = false;
    this.testingValue = false;
    this.summaryValue = false;

    setTimeout(() => {
    this.basicValue =true;
    this.supplyValue = true;
    this.incomingValue = true;
    this.testingValue = true;
    this.summaryValue = true;

    }, 500);
    
 setTimeout(() => {
  this.siteService.retrieveFinal(sitedId).subscribe(
    data=> {
     
      //this.selectedIndex = index;
      this.saved.savedReportSpinner =false;
      this.saved.savedReportBody = true;
      this.final.finalReportSpinner = false;
      this.final.finalReportBody = true;
      this.dataJSON = JSON.parse(data);
      if(flag){
        this.service.allStepsCompleted=true;
      }
      if(this.dataJSON.reportDetails != null 
           && this.dataJSON.supplyCharacteristics != null 
             && this.dataJSON.periodicInspection != null 
               && this.dataJSON.testingReport != null 
                 && this.dataJSON.summary != null && this.dataJSON.allStepsCompleted == "AllStepCompleted") {
                  this.service.allFieldsDisable = true;
                  this.service.disableSubmitSummary=true;
                 }
      if(this.dataJSON.reportDetails != null) {
        this.siteN=site;
        this.noDetailsFlag= true;
        if(this.dataJSON.allStepsCompleted == "Step1 completed"){
          this.selectedIndexStepper = 0;
        }
        this.selectedIndex = index;       
        this.service.msgForStep1Flag=false;
        this.basic.retrieveDetailsfromSavedReports(userName,sitedId,clientName,departmentName,site,data);
        this.service.siteCount = sitedId;
      }
      else {
        if(this.dataJSON.allStepsCompleted == null){
          this.selectedIndexStepper = 0;
        }
        this.siteN=site;
        //this.selectedIndex = 0;       
        //Remove the below if the reset is fixed
        // this.basic.siteDetails = true;
        // this.basic.siteDetails1 = false;
        this.retrieveSite(clientName,departmentName,site);
      }

      if(this.dataJSON.supplyCharacteristics != null) {
        this.noDetailsFlag= true;
        this.selectedIndex = index;       
        this.supply.retrieveDetailsfromSavedReports(userName,sitedId,clientName,departmentName,site,data);
        this.service.siteCount = sitedId;
        if(this.dataJSON.allStepsCompleted == "Step2 completed"){
          this.selectedIndexStepper=1;
         }    
        this.supply.retrieveDetailsfromSavedReports(userName,sitedId,clientName,departmentName,site,data);
        if(this.dataJSON.summary == null) {
          this.summary.retrieveFromOngoingForObservation(sitedId);
        }      
      }
      
      if(this.dataJSON.periodicInspection != null) {
        this.noDetailsFlag= true;
        this.selectedIndex = index;       
        this.incoming.retrieveDetailsfromSavedReports(userName,sitedId,clientName,departmentName,site,data);
        this.service.siteCount = sitedId;
        if(this.dataJSON.allStepsCompleted == "Step3 completed"){
          this.selectedIndexStepper=2;
         }
         else if(this.dataJSON.allStepsCompleted == "Step4 completed"){
          this.selectedIndexStepper=3;
         }
        this.incoming.retrieveDetailsfromSavedReports(userName,sitedId,clientName,departmentName,site,data);
        if(this.dataJSON.summary == null) {
          this.summary.retrieveFromOngoingForObservation(sitedId);
        }        
        this.testing.retrieveDetailsfromSavedReports(userName,sitedId,clientName,departmentName,site,data);
        if(this.dataJSON.summary == null) {
          this.summary.retrieveFromOngoingForObservation(sitedId);
        }          
        if(this.dataJSON.summary != null) {
           if(this.dataJSON.allStepsCompleted == "Step5 completed"){
            this.selectedIndexStepper=4;
           }
           else if(this.dataJSON.allStepsCompleted == "AllStepCompleted") {
            this.selectedIndexStepper=0;
           }
            this.summary.retrieveDetailsfromSavedReports(userName,sitedId,clientName,departmentName,site,data);
        }             
      }
         
      if(this.service.commentScrollToBottom==1){
        this.service.triggerScrollTo();
      }
      this.service.commentScrollToBottom=0;
      
      if(this.noDetailsFlag) {
        this.siteN=site;
      }  
      else{
        this.siteN=site;
        this.noDetails=true;
        this.service.msgForStep1Flag=true;
        this.saved.savedContinue();
        setTimeout(() => {
          this.noDetails=false;
          this.selectedIndex=0;
        }, 1000);
      }   
    },
    error=> {
      this.saved.savedReportSpinner =false;
      this.saved.savedReportBody = true;
    }
  )}, 3000);
 
}

//retrieve site after adding new site in modal
  retrieveSite(companyName:any,departmentName:any,site:any){
    if(companyName!=undefined && companyName!="" && companyName!=null && departmentName!=undefined && departmentName!="" && departmentName!=null && site!=undefined && site!="" && site!=null){
      this.siteService.retrieveSiteForInspection(companyName,departmentName,site).subscribe(
        data=>{
          this.siteData=JSON.parse(data);
          this.inspectorRegisterService.retrieveInspector(this.siteData.assignedTo).subscribe(
            data=>{
              this.service.viewerData=JSON.parse(data);
              this.service.viewerData.siteName=site;
              this.inspectorRegisterService.retrieveInspector(this.service.viewerData.assignedBy).subscribe(
                data=>{
                  this.inspectorData = JSON.parse(data);
                  this.service.inspectorData=this.inspectorData;
                  this.basic.ngOnInit();
                  // setTimeout(() => {
                  //   this.basic.ngOnInit();
                  // }, 1000);
                }
              )
            })
        })
    }
  }

//for final reports tab
  changeTab1(index: number): void {
    this.selectedIndex = index;
  }

  myTabSelectedTabChange(e: any) {
    //console.log(e);
  }

  continue1(siteId: any,userName :any,clientName: any,departmentName: any,site: any) {
    this.selectedIndex = 0;
    this.basic.changeTab(0,siteId,userName,clientName,departmentName,site);
  }
  testingNgOnINit(){
    this.testing.ngOnInit();
  }
  // onTabChanged(e: any) {
  //   if(!this.conFlag) {
  //     
  //     console.log(e);
  //     this.selectedIndex = e.index;
  //     //console.log(this.tabGroup.selectedIndex);
  //   }
    
  // }
  goBack2(stepper: MatStepper) {
    if(this.supply.reloadFromBack()){
      stepper.previous();
      //this.service.goBacktoprevious=true;
    }
  }
  goBack3(stepper: MatStepper) {
    if(this.incoming.reloadFromBack()){
      stepper.previous();
      //this.service.goBacktoprevious=true;
    }
  }
  goBack4(stepper: MatStepper) {
    if(this.testing.reloadFromBack()){
      stepper.previous();
      //this.service.goBacktoprevious=true;
    }
  }
  goBack5(stepper: MatStepper) {
    if(this.summary.reloadFromBack()){
      stepper.previous();
      //this.service.goBacktoprevious=true;
    }
  }

}
