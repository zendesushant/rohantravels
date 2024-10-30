import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { HttpService } from "../_http/http.service";
import { forkJoin, map, mergeMap } from "rxjs";

export const homeResolver: ResolveFn<any> = (route, state) => {
    let httpServices = inject(HttpService);
    let response:any = {};
    return forkJoin([httpServices.getTariffs()]).pipe(map(data =>{
        return {
            tariffs:data[0]
        }
    }))
}