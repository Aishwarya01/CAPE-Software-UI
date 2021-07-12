import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup,Validators,ValidatorFn } from '@angular/forms';
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

import { GlobalsService } from '../globals.service';

// import {Ng2TelInputModule} from 'ng2-tel-input';

@Component({
  selector: 'app-inspection-verification-basic-information',
  templateUrl: './inspection-verification-basic-information.component.html',
  styleUrls: ['./inspection-verification-basic-information.component.css']
})

export class InspectionVerificationBasicInformationComponent implements OnInit {

  step1Form!: FormGroup;


  public data: string = "";

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
  showDesigner2: boolean= false;
  showAddButton: boolean= true;
  loading = false;
  submitted = false;
  inspectorArr!: FormArray;
  designer2Arr!: FormArray;
  @Output() proceedNext = new EventEmitter<any>();



  designerRole: String ='designer';
  contractorRole: String ='contractor';
  inspectorRole: String ='inspector';


  // Second Tab dependencies
  panelOpenState = false;
  installationList: String[]= ['New installation','First verification of an existing','Addition of an existing installation','Alteration in an existing installation','Periodic verification'];
  premiseList: String[]= ['Domestic(Individual)','Domestic(Apartment)','Commercial','IT/Office','Data center','Industrial(Non Ex environment)','Industrial(Ex environment)'];
  evidenceList: String[]= ['Yes', 'No', 'Not Apparent'];
  previousRecordList: String[]= ['Yes', 'No'];




  formBuilder: any;
   constructor(private _formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private clientService: ClientService,
    private departmentService: DepartmentService,
    private reportDetailsService: ReportDetailsService,
    private siteService: SiteService,
    public service: GlobalsService,
    private ChangeDetectorRef: ChangeDetectorRef) {
    this.email = this.router.snapshot.paramMap.get('email') || '{}'
  }



