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
import { InspectionVerificationService } from '../services/inspection-verification.service';

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
  //noofLicense!: number;

  ongoingSiteColumns: string[] = [
    'siteCd',
    'site',
    'country',
    'city',
    'createdDate',
    'createdBy',
    'updatedDate',
    'updatedBy',
    //'action',
  ];
  ongoingSite_dataSource!: MatTableDataSource<Company[]>;
  @ViewChild('ongoingSitePaginator', { static: false }) ongoingSitePaginator!: MatPaginator;
  @ViewChild('ongoingSiteSort', { static: false }) ongoingSiteSort!: MatSort;

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

  
  completedLicense_dataSource!: MatTableDataSource<Company[]>;
  @ViewChild('completedLicensePaginator', { static: false }) completedLicensePaginator!: MatPaginator;
  @ViewChild('completedLicenseSort', { static: false }) completedLicenseSort!: MatSort;

  @ViewChild('ref', { read: ViewContainerRef })
  viewContainerRef!: ViewContainerRef;
  @ViewChild('verify')
  verification: any; 
  disableUse: boolean = false;
  email: String= '';
  destroy: boolean=false;
  @Output()change: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(AssignViewerComponent)
  assignViewer!: AssignViewerComponent;

  userData: any = [];
  inspectorData: any = [];
  ongoingFilterData:any=[];
  completedFilterData:any=[];
  pdfSrc!: Uint8Array;
  // @ViewChild(VerificationlvComponent)
  // verification!: VerificationlvComponent;
  value: boolean = false;
  successMsg: string="";
  success: boolean=false;
  Error: boolean=false;
  errorMsg: string="";
  errorArr: any=[];
  disable: boolean=false;
  
  constructor(private formBuilder: FormBuilder,
              private dialog: MatDialog,
              private siteService: SiteService,
              private inspectorService: InspectorregisterService,
              public service: GlobalsService,
              private router: ActivatedRoute,
               private inspectionService: InspectionVerificationService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private modalService: NgbModal,
              
              ) {
                this.email = this.router.snapshot.paramMap.get('email') || '{}';
               }

  ngOnInit(): void {
    this.retrieveUserDetail();
    this.licenseForm = this.formBuilder.group({
      noOfAvailableLicense: [this.service.noofLicense],
    })
    this.retrieveSiteDetails();
  }
 
  retrieveUserDetail() {
    this.inspectorService.retrieveInspector(this.email).subscribe(
      (data) => {
        this.userData = JSON.parse(data);
        if(this.userData.role == 'Inspector') {
          this.service.noofLicense = this.userData.noOfLicence;
        }
      },
      (error) => {

      }
    )
  }

  retrieveSiteDetails() {
    this.ongoingFilterData=[];
    this.completedFilterData=[];
    this.siteService.retrieveListOfSite(this.email).subscribe(
    data => {
      this.inspectorData=JSON.parse(data);
     for(let i of this.inspectorData){
         if(i.allStepsCompleted=="AllStepCompleted"){
           this.completedFilterData.push(i);
         }
         else{
          this.ongoingFilterData.push(i);
         }
     }
  this.ongoingSite_dataSource = new MatTableDataSource(this.ongoingFilterData);
  this.ongoingSite_dataSource.paginator = this.ongoingSitePaginator;
  this.ongoingSite_dataSource.sort = this.ongoingSiteSort;

  this.completedLicense_dataSource = new MatTableDataSource(this.completedFilterData);
  this.completedLicense_dataSource.paginator = this.completedLicensePaginator;
  this.completedLicense_dataSource.sort = this.completedLicenseSort;

  
});
}
  
 
  editSite(siteId:any,userName:any,site:any,departmentName:any,companyName:any){
    if (confirm("Are you sure you want to edit site details?"))
    {
      
    // this.viewContainerRef.clear();
    // this.destroy = true;
    // const verificationFactory = this.componentFactoryResolver.resolveComponentFactory(VerificationlvComponent);
    // const verificationRef = this.viewContainerRef.createComponent(verificationFactory);
    // verificationRef.changeDetectorRef.detectChanges();
    // this.change.emit(siteId);
    this.viewContainerRef.clear();
    this.destroy = true;
    this.value=true;
    setTimeout(()=>{
      this.verification.changeTab(0,siteId,userName,companyName,departmentName,site);
    }, 1000);
    } 
    else {
      this.destroy = false;
      this.value=false;
    }
  }

  viewSite(siteId: any,userName: any,site: any,departmentName:any,companyName:any){
    if (confirm("Are you sure you want to view site details?"))
  {
    // this.viewContainerRef.clear();
    // this.destroy = true;
    // const verificationFactory = this.componentFactoryResolver.resolveComponentFactory(VerificationlvComponent);
    // const verificationRef = this.viewContainerRef.createComponent(verificationFactory);
    // verificationRef.changeDetectorRef.detectChanges();
    this.viewContainerRef.clear();
    this.destroy = true;
    this.value=true;
    setTimeout(()=>{
      this.verification.changeTab(0,siteId,userName,companyName,departmentName,site);
    }, 1000);
  } 
  else {
    this.destroy = false;
    this.value=false;
  } 
  }
  pdfModal(siteId: any,userName: any){
    this.disable=false;
    this.inspectionService.printPDF(siteId,userName)
  }
  
  downloadPdf(siteId: any,userName: any): any {
    this.disable=false;
    this.inspectionService.downloadPDF(siteId,userName)
  }
  emailPDF(siteId: any,userName: any){
    this.disable=false;
    this.inspectionService.mailPDF(siteId,userName).subscribe(
    data => {
    this.success = true;
    this.successMsg = data;
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
  navigateToSite() {
    // this.viewContainerRef.clear();
    // this.destroy = true;
    // const verificationFactory = this.componentFactoryResolver.resolveComponentFactory(VerificationlvComponent);
    // const verificationRef = this.viewContainerRef.createComponent(verificationFactory);
    // //const verification=this.verification.changeTab(1,siteId,userName,'clientName','departmentName',site);
    // verificationRef.changeDetectorRef.detectChanges();
    this.viewContainerRef.clear();
    this.destroy= true;
    this.value = true;

  }
  
  decreaseLicense() {
    this.service.useClicked=true;
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
    this.service.noofLicense = 0; 
    const dialogRef = this.dialog.open(AddlicenseComponent, {
      width: '500px',
      disableClose: true,
    }
    );
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
