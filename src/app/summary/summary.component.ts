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
    limitationsInspection:  new FormControl(''),
    userName:  new FormControl(''),
    siteId:  new FormControl(''),
    extentInstallation:  new FormControl(''),
    agreedLimitations: new FormControl(''),
    agreedWith:  new FormControl(''),
    operationalLimitations:  new FormControl(''),
    recommendationsDate: new FormControl(''),
    inspectionTestingDetailed:  new FormControl(''),
    generalConditionInstallation:  new FormControl(''),
    overallAssessmentInstallation:  new FormControl(''),
  })

  
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

  summary=new Summary();
  

  // Second Tab dependencies
  panelOpenState = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  // ThirdFormGroup: FormGroup;
  // fourthFormGroup: FormGroup;


  @Output() passEntry: EventEmitter<any> = new EventEmitter();  
  formBuilder: any;
  arrDesigner!: FormArray; 
  //summarydetailsService:any;
  selectedType: any;
  addDivisions: any;
  filter: any;
  canViewDiv: any;
  radioButtonChange: any;
   constructor(private _formBuilder: FormBuilder,
    private modalService: NgbModal,
    private dialog: MatDialog,
    private router: ActivatedRoute,
    private summarydetailsService: SummarydetailsService,public service: GlobalsService,
    private ChangeDetectorRef: ChangeDetectorRef) {
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
      limitationsInspection: ['', Validators.required],
      userName: ['', Validators.required],
      siteId: ['', Validators.required],
      extentInstallation: ['', Validators.required],
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
  }
  
  

  refresh() {
    this.ChangeDetectorRef.detectChanges();
  }
  
 
  private Declaration1Form(): FormGroup {
    return new FormGroup({
    name: new FormControl(''),
    signature: new FormControl(''),
    company: new FormControl(''),
    position: new FormControl(''),
    address: new FormControl(''),
    date: new FormControl(''),
    declarationRole: new FormControl('')
    })
  }
 
  private Declaration2Form(): FormGroup {
    return new FormGroup({
      name: new FormControl(''),
      signature: new FormControl(''),
      company: new FormControl(''),
      position: new FormControl(''),
      address: new FormControl(''),
      date: new FormControl(''),
      declarationRole: new FormControl('')
    })
  }
  private ObservationsForm(): FormGroup {
    return new FormGroup({
      observations: new FormControl(''),
      furtherActions: new FormControl(''),
      referanceNumberReport: new FormControl(''),
      comment: new FormControl('')
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

  SubmitTab5()
  {
    this.summary.siteId=this.service.siteCount;
    this.summary.userName=this.email;
    this.summary.summaryObervation = this.addsummary.value.ObservationsArr;
    this.summary.summaryDeclaration = this.addsummary.value.Declaration1Arr;
    this.summary.summaryDeclaration=this.summary.summaryDeclaration.concat(this.addsummary.value.Declaration2Arr);
    this.summary.summaryDeclaration[0].declarationRole="inspector";
    this.summary.summaryDeclaration[1].declarationRole="authorizer";

      console.log(this.summary);
  this.summarydetailsService.addSummary(this.summary).subscribe(
    data=>{
      console.log("worked");
    }
  )
  }


   onChange(event:any) {
    this.selectedType = event.target.value;
  }
  
  addObservations(){
    this.ObservationsArr = this.addsummary.get('ObservationsArr') as FormArray;
    this.ObservationsArr.push(this.ObservationsForm());
    }
    
    removeObservations(index:any){
      (this.addsummary.get('ObservationsArr') as FormArray).removeAt(index);
    }
   
   
   changeComboo(event:any) {
    console.log('changed', event && event.value);
  }
 
 
}
