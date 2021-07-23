import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TestingDetails, } from '../model/testing-details';
import { TestingService } from '../services/testing.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-inspection-verification-testing',
  templateUrl: './inspection-verification-testing.component.html',
  styleUrls: ['./inspection-verification-testing.component.css']
})
export class InspectionVerificationTestingComponent implements OnInit {

  j: any;
  i: any;
  delarr: any;
  values: any;
  value: any;
  loclength: any;
  loc1length: any;
  testingForm!: FormGroup;

  submitted = false;
  testaccordianArr!: FormArray;
  panelOpenState = false;
  email: String = '';

  @Output() proceedNext = new EventEmitter<any>();

  testingDetails = new TestingDetails;
  incomingVoltage: String = "";
  incomingZs: String = "";
  incomingIpf: String = "";
  rateArr: any = [];
  distributionIncomingValueArr: any = [];
  testingRecords: any = [];

  ratingAmps1: any;
  testDistribution!: FormArray;
  testingDistribution!: FormArray;
  successMsg: string="";
  success: boolean=false;
  disable: boolean=false;
  Error: boolean=false;
  errorMsg: string="";

  validationError: boolean =false;
  validationErrorMsg: String ="";

  fcname:any[]=
  ['ryVoltage',
  'rbVoltage',
  'ybVoltage', 
  'rnVoltage' ,
  'ynVoltage',
  'bnVoltage' ,
  'rpeVoltage', 
  'ypeVoltage' ,
  'bpeVoltage' ,
  'ryLoopImpedance', 
  'rbLoopImpedance' ,
  'ybLoopImpedance' ,
  'rnLoopImpedance' ,
  'ynLoopImpedance' ,
  'bnLoopImpedance' ,
  'rpeLoopImpedance' ,
  'ypeLoopImpedance' ,
  'bpeLoopImpedance' ,
  'ryFaultCurrent' ,
  'rbFaultCurrent' ,
  'ybFaultCurrent' ,
  'rnFaultCurrent' ,
  'ynFaultCurrent' ,
  'bnFaultCurrent' ,
  'rpeFaultCurrent' ,
  'ypeFaultCurrent' ,
  'bpeFaultCurrent' ,
  'ryDisconnect' ,
  'rbDisconnect' ,
  'ybDisconnect' ,
  'rnDisconnect' ,
  'ynDisconnect' ,
  'bnDisconnect' ,
  'rpeDisconnect' ,
  'ypeDisconnect' ,
  'bpeDisconnect'
];
  o: any;

  constructor(private testingService: TestingService, private formBuilder: FormBuilder,
    private modalService: NgbModal, private router: ActivatedRoute,) {
    this.email = this.router.snapshot.paramMap.get('email') || '{}'
  }

  ngOnInit(): void {
    this.testingForm = this.formBuilder.group({
      testaccordianArr: this.formBuilder.array([this.createItem()])
    });
  }

  getdistributionIncomingValueControls(form: any) {
    return form.controls.distributionIncomingValueArr?.controls;
  }
  gettestDistributionFormControls(form: any) {
    return form.controls.testDistribution?.controls;
  }
  gettestValueControls(form: any) {
    return form.controls.testingRecords?.controls;
  }
  gettestrateFormControls(form: any) {
    return form.controls.rateArr?.controls;
  }
  getTestControls(): AbstractControl[] {
    return (<FormArray>this.testingForm.get('testaccordianArr')).controls;
  }

  private createtestDistributionForm(): FormGroup {
    return new FormGroup({
      distributionBoardDetails: new FormControl('', [Validators.required]),
      referance: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      correctSupplyPolarity: new FormControl('', [Validators.required]),
      numOutputCircuitsUse: new FormControl('', [Validators.required]),
      ratingsAmps: new FormControl(''),
      rateArr: this.formBuilder.array([this.ratingAmps()]),
      numOutputCircuitsSpare: new FormControl('', [Validators.required]),
      installedEquipmentVulnarable: new FormControl('', [Validators.required]),
      incomingVoltage: new FormControl(''),
      incomingZs: new FormControl(''),
      incomingIpf: new FormControl(''),
      distributionIncomingValueArr: this.formBuilder.array([this.distributionIncomingValue()]),

    })
  }

