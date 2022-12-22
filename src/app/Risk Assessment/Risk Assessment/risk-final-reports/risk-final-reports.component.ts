import { Component, EventEmitter, OnInit, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalsService } from 'src/app/globals.service';
import { SuperAdminDev } from 'src/environments/environment.dev';
import { SuperAdminProd } from 'src/environments/environment.prod';
import { CustomerDetails } from '../../Risk Assesment Model/customer-details';
import { CustomerDetailsServiceService } from '../../Risk Assessment Services/customer-details-service.service';
import { RiskfinalpdfService } from '../../Risk Assessment Services/riskfinalpdf.service';

@Component({
  selector: 'app-risk-final-reports',
  templateUrl: './risk-final-reports.component.html',
  styleUrls: ['./risk-final-reports.component.css']
})
export class RiskFinalReportsComponent implements OnInit {

  finalReportsColumns: string[] = [ 'organisationName', 
                                    'projectName', 
                                    'contactPersonName',
                                    'updatedDate', 
                                    'updatedBy',
                                    'action'];
  finalReport_dataSource!: MatTableDataSource<[CustomerDetails]>;

  @ViewChild('finalReportPaginator', { static: false }) finalReportPaginator!: MatPaginator;
  @ViewChild('finalReportSort', {static: false}) finalReportSort!: MatSort;

  @Output() callFinalMethod: EventEmitter<any> = new EventEmitter();
  email: String ="";
  customerDetailsModel = new CustomerDetails();
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
  globalErrorMsg: string="";

  @ViewChild('input') input!: MatInput;
  clientService: any;
  lpsData: any=[];
  completedFilterData: any=[];
  superAdminArr: any = [];
  filteredData: any = [];
  superAdminFlag: boolean = false;
  superAdminDev = new SuperAdminDev();
  superAdminProd = new SuperAdminProd();
  globalError: boolean=false;

  constructor(private router: ActivatedRoute,
              private ChangeDetectorRef: ChangeDetectorRef,
              public service: GlobalsService,
              private riskPdf: RiskfinalpdfService,
              private customerDetailsService :CustomerDetailsServiceService,
              private modalService: NgbModal) { 
    this.email = this.router.snapshot.paramMap.get('email') || '{}'
  }

  ngOnInit(): void {
    //this.superAdminArr = [];
    this.currentUser=sessionStorage.getItem('authenticatedUser');
    this.currentUser1 = [];
    this.currentUser1=JSON.parse(this.currentUser);
    // this.superAdminArr.push('gk@capeindia.net');
    // this.superAdminArr.push('awstesting@rushforsafety.com');
    this.retrieveRiskDetails(this.customerDetailsModel.riskId);
  }
 

  //filter for final reports
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.finalReport_dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  retrieveRiskDetails(riskId:any) {
    this.filteredData = [];
    this.completedFilterData=[];
    for(let i of this.superAdminDev.adminEmail) {
      if(this.email == i) {
        this.superAdminFlag = true;
      }
    }

    for(let i of this.superAdminProd.riskAdminEmail) {
      if(this.email == i) {
        this.superAdminFlag = true;
      }
    }
      
    if(this.superAdminFlag) {
      this.customerDetailsService.retriveAllCustomerDetails().subscribe(
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
        },
        error=>{
          this.globalError=true;
          this.globalErrorMsg=this.service.globalErrorMsg;
          setTimeout(() => {
            this.globalError=false;
            this.globalErrorMsg="";
          }, 10000);
        });
      this.superAdminFlag = false;
    }
    else {
      this.customerDetailsService.retrieveCustomerDetailsBasedOnUserName(this.email).subscribe(
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
        },
        error=>{
          this.globalError=true;
          this.globalErrorMsg=this.service.globalErrorMsg;
          setTimeout(() => {
            this.globalError=false;
            this.globalErrorMsg="";
          }, 3000);
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

  downloadPdf(riskId: any, projectName: any): any {
     this.riskPdf.downloadPDF(riskId,this.userName, projectName)
   }

   continue(basicLpsId:any){
    this.finalReportBody = false;
    this.finalReportSpinner = true;
    this.spinnerValue = "Please wait, the details are loading!";
    this.service.allFieldsDisable = true;
    this.callFinalMethod.emit(basicLpsId);
    //this.matstepper.preview(basicLpsId);
   }

  emailPDF(riskId:any,userName:any, projectName: any){
    this.disable=false;
    this.riskPdf.mailPDF(riskId,userName,projectName).subscribe(
    data => {
    this.success = true;
    this.successMsg = "Email has been sent successfully. Please check your email box.";
    setTimeout(()=>{
      this.success=false;
        },5000);
    },
    error => {
      this.Error = true;
      // this.errorArr = [];
      // this.errorArr = JSON.parse(error.error);
      this.errorMsg = this.service.globalErrorMsg;
      setTimeout(()=>{
        this.Error = false;
        this.errorMsg="";
        },5000);
    });
  }

  printPDF(riskId:any,userName:any, projectName: any){
    
    this.disable=false;
    this.riskPdf.printPDF(riskId,userName,projectName);
  }

}
