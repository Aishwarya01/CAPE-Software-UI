import { Component, OnInit, Output, ViewChild,ViewContainerRef,EventEmitter} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AddlicenseComponent } from '../addlicense/addlicense.component';
import { AssignViewerComponent } from '../assign-viewer/assign-viewer.component';
import { Company } from '../model/company';
import { Site } from '../model/site';
import { SiteService } from '../services/site.service';
import { VerificationlvComponent } from '../verificationlv/verificationlv.component';
import { ComponentFactoryResolver } from '@angular/core';
import { GlobalsService } from '../globals.service';
import { FinalreportsComponent } from '../finalreports/finalreports.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InspectorregisterService } from '../services/inspectorregister.service';

@Component({
  selector: 'app-licenselist',
  templateUrl: './licenselist.component.html',
  styleUrls: ['./licenselist.component.css']
})

export class LicenselistComponent implements OnInit {

  licenseForm = new FormGroup({
    noOfAvailableLicense: new FormControl(''),
  })
  panelOpenState = false;
  noofLicense!: number;

  ongoingSiteColumns: string[] = [
    'siteCd',
    'site',
    'country',
    'city',
    'createdDate',
    'createdBy',
    'updatedDate',
    'updatedBy',
    'action',
  ];
  // ongoingSite_dataSource!: MatTableDataSource<Site[]>;
  ongoingSite_dataSource!: MatTableDataSource<Company[]>;
  @ViewChild('ongoingSitePaginator', { static: true }) ongoingSitePaginator!: MatPaginator;
  @ViewChild('ongoingSiteSort', { static: true }) ongoingSiteSort!: MatSort;

  completedLicenseColumns: string[] = [
    'siteCd',
    'site',
    'country',
    'city',
    'createdDate',
    'createdBy',
    'updatedDate',
    'updatedBy',
    'action',
  ];

  
  // completedLicense_dataSource!: MatTableDataSource<Site[]>;
  completedLicense_dataSource!: MatTableDataSource<Company[]>;
  @ViewChild('completedLicensePaginator', { static: true }) completedLicensePaginator!: MatPaginator;
  @ViewChild('completedLicenseSort', { static: true }) completedLicenseSort!: MatSort;

  @ViewChild('ref', { read: ViewContainerRef })
  viewContainerRef!: ViewContainerRef;
  disableUse: boolean = false;
  email: String= '';
  destroy: boolean=false;
  @Output()change: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(AssignViewerComponent)
  assignViewer!: AssignViewerComponent;

  userData: any = [];

  // @ViewChild(VerificationlvComponent)
  // verification!: VerificationlvComponent;


  constructor(private formBuilder: FormBuilder,
              private dialog: MatDialog,
              private siteService: SiteService,
              private inspectorService: InspectorregisterService,
              private service: GlobalsService,
              private router: ActivatedRoute,
              private componentFactoryResolver: ComponentFactoryResolver,
              private modalService: NgbModal
              ) {
                this.email = this.router.snapshot.paramMap.get('email') || '{}';
               }

  ngOnInit(): void {
    this.retrieveUserDetail();
    this.licenseForm = this.formBuilder.group({
      noOfAvailableLicense: [this.noofLicense],
    })
    this.retrieveSiteDetails();
  }

  retrieveUserDetail() {
    this.inspectorService.retrieveInspector(this.email).subscribe(
      (data) => {
        this.userData = JSON.parse(data);
        if(this.userData.role == 'Inspector') {
          this.noofLicense = this.userData.noOfLicence;
        }
      },
      (error) => {

      }
    )
  }

  retrieveSiteDetails() {
    this.siteService.retrieveSite(this.email).subscribe((data) => {
      this.ongoingSite_dataSource = new MatTableDataSource(JSON.parse(data));
      this.ongoingSite_dataSource.paginator = this.ongoingSitePaginator;
      this.ongoingSite_dataSource.sort = this.ongoingSiteSort;

      this.completedLicense_dataSource = new MatTableDataSource(JSON.parse(data));
      this.completedLicense_dataSource.paginator = this.completedLicensePaginator;
      this.completedLicense_dataSource.sort = this.completedLicenseSort;
    });
  }

  editSite(siteId:any,userName:any,site:any){
    //this.verification.changeTab(1,siteId,userName,'clientName','departmentName',site);
    this.viewContainerRef.clear();
    console.log(this.viewContainerRef.get(1));
    this.destroy = true;
    const verificationFactory = this.componentFactoryResolver.resolveComponentFactory(VerificationlvComponent);
    const verificationRef = this.viewContainerRef.createComponent(verificationFactory);
    //const verification=this.verification.changeTab(1,siteId,userName,'clientName','departmentName',site);
    verificationRef.changeDetectorRef.detectChanges();
    this.change.emit(siteId);
   //this.service.callMethod(1,siteId,userName,'clientName','departmentName',site);
    // this.proceedNext.emit(true);
  }

  viewSite(){
    this.viewContainerRef.clear();
    this.destroy = true;
    const verificationFactory = this.componentFactoryResolver.resolveComponentFactory(VerificationlvComponent);
    const verificationRef = this.viewContainerRef.createComponent(verificationFactory);
    verificationRef.changeDetectorRef.detectChanges();
  }
  pdfModal(contentPDF:any){
    this.modalService.open(contentPDF,{size: 'xl'})
  }

  navigateToSite() {
    this.viewContainerRef.clear();
    this.destroy = true;
    const verificationFactory = this.componentFactoryResolver.resolveComponentFactory(VerificationlvComponent);
    const verificationRef = this.viewContainerRef.createComponent(verificationFactory);
    //const verification=this.verification.changeTab(1,siteId,userName,'clientName','departmentName',site);
    verificationRef.changeDetectorRef.detectChanges();
  }

  
  decreaseLicense() {
    const dialogRef = this.dialog.open(AssignViewerComponent, {
      width: '500px',
    });
    dialogRef.componentInstance.email = this.email;
    dialogRef.componentInstance.onSave.subscribe(data=>{
      if(data) {
        this.navigateToSite();
      }
    })
    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  purchaseLicense() {
    this.noofLicense = 0;
    this.noofLicense= this.noofLicense+5;
    const dialogRef = this.dialog.open(AddlicenseComponent, {
      width: '500px',
      disableClose: true,
    });
    dialogRef.componentInstance.email = this.email;
    dialogRef.componentInstance.onLicense.subscribe(data=>{
      if(data) {
        this.navigateToSite();
      }
    })
    dialogRef.afterClosed().subscribe((result) => {
    });
  }

}
