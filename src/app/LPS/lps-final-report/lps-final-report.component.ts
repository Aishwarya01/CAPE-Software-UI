import { Component, OnInit, ViewChild,ChangeDetectorRef,ComponentRef } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalsService } from 'src/app/globals.service';
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

  finalReportsColumns: string[] = [ 'clientName', 
                                    'projectName', 
                                    'consultantName', 
                                    'contractorName', 
                                    'dealerContractorName', 
                                    'address', 
                                    'createdDate', 
                                    'createdBy', 
                                    'action'];
  finalReport_dataSource!: MatTableDataSource<BasicDetails[]>;

  @ViewChild('finalReportPaginator', { static: false }) finalReportPaginator!: MatPaginator;
  @ViewChild('finalReportSort', {static: false}) finalReportSort!: MatSort;

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

  successMsg: string="";
  success: boolean=false;
  Error: boolean=false;
  errorMsg: string="";
  errorArr: any=[];
  disable: boolean=false;
  finalReportSpinner: boolean = false;
  finalReportBody: boolean = true;
  spinnerValue: String = '';
  mode: any= 'indeterminate';

  @ViewChild('input') input!: MatInput;
  clientService: any;
  lpsData: any=[];
  completedFilterData: any=[];
  superAdminArr: any = [];
  filteredData: any = [];
  superAdminFlag: boolean = false;

  constructor(private router: ActivatedRoute,
              private lpsService: LPSBasicDetailsService,
              private ChangeDetectorRef: ChangeDetectorRef,
              private welcome: LpsWelcomePageComponent,
              private finalpdf: FinalPdfServiceService,public service: GlobalsService,
              private matstepper:LpsMatstepperComponent,
              private modalService: NgbModal) { 
    this.email = this.router.snapshot.paramMap.get('email') || '{}'
  }

  ngOnInit(): void {
    this.superAdminArr = [];
    this.currentUser=sessionStorage.getItem('authenticatedUser');
    this.currentUser1 = [];
    this.currentUser1=JSON.parse(this.currentUser);
    this.superAdminArr.push('gk@capeindia.net');
    this.superAdminArr.push('awstesting@rushforsafety.com');
    this.retrieveLpsDetails();
  }
 

  //filter for final reports
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.finalReport_dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  retrieveLpsDetails() {
    this.filteredData = [];
    this.completedFilterData=[];
    for(let i of this.superAdminArr) {
      if(this.email == i) {
        this.superAdminFlag = true;
      }
    }
      
    if(this.superAdminFlag) {
      this.lpsService.retrieveAllBasicLps().subscribe(
        data => {
          // this.myfunction(data);
          this.lpsData=JSON.parse(data);
          for(let i of this.lpsData){
            if(i.allStepsCompleted=="AllStepCompleted"){
              this.filteredData.push(i);
            }
          }
          this.finalReport_dataSource = new MatTableDataSource(this.filteredData);
          this.filteredData = [];
          this.lpsData = [];
          this.finalReport_dataSource.paginator = this.finalReportPaginator;
          this.finalReport_dataSource.sort = this.finalReportSort;
        });
      this.superAdminFlag = false;
    }
    else {
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
      
  }

  closeModalDialog() {
    
    if (this.errorMsg != '') {
      this.Error = false;
      this.modalService.dismissAll((this.errorMsg = ''));
    } else {
      this.success = false;
      this.modalService.dismissAll((this.successMsg = ''));
    }
  }

  refresh() {
    this.ChangeDetectorRef.detectChanges();
  }

  userName=this.router.snapshot.paramMap.get('email') || '{}';

  downloadPdf(basicLpsId: any, projectName: any): any {
     this.finalpdf.downloadPDF(basicLpsId,this.userName, projectName)
   }

   continue(basicLpsId:any,clientName:any){
    this.finalReportBody = false;
    this.finalReportSpinner = true;
    this.spinnerValue = "Please wait, the details are loading!";
    this.service.allFieldsDisable = true;
    this.matstepper.preview(basicLpsId,clientName);
   }

  emailPDF(basicLpsId:any,userName:any, projectName: any){
    this.disable=false;
    this.finalpdf.mailPDF(basicLpsId,userName,projectName).subscribe(
    data => {
    this.success = true;
    this.successMsg = "Email has been sent successfully. Please check your email box.";
    setTimeout(()=>{
      this.success=false;
        },5000);
    },
    error => {
      this.Error = true;
      this.errorArr = [];
      this.errorArr = JSON.parse(error.error);
      this.errorMsg = this.errorArr.message;
      setTimeout(()=>{
        this.Error = false;
        },5000);
    });
  }

  printPDF(basicLpsId:any,userName:any, projectName: any){
    
    this.disable=false;
    this.finalpdf.printPDF(basicLpsId,userName,projectName);
  }
}

