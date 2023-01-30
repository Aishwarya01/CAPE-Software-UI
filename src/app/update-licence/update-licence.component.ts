
import { Component, EventEmitter, HostListener, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalsService } from '../globals.service';
import { Airtermination } from '../LPS_model/airtermination';
import { LvInspectionDetailsComponent } from '../lv-inspection-details/lv-inspection-details.component';
import { PaymentDetails } from '../payment-details';
import { UpdateLicenceService } from '../update-licence-service.service';

declare var Razorpay: any;
@Component({
  selector: 'app-update-licence',
  templateUrl: './update-licence.component.html',
  styleUrls: ['./update-licence.component.css']
})
export class UpdateLicenceComponent implements OnInit {


  @Input()
  email: String = '';
  name: String = '';

  updateLicense = new EventEmitter();
  modalReference: any;
  countryCode: any;
  submitted: boolean = false;
  sucessMsgflag: boolean = false
  sucessMsg: String = '';
  failedMsgflag: boolean = false
  failedMsg: String = '';
  inspectorRegisterdId: number = 0;
  oderId: String = '';
  paymentDetails = new PaymentDetails();

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

  paymentForm!: FormGroup;
   
  constructor(private formBuilder: FormBuilder, private router: ActivatedRoute, private route: Router,
    private paymentService: UpdateLicenceService, public dialog: MatDialog,private glsevice:GlobalsService
  ) { 
   this.email = JSON.parse(sessionStorage.authenticatedUser).username; 
   this.name = JSON.parse(sessionStorage.authenticatedUser).name; 
  }

  ngOnInit(): void {

   // this.countryCode = "91"
    this.paymentForm = this.formBuilder.group({
      inspectorName: new FormControl('', Validators.required),
      inspectorEmail: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      noofLicense: new FormControl('', Validators.required),
      licenseAmount: new FormControl('', Validators.required),
      applicationName: new FormControl('', Validators.required),
    });
  }

  onSubmit() {

    this.submitted = true;
    if(this.glsevice.headerMsg == 'lvPage'){
      this.paymentForm.controls.applicationName.setValue("LV");
      this.paymentForm.controls.applicationName.updateValueAndValidity();
    }
    else if(this.glsevice.headerMsg == 'lpsPage'){
      this.paymentForm.controls.applicationName.setValue("LPS");
      this.paymentForm.controls.applicationName.updateValueAndValidity();
    }
    else if(this.glsevice.headerMsg == 'riskPage'){
      this.paymentForm.controls.applicationName.setValue("RISK");
      this.paymentForm.controls.applicationName.updateValueAndValidity();
    }
    else if(this.glsevice.headerMsg == 'emcPage'){
      this.paymentForm.controls.applicationName.setValue("EMC");
      this.paymentForm.controls.applicationName.updateValueAndValidity();
    }
    
    this.paymentService.createPayment(this.paymentForm.value).subscribe(
      data => {
        let payment = JSON.parse(data);
        this.inspectorRegisterdId = payment.razorPay.inspectorRegisterId;
        this.options.key = payment.razorPay.secretKey;
        this.options.order_id = payment.razorPay.razorpayOrderId;
        this.options.notes.address = payment.razorPay.notes;

        this.options.theme.color = "#91bd8f";
        this.options.amount = this.paymentForm.controls.licenseAmount.value;
        this.options.name = "CAPE Electric Private Limited";
        this.options.description = "LICENSE PURCHASES";
        this.options.image = payment.razorPay.imageURL;
        this.options.prefill.name = payment.razorPay.customerName;
        this.options.prefill.email = payment.razorPay.customerEmail;
        this.options.prefill.contact = this.paymentForm.controls.phoneNumber.value

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
       // rzp1.preventDefault();

      },
      error => {
      }
    );
  }

  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: any): void {
    this.updateStatus("SUCCESS",event.detail.razorpay_order_id); 
    this.sucessMsgflag = true;
    this.sucessMsg = 'Your Transaction sucessfully Done';
    setTimeout(() => {
      this.sucessMsgflag = false;
      this.sucessMsg = '';
      setTimeout(() => {
        this.onCancel();
      }, 2000);
    }, 2000);
  }

  @HostListener('window:payment.failed', ['$event'])
  onPaymentFailesd(event: any): void {
    this.updateStatus("FAILED",event.detail.error.metadata.order_id);
    // setTimeout(() => {
    //   this.sucessMsgflag = false;
    //   this.sucessMsg = '';
    //   setTimeout(() => {
    //     this.onCancel();
    //   }, 1000);
    // }, 2000);
  }

  updateStatus(paymentMessage:string,orderID:string){
    this.paymentService.updatePaymentStatus(paymentMessage,orderID).subscribe(
      data =>{
      }, 
      error => {
      }
      
    );
    }
  

  onCancel() {
    this.dialog.closeAll();
  }
  
  keyPressNumbers(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  countryChange(country: any) {
    this.countryCode = country.dialCode;
  }

  updateLicenceAmount() {
    this.paymentForm.controls.licenseAmount.setValue(this.paymentForm.controls.noofLicense.value * 1000);
    this.paymentForm.controls.licenseAmount.updateValueAndValidity();
  }

  get f() {
    return this.paymentForm.controls;
  }
}