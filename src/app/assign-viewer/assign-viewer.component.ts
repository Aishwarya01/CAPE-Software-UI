import { Component, OnInit,Input, ViewChild, ViewContainerRef, ComponentFactoryResolver, EventEmitter} from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewerRegisterComponent } from '../viewer-register/viewer-register.component';
import { Register } from '../model/register';
import { ApplicationTypeService } from '../services/application.service';
import { InspectorregisterService } from '../services/inspectorregister.service';
import { SiteService } from '../services/site.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VerificationlvComponent } from '../verificationlv/verificationlv.component';
import { InspectionVerificationBasicInformationComponent } from '../inspection-verification-basic-information/inspection-verification-basic-information.component';
import { GlobalsService } from '../globals.service';
import { SiteaddComponent } from '../site/siteadd/siteadd.component';

@Component({
  selector: 'app-assign-viewer',
  templateUrl: './assign-viewer.component.html',
  styleUrls: ['./assign-viewer.component.css']
})
export class AssignViewerComponent implements OnInit {
  assignViewerForm = new FormGroup({
    viewerEmail: new FormControl(''),
  });
  viewerRegisterForm = new FormGroup({
    siteName: new FormControl(''),
    name: new FormControl(''),
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
    userType: new FormControl(''),
    terms: new FormControl('')
  });

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


  constructor(private dialog: MatDialog,
              private formBuilder: FormBuilder, private modalService: NgbModal,
              private siteService: SiteService,
              private applicationService: ApplicationTypeService,
              private inspectorRegisterService: InspectorregisterService,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver,
              private route: ActivatedRoute,
              private globalService: GlobalsService

              ) {
                this.urlEmail = this.route.snapshot.paramMap.get('email') || '{}';
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
  }

  createViewer(): FormGroup {
    return new FormGroup({
    name: new FormControl('', Validators.required),
    companyName: new FormControl('', Validators.required),
    siteName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    designation: new FormControl('', Validators.required),
    contactNumber: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    district: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    pinCode: new FormControl('', Validators.required),
    userType: new FormControl('', Validators.required),
    terms: new FormControl(''),
    })
    
    }

  populateData() {
    this.viewerRegisterForm.reset();
      if((this.registerData.role == 'ROLE') || (this.registerData.role == 'Viewer')) {
      this.demoArr = [];
      this.viewerRegisterForm.reset();
      this.demoArr.push(this.createGroup(this.registerData));
      this.viewerRegisterForm.setControl('viewerArr', this.formBuilder.array(this.demoArr || []))
      }
      else {
        this.register = new Register;
        this.register.username = this.assignViewerForm.value.viewerEmail;
        this.register.role = 'Viewer';
        this.demoArr = [];
        this.demoArr.push(this.createNewGroup(this.register));
        this.viewerRegisterForm.setControl('viewerArr', this.formBuilder.array(this.demoArr || []))
        this.setReadOnly = false;
        this.state = '';
      }
    this.registerData = [];
  }

