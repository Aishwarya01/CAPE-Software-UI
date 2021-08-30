import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.css']
})
export class SingInPageComponent implements OnInit {

 signInContent :string = environment.signInContent;
 
  constructor() { }

  ngOnInit(): void {
  
   }

}
