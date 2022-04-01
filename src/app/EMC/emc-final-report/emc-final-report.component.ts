import { Component, OnInit, ViewChild,ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmcClientDetails } from 'src/app/EMC_Model/emc-client-details';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { EmcClientDetailsService } from 'src/app/EMC_Services/emc-client-details.service';
import { EmcMatstepperComponent } from '../emc-matstepper/emc-matstepper.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmcSavedReportService } from 'src/app/EMC_Services/emc-saved-report.service';
import { GlobalsService } from 'src/app/globals.service';

@Component({
  selector: 'app-emc-final-report',
  templateUrl: './emc-final-report.component.html',
  styleUrls: ['./emc-final-report.component.css']
})
export class EmcFinalReportComponent implements OnInit {

  finalReportsColumns: string[] = [ 'clientName', 'contactPerson', 'clientLocation', 'clientAddress', 'createdDate', 'createdBy','action'];
  finalReport_dataSource!: MatTableDataSource<EmcClientDetails[]>;

  @ViewChild('finalReportPaginator', { static: true }) finalReportPaginator!: MatPaginator;
  @ViewChild('finalReportSort', {static: true}) finalReportSort!: MatSort;

  email: String ="";
  emcClientDetails = new EmcClientDetails();
  clientName: String="";
  clientList:any  = [];
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
  mode: any = 'indeterminate';

  @ViewChild('input') input!: MatInput;
  clientService: any;
  emcData: any=[];
  completedFilterData: any=[];
  superAdminArr: any = [];
  filteredData: any = [];
  superAdminFlag: boolean = false;

  constructor(private router: ActivatedRoute,
              private emcSavedReportService: EmcSavedReportService,
              private ChangeDetectorRef: ChangeDetectorRef,
              // private finalpdf: FinalPdfServiceService,
              public service: GlobalsService,
              public emcParent: EmcMatstepperComponent,
              private emcmatstepper:EmcMatstepperComponent,
              public emcClientDetailsService: EmcClientDetailsService,
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
    this.retrieveEmcDetails();
  }

  //filter for final reports
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.finalReport_dataSource.filter = filterValue.trim().toLowerCase();
  }

  retrieveEmcDetails() {
    this.filteredData = [];
    this.completedFilterData=[];
    for(let i of this.superAdminArr) {
      if(this.email == i) {
        this.superAdminFlag = true;
      }
    }
    
    if(this.superAdminFlag) {
      this.emcSavedReportService.retrieveAllCLientDetails().subscribe(
        data => {
          // this.myfunction(data);
          this.emcData=JSON.parse(data);
          for(let i of this.emcData){
            if(i.allStepsCompleted=="AllStepCompleted"){
              this.filteredData.push(i);
            }
          }
          this.finalReport_dataSource = new MatTableDataSource(this.filteredData);
          this.filteredData = [];
          this.emcData = [];
          this.finalReport_dataSource.paginator = this.finalReportPaginator;
          this.finalReport_dataSource.sort = this.finalReportSort;
        });
        this.superAdminFlag = false;
    }
    else {
      this.emcSavedReportService.retrieveListOfClientDetails(this.email).subscribe(
        data => {
          // this.myfunction(data);
          this.emcData=JSON.parse(data);
          for(let i of this.emcData){
            if(i.allStepsCompleted=="AllStepCompleted"){
              this.completedFilterData.push(i);
            }
          }
          this.finalReport_dataSource = new MatTableDataSource(this.completedFilterData);
          this.completedFilterData = [];
          this.emcData = [];
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

continue(emcId: any,clientName: any) {
  this.finalReportBody = false;
  this.finalReportSpinner = true;
  this.spinnerValue = "Please wait, the details are loading!";
  this.service.allStepsCompletedEmc = true;
   this.emcParent.preview(emcId,clientName,false);
 } 

userName=this.router.snapshot.paramMap.get('email') || '{}';

// downloadPdf(basicLpsId: any): any {
//    this.finalpdf.downloadPDF(basicLpsId,this.userName)
//  }

// priviewPdf(basicLpsId:any,clientName:any){
   
//    this.matstepper.preview(basicLpsId,clientName);
//  }

// emailPDF(basicLpsId:any,userName:any){
//   this.disable=false;
//   this.finalpdf.mailPDF(basicLpsId,userName).subscribe(
//   data => {
//   this.success = true;
//   this.successMsg = data;
//   setTimeout(()=>{
//     this.success=false;
//       },5000);
//   },
//   error => {
//     this.Error = true;
//     this.errorArr = [];
//     this.errorArr = JSON.parse(error.error);
//     this.errorMsg = this.errorArr.message;
//     setTimeout(()=>{
//       this.Error = false;
//       },5000);
//   });
// }

// printPDF(basicLpsId:any,userName:any){
  
//   this.disable=false;
//   this.finalpdf.printPDF(basicLpsId,userName)
// }
printPDF(emcId: any,userName: any, clientName: any){
 // this.disable=false;
  this.emcClientDetailsService.printPDF(emcId,userName,clientName)
}
downloadPdf(emcId: any,userName: any, clientName: any): any {
  // this.disable=false;
   this.emcClientDetailsService.downloadPDF(emcId,userName, clientName)
 }
 emailPDF(emcId: any,userName: any, clientName: any){
  this.disable=false;
  this.emcClientDetailsService.mailPDF(emcId,userName, clientName).subscribe(
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
