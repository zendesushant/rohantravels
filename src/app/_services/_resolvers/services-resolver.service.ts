import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { HttpService } from "../_http/http.service";
import { forkJoin, map, mergeMap } from "rxjs";

export const serviceResolver: ResolveFn<any> = (route, state) => {
    let httpServices = inject(HttpService);
    let response:any = {};
    return forkJoin([httpServices.getServices()]).pipe(map(data =>{
        return {
            services:data[0]
        }
    }))
}