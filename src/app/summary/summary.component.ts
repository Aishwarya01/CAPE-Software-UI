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
    attachedInspection:  new FormControl(''),
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
  loclength: any;
  i:any;
  j:any;
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
  submitted = false;

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
    declarationRole: new FormControl('', Validators.required)
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
      declarationRole: new FormControl('', Validators.required)
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

setTrue() {
 this.submitted = true;
  if(this.addsummary.invalid) {
    return;
  }
  this.proceedNext.emit(true);
}

  SubmitTab5()
  {
    if(this.addsummary.invalid) {
      alert("Something went wrong, kindly check all the fields");
      return;
    }
    else{
    alert("Step2 successfully saved");
    }
    this.summary.siteId=this.service.siteCount;
    this.summary.userName=this.email;
    if(this.addsummary.invalid) {
      //   this.Error = true;	
      //   this.errorMsg="Something went wrong, kindly check all the fields";	
      //   setTimeout(()=>{                      	
      //     this.Error = false;	
      // }, 6000);
        return;
      }
    this.summary.summaryObervation = this.addsummary.value.ObservationsArr;
    this.summary.summaryDeclaration = this.addsummary.value.Declaration1Arr;
    this.summary.summaryDeclaration=this.summary.summaryDeclaration.concat(this.addsummary.value.Declaration2Arr);
    this.summary.summaryDeclaration[0].declarationRole="inspector";
    this.summary.summaryDeclaration[1].declarationRole="authorizer";

      
  this.summarydetailsService.addSummary(this.summary).subscribe(
    data=>{
      
    }
  )
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
 
 
}
