import { Injectable,ViewChild } from '@angular/core';
import { VerificationlvComponent } from './verificationlv/verificationlv.component';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';

@Injectable({
  providedIn: 'root'

})

export class GlobalsService {
   
  private data = {};  
  siteCount: number = 0; 
  iterationList: any=[];
  notificationCount: number= 0;
  viewerName!: String;
  inspectorName!: String;
  siteName!: String;
  viewerData: any = [];
  
  constructor(private _scrollToService: ScrollToService) {}

  public triggerScrollTo() {
    const config: ScrollToConfigOptions = {
      target: 'destination'
    };
    this._scrollToService.scrollTo(config);
  }
}