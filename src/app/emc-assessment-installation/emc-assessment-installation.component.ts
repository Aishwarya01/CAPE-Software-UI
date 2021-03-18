import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emc-assessment-installation',
  templateUrl: './emc-assessment-installation.component.html',
  styleUrls: ['./emc-assessment-installation.component.css']
})
export class EmcAssessmentInstallationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onClose(){
    alert("Are you sure want to proceed further");
  }

  onNavigateToQuestionaire(){
    console.log("Navigate To Questionaire");
  }


}
