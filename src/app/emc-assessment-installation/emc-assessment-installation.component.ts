import { Component, OnInit } from '@angular/core';
import { ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-emc-assessment-installation',
  templateUrl: './emc-assessment-installation.component.html',
  styleUrls: ['./emc-assessment-installation.component.css']
})
export class EmcAssessmentInstallationComponent implements OnInit {

  @ViewChild('reference', { read: ViewContainerRef })
  viewContainerRef!: ViewContainerRef;
  destroy: boolean = false;
  email: String = '';
  showEmcHome: boolean = false;
  showLicence: boolean=false;

  constructor( private router: ActivatedRoute,
              private dialog: MatDialog,
              private globalService: GlobalsService
    ) { 
      {
        this.email = this.router.snapshot.paramMap.get('email') || '{}'
      }
    }
  ngOnInit(): void {
    
  }

  onNavigateToQuestionaire() {
    this.viewContainerRef.clear();
    this.destroy = true;
    // const dialogRef = this.dialog.open(EmcClientDetailsComponent, {
    //   width: '1000px',
    //   maxHeight: '90vh',
    //   disableClose: true,
      
    // });
    // this.showEmcHome = true;
    this.showLicence=true;
    this.globalService.toggle=false;
    this.showLicence = true;
    this.globalService.headerMsg="emcPage";
    this.globalService.licensePageHeaging();
    // });
    // dialogRef.componentInstance.email = this.email;
  }
  displayIconsBasedOnEmail(){
  }
  
}
