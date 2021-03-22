import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationType } from '../model/applicationtype';

@Component({
  selector: 'app-add-application-types',
  templateUrl: './add-application-types.component.html',
  styleUrls: ['./add-application-types.component.css']
})
export class AddApplicationTypesComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private router: Router) { }

  applicationType =  new ApplicationType();
  addApplicationTypeForm = new FormGroup({
    type: new FormControl('')
  });
  loading = false;
  submitted = false;
  showErrorMessage=false;
  ngOnInit(): void {
    this.addApplicationTypeForm = this.formBuilder.group({
      type: ['', [
        Validators.required]]
      
  });
  }

  get f() {
    return this.addApplicationTypeForm.controls;
  }

  onSubmit() {
    this.submitted=true;
    
    //Breaks if form is invalid
    if(this.addApplicationTypeForm.invalid) {
      return;
    }

    this.loading=true;

    
  }

}
