import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Site } from '../model/site';
import { ClientService } from '../services/client.service';
import { DepartmentService } from '../services/department.service';
import { SiteService } from '../services/site.service';

@Component({
  selector: 'app-finalreports',
  templateUrl: './finalreports.component.html',
  styleUrls: ['./finalreports.component.css']
})
export class FinalreportsComponent implements OnInit {
  finalReportsColumns: string[] = [ 'siteCD', 'siteName', 'personIncharge', 'contactNumber', 'contactDetails', 'state', 'country', 'preview' , 'download'];
  finalReport_dataSource!: MatTableDataSource<Site[]>;
  @ViewChild('finalReportPaginator', { static: true }) finalReportPaginator!: MatPaginator;
  @ViewChild('finalReportSort', {static: true}) finalReportSort!: MatSort;

  email: String ="";
  site = new Site;
  clientList:any  = [];
  departmentList: any = [];
  constructor(private router: ActivatedRoute,
              private clientService: ClientService,
              private departmentService: DepartmentService,
              private siteService: SiteService,
  ) { 
    this.email = this.router.snapshot.paramMap.get('email') || '{}'
  }

  ngOnInit(): void {
    this.retrieveClientDetails();
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
      this.siteService.retrieveListOfSite(this.site).subscribe(
        data => {
          this.finalReport_dataSource = new MatTableDataSource(JSON.parse(data));
          this.finalReport_dataSource.paginator = this.finalReportPaginator;
          this.finalReport_dataSource.sort = this.finalReportSort;
        });
  }

  deleteSite(siteName: any) {

  }

  continue(siteId: any) {
    
  }
}
