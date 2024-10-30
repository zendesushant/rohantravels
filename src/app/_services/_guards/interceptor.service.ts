import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { AuthService } from "../_auth/auth.service";
import { inject } from "@angular/core";

export const authInterceptor : HttpInterceptorFn =  (req: HttpRequest<any>, next: HttpHandlerFn) =>{

   let  authService = inject(AuthService);

   if(authService.isAuthenticated()){
        let token = authService.getAuthToken();
        let tokenizedReq = req.clone({setHeaders:{'Authorization':'Bearer '+token}})
        // let tokenizedReq = req.headers.set("Authorization",token);
        return next(tokenizedReq);
   }
    return next(req);
 
}