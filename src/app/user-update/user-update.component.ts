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
  permission: String = '';
  registerId: String = '';



  constructor(private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {
    console.log(this.name+ "," +this.companyName+ "," +this.permission + "," +this.registerId)
    this.userUpdateForm = this.formBuilder.group({
      cmntBox: ['', Validators.required],
      permission: ['', Validators.required],
      });
  }

  onSubmit() {
    console.log(this.userUpdateForm);
  }
}
