import { Component, EventEmitter, Input, Output, ViewChild, ViewContainerRef, OnInit, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginserviceService } from '../services/loginservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LvInspectionDetailsComponent } from '../lv-inspection-details/lv-inspection-details.component';
import { ComponentFactoryResolver } from '@angular/core';
import { RiskAssessmentInspectionMaintenanceComponent } from '../risk-assessment-inspection-maintenance/risk-assessment-inspection-maintenance.component';
import { EmcAssessmentInstallationComponent } from '../emc-assessment-installation/emc-assessment-installation.component';
import { MainNavService } from '../services/main-nav.service';
import { ApplicationType } from '../model/applicationtype';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddApplicationTypesComponent } from '../add-application-types/add-application-types.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateApplicationTypesComponent } from '../update-application-types/update-application-types.component';
import { ApplicationTypeService } from '../services/application.service';
import { User } from '../model/user';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { relative } from '@angular/compiler-cli/src/ngtsc/file_system';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SiteService } from '../services/site.service';
import { MatTableDataSource } from '@angular/material/table';
import { Company } from '../model/company';
import { GlobalsService } from '../globals.service';
import { Register } from '../model/register';
import { InspectorregisterService } from '../services/inspectorregister.service';
import { VerificationlvComponent } from '../verificationlv/verificationlv.component';
import { InspectionVerificationService } from '../services/inspection-verification.service';
import { InspectionVerificationBasicInformationComponent } from '../inspection-verification-basic-information/inspection-verification-basic-information.component';
import { SavedreportsComponent } from '../savedreports/savedreports.component';
import { LpsMatstepperComponent } from '../LPS/lps-matstepper/lps-matstepper.component';
import { LpsWelcomePageComponent } from '../LPS/lps-welcome-page/lps-welcome-page.component';
import { wind } from 'ngx-bootstrap-icons';
import { ConfirmationBoxComponent } from '../confirmation-box/confirmation-box.component';
import { MatCarousel } from 'ng-mat-carousel';

import { NewsService } from '../services/news.service';
// import {
//   DiagramComponent,Diagram, UndoRedo, ConnectorBridging, SnapConstraints,PointPortModel,PortVisibility,PortConstraints,
//   NodeModel, ConnectorModel, PathAnnotationModel, DecoratorModel, PointModel,
//  DiagramConstraints, SymbolInfo, PaletteModel, SymbolPreviewModel, SnapSettingsModel,

// } from '@syncfusion/ej2-angular-diagrams';

import {
  DiagramComponent, NodeModel, ConnectorModel, PaletteModel,
  SnapSettingsModel, SnapConstraints, SymbolPaletteComponent, PointPortModel, PortVisibility,
  PortConstraints, ContextMenuSettingsModel, IDragEnterEventArgs, DiagramBeforeMenuOpenEventArgs,
  SymbolPreviewModel,
  SwimLaneModel, Node,
  SymbolInfo,
  LaneModel,
  randomId,
  cloneObject, ShapeStyleModel,
  HeaderModel,
} from '@syncfusion/ej2-angular-diagrams';
import { DiagramModel } from '../SLD/SLD Models/diagram-component';
import { DiagramListComponent } from '../SLD/SLD components/diagram-list/diagram-list.component';
import { DiagramWelcomePageComponent } from '../SLD/SLD components/diagram-welcome-page/diagram-welcome-page.component';
import { SuperAdminDev } from 'src/environments/environment.dev';
import { SuperAdminProd } from 'src/environments/environment.prod';
import { NewsApiService } from 'angular-news-api';
import { BuyMeterComponent } from '../buy-meter/buy-meter.component';

