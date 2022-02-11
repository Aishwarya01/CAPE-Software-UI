import { Component, OnInit } from '@angular/core';
import { ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LpsMatstepperComponent } from '../lps-matstepper/lps-matstepper.component';

@Component({
  selector: 'app-lps-welcome-page',
  templateUrl: './lps-welcome-page.component.html',
  styleUrls: ['./lps-welcome-page.component.css']
})
export class LpsWelcomePageComponent implements OnInit {

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
