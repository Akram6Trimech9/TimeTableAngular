import { Injectable } from "@angular/core";
import { Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { CurrentUserService } from "../services/currentUser.service";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard {

  constructor(
    private currentUserService: CurrentUserService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean | UrlTree> {
    return this.currentUserService.currentUser$.pipe(
      filter(currentUser => currentUser !== undefined),  
      map(currentUser => {
        if (!currentUser) {
           return this.router.createUrlTree(['/login']);
        }
         return true;
      })
    );
  }
}
