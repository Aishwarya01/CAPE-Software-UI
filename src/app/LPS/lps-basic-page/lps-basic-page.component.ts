import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalsService } from 'src/app/globals.service';

import { BasicDetails} from 'src/app/LPS_model/basic-details';
import { LpsFileUploadService } from 'src/app/LPS_services/lps-file-upload.service';
import { LPSBasicDetailsService } from 'src/app/LPS_services/lpsbasic-details.service';

@Component({
  selector: 'app-lps-basic-page',
  templateUrl: './lps-basic-page.component.html',
  styleUrls: ['./lps-basic-page.component.css']
})
export class LpsBasicPageComponent implements OnInit {
  
  basicDetails = new BasicDetails;
  LPSBasicForm!: FormGroup;
  submitted!: boolean;
  success: boolean=false;
  successMsg: string="";
  disable: boolean=false;
  Error: boolean=false;
  errorArr: any=[];
  errorMsg: string="";
  validationError: boolean = false;
  validationErrorMsg: String = '';
  @Output() proceedNext = new EventEmitter<any>();
  step1List: any = [];
  flag: boolean = false;
  isEditable!:boolean
  success1: boolean =false;
  successMsg1: string="";
  countryCode: String = '';
  isCountryCodeDirty:boolean =false;
  stepBack:any;
  basicLpsIdRetrive:number=0;
  isBasicFormUpdated: boolean =false;
  proceedFlag: boolean = true;
  validationErrorTab: boolean = false;
  validationErrorMsgTab: string="";
  tabError: boolean=false;
  tabErrorMsg: string="";
  availableReportNo: string="";
  // For Spinner
  spinner: boolean=false;
  spinnerValue: String = '';
  mode: any = 'indeterminate';
  nextButton: boolean = true;
  popup: boolean = false;
  onSave: any;
  email: any;
  projectNameMsg: string="";
  projectNameError: boolean=false;
  projectNameSuccess: boolean=false;
  projectNameMsg1: string="";
  isEditable1: boolean=false;

  // File Upload
  fileName: String="";
  fileSize: any;
  spinnerUpload: boolean = false;
  popupUpload: boolean = false;
  finalSpinnerDelete: boolean = true;
  uploadDisable: boolean = true;
  popupDelete: boolean = false;
  uploadDisable1: boolean = true;
  uploadFlag: boolean=false;
  filesuccess: boolean = false;
  filesuccessMsg: string = "";
  JSONdata: any = [];
  fileDeleteSuccess: boolean = false;
  fileDeletesuccessMsg: string = "";

  file!: any;
  uploadFlag1!: boolean;
  uploadFlag2!: boolean;
  basicLpsId: number=0;
  formFile:any;
  fileId: any;
  retreveFileId: any;
  data: any=[];

  lpsBasic: any=[];

  // License Purpose
  // currentUserName: String='';
  // currentUsermail: String='';
  // userDetails: any;

  constructor(private formBuilder: FormBuilder, 
    private lPSBasicDetailsService: LPSBasicDetailsService,
    private modalService: NgbModal,
    private router: ActivatedRoute,
    public service: GlobalsService,
    public fileUplaodService: LpsFileUploadService

    ) {
    // this.lPSBasicDetailsService = lPSBasicDetailsService;
  }

  
  ngOnInit(): void {
    this.countryCode = '91';
    this.LPSBasicForm = this.formBuilder.group({
      lpsBasic: this.formBuilder.array([this.allBasicForm()])
    });
    // License Purpose
    // this.userDetails = sessionStorage.getItem('authenticatedUser');
    // if(JSON.parse(this.userDetails).role == "Inspector"){
    //   this.currentUserName=JSON.parse(this.userDetails).name;
    //   this.currentUsermail=JSON.parse(this.userDetails).username;
    // }
  }

