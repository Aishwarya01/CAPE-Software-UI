import { Component, OnInit,Input, ViewChild, ViewContainerRef, ComponentFactoryResolver, EventEmitter, Output} from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewerRegisterComponent } from '../viewer-register/viewer-register.component';
import { License, Register } from '../model/register';
import { ApplicationTypeService } from '../services/application.service';
import { InspectorregisterService } from '../services/inspectorregister.service';
import { SiteService } from '../services/site.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VerificationlvComponent } from '../verificationlv/verificationlv.component';
import { InspectionVerificationBasicInformationComponent } from '../inspection-verification-basic-information/inspection-verification-basic-information.component';
import { GlobalsService } from '../globals.service';
import { SiteaddComponent } from '../site/siteadd/siteadd.component';
import { LPSBasicDetailsService } from '../LPS_services/lpsbasic-details.service';
import { LpsBasicPageComponent } from '../LPS/lps-basic-page/lps-basic-page.component';
import { LpsMatstepperComponent } from '../LPS/lps-matstepper/lps-matstepper.component';
import { LpsSavedReportComponent } from '../LPS/lps-saved-report/lps-saved-report.component';
import { BasicDetails } from '../LPS_model/basic-details';
import { Site, SitePersons } from '../model/site';
import { ThrowStmt } from '@angular/compiler';
import { LicenselistComponent } from '../licenselist/licenselist.component';

@Component({
  selector: 'app-assign-viewer',
  templateUrl: './assign-viewer.component.html',
  styleUrls: ['./assign-viewer.component.css']
})

export class AssignViewerComponent implements OnInit {
  license = new License();
  site = new Site();
  sitePerson=new SitePersons();
  
  assignViewerForm = new FormGroup({
    viewerEmail: new FormControl(''),
  });

  viewerRegisterForm = new FormGroup({
    siteName: new FormControl(''),
    name: new FormControl(''),
    clientName: new FormControl(''),
    projectName:new FormControl(''),
    companyName: new FormControl(''),
    email: new FormControl(''),
    contactNumber: new FormControl(''),
    department: new FormControl(''),  
    designation: new FormControl(''),
    address: new FormControl(''),
    district: new FormControl(''),
    country: new FormControl(''),
    state: new FormControl(''),
    pinCode: new FormControl(''),
    pinCodeErrorMsg: new FormControl(''),
    userType: new FormControl(''),
    terms: new FormControl(''),
    applicationType: new FormControl('')
  });
  modalReference: any;

  loading = true;
  submitted = false;
  submitted1 = false;
  msg: any;
  alert: any;
  countryList: any = [];
  stateList: any= [];
  selected: any;
  applicationTypeData: any="";
  register = new Register;
  successMsgOTP: boolean=false;
  errorMsg: any;
  errorMsgflag: boolean=false;
  successMsg: string="";
  isEnabled: boolean = false;
  isChecked: boolean = false;
  countryCode: String = '';
  contactNumber: string = '';
  @Input()
  email: String = '';
  @Input()
  userName: String = '';
  registerData: any = [];
  assignArr: any = [];
  state: String='';
  success: boolean = false;
  successMsg1: String = '';
  Error: boolean = false;
  errorMsg1: String = '';
  viewerFlag: boolean = false;
  flag: boolean = false;
  mobileArr: any = [];
  setReadOnly: boolean = false;
  showAssign: boolean = false;
  showRegister: boolean = false;
  @ViewChild('reference', { read: ViewContainerRef })
  viewContainerRef!: ViewContainerRef;
  destroy: boolean = false;
  urlEmail: String = '';
  data: boolean = false;
  onSave = new EventEmitter();
  inspectorData: any = [];
  demoArr: any = [];
  existSite: boolean = false;
  arr: any = [];
  // license page purpose
  viewerForLps: boolean=false;
  viewerForLV: boolean=false;
  lpsViewerForm!: FormGroup;
  applicationName: String="";

  projectNameMsg: string="";
  projectNameError: boolean=false;
  projectNameSuccess: boolean=false;
  projectNameMsg1: string="";
  onSubmitSite1 = new EventEmitter();
  basic = new BasicDetails();
  // Spinner Purpose
  spinner: boolean=false;
  spinnerValue: String = '';
  mode: any = 'indeterminate';

