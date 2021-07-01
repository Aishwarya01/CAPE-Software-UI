import { Component,  OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TestingDetails } from '../model/testing-details';
import { TestingService } from '../services/testing.service';



@Component({
  selector: 'app-inspection-verification-testing',
  templateUrl: './inspection-verification-testing.component.html',
  styleUrls: ['./inspection-verification-testing.component.css']
})
export class InspectionVerificationTestingComponent implements OnInit {


  i:any;
  delarr:any;
  values:any;
  value:any;
  loclength: any;
  loc1length: any;
  testingForm!: FormGroup;
  testValueArr!: FormArray;
  testDistributionArr!: FormArray;
  distributionIncomingValueArr!: FormArray;
  panelOpenState = false;
  constructor( private formBuilder: FormBuilder) { }
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
       testValueArr: this.formBuilder.array([this.createtestValueForm()]),
    });
  }

  getdistributionIncomingValueControls(): AbstractControl[] {

    return (<FormArray>this.testingForm.get('distributionIncomingValueArr')).controls
   }
  gettestDistributionFormControls(): AbstractControl[] {
    return (<FormArray>this.testingForm.get('testDistributionArr')).controls
   }
  gettestValueControls(): AbstractControl[] {

   return (<FormArray>this.testingForm.get('testValueArr')).controls
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
     private createtestValueForm(): FormGroup {
      return new FormGroup({
        circuitNo: new FormControl(''),
        description: new FormControl(''),
        standardNo: new FormControl(''),
        type: new FormControl(''),
        rating: new FormControl(''),
        breakingCapacity: new FormControl(''),
        installationReferanceMethod: new FormControl(''),
        live: new FormControl(''),
        Integer: new FormControl(''),
        approximateLength: new FormControl(''),
        rRContinuity: new FormControl(''),
        rContinuity: new FormControl(''),
        lLContinuity: new FormControl(''),
        lEContinuity: new FormControl(''),
        polarity: new FormControl(''),
        ryVoltage: new FormControl(''),
        rbVoltage: new FormControl(''),
        ybVoltage: new FormControl(''),
        rnVoltage: new FormControl(''),
        ynVoltage: new FormControl(''),
        bnVoltage: new FormControl(''),
        rpeVoltage: new FormControl(''),
        ypeVoltage: new FormControl(''),
        bpeVoltage: new FormControl(''),
        ryLoopImpedance: new FormControl(''),
        rbLoopImpedance: new FormControl(''),
        ybLoopImpedance: new FormControl(''),
        rnLoopImpedance: new FormControl(''),
        ynLoopImpedance: new FormControl(''),
        bnLoopImpedance: new FormControl(''),
        rpeLoopImpedance: new FormControl(''),
        ypeLoopImpedance: new FormControl(''),
        bpeLoopImpedance: new FormControl(''),
        ryFaultCurrent: new FormControl(''),
        rbFaultCurrent: new FormControl(''),
        ybFaultCurrent: new FormControl(''),
        rnFaultCurrent: new FormControl(''),
        ynFaultCurrent: new FormControl(''),
        bnFaultCurrent: new FormControl(''),
        rpeFaultCurrent: new FormControl(''),
        ypeFaultCurrent: new FormControl(''),
        bpeFaultCurrent: new FormControl(''),
        ryDisconnect: new FormControl(''),
        rbDisconnect: new FormControl(''),
        ybDisconnect: new FormControl(''),
        rnDisconnect: new FormControl(''),
        ynDisconnect: new FormControl(''),
        bnDisconnect: new FormControl(''),
        rpeDisconnect: new FormControl(''),
        ypeDisconnect: new FormControl(''),
        bpeDisconnect: new FormControl(''),
        rcdCurrent: new FormControl(''),
        operatingCurrent: new FormControl(''),
        operatingFiveCurrent: new FormControl(''),
        testButtonOperation: new FormControl(''),
        remarks: new FormControl(''),
       // ratingsAmps: new FormControl(''),
      })
     }
     
  onKey(event: KeyboardEvent)    {
    this.values = (<HTMLInputElement>event.target).value ;
   this.value = this.values;
    this.testValueArr = this.testingForm.get('testValueArr') as FormArray;
      if(this.testValueArr.length==0)   
    {
      if(this.value != "")
          {
    for (this.i=1; this.i<this.value; this.i++ )
      {
        this.testValueArr = this.testingForm.get('testValueArr') as FormArray;
        this.testValueArr.push(this.createtestValueForm());
       }
    }
    }
    else if (this.value=="")
    {
     this.loclength=this.testValueArr.length;
  
      for (this.i=1; this.i<this.loclength; this.i++ )
         {
        this.testValueArr.removeAt(this.testValueArr.length-1);
    }
      }
       else if (this.testValueArr.length < this.value)
      
       {
        if(this.value != "")
        {
       this.delarr =  this.value-this.testValueArr.length;
   
       for (this.i=0; this.i<this.delarr; this.i++ )
       {
         this.testValueArr = this.testingForm.get('testValueArr') as FormArray;
         this.testValueArr.push(this.createtestValueForm());
     }
      }
      }
       else (this.testValueArr.length > this.value )
      {
       if(this.value != "")
          {
       this.delarr =  this.testValueArr.length-this.value;
   
       for (this.i=0; this.i<this.delarr; this.i++ )
       {
         this.testValueArr = this.testingForm.get('testValueArr') as FormArray;
         this.testValueArr.removeAt(this.testValueArr.length-1);
      }
  }
}
   }

     removeItem(index: any) {
       (this.testingForm.get('testValueArr') as FormArray).removeAt(index);
     }
    

     nextTab(){
      console.log(this.testingForm.value);
       
    
    }
     }
     





