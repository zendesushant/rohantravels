import { Component, inject } from '@angular/core';
import { HttpService } from '../../_services/_http/http.service';
import { angularMaterialModules } from '../../_models/angular-material.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe, JsonPipe, KeyValuePipe } from '@angular/common';
import { AppService } from '../../_services/_app/app.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { start } from 'repl';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [angularMaterialModules,ReactiveFormsModule,KeyValuePipe,DatePipe],
  providers:[provideNativeDateAdapter()],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  searchform:FormGroup | any;
  datePickerInputDisabled:boolean = true;
  private httpServices = inject(HttpService)
  private appService = inject(AppService)
  sources:string[] = [];
  destinations:string[] = [];
  trips:string[] = ['One way','Two way']
  ddMmYyyyFormatDate:any
  showRangeDatePicker:boolean = false;
  minDate:any
  endDate:any
  constructor(private fb:FormBuilder){

  }
  
  ngOnInit(){
    this.minDate = new Date();
    this.endDate = new Date();
    this.endDate.setDate(this.endDate.getDate()+2)
    this.searchform = new FormGroup({
      tripType : this.fb.control('oneway', Validators.required),
      source : this.fb.control('', Validators.required),
      destination: this.fb.control('',[Validators.required]),
      pickupDate: this.fb.control(this.minDate,[Validators.required]),
      startDate : this.fb.control(this.minDate,[Validators.required]),
      endDate : this.fb.control(this.endDate,[Validators.required])
    })
  }
  onSearch(event:Event,type:string){
    const inputElement = event.target as HTMLInputElement;
    this.httpServices.getPlacesAutoComplete(inputElement.value)
    .subscribe((data:any)=>{
      if(type === 'source'){
        this.sources = data.data
      }else{
        this.destinations = data.data
      }
    })
  }
  onCalculateFare(){
    var datePipe = new DatePipe('en-US');
    let formValue = Object.assign(this.searchform.value);
    if(formValue.tripType==='oneway'){
          let pickupDate = datePipe.transform(this.searchform.value.pickupDate, 'dd/MM/yyyy');
          delete formValue.startDate;
          delete formValue.endDate;
          formValue.pickupDate = pickupDate;
    }else{
          let startDate  = datePipe.transform(this.searchform.value.startDate, 'dd/MM/yyyy');
          let endDate = datePipe.transform(this.searchform.value.endDate, 'dd/MM/yyyy');
          let days = Math.ceil(Math.abs(this.calculateNoOfDays(this.searchform.value.startDate,this.searchform.value.endDate)));
          delete formValue.pickupDate;  
          formValue.days = days;
          formValue.startDate = startDate;
          formValue.endDate = endDate;
    }

    this.appService.sendSearchData.set(formValue)
  }

  tripSelection(tripType:string){
    if(tripType === 'oneway'){
      this.showRangeDatePicker = false;
    }else{
      this.showRangeDatePicker = true;
    }
  }

  calculateNoOfDays(startDate:any,endDate:any){
    let time = startDate.getTime() - endDate.getTime();
    return (time/(1000 * 3600 * 24))
  }
}
