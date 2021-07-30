import { Component, EventEmitter, Input, OnInit, Output, ViewChild ,OnDestroy} from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TestingDetails, } from '../model/testing-details';
import { TestingService } from '../services/testing.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InspectiondetailsService } from '../services/inspectiondetails.service';
import { InspectionVerificationIncomingEquipmentComponent } from '../inspection-verification-incoming-equipment/inspection-verification-incoming-equipment.component';
import { GlobalsService } from '../globals.service';
import { Location } from '../model/location';
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
 // email: String = '';

  @Output() proceedNext = new EventEmitter<any>();
  testingDetails = new TestingDetails;
  incomingVoltage: String = "";
  incomingZs: String = "";
  incomingIpf: String = "";
  rateArr: any = [];
  locationNumberList:any=[];
  //@Input()
  userName: String = '';
  //@Input()
  siteId!:number;

  locationNameList: any=[];
  distributionIncomingValueArr: any = [];
  testingRecords: any = [];

  ratingAmps1: any;
  testDistribution!: FormArray;
  testingDistribution!: FormArray;
  successMsg: string = "";
  success: boolean = false;
  Error: boolean = false;
  errorMsg: string = "";
  o: any;
  email: string;
  validationError: boolean = false;
  validationErrorMsg: String = "";
  location = new Location;
 // demoArr: any=[];
 disable: boolean = false;
  fcname: any[] =
    ['circuitNo',
      'circuitDesc',
      'circuitStandardNo',
      'circuitType',
      'circuitRating',
      'circuitBreakingCapacity',
      'conductorInstallation',
      'conductorLive',
      'conductorPecpc',
      'continutiyApproximateLength',
      'continutiyRR',
      'continutiyR',
      'continutiyLL',
      'continutiyLE',
      'continutiyPolarity',

      'rcdCurrent',
      'rcdOperatingCurrent',
      'rcdOperatingFiveCurrent',
      'rcdTestButtonOperation',
      'rcdRemarks',

    ];
 
  constructor(private testingService: TestingService, private formBuilder: FormBuilder,public service: GlobalsService,
    private modalService: NgbModal, private router: ActivatedRoute,private inspectionDetailsService: InspectiondetailsService) {
    this.email = this.router.snapshot.paramMap.get('email') || '{}'
  }

  ngOnInit(): void {
    this.testingForm = this.formBuilder.group({
      testaccordianArr: this.formBuilder.array([])
    });
    if((this.service.iterationList!="") && (this.service.iterationList!=undefined)){
      let a= this.service.iterationList.length;
      for(let i=0;i<a;i++) {
        this.addItem();
      }
        for(let j=0; j<this.testaccordianArr.controls.length; j++) {
          this.testaccordianArr.value[j].locationNumber = this.service.iterationList[j].locationNumber;
          this.testaccordianArr.value[j].locationName = this.service.iterationList[j].locationName;
        }
        this.location.locationArr = this.service.iterationList;
      this.service.iterationList = [];
  }
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
      circuitNo: new FormControl(''),
      circuitDesc: new FormControl(''),
      circuitStandardNo: new FormControl(''),
      circuitType: new FormControl(''),
      circuitRating: new FormControl(''),
      circuitBreakingCapacity: new FormControl(''),
      conductorInstallation: new FormControl(''),
      conductorLive: new FormControl(''),
      conductorPecpc: new FormControl(''),
      continutiyApproximateLength: new FormControl(''),
      continutiyRR: new FormControl(''),
      continutiyR: new FormControl(''),
      continutiyLL: new FormControl(''),
      continutiyLE: new FormControl(''),
      continutiyPolarity: new FormControl(''),
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
      rcdCurrent: new FormControl(''),
      rcdOperatingCurrent: new FormControl(''),
      rcdOperatingFiveCurrent: new FormControl(''),
      rcdTestButtonOperation: new FormControl(''),
      rcdRemarks: new FormControl(''),
    })
  }
 
  // Dynamically iterate some fields 
  onKey(event: KeyboardEvent, c: any, a: any) {
    this.values = (<HTMLInputElement>event.target).value;
    this.value = this.values;
    this.testingRecords = a.controls.testingRecords as FormArray;
    this.rateArr = c.controls.rateArr as FormArray;
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
      locationNumber: new FormControl(),
      locationName: new FormControl(),
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

  callMethod(){
   this.ngOnInit();
  }

  nextTab() {
    this.testingDetails.siteId = this.service.siteCount;
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
        delete j.rateArr;
        delete j.distributionIncomingValueArr;

      }
      for (let x of this.testingRecords.value) {
        if (x.circuitNo == "") {
          x.circuitNo = 'NA';
        }
        if (x.continutiyRR == "") {
          x.continutiyRR = 'NA';
        }
        if (x.continutiyLL == "") {
          x.continutiyLL = 'NA';
        }
        if (x.continutiyLE == "") {
          x.continutiyLE = 'NA';
        }
        if (x.continutiyPolarity == "") {
          x.continutiyPolarity = 'NA';
        }
        if (x.conductorPecpc == "") {
          x.conductorPecpc = 'NA';
        }
        if (x.continutiyApproximateLength == "") {
          x.continutiyApproximateLength = 'NA';
        }
        if (x.continutiyR == "") {
          x.continutiyR = 'NA';
        }
        if (x.circuitStandardNo == "") {
          x.circuitStandardNo = 'NA';
        }
        if (x.conductorInstallation == "") {
          x.conductorInstallation = 'NA';
        }
        if (x.circuitType == "") {
          x.circuitType = 'NA';
        }
        if (x.circuitRating == "") {
          x.circuitRating = 'NA';
        }
        if (x.circuitBreakingCapacity == "") {
          x.circuitBreakingCapacity = 'NA';
        }
        if (x.conductorLive == "") {
          x.conductorLive = 'NA';
        }
        if (x.circuitDesc == "") {
          x.circuitDesc = 'NA';
        }
        if (x.rcdTestButtonOperation == "") {
          x.rcdTestButtonOperation = 'NA';
        }
        if (x.rcdRemarks == "") {
          x.rcdRemarks = 'NA';
        }
        if (x.rcdCurrent == "") {
          x.rcdCurrent = 'NA';
        }

        if (x.rcdOperatingCurrent == "") {
          x.rcdOperatingCurrent = 'NA';
        }
        if (x.rcdOperatingFiveCurrent == "") {
          x.rcdOperatingFiveCurrent = 'NA';
        }
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
    this.testingDetails.testing = this.testingForm.value.testaccordianArr;
    this.testingService.savePeriodicTesting(this.testingDetails).subscribe(
      data => {
        
        this.proceedNext.emit(true);
        // show success message ofter click button
        this.success = true
        this.successMsg = "Testing Information successfully saved";
        this.disable = true;
      },
      error => {
        this.Error = true;
        // show error button   
        this.proceedNext.emit(false);
        this.errorMsg = "Something went wrong, kindly check all the fields";
      }
    )

  }
}

