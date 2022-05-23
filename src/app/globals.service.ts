import {Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { Subject } from 'rxjs';
import { ChatbotFAQs } from 'src/app/chatbot-FAQs/chatbot-faqs'

export class Message {
  constructor(public author: string, public content: string) {}
}

@Injectable()
export class GlobalsService {
   
  private data = {};  
  backBtn:boolean=true;
  //observationGlow:any=[];
  observationGlowSupply:boolean=false;
  observationGlowInspection:boolean=false;
  observationGlowTesting:boolean=false;
  siteCount: number = 0; 
  iterationList: any=[]; //for location no. & name
//from supply to testing table
  supplyList: any;
  retrieveMainNominalVoltage:any=[];
  nominalVoltageArr2:any=[];
  testingTable:any=[];
  testingTable2:any=[];

  retrieveTable:boolean=false;
  mainNominalVoltage :any=[];
  mainNominalFrequency :any=[];
  mainNominalCurrent:any=[];
  mainActualLoad:any=[];
  mainNominalVoltageValue:String="";
  mainLoopImpedanceValue:String="";
  mainNominalCurrentValue:String="";
  mainActualLoadValue:String="";
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
//completed-saved-final
 disableFields:boolean=false;
 allStepsCompleted:boolean=false;
 allFieldsDisable:boolean=false; //after submiting all 5 steps
 disableSubmitSummary:boolean=false; //after submiting all 5 steps
//verification component for stepper
 isLinear:boolean=false; 
 isCompleted: boolean = true;
 isCompleted2: boolean = true;
 isCompleted4: boolean = true;
 isCompleted5: boolean = true; 
 isCompleted3: boolean = true;
 goBacktoprevious: boolean=false;
 editable: boolean = true;

 

 disableSubmitElectromagnetic:boolean=false;
 editableEmc: boolean = true;
 isCompletedEmc: boolean = true;
 isCompletedEmc1: boolean = true;
 isCompletedEmc2: boolean = true;
 isCompletedEmc3: boolean = true;
 isLinearEmc: boolean=false; 



  jointType: any;
  noOfjoint: any;
  msgForStep1: boolean = false;
  msgForStep1Flag: boolean = false;
  lvClick: number = 0;
  windowTabClick: number = 0;
  logoutClick: number = 0;
  //remember me
  autoLoginToken: number = 0;
  Chatbot_FAQs = new ChatbotFAQs();
  botMsg: boolean = true;

 constructor(private _scrollToService: ScrollToService) {
  }
  
//Scroll Top to Bottom for notification
  public triggerScrollTo() {
      const config: ScrollToConfigOptions = {
        target: 'destination',
        offset: 200
      };
      this._scrollToService.scrollTo(config);
    }

    conversation = new Subject<Message[]>();
  
    getBotAnswer(msg: string) {
      const userMessage = new Message('user', msg); 
      this.conversation.next([userMessage]);
      if(msg=="LV Systems"){
        const botMessage = new Message('bot', this.getBotMessage(msg));
        const botMessage5 = new Message('bot', this.getBotMessageDefault5(msg));

        setTimeout(()=>{
          this.conversation.next([botMessage]);
        }, 1500);
        setTimeout(()=>{
          this.conversation.next([botMessage5]);
        }, 1500);
      }
      else if(msg=="EMC Assessment"){
        const botMessage = new Message('bot', this.getBotMessage(msg));
        const botMessage6 = new Message('bot', this.getBotMessageDefault6(msg));

        setTimeout(()=>{
          this.conversation.next([botMessage]);
        }, 1500);
        setTimeout(()=>{
          this.conversation.next([botMessage6]);
        }, 1500);
      }
      else if(msg=="LPS Systems"){
        const botMessage = new Message('bot', this.getBotMessage(msg));
        const botMessage7 = new Message('bot', this.getBotMessageDefault7(msg));

        setTimeout(()=>{
          this.conversation.next([botMessage]);
        }, 1500);
        setTimeout(()=>{
          this.conversation.next([botMessage7]);
        }, 1500);
      }
      else{
        const botMessage = new Message('bot', this.getBotMessage(msg));
        setTimeout(()=>{
          this.conversation.next([botMessage]);
        }, 1500);
      }
    }
  
    getBotMessage(question: string){
      let answer = this.Chatbot_FAQs.messageMap[question];
      return answer || this.Chatbot_FAQs.messageMap['default'];
    }

    getBotAnswerDefault(msg: string) {
      const botMessage = new Message('bot', this.getBotMessageDefault(msg));
      const botMessage1 = new Message('bot', this.getBotMessageDefault1(msg));
      const botMessage2 = new Message('bot', this.getBotMessageDefault2(msg));
      const botMessage3 = new Message('bot', this.getBotMessageDefault3(msg));
      const botMessage4 = new Message('bot', this.getBotMessageDefault4(msg));

      setTimeout(()=>{
        this.conversation.next([botMessage]);
      }, 100);
      setTimeout(()=>{
        this.conversation.next([botMessage1]);
      }, 100);
      setTimeout(()=>{
        this.conversation.next([botMessage2]);
      }, 200);
      setTimeout(()=>{
        this.conversation.next([botMessage3]);
      }, 200);
      setTimeout(()=>{
        this.conversation.next([botMessage4]);
      }, 200);
    } 
  
    getBotMessageDefault(question: string){
        return this.Chatbot_FAQs.messageMapDefault['0'];
    }
    getBotMessageDefault1(question: string){
        return this.Chatbot_FAQs.messageMapDefault['1'];
    }
    getBotMessageDefault2(question: string){
      return this.Chatbot_FAQs.messageMapDefault['2'];
  }
  getBotMessageDefault3(question: string) {
    return this.Chatbot_FAQs.messageMapDefault['3'];
  }
  getBotMessageDefault4(question: string) {
    return this.Chatbot_FAQs.messageMapDefault['4'];
  }
  getBotMessageDefault5(question: string) {
    return this.Chatbot_FAQs.messageMapDefault['5'];
  }
  getBotMessageDefault6(question: string) {
    return this.Chatbot_FAQs.messageMapDefault['6'];
  }
  getBotMessageDefault7(question: string) {
    return this.Chatbot_FAQs.messageMapDefault['7'];
  }
  }

 
