import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-risk-assessment-inspection-maintenance',
  templateUrl: './risk-assessment-inspection-maintenance.component.html',
  styleUrls: ['./risk-assessment-inspection-maintenance.component.css']
})
export class RiskAssessmentInspectionMaintenanceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onNavigateToQuestionaire(){
    console.log("Navigate To Questionaire");
  }

}
