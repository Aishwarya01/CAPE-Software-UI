import { Component, OnInit, ViewChild,ChangeDetectorRef } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { BasicDetails } from 'src/app/LPS_model/basic-details';
import { FinalPdfServiceService } from 'src/app/LPS_services/final-pdf-service.service';
import { LPSBasicDetailsService } from 'src/app/LPS_services/lpsbasic-details.service';
import { LpsMatstepperComponent } from '../lps-matstepper/lps-matstepper.component';
import { LpsWelcomePageComponent } from '../lps-welcome-page/lps-welcome-page.component';

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
  lpsData: any=[];
  completedFilterData: any=[];

  constructor(private router: ActivatedRoute,
              private lpsService: LPSBasicDetailsService,
              private ChangeDetectorRef: ChangeDetectorRef,
              private welcome: LpsWelcomePageComponent,
              private finalpdf: FinalPdfServiceService,
              private matstepper:LpsMatstepperComponent) { 
    this.email = this.router.snapshot.paramMap.get('email') || '{}'
  }

  ngOnInit(): void {
    this.currentUser=sessionStorage.getItem('authenticatedUser');
    this.currentUser1 = [];
    this.currentUser1=JSON.parse(this.currentUser);
    this.retrieveLpsDetails();
  }

  //filter for final reports
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.finalReport_dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  retrieveLpsDetails() {
      
      this.lpsService.retrieveListOfBasicLps(this.email).subscribe(
        data => {
          // this.myfunction(data);
          this.lpsData=JSON.parse(data);
          for(let i of this.lpsData){
            if(i.allStepsCompleted=="AllStepCompleted"){
              this.completedFilterData.push(i);
            }
          }
          this.finalReport_dataSource = new MatTableDataSource(this.completedFilterData);
          this.completedFilterData = [];
          this.lpsData = [];
          this.finalReport_dataSource.paginator = this.finalReportPaginator;
          this.finalReport_dataSource.sort = this.finalReportSort;
        });
  }

  refresh() {
    debugger
    this.ChangeDetectorRef.detectChanges();
  }

  userName=this.router.snapshot.paramMap.get('email') || '{}';

  downloadPdf(basicLpsId: any): any {
    debugger
     this.finalpdf.downloadPDF(basicLpsId,this.userName)
   }

    priviewPdf(basicLpsId:any,clientName:any){
     debugger
     this.matstepper.preview(basicLpsId,clientName);
    }
}

