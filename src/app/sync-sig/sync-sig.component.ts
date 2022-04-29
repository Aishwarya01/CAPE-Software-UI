import { Component, OnInit, ViewChild } from '@angular/core';
// import { Signature } from '@syncfusion/ej2-inputs';
// import { getComponent } from '@syncfusion/ej2-base';
// import { SignatureComponent } from '@syncfusion/ej2-angular-inputs';
//import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
@Component({
  selector: 'app-sync-sig',
  templateUrl: './sync-sig.component.html',
  styleUrls: ['./sync-sig.component.css']
})
export class SyncSigComponent implements OnInit {

  //@ViewChild('signature') signature!: SignatureComponent;
   // @ViewChild('signsave') saveBtn!: ButtonComponent;
   // @ViewChild('signclear') clearBtn!: ButtonComponent;
  
  sigImg1:boolean=false;
  sigImg2:boolean=false;
  sigImg3:boolean=false;
  sigImg4:boolean=false;
  sigImg5:boolean=false;
  sigImg6:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

  public saveBtnClick(): void {
   // this.signature.save();
  }
  public clearBtnClick(): void {
   // this.signature.clear();
   // if (this.signature.isEmpty()) {
     // this.saveBtn.disabled = true;
     // this.clearBtn.disabled = true;
   // }
  }
  public change(): void {
    //if (!this.signature.isEmpty()) {
    //  this.saveBtn.disabled = false;
    //  this.clearBtn.disabled = false;
    //}
  }
}
