import { Component,  OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import { Testingdetails } from '../model/testing';
import { TestingService } from '../services/testing.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-inspection-verification-testing',
  templateUrl: './inspection-verification-testing.component.html',
  styleUrls: ['./inspection-verification-testing.component.css']
})
export class InspectionVerificationTestingComponent implements OnInit {



  testingForm!: FormGroup;

  
  email: String = '';
  userName: String = '';
 testingdetails: any;

 // convenience getter for easy access to form fields
  //   get f() {
  //     return this.testingForm.controls
  // }

 //testingdetails     =   new Testingdetails ;
  distributionIncomingValueArr!: FormArray;
  testCircuitFormArr!: FormArray;
  testDistributionArr!: FormArray;
  testConductorArr!: FormArray;
  testContinuityArr!: FormArray;
  testVoltageArr!: FormArray;
  testLoopImpedanceArr!: FormArray;
  testFaultCurrentArr!: FormArray;
  testDisconnectionTimeArr!: FormArray;
  testrcdValueArr!: FormArray;
  constructor(
    private formBuilder: FormBuilder,private testingService: TestingService,
    
    private router: ActivatedRoute
  ) {  }
  panelOpenState = false;
  ngOnInit(): void {

    this.testingForm = this.formBuilder.group({

      testEngineerName: ['', Validators.required],
       date: ['', Validators.required],
       companyName: ['', Validators.required],
       designation: ['', Validators.required],
       detailsTestInstrument: ['', Validators.required],
       continuity: ['', Validators.required],
       insulationResisance: ['', Validators.required],
       Impedance: ['', Validators.required],
       rcd: ['', Validators.required],
       earthElectrodeResistance: ['', Validators.required],



       distributionIncomingValueArr: this.formBuilder.array([this.createdistributionIncomingValueForm()]),
       testDistributionArr: this.formBuilder.array([this.createtestDistributionForm()]),


       testCircuitFormArr: this.formBuilder.array([this.createtestCircuteForm()]),
       testConductorArr: this.formBuilder.array([this.createtestConductorForm()]),
       testContinuityArr: this.formBuilder.array([this.createtestContinuityForm()]),
       testVoltageArr: this.formBuilder.array([this.createtestVoltageForm()]),
      testLoopImpedanceArr: this.formBuilder.array([this.createtestLoopImpedanceForm()]),
      testFaultCurrentArr: this.formBuilder.array([this.createtestFaultCurrentForm()]),
      testDisconnectionTimeArr: this.formBuilder.array([this.createtestDisconnectionTimeForm()]),
      testrcdValueArr: this.formBuilder.array([this.createtestrcdForm()])
    });
  }
  private createtestDistributionForm(): FormGroup {
    return new FormGroup({

      distributionBoardDetails: new FormControl(''),
      referance: new FormControl(''),
      location: new FormControl(''),
      correctSupplyPolarity: new FormControl(''),
      numOutputCircuitsUse: new FormControl(''),
      ratingsAmps: new FormControl(''),
      numOutputCircuitsSpare: new FormControl(''),
      installedEquipmentVulnarable: new FormControl(''),
    })
  }

  private createdistributionIncomingValueForm(): FormGroup {
    return new FormGroup({
      incomingVoltage: new FormControl(''),
      incomingZs: new FormControl(''),
      incomingIpf: new FormControl(''),
    })
  }
  private createtestrcdForm(): FormGroup {
    return new FormGroup({
      rcdCurrent: new FormControl(''),
      operatingCurrent: new FormControl(''),
      operatingFiveCurrent: new FormControl(''),
      testButtonOperation: new FormControl(''),
      remarks: new FormControl(''),

    })
  }
  private createtestCircuteForm(): FormGroup {
    return new FormGroup({

      circuitNo: new FormControl(''),
      description: new FormControl(''),
      standardNo: new FormControl(''),
      type: new FormControl(''),
      rating: new FormControl(''),
      breakingCapacity: new FormControl(''),
    })
  }
  private createtestConductorForm(): FormGroup {
    return new FormGroup({
      installationReferanceMethod: new FormControl(''),
      live: new FormControl(''),
      Integer: new FormControl(''),
    })
  }

  private createtestContinuityForm(): FormGroup {
    return new FormGroup({
      approximateLength: new FormControl(''),
      rRContinuity: new FormControl(''),
      rContinuity: new FormControl(''),
      lLContinuity: new FormControl(''),
      lEContinuity: new FormControl(''),
      polarity: new FormControl(''),
    })
  }
  private createtestVoltageForm(): FormGroup {
    return new FormGroup({

      ryVoltage: new FormControl(''),
      rbVoltage: new FormControl(''),
      ybVoltage: new FormControl(''),
      rnVoltage: new FormControl(''),
      ynVoltage: new FormControl(''),
      bnVoltage: new FormControl(''),
      rpeVoltage: new FormControl(''),
      ypeVoltage: new FormControl(''),
      bpeVoltage: new FormControl(''),
    })
  }

