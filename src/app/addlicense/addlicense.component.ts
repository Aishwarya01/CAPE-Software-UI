import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AssignViewerComponent } from '../assign-viewer/assign-viewer.component';
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
  constructor(private dialog: MatDialog,
              private inspectorService: InspectorregisterService,
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
    this.register.noOfLicence = 5;
    this.register.username = this.email;
    this.inspectorService.updateLicense(this.register).subscribe(
      data => {
        console.log("success");
      },
      error => {
        console.log(error);
      }
    )
    const dialogRef = this.dialog.open(AssignViewerComponent, {
      width: '500px',
      disableClose: true,
    });

   
    dialogRef.componentInstance.email = this.email;
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
