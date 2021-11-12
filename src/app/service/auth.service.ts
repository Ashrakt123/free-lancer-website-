import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from 'src/app/_models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // developerID: any = localStorage.getItem('id');

  // user: User = new User();
  // data: any = [];

  constructor(private userService: UserService) {}

  ngOnInit() {}

   isDeveloper() {
    let x = localStorage.getItem('type') ;
    console.log(x);
    
    // if ( localStorage.getItem('type')=="developer"){
    if (x=='"developer"'){
      console.log("true");

      return true ;
      
    }else {
      console.log('false');
      
    return false ;
  }

    // this.userService.getUser(this.developerID).top( res => {
    //   this.data =  res;
    //   this.user = this.data;
    // });
    // console.log(this.user);
    
    // if (await this.getUser()) {
    //   if (this.user.type == 'developer') {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // } else {
    //   console.log(this.user.type);
    //   // alert("client");
    //   return false;
    // }
  }

  // async getUser() {
  //   return await this.userService
  //     .getUser(this.developerID)
  //     .subscribe(async (res) => {
  //       this.data = await res;
  //       this.user = this.data;
  //     });
  // }

  isAuthenticated() {
    // get the auth token from localStorage
    let token = localStorage.getItem('token');

    // check if token is set, then...
    if (token) {
      return true;
    }

    return false;
  }
}
