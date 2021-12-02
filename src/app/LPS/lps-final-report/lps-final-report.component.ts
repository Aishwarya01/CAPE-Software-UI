import { Component, OnInit, ViewChild,ChangeDetectorRef,ComponentRef } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  finalReportsColumns: string[] = [ 'clientName', 'projectName', 'consultantName', 'contractorName', 'dealerContractorName' , 'address', 'createdDate', 'createdBy', 'action'];
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

  successMsg: string="";
  success: boolean=false;
  Error: boolean=false;
  errorMsg: string="";
  errorArr: any=[];
  disable: boolean=false;

  @ViewChild('input') input!: MatInput;
  clientService: any;
  lpsData: any=[];
  completedFilterData: any=[];

  constructor(private router: ActivatedRoute,
              private lpsService: LPSBasicDetailsService,
              private ChangeDetectorRef: ChangeDetectorRef,
              private welcome: LpsWelcomePageComponent,
              private finalpdf: FinalPdfServiceService,
              private matstepper:LpsMatstepperComponent,
              private modalService: NgbModal) { 
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

  downloadPdf(basicLpsId: any): any {
     this.finalpdf.downloadPDF(basicLpsId,this.userName)
   }

  priviewPdf(basicLpsId:any,clientName:any){
     
     this.matstepper.preview(basicLpsId,clientName);
   }

  // emailMsg(content: any){
  //   this.modalService.open(content, { centered: true });
  // }

  emailPDF(basicLpsId:any,userName:any){
    debugger
    this.disable=false;
    this.finalpdf.mailPDF(basicLpsId,userName).subscribe(
    data => {
    this.success = true;
    this.successMsg = data;
    setTimeout(()=>{
      this.success=false;
        },5000);
    },
    error => {
      debugger
      this.Error = true;
      this.errorArr = [];
      this.errorArr = JSON.parse(error.error);
      this.errorMsg = this.errorArr.message;
      setTimeout(()=>{
        this.Error = false;
        },5000);
    });
  }

  printPDF(basicLpsId:any,userName:any){
    
    this.disable=false;
    this.finalpdf.printPDF(basicLpsId,userName)
  }
}

