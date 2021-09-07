import { Component, EventEmitter, Input, Output, ViewChild, ViewContainerRef, OnInit } from '@angular/core';
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
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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
  {siteCd: 'CODE', site: 'Arun', country: 'India', city: 'chennai', createdDate: '1/1/2021', createdBy: 'Arun K', updatedDate: '1/1/2021', updatedBy: 'Arun K'},
  {siteCd: 'CODE1', site: 'Arun1', country: 'India', city: 'chennai', createdDate: '2/1/2021', createdBy: 'Arun Kumar', updatedDate: '1/1/2021', updatedBy: 'Arun Kumar'},
  {siteCd: 'CODE2', site: 'Arun2', country: 'India', city: 'chennai', createdDate: '3/1/2021', createdBy: 'Arun K', updatedDate: '1/1/2021', updatedBy: 'Arun K'},
  {siteCd: 'CODE3', site: 'Arun3', country: 'India', city: 'chennai', createdDate: '4/1/2021', createdBy: 'Arun', updatedDate: '1/1/2021', updatedBy: 'Arun'},
  {siteCd: 'CODE4', site: 'Arun4', country: 'India', city: 'chennai', createdDate: '5/1/2021', createdBy: 'AK', updatedDate: '1/1/2021', updatedBy: 'AK'},
  {siteCd: 'CODE5', site: 'Arun5', country: 'India', city: 'chennai', createdDate: '6/1/2021', createdBy: 'Arun', updatedDate: '1/1/2021', updatedBy: 'Arun'},
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
    'action',
  ];
  // ongoingSite_dataSource!: MatTableDataSource<Site[]>;
  ongoingSite_dataSource = ELEMENT_DATA;
  @ViewChild('ongoingSitePaginator', { static: true }) ongoingSitePaginator!: MatPaginator;
  @ViewChild('ongoingSiteSort', { static: true }) ongoingSiteSort!: MatSort;

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

  
  // completedLicense_dataSource!: MatTableDataSource<Site[]>;
  completedLicense_dataSource = ELEMENT_DATA;
  @ViewChild('completedLicensePaginator', { static: true }) completedLicensePaginator!: MatPaginator;
  @ViewChild('completedLicenseSort', { static: true }) completedLicenseSort!: MatSort;


  sidenavWidth: any;
  isExpanded: boolean = false;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  showSubmenuRep: boolean = false;
  showingh = false;
  autosize: boolean = true;
  screenWidth: number | undefined;
  activeTab = 0;
  ongoingSite: boolean = false;
  completedSite: boolean = false;
  public isCollapsed = false;
  // imageSrc = 'assets/img/lowVoltage.jpg';

  @ViewChild('ref', { read: ViewContainerRef })
  viewContainerRef!: ViewContainerRef;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    // @ViewChild('ref1', { read: ViewContainerRef })
    // viewContainerRef1!: ViewContainerRef;
    // isHandset1$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    //   .pipe(
    //     map(result => result.matches),
    //     shareReplay()
    //   );

  applicationTypes: ApplicationType[] = [];
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  fullName: String = '';
  email: String = '';
  userName: String = '';

  id: number = 0;
  type: String = '';
  code: String = '';
  user = new User();
  style: any;

  itemValue1: String = 'IN';
  itemValue2: String = 'TIC';
  itemValue3: String = 'RM';
  itemValue4: String = 'BM';
  itemValue5: String = 'REP';
  SubitemValue1: String = 'Ongoing TIC';
  SubitemValue2: String = 'Completed TIC';
  // stackblitz
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  sidenav: any;
  width: any;
  snav: any;
  mobileDisplay: boolean = false;
  desktopDisplay: boolean = false;
  welcome: boolean = true;
  //isExpanded: any;
  selectedRowIndex : String = '';
  selectedRowIndexSub: String = '';
  selectedRowIndexType: String = '';
  applicationTypesbasedonuser: string="";
  ApplicationTypesSplit: any=[];
  showTIC: boolean = false;
  showREP: boolean = false;

  mainApplications: any =   [{'name': 'Introduction', 'code': 'IN'},
                            {'name': 'TIC', 'code': 'TIC'},
                            {'name': 'RENT Meter', 'code': 'RM'},
                            {'name': 'Buy Meter', 'code': 'BM'},
                            {'name': 'Reports', 'code': 'REP'},
                            ]
  currentUser: any=[];



  constructor(private breakpointObserver: BreakpointObserver, changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private loginservice: LoginserviceService,
    private router: ActivatedRoute,
    private route: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationService: ApplicationTypeService,
    private modalService: NgbModal, private bnIdle: BnNgIdleService) {
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
    this.mobileDisplay = false;
    this.desktopDisplay = true;
    this.bnIdle.startWatching(environment.sessionTimeOut).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        alert('Your session is timed out')
        this.logout();
        this.bnIdle.stopTimer();
      }
    });
    this.currentUser=sessionStorage.getItem('authenticatedUser');
    let currentUser1=JSON.parse(this.currentUser);
    if(currentUser1.role == 'Inspector') {
      this.showTIC = true;
      this.showREP = false;
    }
    else {
      this.showTIC = false;
      this.showREP = true;
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
        this.ApplicationTypesSplit=this.applicationTypesbasedonuser.split(',')
      }
    );
  }


  logout() {
    this.loginservice.logout();
    this.route.navigate(['login']);
  }

  displayUserFullName(email: String) {
    this.loginservice.retrieveUserInformation(email).subscribe(
      data => {
        this.user = JSON.parse(data);
        this.fullName = this.user.firstname + " " + this.user.lastname;

      }
    )
  }
  highlight(type:any){
    this.selectedRowIndex = type;
    this.selectedRowIndexType="";
    this.selectedRowIndexSub ="";
 }
 highlightSub(type:any){
  this.welcome= false;
  this.selectedRowIndexSub = type;
  this.selectedRowIndexType="";
  this.ongoingSite=true;
  this.completedSite=false;
 }
 highlightSub2(type:any){
  this.welcome= false;
  this.selectedRowIndexSub = type;
  this.selectedRowIndexType="";
  this.ongoingSite=false;
  this.completedSite=true;
 }
 highlightType(type:any){
  this.selectedRowIndexType = type;
  this.selectedRowIndexSub ="";
 }
  changePassword(email: String) {
    this.route.navigate(['changePassword', { email: email }])
  }

  profileUpdate(email: String) {
    this.route.navigate(['profile', { email: email }])
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
  showLinkDescription(id: any) {
    this.welcome= false;
    switch (id) {
      case 'LV Systems':
        this.viewContainerRef.clear();
        //this.viewContainerRef1.clear();
        const lvInspectionFactory = this.componentFactoryResolver.resolveComponentFactory(LvInspectionDetailsComponent);
        const lvInspectionRef = this.viewContainerRef.createComponent(lvInspectionFactory);
        //const lvInspectionRef1 = this.viewContainerRef1.createComponent(lvInspectionFactory);
        lvInspectionRef.changeDetectorRef.detectChanges();
        //lvInspectionRef1.changeDetectorRef.detectChanges();
        break;
      case 'HV Systems':
        this.viewContainerRef.clear();
        //this.viewContainerRef1.clear();
        break;
      case 'Risk Assessment':
        this.viewContainerRef.clear();
        //this.viewContainerRef1.clear();
        const riskAssessmentInspectionFactory = this.componentFactoryResolver.resolveComponentFactory(RiskAssessmentInspectionMaintenanceComponent);
        const riskAssessmentInspectionRef = this.viewContainerRef.createComponent(riskAssessmentInspectionFactory);
        riskAssessmentInspectionRef.changeDetectorRef.detectChanges();
        break;
      case 'EMC Assessment':
        this.viewContainerRef.clear();
        //this.viewContainerRef1.clear();
        const emcAssessmentInspectionFactory = this.componentFactoryResolver.resolveComponentFactory(EmcAssessmentInstallationComponent);
        const emcAssessmentInspectionRef = this.viewContainerRef.createComponent(emcAssessmentInspectionFactory);
        emcAssessmentInspectionRef.changeDetectorRef.detectChanges();
        break;
      case 5:
        this.viewContainerRef.clear();
        //this.viewContainerRef1.clear();
        break;
      case 6:
        this.viewContainerRef.clear();
        //this.viewContainerRef1.clear();
        break;
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

  displayIconsBasedOnEmail(): boolean{
    return !this.email.includes("@capeindia.net")
  }
}
