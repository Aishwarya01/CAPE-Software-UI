import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginserviceService } from '../services/loginservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { LvInspectionDetailsComponent } from '../lv-inspection-details/lv-inspection-details.component';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  email: String = '';
  constructor(private breakpointObserver: BreakpointObserver,
              private loginservice: LoginserviceService,
              private router: ActivatedRoute,
              private route: Router,
              private dialog: MatDialog) {
                this.email=this.router.snapshot.paramMap.get('email') || '{}'
              }

  logout(){
    this.loginservice.logout();
    this.route.navigate(['login']);
  }

  changePassword(email: String){
    this.route.navigate(['changePassword', {email: email}])
  }

  profileUpdate(email: String) {
    this.route.navigate(['profile', {email: email}])
  }

  loadLVInformation(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    dialogConfig.height = "300%";
    this.dialog.open(LvInspectionDetailsComponent, dialogConfig)
  }

}