export interface PeriodicElement {
  siteCd: string;
  site: string;
  country: string;
  city: string;
  createdDate: string;
  createdBy: string;
  updatedDate: string;
  updatedBy: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  { siteCd: 'CODE', site: 'Arun', country: 'India', city: 'chennai', createdDate: '1/1/2021', createdBy: 'Arun K', updatedDate: '1/1/2021', updatedBy: 'Arun K' },
  { siteCd: 'CODE1', site: 'Arun1', country: 'India', city: 'chennai', createdDate: '2/1/2021', createdBy: 'Arun Kumar', updatedDate: '1/1/2021', updatedBy: 'Arun Kumar' },
  { siteCd: 'CODE2', site: 'Arun2', country: 'India', city: 'chennai', createdDate: '3/1/2021', createdBy: 'Arun K', updatedDate: '1/1/2021', updatedBy: 'Arun K' },
  { siteCd: 'CODE3', site: 'Arun3', country: 'India', city: 'chennai', createdDate: '4/1/2021', createdBy: 'Arun', updatedDate: '1/1/2021', updatedBy: 'Arun' },
  { siteCd: 'CODE4', site: 'Arun4', country: 'India', city: 'chennai', createdDate: '5/1/2021', createdBy: 'AK', updatedDate: '1/1/2021', updatedBy: 'AK' },
  { siteCd: 'CODE5', site: 'Arun5', country: 'India', city: 'chennai', createdDate: '6/1/2021', createdBy: 'Arun', updatedDate: '1/1/2021', updatedBy: 'Arun' },
];

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit, OnDestroy {
  ongoingSiteColumns: string[] = [
    'siteCd',
    'site',
    'country',
    'city',
    'createdDate',
    'createdBy',
    'updatedDate',
    'updatedBy',
    // 'action',
  ];
  ongoingSite_dataSource!: MatTableDataSource<Company[]>;
  //@ViewChild('ongoingSitePaginator', { static: false }) ongoingSitePaginator!: MatPaginator;
  //@ViewChild('ongoingSiteSort', { static: false }) ongoingSiteSort!: MatSort;
  private ongoingSitePaginator!: MatPaginator;
  private ongoingSiteSort!: MatSort;
  superAdminFlag: boolean = false;
  allData: any = [];
  selectedIndex: any;
  greet: string="";


  @ViewChild('ongoingSiteSort') set matSortOn(ms: MatSort) {
    this.ongoingSiteSort = ms;
    this.setOngoingDataSourceAttributes();
  }

  @ViewChild('ongoingSitePaginator') set matPaginatorOn(mp: MatPaginator) {
    this.ongoingSitePaginator = mp;
    this.setOngoingDataSourceAttributes();
  }

  completedLicenseColumns: string[] = [
    'siteCd',
    'site',
    'country',
    'city',
    'createdDate',
    'createdBy',
    'updatedDate',
    'updatedBy',
    'action',
  ];

  completedLicense_dataSource!: MatTableDataSource<Company[]>;
  //@ViewChild('completedLicensePaginator', { static: false }) completedLicensePaginator!: MatPaginator;
  //@ViewChild('completedLicenseSort', { static: false }) completedLicenseSort!: MatSort;

  private completedLicensePaginator!: MatPaginator;
  private completedLicenseSort!: MatSort;

  @ViewChild('completedLicenseSort') set matSort(ms: MatSort) {
    this.completedLicenseSort = ms;
    this.setCompletedDataSourceAttributes();
  }

  @ViewChild('completedLicensePaginator') set matPaginator(mp: MatPaginator) {
    this.completedLicensePaginator = mp;
    this.setCompletedDataSourceAttributes();
  }
  sidenavWidth: any;
  isExpanded: boolean = false;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  showSubmenuRep: boolean = false;
  showSubmenuMeter: boolean = false;
  showSubmenuOngoing: boolean = false;
  showSubmenuCompleted: boolean = false;
  showingh = false;
  autosize: boolean = true;
  screenWidth: number | undefined;
  activeTab = 0;
  ongoingSite: boolean = false;
  completedSite: boolean = false;
  public isCollapsed = false;
  successMsg: string = "";
  success: boolean = false;
  Error: boolean = false;
  errorMsg: string = "";
  errorArr: any = [];
  superAdminArr: any = [];
  @ViewChild('ref', { read: ViewContainerRef })
  viewContainerRef!: ViewContainerRef;

  @ViewChild('verify')
  verification: any;

  @ViewChild(InspectionVerificationBasicInformationComponent)
  basic!: InspectionVerificationBasicInformationComponent;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  applicationTypes: ApplicationType[] = [];
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  fullName: String = '';
  email: String = '';
  userName: String = '';

  id: number = 0;
  type: String = '';
  typeMeter: String = '';

  code: String = '';
  register = new Register();
  style: any;

  itemValue1: String = 'IN';
  itemValue2: String = 'TIC';
  itemValue3: String = 'MT';
  // itemValue4: String = 'BM';
  itemValue5: String = 'REP';
  SubitemValue1: String = 'Ongoing TIC';
  SubitemValue2: String = 'Completed TIC';

  SubitemValueOngoing1 = 'LV Systems';
  SubitemValueOngoing2 = 'EMC Assessment';
  SubitemValueOngoing3 = 'LPS Systems';

  SubitemValueCompleted1 = 'LV Systems';
  SubitemValueCompleted2 = 'EMC Assessment';
  SubitemValueCompleted3 = 'LPS Systems';

  // stackblitz
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  sidenav: any;
  width: any;
  snav: any;
  mobileDisplay: boolean = false;
  desktopDisplay: boolean = false;
  welcome: boolean = true;
  youtube: boolean = true;
  //isExpanded: any;
  selectedRowIndex: String = '';
  selectedRowIndexSub: String = '';
  selectedRowIndexType: String = '';
  selectedRowIndexTypeMeter: String = '';
  applicationTypesbasedonuser: string = "";
  ApplicationTypesSplit: any = [];
  ApplicationTypesMeter1: string = "";
  ApplicationTypesMeter: any = ['Rent Meter','Buy Meter'];
  showTIC: boolean = false;
  showMeter: boolean = false;

  showREP: boolean = false;
  currentUser: any = [];
  currentUser1: any = [];
  modalReference: any;

  mainApplications: any = [{ 'name': 'Introduction', 'code': 'IN' },
  { 'name': 'TIC', 'code': 'TIC' },
  { 'name': 'Meter', 'code': 'MT' },
  // { 'name': 'Buy Meter', 'code': 'BM' },
  { 'name': 'Reports', 'code': 'REP' },
  ]


  count!: number;
  count1!: number;
  viewerComment: boolean = false;
  inspectorReply: boolean = false;
  zeroNotification: boolean = false;
  viewerName: String = '';
  inspectorName: String = '';
  viewerTime!: Date;
  inspectorTime!: Date;
  value: boolean = false;
  userData: any = [];
  // viewerFilterData:any=[];
  ongoingFilterData: any = [];
  completedFilterData: any = [];
  notificationData: any = [];
  activeNotificationData: any = [];
  newNotificationCount!: number;
  newNotificationFlag:boolean=true;
  oldNotification:boolean=false;
  NewViewerComment:boolean=false;
  NewInspectorReply:boolean=false;
  newZeroNotification:boolean=false;
  disable: boolean=false;
  //superAdminLocal = new SuperAdminLocal();
  superAdminDev = new SuperAdminDev();
  superAdminProd = new SuperAdminProd();
  color = 'accent';
  checked = false;
  newsArticleDisplay: any = [];  
  newsArticleDisplay0: any = [];  
  newsArticleDisplay1: any = [];
  newsArticleDisplay2: any = [];


   
  constructor(private breakpointObserver: BreakpointObserver, changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,private newsService: NewsService,
    private loginservice: LoginserviceService,
    private inspectorService: InspectorregisterService,
    private inspectionService: InspectionVerificationService,
    private router: ActivatedRoute,
    public service: GlobalsService,
    private route: Router, private dialog: MatDialog,
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationService: ApplicationTypeService,
    private modalService: NgbModal, private bnIdle: BnNgIdleService,
    private siteService: SiteService
  ) {
    this.email = this.router.snapshot.paramMap.get('email') || '{}';
    //  this.retrieveApplicationTypes();
    this.retrieveApplicationTypesBasedOnUser(this.email);
    this.displayUserFullName(this.email);
    // set screenWidth on page load
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      // set screenWidth on screen size change
      this.screenWidth = window.innerWidth;
    };
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    var myDate = new Date();
    var hrs = myDate.getHours();
  
    if (hrs < 12)
        this.greet = 'Good Morning!';
    else if (hrs >= 12 && hrs < 17)
        this.greet = 'Good Afternoon!';
    else if (hrs >= 17 && hrs <= 24)
        this.greet = 'Good Evening!';
    this.newNotify();
    this.mobileDisplay = false;
    this.desktopDisplay = true;
     //load articles
    // this.newsService.initArticles().subscribe(data => this.mArticles = data['articles']);
     //load news sources
     this.newsService.topHeadlines().subscribe((result)=>{
       console.log(result);
     //  for(let articles=0; articles<16; articles++){
      this.newsArticleDisplay=result.articles;
      //   this.newsArticleDisplay=result.articles.slice(0, 1);
      //   this.newsArticleDisplay1=result.articles.slice(1, 2);
      //   this.newsArticleDisplay2=result.articles.slice(2,3);
       //if image url
        if(this.newsArticleDisplay[0].urlToImage==null){
          this.newsArticleDisplay[0].urlToImage="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
        }
      //  if(this.newsArticleDisplay[0].description.length > 25){
      //    this.newsArticleDisplay[0].description = this.newsArticleDisplay[0].description.substring(0,25) + "..."; 
      //  }
       if(this.newsArticleDisplay[0].title==null){
        this.newsArticleDisplay[0].title="https://google.com/news.html";
      }
        //if image url 1
      //   if(this.newsArticleDisplay1[0].title.length > 25){
      //     this.newsArticleDisplay[0].author = this.newsArticleDisplay1[0].title.substring(0,50) + "...";
      //   }
       
      //   if(this.newsArticleDisplay1[0].urlToImage!=null){
      //   this.newsArticleDisplay[0].content=this.newsArticleDisplay1[0].urlToImage; 
      //   }
      //   else
      //   {
      //     this.newsArticleDisplay[0].content="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
      //   }
      //   if(this.newsArticleDisplay1[0].urlToImage!=null){
      //     this.newsArticleDisplay[0].description=this.newsArticleDisplay1[0].url; 
      //   }
      //     else
      //     {
      //       this.newsArticleDisplay[0].description="https://google.com/news.html";
      //     }
        
      // //if image url 2
      //   if(this.newsArticleDisplay2[0].title.length > 25){
      //     this.newsArticleDisplay[0].publishedAt = this.newsArticleDisplay2[0].title.substring(0,50) + "...";
      //   }
        
      //   if(this.newsArticleDisplay1[0].urlToImage!=null){
      //     this.newsArticleDisplay[0].source.id=this.newsArticleDisplay2[0].urlToImage; 
      //   }
      //     else
      //     {
      //       this.newsArticleDisplay[0].source.id="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
      //     }
      //     if(this.newsArticleDisplay1[0].urlToImage!=null){
      //       this.newsArticleDisplay[0].source.name=this.newsArticleDisplay2[0].url; 
      //     }
      //       else
      //       {
      //         this.newsArticleDisplay[0].description="https://google.com/news.html";
      //       }
      // }
       
     });  
    // this.bnIdle.startWatching(environment.sessionTimeOut).subscribe((isTimedOut: boolean) => {
    //   if (isTimedOut) {
    //     alert('Your session is timed out')
    //     this.logout();
    //     this.bnIdle.stopTimer();
    //   }
    // });
    this.currentUser = sessionStorage.getItem('authenticatedUser');
    this.currentUser1 = [];
    this.currentUser1=JSON.parse(this.currentUser);
    // this.superAdminArr = [];
    // this.superAdminArr.push('gk@capeindia.net');
    // this.superAdminArr.push('awstesting@rushforsafety.com');
    // this.superAdminArr.push('vinoth@capeindia.net');
    if(this.currentUser1.role == 'Inspector') {
      this.showTIC = true;
      this.showMeter=true;
      this.showREP = false;
    }
    else {
      //uncomment this later...
      this.showTIC = false;
      this.showMeter=false;
      this.showREP = false;
      if (this.currentUser1.assignedBy != null) {
        this.showREP = true;
      }
      // this.showTIC = true;
      // this.showREP = true;
    }
    if (this.showREP) {
      this.retrieveSiteDetails();
    }
  }

 
  
  setCompletedDataSourceAttributes() {
    if (this.completedLicense_dataSource !== undefined) {
      this.completedLicense_dataSource.paginator = this.completedLicensePaginator;
      this.completedLicense_dataSource.sort = this.completedLicenseSort;
    }

  }
  setOngoingDataSourceAttributes() {
    if (this.ongoingSite_dataSource !== undefined) {
      this.ongoingSite_dataSource.paginator = this.ongoingSitePaginator;
      this.ongoingSite_dataSource.sort = this.ongoingSiteSort;
    }
  }
  newNotify() {
    this.inspectionService.notificationRetrieveComments(this.email).subscribe(
      (data) => {
        this.notificationData = JSON.parse(data);
        this.newNotification(this.notificationData);
      }
    )
  }

  newNotification(value: any) {
    this.newNotificationFlag = true;
    this.oldNotification = false;
    this.activeNotificationData = [];
    if (this.currentUser1.role == 'Inspector') {
      if (value.reportDetailsComment != null) {
        for (let a of value.reportDetailsComment) {
          if (a.viewerFlag == 1 && a.inspectorFlag == 0 && (a.approveOrReject == '' || a.approveOrReject == null)) {
            this.activeNotificationData.push(a);
          }
        }
      }
      if (value.supplyCharacteristicComment != null) {
        for (let b of value.supplyCharacteristicComment) {
          if (b.viewerFlag == 1 && b.inspectorFlag == 0 && (b.approveOrReject == '' || b.approveOrReject == null)) {
            this.activeNotificationData.push(b);
          }
        }
      }
      if (value.periodicInspectionComment != null) {
        for (let c of value.periodicInspectionComment) {
          if (c.viewerFlag == 1 && c.inspectorFlag == 0 && (c.approveOrReject == '' || c.approveOrReject == null)) {
            this.activeNotificationData.push(c);
          }
        }
      }
      if (value.testingReportComment != null) {
        for (let d of value.testingReportComment) {
          if (d.viewerFlag == 1 && d.inspectorFlag == 0 && (d.approveOrReject == '' || d.approveOrReject == null)) {
            this.activeNotificationData.push(d);
          }
        }
      }
      if (value.summaryComment != null) {
        for (let e of value.summaryComment) {
          if (e.viewerFlag == 1 && e.inspectorFlag == 0 && (e.approveOrReject == '' || e.approveOrReject == null)) {
            this.activeNotificationData.push(e);
          }
        }
      }
      if (this.activeNotificationData.length != 0) {
        this.NewInspectorReply = false;
        this.NewViewerComment = true;
      }
      else {
        this.newZeroNotification = true
      }
    }
    else {
      if (value.reportDetailsComment != null) {
        for (let a of value.reportDetailsComment) {
          if (a.viewerFlag == 1 && a.inspectorFlag == 1 && (a.approveOrReject == '' || a.approveOrReject == null)) {
            this.activeNotificationData.push(a);
          }
        }
      }
      if (value.supplyCharacteristicComment != null) {
        for (let b of value.supplyCharacteristicComment) {
          if (b.viewerFlag == 1 && b.inspectorFlag == 1 && (b.approveOrReject == '' || b.approveOrReject == null)) {
            this.activeNotificationData.push(b);
          }
        }
      }
      if (value.periodicInspectionComment != null) {
        for (let c of value.periodicInspectionComment) {
          if (c.viewerFlag == 1 && c.inspectorFlag == 1 && (c.approveOrReject == '' || c.approveOrReject == null)) {
            this.activeNotificationData.push(c);
          }
        }
      }
      if (value.testingReportComment != null) {
        for (let d of value.testingReportComment) {
          if (d.viewerFlag == 1 && d.inspectorFlag == 1 && (d.approveOrReject == '' || d.approveOrReject == null)) {
            this.activeNotificationData.push(d);
          }
        }
      }
      if (value.summaryComment != null) {
        for (let e of value.summaryComment) {
          if (e.viewerFlag == 1 && e.inspectorFlag == 1 && (e.approveOrReject == '' || e.approveOrReject == null)) {
            this.activeNotificationData.push(e);
          }
        }
      }
      if (this.activeNotificationData.length != 0) {
        this.NewInspectorReply = true;
        this.NewViewerComment = false;
      }
      else {
        this.newZeroNotification = true
      }
    }
    this.newNotificationCount = this.activeNotificationData.length;
  }

  notification(number: any, viewerName: any, inspectorName: any, viewerDate: any, inspectorDate: any) {
    this.count = number;
    this.newNotificationFlag = false;
    this.oldNotification = true;
    if (this.currentUser1.role == 'Inspector') {
      if (number != 1) {
        this.zeroNotification = true;
        this.viewerComment = false;
        this.inspectorReply = false;
      }
      else {
        this.viewerName = viewerName;
        this.inspectorName = inspectorName;
        this.viewerTime = viewerDate;
        this.inspectorTime = inspectorDate;
        this.zeroNotification = false;
        this.viewerComment = true;
        this.inspectorReply = false;
      }
    }
    else {
      if (number != 1) {
        this.zeroNotification = true;
        this.viewerComment = false;
        this.inspectorReply = false;
      }
      else {
        this.viewerName = viewerName;
        this.inspectorName = inspectorName;
        this.viewerTime = viewerDate;
        this.inspectorTime = inspectorDate;
        this.zeroNotification = false;
        this.viewerComment = false;
        this.inspectorReply = true;
      }
    }
  }

  triggerNavigateTo(siteName: any) {
    if ((this.service.lvClick == 1) && (this.service.allStepsCompleted == true)) {
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

      dialogRef.componentInstance.confirmBox.subscribe(data => {
        if (data) {
          this.welcome = false;
          this.youtube = false;
          this.ongoingSite = false;
          this.completedSite = false;
          this.value = false;
          this.service.mainNavToSaved = 1;
          this.service.commentScrollToBottom = 1;
          this.service.filterSiteName = siteName;
          this.service.highlightText = true;
          this.viewContainerRef.clear();
          const VerificationlvFactory = this.componentFactoryResolver.resolveComponentFactory(VerificationlvComponent);
          const lvInspectionRef = this.viewContainerRef.createComponent(VerificationlvFactory);
          lvInspectionRef.changeDetectorRef.detectChanges();
          this.service.windowTabClick = 0;
          this.service.logoutClick = 0;
        }
        else {
          return;
        }
      })
      //    if(confirm("Are you sure you want to proceed without saving?\r\n\r\nNote: To update the details, kindly click on next button!")){
      //      //this.service.triggerScrollTo();
      //   this.welcome= false; 
           //this.youtube = false;  
      //   this.ongoingSite=false;
      //   this.completedSite=false;
      //   this.value= false;
      //   this.service.mainNavToSaved=1;
      //   this.service.commentScrollToBottom=1;
      //   this.service.filterSiteName=siteName;
      //   this.service.highlightText=true;
      //   this.viewContainerRef.clear();
      //   const VerificationlvFactory = this.componentFactoryResolver.resolveComponentFactory(VerificationlvComponent);
      //   const lvInspectionRef = this.viewContainerRef.createComponent(VerificationlvFactory);
      //   lvInspectionRef.changeDetectorRef.detectChanges();
      //   this.service.windowTabClick=0;
      //   this.service.logoutClick=0; 
      //  }
      //  else{
      //    return;
      //  }
    }
    else if ((this.service.lvClick == 0) || (this.service.allStepsCompleted == false)) {
      this.welcome = false;
      this.youtube = false;
      this.ongoingSite = false;
      this.completedSite = false;
      this.value = false;
      this.service.mainNavToSaved = 1;
      this.service.commentScrollToBottom = 1;
      this.service.filterSiteName = siteName;
      this.service.highlightText = true;
      this.viewContainerRef.clear();
      const VerificationlvFactory = this.componentFactoryResolver.resolveComponentFactory(VerificationlvComponent);
      const lvInspectionRef = this.viewContainerRef.createComponent(VerificationlvFactory);
      lvInspectionRef.changeDetectorRef.detectChanges();
      this.service.windowTabClick = 0;
      this.service.logoutClick = 0;
    }
  }
  retrieveSiteDetails() {
    this.completedFilterData = [];
    this.ongoingFilterData = [];

    for(let i of this.superAdminDev.adminEmail) {
      if(this.email == i) {
        this.superAdminFlag = true;
      }
    }

    for(let i of this.superAdminProd.adminEmail) {
      if(this.email == i) {
        this.superAdminFlag = true;
      }
    }

    // for(let i of this.superAdminLocal.adminEmail) {
    //   if(this.email == i) {
    //     this.superAdminFlag = true;
    //   }
    // }

    if(this.superAdminFlag) {
      this.siteService.retrieveAllSite(this.email).subscribe(
        data => {
          this.allData = JSON.parse(data);
          for(let i of this.allData){
              if(i.allStepsCompleted=="AllStepCompleted"){
                this.completedFilterData.push(i);
              }
              else if(i.allStepsCompleted !="AllStepCompleted" && i.status != 'InActive'){
               this.ongoingFilterData.push(i);
              }
          }
          this.ongoingSite_dataSource = new MatTableDataSource(this.ongoingFilterData);
          this.ongoingSite_dataSource.paginator = this.ongoingSitePaginator;
          this.ongoingSite_dataSource.sort = this.ongoingSiteSort;

          this.completedLicense_dataSource = new MatTableDataSource(this.completedFilterData);
          //this.completedLicense_dataSource.paginator = this.completedLicensePaginator;
          //this.completedLicense_dataSource.sort = this.completedLicenseSort;
        });

      this.superAdminFlag = false;
    }
    else {
      if (this.currentUser1.role == 'Inspector') {
        this.siteService.retrieveSite(this.email).subscribe((data) => {
          this.ongoingSite_dataSource = new MatTableDataSource(JSON.parse(data));
          this.ongoingSite_dataSource.paginator = this.ongoingSitePaginator;
          this.ongoingSite_dataSource.sort = this.ongoingSiteSort;

          this.completedLicense_dataSource = new MatTableDataSource(JSON.parse(data));
          //this.completedLicense_dataSource.paginator = this.completedLicensePaginator;
          //this.completedLicense_dataSource.sort = this.completedLicenseSort;
        });
      }
      else {
        if (this.currentUser1.assignedBy != null) {
          this.ongoingFilterData = [];
          this.completedFilterData = [];
          this.siteService.retrieveListOfSite(this.currentUser1.assignedBy).subscribe(
            data => {
              this.userData=JSON.parse(data);
             for(let i of this.userData){
               if(i.assignedTo==this.email){
                 if(i.allStepsCompleted=="AllStepCompleted"){
                   this.completedFilterData.push(i);
                 }
                 else if(i.allStepsCompleted !="AllStepCompleted" && i.status != 'InActive'){
                  this.ongoingFilterData.push(i);
                 }
               }
             }
          this.ongoingSite_dataSource = new MatTableDataSource(this.ongoingFilterData);
          //this.ongoingSite_dataSource.paginator = this.ongoingSitePaginator;
          //this.ongoingSite_dataSource.sort = this.ongoingSiteSort;
    
          this.completedLicense_dataSource = new MatTableDataSource(this.completedFilterData);
         // this.completedLicense_dataSource.paginator = this.completedLicensePaginator;
          //this.completedLicense_dataSource.sort = this.completedLicenseSort;
        });
        }
      }
    }

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    // this.isShowing = true;
    // this.autosize = false;
  }
  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
      //this.sidenavWidth = 4;
      this.autosize = false;
      // setTimeout(() => this.autosize = false, 1);
    }
  }
  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
      //this.sidenavWidth = 4;
      this.autosize = true;
      //setTimeout(() => this.autosize = false, 1);
    }
  }
  retrieveApplicationTypes() {
    this.applicationService.retrieveApplicationTypes().subscribe(
      data => {
        this.applicationTypes = data;
      }
    );
  }

  retrieveApplicationTypesBasedOnUser(email: String) {
    this.applicationService.retrieveApplicationTypesBasedOnUser(email).subscribe(
      data => {
        this.applicationTypesbasedonuser = data.applicationType;
        
        if (this.applicationTypesbasedonuser != null && (data.permission !='YES' || data.permission != 'Yes' )) {

          //this.ApplicationTypesSplit = this.applicationTypesbasedonuser.split(',');
          this.ApplicationTypesSplit = [];
           for(let application of this.applicationTypesbasedonuser.split(',')){
            for(let permission of data.permission.split(',')){
              if (application == permission.split('-')[0] &&  permission.split('-')[1] == 'U') {
                this.ApplicationTypesSplit.push(application);
            } 
          }
        }
        }
        else{
          for(let application of this.applicationTypesbasedonuser.split(',')){
            this.ApplicationTypesSplit.push(application);
          }
        }
      }
    );
  } 

  logout() {
    if ((this.service.logoutClick == 1) && (this.service.allStepsCompleted == true)) {
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

      dialogRef.componentInstance.confirmBox.subscribe(data => {
        if (data) {
          this.loginservice.logout();
          this.service.windowTabClick = 0;
          this.route.navigate(['login']);
          window.location.reload();
          this.service.logoutClick = 0;
        }
        else {
          return;
        }
      })
      //   if(confirm("Are you sure you want to proceed without saving?\r\n\r\nNote: To update the details, kindly click on next button!")){
      //     this.loginservice.logout();
      //     this.service.windowTabClick=0;
      //     this.route.navigate(['login']);
      //     window.location.reload();
      //     this.service.logoutClick=0;  
      // }
      // else{
      //   return;
      // }
    }
    else if ((this.service.logoutClick == 0) || (this.service.allStepsCompleted == false)) {
      this.loginservice.logout();
      this.route.navigate(['login']);
      window.location.reload();
    }
  }

  displayUserFullName(email: String) {
    this.inspectorService.retrieveInspector(email).subscribe(
      data => {
        this.register = JSON.parse(data);
        this.fullName = this.register.name;
      }
    )
  }
  
  highlight(type:any){
    this.selectedRowIndex = type;
    this.selectedRowIndexType="";
    this.selectedRowIndexSub ="";
 }
 highlightSub(type:any){
  //this.viewContainerRef.clear();
  this.welcome= false;
  this.youtube = false;
  if(type== 'LV Systems') {
    this.selectedRowIndexSub = type;
    this.selectedRowIndexType="";
    this.ongoingSite=true;
    this.completedSite=false;
    this.value= false;
  }
 }

 highlightMeter(typeMeter:any){
  this.selectedRowIndex = typeMeter;
  this.selectedRowIndexTypeMeter="";
  this.selectedRowIndexSub ="";
}
 editSite(siteId: any,userName: any,site: any) {
  this.service.allStepsCompleted=true;
  this.service.disableSubmitSummary=false;
  this.service.allFieldsDisable = false;
  const dialogRef = this.dialog.open(ConfirmationBoxComponent, {
    width: '420px',
    maxHeight: '90vh',
    disableClose: true,
  });
  dialogRef.componentInstance.editModal = true;
    dialogRef.componentInstance.viewModal = false;
    dialogRef.componentInstance.triggerModal = false;
    dialogRef.componentInstance.linkModal = false;
    dialogRef.componentInstance.summaryModal = false;

  dialogRef.componentInstance.confirmBox.subscribe(data=>{
    if(data) {
      this.value= true;
    this.welcome= false;
    this.youtube = false;
    this.ongoingSite=false;
    this.completedSite=false;
    this.service.mainNavToSaved=0;
    setTimeout(()=>{
      this.verification.changeTab(0,siteId,userName,'clientName','departmentName',site);
    }, 1000);
    this.service.disableFields=false;
    }
    else{
      this.value= false;
    this.welcome= false;
    this.youtube = false;  
    this.ongoingSite=true;
    this.completedSite=false;
    }
  })
  // if (confirm("Are you sure you want to edit site details?"))
  // {
  //   this.value= true;
  //   this.welcome= false;
  // this.youtube = false;  
  //   this.ongoingSite=false;
  //   this.completedSite=false;
  //   this.service.mainNavToSaved=0;
  //   setTimeout(()=>{
  //     this.verification.changeTab(0,siteId,userName,'clientName','departmentName',site);
  //   }, 1000);
  //   this.service.disableFields=false;
  // } 
  // else {
  //   this.value= false;
  //   this.welcome= false;  
  // this.youtube = false;
  //   this.ongoingSite=true;
  //   this.completedSite=false;
  // }
 }

 viewSite(siteId: any,userName: any,site: any){
  this.service.allStepsCompleted=false;
  this.service.disableSubmitSummary=true;
  this.service.disableFields=true;
  this.service.allFieldsDisable = true;

  const dialogRef = this.dialog.open(ConfirmationBoxComponent, {
    width: '420px',
    maxHeight: '90vh',
    disableClose: true,
  });
  dialogRef.componentInstance.editModal = true;
    dialogRef.componentInstance.viewModal = false;
    dialogRef.componentInstance.triggerModal = false;
    dialogRef.componentInstance.linkModal = false;
    dialogRef.componentInstance.summaryModal = false;


  dialogRef.componentInstance.confirmBox.subscribe(data=>{
    if(data) {
      this.value= true;
      this.welcome= false;
      this.youtube = false;
      this.ongoingSite=false;
      this.completedSite=false;
      this.service.mainNavToSaved=0;
      setTimeout(()=>{
        this.verification.changeTab(0,siteId,userName,'clientName','departmentName',site);
      }, 1000);
      // this.service.disableFields=true;
    }
    else{
      this.value= false;
      this.welcome= false;
      this.youtube = false;   
      this.ongoingSite=false;
      this.completedSite=true;
    }
  })
  // if (confirm("Are you sure you want to view site details?"))
  // {
  //   this.value= true;
  //   this.welcome= false;
   //this.youtube = false;  
  //   this.ongoingSite=false;
  //   this.completedSite=false;
  //   this.service.mainNavToSaved=0;
  //   setTimeout(()=>{
  //     this.verification.changeTab(0,siteId,userName,'clientName','departmentName',site);
  //   }, 1000);
  //  // this.service.disableFields=true;
  // } 
  // else {
  //   this.value= false;
  //   this.welcome= false; 
  //this.youtube = false;  
  //   this.ongoingSite=false;
  //   this.completedSite=true;
  // }
  // this.welcome= false;
  //this.youtube = false;
  // this.ongoingSite=false;
  // this.completedSite=false;
  // this.viewContainerRef.clear();
  // //this.viewContainerRef1.clear();
  // const VerificationlvFactory = this.componentFactoryResolver.resolveComponentFactory(VerificationlvComponent);
  // const lvInspectionRef = this.viewContainerRef.createComponent(VerificationlvFactory);
  // //const lvInspectionRef1 = this.viewContainerRef1.createComponent(lvInspectionFactory);
  // lvInspectionRef.changeDetectorRef.detectChanges();
}

