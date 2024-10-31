import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentServices } from '../../_services/_http/_payment/payment.service';
import { angularMaterialModules } from '../../_models/angular-material.model';
import { AppService } from '../../_services/_app/app.service';

@Component({
  selector: 'app-razorpay',
  standalone: true,
  imports: [ReactiveFormsModule,angularMaterialModules],
  templateUrl: './razorpay.component.html',
  styleUrl: './razorpay.component.scss'
})
export class RazorpayComponent {
  paymentForm:FormGroup | any;
  paymentServices = inject(PaymentServices);
  appServices = inject(AppService);
  customerDetails:{name:string, email:string, mobile:number} = {
    name: '',
    email: '',
    mobile: 0
  };
  constructor(private fb:FormBuilder){
  }
  
  ngOnInit(){
    this.paymentForm = new FormGroup({
      amount : this.fb.control('', Validators.required),
    })
    Object.assign(this.customerDetails, this.appServices.bookingCustomerDetails())
  }

  onPayNow() {
    let amount = this.paymentForm.get('amount').value;
    this.paymentServices.createOrder(amount, 'INR').subscribe(
      (order: any) => {
        const options = {
          key: 'rzp_test_BpkWL16gzJtqHq', // Your Razorpay Key ID
          amount: order.amount,
          currency: 'INR',
          name: 'Frio Cab Services',
          description: 'Test Transaction',
          order_id: order.id,
          handler: function (response: any) {
            console.log('Payment ID:', response.razorpay_payment_id);
            console.log('Order ID:', response.razorpay_order_id);
            console.log('Signature:', response.razorpay_signature);
            alert('Payment successful!');
          },
          prefill: {
            name: this.customerDetails.name,
            email: this.customerDetails.email,
            contact: this.customerDetails.mobile,
          },
          theme: {
            color: '#3399cc',
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      },
      (error) => {
        console.error('Payment error:', error);
      }
    );
  }
}
