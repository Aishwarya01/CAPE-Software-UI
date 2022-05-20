import { Component, OnInit } from '@angular/core';
import { CustomerDetailsServiceService } from '../Risk Assessment/Risk Assessment Services/customer-details-service.service';

@Component({
  selector: 'app-risk-parent-component',
  templateUrl: './risk-parent-component.component.html',
  styleUrls: ['./risk-parent-component.component.css']
})
export class RiskParentComponentComponent implements OnInit {

  constructor() { }
    private customerDetailsService!: CustomerDetailsServiceService;

  ngOnInit(): void {
  }

}
