import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Site } from 'src/app/model/site';
import { ClientService } from 'src/app/services/client.service';
import { DepartmentService } from 'src/app/services/department.service';
import { SiteService } from 'src/app/services/site.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalsService } from 'src/app/globals.service';


@Component({
  selector: 'app-siteadd',
  templateUrl: './siteadd.component.html',
  styleUrls: ['./siteadd.component.css']
})
export class SiteaddComponent implements OnInit {

  isSubmitted = false;
  addSiteForm = new FormGroup({
    // clientName: new FormControl(''),
    // departmentName: new FormControl(''),
    siteName: new FormControl(''),
    personIncharge: new FormControl(''),
    contactNo: new FormControl(''),
    personInchargeEmail: new FormControl(''),
    siteLocation: new FormControl(''),
    AddressLine1: new FormControl(''),
    AddressLine2: new FormControl(''),
    siteLandmark: new FormControl(''),
    country: new FormControl(''),
    state: new FormControl(''),
    pincode: new FormControl(''),
  });
  countryCode: any;
  clientList: any = [];
  clientArray: any = [];
  departmentList: any = [];
  countryList: any = [];
  stateList: any = [];
  site = new Site();
  loading = false;
  submitted = false;
  showErrorMessage=false;
  arr!: FormArray;
  errormsg: any;
  successMsg: string = "";
  success: boolean = false;
  Error: boolean = false;
  errorMsg: string = "";
  validationError: boolean = false;
  validationErrorMsg: String = "";
  onSubmitSite = new EventEmitter();


  @Input()
  data: any = [];
  errorArr: any=[];
  constructor(public dialog: MatDialog,
              public clientService: ClientService,
              public departmentService: DepartmentService,
              public siteService: SiteService,
              public formBuilder: FormBuilder,
              private modalService: NgbModal,
              private service: GlobalsService
              ) {
              }

  ngOnInit(): void {
    this.site.site = this.data.siteName;
    this.site.companyName = this.data.companyName;
    this.site.departmentName = this.data.department
    this.addSiteForm = this.formBuilder.group({
      companyName: [''],
      departmentName: [''],
      siteName: [''],
      arr: this.formBuilder.array([this.createItem(this.data)]),
      siteLocation: ['', Validators.required],
      AddressLine1: ['', Validators.required],
      AddressLine2: [''],
      siteLandmark: [''],
      country: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required],
      });
    

    this.siteService.retrieveCountry().subscribe(
      data => {
        this.countryList = JSON.parse(data);
      }
    )
  }

  get a():any {
    return this.addSiteForm.controls;
  }

  // Only Integer Numbers
  keyPressNumbers(event:any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }


  // Only AlphaNumeric with Some Characters [-_ ]
  keyPressAlphaNumericWithCharacters(event:any) {

    var inp = String.fromCharCode(event.keyCode);
    // Allow numbers, space, underscore
    if (/[0-9-+ ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  // changeClient(e: any) {
  //   let changedValue = e.target.value;
  //   this.departmentList = [];
  //     for(let arr of this.clientList) {
  //       if( arr.clientName == changedValue) {
  //         this.departmentService.retrieveDepartment(this.email,arr.clientName).subscribe(
  //           data => {
  //             this.departmentList = JSON.parse(data)
  //           }
  //         )};
  //     }
  // }

  changeCountry(e: any) {
    let changedValue = e.target.value;
    this.stateList = [];
      for(let arr of this.countryList) {
        if( arr.name == changedValue) {
          this.siteService.retrieveState(arr.code).subscribe(
            data => {
              this.stateList = JSON.parse(data)
            }
          )};
      }
  }

  cancel() {
    this.dialog.closeAll();
  }

  createItem(value: any) {
    return this.formBuilder.group({
      personIncharge: [value.name, Validators.required],
      designation: [value.designation, Validators.required],
      contactNo: [value.contactNumber],
      personInchargeEmail: [value.username, [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      countryCode: ['91']
    })
  }

  // addItem() {
  //   this.arr = this.addSiteForm.get('arr') as FormArray;
  //   this.arr.push(this.createItem(this.data));
  // }

  removeItem(index: any) {
    (this.addSiteForm.get('arr') as FormArray).removeAt(index);
  }

  getControls(): AbstractControl[] {
    return (<FormArray> this.addSiteForm.get('arr')).controls
  }

  //country code
  countryChange(country: any, a: any) {
    this.countryCode = country.dialCode;
    a.controls.countryCode.value= this.countryCode;
  }

  onSubmit() {
    this.submitted = true;

    //Breaks if form is invalid
    if(this.addSiteForm.invalid) {
      this.validationError = true;
      this.validationErrorMsg = "Please check all the fields";
      setTimeout(() => {
        this.validationError = false;
      }, 3000);
      return;
    }

    this.loading = true;

    //country code
    this.arr = this.addSiteForm.get('arr') as FormArray;
    // for(let i of this.arr.value) {
    //   if((i.countryCode != "") && (i.countryCode != undefined))
    //   {
    //     i.contactNo = "+" +i.countryCode + "-" + i.contactNo;
    //   }
    // }

    this.site.sitePersons=this.addSiteForm.value.arr;
    for(let i of this.site.sitePersons) {
      i.inActive=true;
    }

    this.site.userName = this.data.assignedBy;
    this.site.assignedTo = this.data.username;
    this.siteService.addSIte(this.site).subscribe(
      data=> {
        this.success = true
        this.successMsg =data;
        this.service.allFieldsDisable = false;
        this.service.allStepsCompleted=true;
        setTimeout(() => {
          this.success = false;
        }, 3000);
        setTimeout(() => {
          this.dialog.closeAll();
          this.onSubmitSite.emit(true);
        }, 2000);
        this.service.msgForStep1Flag=true;
      },
      error => {
        this.Error = true;
        this.errorArr = [];
        this.errorArr = JSON.parse(error.error);
        this.errorMsg =this.errorArr.message;
        this.onSubmitSite.emit(false);
        setTimeout(() => {
          this.Error = false;
        }, 3000);
        this.loading=false;
      }
      )
  }

}
