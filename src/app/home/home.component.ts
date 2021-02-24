import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginserviceService } from '../services/loginservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route: Router, private loginservice: LoginserviceService) { }

  ngOnInit(): void {
  }

  logout(){
    this.loginservice.logout();
    this.route.navigate(['login']);
  }
}
