import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationBoxComponent } from '../../../confirmation-box/confirmation-box.component';
import { NewFileComponent } from '../../../new-file/new-file.component';
import { InspectionVerificationService } from '../../../services/inspection-verification.service';
import { DiagramServicesService } from '../../SLD Services/diagram-services.service';

@Component({
  selector: 'app-diagram-list',
  templateUrl: './diagram-list.component.html',
  styleUrls: ['./diagram-list.component.css']
})
export class DiagramListComponent implements OnInit {
  panelOpenState = false;
  destroyList: boolean = false;
  diagramHome: boolean = false;
  savedDiagramColumns: string[] = [
    'fileName',
    'createdDate',
    'createdBy',
    'updatedDate',
    'updatedBy',
    //'action',
  ];
  savedDiagram_dataSource!: MatTableDataSource<any>;
  @ViewChild('savedDiagramPaginator', { static: false }) savedDiagramPaginator!: MatPaginator;
  @ViewChild('savedDiagramSort', { static: false }) savedDiagramSort!: MatSort;

  @ViewChild('ref', { read: ViewContainerRef })
  viewContainerRef!: ViewContainerRef;
  @ViewChild('diagram')
  diagram: any; 
  email: String = '';
  allData: any = [];
  fileName: any;
  constructor(private router: ActivatedRoute,
              private inspectionService: InspectionVerificationService,
              private diagramService: DiagramServicesService,
              private dialog: MatDialog,

    ) {
    this.email = this.router.snapshot.paramMap.get('email') || '{}';
   }

  ngOnInit(): void {
    this.retrieveDiagramDetails();
  }

  retrieveDiagramDetails() {
    this.diagramService.retriveAllDiagram(this.email).subscribe(
      data => {
        this.allData = JSON.parse(data);
        this.savedDiagram_dataSource = new MatTableDataSource(this.allData);
        this.savedDiagram_dataSource.paginator = this.savedDiagramPaginator;
        this.savedDiagram_dataSource.sort = this.savedDiagramSort;
      },
    )
  }

  editDiagram(userName:any,fileName: any){
    this.viewContainerRef.clear();
        this.destroyList = true;
        this.diagramHome=true;
        setTimeout(()=>{
          this.diagram.loadDiagram(userName,fileName);
        }, 1000);
  }

  createNewFile() {
    const dialogRef = this.dialog.open(NewFileComponent, {
      width: '500px',
      maxHeight: '90vh',
      disableClose: true,
    });
    dialogRef.componentInstance.email = this.email;
    dialogRef.componentInstance.onSuccess.subscribe(data=>{
      if(data) {
        this.destroyList = true;
        this.diagramHome=true;
          dialogRef.componentInstance.fileNameEmit.subscribe(res=>{
            setTimeout(()=>{
              this.appendFileName(res);
            }, 2000);
          })   
      }
      else{
        
      }
    })    
  }

  appendFileName(res: any) {
    this.diagram.loadFileName(res);  
  }
}
