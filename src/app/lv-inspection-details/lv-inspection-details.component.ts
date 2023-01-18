import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalsService } from '../globals.service';


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
  showLicence: boolean = false;
  showHome: boolean = false;

  constructor( private router: ActivatedRoute,
               private globalService: GlobalsService ) { 
      {
        this.email = this.router.snapshot.paramMap.get('email') || '{}'
      }
    }

  onNavigateToQuestionaire() {
    this.viewContainerRef.clear();
    this.destroy = true;   
    if(this.email.includes("@capeindia.net")) {
      this.showHome = false;
      this.showLicence = true;
    }
    else{
      this.showHome = false;
      this.showLicence = true;
    }
    // this.showHome = false;
    this.globalService.toggle=false;
    this.showLicence = true;
    this.globalService.headerMsg="lvPage"
    this.globalService.licensePageHeaging();
  }

  displayIconsBasedOnEmail(){
    // return !this.email.includes("@capeindia.net")
  }
  
}
