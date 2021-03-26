import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
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

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  @ViewChild('ref', { read: ViewContainerRef })
  viewContainerRef!: ViewContainerRef;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  applicationTypes: ApplicationType[] = [];

  email: String = '';
  id: number = 0;
  type: String = '';
  constructor(private breakpointObserver: BreakpointObserver,
    private loginservice: LoginserviceService,
    private router: ActivatedRoute,
    private route: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationService: ApplicationTypeService,
    private modalService: NgbModal) {
    this.email = this.router.snapshot.paramMap.get('email') || '{}';
    this.retrieveApplicationTypes();
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
    switch (id) {
      case 1:
        this.viewContainerRef.clear();
        const lvInspectionFactory = this.componentFactoryResolver.resolveComponentFactory(LvInspectionDetailsComponent);
        const lvInspectionRef = this.viewContainerRef.createComponent(lvInspectionFactory);
        lvInspectionRef.changeDetectorRef.detectChanges();
        break;
      case 2:
        this.viewContainerRef.clear();
        break;
      case 3:
        this.viewContainerRef.clear();
        const riskAssessmentInspectionFactory = this.componentFactoryResolver.resolveComponentFactory(RiskAssessmentInspectionMaintenanceComponent);
        const riskAssessmentInspectionRef = this.viewContainerRef.createComponent(riskAssessmentInspectionFactory);
        riskAssessmentInspectionRef.changeDetectorRef.detectChanges();
        break;
      case 4:
        this.viewContainerRef.clear();
        const emcAssessmentInspectionFactory = this.componentFactoryResolver.resolveComponentFactory(EmcAssessmentInstallationComponent);
        const emcAssessmentInspectionRef = this.viewContainerRef.createComponent(emcAssessmentInspectionFactory);
        emcAssessmentInspectionRef.changeDetectorRef.detectChanges();
        break;
      case 5:
        this.viewContainerRef.clear();
        break;
      case 6:
        this.viewContainerRef.clear();
        break;
    }
  }

  editApplicationType(id: any, type: String) {
    const modalRef = this.modalService.open(UpdateApplicationTypesComponent);
    modalRef.componentInstance.email = this.email;
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.type = type;
    modalRef.result.then((result) => {
      if (result) {
        this.retrieveApplicationTypes();
       }
    });
  }

  deleteApplicationType(id: any) {
    this.applicationService.deleteApplicationType(id).subscribe (
      response => {
        console.log(response);
        this.retrieveApplicationTypes();
      }
    );
  }
}