  distributionIncomingValue(): FormGroup {
    return new FormGroup({
      incomingVoltage1: new FormControl(''),
      incomingVoltage2: new FormControl(''),
      incomingVoltage3: new FormControl(''),
      incomingVoltage4: new FormControl(''),
      incomingVoltage5: new FormControl(''),
      incomingVoltage6: new FormControl(''),
      incomingVoltage7: new FormControl(''),
      incomingVoltage8: new FormControl(''),
      incomingVoltage9: new FormControl(''),

      incomingZs1: new FormControl(''),
      incomingZs2: new FormControl(''),
      incomingZs3: new FormControl(''),
      incomingZs4: new FormControl(''),
      incomingZs5: new FormControl(''),
      incomingZs6: new FormControl(''),
      incomingZs7: new FormControl(''),
      incomingZs8: new FormControl(''),
      incomingZs9: new FormControl(''),

      incomingIpf1: new FormControl(''),
      incomingIpf2: new FormControl(''),
      incomingIpf3: new FormControl(''),
      incomingIpf4: new FormControl(''),
      incomingIpf5: new FormControl(''),
      incomingIpf6: new FormControl(''),
      incomingIpf7: new FormControl(''),
      incomingIpf8: new FormControl(''),
      incomingIpf9: new FormControl(''),
    })
  }
  ratingAmps(): FormGroup {
    return new FormGroup({
      ratingsAmps: new FormControl('', [Validators.required]),


    })
  }

  private createtestValueForm(): FormGroup {
    return new FormGroup({
      circuitNo: new FormControl('NA'),
      circuitDesc: new FormControl('NA'),
      circuitStandardNo: new FormControl('NA'),
      circuitType: new FormControl('NA'),
      circuitRating: new FormControl('NA'),
      circuitBreakingCapacity: new FormControl('NA'),
      conductorInstallation: new FormControl('NA'),
      conductorLive: new FormControl('NA'),
      conductorPecpc: new FormControl('NA'),
      continutiyApproximateLength: new FormControl('NA'),
      continutiyRR: new FormControl('NA'),
      continutiyR: new FormControl('NA'),
      continutiyLL: new FormControl('NA'),
      continutiyLE: new FormControl('NA'),
      continutiyPolarity: new FormControl('NA'),

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

     

      testVoltage: new FormControl(''),
      testLoopImpedance: new FormControl(''),
      testFaultCurrent: new FormControl(''),
      disconnectionTime: new FormControl(''),


      rcdCurrent: new FormControl('NA'),
      rcdOperatingCurrent: new FormControl('NA'),
      rcdOperatingFiveCurrent: new FormControl('NA'),
      rcdTestButtonOperation: new FormControl('NA'),
      rcdRemarks: new FormControl('NA'),


    })
  }
   // Dynamically iterate some fields 
  onKey(event: KeyboardEvent, c: any, a: any) {
    this.values = (<HTMLInputElement>event.target).value;
    this.value = this.values;
    this.testingRecords = a.controls.testingRecords as FormArray;
    this.rateArr = c.controls.rateArr as FormArray;

    console.log(c);
    console.log(a);
    console.log(this.rateArr)
    console.log(this.testingRecords)
    if (this.testingRecords.length == 0 && this.rateArr.length == 0) {
      if (this.value != "") {
        for (this.i = 1; this.i < this.value; this.i++) {
          this.testingRecords.push(this.createtestValueForm());
          this.rateArr.push(this.ratingAmps());

        }
      }
    }
    else if (this.value == "") {
      this.loclength = this.testingRecords.length;
      this.loclength = this.rateArr.length;


      for (this.i = 1; this.i < this.loclength; this.i++) {
        this.testingRecords.removeAt(this.testingRecords.length - 1);
        this.rateArr.removeAt(this.rateArr.length - 1);

      }
    }
    else if (this.testingRecords.length < this.value && this.rateArr.length < this.value) {
      if (this.value != "") {
        this.delarr = this.value - this.testingRecords.length;
        this.delarr = this.value - this.rateArr.length;


        for (this.i = 0; this.i < this.delarr; this.i++) {
          this.testingRecords.push(this.createtestValueForm());
          this.rateArr.push(this.ratingAmps());

        }
      }
    }
    else (this.testingRecords.length > this.value && this.rateArr.length > this.value)
    {
      if (this.value != "") {
        this.delarr = this.testingRecords.length - this.value;
        this.delarr = this.rateArr.length - this.value;


        for (this.i = 0; this.i < this.delarr; this.i++) {
          this.testingRecords.removeAt(this.testingRecords.length - 1);
          this.rateArr.removeAt(this.rateArr.length - 1);


        }
      }
    }
  }