  allBasicForm() {
    return this.formBuilder.group({
      clientName: new FormControl('', Validators.required),
      projectName:new FormControl('', Validators.required),
      pmcName:new FormControl(''),
      consultantName:new FormControl(''),
      contractorName:new FormControl(''),
      dealerContractorName:new FormControl(''),
      address:new FormControl('', Validators.required),
      location:new FormControl('', Validators.required),
      industryType:new FormControl('', Validators.required),
      soilResistivity:new FormControl(''),
      name:new FormControl('', Validators.required),
      company:new FormControl('', Validators.required),
      designation:new FormControl('', Validators.required),
      contactNumber:new FormControl('',[Validators.required ,Validators.maxLength(10),Validators.minLength(10)]),
      mailId:new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      availabilityOfPreviousReport:new FormControl('', Validators.required),
      // license purpose 
      // email1:new FormControl(''),
      // name1:new FormControl(''),
      fileName: new FormControl('', Validators.required),
      basicLpsId: new FormControl(''),
      fileSize: new FormControl(''),
      fileId: new FormControl('', Validators.required),
    });
  }

  getFileDetails(fileId:any){
    if(fileId!=undefined && fileId!="" && fileId!=null){
      this.fileUplaodService.retriveBasicFile(fileId).subscribe(
        (data) => {
          this.fileName = JSON.parse(data).fileName;
          this.fileSize = JSON.parse(data).fileSize;
          this.fileId = JSON.parse(data).fileId;
        },
        (error) => {
        },
      )
    }
  }