pdfModal(siteId: any,userName: any, siteName: any){
  this.disable=false;
  this.inspectionService.printPDF(siteId,userName, siteName);
}

downloadPdf(siteId: any,userName: any, siteName: any): any {
  this.disable=false;
  this.inspectionService.downloadPDF(siteId,userName, siteName);
}

emailPDF(siteId: any,userName: any, siteName: any){
  this.disable=false;
  this.inspectionService.mailPDF(siteId,userName, siteName).subscribe(
  data => {
  this.success = true;
  this.successMsg = data;
  setTimeout(()=>{
    this.success=false;
}, 3000);
  },
  error => {
    this.Error = true;
    // this.errorArr = [];
    // this.errorArr = JSON.parse(error.error);
    this.errorMsg = this.service.globalErrorMsg;
    setTimeout(()=>{
      this.Error = false;
  }, 3000);
  }
    );
}

 highlightSub2(type:any){
  this.viewContainerRef.clear();
  if(type == 'LV Systems') {
    this.welcome= false;
    this.youtube = false;
    this.selectedRowIndexSub = type;
    this.selectedRowIndexType="";
    this.ongoingSite=false;
    this.completedSite=true;
    this.value=false;
  }
  
 }
 highlightType(type:any){
  this.selectedRowIndexType = type;
  this.selectedRowIndexSub ="";
 }
 highlightTypeMeter(typeMeter:any){
  this.selectedRowIndexTypeMeter = typeMeter;
  this.selectedRowIndexSub ="";
 }
 changePassword(email: String) {
  if((this.service.lvClick==1) && (this.service.allStepsCompleted==true)){
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
        this.service.windowTabClick=0;
        this.route.navigate(['changePassword', { email: email }])
        this.service.logoutClick=0;  
        this.service.lvClick=0;  
      }
      else{
        return;
      }
    })
  //   if(confirm("Are you sure you want to proceed without saving?\r\n\r\nNote: To update the details, kindly click on next button!")){
  //     this.service.windowTabClick=0;
  //     this.route.navigate(['changePassword', { email: email }])
  //     this.service.logoutClick=0;  
  //     this.service.lvClick=0; 
  // }
  // else{
  //   return;
  // }
}
  else if((this.service.lvClick==0) || (this.service.allStepsCompleted==false)){
    this.route.navigate(['changePassword', { email: email }])
  }
}
 
