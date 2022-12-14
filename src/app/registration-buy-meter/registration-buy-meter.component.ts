import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration-buy-meter',
  templateUrl: './registration-buy-meter.component.html',
  styleUrls: ['./registration-buy-meter.component.css']
})
export class RegistrationBuyMeterComponent implements OnInit {
  countryCode: String = '';

  constructor() { }

  ngOnInit(): void {
    this.countryCode = '91';

  }
  countryChange(country: any) {
    this.countryCode = country.dialCode;
  }
}
