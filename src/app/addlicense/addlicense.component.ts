import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AssignViewerComponent } from '../assign-viewer/assign-viewer.component';

@Component({
  selector: 'app-addlicense',
  templateUrl: './addlicense.component.html',
  styleUrls: ['./addlicense.component.css']
})
export class AddlicenseComponent implements OnInit {
  licenseValue: number= 5;
  constructor(private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  demo() {

  }

  showViewerPage() {
    this.dialog.closeAll();

    const dialogRef = this.dialog.open(AssignViewerComponent, {
      width: '500px',
    });
    // dialogRef.componentInstance.email = this.email;
    dialogRef.afterClosed().subscribe((result) => {
      // this.refresh();
      console.log(result);
      // this.retrieveClientDetails();
    });
  }

}