  createItem() {
    return this.formBuilder.group({
      locationNumber: new FormControl('', [Validators.required]),
      locationName: new FormControl('', [Validators.required]),
      testEngineerName: ['', Validators.required],
      date: ['', Validators.required],
      companyName: ['', Validators.required],
      designation: ['', Validators.required],
      detailsTestInstrument: ['', Validators.required],
      continuity: ['', Validators.required],
      insulationResisance: ['', Validators.required],
      impedance: ['', Validators.required],
      rcd: ['', Validators.required],
      earthElectrodeResistance: ['', Validators.required],

      testDistribution: this.formBuilder.array([this.createtestDistributionForm()]),
      testingRecords: this.formBuilder.array([this.createtestValueForm()]),

    })
  }


  createtestDistribution(): FormGroup {
    return new FormGroup({
      distributionBoardDetails: new FormControl(''),
      referance: new FormControl(''),
      location: new FormControl(''),
      correctSupplyPolarity: new FormControl(''),
      numOutputCircuitsUse: new FormControl(''),
      ratingsAmps: new FormControl(''),
      numOutputCircuitsSpare: new FormControl(''),
      installedEquipmentVulnarable: new FormControl(''),
      incomingVoltage: new FormControl(''),
      incomingZs: new FormControl(''),
      incomingIpf: new FormControl(''),
    })
  }

  addItem() {
    this.testaccordianArr = this.testingForm.get('testaccordianArr') as FormArray;
    this.testaccordianArr.push(this.createItem());
  }

  removeAccordian(index: any) {
    (this.testingForm.get('testaccordianArr') as FormArray).removeAt(index);
  }

  get f(): any {
    return this.testingForm.controls;
  }

  gotoNextModal(content4: any) {
    debugger
    if (this.testingForm.invalid) {
      this.validationError = true;
      this.validationErrorMsg = "Please check all the fields";
      setTimeout(() => {
        this.validationError = false;
      }, 3000);
      return;
    }
    this.modalService.open(content4, { centered: true })
  }

