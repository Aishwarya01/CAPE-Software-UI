import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  userUpdateForm = new FormGroup({
    cmntBox: new FormControl(''),
    permission: new FormControl('')
  });

  @Input()
  name: String = '';
  companyName: String = '';


  constructor(private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.userUpdateForm = this.formBuilder.group({
      cmntBox: ['', Validators.required],
      permission: ['', Validators.required],
      });
  }

  onSubmit() {
    console.log(this.userUpdateForm);
  }
}
