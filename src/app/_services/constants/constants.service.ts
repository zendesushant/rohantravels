import { Injectable, signal } from "@angular/core";

@Injectable({providedIn:'root'})
export class AppConstants{
    LOGIN_MESSAGE = signal('');
    SIGNUP_MESSAGE = signal('');
}