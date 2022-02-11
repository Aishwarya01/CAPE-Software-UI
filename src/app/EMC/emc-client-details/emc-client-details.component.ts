import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmcClientDetails } from 'src/app/EMC_Model/emc-client-details';
import { EmcClientDetailsService } from 'src/app/EMC_Services/emc-client-details.service';
import { EmcFacilityDataComponent } from '../emc-facility-data/emc-facility-data.component';
import { EmcMatstepperComponent } from '../emc-matstepper/emc-matstepper.component';
import { EmcAssessmentInstallationComponent } from 'src/app/emc-assessment-installation/emc-assessment-installation.component';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  popup: boolean = false;
  step1List: any;
  flag: boolean = false;
  modalReference: any;
  validationErrorTab: boolean = false;
  validationErrorMsgTab: string = "";
  data: any = [];
  errorArr: any = [];

  constructor(
    public dialog: MatDialog,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public emcClientDetailsService: EmcClientDetailsService,
  ) { }


  ngOnInit(): void {

    this.EmcClientDetailsForm = this.formBuilder.group({

      clientName: ['', Validators.required],
      contactNumber: ['', Validators.required],
      contactPerson: ['', Validators.required],
      landMark: ['', Validators.required],
      clientLocation: ['', Validators.required],
      clientAddress: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      country: ['', Validators.required],
      state: ['', Validators.required],
    });
    this.emcClientDetailsService.retrieveCountry().subscribe(
      data => {

        this.countryList = JSON.parse(data);
      }
    )
  }

  retriveClientDetailsData(userName: any, emcId: any, data: any) {
    this.flag = true;
    this.step1List = JSON.parse(data);
    this.emcClientDetails.userName = userName;
    this.emcClientDetails.emcId = emcId;
    this.emcClientDetails.clientName = this.step1List[0].clientName;
    this.emcClientDetails.contactNumber = this.step1List[0].contactNumber;
    this.emcClientDetails.contactPerson = this.step1List[0].contactPerson;
    this.emcClientDetails.landMark = this.step1List[0].landMark;
    this.emcClientDetails.clientLocation = this.step1List[0].clientLocation;
    this.emcClientDetails.clientAddress = this.step1List[0].clientAddress;
    this.emcClientDetails.email = this.step1List[0].email;
    this.emcClientDetails.country = this.step1List[0].country;
    this.emcClientDetails.state = this.step1List[0].state;

    this.emcClientDetails.createdDate = this.step1List[0].createdDate;
    this.emcClientDetails.createdBy = this.step1List[0].createdBy;
    this.emcClientDetails.updatedDate = this.step1List[0].updatedDate;
    this.emcClientDetails.updatedBy = this.step1List[0].updatedBy;
  
  }



  retrieveDetailsfromSavedReports(userName: any, emcId: any, data: any) {
    this.flag = true;
    this.step1List = data.clientDetails;
    this.emcClientDetails.userName = this.step1List.userName;
    this.emcClientDetails.emcId = emcId;
    this.emcClientDetails.clientName = this.step1List.clientName;
    this.emcClientDetails.contactNumber = this.step1List.contactNumber;
    this.emcClientDetails.contactPerson = this.step1List.contactPerson;
    this.emcClientDetails.landMark = this.step1List.landMark;
    this.emcClientDetails.clientLocation = this.step1List.clientLocation;
    this.emcClientDetails.clientAddress = this.step1List.clientAddress;
    this.emcClientDetails.email = this.step1List.email;
    this.emcClientDetails.country = this.step1List.country;
    this.changeCountry (this.emcClientDetails.country);
    this.emcClientDetails.state = this.step1List.state;
    this.emcClientDetails.createdDate = this.step1List.createdDate;
    this.emcClientDetails.createdBy = this.step1List.createdBy;
    this.emcClientDetails.updatedDate = this.step1List.updatedDate;
    this.emcClientDetails.updatedBy = this.step1List.updatedBy;
  }


  get a(): any {
    return this.EmcClientDetailsForm.controls;
  }

  cancel() {
    this.dialog.closeAll();
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

  countryChange(country: any) {
    this.countryCode = country.dialCode;
  }

  // //country code
  // countryChange(country: any, a: any) {
  //   this.countryCode = country.dialCode;
  //   a.controls.countryCode.value = this.countryCode;
  // }


  closeModalDialog() {
    this.finalSpinner = true;
    this.popup = false;
    if (this.errorMsg != "") {
      this.Error = false;
      // this.service.isCompleted3= false;
      // this.service.isLinear=true;
      this.modalService.dismissAll((this.errorMsg = ""));
    }
    else {
      this.success = false;
      // this.service.isCompleted3= true;
      // this.service.isLinear=false;
      this.modalService.dismissAll((this.successMsg = ""));
      // this.disable = false;

    }
  }

  onKeyForm(event: KeyboardEvent) {
    if (!this.EmcClientDetailsForm.invalid) {
      if (this.EmcClientDetailsForm.dirty) {
        this.validationError = false;
        //  this.service.lvClick=1;
        //  this.service.logoutClick=1;
        //  this.service.windowTabClick=1;
      }
      else {
        this.validationError = false;
        //  this.service.lvClick=0;
        //  this.service.logoutClick=0;
        //  this.service.windowTabClick=0;
      }
    }
    else {
      //  this.service.lvClick=1;
      //  this.service.logoutClick=1;
      //  this.service.windowTabClick=1;
    }
  }


  onChangeForm(event: any) {
    if (!this.EmcClientDetailsForm.invalid) {
      if (this.EmcClientDetailsForm.dirty) {
        this.validationError = false;
        // this.service.lvClick=1;
        // this.service.logoutClick=1;
        //  this.service.windowTabClick=1;
      }
      else {
        this.validationError = false;
        // this.service.lvClick=0;
        // this.service.logoutClick=0;
        // this.service.windowTabClick=0;
      }
    }
    else {
      // this.service.lvClick=1;
      // this.service.logoutClick=1;
      // this.service.windowTabClick=1;
    }
  }

  gotoNextModal(content: any) {
    if (this.EmcClientDetailsForm.invalid) {
      this.validationError = true;
      this.validationErrorMsg = "Please check all the fields";
      //     setTimeout(()=>{
      //       this.validationError=false;
      //  }, 3000);
      return;
    }

    if (this.EmcClientDetailsForm.touched || this.EmcClientDetailsForm.untouched) {
      this.modalReference = this.modalService.open(content, {
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
    this.emcClientDetails.userName = this.router.snapshot.paramMap.get('email') || '{}';

    if (flag) {
      if (this.EmcClientDetailsForm.dirty) {
        this.emcClientDetailsService
          .upDateClientDetailsData(this.emcClientDetails)
          .subscribe(
            (data: any) => {
              this.finalSpinner = false;
              this.popup = true;
              this.success = true;
              this.successMsg = data;

            },
            (error: any) => {
              this.finalSpinner = false;
              this.popup = true;
              this.Error = true;
              this.errorArr = [];
              this.errorArr = JSON.parse(error.error);
              this.errorMsg = this.errorArr.message;

            });
      }
    }

    else {
      this.emcClientDetailsService.addClientDetailsData(this.emcClientDetails).subscribe(

        data => {
          let emcClientDetailsDataItr = JSON.parse(data);
          this.emcClientDetails.emcId = emcClientDetailsDataItr.emcId;

          this.finalSpinner = false;
          this.popup = true;
          this.success = true;
          this.successMsg = "Client Details Successfully Saved";
          //this.disable = true;
          this.retriveClientDetails();
          this.proceedNext.emit(true);
        },
        error => {
          this.finalSpinner = false;
          this.popup = true;
          this.Error = true;
          this.errorArr = [];
          this.errorArr = JSON.parse(error.error);
          this.errorMsg = this.errorArr.message;
          this.proceedNext.emit(false);
        }
      )
    }
    (this.emcClientDetails);
  }

  retriveClientDetails() {
    this.emcClientDetailsService.retrieveClientDetailsData(this.emcClientDetails.userName, this.emcClientDetails.emcId).subscribe(
      data => {
        this.retriveClientDetailsData(this.emcClientDetails.userName, this.emcClientDetails.emcId, data);
      },
      error => {
      }
    );
  }

}
