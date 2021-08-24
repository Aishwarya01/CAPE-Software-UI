import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TestingDetails } from '../model/testing-details';
import { TestingService } from '../services/testing.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InspectiondetailsService } from '../services/inspectiondetails.service';
import { InspectionVerificationIncomingEquipmentComponent } from '../inspection-verification-incoming-equipment/inspection-verification-incoming-equipment.component';
import { GlobalsService } from '../globals.service';
import { Location } from '../model/location';
import { SiteService } from '../services/site.service';
import { InspectionVerificationService } from '../services/inspection-verification.service';
@Component({
  selector: 'app-inspection-verification-testing',
  templateUrl: './inspection-verification-testing.component.html',
  styleUrls: ['./inspection-verification-testing.component.css'],
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
  testingDetails = new TestingDetails();
  incomingVoltage: String = '';
  incomingZs: String = '';
  incomingIpf: String = '';
  rateArr: any = [];
  locationNumberList: any = [];
  //@Input()
  userName: String = '';
  //@Input()
  siteId!: number;
  rateValueArr: any=[];
  testingRecordTableArr: any = [];

  locationNameList: any = [];
  distributionIncomingValueArr: any = [];
  testingRecords: any = [];

  ratingAmps1: any;
  testDistribution!: FormArray;
  testingDistribution!: FormArray;
  successMsg: string = '';
  success: boolean = false;
  Error: boolean = false;
  errorMsg: string = '';
  o: any;
  email: string;
  validationError: boolean = false;
  validationErrorMsg: String = '';
  location = new Location();
  // demoArr: any=[];
  disable: boolean = false;
  flag:boolean=false;
  fcname: any[] = [
    'circuitNo',
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
  errorArr: any=[];
  testList: any=[];
  arr:any=[];
  Ratearr1:any=[];
  testingRetrieve: boolean=false;
  inspectionRetrieve: boolean=false;
  constructor(
    private testingService: TestingService,
    private formBuilder: FormBuilder,
    public service: GlobalsService,
    private modalService: NgbModal,
    private router: ActivatedRoute,
    private inspectionDetailsService: InspectiondetailsService,
    private siteService: SiteService,
    private UpateInspectionService: InspectionVerificationService,
  ) {
    this.email = this.router.snapshot.paramMap.get('email') || '{}';
  }

  ngOnInit(): void {
    this.testingForm = this.formBuilder.group({
      testaccordianArr: this.formBuilder.array([]),
    });
    if (
      this.service.iterationList != '' &&
      this.service.iterationList != undefined
    ) {
      this.testingRetrieve=false;
      this.inspectionRetrieve=true;
      let a = this.service.iterationList.length;
      for (let i = 0; i < a; i++) {
        this.addItem();
      }
      for (let j = 0; j < this.testaccordianArr.controls.length; j++) {
        this.testaccordianArr.value[j].locationNumber =
          this.service.iterationList[j].locationNumber;
        this.testaccordianArr.value[j].locationName =
          this.service.iterationList[j].locationName;
      }
      this.location.locationArr = this.service.iterationList;
      this.service.iterationList = [];
    }
  }

  retrieveDetailsfromSavedReports(userName: any,siteId: any,clientName: any,departmentName: any,site: any,data: any){
      this.testingRetrieve=true;
      this.inspectionRetrieve=false;
      this.testList = JSON.parse(data);
      this.testingDetails.siteId = siteId;
      this.testingDetails.testingReportId = this.testList.testingReport.testingReportId;
      this.testingDetails.createdBy = this.testList.testingReport.createdBy;
      this.testingDetails.createdDate = this.testList.testingReport.createdDate;
      this.populateData();

      this.flag=true;
     }

     populateData() {
      for (let item of this.testList.testingReport.testing) {
        this.arr.push(this.createGroup(item));
      }
      this.testingForm.setControl('testaccordianArr', this.formBuilder.array(this.arr || []))
    }
    
    createGroup(item: any): FormGroup {
      return this.formBuilder.group({
        testingId: new FormControl({disabled: false,value: item.testingId}),
        locationNumber: new FormControl({disabled: false,value: item.locationNumber}),
        locationName: new FormControl({disabled: false,value:  item.locationName}),
        testEngineerName: new FormControl({disabled: false,value:  item.testEngineerName}),
        date: new FormControl({disabled: false,value: item.date}),
        companyName: new FormControl({disabled: false,value:  item.companyName}),
        designation: new FormControl({disabled: false,value:  item.designation}),
        detailsTestInstrument: new FormControl({disabled: false,value: item.detailsTestInstrument}),
        continuity: new FormControl({disabled: false,value:  item.continuity}),
        insulationResisance: new FormControl({disabled: false,value: item.insulationResisance}),
        impedance: new FormControl({disabled: false,value:  item.impedance}),
        rcd: new FormControl({disabled: false,value: item.rcd}),
        earthElectrodeResistance: new FormControl({disabled: false,value: item.earthElectrodeResistance}),
        testDistribution: this.formBuilder.array([this.populateTestDistributionForm(item.testDistribution)]),
        testingRecords: this.formBuilder.array(this.populateTestRecordsForm(item.testingRecords)),
      });
    }

    private populateTestDistributionForm(testDistributionItem: any): FormGroup {
      return new FormGroup({
        distributionId: new FormControl({disabled: false,value: testDistributionItem[0].distributionId}),
        distributionBoardDetails: new FormControl({disabled: false,value: testDistributionItem[0].distributionBoardDetails}),
        referance: new FormControl({disabled: false,value: testDistributionItem[0].referance}),
        location: new FormControl({disabled: false,value: testDistributionItem[0].location}),
        correctSupplyPolarity: new FormControl({disabled: false,value: testDistributionItem[0].correctSupplyPolarity}),
        numOutputCircuitsUse: new FormControl({disabled: false,value: testDistributionItem[0].numOutputCircuitsUse}),
        ratingsAmps: new FormControl({disabled: false,value: testDistributionItem[0].ratingsAmps}),
        rateArr: this.formBuilder.array(this.populateRating(testDistributionItem[0].ratingsAmps)),
        numOutputCircuitsSpare: new FormControl({disabled: false,value: testDistributionItem[0].numOutputCircuitsSpare}),
        installedEquipmentVulnarable: new FormControl({disabled: false,value: testDistributionItem[0].installedEquipmentVulnarable}),
        incomingVoltage: new FormControl({disabled: false,value: testDistributionItem[0].incomingVoltage}),
        incomingZs: new FormControl({disabled: false,value: testDistributionItem[0].incomingZs}),
        incomingIpf: new FormControl({disabled: false,value: testDistributionItem[0].incomingIpf}),
        distributionIncomingValueArr: this.formBuilder.array([
          this.populatedistributionIncomingValue(testDistributionItem[0].incomingVoltage,testDistributionItem[0].incomingZs,testDistributionItem[0].incomingIpf),
        ]),
      });
    }
    private populateRating(ratingAmps: any) {
      let ratingsAmpsArray= [];
      this.rateValueArr = [];
      ratingsAmpsArray= ratingAmps.split(",");
      for(let i =0; i<ratingsAmpsArray.length; i++) {
        this.rateValueArr.push(this.populateratingAmps(ratingsAmpsArray[i]));
      }
      return this.rateValueArr;
      // this.testingForm.setControl('rateArr', this.formBuilder.array(this.rateValueArr || []))
    }
    private populateratingAmps(ratingsAmps:any): FormGroup {  
      return new FormGroup({
        ratingsAmps: new FormControl({disabled: false,value: ratingsAmps}),
      });
    }
    private populatedistributionIncomingValue(incomingVoltage:any, incomingZs:any, incomingIpf:any): FormGroup {
      let incomingVoltageArray= [];
      let incomingZsArray = [];
      let incomingIpfArray= [];

      incomingVoltageArray= incomingVoltage.split(",");
      incomingZsArray=  incomingZs.split(",");
      incomingIpfArray=   incomingIpf.split(",");
     

      let item = [];
      item.push(incomingVoltageArray,incomingZsArray,incomingIpfArray);
      return new FormGroup({
        incomingVoltage1:new FormControl({disabled: false,value: item[0][0]}),
        incomingVoltage2:new FormControl({disabled: false,value:item[0][1]}),
        incomingVoltage3:new FormControl({disabled: false,value:item[0][2]}),
        incomingVoltage4:new FormControl({disabled: false,value:item[0][3]}),
        incomingVoltage5:new FormControl({disabled: false,value:item[0][4]}),
        incomingVoltage6:new FormControl({disabled: false,value:item[0][5]}),
        incomingVoltage7:new FormControl({disabled: false,value:item[0][6]}),
        incomingVoltage8:new FormControl({disabled: false,value:item[0][7]}),
        incomingVoltage9:new FormControl({disabled: false,value:item[0][8]}),
  
        incomingZs1:new FormControl({disabled: false,value:item[1][0]}),
        incomingZs2:new FormControl({disabled: false,value:item[1][1]}),
        incomingZs3:new FormControl({disabled: false,value:item[1][2]}),
        incomingZs4:new FormControl({disabled: false,value:item[1][3]}),
        incomingZs5:new FormControl({disabled: false,value:item[1][4]}),
        incomingZs6:new FormControl({disabled: false,value:item[1][5]}),
        incomingZs7:new FormControl({disabled: false,value:item[1][6]}),
        incomingZs8:new FormControl({disabled: false,value:item[1][7]}),
        incomingZs9:new FormControl({disabled: false,value:item[1][8]}),
  
        incomingIpf1:new FormControl({disabled: false,value:item[2][0]}),
        incomingIpf2:new FormControl({disabled: false,value:item[2][1]}),
        incomingIpf3:new FormControl({disabled: false,value:item[2][2]}),
        incomingIpf4:new FormControl({disabled: false,value:item[2][3]}),
        incomingIpf5:new FormControl({disabled: false,value:item[2][4]}),
        incomingIpf6:new FormControl({disabled: false,value:item[2][5]}),
        incomingIpf7:new FormControl({disabled: false,value:item[2][6]}),
        incomingIpf8:new FormControl({disabled: false,value:item[2][7]}),
        incomingIpf9:new FormControl({disabled: false,value:item[2][8]}),
      });
    }
    private populateTestRecordsForm(testRecordsItem: any){
      
      let disconnectionTimeArr = [];
      let testFaultCurrentArr  = [];
      let testLoopImpedanceArr = [];
      let testVoltageArr = [];
      this.testingRecordTableArr = [];

      for(let item of testRecordsItem) {
        disconnectionTimeArr=  item.disconnectionTime.split(",");
        testFaultCurrentArr = item.testFaultCurrent.split(",");
        testLoopImpedanceArr = item.testLoopImpedance.split(",");
        testVoltageArr = item.testVoltage.split(",");
        
        this.testingRecordTableArr.push(this.pushTestingTable(item,disconnectionTimeArr,testFaultCurrentArr,testLoopImpedanceArr,testVoltageArr))
      }

      // let item = [];
      // item.push(nominalVoltageAL,nominalFrequencyAL,faultCurrentAL,loopImpedanceAL,installedCapacityAL,actualLoadAL);
      return this.testingRecordTableArr
    }

    pushTestingTable(itemTestingValue: any,disconnectionTimeArr: any,testFaultCurrentArr: any,testLoopImpedanceArr: any,testVoltageArr: any) : FormGroup {
      return new FormGroup({
        testingRecordId: new FormControl({disabled: false,value: itemTestingValue.testingRecordId}),
        circuitNo: new FormControl({disabled: false,value: itemTestingValue.circuitNo}),
        circuitDesc: new FormControl({disabled: false,value: itemTestingValue.circuitDesc}),
        circuitStandardNo: new FormControl({disabled: false,value: itemTestingValue.circuitStandardNo}),
        circuitType: new FormControl({disabled: false,value: itemTestingValue.circuitType}),
        circuitRating: new FormControl({disabled: false,value: itemTestingValue.circuitRating}),
        circuitBreakingCapacity: new FormControl({disabled: false,value: itemTestingValue.circuitBreakingCapacity}),
        conductorInstallation: new FormControl({disabled: false,value: itemTestingValue.conductorInstallation}),
        conductorLive: new FormControl({disabled: false,value: itemTestingValue.conductorLive}),
        conductorPecpc: new FormControl({disabled: false,value: itemTestingValue.conductorPecpc}),
        continutiyApproximateLength: new FormControl({disabled: false,value: itemTestingValue.continutiyApproximateLength}),
        continutiyRR: new FormControl({disabled: false,value: itemTestingValue.continutiyRR}),
        continutiyR: new FormControl({disabled: false,value: itemTestingValue.continutiyR}),
        continutiyLL: new FormControl({disabled: false,value: itemTestingValue.continutiyLL}),
        continutiyLE: new FormControl({disabled: false,value: itemTestingValue.continutiyLE}),
        continutiyPolarity: new FormControl({disabled: false,value: itemTestingValue.continutiyPolarity}),
        ryVoltage: new FormControl({disabled: false,value: testVoltageArr[0]}),
        rbVoltage: new FormControl({disabled: false,value: testVoltageArr[1]}),
        ybVoltage: new FormControl({disabled: false,value: testVoltageArr[2]}),
        rnVoltage: new FormControl({disabled: false,value: testVoltageArr[3]}),
        ynVoltage: new FormControl({disabled: false,value: testVoltageArr[4]}),
        bnVoltage: new FormControl({disabled: false,value: testVoltageArr[5]}),
        rpeVoltage: new FormControl({disabled: false,value: testVoltageArr[6]}),
        ypeVoltage: new FormControl({disabled: false,value: testVoltageArr[7]}),
        bpeVoltage: new FormControl({disabled: false,value: testVoltageArr[8]}),

        ryLoopImpedance: new FormControl({disabled: false,value: testLoopImpedanceArr[0]}),
        rbLoopImpedance: new FormControl({disabled: false,value: testLoopImpedanceArr[1]}),
        ybLoopImpedance: new FormControl({disabled: false,value: testLoopImpedanceArr[2]}),
        rnLoopImpedance: new FormControl({disabled: false,value: testLoopImpedanceArr[3]}),
        ynLoopImpedance: new FormControl({disabled: false,value: testLoopImpedanceArr[4]}),
        bnLoopImpedance: new FormControl({disabled: false,value: testLoopImpedanceArr[5]}),
        rpeLoopImpedance: new FormControl({disabled: false,value: testLoopImpedanceArr[6]}),
        ypeLoopImpedance: new FormControl({disabled: false,value: testLoopImpedanceArr[7]}),
        bpeLoopImpedance: new FormControl({disabled: false,value: testLoopImpedanceArr[8]}),

        ryFaultCurrent: new FormControl({disabled: false,value: testFaultCurrentArr[0]}),
        rbFaultCurrent: new FormControl({disabled: false,value: testFaultCurrentArr[1]}),
        ybFaultCurrent: new FormControl({disabled: false,value: testFaultCurrentArr[2]}),
        rnFaultCurrent: new FormControl({disabled: false,value: testFaultCurrentArr[3]}),
        ynFaultCurrent: new FormControl({disabled: false,value: testFaultCurrentArr[4]}),
        bnFaultCurrent: new FormControl({disabled: false,value: testFaultCurrentArr[5]}),
        rpeFaultCurrent: new FormControl({disabled: false,value: testFaultCurrentArr[6]}),
        ypeFaultCurrent: new FormControl({disabled: false,value: testFaultCurrentArr[7]}),
        bpeFaultCurrent: new FormControl({disabled: false,value: testFaultCurrentArr[8]}),

        ryDisconnect: new FormControl({disabled: false,value: disconnectionTimeArr[0]}),
        rbDisconnect: new FormControl({disabled: false,value: disconnectionTimeArr[1]}),
        ybDisconnect: new FormControl({disabled: false,value: disconnectionTimeArr[2]}),
        rnDisconnect: new FormControl({disabled: false,value: disconnectionTimeArr[3]}),
        ynDisconnect: new FormControl({disabled: false,value: disconnectionTimeArr[4]}),
        bnDisconnect: new FormControl({disabled: false,value: disconnectionTimeArr[5]}),
        rpeDisconnect: new FormControl({disabled: false,value: disconnectionTimeArr[6]}),
        ypeDisconnect: new FormControl({disabled: false,value: disconnectionTimeArr[7]}),
        bpeDisconnect: new FormControl({disabled: false,value: disconnectionTimeArr[8]}),
        
        testVoltage: new FormControl({disabled: false,value: itemTestingValue.testVoltage}),
        testLoopImpedance: new FormControl({disabled: false,value: itemTestingValue.testLoopImpedance}),
        testFaultCurrent: new FormControl({disabled: false,value: itemTestingValue.testFaultCurrent}),
        disconnectionTime: new FormControl({disabled: false,value: itemTestingValue.disconnectionTime}),
        rcdCurrent: new FormControl({disabled: false,value: itemTestingValue.rcdCurrent}),
        rcdOperatingCurrent: new FormControl({disabled: false,value: itemTestingValue.rcdOperatingCurrent}),
        rcdOperatingFiveCurrent: new FormControl({disabled: false,value: itemTestingValue.rcdOperatingFiveCurrent}),
        rcdTestButtonOperation: new FormControl({disabled: false,value: itemTestingValue.rcdTestButtonOperation}),
        rcdRemarks: new FormControl({disabled: false,value: itemTestingValue.rcdRemarks}),
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
      distributionIncomingValueArr: this.formBuilder.array([
        this.distributionIncomingValue(),
      ]),
    });
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
    });
  }
  ratingAmps(): FormGroup {
    return new FormGroup({
      ratingsAmps: new FormControl('', [Validators.required]),
    });
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
    });
  }

  // Dynamically iterate some fields
  onKey(event: KeyboardEvent, c: any, a: any) {
    this.values = (<HTMLInputElement>event.target).value;
    this.value = this.values;
    this.testingRecords = a.controls.testingRecords as FormArray;
    this.rateArr = c.controls.rateArr as FormArray;
    if (this.testingRecords.length == 0 && this.rateArr.length == 0) {
      if (this.value != '') {
        for (this.i = 1; this.i < this.value; this.i++) {
          this.testingRecords.push(this.createtestValueForm());
          this.rateArr.push(this.ratingAmps());
        }
      }
    } else if (this.value == '') {
      this.loclength = this.testingRecords.length;
      this.loclength = this.rateArr.length;

      for (this.i = 1; this.i < this.loclength; this.i++) {
        this.testingRecords.removeAt(this.testingRecords.length - 1);
        this.rateArr.removeAt(this.rateArr.length - 1);
      }
    } else if (
      this.testingRecords.length < this.value &&
      this.rateArr.length < this.value
    ) {
      if (this.value != '') {
        this.delarr = this.value - this.testingRecords.length;
        this.delarr = this.value - this.rateArr.length;

        for (this.i = 0; this.i < this.delarr; this.i++) {
          this.testingRecords.push(this.createtestValueForm());
          this.rateArr.push(this.ratingAmps());
        }
      }
    } else
      this.testingRecords.length > this.value &&
        this.rateArr.length > this.value;
    {
      if (this.value != '') {
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

      testDistribution: this.formBuilder.array([
        this.createtestDistributionForm(),
      ]),
      testingRecords: this.formBuilder.array([this.createtestValueForm()]),
    });
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
    });
  }

  addItem() {
    this.testaccordianArr = this.testingForm.get(
      'testaccordianArr'
    ) as FormArray;
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
      this.validationErrorMsg = 'Please check all the fields';
      setTimeout(() => {
        this.validationError = false;
      }, 3000);
      return;
    }
    this.modalService.open(content4, { centered: true });
  }

  callMethod() {
    this.ngOnInit();
  }
  closeModalDialog() {
    if (this.errorMsg != '') {
      this.Error = false;
      this.modalService.dismissAll((this.errorMsg = ''));
    } else {
      this.success = false;
      this.modalService.dismissAll((this.successMsg = ''));
    }
  }
  nextTab(flag:any) {
    if(!flag) {
      this.testingDetails.siteId = this.service.siteCount;
    }
    this.testingDetails.userName = this.email;
    this.submitted = true;
    if (this.testingForm.invalid) {
      return;
    }
    this.testaccordianArr = this.testingForm.get(
      'testaccordianArr'
    ) as FormArray;

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
          arr.push(
            k.incomingVoltage1,
            k.incomingVoltage2,
            k.incomingVoltage3,
            k.incomingVoltage4,
            k.incomingVoltage5,
            k.incomingVoltage6,
            k.incomingVoltage7,
            k.incomingVoltage8,
            k.incomingVoltage9
          );
          arr1.push(
            k.incomingZs1,
            k.incomingZs2,
            k.incomingZs3,
            k.incomingZs4,
            k.incomingZs5,
            k.incomingZs6,
            k.incomingZs7,
            k.incomingZs8,
            k.incomingZs9
          );
          arr2.push(
            k.incomingIpf1,
            k.incomingIpf2,
            k.incomingIpf3,
            k.incomingIpf4,
            k.incomingIpf5,
            k.incomingIpf6,
            k.incomingIpf7,
            k.incomingIpf8,
            k.incomingIpf9
          );
        }

        let incomingVoltage: String = '';
        let incomingZs: String = '';
        let incomingIpf: String = '';
        for (let a of arr) {
          if (a != '') {
            incomingVoltage += a + ',';
          } else {
            incomingVoltage += 'NA,';
          }
        }
        incomingVoltage = incomingVoltage.replace(/,\s*$/, '');
        j.incomingVoltage = incomingVoltage;

        for (let b of arr1) {
          if (b != '') {
            incomingZs += b + ',';
          } else {
            incomingZs += 'NA,';
          }
        }
        incomingZs = incomingZs.replace(/,\s*$/, '');
        j.incomingZs = incomingZs;

        for (let c of arr2) {
          if (c != '') {
            incomingIpf += c + ',';
          } else {
            incomingIpf += 'NA,';
          }
        }
        incomingIpf = incomingIpf.replace(/,\s*$/, '');
        j.incomingIpf = incomingIpf;

        // rateamps coma saparated value
        for (let k of j.rateArr) {
          arr3.push(k.ratingsAmps);
          let ratingsAmps: String = '';
          for (let a of arr3) {
            if (a != '') {
              ratingsAmps += a + ',';
            }
          }
          ratingsAmps = ratingsAmps.replace(/,\s*$/, '');
          j.ratingsAmps = ratingsAmps;
        }
        delete j.rateArr;
        delete j.distributionIncomingValueArr;
      }
      for (let x of this.testingRecords.value) {
        if (x.circuitNo == '') {
          x.circuitNo = 'NA';
        }
        if (x.continutiyRR == '') {
          x.continutiyRR = 'NA';
        }
        if (x.continutiyLL == '') {
          x.continutiyLL = 'NA';
        }
        if (x.continutiyLE == '') {
          x.continutiyLE = 'NA';
        }
        if (x.continutiyPolarity == '') {
          x.continutiyPolarity = 'NA';
        }
        if (x.conductorPecpc == '') {
          x.conductorPecpc = 'NA';
        }
        if (x.continutiyApproximateLength == '') {
          x.continutiyApproximateLength = 'NA';
        }
        if (x.continutiyR == '') {
          x.continutiyR = 'NA';
        }
        if (x.circuitStandardNo == '') {
          x.circuitStandardNo = 'NA';
        }
        if (x.conductorInstallation == '') {
          x.conductorInstallation = 'NA';
        }
        if (x.circuitType == '') {
          x.circuitType = 'NA';
        }
        if (x.circuitRating == '') {
          x.circuitRating = 'NA';
        }
        if (x.circuitBreakingCapacity == '') {
          x.circuitBreakingCapacity = 'NA';
        }
        if (x.conductorLive == '') {
          x.conductorLive = 'NA';
        }
        if (x.circuitDesc == '') {
          x.circuitDesc = 'NA';
        }
        if (x.rcdTestButtonOperation == '') {
          x.rcdTestButtonOperation = 'NA';
        }
        if (x.rcdRemarks == '') {
          x.rcdRemarks = 'NA';
        }
        if (x.rcdCurrent == '') {
          x.rcdCurrent = 'NA';
        }

        if (x.rcdOperatingCurrent == '') {
          x.rcdOperatingCurrent = 'NA';
        }
        if (x.rcdOperatingFiveCurrent == '') {
          x.rcdOperatingFiveCurrent = 'NA';
        }
      }
      // coma saparated value for second table
      for (let n of this.testingRecords.value) {
        let arr: any = [];
        let arr1: any = [];
        let arr2: any = [];
        let arr3: any = [];
        arr.push(
          n.ryVoltage,
          n.rbVoltage,
          n.ybVoltage,
          n.rnVoltage,
          n.ynVoltage,
          n.bnVoltage,
          n.rpeVoltage,
          n.ypeVoltage,
          n.bpeVoltage
        );
        arr1.push(
          n.ryLoopImpedance,
          n.rbLoopImpedance,
          n.ybLoopImpedance,
          n.rnLoopImpedance,
          n.ynLoopImpedance,
          n.bnLoopImpedance,
          n.rpeLoopImpedance,
          n.ypeLoopImpedance,
          n.bpeLoopImpedance
        );
        arr2.push(
          n.ryFaultCurrent,
          n.rbFaultCurrent,
          n.ybFaultCurrent,
          n.rnFaultCurrent,
          n.ynFaultCurrent,
          n.bnFaultCurrent,
          n.rpeFaultCurrent,
          n.ypeFaultCurrent,
          n.bpeFaultCurrent
        );
        arr3.push(
          n.ryDisconnect,
          n.rbDisconnect,
          n.ybDisconnect,
          n.rnDisconnect,
          n.ynDisconnect,
          n.bnDisconnect,
          n.rpeDisconnect,
          n.ypeDisconnect,
          n.bpeDisconnect
        );
        let testVoltage: String = '';
        let testLoopImpedance: String = '';
        let testFaultCurrent: String = '';
        let disconnectionTime: String = '';

        for (let a of arr) {
          if (a != '') {
            testVoltage += a + ',';
          } else {
            testVoltage += 'NA,';
          }
        }
        testVoltage = testVoltage.replace(/,\s*$/, '');
        n.testVoltage = testVoltage;

        for (let b of arr1) {
          if (b != '') {
            testLoopImpedance += b + ',';
          } else {
            testLoopImpedance += 'NA,';
          }
        }
        testLoopImpedance = testLoopImpedance.replace(/,\s*$/, '');
        n.testLoopImpedance = testLoopImpedance;

        for (let c of arr2) {
          if (c != '') {
            testFaultCurrent += c + ',';
          } else {
            testFaultCurrent += 'NA,';
          }
        }

        testFaultCurrent = testFaultCurrent.replace(/,\s*$/, '');
        n.testFaultCurrent = testFaultCurrent;

        for (let d of arr3) {
          if (d != '') {
            disconnectionTime += d + ',';
          } else {
            disconnectionTime += 'NA,';
          }
        }
        disconnectionTime = disconnectionTime.replace(/,\s*$/, '');
        n.disconnectionTime = disconnectionTime;
      }
    }
    this.testingDetails.testing = this.testingForm.value.testaccordianArr;
    if(flag) {
      this.UpateInspectionService.updateTesting(this.testingDetails).subscribe(
        (data) => {
          console.log("success");
        },
        (error) => {
          console.log("error");
        });
    }
    else {
      this.testingService.savePeriodicTesting(this.testingDetails).subscribe(
        (data) => {
          this.proceedNext.emit(true);
          // show success message ofter click button
          this.success = true;
          this.successMsg = data;
          this.disable = true;
        },
        (error) => {
          this.Error = true;
          // show error button
          this.proceedNext.emit(false);
          this.errorArr = [];
          this.errorArr = JSON.parse(error.error);
          this.errorMsg = this.errorArr.message;
        }
      );
    }
  }
}