  private createtestLoopImpedanceForm(): FormGroup {
    return new FormGroup({
      ryLoopImpedance: new FormControl(''),
      rbLoopImpedance: new FormControl(''),
      ybLoopImpedance: new FormControl(''),
      rnLoopImpedance: new FormControl(''),
      ynLoopImpedance: new FormControl(''),
      bnLoopImpedance: new FormControl(''),
      rpeLoopImpedance: new FormControl(''),
      ypeLoopImpedance: new FormControl(''),
      bpeLoopImpedance: new FormControl(''),

    })

  }
  private createtestFaultCurrentForm(): FormGroup {
    return new FormGroup({

      ryFaultCurrent: new FormControl(''),
      rbFaultCurrent: new FormControl(''),
      ybFaultCurrent: new FormControl(''),
      rnFaultCurrent: new FormControl(''),
      ynFaultCurrent: new FormControl(''),
      bnFaultCurrent: new FormControl(''),
      rpeFaultCurrent: new FormControl(''),
      ypeFaultCurrent: new FormControl(''),
      bpeFaultCurrent: new FormControl(''),

    })
  }
  private createtestDisconnectionTimeForm(): FormGroup {
    return new FormGroup({
      ryDisconnect: new FormControl(''),
      rbDisconnect: new FormControl(''),
      ybDisconnect: new FormControl(''),
      rnDisconnect: new FormControl(''),
      ynDisconnect: new FormControl(''),
      bnDisconnect: new FormControl(''),
      rpeDisconnect: new FormControl(''),
      ypeDisconnect: new FormControl(''),
      bpeDisconnect: new FormControl(''),
    })
  }

  getdistributionIncomingValueControls(): AbstractControl[] {

   return (<FormArray>this.testingForm.get('distributionIncomingValueArr')).controls
  }

  gettestDistributionFormControls(): AbstractControl[] {
   return (<FormArray>this.testingForm.get('testDistributionArr')).controls
  }
  gettestCircuitFormControls(): AbstractControl[] {
    return (<FormArray>this.testingForm.get('testCircuitFormArr')).controls
  }
  gettestConductorControls(): AbstractControl[] {
   return (<FormArray>this.testingForm.get('testConductorArr')).controls
  }

  gettestContinuityControls(): AbstractControl[] {
    return (<FormArray>this.testingForm.get('testContinuityArr')).controls
  }

  gettestVoltageControls(): AbstractControl[] {
    return (<FormArray>this.testingForm.get('testVoltageArr')).controls
  }

  gettestLoopImpedanceControls(): AbstractControl[] {
   return (<FormArray>this.testingForm.get('testLoopImpedanceArr')).controls

  }
  gettestFaultCurrentControls(): AbstractControl[] {
   return (<FormArray>this.testingForm.get('testFaultCurrentArr')).controls
  }
  gettestDisconnectionTimeControls(): AbstractControl[] {
    return (<FormArray>this.testingForm.get('testDisconnectionTimeArr')).controls
  }
  gettestrcdValueControls(): AbstractControl[] {
    return (<FormArray>this.testingForm.get('testrcdValueArr')).controls
  }


  nextTab7() {
    // this.testing.siteId;
    // this.testing.userName = this.email;
    // this.testingdetails.distributionIncomingValue = this.testingForm.value.distributionIncomingValueControlsArr;
    // this.testingdetails.testDistribution = this.testingForm.value.testDistributionfFormControlsArr;
    // this.testingdetails.testCircuit = this.testingForm.value.testCircuitFormArr;

    // this.testingdetails.testConductor = this.testingForm.value.testConductorArr;
    // this.testingdetails.testContinuity = this.testingForm.value.testContinuityArr;
    // this.testingdetails.testVoltage = this.testingForm.value.testVoltageArr;
    // this.testingdetails.testLoopImpedance = this.testingForm.value.testLoopImpedanceArr;
    // this.testingdetails.testFaultCurrent = this.testingForm.value.testFaultCurrentArr;
    // this.testingdetails.testDisconnectionTime = this.testingForm.value.testDisconnectionTimeArr;
    // this.testingdetails.testRcd = this.testingForm.value.testrcdValueArr;
    console.log(this.testingForm.value);
  //   this.testingService.addTest(this.testingdetails).subscribe(
  //     () => {
  //       console.log("worked");
  //     }
  //   )
  // }

}
}





