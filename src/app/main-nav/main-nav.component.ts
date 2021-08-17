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

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit, OnDestroy {
  sidenavWidth: any;
  isExpanded: boolean = false;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  showingh = false;
  autosize: boolean = true;
  screenWidth: number | undefined;
  activeTab = 0;
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
  id: number = 0;
  type: String = '';
  code: String = '';
  user = new User();
  style: any;

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
  //isExpanded: any;
  selectedRowIndex = 0;




  constructor(private breakpointObserver: BreakpointObserver, changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private loginservice: LoginserviceService,
    private router: ActivatedRoute,
    private route: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationService: ApplicationTypeService,
    private modalService: NgbModal, private bnIdle: BnNgIdleService) {
    this.email = this.router.snapshot.paramMap.get('email') || '{}';
    this.retrieveApplicationTypes();
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
    this.bnIdle.startWatching(60).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        alert('Your session is timed out')
        this.logout();
        this.bnIdle.stopTimer();
      }
    });
    
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
    this.selectedRowIndex = type.id;
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
      case 1:
        this.viewContainerRef.clear();
        //this.viewContainerRef1.clear();
        const lvInspectionFactory = this.componentFactoryResolver.resolveComponentFactory(LvInspectionDetailsComponent);
        const lvInspectionRef = this.viewContainerRef.createComponent(lvInspectionFactory);
        //const lvInspectionRef1 = this.viewContainerRef1.createComponent(lvInspectionFactory);
        lvInspectionRef.changeDetectorRef.detectChanges();
        //lvInspectionRef1.changeDetectorRef.detectChanges();
        break;
      case 2:
        this.viewContainerRef.clear();
        //this.viewContainerRef1.clear();
        break;
      case 3:
        this.viewContainerRef.clear();
        //this.viewContainerRef1.clear();
        const riskAssessmentInspectionFactory = this.componentFactoryResolver.resolveComponentFactory(RiskAssessmentInspectionMaintenanceComponent);
        const riskAssessmentInspectionRef = this.viewContainerRef.createComponent(riskAssessmentInspectionFactory);
        riskAssessmentInspectionRef.changeDetectorRef.detectChanges();
        break;
      case 4:
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
