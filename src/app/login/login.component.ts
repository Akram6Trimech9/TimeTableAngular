import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Login } from '../models/admin';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CurrentUserService } from '../services/currentUser.service';

@Component({
  selector: 'app-login',
   templateUrl:'./login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private _authService :AuthService , private router : Router ,     private toastr: ToastrService , private _currentUserService : CurrentUserService   ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
     });
  }

  onSubmit() {
    if (this.loginForm.valid) {
       const record : Login ={ 
          email:this.loginForm.value.email,
          password:this.loginForm.value.password
       }
       this._authService.login(record).subscribe(res =>{
         if(res.token){
          this._currentUserService.setCurrentUser()
           this.router.navigate(['/dashboard'])
         }else{
          this.toastr.error(res.message, 'Échec de la connexion');

         }
       })
     } else {
      this.toastr.error('L adresse e-mail  ou mot de passe est invalide', 'Échec de la connexion ');

     }
  }
}
