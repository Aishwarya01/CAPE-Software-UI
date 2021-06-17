import { Component, NgModule, OnInit } from '@angular/core';
//import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import{ Testingdetails}from '../model/testing';
import { TestingService } from '../services/testing.service';


@Component({
  selector: 'app-inspection-verification-testing',
  templateUrl: './inspection-verification-testing.component.html',
  styleUrls: ['./inspection-verification-testing.component.css']
})
export class InspectionVerificationTestingComponent implements OnInit {
 

  
data:any;
siteListInspec: any = [];



  
testingForm = new FormGroup({
  testEngineerName:new FormControl(''),
  date:new FormControl(''),
  detailsTestInstrument:new FormControl(''),
  continuity:new FormControl(''),
  insulationResisance:new FormControl(''),
  Impedance:new FormControl(''),
  rcd:new FormControl(''),
  earthElectrodeResistance:new FormControl(''),
  designation:new FormControl(''),
  companyName:new FormControl(''),


})
  email:String='';
  userName:String='';
 // testingdetails: any;
  
  testingdetails     =   new Testingdetails;

  constructor(private testingService: TestingService,
    private formBuilder: FormBuilder
              ) { }
  panelOpenState = false;
  ngOnInit(): void {
   
    this.testingForm= this.formBuilder.group({
    
          testEngineerName: ['', Validators.required],
          date: ['', Validators.required],
          detailsTestInstrument: ['', Validators.required],
          continuity: ['', Validators.required],
          insulationResisance: ['', Validators.required],
          Impedance: ['', Validators.required],
          rcd: ['', Validators.required],
          earthElectrodeResistanc: ['', Validators.required],
          designation: ['', Validators.required],
          companyName: ['', Validators.required],

          distributionIncomingValueArr: this.formBuilder.array([this.createdistributionIncomingValueForm()]),
          testDistributionArr: this.formBuilder.array([this.createtestDistributionForm()]),

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
   retrieveSiteId(e: any) {
    let changedValue = e.target.value;
    for(let arr of this.siteListInspec) {
      if(arr.site == changedValue) {
        this.testingdetails.siteId = arr.siteId;
      }
    }
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
         getdistributionIncomingValueControls() {
   return (<FormArray> this.testingForm.get (' distributionIncomingValueArr')).controls;
   }
  
   
 
 
 
   gettestDistributionfFormControls() {
    return (<FormArray> this.testingForm.get(' testDistributionArr')).controls;
  }
 gettestCircuitFormControls() {
  return (<FormArray> this.testingForm.get('  testCircuitFormArr')).controls;
   }
   gettestConductorControls() {
     return (<FormArray> this.testingForm.get('  testConductorArr')).controls;
   }
  
   gettestContinuityControls() {
     return (<FormArray> this.testingForm.get('  testContinuityArr')).controls;
   }

   gettestVoltageControls() {
     return (<FormArray> this.testingForm.get('  testVoltageArr')).controls;
   } 
  
   gettestLoopImpedanceControls() {
     return (<FormArray> this.testingForm.get('  testLoopImpedanceArr')).controls;
   }
   gettestFaultCurrentControls() {
    return (<FormArray> this.testingForm.get('  testFaultCurrentArr')).controls;
   }
   gettestDisconnectionTimeControls() {
    return (<FormArray> this.testingForm.get('  testDisconnectionTimeArr')).controls;
   }
   gettestrcdValueControls() {
    return (<FormArray> this.testingForm.get('  testrcdValueArr')).controls;
   }
   

   nextTab7()
    {
       
          this.testingdetails.userName=this.email;
          this.testingdetails.distributionIncomingValue = this.testingForm.value.distributionIncomingValueControlsArr;
         this.testingdetails.testDistribution = this.testingForm.value.testDistributionfFormControlsArr;
          this.testingdetails.testCircuit = this.testingForm.value.testCircuitFormArr;
          this.testingdetails.testConductor = this.testingForm.value.testConductorArr;
          this.testingdetails.testContinuity = this.testingForm.value.testContinuityArr;
          this.testingdetails.testVoltage = this.testingForm.value.testVoltageArr;
          this.testingdetails.testLoopImpedance = this.testingForm.value.testLoopImpedanceArr;
          this.testingdetails.testFaultCurrent = this.testingForm.value.testFaultCurrentArr;
          this.testingdetails.testDisconnectionTime = this.testingForm.value.testDisconnectionTimeArr;
          this.testingdetails.testRcd = this.testingForm.value.testrcdValueArr;
          console.log(this.testingdetails);
           this.testingService.addTest(this.testingdetails).subscribe(
            ()=>{
               console.log("worked");
             }
           )
   }
   
}






