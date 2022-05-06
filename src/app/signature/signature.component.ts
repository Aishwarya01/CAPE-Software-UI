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

  sigImg1:boolean=true;
  sigImg2:boolean=false;
  sigImg3:boolean=false;
  sigImg4:boolean=false;
  sigImg5:boolean=false;
  sigImg6:boolean=false;

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
    
    if(this.sigImg1==true){
      this.service.signatureImg1=base64;
    }
    else if(this.sigImg2==true){
      this.service.signatureImg2=base64;
    }
    else if(this.sigImg3==true){
      this.service.signatureImg3=base64;
    }
    else if(this.sigImg4==true){
      this.service.signatureImg4=base64;
    }
    else if(this.sigImg5==true){
      this.service.signatureImg5=base64;
    }
    else if(this.sigImg6==true){
      this.service.signatureImg6=base64;
    }

    this.dialogRef.close();
    this.service.sigInput=1;
    
    if(this.sigImg1==true){
      const byteString = btoa(base64);
      this.service.bytestring1=byteString;
    }
    else if(this.sigImg2==true){
      const byteString = btoa(base64);
      this.service.bytestring2=byteString;    
    }
    else if(this.sigImg3==true){
      const byteString = btoa(base64);
      this.service.bytestring3=byteString;
    }
    else if(this.sigImg4==true){
      const byteString = btoa(base64);
      this.service.bytestring4=byteString;
    }

   

   // const byteString= this.base64toBlob(base64); .split(',')[1]
  //  console.log(byteString);

    //const bytesString = String.fromCharCode(byteArray);
    //console.log('Bytes to string: ', bytesString);

   
   // const jsonString = JSON.stringify(byteString);
    //console.log(jsonString);
    }
    base64toBlob(base64:any){
    //   const binary_string = atob(base64.split(',')[1]);
    //  // var binary_string = atob(base64);
    //   var len = binary_string.length;
    //   var bytes = new Uint8Array(len);
    //   for (var i = 0; i < len; i++) {
    //       bytes[i] = binary_string.charCodeAt(i);
    //   }
    //   return bytes.buffer;

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
