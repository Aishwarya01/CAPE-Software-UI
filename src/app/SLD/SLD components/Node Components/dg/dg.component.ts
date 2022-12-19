import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GlobalsService } from 'src/app/globals.service';
import { DieselGenerator } from 'src/app/SLD/SLD Models/DG';
import { DGFileUploadServiceService } from 'src/app/SLD/SLD Services/DG-file-upload-service.service';
import { DGServicesService } from 'src/app/SLD/SLD Services/DG-service.service';

@Component({
  selector: 'app-dg',
  templateUrl: './dg.component.html',
  styleUrls: ['./dg.component.css']
})
export class DGComponent implements OnInit {

  dieselGeneratorForm!: FormGroup;
  dieselGeneratorData: any;
  dieselGenerator = new DieselGenerator();
  dieselGeneratorFlag: boolean = false;
  dieselGeneratorGeneralTestingArray: any = [];
  submittedDieselGenerator: boolean = false;
  success: boolean = false;
  successMsg: String = '';
  error: boolean = false;
  errorMsg: String = ''
  errorData: any;
  generalTestingDieselGeneratorArr: any = [];
  generalTestingDieselGeneratorArrValue: any = [];
  deletedArr: any = [];
  deletedArrFlag: any;

  @Input()
  mainFileName: any;
  @Input()
  nodeId: any;

  @Input()
  email: any;
  validationError: boolean = false;
  validationErrorMsg: string = "";
  testingTable: boolean = false;
  generalTestingDieselGenerator!: FormArray;

