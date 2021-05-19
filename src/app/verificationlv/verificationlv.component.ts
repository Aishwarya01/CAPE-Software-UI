import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild, ChangeDetectorRef, VERSION } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, FormArray,  FormControl } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DepartmentaddComponent } from '../department/departmentadd/departmentadd.component';
import { SiteaddComponent } from '../site/siteadd/siteadd.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientaddComponent } from '../Company/client/clientadd/clientadd.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../model/company';
import { ClientupdateComponent } from '../Company/client/clientupdate/clientupdate/clientupdate.component';
import { User } from '../model/user';
import { ClientService } from '../services/client.service';
import { DepartmentService } from '../services/department.service';
import { Department } from '../model/department';
import { DepartmentupdateComponent } from '../department/departmentupdate/departmentupdate/departmentupdate.component';
import { SiteService } from '../services/site.service';
import { Site } from '../model/site';
import { SiteupdateComponent } from '../site/siteupdate/siteupdate.component';
import { Reportdetails } from '../model/reportdetails';
import { ReportDetailsService } from '../services/report-details.service';

@Component({
  selector: 'app-verificationlv',
  templateUrl: './verificationlv.component.html',
  styleUrls: ['./verificationlv.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class VerificationlvComponent implements OnInit {

  companyColumns: string[] = ['action', 'companyCd', 'clientName', 'inActive', 'createdDate', 'createdBy', 'updatedDate', 'updatedBy'];
  company_dataSource!: MatTableDataSource<Company[]>;
  @ViewChild('companyPaginator', { static: true }) companyPaginator!: MatPaginator;
  @ViewChild('companySort', {static: true}) companySort!: MatSort;


  departmentColumns: string[] = ['action', 'departmentCd', 'departmentName', 'createdDate', 'createdBy', 'updatedDate', 'updatedBy'];
  department_dataSource!: MatTableDataSource<Company[]>;
  @ViewChild('departmentPaginator', { static: true }) departmentPaginator!: MatPaginator;
  @ViewChild('departmentSort', {static: true}) departmentSort!: MatSort;


  siteColumns: string[] = ['action','siteCd', 'siteName','country','city','createdDate', 'createdBy', 'updatedDate', 'updatedBy'];
  site_dataSource!: MatTableDataSource<Company[]>;
  @ViewChild('sitePaginator', { static: true }) sitePaginator!: MatPaginator;
  @ViewChild('siteSort', {static: true}) siteSort!: MatSort;

  addDesigner1Form = new FormGroup ({
    personName: new FormControl(''),
    personContactNo: new FormControl(''),
    personMailID: new FormControl(''),
    managerName: new FormControl(''),
    managerContactNo: new FormControl(''),
    managerMailID: new FormControl(''),
    companyName: new FormControl(''),
    addressLine1: new FormControl(''),
    addressLine2: new FormControl(''),
    landMark: new FormControl(''),
    country: new FormControl(''),
    state: new FormControl(''),
    pinCode: new FormControl(''),
    signatorRole: new FormControl('')

  })

  addDesigner2Form = new FormGroup ({
    personName: new FormControl(''),
    personContactNo: new FormControl(''),
    personMailID: new FormControl(''),
    managerName: new FormControl(''),
    managerContactNo: new FormControl(''),
    managerMailID: new FormControl(''),
    companyName: new FormControl(''),
    addressLine1: new FormControl(''),
    addressLine2: new FormControl(''),
    landMark: new FormControl(''),
    country: new FormControl(''),
    state: new FormControl(''),
    pinCode: new FormControl(''),
    signatorRole: new FormControl('')
  })

  addContractorForm = new FormGroup ({
    personName: new FormControl(''),
    personContactNo: new FormControl(''),
    personMailID: new FormControl(''),
    managerName: new FormControl(''),
    managerContactNo: new FormControl(''),
    managerMailID: new FormControl(''),
    companyName: new FormControl(''),
    addressLine1: new FormControl(''),
    addressLine2: new FormControl(''),
    landMark: new FormControl(''),
    country: new FormControl(''),
    state: new FormControl(''),
    pinCode: new FormControl(''),
    signatorRole: new FormControl('')
  })

  addInspectorForm = new FormGroup ({
    personName: new FormControl(''),
    personContactNo: new FormControl(''),
    personMailID: new FormControl(''),
    managerName: new FormControl(''),
    managerContactNo: new FormControl(''),
    managerMailID: new FormControl(''),
    companyName: new FormControl(''),
    addressLine1: new FormControl(''),
    addressLine2: new FormControl(''),
    landMark: new FormControl(''),
    country: new FormControl(''),
    state: new FormControl(''),
    pinCode: new FormControl(''),
    signatorRole: new FormControl('')
  })

  designer1Acknowledge = new FormGroup ({
    signature: new FormControl(''),
    declarationDate: new FormControl(''),
    declarationName: new FormControl('')
  })

  designer2Acknowledge = new FormGroup ({
    signature: new FormControl(''),
    declarationDate: new FormControl(''),
    declarationName: new FormControl('')
  })

  contractorAcknowledge = new FormGroup ({
    signature: new FormControl(''),
    declarationDate: new FormControl(''),
    declarationName: new FormControl('')
  })

  inspectorAcknowledge = new FormGroup ({
    signature: new FormControl(''),
    declarationDate: new FormControl(''),
    declarationName: new FormControl('')
  })
  
  clientList: any = [];
  inActiveData: any =[];
  departmentList: any = [];
  clientArray : any = [];
  countryList: any = [];
  stateList: any = [];
  company =new Company;
  department = new Department;
  site = new Site;
  email: String = '';
  clientName: String = '';
  departmentName: String = '';
  inActive: boolean = false;
  user = new User;
  companyId: number=0;
  departmentId: number=0;
  createdBy: String = '';
  createdDate =new Date;
  companyCd: String = '';
  departmentCd: String = '';
  isChecked: boolean = false;
  designer1Arr!: FormArray;
  designerRole: String ='designer';
  contractorRole: String ='contractor';
  inspectorRole: String ='inspector';






  reportDetails =new Reportdetails;
  

  // Second Tab dependencies
  panelOpenState = false;
  installationList: String[]= ['New installation','First verification of an existing','Addition of an existing installation','Alteration in an existing installation','Periodic verification'];
  premiseList: String[]= ['Domestic(Individual)','Domestic(Apartment)','Commercial','IT/Office','Data center','Industrial(Non Ex environment)','Industrial(Ex environment)'];
  evidenceList: String[]= ['YES', 'NO', 'Not Apparent'];
  previousRecordList: String[]= ['YES', 'NO'];



  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  // ThirdFormGroup: FormGroup;
  // fourthFormGroup: FormGroup;


  @Output() passEntry: EventEmitter<any> = new EventEmitter();  
  formBuilder: any;
  arrDesigner!: FormArray; 
   constructor(private _formBuilder: FormBuilder,
    private modalService: NgbModal,
    private dialog: MatDialog,
    private router: ActivatedRoute,
    private clientService: ClientService,
    private departmentService: DepartmentService,
    private reportDetailsService: ReportDetailsService,
    private siteService: SiteService,
    private ChangeDetectorRef: ChangeDetectorRef) {
    this.email = this.router.snapshot.paramMap.get('email') || '{}'
  }

  

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      retrieveIsActive: ['', Validators.required],      
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
      clientname: ['', Validators.required],
    });

  
    this.addDesigner1Form = this._formBuilder.group({
      designer1Arr: this._formBuilder.array([this.createDesigner1Form()]),
    });
    this.addDesigner2Form = this._formBuilder.group({
      designer2Arr: this._formBuilder.array([this.createDesigner2Form()]),
    });
    this.addContractorForm = this._formBuilder.group({
      contractorArr: this._formBuilder.array([this.createContractorForm()]),
    });
    this.addInspectorForm = this._formBuilder.group({
      inspectorArr: this._formBuilder.array([this.createInspectorForm()]),
    });

    this.siteService.retrieveCountry().subscribe(
      data => {
        this.countryList = JSON.parse(data);
      }
    )
    this.refresh();
    this.retrieveClientDetails();
    
  }

  retrieveIsActiveData() {
    this.retrieveClientDetails();
  }

  private retrieveClientDetails() {
    this.clientService.retrieveClient(this.email).subscribe(
      data => {
        if(this.isChecked) {
            this.inActiveData = [];
            for (let arr of JSON.parse(data)) {
              if(arr.inActive){
                this.inActiveData.push(arr);
              }          
            }
        }
        else {
            this.inActiveData = []
            this.inActiveData=JSON.parse(data);
            this.clientList=JSON.parse(data);
            this.clientArray = [];
            for(let arr of JSON.parse(data)) {
              this.clientArray.push(arr);
            }
        }
        
        this.company_dataSource = new MatTableDataSource(this.inActiveData);
        this.company_dataSource.paginator = this.companyPaginator;
        this.company_dataSource.sort = this.companySort;
      });
  }

   retrieveDepartmentDetails() {
    this.departmentService.retrieveDepartment(this.email,this.company.clientName).subscribe(
      data => {
        this.department_dataSource = new MatTableDataSource(JSON.parse(data));
        this.department_dataSource.paginator = this.departmentPaginator;
        this.department_dataSource.sort = this.departmentSort;
      });
  }

  retrieveSiteDetails() {
    this.siteService.retrieveSite(this.site).subscribe(
      data => {
        this.site_dataSource = new MatTableDataSource(JSON.parse(data));
        this.site_dataSource.paginator = this.sitePaginator;
        this.site_dataSource.sort = this.siteSort;
      });
  }

  deleteClient(clientname: String) {
    this.clientService.deleteClient(this.email, clientname).subscribe(
      data => {
        this.retrieveClientDetails();
      }
    )
    this.refresh();
  }

  addClient() {
    const dialogRef = this.dialog.open(ClientaddComponent, {
      width: '500px',
    });
    dialogRef.componentInstance.email = this.email;
      dialogRef.afterClosed().subscribe(result => {
        this.refresh();
        this.retrieveClientDetails();
      });
  }

  updateClient(companyId: number, companyCd: String, clientName: String, inActive: boolean, createdDate: Date,createdBy: String ) {
      const dialogRef = this.dialog.open(ClientupdateComponent, {
      width: '500px',
    });
    dialogRef.componentInstance.clientName = clientName;
    dialogRef.componentInstance.inActive = inActive;
    dialogRef.componentInstance.companyId = companyId;
    dialogRef.componentInstance.createdBy = createdBy;
    dialogRef.componentInstance.createdDate = createdDate;
    dialogRef.componentInstance.email = this.email;
    dialogRef.componentInstance.companyCd = companyCd;
    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
      this.retrieveClientDetails();
    });
  }

  addDepartment() {
    const dialogRef = this.dialog.open(DepartmentaddComponent, {
      width: '500px',
    });
    dialogRef.componentInstance.email = this.email;
      dialogRef.afterClosed().subscribe(result => {
        this.refresh();
        this.retrieveDepartmentDetails();
      });
  }

  updateDepartment(departmentId: number, departmentName: String, departmentCd: String, clientName: String, createdDate: Date,createdBy: String ) {
    const dialogRef = this.dialog.open(DepartmentupdateComponent, {
    width: '500px',
  });
  dialogRef.componentInstance.clientName = clientName;
  dialogRef.componentInstance.departmentName = departmentName;
  dialogRef.componentInstance.departmentId = departmentId;
  dialogRef.componentInstance.createdBy = createdBy;
  dialogRef.componentInstance.createdDate = createdDate;
  dialogRef.componentInstance.email = this.email;
  dialogRef.componentInstance.departmentCd = departmentCd;
  dialogRef.afterClosed().subscribe(result => {
    this.refresh();
    this.retrieveDepartmentDetails();
  });
}

