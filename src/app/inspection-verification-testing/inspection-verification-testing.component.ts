import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import{Testing}from '../model/testing';
import { TestingService } from '../services/testing.service';

@Component({
  selector: 'app-inspection-verification-testing',
  templateUrl: './inspection-verification-testing.component.html',
  styleUrls: ['./inspection-verification-testing.component.css']
})
export class InspectionVerificationTestingComponent implements OnInit {
  formBuilder: any;

testing=new Testing;
  
testingForm = new FormGroup({
  testEngineerName:new FormControl(''),
  date:new FormControl(''),
  detailsTestInstrument:new FormControl(''),
  continuity:new FormControl(''),
  insulationResisance:new FormControl(''),
  rcd:new FormControl(''),
  earthElectrodeResistance:new FormControl(''),
  designation:new FormControl(''),
  companyName:new FormControl(''),


})
  email:String='';
  userName:String='';
  constructor(private testingService: TestingService,
              ) { }
  panelOpenState = false;
  ngOnInit(): void {
   this.testingForm= this.formBuilder.group({
    
         testEngineerName: ['', Validators.required],
         date: ['', Validators.required],
         detailsTestInstrument: ['', Validators.required],
         continuity: ['', Validators.required],
         insulationResisance: ['', Validators.required],
         rcd: ['', Validators.required],
         earthElectrodeResistance: ['', Validators.required],
         designation: ['', Validators.required],
         companyName: ['', Validators.required],

         distributionIncomingValueControlsArr: this.formBuilder.array([this.createdistributionIncomingValueForm()]),
         testDistributionfFormControlsArr: this.formBuilder.array([this.createtestDistributionForm()]),

        testCircuitFormArr: this.formBuilder.array([this.createtestCircuteForm()]),
        testConductorArr: this.formBuilder.array([this.createtestConductorForm()]),
        testContinuityArr: this.formBuilder.array([this.createtestContinuityForm()]),
        testVoltageArr: this.formBuilder.array([this.createtestVoltageForm()]),
        testLoopImpedanceArr: this.formBuilder.array([this.createtestLoopImpedanceForm()]),
        testFaultCurrentArr: this.formBuilder.array([this.createtestFaultCurrentForm()]),
        testDisconnectionTimeArr: this.formBuilder.array([this.createtestDisconnectionTimeForm()]),
        testrcdValueArr: this.formBuilder.array([this.createtestValueForm()]),
   });
  }
    private createtestDistributionForm():FormGroup{
      return new FormGroup({

            distributionBoardDetails:new FormControl(''),
            referance :new FormControl(''),
            location:new FormControl(''),
            correctSupplyPolarity:new FormControl(''),
            numOutputCircuitsUse:new FormControl(''),
            ratingsAmps:new FormControl(''),
            numOutputCircuitsSpare:new FormControl(''),
            installedEquipmentVulnarable:new FormControl(''),
})
}
private createdistributionIncomingValueForm(): FormGroup {
  return new FormGroup({
        incomingVoltage:new FormControl(''),
          incomingZs:new FormControl(''),
          incomingIpf:new FormControl(''),
           })
         }
private createtestValueForm(): FormGroup {
  return new FormGroup({
    rcdCurrent:new FormControl(''),
    operatingCurrent:new FormControl(''),
    operatingFiveCurrent:new FormControl(''),
    testButtonOperation:new FormControl(''),
    remarks:new FormControl(''),

  })
}
 private createtestCircuteForm(): FormGroup {
  return new FormGroup({
      
          circuitNo:new FormControl(''),
          description:new FormControl(''),
          standardNo:new FormControl(''),
          type:new FormControl(''),
          rating:new FormControl(''),
          breakingCapacity:new FormControl(''),
          })
          }
   private createtestConductorForm (): FormGroup {
         return new FormGroup({            
           installationReferanceMethod:new FormControl(''),
            live:new FormControl(''),
            Integer:new FormControl(''),
                 })
              }             

    private createtestContinuityForm(): FormGroup {
      return new FormGroup({ 
                  approximateLength:new FormControl(''),
                  rRContinuity:new FormControl(''),
                  rContinuity:new FormControl(''),
                  lLContinuity:new FormControl(''),
                  lEContinuity:new FormControl(''),
                  polarity:new FormControl(''),
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
    return (<FormArray> this.testingForm.get(' distributionIncomingValueControlsArr')).controls
  }
  get testDistributionfFormControls(): AbstractControl[] {
    return (<FormArray> this.testingForm.get('  testDistributionfFormControlsArr')).controls
  }

gettestCircuitFormControls(): AbstractControl[] {
    return (<FormArray> this.testingForm.get('  testCircuitFormArr')).controls
  }
  gettestConductorControls(): AbstractControl[] {
    return (<FormArray> this.testingForm.get('  testConductorArr')).controls
  }
  
  gettestContinuityControls(): AbstractControl[] {
    return (<FormArray> this.testingForm.get('  testContinuityArr')).controls
  }

  gettestVoltageControls(): AbstractControl[] {
    return (<FormArray> this.testingForm.get('  testVoltageArr')).controls
  } 
  
  gettestLoopImpedanceControls(): AbstractControl[] {
    return (<FormArray> this.testingForm.get('  testLoopImpedanceArr')).controls
  }
  gettestFaultCurrentControls(): AbstractControl[] {
    return (<FormArray> this.testingForm.get('  testFaultCurrentArr')).controls
  }
  gettestDisconnectionTimeControls(): AbstractControl[] {
    return (<FormArray> this.testingForm.get('  testDisconnectionTimeArr')).controls
  }
  gettestrcdValueControls(): AbstractControl[] {
    return (<FormArray> this.testingForm.get('  testrcdValueArr')).controls
  }
  nextTab7() {
         this.testing.siteId;
         this.testing.userName=this.email;
        // this.testing.distributionIncomingValue = this.testingForm.value.distributionIncomingValueControlsArr;
        // this.testing.testDistribution = this.testingForm.value.testDistributionfFormControlsArr;
         this.testing.testCircuit = this.testingForm.value.testCircuitFormArr;
         this.testing.testConductor = this.testingForm.value.testConductorArr;
         this.testing.testContinuity = this.testingForm.value.testContinuityArr;
         this.testing.testVoltage = this.testingForm.value.testVoltageArr;
         this.testing.testLoopImpedance = this.testingForm.value.testLoopImpedanceArr;
         this.testing.testFaultCurrent = this.testingForm.value.testFaultCurrentArr;
         this.testing.testDisconnectionTime = this.testingForm.value.testDisconnectionTimeArr;
         this.testing.testRcd = this.testingForm.value.testrcdValueArr;
         console.log(this.testing);
        //  this.testingService.addTest(this.testing).subscribe(
        //    data=>{
        //      console.log("worked");
        //    }
        //  )
     }
     
 
}


