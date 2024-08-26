import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "./auth.service";
import { LocalStorage } from "../ts/enum";
  
@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
    constructor(private _authService :AuthService){ 

    }
    currentUser$  = new BehaviorSubject<any |null | undefined>(undefined) ; 
    currentUserRole$  = new BehaviorSubject<any |null | undefined>(undefined) ; 
     
    setCurrentUser(){
      const userId =  localStorage.getItem('userId')
       if(localStorage.getItem(LocalStorage.AccessToken)){ 
        this._authService.getUserInfo().subscribe(res=>{
             this.currentUser$.next(res)             
            this.currentUserRole$.next(res.role)
        })
       }else{
        this.currentUser$.next(null)
       }
    }}
 
