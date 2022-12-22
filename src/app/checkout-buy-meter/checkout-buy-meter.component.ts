import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationBuyMeterService } from '../services/registration-buy-meter.service';
import { RegistrationBuyMeter } from '../model/registration-buy-meter';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalsService } from '../globals.service';
import { AddCartBuyMeterComponent } from '../add-cart-buy-meter/add-cart-buy-meter.component';
@Component({
  selector: 'app-checkout-buy-meter',
  templateUrl: './checkout-buy-meter.component.html',
  styleUrls: ['./checkout-buy-meter.component.css']
})
export class CheckoutBuyMeterComponent implements OnInit {

  
  checkOutForm!:FormGroup;
  productTotalForm!: FormGroup;
  registerBuyMeter = new RegistrationBuyMeter(); 
  viewEmployee: boolean = false;
  userName: any;
  modelReference: any;
  item:number=0;
  checkoutGrandtotal:any;
  //@Output() checkoutTotal: EventEmitter<any> = new EventEmitter();
 // @Input() total: any;

// @ViewChild(AddCartBuyMeterComponent, {static: false}) child1!: AddCartBuyMeterComponent;

  constructor(private route : Router,
    private registerBuyMeterService : RegistrationBuyMeterService,
    private fb : FormBuilder, public service: GlobalsService,
    private modalService: NgbModal) { }


  ngOnInit(): void {
    this.item=this.service.cartIndex.length;
    this.checkoutGrandtotal=this.service.checkGrandtotal;
    this.checkOutForm = new FormGroup({
      firstName: new FormControl('',Validators.required),
      contactNumber: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
      companyName: new FormControl('',Validators.required),
      address: new FormControl('',Validators.required),
      country: new FormControl('',Validators.required),
      state: new FormControl('',Validators.required),
      city: new FormControl('',Validators.required),
      pincode: new FormControl('',Validators.required)
    })
    if (!this.viewEmployee) {
      this.userName = JSON.parse(sessionStorage.authenticatedUserForMeter).username
    }
    this.registerBuyMeterService.getUserDetails(this.userName).subscribe(
      data => {
        this.registerBuyMeter = JSON.parse(data);
        this.viewEmployee = false;
        let userDetails = this.registerBuyMeter.username + this.registerBuyMeter.contactNumber + this.registerBuyMeter.username + this.registerBuyMeter.address + this.registerBuyMeter.district +this.registerBuyMeter.state + this.registerBuyMeter.country + this.registerBuyMeter.pinCode;
        this.profileDetails(userDetails);
      })
    console.log(this.profileDetails);
  }

  // getTextChange(newItem: any) {
  //   this.total.push(newItem);
  // }
  profileDetails(value:any){
    return this.fb.group({
      firstName: new FormControl(value.firstName),
      lastName: new FormControl(value.lastName),
      contactNumber: new FormControl(value.contactNumber),
      email: new FormControl(value.email),
      companyName: new FormControl(value.companyName),
      address: new FormControl('',value.address),
      country: new FormControl('',value.country),
      state: new FormControl('',value.state),
      city: new FormControl('',value.city),
      pincode: new FormControl('',value.pincode)
    })
   }
  cancelCheckout(checkOutCancel: any){
    this.modelReference = this.modalService.open(checkOutCancel, { centered:true,size: 'sm' })
    
  }
  checkoutNavigation(){
     this.route.navigate(['/addtocart']);
     this.modelReference.close();
  }
  onCancel(){
    this.modelReference.close();
  }
  payment(paymentTemplate : any){
   this.modelReference = this.modalService.open(paymentTemplate,{centered:true,size: "sm"})
   setTimeout(() => {
    this.onCancel();
   }, 3000);
  }

}
