import { Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationBuyMeterService } from '../services/registration-buy-meter.service';
import { RegistrationBuyMeter } from '../model/registration-buy-meter';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalsService } from '../globals.service';
import { AddCartBuyMeterComponent } from '../add-cart-buy-meter/add-cart-buy-meter.component';
import { AddToCart } from '../model/add-to-cart';
import { environment } from 'src/environments/environment';


declare var Razorpay: any;
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
  checkoutSubtotal:any;
  addToCart =new AddToCart();
  errorMsg : string ="" ;
  grandtotal: any;
  subtotal:number=0;
  gstAmount: number = 0;
  stateGst: number = 0;
  centralGst: number=0;
  iGST: number=0
  stateValidation: boolean=false;
  paymentSuccess: boolean=false;
  paymentFailed: boolean=false;
  paymentTemplate: any;

  options: any = {
    "key": "",
    "amount": "",
    "name": "",
    "description": "",
    "image": "",
    "order_id": "",
    "prefill": {
      "name": "",
      "email": "",
      "contact": ""
    },
    "handler": function (response: any) { 
      var event = new CustomEvent("payment.success",
        {
          detail: response,
          bubbles: true,
          cancelable: true
        }
      );
      window.dispatchEvent(event);
    }
    ,
    "notes": {
      "address": ""
    },
    "theme": {
      "color": ""
    }
  };
  igstValidation: boolean=false;


  //@Output() checkoutTotal: EventEmitter<any> = new EventEmitter();
 // @Input() total: any;

// @ViewChild(AddCartBuyMeterComponent, {static: false}) child1!: AddCartBuyMeterComponent;

  constructor(private route : Router,
    private registerBuyMeterService : RegistrationBuyMeterService,
    private fb : FormBuilder, public service: GlobalsService,
    private modalService: NgbModal) { }


  ngOnInit(): void {
    this.item=this.service.cartIndex.length;
    this.checkoutSubtotal=this.service.checkSubtotal;
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
      this.userName = JSON.parse(sessionStorage.authenticatedUser).username
    }
    this.registerBuyMeterService.getUserDetails(this.userName).subscribe(
      data => {
        this.registerBuyMeter = JSON.parse(data);
        this.viewEmployee = false;
        let userDetails = this.registerBuyMeter.username + this.registerBuyMeter.contactNumber + this.registerBuyMeter.username + this.registerBuyMeter.address + this.registerBuyMeter.district +this.registerBuyMeter.state + this.registerBuyMeter.country + this.registerBuyMeter.pinCode;
        this.profileDetails(userDetails);
        this.stateCheck(this.registerBuyMeter);
      })
      this.grandTotalSum();
  }

  stateCheck(data:any){
    if(data.state=='Tamil Nadu'){
      this.stateValidation=true;
      this.igstValidation=false;
    }
    else{
      this.igstValidation=true;
      this.stateValidation=false;
    }
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


   gstCalculation(subtotal: any){
    // this.gstAmount = (((environment.stateGSTPercentage)/100) * this.checkoutSubtotal) + (((environment.centralGSTPercentage)/100) * this.checkoutSubtotal);

    // Central GST calculation
    this.centralGst = ((environment.centralGSTPercentage)/100) * (this.checkoutSubtotal);

    // IGST = CGST + SGST
    this.iGST = (((environment.integratedGSTPercentage)/100) * this.checkoutSubtotal);
   }

  grandTotalSum(){
    this.gstCalculation(this.checkoutSubtotal);
    this.grandtotal= this.checkoutSubtotal + this.gstAmount;

    // State GST Calculation
    this.stateGst=((environment.stateGSTPercentage)/100) * (this.checkoutSubtotal);
  }


  cancelCheckout(checkOutCancel: any){
    this.modelReference = this.modalService.open(checkOutCancel, { centered:true,size: 'sm' })
    
  }
  checkoutNavigation(){
     this.route.navigate(['/addtocart']);
     this.modelReference.close();
  }

  purchaseHistory(){
    this.route.navigate(['/order-History']);
    // this.paymentFailed = false;
    this.paymentSuccess = false;
    this.onCancel();
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

  //
  checkout(paymentTemplate:any){
    this.paymentTemplate = paymentTemplate;

    if(this.checkoutGrandtotal > 500000){
      this.errorMsg = "Payment can't be more than INR: 4,99,999"
      setTimeout(() => {
        this.errorMsg = "";
      }, 3000);
      return;
    }
    this.addToCart.customerPhoneNumber = this.registerBuyMeter.contactNumber
    this.addToCart.shippingAddress = this.registerBuyMeter.address
    this.addToCart.district = this.registerBuyMeter.district
    this.addToCart.country = this.registerBuyMeter.country
    this.addToCart.pinCode = this.registerBuyMeter.pinCode
    this.addToCart.customerEmail = this.registerBuyMeter.username
    this.addToCart.state = this.registerBuyMeter.state
    this.addToCart.meterName = "meter"
    this.addToCart.numberOfMeter = this.item
    this.addToCart.amount = this.checkoutGrandtotal
    this.addToCart.name = this.registerBuyMeter.firstName+" "+this.registerBuyMeter.lastName;


    this.registerBuyMeterService.checkout(this.addToCart).subscribe(
      data => {

        let payment = JSON.parse(data);

        // this.inspectorRegisterdId = payment.razorPay.inspectorRegisterId;
        this.options.key = payment.razorPay.secretKey;
        this.options.order_id = payment.razorPay.razorpayOrderId;
        this.options.notes.address = payment.razorPay.notes;

        this.options.theme.color = "#91bd8f";
       
        this.options.name = "CAPE Electric Private Limited";
        this.options.description = "PURCHASE METER";
        this.options.image = payment.razorPay.imageURL;
        this.options.prefill.name = payment.razorPay.customerName;
        this.options.prefill.email = payment.razorPay.customerEmail;

        //
        this.options.prefill.contact =  this.registerBuyMeter.contactNumber
        this.options.amount =  this.addToCart.amount;


        var rzp1 = new Razorpay(this.options);
        rzp1.on('payment.failed', function (response: any) {
          var event = new CustomEvent("payment.failed",
            {
              detail: response,
              bubbles: true,
              cancelable: true
            }
          );
          window.dispatchEvent(event);
        })
        rzp1.open();
      },
      error => {
      }
    );
  } 

  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: any): void {
    this.updateStatus("SUCCESS",event.detail.razorpay_order_id);
    this.paymentSuccess = true;
    this.modelReference = this.modalService.open(this.paymentTemplate, { centered:true,size: 'sm' })
    // setTimeout(() => {
    //   this.paymentSuccess = true;
    // }, 3000);

  }

  @HostListener('window:payment.failed', ['$event'])
  onPaymentFailesd(event: any): void {
    this.updateStatus("FAILED",event.detail.error.metadata.order_id);
    this.paymentFailed = true;
    // this.modelReference = this.modalService.open(this.paymentTemplate, { centered:true,size: 'sm' })
    // setTimeout(() => {
    //   this.paymentFailed = true;
    // }, 3000);
  }

  updateStatus(paymentMessage:string,orderID:string){
    this.registerBuyMeterService.updatePaymentStatus(paymentMessage,orderID).subscribe(
      data =>{

      }, 
      error => {
      }
      
    );
  }
}
