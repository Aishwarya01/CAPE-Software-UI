import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, FormArray } from '@angular/forms';
import { ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmcClientDetails } from 'src/app/EMC_Model/emc-client-details';
import { EmcClientDetailsService } from 'src/app/EMC_Services/emc-client-details.service';
import { EmcFacilityDataComponent } from '../emc-facility-data/emc-facility-data.component';
import { EmcMatstepperComponent } from '../emc-matstepper/emc-matstepper.component';
import { EmcAssessmentInstallationComponent } from 'src/app/emc-assessment-installation/emc-assessment-installation.component';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { not } from '@angular/compiler/src/output/output_ast';
import { GlobalsService } from 'src/app/globals.service';

@Component({
  selector: 'app-emc-client-details',
  templateUrl: './emc-client-details.component.html',
  styleUrls: ['./emc-client-details.component.css']
})
export class EmcClientDetailsComponent implements OnInit {

  @ViewChild('reference', { read: ViewContainerRef })
  viewContainerRef!: ViewContainerRef;

  destroy: boolean = false;
  showHome: boolean = false;

  EmcClientDetailsForm!: FormGroup;
  emcClientDetails = new EmcClientDetails();

  @Output() proceedNext = new EventEmitter<any>();
  countryList: any = [];
  stateList: any = [];
  countryCode: any;
  submitted = false;
  validationError: boolean = false;
  validationErrorMsg: String = "";
  sucess: boolean = false;
  sucessMsg: String = "";
  loading = false;
  successMsg: string = "";
  success: boolean = false;
  Error: boolean = false;
  errorMsg: string = "";
  finalSpinner: boolean = true;
  step1List: any;
  flag: boolean = false;
  isEditableEmc!:boolean
  modalReference: any;
  validationErrorTab: boolean = false;
  validationErrorMsgTab: string = "";
  tabError: boolean=false;
  tabErrorMsg: string="";
  data: any = [];
  errorArr: any = [];
  setReadOnly: boolean = false;
  // For Spinner
  spinner: boolean=false;
  spinnerValue: String = '';
  mode: any = 'indeterminate';
  nextButton: boolean = true;
  popup: boolean = false;

  constructor(
    public dialog: MatDialog,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public service: GlobalsService,
    public emcClientDetailsService: EmcClientDetailsService,
  ) { }


  ngOnInit(): void {

     this.countryCode = '91';

    this.EmcClientDetailsForm = this.formBuilder.group({
      clientArr: this.formBuilder.array([
        this.createProfile(),
      ])
    });
    this.emcClientDetailsService.retrieveCountry().subscribe(
      data => {

        this.countryList = JSON.parse(data);
      }
    )
  }

  createProfile(): FormGroup {
    return new FormGroup({
      clientName: new FormControl('', Validators.required),
      contactNumber: new FormControl('', [Validators.maxLength(10), Validators.minLength(10), Validators.required]),
      contactPerson: new FormControl('', Validators.required),
      landMark: new FormControl(''),
      clientLocation: new FormControl(''),
      clientAddress: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      country: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      userName: new FormControl('')
    })
  }

  retriveClientDetailsData() {
    this.flag = true;
    // this.step1List = JSON.parse(data);

    this.populateForm();

    // this.emcClientDetails.userName = userName;
    // this.emcClientDetails.emcId = emcId;
    // this.emcClientDetails.clientName = this.step1List[0].clientName;
    // this.emcClientDetails.contactNumber = this.step1List[0].contactNumber;
    // this.emcClientDetails.contactPerson = this.step1List[0].contactPerson;
    // this.emcClientDetails.landMark = this.step1List[0].landMark;
    // this.emcClientDetails.clientLocation = this.step1List[0].clientLocation;
    // this.emcClientDetails.clientAddress = this.step1List[0].clientAddress;
    // this.emcClientDetails.email = this.step1List[0].email;
    // this.emcClientDetails.country = this.step1List[0].country;
    // this.emcClientDetails.state = this.step1List[0].state;

    // this.emcClientDetails.createdDate = this.step1List[0].createdDate;
    // this.emcClientDetails.createdBy = this.step1List[0].createdBy;
    // this.emcClientDetails.updatedDate = this.step1List[0].updatedDate;
    // this.emcClientDetails.updatedBy = this.step1List[0].updatedBy;

  }

