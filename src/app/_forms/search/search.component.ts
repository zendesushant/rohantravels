import { Component, inject } from '@angular/core';
import { HttpService } from '../../_services/_http/http.service';
import { angularMaterialModules } from '../../_models/angular-material.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe, KeyValuePipe } from '@angular/common';
import { AppService } from '../../_services/_app/app.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [angularMaterialModules,ReactiveFormsModule,KeyValuePipe,JsonPipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  searchform:FormGroup | any;
  private httpServices = inject(HttpService)
  private appService = inject(AppService)
  origins:string[] = [];
  destinations:string[] = [];
  oneWayPrices:{name:string,price:number}[] =[{name:'Sedan',price:16},{name:'Suv',price:20},{name:'Mini',price:15}]
  twoWayPrices:{name:string,price:number}[] =[{name:'Sedan',price:13},{name:'Suv',price:16},{name:'Mini',price:12}]
  cars:{name:string,price:number}[] = []
  // {name:'Sedan',onewayprice:16,twowayprice:13},{name:'Suv',onewayprice:19,twowayprice:16},{name:'Mini',onewayprice:15,twowayprice:12}
  constructor(private fb:FormBuilder){
  }
 
  ngOnInit(){
    this.searchform = new FormGroup({
      tripType : this.fb.control('oneway', Validators.required),
      vehiclePrice : this.fb.control('', Validators.required),
      origin : this.fb.control('', Validators.required),
      destination: this.fb.control('',[Validators.required])
    })
    this.onTripTypeSelect();
  }
  onSearch(event:Event,type:string){
    const inputElement = event.target as HTMLInputElement;
    this.httpServices.getPlacesAutoComplete(inputElement.value)
    .subscribe((data:any)=>{
      if(type === 'origin'){
        this.origins = data.data
      }else{
        this.destinations = data.data
      }
        
    })
  }
  onCalculateFare(){
    this.appService.sendSearchData.set(this.searchform.value)
  }

  onTripTypeSelect(){
    let tripType = this.searchform.get('tripType').value;
    if(tripType === 'oneway'){
        this.cars = this.oneWayPrices;
    }else{
        this.cars = this.twoWayPrices;
    }
  }
}
