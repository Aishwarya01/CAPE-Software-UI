import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { GlobalsService } from 'src/app/globals.service';
import { EmcSavedReportService } from 'src/app/EMC_Services/emc-saved-report.service';
import { EmcClientDetails } from 'src/app/EMC_Model/emc-client-details';
import { SuperAdminDev } from 'src/environments/environment.dev';
import { SuperAdminProd } from 'src/environments/environment.prod';
import { LicenselistComponent } from 'src/app/licenselist/licenselist.component';


@Component({
  selector: 'app-emc-saved-report',
  templateUrl: './emc-saved-report.component.html',
  styleUrls: ['./emc-saved-report.component.css']
})
export class EmcSavedReportComponent implements OnInit {

  savedReportsEmcColumns: string[] = [ 'clientName', 'contactPerson', 'clientLocation', 'clientAddress', 'updatedDate', 'updatedBy','continue'];
  savedReportEmc_dataSource!: MatTableDataSource<EmcClientDetails[]>;
  @ViewChild('savedReportEmcPaginator', {static: false}) savedReportEmcPaginator!: MatPaginator;
  @ViewChild('savedReportEmcSort', {static: false}) savedReportEmcSort!: MatSort;

   // @Output("changeTab") changeTab: EventEmitter<any> = new EventEmitter();
   email: String ="";
   @Output() savedReportEvent: EventEmitter<any> = new EventEmitter<{emcId: any, clientName: any, flag: boolean}>();
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
   enableDelete: boolean = false;
   //viewerFilterData:any=[];
   selectedIndex: number=0;
   savedReportSpinner: boolean = false;
   savedReportBody: boolean = true;
   spinnerValue: String = '';
   mode: any = 'indeterminate';
  
  @ViewChild('input') input!: MatInput;
  emcData: any=[];
 completedFilterData: any=[];
  superAdminArr: any = [];
  superAdminFlag: boolean = false;
  filteredData: any = [];
  deleteSuccess: boolean = false;
  deleteSuccessMsg: String = '';
  superAdminDev = new SuperAdminDev();
  superAdminProd = new SuperAdminProd();
  Error: boolean=false;
  errorMsg: string="";
  deleteError: boolean=false;
  deleteErrorMsg: string="";
  disablepage: boolean=true;
 
   constructor(private router: ActivatedRoute,
               public service: GlobalsService,
               public emcSavedReportService: EmcSavedReportService,
               public licenselist: LicenselistComponent,
   ) { 
     this.email = this.router.snapshot.paramMap.get('email') || '{}'
   }
 
   ngOnInit(): void {
    //this.superAdminArr = [];
    this.currentUser=sessionStorage.getItem('authenticatedUser');
    this.currentUser1 = [];
    this.currentUser1=JSON.parse(this.currentUser);
    // this.superAdminArr.push('gk@capeindia.net');
    // this.superAdminArr.push('awstesting@rushforsafety.com');
    // this.superAdminArr.push('vinoth@capeindia.net');
    this.retrieveEmcDetails();
    
   }
 
   //filter for final reports
   applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.savedReportEmc_dataSource.filter = filterValue.trim().toLowerCase();
   }
 
   retrieveEmcDetails() {
    this.filteredData = [];
    this.completedFilterData=[];
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
      this.emcSavedReportService.retrieveAllCLientDetails().subscribe(
        data => {
          this.emcData=JSON.parse(data);
          for(let i of this.emcData){
            if(i.allStepsCompleted != "AllStepCompleted"){
              this.filteredData.push(i);
            }
          }
          this.savedReportEmc_dataSource = new MatTableDataSource(this.filteredData);
          this.filteredData = [];
          this.emcData = [];
          this.savedReportEmc_dataSource.paginator = this.savedReportEmcPaginator;
          this.savedReportEmc_dataSource.sort = this.savedReportEmcSort;
        },
        error=>{
          this.Error = true;
          this.errorMsg = this.service.globalErrorMsg;
          setTimeout(()=>{
            this.Error = false;
          }, 20000);
        });
    }
    else if(this.currentUser1.role=='Inspector') {
      this.emcSavedReportService.retrieveListOfClientDetails(this.email).subscribe(
        data => {
          this.emcData=JSON.parse(data);
          for(let i of this.emcData){
            if(i.allStepsCompleted != "AllStepCompleted" && i.status != 'InActive'){
              this.completedFilterData.push(i);
            }
          }
          this.savedReportEmc_dataSource = new MatTableDataSource(this.completedFilterData);
          this.completedFilterData = [];
          this.emcData = [];
          this.savedReportEmc_dataSource.paginator = this.savedReportEmcPaginator;
          this.savedReportEmc_dataSource.sort = this.savedReportEmcSort;
        },
        error=>{
          this.Error = true;
          this.errorMsg = this.service.globalErrorMsg;
          setTimeout(()=>{
            this.Error = false;
          }, 20000);
        });
    } 
    // Viewer configuration
    else {
      this.emcSavedReportService.retriveEMCIsActive(this.email).subscribe(
        data => {
          this.emcData=JSON.parse(data);
            if(this.emcData.allStepsCompleted != "AllStepCompleted" && this.emcData.status != 'InActive'){
              this.completedFilterData.push(this.emcData);
            }
          this.savedReportEmc_dataSource = new MatTableDataSource(this.completedFilterData);
          this.completedFilterData = [];
          this.emcData = [];
          this.savedReportEmc_dataSource.paginator = this.savedReportEmcPaginator;
          this.savedReportEmc_dataSource.sort = this.savedReportEmcSort;
        },
        error=>{
          this.Error = true;
          this.errorMsg = this.service.globalErrorMsg;
          setTimeout(()=>{
            this.Error = false;
          }, 20000);
        });
    }
   }
 
   continue(emcId: any,clientName: any) {
    if(this.service.triggerMsgForLicense=='emcPage'){
      this.licenselist.editEmckData(emcId);
    }else{
      this.savedReportBody = false;
      this.savedReportSpinner = true;
      this.disablepage=false;
      this.spinnerValue = "Please wait, the details are loading!";
      //this.service.commentScrollToBottom=1;
      //  this.service.allFieldsDisable = false;
      // this.service.disableSubmitSummary=false;
      this.savedReportEvent.emit({emcId,clientName,flag: true});
      //this.emcParent.continue(emcId,clientName,true);}
    }
   } 

   deleteBasicEmc(emcId:any){
    this.emcClientDetails.emcId = emcId;
    this.emcClientDetails.userName = this.email;
    this.savedReportBody = false;
    this.savedReportSpinner = true;
    this.disablepage=false;
    this.spinnerValue = "Please wait, the details are loading!";
    this.emcSavedReportService.updateClientDetailsStatus(this.emcClientDetails).subscribe(
      data => {
        this.deleteSuccess = true;
        this.deleteSuccessMsg = data;
        this.ngOnInit();
        this.disablepage=true;
        this.savedReportBody = true;
        this.savedReportSpinner = false;
        setTimeout(() => {
          this.deleteSuccess = false;
          this.deleteSuccessMsg = '';
        }, 2000);
      },
      error=>{
        this.deleteError=true;
        this.deleteErrorMsg=this.service.globalErrorMsg;
        setTimeout(() => {
          this.deleteError = false;
          this.deleteErrorMsg = '';
        }, 2000);
      }
    )
   }
 }
 