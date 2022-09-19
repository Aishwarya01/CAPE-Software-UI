import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SwitchBoard } from 'src/app/SLD/SLD Models/switchBoard';
import { TransformerFileUploadServiceService } from 'src/app/SLD/SLD Services/transformer-file-upload-service.service';
import { SwitchBoardServicesService } from 'src/app/SLD/SLD Services/switchBoard-service.service';

@Component({
  selector: 'app-switch-boards',
  templateUrl: './switch-boards.component.html',
  styleUrls: ['./switch-boards.component.css']
})
export class SwitchBoardsComponent implements OnInit {

switchBoardForm!: FormGroup;
switchBoardData: any;
switchBoard = new SwitchBoard();
switchBoardFlag: boolean = false;
submittedSwitchBoard: boolean = false;
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
  private switchBoardService: SwitchBoardServicesService,
  private transformerFileUploadServiceService: TransformerFileUploadServiceService,
  private dialog: MatDialog) { }

ngOnInit(): void {
  this.switchBoardForm = this.formBuilder.group({
    referenceName: [''],
    voltage: ['', Validators.required],
    overvoltage: ['', Validators.required],
    make: [''],
    model: [''],
    rating: ['', Validators.required],
    classType: ['', Validators.required],
    switchBoardPhase: [''],
    switchBoardProtective: [''],
    switchBoardNeutral: [''],
    faultCurrent: ['', Validators.required],
    shockVoltage: ['', Validators.required],
    floorResistance: ['', Validators.required],
    wallResistance: ['', Validators.required],
    cable: ['', Validators.required],
    protectionType: ['', Validators.required],
    hvSystem: ['', Validators.required],
    lvSystem: ['', Validators.required],
    spd: ['', Validators.required],
    neutral: ['', Validators.required],
    verifiedProtective: ['', Validators.required],
    verifiedDouble: ['', Validators.required],
    verifiedIsolation: ['', Validators.required],
    boardReach: ['', Validators.required],
    armsReach: ['', Validators.required],
    switchBoardTest: ['', Validators.required],
    cautionBarriers: ['', Validators.required],
    file: ['']
  });

  this.switchBoard.fileName = this.mainFileName;
  this.switchBoard.nodeId = this.nodeId;

  this.switchBoardService.retriveSwitchBoard(this.mainFileName, this.nodeId).subscribe(
    data => {
      this.switchBoardData = JSON.parse(data);
      if (this.switchBoardData.length != 0) {
        this.retrieveSwitchBoardNode(this.switchBoardData);
      }
    }
  )

  this.retriveFileName();
}

retrieveSwitchBoardNode(data: any) {
  this.switchBoardFlag = true;
  for (let i of data) {
    this.switchBoard.referenceName = i.referenceName;
    this.switchBoard.voltage = i.voltage;
    this.switchBoard.overvoltage = i.overvoltage;
    this.switchBoard.make = i.make;
    this.switchBoard.model = i.model;
    this.switchBoard.rating = i.rating;
    this.switchBoard.classType = i.classType;
    this.switchBoard.switchBoardPhase = i.switchBoardPhase;
    this.switchBoard.switchBoardNeutral=i.switchBoardNeutral;
    this.switchBoard.switchBoardProtective = i.switchBoardProtective;
    this.switchBoard.faultCurrent=i.faultCurrent;
    this.switchBoard.shockVoltage = i.shockVoltage;
    this.switchBoard.floorResistance = i.floorResistance;
    this.switchBoard.wallResistance = i.wallResistance;
    this.switchBoard.cable = i.cable;
    this.switchBoard.protectionType = i.protectionType;
    this.switchBoard.hvSystem = i.hvSystem;
    this.switchBoard.lvSystem = i.lvSystem;
    this.switchBoard.spd = i.spd;
    this.switchBoard.neutral = i.neutral;
    this.switchBoard.verifiedProtective = i.verifiedProtective;
    this.switchBoard.verifiedDouble = i.verifiedDouble;
    this.switchBoard.verifiedIsolation = i.verifiedIsolation;
    this.switchBoard.boardReach = i.boardReach;
    this.switchBoard.armsReach = i.armsReach;
    this.switchBoard.switchBoardTest = i.switchBoardTest;
    this.switchBoard.cautionBarriers = i.cautionBarriers;
    this.switchBoard.createdBy = i.createdBy;
    this.switchBoard.createdDate = i.createdDate;
    this.switchBoard.updatedBy = i.updatedBy;
    this.switchBoard.updatedDate = i.updatedDate;
    this.switchBoard.nodeId = i.nodeId;
    this.switchBoard.fileName = i.fileName;
    this.switchBoard.userName = i.userName;
    this.switchBoard.switchBoardId = i.switchBoardId;
    this.changeSwitchBoardTest(i.switchBoardTest);
  }
}

get h() {
  return this.switchBoardForm.controls;
}

onChangeForm(event: any) {
  if (!this.switchBoardForm.invalid) {
    if (this.switchBoardForm.dirty) {
      this.validationError = false;
    }
    else {
      this.validationError = false;
    }
  }
}

onKeyForm(event: KeyboardEvent) {
  if (!this.switchBoardForm.invalid) {
    if (this.switchBoardForm.dirty) {
      this.validationError = false;
    }
    else {
      this.validationError = false;
    }
  }
}

changeSwitchBoardTest(e: any) {
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
        this.switchBoardForm.controls['file'].setValue('');
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
    formData.append('component', 'SwitchBoard');
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
          this.switchBoardForm.controls.file.setValue('');
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
          this.switchBoardForm.controls.file.setValue('');
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

//submit switchBoard
saveSwitchBoard(switchBoardFlag: any) {
  this.submittedSwitchBoard = true;

  if (this.switchBoard.switchBoardTest == 'Available') {
    if (!this.fileSuccessFlag) {
      return;
    }
  }

  if (this.switchBoardForm.invalid) {
    this.validationError = true;
    this.validationErrorMsg = "Please check all the fields";
    return;
  }

  this.switchBoard.userName = this.email;

  if (this.switchBoardFlag) {
    this.switchBoardService.updateSwitchBoard(this.switchBoard).subscribe(
      data => {
        this.switchBoardService.retriveSwitchBoard(this.switchBoard.fileName, this.switchBoard.nodeId).subscribe(
          data => {
            this.switchBoardData = JSON.parse(data);
            if (this.switchBoardData.length != 0) {
              this.retrieveSwitchBoardNode(this.switchBoardData);
            }
          }
        )
        this.success = true;
        this.successMsg = data;
        setTimeout(() => {
          this.success = false;
          this.successMsg = ""
        }, 3000);
      },
      error => {
        this.error = true;
        this.errorData = JSON.parse(error.error);
        this.errorMsg = this.errorData.message;
        setTimeout(() => {
          this.error = false;
          this.errorMsg = ""
        }, 3000);
      }
    )
  }
  else {
    this.switchBoardService.addSwitchBoard(this.switchBoard).subscribe(
      data => {
        this.switchBoardService.retriveSwitchBoard(this.switchBoard.fileName, this.switchBoard.nodeId).subscribe(
          data => {
            this.switchBoardData = JSON.parse(data);
            if (this.switchBoardData.length != 0) {
              this.retrieveSwitchBoardNode(this.switchBoardData);
            }
          }
        )
        this.success = true;
        this.successMsg = data;
        setTimeout(() => {
          this.success = false;
          this.successMsg = ""
        }, 3000);
      },
      error => {
        this.error = true;
        this.errorData = JSON.parse(error.error);
        this.errorMsg = this.errorData.message;
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
