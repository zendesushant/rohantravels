import { HttpClient } from "@angular/common/http"
import { inject, Injectable } from "@angular/core"
import { Observable } from "rxjs";

@Injectable({providedIn:'root'})
export class PaymentServices{
    private SERVER_API_URL = "http://localhost:3000"
    private http = inject(HttpClient)


    createOrder(amount: number, currency: string): Observable<any> {
        return this.http.post<any>(`${this.SERVER_API_URL}/createOrder`, { amount, currency });
    }
}