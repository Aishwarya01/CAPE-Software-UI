import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Company } from '../model/company';
import { Department } from '../model/department';
import { Reportdetails } from '../model/reportdetails';
import { Site } from '../model/site';
import { ClientService } from '../services/client.service';
import { DepartmentService } from '../services/department.service';
import { ReportDetailsService } from '../services/report-details.service';
import { SiteService } from '../services/site.service';

import { InspectiondetailsService } from '../services/inspectiondetails.service';
import { InspectionDetails } from '../model/inspection-details';

@Component({
  selector: 'app-inspection-verification-incoming-equipment',
  templateUrl: './inspection-verification-incoming-equipment.component.html',
  styleUrls: ['./inspection-verification-incoming-equipment.component.css']
})
export class InspectionVerificationIncomingEquipmentComponent implements OnInit {
  addDesigner1Form = new FormGroup ({
  });

  addDesigner2Form = new FormGroup ({
  });

  addContractorForm = new FormGroup ({
  });

  addInspectorForm = new FormGroup ({
  });

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
  departmentListInspec: any = [];
  siteListInspec: any = [];
  clientArray : any = [];
  countryList: any = [];
  stateList1: any = [];
  stateList2: any = [];
  stateList3: any = [];
  stateList4: any = [];
  company =new Company;
  department = new Department;
  site = new Site;
  email: String = '';
  clientName: String = '';
  departmentName: String = '';
  reportDetails =new Reportdetails;
  showField1: boolean= true;
  showField2: boolean= false;


  designerRole: String ='designer';
  contractorRole: String ='contractor';
  inspectorRole: String ='inspector';

  inspectionDetails =new InspectionDetails;


  // Second Tab dependencies
  panelOpenState = false;
  installationList: String[]= ['New installation','First verification of an existing','Addition of an existing installation','Alteration in an existing installation','Periodic verification'];
  premiseList: String[]= ['Domestic(Individual)','Domestic(Apartment)','Commercial','IT/Office','Data center','Industrial(Non Ex environment)','Industrial(Ex environment)'];
  evidenceList: String[]= ['Yes', 'No', 'Not Apparent'];
  previousRecordList: String[]= ['Yes', 'No'];
  InspectionList: String[]=['Yes', 'No', 'Not Applicable'];



  formBuilder: any;
  inspectionDetailsService: any;
   constructor(private _formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private clientService: ClientService,
    private departmentService: DepartmentService,
    private reportDetailsService: ReportDetailsService,
    private siteService: SiteService,
    private ChangeDetectorRef: ChangeDetectorRef) {
    this.email = this.router.snapshot.paramMap.get('email') || '{}'
  }

  

