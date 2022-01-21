import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-emc-electromagnetic-compatibility-data',
  templateUrl: './emc-electromagnetic-compatibility-data.component.html',
  styleUrls: ['./emc-electromagnetic-compatibility-data.component.css']
})
export class EmcElectromagneticCompatibilityDataComponent implements OnInit {

  selectionValue: String[] = ['Yes', 'No', ];

  EMCElectroMagneticFormm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.EMCElectroMagneticFormm = this.formBuilder.group({});
  }

}