  constructor(private dialog: MatDialog,
              private formBuilder: FormBuilder, private modalService: NgbModal,
              private siteService: SiteService,
              private applicationService: ApplicationTypeService,
              private inspectorRegisterService: InspectorregisterService,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver,
              private route: ActivatedRoute,
              public globalService: GlobalsService,
              private lPSBasicDetailsService: LPSBasicDetailsService,
              
              ) {
                this.urlEmail = this.route.snapshot.paramMap.get('email') || '{}';
               this.pageHeading(this.viewerRegisterForm);
               }

  ngOnInit(): void {
    this.assignViewerForm = this.formBuilder.group({
      viewerEmail: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    });
    this.countryCode = '91';
    this.viewerRegisterForm = this.formBuilder.group({
      viewerArr: this.formBuilder.array([
        this.createViewer(),
      ])
    });

      this.inspectorRegisterService.retrieveInspector(this.email).subscribe(
        data => {
          this.inspectorData = JSON.parse(data);
        }
      )

      this.siteService.retrieveCountry().subscribe(
        data => {
          this.countryList = JSON.parse(data);
        }
      )
    //  this.pageHeading(this.viewerRegisterForm);
  }
  // getLpsViwer() : AbstractControl[] {
  //   return (<FormArray> this.lpsViewerForm.get('lpsViewer')).controls;
  // }
 
