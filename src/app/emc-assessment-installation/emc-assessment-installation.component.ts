import { Component, OnInit } from '@angular/core';
import { ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor( private router: ActivatedRoute) { 
      {
        this.email = this.router.snapshot.paramMap.get('email') || '{}'
      }
    }
  ngOnInit(): void {
    
  }

  onNavigateToQuestionaire() {
    this.viewContainerRef.clear();
    this.destroy = true;
    this.showHome = true;
  }

  displayIconsBasedOnEmail(){
  }
  
}