  populateForm() {
    this.EmcClientDetailsForm = this.formBuilder.group({
      clientArr: this.formBuilder.array([
        this.createclient(),
      ])
    });
  }

  createclient(): FormGroup {
    return this.formBuilder.group({

      emcId: new FormControl(this.emcClientDetails.emcId, Validators.required),
      clientName: new FormControl(this.emcClientDetails.clientName, Validators.required),
      contactNumber: new FormControl(this.emcClientDetails.contactNumber, Validators.required),
      contactPerson: new FormControl(this.emcClientDetails.contactPerson, Validators.required),
      landMark: new FormControl(this.emcClientDetails.landMark),
      clientLocation: new FormControl(this.emcClientDetails.clientLocation),
      clientAddress: new FormControl(this.emcClientDetails.clientAddress, Validators.required),
      email: new FormControl(this.emcClientDetails.email, Validators.required),
      country: new FormControl(this.emcClientDetails.country, Validators.required),
      state: new FormControl(this.emcClientDetails.state, Validators.required),
      userName: new FormControl(this.emcClientDetails.userName, Validators.required),
      createdDate: new FormControl(this.emcClientDetails.createdDate),
      createdBy: new FormControl(this.emcClientDetails.createdBy),
      status: new FormControl(this.emcClientDetails.status)   
    })
  }



  retrieveDetailsfromSavedReports(userName: any, emcId: any, data: any) {
    this.flag = true;
    this.step1List = data.clientDetails;
    this.emcClientDetails.userName = this.step1List.userName;
    this.emcClientDetails.emcId = emcId;
    this.emcClientDetails.clientName = this.step1List.clientName;
    this.emcClientDetails.contactNumber = this.step1List.contactNumber;
    this.setReadOnly = true;
    this.emcClientDetails.contactPerson = this.step1List.contactPerson;
    this.emcClientDetails.landMark = this.step1List.landMark;
    this.emcClientDetails.clientLocation = this.step1List.clientLocation;
    this.emcClientDetails.clientAddress = this.step1List.clientAddress;
    this.emcClientDetails.email = this.step1List.email;
    this.emcClientDetails.country = this.step1List.country;
    this.changeCountry(this.emcClientDetails.country);
    this.emcClientDetails.state = this.step1List.state;
    this.emcClientDetails.createdDate = this.step1List.createdDate;
    this.emcClientDetails.createdBy = this.step1List.createdBy;
    this.emcClientDetails.updatedDate = this.step1List.updatedDate;
    this.emcClientDetails.updatedBy = this.step1List.updatedBy;
    this.emcClientDetails.status = this.step1List.status;

    this.retriveClientDetailsData();
  }


  get a(): any {
    return this.EmcClientDetailsForm.controls;
  }

  cancel() {
    this.dialog.closeAll();
  }

  getClientControls(): AbstractControl[] {
    return (<FormArray>this.EmcClientDetailsForm.get('clientArr'))?.controls;
  }

  // Only Integer Numbers

