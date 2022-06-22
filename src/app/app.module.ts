import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { GlobalsService } from './globals.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import { HeaderComponent } from './header/header.component';
import { BasicAuthHtppInterceptorService } from './services/basic-auth-interceptor.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent } from './profile/profile.component';
import { LvInspectionDetailsComponent } from './lv-inspection-details/lv-inspection-details.component';
import { MaterialModule } from './material/material.module';
import { RiskAssessmentInspectionMaintenanceComponent } from './risk-assessment-inspection-maintenance/risk-assessment-inspection-maintenance.component';
import { EmcAssessmentInstallationComponent } from './emc-assessment-installation/emc-assessment-installation.component';
import { AddApplicationTypesComponent } from './add-application-types/add-application-types.component';
import { UpdateApplicationTypesComponent } from './update-application-types/update-application-types.component';
import { NgxPrintModule } from 'ngx-print';
import { VerificationlvComponent } from './verificationlv/verificationlv.component';
import { DepartmentaddComponent } from './department/departmentadd/departmentadd.component';
import { SiteaddComponent } from './site/siteadd/siteadd.component';
import { ClientaddComponent } from './Company/client/clientadd/clientadd.component';
import { ClientupdateComponent } from './Company/client/clientupdate/clientupdate/clientupdate.component';
import { DepartmentupdateComponent } from './department/departmentupdate/departmentupdate/departmentupdate.component';
import { SiteupdateComponent } from './site/siteupdate/siteupdate.component';
import { SummaryComponent } from './summary/summary.component';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { InspectionVerificationBasicInformationComponent } from './inspection-verification-basic-information/inspection-verification-basic-information.component';
import { InspectionVerificationIncomingEquipmentComponent } from './inspection-verification-incoming-equipment/inspection-verification-incoming-equipment.component';
import { InspectionVerificationSupplyCharacteristicsComponent } from './inspection-verification-supply-characteristics/inspection-verification-supply-characteristics.component';
import {  InspectionVerificationTestingComponent} from './inspection-verification-testing/inspection-verification-testing.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SavedreportsComponent } from './savedreports/savedreports.component';
import { FinalreportsComponent } from './finalreports/finalreports.component';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { BnNgIdleService } from 'bn-ng-idle';
//import { Ng9PasswordStrengthBarModule } from 'ng9-password-strength-bar/projects/ng9-password-strength-bar/src/public-api';
import { InspectorRegistrationComponent } from './inspector-registration/inspector-registration.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {MatTooltipModule} from '@angular/material/tooltip';
import { UserUpdateComponent } from './user-update/user-update.component';
import { InspectorUpdatePasswordComponent } from './inspector-update-password/inspector-update-password.component';
import { AngularWebStorageModule } from 'angular-web-storage';
import { NgOtpInputModule } from 'ng-otp-input';
import { SingInPageComponent } from './signin-page/signin-page.component';

import { GenerateOtpComponent } from './generate-otp/generate-otp.component';
import { LicenselistComponent } from './licenselist/licenselist.component';
import { AddlicenseComponent } from './addlicense/addlicense.component';
import { AssignViewerComponent } from './assign-viewer/assign-viewer.component';
import { ViewerRegisterComponent } from './viewer-register/viewer-register.component';
import { DatePipe } from '@angular/common';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import {MatBadgeModule} from '@angular/material/badge';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { TruncateModule } from 'ng2-truncate';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { GenerateOtpContactnumberComponent } from './generate-otp-contactnumber/generate-otp-contactnumber.component';
import { ChangeContactnumberComponent } from './change-contactnumber/change-contactnumber.component';
import { EmcFacilityDataComponent } from './EMC/emc-facility-data/emc-facility-data.component';
import { PowerAndEarthingDataComponent } from './EMC/emc-power-and-earthing-data/power-and-earthing-data.component';
import { EmcElectromagneticCompatibilityDataComponent } from './EMC/emc-electromagnetic-compatibility-data/emc-electromagnetic-compatibility-data.component';
import { EmcMatstepperComponent } from './EMC/emc-matstepper/emc-matstepper.component';
import { EmcSavedReportComponent } from './EMC/emc-saved-report/emc-saved-report.component';
import { EmcFinalReportComponent } from './EMC/emc-final-report/emc-final-report.component';
import { EmcClientDetailsComponent } from './EMC/emc-client-details/emc-client-details.component';
import { LpsEarthingComponent } from './LPS/lps-earthing/lps-earthing.component';
import { LpsSpdComponent } from './LPS/lps-spd/lps-spd.component';
import { LpsSeperationDistanceComponent } from './LPS/lps-seperation-distance/lps-seperation-distance.component';
import { LpsEarthing } from './LPS_services/lps-earthing';
import { LpsMatstepperComponent } from './LPS/lps-matstepper/lps-matstepper.component';
import { LpsAirTerminationComponent } from './LPS/lps-air-termination/lps-air-termination.component';
import { LpsBasicPageComponent } from './LPS/lps-basic-page/lps-basic-page.component';
import { LpsDownConductorsComponent } from './LPS/lps-down-conductors/lps-down-conductors.component';
import { LpsEarthStudComponent } from './LPS/lps-earth-stud/lps-earth-stud.component';
import { LpsSavedReportComponent } from './LPS/lps-saved-report/lps-saved-report.component';
import { LpsWelcomePageComponent } from './LPS/lps-welcome-page/lps-welcome-page.component';
import { LpsFinalReportComponent } from './LPS/lps-final-report/lps-final-report.component';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
//import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { ConfirmationBoxComponent } from './confirmation-box/confirmation-box.component';
import { LpssummaryComponent } from './LPS/lpssummary/lpssummary.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { SignatureComponent } from './signature/signature.component';
import { RiskParentComponentComponent } from './Risk Assessment/Risk Assessment/risk-parent-component/risk-parent-component.component';
import { RiskCustomerDetailsComponent } from './Risk Assessment/Risk Assessment/risk-customer-details/risk-customer-details.component';
import { RiskSavedReportsComponent } from './Risk Assessment/Risk Assessment/risk-saved-reports/risk-saved-reports.component';
import { RiskFinalReportsComponent } from './Risk Assessment/Risk Assessment/risk-final-reports/risk-final-reports.component';
import { RiskAssessmentDetailsComponent } from './Risk Assessment/Risk Assessment/risk-assessment-details/risk-assessment-details.component'

