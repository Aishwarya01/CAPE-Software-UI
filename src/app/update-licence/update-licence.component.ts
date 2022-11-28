import { Component, EventEmitter, HostListener, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalsService } from '../globals.service';
import { Airtermination } from '../LPS_model/airtermination';
import { LvInspectionDetailsComponent } from '../lv-inspection-details/lv-inspection-details.component';
import { PaymentDetails } from '../model/payment-details';
import { UpdateLicenceService } from '../services/update-licence.service';

declare var Razorpay: any;
@Component({
  selector: 'app-update-licence',
  templateUrl: './update-licence.component.html',
  styleUrls: ['./update-licence.component.css']
})
export class UpdateLicenceComponent implements OnInit {


  @Input()
  email: String = '';

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
      debugger

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
    private paymentService: UpdateLicenceService, public dialog: MatDialog
  ) { 
   // this.email = this.router.snapshot.paramMap.get('email') || '{}'; 
  }

  ngOnInit(): void {

   // this.countryCode = "91"
    this.paymentForm = this.formBuilder.group({
      customerName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      noofLicense: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
    });
  }

  onSubmit() {

    this.submitted = true;

   // this.paymentForm.controls.phoneNumber.setValue("+" + this.countryCode + "-" + this.paymentForm.controls.phoneNumber.value);
    //this.paymentForm.controls.phoneNumber.updateValueAndValidity();
    this.paymentService.createPayment(this.paymentForm.value).subscribe(
      data => {
        let payment = JSON.parse(data);

        this.inspectorRegisterdId = payment.razorPay.inspectorRegisterId;
        this.options.key = payment.razorPay.secretKey;
        this.options.order_id = payment.razorPay.razorpayOrderId;
        this.options.notes.address = payment.razorPay.notes;

        this.options.theme.color = "#F37254";
        this.options.amount = this.paymentForm.controls.amount.value;
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
    debugger
    this.paymentDetails.orderId = this.options.order_id;
    this.paymentDetails.inspectorRegisterdId = this.inspectorRegisterdId
    // this.paymentDetails.descriptionOffailedPayment='Pending'
    this.paymentService.updatePaymentDetails(this.paymentDetails).subscribe(
      data => {
        this.sucessMsgflag = true;
        this.sucessMsg = 'Your Transaction sucessfully Done';
        setTimeout(() => {
          this.sucessMsgflag = false;
          this.sucessMsg = '';
          setTimeout(() => {
            this.onCancel();
          }, 2000);
        }, 2000);
      },
      error => {
      }
    )
  }
  @HostListener('window:payment.failed', ['$event'])
  onPaymentFailesd(event: any): void {
    debugger
    this.sucessMsgflag = true;
    this.sucessMsg = event.detail.error.description;
    this.paymentDetails.orderId = this.options.order_id;
    this.paymentDetails.inspectorRegisterdId = this.inspectorRegisterdId
    this.paymentDetails.descriptionOffailedPayment = event.detail.error.description
    this.paymentService.updatePaymentDetails(this.paymentDetails).subscribe(
      data => {
        setTimeout(() => {
          this.sucessMsgflag = false;
          this.sucessMsg = '';
          setTimeout(() => {
            this.onCancel();
          }, 1000);
        }, 2000);
      },
      error => {
      }
    )
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
    this.paymentForm.controls.amount.setValue(this.paymentForm.controls.noofLicense.value * 500);
    this.paymentForm.controls.amount.updateValueAndValidity();
  }

  get f() {
    return this.paymentForm.controls;
  }
}