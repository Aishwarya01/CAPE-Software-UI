import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild, ChangeDetectorRef, VERSION } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  selectedValue:any
  overallAssessmentInstallation: string="";
  installations: string[] = ['Satisfactory', 'Unsatisfactory'];

 
  addsummary = new FormGroup({
    //limitationsInspection:  new FormControl(''),
    extentInstallation:  new FormControl(''),
    attachedInspection:  new FormControl(''),
    agreedLimitations: new FormControl(''),
    agreedWith:  new FormControl(''),
    operationalLimitations:  new FormControl(''),
    recommendationsDate: new FormControl(''),
    inspectionTestingDetailed:  new FormControl(''),
    generalConditionInstallation:  new FormControl(''),
    overallAssessmentInstallation:  new FormControl(''),
  })

  selectedIndex = 0;

  ObservationsArr!: FormArray;
  dataSource : any= [];  
 // newDivs: addDivisions[] = [];
  email: String = '';
  inActive: boolean = false;
  user = new User;
  isChecked: boolean = false;
  show:boolean=false;
  isVisible = -1;
  selectedField!: string;
  loclength: any;
  i:any;
  j:any;
  summary=new Summary();
  validationError: boolean = false;
  validationErrorMsg: String = "";
  successMsg: string = "";
  success: boolean = false;
  Error: boolean = false;
  errorMsg: string = "";
  // Second Tab dependencies
  panelOpenState = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  // ThirdFormGroup: FormGroup;
  // fourthFormGroup: FormGroup;
  disable: boolean = false;
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
 // @ViewChild (FinalreportsComponent) final!: FinalreportsComponent;
  //@ViewChild (VerificationlvComponent) final!: VerificationlvComponent;

  @Output() proceedNext = new EventEmitter<any>();  
  fcname:string[]=['comment',
  'furtherActions',
  'observations',
  'referanceNumberReport'];

   constructor(private _formBuilder: FormBuilder,
    private modalService: NgbModal,
    private dialog: MatDialog,
    private router: ActivatedRoute,
    private summarydetailsService: SummarydetailsService,public service: GlobalsService,
    private ChangeDetectorRef: ChangeDetectorRef,
    private final: VerificationlvComponent) {
    this.email = this.router.snapshot.paramMap.get('email') || '{}'

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
      ObservationsArr: this._formBuilder.array([this.ObservationsForm()])
      });
    this.refresh();
   // this.Declaration2Arr = this.addsummary.get('Declaration2Arr') as FormArray;
  }
  


  refresh() {
    this.ChangeDetectorRef.detectChanges();
  }
  
 
  private Declaration1Form(): FormGroup {
    return new FormGroup({
    name: new FormControl('', Validators.required),
    signature: new FormControl('', Validators.required),
    company: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    declarationRole: new FormControl('Inspector')
    })
  }
 
  private Declaration2Form(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      signature: new FormControl('', Validators.required),
      company: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
     declarationRole: new FormControl('Authorizer')
    })
  }
  private ObservationsForm(): FormGroup {
    return new FormGroup({
      observations: new FormControl('', Validators.required),
      furtherActions: new FormControl('', Validators.required),
      referanceNumberReport: new FormControl('', Validators.required),
      comment: new FormControl('', Validators.required)
    })
  }
  
 
getDeclaration1Controls(): AbstractControl[] { 
  return (<FormArray> this.addsummary.get('Declaration1Arr')).controls
}
getDeclaration2Controls(): AbstractControl[] { 
  return (<FormArray> this.addsummary.get('Declaration2Arr')).controls
}
getObservationsControls(): AbstractControl[] { 
  return (<FormArray> this.addsummary.get('ObservationsArr')).controls
}
get f():any {
  return this.addsummary.controls;
}


 

   onChange(event:any) {
    this.selectedType = event.target.value;
    if(event.target.value == 'hide') {
      this.selectedType= false;
      this.disableValidators();
    }
  }
  disableValidators() {
    this.ObservationsArr = this.addsummary.get('ObservationsArr') as FormArray;
   this.loclength=this.ObservationsArr.length;
    for( this.i=0; this.i<this.loclength; this.i++)
     {
       for( this.j=0 ; this.j<this.fcname.length ; this.j++)
       {
        this.f.ObservationsArr.controls[this.i].controls[this.fcname[this.j]].clearValidators();
        this.f.ObservationsArr.controls[this.i].controls[this.fcname[this.j]].updateValueAndValidity();      
      }
    
     }
  }
  
  addObservations(){
    this.ObservationsArr = this.addsummary.get('ObservationsArr') as FormArray;
    this.ObservationsArr.push(this.ObservationsForm());
    }
    
    removeObservations(index:any){
      (this.addsummary.get('ObservationsArr') as FormArray).removeAt(index);
    }
   
   changeComboo(event:any) {
   
    // if(event.target.value == 'Unsatisfactory') {
    //   this.overallAssessmentInstallation= false;
    //   this.disableValidatorsRadio();
    // }
  }
  changeTab1(index: number,sitedId: any,userName :any):void
{
    this.selectedIndex = index;
}
gotoNextModal(content5: any) {
  if (this.addsummary.invalid) {
    this.validationError = true;
    this.validationErrorMsg = "Please check all the fields";
    setTimeout(() => {
      this.validationError = false;
    }, 3000);
    return;
  }
  this.modalService.open(content5, { centered: true })
}
closeModalDialog(){
  if(this.errorMsg != ""){
    this.Error = false;
    this.modalService.dismissAll(this.errorMsg = "")
  }
  else {
    this.success=false;
    this.modalService.dismissAll(this.successMsg="")
  }
}
  SubmitTab5()
  {
   debugger
    this.summary.siteId=this.service.siteCount;
    this.summary.userName=this.email;
    this.submitted= true;
    if (this.addsummary.invalid) {
      return;
    }
    this.summary.summaryObervation = this.addsummary.value.ObservationsArr;
    this.summary.summaryDeclaration = this.addsummary.value.Declaration1Arr;
    this.summary.summaryDeclaration=this.summary.summaryDeclaration.concat(this.addsummary.value.Declaration2Arr);
      
  this.summarydetailsService.addSummary(this.summary).subscribe(
    data => {
      this.proceedNext.emit(true);
      // show success message ofter click button
      this.success = true
      this.successMsg = "Summary Information successfully saved";
      this.disable = true;
      this.final.changeTab1(3);
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
