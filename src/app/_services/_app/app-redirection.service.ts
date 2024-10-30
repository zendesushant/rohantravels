import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";


@Injectable({providedIn:'root'})
export class AppRedirectionService{

    private router = inject(Router)
    redirectToLogin(){
        this.router.navigate(['/login']);
    }

    redirectToSignup(){
        this.router.navigate(['/signup']);
    }

    redirectToHome(){
        this.router.navigate(['/home']);
    }

    redirectToEnquirySuccessFailurePage(){
        this.router.navigate(['/enquiry']);
    }

}   