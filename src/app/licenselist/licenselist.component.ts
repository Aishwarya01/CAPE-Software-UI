import { Component, OnInit, Output, ViewChild,ViewContainerRef,EventEmitter, Input} from '@angular/core';
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
import { ComponentFactoryResolver } from '@angular/core';
import { GlobalsService } from '../globals.service';
import { FinalreportsComponent } from '../finalreports/finalreports.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InspectorregisterService } from '../services/inspectorregister.service';
import { InspectionVerificationService } from '../services/inspection-verification.service';
import { environment } from 'src/environments/environment';
import { ConfirmationBoxComponent } from '../confirmation-box/confirmation-box.component';
import { SuperAdminDev } from 'src/environments/environment.dev';
import { SuperAdminProd } from 'src/environments/environment.prod';
import { LpsMatstepperComponent } from '../LPS/lps-matstepper/lps-matstepper.component';
import { RiskglobalserviceService } from '../Risk Assessment/riskglobalservice.service';
import { LpsGlobalserviceService } from '../LPS/lps-globalservice.service';
import { SiteaddComponent } from '../site/siteadd/siteadd.component';
import { Register } from '../model/register';

@Component({
  selector: 'app-licenselist',
  templateUrl: './licenselist.component.html',
  styleUrls: ['./licenselist.component.css']
})

export class LicenselistComponent implements OnInit {
  // @Input() matStepper!: LpsMatstepperComponent;
  
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
  @ViewChild('verify1')
  matStepper:any;
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
  allData: any = [];
  superAdminFlag: boolean = false;
  //confirmBox: boolean = false;
  urlEmail:any='';
  superAdminArr: any = [];
  superAdminDev = new SuperAdminDev();
  superAdminProd = new SuperAdminProd();
  licensePageHeading: String="";
  lpsData: boolean=false;
  lvData: boolean=false;
  value1: boolean=false;
  onSubmitSite1 = new EventEmitter();
  onSave = new EventEmitter();
  @Input()