  ///file upload
  file: any = [];
  fileName: String = '';
  fileSize: String = '';
  uploadDisable: boolean = true;
  uploadFlag: boolean = true;
  JSONdata: any;
  fileId: any = "";
  fileErrorData: any;
  fileStatus: any = "";
  fileFlag: boolean = false;
  uploadClicked: boolean = false;
  fileStatusSuccess: boolean = true;
  fileErrorFlag: boolean = false;
  fileSuccessFlag: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private dieselGeneratorService: DGServicesService,
    private dgFileUploadServiceService: DGFileUploadServiceService,
    private dialog: MatDialog,
    private service: GlobalsService) { }

  ngOnInit(): void {
    this.dieselGeneratorForm = this.formBuilder.group({
      referenceName: [''],
      capacityRating: ['', Validators.required],
      voltageRating: ['', Validators.required],
      faultCurrent: ['', Validators.required],
      neutralConnect: ['', Validators.required],
      dieselGeneratorTestReport: ['', Validators.required],
      attachFile: ['']
    });

    this.dieselGenerator.fileName = this.mainFileName;
    this.dieselGenerator.nodeId = this.nodeId;

    this.dieselGeneratorService.retrieveDieselGenerator(this.mainFileName, this.nodeId).subscribe(
      data => {
        this.dieselGeneratorData = JSON.parse(data);
        if (this.dieselGeneratorData.length != 0) {
          this.retrieveDieselGeneratorNode(this.dieselGeneratorData);
        }
      }
    )
    this.retriveFileName();
  }

  retrieveDieselGeneratorNode(data: any) {
    this.dieselGeneratorFlag = true;
    for (let i of data) {
      this.dieselGenerator.referenceName = i.referenceName;
      this.dieselGenerator.capacityRating = i.capacityRating;
      this.dieselGenerator.voltageRating = i.voltageRating;
      this.dieselGenerator.faultCurrent = i.faultCurrent;
      this.dieselGenerator.neutralConnect = i.neutralConnect;
      this.dieselGenerator.dieselGeneratorTestReport = i.dieselGeneratorTestReport;
      this.showPotential(i.dieselGeneratorTestReport);
      this.dieselGenerator.createdBy = i.createdBy;
      this.dieselGenerator.createdDate = i.createdDate;
      this.dieselGenerator.updatedBy = i.updatedBy;
      this.dieselGenerator.updatedDate = i.updatedDate;
      this.dieselGenerator.nodeId = i.nodeId;
      this.dieselGenerator.dieselGeneratorID = i.dieselGeneratorID;
      this.dieselGenerator.fileName = i.fileName;
      this.dieselGenerator.userName = i.userName;
    }
  }

  onDownload() {
    this.dgFileUploadServiceService.downloadFile(this.nodeId)
  }

  retriveFileName() {
    this.dgFileUploadServiceService.retriveFile(this.nodeId).subscribe(
      data => {
        if (data != "" && data != undefined && data != null) {
          this.uploadFlag = false;
          this.JSONdata = JSON.parse(data);
          this.fileName = this.JSONdata.fileName;
          this.fileSize = this.JSONdata.fileSize;
          this.fileId = this.JSONdata.fileId;
          this.fileStatus = "";
          this.fileSuccessFlag = true;
          this.fileErrorFlag = false;
          this.fileFlag = false;
          this.dieselGeneratorForm.controls['attachFile'].setValue('');
          // this.dieselGeneratorForm.controls['attachFile'].clearValidators();
          // this.dieselGeneratorForm.controls['attachFile'].updateValueAndValidity();
        } else {
          this.uploadFlag = true;
          this.fileStatus = "";
          this.fileSuccessFlag = false;
          this.fileErrorFlag = false;
          this.fileFlag = false;
          //  this.dieselGeneratorForm.controls['attachFile'].setValidators([Validators.required]);
          // this.dieselGeneratorForm.controls['attachFile'].updateValueAndValidity();
        }

      },
      error => {
        this.uploadFlag = true;
        this.fileStatus = "";
        this.fileSuccessFlag = false;
        this.fileErrorFlag = false;
        this.fileFlag = false;
        this.fileName = '';
        this.fileSize = '';
        this.fileId = '';
        //  this.dieselGeneratorForm.controls['attachFile'].setValidators([Validators.required]);
        //  this.dieselGeneratorForm.controls['attachFile'].updateValueAndValidity();
      }
    )
  }

  showPotential(e: any) {
    let selectedValue = "";
    if (e.target != undefined) {
      selectedValue = e.target.value;
    }
    else {
      selectedValue = e;
    }

    // if(selectedValue == 'Available') {
    //    // this.dieselGeneratorForm.controls['attachFile'].setValidators([Validators.required]);
    //    // this.dieselGeneratorForm.controls['attachFile'].updateValueAndValidity();
    // }
    // else {
    //   this.dieselGeneratorForm.controls.attachFile.clearValidators();
    //   this.dieselGeneratorForm.controls.attachFile.updateValueAndValidity();  
    // }
  }

  deleteFile() {
    this.fileErrorFlag = false;
    this.fileSuccessFlag = false;
    this.fileFlag = true;
    this.fileStatus = "Please wait your file is getting deleted";
    this.dgFileUploadServiceService.deleteFile(this.nodeId).subscribe(
      (data: any) => {
        this.fileName = "";
        this.fileSize = "";
        this.fileId = "";
        this.retriveFileName();
      },
      (error) => {

      })
  }


  get f(): any {
    return this.dieselGeneratorForm.controls;
  }

  onChange(event: any) {
    this.file = event.target.files;
    if (this.file != null) {
      this.uploadDisable = false;
    }
    this.fileSize = Math.round(this.file[0].size / 1024) + " KB";
    this.fileName = this.file[0].name;
  }

  onUpload() {
    if (this.file != undefined) {
      this.uploadClicked = true;
      const formData = new FormData();
      for (let f of this.file) {
        formData.append('file', f, f.name);
      }
      formData.append('component', 'DG');
      formData.append('mainFileName', this.mainFileName);
      this.fileErrorFlag = false;
      this.fileSuccessFlag = false;
      this.fileFlag = true;

      if (this.uploadFlag) {
        this.fileStatus = "Please wait your file is getting uploaded";
        this.dgFileUploadServiceService.uploadFile(formData, this.nodeId, this.fileSize).subscribe(
          (data) => {
            this.uploadDisable = true;
            this.fileFlag = false;
            this.fileStatus = "";
            this.fileSuccessFlag = true;
            this.fileErrorFlag = false;
            this.dieselGeneratorForm.controls.attachFile.setValue('');
            this.retriveFileName();
          },
          (error) => {
            this.fileFlag = false;
            this.fileStatus = "";
            this.fileErrorFlag = true;
            this.fileSuccessFlag = false;
            this.fileErrorData = JSON.parse(error.error);

          },
        )
      }
      else {
        this.fileStatus = "Please wait your file is getting updated";
        this.dgFileUploadServiceService.updateFile(formData, this.fileId, this.fileSize).subscribe(
          (data) => {
            this.uploadDisable = true;
            this.fileFlag = false;
            this.fileStatus = "";
            this.fileSuccessFlag = true;
            this.fileErrorFlag = false;
            this.dieselGeneratorForm.controls.attachFile.setValue('');
            this.retriveFileName();
          },
          (error) => {
            this.fileFlag = false;
            this.fileStatus = "";
            this.fileSuccessFlag = true;
            this.fileErrorFlag = false;
            this.fileErrorData = JSON.parse(error.error);
          },
        )
      }
    }

  }

  onChangeForm(event: any) {
    if (!this.dieselGeneratorForm.invalid) {
      if (this.dieselGeneratorForm.dirty) {
        this.validationError = false;
      }
      else {
        this.validationError = false;
      }
    }
  }
  onKeyForm(event: KeyboardEvent) {
    if (!this.dieselGeneratorForm.invalid) {
      if (this.dieselGeneratorForm.dirty) {
        this.validationError = false;
      }
      else {
        this.validationError = false;
      }
    }
  }

  //submit MCB
  saveDieselGenerator(dieselGeneratorFlag: any) {
    this.submittedDieselGenerator = true;

    if (this.dieselGenerator.dieselGeneratorTestReport == 'Available') {
      if (!this.fileSuccessFlag) {
        return;
      }
    }

    if (this.dieselGeneratorForm.invalid) {
      this.validationError = true;
      this.validationErrorMsg = "Please check all the fields";
      return;
    }

    this.dieselGenerator.userName = this.email;

    if (this.dieselGeneratorFlag) {
      //  if(this.dieselGeneratorForm.dirty && this.dieselGeneratorForm.touched){      
      //   if(this.deletedArr.length != 0) {
      //   for(let i of this.deletedArr) {
      //     this.dieselGenerator.generalTestingDieselGenerator.push(i);
      //   }
      // }
      this.dieselGeneratorService.updateDieselGenerator(this.dieselGenerator).subscribe(
        data => {
          this.dieselGeneratorService.retrieveDieselGenerator(this.dieselGenerator.fileName, this.dieselGenerator.nodeId).subscribe(
            data => {
              this.dieselGeneratorData = JSON.parse(data);
              if (this.dieselGeneratorData.length != 0) {
                this.retrieveDieselGeneratorNode(this.dieselGeneratorData);
              }
            }
          )
          this.success = true;
          this.successMsg = data;
          setTimeout(() => {
            this.success = false;
            this.successMsg = "";
            this.dialog.closeAll();
          }, 3000);
        },
        error => {
          this.error = true;
          // this.errorData = JSON.parse(error.error);
          this.errorMsg = this.service.globalErrorMsg;
          setTimeout(() => {
            this.error = false;
            this.errorMsg = ""
          }, 3000);
        }
      )
      //  }
      // else{
      //   return;
      // }
    }
    else {
      this.dieselGeneratorService.addDieselGenerator(this.dieselGenerator).subscribe(
        data => {
          this.dieselGeneratorService.retrieveDieselGenerator(this.dieselGenerator.fileName, this.dieselGenerator.nodeId).subscribe(
            data => {
              this.dieselGeneratorData = JSON.parse(data);
              if (this.dieselGeneratorData.length != 0) {
                this.retrieveDieselGeneratorNode(this.dieselGeneratorData);
              }
            }
          )
          this.success = true;
          this.successMsg = data;
          setTimeout(() => {
            this.success = false;
            this.successMsg = "";
            this.dialog.closeAll();
          }, 3000);
        },
        error => {
          this.error = true;
          // this.errorData = JSON.parse(error.error);
          this.errorMsg = this.service.globalErrorMsg;
          setTimeout(() => {
            this.error = false;
            this.errorMsg = ""
          }, 3000);
        }
      )
    }
    //  this.dieselGeneratorForm.markAsPristine();
  }

  close() {
    this.dialog.closeAll();
  }

}
