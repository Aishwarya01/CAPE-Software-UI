import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Register } from '../model/register';
import { InspectorregisterService } from '../services/inspectorregister.service';

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
  registerId!: number;

  register = new Register

  constructor(private formBuilder: FormBuilder,
              private inspectorService: InspectorregisterService
    ) { }

  ngOnInit(): void {
    console.log(this.name+ "," +this.companyName+ "," +this.permission + "," +this.registerId)
    this.userUpdateForm = this.formBuilder.group({
      cmntBox: ['', Validators.required],
      permission: ['', Validators.required],
      });
      this.register.registerId= this.registerId;
  }

  onSubmit() {
    this.register.adminUserName="arunkumar.k@capeindia.net"
    this.inspectorService.updateInspector(this.register).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log("error");
      }
    )

  }
}