profileUpdate(email: String) {
  if((this.service.lvClick==1) && (this.service.allStepsCompleted==true)){
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
        this.service.windowTabClick=0;
        this.route.navigate(['profile', { email: email }])
        this.service.logoutClick=0;
        this.service.lvClick=0; 
      }
      else{
        return;
      }
    })
  //   if(confirm("Are you sure you want to proceed without saving?\r\n\r\nNote: To update the details, kindly click on next button!")){
  //     this.service.windowTabClick=0;
  //     this.route.navigate(['profile', { email: email }])
  //     this.service.logoutClick=0;
  //     this.service.lvClick=0; 
  // }
  // else{
  //   return;
  // }
}
  else if((this.service.lvClick==0) || (this.service.allStepsCompleted==false)){
    this.route.navigate(['profile', { email: email }])
  }
}
 
  openModal() {
    const modalRef = this.modalService.open(AddApplicationTypesComponent);
    modalRef.componentInstance.email = this.email;
    modalRef.result.then((result) => {
      if (result) {
        this.applicationTypes.push(result);
      }
    });
  }

  LVHome(){
     this.welcome = false;
     this.youtube = false;
        this.viewContainerRef.clear();
        const lvInspectionFactory = this.componentFactoryResolver.resolveComponentFactory(LvInspectionDetailsComponent);
        const lvInspectionRef = this.viewContainerRef.createComponent(lvInspectionFactory);
        lvInspectionRef.changeDetectorRef.detectChanges();
  }
  LPSHome(){
    this.welcome = false;
    this.youtube = false;
    this.viewContainerRef.clear();
    const LpsInspectionFactory = this.componentFactoryResolver.resolveComponentFactory(LpsWelcomePageComponent);
    const LpsInspectionRef = this.viewContainerRef.createComponent(LpsInspectionFactory);
    LpsInspectionRef.changeDetectorRef.detectChanges();
  }
  EMCHome(){
    this.welcome = false;
    this.youtube = false;
    this.viewContainerRef.clear();
    const emcAssessmentInspectionFactory = this.componentFactoryResolver.resolveComponentFactory(EmcAssessmentInstallationComponent);
    const emcAssessmentInspectionRef = this.viewContainerRef.createComponent(emcAssessmentInspectionFactory);
    emcAssessmentInspectionRef.changeDetectorRef.detectChanges();
  }
  showLinkDescription(id: any) {
    this.welcome = false;
    this.youtube = false;
    if ((this.service.lvClick == 1) && (this.service.allStepsCompleted == true)) {
      const dialogRef = this.dialog.open(ConfirmationBoxComponent, {
        width: '420px',
        maxHeight: '90vh',
        disableClose: true,
      });
      dialogRef.componentInstance.editModal = false;
      dialogRef.componentInstance.viewModal = false;
      dialogRef.componentInstance.triggerModal = false;
      dialogRef.componentInstance.linkModal = true;
      dialogRef.componentInstance.summaryModal = false;
      if(this.service.sldClick == 1) {
        dialogRef.componentInstance.sldModal = true;
        dialogRef.componentInstance.linkModal = false;
      }

      dialogRef.componentInstance.confirmBox.subscribe(data => {
        if (data) {
          this.service.lvClick = 0;
          this.service.sldClick = 0;
          switch (id) {
            case 'LV Systems':
              this.viewContainerRef.clear();
              const lvInspectionFactory = this.componentFactoryResolver.resolveComponentFactory(LvInspectionDetailsComponent);
              const lvInspectionRef = this.viewContainerRef.createComponent(lvInspectionFactory);
              lvInspectionRef.changeDetectorRef.detectChanges();
              break;
            case 'HV Systems':
              this.viewContainerRef.clear();
              break;
            case 'Risk Assessment':
              this.viewContainerRef.clear();
              const riskAssessmentInspectionFactory = this.componentFactoryResolver.resolveComponentFactory(RiskAssessmentInspectionMaintenanceComponent);
              const riskAssessmentInspectionRef = this.viewContainerRef.createComponent(riskAssessmentInspectionFactory);
              riskAssessmentInspectionRef.changeDetectorRef.detectChanges();
              break;
            case 'EMC Assessment':
              this.viewContainerRef.clear();
              const emcAssessmentInspectionFactory = this.componentFactoryResolver.resolveComponentFactory(EmcAssessmentInstallationComponent);
              const emcAssessmentInspectionRef = this.viewContainerRef.createComponent(emcAssessmentInspectionFactory);
              emcAssessmentInspectionRef.changeDetectorRef.detectChanges();
              break;
            case 'LPS Systems':
              this.viewContainerRef.clear();
              const LpsInspectionFactory = this.componentFactoryResolver.resolveComponentFactory(LpsWelcomePageComponent);
              const LpsInspectionRef = this.viewContainerRef.createComponent(LpsInspectionFactory);
              LpsInspectionRef.changeDetectorRef.detectChanges();
              break;
            case 'SLD Diagram':
              this.viewContainerRef.clear();
              const SLDDiagramFactory = this.componentFactoryResolver.resolveComponentFactory(DiagramWelcomePageComponent);
              const SLDDiagramRef = this.viewContainerRef.createComponent(SLDDiagramFactory);
              SLDDiagramRef.changeDetectorRef.detectChanges();
              break;  
              case 'Buy Meter':
                this.viewContainerRef.clear();
                const butMeterFactory = this.componentFactoryResolver.resolveComponentFactory(BuyMeterComponent);
                const buyMeterRef = this.viewContainerRef.createComponent(butMeterFactory);
                buyMeterRef.changeDetectorRef.detectChanges();
                break;
            case 6:
              this.viewContainerRef.clear();
              break;
          }
        }
        else {
          return;
        }
      })
      // if(confirm("Are you sure you want to proceed without saving?\r\n\r\nNote: To save the details, kindly fill all fields & click on next button!")){
      //   this.service.lvClick=0;
      //   switch (id) {
      //     case 'LV Systems':
      //       this.viewContainerRef.clear();
      //       const lvInspectionFactory = this.componentFactoryResolver.resolveComponentFactory(LvInspectionDetailsComponent);
      //       const lvInspectionRef = this.viewContainerRef.createComponent(lvInspectionFactory);
      //       lvInspectionRef.changeDetectorRef.detectChanges();
      //       break;
      //     case 'HV Systems':
      //       this.viewContainerRef.clear();
      //       break;
      //     case 'Risk Assessment':
      //       this.viewContainerRef.clear();
      //       const riskAssessmentInspectionFactory = this.componentFactoryResolver.resolveComponentFactory(RiskAssessmentInspectionMaintenanceComponent);
      //       const riskAssessmentInspectionRef = this.viewContainerRef.createComponent(riskAssessmentInspectionFactory);
      //       riskAssessmentInspectionRef.changeDetectorRef.detectChanges();
      //       break;
      //     case 'EMC Assessment':
      //       this.viewContainerRef.clear();
      //       const emcAssessmentInspectionFactory = this.componentFactoryResolver.resolveComponentFactory(EmcAssessmentInstallationComponent);
      //       const emcAssessmentInspectionRef = this.viewContainerRef.createComponent(emcAssessmentInspectionFactory);
      //       emcAssessmentInspectionRef.changeDetectorRef.detectChanges();
      //       break;
      //     case 'LPS Systems':
      //       this.viewContainerRef.clear();
      //       const LpsInspectionFactory = this.componentFactoryResolver.resolveComponentFactory(LpsWelcomePageComponent);
      //       const LpsInspectionRef = this.viewContainerRef.createComponent(LpsInspectionFactory);
      //       LpsInspectionRef.changeDetectorRef.detectChanges();
      //       break;
      //     case 6:
      //       this.viewContainerRef.clear();
      //       break;
      //   }
      // }
      // else{
      //   return;
      // }
    }
    else if ((this.service.lvClick == 0) || (this.service.allStepsCompleted == false)) {
      switch (id) {
        case 'LV Systems':
          this.viewContainerRef.clear();
          const lvInspectionFactory = this.componentFactoryResolver.resolveComponentFactory(LvInspectionDetailsComponent);
          const lvInspectionRef = this.viewContainerRef.createComponent(lvInspectionFactory);
          lvInspectionRef.changeDetectorRef.detectChanges();
          break;
        case 'HV Systems':
          this.viewContainerRef.clear();
          break;
        case 'Risk Assessment':
          this.viewContainerRef.clear();
          const riskAssessmentInspectionFactory = this.componentFactoryResolver.resolveComponentFactory(RiskAssessmentInspectionMaintenanceComponent);
          const riskAssessmentInspectionRef = this.viewContainerRef.createComponent(riskAssessmentInspectionFactory);
          riskAssessmentInspectionRef.changeDetectorRef.detectChanges();
          break;
        case 'EMC Assessment':
          this.viewContainerRef.clear();
          const emcAssessmentInspectionFactory = this.componentFactoryResolver.resolveComponentFactory(EmcAssessmentInstallationComponent);
          const emcAssessmentInspectionRef = this.viewContainerRef.createComponent(emcAssessmentInspectionFactory);
          emcAssessmentInspectionRef.changeDetectorRef.detectChanges();
          break;
        case 'LPS Systems':
          this.service.allStepsCompleted = true;
          this.viewContainerRef.clear();
          const LpsInspectionFactory = this.componentFactoryResolver.resolveComponentFactory(LpsWelcomePageComponent);
          const LpsInspectionRef = this.viewContainerRef.createComponent(LpsInspectionFactory);
          LpsInspectionRef.changeDetectorRef.detectChanges();
          break;

        case 'SLD Diagram':
          this.viewContainerRef.clear();
          const SLDDiagramFactory = this.componentFactoryResolver.resolveComponentFactory(DiagramWelcomePageComponent);
          const SLDDiagramRef = this.viewContainerRef.createComponent(SLDDiagramFactory);
          SLDDiagramRef.changeDetectorRef.detectChanges();
          break;  
          case 'Buy Meter':
            this.viewContainerRef.clear();
            const butMeterFactory = this.componentFactoryResolver.resolveComponentFactory(BuyMeterComponent);
            const buyMeterRef = this.viewContainerRef.createComponent(butMeterFactory);
            buyMeterRef.changeDetectorRef.detectChanges();
            break;
        case 6:
          this.viewContainerRef.clear();
          break;
      }
    }

  }

  editApplicationType(id: any, type: String, code: String) {
    const modalRef = this.modalService.open(UpdateApplicationTypesComponent);
    modalRef.componentInstance.email = this.email;
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.type = type;
    modalRef.componentInstance.code = code;
    modalRef.result.then((result) => {
      if (result) {
        this.retrieveApplicationTypes();
      }
    });
  }

  deleteApplicationType(id: any) {
    if (window.confirm('Are sure you want to delete this item ?')) {
      this.applicationService.deleteApplicationType(id).subscribe(
        response => {
          this.retrieveApplicationTypes();
        }
      );
    }
  }
  increase() {
    this.sidenavWidth = 20;
  }
  decrease() {
    this.sidenavWidth = 4;
  }
  toggleNav() {
    this.mobileDisplay = true;
    this.desktopDisplay = false
    this.sidenav.toggle.openClose();
    this.isShowing = false;
    this.isExpanded = false;
  }

  displayIconsBasedOnEmail(): boolean {
    return !this.email.includes("@capeindia.net")
  }
}
