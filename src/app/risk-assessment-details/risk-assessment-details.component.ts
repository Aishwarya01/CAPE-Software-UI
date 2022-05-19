import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-risk-assessment-details',
  templateUrl: './risk-assessment-details.component.html',
  styleUrls: ['./risk-assessment-details.component.css']
})
export class RiskAssessmentDetailsComponent implements OnInit {
  
  panelOpenState = false;

  constructor() { }

  ngOnInit(): void {
  }

}
