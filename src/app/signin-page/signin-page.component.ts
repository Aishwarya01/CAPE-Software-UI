import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BuyMeterComponent } from '../buy-meter/buy-meter.component';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.css']
})
export class SingInPageComponent implements OnInit {

 // @ViewChild(BuyMeterComponent)buyMeterData! :BuyMeterComponent;

 // destroy: boolean = false;
 //@Output() myEvent = new EventEmitter();
 signInContent :string = environment.signInContent;
 
  constructor(private router: Router, public service: GlobalsService,
    ) { }

  ngOnInit(): void {
   }
 
   buyMeter(){
    this.router.navigate(['/buyMeter']);
   // this.service.observe=false;
     }
}


