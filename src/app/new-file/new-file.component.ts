import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { InspectionVerificationService } from '../services/inspection-verification.service';
import { DiagramServicesService } from '../SLD/SLD Services/diagram-services.service';

@Component({
  selector: 'app-new-file',
  templateUrl: './new-file.component.html',
  styleUrls: ['./new-file.component.css']
})
export class NewFileComponent implements OnInit {
  newFileNameForm = new FormGroup({
    fileName: new FormControl(''),
  });
  @Input()
  email: String = '';
  submitted: boolean = false;
  successFlag: boolean = false;
  errorFlag: boolean = false;
  successMsg: String = '';
  errorMsg: String = '';
  onSuccess = new EventEmitter();
  fileNameEmit = new EventEmitter();
  errMsg: any = [];
  validationFlag: any = false;

  constructor(private formBuilder: FormBuilder,
              private dialog: MatDialog,
              private diagramService: DiagramServicesService) { }

  ngOnInit(): void {
    this.newFileNameForm = this.formBuilder.group({
      fileName: ['',Validators.required]
    });
  }

  changeInput(e: any) {
    this.validationFlag = false;
  }

  onFocusOut() {
    if(this.newFileNameForm.value.fileName != '') {
      this.diagramService.retriveFileName(this.email,this.newFileNameForm.value.fileName).subscribe(
        data => {
          this.successFlag = true;  
          this.validationFlag = true;
          this.successMsg = data;
          setTimeout(()=>{
            this.successFlag = false;
            this.successMsg = '';
          }, 2000); 
        },
        err => {
          this.errMsg = JSON.parse(err.error);
          this.errorFlag = true;
          this.validationFlag = false;
          this.errorMsg = this.errMsg.message;
          setTimeout(()=>{
            this.errorFlag = false;
            this.errorMsg = '';
          }, 2000);    
        }
      )
    }  
  }

  submit() {
    this.submitted = true;
    if(this.newFileNameForm.invalid) {
      return;
    }
    if(this.validationFlag) {
      setTimeout(()=>{
        this.onSuccess.emit(true);
        this.fileNameEmit.emit(this.newFileNameForm.value.fileName);
        this.dialog.closeAll()        
      }, 2000); 
    }
    
  }

  cancel() {
    this.dialog.closeAll()
  }

}
