import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationType } from 'src/app/model/applicationtype';
import { ApplicationTypeService } from 'src/app/services/application.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  updateApplicationTypeForm = new FormGroup({
    id: new FormControl(''),
    type: new FormControl('')
  });
  @Input()
  email: String = '';
  @Input()
  id: number = 0;
  @Input()
  type: String = '';
  @Input()
  applicationType = new ApplicationType();

  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private applicationService: ApplicationTypeService,
    public activeModal: NgbActiveModal) {}
  msg = "";
  loading = false;
  submitted = false;
  showErrorMessage = false;
  ngOnInit(): void {
    this.applicationType.id = this.id
    this.applicationType.type = this.type;
    this.updateApplicationTypeForm = this.formBuilder.group({
      id: [this.applicationType.id, Validators.required],
      type: [this.applicationType.type, Validators.required]
    });
  }

  get f() {
    return this.updateApplicationTypeForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    //Breaks if form is invalid
    if (this.updateApplicationTypeForm.invalid) {
      return;
    }
    this.applicationType.type = this.updateApplicationTypeForm.value.type;
    this.loading = true;
    this.applicationService.updateApplicationType(this.applicationType).subscribe(
      data => {
        this.msg = "Update application Type Success";
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