  nextTab() {
    this.testingDetails.siteId = 92;
    this.testingDetails.userName = this.email;
    this.submitted = true;
    if (this.testingForm.invalid) {
      return;
    }
    this.testaccordianArr = this.testingForm.get('testaccordianArr') as FormArray;

    for (let i of this.testaccordianArr.controls) {
      this.testDistribution = i.get('testDistribution') as FormArray;
      this.testingRecords = i.get('testingRecords') as FormArray;

      // coma separated value for first table
      for (let j of this.testDistribution.value) {
        console.log(j)
        let arr: any = [];
        let arr1: any = [];
        let arr2: any = [];
        let arr3: any = [];

        for (let k of j.distributionIncomingValueArr) {
          arr.push(k.incomingVoltage1, k.incomingVoltage2, k.incomingVoltage3, k.incomingVoltage4, k.incomingVoltage5, k.incomingVoltage6, k.incomingVoltage7, k.incomingVoltage8, k.incomingVoltage9)
          arr1.push(k.incomingZs1, k.incomingZs2, k.incomingZs3, k.incomingZs4, k.incomingZs5, k.incomingZs6, k.incomingZs7, k.incomingZs8, k.incomingZs9)
          arr2.push(k.incomingIpf1, k.incomingIpf2, k.incomingIpf3, k.incomingIpf4, k.incomingIpf5, k.incomingIpf6, k.incomingIpf7, k.incomingIpf8, k.incomingIpf9)
        }

        let incomingVoltage: String = "";
        let incomingZs: String = "";
        let incomingIpf: String = "";

        for (let a of arr) {
          if (a != "") {
            incomingVoltage += a + ",";
          }
          else {
            incomingVoltage += "NA,";
          }
        }

        incomingVoltage = incomingVoltage.replace(/,\s*$/, "");
        j.incomingVoltage = incomingVoltage;

        for (let b of arr1) {
          if (b != "") {
            incomingZs += b + ",";
          }
          else {
            incomingZs += "NA,";
          }
        }

        incomingZs = incomingZs.replace(/,\s*$/, "");
        j.incomingZs = incomingZs;

        for (let c of arr2) {
          if (c != "") {
            incomingIpf += c + ",";
          }
          else {
            incomingIpf += "NA,";
          }
        }

        incomingIpf = incomingIpf.replace(/,\s*$/, "");
        j.incomingIpf = incomingIpf;

        // rateamps coma saparated value
        for (let k of j.rateArr) {
          arr3.push(k.ratingsAmps)
          let ratingsAmps: String = "";
          for (let a of arr3) {
            if (a != "") {
              ratingsAmps += a + ",";
            }
          }
          ratingsAmps = ratingsAmps.replace(/,\s*$/, "");
          j.ratingsAmps = ratingsAmps;
        }
        debugger
        delete j.rateArr;
        delete j.distributionIncomingValueArr;

      }
      // coma saparated value for second table
      for (let n of this.testingRecords.value) {
        let arr: any = [];
        let arr1: any = [];
        let arr2: any = [];
        let arr3: any = [];
        arr.push(n.ryVoltage, n.rbVoltage, n.ybVoltage, n.rnVoltage, n.ynVoltage, n.bnVoltage, n.rpeVoltage, n.ypeVoltage, n.bpeVoltage)
        arr1.push(n.ryLoopImpedance, n.rbLoopImpedance, n.ybLoopImpedance, n.rnLoopImpedance, n.ynLoopImpedance, n.bnLoopImpedance, n.rpeLoopImpedance, n.ypeLoopImpedance, n.bpeLoopImpedance)
        arr2.push(n.ryFaultCurrent, n.rbFaultCurrent, n.ybFaultCurrent, n.rnFaultCurrent, n.ynFaultCurrent, n.bnFaultCurrent, n.rpeFaultCurrent, n.ypeFaultCurrent, n.bpeFaultCurrent)
        arr3.push(n.ryDisconnect, n.rbDisconnect, n.ybDisconnect, n.rnDisconnect, n.ynDisconnect, n.bnDisconnect, n.rpeDisconnect, n.ypeDisconnect, n.bpeDisconnect)
        let testVoltage: String = "";
        let testLoopImpedance: String = "";
        let testFaultCurrent: String = "";
        let disconnectionTime: String = "";

        for (let a of arr) {
          if (a != "") {
            testVoltage += a + ",";
          }
          else {
            testVoltage += "NA,";
          }
        }

        testVoltage = testVoltage.replace(/,\s*$/, "");
        n.testVoltage = testVoltage;

        for (let b of arr1) {

          if (b != "") {
            testLoopImpedance += b + ",";
          }
          else {
            testLoopImpedance += "NA,";
          }
        }

        testLoopImpedance = testLoopImpedance.replace(/,\s*$/, "");
        n.testLoopImpedance = testLoopImpedance;

        for (let c of arr2) {
          if (c != "") {
            testFaultCurrent += c + ",";
          }
          else {
            testFaultCurrent += "NA,";
          }
        }

        testFaultCurrent = testFaultCurrent.replace(/,\s*$/, "");
        n.testFaultCurrent = testFaultCurrent;

        for (let d of arr3) {
          if (d != "") {
            disconnectionTime += d + ",";
          }
          else {
            disconnectionTime += "NA,";
          }
        }

        disconnectionTime = disconnectionTime.replace(/,\s*$/, "");
        n.disconnectionTime = disconnectionTime;

      

      }
    
    }


    console.log(this.testaccordianArr);
    this.testingDetails.testing = this.testingForm.value.testaccordianArr;
    console.log(this.testingDetails);
    this.testingService.savePeriodicTesting(this.testingDetails).subscribe(
      data => {
        debugger
        console.log("worked");
        this.proceedNext.emit(true);
        // show success message ofter click button
        this.success = true
        this.successMsg = "Testing Information successfully saved";
        this.disable = true;
      },
      error => {
        console.log("error");
        this.Error = true;
        // show error button   
        this.proceedNext.emit(false);
        this.errorMsg = "Something went wrong, kindly check all the fields";
      }
    )

  }
}

