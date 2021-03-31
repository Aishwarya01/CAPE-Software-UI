import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { VerificationlvComponent } from '../verificationlv/verificationlv.component';


@Component({
  selector: 'app-lv-inspection-details',
  templateUrl: './lv-inspection-details.component.html',
  styleUrls: ['./lv-inspection-details.component.css']
})
export class LvInspectionDetailsComponent {
  
  @ViewChild('ref1', { read: ViewContainerRef })
  viewContainerRef!: ViewContainerRef;
  

  constructor(private breakpointObserver: BreakpointObserver,
    private componentFactoryResolver: ComponentFactoryResolver) { }



  onClose(){
    alert("Are you sure want to proceed further");
  }

  onNavigateToQuestionaire(){
    console.log("Navigate To Questionaire");
    // this.viewContainerRef.clear();
    const verificationLv = this.componentFactoryResolver.resolveComponentFactory(VerificationlvComponent);
    const verificationLvRef = this.viewContainerRef.createComponent(verificationLv);
    verificationLvRef.changeDetectorRef.detectChanges();
  }
}
