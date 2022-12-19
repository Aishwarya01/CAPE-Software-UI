import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AssignViewerComponent } from '../assign-viewer/assign-viewer.component';
import { GlobalsService } from '../globals.service';
import { Register } from '../model/register';
import { InspectorregisterService } from '../services/inspectorregister.service';

@Component({
  selector: 'app-addlicense',
  templateUrl: './addlicense.component.html',
  styleUrls: ['./addlicense.component.css']
})
export class AddlicenseComponent implements OnInit {
  licenseValue: number= 5;
  @Input()
  email: String = '';
  register = new Register;
  onLicense = new EventEmitter();
  dataArr: any;
  errorMsg: String="";
  constructor(private dialog: MatDialog,
              private inspectorService: InspectorregisterService,
              public service: GlobalsService,
  ) { }

  ngOnInit(): void {
  }

  demo() {

  }
  closeModalDialog(){
    this.dialog.closeAll();
   }
  showViewerPage() { 
    // this.dialog.closeAll();
    this.service.noofLicense=this.service.noofLicense + 5;
    this.register.noOfLicence = 5;
    this.register.username = this.email;

    if(this.service.triggerMsgForLicense=='lvPage'){
      this.register.selectedProject = "LV"
    } else if(this.service.triggerMsgForLicense=='lpsPage'){
      this.register.selectedProject = "LPS"
    }

    this.inspectorService.updateLicense(this.register).subscribe(
      data => {
        if(data){
          this.dataArr=data;
        }
        this.navigateAssignViewer();
      },  
      error => {
        // let errorArr=[];
        // errorArr=JSON.parse(error.error);
        this.errorMsg=this.service.globalErrorMsg;
      })
  }

  navigateAssignViewer(){
    this.service.emailCheck=true;
    const dialogRef = this.dialog.open(AssignViewerComponent, {
      width: '720px',
    });
    if(this.service.emailCheck==true){
      dialogRef.componentInstance.email = this.email;
    }
    dialogRef.componentInstance.onSave.subscribe(data=>{
      if(data) {
        this.onLicense.emit(true);
      }
      else{
        this.onLicense.emit(false);
      }
    })

    dialogRef.afterClosed().subscribe((result) => {
    });
  }
}
