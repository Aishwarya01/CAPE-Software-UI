import { Component, HostListener } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationBoxComponent } from '../app/confirmation-box/confirmation-box.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lv-inspection-safety-ui';
  env = environment;
  constructor(
    private dialog: MatDialog,
   ) {
  }
  //refresh click
    disableF5(e:any) {
      if (e== 116) {
        const dialogRef = this.dialog.open(ConfirmationBoxComponent, {
          width: '420px',
          maxHeight: '90vh',
          disableClose: true,
        });
        dialogRef.componentInstance.editModal = false;
        dialogRef.componentInstance.viewModal = false;
        dialogRef.componentInstance.triggerModal = false;
        dialogRef.componentInstance.linkModal = false;
        dialogRef.componentInstance.summaryModal = false;
        dialogRef.componentInstance.prtsrcModal = true;
        dialogRef.componentInstance.confirmBox.subscribe(data=>{
          if(data) {
            e.preventDefault(); 
          }
          else{
            return;
          }
        });
      }
   };
   
//refresh click
   @HostListener('window:beforeunload', ['$event'])
   onBeforeUnload(e:any) {
    window.onbeforeunload = () => {};
    delete e.returnValue;
  }
  // unloadHandler(event: Event) {
  //   event.preventDefault();
  //   event.returnValue = false;
  //  // window.opener.location.reload();
  // }

  //prtsrc, ctrl,shift, alt, win click
  @HostListener('document:keyup', ['$event'])
 onKeydown(e: any) {
    var keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode == 17 || keyCode == 16 || keyCode == 18 || keyCode == 116) {
      e.preventDefault();
      e.stopPropagation();
      this.disableF5(keyCode);
      return;
    }
    if (keyCode == 44 || keyCode == 91) {
      this.copyToClipboard(keyCode);
      navigator.clipboard.writeText("hi").then(
        success => {
          //console.log("text copied")
        }
        ,err => 
        {
          //console.log("error copying text")
        }
      );
    }
  }
 //prtsrc, ctrl,shift, alt, win click
  copyToClipboard(keyCode:any) {
    var aux = document.createElement("input");
    aux.setAttribute("value", "print screen disabled!");
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    // Remove it from the body
    document.body.removeChild(aux);
    if(keyCode == 44){
     // alert("Print screen disabled!");
     const dialogRef = this.dialog.open(ConfirmationBoxComponent, {
      width: '420px',
      maxHeight: '90vh',
      disableClose: true,
    });
    dialogRef.componentInstance.editModal = false;
    dialogRef.componentInstance.viewModal = false;
    dialogRef.componentInstance.triggerModal = false;
    dialogRef.componentInstance.linkModal = false;
    dialogRef.componentInstance.summaryModal = false;
    dialogRef.componentInstance.prtsrcModal = true;
    dialogRef.componentInstance.confirmBox.subscribe(data =>{
      if(data) {
      // this.onKeydown(e);
     // console.log("hello");
      }
      else{
        return;
      }
    })
    }
}
}

