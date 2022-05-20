import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-risk-parent-component',
  templateUrl: './risk-parent-component.component.html',
  styleUrls: ['./risk-parent-component.component.css']
})
export class RiskParentComponentComponent implements OnInit {

  constructor() { }
    private customerDetailsService :CustomerDetailsServiceService,

  ngOnInit(): void {
  }

}
