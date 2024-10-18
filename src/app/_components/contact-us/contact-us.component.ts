import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { angularMaterialModules } from '../../_models/angular-material.model';
import { HttpService } from '../../_services/_http/http.service';
import { AppService } from '../../_services/_app/app.service';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,angularMaterialModules],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent implements OnInit {


  constructor(private fb:FormBuilder){}
  sendEnquiryForm:FormGroup | any;
  private httpServices  = inject(HttpService)


    ngOnInit(){
      this.sendEnquiryForm = new FormGroup({
        name: this.fb.control('',[Validators.required]),
        email: this.fb.control('',[Validators.required,Validators.email]),
        contact: this.fb.control('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
        message: this.fb.control('',[Validators.required])
      })
    }

    onSendEnquiry(){
      this.httpServices.sendEnquiryEmail(this.sendEnquiryForm.value)
    }
  }
