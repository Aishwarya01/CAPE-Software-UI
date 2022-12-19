import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GlobalsService } from 'src/app/globals.service';
import { PortableAppliance } from 'src/app/SLD/SLD Models/portable-appliance';
import { Transformer } from 'src/app/SLD/SLD Models/transformer';
import { PortableApplianceServicesService } from 'src/app/SLD/SLD Services/portable-appliance-services.service';
import { TransformerFileUploadServiceService } from 'src/app/SLD/SLD Services/transformer-file-upload-service.service';
import { TransformerServicesService } from 'src/app/SLD/SLD Services/transformer-services.service';

@Component({
  selector: 'app-transformer',
  templateUrl: './transformer.component.html',
  styleUrls: ['./transformer.component.css']
})
export class TransformerComponent implements OnInit {
  //Transformer
  transformerForm!: FormGroup;
  transformerData: any;
  transformer = new Transformer();
  transformerFlag: boolean = false;
  submittedTransformer: boolean = false;
  submitted: boolean = false;

  success: boolean = false;
  successMsg: String = '';
  error: boolean = false;
  errorMsg: String = ''
  errorData: any;
  @Input()
  mainFileName: any;
  @Input()
  nodeId: any;
  @Input()
  email: any;
  validationError: boolean = false;
  validationErrorMsg: string = "";

  deletedArr: any = [];
  deletedArrFlag: any;

