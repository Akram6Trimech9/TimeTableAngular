import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiRoutes, LocalStorage } from '../ts/enum';
import { AuthStoreService } from './authStore.service';
import { CurrentUserService } from './currentUser.service';
import { Router } from '@angular/router';
import { Login } from '../models/admin';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private _http: HttpClient,
    private _authStore: AuthStoreService
  ) {}

  helper = new JwtHelperService();

  login(payload: Login): Observable<any> {
    return this._http.post<any>(ApiRoutes.login, payload).pipe(
      map((credentials: any) => {
        this._authStore.login(credentials);
        return credentials;
      })
    );
  }

  logout() {
    this._authStore.logout();
  }

  getUserInfo(): Observable<any> {
    let token: any = localStorage.getItem(LocalStorage.AccessToken);
    let decodeToken = this.helper.decodeToken(token);
    return this._http.get<any>(`${ApiRoutes.user}/${decodeToken.id}`).pipe(
      map((user: any) => {
        this._authStore.setUserInfo(user);
        return user;
      })
    );
  }

  get hasAccessToken(): boolean {
    return !!this._authStore.gAccessToken;
  }
  get getUser() {
    return this.getUserInfo();
  }
}
