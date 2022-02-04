import { Component, EventEmitter, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalsService } from '../globals.service';
import { SignaturePad } from 'angular2-signaturepad';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.css']
})
export class SignatureComponent implements OnInit {

  @ViewChild(SignaturePad) signaturePad!: SignaturePad;

  signaturePadOptions: Object = { 
    'minWidth': 2,
    'canvasWidth': 450,
    'canvasHeight': 300,
  };
  signature= new EventEmitter();
  constructor(private dialog: MatDialog, public service: GlobalsService,
    public dialogRef: MatDialogRef<SignatureComponent>) { }

  ngOnInit(): void {
  }
  clearSignature() {  
    this.signaturePad.clear();
  } 
  
  closeSignature(){
    this.dialogRef.close();
    }
    SaveSignature(){
    const base64=this.signaturePad.toDataURL('image/png', 0.5); 
    this.service.signatureImg=base64;
    this.dialogRef.close();
    this.service.sigInput=1;
    const blob= this.base64toBlob(base64);
    }
    base64toBlob(base64:any){
      const byteString = atob(base64.split(',')[1]);
      const mimeString= base64.split(',')[0].split(':')[1].split(':')[0];
      const byteNumbers = new Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        byteNumbers[i] = byteString.charAt(i);
       }
       const ia=new Uint8Array(byteNumbers);
       return new Blob([ia], {type:mimeString});
    }
}
