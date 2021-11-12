import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './service/auth.service';

@Injectable()
export class userTypeGuard implements CanActivate {
//   base_url: string = '';

  constructor(private router: Router, private authService: AuthService) {}

   canActivate() {
    // Check to see if a user has a valid token
    if ( this.authService.isDeveloper()) {
      // If they do, return true and allow the user to load app
      return true;
    } else {
      // If not, they redirect them to the login page
      this.router.navigate(['/home']);
    //   alert("error") ;
      return false;
    }
  }
}
