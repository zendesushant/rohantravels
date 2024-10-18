import { Component, inject, OnInit } from '@angular/core';
import { AppService } from '../../_services/_app/app.service';
import { HttpService } from '../../_services/_http/http.service';
import { Services } from '../../_models/services.model';
import { ActivatedRoute } from '@angular/router';
import { angularMaterialModules } from '../../_models/angular-material.model';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit {
  private httpServices = inject(HttpService)
  private activatedRoute = inject(ActivatedRoute);
  options:string[] = [];
  ourServices:{img:string,title:string,description:string}[] =[]

  ngOnInit(): void {
     this.activatedRoute.data.subscribe((data:any)=>{
       this.ourServices = data['services']['services']['data'];
     });
  }
}
