import { Component, OnInit, ViewChild,Output,EventEmitter, Input, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { InspectionVerificationBasicInformationComponent } from '../inspection-verification-basic-information/inspection-verification-basic-information.component';
import { Site } from '../model/site';
import { ClientService } from '../services/client.service';
import { DepartmentService } from '../services/department.service';
import { SiteService } from '../services/site.service';
import { VerificationlvComponent } from '../verificationlv/verificationlv.component';
import { GlobalsService } from '../globals.service';
import { MatInput } from '@angular/material/input';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-savedreports',
  templateUrl: './savedreports.component.html',
  styleUrls: ['./savedreports.component.css']
})
export class SavedreportsComponent implements OnInit {

  savedReportsColumns: string[] = [ 'siteCD', 'siteName', 'personIncharge', 'contactNumber', 'contactDetails', 'state', 'country', 'continue'];
  savedReport_dataSource!: MatTableDataSource<Site[]>;
  @ViewChild('savedReportPaginator', { static: true }) savedReportPaginator!: MatPaginator;
  @ViewChild('savedReportSort', {static: true}) savedReportSort!: MatSort;

  // @Output("changeTab") changeTab: EventEmitter<any> = new EventEmitter();
  email: String ="";
  site = new Site;
  siteName: String="";
  clientList:any  = [];
  departmentList: any = [];
  noDetails: boolean=false;
  noDetailsRec: boolean=false;
  showTIC: boolean = false;
  showREP: boolean = false;
  currentUser: any = [];
  currentUser1: any = [];
  userData: any=[];
  viewerFilterData:any=[];
  selectedIndex: number=0;
 
 @ViewChild('input') input!: MatInput;

  constructor(private router: ActivatedRoute,
              private clientService: ClientService,
              private departmentService: DepartmentService,
              private siteService: SiteService,
              public service: GlobalsService,
              private verification: VerificationlvComponent
  ) { 
    this.email = this.router.snapshot.paramMap.get('email') || '{}'

  }

  ngOnInit(): void {
    // this.retrieveClientDetails();
    this.currentUser=sessionStorage.getItem('authenticatedUser');
    this.currentUser1 = [];
    this.currentUser1=JSON.parse(this.currentUser);
    this.retrieveSiteDetails();
   setTimeout(() => this.input.focus(), 500);
    this.siteName=this.service.filterSiteName;
    // if(this.service.filterSiteName){
    //   this.applyFilter(this.siteName);
    // }
   
  }

  applyFilter(siteName:any) {
    if(siteName!=undefined && siteName!=""){
    const filterValue = siteName
    this.savedReport_dataSource.filter = filterValue.toLowerCase();
    }
    else{
      this.service.highlightText=false;
    }
  }
  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.savedReport_dataSource.filter = filterValue.trim().toLowerCase();
    if (this.savedReport_dataSource.paginator) {
      this.savedReport_dataSource.paginator.firstPage();
    }
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
    if(this.currentUser1.role == 'Inspector') {
      this.siteService.retrieveListOfSite(this.email).subscribe(
        data => {
         this.savedReport_dataSource = new MatTableDataSource(JSON.parse(data));
          this.savedReport_dataSource.paginator = this.savedReportPaginator;
          this.savedReport_dataSource.sort = this.savedReportSort;
        });
    }
    else { //viewer
      if(this.currentUser1.assignedBy!=null) {
        this.viewerFilterData=[];
        this.siteService.retrieveListOfSite(this.currentUser1.assignedBy).subscribe(
          data => {
            this.userData=JSON.parse(data);
           for(let i of this.userData){
             if(i.assignedTo==this.email){
               this.viewerFilterData.push(i);
             }
           }
           this.savedReport_dataSource = new MatTableDataSource(this.viewerFilterData);
            this.savedReport_dataSource.paginator = this.savedReportPaginator;
            this.savedReport_dataSource.sort = this.savedReportSort;
          });
      } 
    }
        
  }

  deleteSite(siteName: any) {

  }

  continue(siteId: any,userName :any,site: any) {
    //this.service.commentScrollToBottom=1;
    this.verification.changeTabSavedReport(0,siteId,userName,'clientName','departmentName',site);
  }
  savedContinue()
  {
    if(this.verification.noDetails==true){
    this.noDetailsRec=true;
    setTimeout(() => {
      this.noDetailsRec = false;
    }, 3000);
   }
  }
}
