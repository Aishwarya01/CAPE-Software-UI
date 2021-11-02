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
import { LpsEarthingComponent } from './LPS/lps-earthing/lps-earthing.component';

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
  {path: 'register',component:InspectorRegistrationComponent},
  {path: 'createPassword',component:InspectorUpdatePasswordComponent},
  {path: 'SignIn',component:SingInPageComponent},
  {path: 'generateOtp',component:GenerateOtpComponent},
  {path: 'generateContactNumber',component:GenerateOtpContactnumberComponent},
  {path: 'createContactNumber',component:ChangeContactnumberComponent},
  {path: 'LpsEarthingComponent',component:LpsEarthingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
