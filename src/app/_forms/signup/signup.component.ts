import { Component, ElementRef, inject, Renderer2 } from '@angular/core';
import { angularMaterialModules } from '../../_models/angular-material.model';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../_services/_auth/auth.service';
import { AppRedirectionService } from '../../_services/_app/app-redirection.service';
import { delay, map, Observable, of } from 'rxjs';
import { AppConstants } from '../../_services/constants/constants.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [angularMaterialModules,ReactiveFormsModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  constructor(private fb:FormBuilder){
  }
 
  signupForm:FormGroup | any;
  authService = inject(AuthService);
  appConstants = inject(AppConstants);
  passwordVisibility:string = 'visibility_off';
  retypePasswordVisibility:string = 'visibility_off'
  passwordInputFieldType:string = 'password';
  retypePasswordInputFieldType:string = 'password'

  ngOnInit(){
    this.signupForm = new FormGroup({
      name : this.fb.control('', Validators.required),
      username : this.fb.control('',[Validators.required, Validators.email]),
      mobile : this.fb.control('',[Validators.required, Validators.pattern("^[0-9]*$")]),
      password : this.fb.control('',[Validators.required,Validators.minLength(6),
        Validators.maxLength(25)]),
      retypepassword : this.fb.control('',Validators.required,this.passwordMatch())
    })

  }

  onSignup(){
      this.authService.authenticateUserSignup(this.signupForm.value);
  }

  onInputChange(){
    this.appConstants.SIGNUP_MESSAGE.set('');
  }
  
  passwordMatch(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkIfPasswordAndConfirmPasswordMatched(control.value).pipe(
        map(res => {
          return res ? null : { passwordMatched: true };
        })
      );
    };
  }

  checkIfPasswordAndConfirmPasswordMatched(password: string): Observable<boolean> {
    return of(this.signupForm.get('password').value === password);
  }

  onVisibilityClick(type:string){
    console.log(type)
    if(type == 'password'){
        this.passwordVisibility =  this.passwordVisibility === 'visibility_off' ? 'visibility' : 'visibility_off';
        this.passwordInputFieldType = this.passwordVisibility === 'visibility_off' ? 'password' : 'text' 
    }else{
        this.retypePasswordVisibility = this.retypePasswordVisibility === 'visibility_off' ? 'visibility' : 'visibility_off';
        this.retypePasswordInputFieldType = this.retypePasswordVisibility === 'visibility_off' ? 'password' : 'text'
    }
  }
}
