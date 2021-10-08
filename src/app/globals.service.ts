import { EventEmitter, Injectable,ViewChild } from '@angular/core';
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
  inspectorData: any = [];
  changeNumberSession!: String;
  changeNumber!: String;
  commentScrollToBottom: number= 0;
  mainNavToSaved:number=0;
  filterSiteName!: String;
  glowContinueBtn:boolean=false;

  constructor(private _scrollToService: ScrollToService) {}

  public triggerScrollTo() {
    if(this.commentScrollToBottom==1){
      const config: ScrollToConfigOptions = {
        target: 'destination',
        offset: 200
      };
      this._scrollToService.scrollTo(config);
    }
  }

 
}