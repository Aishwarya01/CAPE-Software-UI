import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

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
    VerificationlvComponent
    
  ],
  imports: [
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
    NgxPrintModule
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: BasicAuthHtppInterceptorService, multi: true }],
  bootstrap: [AppComponent],
  entryComponents: [ AddApplicationTypesComponent, UpdateApplicationTypesComponent ]
})
export class AppModule { }
