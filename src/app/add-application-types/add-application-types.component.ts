import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationType } from '../model/applicationtype';
import { ApplicationTypeService } from '../services/application.service';

@Component({
  selector: 'app-add-application-types',
  templateUrl: './add-application-types.component.html',
  styleUrls: ['./add-application-types.component.css']
})
export class AddApplicationTypesComponent implements OnInit {
  @Input()
  email: String = '';

  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private applicationService: ApplicationTypeService,
    public activeModal: NgbActiveModal) { }
  msg = "";
  @Input()
  applicationType = new ApplicationType();
  addApplicationTypeForm = new FormGroup({
    id: new FormControl(''),
    type: new FormControl(''),
    code: new FormControl('')
  });
  loading = false;
  submitted = false;
  showErrorMessage = false;
  ngOnInit(): void {
    this.addApplicationTypeForm = this.formBuilder.group({
      id: ['', [
        Validators.required]],
      type: ['', [
        Validators.required]],
      code: ['', [
        Validators.required]]

    });
  }

  get f() {
    return this.addApplicationTypeForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    //Breaks if form is invalid
    if (this.addApplicationTypeForm.invalid) {
      return;
    }
    this.applicationType.type = this.addApplicationTypeForm.value.type;
    this.applicationType.id = this.addApplicationTypeForm.value.id;
    this.applicationType.code = this.addApplicationTypeForm.value.code;
    this.loading = true;
    this.applicationService.addApplicationType(this.applicationType).subscribe(
      data => {
        this.msg = "Add application Type Success";
        this.passEntry.emit(this.applicationType);
        this.activeModal.close(this.applicationType);
        this.router.navigate(['/home', {email: this.email}]);
      }
    )
    

  }

  cancel() {
    const modalRef = this.activeModal.close();
  }

}
