import { Component, effect, inject } from '@angular/core';
import { SearchComponent } from '../../_forms/search/search.component';
import { AppService } from '../../_services/_app/app.service';
import { JsonPipe } from '@angular/common';
import { HttpService } from '../../_services/_http/http.service';

@Component({
  selector: 'app-pricecalculator',
  standalone: true,
  imports: [SearchComponent,JsonPipe],
  templateUrl: './pricecalculator.component.html',
  styleUrl: './pricecalculator.component.scss'
})
export class PricecalculatorComponent {
  private appService = inject(AppService)
  private httpService = inject(HttpService)
  searchData:any = {};
  distanceResult:any = {};
  travelDistance:string =''
  travelTime:string =''
  travelFare:any = 0;
  isCalculatingFair:boolean = false;
  driverAllowancePerDay = 300;
  gstPercentage = 0;
  perDayAverage = 300;
  rental:{car_type:string,car_name:string,seating_capacity:number,half_day_price:number,full_day_price:number,per_hour_price:number,per_km_price:number,extra_km_price:number}[]=[
      {car_type:"Mini",car_name:"Maruti Wagnor", seating_capacity:4, half_day_price:1600,full_day_price:2000,per_hour_price:130,per_km_price:12,extra_km_price:13.5},
      {car_type:"Sedan",car_name:"Swift Dzire",seating_capacity:4, half_day_price:1800,full_day_price:2200,per_hour_price:150,per_km_price:14,extra_km_price:15.5},
      {car_type:"Suv",car_name:"Maruti Ertiga",seating_capacity:7, half_day_price:2000,full_day_price:3000,per_hour_price:180,per_km_price:18,extra_km_price:20.5},
      {car_type:"Mpv",car_name:"Toyota Innova",seating_capacity:7, half_day_price:3200,full_day_price:3600,per_hour_price:250,per_km_price:20,extra_km_price:22.5},
      {car_type:"Mpv",car_name:"Toyoto Innova Crysta",seating_capacity:7, half_day_price:3600,full_day_price:4200,per_hour_price:350,per_km_price:22,extra_km_price:25.5}
    ]
  outstation:{car_type:string,car_name:string,seating_capacity:number,price:number,left_over_price:number,extra_km_price:number}[]=[
      {car_type:"Mini",car_name:"Maruti Wagnor",seating_capacity:4, price:11.50,left_over_price:11.25,extra_km_price:12.75},
      {car_type:"Sedan",car_name:"Swift Dzire",seating_capacity:4, price:12.50,left_over_price:12.25,extra_km_price:13.75},
      {car_type:"Suv",car_name:"Maruti Ertiga",seating_capacity:7, price:15,left_over_price:14,extra_km_price:16.25},
      {car_type:"Mpv",car_name:"Toyota Innova",seating_capacity:7, price:17,left_over_price:16,extra_km_price:18.25},
      {car_type:"Mpv",car_name:"Toyoto Innova Crysta",seating_capacity:7, price:22,left_over_price:21,extra_km_price:24.25}
    ]
  oneWayRentalCabs:{}[] = [];
  oneWayOutstaionCabs:{}[] = [];
  twoWayRentalCabs:{}[] = [];
  twoWayOutstaionCabs:{}[] = [];
  tripResultIteratingArray:{}[] = [];
ngOnInit(){

}
  constructor(){
    effect(() => {
      this.searchData = this.appService.sendSearchData();
      this.httpService.calculateTravelDistanceAndTime(this.searchData.source, this.searchData.destination).subscribe((data:any)=>{
        this.distanceResult = data.data;
        this.travelDistance = this.distanceResult['distance'].text;
        this.travelTime = this.distanceResult['duration'].text;
        let km = +(this.travelDistance.split(' ')[0].replace(',',''));
        if(this.searchData.tripType === 'oneway'){
          this.calculateOneWayCabFares(km);
        }else if(this.searchData.tripType === 'twoway'){
          this.calculateTwoWayCabFares(km);
        }
      })
     })
  }

calculateOneWayCabFares(km:number){
  this.oneWayOutstaionCabs = [];
  this.tripResultIteratingArray.length = 0;
  this.outstation.forEach((item,index,array)=>{
      let onewayPrice = km * item.price;
      let leftOverDistancePrice = km * item.left_over_price;
      let totalOneWayFare = (onewayPrice + leftOverDistancePrice + this.driverAllowancePerDay); 
      let totalOneWayFareIncludingGst = (totalOneWayFare/100) * this.gstPercentage + totalOneWayFare;
      this.oneWayOutstaionCabs.push({car_type:item.car_type,car_name:item.car_name,seating_capacity:item.seating_capacity,fare:totalOneWayFareIncludingGst,distance_included:km,extra_km_price:item.extra_km_price})
  })
  this.tripResultIteratingArray = this.oneWayOutstaionCabs;
  console.log(this.tripResultIteratingArray)
}

/*calculateOneWayExtraKmFares(extraKm:number){
		let extraPrice = price + left_over_price;
		let extraKmFare = extraKm * extraPrice;
		return extraKmFare;
}*/
calculateTwoWayCabFares(km:number){
  this.twoWayOutstaionCabs = [];
  this.outstation.forEach((item,index,array)=>{
	let totalTripDays = this.searchData.days;
	let twowayPrice = 0;
	let totalTwoWayFare = 0;
	let totalTwoWayFareIncludingGst = 0;
  let totalTravelDistanceIncluded = 0;
	let isPerDayAverageApplicable	= (totalTripDays * this.perDayAverage) > km*2 ? true : false;
	if(isPerDayAverageApplicable){
		twowayPrice = totalTripDays * this.perDayAverage * item.price;
		let totalDriverAllowanceOfTrip = totalTripDays * this.driverAllowancePerDay;
		totalTwoWayFare = (twowayPrice + totalDriverAllowanceOfTrip);
		totalTwoWayFareIncludingGst = (totalTwoWayFare/100) * this.gstPercentage + totalTwoWayFare;
    totalTravelDistanceIncluded = totalTripDays * this.perDayAverage;
	}else{
		twowayPrice = km * 2 * item.price;
		totalTwoWayFare = (twowayPrice + this.driverAllowancePerDay * totalTripDays);
		totalTwoWayFareIncludingGst = (totalTwoWayFare/100) * this.gstPercentage + totalTwoWayFare;
    totalTravelDistanceIncluded = km*2;
  }
  this.twoWayOutstaionCabs.push({car_type:item.car_type,car_name:item.car_name,seating_capacity:item.seating_capacity,fare:totalTwoWayFareIncludingGst,distance_included:totalTravelDistanceIncluded,extra_km_price:item.extra_km_price})
})
  this.tripResultIteratingArray = this.twoWayOutstaionCabs;
  console.log(this.tripResultIteratingArray);
}


  /*calculateTwoWayExtraKmFares(extraKm:number){
      let extraKmFare = extraKm * price;
      return extraKmFare;
  }*/
}