import { DiagramAllModule, SymbolPaletteAllModule, OverviewAllModule } from '@syncfusion/ej2-angular-diagrams';
import { DiagramListComponent } from './SLD/SLD components/diagram-list/diagram-list.component';
import { DiagramHomeComponent } from './SLD/SLD components/diagram-home/diagram-home.component';
import { DiagramWelcomePageComponent } from './SLD/SLD components/diagram-welcome-page/diagram-welcome-page.component';
import { NewFileComponent } from './new-file/new-file.component';
import { MCBComponent } from './SLD/SLD components/Node Components/mcb/mcb.component';
import { MCCBComponent } from './SLD/SLD components/Node Components/mccb/mccb.component';
import { RCBOComponent } from './SLD/SLD components/Node Components/rcbo/rcbo.component';
import { LightComponent } from './SLD/SLD components/Node Components/light/light.component';
import { LTMotorComponent } from './SLD/SLD components/Node Components/ltmotor/ltmotor.component';
//import { FanComponent } from './SLD/SLD components/Node Components/fan/fan.component';
@NgModule({
  declarations: [
    AppComponent,
    SignatureComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ForgotpasswordComponent,
    UpdatepasswordComponent,
    MainNavComponent,
    HeaderComponent,
    ChangePasswordComponent,
    ConfirmationBoxComponent,
    ProfileComponent,
    LvInspectionDetailsComponent,
    RiskAssessmentInspectionMaintenanceComponent,
    EmcAssessmentInstallationComponent,
    AddApplicationTypesComponent,
    UpdateApplicationTypesComponent,
    VerificationlvComponent,
    DepartmentaddComponent,
    SiteaddComponent,
    ClientaddComponent,
    ClientupdateComponent,
    DepartmentupdateComponent,
    SiteupdateComponent,
    SummaryComponent,
    InspectionVerificationBasicInformationComponent,
    InspectionVerificationIncomingEquipmentComponent,
    InspectionVerificationSupplyCharacteristicsComponent,
    InspectionVerificationTestingComponent,
    SavedreportsComponent,
    FinalreportsComponent,
    InspectorRegistrationComponent,
    UserUpdateComponent,
    InspectorUpdatePasswordComponent,
    SingInPageComponent,
    GenerateOtpComponent,
    LicenselistComponent,
    AddlicenseComponent,
    AssignViewerComponent,
    ViewerRegisterComponent,
    DateAgoPipe,
    GenerateOtpContactnumberComponent,
    ChangeContactnumberComponent,
    EmcFacilityDataComponent,
    PowerAndEarthingDataComponent,
    EmcElectromagneticCompatibilityDataComponent,
    EmcMatstepperComponent,
    EmcSavedReportComponent,
    EmcFinalReportComponent,
    EmcClientDetailsComponent,
    SignatureComponent,
    
    LpsSpdComponent,
    LpsSeperationDistanceComponent,
    LpsMatstepperComponent,
    LpsEarthingComponent,
    LpsAirTerminationComponent,
    LpsBasicPageComponent,
    LpsDownConductorsComponent,
    LpsEarthStudComponent,
    LpsSavedReportComponent,
    LpsWelcomePageComponent, 

    LpsFinalReportComponent, SignatureComponent, DiagramListComponent, DiagramHomeComponent, DiagramWelcomePageComponent, NewFileComponent, LpssummaryComponent, MCBComponent, MCCBComponent, RCBOComponent, LightComponent, LTMotorComponent, RiskParentComponentComponent, RiskCustomerDetailsComponent, RiskSavedReportsComponent, RiskFinalReportsComponent, RiskAssessmentDetailsComponent,  
    //FanComponent,
  ],
  imports: [
    SignaturePadModule,
    TruncateModule,
    NgbTooltipModule,
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MaterialModule,
    NgxPrintModule,
    AngularWebStorageModule,
   // SessionStorageModule,
    Ng2TelInputModule,
    NgxBootstrapIconsModule.pick(allIcons),
    NgMultiSelectDropDownModule.forRoot(),
    ScrollToModule.forRoot(),
    NgOtpInputModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    DiagramAllModule,
    SymbolPaletteAllModule,
    OverviewAllModule,
    BackButtonDisableModule.forRoot({
      preserveScrollPosition: true
    }),
    
    //LoggerModule.forRoot({ level: NgxLoggerLevel.DEBUG }),
    //NgbActiveModal, NgbModal 
  ],
 // exports: [WebStorageCodec, WebStorageCodec, SessionStorage],
  providers: [GlobalsService, { provide: HTTP_INTERCEPTORS, useClass: BasicAuthHtppInterceptorService, multi: true }, BnNgIdleService,DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [ AddApplicationTypesComponent, UpdateApplicationTypesComponent, VerificationlvComponent, LpsMatstepperComponent ]
})
export class AppModule { }