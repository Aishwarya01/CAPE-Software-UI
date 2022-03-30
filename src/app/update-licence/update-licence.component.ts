import { Component, EventEmitter, HostListener, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalsService } from '../globals.service';
import { LvInspectionDetailsComponent } from '../lv-inspection-details/lv-inspection-details.component';
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

  options: any = {
    "key": "",
    "amount": "",
    "name": "",
    "description": "",
    "image": "",
    "order_id": "",
    "prefill": {
      "name": "",
      "email": ""
    },
    "handler": function (response: any) {
      debugger
      console.log(response);
      var event = new CustomEvent("payment.success",
        {
          detail: response,
          bubbles: true,
          cancelable: true
        }
      );
      window.dispatchEvent(event);
      console.log(window + "kkkkkkkkkkkkkkkkkkkkkkkkkkkk");
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
  paymentRequired: boolean = true
  constructor(private formBuilder: FormBuilder, private router: ActivatedRoute, private route: Router,
    private paymentService: UpdateLicenceService, private glService: GlobalsService,public dialog: MatDialog
    //private inspectionDetailsComponent:LvInspectionDetailsComponent
  ) { }

  ngOnInit(): void {
    this.countryCode="91"
    this.paymentForm = this.formBuilder.group({
      customerName: new FormControl(''),
      email: new FormControl(''),
      phoneNo: new FormControl(''),
      noofLicense: new FormControl(''),
      amount: new FormControl('')
    });
  }

  back() {
    this.paymentRequired = false
  }


  onSubmit() {
    this.paymentForm.controls.phoneNo.setValue(this.countryCode+"-"+this.paymentForm.controls.phoneNo.value);
    this.paymentForm.controls.phoneNo.updateValueAndValidity();
    this.paymentService.createPayment(this.paymentForm.value).subscribe(
      data => {
        let payment = JSON.parse(data);

        this.options.key = payment.razorPay.secretKey;
        this.options.order_id = payment.razorPay.razorpayOrderId;
        this.options.amount = payment.razorPay.applicationFee; //paise
        this.options.name = payment.razorPay.merchantName;
        this.options.description = payment.razorPay.purchaseDescription;
        this.options.image = payment.razorPay.imageURL;
        this.options.prefill.name = payment.razorPay.customerName;
        this.options.prefill.email = payment.razorPay.customerEmail;
        this.options.notes.address = payment.razorPay.notes;
        this.options.theme.color = payment.razorPay.theme;

        var rzp1 = new Razorpay(this.options);
        let a = rzp1.open();
        console.log(a);
        rzp1.on('payment.failed', function (response: any) {

          // alert(response.error.code);

          alert(response.error.description);

          alert(response.error.source);

          alert(response.error.step);

          alert(response.error.reason);

          alert(response.error.metadata.order_id);

          alert(response.error.metadata.payment_id);

        })



      },
      error => {
      }
    );
  }

  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: any): void {
    debugger
    console.log(event);
    alert(event.type);
    // this.orderService.updateOrder(event.detail).subscribe(
    // data => {
    // 	this.paymentId = data.message;
    // }
    // ,
    // err => {
    // 	this.error = err.error.message;
    // }
    // );
  }
  
  onCancel() {
    this.dialog.closeAll();

  }

  keyPressNumbers(event:any) {
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

  updateLicenceAmount(){
    this.paymentForm.controls.amount.setValue(this.paymentForm.controls.noofLicense.value*500);
    this.paymentForm.controls.amount.updateValueAndValidity();
  }

}