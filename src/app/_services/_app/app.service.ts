import { Injectable, signal } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn:'root'})
export class AppService{

   sendEquiryEmailStatusCode = signal('');
   role_code = ['user','admin'];
   sendSearchData = signal({});
   bookingCustomerDetails = signal({});
}         