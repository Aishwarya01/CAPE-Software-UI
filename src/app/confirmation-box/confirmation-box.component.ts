import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-confirmation-box',
  templateUrl: './confirmation-box.component.html',
  styleUrls: ['./confirmation-box.component.css']
})
export class ConfirmationBoxComponent implements OnInit {
 
  confirmBox= new EventEmitter();
 // confirmBoxView= new EventEmitter();
editModal:boolean=false;
viewModal:boolean=false;
triggerModal:boolean=false;
linkModal:boolean=false;
summaryModal:boolean=false;
  constructor(private dialog: MatDialog,public service: GlobalsService,) { }

  ngOnInit(): void {
  }
  OkModalDialog(){
    this.confirmBox.emit(true);
    this.dialog.closeAll();
  }

  closeModalDialog(){
    this.confirmBox.emit(false);
    this.dialog.closeAll();
  }
 
}
