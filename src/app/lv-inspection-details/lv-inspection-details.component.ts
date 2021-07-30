import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { VerificationlvComponent } from '../verificationlv/verificationlv.component';


@Component({
  selector: 'app-lv-inspection-details',
  templateUrl: './lv-inspection-details.component.html',
  styleUrls: ['./lv-inspection-details.component.css']
})
export class LvInspectionDetailsComponent {

  @ViewChild('reference', { read: ViewContainerRef })
  viewContainerRef!: ViewContainerRef;
  destroy: boolean = false;
  email: String = '';
  constructor( private router: ActivatedRoute) { 
      {
        this.email = this.router.snapshot.paramMap.get('email') || '{}'
      }
    }

  onNavigateToQuestionaire() {
    this.viewContainerRef.clear();
    this.destroy = true;
  }

  displayIconsBasedOnEmail(): boolean{
    return !this.email.includes("@capeindia.net")
  }
  
}
