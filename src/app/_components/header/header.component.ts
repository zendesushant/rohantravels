import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { AuthService } from '../../_services/_auth/auth.service';
import { AppRedirectionService } from '../../_services/_app/app-redirection.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
private authService = inject(AuthService);
private appRedirections = inject(AppRedirectionService)
  onLogout(){
    this.authService.logout();
  }

  onClickOfAvatar(){
    console.log('Avatar Clicked')
  }
}
