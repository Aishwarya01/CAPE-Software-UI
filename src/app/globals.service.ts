import {Injectable } from '@angular/core';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';

@Injectable({
  providedIn: 'root'

})

export class GlobalsService {
   
  private data = {};  
  siteCount: number = 0; 
  iterationList: any=[]; //for location no. & name
//from supply to testing table
  supplyList: any;
  retrieveMainNominalVoltage:any=[];
  nominalVoltageArr:any=[];
  testingTable:any=[];
//viewer inspector details
  viewerName!: String;
  inspectorName!: String;
  siteName!: String;
  viewerData: any = [];
  inspectorData: any = [];
//generate otp & contact no.
  changeNumberSession!: String; 
  changeNumber!: String;
//notification
  notificationCount: number= 0; 
  commentScrollToBottom: number= 0; //Scroll Top to Bottom for notification
  mainNavToSaved:number=0; //onclick of notification navigate to saved reports
  filterSiteName!: String; //filter site name based on notification click
  highlightText:boolean=false; //highlightText row based on notification click in saved reports
//get complimentary license
  noofLicense!: number;  
  useClicked:boolean=false;

  constructor(private _scrollToService: ScrollToService) {}
  
//Scroll Top to Bottom for notification
  public triggerScrollTo() {
      const config: ScrollToConfigOptions = {
        target: 'destination',
        offset: 200
      };
      this._scrollToService.scrollTo(config);
    }
  }

 
