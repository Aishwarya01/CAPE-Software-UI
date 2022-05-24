import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GlobalsService } from '../globals.service';
import {Message} from '../globals.service'

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.css']
})
export class SingInPageComponent implements OnInit {

 signInContent :string = environment.signInContent;
 messages: Message[] = [];
 msgBot: any=[];
 valueBot: string="";
 togglecount:number = 0;
 status =false;
 greet: string="";
 isShow: boolean = true;

  constructor(public service: GlobalsService) { }

  ngOnInit(): void {
    this.service.conversation.subscribe((val) => {
      this.messages = this.messages.concat(val);
    });
    var myDate = new Date();
    var hrs = myDate.getHours();
  
    if (hrs < 12)
        this.greet = 'Good Morning!';
    else if (hrs >= 12 && hrs <= 17)
        this.greet = 'Good Afternoon!';
    else if (hrs >= 17 && hrs <= 24)
        this.greet = 'Good Evening!';
    this.service.getBotAnswerDefaultSignLogin(this.valueBot);
   }
 //chatbot code starts
 
toggleStatus() {
  this.isShow = !this.isShow;
  // if(this.togglecount == 0)
  // {
  //   this.service.getBotAnswerDefaultSignLogin(this.valueBot);
  //   this.togglecount=1;
  // }
}
toggleStatusClose(){
  this.isShow = !this.isShow;
}
sendMessage() {
  this.service.getBotAnswer(this.valueBot);
  this.valueBot = '';
}
// chatbot code ends
}
