import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-inspection-verification-testing',
  templateUrl: './inspection-verification-testing.component.html',
  styleUrls: ['./inspection-verification-testing.component.css']
})
export class InspectionVerificationTestingComponent implements OnInit {
  formBuilder: any;



 // testing=new Testing;
  
  
  testingForm = new FormGroup({



  })
  
  distributionIncomingValueControlsArr!: FormArray;
  
  constructor() { }
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
   });
  }

// testDistribution" :{

//             distributionBoardDetails: ['', Validators.required],
//             referance: ['', Validators.required],
//             location: ['', Validators.required],
//             correctSupplyPolarity: ['', Validators.required],
//             numOutputCircuitsUse: ['', Validators.required],
//             ratingsAmps: ['', Validators.required],
//             numOutputCircuitsSpare: ['', Validators.required],
//             installedEquipmentVulnarable: ['', Validators.required],
// },


  private createdistributionIncomingValueForm(): FormGroup {
  return new FormGroup({
        incomingVoltage:new FormControl(''),
        incomingZs:new FormControl(''),
         incomingIpf:new FormControl(''),
          })
         }

         getdistributionIncomingValueControls(): AbstractControl[] {
    return (<FormArray> this.testingForm.get(' distributionIncomingValueControlsArr')).controls
   }
  

  nextTab3() {
  
  console.log(this.testingForm.value);
  console.log(this.testingForm.value.distributionIncomingValueControlsArr);

        }
}