  createGroup(item: any): FormGroup {
    this.countryCode =item.contactNumber.split("-")[0]
    this.getFileDetails(item.fileId);
    return this.formBuilder.group({

      clientName: new FormControl({disabled: false, value: item.clientName}, Validators.required),
      projectName: new FormControl({disabled: false, value: item.projectName}, Validators.required),
      pmcName: new FormControl({disabled: false, value: item.pmcName}),
      consultantName: new FormControl({disabled: false, value: item.consultantName}),
      contractorName: new FormControl({disabled: false, value: item.contractorName}),
      dealerContractorName: new FormControl({disabled: false, value: item.dealerContractorName}),
      address: new FormControl({disabled: false, value: item.address}, Validators.required),
      location: new FormControl({disabled: false, value: item.location}, Validators.required),
      industryType: new FormControl({disabled: false, value: item.industryType}, Validators.required),
      soilResistivity: new FormControl({disabled: false, value: item.soilResistivity}),
      name: new FormControl({disabled: false, value: item.name}, Validators.required),
      company: new FormControl({disabled: false, value: item.company}, Validators.required),
      designation: new FormControl({disabled: false, value: item.designation}, Validators.required),
      contactNumber: new FormControl({disabled: false, value: item.contactNumber}, [Validators.required,Validators.maxLength(15),Validators.minLength(10)]),
      mailId: new FormControl({disabled: false, value: item.mailId},
         [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      availabilityOfPreviousReport: new FormControl({disabled: false, value: item.availabilityOfPreviousReport}, Validators.required),
      // email1:new FormControl(''),
      // name1:new FormControl(''),
      fileName: new FormControl({disabled: false, value: item.fileName}),
      basicLpsId: new FormControl({disabled: false, value: item.basicLpsId}),
      fileSize: new FormControl({disabled: false, value: item.fileSize}),
      fileId: new FormControl({disabled: false, value: item.fileId}),
    });
    

  }

  overAllControl(): any {
    return(<FormArray>this.LPSBasicForm.get('lpsBasic')).controls;
  }

    // Only Accept numbers
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

  retrieveDetailsfromSavedReports(basicLpsId: any,data: any){
    this.proceedFlag = false;  
    
     if(data.basicLps == undefined ){
      this.step1List = data;
     }
     else{
      this.step1List = data.basicLps;
     }
      // this.success = true;
      this.basicLpsIdRetrive = this.step1List.basicLpsId;
      this.basicDetails.basicLpsId = this.step1List.basicLpsId;
      this.basicDetails.updatedBy = this.step1List.updatedBy;
      this.basicDetails.updatedDate = this.step1List.updatedDate;
      this.basicDetails.createdBy = this.step1List.createdBy;
      this.basicDetails.createdDate = this.step1List.createdDate;
      this.flag=true
      this.availableReportNo = this.step1List.availabilityOfPreviousReport;
      this.LPSBasicForm = this.formBuilder.group({
        lpsBasic: this.formBuilder.array([this.createGroup(this.step1List)])
      });
      
      this.isEditable1=true;
    }

    reset(){
      this.LPSBasicForm.reset();
    }

  onChangeForm(event:any){
    if(!this.LPSBasicForm.invalid){
      if(this.LPSBasicForm.dirty){
        this.validationError=false;
        this.service.lvClick=1;
        this.service.logoutClick=1;
         this.service.windowTabClick=1;
      }
      else{
        this.validationError=false;
        this.service.lvClick=0;
        this.service.logoutClick=0;
        this.service.windowTabClick=0;
      }
     }
     else {
      this.service.lvClick=1;
      this.service.logoutClick=1;
      this.service.windowTabClick=1;
     }
  }
  onKeyForm(event: KeyboardEvent) { 
   if(!this.LPSBasicForm.invalid){ 
    if(this.LPSBasicForm.dirty){
      this.validationError=false;
      this.service.lvClick=1;
      this.service.logoutClick=1;
      this.service.windowTabClick=1;
    }
    else{
      this.validationError=false;
      this.service.lvClick=0;
      this.service.logoutClick=0;
      this.service.windowTabClick=0;
    }
   }
   else {
    this.service.lvClick=1;
    this.service.logoutClick=1;
    this.service.windowTabClick=1;
   }
  } 
  doBeforeUnload() {
    if(this.service.allStepsCompleted==true){
      if(this.service.logoutClick==1 && this.service.windowTabClick==0) {
        return true;
       }
       else if(this.service.logoutClick==0 && this.service.windowTabClick==0){
        return true;
       }
       else{
        window.location.reload(); 
        // Alert the user window is closing 
        return false;
       }
      }
      else{
        return true;
      }
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

  closeModalDialog1(value:any) {
    this.lpsBasic = this.LPSBasicForm.get('lpsBasic') as FormArray;
    this.lpsBasic.controls[0].controls.availabilityOfPreviousReport.value;

    if(this.lpsBasic.controls[0].controls.availabilityOfPreviousReport.value == value){
      this.lpsBasic.controls[0].controls.availabilityOfPreviousReport.setValue("No");
      this.closeModalDialogFile();
    }
    else{
      this.lpsBasic.controls[0].controls.availabilityOfPreviousReport.setValue("Yes");
      this.closeModalDialogFile();
    }
  }

  closeModalDialogFile() {
    this.modalService.dismissAll();
  }

  dropDownPopup(event:any,dropDown:any){
    if(event.target.value == "No" && this.fileId!=undefined && this.fileId!=null && this.fileId!=0){
      this.modalService.open(dropDown, { centered: true,backdrop: 'static' });
    }
  }

  gotoNextModal(content: any,contents: any) {
    if(!this.projectNameError){
      if (this.LPSBasicForm.invalid) {
        this.validationError = true;
        this.validationErrorMsg = 'Please check all the fields';
        setTimeout(() => {
         this.validationError = false;
        }, 3000);
        return;
      }
      
     //  Update and Success msg will be showing
      if(this.LPSBasicForm.dirty && this.LPSBasicForm.touched){
       this.modalService.open(content, { centered: true,backdrop: 'static' });
      }
     //  For Dirty popup
      else{
       this.modalService.open(contents, { centered: true,backdrop: 'static' });
      }
    }
  }
 
  onSubmit(flag: any) {
    this.submitted=true;
     if (this.LPSBasicForm.invalid || this.projectNameError) {
       return;
     }
      this.spinner = true;
      this.popup=false;
    if (!this.validationError) {
    if(flag) {
        
      if(this.LPSBasicForm.dirty && this.LPSBasicForm.touched){ 
      this.lPSBasicDetailsService.updateLpsBasicDetails(this.getBasicDetailsObject()).subscribe(
        data => {
          // update success msg
          setTimeout(() =>{
            this.popup=true;
            this.spinner=false;
          }, 3000)
          // this.success1 = false;
          this.success = true;
          this.successMsg = data;
          this.isBasicFormUpdated=true;
          this.retriveBasicDetails();
          this.LPSBasicForm.markAsPristine();
          this.isBasicFormUpdated=true;
          this.proceedNext.emit(true);
          this.service.lvClick=0;
          this.service.logoutClick=0;
          this.service.windowTabClick=0;
          this.basicLpsIdRetrive=0;
          
        },
          // update failed msg
        error => {
          this.popup=true;
          this.spinner=false;
          // this.success1 = false;
          this.Error = true;
          this.errorArr = [];
          this.errorArr = JSON.parse(error.error);
          this.errorMsg = this.errorArr.message;
          this.proceedNext.emit(false);
        }
      )}
      else{
        this.popup=true;
        this.spinner=false;
        // Preview fields
        if(this.isEditable){
          // this.success = true;
          this.proceedNext.emit(true);
        }

        else{
          this.popup=true;
          this.spinner=false;
          // Dirty checking here
          // this.success = true;
          this.proceedNext.emit(true);
        }
      }
      
    }
    else {
      this.lPSBasicDetailsService.saveLPSBasicDetails(this.getBasicDetailsObject()).subscribe(
        data => {
          setTimeout(() =>{
            this.popup=true;
            this.spinner=false;
          }, 3000)
          let basicDetailsItr=JSON.parse(data);              
          this.proceedFlag = false;
          this.basicDetails.basicLpsId=basicDetailsItr.basicLpsId;
          this.success = true;
          this.successMsg = "Basic Information sucessfully Saved";
          //this.disable = true;
          this.retriveBasicDetails();
          this.LPSBasicForm.markAsPristine();
          this.isBasicFormUpdated=true;
          this.proceedNext.emit(true);
          this.service.lvClick=0;
          this.service.logoutClick=0;
          this.service.windowTabClick=0;
          
        },
        error => {
          this.popup=true;
          this.spinner=false;
          this.Error = true;
          this.errorArr = [];
          this.proceedFlag = true;
          this.errorArr = JSON.parse(error.error);
          this.errorMsg = this.errorArr.message;
          this.proceedNext.emit(false); 
        }
      )
    }
  }
    //(this.basicDetails);
  }

  getBasicDetailsObject() {
    let contactNum;
    if (this.basicLpsIdRetrive != 0) {
      this.basicDetails.basicLpsId = this.basicLpsIdRetrive;
      // If country code changed
      if (this.isCountryCodeDirty) {
        contactNum = "+" + this.countryCode + "-" + this.LPSBasicForm.value.lpsBasic[0].contactNumber;
        this.isCountryCodeDirty = false;
      }
      else {
        // If contact number is unTouched state
        if(this.LPSBasicForm.value.lpsBasic[0].contactNumber.split("-").length == 2){
          contactNum = this.LPSBasicForm.value.lpsBasic[0].contactNumber;
        }
        else{
          contactNum =this.countryCode + "-" + this.LPSBasicForm.value.lpsBasic[0].contactNumber;
        }
      }
    }
    else {
      contactNum ="+" + this.countryCode + "-" + this.LPSBasicForm.value.lpsBasic[0].contactNumber;
    }
    this.basicDetails.clientName = this.LPSBasicForm.value.lpsBasic[0].clientName;
    this.basicDetails.projectName = this.LPSBasicForm.value.lpsBasic[0].projectName;
    this.basicDetails.pmcName = this.LPSBasicForm.value.lpsBasic[0].pmcName;
    this.basicDetails.consultantName = this.LPSBasicForm.value.lpsBasic[0].consultantName;
    this.basicDetails.contractorName = this.LPSBasicForm.value.lpsBasic[0].contractorName;
    this.basicDetails.dealerContractorName = this.LPSBasicForm.value.lpsBasic[0].dealerContractorName;
    this.basicDetails.address = this.LPSBasicForm.value.lpsBasic[0].address;
    this.basicDetails.location = this.LPSBasicForm.value.lpsBasic[0].location;
    this.basicDetails.industryType = this.LPSBasicForm.value.lpsBasic[0].industryType;
    this.basicDetails.soilResistivity = this.LPSBasicForm.value.lpsBasic[0].soilResistivity;
    this.basicDetails.name = this.LPSBasicForm.value.lpsBasic[0].name;
    this.basicDetails.company = this.LPSBasicForm.value.lpsBasic[0].company;
    this.basicDetails.designation = this.LPSBasicForm.value.lpsBasic[0].designation;
    this.basicDetails.contactNumber = contactNum;
    this.basicDetails.mailId = this.LPSBasicForm.value.lpsBasic[0].mailId;
    this.basicDetails.availabilityOfPreviousReport = this.LPSBasicForm.value.lpsBasic[0].availabilityOfPreviousReport;
    this.basicDetails.userName = this.router.snapshot.paramMap.get('email') || '{}';

    this.basicDetails.fileName = this.fileName;
    this.basicDetails.fileId = this.fileId;
    this.basicDetails.fileSize = this.fileSize;
    this.basicDetails.userName = this.router.snapshot.paramMap.get('email') || '{}';

    return this.basicDetails;
  }

  // getDescriptionControl(): AbstractControl[] {
  //   return (<FormArray>this.LPSBasicForm.get('basicLpsDescription')).controls;
  // }
  
  get f() {
    return this.LPSBasicForm.controls;
  }

  retriveBasicDetails(){
    this.proceedFlag = false;
    this.lPSBasicDetailsService.retriveLpsbasicDetails(this.router.snapshot.paramMap.get('email') || '{}',this.basicDetails.basicLpsId).subscribe(
      data => {
        let basic=JSON.parse(data)[0];
        if(basic !=undefined && basic.basicLpsId !=null && basic.basicLpsId != undefined){
        this.retrieveDetailsfromSavedReports('',basic);
        }
      },
      error=>{
      }
    );  
  }

// Only Integer
 NumberskeyPressNumbers(event:any)
  {var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {event.preventDefault();return false;} else {return true;}} 

  countryChange(country: any,form:any) {
    this.isCountryCodeDirty=true;
    this.countryCode = country.dialCode;
    if(this.LPSBasicForm.value.lpsBasic[0].contactNumber.split("-")[1] != undefined && this.LPSBasicForm.value.lpsBasic[0].contactNumber.split("-")[1] !=null && this.LPSBasicForm.value.lpsBasic[0].contactNumber.split("-")[1] !=''){
      form.controls.contactNumber.setValue(this.LPSBasicForm.value.lpsBasic[0].contactNumber.split("-")[1]);
    }
    this.LPSBasicForm.markAsDirty();
    this.LPSBasicForm.markAsTouched();
  }

  gotoNextTab() {
    if (this.LPSBasicForm.dirty && this.LPSBasicForm.invalid) {
      this.service.isCompleted = false;
      this.service.isLinear = true;
      this.service.editable = false;
      this.validationError = false;
      this.validationErrorTab = true;
      this.validationErrorMsgTab = 'Please check all the fields in basic information';
      setTimeout(() => {
        this.validationErrorTab = false;
      }, 3000);
      return;
    }
    else if (this.LPSBasicForm.dirty && this.LPSBasicForm.touched) {
      this.service.isCompleted = false;
      this.service.isLinear = true;
      this.service.editable = false;
      this.tabError = true;
      this.tabErrorMsg = 'Kindly click on next button to update the changes!';
      setTimeout(() => {
        this.tabError = false;
      }, 3000);
      return;
    }
    else {
      this.service.isCompleted = true;
      this.service.isLinear = false;
      this.service.editable = true;
    }
  }

  projectValidation(event:any,form:any){
    var a=event.target.value;

    if(form.controls.clientName.value!=undefined && form.controls.projectName.value!=undefined && form.controls.clientName.value!=null && form.controls.projectName.value!=null && form.controls.clientName.value!="" && form.controls.projectName.value!=""){

      this.lPSBasicDetailsService.validateProjectName(form.controls.clientName.value,form.controls.projectName.value).subscribe(
        // this.lPSBasicDetailsService.validateProjectName(this.basicDetails.clientName,this.basicDetails.projectName).subscribe(
        data =>{
          var b=form.controls.projectName.value;
          if(data != ''){
            this.projectNameMsg="Project Name is already existing, Please give different Project Name";
            this.projectNameMsg1="";
            this.projectNameError=true;
          }else {
            this.projectNameMsg1="You can continue with this Project Name";
            this.projectNameMsg="";
            this.projectNameSuccess=true;
            this.projectNameError=false;
            setTimeout(() => {
              this.projectNameSuccess=false;
            }, 3000);
          }
      })
    }
  }

  onChange(event: any,form:any) {
    this.file = event.target.files;
    if (this.file != null) {
      this.uploadDisable = false;
    }
    // form.controls.fileSize.setValue(Math.round(this.file[0].size / 1024) + " KB");
    this.fileSize = Math.round(this.file[0].size / 1024) + " KB";
    // form.controls.fileSize = this.fileSize;
    this.fileName = this.file[0].name;
  }

  onUpload(contentSpinner: any,form:any) {
    this.LPSBasicForm.markAsDirty();
    this.LPSBasicForm.markAsTouched();
    if (this.file != undefined) {
      this.modalService.open(contentSpinner, {
        centered: true,
        size: 'md',
        backdrop: 'static'
      });
      
      const formData = new FormData();
      for (let f of this.file) {
        formData.append('file', f, f.name);
      }
      
      this.formFile = formData;
      this.spinnerUpload = true;
      this.popupUpload = false;

      if(this.fileId!=null && this.fileId!=undefined && this.fileId!=""){
        this.fileUplaodService.basicFileUpdate(this.fileId,formData,this.fileSize).subscribe(
          (data) => {
            setTimeout(() =>{
              this.spinnerUpload = false;
              this.popupUpload = true;
            }, 1000);
            this.uploadDisable = true;
            this.filesuccess = true;
            this.filesuccessMsg = "File Updated Successfully";
          },
          (error) => {
            this.spinnerUpload = false;
            this.popupUpload = true;
            this.filesuccess = false;
            this.filesuccessMsg = "";
          },
        )
      }
      else{
        this.fileUplaodService.basicFileUpload(formData,this.fileSize).subscribe(
          (data) => {
            setTimeout(() =>{
              this.spinnerUpload = false;
              this.popupUpload = true;
            }, 1000);
            this.uploadDisable = true;
            this.filesuccess = true;
            // Here we are capturing fileid, which is retreve from backend
            this.retreveFileId=data;
            this.fileId=parseInt(this.retreveFileId);
            form.controls.fileId.setValue(this.fileId);
            this.filesuccessMsg = "File Uploaded Successfully";
          },
          (error) => {
            this.spinnerUpload = false;
            this.popupUpload = true;
            this.filesuccess = false;
            this.filesuccessMsg = "";
          },
        )
      }
    }
  }

  onDownload() {
   this.fileUplaodService.basicFileDownload(this.fileId);
  }

}
