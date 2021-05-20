import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-lv-inspection-details',
  templateUrl: './lv-inspection-details.component.html',
  styleUrls: ['./lv-inspection-details.component.css']
})
export class LvInspectionDetailsComponent implements OnInit {

  constructor( ) { }

  ngOnInit(): void {
  }

  onClose(){
    alert("Are you sure want to proceed further");
  }

  onNavigateToQuestionaire(){
    console.log("Navigate To Questionaire");
  }
}