  createViewer(): FormGroup {
     let form:any;
    // LV Page
    if (this.globalService.triggerMsgForLicense == 'lvPage') {
      this.applicationName="LV Systems";
      this.viewerForLV=true;
      this.viewerForLps=false;

        form = this.formBuilder.group({
        name: new FormControl(''),
        companyName: new FormControl('', Validators.required),
        siteName: new FormControl('', [Validators.minLength(3),Validators.pattern('^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$')]),
        clientName: new FormControl(''),
        projectName:new FormControl(''),
        email: new FormControl('', Validators.required),
        designation: new FormControl('', Validators.required),
        contactNumber: new FormControl('', Validators.required),
        department: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required),
        district: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        pinCode: new FormControl('', Validators.required),
        pinCodeErrorMsg: new FormControl(''),
        userType: new FormControl('', Validators.required),
        terms: new FormControl(''),
        applicationType: new FormControl('')
        })
    }
    else if (this.globalService.triggerMsgForLicense == 'lpsPage') {
      this.applicationName="LPS Systems";
      this.viewerForLps=true;
      this.viewerForLV=false;

      form = this.formBuilder.group({
        name: new FormControl(''),
        companyName: new FormControl('', Validators.required),
        siteName: new FormControl('',),
        clientName: new FormControl('', Validators.required),
        projectName:new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        designation: new FormControl('', Validators.required),
        contactNumber: new FormControl('', Validators.required),
        department: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required),
        district: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        pinCode: new FormControl('', Validators.required),
        pinCodeErrorMsg: new FormControl(''),
        userType: new FormControl('', Validators.required),
        terms: new FormControl(''),
        applicationType: new FormControl('')
        })
    }  
    return form;
  }

  // Only Accept numbers
  keyPressNumbers(event:any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  projectValidation(event:any,form:any){
    if(form.controls.clientName.value!=undefined && form.controls.projectName.value!=undefined && form.controls.clientName.value!=null && form.controls.projectName.value!=null && form.controls.clientName.value!="" && form.controls.projectName.value!=""){

      this.lPSBasicDetailsService.validateProjectName(form.controls.clientName.value,form.controls.projectName.value).subscribe(
        data =>{
          // var b=form.controls.projectName.value;
          if(data != ''){
            this.projectNameMsg="Project Name is already existing, Please give different Project Name";
            this.projectNameMsg1="";
            this.projectNameError=true;
          }else {
            this.projectNameMsg1="You can continue with this "+[form.controls.projectName.value]+" Project Name";
            this.projectNameMsg="";
            this.projectNameSuccess=true;
            this.projectNameError=false;
            setTimeout(() => {
              this.projectNameSuccess=false;
              this.projectNameError=false;
            }, 3000);
          }
      })
    }
  }

  populateData() {
    this.viewerRegisterForm.reset();
      if(this.registerData !=null && this.registerData.registerId !=null || this.registerData.siteId != null) {
      // if( this.registerData.siteId != null) {
        this.demoArr = [];
        this.viewerRegisterForm.reset();
        this.demoArr.push(this.createGroup(this.registerData));
        this.viewerRegisterForm.setControl('viewerArr', this.formBuilder.array(this.demoArr || []));
      }
      else {
        this.register = new Register;
        // if(this.registerData !=null){
        //   this.register = this.registerData;
        // }
        this.register.username = this.assignViewerForm.value.viewerEmail;
        this.register.role = 'Viewer';
        this.demoArr = [];
        this.demoArr.push(this.createGroup(this.register));
        this.viewerRegisterForm.setControl('viewerArr', this.formBuilder.array(this.demoArr || []))
        this.setReadOnly = false;
        this.state = '';
      }
    this.registerData = [];
  
    if(this.globalService.triggerMsgForLicense=='lpsPage'){
      this.applicationName="LPS Systems";
    }
    // LV Page
    else if(this.globalService.triggerMsgForLicense=='lvPage'){
      this.applicationName="LV Systems";
    }
  }

  getViewerControls() : AbstractControl[] {
    return (<FormArray> this.viewerRegisterForm.get('viewerArr')).controls;
  }

  onFocusOutEvent(e: any,a: any) {
    if(e.target.value != '' && a.get('companyName')?.value != '' && a.get('companyName')?.value != undefined && a.get('department')?.value != '' && a.get('department')?.value != undefined) {
      let siteName = a.get('siteName')?.value;
      let companyName = a.get('companyName')?.value;
      let departmentName = a.get('department')?.value;

      if(!a.get('siteName')?.errors?.minlength) {
        this.siteService.retrieveSiteName(companyName,departmentName,siteName).subscribe(
          data => {
            
            if(data != '') {
              this.existSite = true;
            }
            else {
              this.existSite = false;
            }
          }
        )
      }
      else {
        this.existSite = false;
      }
    }
    else {
      this.existSite = false;
    }
  }

  onFocusOutEventCompany(e: any,a: any) {
    if(e.target.value != '' && a.get('siteName')?.value != '' && a.get('siteName')?.value != undefined && a.get('department')?.value != '' && a.get('department')?.value != undefined) {
      let siteName = a.get('siteName')?.value;
      let companyName = a.get('companyName')?.value;
      let departmentName = a.get('department')?.value;

      if(!a.get('siteName')?.errors?.minlength) {
        this.siteService.retrieveSiteName(companyName,departmentName,siteName).subscribe(
          data => {
            
            if(data != '') {
              this.existSite = true;
            }
            else {
              this.existSite = false;
            }
          }
        )
      }
      else {
        this.existSite = false;
      }
    }
    else {
      this.existSite = false;
    }
  }

  onFocusOutEventDepartment(e: any,a: any) {
    if(e.target.value != '' && a.get('siteName')?.value != '' && a.get('siteName')?.value != undefined && a.get('companyName')?.value != '' && a.get('companyName')?.value != undefined) {
      let siteName = a.get('siteName')?.value;
      let companyName = a.get('companyName')?.value;
      let departmentName = a.get('department')?.value;

      if(!a.get('siteName')?.errors?.minlength) {
        this.siteService.retrieveSiteName(companyName,departmentName,siteName).subscribe(
          data => {
            
            if(data != '') {
              this.existSite = true;
            }
            else {
              this.existSite = false;
            }
          }
        )
      }
      else {
        this.existSite = false;
      }
    }
    else {
      this.existSite = false;
    }
  }


createGroup(item: any): FormGroup{

  if(item !=null && item.country != undefined){
  this.setReadOnly = true;
  this.register.name=item.name;
  this.register.companyName=item.companyName;
  this.register.username=item.username;
  this.register.contactNumber = item.contactNumber;
  this.register.department=item.department;
  this.register.designation=item.designation;
  this.register.address=item.address;
  this.register.district=item.district;
  this.register.country=item.country;
  this.register.state=item.state;
  this.register.pinCode=item.pinCode;
  this.register.registerId = item.registerId
  this.register.createdBy = item.createdBy
  this.register.createdDate = item.createdDate
  this.register.password = item.password
  this.register.registerId = item.registerId
  this.register.role = 'Viewer';
 
  this.selectCountry(item.country);
  this.state = this.registerData.state;
  // item.contactNumber = this.mobileArr[0]+this.mobileArr[1];
  this.arr = []
    if(item.country == 'INDIA') {
      this.arr=[];
      this.arr.push(Validators.required,Validators.pattern('^[1-9][0-9]{5}$'));
      setTimeout(()=>{
        this.f.viewerArr.controls[0].controls['pinCodeErrorMsg'].setValue('Please enter 6 digit pincode');
      }, 500);
    }
    else if(item.country == 'NEPAL') {
      this.arr=[];
      this.arr.push(Validators.required,Validators.pattern('^[1-9][0-9]{4}$'));
      setTimeout(()=>{
        this.f.viewerArr.controls[0].controls['pinCodeErrorMsg'].setValue('Please enter 5 digit pincode');
      }, 500);
    }
    else {
      this.arr=[];
      this.arr.push(Validators.required);
    }
  }
  // this.mobileArr = [];
  // this.mobileArr= item.contactNumber.split('-');
 
  // this.viewerRegisterForm = this.formBuilder.group({
  //   name: [item.name, [Validators.required,]],
  //   companyName: [item.companyName, Validators.required],
  //   siteName: ['', Validators.required],
  //   email: [item.username, [
  //     Validators.required,
  //     Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
  //   contactNumber: [item.contactNumber, [Validators.required,Validators.maxLength(10)]],
  //   department: [item.department, Validators.required],
  //   designation: [item.designation, Validators.required],
  //   address: [item.address, Validators.required],
  //   district: [item.district],
  //   country: [item.country, Validators.required],
  //   state: [item.state, Validators.required],
  //   pinCode: [item.pinCode, Validators.required],
  //   userType: ['Viewer', Validators.required],
  //   terms: ['', Validators.required]

    
  // });
  

  let form: any;
  // LV Page
  if (this.globalService.triggerMsgForLicense == 'lvPage') {
    this.applicationName = "LV Systems";
    this.viewerForLV = true;
    this.viewerForLps = false;

    form = this.formBuilder.group({

      siteName: new FormControl('', [Validators.minLength(3), Validators.pattern('^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$')]),
      name: new FormControl(item.name),
      companyName: new FormControl(item.companyName, Validators.required),
      clientName: new FormControl(''),
      projectName: new FormControl(''),
      email: new FormControl(item.username, Validators.required),
      designation: new FormControl(item.designation, Validators.required),
      contactNumber: new FormControl(item.contactNumber, Validators.required),
      department: new FormControl(item.department, Validators.required),
      address: new FormControl(item.address, Validators.required),
      district: new FormControl(item.district, Validators.required),
      country: new FormControl(item.country, Validators.required),
      state: new FormControl(item.state, Validators.required),
      pinCode: new FormControl(item.pinCode, this.arr),
      pinCodeErrorMsg: new FormControl(''),
      userType: new FormControl({ value: 'Viewer' }),
      terms: new FormControl(''),
      applicationType: new FormControl(item.applicationType)
    })
  }
  else if (this.globalService.triggerMsgForLicense == 'lpsPage') {
    this.applicationName = "LPS Systems";
    this.viewerForLps = true;
    this.viewerForLV = false;

    form = this.formBuilder.group({
      name: new FormControl(item.name),
      companyName: new FormControl(item.companyName, Validators.required),
      siteName: new FormControl('',),
      clientName: new FormControl('', Validators.required),
      projectName: new FormControl('', Validators.required),
      email: new FormControl(item.username, Validators.required),
      designation: new FormControl(item.designation, Validators.required),
      contactNumber: new FormControl(item.contactNumber, Validators.required),
      department: new FormControl(item.department, Validators.required),
      address: new FormControl(item.address, Validators.required),
      district: new FormControl(item.district, Validators.required),
      country: new FormControl(item.country, Validators.required),
      state: new FormControl(item.state, Validators.required),
      pinCode: new FormControl(item.pinCode, this.arr),
      pinCodeErrorMsg: new FormControl(''),
      userType: new FormControl({ value: 'Viewer' }),
      terms: new FormControl(''),
      applicationType: new FormControl('')
    })
  }  
    return form;
}

createNewGroup(item: any): FormGroup{
  return this.formBuilder.group({
    name: new FormControl(''),
    companyName: new FormControl('', Validators.required),
    siteName: new FormControl('', [Validators.minLength(3), Validators.pattern('^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$')]),
    clientName: new FormControl(''),
    projectName: new FormControl(''),
    email: new FormControl({ value: item.username }),
    designation: new FormControl('', Validators.required),
    contactNumber: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    district: new FormControl(''),
    country: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    pinCode: new FormControl('', Validators.required),
    pinCodeErrorMsg: new FormControl(''),
    userType: new FormControl({ value: 'Viewer' }),
    terms: new FormControl(''),
    applicationType: new FormControl('')
  });
}

  openModal(contentViewer: any) {
    this.modalService.open(contentViewer,{size: 'xl', backdrop: 'static' });
    this.globalService.emailCheck=false;
  }
  termsCondition(termsContent:any){
    this.modalReference = this.modalService.open(termsContent,{size: 'xl'})
  }
  onCancel() {
    this.modalReference.close();
  }
  continue(contentViewer: any) {
    this.registerData = [];
    this.existSite = false;
    this.submitted1 = true;
    if (this.assignViewerForm.invalid) {
      return;
    }
    // LV Page
    // else if (this.globalService.triggerMsgForLicense == 'lvPage') {
    //   this.applicationName = "LV Systems";
    // }
    // else if (this.globalService.triggerMsgForLicense == 'lpsPage') {
    //   this.applicationName = "LPS Systems";
    // }
    // else {
      this.inspectorRegisterService.retrieveInspector(this.assignViewerForm.value.viewerEmail).subscribe(
        (data) => {
          this.registerData = JSON.parse(data);
          this.showAssign = true;
          this.showRegister = false;

          if ((this.registerData.role == 'ROLE') || (this.registerData.role == 'Viewer')) {       

            if (this.globalService.triggerMsgForLicense == 'lvPage') {

              this.inspectorRegisterService.retrieveSite(this.assignViewerForm.value.viewerEmail).subscribe(
                (data) => {
                  if(JSON.parse(data) == null){
                    this.spinner=true;
                    this.spinnerValue = "Please wait, the details are loading!";
                    setTimeout(() => {
                      this.viewerFlag = true;
                      if (this.viewerFlag) {
                        this.openModal(contentViewer);
                      }
                    }, 3000);
                    setTimeout(() => {
                      this.spinner=false;
                      this.spinnerValue="";
                      this.populateData();
                    }, 2000);
                  }
                  else{
                    this.success = true;
                    this.successMsg1 = "Given Email-ID is already registered as Viewer for ["+ JSON.parse(data).site +"] site. Please try with new Email-ID for further";
                    this.flag = true;
                    return;
                  }
                },
                (error) =>{
                });
            }
            else if (this.globalService.triggerMsgForLicense == 'lpsPage') {
              this.lPSBasicDetailsService.retriveLpsbasicIsActive(this.assignViewerForm.value.viewerEmail).subscribe(
                (data) =>{
                  if(JSON.parse(data) == null){
                    this.spinner=true;
                    this.spinnerValue = "Please wait, the details are loading!";
                    setTimeout(() => {
                      this.viewerFlag = true;
                      if (this.viewerFlag) {
                        this.openModal(contentViewer);
                      }
                    }, 3000);
                    setTimeout(() => {
                      this.spinner=false;
                      this.spinnerValue="";
                      this.populateData();
                    }, 2000);
                  }
                  else{
                    this.success = true;
                    this.successMsg1 = "Given Email-ID is already registered as Viewer, Please try with new Email-ID for further";
                    this.flag = true;
                    return;
                  }
                },
                (error) =>{
                })
            }
          }

          else {
            this.success = true;
            this.successMsg1 = "Given email is registered as Inspector";
            this.viewerFlag = false;
          }
         
          setTimeout(() => {
            this.success = false;
            this.successMsg1 = ""
          }, 3000);
        },
        (error) => {
          this.Error = true;
          let errorArr = [];
          errorArr = JSON.parse(error.error);
          this.errorMsg1 = errorArr.message;
          this.showAssign = false;
          this.showRegister = true;
          this.viewerFlag = true;
          this.flag = false;
          this.success=false;
          this.successMsg1="";
          setTimeout(() => {
            this.Error = false;
            this.errorMsg1 = "";
            this.spinner=true;
            this.spinnerValue = "Please wait, the details are loading!";
            if("Email Id doesn't exist!" == JSON.parse(error.error).message){
              setTimeout(() => {
                this.viewerFlag = true;
                this.spinner=false;
                this.spinnerValue="";
                this.globalService.emailCheck=false;
                if (this.viewerFlag) {
                  this.openModal(contentViewer);
                }
              }, 3000);
              setTimeout(() => {
                this.populateData();
              }, 3000);
            }
          }, 3000);
        }
      )
    // }   
  }
  closeModalDialog(contentViewer2:any){
   this.modalService.dismissAll(contentViewer2);
   this.globalService.emailCheck=false;
   this.dialog.closeAll();
  }
  // closeModalDialogTerms(termsContent:any){
  //   this.modalService.dismissAll(termsContent)
  //  }
  closeModalDialogContinue(){
    if(!this.globalService.useClicked){
      this.globalService.noofLicense=0; //aish
    }
    this.dialog.closeAll();
   }
//   assignViewer(id: string) {
//     this.modalService.open(id, { centered: true});
// }

// closeModalDialog(id: string) {
//     this.modalService.dismissAll(id);
// }
  onItemSelect(item: any) {
    //console.log(item);
  }
  onSelectAll(items: any) {
    //console.log(items);
  }
  get f() : any{
    return this.viewerRegisterForm.controls;
  }


  selectCountry(e: any) {
    let changedValue;
    if(e.target != undefined) {
      changedValue = e.target.value;
    }
    else{
      changedValue = e;
    }    
    this.stateList = [];
      for(let arr of this.countryList) {
        if( arr.name == changedValue) {
          this.siteService.retrieveState(arr.code).subscribe(
            data => {
              this.stateList = JSON.parse(data)
            }
          )};
      }
      // if(changedValue == "IND") {
      //   this.siteService.retrieveStateV2(changedValue).subscribe(
      //     data => {
      //       this.stateList = JSON.parse(data)
      //     }
      //   );
      // }
      if(changedValue == 'INDIA') {
        this.f.viewerArr.controls[0].controls['pinCode'].setValidators([Validators.required,Validators.pattern('^[1-9][0-9]{5}$')]);
        this.f.viewerArr.controls[0].controls['pinCode'].updateValueAndValidity();
        this.f.viewerArr.controls[0].controls['pinCodeErrorMsg'].setValue('Please enter 6 digit pincode');
      }
      else if(changedValue == 'NEPAL') {
        this.f.viewerArr.controls[0].controls['pinCode'].setValidators([Validators.required,Validators.pattern('^[1-9][0-9]{4}$')]);
        this.f.viewerArr.controls[0].controls['pinCode'].updateValueAndValidity();
        this.f.viewerArr.controls[0].controls['pinCodeErrorMsg'].setValue('Please enter 5 digit pincode');
      }
      else {
        this.f.viewerArr.controls[0].controls['pinCode'].setValidators([Validators.required]);
        this.f.viewerArr.controls[0].controls['pinCode'].updateValueAndValidity();
        this.f.viewerArr.controls[0].controls['pinCodeErrorMsg'].setValue('');
  
        //this.pinCodeErrorMsg = 'Please enter pincode';
      }
       
  }

  countryChange(country: any) {
    this.countryCode = country.dialCode;
  }


  showSubmit() {
    if(this.isChecked) {
      this.loading = false;
    }
    else{
      this.loading = true;
    }
  }
  cancel(){
    this.dialog.closeAll();
  }


  navigateToSite(data: any) {
    const dialogRef = this.dialog.open(SiteaddComponent, {
      width: '1000px',
      maxHeight: '90vh',
      disableClose: true,
    });
    dialogRef.componentInstance.data = data;
    dialogRef.componentInstance.onSubmitSite.subscribe(data=>{
      if(data) {
        this.onSave.emit(true);
      }
      else{
        this.onSave.emit(false);
      }
    })
    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  navigateToLpsBasivPage(data:any){
    // const dialogRef = this.dialog.open(, {
    //   disableClose: true,
    // });
    // dialogRef.componentInstance.onSubmitSite1.subscribe(data=>{

    this.onSubmitSite1.emit(true);
      if(data) {
        this.onSave.emit(true);
      }
      else{
        this.onSave.emit(false);
      }
    // })
    // dialogRef.afterClosed().subscribe((result) => {
    // });
  }

  closeAll() {
    this.modalService.dismissAll();
    this.dialog.closeAll();
  }

  onSubmit(flag: any, form: any) {
    this.submitted = true;
    if (this.existSite) {
      return;
    }
    //Breaks if form is invalid
    if (this.viewerRegisterForm.invalid) {
      return;
    }
    this.loading = true;

    this.register.role = 'Viewer';
    this.register.permission = 'Yes';
    this.register.assignedBy = this.email;

    let applicationType = '';
    // Here we are binding values for license Table
    if (this.globalService.headerMsg == "lvPage") {
      applicationType = "LV Systems";
      this.register.selectedProject = "LV";
    }

    // Here we are binding the lps application name
    else if (this.globalService.headerMsg == "lpsPage") {
      applicationType = "LPS Systems";
      this.register.selectedProject = "LPS";
    }

    // //finding the application_type appened or not
    // if (this.register.applicationType != null && this.register.applicationType.split(",").length != 0) {
    //   let flag = true;
    //   for (let value of this.register.applicationType.split(",")) {
    //     if (value == applicationType) {
    //       flag = false;
    //     }
    //   }
    //   if (flag) {
    //     this.register.applicationType = this.register.applicationType + "," + applicationType;
    //   }
    // }
    // else {
    //   this.register.applicationType = applicationType;
    // }

    this.register.applicationType = this.applicationName;
    
    // if (!flag || this.register.registerId != null || this.register.registerId != 0) {
      this.contactNumber = "";
      this.contactNumber = "+" + this.countryCode + "-" + this.viewerRegisterForm.controls.viewerArr.value[0].contactNumber;
      this.register.contactNumber = this.contactNumber;
      this.inspectorRegisterService.registerLicense(this.register).subscribe(
        data => {
          sessionStorage.setItem("clientName", this.register.clientName);
          sessionStorage.setItem("projectName", this.register.projectName)
          this.successMsgOTP = true;
          if(this.globalService.triggerMsgForLicense=='lvPage'){
            this.successMsg = "Viewer successfully assigned for this "+this.register.siteName+" in LV Systems";
          }
          else if(this.globalService.triggerMsgForLicense=='lpsPage'){
            this.successMsg = "Viewer successfully assigned for this "+this.register.projectName+" in LPS Systems.";
          }
          setTimeout(() => {
            this.successMsgOTP = false;
            this.successMsg = "";
            this.modalService.dismissAll();
          }, 3000);
          this.globalService.viewerData = this.register;
          this.globalService.inspectorName = this.inspectorData.name;
          this.globalService.inspectorData = this.inspectorData;
          // this.onSave.emit(true);

          // License Purpose
          if (this.globalService.triggerMsgForLicense == "lvPage") {
            this.site.userName = this.email;
            this.site.assignedTo = this.register.username;
            this.site.departmentName = this.register.department;
            this.site.site = this.register.siteName;
            this.site.companyName = this.register.companyName;
            this.site.landMark = this.register.companyName;
            this.site.allStepsCompleted = "Register";
            this.sitePerson.designation = this.register.designation;
            this.site.zipCode = this.register.pinCode;
            this.site.addressLine_1 = this.register.address;
            this.site.country = this.register.country;
            this.site.state = this.register.state;
            this.site.landMark=this.register.address;
            this.sitePerson.personIncharge = this.register.name;
            this.sitePerson.designation = this.register.designation;
            this.sitePerson.contactNo = this.register.contactNumber;
            this.sitePerson.personInchargeEmail = this.register.username;
            this.sitePerson.personId = this.register.personId;
            
            this.site.sitePersons = [];
            this.site.sitePersons.push(this.sitePerson);

            this.siteService.addSIte(this.site).subscribe(
              data => {
                this.globalService.toggle=false;
                this.spinner=true;
                this.spinnerValue = "Please wait, the details are loading!";
                setTimeout(() => {
                  this.spinner=false;
                  this.spinnerValue="";
                  this.navigateToSite(JSON.parse(data));
                }, 2000);
              })
          }
          else if (this.globalService.triggerMsgForLicense == "lpsPage") {

            this.basic.clientName = this.register.clientName;
            this.basic.projectName = this.register.projectName;
            this.basic.address = this.register.address;
            this.basic.userName = this.email;
            this.basic.mailId = this.register.username;
            this.basic.contactNumber = this.register.contactNumber;
            this.lPSBasicDetailsService.saveLPSBasicDetails(this.basic).subscribe(
              data => {
                this.globalService.basicLPSID = JSON.parse(data).basicLpsId;
                this.navigateToLpsBasivPage(this.register);
              });
          }
          // setTimeout(()=>{
          //   this.router.navigate(['/createPassword', {email: this.register.username}])
          // }, 5000);
        },
        error => {
          this.loading = false;
          this.errorMsgflag = true;
          this.errorMsg = error.error.message;
          this.onSubmitSite1.emit(false);
          setTimeout(() => {
            this.errorMsgflag = false;
            this.errorMsg = " ";
          }, 3000);
        }
      )
    // }
    // else {
    //   this.register.contactNumber = this.viewerRegisterForm.controls.viewerArr.value[0].contactNumber
    //   this.inspectorRegisterService.updateRegister(this.register).subscribe(
    //     data => {
    //       this.successMsgOTP = true;
    //       this.successMsg = data;
    //       setTimeout(() => {
    //         this.successMsgOTP = false;
    //         this.successMsg = "";
    //         // this.closeAll();
    //         this.modalService.dismissAll();
    //       }, 3000);
    //       this.globalService.viewerData = this.register;
    //       this.globalService.inspectorName = this.inspectorData.name;
    //       this.globalService.inspectorData = this.inspectorData;

    //       // this.onSave.emit(true);
    //       this.navigateToSite(this.register);
    //       // setTimeout(()=>{
    //       //   this.router.navigate(['/createPassword', {email: this.register.username}])
    //       // }, 5000);
    //     },
    //     error => {
    //       this.loading = false;
    //       this.errorMsgflag = true;
    //       this.errorMsg = JSON.parse(error.error);
    //       this.errorMsg = this.errorMsg.message;
    //       setTimeout(() => {
    //         this.errorMsgflag = false;
    //         this.errorMsg = " ";
    //       }, 3000);
    //     }
    //   )
    // }
  }

  pageHeading(form:any){
    this.globalService.licensePageHeaging();
    // LPS Page
    if(this.globalService.triggerMsgForLicense=='lpsPage'){
      
      this.applicationName="LPS Systems";
      this.viewerForLps=true;
      this.viewerForLV=false;
      form.controls.clientName.setValidators();
      form.controls.clientName.updateValueAndValidity();
      form.controls.projectName.setValidators();
      form.controls.projectName.updateValueAndValidity();
      // LV 
      form.controls.siteName.clearValidators();
      form.controls.siteName.updateValueAndValidity();
      form.controls.name.clearValidators();
      form.controls.name.updateValueAndValidity();
    }
    // LV Page
    else if(this.globalService.triggerMsgForLicense=='lvPage'){
      
      this.applicationName="LV Systems";
      this.viewerForLV=true;
      this.viewerForLps=false;
      // lps
      form.controls.clientName.clearValidators();
      form.controls.clientName.updateValueAndValidity();
      form.controls.projectName.clearValidators();
      form.controls.projectName.updateValueAndValidity();
      // lv
      form.controls.siteName.setValidators();
      form.controls.siteName.updateValueAndValidity();
      form.controls.name.setValidators();
      form.controls.name.updateValueAndValidity();
    }
  }
}
