import { Routes } from '@angular/router';
import { LoginComponent } from './_forms/login/login.component';
import { SignupComponent } from './_forms/signup/signup.component';
import { HomeComponent } from './_components/home/home.component';
import { AboutUsComponent } from './_components/about-us/about-us.component';
import { ServicesComponent } from './_components/services/services.component';
import { ContactUsComponent } from './_components/contact-us/contact-us.component';
import { homeResolver } from './_services/_resolvers/home-resolver.service';
import { serviceResolver } from './_services/_resolvers/services-resolver.service';
import { PagenotfoundComponent } from './_components/pagenotfound/pagenotfound.component';
import { SendEnquirySuccessFailureComponent } from './_components/send-enquiry-success-failure/send-enquiry-success-failure.component';
import { canActivateGuard, loggedInGuard } from './_services/_guards/auth-guard.service';
import { PricecalculatorComponent } from './_components/pricecalculator/pricecalculator.component';
import { RazorpayComponent } from './_forms/razorpay/razorpay.component';
import { BookingcustomerdetailsComponent } from './_forms/bookingcustomerdetails/bookingcustomerdetails.component';

export const routes: Routes = [
    {path:'', redirectTo:'login', pathMatch:'full'},
    {path:'login',component:LoginComponent,canActivate:[loggedInGuard]},
    {path:'signup',component:SignupComponent},
    {path:'home',component:HomeComponent, canActivate:[canActivateGuard], resolve:{home:homeResolver}},
    {path:'aboutus',component:AboutUsComponent,canActivate:[canActivateGuard]},
    {path:'services',component:ServicesComponent,canActivate:[canActivateGuard],resolve:{services:serviceResolver}},
    {path:'fares',component:PricecalculatorComponent,canActivate:[canActivateGuard]},
    {path:'contactus',component:ContactUsComponent,canActivate:[canActivateGuard]},
    {path:'customer-details',component:BookingcustomerdetailsComponent,canActivate:[canActivateGuard]},
    {path:'payment',component:RazorpayComponent,canActivate:[canActivateGuard]},
    {path:'enquiry',component:SendEnquirySuccessFailureComponent,canActivate:[canActivateGuard]},
    {path:'**',component:PagenotfoundComponent,canActivate:[canActivateGuard]}
];
