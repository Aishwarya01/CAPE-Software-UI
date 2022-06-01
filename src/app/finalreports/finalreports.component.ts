import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SuperAdminDev } from 'src/environments/environment.dev';
import { SuperAdminProd } from 'src/environments/environment.prod';
import { GlobalsService } from '../globals.service';
import { Site } from '../model/site';
import { ClientService } from '../services/client.service';
import { DepartmentService } from '../services/department.service';
import { InspectionVerificationService } from '../services/inspection-verification.service';
import { SiteService } from '../services/site.service';
import { VerificationlvComponent } from '../verificationlv/verificationlv.component';

@Component({
  selector: 'app-finalreports',
  templateUrl: './finalreports.component.html',
  styleUrls: ['./finalreports.component.css']
})
export class FinalreportsComponent implements OnInit {
  finalReportsColumns: string[] = [ 'siteCD', 'siteName', 'personIncharge', 'contactNumber', 'contactDetails', 'state', 'country', 'action'];
  finalReport_dataSource!: MatTableDataSource<Site[]>;
  @ViewChild('finalReportPaginator', { static: true }) finalReportPaginator!: MatPaginator;
  @ViewChild('finalReportSort', {static: true}) finalReportSort!: MatSort;

  email: String ="";
  site = new Site;
  clientList:any  = [];
  departmentList: any = [];
  currentUser: any = [];
  currentUser1: any = [];
  noDetails: boolean=false;
  noDetailsRec: boolean=false;
  noDetailsRecMsg:String="";
  inspectorData: any = [];
  disable: boolean=false;
 //ongoingFilterData:any=[];
  completedFilterData:any=[];
  allData: any = [];
  superAdminFlag: boolean = false;
  filteredData: any;
  superAdminArr: any = [];
  value: boolean = false;
  successMsg: string="";
  success: boolean=false;
  Error: boolean=false;
  errorMsg: string="";
  errorArr: any=[];
  mode: any= 'indeterminate';
  finalReportSpinner: boolean = false;
  finalReportBody: boolean = true;
  spinnerValue: String = '';
  superAdminDev = new SuperAdminDev();
  superAdminProd = new SuperAdminProd();

  constructor(private router: ActivatedRoute,
              private clientService: ClientService,
              private departmentService: DepartmentService,
              private siteService: SiteService,
              private inspectionService: InspectionVerificationService,
              private verification: VerificationlvComponent,
              public service: GlobalsService,

  ) { 
    this.email = this.router.snapshot.paramMap.get('email') || '{}'
  }

  ngOnInit(): void {
    this.superAdminArr = [];
    this.currentUser=sessionStorage.getItem('authenticatedUser');
    this.currentUser1 = [];
    this.currentUser1=JSON.parse(this.currentUser);
    // this.retrieveClientDetails();
    //this.superAdminArr.push('gk@capeindia.net');
    this.retrieveSiteDetails();
  }

//filter for final reports
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.finalReport_dataSource.filter = filterValue.trim().toLowerCase();
}

  private retrieveClientDetails() {
    this.clientService.retrieveClient(this.email).subscribe(
      data => {
            this.clientList=JSON.parse(data);              
      });
  }

  changeClient(e: any) {
    let changedValue = e.target.value;
    this.departmentList = [];
      for(let a of this.clientList) {
        if( a.clientName == changedValue) {
          this.departmentService.retrieveDepartment(this.email,a.clientName).subscribe(
            data => {
              this.departmentList = JSON.parse(data)
            }
          )};
      }
  }

  retrieveSiteDetails() {
    //this.ongoingFilterData=[];
    this.filteredData = [];
    this.completedFilterData=[];
    //dev
    for(let i of this.superAdminDev.adminEmail) {
      if(this.email == i) {
        this.superAdminFlag = true;
      }
    }
    //Production
    for(let i of this.superAdminProd.adminEmail) {
      if(this.email == i) {
        this.superAdminFlag = true;
      }
    }

    if(this.superAdminFlag) {
      this.siteService.retrieveAllSite(this.email).subscribe(
        data => {
          this.allData = JSON.parse(data);
          for(let i of this.allData) {
            if(i.allStepsCompleted == "AllStepCompleted") {
              this.filteredData.push(i);
            }
          }
          this.finalReport_dataSource = new MatTableDataSource(this.filteredData);
          this.finalReport_dataSource.paginator = this.finalReportPaginator;
          this.finalReport_dataSource.sort = this.finalReportSort;
        });

      this.superAdminFlag = false;
    }
    else {
      if(this.currentUser1.role == 'Inspector') {
        this.siteService.retrieveListOfSite(this.email).subscribe(
          data => {
            this.inspectorData=JSON.parse(data);
            for(let i of this.inspectorData){
                if(i.allStepsCompleted=="AllStepCompleted"){
                  this.completedFilterData.push(i);
                }
                // else{
                //  this.ongoingFilterData.push(i);
                // }
            }
            this.finalReport_dataSource = new MatTableDataSource(this.completedFilterData);
            this.finalReport_dataSource.paginator = this.finalReportPaginator;
            this.finalReport_dataSource.sort = this.finalReportSort;
          });
      }
      else {
        if(this.currentUser1.assignedBy!=null) {
          this.siteService.retrieveListOfSite(this.currentUser1.assignedBy).subscribe(
            data => {
              this.inspectorData=JSON.parse(data);
              for(let i of this.inspectorData){
                  if(i.allStepsCompleted=="AllStepCompleted"){
                    this.completedFilterData.push(i);
                  }
                  // else{
                  //  this.ongoingFilterData.push(i);
                  // }
              }
              this.finalReport_dataSource = new MatTableDataSource(this.completedFilterData);
              this.finalReport_dataSource.paginator = this.finalReportPaginator;
              this.finalReport_dataSource.sort = this.finalReportSort;
            });
        } 
      }
    }   
  }
 
  continue(siteId: any,userName :any,site: any) {
    this.finalReportBody = false;
    this.finalReportSpinner = true;
    this.spinnerValue = "Please wait, the details are loading!";
   if(this.service.allStepsCompleted==false){
    this.service.allFieldsDisable = true;
    this.verification.changeTabSavedReport(0,siteId,userName,'clientName','departmentName',site,false);
   }
  }
  savedContinue()
  {
    if(this.verification.noDetails==true){
    this.noDetailsRec=true;
    this.noDetailsRecMsg="No details found for this Record";
    setTimeout(() => {
      this.noDetailsRec = false;
      this.noDetailsRecMsg='';
    }, 3000);
   }
  }

  downloadPdf(siteId: any,userName: any, siteName: any): any {
    // this.disable=false;
     this.inspectionService.downloadPDF(siteId,userName, siteName)
   }
 
   pdfModal(siteId: any,userName: any, siteName: any){
     this.disable=false;
     this.inspectionService.printPDF(siteId,userName,siteName)
   }
 
   emailPDF(siteId: any,userName: any, siteName: any){
     this.disable=false;
     this.inspectionService.mailPDF(siteId,userName, siteName).subscribe(
     data => {
     this.success = true;
     this.successMsg = "Email has been sent successfully. Please check your email box.";
     setTimeout(()=>{
       this.success=false;
   }, 3000);
     },
     error => {
       this.Error = true;
       this.errorArr = [];
       this.errorArr = JSON.parse(error.error);
       this.errorMsg = this.errorArr.message;
       setTimeout(()=>{
         this.Error = false;
     }, 3000);
     }
       );
   }

}
