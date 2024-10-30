import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Tariffs } from "../../_models/home.model";
import { Services } from "../../_models/services.model";
import { SendEnquiry } from "../../_models/email.model";
import { AppService } from "../_app/app.service";
import { AppRedirectionService } from "../_app/app-redirection.service";
import { NgxSpinnerService } from "ngx-spinner";
import { LoginAndSignupResponseModel, SignupDataModel } from "../../_models/auth.model";
import * as BcryptJs from 'bcryptjs';
@Injectable({providedIn:'root'})
export class HttpService{
  
    private SERVER_API_URL = "http://localhost:3000"
    private http = inject(HttpClient)
    private appService  = inject(AppService)
    private appRedirectionService  = inject(AppRedirectionService)
    private ngxSpinnerService  = inject(NgxSpinnerService)

    encryptData(data:any){
        debugger;
        let saltRounds = BcryptJs.genSaltSync(10);
        let hashedData = BcryptJs.hashSync(data,saltRounds);
        return hashedData;
    }
    decryptData(data:any,hashedData:any){
        let saltRounds = BcryptJs.genSaltSync(10);
        let isDataMatched = BcryptJs.compareSync(data,hashedData);
        return isDataMatched;
    }
    authenticateUserLogin(loginCredentials:{username:string,password:string}){
        return this.http.post<LoginAndSignupResponseModel>(`${this.SERVER_API_URL}/login`,loginCredentials)
    }
    logout(token:any){
        console.log('loggin out')
        return this.http.post(`${this.SERVER_API_URL}/logout`,token)
    }
    authenticateUserSignup(signupData:SignupDataModel){
        return this.http.post<LoginAndSignupResponseModel>(`${this.SERVER_API_URL}/signup`,signupData)
    }

    getTariffs(){
        return this.http.get<Tariffs>(`${this.SERVER_API_URL}/home`);
    }

    getServices(){  
        return this.http.get<Services>(`${this.SERVER_API_URL}/services`);
    }

    calculateTravelDistanceAndTime(origin:string,destination:string){
        return this.http.get(`${this.SERVER_API_URL}/distance`,{params:{origin:origin,destination:destination}})
    }
    getPlacesAutoComplete(query:string){
        return this.http.get(`${this.SERVER_API_URL}/autocomplete`,{params:{input:query}})
    }
    sendEnquiryEmail(sendEnquiryData:SendEnquiry){
        this.ngxSpinnerService.show();
        return this.http.post(`${this.SERVER_API_URL}/sendenquiry`,sendEnquiryData).subscribe((data)=>{
            this.appService.sendEquiryEmailStatusCode.set('200');
            this.appRedirectionService.redirectToEnquirySuccessFailurePage();
          },
          
          (error)=>{
            this.appService.sendEquiryEmailStatusCode.set('500');
            this.appRedirectionService.redirectToEnquirySuccessFailurePage();
          },
    
          ()=>{
            this.ngxSpinnerService.hide();
          })
    }
}