deleteDepartment(departmentId: number) {
  this.departmentService.deleteDepartment(this.email, departmentId).subscribe(
    data => {
      this.retrieveDepartmentDetails();
    }
  )
  this.refresh();
}

  addSite() {
    const dialogRef = this.dialog.open(SiteaddComponent, {
      width: '1000px',
      maxHeight: '90vh',
    });
    dialogRef.componentInstance.email = this.email;
      dialogRef.afterClosed().subscribe(result => {
        this.refresh();
        this.retrieveClientDetails();
      });
  }
  
  updateSite(userName: String, clientName: String,departmentName: String,  site : String, siteId : number, siteCd : String, country : String, state : String, city : String, landMark : String, sitePersons : any[], addressLine_1: String, addressLine_2: String, zipCode: number, createdDate: Date,createdBy: String) {    
    const dialogRef = this.dialog.open(SiteupdateComponent, {
      width: '1000px',
      maxHeight: '90vh',
    });
    dialogRef.componentInstance.userName = userName;
    dialogRef.componentInstance.clientName = clientName;
    dialogRef.componentInstance.departmentName = departmentName;
    dialogRef.componentInstance.siteName = site;
    dialogRef.componentInstance.siteId = siteId;
    dialogRef.componentInstance.siteCd = siteCd;
    dialogRef.componentInstance.country = country;
    dialogRef.componentInstance.state = state;
    dialogRef.componentInstance.city = city;
    dialogRef.componentInstance.landMark = landMark;
    dialogRef.componentInstance.addressLine_1 = addressLine_1;
    dialogRef.componentInstance.addressLine_2 = addressLine_2;
    dialogRef.componentInstance.sitePersons = sitePersons;
    dialogRef.componentInstance.zipCode = zipCode;
    dialogRef.componentInstance.createdBy = createdBy;
    dialogRef.componentInstance.createdDate = createdDate;

    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
      this.retrieveSiteDetails();
    });
  }

  deleteSite(siteId: number) {
    this.siteService.deleteSite(siteId).subscribe(
      data => {
        this.retrieveSiteDetails();
      }
    )
    this.refresh();
  }

  changeClient (e: any) {
    let changedValue = e.target.value;
    this.departmentList = [];
      for(let arr of this.clientList) {
        if( arr.clientName == changedValue) {
          this.departmentService.retrieveDepartment(this.email,arr.clientName).subscribe(
            data => {
              this.departmentList = JSON.parse(data)
            }
          )};
      }
  }

  refresh() {
    this.ChangeDetectorRef.detectChanges();
  }
  
  // Deisgner details forms
  private createDesigner1Form(): FormGroup {
    return new FormGroup({
      personName: new FormControl(''),
      personContactNo: new FormControl(''),
      personMailID: new FormControl(''),
      managerName: new FormControl(''),
      managerContactNo: new FormControl(''),
      managerMailID: new FormControl(''),
      companyName: new FormControl(''),
      addressLine1: new FormControl(''),
      addressLine2: new FormControl(''),
      landMark: new FormControl(''),
      country: new FormControl(''),
      state: new FormControl(''),
      pinCode: new FormControl(''),
      signatorRole: new FormControl('')
    })
  }

  private createDesigner2Form(): FormGroup {
    return new FormGroup({
      personName: new FormControl(''),
      personContactNo: new FormControl(''),
      personMailID: new FormControl(''),
      managerName: new FormControl(''),
      managerContactNo: new FormControl(''),
      managerMailID: new FormControl(''),
      companyName: new FormControl(''),
      addressLine1: new FormControl(''),
      addressLine2: new FormControl(''),
      landMark: new FormControl(''),
      country: new FormControl(''),
      state: new FormControl(''),
      pinCode: new FormControl(''),
      signatorRole: new FormControl('')
    })
  }

  getDesigner1Controls(): AbstractControl[] { 
      return (<FormArray> this.addDesigner1Form.get('designer1Arr')).controls
  }

  getDesigner2Controls(): AbstractControl[] { 
    return (<FormArray> this.addDesigner2Form.get('designer2Arr')).controls
}
  

  designer1changeCountry(e: any) {
    let changedValue = e.target.value;
    this.stateList = [];
      for(let arr of this.countryList) {
        if( arr.name == changedValue) {
          this.siteService.retrieveState(arr.code).subscribe(
            data => {
              this.stateList = JSON.parse(data)
            }
          )};
      }
  }

  designer2changeCountry(e: any) {
    let changedValue = e.target.value;
    this.stateList = [];
      for(let arr of this.countryList) {
        if( arr.name == changedValue) {
          this.siteService.retrieveState(arr.code).subscribe(
            data => {
              this.stateList = JSON.parse(data)
            }
          )};
      }
  }

  // Contractor details forms

  private createContractorForm(): FormGroup {
    return new FormGroup({
      personName: new FormControl(''),
      personContactNo: new FormControl(''),
      personMailID: new FormControl(''),
      managerName: new FormControl(''),
      managerContactNo: new FormControl(''),
      managerMailID: new FormControl(''),
      companyName: new FormControl(''),
      addressLine1: new FormControl(''),
      addressLine2: new FormControl(''),
      landMark: new FormControl(''),
      country: new FormControl(''),
      state: new FormControl(''),
      pinCode: new FormControl(''),
      signatorRole: new FormControl('')
    })
  }

  getContractorControls(): AbstractControl[] { 
    return (<FormArray> this.addContractorForm.get('contractorArr')).controls
  }

  contractorchangeCountry(e: any) {
    let changedValue = e.target.value;
    this.stateList = [];
      for(let arr of this.countryList) {
        if( arr.name == changedValue) {
          this.siteService.retrieveState(arr.code).subscribe(
            data => {
              this.stateList = JSON.parse(data)
            }
          )};
      }
  }

  // Inspector details forms

  private createInspectorForm(): FormGroup {
    return new FormGroup({
      personName: new FormControl(''),
      personContactNo: new FormControl(''),
      personMailID: new FormControl(''),
      managerName: new FormControl(''),
      managerContactNo: new FormControl(''),
      managerMailID: new FormControl(''),
      companyName: new FormControl(''),
      addressLine1: new FormControl(''),
      addressLine2: new FormControl(''),
      landMark: new FormControl(''),
      country: new FormControl(''),
      state: new FormControl(''),
      pinCode: new FormControl(''),
      signatorRole: new FormControl('')
    })
  }

  getInspectorControls(): AbstractControl[] { 
    return (<FormArray> this.addInspectorForm.get('inspectorArr')).controls
  }

  inspectorchangeCountry(e: any) {
    let changedValue = e.target.value;
    this.stateList = [];
      for(let arr of this.countryList) {
        if( arr.name == changedValue) {
          this.siteService.retrieveState(arr.code).subscribe(
            data => {
              this.stateList = JSON.parse(data)
            }
          )};
      }
  }

  nextTab() {
    
    this.addDesigner1Form.value.designer1Arr[0].signatorRole= this.designerRole;

    this.addDesigner2Form.value.designer2Arr[0].signatorRole= this.designerRole;

    this.addContractorForm.value.contractorArr[0].signatorRole= this.contractorRole;

    this.addInspectorForm.value.inspectorArr[0].signatorRole= this.inspectorRole;

    console.log(this.designer1Acknowledge.value);
    

    this.reportDetails.SignatorDetails = this.addDesigner1Form.value.designer1Arr;
    if(this.addDesigner2Form.value.designer2Arr[0].personName != "") {
      this.reportDetails.SignatorDetails=this.reportDetails.SignatorDetails.concat(this.addDesigner2Form.value.designer2Arr);
    }
      this.reportDetails.SignatorDetails=this.reportDetails.SignatorDetails.concat(this.addContractorForm.value.contractorArr,this.addInspectorForm.value.inspectorArr);
        

    console.log(this.reportDetails);
    this.reportDetailsService.addReportDetails(this.reportDetails).subscribe(
      data=> {
        console.log("worked");
      },
      error => {
      }
      )
  }

}

  
  
