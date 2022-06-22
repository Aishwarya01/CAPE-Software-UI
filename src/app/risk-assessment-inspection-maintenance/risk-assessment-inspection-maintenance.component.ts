import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-risk-assessment-inspection-maintenance',
  templateUrl: './risk-assessment-inspection-maintenance.component.html',
  styleUrls: ['./risk-assessment-inspection-maintenance.component.css']
})
export class RiskAssessmentInspectionMaintenanceComponent implements OnInit {
  @ViewChild('reference', { read: ViewContainerRef })
  viewContainerRef!: ViewContainerRef;
  destroy: boolean = false;
  email: String = '';
  showRiskHome: boolean = false;

  constructor(private router: ActivatedRoute,
              private dialog: MatDialog,) { 
    this.email = this.router.snapshot.paramMap.get('email') || '{}'
  }

  ngOnInit(): void {
  }

  onNavigateToQuestionaire(){
    this.viewContainerRef.clear();
    this.destroy = true;   
    this.showRiskHome = true;
  }

}
