import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmcClientDetails } from 'src/app/EMC_Model/emc-client-details';
import { EmcClientDetailsService } from 'src/app/EMC_Services/emc-client-details.service';
import { EmcFacilityDataComponent } from '../emc-facility-data/emc-facility-data.component';
import { EmcMatstepperComponent } from '../emc-matstepper/emc-matstepper.component';
import { EmcAssessmentInstallationComponent } from 'src/app/emc-assessment-installation/emc-assessment-installation.component';

@Component({
  selector: 'app-emc-client-details',
  templateUrl: './emc-client-details.component.html',
  styleUrls: ['./emc-client-details.component.css']
})
export class EmcClientDetailsComponent implements OnInit {

  @ViewChild('reference', { read: ViewContainerRef })
  viewContainerRef!: ViewContainerRef;
  destroy: boolean = false;

  EmcClientDetailsForm!: FormGroup;
  emcClientDetails = new EmcClientDetails();

  countryList: any = [];
  stateList: any = [];
  countryCode: any;
  submitted = false;
  validationError: boolean = false;
  validationErrorMsg: String = "";
  loading = false;
  successMsg: string = "";
  success: boolean = false;
  Error: boolean = false;
  errorMsg: string = "";
  onSubmitClientDetails = new EventEmitter();

  @Input()
  data: any = [];
  errorArr: any=[];
 
  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public emcClientDetailsService : EmcClientDetailsService,
  ) { }


  ngOnInit(): void {

    this.EmcClientDetailsForm = this.formBuilder.group({

      clientName: ['', Validators.required],
      contactNumber: ['', Validators.required],
      contactPerson: ['', Validators.required],
      landMark: ['', Validators.required],
      clientLocation: ['', Validators.required],
      clientAddress: ['', Validators.required],
      email: ['', Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
      country: ['', Validators.required],
      state: ['', Validators.required],
    });

    this.emcClientDetailsService.retrieveCountry().subscribe(
      data => {
        this.countryList = JSON.parse(data);
      }
    )
  }

  get a():any {
    return this.EmcClientDetailsForm.controls;
  }

  cancel() {
    this.dialog.closeAll();
  }

   // Only Integer Numbers
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

  changeCountry(e: any) {
    let changedValue = e.target.value;
    this.stateList = [];
      for(let arr of this.countryList) {
        if( arr.name == changedValue) {
          this.emcClientDetailsService.retrieveState(arr.code).subscribe(
            data => {
              this.stateList = JSON.parse(data)
            }
          )};
      }
  }

//country code
countryChange(country: any, a: any) {
  this.countryCode = country.dialCode;
  a.controls.countryCode.value= this.countryCode;
}

  onSubmit() {
    this.submitted = true;

    //Breaks if form is invalid
    if(this.EmcClientDetailsForm.invalid) {
      this.validationError = true;
      this.validationErrorMsg = "Please check all the fields";
      // setTimeout(() => {
      //   this.validationError = false;
      // }, 3000);
      return;
    }

    this.loading = true;

    
    this.emcClientDetailsService.addClientDetailsData(this.emcClientDetails).subscribe(
      data=> {
        this.success = true
        this.successMsg =data;
        setTimeout(() => {
          this.success = false;
        }, 3000);
        setTimeout(() => {
          this.dialog.closeAll();
          this.onSubmitClientDetails.emit(true);
        }, 2000);
      },
      error => {
        this.Error = true;
        this.errorArr = [];
        this.errorArr = JSON.parse(error.error);
        this.errorMsg =this.errorArr.message;
        this.onSubmitClientDetails.emit(false);
        setTimeout(() => {
          this.Error = false;
        }, 3000);
        this.EmcClientDetailsForm.reset();
        this.loading=false;
      }
      )
  }





  onNavigateToQuestionaire() {
    this.viewContainerRef.clear();
    this.destroy = true;
    // this.showHome = true;
    const dialogRef = this.dialog.open(EmcMatstepperComponent, {
      // width: '1000px',
      // maxHeight: '90vh',
      disableClose: true,
    });
  }


}
