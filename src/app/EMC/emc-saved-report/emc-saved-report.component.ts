import { Component, OnInit, ViewChild } from '@angular/core';
import { EmcFacilityData } from 'src/app/EMC_Model/emc-facility-data';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { GlobalsService } from 'src/app/globals.service';
import { EmcSavedReportService } from 'src/app/EMC_Services/emc-saved-report.service';
import { EmcMatstepperComponent } from '../emc-matstepper/emc-matstepper.component';
import { EmcClientDetails } from 'src/app/EMC_Model/emc-client-details';


@Component({
  selector: 'app-emc-saved-report',
  templateUrl: './emc-saved-report.component.html',
  styleUrls: ['./emc-saved-report.component.css']
})
export class EmcSavedReportComponent implements OnInit {

  savedReportsEmcColumns: string[] = [ 'clientName', 'contactPerson', 'clientLocation', 'clientAddress', 'createdDate', 'createdBy','continue'];
  savedReportEmc_dataSource!: MatTableDataSource<EmcClientDetails[]>;
  @ViewChild('savedReportEmcPaginator', { static: true }) savedReportEmcPaginator!: MatPaginator;
  @ViewChild('savedReportEmcSort', {static: true}) savedReportEmcSort!: MatSort;

   // @Output("changeTab") changeTab: EventEmitter<any> = new EventEmitter();
   email: String ="";

   emcClientDetails = new EmcClientDetails();
   clientName: String="";
   userName: String="";
   clientList:any  = [];
   noDetails: boolean=false;
   noDetailsRec: boolean=false;
   noDetailsRecMsg: String="";
   showTIC: boolean = false;
   showREP: boolean = false;
   currentUser: any = [];
   currentUser1: any = [];
   userData: any=[];
   viewerFilterData:any=[];
   selectedIndex: number=0;
  
  @ViewChild('input') input!: MatInput;
  emcData: any=[];
 completedFilterData: any=[];
 
   constructor(private router: ActivatedRoute,
               public service: GlobalsService,
               public emcSavedReportService: EmcSavedReportService,
               public emcParent: EmcMatstepperComponent,
   ) { 
     this.email = this.router.snapshot.paramMap.get('email') || '{}'
   }
 
   ngOnInit(): void {
     this.currentUser=sessionStorage.getItem('authenticatedUser');
     this.currentUser1 = [];
     this.currentUser1=JSON.parse(this.currentUser);
      this.retrieveEmcDetails();
    
   }
 
   //filter for final reports
   applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.savedReportEmc_dataSource.filter = filterValue.trim().toLowerCase();
   }
 
   retrieveEmcDetails() {
     if(this.currentUser1.role == 'Inspector') {
       //
       this.emcSavedReportService.retrieveListOfClientDetails(this.email).subscribe(
         data => {
           this.emcData=JSON.parse(data);
           for(let i of this.emcData){
             if(i.allStepsCompleted != "AllStepCompleted"){
               this.completedFilterData.push(i);
             }
           }
           this.savedReportEmc_dataSource = new MatTableDataSource(this.completedFilterData);
           this.completedFilterData = [];
           this.emcData = [];
           this.savedReportEmc_dataSource.paginator = this.savedReportEmcPaginator;
           this.savedReportEmc_dataSource.sort = this.savedReportEmcSort;
         });
     }
     else { //viewer
       if(this.currentUser1.assignedBy!=null) {
         this.viewerFilterData=[];
         this.emcSavedReportService.retrieveListOfClientDetails(this.currentUser1.assignedBy).subscribe(
           data => {
             this.userData=JSON.parse(data);
             for(let i of this.emcData){
               if(i.allStepsCompleted != "AllStepCompleted"){
                 this.completedFilterData.push(i);
               }
             }
            this.savedReportEmc_dataSource = new MatTableDataSource(this.completedFilterData);
            this.completedFilterData = [];
            this.emcData = [];
            this.savedReportEmc_dataSource.paginator = this.savedReportEmcPaginator;
            this.savedReportEmc_dataSource.sort = this.savedReportEmcSort;
           });
       } 
     }
         
   }
 
   continue(emcId: any,clientName: any) {
     this.emcParent.continue(emcId,clientName);
   } 
 }
 