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
  constructor(){
    effect(() => {
      this.searchData = this.appService.sendSearchData();
      this.httpService.calculateTravelDistanceAndTime(this.searchData.origin, this.searchData.destination).subscribe((data:any)=>{
        this.distanceResult = data.data;
        this.travelDistance = this.distanceResult['distance'].text;
        this.travelTime = this.distanceResult['duration'].text;
        let km = +(this.travelDistance.split(' ')[0].replace(',',''));
        if(this.searchData.tripType === 'oneway'){
          this.travelFare = (this.searchData.vehiclePrice*km);
        }else if(this.searchData.tripType === 'twoway'){
          this.travelFare = (this.searchData.vehiclePrice*km*2);
          this.travelDistance =  (km)*2 +'';
          this.travelTime = Math.ceil((km*2)/300) + ' day';
        }
      })
     })
  }
  ngOnInit(){
  }
}
