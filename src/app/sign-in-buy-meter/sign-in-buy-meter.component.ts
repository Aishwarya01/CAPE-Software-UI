import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-sign-in-buy-meter',
  templateUrl: './sign-in-buy-meter.component.html',
  styleUrls: ['./sign-in-buy-meter.component.css']
})
export class SignInBuyMeterComponent implements OnInit {
  signInContent :string = environment.signInContent;
 
  constructor(private router: Router, public service: GlobalsService,
    ) { }

  ngOnInit(): void {
   }
 
  
}
