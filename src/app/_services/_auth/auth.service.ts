import { afterNextRender, inject, Injectable, signal } from "@angular/core";
import { HttpService } from "../_http/http.service";
import { AppRedirectionService } from "../_app/app-redirection.service";
import { LoginCredentialsModel, SignupDataModel } from "../../_models/auth.model";
import { AppConstants } from "../constants/constants.service";

@Injectable({providedIn:'root'})
export class AuthService {

    private httpService = inject(HttpService);
    private appRedirection = inject(AppRedirectionService);
    private appConstants = inject(AppConstants);
    private token:any = '';
    private expiresIn:any = 0;
   isAuthenticated = signal(false);
    constructor(){
    }

    getAuthToken(){
      return this.token;
    }
    getAuthExpiresIn(){
      return this.expiresIn;
    }
    authenticateUserLogin(loginCredentials:LoginCredentialsModel){
             this.httpService.authenticateUserLogin(loginCredentials).subscribe((response)=>{
               if(this.isAuthenticated()){
                  this.appRedirection.redirectToHome();
               }
               else if(response.token?.token != null && response.token?.token != undefined && response.token?.token != ''){
                  this.token = response.token?.token
                  this.expiresIn = response.token?.expiresIn;
                  this.isAuthenticated.set(true);
                  this.saveAuthData(this.getAuthToken(),this.getAuthExpiresIn())
                  this.appRedirection.redirectToHome();
                  this.setTimer(this.getAuthExpiresIn());
               }else{
                  this.appConstants.LOGIN_MESSAGE.set(response.message) 
               }

             },
             error=>{
                  this.appConstants.LOGIN_MESSAGE.set(error.error.message);
             });;
       }
   logout(){
      this.httpService.logout(this.getAuthData()).subscribe((response)=>{
         this.clearLocalStorage();
         this.isAuthenticated.set(false)
         this.appRedirection.redirectToLogin();
   })
   }
   authenticateUserSignup(signupData:SignupDataModel){
      return this.httpService.authenticateUserSignup(signupData).subscribe((response)=>{
         if(response.token?.token != null && response.token?.token != undefined && response.token?.token != ''){
            this.token = response.token?.token
            this.expiresIn = response.token?.expiresIn;
            this.isAuthenticated.set(true);
            this.saveAuthData(this.getAuthToken(),this.getAuthExpiresIn())
            this.appRedirection.redirectToHome();
            this.setTimer(this.getAuthExpiresIn());
         }else{
            this.appConstants.SIGNUP_MESSAGE.set(response.message) 
         }

       },
       error=>{
            this.appConstants.SIGNUP_MESSAGE.set(error.error.message);
       });;
   }
   AutoLogin()
   {
         const token=this.getAuthData();
         if(!token)
         {
            this.appRedirection.redirectToLogin();
            return
         }
         
         const now=new Date();
         const remainingTimeToExpire = token.expiresIn.getTime()-now.getTime();
         console.log(remainingTimeToExpire);
         if(remainingTimeToExpire>0)
         {
            this.isAuthenticated.set(true);
            this.setTimer(remainingTimeToExpire/1000);
         }
         else
         {
            this.isAuthenticated.set(false);
            this.clearLocalStorage();
            this.appRedirection.redirectToLogin();
            
         }
   }
   AutoLogout()
   {
         this.clearLocalStorage();
         this.isAuthenticated.set(false)
         this.appRedirection.redirectToLogin();
   }
   setTimer(expiresIn:number){
      expiresIn=expiresIn*1000;
         setTimeout(()=>{
         this.AutoLogout();
         },expiresIn)
   }
   saveAuthData(token:string,expiresIn:number){
            
             const now=new Date();
             let expiryTime = ''
             expiresIn = now.getTime()+(expiresIn*1000)
             expiryTime = new Date(expiresIn).toISOString();
             localStorage.setItem("token",token)
             localStorage.setItem("expiresIn",expiryTime)
    }
    getAuthData(){
            const token=localStorage.getItem("token");
            const expiresIn=localStorage.getItem("expiresIn");
            if(!token || !expiresIn)
                return null;
            else
                return {token:token,expiresIn:new Date(expiresIn)};
    }
    removeFromLocalStorage(){
        
     }
     clearLocalStorage(){
         localStorage.clear();
     }
}