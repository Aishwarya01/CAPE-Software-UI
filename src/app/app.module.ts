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

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SavedreportsComponent } from './savedreports/savedreports.component';
import { FinalreportsComponent } from './finalreports/finalreports.component';
import { AdminLoginComponent } from './admin-login/admin-login.component'
import { AdminRegisterComponent }  from './admin-register/admin-register.component'

import {Ng2TelInputModule} from 'ng2-tel-input';
import { InspectorRegistrationComponent } from './inspector-registration/inspector-registration.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { AdminHomeComponent } from './admin-home/admin-home.component';
import { UserUpdateComponent } from './user-update/user-update.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ForgotpasswordComponent,
    UpdatepasswordComponent,
    MainNavComponent,
    HeaderComponent,
    ChangePasswordComponent,
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
    SavedreportsComponent,
    FinalreportsComponent,
    InspectorRegistrationComponent,
    AdminLoginComponent,
    AdminRegisterComponent,
    AdminHomeComponent,
    UserUpdateComponent
  ],
  imports: [
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
    Ng2TelInputModule,
    NgxBootstrapIconsModule.pick(allIcons),
    NgMultiSelectDropDownModule.forRoot()

  ],
  providers: [GlobalsService, { provide: HTTP_INTERCEPTORS, useClass: BasicAuthHtppInterceptorService, multi: true }],
  bootstrap: [AppComponent],
  entryComponents: [ AddApplicationTypesComponent, UpdateApplicationTypesComponent, VerificationlvComponent ]
})
export class AppModule { }