  getViewerControls() : AbstractControl[] {
    return (<FormArray> this.viewerRegisterForm.get('viewerArr')).controls
  }

createGroup(item: any): FormGroup{
  // this.mobileArr = [];
  // this.mobileArr= item.contactNumber.split('-');
  this.setReadOnly = true;
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
  this.register.name=item.name;
  this.register.companyName=item.companyName;
  this.register.username=item.username;
  // this.register.contactNumber = item.contactNumber;
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
  this.register.role = 'Viewer';

  
  this.selectCountry(item.country);
  this.state = this.registerData.state;
  // item.contactNumber = this.mobileArr[0]+this.mobileArr[1];
  return this.formBuilder.group({
    name: new FormControl({value: item.name}),
    companyName: new FormControl({value: item.companyName}),
    siteName: new FormControl('',Validators.required),
    email: new FormControl({value: item.username}),
    designation: new FormControl({value: item.designation}),
    contactNumber: new FormControl(item.contactNumber),
    department: new FormControl({value: item.department}),
    address: new FormControl({value: item.address}),
    district: new FormControl({value: item.district},Validators.required),
    country: new FormControl({value: item.country},Validators.required),
    state: new FormControl({value: item.state},Validators.required),
    pinCode: new FormControl({value: item.pinCode},Validators.required),
    userType: new FormControl({value: 'Viewer'}),
    terms: new FormControl(''),
    

  });
}

createNewGroup(item: any): FormGroup{
  return this.formBuilder.group({
    name: new FormControl('',Validators.required),
    companyName: new FormControl('',Validators.required),
    siteName: new FormControl('',Validators.required),
    email: new FormControl({value: item.username}),
    designation: new FormControl('',Validators.required),
    contactNumber: new FormControl('',Validators.required),
    department: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required),
    district: new FormControl(''),
    country: new FormControl('',Validators.required),
    state: new FormControl('',Validators.required),
    pinCode: new FormControl('',Validators.required),
    userType: new FormControl({value: 'Viewer'}),
    terms: new FormControl(''),
  });
}

  openModal(contentViewer: any) {
    this.modalService.open(contentViewer,{size: 'xl', backdrop: 'static' })
  }
  termsCondition(termsContent:any){
    this.modalService.open(termsContent,{size: 'xl'})
  }
  continue(contentViewer:any) {
    this.submitted1 = true;
    if(this.assignViewerForm.invalid) {
      return;
    }
    this.inspectorRegisterService.retrieveInspector(this.assignViewerForm.value.viewerEmail).subscribe(
      (data) => {
        this.registerData = JSON.parse(data);
        this.showAssign = true;
        this.showRegister = false;
        
        if((this.registerData.role == 'ROLE') || (this.registerData.role == 'Viewer')) {
          this.success = true;
          this.successMsg1 = "Already registered as Viewer. Please verify the details once!"
          this.viewerFlag = true;
          this.flag=true;
        }
        else {
          this.success = true;
          this.successMsg1 = "Given email is registered as Inspector"
          this.viewerFlag = false;
            // this.modalService.dismissAll();
        }
        // else{
        //   this.success = true;
        //   this.successMsg1 = "Kindly fill in the details to assign viewer!"
        //   this.modalService.open(contentViewer,{size: 'xl'})
        // }
        setTimeout(()=>{
          this.success = false;
        this.successMsg1 = ""
        }, 3000);
      },
      (error) => {
        console.log(error);
        this.Error = true;
         let errorArr = [];
         errorArr = JSON.parse(error.error);
          this.errorMsg1 = errorArr.message;
        this.showAssign = false;
        this.showRegister = true;
        this.viewerFlag = true;
        this.flag=false;
        setTimeout(()=>{
          this.Error = false;
          this.errorMsg1 = "";
        }, 3000);
      }
    )

    setTimeout(()=>{
      if(this.viewerFlag) {
        this.openModal(contentViewer);
      }           
    }, 2000);
    setTimeout(()=>{
        this.populateData();
    }, 3000);
  }
  closeModalDialog(contentViewer2:any){
   this.modalService.dismissAll(contentViewer2)
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
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  get f() {
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

  closeAll() {
    this.modalService.dismissAll();
    this.dialog.closeAll();
  }

  onSubmit(flag: any) {
    
  this.submitted = true;

  //Breaks if form is invalid
  if(this.viewerRegisterForm.invalid) {
    return;
  }
  this.loading = true;
  
  this.register.role = 'Viewer';
  this.register.permission = 'Yes';
  this.register.assignedBy = this.email;
  if(!flag) {
    this.contactNumber = "";
    this.contactNumber = "+"+this.countryCode+"-"+this.viewerRegisterForm.controls.viewerArr.value[0].contactNumber;
    this.register.contactNumber = this.contactNumber;
    this.inspectorRegisterService.registerViewer(this.register).subscribe(
      data=> {
        this.successMsgOTP=true;
        this.successMsg="Viewer has been assigned successfully."
        setTimeout(()=>{
          this.successMsgOTP=false;
          this.successMsg="";
          this.modalService.dismissAll();
        }, 3000);
        this.globalService.viewerData = this.register;
        this.globalService.inspectorName = this.inspectorData.name;
        this.globalService.inspectorData = this.inspectorData;
        // this.onSave.emit(true);
        this.navigateToSite(this.register);
        // setTimeout(()=>{
        //   this.router.navigate(['/createPassword', {email: this.register.username}])
        // }, 5000);
      },
      error => {
        this.loading= false;
        this.errorMsgflag=true;
        this.errorMsg=error.error.message;
        setTimeout(()=>{
          this.errorMsgflag=false;
          this.errorMsg=" ";
        }, 3000);
      }
    )  
  }
  else{
    debugger
    this.register.contactNumber = this.viewerRegisterForm.controls.viewerArr.value[0].contactNumber
    this.inspectorRegisterService.updateRegister(this.register).subscribe(
      data=> {
        this.successMsgOTP=true;
        this.successMsg="You have successfully updated viewer profile"
        setTimeout(()=>{
          this.successMsgOTP=false;
          this.successMsg="";
          // this.closeAll();
          this.modalService.dismissAll();
        }, 3000);
        this.globalService.viewerData = this.register;
        this.globalService.inspectorName = this.inspectorData.name;
        this.globalService.inspectorData = this.inspectorData;

        // this.onSave.emit(true);
        this.navigateToSite(this.register);
        
        // setTimeout(()=>{
        //   this.router.navigate(['/createPassword', {email: this.register.username}])
        // }, 5000);
      },
      error => {
        this.loading= false;
        this.errorMsgflag=true;
        this.errorMsg=error.error.message;
        setTimeout(()=>{
          this.errorMsgflag=false;
          this.errorMsg=" ";
        }, 3000);
      }
    )
  }  

}
}
