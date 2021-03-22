import { Component, ViewChild, ViewContainerRef } from '@angular/core';
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
  constructor(private breakpointObserver: BreakpointObserver,
    private loginservice: LoginserviceService,
    private router: ActivatedRoute,
    private route: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private mainNavService: MainNavService,
    private dialog: MatDialog) {
    this.email = this.router.snapshot.paramMap.get('email') || '{}';

    this.mainNavService.retrieveApplicationTypes().subscribe(
      data=> {
        this.applicationTypes = data;
      }
    )
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

  addApplicationTypes(){
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "25%";
    dialogConfig.height = "50%";
    this.dialog.open(AddApplicationTypesComponent, dialogConfig)
  
}
  showLinkDescription(id: any) {
    switch(id){
      case 1 :
        this.viewContainerRef.clear();
        const lvInspectionFactory = this.componentFactoryResolver.resolveComponentFactory(LvInspectionDetailsComponent);
        const lvInspectionRef = this.viewContainerRef.createComponent(lvInspectionFactory);
        lvInspectionRef.changeDetectorRef.detectChanges();
        break;
      case 2 :
        this.viewContainerRef.clear();
        break;
      case 3 :
        this.viewContainerRef.clear();
        const riskAssessmentInspectionFactory = this.componentFactoryResolver.resolveComponentFactory(RiskAssessmentInspectionMaintenanceComponent);
        const riskAssessmentInspectionRef = this.viewContainerRef.createComponent(riskAssessmentInspectionFactory);
        riskAssessmentInspectionRef.changeDetectorRef.detectChanges();
        break;
      case 4 :
        this.viewContainerRef.clear();
        const emcAssessmentInspectionFactory = this.componentFactoryResolver.resolveComponentFactory(EmcAssessmentInstallationComponent);
        const emcAssessmentInspectionRef = this.viewContainerRef.createComponent(emcAssessmentInspectionFactory);
        emcAssessmentInspectionRef.changeDetectorRef.detectChanges();
        break;
      case 5 :
        this.viewContainerRef.clear();
        break;
      case 6 :
        this.viewContainerRef.clear();
        break;
    }
  }
}
