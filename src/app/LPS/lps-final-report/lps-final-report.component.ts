import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { GlobalsService } from 'src/app/globals.service';
import { BasicDetails } from 'src/app/LPS_model/basic-details';
import { LPSBasicDetailsService } from 'src/app/LPS_services/lpsbasic-details.service';

@Component({
  selector: 'app-lps-final-report',
  templateUrl: './lps-final-report.component.html',
  styleUrls: ['./lps-final-report.component.css']
})
export class LpsFinalReportComponent implements OnInit {

  finalReportsColumns: string[] = [ 'clientName', 'projectName', 'consultantName', 'contractorName', 'dealerContractorName' , 'address', 'createdDate', 'createdBy', 'preview' , 'download'];
  finalReport_dataSource!: MatTableDataSource<BasicDetails[]>;

  @ViewChild('finalReportPaginator', { static: true }) finalReportPaginator!: MatPaginator;
  @ViewChild('finalReportSort', {static: true}) finalReportSort!: MatSort;

  email: String ="";
  basicDetails = new BasicDetails();
  clientName: String="";
  clientList:any  = [];
  departmentList: any = [];
  noDetails: boolean=false;
  noDetailsRec: boolean=false;
  noDetailsRecMsg:String="";
  showTIC: boolean = false;
  showREP: boolean = false;
  currentUser: any = [];
  currentUser1: any = [];
  userData: any=[];
  viewerFilterData:any=[];
  selectedIndex: number=0;

  @ViewChild('input') input!: MatInput;
  clientService: any;

  constructor(private router: ActivatedRoute,
              public service: GlobalsService,
              public lpsService: LPSBasicDetailsService,
  ) { 
    this.email = this.router.snapshot.paramMap.get('email') || '{}'
  }

  ngOnInit(): void {
    this.currentUser=sessionStorage.getItem('authenticatedUser');
    this.currentUser1 = [];
    this.currentUser1=JSON.parse(this.currentUser);
    this.retrieveSiteDetails();

  }

  //filter for final reports
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.finalReport_dataSource.filter = filterValue.trim().toLowerCase();
  }

  // private retrieveClientDetails() {
  //   this.clientService.retrieveClient(this.email).subscribe(
  //     data=> {
  //           this.clientList=JSON.parse(data);              
  //     });
  // }

  // changeClient(e: any) {
  //   let changedValue = e.target.value;
  //   this.departmentList = [];
  //     for(let a of this.clientList) {
  //       if( a.clientName == changedValue) {
  //         this.departmentService.retrieveDepartment(this.email,a.clientName).subscribe(
  //           data => {
  //             this.departmentList = JSON.parse(data)
  //           }
  //         )};
  //     }
  // }

  retrieveSiteDetails() {
    if(this.currentUser1.role == 'Inspector') {
      this.lpsService.retrieveListOfBasicLps(this.email).subscribe(
        data => {
          this.finalReport_dataSource = new MatTableDataSource(JSON.parse(data));
          this.finalReport_dataSource.paginator = this.finalReportPaginator;
          this.finalReport_dataSource.sort = this.finalReportSort;
        });
    }
    else { //viewer
      if(this.currentUser1.assignedBy!=null) {
        this.viewerFilterData=[];
        this.lpsService.retrieveListOfBasicLps(this.currentUser1.assignedBy).subscribe(
          data => {
            this.userData=JSON.parse(data);
           for(let i of this.userData){
             if(i.assignedTo==this.email){
               this.viewerFilterData.push(i);
             }
           }
            this.finalReport_dataSource = new MatTableDataSource(JSON.parse(data));
            this.finalReport_dataSource.paginator = this.finalReportPaginator;
            this.finalReport_dataSource.sort = this.finalReportSort;
          });
      } 
    }
        
  }

  deleteSite(siteName: any) {

  }

  continue(siteId: any) {
    
  }
}

