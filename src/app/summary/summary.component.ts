import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  ChangeDetectorRef,
  VERSION,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from '../model/user';
import { MatRadioChange } from '@angular/material/radio';
import { Summary } from '../model/summary';
import { SummarydetailsService } from '../services/summarydetails.service';
import { GlobalsService } from '../globals.service';
import { VerificationlvComponent } from '../verificationlv/verificationlv.component';
import { SiteService } from '../services/site.service';
import { InspectionVerificationService } from '../services/inspection-verification.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  selectedValue: any;
  overallAssessmentInstallation: boolean = false;
  installations: string[] = ['Satisfactory', 'Unsatisfactory'];

  addsummary = new FormGroup({
    //limitationsInspection:  new FormControl(''),
    extentInstallation: new FormControl(''),
    attachedInspection: new FormControl(''),
    agreedLimitations: new FormControl(''),
    agreedWith: new FormControl(''),
    operationalLimitations: new FormControl(''),
    recommendationsDate: new FormControl(''),
    inspectionTestingDetailed: new FormControl(''),
    generalConditionInstallation: new FormControl(''),
    overallAssessmentInstallation: new FormControl(''),
  });

  selectedIndex = 0;

  ObservationsArr!: FormArray;
  dataSource: any = [];
  // newDivs: addDivisions[] = [];
  email: String = '';
  inActive: boolean = false;
  user = new User();
  isChecked: boolean = false;
  show: boolean = false;
  isVisible = -1;
  selectedField!: string;
  loclength: any;
  i: any;
  j: any;
  summary = new Summary();
  validationError: boolean = false;
  validationErrorMsg: String = '';
  successMsg: string = '';
  success: boolean = false;
  Error: boolean = false;
  errorMsg: string = '';
  // Second Tab dependencies
  panelOpenState = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  // ThirdFormGroup: FormGroup;
  // fourthFormGroup: FormGroup;
  disable: boolean = false;
  flag: boolean = false;
  // @Output("changeTab1") changeTab1: EventEmitter<any> = new EventEmitter();

  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  formBuilder: any;
  arrDesigner!: FormArray;
  //summarydetailsService:any;
  selectedType: any;
  addDivisions: any;
  filter: any;
  canViewDiv: any;
  radioButtonChange: any;
  submitted = false;
  summaryList: any = [];
  arr: any = [];
  limitationsValue!: String;
  // @ViewChild (FinalreportsComponent) final!: FinalreportsComponent;
  //@ViewChild (VerificationlvComponent) final!: VerificationlvComponent;

  @Output() proceedNext = new EventEmitter<any>();
  fcname: string[] = [
    'comment',
    'furtherActions',
    'observations',
    'referanceNumberReport',
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private modalService: NgbModal,
    private dialog: MatDialog,
    private router: ActivatedRoute,
    private summarydetailsService: SummarydetailsService,
    public service: GlobalsService,
    public siteService: SiteService,
    private ChangeDetectorRef: ChangeDetectorRef,
    private final: VerificationlvComponent,
    private UpateInspectionService: InspectionVerificationService,

  ) {
    this.email = this.router.snapshot.paramMap.get('email') || '{}';
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      retrieveIsActive: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
      clientname: ['', Validators.required],
    });

    this.addsummary = this._formBuilder.group({
      // limitationsInspection: ['', Validators.required],
      extentInstallation: ['', Validators.required],
      attachedInspection: ['', Validators.required],
      agreedLimitations: ['', Validators.required],
      agreedWith: ['', Validators.required],
      operationalLimitations: ['', Validators.required],
      recommendationsDate: ['', Validators.required],
      inspectionTestingDetailed: ['', Validators.required],
      generalConditionInstallation: ['', Validators.required],
      overallAssessmentInstallation: ['', Validators.required],
      Declaration1Arr: this._formBuilder.array([this.Declaration1Form()]),
      Declaration2Arr: this._formBuilder.array([this.Declaration2Form()]),
      ObservationsArr: this._formBuilder.array([this.ObservationsForm()]),
    });
    this.refresh();
    // this.Declaration2Arr = this.addsummary.get('Declaration2Arr') as FormArray;
  }

  refresh() {
    this.ChangeDetectorRef.detectChanges();
  }

  retrieveDetailsfromSavedReports(userName: any,siteId: any,clientName: any,departmentName: any,site: any){
    this.siteService.retrieveFinal(userName,siteId).subscribe(
      data=> {
        
       this.summaryList = JSON.parse(data);
       this.summary.siteId = siteId;
       this.summary.summaryId = this.summaryList.summary.summaryId;
       this.summary.createdBy = this.summaryList.summary.createdBy;
       this.summary.createdDate = this.summaryList.summary.createdDate;

       this.summary.limitationsInspection = this.summaryList.summary.limitationsInspection;
       this.limitationsValue = this.summaryList.summary.limitationsInspection;
       this.onChange(this.limitationsValue);
       for(let i of this.summaryList.summary.summaryDeclaration) {
         if(i.declarationRole == "Inspector") {
          this.addsummary.patchValue({
            Declaration1Arr: [i]
          })
         }

         else{
          this.addsummary.patchValue({
            Declaration2Arr: [i]
          })
         }
       }

       this.populateData();
       this.flag = true;

       this.addsummary.patchValue({
        extentInstallation: this.summaryList.summary.extentInstallation,
        agreedLimitations: this.summaryList.summary.agreedLimitations,
        agreedWith: this.summaryList.summary.agreedWith,
        operationalLimitations: this.summaryList.summary.operationalLimitations,
        recommendationsDate: this.summaryList.summary.recommendationsDate,
        inspectionTestingDetailed: this.summaryList.summary.inspectionTestingDetailed,
        generalConditionInstallation: this.summaryList.summary.generalConditionInstallation,
        overallAssessmentInstallation: this.summaryList.summary.overallAssessmentInstallation,
    })
    // this.flag=true;
      },
      error => {
       console.log("error")
      }
      )

     }

     populateData() {
      for (let item of this.summaryList.summary.summaryObervation) {
        this.arr.push(this.createGroup(item));
        
      }
      this.addsummary.setControl('ObservationsArr', this._formBuilder.array(this.arr || []))
    }

    createGroup(item: any): FormGroup {
      return this._formBuilder.group({
        observationsId: new FormControl({disabled: false,value: item.observationsId}),
        observations: new FormControl({disabled: false,value: item.observations}),
        furtherActions: new FormControl({disabled: false,value: item.furtherActions}),
        referanceNumberReport: new FormControl({disabled: false,value: item.referanceNumberReport}),
        comment: new FormControl({disabled: false,value: item.comment}),
        
      });
    }
  

  private Declaration1Form(): FormGroup {
    return new FormGroup({
      declarationId: new FormControl(''),
      name: new FormControl('', Validators.required),
      signature: new FormControl('', Validators.required),
      company: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      declarationRole: new FormControl('Inspector'),
    });
  }

  private Declaration2Form(): FormGroup {
    return new FormGroup({
      declarationId: new FormControl(''),
      name: new FormControl('', Validators.required),
      signature: new FormControl('', Validators.required),
      company: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      declarationRole: new FormControl('Authorizer'),
    });
  }
  private ObservationsForm(): FormGroup {
    return new FormGroup({
      observations: new FormControl('', Validators.required),
      furtherActions: new FormControl('', Validators.required),
      referanceNumberReport: new FormControl('', Validators.required),
      comment: new FormControl('', Validators.required),
    });
  }

  getDeclaration1Controls(): AbstractControl[] {
    return (<FormArray>this.addsummary.get('Declaration1Arr')).controls;
  }
  getDeclaration2Controls(): AbstractControl[] {
    return (<FormArray>this.addsummary.get('Declaration2Arr')).controls;
  }
  getObservationsControls(): AbstractControl[] {
    return (<FormArray>this.addsummary.get('ObservationsArr')).controls;
  }
  get f(): any {
    return this.addsummary.controls;
  }

  onChange(event: any) {
    // this.selectedType = event.target.value;
    let changedValue;

    if(event.target != undefined) {
      changedValue = event.target.value;
    }
    else{
      changedValue = event;
    }
    if (changedValue == 'No remedial action required') {
      this.selectedType = false;
      this.disableValidators();
    }
    else{
      this.selectedType = true;
    }
  }
  disableValidators() {
    this.ObservationsArr = this.addsummary.get('ObservationsArr') as FormArray;
    this.loclength = this.ObservationsArr.length;
    for (this.i = 0; this.i < this.loclength; this.i++) {
      for (this.j = 0; this.j < this.fcname.length; this.j++) {
        this.f.ObservationsArr.controls[this.i].controls[
          this.fcname[this.j]
        ].clearValidators();
        this.f.ObservationsArr.controls[this.i].controls[
          this.fcname[this.j]
        ].updateValueAndValidity();
      }
    }
  }

  addObservations() {
    this.ObservationsArr = this.addsummary.get('ObservationsArr') as FormArray;
    this.ObservationsArr.push(this.ObservationsForm());
  }

  removeObservations(index: any) {
    (this.addsummary.get('ObservationsArr') as FormArray).removeAt(index);
  }

  changeComboo(event: any) {
    
    if(event.value == 'Unsatisfactory') {
      this.overallAssessmentInstallation= true;
      //this.disableValidatorsRadio();
    }
    else {

    }
  }
  changeTab1(index: number, sitedId: any, userName: any): void {
    this.selectedIndex = index;
  }
  gotoNextModal(content5: any) {
    if (this.addsummary.invalid) {
      this.validationError = true;
      this.validationErrorMsg = 'Please check all the fields';
      setTimeout(() => {
        this.validationError = false;
      }, 3000);
      return;
    }
    this.modalService.open(content5, { centered: true });
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
  SubmitTab5(flag: any) {
    debugger
    
    if(!flag) {
      this.summary.siteId = this.service.siteCount;
    }
    this.summary.userName = this.email;
    this.submitted = true;
    if (this.addsummary.invalid) {
      return;
    }
    this.summary.summaryObervation = this.addsummary.value.ObservationsArr;
    this.summary.summaryDeclaration = this.addsummary.value.Declaration1Arr;
    this.summary.summaryDeclaration = this.summary.summaryDeclaration.concat(
      this.addsummary.value.Declaration2Arr
    );


    if(flag) {
      this.UpateInspectionService.updateSummary(this.summary).subscribe(
        (data) => {
          console.log("success");
        },
        (error) => {
          console.log("error");

        }
      )
    }

    else {
      this.summarydetailsService.addSummary(this.summary).subscribe(
        (data) => {
          this.proceedNext.emit(true);
          // show success message ofter click button
          this.success = true;
          this.successMsg = 'Summary Information Successfully Saved';
          this.disable = true;
          this.final.changeTab1(3);
        },
        (error) => {
          this.Error = true;
          // show error button
          this.proceedNext.emit(false);
          this.errorMsg = 'Something went wrong, kindly check all the fields';
        });
    }
    
  }
}