  keyPressNumbers(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  changeCountry(e: any) {
    let changedValue = '';
    if (e.target != undefined) {
      changedValue = e.target.value
    }
    else {
      changedValue = e;
    }
    this.stateList = [];
    for (let arr of this.countryList) {
      if (arr.name == changedValue) {
        this.emcClientDetailsService.retrieveState(arr.code).subscribe(
          data => {
            this.stateList = JSON.parse(data)
          }
        )
      };
    }
  }

  //  country code
  countryChange(country: any) {
    this.countryCode = country.dialCode;
  }

  // countryChange1(country: any) {
  //   this.countryCode2 = country.dialCode;
  // }

  // //country code
  // countryChange(country: any, a: any) {
  //   this.countryCode = country.dialCode;
  //   a.controls.countryCode.value = this.countryCode;
  // }


  closeModalDialog() {
    if (this.errorMsg != "") {
      this.Error = false;
      this.service.isCompleted= false;
      this.service.isLinear=true;
      this.modalService.dismissAll((this.errorMsg = ""));
    }
    else {
      this.success = false;
      this.service.isCompleted= true;
      this.service.isLinear=false;
      this.modalService.dismissAll((this.successMsg = ""));
      // this.disable = false;

    }
  }

  onChangeForm(event:any){
    if(!this.EmcClientDetailsForm.invalid){
      if(this.EmcClientDetailsForm.dirty){
        this.validationError=false;
        this.service.lvClick=1;
        this.service.logoutClick=1;
         this.service.windowTabClick=1;
      }
      else{
        this.validationError=false;
        this.service.lvClick=0;
        this.service.logoutClick=0;
        this.service.windowTabClick=0;
      }
     }
     else {
      this.service.lvClick=1;
      this.service.logoutClick=1;
      this.service.windowTabClick=1;
     }
  }
  onKeyForm(event: KeyboardEvent) { 
   if(!this.EmcClientDetailsForm.invalid){ 
    if(this.EmcClientDetailsForm.dirty){
      this.validationError=false;
      this.service.lvClick=1;
      this.service.logoutClick=1;
      this.service.windowTabClick=1;
    }
    else{
      this.validationError=false;
      this.service.lvClick=0;
      this.service.logoutClick=0;
      this.service.windowTabClick=0;
    }
   }
   else {
    this.service.lvClick=1;
    this.service.logoutClick=1;
    this.service.windowTabClick=1;
   }
  } 

  gotoNextTab() {
    if (this.EmcClientDetailsForm.dirty && this.EmcClientDetailsForm.invalid) {
      this.service.isCompleted= false;
      this.service.isLinear=true;
      this.service.editable=false;
      //this.validationError=false;
      this.validationErrorTab = true;
      this.validationErrorMsgTab = 'Please check all the fields in client details information';
      setTimeout(() => {
        this.validationErrorTab = false;
      }, 3000);
      return;
    }
    else if(this.EmcClientDetailsForm.dirty && this.EmcClientDetailsForm.touched){
      this.service.isCompleted= false;
      this.service.isLinear=true;
      this.service.editable=false;
      this.tabError = true;
      this.tabErrorMsg = 'Kindly click on next button to update the changes!';
      setTimeout(() => {
        this.tabError = false;
      }, 3000);
      return;
   }
    else{
      this.service.isCompleted= true;
      this.service.isLinear=false;
      this.service.editable=true;
    }
  }
 
  gotoNextModal(content: any, content2: any) {
    if (this.EmcClientDetailsForm.invalid) {
      this.validationError = true;
      this.validationErrorMsg = "Please check all the fields in client details information";
      //     setTimeout(()=>{
      //       this.validationError=false;
      //  }, 3000);
      return;
    }

    // || this.EmcClientDetailsForm.untouched
    if (this.EmcClientDetailsForm.touched || this.EmcClientDetailsForm.untouched) {
      this.modalReference = this.modalService.open(content2, {
        centered: true,
        size: 'md',
        backdrop: 'static'
      })
    }
    if (this.EmcClientDetailsForm.dirty && this.EmcClientDetailsForm.touched) { //update
      this.modalService.open(content, { centered: true, backdrop: 'static' });
      this.modalReference.close();
    }
  }

  saveClientDetails(flag: any) {
    this.submitted = true;
    if (this.EmcClientDetailsForm.invalid) {
      return;
    }
    this.spinner = true;
    this.popup=false;

    if (!flag) {

      if ((this.EmcClientDetailsForm.value.clientArr[0].contactNumber).includes("+")) {
        let arr = [];
        arr = this.EmcClientDetailsForm.value.clientArr[0].contactNumber.split('-');
        this.EmcClientDetailsForm.value.clientArr[0].contactNumber = arr[1];
        this.EmcClientDetailsForm.value.clientArr[0].contactNumber = "+" + this.countryCode + "-" + this.EmcClientDetailsForm.value.clientArr[0].contactNumber;
      }
      else {
        this.EmcClientDetailsForm.value.clientArr[0].contactNumber = "+" + this.countryCode + "-" + this.EmcClientDetailsForm.value.clientArr[0].contactNumber;
      }

    } else {

      if ((this.EmcClientDetailsForm.value.clientArr[0].contactNumber).includes("+")) {

        let arr3 = [];
        arr3 = this.EmcClientDetailsForm.value.clientArr[0].contactNumber.split('-');
        this.EmcClientDetailsForm.value.clientArr[0].contactNumber = arr3[1];
        this.EmcClientDetailsForm.value.clientArr[0].contactNumber = "+" + this.countryCode + "-" + this.EmcClientDetailsForm.value.clientArr[0].contactNumber;
      }
      else {
        this.EmcClientDetailsForm.value.clientArr[0].contactNumber = "+" + this.countryCode + "-" + this.EmcClientDetailsForm.value.clientArr[0].contactNumber;
      }
      // this.emcClientDetails.contactNumber =  this.EmcClientDetailsForm.value.clientArr[0].contactNumber;
    }

    this.emcClientDetails = this.EmcClientDetailsForm.value.clientArr[0];
    this.emcClientDetails.userName = this.router.snapshot.paramMap.get('email') || '{}';

    if (flag) {
      if (this.EmcClientDetailsForm.dirty) {
        this.emcClientDetailsService
          .upDateClientDetailsData(this.emcClientDetails).subscribe(
            (data: any) => {
              setTimeout(() =>{
                this.popup=true;
                this.spinner=false;
              }, 3000);
              this.success = true;
              this.successMsg = data;
              this.service.isCompleted= true;
              this.service.isLinear=false;
              this.retriveClientDetails();
              this.proceedNext.emit(true);
            },
            (error: any) => {
              this.spinner=false;
              this.popup = true;
              this.Error = true;
              this.errorArr = [];
              this.errorArr = JSON.parse(error.error);
              this.errorMsg = this.errorArr.message;
              this.proceedNext.emit(false);
            });
      }
    }

    else {
      this.emcClientDetailsService.addClientDetailsData(this.emcClientDetails).subscribe(
        data => {
          setTimeout(() =>{
            this.popup=true;
            this.spinner=false;
          }, 3000)
          let emcClientDetailsDataItr = JSON.parse(data);
          this.emcClientDetails.emcId = emcClientDetailsDataItr.emcId;
          this.emcClientDetails.createdDate = emcClientDetailsDataItr.createdDate;
          this.emcClientDetails.createdBy = emcClientDetailsDataItr.createdBy;
          this.emcClientDetails.status = emcClientDetailsDataItr.status;
          this.success = true;
          this.successMsg = "Client Details Successfully Saved";
          //this.disable = true;
          this.service.isCompleted= true;
          this.service.isLinear=false;
          this.retriveClientDetails();
          this.proceedNext.emit(true);
        },
        error => {
          this.spinner=false;
          this.popup = true;
          this.Error = true;
          this.errorArr = [];
          this.errorArr = JSON.parse(error.error);
          this.errorMsg = this.errorArr.message;
          this.service.isCompleted= false;
          this.service.isLinear=true;
          this.proceedNext.emit(false);
        }
      )
    }
    (this.emcClientDetails);
  }

  retriveClientDetails() {
    this.emcClientDetailsService.retrieveClientDetailsData(this.emcClientDetails.userName, this.emcClientDetails.emcId).subscribe(
      data => {
        this.retriveClientDetailsData();
      },
      error => {
      }
    );
  }

}
