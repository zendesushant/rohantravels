import { Component, inject, OnInit } from '@angular/core';
import { CurrencyPipe, JsonPipe } from '@angular/common';
import { HttpService } from '../../_services/_http/http.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { mergeMap } from 'rxjs';
import { SearchComponent } from '../../_forms/search/search.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private httpService = inject(HttpService);
  private activatedRoute = inject(ActivatedRoute);
  tariffs:{img:string,title:string,description:string,price:string}[] = [];

  ngOnInit(){
    this.httpService.getServices();
     this.activatedRoute.data.subscribe((data:any)=>{
        this.tariffs = data['home']['tariffs']['data'];
     })
  
  }

  onBookNow(){
      
  } 
}