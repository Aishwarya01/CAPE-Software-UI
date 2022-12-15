import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { HomeComponent } from './home/home.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent } from './profile/profile.component';
import { AddApplicationTypesComponent } from './add-application-types/add-application-types.component';
import { VerificationlvComponent } from './verificationlv/verificationlv.component';
import { LvInspectionDetailsComponent } from './lv-inspection-details/lv-inspection-details.component';
import { InspectorRegistrationComponent } from './inspector-registration/inspector-registration.component';
import { InspectorUpdatePasswordComponent } from './inspector-update-password/inspector-update-password.component';
import { SingInPageComponent } from './signin-page/signin-page.component';
import { GenerateOtpComponent } from './generate-otp/generate-otp.component';
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
import { LpsMatstepperComponent } from './LPS/lps-matstepper/lps-matstepper.component';
import { LpsWelcomePageComponent } from './LPS/lps-welcome-page/lps-welcome-page.component';
import { BuyMeterComponent } from './buy-meter/buy-meter.component';
import { SignInBuyMeterComponent } from './sign-in-buy-meter/sign-in-buy-meter.component';
import { RegistrationBuyMeterComponent } from './registration-buy-meter/registration-buy-meter.component';
import { AddCartBuyMeterComponent } from './add-cart-buy-meter/add-cart-buy-meter.component';
import { ProfieBuyMeterComponent } from './profie-buy-meter/profie-buy-meter.component';



const routes: Routes = [
  {path: '', redirectTo: "/SignIn", pathMatch: 'full' },
  // {
  //   path: 'home',
  //   component: LvInspectionDetailsComponent
  // },
  {path: 'login',component:LoginComponent},
  {path: 'forgotpassword' ,component: ForgotpasswordComponent},
  {path: 'updatepassword' ,component: UpdatepasswordComponent},
  // {path: 'register',component:RegisterComponent},
  {path: 'changePassword', component:ChangePasswordComponent},
  {path: 'profile',component:ProfileComponent},
  {path: 'addApplicationType', component: AddApplicationTypesComponent},
  {path: 'home',component:HomeComponent, canActivate:[AuthenticationGuard]},
  {path: 'verificationlv',component:VerificationlvComponent},
  {path: 'lpsmatstepper',component:LpsMatstepperComponent},
  {path: 'lpswelcomepage',component:LpsWelcomePageComponent},
  {path: 'register',component:InspectorRegistrationComponent},
  {path: 'createPassword',component:InspectorUpdatePasswordComponent},
  {path: 'SignIn',component:SingInPageComponent},
  {path: 'generateOtp',component:GenerateOtpComponent},
  {path: 'generateContactNumber',component:GenerateOtpContactnumberComponent},
  {path: 'createContactNumber',component:ChangeContactnumberComponent},
  {path: 'EmcFacilityDataComponent',component:EmcFacilityDataComponent},
  {path: 'PowerAndEarthingDataComponent',component:PowerAndEarthingDataComponent},
  {path: 'EmcElectromagneticCompatibilityDataComponent',component:EmcElectromagneticCompatibilityDataComponent},
  {path: 'EmcMatstepperComponent',component:EmcMatstepperComponent},
  {path: 'EmcSavedReportComponent',component:EmcSavedReportComponent},
  {path: 'EmcFinalReportComponent',component:EmcFinalReportComponent},
  {path: 'EmcClientDetailsComponent',component:EmcClientDetailsComponent},
  {path: 'LpsEarthingComponent',component:LpsEarthingComponent},
  {path: 'LpsSpdComponent',component:LpsSpdComponent},
  {path: 'buyMeter',component:BuyMeterComponent},
  {path: 'signIn-buyMeter',component:SignInBuyMeterComponent},
  {path: 'register-buyMeter',component:RegistrationBuyMeterComponent},
  {path: 'addtocart',component:AddCartBuyMeterComponent},
  {path: 'profile-buy-meter',component:ProfieBuyMeterComponent},
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
