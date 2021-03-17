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

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  @ViewChild('ref', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef; 
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    selectedOptions = [{name: 'Verification Of LV Systems (IEC 60364-6)', id:1}];
    applicationTypes: {name: string, id: number }[] = [
      {name: 'Verification Of LV Systems (IEC 60364-6)', id: 1}, 
      {name: 'Verification of HV system (up to 33 kV) (IEC 61936-1)', id: 2},
      {name: 'Lightning protection conformity assessment, risk assessment, inspection and maintenance (IEC 62305-3 & 4)', id: 3 },
      {name: 'EMC assessment of an installation (IEC 61000-5-1)', id: 4},
      {name: 'Failure analysis of electronic systems', id:5},
      {name: 'Conformity and project analysis', id:6}
    ];
  email: String = '';
  constructor(private breakpointObserver: BreakpointObserver,
    private loginservice: LoginserviceService,
    private router: ActivatedRoute,
    private route: Router,
    private componentFactoryResolver: ComponentFactoryResolver) {
    this.email = this.router.snapshot.paramMap.get('email') || '{}'
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
