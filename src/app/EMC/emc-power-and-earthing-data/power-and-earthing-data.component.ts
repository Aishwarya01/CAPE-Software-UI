import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-power-and-earthing-data',
  templateUrl: './power-and-earthing-data.component.html',
  styleUrls: ['./power-and-earthing-data.component.css']
})
export class PowerAndEarthingDataComponent implements OnInit {

  neutral: String[]= ['Insulated', 'Uninsulated', 'Unknown'];

  EMCPowerAndEarthForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.EMCPowerAndEarthForm = this.formBuilder.group({});
  }

}
