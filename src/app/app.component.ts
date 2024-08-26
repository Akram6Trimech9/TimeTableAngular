import { Component } from '@angular/core';
import { CurrentUserService } from './services/currentUser.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _currentUserService : CurrentUserService ){
    _currentUserService.setCurrentUser()
  }
 }