  site = new Site;
  @Output() refreshForm: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
              private dialog: MatDialog,
              private siteService: SiteService,
              private inspectorService: InspectorregisterService,
              public service: GlobalsService,
              private router: ActivatedRoute,
               private inspectionService: InspectionVerificationService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private modalService: NgbModal,
              private lpsGlobal: LpsGlobalserviceService
              
              
              ) {
                this.email = this.router.snapshot.paramMap.get('email') || '{}';
               }

  ngOnInit(): void {
    this.retrieveUserDetail();
    this.licenseForm = this.formBuilder.group({
      noOfAvailableLicense: [this.service.noofLicense],
    })
    // this.superAdminArr = [];
    // this.superAdminArr.push('gk@capeindia.net');
    // this.superAdminArr.push('vinoth@capeindia.net');
    // this.superAdminArr.push('awstesting@rushforsafety.com');
    this.retrieveSiteDetails();
    this.pageHeading();
  }
 
  retrieveUserDetail() {
    this.service.noofLicense = 0;
    //LPS
    if(this.service.triggerMsgForLicense=='lpsPage'){
      this.inspectorService.retrieveInspectorLicense(this.email,'LPS').subscribe(
        (data) => {
          this.userData = JSON.parse(data);
          // if(this.userData.role == 'Inspector') {
            this.service.noofLicense = this.userData.lpsNoOfLicence;
          // }
        },
        (error) => {
  
        }
      )
     }
    // LV Page
    else if(this.service.triggerMsgForLicense=='lvPage'){
      this.inspectorService.retrieveInspectorLicense(this.email,"LV").subscribe(
        (data) => {
          this.userData = JSON.parse(data);
          // if(this.userData.role == 'Inspector') {
            
            this.service.noofLicense = this.userData.lvNoOfLicence;
          // }
        },
        (error) => {
  
        }
      )
    }

	
  }

  retrieveSiteDetails() {
    this.refreshForm.emit(true);
    this.ongoingFilterData=[];
    this.completedFilterData=[];
      

    for(let i of this.superAdminDev.adminEmail) {
      if(this.email == i) {
        this.superAdminFlag = true;
      }
    }
   

    for(let i of this.superAdminProd.adminEmail) {
      if(this.email == i) {
        this.superAdminFlag = true;
      }
    }
    if(this.superAdminFlag) {
   
		
      this.siteService.retrieveAllSite(this.email).subscribe(
        data => {
          this.allData = JSON.parse(data);
          for(let i of this.allData){
            if(i.allStepsCompleted=="AllStepCompleted"){
              this.completedFilterData.push(i);
            }
            else if(i.allStepsCompleted !="AllStepCompleted" && i.status != 'InActive'){
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

      this.superAdminFlag = false;
    }
    else {
        this.siteService.retrieveListOfSite(this.email).subscribe(
          data => {
            this.inspectorData=JSON.parse(data);
          for(let i of this.inspectorData){
              if(i.allStepsCompleted=="AllStepCompleted"){
                this.completedFilterData.push(i);
              }
              else if(i.allStepsCompleted !="AllStepCompleted" && i.status != 'InActive'){
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
  }
  
  editSite(siteId:any,userName:any,site:any,departmentName:any,companyName:any,allStepsCompleted:any,data:any){
    if(allStepsCompleted==null && allStepsCompleted==undefined){
      this.service.allStepsCompleted=true;
      this.service.disableSubmitSummary=false;
      this.service.allFieldsDisable = false;
      const dialogRef = this.dialog.open(ConfirmationBoxComponent, {
        width: '420px',
        maxHeight: '90vh',
        disableClose: true,
      });
      dialogRef.componentInstance.editModal = true;
      dialogRef.componentInstance.triggerModal = false;
      dialogRef.componentInstance.linkModal = false;
      dialogRef.componentInstance.summaryModal = false;
      dialogRef.componentInstance.confirmBox.subscribe(data=>{
        if(data) {
          this.viewContainerRef.clear();
          this.destroy = true;
          this.value=true;
          this.service.disableFields=false;
          setTimeout(()=>{
            this.verification.changeTabSavedReport(0,siteId,userName,companyName,departmentName,site);
          }, 1000);
        }
        else{
          this.destroy = false;
          this.value=false;
        }
      })
    }
    else if(allStepsCompleted=="Register"){
      this.navigateToSite1(data);
    }
  }

  navigateToSite1(data: any) {
    const dialogRef = this.dialog.open(SiteaddComponent, {
      width: '1000px',
      maxHeight: '90vh',
      disableClose: true,
    });
    dialogRef.componentInstance.data = data;
    dialogRef.componentInstance.onSubmitSite.subscribe(data=>{
      if(data) {
        this.onSave.emit(true);
        this.ngOnInit();
        this.navigateToSite();
      }
    })
    // dialogRef.afterClosed().subscribe((result) => {
    // });
  }

  editLpsData(basicLpsId:any){
    if(this.lpsData){
      this.lpsGlobal.disableSubmitSummary=false;
      this.service.allFieldsDisable = false;
      const dialogRef = this.dialog.open(ConfirmationBoxComponent, {
        width: '420px',
        maxHeight: '90vh',
        disableClose: true,
      });
      if(this.service.triggerMsgForLicense=='lpsPage'){
        dialogRef.componentInstance.viewModal1 = true;
        dialogRef.componentInstance.viewModal=false;
      }
      dialogRef.componentInstance.triggerModal = false;
      if(this.lpsData){
        dialogRef.componentInstance.confirmBox.subscribe(data=>{
          if(data) {
            this.viewContainerRef.clear();
            this.destroy = true;
            this.value1=true;
            setTimeout(() => {
              this.matStepper.changeTabLpsSavedReport(0,basicLpsId,this.router.snapshot.paramMap.get('email') || '{}');
            }, 3000);
          }
          else{
            this.destroy = false;
            this.value1=false;
          }
        })
      }
    }
  }

  viewSite(siteId: any,userName: any,site: any,departmentName:any,companyName:any){
    this.service.allStepsCompleted=false;
    this.service.disableSubmitSummary=true;
    this.service.disableFields=true;
    this.service.allFieldsDisable = true;
    const dialogRef = this.dialog.open(ConfirmationBoxComponent, {
      width: '420px',
      maxHeight: '90vh',
      disableClose: true,
    });
    dialogRef.componentInstance.viewModal = true;
    dialogRef.componentInstance.triggerModal = false;
    dialogRef.componentInstance.linkModal = false;
    dialogRef.componentInstance.summaryModal = false;

    dialogRef.componentInstance.confirmBox.subscribe(data=>{
      if(data) {
        this.viewContainerRef.clear();
        this.destroy = true;
        this.value=true;
        setTimeout(()=>{
          this.verification.changeTab(0,siteId,userName,companyName,departmentName,site);
        }, 1000);
      }
      else{
        this.destroy = false;
        this.value=false;
        +3
      }
    })
  //   if (confirm("Are you sure you want to view site details?"))
  // {
  //   // this.viewContainerRef.clear();
  //   // this.destroy = true;
  //   // const verificationFactory = this.componentFactoryResolver.resolveComponentFactory(VerificationlvComponent);
  //   // const verificationRef = this.viewContainerRef.createComponent(verificationFactory);
  //   // verificationRef.changeDetectorRef.detectChanges();
  //   this.viewContainerRef.clear();
  //   this.destroy = true;
  //   this.value=true;
  //   setTimeout(()=>{
  //     this.verification.changeTab(0,siteId,userName,companyName,departmentName,site);
  //   }, 1000);
  // } 
  // else {
  //   this.destroy = false;
  //   this.value=false;
  // } 
  }
  pdfModal(siteId: any,userName: any, siteName: any){
    this.disable=false;
    this.inspectionService.printPDF(siteId,userName, siteName)
  }
  
  downloadPdf(siteId: any,userName: any, siteName: any): any {
    this.disable=false;
    this.inspectionService.downloadPDF(siteId,userName, siteName)
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

  navigateToSite() {
    // this.viewContainerRef.clear();
    // this.destroy = true;
    // const verificationFactory = this.componentFactoryResolver.resolveComponentFactory(VerificationlvComponent);
    // const verificationRef = this.viewContainerRef.createComponent(verificationFactory);
    // //const verification=this.verification.changeTab(1,siteId,userName,'clientName','departmentName',site);
    // verificationRef.changeDetectorRef.detectChanges();
    if(this.lvData){
      this.viewContainerRef.clear();
      this.destroy= true;
      this.value = true;
    }
    else if(this.lpsData){
      this.viewContainerRef.clear();
      this.dialog.closeAll();
      this.destroy= true;
      this.value1 = true;
    }
  }
  
  decreaseLicense() {
    this.service.useClicked=true;
    const dialogRef = this.dialog.open(AssignViewerComponent, {
      width: '720px',
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

  pageHeading(){
    this.service.licensePageHeaging();
    // LPS Page
    if(this.service.triggerMsgForLicense=='lpsPage'){
      this.licensePageHeading="LPS License Page";
      this.lpsData=true;
    }
    // LV Page
    else if(this.service.triggerMsgForLicense=='lvPage'){
      this.licensePageHeading="LV License Page";
      this.lvData=true;
    }
    else{
      this.licensePageHeading="";
    }
  }

}

