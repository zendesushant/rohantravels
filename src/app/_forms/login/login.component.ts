import { Component, effect, HostBinding, inject, OnInit } from '@angular/core';
import { angularMaterialModules } from '../../_models/angular-material.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../_services/_auth/auth.service';
import { AppRedirectionService } from '../../_services/_app/app-redirection.service';
import { NavigationEnd, NavigationStart, Router, RouterLink } from '@angular/router';
import { AppConstants } from '../../_services/constants/constants.service';
import { HttpService } from '../../_services/_http/http.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [angularMaterialModules,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  constructor(private fb:FormBuilder){
  }
 
  loginForm:FormGroup | any;
  authService = inject(AuthService);
  appConstants = inject(AppConstants);
  private appRedirectionService = inject(AppRedirectionService)
  private httpServices = inject(HttpService)
  errorMessage: string  = '';

  ngOnInit(){
    this.loginForm = new FormGroup({
      username : this.fb.control('',[Validators.required, Validators.email]),
      password : this.fb.control('',[Validators.required]),
    })

  }

  onLogin(){
      this.authService.authenticateUserLogin(this.loginForm.value);
  }

  onInputChange(){
    this.errorMessage = '';
  }
}