  //file upload
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
    private transformerService: TransformerServicesService,
    private transformerFileUploadServiceService: TransformerFileUploadServiceService,
    private dialog: MatDialog,
    private service: GlobalsService) { }

  ngOnInit(): void {
    this.transformerForm = this.formBuilder.group({
      referenceName: [''],
      capacityRating: ['', Validators.required],
      sideVoltageHV: [''],
      sideVoltageLV: [''],
      vectorGroup: ['', Validators.required],
      faultCurrent: ['', Validators.required],
      impedance: ['', Validators.required],
      connectedNeutral: ['', Validators.required],
      transformerTest: ['', Validators.required],
      file: ['']
    });

    this.transformer.fileName = this.mainFileName;
    this.transformer.nodeId = this.nodeId;

    this.transformerService.retriveTransformer(this.mainFileName, this.nodeId).subscribe(
      data => {
        this.transformerData = JSON.parse(data);
        if (this.transformerData.length != 0) {
          this.retrieveTransformerNode(this.transformerData);
        }
      }
    )

    this.retriveFileName();
  }

  retrieveTransformerNode(data: any) {
    this.transformerFlag = true;
    for (let i of data) {
      this.transformer.referenceName = i.referenceName;
      this.transformer.capacityRating = i.capacityRating;
      this.transformer.sideVoltageHV = i.sideVoltageHV;
      this.transformer.sideVoltageLV = i.sideVoltageLV;
      this.transformer.vectorGroup = i.vectorGroup;
      this.transformer.faultCurrent = i.faultCurrent;
      this.transformer.impedance = i.impedance;
      this.transformer.connectedNeutral = i.connectedNeutral;
      this.transformer.transformerTest = i.transformerTest;
      this.transformer.createdBy = i.createdBy;
      this.transformer.createdDate = i.createdDate;
      this.transformer.updatedBy = i.updatedBy;
      this.transformer.updatedDate = i.updatedDate;
      this.transformer.nodeId = i.nodeId;
      this.transformer.fileName = i.fileName;
      this.transformer.userName = i.userName;
      this.transformer.transformerDetailsId = i.transformerDetailsId;
      this.changeTransformerTest(i.transformerTest);
    }
  }

  get h() {
    return this.transformerForm.controls;
  }

  onChangeForm(event: any) {
    if (!this.transformerForm.invalid) {
      if (this.transformerForm.dirty) {
        this.validationError = false;
      }
      else {
        this.validationError = false;
      }
    }
  }

  onKeyForm(event: KeyboardEvent) {
    if (!this.transformerForm.invalid) {
      if (this.transformerForm.dirty) {
        this.validationError = false;
      }
      else {
        this.validationError = false;
      }
    }
  }

  changeTransformerTest(e: any) {
    let selectedValue = "";
    if (e.target != undefined) {
      selectedValue = e.target.value;
    }
    else {
      selectedValue = e;
    }

    // if (selectedValue == 'Available') {
    //   this.transformerForm.controls['file'].setValidators([Validators.required]);
    //   this.transformerForm.controls['file'].updateValueAndValidity();
    // }
    // else {
    //   this.transformerForm.controls.file.clearValidators();
    //   this.transformerForm.controls.file.updateValueAndValidity();
    // }
  }

  deleteFile() {
    this.fileErrorFlag = false;
    this.fileSuccessFlag = false;
    this.fileFlag = true;
    this.fileStatus = "Please wait your file is getting deleted";
    this.transformerFileUploadServiceService.deleteFile(this.nodeId).subscribe(
      (data: any) => {
        this.fileName = "";
        this.fileSize = "";
        this.fileId = "";
        this.retriveFileName();
      },
      (error) => {

      })
  }

  onDownload() {
    this.transformerFileUploadServiceService.downloadFile(this.nodeId)
  }

  retriveFileName() {
    this.transformerFileUploadServiceService.retriveFile(this.nodeId).subscribe(
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
          this.transformerForm.controls['file'].setValue('');
         // this.transformerForm.controls['file'].clearValidators();
         // this.transformerForm.controls['file'].updateValueAndValidity();
        } else {
          this.uploadFlag = true;
          this.fileStatus = "";
          this.fileSuccessFlag = false;
          this.fileErrorFlag = false;
          this.fileFlag = false;
         // this.transformerForm.controls['file'].setValidators([Validators.required]);
         // this.transformerForm.controls['file'].updateValueAndValidity();
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
       // this.transformerForm.controls['file'].setValidators([Validators.required]);
       // this.transformerForm.controls['file'].updateValueAndValidity();
      }
    )
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
      formData.append('component', 'Transformer');
      formData.append('mainFileName', this.mainFileName);
      this.fileErrorFlag = false;
      this.fileSuccessFlag = false;
      this.fileFlag = true;

      if (this.uploadFlag) {
        this.fileStatus = "Please wait your file is getting uploaded";
        this.transformerFileUploadServiceService.uploadFile(formData, this.nodeId, this.fileSize).subscribe(
          (data) => {
            this.uploadDisable = true;
            this.fileFlag = false;
            this.fileStatus = "";
            this.fileSuccessFlag = true;
            this.fileErrorFlag = false;
            this.transformerForm.controls.file.setValue('');
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
        this.transformerFileUploadServiceService.updateFile(formData, this.fileId, this.fileSize).subscribe(
          (data) => {
            this.uploadDisable = true;
            this.fileFlag = false;
            this.fileStatus = "";
            this.fileSuccessFlag = true;
            this.fileErrorFlag = false;
            this.transformerForm.controls.file.setValue('');
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

  //submit Transformer
  saveTransformer(transformerFlag: any) {
    this.submittedTransformer = true;

    if (this.transformer.transformerTest == 'Available') {
      if (!this.fileSuccessFlag) {
        return;
      }
    }

    if (this.transformerForm.invalid) {
      this.validationError = true;
      this.validationErrorMsg = "Please check all the fields";
      return;
    }

    this.transformer.userName = this.email;

    if (this.transformerFlag) {
      this.transformerService.updateTransformer(this.transformer).subscribe(
        data => {
          this.transformerService.retriveTransformer(this.transformer.fileName, this.transformer.nodeId).subscribe(
            data => {
              this.transformerData = JSON.parse(data);
              if (this.transformerData.length != 0) {
                this.retrieveTransformerNode(this.transformerData);
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
    else {
      this.transformerService.addTransformer(this.transformer).subscribe(
        data => {
          this.transformerService.retriveTransformer(this.transformer.fileName, this.transformer.nodeId).subscribe(
            data => {
              this.transformerData = JSON.parse(data);
              if (this.transformerData.length != 0) {
                this.retrieveTransformerNode(this.transformerData);
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

  }

  close() {
    this.dialog.closeAll();
  }


}
