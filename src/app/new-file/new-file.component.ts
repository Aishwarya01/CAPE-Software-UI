import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

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
  onSuccess = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.newFileNameForm = this.formBuilder.group({
      fileName: ['',Validators.required]
    });
  }

  submit() {
    this.submitted = true;
    this.onSuccess.emit(true);
    this.dialog.closeAll()
  }

  cancel() {
    this.dialog.closeAll()
  }

}
