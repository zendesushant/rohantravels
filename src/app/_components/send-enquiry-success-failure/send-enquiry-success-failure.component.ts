import { Component, ElementRef, HostBinding, inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CloseButton } from '../../_services/_directives/app.directive';
import { AppService } from '../../_services/_app/app.service';

@Component({
  selector: 'app-send-enquiry-success-failure',
  standalone: true,
  imports: [RouterLink, CloseButton],
  templateUrl: './send-enquiry-success-failure.component.html',
  styleUrl: './send-enquiry-success-failure.component.scss'
})
export class SendEnquirySuccessFailureComponent implements OnInit{
  private appService = inject(AppService)
  buttonColor:string = ''
  isSendEnquiryEmailSuccess:string = '';
  @ViewChild(CloseButton) closeButton:CloseButton | any;

  ngOnInit(){
    this.isSendEnquiryEmailSuccess = this.appService.sendEquiryEmailStatusCode();
    if(this.isSendEnquiryEmailSuccess === '200'){
      this.buttonColor = 'green'
    }else{
      this.buttonColor = 'red'
    }
  }

}
