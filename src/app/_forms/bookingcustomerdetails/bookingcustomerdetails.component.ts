import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentServices } from '../../_services/_http/_payment/payment.service';
import { angularMaterialModules } from '../../_models/angular-material.model';
import { AppService } from '../../_services/_app/app.service';
import { AppRedirectionService } from '../../_services/_app/app-redirection.service';

@Component({
  selector: 'app-bookingcustomerdetails',
  standalone: true,
  imports: [angularMaterialModules,ReactiveFormsModule],
  templateUrl: './bookingcustomerdetails.component.html',
  styleUrl: './bookingcustomerdetails.component.scss'
})
export class BookingcustomerdetailsComponent {
  customerDetails:FormGroup | any;
  paymentServices = inject(PaymentServices);
  appServices = inject(AppService)
  appRedirections = inject(AppRedirectionService)
  constructor(private fb:FormBuilder){
  }
  
  ngOnInit(){
    this.customerDetails = new FormGroup({
      name : this.fb.control(null, Validators.required),
      email : this.fb.control(null, Validators.required),
      mobile : this.fb.control(null, Validators.required),
    })
  }

  onProceed(){
    this.appServices.bookingCustomerDetails.set(this.customerDetails.value)
    this.appRedirections.redirectToPaymentGateway();
  }
}
