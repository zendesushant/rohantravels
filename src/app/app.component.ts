import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './_components/header/header.component';
import { AuthService } from './_services/_auth/auth.service';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'RohanTravels';
  authService = inject(AuthService)
  private router = inject(Router)
  private ngxSpinnerService = inject(NgxSpinnerService);

  ngOnInit(){
    this.authService.AutoLogin();
    this.router.events.subscribe((e)=>{
      if(e instanceof NavigationStart){
        this.ngxSpinnerService.show();
        
      }
      else  if(e instanceof NavigationEnd){
          this.ngxSpinnerService.hide();
      }
  })
  }
  
}