  ngOnInit(): void {
  
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

 

  private retrieveClientDetails() {
    this.clientService.retrieveClient(this.email).subscribe(
      data => {
        this.clientList = [];
        this.clientList=JSON.parse(data);
      });
  }

  showWiringAge(e: any) {
    let changedValue = e.target.value;
    if(changedValue == "New installation") {
      this.showField1 = false;
    }
    else {
      this.showField1 = true;
    }
  }

  showEstimatedAge(e: any) {
    let changedValue = e.target.value;
    if(changedValue == "Yes") {
      this.showField2 = true;
    }
    else {
      this.showField2 = false;
    }
  }


  refresh() {
    this.ChangeDetectorRef.detectChanges();
  }
  
  // Inspection form basic info
  changeClientName (e: any) {
    let changedValue = e.target.value;
    this.departmentListInspec = [];
      for(let arr of this.clientList) {
        if( arr.clientName == changedValue) {
          this.departmentService.retrieveDepartment(this.email,arr.clientName).subscribe(
            data => {
              this.departmentListInspec = JSON.parse(data)
            }
          )};
      }
  }

  retrieveSiteInfo (e: any) {
    let changedValue = e.target.value;
    this.siteListInspec = [];
    for(let arr of this.departmentListInspec) {
      if(arr.departmentName == changedValue) {
        this.siteService.retrieveSiteInfo(arr.clientName, arr.departmentName).subscribe(
          data => {
            this.siteListInspec = JSON.parse(data)
          });
      }
    }
  }

  retrieveSiteId(e: any) {
    let changedValue = e.target.value;
    for(let arr of this.siteListInspec) {
      if(arr.site == changedValue) {
        this.reportDetails.siteId = arr.siteId;
      }
    }
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
      signatorRole: new FormControl(''),
      declarationDate: new FormControl(''),
      declarationName: new FormControl('')
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
      signatorRole: new FormControl(''),
      declarationDate: new FormControl(''),
      declarationName: new FormControl('')
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
    this.stateList1 = [];
      for(let arr of this.countryList) {
        if( arr.name == changedValue) {
          this.siteService.retrieveState(arr.code).subscribe(
            data => {
              this.stateList1 = JSON.parse(data)
            }
          )};
      }
  }

  designer2changeCountry(e: any) {
    let changedValue = e.target.value;
    this.stateList2 = [];
      for(let arr of this.countryList) {
        if( arr.name == changedValue) {
          this.siteService.retrieveState(arr.code).subscribe(
            data => {
              this.stateList2 = JSON.parse(data)
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
      signatorRole: new FormControl(''),
      declarationDate: new FormControl(''),
      declarationName: new FormControl('')
    })
  }

  getContractorControls(): AbstractControl[] { 
    return (<FormArray> this.addContractorForm.get('contractorArr')).controls
  }

  contractorchangeCountry(e: any) {
    let changedValue = e.target.value;
    this.stateList3 = [];
      for(let arr of this.countryList) {
        if( arr.name == changedValue) {
          this.siteService.retrieveState(arr.code).subscribe(
            data => {
              this.stateList3 = JSON.parse(data)
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
      signatorRole: new FormControl(''),
      declarationDate: new FormControl(''),
      declarationName: new FormControl('')
    })
  }

  getInspectorControls(): AbstractControl[] { 
    return (<FormArray> this.addInspectorForm.get('inspectorArr')).controls
  }

  inspectorchangeCountry(e: any) {
    let changedValue = e.target.value;
    this.stateList4 = [];
      for(let arr of this.countryList) {
        if( arr.name == changedValue) {
          this.siteService.retrieveState(arr.code).subscribe(
            data => {
              this.stateList4 = JSON.parse(data)
            }
          )};
      }
  }

  nextTab() {
    
    this.addDesigner1Form.value.designer1Arr[0].signatorRole= this.designerRole;
    this.addDesigner1Form.value.designer1Arr[0].declarationName= this.designer1Acknowledge.value.declarationName;
    this.addDesigner1Form.value.designer1Arr[0].declarationDate= this.designer1Acknowledge.value.declarationDate;

    this.addDesigner2Form.value.designer2Arr[0].signatorRole= this.designerRole;
    this.addDesigner2Form.value.designer2Arr[0].declarationName= this.designer2Acknowledge.value.declarationName;
    this.addDesigner2Form.value.designer2Arr[0].declarationDate= this.designer2Acknowledge.value.declarationDate;

    this.addContractorForm.value.contractorArr[0].signatorRole= this.contractorRole;
    this.addContractorForm.value.contractorArr[0].declarationName= this.contractorAcknowledge.value.declarationName;
    this.addContractorForm.value.contractorArr[0].declarationDate= this.contractorAcknowledge.value.declarationDate;

    this.addInspectorForm.value.inspectorArr[0].signatorRole= this.inspectorRole;
    this.addInspectorForm.value.inspectorArr[0].declarationName= this.inspectorAcknowledge.value.declarationName;
    this.addInspectorForm.value.inspectorArr[0].declarationDate= this.inspectorAcknowledge.value.declarationDate;

    this.reportDetails.userName = this.email;
    
    this.reportDetails.SignatorDetails = this.addDesigner1Form.value.designer1Arr;
    if(this.addDesigner2Form.value.designer2Arr[0].personName != "") {
      this.reportDetails.SignatorDetails=this.reportDetails.SignatorDetails.concat(this.addDesigner2Form.value.designer2Arr);
    }
      this.reportDetails.SignatorDetails=this.reportDetails.SignatorDetails.concat(this.addContractorForm.value.contractorArr,this.addInspectorForm.value.inspectorArr);
        
    this.reportDetailsService.addReportDetails(this.reportDetails).subscribe(
      data=> {
        console.log("worked");
      },
      error => {
      }
      )
  }
  nextTab3()
  {
  console.log(this.inspectionDetails);
  this.inspectionDetailsService.addInspectionDetails(this.inspectionDetails).subscribe(
    (    data: any)=> {
      console.log("worked");
    },
    (    error: any) => {
    }
    )
  }
}
