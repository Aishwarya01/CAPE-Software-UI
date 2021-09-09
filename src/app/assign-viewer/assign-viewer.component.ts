import { Component, OnInit,Input} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewerRegisterComponent } from '../viewer-register/viewer-register.component';
import { Register } from '../model/register';
import { ApplicationTypeService } from '../services/application.service';
import { InspectorregisterService } from '../services/inspectorregister.service';
import { SiteService } from '../services/site.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  constructor(private dialog: MatDialog,
              private formBuilder: FormBuilder, private modalService: NgbModal,
              private siteService: SiteService,
              private applicationService: ApplicationTypeService,
              private inspectorRegisterService: InspectorregisterService,
              private router: Router,
              private route: ActivatedRoute,

              ) {
               }

  ngOnInit(): void {
    this.assignViewerForm = this.formBuilder.group({
      viewerEmail: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    });
    this.countryCode = '91';

    this.viewerRegisterForm = this.formBuilder.group({
      name: ['', [Validators.required,]],
      companyName: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      contactNumber: ['', [Validators.required,Validators.maxLength(10)]],
      department: ['', Validators.required],
      designation: ['', Validators.required],
      address: ['', Validators.required],
      district: [''],
      country: ['', Validators.required],
      state: ['', Validators.required],
      pinCode: ['', Validators.required],
      userType: ['Viewer', Validators.required],
      terms: ['', Validators.required]
    });


  }

  populateData() {
    debugger
      if(this.registerData.role == "ROLE") {
       this.createGroup(this.registerData);
      // this.viewerRegisterForm.setControl('designer1Arr', this._formBuilder.array(this.mobilearr || []))
      }
      else {
        this.viewerRegisterForm.reset();
        this.register.username = this.assignViewerForm.value.viewerEmail;
        this.state = '';
      }
    this.registerData = [];

  }

// createGroup(item: any): FormGroup {
//   debugger
//   this.mobileArr = [];
//   this.mobileArr= item.contactNumber.split('-');
//   this.register.name=item.name;
//   this.register.companyName=item.companyName;
//   this.register.username=item.username;
//   this.register.department=item.department;
//   this.register.designation=item.designation;
//   this.register.address=item.address;
//   this.register.district=item.district;
//   this.register.country=item.country;
//   this.register.state=item.state;
//   this.register.pinCode=item.pinCode;
//   this.register.role=item.role;
//   this.register.registerId = item.registerId
  
//   this.selectCountry(item.country);
//   this.state = this.registerData.state;
//   return this.formBuilder.group({
//     name: new FormControl({readonly: true ,value: item.name}),
//     companyName: new FormControl({disabled: true ,value: item.companyName}),
//     email: new FormControl({disabled: false, value: item.username}),
//     contactNumber: new FormControl({disabled : true, value: this.mobileArr[1]}),
//     department: new FormControl({disabled: true ,value: item.department}),
//     designation: new FormControl({disabled: true,value: item.designation}),
//     address: new FormControl({disabled: false ,value: item.address}),
//     district: new FormControl({disabled: false, value:item.district}),
//     country: new FormControl({disabled: false,value: item.country}),
//     state: new FormControl({disabled: false ,value: item.state}),
//     pinCode: new FormControl({disabled: false, value:item.pinCode}),
//     userType: new FormControl({disabled: false ,value: item.role}),
//   });
// }

createGroup(item: any) {
  debugger
  this.mobileArr = [];
  this.mobileArr= item.contactNumber.split('-');
  console.log(this.mobileArr);
  this.setReadOnly = true;
  this.viewerRegisterForm = this.formBuilder.group({
    name: [item.name, [Validators.required,]],
    companyName: [item.companyName, Validators.required],
    email: [item.username, [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    contactNumber: [this.mobileArr[1], [Validators.required,Validators.maxLength(10)]],
    department: [item.department, Validators.required],
    designation: [item.designation, Validators.required],
    address: [item.address, Validators.required],
    district: [item.district],
    country: [item.country, Validators.required],
    state: [item.state, Validators.required],
    pinCode: [item.pinCode, Validators.required],
    userType: ['Viewer', Validators.required],
    terms: ['', Validators.required]
  });
  this.register.name=item.name;
  this.register.companyName=item.companyName;
  this.register.username=item.username;
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
  
  this.selectCountry(item.country);
  this.state = this.registerData.state;
}

  openModal(contentViewer: any) {
    this.modalService.open(contentViewer,{size: 'xl', backdrop: 'static' })
  }
 
  continue(contentViewer:any) {
    this.submitted1 = true;
    if(this.assignViewerForm.invalid) {
      return;
    }
    this.inspectorRegisterService.retrieveInspector(this.assignViewerForm.value.viewerEmail).subscribe(
      (data) => {
        debugger
        this.registerData = JSON.parse(data);
        
        if(this.registerData.role == 'ROLE') {
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
        let errorArr = JSON.parse(error.error);
        this.Error = true;
        this.errorMsg1 = errorArr.message;
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
  closeModalDialogContinue(){
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
    debugger
    let changedValue;
    if(e.target != undefined) {
      changedValue = e.target.value;
    }
    else{
      changedValue = e;
    }    
    this.stateList = [];
      // for(let arr of this.countryList) {
      //   if( arr.name == changedValue) {
      //     this.siteService.retrieveState(arr.code).subscribe(
      //       data => {
      //         this.stateList = JSON.parse(data)
      //       }
      //     )};
      // }
      if(changedValue == "IND") {
        this.siteService.retrieveStateV2(changedValue).subscribe(
          data => {
            this.stateList = JSON.parse(data)
          }
        );
      }
       
  }

  countryChange(country: any) {
    this.countryCode = country.dialCode;
  }


  showSubmit() {
    debugger
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

  onSubmit(flag: any) {
    debugger
  this.submitted = true;

  //Breaks if form is invalid
  if(this.viewerRegisterForm.invalid) {
    return;
  }
  this.loading = true;
  this.contactNumber = "";
  this.contactNumber = "+"+this.countryCode+"-"+this.viewerRegisterForm.value.contactNumber

  this.register.contactNumber = this.contactNumber;
  this.register.role = 'Viewer';
  this.register.permission = 'Yes';
  this.register.assignedBy = this.email;

  if(!flag) {
    this.inspectorRegisterService.registerViewer(this.register).subscribe(
      data=> {
        this.successMsgOTP=true;
        this.successMsg="Viewer has been assigned successfully."
        setTimeout(()=>{
          this.successMsgOTP=false;
          this.successMsg="";
        }, 3000);
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
    this.inspectorRegisterService.updateRegister(this.register).subscribe(
      data=> {
        this.successMsgOTP=true;
        this.successMsg="You have successfully updated viewer profile"
        setTimeout(()=>{
          this.successMsgOTP=false;
          this.successMsg="";
        }, 3000);
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
