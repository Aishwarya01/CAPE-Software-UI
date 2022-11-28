import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-diagram-welcome-page',
  templateUrl: './diagram-welcome-page.component.html',
  styleUrls: ['./diagram-welcome-page.component.css']
})
export class DiagramWelcomePageComponent implements OnInit {
  @ViewChild('reference', { read: ViewContainerRef })
  viewContainerRef!: ViewContainerRef;
  destroy: boolean = false;
  email: String = '';
  showDiagramList: boolean = false;

  constructor(private router: ActivatedRoute) { 
    this.email = this.router.snapshot.paramMap.get('email') || '{}'
  }

  ngOnInit(): void {
  }

  onNavigateToQuestionaire() {
    this.viewContainerRef.clear();
    this.destroy = true;
    this.showDiagramList = true;
  }

  displayIconsBasedOnEmail(){
    // return !this.email.includes("@capeindia.net")
  }

}
