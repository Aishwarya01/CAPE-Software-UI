import { Component, OnInit,Input} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewerRegisterComponent } from '../viewer-register/viewer-register.component';
import { Register } from '../model/register';
import { ApplicationTypeService } from '../services/application.service';
import { InspectorregisterService } from '../services/inspectorregister.service';
import { SiteService } from '../services/site.service';
import { Router } from '@angular/router';

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
  registerData: any = [];
  assignArr: any = [];
  state: String='';
  success: boolean = false;
  successMsg1: String = '';
  Error: boolean = false;
  errorMsg1: String = '';
  constructor(private dialog: MatDialog,
              private formBuilder: FormBuilder, private modalService: NgbModal,
              private siteService: SiteService,
              private applicationService: ApplicationTypeService,
              private inspectorRegisterService: InspectorregisterService,
              private router: Router,
              ) { }

  ngOnInit(): void {
    this.assignViewerForm = this.formBuilder.group({
      viewerEmail: ['', [Validators.required,]],
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
      userType: ['', Validators.required],
      terms: ['', Validators.required]
    });

  }

  populateData() {
      if(this.registerData.role == "ROLE") {
      this.createGroup(this.registerData);
      // this.viewerRegisterForm.setControl('designer1Arr', this._formBuilder.array(this.mobilearr || []))
  }
}

// createGroup(item: any): FormGroup {
//   return this.formBuilder.group({
//     name: new FormControl({disabled: false ,value: item.name}),
//     companyName: new FormControl({disabled: false ,value: item.companyName}),
//     email: new FormControl({disabled: false, value: item.email}),
//     contactNumber: new FormControl({disabled : false, value: item.contactNumber}),
//     department: new FormControl({disabled: false ,value: item.department}),
//     designation: new FormControl({disabled: true,value: item.designation}),
//     address: new FormControl({disabled: false ,value: item.address}),
//     district: new FormControl({disabled: false, value:item.district}),
//     country: new FormControl({disabled: false,value: item.country}),
//     state: new FormControl({disabled: false ,value: item.state}),
//     pinCode: new FormControl({disabled: false, value:item.pinCode}),
//     userType: new FormControl({disabled: false ,value: item.userType}),
//   });
// }

createGroup(item: any) {
  this.viewerRegisterForm = this.formBuilder.group({
    name: [item.name, [Validators.required,]],
    companyName: [item.companyName, Validators.required],
    email: [item.username, [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    contactNumber: [item.contactNumber, [Validators.required,Validators.maxLength(10)]],
    department: [item.department, Validators.required],
    designation: [item.designation, Validators.required],
    address: [item.address, Validators.required],
    district: [item.district],
    country: [item.country, Validators.required],
    state: [item.state, Validators.required],
    pinCode: [item.pinCode, Validators.required],
    userType: [item.userType, Validators.required],
  });
  this.selectCountry(item.country);
  this.state = this.registerData.state;

}
 
  continue(contentViewer:any) {
    this.inspectorRegisterService.retrieveInspector(this.assignViewerForm.value.viewerEmail).subscribe(
      (data) => {
        debugger
        this.registerData = JSON.parse(data);

        if(this.registerData.role == 'ROLE') {
          this.success = true;
          this.successMsg1 = "Already registered as Viewer. Please verify the details once!"
          this.populateData();
          this.modalService.open(contentViewer,{size: 'xl'})
        }
        else if(this.registerData.role != 'ROLE') {
          this.success = true;
          this.successMsg1 = "Given email is registered as Inspector"
        }
        // else{
        //   this.success = true;
        //   this.successMsg1 = "Kindly fill in the details to assign viewer!"
        //   this.modalService.open(contentViewer,{size: 'xl'})
        // }
      },
      (error) => {
        console.log(error);
      }
    )
  }
  closeModalDialog(contentViewer2:any){
   this.modalService.dismissAll(contentViewer2)
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
onSubmit() {
  this.submitted = true;
  console.log(this.viewerRegisterForm.value.applicationType)

  //Breaks if form is invalid
  if(this.viewerRegisterForm.invalid) {
    return;
  }
  this.loading = true;
  this.contactNumber = "";
  this.contactNumber = "+"+this.countryCode+"-"+this.viewerRegisterForm.value.contactNumber

  this.register.contactNumber = this.contactNumber;
 
//   this.inspectorRegisterService.registerInspector(this.register).subscribe(
//     data=> {
//       this.successMsgOTP=true;
//       this.successMsg="Your application is successfully submitted. You will get mail once when it is approved. Check your e mail. It takes up to "
//       +environment.hoursOfGettingApproved+ "hours for approval."
//       setTimeout(()=>{
//         this.successMsgOTP=false;
//       }, 3000);
//       setTimeout(()=>{
//         this.router.navigate(['/createPassword', {email: this.register.username}])
//       }, 5000);
//     },
//     error => {
//       this.loading= false;
//       this.errorMsgflag=true;
//       this.errorMsg=error.error.message;
//       setTimeout(()=>{
//         this.errorMsgflag=false;
//         this.errorMsg=" ";
//       }, 3000);
//     }
//   )  

}
}
