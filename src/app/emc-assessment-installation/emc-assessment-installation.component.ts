import { Component, OnInit } from '@angular/core';
import { ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmcClientDetailsComponent } from '../EMC/emc-client-details/emc-client-details.component';
import { MatDialog } from '@angular/material/dialog';

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
  showLicence: boolean = false;
  showHome: boolean = false;

  constructor( private router: ActivatedRoute,
    private dialog: MatDialog,
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
    const dialogRef = this.dialog.open(EmcClientDetailsComponent, {
      width: '1000px',
      maxHeight: '90vh',
      disableClose: true,
      
    });
  
  }

  displayIconsBasedOnEmail(){
  }
  
}