  ngOnInit(): void {

    this.step1Form = this._formBuilder.group({
      clientName: ['', Validators.required],
      departmentName: ['', Validators.required],
      siteName: ['', Validators.required],
      descriptionOfReport: ['', Validators.required],
      reasonOfReport: ['', Validators.required],
      installationType: ['', Validators.required],
      descPremise: ['', Validators.required],
      showField1: ['', Validators.required],
      evidenceAlterations: ['', Validators.required],
      showField2: ['', Validators.required],
      previousRecord: ['', Validators.required],
      inspectionLast: ['', Validators.required],
      extentInstallation: ['', Validators.required],
      detailsOfClient: ['', Validators.required],
      detailsOfInstallation: ['', Validators.required],
      startingDateVerification: ['', Validators.required],
      engineerName: ['', Validators.required],
      designation: ['', Validators.required],
      companyName: ['', Validators.required],
      confirmExtent: ['', Validators.required],
      nextInspection: ['', Validators.required],
      designer1AcknowledgeArr: this._formBuilder.array([this.createDesigner1AcknowledgeForm()]),
      designer2AcknowledgeArr: this._formBuilder.array([this.createDesigner2AcknowledgeForm()]),
      contractorAcknowledgeArr: this._formBuilder.array([this.createContractorAcknowledgeForm()]),
      inspectorAcknowledgeArr: this._formBuilder.array([this.createInspectorAcknowledgeForm()]),
      designer1Arr: this._formBuilder.array([this.createDesigner1Form()]),
      designer2Arr: this._formBuilder.array([this.createDesigner2Form()]),
      contractorArr: this._formBuilder.array([this.createContractorForm()]),
      inspectorArr: this._formBuilder.array([this.createInspectorForm()])
    });
    this.siteService.retrieveCountry().subscribe(
      data => {
        this.countryList = JSON.parse(data);
      }
    )
    this.refresh();
    this.retrieveClientDetails();
    this.inspectorArr = this.step1Form.get('inspectorArr') as FormArray;

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
      this.step1Form.controls["showField1"].clearValidators();
      this.step1Form.controls["showField1"].updateValueAndValidity();
    }
    else {
      this.showField1 = true;
      this.step1Form.controls["showField1"].setValidators([Validators.required]);
      this.step1Form.controls["showField1"].updateValueAndValidity();
    }
  }

  showEstimatedAge(e: any) {
    let changedValue = e.target.value;
    if(changedValue == "Yes") {
      this.showField2 = true;
      this.step1Form.controls["showField2"].setValidators([Validators.required]);
      this.step1Form.controls["showField2"].updateValueAndValidity();
    }
    else {
      this.showField2 = false;
      this.step1Form.controls["showField2"].clearValidators();
      this.step1Form.controls["showField2"].updateValueAndValidity();
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

  // Signature part

  private createDesigner1AcknowledgeForm(): FormGroup {
    return new FormGroup({
      signature: new FormControl('',[Validators.required]),
      declarationDate: new FormControl('',[Validators.required]),
      declarationName: new FormControl('',[Validators.required])
    })
  }

  private createDesigner2AcknowledgeForm(): FormGroup {
    return new FormGroup({
      signature: new FormControl('',[Validators.required]),
      declarationDate: new FormControl('',[Validators.required]),
      declarationName: new FormControl('',[Validators.required])
    })
  }

  private createContractorAcknowledgeForm(): FormGroup {
    return new FormGroup({
      signature: new FormControl('',[Validators.required]),
      declarationDate: new FormControl('',[Validators.required]),
      declarationName: new FormControl('',[Validators.required])
    })
  }

  private createInspectorAcknowledgeForm(): FormGroup {
    return new FormGroup({
      signature: new FormControl('',[Validators.required]),
      declarationDate: new FormControl('',[Validators.required]),
      declarationName: new FormControl('',[Validators.required])
    })
  }

  getDesigner1AcknowledgeControls(): AbstractControl[] {
    return (<FormArray> this.step1Form.get('designer1AcknowledgeArr')).controls
  }
  getDesigner2AcknowledgeControls(): AbstractControl[] {
    return (<FormArray> this.step1Form.get('designer2AcknowledgeArr')).controls
  }
  getContractorAcknowledgeControls(): AbstractControl[] {
    return (<FormArray> this.step1Form.get('contractorAcknowledgeArr')).controls
  }
  getInspectorAcknowledgeControls(): AbstractControl[] {
    return (<FormArray> this.step1Form.get('inspectorAcknowledgeArr')).controls
  }

  // Deisgner details forms
  private createDesigner1Form(): FormGroup {
    return new FormGroup({
      personName: new FormControl('',[Validators.required]),
      personContactNo: new FormControl('',[Validators.required]),
      personMailID: new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      managerName: new FormControl('',[Validators.required]),
      managerContactNo: new FormControl('',[Validators.required]),
      managerMailID: new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      companyName: new FormControl('',[Validators.required]),
      addressLine1: new FormControl('',[Validators.required]),
      addressLine2: new FormControl('',[Validators.required]),
      landMark: new FormControl('',[Validators.required]),
      country: new FormControl('',[Validators.required]),
      state: new FormControl('',[Validators.required]),
      pinCode: new FormControl('',[Validators.required]),
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
      return (<FormArray> this.step1Form.get('designer1Arr')).controls
  }

  getDesigner2Controls(): AbstractControl[] {
    return (<FormArray> this.step1Form.get('designer2Arr')).controls
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
      personName: new FormControl('',[Validators.required]),
      personContactNo: new FormControl('',[Validators.required]),
      personMailID: new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      managerName: new FormControl('',[Validators.required]),
      managerContactNo: new FormControl('',[Validators.required]),
      managerMailID: new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      companyName: new FormControl('',[Validators.required]),
      addressLine1: new FormControl('',[Validators.required]),
      addressLine2: new FormControl('',[Validators.required]),
      landMark: new FormControl('',[Validators.required]),
      country: new FormControl('',[Validators.required]),
      state: new FormControl('',[Validators.required]),
      pinCode: new FormControl('',[Validators.required]),
      signatorRole: new FormControl(''),
      declarationDate: new FormControl(''),
      declarationName: new FormControl('')
    })
  }

  getContractorControls(): AbstractControl[] {
    return (<FormArray> this.step1Form.get('contractorArr')).controls
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
     personName: new FormControl('',[Validators.required]),
      personContactNo: new FormControl('',[Validators.required]),
      personMailID: new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      managerName: new FormControl('',[Validators.required]),
      managerContactNo: new FormControl('',[Validators.required]),
      managerMailID: new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      companyName: new FormControl('',[Validators.required]),
      addressLine1: new FormControl('',[Validators.required]),
      addressLine2: new FormControl('',[Validators.required]),
      landMark: new FormControl('',[Validators.required]),
      country: new FormControl('',[Validators.required]),
      state: new FormControl('',[Validators.required]),
      pinCode: new FormControl('',[Validators.required]),
      signatorRole: new FormControl(''),
      declarationDate: new FormControl(''),
      declarationName: new FormControl('')
    })
  }

  getInspectorControls(): AbstractControl[] {
    return (<FormArray> this.step1Form.get('inspectorArr')).controls
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


  addDesigner() {
    this.showDesigner2= true;
    this.showAddButton= false;

    this.f.designer2Arr.controls[0].controls['personName'].setValidators(Validators.required);
    this.f.designer2Arr.controls[0].controls['personName'].updateValueAndValidity();

    this.f.designer2Arr.controls[0].controls['personContactNo'].setValidators(Validators.required);
    this.f.designer2Arr.controls[0].controls['personContactNo'].updateValueAndValidity();

    this.f.designer2Arr.controls[0].controls['personMailID'].setValidators([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);
    this.f.designer2Arr.controls[0].controls['personMailID'].updateValueAndValidity();

    this.f.designer2Arr.controls[0].controls['managerName'].setValidators(Validators.required);
    this.f.designer2Arr.controls[0].controls['managerName'].updateValueAndValidity();

    this.f.designer2Arr.controls[0].controls['managerContactNo'].setValidators(Validators.required);
    this.f.designer2Arr.controls[0].controls['managerContactNo'].updateValueAndValidity();

    this.f.designer2Arr.controls[0].controls['managerMailID'].setValidators([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);
    this.f.designer2Arr.controls[0].controls['managerMailID'].updateValueAndValidity();

    this.f.designer2Arr.controls[0].controls['companyName'].setValidators(Validators.required);
    this.f.designer2Arr.controls[0].controls['companyName'].updateValueAndValidity();

    this.f.designer2Arr.controls[0].controls['addressLine1'].setValidators(Validators.required);
    this.f.designer2Arr.controls[0].controls['addressLine1'].updateValueAndValidity();

    this.f.designer2Arr.controls[0].controls['addressLine2'].setValidators(Validators.required);
    this.f.designer2Arr.controls[0].controls['addressLine2'].updateValueAndValidity();

    this.f.designer2Arr.controls[0].controls['landMark'].setValidators(Validators.required);
    this.f.designer2Arr.controls[0].controls['landMark'].updateValueAndValidity();

    this.f.designer2Arr.controls[0].controls['country'].setValidators(Validators.required);
    this.f.designer2Arr.controls[0].controls['country'].updateValueAndValidity();

    this.f.designer2Arr.controls[0].controls['state'].setValidators(Validators.required);
    this.f.designer2Arr.controls[0].controls['state'].updateValueAndValidity();

    this.f.designer2Arr.controls[0].controls['pinCode'].setValidators(Validators.required);
    this.f.designer2Arr.controls[0].controls['pinCode'].updateValueAndValidity();

  }

  removeDesigner() {
    this.showDesigner2= false;
    this.showAddButton= true;
    this.f.designer2Arr.controls[0].controls['personName'].clearValidators();
    this.f.designer2Arr.controls[0].controls['personName'].updateValueAndValidity();

    this.f.designer2Arr.controls[0].controls['personContactNo'].clearValidators();
    this.f.designer2Arr.controls[0].controls['personContactNo'].updateValueAndValidity();

    this.f.designer2Arr.controls[0].controls['personMailID'].clearValidators();
    this.f.designer2Arr.controls[0].controls['personMailID'].updateValueAndValidity();

    this.f.designer2Arr.controls[0].controls['managerName'].clearValidators();
    this.f.designer2Arr.controls[0].controls['managerName'].updateValueAndValidity();

    this.f.designer2Arr.controls[0].controls['managerContactNo'].clearValidators();
    this.f.designer2Arr.controls[0].controls['managerContactNo'].updateValueAndValidity();

    this.f.designer2Arr.controls[0].controls['managerMailID'].clearValidators();
    this.f.designer2Arr.controls[0].controls['managerMailID'].updateValueAndValidity();

    this.f.designer2Arr.controls[0].controls['companyName'].clearValidators();
    this.f.designer2Arr.controls[0].controls['companyName'].updateValueAndValidity();

    this.f.designer2Arr.controls[0].controls['addressLine1'].clearValidators();
    this.f.designer2Arr.controls[0].controls['addressLine1'].updateValueAndValidity();

    this.f.designer2Arr.controls[0].controls['addressLine2'].clearValidators();
    this.f.designer2Arr.controls[0].controls['addressLine2'].updateValueAndValidity();

    this.f.designer2Arr.controls[0].controls['landMark'].clearValidators();
    this.f.designer2Arr.controls[0].controls['landMark'].updateValueAndValidity();

    this.f.designer2Arr.controls[0].controls['country'].clearValidators();
    this.f.designer2Arr.controls[0].controls['country'].updateValueAndValidity();

    this.f.designer2Arr.controls[0].controls['state'].clearValidators();
    this.f.designer2Arr.controls[0].controls['state'].updateValueAndValidity();

    this.f.designer2Arr.controls[0].controls['pinCode'].clearValidators();
    this.f.designer2Arr.controls[0].controls['pinCode'].updateValueAndValidity();



    return (<FormArray> this.step1Form.get('designer2Arr')).reset();
  }

  get f():any {
    return this.step1Form.controls;
  }


  setTrue() {
   this.submitted = true;
    if(this.step1Form.invalid) {
      return;
    }
    this.proceedNext.emit(true);
  }


  nextTab() {
    this.loading = true;

    if(this.step1Form.invalid) {
      return;
    }

    this.step1Form.value.designer1Arr[0].signatorRole= this.designerRole;
    this.step1Form.value.designer1Arr[0].declarationName= this.step1Form.value.designer1AcknowledgeArr[0].declarationName;
    this.step1Form.value.designer1Arr[0].declarationDate= this.step1Form.value.designer1AcknowledgeArr[0].declarationDate;

    this.step1Form.value.designer2Arr[0].signatorRole= this.designerRole;
    this.step1Form.value.designer2Arr[0].declarationName= this.step1Form.value.designer2AcknowledgeArr[0].declarationName;
    this.step1Form.value.designer2Arr[0].declarationDate= this.step1Form.value.designer2AcknowledgeArr[0].declarationName;

    this.step1Form.value.contractorArr[0].signatorRole= this.contractorRole;
    this.step1Form.value.contractorArr[0].declarationName= this.step1Form.value.contractorAcknowledgeArr[0].declarationName;
    this.step1Form.value.contractorArr[0].declarationDate= this.step1Form.value.contractorAcknowledgeArr[0].declarationName;

    this.step1Form.value.inspectorArr[0].signatorRole= this.inspectorRole;
    this.step1Form.value.inspectorArr[0].declarationName= this.step1Form.value.inspectorAcknowledgeArr[0].declarationName;
    this.step1Form.value.inspectorArr[0].declarationDate= this.step1Form.value.inspectorAcknowledgeArr[0].declarationName;

    this.reportDetails.userName = this.email;

    this.reportDetails.SignatorDetails = this.step1Form.value.designer1Arr;
    if(this.step1Form.value.designer2Arr[0].personName != "" && this.step1Form.value.designer2Arr[0].personName != null) {
      this.reportDetails.SignatorDetails=this.reportDetails.SignatorDetails.concat(this.step1Form.value.designer2Arr);
    }


      this.reportDetails.SignatorDetails=this.reportDetails.SignatorDetails.concat(this.step1Form.value.contractorArr,this.step1Form.value.inspectorArr);
    console.log(this.reportDetails)
    this.reportDetailsService.addReportDetails(this.reportDetails).subscribe(
      data=> {
        console.log("worked");
      },
      error => {
      }
      )
      this.service.siteCount=this.reportDetails.siteId;

  }


}


