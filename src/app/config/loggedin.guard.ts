import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStoreService } from '../services/authStore.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedinGuard implements CanActivate {

  constructor(private authService: AuthStoreService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.gAccessToken) {
       this.router.navigate(['/dashboard']);
      return false;  
    }
    return true;  
  }
}
