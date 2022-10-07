import { Component, OnInit, ViewChild, ViewContainerRef, EventEmitter, Output } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { GlobalsService } from 'src/app/globals.service';
import { BasicDetails } from 'src/app/LPS_model/basic-details';
import { LPSBasicDetailsService } from 'src/app/LPS_services/lpsbasic-details.service';
import { environment } from 'src/environments/environment';
import { SuperAdminDev } from 'src/environments/environment.dev';
import { SuperAdminProd } from 'src/environments/environment.prod';


@Component({
  selector: 'app-lps-saved-report',
  templateUrl: './lps-saved-report.component.html',
  styleUrls: ['./lps-saved-report.component.css']
})
export class LpsSavedReportComponent implements OnInit {
  savedReportsLpsColumns: string[] = [ 'clientName', 
                                       'projectName', 
                                       'consultantName', 
                                       'contractorName', 
                                       'dealerContractorName' , 
                                       'address', 
                                       'updatedDate', 
                                       'updatedBy',
                                       'continue'];
  savedReportLps_dataSource!: MatTableDataSource<BasicDetails[]>;
  @ViewChild('savedReportLpsPaginator', { static: false }) savedReportLpsPaginator!: MatPaginator;
  @ViewChild('savedReportLpsSort', {static: false}) savedReportLpsSort!: MatSort;

  // @Output("changeTab") changeTab: EventEmitter<any> = new EventEmitter();
  @Output() callSavedMethod: EventEmitter<any> = new EventEmitter();
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
  mode: any = 'indeterminate';
  disablepage: boolean=true;
  spinner: boolean=false;
  spinnerValue: String = '';
  enableDelete: boolean = false;
  lpsSummary: String="LpsSummary";
 
 @ViewChild('input') input!: MatInput;
 lpsData: any=[];
completedFilterData: any=[];
  filteredData: any = [];
  superAdminArr: any = [];
  superAdminFlag: boolean = false;
  upDateBasic: any=[]
  deleteSuccess: boolean = false;
  deleteSuccessMsg: String = '';
 // superAdminLocal = new SuperAdminLocal();
  superAdminDev = new SuperAdminDev();
  superAdminProd = new SuperAdminProd();

  constructor(private router: ActivatedRoute,
              public service: GlobalsService,
              public lpsService: LPSBasicDetailsService,
              
  ) { 
    this.email = this.router.snapshot.paramMap.get('email') || '{}'

  }

  ngOnInit(): void {
    //this.superAdminArr = [];
    this.currentUser=sessionStorage.getItem('authenticatedUser');
    this.currentUser1 = [];
    this.currentUser1=JSON.parse(this.currentUser);
    // this.superAdminArr.push('gk@capeindia.net');
    // this.superAdminArr.push('vinoth@capeindia.net');
    // this.superAdminArr.push('awstesting@rushforsafety.com');

    this.retrieveLpsDetails();
   
  }

  //filter for final reports
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.savedReportLps_dataSource.filter = filterValue.trim().toLowerCase();
  }

  retrieveLpsDetails() {

    this.filteredData = [];
    this.completedFilterData=[];

    // for (let i of this.superAdminLocal.adminEmail){
    //   if(this.email == i){
    //     this.superAdminFlag = true;
    //     this.enableDelete = true;
    //   }
    // }
    for(let i of this.superAdminDev.adminEmail) {
      if(this.email == i) {
        this.superAdminFlag = true;
        this.enableDelete = true;
      }
    }

    for(let i of this.superAdminProd.adminEmail) {
      if(this.email == i) {
        this.superAdminFlag = true;
        this.enableDelete = true;
      }
    }

    if(this.superAdminFlag) {
      this.lpsService.retrieveAllBasicLps().subscribe(
        data => {
          this.lpsData=JSON.parse(data);
          for(let i of this.lpsData){
            if(i.allStepsCompleted != "AllStepCompleted" && i.status != 'InActive'){
              this.filteredData.push(i);
            }
          }
          this.savedReportLps_dataSource = new MatTableDataSource(this.filteredData);
          this.filteredData = [];
          this.lpsData = [];
          this.savedReportLps_dataSource.paginator = this.savedReportLpsPaginator;
          this.savedReportLps_dataSource.sort = this.savedReportLpsSort;
        });

        this.superAdminFlag = false;
    }
    else {
      this.lpsService.retrieveListOfBasicLps(this.email).subscribe(
        data => {
          this.lpsData=JSON.parse(data);
          for(let i of this.lpsData){
            if(i.allStepsCompleted != "AllStepCompleted" && i.status != 'InActive'){
              this.completedFilterData.push(i);
            }
          }
          this.savedReportLps_dataSource = new MatTableDataSource(this.completedFilterData);
          this.completedFilterData = [];
          this.lpsData = [];
          this.savedReportLps_dataSource.paginator = this.savedReportLpsPaginator;
          this.savedReportLps_dataSource.sort = this.savedReportLpsSort;
        });
    }
      
  }

  continue(basicLpsId: any) {
    this.spinner=true;
    this.disablepage=false;
    this.spinnerValue = "Please wait, the details are loading!";
    this.callSavedMethod.emit(basicLpsId);
    //this.lpsParent.continue(basicLpsId);
  } 

  deleteBasicLps(basicLpsId: any) {  
    
    this.basicDetails.basicLpsId = basicLpsId;
    this.basicDetails.userName = this.email;  
    this.spinner=true;
    this.disablepage=false;
    this.spinnerValue = "Please wait, the details are loading!";
    this.lpsService.updateLpsBasicDetailsStatus(this.basicDetails).subscribe(
      data => {
        this.deleteSuccess = true;
        this.deleteSuccessMsg = data;
        this.ngOnInit();
        this.spinner=false;
        this.disablepage=true;
        setTimeout(() => {
          this.deleteSuccess = false;
          this.deleteSuccessMsg = '';
          }, 2000);
      }
    )
  } 
}
